const fs = require('fs');
const path = require('path');

function replaceExtensions(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.next' || file === 'backend' || file === '.git' || file === 'scratch') continue;
    
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceExtensions(fullPath);
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (['.ts', '.tsx', '.js', '.json'].includes(ext)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        // Replace .jpg, .jpeg, .png with .webp (case insensitive), only when immediately followed by a quote or backtick
        // But also we need to handle cases where it's not followed by a quote, maybe it's just in a string.
        const updated = content.replace(/\.(jpg|jpeg|png)(["'`])/gi, '.webp$2');
        if (content !== updated) {
          fs.writeFileSync(fullPath, updated, 'utf8');
          console.log(`Updated references in ${fullPath}`);
        }
      }
    }
  }
}

replaceExtensions(__dirname);
console.log('Text replacement complete!');
