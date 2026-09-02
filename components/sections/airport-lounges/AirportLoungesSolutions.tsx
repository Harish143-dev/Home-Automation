'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { Lightbulb, Thermometer, Volume2, MonitorPlay, Network, Sliders } from 'lucide-react';

const WORKFLOW_ITEMS = [
  {
    icon: Lightbulb,
    title: "Intelligent Lighting Management",
    desc: "Create the right atmosphere throughout the day with automated lighting scenes, scheduling, dimming, and daylight management."
  },
  {
    icon: Thermometer,
    title: "HVAC & Climate Control",
    desc: "Maintain comfortable lounge temperatures while intelligently managing energy consumption across different zones."
  },
  {
    icon: Volume2,
    title: "Audio Distribution Systems",
    desc: "Deliver consistent background audio across lounge areas while allowing different zones to be managed independently."
  },
  {
    icon: MonitorPlay,
    title: "Immersive LED Video Wall Systems",
    desc: "Create visually engaging environments with high-performance LED video walls for entertainment, information, branding, and announcements."
  },
  {
    icon: Network,
    title: "Integrated Networking & Security",
    desc: "Build the reliable technology infrastructure required to support a connected and secure lounge environment."
  },
  {
    icon: Sliders,
    title: "Centralized Control & Management",
    desc: "Bring connected systems together through centralized control for easier operation, monitoring, scheduling, and management."
  }
];

export function AirportLoungesSolutions() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    // Animate Header
    gsap.fromTo(".wf-header",
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
    const cards = gsap.utils.toArray('.wf-card');

    gsap.fromTo(cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.wf-grid',
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
          <h5 className="wf-header text-accent mb-4 block">
            Comprehensive Integration
          </h5>
          <h2 className=" wf-header text-foreground mb-6 text-balance">
            Smart Solutions for Every Aspect of Your Airport Lounge
          </h2>
          <p className="wf-header text-muted-foreground text-sm sm:text-base md:text-lg font-light leading-relaxed text-balance">
            From the moment passengers enter the lounge to the time they leave, our integrated solutions help create a consistent, comfortable, and connected experience.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="wf-grid flex flex-wrap gap-6 md:gap-8 w-full justify-center">
          {WORKFLOW_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="wf-card w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)] bg-white border border-black/5 rounded-3xl p-8 md:p-10 hover:shadow-xl hover:shadow-black/5 transition-all duration-500 group flex flex-col hover:-translate-y-1"
              >
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-panel border border-black/5 flex items-center justify-center mb-8 group-hover:bg-accent/5 group-hover:border-accent/10 transition-colors duration-500">
                  <Icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className=" text-foreground mb-4">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
