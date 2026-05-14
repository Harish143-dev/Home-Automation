'use client';

import React, { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsapSetup';
import { useReducedMotion } from '../../hooks/useReducedMotion';

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
        start: 'top 72%',
        toggleActions: 'play none none reverse',
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
      start: 'top 85%',
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
      className="relative w-full overflow-hidden border-y border-white/10 bg-black py-16 sm:py-20 md:py-24 text-white lg:py-32"
    >
      <div className="absolute inset-x-0 top-8 sm:top-10 md:top-12 text-center text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.3em] text-white/45 md:top-16 md:text-xs">
        Engineered with the World&apos;s Best
      </div>

      {/* Advanced Layout: Custom Edge Masks for smooth fade & blur effect while maintaining center focus visibility. */}
      {/* Left Mask */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24 bg-black/80 backdrop-blur-[4px] [mask-image:linear-gradient(to_right,black_20%,transparent_100%)] md:w-48 lg:w-64" />
      {/* Right Mask */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24 bg-black/80 backdrop-blur-[4px] [mask-image:linear-gradient(to_left,black_20%,transparent_100%)] md:w-48 lg:w-64" />

      {/* Interactive Main Ticker Row */}
      <div 
        className="group/ticker mt-10 sm:mt-14 md:mt-20 flex w-max pointer-events-auto"
        onMouseEnter={pauseLoop}
        onMouseLeave={playLoop}
        ref={trackRef}
      >
        {LOOPED_BRANDS.map((brand, i) => (
          <div 
            key={i}
            className="brand-item flex-shrink-0 px-6 sm:px-10 md:px-16 lg:px-24 flex items-center justify-center cursor-default opacity-55 transition-all duration-500 ease-out group-hover/ticker:opacity-25 hover:!opacity-100 hover:scale-105"
          >
            {/* Generic Typography Placeholder (Replaces Logo Assets Natively) */}
            <span className="text-base font-bold uppercase tracking-[0.08em] text-white sm:text-xl sm:tracking-[0.1em] md:text-2xl md:tracking-[0.12em] lg:text-4xl lg:tracking-[0.15em]" style={{ fontFamily: 'var(--font-display)'}}>
              {brand}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
