'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import FullscreenMenu from './FullscreenMenu';

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isIntroRunning, setIsIntroRunning] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleIntroComplete = () => {
      setIsIntroRunning(false);
      sessionStorage.setItem('brandIntroFinished', 'true');
    };

    if (sessionStorage.getItem('brandIntroFinished') === 'true') {
      setIsIntroRunning(false);
    }

    window.addEventListener('introComplete', handleIntroComplete);
    return () => window.removeEventListener('introComplete', handleIntroComplete);
  }, []);

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

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <nav
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-9999999 flex h-20 sm:h-24 items-center justify-between px-5 sm:px-8 lg:px-16 bg-transparent pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible || isOpen ? 'translate-y-0' : '-translate-y-full'} ${isIntroRunning ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="pointer-events-auto">
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className="transition-opacity hover:opacity-75 drop-shadow-sm"
          >
            <img src="/logo.svg" alt="AT" className="h-10 sm:h-12 w-auto" />
          </Link>
        </div>

        <div className="pointer-events-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`group relative flex h-10 w-10 sm:h-12 sm:w-12 flex-col items-center justify-center gap-1.5 rounded-full backdrop-blur-md border transition-all duration-500 focus:outline-none ${isOpen ? 'bg-black/5 border-black/10 text-black hover:bg-black/10' : 'bg-white/60 border-black/10 text-black hover:bg-white/40'}`}
            aria-label="Toggle Menu"
          >
            <span className={`block h-0.5 w-5 bg-current transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? 'rotate-45 translate-y-1' : 'group-hover:w-6'}`} />
            <span className={`block h-0.5 w-5 bg-current transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? '-rotate-45 -translate-y-1' : ''}`} />
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
