"use client";

import React from "react";
import {
  SlidersHorizontal,
  RadioReceiver,
  Sparkles,
  MonitorSmartphone
} from "lucide-react";

const SYSTEM_ITEMS = [
  {
    title: "Smart Controls",
    eyebrow: "Intuitive interfaces for effortless control.",
    description: "Keypads, touch panels, mobile apps, and voice control allow users to adjust lighting levels and manage multiple areas with ease.",
    icon: SlidersHorizontal
  },
  {
    title: "Sensors",
    eyebrow: "Lighting that responds to the environment.",
    description: "Occupancy, motion, daylight, and other inputs can trigger lighting responses based on how the space is being used.",
    icon: RadioReceiver
  },
  {
    title: "Automation",
    eyebrow: "Personalised scenes and intelligent responses.",
    description: "Set schedules, scenes, triggers, and predefined conditions to create the right lighting environment for every activity.",
    icon: Sparkles
  },
  {
    title: "Centralized Management",
    eyebrow: "One platform. Complete control.",
    description: "Monitor and manage lighting across multiple spaces through a centralised control system, while integrating with shades, HVAC, AV, and other connected systems.",
    icon: MonitorSmartphone
  }
];

export function LightingAutomationSystem() {
  return (
    <section
      className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-panel text-foreground overflow-hidden border-t border-black/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left: Sticky Header */}
        <div className="w-full lg:w-5/12 flex flex-col">
          <div className="lg:sticky lg:top-32">
             <h2 className="text-foreground text-balance">
               What Is Lighting Automation?
             </h2>
             <p className="mt-6 text-muted-foreground font-light text-base md:text-lg leading-relaxed">
               Lighting automation uses intelligent controls, sensors, software, and connected devices to automatically manage lighting based on time, occupancy, daylight, activity, or user preferences.
             </p>
          </div>
        </div>

        {/* Right: Scrollable List */}
        <div className="w-full lg:w-7/12 flex flex-col gap-12 md:gap-16 pt-4">
           {SYSTEM_ITEMS.map((item, idx) => (
             <div key={idx} className="flex flex-col md:flex-row gap-6 md:gap-8 group">
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-background border border-black/5 flex items-center justify-center text-accent transition-all duration-500 group-hover:scale-110 group-hover:border-accent/20 group-hover:shadow-lg group-hover:shadow-accent/5">
                     <item.icon className="w-8 h-8 stroke-[1.5]" />
                  </div>
                </div>
                <div className="flex flex-col">
                   <h3 className="text-foreground">{item.title}</h3>
                   <span className="text-accent tracking-wide text-sm md:text-base mb-3 mt-1 block">
                     {item.eyebrow}
                   </span>
                   <p className="text-muted-foreground font-light text-sm md:text-base leading-relaxed">
                     {item.description}
                   </p>
                </div>
             </div>
           ))}
        </div>

      </div>
    </section>
  );
}
