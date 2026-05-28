"use client";

import { ExperienceHero } from "../../components/sections/experience-center/ExperienceHero";
import { ResidentialTrust } from "../../components/sections/residential/ResidentialTrust";
import { ExperienceShowroom } from "../../components/sections/experience-center/ExperienceShowroom";
import { ExperienceUSP } from "../../components/sections/experience-center/ExperienceUSP";
import { ExperienceTestimonials } from "../../components/sections/experience-center/ExperienceTestimonials";
import { ExperienceCentersList } from "../../components/sections/experience-center/ExperienceCentersList";
import { ExperienceAudience } from "../../components/sections/experience-center/ExperienceAudience";
import { ExperienceGallery } from "../../components/sections/experience-center/ExperienceGallery";
import { ResidentialCTA } from "../../components/sections/residential/ResidentialCTA";

export default function ExperienceCenterPage() {
  return (
    <main className="relative bg-background overflow-hidden w-full">
      {/* Cinematic Hero */}
      <ExperienceHero />

      {/* Trust Signals Section */}
      <ResidentialTrust />

      {/* Showroom Media Section */}
      <ExperienceShowroom />

      {/* Fullscreen GSAP Animated Centers List */}
      <ExperienceCentersList />

      {/* Target Audience Section */}
      <ExperienceAudience />

      {/* Horizontal Scroll Gallery */}
      <ExperienceGallery />

      {/* Why Visit (USP) Section */}
      <ExperienceUSP />

      {/* Client Testimonials */}
      <ExperienceTestimonials />

      {/* Final Call to Action */}
      <ResidentialCTA />
    </main>
  );
}
