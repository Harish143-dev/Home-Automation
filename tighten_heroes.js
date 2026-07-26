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
    
    // Remove gap-5 sm:gap-7 from the flex container holding the text
    content = content.replace(/gap-5 sm:gap-7/g, '');
    content = content.replace(/gap-6/g, ''); // just in case
    
    // Remove bottom margins from typography
    content = content.replace(/mb-6/g, 'mb-2');
    content = content.replace(/mb-8/g, 'mb-2');
    content = content.replace(/mb-10/g, 'mb-4');
    content = content.replace(/mb-12/g, 'mb-4');

    // Make sure the main content is anchored at the bottom
    content = content.replace(/pb-\[8vh\] sm:pb-\[12vh\]/g, 'pb-12 md:pb-16 lg:pb-20');
    // Ensure the container is bottom-left aligned
    // The container is `flex flex-col items-start text-left` which is already bottom-left because of `justify-end` on parent.
    // Let's verify `justify-end` is there.
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
