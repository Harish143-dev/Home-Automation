'use client';

import React, { useRef } from 'react';
import NextImage from 'next/image';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import imgSecurityProtection from '@/assets/residential/hero.jpg'; // Placeholder image

export function SecurityProtection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    // Animate Text Column
    gsap.fromTo(textRef.current?.children ? Array.from(textRef.current.children) : [],
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        }
      }
    );

    // Animate Image Column
    gsap.fromTo(imageRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
        }
      }
    );

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-12 md:py-16 relative w-full bg-[#f8f8f8] px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/5">
      <div className="max-w-7xl w-full mx-auto relative z-10">

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

          {/* Text Content */}
          <div ref={textRef} className="w-full lg:w-[45%] flex flex-col justify-center">
            <div className="flex flex-col gap-6 w-full max-w-2xl">
              <h5 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-accent">
                Total Protection
              </h5>

              <h2 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground text-balance">
                Complete Protection for Every Corner of Your Home
              </h2>

              <p className="text-sm md:text-base lg:text-lg font-light tracking-wide text-foreground/80 leading-relaxed">
                Whether you're at home, at work, or travelling, our integrated security ecosystem keeps you connected, informed, and in control.
              </p>

              <div className="w-full h-[1px] bg-black/10 my-2" />

              <p className="text-sm md:text-base font-medium text-foreground leading-relaxed">
                Modern homes require more than traditional locks.
              </p>

              <p className="text-sm md:text-base font-light tracking-wide text-foreground/70 leading-relaxed">
                An intelligent security system combines surveillance, smart access, intrusion detection, and remote monitoring to provide complete peace of mind. Intelligent security solutions bring together biometric access, smart video doorbells, smartphone control, and flexible access permissions to help you manage who enters your home and stay connected to your property whether you're at home or away.
              </p>
            </div>
          </div>

          {/* Image Content */}
          <div ref={imageRef} className="w-full lg:w-1/2 relative aspect-square lg:aspect-[4/3] rounded-[2rem] overflow-hidden bg-white shadow-xl shadow-black/5">
            <NextImage
              src={imgSecurityProtection}
              alt="House with connected security devices"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
}
