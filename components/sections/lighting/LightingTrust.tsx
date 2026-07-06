"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";

interface MetricItem {
  target: number;
  prefix?: string;
  label: string;
}

const METRICS: MetricItem[] = [
  { target: 24, prefix: "Over", label: "Years Experience" },
  { target: 1000, prefix: "Over", label: "Projects Delivered" },
  { target: 650, prefix: "Over", label: "Premium Residences" },
  { target: 3, label: "Experience Centers" },
  { target: 12, prefix: "Over", label: "Cities" }
];

function MetricCard({ target, prefix, label }: { target: number; prefix?: string; label: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const { isReady } = useBreakpoint();

  useGSAP(
    () => {
      if (!isReady || !numberRef.current || !cardRef.current) return;

      const obj = { val: 0 };

      gsap.to(obj, {
        val: target,
        duration: 2.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 95%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.textContent = Math.round(obj.val).toLocaleString();
          }
        }
      });
    },
    { scope: cardRef, dependencies: [isReady, target] }
  );

  return (
    <div
      ref={cardRef}
      className="metric-card relative overflow-hidden w-full flex flex-col items-start justify-center py-12 sm:py-16 md:py-20 px-6 sm:px-8 bg-background opacity-0"
    >
      {/* Card Content */}
      <div className="relative z-10 flex flex-col items-start text-left">
        {prefix ? (
          <span className="text-xs tracking-[0.3em] font-light text-accent mb-2">{prefix}</span>
        ) : (
          <span className="text-xs tracking-[0.3em] font-light text-muted mb-2">&nbsp;</span>
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
  const { isReady } = useBreakpoint();

  useGSAP(
    () => {
      if (!isReady || !sectionRef.current || prefersReducedMotion) return;

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".metric-card");
        
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
          }
        });
      }
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] }
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
            With over 24 years of experience, ATPL has successfully delivered over 1,000 projects, including more than 650 premium residences, over 250 hospitality projects, and over 100 commercial projects. With Experience Centres in Delhi, Mumbai, and Bangalore, and sales and service support across over 12 cities.
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

        {/* Clients and Accolades */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mt-16 md:mt-24 text-left">
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-light tracking-wide text-foreground mb-6">
              Trusted by the Best
            </h3>
            <p className="text-muted font-light text-base md:text-lg leading-relaxed">
              ATPL is trusted by India's leading homeowners, business leaders, celebrities, and prestigious residences. Its portfolio includes distinguished clients such as Madhuri Dixit, Rajan Mittal (Airtel), BKT Farms, Atul Raheja, Khazana Jewellery (Chennai), along with hundreds of premium homes across the country.
            </p>
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-light tracking-wide text-foreground mb-6">
              Awards & Recognitions
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted font-light text-base">
                <div className="w-1.5 h-1.5 rounded-full bg-accent/40 mt-2 flex-shrink-0" />
                <span>Lutron Electronics (USA) Authorized Distributor</span>
              </li>
              <li className="flex items-start gap-3 text-muted font-light text-base">
                <div className="w-1.5 h-1.5 rounded-full bg-accent/40 mt-2 flex-shrink-0" />
                <span>Founding India Member of CEDIA</span>
              </li>
              <li className="flex items-start gap-3 text-muted font-light text-base">
                <div className="w-1.5 h-1.5 rounded-full bg-accent/40 mt-2 flex-shrink-0" />
                <span>2026 Lutron Hall of Fame &ndash; First company in Asia to receive this recognition</span>
              </li>
              <li className="flex items-start gap-3 text-muted font-light text-base">
                <div className="w-1.5 h-1.5 rounded-full bg-accent/40 mt-2 flex-shrink-0" />
                <span>Multiple Residential &amp; Hospitality Business Awards</span>
              </li>
              <li className="flex items-start gap-3 text-muted font-light text-base">
                <div className="w-1.5 h-1.5 rounded-full bg-accent/40 mt-2 flex-shrink-0" />
                <span>Nationally recognized for excellence in luxury home automation.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
