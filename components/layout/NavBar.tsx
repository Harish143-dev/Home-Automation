'use client';

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import FullscreenMenu from './FullscreenMenu';

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Toggle Visibility on Scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (isOpen) return;

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

  return (
    <>
      <nav
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-[999] flex h-20 sm:h-24 items-center justify-between px-5 sm:px-8 lg:px-16 bg-transparent pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="pointer-events-auto">
          <Link href="/" className="transition-opacity hover:opacity-75 drop-shadow-sm">
            <img src="/logo.svg" alt="AT" className="h-10 sm:h-12 w-auto" />
          </Link>
        </div>

        <div className="pointer-events-auto">
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-4 focus:outline-none"
            aria-label="Open Menu"
          >
            <span className="hidden sm:block text-[10px] uppercase tracking-[0.3em] font-medium text-foreground/60 group-hover:text-foreground transition-colors">
              Interface
            </span>
            <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 flex-col items-center justify-center gap-[5px] rounded-full bg-white/10 backdrop-blur-md border border-black/5 shadow-sm group-hover:bg-white/20 transition-all">
              <span className="block h-[1.5px] w-5 bg-current transition-all duration-300 group-hover:w-6" />
              <span className="block h-[1.5px] w-5 bg-current transition-all duration-300 group-hover:w-4" />
              <span className="block h-[1.5px] w-3 bg-current transition-all duration-300 group-hover:w-6" />
            </div>
          </button>
        </div>
      </nav>

      <FullscreenMenu 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
}
