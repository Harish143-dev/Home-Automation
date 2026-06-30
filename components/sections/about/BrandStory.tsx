"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    // Oversized text reveal
    gsap.fromTo(
      ".story-line",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: false,
        }
      }
    );

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-background text-foreground py-32 md:py-48 px-6 sm:px-12 md:px-24"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* Subtitle */}
        <div className="mb-12 flex items-center gap-4">
          <span className="text-[10px] sm:text-xs tracking-[0.3em] text-accent">
            Our Philosophy
          </span>
          <div className="h-[1px] w-12 bg-border" />
        </div>

        {/* Oversized Cinematic Typography */}
        <div ref={textRef} className="flex flex-col gap-6 md:gap-10">
          <p className="story-line text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide text-foreground">
            We don't just install technology.
          </p>
          <p className="story-line text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide text-muted-foreground">
            We engineer intelligent environments
          </p>
          <p className="story-line text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide text-foreground">
            that intuitively adapt to you.
          </p>
        </div>

        {/* Supporting Minimal Text */}
        <div className="mt-24 max-w-2xl mx-auto text-left md:text-center">
          <p className="story-line text-lg font-light text-muted-foreground leading-relaxed">
            Since our inception, AT Smart Living has been driven by a singular vision: 
            to seamlessly blend architectural elegance with cutting-edge engineering. 
            We believe that true luxury lies in technology that anticipates your needs 
            while remaining entirely invisible.
          </p>
        </div>

      </div>
    </section>
  );
}
