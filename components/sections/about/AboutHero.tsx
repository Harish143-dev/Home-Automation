"use client";

import { useRef } from "react";
import NextImage from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import heroImage from "@/assets/projects/private-residence.jpg";

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    // Split text for line-by-line reveal
    const split = new SplitText(textRef.current.querySelectorAll(".hero-line"), {
      type: "lines",
      linesClass: "overflow-hidden"
    });

    const lines = split.lines.map((line) => {
      const inner = document.createElement('div');
      inner.innerHTML = line.innerHTML;
      line.innerHTML = '';
      line.appendChild(inner);
      return inner;
    });

    gsap.fromTo(lines,
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.5
      }
    );

    // Subtle parallax on the background image
    gsap.to(".about-hero-bg", {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    return () => split.revert();
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-secondary"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 about-hero-bg will-change-transform">
        <NextImage
          src={heroImage}
          alt="Architectural Smart Home"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Cinematic dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-24 flex flex-col items-center text-center">
        <div className="mb-6 flex items-center justify-center gap-4 overflow-hidden">
          <div className="h-[1px] w-8 bg-white/40" />
          <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/70">
            Designing Intelligent Living
          </span>
          <div className="h-[1px] w-8 bg-white/40" />
        </div>
        
        <div ref={textRef} className="flex flex-col gap-2 md:gap-4">
          <div className="hero-line">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide text-white drop-shadow-sm">
              Luxury Automation
            </h1>
          </div>
          <div className="hero-line">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide text-white drop-shadow-sm">
              Crafted Around
            </h1>
          </div>
          <div className="hero-line">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide text-white drop-shadow-sm">
              Human Experience
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
