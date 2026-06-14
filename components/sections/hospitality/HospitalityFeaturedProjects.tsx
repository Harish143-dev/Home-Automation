"use client";

import React, { useRef } from "react";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { SCROLL, EASE, DURATION, STAGGER } from "../../../lib/animation.config";
import { scheduleScrollRefresh } from "../../../lib/scrollRefresh";
import SawaiManMahalImage from "../../../assets/projects/SawaiManMahal.jpg";
import privateResidenceImage from "../../../assets/projects/private-residence.jpg";

interface Project {
  id: string;
  name: string;
  scope: string;
  challenges: string;
  result: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    id: "p1",
    name: "Luxury Beach Resort",
    scope: "Complete property-wide integration including guest rooms, landscape audio, and pool climate control.",
    challenges: "Harsh coastal environment requiring weather-proof equipment and complex outdoor routing over a 10-acre property.",
    result: "A seamless, corrosion-resistant system reducing energy waste by 30% while significantly enhancing the guest experience.",
    image: SawaiManMahalImage.src
  },
  {
    id: "p2",
    name: "Metropolitan Business Hotel",
    scope: "Conference room AV, lobby digital signage, and intelligent HVAC management integrated with the PMS.",
    challenges: "High-traffic areas requiring robust, zero-downtime systems and an intuitive interface for rotating staff.",
    result: "Streamlined event management and a 25% reduction in HVAC costs through real-time occupancy sensing.",
    image: privateResidenceImage.src
  },
  {
    id: "p3",
    name: "Boutique Heritage Property",
    scope: "Invisible architectural lighting, motorized shading, and bespoke centralized room controls.",
    challenges: "Retrofitting a historic 19th-century structure without compromising its architectural integrity or original stonework.",
    result: "A perfect blend of classic aesthetics and modern luxury, achieving a 5-star technology rating without a single visible wire.",
    image: "/images/commercial_project_property.png"
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
          end: `+=${PROJECTS.length * 300}vh`,
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
      className={`bg-surface-darker text-foreground w-full relative transition-opacity duration-500 overflow-hidden ${!isReady ? "opacity-0" : "opacity-100"}`}
    >
      {/* ═══ Header (Not Pinned) ═══ */}
      <div className="w-full pt-24 pb-12 px-6 sm:px-12 md:px-20 lg:px-24 flex flex-col items-center text-center">

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
                <h3 className="text-2xl font-light mb-6">{proj.name}</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <h4 className="tracking-[0.3em] uppercase text-accent text-[10px] mb-1">Scope of Automation</h4>
                    <p className="text-sm text-muted">{proj.scope}</p>
                  </div>
                  <div>
                    <h4 className="tracking-[0.3em] uppercase text-accent text-[10px] mb-1">Challenges Solved</h4>
                    <p className="text-sm text-muted">{proj.challenges}</p>
                  </div>
                  <div>
                    <h4 className="tracking-[0.3em] uppercase text-accent text-[10px] mb-1">Result Achieved</h4>
                    <p className="text-sm text-muted">{proj.result}</p>
                  </div>
                </div>
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

                  <div className="flex flex-col gap-6">
                    <div className="fp-stagger">
                      <h4 className="tracking-[0.3em] uppercase text-muted mb-2">Scope of Automation</h4>
                      <p className="text-sm md:text-base text-foreground/80 leading-relaxed font-sans line-clamp-2">{proj.scope}</p>
                    </div>

                    <div className="fp-stagger">
                      <h4 className="tracking-[0.3em] uppercase text-muted mb-2">Challenges Solved</h4>
                      <p className="text-sm md:text-base text-foreground/80 leading-relaxed font-sans line-clamp-2">{proj.challenges}</p>
                    </div>

                    <div className="fp-stagger">
                      <h4 className="tracking-[0.3em] uppercase text-muted mb-2">Result Achieved</h4>
                      <p className="text-sm md:text-base text-foreground/80 leading-relaxed font-sans line-clamp-2">{proj.result}</p>
                    </div>
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
