# Pointr — System Blueprint & Project Plan

> *"Your points have never known their worth — until now."*

---

## 1. What Is Pointr?

Pointr is an Australian-first, mobile rewards intelligence app that consolidates every loyalty program a person holds into a single dashboard, converts raw point balances into real AUD values, coaches users on how to maximise those values, and — eventually — allows users to scan a single Pointr Card barcode instead of carrying and scanning each individual loyalty card.

**The problem it solves:** Australians collectively hold billions of dollars in unclaimed or underused loyalty points. Most people don't know:
- How much their points are actually worth in dollars
- When their points are about to expire
- What the best redemption option is for their specific goal
- That transferring points between programs can 2–6x their value

**Pointr answers all of these questions — automatically, in one place.**

---

## 2. Who Is It For?

### Primary User Personas

**Persona 1: The Everyday Maximiser (core market)**
- Age: 28–45, professional household, dual income
- Holds: Flybuys, Everyday Rewards, maybe Qantas or Velocity
- Behaviour: Shops regularly at Coles/Woolworths, earns points passively
- Pain: Never checks points until they need to use them; often find they've expired or are worth less than expected
- Goal: Save money on everyday spending; maybe fund a holiday

**Persona 2: The Points Enthusiast (power user)**
- Age: 30–55, frequent traveller
- Holds: Qantas Frequent Flyer, Velocity, Amex MR, credit card programs
- Behaviour: Actively manages points, reads Point Hacks and AFF
- Pain: Multiple apps and spreadsheets to track everything; misses transfer bonuses
- Goal: Business class flights, hotel upgrades — maximum value extraction

**Persona 3: The Goal-Oriented Saver**
- Age: 22–35, younger demographic
- Holds: Flybuys, Everyday Rewards (just starting out)
- Behaviour: Uses Coles/Woolworths weekly; has a specific savings goal (holiday, home goods)
- Pain: Doesn't know if they're on track; no visibility into progress
- Goal: Fund a specific purchase or trip using points they already have

### Market Size
- Australia has ~26 million people; ~80% of households participate in at least one loyalty program
- Qantas FF alone has 15+ million members; Flybuys 8+ million; Everyday Rewards 12+ million
- Total addressable market: ~15 million potential users
- Realistic initial target (AU, iOS/Android): 100,000 users in Year 1

---

## 3. What Does It Do? (Feature Map)

### Core Features (v1 — Launch)

| Feature | Description | Status |
|---------|-------------|--------|
| Multi-program dashboard | See all your points in one place | v1 |
| AUD value conversion | Convert points to estimated dollar value | v1 |
| Manual balance entry | Enter your balance by typing | v1 |
| OCR balance update | Photograph/screenshot balance to auto-fill | v1 |
| Expiry alerts | Push notification before points expire | v1 |
| Goals | Set a redemption target (travel, retail, cash) | v1 |
| Coach suggestions | Rule-based "plays" based on your data | v1 |
| Pointr Card (display) | Digital wallet of your existing barcodes | v1 |
| Apple Wallet / Google Wallet pass | Add programs to native wallet | v1 |
| Learn / News | Educational articles and program news | v1 |

### Growth Features (v2 — Month 4–9)

| Feature | Description |
|---------|-------------|
| Smart transfers | Transfer calculator + bonus alerts |
| Points calendar | Show when earn bonuses are active at stores |
| Purchase history insights | "You've spent $X at Coles this year" |
| Spending suggestions | "Buy Tim-Tams now — 10x points active" |
| Credit card comparison | Affiliate-linked card recommendations |
| Family sharing | Pool points across household members |

### Aspirational Features (v3 — Month 9–18)

| Feature | Description | Dependency |
|---------|-------------|-----------|
| Pointr Card (universal scan) | One barcode for all stores | Retailer partnerships |
| Live balance sync | Automatic balance refresh without OCR | CDR expansion or formal API partnerships |
| Availability search | Find award flights using your points (QFF/Velocity) | Partner API access |
| Points marketplace | Buy/sell/gift points between programs | Regulatory + program approval |

---

## 4. The Challenges (Honest Assessment)

This is the section that most founders skip. Pointr has **five genuinely hard problems** that must be solved or worked around, not ignored.

---

### Challenge 1: No APIs — The Data Access Wall 🔴 CRITICAL

**The problem:** There is NO programmatic way to access Australian loyalty point balances in 2026.
- Everyday Rewards: No public API, prohibits credential sharing
- Flybuys: No public API, prohibits credential sharing
- Qantas Frequent Flyer: Restricted partner-only API, no consumer balance access
- Velocity: No public API, prohibits credential sharing
- Loyalty is NOT in CDR scope — no regulatory forcing function

