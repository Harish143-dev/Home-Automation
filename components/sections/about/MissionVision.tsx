"use client";

import React, { useRef } from "react";
import NextImage from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";
import { DURATION, EASE } from "@/lib/animation.config";
import { Check } from "lucide-react";

const VALUES = [
  "Relentless Innovation",
  "Uncompromising Quality",
  "Customer-Centric Design",
  "Sustainable Solutions",
];

export default function MissionVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    // Header reveal
    gsap.fromTo(".mv-header",
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: DURATION.slow, ease: EASE.reveal,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          onEnter: () => scheduleScrollRefresh(),
        }
      }
    );

    // Rows reveal
    const rows = gsap.utils.toArray<HTMLElement>(".mv-row");
    rows.forEach((row) => {
      const isReverse = row.classList.contains("flex-row-reverse");
      const textCol = row.querySelector(".mv-text-col");
      const imgCol = row.querySelector(".mv-img-col");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 80%",
        }
      });

      tl.fromTo(textCol,
        { x: isReverse ? 50 : -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(imgCol,
        { x: isReverse ? -50 : 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      );
    });

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section 
      ref={sectionRef} 
      className="relative pb-8 md:pb-12 px-6 sm:px-12 md:px-24 overflow-hidden bg-background text-foreground"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-20 lg:gap-32">
        
        {/* Header */}
        <div className="mission-header text-center max-w-3xl mx-auto space-y-4 opacity-0">
          <span className="block tracking-[0.3em] text-sm md:text-base text-accent font-medium">
            Mission & Vision
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide text-foreground">
            Our Purpose Drives Every Innovation
          </h2>
        </div>

        <div className="flex flex-col gap-20 lg:gap-32">
          
          {/* Mission Row */}
          <div className="mv-row flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="mv-text-col w-full lg:w-1/2 space-y-6 opacity-0">
              <h3 className="text-2xl md:text-3xl font-light tracking-wide">
                Our Mission
              </h3>
              <p className="text-muted text-base md:text-lg font-light leading-relaxed">
                To design and deliver intelligent automation solutions that enhance comfort, convenience, security, and energy efficiency while creating exceptional experiences for our clients.
              </p>
            </div>
            <div className="mv-img-col w-full lg:w-1/2 opacity-0">
              <div className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden shadow-lg shadow-black/5 transform-gpu">
                <NextImage 
                  src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200"
                  alt="Intelligent living space"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Vision Row */}
          <div className="mv-row flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
            <div className="mv-text-col w-full lg:w-1/2 space-y-6 opacity-0">
              <h3 className="text-2xl md:text-3xl font-light tracking-wide">
                Our Vision
              </h3>
              <p className="text-muted text-base md:text-lg font-light leading-relaxed">
                To be India's most trusted automation solutions partner by continuously innovating, embracing emerging technologies, and setting new benchmarks in smart living and intelligent buildings.
              </p>
            </div>
            <div className="mv-img-col w-full lg:w-1/2 opacity-0">
              <div className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden shadow-lg shadow-black/5 transform-gpu">
                <NextImage 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
                  alt="Modern architectural building"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Values Row */}
          <div className="mv-row flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="mv-text-col w-full lg:w-1/2 space-y-6 opacity-0">
              <h3 className="text-2xl md:text-3xl font-light tracking-wide">
                Our Values
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {VALUES.map((val, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 mt-1 rounded-full bg-accent/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-muted text-base md:text-lg font-light">{val}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mv-img-col w-full lg:w-1/2 opacity-0">
              <div className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden shadow-lg shadow-black/5 transform-gpu">
                <NextImage 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
                  alt="Team collaboration and values"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
