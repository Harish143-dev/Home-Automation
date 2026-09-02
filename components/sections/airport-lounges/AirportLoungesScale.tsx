"use client";

import React, { useRef } from "react";
import NextImage from "next/image";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { EASE, DURATION } from "../../../lib/animation.config";
import { scheduleScrollRefresh } from "../../../lib/scrollRefresh";

const LOUNGE_TYPES = [
  {
    title: "Premium Lounge",
    description: "Compact, high-touch spaces where refined lighting scenes and quiet, personalized ambience matter most.",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Business Lounge",
    description: "Mid-size spaces balancing comfort with throughput — flexible zones for work, dining, and rest areas.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Large Multi-Zone Lounge",
    description: "Multi-zone airport facilities needing centralized control across dozens of areas, high passenger turnover, and 24/7 reliability.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop"
  }
];

export function AirportLoungesScale() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    // Animate Header
    tl.fromTo(".scale-header",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: DURATION.normal, stagger: 0.1, ease: EASE.reveal }
    );

    // Animate Cards
    const cards = gsap.utils.toArray('.scale-card');
    tl.fromTo(cards,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: DURATION.normal, stagger: 0.15, ease: EASE.reveal },
      "-=0.4"
    );

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative w-full bg-background px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-16">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h5 className="scale-header text-accent block mb-4">
            Tailored Automation
          </h5>
          <h2 className="scale-header text-foreground text-balance mb-6">
            Every Lounge Has Different Requirements
          </h2>
          <p className="scale-header text-lg md:text-xl font-light text-muted-foreground leading-relaxed text-balance">
            From compact premium lounges to large multi-zone airport facilities, we design automation around the space, operational model, passenger profile, and technology requirements.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LOUNGE_TYPES.map((lounge, i) => (
            <div key={i} className="scale-card flex flex-col group cursor-default">
              
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-panel mb-6 shadow-sm shadow-black/5">
                <NextImage 
                  src={lounge.image}
                  alt={lounge.title}
                  fill
                  className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col px-2">
                <h3 className="text-xl md:text-2xl font-medium text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  {lounge.title}
                </h3>
                <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed">
                  {lounge.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
