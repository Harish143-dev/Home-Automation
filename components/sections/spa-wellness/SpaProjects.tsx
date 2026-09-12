'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const PROJECTS = [
  {
    title: "Taj Fateh Prakash Palace",
    asset: "Udaipur",
    image: "https://images.unsplash.com/photo-1590449911925-502a35368a8a?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Taj Lakefront",
    asset: "Bhopal",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Amankora Paro",
    asset: "Bhutan",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Taj Puri Resort & Spa",
    asset: "Odisha",
    image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=2000&auto=format&fit=crop",
  },
  {
    title: "Four Seasons",
    asset: "Mumbai",
    image: "https://images.unsplash.com/photo-1542314831-c6a4d14d23cb?q=80&w=2000&auto=format&fit=crop",
  }
];

export function SpaProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current || !trackRef.current || !pinContainerRef.current) return;

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

    // Animate cards initial appearance
    gsap.fromTo('.project-card',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: pinContainerRef.current,
          start: 'top 75%',
        }
      }
    );

    // Horizontal Scroll Animation
    const track = trackRef.current;

    const getScrollAmount = () => {
      let trackWidth = track.scrollWidth;
      let viewportWidth = track.parentElement?.clientWidth || window.innerWidth;
      return Math.max(0, trackWidth - viewportWidth);
    };

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinContainerRef.current,
          start: 'center center',
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-12 md:py-16 relative w-full bg-background px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden border-t border-black/5">

      {/* Centered Header */}
      <div className="text-center max-w-4xl mx-auto z-10 py-6 px-4 mb-12 lg:mb-16 project-header">
        <h5 className="text-accent mb-4 block">
          Proven Excellence
        </h5>
        <h2 className="text-foreground text-balance mb-6">
          Hospitality Projects We've Delivered
        </h2>
        <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance max-w-2xl mx-auto">
          Delivering unparalleled wellness experiences and operational efficiency for some of the most prestigious hotels and resorts across the region.
        </p>
      </div>

      <div ref={pinContainerRef} className="max-w-7xl w-full mx-auto md:overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-full md:w-max overflow-x-auto md:overflow-visible snap-x md:snap-none snap-mandatory hide-scrollbar gap-6 md:gap-8 pb-10"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PROJECTS.map((project, idx) => (
            <div
              key={idx}
              className="project-card snap-start md:snap-align-none shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[30vw] flex flex-col group cursor-grab active:cursor-grabbing"
            >
              <div className="relative w-full aspect-[4/3] md:aspect-square lg:aspect-[4/3] overflow-hidden bg-black/5 mb-6 rounded-[2rem]">
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
                <p className="text-muted-foreground font-light text-lg">
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
