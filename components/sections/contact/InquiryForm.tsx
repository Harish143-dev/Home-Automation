"use client";

import React, { useRef, useState } from "react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { ArrowRight } from "lucide-react";

export function InquiryForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current || prefersReducedMotion) return;

      const elements = formRef.current?.querySelectorAll(".form-stagger");
      if (elements) {
        gsap.fromTo(
          elements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background text-foreground py-24 md:py-32 lg:py-40 px-6 sm:px-12 md:px-24"
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-16">
        
        {/* Header */}
        <div className="flex flex-col gap-6 form-stagger">
          <div className="flex items-center gap-4">
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-accent">
              Inquiry
            </span>
            <div className="h-[1px] w-12 bg-border" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide text-foreground">
            Send us a message
          </h2>
          <p className="text-muted-foreground text-lg font-light max-w-lg">
            Share the details of your project, and our specialists will be in touch to discuss how we can bring your vision to life.
          </p>
        </div>

        {/* Form */}
        <form 
          ref={formRef} 
          className="flex flex-col gap-12"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <FloatingInput id="name" label="Full Name" type="text" />
            <FloatingInput id="email" label="Email Address" type="email" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <FloatingInput id="phone" label="Phone Number" type="tel" />
            <FloatingInput id="project" label="Project Type (e.g. Residential, Commercial)" type="text" />
          </div>

          <FloatingTextarea id="message" label="Project Details & Requirements" />

          <div className="form-stagger pt-8 flex justify-end">
            <MagneticButton>
              <button 
                type="submit"
                className="group relative inline-flex items-center justify-center gap-4 px-8 py-5 bg-accent text-white overflow-hidden rounded-full font-medium tracking-wide transition-transform hover:scale-105"
              >
                <span className="relative z-10">Submit Inquiry</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-accent-soft translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
              </button>
            </MagneticButton>
          </div>
        </form>

      </div>
    </section>
  );
}

// Subcomponents for the form fields
function FloatingInput({ id, label, type }: { id: string; label: string; type: string }) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="form-stagger relative w-full group">
      <input
        type={type}
        id={id}
        name={id}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
        className="block w-full bg-transparent border-b border-border py-4 px-0 text-foreground text-lg font-light focus:outline-none focus-visible:outline-none focus:border-accent transition-colors duration-500 peer !outline-none !ring-0"
        style={{ outline: "none", boxShadow: "none" }}
        required
      />
      <label
        htmlFor={id}
        className={`absolute left-0 text-muted-foreground font-light cursor-text transition-all duration-300 pointer-events-none 
          ${isFocused || hasValue ? '-top-3 text-xs tracking-widest text-accent' : 'top-4 text-lg'}`}
      >
        {label}
      </label>
      
      {/* Animated underline */}
      <div 
        className={`absolute bottom-0 left-0 h-[1px] bg-accent transition-all duration-500 ease-out ${isFocused ? 'w-full' : 'w-0'}`} 
      />
    </div>
  );
}

function FloatingTextarea({ id, label }: { id: string; label: string }) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="form-stagger relative w-full group">
      <textarea
        id={id}
        name={id}
        rows={4}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
        className="block w-full bg-transparent border-b border-border py-4 px-0 text-foreground text-lg font-light focus:outline-none focus-visible:outline-none focus:border-accent transition-colors duration-500 resize-none peer !outline-none !ring-0"
        style={{ outline: "none", boxShadow: "none" }}
        required
      />
      <label
        htmlFor={id}
        className={`absolute left-0 text-muted-foreground font-light cursor-text transition-all duration-300 pointer-events-none 
          ${isFocused || hasValue ? '-top-3 text-xs tracking-widest text-accent' : 'top-4 text-lg'}`}
      >
        {label}
      </label>
      
      {/* Animated underline */}
      <div 
        className={`absolute bottom-[3px] left-0 h-[1px] bg-accent transition-all duration-500 ease-out ${isFocused ? 'w-full' : 'w-0'}`} 
      />
    </div>
  );
}

// Simple magnetic button wrapper
function MagneticButton({ children }: { children: React.ReactElement }) {
  const buttonRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.2;
    const y = (clientY - (top + height / 2)) * 0.2;
    
    gsap.to(buttonRef.current, {
      x, y, duration: 1, ease: "power3.out"
    });
  };
  
  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <div 
      ref={buttonRef} 
      className="inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
