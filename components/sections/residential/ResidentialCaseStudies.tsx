"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import Link from "next/link";
import { Button } from "../../ui/button";

const PROJECTS_DATA = [
  {
    id: "dixit-nene",
    number: "01",
    navTitle: "The Dixit-Nene Residence",
    title: "The Dixit-Nene Residence, Mumbai (2024)",
    description: "A complete integration of synchronized motorized shades, backlit custom-engraved keypads, zone climate logic, and full audio-video app orchestration.",
    images: [
      "/assets/residential/project/delhi-residence/delhi-residence-1.jpg",
      "/assets/residential/project/delhi-residence/delhi-residence-2.jpg",
      "/assets/residential/project/delhi-residence/delhi-residence-3.jpg",
      "/assets/residential/project/delhi-residence/delhi-residence-4.jpg"
    ],
    link: "/projects/dixit-nene"
  },
  {
    id: "rajan-mittal",
    number: "02",
    navTitle: "The Rajan Mittal Villa",
    title: "The Rajan Mittal Villa, New Delhi",
    description: "A four-storey architectural masterwork in Shanti Niketan designed by Morphogenesis, powered by an enterprise-grade automation backbone.",
    images: [
      "/assets/residential/project/mumbai-residence-1/mumbai-residence-1-1.jpg",
      "/assets/residential/project/mumbai-residence-1/mumbai-residence-1-2.jpg",
      "/assets/residential/project/mumbai-residence-1/mumbai-residence-1-3.jpg",
      "/assets/residential/project/mumbai-residence-1/mumbai-residence-1-4.jpg"
    ],
    link: "/projects/rajan-mittal"
  },
  {
    id: "bkt-farms",
    number: "03",
    navTitle: "BKT Farms",
    title: "BKT Farms, New Delhi (2024)",
    description: "Advanced architectural lighting controls, chiller-based HVAC integration, and secure electronic access control systems.",
    images: [
      "/assets/residential/project/mumbai-residence-2/mumbai-residence-2-1.jpg",
      "/assets/residential/project/mumbai-residence-2/mumbai-residence-2-2.jpg",
      "/assets/residential/project/mumbai-residence-2/mumbai-residence-2-3.jpg",
      "/assets/residential/project/mumbai-residence-2/mumbai-residence-2-4.jpg"
    ],
    link: "/projects/bkt-farms"
  }
];

