'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { gsap, useGSAP } from '../../lib/gsapSetup';
import { X, ArrowRight } from 'lucide-react';

interface SubItem {
  label: string;
  href: string;
}

interface MenuItem {
  id: string;
  label: string;
  href: string;
  image: string;
  subItems: SubItem[];
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'solutions',
    label: 'Solutions',
    href: '#solutions',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    subItems: [
      { label: 'Residential', href: '#residential' },
      { label: 'Hospitality', href: '#hospitality' },
      { label: 'Commercial', href: '#commercial' },
    ]
  },
  {
    id: 'services',
    label: 'Services',
    href: '#services',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070&auto=format&fit=crop',
    subItems: [
      { label: 'Lighting Automation', href: '#lighting' },
      { label: 'Audio Video', href: '#av' },
      { label: 'Climate Control', href: '#hvac' },
      { label: 'Smart Security', href: '#security' },
    ]
  },
  {
    id: 'projects',
    label: 'Projects',
    href: '#projects',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
    subItems: [
      { label: 'Featured Work', href: '#projects' },
      { label: 'Private Residences', href: '#projects' },
      { label: 'Smart Offices', href: '#projects' },
    ]
  },
  {
    id: 'company',
    label: 'Company',
    href: '#company',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
    subItems: [
      { label: 'Our Story', href: '#about' },
      { label: 'Expertise', href: '#expertise' },
      { label: 'Process', href: '#process' },
      { label: 'Contact', href: '#contact' },
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
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<MenuItem | null>(MENU_ITEMS[0]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const mainTimeline = useRef<gsap.core.Timeline | null>(null);

  // Mount logic for Portal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Main Opening Animation Setup
  useGSAP(() => {
    if (!bgOverlayRef.current || !mounted) return;

    // Initial Set states
    gsap.set(bgOverlayRef.current, { autoAlpha: 0 });
    gsap.set(leftPanelRef.current, { autoAlpha: 0 });
    gsap.set(rightPanelRef.current, { autoAlpha: 0 });
    gsap.set(containerRef.current, { clipPath: 'circle(0% at calc(100% - 48px) 48px)' });
    gsap.set('.menu-link-wrapper', { y: 40, opacity: 0 });

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: 'expo.inOut', duration: 1.2 }
    });

    // 1. Container expands from button
    tl.to(containerRef.current, {
      clipPath: 'circle(150% at calc(100% - 48px) 48px)',
      duration: 1.2,
    })
    // 2. Background and Panels fade in
    .to([bgOverlayRef.current, leftPanelRef.current, rightPanelRef.current], {
      autoAlpha: 1,
      duration: 0.8,
    }, '-=1.0')
    // 3. Links stagger up
    .to('.menu-link-wrapper', {
      y: 0,
      opacity: 1,
      stagger: 0.05,
      duration: 0.9,
      ease: 'power3.out',
    }, '-=0.8');

    mainTimeline.current = tl;

  }, { scope: containerRef, dependencies: [mounted] });

  // Play/Reverse logic
  useEffect(() => {
    if (isOpen) {
      mainTimeline.current?.play();
      document.body.style.overflow = 'hidden';
    } else {
      mainTimeline.current?.reverse();
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Dynamic Image & Submenu Transition on Hover Change
  useGSAP(() => {
    if (activeItem && isOpen) {
      // Animate the image crossfade (smooth, minimal effect)
      gsap.fromTo('.dynamic-preview-image', 
        { scale: 1.03, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }
      );
      
      // Animate the submenu content
      gsap.fromTo('.submenu-content', 
        { x: 20, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.1 }
      );
    }
  }, { dependencies: [activeItem], scope: containerRef });

  const handleLinkClick = (e: React.MouseEvent, href: string, index?: number) => {
    // Mobile Accordion Logic
    if (window.innerWidth < 1024 && index !== undefined && hoveredIndex !== index) {
      e.preventDefault();
      e.stopPropagation();
      setHoveredIndex(index);
      setActiveItem(MENU_ITEMS[index]);
      return;
    }

    // Navigation execution
    if (href.startsWith('#')) {
      e.preventDefault();
      onClose();
      const targetId = href.replace('#', '');
      const target = document.getElementById(targetId);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 800); // Wait for reverse animation
      }
    }
  };

  if (!mounted) return null;

  const content = (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[999999] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      {/* Light Off-White Background */}
      <div 
        ref={bgOverlayRef}
        className="absolute inset-0 bg-[#fcfcfc] will-change-transform"
      >
        {/* Very subtle noise texture (optional, Apple style) */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
      </div>

      <div className="absolute inset-0 flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT PANEL: Main Navigation */}
        <div 
          ref={leftPanelRef}
          className="relative w-full lg:w-[45%] h-full flex flex-col justify-between px-6 lg:px-16 pt-24 lg:pt-32 pb-12 overflow-y-auto lg:overflow-hidden scrollbar-hide will-change-transform"
        >

          {/* Links Area */}
          <nav className="flex flex-col gap-4 sm:gap-6 mt-12 lg:mt-0 flex-1 justify-center relative z-10">
            {MENU_ITEMS.map((item, index) => (
              <div 
                key={item.id}
                className="relative group py-2"
                onMouseEnter={() => {
                  if (window.innerWidth >= 1024 && hoveredIndex !== index) {
                    setActiveItem(item);
                    setHoveredIndex(index);
                  }
                }}
                onMouseLeave={() => {
                  if (window.innerWidth >= 1024) setHoveredIndex(null);
                }}
              >
                <div className="menu-link-wrapper relative z-50">
                  <Link 
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href, index)}
                    className={`block text-[12vw] lg:text-[5vw] font-medium leading-[0.9] tracking-tight transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform origin-left relative z-50
                      ${hoveredIndex !== null && hoveredIndex !== index ? 'opacity-30 blur-[2px] translate-x-0' : 'opacity-100'}
                      ${hoveredIndex === index ? 'pl-6 translate-x-4 text-accent' : 'text-black'}
                    `}
                  >
                    <span className="inline-block relative pointer-events-none">
                      {item.label}
                      <span className={`absolute -left-6 lg:-left-8 top-[15%] text-[0.8rem] lg:text-[1rem] font-sans font-medium text-accent transition-all duration-500 ${hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                        0{index + 1}
                      </span>
                    </span>
                  </Link>
                </div>

                {/* Mobile Accordion */}
                <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${hoveredIndex === index ? 'max-h-[300px] opacity-100 mt-6 mb-4' : 'max-h-0 opacity-0'}`}>
                  <div className="flex flex-col gap-4 pl-4 border-l-2 border-accent py-2">
                    {item.subItems.map((sub, i) => (
                      <Link key={i} href={sub.href} onClick={(e) => handleLinkClick(e, sub.href)} className="text-xl font-medium text-black/60 active:text-accent flex items-center justify-between">
                        {sub.label}
                        <ArrowRight className="w-5 h-5 opacity-30" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* RIGHT PANEL: Dynamic Preview & Sub-navigation (Desktop Only) */}
        <div 
          ref={rightPanelRef}
          className="hidden lg:flex relative w-[55%] h-full flex-col justify-between overflow-hidden will-change-transform bg-[#fcfcfc] border-l border-black/[0.03]"
        >
          {/* Dynamic Image Background Layer (Clean & Bright) */}
          {activeItem && (
            <div className="absolute inset-0 p-8 lg:p-12 pl-0">
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl shadow-black/5 bg-gray-100">
                <img 
                  key={`img-${activeItem.id}`}
                  src={activeItem.image}
                  alt={activeItem.label}
                  className="dynamic-preview-image absolute inset-0 w-full h-full object-cover object-center"
                />
                
                {/* Subtle gradient so text is perfectly readable on light images */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Submenu Content Over Image */}
                <div className="absolute bottom-12 left-12 z-20 flex-1 flex flex-col justify-end max-w-lg">
                  {activeItem && (
                    <div key={`sub-${activeItem.id}`} className="submenu-content">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-8 h-[2px] bg-accent" />
                        <h3 className="text-xs uppercase tracking-[0.2em] text-white/90 font-bold">Discover {activeItem.label}</h3>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {activeItem.subItems.map((sub, i) => (
                          <Link 
                            key={i} 
                            href={sub.href} 
                            onClick={(e) => handleLinkClick(e, sub.href)} 
                            className="group flex items-center justify-between py-3 border-b border-white/20 hover:border-white transition-all duration-300"
                          >
                            <span className="text-2xl font-medium text-white/90 group-hover:text-white group-hover:translate-x-2 transition-all duration-300 ease-out">
                              {sub.label}
                            </span>
                            <ArrowRight className="w-5 h-5 text-accent opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );

  return createPortal(content, document.body);
}
