"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import bg from "@/assets/home/processBg.jpg"

const PROCESS_STEPS = [
  {
    title: 'Site Analysis & Architectural Review',
    description: 'The process initiates with an in-depth site analysis and architectural review. We translate your structural drawings and layout plans into a comprehensive Bill of Quantities (BOQ), conducting dedicated alignment meetings to make sure the proposed technology framework matches the exact functional requirements of the space.'
  },
  {
    title: 'Schematics & Wiring Layouts',
    description: 'Upon engagement confirmation, our engineering division develops detailed automation schematics. We deliver precise wiring layouts and containment blueprints directly to the site execution teams, establishing the structural foundation for the network before construction advances.'
  },
  {
    title: 'Physical Integration & Hardware Placement',
    description: 'During the active site phase, our technicians oversee the physical integration of the automation infrastructure. We manage the containment, hardware placement, and component enclosures, making sure the technical backbone is embedded within the architecture.'
  },
  {
    title: 'System Optimization & Stress Testing',
    description: "Once site conditions are secure, we transition to system optimization. Our programming team custom configures the control logic to match the client's operational habits, followed by rigorous stress testing of all network pathways, lighting scenes, and media zones."
  },
  {
    title: 'Handover, Audit & Ongoing Support',
    description: 'The final phase encompasses formal site handover and a comprehensive client audit to verify system performance. Post-delivery, the estate transitions under the permanent protection of our dedicated 24/7 technical support and lifecycle service framework.'
  },
];

export function ProcessSection() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Pinning and Index Updating
  useGSAP(() => {
    if (!triggerRef.current || !containerRef.current || prefersReducedMotion) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: `+=${PROCESS_STEPS.length * 60}%`, // Reduced scroll length slightly for smoother pace
        pin: containerRef.current,
        scrub: true,
        onUpdate: (self) => {
          const index = Math.min(
            PROCESS_STEPS.length - 1,
            Math.floor(self.progress * PROCESS_STEPS.length)
          );
          setActiveIndex(index);
        }
      });
    });

    return () => mm.revert();
  }, { scope: triggerRef, dependencies: [prefersReducedMotion] });

  // Crossfades and Content Animations
  useGSAP(() => {
    if (prefersReducedMotion) return;

    if (textContentRef.current) {
      gsap.fromTo(
        textContentRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", overwrite: true }
      );
    }
  }, { dependencies: [activeIndex, prefersReducedMotion] });

  const activeStep = PROCESS_STEPS[activeIndex];

  // Height of each list item in pixels (h-14 = 56px in tailwind)
  const ITEM_HEIGHT = 56;
  // Calculate translation so active item is centered exactly on the horizontal line
  const translateY = -(activeIndex * ITEM_HEIGHT) - (ITEM_HEIGHT / 2);

  return (
    <section ref={triggerRef} className="relative w-full bg-black text-white" id="process">
      <div
        ref={containerRef}
        className="w-full h-[100dvh] relative overflow-hidden hidden md:block"
      >
        {/* Fullscreen Background Images */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={bg}
            alt="Smart Home Process"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
            placeholder="blur"
          />
          {/* Gradients for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
        </div>

        {/* Horizontal Center Axis Line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/20 z-10 -translate-y-1/2" />

        {/* Top Centered Title and Description */}
        <div className="absolute top-8 md:top-10 lg:top-12 left-1/2 -translate-x-1/2 z-30 w-full max-w-2xl px-6 md:px-0 text-center pointer-events-none hidden md:block">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 md:mb-6 tracking-wide">
            Execution Architecture
          </h2>
          <p className="text-sm md:text-base font-light text-white/70 leading-relaxed mx-auto max-w-xl">
            An automated environment requires disciplined sequencing. Our structured deployment methodology integrates directly with your project’s construction timeline, managing technical risk from initial architectural alignment to multi-system commissioning.
          </p>
        </div>

        {/* Content Layout */}
        <div className="absolute inset-0 z-20 flex px-8 md:px-16 lg:px-32">

          {/* Left Spacer */}
          <div className="hidden md:block relative md:w-[35%] lg:w-[40%] pr-8 h-full z-30 pointer-events-none">
            <p className="absolute top-[55%] -translate-y-1/2 left-0 font-mono tracking-[0.3em] text-[10px] md:text-xs uppercase text-white/50">
              The Methodology
            </p>
          </div>

          {/* Timeline Numbers (Vertically scrolling) */}
          <div className="w-[30%] md:w-[25%] lg:w-[20%] relative h-full">
            <div
              className="absolute left-0 w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                top: '50%',
                transform: `translateY(${translateY}px)`
              }}
            >
              {PROCESS_STEPS.map((step, idx) => {
                const isActive = activeIndex === idx;
                // Calculate distance from active index to fade opacity
                const distance = Math.abs(activeIndex - idx);
                let opacityClass = "opacity-0";
                if (distance === 0) opacityClass = "opacity-100 scale-110";
                else if (distance === 1) opacityClass = "opacity-40";
                else if (distance === 2) opacityClass = "opacity-20";
                else if (distance === 3) opacityClass = "opacity-10";

                return (
                  <div
                    key={idx}
                    className={`h-14 flex items-center transition-all duration-700 ease-out origin-left ${opacityClass}`}
                  >
                    <span className={`text-lg md:text-xl lg:text-2xl font-light tracking-wide ${isActive ? 'text-white' : 'text-white/50'}`}>
                      Phase 0{idx + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Content (Title and Description) */}
          <div className="w-[70%] md:w-[40%] lg:w-[40%] flex items-center h-full pl-8 md:pl-12 relative">
            <div className="absolute top-1/2 -translate-y-1/2 w-full">
              <div
                key={`content-${activeIndex}`}
                ref={textContentRef}
                className="max-w-lg pl-0 md:pl-8"
              >
                <h3 className="text-base md:text-lg lg:text-xl font-light tracking-wide mb-4 md:mb-5 text-white leading-snug">
                  {activeStep.title}
                </h3>
                <p className="text-xs md:text-sm font-light text-white/70 leading-relaxed">
                  {activeStep.description}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Stacked Layout (Visible only on small screens) */}
      <div className="md:hidden flex flex-col w-full px-6 py-20 bg-black gap-12 relative">
        {/* Background Image for mobile process section */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <Image
            src={bg}
            alt="Smart Home Process"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-[0.15]"
            placeholder="blur"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
        </div>

        <div className="mb-4 relative z-10">
          <span className="font-mono tracking-[0.3em] text-[10px] uppercase text-white/50 mb-3 block">
            The Methodology
          </span>
          <h2 className="text-3xl font-light text-white mb-4 tracking-wide">
            Execution Architecture
          </h2>
          <p className="text-sm font-light text-white/70 leading-relaxed">
            An automated environment requires disciplined sequencing. Our structured deployment methodology integrates directly with your project’s construction timeline, managing technical risk from initial architectural alignment to multi-system commissioning.
          </p>
        </div>

        <div className="flex flex-col gap-10 relative z-10">
          {PROCESS_STEPS.map((step, idx) => (
            <div key={idx} className="flex flex-col gap-2 border-l border-white/20 pl-6 pb-2 relative">
              {/* Timeline dot */}
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent" />

              <span className="font-mono tracking-[0.3em] uppercase text-accent mb-1 block">
                PHASE 0{idx + 1}
              </span>
              <h3 className="text-xl font-light tracking-wide text-white leading-snug">
                {step.title}
              </h3>
              <p className="text-sm font-light text-white/60 leading-relaxed mt-2">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
