# AT Smart Living — Design System Rules

> **Status:** Enforced  
> **Scope:** Every page, section, and component across the entire website  
> **Source of Truth:** The Home (`/`) page is the baseline. All other pages MUST match its visual language exactly.

---

## 1. Typography

### Font Stack

| Role | Font | Fallback | CSS Variable |
|---|---|---|---|
| **Headings** | Playfair Display | serif | `--font-display` |
| **Body** | Lato | sans-serif | `--font-sans` |

> **⛔ JetBrains Mono has been removed.** Do NOT use `font-mono` anywhere.

### Heading Rules (STRICT)

All headings (`h1`–`h6`) MUST use:

```
font-light leading-[1.2] tracking-wide
```

Responsive sizing:

```
text-3xl md:text-4xl lg:text-5xl
```

**NEVER use on headings:**
- `font-bold`, `font-semibold`, `font-black`, `font-medium`
- `font-display` (this was the old convention — removed)
- `tracking-tight` (destroys the editorial feel)
- Default browser heading weights

### Eyebrow / Section Labels

Small descriptive labels above headings (e.g., "Client Stories", "The Audience"):

```
tracking-widest text-sm md:text-base
```

Color guidelines:
- Default: `text-accent`
- Alternatively (if accent is too strong): `text-muted` on light backgrounds, `text-white/50` on dark backgrounds.

**NEVER use:**
- `font-bold` on eyebrow labels
- `tracking-[0.2em]` (too tight — use `0.3em`)
- `font-mono` (removed from the project)

### Body Text

```
font-light text-sm sm:text-base md:text-lg leading-relaxed
```

Color: `text-muted` on light backgrounds, `text-white/70` on dark.

---

## 2. Color System

### Organic Editorial Theme (Default)

| Token | Value | Usage | Tailwind Class |
|---|---|---|---|
| Background | `#F1EBD9` | Page background (Beige) | `bg-background` |
| Foreground | `#0a0a0a` | Primary text (Pure Black) | `text-foreground` |
| Secondary | `#3B4434` | Dark section backgrounds | `bg-secondary` |
| Accent | `#8c1817` | CTAs, links, brand | `text-accent`, `bg-accent` |
| Accent Soft | `#E56B55` | Hover states (Coral Red) | `text-accent-soft` |
| Muted | `#5F6856` | Secondary text | `text-muted` |
| Panel | `#FFFFFF` | Card surfaces | `bg-panel` |
| Border | `rgba(0,0,0,0.08)` | Subtle borders | `border-border` |
| Glass | `rgba(255,255,255,0.7)` | Glassmorphism | `bg-glass` |

### Dark Sections

For sections with dark backgrounds (`bg-[#040404]`, `bg-black`):

| Hierarchy | Class |
|---|---|
| Primary text | `text-white` |
| Secondary text | `text-white/70` |
| Tertiary/muted | `text-white/50` |
| Subtle labels | `text-white/30` |

### Strict Rules

- ✅ **USE** Tailwind CSS variables: `bg-background`, `text-foreground`, `text-muted-foreground`, `bg-card`
- ⛔ **NEVER** hardcode hex values inline where a CSS variable exists
- ⛔ **NEVER** use generic grays like `text-gray-500` — use `text-muted` or `text-white/50`
- ⛔ **NEVER** use `bg-white` for page backgrounds — use `bg-background` (`#F1EBD9`)

---

## 3. Spacing & Layout

### Section Padding

```
py-20 sm:py-28 md:py-32 lg:py-48
px-5 sm:px-8 md:px-16 lg:px-24
```

### Content Max Width

```
max-w-7xl mx-auto
```

For ultra-wide screens (2xl+):
```css
.section-container { max-width: 1440px; margin: auto; }
```

### Generous Whitespace

- Sections: `py-24 md:py-40` minimum
- Between elements: Use `gap-6` to `gap-16` — never cramped
- The design should breathe — whitespace is a feature, not waste

---

## 4. Visual Treatments

### Rounded Corners

| Context | Radius |
|---|---|
| Cards, panels | `rounded-2xl` |
| Hero containers | `rounded-[40px]` |
| CTA buttons | `rounded-full` |
| Standard buttons | `rounded-lg` |

### Shadows

- Light: `shadow-sm`
- Cards: `shadow-lg shadow-black/5`
- Hover: `shadow-2xl`
- ⛔ NEVER use heavy shadows like `shadow-xl` on light backgrounds

### Noise Texture Overlays

SVG fractalNoise for tactile, premium feel:

