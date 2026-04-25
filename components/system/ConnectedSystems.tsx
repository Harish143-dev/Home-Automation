'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  ArrowRight,
  Lightbulb,
  Volume2,
  Blinds,
  Thermometer,
  ShieldCheck,
  Wrench,
  Sparkles,
} from 'lucide-react';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { EASE } from '../../lib/animation.config';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ServicePanel = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  accent: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
};

const SERVICES: ServicePanel[] = [
  {
    id: 'lighting',
    eyebrow: '01 / Lighting Automation',
    title: 'Scenes That Shape Every Hour',
    description:
      'Layered lighting scenes tune brightness, color temperature, and mood instantly. Every arrival, dinner, and late-night unwind feels perfectly orchestrated without you lifting a finger.',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80',
    accent: '#8ab4ff',
    icon: Lightbulb,
  },
  {
    id: 'av',
    eyebrow: '02 / Audio Video Automation',
    title: 'Entertainment With Invisible Control',
    description:
      'One touch launches cinema-grade sound, synchronized displays, and hidden hardware across every room without cluttering the architecture or interrupting the moment.',
    image:
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80',
    accent: '#c7a6ff',
    icon: Volume2,
  },
  {
    id: 'shades',
    eyebrow: '03 / Shades Automation',
    title: 'Daylight Managed With Precision',
    description:
      'Motorized shades respond to sun path, privacy, and comfort in real time, protecting interiors while keeping every space calm, balanced, and beautifully lit.',
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80',
    accent: '#7ee7d8',
    icon: Blinds,
  },
  {
    id: 'hvac',
    eyebrow: '04 / HVAC Automation',
    title: 'Climate Intelligence In Every Zone',
    description:
      'Smart climate routines learn occupancy and outdoor conditions to maintain exact comfort, reduce waste, and keep performance refined throughout the home.',
    image:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    accent: '#8ce1a1',
    icon: Thermometer,
  },
  {
    id: 'security',
    eyebrow: '05 / Security Automation',
    title: 'Protection That Stays Effortless',
    description:
      'Cameras, access control, alarms, and remote awareness work as one discreet security layer, giving you confidence without adding friction to daily living.',
    image:
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1600&q=80',
    accent: '#ffd47a',
    icon: ShieldCheck,
  },
  {
    id: 'amc',
    eyebrow: '06 / Core Maintenance',
    title: 'Care Plans For Peak Performance',
    description:
      'Preventive service, diagnostics, and priority support keep every automation layer current, resilient, and operating with the polish expected from a premium system.',
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80',
    accent: '#ff9d8f',
    icon: Wrench,
  },
];