export function ResidentialCaseStudies() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Reset image sequence when active project changes
  useEffect(() => {
    setImageIndex(0);
  }, [activeIndex]);

  // Cycle through project images continuously
  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % PROJECTS_DATA[activeIndex].images.length);
    }, 4500); // 4.5s per image

    return () => clearInterval(interval);
  }, [activeIndex, prefersReducedMotion]);

  // Handle Scroll Pinning and Index Updating
  useGSAP(() => {
    if (!triggerRef.current || !containerRef.current || prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        // Total scroll distance = 100vh per item
        end: `+=${PROJECTS_DATA.length * 100}%`,
        pin: containerRef.current,
        scrub: true,
        onUpdate: (self) => {
          // Map progress strictly to the available indices
          const index = Math.min(
            PROJECTS_DATA.length - 1,
            Math.floor(self.progress * PROJECTS_DATA.length)
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

    // Animate the overlay sliding up and fading in
    if (overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", overwrite: true }
      );
    }
  }, { dependencies: [activeIndex, prefersReducedMotion] });

  const handleNavClick = (index: number) => {
    if (!triggerRef.current) return;

    const st = ScrollTrigger.getAll().find(t => t.vars.trigger === triggerRef.current);
    if (st) {
      const start = st.start;
      const end = st.end;
      const distance = end - start;
      const scrollPos = start + (distance / PROJECTS_DATA.length) * index + 10;

      window.scrollTo({
        top: scrollPos,
        behavior: 'smooth'
      });
    } else {
      setActiveIndex(index);
    }
  };

  const activeData = PROJECTS_DATA[activeIndex];

  return (
    <section ref={triggerRef} className="relative w-full bg-background text-foreground">
      {/* 
        This is the container that gets pinned.
        It takes exactly 100vh.
      */}
      <div
        ref={containerRef}
        className="w-full h-[100dvh] hidden md:flex flex-row overflow-hidden"
      >
        {/* LEFT: Navigation Panel (~1/3 width) */}
        <div className="w-full md:w-[50%] lg:w-[45%] xl:w-[40%] h-full bg-background flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-24 py-12 md:py-20 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.05)] relative">
          <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-accent mb-3 block">
            See Smart Living in Action
          </span>
          <h2 className=" text-foreground mb-3">
            Proven in India’s Most Exclusive Residences.
          </h2>
          <p className="text-xs lg:text-sm font-light text-foreground/70 leading-[1.8] mb-8 md:mb-10">
            Trust is earned through flawless execution in high-stakes environments. Our portfolio spans the private domains of India’s cultural icons, industrial leaders, and visionaries.
          </p>

          <ul className="flex flex-col gap-5 md:gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide">
            {PROJECTS_DATA.map((project, idx) => {
              const isActive = activeIndex === idx;
              return (
                <li key={project.id} className="relative">
                  {/* Red Accent Line for Active State */}
                  <div
                    className={`absolute -left-6 md:-left-10 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent transition-all duration-500 ease-out ${isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`}
                  />

                  <button
                    onClick={() => handleNavClick(idx)}
                    className="group flex items-baseline gap-4 text-left"
                  >
                    <span className={`tracking-widest text-sm transition-colors duration-300 ${isActive ? 'text-foreground' : 'text-muted group-hover:text-foreground/50'}`}>
                      {project.number}
                    </span>
                    <span className={`text-sm lg:text-base font-light tracking-wide transition-colors duration-300 ${isActive ? 'text-foreground font-medium' : 'text-muted group-hover:text-foreground/50'}`}>
                      {project.navTitle}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 md:mt-10 pt-6 border-t border-border">
            <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-muted mb-2 block">The Registry Includes</span>
            <p className="text-[10px] lg:text-xs font-light text-foreground/60 leading-[1.8]">
              Hrithik Roshan — Ranbir & Alia — K.M. Birla — Laxmi Mittal — Pirojsha Godrej — Aman Gupta — Abhay Soi — Boman Irani — K.P. Singh — Ujjwal Munjal
            </p>
          </div>
        </div>

        {/* RIGHT: Full-Bleed Image Panel (~2/3 width) */}
        <div className="w-full md:w-[50%] lg:w-[55%] xl:w-[60%] h-full relative bg-secondary overflow-hidden">
          {/* Background Images with Crossfade and Zoom */}
          {activeData.images.map((imgUrl, idx) => {
            const isActiveImage = imageIndex === idx;
            return (
              <img
                key={`img-${activeIndex}-${idx}`}
                src={imgUrl}
                alt={`${activeData.title} view ${idx + 1}`}
                className={`absolute inset-0 w-full h-full object-cover object-center ${isActiveImage ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  transform: isActiveImage ? 'scale(1.05)' : 'scale(1)',
                  transition: isActiveImage
                    ? 'opacity 1.5s ease-in-out, transform 10s ease-out'
                    : 'opacity 1.5s ease-in-out, transform 0s'
                }}
              />
            );
          })}

          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Overlay Content */}
          <div
            key={`overlay-${activeIndex}`}
            ref={overlayRef}
            className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row justify-between items-end gap-8"
          >
            {/* Left side of overlay: Title and Desc */}
            <div className="max-w-lg text-white">
              <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-white/50 mb-2 block">
                Residential
              </span>
              <h3 className=" mb-3">
                {activeData.title}
              </h3>
              <p className="text-xs md:text-sm font-light text-white/80 leading-[1.8] mb-6 max-w-sm">
                {activeData.description}
              </p>

              <Link href={activeData.link}>
                <Button variant="interactive" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Stacked Layout */}
      <div className="md:hidden flex flex-col w-full bg-background py-12 px-6 gap-12">
        <div className="flex flex-col mb-2">
          <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-accent mb-3 block">
            See Smart Living in Action
          </span>
          <h2 className=" text-foreground mb-3">
            Proven in India’s Most Exclusive Residences.
          </h2>
          <p className="text-xs font-light text-foreground/70 leading-[1.8]">
            Trust is earned through flawless execution in high-stakes environments. Our portfolio spans the private domains of India’s cultural icons, industrial leaders, and visionaries.
          </p>
        </div>

        {PROJECTS_DATA.map((project, pIdx) => (
          <div key={project.id} className="flex flex-col gap-4">
            <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden mb-2 bg-secondary">
              {project.images.map((imgUrl, iIdx) => {
                const isActiveImage = imageIndex === iIdx;
                return (
                  <img
                    key={`mob-img-${project.id}-${iIdx}`}
                    src={imgUrl}
                    alt={`${project.title} view ${iIdx + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover ${isActiveImage ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      transform: isActiveImage ? 'scale(1.05)' : 'scale(1)',
                      transition: isActiveImage
                        ? 'opacity 1.5s ease-in-out, transform 10s ease-out'
                        : 'opacity 1.5s ease-in-out, transform 0s'
                    }}
                  />
                );
              })}
            </div>

            <div>
              <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-accent mb-2 block">
                {project.number}
              </span>
              <h3 className=" text-foreground mb-2">
                {project.title}
              </h3>
              <p className="text-xs font-light text-muted leading-[1.8] mb-5">
                {project.description}
              </p>

              <Link href={project.link}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View Case Study
                </Button>
              </Link>
            </div>
          </div>
        ))}

        {/* Mobile Registry Footer */}
        <div className="mt-6 pt-6 border-t border-border">
          <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-muted mb-2 block">The Registry Includes</span>
          <p className="text-[10px] font-light text-foreground/60 leading-[1.8]">
            Hrithik Roshan — Ranbir & Alia — K.M. Birla — Laxmi Mittal — Pirojsha Godrej — Aman Gupta — Abhay Soi — Boman Irani — K.P. Singh — Ujjwal Munjal
          </p>
        </div>
      </div>
    </section>
  );
}
