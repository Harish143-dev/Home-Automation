const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('PROJECTS_MASTER_DATA_UPDATED.md', 'utf8');
const lines = content.split('\n');

const projects = [];
let currentCategory = 'Residential';
const seenSlugs = new Map();

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function getGalleryImages(mainImagePath) {
  const images = [mainImagePath];
  if (!mainImagePath.startsWith('/images/projects/')) return images;
  
  try {
    const fullMainPath = path.join('public', mainImagePath);
    const parentDir = path.dirname(fullMainPath);
    if (fs.existsSync(parentDir) && fs.statSync(parentDir).isDirectory()) {
      const files = fs.readdirSync(parentDir).filter(f => {
        const s = fs.statSync(path.join(parentDir, f));
        return !s.isDirectory() && /\.(jpg|jpeg|webp|avif|png|jfif)$/i.test(f);
      });
      // Sort files naturally
      files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
      const relParent = path.dirname(mainImagePath).replace(/\\/g, '/');
      const gallery = files.map(f => `${relParent}/${f}`);
      // Put main image first, then up to 4 more
      const unique = [mainImagePath, ...gallery.filter(img => img !== mainImagePath)].slice(0, 5);
      return unique;
    }
  } catch (e) {}
  return images;
}

for (const line of lines) {
  if (line.startsWith('## 1. Residential')) currentCategory = 'Residential';
  else if (line.startsWith('## 2. Hospitality')) currentCategory = 'Hospitality';
  else if (line.startsWith('## 3. Commercial')) currentCategory = 'Commercial';
  else if (line.startsWith('## 4. Restaurant')) currentCategory = 'Restaurant';
  
  if (line.startsWith('|') && !line.includes('| # |') && !line.includes('|---|')) {
    const parts = line.split('|').map(s => s.trim()).filter(Boolean);
    if (parts.length >= 4) {
      const title = parts[1].replace(/\*\*/g, '').trim();
      const type = parts[2].replace(/`/g, '').trim();
      const image = parts[3].replace(/`/g, '').trim();
      let description = (parts[4] || '').trim();
      if (description.startsWith('-') && description.endsWith('-')) {
        description = description.slice(1, -1);
      }
      if (description === '[Awaiting Description - Add your description here]') {
        description = `${title} automation and architectural integration delivered by ATPL.`;
      }
      
      let slug = slugify(title);
      if (seenSlugs.has(slug)) {
        const count = seenSlugs.get(slug) + 1;
        seenSlugs.set(slug, count);
        slug = `${slug}-${count}`;
      } else {
        seenSlugs.set(slug, 1);
      }

      const gallery = getGalleryImages(image);

      projects.push({
        id: `project-${projects.length + 1}`,
        slug,
        title,
        category: currentCategory,
        type: type || (currentCategory === 'Restaurant' ? 'Commercial' : currentCategory),
        image,
        images: gallery,
        description,
        date: 'Completed',
        readTime: '4 min read',
        href: `/projects/${slug}`
      });
    }
  }
}

console.log(`Parsed ${projects.length} projects successfully!`);

const output = `export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  type: string;
  image: string;
  images: string[];
  description: string;
  date: string;
  readTime: string;
  href: string;
}

export const PROJECTS_DATA: ProjectItem[] = ${JSON.stringify(projects, null, 2)};

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  const norm = slug.toLowerCase();
  return PROJECTS_DATA.find((p) => p.slug === norm || p.id === norm);
}

export function getFeaturedProjects(limit = 6): ProjectItem[] {
  return PROJECTS_DATA.slice(0, limit);
}

export function getProjectsByCategory(category: string): ProjectItem[] {
  if (!category || category === "All Projects") return PROJECTS_DATA;
  const norm = category.toLowerCase();
  return PROJECTS_DATA.filter((p) => p.category.toLowerCase() === norm || p.type.toLowerCase() === norm);
}
`;

fs.writeFileSync('lib/projectsData.ts', output, 'utf8');
console.log('lib/projectsData.ts written successfully!');

