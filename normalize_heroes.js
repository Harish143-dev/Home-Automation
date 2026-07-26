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
    
    // 1. Fix H1 classes
    content = content.replace(/(<h1[^>]*className=["'])([^"']+)["']/g, (match, prefix, classes) => {
      // clean up duplicates and set standard
      return `${prefix}hero-element text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] tracking-wide text-white text-balance mb-6"`;
    });

    // 2. Fix Subtext (p) classes
    content = content.replace(/(<p[^>]*className=["'])([^"']+)["']/g, (match, prefix, classes) => {
      // standard subtext
      return `${prefix}hero-element text-sm md:text-base lg:text-lg text-white/80 font-light tracking-wide leading-relaxed max-w-2xl text-balance mb-10"`;
    });

    // 3. Fix Gradients
    content = content.replace(/bg-gradient-to-[a-z]\s+from-[^\s]+\s+via-[^\s]+\s+to-[^\s"]+/g, 'bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[2]');
    // Also remove secondary flat overlays if they exist next to gradients
    content = content.replace(/<div className="absolute inset-0 bg-black\/\d+" \/>/g, '');

    // 4. Wrapper Standardization
    // This is trickier. Let's find the outermost section/header/div that contains the background image and standardise it.
    // Actually, it's safer to just replace `h-screen`, `min-h-screen`, `h-[100svh]` logic.
    content = content.replace(/h-screen|min-h-screen|h-\[100svh\]/g, 'h-[100svh]');
    content = content.replace(/min-h-\[600px\]|min-h-\[800px\]/g, 'min-h-[600px]');
    
    // 5. Ensure "hero-element" is on eyebrow (spans with tracking)
    content = content.replace(/(<span[^>]*className=["'])([^"']*tracking-\[0\.3em\][^"']*)["']/g, (match, prefix, classes) => {
      if (!classes.includes('hero-element')) {
        return `${prefix}hero-element block text-[10px] sm:text-xs tracking-[0.3em] text-accent uppercase mb-4"`;
      }
      return match;
    });

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
