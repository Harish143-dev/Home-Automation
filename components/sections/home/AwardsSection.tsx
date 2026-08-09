'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface AwardItem {
  year: string;
  title: string;
  category: string;
  image: string;
}

const AWARDS: AwardItem[] = [
  { year: '2026', title: 'Hall of Fame', category: 'Lutron', image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop' },
  { year: '2024', title: 'Residential & Hospitality National Award', category: 'Lutron', image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop' },
  { year: '2023', title: 'Authorised Dealer', category: 'Control 4', image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop' },
  { year: '2023', title: 'Luxury Residential & Hospitality Business Championship', category: 'Lutron', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=800&auto=format&fit=crop' },
  { year: '2022', title: 'Authorised Dealer', category: 'Crestron', image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop' },
  { year: '2022', title: 'Smart Space Award', category: 'Smart Space Award', image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop' },
  { year: '2022', title: 'Deepest Appreciation', category: 'Smart Space Award', image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop' },
  { year: '2022', title: 'Luxury Residential Business Championship', category: 'Lutron', image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop' },
  { year: '2021', title: 'Luxury Residential Business Championship', category: 'Lutron', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop' },
  { year: '2020', title: 'Authorised Dealer', category: 'Crestron', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop' },
  { year: '2020', title: 'Unstoppable Signature Award', category: 'Lutron', image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop' },
  { year: '2019', title: 'Platinum Award', category: 'Lutron', image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop' },
  { year: '2018', title: 'Annual Partner Colloquium Recognition', category: 'Lutron', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=800&auto=format&fit=crop' },
  { year: '2017', title: 'Top Performer – All India', category: 'Lutron', image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop' },
  { year: '2016', title: 'Top Performer – All India', category: 'Lutron', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop' },
  { year: '2015', title: 'Top Performer – All India', category: 'Lutron', image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop' },
  { year: '—', title: 'Certificate of Authorisation', category: 'Samsung', image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop' },
  { year: '—', title: 'Certificate of Authorisation', category: 'Sony', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=800&auto=format&fit=crop' },
  { year: '—', title: 'Financial Control', category: 'Jsa Online', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop' },
  { year: '—', title: 'Certificate of Authorisation', category: 'Sony', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=800&auto=format&fit=crop' },
];

function AwardCard({ award }: { award: AwardItem }) {
  return (
    <div className="award-card group relative flex-shrink-0 w-[280px] md:w-[320px] lg:w-[380px] flex flex-col gap-6 snap-start">
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-surface-darker">
        <Image
          src={award.image}
          alt={award.title}
          fill
          sizes="(max-width: 768px) 280px, 380px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
      </div>

      <div className="flex flex-col gap-3 px-2">
        <div className="flex items-center justify-between border-b border-black/5 pb-3">
          <span className="text-sm md:text-base font-medium text-accent">{award.year}</span>
          <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-muted">{award.category}</span>
        </div>
        <h4 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground">
          {award.title}
        </h4>
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
      carouselRef.current.scrollBy({ left: -(cardWidth + 32), behavior: 'smooth' }); // 32 is roughly gap-8
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
        <div className="awards-header flex flex-col md:flex-row md:items-end justify-between mb-6 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-black/20" />
              <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-accent">Recognition</span>
            </div>
            <h2 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground">
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
              className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 hover:border-black/20 transition-all duration-300 group"
              aria-label="Previous awards"
            >
              <ArrowLeft className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 hover:border-black/20 transition-all duration-300 group"
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
