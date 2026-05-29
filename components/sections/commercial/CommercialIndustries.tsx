"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

const INDUSTRIES = [
  {
    id: "corporate",
    title: "Corporate Offices",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    useCase: "Intelligent lighting and climate control for enhanced productivity."
  },
  {
    id: "hospitality",
    title: "Cafe, Restro, bars",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop",
    useCase: "Automated ambiance and AV systems for memorable guest experiences."
  },
  {
    id: "retail",
    title: "Retail Spaces",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
    useCase: "Dynamic lighting and security solutions to elevate retail environments."
  },
  {
    id: "buildings",
    title: "Commercial Buildings",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    useCase: "Centralized energy management and access control for modern structures."
  },
  {
    id: "healthcare",
    title: "Healthcare Facilities",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
    useCase: "Precision climate and lighting for patient comfort and operational efficiency."
  },
  {
    id: "education",
    title: "Educational Institutions",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop",
    useCase: "Smart campus solutions bridging security, AV, and energy efficiency."
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
    <section ref={sectionRef} className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-20 lg:px-24 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 industry-header">
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-[1.2] text-foreground mb-4">
            Automation Solutions Across <br className="hidden md:inline" />
            <span className="text-accent">Commercial Environments</span>
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
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar px-6 sm:px-12 md:px-20 lg:px-24 pb-12 gap-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {INDUSTRIES.map((industry) => (
          <div
            key={industry.id}
            className="industry-card flex-none w-[85vw] sm:w-[350px] md:w-[400px] snap-start group cursor-pointer"
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

            <h3 className="text-2xl md:text-3xl font-light tracking-wide leading-[1.2] text-foreground mb-3">
              {industry.title}
            </h3>

            <p className="text-[14px] sm:text-[16px] md:text-[17px] lg:text-[19px] leading-relaxed font-light tracking-wide text-muted">
              {industry.useCase}
            </p>
          </div>
        ))}
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
