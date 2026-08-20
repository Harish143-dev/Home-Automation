'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { Check, Film, Tv, Speaker, Volume2, Projector, Cast, Gamepad2 } from 'lucide-react';

const BENEFITS = [
  "Access your entertainment from any room",
  "Play different content in different areas",
  "Control everything from a single app or remote",
  "Hidden wiring and centrally located equipment",
  "Expand your system as your needs grow",
];

const LABELS = [
  { text: "Home Theatre", icon: Film },
  { text: "Living Room TV", icon: Tv },
  { text: "Multi-Room Audio", icon: Speaker },
  { text: "Outdoor Speakers", icon: Volume2 },
  { text: "Projector", icon: Projector },
  { text: "Streaming Devices", icon: Cast },
  { text: "Gaming Console", icon: Gamepad2 },
];

export function AudioVideoSystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    // Header animation
    gsap.fromTo('.system-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Cards animation
    gsap.fromTo('.system-card',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power2.out',
        scrollTrigger: {
          trigger: '.system-grid',
          start: 'top 85%',
        }
      }
    );

    // Benefits animation
    gsap.fromTo('.system-benefit',
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: {
          trigger: '.system-benefits-container',
          start: 'top 85%',
        }
      }
    );

  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-12 md:py-16 relative w-full bg-background px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/5">
      <div className="max-w-7xl w-full mx-auto">

        {/* Header */}
        <div className="max-w-4xl flex flex-col items-start mb-16 md:mb-24">
          <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base system-header text-accent mb-4 block">
            Seamless Connectivity
          </span>
          <h2 className=" system-header text-foreground text-balance mb-6">
            One System. Endless Entertainment.
          </h2>
          <p className="system-header text-sm md:text-base lg:text-lg font-light tracking-wide text-muted leading-relaxed text-balance">
            Control every entertainment device from a single intuitive interface.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Left Side: Labels Grid */}
          <div className="system-grid w-full lg:w-[60%] grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {LABELS.map((label, idx) => {
              const Icon = label.icon;
              return (
                <div
                  key={idx}
                  className="system-card bg-black/[0.03] border border-black/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 hover:shadow-md hover:bg-black/[0.05] hover:border-black/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center group-hover:bg-accent/10 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm sm:text-base font-medium tracking-wide text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                    {label.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right Side: Benefits */}
          <div className="system-benefits-container w-full lg:w-[40%] bg-black/[0.03] border border-black/5 rounded-[2rem] p-8 sm:p-10 lg:p-12 shadow-xl shadow-black/[0.02]">
            <h3 className=" text-foreground mb-8">
              Key Benefits
            </h3>
            <ul className="flex flex-col gap-6 w-full">
              {BENEFITS.map((benefit, idx) => (
                <li key={idx} className="system-benefit flex items-start gap-4 group">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-accent/20 transition-colors duration-300">
                    <Check className="w-3.5 h-3.5 text-accent" strokeWidth={2.5} />
                  </div>
                  <span className="text-base font-light text-foreground/80 leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
