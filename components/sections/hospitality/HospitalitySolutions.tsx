"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { Check } from "lucide-react";

interface SolutionData {
  title: string;
  shortDescription: string;
  list1Title: string;
  list1: string[];
  list2Title: string;
  list2: string[];
  ctaText: string;
  image: string;
}

const SOLUTIONS: SolutionData[] = [
  {
    title: "Public Area Systems",
    shortDescription: "Create immersive and intelligently managed public spaces that enhance guest impressions and operational efficiency.",
    list1Title: "Includes",
    list1: [
      "Lobby lighting automation",
      "Background music systems",
      "Digital signage integration",
      "Climate control",
      "Event space automation"
    ],
    list2Title: "Benefits",
    list2: [
      "Consistent ambiance",
      "Energy optimization",
      "Simplified centralized control",
      "Premium guest experience"
    ],
    ctaText: "Explore Public Area Solutions →",
    image: "https://images.unsplash.com/photo-1551882547-ff40c0d129df?q=80&w=1200&auto=format&fit=crop" // Placeholder
  },
  {
    title: "Room Systems",
    shortDescription: "Deliver comfort, convenience, and personalization through intelligent in-room automation systems.",
    list1Title: "Features",
    list1: [
      "Smart lighting scenes",
      "Automated curtains/shades",
      "HVAC controls",
      "AV integration",
      "Occupancy-based automation"
    ],
    list2Title: "Benefits",
    list2: [
      "Personalized comfort",
      "Seamless room control",
      "Enhanced stay experience",
      "Reduced energy consumption",
      "Improved operational efficiency"
    ],
    ctaText: "Explore Room Automation →",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop" // Placeholder
  },
  {
    title: "Guest Room Controller (GRC)",
    shortDescription: "Centralized room management systems designed to optimize guest comfort and hotel operations.",
    list1Title: "Features",
    list1: [
      "One-touch room controls",
      "Scene management",
      "DND/MUR integration",
      "Centralized monitoring",
      "PMS integration capability"
    ],
    list2Title: "Benefits",
    list2: [
      "Enhanced operational visibility",
      "Improved energy management",
      "Better guest engagement"
    ],
    ctaText: "Explore GRC Solutions →",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop" // Placeholder
  }
];

export function HospitalitySolutions() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!containerRef.current || prefersReducedMotion) return;

      const cards = containerRef.current.querySelectorAll(".solution-card");
      
      cards.forEach((card, i) => {
        const imageBlock = card.querySelector(".solution-image");
        const contentBlock = card.querySelector(".solution-content");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            toggleActions: "play none none none",
          }
        });

        tl.fromTo(
          imageBlock,
          { y: 60, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
        );

        tl.fromTo(
          contentBlock,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.7"
        );
      });
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-surface-darker py-24 sm:py-32 overflow-hidden text-foreground"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20 lg:px-24 flex flex-col gap-16 sm:gap-24">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
          <span className="text-accent text-xs tracking-[0.2em] uppercase font-semibold">
            Core Hospitality Solutions
          </span>
          <h2 className="text-3xl md:text-5xl font-light tracking-wide leading-[1.2] text-foreground">
            Smart Automation Solutions for Hospitality Environments
          </h2>
        </div>

        {/* Solutions List */}
        <div className="flex flex-col gap-24 md:gap-32">
          {SOLUTIONS.map((solution, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div 
                key={idx}
                className={`solution-card flex flex-col md:flex-row gap-12 lg:gap-24 items-center ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Image */}
                <div className="solution-image relative w-full md:w-1/2 h-[400px] sm:h-[500px] lg:h-[600px] rounded-[32px] overflow-hidden shadow-2xl">
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  />
                  {/* Soft overlay */}
                  <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Content */}
                <div className="solution-content w-full md:w-1/2 flex flex-col gap-8">
                  <div>
                    <h3 className="text-3xl lg:text-4xl font-light mb-4 text-foreground">
                      {solution.title}
                    </h3>
                    <p className="text-muted text-base lg:text-lg leading-relaxed font-sans max-w-lg">
                      {solution.shortDescription}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* List 1 */}
                    <div className="flex flex-col gap-3">
                      <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground">
                        {solution.list1Title}
                      </h4>
                      <ul className="flex flex-col gap-2">
                        {solution.list1.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted">
                            <Check className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* List 2 */}
                    <div className="flex flex-col gap-3">
                      <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground">
                        {solution.list2Title}
                      </h4>
                      <ul className="flex flex-col gap-2">
                        {solution.list2.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted">
                            <Check className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link 
                    href="#contact" 
                    className="inline-flex items-center text-accent font-medium tracking-wide hover:text-accent-soft transition-colors w-fit mt-4"
                  >
                    {solution.ctaText}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
