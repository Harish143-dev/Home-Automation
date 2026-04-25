'use client';

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(useGSAP);

const NAV_LINKS = [
  { label: 'Platform', desc: 'The core intelligence.', href: '#' },
  { label: 'Hardware', desc: 'Precision engineered.', href: '#' },
  { label: 'Ecosystem', desc: 'Seamless integration.', href: '#' },
  { label: 'Company', desc: 'Our vision & heritage.', href: '#' },
];

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Toggle Visibility on Scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (isOpen && Math.abs(currentScrollY - lastScrollY.current) > 20) {
        setIsOpen(false);
      }
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Dropdown Animation - using useGSAP for proper context
  useGSAP(() => {
    gsap.set(menuRef.current, { 
      autoAlpha: 0, 
      y: -20,
      scale: 0.96,
      transformOrigin: 'top right'
    });
    
    gsap.set(linksRef.current, { 
      opacity: 0, 
      x: -15 
    });

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } });
    
    tl.to(menuRef.current, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
    }).to(linksRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      stagger: 0.05,
    }, "-=0.35"); // Start link animations mid-way through dropdown fade

    timelineRef.current = tl;

  }, { scope: navRef, dependencies: [] });

  useEffect(() => {
    if (timelineRef.current) {
      if (isOpen) {
        timelineRef.current.timeScale(1).play();
      } else {
        timelineRef.current.timeScale(1.5).reverse();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && !(e.target as Element).closest('#main-nav')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <nav 
      id="main-nav"
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[9999] flex h-24 items-center justify-between px-8 sm:px-12 lg:px-16 bg-transparent pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      
      <div className="pointer-events-auto">
        <Link href="/" className="text-xl font-medium tracking-[0.12em] text-black transition-opacity hover:opacity-75 drop-shadow-md">
          AT
        </Link>
      </div>

      <div className="pointer-events-auto relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="group flex h-12 w-12 flex-col items-center justify-center gap-[6px] focus:outline-none rounded-full bg-white/20 backdrop-blur-md border border-black/20 transition-colors hover:bg-black/10 text-black shadow-lg"
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
          <span className={`block h-[1.5px] w-5 bg-current origin-center transition-all duration-400 ease-[cubic-bezier(0.8,0,0.2,1)] ${isOpen ? 'translate-y-[7.5px] rotate-45' : 'group-hover:w-6'}`} />
          <span className={`block h-[1.5px] bg-current origin-center transition-all duration-400 ease-[cubic-bezier(0.8,0,0.2,1)] ${isOpen ? 'w-0 opacity-0' : 'w-5 group-hover:w-6'}`} />
          <span className={`block h-[1.5px] w-5 bg-current origin-center transition-all duration-400 ease-[cubic-bezier(0.8,0,0.2,1)] ${isOpen ? '-translate-y-[7.5px] -rotate-45' : 'group-hover:w-6'}`} />
        </button>

        {/* Upgraded Premium Dropdown Menu */}
        <div 
          ref={menuRef}
          className="absolute top-[120%] right-0 w-72 sm:w-80 rounded-[28px] bg-white/85 backdrop-blur-3xl border border-black/10 p-3 flex flex-col invisible shadow-2xl"
        >
          {NAV_LINKS.map((link, i) => (
            <Link 
              key={i} 
              href={link.href}
              ref={el => { linksRef.current[i] = el; }}
              className="group relative flex flex-col px-5 py-4 rounded-[20px] transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] hover:bg-black/5 active:scale-[0.98] overflow-hidden"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-black text-[1.1rem] font-medium tracking-wide transition-transform duration-300 group-hover:translate-x-1">
                  {link.label}
                </span>
                {/* Arrow that slides in on hover */}
                <ArrowRight className="w-4 h-4 text-black opacity-0 -translate-x-4 transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:opacity-100 group-hover:translate-x-0" />
              </div>
              <span className="text-black/50 text-[13px] font-light mt-1 transition-transform duration-300 group-hover:translate-x-1">
                {link.desc}
              </span>
            </Link>
          ))}
          
          {/* Animated Contact / Action Footer */}
          <div className="mt-2 pt-2 border-t border-black/10">
            <Link 
              href="#" 
              className="group relative flex w-full items-center justify-between px-5 py-4 rounded-2xl overflow-hidden transition-all duration-300"
            >
              {/* Fill background strictly on hover */}
              <div className="absolute inset-0 bg-black scale-y-0 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-y-100" />
              
              <span className="relative z-10 text-sm font-medium text-black/80 transition-colors duration-300 group-hover:text-white">
                Talk to an Expert
              </span>
              
              <div className="relative z-10 flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-black/10 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:bg-white/10">
                <ArrowRight className="absolute h-3.5 w-3.5 text-black transition-all duration-300 group-hover:translate-x-full group-hover:-translate-y-full group-hover:opacity-0" />
                <ArrowRight className="absolute h-3.5 w-3.5 text-white -translate-x-full translate-y-full opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
