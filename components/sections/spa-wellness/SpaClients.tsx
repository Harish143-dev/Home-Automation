'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const HOSPITALITY_BRANDS = [
  'ITC', 'Marriott', 'Four Seasons', 'Taj', 'Hilton', 'Hyatt', 'Oberoi', 'IHG'
];

export function SpaClients() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    // Animate header text
    gsap.fromTo('.client-header-text',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-12 md:py-16 relative w-full bg-background px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden border-t border-black/5">
      <div className="max-w-7xl w-full mx-auto mb-16 md:mb-24">
        <div className="max-w-4xl flex flex-col items-center text-center mx-auto">
          <h5 className="client-header-text text-accent mb-4 block">
            Prestigious Portfolio
          </h5>
          <h2 className="client-header-text text-foreground mb-8 text-balance">
            Trusted by the World's Leading Hospitality Brands
          </h2>
          <p className="client-header-text text-muted-foreground leading-relaxed text-balance max-w-2xl">
            ATPL partners with the most prestigious hospitality brands across the globe, delivering uncompromising quality and cutting-edge automation to elevate guest experiences in premium spa and wellness spaces.
          </p>
        </div>
      </div>

      {/* Hospitality Marquee */}
      <div className="max-w-7xl w-full mx-auto pb-16 md:pb-24">
        <div className="w-full bg-accent/[0.03] border border-accent/10 rounded-[2rem] py-12 md:py-16 overflow-hidden flex flex-col items-center">
          <h5 className="text-accent mb-8 md:mb-12">
            Our Hospitality Partners
          </h5>
          <div className="w-[150%] md:w-[120%] flex overflow-hidden opacity-80 group">
            <div className="flex gap-16 md:gap-24 items-center whitespace-nowrap animate-marquee-left">
              {/* Render 4 sets to ensure infinite seamless scrolling */}
              {[...HOSPITALITY_BRANDS, ...HOSPITALITY_BRANDS, ...HOSPITALITY_BRANDS, ...HOSPITALITY_BRANDS].map((brand, i) => (
                <span key={i} className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-foreground hover:text-accent transition-colors duration-300">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
