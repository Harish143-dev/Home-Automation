'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

export function PublicAreasIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    gsap.fromTo(textRef.current?.children ? Array.from(textRef.current.children) : [],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
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
    <section ref={sectionRef} className="py-12 md:py-16 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative">

        <div ref={textRef} className="flex flex-col items-center gap-6">
          <h2 className=" text-foreground text-balance">
            First Impressions Begin in Your Public Spaces
          </h2>

          <p className="text-lg md:text-2xl font-light text-foreground/80 leading-relaxed text-balance mt-4">
            From the moment guests step into your hotel, every interaction shapes their perception. Intelligent automation brings together lighting, motorized shades, background music, climate control, networking, displays, and security to create welcoming, comfortable, and consistently managed public spaces.
          </p>

          <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance mt-2">
            Transform public spaces into welcoming, efficient, and connected environments. ATPL's automation solutions enhance guest comfort, simplify operations, improve energy efficiency, and ensure a consistent experience across every shared space.
          </p>

          <div className="w-16 h-[1px] bg-accent mt-8 opacity-0"></div>
        </div>

      </div>
    </section>
  );
}
