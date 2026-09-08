"use client";

import React, { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";

const STATS = [
  "Over 24 Years of automation expertise",
  "Over 1,000 projects successfully delivered",
  "Over 650 residences automated",
  "Over 250 hospitality projects completed and over 2500 Guest rooms",
  "Over 100 commercial projects delivered",
  "Experience Centres in Delhi, Mumbai & Bangalore"
];

export function SecurityAutomationWhyChooseUs() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.fromTo(".why-choose-item",
      { opacity: 0, x: -20 },
      {
        opacity: 1, 
        x: 0, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );

    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden border-t border-black/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Left: Text */}
        <div className="w-full lg:w-5/12 flex flex-col items-start justify-center">
          <h5 className="text-accent mb-4 block">
            Proven Expertise
          </h5>
          <h2 className="text-foreground mb-6 text-balance">
            Why Choose Anusha Technovision
          </h2>
          <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed text-balance">
            For over 24 years, ATPL has been delivering intelligent lighting control and home automation solutions that combine world-class technology, expert execution, and dependable after-sales support. Trusted by luxury homeowners across India, we create smart homes that are, reliable, and built for the future.
          </p>
        </div>

        {/* Right: Stats List */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center">
          <ul className="flex flex-col border-t border-black/5">
            {STATS.map((stat, idx) => (
              <li key={idx} className="why-choose-item flex items-start gap-4 group py-6 border-b border-black/5">
                <div className="shrink-0 mt-0.5">
                  <CheckCircle2 className="w-6 h-6 text-accent group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                <span className="text-base md:text-lg font-light text-foreground leading-snug">{stat}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
