'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

export function AudioVideoWhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;
    
    // Animate the main heading in
    gsap.fromTo(textRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    );

    // Animate the paragraph in
    gsap.fromTo(pRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    );

  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24 relative w-full bg-background px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden border-t border-black/5"
    >
      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col items-center text-center">
        
        {/* Decorative Line */}
        <div className="w-8 h-[1px] bg-accent/40 mb-8" />
        
        <h2 
          ref={textRef}
          className="text-foreground text-balance mb-8"
        >
          Why Choose <br className="hidden sm:block" /> Anusha Technovision
        </h2>
        
        <p 
          ref={pRef}
          className="text-base sm:text-lg md:text-xl font-light tracking-wide text-muted leading-relaxed text-balance max-w-3xl mx-auto"
        >
          For over 24 years, ATPL has been delivering intelligent lighting control and home automation solutions that combine world-class technology, expert execution, and dependable after-sales support. Trusted by homeowners across India, we create smart homes that are reliable, and built for the future.
        </p>

      </div>
    </section>
  );
}
