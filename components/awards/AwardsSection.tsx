'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsapSetup';
import {
  ShieldCheck,
  Award,
  Star,
  Trophy,
  Leaf,
  Zap,
  Medal,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { useBreakpoint } from '../../hooks/useBreakpoint';

interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  icon: LucideIcon;
}

const AWARDS: AwardItem[] = [
  {
    id: 'cedia',
    title: 'CEDIA Excellence',
    issuer: 'Custom Electronic Design & Installation Association',
    year: '2025',
    description: 'Awarded for outstanding achievement in residential technology integration and system design.',
    icon: Trophy,
  },
  {
    id: 'red-dot',
    title: 'Red Dot Design',
    issuer: 'Red Dot GmbH & Co. KG',
    year: '2024',
    description: 'Recognized for exceptional product design quality in smart home interface systems.',
    icon: Award,
  },
  {
    id: 'iso-9001',
    title: 'ISO 9001 Certified',
    issuer: 'International Organization for Standardization',
    year: '2025',
    description: 'Certified quality management system ensuring consistent delivery of premium automation.',
    icon: ShieldCheck,
  },
  {
    id: 'ces-innovation',
    title: 'CES Innovation',
    issuer: 'Consumer Technology Association',
    year: '2025',
    description: 'Honored for breakthrough innovation in consumer technology and smart living systems.',
    icon: Zap,
  },
  {
    id: 'knx-certified',
    title: 'KNX Certified',
    issuer: 'KNX Association',
    year: '2024',
    description: 'Certified expertise in the worldwide standard for building automation and smart infrastructure.',
    icon: Star,
  },
  {
    id: 'leed',
    title: 'LEED Platinum',
    issuer: 'U.S. Green Building Council',
    year: '2024',
    description: 'Platinum-level certification for sustainable design and energy-efficient building automation.',
    icon: Leaf,
  },
  {
    id: 'crestron-masters',
    title: 'Crestron Masters',
    issuer: 'Crestron Electronics',
    year: '2025',
    description: 'Elite-level certification for advanced Crestron programming and system architecture.',
    icon: Medal,
  },
  {
    id: 'smart-home-mark',
    title: 'Smart Home Mark',
    issuer: 'Smart Home Industry Council',
    year: '2025',
    description: 'Verified mark of quality for connected home installations meeting the highest safety and performance standards.',
    icon: Sparkles,
  },
];

function MagneticAwardCard({ award }: { award: AwardItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const card = cardRef.current;
    const icon = iconRef.current;
    if (!card || !icon) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Spotlight glow variable update
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Magnetic pull on icon
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const moveX = (x - centerX) * 0.15;
      const moveY = (y - centerY) * 0.15;

      gsap.to(icon, {
        x: moveX,
        y: moveY,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(icon, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className="aw-card group relative overflow-hidden rounded-2xl sm:rounded-[24px] border border-black/[0.08] bg-white p-6 sm:p-8 md:p-10 transition-all duration-500 hover:border-black/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] opacity-0"
      style={{ transform: 'translateY(40px)' }}
    >
      {/* Spotlight Glow */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,0,0,0.03), transparent 40%)`,
        }}
      />
      
      <div className="relative z-10 flex flex-col h-full min-h-[180px] sm:min-h-[200px] md:min-h-[220px]">
        <div className="flex items-start justify-between mb-8 sm:mb-10 md:mb-12">
          <div 
            ref={iconRef}
            className="flex h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center rounded-[14px] sm:rounded-[16px] md:rounded-[18px] bg-black/[0.03] border border-black/[0.06] shadow-sm transition-colors duration-500 group-hover:bg-black/[0.06]"
          >
            <award.icon className="h-5 w-5 sm:h-6 sm:w-6 text-black transition-transform duration-500 group-hover:scale-110" />
          </div>
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-black/40">
            {award.year}
          </span>
        </div>
        
        <div className="mt-auto">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black tracking-tight mb-1.5 sm:mb-2">{award.title}</h3>
          <p className="text-xs sm:text-sm font-semibold text-black/60 mb-2 sm:mb-3">{award.issuer}</p>
          <p className="text-xs sm:text-sm text-black/50 leading-relaxed font-light">{award.description}</p>
        </div>
      </div>
    </div>
  );
}

export function AwardsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || !containerRef.current) return;

    // Header reveal
    const headerEls = gsap.utils.toArray('.aw-header-el', containerRef.current);
    gsap.fromTo(headerEls, 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    );

    // Cards waterfall reveal
    const cards = gsap.utils.toArray('.aw-card', containerRef.current);
    gsap.to(cards, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
      }
    });

  }, { scope: containerRef, dependencies: [isReady] });

  if (!isReady) {
    return <section className="w-full h-screen bg-background" />;
  }

  // Split awards into 3 columns for desktop, 2 for tablet, 1 for mobile.
  // We'll use CSS grid/flex to handle responsive masonry organically.
  const col1 = AWARDS.filter((_, i) => i % 3 === 0);
  const col2 = AWARDS.filter((_, i) => i % 3 === 1);
  const col3 = AWARDS.filter((_, i) => i % 3 === 2);

  return (
    <section
      ref={containerRef}
      id="company"
      className="relative w-full bg-background py-20 sm:py-28 md:py-32 lg:py-48 overflow-hidden border-t border-black/5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.02),transparent_50%)] pointer-events-none" />

      {/* ── Header ── */}
      <div className="relative z-10 text-center px-5 sm:px-6 mb-16 sm:mb-20 md:mb-24 lg:mb-32">
        <div className="aw-header-el mb-4 sm:mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-black/70 backdrop-blur-md">
          <Award className="h-3.5 w-3.5 text-black" />
          Awards &amp; Recognition
        </div>
        <h2 className="aw-header-el text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-medium leading-[1.05] tracking-tight text-black">
          Certified Excellence
        </h2>
        <p className="aw-header-el mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-black/50 max-w-xl mx-auto leading-relaxed">
          Recognised by the industry&apos;s most prestigious bodies for quality,
          innovation, and sustainable design.
        </p>
      </div>

      {/* ── Asymmetrical Masonry Grid ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:mt-0">
            {col1.map((award) => (
              <MagneticAwardCard key={award.id} award={award} />
            ))}
          </div>

          {/* Column 2 - Offset visually */}
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 sm:mt-0 lg:mt-24">
            {col2.map((award) => (
              <MagneticAwardCard key={award.id} award={award} />
            ))}
          </div>

          {/* Column 3 - Offset more */}
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 sm:mt-0 lg:mt-48">
            {col3.map((award) => (
              <MagneticAwardCard key={award.id} award={award} />
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
