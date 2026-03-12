# 🌟 Awanda's Portfolio Website

A modern, responsive portfolio website built with React and Vite, showcasing my skills and projects as a Fullstack JavaScript Developer.

![Portfolio Preview](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-4.1.4-purple)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.2.3-violet)

## ✨ Features

- 🎨 **Modern UI/UX** - Clean and professional design with smooth animations
- 🌓 **Dark Mode** - Toggle between light and dark themes (persistent with localStorage)
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 📲 **PWA Support** - Install as app on your device with offline support
- 🚀 **Performance** - Built with Vite for lightning-fast development and builds
- ♿ **Accessible** - ARIA labels and semantic HTML for better accessibility
- 🔍 **SEO Optimized** - Meta tags for better search engine visibility

## 🛠️ Tech Stack

- **Frontend Framework:** React 18.2.0
- **Build Tool:** Vite 4.1.4
- **Styling:** Bootstrap 5.2.3
- **Animations:** Framer Motion 10.8.5
- **Icons:** Bootstrap Icons 1.10.3
- **Routing:** React Router DOM 6.9.0
- **Scroll:** React Scroll 1.8.9
- **PWA:** vite-plugin-pwa

## 📦 Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/awand795/web-portfolio-fixingproject.git
cd web-portfolio-fixingproject
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Build for production:
\`\`\`bash
npm run build
\`\`\`

5. Preview production build:
\`\`\`bash
npm run preview
\`\`\`

## 📁 Project Structure

\`\`\`
web-portfolio-fixingproject/
├── public/
│   └── vite.svg
├── src/
│   ├── Component/
│   │   ├── animate/
│   │   │   ├── FadeFromSide.jsx
│   │   │   └── FadeInWhenVisible.jsx
│   │   ├── MyProject.jsx
│   │   └── NavBar.jsx
│   ├── image/
│   │   ├── icon/
│   │   └── [various logos and images]
│   ├── socmedlink/
│   │   ├── socmed.css
│   │   └── socmed.jsx
│   ├── App.css
│   ├── app.jsx
│   ├── index.css
│   ├── main.jsx
│   └── router.jsx
├── index.html
├── package.json
└── vite.config.js
\`\`\`

## 🎯 Key Improvements Made

### 1. **SEO Enhancement**
- Added comprehensive meta tags (description, keywords, author)
- Implemented Open Graph tags for social media sharing
- Added Twitter Card meta tags
- Improved page title with keywords

### 2. **Accessibility**
- Added descriptive alt text to all images
- Implemented ARIA labels for links and buttons
- Added keyboard navigation support for dark mode toggle
- Improved semantic HTML structure

### 3. **Performance**
- Optimized image loading
- Added hover transitions for better UX
- Implemented lazy loading with Framer Motion

### 4. **Code Quality**
- Fixed typos ("exprienced" → "experienced")
- Corrected external links (javascript.com → developer.mozilla.org)
- Added proper target="_blank" and rel="noopener noreferrer" for security
- Implemented data-driven approach for projects and social links

### 5. **User Experience**
- **Persistent Dark Mode** - Theme preference saved in localStorage
- Improved responsive design for all screen sizes
- Added smooth animations and transitions
- Better mobile navigation

### 6. **Modern Practices**
- Component modularity with reusable ProjectCard
- Data separation (projects array, social links array)
- Better error handling and validation
- Improved code organization

## 🎨 Customization

### Update Personal Information

Edit the data in `src/app.jsx`:
\`\`\`jsx
<p className="h1 fw-bold fs-1">Hello I'm Awanda</p>
<p className="text fs-5 text-justify mx-4 mt-4">Your bio here...</p>
\`\`\`

### Update Projects

Edit the `projects` array in `src/Component/MyProject.jsx`:
\`\`\`jsx
const projects = [
    {
        id: 1,
        title: "Your Project",
        description: "Project description",
        githubUrl: "https://github.com/yourusername/project",
        tags: ["React", "Node.js"]
    }
];
\`\`\`

### Update Social Links

Edit the `socialLinks` array in `src/socmedlink/socmed.jsx`:
\`\`\`jsx
const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com/yourprofile', icon: 'bi-facebook', className: 'btn-fb' }
];
\`\`\`

## 🚀 Deployment

This project can be deployed to various platforms:

### Vercel
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Netlify
\`\`\`bash
npm run build
# Drag and drop the 'dist' folder to Netlify
\`\`\`

### GitHub Pages
1. Install gh-pages: \`npm install --save-dev gh-pages\`
2. Add to package.json:
\`\`\`json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
\`\`\`
3. Run: \`npm run deploy\`

## 📝 TODO / Future Improvements

- [ ] Add blog section
- [ ] Implement contact form with backend
- [ ] Add more projects dynamically from GitHub API
- [ ] Add testimonials section
- [ ] Implement multi-language support
- [ ] Add unit tests
- [ ] Optimize images (WebP format, lazy loading)
- [ ] Add PWA capabilities
- [ ] Implement analytics (Google Analytics / Plausible)

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
