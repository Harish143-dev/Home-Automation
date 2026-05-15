'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { gsap, SplitText, useGSAP } from '../../lib/gsapSetup';
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
    gsap.set(leftPanelRef.current, { x: -60, autoAlpha: 0 });
    gsap.set(rightPanelRef.current, { x: 60, autoAlpha: 0 });
    gsap.set('.menu-link-wrapper', { y: 60, opacity: 0 });

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: 'power3.inOut', duration: 1 }
    });

    // 1. Background fades in
    tl.to(bgOverlayRef.current, {
      autoAlpha: 1,
      duration: 0.8,
    })
    // 2. Panels slide in gracefully
    .to([leftPanelRef.current, rightPanelRef.current], {
      x: 0,
      autoAlpha: 1,
      duration: 1.2,
      ease: 'expo.out',
    }, '-=0.4')
    // 3. Links stagger up (animating the wrapper, NOT the link itself to preserve CSS 3D hover)
    .to('.menu-link-wrapper', {
      y: 0,
      opacity: 1,
      stagger: 0.06,
      duration: 1,
      ease: 'power4.out',
    }, '-=1.0');

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
      // Animate the image crossfade
      gsap.fromTo('.dynamic-preview-image', 
        { scale: 1.05, opacity: 0, filter: 'blur(10px)' }, 
        { scale: 1, opacity: 0.4, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' }
      );
      
      // Animate the submenu content
      gsap.fromTo('.submenu-content', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
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
      {/* Absolute Dark Overlay Layer */}

      <div 
        ref={bgOverlayRef}
        className="absolute inset-0 bg-[#060606] will-change-transform"
      >
        {/* Subtle grid texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '100px 100px' }} />
      </div>

      <div className="absolute inset-0 flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT PANEL: Main Navigation */}
        <div 
          ref={leftPanelRef}
          className="relative w-full lg:w-[50%] h-full flex flex-col justify-between px-6 lg:px-16 pt-6 pb-12 overflow-y-auto lg:overflow-hidden scrollbar-hide will-change-transform"
        >
          {/* Header Row */}
          <div className="flex items-center justify-between lg:justify-start w-full">
            <Link href="/" onClick={onClose} className="flex items-center gap-3 relative z-50">
              <img src="/logo.svg" alt="AT" className="h-8 lg:h-10 invert brightness-0" />
              <div className="hidden sm:flex flex-col">
                <span className="text-[9px] tracking-[0.4em] font-medium uppercase text-white/40">Systems Interface</span>
                <span className="text-[7px] tracking-[0.1em] text-white/20">OS_NAV_2.4</span>
              </div>
            </Link>

            {/* Mobile Close Button */}
            <button onClick={onClose} className="lg:hidden w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 active:bg-white/10 z-50">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links Area */}
          <nav className="flex flex-col gap-2 sm:gap-4 mt-12 lg:mt-0 flex-1 justify-center relative z-10 [perspective:2000px]">
            {MENU_ITEMS.map((item, index) => (
              <div 
                key={item.id}
                className="relative group py-1"
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
                    className={`block text-[12vw] lg:text-[6vw] font-display font-medium leading-[0.9] tracking-tight transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform [transform-style:preserve-3d] origin-left relative z-50
                      ${hoveredIndex !== null && hoveredIndex !== index ? 'opacity-20 blur-[2px] [transform:translateZ(-150px)_rotateY(-15deg)_rotateX(5deg)]' : 'opacity-100'}
                      ${hoveredIndex === index ? 'pl-4 lg:pl-8 text-white [transform:translateZ(80px)_rotateY(10deg)_rotateX(10deg)]' : 'text-white/90'}
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
                <div className={`lg:hidden overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] ${hoveredIndex === index ? 'max-h-[300px] opacity-100 mt-6 mb-4' : 'max-h-0 opacity-0'}`}>
                  <div className="flex flex-col gap-5 pl-4 border-l border-accent/40 py-2">
                    {item.subItems.map((sub, i) => (
                      <Link key={i} href={sub.href} onClick={(e) => handleLinkClick(e, sub.href)} className="text-xl font-light text-white/50 active:text-accent flex items-center justify-between">
                        {sub.label}
                        <ArrowRight className="w-5 h-5 opacity-30" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>


          {/* Bottom Footer Info */}
          <div className="pt-8 border-t border-white/10 flex items-center justify-between text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-white/30 font-mono relative z-10">
            <div className="flex items-center gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              STATUS: SECURE LINK
            </div>
            <p>AT AUTOMATION © 2026</p>
          </div>
        </div>

        {/* RIGHT PANEL: Dynamic Preview & Sub-navigation (Desktop Only) */}
        <div 
          ref={rightPanelRef}
          className="hidden lg:flex relative w-[50%] h-full flex-col justify-between overflow-hidden will-change-transform bg-[#0a0a0a]"
        >
          {/* Dynamic Image Background Layer */}
          {activeItem && (
            <img 
              key={`img-${activeItem.id}`}
              src={activeItem.image}
              alt={activeItem.label}
              className="dynamic-preview-image absolute inset-0 w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
            />
          )}
          
          {/* Gradient Overlays for Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#060606] via-transparent to-transparent opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-[#060606]/40 to-transparent opacity-90" />

          {/* Desktop Close Button */}
          <div className="relative z-20 flex justify-end p-6 lg:p-12">
            <button 
              onClick={onClose}
              className="group flex items-center gap-4 text-white/50 hover:text-white transition-all pointer-events-auto"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">Close Interface</span>
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-black/20 backdrop-blur-md group-hover:border-white/50 group-hover:bg-black/40 transition-all duration-500">
                <X className="w-5 h-5" />
              </div>
            </button>
          </div>

          {/* Submenu Content Over Image */}
          <div className="relative z-20 flex-1 flex flex-col justify-end p-12 lg:p-24 pb-32">
            {activeItem && (
              <div key={`sub-${activeItem.id}`} className="submenu-content max-w-lg">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-[1px] bg-accent" />
                  <h3 className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">Discover {activeItem.label}</h3>
                </div>
                
                <div className="flex flex-col gap-6">
                  {activeItem.subItems.map((sub, i) => (
                    <Link 
                      key={i} 
                      href={sub.href} 
                      onClick={(e) => handleLinkClick(e, sub.href)} 
                      className="group flex items-center justify-between py-4 border-b border-white/10 hover:border-white/40 transition-all duration-500"
                    >
                      <span className="text-3xl font-light text-white/60 group-hover:text-white group-hover:translate-x-4 transition-all duration-500 ease-out">
                        {sub.label}
                      </span>
                      <ArrowRight className="w-5 h-5 text-white/0 group-hover:text-accent -translate-x-4 group-hover:translate-x-0 transition-all duration-500" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );

  return createPortal(content, document.body);
}
