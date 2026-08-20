"use client";

import { ResidentialHero } from "@/components/sections/residential/ResidentialHero";
import { BrandTicker } from "@/components/sections/home/BrandTicker";
import { AwardsSection } from "@/components/sections/home/AwardsSection";
import { ResidentialServices } from "@/components/sections/residential/ResidentialServices";
import { ResidentialProcess } from "@/components/sections/residential/ResidentialProcess";
import { ResidentialCaseStudies } from "@/components/sections/residential/ResidentialCaseStudies";
import { ResidentialTestimonials } from "@/components/sections/residential/ResidentialTestimonials";
import { ResidentialExperienceCenters } from "@/components/sections/residential/ResidentialExperienceCenters";
import { ResidentialCTA } from "@/components/sections/residential/ResidentialCTA";
import { ResidentialTrust } from "@/components/sections/residential/ResidentialTrust";
import { ResidentialEfficiency } from "@/components/sections/residential/ResidentialEfficiency";
import { ResidentialPhilosophy } from "@/components/sections/residential/ResidentialPhilosophy";
import { ResidentialGovernance } from "@/components/sections/residential/ResidentialGovernance";
import { ResidentialCredentials } from "@/components/sections/residential/ResidentialCredentials";

export default function ResidentialPage() {
  return (
    <main className="relative bg-background overflow-hidden w-full">
      {/* Cinematic Hero Flythrough with Smart Controls */}
      <ResidentialHero />

      {/* Trust Signals Section */}
      <ResidentialTrust />

      {/* Trusted Brands */}
      <BrandTicker />

      {/* Efficiency & Performance Accordion Showcase */}
      <ResidentialEfficiency />

      {/* Interactive 3-Column Services Showcase */}
      <ResidentialServices />

      {/* Fullscreen Cinematic Case Studies */}
      <ResidentialCaseStudies />

      {/* Industry Credentials & Global Benchmarks */}
      <ResidentialCredentials />

      {/* Philosophy Expanding Accordion Showcase */}
      <ResidentialPhilosophy />

      {/* Asset Governance & Service SLAs */}
      <ResidentialGovernance />

      {/* Fullscreen Interactive Process Timeline */}
      <ResidentialProcess />

      {/* Experience Centers Map */}
      <ResidentialExperienceCenters />

      {/* Residential Testimonials */}
      <ResidentialTestimonials />

      {/* Final Call to Action */}
      <ResidentialCTA />

    </main>
  );
}
