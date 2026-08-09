'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Star, Leaf, Settings2, TrendingUp, Building2, Cpu } from 'lucide-react';

const BENEFITS = [
  {
    title: "Exceptional Guest Experience",
    description: "Deliver personalized lighting, audio, climate, and privacy settings that create a relaxing and consistent wellness experience.",
    icon: Star
  },
  {
    title: "Energy Efficiency",
    description: "Optimize lighting and HVAC with automated scheduling, occupancy-based control, and intelligent energy management.",
    icon: Leaf
  },
  {
    title: "Centralized Management",
    description: "Control lighting, HVAC, audio, and shades across treatment rooms from a single iPad or touchscreen interface.",
    icon: Settings2
  },
  {
    title: "Operational Efficiency",
    description: "Reduce manual adjustments with automated scenes and centralized control, enabling staff to focus on guest service.",
    icon: TrendingUp
  },
  {
    title: "Consistent Brand Experience",
    description: "Maintain the same ambience and comfort standards across every treatment room and wellness space.",
    icon: Building2
  },
  {
    title: "Scalable & Future-Ready",
    description: "Easily expand the automation system as your spa grows, with integration support for additional wellness areas and future technologies.",
    icon: Cpu
  }
];

export function SpaBenefits() {
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
          <h5 className="text-accent mb-4 block">
            The Advantage
          </h5>
          <h2 className="text-foreground text-balance mb-6">
            More Than Guest Comfort—Automation That Supports Your Business
          </h2>
          <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance max-w-2xl mx-auto">
            Enhance guest satisfaction while improving operational efficiency and reducing energy costs.
          </p>
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

              <h3 className="text-foreground mb-3">
                {benefit.title}
              </h3>

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
