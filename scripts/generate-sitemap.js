import fs from 'fs';
import path from 'path';

// Configuration
const SITE_URL = 'https://awanda.eu.org';
const OUTPUT_DIR = 'dist';
const OUTPUT_FILE = 'sitemap.xml';

// Define all routes in your application
const routes = [
  {
    url: '/',
    priority: 1.0,
    changefreq: 'monthly'
  },
  {
    url: '/socmed',
    priority: 0.7,
    changefreq: 'monthly'
  }
];

// Generate sitemap XML
function generateSitemap() {
  const sitemapHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  const sitemapFooter = `</urlset>`;

  const urls = routes.map(route => {
    return `
  <url>
    <loc>${SITE_URL}${route.url}</loc>
    <priority>${route.priority}</priority>
    <changefreq>${route.changefreq}</changefreq>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`;
  }).join('');

  const sitemap = `${sitemapHeader}${urls}
${sitemapFooter}`;

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Write sitemap.xml
  const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILE);
  fs.writeFileSync(outputPath, sitemap, 'utf8');

  console.log(`✅ Sitemap generated at ${outputPath}`);
  console.log(`📍 Total URLs: ${routes.length}`);
  routes.forEach(route => {
    console.log(`   - ${SITE_URL}${route.url} (priority: ${route.priority})`);
  });
}

generateSitemap();
