'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '../../ui/button';
import { gsap, useGSAP, SplitText } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

export function CurtainCTA() {
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
      className="py-16 md:py-24 relative flex flex-col items-center justify-center w-full bg-background overflow-hidden px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/[0.03]"
    >
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-accent/[0.03] blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-[1440px] mx-auto w-full">
        
        {/* Minimal Section Label */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-[1px] w-12 bg-black/20" />
          <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-accent">Next Steps</span>
          <div className="h-[1px] w-12 bg-black/20" />
        </div>

        <h2 
          ref={headlineRef}
          className="text-foreground mb-8"
        >
          Experience the Perfect Balance <br className="hidden md:block" /> of Comfort, Privacy
        </h2>
        
        <p className="cta-subhead text-lg md:text-xl text-muted font-light max-w-2xl mx-auto leading-relaxed mb-12">
          Let our experts design a motorized shading solution tailored to your home, lifestyle, and interior aesthetics. Discover how intelligent curtain automation can elevate everyday living.
        </p>
        
        <div className="cta-btn-group flex flex-col sm:flex-row items-center gap-5 sm:gap-6 w-full sm:w-auto">
          <Link href="#consultation" className="w-full sm:w-auto">
            <Button
            variant="interactive"
            size="lg"
            className="w-full sm:w-auto"
          >
            Schedule a Free Consultation
          </Button>
          </Link>
          <Link href="#contact" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Talk to a Smart Home Expert
              </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
