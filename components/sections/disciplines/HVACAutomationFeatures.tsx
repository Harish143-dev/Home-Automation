"use client";

import React, { useRef } from "react";
import { Thermometer, Leaf, Smartphone } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";

const FEATURES = [
  {
    title: "Comfort When You Need It",
    description: "Maintain the ideal temperature across different rooms and zones, creating personalised comfort throughout your space.",
    icon: Thermometer
  },
  {
    title: "Efficiency When You Don't",
    description: "Automatically optimise HVAC operation based on occupancy, schedules, and real-time requirements to reduce unnecessary energy use.",
    icon: Leaf
  },
  {
    title: "Control Wherever You Are",
    description: "Monitor and manage your environment effortlessly through intuitive touch panels, mobile apps, or integrated control interfaces.",
    icon: Smartphone
  }
];

export function HVACAutomationFeatures() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.fromTo(".hvac-feature-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.15, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );

    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-panel text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-foreground mb-6 text-balance max-w-4xl mx-auto">
            More Than Temperature Control.<br/>Intelligent Climate Management.
          </h2>
          <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed text-balance max-w-3xl mx-auto">
            HVAC automation brings temperature control, scheduling, occupancy, and other building systems together to create comfortable environments that operate intelligently in the background.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {FEATURES.map((feature, idx) => (
            <div key={idx} className="hvac-feature-card flex flex-col items-center text-center group cursor-default">
              
              {/* Icon Container */}
              <div className="w-20 h-20 rounded-full bg-background border border-black/5 flex items-center justify-center text-accent mb-8 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-accent/10">
                <feature.icon className="w-10 h-10 stroke-[1.5]" />
              </div>
              
              <h3 className="text-foreground mb-4">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground font-light text-base leading-relaxed">
                {feature.description}
              </p>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
