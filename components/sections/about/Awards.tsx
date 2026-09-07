"use client";

import React, { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsapSetup";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Trophy } from "lucide-react";

const AWARDS = [
  {
    year: "2026",
    title: "Lutron Hall of Fame",
    organization: "Lutron",
  },
  {
    year: "2024",
    title: "Residential & Hospitality National Business Award",
    organization: "Lutron",
  },
  {
    year: "2023",
    title: "Luxury Residential & Hospitality Business Championship",
    organization: "Lutron",
  },
  {
    year: "2023",
    title: "Authorised Dealer",
    organization: "Control 4",
  },
  {
    year: "2022",
    title: "Luxury Residential Business Championship",
    organization: "Lutron",
  },
  {
    year: "2022",
    title: "Smart Space Award",
    organization: "Smart Space Awards",
  },
  {
    year: "2022",
    title: "Deepest Appreciation",
    organization: "Smart Space Awards",
  },
  {
    year: "2022",
    title: "Authorised Dealer",
    organization: "Crestron",
  },
  {
    year: "2021",
    title: "Luxury Residential Business Championship",
    organization: "Lutron",
  },
  {
    year: "2020",
    title: "Unstoppable Signature Award",
    organization: "Lutron",
  },
  {
    year: "2020",
    title: "Authorised Dealer",
    organization: "Crestron",
  },
  {
    year: "2019",
    title: "Platinum Award",
    organization: "Lutron",
  },
  {
    year: "2018",
    title: "Annual Partner Colloquium Recognition",
    organization: "Lutron",
  },
  {
    year: "2017",
    title: "Top Performer - All India",
    organization: "Lutron",
  },
  {
    year: "2016",
    title: "Top Performer - All India",
    organization: "Lutron",
  },
  {
    year: "2015",
    title: "Top Performer - All India",
    organization: "Lutron",
  },
  {
    year: "Partner",
    title: "Certificate of Authorisation",
    organization: "Samsung",
  },
  {
    year: "Partner",
    title: "Certificate of Authorisation",
    organization: "Sony",
  },
  {
    year: "Partner",
    title: "Financial Control",
    organization: "Jsa Online",
  }
];

export default function Awards() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || !trackRef.current || !sectionRef.current) return;

    if (prefersReducedMotion) return; // Standard static layout for reduced motion

    const trackWidth = trackRef.current.scrollWidth / 2;

    // Reset timeline if exists
    if (tlRef.current) {
      tlRef.current.kill();
    }

    // Set initial position
    gsap.set(trackRef.current, { x: 0 });

    // Create the infinite scroll animation
    tlRef.current = gsap.timeline({ repeat: -1, paused: false })
      .to(trackRef.current, {
        x: -trackWidth,
        duration: 80, // Base duration for smooth scroll (slower)
        ease: 'none',
      });

    // Add scroll velocity boost interaction
    let timeout: ReturnType<typeof setTimeout>;
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        if (!tlRef.current) return;

        // Check scroll velocity and apply mathematical boost to timeScale
        const velocity = Math.abs(self.getVelocity());
        if (velocity > 0) {
          const maxClampSpeed = 2; // Reduced from 3
          const timeScale = 1 + (velocity / 800); // Reduced boost intensity

          // Boost speed
          gsap.to(tlRef.current, {
            timeScale: Math.min(timeScale, maxClampSpeed),
            duration: 0.2,
            ease: 'power2.out'
          });

          // Revert back safely
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            gsap.to(tlRef.current, {
              timeScale: 1,
              duration: 0.8,
              ease: 'power2.out'
            });
          }, 100);
        }
      }
    });

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  const pauseLoop = () => gsap.to(tlRef.current, { timeScale: 0, duration: 0.6, ease: 'power2.out' });
  const playLoop = () => gsap.to(tlRef.current, { timeScale: 1, duration: 0.6, ease: 'power2.out' });

  // Array duplicated specifically to allow standard -50% complete track transformation.
  const LOOPED_AWARDS = [...AWARDS, ...AWARDS];

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 relative bg-background text-foreground overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(229,107,85,0.2) 0%, rgba(0,0,0,0) 70%)' }}
      />

      {/* Noise Texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" aria-hidden="true">
        <filter id="noise-awards"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#noise-awards)" />
      </svg>

      <div className="relative z-10 w-full">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 md:mb-24 px-5 sm:px-8 md:px-16 lg:px-24">
          <span className="block tracking-[0.3em] text-sm md:text-base text-accent font-medium">
            Awards & Certifications
          </span>
          <h2 className="">
            Recognized for Excellence
          </h2>
        </div>

        {/* Ticker Container with fade masks */}
        <div className="relative w-full overflow-hidden">
          {/* Left Mask */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24 bg-background [mask-image:linear-gradient(to_right,black_20%,transparent_100%)] md:w-48 lg:w-64" />
          {/* Right Mask */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24 bg-background [mask-image:linear-gradient(to_left,black_20%,transparent_100%)] md:w-48 lg:w-64" />

          {/* Infinite Track */}
          <div
            className="group/ticker flex w-max pointer-events-auto items-stretch"
            onMouseEnter={pauseLoop}
            onMouseLeave={playLoop}
            ref={trackRef}
          >
            {LOOPED_AWARDS.map((award, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[300px] md:w-[380px] lg:w-[420px] px-3 md:px-4 flex"
              >
                <div className="flex flex-col p-8 rounded-xl bg-black/[0.02] border border-black/5 group/card hover:bg-black/[0.04] transition-colors duration-500 w-full h-full">
                  {/* Top Row: Icon & Year */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent transition-transform duration-500 group-hover/card:scale-110 group-hover/card:bg-accent group-hover/card:text-white">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-serif text-muted-foreground tracking-wider">
                      {award.year}
                    </span>
                  </div>

                  {/* Content */}
                  <h4 className="mb-2 transition-colors duration-300 group-hover/card:text-accent">
                    {award.title}
                  </h4>
                  <div className="text-accent text-sm md:text-base tracking-wide mb-4 mt-auto">
                    {award.organization}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
