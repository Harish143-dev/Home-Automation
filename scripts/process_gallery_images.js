const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Parveen\\Downloads\\website-20261116T162105Z-1-001\\website';
const destDir = path.join(process.cwd(), 'public', 'images', 'experience-center', 'gallery');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const filesMap = [
  { file: 'Delhi 1.JPG', name: 'delhi-living-room.webp', type: 'landscape', alt: 'Delhi Experience Centre - Living Room & Automation' },
  { file: 'Delhi 2 (1).jpg', name: 'delhi-bedroom-suite.webp', type: 'portrait', alt: 'Delhi Experience Centre - Automated Bedroom Suite' },
  { file: 'Delhi 3 (1).jpg', name: 'delhi-dining-bar.webp', type: 'square', alt: 'Delhi Experience Centre - Dining & Bar Controls' },
  { file: '1 mumbai.jpg', name: 'mumbai-lounge-skyline.webp', type: 'landscape', alt: 'Mumbai Experience Centre - Sea-Facing Living Lounge' },
  { file: '2 mumbai.jpg', name: 'mumbai-suite-interior.webp', type: 'portrait', alt: 'Mumbai Experience Centre - Master Suite Controls' },
  { file: '3 mumbai.jpg', name: 'mumbai-entertainment-zone.webp', type: 'landscape', alt: 'Mumbai Experience Centre - Entertainment & Lighting' },
  { file: 'MUMBAI.jpg', name: 'mumbai-theatre-lighting.webp', type: 'landscape', alt: 'Mumbai Experience Centre - Home Theatre & Audio' },
  { file: 'MUMBAI(1).jpg', name: 'mumbai-architectural-detail.webp', type: 'landscape', alt: 'Mumbai Experience Centre - Architectural Lighting' },
  { file: 'Bengaluru.jpg', name: 'bengaluru-patio-lounge.webp', type: 'landscape', alt: 'Bangalore Experience Centre - Patio & Living Space' },
  { file: 'Bengaluru(1).jpg', name: 'bengaluru-sound-room.webp', type: 'landscape', alt: 'Bangalore Experience Centre - High-Fidelity Sound Room' },
  { file: 'Bengaluru(2).jpg', name: 'bengaluru-dining-living.webp', type: 'landscape', alt: 'Bangalore Experience Centre - Dining & Ambient Lighting' },
];

async function processAll() {
  console.log('Processing and compressing Experience Centre Gallery images...');
  const results = [];

  for (const item of filesMap) {
    const srcPath = path.join(srcDir, item.file);
    const destPath = path.join(destDir, item.name);

    if (!fs.existsSync(srcPath)) {
      console.error(`Source not found: ${srcPath}`);
      continue;
    }

    const origSize = fs.statSync(srcPath).size / 1024 / 1024;
    const isPortrait = item.type === 'portrait';
    const maxDim = isPortrait ? 1280 : 1920;

    await sharp(srcPath)
      .resize({
        width: isPortrait ? maxDim : 1920,
        height: isPortrait ? 1920 : undefined,
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 82, effort: 6 })
      .toFile(destPath);

    const newSize = fs.statSync(destPath).size / 1024;
    console.log(`✓ ${item.name} (${item.type}): ${origSize.toFixed(1)}MB -> ${(newSize).toFixed(1)}KB`);

    results.push({
      id: `ec-${item.name.replace('.webp', '')}`,
      type: item.type,
      src: `/images/experience-center/gallery/${item.name}`,
      alt: item.alt
    });
  }

  console.log('\n--- JSON for ExperienceGallery.tsx ---');
  console.log(JSON.stringify(results, null, 2));
}

processAll().catch(console.error);

