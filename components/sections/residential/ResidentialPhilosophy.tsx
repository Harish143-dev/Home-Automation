"use client";

import React, { useRef } from "react";
import { cn } from "../../../lib/utils";
import { gsap, ScrollTrigger, useGSAP, SplitText } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

const PHILOSOPHY_DATA = [
  {
    id: "luxury-living",
    title: "Luxury Living",
    description: "Emotionally intelligent spaces, built around human experience rather than hardware, transform how you inhabit every room, and how every room makes you feel. A truly intelligent home responds to you. Light shifts with the time of day, sound adjusts to the mood of the room, temperature follows the rhythm of rest, focus and gathering. These conditions make a home feel alive.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "future-ready",
    title: "Future-Ready Homes",
    description: "Built for multigenerational living, a smart home grows with the family inside it, adapting to diverse needs and remaining relevant long after the first installation. The homes being built today will be lived in across generations, by people with different physical, cognitive and sensory needs. Intelligent systems designed with this in mind, evolve. Scalable architecture supports new devices, new routines and new residents without rewiring or replacing.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "security",
    title: "Security You Control",
    description: "Real security places human agency at its centre. Transparent controls, explainable systems and clear boundaries around data and access ensure that the people who live in a home remain in full command of it. Integrated sensors, cameras and alerts respond to what matters, when it matters. Monitored remotely and controlled intuitively, your home protects what is most important while preserving the trust of everyone inside it.",
    image: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "convenience",
    title: "Convenience",
    description: "Buildings that respond to human rhythms remove the need for constant decision-making. Lighting adjusts to the time of day, climate responds to occupancy, entertainment follows the room you are in. The best automation is invisible, it simply ensures that every space is ready for how you intend to use it, without requiring you to think about it. Life at home becomes less managed and more lived.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "energy",
    title: "Automatic Energy Savings",
    description: "As energy instability reshapes the demands placed on buildings worldwide, the homes that are designed to respond intelligently will be the ones that endure. Automated climate systems, motorised shading and occupancy-led lighting work together to reduce consumption without reducing comfort. This is efficiency as a design principle, embedded into how the home operates from the moment it is switched on.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop"
  }
];

export function ResidentialPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    // Cinematic heading reveal
    if (headingRef.current) {
      const split = new SplitText(headingRef.current, { type: "lines, words" });
      gsap.fromTo(split.words,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // Scroll trigger for each editorial block
    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      const num = item.querySelector('.phil-num');
      const title = item.querySelector('.phil-title');
      const desc = item.querySelector('.phil-desc');
      const line = item.querySelector('.phil-line');
      const imgContainer = item.querySelector('.phil-image-container');
      const img = item.querySelector('.phil-image');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Image reveal and parallax zoom
      if (imgContainer && img) {
        tl.fromTo(imgContainer,
          { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
          { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.5, ease: "power3.inOut" },
          0
        );
        tl.fromTo(img,
          { scale: 1.2 },
          { scale: 1, duration: 2, ease: "power2.out" },
          0
        );
      }

      // Text reveal staggered slightly after image
      tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power3.inOut" }, 0.4)
        .fromTo(num, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }, 0.6)
        .fromTo(title, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.7)
    });

  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-background relative z-10 overflow-hidden">
      {/* Header */}
      <div className="container mx-auto px-5 sm:px-8 md:px-16 lg:px-24 max-w-7xl mb-16 md:mb-18 lg:mb-24">
        <div className="flex flex-col items-center text-center">
          <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-accent mb-6 block">
            Core Philosophy
          </span>
          <h2 ref={headingRef} className=" text-foreground text-balance">
            Why Invest in Smart Home Automation?
          </h2>
        </div>
      </div>

      {/* Alternating Blocks */}
      <div className="container mx-auto px-5 sm:px-8 md:px-16 lg:px-24 max-w-7xl">
        <div className="flex flex-col gap-24 md:gap-32 lg:gap-40">
          {PHILOSOPHY_DATA.map((item, index) => {
            const isReverse = index % 2 !== 0;

            return (
              <div
                key={item.id}
                ref={el => { itemsRef.current[index] = el; }}
                className={cn(
                  "flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 group",
                  isReverse && "lg:flex-row-reverse"
                )}
              >
                {/* Image Side */}
                <div className="w-full lg:w-5/12 phil-image-container overflow-hidden rounded-2xl shadow-lg shadow-black/5">
                  <div className="relative w-full aspect-[4/3]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover object-center phil-image"
                    />
                    <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                  </div>
                </div>

                {/* Text Side */}
                <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                  <div className="flex items-center gap-6 mb-6">
                    <span className="phil-num text-accent font-light text-2xl md:text-3xl lg:text-4xl">
                      0{index + 1}
                    </span>
                    <div className="phil-line w-16 h-[1px] bg-foreground/20 origin-left" />
                  </div>

                  <h3 className=" phil-title text-foreground mb-4 md:mb-6">
                    {item.title}
                  </h3>

                  <p className="phil-desc text-sm sm:text-base md:text-lg font-light leading-relaxed text-muted text-balance max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
