"use client";


import { HospitalityHero } from "../../components/sections/hospitality/HospitalityHero";
import { HospitalityStats } from "../../components/sections/hospitality/HospitalityStats";
import { HospitalityFeaturedProjects } from "../../components/sections/hospitality/HospitalityFeaturedProjects";
import { HospitalityEnvironments } from "../../components/sections/hospitality/HospitalityEnvironments";
import { HospitalitySolutions } from "../../components/sections/hospitality/HospitalitySolutions";
import { HospitalityBenefits } from "../../components/sections/hospitality/HospitalityBenefits";
import { HospitalityEcosystem } from "../../components/sections/hospitality/HospitalityEcosystem";
import { HospitalityTestimonials } from "../../components/sections/hospitality/HospitalityTestimonials";
import { AwardsSection } from "../../components/sections/home/AwardsSection";
import { HospitalityCTA } from "../../components/sections/hospitality/HospitalityCTA";

export default function HospitalityPage() {
  return (
    <main className="relative bg-background overflow-hidden w-full">
      <HospitalityHero />
      <HospitalityStats />
      <HospitalityFeaturedProjects />
      <HospitalityEnvironments />
      <HospitalitySolutions />
      <HospitalityBenefits />
      <HospitalityEcosystem />
      <AwardsSection />
      <HospitalityTestimonials />
      <HospitalityCTA />
    </main>
  );
}
