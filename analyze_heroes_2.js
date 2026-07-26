const fs = require('fs');
const path = require('path');

const files = [
  'about/AboutHero.tsx',
  'audio-video-automation/AudioVideoHero.tsx',
  'careers/CareersHero.tsx',
  'curtain-automation/CurtainHero.tsx',
  'experience-center/ExperienceHero.tsx',
  'hospitality/HospitalityHero.tsx',
  'lighting/LightingHero.tsx',
  'mdu-automation/MduHero.tsx',
  'commercial/CommercialHero.tsx',
  'contact/ContactHero.tsx',
  'residential/ResidentialHero.tsx'
];

const basePath = path.join(__dirname, 'components/sections');

files.forEach(file => {
  const fullPath = path.join(basePath, file);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    
    const hasUseGSAP = content.includes('useGSAP');
    const hasNextImage = content.includes('<NextImage') || content.includes('<Image');
    
    const gradientOverlay = (content.match(/bg-gradient-[^"']+/) || [])[0] || 'NONE';
    const flatOverlay = (content.match(/bg-black\/\d+/) || [])[0] || 'NONE';
    
    // get top level wrapper (the very first tag after return)
    const wrapperMatch = content.split('return (')[1].match(/<([a-zA-Z0-9]+)[^>]*className=["']([^"']+)["']/);
    const wrapperTag = wrapperMatch ? wrapperMatch[1] : 'NONE';
    const wrapperClass = wrapperMatch ? wrapperMatch[2] : 'NONE';

    console.log(`\n--- ${file} ---`);
    console.log(`Top Wrapper: <${wrapperTag} className="${wrapperClass}">`);
    console.log(`useGSAP: ${hasUseGSAP}`);
    console.log(`Overlays: ${gradientOverlay} / ${flatOverlay}`);
  }
});
