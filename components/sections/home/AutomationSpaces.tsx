'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useBreakpoint } from '../../../hooks/useBreakpoint';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { ArrowRight } from 'lucide-react';
import residentialImage from "@/assets/home/services/Residence.jpg"
import hospitalityImage from "@/assets/home/services/Oberoi Rajvilas.jpg"
import commercialImage from "@/assets/home/services/EY Gurgaon.jpg"

const PANELS = [
  {
    label: '01',
    title: 'Residential',
    btn: "Discover Residential Projects",
    description: 'Engineering frictionless living for private estates. We integrate lighting, climate, and wellness systems into architectural blueprints, enabling your home to function intuitively while maintaining visual harmony.',
    image: residentialImage,
  },
  {
    label: '02',
    title: 'Hospitality',
    btn: "Discover Hospitality Projects",
    description: 'Elevating guest experiences through centralized controls. We design smart guestroom automation and atmospheric lighting architectures that optimise operational efficiency without compromising brand by integrating lighting control, energy management, climate control, and room automation.',
    image: hospitalityImage,
  },
  {
    label: '03',
    title: 'Commercial',
    btn: "Discover Commercial Projects",
    description: 'Optimizing corporate infrastructure for productivity and scale. From high performance boardroom acoustics to adaptive, energy efficient workspace controls, we deploy robust enterprise systems built for continuous uptime. Save up to 60% energy with energy management strategies.',
    image: commercialImage,
  }
];

// Layout Slots for GSAP animations
const SLOTS = {
  center: { top: '15vh', left: '20vw', width: '40vw', height: '70vh', borderRadius: '24px', autoAlpha: 1 },
  topLeft: { top: '5vh', left: '5vw', width: '10vw', height: '10vw', borderRadius: '16px', autoAlpha: 1 },
  bottomRight: { top: '75vh', left: '85vw', width: '10vw', height: '10vw', borderRadius: '16px', autoAlpha: 1 },
  hidden: { top: '75vh', left: '85vw', width: '10vw', height: '10vw', borderRadius: '16px', autoAlpha: 0 }
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
        gsap.set(el, { ...SLOTS.center, autoAlpha: 0, scale: 0.9 });
      } else {
        // All other images start hidden
        gsap.set(el, SLOTS.hidden);
      }

      const textEl = `.exp-text-${i}`;
      gsap.set(textEl, { autoAlpha: 0, y: 20 }); // ALL text starts hidden
    });

    // Heading starts visible
    gsap.set('.section-intro', { autoAlpha: 1, y: 0 });

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
      autoAlpha: 0,
      y: -30,
      duration: 0.8,
      ease: 'power2.inOut'
    }, 0);

    introTl.to('.exp-img-0', {
      autoAlpha: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power2.out'
    }, 0.5); // Image starts appearing just as heading fades out

    introTl.to('.exp-img-1', {
      ...SLOTS.bottomRight,
      duration: 0.8,
      ease: 'power2.out'
    }, 0.5); // Second preview image appears along with the first image

    introTl.to('.exp-text-0', {
      autoAlpha: 1,
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
        autoAlpha: 0,
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
        autoAlpha: 1,
        y: 0,
        ease: 'power2.out',
        duration: 0.4
      }, 0.6); // Fade in slightly after image is settling

      // 5. If there's another image waiting in line, reveal it in the bottom right slot
      if (i + 2 < PANELS.length) {
        phaseTl.to(nextNextImg, {
          autoAlpha: 1,
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
        <section className="py-16 md:py-24 text-foreground px-5 sm:px-8 md:px-16 lg:px-24">
          <div className="mb-16 px-4 text-center">
            <p className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-accent mb-4">Sectors</p>
            <h2 className="text-foreground">Environments We Transform</h2>
          </div>
          <div className="flex flex-col gap-24">
            {PANELS.map((panel) => (
              <div key={panel.label} className="flex flex-col gap-6">
                <div className="w-full aspect-[4/5] relative rounded-2xl overflow-hidden shadow-md border border-black/5">
                  <Image src={panel.image} className="object-cover" alt={panel.title} fill sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="px-4">
                  <div className="text-sm md:text-base tracking-widest font-normal text-accent mb-4">
                    {panel.label} - {panel.title}
                  </div>
                  <p className="text-lg sm:text-xl leading-[1.5] font-light mb-8 tracking-wide text-foreground/80">{panel.description}</p>
                  {panel.title === 'Residential' ? (
                    <Link href="/residential" className="flex items-center gap-2 text-sm md:text-base font-medium border-b-2 border-accent text-accent pb-1 tracking-wider hover:opacity-70 transition-opacity w-fit">
                      {panel.btn}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <button className="flex items-center gap-2 text-sm md:text-base font-medium border-b-2 border-accent text-accent pb-1 tracking-wider hover:opacity-70 transition-opacity w-fit">
                      {panel.btn}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
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
        className={`py-16 md:py-24 relative h-screen w-full text-foreground overflow-hidden transition-opacity duration-500 ${!isReady ? 'opacity-0' : 'opacity-100'}`}
      >
        {/* Intro Heading */}
        <div className="section-intro absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-[50] pointer-events-none">
          <p className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-accent mb-6">
            Sectors
          </p>
          <h2 className="text-foreground">
            Environments We Transform
          </h2>
        </div>



        {/* Gallery Images Container */}
        <div className="absolute inset-0 pointer-events-none">
          {PANELS.map((panel, i) => (
            <div
              key={panel.label}
              className={`exp-img-${i} absolute overflow-hidden shadow-lg border border-black/5 transform-gpu pointer-events-auto`}
            >
              <Image
                src={panel.image}
                alt={panel.title}
                className="object-cover"
                fill
                sizes="50vw"
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
              <div className="text-sm md:text-base tracking-widest font-normal text-accent mb-6">
                {panel.label} - {panel.title}
              </div>
              <p className="text-base md:text-lg leading-[1.5] font-light mb-10 tracking-wide text-foreground/80">
                {panel.description}
              </p>
              {panel.title === 'Residential' ? (
                <Link href="/residential" className="flex items-center gap-2 text-sm md:text-base font-medium border-b-2 border-accent text-accent pb-1 hover:opacity-60 transition-opacity tracking-wider">
                  {panel.btn}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <button className="flex items-center gap-2 text-sm md:text-base font-medium border-b-2 border-accent text-accent pb-1 hover:opacity-60 transition-opacity tracking-wider">
                  {panel.btn}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Global Section CTA - scrolls naturally after pin */}
      <div className="relative w-full flex items-center justify-center pb-16 pt-12 bg-background">
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
