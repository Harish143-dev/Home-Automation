"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { TestimonialCarousel } from "../../ui/testimonial";

const TESTIMONIAL_DATA = [
  {
    id: 1,
    name: "Vikram S.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    description: "The Delhi Experience Centre completely changed my perspective on home automation. Feeling the ambiance shift with a single touch was incredible."
  },
  {
    id: 2,
    name: "Priya M.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    description: "As an architect, seeing the seamless integration of AV and lighting at the Mumbai showroom gave me the exact confidence I needed for my next luxury project."
  },
  {
    id: 3,
    name: "Rajesh K.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    description: "Experiencing the automated shades and intelligent climate control in person made the decision to upgrade our entire Bangalore property effortless."
  }
];

export function ExperienceTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current || prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });

      tl.to(".testimonials-header", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      })
        .to(".testimonials-carousel-wrapper", {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.4");
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section ref={sectionRef} className="py-12 md:py-16 w-full bg-background text-foreground relative overflow-hidden border-t border-border">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">

        {/* Left Side: Header */}
        <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="flex items-center gap-4 mb-8 testimonials-header opacity-0 translate-y-10">
            <div className="h-[1px] w-8 bg-accent/40" />
            <span className="text-[10px] sm:text-xs tracking-[0.3em] text-muted-foreground">
              Client Stories
            </span>
            <div className="h-[1px] w-8 bg-accent/40 lg:hidden" />
          </div>

          <h2 className=" text-foreground mb-6 testimonials-header opacity-0 translate-y-10">
            Hear From Our Clients
          </h2>

          <p className="text-base md:text-lg text-muted-foreground font-light tracking-wide leading-relaxed max-w-md testimonials-header opacity-0 translate-y-10">
            Discover how visiting our experience centres helped homeowners and professionals envision their perfect intelligent environment.
          </p>
        </div>

        {/* Right Side: Carousel */}
        <div className="w-full lg:w-6/12 flex justify-center testimonials-carousel-wrapper opacity-0 translate-y-12">
          <TestimonialCarousel
            testimonials={TESTIMONIAL_DATA}
            className="max-w-md w-full mx-auto lg:mx-0"
          />
        </div>

      </div>
    </section>
  );
}
