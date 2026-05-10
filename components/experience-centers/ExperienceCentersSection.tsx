'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Calendar, MapPin, Navigation, Plane } from 'lucide-react';
import type { GlobeMethods, GlobeProps } from 'react-globe.gl';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const Globe = dynamic(() => import('react-globe.gl'), {
  ssr: false,
}) as React.ComponentType<
  GlobeProps & { ref?: React.MutableRefObject<GlobeMethods | undefined> }
>;

interface ExperienceCenter {
  id: string;
  name: string;
  city: string;
  country: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  isHeadquarters?: boolean;
}

interface CenterArc {
  id: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
}

const centers: ExperienceCenter[] = [
  {
    id: 'bom',
    name: 'Mumbai Headquarters',
    city: 'Mumbai',
    country: 'India',
    description:
      'Our flagship 15,000 sq ft innovation hub in India, showcasing next-gen automation tailored for luxury estates and seamless modern living.',
    address: 'Bandra Kurla Complex, Mumbai, India',
    lat: 19.076,
    lng: 72.8777,
    isHeadquarters: true,
  },
  {
    id: 'dxb',
    name: 'Dubai Oasis',
    city: 'Dubai',
    country: 'UAE',
    description:
      'Discover climate-adaptive automation and ultra-luxury entertainment spaces in our desert oasis.',
    address: 'Financial Center Road, Downtown Dubai',
    lat: 25.2048,
    lng: 55.2708,
  },
  {
    id: 'ldn',
    name: 'London Studio',
    city: 'London',
    country: 'United Kingdom',
    description:
      'Experience British architectural elegance seamlessly blended with invisible home automation.',
    address: '45 Park Lane, Mayfair, London',
    lat: 51.5074,
    lng: -0.1278,
  },
  {
    id: 'tyo',
    name: 'Tokyo Innovation',
    city: 'Tokyo',
    country: 'Japan',
    description:
      'Explore ultra-efficient spatial automation and zen-inspired integrated technology design.',
    address: '6-chome-10-1 Roppongi, Minato City, Tokyo',
    lat: 35.6762,
    lng: 139.6503,
  },
];

const headquarters = centers.find((center) => center.isHeadquarters) ?? centers[0];

const arcs: CenterArc[] = centers
  .filter((center) => center.id !== headquarters.id)
  .map((center) => ({
    id: `${headquarters.id}-${center.id}`,
    startLat: headquarters.lat,
    startLng: headquarters.lng,
    endLat: center.lat,
    endLng: center.lng,
  }));

function getCenter(data: object): ExperienceCenter {
  return data as ExperienceCenter;
}

function getArc(data: object): CenterArc {
  return data as CenterArc;
}

