"use client";

import React, { useRef, useState } from "react";
import { Zap, ShieldCheck, Settings, TrendingUp } from "lucide-react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

const BENEFITS_DATA = [
  {
    title: "Energy Optimization",
    description: "Reduce operational costs through intelligent energy management.",
    icon: Zap,
  },
  {
    title: "Enhanced Security",
    description: "Centralized surveillance and access management.",
    icon: ShieldCheck,
  },
  {
    title: "Operational Efficiency",
    description: "Simplify building management with automation workflows.",
    icon: Settings,
  },
  {
    title: "Scalability",
    description: "Infrastructure built to grow with your business.",
    icon: TrendingUp,
  }
];

export function CommercialBenefits() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    // Animate Heading
    gsap.fromTo(".benefit-heading",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      }
    );

    // Animate Cards Container
    gsap.fromTo(".benefit-card-container",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-background py-24 sm:py-32 px-6 sm:px-12 md:px-20 lg:px-32"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-16 md:gap-20">
        
        {/* Header - Apple Style (Centered, smaller, highly refined) */}
        <div className="flex flex-col items-center text-center max-w-2xl benefit-heading">
          <span className="font-mono tracking-[0.3em] uppercase text-muted mb-4">
            The Advantage
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-[1.2] text-foreground">
            Why Commercial Automation Matters.
          </h2>
        </div>

        {/* Expanding Accordion Grid */}
        <div className="benefit-card-container flex flex-col lg:flex-row w-full h-[600px] lg:h-[450px] gap-3 lg:gap-4">
          {BENEFITS_DATA.map((benefit, index) => {
            const Icon = benefit.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                className={`group relative overflow-hidden rounded-[2rem] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer flex flex-col justify-end p-6 md:p-8 border ${
                  isHovered 
                    ? "lg:flex-[2.5] bg-[#050505] border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)]" 
                    : "lg:flex-1 bg-panel border-black/[0.04] shadow-sm hover:shadow-md hover:bg-surface-darker"
                } flex-1`}
              >
                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col">
                  
                  {/* Icon */}
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-6 md:mb-8 transition-all duration-700 ${
                    isHovered 
                      ? 'bg-accent text-white shadow-[0_0_20px_rgba(140,24,23,0.3)] scale-110' 
                      : 'bg-[#f5f5f7] text-muted group-hover:text-foreground group-hover:scale-105'
                  }`}>
                    <Icon strokeWidth={1.5} className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  
                  {/* Title */}
                  <h3 className={`text-2xl md:text-3xl font-light tracking-wide leading-[1.2] mb-2 transition-colors duration-700 whitespace-nowrap lg:whitespace-normal ${
                    isHovered ? 'text-white' : 'text-foreground'
                  }`}>
                    {benefit.title}
                  </h3>
                  
                  {/* Expandable Details (Smooth height animation using CSS Grid) */}
                  <div 
                    className={`grid transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                      isHovered ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className={`text-[14px] sm:text-[16px] md:text-[17px] lg:text-[19px] leading-relaxed font-light tracking-wide max-w-sm pt-2 transition-colors duration-700 ${
                        isHovered ? 'text-white/70' : 'text-muted'
                      }`}>
                        {benefit.description}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
