# Pointr — Frontend Architecture & Best Practices

> **Approach:** Mobile-first Progressive Web App (PWA) in v1. Native shell (React Native / Capacitor) evaluated at Stage 3 only after PWA distribution caps. This keeps time-to-market fast, keeps a single codebase, and allows iOS/Android install via "Add to Home Screen" without App Store gatekeeping.

---

## 1. Technology Stack

### Core Framework
**React 18 + TypeScript (strict mode)**

Why React over Next.js/Vue/Svelte?
- Largest ecosystem for fintech UI component libraries
- React Native path available when native shell needed
- Team knowledge dominates the market
- Server Components available via Next.js when needed

### Meta-Framework
**Next.js 14+ (App Router)**

- File-based routing maps cleanly to app sections (wallet, cards, rewards, stores, goals, learn)
- App Router enables React Server Components for content-heavy sections (Learn/News)
- Built-in image optimisation for article covers and merchant logos
- Edge runtime for middleware (auth checks, geolocation routing)
- PWA support via `next-pwa` or custom service worker

### Styling
**Tailwind CSS v3 + CSS Variables**

- Utility-first keeps component styles co-located and scannable
- Design tokens (colours, spacing, radius) defined as CSS custom properties — enables dark mode, theming
- `tailwind.config.js` extended with Pointr's full design system
- No CSS-in-JS runtime cost

**Do NOT use:** styled-components, emotion, or CSS Modules for component styles. Tailwind only.

### Animation
**Framer Motion**

- Spring animations for cards, modals, transitions
- `AnimatePresence` for route transitions
- `useMotionValue` for gesture-driven interactions (swipe to reveal)
- `layout` prop for smooth height/width transitions when cards expand

### State Management
**Zustand** (global) + **TanStack Query** (server state)

```
State Layer Map
─────────────────────────────────────────────────────
UI State (tabs, modals, drawers)   → Zustand store
User / Auth session                → Zustand store
Points balances (fetched data)     → TanStack Query
Goals, cards, suggestions          → TanStack Query
Form state                         → React Hook Form
```

Why not Redux? Overkill for this app. Zustand is 8x smaller and has simpler API.
Why not Context? Performance issues with frequent re-renders on balance updates.

### Forms
**React Hook Form + Zod**

- Manual balance entry forms validated with Zod schemas
- Zod schemas shared between frontend and backend (monorepo)
- Zero re-renders on keystroke — critical for smooth UX

---

## 2. Project Structure

```
pointr/
├── apps/
│   └── web/                        # Next.js PWA
│       ├── app/
│       │   ├── (auth)/
│       │   │   ├── login/
│       │   │   └── magic-link/
│       │   ├── (app)/
│       │   │   ├── layout.tsx       # Bottom nav, auth guard
│       │   │   ├── wallet/
│       │   │   ├── cards/
│       │   │   ├── rewards/
│       │   │   ├── stores/
│       │   │   ├── goals/
│       │   │   └── learn/
│       │   ├── api/                 # Next.js Route Handlers
│       │   └── layout.tsx           # Root layout, providers
│       ├── components/
│       │   ├── ui/                  # Atomic design system
│       │   │   ├── Button/
│       │   │   ├── Card/
│       │   │   ├── Badge/
│       │   │   ├── ProgressBar/
│       │   │   ├── BottomSheet/
│       │   │   └── VirtualCard/
│       │   ├── features/            # Feature-specific components
│       │   │   ├── wallet/
│       │   │   ├── cards/
│       │   │   ├── rewards/
│       │   │   ├── goals/
│       │   │   └── pointr-card/
│       │   └── shared/              # Cross-feature components
│       │       ├── Navigation/
│       │       ├── CoachCard/
│       │       └── ActivityFeed/
│       ├── hooks/                   # Custom React hooks
│       │   ├── useOCR.ts
│       │   ├── usePointsValue.ts
│       │   ├── useGoalProgress.ts
│       │   └── usePoinrCard.ts
│       ├── stores/                  # Zustand stores
│       │   ├── auth.store.ts
│       │   ├── ui.store.ts
│       │   └── wallet.store.ts
│       ├── lib/
│       │   ├── api/                 # API client (typed)
│       │   ├── ocr/                 # Tesseract.js integration
│       │   ├── barcode/             # Barcode generation
│       │   └── analytics/
│       └── public/
│           ├── manifest.json        # PWA manifest
│           └── sw.js                # Service worker
├── packages/
│   ├── types/                       # Shared TypeScript types
│   ├── schemas/                     # Shared Zod schemas
│   └── utils/                       # Shared utilities
└── package.json                     # Turborepo workspace root
```

