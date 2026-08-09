'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Zap, Star, ShieldCheck, Building, Sparkles, Cpu } from 'lucide-react';

const REASONS = [
  {
    title: "Lower Energy Costs",
    description: "Automatically optimize lighting and HVAC based on occupancy to reduce energy consumption.",
    icon: Zap,
  },
  {
    title: "Improved Guest Reviews",
    description: "Deliver a personalized, comfortable, and intuitive in-room experience that enhances guest satisfaction.",
    icon: Star,
  },
  {
    title: "Reduced Maintenance",
    description: "Centralized monitoring enables faster fault detection and proactive maintenance.",
    icon: ShieldCheck,
  },
  {
    title: "Scalable for Any Hotel Size",
    description: "Flexible solutions for boutique hotels, luxury resorts, and large hospitality chains.",
    icon: Building,
  },
  {
    title: "Premium Guest Experience",
    description: "Integrated control of lighting, climate, shades, and room functions from a single interface.",
    icon: Sparkles,
  },
  {
    title: "Future-Ready Technology",
    description: "Designed to integrate with PMS, BMS, and evolving hospitality technologies for long-term value.",
    icon: Cpu,
  }
];

export function GuestRoomWhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.fromTo('.gr-why-header',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(itemsRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-12 md:py-16 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-16 lg:gap-20 relative">

        {/* Header */}
        <div className="gr-why-header text-center max-w-4xl mx-auto">
          <h2 className="text-foreground text-balance">
            Why Hotels Choose Our GRMS Solutions
          </h2>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {REASONS.map((reason, idx) => (
            <div
              key={idx}
              ref={el => { itemsRef.current[idx] = el; }}
              className="group flex flex-col items-start gap-4 p-8 rounded-3xl bg-panel border border-black/5 hover:border-black/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:scale-110 transition-all duration-500">
                <reason.icon className="w-5 h-5 text-accent group-hover:text-primary transition-colors duration-500" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-foreground mb-3 leading-snug text-balance">
                  {reason.title}
                </h3>
                <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed text-balance">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
