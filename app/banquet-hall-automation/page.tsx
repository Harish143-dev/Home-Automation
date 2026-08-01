import { BanquetHallHero } from "@/components/sections/banquet-halls/BanquetHallHero";
import { BanquetHallTrust } from "@/components/sections/banquet-halls/BanquetHallTrust";
import { BanquetHallClients } from "@/components/sections/banquet-halls/BanquetHallClients";
import { BanquetHallCredentials } from "@/components/sections/banquet-halls/BanquetHallCredentials";
import { BanquetHallIntro } from "@/components/sections/banquet-halls/BanquetHallIntro";
import { BanquetHallSolutions } from "@/components/sections/banquet-halls/BanquetHallSolutions";
import { BanquetHallEventTypes } from "@/components/sections/banquet-halls/BanquetHallEventTypes";
import { BanquetHallControl } from "@/components/sections/banquet-halls/BanquetHallControl";
import { BanquetHallSceneBased } from "@/components/sections/banquet-halls/BanquetHallSceneBased";
import { BanquetHallBenefits } from "@/components/sections/banquet-halls/BanquetHallBenefits";
import { BanquetHallWhyChooseUs } from "@/components/sections/banquet-halls/BanquetHallWhyChooseUs";
import { BanquetHallProjects } from "@/components/sections/banquet-halls/BanquetHallProjects";
import { BanquetHallProcess } from "@/components/sections/banquet-halls/BanquetHallProcess";
import { BanquetHallPartner } from "@/components/sections/banquet-halls/BanquetHallPartner";
import { BanquetHallCTA } from "@/components/sections/banquet-halls/BanquetHallCTA";

export const metadata = {
  title: "Banquet Hall & Event Space Automation | AT Smart Living",
  description: "Deliver exceptional experiences for weddings and corporate events with intelligent lighting, immersive AV, and centralized automation.",
};

export default function BanquetHallAutomationPage() {
  return (
    <main className="w-full relative min-h-screen">
      <BanquetHallHero />
      <BanquetHallTrust />
      <BanquetHallClients />
      <BanquetHallCredentials />
      <BanquetHallIntro />
      <BanquetHallSolutions />
      <BanquetHallEventTypes />
      <BanquetHallControl />
      <BanquetHallSceneBased />
      <BanquetHallBenefits />
      <BanquetHallWhyChooseUs />
      <BanquetHallProjects />
      <BanquetHallProcess />
      <BanquetHallPartner />
      <BanquetHallCTA />
    </main>
  );
}
