'use client';

import React, { useRef } from 'react';
import { Phone, FileSpreadsheet, Presentation, CheckCircle, Cable, Blocks, Code, FlaskConical, Handshake, ShieldCheck, ArrowRight } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { DURATION, EASE, SCROLL, STAGGER } from '../../lib/animation.config';
import { gsap, useGSAP } from '../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../lib/scrollRefresh';

const steps = [
  { id: '01', title: 'Consultation Call + Site Visit', desc: 'We begin by understanding your lifestyle, vision, and space through an in-depth consultation and on-site evaluation.', icon: Phone },
  { id: '02', title: 'Designing the BOQ', desc: 'A tailored Bill of Quantities is crafted based on your architectural drawings and specific requirements.', icon: FileSpreadsheet },
  { id: '03', title: 'BOQ Review Meeting', desc: 'We walk you through every suggested system, answering questions and refining the scope together.', icon: Presentation },
  { id: '04', title: 'Order Confirmation', desc: 'Once aligned, we lock in the specifications and initiate procurement of premium components.', icon: CheckCircle },
  { id: '05', title: 'Automation Drawings', desc: 'Detailed wiring schematics and automation layouts are shared with your electrical and construction teams.', icon: Cable },
  { id: '06', title: 'Integration of Automation', desc: 'On-site installation and integration of all automation hardware into your space with precision.', icon: Blocks },
  { id: '07', title: 'Custom Programming', desc: 'Every scene, schedule, and automation logic is custom-programmed to match your daily lifestyle.', icon: Code },
  { id: '08', title: 'Testing Site + Programmes', desc: 'Rigorous on-site testing of every system, scenario, and failover to ensure flawless operation.', icon: FlaskConical },
  { id: '09', title: 'Handover', desc: 'A complete walkthrough of your intelligent space with hands-on training for you and your family.', icon: Handshake },
  { id: '10', title: 'Customer Audit + After Installation', desc: 'Post-handover audit and ongoing support to ensure your systems perform perfectly long-term.', icon: ShieldCheck },
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) {
      gsap.set([containerRef.current, '.step-card-mobile'], {
        clearProps: 'all',
        opacity: 1,
      });
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      
      const initAnimation = () => {
        const section = sectionRef.current;
        const container = containerRef.current;
        const title = titleRef.current;
        
        if (!section || !container || !title) return;

        const scrollWidth = container.scrollWidth;
        // Move container further left so the final card reaches the center of the screen
        const xTranslate = -(scrollWidth + (window.innerWidth * 0.5));

        // Reset states in case of resize
        gsap.set(container, { x: 0 });
        gsap.set(title, { opacity: 1, x: 0, scale: 1 });
        
        const cards = gsap.utils.toArray('.step-card', section) as HTMLElement[];
        gsap.set(cards, { scale: 0.85, opacity: 0.3 }); // Initial inactive state

        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            scrub: SCROLL.scrub,
            start: "top top",
            // Extended scroll distance for 10 cards — gives each card ample reading time
            end: () => `+=${scrollWidth + window.innerHeight * 3}`,
            pin: true,
            anticipatePin: SCROLL.anticipatePin,
            invalidateOnRefresh: true,
          }
        });

        // 1. Hold phase: Empty tween creates a "pause" where user just reads the centered title
        masterTl.to({}, { duration: 0.08 });

        // 2. Title fades out and scales down slightly
        masterTl.to(title, {
          opacity: 0,
          scale: 0.95,
          y: -40,
          duration: DURATION.instant,
          ease: EASE.smooth
        }, 0.08);

        // 3. Cards container moves in from off-screen right
        masterTl.to(container, {
          x: xTranslate,
          ease: EASE.none,
          duration: 1
        }, 0.08);

        // 4. Final Hold Phase: Keeps the last card on screen before unpinning
        masterTl.to({}, { duration: 0.2 });

        // 5. Individual card scaling using containerAnimation — wider activation zones
        cards.forEach((card) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              containerAnimation: masterTl,
              start: "left 75%",
              end: "left 45%",
              scrub: true,
            }
          });
          
          tl.to(card, { scale: 1.05, opacity: 1, duration: 1, ease: EASE.smooth });
          
          gsap.to(card, {
            scale: 0.85,
            opacity: 0.3,
            ease: EASE.smooth,
            scrollTrigger: {
              trigger: card,
              containerAnimation: masterTl,
              start: "left 20%",
              end: "left -10%",
              scrub: true,
            }
          });
        });

        // Crucial: Queue a global refresh so downstream sections (like FeaturedProjects)
        // can recalculate their start markers based on the pinSpacing we just added here.
        scheduleScrollRefresh();
      };

      initAnimation();
    });

    mm.add("(max-width: 767px)", () => {
      const cards = gsap.utils.toArray('.step-card-mobile', sectionRef.current);
        
      gsap.from(cards, {
        scrollTrigger: {
          trigger: '.process-mobile-container',
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: DURATION.normal,
        stagger: STAGGER.wide,
        ease: EASE.reveal
      });
    });

    return () => {
      mm.revert();
    };

  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="process-section relative z-30 isolate bg-background border-t border-border overflow-hidden"
      id="process"
    >
      {/* DESKTOP LAYOUT (Pinned Screen) */}
      <div className="relative hidden h-screen md:flex items-center justify-center overflow-hidden">
        
        {/* Title Block - Centered initially */}
        <div ref={titleRef} className="absolute z-20 text-center w-full max-w-4xl px-8 pointer-events-none">
          <h2 className="text-[2.5rem] md:text-[4rem] lg:text-[6rem] font-semibold text-foreground tracking-tight leading-[1.05] mb-4 md:mb-6">
            Our Approach
          </h2>
          <p className="text-base md:text-[22px] lg:text-[28px] text-muted font-medium tracking-tight">
            A seamless journey from consultation to long-term support.
          </p>
        </div>

        {/* Horizontal Scrolling Area - Starts entirely offscreen to the right */}
        <div ref={containerRef} className="absolute top-0 left-full h-full flex items-center z-10 w-max">
          <div className="flex gap-8 md:gap-12 lg:gap-16 items-center h-full px-[10vw] md:px-[15vw]">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.id} 
                  className="motion-layer step-card w-[320px] md:w-[380px] lg:w-[420px] shrink-0 bg-panel/80 backdrop-blur-2xl rounded-[28px] md:rounded-[32px] p-7 md:p-8 lg:p-10 border border-border shadow-lg"
                >
                  <div className="flex items-center justify-between mb-7 md:mb-8 lg:mb-10">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-accent text-white shadow-sm">
                      <Icon size={24} />
                    </div>
                    <span className="text-[13px] font-bold tracking-[0.2em] uppercase text-accent">
                      Step {step.id}
                    </span>
                  </div>
                  
                  <h3 className="text-xl md:text-[24px] lg:text-[26px] font-semibold text-foreground mb-3 md:mb-4 tracking-tight">{step.title}</h3>
                  <p className="text-muted text-[15px] md:text-[17px] leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
            
            {/* Final CTA Card */}
            <div className="motion-layer step-card w-[320px] md:w-[380px] lg:w-[420px] shrink-0 bg-surface-darker rounded-[28px] md:rounded-[32px] p-7 md:p-8 lg:p-10 border border-border shadow-lg">
              <div className="w-12 md:w-14 h-12 md:h-14 rounded-full border border-border bg-panel shadow-sm flex items-center justify-center text-foreground mb-7 md:mb-8 lg:mb-10">
                <ArrowRight size={24} />
              </div>
              <h3 className="text-xl md:text-[24px] lg:text-[28px] font-semibold text-foreground mb-3 md:mb-4 tracking-tight">Ready to begin?</h3>
              <p className="text-muted text-[15px] md:text-[17px] leading-relaxed mb-7 md:mb-8 lg:mb-10">Take the first step towards your intelligent luxury living space.</p>
              <button type="button" className="bg-accent text-white hover:bg-accent-soft shadow-sm px-8 py-4 rounded-full text-[16px] font-semibold flex items-center gap-2 transition-all w-max">
                Book a Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE LAYOUT (Vertical Stack) */}
      <div className="process-mobile-container md:hidden px-5 sm:px-6 py-16 sm:py-20 md:py-24 flex flex-col gap-5 sm:gap-6 relative z-10">
        <div className="mb-12">
          <h2 className="text-[2rem] sm:text-[2.5rem] font-semibold text-foreground tracking-tight leading-[1.1] mb-3 sm:mb-4">
            Our Approach
          </h2>
          <p className="text-[15px] sm:text-[17px] text-muted font-medium tracking-tight">
            A seamless journey from consultation to long-term support.
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-0 left-8 sm:left-10 w-[2px] h-full bg-border z-0" />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="step-card-mobile relative z-10 bg-panel rounded-xl sm:rounded-[24px] p-5 sm:p-6 md:p-8 shadow-lg border border-border flex gap-4 sm:gap-5 mb-4 sm:mb-6">
                <div className="absolute top-10 -left-[19px] w-3 h-3 rounded-full bg-accent ring-4 ring-background" />
                <div className="shrink-0 mt-1">
                   <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border bg-surface-darker text-accent shadow-sm flex items-center justify-center">
                     <Icon size={16} className="sm:hidden" />
                     <Icon size={18} className="hidden sm:block" />
                   </div>
                </div>
                <div>
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-accent block mb-1.5 sm:mb-2">Step {step.id}</span>
                  <h3 className="text-base sm:text-lg md:text-[20px] font-semibold text-foreground mb-1.5 sm:mb-2 tracking-tight">{step.title}</h3>
                  <p className="text-muted text-[13px] sm:text-[15px] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}

          <div className="step-card-mobile relative z-10 bg-surface-darker rounded-xl sm:rounded-[24px] p-6 sm:p-8 mt-2 sm:mt-4 text-center border border-border shadow-xl">
            <h3 className="text-xl sm:text-[24px] font-semibold text-foreground mb-2 sm:mb-3 tracking-tight">Ready to begin?</h3>
            <p className="text-muted text-[13px] sm:text-[15px] leading-relaxed mb-6 sm:mb-8">Take the first step towards your intelligent living space.</p>
            <button type="button" className="w-full bg-accent text-white hover:bg-accent-soft shadow-sm px-5 sm:px-6 py-3.5 sm:py-4 rounded-full text-[14px] sm:text-[16px] font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
              Book a Consultation <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
