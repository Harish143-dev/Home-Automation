"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";

const JOURNEY_MILESTONES = [
  {
    year: "2002",
    title: "Foundation",
    description: "Anusha Technovision was founded with a vision to redefine intelligent automation and smart living in India."
  },
  {
    year: "2008",
    title: "First Major Milestone",
    description: "Expanded our portfolio by integrating advanced lighting control systems for premium residential projects."
  },
  {
    year: "2015",
    title: "Commercial Expansion",
    description: "Successfully delivered large-scale automation for leading corporate offices and hospitality chains."
  },
  {
    year: "2020",
    title: "National Reach",
    description: "Established a pan-India presence with Experience Centers in Delhi, Mumbai, and Bengaluru."
  },
  {
    year: "2024",
    title: "Future of Automation",
    description: "Continuing to innovate and set new benchmarks in intelligent buildings and customer-centric technology."
  }
];

export default function OurJourney() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const { isReady, isMobile } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !containerRef.current || !scrollWrapperRef.current || !trackRef.current) return;

    if (!isMobile) {
      // Desktop Horizontal Scroll
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center center",
          end: `+=${trackWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => scheduleScrollRefresh(),
        }
      });

      // Move the track horizontally
      tl.to(trackRef.current, {
        x: -(trackWidth - viewportWidth),
        ease: "none",
      });

      // Fill the line progress alongside scroll
      if (lineRef.current) {
        tl.fromTo(lineRef.current, 
          { scaleX: 0 },
          { scaleX: 1, ease: "none", transformOrigin: "left center" },
          0
        );
      }
    } else {
      // Mobile Vertical Reveal
      const items = gsap.utils.toArray(".journey-mobile-item");
      items.forEach((item: any) => {
        gsap.fromTo(item, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
            }
          }
        );
      });
    }

    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [isReady, prefersReducedMotion, isMobile] });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-background text-foreground py-16 md:py-20 overflow-hidden"
    >
      {/* Noise Texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" aria-hidden="true">
        <filter id="noise-journey"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#noise-journey)" />
      </svg>

      {/* Header */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-12 md:px-24 mb-12 text-center">
        <span className="block tracking-[0.3em] uppercase text-sm md:text-base text-accent font-medium mb-4">
          Our Journey
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-[1.2]">
          Our Journey of Innovation
        </h2>
      </div>

      {/* Timeline Wrapper */}
      <div 
        ref={scrollWrapperRef} 
        className="relative z-10 w-full md:h-[450px]"
      >
        {/* Mobile vertical line */}
        <div className="md:hidden absolute left-[39px] top-0 bottom-0 w-[2px] bg-black/10 z-0" />

        <div 
          ref={trackRef} 
          className="flex flex-col md:flex-row items-start md:items-center h-full w-full md:w-max md:px-[20vw] relative z-10 pt-8 md:pt-0"
        >
          
          {/* Desktop horizontal lines */}
          <div className="hidden md:flex absolute inset-0 items-center justify-start pointer-events-none z-0">
            <div className="w-full h-[2px] bg-black/10" />
          </div>
          <div 
            ref={lineRef}
            className="hidden md:flex absolute inset-0 items-center justify-start pointer-events-none z-0 origin-left scale-x-0"
          >
            <div className="w-full h-[2px] bg-accent shadow-[0_0_10px_rgba(229,107,85,0.3)]" />
          </div>

          {JOURNEY_MILESTONES.map((milestone, idx) => {
            const isTop = idx % 2 === 0;

            return (
              <div 
                key={idx} 
                className="relative flex items-center justify-center w-full md:w-[400px] md:h-full flex-shrink-0 group z-10 journey-mobile-item"
              >
                
                {/* Node Dot Desktop */}
                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-background border-2 border-accent shadow-[0_0_15px_rgba(229,107,85,0.3)] transition-transform duration-300 group-hover:scale-150 z-20" />

                {/* Content Container (Desktop: Top or Bottom) */}
                <div className={`hidden md:flex flex-col items-center text-center absolute w-full px-8 ${isTop ? 'bottom-[50%] mb-8' : 'top-[50%] mt-8'}`}>
                  <div className="text-4xl lg:text-5xl font-light text-accent-soft mb-3">
                    {milestone.year}
                  </div>
                  <h3 className="text-xl md:text-2xl font-light mb-2 text-foreground">
                    {milestone.title}
                  </h3>
                  <p className="text-muted font-light text-sm leading-relaxed">
                    {milestone.description}
                  </p>

                  {/* Connecting Vertical Line */}
                  <div className={`absolute left-1/2 -translate-x-1/2 w-[1px] bg-black/10 transition-colors duration-300 group-hover:bg-accent/50 ${isTop ? 'top-full h-8' : 'bottom-full h-8'}`} />
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden flex w-full relative mb-12 last:mb-0 px-6 sm:px-12 text-left">
                  <div className="absolute left-[31px] top-2 w-4 h-4 rounded-full bg-background border-2 border-accent shadow-[0_0_15px_rgba(229,107,85,0.3)] z-20" />
                  <div className="ml-12 pr-4">
                    <div className="text-4xl font-light text-accent-soft mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-light mb-2 text-foreground">
                      {milestone.title}
                    </h3>
                    <p className="text-muted font-light text-sm leading-relaxed">
                      {milestone.description}
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
