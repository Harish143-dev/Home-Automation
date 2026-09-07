"use client";

import React, { useRef } from "react";
import NextImage from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SCROLL } from "@/lib/animation.config";

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

    // Progress line scrub
    if (progressRef.current) {
      gsap.fromTo(progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: SCROLL.scrub,
          }
        }
      );
    }

    // Era cards — Ken Burns zoom
    const cards = gsap.utils.toArray<HTMLElement>(".oj-era-card", sectionRef.current);
    cards.forEach((card) => {
      const img = card.querySelector(".oj-img");
      if (img) {
        // Ken Burns slow zoom on scroll
        gsap.fromTo(img,
          { scale: 1.15 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: SCROLL.scrubSlow,
            }
          }
        );
      }
    });

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 relative w-full bg-panel text-foreground overflow-hidden px-5 sm:px-8 md:px-16 lg:px-24"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="block tracking-[0.3em] text-sm md:text-base text-accent font-medium mb-4">
            Our Journey
          </span>
          <h2 className=" text-foreground">
            Impact Through the Years
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Progress Line — Center (desktop) / Left (mobile) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 md:-translate-x-1/2 w-[1px] bg-black/10 z-0" />
          <div
            ref={progressRef}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 md:-translate-x-1/2 w-[1px] bg-accent origin-top scale-y-0 z-[1]"
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
                  <div className="absolute left-6 md:left-1/2 top-2 md:top-4 -translate-x-1/2 z-10">
                    <div className="w-4 h-4 rounded-full bg-background border-2 border-accent" />
                  </div>

                  {/* Card Content */}
                  <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-0`}>

                    {/* Text Side */}
                    <div className={`w-full md:w-1/2 ${isReversed ? 'md:pl-16 lg:pl-24' : 'md:pr-16 lg:pr-24'} pl-14 md:pl-0`}>
                      {/* Year Badge */}
                      <div className="mb-4">
                        <span className="inline-block text-sm md:text-base tracking-[0.3em] text-foreground font-medium px-4 py-1.5 rounded-full border border-black/10 bg-black/5">
                          {era.years}
                        </span>
                      </div>

                      <div className="">
                        <h3 className=" text-foreground mb-6">
                          {era.title}
                        </h3>

                        <ul className="flex flex-col gap-3">
                          {era.milestones.map((milestone, mIdx) => (
                            <li key={mIdx} className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent/40 mt-2.5" />
                              <span className="text-muted-foreground font-light text-sm md:text-base leading-relaxed">
                                {milestone}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Image Side */}
                    <div className={`w-full md:w-1/2 ${isReversed ? 'md:pr-16 lg:pr-24' : 'md:pl-16 lg:pl-24'} pl-14 md:pl-0 ${isReversed ? '' : 'md:pl-16 lg:pl-24'}`}>
                      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden">
                        <div className="absolute inset-0 bg-black/5 z-10 pointer-events-none" />
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
