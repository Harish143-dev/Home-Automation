'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { gsap, useGSAP } from '../../lib/gsapSetup';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const FOOTER_LINKS = {
  services: [
    { label: 'Lighting Automation', href: '#lighting' },
    { label: 'Audio Video', href: '#av' },
    { label: 'Climate Control', href: '#hvac' },
    { label: 'Smart Security', href: '#security' },
  ],
  solutions: [
    { label: 'Residential', href: '/residential' },
    { label: 'Hospitality', href: '#hospitality' },
    { label: 'Commercial', href: '/commercial' },
    { label: 'Experience Center', href: '/experience-center' },
    { label: 'Featured Work', href: '#projects' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'The Journal', href: '/blog' },
    { label: 'Process', href: '/about#process' },
    { label: 'Contact', href: '/contact' },
  ]
};

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!footerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(footerRef.current);
    
    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    if (prefersReducedMotion || !footerRef.current) return;

    gsap.from('.footer-col', {
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 85%',
      },
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    });

  }, { scope: footerRef, dependencies: [prefersReducedMotion] });

  return (
    <footer 
      ref={footerRef}
      className="w-full bg-[#fcfcfc] text-[#2d2a26] border-t border-black/10 py-16 md:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 min-h-[160px]">
          
          <div className="footer-col flex flex-col">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity mb-4">
              <img src="/logo.svg" alt="AT Smart Living" className="h-12 w-auto" />
            </Link>
          </div>

          <div className="footer-col flex flex-col text-[13px] md:text-sm text-black/80">
            <div className="flex flex-col mb-12">
              <a href="mailto:hello@at-smart.com" className="hover:text-black transition-colors">hello@at-smart.com</a>
              <a href="tel:+18005550199" className="hover:text-black transition-colors">+1 (800) 555-0199</a>
            </div>
            <a href="#" className="hover:text-black transition-colors mt-auto">@atsmartliving</a>
          </div>

          <div className="footer-col flex flex-col text-[13px] md:text-sm text-black/80">
            <div className="flex flex-col mb-12">
              <p className="text-black">Delhi Showroom (HQ)</p>
              <p>Okhla Industrial Area, Phase 2</p>
              <p>New Delhi, DL 110020</p>
              <p>Tuesday – Saturday, 11am – 6pm</p>
            </div>
            <Link href="#" className="hover:text-black transition-colors mt-auto">Book an Appointment</Link>
          </div>

          <div className="footer-col flex flex-col text-[13px] md:text-sm text-black/80">
            <div className="flex flex-col mb-12">
              <p className="text-black">Mumbai Studio</p>
              <p>Lower Parel, Suite 204</p>
              <p>Mumbai, MH 400013</p>
              <p>Monday – Friday, 10am – 5pm</p>
            </div>
            <Link href="#" className="hover:text-black transition-colors mt-auto">Learn More</Link>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-black/10 my-16 md:my-24" />

        {/* Bottom Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          <div className="footer-col flex flex-col gap-12">
            <p className="text-[13px] md:text-sm text-black/80 leading-relaxed pr-8">
              Sign up for our newsletter to receive seasonal promotions and updates from our studio.
            </p>
            
            <div className="flex flex-col gap-3">
              <p className="text-[13px] md:text-sm text-black/80">Our Newsletter</p>
              <form className="flex border border-black/30 w-full max-w-[320px] transition-colors focus-within:border-black/60">
                <input 
                  type="email" 
                  placeholder="Your Email Address" 
                  className="bg-transparent px-4 py-2.5 text-[13px] flex-grow outline-none placeholder:text-black/40 w-full"
                  required
                />
                <button 
                  type="submit" 
                  className="px-6 text-[13px] text-black/50 hover:text-black border-l border-black/30 transition-colors whitespace-nowrap"
                >
                  Sign Up
                </button>
              </form>
              <p className="text-[11px] text-black/60 mt-1">
                By signing up you are agreeing to our <Link href="#" className="underline underline-offset-2 hover:text-black transition-colors">Privacy Policy</Link>.
              </p>
            </div>
          </div>

          <div className="footer-col flex flex-col gap-6 lg:pl-8">
            <h3 className="text-[13px] md:text-sm text-black mb-4">Services</h3>
            <ul className="flex flex-col gap-1.5">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] text-black/70 hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col flex flex-col gap-6">
            <h3 className="text-[13px] md:text-sm text-black mb-4">Solutions</h3>
            <ul className="flex flex-col gap-1.5">
              {FOOTER_LINKS.solutions.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] text-black/70 hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col flex flex-col gap-6">
            <h3 className="text-[13px] md:text-sm text-black mb-4">Company</h3>
            <ul className="flex flex-col gap-1.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] text-black/70 hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* Floating WhatsApp Button (Only visible in Footer) */}
      <a 
        href="https://wa.me/18005550199" 
        target="_blank" 
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9999] bg-[#25D366] text-white p-3.5 md:p-4 rounded-full shadow-[0_10px_40px_rgba(37,211,102,0.3)] hover:scale-110 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-center ${
          isFooterVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-12 pointer-events-none'
        }`}
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 md:w-8 md:h-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
    </footer>
  );
}
