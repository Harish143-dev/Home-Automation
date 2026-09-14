"use client";

import { useRef } from "react";
import NextImage from "next/image";

export default function AboutTheCompany() {
  return (
    <section
      className="py-12 md:py-16 relative px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden bg-background -mt-[1px] z-10"
    >
      {/* Noise Texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none" aria-hidden="true">
        <filter id="noise-atc"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#noise-atc)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left Content */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <span className="block tracking-[0.3em] text-sm md:text-base text-accent font-medium">
              About Us
            </span>

          </div>

          <p className="text-muted-foreground font-light text-lg md:text-xl lg:text-2xl leading-relaxed">
            At ATPL, we believe that the highest form of technology is entirely
            imperceptible. True modernization simplifies how you interact with
            space. For over two decades, we have partnered with India’s
            leading architects and interior designers to integrate lighting,
            climate, and media into a cohesive ecosystem respecting the visual
            integrity of the architecture while optimizing daily living.
          </p>
        </div>

        {/* Right Image */}
        <div className="relative w-full aspect-[4/5] lg:aspect-[4/4] overflow-hidden">
          <div className="absolute inset-0 bg-black/5 z-10" />
          <NextImage
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
            alt="Modern automated office space"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}

