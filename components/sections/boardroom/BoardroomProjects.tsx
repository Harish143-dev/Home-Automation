'use client';

import React, { useRef, useState } from "react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: "The Westin",
    asset: "Premium Boardroom Automation",
    image: "https://picsum.photos/seed/boardroom1/1200/800",
  },
  {
    id: 2,
    title: "The Leela",
    asset: "Executive Meeting Spaces",
    image: "https://picsum.photos/seed/boardroom2/1200/800",
  }
];

export function BoardroomProjects() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.fromTo(".project-header",
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(".project-card-anim",
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        }
      }
    );

    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-background text-foreground w-full border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-24 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 project-header">
        <div className="max-w-2xl">
          <span className="tracking-[0.1em] text-accent mb-4 block">
            Proven Excellence
          </span>
          <h2 className="text-foreground text-balance">
            Hospitality Projects We've Delivered
          </h2>
          <p className="mt-6 text-foreground/70 text-lg md:text-xl font-light leading-relaxed text-balance">
            Delivering unparalleled boardroom experiences and operational efficiency for the world's most prestigious luxury hotel brands and corporate environments across India.
          </p>
        </div>

        {/* Desktop Slider Controls */}
        <div className="hidden md:flex gap-4">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors duration-300 focus:outline-none"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextSlide}
            className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors duration-300 focus:outline-none"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-24 w-full">
        {/* Desktop Slider View (Hidden on mobile) */}
        <div className="hidden md:block overflow-hidden w-full relative">
          <div 
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                className="w-full shrink-0 flex flex-col group pr-8"
              >
                <div className="relative w-full aspect-[21/9] rounded-[2rem] overflow-hidden mb-8 bg-black/5">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-foreground text-3xl font-medium tracking-tight group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground font-light text-xl">
                    {project.asset}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Vertical Scroll View (Hidden on desktop) */}
        <div ref={gridRef} className="flex md:hidden flex-col gap-12 w-full max-h-[80vh] overflow-y-auto pr-2 pb-8 custom-scrollbar">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="project-card-anim flex flex-col group w-full shrink-0"
            >
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-black/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground text-2xl font-medium tracking-tight group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground font-light text-lg">
                  {project.asset}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
