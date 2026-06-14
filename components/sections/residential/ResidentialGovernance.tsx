"use client";

import React, { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { ShieldCheck, Clock, RefreshCw } from "lucide-react";

const GUARANTEES = [
  {
    title: "24/7 Pan-India Helpdesk",
    description: "Immediate remote diagnostic support and real-time adjustments across our national network.",
    icon: ShieldCheck
  },
  {
    title: "4-Hour On-Site SLA",
    description: "Guaranteed on-site component dispatch and technical intervention across key metropolitan hubs.",
    icon: Clock
  },
  {
    title: "Lifecycle Protection",
    description: "Comprehensive coverage including 1-year free AMC and scheduled expert optimization visits.",
    icon: RefreshCw
  }
];

export function ResidentialGovernance() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

    // Animate Header side
    tl.fromTo(".gov-header > *",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
    );

    // Animate Timeline Line
    tl.fromTo(".gov-line",
      { scaleY: 0, transformOrigin: "top" },
      { scaleY: 1, duration: 1.2, ease: "power3.inOut" },
      "-=0.8"
    );

    // Animate Guarantee Cards
    tl.fromTo(".gov-card",
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      "-=1.0"
    );

  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-surface relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative items-start">

          {/* Left Column: Context (Sticky on Desktop) */}
          <div className="w-full lg:w-1/2 flex flex-col gov-header lg:sticky lg:top-40">
            <span className="tracking-widest text-sm md:text-base text-accent mb-4 block">
              Asset Governance
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-[1.2] text-foreground mb-6">
              The Security of <br className="hidden md:block" />Continuous Performance.
            </h2>
            <p className="text-muted text-base md:text-lg font-light leading-relaxed max-w-lg">
              A premium estate demands absolute structural continuity. Backed by an in-house team of over 60 certified engineers and an advanced localized-processor framework, your home automation operates independently of external fiber internet downtime.
            </p>
          </div>

          {/* Right Column: Guarantees Stack */}
          <div className="w-full lg:w-1/2 relative pl-2 sm:pl-0">
            {/* Vertical Timeline Line */}
            <div className="gov-line absolute left-[23px] md:left-[27px] top-12 bottom-10 w-[1px] bg-border hidden sm:block" />

            <div className="flex flex-col gap-10 md:gap-14 relative">
              {GUARANTEES.map((item, index) => (
                <div key={index} className="gov-card flex items-start gap-6 md:gap-10 group cursor-default">

                  {/* Icon Node */}
                  <div className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-background border border-border flex items-center justify-center shrink-0 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:border-accent/50 group-hover:bg-accent/5">
                    <item.icon className="w-5 h-5 md:w-6 md:h-6 text-accent opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col pt-1.5 md:pt-2.5">
                    <h3 className="text-2xl md:text-3xl font-light tracking-wide text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted font-light leading-relaxed max-w-md">
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
