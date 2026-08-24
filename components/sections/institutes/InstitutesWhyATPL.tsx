'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { DURATION, EASE } from '@/lib/animation.config';

const STATS = [
  { prefix: 'Over', value: '24', label: 'Years of automation expertise' },
  { prefix: 'Over', value: '1,000', label: 'Projects successfully delivered' },
  { prefix: 'Over', value: '650', label: 'Residences automated' },
  { prefix: 'Over', value: '250', label: 'Hospitality projects completed and over 2500 Guest rooms' },
  { prefix: 'Over', value: '100', label: 'Commercial projects delivered' },
  { prefix: '', value: '3', label: 'Experience Centres in Delhi, Mumbai & Bangalore' },
];

export function InstitutesWhyATPL() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: DURATION.slow,
        ease: EASE.reveal,
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    statsRefs.current.forEach((el, index) => {
      if (!el) return;
      gsap.fromTo(el, {
        opacity: 0,
        y: 20
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: index * 0.1,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      });
    });

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <div ref={sectionRef} className="w-full">
      <section className="py-16 md:py-24 relative w-full bg-background px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/5">
        <div className="max-w-7xl w-full mx-auto flex flex-col gap-16 lg:gap-20">

          <div ref={headerRef} className="w-full flex flex-col items-center text-center max-w-4xl mx-auto">
            <span className="tracking-[0.1em] text-accent mb-4 block text-sm font-medium">
              Proven Expertise
            </span>
            <h2 className="text-foreground mb-6 text-balance">
              Why Choose Anusha Technovision
            </h2>
            <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed text-balance mb-8">
              For over 24 years, ATPL has been delivering intelligent lighting control and home automation solutions that combine world-class technology, expert execution, and dependable after-sales support. Trusted by luxury homeowners across India, we create smart homes that are, reliable, and built for the future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/projects">
                <Button variant="interactive" size="lg" className="w-full sm:w-auto">
                  View Our Projects
                </Button>
              </Link>
            </div>
          </div>

          <div className="w-full border-t border-l border-black/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {STATS.map((stat, i) => (
              <div
                key={i}
                ref={el => { statsRefs.current[i] = el; }}
                className="flex flex-col p-8 sm:p-12 border-b border-r border-black/10 bg-background/50 backdrop-blur-sm hover:bg-black/[0.02] transition-colors duration-500"
              >
                {stat.prefix && (
                  <span className="tracking-[0.1em] mb-3 block text-xs md:text-sm font-medium text-accent">
                    {stat.prefix}
                  </span>
                )}
                
                <div className="font-light tracking-wide leading-none mb-4 text-5xl sm:text-6xl text-foreground">
                  {stat.value}
                </div>
                
                <div className="font-light tracking-wide text-base md:text-lg text-muted-foreground mt-auto text-balance">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
