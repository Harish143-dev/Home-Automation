"use client";

import React, { useRef } from "react";
import NextImage from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";
import { DURATION, EASE } from "@/lib/animation.config";


export default function MissionVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    // Header reveal
    gsap.fromTo(".mission-header",
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
      className="py-16 md:py-24 relative px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden bg-background text-foreground"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-20 lg:gap-32">
        
        {/* Header */}
        <div className="mission-header text-center max-w-3xl mx-auto space-y-4 opacity-0">
          <span className="block tracking-[0.3em] text-sm md:text-base text-accent font-medium">
            Mission & Vision
          </span>
          <h2 className="text-foreground">
            Our Purpose Drives Every Innovation
          </h2>
        </div>

        <div className="flex flex-col gap-20 lg:gap-32">
          
          {/* Mission Row */}
          <div className="mv-row flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="mv-text-col w-full lg:w-1/2 space-y-6 opacity-0">
              <h3 className="">
                Our Mission
              </h3>
              <p className="text-muted text-base md:text-lg font-light leading-relaxed">
                To create intelligent, user-centric automation solutions that increase comfort, convenience, security, and energy efficiency while delivering exceptional experiences across residential, hospitality, and commercial spaces.
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
              <h3 className="">
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

        </div>
      </div>
    </section>
  );
}
