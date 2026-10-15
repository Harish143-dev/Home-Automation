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
    image: "/images/projects/commercial/meta-office-gurgaon/1.jpg",
    useCase: "Optimizing hybrid environments for a multigenerational workforce. Systems dynamically adjust to layout changes, supporting collaborative connection and individual focus."
  },
  {
    id: "financial",
    title: "Financial Institutions & Banking",
    image: "/images/projects/commercial/barclays-bank-chennai/1.jpg",
    useCase: "Delivering encrypted, high-availability lighting infrastructure with automated after-hours security illumination and strict ISO energy compliance."
  },
  {
    id: "retail",
    title: "Luxury Retail & Showrooms",
    image: "/images/projects/commercial/tiffany-mumbai/1.jpg",
    useCase: "Accentuating spatial branding, architecture, and inventory texturing through highly calibrated CRI 98+ lighting scenes that elevate consumer dwell time."
  },
  {
    id: "tech-campus",
    title: "Technology Campuses & R&D",
    image: "/images/projects/commercial/nvidia/1.jpg",
    useCase: "Enhancing cognitive stamina, auditory absorption, and sensory clarity through circadian-attuned illumination and automated daylight harvesting."
  },
  {
    id: "automotive",
    title: "Automotive Experience Centres",
    image: "/images/projects/commercial/bmw-showroom/1.jpg",
    useCase: "Executing glare-free vehicle unveil spotlighting scenes, client consultation lounge automation, and customer delivery ceremonies."
  },
  {
    id: "transit",
    title: "Transit Hubs & Public Infrastructure",
    image: "/images/projects/commercial/chennai-metro/1.jpg",
    useCase: "Mitigating commuter fatigue on a continuous 24-hour operational cycle through adaptive lighting paths and ruggedized environmental controls."
  },
  {
    id: "entertainment",
    title: "Multiplexes & Auditoriums",
    image: "/images/projects/commercial/wave-cinema/1.jpg",
    useCase: "Executing high-stakes automated theater transitions. Centralized lighting scene changes link directly to show scheduling protocols, maximizing cinematic impact."
  },
  {
    id: "studios",
    title: "Film Studios & Sound Stages",
    image: "/images/projects/commercial/yashraj-studio/1.jpg",
    useCase: "Deploying silent low-voltage architectural dimming without electromagnetic interference, supporting high-fidelity studio recording and screening."
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
            <h2 className="text-foreground mb-4">
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

              <h3 className="text-foreground mb-3">
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
