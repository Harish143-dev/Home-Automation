'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap, useGSAP } from '../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../lib/scrollRefresh';
import { cn } from '@/lib/utils';

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
      
      // Initial states: move subsequent cards down and make them transparent
      gsap.set(cards.slice(1), { 
        yPercent: 120, 
        scale: 0.95, 
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
        if (i === 0) return; // First card is already visible
        
        const previousCards = cards.slice(0, i);
        
        // 1. Bring current card up with strong easing
        tl.to(card, {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          ease: "power3.inOut"
        }, i);

        // 2. Push previous cards back smoothly
        tl.to(previousCards, {
          scale: (index) => 1 - ((i - index) * 0.05),
          yPercent: (index) => -((i - index) * 6),
          opacity: (index) => 1 - ((i - index) * 0.2),
          filter: (index) => `blur(${(i - index) * 1.5}px)`,
          ease: "power3.inOut"
        }, i);
      });

      scheduleScrollRefresh();
    });

    // Mobile specific: simple fade up
    mm.add("(max-width: 1023px)", () => {
      const cards = gsap.utils.toArray('.process-card-mobile') as HTMLElement[];
      cards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section 
      ref={sectionRef} 
      className="relative z-30 bg-[#fcfcfc] border-t border-black/[0.03] overflow-hidden"
      id="process"
    >
      {/* Desktop Layout: Minimal Stacking Cards */}
      <div className="hidden lg:flex flex-col items-center justify-center h-screen relative px-8 py-12">
        
        <div className="absolute top-12 left-16 z-50 pointer-events-none">
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-black/40">The Journey</h2>
        </div>

        <div ref={containerRef} className="relative w-full max-w-6xl h-[70vh] mx-auto perspective-1000 mt-8">
          {steps.map((step, index) => (
            <div 
              key={`desk-${step.id}`}
              className="process-card absolute top-0 left-0 w-full h-full rounded-[40px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.06)] bg-white border border-black/[0.04] flex transform-origin-top will-change-transform"
              style={{ zIndex: index }}
            >
              {/* Left: Text Content */}
              <div className="w-1/2 h-full p-20 flex flex-col justify-center relative bg-white">
                <div className="flex items-center gap-4 mb-12">
                  <span className="text-black/30 font-mono text-sm tracking-widest">{step.id}</span>
                  <div className="h-[1px] w-12 bg-black/10" />
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-black/50">Phase {step.id}</span>
                </div>
                
                <h3 className="text-[4rem] font-medium tracking-tighter text-black leading-[1.1] mb-6">
                  {step.title}
                </h3>
                
                <p className="text-xl text-black/50 leading-relaxed max-w-md">
                  {step.desc}
                </p>

                {/* Subtle giant background number */}
                <div className="absolute right-12 bottom-12 pointer-events-none select-none">
                  <span className="text-[200px] font-medium text-black/[0.02] tracking-tighter leading-none">
                    {step.id}
                  </span>
                </div>
              </div>

              {/* Right: Image */}
              <div className="w-1/2 h-full relative p-6">
                <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-black/5">
                  <Image 
                    src={step.image} 
                    alt={step.title} 
                    fill 
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/[0.02]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet Layout: Clean Vertical Flow */}
      <div className="lg:hidden px-6 py-24 flex flex-col gap-8 relative">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-black/20" />
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-black/40">The Journey</h2>
          </div>
          <p className="text-black/50 text-lg">A guided intelligent process from consultation to completion.</p>
        </div>

        <div className="flex flex-col gap-12">
          {steps.map((step) => (
            <div 
              key={`mob-${step.id}`}
              className="process-card-mobile flex flex-col gap-6"
            >
              {/* Image Container */}
              <div className="relative w-full h-[50vh] rounded-3xl overflow-hidden bg-black/5 shadow-lg border border-black/[0.04]">
                <Image 
                  src={step.image} 
                  alt={step.title} 
                  fill 
                  className="object-cover"
                />
              </div>

              {/* Text Container */}
              <div className="flex flex-col relative px-2">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-black/30 font-mono text-xs tracking-widest">{step.id}</span>
                  <div className="h-[1px] w-8 bg-black/10" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/50">Phase {step.id}</span>
                </div>
                
                <h3 className="text-4xl font-medium tracking-tighter text-black mb-4">
                  {step.title}
                </h3>
                
                <p className="text-lg text-black/50 leading-relaxed">
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
