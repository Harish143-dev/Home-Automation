import { BanquetHallHero } from "@/components/sections/banquet-halls/BanquetHallHero";
import { BanquetHallIntro } from "@/components/sections/banquet-halls/BanquetHallIntro";
import { BanquetHallSolutions } from "@/components/sections/banquet-halls/BanquetHallSolutions";
import { BanquetHallEventTypes } from "@/components/sections/banquet-halls/BanquetHallEventTypes";
import { BanquetHallControl } from "@/components/sections/banquet-halls/BanquetHallControl";
import { BanquetHallSceneBased } from "@/components/sections/banquet-halls/BanquetHallSceneBased";
import { BanquetHallBenefits } from "@/components/sections/banquet-halls/BanquetHallBenefits";
import { BanquetHallProjects } from "@/components/sections/banquet-halls/BanquetHallProjects";
import { BanquetHallProcess } from "@/components/sections/banquet-halls/BanquetHallProcess";
import { BanquetHallCTA } from "@/components/sections/banquet-halls/BanquetHallCTA";

export const metadata = {
  title: "Banquet Hall & Event Space Automation | AT Smart Living",
  description: "Deliver exceptional experiences for weddings and corporate events with intelligent lighting, immersive AV, and centralized automation.",
};

export default function BanquetHallAutomationPage() {
  return (
    <main className="w-full relative min-h-screen">
      <BanquetHallHero />
      <BanquetHallIntro />
      <BanquetHallSolutions />
      <BanquetHallEventTypes />
      <BanquetHallControl />
      <BanquetHallSceneBased />
      <BanquetHallBenefits />
      <BanquetHallProjects />
      <BanquetHallProcess />
      <BanquetHallCTA />
    </main>
  );
}
