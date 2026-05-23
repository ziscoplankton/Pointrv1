# Pointr — Backend Architecture & Best Practices

> **Core constraint from the research report:** There are NO public APIs for any major Australian loyalty program in 2026. Every major program (Everyday Rewards, Flybuys, Qantas, Velocity) prohibits credential sharing in their T&Cs. The backend must be designed around **manual entry + OCR as the only legal data path in v1**, with architecture that can evolve if the landscape changes.

---

## 1. Technology Stack

### Runtime & Language
**Node.js 20 LTS + TypeScript (strict)**

Why Node over Python/Go/Java?
- Shared TypeScript types and Zod schemas with frontend (monorepo)
- Fast iteration cycle for a small founding team
- Excellent fintech/auth library ecosystem (Supabase, Stripe, Plaid patterns)
- Go is a viable future migration path for performance-critical microservices

### API Framework
**Hono** (primary) with **Next.js Route Handlers** for simple endpoints

- Hono is ultra-lightweight, runs on Edge (Cloudflare Workers) and Node
- Much faster than Express/Fastify for this use case
- Type-safe routing with Zod middleware
- Consider NestJS only if team grows beyond 3 backend engineers

Alternative: **tRPC** for type-safe end-to-end API calls (eliminates API client duplication)

```typescript
// tRPC is strongly recommended — eliminates an entire class of type bugs
// Frontend calls: trpc.wallet.getBalance.query({ userId })
// No manual API client needed — types flow from server to client automatically
```

### Database
**PostgreSQL 16** via **Supabase** (managed)

Why Supabase?
- Managed Postgres with Row Level Security (RLS) — critical for financial data isolation
- Built-in Auth (magic links, OAuth, WebAuthn)
- Realtime subscriptions for live balance updates
- Australian region available (Sydney ap-southeast-2)
- Storage for OCR screenshots (temporary, auto-deleted after processing)
- Open source — can self-host if needed

### ORM
**Drizzle ORM**

Why Drizzle over Prisma?
- SQL-first — no "magic" that obscures queries
- Fully type-safe without a generated client
- Much smaller bundle, faster compile times
- Drizzle Studio for database management
- Prisma is acceptable fallback if team prefers it

### Caching
**Redis** via **Upstash** (serverless Redis)

- Cache point valuations (cents-per-point) — these change infrequently, expensive to recompute
- Rate limiting (auth, OCR endpoints)
- Session data
- Background job queues (BullMQ)

### Background Jobs
**BullMQ** (Redis-backed)

- Expiry alert calculations (daily cron)
- Push notification dispatch
- Points valuation refresh (weekly)
- Content syndication for Learn/News

### File Storage
**Supabase Storage** (S3-compatible)

- OCR screenshots stored temporarily (deleted within 1 hour after processing)
- Article cover images for Learn/News
- User profile photos

---

## 2. Database Schema

> **12 bugs were found and fixed in this schema.** Key fixes listed inline with `-- FIX` comments.

