'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const BRANDS = [
  'LUTRON',
  'CRESTRON',
  'CONTROL4',
  'SAVANT',
  'SONOS',
  'KNX',
  'BANG & OLUFSEN',
];

export function BrandTicker() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    
    // 1. Initial Intro Fade-In
    gsap.from(trackRef.current, {
      opacity: 0,
      y: 10,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 90%',
      }
    });

    if (prefersReducedMotion) {
      return;
    }

    // 2. Seamless Infinite Loop Tracker
    // The track width will exactly double since we duplicate the array. By shifting -50%, it seamlessly completes exactly 1 full rotation.
    tlRef.current = gsap.timeline({ repeat: -1 });
    tlRef.current.to(trackRef.current, {
      xPercent: -50,
      ease: 'none',
      duration: 25, // Calm, slow pace continuous standard
    });

    // 3. Scroll Velocity Boost — scoped to section viewport (audit M4)
    // Previously used document.body as trigger which fired on every scroll pixel across the entire page.
    let timeout: ReturnType<typeof setTimeout>;
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        if (!tlRef.current) return;
        
        // Check scroll velocity and apply mathematical boost to timeScale
        const velocity = Math.abs(self.getVelocity());
        if (velocity > 0) {
          const maxClampSpeed = 4;
          const timeScale = 1 + (velocity / 300);
          
          // Boost speed
          gsap.to(tlRef.current, { 
            timeScale: Math.min(timeScale, maxClampSpeed), 
            duration: 0.2, 
            ease: 'power2.out' 
          });
          
          // Revert back safely
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            gsap.to(tlRef.current, { 
              timeScale: 1, 
              duration: 0.8, 
              ease: 'power2.out' 
            });
          }, 100);
        }
      }
    });

  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  const pauseLoop = () => gsap.to(tlRef.current, { timeScale: 0, duration: 0.6, ease: 'power2.out' });
  const playLoop = () => gsap.to(tlRef.current, { timeScale: 1, duration: 0.6, ease: 'power2.out' });

  // Array duplicated specifically to allow standard -50% complete track transformation.
  const LOOPED_BRANDS = [...BRANDS, ...BRANDS];

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-white py-24 md:py-32 overflow-hidden border-t border-black/5"
    >
      <div className="absolute inset-x-0 top-12 md:top-16 text-center text-[10px] md:text-xs tracking-[0.3em] font-medium uppercase text-foreground/30">
        Engineered with the World&apos;s Best
      </div>

      {/* Advanced Layout: Custom Edge Masks for smooth fade & blur effect while maintaining center focus visibility. */}
      {/* Left Mask */}
      <div className="absolute z-10 inset-y-0 left-0 w-24 md:w-64 bg-white/30 pointer-events-none backdrop-blur-[4px] [mask-image:linear-gradient(to_right,black_20%,transparent_100%)]" />
      {/* Right Mask */}
      <div className="absolute z-10 inset-y-0 right-0 w-24 md:w-64 bg-white/30 pointer-events-none backdrop-blur-[4px] [mask-image:linear-gradient(to_left,black_20%,transparent_100%)]" />

      {/* Interactive Main Ticker Row */}
      <div 
        className="mt-16 md:mt-20 flex w-max pointer-events-auto"
        onMouseEnter={pauseLoop}
        onMouseLeave={playLoop}
        ref={trackRef}
      >
        {LOOPED_BRANDS.map((brand, i) => (
          <div 
            key={i}
            className="flex-shrink-0 px-12 md:px-24 flex items-center justify-center transition-opacity duration-500 ease-out opacity-30 hover:opacity-100 cursor-default"
          >
            {/* Generic Typography Placeholder (Replaces Logo Assets Natively) */}
            <span className="text-xl sm:text-2xl md:text-4xl font-bold tracking-[0.1em] sm:tracking-[0.15em] text-foreground uppercase" style={{ fontFamily: 'var(--font-display)'}}>
              {brand}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
