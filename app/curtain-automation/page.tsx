"use client";

import { CurtainHero } from "../../components/sections/curtain-automation/CurtainHero";
import { CurtainTrust } from "../../components/sections/curtain-automation/CurtainTrust";
import { CurtainCredentials } from "../../components/sections/curtain-automation/CurtainCredentials";
import { CurtainOverview } from "../../components/sections/curtain-automation/CurtainOverview";
import { CurtainScenarios } from "../../components/sections/curtain-automation/CurtainScenarios";
import { CurtainWhyATPL } from "../../components/sections/curtain-automation/CurtainWhyATPL";
import { CurtainClients } from "../../components/sections/curtain-automation/CurtainClients";
import { CurtainFeatures } from "../../components/sections/curtain-automation/CurtainFeatures";
import { CurtainBenefits } from "../../components/sections/curtain-automation/CurtainBenefits";
import { CurtainTypes } from "../../components/sections/curtain-automation/CurtainTypes";
import { CurtainControls } from "../../components/sections/curtain-automation/CurtainControls";
import { CurtainExperienceCenters } from "../../components/sections/curtain-automation/CurtainExperienceCenters";
import { CurtainCTA } from "../../components/sections/curtain-automation/CurtainCTA";

export default function CurtainAutomationPage() {
  return (
    <main className="relative bg-background">
      {/* Cinematic Hero Flythrough with Smart Controls */}
      <CurtainHero />

      {/* Trust & Legacy Metrics */}
      <CurtainTrust />

      {/* Prestigious Client Portfolio */}
      <CurtainClients />

      {/* Industry Accolades & Certificates */}
      <CurtainCredentials />

      {/* Intelligent Control Features */}
      <CurtainFeatures />

      {/* Benefits Grid */}
      <CurtainBenefits />

      {/* Control Interfaces */}
      <CurtainControls />

      {/* Shade Types Accordion */}
      <CurtainTypes />

      {/* Why Motorized Shades Overview */}
      <CurtainOverview />

      {/* Smart Living Scenarios */}
      <CurtainScenarios />


      {/* Why Choose ATPL */}
      <CurtainWhyATPL />

      {/* Experience Centers */}
      <CurtainExperienceCenters />

      {/* Call to Action */}
      <CurtainCTA />
    </main>
  );
}
