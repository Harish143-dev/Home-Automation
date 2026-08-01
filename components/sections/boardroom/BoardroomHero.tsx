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
import { scheduleScrollRefresh } from "../../../lib/scrollRefresh";

export function BoardroomHero() {
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
      className="relative w-full h-[100svh] min-h-[600px] flex items-center justify-start overflow-hidden bg-black"
    >
      {/* Background Image - Modern Corporate Boardroom */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <NextImage
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
          alt="Smart Boardroom Automation"
          fill
          priority
          className="hero-bg object-cover opacity-60 scale-105"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[2]" />
      </div>

      {/* Content Container (Left Aligned) */}
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-24 flex flex-col items-start text-left mt-12 md:mt-20">

        {/* H1 Heading sizing strictly matching AGENTS.md rules */}
        <h1
          ref={textRef}
          className="text-white text-balance mb-6"
        >
          Smart Boardroom & Meeting Room Automation Solutions
        </h1>

        {/* Subheading */}
        <p className="hero-element text-base md:text-lg lg:text-xl text-white/80 tracking-wide leading-relaxed max-w-2xl text-balance mb-12">
          Enable more productive meetings with intelligent boardroom automation featuring one-touch meeting control, advanced video conferencing, premium audio-visual integration, wireless presentations, lighting control, and room scheduling—all designed to simplify collaboration and enhance every meeting experience.
        </p>

        {/* CTA Container */}
        <div className="hero-element flex flex-col sm:flex-row items-start justify-start w-full sm:w-auto">
          {/* Primary CTA using AGENTS.md compliant Button component */}
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="interactive" size="lg" className="w-full sm:w-auto">
              Schedule a Consultation
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
