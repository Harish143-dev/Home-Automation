"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";

const CAPABILITIES = [
  {
    title: "Temperature Control",
    description: "Set and maintain desired temperatures for individual rooms or zones."
  },
  {
    title: "Zone-Based Control",
    description: "Manage different areas independently based on their specific requirements."
  },
  {
    title: "Occupancy-Based Automation",
    description: "Adjust HVAC operation based on whether spaces are occupied or vacant."
  },
  {
    title: "Scheduling & Automation",
    description: "Automatically adjust temperature settings according to time, day, or operational schedules."
  },
  {
    title: "Remote Control",
    description: "Monitor and adjust HVAC systems remotely through connected interfaces."
  },
  {
    title: "Centralized Management",
    description: "Manage multiple HVAC zones and systems from a centralized platform."
  },
  {
    title: "Energy Management",
    description: "Optimize HVAC operation to reduce unnecessary energy consumption."
  },
  {
    title: "System Integration",
    description: "Integrate HVAC with lighting, shades, security, and other automation systems."
  }
];

export function HVACAutomationCapabilities() {
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
        stagger: 0.1,
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
        <div className="max-w-3xl mb-16 md:mb-24">
          <h5 className="text-accent mb-4">
            Comprehensive Capabilities
          </h5>
          <h2 className="text-foreground mb-6 text-balance">
            Intelligent Control for Every Climate Requirement
          </h2>
          <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed text-balance">
            From individual rooms to multi-zone environments, our systems provide precise and flexible control over HVAC operation.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 lg:gap-y-16">
          {CAPABILITIES.map((capability, idx) => (
            <div key={idx} className="capability-card flex flex-col border-t border-black/10 pt-6 group">
              <h3 className="text-foreground mb-3 transition-colors group-hover:text-accent">
                {capability.title}
              </h3>
              <p className="text-muted-foreground font-light text-base leading-relaxed">
                {capability.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
