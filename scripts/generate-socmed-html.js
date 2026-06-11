import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://awanda.eu.org';
const DIST_DIR = 'dist';

function generateSocmedHtml() {
  const indexPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('❌ dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  let html = fs.readFileSync(indexPath, 'utf8');

  // Single-line replacements
  const replacements = [
    [/<title>.*?<\/title>/s, `<title>Awanda — Social Links</title>`],
    [/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="Awanda — Social Links"`],
    [/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${SITE_URL}/socmed"`],
    [/<meta name="description" content="[^"]*"/, `<meta name="description" content="All my social media links in one place. Connect with Awanda on GitHub, LinkedIn, Instagram, Facebook, and more."`],
    [/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="Awanda — Social Links"`],
    [/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="Connect with me on GitHub, LinkedIn, Instagram, Facebook, and more."`],
    [/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${SITE_URL}/socmed"`],
    [/<meta property="og:type" content="website"/, `<meta property="og:type" content="profile"`],
  ];

  for (const [pattern, replacement] of replacements) {
    html = html.replace(pattern, replacement);
  }

  // Handle multiline og:description — content is on next line
  const ogDescMatch = html.match(
    /<meta property="og:description"[\s\S]*?content="[^"]*"/
  );
  if (ogDescMatch) {
    const newOgDesc = ogDescMatch[0].replace(
      /content="[^"]*"/,
      'content="Connect with me on GitHub, LinkedIn, Instagram, Facebook, and more."'
    );
    html = html.replace(ogDescMatch[0], newOgDesc);
  }

  const outputDir = path.join(DIST_DIR, 'socmed');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'index.html');
  fs.writeFileSync(outputPath, html, 'utf8');
  console.log(`✅ Social media OG page generated at ${outputPath}`);
}

generateSocmedHtml();
