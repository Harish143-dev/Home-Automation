const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('lib/projectsData.ts', 'utf8');
const match = content.match(/export const PROJECTS_DATA: ProjectItem\[\] = (\[[\s\S]*?\]);\n\nexport function/);
const projects = JSON.parse(match[1]);

console.log('=== FINAL INTEGRITY AUDIT ===');
console.log('Total projects in catalog:', projects.length);

let totalFiles = 0;
let crossBorrowed = 0;
let missingFiles = 0;

projects.forEach(p => {
  const baseDir = path.dirname(p.images[0]);
  p.images.forEach(img => {
    totalFiles++;
    if (path.dirname(img) !== baseDir) {
      crossBorrowed++;
      console.log('Cross borrow in:', p.title, img);
    }
    const full = path.join('public', img.replace(/^\//, ''));
    if (!fs.existsSync(full)) {
      missingFiles++;
      console.log('Missing file:', p.title, full);
    }
  });
});

console.log('Total image references:', totalFiles);
console.log('Cross-borrowed images detected:', crossBorrowed);
console.log('Missing files on disk:', missingFiles);

// Print samples from each category
const categories = ['Residential', 'Hospitality', 'Commercial', 'Restaurant'];
categories.forEach(cat => {
  console.log('\n--- Sample ' + cat + ' Projects ---');
  const catProjects = projects.filter(p => p.category.toLowerCase() === cat.toLowerCase());
  catProjects.slice(0, 3).forEach(p => {
    console.log('- ' + p.title + ' (' + p.images.length + ' image(s)):');
    console.log('  ' + JSON.stringify(p.images));
  });
});
