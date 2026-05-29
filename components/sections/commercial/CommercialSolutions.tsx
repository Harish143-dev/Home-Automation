"use client";

import React, { useRef } from "react";
import NextImage from "next/image";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

const SYSTEMS_DATA = [
  {
    title: "Stand Alone Systems",
    description: "Independent automation systems designed for localized control and operational simplicity.",
    image: "/images/commercial_solution_standalone.png",
    idealFor: ["Small offices", "Retail stores", "Individual conference rooms", "Boutique hospitality spaces"],
    features: ["Easy deployment", "Cost-effective automation", "Independent room control", "Minimal infrastructure dependency"],
    benefits: ["Faster implementation", "Scalable by zone", "Lower maintenance complexity"],
    ctaText: "Explore Stand Alone Solutions"
  },
  {
    title: "Centralised Server Systems",
    description: "Enterprise-grade centralized automation systems offering unified control, monitoring, and scalability across large environments.",
    image: "/images/commercial_solution_centralised.png",
    idealFor: ["Large commercial buildings", "Hotels", "Multi-floor offices", "Enterprise environments"],
    features: ["Centralized monitoring", "Remote management", "Multi-zone integration", "Advanced reporting & analytics"],
    benefits: ["Operational efficiency", "Enhanced energy management", "Enterprise-level scalability", "Unified infrastructure control"],
    ctaText: "Explore Centralized Systems"
  }
];

export function CommercialSolutions() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const slides = gsap.utils.toArray(".solution-slide") as HTMLElement[];
    if (slides.length < 2) return;

    const slide1Img = slides[1].querySelector(".bg-image");
    const slide1Content = slides[1].querySelector(".slide-content");

    // Set initial states for slide-up effect
    gsap.set(slides[1], { yPercent: 100 });

    // Slight initial parallax for the image and content
    if (slide1Img) gsap.set(slide1Img, { scale: 1.15 });
    if (slide1Content) gsap.set(slide1Content, { y: 60, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%", // Scroll distance
        pin: true,
        scrub: 1.2, // Smooth scrubbing
      }
    });

    // 1. Slide 0 shrinks back gracefully
    tl.to(slides[0], {
      scale: 0.92,
      opacity: 0.3,
      ease: "none"
    }, 0)
      // 2. Slide 1 slides up physically
      .to(slides[1], {
        yPercent: 0,
        ease: "none"
      }, 0)
      // 3. Slide 1's background image slowly settles (parallax zoom out)
      .to(slide1Img, {
        scale: 1,
        ease: "none"
      }, 0)
      // 4. Slide 1's content floats up gracefully
      .to(slide1Content, {
        y: 0,
        opacity: 1,
        ease: "power2.out"
      }, 0.1);

  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section
      ref={containerRef}
      id="commercial-solutions"
      className="relative w-full h-[100dvh] bg-black overflow-hidden select-none"
    >
      {SYSTEMS_DATA.map((system, index) => (
        <div
          key={index}
          className={`solution-slide absolute inset-0 w-full h-full bg-black ${index === 0 ? 'z-10' : 'z-20'}`}
        >
          {/* Background Image */}
          <div className="bg-image absolute inset-0 w-full h-full z-0 pointer-events-none">
            <NextImage
              src={system.image}
              alt={system.title}
              fill
              priority={index === 0}
              className="object-cover"
            />
            {/* Cinematic dark gradients anchored at the bottom for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-100 z-[1]" />
            <div className="absolute inset-0 bg-black/20 z-[2]" />
          </div>

          {/* Content Wrapper - Aligned strictly to the bottom */}
          <div className="slide-content absolute bottom-0 left-0 w-full z-10 px-6 sm:px-12 md:px-20 lg:px-32 pb-8 sm:pb-12 md:pb-16">
            <div className="max-w-[1440px] mx-auto flex flex-col gap-6 md:gap-8">

              {/* Header */}
              <div className="max-w-4xl">
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <div className="h-[1px] w-6 bg-white/30" />
                  <span className="font-mono tracking-[0.3em] uppercase text-white/60">
                    {index === 0 ? "Localized Control" : "Unified Infrastructure"}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-[1.2] text-white mb-3 md:mb-4">
                  {system.title}
                </h2>

                <p className="text-sm sm:text-base md:text-lg lg:text-[21px] font-light leading-relaxed tracking-wide text-white/70 max-w-2xl">
                  {system.description}
                </p>
              </div>

              {/* Data Grid (Pills) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl border-t border-white/10 pt-5 md:pt-6">

                {/* Ideal For */}
                <div className="flex flex-col gap-3">
                  <span className="font-mono tracking-[0.3em] uppercase text-white/40">
                    Ideal For
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {system.idealFor.map((item, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] md:text-xs text-white/80 whitespace-nowrap">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div className="flex flex-col gap-3">
                  <span className="font-mono tracking-[0.3em] uppercase text-white/40">
                    Key Features
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {system.features.map((item, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-[11px] md:text-xs text-white/90 whitespace-nowrap shadow-[0_0_10px_rgba(140,24,23,0.05)]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div className="flex flex-col gap-3">
                  <span className="font-mono tracking-[0.3em] uppercase text-white/40">
                    Benefits
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {system.benefits.map((item, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] md:text-xs text-white/80 whitespace-nowrap">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* CTA */}
              <div className="mt-2 flex items-center group cursor-pointer w-fit">
                <span className="text-xs md:text-sm font-medium tracking-wide text-white group-hover:text-accent transition-colors duration-300">
                  {system.ctaText}
                </span>
                <div className="ml-3 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent transition-colors duration-300 border border-white/10 group-hover:border-transparent">
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-300 ease-out" />
                </div>
              </div>

            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
