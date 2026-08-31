import { RetailHero } from "@/components/sections/retail/RetailHero";
import { RetailTrust } from "@/components/sections/retail/RetailTrust";
import { RetailCredentials } from "@/components/sections/retail/RetailCredentials";
import { RetailIntro } from "@/components/sections/retail/RetailIntro";
import { RetailPlatform } from "@/components/sections/retail/RetailPlatform";
import { RetailSolutions } from "@/components/sections/retail/RetailSolutions";
import { RetailExperience } from "@/components/sections/retail/RetailExperience";
import { RetailBenefits } from "@/components/sections/retail/RetailBenefits";
import { RetailEcosystem } from "@/components/sections/retail/RetailEcosystem";
import { RetailWhyATPL } from "@/components/sections/retail/RetailWhyATPL";
import { RetailProjects } from "@/components/sections/retail/RetailProjects";
import { RetailCTA } from "@/components/sections/retail/RetailCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retail Automation Solutions | AT Smart Living",
  description: "Create immersive, efficient, and intelligently controlled retail environments with integrated lighting, audio, climate, security, and automation solutions designed around your brand and customer experience.",
};

export default function RetailAutomationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      <RetailHero />
      <RetailTrust />
      <RetailCredentials />
      <RetailIntro />
      <RetailPlatform />
      <RetailSolutions />
      <RetailExperience />
      <RetailBenefits />
      <RetailEcosystem />
      <RetailWhyATPL />
      <RetailProjects />
      <RetailCTA />
    </main>
  );
}