```
opacity-[0.015]   — standard sections
opacity-[0.03]    — dark sections (slightly more visible)
```

### Gradient Overlays (on images)

For text readability over images:

```
bg-gradient-to-t from-black/80 via-black/30 to-transparent
```

### Glassmorphism

```
bg-white/10 border border-white/20 backdrop-blur-md
```

Used for the `glass` button variant and overlay panels.

---

## 5. Buttons & CTAs

The project uses a reusable `Button` component built with `class-variance-authority` (located in `components/ui/button.tsx`). All buttons across the site **must** follow the pattern established in the Hero section.

### Standard Button Usage

```tsx
import { Button } from "@/components/ui/button";

// Primary Button
<Button variant="accent" size="lg" shape="full">
  Book a Consultation
</Button>

// Secondary Button (Dark Backgrounds)
<Button variant="glass" size="lg" shape="full">
  Explore Projects
</Button>

// Secondary Button (Light Backgrounds)
<Button variant="outline" size="lg" shape="full">
  Learn More
</Button>
```

### Button API Rules:
- **`variant`**: 
  - `accent`: Primary action (Deep Crimson background, white text).
  - `glass`: Secondary action on dark/image backgrounds (translucent white, white text).
  - `outline`: Secondary action on light backgrounds.
- **`size`**: Always use `size="lg"` for main call-to-actions to ensure a premium, clickable feel.
- **`shape`**: Always use `shape="full"` (fully rounded corners) to match the Hero section pattern.

---

## 6. Complex Data Presentation

When presenting dense technical data or feature lists (especially in B2B/Commercial contexts), NEVER use long, overwhelming vertical lists. Use the following patterns:

### Headless Accordions
- Use for grouping deep technical specifications or operational benefits under major headings.
- Must be "headless" (minimalist styling): Use a simple border-bottom, light font weights, and an elegant plus/minus icon toggle (`lucide-react`).

### Tabbed Bento Grids
- Use for mapping multi-category capabilities across a system.
- **Master Tabs**: Pill-shaped floating tabs at the top (`bg-white` active state).
- **Bento Grid**: Asymmetric CSS grids (`grid-cols-1 md:grid-cols-2 lg:grid-cols-X`) filled with glassmorphic cards (`bg-white` on off-white backgrounds).
- **Hover Effects**: Subtle gradient background glows (`bg-gradient-to-br from-accent/5 to-transparent`) and icon scaling.

---

## 7. Animation Rules

### Required Setup

Every animated component MUST:

1. Use `useGSAP` with `scope: sectionRef` and `dependencies` array
2. Check `isReady` (from `useBreakpoint`) before animating
3. Check `prefersReducedMotion` (from `useReducedMotion`) — skip or provide static fallback
4. Call `scheduleScrollRefresh()` after any ScrollTrigger setup
5. Kill all timelines and ScrollTriggers in the cleanup function
6. Revert any SplitText instances in cleanup

### Animation Tokens (ALWAYS use these — never hardcode)

```typescript
// lib/animation.config.ts
EASE.standard    // 'power2.out'     — General transitions
EASE.reveal      // 'power3.out'     — Content reveals
EASE.premium     // 'expo.out'       — High-end entrances
EASE.smooth      // 'power2.inOut'   — Bidirectional
EASE.none        // 'none'           — Linear (parallax, scrub)

DURATION.fast     // 0.4
DURATION.medium   // 0.6
DURATION.normal   // 0.8
DURATION.reveal   // 0.9
DURATION.slow     // 1.2

STAGGER.tight     // 0.05
STAGGER.reveal    // 0.08
STAGGER.normal    // 0.1
STAGGER.wide      // 0.15

SCROLL.scrub      // 0.8
SCROLL.anticipatePin  // 1
```

### ScrollTrigger Pinning

```typescript
scrollTrigger: {
  trigger: sectionRef.current,
  start: 'top top',
  end: '+=300%',        // or appropriate distance
  pin: true,
  scrub: SCROLL.scrub,
  anticipatePin: SCROLL.anticipatePin,  // REQUIRED for Lenis compatibility
  invalidateOnRefresh: true,
}
```

### Critical Animation Rules

- ✅ Use `gsap.to()` on pinned sections — **NEVER** `gsap.from()` (causes position bugs)
- ✅ Scope all GSAP queries to the component ref: `gsap.utils.toArray('.class', sectionRef.current)`
- ✅ Prefix animation target classes with component abbreviation (e.g., `fp-image`, `cs-header-el`)
- ⛔ **NEVER** use Tailwind `transition-all` on elements controlled by GSAP (causes conflicts)
- ⛔ **NEVER** use conditional JSX for mobile/desktop — use CSS `block`/`hidden` (prevents GSAP scope crashes)

