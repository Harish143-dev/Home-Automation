'use client';

import React, { useState } from 'react';
import { 
  Globe, 
  Headphones, 
  Award, 
  Zap, 
  ArrowRight,
  Cpu,
  Layers
} from 'lucide-react';

const usps = [
  {
    id: 1,
    title: 'End-to-End Solutions',
    shortTitle: 'End-to-End',
    description: "We handle everything from initial design and planning to installation, programming, and ongoing maintenance for your smart home.",
    icon: Layers,
  },
  {
    id: 2,
    title: 'Custom Engineering',
    shortTitle: 'Engineering',
    description: "Tailored automation systems engineered specifically for your lifestyle, architecture, and personal preferences.",
    icon: Cpu,
  },
  {
    id: 3,
    title: 'Premium Partners',
    shortTitle: 'Partners',
    description: "Exclusive access to the world's most advanced and reliable home automation technology and premium global brands.",
    icon: Globe,
  },
  {
    id: 4,
    title: 'Dedicated Support',
    shortTitle: 'Support',
    description: "24/7 priority support and proactive system monitoring to ensure your home always operates flawlessly.",
    icon: Headphones,
  },
  {
    id: 5,
    title: 'Proven Expertise',
    shortTitle: 'Expertise',
    description: "Decades of combined experience delivering high-end residential technology solutions for the most discerning clients.",
    icon: Award,
  },
  {
    id: 6,
    title: 'Fast Execution',
    shortTitle: 'Execution',
    description: "Streamlined deployment processes that minimize disruption while maintaining the highest standards of quality.",
    icon: Zap,
  }
];

export function WhyChooseUsSection() {
  const [activePanel, setActivePanel] = useState<number>(0);

  return (
    <section className="relative py-24 px-4 md:px-8 overflow-hidden bg-[#F5F5F7] text-[#1D1D1F]">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-semibold mb-6 tracking-tight leading-[1.1]">
              Why Leading Brands <br className="hidden md:block" />
              Choose Us.
            </h2>
            <p className="text-[#86868B] text-lg md:text-[21px] font-medium leading-relaxed tracking-tight">
              Experience the pinnacle of home automation with a partner dedicated to technical excellence, design integration, and flawless execution.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-[15px] font-medium text-[#0066CC] hover:underline transition-all group">
            View All Capabilities
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Desktop & Mobile Layout Container */}
        <div className="flex flex-col md:flex-row h-auto md:h-[600px] gap-3 md:gap-4 w-full">
          {usps.map((usp, index) => {
            const isActive = activePanel === index;
            const Icon = usp.icon;
            
            return (
              <div
                key={usp.id}
                onMouseEnter={() => setActivePanel(index)}
                onFocus={() => setActivePanel(index)}
                tabIndex={0}
                className={`
                  relative overflow-hidden rounded-[32px] cursor-pointer
                  transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                  group flex flex-col border
                  ${isActive 
                    ? 'h-[420px] md:h-full md:flex-[4_4_0%] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.06)] border-transparent z-10 scale-[1.01] md:scale-100' 
                    : 'h-[88px] md:h-full md:flex-[1_1_0%] bg-[#FFFFFF] hover:bg-[#FAFAFC] border-black/[0.03] z-0'
                  }
                `}
              >
                {/* 
                  Compressed State Title Bar 
                */}
                <div className={`
                  absolute inset-0 z-20 pointer-events-none
                  transition-opacity duration-300
                  ${isActive ? 'opacity-0' : 'opacity-100 delay-300'}
                `}>
                  {/* Desktop Layout */}
                  <div className="hidden md:flex flex-col items-center justify-between w-full h-full py-10">
                    <div className="w-14 h-14 rounded-full bg-[#F5F5F7] flex items-center justify-center shrink-0 transition-colors duration-500">
                      <Icon size={24} className="text-[#1D1D1F]" strokeWidth={1.5} />
                    </div>
                    
                    {/* The text container uses a fixed width relative to the rotation to ensure it aligns nicely */}
                    <div className="flex-1 flex items-end justify-center pb-12">
                      <div className="-rotate-90 whitespace-nowrap origin-center font-medium text-[17px] text-[#1D1D1F] tracking-wide">
                        {usp.shortTitle}
                      </div>
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="md:hidden flex items-center w-full h-full p-5">
                    <div className="w-14 h-14 rounded-full bg-[#F5F5F7] flex items-center justify-center shrink-0">
                      <Icon size={24} className="text-[#1D1D1F]" strokeWidth={1.5} />
                    </div>
                    <div className="ml-5 font-semibold text-[17px] text-[#1D1D1F] tracking-tight">
                      {usp.title}
                    </div>
                  </div>
                </div>

                {/* 
                  Expanded Content Area 
                */}
                <div className={`
                  flex-1 flex flex-col justify-end p-8 md:p-12 relative w-full h-full
                  transition-all duration-500 delay-100
                  ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                `}>
                  {/* Subtle Background Icon */}
                  <div className={`
                    absolute top-8 right-8 md:top-12 md:right-12 
                    flex items-center justify-center pointer-events-none
                    transition-all duration-1000 transform
                    ${isActive ? 'scale-100 rotate-0 opacity-100' : 'scale-50 -rotate-45 opacity-0'}
                  `}>
                    <Icon className="w-24 h-24 md:w-32 md:h-32 text-[#F5F5F7]" strokeWidth={0.75} />
                  </div>

                  <div className="relative z-10 mt-auto max-w-xl">
                    {/* Small active icon above title */}
                    <div className={`
                      w-14 h-14 rounded-full bg-[#1D1D1F] flex items-center justify-center mb-8
                      transition-all duration-500 transform
                      ${isActive ? 'translate-y-0 opacity-100 delay-100' : 'translate-y-8 opacity-0'}
                    `}>
                      <Icon size={24} className="text-white" strokeWidth={1.5} />
                    </div>

                    <h3 className={`
                      text-3xl md:text-[2.5rem] leading-[1.1] font-semibold text-[#1D1D1F] mb-4 tracking-tight
                      transition-all duration-500 transform
                      ${isActive ? 'translate-y-0 opacity-100 delay-150' : 'translate-y-8 opacity-0'}
                    `}>
                      {usp.title}
                    </h3>
                    <p className={`
                      text-[#86868B] text-[17px] md:text-[19px] mb-10 leading-relaxed font-medium tracking-tight
                      transition-all duration-500 transform
                      ${isActive ? 'translate-y-0 opacity-100 delay-200' : 'translate-y-8 opacity-0'}
                    `}>
                      {usp.description}
                    </p>
                    
                    <button className={`
                      flex items-center gap-2 text-[15px] font-semibold text-white
                      bg-[#1D1D1F] hover:bg-[#000000] px-6 py-3.5 rounded-full
                      transition-all duration-500 transform
                      ${isActive ? 'translate-y-0 opacity-100 delay-300' : 'translate-y-8 opacity-0'}
                    `}>
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <button className="md:hidden mt-10 w-full flex items-center justify-center gap-2 text-[15px] font-medium text-[#0066CC]">
          View All Capabilities
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
