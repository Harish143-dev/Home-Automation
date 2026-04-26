'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Lightbulb, PenTool, Wrench, Cpu, ShieldCheck, ArrowRight } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { scheduleScrollRefresh } from '../../lib/scrollRefresh';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const steps = [
  { id: '01', title: 'Consultation', desc: 'Understanding your vision and evaluating spatial requirements to create a personalized baseline.', icon: Lightbulb },
  { id: '02', title: 'Design & Planning', desc: 'Crafting tailored architectural blueprints for seamless and invisible automation integration.', icon: PenTool },
  { id: '03', title: 'Installation', desc: 'Precision wiring and premium hardware setup executed by our certified engineering experts.', icon: Wrench },
  { id: '04', title: 'Integration', desc: 'Programming the ecosystem for intuitive, unified control across all your devices.', icon: Cpu },
  { id: '05', title: 'Support', desc: 'Ongoing proactive system health monitoring, updates, and dedicated VIP maintenance.', icon: ShieldCheck }
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
        
        const cards = gsap.utils.toArray('.step-card') as HTMLElement[];
        gsap.set(cards, { scale: 0.85, opacity: 0.3 }); // Initial inactive state

        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            scrub: 1,
            start: "top top",
            // Prolong the scroll distance so the user has time to scroll through everything comfortably
            end: () => `+=${scrollWidth + window.innerHeight * 2.5}`, 
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });

        // 1. Hold phase: Empty tween creates a "pause" where user just reads the centered title
        masterTl.to({}, { duration: 0.1 });

        // 2. Title fades out and scales down slightly
        masterTl.to(title, {
          opacity: 0,
          scale: 0.95,
          y: -40,
          duration: 0.2,
          ease: "power2.inOut"
        }, 0.1);

        // 3. Cards container moves in from off-screen right
        masterTl.to(container, {
          x: xTranslate,
          ease: "none",
          duration: 1
        }, 0.1);

        // 4. Final Hold Phase: Empty tween keeps the last card on screen before unpinning
        masterTl.to({}, { duration: 0.15 });

        // 5. Individual card scaling using containerAnimation
        cards.forEach((card) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              containerAnimation: masterTl,
              start: "left 65%",
              end: "left 35%",
              scrub: true,
            }
          });
          
          tl.to(card, { scale: 1.05, opacity: 1, duration: 1, ease: "power2.inOut" });
          
          gsap.to(card, {
            scale: 0.85,
            opacity: 0.3,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: card,
              containerAnimation: masterTl,
              start: "left 15%",
              end: "left -15%",
              scrub: true,
            }
          });
        });

        // Crucial: Queue a global refresh so downstream sections (like FeaturedProjects)
        // can recalculate their start markers based on the pinSpacing we just added here.
        scheduleScrollRefresh();
      };

      // Use a standard delay to allow React to paint the DOM, but not so long that it 
      // executes after downstream components. scheduleScrollRefresh will handle the rest.
      gsap.delayedCall(0.1, () => {
        requestAnimationFrame(initAnimation);
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.delayedCall(0.5, () => {
        const cards = gsap.utils.toArray('.step-card-mobile');
        
        gsap.from(cards, {
          scrollTrigger: {
            trigger: '.process-mobile-container',
            start: "top 80%",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out"
        });
      });
    });

  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="process-section relative z-30 isolate bg-[#FAFAFC] border-t border-[#E5E5EA] overflow-hidden"
    >
      {/* DESKTOP LAYOUT (Pinned Screen) */}
      <div className="relative hidden h-screen md:flex items-center justify-center overflow-hidden">
        
        {/* Title Block - Centered initially */}
        <div ref={titleRef} className="absolute z-20 text-center w-full max-w-4xl px-8 pointer-events-none">
          <h2 className="text-[4rem] lg:text-[6rem] font-semibold text-[#1D1D1F] tracking-tight leading-[1.05] mb-6">
            Our Approach
          </h2>
          <p className="text-[22px] lg:text-[28px] text-[#86868B] font-medium tracking-tight">
            A seamless journey from consultation to long-term support.
          </p>
        </div>

        {/* Horizontal Scrolling Area - Starts entirely offscreen to the right */}
        <div ref={containerRef} className="absolute top-0 left-full h-full flex items-center z-10 w-max">
          <div className="flex gap-16 items-center h-full px-[15vw]">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.id} 
                  className="step-card w-[420px] shrink-0 bg-white/80 backdrop-blur-2xl rounded-[32px] p-10 border border-black/[0.04] shadow-[0_30px_60px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex items-center justify-between mb-10">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#0066CC] text-white shadow-lg shadow-blue-500/20">
                      <Icon size={24} />
                    </div>
                    <span className="text-[13px] font-bold tracking-[0.2em] uppercase text-[#0066CC]">
                      Step {step.id}
                    </span>
                  </div>
                  
                  <h3 className="text-[26px] font-semibold text-[#1D1D1F] mb-4 tracking-tight">{step.title}</h3>
                  <p className="text-[#86868B] text-[17px] leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
            
            {/* Final CTA Card */}
            <div className="step-card w-[420px] shrink-0 bg-[#1D1D1F] rounded-[32px] p-10 border border-black/10 shadow-[0_30px_60px_rgba(0,0,0,0.2)]">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white mb-10">
                <ArrowRight size={24} />
              </div>
              <h3 className="text-[28px] font-semibold text-white mb-4 tracking-tight">Ready to begin?</h3>
              <p className="text-[#A1A1A6] text-[17px] leading-relaxed mb-10">Take the first step towards your intelligent luxury living space.</p>
              <button type="button" className="bg-white text-black px-8 py-4 rounded-full text-[16px] font-semibold flex items-center gap-2 hover:bg-white/90 transition-colors w-max">
                Book a Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE LAYOUT (Vertical Stack) */}
      <div className="process-mobile-container md:hidden px-6 py-24 flex flex-col gap-6 relative z-10">
        <div className="mb-12">
          <h2 className="text-[2.5rem] font-semibold text-[#1D1D1F] tracking-tight leading-[1.1] mb-4">
            Our Approach
          </h2>
          <p className="text-[17px] text-[#86868B] font-medium tracking-tight">
            A seamless journey from consultation to long-term support.
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-0 left-10 w-[2px] h-full bg-[#E5E5EA] z-0" />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="step-card-mobile relative z-10 bg-white rounded-[24px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-black/[0.04] flex gap-5 mb-6">
                <div className="absolute top-10 -left-[19px] w-3 h-3 rounded-full bg-[#0066CC] ring-4 ring-[#FAFAFC]" />
                <div className="shrink-0 mt-1">
                   <div className="w-10 h-10 rounded-full bg-[#F5F5F7] text-[#0066CC] flex items-center justify-center">
                     <Icon size={18} />
                   </div>
                </div>
                <div>
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#0066CC] block mb-2">Step {step.id}</span>
                  <h3 className="text-[20px] font-semibold text-[#1D1D1F] mb-2 tracking-tight">{step.title}</h3>
                  <p className="text-[#86868B] text-[15px] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}

          <div className="step-card-mobile relative z-10 bg-[#1D1D1F] rounded-[24px] p-8 mt-4 text-center border border-white/10 shadow-xl">
            <h3 className="text-[24px] font-semibold text-white mb-3 tracking-tight">Ready to begin?</h3>
            <p className="text-[#A1A1A6] text-[15px] leading-relaxed mb-8">Take the first step towards your intelligent living space.</p>
            <button type="button" className="w-full bg-white text-black px-6 py-4 rounded-full text-[16px] font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
              Book a Consultation <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

