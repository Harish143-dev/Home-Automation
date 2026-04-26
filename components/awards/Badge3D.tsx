'use client';

import React, { useState } from 'react';

export type DepthLayer = 'front' | 'mid' | 'back';

export interface Award {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accentColor: string;
  layer: DepthLayer;
  /** Position as percentage of container width / height */
  position: { x: number; y: number };
}

/* ── Size + blur per depth layer ── */
const LAYER_STYLES: Record<DepthLayer, { card: string; iconSize: string; blur: string }> = {
  front: { card: 'w-[190px] h-[210px] md:w-[210px] md:h-[230px]', iconSize: 'w-8 h-8', blur: '' },
  mid:   { card: 'w-[160px] h-[180px] md:w-[175px] md:h-[195px]', iconSize: 'w-6 h-6', blur: '' },
  back:  { card: 'w-[130px] h-[150px] md:w-[145px] md:h-[165px]', iconSize: 'w-5 h-5', blur: 'blur-[0.6px]' },
};

const Z_DEPTH: Record<DepthLayer, number> = { front: 70, mid: 25, back: -15 };

/**
 * Individual 3D floating badge.
 *
 * Structure:
 *  .aw-badge  (absolute position + scroll parallax target)
 *    .aw-badge-float  (looping y-axis bob target)
 *      .aw-badge-card  (glassmorphism card + hover glow)
 *        ...content + tooltip
 */
export function Badge3D({ award }: { award: Award }) {
  const [hovered, setHovered] = useState(false);
  const Icon = award.icon;
  const ls = LAYER_STYLES[award.layer];
  const z = Z_DEPTH[award.layer];

  return (
    <div
      className={`motion-layer aw-badge aw-layer-${award.layer} absolute transform-gpu`}
      style={{
        left: `${award.position.x}%`,
        top: `${award.position.y}%`,
        zIndex: award.layer === 'front' ? 30 : award.layer === 'mid' ? 20 : 10,
        transform: `translateZ(${z}px)`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="aw-badge-float relative">
        {/* ── Card ── */}
        <div
          className={`
            aw-badge-card relative ${ls.card} ${ls.blur}
            rounded-[22px] border backdrop-blur-2xl
            p-5 flex flex-col items-center justify-center text-center
            transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-default
            ${hovered
              ? 'border-black/25 bg-black/[0.12] scale-[1.12]'
              : 'border-black/[0.08] bg-black/[0.04]'}
          `}
          style={{
            boxShadow: hovered
              ? `0 0 50px ${award.accentColor}30, 0 0 120px ${award.accentColor}10, 0 24px 60px rgba(0,0,0,0.5)`
              : `0 0 20px ${award.accentColor}10, 0 12px 36px rgba(0,0,0,0.35)`,
          }}
        >
          {/* Radial inner glow */}
          <div
            className="absolute inset-0 rounded-[22px] pointer-events-none transition-opacity duration-500"
            style={{
              background: `radial-gradient(ellipse at 50% 30%, ${award.accentColor}${hovered ? '18' : '08'}, transparent 70%)`,
              opacity: hovered ? 1 : 0.6,
            }}
          />

          {/* Icon */}
          <div
            className="relative z-10 mb-3 p-3 rounded-2xl border border-black/10 bg-black/[0.05] transition-colors duration-500"
            style={{ borderColor: hovered ? `${award.accentColor}40` : undefined }}
          >
            <Icon className={ls.iconSize} style={{ color: award.accentColor }} />
          </div>

          {/* Title */}
          <h4 className="relative z-10 text-[13px] font-bold text-black tracking-wide leading-snug mb-1">
            {award.title}
          </h4>

          {/* Year */}
          <span className="relative z-10 text-[10px] font-mono text-black/50 tracking-[0.2em] uppercase">
            {award.year}
          </span>

          {/* Metallic top-edge accent line */}
          <div
            className="absolute top-0 left-[15%] right-[15%] h-[1px] rounded-full transition-opacity duration-500"
            style={{
              background: `linear-gradient(90deg, transparent, ${award.accentColor}60, transparent)`,
              opacity: hovered ? 1 : 0.4,
            }}
          />
        </div>

        {/* ── Tooltip (appears above for low badges, below for high ones) ── */}
        <div
          className={`
            absolute left-1/2 -translate-x-1/2 w-[230px]
            p-4 rounded-2xl bg-white/90 backdrop-blur-2xl
            border border-black/10 pointer-events-none
            transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] z-[60]
            ${award.position.y > 40
              ? `bottom-full mb-3 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`
              : `top-full mt-3 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
          `}
        >
          <p className="text-[11px] font-semibold text-black/80 mb-1">{award.issuer}</p>
          <p className="text-[10px] text-black/60 leading-relaxed">{award.description}</p>
        </div>
      </div>
    </div>
  );
}
