# SmartHome OS — Complete Project Memory

> **Last Updated:** 2026-06-07  
> **Project:** AT Smart Living — Premium Smart Home Automation Website  
> **Purpose:** This document is the single source of truth for any AI assistant working on this project. It covers every page, section, animation, component, design token, and architectural decision.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Dependencies](#2-tech-stack--dependencies)
3. [Architecture & File Structure](#3-architecture--file-structure)
4. [Design System & Theme](#4-design-system--theme)
5. [Animation System](#5-animation-system)
6. [Shared Layout Components](#6-shared-layout-components)
7. [Page: Home (`/`)](#7-page-home-)
8. [Page: Residential (`/residential`)](#8-page-residential-residential)
9. [Page: Experience Center (`/experience-center`)](#9-page-experience-center-experience-center)
10. [Reusable UI Components](#10-reusable-ui-components)
11. [Custom Hooks](#11-custom-hooks)
12. [Build & Deployment](#12-build--deployment)
13. [Important Patterns & Conventions](#13-important-patterns--conventions)
14. [Component Audit: Typography & Theme Alignment](#14-component-audit-typography--theme-alignment)

---

## 1. Project Overview

**SmartHome OS** is a premium, animation-heavy marketing website for **AT Smart Living** (ATPL) — a luxury smart home automation company operating across India. The brand designs and installs intelligent automation systems for **Residential**, **Hospitality**, and **Commercial** spaces.

### Brand Identity

| Aspect | Details |
|---|---|
| **Company** | AT Smart Living (ATPL) |
| **Industry** | Luxury Smart Home Automation |
| **Market** | India (Delhi HQ, Mumbai, Bangalore, Hyderabad) |
| **Accent Color** | Deep Crimson `#8c1817` |
| **Visual Tone** | Light luxury, editorial, architectural, cinematic |
| **Typography** | Playfair Display (headings), Lato (body), Geist (system) |

### Key Business Data (used across sections)

- **25** Years of Experience
- **Over 1000** Projects completed
- **15** Cities all over India
- **3** Experience Centres in Delhi, Mumbai and Bengaluru

### Current Pages

| Route | Status | Description |
|---|---|---|
| `/` | ✅ Complete | Home page — full cinematic landing experience |
| `/residential` | ✅ Complete | Residential service page |
| `/commercial` | ✅ Complete | Commercial B2B automation page |
| `/hospitality` | ✅ Complete | Hospitality & Hotels automation page |
| `/experience-center` | ✅ Complete | Experience center page with full animations and standardized theme |

---

## 2. Tech Stack & Dependencies

### Core Framework

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.2.3 | React framework (App Router, static export) |
| **React** | 19.2.4 | UI library |
| **TypeScript** | ^5 | Type safety |
| **Tailwind CSS** | v4 | Utility-first styling |

### Animation & Scroll

| Library | Version | Purpose |
|---|---|---|
| **GSAP** | ^3.14.2 | Core animation engine (ScrollTrigger, SplitText) |
| **@gsap/react** | ^2.1.2 | React hook integration (`useGSAP`) |
| **Lenis** | ^1.3.21 | Smooth scroll with GSAP ticker sync |

### UI & Visualization

| Library | Version | Purpose |
|---|---|---|
| **Lucide React** | ^1.16.0 | Icon library |
| **shadcn** | ^4.7.0 | Component primitives |
| **@base-ui/react** | ^1.4.1 | Headless UI primitives (Button) |
| **class-variance-authority** | ^0.7.1 | Variant-based component styling |
| **tailwind-merge** | ^3.6.0 | Tailwind class deduplication |
| **tw-animate-css** | ^1.4.0 | Tailwind animation utilities |

---

## 3. Architecture & File Structure

```
smarthome-os/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (fonts, SmoothScrollProvider, Footer)
│   ├── page.tsx                  # Home page (client component)
│   ├── favicon.ico
│   └── residential/
│       └── page.tsx              # Residential service page
│
├── components/
│   ├── layout/                   # Shared layout components
│   │   ├── NavBar.tsx            # Fixed top navigation bar
│   │   ├── FullscreenMenu.tsx    # Fullscreen overlay navigation menu
│   │   ├── Footer.tsx            # Site-wide footer
│   │   └── SmoothScrollProvider.tsx  # Lenis smooth scroll wrapper
│   │
│   ├── sections/                 # Page-specific section components
│   │   ├── home/                 # Home page sections (13 components)
│   │   │   ├── BrandIntro.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── StatsSection.tsx
│   │   │   ├── BrandTicker.tsx
│   │   │   ├── AutomationSpaces.tsx
│   │   │   ├── ConnectedSystems.tsx
│   │   │   ├── FeaturedProjects.tsx
│   │   │   ├── AwardsSection.tsx
│   │   │   ├── WhyChooseUsSection.tsx
│   │   │   ├── ProcessSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── CallToActionSection.tsx
│   │   │
│   │   └── residential/         # Residential page sections (2 components)
│   │       ├── ResidentialHero.tsx
│   │       └── ResidentialTrust.tsx
│   │
│   └── ui/                      # Reusable UI primitives
│       ├── button.tsx            # CVA-based Button with variants
│       └── testimonial-v2.tsx    # Auto-scrolling testimonial columns
│
├── hooks/                        # Custom React hooks
│   ├── useBreakpoint.ts          # Responsive breakpoint detection
│   └── useReducedMotion.ts       # Prefers-reduced-motion detection
│
├── lib/                          # Shared utilities & config
│   ├── animation.config.ts       # Centralized GSAP animation tokens
│   ├── gsapSetup.ts              # GSAP plugin registration & re-exports
│   ├── lenisContext.ts           # React context for Lenis instance
│   ├── scrollRefresh.ts          # ScrollTrigger refresh scheduling
│   └── utils.ts                  # cn() class merge utility
│
├── styles/
│   └── globals.css               # Theme tokens, base styles, CSS utilities
│
├── assets/projects/              # Static project images (imported in code)
│   ├── private-residence.jpg
│   └── SawaiManMahal.jpg
│
├── public/
│   ├── logo.svg                  # Main brand logo
│   ├── whitelogo.svg             # White version for dark backgrounds
│   ├── ATPLLogowhite.png         # PNG white logo
│   ├── heroFrames/               # 144 WebP frames for scroll-driven video
│   │   └── 0001.webp — 0144.webp
│   └── images/
│       ├── earth-dark.jpg        # Globe texture
│       ├── earth-topology.png    # Globe topology bump map
│       └── residential_hero_bg.png  # Residential hero background
│
├── scripts/
│   └── compress-frames.mjs       # Image compression utility
│
├── next.config.ts                # Static export, unoptimized images
├── package.json
├── tsconfig.json
└── components.json               # shadcn/ui configuration
```

---

## 4. Design System & Theme

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--color-background` | `#F7F7F5` | Light warm off-white page background |
| `--color-foreground` | `#111111` | Primary text color (near-black) |
| `--color-panel` | `#FFFFFF` | Card/panel surfaces |
| `--color-muted` | `#555555` | Secondary/body text |
| `--color-accent` | `#8c1817` | **Deep Crimson** — brand accent, CTAs, links |
| `--color-accent-soft` | `#D32F2F` | Hover state for accent |
| `--color-secondary` | `#2a3724` | Dark forest green (minimal usage) |
| `--color-surface-darker` | `#FAFAFA` | Subtle background variation |
| `--color-border` | `rgba(0,0,0,0.08)` | Ultra-subtle borders |
| `--color-glass` | `rgba(255,255,255,0.7)` | Glassmorphism base |

### Typography System

| Role | Font Family | Weight | Usage |
|---|---|---|---|
| **Headings** | `Playfair Display` | 400–900 | All `<h1>`–`<h6>` elements |
| **Body** | `Lato` | 100–900 | Body text, descriptions, UI |
| **System** | `Geist` (Google) | Variable | Root `--font-sans` fallback |
| **Mono** | `JetBrains Mono` | — | Code, labels, step numbers |

### Visual Style & Consistency Guidelines (CRITICAL)

> **Source of Truth:** The Home (`/`) page is the strict baseline for all typography and design conventions. All new pages (like `/residential`) MUST follow the exact typography weight, letter-spacing, and sizing rules established on the home page.

- **Headings:** MUST use `font-light leading-[1.2] tracking-wide text-3xl md:text-4xl lg:text-5xl` for a luxurious, editorial feel. Never use `font-display` or `tracking-tight`. Never use default bold/black weights unless specifically required.
- **Section Labels:** Small descriptive labels above headings (e.g., "Client Stories", "The Audience") MUST use `font-mono tracking-[0.3em] uppercase` and appropriate opacity (e.g. `text-muted-foreground` or `text-white/50`). Do not use `font-bold` or `tracking-[0.2em]`.
- **Numbers/Metrics:** Keep number fonts consistent with the body or heading fonts. Do not override with serif fonts unless explicitly matched on the home page.
- **Colors (Dark Theme):** Use `text-white`, `text-white/70`, `text-white/50` for text hierarchy on dark backgrounds. Avoid hardcoded grays.
- **Colors (Light Theme):** Use standard Tailwind variables like `bg-background`, `text-foreground`, `text-muted-foreground`, and `bg-card` rather than hardcoded hex values (e.g., `#fcfcfc`).
- **Generous whitespace:** Large padding (`py-24 md:py-40`)
- **Micro-interactions:** Hover scale, translate, opacity transitions
- **Noise texture overlays:** SVG fractalNoise at `opacity-[0.015]` for tactile feel
- **Gradient overlays:** `bg-gradient-to-t from-black/80` for text readability on images
- **Subtle shadows:** `shadow-sm`, `shadow-lg shadow-black/5`
- **Rounded corners:** `rounded-2xl` to `rounded-[40px]` for premium feel
- **Will-change hints** — `.motion-layer` class for GPU-accelerated elements

---

## 5. Animation System

### Architecture

All animations flow through a centralized pipeline:

```
gsapSetup.ts → Registers: ScrollTrigger, SplitText, useGSAP
animation.config.ts → Tokens: EASE, DURATION, STAGGER, SCROLL
scrollRefresh.ts → Debounced ScrollTrigger.refresh() after layout
SmoothScrollProvider.tsx → Lenis ↔ GSAP ticker sync
```

### Animation Tokens (`animation.config.ts`)

```typescript
EASE = {
  standard: 'power2.out',      // General transitions
  reveal: 'power3.out',        // Content reveal animations
  premium: 'expo.out',         // High-end entrances
  smooth: 'power2.inOut',      // Bidirectional transitions
  snap: 'expo.out',            // Quick snap effects
  pointer: 'power2.out',       // Mouse-following
  none: 'none',                // Linear (frame scrub, parallax)
}

DURATION = {
  instant: 0.2,  fast: 0.4,  medium: 0.6,
  normal: 0.8,   reveal: 0.9, slow: 1.2,
  scrub: 1,      pointer: 0.65
}

STAGGER = { tight: 0.05, reveal: 0.08, normal: 0.1, wide: 0.15 }

SCROLL = {
  scrub: 0.8,          // Default scrub interpolation
  scrubSlow: 1.1,      // Slower scrub
  anticipatePin: 1,    // Pin anticipation
  heroDistance: '+=300%',
  sectionDistance: '+=280%',
}
```

### Smooth Scroll Integration

- **Lenis** provides inertia-based smooth scrolling
- Connected to GSAP's ticker via `gsap.ticker.add(tickHandler)`
- Lenis scroll events feed `ScrollTrigger.update`
- Custom easing: `(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`
- `LenisContext` shares the instance for programmatic `scrollTo()` calls

### Accessibility

- **`useReducedMotion` hook** — respects `prefers-reduced-motion: reduce`
- Every animated component checks this flag and either skips animation entirely or renders a static fallback
- Global CSS kills all animations when reduced motion is preferred

---

## 6. Shared Layout Components

### NavBar (`components/layout/NavBar.tsx`)

| Feature | Details |
|---|---|
| **Position** | `fixed top-0`, `z-[9999999]` |
| **Visibility** | Show/hide on scroll direction, hidden during BrandIntro |
| **Logo** | `/logo.svg`, links to `/` |
| **Menu Toggle** | Hamburger → X animated with CSS transforms |
| **Integration** | Listens for `introComplete` event from BrandIntro |
| **Body Lock** | Locks scroll when fullscreen menu is open |

### FullscreenMenu (`components/layout/FullscreenMenu.tsx`)

| Feature | Details |
|---|---|
| **Rendering** | React Portal to `document.body` |
| **Open Animation** | Circular clip-path expansion from hamburger position |
| **Background** | Off-white `#fcfcfc` with noise texture |
| **Layout** | Left 45%: navigation links / Right 55%: dynamic image preview |
| **Link Animation** | Staggered slide-up on open, blur/opacity for non-hovered |
| **Hover Effects** | Active link gets `text-accent`, `pl-6`, numbered index appears |
| **Image Preview** | Crossfade with scale animation on hover change |
| **Sub-navigation** | Slides in over the preview image with border separators |
| **Mobile** | Full-width accordion with expandable sub-items |
| **Menu Items** | Solutions, Services, Projects, Company — each with sub-links |

### Footer (`components/layout/Footer.tsx`)

| Feature | Details |
|---|---|
| **Background** | `#fcfcfc` with top border |
| **Layout** | 4-column grid (responsive → stacked on mobile) |
| **Content** | Brand name, contact info, showroom addresses, newsletter form |
| **Link Groups** | Services, Solutions, Company |
| **Animation** | GSAP staggered fade-up reveal on scroll |

### SmoothScrollProvider (`components/layout/SmoothScrollProvider.tsx`)

| Feature | Details |
|---|---|
| **Wraps** | All page content (in root `layout.tsx`) |
| **Lenis Config** | `duration: 1.2`, `touchMultiplier: 2` |
| **GSAP Sync** | Ticker drives Lenis RAF, Lenis scroll updates ScrollTrigger |
| **Context** | Provides `LenisContext` for child components |
| **Refresh** | Calls `refreshAfterLayoutSettles()` for correct pin calculations |

---

## 7. Page: Home (`/`)

**Route:** `/`  
**File:** `app/page.tsx`  
**Type:** Client Component (`'use client'`)

### Section Rendering Order

```
1.  BrandIntro          — Fullscreen brand loading animation (one-time)
2.  NavBar              — Fixed navigation (shared)
3.  HeroSection         — Scroll-driven video canvas + cinematic text reveals
4.  StatsSection        — Stats counter with sticky left column
5.  BrandTicker         — Infinite horizontal brand marquee
6.  AutomationSpaces    — Pinned image gallery with slot transitions
7.  ConnectedSystems    — Sticky card stack with service details
8.  FeaturedProjects     — Pinned sidebar + scroll-driven project showcase
9.  AwardsSection       — Hover-reactive award list with floating images
10. WhyChooseUsSection  — Expandable accordion panels
11. ProcessSection      — Stacking card process steps
12. TestimonialsSection — Auto-scrolling testimonial columns
13. CallToActionSection — Final CTA with typographic reveal
```

---

### Section 1: BrandIntro

**File:** `components/sections/home/BrandIntro.tsx`  
**Type:** One-time fullscreen brand loading animation

#### Purpose
Cinematic brand entrance that plays once per session. Locks scroll, shows logo with a circular loading animation, then retracts upward like a curtain to reveal the hero.

#### Visual Elements
- **Curtain:** Off-white `#faf9f7` fullscreen overlay
- **Logo:** `/logo.svg` centered with a circular SVG loading ring
- **Loading Ring:** Crimson `#8c1817` circle, `strokeDasharray: 716.28`, animated to `0`

#### Animation Timeline (total ~4.6s)

| Time | Action | GSAP Details |
|---|---|---|
| 0.0s | Spinning loading circle starts | `rotation: 360`, `repeat: -1`, linear |
| 0.3s | Logo fades in + scales up | `opacity: 0→1`, `scale: 0.95→1`, `power2.out`, 1.2s |
| 0.5s | Loading ring fills | `strokeDashoffset: 716.28→0`, `power2.inOut`, 2s |
| 2.8s | **HOLD** — brief brand recognition pause | — |
| 3.2s | Content group fades out | `opacity: 0`, `scale: 0.97`, `power2.in`, 0.5s |
| 3.4s | Curtain retracts upward | `height: 100%→0%`, `power3.inOut`, 1s |
| 3.4s | Bottom edges round as curtain lifts | `borderRadius: 0→10vw`, `power2.inOut`, 0.8s |
| 3.6s | `introComplete` event dispatched | Hero entrance begins |
| 4.6s | Overlay set to `display: none` | Cleanup |

#### Key Behaviors
- **Session persistence:** Uses `sessionStorage.brandIntroPlayed` — skips on revisit
- **Scroll lock:** HTML/body `overflow: hidden`, `position: fixed` during playback
- **Safety timeout:** 8s fallback to unlock scroll if animation stalls
- **Event dispatch:** `window.dispatchEvent(new CustomEvent('introComplete'))` signals NavBar and HeroSection

---

### Section 2: HeroSection

**File:** `components/sections/home/HeroSection.tsx`  
**Type:** Scroll-driven canvas frame sequence + text reveals

#### Purpose
Cinematic hero experience with a 144-frame WebP image sequence scrubbed by scroll position. The section pins to viewport and progresses through multiple visual phases.

#### Visual Elements
- **Canvas:** Full-viewport `<canvas>` rendering pre-loaded frame images
- **Frame Sequence:** 144 WebP frames (`/heroFrames/0001.webp` → `0144.webp`)
- **Frame Container:** Starts at `height: 85%` with `borderRadius: 10vw` bottom curves
- **Foreground Content:** Headline, description, two CTA buttons
- **Scroll Descriptions:** Three sequential text reveals during fullscreen phase
- **Reveal Layer:** Accent-colored background with large headline text

#### Frame Loading Strategy
1. First frame loaded immediately (async/await)
2. Canvas resizes to device pixel ratio (capped at 2x)
3. Remaining frames loaded sequentially with 10ms delay between each
4. `getNearestLoadedFrame()` provides fallback if requested frame isn't loaded yet
5. `drawCoverImage()` uses `object-fit: cover` equivalent math for canvas

#### Scroll Animation Phases (pinned, `end: +=600%`)

| Phase | Timeline Position | What Happens |
|---|---|---|
| **Frame scrub** | `0 → 0.88` | Frames 1→144 scrubbed linearly with scroll |
| **Expand to fullscreen** | `0 → 0.3` | `height: 85%→100%`, `borderRadius: 10vw→0px` |
| **Hide foreground text** | `0 → 0.2` | Headline/CTA fade up and out |
| **Show scroll copy container** | `0.26` | Scroll descriptions wrapper fades in |
| **Description 1** | `0.30 → 0.40` | "Homes. Hotels. Offices." slides in, then out |
| **Description 2** | `0.43 → 0.53` | "Lights. Shades. AV. Security. Wifi." slides in, then out |
| **Description 3** | `0.56 → 0.66` | "25 years of Expertise." slides in, then out |
| **Hide scroll copy** | `0.68` | Descriptions container fades out |
| **Shrink to 35%** | `0.72 → 0.92` | `height: 100%→35%`, `borderRadius: 0→15vw` |
| **Reveal text** | `0.78` | "The future of rooms is coming soon" fades in |
| **Video vanishes** | `0.9 → 1.1` | `height: 35%→0%` (video disappears upward) |
| **Theme transition** | `1.02` | Background → `var(--color-background)`, text color shifts |
| **Text exits** | `1.18` | Reveal text fades out and moves up |

#### Entrance Animation (triggered by `introComplete` event)
- Frame container fades in (1.2s)
- Heading words cascade via SplitText (stagger 0.04, 1.1s)
- Description slides up (0.9s)
- CTAs slide up (0.9s)

#### Content
- **Heading:** "Intelligent Spaces / Intelligent Integration"
- **Description:** "Transforming homes with cutting-edge automation since 2002"
- **CTA Primary:** "Book a Consultation" → `/contact` (accent variant)
- **CTA Secondary:** "Explore Projects" → `/projects` (glass variant)
- **Scroll Descriptions:** "Homes. Hotels. Offices." / "Lights. Shades. AV. Security. Wifi." / "25 years of Expertise."
- **Reveal Text:** "The future of rooms is coming soon"

#### Mobile Fallback
Static layout with first frame as `<NextImage>`, gradient overlay, no scroll animation.

---

### Section 3: StatsSection

**File:** `components/sections/home/StatsSection.tsx`

#### Purpose
Split-panel stats section with a sticky left introduction and vertically stacked metrics on the right.

#### Layout
- **Left Column (5/12):** Sticky heading "Proven Global Excellence" + body text
- **Right Column (7/12):** Vertical stack of 5 stat items with left border

#### Stats Data
| Value | Label |
|---|---|
| 25 | Years of Experience |
| Over 1000 | Projects completed |
| 15 | Cities all over India |
| 3 | Experience Centres in Delhi, Mumbai and Bengaluru |

#### Animations
| Element | Trigger | Animation |
|---|---|---|
| Left column | `top 70%` | Fade up: `y: 30→0`, `opacity: 0→1`, `power3.out`, 1.2s |
| Each stat card | `top 72%` | Fade up: `y: 60→0`, `opacity: 0→1`, `power3.out`, 1.2s |
| Stat number (hover) | CSS | `-translate-y-1`, 500ms cubic-bezier |
| Label (hover) | CSS | Color `text-muted → text-foreground`, 500ms |

---

### Section 4: BrandTicker

**File:** `components/sections/home/BrandTicker.tsx`

#### Purpose
Infinite horizontal marquee of premium automation brand names.

#### Brands
`LUTRON`, `CRESTRON`, `CONTROL4`, `SAVANT`, `SONOS`, `KNX`, `BANG & OLUFSEN`

#### Visual Design
- **Background:** Black `bg-black`, white text
- **Edge Masks:** Left/right gradient fade-out with `backdrop-blur-[4px]`
- **Brand items:** `opacity-55`, hovered → `!opacity-100`, `scale-105`
- **Group hover:** All non-hovered items dim to `opacity-25`

#### Animations
| Feature | Details |
|---|---|
| **Intro fade** | Fade up when entering viewport (`top 72%`) |
| **Infinite loop** | `xPercent: -50`, `duration: 25`, linear repeat |
| **Scroll velocity boost** | `ScrollTrigger.onUpdate` reads velocity, boosts `timeScale` up to 4x |
| **Velocity decay** | Returns to `timeScale: 1` after 100ms, `power2.out`, 0.8s |
| **Hover pause** | `timeScale → 0` on hover, `timeScale → 1` on leave |

---

### Section 5: AutomationSpaces

**File:** `components/sections/home/AutomationSpaces.tsx`

#### Purpose
Pinned image gallery showcasing three business verticals (Residential, Hospitality, Commercial) with animated slot transitions.

#### Panels Data
| Index | Title | Image |
|---|---|---|
| 01 | Residential | Unsplash luxury home |
| 02 | Hospitality | Unsplash hotel |
| 03 | Commercial | Unsplash office |

#### Layout Slot System (Desktop)
```
SLOTS = {
  center:      { top: 15vh, left: 20vw, width: 40vw, height: 70vh }  // Active image
  topLeft:     { top: 5vh,  left: 5vw,  width: 10vw, height: 10vw }  // History
  bottomRight: { top: 75vh, left: 85vw, width: 10vw, height: 10vw }  // Preview
  hidden:      { same as bottomRight, autoAlpha: 0 }                   // Off-stage
}
```

#### Scroll Animation Phases (pinned, `end: +=${(panels + 1) * 150}%`)

| Phase | What Happens |
|---|---|
| **Intro** | Section heading fades out, first image scales up from 0.9 → 1, second image appears in bottomRight preview |
| **Transition 1→2** | Image 1 slides to topLeft, Image 2 moves from bottomRight to center, Image 3 appears in bottomRight |
| **Transition 2→3** | Image 2 slides to topLeft, Image 3 moves to center |
| **Text synced** | Each panel's text (title, description, CTA) fades in/out with its image |

#### Text Content Position
- Positioned at `top: 28vh, right: 8vw, width: 28vw`
- Each panel has numbered label, description, and "Discover [Type] Projects" CTA link
- Residential panel links to `/residential`; others are buttons (placeholder)

#### Mobile Fallback
Simple vertical card layout with images and text stacked.

---

### Section 6: ConnectedSystems

**File:** `components/sections/home/ConnectedSystems.tsx`

#### Purpose
Full-page sticky card stack showcasing 6 automation service categories.

#### Services Data

| # | ID | Title | Accent Color |
|---|---|---|---|
| 01 | lighting | Lighting Automation | `#8ab4ff` |
| 02 | av | Audio Video Automation | `#c7a6ff` |
| 03 | shades | Shades Automation | `#7ee7d8` |
| 04 | hvac | HVAC Automation | `#8ce1a1` |
| 05 | security | Security Automation | `#ffd47a` |
| 06 | amc | AMC (Core Maintenance) | `#ff9d8f` |

#### Layout
- **Header Section:** Sticky, centered intro with pill badge "Connected Systems", heading "Our Automation Expertise"
- **Card Stack:** 6 full-screen service cards stack via `sticky top-0` with incrementing `z-index`
- **Each Card:** 50/50 split — image (parallax) | content (staggered reveal)
- **Image alternation:** Even-indexed cards have image right, odd-indexed cards have image left

#### Animations per Card
| Element | Trigger | Animation |
|---|---|---|
| Image | Scroll scrub (`top 80%` → `top top`) | Scale `1.15→1`, `yPercent: -15→0` parallax |
| Content elements | `top 70%` | Staggered fade-up: `y: 50→0`, `opacity: 0→1`, stagger 0.1 |
| Header elements | `top 70%` | Staggered fade-up: `y: 40→0`, stagger 0.15 |

#### Visual Details
- SVG fractalNoise texture overlay at `opacity-[0.03]`
- CTA: "Talk to an Expert" rounded button with accent background + hover glow
- Mobile: Gradient overlay on image bottom for text readability

---

### Section 7: FeaturedProjects

**File:** `components/sections/home/FeaturedProjects.tsx`

#### Purpose
Pinned sidebar navigation with scroll-driven project showcase.

#### Projects Data

| ID | Name | Category | USPs |
|---|---|---|---|
| p1 | Private Residence | Residential | Lighting, AV Integration |
| p2 | Sawai Man Mahal | Hospitality | Guest Room Automation |
| p3 | Horizon Tower | Commercial | Predictive HVAC, Shading, Analytics |
| p4 | Estate On The Cliff | Residential | Perimeter Defense, Cinema AV, Off-Grid |
| p5 | Lumina Resort | Hospitality | Choreographed Water, Landscape Audio |

#### Desktop Layout (Pinned, `end: +=${projects.length * 200}vh`)
- **Left Sidebar (30-35%):** Project names as vertical navigation with progress track + active line indicator
- **Right Display (65-70%):** Layered project images with content dock overlay

#### Scroll Animation Mechanics

| Feature | Details |
|---|---|
| **Image transitions** | Clip-path wipe: `inset(100% 0 0 0) → inset(0% 0 0 0)` |
| **Ken Burns** | Subtle slow zoom `scale: 1→1.035` during reading pause |
| **Navigation** | Active project name shifts right (`x: 24`), goes full black |
| **Progress line** | Top position animates to match current project percentage |
| **Content crossfade** | Previous content fades out (`y: -30`), new content fades in (`y: 40→0`) |
| **Staggered reveals** | Category badge, title, description, USPs, CTA all stagger in |

#### Mobile Fallback
Vertical card list with rounded corners, shadows, and standard layout.

---

### Section 8: AwardsSection

**File:** `components/sections/home/AwardsSection.tsx`

#### Purpose
Hover-reactive award list with cursor-following floating images.

#### Awards Data
| Year | Title | Category |
|---|---|---|
| 2026 | Top Performer | All India |
| 2024 | Design Excellence | Recognition |
| 2022 | Platinum Award | Global |
| 2021 | Innovation Champion | Luxury Business |
| 2019 | Hospitality Star | Business Excellence |

#### Visual Design
- **Background:** `#fcfcfc`
- **Header:** "Selected Awards." with faded "Awards." in `text-black/30`
- **Each Row:** Year | Title (oversized) | Category — separated by subtle borders

#### Animations

| Feature | Details |
|---|---|
| **Header reveal** | Staggered fade-up (`y: 50→0`, `power3.out`) |
| **Row reveal** | Staggered fade-up (`y: 40→0`, `power3.out`, stagger 0.15) |
| **Floating image** | Follows cursor position with `power3.out` easing (0.6s lerp) |
| **Image appear** | `scale: 0.8→1`, `opacity: 0→1` on row mouseenter |
| **Image dismiss** | `scale: 1→0.8`, `opacity: 1→0` on row mouseleave |
| **Non-hovered rows** | Dim to `opacity-30` when any row is hovered |
| **Active row** | Title shifts `translate-x-8` on hover |

---

### Section 9: WhyChooseUsSection

**File:** `components/sections/home/WhyChooseUsSection.tsx`

#### Purpose
Interactive accordion panel grid showcasing 6 USPs.

#### USP Data
| # | Title | Short Title | Icon |
|---|---|---|---|
| 1 | End-to-End Solutions | End-to-End | Layers |
| 2 | Custom Engineering | Engineering | Cpu |
| 3 | Premium Partners | Partners | Globe |
| 4 | Dedicated Support | Support | Headphones |
| 5 | Proven Expertise | Expertise | Award |
| 6 | Fast Execution | Execution | Zap |

#### Interaction Model
- **Desktop:** Horizontal panel row. One panel expanded (flex-4), others compressed (flex-1)
- **Mobile:** Vertical stack. Active panel tall (340px), others compressed (72px)
- **Trigger:** `onMouseEnter` / `onFocus` expands a panel

#### Animations (CSS-driven, not GSAP)

| State | Transition |
|---|---|
| **Panel expand** | `flex: 1 → 4`, `bg-surface-darker → bg-panel`, `shadow-md`, 700ms cubic-bezier |
| **Compressed title** | Desktop: rotated -90°, centered. Mobile: horizontal with icon |
| **Expanded content** | Staggered `translate-y-8 → 0`, delays 100-300ms |
| **Background icon** | `scale-50 rotate-[-45deg] → scale-100 rotate-0`, 1000ms |
| **Active icon** | Accent-colored circle slides up with 100ms delay |

---


### Section 11: ProcessSection

**File:** `components/sections/home/ProcessSection.tsx`

#### Purpose
5-step process flow displayed as stacking cards on desktop.

#### Steps Data
| Step | Title | Description |
|---|---|---|
| 01 | Consultation | Understanding lifestyle, space, and goals |
| 02 | Design & Planning | Bill of Quantities, drawings, schematics |
| 03 | Installation | On-site hardware installation |
| 04 | Integration | Programming scenes, schedules, testing |
| 05 | Support | Walkthrough and post-handover support |

#### Desktop Layout (Pinned, `end: +=${cards.length * 100}%`)
- Full-screen stacking cards with `rounded-[40px]`
- Each card: 50/50 split (text left / image right)
- Giant watermark phase number at `opacity-[0.02]`

#### Stacking Animation

| Feature | Details |
|---|---|
| **New card enters** | `yPercent: 120→0`, `scale: 0.95→1`, `opacity: 0→1`, `blur: 10px→0` |
| **Previous cards recede** | `scale: 1-n*0.05`, `yPercent: -n*6`, `opacity: 1-n*0.2`, `blur: n*1.5px` |
| **Easing** | `power3.inOut` for cinematic weight |

#### Mobile Fallback
Vertical card list with `rounded-3xl`, image above text, GSAP fade-up per card.

---

### Section 12: TestimonialsSection

**File:** `components/sections/home/TestimonialsSection.tsx` → `components/ui/testimonial-v2.tsx`

#### Purpose
Auto-scrolling multi-column testimonial wall.

#### Testimonials Data (10 total)
From companies/individuals: DFI, Fabinteriors, QDP, Design Matrix, Apeejay Surrendra, Sanjeet Bhasin, Ujjwal Munjal (Hero), Abhimanyu Dalal (ADA), Rajan Mittal (Airtel), Kanav Mehra (Jaguar)

#### Layout
- 3 columns (1 on mobile, 2 on tablet, 3 on desktop)
- Each column auto-scrolls vertically at different speeds (35s, 40s, 30s)
- Content duplicated (2x) for seamless infinite loop
- Top/bottom gradient mask: `[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]`

#### Animations
| Feature | Details |
|---|---|
| **Column scroll** | `yPercent: 0→-50`, linear, infinite repeat |
| **Hover pause** | Timeline pauses on mouseenter, plays on mouseleave |
| **Section entrance** | Content fades up (`y: 50→0`, `opacity: 0→1`, 1.2s) |
| **Card hover** | `scale-[1.03]`, `-translate-y-2`, `shadow-2xl` |
| **Quote icon** | `text-foreground/5 → text-accent/10` on group hover |

---

### Section 13: CallToActionSection

**File:** `components/sections/home/CallToActionSection.tsx`

#### Purpose
Final conversion CTA with typographic text animation.

#### Content
- **Label:** "Next Steps" with decorative horizontal rules
- **Headline:** "Ready to Transform Your Space?"
- **Subhead:** Consultation invitation text
- **CTA Primary:** "Book Consultation" (accent, rounded-full, sweep animation)
- **CTA Secondary:** "Call Now" (glass variant, phone icon)
- **Background:** Subtle accent-colored radial glow

#### Animations

| Element | Trigger | Animation |
|---|---|---|
| Headline words | `top 75%` | SplitText words: `yPercent: 120`, `rotationZ: 2`, stagger 0.05, `power4.out` |
| Subheading | `top 65%` | Fade up: `y: 40→0`, delay 0.3 |
| Button group | `top 55%` | Fade up: `y: 30→0`, delay 0.4 |
| Sweep highlight | Hover | `@keyframes sweep` — diagonal light streak across button |

---

## 8. Page: Residential (`/residential`)

**Route:** `/residential`  
**File:** `app/residential/page.tsx`  
**Type:** Client Component (`'use client'`)

### Recent Updates & Fixes (Current Session)
- **ResidentialProcess.tsx:** Redesigned process into a 5-phase "Execution Architecture". Split the heading header, added a "Book a consultation" button, and moved the active timeline alignment to `top-[60%]` to prevent vertical overflow while achieving a slower cinematic scroll multiplier (`* 60%`).
- **ResidentialGovernance.tsx:** Standardized typography spacing and font sizes per design system rules (`text-3xl to 5xl`).
- **ResidentialExperienceCenters.tsx:** Updated text to "The Experience Ecosystem". Switched locations to Delhi, Mumbai, and Bangalore with real addresses and phone numbers. Optimized responsive layout height padding and margins to gracefully handle smaller desktop screens without relying on inner scrolling (which conflicts with GSAP pinning).
- **ResidentialCTA.tsx:** Updated content to "Bring Intelligent Infrastructure to Your Residence" and "Schedule a Private Consultation", enforcing `font-light` design rules.
- **ResidentialEfficiency.tsx:** Replaced Unsplash placeholders with local static image imports (`comfort`, `control`, `entertainment`).

### Section Rendering Order

```
1. NavBar              — Fixed navigation (shared)
2. ResidentialHero     — Cinematic architectural flythrough hero
3. ResidentialTrust    — Metric cards grid with animated counters
4. BrandTicker         — Shared brand marquee
5. ResidentialServices — 3-column pinned interactive layout
6. ResidentialProcess  — Vertical timeline pinned layout
7. ResidentialCaseStudies — Fullscreen cinematic case study carousel
8. ResidentialCredentials — Industry Credentials & Global Benchmarks
9. ResidentialExperienceCenters — Interactive map with dynamic city backgrounds
10. Footer             — Site-wide footer (shared, rendered in layout)
```

> **Note:** Footer is included in the residential page component as well as in the root layout. This means it renders twice — this may need cleanup.

---

### Section 1: ResidentialHero

**File:** `components/sections/residential/ResidentialHero.tsx`

#### Purpose
Cinematic hero section simulating "walking into a luxury smart home" with layered lighting effects, camera motion, and atmospheric overlays.

#### Visual Layer Stack (back to front)

| Layer | z-index | Description |
|---|---|---|
| Background Image | 0 | `/images/residential_hero_bg.png`, `object-cover` |
| Ambient Glow 1 | — | Ceiling warm wash (orange `rgba(254,215,170,0.25)`, `blur-[100px]`) |
| Ambient Glow 2 | — | Accent wall warm (orange `rgba(251,146,60,0.15)`, `blur-[120px]`) |
| Ambient Glow 3 | — | Floor lamp reflection (orange, `blur-[130px]`) |
| Ambient Glow 4 | — | Twilight window (blue `rgba(224,242,254,0.15)`, `blur-[110px]`) |
| Volumetric Light | — | Diagonal light ray sweep (`rotate-[15deg]`, `mix-blend-screen`) |
| Dark Overlay | z-2 | `bg-[#060608]`, `mix-blend-multiply`, starts at `opacity: 0.95` |
| Lens Light Leak | — | Brand crimson glow at bottom-left |
| Glass Reflection | z-4 | Subtle `via-white/[0.01]` gradient |
| Film Grain | z-4 | SVG fractalNoise at `opacity-[0.012]` |
| Typography & CTAs | z-10 | Heading, subheading, button |

#### Entrance Animation Timeline (auto-plays on mount)

| Step | Element | Duration | Ease | Delay |
|---|---|---|---|---|
| 1 | Camera glide (`scale: 1→1.08`) | 6s | `power2.out` | 0s |
| 2 | Dark overlay lifts (`opacity: 0.95→0.15`) | 4.5s | `sine.out` | 0.2s |
| 3 | Ambient glows activate (`opacity: 0→0.85`) | 4s | `power2.out` | 0.8s |
| 4 | Volumetric light shifts (`opacity: 0→0.25`, `x: +15`) | 5s | `sine.out` | 0.5s |
| 5 | Heading words cascade (SplitText) | 1.1s | `power3.out` | 0.2s |
| 6 | Subheading slides up | 0.9s | `power3.out` | 0.5s |
| 7 | CTA button slides up | 0.9s | `power3.out` | 0.65s |

#### Content
- **Heading:** "Smart Home Automation for Modern Living"
- **Subhead:** "Quiet luxury powered by intelligent technology..."
- **CTA:** "Book Consultation" → `#consultation` (accent, rounded-full)
- **Background:** Dark `#040404`
- **Font:** `font-display` (Playfair Display) for heading, `font-sans` (Lato) for body

---

### Section 2: ResidentialTrust

**File:** `components/sections/residential/ResidentialTrust.tsx`

#### Purpose
Grid of animated metric cards with counter-up numbers and cursor-following spotlight effect.

#### Metrics Data
Same as home page StatsSection:
| Target | Suffix | Label |
|---|---|---|
| 25 | + | Years of Experience |
| 1000 | + | Projects Completed |
| 15 | | Cities Across India |
| 3 | | Experience Centres |

#### Visual Design
- **Background:** Dark `#040404` with warm ambient glow overlays
- **Grid:** 5 columns (responsive: 1 → 2 → 5), separated by `1px` white/8% gap lines
- **Cards:** Dark cells with cursor-following spotlight glow

#### Animations

| Feature | Details |
|---|---|
| **Counter-up** | GSAP tween `0→target`, 2.2s, `power3.out`, triggered at `top 90%` |
| **Grid stagger** | Cards stagger in: `y: 40→0`, `opacity: 0→1`, stagger 0.1, 1.2s |
| **Spotlight** | Radial gradient (`300px circle`) follows cursor position on each card |
| **Card hover** | Background shifts `#040404 → #070707` |

---

### Section 3: ResidentialServices
**File:** `components/sections/residential/ResidentialServices.tsx`
- **Purpose:** 3-column pinned layout showcasing Lighting, AV, Security, Shades, HVAC, and AMC.
- **Layout:** Left scrollable nav, center crossfading image, right fading text content.
- **Animation:** GSAP ScrollTrigger pins the section, dynamically updates `activeIndex` based on scroll scrub.

---

### Section 4: ResidentialProcess
**File:** `components/sections/residential/ResidentialProcess.tsx`
- **Purpose:** 10-step process timeline mapped to vertical scrolling.
- **Layout:** Fullscreen. Left label, central vertically translating step list, right content sitting below a horizontal axis line.
- **Animation:** Timeline physically translates Y-axis so the active step perfectly intersects the center axis. Background Unsplash images crossfade dynamically per step.

---

### Section 5: ResidentialCaseStudies
**File:** `components/sections/residential/ResidentialCaseStudies.tsx`
- **Purpose:** High-impact, fullscreen portfolio showcase.
- **Layout:** Left panel (bold text, descriptions), Right panel (stunning imagery with gradients).
- **Animation:** Pinned section where scrolling transitions content instantly. Images slide via custom clip-paths and scales.

---

### Section 6: ResidentialCredentials
**File:** `components/sections/residential/ResidentialCredentials.tsx`
- **Purpose:** Showcase institutional authority, awards, and accreditations.
- **Layout:** Two-column sticky layout. Left side (Tagline and Heading) stays sticky while the right side (Credentials list) scrolls normally.
- **Animation:** Clean, Apple-like minimal animations. As each credential scrolls into view, the large background number slides in, a separator line draws itself out, the title reveals via a `clipPath` wipe, and the description drifts up.

---

### Section 7: ResidentialExperienceCenters
**File:** `components/sections/residential/ResidentialExperienceCenters.tsx`
- **Purpose:** Interactive map layout for Delhi, Mumbai, and Bangalore.
- **Layout:** Split-screen (left locations accordion, right map diagram).
- **Features:** Dynamic "real map diagram" background crossfades for each city. A central pulsing GSAP radar dot highlights the active Experience Center coordinates.

---

## 9. Page: Experience Center (`/experience-center`)

**Route:** `/experience-center`  
**File:** `app/experience-center/page.tsx`  
**Type:** Client Component (`'use client'`)

### Section Rendering Order

```
1. ExperienceHero         — Immersive video/image hero with GSAP fade/split text
2. ResidentialTrust       — Trust signals counter metrics
3. ExperienceShowroom     — Large visual + text section
4. ExperienceCentersList  — Fullscreen "curtain wipe" scrolling cities
5. ExperienceAudience     — Light-themed grid of target audiences
6. ExperienceGallery      — Horizontal scrolling photo gallery (Apple style)
7. ExperienceUSP          — 4-column cards with dark aesthetic
8. ExperienceTestimonials — Drag/swipe GSAP spring testimonial cards
9. ResidentialCTA         — Final Call to Action
```

### Key Technical Implementations
- **Animations:** Extensive use of `ScrollTrigger` and `gsap.to()` rather than `.from()` on pinned sections to prevent position calculation bugs.
- **Curtain Wipe:** `ExperienceCentersList` pins the container and translates cities up like a stack of cards over each other.
- **Horizontal Scroll:** `ExperienceGallery` pins the section and animates a container horizontally `xPercent: -amount` tied to scroll scrub.
- **Theme Usage:** Explicit use of standard Tailwind classes (`bg-background`, `text-foreground`) for light sections and `bg-[#040404]` for dark sections to maintain aesthetic contrast.
- **Testimonials:** Replaced framer-motion with native GSAP Draggable pointer events (`onPointerDown/Move/Up`) utilizing `ease: "back.out(1.5)"` for realistic spring physics.

---

## 10. Page: Commercial (`/commercial`)

**Route:** `/commercial`  
**File:** `app/commercial/page.tsx`  
**Type:** Client Component (`'use client'`)

### Section Rendering Order

```
1. CommercialHero         — Cinematic commercial hero
2. CommercialTrust        — Trust signals section
3. BrandTicker            — Commercial-Specific Trusted Brands
4. CommercialIndustries   — Industries We Serve Carousel
5. CommercialSolutions    — Commercial Automation Solutions
6. CommercialBenefits     — Commercial Benefits
7. CommercialProjects     — Commercial Projects Accordion
8. CommercialCapabilities — Smart Systems Marquee
9. CommercialTestimonials — Commercial Testimonials
10. CommercialCTA         — Final Call to Action
```

---

## 11. Page: Hospitality (`/hospitality`)

**Route:** `/hospitality`  
**File:** `app/hospitality/page.tsx`  
**Type:** Client Component (`'use client'`)

### Section Rendering Order

```
1. HospitalityHero            — Cinematic hospitality hero
2. HospitalityStats           — Statistics and metrics
3. HospitalityFeaturedProjects— Featured projects showcase
4. HospitalityEnvironments    — Hotel environments
5. HospitalitySolutions       — Specialized hospitality solutions
6. HospitalityBenefits        — Business benefits
7. HospitalityEcosystem       — Integration ecosystem
8. HospitalityTestimonials    — Client testimonials
9. HospitalityCTA             — Final Call to Action
```

---

## 12. Reusable UI Components

### Button (`components/ui/button.tsx`)

CVA-based button with multiple variants:

| Variant | Style |
|---|---|
| `default` | `bg-primary text-primary-foreground` |
| `outline` | `border-border bg-background` |
| `secondary` | `bg-secondary text-secondary-foreground` |
| `ghost` | Transparent, hover → `bg-muted` |
| `destructive` | Red |
| `link` | Underline on hover |
| `accent` | **`bg-accent text-white`** — brand CTA style |
| `glass` | `bg-white/10 border-white/20 backdrop-blur-md` — frosted glass |

| Size | Height |
|---|---|
| `xs` | `h-6` |
| `sm` | `h-9` |
| `default` | `h-10` |
| `lg` | `h-12` |
| `xl` | `h-14` |
| `icon` | `size-10` |

| Shape | Border Radius |
|---|---|
| `default` | `rounded-lg` |
| `full` | `rounded-full` |
| `square` | `rounded-none` |

---

## 13. Custom Hooks

### `useBreakpoint()` (`hooks/useBreakpoint.ts`)

Unified responsive hook using `useSyncExternalStore`.

| Property | Type | Description |
|---|---|---|
| `isMobile` | `boolean` | `width < 768px` |
| `isTablet` | `boolean` | `768px ≤ width < 1024px` |
| `isDesktop` | `boolean` | `width ≥ 1024px` |
| `isReady` | `boolean` | `false` during SSR, `true` after first client measurement |

**Important:** Components check `isReady` before rendering animated content to avoid hydration mismatches.

### `useReducedMotion()` (`hooks/useReducedMotion.ts`)

Detects `prefers-reduced-motion: reduce` via `useSyncExternalStore`.

Returns `true` if the user prefers reduced motion. Components use this to:
- Skip GSAP animations entirely
- Render static fallback layouts
- Disable parallax and scrub effects

---

## 14. Build & Deployment

| Setting | Value |
|---|---|
| **Output** | Static export (`output: "export"`) |
| **Trailing Slash** | Enabled (`trailingSlash: true`) |
| **Images** | Unoptimized (required for static export) |
| **Remote Images** | Allowed from `images.unsplash.com` |
| **Build Command** | `next build` |
| **Dev Command** | `next dev` |
| **Output Directory** | `out/` |

---

## 15. Important Patterns & Conventions

### Animation Patterns

1. **Every animated section** uses `useGSAP` with `scope: ref` and `dependencies` array
2. **ScrollTrigger pinning** uses `anticipatePin: 1` for Lenis compatibility
3. **`scheduleScrollRefresh()`** is called after every animation setup to recalculate pin positions
4. **Mobile/Reduced Motion guards** — checked at the top of every `useGSAP` callback
5. **Cleanup** — all timelines and triggers are killed in the cleanup function
6. **Scrub values** — normalized to 0.8–2 range for smooth interpolation
7. **SplitText** — always reverted in cleanup to restore original DOM

### Component Patterns

1. **Scoped CSS classes** — Components prefix their animation targets (e.g., `fp-nav`, `cs-stagger-el`, `exp-img-0`) to avoid cross-component conflicts
2. **Single DOM tree** — Components that differ between mobile/desktop use CSS visibility (`block`/`hidden`) instead of conditional JSX trees (prevents GSAP scope crashes)
3. **Portal rendering** — FullscreenMenu renders via `createPortal` to `document.body`

### Event System

| Event | Dispatcher | Listeners |
|---|---|---|
| `introComplete` | BrandIntro | HeroSection, NavBar |
| `brandIntroPlayed` (session) | BrandIntro | BrandIntro (skip check) |
| `brandIntroFinished` (session) | BrandIntro, NavBar | NavBar (show immediately) |

### Naming Conventions

- **Section files:** PascalCase (e.g., `HeroSection.tsx`, `BrandTicker.tsx`)
- **CSS animation classes:** kebab-case with component prefix (e.g., `hero-foreground`, `fp-image`, `cs-header-el`)
- **Data constants:** UPPER_SNAKE_CASE (e.g., `PANELS`, `SERVICES`, `PROJECTS`)
- **Ref naming:** camelCase with `Ref` suffix (e.g., `sectionRef`, `canvasRef`)

### Performance Considerations

- **Canvas DPR** capped at `2x` to prevent GPU strain on high-DPI displays
- **Frame images** loaded sequentially with 10ms delay to avoid network congestion
- **`will-change`** applied via `.motion-layer` class only to actively animated elements
- **`transform-gpu`** class forces GPU compositing for smooth transforms
- **Debounced resize** handler (100ms) for canvas recalculation
- **ScrollTrigger refresh** debounced and scheduled after fonts load

---

> **For AI Assistants:** When modifying this project, always check `isReady` and `prefersReducedMotion` before adding animations. Use the centralized animation tokens from `animation.config.ts`. Scope all GSAP queries to the component's ref. Call `scheduleScrollRefresh()` after any animation setup that involves ScrollTrigger pinning.

---

## 16. Component Audit: Typography & Theme Alignment

This audit tracks components against the new global guidelines established in the Home and Experience Center pages. 
**Target Guidelines:** 
- Headings must use `font-light leading-[1.2] tracking-wide` (remove `font-display`, remove `tracking-tight`).
- Eyebrow labels must use `font-mono tracking-[0.3em] uppercase` (remove `font-bold`).
- Theme usage should leverage tailwind CSS vars (`text-foreground`, `bg-background`) or specific dark mode hexes without conflicting Tailwind `transition-all` on GSAP elements.

### ✅ Updated & Compliant (Experience Center, Commercial, Residential, Hospitality & Home)
- **All `/experience-center` sections** (`ExperienceHero`, `ExperienceGallery`, etc.)
- **All `/commercial` sections** (`CommercialHero`, `CommercialProjects`, etc.)
- **All `/residential` sections** (`ResidentialHero`, `ResidentialTrust`, etc.)
- **All `/hospitality` sections** (`HospitalityHero`, `HospitalityEnvironments`, etc.)
- **All `/` Home sections** (`BrandTicker`, etc.)
- `ui/testimonial.tsx`

All heading typography has been successfully standardized across the entire codebase to use the luxurious editorial style (`font-light tracking-wide leading-[1.2]`).
