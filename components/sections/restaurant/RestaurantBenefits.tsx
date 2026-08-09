'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { Star, Leaf, Settings2, Building2, TrendingUp, Cpu } from 'lucide-react';

const BENEFITS = [
  {
    title: "Create Memorable Guest Experiences",
    description: "Deliver the perfect ambience with synchronized lighting, music, shades, and climate control for every dining occasion.",
    icon: Star
  },
  {
    title: "Reduce Energy Costs",
    description: "Optimize energy consumption with automated lighting schedules, HVAC control, and daylight-responsive shade automation.",
    icon: Leaf
  },
  {
    title: "Simplify Daily Operations",
    description: "Manage lighting, audio, video, shades, and HVAC from a single intuitive interface, reducing manual effort.",
    icon: Settings2
  },
  {
    title: "Consistent Brand Experience",
    description: "Maintain the same ambience, lighting scenes, and guest experience across every restaurant location.",
    icon: Building2
  },
  {
    title: "Increase Operational Efficiency",
    description: "Automate routine functions and reduce manual adjustments, allowing staff to focus on guest service.",
    icon: TrendingUp
  },
  {
    title: "Future-Ready Infrastructure",
    description: "Scalable automation solutions that adapt to new technologies and support your restaurant's future growth.",
    icon: Cpu
  }
];

export function RestaurantBenefits() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    gsap.fromTo('.benefit-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
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
          <span className="tracking-[0.1em] text-accent mb-4 block">
            The Advantage
          </span>
          <h2 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground text-balance">
            Designed to Improve Operations and Guest Satisfaction
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {BENEFITS.map((benefit, idx) => (
            <div
              key={idx}
              className="benefit-card bg-panel border border-black/5 rounded-[2rem] p-8 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 flex flex-col hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center mb-6 shrink-0">
                <benefit.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
              </div>

              <h4 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground mb-3 text-balance">
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
