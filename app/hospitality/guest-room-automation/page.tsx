import { GuestRoomHero } from "@/components/sections/guest-room/GuestRoomHero";
import { GuestRoomIntro } from "@/components/sections/guest-room/GuestRoomIntro";
import { GuestRoomFeatures } from "@/components/sections/guest-room/GuestRoomFeatures";
import { GuestRoomJourney } from "@/components/sections/guest-room/GuestRoomJourney";
import { GuestRoomWhyChooseUs } from "@/components/sections/guest-room/GuestRoomWhyChooseUs";
import { GuestRoomProjects } from "@/components/sections/guest-room/GuestRoomProjects";
import { GuestRoomProcess } from "@/components/sections/guest-room/GuestRoomProcess";
import { GuestRoomCTA } from "@/components/sections/guest-room/GuestRoomCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guest Room Automation & GRMS | AT Smart Living",
  description: "Deliver exceptional guest experiences while optimizing energy efficiency with intelligent guest room automation solutions designed for modern hospitality.",
};

export default function GuestRoomAutomationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      <GuestRoomHero />
      <GuestRoomIntro />
      <GuestRoomWhyChooseUs />
      <GuestRoomFeatures />
      <GuestRoomJourney />
      <GuestRoomProjects />
      <GuestRoomProcess />
      <GuestRoomCTA />
    </main>
  );
}
