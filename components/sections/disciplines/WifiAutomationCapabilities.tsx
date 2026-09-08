"use client";

import React, { useRef } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";

const CHALLENGES = [
  "Wi-Fi dead zones",
  "Unstable or slow connectivity",
  "Increasing numbers of connected devices",
  "Network interruptions",
  "Poor coverage across large homes",
  "Limited scalability",
  "Security concerns"
];

const SOLUTIONS = [
  "Complete site assessment and network planning",
  "Heat mapping to identify optimal access-point locations",
  "High-performance Wi-Fi coverage across the home",
  "Strategic access point placement to minimize dead spots",
  "Wired connectivity for critical devices wherever required",
  "Secure and structured network architecture",
  "Centralized network management",
  "Scalable infrastructure for future devices and technologies"
];

export function WifiAutomationCapabilities() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.fromTo(".wifi-compare-box",
      { opacity: 0, y: 40 },
      {
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2, 
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
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-foreground mb-6 text-balance max-w-4xl mx-auto">
            Reliable Connectivity Is the Foundation of Every Intelligent Space
          </h2>
          <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed text-balance max-w-3xl mx-auto">
            A professionally designed network is the backbone of a connected home. It supports automation, security, entertainment, and connected devices with reliable coverage, stable performance, and room for future expansion.
          </p>
        </div>

        {/* Comparison Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          
          {/* Challenge Box */}
          <div className="wifi-compare-box w-full lg:w-1/2 bg-panel rounded-[2rem] p-8 sm:p-10 md:p-12 border border-black/5 flex flex-col">
            <h3 className="text-2xl md:text-3xl font-normal mb-4">
              The Challenge
            </h3>
            <p className="text-muted-foreground font-light text-base md:text-lg mb-8">
              Traditional home networks often struggle with:
            </p>
            <ul className="flex flex-col space-y-4">
              {CHALLENGES.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-700/70 shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="text-muted-foreground font-light text-base leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Box */}
          <div className="wifi-compare-box w-full lg:w-1/2 bg-[#f9f5f0] rounded-[2rem] p-8 sm:p-10 md:p-12 border border-[#d2b89f]/30 flex flex-col relative overflow-hidden">
            {/* Subtle premium gradient overlay for the solution side */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-normal mb-4 text-foreground">
                The Solution
              </h3>
              <p className="text-foreground/90 font-medium text-base md:text-lg mb-8">
                Professionally Designed Wi-Fi & Network Infrastructure
              </p>
              <ul className="flex flex-col space-y-4">
                {SOLUTIONS.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-foreground/80 font-light text-base leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
