'use client';

import { HeroSection } from '../components/hero/HeroSection';
import { BrandIntro } from '../components/intro/BrandIntro';
import { NavBar } from '../components/layout/NavBar';
import { StatsSection } from '../components/stats/StatsSection';
import { BrandTicker } from '../components/brands/BrandTicker';
import { AutomationSpaces } from '../components/panels/AutomationSpaces';
import { ConnectedSystems } from '../components/system/ConnectedSystems';
import { WhyChooseUsSection } from '../components/why-choose-us/WhyChooseUsSection';
import { ExperienceCentersSection } from '../components/experience-centers/ExperienceCentersSection';
import { ProcessSection } from '../components/process/ProcessSection';
import { FeaturedProjects } from '../components/projects/FeaturedProjects';
import { AwardsSection } from '../components/awards/AwardsSection';

export default function Home() {
  return (
    <main className="relative bg-background">
      <BrandIntro />
      <NavBar />
      <HeroSection />
      <StatsSection />
      <BrandTicker />
      <AutomationSpaces />
      <ConnectedSystems />
      <WhyChooseUsSection />
      <ExperienceCentersSection />
      <ProcessSection />
      <FeaturedProjects />
      <AwardsSection />
    </main>
  );
}
