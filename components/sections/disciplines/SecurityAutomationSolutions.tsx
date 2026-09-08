"use client";

import React, { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";
import { cn } from "@/lib/utils";
import { Camera, Key, Lock, Video, ShieldAlert, UserCheck, CheckCircle2 } from "lucide-react";

const SOLUTIONS = [
  {
    id: "cctv",
    title: "CCTV & Video Surveillance",
    tab: "CCTV & Surveillance",
    icon: Camera,
    description: "Monitor your property with strategically positioned surveillance systems designed to improve visibility across critical areas.",
    pointers: [
      "Live & remote video monitoring",
      "Multiple camera locations",
      "Recording & playback",
      "Mobile / app-based viewing",
      "Coverage of critical areas"
    ]
  },
  {
    id: "access-control",
    title: "Access Control Systems",
    tab: "Access Control",
    icon: Key,
    description: "Control who can enter specific spaces and manage access according to users, locations, and permissions.",
    pointers: [
      "User-based access permissions",
      "Access by location / zone",
      "Keypad & credential-based entry",
      "Entry activity tracking",
      "Restricted-area management"
    ]
  },
  {
    id: "smart-locks",
    title: "Smart Locks & Door Automation",
    tab: "Smart Locks",
    icon: Lock,
    description: "Combine security and convenience with intelligent locking and access solutions.",
    pointers: [
      "Smart door locking",
      "Keypad / credential access",
      "Remote lock & unlock",
      "Automated door control",
      "Integration with access systems"
    ]
  },
  {
    id: "video-door-phones",
    title: "Video Door Phones & Intercom",
    tab: "Video Door Phones",
    icon: Video,
    description: "Identify and communicate with visitors before granting access.",
    pointers: [
      "Live visitor video",
      "Two-way communication",
      "Door release control",
      "Indoor & outdoor stations",
      "Remote visitor access"
    ]
  },
  {
    id: "intrusion-detection",
    title: "Intrusion Detection",
    tab: "Intrusion Detection",
    icon: ShieldAlert,
    description: "Detect unauthorized entry and receive alerts when security zones are breached.",
    pointers: [
      "Door & window monitoring",
      "Motion detection",
      "Security zone monitoring",
      "Instant event alerts",
      "Unauthorized-entry detection"
    ]
  },
  {
    id: "visitor-management",
    title: "Visitor Management",
    tab: "Visitor Management",
    icon: UserCheck,
    description: "Create a more secure and organized visitor experience with controlled entry and visitor tracking.",
    pointers: [
      "Visitor registration",
      "Controlled entry approval",
      "Visitor activity tracking",
      "Host notifications",
      "Access history"
    ]
  }
];

export function SecurityAutomationSolutions() {
  const [activeTabId, setActiveTabId] = useState<string>(SOLUTIONS[0].id);
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const prefersReducedMotion = useReducedMotion();
  const activeSolution = SOLUTIONS.find(sol => sol.id === activeTabId) || SOLUTIONS[0];

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
            Complete Security Solutions, Integrated Around You
          </h2>
          <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed text-balance max-w-3xl mx-auto">
            From individual homes to large-scale commercial and hospitality environments, we design security systems around your property&apos;s specific requirements.
          </p>
        </div>

        {/* Tabs Desktop/Mobile */}
        <div ref={tabsRef} className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 md:mb-16">
          {SOLUTIONS.map((sol) => {
            const isActive = activeTabId === sol.id;
            return (
              <button
                key={sol.id}
                onClick={() => setActiveTabId(sol.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 md:px-8 md:py-4 rounded-full border transition-all duration-300",
                  isActive 
                    ? "bg-foreground text-background border-foreground shadow-lg scale-105" 
                    : "bg-background text-foreground border-black/10 hover:border-black/30 hover:bg-black/5"
                )}
              >
                <sol.icon className={cn("w-4 h-4 md:w-5 md:h-5", isActive ? "text-background" : "text-muted-foreground")} strokeWidth={isActive ? 2 : 1.5} />
                <span className="text-sm md:text-base tracking-wide whitespace-nowrap">{sol.tab}</span>
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
                 {activeSolution.title}
               </h3>
               <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed mb-10">
                 {activeSolution.description}
               </p>
            </div>

            {/* Right: Lists */}
            <div className="w-full lg:w-7/12">
               <div className="flex flex-col">
                  <h5 className="text-foreground mb-6">
                    Capabilities & Pointers
                  </h5>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeSolution.pointers.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="text-muted-foreground font-light text-sm md:text-base leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
               </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
