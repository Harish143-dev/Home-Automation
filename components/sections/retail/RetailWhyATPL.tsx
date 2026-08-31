'use client';

import { useRef } from "react";
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { CheckCircle2 } from "lucide-react";
import { scheduleScrollRefresh } from "../../../lib/scrollRefresh";

const STATS = [
  "Over 24 Years of automation expertise",
  "Over 1,000 projects successfully delivered",
  "Over 650 residences automated",
  "Over 250 hospitality projects completed and over 2500 Guest rooms",
  "Over 100 commercial projects delivered",
  "Experience Centres in Delhi, Mumbai & Bangalore"
];

export function RetailWhyATPL() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });

    tl.fromTo(".lwhy-header",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    tl.fromTo(".lwhy-stat",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" },
      "-=0.4"
    );

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col">

        {/* Header & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 mb-10 md:mb-16">

          {/* Left: Text */}
          <div className="lwhy-header flex flex-col items-start justify-center text-left max-w-2xl">
            <h5 className="text-accent mb-4 block">
              The ATPL Advantage
            </h5>
            <h2 className=" text-foreground mb-6">
              Why Choose Anusha Technovision
            </h2>
            <p className="text-muted-foreground font-light text-sm sm:text-base md:text-lg leading-relaxed mb-8">
              For over 24 years, ATPL has been delivering intelligent lighting control and home automation solutions that combine world-class technology, expert execution, and dependable after-sales support. Trusted by luxury homeowners across India, we create smart homes that are, reliable, and built for the future.
            </p>
          </div>

          {/* Right: Stats List */}
          <div className="flex flex-col justify-center">
            <div className="bg-panel rounded-2xl p-8 sm:p-10 border border-black/5 shadow-sm">
              <ul className="flex flex-col gap-4 sm:gap-5">
                {STATS.map((stat, idx) => (
                  <li key={idx} className="lwhy-stat flex items-start gap-4 group">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm sm:text-base font-light text-foreground">{stat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
