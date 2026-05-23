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
    address: "Lower Ground Floor, D20, Block D, Jangpura, New Delhi, Delhi 110014",
    imageSrc: delhiImg.src
  },
  {
    id: "hyderabad",
    city: "Hyderabad",
    title: "Hyderabad Experience Centre",
    address: "Banjara Hills, Hyderabad, Telangana",
    imageSrc: hyderabadImg.src
  },
  {
    id: "bangalore",
    city: "Bangalore",
    title: "Bangalore Experience Centre",
    address: "13, 100 Feet Ring Road, Anjaneya Nagar, Bangalore South Banashankari 3 Rd Stage, Bangalore 560085, Karnataka",
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
    <section ref={triggerRef} className="relative w-full bg-black text-white border-t border-white/10">
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
          {/* Heavy gradient on the left side to make white text readable, fading to transparent on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </div>

        {/* LEFT FLOATING CONTENT */}
        <div className="absolute top-0 left-0 h-full w-full md:w-[55%] lg:w-[45%] xl:w-[40%] flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-24 py-12 md:py-20 z-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-widest mb-12 md:mb-16 leading-tight font-display text-white drop-shadow-md">
            Be there in <br/>
            <span className="font-medium text-white/90">minutes.</span>
          </h2>
          
          <div className="flex flex-col w-full border-t border-white/20">
            {CENTERS_DATA.map((center, idx) => {
              const isActive = activeIndex === idx;
              
              return (
                <div 
                  key={center.id} 
                  className={`border-b border-white/20 overflow-hidden transition-all duration-500 ease-out ${isActive ? 'py-6 md:py-8' : 'py-4 md:py-5'}`}
                >
                  <button 
                    onClick={() => handleNavClick(idx)}
                    className="w-full text-left flex items-center justify-between group"
                  >
                    <span className={`text-lg md:text-xl font-light tracking-widest transition-colors duration-300 font-display ${isActive ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`}>
                      {center.title}
                    </span>
                    <span className={`text-[9px] md:text-[10px] font-bold tracking-[0.25em] uppercase transition-colors duration-300 ${isActive ? 'text-white/90' : 'text-transparent'}`}>
                      {center.city}
                    </span>
                  </button>
                  
                  {/* Expandable Address Content */}
                  <div 
                    className={`grid transition-all duration-500 ease-out ${isActive ? 'grid-rows-[1fr] mt-4 md:mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-xs md:text-sm font-light leading-relaxed tracking-wide text-white/70 max-w-sm font-sans">
                        {center.address}
                      </p>
                      
                      <button className="mt-4 md:mt-6 text-[9px] md:text-[10px] font-medium tracking-[0.2em] text-white hover:text-white/70 transition-colors duration-300 uppercase flex items-center gap-2">
                        Get Directions
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
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
    </section>
  );
}
