'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { cn } from '@/lib/utils';

interface AwardItem {
  year: string;
  title: string;
  category: string;
  image: string;
}

const AWARDS: AwardItem[] = [
  { year: '2020', title: 'Authorised Dealer', category: 'Crestron', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop' },
  { year: '—', title: 'Certificate of Authorisation', category: 'Samsung', image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop' },
  { year: '—', title: 'Certificate of Authorisation', category: 'Sony', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=800&auto=format&fit=crop' },
  { year: '2022', title: 'Authorised Dealer', category: 'Crestron', image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop' },
  { year: '2023', title: 'Authorised Dealer', category: 'Control 4', image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop' },
  { year: '—', title: 'Financial Control', category: 'Jsa Online', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop' },
  { year: '2022', title: 'Smart Space Award', category: 'Smart Space Award', image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop' },
  { year: '—', title: 'Certificate of Authorisation', category: 'Sony', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=800&auto=format&fit=crop' },
  { year: '2022', title: 'Deepest Appreciation', category: 'Smart Space Award', image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop' },
  { year: '2015', title: 'Top Performer – All India', category: 'Lutron', image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop' },
  { year: '2016', title: 'Top Performer – All India', category: 'Lutron', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop' },
  { year: '2017', title: 'Top Performer – All India', category: 'Lutron', image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop' },
  { year: '2018', title: 'Annual Partner Colloquium Recognition', category: 'Lutron', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=800&auto=format&fit=crop' },
  { year: '2019', title: 'Platinum Award', category: 'Lutron', image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop' },
  { year: '2020', title: 'Unstoppable Signature Award', category: 'Lutron', image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop' },
  { year: '2021', title: 'Luxury Residential Business Championship', category: 'Lutron', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop' },
  { year: '2022', title: 'Luxury Residential Business Championship', category: 'Lutron', image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop' },
  { year: '2023', title: 'Luxury Residential & Hospitality Business Championship', category: 'Lutron', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=800&auto=format&fit=crop' },
  { year: '2024', title: 'Residential & Hospitality National Award', category: 'Lutron', image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop' },
  { year: '2026', title: 'Hall of Fame', category: 'Lutron', image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop' },
];

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
  const imageRef = useRef<HTMLDivElement>(null);
  const isAnyHovered = hoveredIndex !== null;
  const isThisHovered = hoveredIndex === index;

  useGSAP(() => {
    if (!rowRef.current || !imageRef.current) return;

    const row = rowRef.current;
    const image = imageRef.current;

    gsap.set(image, { xPercent: -50, yPercent: -50 });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = row.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(image, {
        x: x,
        y: y,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      setHoveredIndex(index);

      const rect = row.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      gsap.set(image, { x, y });

      gsap.to(image, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    const handleMouseLeave = () => {
      setHoveredIndex(null);
      gsap.to(image, {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    row.addEventListener('mousemove', handleMouseMove);
    row.addEventListener('mouseenter', handleMouseEnter);
    row.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      row.removeEventListener('mousemove', handleMouseMove);
      row.removeEventListener('mouseenter', handleMouseEnter);
      row.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [index, setHoveredIndex]);

  return (
    <div
      ref={rowRef}
      className={cn(
        "group award-row relative flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-black/[0.08] cursor-pointer transition-all duration-700 ease-out",
        isAnyHovered && !isThisHovered ? "opacity-30" : "opacity-100"
      )}
      style={{ zIndex: isThisHovered ? 50 : 1 }}
    >
      {/* Floating Image */}
      <div
        ref={imageRef}
        className="absolute top-0 left-0 pointer-events-none z-[100] w-[280px] h-[200px] md:w-[400px] md:h-[280px] rounded-2xl overflow-hidden opacity-0 scale-75 shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
      >
        <Image
          src={award.image}
          alt={award.title}
          fill
          sizes="(min-width: 768px) 400px, 280px"
          className="object-cover"
        />
      </div>

      <div className="flex-shrink-0 w-full md:w-[120px] text-sm md:text-base font-medium text-accent/40 mb-4 md:mb-0 transition-colors duration-500 group-hover:text-accent/60">
        {award.year}
      </div>

      <div className="flex-1 flex items-center pr-4">
        <h3 className={cn(
          "text-xl md:text-2xl lg:text-3xl font-light tracking-wide text-black transition-transform duration-700 ease-out",
          isThisHovered ? "md:translate-x-8" : ""
        )}>
          {award.title}
        </h3>
      </div>

      <div className="flex-shrink-0 mt-4 md:mt-0 text-xs md:text-sm font-medium text-black/40 uppercase tracking-[0.2em] transition-colors duration-500 group-hover:text-black/60 md:text-right">
        {award.category}
      </div>
    </div>
  );
}

export function AwardsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo('.awards-header > *',
      { y: 50, opacity: 0 },
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

    const rows = gsap.utils.toArray('.award-row', containerRef.current);
    gsap.fromTo(rows,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.awards-list',
          start: 'top 80%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#fcfcfc] py-24 md:py-40 overflow-hidden"
      id="awards"
    >
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="awards-header flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-32 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-black/20" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-black/60">Recognition</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-black leading-[1.2]">
              Awards<span className="text-black/30">.</span>
            </h2>
          </div>
          <div className="max-w-[300px] text-black/50 text-sm md:text-base leading-relaxed font-medium">
            A testament to our unwavering commitment to design excellence and innovation over the years.
          </div>
        </div>

        <div className="awards-list w-full flex flex-col border-t border-black/[0.08]">
          {AWARDS.map((award, index) => (
            <AwardRow
              key={index}
              award={award}
              index={index}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
