# Pointr — UI/UX Design Plan

> **Design Philosophy:** Pointr is a financial intelligence tool disguised as a delightful consumer app. The design must feel *premium but approachable* — like a luxury fintech product that anyone can use. Think Revolut meets a personal financial coach, with an Australian soul.

---

## 1. Visual Identity & Aesthetic Direction

### Brand Personality
- **Confident** — Users trust Pointr with their financial data
- **Smart** — The app does complex maths invisibly
- **Warm** — Not cold like a bank, not gamified like a loyalty card
- **Opinionated** — Pointr tells you what to do, not just shows you data

### Design System Philosophy
The UI reference (Halo Wallet) is an excellent north star. Pointr should evolve it into something distinctly Australian and more actionable.

**Core Design Tokens:**

```
Colour Palette
──────────────────────────────────────────────────────
Primary Gradient:   #A855F7 → #EC4899 → #F97316 (soft mesh)
Surface Light:      #FAFAF9
Surface Card:       #FFFFFF with backdrop-blur
Accent Purple:      #7C3AED
Accent Pink:        #DB2777
Accent Amber:       #D97706
Text Primary:       #0F0F0F
Text Secondary:     #6B7280
Text Muted:         #9CA3AF
Border Subtle:      rgba(0,0,0,0.06)
Destructive:        #EF4444
Success:            #10B981
Warning:            #F59E0B

Dark Mode Surface:  #0A0A0F
Dark Mode Card:     #141420
Dark Mode Elevated: #1C1C2E

Typography
──────────────────────────────────────────────────────
Display:      "Clash Display" (weight 600–700) — bold, geometric, modern
Body:         "Plus Jakarta Sans" (weight 400–500) — clean, readable
Mono (values):"JetBrains Mono" — for $ amounts, points, codes
Fallbacks:    system-ui, -apple-system, sans-serif

Spacing Scale (4px base)
──────────────────────────────────────────────────────
xs:  4px   |  sm:  8px   |  md:  16px
lg:  24px  |  xl:  32px  |  2xl: 48px
3xl: 64px  |  4xl: 96px

Border Radius
──────────────────────────────────────────────────────
Card:         20px
Button:       12px
Pill:         999px
Input:        12px
Inner card:   14px

Shadows
──────────────────────────────────────────────────────
Card Resting:  0 2px 8px rgba(0,0,0,0.06), 0 0 1px rgba(0,0,0,0.04)
Card Hover:    0 8px 24px rgba(0,0,0,0.12), 0 0 1px rgba(0,0,0,0.06)
Modal:         0 24px 64px rgba(0,0,0,0.18)
```

---

## 2. App Structure & Navigation

### Navigation — Bottom Tab Bar (Mobile-First)

```
┌─────────────────────────────────────────────────┐
│  🏠 Wallet │ 💳 Cards │ ⭐ Rewards │ 🏪 Stores  │
│            │           │            │            │
│  🎯 Goals  │ 📖 Learn  │            │ [Scan 🔳] │
└─────────────────────────────────────────────────┘
```

**Primary tabs (5):** Wallet · Cards · Rewards · Stores · Goals
**Secondary:** Learn/News (accessible via Wallet header or tab 6)
**Floating Action:** Pointr Card Scan button (always visible, pill shape, gradient)

### Navigation Behaviour
- Active tab: Filled icon + gradient pill indicator underneath
- Inactive tabs: Outlined icons, muted colour
- The "Scan" / Pointr Card button: Floating, centred, elevated above nav bar — like the camera button in Instagram
- Haptic feedback on tab switch (mobile)

---

## 3. Screen-by-Screen Design Specification

---

### 3.1 WALLET (Home Dashboard)

**Purpose:** Give users an instant pulse on their total financial rewards picture.

**Layout:**
```
┌───────────────────────────────────────────┐
│  Good morning, Sienna 🔔                  │  ← Personalised greeting + notif bell
├───────────────────────────────────────────┤
│  ┌─────────────────────────────────────┐  │
│  │   TOTAL WALLET VALUE                │  │  ← Hero card — gradient mesh
│  │   $7,935                            │  │     background (purple→pink→orange)
│  │   ─────────────────────────────    │  │
│  │   CASH $2,385  │  POINTS EST $5,550 │  │
│  └─────────────────────────────────────┘  │
│                                           │
│  [Pay] [Send] [Top up] [Cash out]         │  ← Quick action pills
│                                           │
│  ┌ POINTR COACH ──────────────────────┐  │  ← Smart suggestion card
│  │ 💡 You're 34,210 pts from Tokyo.   │  │     Mint/sage green tint
│  │    Route Amex spend via Velocity   │  │
│  │    for 6 weeks to land it.    →    │  │
│  └────────────────────────────────────┘  │
│                                           │
│  Your cards ───────────────── All cards → │
│  [Amex Platinum 184,230] [Velocity 62,100]│  ← Horizontal scroll cards
│                                           │
│  Activity ─────────────────── This week ▾ │
│  Mecca Cosmetica  Today  -$185  +568pts   │
│  Qantas QF11      Yest.  -$1,842 +5,480pts│
│  Coles Bondi Jn   Yest.  -$92   +93pts   │
└───────────────────────────────────────────┘
```

