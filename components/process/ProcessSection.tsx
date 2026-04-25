'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, PenTool, Wrench, Cpu, ShieldCheck, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const activeStepRef = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      
      mm.add("(min-width: 768px)", () => {
        if (!containerRef.current || !sectionRef.current || !headerRef.current) return;
        
        // Calculate horizontal scroll distance
        const scrollWidth = containerRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const xTranslate = scrollWidth - viewportWidth + 300; 

        // Initial states
        gsap.set(containerRef.current, { opacity: 0, x: 100 });
        gsap.set(".desktop-progress", { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            start: "top top", 
            end: () => `+=${xTranslate + window.innerHeight * 2}`, // Added more scroll distance
          }
        });

        // 0. Hold the heading still for a longer moment
        tl.to({}, { duration: 2 });

        // 1. Hide Header completely first
        tl.to(headerRef.current, {
          y: -100,
          opacity: 0,
          scale: 0.9,
          duration: 2,
          ease: "power2.inOut"
        });

        // 2. Show Cards & Progress Line AFTER header is gone
        tl.to(containerRef.current, {
          opacity: 1,
          x: 0,
          duration: 2,
          ease: "power2.out"
        }, ">"); // strictly after previous

        tl.to(".desktop-progress", {
          opacity: 1,
          duration: 2,
          ease: "power2.out"
        }, "<"); // sync with container fade-in

        // 3. Pause for a moment to let the user see the first card
        tl.to({}, { duration: 1 });

        // 4. Finally, start the horizontal scroll
        tl.to(containerRef.current, {
          x: -xTranslate,
          ease: "none",
          duration: 15, // much larger portion of the scroll
          onUpdate: function() {
            // "this" refers to the current tween. Update progress line and active card.
            const progress = this.progress();
            gsap.set(".progress-fill", { scaleX: progress });
            
            let current = Math.floor(progress * 6);
            if (current > 5) current = 5;
            if (current !== activeStepRef.current) {
              activeStepRef.current = current;
              setActiveStep(current);
            }
          }
        });
      });

      mm.add("(max-width: 767px)", () => {
         // Mobile animations: fade up cards sequentially as they scroll into view
         gsap.utils.toArray<HTMLElement>('.step-card-mobile').forEach((card) => {
           gsap.from(card, {
             scrollTrigger: {
               trigger: card,
               start: "top 85%",
             },
             y: 40,
             opacity: 0,
             duration: 0.8,
             ease: "power3.out"
           });
         });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="process-section relative bg-[#FAFAFC] md:h-screen md:overflow-hidden py-24 md:py-0 border-t border-[#E5E5EA]">
      {/* Header section - centered initially on desktop, static on mobile */}
      <div ref={headerRef} className="md:absolute inset-0 flex flex-col md:items-center md:justify-center md:text-center w-full px-6 md:px-12 lg:px-24 z-20 pointer-events-none mb-16 md:mb-0">
        <div className="max-w-3xl">
          <h2 className="text-[2.5rem] md:text-[5rem] font-semibold text-[#1D1D1F] tracking-tight leading-[1.1] mb-6">
            Our Approach
          </h2>
          <p className="text-[19px] md:text-[24px] text-[#86868B] font-medium tracking-tight">
            A seamless journey from consultation to long-term support.
          </p>
        </div>
      </div>

      {/* DESKTOP LAYOUT (Horizontal Scroll) */}
      <div className="hidden md:flex h-full items-center relative">
        {/* Continuous Progress Line */}
        <div className="desktop-progress absolute top-[60%] left-0 w-full h-[2px] bg-[#E5E5EA] -translate-y-1/2 z-0">
          <div className="progress-fill w-full h-full bg-[#0066CC] origin-left scale-x-0" />
        </div>

        {/* Steps Container */}
        <div ref={containerRef} className="flex gap-16 px-[35vw] relative z-10 w-max items-center h-full pt-20">
          {steps.map((step, i) => {
            const isActive = i === activeStep;
            const Icon = step.icon;

            return (
              <div 
                key={step.id} 
                className={`
                  transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] 
                  w-[420px] shrink-0 bg-white/80 backdrop-blur-2xl rounded-[32px] p-10 
                  border border-black/[0.04]
                  ${isActive ? 'scale-105 opacity-100 shadow-[0_30px_60px_rgba(0,0,0,0.06)]' : 'scale-90 opacity-40 shadow-[0_10px_20px_rgba(0,0,0,0.02)]'}
                `}
              >
                <div className="flex items-center justify-between mb-10">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-500 ${isActive ? 'bg-[#0066CC] text-white shadow-lg shadow-blue-500/20' : 'bg-[#F5F5F7] text-[#86868B]'}`}>
                    <Icon size={24} />
                  </div>
                  <span className={`text-[13px] font-bold tracking-[0.2em] uppercase transition-colors duration-500 ${isActive ? 'text-[#0066CC]' : 'text-[#86868B]'}`}>
                    Step {step.id}
                  </span>
                </div>
                
                <h3 className="text-[26px] font-semibold text-[#1D1D1F] mb-4 tracking-tight">{step.title}</h3>
                <p className="text-[#86868B] text-[17px] leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
          
          {/* Final CTA Card */}
          <div className={`
              transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] 
              w-[420px] shrink-0 bg-[#1D1D1F] rounded-[32px] p-10 
              border border-black/10
              ${activeStep === 5 ? 'opacity-100 scale-105 shadow-[0_30px_60px_rgba(0,0,0,0.2)]' : 'opacity-40 scale-90'}
            `}>
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white mb-10">
              <ArrowRight size={24} />
            </div>
            <h3 className="text-[28px] font-semibold text-white mb-4 tracking-tight">Ready to begin?</h3>
            <p className="text-[#A1A1A6] text-[17px] leading-relaxed mb-10">Take the first step towards your intelligent luxury living space.</p>
            <button className="bg-white text-black px-8 py-4 rounded-full text-[16px] font-semibold flex items-center gap-2 hover:bg-gray-100 transition-colors w-max">
              Book a Consultation
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE LAYOUT (Vertical Stack) */}
      <div className="md:hidden px-6 flex flex-col gap-6 relative mt-10 z-10">
        {/* Vertical Progress Line */}
        <div className="absolute top-0 left-10 w-[2px] h-full bg-[#E5E5EA] z-0" />

        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="step-card-mobile relative z-10 bg-white rounded-[24px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-black/[0.04] flex gap-5">
              {/* Connector Dot */}
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
          <button className="w-full bg-white text-black px-6 py-4 rounded-full text-[16px] font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
            Book a Consultation <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
