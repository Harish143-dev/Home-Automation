'use client';

import React, { useRef } from 'react';
import {
  ShieldCheck,
  Smartphone,
  Lightbulb,
  BellRing,
  UserCheck,
  LockKeyhole
} from 'lucide-react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const BENEFITS = [
  { title: "24×7 Home Protection", icon: ShieldCheck },
  { title: "Remote Access & Control", icon: Smartphone },
  { title: "Smarter Everyday Living", icon: Lightbulb },
  { title: "Instant Alerts", icon: BellRing },
  { title: "Personalized Access", icon: UserCheck },
  { title: "Reliable & Secure", icon: LockKeyhole }
];

export function SecurityWhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    gsap.fromTo('.sw-header',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(itemsRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-12 md:py-16 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-panel text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-16 lg:gap-24 relative">

        {/* Header */}
        <div className="sw-header text-center max-w-3xl mx-auto">
          <h5 className=" text-accent mb-4 block">
            The AT Smart Living Advantage
          </h5>
          <h2 className=" text-foreground text-balance">
            Why Homeowners Choose Smart Security
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {BENEFITS.map((benefit, idx) => (
            <div
              key={idx}
              ref={el => { itemsRef.current[idx] = el; }}
              className="group flex flex-col items-center text-center gap-6 p-10 rounded-[2rem] bg-background border border-black/5 hover:border-black/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-full bg-panel flex items-center justify-center text-accent transition-transform duration-500 group-hover:scale-110 border border-black/5">
                <benefit.icon className="w-8 h-8" strokeWidth={1.5} />
              </div>

              <h3 className=" text-foreground">
                {benefit.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
