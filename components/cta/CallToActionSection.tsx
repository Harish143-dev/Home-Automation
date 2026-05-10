'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, Phone } from 'lucide-react';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsapSetup';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function CallToActionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  
  const prefersReducedMotion = useReducedMotion();

  // Create SVG noise pattern for the cinematic film grain overlay
  const noiseSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E`;

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    // 1. Background Scroll Parallax & Zoom effect
    gsap.to(bgRef.current, {
      scale: 1.15,
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    // 2. Cinematic Content Reveal Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate words of the headline
    const words = gsap.utils.toArray('.cta-word');
    tl.fromTo(words, 
      { y: 50, opacity: 0, rotateX: -30, scale: 0.95 },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0, 
        scale: 1, 
        duration: 0.8, 
        stagger: 0.08, 
        ease: 'power4.out',
        transformOrigin: 'bottom center'
      }
    )
    // Subheading
    .fromTo('.cta-subhead',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      "-=0.4"
    )
    // Buttons
    .fromTo('.cta-btn',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.5)' },
      "-=0.5"
    );

    // 3. Floating ambient particles
    gsap.to('.ambient-particle', {
      y: 'random(-50, 50)',
      x: 'random(-30, 30)',
      opacity: 'random(0.3, 0.8)',
      scale: 'random(0.8, 1.2)',
      duration: 'random(3, 6)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        amount: 2,
        from: 'random'
      }
    });

  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  // Helper to split headline for stagger animation
  const splitHeadline = "Ready to Transform Your Space?".split(' ');

  return (
    <section 
      ref={sectionRef} 
      className="relative flex items-center justify-center w-full h-screen min-h-[600px] lg:min-h-[800px] bg-background overflow-hidden perspective-[1000px]"
      id="contact"
    >
      {/* 🎬 LAYER 1: Background & Cinematic Motion */}
      <div 
        ref={bgRef} 
        className="absolute inset-0 z-0 origin-center scale-105"
      >
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury Smart Home Automation"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-40 mix-blend-luminosity"
          priority
        />
      </div>

      {/* 🌫️ LAYER 2: Overlays, Gradients, and Glows */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Soft vignette/gradient from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-90" />
        
        {/* Deep blue/gold ambient glow behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] h-[50vh] bg-[radial-gradient(ellipse_at_center,rgba(25,35,50,0.6)_0%,transparent_70%)] blur-[80px]" />
        
        {/* Film grain noise overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: `url("${noiseSvg}")`, backgroundRepeat: 'repeat' }} 
        />

        {/* Ambient floating particles */}
        <div className="absolute inset-0 overflow-hidden hidden md:block">
          {[...Array(12)].map((_, i) => {
            // Deterministic pseudo-random values based on index to prevent SSR hydration mismatch
            const r1 = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
            const r2 = Math.abs(Math.sin(i * 78.233) * 43758.5453) % 1;
            const r3 = Math.abs(Math.sin(i * 45.123) * 43758.5453) % 1;
            const r4 = Math.abs(Math.sin(i * 93.432) * 43758.5453) % 1;
            const r5 = Math.abs(Math.sin(i * 23.456) * 43758.5453) % 1;

            return (
              <div 
                key={i}
                className="ambient-particle absolute rounded-full bg-black/10 blur-[2px]"
                style={{
                  width: (r1 * 4 + 2).toFixed(3) + 'px',
                  height: (r2 * 4 + 2).toFixed(3) + 'px',
                  top: (r3 * 100).toFixed(3) + '%',
                  left: (r4 * 100).toFixed(3) + '%',
                  opacity: (r5 * 0.5 + 0.1).toFixed(3)
                }}
              />
            );
          })}
        </div>
      </div>

      {/* 💎 LAYER 3: Foreground Content */}
      <div 
        ref={contentRef}
        className="relative z-20 flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-6 text-center"
      >
        <h2 
          ref={headlineRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-foreground mb-6 md:mb-8"
        >
          {splitHeadline.map((word, i) => (
            <span 
              key={i} 
              className="cta-word inline-block mr-[0.25em] last:mr-0 drop-shadow-sm"
            >
              {word}
            </span>
          ))}
        </h2>

        <p className="cta-subhead text-lg sm:text-xl md:text-2xl text-muted font-medium max-w-2xl mx-auto leading-relaxed mb-12 sm:mb-16">
          Experience seamless automation designed around your lifestyle and business needs.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 w-full sm:w-auto">
          {/* Primary CTA */}
          <button 
            type="button" 
            className="cta-btn group relative flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 sm:py-5 bg-accent text-white rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:bg-accent-soft active:scale-95 shadow-sm"
          >
            {/* Hover light sweep effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[sweep_1s_ease-in-out_forwards]" />
            
            <span className="relative z-10 text-base sm:text-lg font-semibold tracking-wide">
              Book Consultation
            </span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          {/* Secondary CTA */}
          <button 
            type="button" 
            className="cta-btn group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 sm:py-5 bg-surface-darker text-foreground border border-border rounded-full transition-all duration-500 hover:bg-panel active:scale-95 backdrop-blur-sm shadow-sm"
          >
            <Phone className="w-5 h-5 text-muted group-hover:text-foreground transition-colors duration-300" />
            <span className="text-base sm:text-lg font-semibold tracking-wide">
              Call Now
            </span>
          </button>
        </div>
      </div>
      
    </section>
  );
}
