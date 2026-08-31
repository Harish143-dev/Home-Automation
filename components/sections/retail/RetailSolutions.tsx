'use client';

import React, { useRef } from 'react';
import NextImage from 'next/image';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const SOLUTIONS = [
  {
    id: "lighting",
    title: "Lighting Management Systems",
    description: "Create dynamic lighting environments that highlight products, guide customer attention, and maintain the right ambience throughout the day.",
    applications: [
      "Product & display lighting",
      "Window displays",
      "Sales floor",
      "Fitting rooms",
      "Checkout & customer areas",
      "Store opening/closing schedules"
    ],
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "audio",
    title: "Audio Distribution Systems",
    description: "Deliver consistent, high-quality audio throughout your store while managing different zones from a centralized interface.",
    applications: [
      "Sales floor",
      "Brand & promotional zones",
      "Fitting rooms",
      "Entrance areas",
      "Customer waiting areas",
      "Multiple audio zones"
    ],
    image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "displays",
    title: "LED Video Walls & Digital Displays",
    description: "Create immersive visual experiences that capture attention and strengthen your brand presence.",
    applications: [
      "Storefront displays",
      "Entrance & reception areas",
      "Product showcases",
      "Promotional displays",
      "Brand storytelling",
      "Campaign & digital signage"
    ],
    image: "https://images.unsplash.com/photo-1542484439-d3db09ec3551?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "hvac",
    title: "HVAC & Climate Control",
    description: "Maintain comfortable store environments while intelligently managing energy consumption.",
    applications: [
      "Sales floor",
      "Fitting rooms",
      "Customer areas",
      "Back-of-house spaces",
      "Operating-hour schedules",
      "Occupancy-based control"
    ],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "security",
    title: "Integrated Security",
    description: "Protect your customers, staff, and premises through integrated security infrastructure.",
    applications: [
      "Store entrances & exits",
      "Sales floor monitoring",
      "Cash counter areas",
      "Stockrooms",
      "Back-of-house areas",
      "CCTV monitoring"
    ],
    image: "https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "network",
    title: "Networking Infrastructure",
    description: "Build the reliable connectivity required for your store’s automation, security, AV, and digital systems.",
    applications: [
      "POS systems",
      "Wi-Fi connectivity",
      "CCTV & security",
      "Digital displays",
      "AV systems",
      "Automation devices"
    ],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "control",
    title: "Centralized Control",
    description: "Bring multiple store systems together through intuitive centralized interfaces for simplified management.",
    applications: [
      "Lighting & scene control",
      "Audio zone management",
      "Display management",
      "HVAC control",
      "Store-wide system monitoring",
      "Scheduled automation"
    ],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop",
  }
];

export function RetailSolutions() {
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
            Retail Automation Solutions Built Around Your Store
          </h2>
          <p className="text-muted-foreground font-light text-lg md:text-xl text-balance">
            From customer-facing experiences to behind-the-scenes operations, we integrate technology to make every part of your retail environment smarter and more efficient.
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
                    Applications
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
