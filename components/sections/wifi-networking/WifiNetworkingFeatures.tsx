'use client';

import React, { useRef } from 'react';
import NextImage from 'next/image';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

// Placeholder images for the features - the user can replace these later
import imgPlaceholder1 from '@/assets/residential/hero.jpg';

const FEATURES = [
  {
    id: "coverage",
    title: "Whole-Home Wi-Fi Coverage",
    description: "Enjoy fast, reliable connectivity throughout your home with professionally designed Wi-Fi that eliminates dead zones. Using heat mapping and strategically placed access points, we ensure consistent performance for every connected device.",
    image: imgPlaceholder1,
  },
  {
    id: "roaming",
    title: "Intelligent Roaming",
    description: "Stay connected as you move from room to room. Your devices automatically switch to the strongest access point, ensuring uninterrupted video calls, streaming, gaming, and smart home control.",
    image: imgPlaceholder1,
  },
  {
    id: "unified",
    title: "Unified Smart Home Control",
    description: "Manage lighting, climate, security, audio, video, motorized shades, and other connected devices through a single app, touchscreen, or custom interface designed around your lifestyle.",
    image: imgPlaceholder1,
  },
  {
    id: "secure",
    title: "Secure Network",
    description: "A professionally configured network protects your connected devices while ensuring fast, reliable communication between every automation system in your home.",
    image: imgPlaceholder1,
  },
  {
    id: "remote",
    title: "Remote Access from Anywhere",
    description: "Monitor your home, activate lighting scenes, adjust the temperature, check security cameras, or control entertainment systems securely from anywhere using your smartphone or tablet.",
    image: imgPlaceholder1,
  }
];

export function WifiNetworkingFeatures() {
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
        <div className="text-center max-w-4xl mx-auto z-10 py-6 px-4">
          <h5 className=" text-accent mb-4 block">
            Connected Living
          </h5>
          <h2 className=" text-foreground text-balance mb-6">
            A Connected Home, Designed Around You
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            Experience enterprise-grade Wi-Fi, intelligent networking, and intuitive controls that keep every room connected, every device responsive, and your entire home easy to manage.
          </p>
        </div>

        {/* Stacking Cards Container */}
        <div className="flex flex-col gap-12 lg:gap-0 mt-8 lg:mt-16 w-full relative z-20">
          {FEATURES.map((feature, idx) => (
            <div
              key={feature.id}
              ref={el => { cardsRef.current[idx] = el; }}
              // In desktop, cards stick to the top. In mobile, they just stack with gap.
              className="lg:sticky lg:top-[20vh] w-full lg:h-[60vh] bg-panel rounded-[2rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl shadow-black/5 origin-top border border-black/5"
            >

              {/* Left Side: Image */}
              <div className="w-full lg:w-1/2 h-[300px] lg:h-full relative shrink-0">
                <NextImage
                  src={feature.image}
                  alt={feature.title}
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
                    {feature.title}
                  </h3>
                </div>

                <p className="text-base md:text-lg lg:text-xl font-light text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
