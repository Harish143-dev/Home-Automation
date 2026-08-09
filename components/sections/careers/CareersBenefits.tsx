"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { EASE, DURATION, STAGGER } from "@/lib/animation.config";
import {
  Building2,
  GraduationCap,
  TrendingUp,
  Users,
  Lightbulb,
  Globe
} from "lucide-react";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BENEFITS = [
  {
    title: "Industry-Leading Projects",
    description: "Work on luxury residences, premium hotels, commercial buildings, and landmark developments.",
    icon: Building2,
  },
  {
    title: "Continuous Learning",
    description: "Hands-on exposure to the latest automation platforms and global technologies.",
    icon: GraduationCap,
  },
  {
    title: "Career Growth",
    description: "Structured opportunities to develop technical and leadership skills.",
    icon: TrendingUp,
  },
  {
    title: "Collaborative Culture",
    description: "Work alongside passionate engineers, designers, and project specialists.",
    icon: Users,
  },
  {
    title: "Innovation-Driven Environment",
    description: "Be part of projects that redefine intelligent living and smart infrastructure.",
    icon: Lightbulb,
  },
  {
    icon: Globe,
    title: "Pan-India Opportunities",
    description: "Contribute to impactful automation projects across multiple cities and industries.",
  },
];

export default function CareersBenefits() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        onRefresh: () => scheduleScrollRefresh(),
      }
    });

    // Animate Header Elements
    const headerElements = gsap.utils.toArray(".cb-header-el", headerRef.current);
    tl.fromTo(headerElements,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DURATION.normal,
        stagger: STAGGER.normal,
        ease: EASE.reveal
      }
    );

    // Animate Grid Cards
    const cards = gsap.utils.toArray(".cb-card", gridRef.current);
    tl.fromTo(cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DURATION.normal,
        stagger: STAGGER.normal,
        ease: EASE.reveal
      },
      "-=0.4"
    );

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 relative w-full px-6 sm:px-8 md:px-16 lg:px-24 bg-background overflow-hidden"
    >
      {/* Noise Texture Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none" aria-hidden="true">
        <filter id="noise-benefits">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-benefits)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Header Section */}
        <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-16 md:mb-24 flex flex-col items-center">
          <span className="cb-header-el inline-block text-sm md:text-base tracking-[0.3em] text-accent mb-6">
            Culture & Benefits
          </span>
          <h2 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl cb-header-el text-foreground mb-8">
            Why Work With Us?
          </h2>
          <p className="cb-header-el text-sm sm:text-base md:text-lg text-muted font-light leading-relaxed max-w-2xl mx-auto">
            At Anusha Technovision, you will work on industry-leading automation projects while growing alongside experienced professionals in a collaborative and innovation-driven environment.
          </p>
        </div>

        {/* Benefits Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full"
        >
          {BENEFITS.map((benefit, idx) => (
            <div
              key={idx}
              className="cb-card group relative bg-panel rounded-2xl p-8 border border-border shadow-sm hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              {/* Subtle accent gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-full bg-background flex items-center justify-center border border-border mb-8 group-hover:scale-110 transition-transform duration-500 ease-out">
                  <benefit.icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                </div>
                <h3 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground mb-4">
                  {benefit.title}
                </h3>
                <p className="text-sm md:text-base text-muted font-light leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
