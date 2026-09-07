"use client";

import React from "react";
import {
  Network,
  Sparkles,
  SlidersHorizontal
} from "lucide-react";

const SYSTEM_ITEMS = [
  {
    title: "Connect",
    description: "Bring audio, video, displays, projectors, and control systems together into one connected environment.",
    icon: Network
  },
  {
    title: "Automate",
    description: "Set scenes, schedules, and automated actions that make everyday AV experiences effortless.",
    icon: Sparkles
  },
  {
    title: "Control",
    description: "Manage your entire AV environment through intuitive keypads, touchscreens, apps, or centralized interfaces.",
    icon: SlidersHorizontal
  }
];

export function AudioVideoSystem() {
  return (
    <section
      className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-panel text-foreground overflow-hidden border-t border-black/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left: Sticky Header */}
        <div className="w-full lg:w-5/12 flex flex-col">
          <div className="lg:sticky lg:top-32">
             <h2 className="text-foreground text-balance">
               What Is Audio Video Automation?
             </h2>
             <p className="mt-6 text-muted-foreground font-light text-base md:text-lg leading-relaxed">
               Audio video automation connects your entertainment, communication, and display technologies with intelligent control systems, allowing multiple devices and environments to work together seamlessly.
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
                <div className="flex flex-col justify-center">
                   <h3 className="text-foreground mb-3">{item.title}</h3>
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
