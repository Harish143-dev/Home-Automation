"use client";

import { useRef } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { Button } from "@/components/ui/button";
import { EASE, DURATION, STAGGER } from "@/lib/animation.config";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";

export function OfficeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current || !textRef.current) return;

    // Split text for staggered line reveal
    const split = new SplitText(textRef.current, { type: "lines" });

    // Initial state
    gsap.set(split.lines, { y: 30, opacity: 0 });

    const tl = gsap.timeline();

    tl.to(split.lines, {
      y: 0,
      opacity: 1,
      duration: DURATION.slow,
      stagger: STAGGER.normal,
      ease: EASE.premium,
      delay: 0.2
    })
      .fromTo(".hero-element",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: DURATION.normal, stagger: STAGGER.wide, ease: EASE.reveal },
        "-=0.8"
      );

    // Subtle parallax on the background image
    gsap.to(".hero-bg", {
      yPercent: 15,
      ease: EASE.none,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    scheduleScrollRefresh();

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100svh] min-h-[600px] flex overflow-hidden bg-black flex-col justify-end"
    >
      {/* Background Image - Modern Smart Office */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <NextImage
          src="/images/office-hero.png"
          alt="Smart Office Automation Solutions"
          fill
          priority
          className="hero-bg object-cover opacity-60 scale-105"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[2]" />
      </div>

      {/* Content Container (Left Aligned) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24 flex flex-col items-start justify-end flex-grow pb-16 md:pb-24 pointer-events-none select-none">

        {/* H1 Heading */}
        <h1
          ref={textRef}
          className="hero-element text-white text-balance mb-6 max-w-4xl"
        >
          Smart Office Automation Solutions for Modern Workspaces
        </h1>

        {/* Subheading */}
        <p className="hero-element font-light text-white/80 text-lg md:text-xl max-w-3xl mb-10 text-balance">
          Create a connected and efficient workplace with integrated solutions for lighting control, motorized shades, audio-video, conferencing, networking, security, and workspace management. Designed for offices of every scale, our automation solutions simplify control, support energy efficiency, and improve everyday workplace operations.
        </p>

        {/* CTA Container */}
        <div className="pointer-events-auto hero-element flex flex-col sm:flex-row gap-5">
          {/* Primary CTA using AGENTS.md compliant Button component */}
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="interactive" size="lg" className="w-full sm:w-auto">
              Request a Consultation
            </Button>
          </Link>
          {/* Secondary CTA */}
          <Link href="/experience-center" className="w-full sm:w-auto">
            <Button variant="shiny" size="lg" className="w-full sm:w-auto">
              Visit Our Experience Center
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
