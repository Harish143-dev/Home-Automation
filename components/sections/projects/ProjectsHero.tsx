"use client";

import { useRef } from "react";
import NextImage from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

export function ProjectsHero() {
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
 gsap.to(".projects-hero-bg", {
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
 className="relative w-full h-[60vh] min-h-[400px] flex overflow-hidden bg-secondary px-6 sm:px-12 md:px-24 flex-col justify-end"
 >
 {/* Background Image */}
 <div className="absolute inset-0 z-0 projects-hero-bg will-change-transform">
 <NextImage
 src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
 alt="Proud Projects"
 fill
 priority
 sizes="100vw"
 className="object-cover"
 />
 {/* Cinematic dark overlay */}
 <div className="absolute inset-0 bg-black/70" />
 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
 </div>

 {/* Content aligned to center for projects hero */}
 <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24 flex flex-col items-start justify-end flex-grow pb-16 md:pb-24 pointer-events-none select-none">
 <div className="flex items-center gap-4 overflow-hidden">
 <div className="h-[1px] w-8 sm:w-12 bg-accent/60" />
 <span className="text-[10px] sm:text-xs tracking-[0.3em] text-white/70">
 Portfolio
 </span>
 <div className="h-[1px] w-8 sm:w-12 bg-accent/60" />
 </div>

 <div ref={textRef} className="flex flex-col">
 <div className="hero-line">
 <h1 className="hero-element text-white text-balance mb-6 max-w-4xl">
 Proud Projects
 </h1>
 </div>
 <div className="hero-line">
 <h1 className="hero-element text-white mb-6 max-w-4xl">
 by ATPL
 </h1>
 </div>
 </div>
 </div>
 </section>
 );
}
