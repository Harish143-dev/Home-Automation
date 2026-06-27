"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { EASE, DURATION, STAGGER } from "../../../lib/animation.config";
import { scheduleScrollRefresh } from "../../../lib/scrollRefresh";
import { Sun, Film, Utensils, ShieldCheck, BookOpen, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SCENES = [
  {
    icon: Sun,
    title: "Morning Routine",
    description: "Soft lighting that gradually brightens to wake you naturally."
  },
  {
    icon: Film,
    title: "Movie Night",
    description: "Dim lights automatically for the perfect cinema experience."
  },
  {
    icon: Utensils,
    title: "Dinner Ambience",
    description: "Warm lighting scenes for memorable family dinners."
  },
  {
    icon: ShieldCheck,
    title: "Away Mode",
    description: "Automatically turn lights on and off to simulate occupancy."
  },
  {
    icon: BookOpen,
    title: "Reading Mode",
    description: "Focused lighting for comfort and reduced eye strain."
  },
  {
    icon: Sparkles,
    title: "Party Mode",
    description: "One-touch lighting scenes for entertaining guests."
  }
];

export default function LightingScenes() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        onRefresh: () => scheduleScrollRefresh(),
      }
    });

    // Stagger Header
    const headerEls = gsap.utils.toArray(".ls-header-el", headerRef.current);
    tl.fromTo(headerEls,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DURATION.normal,
        stagger: STAGGER.reveal,
        ease: EASE.reveal
      }
    );

    // Stagger Cards
    const cards = gsap.utils.toArray(".ls-card", gridRef.current);
    tl.fromTo(cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DURATION.normal,
        stagger: STAGGER.reveal,
        ease: EASE.reveal
      },
      "-=0.4"
    );

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      id="lighting-scenes"
      className="relative w-full overflow-hidden bg-background pt-8 md:pt-12 pb-24 md:pb-32 text-foreground select-none"
    >
      {/* Subtle Noise Texture Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none" aria-hidden="true">
        <filter id="noise-scenes">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-scenes)" />
      </svg>

      <div className="relative z-10 w-full px-6 sm:px-12 md:px-20 lg:px-24 max-w-7xl mx-auto flex flex-col items-center">
        {/* Header Section */}
        <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-16 flex flex-col items-center">
          <span className="ls-header-el inline-block text-sm md:text-base tracking-[0.3em] text-accent mb-4 font-light">
            Personalized Scenes
          </span>
          <h2 className="ls-header-el text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide text-foreground mb-6">
            Intelligent Control for Every Moment
          </h2>
          <p className="ls-header-el text-sm sm:text-base md:text-lg text-muted font-light leading-relaxed max-w-2xl mx-auto">
            Whether you&apos;re entertaining guests, relaxing after work, or enjoying a movie night, create the perfect atmosphere with personalized lighting scenes.
          </p>
        </div>

        {/* Scenes Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full"
        >
          {SCENES.map((scene, idx) => (
            <div
              key={idx}
              className="ls-card group relative bg-panel rounded-2xl p-8 border border-border shadow-sm hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              {/* Subtle accent gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-background flex items-center justify-center border border-border mb-8 group-hover:scale-110 transition-transform duration-500 ease-out">
                  <scene.icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl md:text-2xl font-light tracking-wide text-foreground mb-4">
                  {scene.title}
                </h3>
                <p className="text-sm md:text-base text-muted font-light leading-relaxed">
                  {scene.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
