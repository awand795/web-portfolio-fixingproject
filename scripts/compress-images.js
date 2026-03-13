import sharp from 'sharp';
import fs from 'fs-extra';
import { join } from 'path';

const { pathExists } = fs;

const IMAGE_DIR = './src/image';
const OUTPUT_DIR = './src/image';

// Image files to compress
const images = [
  { input: 'imgprofile.jpg', output: 'imgprofile.webp', width: 400, quality: 80 },
  { input: 'imgprofile.jpg', output: 'imgprofile-optimized.jpg', width: 400, quality: 80 },
  { input: 'profile.png', output: 'profile.webp', width: 400, quality: 80 },
  { input: 'profile-pic.png', output: 'profile-pic.webp', width: 400, quality: 80 },
  { input: 'reactLogo.png', output: 'reactLogo.webp', width: 100, quality: 80 },
  { input: 'js.png', output: 'js.webp', width: 100, quality: 80 },
  { input: 'mongoDbLogo.png', output: 'mongoDbLogo.webp', width: 100, quality: 80 },
  { input: 'dockerLogo.png', output: 'dockerLogo.webp', width: 100, quality: 80 },
  { input: 'nodeJsLogo.png', output: 'nodeJsLogo.webp', width: 100, quality: 80 },
  { input: 'bootstrap.png', output: 'bootstrap.webp', width: 100, quality: 80 },
  { input: 'expressjs.png', output: 'expressjs.webp', width: 100, quality: 80 },
];

async function compressImage({ input, output, width, quality }) {
  const inputPath = join(IMAGE_DIR, input);
  const outputPath = join(OUTPUT_DIR, output);
  
  try {
    await sharp(inputPath)
      .resize(width, width, { fit: 'inside', withoutEnlargement: true })
      .toFormat(output.endsWith('.webp') ? 'webp' : 'jpeg', { 
        quality,
        progressive: true 
      })
      .toFile(outputPath);
    
    console.log(`✓ Compressed: ${input} → ${output}`);
  } catch (error) {
    console.error(`✗ Error compressing ${input}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Starting image compression...\n');
  
  for (const img of images) {
    const inputPath = join(IMAGE_DIR, img.input);
    const exists = await pathExists(inputPath);
    if (exists) {
      await compressImage(img);
    } else {
      console.log(`⊘ Skipped: ${img.input} (not found)`);
    }
  }
  
  console.log('\n✅ Image compression complete!');
}

main().catch(console.error);
