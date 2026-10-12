const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    if (file === 'node_modules' || file === '.next' || file === 'backend' || file === '.git' || file === 'scratch') continue;

    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await processDirectory(fullPath);
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (ext === '.webp' || ext === '.webp' || ext === '.webp') {
        const webpPath = fullPath.replace(new RegExp(`${ext}$`, 'i'), '.webp');
        
        console.log(`Converting ${fullPath} to ${webpPath}...`);
        try {
          await sharp(fullPath)
            .webp({ quality: 80 })
            .toFile(webpPath);
            
          // Delete original file
          fs.unlinkSync(fullPath);
          console.log(`Deleted original: ${fullPath}`);
        } catch (err) {
          console.error(`Error processing ${fullPath}:`, err);
        }
      }
    }
  }
}

processDirectory(__dirname).then(() => {
  console.log('Conversion complete!');
});
