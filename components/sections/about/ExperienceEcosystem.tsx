"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

const LOCATIONS = [
  { id: "delhi", city: "New Delhi", title: "Corporate HQ & Experience Centre", address: "D-89, Okhla Phase 1, New Delhi - 110020" },
  { id: "mumbai", city: "Mumbai", title: "Experience Centre", address: "Worli, Mumbai" },
  { id: "bangalore", city: "Bengaluru", title: "Experience Centre", address: "Indiranagar, Bengaluru" },
];

export default function ExperienceEcosystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".eco-title",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 relative w-full bg-background text-foreground px-6 sm:px-12 md:px-24 border-t border-border"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">

        {/* Header */}
        <div className="flex flex-col gap-6 eco-title">
          <div className="flex items-center gap-4">
            <span className="text-[10px] sm:text-xs tracking-[0.3em] text-accent">
              National Presence
            </span>
            <div className="h-[1px] w-12 bg-border" />
          </div>
          <h2 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground">
            The Experience Ecosystem
          </h2>
          <p className="text-muted-foreground text-lg font-light max-w-xl">
            Our network of state-of-the-art experience centers allows architects, designers,
            and homeowners to physically interact with the future of intelligent living.
          </p>
        </div>

        {/* Minimal Interactive Map/List */}
        <div className="flex flex-col w-full border-t border-border">
          {LOCATIONS.map((loc) => {
            const isActive = activeLocation === loc.id;

            return (
              <div
                key={loc.id}
                className="group flex flex-col w-full border-b border-border py-8 md:py-16 cursor-pointer relative overflow-hidden transition-colors"
                onMouseEnter={() => setActiveLocation(loc.id)}
                onMouseLeave={() => setActiveLocation(null)}
              >
                {/* Background Hover Effect */}
                <div
                  className={`absolute inset-0 bg-accent/5 transition-opacity duration-700 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0'}`}
                />

                <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:items-center gap-6 lg:gap-12 px-4 md:px-8">
                  {/* City Name */}
                  <h3 className={`text-3xl md:text-4xl lg:text-5xl font-light tracking-wide transition-all duration-500 ${isActive ? 'text-accent translate-x-4' : 'text-muted-foreground'}`}>
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
                      <span className="text-sm tracking-wide">Get Directions</span>
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
