"use client";

import React, { useRef } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

const ENVIRONMENTS = [
  {
    title: "Residential Wi-Fi Automation",
    description: "Enjoy seamless, high-performance connectivity throughout your home, supporting smart devices, entertainment, automation, and everyday digital experiences.",
    pointers: [
      "Whole-home Wi-Fi coverage",
      "Smart home connectivity",
      "Streaming & entertainment",
      "Connected device management"
    ],
    cta: "Explore Residential Solutions",
    href: "/residential",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
  },
  {
    title: "Hospitality Wi-Fi Automation",
    description: "Deliver reliable connectivity across hospitality environments, supporting guest experiences, connected services, entertainment, and operational technologies.",
    pointers: [
      "Guest Wi-Fi networks",
      "Connected guest rooms",
      "Entertainment systems",
      "Hotel operations"
    ],
    cta: "Explore Hospitality Solutions",
    href: "/hospitality",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop"
  },
  {
    title: "Commercial Wi-Fi Automation",
    description: "Build reliable and scalable network infrastructure that supports connected workplaces, business operations, collaboration, and growing technology demands.",
    pointers: [
      "Office connectivity",
      "Meeting & collaboration spaces",
      "Connected workplace systems",
      "Centralized network management"
    ],
    cta: "Explore Commercial Solutions",
    href: "/commercial",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
  }
];

export function WifiAutomationEnvironments() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(".env-stack-card");
    
    cards.forEach((card, index) => {
      // The last card doesn't get covered, so it doesn't scale down
      if (index === cards.length - 1) return;

      gsap.to(card, {
        scale: 0.94,
        opacity: 0.4,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: cards[index + 1],
          start: "top bottom-=10%",
          end: "top top+=15%",
          scrub: true,
        }
      });
    });

    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-16 md:py-32 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-foreground mb-6 text-balance max-w-4xl mx-auto">
            Connectivity Solutions Designed for Every Environment
          </h2>
          <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed text-balance max-w-3xl mx-auto">
            Every space has different connectivity requirements. Our solutions are designed around how people live, work, stay, and interact.
          </p>
        </div>

        {/* Stacking Cards Container */}
        <div className="relative w-full flex flex-col pb-[10vh]">
          {ENVIRONMENTS.map((env, idx) => {
            // Offset each card slightly lower so the headers stack visibly
            const topOffset = `calc(15vh + ${idx * 40}px)`;
            
            return (
              <div 
                key={idx} 
                className="env-stack-card sticky w-full max-w-5xl mx-auto flex flex-col lg:flex-row bg-panel rounded-[2rem] overflow-hidden border border-black/10 shadow-xl mb-12 lg:mb-[50vh] last:mb-0 origin-top"
                style={{ top: topOffset }}
              >
                {/* Image Section */}
                <div className="w-full lg:w-[45%] h-64 lg:h-auto lg:min-h-[500px] relative overflow-hidden bg-black/5 shrink-0">
                  <NextImage 
                    src={env.image}
                    alt={env.title}
                    fill
                    className="object-cover transition-transform duration-[2s] hover:scale-105"
                  />
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-[55%] flex flex-col p-8 sm:p-10 lg:p-12 xl:p-16">
                  <h3 className="text-2xl sm:text-3xl text-foreground mb-4 font-normal">
                    {env.title}
                  </h3>
                  <p className="text-muted-foreground font-light text-base sm:text-lg leading-relaxed mb-8">
                    {env.description}
                  </p>

                  {/* Pointers List */}
                  <ul className="flex flex-col space-y-4 mb-10 mt-auto">
                    {env.pointers.map((pointer, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="text-foreground/80 font-light text-base leading-snug">
                          {pointer}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link href={env.href} className="mt-auto block">
                    <Button variant="outline" size="lg" className="w-full group/btn bg-background">
                      {env.cta}
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
