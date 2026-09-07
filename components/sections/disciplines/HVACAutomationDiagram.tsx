"use client";

import React, { useRef } from "react";
import { Radio, Cpu, Wind, Leaf, ArrowRight, ArrowDown } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";

const DIAGRAM_STEPS = [
  {
    title: "Sensors & Inputs",
    icon: Radio,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    title: "HVAC Control System",
    icon: Cpu,
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20"
  },
  {
    title: "AC / Climate Systems",
    icon: Wind,
    color: "text-sky-500",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20"
  },
  {
    title: "Comfort & Efficiency",
    icon: Leaf,
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20"
  }
];

export function HVACAutomationDiagram() {
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
      { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.3, ease: "back.out(1.5)" }
    );

    // Animate the arrows (they will appear right after their preceding node)
    tl.fromTo(".diagram-arrow",
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.3, ease: "power2.out" },
      0.3 // start slightly after the first node
    );

    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-panel text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-foreground mb-6 text-balance max-w-4xl mx-auto">
            A Smarter Way to Manage Indoor Comfort
          </h2>
          <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed text-balance max-w-3xl mx-auto">
            HVAC automation connects controls, sensors, schedules, and building systems to respond intelligently to changing conditions.
          </p>
        </div>

        {/* Diagram Flow */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2 lg:gap-6 relative">
          
          {DIAGRAM_STEPS.map((step, idx) => (
            <React.Fragment key={idx}>
              {/* Node */}
              <div className="diagram-node flex flex-col items-center text-center max-w-[200px] w-full z-10">
                <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center ${step.bg} ${step.border} border mb-6 relative overflow-hidden shadow-sm`}>
                  {/* Subtle pulse background */}
                  <div className={`absolute inset-0 rounded-full opacity-20 animate-pulse ${step.bg}`} style={{ animationDelay: `${idx * 0.5}s` }} />
                  <step.icon className={`w-10 h-10 sm:w-12 sm:h-12 stroke-[1.5] relative z-10 ${step.color}`} />
                </div>
                <h4 className="text-foreground">
                  {step.title}
                </h4>
              </div>

              {/* Arrow Connector (except after last node) */}
              {idx < DIAGRAM_STEPS.length - 1 && (
                <div className="diagram-arrow flex items-center justify-center text-black/10 py-4 md:py-0 md:px-2 z-0">
                  {/* Desktop Arrow */}
                  <ArrowRight className="hidden md:block w-8 h-8 stroke-[1.5]" />
                  {/* Mobile Arrow */}
                  <ArrowDown className="md:hidden w-8 h-8 stroke-[1.5]" />
                </div>
              )}
            </React.Fragment>
          ))}

        </div>

      </div>
    </section>
  );
}