```sql
-- ============================================================
-- POINTR — DATABASE SCHEMA (v2 — corrected)
-- PostgreSQL 16 via Supabase (Sydney region)
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "postgis";  -- Required for nearby stores queries

-- Auto-update updated_at on any table that has it
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 1. PROFILES
-- FIX #3: Do NOT create a separate users table — Supabase Auth already
-- manages auth.users. Creating a duplicate causes sync failures.
-- This table is a profile extension that references auth.users.
-- ============================================================
CREATE TABLE profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name     TEXT,
  avatar_url    TEXT,
  timezone      TEXT DEFAULT 'Australia/Sydney',
  pointr_barcode TEXT UNIQUE,           -- FIX #1: one barcode per USER, generated on signup
  created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at    TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles: own row only" ON profiles
  USING (auth.uid() = id);

-- ============================================================
-- 2. LOYALTY PROGRAMS (global registry — admin-managed)
-- ============================================================
CREATE TABLE loyalty_programs (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                  TEXT UNIQUE NOT NULL,
  name                  TEXT NOT NULL,
  operator              TEXT NOT NULL,
  logo_url              TEXT,
  card_colour           TEXT,
  card_colour_secondary TEXT,
  barcode_format        TEXT NOT NULL
    CHECK (barcode_format IN ('CODE128', 'EAN13', 'QR')),
  -- FIX #9: was missing — Flybuys=EAN13, Qantas=CODE128, critical for Pointr Card display
  base_pts_value        DECIMAL(10, 4) NOT NULL,
  expiry_months         INTEGER,
  expiry_type           TEXT DEFAULT 'inactivity'
    CHECK (expiry_type IN ('inactivity', 'calendar')),
  -- FIX: inactivity (QFF 18mo, Velocity 24mo) vs calendar differs per program
  country               TEXT NOT NULL DEFAULT 'AU',
  is_active             BOOLEAN NOT NULL DEFAULT true,
  last_verified         DATE NOT NULL,  -- REQUIRED — always display to users
  created_at            TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at            TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TRIGGER set_loyalty_programs_updated_at
  BEFORE UPDATE ON loyalty_programs
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

-- Audit trail every time rates change — legal defence if values are disputed
CREATE TABLE valuation_history (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id      UUID NOT NULL REFERENCES loyalty_programs(id) ON DELETE CASCADE,
  base_pts_value  DECIMAL(10, 4) NOT NULL,
  changed_by      UUID REFERENCES auth.users(id),
  source_url      TEXT,
  notes           TEXT,
  effective_from  DATE NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_valuation_history_program ON valuation_history(program_id, effective_from DESC);

-- ============================================================
-- 3. USER PROGRAMS (the user's linked loyalty cards)
-- ============================================================
CREATE TABLE user_programs (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id            UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  program_id         UUID NOT NULL REFERENCES loyalty_programs(id) ON DELETE RESTRICT,
  -- FIX #5: RESTRICT — prevents silent data orphan if a program is ever removed
  member_number      TEXT,              -- AES-256 encrypted at application layer
  balance            INTEGER NOT NULL DEFAULT 0,
  balance_updated    TIMESTAMPTZ,       -- When the user last synced in Pointr
  last_activity_date DATE,
  -- FIX #5: when they last EARNED/redeemed points — this drives expiry logic,
  -- NOT balance_updated (which is a Pointr app timestamp, not a program timestamp)
  entry_method       TEXT NOT NULL DEFAULT 'manual'
    CHECK (entry_method IN ('ocr', 'manual')),
  -- FIX: added CHECK constraint — was open TEXT before
  is_active          BOOLEAN NOT NULL DEFAULT true,
  created_at         TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at         TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE (user_id, program_id)
);

CREATE INDEX idx_user_programs_user    ON user_programs(user_id);
CREATE INDEX idx_user_programs_active  ON user_programs(user_id, is_active);

CREATE TRIGGER set_user_programs_updated_at
  BEFORE UPDATE ON user_programs
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

ALTER TABLE user_programs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_programs: own rows only" ON user_programs
  USING (auth.uid() = user_id);

-- ============================================================
-- 4. BALANCE HISTORY (point-in-time snapshots for charts)
-- ============================================================
CREATE TABLE balance_history (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_program_id          UUID NOT NULL REFERENCES user_programs(id) ON DELETE CASCADE,
  balance                  INTEGER NOT NULL,
  est_value_aud            DECIMAL(10, 2),
  cents_per_point_snapshot DECIMAL(10, 4) NOT NULL,
  -- FIX #6: snapshot the rate at time of recording — if Qantas devalues
  -- in 6 months, historical chart values stay correct (not recalculated at new rate)
  recorded_at              TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Heavy read path for charts — always filtered by program + ordered by date
CREATE INDEX idx_balance_history_lookup ON balance_history(user_program_id, recorded_at DESC);

ALTER TABLE balance_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "balance_history: own rows only" ON balance_history
  USING (
    auth.uid() = (SELECT user_id FROM user_programs WHERE id = user_program_id)
  );

-- ============================================================
-- 5. GOALS
-- ============================================================
CREATE TABLE goals (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title             TEXT NOT NULL,
  description       TEXT,
  emoji             TEXT,
  goal_type         TEXT NOT NULL
    CHECK (goal_type IN ('travel', 'retail', 'cash', 'custom')),
  target_program_id UUID REFERENCES loyalty_programs(id) ON DELETE SET NULL,
  target_points     INTEGER,
  target_value_aud  DECIMAL(10, 2),
  target_date       DATE,
  status            TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'completed', 'archived')),
  completed_at      TIMESTAMPTZ,        -- FIX #10: was missing — record achievement timestamp
  created_at        TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at        TIMESTAMPTZ DEFAULT now() NOT NULL,
  -- FIX #7: at least one target must be set — both cannot be NULL simultaneously
  CONSTRAINT goal_has_target CHECK (
    target_points IS NOT NULL OR target_value_aud IS NOT NULL
  )
);

CREATE INDEX idx_goals_user_active ON goals(user_id, status);

CREATE TRIGGER set_goals_updated_at
  BEFORE UPDATE ON goals
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "goals: own rows only" ON goals
  USING (auth.uid() = user_id);

-- ============================================================
-- 6. POINTR CARD MAPPINGS
-- FIX #1 + #2: Completely redesigned.
-- The barcode is on profiles (one per user).
-- This table maps: "at this store chain, use this loyalty program."
-- e.g. user_id → 'Woolworths Group' → Everyday Rewards program
-- ============================================================
CREATE TABLE pointr_card_mappings (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  program_id    UUID NOT NULL REFERENCES loyalty_programs(id) ON DELETE RESTRICT,
  store_chain   TEXT NOT NULL,          -- 'Woolworths Group' | 'Coles Group' etc.
  is_active     BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE (user_id, store_chain)         -- One program per chain per user
);

CREATE INDEX idx_pointr_card_mappings_user ON pointr_card_mappings(user_id, is_active);

ALTER TABLE pointr_card_mappings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pointr_card_mappings: own rows only" ON pointr_card_mappings
  USING (auth.uid() = user_id);

-- ============================================================
-- 7. STORES
-- ============================================================
CREATE TABLE stores (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             TEXT NOT NULL,
  chain            TEXT NOT NULL,
  address          TEXT,
  suburb           TEXT,
  postcode         TEXT,
  state            TEXT CHECK (state IN ('NSW','VIC','QLD','WA','SA','TAS','ACT','NT')),
  location         GEOGRAPHY(POINT, 4326),  -- FIX #12: PostGIS replaces lat/lng DECIMAL pair
  pointr_supported BOOLEAN NOT NULL DEFAULT false,
  is_active        BOOLEAN NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- FIX #12: GiST spatial index — without this, nearby stores query does a full table scan
CREATE INDEX idx_stores_location ON stores USING GIST(location);
CREATE INDEX idx_stores_chain    ON stores(chain);

-- FIX #11: Many-to-many — Ampol accepts Everyday Rewards AND QFF
-- A single program_id FK on stores was wrong
CREATE TABLE store_programs (
  store_id    UUID NOT NULL REFERENCES stores(id)           ON DELETE CASCADE,
  program_id  UUID NOT NULL REFERENCES loyalty_programs(id) ON DELETE CASCADE,
  PRIMARY KEY (store_id, program_id)
);

-- ============================================================
-- 8. ARTICLES (Learn / News)
-- ============================================================
CREATE TABLE articles (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  excerpt       TEXT,
  body          TEXT,
  cover_url     TEXT,
  category      TEXT NOT NULL
    CHECK (category IN ('points-tips', 'economy', 'stores', 'legislation', 'news')),
  reading_mins  INTEGER,
  author        TEXT,
  is_published  BOOLEAN NOT NULL DEFAULT false,
  published_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at    TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_articles_feed     ON articles(is_published, published_at DESC);
CREATE INDEX idx_articles_category ON articles(category, is_published);

CREATE TRIGGER set_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

-- FIX #8: Normalised join table — TEXT[] array cannot be indexed or FK-constrained
CREATE TABLE article_programs (
  article_id  UUID NOT NULL REFERENCES articles(id)           ON DELETE CASCADE,
  program_id  UUID NOT NULL REFERENCES loyalty_programs(id)   ON DELETE CASCADE,
  PRIMARY KEY (article_id, program_id)
);

CREATE INDEX idx_article_programs_program ON article_programs(program_id);

-- ============================================================
-- 9. USER ARTICLE READS
-- ============================================================
CREATE TABLE user_article_reads (
  user_id       UUID NOT NULL REFERENCES profiles(id)  ON DELETE CASCADE,
  article_id    UUID NOT NULL REFERENCES articles(id)  ON DELETE CASCADE,
  read_at       TIMESTAMPTZ DEFAULT now() NOT NULL,
  bookmarked    BOOLEAN NOT NULL DEFAULT false,
  bookmarked_at TIMESTAMPTZ,            -- FIX: timestamp was missing for sorting bookmarks
  PRIMARY KEY (user_id, article_id)
);

ALTER TABLE user_article_reads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_article_reads: own rows only" ON user_article_reads
  USING (auth.uid() = user_id);

-- ============================================================
-- 10. PUSH SUBSCRIPTIONS
-- FIX #10: This table was entirely missing despite a
-- POST /api/notifications/subscribe endpoint being defined in the API.
-- ============================================================
CREATE TABLE push_subscriptions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  endpoint    TEXT NOT NULL,
  p256dh_key  TEXT NOT NULL,
  auth_key    TEXT NOT NULL,
  user_agent  TEXT,
  created_at  TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE (user_id, endpoint)
);

ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "push_subscriptions: own rows only" ON push_subscriptions
  USING (auth.uid() = user_id);

-- Notification log — audit trail of what was sent and when
CREATE TABLE user_notifications (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type      TEXT NOT NULL
    CHECK (type IN ('expiry-alert', 'balance-stale', 'transfer-bonus', 'goal-reached', 'news')),
  title     TEXT NOT NULL,
  body      TEXT,
  sent_at   TIMESTAMPTZ DEFAULT now() NOT NULL,
  read_at   TIMESTAMPTZ
);

CREATE INDEX idx_user_notifications_user ON user_notifications(user_id, sent_at DESC);
```

