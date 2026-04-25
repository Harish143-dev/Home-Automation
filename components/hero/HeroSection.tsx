'use client';

import NextImage from 'next/image';
import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const DESCRIPTIONS = [
  "Transforming homes with cutting-edge automation since 2002.",
  "Elevating luxury hotels with intuitive environmental control.",
  "Optimizing commercial spaces through seamless smart tech."
];

const START_FRAME = 2;
const END_FRAME = 120;
const FRAME_COUNT = END_FRAME - START_FRAME + 1;
const FRAME_PATHS = Array.from({ length: FRAME_COUNT }, (_, index) => {
  return `/frames-compressed/${String(index + START_FRAME).padStart(3, '0')}.jpg`;
});

function drawCoverImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  canvas: HTMLCanvasElement
) {
  const canvasWidth = canvas.clientWidth;
  const canvasHeight = canvas.clientHeight;

  if (!canvasWidth || !canvasHeight) {
    return;
  }

  const scale = Math.max(canvasWidth / image.width, canvasHeight / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const offsetX = (canvasWidth - drawWidth) / 2;
  const offsetY = (canvasHeight - drawHeight) / 2;

  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const pRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [isFirstFrameReady, setIsFirstFrameReady] = useState(false);
  const { isMobile, isReady } = useBreakpoint();
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const frame = frameRef.current;

    if (!section || !canvas || !frame || isMobile || !isReady || prefersReducedMotion) {
      return;
    }

    const context = canvas.getContext('2d', { alpha: false });

    if (!context) {
      return;
    }

    const frameState = { index: 0 };
    const images: HTMLImageElement[] = [];

    let active = true;
    let currentFrame = -1;
    let mainTl: gsap.core.Timeline | null = null;
    let firstFrameResolved = false;

    const resizeCanvas = () => {
      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.round(width * devicePixelRatio);
      canvas.height = Math.round(height * devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      const image = images[Math.round(frameState.index)];
      if (image?.complete) {
        drawCoverImage(context, image, canvas);
      }
    };

    const renderFrame = (frameIndex: number) => {
      const nextFrame = Math.max(0, Math.min(frameIndex, FRAME_COUNT - 1));
      if (currentFrame === nextFrame) return;

      const image = images[nextFrame];
      if (!image?.complete) return;

      currentFrame = nextFrame;
      drawCoverImage(context, image, canvas);

      if (!firstFrameResolved && nextFrame === 0) {
        firstFrameResolved = true;
        setIsFirstFrameReady(true);
      }
    };

    let split: SplitText | null = null;
    if (h1Ref.current) {
      gsap.set(h1Ref.current, { opacity: 1 });
      split = new SplitText(h1Ref.current, { type: 'words' });
    }

    const initAnimations = () => {
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      loadTl.fromTo(frame,
        { scale: 1.05 },
        { scale: 1, duration: 2, ease: 'power2.out' }
      );

      if (split && split.words) {
        loadTl.fromTo(split.words,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, duration: 1.2, ease: 'power3.out' },
          "-=1.5"
        );
      }

      loadTl.fromTo([pRefs.current[0], ctaRef.current],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power2.out' },
        "-=1.2"
      );

      mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 1.2,
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
        }
      });

      mainTl.to(frameState, {
        index: FRAME_COUNT - 1,
        ease: 'none',
        duration: 1,
        onUpdate: () => renderFrame(Math.round(frameState.index))
      }, 0);

      if (textWrapperRef.current) {

        mainTl.to(pRefs.current[0], { opacity: 0, y: -20, duration: 0.1 }, 0.25);
        mainTl.fromTo(pRefs.current[1], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.1 }, 0.25);

        mainTl.to(pRefs.current[1], { opacity: 0, y: -20, duration: 0.1 }, 0.5);
        mainTl.fromTo(pRefs.current[2], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.1 }, 0.5);

        mainTl.to(textWrapperRef.current, {
          opacity: 0,
          y: -20,
          ease: 'power2.inOut',
          duration: 0.25
        }, 0.75);
      }

      mainTl.to(frame, {
        scale: 0.92,
        borderRadius: '24px',
        ease: 'power3.inOut',
        duration: 0.25
      }, 0.75);

      // CRITICAL: Since this ScrollTrigger pin is created asynchronously after image load,
      // we MUST explicitly refresh all ScrollTriggers on the page so subsequent sections
      // (like StatsSection, StackedPanels) mathematically recalculate from the new +400vh offset.
      setTimeout(() => ScrollTrigger.refresh(), 50);
    };

    const loadImages = async () => {
      const firstImg = new Image();
      firstImg.src = FRAME_PATHS[0];
      await new Promise((resolve) => {
        firstImg.onload = resolve;
      });
      images[0] = firstImg;

      if (!active) return;
      resizeCanvas();
      renderFrame(0);
      initAnimations();

      let loadedIdx = 1;
      const loadNext = () => {
        if (!active || loadedIdx >= FRAME_PATHS.length) return;
        const img = new Image();
        img.src = FRAME_PATHS[loadedIdx];
        img.onload = () => {
          images[loadedIdx] = img;
          loadedIdx++;
          setTimeout(loadNext, 10);
        };
        img.onerror = () => {
          loadedIdx++;
          setTimeout(loadNext, 10);
        };
      };
      loadNext();
    };

    loadImages();

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      active = false;
      window.removeEventListener('resize', handleResize);
      mainTl?.scrollTrigger?.kill();
      mainTl?.kill();
      split?.revert();
    };
  }, { scope: sectionRef, dependencies: [isMobile, isReady, prefersReducedMotion] });

  // Show nothing until breakpoint is measured (audit C3)
  if (!isReady) {
    return <section ref={sectionRef} id="hero" className="relative h-[100vh] w-full bg-white" />;
  }

  if (isMobile || prefersReducedMotion) {
    return (
      <section ref={sectionRef} id="hero" className="relative min-h-[100dvh] w-full bg-white overflow-hidden flex flex-col items-center justify-end px-5 pb-20 pt-28 sm:px-8 md:min-h-screen md:items-start md:px-16 md:pb-24 lg:px-24">
        <NextImage
          src="/frames-compressed/001.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

        <div className="relative z-10 flex w-full max-w-xl flex-col items-start text-left">
          <h1 className="mb-6 max-w-full break-words text-[clamp(2.05rem,10vw,3.4rem)] font-semibold leading-[1.06] tracking-tight text-white md:text-[clamp(3rem,6vw,4.8rem)]">
            Intelligent Automation <br />for Luxury Living
          </h1>
          <div className="mb-8 max-w-sm text-left text-base font-light leading-relaxed text-white/70 md:text-lg">
            <p>{DESCRIPTIONS[0]}</p>
          </div>
          <div className="flex w-full max-w-sm flex-col gap-3 sm:flex-row md:max-w-none">
            <button type="button" className="w-full bg-white text-black h-12 rounded-full font-medium transition-transform active:scale-95">
              Explore Features
            </button>
            <button type="button" className="w-full bg-transparent border border-white/20 text-white h-12 rounded-full font-medium transition-colors hover:bg-white/10 active:scale-95">
              Our Vision
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="hero" className="relative h-[100vh] bg-white">
      <div className="relative h-screen w-full overflow-hidden bg-white flex items-center justify-center p-0">

        <div
          ref={frameRef}
          className="relative w-full h-full overflow-hidden origin-center transform-gpu"
        >
          <NextImage
            src="/frames-compressed/001.jpg"
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
            className="absolute inset-0 block h-full w-full z-0 transform-gpu"
            style={{ opacity: isFirstFrameReady ? 1 : 0 }}
          />

          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        </div>

        <div
          ref={textWrapperRef}
          className="absolute inset-x-0 bottom-[10%] z-10 px-8 md:px-16 lg:px-24 flex flex-col md:flex-row items-start md:items-end justify-between pointer-events-none"
        >
          <div className="flex flex-col items-start gap-8 max-w-2xl">
            <h1
              ref={h1Ref}
              className="text-[2.2rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.05] tracking-tight font-medium text-white opacity-0"
            >
              Intelligent Automation<br /> for Luxury Living
            </h1>

            <div
              ref={ctaRef}
              style={{ opacity: 0 }}
              className="flex items-center gap-4 pointer-events-auto"
            >
              <button type="button" className="group relative flex h-12 md:h-14 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-6 md:px-8 font-medium text-black transition-all hover:scale-105 active:scale-95">
                <span>Explore Features</span>
              </button>

              <button type="button" className="group flex h-12 md:h-14 items-center justify-center gap-2 rounded-full border border-white/20 bg-black/20 px-6 md:px-8 font-medium text-white backdrop-blur-md transition-all hover:bg-white/10 active:scale-95">
                <span>Our Vision</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          <div className="relative mt-8 md:mt-0 w-full max-w-sm min-h-[4rem] md:min-h-[5rem] flex md:items-end md:justify-end pointer-events-none">
            {DESCRIPTIONS.map((text, i) => (
              <p
                key={i}
                ref={(el) => { pRefs.current[i] = el; }}
                className={`absolute bottom-0 left-0 md:left-auto md:right-0 text-left md:text-right text-lg md:text-xl text-white/70 font-light leading-relaxed tracking-wide ${i === 0 ? '' : 'opacity-0'}`}
              >
                {text}
              </p>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
