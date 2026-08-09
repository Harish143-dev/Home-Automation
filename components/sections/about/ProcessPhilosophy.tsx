"use client";

import { useRef } from "react";
import NextImage from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import processImage from "@/assets/projects/SawaiManMahal.jpg";

export default function ProcessPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax on the image wrapper
    gsap.to(imageRef.current, {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Fade in text blocks
    gsap.fromTo(
      ".process-text",
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 relative w-full bg-background text-foreground px-6 sm:px-12 md:px-24"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

        {/* Left Content */}
        <div className="flex-1 flex flex-col gap-12 lg:pr-8">
          <div className="flex flex-col gap-6 process-text">
            <div className="flex items-center gap-4">
              <span className="text-[10px] sm:text-xs tracking-[0.3em] text-accent">
                Engineering Precision
              </span>
              <div className="h-[1px] w-8 bg-border" />
            </div>
            <h2 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground">
              Invisible <br /> Architecture
            </h2>
          </div>

          <div className="flex flex-col gap-8 process-text">
            <p className="text-lg font-light text-muted-foreground leading-relaxed max-w-lg">
              We approach home automation with the same rigor as structural engineering.
              Our process is rooted in meticulous planning, ensuring that complex
              systems—from tunable circadian lighting to invisible acoustic arrays—are integrated
              flawlessly without compromising the interior design.
            </p>
            <ul className="flex flex-col gap-4">
              {[
                "Custom-engineered electrical schematics",
                "Seamless architectural integration",
                "Predictive system analytics",
                "Uncompromising precision"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-base font-light tracking-wide text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Visual: Blueprint Inspired */}
        <div className="flex-1 w-full relative h-[60vh] min-h-[500px] overflow-hidden rounded-2xl group">
          <div ref={imageRef} className="absolute inset-0 scale-[1.1] will-change-transform">
            <NextImage
              src={processImage}
              alt="Architectural Blueprint and Execution"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[2s] group-hover:scale-105"
            />
            {/* Cinematic Gradient / Blueprint overlay vibe */}
            <div className="absolute inset-0 bg-background/10 mix-blend-overlay" />
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]" />
          </div>
        </div>

      </div>
    </section>
  );
}
