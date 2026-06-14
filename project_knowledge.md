# SmartHome OS — Project Knowledge Base

> **Project:** AT Smart Living — Premium Smart Home Automation Website
> **Repo Root:** `c:\Users\Harish\Documents\Harish\My Projects\HA\smarthome-os`
> **Last Indexed:** 2026-06-13

---

## 1. Identity & Brand

| Aspect | Details |
|---|---|
| **Company** | AT Smart Living (ATPL) |
| **Industry** | Luxury Smart Home Automation |
| **Market** | India — HQ Delhi, offices in Mumbai, Bangalore, Hyderabad |
| **Accent Color** | Deep Crimson `#8c1817` |
| **Visual Tone** | Light luxury, editorial, architectural, cinematic |
| **Typography** | Playfair Display (headings), Lato (body), JetBrains Mono (labels/code) |

### Key Business Data
- **25** Years of Experience
- **Over 1000** Projects completed
- **15** Cities all over India
- **3** Experience Centres in Delhi, Mumbai and Bengaluru

---

## 2. Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.2.3 | React framework (App Router, **static export**) |
| **React** | 19.2.4 | UI library |
| **TypeScript** | ^5 | Type safety |
| **Tailwind CSS** | v4 | Utility-first styling (with `@theme` blocks) |
| **GSAP** | ^3.14.2 | Core animation engine (ScrollTrigger, SplitText) |
| **@gsap/react** | ^2.1.2 | React hook integration (`useGSAP`) |
| **Lenis** | ^1.3.21 | Smooth scroll with GSAP ticker sync |
| **Lucide React** | ^1.16.0 | Icon library |
| **shadcn** | ^4.7.0 | Component primitives |
| **CVA** | ^0.7.1 | Variant-based component styling |

### Build & Deployment
- **Output:** Static export (`output: "export"`, `trailingSlash: true`)
- **Images:** Unoptimized (required for static export), remote patterns from `images.unsplash.com`
- **Dev:** `next dev`
- **Build:** `next build` → outputs to `out/`

---

## 3. Architecture & File Structure

```
smarthome-os/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (fonts, SmoothScrollProvider, NavBar, Footer)
│   ├── page.tsx                  # Home page (client component)
│   ├── about/page.tsx            # About page (server component)
│   ├── blog/                     # Blog listing + [slug] detail
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── commercial/page.tsx       # Commercial service page
│   ├── contact/page.tsx          # Contact page (client component)
│   ├── experience-center/page.tsx
│   ├── hospitality/page.tsx      # Hospitality service page
│   ├── projects/page.tsx         # Projects portfolio page
│   ├── residential/page.tsx      # Residential service page
│   ├── thank-you/page.tsx        # Post-form submission page
│   └── api/brochure/             # API route for brochure download
│
├── components/
│   ├── layout/                   # Shared layout components
│   │   ├── NavBar.tsx            # Fixed top nav, z-[9999999]
│   │   ├── FullscreenMenu.tsx    # Portal-rendered fullscreen overlay menu
│   │   ├── Footer.tsx            # Site-wide footer
│   │   └── SmoothScrollProvider.tsx  # Lenis smooth scroll wrapper
│   │
│   ├── sections/                 # Page-specific section components
│   │   ├── home/                 # 13 components (BrandIntro, HeroSection, StatsSection, etc.)
│   │   ├── residential/          # 12 components
│   │   ├── commercial/           # 10 components
│   │   ├── hospitality/          # 9 components
│   │   ├── experience-center/    # 7 components
│   │   ├── about/                # 6 components (AboutHero, BrandStory, etc.)
│   │   ├── blog/                 # 13 components (BlogHero, BlogGrid, BlogDetailContent, etc.)
│   │   ├── contact/              # 4 components (ContactHero, InquiryForm, etc.)
│   │   └── projects/             # 6 components (ProjectsHero, ProjectGrid, ConsultationForm, etc.)
│   │
│   └── ui/                       # Reusable UI primitives
│       ├── button.tsx            # CVA-based Button (accent, glass, ghost, etc.)
│       ├── testimonial.tsx
│       └── testimonial-v2.tsx    # Auto-scrolling testimonial columns
│
├── hooks/
│   ├── useBreakpoint.ts          # Responsive: isMobile/isTablet/isDesktop/isReady
│   └── useReducedMotion.ts       # prefers-reduced-motion detection
│
├── lib/
│   ├── animation.config.ts       # EASE, DURATION, STAGGER, SCROLL tokens
│   ├── gsapSetup.ts              # GSAP plugin registration & re-exports
│   ├── lenisContext.ts           # React context for Lenis instance
│   ├── scrollRefresh.ts          # Debounced ScrollTrigger.refresh()
│   ├── blogData.ts               # Blog post data (4 posts + 1 featured)
│   └── utils.ts                  # cn() class merge utility
│
├── styles/globals.css            # Theme tokens, base styles, CSS utilities
├── assets/                       # Static imports (home/, residential/, projects/)
├── public/                       # Public static assets
│   ├── logo.svg, whitelogo.svg, ATPLLogowhite.png
│   ├── heroFrames/ (144 WebP frames for scroll-driven video)
│   ├── images/ (earth textures, hero backgrounds)
│   └── assets/ (project images served via public path)
└── next.config.ts                # Static export config
```

