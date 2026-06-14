'use client';

import React, { useRef } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '../../ui/button';
import { gsap, ScrollTrigger, useGSAP, SplitText } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

export function HospitalityCTA() {
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
      className="relative flex flex-col items-center justify-center w-full bg-background overflow-hidden py-20 md:py-32 px-6 border-t border-border"
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
          <span className="tracking-[0.3em] uppercase text-muted">Next Steps</span>
          <div className="h-[1px] w-12 bg-black/20" />
        </div>

        {/* Oversized Clean Headline */}
        <h2
          ref={headlineRef}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] font-light tracking-wide text-foreground leading-[1.2] mb-8"
        >
          Elevate every stay
        </h2>

        <p className="cta-subhead text-lg md:text-xl text-muted font-light tracking-wide max-w-2xl mx-auto leading-relaxed mb-12">
          Transform your property with intelligent automation that improves operational efficiency and delights every guest.
        </p>

        {/* Standard Project Buttons */}
        <div className="cta-btn-group flex flex-col sm:flex-row items-center gap-5 sm:gap-6 w-full sm:w-auto">
          {/* Primary CTA */}
          <Button
            variant="accent"
            size="lg"
            className="group relative h-auto py-4 sm:py-5 px-8 w-full sm:w-auto overflow-hidden rounded-full"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[sweep_1s_ease-in-out_forwards]" />
            <span className="relative z-10 text-base sm:text-lg font-semibold tracking-wide">
              Book Property Consultation
            </span>
            <ArrowRight className="relative z-10 w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>

          {/* Secondary CTA */}
          <Button
            variant="glass"
            size="lg"
            className="group h-auto py-4 sm:py-5 px-8 w-full sm:w-auto border-black/10 text-black hover:bg-black/[0.02] rounded-full"
          >
            <Phone className="w-5 h-5 mr-2 text-black/50 group-hover:text-black transition-colors duration-300" />
            <span className="text-base sm:text-lg font-semibold tracking-wide">
              Speak to our Experts
            </span>
          </Button>
        </div>

      </div>
    </section>
  );
}
