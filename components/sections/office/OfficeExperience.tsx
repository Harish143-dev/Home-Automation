'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { DURATION, EASE } from '@/lib/animation.config';

const STATS = [
  { prefix: 'Over', value: '24', label: 'Years of Experience' },
  { prefix: 'Over', value: '1,000', label: 'Projects Delivered' },
  { prefix: 'More than', value: '650', label: 'Residences Automated' },
  { prefix: 'Over', value: '250', label: 'Hospitality Projects' },
  { prefix: 'Over', value: '100', label: 'Commercial Projects' },
  { prefix: '', value: '3', label: 'Experience Centres\nDelhi • Mumbai • Bangalore' },
  { prefix: 'Across', value: '12+', label: 'Cities Supported' },
];

const HOSPITALITY_BRANDS = [
  'ITC', 'Marriott', 'Four Seasons', 'Taj', 'Hilton', 'Hyatt', 'Oberoi', 'IHG'
];

const CREDENTIALS = [
  {
    title: "Lutron Authorized Distributor",
    description: "Proud to be an authorized distributor for Lutron Electronics (USA), delivering world-class lighting and shading solutions.",
  },
  {
    title: "CEDIA Founding Member",
    description: "Serving as a founding India member of the Custom Electronic Design & Installation Association (CEDIA), upholding international engineering benchmarks.",
  },
  {
    title: "2026 Lutron Hall of Fame",
    description: "The first company in Asia to receive this prestigious recognition for our outstanding contribution to the automation industry.",
  },
  {
    title: "Award-Winning Integrator",
    description: "Recipient of multiple Residential & Hospitality Business Awards, demonstrating our commitment to unparalleled quality.",
  },
  {
    title: "Nationally Recognized",
    description: "Nationally recognized for excellence in home and commercial automation, delivering bespoke integrations.",
  }
];

