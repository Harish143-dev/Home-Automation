"use client";

import { useRef } from "react";
import NextImage from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";

export default function AboutTheCompany() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => scheduleScrollRefresh(),
      }
    });

    tl.fromTo(".atc-eyebrow",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    )
      .fromTo(".atc-body",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(".atc-image-wrapper",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "expo.out" },
        "-=0.6"
      )
      .fromTo(".atc-image",
        { scale: 1.1 },
        { scale: 1, duration: 1.2, ease: "expo.out" },
        "<"
      );

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 relative px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden bg-background"
    >
      {/* Noise Texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none" aria-hidden="true">
        <filter id="noise-atc"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#noise-atc)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left Content */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <span className="atc-eyebrow block tracking-[0.3em] text-sm md:text-base text-accent font-medium opacity-0">
              About Us
            </span>
            <div className="atc-line h-[1px] w-12 bg-accent opacity-0 origin-left" />
          </div>

          <p className="atc-body text-muted font-light text-lg md:text-xl lg:text-2xl leading-relaxed opacity-0">
            At ATPL, we believe that the highest form of technology is entirely
            imperceptible. True modernization simplifies how you interact with
            space. For over two decades, we have partnered with India’s
            leading architects and interior designers to integrate lighting,
            climate, and media into a cohesive ecosystem—respecting the visual
            integrity of the architecture while optimizing daily living.
          </p>
        </div>

        {/* Right Image */}
        <div className="atc-image-wrapper relative w-full aspect-[4/5] lg:aspect-[4/4] rounded-[40px] overflow-hidden shadow-lg shadow-black/5 opacity-0 transform-gpu">
          <div className="absolute inset-0 bg-black/5 z-10" />
          <NextImage
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
            alt="Modern automated office space"
            fill
            className="atc-image object-cover will-change-transform"
            sizes="(max-width: 1024px) 100vw, 50vw"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}

