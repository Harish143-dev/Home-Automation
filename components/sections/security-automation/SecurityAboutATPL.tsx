'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

export function SecurityAboutATPL() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    gsap.fromTo(textRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-20 md:py-32 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative">
        
        <div ref={textRef} className="flex flex-col items-center gap-8">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground text-balance">
            Why Choose Anusha Technovision
          </h2>
          
          <p className="text-lg md:text-2xl font-light text-muted-foreground leading-relaxed text-balance">
            For over 24 years, ATPL has been delivering intelligent lighting control and home automation solutions that combine world-class technology, expert execution, and dependable after-sales support. Trusted by homeowners across India, we create smart homes that are reliable, and built for the future.
          </p>

          <div className="w-16 h-[1px] bg-accent mt-4"></div>
        </div>

      </div>
    </section>
  );
}
