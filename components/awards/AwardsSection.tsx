'use client';

import React, { useRef, useState } from 'react';
import { gsap, useGSAP } from '../../lib/gsapSetup';
import { Award, Trophy, Star, Medal, Sparkles, Crown, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AwardItem {
  year: string;
  title: string;
  category: string;
  icon: React.ReactNode;
}

const AWARDS: AwardItem[] = [
  {
    year: '2015',
    title: 'TOP PERFORMER',
    category: 'ALL INDIA',
    icon: <Trophy className="w-6 h-6" />,
  },
  {
    year: '2016',
    title: 'ANNUAL PARTNER',
    category: 'RECOGNITION',
    icon: <Award className="w-6 h-6" />,
  },
  {
    year: '2017',
    title: 'PLATINUM',
    category: 'AWARD',
    icon: <Crown className="w-6 h-6" />,
  },
  {
    year: '2021',
    title: 'RESIDENTIAL CHAMPION',
    category: 'LUXURY BUSINESS',
    icon: <Star className="w-6 h-6" />,
  },
  {
    year: '2022',
    title: 'HOSPITALITY AWARD',
    category: 'BUSINESS EXCELLENCE',
    icon: <Medal className="w-6 h-6" />,
  },
  {
    year: '2026',
    title: 'HALL OF FAME',
    category: 'LIFETIME ACHIEVEMENT',
    icon: <Sparkles className="w-6 h-6" />,
  },
];

const BRAND_ACCENT = '#8c1817';

function AwardRow({ 
  award, 
  index, 
  hoveredIndex, 
  setHoveredIndex 
}: { 
  award: AwardItem; 
  index: number; 
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;
  const isAnyHovered = hoveredIndex !== null;
  const isThisHovered = hoveredIndex === index;

  useGSAP(() => {
    if (!rowRef.current || !cardRef.current) return;

    const row = rowRef.current;
    const card = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = row.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(card, {
        x: x,
        y: y,
        duration: 0.8,
        ease: 'power3.out',
      });
    };

    row.addEventListener('mousemove', handleMouseMove);
    return () => row.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={rowRef}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className={cn(
        "group relative flex items-center w-full py-8 md:py-12 border-b border-black/[0.08] cursor-none transition-all duration-500 ease-in-out",
        isAnyHovered && !isThisHovered ? "opacity-20 blur-[1px]" : "opacity-100"
      )}
      style={{ zIndex: isThisHovered ? 50 : 1 }}
    >
      {/* Background Highlight Strip (Expanding from middle) */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out pointer-events-none"
      >
        <div 
          className="absolute inset-0 scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-in-out"
          style={{ 
            background: `linear-gradient(90deg, transparent, ${BRAND_ACCENT}08, transparent)`,
            transformOrigin: 'center'
          }}
        />
        {/* Subtle accent line */}
        <div 
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-accent/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-1000"
        />
      </div>
      
      {/* 3-Column Grid: 45% | 10% | 45% */}
      <div className="grid grid-cols-[45%_10%_45%] w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 pointer-events-none">
        
        {/* Row Content - Alternating */}
        <div className={cn(
          "flex flex-col gap-2 transition-transform duration-700 ease-out group-hover:translate-x-2",
          isLeft ? "col-start-1" : "col-start-3 items-end text-right group-hover:-translate-x-2"
        )}>
          <div className="flex items-center gap-4 text-black/20 group-hover:text-accent/60 transition-colors duration-500">
            <span className="text-[10px] md:text-xs font-mono tracking-[0.3em]">{award.year}</span>
            <div className="h-[1px] w-8 bg-black/5 group-hover:bg-accent/20 transition-colors" />
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase">{award.category}</span>
          </div>
          
          <h3 className={cn(
            "text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-black/40 group-hover:text-black transition-all duration-700 uppercase leading-none"
          )}>
            {award.title}
          </h3>
        </div>

        {/* Empty Center Space (10%) */}
        <div className="col-start-2" />
      </div>

      {/* Floating Award Card (absolute to row) */}
      <div
        ref={cardRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-[100%] pointer-events-none z-[100] opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out"
      >
        <div className="relative p-5 rounded-xl bg-white/95 border border-black/[0.1] shadow-[0_20px_40px_rgba(0,0,0,0.12)] overflow-hidden min-w-[220px] backdrop-blur-md">
          <div className="relative z-10 flex flex-col items-center gap-4 text-center">
            <div 
              className="p-4 rounded-full bg-accent/5 border border-accent/10 text-accent"
            >
              {award.icon}
            </div>
            <div>
              <div className="text-[9px] font-mono tracking-[0.3em] uppercase text-black/40 mb-1">{award.year} Recognition</div>
              <div className="text-base font-bold text-black tracking-wide uppercase leading-tight">{award.title}</div>
            </div>
          </div>
          <ArrowUpRight className="absolute top-3 right-3 w-3 h-3 text-black/10" />
        </div>
      </div>
    </div>
  );
}

export function AwardsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Entrance animation for rows
    const rows = gsap.utils.toArray('.award-row-container', containerRef.current);
    gsap.fromTo(rows, 
      { y: 60, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        stagger: 0.1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );

    // Title reveal
    gsap.fromTo('.awards-title-el',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-background py-20 md:py-28 overflow-hidden border-t border-black/[0.03]"
      id="awards"
    >
      <div className="relative z-10 w-full">
        {/* ── Section Header ── */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-16 md:mb-24">
          <div className="flex flex-col gap-4">
            <div className="awards-title-el flex items-center gap-3">
              <div className="h-[1px] w-12 bg-accent/20" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-accent/60">Our Legacy</span>
            </div>
            <h2 className="awards-title-el text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-black uppercase leading-[0.9]">
              Awards & <br />
              <span className="text-black/10 italic font-medium">Recognition</span>
            </h2>
          </div>
        </div>

        {/* ── Awards Rows ── */}
        <div className="w-full flex flex-col border-t border-black/[0.08]">
          {AWARDS.map((award, index) => (
            <div key={index} className="award-row-container w-full">
              <AwardRow 
                award={award} 
                index={index} 
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
              />
            </div>
          ))}
        </div>
        
        <div className="w-full h-[1px] bg-black/[0.08]" />
      </div>
      
      <style jsx global>{`
        #awards .group:hover {
          cursor: none;
        }
      `}</style>
    </section>
  );
}
