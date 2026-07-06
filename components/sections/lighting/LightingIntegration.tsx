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
    description: "Create the perfect atmosphere in every room with intelligent lighting scenes, precision dimming, automated schedules, occupancy sensing, and effortless one-touch control that complements the way you live.",
    image: "https://images.unsplash.com/photo-1565538810844-1e1194826c91?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "blind-control",
    title: "Blind Control",
    description: "Motorized blinds and curtains adjust automatically throughout the day to maximize natural light, minimize glare, enhance privacy, and maintain a comfortable indoor environment.",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "temperature-control",
    title: "Temperature Control",
    description: "Integrate climate control with lighting and occupancy settings to maintain consistent indoor comfort while improving overall system efficiency.",
    image: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "energy-control",
    title: "Energy Control",
    description: "Optimize energy performance through intelligent scheduling, occupancy sensing, daylight-responsive automation, and customized scene control helping reduce energy use while maintaining exceptional comfort.",
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
      className="relative w-full py-10 sm:py-12 md:py-16 bg-background text-foreground overflow-hidden select-none"
    >
      {/* Subtle Noise Texture Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none" aria-hidden="true">
        <filter id="noise-integration">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-integration)" />
      </svg>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-24">
        {/* Header Section with Slider Controls */}
        <div ref={headerRef} className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="li-header-el inline-block text-sm md:text-base tracking-[0.3em] text-accent mb-4 font-light">
              Integration
            </span>
            <h2 className="li-header-el text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide text-foreground mb-6 text-balance">
              One Intelligent System. Complete Home Control.
            </h2>
            <p className="li-header-el text-sm sm:text-base md:text-lg text-muted font-light leading-relaxed mt-4">
              Bring every smart home function together on a single platform. Control lighting, motorized shades, climate, and energy management through elegant keypads, mobile apps, voice commands, or personalized automation scenes.
            </p>
          </div>

          {/* Desktop Navigation Buttons */}
          <div className="li-header-el hidden md:flex items-center gap-4 shrink-0 pb-2">
            <button 
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-black/5 transition-all duration-300 shadow-sm bg-panel"
              aria-label="Previous Integration"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-black/5 transition-all duration-300 shadow-sm bg-panel"
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
              className="li-card snap-start group relative bg-panel rounded-2xl border border-border transition-all duration-500 flex flex-col w-[85vw] sm:w-[320px] md:w-[380px] shrink-0 min-h-[440px] hover:shadow-xl hover:-translate-y-1 overflow-hidden"
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
              </div>

              {/* Feature Text Content */}
              <div className="p-8 flex flex-col flex-grow relative z-10">
                <h3 className="text-xl md:text-2xl font-light tracking-wide text-foreground mb-4">
                  {feat.title}
                </h3>
                <p className="text-sm md:text-base text-muted font-light leading-relaxed">
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
          className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-black/5 transition-all duration-300 shadow-sm bg-panel"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={scrollNext}
          className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-black/5 transition-all duration-300 shadow-sm bg-panel"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
