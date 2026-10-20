"use client";

import NextImage from "next/image";
import { CheckCircle2, Award } from "lucide-react";

const HIGHLIGHTS = [
  "Expertise across Residential, Hospitality & Commercial automation",
  "End-to-end solutions, from design and engineering to installation and support",
  "Trusted by homeowners, architects, developers, and leading brands",
];

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

          <p className="text-muted-foreground font-light text-base md:text-lg lg:text-xl leading-relaxed">
            At ATPL, we believe that the highest form of technology is entirely
            imperceptible. True modernization simplifies how you interact with
            space. For over two decades, we have partnered with India’s
            leading architects and interior designers to integrate lighting,
            climate, and media into a cohesive ecosystem respecting the visual
            integrity of the architecture while optimizing daily living.
          </p>

          {/* Key Value Propositions */}
          <ul className="flex flex-col gap-3.5">
            {HIGHLIGHTS.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3.5 group">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-foreground/90 font-light text-base md:text-lg leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* Industry Experience Callout */}
          <div className="p-5 sm:p-6 rounded-2xl bg-panel/70 border border-black/5 shadow-sm flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-accent shrink-0" />
              <span className="tracking-[0.25em] text-xs sm:text-sm text-accent font-medium">
                Industry Experience
              </span>
            </div>
            <p className="text-foreground font-light text-base md:text-lg leading-relaxed">
              Two decades of pioneering automation standards across India.
            </p>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-full aspect-[4/5] lg:aspect-[4/4] overflow-hidden rounded-2xl border border-black/5 shadow-sm">
          <div className="absolute inset-0 bg-black/5 z-10" />
          <NextImage
            src="/assets/residential/project/delhi-residence/delhi-residence-1.jpg"
            alt="Architectural smart living space by ATPL"
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


