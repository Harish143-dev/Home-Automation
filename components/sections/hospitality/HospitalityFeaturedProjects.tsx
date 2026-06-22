"use client";

import React, { useRef } from "react";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { SCROLL, EASE, DURATION, STAGGER } from "../../../lib/animation.config";
import { scheduleScrollRefresh } from "../../../lib/scrollRefresh";

interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    id: "p1",
    name: "Common Spaces & Public Areas",
    description: "Managing expansive architectural volumes through automated daylight harvesting and astrological scheduling. Public areas smoothly adjust light levels and acoustic layers in response to shifting solar tracks and foot-traffic density, minimizing operational strain while ensuring an uncompromised sensory welcoming sequence.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "p2",
    name: "Boardrooms & Meeting Rooms",
    description: "Eliminating administrative setup delays with integrated, unified control backbones. One-touch command matrices instantly lower presentation shading, configure sound-masking profiles, and launch zero-latency wireless collaboration layers, protecting corporate guest productivity and corporate event revenue streams.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "p3",
    name: "Banquet Halls & Event Spaces",
    description: "Engineered to transition effortlessly from high-brightness corporate keynotes to dramatic, low-light evening gala events. High-power zoning interfaces manage intricate lighting networks, motorized partition-tracking logic, and heavy climate loads proactively as occupancy density shifts in real-time.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "p4",
    name: "Restaurants & Dining Spaces",
    description: "Elevating the hospitality experience by manipulating spatial perception. Lighting and audio elements adapt to the mood, time of day, and specific service windows through smooth, imperceptible transitions, sculpting culinary atmospheres that naturally maximize table turn rates and guest spend.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "p5",
    name: "Spa & Wellness Areas",
    description: "Designing environments that actively reduce physical stress and complement restorative treatments. By locking tunable white lighting profiles to organic circadian patterns, purifying micro-climates, and isolating acoustics, these spaces deliver unparalleled sensory choice and cognitive comfort.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "p6",
    name: "Guest Rooms",
    description: "Evolving the stay experience through intelligent sleep science. Non-intrusive sensor matrices and magnetic contact points execute silent, invisible climate and shading setups that align with the guest's circadian rhythms, guaranteeing unparalleled sleep consistency while capturing 5% to 15% energy reductions.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200"
  }
];

