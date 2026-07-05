"use client";

import React, { useRef } from "react";
import NextImage from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";
import { DURATION, EASE } from "@/lib/animation.config";

const TEAM = [
  { 
    name: "Michael Chen", 
    role: "Head of Engineering", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    name: "Sarah Jenkins", 
    role: "Lead Lighting Designer", 
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    name: "David Alaba", 
    role: "Project Management Lead", 
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    name: "Emily Watson", 
    role: "Client Experience Director", 
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    name: "Arjun Patel", 
    role: "Systems Integration Lead", 
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    name: "Priya Sharma", 
    role: "Support Operations", 
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600" 
  }
];

export default function OurTeam() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => scheduleScrollRefresh(),
      }
    });

    // Header reveal
    tl.fromTo(".team-header",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: DURATION.slow, ease: EASE.reveal }
    );

    // Grid items reveal
    tl.fromTo(".team-card",
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: DURATION.slow, 
        ease: "power3.out", 
        stagger: 0.15 
      },
      "-=0.6"
    );

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto">
        
        {/* Header */}
        <div className="team-header text-center max-w-3xl mx-auto space-y-4 mb-16 md:mb-24 opacity-0">
          <span className="block tracking-[0.3em] text-sm md:text-base text-accent font-medium">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-[1.2] mb-4">
            The Experts Behind Every Intelligent Solution
          </h2>
          <p className="text-muted text-base md:text-lg font-light leading-relaxed">
            From engineers and designers to project managers and support specialists, our team collaborates to deliver seamless automation experiences.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
          {TEAM.map((member, idx) => (
            <div 
              key={idx} 
              className="team-card flex flex-col items-center text-center group cursor-pointer opacity-0"
            >
              {/* Image Container with Hover Scale */}
              <div className="relative w-full aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden mb-6 shadow-lg shadow-black/5 transition-shadow duration-500 group-hover:shadow-2xl">
                <NextImage 
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  unoptimized
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10 pointer-events-none" />
              </div>

              {/* Text Info */}
              <h3 className="text-xl md:text-2xl font-light tracking-wide mb-1 transition-colors duration-300 group-hover:text-accent">
                {member.name}
              </h3>
              <div className="text-muted font-light tracking-wider text-sm md:text-base">
                {member.role}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
