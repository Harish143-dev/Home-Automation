# 🐞 Frontend Audit Report

Audit date: 2026-04-25  
Project: `smarthome-os`  
Stack reviewed: React, TypeScript, Tailwind CSS, Next.js 16.2.3, GSAP, ScrollTrigger, Lenis

Evidence reviewed:

- Source files under `app/`, `components/`, `hooks/`, `lib/`, and `styles/`
- Existing screenshots: `audit-screenshots/home-320x900.png`, `home-768x1024.png`, `home-1440x1000.png`
- Live screenshots captured from `next dev`: `audit-screenshots/live-320x900.png`, `live-768x1024.png`, `live-1440x1000.png`
- Commands: `npm.cmd run build`, `npm.cmd run lint`, `npm.cmd audit --audit-level=moderate`

Build status:

- Production build passes when network access is available for `next/font/google`.
- `next start` is not valid because `next.config.ts` uses static export output; serve `out/` or use `next dev` for local rendering.
- Lint currently fails.

## 🔴 Critical Issues

* [ ] Mobile hero headline is clipped at 320px.
Impact: On `audit-screenshots/home-320x900.png`, the hero text cuts off at "for Luxury Livi". This is a first-viewport brand failure on the smallest supported width.
Suggested Fix: In `components/hero/HeroSection.tsx`, line 275 uses `text-[2.5rem]` inside a content block that also has nested horizontal padding. Reduce the mobile headline to `text-[2.2rem]`, add `max-w-full`, remove the extra inner `px-6` at line 274, and use `text-wrap: balance` or `break-words` on the heading.

* [ ] Hero frame sequence is too heavy for production.
Impact: `public/frames` contains 120 PNGs totaling 135.91 MB, averaging 1.13 MB each. Desktop users can trigger a very large image decode/download path for one scroll animation, causing memory pressure, slow initial interaction, jank, and poor mobile fallback risk.
Suggested Fix: Replace the PNG sequence with AVIF/WebP frames at lower count, a compressed video texture, or a single MP4/WebM controlled by scroll. If keeping frames, use fewer frames, preload only the first interaction window, cache with `createImageBitmap`, and avoid loading all frames immediately after first paint.

* [ ] ScrollTrigger setup order depends on timed delays.
Impact: `HeroSection`, `StatsSection`, `AutomationSpaces`, and `FeaturedProjects` use `setTimeout` or `gsap.delayedCall` to wait for upstream pins. This can still miscalculate start/end values when fonts, remote images, or resized viewport metrics arrive later.
Suggested Fix: Create a single animation bootstrap layer that emits a "layout assets ready" signal, then initializes all ScrollTriggers in deterministic order. Replace scattered `ScrollTrigger.refresh()` calls with one debounced refresh after image/font readiness.

* [ ] Lint is polluted by generated Chrome audit folders and also has real app errors.
Impact: `npm.cmd run lint` reports 1980 problems because `.chrome-audit-profile*` is not ignored, hiding real failures in app code. Real errors remain in `AwardsSection`, `ExperienceCentersSection`, `ProcessSection`, `StatsSection`, `useBreakpoint`, and `useReducedMotion`.
Suggested Fix: Add `.chrome-audit-profile*/**` and `audit-screenshots/**` to `eslint.config.mjs` ignores, then fix the remaining app errors. Keep audit runtime artifacts out of source lint scope.

* [ ] Experience centers globe updates React state every animation frame.
Impact: `components/experience-centers/ExperienceCentersSection.tsx` lines 65-78 calls `setRotation` inside `requestAnimationFrame`, forcing React renders at frame rate. Combined with SVG geography rendering, this can drop FPS badly on laptops and mobile devices.
Suggested Fix: Move globe rotation to GSAP or imperative SVG transforms, throttle state updates, or pause auto-rotation outside viewport. Keep React state for semantic selection only, not continuous animation.

## 🟠 Major Issues

