'use client';

import React, { useRef } from 'react';
import NextImage from 'next/image';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

import imgMadhuri from '@/assets/curtain-automation/clients/madhuri.png';
import imgMittal from '@/assets/curtain-automation/clients/mittal.png';
import imgBkt from '@/assets/curtain-automation/clients/bkt.png';
import imgRaheja from '@/assets/curtain-automation/clients/raheja.png';
import imgKhazana from '@/assets/curtain-automation/clients/khazana.png';
import imgUjjawal from '@/assets/curtain-automation/clients/bkt.png';

const PROJECTS = [
  { name: "Welcomhotel By ITC Hotels", type: "Hospitality", location: "Bhubaneswar", image: imgMadhuri },
  { name: "Vista Restaurant, Taj Surajkund", type: "Restaurant", location: "Delhi NCR", image: imgMittal },
  { name: "Golden Dragon, Taj Surajkund", type: "Restaurant", location: "Delhi NCR", image: imgBkt },
  { name: "ITC Rajputana", type: "Hospitality", location: "Jaipur", image: imgRaheja },
  { name: "DoubleTree by Hilton", type: "Hospitality", location: "Goa Panaji", image: imgKhazana },
  { name: "Trident", type: "Hospitality", location: "Hyderabad", image: imgUjjawal },
  { name: "The Astor", type: "Hospitality", location: "Goa", image: imgMadhuri },
  { name: "Courtyard by Marriott", type: "Hospitality", location: "Madurai", image: imgMittal }
];

export function BanquetHallProjects() {
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
      <div className="max-w-7xl w-full mx-auto mb-16 md:mb-24">
        <div className="max-w-4xl">
          <span className="tracking-[0.1em] text-xs sm:text-sm md:text-base project-header text-accent mb-4 block">
            Proven Excellence
          </span>
          <h2 className=" project-header text-foreground text-balance">
            Hospitality Projects We've Delivered
          </h2>
        </div>
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
              <div className="relative w-full aspect-[4/3] md:aspect-square lg:aspect-[4/3] overflow-hidden bg-black/5 mb-6">
                <NextImage
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className=" text-foreground text-balance">
                  {project.name}
                </h3>
                <p className="text-muted-foreground">
                  {project.type} • {project.location}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
