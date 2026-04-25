# HeroSectionPlan
**AT — Intelligent Automation for Luxury Living & Smart Spaces**
*Hero Section · GSAP ScrollTrigger Implementation Blueprint*

---

## 1. Objective

The hero section is the brand's first impression — it must establish authority, premium quality, and cinematic depth within the first three seconds of page load.

The goal is to create a **scroll-driven narrative experience** where the user doesn't just see a video and a headline — they feel like they are stepping *into* the brand's world. As the visitor begins scrolling, the video responds, text builds up with deliberate pacing, and the entire viewport becomes a living, breathing stage.

The intended emotional response: *"This brand is serious, refined, and worth my attention."*

This section should:
- Signal luxury automation through visual restraint and purposeful motion
- Anchor the brand promise ("Intelligent Automation for Luxury Living") in the user's mind before they read another word
- Create enough intrigue that the user continues scrolling into the next section

---

## 2. Visual Structure

### Layout Overview

The hero is a **full-viewport pinned section** (`100vw × 100vh`) with a layered stack of elements from back to front:

```
[Layer 1] — Video (background, full-bleed, scroll-controlled)
[Layer 2] — Dark gradient overlay (bottom-heavy, for text legibility)
[Layer 3] — Spotlight / cursor effect (optional, desktop only)
[Layer 4] — Text content (center-left aligned)
[Layer 5] — Navigation (top, transparent, floating)
[Layer 6] — CTA block (lower-left, above fold)
[Layer 7] — Scroll indicator / marquee strip (bottom edge)
```

### Video Container

- Fills `100vw × 100vh`, `position: absolute`, `object-fit: cover`
- Clipped with `overflow: hidden` on the wrapper
- Initial state: slightly scaled up (`scale: 1.08`) — pulls back to `1.0` as scroll begins, creating a subtle zoom-out reveal

### Text Content

- Positioned `absolute` bottom-left area, with generous padding (`48px–64px` from left, `20% from bottom` on desktop)
- H1 rendered as a GSAP SplitText target — each **word** is wrapped and animated individually
- Subheading sits directly below the H1, offset `8px` gap
- Both text blocks receive a soft upward drift on initial load

### Overlays

Two gradient layers:

1. **Base overlay**: `rgba(10, 10, 15, 0.4)` — always present, ensures minimum readability
2. **Reveal overlay**: A radial spotlight centered on the cursor (desktop only) that shows a brighter circle of the video — fades in after 1.5s

### Navigation Relationship

- Nav floats above the hero at `position: fixed`, transparent background on scroll position 0
- Nav background transitions to `rgba(10,10,15,0.85)` with `backdrop-filter: blur(12px)` when user scrolls past the hero
- Hero content sits below the nav's z-index but the video and overlay span the full screen including behind the nav

### CTA Placement

- Primary CTA: Gold-filled button, lower-left, fades in after text reveal is complete
- Secondary CTA: Text link with an animated right-arrow, sits below the primary button
- Both CTAs share one `div.cta-group` wrapper for coordinated entrance

### Spacing & Composition

- Text block occupies no more than 55% of viewport width on desktop
- Generous vertical breathing room: `~120px` between nav bottom and H1 top
- CTA group sits in the lower-left quadrant, never crowding the video's central focal point

---

## 3. Scroll Animation Concept

### Initial State (Before Scroll)

On page load, everything is invisible. A coordinated entrance sequence fires after the video has loaded (or after a 400ms fallback timeout):

1. Video fades in (opacity 0 → 1, 600ms)
2. Dark overlay settles in (300ms, eased)
3. H1 words slide up and fade in with stagger
4. Subheading fades in
5. CTAs scale in with spring easing

### Video Reveal Behavior

The video uses **scroll-synced playback**: `video.currentTime` is mapped directly to scroll position within the pinned section. As the user scrolls down through the hero's scroll length, the video plays frame-by-frame — not in real-time playback.

This means the video content is *authored for scroll* — at scroll start, the space is in "day" mode; at scroll end, it transitions to a lit evening smart-home ambience.

### Scale / Parallax / Pinning

- The hero wrapper is **pinned** using GSAP ScrollTrigger `pin: true`
- The pin lasts for a scroll duration of `200vh` (2x viewport height) so the video narrative has room to breathe
- The video container has a `scale` that goes from `1.08 → 1.0` over the first 30% of the pinned scroll, giving a subtle "opening" feel
- Text block has a mild `y` parallax: as user nears the end of the pin, text drifts upward slightly and fades out, preparing for the next section

### Text Animation Timing

| Element | Trigger | Duration |
|---|---|---|
| H1 word reveal | Page load (auto, 0.4s delay) | 600ms total, 40ms stagger |
| Subheading | After H1 completes | 400ms fade + drift |
| CTA group | 1.2s after page load | 300ms scale-in, spring easing |
| Text fade-out | Last 20% of pin scroll | 400ms fade, upward drift |

