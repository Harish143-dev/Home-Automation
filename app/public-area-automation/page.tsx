import { PublicAreasHero } from "@/components/sections/public-areas/PublicAreasHero";
import { PublicAreasIntro } from "@/components/sections/public-areas/PublicAreasIntro";
import { PublicAreasSpaces } from "@/components/sections/public-areas/PublicAreasSpaces";
import { PublicAreasSolutions } from "@/components/sections/public-areas/PublicAreasSolutions";
import { PublicAreasProcess } from "@/components/sections/public-areas/PublicAreasProcess";
import { PublicAreasBenefits } from "@/components/sections/public-areas/PublicAreasBenefits";
import { PublicAreasTrust } from "@/components/sections/public-areas/PublicAreasTrust";
import { PublicAreasClients } from "@/components/sections/public-areas/PublicAreasClients";
import { PublicAreasCredentials } from "@/components/sections/public-areas/PublicAreasCredentials";
import { PublicAreasProjects } from "@/components/sections/public-areas/PublicAreasProjects";
import { PublicAreasWhyChooseUs } from "@/components/sections/public-areas/PublicAreasWhyChooseUs";
import { PublicAreasPartner } from "@/components/sections/public-areas/PublicAreasPartner";
import { PublicAreasHospitalityProcess } from "@/components/sections/public-areas/PublicAreasHospitalityProcess";
import { PublicAreasCTA } from "@/components/sections/public-areas/PublicAreasCTA";

export const metadata = {
  title: "Public Area Automation | AT Smart Living",
  description: "Deliver exceptional guest experiences with intelligent automation for hotel lobbies, receptions, corridors, lounges, and other public spaces.",
};

export default function PublicAreasPage() {
  return (
    <main className="w-full relative min-h-screen">
      <PublicAreasHero />
      <PublicAreasTrust />
      <PublicAreasClients />
      <PublicAreasCredentials />
      <PublicAreasIntro />
      <PublicAreasSpaces />
      <PublicAreasSolutions />
      <PublicAreasProcess />
      <PublicAreasBenefits />
      <PublicAreasWhyChooseUs />
      <PublicAreasProjects />
      <PublicAreasPartner />
      <PublicAreasHospitalityProcess />
      <PublicAreasCTA />
    </main>
  );
}
