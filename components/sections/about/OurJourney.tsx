"use client";

import React, { useRef } from "react";
import NextImage from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";
import { DURATION, EASE, STAGGER, SCROLL } from "@/lib/animation.config";

const ERAS = [
  {
    years: "2002–2005",
    title: "The Foundation",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Early smart home automation setup",
    milestones: [
      "ATPL started — Delhi office began operations",
      "Expanded in-house team by establishing operations in Mumbai",
      "Home automation integrator on Mr. Laxmi Mittal's (ArcelorMittal) residential project — the country's biggest at the time",
      "Nucleus of ATPL's core team began",
    ],
  },
  {
    years: "2006–2012",
    title: "Expansion & Scale",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Modern infrastructure and metro systems",
    milestones: [
      "Expanded operations to Bangalore",
      "Executed the 19 Delhi Metro station project",
      "First international projects in Afghanistan and Nepal",
    ],
  },
  {
    years: "2013–2018",
    title: "National Recognition",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Luxury hotel with intelligent automation",
    milestones: [
      "Executed the largest Lutron public area dimming installation in India at ITC Grand Chola, Chennai",
      "Delhi Experience Centre inaugurated",
      "Awarded top performer across India in Residential, Corporate and Hospitality by Lutron",
      "PAN India expansion across Delhi, Mumbai, Bangalore, Kolkata, Kochi, Pune and Hyderabad",
      "India's first-ever Lutron guestroom automation at The Oberoi, New Delhi and Lulu Grand Hyatt, Kochi",
      "Partnered with Meta Gurgaon for their new office",
    ],
  },
  {
    years: "2019–Present",
    title: "Industry Leadership",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200",
    imageAlt: "Premium smart living space",
    milestones: [
      "Automated Google India's office in Gurgaon",
      "Delivered the Prime Minister's Museum in New Delhi",
      "Mumbai Experience Centre launched",
      "Automation partner for Yashobhumi project in Dwarka",
      "Service team expanded to 60+ engineers — the largest in the country",
      "Residences of HNIs including Hritik Roshan and Madhuri Dixit",
      "BKT Farms — the biggest lighting and curtain automation project in India",
      "First company in India to introduce 24/7 call support and 4-hour on-site services",
      "Team crossed 100+ people",
    ],
  },
];

export default function OurJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    // Header reveal
    gsap.fromTo(".oj-header",
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: DURATION.slow,
        ease: EASE.reveal,
        scrollTrigger: {
          trigger: ".oj-header",
          start: "top 80%",
        }
      }
    );

    // Progress line scrub
    if (progressRef.current) {
      gsap.fromTo(progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: EASE.none,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: SCROLL.scrub,
          }
        }
      );
    }

    // Era cards — staggered reveal
    const cards = gsap.utils.toArray<HTMLElement>(".oj-era-card", sectionRef.current);
    cards.forEach((card) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 78%",
        }
      });

      // Dot glow
      const dot = card.querySelector(".oj-dot");
      if (dot) {
        tl.fromTo(dot,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: DURATION.medium, ease: EASE.premium }
        );
      }

      // Year label
      const year = card.querySelector(".oj-year");
      if (year) {
        tl.fromTo(year,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: DURATION.medium, ease: EASE.reveal },
          "-=0.3"
        );
      }

      // Text content
      const textCol = card.querySelector(".oj-text");
      if (textCol) {
        tl.fromTo(textCol,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: DURATION.normal, ease: EASE.reveal },
          "-=0.3"
        );
      }

      // Image with Ken Burns
      const imgWrapper = card.querySelector(".oj-img-wrapper");
      const img = card.querySelector(".oj-img");
      if (imgWrapper) {
        tl.fromTo(imgWrapper,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: DURATION.slow, ease: EASE.premium },
          "-=0.5"
        );
      }
      if (img) {
        // Ken Burns slow zoom on scroll
        gsap.fromTo(img,
          { scale: 1.15 },
          {
            scale: 1,
            ease: EASE.none,
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: SCROLL.scrubSlow,
            }
          }
        );
      }

      // Milestone bullets stagger
      const bullets = card.querySelectorAll(".oj-milestone");
      if (bullets.length > 0) {
        tl.fromTo(bullets,
          { x: -15, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: DURATION.medium,
            stagger: STAGGER.reveal,
            ease: EASE.standard,
          },
          "-=0.4"
        );
      }
    });

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 relative w-full bg-secondary text-white overflow-hidden px-5 sm:px-8 md:px-16 lg:px-24"
    >
      {/* Ambient glow overlays */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.04]"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.03]"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Noise Texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none" aria-hidden="true">
        <filter id="noise-journey"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#noise-journey)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="oj-header text-center mb-16 md:mb-24 opacity-0">
          <span className="block tracking-[0.3em] text-sm md:text-base text-white/50 font-medium mb-4">
            Our Journey
          </span>
          <h2 className=" text-white">
            Impact Through the Years
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Progress Line — Center (desktop) / Left (mobile) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 md:-translate-x-1/2 w-[1px] bg-white/10 z-0" />
          <div
            ref={progressRef}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 md:-translate-x-1/2 w-[1px] bg-white/40 origin-top scale-y-0 z-[1]"
            style={{ boxShadow: "0 0 12px rgba(255,255,255,0.15)" }}
          />

          {/* Era Cards */}
          <div className="flex flex-col gap-20 md:gap-28 lg:gap-36">
            {ERAS.map((era, idx) => {
              const isReversed = idx % 2 !== 0;

              return (
                <div
                  key={idx}
                  className="oj-era-card relative"
                >
                  {/* Timeline Dot */}
                  <div className="oj-dot absolute left-6 md:left-1/2 top-2 md:top-4 -translate-x-1/2 z-10">
                    <div className="w-4 h-4 rounded-full bg-white border-2 border-white shadow-[0_0_20px_rgba(255,255,255,0.25)]" />
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-white/30 animate-ping" />
                  </div>

                  {/* Card Content */}
                  <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-0`}>

                    {/* Text Side */}
                    <div className={`w-full md:w-1/2 ${isReversed ? 'md:pl-16 lg:pl-24' : 'md:pr-16 lg:pr-24'} pl-14 md:pl-0`}>
                      {/* Year Badge */}
                      <div className="oj-year mb-4 opacity-0">
                        <span className="inline-block text-sm md:text-base tracking-[0.3em] text-white font-medium px-4 py-1.5 rounded-full border border-white/20 bg-white/5">
                          {era.years}
                        </span>
                      </div>

                      <div className="oj-text opacity-0">
                        <h3 className=" text-white mb-6">
                          {era.title}
                        </h3>

                        <ul className="flex flex-col gap-3">
                          {era.milestones.map((milestone, mIdx) => (
                            <li key={mIdx} className="oj-milestone flex items-start gap-3 opacity-0">
                              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-white/40 mt-2.5" />
                              <span className="text-white/70 font-light text-sm md:text-base leading-relaxed">
                                {milestone}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Image Side */}
                    <div className={`w-full md:w-1/2 ${isReversed ? 'md:pr-16 lg:pr-24' : 'md:pl-16 lg:pl-24'} pl-14 md:pl-0 ${isReversed ? '' : 'md:pl-16 lg:pl-24'}`}>
                      <div className="oj-img-wrapper relative w-full aspect-[16/10] rounded-2xl md:rounded-[32px] overflow-hidden shadow-2xl shadow-black/30 opacity-0 transform-gpu">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                        <NextImage
                          src={era.image}
                          alt={era.imageAlt}
                          fill
                          className="oj-img object-cover will-change-transform"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
