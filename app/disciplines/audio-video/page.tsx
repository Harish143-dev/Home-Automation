import type { Metadata } from "next";
import AudioVideoHero from "@/components/sections/disciplines/AudioVideoHero";
import { AudioVideoTrust } from "@/components/sections/disciplines/AudioVideoTrust";
import { AudioVideoClients } from "@/components/sections/disciplines/AudioVideoClients";
import { AudioVideoCredentials } from "@/components/sections/disciplines/AudioVideoCredentials";
import { AudioVideoSystem } from "@/components/sections/disciplines/AudioVideoSystem";
import { AudioVideoSolutions } from "@/components/sections/disciplines/AudioVideoSolutions";
import { AudioVideoEnvironments } from "@/components/sections/disciplines/AudioVideoEnvironments";
import { AudioVideoSpaces } from "@/components/sections/disciplines/AudioVideoSpaces";
import { AudioVideoControl } from "@/components/sections/disciplines/AudioVideoControl";
import { AudioVideoProcess } from "@/components/sections/disciplines/AudioVideoProcess";
import { AudioVideoWhyChooseUs } from "@/components/sections/disciplines/AudioVideoWhyChooseUs";
import { AudioVideoCTA } from "@/components/sections/disciplines/AudioVideoCTA";

export const metadata: Metadata = {
  title: "Audio Video Automation & Integration | AT Smart Living",
  description: "Seamlessly integrate audio, video, entertainment, communication, and control systems into intelligent environments designed for effortless operation, exceptional experiences, and reliable performance.",
};

export default function AudioVideoPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      <AudioVideoHero />
      <AudioVideoTrust />
      <AudioVideoClients />
      <AudioVideoCredentials />
      <AudioVideoSystem />
      <AudioVideoSolutions />
      <AudioVideoEnvironments />
      <AudioVideoSpaces />
      <AudioVideoControl />
      <AudioVideoProcess />
      <AudioVideoWhyChooseUs />
      <AudioVideoCTA />
    </main>
  );
}
