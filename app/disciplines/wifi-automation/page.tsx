import type { Metadata } from "next";
import WifiAutomationHero from "@/components/sections/disciplines/WifiAutomationHero";
import { WifiAutomationTrust } from "@/components/sections/disciplines/WifiAutomationTrust";
import { WifiAutomationClients } from "@/components/sections/disciplines/WifiAutomationClients";
import { WifiAutomationCapabilities } from "@/components/sections/disciplines/WifiAutomationCapabilities";
import { WifiAutomationSolutions } from "@/components/sections/disciplines/WifiAutomationSolutions";
import { WifiAutomationBenefits } from "@/components/sections/disciplines/WifiAutomationBenefits";
import { WifiAutomationEnvironments } from "@/components/sections/disciplines/WifiAutomationEnvironments";
import { WifiAutomationWhyChooseUs } from "@/components/sections/disciplines/WifiAutomationWhyChooseUs";
import { WifiAutomationProcess } from "@/components/sections/disciplines/WifiAutomationProcess";
import { WifiAutomationCTA } from "@/components/sections/disciplines/WifiAutomationCTA";

export const metadata: Metadata = {
  title: "Intelligent Wi-Fi & Networking | AT Smart Living",
  description: "Build a fast, secure, and reliable network infrastructure designed to power intelligent homes, commercial environments, and hospitality spaces.",
};

export default function WifiAutomationPage() {
  return (
    <main className="w-full flex flex-col min-h-screen">
      <WifiAutomationHero />
      <WifiAutomationTrust />
      <WifiAutomationClients />
      <WifiAutomationCapabilities />
      <WifiAutomationSolutions />
      <WifiAutomationBenefits />
      <WifiAutomationEnvironments />
      <WifiAutomationWhyChooseUs />
      <WifiAutomationProcess />
      <WifiAutomationCTA />
    </main>
  );
}
