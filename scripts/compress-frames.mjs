import sharp from "sharp";
import { readdir, stat, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const DIR = "public/heroFrames";
const OUT_DIR = "public/heroFrames_compressed";
const QUALITY = 65;

if (!existsSync(OUT_DIR)) {
  await mkdir(OUT_DIR, { recursive: true });
}

const files = (await readdir(DIR)).filter((f) => f.endsWith(".webp")).sort();

console.log(`Compressing ${files.length} frames at quality ${QUALITY} (no resize)...\n`);

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const filePath = join(DIR, file);
  const outPath = join(OUT_DIR, file);
  const before = (await stat(filePath)).size;
  totalBefore += before;

  // Read and compress directly to outPath
  const info = await sharp(filePath)
    .webp({ quality: QUALITY, effort: 4 })
    .toFile(outPath);

  totalAfter += info.size;

  const pct = ((1 - info.size / before) * 100).toFixed(1);
  process.stdout.write(`  ${file}: ${(before / 1024).toFixed(0)}KB → ${(info.size / 1024).toFixed(0)}KB (-${pct}%)\n`);
}

const savedMB = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(1);
const pctTotal = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
console.log(`\nDone! ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB  (saved ${savedMB}MB, -${pctTotal}%)`);
