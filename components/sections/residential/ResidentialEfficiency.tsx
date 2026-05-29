"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "../../../lib/utils";

const CATEGORIES = [
  {
    id: "comfort-ambience",
    title: "Comfort & Ambience",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
    services: [
      {
        id: "lighting",
        title: "Lighting Automation",
        description: "Lights adjust automatically to occupancy, daylight levels, and time of day — eliminating waste from unoccupied spaces. Mood scenes replace manual switching, reducing human error and over-illumination across large homes.",
        metric: "30-40% energy saved",
      },
      {
        id: "shades",
        title: "Shades",
        description: "Motorised shades respond to sun position and interior temperature — blocking heat gain in summer, retaining warmth in winter. This directly reduces the load on HVAC systems without compromising natural light or views.",
        metric: "15-25% HVAC load saved",
      },
      {
        id: "hvac",
        title: "HVAC",
        description: "Intelligent climate control maintains temperature only in occupied zones, syncs with occupancy schedules, and avoids redundant heating or cooling. Connected to shades and occupancy sensors, the system operates at peak efficiency at all times.",
        metric: "20-35% saved",
      }
    ]
  },
  {
    id: "entertainment-experience",
    title: "Entertainment Experience",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=1200",
    services: [
      {
        id: "home-theatre",
        title: "Home Theatre",
        description: "Equipment powers on and off as a single scene rather than leaving amplifiers, projectors, and processors in standby indefinitely. Automated blackout shades, lighting scenes, and temperature presets activate together; creating the experience without manual prep.",
        metric: "Up to 20% energy saved (standby elimination)",
      },
      {
        id: "audio-video",
        title: "Audio Video System",
        description: "Centralised AV control eliminates redundant devices in each room. Source equipment is shared across zones, reducing the total number of power-drawing units while improving performance and signal quality.",
        metric: "15–20% energy saved",
      },
      {
        id: "distribution",
        title: "Distribution",
        description: "A single distribution backbone routes audio and video to any room on demand, replacing standalone devices in each space. Active zones consume power; inactive zones draw none. Managed remotely, nothing is left running.",
        metric: "15–20% energy saved",
      },
      {
        id: "speakers",
        title: "Speakers",
        description: "In-wall and in-ceiling speakers eliminate the power overhead of individual Bluetooth or wireless units spread across rooms. Driven by a shared amplifier that scales output by zone, power consumption is matched precisely to what is actually playing.",
        metric: "10–15% energy saved (vs standalone)",
      }
    ]
  },
  {
    id: "effortless-control",
    title: "Effortless Control",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200",
    services: [
      {
        id: "keypads",
        title: "Keypads",
        description: "Scene based keypads replace banks of individual switches, enabling one press to control lighting, climate, shades, and AV simultaneously. \"Leave home\" and \"Good night\" scenes ensure nothing is left on. Completely customisable. Backlight options available.",
        metric: "Enables savings across all systems",
      },
      {
        id: "touch-panels",
        title: "Touch Panels",
        description: "Centralised touch panels surface real-time energy data alongside controls, giving residents and facility managers immediate visibility into consumption. Awareness alone has been shown to drive behaviour that cuts usage further.",
        metric: "Enables savings across all systems",
      },
      {
        id: "mobile-control",
        title: "Mobile Control",
        description: "Remote access ensures systems are never left running unnecessarily — HVAC, lights, and AV can be switched off from anywhere. Geofencing capabilities allow the home to power down automatically when the family leaves and prepare itself before they return.",
        metric: "Enables savings across all systems",
      }
    ]
  },
  {
    id: "safety-security",
    title: "Safety & Security",
    image: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&q=80&w=1200",
    services: [
      {
        id: "integrated-security",
        title: "Integrated Security Systems",
        description: "Completely eliminates keys and locks, using fingerprint systems for entry. Cameras, sensors, and alarms operate on motion-triggered logic rather than continuously, reducing standby power draw significantly. Integration with lighting and HVAC means the home secures and powers down together, not in separate, forgotten steps.",
        metric: "10–15% saved (standby load)",
      }
    ]
  }
];

