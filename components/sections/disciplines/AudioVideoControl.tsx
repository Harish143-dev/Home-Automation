"use client";

import React from "react";
import { Tablet, Smartphone, Cast, Mic, SlidersHorizontal } from "lucide-react";

const CONTROLS = [
  {
    title: "Touch Panels",
    description: "Control your AV environment through intuitive wall-mounted or tabletop touch interfaces.",
    icon: Tablet
  },
  {
    title: "Mobile App",
    description: "Manage connected AV systems conveniently from your smartphone or tablet, wherever you are.",
    icon: Smartphone
  },
  {
    title: "Universal Remote",
    description: "Bring multiple entertainment devices together through one intuitive, easy-to-use remote.",
    icon: Cast
  },
  {
    title: "Voice Control",
    description: "Use supported voice assistants for convenient, hands-free control of compatible AV functions.",
    icon: Mic
  },
  {
    title: "Centralized Control",
    description: "Manage multiple rooms and connected systems through a unified interface for effortless operation.",
    icon: SlidersHorizontal
  }
];

export function AudioVideoControl() {
  return (
    <section className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-panel text-foreground overflow-hidden border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
          <h2 className="text-foreground mb-6 text-balance">
            Control Your AV Experience Your Way
          </h2>
          <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed text-balance">
            From dedicated control panels to mobile applications and voice commands, choose the interface that works best for your environment.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-12 pt-12 border-t border-black/5">
          {CONTROLS.map((control, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-start text-left relative group pt-6"
            >
              {/* Hover Line */}
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-accent transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full -mt-[1px]" />
              
              <div className="mb-6 text-foreground/40 group-hover:text-accent transition-colors duration-500">
                <control.icon className="w-8 h-8 md:w-10 md:h-10 stroke-[1]" />
              </div>
              
              <h3 className="text-foreground mb-4">
                {control.title}
              </h3>
              
              <p className="text-muted-foreground font-light text-sm md:text-base leading-relaxed">
                {control.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