**Design Notes:**
- Hero card uses a layered gradient mesh (not flat gradient) — depth via multiple radial gradients
- Total value uses JetBrains Mono, 48px, weight 700
- Quick action buttons: frosted glass pill buttons with subtle border
- Coach card: distinct from regular cards — soft green left border accent
- Activity list: logo favicon for each merchant (fetched from Clearbit or similar), $ in red, points in green with arrow up icon
- Pull-to-refresh with custom animated Pointr logo

---

### 3.2 CARDS (Cards & Loyalty)

**Purpose:** Show every linked rewards program card with its estimated dollar value.

**Layout:**
```
┌───────────────────────────────────────────┐
│  WALLET                                   │
│  Cards & loyalty              [+ Add]     │
├───────────────────────────────────────────┤
│  ┌─────────────────────────────────────┐  │
│  │  AMERICAN EXPRESS           AMEX    │  │  ← Card rendered as virtual card
│  │  Amex Platinum                      │  │     True teal/dark colour matching
│  │                                     │  │     real card design
│  │  MEMBERSHIP REWARDS     ···· 1004   │  │
│  │  184,230                            │  │
│  └─────────────────────────────────────┘  │
│  ┌──────────────────────────────────────┐ │  ← Expandable stats below each card
│  │  POINTS      EST. VALUE    PER PT    │ │
│  │  184,230     $1,582        0.75¢     │ │
│  └──────────────────────────────────────┘ │
│                                           │
│  [Velocity Signature card...]             │
│  [Qantas Frequent Flyer card...]          │
│  [Flybuys card...]                        │
│                                           │
│  ─────── + Add a new program ─────────── │
└───────────────────────────────────────────┘
```

**Design Notes:**
- Virtual cards use real card colour/gradient matching (Amex = teal, Velocity = purple, Qantas = red/orange, Flybuys = orange)
- Card shimmer animation on load (skeleton screen → card reveal)
- Swipe left on a card to reveal: Edit / Remove / View History
- Tapping a card expands an inline stats panel (no new screen needed)
- The "Per Pt" value uses a colour coding: green (>1.5¢), amber (0.7–1.5¢), red (<0.7¢)
- Points expiry warning appears as an amber badge on the card corner if expiring within 90 days
- "Last verified" timestamp shown in muted text below each card's value

---

### 3.3 REWARDS (Rewards Hub)

**Purpose:** Aggregated view of all points with dollar value + smart transfer suggestions.

**Layout:**
```
┌───────────────────────────────────────────┐
│  REWARDS HUB                              │
│  Every point. In one place.               │
├───────────────────────────────────────────┤
│  ┌─────────────────────────────────────┐  │
│  │  COMBINED VALUE                     │  │
│  │  $5,550                             │  │
│  │  Across 4 programs · 526,430 points │  │
│  │  [Pay with points] [Cash out]       │  │
│  └─────────────────────────────────────┘  │
│                                           │
│  Balances                                 │
│  ○ Membership Rewards  184,230  $1,582   │
│  ○ Velocity Points      62,100  $528     │
│  ○ Qantas Points       248,900  $3,485   │
│  ○ Flybuys Points       31,200  $156     │
│                                           │
│  Smart transfers ─────────────────────── │
│  Amex MR → Velocity Pts  1:1 +15% bonus  │
│  Flybuys → Velocity Pts  2000:870         │
│  Velocity → Singapore KrisFlyer  1.35:1  │
│                                           │
│  Expiry Alerts ─────────────────────────  │
│  ⚠️ QFF points expire in 8 months        │
│     (last activity: 8 months ago)         │
└───────────────────────────────────────────┘
```

**Design Notes:**
- Each program balance row has a coloured program icon on the left
- Dollar value shown in a muted green
- Smart transfer rows are tappable → shows transfer calculator overlay
- Transfers with current bonuses get a highlighted amber "BONUS" pill
- Expiry alerts are urgent amber/red inline banners — not dismissible

---

### 3.4 STORES (Points Store / Redeem)

**Purpose:** Browse what users can redeem their points for — curated, personalised.

