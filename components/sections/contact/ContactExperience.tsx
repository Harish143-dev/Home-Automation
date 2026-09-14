"use client";

import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import Link from "next/link";

export function ContactExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current || prefersReducedMotion) return;

      const elements = contentRef.current?.querySelectorAll(".stagger-reveal");
      if (!elements) return;

      gsap.fromTo(
        elements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 relative w-full bg-background text-foreground px-6 sm:px-12 md:px-24"
    >
      <div
        ref={contentRef}
        className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-12 lg:gap-16"
      >
        {/* Left: Contact Philosophy */}
        <div className="flex-1 flex flex-col gap-8 lg:max-w-xl">
          <div className="stagger-reveal flex items-center gap-4">
            <h5 className="text-accent !mb-0">
              Direct Access
            </h5>
          </div>

          <h2 className=" stagger-reveal text-foreground">
            Connect with our specialists to begin your journey into intelligent living.
          </h2>

          <p className="stagger-reveal text-muted-foreground text-lg font-light leading-relaxed max-w-md">
            Whether you are building a new luxury residence or integrating advanced technology into a commercial space, our team is ready to assist you with precision and expertise.
          </p>
        </div>

        {/* Right: Contact Info */}
        <div className="flex-1 flex flex-col pt-4 lg:pt-0">
          <div className="stagger-reveal w-full border-t border-border" />

          <ContactRow
            label="General Inquiries"
            value="info@anushagroup.com"
            href="mailto:info@anushagroup.com"
          />

          <ContactRow
            label="Project Sales"
            value="sales@anushagroup.com"
            href="mailto:sales@anushagroup.com"
          />

          <ContactRow
            label="Direct Line"
            value="+91 11 4160 8415"
            href="tel:+911141608415"
            hasBorderBottom
          />
        </div>
      </div>
    </section>
  );
}

function ContactRow({ label, value, href, hasBorderBottom = false }: { label: string; value: string; href: string; hasBorderBottom?: boolean }) {
  return (
    <Link
      href={href}
      className={`stagger-reveal group flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-b border-border hover:border-accent transition-colors duration-500 ${!hasBorderBottom && 'border-none sm:border-solid'}`}
    >
      <span className="text-muted-foreground text-sm tracking-[0.2em] group-hover:text-accent transition-colors duration-300">
        {label}
      </span>
      <div className="flex items-center gap-6">
        <span className="text-xl md:text-2xl font-light tracking-wide text-foreground group-hover:text-accent transition-colors duration-300">
          {value}
        </span>
        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
      </div>
    </Link>
  );
}
