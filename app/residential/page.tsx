"use client";

import { ResidentialHero } from "../../components/sections/residential/ResidentialHero";
import { BrandTicker } from "../../components/sections/home/BrandTicker";
import { ResidentialServices } from "../../components/sections/residential/ResidentialServices";
import { ResidentialProcess } from "../../components/sections/residential/ResidentialProcess";
import { ResidentialCaseStudies } from "../../components/sections/residential/ResidentialCaseStudies";
import { ResidentialTestimonials } from "../../components/sections/residential/ResidentialTestimonials";
import { ResidentialExperienceCenters } from "../../components/sections/residential/ResidentialExperienceCenters";
import { ResidentialCTA } from "../../components/sections/residential/ResidentialCTA";
import { ResidentialTrust } from "../../components/sections/residential/ResidentialTrust";
import { ResidentialEfficiency } from "../../components/sections/residential/ResidentialEfficiency";
import { ResidentialPhilosophy } from "../../components/sections/residential/ResidentialPhilosophy";

export default function ResidentialPage() {
  return (
    <main className="relative bg-background overflow-hidden w-full">
      {/* Cinematic Hero Flythrough with Smart Controls */}
      <ResidentialHero />

      {/* Trust Signals Section */}
      <ResidentialTrust />

      {/* Residential-Specific Trusted Brands */}
      <BrandTicker brands={[
        { name: 'BASALTE' },
        { name: 'JOSH.AI' },
        { name: 'EKINEX' },
        { name: 'TRUFIG' },
        { name: 'MELJAC' },
        { name: 'VANTAGE' },
        { name: 'GIRA' }
      ]} />

      {/* Efficiency & Performance Accordion Showcase */}
      <ResidentialEfficiency />

      {/* Interactive 3-Column Services Showcase */}
      <ResidentialServices />

      {/* Philosophy Expanding Accordion Showcase */}
      <ResidentialPhilosophy />

      {/* Fullscreen Cinematic Case Studies */}
      <ResidentialCaseStudies />

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
