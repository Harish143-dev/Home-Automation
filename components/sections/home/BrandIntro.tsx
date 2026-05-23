'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

/* ─── Logo SVG (clean, solid) ─────────────────────────── */

function LogoMark({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Circular Loading Animation */}
      <svg
        className="intro-loading-circle absolute"
        width="240"
        height="240"
        viewBox="0 0 240 240"
      >
        <circle
          cx="120"
          cy="120"
          r="114"
          fill="none"
          stroke="rgba(140,24,23,0.2)"
          strokeWidth="4"
        />
        <circle
          className="loading-progress"
          cx="120"
          cy="120"
          r="114"
          fill="none"
          stroke="#8c1817"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="716.28"
          strokeDashoffset="716.28"
          transform="rotate(-90 120 120)"
        />
      </svg>

      <img
        className="intro-logo relative"
        src="/logo.svg"
        alt="Logo"
        style={{ height: '48px', width: 'auto' }}
      />
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────── */

export function BrandIntro() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [shouldShow, setShouldShow] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const hasPlayed = sessionStorage.getItem('brandIntroPlayed');
    if (hasPlayed || prefersReducedMotion) {
      setShouldShow(false);
      // Small delay to ensure HeroSection is mounted and listening
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('introComplete'));
      }, 100);
    } else {
      setShouldShow(true);
      sessionStorage.setItem('brandIntroPlayed', 'true');
    }
  }, [prefersReducedMotion]);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay || !shouldShow) return;

      if (prefersReducedMotion) {
        gsap.set(overlay, { display: 'none', pointerEvents: 'none' });
        window.dispatchEvent(new CustomEvent('introComplete'));
        return;
      }

      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.position = 'fixed';
      document.documentElement.style.width = '100%';
      document.documentElement.style.height = '100%';

      // Safety timeout
      const unlockScroll = () => {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.documentElement.style.position = '';
        document.documentElement.style.width = '';
        document.documentElement.style.height = '';
      };

      const safetyTimer = setTimeout(unlockScroll, 8000);

      const logoImg = overlay.querySelector('.intro-logo');
      const contentGroup = overlay.querySelector('.intro-content');
      const curtain = overlay.querySelector('.intro-curtain');
      const loadingProgress = overlay.querySelector('.loading-progress');
      const loadingCircle = overlay.querySelector('.intro-loading-circle');

      gsap.set(logoImg, { opacity: 0, scale: 0.95 });
      gsap.set(contentGroup, { opacity: 1 });
      gsap.set(loadingProgress, { strokeDashoffset: 716.28 });

      const tl = gsap.timeline({
        onComplete: () => {
          clearTimeout(safetyTimer);
          unlockScroll();
          sessionStorage.setItem('brandIntroFinished', 'true');
        },
      });

      /* ═══════════════════════════════════════════════
         IN — Logo Fade & Loader (0s → 2.4s)
         ═══════════════════════════════════════════════ */

      // Logo fade in
      tl.to(
        logoImg,
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
        },
        0.3
      );

      // Circle loading animation
      tl.to(
        loadingProgress,
        {
          strokeDashoffset: 0,
          duration: 2.0,
          ease: 'power2.inOut',
        },
        0.5
      );

      // Spin the circle
      tl.to(
        loadingCircle,
        {
          rotation: 360,
          duration: 3,
          ease: 'linear',
          repeat: -1,
        },
        0
      );

      /* ═══════════════════════════════════════════════
         HOLD — Brief pause to register the brand (2.4s → 2.8s)
         ═══════════════════════════════════════════════ */

      tl.addLabel('hold', 2.8);

      /* ═══════════════════════════════════════════════
         OUT — Hero Reveal Transition (2.8s → 4.4s)
         ═══════════════════════════════════════════════ */

      // Fade out content group first
      tl.to(
        contentGroup,
        {
          opacity: 0,
          scale: 0.97,
          duration: 0.5,
          ease: 'power2.in',
        },
        3.2
      );

      // Curtain shrinks upward revealing hero
      tl.to(
        curtain,
        {
          height: '0%',
          ease: 'power3.inOut',
          duration: 1.0,
        },
        3.4
      );

      // Simultaneously round the bottom edge as it retracts
      tl.to(
        curtain,
        {
          borderBottomLeftRadius: '10vw',
          borderBottomRightRadius: '10vw',
          ease: 'power2.inOut',
          duration: 0.8,
        },
        3.4
      );

      // Signal hero section to begin its entrance while curtain is still lifting
      tl.call(() => {
        window.dispatchEvent(new CustomEvent('introComplete'));
      }, [], 3.6);

      // Final cleanup
      tl.set(overlay, { display: 'none', pointerEvents: 'none' }, 4.6);

      return () => {
        clearTimeout(safetyTimer);
        unlockScroll();
      };
    },
    { scope: overlayRef, dependencies: [prefersReducedMotion, shouldShow] }
  );

  if (shouldShow === false) return null;

  const taglineText = 'Designing Intelligent Spaces';

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-[10000] overflow-hidden transition-opacity duration-300 ${shouldShow === null ? 'opacity-0' : 'opacity-100'}`}
      style={{ touchAction: 'none' }}
      aria-hidden="true"
    >
      {/* Curtain — the surface that retracts upward to reveal hero */}
      <div
        className="intro-curtain absolute inset-0 z-[1]"
        style={{
          height: '100%',
          background: '#faf9f7',
          borderBottomLeftRadius: '0px',
          borderBottomRightRadius: '0px',
          transformOrigin: 'top center',
        }}
      />

      {/* Centered content */}
      <div className="intro-content relative z-[5] flex h-full w-full flex-col items-center justify-center">
        {/* Logo */}
        <LogoMark />
      </div>
    </div>
  );
}
