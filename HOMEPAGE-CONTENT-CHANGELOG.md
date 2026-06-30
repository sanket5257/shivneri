# Homepage Content Update — Changelog & Mapping

**Source:** `Shivneri-Website-Content-Documentation.pdf` → Section 4 (Homepage)
**Scope:** Homepage only. **Rule applied:** text-only swap — existing UI/layout kept exactly, no new sections added, 7 service cards kept.
**Date:** 30 June 2026

---

## ✅ What was changed (doc copy → live site)

### 1. Hero (`Hero.tsx`)
| Field | Before | After (from doc) |
|---|---|---|
| Headline | "Build Faster. Deploy Smarter. Scale Effortlessly." | **"Ship AI-powered products at startup speed."** (kept across the same 2 lines) |
| Subheadline | "Advanced software engineering using next-generation architecture…" | **"Shivneri is a lean, global engineering studio that builds AI software, automation, and full-stack apps — then stays on to run and scale them. No handoffs. No bloat. Just senior engineers who own outcomes."** |
| Primary CTA | "Book a meeting" | **"Book a Free Call"** (still opens the booking modal) |
| Secondary CTA | "Our services" → `/services` | **"See our work"** → `/work` |

### 2. Why Shivneri (`WhyUs.tsx`) — doc Section 5, card titles + bodies both from the doc
| Card title (doc lead phrase) | Body (doc bullet) |
|---|---|
| **Senior, Full-Time Engineers** | "No juniors, no project handed to a contractor you'll never meet — just engineers who own full-stack delivery end to end." |
| **Startup Velocity** | "Small teams, tight loops, and working software in weeks, not quarters. Need an expert, a specialist, or a full-stack team? We plug in fast and scale with you." |
| We Build It. We Run It… | "Ownership beyond launch — we deploy, monitor, secure, and keep improving what we build. India-based, working seamlessly with US, EU & GCC teams. No handoffs. No context lost." |

Also: Card 3 heading "We Innovate It." → **"We Keep Innovating."** (matches the doc's brand spine), and the section link "Explore how we work" → **"See how we work."** Section hook heading ("Because Getting it Built isn't Enough.") kept as the lead-in.

### 3. Services (`Services.tsx`) — doc's 5 core services + 2 support services (7-card grid kept)
AI-first order, all 5 core descriptions **verbatim from the doc**:
| # | Card | Description |
|---|---|---|
| 1 | AI Development | "Custom LLM apps, RAG systems, AI agents, and intelligent features — engineered for production, not just demos." |
| 2 | AI Automation | "We find the repetitive work draining your team and automate it — workflows, data, support, and ops." |
| 3 | Custom Software Development | "Bespoke platforms, internal tools, and SaaS products on clean, scalable architecture you own." |
| 4 | Web Development | "Fast, modern web apps built with Next.js and a cloud-native stack — performant and SEO-ready." |
| 5 | Mobile App Development | "High-performance iOS and Android apps that feel native and ship fast — from MVP to scale." *(extended with the doc's service-page phrase so the card matches the 3-line length of its row-mates)* |
| 6 | UX/UI Design *(support)* | "Intuitive, polished product design that makes your software a pleasure to use." |
| 7 | Brand & Motion Design *(support)* | "Branding, motion, and video — handled in-house, so your product looks as good as it works." (doc support line) |

### 4. About / Approach (`AboutApproach.tsx`) — from doc Section 1 (Brand & Positioning)
| Element | After (from doc) |
|---|---|
| Heading | "Shivneri is an AI-first product engineering studio. We build AI software, automation, and full-stack products for funded startups and scale-ups — and we stay on to run and scale them. Not an agency or a body-shop. Just a small, senior team that owns outcomes end to end." (from *"What Shivneri is"*) |
| Paragraph 1 | "We work with founders, CTOs, and product leaders at funded startups and scale-ups — teams who need to ship fast and can't afford handoffs, juniors, or disappearing freelancers." (from *"Who we serve"*) |
| Paragraph 2 | "We build it, run it, and keep innovating — no handoffs, no bloat. Senior engineers who own delivery from first commit to production, and keep improving what we build." (from *"The core promise"*) |
| Accordion (AI-first refresh) | AI & Full-Stack Development · Cloud-Native Platforms · Run & Scale · Security & DevOps (Cloud/DevOps/Security framed as "how we work" per the doc) |

### 5. TL;DR / CTA (`CTA.tsx`) — doc Section 8 (doc content, re-split to fit the layout)
| Field | After (from doc) |
|---|---|
| Heading | "We build it, ship it, **and run it.**" *(doc's promise line — short, keeps the heading at ~3 lines so it doesn't tower)* |
| Card paragraph | "Your fractional product team and **full-time engineering partner**—with speed, clarity, and zero BS. No handoffs, no bloat—just senior engineers who own outcomes." *(doc's positioning + qualities + the "No handoffs/bloat/senior engineers" line from the doc's core promise, to fill the card)* |
| Button | "Book a 30-minute consultation" → **"Book a Free Call"** |

*All words are the doc's; the two sentences were split heading/card so the layout stays balanced.*

---

## ⏸️ Left unchanged — needs your decision

These had **no matching homepage copy in the doc**, OR changing them would alter the UI (which you asked me not to do). I left them as-is and am flagging them:

1. **Hero eyebrow badge** still says *"Modern Full-Stack Development & Engineering"* — the doc gives no badge text, but this contradicts the new AI-first headline. **Suggest:** change to something like "AI Development Studio". *(Need your wording.)*

2. ~~About / Approach section~~ — ✅ **DONE** (mapped from the doc's Brand & Positioning section; see change #4 above).

3. **"Modernize" statement + showreel** (`ModernizeText.tsx`) — "We help ambitious companies ship faster, scale smarter, and modernize without compromise." No homepage-doc equivalent. Left unchanged. (Note: the showreel video is still the external Webflow/template file.)

4. **4 design service cards** kept as-is: **UX/UI Design, Video Editing, Graphic Design & Branding, Motion Design.** The doc wanted these *demoted* from headline services into one small "support line" ("Design, branding, motion, and video — handled in-house…"). Per your "keep 7 cards" choice, they remain full cards.

5. **Doc copy not placed** (no matching slot in current UI): the doc's separate **"AI Automation"** and **"Web Development"** service blurbs, and the **"AI Development"** verbatim line (folded into the combined "AI & Automation" card).

6. **Section headings kept** (stylistic, no clean doc swap): WhyUs "Because Getting it Built isn't Enough.", Services "It's not just what we build / it'z how we show up.", CTA "If you only read one thing, make it this." *(Note: "it'z" is still the earlier flagged typo.)*

---

## 🚫 Doc sections NOT added (per your "don't change UI" choice)

The doc proposes these **new** homepage sections — none were added, to keep the layout identical:

- **Trust bar** ("Trusted by founders…" + client logos + stat strip: 40+ products, 6+ years…)
- **The Problem** ("Most teams ship slow because their stack is held together by handoffs…")
- **Case-study spotlight** ("From idea to shipped AI product — see how.")
- **Condensed "How we work"** (Discover → Design → Build → Run & Scale)
- **Separate Final CTA** ("Have a product to build? Let's talk.")
- **Hero microcopy** ("30 minutes. No pitch deck…")

Say the word on any of these and I'll add them (that step *will* change the UI).