export function OfficeExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const statsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const credentialsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    // 1. Trust Signal: Initial fade-in for the left sticky column
    gsap.fromTo(leftColRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: DURATION.slow,
        ease: EASE.reveal,
        scrollTrigger: {
          trigger: leftColRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // 2. Trust Signal: Individual reveal triggers for each vertical stat
    statsRefs.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(el, {
        opacity: 0,
        y: 60
      }, {
        opacity: 1,
        y: 0,
        duration: DURATION.slow,
        ease: EASE.reveal,
        scrollTrigger: {
          trigger: el,
          start: 'top 72%',
          toggleActions: 'play none none reverse',
        }
      });
    });

    // 3. Credentials Animation
    const cards = gsap.utils.toArray('.oe-cred-card');
    cards.forEach((card: any) => {
      const line = card.querySelector('.oe-cred-line');
      const title = card.querySelector('.oe-cred-title');
      const desc = card.querySelector('.oe-cred-desc');
      const num = card.querySelector('.oe-cred-num');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.fromTo(num,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, 0
      )
        .fromTo(line,
          { scaleX: 0 },
          { scaleX: 1, transformOrigin: 'left', duration: 1, ease: 'power3.inOut' }, 0.2
        )
        .fromTo(title,
          { y: 30, opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
          { y: 0, opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 1, ease: 'power3.out' }, 0.4
        )
        .fromTo(desc,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 0.6
        );
    });

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <div ref={sectionRef} className="w-full">
      {/* 1. TRUST SIGNAL SECTION */}
      <section className="py-12 md:py-16 relative w-full bg-background px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/5">
        <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-12 sm:gap-16 md:gap-20 lg:gap-32 items-start">

          <div ref={leftColRef} className="w-full md:w-1/2 md:sticky md:top-[20vh] pb-6 md:pb-0 opacity-0">
            <span className="tracking-[0.3em] text-accent mb-4 block uppercase text-sm font-medium">
              Proven Expertise
            </span>
            <h2 className="text-foreground mb-6 sm:mb-8">
              Trusted by the Best.
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-lg mb-8 sm:mb-10 text-balance">
              With over 24 years of experience, ATPL has successfully delivered over 1,000 projects, including more than 650 residences, over 250 hospitality projects, and over 100 commercial projects. With Experience Centres in Delhi, Mumbai, and Bangalore, and sales and service support across 12+ cities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/projects">
                <Button variant="interactive" size="lg" className="w-full sm:w-auto">
                  View Our Projects
                </Button>
              </Link>
              <Link href="/experience-center">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Visit Experience Center
                </Button>
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex flex-col gap-16 sm:gap-20 md:gap-32 lg:gap-40 border-l border-black/5 pl-6 sm:pl-8 md:pl-16 pb-20 md:pb-40 lg:pb-[30vh]">
            {STATS.map((stat, i) => (
              <div
                key={i}
                ref={el => { statsRefs.current[i] = el; }}
                className="flex flex-col border-b border-black/5 pb-6 sm:pb-8 last:border-b-0 last:pb-0 group cursor-default opacity-0"
              >
                {stat.prefix && <span className="tracking-[0.3em] text-accent mt-5 mb-1 sm:mb-2 block uppercase text-xs">{stat.prefix}</span>}
                <div className="font-light tracking-wide leading-none text-foreground mb-3 sm:mb-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 text-4xl sm:text-5xl md:text-6xl">
                  <span>{stat.value}</span>
                </div>
                <div className="text-muted-foreground font-light tracking-wide text-sm sm:text-base md:text-lg transition-colors duration-500 group-hover:text-foreground whitespace-pre-line">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. CLIENTS / HOSPITALITY MARQUEE SECTION */}
      <section className="py-12 md:py-16 relative w-full bg-background px-5 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl w-full mx-auto">
          <div className="w-full bg-accent/[0.03] border border-accent/10 rounded-[2rem] py-12 md:py-16 overflow-hidden flex flex-col items-center">
            <span className="tracking-[0.2em] text-accent mb-8 md:mb-12 uppercase text-sm font-medium">
              Trusted Hospitality Brands
            </span>
            <div className="w-[150%] md:w-[120%] flex overflow-hidden opacity-80 group">
              <div className="flex gap-16 md:gap-24 items-center whitespace-nowrap animate-marquee-left">
                {[...HOSPITALITY_BRANDS, ...HOSPITALITY_BRANDS, ...HOSPITALITY_BRANDS, ...HOSPITALITY_BRANDS].map((brand, i) => (
                  <span key={i} className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-foreground hover:text-accent transition-colors duration-300">
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CREDENTIALS SECTION */}
      <section className="py-12 md:py-16 relative bg-background text-foreground overflow-hidden" ref={credentialsRef}>
        <div className="container mx-auto px-5 sm:px-8 md:px-16 lg:px-24 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative items-start">

            <div className="w-full lg:w-[40%] xl:w-1/3 lg:sticky lg:top-40 flex flex-col gap-4 z-10">
              <span className="tracking-[0.3em] text-accent block mb-2 uppercase text-sm font-medium">
                Industry Accolades
              </span>
              <h2 className="text-foreground">
                Certifications &<br />Awards.
              </h2>
            </div>

            <div className="w-full lg:w-[60%] xl:w-2/3 flex flex-col gap-20 lg:gap-32 mt-8 lg:mt-0">
              {CREDENTIALS.map((cred, i) => (
                <div key={i} className="oe-cred-card flex flex-col relative z-10">
                  <span className="oe-cred-num text-8xl md:text-[10rem] lg:text-[12rem] leading-none font-light text-foreground/5 absolute -top-12 md:-top-16 -left-4 md:-left-8 lg:-left-12 -z-10 pointer-events-none select-none">
                    0{i + 1}
                  </span>

                  <div className="w-16 h-[1px] bg-foreground/20 mb-6 oe-cred-line" />

                  <h3 className="text-foreground mb-4 oe-cred-title">
                    {cred.title}
                  </h3>

                  <p className="text-sm md:text-base font-light text-foreground/70 leading-[1.8] oe-cred-desc max-w-lg">
                    {cred.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-left {
          animation: marquee-left 30s linear infinite;
        }
        .group:hover .animate-marquee-left {
          animation-play-state: paused;
        }
      `}} />
    </div>
  );
}
