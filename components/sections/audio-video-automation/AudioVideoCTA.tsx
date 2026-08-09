'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { Button } from '../../ui/button';
import Link from 'next/link';

export function AudioVideoCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.fromTo('.cta-content-anim',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 relative flex flex-col items-center justify-center w-full bg-background overflow-hidden px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/[0.03]"
    >
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-accent/[0.03] blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-[1440px] mx-auto w-full">

        {/* Minimal Section Label */}
        <div className="cta-content-anim flex items-center gap-4 mb-10">
          <div className="h-[1px] w-12 bg-black/20" />
          <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-accent">Next Steps</span>
          <div className="h-[1px] w-12 bg-black/20" />
        </div>

        <h2 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl cta-content-anim text-foreground text-balance mb-8">
          Bring Every Moment to Life with <br className="hidden md:block" /> Intelligent Audio & Video Integration
        </h2>

        <p className="cta-content-anim text-lg md:text-xl font-light tracking-wide text-muted leading-relaxed text-balance max-w-3xl mx-auto mb-12">
          From immersive home theatres to whole-home audio and smart entertainment control, we'll design a solution tailored to your lifestyle, your home, and the way you enjoy every moment.
        </p>

        <div className="cta-content-anim flex flex-col sm:flex-row items-center gap-5 sm:gap-6 w-full sm:w-auto">
          <Link href="/contact" className="w-full sm:w-auto">
            <Button
              variant="interactive"
              size="lg"
              className="w-full sm:w-auto"
            >
              Schedule a Free Consultation
            </Button>
          </Link>
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Talk to an AV Expert
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