---

## 3. API Design

### Endpoint Structure (REST + tRPC hybrid)

```
Public (no auth):
  GET  /health
  GET  /api/programs           → List all loyalty programs

Authenticated (JWT cookie):
  Wallet
    GET  /api/wallet/summary    → Total value, all balances
    GET  /api/wallet/activity   → Transaction history

  Cards / Programs
    GET  /api/programs/user             → User's linked programs
    POST /api/programs/user             → Add a program
    PATCH /api/programs/user/:id        → Update balance
    DELETE /api/programs/user/:id       → Remove a program

  OCR
    POST /api/ocr/extract               → Submit screenshot, returns extracted value
    POST /api/ocr/confirm               → Confirm extracted value → saves to DB

  Goals
    GET  /api/goals                     → User's goals + progress
    POST /api/goals                     → Create goal
    PATCH /api/goals/:id                → Update goal
    DELETE /api/goals/:id               → Archive goal

  Coach / Suggestions
    GET  /api/suggestions               → AI-generated plays & suggestions

  Stores
    GET  /api/stores                    → Browse store catalogue
    GET  /api/stores/nearby?lat=&lng=  → Nearby stores

  Pointr Card
    GET  /api/pointr-card               → Get user's barcode + linked programs
    POST /api/pointr-card/link          → Link a program to Pointr Card

  Learn
    GET  /api/articles                  → Paginated articles (with personalisation)
    GET  /api/articles/:slug            → Single article
    POST /api/articles/:id/read         → Mark as read
    POST /api/articles/:id/bookmark     → Toggle bookmark

  Notifications
    POST /api/notifications/subscribe   → Web push subscription
    DELETE /api/notifications/subscribe → Unsubscribe

  Admin (internal only):
    POST /admin/programs/:id/update-rates → Update conversion rates
    POST /admin/articles                  → Publish article
```

