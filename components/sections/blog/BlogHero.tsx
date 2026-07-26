"use client";

import { useRef } from "react";
import NextImage from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import heroImage from "@/assets/projects/private-residence.jpg";

export default function BlogHero() {
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

    // Reveal typography
    gsap.fromTo(lines,
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
      }
    );

    // Subtle parallax on the background image
    gsap.to(".blog-hero-bg", {
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
      className="py-16 md:py-24 relative w-full h-[60vh] min-h-[400px] flex flex-col justify-center overflow-hidden bg-secondary px-6 sm:px-12 md:px-24"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 blog-hero-bg will-change-transform">
        <NextImage
          src={heroImage}
          alt="Atmospheric architectural living"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Cinematic dark overlay */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content aligned to center for blog hero */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center gap-6 mt-16">
        <div className="flex items-center gap-4 overflow-hidden">
          <div className="h-[1px] w-8 sm:w-12 bg-accent/60" />
          <span className="text-[10px] sm:text-xs tracking-[0.3em] text-white/70">
            Blog Collection
          </span>
          <div className="h-[1px] w-8 sm:w-12 bg-accent/60" />
        </div>

        <div ref={textRef} className="flex flex-col gap-2 md:gap-4">
          <div className="hero-line">
            <h1 className="text-white drop-shadow-sm">
              Title Sample
            </h1>
          </div>
          <div className="hero-line mt-2">
            <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-white/80">
              (Blogs by ATPL)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
