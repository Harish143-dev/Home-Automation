'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { Timer, Sparkles, Award, TrendingDown, Sliders, Heart } from 'lucide-react';

const BENEFITS = [
  {
    title: "Reduced Setup Time",
    description: "Switch venue configurations instantly.",
    icon: Timer
  },
  {
    title: "Consistent Event Experience",
    description: "Reliable audio, visuals, and lighting for every event.",
    icon: Sparkles
  },
  {
    title: "Professional Venue Presentation",
    description: "Premium technology enhances your brand.",
    icon: Award
  },
  {
    title: "Lower Operational Costs",
    description: "Efficient energy and equipment management.",
    icon: TrendingDown
  },
  {
    title: "Flexible Venue Configurations",
    description: "One hall. Multiple event formats.",
    icon: Sliders
  },
  {
    title: "Higher Guest Satisfaction",
    description: "Create memorable experiences that drive repeat bookings.",
    icon: Heart
  }
];

export function BanquetHallBenefits() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    gsap.fromTo('.benefit-header',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

    gsap.fromTo('.benefit-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.benefits-grid',
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
          <span className="tracking-[0.1em] text-accent mb-4 block benefit-header">
            The Advantage
          </span>
          <h2 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground text-balance benefit-header mb-6">
            Why Hospitality Venues Choose Intelligent Event Automation
          </h2>
          <p className="benefit-header text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance max-w-3xl mx-auto">
            Automation improves both operational efficiency and the guest experience.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="benefits-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {BENEFITS.map((benefit, idx) => (
            <div
              key={idx}
              className="benefit-card bg-panel border border-black/5 rounded-[2rem] p-8 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 flex flex-col"
            >
              <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center mb-6 shrink-0">
                <benefit.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
              </div>

              <h3 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground mb-3 text-balance">
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
