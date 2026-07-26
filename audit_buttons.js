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
const regex = /<(?:Link|button|a)\s+[^>]*className=['"`][^>]*\b(px-\d+|py-\d+|bg-accent|bg-primary|rounded-full|hover:bg-accent)[^>]*['"`]/g;
let found = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    if (line.match(regex)) {
      console.log(`${file.replace(process.cwd(), '')}:${i + 1} -> ${line.trim()}`);
      found++;
    }
  });
});
console.log('Total matches found:', found);
