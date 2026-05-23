"use client";

import { NavBar } from "../../components/layout/NavBar";
import { ResidentialHero } from "../../components/sections/residential/ResidentialHero";
import { BrandTicker } from "../../components/sections/home/BrandTicker";
import { ResidentialServices } from "../../components/sections/residential/ResidentialServices";
import { ResidentialProcess } from "../../components/sections/residential/ResidentialProcess";
import { ResidentialCaseStudies } from "../../components/sections/residential/ResidentialCaseStudies";
import { ResidentialExperienceCenters } from "../../components/sections/residential/ResidentialExperienceCenters";
import { ResidentialTrust } from "../../components/sections/residential/ResidentialTrust";
import { Footer } from "../../components/layout/Footer";

export default function ResidentialPage() {
  return (
    <main className="relative bg-background overflow-hidden w-full">
      {/* Navigation menu */}
      <NavBar />

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

      {/* Interactive 3-Column Services Showcase */}
      <ResidentialServices />

      {/* Fullscreen Interactive Process Timeline */}
      <ResidentialProcess />

      {/* Fullscreen Cinematic Case Studies */}
      <ResidentialCaseStudies />

      {/* Experience Centers Map */}
      <ResidentialExperienceCenters />

      {/* Footer */}
      <Footer />
    </main>
  );
}