**Layout:**
```
┌───────────────────────────────────────────┐
│  POINTS STORE                             │
│  Spend points, not paychecks.             │
│  [🔍 Search Sonos, Aesop, Penfolds...]    │
├───────────────────────────────────────────┤
│  [For you] [Audio] [Home] [Beauty] [Wine] │  ← Filter chips
│                                           │
│  ┌─────────────┐  ┌─────────────┐        │
│  │ 🎵 Sonos    │  │ 🍳 Le Creuset│        │
│  │ Era 100     │  │ 24cm        │        │
│  │ 38,000 pts  │  │ 52,000 pts  │        │
│  │ or $399     │  │ or $549     │        │
│  └─────────────┘  └─────────────┘        │
│  ...                                      │
│                                           │
│  ─ Australian Exclusives ──────────────── │
│  Everyday Rewards at Woolworths           │
│  Flybuys at Coles / Kmart / Target        │
│  (Shows local store redemption options)   │
└───────────────────────────────────────────┘
```

**Design Notes:**
- Grid of 2 per row, product image on pastel gradient background
- Each card shows points price + cash equivalent + "or split" option
- "For you" tab is personalised based on points balances and goals
- Categories are scrollable horizontal chips
- "Can afford" visual indicator: products within reach have a green checkmark badge
- Products just out of reach show: "Need 12,000 more pts — earn in ~3 shops"

---

### 3.5 GOALS (What are you working toward?)

**Purpose:** Help users work toward a reward goal with smart tracking and suggested plays.

**Layout:**
```
┌───────────────────────────────────────────┐
│  GOALS                                    │
│  What are you working toward?             │
├───────────────────────────────────────────┤
│  ┌ POINTR COACH ──────────────────────┐  │
│  │ 🧠 Route groceries to Flybuys and  │  │
│  │    dining + travel to Velocity Visa.│  │
│  │    6 weeks → Tokyo Business        │  │
│  │    [Apply plan] [Why this?]        │  │
│  └────────────────────────────────────┘  │
│                                           │
│  Active goals ─────────────────────────  │
│  ✈️  Business Class to Tokyo  78%  on track│
│      Needs 318,000 Qantas Points  ████░  │
│                                           │
│  🏨  Weekend in Hobart  100%  on track    │
│      Needs 62,000 Velocity Points  █████ │
│                                           │
│  🛒  $500 grocery offset  31%             │
│      Needs 100,000 Flybuys  ██░░░         │
│                                           │
│  Suggested plays ──────────────────────  │
│  💡 Cash out 50,000 Flybuys → $250  [Cash out]
│  💡 Pay your Spotify with points         │
│  💡 Bid for an Amex upgrade              │
│                                           │
│  [+ Add a goal]                           │
└───────────────────────────────────────────┘
```

**Design Notes:**
- Progress bar uses gradient fill (purple→pink) with animated shimmer
- Goals have large emoji icon on left — users can customise emoji
- "On track" badge = green dot; "At risk" = amber; "Off track" = red
- Suggested plays each have an action button that deep links to the relevant action
- Coach card is visually distinct (gradient border, brain/sparkle icon)
- Adding a goal: modal sheet slides up with goal type picker (Travel · Retail · Cash · Custom)

---

### 3.6 LEARN / NEWS (Insight Hub)

**Purpose:** Add value beyond points — educational content, news, alerts.

**Layout:**
```
┌───────────────────────────────────────────┐
│  LEARN                                    │
│  Stay ahead of the game.                  │
├───────────────────────────────────────────┤
│  [All] [Points Tips] [Economy] [Stores]   │  ← Category chips
│       [Legislation] [News]                │
│                                           │
│  ┌──────────────────────────────────────┐ │  ← Hero article
│  │  [Image]                             │ │
│  │  Flybuys changes earn rates          │ │
│  │  on fuel — what you need to know     │ │
│  │  3 min read · Today                  │ │
│  └──────────────────────────────────────┘ │
│                                           │
│  [Article card]  [Article card]           │  ← 2-col grid
│  [Article card]  [Article card]           │
│                                           │
│  Personalised for you ────────────────── │
│  "You hold Qantas Points — here's why    │
│   Amex to Emirates is now worth 4.8¢/pt" │
└───────────────────────────────────────────┘
```

**Design Notes:**
- Article cards: large cover image, category pill, title, read time
- "New" pill on articles <24hrs old
- Content personalised based on which cards user holds
- Legislative/regulation articles get a distinct blue "Policy" tag
- Save/bookmark articles for later reading
- Push notification opt-in for breaking rewards news

---

### 3.7 POINTR CARD (Universal Scan Screen)

**Purpose:** A single scannable card (barcode/QR) that replaces all loyalty cards at checkout.

> ⚠️ **Critical Design Note:** This feature is the most technically complex and legally sensitive. The UI should make it feel magical and simple while the backend complexity is completely hidden.

