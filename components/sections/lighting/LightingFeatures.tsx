"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { EASE, DURATION, STAGGER } from "@/lib/animation.config";
import { scheduleScrollRefresh } from "../../../lib/scrollRefresh";
import {
  UserCheck,
  Blinds,
  CalendarClock,
  Thermometer,
  Smartphone,
  Sun
} from "lucide-react";

const FEATURES = [
  {
    id: "occupancy-sensing",
    title: "Occupancy Sensing",
    icon: UserCheck,
    description: "Intelligently turns lights on when a space is occupied and switches them off when unoccupied, ensuring energy is used only when needed."
  },
  {
    id: "window-shades",
    title: "Automated Window Shades",
    icon: Blinds,
    description: "Seamlessly adjusts shades throughout the day to minimize heat gain while maximizing natural daylight."
  },
  {
    id: "smart-scheduling",
    title: "Smart Scheduling",
    icon: CalendarClock,
    description: "Automates lighting and connected devices according to personalized schedules, reducing unnecessary energy consumption."
  },
  {
    id: "hvac-integration",
    title: "HVAC Integration",
    icon: Thermometer,
    description: "Optimizes heating and cooling based on occupancy, schedules, and environmental conditions for enhanced efficiency and comfort."
  },
  {
    id: "app-voice-control",
    title: "App & Voice Control",
    icon: Smartphone,
    description: "Monitor and manage your home's lighting, climate, and energy usage from anywhere using a smartphone or voice assistant."
  },
  {
    id: "daylight-optimization",
    title: "Daylight Optimization",
    icon: Sun,
    description: "Intelligently balances natural and artificial lighting to create a comfortable environment while minimizing electricity consumption."
  }
];

export default function LightingFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    gsap.fromTo(".lf-card",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DURATION.normal,
        stagger: STAGGER.normal,
        ease: EASE.reveal,
        scrollTrigger: {
          trigger: ".lf-grid",
          start: "top 85%",
        }
      }
    );

    scheduleScrollRefresh();

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* Features Grid */}
        <div className="lf-grid w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="lf-card group relative flex flex-col p-8 md:p-10 rounded-2xl bg-panel shadow-sm border border-border overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Subtle Background Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ease-out border border-border">
                  <feature.icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                </div>

                <h4 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground mb-4">
                  {feature.title}
                </h4>

                <p className="text-muted font-light text-sm sm:text-base md:text-lg leading-relaxed mt-auto">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
