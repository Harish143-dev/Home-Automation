'use client';

import React, { useRef } from 'react';
import { ArrowRight, ClipboardList } from 'lucide-react';
import { Button } from '../../ui/button';
import { gsap, ScrollTrigger, useGSAP, SplitText } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

export function CommercialCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current || !headlineRef.current) return;

    let split: any = null;

    // High-end typographic reveal
    document.fonts.ready.then(() => {
      if (!headlineRef.current || !sectionRef.current) return;
      split = new SplitText(headlineRef.current, {
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

    return () => {
      if (split) split.revert();
    };
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative flex flex-col items-center justify-center w-full bg-background overflow-hidden px-6 border-t border-border"
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
          <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-muted">Transform Your Commercial Space</span>
          <div className="h-[1px] w-12 bg-black/20" />
        </div>

        {/* Oversized Clean Headline */}
        <h2
          ref={headlineRef}
          className="text-foreground mb-8"
        >
          Automate your Commercial Infrastructure
        </h2>

        <p className="cta-subhead text-sm sm:text-base md:text-lg lg:text-[21px] font-light leading-relaxed tracking-wide text-muted max-w-4xl mx-auto mb-12">
          High-performance spaces drive high-performance business. Before a single blueprint is finalized or a wire path is laid, discover how adaptive engineering can enhance your real estate portfolio. Run your upcoming layout through our validation framework to visualize your exact utility savings, operational efficiency gains, and accelerated payback timelines.
        </p>

        {/* Standard Project Buttons */}
        <div className="cta-btn-group flex flex-col sm:flex-row items-center gap-5 sm:gap-6 w-full sm:w-auto">
          {/* Primary CTA */}
          <Button
            variant="interactive"
            size="lg"
            className="w-full sm:w-auto"
          >
            Calculate System ROI
          </Button>

          {/* Secondary CTA */}
          <Button
            variant="glass"
            size="lg"
            className="group h-auto py-4 sm:py-5 px-8 w-full sm:w-auto border-border text-foreground hover:bg-surface-darker rounded-full"
          >
            <ClipboardList className="w-5 h-5 mr-2 text-muted group-hover:text-foreground transition-colors duration-300" />
            <span className="text-base sm:text-lg font-medium tracking-wide">
              Request an Engineering Feasibility Study
            </span>
          </Button>
        </div>

      </div>
    </section>
  );
}
