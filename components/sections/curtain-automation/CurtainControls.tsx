'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { LayoutGrid, Smartphone, Mic, Clock } from 'lucide-react';

const CONTROLS = [
  {
    title: 'Smart Wall Keypads',
    description: 'Control individual or grouped shades with one touch.',
    icon: LayoutGrid,
  },
  {
    title: 'Mobile App',
    description: 'Adjust shades, schedules, and scenes from your smartphone.',
    icon: Smartphone,
  },
  {
    title: 'Voice Control',
    description: 'Compatible with Amazon Alexa, Google Assistant, and Apple Siri.',
    icon: Mic,
  },
  {
    title: 'Automated Schedules',
    description: 'Set shades to open and close automatically based on time of day or changing daylight conditions.',
    icon: Clock,
  },
];

export function CurtainControls() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    // Header animation
    gsap.fromTo('.control-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Cards animation
    gsap.fromTo('.control-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.controls-grid',
          start: 'top 85%',
        }
      }
    );
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-12 md:py-16 relative w-full bg-background px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/5">
      <div className="max-w-7xl w-full mx-auto">

        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base control-header text-accent mb-4 block">
            Seamless Interfaces
          </span>
          <h2 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl control-header text-foreground text-balance">
            Multiple Ways to Control Your Shades
          </h2>
        </div>

        <div className="controls-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {CONTROLS.map((control, idx) => (
            <div
              key={idx}
              className="control-card bg-panel p-5 md:p-6 rounded-2xl border border-border shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow duration-500"
            >
              <div className="w-12 h-12 rounded-full bg-secondary/5 flex items-center justify-center mb-2">
                <control.icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
              </div>
              <h4 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground">
                {control.title}
              </h4>
              <p className="text-sm sm:text-base md:text-lg font-light text-muted leading-relaxed">
                {control.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
