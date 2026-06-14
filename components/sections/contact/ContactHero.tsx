"use client";

import React, { useRef } from "react";
import NextImage from "next/image";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

export function ContactHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current || prefersReducedMotion) return;

      const tl = gsap.timeline();

      // Simple cinematic fade-in and slow scale for the background
      tl.fromTo(
        bgRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2.5, ease: "power2.out" }
      );

      // Line by line reveal for text
      const lines = textRef.current?.querySelectorAll(".hero-line");
      if (lines) {
        tl.fromTo(
          lines,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out" },
          "-=1.5"
        );
      }

      // Parallax effect on scroll
      gsap.to(bgRef.current, {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[85vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center pt-24"
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
        <NextImage
          src="/assets/residential/project/delhi-residence/delhi-residence-2.jpg"
          alt="Luxury architectural interior"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Cinematic gradients */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-24 flex flex-col items-center text-center">
        <div className="mb-6 flex items-center justify-center gap-4 overflow-hidden">
          <div className="h-[1px] w-8 bg-accent" />
          <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-accent">
            Get in touch
          </span>
          <div className="h-[1px] w-8 bg-accent" />
        </div>
        
        <div ref={textRef} className="flex flex-col gap-2">
          <div className="overflow-hidden">
            <h1 className="hero-line text-4xl md:text-5xl lg:text-7xl font-light leading-[1.1] tracking-wide text-white drop-shadow-sm">
              Let's Design Your
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="hero-line text-4xl md:text-5xl lg:text-7xl font-light leading-[1.1] tracking-wide text-white drop-shadow-sm">
              Intelligent Space
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
