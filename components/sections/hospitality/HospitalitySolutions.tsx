"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface SolutionData {
  title: string;
  shortDescription: string;
  list1Title: string;
  list1: { title: string; description: string }[];
  ctaText: string;
  image: string;
}

const SOLUTIONS: SolutionData[] = [
  {
    title: "System 01: Energy Smart System",
    shortDescription: "The Paradigm: Invisible Logic for Carbon Resilience",
    list1Title: "Capabilities & Components",
    list1: [
      { title: "Key Card Replacement", description: "Replaces traditional, failure-prone physical key card slots with advanced, software-driven automated logic." },
      { title: "Multi-Sensor Presence Matrix", description: "Integrates discrete magnetic door thresholds and digital occupancy sensors to dynamically map real-time guest presence without violating individual privacy." },
      { title: "Automated Energy Saving", description: "The moment the room is verified as unoccupied, the system automatically triggers standby logic—dimming active illumination layers and adjusting climate controls to eliminate utility waste." },
      { title: "Hardware Standards", description: "Ultra-precise occupancy sensors, high-availability switching modules, and phase-cut dimming modules engineered for load management." }
    ],
    ctaText: "Explore Energy Smart System →",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "System 02: Lutron MyRoom Prime",
    shortDescription: "The Paradigm: Localized Sensory Autonomy",
    list1Title: "Capabilities & Components",
    list1: [
      { title: "Wireless Keypads", description: "Utilizes high-aesthetic, cord-free controls (such as Pico wireless keypads) to preserve interior wall finishes and eliminate complex wiring overheads." },
      { title: "Bedside Lighting Scene Harmonization", description: "Provides intuitive, scene-based lighting adjustments right from the entryway or bedside to protect the designer's vision and room composition." },
      { title: "Motorized Silhouette Integration", description: "Offers direct control to smoothly transition motorized window drapes and blinds, balancing natural daylight with privacy." },
      { title: "Elegant Wireless Keypads", description: "Utilizes aesthetic, cord-free keypads (such as Pico wireless keypads) for seamless control without complex wall wiring." },
      { title: "Lighting Control", description: "Provides dedicated, scene-based lighting adjustments right from the guest's bedside or entryway." },
      { title: "Shades Control", description: "Offers built-in integration to smoothly open or close motorized window drapes and blinds." },
      { title: "HVAC Control", description: "Gives guests standalone control over room temperature and fan speeds for localized comfort." }
    ],
    ctaText: "Explore MyRoom Prime →",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "System 03: Lutron MyRoom XC",
    shortDescription: "The Paradigm: Enterprise-Scale Environmental Orchestration",
    list1Title: "Capabilities & Components",
    list1: [
      { title: "Centralized Network Processor Core", description: "Powered by an institutional-grade MyRoom XC processor that unifies multiple guestrooms into a singular, high-availability property backbone." },
      { title: "Premium Sculpted Controls", description: "Interfaces with architectural wired controls, including Palladiom keypads, featuring bespoke custom engraving and dynamic backlighting elements." },
      { title: "Server-Side Energy Analytics Software", description: "Connects to central enterprise software providing live dashboard tracking, interactive floorplan navigation, and advanced analytics for engineering teams." },
      { title: "Centralized Property Monitoring", description: "Allows hotel operations to view real-time occupancy, thermal status, \"Do Not Disturb\" (DND), and \"Make Up Room\" (MUR) logs from a centralized command center." },
      { title: "Advanced PMS/BMS Automation Workflows", description: "Deep native integration with Property Management Systems (PMS) and Building Management Systems (BMS) to trigger automated arrival scenes and predictive equipment maintenance alerts." }
    ],
    ctaText: "Explore MyRoom XC →",
    image: "https://images.unsplash.com/photo-1551882547-ff40c0d129df?q=80&w=1200&auto=format&fit=crop"
  }
];

function SolutionAccordion({ items }: { items: { title: string; description: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  return (
    <div className="flex flex-col border-t border-accent/20">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={idx} className="border-b border-accent/20">
            <button
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full flex items-center justify-between py-4 text-left group outline-none"
            >
              <span className={cn(
                "text-base tracking-wide font-light transition-colors duration-300",
                isOpen ? "text-accent" : "text-foreground group-hover:text-accent-soft"
              )}>
                {item.title}
              </span>
              <svg 
                className={cn("w-4 h-4 shrink-0 transition-transform duration-300 text-accent/50 group-hover:text-accent", isOpen && "rotate-180")} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div 
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100 pb-4" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="text-sm text-muted font-light leading-relaxed pr-8">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

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
      className="relative w-full bg-background pt-8 md:pt-12 pb-8 md:pb-12 overflow-hidden text-foreground"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-20 lg:px-24 flex flex-col gap-16 sm:gap-24">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">

          <span className="tracking-widest text-sm md:text-base text-accent mb-4 block">
            Guest Room Management Systems
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-[1.2] text-foreground">
            Guest Room Management Systems (GRMS)
          </h2>
          <p className="text-muted text-base lg:text-lg leading-relaxed font-sans mt-4 max-w-2xl text-center">
            Orchestrate an emotionally intelligent, biophilic guest room experience that elevates sleep consistency while executing predictive energy conservation.
          </p>
        </div>

        {/* Solutions List */}
        <div className="flex flex-col gap-24 md:gap-32">
          {SOLUTIONS.map((solution, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={idx}
                className={`solution-card flex flex-col md:flex-row gap-12 lg:gap-24 items-center ${isEven ? "" : "md:flex-row-reverse"
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

                  <div className="flex flex-col w-full">
                    {/* List 1 */}
                      <h4 className="tracking-[0.3em] uppercase text-foreground text-sm mb-4">
                        {solution.list1Title}
                      </h4>
                      <SolutionAccordion items={solution.list1} />
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
