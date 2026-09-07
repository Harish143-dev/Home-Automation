"use client";

import React, { useRef } from "react";
import NextImage from "next/image";
import { gsap, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";
import { cn } from "@/lib/utils";

const ENVIRONMENTS = [
  {
    title: "Residential Shades Automation",
    description: "Living Rooms & Bedrooms – Automated curtains and shades for privacy, daylight control, glare reduction, and comfort.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Hospitality Shades Automation",
    description: "Hotels, Resorts & Restaurants – Automated window treatments for guest comfort, ambience, privacy, and energy management.",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop"
  },
  {
    title: "Commercial Shades Automation",
    description: "Offices, Boardrooms & Corporate Spaces – Manage daylight, glare, privacy, and indoor comfort across workspaces.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
  }
];

export function ShadeAutomationApplications() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.fromTo(".app-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.15, 
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
    <section ref={containerRef} className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-foreground mb-6 text-balance">
            Shades Automation for Every Environment
          </h2>
          <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed text-balance max-w-3xl mx-auto">
            From luxury residences to large commercial buildings and hospitality properties, our solutions are designed around the requirements of each space.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {ENVIRONMENTS.map((env, idx) => (
            <div key={idx} className="app-card flex flex-col group cursor-default h-full bg-panel border border-black/5 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-500">
              <div className="relative w-full aspect-[4/3] md:aspect-square lg:aspect-[4/3] overflow-hidden bg-black/5">
                <NextImage
                  src={env.image}
                  alt={env.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col p-6 md:p-8 flex-grow">
                <h3 className="text-xl md:text-2xl text-foreground mb-4 font-normal">
                  {env.title}
                </h3>
                <p className="text-muted-foreground font-light text-sm md:text-base leading-relaxed mt-auto">
                  {env.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