* [ ] Reduced-motion support is incomplete.
Impact: Global CSS shortens CSS animations, but GSAP timelines, Lenis smooth scroll, hero frame scrubbing, pinned sections, globe auto-rotation, and ScrollTrigger scrub animations still run unless individual components opt out. This violates accessibility expectations and can make the site uncomfortable.
Suggested Fix: Centralize `prefers-reduced-motion` in an animation provider. Disable Lenis, pins, frame sequences, scrubbed parallax, auto-rotation, ticker loops, and magnetic mouse effects when reduced motion is active. Render static section states instead.

* [ ] Brand intro blocks the first viewport and clips copy at 320px.
Impact: Live `live-320x900.png` shows the intro subline clipped horizontally. `BrandIntro` also locks `document.body.style.overflow` for the opening timeline, delaying access to content and navigation.
Suggested Fix: Shorten the intro, provide a skip path, make the subline `max-w-[calc(100vw-3rem)]`, reduce mobile letter spacing, and avoid locking scroll for users with reduced motion or repeat visits.

* [ ] Multiple pinned sections create a fragile scroll stack.
Impact: Hero pins for `+=400%`, `AutomationSpaces` uses a 500vh section with `pinSpacing: false`, `ProcessSection` pins horizontal content, and `FeaturedProjects` pins for `PROJECTS.length * 100vh`. This can feel cinematic on desktop but is highly sensitive to refresh timing and produces long scroll debt.
Suggested Fix: Limit each pinned story to a clear narrative duration, avoid `pinSpacing: false` unless the following layout is mathematically reserved, and add viewport-specific caps for tablet/laptop heights.

* [ ] The app uses remote background images instead of optimized Next images.
Impact: Many large Unsplash images are injected with CSS `backgroundImage`, bypassing `next/image` optimization, priority control, decoding hints, responsive `sizes`, placeholders, and lazy loading.
Suggested Fix: Replace key visual backgrounds with `next/image` using `fill`, `sizes`, and remote image config, or download/process production assets into `public/`. Keep CSS backgrounds only for decorative non-content imagery.

* [ ] `ExperienceCentersSection` references missing local assets.
Impact: The `centers` array points to `/images/experience-center-1.png`, but no matching file exists in `public/images`. The field is not rendered today, but it is dead data that will break as soon as image UI is enabled.
Suggested Fix: Add the assets or remove the field until used. Type the data model so unused or missing media is caught.

* [ ] Type safety gaps hide animation bugs.
Impact: `any` appears in `AwardsSection`, `ProcessSection`, and `ExperienceCentersSection`. The geography render props and award card props are untyped, so broken icon/data shapes can slip through.
Suggested Fix: Define `Award`, `Center`, `Step`, and geography render types. Use `Element[]` or `HTMLElement[]` for `gsap.utils.toArray` instead of `any`.

* [ ] Scroll-driven React state can cause unnecessary re-renders.
Impact: `ProcessSection` sets `activeStep` inside a GSAP tween `onUpdate`, potentially calling React state many times per scroll frame.
Suggested Fix: Store the previous active index in a ref and only call `setActiveStep` when the index changes. Prefer class toggles or GSAP state for purely visual scroll progress.

* [ ] Navigation visibility is tied to raw `window.scrollY` while Lenis controls scroll.
Impact: `NavBar` listens to native scroll directly. With Lenis smoothing, nav hide/show can feel out of sync with visual scroll motion.
Suggested Fix: Subscribe nav behavior to the Lenis scroll event or expose a shared scroll direction store from `SmoothScrollProvider`.

## 🟡 Minor Issues

* [ ] Several comments contain mojibake artifacts from box-drawing characters.
Suggested Fix: Replace corrupted comments with plain ASCII comments. This keeps code review and lint output readable.

* [ ] Border radius language is inconsistent.
Suggested Fix: The UI mixes `rounded-full`, `rounded-[40px]`, `rounded-[32px]`, `rounded-[28px]`, and `rounded-[2rem]`. Use a small radius scale by component type: controls, cards, panels, modals.

* [ ] Brand color system is mostly monochrome with sporadic blue.
Suggested Fix: Promote `#0066CC` into the Tailwind theme token system and define deliberate usage rules for CTA, map pins, process progress, and accents.

