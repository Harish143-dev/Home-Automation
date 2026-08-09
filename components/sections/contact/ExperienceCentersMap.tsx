"use client";

import React, { useRef, useState } from "react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { ArrowRight } from "lucide-react";

const LOCATIONS = [
  {
    id: "delhi",
    city: "New Delhi",
    title: "Corporate Headquarters & Experience Centre",
    address: "B-4/233, Safdarjung Enclave, New Delhi 110029",
    phone: "+91 11 4160 8415"
  },
  {
    id: "mumbai",
    city: "Mumbai",
    title: "Regional Office & Experience Centre",
    address: "Unit No. 101, First Floor, Peninsula Centre, Dr. S.S. Rao Road, Parel, Mumbai 400012",
    phone: "+91 22 2418 8415"
  },
  {
    id: "bangalore",
    city: "Bengaluru",
    title: "Experience Centre",
    address: "Indiranagar, 100 Feet Road, Bengaluru 560038",
    phone: "+91 80 4160 8415"
  }
];

export function ExperienceCentersMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || prefersReducedMotion) return;

      const items = listRef.current?.querySelectorAll(".location-item");
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 relative w-full bg-background text-foreground px-6 sm:px-12 md:px-24 border-t border-border"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">

        {/* Header */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="text-[10px] sm:text-xs tracking-[0.3em] text-accent">
              Locations
            </span>
            <div className="h-[1px] w-12 bg-border" />
          </div>
          <h2 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground">
            Experience Centres
          </h2>
        </div>

        {/* Interactive List */}
        <div ref={listRef} className="flex flex-col w-full border-t border-border">
          {LOCATIONS.map((loc) => {
            const isActive = activeLocation === loc.id;

            return (
              <div
                key={loc.id}
                className="location-item group flex flex-col w-full border-b border-border py-8 md:py-16 cursor-pointer relative overflow-hidden"
                onMouseEnter={() => setActiveLocation(loc.id)}
                onMouseLeave={() => setActiveLocation(null)}
              >
                {/* Background Hover Effect */}
                <div
                  className={`absolute inset-0 bg-accent/5 transition-opacity duration-700 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0'}`}
                />

                <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:items-center gap-6 lg:gap-12 px-4 md:px-8">
                  {/* City Name */}
                  <h3 className={`text-4xl md:text-5xl lg:text-7xl font-light tracking-wide transition-all duration-500 ${isActive ? 'text-accent translate-x-4' : 'text-muted-foreground'}`}>
                    {loc.city}
                  </h3>

                  {/* Location Details */}
                  <div className={`flex flex-col lg:items-end gap-2 transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-40 lg:opacity-0 lg:translate-y-4'}`}>
                    <p className="text-xl sm:text-2xl lg:text-3xl tracking-[0.3em] text-muted-foreground">
                      {loc.title}
                    </p>
                    <p className="text-base md:text-lg font-light text-foreground max-w-sm lg:text-right">
                      {loc.address}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-accent hover:text-accent/80 transition-colors">
                      <span className="text-sm tracking-wide">{loc.phone}</span>
                      <ArrowRight className="w-4 h-4" />
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
