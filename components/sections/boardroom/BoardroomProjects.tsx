'use client';

import React, { useRef } from "react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';

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
    <section ref={containerRef} className="py-12 md:py-16 bg-background text-foreground w-full border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-24 mb-12 flex flex-col justify-between items-start project-header">
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
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-24 w-full">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="project-card-anim flex flex-col group w-full"
            >
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-[2rem] overflow-hidden mb-6 bg-black/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground font-light text-lg md:text-xl">
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
