'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { Lightbulb, Music, Thermometer, Blinds, Settings2 } from 'lucide-react';

const HIGHLIGHTS = [
  {
    title: "Scene-Based Lighting",
    description: "Create the ideal atmosphere for breakfast, lunch, dinner, or late-night dining.",
    icon: Lightbulb
  },
  {
    title: "Background Music Control",
    description: "Adjust music zones and playlists to match the restaurant's mood.",
    icon: Music
  },
  {
    title: "HVAC Comfort",
    description: "Maintain a pleasant temperature for guests throughout the day.",
    icon: Thermometer
  },
  {
    title: "Automated Shades",
    description: "Manage natural light and privacy with scheduled shade control.",
    icon: Blinds
  },
  {
    title: "One-Touch Operation",
    description: "Control lighting, music, shades, and HVAC from a single iPad or touch panel.",
    icon: Settings2
  }
];

export function RestaurantIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    // Animate Intro Text
    gsap.fromTo(textRef.current?.children ? Array.from(textRef.current.children) : [],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );

    // Animate Highlight Cards
    cardsRef.current.forEach((el, index) => {
      if (!el) return;
      gsap.fromTo(el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.highlights-grid',
            start: "top 80%",
          }
        }
      );
    });

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-12 md:py-16 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5">
      <div className="max-w-6xl mx-auto flex flex-col items-center relative">

        {/* Intro Text */}
        <div ref={textRef} className="flex flex-col items-center text-center gap-6 max-w-4xl mb-20">
          <h2 className=" text-foreground text-balance">
            Every Great Dining Experience Begins with the Right Ambience
          </h2>

          <p className="text-lg md:text-2xl font-light text-foreground/80 leading-relaxed text-balance mt-4">
            From the moment guests arrive, every detail shapes their experience. Intelligent automation brings together lighting, music, temperature, and shades to create the perfect ambience for every dining occasion.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="highlights-grid flex flex-wrap justify-center gap-6 lg:gap-8 w-full">
          {HIGHLIGHTS.map((item, i) => (
            <div
              key={i}
              ref={el => { cardsRef.current[i] = el; }}
              className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.34rem)] bg-panel rounded-3xl p-8 flex flex-col border border-black/5 hover:border-accent/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/5 flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors duration-300">
                <item.icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
              </div>
              <h3 className=" text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
