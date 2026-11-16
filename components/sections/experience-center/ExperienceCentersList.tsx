"use client";

import React, { useRef } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { Button } from "../../ui/button";
import { gsap, useGSAP, ScrollTrigger } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

const SCHEDULE_FORM_URL = "https://script.google.com/a/macros/anushagroup.com/s/AKfycbxva-0PxHEmyVBik8AIc7MN4Hoi6khCnWxYv6ZjJ-r1e6d1pknOy8gCgbcIs-vmtkkw/exec";

const EXPERIENCE_CENTRES = [
  {
    id: "delhi",
    eyebrow: "Visit Our Experience Centre",
    city: "Delhi Experience Centre",
    description: "A home in New Delhi, laid out to be lived in. Walk from the living room and bar to the dining table and bedroom, and watch light, climate, curtains and sound respond to each part of the day.",
    features: [
      "Lounge",
      "Living & Bar",
      "Dining",
      "Bedroom"
    ],
    ctas: [
      { label: "Schedule a Visit", action: SCHEDULE_FORM_URL, external: true, variant: "interactive" },
      { label: "Get Directions", action: "https://maps.google.com/maps?q=D20,+Block+D,+Jangpura,+New+Delhi,+Delhi+110014", external: true, variant: "outline" }
    ],
    image: "/assets/residential/delhi.webp"
  },
  {
    id: "mumbai",
    eyebrow: "Visit Our Experience Centre",
    city: "Mumbai Experience Centre",
    description: "A two-storey home in Worli, set up for entertaining. Walk through the living and dining areas to the home theatre and bedroom, and see light, climate, curtains and sound work together.",
    features: [
      "Lounge",
      "Living & Dining",
      "Home Theatre",
      "Bedroom"
    ],
    ctas: [
      { label: "Schedule a Visit", action: SCHEDULE_FORM_URL, external: true, variant: "interactive" },
      { label: "View Location", action: "https://www.google.com/maps?rlz=1C5CHFA_enIN1106IN1107&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJCAEQIRgKGKABMgkIAhAhGAoYoAEyCQgDECEYChigAdIBCDc2MjhqMGo3qAIAsAIA&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=Kd3I1msJyec7MawqPHig3y7m&daddr=10/76,+Apte+properties,+Ground+floor+Parijat+house,+LR+Papan+Marg,+off+Doctor+Elijah+Moses+Road,+Worli,+Mumbai,+Maharashtra+400018", external: true, variant: "outline" }
    ],
    image: "/assets/residential/hydrabhad.webp"
  },
  {
    id: "bangalore",
    eyebrow: "Visit Our Experience Centre",
    city: "Bangalore Experience Centre",
    description: "A home in Bangalore that opens onto a patio. Walk from the lounge and living room to the dining table and out to the patio, then hear the difference in the sound room.",
    features: [
      "Lounge & Living",
      "Dining",
      "Patio",
      "Sound Room"
    ],
    ctas: [
      { label: "Schedule a Visit", action: SCHEDULE_FORM_URL, external: true, variant: "interactive" },
      { label: "Get Directions", action: "https://www.google.com/maps/place/12%C2%B055'43.2%22N+77%C2%B032'41.9%22E/@12.928667,77.5424001,17z/data=!3m1!4b1!4m4!3m3!8m2!3d12.928667!4d77.544975?coh=277535&entry=tts&g_ep=EgoyMDI1MTExNy4wIMuAESoASAFQAw%3D%3D&skid=35e24f7f-6c25-4e11-acde-9f3b7bd811ba", external: true, variant: "outline" }
    ],
    image: "/assets/residential/banglore.webp"
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
        end: "+=200%",
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
      className="relative w-full bg-background"
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
                priority={index === 0}
              />
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full px-6 sm:px-12 md:px-20 lg:px-32 pb-24 md:pb-32 pt-32 flex flex-col justify-end h-full">

              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-xs sm:text-sm tracking-wider text-white/80 font-medium">
                  {center.eyebrow}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">

                {/* Left: Titles & CTAs */}
                <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
                  <h2 className="text-white text-balance">
                    {center.city}
                  </h2>

                  <p className="text-base md:text-lg font-light tracking-wide text-white/80 leading-relaxed max-w-xl text-balance">
                    {center.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Link
                      href={center.ctas[0].action}
                      target={center.ctas[0].external ? "_blank" : undefined}
                      rel={center.ctas[0].external ? "noopener noreferrer" : undefined}
                    >
                      <Button variant="interactive" size="lg" className="w-full sm:w-auto">
                        {center.ctas[0].label}
                      </Button>
                    </Link>
                    <Link
                      href={center.ctas[1].action}
                      target={center.ctas[1].external ? "_blank" : undefined}
                      rel={center.ctas[1].external ? "noopener noreferrer" : undefined}
                    >
                      <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10 hover:text-white">
                        {center.ctas[1].label}
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right: Room Feature Pills */}
                <div className="lg:col-span-5 flex flex-wrap gap-2.5 sm:gap-3 items-end lg:justify-end">
                  {center.features.map((feature, fIndex) => (
                    <div
                      key={fIndex}
                      className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm text-white font-medium tracking-wide shadow-sm"
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