* [ ] Some imported icons/components are unused.
Suggested Fix: Remove unused `NextImage` from `ExperienceCentersSection` and unused `Settings`/`Wrench` from `WhyChooseUsSection`.

* [ ] Some buttons do not have `type="button"`.
Suggested Fix: Add `type="button"` consistently to non-submit buttons, especially in reusable sections.

* [ ] Desktop-only hover interactions lack equivalent touch behavior.
Suggested Fix: For magnetic awards and accordion panels, ensure tap/click states are explicit and do not rely on hover-only affordances.

# 🎬 GSAP Animation Issues

## Problems Found:

* Hero frame loading starts with the first frame, initializes the pin, then loads the remaining 119 frames using 10ms timers. This creates a race between scroll progress and available frames.
* `HeroSection` uses `SplitText` directly in component code. It is reverted, which is good, but the animation is still coupled tightly to hero rendering.
* `StatsSection`, `AutomationSpaces`, and `FeaturedProjects` use delayed calls to compensate for the async hero pin. This is brittle.
* `AutomationSpaces` animates `left` and `top` on cards. Those properties trigger layout work. The cards should animate `x`, `y`, `xPercent`, `yPercent`, `scale`, and `rotation`.
* `FeaturedProjects` animates `clipPath`. It looks premium but can be expensive on large full-screen image layers.
* `BrandTicker` runs an infinite GSAP timeline regardless of reduced motion and uses timeout-based velocity resets.
* `useFloatingBadges` creates mousemove tweens on every mouse event. Even with `overwrite: auto`, this can create lots of work.
* `ProcessSection` mixes React state updates into a scrubbed GSAP timeline.
* `ExperienceCentersSection` uses React state for continuous animation instead of GSAP transforms or refs.

## Improvements:

* Create a `components/animation/gsapSetup.ts` file and register GSAP plugins once.
* Use a `useScrollScene` hook for pinned sections with shared defaults, reduced-motion handling, cleanup, and refresh scheduling.
* Use transform-only animation for cards and panels. Avoid animating `left`, `top`, `width`, `height`, and heavy filters during scroll.
* Replace repeated local easing strings with `lib/animation.config.ts` tokens.
* Prefer `gsap.quickTo` for mouse-follow and magnetic effects.
* Use `ScrollTrigger.matchMedia` or `gsap.matchMedia` consistently for desktop/tablet/mobile scene separation.
* Debounce refreshes after fonts/images load instead of calling `ScrollTrigger.refresh()` from multiple components.
* For scrubbed sections, use `scrub: 0.5-0.8` for directness unless the goal is dreamy inertia. Current `scrub: 1-1.2` across multiple scenes can feel delayed.

# 📱 Responsiveness Issues

* `320px`: Hero mobile headline is clipped horizontally in `home-320x900.png`. Affected file: `components/hero/HeroSection.tsx`.
* `320px`: Brand intro subline clips in `live-320x900.png` because letter spacing plus text width exceeds the viewport.
* `320px-768px`: Hero mobile layout uses nested `px-6` and full-width buttons, leaving little text space.
* `768px`: Tablet receives desktop-like nav and large hero treatment, but some sections use only `isMobile < 768`; tablets may get heavy pinned/canvas behavior despite limited GPU budget.
* `768px-1024px`: `FeaturedProjects` desktop sidebar uses `w-[35%]`, `px-12`, `gap-12`, and `text-3xl` nav labels. Long project names risk overflow on iPad landscape and small laptops.
* `1024px+`: Desktop hero looks visually stable in the saved screenshot, but the first visible section is very dark; nav contrast on dark hero is weak because the `AT` mark remains black.
* `Mobile touch`: Experience center markers are SVG groups without keyboard equivalents and may be difficult to tap precisely.
* `Mobile vertical rhythm`: Several sections use large `py-24` or `py-32` on mobile, producing long scroll distance before content changes.

# ⚡ Performance Issues

