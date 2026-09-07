"use client";

import React from "react";
import {
  Hand,
  Smartphone,
  Mic,
  Clock,
  Sun,
  Home
} from "lucide-react";

const CONTROLS = [
  {
    title: "One-Touch Control",
    description: "Elegant wall-mounted keypads provide instant access to pre-programmed shade scenes for any activity or time of day.",
    icon: Hand
  },
  {
    title: "Mobile App",
    description: "Manage individual shades or entire rooms from a sophisticated app on your smartphone or tablet, whether you are home or away.",
    icon: Smartphone
  },
  {
    title: "Voice Control",
    description: "Integrate with voice assistants for hands-free operation, allowing you to open or close shades with simple verbal commands.",
    icon: Mic
  },
  {
    title: "Automated Scheduling",
    description: "Set your shades to automatically open at sunrise and close at sunset, creating a seamless daily rhythm without any manual input.",
    icon: Clock
  },
  {
    title: "Sunlight-Based Automation",
    description: "Smart sensors monitor daylight levels and automatically adjust shades to manage glare, protect furniture, and regulate room temperature.",
    icon: Sun
  },
  {
    title: "Centralized Control",
    description: "Command motorized window treatments across multiple rooms, zones, or entire floors from a single, unified control platform.",
    icon: Home
  }
];

export function ShadeAutomationControl() {
  return (
    <section
      className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-panel text-foreground overflow-hidden border-t border-black/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left: Sticky Header */}
        <div className="w-full lg:w-5/12 flex flex-col">
          <div className="lg:sticky lg:top-32">
             <h2 className="text-foreground text-balance">
               Control Your Shades Your Way
             </h2>
             <p className="mt-6 text-muted-foreground font-light text-base md:text-lg leading-relaxed">
               From a single button to fully automated schedules, choose the level of control that suits your space and lifestyle perfectly.
             </p>
          </div>
        </div>

        {/* Right: Scrollable List */}
        <div className="w-full lg:w-7/12 flex flex-col gap-12 md:gap-16 pt-4">
           {CONTROLS.map((control, idx) => (
             <div key={idx} className="flex flex-col md:flex-row gap-6 md:gap-8 group">
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-background border border-black/5 flex items-center justify-center text-accent transition-all duration-500 group-hover:scale-110 group-hover:border-accent/20 group-hover:shadow-lg group-hover:shadow-accent/5">
                     <control.icon className="w-8 h-8 stroke-[1.5]" />
                  </div>
                </div>
                <div className="flex flex-col">
                   <h3 className="text-foreground mb-3">{control.title}</h3>
                   <p className="text-muted-foreground font-light text-sm md:text-base leading-relaxed">
                     {control.description}
                   </p>
                </div>
             </div>
           ))}
        </div>

      </div>
    </section>
  );
}
