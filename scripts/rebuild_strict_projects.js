const fs = require('fs');
const path = require('path');

// Read PROJECTS_MASTER_DATA_UPDATED.md
const md = fs.readFileSync('PROJECTS_MASTER_DATA_UPDATED.md', 'utf8');
const lines = md.split('\n');

function cleanText(text) {
  if (!text) return '';
  let cleaned = text.replace(/\p{Extended_Pictographic}/gu, '');
  
  const replacements = [
    [/\bATPL\b/g, 'Atpl'],
    [/\bDALI\b/g, 'Dali'],
    [/\bHVAC\b/g, 'Hvac'],
    [/\bITC\b/g, 'Itc'],
    [/\bHITEC\b/g, 'Hitec'],
    [/\bQSX\b/g, 'Qsx'],
    [/\bQSM\b/g, 'Qsm'],
    [/\bQS\b/g, 'Qs'],
    [/\bAV\b/g, 'audio-video'],
    [/\bIOCL\b/g, 'Iocl'],
    [/\bBKT\b/g, 'Bkt'],
    [/\bTCS\b/g, 'Tcs'],
    [/\bMICE\b/g, 'corporate events'],
    [/\bIHG\b/g, 'Ihg'],
    [/\bDIN\b/g, 'Din'],
    [/\bIHCL\b/g, 'Ihcl'],
    [/\bLEED\b/g, 'Leed'],
    [/\bJC\b/g, 'Jc'],
    [/\bGRMS\b/g, 'Grms'],
    [/\bBMS\b/g, 'Bms'],
    [/\bELAN\b/g, 'Elan'],
    [/\bPSU\b/g, 'Psu'],
    [/\bMKT\b/g, 'Mkt'],
    [/\bUNICO\b/g, 'Unico'],
    [/\bNOX\b/g, 'Nox'],
    [/\bOKO\b/g, 'Oko'],
    [/\bBMW\b/g, 'Bmw'],
    [/\bANZ\b/g, 'Anz'],
    [/\bHSBC\b/g, 'Hsbc'],
    [/\bIIM\b/g, 'Iim'],
    [/\bIIT\b/g, 'Iit'],
    [/\bBIEC\b/g, 'Biec'],
    [/\bVIP\b/g, 'Vip'],
    [/\bNCR\b/g, 'Ncr'],
    [/\bAD100\b/g, 'Ad100']
  ];

  for (const [regex, rep] of replacements) {
    cleaned = cleaned.replace(regex, rep);
  }

  // Any remaining word of 2+ all-caps letters
  cleaned = cleaned.replace(/\b[A-Z]{2,}\b/g, (match) => {
    return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
  });

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
      (p.title.includes('Hsbc') && dirBasename === 'nvidia') ||
      (p.title.includes('J. M. Baxi') && dirBasename === 'iocl') ||
      (p.title.includes('Anz Operations') && dirBasename === 'barclays-bank-chennai') ||
      (p.title.includes('Serum Institute') && dirBasename === 'meta-office-gurgaon') ||
      (p.title.includes('Iim Ranchi') && dirBasename === 'ey-gurgaon') ||
      (p.title.includes('Iit Kanpur') && dirBasename === 'ey-gurgaon') ||
      (p.title.includes('Graphic Era') && dirBasename === 'wave-cinema') ||
      (p.title.includes('T3 Vip Lounge') && (dirBasename === 'goldendragon' || dirBasename === 'golden-dragon')) ||
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
console.log('Successfully wrote clean, emoji-free, normal-cased lib/projectsData.ts');