* 135.91 MB frame sequence is the dominant bottleneck.
* Full-screen canvas redraws on scroll with high image smoothing. This is expensive on high-DPI screens.
* Lenis plus multiple ScrollTrigger scrub scenes increases main-thread work.
* Remote CSS background images bypass image optimization and lazy loading.
* The globe re-renders SVG geographies every animation frame through React state.
* `mousemove` interactions in awards and badges create frequent tweens and style writes.
* `clipPath` transitions on full-screen project images are potentially expensive.
* Global `gsap.ticker.lagSmoothing(0)` disables GSAP's protection against large frame gaps. This can make post-stall motion jumpier.
* Dependency audit reports 7 vulnerabilities: high severity through `react-simple-maps` -> `d3-color`, and moderate severity through `postcss`/`next`.

# 🧠 GSAP Architecture Improvements

## Current Problems:

* Plugin registration is repeated in many files.
* Animation code is embedded directly in presentational components.
* ScrollTrigger lifecycle is mostly local, but refresh orchestration is global and timing-based.
* Reduced-motion handling is inconsistent by section.
* Some animations are scoped well with `useGSAP`, but `ProcessSection` still uses `useEffect` and raw `gsap.context`.
* Several sections use class selectors. Most are scoped, but a stronger pattern would be refs plus local data attributes for scenes.
* Long-running loops and mouse effects do not share a global animation policy.

## Recommended Structure:

```txt
lib/
  animation/
    gsapSetup.ts
    tokens.ts
    scrollRefresh.ts
    reducedMotion.ts
hooks/
  animation/
    useReducedMotion.ts
    useScrollScene.ts
    usePinnedTimeline.ts
    useMagneticHover.ts
    useFrameSequence.ts
components/
  sections/
    Hero/
      HeroSection.tsx
      hero.timeline.ts
    AutomationSpaces/
      AutomationSpaces.tsx
      automation.timeline.ts
    FeaturedProjects/
      FeaturedProjects.tsx
      featuredProjects.timeline.ts
```

Hook-based strategy:

* `gsapSetup.ts`: registers `ScrollTrigger`, `SplitText`, and `useGSAP` once.
* `useScrollScene`: wraps `useGSAP`, accepts `scope`, `enabled`, `reducedMotionFallback`, and `buildTimeline`.
* `usePinnedTimeline`: standardizes `pin`, `scrub`, `anticipatePin`, `invalidateOnRefresh`, and cleanup.
* `useFrameSequence`: owns frame loading, decode strategy, canvas sizing, progress mapping, and reduced-motion fallback.
* `scrollRefresh.ts`: batches `ScrollTrigger.refresh()` using `requestAnimationFrame` and waits for `document.fonts.ready`.

Timeline management strategy:

* Build timelines only after layout assets are ready.
* Keep one master timeline per section.
* Keep intro/reveal timelines separate from scrubbed scroll timelines.
* Avoid React state inside `onUpdate` unless the value changes discretely.
* Store all durations/eases/staggers in tokens.
* Add a `killScene()` cleanup path for timers, RAF handles, event listeners, and infinite loops.

# 🚀 Final Recommendations

* Replace the hero PNG frame sequence with an optimized scroll-video or compressed frame system. This is the biggest production-readiness win.
* Build a real GSAP scene architecture: one setup file, one scroll-scene hook, deterministic refresh scheduling, and global reduced-motion behavior.
* Fix the 320px hero and intro clipping immediately. First-viewport text must never overflow.
* Move remote visual assets into an optimized image pipeline. Use `next/image` or local processed assets instead of CSS background URLs for content imagery.
* Reduce pinned-scroll density. Keep the cinematic sections, but give each one a clearer duration and avoid stacking long scrubbed interactions back to back.

Production-level polish checklist:

* Add automated viewport screenshots for 320, 375, 768, 1024, 1440.
* Add Lighthouse or WebPageTest runs after replacing the frame sequence.
* Add `eslint` ignores for generated audit artifacts and fix app lint errors.
* Add keyboard/touch equivalents for hover-driven UI.
* Add reduced-motion snapshots and verify that the page is still fully usable without animation.
