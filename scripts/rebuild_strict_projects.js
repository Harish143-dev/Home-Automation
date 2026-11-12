const fs = require('fs');
const path = require('path');

// Read PROJECTS_MASTER_DATA_UPDATED.md
const md = fs.readFileSync('PROJECTS_MASTER_DATA_UPDATED.md', 'utf8');
const lines = md.split('\n');

function cleanText(text) {
  if (!text) return '';
  let cleaned = text.replace(/\p{Extended_Pictographic}/gu, '');

  // 1. Convert any all-caps words of 2+ letters to Title Case first
  cleaned = cleaned.replace(/\b[A-Z]{2,}\b/g, (match) => {
    return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
  });

  // 2. Specific replacements & preservation rules
  const replacements = [
    [/\bATPL\b/gi, 'Atpl'],
    [/\bDALI\b/gi, 'Dali'],
    [/\bHVAC\b/gi, 'Hvac'],
    [/\bITC\b/gi, 'ITC'],       // Must be all caps
    [/\bItc\b/g, 'ITC'],        // Must be all caps
    [/\bJC\b/gi, 'JC'],         // Must be all caps
    [/\bJc\b/g, 'JC'],          // Must be all caps
    [/\bHITEC\b/gi, 'Hitec'],
    [/\bQSX\b/gi, 'Qsx'],
    [/\bQSM\b/gi, 'Qsm'],
    [/\bQS\b/gi, 'Qs'],
    [/\bAV\b/gi, 'audio-video'],
    [/\bIOCL\b/gi, 'Iocl'],
    [/\bBKT\b/gi, 'Bkt'],
    [/\bTCS\b/gi, 'Tcs'],
    [/\bMICE\b/gi, 'corporate events'],
    [/\bIHG\b/gi, 'Ihg'],
    [/\bDIN\b/gi, 'Din'],
    [/\bIHCL\b/gi, 'Ihcl'],
    [/\bLEED\b/gi, 'Leed'],
    [/\bGRMS\b/gi, 'Grms'],
    [/\bBMS\b/gi, 'Bms'],
    [/\bELAN\b/gi, 'Elan'],
    [/\bPSU\b/gi, 'Psu'],
    [/\bMKT\b/gi, 'Mkt'],
    [/\bUNICO\b/gi, 'Unico'],
    [/\bNOX\b/gi, 'Nox'],
    [/\bOKO\b/gi, 'Oko'],
    [/\bBMW\b/gi, 'Bmw'],
    [/\bANZ\b/gi, 'Anz'],
    [/\bHSBC\b/gi, 'Hsbc'],
    [/\bIIM\b/gi, 'Iim'],
    [/\bIIT\b/gi, 'Iit'],
    [/\bBIEC\b/gi, 'Biec'],
    [/\bVIP\b/gi, 'Vip'],
    [/\bNCR\b/gi, 'Ncr'],
    [/\bAD100\b/gi, 'Ad100'],
    [/\bPm Museum\b/gi, 'PM Museum'],
    [/\bPM museum\b/gi, 'PM Museum']
  ];

  for (const [regex, rep] of replacements) {
    cleaned = cleaned.replace(regex, rep);
  }

  cleaned = cleaned.replace(/\s{2,}/g, ' ').trim();
  cleaned = cleaned.replace(/\s+([.,;:])/g, '$1');
  return cleaned;
}

