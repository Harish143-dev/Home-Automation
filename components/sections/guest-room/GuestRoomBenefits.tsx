'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Check } from 'lucide-react';

const GUEST_BENEFITS = [
  "Personalized room experiences",
  "Intuitive one-touch controls",
  "Enhanced comfort and convenience",
  "Customized lighting and ambience",
  "Improved sleep environment",
  "A connected and modern hospitality experience"
];

const MANAGEMENT_BENEFITS = [
  "Reduced energy consumption",
  "Lower operating costs",
  "Centralized room monitoring and control",
  "Improved maintenance efficiency",
  "Faster housekeeping coordination",
  "Enhanced guest satisfaction and operational efficiency"
];

export function GuestRoomBenefits() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.fromTo('.gr-benefits-header',
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

    gsap.fromTo(leftRef.current,
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: leftRef.current,
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(rightRef.current,
      { x: 30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rightRef.current,
          start: "top 80%",
        }
      }
    );

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-12 md:py-16 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-panel text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-16 relative">

        {/* Header */}
        <div className="gr-benefits-header text-center max-w-4xl mx-auto">
          <h2 className="text-foreground text-balance">
            The Advantages of Intelligent Automation
          </h2>
        </div>

        {/* Benefits Split */}
        <div className="w-full flex flex-col lg:flex-row gap-8 md:gap-12">

          {/* Guests Column */}
          <div ref={leftRef} className="w-full lg:w-1/2 bg-background border border-black/5 rounded-[2rem] p-8 md:p-12 hover:shadow-xl hover:border-black/10 transition-all duration-500">
            <h3 className="text-foreground mb-8 text-balance">
              For Guests
            </h3>
            <ul className="flex flex-col gap-5">
              {GUEST_BENEFITS.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="w-6 h-6 shrink-0 mt-0.5 rounded-full bg-accent/10 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-accent" strokeWidth={2.5} />
                  </div>
                  <span className="text-base md:text-lg text-muted-foreground font-light leading-relaxed">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Management Column */}
          <div ref={rightRef} className="w-full lg:w-1/2 bg-accent/5 border border-accent/10 rounded-[2rem] p-8 md:p-12 hover:shadow-xl hover:border-accent/20 transition-all duration-500">
            <h3 className="text-foreground mb-8 text-balance">
              For Hotel Management
            </h3>
            <ul className="flex flex-col gap-5">
              {MANAGEMENT_BENEFITS.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="w-6 h-6 shrink-0 mt-0.5 rounded-full bg-accent/20 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-accent" strokeWidth={2.5} />
                  </div>
                  <span className="text-base md:text-lg text-foreground/80 font-light leading-relaxed">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
