'use client';

import React, { useRef } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '../../ui/button';
import { gsap, ScrollTrigger, useGSAP, SplitText } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

export function CallToActionSection() {
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
      className="relative flex flex-col items-center justify-center w-full bg-background overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32 px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/[0.03]"
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
          <span className="text-sm md:text-base font-normal tracking-widest text-accent">Next Steps</span>
          <div className="h-[1px] w-12 bg-black/20" />
        </div>

        {/* Oversized Clean Headline */}
        <h2
          ref={headlineRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-foreground leading-[1.2] mb-8"
        >
          Ready to Transform <br className="hidden md:block" /> Your Space?
        </h2>

        <p className="cta-subhead text-lg md:text-xl text-muted font-light max-w-2xl mx-auto leading-relaxed mb-12">
          Experience seamless automation designed around your lifestyle and business needs. Schedule your exclusive consultation today.
        </p>

        {/* Standard Project Buttons */}
        <div className="cta-btn-group flex flex-col sm:flex-row items-center gap-5 sm:gap-6 w-full sm:w-auto">
          {/* Primary CTA */}
          <Button
            variant="accent"
            size="lg"
            shape="full"
            className="group relative w-full sm:w-auto overflow-hidden"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[sweep_1s_ease-in-out_forwards]" />
            <span className="relative z-10">
              Book Consultation
            </span>
            <ArrowRight className="relative z-10 w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>

          {/* Secondary CTA */}
          <Button
            variant="outline"
            size="lg"
            shape="full"
            className="group w-full sm:w-auto"
          >
            <Phone className="w-5 h-5 mr-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            <span>
              Call Now
            </span>
          </Button>
        </div>

      </div>
    </section>
  );
}
