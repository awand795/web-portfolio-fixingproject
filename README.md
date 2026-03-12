# 🌟 Awanda's Portfolio Website

A modern, responsive portfolio website built with React and Vite, showcasing my skills and projects as a Fullstack JavaScript Developer.

![React](https://img.shields.io/badge/React-19.2.4-blue)
![Vite](https://img.shields.io/badge/Vite-6.3.5-purple)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-violet)
![PWA](https://img.shields.io/badge/PWA-Enabled-green)

## ✨ Features

- 🎨 **Modern UI/UX** - Clean and professional design with smooth animations
- 🌓 **Dark Mode** - Toggle between light and dark themes (persistent with localStorage)
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 📲 **PWA Support** - Install as app on your device with offline support
- 🚀 **Performance** - Built with Vite for lightning-fast development and builds
- ♿ **Accessible** - ARIA labels and semantic HTML for better accessibility
- 🔍 **SEO Optimized** - Meta tags for better search engine visibility
- 🌐 **Multi-language Ready** - Translation support structure in place

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.2.4
- **Build Tool:** Vite 6.3.5
- **Styling:** Bootstrap 5.3.3 + React Bootstrap 2.10.10
- **Animations:** Framer Motion 12.35.2
- **Icons:** Bootstrap Icons 1.11.3
- **Routing:** React Router DOM 7.13.1
- **Scroll:** React Scroll 1.9.3
- **Intersection Observer:** React Intersection Observer 9.16.0
- **PWA:** vite-plugin-pwa 1.2.0

## 📦 Installation

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

## 📁 Project Structure

```
web-portfolio-fixingproject/
├── public/
│   ├── favicon.svg
│   ├── manifest.json
│   ├── og-image.svg
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   └── vite.svg
├── src/
│   ├── assets/              # Static assets
│   ├── Component/
│   │   ├── animate/
│   │   │   ├── FadeFromSide.jsx
│   │   │   └── FadeInWhenVisible.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── MyProject.jsx
│   │   ├── NavBar.jsx
│   │   ├── NotFound.jsx
│   │   ├── PWAInstallPrompt.jsx
│   │   └── ScrollToTop.jsx
│   ├── context/             # React context providers
│   ├── image/               # Images and logos
│   ├── socmedlink/
│   │   ├── socmed.css
│   │   └── socmed.jsx
│   ├── translations/        # Multi-language support
│   ├── App.css
│   ├── app.jsx
│   ├── index.css
│   ├── main.jsx
│   └── router.jsx
├── index.html
├── package.json
├── vite.config.js
└── netlify.toml
```

## 🎯 Key Features

### 1. **SEO Enhancement**
- Comprehensive meta tags (description, keywords, author)
- Open Graph tags for social media sharing
- Twitter Card meta tags
- Optimized page title with keywords

### 2. **Accessibility**
- Descriptive alt text for all images
- ARIA labels for links and buttons
- Keyboard navigation support
- Semantic HTML structure

### 3. **Performance**
- Optimized image loading with preconnect
- Hover transitions for better UX
- Lazy loading with Framer Motion
- Code splitting with Vite

### 4. **PWA Capabilities**
- Installable as a standalone app
- Offline support with service workers
- Custom manifest configuration
- App icons for all device sizes
- Runtime caching for fonts and CDN assets

### 5. **User Experience**
- **Persistent Dark Mode** - Theme preference saved in localStorage
- Responsive design for all screen sizes
- Smooth animations and transitions
- Better mobile navigation
- Loading spinner for better feedback
- Scroll to top functionality
- 404 Not Found page

### 6. **Modern Practices**
- Component modularity with reusable components
- Data separation (projects array, social links array)
- React Router for navigation
- Context API for state management
- Improved code organization

## 🎨 Customization

### Update Personal Information

Edit the data in `src/app.jsx`:
```jsx
<p className="h1 fw-bold fs-1">Hello I'm Awanda</p>
<p className="text fs-5 text-justify mx-4 mt-4">Your bio here...</p>
```

### Update Projects

Edit the `projects` array in `src/Component/MyProject.jsx`:
```jsx
const projects = [
    {
        id: 1,
        title: "Your Project",
        description: "Project description",
        githubUrl: "https://github.com/yourusername/project",
        tags: ["React", "Node.js"]
    }
];
```

### Update Social Links

Edit the `socialLinks` array in `src/socmedlink/socmed.jsx`:
```jsx
const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com/yourprofile', icon: 'bi-facebook', className: 'btn-fb' }
];
```

### Add Translations

Add new language files in `src/translations/`:
```js
// src/translations/es.js
export default {
  greeting: "Hola, soy Awanda",
  // ... other translations
};
```

## 🚀 Deployment

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

## 📝 TODO / Future Improvements

- [ ] Add blog section
- [ ] Implement contact form with backend
- [ ] Add more projects dynamically from GitHub API
- [ ] Add testimonials section
- [ ] Implement multi-language support (complete translations)
- [ ] Add unit tests
- [ ] Optimize images (WebP format, lazy loading)
- [ ] Implement analytics (Google Analytics / Plausible)

## 📋 Changelog

### [2026-03-12] - Major Dependencies Update

#### Updated Packages
| Package | Previous Version | New Version |
|---------|-----------------|-------------|
| **Vite** | 4.1.4 | 6.3.5 |
| **React** | 18.2.0 | 19.2.4 |
| **React DOM** | 18.2.0 | 19.2.4 |
| **@vitejs/plugin-react** | 3.1.0 | 5.1.4 |
| **@types/react** | 18.0.28 | 19.1.0 |
| **@types/react-dom** | 18.0.11 | 19.1.2 |
| **Bootstrap** | 5.2.3 | 5.3.3 |
| **Bootstrap Icons** | 1.10.3 | 1.11.3 |
| **React Bootstrap** | 2.7.2 | 2.10.10 |
| **Framer Motion** | 10.8.5 | 12.35.2 |
| **React Router DOM** | 6.9.0 | 7.13.1 |
| **React Scroll** | 1.8.9 | 1.9.3 |
| **React Intersection Observer** | 9.4.3 | 9.16.0 |

#### Key Improvements
- ⚡ **Vite 6** - Faster build times, improved HMR, better tree-shaking
- ⚛️ **React 19** - Latest React features, improved performance, new hooks
- 🎨 **Bootstrap 5.3** - Latest UI components and bug fixes
- 🎬 **Framer Motion 12** - Better animations with improved performance
- 🛣️ **React Router 7** - Enhanced routing capabilities and data APIs
- 📦 **TypeScript Types** - Updated type definitions for React 19

#### Migration Notes
- Build tested and verified working
- No breaking changes detected in current implementation
- All existing features remain functional

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Awanda**
- Website: [awanda.eu.org](https://awanda.eu.org)
- Email: awand795@gmail.com
- GitHub: [@awand795](https://github.com/awand795)
- LinkedIn: [/in/awanda](https://linkedin.com/in/awanda)

## 🙏 Acknowledgments

- Bootstrap for the UI framework
- Framer Motion for smooth animations
- React team for the amazing framework
- Vite for the blazing fast build tool

---

Made with ❤️ by Awanda
