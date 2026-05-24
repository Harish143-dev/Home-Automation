"use client";

import { NavBar } from "../../components/layout/NavBar";
import { CommercialHero } from "../../components/sections/commercial/CommercialHero";
import { CommercialCapabilities } from "../../components/sections/commercial/CommercialCapabilities";
import { CommercialTrust } from "../../components/sections/commercial/CommercialTrust";
import { CommercialIndustries } from "../../components/sections/commercial/CommercialIndustries";
import { CommercialSolutions } from "../../components/sections/commercial/CommercialSolutions";
import { CommercialProjects } from "../../components/sections/commercial/CommercialProjects";
import { CommercialBenefits } from "../../components/sections/commercial/CommercialBenefits";
import { CommercialTestimonials } from "../../components/sections/commercial/CommercialTestimonials";
import { CommercialCTA } from "../../components/sections/commercial/CommercialCTA";
import { BrandTicker } from "../../components/sections/home/BrandTicker";
import { Footer } from "../../components/layout/Footer";

export default function CommercialPage() {
  return (
    <main className="relative bg-background overflow-hidden w-full">
      {/* Navigation menu */}
      <NavBar />

      {/* Cinematic Commercial Hero */}
      <CommercialHero />

      {/* Trust Signals Section */}
      <CommercialTrust />

      {/* Commercial-Specific Trusted Brands */}
      <BrandTicker brands={[
        { name: 'CRESTRON' },
        { name: 'LUTRON' },
        { name: 'KNX' },
        { name: 'CISCO' },
        { name: 'BOSCH' },
        { name: 'HONEYWELL' },
        { name: 'SCHNEIDER' }
      ]} />

      {/* Industries We Serve Carousel */}
      <CommercialIndustries />

      {/* Commercial Automation Solutions */}
      <CommercialSolutions />

      {/* Commercial Benefits */}
      <CommercialBenefits />

      {/* Commercial Projects Accordion */}
      <CommercialProjects />

      {/* Smart Systems Marquee */}
      <CommercialCapabilities />

      {/* Commercial Testimonials */}
      <CommercialTestimonials />

      {/* Commercial CTA */}
      <CommercialCTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}
