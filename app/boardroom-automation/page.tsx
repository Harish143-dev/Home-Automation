import { BoardroomHero } from "@/components/sections/boardroom/BoardroomHero";
import { BoardroomTrust } from "@/components/sections/boardroom/BoardroomTrust";
import { BoardroomClients } from "@/components/sections/boardroom/BoardroomClients";
import { BoardroomCredentials } from "@/components/sections/boardroom/BoardroomCredentials";
import { BoardroomComparison } from "@/components/sections/boardroom/BoardroomComparison";
import { BoardroomSolutions } from "@/components/sections/boardroom/BoardroomSolutions";
import { BoardroomBenefits } from "@/components/sections/boardroom/BoardroomBenefits";
import { BoardroomSpaces } from "@/components/sections/boardroom/BoardroomSpaces";
import { BoardroomWhyChooseUs } from "@/components/sections/boardroom/BoardroomWhyChooseUs";
import { BoardroomProjects } from "@/components/sections/boardroom/BoardroomProjects";
import { BoardroomPartner } from "@/components/sections/boardroom/BoardroomPartner";
import { BoardroomProcess } from "@/components/sections/boardroom/BoardroomProcess";
import { BoardroomCTA } from "@/components/sections/boardroom/BoardroomCTA";

export const metadata = {
  title: "Boardroom & Meeting Room Automation | AT Smart Living",
  description: "Enable more productive meetings with intelligent boardroom automation featuring one-touch meeting control, advanced video conferencing, and premium audio-visual integration.",
};

export default function BoardroomAutomationPage() {
  return (
    <main className="w-full relative min-h-screen">
      <BoardroomHero />
      <BoardroomTrust />
      <BoardroomClients />
      <BoardroomCredentials />
      <BoardroomComparison />
      <BoardroomSolutions />
      <BoardroomBenefits />
      <BoardroomSpaces />
      <BoardroomWhyChooseUs />
      <BoardroomProjects />
      <BoardroomPartner />
      <BoardroomProcess />
      <BoardroomCTA />
    </main>
  );
}
