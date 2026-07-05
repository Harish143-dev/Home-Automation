import { Metadata } from "next";

import AboutHero from "@/components/sections/about/AboutHero";
import AboutTheCompany from "@/components/sections/about/AboutTheCompany";
import CompanyAtAGlance from "@/components/sections/about/CompanyAtAGlance";
import MissionVision from "@/components/sections/about/MissionVision";
import OurJourney from "@/components/sections/about/OurJourney";
import MeetOurFounders from "@/components/sections/about/MeetOurFounders";
import OurTeam from "@/components/sections/about/OurTeam";
import Awards from "@/components/sections/about/Awards";
import OurLocations from "@/components/sections/about/OurLocations";
import AboutCTA from "@/components/sections/about/AboutCTA";

export const metadata: Metadata = {
  title: "About Us | AT Smart Living",
  description: "We design intelligent living experiences. A cinematic architectural brand story of luxury smart automation and lighting control.",
};

export default function AboutPage() {
  return (
    <main className="relative bg-background text-foreground min-h-screen">
      <AboutHero />
      <AboutTheCompany />
      <CompanyAtAGlance />
      <MissionVision />
      <OurJourney />
      <MeetOurFounders />
      <OurTeam />
      <Awards />
      <OurLocations />
      <AboutCTA />
    </main>
  );
}
