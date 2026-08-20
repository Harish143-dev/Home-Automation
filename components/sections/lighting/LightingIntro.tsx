"use client";

import React, { useRef } from "react";
import NextImage from "next/image";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { EASE, DURATION, STAGGER } from "../../../lib/animation.config";
import { scheduleScrollRefresh } from "../../../lib/scrollRefresh";

export default function LightingIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        onRefresh: () => scheduleScrollRefresh(),
      }
    });

    // Stagger text elements
    if (textRef.current) {
      const textEls = textRef.current.querySelectorAll(".li-text-el");
      tl.fromTo(textEls,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DURATION.normal,
          stagger: STAGGER.reveal,
          ease: EASE.reveal
        }
      );
    }

    // Media slide in
    if (mediaRef.current) {
      tl.fromTo(mediaRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: DURATION.slow,
          ease: EASE.reveal
        },
        "-=0.6"
      );
    }

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      id="lighting-intro"
      className="py-12 md:py-16 relative w-full overflow-hidden bg-background text-foreground"
    >
      {/* Subtle Noise Texture Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none" aria-hidden="true">
        <filter id="noise-intro">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-intro)" />
      </svg>

      <div className="relative z-10 w-full px-6 sm:px-12 md:px-20 lg:px-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Side: Content */}
        <div ref={textRef} className="flex flex-col items-start text-left">
          <span className="li-text-el tracking-[0.3em] text-sm md:text-base text-accent mb-4 block font-light">
            Introduction
          </span>
          <h3 className=" li-text-el text-foreground mb-8 text-balance">
            More Than Lighting—It's About the Perfect Living Experience
          </h3>
          <div className="li-text-el space-y-6 text-sm sm:text-base md:text-lg font-light text-muted leading-relaxed max-w-xl">
            <p>
              Your home should do more than light up—it should understand how you live. With ATPL's intelligent lighting automation, every room transforms to match your mood and routine. From soft morning light to elegant dinner settings and immersive movie nights, customized lighting scenes work with shades, HVAC, and voice control to create a luxurious, effortless living experience.
            </p>
          </div>
        </div>

        {/* Right Side: Media Container */}
        <div
          ref={mediaRef}
          className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg shadow-black/5 border border-border group"
        >
          <NextImage
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop"
            alt="Family enjoying a beautifully illuminated living space"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            priority
          />
          {/* Subtle gradient layer to blend with the beige background */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
