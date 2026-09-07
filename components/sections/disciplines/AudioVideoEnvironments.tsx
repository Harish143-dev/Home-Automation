"use client";

import React, { useRef, useState, useEffect } from "react";
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
    title: "Residential",
    tab: "Residential",
    icon: Home,
    description: "Transform homes with immersive entertainment, whole-home audio, home theatres, and effortless AV control.",
    pointers: [
      "Multi-Room Audio & Video",
      "Home Theatre Systems",
      "Media & Entertainment Rooms",
      "Centralized AV Control",
      "Integrated Lighting & Shading"
    ],
    cta: "Explore Residential Solutions",
    href: "/residential"
  },
  {
    id: "commercial",
    title: "Commercial",
    tab: "Commercial",
    icon: Building2,
    description: "Create connected workplaces with professional AV, seamless collaboration, and intuitive control across meeting and presentation spaces.",
    pointers: [
      "Video Conferencing",
      "Meeting & Boardroom AV",
      "LED Video Walls",
      "Projection Systems",
      "Centralized AV Control"
    ],
    cta: "Explore Commercial Solutions",
    href: "/commercial"
  },
  {
    id: "hospitality",
    title: "Hospitality",
    tab: "Hospitality",
    icon: Hotel,
    description: "Elevate guest experiences with seamless entertainment, communication, and AV solutions across hotels and hospitality spaces.",
    pointers: [
      "Guest Room Entertainment",
      "Multi-Room Audio",
      "Conference & Event AV",
      "LED Video Walls & Displays",
      "Integrated AV Control"
    ],
    cta: "Explore Hospitality Solutions",
    href: "/hospitality"
  }
];

export function AudioVideoEnvironments() {
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
      className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-panel text-foreground overflow-hidden border-t border-black/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <h2 className="text-foreground mb-6 text-balance">
            Audio Video Automation for Every Environment
          </h2>
          <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed text-balance max-w-3xl mx-auto">
            Different spaces demand different AV experiences. Our solutions are designed to adapt to the way people live, work, connect, and interact.
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
                  <h5 className="text-foreground tracking-[0.1em] text-xs sm:text-sm mb-6">
                    Solutions Pointers
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
