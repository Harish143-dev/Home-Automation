"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { cn } from "../../../lib/utils";

const INTEGRATIONS = [
  {
    id: "light-control",
    title: "Light Control",
    description: "Create the perfect atmosphere in every room with intelligent lighting scenes, precision dimming, automated schedules, occupancy sensing, and effortless one-touch control that complements the way you live.",
    image: "https://images.unsplash.com/photo-1565538810844-1e1194826c91?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "blind-control",
    title: "Blind Control",
    description: "Motorized blinds and curtains adjust automatically throughout the day to maximize natural light, minimize glare, enhance privacy, and maintain a comfortable indoor environment.",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "temperature-control",
    title: "Temperature Control",
    description: "Integrate climate control with lighting and occupancy settings to maintain consistent indoor comfort while improving overall system efficiency.",
    image: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "energy-control",
    title: "Energy Control",
    description: "Optimize energy performance through intelligent scheduling, occupancy sensing, daylight-responsive automation, and customized scene control helping reduce energy use while maintaining exceptional comfort.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop"
  }
];

export default function LightingIntegration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeIntegration = INTEGRATIONS[activeIndex];

  // Handle Category Change
  const selectIntegration = (index: number) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
    }
  };

  return (
    <section ref={containerRef} id="lighting-integration" className="py-12 md:py-16 bg-background relative z-10 overflow-hidden flex flex-col">
      {/* Subtle Noise Texture Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none" aria-hidden="true">
        <filter id="noise-integration-redesign">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-integration-redesign)" />
      </svg>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16 relative z-10">
        <span className="inline-block text-sm md:text-base tracking-[0.3em] text-accent mb-4 font-light ">
          Integration
        </span>
        <h2 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground mb-4 max-w-3xl">
          One Intelligent System. Complete Home Control.
        </h2>
        <p className="text-base md:text-lg text-muted max-w-2xl font-sans leading-relaxed">
          Bring every smart home function together on a single platform. Control lighting, motorized shades, climate, and energy management through elegant keypads, mobile apps, voice commands, or personalized automation scenes.
        </p>
      </div>

      {/* Infinite Coverflow Carousel */}
      <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] flex items-center justify-center mb-8 md:mb-12 select-none py-8 z-10">
        {INTEGRATIONS.map((integration, index) => {
          const total = INTEGRATIONS.length;
          let diff = index - activeIndex;

          // Wrap around logic for infinite feel
          if (diff < -total / 2) diff += total;
          if (diff > total / 2) diff -= total;

          // We have 4 items. diff can be -1, 0, 1, 2.
          let position: 'center' | 'left' | 'right' | 'back' = 'back';
          if (diff === 0) position = 'center';
          else if (diff === -1) position = 'left';
          else if (diff === 1) position = 'right';
          else position = 'back'; // diff 2 or -2

          const isCenter = position === 'center';
          const isLeft = position === 'left';
          const isRight = position === 'right';
          const isBack = position === 'back';

          // Visual calculations for Coverflow
          let translateX = '-50%';
          let scale = 1;
          let opacity = 1;
          let zIndex = 30;

          if (isCenter) {
            translateX = '-50%';
            scale = 1;
            opacity = 1;
            zIndex = 30;
          } else if (isLeft) {
            translateX = '-120%'; // Push left
            scale = 0.8;
            opacity = 0.4;
            zIndex = 20;
          } else if (isRight) {
            translateX = '20%'; // Push right
            scale = 0.8;
            opacity = 0.4;
            zIndex = 20;
          } else if (isBack) {
            translateX = '-50%'; // Hide behind center
            scale = 0.6;
            opacity = 0;
            zIndex = 10;
          }

          return (
            <div
              key={`carousel-${integration.id}`}
              className={cn(
                "absolute top-4 bottom-4 md:top-8 md:bottom-8 w-[75vw] sm:w-[50vw] md:w-[45vw] lg:w-[40vw] xl:w-[35vw] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]",
                isCenter ? "cursor-default" : "cursor-pointer hover:opacity-70"
              )}
              style={{
                left: '50%',
                transform: `translateX(${translateX}) scale(${scale})`,
                opacity: opacity,
                zIndex: zIndex,
                pointerEvents: isBack ? 'none' : 'auto'
              }}
              onClick={() => {
                if (!isCenter && !isBack) selectIntegration(index);
              }}
            >
              <div className={cn(
                "relative w-full h-full overflow-hidden rounded-2xl md:rounded-[32px] transition-all duration-700 bg-panel border border-border",
                isCenter ? "shadow-2xl" : "shadow-lg"
              )}>
                <Image
                  src={integration.image}
                  alt={integration.title}
                  fill
                  className={cn(
                    "object-cover transition-transform duration-1000",
                    isCenter ? "scale-100" : "scale-[1.05]"
                  )}
                />
                <div className={cn(
                  "absolute inset-0 bg-black/40 transition-opacity duration-1000",
                  isCenter ? "opacity-0" : "opacity-100"
                )} />

                {/* Title Overlay */}
                <div className={cn(
                  "absolute bottom-0 left-0 right-0 p-5 md:p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-700",
                  isCenter ? "opacity-100" : "opacity-0"
                )}>
                  <h3 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-white drop-shadow-md">
                    {integration.title}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Description for Active Integration */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center relative z-10 flex flex-col items-center">
        <div key={activeIntegration.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both">
          <p className="text-base md:text-xl text-muted font-light leading-relaxed max-w-3xl mx-auto">
            {activeIntegration.description}
          </p>
        </div>
      </div>
    </section>
  );
}
