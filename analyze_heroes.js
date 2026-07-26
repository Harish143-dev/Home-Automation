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
    
    // Extract section className
    const sectionMatch = content.match(/<section[^>]*className=["']([^"']+)["']/);
    const sectionClass = sectionMatch ? sectionMatch[1] : 'NOT FOUND';
    
    // Extract h1 className
    const h1Match = content.match(/<h1[^>]*className=["']([^"']+)["']/);
    const h1Class = h1Match ? h1Match[1] : 'NOT FOUND';
    
    // Extract eyebrow span className (usually just before h1)
    const spanMatch = content.match(/<span[^>]*className=["']([^"']+)["'][^>]*>(?![^<]*<h1)/i); // naive but maybe works
    
    // Instead of regex for span, just get the first span inside the text container
    const allSpans = content.match(/<span[^>]*className=["']([^"']+)["']/g);
    let eyebrowClass = 'NOT FOUND';
    if(allSpans) {
       for(let s of allSpans) {
         if(s.includes('tracking') && !s.includes('sr-only')) {
           const m = s.match(/className=["']([^"']+)["']/);
           if(m) eyebrowClass = m[1];
           break;
         }
       }
    }

    // Extract p className (usually after h1)
    const pMatch = content.match(/<p[^>]*className=["']([^"']+)["']/);
    const pClass = pMatch ? pMatch[1] : 'NOT FOUND';

    console.log(`\n--- ${file} ---`);
    console.log(`Section : ${sectionClass.substring(0, 80)}...`);
    console.log(`H1      : ${h1Class}`);
    console.log(`Eyebrow : ${eyebrowClass}`);
    console.log(`Subtext : ${pClass}`);
  }
});