---

## 3. Key Libraries & Their Purpose

### Points & Rewards Specific

| Library | Purpose |
|---------|---------|
| `tesseract.js` | Client-side OCR for reading balance screenshots — no screenshot data sent to server |
| `jsbarcode` or `bwip-js` | Generate Code128 barcode for the Pointr Card |
| `qrcode` | QR code fallback for Pointr Card |
| `@react-native-camera-kit` | Camera access for OCR (future native) |

### UI & Interaction

| Library | Purpose |
|---------|---------|
| `framer-motion` | Animations, gestures, page transitions |
| `@radix-ui/react-*` | Accessible UI primitives (Dialog, Select, Tooltip, etc.) |
| `lucide-react` | Icon system |
| `recharts` | Points balance charts, goal progress charts |
| `react-virtuoso` | Virtualised lists for activity feed (performance) |
| `react-hot-toast` | Non-intrusive notifications |
| `@use-gesture/react` | Swipe gestures on cards |

### Data & Networking

| Library | Purpose |
|---------|---------|
| `@tanstack/react-query` | Server state, caching, background refetch |
| `axios` | HTTP client with interceptors |
| `zod` | Schema validation (shared with backend) |
| `react-hook-form` | Form management |
| `date-fns` | Date formatting (expiry dates, activity timestamps) |

### PWA & Device

| Library | Purpose |
|---------|---------|
| `next-pwa` | Service worker generation, PWA config |
| `workbox` | Offline caching strategies |
| `web-push` (backend) | Push notifications |
| `@capacitor/core` | Future native shell (Stage 3) |

---

## 4. OCR Implementation (Critical Feature)

The balance entry via screenshot is the core UX unlock. Here's the implementation approach:

```typescript
// hooks/useOCR.ts
import Tesseract from 'tesseract.js';

export function useOCR() {
  const [status, setStatus] = useState<'idle' | 'processing' | 'done' | 'error'>('idle');

  const extractBalance = async (imageFile: File): Promise<ExtractedBalance> => {
    setStatus('processing');
    
    const worker = await Tesseract.createWorker('eng');
    
    // Configure for numeric balance extraction
    await worker.setParameters({
      tessedit_char_whitelist: '0123456789,.$pts points POINTS',
      tessedit_pageseg_mode: Tesseract.PSM.AUTO,
    });

    const { data } = await worker.recognize(imageFile);
    await worker.terminate();

    // Parse the raw text for point balances
    const balance = parseBalanceFromOCRText(data.text);
    setStatus('done');
    return balance;
  };

  return { extractBalance, status };
}

// The parser needs program-specific patterns
function parseBalanceFromOCRText(text: string): ExtractedBalance {
  // Patterns for each AU loyalty program's balance display
  const patterns = {
    qantas: /(\d{1,3}(?:,\d{3})*)\s*(?:Qantas\s*)?[Pp]oints/,
    velocity: /(\d{1,3}(?:,\d{3})*)\s*(?:Velocity\s*)?[Pp]oints/,
    flybuys: /(\d{1,3}(?:,\d{3})*)\s*(?:Flybuys?\s*)?[Pp]oints/,
    everyday: /(\d{1,3}(?:,\d{3})*)\s*(?:Everyday\s*)?[Rr]ewards?\s*[Pp]oints/,
  };
  // ... match and return
}
```

**OCR User Flow:**
1. User taps "Update balance" on a card
2. Camera opens OR file picker (screenshot from camera roll)
3. Client-side OCR runs — no image leaves device
4. Extracted number shown with "Is this correct? [12,450 points]" confirmation
5. User confirms → balance saved to backend
6. "Last updated: just now" timestamp recorded

---

## 5. Pointr Card Barcode

```typescript
// lib/barcode/generatePoinrCard.ts
import JsBarcode from 'jsbarcode';

export function renderPoinrCardBarcode(
  svgRef: React.RefObject<SVGSVGElement>,
  userId: string
) {
  const barcodeValue = formatPoinrCardId(userId); // "P-0042-8823-1107"
  
  JsBarcode(svgRef.current, barcodeValue, {
    format: 'CODE128',     // Most compatible with retail scanners
    lineColor: '#0F0F0F',
    width: 2.5,
    height: 80,
    displayValue: true,
    font: 'JetBrains Mono',
    fontSize: 14,
    margin: 16,
  });
}
```

