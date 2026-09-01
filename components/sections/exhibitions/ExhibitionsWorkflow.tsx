'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { MonitorPlay, Music, Lightbulb, Settings2, Network, UserCheck, FileImage, ArrowDown } from 'lucide-react';

export function ExhibitionsWorkflow() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    // 1. Header fade in
    tl.fromTo(".wf-header",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    );

    // 2. Animate nodes sequentially down the flow
    const nodes = gsap.utils.toArray('.wf-node');
    const arrows = gsap.utils.toArray('.wf-arrow');

    // Content Node
    tl.fromTo(nodes[0] as Element, 
      { scale: 0.9, opacity: 0, y: -20 }, 
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" }
    );
    tl.fromTo(arrows[0] as Element, { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 0.3 });

    // Video, Audio, Lighting Nodes (Group)
    tl.fromTo([nodes[1], nodes[2], nodes[3]] as Element[],
      { scale: 0.9, opacity: 0, y: -20 }, 
      { scale: 1, opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)" }
    );
    tl.fromTo(arrows[1] as Element, { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 0.3 });

    // Integrated Control Node
    tl.fromTo(nodes[4] as Element, 
      { scale: 0.9, opacity: 0, y: -20 }, 
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" }
    );
    tl.fromTo(arrows[2] as Element, { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 0.3 });

    // Networking Node
    tl.fromTo(nodes[5] as Element, 
      { scale: 0.9, opacity: 0, y: -20 }, 
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" }
    );
    tl.fromTo(arrows[3] as Element, { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 0.3 });

    // User Experience Node
    tl.fromTo(nodes[6] as Element, 
      { scale: 0.9, opacity: 0, y: -20 }, 
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.5)" }
    );

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-20 md:py-32 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5 overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto z-10 mb-16 lg:mb-24">
          <h5 className="wf-header text-accent mb-4 block font-medium">
            System Architecture
          </h5>
          <h2 className="wf-header text-foreground mb-6 text-balance">
            Everything Works Together. Seamlessly.
          </h2>
          <p className="wf-header text-lg md:text-xl font-light text-muted-foreground leading-relaxed text-balance">
            An exhibition experience becomes more powerful when video, audio, lighting, control, and networking work together as one integrated technology environment.
          </p>
        </div>

        {/* Diagram Flow */}
        <div className="flex flex-col items-center w-full max-w-4xl relative z-10">
          
          {/* Level 1: CONTENT */}
          <div className="wf-node bg-panel border border-black/5 shadow-sm rounded-2xl p-6 flex flex-col items-center justify-center w-48 z-10 relative">
            <FileImage className="w-8 h-8 text-accent mb-3" />
            <span className="font-medium tracking-wide text-sm">CONTENT</span>
          </div>

          <div className="wf-arrow flex flex-col items-center my-2 origin-top">
            <div className="w-[2px] h-8 bg-black/10" />
            <ArrowDown className="w-4 h-4 text-black/20 -mt-1" />
          </div>

          {/* Level 2: Core Tech (Video, Audio, Lighting) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 w-full relative">
            {/* Connecting Top Bar */}
            <div className="absolute top-0 left-[20%] right-[20%] h-[2px] bg-black/10 hidden sm:block -translate-y-4" />
            
            <div className="wf-node bg-white border border-black/5 shadow-md rounded-2xl p-6 flex flex-col items-center justify-center w-full sm:w-48 relative">
              <div className="absolute top-0 left-1/2 w-[2px] h-4 bg-black/10 hidden sm:block -translate-y-full -translate-x-1/2" />
              <MonitorPlay className="w-8 h-8 text-accent mb-3" />
              <span className="font-medium tracking-wide text-sm">VIDEO</span>
            </div>
            
            <div className="wf-node bg-white border border-black/5 shadow-md rounded-2xl p-6 flex flex-col items-center justify-center w-full sm:w-48 relative z-10">
              <div className="absolute top-0 left-1/2 w-[2px] h-4 bg-black/10 hidden sm:block -translate-y-full -translate-x-1/2" />
              <Music className="w-8 h-8 text-accent mb-3" />
              <span className="font-medium tracking-wide text-sm">AUDIO</span>
            </div>
            
            <div className="wf-node bg-white border border-black/5 shadow-md rounded-2xl p-6 flex flex-col items-center justify-center w-full sm:w-48 relative">
              <div className="absolute top-0 left-1/2 w-[2px] h-4 bg-black/10 hidden sm:block -translate-y-full -translate-x-1/2" />
              <Lightbulb className="w-8 h-8 text-accent mb-3" />
              <span className="font-medium tracking-wide text-sm">LIGHTING</span>
            </div>

            {/* Connecting Bottom Bar */}
            <div className="absolute bottom-0 left-[20%] right-[20%] h-[2px] bg-black/10 hidden sm:block translate-y-4" />
          </div>

          <div className="wf-arrow flex flex-col items-center my-6 origin-top">
            <div className="w-[2px] h-8 bg-black/10" />
            <ArrowDown className="w-4 h-4 text-black/20 -mt-1" />
          </div>

          {/* Level 3: INTEGRATED CONTROL */}
          <div className="wf-node bg-accent/5 border border-accent/10 shadow-sm rounded-2xl p-6 flex flex-col items-center justify-center w-64 z-10 relative">
            <Settings2 className="w-8 h-8 text-accent mb-3" />
            <span className="font-medium tracking-wide text-sm">INTEGRATED CONTROL</span>
          </div>

          <div className="wf-arrow flex flex-col items-center my-4 origin-top">
            <div className="w-[2px] h-8 bg-black/10" />
            <ArrowDown className="w-4 h-4 text-black/20 -mt-1" />
          </div>

          {/* Level 4: NETWORKING */}
          <div className="wf-node bg-panel border border-black/5 shadow-sm rounded-2xl p-6 flex flex-col items-center justify-center w-56 z-10 relative">
            <Network className="w-8 h-8 text-accent mb-3" />
            <span className="font-medium tracking-wide text-sm">NETWORKING</span>
          </div>

          <div className="wf-arrow flex flex-col items-center my-4 origin-top">
            <div className="w-[2px] h-8 bg-black/10" />
            <ArrowDown className="w-4 h-4 text-black/20 -mt-1" />
          </div>

          {/* Level 5: USER EXPERIENCE */}
          <div className="wf-node bg-foreground text-background shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center w-64 z-10 relative">
            <UserCheck className="w-8 h-8 text-background mb-3" />
            <span className="font-medium tracking-wide text-sm">USER EXPERIENCE</span>
          </div>

        </div>

      </div>
    </section>
  );
}
