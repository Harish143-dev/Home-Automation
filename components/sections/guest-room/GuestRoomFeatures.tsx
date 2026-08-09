'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Lightbulb, Thermometer, Blinds, LayoutGrid, Leaf, BellRing, Smartphone, Activity } from 'lucide-react';

const FEATURES = [
  {
    title: "Lighting Management",
    description: "Create customized lighting scenes for arrival, reading, relaxation, and sleep with simple one-touch control.",
    icon: Lightbulb,
  },
  {
    title: "Climate Control",
    description: "Maintain a comfortable room temperature while optimizing HVAC performance and energy usage.",
    icon: Thermometer,
  },
  {
    title: "Motorized Curtains & Blinds",
    description: "Control natural daylight and privacy automatically or on demand for enhanced guest comfort.",
    icon: Blinds,
  },
  {
    title: "Guest Room Keypad",
    description: "Custom-engraved bedside keypads provide intuitive control of lighting, shades, temperature, and room functions.",
    icon: LayoutGrid,
  },
  {
    title: "Energy Management",
    description: "Automatically adjust lighting and HVAC based on guest presence to reduce unnecessary energy consumption.",
    icon: Leaf,
  },
  {
    title: "Do Not Disturb / Make Up Room",
    description: "Integrated DND and MMR indicators enable clear communication between guests and hotel staff.",
    icon: BellRing,
  },
  {
    title: "Mobile & Touch Control",
    description: "Optional control through a smartphone, tablet, or in-room touch panel for added convenience.",
    icon: Smartphone,
  },
  {
    title: "Centralized Monitoring",
    description: "Monitor room status, occupancy, energy usage, and system performance through a centralized dashboard.",
    icon: Activity,
  }
];

export function GuestRoomFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.fromTo('.gr-feature-header',
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

    gsap.fromTo(itemsRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-12 md:py-16 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-panel text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-16 lg:gap-20 relative">

        {/* Header */}
        <div className="gr-feature-header text-center max-w-4xl mx-auto">
          <h2 className="text-foreground text-balance mb-6">
            Everything Your Guest Needs. Controlled Intelligently.
          </h2>
          <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance">
            Integrate every essential guest room function into one intuitive automation platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              ref={el => { itemsRef.current[idx] = el; }}
              className="group flex flex-col items-start gap-5 p-8 rounded-3xl bg-background border border-black/5 hover:border-black/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:scale-110 transition-all duration-500">
                <feature.icon className="w-5 h-5 text-accent group-hover:text-primary transition-colors duration-500" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-foreground mb-3 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
