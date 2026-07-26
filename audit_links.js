const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) { 
      results.push(file);
    }
  });
  return results;
}

const files = walk('./app').concat(walk('./components'));
const regex = /<Link\s+[^>]*className=['"`][^>]*\b(px-\d+|inline-flex|rounded-full|border border-border|bg-accent)[^>]*['"`]/g;
let found = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('buttonVariants')) return; // skip if it already uses the variants
  
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    if (line.match(regex)) {
      console.log(`${file.replace(process.cwd(), '')}:${i + 1} -> ${line.trim()}`);
      found++;
    }
  });
});
console.log('Total Link matches found:', found);
