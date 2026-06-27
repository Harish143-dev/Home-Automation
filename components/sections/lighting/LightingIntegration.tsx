"use client";

import { useRef } from "react";
import NextImage from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { EASE, DURATION, STAGGER } from "../../../lib/animation.config";
import { scheduleScrollRefresh } from "../../../lib/scrollRefresh";
import { ChevronLeft, ChevronRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INTEGRATIONS = [
  {
    id: "light-control",
    title: "Light Control",
    description: "Create the right mood for every activity with personalized lighting scenes, scheduling, dimming, and one-touch control.",
    image: "https://images.unsplash.com/photo-1565538810844-1e1194826c91?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "blind-control",
    title: "Blind Control",
    description: "Automate blinds to maximize natural daylight, reduce glare, and improve privacy while preserving outdoor views.",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "temperature-control",
    title: "Temperature Control",
    description: "Control HVAC systems alongside lighting to maintain ideal indoor comfort throughout the day.",
    image: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "energy-control",
    title: "Energy Control",
    description: "Automatically optimize lighting usage to reduce energy consumption without compromising comfort.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop"
  }
];

export default function LightingIntegration() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current || !listRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        onRefresh: () => scheduleScrollRefresh(),
      }
    });

    // Stagger Header
    const headerEls = gsap.utils.toArray(".li-header-el", headerRef.current);
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

    // Stagger Integration Cards
    const cards = gsap.utils.toArray(".li-card", listRef.current);
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

  const scrollNext = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="lighting-integration"
      className="relative w-full py-20 sm:py-24 md:py-32 bg-[#0a0a0a] text-white overflow-hidden select-none"
    >
      {/* Dark Section Tactile Noise Texture Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" aria-hidden="true">
        <filter id="noise-integration">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-integration)" />
      </svg>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-24">
        {/* Header Section with Slider Controls */}
        <div ref={headerRef} className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="li-header-el inline-block text-sm md:text-base tracking-[0.3em] text-white/50 mb-4 font-light">
              Integration
            </span>
            <h2 className="li-header-el text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide text-white mb-6 text-balance">
              One Intelligent System. Complete Home Control.
            </h2>
            <p className="li-header-el text-sm sm:text-base md:text-lg text-white/70 font-light leading-relaxed mt-4">
              Our lighting automation seamlessly integrates with other smart home systems, creating a connected and intuitive living experience.
            </p>
          </div>

          {/* Desktop Navigation Buttons */}
          <div className="li-header-el hidden md:flex items-center gap-4 shrink-0 pb-2">
            <button 
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-sm bg-white/5"
              aria-label="Previous Integration"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-sm bg-white/5"
              aria-label="Next Integration"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Slider Track Wrapper */}
      <div className="w-full relative pl-6 sm:pl-12 md:pl-20 lg:pl-24 xl:pl-[calc(50vw-36rem)]">
        <div 
          ref={listRef}
          className="flex gap-6 md:gap-8 w-full overflow-x-auto snap-x snap-mandatory pb-8 pr-6 sm:pr-12 md:pr-20 lg:pr-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {INTEGRATIONS.map((feat) => (
            <div 
              key={feat.id}
              className="li-card snap-start group relative bg-white/5 rounded-2xl border border-white/10 transition-all duration-500 flex flex-col w-[85vw] sm:w-[320px] md:w-[380px] shrink-0 min-h-[440px] hover:bg-white/[0.08] hover:border-white/15 overflow-hidden"
            >
              {/* Feature Image */}
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <NextImage
                  src={feat.image}
                  alt={feat.title}
                  fill
                  sizes="(max-width: 768px) 85vw, 380px"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Feature Text Content */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl md:text-2xl font-light tracking-wide text-white mb-4">
                  {feat.title}
                </h3>
                <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Controls */}
      <div className="flex md:hidden items-center justify-center gap-4 mt-6 px-6">
        <button 
          onClick={scrollPrev}
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-sm bg-white/5"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={scrollNext}
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-sm bg-white/5"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
