'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { Wifi, Shield, MonitorPlay, Volume2, Lightbulb } from 'lucide-react';

const SOLUTIONS = [
  {
    icon: Wifi,
    title: "Networking Infrastructure",
    desc: "Reliable wired and wireless networking to support AV systems, digital signage, video conferencing, live streaming, guest Wi-Fi, and connected venue operations."
  },
  {
    icon: Shield,
    title: "Security Infrastructure",
    desc: "Integrated surveillance, access control, and centralized monitoring to help manage venue security, staff access, and event operations."
  },
  {
    icon: MonitorPlay,
    title: "LED Video Wall Systems",
    desc: "LED display solutions for presentations, live events, entertainment, branding, digital backdrops, and event information."
  },
  {
    icon: Volume2,
    title: "Audio Distribution Systems",
    desc: "Zone-based audio systems with speakers, microphones, amplifiers, and DSPs for clear sound across conferences, weddings, performances, and banquet events."
  },
  {
    icon: Lightbulb,
    title: "Lighting Control",
    desc: "Create and recall lighting scenes for different event types, adjust brightness levels, and manage lighting across the venue from a single interface."
  }
];

export function BanquetHallSolutions() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    // Animate Header
    gsap.fromTo(".solution-header",
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

    // Animate Cards Staggered
    const cards = gsap.utils.toArray('.solution-card');

    gsap.fromTo(cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.solutions-grid',
          start: "top 85%",
        }
      }
    );

    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-12 md:py-16 relative w-full bg-panel px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-24">
          <span className="tracking-[0.1em] text-accent mb-4 block">
            Comprehensive Integration
          </span>
          <h2 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl solution-header text-foreground mb-6 text-balance">
            Intelligent Solutions for Every Event
          </h2>
          <p className="solution-header text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance max-w-3xl mx-auto">
            Integrated technologies working together to create immersive, reliable, and memorable event experiences
          </p>
        </div>

        {/* Bento Grid */}
        <div className="solutions-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {SOLUTIONS.map((solution, idx) => {
            const Icon = solution.icon;
            return (
              <div
                key={idx}
                className="solution-card bg-white border border-black/5 rounded-[2rem] p-8 md:p-10 hover:shadow-xl hover:shadow-black/5 transition-all duration-500 group flex flex-col hover:-translate-y-1"
              >
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-panel border border-black/5 flex items-center justify-center mb-8 group-hover:bg-accent/5 group-hover:border-accent/10 transition-colors duration-500">
                  <Icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground mb-4">
                  {solution.title}
                </h3>
                <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                  {solution.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
