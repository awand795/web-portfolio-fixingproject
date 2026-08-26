import fs from 'fs';
import path from 'path';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;

// Configuration
const SITE_URL = 'https://awanda.eu.org';
const OUTPUT_DIR = 'dist';
const OUTPUT_FILE = 'sitemap.xml';

// Base static routes
const staticRoutes = [
  {
    url: '/',
    priority: '1.0',
    changefreq: 'weekly'
  },
  {
    url: '/blog',
    priority: '0.9',
    changefreq: 'daily'
  },
  {
    url: '/socmed',
    priority: '0.7',
    changefreq: 'monthly'
  }
];

// Fallback posts if database is not reachable during build
const fallbackPosts = [
  {
    slug: 'membangun-web-portofolio-modern-react-netlify',
    title: 'Arsitektur Web Portofolio Modern: Bedah Kinerja React 19, Tailwind CSS & Jamstack',
    summary: 'Bedah arsitektur dan prinsip rekayasa di balik web portofolio modern: mulai dari optimasi Core Web Vitals, dynamic code splitting, hingga integrasi CMS mandiri.',
    created_at: new Date().toISOString()
  },
  {
    slug: 'integrasi-database-aiven-postgresql-netlify-serverless',
    title: 'Panduan Praktis: Mengintegrasikan PostgreSQL Aiven dengan Netlify Serverless Functions',
    summary: 'Panduan teknis mendalam arsitektur data cloud: mitigasi connection exhaustion di serverless, enkripsi SSL/TLS, keamanan otentikasi JWT, dan otomatisasi 24/7 Keep-Alive.',
    created_at: new Date().toISOString()
  }
];

async function fetchDynamicPosts() {
  const dbHost = process.env.DB_HOST;
  const dbPassword = process.env.DB_PASSWORD;

  if (!dbHost || !dbPassword) {
    return fallbackPosts;
  }

  const client = new Client({
    host: dbHost,
    port: parseInt(process.env.DB_PORT || '25789', 10),
    user: process.env.DB_USER || 'avnadmin',
    password: dbPassword,
    database: process.env.DB_NAME || 'defaultdb',
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000
  });

  try {
    await client.connect();
    const res = await client.query('SELECT slug, title, summary, created_at FROM posts WHERE published = true ORDER BY created_at DESC');
    await client.end();
    return res.rows.length > 0 ? res.rows : fallbackPosts;
  } catch (err) {
    console.warn('⚠️ Could not connect to database for dynamic sitemap during build, using fallback posts list.');
    return fallbackPosts;
  }
}

// Generate sitemap XML
async function generateSitemap(posts) {
  const sitemapHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  const sitemapFooter = `</urlset>`;

  const staticUrls = staticRoutes.map(route => {
    return `
  <url>
    <loc>${SITE_URL}${route.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  }).join('');

  const dynamicUrls = posts.map(post => {
    const lastmod = post.created_at ? new Date(post.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    return `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join('');

  const sitemap = `${sitemapHeader}${staticUrls}${dynamicUrls}
${sitemapFooter}`;

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Write sitemap.xml
  const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILE);
  fs.writeFileSync(outputPath, sitemap, 'utf8');

  console.log(`✅ Sitemap generated at ${outputPath} with ${staticRoutes.length + posts.length} URLs`);
}

// Generate RSS 2.0 Feed
function generateRssFeed(posts) {
  const rssItems = posts.map(post => {
    const pubDate = post.created_at ? new Date(post.created_at).toUTCString() : new Date().toUTCString();
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description><![CDATA[${post.summary || post.title}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>awand795@gmail.com (Awanda)</author>
    </item>`;
  }).join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Awanda Journal — Software Engineering &amp; Insights</title>
    <link>${SITE_URL}/blog</link>
    <description>Catatan teknis, arsitektur sistem, fullstack web development, dan database cloud oleh Awanda, Software Engineer.</description>
    <language>id-ID</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  const rssPath = path.join(OUTPUT_DIR, 'rss.xml');
  const feedPath = path.join(OUTPUT_DIR, 'feed.xml');
  fs.writeFileSync(rssPath, rssFeed, 'utf8');
  fs.writeFileSync(feedPath, rssFeed, 'utf8');
  console.log(`✅ RSS Feed generated at ${rssPath}`);
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
/api/*    /.netlify/functions/api/:splat    200!

# Social media page (OG tags for crawlers)
/socmed    /socmed/index.html    200

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

/rss.xml
  Content-Type: application/rss+xml; charset=UTF-8
  X-Content-Type-Options: nosniff
  Cache-Control: public, max-age=0, must-revalidate

/feed.xml
  Content-Type: application/rss+xml; charset=UTF-8
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

async function run() {
  const posts = await fetchDynamicPosts();
  await generateSitemap(posts);
  generateRssFeed(posts);
  generateRobotsTxt();
  generateNetlifyRedirects();
  generateNetlifyHeaders();
}

run();
