'use client';

import React, { useRef } from 'react';
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
    { label: 'Blogs', href: '/blog' },
    { label: 'Energy Saving guide', href: '/calculator' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'The Journal', href: '/blog' },
    { label: 'Process', href: '/about#process' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
    { label: 'Terms and condition', href: '/terms' },
    { label: 'Policy', href: '/privacy' },
  ],
};

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();

  useGSAP(
    () => {
      if (prefersReducedMotion || !footerRef.current) return;

      gsap.fromTo(
        '.footer-col',
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
          ease: 'power3.out',
        }
      );
    },
    { scope: footerRef, dependencies: [prefersReducedMotion] }
  );

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer
      ref={footerRef}
      className="w-full bg-[#fcfcfc] text-[#2d2a26] border-t border-black/10 py-16 lg:py-24"
    >
      <div className="max-w-400 mx-auto px-6 md:px-12 lg:px-16">
        {/* 7-Column Layout according to specification */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-[1.3fr_1fr_1fr_1fr_0.85fr_1fr_1.6fr] gap-8 lg:gap-6 xl:gap-8">
          {/* Col 1: Logo & Brief about the company */}
          <div className="footer-col flex flex-col pr-2">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity mb-6">
              <img src="/logo.svg" alt="AT Smart Living" className="h-10 w-auto" />
            </Link>
            <p className="text-[13px] md:text-sm text-black/70 leading-relaxed mb-8">
              For over 24 years, ATPL has been delivering intelligent lighting control and home automation solutions that combine world-class technology, expert execution, and dependable after-sales support.
            </p>
            {/* Social media icons */}
            <div className="flex items-center gap-4 text-black/60">
              <a href="#" aria-label="Facebook" className="hover:text-accent transition-colors">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-accent transition-colors">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-accent transition-colors">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" aria-label="X (Twitter)" className="hover:text-accent transition-colors">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
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

          {/* Col 5: Resources */}
          <div className="footer-col flex flex-col">
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

          {/* Col 6: About Company */}
          <div className="footer-col flex flex-col">
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

          {/* Col 7: Google Map Integration of main office & Exp Center addresses */}
          <div className="footer-col flex flex-col lg:col-span-2 xl:col-span-1">
            <h4 className="text-sm font-semibold text-black mb-6">Experience Centers</h4>

            {/* Google Map Integration of main office */}
            <div className="w-full h-32 bg-black/5 rounded-lg overflow-hidden mb-6 border border-black/10">
              <iframe
                src="https://maps.google.com/maps?q=D20,+Block+D,+Jangpura,+New+Delhi,+Delhi+110014&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map Integration of Main Office"
              />
            </div>

            {/* Exp Center addresses (1st, 2nd, 3rd) */}
            <div className="flex flex-col gap-5">
              {/* Exp Center address (1st) */}
              <div className="flex gap-2.5">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                <div className="flex flex-col text-[13px] text-black/70 leading-snug">
                  <span className="font-semibold text-black">Delhi</span>
                  <span>Lower Ground Floor, D20, Block D, Jangpura</span>
                  <span>New Delhi, Delhi 110014</span>
                  <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-1 text-[12px] text-black/60">
                    <a href="tel:+911124324113" className="hover:text-accent transition-colors">
                      +91-11-24324113
                    </a>
                    <span>•</span>
                    <a href="tel:+911145643992" className="hover:text-accent transition-colors">
                      45643992
                    </a>
                    <span>•</span>
                    <a href="tel:+911124324115" className="hover:text-accent transition-colors">
                      24324115
                    </a>
                  </div>
                </div>
              </div>

              {/* Exp Center address (2nd) */}
              <div className="flex gap-2.5">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                <div className="flex flex-col text-[13px] text-black/70 leading-snug">
                  <span className="font-semibold text-black">Mumbai</span>
                  <span>10/76, Apte Properties, Ground Floor Parijat House, LR Papan Marg, off Dr. Elijah Moses Road, Worli</span>
                  <span>Mumbai, Maharashtra 400018</span>
                  <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-1 text-[12px] text-black/60">
                    <a href="tel:+912249675653" className="hover:text-accent transition-colors">
                      +91-22-49675653
                    </a>
                    <span>•</span>
                    <a href="tel:+918291239139" className="hover:text-accent transition-colors">
                      +91-82912-39139
                    </a>
                  </div>
                </div>
              </div>

              {/* Exp Center address (3rd) */}
              <div className="flex gap-2.5">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                <div className="flex flex-col text-[13px] text-black/70 leading-snug">
                  <span className="font-semibold text-black">Bengaluru</span>
                  <span>13, 100 Feet Ring Road, Anjaneya Nagar, Bangalore South Banashankari 3rd Stage</span>
                  <span>Bangalore 560085, Karnataka</span>
                  <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-1 text-[12px] text-black/60">
                    <a href="tel:+918041130438" className="hover:text-accent transition-colors">
                      +91-80-4113-0438
                    </a>
                    <span>•</span>
                    <a href="tel:+918025270460" className="hover:text-accent transition-colors">
                      25270460
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full h-px bg-black/10 mt-16 mb-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[12px] text-black/50">
          <p>© {new Date().getFullYear()} AT Smart Living. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
