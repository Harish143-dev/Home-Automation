'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { DURATION, EASE } from '@/lib/animation.config';

const WORKFLOW_STEPS = [
  {
    title: "1. Start the Workday",
    description: "Lights, shades, and climate adjust according to scheduled office timings."
  },
  {
    title: "2. Enter the Meeting Room",
    description: "Lighting, shades, display, and conferencing systems are ready for the meeting."
  },
  {
    title: "3. Present & Collaborate",
    description: "Control displays, audio, video conferencing, and room settings from one interface."
  },
  {
    title: "4. Adjust the Workspace",
    description: "Control lighting, temperature, shades, and AV based on individual requirements."
  },
  {
    title: "5. Secure the Office",
    description: "Monitor access, security systems, and connected devices from a centralized platform."
  },
  {
    title: "6. End the Workday",
    description: "Automate lights, AV, and other systems based on schedules or occupancy."
  }
];

export function OfficeWorkflow() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    const cards = gsap.utils.toArray('.workflow-step');

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
          <span className="tracking-[0.1em] text-accent mb-4 block uppercase text-sm font-medium">
            A Day in the Life
          </span>
          <h2 className="text-foreground text-balance mb-6">
            Experience One-Touch Workplace Automation
          </h2>
          <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance">
            Control everyday office functions from a single interface for efficient, connected workspaces.
          </p>
        </div>

        {/* Timeline */}
        <div className="w-full max-w-2xl relative flex flex-col items-start mx-auto">
          {/* Vertical connecting line */}
          <div className="absolute top-4 bottom-4 left-[23px] w-[1px] bg-black/10" />

          {WORKFLOW_STEPS.map((step, idx) => (
            <div key={idx} className="workflow-step w-full flex items-start relative mb-12 last:mb-0 group">

              {/* Center Node */}
              <div className="w-12 h-12 mt-1 rounded-full bg-background border border-black/10 flex items-center justify-center shrink-0 z-10 group-hover:border-accent group-hover:bg-accent/5 transition-colors duration-500 shadow-sm">
                <span className="text-muted-foreground group-hover:text-accent transition-colors duration-500 font-light">
                  {idx + 1}
                </span>
              </div>

              {/* Content Box */}
              <div className="ml-8 w-full">
                <div className="bg-background border border-black/5 rounded-[1.5rem] p-8 w-full group-hover:border-black/10 hover:shadow-xl hover:shadow-black/5 transition-all duration-500">
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
