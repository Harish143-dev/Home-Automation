'use client';

import Link from 'next/link';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap, useGSAP } from '../../lib/gsapSetup';
import { ArrowRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Platform', desc: 'The core intelligence.', href: '#platform' },
  { label: 'Hardware', desc: 'Precision engineered.', href: '#hardware' },
  { label: 'Ecosystem', desc: 'Seamless integration.', href: '#ecosystem' },
  { label: 'Company', desc: 'Our vision & heritage.', href: '#company' },
];

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const mobileTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Toggle Visibility on Scroll — don't hide nav when mobile menu is open
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Don't auto-close or hide when mobile menu is open
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

  // Desktop Dropdown Animation
  useGSAP(() => {
    if (!menuRef.current) return;

    gsap.set(menuRef.current, {
      autoAlpha: 0,
      y: -20,
      scale: 0.96,
      transformOrigin: 'top right'
    });

    gsap.set(linksRef.current.filter(Boolean), {
      opacity: 0,
      x: -15
    });

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } });

    tl.to(menuRef.current, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
    }).to(linksRef.current.filter(Boolean), {
      opacity: 1,
      x: 0,
      duration: 0.4,
      stagger: 0.05,
    }, "-=0.35");

    timelineRef.current = tl;

  }, { scope: navRef });

  // Mobile Fullscreen Menu Animation — scoped to wrapper so it finds the mobile menu
  useGSAP(() => {
    if (!mobileMenuRef.current) return;

    gsap.set(mobileMenuRef.current, {
      autoAlpha: 0,
      clipPath: 'circle(0% at calc(100% - 40px) 40px)'
    });

    gsap.set(mobileLinksRef.current.filter(Boolean), {
      opacity: 0,
      y: 30
    });

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } });

    tl.to(mobileMenuRef.current, {
      autoAlpha: 1,
      clipPath: 'circle(150% at calc(100% - 40px) 40px)',
      duration: 0.7,
    }).to(mobileLinksRef.current.filter(Boolean), {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.08,
    }, "-=0.4");

    mobileTimelineRef.current = tl;

  }, { scope: wrapperRef });

  useGSAP(() => {
    // Desktop dropdown
    if (timelineRef.current) {
      if (isOpen) {
        timelineRef.current.timeScale(1).play();
      } else {
        timelineRef.current.timeScale(1.5).reverse();
      }
    }
    // Mobile fullscreen
    if (mobileTimelineRef.current) {
      if (isOpen) {
        mobileTimelineRef.current.timeScale(1).play();
      } else {
        mobileTimelineRef.current.timeScale(1.5).reverse();
      }
    }
  }, { dependencies: [isOpen] });

  // Handle nav link click — smooth scroll to section
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      // Small delay to let mobile menu close animation start
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && !(e.target as Element).closest('#main-nav') && !(e.target as Element).closest('#mobile-menu')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={wrapperRef}>
      {/* Nav Bar */}
      <nav
        id="main-nav"
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[9999] flex h-20 sm:h-24 items-center justify-between px-5 sm:px-8 lg:px-16 bg-transparent pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >

        <div className="pointer-events-auto">
          <Link href="/" className="transition-opacity hover:opacity-75 drop-shadow-sm">
            <img src="/logo.svg" alt="AT" className="h-10 sm:h-14 w-auto" />
          </Link>
        </div>

        <div className="pointer-events-auto relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`group relative z-[10001] flex h-11 w-11 sm:h-12 sm:w-12 flex-col items-center justify-center gap-[6px] focus:outline-none rounded-full backdrop-blur-md border transition-colors shadow-lg ${isOpen
              ? 'bg-surface-darker border-border text-foreground'
              : 'bg-glass border-border text-foreground'
              }`}
            aria-label="Toggle Menu"
            aria-expanded={isOpen}
          >
            <span className={`block h-[1.5px] w-5 bg-current origin-center transition-all duration-400 ease-[cubic-bezier(0.8,0,0.2,1)] ${isOpen ? 'translate-y-[7.5px] rotate-45' : 'group-hover:w-6'}`} />
            <span className={`block h-[1.5px] bg-current origin-center transition-all duration-400 ease-[cubic-bezier(0.8,0,0.2,1)] ${isOpen ? 'w-0 opacity-0' : 'w-5 group-hover:w-6'}`} />
            <span className={`block h-[1.5px] w-5 bg-current origin-center transition-all duration-400 ease-[cubic-bezier(0.8,0,0.2,1)] ${isOpen ? '-translate-y-[7.5px] -rotate-45' : 'group-hover:w-6'}`} />
          </button>

          {/* Desktop Dropdown Menu (md+) */}
          <div
            ref={menuRef}
            className="absolute top-[120%] right-0 w-72 sm:w-80 rounded-[28px] bg-panel/90 backdrop-blur-3xl border border-border p-3 flex-col invisible shadow-xl hidden md:flex"
          >
            {NAV_LINKS.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                ref={el => { linksRef.current[i] = el; }}
                className="group relative flex flex-col px-5 py-4 rounded-[20px] transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] hover:bg-surface-darker active:scale-[0.98] overflow-hidden"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-foreground text-[1.1rem] font-medium tracking-wide transition-transform duration-300 group-hover:translate-x-1">
                    {link.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-foreground opacity-0 -translate-x-4 transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:opacity-100 group-hover:translate-x-0" />
                </div>
                <span className="text-muted text-[13px] font-light mt-1 transition-transform duration-300 group-hover:translate-x-1">
                  {link.desc}
                </span>
              </Link>
            ))}

            {/* Animated Contact / Action Footer */}
            <div className="mt-2 pt-2 border-t border-border">
              <Link
                href="#process"
                className="group relative flex w-full items-center justify-between px-5 py-4 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-surface-darker"
                onClick={(e) => handleNavClick(e, '#process')}
              >
                <div className="absolute inset-0 bg-accent scale-y-0 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-y-100" />

                <span className="relative z-10 text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-white">
                  Talk to an Expert
                </span>

                <div className="relative z-10 flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-border bg-panel transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:border-transparent group-hover:bg-white/20">
                  <ArrowRight className="absolute h-3.5 w-3.5 text-foreground transition-all duration-300 group-hover:translate-x-full group-hover:-translate-y-full group-hover:opacity-0" />
                  <ArrowRight className="absolute h-3.5 w-3.5 text-white -translate-x-full translate-y-full opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu — rendered OUTSIDE the nav to avoid transform/clip inheritance */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className="md:hidden fixed inset-0 z-[10000] bg-background invisible flex flex-col"
      >
        {/* Close button inside mobile menu (always accessible) */}
        <div className="flex items-center justify-between px-5 sm:px-8 h-20 sm:h-24 shrink-0">
          <span>
            <img src="/logo.svg" alt="AT" className="h-12 sm:h-14 w-auto" />
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="group relative z-[10001] flex h-11 w-11 sm:h-12 sm:w-12 flex-col items-center justify-center gap-[6px] focus:outline-none rounded-full bg-surface-darker border border-border text-foreground hover:bg-panel transition-colors shadow-sm"
            aria-label="Close Menu"
          >
            <span className="block h-[1.5px] w-5 bg-current origin-center translate-y-[3.75px] rotate-45" />
            <span className="block h-[1.5px] w-5 bg-current origin-center -translate-y-[3.75px] -rotate-45" />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 gap-2">
          {NAV_LINKS.map((link, i) => (
            <a
              key={i}
              href={link.href}
              ref={el => { mobileLinksRef.current[i] = el; }}
              className="group flex flex-col py-5 border-b border-border last:border-b-0"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              <span className="text-foreground text-[1.75rem] sm:text-[2rem] font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-2">
                {link.label}
              </span>
              <span className="text-muted text-sm sm:text-base font-light mt-1">
                {link.desc}
              </span>
            </a>
          ))}

          <a
            ref={el => { mobileLinksRef.current[NAV_LINKS.length] = el; }}
            href="#process"
            className="group mt-8 flex items-center justify-center gap-3 bg-accent text-white h-14 rounded-full text-base font-semibold transition-transform duration-300 active:scale-95 shadow-md hover:shadow-lg"
            onClick={(e) => handleNavClick(e, '#process')}
          >
            Talk to an Expert
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}
