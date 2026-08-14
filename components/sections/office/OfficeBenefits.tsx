'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { TrendingUp, Leaf, Users, Shield, Settings, Zap } from 'lucide-react';
import { DURATION, EASE, STAGGER } from '@/lib/animation.config';

const BENEFITS = [
  {
    title: "Improve Employee Productivity",
    description: "Create comfortable workspaces with automated lighting, climate, and AV control.",
    icon: TrendingUp
  },
  {
    title: "Reduce Energy Consumption",
    description: "Use occupancy sensing, scheduling, daylight harvesting, and automated shades to manage energy use.",
    icon: Leaf
  },
  {
    title: "Enhance Workplace Collaboration",
    description: "Support meetings and teamwork with integrated conferencing, displays, and audio-video systems.",
    icon: Users
  },
  {
    title: "Strengthen Workplace Security",
    description: "Connect access control, CCTV, and other security systems for better monitoring and control.",
    icon: Shield
  },
  {
    title: "Simplify Facility Management",
    description: "Manage multiple workplace systems through centralized control and monitoring.",
    icon: Settings
  },
  {
    title: "Future-Ready Infrastructure",
    description: "Build a scalable automation infrastructure that can adapt as workplace requirements grow.",
    icon: Zap
  }
];

export function OfficeBenefits() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    tl.fromTo('.ob-header',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: DURATION.normal, stagger: STAGGER.normal, ease: EASE.reveal }
    )
    .fromTo('.ob-card',
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
          <span className="ob-header tracking-[0.1em] text-accent mb-4 block uppercase text-sm font-medium">
            The Advantage
          </span>
          <h2 className="ob-header font-light leading-[1.2] tracking-wide text-3xl sm:text-4xl text-foreground text-balance mb-6">
            Benefits That Go Beyond Automation
          </h2>
          <p className="ob-header text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance">
            Smart office automation helps improve workplace efficiency, simplify operations, and manage energy and connected systems more effectively.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {BENEFITS.map((benefit, idx) => (
            <div
              key={idx}
              className="ob-card bg-panel border border-black/5 rounded-[2rem] p-8 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 flex flex-col items-center text-center text-balance"
            >
              <div className="w-14 h-14 rounded-full bg-accent/5 flex items-center justify-center mb-6 shrink-0">
                <benefit.icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
              </div>

              <h4 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl text-foreground mb-3">
                {benefit.title}
              </h4>

              <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