---

## 4. All Pages & Routes

| Route | Status | Type | Description |
|---|---|---|---|
| `/` | ✅ Complete | Client | Home — cinematic landing with 13 animated sections |
| `/residential` | ✅ Complete | Client | Residential automation — 12 sections |
| `/commercial` | ✅ Complete | Client | Commercial B2B automation — 10 sections |
| `/hospitality` | ✅ Complete | Client | Hospitality & Hotels — 9 sections |
| `/experience-center` | ✅ Complete | Client | Experience centers — 9 sections |
| `/about` | ✅ Complete | Server | Company story — 6 sections |
| `/blog` | ✅ Complete | Server | Blog listing with sidebar |
| `/blog/[slug]` | ✅ Complete | Server | Blog detail with hero, content, sidebar |
| `/projects` | ✅ Complete | Server | Portfolio grid with sidebar + consultation form |
| `/contact` | ✅ Complete | Client | Contact form + experience center map |
| `/thank-you` | ✅ Complete | — | Post-form submission confirmation |
| `/api/brochure` | ✅ | API | Brochure download endpoint |

---

## 5. Design System

### Color Palette (globals.css `@theme` + `:root`)
| Token | Value | Usage |
|---|---|---|
| `--color-background` | `#F7F7F5` | Light warm off-white page background |
| `--color-foreground` | `#111111` | Primary text color |
| `--color-accent` | `#8c1817` | Deep Crimson — brand accent, CTAs |
| `--color-accent-soft` | `#D32F2F` | Hover state for accent |
| `--color-muted` | `#555555` | Secondary/body text |
| `--color-panel` | `#FFFFFF` | Card/panel surfaces |
| `--color-border` | `rgba(0,0,0,0.08)` | Ultra-subtle borders |
| `--color-glass` | `rgba(255,255,255,0.7)` | Glassmorphism base |

### Typography Rules (CRITICAL)
- **Headings:** `font-light leading-[1.2] tracking-wide` — luxurious, editorial feel
- **Section Labels (eyebrows):** `font-mono tracking-[0.3em] uppercase`
- **Never use:** `font-display`, `tracking-tight`, or default bold/black weights on headings
- **Dark theme text hierarchy:** `text-white`, `text-white/70`, `text-white/50`
- **Light theme:** Use Tailwind vars: `bg-background`, `text-foreground`, `text-muted-foreground`

### Visual Conventions
- Generous whitespace: `py-24 md:py-40`
- Rounded corners: `rounded-2xl` to `rounded-[40px]`
- SVG fractalNoise overlays at `opacity-[0.015]`
- Gradient overlays for text on images
- Subtle shadows: `shadow-sm`, `shadow-lg shadow-black/5`
- `.motion-layer` for GPU-accelerated animated elements

---

## 6. Animation System

### Pipeline
```
gsapSetup.ts → Registers: ScrollTrigger, SplitText, useGSAP
animation.config.ts → Tokens: EASE, DURATION, STAGGER, SCROLL
scrollRefresh.ts → Debounced ScrollTrigger.refresh()
SmoothScrollProvider.tsx → Lenis ↔ GSAP ticker sync
```

### Tokens (animation.config.ts)
```typescript
EASE = { standard: 'power2.out', reveal: 'power3.out', premium: 'expo.out', smooth: 'power2.inOut', snap: 'expo.out', pointer: 'power2.out', none: 'none' }
DURATION = { instant: 0.2, fast: 0.4, medium: 0.6, normal: 0.8, reveal: 0.9, slow: 1.2, scrub: 1, pointer: 0.65 }
STAGGER = { tight: 0.05, reveal: 0.08, normal: 0.1, wide: 0.15 }
SCROLL = { scrub: 0.8, scrubSlow: 1.1, anticipatePin: 1, heroDistance: '+=300%', sectionDistance: '+=280%' }
```

### Mandatory Animation Patterns
1. Every animated section uses `useGSAP` with `scope: ref` and `dependencies` array
2. ScrollTrigger pinning uses `anticipatePin: 1` for Lenis compatibility
3. `scheduleScrollRefresh()` called after every animation setup with pinning
4. Mobile/reduced motion guards checked at top of every `useGSAP` callback
5. All timelines/triggers killed in cleanup function
6. SplitText always reverted in cleanup to restore DOM
7. Use `gsap.to()` over `.from()` on pinned sections to prevent position bugs

---

## 7. Layout Components

### Root Layout (`app/layout.tsx`)
- Server component — imports Google Fonts (Lato, Playfair Display) via `<link>`
- Wraps children in: `SmoothScrollProvider > NavBar > {children} > Footer`

### NavBar
- Fixed `top-0`, `z-[9999999]`
- Show/hide on scroll direction
- Hidden during BrandIntro animation
- Listens for `introComplete` custom event
- Hamburger → X with CSS transforms

