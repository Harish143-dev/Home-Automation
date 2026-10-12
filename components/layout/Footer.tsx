'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap, useGSAP } from '../../lib/gsapSetup';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { MapPin } from 'lucide-react';

const FOOTER_LINKS = {
  residential: [
    { label: 'Lighting Automation', href: '/residential/lighting-automation' },
    { label: 'Motorized Shades & Curtain Automation', href: '/residential/curtain-automation' },
    { label: 'Complete Home Automation Solutions', href: '/residential/mdu-automation' },
    { label: 'Audio, Video Integration', href: '/residential/audio-video-automation' },
    { label: 'Security, Surveillance & Access Control', href: '/residential/security-automation' },
    { label: 'Wi-Fi, Networking & Smart Control Interfaces', href: '/residential/wifi-networking' },
  ],
  hospitality: [
    { label: 'Public areas', href: '/hospitality/public-area-automation' },
    { label: 'Boardroom and Meeting Room', href: '/hospitality/boardroom-automation' },
    { label: 'Banquet Halls & Event Spaces', href: '/hospitality/banquet-hall-automation' },
    { label: 'Restaurants', href: '/hospitality/restaurant-automation' },
    { label: 'Spa and Wellness', href: '/hospitality/spa-and-wellness' },
    { label: 'Guest Rooms', href: '/hospitality/guest-room-automation' },
  ],
  commercial: [
    { label: 'Restaurants', href: '/commercial/restaurant-automation' },
    { label: 'Offices', href: '/commercial/office-automation' },
    { label: 'Institutes', href: '/commercial/institutes' },
    { label: 'Exhibitions', href: '/commercial/exhibitions' },
    { label: 'Retail Stores', href: '/commercial/retail-automation' },
    { label: 'Multiplexes', href: '/commercial/multiplexes' },
    { label: 'Airport Lounges', href: '/commercial/airport-lounges' },
  ],
  resources: [
    { label: 'Case Studies', href: '/projects' },
    { label: 'Blogs & Insights', href: '/blog' },
    { label: 'Energy Saving Guide', href: '/commercial#roi-calculator' },
    { label: 'AMC & Support', href: '/disciplines/amc' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'The Journal', href: '/blog' },
    { label: 'Process', href: '/about#process' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
    { label: 'Terms and condition', href: '/terms' },
    { label: 'Policy', href: '/privacy' },
  ]
};

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();

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

    gsap.fromTo('.footer-col',
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      }
    );

  }, { scope: footerRef, dependencies: [prefersReducedMotion] });

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer
      ref={footerRef}
      className="w-full bg-[#fcfcfc] text-[#2d2a26] border-t border-black/10 py-16 lg:py-24"
    >
      <div className="max-w-400 mx-auto px-6 md:px-12 lg:px-16">

        {/* 6-Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1.5fr] gap-10 lg:gap-8">
          
          {/* Col 1: Logo & Brief */}
          <div className="footer-col flex flex-col pr-4">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity mb-6">
              <img src="/logo.svg" alt="AT Smart Living" className="h-10 w-auto" />
            </Link>
            <p className="text-[13px] md:text-sm text-black/70 leading-relaxed mb-8">
              For over 24 years, ATPL has been delivering intelligent lighting control and home automation solutions that combine world-class technology, expert execution, and dependable after-sales support.
            </p>
            <div className="flex items-center gap-4 text-black/60">
              <a href="#" className="hover:text-accent transition-colors">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Residential */}
          <div className="footer-col flex flex-col">
            <h4 className="text-sm font-semibold text-black mb-6">Residential</h4>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.residential.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] text-black/70 hover:text-accent transition-colors leading-snug inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Hospitality */}
          <div className="footer-col flex flex-col">
            <h4 className="text-sm font-semibold text-black mb-6">Hospitality</h4>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.hospitality.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] text-black/70 hover:text-accent transition-colors leading-snug inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Commercial */}
          <div className="footer-col flex flex-col">
            <h4 className="text-sm font-semibold text-black mb-6">Commercial</h4>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.commercial.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] text-black/70 hover:text-accent transition-colors leading-snug inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Resources & About Company */}
          <div className="footer-col flex flex-col gap-10">
            <div>
              <h4 className="text-sm font-semibold text-black mb-6">Resources</h4>
              <ul className="flex flex-col gap-3">
                {FOOTER_LINKS.resources.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[13px] text-black/70 hover:text-accent transition-colors leading-snug inline-block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-black mb-6">About Company</h4>
              <ul className="flex flex-col gap-3">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[13px] text-black/70 hover:text-accent transition-colors leading-snug inline-block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 6: Map & Exp Centers */}
          <div className="footer-col flex flex-col">
            <h4 className="text-sm font-semibold text-black mb-6">Headquarters & Experience Centers</h4>
            
            {/* Map Embed */}
            <div className="w-full h-32 bg-black/5 rounded-lg overflow-hidden mb-6 border border-black/10">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.6859546115984!2d77.2727146150807!3d28.54916298245053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3e26bc2299d%3A0xc48c1e28cf6741b6!2sOkhla%20Industrial%20Area%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Addresses */}
            <div className="flex flex-col gap-5">
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                <div className="flex flex-col text-[13px] text-black/70 leading-snug">
                  <span className="font-semibold text-black">Delhi (HQ)</span>
                  <span>Okhla Industrial Area, Phase 2</span>
                  <span>New Delhi, DL 110020</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                <div className="flex flex-col text-[13px] text-black/70 leading-snug">
                  <span className="font-semibold text-black">Mumbai</span>
                  <span>Lower Parel, Suite 204</span>
                  <span>Mumbai, MH 400013</span>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                <div className="flex flex-col text-[13px] text-black/70 leading-snug">
                  <span className="font-semibold text-black">Bangalore</span>
                  <span>Indiranagar, 100 Feet Road</span>
                  <span>Bangalore, KA 560038</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="w-full h-px bg-black/10 mt-16 mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-black/50">
          <p>© {new Date().getFullYear()} AT Smart Living. All rights reserved.</p>
          <p>Designed for the future of connected spaces.</p>
        </div>

      </div>

      {/* Floating WhatsApp Button (Only visible in Footer) */}
      <a
        href="https://wa.me/18005550199"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-9999 bg-[#25D366] text-white p-3.5 md:p-4 rounded-full shadow-[0_10px_40px_rgba(37,211,102,0.3)] hover:scale-110 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-center ${isFooterVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-12 pointer-events-none'
          }`}
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 md:w-8 md:h-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </a>
    </footer>
  );
}
