"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

export default function ClosingStatement() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".closing-element",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 relative w-full bg-background text-foreground px-6 sm:px-12 md:px-24 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Decorative large faint text in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap">
        <h2 className=" text-border opacity-50">
          AT SMART LIVING
        </h2>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12 max-w-4xl mx-auto">
        <h2 className=" closing-element text-foreground">
          Ready to design your <br className="hidden md:block" />
          intelligent space?
        </h2>

        <p className="closing-element text-lg md:text-xl font-light text-muted-foreground max-w-2xl">
          Connect with our engineering specialists and architectural designers
          to begin your transformation.
        </p>

        <div className="closing-element mt-8">
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-4 px-8 py-5 bg-accent text-white overflow-hidden rounded-full font-medium tracking-wide transition-transform hover:scale-105"
          >
            <span className="relative z-10">Book a Consultation</span>
            <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-accent-soft translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
