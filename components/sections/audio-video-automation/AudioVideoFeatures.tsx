'use client';

import React, { useRef } from 'react';
import NextImage from 'next/image';
import { gsap, ScrollTrigger, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const FEATURES = [
  {
    id: 0,
    text: "One-touch control for music, TV, and home theatre",
    image: "/images/av_home_theatre.png",
  },
  {
    id: 1,
    text: "Equipment neatly concealed for a clean appearance",
    image: "/images/av_clean_appearance.png",
  },
  {
    id: 2,
    text: "Designed to complement your home interiors",
    image: "/images/av_interior_design.png",
  },
  {
    id: 3,
    text: "Easy-to-use controls for every member of the family",
    image: "/images/av_smart_control.png",
  }
];

export function AudioVideoFeatures() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    // Header reveal
    gsap.fromTo('.av-features-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );

    // ScrollSpy logic for text blocks and sticky images
    const textBlocks = gsap.utils.toArray('.av-feature-text') as HTMLElement[];
    const images = gsap.utils.toArray('.av-feature-image') as HTMLElement[];

    // Set initial state
    gsap.set(textBlocks, { opacity: 0.3 });
    gsap.set(images, { opacity: 0, scale: 1.05 });
    if (textBlocks.length > 0) gsap.set(textBlocks[0], { opacity: 1 });
    if (images.length > 0) gsap.set(images[0], { opacity: 1, scale: 1 });

    textBlocks.forEach((block, i) => {
      ScrollTrigger.create({
        trigger: block,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) {
            // Text fade
            gsap.to(textBlocks, { opacity: 0.3, duration: 0.4, overwrite: "auto" });
            gsap.to(block, { opacity: 1, duration: 0.4, overwrite: "auto" });

            // Image crossfade (desktop only as mobile images are inline)
            if (window.innerWidth >= 1024) {
              gsap.to(images, { opacity: 0, scale: 1.05, duration: 0.8, ease: "power2.inOut", overwrite: "auto" });
              gsap.to(images[i], { opacity: 1, scale: 1, duration: 0.8, ease: "power2.inOut", overwrite: "auto" });
            }
          }
        }
      });
    });

  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-16 md:py-24 relative w-full bg-background px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/5">
      <div className="max-w-7xl w-full mx-auto flex flex-col gap-12 lg:gap-24 relative">
        
        {/* Section Header */}
        <div className="max-w-4xl flex flex-col items-start">
          <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base av-features-header text-accent mb-4 block">
            Entertainment Without Complexity
          </span>
          <h2 className="av-features-header text-foreground text-balance mb-6">
            Modern entertainment should be effortless.
          </h2>
          <p className="av-features-header text-sm md:text-base lg:text-lg font-light tracking-wide text-muted leading-relaxed text-balance">
            Our integrated audio and video solutions eliminate clutter, simplify control, and deliver an immersive experience in every room.
          </p>
        </div>

        {/* ScrollSpy Container */}
        <div className="flex flex-col lg:flex-row relative items-start lg:gap-16">
          
          {/* Left Side: Scrolling Text Blocks */}
          <div className="w-full lg:w-[45%] flex flex-col pt-[5vh] lg:pt-[10vh] pb-[5vh] lg:pb-[30vh]">
            {FEATURES.map((feature) => (
              <div 
                key={feature.id} 
                className="av-feature-text min-h-[40vh] lg:min-h-[50vh] flex flex-col justify-center py-12 lg:py-0 transition-opacity duration-300 lg:transition-none"
              >
                <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center mb-6 shrink-0 lg:hidden">
                  <span className="text-accent font-medium text-lg">{feature.id + 1}</span>
                </div>
                
                <h3 className="leading-[1.3] text-foreground text-balance">
                  {feature.text}
                </h3>
                
                {/* Mobile Inline Image */}
                <div className="lg:hidden w-full aspect-video rounded-2xl overflow-hidden mt-8 relative shadow-sm border border-black/5 bg-black/5">
                  <NextImage 
                    src={feature.image} 
                    alt="Audio Video Feature" 
                    fill 
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    className="object-cover" 
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Sticky Image Gallery (Desktop Only) */}
          <div className="hidden lg:block w-[55%] sticky top-[20vh] h-[60vh] rounded-[2rem] overflow-hidden bg-black/5 shadow-xl border border-black/5">
            {FEATURES.map((feature, idx) => (
              <div 
                key={feature.id} 
                className="av-feature-image absolute inset-0 w-full h-full will-change-transform opacity-0 pointer-events-none"
                style={{ zIndex: FEATURES.length - idx }}
              >
                <NextImage 
                  src={feature.image} 
                  alt={feature.text}
                  fill 
                  sizes="50vw"
                  className="object-cover" 
                />
                {/* Subtle overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none mix-blend-multiply opacity-50" />
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
