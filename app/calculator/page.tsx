'use client';

import React, { useState } from 'react';
import { CalculatorHero } from '@/components/sections/calculator/CalculatorHero';
import { BrandTicker } from '@/components/sections/home/BrandTicker';
import {
  ChooseCalculatorSection,
  CalculatorType,
} from '@/components/sections/calculator/ChooseCalculatorSection';
import { CalculatorStepsSection } from '@/components/sections/calculator/CalculatorStepsSection';
import { InteractiveCalculatorEngine } from '@/components/sections/calculator/InteractiveCalculatorEngine';
import { CalculatorMethodologyFAQ } from '@/components/sections/calculator/CalculatorMethodologyFAQ';
import { AwardsSection } from '@/components/sections/home/AwardsSection';
import { CalculatorCTA } from '@/components/sections/calculator/CalculatorCTA';

export default function CalculatorPage() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>('home');

  return (
    <main className="relative bg-background text-foreground w-full overflow-hidden">
      {/* 1. Header Section */}
      <CalculatorHero />

      {/* Trust & Brand Ticker */}
      <BrandTicker />

      {/* 2. Choose Your Calculator Section */}
      <ChooseCalculatorSection
        activeCalculator={activeCalculator}
        onSelectCalculator={setActiveCalculator}
      />

      {/* 3. Get Your Estimate in 3 Simple Steps */}
      <CalculatorStepsSection />

      {/* 4. Interactive Live Calculator Engine */}
      <InteractiveCalculatorEngine
        activeCalculator={activeCalculator}
        onChangeCalculator={setActiveCalculator}
      />

      {/* 5. Technical Methodology & Frequently Asked Questions */}
      <CalculatorMethodologyFAQ />

      {/* 6. Industry Awards & Recognition */}
      <AwardsSection className="!pt-8 md:!pt-12" />

      {/* 7. Call To Action */}
      <CalculatorCTA />
    </main>
  );
}
