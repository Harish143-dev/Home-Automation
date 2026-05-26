"use client";

import NextImage from "next/image";
import React, { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { gsap, SplitText, useGSAP } from "../../../lib/gsapSetup";
import { scheduleScrollRefresh } from "../../../lib/scrollRefresh";

const DEFAULT_DESCRIPTION =
  "Transforming homes with cutting-edge automation since 2002";

const SCROLL_DESCRIPTIONS = [
  "Homes. Hotels. Offices.",
  "Lights. Shades. AV. Security. Wifi.",
  "25 years of Expertise.",
];
const START_FRAME = 1;
const END_FRAME = 168;
const FRAME_COUNT = END_FRAME - START_FRAME + 1;
const FRAME_PATHS = Array.from({ length: FRAME_COUNT }, (_, index) => {
  return `/heroFrames/${String(index + START_FRAME).padStart(4, "0")}.jpg`;
});

/** Interval for Phase 2 prioritized keyframe loading */
const KEYFRAME_STEP = 12;

/**
 * Draws an image onto the canvas using "object-fit: cover" math.
 * Uses explicit logical width/height instead of canvas.clientWidth
 * to avoid stale dimension reads after a resize event.
 */
function drawCoverImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  logicalWidth: number,
  logicalHeight: number,
) {
  if (!logicalWidth || !logicalHeight) {
    return;
  }

  const scale = Math.max(
    logicalWidth / image.width,
    logicalHeight / image.height,
  );
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const offsetX = (logicalWidth - drawWidth) / 2;
  const offsetY = (logicalHeight - drawHeight) / 2;

  context.clearRect(0, 0, logicalWidth, logicalHeight);
  // Disabled high-quality smoothing for massive performance boost during scroll
  context.imageSmoothingEnabled = true;
  context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

function loadFrameImage(src: string) {
  return new Promise<HTMLImageElement | null>((resolve) => {
    const image = new Image();
    image.onload = async () => {
      // Decode image off main thread before resolving, preventing drawImage stutters
      try { await image.decode(); } catch (e) { }
      resolve(image);
    };
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  /** Ref for the large reveal text shown during the accent background phase */
  const revealTextRef = useRef<HTMLHeadingElement>(null);

  const [isFirstFrameReady, setIsFirstFrameReady] = useState(false);
  const { isMobile, isReady } = useBreakpoint();
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const canvas = canvasRef.current;
      const frame = frameRef.current;

      if (
        !section ||
        !canvas ||
        !frame ||
        isMobile ||
        !isReady ||
        prefersReducedMotion
      ) {
        return;
      }

      const context = canvas.getContext("2d", { alpha: false });

      if (!context) {
        return;
      }

      const frameState = { index: 0 };
      // Pre-allocate the full frames array so there are no sparse gaps
      const images: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
      const loadedFrames = new Set<number>();
      // Cached logical canvas dimensions — avoids stale clientWidth reads
      const canvasDims = { w: 0, h: 0 };

      let active = true;
      let currentFrame = -1;
      let mainTl: gsap.core.Timeline | null = null;
      let firstFrameResolved = false;
      let resizeTimeout: number | undefined;
      let entranceFallback: ReturnType<typeof setTimeout> | undefined;
      let onIntroComplete: (() => void) | undefined;

      const getNearestLoadedFrame = (frameIndex: number) => {
        if (loadedFrames.has(frameIndex)) return frameIndex;

        for (let offset = 1; offset < FRAME_COUNT; offset++) {
          const previous = frameIndex - offset;
          const next = frameIndex + offset;

          if (previous >= 0 && loadedFrames.has(previous)) return previous;
          if (next < FRAME_COUNT && loadedFrames.has(next)) return next;
        }

        return -1;
      };

      const resizeCanvas = () => {
        // Cap DPR at 1.5 to prevent massive 4K/Retina canvas rendering which kills performance
        const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
        const width = window.innerWidth;
        const height = window.innerHeight;

        canvas.width = Math.round(width * devicePixelRatio);
        canvas.height = Math.round(height * devicePixelRatio);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

        // Cache the logical (CSS) dimensions for drawCoverImage
        canvasDims.w = width;
        canvasDims.h = height;

        const nearestFrame = getNearestLoadedFrame(
          Math.round(frameState.index),
        );
        const image = nearestFrame >= 0 ? images[nearestFrame] : null;
        if (image?.complete) {
          drawCoverImage(context, image, canvasDims.w, canvasDims.h);
        }
      };

      const renderFrame = (frameIndex: number) => {
        const nextFrame = Math.max(0, Math.min(frameIndex, FRAME_COUNT - 1));
        if (currentFrame === nextFrame) return;

        const loadedFrame = getNearestLoadedFrame(nextFrame);
        if (loadedFrame < 0 || currentFrame === loadedFrame) return;

        const image = images[loadedFrame];
        if (!image?.complete) return;

        currentFrame = loadedFrame;
        drawCoverImage(context, image, canvasDims.w, canvasDims.h);

        if (!firstFrameResolved && loadedFrame === 0) {
          firstFrameResolved = true;
          setIsFirstFrameReady(true);
        }
      };

      // ── SplitText setup ──
      // 1. Force h1 invisible (CSS already has opacity-0, but ensure GSAP agrees)
      // 2. Split text into words
      // 3. Hide each word individually
      // 4. Restore h1 opacity — words are hidden so no flash occurs
      let split: SplitText | null = null;
      if (h1Ref.current) {
        gsap.set(h1Ref.current, { opacity: 0 });
        split = new SplitText(h1Ref.current, { type: "words" });
        if (split?.words) {
          gsap.set(split.words, { y: 70, opacity: 0 });
        }
        // Safe to show h1 now — its individual words are invisible
        gsap.set(h1Ref.current, { opacity: 1 });
      }

      const initAnimations = () => {
        // ── Scoped Element Queries ──
        // All DOM lookups are scoped to `section` to prevent cross-component conflicts
        const heroForeground = section.querySelector('.hero-foreground') as HTMLElement;
        const heroScrollCopy = section.querySelector('.hero-scroll-copy') as HTMLElement;
        const heroRevealBg = section.querySelector('.hero-reveal-bg') as HTMLElement;
        const scrollDescriptions = gsap.utils.toArray(
          ".hero-scroll-desc",
          section,
        ) as HTMLParagraphElement[];
        const heroCta = section.querySelector('.hero-cta') as HTMLElement;

        // Set initial states for the scroll-driven timeline
        gsap.set(frame, {
          height: "85%",
          borderBottomLeftRadius: "10vw",
          borderBottomRightRadius: "10vw",
        });
        // Hide reveal text (shown later during the accent background phase)
        gsap.set(revealTextRef.current, { opacity: 0, y: 30 });
        gsap.set(heroScrollCopy, { opacity: 0 });
        gsap.set(scrollDescriptions, { opacity: 0, y: 24 });

        // ── Intro-Connected Entrance ──
        // Content stays hidden until the BrandIntro curtain lifts
        gsap.set(frame, { opacity: 0 });
        // h1 words already hidden in SplitText setup above
        gsap.set(heroCta, { y: 25, autoAlpha: 0 });

        let entranceRan = false;
        const runEntrance = () => {
          if (entranceRan) return;
          entranceRan = true;

          const entranceTl = gsap.timeline();

          // Video frame container fades in
          entranceTl.to(frame, {
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
          }, 0);

          // Heading words cascade in with staggered reveal
          if (split?.words) {
            entranceTl.to(split.words, {
              y: 0,
              opacity: 1,
              stagger: 0.04,
              duration: 1.1,
              ease: "power3.out",
            }, 0.2);
          }

          // CTA buttons slide up
          entranceTl.to(heroCta, {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
          }, 0.5);
        };

        // Listen for intro curtain completion event
        onIntroComplete = () => runEntrance();

        if (sessionStorage.getItem('brandIntroPlayed')) {
          runEntrance();
        } else {
          window.addEventListener('introComplete', onIntroComplete, { once: true });
        }

        // Safety fallback — runs entrance if introComplete event never fires.
        // 7s exceeds BrandIntro's ~4.6s total animation plus potential network delays.
        entranceFallback = setTimeout(() => {
          if (onIntroComplete) window.removeEventListener('introComplete', onIntroComplete);
          runEntrance();
        }, 7000);

        // Scroll distance +=1500% (15x viewport height) for a cinematic, slow-paced scrub
        mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=1500%",
            pin: true,
            scrub: 0.8, // Reduced from 2 to 0.8 for tighter, more responsive tracking
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: (trigger) => {
              if (trigger.progress <= 0) {
                frameState.index = 0;
                renderFrame(0);
              }
            },
            onLeaveBack: () => {
              frameState.index = 0;
              renderFrame(0);
            },
          },
        });
        const timeline = mainTl;

        // 1. Scrub through all 144 video frames over the cinematic hero scroll
        timeline.to(
          frameState,
          {
            index: FRAME_COUNT - 1,
            ease: "none",
            duration: 0.88,
            onUpdate: () => renderFrame(Math.round(frameState.index)),
          },
          0,
        );

        // 2. Expand the rounded video container to fullscreen
        timeline.to(
          frame,
          {
            height: "100%",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
            ease: "power1.inOut",
            duration: 0.3,
          },
          0,
        );

        // 3. Fade out the foreground content (headline, description, CTAs) as user scrolls
        timeline.to(
          heroForeground,
          {
            y: -50,
            autoAlpha: 0,
            ease: "power2.in",
            duration: 0.2,
          },
          0,
        );

        // 4. Show the rotating scroll descriptions over the fullscreen video
        timeline.to(
          heroScrollCopy,
          {
            opacity: 1,
            ease: "power2.out",
            duration: 0.08,
          },
          0.22,
        );

        // Cycle through each description with staggered fade-in / fade-out
        scrollDescriptions.forEach((description, index) => {
          const start = 0.26 + index * 0.15;

          timeline.to(
            description,
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              duration: 0.09,
            },
            start,
          );

          timeline.to(
            description,
            {
              opacity: 0,
              y: -18,
              ease: "power2.in",
              duration: 0.07,
            },
            start + 0.12,
          );
        });

        // Hide scroll descriptions container
        timeline.to(
          heroScrollCopy,
          {
            opacity: 0,
            ease: "power2.in",
            duration: 0.08,
          },
          0.72,
        );

        // 5. Shrink video to top 35% and round bottom edges — reveals accent background beneath
        timeline.to(
          frame,
          {
            height: "35%",
            borderBottomLeftRadius: "15vw",
            borderBottomRightRadius: "15vw",
            ease: "power2.inOut",
            duration: 0.2,
          },
          0.74,
        );

        // 6. Fade in the reveal text on the accent (crimson) background
        timeline.to(
          revealTextRef.current,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.15,
          },
          0.80,
        );

        // 7. Video container collapses fully upward and disappears
        timeline.to(
          frame,
          {
            height: "0%",
            ease: "power2.inOut",
            duration: 0.2,
          },
          0.92,
        );

        // 8. Transition section background from accent to theme background color
        timeline.to(
          section,
          {
            backgroundColor: "var(--color-background)",
            ease: "power2.inOut",
            duration: 0.2,
          },
          1.04,
        );

        // Fade out the accent (crimson) reveal background layer
        timeline.to(
          heroRevealBg,
          {
            backgroundColor: "transparent",
            ease: "power2.inOut",
            duration: 0.2,
          },
          1.04,
        );

        // Move reveal text upward and change color to theme foreground (near-black)
        timeline.to(
          revealTextRef.current,
          {
            color: "var(--color-foreground)",
            y: "-30vh",
            ease: "power2.inOut",
            duration: 0.2,
          },
          1.04,
        );

        // 9. Fade out the reveal text at the very end of the scroll sequence
        timeline.to(
          revealTextRef.current,
          {
            opacity: 0,
            y: "-40vh",
            ease: "power2.in",
            duration: 0.1,
          },
          1.20,
        );

        scheduleScrollRefresh();
      };

      // ── Frame Loading Strategy ──
      // Phase 1: Load first frame immediately (critical for initial paint)
      // Phase 2: Load keyframes at strategic intervals (every 12th frame)
      //          so the user has reasonable frame coverage even during fast scrolls
      // Phase 3: Fill remaining gaps sequentially for full-quality playback
      const loadImages = async () => {
        // Phase 1: Critical first frame
        const firstImg = await loadFrameImage(FRAME_PATHS[0]);

        if (!active) return;

        if (firstImg) {
          images[0] = firstImg;
          loadedFrames.add(0);
        }

        resizeCanvas();
        renderFrame(0);
        if (!firstImg) {
          firstFrameResolved = true;
          setIsFirstFrameReady(true);
        }
        scheduleScrollRefresh();

        // Phase 2: Load keyframes at strategic positions for fast-scrub coverage
        const keyframeIndices: number[] = [];
        for (let i = KEYFRAME_STEP; i < FRAME_COUNT; i += KEYFRAME_STEP) {
          keyframeIndices.push(i);
        }
        // Always include the last frame for complete scrub range
        if (!keyframeIndices.includes(FRAME_COUNT - 1)) {
          keyframeIndices.push(FRAME_COUNT - 1);
        }

        for (const idx of keyframeIndices) {
          if (!active) return;
          const img = await loadFrameImage(FRAME_PATHS[idx]);
          if (!active) return;
          if (img) {
            images[idx] = img;
            loadedFrames.add(idx);
          }
        }

        // Phase 3: Fill remaining frames sequentially (non-blocking with 10ms gaps)
        let fillIdx = 1;
        const fillNext = () => {
          if (!active) return;
          // Skip already-loaded keyframes
          while (fillIdx < FRAME_COUNT && loadedFrames.has(fillIdx)) {
            fillIdx++;
          }
          if (fillIdx >= FRAME_COUNT) return;

          const frameIndex = fillIdx;
          const img = new Image();
          img.onload = async () => {
            // Decode image off main thread before storing, preventing drawImage stutters
            try { await img.decode(); } catch (e) { }
            images[frameIndex] = img;
            loadedFrames.add(frameIndex);
            fillIdx++;
            setTimeout(fillNext, 5); // Faster queue processing
          };
          img.onerror = () => {
            fillIdx++;
            setTimeout(fillNext, 5);
          };
          img.src = FRAME_PATHS[frameIndex];
        };
        fillNext();
      };

      resizeCanvas();
      initAnimations();
      loadImages();

      const handleResize = () => {
        if (resizeTimeout) window.clearTimeout(resizeTimeout);
        resizeTimeout = window.setTimeout(resizeCanvas, 100);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        active = false;
        window.removeEventListener("resize", handleResize);
        if (onIntroComplete) window.removeEventListener('introComplete', onIntroComplete);
        if (entranceFallback) clearTimeout(entranceFallback);
        if (resizeTimeout) window.clearTimeout(resizeTimeout);
        mainTl?.scrollTrigger?.kill();
        mainTl?.kill();
        split?.revert();
      };
    },
    {
      scope: sectionRef,
      dependencies: [isMobile, isReady, prefersReducedMotion],
    },
  );

  // Mobile/Reduced Motion Fallback
  if (isReady && (isMobile || prefersReducedMotion)) {
    return (
      <section
        ref={sectionRef}
        id="hero"
        className="relative flex h-[100lvh] min-h-[100lvh] w-full flex-col items-center justify-end overflow-hidden bg-background px-4 sm:px-5 pb-16 sm:pb-20 pt-24 sm:pt-28 md:items-start md:px-16 md:pb-24 lg:px-24"
      >
        <NextImage
          src="/heroFrames/0001.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

        <div className="relative z-10 flex w-full max-w-xl flex-col items-start text-left">
          <h1 className="mb-4 sm:mb-6 max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-2.5rem)] break-words text-[clamp(1.7rem,9vw,3.2rem)] sm:text-[clamp(1.95rem,9.2vw,3.4rem)] font-normal leading-[1.06] tracking-wide text-white md:max-w-full md:text-[clamp(3rem,6vw,4.8rem)]">
            Intelligent Spaces <br />
            Intelligent Integration
          </h1>
          <div className="flex w-full max-w-sm flex-col gap-2.5 sm:gap-3 sm:flex-row md:max-w-none">
            <Link href="/contact">
              <Button
                variant="accent"
                size="lg"
                shape="full"
                className="w-full sm:w-auto"
              >
                Book a Consultation
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                variant="glass"
                size="lg"
                shape="full"
                className="w-full sm:w-auto"
              >
                Explore Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`relative h-screen w-full bg-background overflow-hidden flex flex-col transition-opacity duration-500 ${!isReady ? "opacity-0" : "opacity-100"}`}
    >
      {/* 🎬 Video Frame Container — canvas-rendered image sequence with rounded bottom */}
      <div
        ref={frameRef}
        className="motion-layer absolute top-0 left-0 w-full overflow-hidden origin-top transform-gpu z-[1]"
        style={{
          height: "85%",
          borderBottomLeftRadius: "10vw",
          borderBottomRightRadius: "10vw",
        }}
      >
        {/* Static first frame — visible while canvas loads, fades out once canvas is ready */}
        <NextImage
          src="/heroFrames/0001.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className={`object-cover absolute inset-0 z-0 transition-opacity duration-300 ${isFirstFrameReady ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          aria-hidden="true"
        />
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Smart home visual sequence"
          className="motion-layer absolute inset-0 block h-full w-full z-0 transform-gpu object-cover"
          style={{ opacity: isFirstFrameReady ? 1 : 0 }}
        />

        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      </div>

      {/* 📝 Scroll Descriptions — cycled text overlays during the fullscreen video phase */}
      <div className="hero-scroll-copy pointer-events-none absolute inset-0 z-[8] flex items-end justify-end px-5 pb-[14vh] sm:px-8 md:px-16 lg:px-24">
        <div className="relative min-h-[7rem] w-full max-w-xl text-right">
          {SCROLL_DESCRIPTIONS.map((text, index) => (
            <p
              key={text}
              className="hero-scroll-desc absolute inset-x-0 bottom-0 text-[clamp(1.1rem,2.5vw,2.5rem)] font-light leading-[1.2] tracking-wide text-white drop-shadow-[0_12px_36px_rgba(0,0,0,0.55)]"
            >
              <span className="mb-6 block text-xs font-semibold uppercase tracking-widest text-white/50">
                0{index + 1} / 03
              </span>
              {text}
            </p>
          ))}
        </div>
      </div>

      {/* 🎨 Accent Reveal Background — sits behind the video, exposed when video shrinks/vanishes */}
      <div className="hero-reveal-bg absolute inset-0 z-[0] flex flex-col items-center justify-end pb-[10vh] pointer-events-none bg-accent">
        <p
          ref={revealTextRef}
          className="text-white text-[1.2rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[2.8rem] font-light tracking-wider leading-[1.3] opacity-0 text-center max-w-5xl px-4"
        >
          The Future of spaces is here
        </p>
      </div>

      {/* 💎 Foreground Content — headline, description, and CTA buttons */}
      <div className="hero-foreground absolute inset-x-0 bottom-[18%] sm:bottom-[22%] z-[10] px-8 sm:px-12 md:px-20 lg:px-32 flex flex-col items-start pointer-events-none">
        {/* Headline & Actions */}
        <div className="flex flex-col items-start gap-10 max-w-2xl">
          {/* opacity-0 prevents unsplit text flash — GSAP restores after SplitText setup */}
          <h1
            ref={h1Ref}
            className="text-[1.5rem] sm:text-[1.8rem] md:text-[2.2rem] lg:text-[2.75rem] leading-[1.2] tracking-wide font-normal text-white opacity-0"
          >
            Intelligent Spaces <br />
            Intelligent Integration
          </h1>

          <div className="hero-cta flex items-center gap-4 pointer-events-auto">
            <Link href="/contact">
              <Button
                variant="accent"
                size="lg"
                shape="full"
                className="px-5 sm:px-6 md:px-8 h-11 sm:h-12 md:h-14"
              >
                Book a Consultation
              </Button>
            </Link>

            <Link href="/projects">
              <Button
                variant="glass"
                size="lg"
                shape="full"
                className="px-5 sm:px-6 md:px-8 h-11 sm:h-12 md:h-14"
              >
                <span>Explore Projects</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
