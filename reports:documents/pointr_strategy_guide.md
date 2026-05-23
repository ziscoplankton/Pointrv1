# Pointr — Complete Strategy Guide
*A comprehensive resource covering the Australian loyalty rewards market, app development, social media growth, and monetisation strategy.*

---

## Table of Contents

1. [The Australian Rewards Market](#1-the-australian-rewards-market)
2. [Target Market](#2-target-market)
3. [Monetising the App](#3-monetising-the-app)
4. [Building Your Social Media Presence](#4-building-your-social-media-presence)
5. [Data Access — The Technical & Legal Challenge](#5-data-access--the-technical--legal-challenge)
6. [Growing to 500k Instagram Followers](#6-growing-to-500k-instagram-followers)
7. [Monetising a 500k Audience](#7-monetising-a-500k-audience)
8. [The Key Daily Engagement Feature](#8-the-key-daily-engagement-feature)
9. [Step-by-Step App Build Guide](#9-step-by-step-app-build-guide)
10. [Social Media Style Guide & 2-Week Content Plan](#10-social-media-style-guide--2-week-content-plan)
11. [App Name Recommendations](#11-app-name-recommendations)
12. [Your Points Value in AUD](#12-your-points-value-in-aud)

---

## 1. The Australian Rewards Market

### The Consumer Perspective

The Australian loyalty market is expected to grow by 15.5% annually to reach US$1.20 billion in 2025, having recorded a CAGR of 17.5% during 2020–2024. Around 90% of Australian consumers are enrolled in at least one loyalty program, yet only around 50% of members actively use their memberships. That 40-point gap is the core business opportunity.

**What consumers want most:**
- Regular discounts and cashback based on spending
- Ability to pay in full using loyalty points
- Highly personalised recommendations
- Opportunities to convert points between retailers
- Gamification to incentivise engagement

**Most popular programs:**
- Woolworths Everyday Rewards — ~85% membership among active users
- Coles Flybuys — ~77.5%
- Qantas Frequent Flyer — ~1 in 3 Australians

**Key consumer pain point:** Most Australians don't know what their points are worth in dollar terms. Regulatory bodies like the ACCC aim to protect consumers from opaque point valuation — creating a genuine market gap for a dollar-value dashboard.

### The Organisational Perspective

Loyalty programs are data goldmines. Australian firms are leveraging data analytics and machine learning to drive business decisions. Retailers like Big W have introduced members-only discount pricing to nudge shoppers into scanning loyalty cards.

The dominance of Qantas Frequent Flyer, Flybuys, and Everyday Rewards presents high entry barriers for new players. These programs will not give you API access easily — their points data maps every Australian's spending behaviour, worth billions.

### The Competitive Landscape

Existing loyalty trackers include AwardWallet, TripIt Pro, and Stocard — but most are targeted at US residents. None are built specifically for the Australian market with Flybuys + Everyday Rewards + Qantas + Velocity + bank rewards in one place, plus a dollar-value analysis layer. **That product doesn't exist yet.**

---

## 2. Target Market

### Primary: "Stretched Middle Australia"
- **Demographics:** 28–45 year olds, household income $80k–$200k, homeowners or recent first home buyers, dual-income couples, young families in metro Melbourne, Sydney, Brisbane
- **Why:** Highest points accumulation, feel cost-of-living pressure acutely, high smartphone users, share content when they get a "win"

### Secondary: "Points Nerds"
- The 5–10% of Australians already optimising
- Your loudest advocates and most brutal product testers
- Live in communities like Point Hacks

### Tertiary: "New Arrivals & Young Professionals"
- Migrants and 22–28 year olds setting up their financial lives
- Heavy TikTok users, highly likely to share a recommendation

---

## 3. Monetising the App

### Tier 1 — Freemium Core (Free forever)
- All balances in one place
- Dollar-value calculator for current points
- Basic expiry alerts
- **Purpose:** User acquisition engine. Never paywalled.

### Tier 2 — Premium Subscription (~$7.99–$12.99/month or ~$59–$89/year)
- AI-powered redemption recommendations
- Spending pattern analysis
- Cross-program transfer optimisations
- Credit card upgrade recommendations
- Personalised "points velocity" tracking

### Tier 3 — Affiliate Revenue
- Earn $100–$300 per approved credit card application in Australia
- Programs: Qantas, Velocity, CommBank Awards, ANZ Rewards, Amex
- Join: Commission Factory or Impact (both operate in Australia)
- This is how Point Hacks makes the majority of its revenue

### Tier 4 — B2B / Data Licensing (Year 3+)
- Aggregated, anonymised data shared with partners or research firms
- Must comply with Privacy Act and inform users
- Valuable to loyalty programs and market research firms at 50,000+ users

### Tier 5 — White Label / B2B SaaS
- License the technology to financial advisors, banks, or employee benefits platforms

### The Hybrid Model in Practice
> Free core → convert 5–8% to premium ($9.99/mo) → earn affiliate commissions on product switches → license data at scale.
> 
> 100,000 users × 6% premium = ~$720k ARR in subscriptions alone, before a single affiliate commission.

---

## 4. Building Your Social Media Presence

### Platform Strategy

**Instagram (foundation):** Almost 70% of adult Australians used Instagram by end of 2025. Reels are the dominant format for brand engagement. The 25–34 age group uses it as a discovery tool. Post Reels as your main content type; carousels for educational content; Stories for community/behind-the-scenes.

**TikTok (growth engine):** TikTok's ad reach grew to 10.9 million adult Australian users between 2024–2025. 86% of users aged 15–29 use it as a search engine weekly. Treat TikTok like a search engine — optimise captions and hashtags. The #FinTok community is thriving.

**LinkedIn (credibility layer):** For press coverage, partnerships with loyalty programs, and B2B opportunities. Post thought leadership about the loyalty market.

### Content Pillars
1. **"What are your points actually worth?"** — Regular dollar-value breakdowns. Your #1 content type.
2. **Personal journey content** — Melbourne mortgage story, points discovery process
3. **"Points hack of the week"** — One specific, actionable tip per week
4. **App development journey** — Build in public. Show wireframes, frustrations, beta testing
5. **Community questions** — Engagement drives reach on every algorithm

### The Growth Hook
> "I just bought a house in Melbourne and I'm feeling every dollar. Here's how I found $800 in rewards points I didn't know I had."

### Posting Rules
- Post 3–4x per week on Instagram, 5x on TikTok
- Engage with every comment for the first 60 minutes after posting
- Hashtags: #AustralianFinance, #RewardsPoints, #FinTok, #QantasPoints, #FlyBuys, #CostOfLiving

---

## 5. Data Access — The Technical & Legal Challenge

### Why Programs Won't Give API Access
- Losing data exclusivity (their competitive moat)
- Enabling comparison that encourages churn
- Liability exposure if your app is breached
- Revenue leakage if your app recommends switching

### Three Technical Approaches

#### 1. Credential-Based Scraping (most common)
User provides login credentials → your app logs in on their behalf → reads balance data → displays in your interface.

**Risks:**
- Scrapers break when programs redesign their sites (ongoing engineering)
- Programs actively detect and block via CAPTCHAs, Cloudflare, rate limiting, IP blocking
- Terms of Service violations (contractual, not criminal)
- **Never store raw passwords** — use session tokens or a middleware provider

**Legal position:** Your key shield is user consent. If the user explicitly authorises access, you're acting as their agent. Your Privacy Policy and Terms of Service must make this crystal clear.

#### 2. Token-Based / OAuth Access (gold standard — largely unavailable)
User redirected to program's own login → Qantas/Velocity authenticates → issues time-limited access token → your app uses token for API calls. **Almost none of the major Australian loyalty programs currently offer this.**

#### 3. Consumer Data Right (CDR) — Australia's Open Banking Framework
- Enacted through the *Competition and Consumer Act 2010* (Cth)
- Gives Australians the legal right to share their own data with accredited third parties
- Currently covers banking; expansion to loyalty programs is a genuine policy discussion
- Becoming CDR Accredited costs tens of thousands of dollars; most startups use an accredited intermediary

### Pragmatic Path: Use an Aggregation Middleware Provider

| Provider | Notes |
|---|---|
| **Basiq** | Australian-founded, CDR-accredited, built for Australian market |
| **Frollo** | Strong compliance framework, used by major Australian fintechs |
| **Yodlee / Envestnet** | Global giant, broadest coverage, more expensive |

**Cost:** ~$0.50–$5 per connected account per month — must be built into your subscription pricing.

### Manual Entry as V1
Let users manually enter their balances. No credentials, no scraping, no legal risk. The dollar-value analysis, expiry alerts, and recommendations all work perfectly with manually entered data. Validates product-market fit cheaply.

### Legal Requirements Before Launch
- Terms of Service
- Privacy Policy (mandatory under Australian Privacy Act 1988)
- Data handling documentation
- **Recommended providers:** LegalVision, Sprintlaw (~$500–$1,500 AUD)

---

## 6. Growing to 500k Instagram Followers

### Growth Phases

| Phase | Timeline | Target | Focus |
|---|---|---|---|
| Foundation | Months 1–4 | 10k | Voice, daily posting, niche hashtags |
| Acceleration | Months 5–10 | 50k | Collaborations, email list, first brand deals |
| Authority | Months 11–18 | 150k | PR, media coverage, app launch |
| Scale | Months 19–30 | 500k | Major partnerships, mainstream media |

### Algorithm Signals (ranked by importance)
1. **Shares** — most powerful signal
2. **Saves** — second most powerful
3. **Watch time** — critical for Reels
4. **Comments** — engagement quality
5. **Likes** — weakest signal

### The Collaboration Playbook (Phase 2)
Use Instagram's Collab feature to co-author posts with accounts 2–5× your size. Your pitch: *"I have X engaged followers who care about money — let's do a collab post about [specific topic where our audiences overlap]."*

Target: Australian personal finance accounts, travel hackers, cost-of-living commentators, first-home-buyer communities.

### The Viral Moment (Phase 3)
The format that goes viral in finance: **"I did the maths so you don't have to."**

Example: *"I compared every major Australian credit card rewards program and here's which one wins for a $70k salary."* Plan one of these per quarter. 10 hours of genuine research. When it lands, it accelerates you by months.

### Three Rules That Determine Whether You Reach 500k
1. **Consistency beats quality.** A decent Reel posted consistently beats a perfect Reel posted sporadically.
2. **Engagement in the first hour is everything.** Reply to every comment in the first 60 minutes.
3. **Never mistake followers for money.** A highly engaged 50k finance account will out-earn a disengaged 500k lifestyle account.

---

## 7. Monetising a 500k Audience

### Estimated Monthly Revenue at 500k (Finance Niche, Australia)

| Stream | Monthly Estimate | Notes |
|---|---|---|
| Brand sponsorships | $15,000–$40,000 | 3–4 posts/month |
| App subscriptions | $20,000–$60,000 | 10k users @ $9.99/mo |
| Affiliate commissions | $5,000–$15,000 | Credit cards, products |
| Instagram native | $500–$2,000 | Reels bonus, subscriptions |
| Digital products | $3,000–$10,000 | Course, templates, guides |
| Speaking / consulting | $2,000–$8,000 | Events, 1:1 sessions |
| **Combined potential** | **$45,000–$135,000/month** | Finance niche = 3–4× higher CPM than fashion/food |

### Income Stream Detail

**Brand Sponsorships:** Finance and B2B creators command CPMs of $15–$35, compared to $4–$12 for fashion or beauty — finance creators earn 3–4× more per view. At 500k with good engagement, $3,000–$10,000+ per sponsored post. Natural partners: Amex, ANZ, CommBank, Up Bank, insurance companies, travel companies.

**Affiliate Marketing:** Join Commission Factory and Impact. When a follower applies for a recommended credit card through your link → $100–$300 per approved application. At 50k followers, even 10 card applications a month = $1,000–$3,000.

**Digital Products:**
- "Points Optimisation Masterclass" — $97–$297
- "Best Credit Card for Your Spending Profile" guide — $27–$47
- Notion templates for points tracking
- "First Home Buyer Rewards Strategy" guide

**Instagram Subscriptions:** Charge followers $4.99 or $9.99/month for exclusive content — your monthly deep-dive strategy sessions.

---

## 8. The Key Daily Engagement Feature

### The Problem With Every Existing Loyalty App
Every current tracker solves a *passive* problem — "here are your balances." You check it, you feel informed, you close it. There's no reason to return. The average day-30 app retention rate is only 5–7%.

### The Daily Points Pulse

A single, personalised notification every morning:

> *"Your points grew $14 yesterday. Your Velocity balance hits flight redemption threshold in 11 days. One action available."*

**The three questions it answers:**
1. **What happened to my points value yesterday?** — In dollar value, not points number
2. **Is there one thing I should do today?** — One specific, personalised recommendation
3. **What's my points portfolio worth right now?** — A single number with a sparkline trend

### Supporting Features That Deepen the Habit

| Feature | Psychology | Mechanic |
|---|---|---|
| **Points Portfolio View** | Ownership, investor mindset | Share portfolio-style graph showing dollar value over time |
| **Expiry Countdown** | Loss aversion | Red/amber/green strip — points on fire feels like money burning |
| **Earn Streak** | Gamification, don't break the chain | Consecutive days earning points across any program |
| **Goal Tracker** | Progress toward meaningful personal goal | "I want to fly to Bali business class by December" — progress bar |
| **Daily Deal Feed** | Variable reward | Curated bonus points offers available *today* — different every day |

### The Habit Loop
- **Cue:** 7am notification (tied to existing morning phone check)
- **Action:** Open, read, tap one thing
- **Reward:** Satisfaction of knowing your financial position improved

### The Deeper Hook: Identity
Make users think of themselves as *"someone who doesn't waste money."* For a 35-year-old Melbourne homeowner feeling the mortgage squeeze, that identity is enormously valuable. The app isn't just a utility — it becomes evidence of the kind of person they're choosing to be.

### Build Sequence
1. **Week 1 MVP:** Dollar-value calculator only. Manual input. One number on screen. Validate the emotional response.
2. **Month 1:** Daily Pulse notification + Goal Tracker. Core habit loop.
3. **Month 3:** Expiry countdown + Earn Streak. Urgency and loss aversion.
4. **Month 6:** Daily Deal Feed. Makes the app feel alive — different every day.

---

## 9. Step-by-Step App Build Guide

### The Most Important Reframe
**You are not building an app yet. You are validating an idea.**

---

### Phase 1: Validate Before You Build (Weeks 1–4, $0)

**Step 1 — Talk to 20 real humans**
Message people in your network who match your target (35–45, homeowner, has Qantas or Woolworths points). Ask: *"How do you track your points?"* and *"What frustrates you?"* Listen — don't pitch.

**Step 2 — Build a one-page landing page**
Create a simple page with your app's value proposition and an email signup. You need 100 sign-ups before you invest a dollar in building.
- Tools: Carrd.co, Mailchimp (~$0–$19/month)

**Step 3 — Start your Instagram account today**
Not after the app — now. Your social content IS your market research.

**Step 4 — Build a manual MVP in Google Sheets**
Enter points balances, output dollar value. Share with 10 people from your waitlist. Watch what confuses them. This is your product spec — and it costs nothing.

---

### Phase 2: Design Before Touching Technology (Weeks 5–8, $0–$100)

**Step 5 — Sketch every screen on paper first**
Draw: Home (Daily Pulse), Add a program, Points portfolio, Goal tracker, Deals feed. Focus on what information is on each screen and how users move between them.

**Step 6 — Build a clickable prototype in Figma**
Free design tool. Mock up every screen and link them. Watch 3 YouTube tutorials, spend a week building it. Then sit with 5 real people and watch them try to use it.
- Tools: Figma (free)

**Step 7 — Define your MVP feature list ruthlessly**
Write every feature you want. Cut it in half. Cut it in half again. Your MVP needs exactly three things:
1. Add points programs manually
2. See dollar value of total portfolio
3. Get a daily notification with one recommendation

> **Everything else is version 2.**

---

### Phase 3: Choose How to Build (Week 9 — Decision Point)

**Path A: No-Code Tools (2–4 months, $29–$60/month)**
- Bubble.io (web app) or Glide (mobile-first)
- Best if you have time and low budget
- Bubble has free tutorials and strong community

**Path B: AI App Builders (fastest, ~$20–$50/month)**
- Lovable.dev or Bolt.new
- Describe your app in plain English → generates working prototype
- Not production-ready but great for fast validation
- Then hire a developer to clean it up

**Path C: Hire a Developer (recommended if you have budget)**
- Post on Upwork, Freelancer.com, or LinkedIn
- Look for React Native developers (iOS + Android in one codebase)
- Use your Figma prototype as the spec
- Budget: $8,000–$20,000 AUD for a proper MVP

---

### Phase 4: Build, Test, and Launch (Months 3–6)

**Step 8 — Build only the 3-feature MVP**
Get this into the hands of your first 50 users — pull from Instagram following and email waitlist. Do not launch publicly yet.

**Step 9 — Set up essential infrastructure**

| Tool | Purpose | Cost |
|---|---|---|
| Firebase or Supabase | Database and user logins | Free to start |
| Stripe | Payment processing | Free + % per transaction |
| OneSignal | Push notifications | Free up to 10,000 users |
| ABN + business bank account | Legal entity | ~$0 to register |

**Step 10 — Run a private beta with 50 real users**
Give it free for 3 months. Check analytics weekly. Ask: *"What would make you pay $9.99/month for this?"*

**Step 11 — Get legal sorted**
Before public launch you need: Terms of Service, Privacy Policy (mandatory under Australian Privacy Act), data handling documentation.
- Providers: LegalVision, Sprintlaw
- Budget: $500–$1,500 AUD

**Step 12 — Submit to App Store and Google Play**
- Apple Developer: $149 AUD/year
- Google Play: $35 USD one-time
- Allow 1–3 days for review

---

### Phase 5: Launch, Iterate, and Grow (Month 7+)

**Step 13 — Launch to your Instagram audience first**
Post a launch Reel. Tell the story. Aim for 500 downloads in week 1.

**Step 14 — Turn on premium and your first affiliate link**
Activate freemium/premium split. Sign up for Commission Factory. Add your first affiliate recommendation inside the app.

**Step 15 — Measure three numbers every week**
1. **Day-7 retention** — aim for 40%+. If below 20%, the Daily Pulse isn't working.
2. **Daily active users**
3. **Free-to-premium conversion rate**

**Step 16 — Build version 2 based entirely on user data**
After 3 months with real users, let their behaviour — not your original assumptions — dictate your roadmap.

### Total Cost to Launch

| Stage | Item | Cost |
|---|---|---|
| Validation | Carrd, Figma | $0–$50 |
| Design | Figma Pro (optional) | $0–$20/month |
| Build (no-code) | Bubble or Glide | $29–$60/month |
| Build (developer) | Freelance MVP | $8,000–$20,000 AUD |
| Infrastructure | Firebase, OneSignal, Stripe | $0–$50/month |
| Legal | Privacy policy, T&Cs | $500–$1,500 AUD |
| App store fees | Apple + Google | ~$185 AUD |
| **Total to launch** | | **$1,000–$25,000 AUD** |

---

## 10. Social Media Style Guide & 2-Week Content Plan

### Competitor Snapshot

| Account | Followers | Style |
|---|---|---|
| @pointhacksau | 224k | Australian-specific, deal-alert heavy, expert tone |
| @friendsthatinvest | 702k | Personal story-led, warm, accessible, jargon-free |
| @thepointsguy | 2M | Aspirational luxury travel, US-focused, editorial |
| points.travel.mama | Micro | Family + points blend, personal journey content |

### Your Brand Positioning — The Gap to Own
None of these accounts are simultaneously: (1) Australian-specific AND (2) focused on everyday spending value rather than luxury travel AND (3) built around a personal mortgage-stress story AND (4) connected to an app. **That four-way intersection is your uncontested territory.**

### Brand Voice
> *"I just bought a house in Melbourne and every dollar counts. Here's what I found when I actually did the maths on my points."*

Tone: warm, specific, financially literate without jargon, personally invested, Australian. Like a smart friend who did the research and is sharing it over coffee.

**Do:** Australian-first · Dollar value framing · Relatable homeowner · App-backed authority  
**Don't:** Luxury travel porn · US-focused content · Jargon-heavy language

### Visual Identity

**Colour palette:**
- Navy `#1A1A2E` — authority
- White `#FFFFFF` — clean
- Teal `#00C896` — money/value (use for dollar figures)
- Cream `#F5F0E8` — premium warmth
- Coral `#FF6B35` — urgency/alerts (expiry dates, limited offers)

**Typography:** One bold display font (DM Serif Display or Playfair Display) + one clean sans-serif (Inter or DM Sans). Never more than two fonts.

**Carousel anatomy:** Large bold hook (top third) · Supporting data or visual (middle third) · Your handle (bottom). Consistent = recognisable in a scroll.

### Post Specs

| Format | Specs | Notes |
|---|---|---|
| Reels | 15–30 sec · 9:16 vertical | Hook in first 1.5 sec · captions on · no TikTok watermark |
| Carousels | 5–10 slides · 1080×1350px | Slide 1 = scroll-stopper · last slide = save prompt |
| Stories | 9:16 · 3–5 per day | Polls, questions, behind-scenes |
| Posting time | 7–9am or 6–8pm AEST weekdays | Refine with Insights after 2 weeks |

### Hashtag Bank
`#australianfinance` `#rewardpoints` `#qantaspoints` `#flybuys` `#everydayrewards` `#velocitypoints` `#savemoney` `#melbourneliving` `#firsthomebuyer` `#australiacostofLiving` `#fintok` `#loyaltypoints` `#pointshacks` `#travelpoints` `#australiantravel`

---

### Week 1 Content Plan — Establish Your Story and Niche

**Monday — Reel: The launch / your origin story**
> Hook: *"I bought a house in Melbourne, felt the pinch, and went looking for hidden money. I found $847 in points I didn't know I had."*
> Film yourself at home, casual, phone-quality. Tell the story in 25 seconds. End: *"Follow — I'm building an app to solve this and sharing everything I learn."*
> Goal: follower growth

**Tuesday — Stories ×3: Introduce yourself properly**
- Slide 1: "Who am I? 35, Melbourne homeowner, obsessed with not wasting money."
- Slide 2: Poll — "Do you actually know what your points are worth in dollars?" Yes / No.
- Slide 3: "I'm building an app to answer that. DM me 'POINTS' if you want early access."
> Goal: DMs + waitlist signups

**Wednesday — Carousel (7 slides): What are your Qantas points actually worth?**
> Slide 1: *"You have Qantas points. But what are they ACTUALLY worth in dollars? Save this."*
> Slides 2–6: Gift cards (0.4¢/pt) → cash back (0.8¢/pt) → economy flights (2¢/pt) → business class (3–7¢/pt) → upgrades (5–8¢/pt)
> Slide 7: "The maths is doing the work — now save this for when you redeem."
> Goal: saves (your best-performing metric)

**Thursday — Reel: Points hack #1 — the Woolworths double-dip**
> Hook: *"Most people are only earning points once at Woolworths. Here's how to earn them twice."*
> Explain: link Everyday Rewards to a Qantas card → earn both per shop.
> Show maths: $150 weekly shop → ~300 Everyday Rewards + ~150 Qantas points = ~$3.50/week = $182/year.
> End: "Like if you didn't know this."
> Goal: likes + shares

**Friday — Carousel (6 slides): My actual points portfolio right now**
> Slide 1: *"Here's what I actually have and what it's worth — real numbers, no BS."*
> Show your real programs, points, and calculated dollar values.
> Slide 5: "Total: $[your number]. Here's what I'm going to do with it."
> Slide 6: "What does your portfolio look like? Drop it in the comments."
> Goal: comments

**Saturday — Stories ×4: Behind-the-scenes: building the app**
> Show your Figma mockup or Google Sheet MVP.
> Question box: "What feature would make you use this every day?"
> Goal: DMs + product insight (research AND content simultaneously)

**Sunday — Reel: The Flybuys dollar value nobody talks about**
> Hook: *"Flybuys gives you $1 off your shop for every 2,000 points. That means each Flybuys point is worth $0.0005. And most people have no idea."*
> Show the maths. Then: "But if you transfer to Velocity — it's a different story."
> Goal: shares + saves (counterintuitive hook drives shares)

---

### Week 2 Content Plan — Build Authority and Community

**Monday — Carousel (8 slides): The 5 biggest points mistakes Australians make**
> Slide 1: *"I asked 50 Australians about their points. These are the 5 mistakes I saw repeatedly. Save this."*
> 1. Redeeming for gift cards · 2. Letting points expire · 3. Not linking programs · 4. Paying for Qantas FF when it's free via Everyday Rewards · 5. Ignoring bonus point offers
> Each mistake gets its own slide with the fix.
> Goal: saves + shares

**Tuesday — Reel: What $100/week at Coles earns you in a year**
> Hook: *"I spent $100 at Coles every week this year. Here's exactly what I earned."*
> Do the live maths: 52 × $100 = $5,200 spent → ~5,200 Flybuys points → worth $2.60 in cash back.
> "But if I'd done THIS instead…" → show Velocity transfer or bonus point periods.
> Goal: comments + shares

**Wednesday — Static post: Community question of the week**
> "What's the most points you've ever redeemed at once — and what did you get?"
> Pure engagement play. Reply to every comment in first 60 minutes.
> Goal: comments (algorithm signal + community building)

**Thursday — Reel: Points hack #2 — the Velocity transfer trick**
> Hook: *"Your Flybuys points are worth almost nothing — unless you do this."*
> Explain: Flybuys → Velocity transfer (2,000 Flybuys = 1,000 Velocity). Show why 1,000 Velocity points is worth more than the Flybuys equivalent.
> Goal: DM shares

**Friday — Carousel (6 slides): The Australian credit card points comparison — 2025**
> Slide 1: *"I compared every major Australian rewards credit card. Here's who actually wins for everyday spending."*
> Compare 4–5 cards on: earn rate per $1, annual fee, best program, break-even spend.
> Slide 6: "Which card do you use? Drop it below."
> ⚠️ Include "Not financial advice" disclaimer in caption.
> Goal: saves + future affiliate revenue

**Saturday — Stories ×4: Week 2 recap + app update**
> Share follower count growth from week 1. "Here's what resonated most."
> Reshare comments or DMs (with permission). "The app waitlist is at X people."
> Goal: retention + waitlist growth

**Sunday — Reel: The Everyday Rewards to Qantas conversion explained**
> Hook: *"2,000 Everyday Rewards points automatically become 1,000 Qantas points. But most people have the auto-transfer turned OFF."*
> Walk through how to turn it on (screen record your phone). Show the setting.
> "This took me 90 seconds to set up and earns me ~1,000 Qantas points a month for free."
> Goal: shares + saves (how-to content with a specific action = highest save rate)

### ⚠️ ASIC Compliance Note
Always include in captions: *"Not financial advice. Points values are estimates and change — verify before redeeming."* ASIC actively monitors Australian finfluencers. If you recommend affiliate products, disclose it: `#ad` or "affiliate link in bio." Never tell someone to apply for a specific credit card — show them the data and let them decide.

---

## 11. App Name Recommendations

### What Makes a Great App Name
- **Memorable:** Sticks after one hearing. 1–2 syllables ideal.
- **Spellable:** Someone hears it and can find it.
- **Available:** .com.au domain, Instagram handle, App Store.
- **Says something:** Hints at value without being literal or generic.
- **Scalable:** Works if the app expands beyond points.
- **Feels right:** Matches the brand tone — smart, warm, Australian, not corporate.

---

### ⭐ Top Recommendation: Pointr

> *"Know what your points are worth."*

One syllable, completely unambiguous spelling, instantly understood. The dropped vowel (Flickr, Tumblr pattern) signals tech-native without feeling forced. Works as a verb: "Pointr it" or "Check your Pointr." Scalable beyond points — could evolve into a broader rewards or money platform.

---

### Strong Alternatives

**Rewardly**
> *"Your rewards, in plain English."*
Friendly, approachable, warm. Highly scalable — rewards covers points, cashback, benefits, and more. Three syllables, flows well when spoken aloud. Check trademark carefully.

**Stackd**
> *"Stack your points. Know their value."*
"Stacked" carries dual meaning — stacking points across programs, and being financially well-off. One syllable, punchy, aspirational without being pretentious. The dropped "e" risks some confusion — verify domain.

**Tally**
> *"Your points, tallied up."*
Perfect semantic fit. Two syllables, flows naturally. Works across social media. Note: a US debt payoff app called Tally existed (shut down 2024). Check Australian trademark database carefully.

---

### Names to Avoid
- ❌ Anything with "points" in the name — too generic, impossible to trademark
- ❌ Anything with "rewards" as the whole name — almost certainly taken
- ❌ Anything "Australian" or "Aus" in the name — limits future growth, sounds like a government agency
- ❌ Portmanteaus that need explaining
- ❌ Your own name as the app name — works for Instagram, not for an app you want to scale and sell

### How to Check Before You Commit
1. **search.ipaustralia.gov.au** — Australian trademark search (free)
2. **instantdomainsearch.com** — check .com, .com.au, .app simultaneously
3. Search Instagram, TikTok, App Store and Google Play for the exact name
4. Google the name + "app" and + "Australia"
5. Once chosen, register the .com.au domain immediately — ~$20/year

---

## 12. Your Points Value in AUD

*Based on May 2026 rates from Finder, Point Hacks, and Australian Frequent Flyer. For general information only — not financial advice. Always verify current rates before redeeming.*

### Your Balances
- **Qantas Frequent Flyer:** 56,840 points
- **Virgin Velocity:** 160,000 points

---

### Qantas 56,840 Points — Value by Redemption Type

| Redemption Type | Value per Point | Your Total Value |
|---|---|---|
| Gift cards / store purchases | ~0.4–0.46¢ | ~$227 |
| Hotels / car hire | ~0.7–0.8¢ | ~$398 |
| Economy Classic Reward flights | ~2¢ | ~$853–$1,137 |
| Business Class flights | ~3–7¢ | ~$1,705–$3,979 |
| Upgrades (best case) | ~5–8¢ | ~$2,842–$4,547 |

---

### Virgin Velocity 160,000 Points — Value by Redemption Type

| Redemption Type | Value per Point | Your Total Value |
|---|---|---|
| Gift cards / store purchases | ~0.4–0.5¢ | ~$640–$800 |
| Hotels / car hire | ~0.6¢ | ~$960 |
| Economy Reward flights (domestic) | ~1–1.5¢ | ~$1,600–$2,400 |
| Business Class (domestic/international) | ~2–3¢ | ~$3,200–$4,800 |
| International Business (best case) | ~3–4¢ | ~$4,800–$6,400 |

---

### Combined Portfolio Summary

| Scenario | Estimated Value |
|---|---|
| **Worst case** (gift cards — never do this) | ~$867 |
| **Good value** (economy flights, both programs) | ~$2,800 |
| **Best case** (business class / upgrades, smart planning) | ~$8,000+ |

---

### Which Program Has Greater Value Per Point?

As of May 2026, **Qantas points have a slight edge per point** (~1.5–2¢ average vs Velocity's ~1.3–1.9¢ average), rated by Australian Frequent Flyer. However:

- Qantas devalued its Classic Rewards program in August 2025 (5–20% more points required for most flights, plus higher carrier charges) — narrowing the gap significantly
- For domestic economy flights, the programs are roughly equivalent
- **Qantas pulls ahead:** international business class and upgrades (larger Oneworld network + 26 partner airlines)
- **Velocity pulls ahead:** domestic business class value and less punishing carrier charges on some routes

---

### Can You Transfer Between Programs?

| Transfer | Possible? |
|---|---|
| Qantas → Velocity | ❌ No — not possible directly or indirectly |
| Velocity → Qantas | ❌ No — not possible |
| Velocity → Singapore Airlines KrisFlyer | ✅ Yes (and back) |
| Flybuys → Velocity | ✅ One-way (1,000 Flybuys = 500 Velocity) |
| Bank rewards programs → Velocity | ✅ One-way (with periodic transfer bonus offers of 10–15%) |

**The key fact:** Qantas and Virgin are direct competitors — they will never build a transfer bridge. Your Qantas points are locked in the Qantas ecosystem. The only transfer flexibility sits on the Velocity side, notably the Velocity ↔ Singapore Airlines KrisFlyer two-way transfer.

---

### What You Should Actually Do With Each Balance

**Qantas 56,840 points — best options:**
1. Target a domestic business class upgrade → potential value ~$2,800–$4,500
2. 2–3 economy Classic Reward flights → potential value ~$850–$1,100
3. Avoid: gift cards, Points Plus Pay, merchandise

**Velocity 160,000 points — best options:**
1. International business class via Singapore Airlines KrisFlyer transfer → potential value ~$5,000–$6,400
2. ~9–10 domestic economy Reward Seat flights → potential value ~$2,400–$3,200
3. Avoid: Any Seat flights, Points + Pay, gift cards, store purchases

---

### Key Warnings

> ⚠️ **Never** redeem either program's points for gift cards, merchandise, or store purchases — you lose 50–70% of potential value instantly.

> ⚠️ Avoid Qantas "Points Plus Pay" and Velocity "Any Seat" redemptions — these are convenience traps offering only 0.5–0.6¢ per point.

> ✅ Qantas points don't expire if you have any account activity (earn or redeem) within **18 months**. Velocity requires activity every **24 months**. Check your expiry dates now.

> ✅ Points values above are estimates based on May 2026 rates. Actual value depends on the specific flight, route, date, and availability — always verify before redeeming.

> ✅ This is general information, not personal financial advice.

---

*Document generated May 2026. Points program rates and values change regularly — verify all figures before making any redemption decisions.*
