"use client";

import React, { useRef, useState } from "react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

interface MetricItem {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const METRICS: MetricItem[] = [
  { target: 25, prefix: "Over", suffix: "+", label: "Years" },
  { target: 2000, prefix: "Over", suffix: "+", label: "Residences Completed" },
  { target: 23, prefix: "Across", label: "Cities in India" },
  { target: 3, label: "Experience Centres" }
];

function MetricCard({ target, prefix, suffix, label }: { target: number; prefix?: string; suffix?: string; label: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState("0");

  useGSAP(
    () => {
      if (!cardRef.current) return;

      const obj = { val: 0 };

      gsap.to(obj, {
        val: target,
        duration: 2.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          setDisplayValue(Math.round(obj.val).toLocaleString());
        }
      });
    },
    { scope: cardRef, dependencies: [target] }
  );

  return (
    <div
      ref={cardRef}
      className="metric-card relative overflow-hidden w-full flex flex-col items-start justify-start py-14 sm:py-12 md:py-20 px-6 sm:px-8 xl:px-12 bg-background sm:last:col-span-2 lg:last:col-span-1"
    >
      {/* Card Content */}
      <div className="relative z-10 flex flex-col items-start text-left">
        <span className={`text-xs sm:text-sm font-medium tracking-widest text-accent mb-2 ${!prefix ? 'invisible' : ''}`}>
          {prefix || "\u00A0"}
        </span>
        <div className="flex flex-row items-baseline justify-start text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-light leading-none tracking-wide text-foreground mb-3">
          <span>{displayValue}</span>
          {suffix && <span className="text-accent text-3xl sm:text-4xl ml-1">{suffix}</span>}
        </div>

        <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-muted">
          {label}
        </span>
      </div>
    </div>
  );
}

export function ExperienceTrust() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current || prefersReducedMotion) return;
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      id="experience-trust"
      className="py-16 md:py-24 relative w-full overflow-hidden bg-background text-foreground select-none"
    >
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-20 lg:px-24 max-w-[1400px] mx-auto flex flex-col">

        {/* Section Heading & Subtext */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-16 w-full mb-16 md:mb-24">
          <div className="max-w-md lg:max-w-lg">
            <h5 className="text-accent !mb-4">
              What to Expect
            </h5>
            <h2 className="text-foreground text-balance">
              Step inside a real home.
            </h2>
          </div>

          <p className="text-sm md:text-base font-light tracking-wide text-foreground/70 leading-relaxed max-w-2xl text-balance">
            Experience a real home, automated. Walk from room to room as the light, temperature and curtains adjust on their own to the hour. Lock the door, check a camera or move music to another room, all from your phone. Then sit down with our team for an unhurried consultation, planned around your floor plan and the way your family lives.
          </p>
        </div>

        {/* Specs Grid */}
        <div
          ref={gridRef}
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-border gap-[1px] border-y border-border overflow-hidden"
        >
          {METRICS.map((metric, index) => (
            <MetricCard
              key={index}
              target={metric.target}
              prefix={metric.prefix}
              suffix={metric.suffix}
              label={metric.label}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
