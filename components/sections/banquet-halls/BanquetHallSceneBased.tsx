'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { Settings, Zap, Users } from 'lucide-react';

const FEATURES = [
  {
    title: "Centralized Management",
    description: "Control lighting, audio, video, HVAC, LED walls, and other connected systems from a single interface.",
    icon: Settings
  },
  {
    title: "Faster Venue Setup",
    description: "Apply predefined automation settings to reduce setup time and ensure consistent event preparation.",
    icon: Zap
  },
  {
    title: "Simplified Staff Operations",
    description: "Minimize manual adjustments with centralized controls, enabling staff to manage venue operations more efficiently.",
    icon: Users
  }
];

export function BanquetHallSceneBased() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    gsap.fromTo('.scene-header',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

    gsap.fromTo('.scene-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.scene-grid',
          start: "top 85%",
        }
      }
    );

    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-12 md:py-16 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center relative">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto z-10 py-6 px-4 mb-16 lg:mb-20">
          <h2 className=" text-foreground text-balance scene-header mb-6">
            Scene Based Automation
          </h2>
          <p className="scene-header text-lg md:text-xl font-light text-muted-foreground leading-relaxed text-balance max-w-3xl mx-auto">
            Switch between Wedding, Conference, Reception, Exhibition, and Banquet modes with a single touch.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="scene-grid grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="scene-card bg-panel border border-black/5 rounded-[2rem] p-8 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center mb-6 shrink-0">
                <feature.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
              </div>

              <h3 className=" text-foreground mb-3 text-balance">
                {feature.title}
              </h3>

              <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
