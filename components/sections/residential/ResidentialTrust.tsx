"use client";

import React, { useRef, useState } from "react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

interface MetricItem {
  target: number;
  suffix: string;
  label: string;
}

const METRICS: MetricItem[] = [
  { target: 25, suffix: "+", label: "Years of Experience" },
  { target: 1000, suffix: "+", label: "Projects Completed" },
  { target: 15, suffix: "", label: "Cities Across India" },
  { target: 3, suffix: "", label: "Experience Centres" }
];

function MetricCard({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

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
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="metric-card relative overflow-hidden w-full flex flex-col items-center justify-center py-14 sm:py-16 md:py-20 px-4 sm:px-6 xl:px-8 bg-background transition-colors duration-500 hover:bg-surface-darker"
    >
      {/* Spotlight highlight element */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, rgba(0, 0, 0, 0.03), transparent 75%)`
        }}
      />

      {/* Card Content */}
      <div className="relative z-10 flex flex-col items-center gap-3 text-center">
        <span className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-light leading-none tracking-wide text-foreground">
          <span ref={numberRef}>0</span>
          <span className="text-foreground/80">{suffix}</span>
        </span>

        <span className="font-mono tracking-[0.3em] uppercase text-muted">
          {label}
        </span>
      </div>
    </div>
  );
}

export function ResidentialTrust() {
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
      id="residential-trust"
      className="relative w-full overflow-hidden bg-background py-16 sm:py-24 md:py-32 text-foreground select-none"
    >
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-20 lg:px-24 max-w-[1400px] mx-auto flex flex-col">

        {/* Section Heading & Subtext */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-16 w-full mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-[1.2] text-foreground max-w-sm lg:max-w-md text-balance">
            Automation Expertise
          </h2>
          <p className="text-sm md:text-base font-light tracking-wide text-foreground/70 leading-relaxed max-w-2xl text-balance">
            We are experts in home automation integration, including Lighting, Audio, Video, Shades, Security and Wifi. In the last 25 years, we have helped 700 architects, 100 MEPs and 200 hoteliers across 4 countries and 17 cities, generate revenue worth 7000 cr. and over 15.5 million kWh of energy.
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
              suffix={metric.suffix}
              label={metric.label}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
