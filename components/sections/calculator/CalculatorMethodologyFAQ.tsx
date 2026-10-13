'use client';

import React, { useState, useRef } from 'react';
import { Plus, Minus, ShieldCheck, Award, Zap } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASE, DURATION, STAGGER } from '@/lib/animation.config';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How are these indicative energy and cost estimates calculated?',
    answer:
      'Our algorithms benchmark your inputs against 25+ years of verified field metrics collected across private villas, luxury hotels (such as Oberoi Rajvilas, Taj Mansingh), and corporate headquarters in Delhi NCR, Mumbai, and Bangalore. The models reference ASHRAE 90.1 energy standards and IGBC Green Building standards, incorporating real-world load curves for lighting dimming, HVAC set-back schedules, and motorized shade thermal rejection.',
  },
  {
    question: 'Can intelligent automation be retrofitted without breaking existing walls?',
    answer:
      'Yes. While new constructions benefit from unified wired backbones (such as centralized Lutron Homeworks QSX or KNX bus architectures), AT Smart Living also deploys enterprise wireless retrofit protocols (Lutron Clear Connect RF, Zigbee Pro, and hybrid gateway topologies). These allow full dimming, shade control, and HVAC modulation using existing electrical conduits without damaging architectural finishes.',
  },
  {
    question: 'Which automation subsystem delivers the fastest payback period?',
    answer:
      'HVAC and climate control consistently account for 55% to 65% of a luxury property’s electrical consumption in tropical climates. Automated occupancy setbacks and precision thermostatic scheduling typically pay for themselves within 18 to 28 months. Intelligent lighting control (especially when paired with daylight harvesting sensors) follows closely with immediate 20–30% lighting circuit load reductions.',
  },
  {
    question: 'How do motorized architectural shades contribute to energy savings?',
    answer:
      'Motorized architectural shades are an active thermal shield. By tracking the sun’s azimuth and elevation throughout the day, automated shades block up to 82% of solar heat gain before it penetrates the interior glazing. This significantly reduces the cooling tonnage requirement for air conditioning compressors, reducing chillers and VRV compressor wear.',
  },
  {
    question: 'What hardware standards and manufacturer warranties are provided?',
    answer:
      'AT Smart Living partners exclusively with tier-1 international brands including Lutron (USA), Crestron (USA), Somfy (France), and KNX certified manufacturers. All core controllers, processors, and drivers feature manufacturer-backed warranties of up to 5 to 10 years, backed by ATPL’s 24/7 Annual Maintenance Contract (AMC) engineering infrastructure across India.',
  },
];

export function CalculatorMethodologyFAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.fromTo(
      '.faq-anim-header',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DURATION.normal,
        stagger: STAGGER.normal,
        ease: EASE.reveal,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
    scheduleScrollRefresh(150);
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative w-full bg-background border-b border-border text-foreground"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 md:px-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="faq-anim-header flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-black/20" />
            <span className="tracking-[0.3em] text-xs sm:text-sm uppercase text-accent font-light">
              Engineering Rigour
            </span>
            <div className="h-[1px] w-8 bg-black/20" />
          </div>

          <h2 className="faq-anim-header text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide text-foreground mb-4">
            Calculation Methodology & FAQs
          </h2>

          <p className="faq-anim-header font-light text-base sm:text-lg leading-relaxed text-muted max-w-2xl mx-auto">
            Transparent insights into how AT Smart Living calculates financial returns, operational resilience, and energy conservation.
          </p>
        </div>

        {/* Headless Accordion as per DESIGN_SYSTEM.md */}
        <div className="divide-y divide-border border-y border-border">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="py-6 transition-colors duration-200">
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between text-left gap-6 group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <h3 className="font-light text-lg sm:text-xl text-foreground group-hover:text-accent transition-colors duration-200">
                    {faq.question}
                  </h3>
                  <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center shrink-0 text-muted group-hover:border-accent group-hover:text-accent transition-all">
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 pr-12 text-sm sm:text-base font-light text-muted leading-relaxed animate-in fade-in duration-300">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Credentials Bar */}
        <div className="mt-16 p-6 rounded-2xl bg-white border border-border flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-sm font-medium text-foreground">
                Verified Energy Audits by Certified Engineers
              </span>
              <span className="block text-xs text-muted font-light mt-0.5">
                Every customized proposal is backed by complete single-line schematics and load calculations.
              </span>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 text-xs font-medium text-accent">
            <ShieldCheck className="w-4 h-4" />
            <span>25+ Years Proven Track Record</span>
          </div>
        </div>

      </div>
    </section>
  );
}
