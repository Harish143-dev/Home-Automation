'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gsap, useGSAP, SplitText } from '@/lib/gsapSetup';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASE, DURATION, STAGGER } from '@/lib/animation.config';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';

export function CalculatorCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const btnGroupRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current || !headlineRef.current) return;

    const split = new SplitText(headlineRef.current, {
      type: 'lines,words',
      linesClass: 'overflow-hidden',
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
    });

    tl.from(split.words, {
      yPercent: 120,
      opacity: 0,
      duration: DURATION.slow,
      stagger: STAGGER.tight,
      ease: EASE.premium,
    })
    .from(
      subheadRef.current,
      {
        y: 30,
        opacity: 0,
        duration: DURATION.normal,
        ease: EASE.reveal,
      },
      '-=0.7'
    )
    .from(
      btnGroupRef.current,
      {
        y: 25,
        opacity: 0,
        duration: DURATION.normal,
        ease: EASE.reveal,
      },
      '-=0.6'
    );

    scheduleScrollRefresh();

    return () => split.revert();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative flex flex-col items-center justify-center w-full bg-background overflow-hidden px-6 border-t border-border"
    >
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-accent/[0.035] blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-[1440px] mx-auto w-full">
        
        {/* Minimal Section Label */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[1px] w-12 bg-black/20" />
          <span className="tracking-[0.3em] text-xs sm:text-sm uppercase text-accent font-light">
            Engineered Reality
          </span>
          <div className="h-[1px] w-12 bg-black/20" />
        </div>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide text-foreground mb-8 max-w-4xl"
        >
          Transform Indicative Estimates Into Engineered Reality
        </h2>

        {/* Subheading */}
        <p
          ref={subheadRef}
          className="text-sm sm:text-base md:text-lg lg:text-[20px] font-light leading-relaxed tracking-wide text-muted max-w-3xl mx-auto mb-12"
        >
          Before finalizing architectural blueprints or electrical distributions, consult with AT Smart Living’s automation engineers. We review your layout to design a bespoke lighting, shading, and climate architecture that delivers measurable efficiency without compromising aesthetic elegance.
        </p>

        {/* Button Group */}
        <div
          ref={btnGroupRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6 w-full sm:w-auto"
        >
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="interactive" size="lg" className="w-full sm:w-auto">
              Schedule Engineering Consultation
            </Button>
          </Link>

          <Link href="/projects" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              View Verified Case Studies
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
