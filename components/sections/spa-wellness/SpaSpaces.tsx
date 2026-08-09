'use client';

import React, { useRef } from 'react';
import NextImage from 'next/image';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const SPACES = [
  {
    id: "reception",
    title: "Reception & Waiting Lounge",
    features: [
      "Ambient lighting scenes",
      "Background music integration",
      "Automated shade control"
    ],
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "treatment",
    title: "Treatment Rooms",
    features: [
      "Personalized lighting scenes",
      "Automated HVAC control",
      "One-touch control via iPad or touchscreen"
    ],
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "massage",
    title: "Massage Suites",
    features: [
      "Relaxation and Therapy lighting modes",
      "Privacy through automated shades",
      "Integrated soothing audio"
    ],
    image: "https://images.unsplash.com/photo-1544161515-4abfbcece6d2?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "yoga",
    title: "Yoga & Meditation Studios",
    features: [
      "Adjustable lighting scenes",
      "Multi-zone background audio",
      "Comfortable climate control"
    ],
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "steam",
    title: "Steam & Wellness Areas",
    features: [
      "Automated temperature control",
      "Ambient lighting",
      "Centralized HVAC management"
    ],
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "relaxation",
    title: "Relaxation Lounges",
    features: [
      "Warm lighting scenes",
      "Continuous background music",
      "Automated shades for daylight management"
    ],
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000&auto=format&fit=crop",
  }
];

export function SpaSpaces() {
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
          <h5 className="text-accent mb-4 block tracking-[0.1em]">
            Versatile Environments
          </h5>
          <h2 className="text-foreground text-balance mb-6">
            Intelligent Automation for Every Spa & Wellness Space
          </h2>
          <p className="text-muted-foreground font-light text-lg md:text-xl text-balance">
            Enhance treatment rooms, relaxation lounges, yoga studios, reception areas, and wellness facilities with integrated lighting, audio, HVAC, shades, and centralized control for a consistent guest experience.
          </p>
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
                  <h3 className="text-foreground text-balance">
                    {space.title}
                  </h3>
                </div>

                <ul className="mt-2 space-y-4">
                  {space.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start text-base md:text-lg lg:text-xl font-light text-muted-foreground leading-relaxed">
                      <span className="text-accent mr-3 mt-1 flex-shrink-0">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
