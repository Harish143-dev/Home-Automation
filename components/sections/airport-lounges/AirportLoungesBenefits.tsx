"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { Thermometer, Lightbulb, MonitorPlay, Wifi, Sparkles, Sliders, Leaf, CalendarClock, Network, Settings2 } from "lucide-react";
import { EASE, DURATION } from "../../../lib/animation.config";

const PASSENGER_BENEFITS = [
  {
    title: "Comfortable Temperature",
    description: "Maintain a comfortable environment throughout the lounge.",
    icon: Thermometer
  },
  {
    title: "Adaptive Lighting",
    description: "Create the right light levels for relaxation, dining, work, and circulation.",
    icon: Lightbulb
  },
  {
    title: "Immersive Entertainment",
    description: "Deliver distributed audio, displays, and AV experiences across lounge zones.",
    icon: MonitorPlay
  },
  {
    title: "Reliable Connectivity",
    description: "Support high-performance Wi-Fi and networking for connected passengers.",
    icon: Wifi
  },
  {
    title: "Premium Ambience",
    description: "Create a refined and consistent atmosphere across different lounge areas.",
    icon: Sparkles
  }
];

const OPERATOR_BENEFITS = [
  {
    title: "Centralized Control",
    description: "Monitor and control connected systems from a centralized interface.",
    icon: Sliders
  },
  {
    title: "Energy Optimization",
    description: "Reduce unnecessary energy use through occupancy sensing, scheduling, and intelligent control.",
    icon: Leaf
  },
  {
    title: "Automated Scheduling",
    description: "Automate lighting, HVAC, shades, and AV based on operating schedules.",
    icon: CalendarClock
  },
  {
    title: "Integrated Infrastructure",
    description: "Connect lighting, HVAC, AV, networking, and security into a coordinated system.",
    icon: Network
  },
  {
    title: "Simplified Management",
    description: "Make day-to-day operation, monitoring, and adjustments easier for facility teams.",
    icon: Settings2
  }
];

export function AirportLoungesBenefits() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    tl.fromTo(".benefits-header",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: DURATION.normal, stagger: 0.1, ease: EASE.reveal }
    );

    tl.fromTo(".benefits-col",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: DURATION.normal, stagger: 0.2, ease: EASE.reveal },
      "-=0.4"
    );

    gsap.fromTo(".benefit-item",
      { x: -20, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: EASE.reveal,
        scrollTrigger: {
          trigger: ".benefits-grid",
          start: "top 80%",
        }
      }
    );

  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-panel border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-20">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h5 className="benefits-header text-accent block mb-4">
            Integrated Automation
          </h5>
          <h2 className="benefits-header text-foreground text-balance mb-6">
            Where Passenger Comfort Meets Operational Control
          </h2>
          <p className="benefits-header text-lg md:text-xl font-light text-muted-foreground leading-relaxed text-balance">
            An airport lounge should feel effortless for passengers while remaining simple to manage for operators. Our integrated automation solutions bring lighting, climate, shades, AV, connectivity, and security together into one coordinated environment.
          </p>
        </div>

        {/* Two Columns */}
        <div className="benefits-grid grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Passengers */}
          <div className="benefits-col flex flex-col bg-background p-8 md:p-12 rounded-[2rem] border border-black/5 shadow-sm">
            <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-8">
              A Better Passenger Experience
            </h3>
            <div className="flex flex-col gap-8">
              {PASSENGER_BENEFITS.map((item, i) => (
                <div key={i} className="benefit-item flex gap-4 md:gap-6 items-start">
                  <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center shrink-0 border border-accent/10">
                    <item.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col gap-1.5 pt-1">
                    <h4 className="text-lg md:text-xl text-foreground font-medium">
                      {item.title}
                    </h4>
                    <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Operators */}
          <div className="benefits-col flex flex-col bg-background p-8 md:p-12 rounded-[2rem] border border-black/5 shadow-sm">
            <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-8">
              Smarter Lounge Operations
            </h3>
            <div className="flex flex-col gap-8">
              {OPERATOR_BENEFITS.map((item, i) => (
                <div key={i} className="benefit-item flex gap-4 md:gap-6 items-start">
                  <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center shrink-0 border border-black/10">
                    <item.icon className="w-5 h-5 text-foreground/70" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col gap-1.5 pt-1">
                    <h4 className="text-lg md:text-xl text-foreground font-medium">
                      {item.title}
                    </h4>
                    <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
