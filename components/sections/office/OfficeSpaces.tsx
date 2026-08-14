'use client';

import React, { useRef } from 'react';
import NextImage from 'next/image';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const SPACES = [
  {
    id: "reception",
    title: "Reception & Lobby",
    description: "Lighting control, motorized shades, digital displays, and background audio.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "meeting",
    title: "Meeting & Conference Rooms",
    description: "Video conferencing, presentation systems, lighting control, shades, and touchscreen control.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "executive",
    title: "Executive Cabins",
    description: "Personal lighting control, motorized shades, AV integration, and room control.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "open",
    title: "Open Workspaces",
    description: "Occupancy-based lighting, daylight harvesting, shades, and distributed audio.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "training",
    title: "Training Rooms",
    description: "Interactive displays, video conferencing, presentation systems, microphones, and room control.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "breakout",
    title: "Breakout & Collaboration Zones",
    description: "Flexible lighting, audio, displays, and integrated controls.",
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=2000&auto=format&fit=crop",
  }
];

export function OfficeSpaces() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !cardsRef.current.length) return;

    // Desktop Stacking Animation (scale down previous cards as new ones cover them)
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      cardsRef.current.forEach((card, index) => {
        if (!card || index === cardsRef.current.length - 1) return; // Skip the last card as nothing covers it

        gsap.to(card, {
          scale: 0.9,
          ease: "none",
          scrollTrigger: {
            trigger: cardsRef.current[index + 1], // The card that comes next
            start: "top bottom", // When the next card enters the bottom of the screen
            end: "top top", // When the next card reaches the top (covering the current one)
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
          <span className="text-accent mb-4 block tracking-[0.1em] uppercase text-sm font-medium">
            Tailored Environments
          </span>
          <h2 className="font-light leading-[1.2] tracking-wide text-3xl sm:text-4xl text-foreground text-balance mb-6">
            Intelligent Solutions for Every Office Space
          </h2>
          <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance">
            Integrated automation solutions designed for every workspace, from reception areas and executive cabins to meeting rooms, workstations, and collaboration zones.
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
                  <h3 className="font-light leading-[1.2] tracking-wide text-2xl sm:text-3xl lg:text-4xl text-foreground text-balance">
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
