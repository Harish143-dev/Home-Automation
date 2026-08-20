"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

// Import the specific assets the user provided
import bangaloreImg from "../../../assets/residential/banglore.png";
import delhiImg from "../../../assets/residential/delhi.png";
import hyderabadImg from "../../../assets/residential/hydrabhad.png";

const CENTERS_DATA = [
  {
    id: "delhi",
    city: "Delhi",
    title: "Delhi Experience Centre",
    address: "Lower Ground Floor, D20, Block D, Jangpura, New Delhi, Delhi 110014\n91-11-24324113\n91-11-45643992\n91-11-24324115",
    imageSrc: delhiImg.src
  },
  {
    id: "mumbai",
    city: "Mumbai",
    title: "Mumbai Experience Centre",
    address: "10/76, Apte Properties, Ground Floor Parijat House, LR Papan Marg, off Doctor Elijah Moses Road, Worli, Mumbai, Maharashtra 400018\n+91-22 4967 5653\n+91 82912 39139",
    imageSrc: hyderabadImg.src // Using Hyderabad image as a placeholder for Mumbai until a Mumbai asset is added
  },
  {
    id: "bangalore",
    city: "Bangalore",
    title: "Bangalore Experience Centre",
    address: "13, 100 Feet Ring Road, Anjaneya Nagar, Bangalore South Banashankari 3 Rd Stage, Bangalore 560085, Karnataka\n+91-80-4113 0438\n+91-80-25270460",
    imageSrc: bangaloreImg.src
  }
];

export function ResidentialExperienceCenters() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Scroll pinning and synchronization
  useGSAP(() => {
    if (!triggerRef.current || !containerRef.current || prefersReducedMotion) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: "top top",
        end: `+=${CENTERS_DATA.length * 100}%`,
        pin: containerRef.current,
        scrub: true,
        onUpdate: (self) => {
          const index = Math.min(
            CENTERS_DATA.length - 1,
            Math.floor(self.progress * CENTERS_DATA.length)
          );
          setActiveIndex(index);
        }
      });
    });

    return () => mm.revert();
  }, { scope: triggerRef, dependencies: [prefersReducedMotion] });

  // Image Crossfade Animation
  useGSAP(() => {
    if (prefersReducedMotion) return;

    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0.4, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out", overwrite: true }
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
      const scrollPos = start + (distance / CENTERS_DATA.length) * index + 10;

      window.scrollTo({
        top: scrollPos,
        behavior: 'smooth'
      });
    } else {
      setActiveIndex(index);
    }
  };

  const activeCenter = CENTERS_DATA[activeIndex];

  return (
    <section ref={triggerRef} className="relative w-full bg-background text-foreground border-t border-border">
      <div
        ref={containerRef}
        className="relative w-full min-h-[100dvh] md:h-[100dvh] overflow-hidden"
      >
        {/* FULL WIDTH BACKGROUND IMAGE */}
        <div className="absolute inset-0 w-full h-full">
          <img
            key={`image-${activeCenter.id}`}
            ref={imageRef}
            src={activeCenter.imageSrc}
            alt={`${activeCenter.city} Experience Centre`}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Image overlays removed as per user request */}
        </div>

        {/* LEFT FLOATING CONTENT */}
        <div className="absolute top-0 left-0 h-full w-full md:w-[75%] lg:w-[65%] xl:w-[60%] px-6 sm:px-10 md:px-12 lg:px-20 py-8 z-10">
          <div className="flex flex-col justify-center h-full">
            <div className="mb-6">
              <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-accent mb-3 block">
                The Environment
              </span>
              <h2 className=" text-foreground drop-shadow-sm mb-4 text-balance">
                The Experience Ecosystem
              </h2>
              <p className="text-sm md:text-base font-light text-muted leading-relaxed max-w-xl">
                The nuance of lighting control and spatial acoustics cannot be captured on a screen. Our private experience centers offer architects and homeowners a tactile, real-world demonstration of how our systems interact with high-end interior spaces.
              </p>
            </div>

            <div className="flex flex-col w-full border-t border-black/20">
              {CENTERS_DATA.map((center, idx) => {
                const isActive = activeIndex === idx;

                return (
                  <div
                    key={center.id}
                    className={`border-b border-black/20 overflow-hidden transition-all duration-500 ease-out ${isActive ? 'py-4 md:py-5' : 'py-3'}`}
                  >
                    <button
                      onClick={() => handleNavClick(idx)}
                      className="w-full text-left flex items-center justify-between group"
                    >
                      <span className={`text-lg md:text-xl font-light tracking-widest transition-colors duration-300 ${isActive ? 'text-foreground' : 'text-muted group-hover:text-foreground/80'}`}>
                        {center.title}
                      </span>
                    </button>

                    {/* Expandable Address Content */}
                    <div
                      className={`grid transition-all duration-500 ease-out ${isActive ? 'grid-rows-[1fr] mt-3' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-sm md:text-base font-light leading-relaxed tracking-wide text-muted max-w-sm font-sans whitespace-pre-wrap">
                          {center.address}
                        </p>

                        <button className="mt-3 text-xs tracking-widest text-foreground hover:text-muted transition-colors duration-300 flex items-center gap-2">
                          Get Directions
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
