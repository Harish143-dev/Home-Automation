"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";
import { DURATION, EASE } from "@/lib/animation.config";
import { ArrowRight, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutCTA() {
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

    // Content reveal
    tl.fromTo(".cta-content > *",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DURATION.slow,
        ease: EASE.reveal,
        stagger: 0.15
      }
    );

    // Buttons reveal
    tl.fromTo(".cta-button",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DURATION.normal,
        ease: "power3.out",
        stagger: 0.1
      },
      "-=0.4"
    );

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 relative px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden"
    >
      {/* Dynamic Background Glows */}
      <div
        className="absolute top-0 right-0 w-[800px] h-[800px] opacity-20 pointer-events-none translate-x-1/3 -translate-y-1/3"
        style={{ background: 'radial-gradient(circle, rgba(229,107,85,0.2) 0%, rgba(0,0,0,0) 70%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] opacity-10 pointer-events-none -translate-x-1/3 translate-y-1/3"
        style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 70%)' }}
      />

      {/* Noise Texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none" aria-hidden="true">
        <filter id="noise-cta"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#noise-cta)" />
      </svg>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">

        <div className="cta-content space-y-6 md:space-y-8 mb-12 md:mb-16">
          <span className="block tracking-[0.3em] text-sm md:text-base text-accent font-medium ">
            Take the Next Step
          </span>
          <h2 className=""  > Let's Create Smarter Spaces Together
          </h2>
          <p className="text-muted text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto">
            Whether you're planning a luxury residence, hospitality project, or commercial development, our experts are ready to help you bring intelligent automation to life.
          </p>
        </div>

        {/* Buttons Grid */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 md:gap-6">

          <Link href="/contact" className="w-full sm:w-auto cta-button">
            <Button variant="interactive" size="lg" className="w-full">
              Schedule a Consultation
            </Button>
          </Link>

          <Link href="/experience-center" className="w-full sm:w-auto cta-button">
            <Button variant="green" size="lg" className="w-full">
              <MapPin className="w-4 h-4 mr-2" />
              Visit an Experience Center
            </Button>
          </Link>

          <Link href="/careers" className="w-full sm:w-auto cta-button">
            <Button variant="outline" size="lg" className="w-full text-black">
              <Briefcase className="w-4 h-4 mr-2" />
              Work With Us
            </Button>
          </Link>

        </div>

      </div>
    </section >
  );
}
