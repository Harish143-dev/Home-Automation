'use client';

import React, { useRef } from 'react';
import NextImage from 'next/image';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const SPACES = [
  {
    id: "classrooms",
    title: "Classrooms",
    description: "Intelligent lighting, occupancy sensing, AV, displays, HVAC and room controls for focused, comfortable and connected learning spaces.",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "lecture-halls",
    title: "Lecture Halls",
    description: "Integrated lighting, AV, presentation systems, video conferencing and automated controls for effective teaching and large-group sessions.",
    image: "https://images.unsplash.com/photo-1544531585-9847b68c8c86?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "auditoriums",
    title: "Auditoriums",
    description: "Centralised control of lighting, AV, displays, audio, shades and presentation systems for events, performances and institutional programmes.",
    image: "https://images.unsplash.com/photo-1507676184212-d0c30a51fb9b?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "libraries",
    title: "Libraries",
    description: "Automated lighting, occupancy sensing, HVAC and networking solutions that support quiet, comfortable and energy-efficient study environments.",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "administrative",
    title: "Administrative Offices",
    description: "Smart lighting, shades, AV, video conferencing, access control and workspace automation for efficient day-to-day campus operations.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "common-areas",
    title: "Campus Common Areas",
    description: "Connected lighting, security, networking, audio and occupancy-based controls for safer, efficient and well-managed shared spaces.",
    image: "https://images.unsplash.com/photo-1525926477800-7a3afafebdd4?q=80&w=2000&auto=format&fit=crop",
  }
];

export function InstitutesSpaces() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !cardsRef.current.length) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      cardsRef.current.forEach((card, index) => {
        if (!card || index === cardsRef.current.length - 1) return;

        gsap.to(card, {
          scale: 0.9,
          ease: "none",
          scrollTrigger: {
            trigger: cardsRef.current[index + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          }
        });
      });
    });

    scheduleScrollRefresh();

    return () => {
      mm.revert();
    };
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-panel text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 lg:gap-24 relative pb-[10vh]">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto z-10 py-6 px-4">
          <span className="text-accent mb-4 block tracking-[0.1em] text-sm font-medium">
            Tailored Environments
          </span>
          <h2 className="text-foreground text-balance mb-6">
            Smart Solutions for Every Campus Space
          </h2>
          <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance">
            Comprehensive automation solutions tailored to different educational environments.
          </p>
        </div>

        {/* Stacking Cards Container */}
        <div className="flex flex-col gap-12 lg:gap-0 mt-8 lg:mt-8 w-full relative z-20">
          {SPACES.map((space, idx) => (
            <div
              key={space.id}
              ref={el => { cardsRef.current[idx] = el; }}
              className="lg:sticky lg:top-[20vh] w-full lg:h-[60vh] bg-background rounded-[2rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl shadow-black/5 origin-top border border-black/5"
            >

              {/* Left Side: Image */}
              <div className="w-full lg:w-1/2 h-[300px] lg:h-full relative shrink-0">
                <NextImage
                  src={space.image}
                  alt={space.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              </div>

              {/* Right Side: Content */}
              <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-background">
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/5 border border-accent/10 text-accent font-display text-xl shrink-0">
                    0{idx + 1}
                  </span>
                  <h3 className="text-foreground text-balance">
                    {space.title}
                  </h3>
                </div>

                <p className="text-base md:text-lg lg:text-xl font-light text-muted-foreground leading-relaxed">
                  {space.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