### Transition into Next Section

As the pinned scroll nears its end:

1. Text and CTAs fade out and drift upward
2. Video opacity reduces to 0.3
3. A dark curtain from below rises to cover the hero (via a `div` that translates from `translateY(100%)` to `translateY(0)`)
4. The pin releases, and the next section scrolls into view from beneath

This gives the illusion that the next section *emerges from under* the hero rather than the hero simply scrolling away.

---

## 4. Video Behavior

### Playback Mode

- **Scroll-synced**: `video.currentTime` is set programmatically via GSAP ScrollTrigger's `onUpdate` callback
- The video does **not** autoplay in real-time — it is paused and scrubbed via scroll
- `video.pause()` is called immediately after load

### Attributes

```html
<video
  muted
  playsinline
  preload="auto"
  loop={false}
  poster="/hero-poster.jpg"
/>
```

- `muted` is mandatory for browser autoplay policies
- `loop` is `false` — playback direction is purely scroll-controlled
- `playsinline` ensures full-screen doesn't hijack on iOS

### Fallback / Poster Strategy

- A high-quality `poster` image (`/hero-poster.jpg`) is always defined — displays while video loads
- The poster is a WebP still from the video's mid-point (the most visually rich frame)
- If `video.readyState < 2` after 2s, the poster remains and scroll-sync is disabled gracefully

### Loading Strategy

- Video is loaded with `preload="auto"` on desktop
- On mobile (detected via `window.innerWidth < 768`), the video element is **replaced by the poster image** entirely — no video is loaded
- Use Next.js dynamic imports or a client-side check (`useEffect`) to conditionally render the video

### Performance Optimization

- Video format: serve `H.264 MP4` as primary, with `WebM/VP9` as a `<source>` fallback
- Keep video duration ≤ 10 seconds for the scroll sequence
- Compress to ≤ 5MB at 1080p — use Handbrake/FFmpeg with CRF 23
- Host on CDN with proper `Content-Range` header support for partial loading

---

## 5. Motion Design Notes

### Style Vocabulary

The motion should feel **cinematic and editorial** — like watching an Apple product launch or a luxury hotel opening sequence. Motion is *purposeful*, not decorative.

**Avoid:**
- Bouncy spring physics on text
- Fast aggressive snap transitions
- Multiple elements animating simultaneously without hierarchy

**Embrace:**
- Staggered sequences that feel like a conductor bringing in instruments one by one
- Slow, confident eases with proper deceleration
- Moments of stillness between animations — let elements breathe

### Easing Reference

| Usage | Easing |
|---|---|
| Text word reveals | `power2.out` |
| Section entry / exit | `power3.inOut` |
| CTA button entrance | `back.out(1.2)` (subtle spring) |
| Scroll-synced video | `none` (raw scrub, `scrub: 1`) |
| Curtain wipe transition | `power4.inOut` |
| Hover states | `power1.out`, 150–200ms |

### Pacing

- **Load sequence total**: ~1.8 seconds from first visible frame to full hero rendered
- **Scroll narrative**: 200vh of scroll should feel unhurried — neither too fast nor requiring excessive scrolling
- Use GSAP's `scrub: 1.5` for a slight lag/smoothing on scroll-driven properties — this is the secret to "cinematic" feel

---

## 6. Interaction Notes

### Scroll

- The entire hero section is driven by vertical scroll
- No horizontal scroll in the hero
- Smooth scroll is recommended (use Lenis or native CSS `scroll-behavior: smooth` + GSAP Scroller)

### Cursor / Spotlight Effect (Desktop Only)

A soft radial "spotlight" follows the mouse cursor across the hero:

- `radial-gradient` centered on mouse position, ~400px radius
- Slightly brighter than the surrounding overlay, reveals the video underneath more clearly
- Updates via `mousemove` → `requestAnimationFrame` for performance
- Opacity: `0` initially, transitions to `0.6` after 1.5s
- Disabled on touch devices

### Hover States

- **Primary CTA**: Subtle gold glow pulse (`box-shadow` expands) at 150ms ease-out. Background shifts from solid gold to slightly lighter on hover.
- **Secondary CTA arrow**: Arrow icon translates `+6px` right on hover, returns on leave, 200ms ease-in-out
- **Nav items**: Underline draws in left-to-right on hover, 200ms

### CTA Behavior

- Primary button click: smooth scroll to the consultation form section (or triggers a modal)
- Secondary "Explore Our Projects" link: navigates to the projects page with a page-exit animation (fade out via Framer Motion)

---

## 7. Responsive Strategy

### Desktop (≥ 1024px)