### FullscreenMenu
- React Portal to `document.body`
- Circular clip-path expansion from hamburger position
- Left 45%: nav links, Right 55%: image preview
- Sub-navigation with hover crossfade

### Footer
- 4-column grid, brand info, contact, showroom addresses, newsletter

### SmoothScrollProvider
- Lenis `duration: 1.2`, `touchMultiplier: 2`
- GSAP ticker drives Lenis RAF
- Provides `LenisContext` for programmatic `scrollTo()`

---

## 8. Custom Hooks

### `useBreakpoint()`
- `isMobile` (<768px), `isTablet` (768-1024px), `isDesktop` (≥1024px)
- `isReady` = false during SSR → prevents hydration mismatches
- Uses `useSyncExternalStore`

### `useReducedMotion()`
- Returns `true` if `prefers-reduced-motion: reduce`
- Components skip animations or render static fallbacks

---

## 9. Blog System (lib/blogData.ts)

- `BlogPost` interface: id, slug, category, date, title, excerpt, image, readTime, content (HTML string)
- 4 regular posts + 1 featured post
- Categories: Smart Living, Hospitality, Home Automation, Lighting Design, Architectural Technology
- Blog detail page: `/blog/[slug]` with hero, content, sidebar, related articles

---

## 10. Key Component Patterns & Conventions

### Naming Conventions
- Section files: PascalCase (e.g., `HeroSection.tsx`)
- CSS animation classes: kebab-case with component prefix (e.g., `fp-image`, `cs-header-el`)
- Data constants: UPPER_SNAKE_CASE (e.g., `PANELS`, `SERVICES`)
- Refs: camelCase with `Ref` suffix

### Component Patterns
- Scoped CSS classes with component prefixes to avoid cross-component GSAP conflicts
- Single DOM tree — use CSS `block`/`hidden` for responsive, not conditional JSX (prevents GSAP scope crashes)
- Portal rendering for overlays (FullscreenMenu)

### Event System
| Event | Dispatcher | Listeners |
|---|---|---|
| `introComplete` | BrandIntro | HeroSection, NavBar |
| `brandIntroPlayed` (session) | BrandIntro | BrandIntro (skip check) |
| `brandIntroFinished` (session) | BrandIntro, NavBar | NavBar (show immediately) |

### Performance
- Canvas DPR capped at 2x
- Frame images loaded sequentially with 10ms delay
- `will-change` via `.motion-layer` on active animations only
- `transform-gpu` for GPU compositing
- Debounced resize (100ms) for canvas
- ScrollTrigger refresh debounced after fonts load

---

## 11. Shared Components Used Across Pages

| Component | Used In |
|---|---|
| `BrandTicker` | Home, Residential, Commercial |
| `ResidentialTrust` | Residential, Experience Center |
| `ResidentialCTA` | Residential, Experience Center |
| `ConsultationForm` | Projects, Blog |
| `NewsletterSignup` | Projects, Blog |
| `testimonial-v2.tsx` | Home TestimonialsSection |
| `testimonial.tsx` | Various testimonial sections |

---

## 12. Known Issues & Gotchas

1. **Double Footer:** Footer is in root layout AND some page components — may render twice on certain pages
2. **Static Export Limitation:** No server-side APIs in production (output: "export"); API routes only work in dev
3. **Unsplash Dependency:** Some sections still use Unsplash URLs — need local images for offline/production
4. **GSAP `.from()` Bug:** Use `.to()` on pinned sections to prevent position calculation bugs
5. **Tailwind `transition-all` on GSAP elements:** Avoid — conflicts with GSAP-controlled transforms
6. **HeroSection.backup.tsx:** Old backup file exists alongside active HeroSection.tsx

---

## 13. Button Component Variants (ui/button.tsx)

| Variant | Purpose |
|---|---|
| `accent` | **Primary CTA** — `bg-accent text-white` (crimson) |
| `glass` | Frosted glass — `bg-white/10 border-white/20 backdrop-blur-md` |
| `ghost` | Transparent hover |
| `outline` | Border only |
| `default` | Standard |

| Shape | Radius |
|---|---|
| `full` | `rounded-full` (pill buttons) |
| `default` | `rounded-lg` |
| `square` | `rounded-none` |

---

## 14. AI Assistant Rules

When modifying this project:
1. Always check `isReady` and `prefersReducedMotion` before adding animations
2. Use centralized animation tokens from `animation.config.ts`
3. Scope all GSAP queries to the component's ref
4. Call `scheduleScrollRefresh()` after any ScrollTrigger pinning setup
5. Follow typography rules: `font-light tracking-wide leading-[1.2]` for headings
6. Use `font-mono tracking-[0.3em] uppercase` for eyebrow labels
7. Never use `font-display` or `tracking-tight` on headings
8. Use Tailwind CSS vars for theming, not hardcoded hex
9. Check the Next.js docs at `node_modules/next/dist/docs/` for API changes (v16)
