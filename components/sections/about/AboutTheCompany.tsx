"use client";

import { useRef } from "react";
import NextImage from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Check } from "lucide-react";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";

const COMPANY_POINTS = [
  "Founded in 2002",
  "Pioneer in smart automation and integrated technology",
  "Expertise across Residential, Hospitality & Commercial automation",
  "End-to-end solutions, from design and engineering to installation and support",
  "Trusted by homeowners, architects, developers, and leading brands",
];

export default function AboutTheCompany() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => scheduleScrollRefresh(),
      }
    });

    tl.fromTo(".atc-eyebrow",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    )
    .fromTo(".atc-heading",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    )
    .fromTo(".atc-point",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(".atc-image-wrapper",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "expo.out" },
      "-=0.8"
    )
    .fromTo(".atc-image",
      { scale: 1.1 },
      { scale: 1, duration: 1.2, ease: "expo.out" },
      "<"
    );

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section 
      ref={sectionRef} 
      className="relative py-24 md:py-40 px-6 sm:px-12 md:px-24 overflow-hidden bg-background"
    >
      {/* Noise Texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none" aria-hidden="true">
        <filter id="noise-atc"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#noise-atc)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left Content */}
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="atc-eyebrow block tracking-[0.3em] uppercase text-sm md:text-base text-accent font-medium opacity-0">
                The Architecture of Living
              </span>
              <div className="atc-line h-[1px] w-12 bg-accent opacity-0 origin-left" />
            </div>
            <h2 className="atc-heading text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide text-foreground opacity-0">
              Building Smarter Spaces.<br />Creating Better Experiences.
            </h2>
          </div>

          <ul className="flex flex-col gap-6 mt-4">
            {COMPANY_POINTS.map((point, idx) => (
              <li key={idx} className="atc-point flex items-start gap-4 opacity-0">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center mt-1">
                  <Check className="w-3.5 h-3.5 text-accent" />
                </div>
                <p className="text-muted font-light text-base md:text-lg leading-relaxed">
                  {point}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Image */}
        <div className="atc-image-wrapper relative w-full aspect-[4/5] lg:aspect-[4/4] rounded-[40px] overflow-hidden shadow-lg shadow-black/5 opacity-0 transform-gpu">
          <div className="absolute inset-0 bg-black/5 z-10" />
          <NextImage
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
            alt="Modern automated office space"
            fill
            className="atc-image object-cover will-change-transform"
            sizes="(max-width: 1024px) 100vw, 50vw"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
