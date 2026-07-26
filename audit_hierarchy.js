const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'app');
const componentsDir = path.join(__dirname, 'components');

// Recursively find all page.tsx files
function findPages(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      findPages(fullPath, fileList);
    } else if (file === 'page.tsx') {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

// Recursively find all component files to build a map of ComponentName -> FilePath
function findComponents(dir, map = {}) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      findComponents(fullPath, map);
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      const componentName = file.replace(/\.tsx|\.jsx/, '');
      map[componentName] = fullPath;
    }
  }
  return map;
}

const componentMap = findComponents(componentsDir);

function extractHeadings(content) {
  // matches <h1... > text </h1> (multiline)
  const headings = [];
  const regex = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const level = match[1];
    let text = match[2].replace(/<[^>]+>/g, '').trim(); // strip inner tags
    text = text.replace(/\s+/g, ' '); // collapse whitespace
    headings.push({ level: parseInt(level), text });
  }
  return headings;
}

const pages = findPages(appDir);
let report = '# Heading Hierarchy Audit\n\n';

for (const page of pages) {
  const route = '/' + path.relative(appDir, page).replace(/\\/g, '/').replace(/\/page\.tsx$/, '').replace(/^page\.tsx$/, '');
  
  let pageContent = fs.readFileSync(page, 'utf8');
  
  // Extract custom components used in the page
  const componentRegex = /<([A-Z][a-zA-Z0-9]+)[^>]*\/?>/g;
  const usedComponents = [];
  let match;
  while ((match = componentRegex.exec(pageContent)) !== null) {
    usedComponents.push(match[1]);
  }

  // Extract raw HTML headings in the page itself
  const pageHeadings = extractHeadings(pageContent);
  
  report += `## Route: \`${route === '/' ? '/' : route}\`\n\n`;
  
  if (pageHeadings.length > 0) {
    report += `**Directly in page.tsx:**\n`;
    pageHeadings.forEach(h => {
      report += `- \`H${h.level}\`: ${h.text}\n`;
    });
  }

  // Iterate over used components
  for (const comp of usedComponents) {
    if (componentMap[comp]) {
      const compContent = fs.readFileSync(componentMap[comp], 'utf8');
      const compHeadings = extractHeadings(compContent);
      if (compHeadings.length > 0) {
        report += `**Component:** \`${comp}\`\n`;
        compHeadings.forEach(h => {
          report += `- \`H${h.level}\`: ${h.text}\n`;
        });
      }
    }
  }
  
  report += '\n---\n\n';
}

fs.writeFileSync(path.join(__dirname, 'hierarchy_audit.md'), report, 'utf8');
console.log('Audit complete. Saved to hierarchy_audit.md');
