"use client";

import React, { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, Hotel, Building2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const ENVIRONMENTS = [
  {
    id: "residential",
    title: "Residential HVAC Automation",
    tab: "Residential",
    icon: Home,
    description: "Create comfortable, personalised environments while intelligently managing energy consumption throughout the home.",
    pointers: [
      "Room-by-room temperature control",
      "Automated schedules and scenes",
      "Occupancy-based climate adjustment",
      "Integration with lighting, shades and home automation"
    ],
    cta: "Explore Residential HVAC Automation",
    href: "/residential"
  },
  {
    id: "hospitality",
    title: "Hospitality HVAC Automation",
    tab: "Hospitality",
    icon: Hotel,
    description: "Deliver consistent guest comfort while helping hotels and resorts optimise room and building energy usage.",
    pointers: [
      "Guest room climate control",
      "Occupancy-based energy management",
      "Centralised monitoring and control",
      "Integration with guest room management systems"
    ],
    cta: "Explore Hospitality HVAC Automation",
    href: "/hospitality"
  },
  {
    id: "commercial",
    title: "Commercial HVAC Automation",
    tab: "Commercial",
    icon: Building2,
    description: "Improve workplace comfort and operational efficiency with intelligent climate management across commercial spaces.",
    pointers: [
      "Zone-based temperature management",
      "Scheduling and automated operation",
      "Occupancy-driven HVAC control",
      "Centralised monitoring and management"
    ],
    cta: "Explore Commercial HVAC Automation",
    href: "/commercial"
  }
];

export function HVACAutomationEnvironments() {
  const [activeTabId, setActiveTabId] = useState<string>(ENVIRONMENTS[0].id);
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const prefersReducedMotion = useReducedMotion();
  const activeEnvironment = ENVIRONMENTS.find(env => env.id === activeTabId) || ENVIRONMENTS[0];

  // Handle crossfade animation when tab changes
  useGSAP(() => {
    if (!contentRef.current || prefersReducedMotion) return;
    
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [activeTabId, prefersReducedMotion] });

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden border-t border-black/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <h2 className="text-foreground mb-6 text-balance">
            One HVAC Automation Solution. Multiple Environments.
          </h2>
          <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed text-balance max-w-3xl mx-auto">
            Our HVAC automation solutions are designed around the unique requirements of homes, hospitality properties, and commercial environments.
          </p>
        </div>

        {/* Tabs Desktop/Mobile */}
        <div ref={tabsRef} className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 md:mb-16">
          {ENVIRONMENTS.map((env) => {
            const isActive = activeTabId === env.id;
            return (
              <button
                key={env.id}
                onClick={() => setActiveTabId(env.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 md:px-8 md:py-4 rounded-full border transition-all duration-300",
                  isActive 
                    ? "bg-foreground text-background border-foreground shadow-lg scale-105" 
                    : "bg-background text-foreground border-black/10 hover:border-black/30 hover:bg-black/5"
                )}
              >
                <env.icon className={cn("w-4 h-4 md:w-5 md:h-5", isActive ? "text-background" : "text-muted-foreground")} strokeWidth={isActive ? 2 : 1.5} />
                <span className="text-sm md:text-base tracking-wide">{env.tab}</span>
              </button>
            )
          })}
        </div>

        {/* Content Area */}
        <div ref={contentRef} className="w-full pt-12 md:pt-16 border-t border-black/5">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
            {/* Left: Title & Description */}
            <div className="w-full lg:w-5/12 flex flex-col">
               <h3 className="text-foreground mb-6">
                 {activeEnvironment.title}
               </h3>
               <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed mb-10">
                 {activeEnvironment.description}
               </p>
               
               <div className="mt-auto hidden lg:block">
                 <Link href={activeEnvironment.href} className="inline-block">
                   <Button variant="interactive" size="lg">
                     {activeEnvironment.cta}
                   </Button>
                 </Link>
               </div>
            </div>

            {/* Right: Lists */}
            <div className="w-full lg:w-7/12">
               <div className="flex flex-col">
                  <h5 className="text-foreground mb-6">
                    Application Pointers
                  </h5>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeEnvironment.pointers.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="text-muted-foreground font-light text-sm md:text-base leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
               </div>
            </div>

            {/* Mobile CTA */}
            <div className="w-full mt-4 lg:hidden">
               <Link href={activeEnvironment.href} className="inline-block w-full">
                 <Button variant="interactive" size="lg" className="w-full">
                   {activeEnvironment.cta}
                 </Button>
               </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
