"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

const INDUSTRIES = [
  {
    id: "corporate",
    title: "Corporate Offices & Workspaces",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    useCase: "Optimizing hybrid environments for a multigenerational workforce. Systems dynamically adjust to layout changes, supporting collaborative connection and individual focus."
  },
  {
    id: "hospitality",
    title: "Restaurants and Hospitality",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop",
    useCase: "Cultivating atmosphere through time locked lighting scenes and acoustic zones that guide occupant transit, dwell times, and visual comfort."
  },
  {
    id: "retail",
    title: "Retail Environments",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
    useCase: "Accentuating spatial branding, architecture, and inventory texturing through highly calibrated lighting scenes that influence consumer engagement."
  },
  {
    id: "education",
    title: "Educational Institutions & Auditoriums",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop",
    useCase: "Enhancing cognitive stamina, auditory absorption, and sensory clarity through distraction-free acoustics and automated daylight harvesting"
  },
  {
    id: "transit",
    title: "Airport Lounges & Transit Hubs",
    image: "https://images.unsplash.com/photo-1544015759-2475e6d8713a?q=80&w=800&auto=format&fit=crop",
    useCase: "Mitigating traveler fatigue on a continuous 24-hour operational cycle through adaptive lighting paths and zoned environmental controls that support rest, focus, and transition."
  },
  {
    id: "entertainment",
    title: "Multiplexes & Entertainment Centers",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop",
    useCase: "Executing high stakes automated theater transitions. Centralized lighting scene changes link directly to show scheduling protocols, maximizing cinematic impact while protecting lamp and system lifecycle."
  },
  {
    id: "healthcare",
    title: "Healthcare & Wellness Facilities",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
    useCase: "Deploying adaptive lighting and precise climate zoning to stabilize circadian rhythms, actively reducing patient stress and supporting clinical performance."
  }
];

export function CommercialIndustries() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.from(".industry-header", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from(".industry-card", {
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
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-background relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-20 lg:px-24 w-full">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 industry-header">
          <div>
            <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-accent mb-4 block">
              Operational Scales
            </span>
            <h2 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground mb-4">
              Sectors of Influence
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

        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 gap-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {INDUSTRIES.map((industry) => (
            <div
              key={industry.id}
              className="industry-card flex-none p-2 w-[85vw] sm:w-[350px] md:w-[400px] snap-start group cursor-pointer"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-darker mb-6">
                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  sizes="(max-width: 768px) 85vw, 400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <h3 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground mb-3">
                {industry.title}
              </h3>

              <p className="text-sm md:text-base leading-relaxed font-light tracking-wide text-muted">
                {industry.useCase}
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
