import { WifiNetworkingHero } from "@/components/sections/wifi-networking/WifiNetworkingHero";
import { WifiNetworkingIntro } from "@/components/sections/wifi-networking/WifiNetworkingIntro";
import { WifiNetworkingTrust } from "@/components/sections/wifi-networking/WifiNetworkingTrust";
import { WifiNetworkingClients } from "@/components/sections/wifi-networking/WifiNetworkingClients";
import { WifiNetworkingCredentials } from "@/components/sections/wifi-networking/WifiNetworkingCredentials";
import { WifiNetworkingFeatures } from "@/components/sections/wifi-networking/WifiNetworkingFeatures";
import { WifiNetworkingComparison } from "@/components/sections/wifi-networking/WifiNetworkingComparison";
import { WifiNetworkingPartners } from "@/components/sections/wifi-networking/WifiNetworkingPartners";
import { WifiNetworkingExperienceCenters } from "@/components/sections/wifi-networking/WifiNetworkingExperienceCenters";
import { WifiNetworkingCTA } from "@/components/sections/wifi-networking/WifiNetworkingCTA";

export const metadata = {
  title: "Wi-Fi, Networking & Smart Home Control | AT Smart Living",
  description: "Power every smart device in your home with enterprise-grade Wi-Fi, reliable networking, and intuitive control interfaces.",
};

export default function WifiNetworkingPage() {
  return (
    <main className="w-full relative min-h-screen">
      <WifiNetworkingHero />
      <WifiNetworkingTrust />
      <WifiNetworkingClients />
      <WifiNetworkingCredentials />
      <WifiNetworkingIntro />
      <WifiNetworkingFeatures />
      <WifiNetworkingComparison />
      <WifiNetworkingPartners />
      <WifiNetworkingExperienceCenters />
      <WifiNetworkingCTA />
    </main>
  );
}