export function ExperienceCentersSection() {
  const { isMobile, isReady: mounted } = useBreakpoint();
  const prefersReducedMotion = useReducedMotion();
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [selectedCenterId, setSelectedCenterId] = useState(headquarters.id);
  const [hoveredCenterId, setHoveredCenterId] = useState<string | null>(null);

  const selectedCenter = useMemo(
    () => centers.find((center) => center.id === selectedCenterId) ?? headquarters,
    [selectedCenterId],
  );

  const globeSize = isMobile ? 390 : 760;
  const cameraAltitude = isMobile ? 2.55 : 1.75;

  useEffect(() => {
    if (!mounted || !globeRef.current) return;

    globeRef.current.pointOfView(
      {
        lat: selectedCenter.lat,
        lng: selectedCenter.lng,
        altitude: cameraAltitude,
      },
      prefersReducedMotion ? 0 : 900,
    );
  }, [cameraAltitude, mounted, prefersReducedMotion, selectedCenter]);

  const handleGlobeReady = () => {
    const globe = globeRef.current;
    if (!globe) return;

    const controls = globe.controls();
    controls.autoRotate = !prefersReducedMotion;
    controls.autoRotateSpeed = 0.35;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;

    globe.pointOfView(
      {
        lat: selectedCenter.lat,
        lng: selectedCenter.lng,
        altitude: cameraAltitude,
      },
      0,
    );
  };

  const selectCenter = (centerId: string) => {
    setSelectedCenterId(centerId);
  };

  return (
    <section className="relative overflow-hidden bg-background py-24 font-sans text-foreground md:py-32 border-t border-border">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,102,204,0.08),transparent_42%),linear-gradient(180deg,rgba(0,0,0,0.02),transparent_42%)]" />
      <div className="relative z-10 mx-auto mb-14 max-w-7xl px-6 text-center md:px-8">
        <h2 className="mb-6 text-[2.5rem] font-semibold leading-[1.1] tracking-tight text-foreground md:text-[3.5rem]">
          Global Innovation,<br className="hidden md:block" /> Centered in India.
        </h2>
        <p className="mx-auto max-w-2xl text-[19px] font-medium leading-relaxed tracking-tight text-muted md:text-[21px]">
          Explore our experience centers worldwide, proudly engineered and operated from our Mumbai Headquarters.
        </p>
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface-darker px-5 py-2.5 text-[14px] font-medium text-foreground backdrop-blur-md shadow-sm">
          <span className="h-2.5 w-2.5 rounded-full bg-[#0066CC] shadow-[0_0_10px_rgba(0,102,204,0.4)]" />
          Proudly Made in India. Trusted Globally.
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="relative min-h-[620px] overflow-hidden rounded-[34px] border border-border shadow-sm md:min-h-[760px] bg-panel">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(0,102,204,0.06),transparent_34%),radial-gradient(circle_at_50%_82%,rgba(0,0,0,0.02),transparent_28%)]" />
          <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
          <div className="pointer-events-none absolute left-5 top-5 z-20 rounded-full border border-border bg-panel/80 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-muted backdrop-blur-md md:left-8 md:top-8 shadow-sm">
            Live Network
          </div>

          <div className="pointer-events-none absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 md:flex">
            {centers.slice(0, 2).map((center) => (
              <button
                key={center.id}
                type="button"
                onClick={() => selectCenter(center.id)}
                className={`pointer-events-auto flex min-w-[154px] items-center gap-2 rounded-full border px-3 py-2 text-left text-[12px] font-semibold backdrop-blur-md transition-colors ${
                  center.id === selectedCenter.id
                    ? 'border-[#0066CC]/50 bg-[#0066CC]/10 text-foreground'
                    : 'border-border bg-surface-darker text-muted hover:bg-panel hover:text-foreground'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#4da3ff]" />
                {center.city}
              </button>
            ))}
          </div>

          <div className="pointer-events-none absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 md:flex">
            {centers.slice(2).map((center) => (
              <button
                key={center.id}
                type="button"
                onClick={() => selectCenter(center.id)}
                className={`pointer-events-auto flex min-w-[154px] items-center justify-end gap-2 rounded-full border px-3 py-2 text-right text-[12px] font-semibold backdrop-blur-md transition-colors ${
                  center.id === selectedCenter.id
                    ? 'border-[#0066CC]/50 bg-[#0066CC]/10 text-foreground'
                    : 'border-border bg-surface-darker text-muted hover:bg-panel hover:text-foreground'
                }`}
              >
                {center.city}
                <span className="h-1.5 w-1.5 rounded-full bg-[#4da3ff]" />
              </button>
            ))}
          </div>

          <div className="pointer-events-none absolute left-[15%] top-[23%] hidden items-center gap-2 text-muted md:flex">
            <Plane size={18} className="-rotate-12" />
            <span className="h-px w-20 bg-gradient-to-r from-black/10 to-transparent" />
          </div>
          <div className="pointer-events-none absolute right-[15%] top-[27%] hidden items-center gap-2 text-muted md:flex">
            <span className="h-px w-20 bg-gradient-to-l from-black/10 to-transparent" />
            <Plane size={18} className="rotate-12" />
          </div>

          <div className="motion-layer relative flex h-[430px] items-center justify-center pt-10 md:h-[650px] md:pt-0">
            {mounted ? (
              <Globe
                ref={globeRef}
                width={globeSize}
                height={isMobile ? 430 : 650}
                backgroundColor="rgba(0,0,0,0)"
                globeImageUrl="/images/earth-dark.jpg"
                bumpImageUrl="/images/earth-topology.png"
                showAtmosphere
                atmosphereColor="#0066CC"
                atmosphereAltitude={0.18}
                pointsData={centers}
                pointLat="lat"
                pointLng="lng"
                pointAltitude={(data) => {
                  const center = getCenter(data);
                  return center.id === selectedCenter.id ? 0.085 : center.isHeadquarters ? 0.065 : 0.045;
                }}
                pointRadius={(data) => {
                  const center = getCenter(data);
                  return center.id === selectedCenter.id ? 0.42 : center.isHeadquarters ? 0.34 : 0.24;
                }}
                pointColor={(data) => {
                  const center = getCenter(data);
                  if (center.id === selectedCenter.id || center.isHeadquarters) return '#1f8cff';
                  return hoveredCenterId === center.id ? '#ffffff' : 'rgba(255,255,255,0.82)';
                }}
                pointResolution={32}
                pointsTransitionDuration={prefersReducedMotion ? 0 : 650}
                onPointClick={(data) => selectCenter(getCenter(data).id)}
                onPointHover={(data) => setHoveredCenterId(data ? getCenter(data).id : null)}
                pointLabel={(data) => {
                  const center = getCenter(data);
                  return `${center.name}<br/>${center.address}`;
                }}
                arcsData={arcs}
                arcStartLat="startLat"
                arcStartLng="startLng"
                arcEndLat="endLat"
                arcEndLng="endLng"
                arcColor={() => ['rgba(0,102,204,0.12)', 'rgba(31,140,255,0.92)', 'rgba(255,255,255,0.4)']}
                arcAltitude={(data) => (getArc(data).id.includes('ldn') ? 0.28 : 0.2)}
                arcStroke={0.65}
                arcDashLength={0.42}
                arcDashGap={1.25}
                arcDashInitialGap={(data) => (arcs.findIndex((arc) => arc.id === getArc(data).id) + 1) * 0.35}
                arcDashAnimateTime={prefersReducedMotion ? 0 : 3400}
                labelsData={centers}
                labelLat="lat"
                labelLng="lng"
                labelText={(data) => getCenter(data).city}
                labelSize={(data) => (getCenter(data).id === selectedCenter.id ? 1.25 : 0.95)}
                labelAltitude={0.03}
                labelDotRadius={0.16}
                labelColor={(data) => {
                  const center = getCenter(data);
                  return center.id === selectedCenter.id ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.58)';
                }}
                labelsTransitionDuration={prefersReducedMotion ? 0 : 400}
                onGlobeReady={handleGlobeReady}
              />
            ) : (
              <div className="h-[320px] w-[320px] rounded-full border border-white/10 bg-white/[0.03] shadow-[0_0_80px_rgba(0,102,204,0.18)] md:h-[520px] md:w-[520px]" />
            )}
          </div>

          <div className="relative z-20 mx-auto flex max-w-fit gap-2 overflow-x-auto px-4 pb-4 md:hidden">
            {centers.map((center) => {
              const isSelected = center.id === selectedCenter.id;
              return (
                <button
                  key={center.id}
                  type="button"
                  onClick={() => selectCenter(center.id)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${
                    isSelected
                      ? 'border-[#0066CC] bg-[#0066CC] text-white'
                      : 'border-border bg-surface-darker text-muted'
                  }`}
                >
                  {center.city}
                </button>
              );
            })}
          </div>

          <div className="absolute inset-x-4 bottom-5 z-20 mx-auto max-w-[390px] rounded-[24px] border border-border bg-panel/90 p-4 shadow-xl backdrop-blur-xl md:bottom-8 md:right-8 md:left-auto md:mx-0">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#7db9ff]">
                {selectedCenter.city}, {selectedCenter.country}
              </p>
              {selectedCenter.isHeadquarters && (
                <span className="rounded-full border border-[#0066CC]/40 bg-[#0066CC]/20 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#8fc4ff]">
                  Global HQ
                </span>
              )}
            </div>
            <h3 className="mb-2 text-[22px] font-semibold leading-tight tracking-tight text-foreground">
              {selectedCenter.name}
            </h3>
            <p className="mb-4 line-clamp-2 text-[13px] font-medium leading-relaxed text-muted">
              {selectedCenter.description}
            </p>

            <div className="mb-4 flex items-start gap-2 text-muted">
              <MapPin size={14} className="mt-0.5 shrink-0 text-[#0066CC]" />
              <span className="line-clamp-2 text-[12px] font-medium leading-relaxed">
                {selectedCenter.address}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className="flex items-center justify-center gap-1.5 rounded-full bg-accent px-3 py-2.5 text-[12px] font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-secondary active:scale-[0.98]"
              >
                <Calendar size={14} /> Book
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-1.5 rounded-full border border-border bg-surface-darker px-3 py-2.5 text-[12px] font-semibold text-foreground transition-colors duration-300 hover:bg-panel shadow-sm"
              >
                <Navigation size={14} /> Route
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
