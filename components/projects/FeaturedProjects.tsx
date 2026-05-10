'use client';

import Image from 'next/image';
import React, { useRef } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { DURATION, EASE, SCROLL, STAGGER } from '../../lib/animation.config';
import { gsap, useGSAP } from '../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../lib/scrollRefresh';

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
        end: `+=${PROJECTS.length * 200}vh`,
        pin: true,
        scrub: SCROLL.scrub,
        anticipatePin: SCROLL.anticipatePin,
        invalidateOnRefresh: true,
      }
    });

    PROJECTS.forEach((_, i) => {
      if (i === 0) {
        // Slow Ken Burns zoom on the first image during reading time
        tl.to(images[0], { scale: 1.035, duration: 1.3, ease: EASE.none }, 0);
        return;
      }

      // Each transition occupies 1.0s at position (i * 2) - 0.5
      const t = (i * 2) - 0.5;

      // Image wipe transition (audit: smoother easing)
      tl.to(images[i - 1], { scale: 1.05, duration: DURATION.reveal, ease: EASE.none }, t);
      tl.to(images[i], { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: DURATION.reveal, ease: EASE.smooth }, t);

      // Slow Ken Burns on the newly revealed image during reading pause
      const readStart = t + 1;
      const readDuration = i < PROJECTS.length - 1 ? 0.9 : 1.3;
      tl.to(images[i], { scale: 1.035, duration: readDuration, ease: EASE.none }, readStart);

      // Nav sidebar update
      tl.to(navs[i - 1], { color: 'rgba(0,0,0,0.25)', x: 0, duration: DURATION.fast }, t);
      tl.to(navs[i], { color: '#000000', x: 24, duration: DURATION.fast }, t + 0.4);
      tl.to(lineRef.current, { top: `${(i / PROJECTS.length) * 100}%`, duration: DURATION.medium }, t + 0.3);

      // Content crossfade (audit: smoother easing)
      tl.to(contents[i - 1], { opacity: 0, y: -30, pointerEvents: 'none', duration: DURATION.fast }, t);
      tl.to(contents[i], { opacity: 1, y: 0, pointerEvents: 'auto', duration: DURATION.medium, ease: EASE.reveal }, t + 0.5);

      // Staggered element reveals inside the new content panel
      const staggerEls = contents[i].querySelectorAll('.fp-stagger');
      if (staggerEls.length > 0) {
        tl.to(staggerEls, { opacity: 1, y: 0, duration: DURATION.fast, stagger: STAGGER.reveal, ease: EASE.reveal }, t + 0.5);
      }
    });

    // Final padding so the last project stays visible
    tl.to({}, { duration: DURATION.normal });

    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [isMobile, isReady, prefersReducedMotion] });

  // ── SINGLE DOM TREE — visibility controlled by CSS, not conditional returns ──
  // This prevents the GSAP scope crash caused by switching between two different JSX trees.
  return (
    <section
      ref={containerRef}
      id="ecosystem"
      className={`bg-background text-foreground w-full relative transition-opacity duration-500 ${!isReady ? 'opacity-0' : 'opacity-100'}`}
    >

      {/* ═══ Mobile Layout ═══ */}
      <div className={isMobile ? 'block' : 'hidden'}>
        <div className="py-14 sm:py-16 md:py-20 px-5 sm:px-6">
          <div className="mb-12">
            <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-muted mb-3 sm:mb-4">Featured Works</p>
            <h2 className="text-2xl sm:text-3xl font-semibold">Elevated Environments</h2>
          </div>
          <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
            {PROJECTS.map((proj) => (
              <article key={proj.id} className="relative rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-lg bg-panel border border-border">
                <div className="h-44 sm:h-52 md:h-56 w-full relative">
                  <Image
                    src={proj.image}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover"
                    aria-hidden="true"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-darker px-3 py-1 mb-3 shadow-sm">
                    <span className="text-[10px] uppercase tracking-widest text-foreground font-bold">{proj.category}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">{proj.name}</h3>
                  <ul className="flex flex-col gap-1 sm:gap-1.5 mb-3 sm:mb-4 text-muted text-xs sm:text-sm">
                    {proj.usps.map(usp => (
                      <li key={usp} className="flex flex-row items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-foreground" />
                        <span>{usp}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs sm:text-sm text-muted mb-4 sm:mb-6">{proj.description}</p>
                  <button type="button" aria-label={`Explore ${proj.name}`} className="flex items-center gap-2 text-sm font-medium text-foreground hover:opacity-70 transition-colors">
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
          <div className="w-[30%] lg:w-[35%] h-full border-r border-border flex flex-col justify-center px-6 md:px-10 lg:px-16 xl:px-20 relative z-20 bg-background">
            <h2 className="text-xs font-bold font-mono uppercase tracking-[0.3em] text-muted mb-16">Featured Works</h2>
            <div className="relative">
              {/* Progress Track */}
              <div className="absolute left-[3px] top-2 bottom-2 w-[1px] bg-white/10" />
              {/* Progress Active Line */}
              <div
                ref={lineRef}
                className="absolute left-[2px] top-2 w-[3px] bg-accent origin-top rounded-full"
                style={{ height: `${100 / PROJECTS.length}%` }}
              />
              <ul className="flex flex-col gap-12 pl-12">
                {PROJECTS.map((proj, i) => (
                  <li key={proj.id} className="fp-nav flex items-center gap-6">
                    <span className="text-xs font-mono opacity-50">0{i + 1}</span>
                    <span className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight whitespace-nowrap">{proj.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side: Visual Display */}
          <div className="w-[70%] lg:w-[65%] h-full relative overflow-hidden bg-surface-darker">
            {/* Image Layers */}
            {PROJECTS.map((proj) => (
              <div key={proj.id + 'img'} className="motion-layer fp-image absolute inset-0 z-0">
                <Image
                  src={proj.image}
                  alt=""
                  fill
                  sizes="65vw"
                  className="object-cover"
                  aria-hidden="true"
                />
              </div>
            ))}

            {/* Content Dock (Bottom 40%) — audit m11: reduced min-height to 280px */}
            <div className="absolute inset-x-0 bottom-0 h-[45%] md:h-[40%] min-h-[260px] md:min-h-[280px] z-10">
              {PROJECTS.map((proj) => (
                <div
                  key={proj.id + 'content'}
                  className="fp-content absolute inset-0 bg-panel/85 backdrop-blur-3xl border-t border-border p-5 md:p-6 lg:p-8 xl:p-12 flex items-center justify-between shadow-lg"
                >
                  {/* Left: Title & Description */}
                  <div className="max-w-xl pr-4 md:pr-6 lg:pr-8">
                    <div className="fp-stagger inline-flex items-center gap-2 rounded-full border border-border bg-surface-darker px-4 py-1.5 mb-5 shadow-sm">
                      <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-foreground uppercase">{proj.category}</span>
                    </div>
                    <h3 className="fp-stagger text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-2 md:mb-3 lg:mb-4 leading-[1.1]">
                      {proj.name}
                    </h3>
                    <p className="fp-stagger text-xs md:text-sm lg:text-base text-muted leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  {/* Right: USPs & CTA */}
                  <div className="hidden lg:flex flex-col justify-end gap-6 border-l border-border pl-6 lg:pl-8 h-full py-2 min-w-[220px] lg:min-w-[260px]">
                    <ul className="flex flex-col gap-3">
                      {proj.usps.map(usp => (
                        <li key={usp} className="fp-stagger flex items-center gap-3 text-muted">
                          <CheckCircle2 className="w-4.5 h-4.5 text-foreground" />
                          <span className="text-base font-medium">{usp}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="fp-stagger mt-auto">
                      <button
                        type="button"
                        aria-label={`View ${proj.name}`}
                        className="group flex items-center gap-4 bg-accent text-white px-7 py-3.5 rounded-full font-medium transition-all hover:bg-accent-soft hover:scale-105 active:scale-95 shadow-sm"
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
