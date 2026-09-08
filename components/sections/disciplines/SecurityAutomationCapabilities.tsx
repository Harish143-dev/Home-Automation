"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";

const CAPABILITIES = [
  {
    prefix: "Detect",
    title: "Identify Security Events",
    description: "Detect unusual activity, unauthorized access, and potential security threats across the property."
  },
  {
    prefix: "Monitor",
    title: "Stay Informed",
    description: "Monitor connected security systems and gain visibility across key areas of your home or property."
  },
  {
    prefix: "Respond",
    title: "Act When It Matters",
    description: "Receive alerts and enable faster action when an unexpected security event occurs."
  },
  {
    prefix: "Control",
    title: "Manage From One Place",
    description: "Control and manage connected security systems through intuitive interfaces and centralized control."
  }
];

export function SecurityAutomationCapabilities() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.fromTo(".capability-card",
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
    <section ref={containerRef} className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-foreground mb-6 text-balance max-w-4xl mx-auto">
            Security That Works Beyond Surveillance
          </h2>
          <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed text-balance max-w-3xl mx-auto">
            Modern security is more than cameras and alarms. Our integrated security solutions bring together access, surveillance, detection, monitoring, and automation to create a safer and more responsive environment.
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 lg:gap-y-16">
          {CAPABILITIES.map((capability, idx) => (
            <div key={idx} className="capability-card flex flex-col border-t border-black/10 pt-8 group">
              <span className="tracking-[0.1em] text-xs sm:text-sm md:text-base text-accent mb-4 block font-medium">
                {capability.prefix}
              </span>
              <h3 className="text-foreground mb-4 transition-colors group-hover:text-accent">
                {capability.title}
              </h3>
              <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed">
                {capability.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
