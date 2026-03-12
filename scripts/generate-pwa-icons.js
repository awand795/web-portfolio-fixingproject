import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// SVG content for PWA icon (simplified version)
const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#667eea"/>
      <stop offset="100%" stop-color="#764ba2"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#g)"/>
  <text x="256" y="368" font-family="Arial,sans-serif" font-size="320" font-weight="bold" fill="white" text-anchor="middle">A</text>
</svg>
`;

async function generateIcons() {
  try {
    // Create buffer from SVG
    const svgBuffer = Buffer.from(svgContent);
    
    // Generate 192x192 PNG
    await sharp(svgBuffer)
      .resize(192, 192)
      .png()
      .toFile(join(publicDir, 'pwa-192x192.png'));
    
    console.log('✓ Generated pwa-192x192.png');
    
    // Generate 512x512 PNG
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(join(publicDir, 'pwa-512x512.png'));
    
    console.log('✓ Generated pwa-512x512.png');
    
    console.log('\n✅ PWA icons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating icons:', error.message);
    process.exit(1);
  }
}

generateIcons();
