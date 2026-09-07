"use client";

import React, { useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const NEEDS = [
  {
    id: "light-control",
    title: "Light Control",
    description: "Control individual lights, groups, or entire zones with intuitive keypads, touch interfaces, mobile apps, or automated controls.",
    pointers: [
      "One-touch control of multiple lights",
      "Individual or zoned lighting control",
      "Dim lights to the desired level",
      "Control lighting from keypads, apps, or touchscreens"
    ]
  },
  {
    id: "scene-mood",
    title: "Scene & Mood Control",
    description: "Create personalised lighting scenes that instantly set the right ambience for different activities, occasions, and times of day.",
    pointers: [
      "Evening / Welcome scene",
      "TV / Movie scene",
      "Reading / Working scene",
      "Dining / Entertaining scene",
      "One-touch adjustment of multiple lights"
    ]
  },
  {
    id: "daylight-management",
    title: "Daylight Management",
    description: "Balance natural and artificial light to create comfortable environments while making more effective use of available daylight.",
    pointers: [
      "Adjust lighting based on available daylight",
      "Coordinate lighting with motorised shades",
      "Maintain consistent ambience throughout the day",
      "Reduce unnecessary artificial lighting"
    ]
  },
  {
    id: "occupancy",
    title: "Occupancy-Based Control",
    description: "Make lighting responsive to how a space is being used with occupancy and motion-based automation.",
    pointers: [
      "Automatically switch or adjust lights when a space is occupied",
      "Turn lights off when areas are unoccupied",
      "Automate common-area and passage lighting",
      "Support energy-conscious lighting operation"
    ]
  },
  {
    id: "centralized",
    title: "Centralized Lighting Management",
    description: "Manage lighting across multiple rooms, floors, zones, or properties through a centralized control system.",
    pointers: [
      "Centralized control of multiple areas",
      "Monitor and manage lighting from a single interface",
      "Control lighting across different floors or zones",
      "Integrate lighting with shades, HVAC, AV, and other systems"
    ]
  },
  {
    id: "scheduling",
    title: "Automated Scheduling",
    description: "Automate lighting around time, daily routines, operating hours, events, or predefined schedules.",
    pointers: [
      "Scheduled ON/OFF control",
      "Morning and evening routines",
      "Business operating-hour schedules",
      "Event-based lighting",
      "Automatic lighting adjustments at predefined times"
    ]
  },
  {
    id: "remote",
    title: "Remote Control",
    description: "Stay connected to your lighting even when you are away, using mobile apps and connected control interfaces.",
    pointers: [
      "Control lighting remotely",
      "Check and manage lighting status",
      "Create or activate scenes from anywhere",
      "Manage lighting when travelling or away from the property"
    ]
  }
];

export function LightingAutomationNeeds() {
  const [openId, setOpenId] = useState<string | null>(NEEDS[0].id);
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const prefersReducedMotion = useReducedMotion();

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
    // Refresh ScrollTrigger after a slight delay to allow CSS transitions to finish
    setTimeout(() => {
      scheduleScrollRefresh();
    }, 450);
  };

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden"
    >
      <div className="max-w-4xl mx-auto flex flex-col">
        
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-24">
          <h2 className="text-foreground mb-6 text-balance">
            Complete Lighting Control, Designed Around Your Needs
          </h2>
          <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed text-balance mx-auto">
            From individual rooms to multi-zone environments, we design lighting control solutions around the scale, functionality, and requirements of each project. Create the right ambience, automate everyday routines, and manage lighting effortlessly through intuitive and connected controls.
          </p>
        </div>

        {/* Accordion List */}
        <div ref={listRef} className="flex flex-col border-t border-black/5">
          {NEEDS.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div 
                key={item.id} 
                className="border-b border-black/5 flex flex-col overflow-hidden"
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full py-6 md:py-8 flex items-center justify-between text-left focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <h3 className={cn(
                    "transition-colors duration-300",
                    isOpen ? "text-accent" : "text-foreground group-hover:text-accent/80"
                  )}>
                    {item.title}
                  </h3>
                  <div className="shrink-0 ml-4">
                    {isOpen ? (
                      <Minus className="w-5 h-5 md:w-6 md:h-6 text-accent transition-transform duration-300" strokeWidth={1} />
                    ) : (
                      <Plus className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground group-hover:text-accent transition-transform duration-300" strokeWidth={1} />
                    )}
                  </div>
                </button>

                {/* Accordion Content (CSS Transition for height) */}
                <div
                  className="grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="pb-8 md:pb-10 pt-2 flex flex-col gap-6">
                      <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed">
                        {item.description}
                      </p>
                      
                      {/* Use Case Pointers */}
                      {item.pointers.length > 0 && (
                        <div className="pt-6 border-t border-black/5 mt-2">
                          <h5 className="text-foreground text-sm tracking-[0.1em] mb-4">Use Case Pointers</h5>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {item.pointers.map((pointer, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0 mt-2" />
                                <span className="text-muted-foreground font-light text-sm md:text-base">{pointer}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
