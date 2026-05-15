'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap, useGSAP } from '../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../lib/scrollRefresh';

const steps = [
  { 
    id: '01', 
    title: 'Consultation', 
    desc: 'Understanding your lifestyle, space, and automation goals through an in-depth evaluation.', 
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop' 
  },
  { 
    id: '02', 
    title: 'Design & Planning', 
    desc: 'Crafting tailored Bill of Quantities, architectural drawings, and detailed wiring schematics.', 
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop' 
  },
  { 
    id: '03', 
    title: 'Installation', 
    desc: 'Precision on-site installation of all premium automation hardware by our expert technicians.', 
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2000&auto=format&fit=crop' 
  },
  { 
    id: '04', 
    title: 'Integration', 
    desc: 'Custom programming of scenes, schedules, and rigorous testing of every system for flawless operation.', 
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2000&auto=format&fit=crop' 
  },
  { 
    id: '05', 
    title: 'Support', 
    desc: 'A complete walkthrough of your intelligent space, followed by ongoing post-handover support.', 
    image: 'https://images.unsplash.com/photo-1542314831-c6a4d14b0df6?q=80&w=2000&auto=format&fit=crop' 
  },
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current || !containerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const cards = gsap.utils.toArray('.process-card') as HTMLElement[];
      
      // Set initial states for cards (except the first one)
      gsap.set(cards.slice(1), { 
        yPercent: 100, 
        scale: 0.9, 
        opacity: 0,
        filter: 'blur(10px)'
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${cards.length * 100}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      cards.forEach((card, i) => {
        if (i === 0) return; // First card is already in place
        
        const previousCards = cards.slice(0, i);
        
        // 1. Bring current card up
        tl.to(card, {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          ease: "power2.out"
        }, i);

        // 2. Push previous cards back into depth
        tl.to(previousCards, {
          scale: (index) => 1 - ((i - index) * 0.04),
          yPercent: (index) => -((i - index) * 4),
          opacity: (index) => 1 - ((i - index) * 0.3),
          filter: (index) => `blur(${(i - index) * 2}px)`,
          ease: "power2.out"
        }, i);
      });

      scheduleScrollRefresh();
    });

    // Mobile/Tablet simple fade up
    mm.add("(max-width: 1023px)", () => {
      const cards = gsap.utils.toArray('.process-card-mobile') as HTMLElement[];
      
      cards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section 
      ref={sectionRef} 
      className="relative z-30 bg-background text-foreground border-t border-border overflow-hidden"
      id="process"
    >
      {/* Desktop Layout: Cinematic Stacking Cards */}
      <div className="hidden lg:flex flex-col items-center justify-center h-screen relative px-8 py-12">
        
        {/* Section Title Pinned at Top */}
        <div className="absolute top-12 lg:top-16 left-0 w-full text-center z-50 pointer-events-none">
          <h2 className="text-[2rem] font-bold tracking-[0.2em] uppercase text-foreground/30">The Journey</h2>
        </div>

        <div ref={containerRef} className="relative w-full max-w-6xl h-[80vh] mx-auto perspective-1000">
          {steps.map((step, index) => (
            <div 
              key={`desk-${step.id}`}
              className="process-card absolute top-0 left-0 w-full h-full rounded-[40px] overflow-hidden border border-border shadow-2xl bg-panel transform-origin-top will-change-transform"
              style={{ zIndex: index }}
            >
              {/* Background Visual */}
              <div className="absolute inset-0 w-full h-full bg-[#050505]">
                <Image 
                  src={step.image} 
                  alt={step.title} 
                  fill 
                  className="object-cover opacity-50 scale-105"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 to-transparent" />
              </div>

              {/* Oversized Background Number */}
              <div className="absolute -right-10 -bottom-10 lg:-right-20 lg:-bottom-20 pointer-events-none">
                <span className="text-[300px] lg:text-[400px] font-black leading-none text-white/[0.04] tracking-tighter">
                  {step.id}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10 w-full h-full p-12 lg:p-20 flex flex-col justify-end max-w-3xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-[1px] w-12 bg-accent" />
                  <span className="text-accent text-lg font-bold tracking-[0.3em] uppercase">Phase {step.id}</span>
                </div>
                <h3 className="text-5xl lg:text-7xl font-semibold mb-6 tracking-tight leading-[1.1] text-white">
                  {step.title}
                </h3>
                <p className="text-xl lg:text-2xl text-white/70 font-medium leading-relaxed max-w-2xl">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet Layout: Vertical Card Flow */}
      <div className="lg:hidden px-6 py-24 flex flex-col gap-8 relative">
        <div className="mb-8 text-center">
          <h2 className="text-[2rem] md:text-[3rem] font-bold tracking-tight text-foreground mb-4">The Journey</h2>
          <p className="text-muted text-lg">A guided intelligent process from consultation to completion.</p>
        </div>

        <div className="flex flex-col gap-6">
          {steps.map((step) => (
            <div 
              key={`mob-${step.id}`}
              className="process-card-mobile relative rounded-3xl overflow-hidden border border-border bg-[#050505] min-h-[400px] flex flex-col justify-end p-8 shadow-xl"
            >
              <div className="absolute inset-0 w-full h-full">
                <Image 
                  src={step.image} 
                  alt={step.title} 
                  fill 
                  className="object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
              </div>

              <div className="absolute -right-4 -bottom-4 pointer-events-none">
                <span className="text-[120px] font-black leading-none text-white/[0.05] tracking-tighter">
                  {step.id}
                </span>
              </div>

              <div className="relative z-10">
                <span className="text-accent text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Phase {step.id}</span>
                <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-white">
                  {step.title}
                </h3>
                <p className="text-base md:text-lg text-white/70 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
