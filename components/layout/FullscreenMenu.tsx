'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { gsap, useGSAP } from '../../lib/gsapSetup';
import { ArrowRight } from 'lucide-react';

interface SubItem {
  label: string;
  href: string;
}

interface MenuCategory {
  title: string;
  items: SubItem[];
}

const STANDALONE_LINKS = [
  { id: 'about', label: 'About Us', href: '/about' },
  { id: 'energy', label: 'Energy Saving', href: '/energy-saving' },
  { id: 'contact', label: 'Contact Us', href: '/contact' }
];

const CATEGORIZED_LINKS: MenuCategory[] = [
  {
    title: 'The Future of',
    items: [
      { label: 'Residential', href: '/residential' },
      { label: 'Hospitality', href: '#hospitality' },
      { label: 'Commercial', href: '/commercial' },
    ]
  },
  {
    title: 'Disciplines',
    items: [
      { label: 'Lighting Automation', href: '#lighting' },
      { label: 'Audio Video Automation', href: '#av' },
      { label: 'Shades Automation', href: '#shades' },
      { label: 'HVAC Automation', href: '#hvac' },
      { label: 'Security Automation', href: '#security' },
      { label: 'AMC', href: '#amc' },
    ]
  },
  {
    title: 'Work',
    items: [
      { label: 'Residential Projects', href: '#work-residential' },
      { label: 'Hospitality Projects', href: '#work-hospitality' },
      { label: 'Commercial Projects', href: '#work-commercial' },
    ]
  },
  {
    title: 'Experience',
    items: [
      { label: 'Delhi', href: '#experience-delhi' },
      { label: 'Mumbai', href: '#experience-mumbai' },
      { label: 'Bangalore', href: '#experience-bangalore' },
    ]
  },
  {
    title: 'Resources',
    items: [
      { label: 'Blogs', href: '#blogs' },
      { label: 'Case Studies', href: '#case-studies' },
      { label: 'Publications', href: '#publications' },
    ]
  }
];

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgOverlayRef = useRef<HTMLDivElement>(null);
  
  const mainTimeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useGSAP(() => {
    if (!bgOverlayRef.current || !mounted) return;

    gsap.set(bgOverlayRef.current, { autoAlpha: 0 });
    gsap.set(containerRef.current, { clipPath: 'circle(0% at calc(100% - 48px) 48px)' });
    gsap.set('.menu-link-large', { y: 60, opacity: 0, rotate: 2 });
    gsap.set('.menu-category', { y: 40, opacity: 0 });

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: 'expo.inOut', duration: 1.2 }
    });

    tl.to(containerRef.current, {
      clipPath: 'circle(150% at calc(100% - 48px) 48px)',
      duration: 1.2,
    })
    .to(bgOverlayRef.current, {
      autoAlpha: 1,
      duration: 0.8,
    }, '-=1.0')
    .to('.menu-link-large', {
      y: 0,
      opacity: 1,
      rotate: 0,
      stagger: 0.1,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.8')
    .to('.menu-category', {
      y: 0,
      opacity: 1,
      stagger: 0.05,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.9');

    mainTimeline.current = tl;

  }, { scope: containerRef, dependencies: [mounted] });

  useEffect(() => {
    if (isOpen) {
      mainTimeline.current?.play();
      document.body.style.overflow = 'hidden';
    } else {
      mainTimeline.current?.reverse();
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      onClose();
      const targetId = href.replace('#', '');
      const target = document.getElementById(targetId);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 800);
      }
    }
  };

  if (!mounted) return null;

  const content = (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[999999] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <div 
        ref={bgOverlayRef}
        className="absolute inset-0 bg-[#fcfcfc] will-change-transform"
      >
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
      </div>

      <div className="absolute inset-0 flex flex-col lg:flex-row overflow-y-auto overflow-x-hidden lg:overflow-hidden px-6 sm:px-12 lg:px-16 pt-20 pb-8 lg:py-24">
        
        {/* LEFT PANEL: Standalone Huge Links */}
        <div className="w-full lg:w-[40%] flex flex-col justify-center gap-6 lg:gap-8 mb-16 lg:mb-0 relative z-10">
          {STANDALONE_LINKS.map((link) => (
            <div key={link.id} className="menu-link-large will-change-transform origin-left flex">
              <Link 
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="group inline-flex items-center gap-6"
              >
                <span className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-wide text-black transition-colors hover:text-accent">
                  {link.label}
                </span>
                <ArrowRight className="w-8 h-8 text-accent opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out hidden sm:block" />
              </Link>
            </div>
          ))}
        </div>

        {/* RIGHT PANEL: Grid of Categories */}
        <div className="w-full lg:w-[60%] flex flex-col justify-center relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 lg:gap-y-12">
            {CATEGORIZED_LINKS.map((category, idx) => (
              <div key={idx} className="menu-category will-change-transform flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-[1px] bg-accent/40" />
                  <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-black/40">
                    {category.title}
                  </h3>
                </div>
                
                <ul className="flex flex-col gap-3">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <Link 
                        href={item.href}
                        onClick={(e) => handleLinkClick(e, item.href)}
                        className="group inline-flex items-center text-base lg:text-lg font-medium text-black/70 hover:text-black transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );

  return createPortal(content, document.body);
}