**Screen brightness handling:**
```typescript
// When Pointr Card modal opens
useEffect(() => {
  if (isOpen) {
    // Web Screen Wake Lock API — prevents screen dimming
    navigator.wakeLock?.request('screen').then(lock => {
      wakeLockRef.current = lock;
    });
    // Maximise brightness via CSS filter trick on mobile browsers
    document.documentElement.style.filter = 'brightness(1)';
  }
  return () => {
    wakeLockRef.current?.release();
  };
}, [isOpen]);
```

---

## 6. Performance Standards

| Metric | Target | How |
|--------|--------|-----|
| LCP | < 1.8s | Hero card skeleton shown instantly, data streams in |
| FID / INP | < 100ms | No blocking JS on main thread |
| CLS | < 0.05 | Fixed-height card skeletons prevent layout shift |
| TTI | < 3.5s | Code split by route, lazy load OCR module |
| Bundle size | < 200KB gzip initial | Tree-shake Framer Motion, lazy load Tesseract |
| Offline | Core screens work | Service worker caches last-known balances |

### Code Splitting Strategy
```typescript
// Tesseract is ~3MB — never in the initial bundle
const OCRModule = dynamic(() => import('@/lib/ocr/tesseract'), {
  loading: () => <OCRLoadingState />,
});

// Recharts only loaded on Goals/Rewards screens
const GoalProgressChart = dynamic(() => import('@/components/features/goals/Chart'));
```

---

## 7. PWA Configuration

```json
// public/manifest.json
{
  "name": "Pointr",
  "short_name": "Pointr",
  "description": "All your rewards, one place",
  "start_url": "/wallet",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#FAFAF9",
  "theme_color": "#7C3AED",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "screenshots": [
    { "src": "/screenshots/wallet.png", "sizes": "390x844", "type": "image/png", "form_factor": "narrow" }
  ],
  "categories": ["finance", "lifestyle"],
  "shortcuts": [
    { "name": "My Wallet", "url": "/wallet", "icons": [{"src": "/icons/wallet-96.png", "sizes": "96x96"}] },
    { "name": "Pointr Card", "url": "/wallet?scan=true", "icons": [{"src": "/icons/scan-96.png", "sizes": "96x96"}] }
  ]
}
```

### Service Worker Caching Strategy
- **StaleWhileRevalidate**: Article content, store product listings
- **CacheFirst**: Static assets, fonts, icons
- **NetworkFirst**: Points balances, goals (data must be fresh)
- **Background Sync**: Balance updates queued when offline

---

## 8. Authentication Flow

```
Email entered → Magic link sent → Link clicked → JWT issued → Stored in httpOnly cookie
```

- **No passwords** — friction is the enemy of adoption
- JWT stored in httpOnly cookie (not localStorage — XSS protection)
- Refresh token rotation
- Biometric unlock (FaceID/TouchID) via WebAuthn for returning users
- Session invalidated if loyalty credential breach detected

---

## 9. Testing Strategy

| Test Type | Tool | Coverage Target |
|-----------|------|----------------|
| Unit | Vitest | 80% for utility functions |
| Component | React Testing Library | All UI components |
| Integration | Playwright | Critical paths (add card, view balance, scan) |
| Visual regression | Chromatic (Storybook) | All design system components |
| Performance | Lighthouse CI | Every PR |
| Accessibility | axe-core (automated) | All screens |

---

## 10. Frontend Development Workflow

```
Feature branch → PR → Lighthouse CI → Chromatic visual diff
→ Playwright e2e → Preview deployment (Vercel) → Review → Merge
```

### Environment Strategy
- `development`: Local, mock API responses for points data
- `staging`: Real backend, sandboxed loyalty data (manual test accounts)
- `production`: Full monitoring, Sentry error tracking, PostHog analytics

---

## 11. Analytics & Tracking

**PostHog** (self-hostable, privacy-first):
- Feature flags for gradual rollouts (Pointr Card, OCR)
- Session recording for UX debugging (no financial data captured)
- Funnel analysis: Onboarding → first card added → first goal set

**Key events to track:**
- `card_added` (program_name, entry_method: ocr|manual)
- `balance_updated` (program_name, method: ocr|manual)
- `goal_created` (goal_type, target_value)
- `pointr_card_opened`
- `coach_suggestion_applied`
- `article_read` (category, read_time_seconds)

---

## 12. Critical Risks & Frontend Mitigations

| Risk | Mitigation |
|------|-----------|
| OCR reads wrong balance | Mandatory confirmation step; easy manual override |
| Stale balance data | "Last updated X days ago" always visible; push nudge after 14 days |
| Pointr Card not accepted at store | Graceful fallback UI — show native card barcode as backup |
| Offline usage | Service worker serves cached data; "Offline mode" banner shown |
| Large Tesseract bundle | Lazy load only on OCR trigger; show progress indicator |
