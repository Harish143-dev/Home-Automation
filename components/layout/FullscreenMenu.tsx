'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { gsap, useGSAP } from '../../lib/gsapSetup';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { MAIN_NAVIGATION, NavLink } from '../../lib/navigationData';
import { usePathname } from 'next/navigation';

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgOverlayRef = useRef<HTMLDivElement>(null);
  const mainTimeline = useRef<gsap.core.Timeline | null>(null);
  const pathname = usePathname();

  // Desktop State
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  
  // Mobile Accordion State
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    // Set initial active category for desktop (defaults to first item with children)
    const firstCat = MAIN_NAVIGATION.find(item => item.items);
    if (firstCat) {
      setActiveCategoryId(firstCat.id);
    }
    return () => setMounted(false);
  }, []);

  useGSAP(() => {
    if (!bgOverlayRef.current || !mounted) return;

    gsap.set(bgOverlayRef.current, { autoAlpha: 0 });
    gsap.set(containerRef.current, { clipPath: 'circle(0% at calc(100% - 48px) 48px)' });
    gsap.set('.menu-link-large', { y: 60, opacity: 0, rotate: 2 });
    gsap.set('.right-panel-content', { opacity: 0, x: 20 });

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
        stagger: 0.05,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.8')
      .to('.right-panel-content', {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.8');

    mainTimeline.current = tl;

  }, { scope: containerRef, dependencies: [mounted] });

  useEffect(() => {
    if (isOpen) {
      mainTimeline.current?.play();
      document.body.style.overflow = 'hidden';
    } else {
      mainTimeline.current?.reverse();
      document.body.style.overflow = '';
      // Reset mobile accordions when closed
      setTimeout(() => setOpenAccordions([]), 1000);
    }
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent, href?: string) => {
    if (!href) return;
    
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
    } else {
      if (pathname === href) {
        e.preventDefault();
        onClose();
      } else {
        onClose();
      }
    }
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordions(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  if (!mounted) return null;

  const activeCategory = MAIN_NAVIGATION.find(item => item.id === activeCategoryId);

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

      <div className="absolute inset-0 flex flex-col lg:flex-row px-6 sm:px-12 lg:px-16 pt-24 pb-8 lg:pt-24 lg:pb-6 h-full">

        {/* DESKTOP LAYOUT (lg and above) */}
        <div className="hidden lg:flex w-full h-full">
          
          {/* Left Panel: Primary Categories */}
          <div className="w-[28%] xl:w-[25%] flex flex-col justify-start gap-3 lg:gap-4 xl:gap-5 pr-8 border-r border-black/10 relative z-10 overflow-y-auto hide-scrollbar pb-6">
            {MAIN_NAVIGATION.map((item) => (
              <div 
                key={item.id} 
                className="menu-link-large will-change-transform origin-left flex items-center"
                onMouseEnter={() => item.items && setActiveCategoryId(item.id)}
              >
                {item.href && !item.items ? (
                  <Link
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="group inline-flex items-center"
                  >
                    <span className={`text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light leading-snug tracking-wide transition-colors ${pathname === item.href ? 'text-accent' : 'text-black hover:text-accent'}`}>
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <button
                    onClick={() => item.items && setActiveCategoryId(item.id)}
                    className="group inline-flex items-center text-left focus:outline-none"
                  >
                    <span className={`text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light leading-snug tracking-wide transition-colors ${activeCategoryId === item.id ? 'text-accent' : 'text-black hover:text-accent'}`}>
                      {item.label}
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Right Panel: Sub-items Grid */}
          <div className="w-[72%] xl:w-[75%] pl-8 xl:pl-12 relative z-10 overflow-y-auto hide-scrollbar pb-12">
            {activeCategory && activeCategory.items && (
              <div className="right-panel-content w-full h-full animate-in fade-in slide-in-from-right-4 duration-500">
                
                <h3 className="text-sm tracking-[0.1em] text-black/40 uppercase mb-8 xl:mb-10">
                  {activeCategory.label}
                </h3>

                {/* If the category has a 3rd level (like "The Future of") */}
                {activeCategory.items.some(sub => sub.items) ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-8 xl:gap-y-12">
                    {activeCategory.items.map(subCategory => (
                      <div key={subCategory.id} className="flex flex-col">
                        <div className="flex items-center gap-3 mb-4 xl:mb-6">
                          <div className="w-4 h-[1px] bg-accent/40" />
                          {subCategory.href ? (
                            <Link href={subCategory.href} onClick={(e) => handleLinkClick(e, subCategory.href)} className="group inline-flex items-center">
                              <h4 className="text-base xl:text-lg font-medium tracking-wide text-black transition-colors group-hover:text-accent">
                                {subCategory.label}
                              </h4>
                            </Link>
                          ) : (
                            <h4 className="text-base xl:text-lg font-medium tracking-wide text-black">
                              {subCategory.label}
                            </h4>
                          )}
                        </div>
                        <ul className="flex flex-col gap-2 xl:gap-4">
                          {subCategory.items?.map(link => (
                            <li key={link.id}>
                              <Link
                                href={link.href || '#'}
                                onClick={(e) => handleLinkClick(e, link.href)}
                                className={`text-base font-light transition-colors ${pathname === link.href ? 'text-accent font-normal' : 'text-black/60 hover:text-black'}`}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* If it only has a 2nd level (like "Disciplines") */
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 xl:gap-y-6 max-w-3xl">
                    {activeCategory.items.map(link => (
                      <div key={link.id}>
                        <Link
                          href={link.href || '#'}
                          onClick={(e) => handleLinkClick(e, link.href)}
                          className={`group inline-flex items-center gap-4 text-lg xl:text-xl font-light transition-colors ${pathname === link.href ? 'text-accent font-normal' : 'text-black/70 hover:text-black'}`}
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="w-4 h-4 xl:w-5 xl:h-5 text-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out" />
                        </Link>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}
          </div>
        </div>


        {/* MOBILE LAYOUT (< lg) */}
        <div className="flex lg:hidden flex-col w-full h-full overflow-y-auto pb-24 relative z-10 hide-scrollbar">
          <div className="flex flex-col gap-6">
            {MAIN_NAVIGATION.map((item) => (
              <div key={item.id} className="menu-link-large will-change-transform flex flex-col border-b border-black/5 pb-4 last:border-0">
                
                {/* Level 1 Header */}
                <div className="flex items-center justify-between w-full">
                  {item.href && !item.items ? (
                    <Link
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="text-3xl sm:text-4xl font-light text-black"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => toggleAccordion(item.id)}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <span className="text-3xl sm:text-4xl font-light text-black">
                        {item.label}
                      </span>
                      <ChevronDown 
                        className={`w-6 h-6 text-black/50 transition-transform duration-300 ${openAccordions.includes(item.id) ? 'rotate-180' : ''}`} 
                      />
                    </button>
                  )}
                </div>

                {/* Level 2 Sub-items */}
                {item.items && (
                  <div 
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${openAccordions.includes(item.id) ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
                  >
                    <div className="overflow-hidden flex flex-col gap-6 pl-4">
                      
                      {item.items.some(sub => sub.items) ? (
                        // Render Level 2 Categories (which contain Level 3 links)
                        item.items.map(subCategory => (
                          <div key={subCategory.id} className="flex flex-col">
                            <button
                              onClick={() => toggleAccordion(subCategory.id)}
                              className="flex items-center justify-between w-full text-left mb-2"
                            >
                              <span className="text-xl font-medium tracking-wide text-black/80">
                                {subCategory.label}
                              </span>
                              {subCategory.items && (
                                <ChevronDown 
                                  className={`w-5 h-5 text-black/40 transition-transform duration-300 ${openAccordions.includes(subCategory.id) ? 'rotate-180' : ''}`} 
                                />
                              )}
                            </button>

                            {/* Level 3 Links */}
                            {subCategory.items && (
                              <div 
                                className={`grid transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${openAccordions.includes(subCategory.id) ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
                              >
                                <ul className="overflow-hidden flex flex-col gap-4 pl-4 border-l border-black/10">
                                  {subCategory.href && (
                                    <li className="mb-2">
                                      <Link
                                        href={subCategory.href}
                                        onClick={(e) => handleLinkClick(e, subCategory.href)}
                                        className="text-base font-medium tracking-wide text-accent active:text-accent block py-1"
                                      >
                                        Explore {subCategory.label} &rarr;
                                      </Link>
                                    </li>
                                  )}
                                  {subCategory.items.map(link => (
                                    <li key={link.id}>
                                      <Link
                                        href={link.href || '#'}
                                        onClick={(e) => handleLinkClick(e, link.href)}
                                        className="text-base font-light text-black/60 active:text-accent block py-1"
                                      >
                                        {link.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        // Render Level 2 Links Directly
                        <ul className="flex flex-col gap-4 border-l border-black/10 pl-4">
                          {item.items.map(link => (
                            <li key={link.id}>
                              <Link
                                href={link.href || '#'}
                                onClick={(e) => handleLinkClick(e, link.href)}
                                className="text-lg font-light text-black/70 active:text-accent block py-1"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}

                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );

  return createPortal(content, document.body);
}
