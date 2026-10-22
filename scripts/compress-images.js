const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Disable internal Sharp caching so file descriptors are released immediately on Windows
sharp.cache(false);

const TARGET_DIRS = [
  path.join(__dirname, '..', 'public', 'images'),
  path.join(__dirname, '..', 'public', 'assets'),
  path.join(__dirname, '..', 'assets')
];

const VALID_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.jfif', '.avif']);

async function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next' && entry.name !== '.git' && entry.name !== 'heroFrames') {
        await getFiles(fullPath, files);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (VALID_EXTS.has(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

async function compressImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const stat = fs.statSync(filePath);
    const origSize = stat.size;

    // Skip already small files (< 60 KB)
    if (origSize < 60 * 1024) {
      return { filePath, status: 'skipped', origSize, newSize: origSize };
    }

    // Read into buffer to ensure no open file locks on Windows
    const inputBuffer = fs.readFileSync(filePath);
    const meta = await sharp(inputBuffer).metadata();

    // Resize if larger than 1920px in either dimension
    const needResize = (meta.width && meta.width > 1920) || (meta.height && meta.height > 1920);
    let transform = sharp(inputBuffer);
    if (needResize) {
      transform = transform.resize({
        width: meta.width > 1920 ? 1920 : undefined,
        height: meta.height > 1920 ? 1920 : undefined,
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    let buffer;
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.jfif') {
      buffer = await transform.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    } else if (ext === '.png') {
      buffer = await transform.png({ quality: 85, compressionLevel: 9 }).toBuffer();
    } else if (ext === '.webp') {
      buffer = await transform.webp({ quality: 82 }).toBuffer();
    } else if (ext === '.avif') {
      buffer = await transform.avif({ quality: 80 }).toBuffer();
    } else {
      return { filePath, status: 'skipped', origSize, newSize: origSize };
    }

    // Only overwrite if we achieved reduction
    if (buffer && buffer.length < origSize) {
      const tempPath = filePath + '.tmp_comp';
      fs.writeFileSync(tempPath, buffer);
      // Replace file atomically
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      fs.renameSync(tempPath, filePath);

      return {
        filePath,
        status: 'compressed',
        origSize,
        newSize: buffer.length,
        saved: origSize - buffer.length
      };
    } else {
      return { filePath, status: 'kept_original', origSize, newSize: origSize };
    }
  } catch (err) {
    return { filePath, status: 'error', error: err.message };
  }
}

async function main() {
  console.log('--- Starting Image Compression ---');
  let allFiles = [];
  for (const dir of TARGET_DIRS) {
    const files = await getFiles(dir);
    allFiles = allFiles.concat(files);
  }

  // Remove duplicates if any
  allFiles = Array.from(new Set(allFiles));
  console.log(`Found ${allFiles.length} images to inspect and compress...`);

  let totalOrigBytes = 0;
  let totalNewBytes = 0;
  let compressedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (let i = 0; i < allFiles.length; i++) {
    const file = allFiles[i];
    const res = await compressImage(file);

    if (res.status === 'compressed') {
      compressedCount++;
      totalOrigBytes += res.origSize;
      totalNewBytes += res.newSize;
      const pct = Math.round((1 - res.newSize / res.origSize) * 100);
      console.log(`[${i + 1}/${allFiles.length}] Compressed: ${path.basename(file)} (${Math.round(res.origSize / 1024)}KB -> ${Math.round(res.newSize / 1024)}KB, -${pct}%)`);
    } else if (res.status === 'error') {
      errorCount++;
      console.warn(`[${i + 1}/${allFiles.length}] Error on ${path.basename(file)}: ${res.error}`);
    } else {
      skippedCount++;
      totalOrigBytes += (res.origSize || 0);
      totalNewBytes += (res.newSize || 0);
    }
  }

  console.log('\n====================================');
  console.log('       Compression Finished         ');
  console.log('====================================');
  console.log(`Total images scanned: ${allFiles.length}`);
  console.log(`Successfully compressed: ${compressedCount}`);
  console.log(`Skipped / already optimal: ${skippedCount}`);
  console.log(`Errors: ${errorCount}`);
  const origMB = (totalOrigBytes / (1024 * 1024)).toFixed(2);
  const newMB = (totalNewBytes / (1024 * 1024)).toFixed(2);
  const savedMB = ((totalOrigBytes - totalNewBytes) / (1024 * 1024)).toFixed(2);
  const totalPct = totalOrigBytes > 0 ? Math.round((1 - totalNewBytes / totalOrigBytes) * 100) : 0;
  console.log(`Original size: ${origMB} MB`);
  console.log(`New size: ${newMB} MB`);
  console.log(`Net savings: ${savedMB} MB (-${totalPct}%)`);
}

main().catch(console.error);