function ServicePanelCard({
  service,
  index,
}: {
  service: ServicePanel;
  index: number;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useBreakpoint();
  const Icon = service.icon;

  const isImageRight = index % 2 === 0;

  useGSAP(
    () => {
      // Image Parallax as the section scrolls into view
      gsap.fromTo(
        imageRef.current,
        { scale: 1.15, yPercent: isMobile ? -5 : -15 },
        {
          scale: 1,
          yPercent: 0,
          ease: EASE.none,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        }
      );

      // Staggered reveal for text content — scoped with component-specific class (audit M2)
      const elements = gsap.utils.toArray('.cs-stagger-el', contentRef.current);
      gsap.fromTo(
        elements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: EASE.reveal,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 75%',
            end: 'top 20%',
            scrub: isMobile ? false : 1, // On desktop, tie it to scroll smooth scrub. On mobile, just play on enter.
            toggleActions: 'play none none reverse',
          },
        }
      );
    },
    { scope: cardRef, dependencies: [isMobile] }
  );

  return (
    <article
      ref={cardRef}
      className="sticky top-0 z-20 flex h-[100svh] w-full flex-col overflow-hidden bg-white md:h-screen md:flex-row shadow-[0_-20px_50px_rgba(0,0,0,0.08)]"
      style={{ zIndex: 20 + index }}
    >
      {/* Texture Overlay */}
      <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Image Panel */}
      <div 
        className={`relative h-[45%] w-full overflow-hidden bg-neutral-100 md:h-full md:w-1/2 ${isImageRight ? 'md:order-2' : 'md:order-1'}`}
      >
        <div
          ref={imageRef}
          className="absolute inset-0 h-[120%] w-[120%] -left-[10%] -top-[10%] origin-center bg-cover bg-center transform-gpu"
          style={{ backgroundImage: `url(${service.image})` }}
        />
        {/* Soft gradient overlay for text readability on mobile */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent md:hidden" />
      </div>

      {/* Content Panel */}
      <div 
        ref={contentRef}
        className={`relative flex h-[55%] w-full flex-col justify-center px-6 sm:px-12 md:h-full md:w-1/2 lg:px-20 ${isImageRight ? 'md:order-1' : 'md:order-2'}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.02),transparent_70%)]" />

        <div className="relative z-10 max-w-xl mx-auto md:mx-0">
          <div
            className="cs-stagger-el mb-6 md:mb-8 inline-flex items-center gap-3 rounded-full border border-black/10 bg-black/[0.03] px-4 py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-black backdrop-blur-md"
          >
            <Icon className="h-4 w-4" style={{ color: service.accent }} />
            <span>{service.eyebrow}</span>
          </div>

          <h3 className="cs-stagger-el mb-4 md:mb-6 text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[4rem] font-medium leading-[1.05] tracking-tight text-black drop-shadow-sm">
            {service.title}.
          </h3>

          <p className="cs-stagger-el text-[15px] sm:text-base md:text-lg leading-[1.7] text-black/60 mb-8 md:mb-12 max-w-[90%]">
            {service.description}
          </p>

          <div className="cs-stagger-el">
            <button
              type="button"
              aria-label={`Explore ${service.title} solution`}
              className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span className="relative z-10">Explore Solution</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              <div 
                className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-20" 
                style={{ backgroundColor: service.accent }} 
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ConnectedSystems() {
  const containerRef = useRef<HTMLElement>(null);
  useGSAP(() => {
    // Scoped header reveal using gsap.utils.toArray with scope (audit M1)
    const headerEls = gsap.utils.toArray('.cs-header-el', containerRef.current);
    const headerContainer = containerRef.current?.querySelector('.cs-header-container');

    if (headerEls.length > 0 && headerContainer) {
      gsap.fromTo(headerEls, 
        { y: 40, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.15, 
          ease: EASE.reveal,
          scrollTrigger: {
            trigger: headerContainer,
            start: 'top 70%',
          }
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative z-20 w-full bg-white">
      
      {/* Intro Pin Section - Sticks at top before cards slide over it */}
      <div className="cs-header-container sticky top-0 z-10 flex h-[70vh] w-full flex-col items-center justify-center overflow-hidden px-6 text-center md:h-[80vh]">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.03),transparent_50%)]" />
        
        <div className="relative z-10 max-w-4xl">
          <div className="cs-header-el mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-5 py-2 text-xs font-semibold tracking-[0.2em] uppercase text-black/80 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-black" />
            Connected Systems
          </div>
          <h2 className="cs-header-el text-[2.5rem] font-medium leading-[1.05] tracking-tight text-black sm:text-[3.5rem] lg:text-[5rem]">
            Our Automation Expertise
          </h2>
          <p className="cs-header-el mt-6 text-base text-black/50 max-w-xl mx-auto">
            Explore the comprehensive systems and meticulously integrated technologies we engineer to elevate every aspect of modern living.
          </p>
        </div>
      </div>

      {/* Stacked Cards mapped directly in the flow */}
      <div className="relative z-20 w-full">
        {SERVICES.map((service, index) => (
          <ServicePanelCard
            key={service.id}
            service={service}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
