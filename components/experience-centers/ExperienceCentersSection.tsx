'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Calendar, X } from 'lucide-react';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ExperienceCenter {
  id: string;
  name: string;
  description: string;
  address: string;
  coordinates: [number, number];
  image: string;
}

interface ProjectedPoint {
  x: number;
  y: number;
  visible: boolean;
}

const centers: ExperienceCenter[] = [
  {
    id: 'bom',
    name: 'Mumbai Headquarters',
    description: 'Our flagship 15,000 sq ft innovation hub in India, showcasing next-gen automation tailored for luxury estates and seamless modern living.',
    address: 'Bandra Kurla Complex, Mumbai, India',
    coordinates: [72.8777, 19.0760], // [lng, lat]
    image: '/images/experience-center-1.png'
  },
  {
    id: 'dxb',
    name: 'Dubai Oasis',
    description: 'Discover climate-adaptive automation and ultra-luxury entertainment spaces in our desert oasis.',
    address: 'Financial Center Road, Downtown Dubai',
    coordinates: [55.2708, 25.2048],
    image: '/images/experience-center-1.png'
  },
  {
    id: 'ldn',
    name: 'London Studio',
    description: 'Experience British architectural elegance seamlessly blended with invisible home automation.',
    address: '45 Park Lane, Mayfair, London',
    coordinates: [-0.1278, 51.5074],
    image: '/images/experience-center-1.png'
  },
  {
    id: 'tyo',
    name: 'Tokyo Innovation',
    description: 'Explore ultra-efficient spatial automation and zen-inspired integrated technology design.',
    address: '6-chome-10-1 Roppongi, Minato City, Tokyo',
    coordinates: [139.6503, 35.6762],
    image: '/images/experience-center-1.png'
  }
];

const GLOBE_SIZE = 700;
const GLOBE_CENTER = GLOBE_SIZE / 2;
const GLOBE_RADIUS = 260;

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

function projectPoint(
  coordinates: [number, number],
  rotation: [number, number, number],
): ProjectedPoint {
  const [lng, lat] = coordinates;
  const centralLng = -rotation[0];
  const centralLat = -rotation[1];
  const lambda = toRadians(lng - centralLng);
  const phi = toRadians(lat);
  const phi0 = toRadians(centralLat);

  const cosPhi = Math.cos(phi);
  const visible =
    Math.sin(phi0) * Math.sin(phi) +
    Math.cos(phi0) * cosPhi * Math.cos(lambda) >
    0;

  return {
    x: GLOBE_CENTER + GLOBE_RADIUS * cosPhi * Math.sin(lambda),
    y:
      GLOBE_CENTER -
      GLOBE_RADIUS *
        (Math.cos(phi0) * Math.sin(phi) -
          Math.sin(phi0) * cosPhi * Math.cos(lambda)),
    visible,
  };
}

function buildGreatCirclePath(
  points: [number, number][],
  rotation: [number, number, number],
) {
  const segments: string[] = [];
  let isDrawing = false;

  points.forEach((point) => {
    const projected = projectPoint(point, rotation);

    if (!projected.visible) {
      isDrawing = false;
      return;
    }

    segments.push(
      `${isDrawing ? 'L' : 'M'} ${projected.x.toFixed(1)} ${projected.y.toFixed(1)}`,
    );
    isDrawing = true;
  });

  return segments.join(' ');
}

function GlobeGrid({ rotation }: { rotation: [number, number, number] }) {
  const longitudeLines = Array.from({ length: 12 }, (_, index) => -180 + index * 30);
  const latitudeLines = [-60, -30, 0, 30, 60];

  return (
    <>
      {longitudeLines.map((lng) => {
        const points = Array.from({ length: 73 }, (_, index) => [
          lng,
          -90 + index * 2.5,
        ] as [number, number]);
        return (
          <path
            key={`lng-${lng}`}
            d={buildGreatCirclePath(points, rotation)}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={0.75}
          />
        );
      })}

      {latitudeLines.map((lat) => {
        const points = Array.from({ length: 145 }, (_, index) => [
          -180 + index * 2.5,
          lat,
        ] as [number, number]);
        return (
          <path
            key={`lat-${lat}`}
            d={buildGreatCirclePath(points, rotation)}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={lat === 0 ? 1.2 : 0.75}
          />
        );
      })}
    </>
  );
}

