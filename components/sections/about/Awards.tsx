"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";
import { DURATION, EASE } from "@/lib/animation.config";
import { Trophy } from "lucide-react";

const AWARDS = [
  {
    year: "2023",
    title: "Best Smart Home Integrator",
    organization: "Smart Space India Awards",
    description: "Recognized for excellence in integrating complex automation systems in luxury residential spaces."
  },
  {
    year: "2021",
    title: "Platinum Partner Award",
    organization: "Lutron Electronics",
    description: "Awarded for exceptional sales and implementation of Lutron lighting control solutions."
  },
  {
    year: "2019",
    title: "Innovation in Automation",
    organization: "Tech Architecture Summit",
    description: "Honored for our pioneering approach to sustainable and intelligent commercial building systems."
  }
];

export default function Awards() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => scheduleScrollRefresh(),
      }
    });

    // Header reveal
    tl.fromTo(".award-header",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: DURATION.slow, ease: EASE.reveal }
    );

    // Grid items reveal
    tl.fromTo(".award-card",
      { y: 40, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: DURATION.slow, 
        ease: "power3.out", 
        stagger: 0.2 
      },
      "-=0.6"
    );

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section 
      ref={sectionRef} 
      className="relative pt-8 md:pt-12 pb-8 md:pb-12 bg-background text-foreground overflow-hidden"
    >
      {/* Background glow */}
      <div 
        className="absolute top-0 right-1/4 w-[500px] h-[500px] opacity-10 pointer-events-none" 
        style={{ background: 'radial-gradient(circle, rgba(229,107,85,0.2) 0%, rgba(0,0,0,0) 70%)' }} 
      />

      {/* Noise Texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" aria-hidden="true">
        <filter id="noise-awards"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#noise-awards)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 md:px-24">
        
        {/* Header */}
        <div className="award-header text-center max-w-3xl mx-auto space-y-4 mb-16 md:mb-24 opacity-0">
          <span className="block tracking-[0.3em] text-sm md:text-base text-accent font-medium">
            Awards & Certifications
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-[1.2]">
            Recognized for Excellence
          </h2>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {AWARDS.map((award, idx) => (
            <div 
              key={idx} 
              className="award-card flex flex-col p-8 rounded-[2rem] bg-black/[0.02] border border-black/5 backdrop-blur-sm group hover:bg-black/[0.04] transition-colors duration-500 opacity-0"
            >
              {/* Top Row: Icon & Year */}
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent transition-transform duration-500 group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                  <Trophy className="w-5 h-5" />
                </div>
                <span className="text-xl font-serif text-muted tracking-wider">
                  {award.year}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl lg:text-2xl font-light tracking-wide mb-2 transition-colors duration-300 group-hover:text-accent">
                {award.title}
              </h3>
              <div className="text-accent text-sm md:text-base tracking-wide mb-4">
                {award.organization}
              </div>
              <p className="text-muted font-light text-sm md:text-base leading-relaxed mt-auto">
                {award.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
