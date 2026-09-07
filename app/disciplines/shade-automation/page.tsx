import type { Metadata } from "next";
import ShadeAutomationHero from "@/components/sections/disciplines/ShadeAutomationHero";
import { ShadeAutomationSolutions } from "@/components/sections/disciplines/ShadeAutomationSolutions";
import { ShadeAutomationEnvironments } from "@/components/sections/disciplines/ShadeAutomationEnvironments";
import { ShadeAutomationTrust } from "@/components/sections/disciplines/ShadeAutomationTrust";
import { ShadeAutomationClients } from "@/components/sections/disciplines/ShadeAutomationClients";
import { ShadeAutomationCredentials } from "@/components/sections/disciplines/ShadeAutomationCredentials";
import { ShadeAutomationControl } from "@/components/sections/disciplines/ShadeAutomationControl";
import { ShadeAutomationApplications } from "@/components/sections/disciplines/ShadeAutomationApplications";
import { ShadeAutomationWhyChooseUs } from "@/components/sections/disciplines/ShadeAutomationWhyChooseUs";
import { ShadeAutomationProcess } from "@/components/sections/disciplines/ShadeAutomationProcess";
import { ShadeAutomationCTA } from "@/components/sections/disciplines/ShadeAutomationCTA";

export const metadata: Metadata = {
  title: "Smart Shades Automation | AT Smart Living",
  description: "Automate blinds, curtains, and window shades to intelligently manage daylight, privacy, comfort, and energy across residential, hospitality, and commercial environments.",
};

export default function ShadeAutomationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      <ShadeAutomationHero />
      <ShadeAutomationTrust />
      <ShadeAutomationClients />
      <ShadeAutomationCredentials />
      <ShadeAutomationEnvironments />
      <ShadeAutomationSolutions />
      <ShadeAutomationControl />
      <ShadeAutomationApplications />
      <ShadeAutomationWhyChooseUs />
      <ShadeAutomationProcess />
      <ShadeAutomationCTA />
    </main>
  );
}
