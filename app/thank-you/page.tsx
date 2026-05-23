"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { Button } from '../../components/ui/button';

export default function ThankYouPage() {
  
  useEffect(() => {
    // ---------------------------------------------------------
    // ANALYTICS TRACKING PLACEHOLDER
    // ---------------------------------------------------------
    // The user wants to actively track this page for traffic.
    // If you add Google Analytics (GA4) or Meta Pixel later, 
    // you can trigger your conversion event here. 
    // Example:
    // if (typeof window !== 'undefined' && (window as any).gtag) {
    //   (window as any).gtag('event', 'conversion', {
    //     'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL'
    //   });
    // }
    console.log('[Analytics] Thank You page loaded - Conversion Tracked');
  }, []);

  return (
    <main className="relative min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="absolute top-8 left-8 sm:top-12 sm:left-12">
        <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
          <NextImage
            src="/images/logo.svg"
            alt="AT Smart Living Logo"
            width={180}
            height={60}
            className="w-auto h-8 sm:h-10"
          />
        </Link>
      </div>

      <div className="w-full max-w-2xl flex flex-col items-center text-center gap-6 sm:gap-8 opacity-0 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards delay-200">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-accent/10 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 sm:w-12 sm:h-12 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wide text-foreground">
          Thank You
        </h1>
        
        <p className="text-muted text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-lg mx-auto">
          Your brochure is downloading. We appreciate your interest in AT Smart Living. One of our specialists will be in touch shortly.
        </p>

        <Link href="/" className="mt-8">
          <Button
            variant="outline"
            size="lg"
            className="px-8 h-12 sm:h-14 font-medium tracking-wider text-xs sm:text-sm uppercase border-foreground/20 text-foreground hover:bg-foreground hover:text-background transition-all duration-500"
          >
            Return to Home
          </Button>
        </Link>
      </div>
    </main>
  );
}
