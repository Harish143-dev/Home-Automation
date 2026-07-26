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
const END_FRAME = 144;
const FRAME_COUNT = END_FRAME - START_FRAME + 1;
const FRAME_PATHS = Array.from({ length: FRAME_COUNT }, (_, index) => {
  return `/heroFrames/${String(index + START_FRAME).padStart(4, "0")}.webp`;
});

function drawCoverImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
) {
  const canvasWidth = canvas.clientWidth;
  const canvasHeight = canvas.clientHeight;

  if (!canvasWidth || !canvasHeight) {
    return;
  }

  const scale = Math.max(
    canvasWidth / image.width,
    canvasHeight / image.height,
  );
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const offsetX = (canvasWidth - drawWidth) / 2;
  const offsetY = (canvasHeight - drawHeight) / 2;

  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

function loadFrameImage(src: string) {
  return new Promise<HTMLImageElement | null>((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const jobyTextRef = useRef<HTMLHeadingElement>(null);

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
      const images: HTMLImageElement[] = [];
      const loadedFrames = new Set<number>();

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
        const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        const width = window.innerWidth;
        const height = window.innerHeight;

        canvas.width = Math.round(width * devicePixelRatio);
        canvas.height = Math.round(height * devicePixelRatio);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

        const nearestFrame = getNearestLoadedFrame(
          Math.round(frameState.index),
        );
        const image = nearestFrame >= 0 ? images[nearestFrame] : null;
        if (image?.complete) {
          drawCoverImage(context, image, canvas);
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
        drawCoverImage(context, image, canvas);

        if (!firstFrameResolved && loadedFrame === 0) {
          firstFrameResolved = true;
          setIsFirstFrameReady(true);
        }
      };

      let split: SplitText | null = null;
      if (h1Ref.current) {
        gsap.set(h1Ref.current, { opacity: 1 });
        split = new SplitText(h1Ref.current, { type: "words" });
      }

      const initAnimations = () => {
        // Set initial states explicitly for scrubbed GSAP
        gsap.set(frame, {
          height: "85%",
          borderBottomLeftRadius: "10vw",
          borderBottomRightRadius: "10vw",
        });
        gsap.set(jobyTextRef.current, { opacity: 0, y: 30 }); // Hide text initially
        gsap.set(".hero-scroll-copy", { opacity: 0 });
        gsap.set(".hero-scroll-desc", { opacity: 0, y: 24 });

        // ── Intro-Connected Entrance ──
        // Content stays hidden until BrandIntro curtain starts lifting
        const heroP = section.querySelector('.hero-p') as HTMLElement;
        const heroCta = section.querySelector('.hero-cta') as HTMLElement;

        gsap.set(frame, { opacity: 0 });
        if (split?.words) gsap.set(split.words, { y: 70, opacity: 0 });
        gsap.set(heroP, { y: 25, autoAlpha: 0 });
        gsap.set(heroCta, { y: 25, autoAlpha: 0 });

        let entranceRan = false;
        const runEntrance = () => {
          if (entranceRan) return;
          entranceRan = true;

          const entranceTl = gsap.timeline();

          // Video frame fades in
          entranceTl.to(frame, {
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
          }, 0);

          // Heading words cascade in
          if (split?.words) {
            entranceTl.to(split.words, {
              y: 0,
              opacity: 1,
              stagger: 0.04,
              duration: 1.1,
              ease: "power3.out",
            }, 0.2);
          }

          // Description slides up
          entranceTl.to(heroP, {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
          }, 0.5);

          // CTA buttons slide up
          entranceTl.to(heroCta, {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
          }, 0.65);
        };

        // Listen for intro curtain event
        onIntroComplete = () => runEntrance();

        if (sessionStorage.getItem('brandIntroPlayed')) {
          runEntrance();
        } else {
          window.addEventListener('introComplete', onIntroComplete, { once: true });
        }

        // Fallback if event never fires (safety)
        entranceFallback = setTimeout(() => {
          if (onIntroComplete) window.removeEventListener('introComplete', onIntroComplete);
          runEntrance();
        }, 6000);

        // Main Scroll Scrubbed Timeline
        // Increased scroll distance to 800vh to make the entire animation drastically slower and more cinematic
        mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=600%", // Drastically slower scroll pace
            pin: true,
            scrub: 2, // Smoother catch-up (interpolation)
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

        const scrollDescriptions = gsap.utils.toArray(
          ".hero-scroll-desc",
          section,
        ) as HTMLParagraphElement[];

        // 1. Scrub through the video frames over the cinematic hero scroll
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

        // 2. Expand the bottom curve down to fullscreen (takes up 0.0 -> 0.3)
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

        // 3. Fade out the foreground text as we scroll down
        timeline.to(
          ".hero-foreground",
          {
            y: -50,
            autoAlpha: 0,
            ease: "power2.in",
            duration: 0.2,
          },
          0,
        );

        // 4. Show three scroll-led descriptions while the frame is fullscreen
        timeline.to(
          ".hero-scroll-copy",
          {
            opacity: 1,
            ease: "power2.out",
            duration: 0.08,
          },
          0.26,
        );

        scrollDescriptions.forEach((description, index) => {
          const start = 0.3 + index * 0.13;

          timeline.to(
            description,
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              duration: 0.07,
            },
            start,
          );

          timeline.to(
            description,
            {
              opacity: 0,
              y: -18,
              ease: "power2.in",
              duration: 0.06,
            },
            start + 0.1,
          );
        });

        timeline.to(
          ".hero-scroll-copy",
          {
            opacity: 0,
            ease: "power2.in",
            duration: 0.08,
          },
          0.68,
        );

        // 5. Shrink video height up to 35% to give the big text plenty of room
        timeline.to(
          frame,
          {
            height: "35%", // Leaves bottom 65% for the massive text so it doesn't get cut off
            borderBottomLeftRadius: "15vw",
            borderBottomRightRadius: "15vw",
            ease: "power2.inOut",
            duration: 0.2,
          },
          0.72,
        );

        // 6. Fade in the big white text on the green background
        timeline.to(
          jobyTextRef.current,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            duration: 0.15,
          },
          0.78,
        );

        // 7. Video completely disappears
        timeline.to(
          frame,
          {
            height: "0%", // Video vanishes up
            ease: "power2.inOut",
            duration: 0.2,
          },
          0.9,
        );

        // 8. Background turns to theme background, text to theme foreground
        timeline.to(
          section,
          {
            backgroundColor: "var(--color-background)", // Tailwind theme background
            ease: "power2.inOut",
            duration: 0.2,
          },
          1.02,
        );

        // Fade out the secondary green reveal layer
        timeline.to(
          ".hero-reveal-bg",
          {
            backgroundColor: "transparent",
            ease: "power2.inOut",
            duration: 0.2,
          },
          1.02,
        );

        timeline.to(
          jobyTextRef.current,
          {
            color: "var(--color-foreground)", // Soft white text
            y: "-30vh", // Move it up from the bottom to the center of the screen
            ease: "power2.inOut",
            duration: 0.2,
          },
          1.02,
        );

        // 9. Hide the text at the very end of the animation
        timeline.to(
          jobyTextRef.current,
          {
            opacity: 0,
            y: "-40vh",
            ease: "power2.in",
            duration: 0.1,
          },
          1.18,
        );

        scheduleScrollRefresh();
      };

      const loadImages = async () => {
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

        let loadedIdx = 1;
        const loadNext = () => {
          if (!active || loadedIdx >= FRAME_PATHS.length) return;
          const frameIndex = loadedIdx;
          const img = new Image();
          img.onload = () => {
            images[frameIndex] = img;
            loadedFrames.add(frameIndex);
            loadedIdx++;
            setTimeout(loadNext, 10);
          };
          img.onerror = () => {
            loadedIdx++;
            setTimeout(loadNext, 10);
          };
          img.src = FRAME_PATHS[frameIndex];
        };
        loadNext();
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
        className="py-16 md:py-24 relative flex h-[100lvh] min-h-[100lvh] w-full flex-col items-center justify-end overflow-hidden bg-background px-4 sm:px-5 md:items-start md:px-16 lg:px-24"
      >
        <NextImage
          src="/heroFrames/0001.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

        <div className="relative z-10 flex w-full max-w-xl flex-col items-start text-left">
          <h1 className="mb-4 sm:mb-6 max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-2.5rem)] break-words leading-[1.06] text-white md:max-w-full">
            Intelligent Spaces <br />
            Intelligent Integration
          </h1>
          <div className="mb-6 sm:mb-8 w-full max-w-[260px] sm:max-w-[280px] text-left text-xs sm:text-sm font-light leading-relaxed text-white/70 md:max-w-sm md:text-base lg:text-lg">
            <p>{DEFAULT_DESCRIPTION}</p>
          </div>
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
      className={`py-16 md:py-24 relative h-screen w-full bg-background overflow-hidden flex flex-col transition-opacity duration-500 ${!isReady ? "opacity-0" : "opacity-100"}`}
    >
      {/* 🎬 Background Video Layer (Canvas sequence) */}
      <div
        ref={frameRef}
        className="motion-layer absolute top-0 left-0 w-full overflow-hidden origin-top transform-gpu z-[1]"
        style={{
          height: "85%",
          borderBottomLeftRadius: "10vw",
          borderBottomRightRadius: "10vw",
        }}
      >
        <NextImage
          src="/heroFrames/0001.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover absolute inset-0 z-0"
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

      {/* 🌊 The Joby Solid Blue Section (Always physically there, naturally revealed when video shrinks) */}
      <div className="hero-scroll-copy pointer-events-none absolute inset-0 z-[8] flex items-end justify-end px-5 pb-[14vh] sm:px-8 md:px-16 lg:px-24">
        <div className="relative min-h-[7rem] w-full max-w-xl text-right">
          {SCROLL_DESCRIPTIONS.map((text, index) => (
            <p
              key={text}
              className="hero-scroll-desc absolute inset-x-0 bottom-0 text-[clamp(1.35rem,3vw,3.25rem)] font-medium leading-[1.08] tracking-tight text-white drop-shadow-[0_12px_36px_rgba(0,0,0,0.55)]"
            >
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
                0{index + 1} / 03
              </span>
              {text}
            </p>
          ))}
        </div>
      </div>

      <div className="hero-reveal-bg absolute inset-0 z-[0] flex flex-col items-center justify-end pb-[10vh] pointer-events-none bg-accent">
        <h2
          ref={jobyTextRef}
          className="text-white opacity-0 text-center max-w-6xl px-4"
        >
          The future of rooms is coming soon
        </h2>
      </div>

      {/* 💎 Foreground Content */}
      <div className="hero-foreground absolute inset-x-0 bottom-[15%] sm:bottom-[20%] z-[10] px-5 sm:px-8 md:px-16 lg:px-24 flex flex-col md:flex-row items-start md:items-end justify-between pointer-events-none">
        {/* Left: Headline & Actions */}
        <div className="flex flex-col items-start gap-8 max-w-2xl">
          <h1
            ref={h1Ref}
            className="leading-[1.05] text-white"
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

        {/* Right: Description */}
        <div className="relative mt-6 sm:mt-8 md:mt-0 w-full max-w-xs sm:max-w-sm flex md:items-end md:justify-end pointer-events-none">
          <p className="hero-p text-left md:text-right text-base sm:text-lg md:text-xl text-white/70 font-light leading-relaxed tracking-wide">
            {DEFAULT_DESCRIPTION}
          </p>
        </div>
      </div>
    </section>
  );
}
