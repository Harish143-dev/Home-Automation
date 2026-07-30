const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Harish\\Documents\\Harish\\My Projects\\HA\\smarthome-os\\components\\sections\\public-areas';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const classesToRemove = [
  'uppercase',
  'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl',
  'sm:text-xs', 'sm:text-sm', 'sm:text-base', 'sm:text-lg', 'sm:text-xl', 'sm:text-2xl', 'sm:text-3xl', 'sm:text-4xl', 'sm:text-5xl', 'sm:text-6xl',
  'md:text-xs', 'md:text-sm', 'md:text-base', 'md:text-lg', 'md:text-xl', 'md:text-2xl', 'md:text-3xl', 'md:text-4xl', 'md:text-5xl', 'md:text-6xl',
  'lg:text-xs', 'lg:text-sm', 'lg:text-base', 'lg:text-lg', 'lg:text-xl', 'lg:text-2xl', 'lg:text-3xl', 'lg:text-4xl', 'lg:text-5xl', 'lg:text-6xl',
  'font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold',
  'tracking-tighter', 'tracking-tight', 'tracking-normal', 'tracking-wide', 'tracking-widest',
  'tracking-\\[0\\.1em\\]', 'tracking-\\[0\\.2em\\]', 'tracking-\\[0\\.3em\\]'
];

const classRegex = new RegExp(`\\b(${classesToRemove.join('|')})\\b\\s*`, 'g');

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Strip uppercase from all span eyebrows and h5 elements
  content = content.replace(/(<span[^>]*className="[^"]*)uppercase([^"]*">)/g, (match, p1, p2) => {
    return p1 + p2.replace(/\s+/g, ' ');
  });

  // Remove all heading hardcoded classes for h2, h3, h4, h5
  content = content.replace(/<(h[1-6])([^>]*)className="([^"]*)"([^>]*)>/g, (match, tag, before, className, after) => {
    let newClassName = className.replace(classRegex, ' ').replace(/\s+/g, ' ').trim();
    if (newClassName) {
      return `<${tag}${before}className="${newClassName}"${after}>`;
    } else {
      return `<${tag}${before}${after}>`;
    }
  });
  
  content = content.replace(/className="\s+/g, 'className="').replace(/\s+"/g, '"');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed ${file}`);
});
