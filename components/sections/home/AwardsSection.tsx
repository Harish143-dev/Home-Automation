'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { ArrowLeft, ArrowRight, Trophy } from 'lucide-react';

interface AwardItem {
  year: string;
  title: string;
  category: string;
}

const AWARDS: AwardItem[] = [
  { year: '2026', title: 'Hall of Fame', category: 'Lutron' },
  { year: '2024', title: 'Residential & Hospitality National Award', category: 'Lutron' },
  { year: '2023', title: 'Authorised Dealer', category: 'Control 4' },
  { year: '2023', title: 'Luxury Residential & Hospitality Business Championship', category: 'Lutron' },
  { year: '2022', title: 'Authorised Dealer', category: 'Crestron' },
  { year: '2022', title: 'Smart Space Award', category: 'Smart Space Award' },
  { year: '2022', title: 'Deepest Appreciation', category: 'Smart Space Award' },
  { year: '2022', title: 'Luxury Residential Business Championship', category: 'Lutron' },
  { year: '2021', title: 'Luxury Residential Business Championship', category: 'Lutron' },
  { year: '2020', title: 'Authorised Dealer', category: 'Crestron' },
  { year: '2020', title: 'Unstoppable Signature Award', category: 'Lutron' },
  { year: '2019', title: 'Platinum Award', category: 'Lutron' },
  { year: '2018', title: 'Annual Partner Colloquium Recognition', category: 'Lutron' },
  { year: '2017', title: 'Top Performer – All India', category: 'Lutron' },
  { year: '2016', title: 'Top Performer – All India', category: 'Lutron' },
  { year: '2015', title: 'Top Performer – All India', category: 'Lutron' },
  { year: '—', title: 'Certificate of Authorisation', category: 'Samsung' },
  { year: '—', title: 'Certificate of Authorisation', category: 'Sony' },
  { year: '—', title: 'Financial Control', category: 'Jsa Online' },
  { year: '—', title: 'Certificate of Authorisation', category: 'Sony' },
];

function AwardCard({ award }: { award: AwardItem }) {
  return (
    <div className="award-card group relative flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] min-h-[220px] p-6 sm:p-8 rounded-2xl bg-panel border border-border/80 flex flex-col justify-between shadow-sm hover:border-accent/40 hover:shadow-md transition-all duration-300 snap-start">
      <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent transition-transform duration-300 group-hover:scale-110">
          <Trophy className="w-5 h-5" />
        </div>
        <span className="text-sm font-medium text-accent font-mono">{award.year}</span>
      </div>

      <div className="flex flex-col gap-2">
        <span className="tracking-[0.2em] text-xs font-medium text-muted">
          {award.category}
        </span>
        <h3 className="text-foreground">
          {award.title}
        </h3>
      </div>
    </div>
  );
}

export function AwardsSection({ className }: { className?: string }) {
  const containerRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo('.awards-header > *',
      { y: 40, opacity: 0 },
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

    const cards = gsap.utils.toArray('.award-card', containerRef.current);
    gsap.fromTo(cards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.awards-list',
          start: 'top 80%',
        }
      }
    );
  }, { scope: containerRef });

  const scrollLeft = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.firstElementChild?.clientWidth || 320;
      carouselRef.current.scrollBy({ left: -(cardWidth + 32), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.firstElementChild?.clientWidth || 320;
      carouselRef.current.scrollBy({ left: (cardWidth + 32), behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className={`py-12 md:py-16 relative w-full bg-background overflow-hidden ${className || ''}`}
      id="awards"
    >
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-16 lg:px-24">
        <div className="awards-header flex flex-col md:flex-row md:items-end justify-between mb-8 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-8 bg-border" />
              <h5 className="text-accent !mb-0">Recognition</h5>
            </div>
            <h2 className="text-foreground">
              Awards<span className="text-foreground/30">.</span>
            </h2>
          </div>

          <div className="flex flex-col items-start md:items-end gap-6 md:gap-8">
            <div className="max-w-[320px] text-muted text-sm md:text-base leading-relaxed font-light md:text-right">
              A testament to our unwavering commitment to design excellence and innovation over the years.
            </div>
          </div>
        </div>

        {/* Carousel Navigation */}
        <div className="flex justify-end mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-panel hover:border-accent/40 transition-all duration-300 group"
              aria-label="Previous awards"
            >
              <ArrowLeft className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-panel hover:border-accent/40 transition-all duration-300 group"
              aria-label="Next awards"
            >
              <ArrowRight className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="awards-list -mx-5 sm:-mx-8 md:-mx-16 lg:-mx-24 px-5 sm:px-8 md:px-16 lg:px-24">
          <div
            ref={carouselRef}
            className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] pb-12 pt-4"
          >
            {AWARDS.map((award, index) => (
              <AwardCard
                key={index}
                award={award}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
