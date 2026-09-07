import type { Metadata } from "next";
import HVACAutomationHero from "@/components/sections/disciplines/HVACAutomationHero";
import { HVACAutomationTrust } from "@/components/sections/disciplines/HVACAutomationTrust";
import { HVACAutomationClients } from "@/components/sections/disciplines/HVACAutomationClients";
import { HVACAutomationCredentials } from "@/components/sections/disciplines/HVACAutomationCredentials";
import { HVACAutomationFeatures } from "@/components/sections/disciplines/HVACAutomationFeatures";
import { HVACAutomationEnvironments } from "@/components/sections/disciplines/HVACAutomationEnvironments";
import { HVACAutomationDiagram } from "@/components/sections/disciplines/HVACAutomationDiagram";
import { HVACAutomationCapabilities } from "@/components/sections/disciplines/HVACAutomationCapabilities";
import { HVACAutomationBenefits } from "@/components/sections/disciplines/HVACAutomationBenefits";
import { HVACAutomationWhyChooseUs } from "@/components/sections/disciplines/HVACAutomationWhyChooseUs";
import { HVACAutomationProcess } from "@/components/sections/disciplines/HVACAutomationProcess";
import { HVACAutomationCTA } from "@/components/sections/disciplines/HVACAutomationCTA";

export const metadata: Metadata = {
  title: "Smart HVAC Automation | AT Smart Living",
  description: "Control and optimize heating, ventilation, and air conditioning with intelligent automation designed to improve comfort, energy efficiency, and operational control across residential, commercial, and hospitality environments.",
};

export default function HVACAutomationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      <HVACAutomationHero />
      <HVACAutomationTrust />
      <HVACAutomationClients />
      <HVACAutomationCredentials />
      <HVACAutomationFeatures />
      <HVACAutomationEnvironments />
      <HVACAutomationDiagram />
      <HVACAutomationCapabilities />
      <HVACAutomationBenefits />
      <HVACAutomationWhyChooseUs />
      <HVACAutomationProcess />
      <HVACAutomationCTA />
    </main>
  );
}
