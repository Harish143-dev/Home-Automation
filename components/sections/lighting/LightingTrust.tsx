"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

interface MetricItem {
  target: number;
  prefix?: string;
  label: string;
}

const METRICS: MetricItem[] = [
  { target: 20, prefix: "Over", label: "Years Experience" },
  { target: 1000, prefix: "Over", label: "Projects Delivered" },
  { target: 50, prefix: "Over", label: "Cities" },
  { target: 5, label: "Experience Centers" },
  { target: 200, prefix: "Over", label: "Premium Clients" }
];

function MetricCard({ target, prefix, label }: { target: number; prefix?: string; label: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!numberRef.current || !cardRef.current) return;

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
          if (numberRef.current) {
            numberRef.current.textContent = Math.round(obj.val).toLocaleString();
          }
        }
      });
    },
    { scope: cardRef, dependencies: [target] }
  );

  return (
    <div
      ref={cardRef}
      className="metric-card relative overflow-hidden w-full flex flex-col items-start justify-center py-12 sm:py-16 md:py-20 px-6 sm:px-8 bg-background"
    >
      {/* Card Content */}
      <div className="relative z-10 flex flex-col items-start text-left">
        {prefix ? (
          <span className="text-xs tracking-[0.3em] font-light uppercase text-accent mb-2">{prefix}</span>
        ) : (
          <span className="text-xs tracking-[0.3em] font-light uppercase text-muted mb-2">&nbsp;</span>
        )}
        <div className="flex flex-row items-baseline justify-start text-4xl sm:text-5xl md:text-6xl lg:text-4xl xl:text-5xl font-light leading-none tracking-wide text-foreground mb-3">
          <span ref={numberRef}>0</span>
        </div>

        <span className="text-xs sm:text-sm font-light text-muted leading-relaxed">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function LightingTrust() {
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
      id="lighting-trust"
      className="relative w-full overflow-hidden bg-background pt-20 md:pt-24 pb-8 md:pb-12 text-foreground select-none"
    >
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-20 lg:px-24 max-w-[1400px] mx-auto flex flex-col">

        {/* Section Heading & Subtext */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-16 w-full mb-16 md:mb-20">
          <div className="max-w-sm lg:max-w-md">
            <span className="tracking-[0.3em] text-sm md:text-base text-accent mb-4 block">
              Proven Experience
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-[1.2] text-foreground text-balance">
              Precision Engineering, At Scale.
            </h2>
          </div>
          <p className="text-sm md:text-base font-light tracking-wide text-muted leading-relaxed max-w-2xl text-balance">
            Building premium automation spaces requires more than just smart technology—it demands decades of robust integration expertise. We map out precise intelligent environments that balance structural performance with daily rhythms, delivering custom systems designed to last.
          </p>
        </div>

        {/* Specs Grid */}
        <div
          ref={gridRef}
          className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 bg-border gap-[1px] border-y border-border overflow-hidden"
        >
          {METRICS.map((metric, index) => (
            <MetricCard
              key={index}
              target={metric.target}
              prefix={metric.prefix}
              label={metric.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