export function ResidentialEfficiency() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

  const activeCategory = CATEGORIES[activeIndex];

  // Handle Category Change
  const selectCategory = (index: number) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
      setOpenAccordionId(null); // Reset accordion when switching categories
    }
  };

  // Handle Accordion Toggle
  const toggleAccordion = (id: string) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
  };

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-background relative z-10 overflow-hidden min-h-screen flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-[1.2] text-foreground mb-4">
          Efficiency & Performance
        </h2>
        <p className="text-base md:text-lg text-muted max-w-2xl font-sans leading-relaxed">
          Our intelligent systems not only elevate your lifestyle but actively optimize energy usage.
        </p>
      </div>

      {/* Infinite Coverflow Carousel */}
      <div className="relative w-full h-[35vh] md:h-[45vh] lg:h-[55vh] flex items-center justify-center mb-0 select-none py-8">
        {CATEGORIES.map((category, index) => {
          const total = CATEGORIES.length;
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
          // translateX: Center is -50%. Left is pushed left (-120%), Right is pushed right (20%)
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
              key={`carousel-${category.id}`}
              className={cn(
                "absolute top-8 bottom-8 w-[75vw] sm:w-[50vw] md:w-[45vw] lg:w-[40vw] xl:w-[35vw] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]",
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
                if (!isCenter && !isBack) selectCategory(index);
              }}
            >
              <div className={cn(
                "relative w-full h-full overflow-hidden rounded-2xl md:rounded-[32px] transition-all duration-700",
                isCenter ? "shadow-2xl" : "shadow-lg"
              )}>
                <Image
                  src={category.image}
                  alt={category.title}
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
                  "absolute bottom-0 left-0 right-0 p-5 md:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-700",
                  isCenter ? "opacity-100" : "opacity-0"
                )}>

                  <h3 className="text-xl md:text-2xl font-light tracking-wide leading-[1.2] text-white drop-shadow-md">
                    {category.title}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Accordion Section (Services for Active Category) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl mt-0 md:mt-2 flex-1 flex flex-col justify-start">
        <div className="mb-6">
          <h4 className="font-mono tracking-[0.3em] uppercase text-muted">
            Services under <span className="text-foreground">{activeCategory.title}</span>
          </h4>
        </div>
        <div className="border-t border-border transition-all duration-500">
          {activeCategory.services.map((service) => {
            const isOpen = openAccordionId === service.id;
            return (
              <div key={`accordion-${service.id}`} className="border-b border-border">
                <button
                  onClick={() => toggleAccordion(service.id)}
                  className="w-full py-4 md:py-5 flex items-center justify-between group text-left focus:outline-none"
                >
                  <h3 className={cn(
                    "text-base md:text-lg lg:text-xl font-light tracking-wide leading-[1.2] transition-colors duration-500",
                    isOpen ? "text-accent" : "text-foreground group-hover:text-foreground/60"
                  )}>
                    {service.title}
                  </h3>
                  <div className="ml-4 flex-shrink-0">
                    <div className={cn(
                      "w-6 h-6 flex items-center justify-center transition-transform duration-500",
                      isOpen ? "rotate-180" : "rotate-0"
                    )}>
                      <svg
                        className={cn("w-4 h-4 transition-colors duration-500", isOpen ? "text-accent" : "text-muted-foreground group-hover:text-foreground")}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </div>
                  </div>
                </button>

                <div
                  className={cn(
                    "grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden",
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-5 md:pb-6" : "grid-rows-[0fr] opacity-0 pb-0"
                  )}
                >
                  <div className="min-h-0">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 pt-1 md:pt-2 md:px-2">
                      <div className="flex-1">
                        <p className="text-sm md:text-base text-muted font-sans leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                      <div className="md:w-[35%] flex flex-col justify-end border-l border-border/60 pl-4 md:pl-6">
                        <span className="font-mono tracking-[0.3em] uppercase text-muted mb-1.5 opacity-70">Efficiency Metric</span>
                        <span className="text-base md:text-lg font-light tracking-wide text-accent leading-tight">{service.metric}</span>
                      </div>
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
