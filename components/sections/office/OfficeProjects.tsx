'use client';

import React, { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import NextImage from 'next/image';

const PROJECTS = [
  {
    id: 1,
    title: "EY",
    asset: "Gurgaon",
    image: "/images/projects/commercial/ey-gurgaon/1.jpg",
  },
  {
    id: 2,
    title: "Barclays Bank",
    asset: "Chennai",
    image: "/images/projects/commercial/barclays-bank-chennai/1.jpg",
  },
  {
    id: 3,
    title: "Rio Tinto",
    asset: "Gurgaon",
    image: "/images/projects/commercial/ey-gurgaon/2.jpg",
  },
  {
    id: 4,
    title: "Lupin Corporate Office",
    asset: "Mumbai",
    image: "/images/projects/commercial/meta-office-gurgaon/2.jpg",
  },
  {
    id: 5,
    title: "HSBC Office",
    asset: "Gurugram and Mumbai",
    image: "/images/projects/commercial/nvidia/1.jpg",
  },
  {
    id: 6,
    title: "J. M. Baxi & Co.",
    asset: "Noida",
    image: "/images/projects/commercial/iocl/1.jpg",
  },
  {
    id: 7,
    title: "ANZ",
    asset: "Bangalore",
    image: "/images/projects/commercial/barclays-bank-chennai/2.jpg",
  },
  {
    id: 8,
    title: "Prime Minister's Office",
    asset: "New Delhi",
    image: "/images/projects/hospitality/pm-museum-delhi/1.jpg",
  },
  {
    id: 9,
    title: "Serum Institute Corp. Office",
    asset: "Pune",
    image: "/images/projects/commercial/meta-office-gurgaon/1.jpg",
  }
];

export function OfficeProjects() {
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
      {/* Header and Controls */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 lg:mb-16 project-header">
        <div className="max-w-2xl">
          <span className="tracking-[0.1em] text-accent mb-4 block text-sm font-medium">
            Our Portfolio
          </span>
          <h2 className="text-foreground text-balance mb-6">
            Trusted by Corporate Leaders
          </h2>
          <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance">
            Delivering unparalleled boardroom experiences, dynamic office automation, and operational efficiency for the world's most prestigious corporate environments and headquarters across India.
          </p>
        </div>

        {/* Slider Controls */}
        <div className="flex gap-4 shrink-0">
          <button
            onClick={scrollLeft}
            className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center text-foreground hover:bg-black/5 hover:border-black/20 transition-all duration-300"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <button
            onClick={scrollRight}
            className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center text-foreground hover:bg-black/5 hover:border-black/20 transition-all duration-300"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Slider Track */}
      <div className="max-w-7xl w-full mx-auto relative">
        <div
          ref={trackRef}
          className="flex w-full overflow-x-auto snap-x snap-mandatory gap-6 md:gap-8 pb-10 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PROJECTS.map((project, idx) => (
            <div
              key={idx}
              className="project-card snap-start shrink-0 w-[85vw] sm:w-[50vw] md:w-[40vw] lg:w-[28vw] flex flex-col group"
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
                  Corporate • {project.asset}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
