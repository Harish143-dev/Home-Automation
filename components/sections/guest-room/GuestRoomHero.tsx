'use client';

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

export function GuestRoomHero() {
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
      {/* Background Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Animated Image Wrapper */}
        <div className="hero-bg absolute inset-0 w-full h-full scale-110">
          <NextImage
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop"
            alt="Smart Guest Room Automation"
            fill
            priority
            className="object-cover opacity-60"
          />
        </div>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[2]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24 flex flex-col items-start text-left mt-12 md:mt-20">

        {/* H1 Heading sizing strictly matching DESIGN_SYSTEM.md */}
        <h1
          ref={textRef}
          className="hero-element text-white text-balance mb-6 max-w-5xl"
        >
          Smart Guest Room Automation & Guest Room Management Systems (GRMS)
        </h1>

        {/* Subheading */}
        <p className="hero-element font-light text-white/80 text-lg md:text-xl max-w-3xl mb-10 text-balance">
          Deliver exceptional guest experiences while optimizing energy efficiency and hotel operations with intelligent guest room automation solutions designed for modern hospitality.
        </p>

        {/* CTA Container */}
        <div className="hero-element flex flex-col sm:flex-row gap-5">
          {/* Primary CTA */}
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="interactive" size="lg" className="w-full sm:w-auto">
              Schedule a Hospitality Consultation
            </Button>
          </Link>

          {/* Secondary CTA */}
          <Link href="/experience-center" className="w-full sm:w-auto">
            <Button variant="shiny" size="lg" className="w-full sm:w-auto">
              Book a Live Demo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
