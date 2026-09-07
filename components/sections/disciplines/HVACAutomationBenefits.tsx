"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";

const BENEFITS = [
  {
    title: "Consistent Comfort",
    description: "Maintain comfortable temperatures throughout the home with precise HVAC control that responds to changing indoor conditions."
  },
  {
    title: "Personalized Climate Control",
    description: "Set different temperature preferences for individual rooms or zones, giving every space the climate control it needs."
  },
  {
    title: "Smarter Energy Use",
    description: "Reduce unnecessary HVAC operation by using schedules, occupancy information, and intelligent control to optimize energy consumption."
  },
  {
    title: "Greater Convenience",
    description: "Automate everyday climate settings with scheduled operation, allowing your HVAC system to adapt automatically throughout the day."
  },
  {
    title: "Connected Home Experience",
    description: "Integrate HVAC with lighting, shades, security, and other systems to create coordinated scenes and automated responses."
  },
  {
    title: "Control from Anywhere",
    description: "Monitor and adjust your home's climate remotely through connected interfaces, whether you're at home or away."
  }
];

export function HVACAutomationBenefits() {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.fromTo(leftColRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );

    gsap.fromTo(".benefit-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );

    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-panel text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Sticky Header Column */}
        <div ref={leftColRef} className="w-full lg:w-1/3 flex flex-col lg:sticky lg:top-32 h-fit">
          <h2 className="text-foreground text-balance">
            Designed for Comfort. Engineered for Efficiency.
          </h2>
        </div>

        {/* Scrolling Grid Column */}
        <div className="w-full lg:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {BENEFITS.map((benefit, idx) => (
              <div key={idx} className="benefit-card flex flex-col group">
                <div className="w-8 h-[2px] bg-accent mb-6 transition-all duration-300 group-hover:w-16" />
                <h3 className="text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground font-light text-base leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
