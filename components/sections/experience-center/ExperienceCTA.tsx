"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { gsap, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export function ExperienceCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion || !sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      tl.fromTo(
        ".exp-cta-card",
        { y: 30, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
      );

      tl.fromTo(
        ".exp-cta-btn",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" },
        "-=0.4"
      );
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground"
      id="contact"
    >
      <div className="max-w-5xl mx-auto exp-cta-card bg-panel border border-black/5 shadow-sm rounded-[2rem] p-10 md:p-16 lg:p-20 text-center relative overflow-hidden flex flex-col items-center">
        {/* Subtle Background Accent Glows */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-50" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        {/* Minimal Section Label */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] w-8 bg-black/20" />
          <span className="text-xs sm:text-sm tracking-[0.3em] text-accent font-medium">
            Visit Us
          </span>
          <div className="h-[1px] w-8 bg-black/20" />
        </div>

        {/* Heading */}
        <h2 className="text-foreground mb-6 max-w-3xl relative z-10 text-balance">
          Ready to Experience the Future of Automation?
        </h2>

        {/* Subheading */}
        <p className="text-muted-foreground font-light text-base md:text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl relative z-10 text-balance">
          Schedule a personalized tour at our Delhi, Mumbai, or Bangalore experience centre.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto relative z-10">
          <Link href="/contact" className="exp-cta-btn w-full sm:w-auto">
            <Button variant="interactive" size="lg" className="w-full sm:w-auto">
              Book a Visit
            </Button>
          </Link>

          <Link href="/contact" className="exp-cta-btn w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Speak to an Expert
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
