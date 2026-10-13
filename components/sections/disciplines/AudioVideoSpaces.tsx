"use client";

import React, { useRef, useState } from "react";
import NextImage from "next/image";
import { ScrollTrigger, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";
import { cn } from "@/lib/utils";

const SPACES = [
  {
    title: "Home Theatre & Media Rooms",
    description: "Create immersive entertainment experiences with synchronized audio, video, lighting, and intuitive control.",
    image: "/images/av_home_theatre.png"
  },
  {
    title: "Boardrooms & Meeting Rooms",
    description: "Enable seamless meetings and presentations with integrated conferencing, display, audio, and control systems.",
    image: "/images/office-overview.png"
  },
  {
    title: "Lobby & Common Areas",
    description: "Enhance shared spaces with background audio, digital displays, and engaging visual experiences.",
    image: "/images/commercial_hero_bg.png"
  },
  {
    title: "Restaurants & Dining Spaces",
    description: "Set the right atmosphere with distributed audio and visual systems tailored to ambience and guest experience.",
    image: "/images/residential_hero_bg.png"
  },
  {
    title: "Banquet & Event Spaces",
    description: "Deliver flexible event experiences with scalable audio, video, projection, and display solutions.",
    image: "/images/av_interior_design.png"
  },
  {
    title: "Guest Rooms",
    description: "Offer effortless entertainment with simple, intuitive AV controls designed for comfort and convenience.",
    image: "/images/scenario_tv.png"
  }
];

export function AudioVideoSpaces() {
  const containerRef = useRef<HTMLElement>(null);
  const textElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    // Create ScrollTriggers for each text block to update active index
    textElementsRef.current.forEach((el, index) => {
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: "top 50%", // Triggers when the top of the text block hits the vertical center of the viewport
        end: "bottom 50%",
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      });
    });

    // Bulletproof GSAP Pin for the image card instead of CSS sticky
    if (imageCardRef.current) {
      ScrollTrigger.create({
        trigger: imageCardRef.current,
        start: "top 15%", // Stick it slightly down from the top
        endTrigger: containerRef.current,
        end: "bottom 75%", // Unpin before the section ends
        pin: true,
        pinSpacing: false, // Don't push other content down, just pin it
      });
    }

    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="relative w-full bg-background text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24">
        
        {/* Header */}
        <div className="pt-16 md:pt-24 pb-8 lg:pb-16 max-w-3xl">
          <h2 className="text-foreground mb-6 text-balance">
            Designed for Every Space That Needs an Experience
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row relative">
          
          {/* Left Column: Scrolling Text */}
          <div className="w-full lg:w-1/2 flex flex-col lg:pt-[10vh] pb-[5vh] lg:pb-[30vh]">
            {SPACES.map((space, idx) => (
              <div 
                key={idx} 
                ref={el => { textElementsRef.current[idx] = el; }}
                className={cn(
                  "flex flex-col justify-center min-h-[30vh] lg:min-h-[50vh] py-10 lg:py-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  "border-b border-black/5 lg:border-none last:border-none",
                  activeIndex === idx ? "lg:opacity-100" : "lg:opacity-30"
                )}
              >
                {/* Mobile/Tablet Image (Inline) */}
                <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden mb-8 lg:hidden bg-panel shadow-sm">
                  <NextImage 
                    src={space.image}
                    alt={space.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <h3 className="text-foreground mb-6">
                  {space.title}
                </h3>
                <p className="text-muted-foreground font-light text-lg md:text-xl leading-relaxed max-w-md">
                  {space.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column: Sticky Image Container (Desktop Only) */}
          <div className="hidden lg:block w-1/2 relative pl-8 lg:pl-16">
            <div ref={imageCardRef} className="h-[60vh] w-full rounded-3xl overflow-hidden bg-panel shadow-2xl border border-black/5 relative">
              {SPACES.map((space, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    activeIndex === idx ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-[1.03]"
                  )}
                >
                  <NextImage
                    src={space.image}
                    alt={space.title}
                    fill
                    priority={idx === 0}
                    className="object-cover transition-transform duration-[2s] ease-out hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
