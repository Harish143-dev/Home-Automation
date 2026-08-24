'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  Lightbulb,
  Speaker,
  Tv,
  Video,
  Network,
  ShieldCheck,
  Thermometer,
  LayoutDashboard
} from 'lucide-react';
import { DURATION, EASE, STAGGER } from '@/lib/animation.config';

const SOLUTIONS = [
  {
    title: "Lighting Management Systems",
    description: "Automate lighting across classrooms, libraries, corridors, and common areas for comfort and energy efficiency.",
    icon: Lightbulb
  },
  {
    title: "Audio Distribution Systems",
    description: "Deliver clear announcements, classroom audio, and campus-wide communication.",
    icon: Speaker
  },
  {
    title: "LED Video Wall Solutions",
    description: "Create high-impact digital displays for auditoriums, lobbies, and event spaces.",
    icon: Tv
  },
  {
    title: "Video Conferencing Systems",
    description: "Enable hybrid learning, remote collaboration, and virtual meetings across campus.",
    icon: Video
  },
  {
    title: "Networking Infrastructure",
    description: "Provide reliable, scalable connectivity for campus-wide digital systems and operations.",
    icon: Network
  },
  {
    title: "Access Control & Security",
    description: "Manage access and strengthen security across classrooms, offices, and campus facilities.",
    icon: ShieldCheck
  },
  {
    title: "HVAC Automation",
    description: "Automate temperature control for comfortable learning environments and efficient energy use.",
    icon: Thermometer
  },
  {
    title: "Centralized Building Management",
    description: "Monitor and control connected campus systems through a centralized platform.",
    icon: LayoutDashboard
  }
];

export function InstitutesSolutions() {
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

    tl.fromTo('.is-header',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: DURATION.normal, stagger: STAGGER.normal, ease: EASE.reveal }
    )
      .fromTo('.is-card',
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
          <span className="is-header tracking-[0.1em] text-accent mb-4 block text-sm font-medium">
            Core Technologies
          </span>
          <h2 className="is-header text-foreground text-balance mb-6">
            Complete Campus Automation Solutions
          </h2>
          <p className="is-header text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance">
            Integrated technologies that work together to create smarter, more efficient educational institutions.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {SOLUTIONS.map((solution, idx) => (
            <div
              key={idx}
              className="is-card bg-panel border border-black/5 rounded-[2rem] p-8 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 flex flex-col"
            >
              <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center mb-6 shrink-0">
                <solution.icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
              </div>

              <h4 className="text-foreground mb-3 text-balance">
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
