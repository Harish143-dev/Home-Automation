"use client";

import React, { useRef } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { Button } from "../../ui/button";
import { gsap, useGSAP, ScrollTrigger } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

const EXPERIENCE_CENTRES = [
  {
    id: "delhi",
    city: "Delhi Experience Centre",
    description: "Explore integrated automation solutions crafted for luxury residences, hospitality spaces, and commercial environments.",
    features: [
      "Live automation demos",
      "Lighting control scenes",
      "Home theatre experience",
      "Centralized automation systems"
    ],
    ctas: [
      { label: "Book Delhi Visit", action: "#book-delhi", variant: "accent" },
      { label: "Get Directions", action: "#directions-delhi", variant: "outline" }
    ],
    image: "/assets/residential/project/delhi-residence/delhi-residence-1.jpg"
  },
  {
    id: "mumbai",
    city: "Mumbai Experience Centre",
    description: "A luxury automation environment showcasing intelligent living through immersive lighting, AV, security, and comfort experiences.",
    features: [
      "Residential automation experience",
      "Conference room setups",
      "Smart theatre systems",
      "Advanced AV demonstrations",
      "Security & surveillance integration"
    ],
    ctas: [
      { label: "Schedule Mumbai Tour", action: "#book-mumbai", variant: "accent" },
      { label: "View Location", action: "#directions-mumbai", variant: "outline" }
    ],
    image: "/assets/residential/project/mumbai-residence-1/mumbai-residence-1-1.jpg"
  },
  {
    id: "bangalore",
    city: "Bangalore Experience Centre",
    description: "Experience enterprise-grade automation solutions designed for modern homes, hospitality, and smart commercial environments.",
    features: [
      "Smart controls",
      "Integrated systems",
      "Hospitality automation",
      "Commercial automation demos"
    ],
    ctas: [
      { label: "Schedule Bangalore Visit", action: "#book-bangalore", variant: "accent" },
      { label: "Get Directions", action: "#directions-bangalore", variant: "outline" }
    ],
    image: "/assets/residential/project/mumbai-residence-2/mumbai-residence-2-1.jpg"
  }
];

export function ExperienceCentersList() {
  const containerRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!containerRef.current || !pinRef.current || prefersReducedMotion) return;

      const panels = gsap.utils.toArray<HTMLElement>(".center-panel");

      // Initial state: hide panels 2 and 3 below the viewport
      gsap.set(panels.slice(1), { yPercent: 100 });

      // Create a timeline for the scrubbed scroll animations
      const tl = gsap.timeline();

      // Animate Panel 2 sliding up
      tl.to(panels[1], { yPercent: 0, ease: "none" });
      // Animate Panel 3 sliding up
      tl.to(panels[2], { yPercent: 0, ease: "none" });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%", // 2 additional panels = 200% scroll distance
        pin: pinRef.current,
        animation: tl,
        scrub: true,
        anticipatePin: 1
      });

    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      className="py-12 md:py-16 relative w-full bg-background"
      style={{ height: prefersReducedMotion ? 'auto' : '300vh' }}
    >
      <div
        ref={pinRef}
        className={`w-full ${prefersReducedMotion ? 'relative flex flex-col h-auto' : 'h-screen overflow-hidden sticky top-0'}`}
      >
        {EXPERIENCE_CENTRES.map((center, index) => (
          <div
            key={center.id}
            className={`center-panel w-full ${prefersReducedMotion ? 'h-screen relative' : 'absolute inset-0 h-full flex flex-col justify-end'}`}
            style={{ zIndex: index + 1 }}
          >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full z-0">
              <NextImage
                src={center.image}
                alt={center.city}
                fill
                sizes="100vw"
                className="object-cover"
                priority={index === 0} // Only prioritize the first image
              />
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full px-6 sm:px-12 md:px-20 lg:px-32 pb-24 md:pb-32 pt-32 flex flex-col justify-end h-full">

              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <div className="h-[1px] w-8 bg-white/30" />
                <span className="text-[10px] sm:text-xs tracking-[0.3em] text-white/60">
                  Visit Our Experience Centres
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">

                {/* Left: Titles & CTAs */}
                <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
                  <h2 className=" text-white">
                    {center.city}
                  </h2>

                  <p className="text-base md:text-lg font-light tracking-wide text-white/80 leading-relaxed max-w-xl text-balance">
                    {center.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Link href={center.ctas[0].action}>
                      <Button variant="interactive" size="lg" className="w-full sm:w-auto">
                        {center.ctas[0].label}
                      </Button>
                    </Link>
                    <Link href={center.ctas[1].action}>
                      <Button variant="outline" size="lg" className="w-full sm:w-auto">
                        {center.ctas[1].label}
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right: Feature Pills */}
                <div className="lg:col-span-5 flex flex-wrap gap-3 items-end lg:justify-end">
                  {center.features.map((feature, fIndex) => (
                    <div
                      key={fIndex}
                      className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs md:text-sm text-white font-medium tracking-wide"
                    >
                      {feature}
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
