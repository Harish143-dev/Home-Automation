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
      className="relative flex flex-col items-center justify-center w-full bg-background overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32 px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/[0.03]"
    >
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-accent/[0.03] blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-[1440px] mx-auto w-full">
        
        {/* Minimal Section Label */}
        <div className="cta-content-anim flex items-center gap-4 mb-10">
          <div className="h-[1px] w-12 bg-black/20" />
          <span className="text-sm md:text-base font-normal tracking-widest text-accent">Next Steps</span>
          <div className="h-[1px] w-12 bg-black/20" />
        </div>
        
        <h2 className="cta-content-anim text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-[1.2] text-foreground text-balance mb-8">
          Bring Every Moment to Life with <br className="hidden md:block" /> Intelligent Audio & Video Integration
        </h2>
        
        <p className="cta-content-anim text-lg md:text-xl font-light tracking-wide text-muted leading-relaxed text-balance max-w-3xl mx-auto mb-12">
          From immersive home theatres to whole-home audio and smart entertainment control, we'll design a solution tailored to your lifestyle, your home, and the way you enjoy every moment.
        </p>
        
        <div className="cta-content-anim flex flex-col sm:flex-row items-center gap-5 sm:gap-6 w-full sm:w-auto">
          <Link href="/contact" className="w-full sm:w-auto">
            <Button 
              variant="accent" 
              size="lg" 
              shape="full"
              className="group relative w-full sm:w-auto overflow-hidden px-10 tracking-wider"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[sweep_1s_ease-in-out_forwards]" />
              <span className="relative z-10">
                Schedule a Free Consultation
              </span>
              <ArrowRight className="relative z-10 w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
          <Link href="/contact" className="w-full sm:w-auto">
            <Button 
              variant="outline" 
              size="lg" 
              shape="full"
              className="group w-full sm:w-auto px-10 tracking-wider"
            >
              <PhoneCall className="w-5 h-5 mr-3 opacity-50 group-hover:opacity-100 group-hover:-rotate-12 transition-all duration-300" />
              <span>
                Talk to an AV Expert
              </span>
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
