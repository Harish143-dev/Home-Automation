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
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Business Hotels",
    description: "Deploying zero-latency environmental and connectivity networks that eliminate technical friction, maximize executive traveler productivity, and execute predictive energy conservation.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
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

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export function HospitalityEnvironments() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current || prefersReducedMotion) return;

      gsap.from(".env-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".env-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative w-full bg-background overflow-hidden text-foreground"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-20 lg:px-24 w-full">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 env-header">
          <div>
            <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-accent mb-4 block">
              Operational Scales
            </span>
            <h2 className="text-foreground mb-4">
              Hospitality Environments we Automate
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:flex gap-4">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-surface-darker transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-surface-darker transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 gap-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {ENVIRONMENTS.map((env, idx) => (
            <div
              key={idx}
              className="env-card flex-none p-2 w-[85vw] sm:w-[350px] md:w-[400px] snap-start group cursor-pointer"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-darker mb-6">
                <Image
                  src={env.image}
                  alt={env.title}
                  fill
                  sizes="(max-width: 768px) 85vw, 400px"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
              </div>

              <h3 className="text-foreground mb-3">
                {env.title}
              </h3>

              <p className="text-sm md:text-base leading-relaxed font-light tracking-wide text-muted">
                {env.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
