'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { Wifi, Router, Network, Phone, ShieldCheck } from 'lucide-react';

const PARTNERS = [
  {
    name: "Aruba",
    desc: "Enterprise-grade Wi-Fi solutions that deliver fast, secure, and reliable wireless connectivity with consistent performance throughout the home.",
    icon: Wifi
  },
  {
    name: "Ruckus",
    desc: "Advanced Wi-Fi technology engineered to provide exceptional coverage, superior performance, and dependable connectivity in high-density environments.",
    icon: Router
  },
  {
    name: "Cisco",
    desc: "Industry-leading networking infrastructure that offers secure, scalable, and high-performance connectivity for modern smart homes.",
    icon: Network
  },
  {
    name: "Grandstream",
    desc: "Professional IP communication and networking solutions that enable reliable voice, video, and smart device connectivity across the home.",
    icon: Phone
  },
  {
    name: "Texecom",
    desc: "Intelligent intrusion detection and security systems designed to provide dependable protection with integration into smart home ecosystems.",
    icon: ShieldCheck
  }
];

export function WifiNetworkingPartners() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    // Header Animation
    gsap.fromTo('.partner-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Cards Animation
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );
    });

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-12 md:py-16 relative w-full bg-panel px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/5">
      <div className="max-w-7xl w-full mx-auto flex flex-col items-center">

        {/* Header */}
        <div className="text-center max-w-4xl mb-16 md:mb-24">
          <h5 className=" partner-header text-accent tracking-[0.1em] mb-4">
            Technology Partners
          </h5>
          <h2 className=" partner-header text-foreground text-balance mb-6">
            Powered by Industry-Leading Technologies
          </h2>
          <p className="partner-header text-base md:text-xl font-light tracking-wide text-muted-foreground leading-relaxed text-balance">
            We integrate globally trusted networking and automation technologies to deliver long-term reliability.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="w-full flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10">
          {PARTNERS.map((partner, i) => {
            const Icon = partner.icon;
            return (
              <div
                key={i}
                ref={el => { cardsRef.current[i] = el; }}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.7rem)] bg-white rounded-2xl md:rounded-[2rem] p-8 md:p-10 border border-black/5 shadow-xl shadow-black/5 flex flex-col gap-6 group hover:-translate-y-2 transition-transform duration-500"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-panel rounded-full flex items-center justify-center border border-black/5 group-hover:bg-accent/5 transition-colors duration-500">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-accent" strokeWidth={1.5} />
                </div>

                <h3 className=" text-foreground">
                  {partner.name}
                </h3>

                <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                  {partner.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
