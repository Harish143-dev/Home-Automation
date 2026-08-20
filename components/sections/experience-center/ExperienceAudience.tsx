"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { Home, PenTool, BedDouble, Briefcase } from "lucide-react";

const AUDIENCES = [
  {
    id: "homeowners",
    title: "Homeowners",
    icon: Home,
    description: "Experience the ultimate in smart living, comfort, and security tailored to your lifestyle."
  },
  {
    id: "architects",
    title: "Architects & Designers",
    icon: PenTool,
    description: "Discover seamless integration techniques that elevate your architectural vision without compromise."
  },
  {
    id: "hospitality",
    title: "Hospitality Professionals",
    icon: BedDouble,
    description: "Explore cutting-edge room controls and automation to enhance guest experiences and operational efficiency."
  },
  {
    id: "commercial",
    title: "Commercial Consultants",
    icon: Briefcase,
    description: "Evaluate enterprise-grade systems designed for scalability, energy management, and modern workspaces."
  }
];

export function ExperienceAudience() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current || prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      tl.to(".audience-heading", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
      })
        .to(".audience-card", {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out"
        }, "-=0.4");
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section ref={sectionRef} className="py-12 md:py-16 w-full bg-background text-[#2d2a26] relative z-10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 flex flex-col items-center">

        {/* Section Label */}
        <div className="flex items-center gap-4 mb-12 lg:mb-16 audience-heading opacity-0 translate-y-10">
          <div className="h-[1px] w-8 bg-accent/40" />
          <span className="text-[10px] sm:text-xs tracking-[0.3em] text-black/40">
            The Audience
          </span>
          <div className="h-[1px] w-8 bg-accent/40" />
        </div>

        {/* Huge Title */}
        <h2 className=" text-center text-balance max-w-4xl mb-20 audience-heading opacity-0 translate-y-10">
          Built for Homeowners, Architects, Designers & Developers
        </h2>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 w-full">
          {AUDIENCES.map((item) => (
            <div key={item.id} className="audience-card opacity-0 translate-y-12 flex flex-col items-start lg:items-center lg:text-center group">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/5 flex items-center justify-center mb-6 md:mb-8 text-black/80 group-hover:bg-accent group-hover:text-white transition-colors duration-500">
                <item.icon strokeWidth={1.5} className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <h4 className=" text-black mb-4">
                {item.title}
              </h4>
              <p className="text-sm md:text-base text-black/60 leading-relaxed font-light tracking-wide">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
