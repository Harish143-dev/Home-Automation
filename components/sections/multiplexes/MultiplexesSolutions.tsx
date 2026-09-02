'use client';

import React, { useRef } from 'react';
import NextImage from 'next/image';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const SOLUTIONS = [
  {
    id: "entrance",
    title: "Entrance & Lobby",
    description: "Create a strong first impression with dynamic lighting, digital displays, audio, and integrated control that enhance the arrival experience.",
    image: "https://images.unsplash.com/photo-1542484439-d3db09ec3551?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "auditoriums",
    title: "Cinema Auditoriums",
    description: "Support immersive cinema environments with integrated AV, audio, lighting, and control systems designed for a consistent and engaging experience.",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "corridors",
    title: "Corridors & Common Areas",
    description: "Create a seamless environment across circulation areas with intelligent lighting, distributed audio, security, and integrated control solutions.",
    image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "concession",
    title: "Concession & Dining Areas",
    description: "Create comfortable and engaging customer environments through integrated lighting and audio solutions tailored to high-traffic spaces.",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "lounges",
    title: "VIP & Premium Lounges",
    description: "Deliver elevated experiences with premium AV, sophisticated lighting, motorized shading, and intuitive automation.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "back-of-house",
    title: "Back-of-House",
    description: "Support operational efficiency with reliable networking, security, access control, and technology infrastructure designed for commercial environments.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop",
  }
];

export function MultiplexesSolutions() {
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
            Intelligent Solutions Across Every Multiplex Space
          </h2>
          <p className="text-muted-foreground font-light text-lg md:text-xl text-balance">
            From public areas and auditoriums to premium lounges and back-of-house operations, Anusha delivers integrated technology solutions tailored to the specific requirements of every space within your multiplex.
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
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

