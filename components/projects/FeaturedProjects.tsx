'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASE } from '../../lib/animation.config';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Project {
  id: string;
  name: string;
  category: 'Residential' | 'Hospitality' | 'Commercial';
  usps: [string, string, string];
  description: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'The Glass Pavilion',
    category: 'Residential',
    usps: ['Circadian Lighting', 'Invisible Climate', 'Biometric Access'],
    description: 'A structural masterpiece completely integrated with responsive environmental controls that adapt to natural sunlight and occupancy in real time.',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'p2',
    name: 'Aura Hotel Residences',
    category: 'Hospitality',
    usps: ['Personalized Scenes', 'Energy Grid Sync', 'Voice Concierge'],
    description: 'Elevating the guest experience through intelligent room states. Each suite learns preferences instantly, offering unparalleled bespoke luxury.',
    image: 'https://images.unsplash.com/photo-1542314831-c6a4d14b0df6?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'p3',
    name: 'Horizon Tower',
    category: 'Commercial',
    usps: ['Predictive HVAC', 'Automated Shading', 'Occupancy Analytics'],
    description: 'A peak-performance workspace engineered for zero waste. Intelligent infrastructures dynamically adjust to maximize human productivity and comfort.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'p4',
    name: 'Estate On The Cliff',
    category: 'Residential',
    usps: ['Perimeter Defense', 'Cinema Grade AV', 'Off-Grid Capable'],
    description: 'Rugged terrain meets refined living. A fully self-sufficient smart estate balancing heavy-duty security with invisible, quiet aesthetics.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 'p5',
    name: 'Lumina Resort',
    category: 'Hospitality',
    usps: ['Choreographed Water', 'Landscape Audio', 'Ambient Routing'],
    description: 'Sensory experiences designed around natural integration. Audio and lighting seamlessly guide guests through breathtaking outdoor architectures.',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80'
  }
];

