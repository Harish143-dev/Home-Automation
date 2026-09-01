import { ExhibitionsHero } from "@/components/sections/exhibitions/ExhibitionsHero";
import { ExhibitionsTrust } from "@/components/sections/exhibitions/ExhibitionsTrust";
import { ExhibitionsCredentials } from "@/components/sections/exhibitions/ExhibitionsCredentials";
import { ExhibitionsPlatform } from "@/components/sections/exhibitions/ExhibitionsPlatform";
import { ExhibitionsBenefits } from "@/components/sections/exhibitions/ExhibitionsBenefits";
import { ExhibitionsSolutions } from "@/components/sections/exhibitions/ExhibitionsSolutions";
import { ExhibitionsEcosystem } from "@/components/sections/exhibitions/ExhibitionsEcosystem";
import { ExhibitionsWorkflow } from "@/components/sections/exhibitions/ExhibitionsWorkflow";
import { ExhibitionsApproach } from "@/components/sections/exhibitions/ExhibitionsApproach";
import { ExhibitionsWhyATPL } from "@/components/sections/exhibitions/ExhibitionsWhyATPL";
import { ExhibitionsProjects } from "@/components/sections/exhibitions/ExhibitionsProjects";
import { ExhibitionsCommercialProcess } from "@/components/sections/exhibitions/ExhibitionsCommercialProcess";
import { ExhibitionsCTA } from "@/components/sections/exhibitions/ExhibitionsCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exhibition Technology Solutions | AT Smart Living",
  description: "Create engaging exhibition spaces with integrated lighting, immersive LED displays, audio, networking, and interactive technology designed to capture attention and deliver memorable brand experiences.",
};

export default function ExhibitionsAutomationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      <ExhibitionsHero />
      <ExhibitionsTrust />
      <ExhibitionsCredentials />
      <ExhibitionsPlatform />
      <ExhibitionsBenefits />
      <ExhibitionsSolutions />
      <ExhibitionsEcosystem />
      <ExhibitionsWorkflow />
      <ExhibitionsApproach />
      <ExhibitionsWhyATPL />
      <ExhibitionsProjects />
      <ExhibitionsCommercialProcess />
      <ExhibitionsCTA />
    </main>
  );
}
