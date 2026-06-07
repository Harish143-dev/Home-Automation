import { Metadata } from "next";

import AboutHero from "@/components/sections/about/AboutHero";
import BrandStory from "@/components/sections/about/BrandStory";
import LegacyExpertise from "@/components/sections/about/LegacyExpertise";
import ProcessPhilosophy from "@/components/sections/about/ProcessPhilosophy";
import ExperienceEcosystem from "@/components/sections/about/ExperienceEcosystem";
import ClosingStatement from "@/components/sections/about/ClosingStatement";

export const metadata: Metadata = {
  title: "About Us | AT Smart Living",
  description: "We design intelligent living experiences. A cinematic architectural brand story of luxury smart automation and lighting control.",
};

export default function AboutPage() {
  return (
    <main className="relative bg-background text-foreground min-h-screen">


      {/* 
        Hero Section is Dark Theme (black overlay, white text).
        The rest of the sections are Light Theme (bg-background, text-foreground).
      */}
      <AboutHero />
      <BrandStory />
      <LegacyExpertise />
      <ProcessPhilosophy />
      <ExperienceEcosystem />
      <ClosingStatement />
    </main>
  );
}