**What this means for Pointr:**
- v1 MUST use manual entry + OCR (screenshot scanning)
- Credential-based scraping (screen scraping behind login) is legally risky and can result in account termination for users
- Automatic balance sync is NOT possible in v1

**The mitigation:**
- Make manual entry + OCR genuinely delightful — fast, accurate, with a confirmation step
- Frame as "You control your data, no passwords shared" — turn a constraint into a trust feature
- Apple/Google Wallet passes get word-of-mouth without requiring live data

**What could change this:** CDR expansion to loyalty (no timeline announced as of May 2026), or formal data partnership agreements with programs after achieving user scale.

---

### Challenge 2: The Pointr Card Illusion 🔴 CRITICAL

**The problem:** The vision of "scan one barcode at all stores" is technically and legally complex.

The concept requires:
1. Each retailer's POS (point-of-sale) system must be able to recognise a Pointr barcode
2. Pointr must have a real-time integration with the retailer's loyalty system
3. This requires bilateral partnership agreements with Woolworths Group, Coles Group, and every other chain
4. Woolworths and Coles are large enterprises with long partnership timelines (12–24 months minimum)

**Without formal partnerships, the barcode simply does nothing at the checkout — the cashier will see an error.**

**v1 Honest Scope of Pointr Card:**
- A beautiful digital display of the user's existing loyalty barcodes
- Apple Wallet / Google Wallet passes for each program
- A single Pointr "Card" screen where users select which loyalty card to show
- The aspirational "one scan" story communicated as "coming soon"

**Do NOT:** Promise universal scanning capability in marketing materials before partnerships are live. This is a consumer law risk (misleading representations).

---

### Challenge 3: Point Valuations Go Stale 🟡 IMPORTANT

**The problem:** Conversion rates change. Qantas devalued points in 2023. Flybuys regularly adjusts earn rates. If Pointr shows $3,485 for a Qantas balance and the actual redemption gets the user $2,100, trust is destroyed.

**The mitigation:**
- Always display "Last verified: [date]" next to every dollar estimate
- Show a range (conservative to best-case) rather than a single number
- Create an internal process for weekly manual verification of key rates
- Never frame estimates as exact dollar values in legal/marketing copy

---

### Challenge 4: The Content Section Requires Editorial Capacity 🟡 IMPORTANT

**The problem:** The Learn/News section requires ongoing content creation. This is a product and operational commitment that many product teams underestimate.

- Legislation changes? Someone needs to write about it.
- Flybuys changes earn rates at fuel? Someone needs to write about it.
- New credit card launches? Someone needs to write about it.

**Content is never "set and forget."**

