import { SecurityHero } from "@/components/sections/security-automation/SecurityHero";
import { SecurityProtection } from "@/components/sections/security-automation/SecurityProtection";
import { SecurityFeatures } from "@/components/sections/security-automation/SecurityFeatures";
import { SecurityEcosystem } from "@/components/sections/security-automation/SecurityEcosystem";
import { SecurityAreas } from "@/components/sections/security-automation/SecurityAreas";
import { SecurityScenarios } from "@/components/sections/security-automation/SecurityScenarios";
import { SecurityControls } from "@/components/sections/security-automation/SecurityControls";
import { SecurityTrust } from "@/components/sections/security-automation/SecurityTrust";
import { SecurityClients } from "@/components/sections/security-automation/SecurityClients";
import { SecurityCredentials } from "@/components/sections/security-automation/SecurityCredentials";

export const metadata = {
  title: "Security & Access Control | AT Smart Living",
  description: "Protect your home with intelligent security solutions designed for the way you live. Discover our integrated biometric access and surveillance systems.",
};

export default function SecurityAutomationPage() {
  return (
    <main className="w-full relative min-h-screen">
      <SecurityHero />
      <SecurityTrust />
      <SecurityClients />
      <SecurityCredentials />
      <SecurityProtection />
      <SecurityFeatures />
      <SecurityEcosystem />
      <SecurityAreas />
      <SecurityScenarios />
      <SecurityControls />
    </main>
  );
}
