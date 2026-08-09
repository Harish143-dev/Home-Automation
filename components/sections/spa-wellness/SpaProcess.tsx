'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const STEPS = [
  {
    title: "Guest Arrival",
    features: [
      "Welcome lighting scene activates",
      "Soft background music begins",
      "Comfortable room temperature is maintained"
    ]
  },
  {
    title: "Treatment Begins",
    features: [
      "Therapy lighting scene is selected",
      "Automated climate adjusts for comfort",
      "Shades close to ensure privacy"
    ]
  },
  {
    title: "Relaxation Mode",
    features: [
      "Lighting, music, and HVAC work together",
      "Calm ambience is maintained throughout the session",
      "One-touch control for personalized settings"
    ]
  },
  {
    title: "Treatment Ends",
    features: [
      "Lighting gradually transitions to Exit Mode",
      "Background music softens",
      "Room automatically resets for the next guest"
    ]
  }
];

export function SpaProcess() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    const cards = gsap.utils.toArray('.process-step');

    cards.forEach((card: any) => {
      gsap.fromTo(card,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
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
    <section ref={containerRef} className="py-12 md:py-16 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5">
      <div className="max-w-5xl mx-auto flex flex-col items-center relative">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto z-10 py-6 px-4 mb-16 lg:mb-24">
          <h5 className="text-accent mb-4 block">
            Guest Journey
          </h5>
          <h2 className="text-foreground text-balance mb-6">
            One Touch. The Perfect Wellness Experience.
          </h2>
          <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance max-w-2xl mx-auto">
            Control lighting, audio, HVAC, and shades from a single interface to deliver a comfortable, consistent, and personalized spa experience while simplifying operations.
          </p>
        </div>

        {/* Timeline */}
        <div className="w-full max-w-2xl relative flex flex-col items-start mx-auto">
          {/* Vertical connecting line */}
          <div className="absolute top-4 bottom-4 left-[23px] w-[1px] bg-black/10" />

          {STEPS.map((step, idx) => (
            <div key={idx} className="process-step w-full flex items-start relative mb-12 last:mb-0 group">

              {/* Center Node */}
              <div className="w-12 h-12 rounded-full bg-background border border-black/10 flex items-center justify-center shrink-0 z-10 group-hover:border-accent group-hover:bg-accent/5 transition-colors duration-500 mt-2">
                <span className="font-display text-muted-foreground group-hover:text-accent transition-colors duration-500">
                  {idx + 1}
                </span>
              </div>

              {/* Content Box */}
              <div className="ml-8 w-full">
                <div className="bg-panel border border-black/5 rounded-2xl p-8 w-full group-hover:border-black/10 hover:shadow-xl hover:shadow-black/5 transition-all duration-500">
                  <h4 className="text-foreground text-balance mb-4">
                    {step.title}
                  </h4>
                  <ul className="space-y-3 border-t border-black/5 pt-4">
                    {step.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                        <span className="text-accent mr-3 mt-1 flex-shrink-0">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
