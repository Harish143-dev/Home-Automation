"use client";

import React, { useRef, useState, useEffect } from "react";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { gsap } from "../../../lib/gsapSetup";
import { clsx } from "clsx";
import {
  Lightbulb, Sun, Thermometer,
  Video, MonitorPlay, CalendarClock,
  Wifi, ShieldCheck, Cpu
} from "lucide-react";

// Bento Card Component
function BentoCard({
  title,
  items,
  icon: Icon,
  className
}: {
  title: string;
  items: string[];
  icon?: React.ElementType;
  className?: string
}) {
  return (
    <div className={clsx(
      "relative overflow-hidden rounded-3xl bg-white border border-border/50 p-6 sm:p-8 flex flex-col group hover:shadow-2xl hover:border-accent/30 transition-all duration-500",
      className
    )}>
      {/* Subtle background glow effect on hover */}
      <div className="absolute -inset-px bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

      <div className="flex items-center gap-4 mb-6 relative z-10">
        {Icon && (
          <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center shrink-0 border border-border group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-sm">
            <Icon className="w-5 h-5 text-foreground group-hover:text-white transition-colors" />
          </div>
        )}
        <h4 className="text-foreground">{title}</h4>
      </div>

      <ul className="space-y-3 relative z-10">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-accent/60 mt-2 shrink-0 group-hover:bg-accent transition-colors duration-300" />
            <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CommercialCoreCapabilities() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [activeTab, setActiveTab] = useState<number>(0);

  const TABS = [
    { id: "core", label: "Core Automation" },
    { id: "boardroom", label: "Boardroom Solutions" },
    { id: "network", label: "Networking & Security" }
  ];

  // GSAP Animation for Tab Switching
  useEffect(() => {
    if (prefersReducedMotion || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }, contentRef);

    return () => ctx.revert();
  }, [activeTab, prefersReducedMotion]);

  return (
    <section ref={containerRef} id="commercial-core-capabilities" className="py-16 md:py-24 bg-background w-full">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-20 lg:px-24">

        {/* Header & Tabs */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-accent mb-4 block">
            System Capabilities
          </span>
          <h2 className="text-foreground mb-12 text-balance">
            Integrated Enterprise Infrastructure
          </h2>

          {/* Floating Pill Tabs */}
          <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-white border border-border shadow-sm rounded-full">
            {TABS.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(idx)}
                className={clsx(
                  "px-6 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300",
                  activeTab === idx
                    ? "bg-foreground text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-black/5"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Tab Content (Bento Grids) */}
        <div ref={contentRef} className="w-full">

          {/* TAB 0: CORE AUTOMATION */}
          {activeTab === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
              <BentoCard
                title="Lighting Control Systems"
                icon={Lightbulb}
                items={[
                  "Dimming control",
                  "Daylight harvesting",
                  "Occupancy/vacancy sensing",
                  "Tunable white lighting",
                  "Scene control and scheduling"
                ]}
              />
              <BentoCard
                title="Motorized Shades"
                icon={Sun}
                items={[
                  "Automated shade control",
                  "Solar-adaptive shading",
                  "Glare reduction and energy optimization"
                ]}
              />
              <BentoCard
                title="HVAC & Climate Integration"
                icon={Thermometer}
                items={[
                  "HVAC control integration",
                  "Occupancy-based HVAC management",
                  "BACnet/API integration"
                ]}
                className="md:col-span-2 lg:col-span-1"
              />
            </div>
          )}

          {/* TAB 1: BOARDROOM SOLUTIONS */}
          {activeTab === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
              <BentoCard
                title="Conferencing & Audio"
                icon={Video}
                items={[
                  "Video conferencing solutions",
                  "Speaker tracking cameras",
                  "Presenter tracking cameras",
                  "Ceiling and tabletop microphones"
                ]}
              />
              <BentoCard
                title="Displays & Interactive"
                icon={MonitorPlay}
                items={[
                  "Wireless presentation systems (BYOD)",
                  "Interactive displays",
                  "Video walls",
                  "Digital signage"
                ]}
              />
              <BentoCard
                title="Room Governance"
                icon={CalendarClock}
                items={[
                  "Touchscreen room controls",
                  "Room scheduling systems"
                ]}
                className="md:col-span-2 lg:col-span-1"
              />
            </div>
          )}

          {/* TAB 2: NETWORKING & SECURITY */}
          {activeTab === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
              <BentoCard
                title="Physical Security"
                icon={ShieldCheck}
                items={[
                  "CCTV surveillance",
                  "Access control systems",
                  "Integrated security solutions"
                ]}
              />
              <BentoCard
                title="Enterprise Connectivity"
                icon={Wifi}
                items={[
                  "Wi-Fi solutions",
                  "High-bandwidth network routing",
                  "Zero-latency AV-over-IP networking"
                ]}
              />
              <BentoCard
                title="Centralized Management"
                icon={Cpu}
                items={[
                  "Multi-site deployment tracking",
                  "Real-time system diagnostics",
                  "Remote firmware governance"
                ]}
                className="md:col-span-2 lg:col-span-1"
              />
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
