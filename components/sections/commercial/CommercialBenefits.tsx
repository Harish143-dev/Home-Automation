"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

const STRATEGIC_BENEFITS = [
  {
    num: "01",
    title: "Cognitive Optimization & Human Yield",
    significance: "Tenant wellbeing directly dictates organizational output and retention.",
    specifics: [
      {
        label: "Circadian Stabilization",
        text: "Automatically shifts spectral intensity to combat employee visual fatigue during indoor-bound shifts."
      },
      {
        label: "Stamina Protection",
        text: "Proactively tracks space density to optimize fresh air filtration, proven to enhance analytical clarity and reduce stress levels."
      }
    ]
  },
  {
    num: "02",
    title: "Macro-Level Resource Resilience",
    significance: "Insulates capital assets from rising utility instability and seasonal climate extremes.",
    specifics: [
      {
        label: "Automated Drift Setbacks",
        text: "Executes precision occupancy-based setbacks to slash standby electricity waste by up to 25%."
      },
      {
        label: "Thermal Shielding",
        text: "Deploys solar-adaptive shading preventatively, lowering peak cooling loads and protecting primary chiller lifecycles."
      }
    ]
  },
  {
    num: "03",
    title: "Maximized Spatial Agility",
    significance: "Eliminates the extreme financial waste of fixed, unyielding, and underutilized floorplates.",
    specifics: [
      {
        label: "Telemetry-Driven Loading",
        text: "Harnesses non-intrusive sensor matrices to scale environmental loads in real time based on fluctuating headcounts."
      },
      {
        label: "Instant Kinematic Adaptation",
        text: "Reconfigures lighting logic, acoustics, and displays automatically the moment divisible partition walls are moved."
      }
    ]
  },
  {
    num: "04",
    title: "Enterprise Governance & Asset Continuity",
    significance: "Satisfies strict global ESG mandates and modern data confidentiality thresholds.",
    specifics: [
      {
        label: "Access Governance",
        text: "Unifies biometric perimeters and role-based tracking to secure intellectual property without disrupting occupant flow."
      },
      {
        label: "Edge Processing Security",
        text: "Relies on robust, decentralized network processors that keep core systems fully operational during external network downtime."
      }
    ]
  }
];

export function CommercialBenefits() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    // Fade in the sticky left panel
    gsap.fromTo(".benefit-sticky-panel",
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );

    // Fade up each scrolling chapter on the right
    const chapters = gsap.utils.toArray(".benefit-chapter") as HTMLElement[];
    chapters.forEach((chapter) => {
      gsap.fromTo(chapter,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: chapter,
            start: "top 85%",
          }
        }
      );
    });

  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="relative bg-background text-foreground py-24 sm:py-32 lg:py-48">

      {/* Background Noise Texture for premium feel */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-20 lg:px-24 flex flex-col lg:flex-row gap-16 lg:gap-32 relative z-10">

        {/* Sticky Left Column (Narrative) */}
        <div className="w-full lg:w-[45%] lg:sticky lg:top-24 h-fit benefit-sticky-panel">
          <span className="text-accent tracking-widest uppercase text-sm mb-6 block font-medium">
            Why Commercial Automation Matters
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide leading-[1.2] mb-8 text-balance">
            The Strategic Significance of Adaptive Infrastructure
          </h2>
          <p className="text-foreground/70 text-lg md:text-xl leading-relaxed font-light">
            Static buildings are financial liabilities. Automation is an investment evaluated on institutional metrics: human yield, environmental resilience, and asset future proofing. By aligning your infrastructure with real time operational signals, we unlock hidden margins across infrastructure.
          </p>
        </div>

        {/* Scrolling Right Column (Chapters) */}
        <div className="w-full lg:w-[55%] flex flex-col gap-24 md:gap-32 lg:pt-12">
          {STRATEGIC_BENEFITS.map((item, i) => (
            <div key={i} className="flex flex-col benefit-chapter relative">

              {/* Massive faded number */}
              <span className="absolute -top-12 -left-6 md:-left-12 text-7xl md:text-9xl font-light text-foreground/[0.03] select-none pointer-events-none">
                {item.num}
              </span>

              <h3 className="text-2xl md:text-3xl font-light leading-tight mb-8 relative z-10">
                {item.title}
              </h3>

              {/* "The Significance" Box */}
              <div className="mb-10 p-6 md:p-8 bg-white border border-border shadow-sm rounded-2xl relative z-10">
                <span className="block text-accent uppercase tracking-widest text-xs mb-3 font-medium">
                  The Significance
                </span>
                <p className="text-foreground text-lg md:text-xl font-light leading-relaxed">
                  {item.significance}
                </p>
              </div>

              {/* "The Specifics" List */}
              <div className="space-y-8 relative z-10">
                <span className="block text-foreground/40 uppercase tracking-widest text-xs font-medium">
                  The Specifics
                </span>
                <div className="space-y-6 border-l border-border pl-6 md:pl-8">
                  {item.specifics.map((spec, j) => (
                    <div key={j} className="flex flex-col gap-2">
                      <strong className="font-medium text-foreground text-lg tracking-wide">
                        {spec.label}
                      </strong>
                      <span className="text-muted text-sm md:text-base font-light leading-relaxed">
                        {spec.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
