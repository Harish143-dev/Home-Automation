"use client";

import { useRef } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import heroImage from "@/assets/projects/private-residence.jpg";
import { Button } from "@/components/ui/button";

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

    const fadeElements = sectionRef.current.querySelectorAll('.hero-fade-up');
    if (fadeElements.length > 0) {
      gsap.fromTo(fadeElements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          delay: 1.2
        }
      );
    }

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
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-24 flex flex-col items-center text-center mt-12 md:mt-20">
        <div className="mb-6 flex items-center justify-center gap-4 overflow-hidden">
          <div className="h-[1px] w-8 bg-white/40" />
          <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/70">
            About Anusha Technovision
          </span>
          <div className="h-[1px] w-8 bg-white/40" />
        </div>
        
        <div ref={textRef} className="flex flex-col gap-2 md:gap-4">
          <div className="hero-line">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.2] tracking-wide text-white drop-shadow-sm">
              Engineering Intelligent
            </h1>
          </div>
          <div className="hero-line">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.2] tracking-wide text-white drop-shadow-sm">
              Spaces Since 2002
            </h1>
          </div>
        </div>

        <p className="hero-fade-up mt-8 max-w-2xl text-white/80 font-light text-base sm:text-lg md:text-xl leading-relaxed opacity-0">
          For over two decades, Anusha Technovision has been transforming residential, hospitality, and commercial spaces through intelligent automation, innovative technology, and customer-centric solutions.
        </p>

        <div className="hero-fade-up mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
          <Link href="/projects" className="w-full sm:w-auto">
            <Button variant="accent" size="lg" shape="full" className="w-full sm:w-auto">
              Explore Our Solutions
            </Button>
          </Link>
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="glass" size="lg" shape="full" className="w-full sm:w-auto">
              Talk to Our Experts
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
