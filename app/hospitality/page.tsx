"use client";


import { HospitalityHero } from "../../components/sections/hospitality/HospitalityHero";
import { HospitalityStats } from "../../components/sections/hospitality/HospitalityStats";
import { HospitalityFeaturedProjects } from "../../components/sections/hospitality/HospitalityFeaturedProjects";
import { HospitalityEnvironments } from "../../components/sections/hospitality/HospitalityEnvironments";
import { HospitalitySolutions } from "../../components/sections/hospitality/HospitalitySolutions";
import { HospitalityCapabilities } from "../../components/sections/hospitality/HospitalityCapabilities";
import { HospitalityBenefits } from "../../components/sections/hospitality/HospitalityBenefits";
import { HospitalityCaseStudies } from "../../components/sections/hospitality/HospitalityCaseStudies";
import { HospitalityRoiCalculator } from "../../components/sections/hospitality/HospitalityRoiCalculator";
import { HospitalityEcosystem } from "../../components/sections/hospitality/HospitalityEcosystem";
import { HospitalityTestimonials } from "../../components/sections/hospitality/HospitalityTestimonials";
import { AwardsSection } from "../../components/sections/home/AwardsSection";
import { HospitalityCTA } from "../../components/sections/hospitality/HospitalityCTA";

export default function HospitalityPage() {
  return (
    <main className="relative bg-background overflow-clip w-full">
      <HospitalityHero />
      <HospitalityStats />
      <HospitalityEnvironments />
      <HospitalityFeaturedProjects />
      <HospitalitySolutions />
      <HospitalityCapabilities />
      <HospitalityBenefits />

      <HospitalityCaseStudies />
      <HospitalityRoiCalculator />
      {/* <HospitalityEcosystem /> */}
      {/* <AwardsSection className="!pt-8 md:!pt-12" /> */}
      <HospitalityTestimonials />
      <HospitalityCTA />
    </main>
  );
}
