'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const rawProjects = [
  { title: "Four Seasons", asset: "Mumbai" },
  { title: "Leela Palace", asset: "Udaipur" },
  { title: "Marriott", asset: "Madurai" },
  { title: "Taj Paro Resort & Spa", asset: "Bhutan" },
  { title: "Astor", asset: "Goa" },
  { title: "Hilton Bani Square", asset: "Gurgaon" },
  { title: "ITC Grand Central", asset: "Mumbai" },
  { title: "Hilton", asset: "Jaipur" },
  { title: "Oberoi Rajvillas", asset: "Jaipur" },
  { title: "Hyatt Centric Soalteemode", asset: "Kathmandu" },
  { title: "Oberoi", asset: "Delhi" },
  { title: "Taj", asset: "Bhogampura" },
  { title: "St. Regis", asset: "Delhi" },
  { title: "Fairmont", asset: "Agra" },
  { title: "The Oberoi Sukhvilas", asset: "Chandigarh" },
  { title: "The Oberoi", asset: "Mumbai" },
  { title: "Sawai Man Mahal", asset: "Jaipur" },
  { title: "Six Senses", asset: "Barwara" },
  { title: "The Oberoi Rajgarh Palace", asset: "Khajuraho" },
];

const images = [
  "https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542314831-c6a4d14d23cb?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1590449911925-502a35368a8a?q=80&w=2000&auto=format&fit=crop"
];

const PROJECTS = rawProjects.map((p, i) => ({
  ...p,
  image: images[i % images.length]
}));

export function GuestRoomProjects() {
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
    <section ref={sectionRef} className="py-12 md:py-16 relative w-full bg-background px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden border-t border-black/5">

      {/* Header and Controls */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 lg:mb-16 project-header">

        <div className="max-w-2xl">
          <h5 className="text-accent mb-4 block">
            Proven Excellence
          </h5>
          <h2 className="text-foreground text-balance mb-6">
            Hospitality Projects We've Delivered
          </h2>
          <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance">
            Delivering unparalleled wellness and automation experiences for some of the most prestigious hotels and resorts across the region.
          </p>
        </div>

        {/* Slider Controls */}
        <div className="flex gap-4 shrink-0">
          <button
            onClick={scrollLeft}
            className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center text-foreground hover:bg-black/5 hover:border-black/20 transition-all duration-300"
            aria-label="Previous project"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <button
            onClick={scrollRight}
            className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center text-foreground hover:bg-black/5 hover:border-black/20 transition-all duration-300"
            aria-label="Next project"
          >
            <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
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
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                  draggable={false}
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-2 text-left px-2">
                <h3 className="text-foreground group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground font-light text-base">
                  Hospitality • {project.asset}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
