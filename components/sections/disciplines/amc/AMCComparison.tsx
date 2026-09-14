"use client";

import React, { useRef } from "react";
import { XCircle, CheckCircle2 } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const WITHOUT_AMC = [
  "Unexpected system issues",
  "Performance disruptions",
  "Connectivity problems",
  "Outdated configurations",
  "Delayed issue identification",
  "Reduced system reliability"
];

const WITH_AMC = [
  "Regular system health checks",
  "Preventive maintenance",
  "Faster technical assistance",
  "Performance optimization",
  "System updates and recommendations",
  "Long-term reliability"
];

export default function AMCComparison() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.fromTo('.compare-header',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo('.compare-list-item-left',
      { x: -30, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.compare-container',
          start: 'top 75%',
        }
      }
    );

    gsap.fromTo('.compare-list-item-right',
      { x: 30, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.compare-container',
          start: 'top 75%',
        }
      }
    );

  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-panel text-foreground overflow-hidden border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="max-w-3xl text-center mb-16 compare-header">
          <h2 className="text-foreground mb-6 text-balance">
            An AMC That Goes Beyond Routine Maintenance
          </h2>
          <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed text-balance">
            With dedicated service support, preventive maintenance and faster on-site assistance, Anusha Technovision helps keep your integrated technology systems reliable and performing at their best.
          </p>
        </div>

        {/* Comparison Container */}
        <div className="compare-container w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          
          {/* Without AMC */}
          <div className="flex flex-col bg-background/50 border border-black/5 rounded-2xl p-8 sm:p-12">
            <h3 className="text-xl md:text-2xl font-light mb-8 text-foreground">
              Without Regular Maintenance
            </h3>
            <ul className="flex flex-col gap-6">
              {WITHOUT_AMC.map((item, idx) => (
                <li key={idx} className="compare-list-item-left flex items-start gap-4 opacity-0">
                  <XCircle className="w-6 h-6 text-foreground/40 shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="text-base md:text-lg font-light text-foreground/70 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* With AMC */}
          <div className="flex flex-col bg-accent/5 border border-accent/20 rounded-2xl p-8 sm:p-12 relative overflow-hidden group">
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <h3 className="text-xl md:text-2xl font-light mb-8 text-foreground relative z-10">
              With Anusha AMC Support
            </h3>
            <ul className="flex flex-col gap-6 relative z-10">
              {WITH_AMC.map((item, idx) => (
                <li key={idx} className="compare-list-item-right flex items-start gap-4 opacity-0">
                  <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="text-base md:text-lg font-light text-foreground leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
