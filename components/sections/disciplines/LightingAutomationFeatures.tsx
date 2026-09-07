"use client";

import React from "react";
import {
  Sliders,
  Zap,
  Layers,
  Leaf
} from "lucide-react";

const FEATURES = [
  {
    id: "control",
    title: "Control",
    icon: Sliders,
    description: "Manage lighting effortlessly through intuitive keypads, touchscreens, apps, or centralised interfaces. Adjust light levels and control multiple areas from a single, easy-to-use interface."
  },
  {
    id: "automate",
    title: "Automate",
    icon: Zap,
    description: "Create personalised scenes, schedules, and automated responses that adapt to everyday routines. From morning and evening settings to TV, reading, or entertaining scenes, your environment responds at the touch of a button—or automatically."
  },
  {
    id: "integrate",
    title: "Integrate",
    icon: Layers,
    description: "Connect lighting with motorised shades, HVAC, AV, security, and other systems to create one intelligent, connected environment. Simplify control, enhance comfort, and create a seamless experience across the entire space."
  },
  {
    id: "optimize",
    title: "Optimize",
    icon: Leaf,
    description: "Improve energy efficiency without compromising comfort or experience."
  }
];

export function LightingAutomationFeatures() {
  return (
    <section
      className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col">

        {/* Modern Split Header */}
        <div className="w-full flex flex-col xl:flex-row xl:items-end justify-between gap-10 xl:gap-16 mb-16 md:mb-24">
          <div className="max-w-3xl">
            <h2 className="text-foreground text-balance">
              More Than Switching Lights.<br />
              <span className="text-muted-foreground">Intelligent Control of Your Environment.</span>
            </h2>
          </div>
          <div className="max-w-xl xl:pb-2">
            <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed">
              Lighting is more than illumination—it shapes comfort, ambience, productivity, and energy efficiency. Our intelligent lighting control solutions bring lighting, daylight, motorised shades, HVAC, and other connected systems together, creating environments that respond seamlessly to how a space is used.
            </p>
          </div>
        </div>

        {/* Minimal Features Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 lg:gap-x-12 gap-y-12 pt-12 border-t border-black/5">
          {FEATURES.map((feature, idx) => (
            <div
              key={feature.id}
              className="flex flex-col items-start text-left relative group pt-6"
            >
              {/* Hover Line */}
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-accent transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full -mt-[1px]" />

              <div className="mb-6 text-foreground/40 group-hover:text-accent transition-colors duration-500">
                <feature.icon className="w-8 h-8 md:w-10 md:h-10 stroke-[1]" />
              </div>

              <h3 className="text-foreground mb-4">
                {feature.title}
              </h3>

              <p className="text-muted-foreground font-light text-sm md:text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
