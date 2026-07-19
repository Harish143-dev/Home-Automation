"use client";

import { AudioVideoHero } from "../../components/sections/audio-video-automation/AudioVideoHero";
import { AudioVideoTrust } from "../../components/sections/audio-video-automation/AudioVideoTrust";
import { AudioVideoCredentials } from "../../components/sections/audio-video-automation/AudioVideoCredentials";
import { AudioVideoClients } from "../../components/sections/audio-video-automation/AudioVideoClients";
import { AudioVideoFeatures } from "../../components/sections/audio-video-automation/AudioVideoFeatures";
import { AudioVideoSystem } from "../../components/sections/audio-video-automation/AudioVideoSystem";
import { AudioVideoSolutions } from "../../components/sections/audio-video-automation/AudioVideoSolutions";
import { AudioVideoExperience } from "../../components/sections/audio-video-automation/AudioVideoExperience";
import { AudioVideoTech } from "../../components/sections/audio-video-automation/AudioVideoTech";
import { AudioVideoProcess } from "../../components/sections/audio-video-automation/AudioVideoProcess";
import { AudioVideoExperienceCenters } from "../../components/sections/audio-video-automation/AudioVideoExperienceCenters";
import { AudioVideoWhyChooseUs } from "../../components/sections/audio-video-automation/AudioVideoWhyChooseUs";
import { AudioVideoCTA } from "../../components/sections/audio-video-automation/AudioVideoCTA";

export default function AudioVideoAutomationPage() {
  return (
    <main className="relative bg-background">
      {/* Cinematic Hero */}
      <AudioVideoHero />

      {/* Prestigious Client Portfolio */}
      <AudioVideoClients />

      {/* Stats and Legacy */}
      <AudioVideoTrust />

      {/* Industry Accolades and Certificates */}
      <AudioVideoCredentials />

      {/* Effortless Entertainment Features */}
      <AudioVideoFeatures />

      {/* One System - House Illustration & Benefits */}
      <AudioVideoSystem />

      {/* Comprehensive Service Solutions */}
      <AudioVideoSolutions />

      {/* Everyday Living Experiences */}
      <AudioVideoExperience />

      {/* Audio & Video Technologies Accordion */}
      <AudioVideoTech />

      {/* Our Process Timeline */}
      <AudioVideoProcess />

      {/* Experience Centers */}
      <AudioVideoExperienceCenters />

      {/* Why Choose Us - Brand Statement */}
      <AudioVideoWhyChooseUs />

      {/* Final Call to Action */}
      <AudioVideoCTA />
    </main>
  );
}
