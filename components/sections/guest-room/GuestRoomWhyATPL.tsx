'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const STATS = [
  { label: "Automation Expertise", value: "24+", suffix: "Years" },
  { label: "Projects Delivered", value: "1,000+", suffix: "" },
  { label: "Residences Automated", value: "650+", suffix: "" },
  { label: "Hospitality Projects", value: "250+", suffix: "2,500+ Guest Rooms" },
  { label: "Commercial Projects", value: "100+", suffix: "" },
  { label: "Experience Centres", value: "3", suffix: "Delhi, Mumbai & Bangalore" }
];

export function GuestRoomWhyATPL() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.fromTo('.gr-atpl-header',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(itemsRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-12 md:py-16 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-panel text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-16 lg:gap-20 relative">

        {/* Header */}
        <div className="gr-atpl-header text-center max-w-4xl mx-auto">
          <h2 className="text-foreground text-balance mb-6">
            Why Choose Anusha Technovision
          </h2>
          <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance">
            For over 24 years, ATPL has been delivering intelligent lighting control and home automation solutions that combine world-class technology, expert execution, and dependable after-sales support. Trusted by luxury homeowners across India, we create smart homes that are reliable, and built for the future.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              ref={el => { itemsRef.current[idx] = el; }}
              className="group flex flex-col items-center text-center justify-center gap-2 p-10 rounded-[2rem] bg-background border border-black/5 hover:border-black/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              <h3 className="text-accent mb-2">
                {stat.value}
              </h3>
              <h5 className="text-foreground">
                {stat.label}
              </h5>
              {stat.suffix && (
                <p className="text-sm text-muted-foreground font-light mt-1">
                  {stat.suffix}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
