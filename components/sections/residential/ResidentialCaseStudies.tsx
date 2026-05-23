"use client";

import React, { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import Link from "next/link";
import { Button } from "../../ui/button";

const PROJECTS_DATA = [
  {
    id: "delhi-residence",
    number: "01",
    title: "Delhi Private Residence",
    description: "A sprawling estate combining classical architecture with invisible, cutting-edge smart technology for effortless living.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop",
    link: "/case-studies/delhi-residence",
    features: ["Bespoke Lighting", "Invisible Audio", "Climate Control"]
  },
  {
    id: "mumbai-residence-1",
    number: "02",
    title: "Mumbai Private Residence",
    description: "High-rise luxury living featuring panoramic views, dynamic shading systems, and an integrated home cinema.",
    image: "https://images.unsplash.com/photo-1600607687931-cebf5831969e?q=80&w=2000&auto=format&fit=crop",
    link: "/case-studies/mumbai-residence-1",
    features: ["Motorized Shades", "Home Cinema", "Smart Security"]
  },
  {
    id: "mumbai-residence-2",
    number: "03",
    title: "Mumbai Private Residence",
    description: "A sophisticated modern apartment focused on wellness, featuring circadian lighting and advanced environmental controls.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop",
    link: "/case-studies/mumbai-residence-2",
    features: ["Circadian Lighting", "Wellness Tech", "Energy Savings"]
  }
];

export function ResidentialCaseStudies() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
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
    
    // Animate the background image crossfade
    if (centerImageRef.current) {
      gsap.fromTo(
        centerImageRef.current,
        { opacity: 0.2, scale: 1.02 },
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
    <section ref={triggerRef} className="relative w-full bg-white text-black">
      {/* 
        This is the container that gets pinned.
        It takes exactly 100vh.
      */}
      <div 
        ref={containerRef} 
        className="w-full h-[100dvh] hidden md:flex flex-row overflow-hidden"
      >
        {/* LEFT: Navigation Panel (~1/3 width) */}
        <div className="w-full md:w-[35%] lg:w-[30%] h-full bg-[#fcfcfc] flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-24 py-12 md:py-20 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.05)] relative">
          <h2 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-black/40 mb-16">
            See Smart Living in Action
          </h2>
          
          <ul className="flex flex-col gap-6 md:gap-10 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide">
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
                    <span className={`text-[10px] md:text-xs font-medium tracking-wider transition-colors duration-300 ${isActive ? 'text-black' : 'text-black/30 group-hover:text-black/50'}`}>
                      {project.number}
                    </span>
                    <span className={`text-sm md:text-base lg:text-lg font-light tracking-wide transition-colors duration-300 ${isActive ? 'text-black font-medium' : 'text-black/30 group-hover:text-black/50'}`}>
                      {project.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* RIGHT: Full-Bleed Image Panel (~2/3 width) */}
        <div className="w-full md:w-[65%] lg:w-[70%] h-full relative bg-black">
          {/* Background Image */}
          <img 
            key={`image-${activeIndex}`}
            ref={centerImageRef}
            src={activeData.image} 
            alt={activeData.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          
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
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-3 block">
                Residential
              </span>
              <h3 className="text-xl lg:text-3xl font-light tracking-wide mb-3">
                {activeData.title}
              </h3>
              <p className="text-xs md:text-sm font-light text-white/80 leading-relaxed mb-6 max-w-sm">
                {activeData.description}
              </p>
              
              <Link href={activeData.link}>
                <Button 
                  variant="accent" 
                  size="lg"
                  className="px-8 h-12 text-sm font-medium tracking-wider hover:bg-accent-soft hover:shadow-[0_0_30px_rgba(140,24,23,0.3)] transition-all duration-500"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Right side of overlay: Features List (Matches reference image) */}
            <ul className="hidden lg:flex flex-col gap-3 text-white">
              {activeData.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full border border-white/30 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </span>
                  <span className="text-sm font-light tracking-wide text-white/90">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Stacked Layout */}
      <div className="md:hidden flex flex-col w-full bg-[#fcfcfc] py-16 px-6 gap-12">
        <div className="mb-2">
          <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40">
            See Smart Living in Action
          </h2>
        </div>

        {PROJECTS_DATA.map((project) => (
          <div key={project.id} className="flex flex-col gap-4">
            <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden mb-2">
              <img 
                src={project.image} 
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent mb-2 block">
                {project.number}
              </span>
              <h3 className="text-xl font-light tracking-wide text-black mb-2">
                {project.title}
              </h3>
              <p className="text-sm font-light text-black/60 leading-relaxed mb-5">
                {project.description}
              </p>
              
              <Link href={project.link}>
                <Button 
                  variant="outline" 
                  size="default"
                  className="w-full text-sm font-medium tracking-wider"
                >
                  View Case Study
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
