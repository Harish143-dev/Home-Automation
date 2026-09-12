import MduHero from "@/components/sections/mdu-automation/MduHero";
import MduFeatures from "@/components/sections/mdu-automation/MduFeatures";
import MduPlatform from "@/components/sections/mdu-automation/MduPlatform";
import MduProjects from "@/components/sections/mdu-automation/MduProjects";
import MduCTA from "@/components/sections/mdu-automation/MduCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MDU Automation Solutions | AT Smart Living",
  description: "Create intelligent apartment communities with integrated smart home automation that enhances convenience, energy efficiency, security, and modern living for every resident.",
};

export default function MduAutomationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      <MduHero />
      <MduFeatures />
      {/* <MduPlatform /> */}
      {/* <MduProjects /> */}
      <MduCTA />
    </main>
  );
}
