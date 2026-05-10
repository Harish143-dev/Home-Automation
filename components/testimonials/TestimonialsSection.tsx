'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { gsap, useGSAP } from '../../lib/gsapSetup';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const TESTIMONIALS = [
  {
    id: 1,
    name: "James Carter",
    role: "Owner, The Glass Pavilion",
    quote: "The level of integration is entirely invisible until you need it. The home anticipates our needs, adjusting climate and circadian lighting flawlessly. It is nothing short of structural magic.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
    bgImage: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: 2,
    name: "Sarah Lin",
    role: "Director, Aura Hotel Residences",
    quote: "Our guests demand absolute perfection, and this system delivers. The personalized scenes and instant responsiveness have completely redefined our standard for bespoke luxury hospitality.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    bgImage: "https://images.unsplash.com/photo-1542314831-c6a4d14b0df6?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: 3,
    name: "Michael Torres",
    role: "Lead Architect, Horizon Tower",
    quote: "From a design perspective, we never had to compromise. The hardware is elegantly minimal, and the environmental automation achieved our zero-waste energy goals ahead of schedule.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    bgImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: 4,
    name: "Emma Richardson",
    role: "Resident, Estate On The Cliff",
    quote: "Living on the coast brings unique challenges, but the predictive HVAC and robust security perimeter give us absolute peace of mind. It feels less like technology and more like a dedicated staff.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    bgImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: 5,
    name: "David Kelling",
    role: "GM, Lumina Resort",
    quote: "The choreographed lighting and landscape audio seamlessly guide our guests through the property. It creates an ambient, emotional connection to the resort that traditional systems simply cannot match.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    bgImage: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80"
  }
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const activeContentRef = useRef<HTMLDivElement>(null);
  
  const { isMobile, isReady } = useBreakpoint();
  const prefersReducedMotion = useReducedMotion();

  // Auto-rotate testimonials
  useEffect(() => {
    if (isHovering || prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovering, prefersReducedMotion]);

  // GSAP Animations for the active content (Quote line-by-line reveal, stars)
  useGSAP(() => {
    if (!activeContentRef.current || prefersReducedMotion) return;

    // Reset properties before animation
    gsap.set('.tm-quote-word', { opacity: 0, y: 15 });
    gsap.set('.tm-client-info', { opacity: 0, x: -20 });
    gsap.set('.tm-star', { opacity: 0, scale: 0.5 });
    gsap.set('.tm-cta', { opacity: 0, y: 10 });

    const tl = gsap.timeline();

    tl.to('.tm-quote-word', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.03,
      ease: 'power3.out',
      delay: 0.2 // Small delay to let physical cards transition
    })
    .to('.tm-client-info', {
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, "-=0.3")
    .to('.tm-star', {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      stagger: 0.05,
      ease: 'back.out(1.5)'
    }, "-=0.4")
    .to('.tm-cta', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out'
    }, "-=0.3");

  }, { scope: activeContentRef, dependencies: [activeIndex, prefersReducedMotion] });

  // Floating animation for preview cards
  useGSAP(() => {
    if (isMobile || prefersReducedMotion || !sectionRef.current) return;
    
    gsap.to('.tm-floating-card', {
      y: '+=15',
      rotationZ: '+=1',
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      stagger: {
        each: 0.5,
        from: 'random'
      }
    });
  }, { scope: sectionRef, dependencies: [isMobile, prefersReducedMotion] });

  // Helper to split quote into span words for cinematic reveal
  const renderQuote = (quote: string) => {
    return quote.split(' ').map((word, i) => (
      <span key={i} className="tm-quote-word inline-block mr-[0.25em] opacity-0">
        {word}
      </span>
    ));
  };

  // Calculate transform and styling for desktop cards based on their distance from active
  const getCardStyles = (index: number) => {
    const diff = (index - activeIndex + TESTIMONIALS.length) % TESTIMONIALS.length;
    
    let base = "absolute top-1/2 left-1/2 w-[90%] sm:w-[700px] lg:w-[860px] h-[440px] lg:h-[480px] rounded-[24px] lg:rounded-[32px] transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] origin-center ";
    let styles: React.CSSProperties = {};

    switch (diff) {
      case 0: // Center (Active)
        base += "z-40 opacity-100 cursor-default shadow-[0_30px_100px_rgba(0,0,0,0.8)]";
        styles = { transform: 'translate(-50%, -50%) scale(1)' };
        break;
      case 1: // Right Top (Preview)
        base += "tm-floating-card z-30 opacity-50 hover:opacity-100 cursor-pointer hover:z-50 shadow-2xl";
        styles = { transform: 'translate(calc(-50% + 28vw), calc(-50% - 14vh)) scale(0.65) rotate(5deg)' };
        break;
      case 2: // Right Bottom (Preview)
        base += "tm-floating-card z-20 opacity-20 hover:opacity-60 cursor-pointer hover:z-50 shadow-2xl";
        styles = { transform: 'translate(calc(-50% + 18vw), calc(-50% + 16vh)) scale(0.45) rotate(-4deg)' };
        break;
      case 3: // Left Bottom (Preview)
        base += "tm-floating-card z-20 opacity-20 hover:opacity-60 cursor-pointer hover:z-50 shadow-2xl";
        styles = { transform: 'translate(calc(-50% - 18vw), calc(-50% + 16vh)) scale(0.45) rotate(4deg)' };
        break;
      case 4: // Left Top (Preview)
        base += "tm-floating-card z-30 opacity-50 hover:opacity-100 cursor-pointer hover:z-50 shadow-2xl";
        styles = { transform: 'translate(calc(-50% - 28vw), calc(-50% - 14vh)) scale(0.65) rotate(-5deg)' };
        break;
    }
    return { className: base, style: styles };
  };

  if (!isReady) return <section className="h-screen bg-background w-full" />;

  return (
    <section 
      ref={sectionRef} 
      className="relative flex flex-col justify-center w-full min-h-[100vh] lg:min-h-[1000px] bg-background overflow-hidden py-24 border-t border-border"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* 🎬 Cinematic Background Crossfade */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {TESTIMONIALS.map((t, i) => (
          <Image
            key={`bg-${t.id}`}
            src={t.bgImage}
            alt=""
            fill
            sizes="100vw"
            className={`object-cover transition-opacity duration-[1200ms] ease-in-out ${i === activeIndex ? 'opacity-40' : 'opacity-0'}`}
          />
        ))}
        {/* Gradients to ensure text readability and create depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-transparent opacity-90" />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[6px]" />
      </div>

      {/* 🎯 Section Header */}
      <div className="relative z-50 px-6 max-w-4xl mx-auto text-center mb-auto pt-10 md:pt-0 pointer-events-none">
        <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-semibold tracking-tight text-foreground leading-[1.1] mb-4">
          What Our Clients Say
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-muted font-medium max-w-2xl mx-auto leading-relaxed">
          Real experiences from homeowners, hospitality brands, and businesses who transformed their spaces through intelligent automation.
        </p>
      </div>

      {/* 🖼️ Desktop/Tablet Layout: Cinematic Floating Carousel */}
      <div className="hidden md:block relative z-20 w-full h-[600px] mt-10">
        {TESTIMONIALS.map((testimonial, index) => {
          const isActive = index === activeIndex;
          const { className, style } = getCardStyles(index);
          
          return (
            <div 
              key={testimonial.id} 
              className={className} 
              style={style}
              onClick={() => !isActive && setActiveIndex(index)}
              role="button"
              tabIndex={isActive ? -1 : 0}
              aria-label={`View testimonial from ${testimonial.name}`}
            >
              {/* Inner Wrapper for Hover Scale on Preview Cards */}
              <div className={`relative w-full h-full overflow-hidden rounded-[24px] lg:rounded-[32px] transition-transform duration-500 ease-out ${!isActive ? 'group hover:scale-105' : ''}`}>
                
                {/* --- ACTIVE CONTENT (Only visible when isActive) --- */}
                <div 
                  ref={isActive ? activeContentRef : null}
                  className={`absolute inset-0 p-10 lg:p-14 flex flex-col justify-between bg-panel/80 backdrop-blur-3xl border border-border shadow-xl transition-opacity duration-700 ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                >
                  <Quote className="absolute top-10 right-10 w-24 h-24 text-black/[0.03] rotate-180 pointer-events-none" />
                  
                  <div className="relative z-10 max-w-3xl mt-4">
                    <p className="text-xl lg:text-[26px] leading-[1.6] lg:leading-[1.7] text-foreground font-medium tracking-tight">
                      {isActive && renderQuote(testimonial.quote)}
                    </p>
                  </div>

                  <div className="relative z-10 flex items-end justify-between mt-12 border-t border-border pt-8">
                    <div className="flex items-center gap-5 tm-client-info">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-border shadow-sm shrink-0">
                        <Image src={testimonial.avatar} alt={testimonial.name} fill sizes="64px" className="object-cover" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground tracking-tight">{testimonial.name}</h3>
                        <p className="text-sm text-muted font-medium mt-1">{testimonial.role}</p>
                        <div className="flex items-center gap-1 mt-2.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent tm-star" />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <button type="button" className="tm-cta group/btn flex items-center gap-3 bg-accent text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-accent-soft shadow-sm transition-all shrink-0">
                      View Project
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* --- PREVIEW CONTENT (Visible when inactive / floating) --- */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 bg-surface-darker backdrop-blur-xl border border-border shadow-sm transition-opacity duration-700 ${!isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                   <div className="relative w-24 h-24 rounded-full overflow-hidden border border-border shadow-sm mb-6 group-hover:scale-110 transition-transform duration-500">
                     <Image src={testimonial.avatar} alt={testimonial.name} fill sizes="96px" className="object-cover" />
                   </div>
                   <h3 className="text-2xl font-bold text-foreground mb-1">{testimonial.name}</h3>
                   <p className="text-sm text-muted text-center">{testimonial.role}</p>
                   <p className="text-muted italic text-center mt-6 text-lg max-w-sm line-clamp-2 leading-relaxed">
                     &quot;{testimonial.quote}&quot;
                   </p>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* 📱 Mobile Layout: Horizontal Swipe Cards */}
      <div className="md:hidden relative z-20 w-full mt-10">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-12 scrollbar-hide">
          {TESTIMONIALS.map((testimonial) => (
            <div 
              key={`mob-${testimonial.id}`} 
              className="min-w-[88vw] snap-center shrink-0 bg-panel backdrop-blur-xl border border-border shadow-sm rounded-[28px] p-7 sm:p-8 flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-[0.05]">
                <Quote size={80} className="rotate-180" />
              </div>

              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              
              <p className="text-[17px] leading-[1.6] text-foreground font-medium mb-10 relative z-10">
                &quot;{testimonial.quote}&quot;
              </p>

              <div className="mt-auto flex items-center gap-4 pt-6 border-t border-border relative z-10">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-sm border border-border">
                  <Image src={testimonial.avatar} alt={testimonial.name} fill sizes="48px" className="object-cover" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">{testimonial.name}</h3>
                  <p className="text-[12px] text-muted mt-0.5">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Simple progress dots for mobile */}
        <div className="flex items-center justify-center gap-2 mt-2">
          {TESTIMONIALS.map((_, i) => (
            <div key={`dot-${i}`} className="w-1.5 h-1.5 rounded-full bg-border" />
          ))}
          <span className="text-[10px] uppercase tracking-widest text-muted ml-2 font-semibold">Swipe to explore</span>
        </div>
      </div>

    </section>
  );
}
