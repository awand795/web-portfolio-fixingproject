# Awanda's Portfolio Website

A modern, responsive portfolio website built with React and Vite, showcasing my skills and projects as a Fullstack Developer.

![React](https://img.shields.io/badge/React-19.2.4-blue)
![Vite](https://img.shields.io/badge/Vite-6.3.5-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.0-cyan)
![PWA](https://img.shields.io/badge/PWA-Enabled-green)

## Features

- **Modern UI/UX** - Clean and professional design with smooth animations
- **Dark Mode** - Toggle between light and dark themes (persistent with localStorage)
- **Fully Responsive** - Optimized for mobile, tablet, and desktop
- **PWA Support** - Install as app on your device with offline support
- **Performance** - Built with Vite for lightning-fast development and builds
- **Accessible** - ARIA labels, skip link, and semantic HTML for better accessibility
- **SEO Optimized** - Meta tags, Open Graph, Twitter Cards, JSON-LD structured data
- **Multi-language** - English and Indonesian with extensible translation system

## Tech Stack

- **Frontend Framework:** React 19.2.4
- **Build Tool:** Vite 6.3.5
- **Styling:** Tailwind CSS 4.3.0
- **Animations:** Framer Motion 12.40.0
- **Icons:** Lucide React + Custom SVG Icons
- **Routing:** React Router DOM 7.13.1
- **SEO:** React Helmet Async
- **PWA:** vite-plugin-pwa 1.2.0 with Workbox

## Installation

1. Clone the repository:
```bash
git clone https://github.com/awand795/web-portfolio-fixingproject.git
cd web-portfolio-fixingproject
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Project Structure

```
web-portfolio-fixingproject/
├── public/
│   ├── favicon.svg
│   ├── manifest.json
│   ├── og-image.svg
│   └── files/
│       └── CV Fullstack Developer - Awanda.pdf
├── src/
│   ├── components/           # Extracted page sections
│   │   ├── BackToTop.tsx
│   │   ├── ContactSection.tsx
│   │   ├── HeroSection.tsx
│   │   └── SkillsSection.tsx
│   ├── Component/            # Reusable components
│   │   ├── LoadingSpinner.tsx
│   │   ├── Logo.tsx
│   │   ├── MyProject.tsx
│   │   ├── NavBar.tsx
│   │   ├── NotFound.tsx
│   │   ├── PWAInstallPrompt.tsx
│   │   └── ScrollToTop.tsx
│   ├── context/              # React context providers
│   ├── icons/                # Custom SVG icon components
│   ├── image/                # Images and logos
│   ├── socmedlink/           # Social media link-in-bio page
│   ├── translations/         # Multi-language support
│   ├── app.tsx               # Main landing page
│   ├── constants.ts          # Shared constants
│   ├── index.css             # Global styles (Tailwind v4)
│   ├── main.tsx              # React entry point
│   └── router.tsx            # Route configuration
├── index.html
├── package.json
├── vite.config.js
└── netlify.toml
```

## Key Features

### 1. SEO Enhancement
- Comprehensive meta tags (description, keywords, author)
- Open Graph tags for social media sharing
- Twitter Card meta tags
- JSON-LD structured data
- Sitemap and robots.txt

### 2. Accessibility
- Skip to main content link
- ARIA labels on all interactive elements
- Keyboard navigation support with focus trap on mobile menu
- Semantic HTML structure
- `prefers-reduced-motion` support
- Visible `:focus-visible` outlines

### 3. Performance
- Code splitting with React.lazy and Vite manual chunks
- WebP images with 99.3% size reduction
- IntersectionObserver-based scroll tracking
- CSS transitions over JS animations
- Lazy loading for images and videos
- PWA with Workbox runtime caching

### 4. PWA Capabilities
- Installable as a standalone app
- Offline support with service workers
- Custom manifest configuration
- App icons for all device sizes
- Runtime caching for fonts and CDN assets

### 5. User Experience
- Persistent Dark Mode with localStorage
- Responsive design for all screen sizes
- Smooth spring-based animations (Framer Motion)
- Typing effect on hero subtitle
- Mobile hamburger menu with focus trap
- Floating back-to-top button
- 404 Not Found page
- Language toggle visible on all viewports

### 6. Modern Practices
- Component modularity with extracted sections
- Data-driven project cards and social links
- React Context API for theme and language state
- TypeScript interfaces throughout
- React.memo on leaf components

## Customization

### Update Personal Information

Edit the hero section in `src/components/HeroSection.tsx`:
```tsx
<h1 className="font-display font-extrabold ...">Awanda</h1>
<p className="...">I code stuff. Web apps, Android apps...</p>
```

### Update Projects

Edit the `projects` array in `src/Component/MyProject.tsx`:
```tsx
const projects = [
    {
        id: 1,
        title: "Your Project",
        githubUrl: "https://github.com/yourusername/project",
        demoUrl: "https://your-demo.vercel.app",
        tags: ["React", "Node.js"]
    }
];
```

### Update Social Links

Edit the `socials` array in `src/components/ContactSection.tsx` or the `socialLinks` array in `src/socmedlink/socmed.tsx`.

### Add Translations

Add new language files in `src/translations/` and update `LanguageContext.tsx`:
```ts
// src/translations/es.ts
const es: Record<string, string> = {
  'hero.title': 'Desarrollador de Software',
  // ... other translations
};
export default es;
```

## Deployment

### Netlify (Recommended)

This project includes a `netlify.toml` configuration file for easy deployment:

1. Connect your GitHub repository to Netlify
2. Netlify will automatically detect Vite and use the correct build settings
3. Deploy!

Build settings (auto-detected):
- **Build command:** `npm run build`
- **Publish directory:** `dist/`

### Vercel
```bash
npm install -g vercel
vercel
```

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
3. Run: `npm run deploy`

## TODO / Future Improvements

- [ ] Add blog section
- [ ] Implement contact form with backend
- [ ] Fetch projects dynamically from GitHub API
- [ ] Add unit tests
- [ ] Add testimonial section

## Author

**Awanda**
- Website: [awanda.eu.org](https://awanda.eu.org)
- Email: awand795@gmail.com
- GitHub: [@awand795](https://github.com/awand795)
- LinkedIn: [/in/awanda](https://linkedin.com/in/awanda)

---

Made with ❤️ by Awanda