export function HospitalityFeaturedProjects() {
  const containerRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const { isMobile, isReady } = useBreakpoint();
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!isReady || isMobile || prefersReducedMotion) return;
      if (!containerRef.current || !pinRef.current) return;

      const images = gsap.utils.toArray(".fp-image", containerRef.current) as HTMLDivElement[];
      const contents = gsap.utils.toArray(".fp-content", containerRef.current) as HTMLDivElement[];

      if (images.length === 0 || contents.length === 0) return;

      // Initial States
      gsap.set(images, { clipPath: "inset(100% 0% 0% 0%)", scale: 1.08 });
      gsap.set(images[0], { clipPath: "inset(0% 0% 0% 0%)", scale: 1 });

      gsap.set(contents, { opacity: 0, y: 40, pointerEvents: "none" });
      gsap.set(contents[0], { opacity: 1, y: 0, pointerEvents: "auto" });

      contents.forEach((content, idx) => {
        const els = content.querySelectorAll(".fp-stagger");
        gsap.set(els, idx === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: `+=${PROJECTS.length * 250}vh`, 
          pin: true,
          scrub: SCROLL.scrub,
          anticipatePin: SCROLL.anticipatePin,
          invalidateOnRefresh: true,
        }
      });

      PROJECTS.forEach((_, i) => {
        if (i === 0) {
          tl.to(images[0], { scale: 1.035, duration: 1.3, ease: EASE.none }, 0);
          return;
        }

        const t = (i * 2) - 0.5;

        // Image wipe transition
        tl.to(images[i - 1], { scale: 1.05, duration: DURATION.reveal, ease: EASE.none }, t);
        tl.to(images[i], { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: DURATION.reveal, ease: EASE.smooth }, t);

        // Ken Burns
        const readStart = t + 1;
        const readDuration = i < PROJECTS.length - 1 ? 0.9 : 1.3;
        tl.to(images[i], { scale: 1.035, duration: readDuration, ease: EASE.none }, readStart);

        // Content transition
        tl.to(contents[i - 1], { opacity: 0, y: -30, pointerEvents: "none", duration: DURATION.fast }, t);
        tl.to(contents[i], { opacity: 1, y: 0, pointerEvents: "auto", duration: DURATION.medium, ease: EASE.reveal }, t + 0.5);

        // Staggered text
        const staggerEls = contents[i].querySelectorAll(".fp-stagger");
        if (staggerEls.length > 0) {
          tl.to(staggerEls, { opacity: 1, y: 0, duration: DURATION.fast, stagger: STAGGER.reveal, ease: EASE.reveal }, t + 0.5);
        }

        // Active Line loading animation
        tl.to(lineRef.current, { height: `${(i / (PROJECTS.length - 1)) * 100}%`, duration: DURATION.medium }, t);
      });

      tl.to({}, { duration: DURATION.normal });

      scheduleScrollRefresh();
    },
    { scope: containerRef, dependencies: [isMobile, isReady, prefersReducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      className={`bg-background pt-8 md:pt-12 pb-8 md:pb-12 overflow-hidden text-foreground`}
    >
      {/* ═══ Header (Not Pinned) ═══ */}
      <div className="w-full pb-12 px-6 sm:px-12 md:px-20 lg:px-24 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-[1.2] text-foreground max-w-4xl">
          Hospitality Spaces Powered by Intelligent Automation
        </h2>
      </div>

      {/* ═══ Mobile Layout ═══ */}
      <div className={isMobile ? "block" : "hidden"}>
        <div className="px-6 pb-24 flex flex-col gap-12">
          {PROJECTS.map((proj) => (
            <div key={proj.id} className="flex flex-col gap-6">
              <div className="w-full h-80 sm:h-96 relative rounded-3xl overflow-hidden shadow-lg">
                <img src={proj.image} alt={proj.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-2xl font-light mb-4">{proj.name}</h3>
                <p className="text-sm md:text-base text-muted leading-relaxed">{proj.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ Desktop Pinned Layout ═══ */}
      <div className={isMobile ? "hidden" : "block"}>
        <div ref={pinRef} className="h-screen w-full flex relative overflow-hidden pt-8 pb-6">

          {/* Left Side: Large Image with Rounded Edge */}
          <div className="w-1/2 h-full relative z-10 rounded-r-[60px] lg:rounded-r-[80px] overflow-hidden shadow-[10px_0_40px_rgba(0,0,0,0.1)] bg-black/5">
            {PROJECTS.map((proj) => (
              <div key={proj.id + "img"} className="fp-image absolute inset-0">
                <img
                  src={proj.image}
                  alt={proj.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Right Side: Content & Scroll Indicator */}
          <div className="w-1/2 h-full flex items-center relative pl-12 lg:pl-20 pr-12">

            {/* Scroll Indicator Track */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center justify-between h-[120px] w-4">
              <div className="absolute top-0 bottom-0 w-[3px] bg-black/10 rounded-full" />
              <div
                ref={lineRef}
                className="absolute top-0 w-[3px] bg-accent rounded-full transition-none origin-top"
                style={{ height: "0%" }}
              />
            </div>

            {/* Content Layers */}
            <div className="relative w-full h-full">
              {PROJECTS.map((proj) => (
                <div key={proj.id + "content"} className="fp-content absolute inset-0 flex flex-col justify-center gap-8 lg:gap-10">
                  <h3 className="fp-stagger text-3xl lg:text-4xl font-light leading-tight text-foreground">
                    {proj.name}
                  </h3>

                  <div className="fp-stagger">
                    <p className="text-base md:text-lg text-foreground/80 leading-relaxed font-sans">{proj.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
