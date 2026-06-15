"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

interface EnvironmentCard {
  title: string;
  description: string;
  image: string;
}

const ENVIRONMENTS: EnvironmentCard[] = [
  {
    title: "Resorts",
    description: "Unifying sprawling multi-acre property footprints under a cohesive backbone that balances hyper-personalized guest comfort with automated micro-climate and thermal asset preservation.",
    image: "https://images.unsplash.com/photo-1582719478250-c894e4dc240e?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Business Hotels",
    description: "Deploying zero-latency environmental and connectivity networks that eliminate technical friction, maximize executive traveler productivity, and execute predictive energy conservation.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c0d129df?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Restaurants & Lounges",
    description: "Orchestrating emotionally intelligent, time-locked lighting scenes and acoustic zoning to instinctively guide guest transit, extend dwell times, and elevate brand intimacy.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Banquet Spaces",
    description: "Synthesizing high-availability architectural lighting presets, heavy AV matrices, and high-occupancy environmental climate moderation for flawless, high-velocity event execution.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Wellness & Spa Spaces",
    description: "Engineering deeply restorative, biophilic sanctuaries that modulate lighting spectra, precise temperatures, and sensory parameters to actively stabilize mood and promote recovery.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop"
  }
];

export function HospitalityEnvironments() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current || prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        }
      });

      // Header entrance
      if (headerRef.current) {
        tl.fromTo(
          headerRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );
      }

      // Cards stagger
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".env-card");
        tl.fromTo(
          cards,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
          "-=0.6"
        );
      }
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background py-24 sm:py-32 overflow-hidden text-foreground"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20 lg:px-24 flex flex-col gap-12 sm:gap-16">

        {/* Header */}
        <div ref={headerRef} className="flex flex-col items-start gap-4">

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-[1.2] text-foreground max-w-2xl">
            Hospitality Environments we Automate
          </h2>
        </div>

        {/* 3x2 Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {ENVIRONMENTS.map((env, idx) => (
            <div
              key={idx}
              className="env-card group relative h-[220px] sm:h-[260px] rounded-2xl overflow-hidden bg-secondary"
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105">
                <img
                  src={env.image}
                  alt={env.title}
                  className="w-full h-full object-cover opacity-60 transition-opacity duration-700 group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                <h3 className="text-white text-xl sm:text-2xl font-light tracking-wide transition-transform duration-500 transform group-hover:-translate-y-1">
                  {env.title}
                </h3>
                <div className="overflow-hidden max-h-0 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                  <p className="text-white/70 text-xs sm:text-sm font-sans font-light leading-relaxed pt-2">
                    {env.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
