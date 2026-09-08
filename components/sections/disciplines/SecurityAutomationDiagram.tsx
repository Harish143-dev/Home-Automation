"use client";

import React, { useRef } from "react";
import { Camera, Key, Video, ShieldAlert, Bell, SlidersHorizontal } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";

const DIAGRAM_STEPS = [
  {
    title: "CCTV & Surveillance",
    description: "Visual monitoring",
    icon: Camera,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    title: "Access Control",
    description: "Manage entry",
    icon: Key,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20"
  },
  {
    title: "Video Door Phones",
    description: "Visitor comms",
    icon: Video,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20"
  },
  {
    title: "Intrusion Detection",
    description: "Detect activity",
    icon: ShieldAlert,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20"
  },
  {
    title: "Smart Alerts",
    description: "Instant updates",
    icon: Bell,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20"
  },
  {
    title: "Central Control",
    description: "Single interface",
    icon: SlidersHorizontal,
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20"
  }
];

export function SecurityAutomationDiagram() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 65%",
      }
    });

    // Animate the nodes
    tl.fromTo(".diagram-node",
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "back.out(1.5)" }
    );

    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-panel text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center overflow-hidden">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-foreground mb-6 text-balance max-w-4xl mx-auto">
            A Connected Security Ecosystem
          </h2>
          <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed text-balance max-w-3xl mx-auto">
            Integrate multiple security technologies into a coordinated system that works seamlessly across your property.
          </p>
        </div>

        {/* Diagram Flow */}
        <div className="w-full flex flex-col xl:flex-row items-center justify-center gap-4 xl:gap-2 relative">
          
          {DIAGRAM_STEPS.map((step, idx) => (
            <React.Fragment key={idx}>
              {/* Node */}
              <div className="diagram-node flex flex-col items-center text-center max-w-[140px] xl:max-w-[160px] w-full z-10">
                <div className={`w-20 h-20 xl:w-24 xl:h-24 rounded-full flex items-center justify-center ${step.bg} ${step.border} border mb-6 relative overflow-hidden shadow-sm transition-transform duration-500 hover:scale-105`}>
                  {/* Subtle pulse background */}
                  <div className={`absolute inset-0 rounded-full opacity-20 animate-pulse ${step.bg}`} style={{ animationDelay: `${idx * 0.3}s` }} />
                  <step.icon className={`w-8 h-8 xl:w-10 xl:h-10 stroke-[1.5] relative z-10 ${step.color}`} />
                </div>
                <h4 className="text-foreground text-sm xl:text-base font-medium mb-2 leading-tight">
                  {step.title}
                </h4>
                <p className="text-muted-foreground text-xs xl:text-sm font-light leading-snug">
                  {step.description}
                </p>
              </div>
            </React.Fragment>
          ))}

        </div>

      </div>
    </section>
  );
}
