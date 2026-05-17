'use client';

import React, { useRef } from 'react';
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
    { label: 'Residential', href: '#residential' },
    { label: 'Hospitality', href: '#hospitality' },
    { label: 'Commercial', href: '#commercial' },
    { label: 'Featured Work', href: '#projects' },
  ],
  company: [
    { label: 'Our Story', href: '#about' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ]
};

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

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
            <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-2 text-black">AT Smart Living</h2>
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
    </footer>
  );
}
