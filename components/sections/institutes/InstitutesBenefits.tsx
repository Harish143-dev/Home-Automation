'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Presentation, Laptop, Sun, Megaphone, ShieldCheck, Settings } from 'lucide-react';
import { DURATION, EASE } from '@/lib/animation.config';

const BENEFITS = [
  {
    title: "Interactive Teaching",
    description: "Interactive displays, AV systems, and integrated room controls support engaging and technology-enabled teaching.",
    icon: Presentation
  },
  {
    title: "Hybrid Learning",
    description: "Video conferencing and wireless presentation systems connect students and educators across physical and virtual classrooms.",
    icon: Laptop
  },
  {
    title: "Comfortable Learning Spaces",
    description: "Automated lighting, shades, and HVAC create comfortable environments while improving energy efficiency.",
    icon: Sun
  },
  {
    title: "Campus Communication",
    description: "Distributed audio and digital displays enable clear announcements and effective communication across campus spaces.",
    icon: Megaphone
  },
  {
    title: "Safe Environment",
    description: "Integrated access control, security systems, and monitoring help create safer environments for students, staff, and visitors.",
    icon: ShieldCheck
  },
  {
    title: "Efficient Facility Management",
    description: "Centralized controls, occupancy data, scheduling, and energy monitoring simplify day-to-day campus management.",
    icon: Settings
  }
];

export function InstitutesBenefits() {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    // Header Intro Animation
    gsap.fromTo(leftColRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DURATION.normal,
        ease: EASE.reveal,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );

    // Scroll opacity effect for cards
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      gsap.fromTo(card,
        { opacity: 0.2, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top center+=15%", // when card reaches middle of screen
            end: "bottom center-=15%",
            toggleActions: "play reverse play reverse", // highlights when in view, fades when leaving
          }
        }
      );
    });

    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-panel text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative items-start">

        {/* Left Content - Sticky */}
        <div ref={leftColRef} className="w-full lg:w-[40%] lg:sticky lg:top-[25vh] flex flex-col gap-6 z-10">
          <span className="tracking-[0.1em] text-accent block text-sm font-medium">
            The Advantage
          </span>
          <h2 className="text-foreground text-balance">
            Designed Around the Modern Learning Experience
          </h2>
          <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance">
            Support educators and students with intelligent environments that enhance collaboration, communication, and comfort.
          </p>
        </div>

        {/* Right Content - Scrolling Cards */}
        <div className="w-full lg:w-[60%] flex flex-col gap-8 lg:gap-12 pb-[10vh]">
          {BENEFITS.map((benefit, idx) => (
            <div
              key={idx}
              ref={el => { cardsRef.current[idx] = el; }}
              className="bg-background border border-black/5 rounded-[2rem] p-8 md:p-10 flex flex-col sm:flex-row gap-6 md:gap-8 items-start shadow-xl shadow-black/5"
            >
              <div className="w-16 h-16 rounded-full bg-accent/5 flex items-center justify-center shrink-0 border border-accent/10">
                <benefit.icon className="w-7 h-7 text-accent" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-3 pt-2">
                <h3 className="text-foreground text-balance">
                  {benefit.title}
                </h3>
                <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
