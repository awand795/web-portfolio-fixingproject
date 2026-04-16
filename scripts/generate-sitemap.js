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
}

// Copy robots.txt to dist
function generateRobotsTxt() {
  const robotsContent = `# robots.txt for Awanda Portfolio
User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  const robotsPath = path.join(OUTPUT_DIR, 'robots.txt');
  fs.writeFileSync(robotsPath, robotsContent, 'utf8');
  console.log(`✅ robots.txt generated at ${robotsPath}`);
}

// Generate _redirects file for Netlify
function generateNetlifyRedirects() {
  const redirectsContent = `# Netlify redirects file
/sitemap.xml    /sitemap.xml    200!
/robots.txt     /robots.txt     200!

# React Router SPA fallback
/*    /index.html    200
`;

  const redirectsPath = path.join(OUTPUT_DIR, '_redirects');
  fs.writeFileSync(redirectsPath, redirectsContent, 'utf8');
  console.log(`✅ _redirects generated at ${redirectsPath}`);
}

// Generate _headers file for Netlify
function generateNetlifyHeaders() {
  const headersContent = `/sitemap.xml
  Content-Type: application/xml; charset=UTF-8
  X-Content-Type-Options: nosniff
  Cache-Control: public, max-age=0, must-revalidate

/robots.txt
  Content-Type: text/plain; charset=UTF-8
  Cache-Control: public, max-age=0, must-revalidate
`;

  const headersPath = path.join(OUTPUT_DIR, '_headers');
  fs.writeFileSync(headersPath, headersContent, 'utf8');
  console.log(`✅ _headers generated at ${headersPath}`);
}

generateSitemap();
generateRobotsTxt();
generateNetlifyRedirects();
generateNetlifyHeaders();
