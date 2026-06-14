"use client";

import React, { useRef } from "react";
import NextImage from "next/image";
import { gsap, useGSAP, ScrollTrigger } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

const GALLERY_MEDIA = [
  {
    id: "g1",
    type: "landscape",
    src: "/assets/residential/project/delhi-residence/delhi-residence-2.jpg",
    alt: "Luxury living room automation"
  },
  {
    id: "g2",
    type: "landscape",
    src: "/assets/residential/project/mumbai-residence-1/mumbai-residence-1-2.jpg",
    alt: "Smart climate control panel"
  },
  {
    id: "g3",
    type: "landscape",
    src: "/assets/residential/project/mumbai-residence-2/mumbai-residence-2-2.jpg",
    alt: "Automated shades in bedroom"
  },
  {
    id: "g4",
    type: "landscape",
    src: "/assets/residential/project/delhi-residence/delhi-residence-3.jpg",
    alt: "Home theatre experience"
  },
  {
    id: "g5",
    type: "landscape",
    src: "/assets/residential/project/mumbai-residence-1/mumbai-residence-1-3.jpg",
    alt: "Integrated lighting systems"
  },
  {
    id: "g6",
    type: "landscape",
    src: "/assets/residential/project/mumbai-residence-2/mumbai-residence-2-3.jpg",
    alt: "Modern architectural lighting"
  }
];

export function ExperienceGallery() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!containerRef.current || !trackRef.current || prefersReducedMotion) return;

      const track = trackRef.current;

      // Calculate how far the track needs to scroll left
      // Scroll amount = total width of track - width of viewport
      const getScrollAmount = () => {
        let trackWidth = track.scrollWidth;
        return -(trackWidth - window.innerWidth);
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`, // The scroll duration matches the width to scroll
        pin: true,
        animation: tween,
        scrub: 1, // Smooth scrubbing
        invalidateOnRefresh: true, // Recalculate on resize
        anticipatePin: 1
      });

    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section 
      ref={containerRef} 
      className="bg-secondary text-white relative w-full overflow-hidden"
    >
      <div className={`w-full flex flex-col justify-center ${prefersReducedMotion ? 'py-24' : 'h-screen'}`}>
        
        {/* Header Area */}
        <div className="w-full px-6 sm:px-12 lg:px-16 mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6 shrink-0">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-8 bg-white/30" />
              <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/60">
                Gallery
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide text-white">
              Step Inside Our<br />Experience Centres
            </h2>
          </div>
          <p className="text-white/60 text-sm md:text-base font-light tracking-wide max-w-sm text-balance">
            Immerse yourself in real-world automation environments designed to inspire and demonstrate the pinnacle of smart living.
          </p>
        </div>

        {/* Horizontal Media Track */}
        <div 
          ref={trackRef} 
          className={`flex items-center gap-6 md:gap-10 px-6 sm:px-12 lg:px-16 pb-12 ${prefersReducedMotion ? 'flex-wrap overflow-x-auto overflow-y-hidden pb-8' : 'w-max will-change-transform'}`}
        >
          {GALLERY_MEDIA.map((item, index) => {
            
            // Define dimensions based on editorial type
            let sizingClass = "";
            if (item.type === "landscape") {
              sizingClass = "w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[40vw] h-[40vh] md:h-[50vh] lg:h-[60vh]";
            } else if (item.type === "portrait") {
              sizingClass = "w-[70vw] sm:w-[45vw] md:w-[30vw] lg:w-[25vw] h-[50vh] md:h-[60vh] lg:h-[70vh]";
            } else if (item.type === "square") {
              sizingClass = "w-[80vw] sm:w-[50vw] md:w-[35vw] lg:w-[30vw] aspect-square";
            }

            return (
              <div 
                key={item.id} 
                className={`relative overflow-hidden group shrink-0 ${sizingClass}`}
              >
                <div className="absolute inset-0 w-full h-full transform transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105">
                  <NextImage
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority={index < 2}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
