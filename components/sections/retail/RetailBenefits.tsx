'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { Star, Leaf, Settings2, Building2, ShieldCheck, TrendingUp } from 'lucide-react';

const BENEFITS = [
  {
    title: "Enhanced Customer Experience",
    description: "Create engaging environments through coordinated lighting, audio, and visual systems.",
    icon: Star
  },
  {
    title: "Energy Efficiency",
    description: "Optimize lighting and HVAC usage to reduce unnecessary energy consumption.",
    icon: Leaf
  },
  {
    title: "Operational Efficiency",
    description: "Automate routine functions and simplify control of essential store systems.",
    icon: Settings2
  },
  {
    title: "Brand Consistency",
    description: "Maintain a consistent environment and customer experience across different locations.",
    icon: Building2
  },
  {
    title: "Improved Security",
    description: "Integrate essential security systems to support a safer and more controlled retail environment.",
    icon: ShieldCheck
  },
  {
    title: "Scalable Technology",
    description: "Build flexible systems that can adapt as your store, operations, and technology requirements grow.",
    icon: TrendingUp
  }
];

export function RetailBenefits() {
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
            Business Value
          </h5>
          <h2 className=" text-foreground text-balance mb-6">
            Automation That Delivers Business Value
          </h2>
          <p className="text-muted-foreground font-light text-lg md:text-xl text-balance">
            Technology should improve more than the look of your store. It should contribute to better operations, customer experiences, and long-term efficiency.
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

              <h4 className=" text-foreground mb-3 text-balance">
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
