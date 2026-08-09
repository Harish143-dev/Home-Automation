'use client';

import React, { useRef } from 'react';
import NextImage from 'next/image';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const SPACES = [
  {
    id: "executive",
    title: "Executive Board Meetings",
    description: "One-touch room control, secure video conferencing, and professional presentations for leadership discussions.",
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "client",
    title: "Client Presentations",
    description: "Deliver impactful presentations with high-resolution displays and premium audio.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "hybrid",
    title: "Hybrid Collaboration",
    description: "Connect in-room and remote participants with reliable video conferencing and wireless content sharing.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "training",
    title: "Training & Workshops",
    description: "Engage teams with interactive displays, wireless presentations, and session recording capabilities.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop",
  }
];

export function BoardroomSpaces() {
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
      mm.revert(); // Clean up matchMedia on unmount
    };
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-12 md:py-16 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 lg:gap-24 relative pb-[10vh]">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto z-10 py-6 px-4">
          <span className="text-accent mb-4 block tracking-[0.1em]">
            Versatile Environments
          </span>
          <h2 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground text-balance mb-6">
            Meeting Experiences Designed for Every Business Need
          </h2>
        </div>

        {/* Stacking Cards Container */}
        <div className="flex flex-col gap-12 lg:gap-0 mt-8 lg:mt-16 w-full relative z-20">
          {SPACES.map((space, idx) => (
            <div
              key={space.id}
              ref={el => { cardsRef.current[idx] = el; }}
              className="lg:sticky lg:top-[20vh] w-full lg:h-[60vh] bg-panel rounded-[2rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl shadow-black/5 origin-top border border-black/5"
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
              <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-panel">
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-background border border-black/5 text-foreground font-display text-xl shrink-0">
                    0{idx + 1}
                  </span>
                  <h3 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground text-balance">
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
