'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { DURATION, EASE } from '../../../lib/animation.config';
import { CheckCircle2 } from 'lucide-react';

const WHY_POINTS = [
  "Over 24 Years of automation expertise",
  "Over 1,000 projects successfully delivered",
  "Over 650 residences automated",
  "Over 250 hospitality projects completed and over 2500 Guest rooms",
  "Over 100 commercial projects delivered",
  "Experience Centres in Delhi, Mumbai & Bangalore"
];

export function AirportLoungesWhyATPL() {
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    });

    tl.fromTo('.why-header',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: DURATION.normal, stagger: 0.1, ease: EASE.reveal }
    );

    itemsRef.current.forEach((el, i) => {
      if (!el) return;
      tl.fromTo(el,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        "-=0.4"
      );
    });

    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-16 md:py-24 relative w-full bg-background px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
        
        {/* Left: Content */}
        <div className="w-full lg:w-[45%] flex flex-col gap-6">
          <h5 className="why-header text-accent block">
            Why Choose Us
          </h5>
          <h2 className="why-header text-foreground text-balance">
            Why Choose Anusha Technovision
          </h2>
          <p className="why-header text-lg font-light text-muted-foreground leading-relaxed">
            For over 24 years, ATPL has been delivering intelligent lighting control and home automation solutions that combine world-class technology, expert execution, and dependable after-sales support. Trusted by luxury homeowners across India, we create smart spaces that are reliable, and built for the future.
          </p>
        </div>

        {/* Right: Points */}
        <div className="w-full lg:w-[55%] bg-panel rounded-3xl p-8 md:p-12 border border-black/5">
          <div className="grid grid-cols-1 gap-y-6">
            {WHY_POINTS.map((point, i) => (
              <div 
                key={i}
                ref={el => { itemsRef.current[i] = el; }}
                className="flex items-start gap-4 opacity-0"
              >
                <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                <span className="text-sm md:text-base text-foreground font-light leading-relaxed">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
