"use client";

import React, { useState } from "react";
import { cn } from "../../../lib/utils";

const PHILOSOPHY_DATA = [
  {
    id: "luxury-living",
    title: "Luxury Living",
    description: "Emotionally intelligent spaces, built around human experience rather than hardware, transform how you inhabit every room, and how every room makes you feel. A truly intelligent home responds to you. Light shifts with the time of day, sound adjusts to the mood of the room, temperature follows the rhythm of rest, focus and gathering. These conditions make a home feel alive."
  },
  {
    id: "future-ready",
    title: "Future-Ready Homes",
    description: "Built for multigenerational living, a smart home grows with the family inside it, adapting to diverse needs and remaining relevant long after the first installation. The homes being built today will be lived in across generations, by people with different physical, cognitive and sensory needs. Intelligent systems designed with this in mind, evolve. Scalable architecture supports new devices, new routines and new residents without rewiring or replacing."
  },
  {
    id: "security",
    title: "Security You Control",
    description: "Real security places human agency at its centre. Transparent controls, explainable systems and clear boundaries around data and access ensure that the people who live in a home remain in full command of it. Integrated sensors, cameras and alerts respond to what matters, when it matters. Monitored remotely and controlled intuitively, your home protects what is most important while preserving the trust of everyone inside it."
  },
  {
    id: "convenience",
    title: "Convenience",
    description: "Buildings that respond to human rhythms remove the need for constant decision-making. Lighting adjusts to the time of day, climate responds to occupancy, entertainment follows the room you are in. The best automation is invisible, it simply ensures that every space is ready for how you intend to use it, without requiring you to think about it. Life at home becomes less managed and more lived."
  },
  {
    id: "energy",
    title: "Automatic Energy Savings",
    description: "As energy instability reshapes the demands placed on buildings worldwide, the homes that are designed to respond intelligently will be the ones that endure. Automated climate systems, motorised shading and occupancy-led lighting work together to reduce consumption without reducing comfort. This is efficiency as a design principle, embedded into how the home operates from the moment it is switched on."
  }
];

export function ResidentialPhilosophy() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-16 md:py-20 bg-background relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mb-12 md:mb-16">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide leading-[1.2] text-foreground mb-5 text-balance break-words">
            Why Invest in Smart Home Automation?
          </h2>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row w-full h-[60vh] md:h-[450px] lg:h-[500px] gap-2 sm:gap-3 md:gap-4">
          {PHILOSOPHY_DATA.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={item.id}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative overflow-hidden rounded-2xl sm:rounded-[28px] md:rounded-[32px] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group border border-border flex flex-col",
                  isActive
                    ? "h-[340px] sm:h-[380px] md:h-full md:flex-[4_4_0%] bg-panel shadow-md z-10 scale-[1.01] md:scale-100"
                    : "h-[72px] sm:h-[80px] md:h-full md:flex-[1_1_0%] bg-surface-darker hover:bg-panel z-0"
                )}
              >
                {/* Collapsed Layout Container */}
                <div className={cn(
                  "absolute inset-0 z-20 pointer-events-none transition-opacity duration-300",
                  isActive ? "opacity-0" : "opacity-100 delay-300"
                )}>
                  {/* Desktop Collapsed Layout - Vertical Text at Bottom */}
                  <div className="hidden md:flex flex-col items-center justify-end w-full h-full pb-8 lg:pb-12">
                    <div className="relative w-6 h-[200px] lg:h-[250px]">
                      <div className="absolute top-full left-0 origin-top-left -rotate-90 whitespace-nowrap font-medium text-[15px] lg:text-[17px] leading-6 text-foreground tracking-wide transition-colors duration-300 group-hover:text-accent w-[200px] lg:w-[250px] text-left overflow-hidden text-ellipsis">
                        {item.title}
                      </div>
                    </div>
                  </div>

                  {/* Mobile Collapsed Layout - Horizontal Text */}
                  <div className="md:hidden flex items-center w-full h-full px-4 sm:p-5">
                    <div className="font-semibold text-[15px] sm:text-[17px] text-foreground tracking-tight transition-colors duration-300 group-hover:text-accent line-clamp-2 break-words">
                      {item.title}
                    </div>
                  </div>
                </div>

                {/* Expanded Content Area */}
                <div className={cn(
                  "flex-1 flex flex-col justify-end p-6 sm:p-8 md:p-10 lg:p-12 relative w-full h-full transition-all duration-500 delay-100",
                  isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}>
                  <div className="relative z-10 mt-auto max-w-xl">
                    <h3 className={cn(
                      "text-xl md:text-2xl lg:text-3xl font-light tracking-tight leading-[1.2] text-foreground mb-3 md:mb-4 text-balance break-words",
                      "transition-all duration-500 transform",
                      isActive ? "translate-y-0 opacity-100 delay-150" : "translate-y-8 opacity-0"
                    )}>
                      {item.title}
                    </h3>
                    <p className={cn(
                      "text-muted text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] leading-relaxed font-medium tracking-tight text-balance",
                      "transition-all duration-500 transform",
                      isActive ? "translate-y-0 opacity-100 delay-200" : "translate-y-8 opacity-0"
                    )}>
                      {item.description}
                    </p>
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