const projects = [];
lines.forEach(line => {
  const trimmed = line.trim();
  if (!trimmed.startsWith('|') || !/\|\s*\d+\s*\|/.test(trimmed)) return;
  
  const rawCols = trimmed.split('|');
  if (rawCols.length >= 5) {
    const num = rawCols[1].trim();
    const title = cleanText(rawCols[2].replace(/\*\*/g, '').trim());
    const type = rawCols[3].replace(/[`']/g, '').trim();
    const imagePath = rawCols[4].replace(/[`']/g, '').trim();
    const desc = cleanText(rawCols.slice(5, rawCols.length - 1).join('|').trim());
    projects.push({ num, title, type, imagePath, desc });
  }
});

console.log('Total parsed projects from master markdown:', projects.length);

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

const strictProjects = projects.map(p => {
  const slug = slugify(p.title);
  const cleanImagePath = p.imagePath;
  const localFile = path.join('public', cleanImagePath.replace(/^\//, ''));
  const localDir = path.dirname(localFile);
  
  let ownImages = [];
  
  if (fs.existsSync(localDir) && fs.statSync(localDir).isDirectory()) {
    const dirBasename = path.basename(localDir).toLowerCase();
    
    const isSharedGeneric = ['commercial', 'hospitality', 'residential', 'restaurant', 'projects'].includes(dirBasename);
    
    const isDifferentProject = 
      (p.title.includes('Dior') && dirBasename === 'ey-gurgaon') ||
      (p.title.includes('Louis Vuitton') && dirBasename === 'ey-gurgaon') ||
      (p.title.toLowerCase().includes('hsbc') && dirBasename === 'nvidia') ||
      (p.title.includes('J. M. Baxi') && dirBasename === 'iocl') ||
      (p.title.toLowerCase().includes('anz operations') && dirBasename === 'barclays-bank-chennai') ||
      (p.title.includes('Serum Institute') && dirBasename === 'meta-office-gurgaon') ||
      (p.title.toLowerCase().includes('iim ranchi') && dirBasename === 'ey-gurgaon') ||
      (p.title.toLowerCase().includes('iit kanpur') && dirBasename === 'ey-gurgaon') ||
      (p.title.includes('Graphic Era') && dirBasename === 'wave-cinema') ||
      (p.title.toLowerCase().includes('vip lounge') && (dirBasename === 'goldendragon' || dirBasename === 'golden-dragon')) ||
      (p.title.includes('Global Tech Expo') && dirBasename === 'ey-gurgaon') ||
      (p.title.includes('Luxury Auto Showcase') && dirBasename === 'nvidia') ||
      (p.title.includes('International Design Week') && dirBasename === 'meta-office-gurgaon') ||
      (p.title.includes('National Heritage Exhibition') && dirBasename === 'tiffany-mumbai') ||
      (p.title.includes('Rio Tinto') && dirBasename === 'ey-gurgaon') ||
      (p.title.includes('Lupin') && dirBasename === 'meta-office-gurgaon');

    if (!isSharedGeneric && !isDifferentProject) {
      const files = fs.readdirSync(localDir)
        .filter(f => !fs.statSync(path.join(localDir, f)).isDirectory() && /\.(jpg|jpeg|webp|avif|png|jfif)$/i.test(f));
      
      files.sort((a, b) => {
        const numA = parseInt(a.replace(/\D/g, ''), 10);
        const numB = parseInt(b.replace(/\D/g, ''), 10);
        if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
        return a.localeCompare(b);
      });

      const relDir = path.relative('public', localDir).replace(/\\/g, '/');
      ownImages = files.map(f => '/' + relDir + '/' + f);
    }
  }

  if (ownImages.length === 0) {
    ownImages = [cleanImagePath];
  }

  return {
    id: slug,
    slug: slug,
    title: p.title,
    category: p.type,
    image: ownImages[0],
    images: ownImages,
    description: p.desc
  };
});

console.log('Processed', strictProjects.length, 'projects.');

// Generate lib/projectsData.ts
const tsContent = `export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  images: string[];
  description: string;
}

export const PROJECTS_DATA: ProjectItem[] = ${JSON.stringify(strictProjects, null, 2)};

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  const normalized = slug.toLowerCase();
  return PROJECTS_DATA.find(
    (p) =>
      p.slug.toLowerCase() === normalized ||
      p.id.toLowerCase() === normalized ||
      p.title.toLowerCase().replace(/[^\\w\\s-]/g, '').replace(/\\s+/g, '-').trim() === normalized
  );
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS_DATA.map((p) => p.slug);
}
`;

fs.writeFileSync('lib/projectsData.ts', tsContent, 'utf8');
console.log('Successfully generated lib/projectsData.ts with ITC, JC, PM Museum caps.');
