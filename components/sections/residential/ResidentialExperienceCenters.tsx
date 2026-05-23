"use client";

import React, { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

const CENTERS_DATA = [
  {
    id: "delhi",
    city: "Delhi",
    title: "Delhi Experience Centre",
    address: "Lower Ground Floor, D20, Block D, Jangpura, New Delhi, Delhi 110014",
    mapImage: "/images/maps/delhi_map.png"
  },
  {
    id: "mumbai",
    city: "Mumbai",
    title: "Mumbai Experience Centre",
    address: "10/76, Apte Properties, Ground Floor Parijat House, LR Papan Marg, off Doctor Elijah Moses Road, Worli, Mumbai, Maharashtra 400018",
    mapImage: "/images/maps/mumbai_map.png"
  },
  {
    id: "bangalore",
    city: "Bangalore",
    title: "Bangalore Experience Centre",
    address: "13, 100 Feet Ring Road, Anjaneya Nagar, Bangalore South Banashankari 3 Rd Stage, Bangalore 560085, Karnataka",
    mapImage: "/images/maps/bangalore_map.png"
  }
];

export function ResidentialExperienceCenters() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapImageRef = useRef<HTMLImageElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Scroll pinning and synchronization
  useGSAP(() => {
    if (!triggerRef.current || !containerRef.current || prefersReducedMotion) return;

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
  }, { scope: triggerRef, dependencies: [prefersReducedMotion] });

  // Map Animations (Image Crossfade + Radar Pulse)
  useGSAP(() => {
    if (prefersReducedMotion) return;
    
    // Crossfade map images
    if (mapImageRef.current) {
      gsap.fromTo(
        mapImageRef.current,
        { opacity: 0.2, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out", overwrite: true }
      );
    }

    // Radar pulse animation
    if (markerRef.current) {
      const pulse = markerRef.current.querySelector('.marker-pulse');
      gsap.to(pulse, { 
        opacity: 0.8, 
        scale: 3, 
        duration: 2, 
        repeat: -1, 
        ease: "power1.out",
        yoyo: true,
        overwrite: true 
      });
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
    <section ref={triggerRef} className="relative w-full bg-black text-white border-t border-white/5">
      <div 
        ref={containerRef} 
        className="w-full h-[100dvh] flex flex-col md:flex-row overflow-hidden"
      >
        {/* LEFT PANEL: Information List */}
        <div className="w-full md:w-[45%] lg:w-[40%] h-full flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-24 py-12 md:py-20 z-10 border-r border-white/10 relative bg-black">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mb-16 leading-tight">
            Be there in <br/>
            <span className="font-medium">minutes.</span>
          </h2>
          
          <div className="flex flex-col w-full border-t border-white/10">
            {CENTERS_DATA.map((center, idx) => {
              const isActive = activeIndex === idx;
              
              return (
                <div 
                  key={center.id} 
                  className={`border-b border-white/10 overflow-hidden transition-all duration-500 ease-out ${isActive ? 'py-8' : 'py-5'}`}
                >
                  <button 
                    onClick={() => handleNavClick(idx)}
                    className="w-full text-left flex items-center justify-between group"
                  >
                    <span className={`text-xl lg:text-2xl font-light tracking-wide transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
                      {center.title}
                    </span>
                    <span className={`text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${isActive ? 'text-white' : 'text-transparent'}`}>
                      {center.city}
                    </span>
                  </button>
                  
                  {/* Expandable Address Content */}
                  <div 
                    className={`grid transition-all duration-500 ease-out ${isActive ? 'grid-rows-[1fr] mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm font-light leading-relaxed text-white/60 max-w-sm">
                        {center.address}
                      </p>
                      
                      <button className="mt-6 text-xs font-medium tracking-wider text-accent hover:text-white transition-colors duration-300 uppercase flex items-center gap-2">
                        Get Directions
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

        {/* RIGHT PANEL: City Map Diagram */}
        <div className="w-full md:w-[55%] lg:w-[60%] h-[50vh] md:h-full relative bg-[#050505] overflow-hidden flex items-center justify-center">
          
          {/* Active City Map Background */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              key={`map-${activeCenter.id}`}
              ref={mapImageRef}
              src={activeCenter.mapImage} 
              alt={`${activeCenter.city} Map`}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-70 mix-blend-screen"
            />
            {/* Elegant vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/60 pointer-events-none" />
          </div>

          {/* Central Glowing Marker (Represents the specific Center) */}
          <div 
            ref={markerRef}
            className="absolute z-10 flex items-center justify-center"
            style={{ 
              left: `50%`, 
              top: `50%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="relative flex items-center justify-center">
              {/* Radar Ping */}
              <div className="marker-pulse absolute w-16 h-16 rounded-full border border-white/20" />
              <div className="absolute w-8 h-8 rounded-full bg-white/10 blur-sm" />
              {/* Solid Center Dot */}
              <div className="marker-dot w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,1)]" />
            </div>
            
            {/* Dynamic Label */}
            <div className="absolute left-full ml-4 flex flex-col justify-center whitespace-nowrap">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/50 mb-1">
                {activeCenter.city}
              </span>
              <span className="text-sm font-medium tracking-wide text-white drop-shadow-md">
                Experience Centre
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
