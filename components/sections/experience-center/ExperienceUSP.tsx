"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { Eye, MessageSquare, SlidersHorizontal, Map } from "lucide-react";

const USP_ITEMS = [
  {
    id: "usp-1",
    title: "Understand Real-World Automation",
    icon: Eye,
    description: "Experience how lighting, climate, and AV systems work together seamlessly in a true home environment."
  },
  {
    id: "usp-2",
    title: "Personalized Consultation",
    icon: MessageSquare,
    description: "Sit down with our automation experts to design a system tailored exclusively to your lifestyle and needs."
  },
  {
    id: "usp-3",
    title: "Compare Technologies",
    icon: SlidersHorizontal,
    description: "Test drive different interfaces, keypads, and control systems to find exactly what suits your aesthetic."
  },
  {
    id: "usp-4",
    title: "Plan Your Project Better",
    icon: Map,
    description: "Visualize your smart home journey from wiring to final installation with complete clarity and confidence."
  }
];

export function ExperienceUSP() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current || prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });

      tl.to(".usp-header", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      })
        .to(".usp-card", {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out"
        }, "-=0.4");
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section ref={sectionRef} className="py-16 md:py-24 w-full bg-secondary text-white relative overflow-hidden">

      {/* Subtle Background Glow */}
      {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-accent/10 blur-[120px] rounded-full pointer-events-none opacity-50" /> */}

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-8 usp-header opacity-0 translate-y-10">
            <div className="h-[1px] w-8 bg-white/20" />
            <span className="text-[10px] sm:text-xs tracking-[0.3em] text-white/50">
              The Advantage
            </span>
            <div className="h-[1px] w-8 bg-white/20" />
          </div>

          <h2 className="text-white mb-6 usp-header opacity-0 translate-y-10">
            Why Visit an Experience Centre?
          </h2>

          <p className="text-lg md:text-xl text-white/60 font-light tracking-wide usp-header opacity-0 translate-y-10">
            See. Experience. Decide with Confidence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {USP_ITEMS.map((item) => (
            <div
              key={item.id}
              className="usp-card opacity-0 translate-y-12 group relative flex flex-col p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-colors duration-500"
            >
              <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-8 text-white/80 group-hover:scale-110 group-hover:text-white group-hover:bg-accent/20 transition-all duration-500">
                <item.icon strokeWidth={1.5} className="w-6 h-6" />
              </div>

              <h4 className="text-white mb-4">
                {item.title}
              </h4>

              <p className="text-sm md:text-base text-white/50 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
