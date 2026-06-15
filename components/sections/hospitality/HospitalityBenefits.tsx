"use client";

import React, { useState, useRef } from "react";
import { Zap, LayoutDashboard, Users, TrendingUp, Sparkles, LucideIcon } from "lucide-react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { EASE, DURATION } from "../../../lib/animation.config";
import { useBreakpoint } from "../../../hooks/useBreakpoint";

interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const BENEFITS: Benefit[] = [
  {
    id: "b1",
    title: "Energy Efficiency",
    description: "Optimize lighting and HVAC usage intelligently.",
    icon: Zap,
  },
  {
    id: "b2",
    title: "Centralized Operations",
    description: "Manage multiple spaces through unified control.",
    icon: LayoutDashboard,
  },
  {
    id: "b3",
    title: "Improved Staff Efficiency",
    description: "Automate repetitive operational tasks.",
    icon: Users,
  },
  {
    id: "b4",
    title: "Scalability",
    description: "Solutions tailored for growing hospitality environments.",
    icon: TrendingUp,
  },
  {
    id: "b5",
    title: "Consistent Guest Experience",
    description: "Deliver the same premium experience across every room.",
    icon: Sparkles,
  }
];

export function HospitalityBenefits() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  const { isMobile, isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || isMobile) return;

    // Expand/Collapse cards
    gsap.to(".benefit-card", {
      flex: (i) => (i === activeCard ? 5 : 1),
      duration: 0.8,
      ease: EASE.premium,
      overwrite: "auto",
    });

    // Content fade/slide
    gsap.to(".card-content", {
      opacity: (i) => (i === activeCard ? 1 : 0),
      y: (i) => (i === activeCard ? 0 : 20),
      duration: 0.6,
      ease: EASE.reveal,
      overwrite: "auto",
      delay: 0.1,
    });

    // Icon container active state
    gsap.to(".card-icon-container", {
      backgroundColor: (i) => (i === activeCard ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.04)"),
      color: (i) => (i === activeCard ? "#ffffff" : "currentColor"),
      scale: (i) => (i === activeCard ? 1 : 0.9),
      duration: 0.5,
      ease: EASE.standard,
    });

    // Title rotation/positioning for closed cards
    gsap.to(".card-vertical-title", {
      opacity: (i) => (i === activeCard ? 0 : 1),
      duration: 0.4,
      ease: EASE.standard,
      overwrite: "auto",
    });

  }, { dependencies: [activeCard, isMobile, isReady], scope: containerRef });

  // Entrance animation
  useGSAP(() => {
    if (!isReady || isMobile) return;

    gsap.from(".benefit-card", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      y: 40,
      opacity: 0,
      duration: DURATION.normal,
      stagger: 0.1,
      ease: EASE.reveal,
    });
  }, { dependencies: [isReady, isMobile], scope: containerRef });

  return (
    <section
      ref={containerRef}
      className={`w-full py-24 px-6 md:px-12 lg:px-24 bg-background transition-opacity duration-500 overflow-hidden ${!isReady ? "opacity-0" : "opacity-100"}`}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4">

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-[1.2] text-foreground max-w-4xl">
            Hospitality Automation That Works Beyond Guest Comfort
          </h2>
        </div>

        {/* Desktop Expanding Cards */}
        {!isMobile && (
          <div className="w-full h-[400px] lg:h-[500px] flex gap-4 overflow-hidden">
            {BENEFITS.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.id}
                  className="benefit-card relative h-full rounded-[32px] bg-panel overflow-hidden cursor-pointer group flex-[1] flex flex-col p-6 shadow-sm border border-border"
                  onMouseEnter={() => setActiveCard(idx)}
                >
                  {/* Top section: Icon */}
                  <div className="flex items-start justify-center w-full z-10">
                    <div className="card-icon-container w-14 h-14 rounded-full flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Vertical title when closed */}
                  <div className="card-vertical-title absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="whitespace-nowrap -rotate-90 origin-center text-base lg:text-lg font-light tracking-wide text-muted mt-12">
                      {benefit.title}
                    </span>
                  </div>

                  {/* Bottom section: Expanded Content */}
                  <div className="card-content absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end gap-3 pointer-events-none opacity-0 translate-y-5 pt-20">
                    <h3 className="text-2xl lg:text-3xl font-light tracking-wide text-foreground whitespace-nowrap">
                      {benefit.title}
                    </h3>
                    <p className="text-foreground/70 text-base md:text-lg max-w-sm leading-relaxed whitespace-normal">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Mobile Layout (Standard list) */}
        {isMobile && (
          <div className="flex flex-col gap-4">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.id} className="w-full bg-panel border border-border rounded-3xl p-6 flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-light tracking-wide mb-2">{benefit.title}</h3>
                    <p className="text-foreground/70 text-sm">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
