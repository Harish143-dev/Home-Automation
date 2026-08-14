import { OfficeHero } from "@/components/sections/office/OfficeHero";
import { OfficeExperience } from "@/components/sections/office/OfficeExperience";
import { OfficeOverview } from "@/components/sections/office/OfficeOverview";
import { OfficeBenefits } from "@/components/sections/office/OfficeBenefits";
import { OfficeSpaces } from "@/components/sections/office/OfficeSpaces";
import { OfficeWorkflow } from "@/components/sections/office/OfficeWorkflow";
import { OfficeSolutions } from "@/components/sections/office/OfficeSolutions";
import { OfficeProjects } from "@/components/sections/office/OfficeProjects";
import { OfficeProcess } from "@/components/sections/office/OfficeProcess";
import { OfficeCTA } from "@/components/sections/office/OfficeCTA";

export const metadata = {
  title: "Office Automation Solutions | AT Smart Living",
  description: "Create a connected and efficient workplace with integrated solutions for lighting control, motorized shades, audio-video, conferencing, networking, security, and workspace management.",
};

export default function OfficeAutomationPage() {
  return (
    <main className="w-full relative min-h-screen">
      <OfficeHero />
      <OfficeExperience />
      <OfficeOverview />
      <OfficeBenefits />
      <OfficeSpaces />
      <OfficeWorkflow />
      <OfficeSolutions />
      <OfficeProjects />
      <OfficeProcess />
      <OfficeCTA />
    </main>
  );
}
