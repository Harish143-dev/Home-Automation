'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsapSetup';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const FOOTER_LINKS = {
  quickLinks: [
    { label: 'Platform', href: '#platform' },
    { label: 'Hardware', href: '#hardware' },
    { label: 'Ecosystem', href: '#ecosystem' },
    { label: 'Our Process', href: '#process' },
  ],
  services: [
    { label: 'Smart Lighting', href: '#' },
    { label: 'Climate Control', href: '#' },
    { label: 'Security Systems', href: '#' },
    { label: 'Home Cinema', href: '#' },
  ],
  company: [
    { label: 'About AT', href: '#' },
    { label: 'Experience Centers', href: '#company' },
    { label: 'Awards', href: '#' },
    { label: 'Careers', href: '#' },
  ]
};

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const bgGlowRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !footerRef.current) return;

    // Entrance Animation
    gsap.fromTo('.footer-panel', 
      { y: 50, opacity: 0, rotateX: 5 },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.footer-brand',
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: 'power4.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%'
        }
      }
    );

    // Ambient background motion (Cinematic Slow Pan)
    if (bgGlowRef.current) {
      gsap.to(bgGlowRef.current, {
        x: '10vw',
        y: '5vh',
        rotation: 10,
        scale: 1.2,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }

  }, { scope: footerRef, dependencies: [prefersReducedMotion] });

  return (
    <footer 
      ref={footerRef}
      className="relative z-50 w-full bg-background text-foreground pt-24 pb-8 overflow-hidden border-t border-border"
    >
      {/* 🌌 Cinematic Background Atmosphere (Light Version) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Light base noise */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
        
        {/* Moving ambient glows (Soft bright orbs) */}
        <div 
          ref={bgGlowRef}
          className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(0,100,255,0.03)_0%,transparent_60%)] blur-[80px] -translate-y-1/2 translate-x-1/3 rounded-full"
        />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-[radial-gradient(ellipse_at_center,rgba(100,100,100,0.04)_0%,transparent_70%)] blur-[60px] translate-y-1/3 -translate-x-1/4 rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* 1. Brand Statement Area */}
        <div className="footer-brand flex flex-col items-center text-center mb-16 lg:mb-24">
          <img src="/logo.svg" alt="AT Smart Living" className="h-14 sm:h-16 md:h-20 w-auto mb-8" />
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-bold tracking-tighter text-foreground mb-4 leading-[1.1]">
            Designing Intelligent Spaces
          </h2>
          <p className="text-muted text-lg md:text-xl font-medium tracking-wide max-w-2xl mx-auto">
            Seamless automation crafted for modern lifestyles and forward-thinking businesses.
          </p>
        </div>

        {/* 2. Control Center Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          
          {/* Glass Panel: Quick Links */}
          <div className="footer-panel group flex flex-col p-8 rounded-[24px] bg-panel backdrop-blur-xl border border-border transition-all duration-500 hover:bg-surface-darker hover:border-white/20 hover:-translate-y-1 shadow-lg">
            <h3 className="text-sm font-semibold tracking-widest uppercase text-muted/60 mb-6">Explore</h3>
            <ul className="flex flex-col gap-4">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="inline-flex relative text-muted hover:text-foreground font-medium transition-colors duration-300 before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-accent before:transition-all before:duration-300 hover:before:w-full">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Glass Panel: Services */}
          <div className="footer-panel group flex flex-col p-8 rounded-[24px] bg-panel backdrop-blur-xl border border-border transition-all duration-500 hover:bg-surface-darker hover:border-white/20 hover:-translate-y-1 shadow-lg">
            <h3 className="text-sm font-semibold tracking-widest uppercase text-muted/60 mb-6">Expertise</h3>
            <ul className="flex flex-col gap-4">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="inline-flex relative text-muted hover:text-foreground font-medium transition-colors duration-300 before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-accent before:transition-all before:duration-300 hover:before:w-full">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Glass Panel: Company */}
          <div className="footer-panel group flex flex-col p-8 rounded-[24px] bg-panel backdrop-blur-xl border border-border transition-all duration-500 hover:bg-surface-darker hover:border-white/20 hover:-translate-y-1 shadow-lg">
            <h3 className="text-sm font-semibold tracking-widest uppercase text-muted/60 mb-6">Company</h3>
            <ul className="flex flex-col gap-4">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="inline-flex relative text-muted hover:text-foreground font-medium transition-colors duration-300 before:content-[''] before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-accent before:transition-all before:duration-300 hover:before:w-full">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Glass Panel: Contact & CTA (Highlighted) */}
          <div className="footer-panel group relative flex flex-col p-8 rounded-[24px] bg-surface-darker backdrop-blur-2xl border border-border transition-all duration-500 hover:bg-panel shadow-lg overflow-hidden">
            {/* Subtle highlight gradient inside card */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <h3 className="relative z-10 text-sm font-semibold tracking-widest uppercase text-foreground mb-6 flex items-center gap-2">
              Command Center
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            </h3>
            
            <div className="relative z-10 flex flex-col gap-5">
              <a href="mailto:hello@at-smart.com" className="flex items-center gap-3 text-muted hover:text-foreground transition-colors font-medium">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-panel shadow-sm group-hover:border-accent transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span>hello@at-smart.com</span>
              </a>
              
              <a href="tel:+18005550199" className="flex items-center gap-3 text-muted hover:text-foreground transition-colors font-medium">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-panel shadow-sm group-hover:border-accent transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+1 (800) 555-0199</span>
              </a>

              <Button 
                variant="accent" 
                size="xl" 
                className="mt-4 w-full p-4 rounded-xl group/btn overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[sweep_1s_ease-in-out_forwards]" />
                <span className="relative z-10">Start Your Project</span>
                <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white text-accent">
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </div>
              </Button>
            </div>
          </div>

        </div>

        {/* 3. Footer Base */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border text-muted text-sm gap-4 font-medium">
          <p>© {new Date().getFullYear()} AT Smart Living. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>

          <div className="flex items-center gap-4 text-muted/80">
            <a href="#" className="hover:text-foreground transition-colors p-2" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="hover:text-foreground transition-colors p-2" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" className="hover:text-foreground transition-colors p-2" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
