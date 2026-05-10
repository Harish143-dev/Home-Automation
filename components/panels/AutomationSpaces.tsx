'use client';

import React, { useRef } from 'react';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap, useGSAP } from '../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../lib/scrollRefresh';
import { ArrowRight } from 'lucide-react';

const PANELS = [
  {
    label: '01',
    title: 'Residential',
    btn: "Discover Residential Projects",
    description: 'Control Security, Lights, Shades, Audio, Video and Wifi. Everything from one screen with integrated Home Automation.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: '02',
    title: 'Hospitality',
    btn: "Discover Hospitality Projects",
    description: 'Reduce Operating Expenditure by over 30%, reducing dependence on Manpower. Integrate automation in Public Areas and Rooms.',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: '03',
    title: 'Commercial',
    btn: "Discover Commercial Projects",
    description: 'Save upto 40% energy and 30% long term costs with light management strategies integrated with automation',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  }
];

// Layout Slots for GSAP animations
const SLOTS = {
  center: { top: '15vh', left: '20vw', width: '40vw', height: '70vh', borderRadius: '24px', opacity: 1 },
  topLeft: { top: '5vh', left: '5vw', width: '10vw', height: '10vw', borderRadius: '16px', opacity: 1 },
  bottomRight: { top: '75vh', left: '85vw', width: '10vw', height: '10vw', borderRadius: '16px', opacity: 1 },
  hidden: { top: '75vh', left: '85vw', width: '10vw', height: '10vw', borderRadius: '16px', opacity: 0 }
};

