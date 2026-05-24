"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

const ROW_1 = [
  "Lighting Automation",
  "HVAC Integration",
  "AV Control",
  "Security Systems",
];

const ROW_2 = [
  "Access Control",
  "Energy Monitoring",
  "Scheduling & Automation",
  "Centralized Dashboards",
];

export function CommercialCapabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.from(".cap-heading", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  // Helper to render a marquee row
  const renderMarqueeRow = (items: string[], direction: 'left' | 'right') => {
    // Duplicate items enough times to ensure it fills the screen for infinite scroll
    const duplicatedItems = [...items, ...items, ...items, ...items, ...items, ...items];
    
    return (
      <div className="relative flex overflow-hidden w-full py-4 group">
        <div 
          className={`flex w-max space-x-6 px-3 ${
            direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
          } ${prefersReducedMotion ? 'animate-none' : ''}`}
        >
          {duplicatedItems.map((item, idx) => (
            <div 
              key={idx}
              className="flex-shrink-0 px-8 py-4 bg-panel border border-border rounded-full shadow-sm hover:shadow-md transition-shadow cursor-default"
            >
              <span className="text-2xl md:text-3xl font-light tracking-wide leading-[1.2] text-foreground">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-20 lg:px-24 mb-16 text-center cap-heading">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-[1.2] text-foreground">
          Smart Systems That <br className="hidden md:block"/>
          <span className="text-accent">Work Together</span>
        </h2>
      </div>

      <div className="flex flex-col gap-6 md:gap-8 w-full -rotate-2 scale-110 md:scale-105">
        {renderMarqueeRow(ROW_1, 'left')}
        {renderMarqueeRow(ROW_2, 'right')}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }
        /* Pause on hover for better UX */
        .group:hover .animate-marquee-left,
        .group:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}
