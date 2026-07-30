'use client';

import React, { useRef } from"react";
import NextImage from"next/image";
import { ArrowRight, ArrowLeft } from"lucide-react";
import { gsap, useGSAP } from"../../../lib/gsapSetup";
import { useReducedMotion } from"../../../hooks/useReducedMotion";
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';

const PROJECTS = [
  {
    id: 1,
    title:"ITC Hotels",
    asset:"Luxury Hospitality Automation",
    image:"https://picsum.photos/seed/hotel1/1200/800",
  },
  {
    id: 2,
    title:"Taj Hotels",
    asset:"Premium Guest Experience",
    image:"https://picsum.photos/seed/hotel2/1200/800",
  },
  {
    id: 3,
    title:"Marriott",
    asset:"Integrated Public Area Control",
    image:"https://picsum.photos/seed/hotel3/1200/800",
  },
  {
    id: 4,
    title:"Hilton",
    asset:"Intelligent Lighting & AV",
    image:"https://picsum.photos/seed/hotel4/1200/800",
  },
  {
    id: 5,
    title:"Hyatt",
    asset:"Seamless Automation Solutions",
    image:"https://picsum.photos/seed/hotel5/1200/800",
  },
  {
    id: 6,
    title:"Four Seasons",
    asset:"Elite Environmental Management",
    image:"https://picsum.photos/seed/hotel6/1200/800",
  },
  {
    id: 7,
    title:"The Oberoi",
    asset:"Bespoke Automation Architecture",
    image:"https://picsum.photos/seed/hotel7/1200/800",
  },
  {
    id: 8,
    title:"IHG Hotels & Resorts",
    asset:"Scalable Hospitality Framework",
    image:"https://picsum.photos/seed/hotel8/1200/800",
  }
];

export function PublicAreasProjects() {
  const containerRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.fromTo(".project-header",
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.2, ease:"power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start:"top 80%",
        }
      }
    );

    gsap.fromTo(".project-card",
      { x: 100, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1, stagger: 0.1, ease:"power3.out",
        scrollTrigger: {
          trigger: carouselRef.current,
          start:"top 85%",
        }
      }
    );
    
    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  const scroll = (direction:"left" |"right") => {
    if (carouselRef.current) {
      const scrollAmount = direction ==="left" ? -600 : 600;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior:"smooth" });
    }
  };

  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-background text-foreground w-full overflow-hidden border-t border-black/5">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-20 lg:px-24 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 project-header">

        <div className="max-w-2xl">
          <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-accent mb-4 block">
            Proven Excellence
          </span>
          <h2 className="text-foreground">
            Hospitality Projects
          </h2>
          <p className="mt-6 text-foreground/70 text-lg md:text-xl font-light leading-relaxed">
            Delivering unparalleled guest experiences and operational efficiency for the world's most prestigious luxury hotel brands across India.
          </p>
        </div>

        {/* Carousel Controls */}
        <div className="flex gap-4">
          <button
            onClick={() => scroll("left")}
            className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 group focus:outline-none"
            aria-label="Previous Projects"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 group focus:outline-none"
            aria-label="Next Projects"
          >
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div className="pl-6 sm:pl-12 md:pl-20 lg:pl-24 w-full">
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-10 pr-6 sm:pr-12 md:pr-20 lg:pr-24"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="project-card snap-center shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[400px] flex flex-col group cursor-grab active:cursor-grabbing"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-black/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                />
              </div>

              {/* Title & Asset */}
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <span className="text-sm tracking-widest  text-muted-foreground font-medium">
                  {project.asset}
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
