'use client';

import { HeroSection } from '../components/sections/home/HeroSection';
import { BrandIntro } from '../components/sections/home/BrandIntro';

import { AutomationSpaces } from '../components/sections/home/AutomationSpaces';
import { StatsSection } from '../components/sections/home/StatsSection';
import { BrandTicker } from '../components/sections/home/BrandTicker';
import { ConnectedSystems } from '../components/sections/home/ConnectedSystems';
import { WhyChooseUsSection } from '../components/sections/home/WhyChooseUsSection';
import { ProcessSection } from '../components/sections/home/ProcessSection';
import { FeaturedProjects } from '../components/sections/home/FeaturedProjects';
import { AwardsSection } from '../components/sections/home/AwardsSection';
import { TestimonialsSection } from '../components/sections/home/TestimonialsSection';
import { CallToActionSection } from '../components/sections/home/CallToActionSection';

export default function Home() {
  return (
    <main className="relative bg-background">
      <BrandIntro />

      <HeroSection />
      <StatsSection />
      <BrandTicker />
      <AutomationSpaces />
      <ConnectedSystems />
      <FeaturedProjects />
      <AwardsSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <TestimonialsSection />
      <CallToActionSection />
    </main>
  );
}