---

## 4. Points Valuation Engine

This is the core business logic — converting raw point balances to AUD estimates.

```typescript
// lib/valuation/engine.ts

interface ValuationConfig {
  programSlug: string;
  baseValueCentsPerPoint: number;   // Conservative face value
  redemptionTiers: RedemptionTier[];
  lastVerified: Date;
}

interface RedemptionTier {
  name: string;           // "Business Class to Asia"
  centsPerPoint: number;  // 4.2
  confidence: 'high' | 'medium' | 'low';
}

// v1 hardcoded (safe, stable) values — per research report
const PROGRAM_VALUATIONS: Record<string, ValuationConfig> = {
  'everyday-rewards': {
    programSlug: 'everyday-rewards',
    baseValueCentsPerPoint: 0.50,  // 2,000pts = $10
    redemptionTiers: [
      { name: 'Supermarket savings', centsPerPoint: 0.50, confidence: 'high' },
      { name: 'Qantas Points transfer', centsPerPoint: 0.435, confidence: 'medium' },
    ],
    lastVerified: new Date('2026-05-01'),
  },
  'flybuys': {
    programSlug: 'flybuys',
    baseValueCentsPerPoint: 0.50,  // 2,000pts = $10
    redemptionTiers: [
      { name: 'Coles supermarket', centsPerPoint: 0.50, confidence: 'high' },
      { name: 'Velocity transfer', centsPerPoint: 0.435, confidence: 'medium' },
    ],
    lastVerified: new Date('2026-05-01'),
  },
  'qantas': {
    programSlug: 'qantas',
    baseValueCentsPerPoint: 0.60,  // Conservative blended value
    redemptionTiers: [
      { name: 'Domestic economy', centsPerPoint: 1.75, confidence: 'high' },
      { name: 'International economy', centsPerPoint: 1.25, confidence: 'high' },
      { name: 'Business/premium partner', centsPerPoint: 4.5, confidence: 'medium' },
      { name: 'Qantas.com pay', centsPerPoint: 0.60, confidence: 'high' },
      { name: 'Qantas Store', centsPerPoint: 0.55, confidence: 'high' },
    ],
    lastVerified: new Date('2026-05-01'),
  },
  'velocity': {
    programSlug: 'velocity',
    baseValueCentsPerPoint: 0.85,
    redemptionTiers: [
      { name: 'VA domestic economy', centsPerPoint: 1.50, confidence: 'high' },
      { name: 'Business class partner', centsPerPoint: 3.50, confidence: 'medium' },
      { name: 'Velocity Rewards Shop', centsPerPoint: 0.60, confidence: 'high' },
    ],
    lastVerified: new Date('2026-05-01'),
  },
};

export function estimateValue(programSlug: string, points: number): ValuationResult {
  const config = PROGRAM_VALUATIONS[programSlug];
  if (!config) throw new Error(`Unknown program: ${programSlug}`);
  
  const baseEstimate = (points * config.baseValueCentsPerPoint) / 100;
  const bestTier = config.redemptionTiers
    .filter(t => t.confidence !== 'low')
    .sort((a, b) => b.centsPerPoint - a.centsPerPoint)[0];
  const bestEstimate = (points * bestTier.centsPerPoint) / 100;

  return {
    baseValueAUD: baseEstimate,
    bestValueAUD: bestEstimate,
    bestValueTier: bestTier.name,
    centsPerPoint: config.baseValueCentsPerPoint,
    lastVerified: config.lastVerified,
    daysSinceVerified: differenceInDays(new Date(), config.lastVerified),
  };
}
```

