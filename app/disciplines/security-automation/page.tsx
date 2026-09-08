import type { Metadata } from "next";
import SecurityAutomationHero from "@/components/sections/disciplines/SecurityAutomationHero";
import { SecurityAutomationTrust } from "@/components/sections/disciplines/SecurityAutomationTrust";
import { SecurityAutomationClients } from "@/components/sections/disciplines/SecurityAutomationClients";
import { SecurityAutomationCredentials } from "@/components/sections/disciplines/SecurityAutomationCredentials";
import { SecurityAutomationCapabilities } from "@/components/sections/disciplines/SecurityAutomationCapabilities";
import { SecurityAutomationDiagram } from "@/components/sections/disciplines/SecurityAutomationDiagram";
import { SecurityAutomationSolutions } from "@/components/sections/disciplines/SecurityAutomationSolutions";
import { SecurityAutomationEnvironments } from "@/components/sections/disciplines/SecurityAutomationEnvironments";
import { SecurityAutomationWhyChooseUs } from "@/components/sections/disciplines/SecurityAutomationWhyChooseUs";
import { SecurityAutomationProcess } from "@/components/sections/disciplines/SecurityAutomationProcess";
import { SecurityAutomationCTA } from "@/components/sections/disciplines/SecurityAutomationCTA";

export const metadata: Metadata = {
  title: "Security Automation | AT Smart Living",
  description: "Protect what matters with integrated security automation solutions.",
};

export default function SecurityAutomationPage() {
  return (
    <main className="w-full flex flex-col min-h-screen">
      <SecurityAutomationHero />
      <SecurityAutomationTrust />
      <SecurityAutomationClients />
      <SecurityAutomationCredentials />
      <SecurityAutomationCapabilities />
      <SecurityAutomationDiagram />
      <SecurityAutomationSolutions />
      <SecurityAutomationEnvironments />
      <SecurityAutomationWhyChooseUs />
      <SecurityAutomationProcess />
      <SecurityAutomationCTA />
    </main>
  );
}