- Full scroll-synced video experience
- Spotlight cursor effect enabled
- Text: large display type, left-aligned, occupying ~50% width
- Pin duration: `200vh`

### Tablet (768px – 1023px)

- Video still present but scroll-sync is simplified: video fades in on load and plays at a slow real-time loop rather than scroll-scrubbing
- Spotlight cursor effect disabled
- Text: slightly smaller scale, still left-aligned
- Pin duration reduced to `150vh`
- Ensure touch scrolling doesn't conflict with pinned section — test on real devices (iOS Safari + Chrome Android)

### Mobile (< 768px)

- **No video** — replaced by the poster image (WebP, full-bleed)
- Poster has a parallax scroll effect via `background-attachment: fixed` or a simple GSAP `y` transform for iOS compatibility
- Text: center-aligned, full-width with horizontal padding
- Pin: **disabled** — section scrolls normally
- H1 font size: `clamp(2rem, 8vw, 3.5rem)` for fluid scaling
- CTA buttons: full-width, stacked vertically
- Scroll indicator replaces marquee strip
- Load-in animations still play on mount — simplified to opacity-only (no y-drift) for performance

---

## 8. Technical Plan

### Component Structure

```
<HeroSection>               ← Outer wrapper, ref target for ScrollTrigger
  <VideoBackground>         ← <video> or <img> (poster), ref for currentTime
  <Overlay>                 ← Dark gradient layer(s)
  <SpotlightLayer>          ← Canvas or div tracking cursor (desktop only)
  <HeroContent>             ← Absolute positioned text block
    <HeroHeadline>          ← H1, GSAP SplitText target
    <HeroSubheading>        ← Paragraph, fade target
    <HeroCTAGroup>          ← Button group
  </HeroContent>
  <MarqueeStrip>            ← Bottom edge scrolling text
  <ScrollCurtain>           ← Wipe-in div for section exit
</HeroSection>
```

### Animation Trigger Logic

```javascript
// 1. Load-in sequence (fires once on mount)
const tl = gsap.timeline({ delay: 0.4 });
tl.to(videoRef.current, { opacity: 1, duration: 0.6 })
  .from(splitWords, { opacity: 0, y: 30, stagger: 0.04, duration: 0.6, ease: 'power2.out' }, '-=0.2')
  .from(subheadRef.current, { opacity: 0, y: 20, duration: 0.4, ease: 'power2.out' }, '-=0.3')
  .from(ctaRef.current, { opacity: 0, scale: 0.94, duration: 0.4, ease: 'back.out(1.2)' }, '-=0.1');

// 2. Scroll-sync: pin + video scrub
ScrollTrigger.create({
  trigger: heroRef.current,
  start: 'top top',
  end: '+=200%',
  pin: true,
  scrub: 1.5,
  onUpdate: (self) => {
    if (videoRef.current) {
      videoRef.current.currentTime = self.progress * videoDuration;
    }
  }
});

// 3. Video scale animation (opens up on first 30% of scroll)
gsap.fromTo(videoRef.current,
  { scale: 1.08 },
  { scale: 1.0, ease: 'none',
    scrollTrigger: { trigger: heroRef.current, start: 'top top', end: '30% top', scrub: 1.5 }
  }
);

// 4. Text fade-out (last 20% of pin)
gsap.to(contentRef.current, {
  opacity: 0, y: -40, ease: 'power2.in',
  scrollTrigger: { trigger: heroRef.current, start: '80% top', end: '100% top', scrub: true }
});

// 5. Exit curtain wipe
gsap.fromTo(curtainRef.current,
  { yPercent: 100 },
  { yPercent: 0, ease: 'power4.inOut',
    scrollTrigger: { trigger: heroRef.current, start: '90% top', end: '100% top', scrub: true }
  }
);
```

### Pinning Logic

- Use `ScrollTrigger.create` with `pin: true` and `end: '+=200%'` (200vh extra scroll before unpin)
- `anticipatePin: 1` to prevent pin jump on fast scroll
- `invalidateOnRefresh: true` to handle viewport resize correctly

### SplitText Setup

```javascript
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText, ScrollTrigger);

const split = new SplitText(h1Ref.current, { type: 'words' });
// split.words → array of word elements, animate these
```

### Optimization Notes

- Wrap all GSAP animations in `useLayoutEffect` (not `useEffect`) for correct initial render
- Call `ScrollTrigger.refresh()` after any layout change or font loading
- Store all ScrollTrigger instances in an array and call `.kill()` on component unmount
- Use `will-change: transform` on the video container sparingly — only while scroll is active

---

## 9. Accessibility and Performance

### Reduced Motion

