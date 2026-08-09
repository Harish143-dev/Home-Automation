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
      className="relative h-[85vh] min-h-[600px] w-full overflow-hidden flex justify-end flex-col justify-end"
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
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[2]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24 flex flex-col items-start justify-end flex-grow pb-16 md:pb-24 pointer-events-none select-none">
        <div className="mb-2 flex items-center justify-end gap-4 overflow-hidden">
          <div className="h-[1px] w-8 bg-accent" />
          <span className="hero-element block text-[10px] sm:text-xs tracking-[0.3em] text-accent uppercase mb-4">
            Get in touch
          </span>
          <div className="h-[1px] w-8 bg-accent" />
        </div>

        <div ref={textRef} className="flex flex-col">
          <div className="hero-line">
            <h1 className="hero-element text-white text-balance mb-6 max-w-4xl">
              Let's Design Your
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="hero-element text-white mb-6 max-w-4xl">
              Intelligent Space
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
