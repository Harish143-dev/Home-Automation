'use client';

import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { gsap, SplitText, useGSAP } from '@/lib/gsapSetup';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';

export function OfficeCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current || !headlineRef.current) return;

    // High-end typographic reveal
    const split = new SplitText(headlineRef.current, {
      type: 'lines,words',
      linesClass: 'overflow-hidden'
    });

    gsap.from(split.words, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
      yPercent: 120,
      rotationZ: 2,
      opacity: 0,
      duration: 1.2,
      stagger: 0.05,
      ease: 'power4.out',
    });

    gsap.from('.cta-subhead', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 65%',
      },
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.3
    });

    gsap.from('.cta-btn-group', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 55%',
      },
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.4
    });

    return () => split.revert();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative flex flex-col items-center justify-center w-full bg-background overflow-hidden px-6 border-t border-border shadow-[inset_0_20px_40px_-20px_rgba(0,0,0,0.05)]"
      id="contact"
    >
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-accent/[0.03] blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-[1440px] mx-auto w-full">

        {/* Minimal Section Label */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-[1px] w-12 bg-black/20" />
          <span className="tracking-[0.2em] text-muted-foreground uppercase text-sm font-medium">Next Steps</span>
          <div className="h-[1px] w-12 bg-black/20" />
        </div>

        {/* Oversized Clean Headline */}
        <h2
          ref={headlineRef}
          className="text-foreground mb-8 text-balance max-w-4xl"
        >
          Build a Smarter Workplace with Intelligent Office Automation
        </h2>

        <p className="cta-subhead text-base md:text-lg text-muted-foreground font-light tracking-wide max-w-2xl mx-auto leading-relaxed mb-12">
          Empower your business with integrated office automation solutions that improve productivity, optimize operations, and create exceptional workplace experiences.
        </p>

        {/* Standard Project Buttons */}
        <div className="cta-btn-group flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6 w-full sm:w-auto">
          {/* Primary CTA */}
          <Link href="/contact" className="w-full sm:w-auto">
            <Button
              variant="interactive"
              size="lg"
              className="w-full sm:w-auto"
            >
              Request a Consultation
            </Button>
          </Link>

          {/* Secondary CTA */}
          <Link href="/contact" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="group w-full sm:w-auto"
            >
              <MessageSquare className="w-5 h-5 mr-2 text-black/50 group-hover:text-black transition-colors duration-300" />
              <span className="text-base sm:text-lg font-light tracking-wide">
                Talk to a Commercial Automation Expert
              </span>
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
