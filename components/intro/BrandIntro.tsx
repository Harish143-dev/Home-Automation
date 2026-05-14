'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../lib/gsapSetup';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/* ─── Logo SVG (clean, solid) ─────────────────────────── */

function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`intro-logo ${className}`}
      viewBox="0 0 380 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxWidth: '380px', width: '72vw' }}
    >
      {/* "A" letter */}
      <path
        className="logo-path"
        d="M10 44 L28 4 L46 44 M18 28 L38 28"
        stroke="#8c1817"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* "T" letter */}
      <path
        className="logo-path"
        d="M54 4 L86 4 M70 4 L70 44"
        stroke="#8c1817"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* "P" letter */}
      <path
        className="logo-path"
        d="M94 44 L94 4 L118 4 Q128 4 128 16 Q128 28 118 28 L94 28"
        stroke="#8c1817"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* "L" letter */}
      <path
        className="logo-path"
        d="M138 4 L138 44 L166 44"
        stroke="#8c1817"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Divider */}
      <line
        className="logo-divider"
        x1="176"
        y1="10"
        x2="176"
        y2="38"
        stroke="rgba(140,24,23,0.4)"
        strokeWidth="1"
      />

      {/* AUTOMATION text */}
      <text
        className="logo-text"
        x="186"
        y="30"
        fontFamily="var(--font-sans)"
        fontSize="16"
        letterSpacing="6"
        fill="#111111"
        stroke="none"
      >
        AUTOMATION
      </text>
    </svg>
  );
}

/* ─── Main Component ──────────────────────────────────── */

export function BrandIntro() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;

      if (prefersReducedMotion) {
        gsap.set(overlay, { display: 'none', pointerEvents: 'none' });
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

      const logoPaths = overlay.querySelectorAll('.logo-path');
      const logoDivider = overlay.querySelector('.logo-divider');
      const logoText = overlay.querySelector('.logo-text');
      const tagline = overlay.querySelector('.intro-tagline');
      const taglineChars = overlay.querySelectorAll('.intro-tagline-char');
      const contentGroup = overlay.querySelector('.intro-content');
      const curtain = overlay.querySelector('.intro-curtain');

      // ─── Prepare stroke-dasharray for path drawing ───
      logoPaths.forEach((path) => {
        const el = path as SVGGeometryElement;
        if (el.getTotalLength) {
          const len = el.getTotalLength();
          gsap.set(el, {
            strokeDasharray: len,
            strokeDashoffset: len,
            opacity: 0,
          });
        }
      });

      // Hide divider and text initially
      gsap.set(logoDivider, { opacity: 0, scaleY: 0, transformOrigin: 'center center' });
      gsap.set(logoText, { opacity: 0, x: -8 });
      gsap.set(tagline, { opacity: 0 });
      gsap.set(taglineChars, { opacity: 0, y: 14 });
      gsap.set(contentGroup, { opacity: 1 });

      const tl = gsap.timeline({
        onComplete: () => {
          clearTimeout(safetyTimer);
          unlockScroll();
        },
      });

      /* ═══════════════════════════════════════════════
         IN — Logo Draw (0s → 2.4s)
         ═══════════════════════════════════════════════ */

      // Paths become visible
      tl.to(
        logoPaths,
        {
          opacity: 1,
          duration: 0.01,
          stagger: 0.15,
        },
        0.3
      );

      // Stroke draw animation
      tl.to(
        logoPaths,
        {
          strokeDashoffset: 0,
          duration: 1.4,
          stagger: 0.12,
          ease: 'power2.inOut',
        },
        0.3
      );

      // Divider appears
      tl.to(
        logoDivider,
        {
          opacity: 1,
          scaleY: 1,
          duration: 0.5,
          ease: 'power3.out',
        },
        1.2
      );

      // "AUTOMATION" text slides in
      tl.to(
        logoText,
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        1.4
      );

      /* ═══════════════════════════════════════════════
         IN — Tagline (2.0s → 2.8s)
         ═══════════════════════════════════════════════ */

      tl.to(tagline, { opacity: 1, duration: 0.01 }, 2.0);

      tl.to(
        taglineChars,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.02,
          ease: 'power3.out',
        },
        2.0
      );

      /* ═══════════════════════════════════════════════
         HOLD — Brief pause to register the brand (2.8s → 3.6s)
         ═══════════════════════════════════════════════ */

      tl.addLabel('hold', 3.2);

      /* ═══════════════════════════════════════════════
         OUT — Hero Reveal Transition (3.6s → 5.2s)
         The curtain shrinks upward with a curved bottom,
         mirroring the hero section's initial frame shape.
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
        3.6
      );

      // Curtain shrinks upward revealing hero — mirrors hero frame shape
      tl.to(
        curtain,
        {
          height: '0%',
          ease: 'power3.inOut',
          duration: 1.0,
        },
        3.8
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
        3.8
      );

      // Signal hero section to begin its entrance while curtain is still lifting
      tl.call(() => {
        window.dispatchEvent(new CustomEvent('introComplete'));
      }, [], 4.0);

      // Final cleanup
      tl.set(overlay, { display: 'none', pointerEvents: 'none' }, 5.0);

      return () => {
        clearTimeout(safetyTimer);
        unlockScroll();
      };
    },
    { scope: overlayRef, dependencies: [prefersReducedMotion] }
  );

  const taglineText = 'Designing Intelligent Spaces';

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] overflow-hidden"
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

        {/* Tagline */}
        <div
          className="intro-tagline mt-6 overflow-hidden text-center font-[var(--font-sans)] text-xs tracking-[0.3em] uppercase"
          style={{ color: 'rgba(100,100,100,0.7)' }}
        >
          {taglineText.split('').map((char, i) => (
            <span key={i} className="intro-tagline-char inline-block">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
