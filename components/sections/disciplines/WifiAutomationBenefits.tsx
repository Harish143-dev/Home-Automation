"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";

const BENEFITS = [
  {
    title: "Seamless Coverage",
    description: "Stay connected throughout the space with consistent coverage and fewer dead zones."
  },
  {
    title: "High Performance",
    description: "Support multiple devices, high-bandwidth activities, and demanding applications with ease."
  },
  {
    title: "Reliable Connectivity",
    description: "Enjoy consistent network performance when connectivity matters most."
  },
  {
    title: "Secure Access",
    description: "Separate and manage users, devices, and connected systems with greater control."
  },
  {
    title: "Easy Scalability",
    description: "Expand your network easily as your space and connectivity requirements grow."
  },
  {
    title: "Intelligent Management",
    description: "Monitor and manage network performance efficiently from a centralized platform."
  }
];

export function WifiAutomationBenefits() {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.fromTo(leftColRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );

    gsap.fromTo(".benefit-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );

    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-panel text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Sticky Header Column */}
        <div ref={leftColRef} className="w-full lg:w-1/3 flex flex-col lg:sticky lg:top-32 h-fit">
          <h2 className="text-foreground text-balance mb-6">
            Connectivity Without Compromise
          </h2>
          <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed text-balance">
            Experience reliable, high-performance connectivity designed around the way people use modern spaces.
          </p>
        </div>

        {/* Scrolling Grid Column */}
        <div className="w-full lg:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {BENEFITS.map((benefit, idx) => (
              <div key={idx} className="benefit-card flex flex-col group">
                <div className="w-8 h-[2px] bg-accent mb-6 transition-all duration-300 group-hover:w-16" />
                <h3 className="text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground font-light text-base leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
