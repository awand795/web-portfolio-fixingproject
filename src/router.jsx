import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from './Component/LoadingSpinner';
import ScrollToTop from './Component/ScrollToTop';

const App = lazy(() => import('./app'));
const Socmed = lazy(() => import('./socmedlink/socmed'));
const NotFound = lazy(() => import('./Component/NotFound'));

// Static files content
const SitemapXML = () => {
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://awanda.eu.org/</loc>
    <priority>1.0</priority>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://awanda.eu.org/socmed</loc>
    <priority>0.7</priority>
    <changefreq>monthly</changefreq>
  </url>
</urlset>`;
  
  return (
    <pre style={{ whiteSpace: 'pre-wrap', margin: 0, padding: 0 }}>
      {sitemapContent}
    </pre>
  );
};

const RobotsTXT = () => {
  const robotsContent = `# robots.txt for Awanda Portfolio
# https://awanda.eu.org

User-agent: *
Allow: /

# Sitemap location
Sitemap: https://awanda.eu.org/sitemap.xml`;
  
  return (
    <pre style={{ whiteSpace: 'pre-wrap', margin: 0, padding: 0 }}>
      {robotsContent}
    </pre>
  );
};

const Router = () => {
    return (
      <div className="App">
        <ScrollToTop />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route exact path='/' element={<App/>}/>
            <Route path='/socmed' element={<Socmed/>}/>
            <Route path='/sitemap.xml' element={<SitemapXML/>}/>
            <Route path='/robots.txt' element={<RobotsTXT/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </Suspense>
      </div>
    );
  }

export default Router;
