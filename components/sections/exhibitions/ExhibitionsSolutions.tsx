'use client';

import React, { useRef } from 'react';
import NextImage from 'next/image';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const SOLUTIONS = [
  {
    id: "video-walls",
    title: "LED Video Wall Systems",
    description: "Create impactful visual experiences with video wall displays for brand communication, presentations, digital content, and large-format visual experiences.",
    applications: [
      "Brand communication",
      "Digital content display",
      "Large-format presentations",
      "Visual storytelling"
    ],
    image: "https://images.unsplash.com/photo-1542484439-d3db09ec3551?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "lighting",
    title: "Lighting Management Systems",
    description: "Create the right environment with intelligent lighting control and dimming solutions that allow lighting levels and scenes to be managed according to different exhibition requirements.",
    applications: [
      "Lighting scenes",
      "Display and product highlighting",
      "Event modes",
      "Ambient lighting",
      "Dimming control"
    ],
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "audio",
    title: "Audio Distribution Systems",
    description: "Deliver consistent audio across exhibition spaces with distributed audio solutions designed for presentations, announcements, demonstrations, and background audio.",
    applications: [
      "Presentations",
      "Brand announcements",
      "Background audio",
      "Product demonstrations",
      "Multi-zone audio"
    ],
    image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "interactive-av",
    title: "Interactive AV Experiences",
    description: "Create engaging visitor interactions through interactive displays, wireless presentation systems, and integrated AV technologies.",
    applications: [
      "Interactive product demonstrations",
      "Touchscreen experiences",
      "Digital presentations",
      "Visitor engagement",
      "Content presentation"
    ],
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "network",
    title: "Integrated Networking Infrastructure",
    description: "Provide the connectivity required for Wi-Fi, LAN, AV distribution, control systems, and connected devices across the exhibition environment.",
    applications: [
      "Wi-Fi & LAN connectivity",
      "AV-over-IP infrastructure",
      "Connected control systems",
      "Content distribution",
      "Device connectivity"
    ],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "control",
    title: "Centralized Control & Integration",
    description: "Bring AV, displays, lighting, and other connected technologies together through centralized control for simpler operation and management.",
    applications: [
      "Centralized AV control",
      "Display control",
      "Lighting control",
      "Integrated system operation",
      "Simplified user control"
    ],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop",
  }
];

export function ExhibitionsSolutions() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !cardsRef.current.length) return;

    // Desktop Stacking Animation
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      cardsRef.current.forEach((card, index) => {
        if (!card || index === cardsRef.current.length - 1) return;

        gsap.to(card, {
          scale: 0.95,
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
    <section ref={containerRef} className="py-12 md:py-16 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 lg:gap-24 relative pb-[10vh]">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto z-10 py-6 px-4">
          <h5 className="text-accent mb-4 block">
            Comprehensive Integration
          </h5>
          <h2 className=" text-foreground text-balance mb-6">
            Complete Technology Solutions for Exhibition Spaces
          </h2>
          <p className="text-muted-foreground font-light text-lg md:text-xl text-balance">
            From individual AV technologies to a fully integrated exhibition environment, we design and implement solutions around your space, applications, and visitor experience.
          </p>
        </div>

        {/* Stacking Cards Container */}
        <div className="flex flex-col gap-12 lg:gap-0 mt-8 lg:mt-16 w-full relative z-20">
          {SOLUTIONS.map((solution, idx) => (
            <div
              key={solution.id}
              ref={el => { cardsRef.current[idx] = el; }}
              className="lg:sticky lg:top-[15vh] w-full lg:h-[70vh] bg-panel rounded-[2rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl shadow-black/5 origin-top border border-black/5"
            >

              {/* Left Side: Image */}
              <div className="w-full lg:w-1/2 h-[300px] lg:h-full relative shrink-0">
                <NextImage
                  src={solution.image}
                  alt={solution.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              </div>

              {/* Right Side: Content */}
              <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-panel lg:overflow-y-auto">
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-background border border-black/5 text-foreground font-display text-xl shrink-0">
                    0{idx + 1}
                  </span>
                  <h3 className=" text-foreground text-balance">
                    {solution.title}
                  </h3>
                </div>

                <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed mb-8">
                  {solution.description}
                </p>

                <div>
                  <h4 className="text-sm font-medium tracking-wide text-foreground uppercase mb-4">
                    Key Applications
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                    {solution.applications.map((app, appIdx) => (
                      <li key={appIdx} className="flex items-start gap-2.5 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                        <span className="font-light text-sm md:text-base leading-snug">{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
