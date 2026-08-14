'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { 
  Lightbulb, 
  MonitorPlay, 
  Blinds, 
  Thermometer, 
  ShieldCheck, 
  Presentation, 
  Wifi, 
  LayoutDashboard 
} from 'lucide-react';
import { DURATION, EASE, STAGGER } from '@/lib/animation.config';

const SOLUTIONS = [
  {
    title: "Lighting Automation",
    description: "Automated lighting control with dimming, occupancy sensing, daylight harvesting, and scheduling.",
    icon: Lightbulb
  },
  {
    title: "Audio & Video Integration",
    description: "Video conferencing, presentation systems, displays, and distributed audio for connected workspaces.",
    icon: MonitorPlay
  },
  {
    title: "Motorized Shades & Daylight Control",
    description: "Automated shades that manage daylight, glare, and solar heat while supporting energy efficiency.",
    icon: Blinds
  },
  {
    title: "HVAC Integration",
    description: "Connect HVAC with occupancy and other building systems for coordinated temperature control and energy management.",
    icon: Thermometer
  },
  {
    title: "Security & Access Control",
    description: "Integrated CCTV, access control, and security systems for better visibility and workplace management.",
    icon: ShieldCheck
  },
  {
    title: "Digital Signage & Video Walls",
    description: "Digital displays and video walls for reception areas, meeting rooms, and shared spaces.",
    icon: Presentation
  },
  {
    title: "Wi-Fi & Networking",
    description: "Reliable network infrastructure supporting automation, AV, conferencing, and connected workplace systems.",
    icon: Wifi
  },
  {
    title: "Centralized Control & Management",
    description: "Monitor and control lighting, shades, AV, and other connected systems through a centralized interface.",
    icon: LayoutDashboard
  }
];

export function OfficeSolutions() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

    tl.fromTo('.os-header',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: DURATION.normal, stagger: STAGGER.normal, ease: EASE.reveal }
    )
    .fromTo('.os-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DURATION.normal,
        stagger: STAGGER.tight,
        ease: EASE.reveal,
      },
      "-=0.4"
    );

    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center relative">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto z-10 py-6 px-4 mb-12 lg:mb-16">
          <span className="os-header tracking-[0.1em] text-accent mb-4 block uppercase text-sm font-medium">
            Core Technologies
          </span>
          <h2 className="os-header font-light leading-[1.2] tracking-wide text-3xl sm:text-4xl text-foreground text-balance mb-6">
            Our Smart Office Automation Solutions
          </h2>
          <p className="os-header text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance">
            Integrated technologies designed to simplify workplace operations and enhance business performance.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {SOLUTIONS.map((solution, idx) => (
            <div
              key={idx}
              className="os-card bg-panel border border-black/5 rounded-[2rem] p-8 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 flex flex-col"
            >
              <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center mb-6 shrink-0">
                <solution.icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
              </div>

              <h4 className="font-light leading-[1.2] tracking-wide text-xl text-foreground mb-3 text-balance">
                {solution.title}
              </h4>

              <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                {solution.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