**The mitigation:**
- v1: Launch with 10–15 cornerstone articles (evergreen content that doesn't expire)
- v2: Partner with Point Hacks or Australian Frequent Flyer community for content licensing or contribution
- v3: Hire or contract a dedicated loyalty/finance editor

---

### Challenge 5: The "Last 2 Months of Tim-Tams" Problem 🟡 IMPORTANT

**The problem:** The vision includes "based on purchase history at Coles, we know you bought Tim-Tams and there's a 10x bonus — buy now." This is compelling but requires:
- Access to transaction-level purchase data from Coles/Woolworths
- The programs do NOT share this with third parties
- CDR does not cover loyalty

**The mitigation:**
- v1: Suggestions based on points balances + goals only (no transaction history needed)
- v2: Allow users to manually log categories of spending ("I mainly shop at Coles for groceries")
- v3: If Flybuys/Everyday Rewards launches a partner API, this becomes possible

---

## 5. Strengths & Opportunity

1. **Thin competitive field** — No Australian-native points tracking tool that does dollar valuation well. AwardWallet works but has weak AU coverage. Stocard pivoted away. Point Hacks is content, not a tool.

2. **Market is actively spending** — Loyalty program participation in AU is at record highs post-COVID. People are actively seeking value in a high-cost-of-living environment.

3. **Freemium model is proven** — WeMoney ($10/mo), AwardWallet ($29.99/yr), MaxRewards ($50/yr) prove Australians pay for financial tools that save them money.

4. **Learn/News is a moat** — Content drives SEO, which drives organic acquisition. Point Hacks built a multi-million dollar business on this model. Pointr can combine tools + content.

5. **Affiliate revenue is high-value** — Credit card affiliate commissions in AU are AU$50–$300 per approved application. Even 100 conversions per month = significant revenue.

6. **The "Aha moment" is powerful** — Showing someone their points are worth $5,500 for the first time is memorable and shareable. This drives word-of-mouth.

---

## 6. Business Model

### Revenue Streams

| Stream | v1 | v2 | v3 |
|--------|----|----|-----|
| Free tier | ✓ | ✓ | ✓ |
| Premium (AU$4.99/mo or AU$39/yr) | ✓ | ✓ | ✓ |
| Premium+ (AU$9.99/mo) | — | ✓ | ✓ |
| Credit card affiliates | — | ✓ | ✓ |
| Hotel/travel booking affiliates | — | ✓ | ✓ |
| B2B white-label (banks, fintechs) | — | — | ✓ |

### Tier Contents

**Free:**
- Up to 4 programs
- Manual entry only
- Basic balance display + expiry tracking
- 3 saved articles

**Premium (AU$4.99/mo):**
- Unlimited programs
- OCR screenshot scanning
- Cents-per-point valuations
- Goal tracking + coach suggestions
- Expiry push alerts
- Apple/Google Wallet pass generation
- Full Learn/News access

**Premium+ (AU$9.99/mo) — v2:**
- Transfer calculator + bonus alerts
- Family sharing (up to 4 members)
- Redemption availability search (QFF/Velocity classic rewards)

---

## 7. Step-by-Step Build Plan

### Stage 0: Pre-Build (Week 1–2) — NOW

- [ ] Verify the four core conversion rates manually from program websites (Everyday Rewards, Flybuys, QFF, Velocity) — document with screenshots and dates
- [ ] Get legal memo on: Privacy Act obligations for storing member numbers + encrypted data; T&C position on credential sharing
- [ ] Decide explicitly: v1 is manual + OCR only. Do not promise credential aggregation on any public-facing roadmap
- [ ] Register company (Pty Ltd) in Australia for banking, Stripe, and legal identity
- [ ] Set up domains, brand assets, Figma design system based on design.md
- [ ] Identify who handles content for Learn/News section

---

### Stage 1: v1 MVP (Month 1–3)

**Month 1: Foundation**
- [ ] Set up monorepo (Turborepo: apps/web + apps/api + packages/types)
- [ ] Supabase project (Sydney region) + database schema
- [ ] Auth: magic link email via Resend + Supabase Auth
- [ ] Core API: programs CRUD, user_programs CRUD, basic wallet summary
- [ ] Valuation engine: hardcoded conversion rates for 4 programs
- [ ] Frontend: Next.js PWA scaffold + Tailwind design tokens
- [ ] Frontend: Wallet screen + Cards screen (manual entry)

**Month 2: Core Features**
- [ ] OCR integration: Tesseract.js client-side + confirmation UX
- [ ] Goals: create, track, progress calculation
- [ ] Coach: rule-based suggestions engine (top 10 rules)
- [ ] Pointr Card: digital display of existing barcodes + brightness control
- [ ] Apple Wallet / Google Wallet pass generation (backend)
- [ ] Learn/News: article CMS (Sanity or Contentful) + frontend screens
- [ ] Push notifications: expiry alerts + Web Push setup

**Month 3: Polish + Launch**
- [ ] Onboarding flow: 5-step guided setup
- [ ] Stores screen: manual product catalogue (curated)
- [ ] PWA manifest + service worker (offline support)
- [ ] Performance pass: Lighthouse CI > 90 on all metrics
- [ ] Privacy policy + Terms of Service (Australian legal)
- [ ] Soft launch: 100 beta users from waitlist
- [ ] Sentry + PostHog analytics live

**Launch checklist:**
- [ ] Conversion rates verified on day of launch
- [ ] Privacy policy published and linked from app
- [ ] ACCC/consumer law review of any "value" claims in marketing
- [ ] Support email active
- [ ] TestFlight (iOS) + internal testing (Android) — PWA install
- [ ] Public launch announcement

---

### Stage 2: Monetisation (Month 4–9)

- [ ] Stripe subscription billing (Premium + Premium+)
- [ ] Credit card affiliate placements (Commission Factory, Impact)
- [ ] Transfer calculator with bonus detection
- [ ] Purchase category input (manual "I shop mainly at Coles for groceries")
- [ ] Earn calendar (showing bonus point events at stores)
- [ ] Publish monthly "AU Points Valuations" article for SEO
- [ ] First partnership conversations with Woolworths/Coles BD teams

---

### Stage 3: Defensibility (Month 9–18)

- [ ] Approach Qantas Loyalty + Woolworths Loyalty for formal data partnerships (after 10k+ users — leverage)
- [ ] QFF/Velocity classic reward availability search (premium+)
- [ ] Family sharing
- [ ] Pointr Card partnership pilots (if retailer conversations progress)
- [ ] Evaluate native shell (Capacitor or React Native wrapper) based on distribution data
- [ ] B2B pipeline: banks, fintech companies interested in white-label

---

## 8. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Major AU loyalty program devalues points | High | Medium | "Last verified" always shown; user gets an alert |
| Woolworths/Coles refuses partnership talks | High | High | v1 Pointr Card works as digital display anyway; partnership not required for v1 |
| CDR never expands to loyalty | Medium | High | Build for manual+OCR permanently; position as privacy-first feature |
| Competitor launches with $5M+ funding | Medium | High | Focus on content+tool moat; be first with opinionated AU-specific valuations |
| Program T&C enforcement (credential scraping) | Low | Critical | Do NOT build credential scraping. Manual + OCR only. |
| Privacy Act breach (member number leak) | Low | Critical | Encrypt at rest, RLS, regular security audits |
| OCR accuracy complaints from users | High | Medium | Mandatory confirmation step; easy manual override; show confidence score |
| Content section goes stale | High | Medium | Assign editorial responsibility before launch; 15 cornerstone articles on day 1 |

---

## 9. What You May Have Forgotten

These items were not explicitly mentioned but are critical:

**Legal & Compliance:**
- A **Privacy Collection Notice** is required at the point of collecting member numbers (Privacy Act 1988)
- Any dollar value shown must include **"estimated"** or **"approximate"** disclaimer — showing $3,485 as a precise value could be misleading under Australian Consumer Law
- The **Pointr Card** marketing must not promise store acceptance that doesn't exist yet — ACCC misleading representations risk
- Consider AFSL (Australian Financial Services Licence) implications if Pointr ever "advises" users on financial products (credit cards, investments)

**Operational:**
- **Update cadence for conversion rates** — who does this, how often, what's the process?
- **Customer support** — even with 1,000 users, people will email when OCR doesn't work
- **Incident response** — what happens if a loyalty program changes their app UI and OCR breaks?

**Product:**
- **Balance staleness UX** — what happens to a user who hasn't updated a balance in 3 months? The dashboard should clearly show stale data, not silently show wrong values
- **Onboarding drop-off** — adding a loyalty card is friction. Measure this carefully. If >50% drop off during card addition, the core funnel fails
- **Dark mode** — non-negotiable for a premium fintech app in 2026
- **Accessibility** — WCAG AA minimum. Older users (50+) are in the primary market

**Technical:**
- **Barcode format compatibility** — Qantas uses Code 128, Flybuys uses EAN-13. The Pointr Card display must use the correct format per program
- **Multi-device sync** — if a user updates a balance on their phone, it should reflect immediately on their tablet
- **Data export** — users must be able to export all their data (Privacy Act obligation + trust signal)

---

## 10. Success Metrics

### North Star Metric
**Weekly Active Users who have updated at least one balance in the last 7 days**
(Not DAU — a loyalty app is not a daily-use product for most users, and that's fine)

### Supporting Metrics

| Metric | v1 Target (3 months) | v2 Target (9 months) |
|--------|---------------------|---------------------|
| Registered users | 5,000 | 50,000 |
| Cards added per user | 2.5 | 3.5 |
| Balances updated in last 30 days | 60% | 70% |
| Premium conversion | — | 8% |
| OCR success rate | >85% | >90% |
| Goal creation rate | 30% of users | 50% of users |
| Push notification opt-in | 40% | 50% |
| Affiliate revenue per MAU | — | AU$0.50 |
| App Store rating | — | >4.3 ★ |

---

## 11. Summary: The Honest Pitch

**Pointr is a real, buildable product with a genuine gap in the Australian market.**

The design is compelling. The user need is proven. The competitive field is weak. The business model is clear.

**But it will succeed or fail on three things:**

1. **Solving the data problem elegantly** — Manual + OCR must feel so easy and trustworthy that users do it willingly. If updating a balance feels like a chore, retention dies.

2. **Delivering on the "coach" promise** — The app must make users feel like they have a financial advisor for their points. If suggestions are generic or wrong, trust breaks.

3. **Not over-promising on the Pointr Card** — This is the sexy differentiator that will attract press and users. But if users scan it at Coles and nothing happens, they uninstall immediately. The story of what Pointr Card *is today* vs *where it's going* must be managed with extreme care.

**Build it. But build it honestly.**