**Important:** The UI must always display `lastVerified` date. Values change — this is a legal and trust issue.

---

## 5. AI Coach / Suggestions Engine

The "Pointr Coach" feature (suggested plays) is the highest-value differentiator.

### v1 Approach: Rule-Based + Simple ML
Before building a full ML pipeline, implement a rules engine that covers 80% of cases:

```typescript
// lib/coach/rules.ts

interface CoachRule {
  id: string;
  priority: number;
  condition: (ctx: UserContext) => boolean;
  suggestion: (ctx: UserContext) => Suggestion;
}

interface UserContext {
  programs: UserProgram[];
  goals: Goal[];
  purchaseHistory: Purchase[];
  totalValue: number;
}

const COACH_RULES: CoachRule[] = [
  {
    id: 'expiry-alert',
    priority: 100,  // Always highest priority
    condition: ctx => ctx.programs.some(p => isExpiringWithin90Days(p)),
    suggestion: ctx => ({
      type: 'alert',
      title: 'Points expiring soon',
      description: `Your ${getExpiringProgram(ctx).name} points expire in ${daysUntilExpiry(ctx)} days`,
      action: 'Use or transfer now',
      urgency: 'high',
    }),
  },
  {
    id: 'flybuys-cashout-threshold',
    priority: 80,
    condition: ctx => getFlybuysBalance(ctx) >= 2000,
    suggestion: ctx => ({
      type: 'play',
      title: `Cash out ${getFlybuysBalance(ctx).toLocaleString()} Flybuys`,
      description: `Convert to $${(getFlybuysBalance(ctx) / 200).toFixed(0)} in your Coles account`,
      action: 'Cash out',
    }),
  },
  {
    id: 'goal-routing',
    priority: 70,
    condition: ctx => ctx.goals.some(g => g.status === 'active' && g.targetProgramId),
    suggestion: ctx => generateGoalRoutingSuggestion(ctx),
  },
  {
    id: 'transfer-bonus',
    priority: 60,
    condition: ctx => isCurrentTransferBonusActive('amex', 'velocity'),
    suggestion: ctx => ({
      type: 'play',
      title: 'Transfer bonus: Amex MR → Velocity',
      description: '15% bonus transfer active until end of month',
      action: 'Transfer now',
    }),
  },
];
```

