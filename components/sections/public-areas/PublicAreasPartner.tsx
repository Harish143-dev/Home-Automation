'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

export function PublicAreasPartner() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current || !cardRef.current) return;

    // Header Animation
    gsap.fromTo('.partner-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Card Animation
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
        }
      }
    );

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-12 md:py-16 relative w-full bg-panel px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/5">
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center">

        {/* Header */}
        <div className="text-center max-w-4xl mb-12 md:mb-16">
          <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base partner-header text-accent mb-4 block">
            Technology Partner
          </span>
          <h2 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl partner-header text-foreground text-balance">
            Powered by Industry Leaders
          </h2>
        </div>

        {/* Single Partner Card */}
        <div
          ref={cardRef}
          className="w-full max-w-4xl bg-white rounded-3xl md:rounded-[2.5rem] p-8 md:p-12 lg:p-16 border border-black/5 shadow-xl shadow-black/5 flex flex-col group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
        >
          {/* Content Area */}
          <div className="flex flex-col text-center justify-center">
            <h3 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground mb-6">
              Lutron
            </h3>

            <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              As a leading designer and manufacturer of energy-saving products, Lutron understands the importance of protecting our environment and preserving our precious resources for future generations. Since our founding, we have developed innovative products that save energy, reduce waste, enhance efficiency, and improve people's lifestyles.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
