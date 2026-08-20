import { SpaHero } from "@/components/sections/spa-wellness/SpaHero";
import { SpaTrust } from "@/components/sections/spa-wellness/SpaTrust";
import { SpaClients } from "@/components/sections/spa-wellness/SpaClients";
import { SpaCredentials } from "@/components/sections/spa-wellness/SpaCredentials";
import { SpaIntro } from "@/components/sections/spa-wellness/SpaIntro";
import { SpaPlatform } from "@/components/sections/spa-wellness/SpaPlatform";
import { SpaSpaces } from "@/components/sections/spa-wellness/SpaSpaces";
import { SpaProcess } from "@/components/sections/spa-wellness/SpaProcess";
import { SpaBenefits } from "@/components/sections/spa-wellness/SpaBenefits";
import { SpaEcosystem } from "@/components/sections/spa-wellness/SpaEcosystem";
import { SpaProjects } from "@/components/sections/spa-wellness/SpaProjects";
import { SpaWhyChooseUs } from "@/components/sections/spa-wellness/SpaWhyChooseUs";
import { SpaHospitalityProcess } from "@/components/sections/spa-wellness/SpaHospitalityProcess";
import { SpaCTA } from "@/components/sections/spa-wellness/SpaCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spa & Wellness Automation | AT Smart Living",
  description: "Deliver a calming wellness experience with intelligent lighting, soothing audio, climate control, and automated shades.",
};

export default function SpaAndWellnessPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      <SpaHero />
      <SpaTrust />
      <SpaClients />
      <SpaCredentials />
      <SpaIntro />
      <SpaPlatform />
      <SpaSpaces />
      <SpaProcess />
      <SpaBenefits />
      <SpaEcosystem />
      <SpaProjects />
      <SpaWhyChooseUs />
      <SpaHospitalityProcess />
      <SpaCTA />
    </main>
  );
}