export function ExperienceCentersSection() {
  const [activePin, setActivePin] = useState<string | null>(null);
  const { isMobile, isReady: mounted } = useBreakpoint();
  // Initial rotation centered near India [lng: -75 to center 75, lat: -20 to center 20]
  const [rotation, setRotation] = useState<[number, number, number]>([-75, -15, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number, y: number } | null>(null);
  const animationFrameRef = useRef<number>(null);
  const prefersReducedMotion = useReducedMotion();

  // Slowly auto-rotate the 3D earth when not dragging
  useEffect(() => {
    if (!mounted || prefersReducedMotion) return;

    let lastTick = 0;
    const rotateGlobe = (time: number) => {
      if (!isDragging && !activePin && time - lastTick > 120) {
        lastTick = time;
        setRotation(r => [r[0] + 0.05, r[1], r[2]]);
      }
      animationFrameRef.current = requestAnimationFrame(rotateGlobe);
    };
    animationFrameRef.current = requestAnimationFrame(rotateGlobe);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [mounted, prefersReducedMotion, isDragging, activePin]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !dragStartRef.current) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    // Scale rotation drag speed
    setRotation(r => [
      r[0] + deltaX * 0.3,
      Math.max(Math.min(r[1] - deltaY * 0.3, 80), -80),
      r[2]
    ]);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  const handlePinInteraction = (id: string, coords: [number, number]) => {
    setActivePin(id);
    if (!isMobile) {
      // Smoothly rotate the map to focus on the clicked pin
      setRotation([-coords[0], -coords[1], 0]);
    }
  };

  const closePopup = () => {
    setActivePin(null);
  };

  return (
    <section className="relative py-24 md:py-32 bg-black overflow-hidden font-sans border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-20 mb-16 text-center">
        <h2 className="text-[2.5rem] md:text-[3.5rem] leading-[1.1] font-semibold text-white mb-6 tracking-tight">
          Global Innovation,<br className="hidden md:block" /> Centered in India.
        </h2>
        <p className="text-neutral-400 text-[19px] md:text-[21px] max-w-2xl mx-auto font-medium leading-relaxed tracking-tight">
          Explore our experience centers worldwide, proudly engineered and operated from our Mumbai Headquarters.
        </p>
        <div className="mt-8 inline-flex items-center gap-2 bg-white/10 border border-white/10 px-5 py-2.5 rounded-full text-[14px] font-medium text-white backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0066CC] shadow-[0_0_10px_rgba(0,102,204,0.8)] animate-pulse" />
          Proudly Made in India. Trusted Globally.
        </div>
      </div>

      {/* Map Container */}
      <div
        className="relative w-full max-w-[1400px] mx-auto h-[600px] md:h-[700px] rounded-[40px] overflow-hidden bg-[#0A0A0A] border border-white/10 shadow-[0_0_100px_rgba(0,102,204,0.05)] cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >

        {/* Abstract Ambient Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] max-h-[800px] rounded-full bg-[#0066CC]/5 blur-[120px] pointer-events-none" />

        {/* Lightweight orthographic globe */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center scale-110 md:scale-125">
          {mounted && (
            <svg
              viewBox={`0 0 ${GLOBE_SIZE} ${GLOBE_SIZE}`}
              className="h-full w-full max-w-[760px]"
              role="img"
              aria-label="Global experience center locations"
            >
              <defs>
                <radialGradient id="globeGlow" cx="38%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#1f2937" />
                  <stop offset="55%" stopColor="#111111" />
                  <stop offset="100%" stopColor="#030303" />
                </radialGradient>
                <clipPath id="globeClip">
                  <circle cx={GLOBE_CENTER} cy={GLOBE_CENTER} r={GLOBE_RADIUS} />
                </clipPath>
              </defs>

              <circle
                cx={GLOBE_CENTER}
                cy={GLOBE_CENTER}
                r={GLOBE_RADIUS}
                fill="url(#globeGlow)"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={1}
              />
              <g clipPath="url(#globeClip)">
                <GlobeGrid rotation={rotation} />
                <path
                  d="M250 260 C300 215 360 215 405 258 C450 300 445 372 395 414 C335 466 250 440 220 372 C198 324 210 285 250 260 Z"
                  fill="rgba(255,255,255,0.035)"
                />
                <path
                  d="M420 190 C500 212 545 270 535 350 C525 438 442 494 365 470 C430 420 470 354 462 285 C458 248 442 216 420 190 Z"
                  fill="rgba(0,102,204,0.035)"
                />
              </g>

              {/* Render Pins */}
              {centers.map((center) => {
                const isActive = activePin === center.id;
                const point = projectPoint(center.coordinates, rotation);

                return (
                  <g
                    key={center.id}
                    transform={`translate(${point.x} ${point.y})`}
                    style={{ display: point.visible ? 'block' : 'none' }}
                  >
                    <g
                      onMouseEnter={() => !isMobile && handlePinInteraction(center.id, center.coordinates)}
                      onMouseLeave={() => !isMobile && closePopup()}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isMobile) {
                          handlePinInteraction(center.id, center.coordinates);
                        } else {
                          handlePinInteraction(center.id, center.coordinates);
                        }
                      }}
                      style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                    >
                      {/* Glow effect for India */}
                      {center.id === 'bom' && !isActive && (
                        <circle r={18} fill="#0066CC" opacity={0.3} className="animate-ping" />
                      )}

                      {/* Ripple */}
                      {isActive && (
                        <circle r={28} fill="#0066CC" opacity={0.2} className="animate-ping" />
                      )}
                      {/* Background glow */}
                      <circle r={14} fill={isActive || center.id === 'bom' ? "rgba(0,102,204,0.3)" : "rgba(255,255,255,0.05)"} />
                      {/* Core dot */}
                      <circle
                        r={isActive ? 8 : (center.id === 'bom' ? 7 : 5)}
                        fill={isActive || center.id === 'bom' ? "#0066CC" : "#FFFFFF"}
                        stroke="#0A0A0A"
                        strokeWidth={2}
                        style={{ transition: 'all 0.3s ease' }}
                      />

                      {/* SVG Tooltip/Popup for Desktop */}
                      {isActive && !isMobile && (
                        <foreignObject x={15} y={-80} width={260} height={200} style={{ overflow: 'visible' }}>
                          <div
                            className="w-[240px] bg-black/40 backdrop-blur-[24px] rounded-[16px] shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden pointer-events-auto p-4"
                            style={{ animation: 'fadeIn 0.3s cubic-bezier(0.25,1,0.5,1) forwards' }}
                          >
                            <style>{`
                              @keyframes fadeIn {
                                from { opacity: 0; transform: scale(0.95) translateY(5px); }
                                to { opacity: 1; transform: scale(1) translateY(0); }
                              }
                            `}</style>

                            <div className="relative">
                              {center.id === 'bom' && (
                                <div className="mb-2 inline-block bg-[#0066CC] text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-white/20 uppercase tracking-widest">
                                  Global HQ
                                </div>
                              )}
                              <h4 className="text-[15px] font-semibold text-white tracking-tight mb-1">{center.name}</h4>
                              <p className="text-neutral-400 text-[11px] leading-relaxed mb-3 whitespace-normal line-clamp-2">{center.description}</p>

                              <div className="flex items-start gap-1.5 mb-4">
                                <MapPin size={12} className="text-[#0066CC] shrink-0 mt-0.5" />
                                <span className="text-neutral-300 text-[10px] font-medium leading-tight whitespace-normal">{center.address}</span>
                              </div>

                              <div className="flex gap-2">
                                <button className="flex-1 bg-white hover:bg-neutral-200 text-black py-1.5 rounded-full text-[10px] font-semibold transition-colors flex items-center justify-center gap-1.5">
                                  <Calendar size={12} /> Book
                                </button>
                                <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-1.5 rounded-full text-[10px] font-semibold transition-colors flex items-center justify-center gap-1.5 border border-white/5">
                                  <Navigation size={12} /> Route
                                </button>
                              </div>
                            </div>
                          </div>
                        </foreignObject>
                      )}
                    </g>
                  </g>
                );
              })}
            </svg>
          )}
        </div>



        {/* Mobile Bottom Sheet Modal */}
        {isMobile && (
          <div className="absolute inset-0 z-50 pointer-events-none flex items-end justify-center">
            {/* Backdrop */}
            <div
              className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 pointer-events-auto ${activePin ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              onClick={closePopup}
            />

            {/* Sheet Content */}
            <div
              className={`
                w-full bg-neutral-900 rounded-t-[32px] overflow-hidden pointer-events-auto border-t border-white/10
                transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                ${activePin ? 'translate-y-0' : 'translate-y-full'}
              `}
            >
              {activePin && (
                <>
                  <div className="p-6 relative pt-12">
                    <button
                      onClick={closePopup}
                      className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 transition-colors"
                    >
                      <X size={16} />
                    </button>
                    {activePin === 'bom' && (
                      <div className="mb-4 inline-block bg-[#0066CC] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg border border-white/20 uppercase tracking-widest z-10">
                        Global HQ
                      </div>
                    )}
                    <h4 className="text-[22px] font-semibold text-white tracking-tight mb-2 mt-1">
                      {centers.find(c => c.id === activePin)?.name}
                    </h4>
                    <p className="text-neutral-400 text-[14px] leading-relaxed mb-6">
                      {centers.find(c => c.id === activePin)?.description}
                    </p>

                    <div className="flex items-start gap-2 mb-8">
                      <MapPin size={16} className="text-[#0066CC] shrink-0 mt-0.5" />
                      <span className="text-neutral-300 text-[14px] font-medium leading-snug">
                        {centers.find(c => c.id === activePin)?.address}
                      </span>
                    </div>

                    <div className="flex flex-col gap-3">
                      <button className="w-full bg-white text-black py-3.5 rounded-full text-[15px] font-semibold active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
                        <Calendar size={16} /> Book a Visit
                      </button>
                      <button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 py-3.5 rounded-full text-[15px] font-semibold active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
                        <Navigation size={16} /> Get Directions
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
