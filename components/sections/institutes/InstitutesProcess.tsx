'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { DURATION, EASE } from '@/lib/animation.config';

const STEPS = [
  {
    title: "Understand Campus Requirements",
    description: "Assess the institution’s spaces, requirements, and technology needs."
  },
  {
    title: "Design the Solution",
    description: "Develop an integrated automation plan tailored to the campus."
  },
  {
    title: "System Integration & Installation",
    description: "Deploy and integrate automation, AV, networking, security, and control systems."
  },
  {
    title: "Testing & Commissioning",
    description: "Test all systems and ensure reliable performance before handover."
  },
  {
    title: "Ongoing Support",
    description: "Provide service, monitoring, and support to keep campus systems performing efficiently."
  }
];

export function InstitutesProcess() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    const cards = gsap.utils.toArray('.process-step');

    cards.forEach((card: any, i) => {
      gsap.fromTo(card,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DURATION.normal,
          ease: EASE.reveal,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        }
      );
    });

    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-panel text-foreground border-t border-black/5">
      <div className="max-w-5xl mx-auto flex flex-col items-center relative">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto z-10 py-6 px-4 mb-16 lg:mb-24">
          <span className="tracking-[0.1em] text-accent mb-4 block text-sm font-medium">
            Approach
          </span>
          <h2 className="text-foreground text-balance">
            Our Process
          </h2>
        </div>

        {/* Timeline */}
        <div className="w-full max-w-2xl relative flex flex-col items-start mx-auto">
          {/* Vertical connecting line */}
          <div className="absolute top-4 bottom-4 left-[23px] w-[1px] bg-black/10" />

          {STEPS.map((step, idx) => (
            <div key={idx} className="process-step w-full flex items-center relative mb-8 last:mb-0 group">

              {/* Center Node */}
              <div className="w-12 h-12 rounded-full bg-background border border-black/10 flex items-center justify-center shrink-0 z-10 group-hover:border-accent group-hover:bg-accent/5 transition-colors duration-500 shadow-sm">
                <span className="font-display text-muted-foreground group-hover:text-accent transition-colors duration-500">
                  {idx + 1}
                </span>
              </div>

              {/* Content Box */}
              <div className="ml-8 w-full flex flex-col gap-2 bg-background border border-black/5 rounded-2xl p-6 group-hover:border-black/10 hover:shadow-xl hover:shadow-black/5 transition-all duration-500">
                <h4 className="text-foreground text-balance">
                  {step.title}
                </h4>
                <p className="text-muted-foreground font-light text-sm md:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
