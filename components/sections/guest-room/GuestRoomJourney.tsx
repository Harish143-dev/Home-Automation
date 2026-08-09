'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const JOURNEY_STEPS = [
  {
    title: "Guest Check-in",
    description: "The room is automatically prepared before the guest arrives, creating a welcoming environment from the moment they enter."
  },
  {
    title: "Welcome Scene",
    description: "Lighting, motorized shades, and HVAC are automatically set to predefined comfort settings upon arrival."
  },
  {
    title: "Stay Experience",
    description: "Guests can easily personalize lighting, temperature, and shades to suit their preferences throughout their stay."
  },
  {
    title: "Sleep Mode",
    description: "With a single touch, lights dim, shades close, and the room temperature adjusts to create a comfortable sleeping environment."
  },
  {
    title: "Checkout",
    description: "The room automatically switches to energy-saving mode, and the room status is updated for housekeeping and hotel operations."
  }
];

export function GuestRoomJourney() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    const cards = gsap.utils.toArray('.journey-step');

    cards.forEach((card: any, i) => {
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
          <h2 className="text-foreground text-balance mb-6">
            Designed Around the Complete Guest Journey
          </h2>
          <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance">
            Every stage of the guest journey is intelligently automated to deliver comfort, convenience, and operational efficiency.
          </p>
        </div>

        {/* Timeline */}
        <div className="w-full max-w-2xl relative flex flex-col items-start mx-auto">
          {/* Vertical connecting line */}
          <div className="absolute top-4 bottom-4 left-[23px] w-[1px] bg-black/10" />

          {JOURNEY_STEPS.map((step, idx) => (
            <div key={idx} className="journey-step w-full flex items-start relative mb-12 last:mb-0 group">

              {/* Center Node */}
              <div className="w-12 h-12 mt-1 rounded-full bg-background border border-black/10 flex items-center justify-center shrink-0 z-10 group-hover:border-accent group-hover:bg-accent/5 transition-colors duration-500">
                <span className="text-muted-foreground group-hover:text-accent transition-colors duration-500 font-light">
                  {idx + 1}
                </span>
              </div>

              {/* Content Box */}
              <div className="ml-8 w-full">
                <div className="bg-panel border border-black/5 rounded-2xl p-8 w-full group-hover:border-black/10 hover:shadow-xl hover:shadow-black/5 transition-all duration-500">
                  <h3 className="text-foreground mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