All GSAP animations should be gated:

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  // All GSAP animations here
} else {
  // Instant reveal fallback: just set opacity: 1 on all elements
  gsap.set([h1Ref.current, subheadRef.current, ctaRef.current], { opacity: 1 });
}
```

Video scroll-sync is also disabled in this case — video plays as a looping ambient background at reduced opacity instead.

### Text Readability Over Video

- Minimum contrast ratio of 4.5:1 for all text against the overlay (WCAG AA)
- The gradient overlay is **always on**, regardless of scroll position — it is not animated away
- H1 uses `text-shadow: 0 2px 20px rgba(0,0,0,0.6)` as a secondary readability layer
- Never animate the overlay to full transparency — keep minimum opacity at `0.35`

### Video Loading

- `preload="auto"` on desktop, but conditionally add `<link rel="preload" as="video">` in the `<head>` for the MP4 source
- Listen to `video.canplaythrough` before starting scroll sync; show the poster until this fires
- On slow connections (detected via `navigator.connection.effectiveType === '2g'`), skip the video entirely and use the poster

### Mobile Performance

- No video on mobile avoids a significant performance penalty
- Limit parallax transforms to `transform: translateY()` only — avoid `top/left` which trigger layout
- The `SpotlightLayer` is removed from the DOM on mobile via conditional rendering, not just hidden via CSS
- Use `passive: true` on all scroll event listeners

---

## 10. Development Checklist

### Setup
- [ ] Register GSAP plugins: `ScrollTrigger`, `SplitText`, `Draggable`
- [ ] Integrate Lenis smooth scroll and connect to GSAP ticker
- [ ] Set up `prefers-reduced-motion` media query check at app level

### Video
- [ ] Prepare two video files: `hero.mp4` (H.264) and `hero.webm` (VP9)
- [ ] Compress to ≤ 5MB, 1080p, CRF 23
- [ ] Export a WebP poster from the video's most compelling frame
- [ ] Test `video.readyState` fallback logic
- [ ] Disable video on `window.innerWidth < 768`

### Animations
- [ ] H1 SplitText word reveal with 40ms stagger
- [ ] Subheading and CTA load-in sequence
- [ ] Video scroll-sync (`currentTime` mapped to scroll progress)
- [ ] Video scale `1.08 → 1.0` on first 30% of scroll
- [ ] Text fade-out on last 20% of pin
- [ ] Exit curtain wipe

### Interactions
- [ ] Spotlight cursor effect (desktop, `mousemove` → `requestAnimationFrame`)
- [ ] Primary CTA hover glow
- [ ] Secondary CTA arrow slide
- [ ] Nav background scroll transition

### Responsive
- [ ] Mobile: poster-only, no video, no pin
- [ ] Tablet: real-time looping video, simplified animations
- [ ] Text: `clamp()` fluid sizing at all breakpoints
- [ ] CTA: stacked full-width on mobile

### Accessibility & Performance
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Text contrast ≥ 4.5:1 against overlay
- [ ] `aria-hidden="true"` on decorative video element
- [ ] `video` has `muted`, `playsinline`, `poster`
- [ ] ScrollTrigger instances killed on component unmount
- [ ] Tested on: Chrome, Safari, Firefox, Edge
- [ ] Tested on: iPhone Safari, Chrome Android
- [ ] CLS < 0.1 verified with Lighthouse
- [ ] LCP ≤ 2.5s (poster image is the LCP candidate — optimize it)

---

## 11. Suggested File Structure

```
/components
  /hero
    HeroSection.tsx          ← Main section component, owns all refs + GSAP logic
    VideoBackground.tsx      ← <video> or <img> fallback, exposes videoRef
    HeroContent.tsx          ← Text + CTA block
    HeroHeadline.tsx         ← H1 with SplitText setup
    HeroCTA.tsx              ← Button group with hover animations
    SpotlightLayer.tsx       ← Cursor radial effect (desktop only)
    MarqueeStrip.tsx         ← Bottom running text
    ScrollCurtain.tsx        ← Exit wipe overlay div
    useHeroAnimations.ts     ← Custom hook: all GSAP timelines + ScrollTriggers
    useVideoScrub.ts         ← Custom hook: video scroll-sync logic

/hooks
  useReducedMotion.ts        ← Media query hook for prefers-reduced-motion

/public
  /video
    hero.mp4
    hero.webm
    hero-poster.webp
```

### Notes on Separation of Concerns

- All GSAP logic lives in `useHeroAnimations.ts` — the component files stay clean JSX
- `useVideoScrub.ts` handles `video.currentTime` updates independently so it can be toggled on/off without touching animation logic
- `SpotlightLayer` is only imported and rendered when `!isMobile` — not just hidden via CSS
- Each animation hook returns a cleanup function that kills all ScrollTrigger instances on unmount

---

*Prepared for AT — Intelligent Automation for Luxury Living & Smart Spaces*
*Hero Section Implementation Blueprint · GSAP + ScrollTrigger + Next.js*
