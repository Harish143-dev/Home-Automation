'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { Leaf, UserCheck, LayoutDashboard, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

const BENEFITS = [
  {
    title:"Lower Energy & Operational Costs",
    description:"Optimize lighting, HVAC, and other systems through intelligent automation to reduce energy consumption and improve operational efficiency.",
    icon: Leaf
  },
  {
    title:"Enhanced Guest Experience",
    description:"Create welcoming public spaces with the perfect combination of lighting, audio, climate, and ambience for a memorable guest experience.",
    icon: UserCheck
  },
  {
    title:"Centralized Management",
    description:"Control lighting, audio, displays, HVAC, networking, and security from a single platform for simpler day-to-day operations.",
    icon: LayoutDashboard
  },
  {
    title:"Improved Comfort & Ambience",
    description:"Maintain consistent lighting, temperature, and background music to provide a comfortable environment throughout public areas.",
    icon: Sparkles
  },
  {
    title:"Scalable & Future-Ready Solutions",
    description:"Flexible automation systems designed to support future expansion and evolving hospitality requirements.",
    icon: TrendingUp
  },
  {
    title:"Reliable Performance & Service",
    description:"Benefit from enterprise-grade automation backed by expert engineering, proactive support, and dependable system performance.",
    icon: ShieldCheck
  }
];

export function PublicAreasBenefits() {
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
        ease:"power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start:"top 80%",
        }
      }
    );

    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-20 md:py-32 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center relative">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto z-10 py-6 px-4 mb-16 lg:mb-20">
          <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-accent mb-4 block">
            Value Proposition
          </span>
          <h2 className="text-foreground text-balance">
            Business Benefits Beyond Automation
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {BENEFITS.map((benefit, idx) => (
            <div 
              key={idx} 
              className="benefit-card bg-panel border border-black/5 rounded-[2rem] p-8 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 flex flex-col"
            >
              <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center mb-6 shrink-0">
                <benefit.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
              </div>
              
              <h4 className="text-foreground mb-3 text-balance">
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
