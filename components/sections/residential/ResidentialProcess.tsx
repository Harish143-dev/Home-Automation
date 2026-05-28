"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

const PROCESS_STEPS = [
  {
    title: "Consultation Call + Site visit",
    description: "An initial deep dive to understand your lifestyle, aesthetic preferences, and the architectural nuances of your property."
  },
  {
    title: "Designing the BOQ based on your drawing",
    description: "Our engineers meticulously draft a Bill of Quantities, translating your architectural plans into a comprehensive smart technology framework."
  },
  {
    title: "BOQ Meeting to go over the suggested systems",
    description: "A collaborative review of the proposed technology stack, ensuring every system aligns perfectly with your vision and budget."
  },
  {
    title: "Order Confirmation",
    description: "With designs finalized, we secure your bespoke hardware from our premium global partners, ensuring priority fulfillment."
  },
  {
    title: "Sharing Automation Drawings for the wiring team",
    description: "We provide exacting schematic documentation to your electrical contractors to guarantee flawless infrastructure preparation."
  },
  {
    title: "Integration of automation",
    description: "Our certified technicians deploy the core intelligence, merging lighting, climate, security, and AV into a singular unified ecosystem."
  },
  {
    title: "Custom Programming",
    description: "We sculpt the software around your daily rhythms, programming bespoke scenes, automation rules, and intuitive interfaces."
  },
  {
    title: "Testing site + programmes",
    description: "Rigorous quality assurance and stress-testing of all systems to ensure absolute reliability before you move in."
  },
  {
    title: "Handover",
    description: "A comprehensive walk-through where we hand you the keys to your new smart home, alongside personalized training on your systems."
  },
  {
    title: "Customer Audit + After Installation Services",
    description: "Ongoing white-glove support and proactive system audits to ensure your technology continually evolves with your lifestyle."
  }
];

export function ResidentialProcess() {
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
    <section ref={triggerRef} className="relative w-full bg-black text-white">
      <div
        ref={containerRef}
        className="w-full h-[100dvh] relative overflow-hidden hidden md:block"
      >
        {/* Fullscreen Background Images */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
            alt="Smart Home Process"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
          />
          {/* Gradients for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
        </div>

        {/* Horizontal Center Axis Line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/20 z-10 -translate-y-1/2" />

        {/* Content Layout */}
        <div className="absolute inset-0 z-20 flex px-8 md:px-16 lg:px-32">

          {/* Left Label */}
          <div className="hidden md:flex w-[15%] items-center h-full">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 -translate-y-1/2 absolute top-1/2">
              Process
            </span>
          </div>

          {/* Timeline Numbers (Vertically scrolling) */}
          <div className="w-[30%] md:w-[25%] relative h-full">
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
                    <span className={`text-lg md:text-xl lg:text-2xl font-light tracking-tighter ${isActive ? 'text-white' : 'text-white/50'}`}>
                      Step {idx + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Content (Title and Description) */}
          <div className="w-[70%] md:w-[60%] flex items-center h-full pl-8 md:pl-16">
            <div
              key={`content-${activeIndex}`}
              ref={textContentRef}
              className="max-w-lg absolute top-1/2 pt-6 pl-8 md:pl-16"
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

      {/* Mobile Stacked Layout (Visible only on small screens) */}
      <div className="md:hidden flex flex-col w-full px-6 py-20 bg-black gap-12 relative">
        {/* Background Image for mobile process section */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
            alt="Smart Home Process"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-[0.15]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
        </div>

        <div className="mb-4 relative z-10">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50">
            Our Process
          </span>
        </div>

        <div className="flex flex-col gap-10 relative z-10">
          {PROCESS_STEPS.map((step, idx) => (
            <div key={idx} className="flex flex-col gap-2 border-l border-white/20 pl-6 pb-2 relative">
              {/* Timeline dot */}
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent" />

              <span className="text-[10px] font-bold tracking-widest text-accent mb-1">
                STEP {idx + 1}
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
