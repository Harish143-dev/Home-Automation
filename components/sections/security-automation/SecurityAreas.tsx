'use client';

import React, { useRef } from 'react';
import NextImage from 'next/image';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

// Placeholder images for the areas - the user can replace these later
import imgPlaceholder1 from '../../../public/images/residential_hero_bg.png';

const AREAS = [
  {
    id: "entrance",
    title: "Entrance",
    description: "Secure your main entry with smart door locks, video door phones, facial recognition, and visitor verification for controlled access.",
    image: imgPlaceholder1,
  },
  {
    id: "living-room",
    title: "Living Room",
    description: "Monitor shared spaces with indoor CCTV cameras, motion detection, and instant alerts while maintaining complete visibility through the mobile app.",
    image: imgPlaceholder1,
  },
  {
    id: "bedrooms",
    title: "Bedrooms",
    description: "Enhance privacy with personalized access, emergency panic buttons, and smart security controls for added peace of mind.",
    image: imgPlaceholder1,
  },
  {
    id: "garage",
    title: "Garage",
    description: "Control garage access remotely, monitor vehicle movement, and receive notifications whenever the garage door is opened or left unattended.",
    image: imgPlaceholder1,
  },
  {
    id: "balcony",
    title: "Balcony",
    description: "Protect vulnerable entry points using door/window sensors and motion detection to instantly detect unauthorized access.",
    image: imgPlaceholder1,
  },
  {
    id: "garden",
    title: "Garden",
    description: "Secure outdoor spaces with weather-resistant CCTV cameras, perimeter motion sensors, and smart lighting that activates automatically when movement is detected.",
    image: imgPlaceholder1,
  }
];

export function SecurityAreas() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !cardsRef.current.length) return;

    // Desktop Stacking Animation (scale down previous cards as new ones cover them)
    // We only do this if it's not a mobile screen where they might just scroll normally
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
        <div className="text-center max-w-3xl mx-auto z-10 py-6 px-4">
          <h5 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-accent mb-4 block">
            Comprehensive Coverage
          </h5>
          <h2 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground text-balance mb-6">
            Protect Every Part of Your Home
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            Intelligent security solutions designed to safeguard every area of your home with integrated monitoring, controlled access, and instant alerts.
          </p>
        </div>

        {/* Stacking Cards Container */}
        <div className="flex flex-col gap-12 lg:gap-0 mt-8 lg:mt-24 w-full relative z-20">
          {AREAS.map((area, idx) => (
            <div
              key={area.id}
              ref={el => { cardsRef.current[idx] = el; }}
              // In desktop, cards stick to the top. In mobile, they just stack with gap.
              className="lg:sticky lg:top-[25vh] w-full lg:h-[60vh] bg-panel rounded-[2rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl origin-top border border-black/5"
            >

              {/* Left Side: Image */}
              <div className="w-full lg:w-1/2 h-[300px] lg:h-full relative shrink-0">
                <NextImage
                  src={area.image}
                  alt={area.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              </div>

              {/* Right Side: Content */}
              <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-panel">
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-background border border-black/5 text-foreground font-display text-xl">
                    0{idx + 1}
                  </span>
                  <h3 className="font-light leading-[1.2] tracking-wide text-3xl sm:text-4xl lg:text-5xl text-foreground">
                    {area.title}
                  </h3>
                </div>

                <p className="text-base md:text-lg lg:text-xl font-light text-muted-foreground leading-relaxed">
                  {area.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
