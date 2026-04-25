'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { EASE } from '../../lib/animation.config';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PANELS = [
  {
    label: '01',
    title: 'Residential',
    description: 'Bespoke automation seamlessly woven into the fabric of your sanctuary.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: '02',
    title: 'Hospitality',
    description: 'Elevating sensory experiences to redefine uncompromising luxury.',
    image: 'https://images.unsplash.com/photo-1542314831-c6a4d14b0df6?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: '03',
    title: 'Commercial',
    description: 'Intelligent infrastructures engineered for pinnacle productivity.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  }
];

export function AutomationSpaces() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLButtonElement>(null);
  const { isMobile, isReady } = useBreakpoint();

  useGSAP(() => {
    if (isMobile || !isReady) return;

    const scrollSection = scrollSectionRef.current;
    const pinEl = pinRef.current;
    const heading = headingRef.current;
    // Use scoped class selectors instead of ref arrays (audit M6)
    const cards = gsap.utils.toArray('.as-card', pinEl) as HTMLDivElement[];
    if (!scrollSection || !pinEl || !heading || cards.length < 3) return;

    // ── Initial states ──
    gsap.set(heading, { opacity: 0, y: 40 });
    gsap.set(cards, { opacity: 0, scale: 0.8, y: 60 });
    gsap.set(cards, {
      xPercent: -50,
      yPercent: -50,
      left: '50%',
      top: '55%',
    });

    // Defer so hero pin is set up first
    gsap.delayedCall(0.3, () => {
      ScrollTrigger.refresh();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollSection,
          start: 'top top',
          end: 'bottom bottom',
          pin: pinEl,
          pinSpacing: false,
          scrub: 0.6,
          invalidateOnRefresh: true,
        }
      });

      // ─── PHASE 1 (0 → 1.0): Heading fades in centered ───
      tl.to(heading, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      }, 0);

      // ─── PHASE 2 (1.0 → 1.6): Heading fades OUT completely ───
      tl.to(heading, {
        opacity: 0,
        y: -30,
        duration: 0.6,
        ease: EASE.smooth,
      }, 1.0);

      // ─── PHASE 3 (1.4): First card appears ───
      tl.to(cards[0], {
        opacity: 1,
        scale: 0.88,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      }, 1.4);

      // ─── PHASE 4 (2.2): Second card rises ───
      tl.to(cards[1], {
        opacity: 1,
        scale: 0.84,
        y: 40,
        duration: 1,
        ease: 'power2.out',
      }, 2.2);

      // ─── PHASE 5 (3.2): Triangular spread ───
      tl.to(cards[0], {
        left: '22%',
        top: '52%',
        scale: 0.84,
        rotation: -3,
        duration: 1.5,
        ease: 'power3.inOut',
      }, 3.2);

      tl.to(cards[1], {
        left: '50%',
        top: '62%',
        scale: 0.8,
        rotation: 0,
        y: 0,
        duration: 1.5,
        ease: 'power3.inOut',
      }, 3.2);

      tl.to(cards[2], {
        opacity: 1,
        scale: 0.84,
        y: 0,
        left: '78%',
        top: '52%',
        rotation: 3,
        duration: 1.5,
        ease: 'power3.inOut',
      }, 3.4);
    });

    // ── CTA section: scroll-triggered reveal AFTER pin ──
    if (ctaSectionRef.current && ctaBtnRef.current) {
      gsap.set(ctaBtnRef.current, { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: ctaSectionRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(ctaBtnRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: EASE.reveal,
          });
        },
        once: true,
      });
    }

  }, { scope: wrapperRef, dependencies: [isMobile, isReady] });

  // Show nothing until breakpoint is measured (audit C3)
  if (!isReady) {
    return <div className="w-full h-screen" />;
  }

  // ── Mobile: Simple vertical cards ──
  if (isMobile) {
    return (
      <div>
        <section className="w-full px-4 py-16 flex flex-col gap-6">
          <div className="mb-4">
            <p className="text-xs font-mono tracking-[0.3em] uppercase text-muted mb-3">What we do</p>
            <h2 className="text-2xl font-semibold text-foreground tracking-tight">Tailored Automation for Every Space</h2>
          </div>
          {PANELS.map((panel, i) => (
            <div key={i} className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${panel.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase mb-2 block">{panel.label}</span>
                <h3 className="text-xl font-semibold text-white tracking-tight mb-1">{panel.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{panel.description}</p>
              </div>
            </div>
          ))}
          <div className="flex justify-center pt-6">
            <button type="button" className="group flex h-13 items-center gap-2.5 rounded-full bg-foreground px-7 font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95">
              <span className="text-sm tracking-wide">Explore Solutions</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>
    );
  }

  // ── Desktop: 3-phase scroll experience ──
  return (
    <div ref={wrapperRef}>
      {/* Phase 1 & 2: Scroll trigger area for pin + card animation */}
      <section
        ref={scrollSectionRef}
        className="relative w-full"
        style={{ height: '500vh' }}
      >
        <div
          ref={pinRef}
          className="w-full h-screen relative overflow-hidden"
        >
          {/* Heading — starts vertically centered, moves up during animation */}
          <div
            ref={headingRef}
            className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center opacity-0"
          >
            <p className="text-xs font-mono tracking-[0.3em] uppercase text-muted mb-4">
              What we do
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight leading-tight">
              Tailored Automation<br />for Every Space
            </h2>
          </div>

          {/* Cards — using scoped class selectors instead of ref arrays (audit M6) */}
          {PANELS.map((panel, i) => (
            <div
              key={i}
              className="as-card absolute w-[320px] md:w-[380px] lg:w-[400px] aspect-[3/4] rounded-[20px] overflow-hidden shadow-2xl transform-gpu cursor-default group opacity-0"
              style={{ zIndex: 10 + i }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${panel.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-white/20 text-[10px] font-mono text-white/50">
                    {panel.label}
                  </span>
                  <span className="w-5 h-px bg-white/20" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight leading-tight mb-2">
                  {panel.title}
                </h3>
                <p className="text-sm text-white/55 max-w-xs leading-relaxed font-light">
                  {panel.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Phase 3: CTA section — scrolls naturally after pin releases */}
      <div
        ref={ctaSectionRef}
        className="relative w-full flex items-center justify-center py-24 md:py-32"
      >
        <button
          ref={ctaBtnRef}
          type="button"
          className="group flex h-14 md:h-16 items-center gap-3 rounded-full bg-foreground px-8 md:px-10 font-medium text-white text-base md:text-lg transition-all duration-300 hover:scale-105 hover:gap-4 active:scale-95 opacity-0"
        >
          <span className="tracking-wide">Explore Solutions</span>
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
