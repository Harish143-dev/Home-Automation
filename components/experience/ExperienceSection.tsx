'use client';

import React, { useRef } from 'react';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap, useGSAP } from '../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../lib/scrollRefresh';

const EXPERIENCES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop", 
    title: "Intelligent Architecture",
    description: "Leave traditional living behind and step into spaces that adapt to your every need."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1558036117-15d82a90b9f1?q=80&w=2070&auto=format&fit=crop", 
    title: "Seamless Integration",
    description: "Sit back and enjoy. Breathtaking automated environments come standard with every room."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop", 
    title: "Effortless Control",
    description: "A symphony of technology working silently in the background to elevate your everyday."
  }
];

// Layout Slots for GSAP animations
const SLOTS = {
  center: { top: '15vh', left: '20vw', width: '40vw', height: '70vh', borderRadius: '24px', opacity: 1 },
  topLeft: { top: '5vh', left: '5vw', width: '10vw', height: '10vw', borderRadius: '16px', opacity: 1 },
  bottomRight: { top: '75vh', left: '85vw', width: '10vw', height: '10vw', borderRadius: '16px', opacity: 1 },
  hidden: { top: '75vh', left: '85vw', width: '10vw', height: '10vw', borderRadius: '16px', opacity: 0 }
};

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isMobile, isReady } = useBreakpoint();
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || isMobile || !isReady || prefersReducedMotion) return;

    // Set Initial States for Images
    EXPERIENCES.forEach((_, i) => {
      const el = `.exp-img-${i}`;
      if (i === 0) {
        gsap.set(el, SLOTS.center);
      } else if (i === 1) {
        gsap.set(el, SLOTS.bottomRight);
      } else {
        gsap.set(el, SLOTS.hidden);
      }

      const textEl = `.exp-text-${i}`;
      gsap.set(textEl, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 20 });
    });

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${EXPERIENCES.length * 150}%`, // 150vh per slide for buttery slow scrubbing
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // Create transitions between each image
    for (let i = 0; i < EXPERIENCES.length - 1; i++) {
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
      if (i + 2 < EXPERIENCES.length) {
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
      <section className="bg-[#F3F2E8] py-20 px-5 text-[#0A1118]">
        <h2 className="text-3xl font-bold mb-12 px-2 text-center">Experience Highlights</h2>
        <div className="flex flex-col gap-16">
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="flex flex-col gap-6">
              <div className="w-full aspect-[4/5] relative rounded-2xl overflow-hidden shadow-xl">
                <img src={exp.image} className="w-full h-full object-cover" alt={exp.title} />
              </div>
              <div className="px-2">
                <h3 className="text-2xl leading-[1.2] font-medium mb-6 tracking-tight">{exp.description}</h3>
                <button className="text-sm font-bold border-b-2 border-[#0A1118] pb-1 uppercase tracking-wider hover:opacity-70 transition-opacity">
                  Discover the Experience
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef} 
      id="experience" 
      className={`relative h-screen w-full bg-[#F3F2E8] text-[#0A1118] overflow-hidden transition-opacity duration-500 ${!isReady ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Sticky Bottom Labels */}
      <div className="absolute bottom-[5vh] left-[5vw] text-[10px] sm:text-xs uppercase tracking-widest font-semibold opacity-60">
        Experience Highlights
      </div>
      <div className="absolute bottom-[5vh] right-[5vw] text-[10px] sm:text-xs uppercase tracking-widest font-semibold opacity-60">
        Next Feature
      </div>

      {/* Gallery Images Container */}
      <div className="absolute inset-0 pointer-events-none">
        {EXPERIENCES.map((exp, i) => (
          <div 
            key={exp.id} 
            className={`exp-img-${i} absolute overflow-hidden shadow-2xl transform-gpu pointer-events-auto`}
          >
            {/* Standard img tag instead of NextImage to avoid domain configuration errors with external placeholders */}
            <img 
              src={exp.image} 
              alt={exp.title} 
              className="w-full h-full object-cover" 
            />
          </div>
        ))}
      </div>

      {/* Dynamic Text Container */}
      <div className="absolute top-[40vh] right-[10vw] w-[25vw] h-auto flex flex-col justify-center pointer-events-none">
        {EXPERIENCES.map((exp, i) => (
          <div 
            key={exp.id} 
            className={`exp-text-${i} absolute top-0 left-0 w-full pointer-events-auto flex flex-col items-start`}
          >
            <h3 className="text-[1.3rem] lg:text-[1.8rem] xl:text-[2.2rem] leading-snug font-medium mb-8 tracking-tight text-[#0A1118]">
              {exp.description}
            </h3>
            <button className="text-sm font-bold border-b-2 border-[#0A1118] pb-1 hover:opacity-60 transition-opacity inline-block">
              Discover the Experience
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