export function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const { isMobile, isReady } = useBreakpoint();
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    // Don't initialize GSAP until breakpoint is measured (audit C3)
    if (!isReady || isMobile || prefersReducedMotion) return;

    // Defer initialization so upstream ScrollTrigger pins (HeroSection, AutomationSpaces)
    // are fully set up first — prevents miscalculated scroll positions.
    gsap.delayedCall(0.4, () => {
      ScrollTrigger.refresh();

      if (!containerRef.current || !pinRef.current) return;

      // Query elements scoped strictly to our container (audit M3 — namespace prefix)
      const navs = gsap.utils.toArray('.fp-nav', containerRef.current) as HTMLLIElement[];
      const images = gsap.utils.toArray('.fp-image', containerRef.current) as HTMLDivElement[];
      const contents = gsap.utils.toArray('.fp-content', containerRef.current) as HTMLDivElement[];

      if (navs.length === 0 || images.length === 0 || contents.length === 0) return;

      // --- Initial States ---
      gsap.set(navs, { color: 'rgba(0,0,0,0.25)', x: 0 });
      gsap.set(navs[0], { color: '#000000', x: 24 });

      gsap.set(images, { clipPath: 'inset(100% 0 0 0)', scale: 1.08 });
      gsap.set(images[0], { clipPath: 'inset(0% 0 0 0)', scale: 1 });

      gsap.set(contents, { opacity: 0, y: 40, pointerEvents: 'none' });
      gsap.set(contents[0], { opacity: 1, y: 0, pointerEvents: 'auto' });

      contents.forEach((content, idx) => {
        const els = content.querySelectorAll('.fp-stagger');
        gsap.set(els, idx === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 });
      });

      // --- Master Scroll-Scrubbed Timeline (audit C2: reduced from 150vh to 100vh per project) ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: `+=${PROJECTS.length * 100}vh`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      PROJECTS.forEach((_, i) => {
        if (i === 0) {
          // Slow Ken Burns zoom on the first image during reading time
          tl.to(images[0], { scale: 1.04, duration: 1.5, ease: EASE.none }, 0);
          return;
        }

        // Each transition occupies 1.0s at position (i * 2) - 0.5
        const t = (i * 2) - 0.5;

        // Image wipe transition (audit: smoother easing)
        tl.to(images[i - 1], { scale: 1.06, duration: 1, ease: EASE.none }, t);
        tl.to(images[i], { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 1, ease: EASE.smooth }, t);

        // Slow Ken Burns on the newly revealed image during reading pause
        const readStart = t + 1;
        const readDuration = i < PROJECTS.length - 1 ? 1.0 : 1.5;
        tl.to(images[i], { scale: 1.04, duration: readDuration, ease: EASE.none }, readStart);

        // Nav sidebar update
        tl.to(navs[i - 1], { color: 'rgba(0,0,0,0.25)', x: 0, duration: 0.4 }, t);
        tl.to(navs[i], { color: '#000000', x: 24, duration: 0.4 }, t + 0.4);
        tl.to(lineRef.current, { top: `${(i / PROJECTS.length) * 100}%`, duration: 0.5 }, t + 0.3);

        // Content crossfade (audit: smoother easing)
        tl.to(contents[i - 1], { opacity: 0, y: -30, pointerEvents: 'none', duration: 0.4 }, t);
        tl.to(contents[i], { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.5, ease: EASE.reveal }, t + 0.5);

        // Staggered element reveals inside the new content panel
        const staggerEls = contents[i].querySelectorAll('.fp-stagger');
        if (staggerEls.length > 0) {
          tl.to(staggerEls, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: EASE.reveal }, t + 0.5);
        }
      });

      // Final padding so the last project stays visible
      tl.to({}, { duration: 1.0 });
    });
  }, { scope: containerRef, dependencies: [isMobile, isReady, prefersReducedMotion] });

  // ── Show nothing until breakpoint is measured (audit C3) ──
  if (!isReady) {
    return <section className="bg-white w-full h-screen" />;
  }

  // ── SINGLE DOM TREE — visibility controlled by CSS, not conditional returns ──
  // This prevents the GSAP scope crash caused by switching between two different JSX trees (audit C1).
  return (
    <section ref={containerRef} className="bg-white text-black w-full relative">

      {/* ═══ Mobile Layout ═══ */}
      <div className={isMobile ? 'block' : 'hidden'}>
        <div className="py-20 px-6">
          <div className="mb-12">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 mb-4">Featured Works</p>
            <h2 className="text-3xl font-semibold">Elevated Environments</h2>
          </div>
          <div className="flex flex-col gap-12">
            {PROJECTS.map((proj) => (
              <article key={proj.id} className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] bg-white border border-neutral-100">
                <div className="h-56 w-full relative">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${proj.image})` }} />
                </div>
                <div className="p-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-neutral-50 px-3 py-1 mb-3">
                    <span className="text-[10px] uppercase tracking-widest text-black font-bold">{proj.category}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-black">{proj.name}</h3>
                  <ul className="flex flex-col gap-1.5 mb-4 text-neutral-600 text-sm">
                    {proj.usps.map(usp => (
                      <li key={usp} className="flex flex-row items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                        <span>{usp}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-neutral-500 mb-6">{proj.description}</p>
                  <button type="button" aria-label={`Explore ${proj.name}`} className="flex items-center gap-2 text-sm font-medium text-black hover:opacity-70 transition-colors">
                    Explore Project <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ Desktop Pinned Layout ═══ */}
      <div className={isMobile ? 'hidden' : 'block'}>
        <div ref={pinRef} className="h-screen w-full flex">

          {/* Left Side: Sidebar Navigation */}
          <div className="w-[35%] h-full border-r border-neutral-200 flex flex-col justify-center px-12 lg:px-20 relative z-20 bg-white">
            <h2 className="text-xs font-bold font-mono uppercase tracking-[0.3em] text-neutral-400 mb-16">Featured Works</h2>
            <div className="relative">
              {/* Progress Track */}
              <div className="absolute left-[3px] top-2 bottom-2 w-[1px] bg-neutral-200" />
              {/* Progress Active Line */}
              <div
                ref={lineRef}
                className="absolute left-[2px] top-2 w-[3px] bg-black origin-top rounded-full"
                style={{ height: `${100 / PROJECTS.length}%` }}
              />
              <ul className="flex flex-col gap-12 pl-12">
                {PROJECTS.map((proj, i) => (
                  <li key={proj.id} className="fp-nav flex items-center gap-6">
                    <span className="text-xs font-mono opacity-50">0{i + 1}</span>
                    <span className="text-3xl font-medium tracking-tight whitespace-nowrap">{proj.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side: Visual Display */}
          <div className="w-[65%] h-full relative overflow-hidden bg-neutral-100">
            {/* Image Layers */}
            {PROJECTS.map((proj) => (
              <div key={proj.id + 'img'} className="fp-image absolute inset-0 z-0">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${proj.image})` }} />
              </div>
            ))}

            {/* Content Dock (Bottom 40%) — audit m11: reduced min-height to 280px */}
            <div className="absolute inset-x-0 bottom-0 h-[40%] min-h-[280px] z-10">
              {PROJECTS.map((proj) => (
                <div
                  key={proj.id + 'content'}
                  className="fp-content absolute inset-0 bg-white/85 backdrop-blur-3xl border-t border-white/50 p-8 xl:p-12 flex items-center justify-between shadow-[0_-20px_40px_rgba(0,0,0,0.03)]"
                >
                  {/* Left: Title & Description */}
                  <div className="max-w-xl pr-8">
                    <div className="fp-stagger inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-1.5 mb-5">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-black uppercase">{proj.category}</span>
                    </div>
                    <h3 className="fp-stagger text-3xl xl:text-4xl font-semibold tracking-[-0.02em] text-black mb-4 leading-[1.1]">
                      {proj.name}
                    </h3>
                    <p className="fp-stagger text-base text-neutral-600 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  {/* Right: USPs & CTA */}
                  <div className="flex flex-col justify-end gap-6 border-l border-neutral-200 pl-8 h-full py-2 min-w-[260px]">
                    <ul className="flex flex-col gap-3">
                      {proj.usps.map(usp => (
                        <li key={usp} className="fp-stagger flex items-center gap-3 text-neutral-800">
                          <CheckCircle2 className="w-4.5 h-4.5 text-black" />
                          <span className="text-base font-medium">{usp}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="fp-stagger mt-auto">
                      <button
                        type="button"
                        aria-label={`View ${proj.name}`}
                        className="group flex items-center gap-4 bg-black text-white px-7 py-3.5 rounded-full font-medium transition-all hover:bg-black/80 hover:scale-105 active:scale-95 shadow-lg shadow-black/10"
                      >
                        View Project
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
