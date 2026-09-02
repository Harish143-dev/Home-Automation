import { MultiplexesHero } from "@/components/sections/multiplexes/MultiplexesHero";
import { MultiplexesTrust } from "@/components/sections/multiplexes/MultiplexesTrust";
import { MultiplexesCredentials } from "@/components/sections/multiplexes/MultiplexesCredentials";
import { MultiplexesPlatform } from "@/components/sections/multiplexes/MultiplexesPlatform";
import { MultiplexesSolutions } from "@/components/sections/multiplexes/MultiplexesSolutions";
import { MultiplexesBenefits } from "@/components/sections/multiplexes/MultiplexesBenefits";
import { MultiplexesWorkflow } from "@/components/sections/multiplexes/MultiplexesWorkflow";
import { MultiplexesEcosystem } from "@/components/sections/multiplexes/MultiplexesEcosystem";
import { MultiplexesProjects } from "@/components/sections/multiplexes/MultiplexesProjects";
import { MultiplexesWhyATPL } from "@/components/sections/multiplexes/MultiplexesWhyATPL";
import { MultiplexesCommercialProcess } from "@/components/sections/multiplexes/MultiplexesCommercialProcess";
import { MultiplexesCTA } from "@/components/sections/multiplexes/MultiplexesCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multiplex Automation Solutions | AT Smart Living",
  description: "Create immersive cinema experiences and efficiently managed multiplex environments with integrated audio-video, lighting, networking, security, and automation solutions designed for high-performance entertainment spaces.",
};

export default function MultiplexesAutomationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      <MultiplexesHero />
      <MultiplexesTrust />
      <MultiplexesCredentials />
      <MultiplexesPlatform />
      <MultiplexesSolutions />
      <MultiplexesBenefits />
      <MultiplexesWorkflow />
      <MultiplexesEcosystem />
      <MultiplexesProjects />
      <MultiplexesWhyATPL />
      <MultiplexesCommercialProcess />
      <MultiplexesCTA />
    </main>
  );
}