export function AutomationSpaces() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isMobile, isReady } = useBreakpoint();
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || isMobile || !isReady || prefersReducedMotion) return;

    // Set Initial States for Images
    PANELS.forEach((_, i) => {
      const el = `.exp-img-${i}`;
      if (i === 0) {
        // First image starts hidden and slightly scaled down
        gsap.set(el, { ...SLOTS.center, opacity: 0, scale: 0.9 });
      } else if (i === 1) {
        gsap.set(el, SLOTS.bottomRight);
      } else {
        gsap.set(el, SLOTS.hidden);
      }

      const textEl = `.exp-text-${i}`;
      gsap.set(textEl, { opacity: 0, y: 20 }); // ALL text starts hidden
    });

    // Heading starts visible
    gsap.set('.section-intro', { opacity: 1, y: 0 });

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${(PANELS.length + 1) * 150}%`, // Added 150vh extra for the intro heading sequence
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // Intro Phase: Hide heading and reveal first gallery image
    const introTl = gsap.timeline();
    introTl.to('.section-intro', {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: 'power2.inOut'
    }, 0);

    introTl.to('.exp-img-0', {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power2.out'
    }, 0.5); // Image starts appearing just as heading fades out

    introTl.to('.exp-text-0', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, 0.8);

    mainTl.add(introTl);

    // Create transitions between each image
    for (let i = 0; i < PANELS.length - 1; i++) {
      const currentImg = `.exp-img-${i}`;
      const nextImg = `.exp-img-${i + 1}`;
      const nextNextImg = `.exp-img-${i + 2}`;
      const currentText = `.exp-text-${i}`;
      const nextText = `.exp-text-${i + 1}`;

      const phaseTl = gsap.timeline();

      // 1. Move current image to top-left history slot
      phaseTl.to(currentImg, {
        ...SLOTS.topLeft,
        ease: 'power2.inOut',
        duration: 1
      }, 0);

      // 2. Fade out current text
      phaseTl.to(currentText, {
        opacity: 0,
        y: -30,
        ease: 'power2.inOut',
        duration: 0.4
      }, 0);

      // 3. Move next image from bottom-right preview slot to center active slot
      phaseTl.to(nextImg, {
        ...SLOTS.center,
        ease: 'power2.inOut',
        duration: 1
      }, 0);

      // 4. Fade in next text
      phaseTl.to(nextText, {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        duration: 0.4
      }, 0.6); // Fade in slightly after image is settling

      // 5. If there's another image waiting in line, reveal it in the bottom right slot
      if (i + 2 < PANELS.length) {
        phaseTl.to(nextNextImg, {
          opacity: 1,
          ease: 'power2.inOut',
          duration: 0.4
        }, 0.6);
      }

      mainTl.add(phaseTl);
    }

    scheduleScrollRefresh();

    return () => {
      mainTl.kill();
      mainTl.scrollTrigger?.kill();
    };
  }, { scope: sectionRef, dependencies: [isMobile, isReady, prefersReducedMotion] });

  // Mobile / Reduced Motion Fallback
    if (isReady && (isMobile || prefersReducedMotion)) {
    return (
      <div id="automation-spaces" className="bg-background">
        <section className="py-20 px-5 text-foreground">
          <div className="mb-12 px-2 text-center">
            <p className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold opacity-60 mb-2">What we do</p>
            <h2 className="text-3xl font-bold">Tailored Automation for Every Space</h2>
          </div>
          <div className="flex flex-col gap-16">
            {PANELS.map((panel) => (
              <div key={panel.label} className="flex flex-col gap-6">
                <div className="w-full aspect-[4/5] relative rounded-2xl overflow-hidden shadow-xl">
                  <img src={panel.image} className="w-full h-full object-cover" alt={panel.title} />
                </div>
                <div className="px-2">
                  <div className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold opacity-60 mb-2">
                    {panel.label} - {panel.title}
                  </div>
                  <h3 className="text-xl sm:text-2xl leading-[1.3] font-medium mb-6 tracking-tight">{panel.description}</h3>
                  <button className="flex items-center gap-2 text-[11px] sm:text-xs font-bold border-b-2 border-accent text-accent pb-1 uppercase tracking-wider hover:opacity-70 transition-opacity w-fit">
                    {panel.btn}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Section CTA - Mobile */}
        <div className="w-full flex items-center justify-center pb-24 pt-8">
          <button
            type="button"
            className="group flex h-14 items-center gap-3 rounded-full bg-accent px-8 font-medium text-white text-base transition-all duration-300 hover:scale-105 hover:bg-accent-soft shadow-sm active:scale-95"
          >
            <span className="tracking-wide">Explore All Solutions</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="automation-spaces" className="relative w-full bg-background">
      <section
        ref={sectionRef}
        className={`relative h-screen w-full text-foreground overflow-hidden transition-opacity duration-500 ${!isReady ? 'opacity-0' : 'opacity-100'}`}
      >
        {/* Intro Heading */}
        <div className="section-intro absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-[50] pointer-events-none">
          <p className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold opacity-60 mb-4">
            What we do
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight leading-[1.1]">
            Tailored Automation<br />for Every Space
          </h2>
        </div>



        {/* Gallery Images Container */}
        <div className="absolute inset-0 pointer-events-none">
          {PANELS.map((panel, i) => (
            <div
              key={panel.label}
              className={`exp-img-${i} absolute overflow-hidden shadow-2xl transform-gpu pointer-events-auto`}
            >
              <img
                src={panel.image}
                alt={panel.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Dynamic Text Container */}
        <div className="absolute top-[28vh] right-[8vw] w-[28vw] h-auto flex flex-col justify-center pointer-events-none">
          {PANELS.map((panel, i) => (
            <div
              key={panel.label}
              className={`exp-text-${i} absolute top-0 left-0 w-full pointer-events-auto flex flex-col items-start`}
            >
              <div className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold opacity-60 mb-4">
                {panel.label} - {panel.title}
              </div>
              <h3 className="text-[1.1rem] lg:text-[1.3rem] xl:text-[1.6rem] leading-relaxed font-medium mb-8 tracking-tight text-foreground">
                {panel.description}
              </h3>
              <button className="flex items-center gap-2 text-[11px] sm:text-xs font-bold border-b-2 border-accent text-accent pb-1 hover:opacity-60 transition-opacity uppercase tracking-wider">
                {panel.btn}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Global Section CTA - scrolls naturally after pin */}
      <div className="relative w-full flex items-center justify-center pb-32 pt-16 bg-background">
        <button
          type="button"
          className="group flex h-14 md:h-16 items-center gap-3 rounded-full bg-accent px-8 md:px-10 font-medium text-white text-base md:text-lg transition-all duration-300 hover:scale-105 hover:bg-accent-soft shadow-sm active:scale-95"
        >
          <span className="tracking-wide">Get a Quote</span>
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
