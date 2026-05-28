const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'public', 'assets', 'residential', 'project');

const mappings = {
  'anuj garg': 'delhi-residence',
  'mumbai_private_1': 'mumbai-residence-1',
  'mumbai_private_2': 'mumbai-residence-2'
};

for (const [oldName, newName] of Object.entries(mappings)) {
  const oldPath = path.join(baseDir, oldName);
  const newPath = path.join(baseDir, newName);
  
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed directory ${oldName} to ${newName}`);
    
    // Rename files inside
    const files = fs.readdirSync(newPath);
    let i = 1;
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      const newFileName = `${newName}-${i}${ext}`;
      fs.renameSync(path.join(newPath, file), path.join(newPath, newFileName));
      console.log(`  Renamed ${file} to ${newFileName}`);
      i++;
    }
  }
}
