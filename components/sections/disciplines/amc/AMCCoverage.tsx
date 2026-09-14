"use client";

import React, { useRef } from "react";
import { Lightbulb, MonitorPlay, Wifi, Shield, Thermometer, Blinds } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const COVERAGE_ITEMS = [
  {
    title: "Lighting Automation Maintenance",
    description: "Lighting controls, scenes, keypads and system performance.",
    icon: Lightbulb
  },
  {
    title: "Audio & Video Maintenance",
    description: "Audio/video testing, connectivity, control interfaces and troubleshooting.",
    icon: MonitorPlay
  },
  {
    title: "Wi-Fi & Network Maintenance",
    description: "Network health, Wi-Fi performance, connectivity and configuration checks.",
    icon: Wifi
  },
  {
    title: "Security System Support",
    description: "Security devices, access systems, connectivity and integration checks.",
    icon: Shield
  },
  {
    title: "HVAC Automation Maintenance",
    description: "Climate controls, zone management, automation and system integration.",
    icon: Thermometer
  },
  {
    title: "Shades & Motorized Systems",
    description: "Motorized shades, controls, scenes and automation performance.",
    icon: Blinds
  }
];

export default function AMCCoverage() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.fromTo('.coverage-header',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo('.coverage-card',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.coverage-grid',
          start: 'top 75%',
        }
      }
    );

  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Header */}
        <div className="coverage-header max-w-3xl mb-16">
          <h2 className="text-foreground mb-6 text-balance">
            What Does Our AMC Cover?
          </h2>
          <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed text-balance">
            Customized maintenance based on your systems, technology and project requirements.
          </p>
        </div>

        {/* Grid */}
        <div className="coverage-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {COVERAGE_ITEMS.map((item, idx) => (
            <div key={idx} className="coverage-card flex flex-col bg-panel p-8 sm:p-10 rounded-2xl border border-black/5 group hover:border-accent/30 transition-colors duration-500 opacity-0">
              <div className="mb-8 p-4 bg-background w-fit rounded-full shadow-sm text-accent">
                <item.icon className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg md:text-xl font-medium mb-4 text-foreground">
                {item.title}
              </h3>
              <p className="text-muted-foreground font-light text-sm md:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
