'use client';

import { HeroSection } from '../components/hero/HeroSection';
import { BrandIntro } from '../components/intro/BrandIntro';
import { NavBar } from '../components/layout/NavBar';
import { AutomationSpaces } from '../components/panels/AutomationSpaces';
import { StatsSection } from '../components/stats/StatsSection';
import { BrandTicker } from '../components/brands/BrandTicker';
import { ConnectedSystems } from '../components/system/ConnectedSystems';
import { WhyChooseUsSection } from '../components/why-choose-us/WhyChooseUsSection';
import { ExperienceCentersSection } from '../components/experience-centers/ExperienceCentersSection';
import { ProcessSection } from '../components/process/ProcessSection';
import { FeaturedProjects } from '../components/projects/FeaturedProjects';
import { AwardsSection } from '../components/awards/AwardsSection';
import { TestimonialsSection } from '../components/testimonials/TestimonialsSection';
import { CallToActionSection } from '../components/cta/CallToActionSection';

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
      <FeaturedProjects />
      <AwardsSection />
      <ExperienceCentersSection />
      <ProcessSection />
      <TestimonialsSection />
      <CallToActionSection />
    </main>
  );
}
