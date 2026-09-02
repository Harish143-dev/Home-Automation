'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { MapPin } from 'lucide-react';

const PROJECT = {
  title: "Wave Cinemas",
  asset: "Gurgaon",
  image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2000&auto=format&fit=crop",
};

export function MultiplexesProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current || !containerRef.current) return;

    // Animate header text
    gsap.fromTo('.project-header',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Animate the image container scaling up slightly
    gsap.fromTo(containerRef.current,
      { opacity: 0, scale: 0.95, clipPath: 'inset(10% 10% 10% 10% round 2rem)' },
      {
        opacity: 1, 
        scale: 1, 
        clipPath: 'inset(0% 0% 0% 0% round 2rem)', 
        duration: 1.5, 
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      }
    );

    // Animate the image itself (parallax effect)
    gsap.to('.project-image', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    // Animate text overlay
    gsap.fromTo('.project-text',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        }
      }
    );

  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative w-full bg-background px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/5">
      <div className="max-w-7xl w-full mx-auto mb-12 md:mb-16 text-center flex flex-col items-center">
        <h5 className="project-header text-accent mb-4 block font-medium">
          Proven Excellence
        </h5>
        <h2 className="project-header text-foreground text-balance">
          Multiplexes We've Powered
        </h2>
        <p className="mt-6 text-muted-foreground text-lg md:text-xl font-light leading-relaxed text-balance project-header max-w-3xl">
          Delivering unparalleled visual and interactive environments for prestigious brand showcases and multiplexes across India.
        </p>
      </div>

      <div className="max-w-5xl w-full mx-auto">
        <div 
          ref={containerRef} 
          className="relative w-full aspect-[4/3] md:aspect-[21/9] lg:aspect-[24/9] rounded-[2rem] overflow-hidden group shadow-2xl shadow-black/10"
        >
          {/* Image */}
          <div className="absolute inset-0 w-full h-[120%] -top-[10%]">
            <img
              src={PROJECT.image}
              alt={PROJECT.title}
              className="project-image w-full h-full object-cover"
              draggable={false}
              loading="lazy"
            />
          </div>
          
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500" />

          {/* Text Overlay */}
          <div className="absolute bottom-0 left-0 p-8 md:p-12 lg:p-16 w-full flex flex-col items-start text-white">
            <div className="project-text flex items-center gap-2 mb-3 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
              <MapPin className="w-4 h-4 text-white" />
              <span className="text-sm font-medium tracking-wide">{PROJECT.asset}</span>
            </div>
            <h3 className="project-text text-2xl md:text-4xl lg:text-5xl text-white font-medium drop-shadow-lg">
              {PROJECT.title}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}

