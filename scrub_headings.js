const fs = require('fs');
const path = require('path');

const targetDirs = ['app', 'components'];
const basePath = __dirname;

const classesToRemove = [
  'text-4xl', 'sm:text-5xl', 'lg:text-6xl',
  'text-3xl', 'sm:text-4xl', 'lg:text-5xl',
  'text-xl', 'sm:text-2xl', 'lg:text-3xl',
  'text-lg', 'sm:text-xl', 'lg:text-2xl',
  'text-xs', 'sm:text-sm', 'md:text-base',
  'font-light', 'font-normal',
  'leading-[1.1]', 'leading-[1.2]',
  'tracking-wide', 'tracking-[0.1em]'
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Regex to match opening h1-h5 tags and capture their className
  // e.g. <h2 className="text-3xl font-light text-white mb-4">
  // We use a regex replacement function to process the className string
  const headingRegex = /(<h[1-5][^>]*className=["'])([^"']*)(["'][^>]*>)/g;

  content = content.replace(headingRegex, (match, prefix, classString, suffix) => {
    let classes = classString.split(/\s+/);
    
    // Filter out the repetitive classes
    classes = classes.filter(c => !classesToRemove.includes(c));

    // Join back, trim extra spaces
    const newClassString = classes.join(' ').trim();

    // If newClassString is empty, we might leave className="", which is harmless
    // or we can completely omit it if we want, but keeping it empty is simpler and safe
    return `${prefix}${newClassString}${suffix}`;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${path.relative(basePath, filePath)}`);
  }
}

function traverseDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      traverseDir(fullPath);
    } else if (file.endsWith('.tsx')) {
      processFile(fullPath);
    }
  }
}

targetDirs.forEach(dir => {
  const fullPath = path.join(basePath, dir);
  if (fs.existsSync(fullPath)) {
    traverseDir(fullPath);
  }
});

console.log("Global scrub complete.");
