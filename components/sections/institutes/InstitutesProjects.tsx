'use client';

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import NextImage from 'next/image';

const PROJECTS = [
  {
    id: 1,
    title: "IIM Ranchi",
    asset: "Ranchi, Jharkhand",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "IIT Kanpur & IIT Roorkee",
    asset: "Kanpur & Roorkee",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Graphic Era University",
    asset: "Dehradun, Uttarakhand",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000&auto=format&fit=crop",
  }
];

export function InstitutesProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current || !trackRef.current) return;

    // Animate header text
    gsap.fromTo('.project-header',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Initial Card Animation
    gsap.fromTo('.project-card',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'power3.out',
        scrollTrigger: {
          trigger: trackRef.current,
          start: 'top 85%',
        }
      }
    );

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  const scrollLeft = () => {
    if (trackRef.current) {
      const cardWidth = trackRef.current.firstElementChild?.clientWidth || 300;
      trackRef.current.scrollBy({ left: -(cardWidth + 32), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      const cardWidth = trackRef.current.firstElementChild?.clientWidth || 300;
      trackRef.current.scrollBy({ left: cardWidth + 32, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative w-full bg-background px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden border-t border-black/5">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col mb-12 lg:mb-16 project-header">
        <div className="max-w-2xl">
          <span className="tracking-[0.1em] text-accent mb-4 block text-sm font-medium">
            Our Portfolio
          </span>
          <h2 className="text-foreground text-balance mb-6">
            Trusted by Educational Leaders
          </h2>
          <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance">
            Delivering robust automation, interactive learning environments, and comprehensive facility management for top universities and institutes across India.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl w-full mx-auto relative">
        <div
          ref={trackRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full"
        >
          {PROJECTS.map((project, idx) => (
            <div
              key={idx}
              className="project-card flex flex-col group w-full"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-black/5 mb-6 rounded-[2rem]">
                <NextImage
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                  draggable={false}
                />
              </div>
              <div className="flex flex-col gap-2 text-left px-2">
                <h3 className="text-foreground group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground font-light text-base">
                  Education • {project.asset}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
