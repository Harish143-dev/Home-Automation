'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import type { GlobeMethods, GlobeProps } from 'react-globe.gl';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap } from '../../lib/gsapSetup';

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
      'Our flagship 15,000 sq ft innovation hub, showcasing next-gen automation tailored for luxury estates.',
    address: 'Bandra Kurla Complex, Mumbai',
    lat: 19.076,
    lng: 72.8777,
    isHeadquarters: true,
  },
  {
    id: 'del',
    name: 'Delhi NCR Studio',
    city: 'New Delhi',
    country: 'India',
    description:
      'Experience climate-adaptive automation and ultra-luxury entertainment spaces in the capital.',
    address: 'DLF Cyber City, Gurugram',
    lat: 28.5355,
    lng: 77.3910,
  },
  {
    id: 'blr',
    name: 'Bangalore Innovation',
    city: 'Bangalore',
    country: 'India',
    description:
      'Explore ultra-efficient spatial automation and cutting-edge integrated technology design.',
    address: 'UB City, Vittal Mallya Road, Bangalore',
    lat: 12.9716,
    lng: 77.5946,
  },
  {
    id: 'hyd',
    name: 'Hyderabad Oasis',
    city: 'Hyderabad',
    country: 'India',
    description:
      'Discover seamless architectural elegance blended with invisible home automation.',
    address: 'HITEC City, Hyderabad',
    lat: 17.3850,
    lng: 78.4867,
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
  const sectionRef = useRef<HTMLElement>(null);
  const globeContainerRef = useRef<HTMLDivElement>(null);

  const { isMobile, isReady: mounted } = useBreakpoint();
  const prefersReducedMotion = useReducedMotion();
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [hoveredCenterId, setHoveredCenterId] = useState<string | null>(null);

  const hoveredCenter = useMemo(
    () => centers.find((center) => center.id === hoveredCenterId),
    [hoveredCenterId]
  );

  // Set canvas to exact screen width to prevent the "box" cut-offs on the left and right
  const globeWidth = mounted ? window.innerWidth : 1000;
  // Make height massive so the globe has plenty of room to render without bottom clipping
  const globeHeight = mounted ? Math.max(window.innerWidth, window.innerHeight) : 1000;

  // Cinematic GSAP Entrance Animation
  useEffect(() => {
    if (!mounted || prefersReducedMotion || !sectionRef.current || !globeContainerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        globeContainerRef.current,
        {
          opacity: 0,
          y: 200,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 2.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted, prefersReducedMotion]);

  const handleGlobeReady = () => {
    const globe = globeRef.current;
    if (!globe) return;

    const controls = globe.controls();
    controls.autoRotate = false; // Locked rotation
    controls.enableZoom = false; // No scroll zoom
    controls.enablePan = false; // No panning

    // Shift lat down to 10 so India (lat 21) sits beautifully on the top curve of the half earth
    globe.pointOfView(
      {
        lat: 0,
        lng: 78.0,
        altitude: isMobile ? 1.6 : 1.5, // Zoomed in to create massive half-earth curve
      },
      0,
    );
  };

  return (
    <section ref={sectionRef} className="relative w-full h-[110vh] min-h-[900px] overflow-hidden bg-background border-t border-border flex flex-col items-center">

      {/* Soft Light Background Glow */}
      {/* <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.02),transparent_70%)]" /> */}

      {/* Cinematic Heading Overlay - Restored to the top */}
      <div className="absolute top-16 md:top-24 left-0 w-full text-center z-20 pointer-events-none px-6">
        <h2 className="mb-4 text-[2.5rem] font-semibold leading-[1.1] tracking-tight text-foreground md:text-[3.5rem]">
          Experience India's Premier<br className="hidden md:block" /> Smart Home Network.
        </h2>
        <p className="mx-auto max-w-2xl text-[18px] font-medium leading-relaxed tracking-tight text-muted">
          Hover over our innovation hubs across the nation.
        </p>
      </div>

      {/* The Cinematic Globe Container - Pushed down to act as a rising half-earth */}
      <div
        ref={globeContainerRef}
        className="absolute top-[40%] left-0 w-full flex justify-center cursor-crosshair opacity-0 z-10"
      >
        {mounted && (
          <Globe
            ref={globeRef}
            width={globeWidth}
            height={globeHeight}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg" // Dark Earth Model
            bumpImageUrl="/images/earth-topology.png"
            showAtmosphere={false}
            pointsData={centers}
            pointLat="lat"
            pointLng="lng"
            pointAltitude={(data) => {
              const center = getCenter(data);
              return center.id === hoveredCenterId ? 0.085 : center.isHeadquarters ? 0.065 : 0.045;
            }}
            pointRadius={(data) => {
              const center = getCenter(data);
              return center.id === hoveredCenterId ? 0.35 : center.isHeadquarters ? 0.20 : 0.15;
            }}
            pointColor={(data) => {
              const center = getCenter(data);
              if (center.isHeadquarters) return '#8c1817'; // Crimson HQ dot on light earth
              return hoveredCenterId === center.id ? '#D32F2F' : 'rgba(140, 24, 23, 0.7)'; // Red dots
            }}
            pointResolution={32}
            pointsTransitionDuration={prefersReducedMotion ? 0 : 400}
            onPointHover={(data) => setHoveredCenterId(data ? getCenter(data).id : null)}
            arcsData={arcs}
            arcStartLat="startLat"
            arcStartLng="startLng"
            arcEndLat="endLat"
            arcEndLng="endLng"
            arcColor={() => ['rgba(140,24,23,0.2)', 'rgba(140,24,23,0.8)', 'rgba(140,24,23,0.4)']} // Crimson arcs for contrast
            arcAltitude={(data) => 0.12}
            arcStroke={0.5}
            arcDashLength={0.42}
            arcDashGap={1.25}
            arcDashInitialGap={(data) => (arcs.findIndex((arc) => arc.id === getArc(data).id) + 1) * 0.35}
            arcDashAnimateTime={prefersReducedMotion ? 0 : 3400}
            labelsData={centers}
            labelLat="lat"
            labelLng="lng"
            labelText={(data) => getCenter(data).city}
            labelSize={(data) => (getCenter(data).id === hoveredCenterId ? 1.0 : 0.6)}
            labelAltitude={0.02}
            labelDotRadius={0.10}
            labelColor={(data) => {
              const center = getCenter(data);
              return center.id === hoveredCenterId ? '#ffffff' : 'rgba(255,255,255,0.8)'; // White labels for dark earth
            }}
            labelsTransitionDuration={prefersReducedMotion ? 0 : 400}
            onGlobeReady={handleGlobeReady}
          />
        )}
      </div>

      {/* Cinematic Hover Popup */}
      <div
        className={`pointer-events-none absolute bottom-12 left-1/2 -translate-x-1/2 z-20 w-[90%] max-w-[420px] rounded-[24px] border border-border bg-panel/95 p-7 shadow-[0_30px_60px_rgba(0,0,0,0.15)] backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${hoveredCenter ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
          }`}
      >
        {hoveredCenter && (
          <>
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-accent">
                {hoveredCenter.city}, {hoveredCenter.country}
              </p>
              {hoveredCenter.isHeadquarters && (
                <span className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-accent">
                  Global HQ
                </span>
              )}
            </div>
            <h3 className="mb-3 text-[24px] font-semibold leading-tight tracking-tight text-foreground">
              {hoveredCenter.name}
            </h3>
            <p className="mb-6 text-[14px] font-medium leading-relaxed text-muted">
              {hoveredCenter.description}
            </p>

            <div className="flex items-start gap-2 text-muted border-t border-border pt-5 mt-5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
              <span className="text-[13px] font-medium leading-relaxed">
                {hoveredCenter.address}
              </span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
