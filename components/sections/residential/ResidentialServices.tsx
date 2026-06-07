"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

const SERVICES_DATA = [
  {
    id: "lighting",
    title: "Lighting",
    features: [
      "Mood-based lighting scenes",
      "Energy-efficient automation",
      "Day & night scheduling",
      "Security alert lighting response",
      "Motion & occupancy sensors",
      "Time-based scheduling",
      "Scene-based keypad control",
      "Audio video control"
    ],
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "audio-video",
    title: "Audio video control",
    features: [
      "Multi-room audio",
      "Seamless streaming",
      "Centralized AV control",
      "Whole-home media access",
      "Premium sound quality",
      "Multi-room audio playback",
      "Landscape outdoor areas",
      "Home theatre"
    ],
    image: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "security",
    title: "Security",
    features: [
      "Surveillance systems for real-time monitoring",
      "Access control systems",
      "Remote alerts & monitoring",
      "Video door phone integration",
      "Biometric smart locks",
      "Alarm intrusion detection",
      "Glass break detection sensors"
    ],
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "shades",
    title: "Shades",
    features: [
      "Automated blinds & curtains",
      "Light control based on time & sunlight",
      "Privacy control with one-touch or scene-based operation"
    ],
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "hvac",
    title: "HVAC",
    features: [
      "Smart temperature control",
      "Automated climate adjustment based on occupancy",
      "Energy-optimized operation for reduced consumption"
    ],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "amc",
    title: "AMC",
    features: [
      "Smart temperature control",
      "24x7 assistance"
    ],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop"
  }
];

export function ResidentialServices() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLUListElement>(null);
  const centerImageRef = useRef<HTMLImageElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Handle Scroll Pinning and Index Updating
  useGSAP(() => {
    if (!triggerRef.current || !containerRef.current || prefersReducedMotion) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        // Total scroll distance = 100vh per item
        end: `+=${SERVICES_DATA.length * 100}%`,
        pin: containerRef.current,
        scrub: true,
        onUpdate: (self) => {
          // Calculate which item should be active based on scroll progress (0 to 1)
          const progress = self.progress;
          // Map progress strictly to the available indices
          const index = Math.min(
            SERVICES_DATA.length - 1,
            Math.floor(progress * SERVICES_DATA.length)
          );
          setActiveIndex(index);
        }
      });
    });

    return () => mm.revert();
  }, { scope: triggerRef, dependencies: [prefersReducedMotion] });

  // Handle crossfade animations when activeIndex changes
  useGSAP(() => {
    if (prefersReducedMotion) return;

    // Animate the right-side text items staggering in
    if (rightContentRef.current) {
      const items = rightContentRef.current.querySelectorAll('.feature-item');
      gsap.fromTo(
        items,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out", overwrite: true }
      );
    }

    // Animate the image swapping with a quick fade
    if (centerImageRef.current) {
      gsap.fromTo(
        centerImageRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out", overwrite: true }
      );
    }

  }, { dependencies: [activeIndex, prefersReducedMotion] });

  const handleNavClick = (index: number) => {
    // If not using ScrollTrigger (e.g., on mobile where we might disable pinning), just set state
    if (!triggerRef.current) return;

    // Calculate the precise scroll position for this index
    // The total scroll distance is SERVICES_DATA.length * viewport height
    const st = ScrollTrigger.getAll().find(t => t.vars.trigger === triggerRef.current);
    if (st) {
      const start = st.start;
      const end = st.end;
      const distance = end - start;
      const scrollPos = start + (distance / SERVICES_DATA.length) * index + 10; // +10 buffer to ensure it locks into the right bucket

      window.scrollTo({
        top: scrollPos,
        behavior: 'smooth'
      });
    } else {
      // Fallback if ScrollTrigger isn't active
      setActiveIndex(index);
    }
  };

  const activeData = SERVICES_DATA[activeIndex];

  return (
    <section ref={triggerRef} className="relative w-full bg-background text-foreground">
      {/* 
        This is the container that gets pinned.
        It takes exactly 100vh so it fills the screen perfectly while pinned.
      */}
      <div
        ref={containerRef}
        className="w-full min-h-[100dvh] md:h-[100dvh] flex flex-col md:flex-row items-center justify-center px-6 sm:px-12 md:px-16 lg:px-24 py-20"
      >
        <div className="w-full max-w-[1400px] mx-auto h-full grid grid-cols-1 md:grid-cols-[1fr_35%_1fr] lg:grid-cols-[1fr_33%_1fr] gap-8 lg:gap-16 items-center">

          {/* LEFT: Navigation List */}
          <div className="w-full h-full flex flex-col justify-center md:items-end min-w-0">
            <div className="flex flex-col items-start w-full md:w-fit">
              <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-muted mb-8 md:mb-12">
                Our Solutions
              </h2>
              <ul className="flex flex-row md:flex-col gap-5 md:gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide w-full">
                {SERVICES_DATA.map((service, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <li key={service.id}>
                      <button
                        onClick={() => handleNavClick(idx)}
                        className={`group flex items-center gap-4 text-left transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                      >
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isActive ? 'bg-accent scale-100' : 'bg-transparent scale-0'}`} />
                        <span className={`text-base md:text-lg lg:text-xl font-light tracking-wide transition-all duration-300 ${isActive ? 'font-medium translate-x-1 text-foreground' : 'text-foreground'}`}>
                          {service.title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* CENTER: Visual Image */}
          <div className="w-full h-[40vh] md:h-[60vh] lg:h-[70vh] relative rounded-3xl overflow-hidden shadow-2xl">
            {/* Using standard img to support external Unsplash URLs without next.config changes */}
            <img
              key={`image-${activeIndex}`} // Force re-render for animation
              ref={centerImageRef}
              src={activeData.image}
              alt={activeData.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Elegant inner shadow/overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
          </div>

          {/* RIGHT: Content Details */}
          <div className="w-full h-full flex flex-col justify-center md:items-start min-w-0">
            <div className="flex flex-col items-start w-full md:max-w-[320px] lg:max-w-[400px]">
              <h3 className="text-2xl lg:text-3xl font-light tracking-wide mb-8 text-foreground">
                {activeData.title}
              </h3>

              <ul
                key={`content-${activeIndex}`} // Force re-render for stagger animation
                ref={rightContentRef}
                className="flex flex-col gap-3"
              >
                {activeData.features.map((feature, i) => (
                  <li key={i} className="feature-item flex items-start gap-3">
                    <span className="text-accent mt-1 opacity-70">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <span className="text-sm md:text-base font-light tracking-wide text-foreground/80 leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Optional text or logos can go below */}
              <div className="mt-6 pt-6 border-t border-border/10 feature-item w-full">
                <p className="text-xs text-muted font-light leading-relaxed">
                  Our bespoke {activeData.title.toLowerCase()} solutions integrate seamlessly into your daily rhythm, offering uncompromising luxury and absolute control.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
