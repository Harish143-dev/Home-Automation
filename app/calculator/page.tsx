'use client';

import React from 'react';
import { CalculatorHero } from '@/components/sections/calculator/CalculatorHero';
import { ChooseCalculatorSection } from '@/components/sections/calculator/ChooseCalculatorSection';
import { CalculatorStepsSection } from '@/components/sections/calculator/CalculatorStepsSection';

export default function CalculatorPage() {
  return (
    <main className="relative bg-background text-foreground w-full overflow-hidden">
      {/* 1. Header Section */}
      <CalculatorHero />

      {/* 2. Choose Your Calculator Section */}
      <ChooseCalculatorSection />

      {/* 3. Get Your Estimate in 3 Simple Steps */}
      <CalculatorStepsSection />
    </main>
  );
}
