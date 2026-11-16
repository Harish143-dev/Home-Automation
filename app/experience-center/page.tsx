"use client";

import { ExperienceHero } from "../../components/sections/experience-center/ExperienceHero";
import { ExperienceTrust } from "../../components/sections/experience-center/ExperienceTrust";
import { ExperienceUSP } from "../../components/sections/experience-center/ExperienceUSP";
import { ExperienceTestimonials } from "../../components/sections/experience-center/ExperienceTestimonials";
import { ExperienceCentersList } from "../../components/sections/experience-center/ExperienceCentersList";
import { ExperienceAudience } from "../../components/sections/experience-center/ExperienceAudience";
import { ExperienceGallery } from "../../components/sections/experience-center/ExperienceGallery";
import { ExperienceCTA } from "../../components/sections/experience-center/ExperienceCTA";
import { AwardsSection } from "../../components/sections/home/AwardsSection";

export default function ExperienceCenterPage() {
  return (
    <main className="relative bg-background overflow-hidden w-full">
      {/* Cinematic Hero */}
      <ExperienceHero />

      {/* Trust Signals Section */}
      <ExperienceTrust />

      {/* Fullscreen GSAP Animated Centers List */}
      <ExperienceCentersList />

      {/* Target Audience Section */}
      <ExperienceAudience />

      {/* Horizontal Scroll Gallery */}
      <ExperienceGallery />

      {/* Why Visit (USP) Section */}
      <ExperienceUSP />

      <AwardsSection />

      {/* Call to Action */}
      <ExperienceCTA />

      {/* Client Testimonials */}
      <ExperienceTestimonials />
    </main>
  );
}
