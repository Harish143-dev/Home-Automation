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
  { target: 250, prefix: "Over", label: "Hotels" },
  { target: 2500, prefix: "Over", label: "Rooms Integrated" },
  { target: 30, prefix: "Over", label: "Global Manufacturers" },
  { target: 24, suffix: "/7", label: "Support" }
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
      className="metric-card relative overflow-hidden w-full flex flex-col items-start justify-start py-14 sm:py-16 md:py-20 px-6 sm:px-8 xl:px-12 bg-background sm:last:col-span-2 lg:last:col-span-1"
    >
      {/* Card Content */}
      <div className="relative z-10 flex flex-col items-start text-left">
        <span className={`text-xs sm:text-sm font-medium tracking-widest text-accent mb-2 ${!prefix ? 'invisible ' : ''}`}>
          {prefix || "\u00A0"}
        </span>
        <div className="flex flex-row items-baseline justify-start text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-light leading-none tracking-wide text-foreground mb-3">
          <span>{displayValue}</span>
          {suffix && <span className="text-4xl sm:text-6xl text-foreground/80 font-light ml-2">{suffix}</span>}
        </div>

        <span className="tracking-widest text-sm md:text-base text-muted whitespace-nowrap">
          {label}
        </span>
      </div>
    </div>
  );
}

export function HospitalityStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current || prefersReducedMotion) return;

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".metric-card");
        gsap.set(cards, { y: 40, opacity: 0 });

        gsap.to(cards, {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          }
        });
      }
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      id="hospitality-stats"
      className="relative w-full overflow-hidden bg-background pt-16 sm:pt-24 md:pt-32 pb-8 md:pb-12 px-6 md:px-12 lg:px-24 text-foreground select-none"
    >
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-20 lg:px-24 max-w-[1400px] mx-auto flex flex-col items-center justify-center">

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