**Layout:**
```
┌───────────────────────────────────────────┐
│                                    [✕]    │
│  YOUR POINTR CARD                         │
│                                           │
│  ┌─────────────────────────────────────┐  │
│  │           POINTR                   │  │  ← Premium card design
│  │                                     │  │
│  │  ████████████████████████████████  │  │  ← Barcode
│  │  P-0042-8823-1107                   │  │
│  │                                     │  │
│  │  Sienna M.                          │  │
│  └─────────────────────────────────────┘  │
│                                           │
│  Active at these stores:                  │
│  ○ Woolworths (Everyday Rewards)          │
│  ○ Coles (Flybuys)                        │
│  ○ BWS (Everyday Rewards)                 │
│  ○ Kmart (Flybuys)                        │
│                                           │
│  [Brightness: Auto ●────────────]         │
│  Screen stays on while open               │
└───────────────────────────────────────────┘
```

**Design Notes:**
- Screen automatically maximises brightness when Pointr Card opens
- Card uses premium gradient with holographic shimmer effect (CSS animation)
- Below barcode: chips showing which stores recognise the Pointr Card
- Add/remove linked programs via toggle
- If a store isn't yet supported: "Coming soon" grey chip
- Lock icon with "Secure" label builds trust

---

## 4. Onboarding Flow

```
Splash → Welcome → Sign up/in → Add first card (guided)
→ OCR walkthrough → Set first goal → Coach intro → Home
```

**Onboarding Screens:**
1. **Splash** — Animated Pointr logo on gradient
2. **Value prop** — 3-step swipeable cards: "See what your points are really worth" / "Set goals and get coached" / "One card for everything"
3. **Auth** — Email magic link (no password friction)
4. **Add program** — Pre-populated list of AU programs; user taps to add
5. **Scan or enter manually** — Camera OCR to capture balance screenshot, or manual entry
6. **Goal setter** — "What are you saving for?" quick picks
7. **All set** — Animated confetti reveal of total wallet value

---

## 5. Motion & Interaction Design

| Interaction | Animation | Duration |
|-------------|-----------|----------|
| Tab switch | Slide + fade | 220ms ease |
| Card expand | Spring scale | 280ms spring |
| Number change | Counter roll-up | 600ms ease-out |
| Points update | Green flash then settle | 800ms |
| Pull to refresh | Pointr logo spin | ongoing |
| Goal progress | Bar fill left-to-right | 1000ms ease |
| Achievement unlock | Confetti burst | 1200ms |
| Modal sheet | Slide up from bottom | 300ms spring |

---

## 6. Empty States & Error States

Every empty state must feel helpful, not blank:

- **No cards added:** Illustration of a stack of cards, CTA "Add your first program — takes 30 seconds"
- **No goals:** Illustration of a compass, CTA "What are you saving for?"
- **Network error:** "Can't connect — your last values are shown below" (offline-first)
- **OCR failure:** "Couldn't read that — try better lighting or enter manually" with gentle illustration

---

## 7. Accessibility

- Minimum contrast ratio: 4.5:1 (WCAG AA), target 7:1 for body text
- All interactive elements: minimum 44×44px touch target
- Screen reader labels on all icons and charts
- Dynamic type support — layouts reflow for large text sizes
- Colour-blind safe: never use colour alone to convey meaning (always + icon or text)
- Reduced motion: respect `prefers-reduced-motion` — disable all non-essential animations

---

## 8. Key Divergences from Reference (Halo Wallet)

The reference app (Halo Wallet) is credit-card-centric and US-focused. Pointr differs in:

| Aspect | Halo Wallet (Reference) | Pointr |
|--------|------------------------|--------|
| Market | US (Amex, Visa heavy) | Australia-first (Flybuys, Everyday Rewards, QFF, Velocity) |
| Focus | Credit cards + points | Loyalty programs + credit cards |
| Data entry | Implied automatic | Manual + OCR (v1 reality) |
| Unique feature | Pay with points | Pointr Card (universal scan) |
| Content | Not visible | Learn/News section |
| Barcode | N/A | Core differentiator |

---

## 9. Design Challenges & Open Questions

1. **"Verified" data confidence** — Points entered manually go stale. The UI must always show "Last updated X days ago" and nudge users to refresh.
2. **Per-point value display** — Users may not understand "0.75¢/pt". Consider a plain-English equivalent: "Worth $1,500 for flights" vs "Worth $750 for shopping".
3. **The Pointr Card UX** — Requires explicit store-by-store partnership setup. In v1, the UI should show "Request this store" for unsupported retailers.
4. **OCR trust** — Users may distrust AI-read balances. Provide clear "looks right?" confirmation step after every OCR scan.
5. **Goals vs Plays** — The distinction between "Goals" (what you want) and "Suggested Plays" (what to do now) needs clear labelling so users understand both.
