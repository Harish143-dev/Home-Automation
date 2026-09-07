"use client";

import React, { useState } from "react";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const SOLUTIONS = [
  {
    id: "audio-distribution",
    title: "Audio Distribution",
    description: "Distribute high-quality audio across multiple rooms and zones with centralized or independent control."
  },
  {
    id: "video-distribution",
    title: "Video Distribution",
    description: "Share and manage video content across multiple displays and spaces through a centralized system."
  },
  {
    id: "home-theatre",
    title: "Home Theatre Systems",
    description: "Create immersive cinema experiences with synchronized audio, video, lighting, and intuitive control."
  },
  {
    id: "video-conferencing",
    title: "Video Conferencing",
    description: "Enable seamless communication and collaboration with professionally designed video conferencing environments."
  },
  {
    id: "led-walls",
    title: "LED Video Walls",
    description: "Deliver high-impact visual experiences with high-performance LED displays designed for immersive viewing."
  },
  {
    id: "projection",
    title: "Projection Systems",
    description: "Combine projectors and motorized screens for presentations, entertainment, events, and large-format viewing."
  },
  {
    id: "multi-room",
    title: "Multi-Room AV",
    description: "Enjoy synchronized or independent audio and video experiences across multiple rooms and spaces."
  },
  {
    id: "centralized-control",
    title: "Centralized AV Control",
    description: "Manage multiple AV systems from a unified interface for effortless operation and simplified control."
  }
];

export function AudioVideoSolutions() {
  const [openId, setOpenId] = useState<string | null>(SOLUTIONS[0].id);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
    // Refresh ScrollTrigger after a slight delay to allow CSS transitions to finish
    setTimeout(() => {
      scheduleScrollRefresh();
    }, 450);
  };

  return (
    <section
      className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden border-t border-black/5"
    >
      <div className="max-w-4xl mx-auto flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-foreground mb-6 text-balance">
            Complete Audio Video Solutions Under One Roof
          </h2>
          <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed text-balance max-w-3xl mx-auto">
            From individual rooms to large-scale integrated environments, we design and implement AV solutions based on your space, requirements, and intended experience.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col border-t border-black/5">
          {SOLUTIONS.map((item) => {
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
                    "transition-colors duration-300 font-normal",
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
