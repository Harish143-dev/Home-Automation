"use client";

import React, { useRef } from "react";
import NextImage from "next/image";
import { gsap, useGSAP, ScrollTrigger } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

const MEDIA_ITEMS = [
  {
    id: "lighting",
    title: "Smart Lighting",
    src: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?q=80&w=1200&auto=format&fit=crop",
    className: "col-span-2 row-span-2"
  },
  {
    id: "av",
    title: "AV Systems",
    src: "https://images.unsplash.com/photo-1549213816-6c8e78553da5?q=80&w=1200&auto=format&fit=crop",
    className: "col-span-2 row-span-1"
  },
  {
    id: "shades",
    title: "Motorized Shades",
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    className: "col-span-1 row-span-1"
  },
  {
    id: "theatre",
    title: "Home Theatre",
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1200&auto=format&fit=crop",
    className: "col-span-1 row-span-1"
  },
  {
    id: "hospitality",
    title: "Hospitality Automation",
    src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200&auto=format&fit=crop",
    className: "col-span-1 md:col-span-2 row-span-1"
  },
  {
    id: "touch",
    title: "Touch Controls",
    src: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1200&auto=format&fit=crop",
    className: "col-span-1 md:col-span-2 row-span-1"
  }
];

export function ExperienceShowroom() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current || !mediaContainerRef.current || prefersReducedMotion) return;

      const mediaItems = mediaContainerRef.current.querySelectorAll(".media-item");

      // Initial state
      gsap.set(mediaItems, { y: 60, opacity: 0 });

      // Staggered reveal when scrolled into view
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.to(mediaItems, {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1.2,
            ease: "power3.out"
          });
        }
      });

      // Removed parallax effect to maintain perfect grid alignment
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#040404] py-20 md:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-20 lg:px-24 max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left Side: Brand Story */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-8 bg-white/20" />
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-white/50">
              Showcase
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide text-white mb-8">
            More Than a Showroom, A Complete Automation Experience
          </h2>
          
          <p className="text-sm md:text-base font-light tracking-wide text-white/70 leading-relaxed text-balance">
            Our experience centres are designed to help clients, architects, consultants, and developers interact with intelligent automation in real-world environments.
          </p>
        </div>

        {/* Right Side: Media Collage */}
        <div 
          ref={mediaContainerRef}
          className="w-full lg:w-7/12 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-5 auto-rows-[140px] md:auto-rows-[160px] lg:auto-rows-[180px]"
        >
          {MEDIA_ITEMS.map((item) => (
            <div 
              key={item.id} 
              className={`media-item relative overflow-hidden group ${item.className} bg-white/5`}
            >
              <NextImage
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="font-mono tracking-[0.3em] uppercase text-white">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