---

## 8. Component Patterns

### Responsive Rendering

```tsx
// ✅ CORRECT — single DOM tree, CSS visibility
<div className="hidden md:block">  {/* Desktop */}
<div className="block md:hidden">  {/* Mobile */}

// ⛔ WRONG — conditional JSX
{isMobile ? <MobileVersion /> : <DesktopVersion />}
```

Exception: Entirely different render paths (like HeroSection's static mobile fallback) are acceptable when they return early before the animated render.

### Button Usage

| Context | Variant + Shape |
|---|---|
| Primary CTA | `variant="accent" shape="full"` |
| Secondary CTA | `variant="glass" shape="full"` |
| Ghost action | `variant="ghost"` |
| Outlined | `variant="outline"` |

### Naming Conventions

| What | Convention | Example |
|---|---|---|
| Section files | PascalCase | `HeroSection.tsx` |
| CSS animation classes | kebab-case + prefix | `fp-image`, `cs-header-el` |
| Data constants | UPPER_SNAKE_CASE | `STATS`, `SERVICES` |
| Refs | camelCase + `Ref` | `sectionRef`, `canvasRef` |

---

## 9. Accessibility

### Required

- `useReducedMotion()` checked in every animated component
- `aria-hidden="true"` on decorative elements (noise overlays, loading animations)
- Unique, descriptive `id` attributes on interactive elements
- Minimum `44px × 44px` touch targets on coarse pointer devices (handled globally in CSS)
- Focus-visible outlines: `2px solid rgba(0,0,0,0.6)` with `2px` offset

### Reduced Motion

When `prefersReducedMotion === true`:
- Skip all GSAP animations
- Render static layout fallback
- Disable parallax and scrub effects
- Disable Lenis smooth scroll

---

## 10. Performance

### GPU Acceleration

- `.motion-layer` class: `will-change: transform, opacity` — only on actively animated elements
- `transform-gpu` class for forcing GPU compositing
- Remove `will-change` after animation completes when possible

### Canvas

- DPR capped at **1.5x** (prevents massive 4K/Retina renders)
- Debounced resize handler (100ms)

### Images

- Frame sequences: loaded sequentially with 5–10ms delays (non-blocking)
- Use `<NextImage>` with `priority` for above-fold images
- All images unoptimized (required for static export)

### ScrollTrigger

- `scheduleScrollRefresh()` — debounced, called after every animation setup
- Scrub values: `0.8` to `2.0` range for smooth interpolation

---

## 11. Dark Section Pattern

For sections with dark backgrounds:

```tsx
<section className="relative bg-secondary text-white overflow-hidden">
  {/* Ambient glow overlays */}
  <div className="absolute ..." style={{ background: 'radial-gradient(...)' }} />
  
  {/* Noise texture */}
  <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none">
    <filter id="noise"><feTurbulence type="fractalNoise" ... /></filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>

  {/* Content */}
  <div className="relative z-10">
    <span className="tracking-[0.3em] uppercase text-white/50">Label</span>
    <h2 className="font-light tracking-wide leading-[1.2] text-white">Heading</h2>
    <p className="text-white/70 font-light">Body text</p>
  </div>
</section>
```

---

## 12. Anti-Patterns (NEVER DO THESE)

| ⛔ Anti-Pattern | ✅ Correct Approach |
|---|---|
| `font-bold` on headings | `font-light` |
| `tracking-tight` | `tracking-wide` |
| `font-mono` | Remove — use inherited `font-sans` |
| `font-display` class | Let CSS `h1–h6` rule handle Playfair |
| `bg-white` for page bg | `bg-background` |
| `text-gray-500` | `text-muted` or `text-muted-foreground` |
| Hardcoded hex colors | Tailwind CSS variable classes |
| `gsap.from()` on pinned sections | `gsap.to()` |
| `transition-all` on GSAP elements | Remove Tailwind transitions |
| Conditional JSX for responsive | CSS `block`/`hidden` |
| Heavy shadows on light bg | `shadow-sm` or `shadow-lg shadow-black/5` |
| `font-mono` for labels | `tracking-[0.3em] uppercase` (inherits Lato) |

---

> **For AI Assistants:** Before making ANY visual change, cross-reference this document. If a change violates any rule listed here, do not proceed without explicit user approval.