### v2 Approach: LLM-Powered Coach (Post-MVP)
Once user base is established, feed anonymised patterns to a fine-tuned LLM:

```typescript
// lib/coach/llm-coach.ts
// Uses Claude API to generate personalised suggestions
// Input: user context (programs, goals, history, location)
// Output: ranked list of actionable suggestions with explanations
```

---

## 6. Pointr Card Architecture (Critical: Legal & Technical)

> **This is the most ambitious feature and the one with the greatest risk of being blocked at the store level.** Design the backend to handle this gracefully.

### How it works (technical):
1. Each user gets a unique CODE128 barcode tied to their Pointr account
2. When scanned at a participating store, the store's POS system sends the barcode to **Pointr's partner integration endpoint**
3. Pointr's backend looks up which loyalty program the user has linked for that store
4. Pointr returns the user's actual program membership number to the store's system
5. The store's system awards points to the user's native loyalty program as normal

### The problem:
This requires **formal partnership agreements with each retailer** (Woolworths, Coles, etc.). This is NOT something Pointr can implement unilaterally. The scan will simply fail at checkout until a partnership is in place.

### v1 Backend Approach:
```typescript
// The barcode exists as a digital card for the USER — like a Google Wallet/Apple Wallet pass
// It does NOT attempt to intercept the retailer's scanner in v1

// Instead, v1 Pointr Card = a convenient digital display:
// - Tap "Pointr Card" → see all your barcodes in one place
// - Each program's barcode is shown in sequence or user selects the store
// - This is legally safe — just displaying the user's own member number

// The "one universal scan" feature is the v3 roadmap item requiring partnerships
```

**Wallet Pass Generation (Apple Wallet / Google Wallet):**
```typescript
// lib/wallet-pass/generate.ts
// This is the "delight feature" from the research report — gets word-of-mouth

import { PKPass } from 'passkit-generator';

async function generateAppleWalletPass(userProgram: UserProgram): Promise<Buffer> {
  const pass = await PKPass.from({
    model: './models/loyalty.pass',
    certificates: { /* Apple Developer certs */ },
  }, {
    serialNumber: userProgram.id,
    description: `${userProgram.program.name} via Pointr`,
    organizationName: 'Pointr',
    barcodes: [{
      message: userProgram.memberNumber,
      format: 'PKBarcodeFormatCode128',
      messageEncoding: 'iso-8859-1',
    }],
    generic: {
      primaryFields: [{ key: 'balance', label: 'Points', value: userProgram.balance.toLocaleString() }],
      secondaryFields: [{ key: 'value', label: 'Est. Value', value: `$${estimatedValue}` }],
    },
  });
  return pass.getAsBuffer();
}
```

---

## 7. Security & Privacy

### Financial Data Protection
- All member numbers encrypted at rest (AES-256) — stored in encrypted column
- Member numbers never logged or exposed in API responses (masked as `···· 1234`)
- RLS policies in Supabase ensure users can ONLY access their own data
- HTTPS only; HSTS with `max-age=31536000`

### Australian Privacy Act Compliance
```typescript
// Required disclosures and controls:
// 1. Privacy policy clearly states what data is collected and why
// 2. Users can export all their data (JSON export endpoint)
// 3. Users can delete their account + all data (hard delete, not soft)
// 4. No selling of user data to third parties
// 5. OCR screenshots deleted within 1 hour of processing
// 6. Push notification opt-in is explicit (never default-on)
```

