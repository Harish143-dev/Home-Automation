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
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Fix z-[2] z-[2]
    content = content.replace(/z-\[2\] z-\[2\]/g, 'z-[2]');
    
    // Force standard section wrapper
    // Because they are so variable, let's just make sure the `bg-secondary` or `bg-black` is `bg-black`
    // and `py-16 md:py-24` is removed, since it's full screen and we anchor bottom.
    content = content.replace(/py-16 md:py-24 /g, '');
    content = content.replace(/bg-secondary/g, 'bg-black');
    content = content.replace(/justify-between/g, 'justify-end'); // to anchor bottom
    content = content.replace(/justify-center/g, 'justify-end'); // to anchor bottom

    fs.writeFileSync(fullPath, content, 'utf8');
  }
});