### Rate Limiting
```typescript
// All endpoints protected by Upstash Redis rate limiting
const authLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '10 m'),  // 5 magic links per 10 min
});

const ocrLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 h'),   // 10 OCR scans per hour
});
```

### OWASP Top 10 Mitigations
| Risk | Mitigation |
|------|-----------|
| Injection | Drizzle parameterised queries, Zod input validation |
| Broken auth | Magic links + httpOnly JWT cookies, no password storage |
| Sensitive data exposure | Encrypted member numbers, masked in responses |
| CSRF | SameSite=Strict cookies, CSRF tokens |
| Security misconfiguration | Environment variables via Doppler secrets manager |
| Logging sensitive data | Structured logging with PII scrubber middleware |

---

## 8. Infrastructure & Deployment

```
Production Architecture:
─────────────────────────────────────────────────────
Frontend: Vercel (Sydney edge region)
Backend API: Railway or Fly.io (Sydney ap-southeast-2)
Database: Supabase (Sydney region — ap-southeast-2)
Cache: Upstash Redis (Sydney region)
File Storage: Supabase Storage (Sydney)
Email (magic links): Resend
Push Notifications: Web Push (VAPID) via backend
CDN (article images): Cloudflare R2
Monitoring: Sentry (errors) + Axiom (logs)
Uptime: Better Uptime
```

**Why Sydney region for everything?**
- Australian Privacy Act requires data residency considerations
- Performance for Australian users (latency matters for checkout barcode display)
- Consumer trust — "your data stays in Australia"

---

## 9. Backend Project Structure

```
apps/api/
├── src/
│   ├── routes/
│   │   ├── wallet.ts
│   │   ├── programs.ts
│   │   ├── ocr.ts
│   │   ├── goals.ts
│   │   ├── coach.ts
│   │   ├── stores.ts
│   │   ├── pointr-card.ts
│   │   ├── articles.ts
│   │   └── notifications.ts
│   ├── lib/
│   │   ├── valuation/       # Points-to-AUD engine
│   │   ├── coach/           # Suggestion rules engine
│   │   ├── ocr/             # Server-side OCR orchestration
│   │   ├── wallet-pass/     # Apple/Google Wallet pass generation
│   │   ├── notifications/   # Web push
│   │   └── db/              # Drizzle client + queries
│   ├── middleware/
│   │   ├── auth.ts          # JWT verification
│   │   ├── rate-limit.ts
│   │   └── logging.ts
│   ├── jobs/                # BullMQ workers
│   │   ├── expiry-alerts.ts
│   │   ├── valuation-refresh.ts
│   │   └── content-sync.ts
│   └── index.ts             # Hono app entry
└── drizzle/
    ├── migrations/          # SQL migration files
    └── schema.ts            # Drizzle schema definitions
```

---

## 10. Testing Strategy

| Layer | Tool | Coverage |
|-------|------|----------|
| Unit (valuation engine) | Vitest | 95% — this is the core logic |
| Unit (coach rules) | Vitest | 90% |
| Integration (API routes) | Supertest | All routes |
| DB (query correctness) | Vitest + test DB | Critical queries |
| E2E | Playwright (shared with frontend) | User journeys |
| Load testing | k6 | 500 concurrent users baseline |

---

## 11. Open Questions Requiring Answers Before Building

1. **Pointr Card partnerships** — Which retailers are willing to have a partnership conversation? Woolworths and Coles are the most important. Without at least one, v1 of Pointr Card is "digital card display only".

2. **OCR data retention policy** — Screenshots processed client-side (Tesseract.js) never touch the server. If server-side OCR is ever used (Google ML Kit), a written data retention + deletion policy is required under the Privacy Act.

3. **Conversion rate update cadence** — Who is responsible for verifying and updating point valuations? This needs to be a manual process with an admin dashboard, not automated web scraping (legal risk).

4. **Content strategy for Learn/News** — Who writes the articles? A dedicated editor, outsourced content team, or AI-assisted drafts reviewed by a human? This section requires ongoing operational cost.

5. **Subscription billing** — Stripe is the default. Has a business entity been set up in Australia for subscription billing? (Required for legitimate Stripe account.)
