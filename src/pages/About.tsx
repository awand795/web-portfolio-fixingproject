import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  User, MapPin, Briefcase, Code2, Sparkles, 
  Terminal, Award, Cpu, GraduationCap, HeartHandshake,
  Mail, MessageCircle, ArrowUpRight, CheckCircle2, ChevronRight,
  Database, Smartphone, Globe, Layers, Laptop, Zap
} from 'lucide-react';
import { Github, Linkedin, Instagram } from '../icons/SocialIcons';
import NavBar from '../Component/NavBar';
import Footer from '../Component/Footer';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { siteUrl } from '../constants';
import avatarImg from '../image/imgprofile.webp';

export default function About() {
  const { darkTheme } = useTheme();
  const { language } = useLanguage();

  const bg = darkTheme ? 'bg-[#08080a] text-neutral-100' : 'bg-[#FAF9F6] text-neutral-900';

  return (
    <>
      <Helmet>
        <title>About Awanda — Software Engineer | Portfolio & Journey</title>
        <meta name="description" content="Pelajari lebih lanjut tentang Awanda, Software Engineer asal Medan, Indonesia. Latar belakang, filosofi rekayasa perangkat lunak, keahlian Fullstack & Mobile, serta pengalaman kerja." />
        <meta property="og:title" content="About Awanda — Software Engineer" />
        <meta property="og:description" content="Pelajari lebih lanjut tentang Awanda, Software Engineer asal Medan, Indonesia. Latar belakang, filosofi rekayasa perangkat lunak, keahlian Fullstack & Mobile, serta pengalaman kerja." />
        <meta property="og:url" content={`${siteUrl}/about`} />
        <meta property="og:image" content={`${siteUrl}/awanda-profile.jpg`} />
        <link rel="canonical" href={`${siteUrl}/about`} />

        {/* JSON-LD ProfilePage for AI and Google Knowledge Graph */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Awanda",
            "url": `${siteUrl}/about`,
            "mainEntity": {
              "@type": "Person",
              "name": "Awanda",
              "jobTitle": "Software Engineer",
              "worksFor": {
                "@type": "Organization",
                "name": "Darkotech",
                "url": "https://darkotech.id"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Medan",
                "addressRegion": "Sumatera Utara",
                "addressCountry": "ID"
              },
              "knowsAbout": ["Fullstack Web Development", "React", "TypeScript", "PostgreSQL", "Laravel", "Spring Boot", "Flutter", "Android", "Cloud Architecture"],
              "sameAs": [
                "https://www.wikidata.org/wiki/Q141181387",
                "https://github.com/awand795",
                "https://linkedin.com/in/awanda",
                "https://instagram.com/adnawaa"
              ]
            }
          })}
        </script>
      </Helmet>

      <div className={`${bg} min-h-screen transition-colors duration-500 selection:bg-indigo-500 selection:text-white relative overflow-hidden flex flex-col justify-between`}>
        {/* Ambient Atmosphere Lights */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className={`absolute inset-0 ${darkTheme ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`} />
          {darkTheme && (
            <>
              <div className="absolute top-12 left-1/3 w-[55vw] h-[40vw] rounded-full bg-gradient-to-b from-indigo-600/10 via-purple-600/5 to-transparent blur-[160px]" />
              <div className="absolute bottom-10 right-10 w-[40vw] h-[40vw] rounded-full bg-blue-600/[0.04] blur-[160px]" />
            </>
          )}
        </div>

        {/* Global Navigation */}
        <NavBar />

        {/* ── Main Content ── */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-20 w-full">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} className="text-neutral-600" />
            <span className="text-neutral-300 font-medium">About</span>
          </div>

          {/* ── Top Hero Profile Header ── */}
          <div className="grid md:grid-cols-12 gap-8 items-center mb-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="md:col-span-4 flex flex-col items-center md:items-start"
            >
              <div className="relative group">
                <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 opacity-40 blur-lg group-hover:opacity-75 transition-opacity duration-500" />
                <img
                  src={avatarImg}
                  alt="Awanda"
                  className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl object-cover border-2 border-indigo-500/30 shadow-2xl"
                />
                <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-xl bg-[#0e0e14] border border-neutral-800 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 shadow-xl">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-8 text-center md:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono tracking-wider uppercase mb-3 border bg-indigo-500/10 border-indigo-500/30 text-indigo-400">
                <User size={12} />
                <span>Biography &amp; Background</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight mb-4 leading-tight">
                Hi, I'm <span className="text-gradient">Awanda</span>.
              </h1>

              <p className={`text-base sm:text-lg leading-relaxed mb-6 font-medium ${darkTheme ? 'text-neutral-300' : 'text-neutral-700'}`}>
                {language === 'id' 
                  ? 'Fullstack Software Engineer yang berfokus pada pembangunan sistem digital performa tinggi, arsitektur basis data cloud, dan aplikasi web & mobile modern.'
                  : 'Fullstack Software Engineer focused on crafting high-performance digital systems, scalable cloud architectures, and modern web & mobile applications.'}
              </p>

              {/* Quick Info Badges */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-xs font-mono">
                <span className="px-3 py-1.5 rounded-xl border border-neutral-800 bg-neutral-900/60 text-neutral-300 flex items-center gap-1.5">
                  <MapPin size={13} className="text-indigo-400" />
                  <span>Medan, Indonesia</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl border border-neutral-800 bg-neutral-900/60 text-neutral-300 flex items-center gap-1.5">
                  <Briefcase size={13} className="text-indigo-400" />
                  <span>Darkotech</span>
                </span>
                <span className="px-3 py-1.5 rounded-xl border border-neutral-800 bg-neutral-900/60 text-neutral-300 flex items-center gap-1.5">
                  <Code2 size={13} className="text-indigo-400" />
                  <span>Fullstack &amp; Mobile</span>
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── Story & Engineering Narrative ── */}
          <div className="space-y-12">
            {/* Story Card */}
            <div className={`p-8 sm:p-10 rounded-3xl border ${darkTheme ? 'bg-[#0e0e14]/90 border-neutral-800/90 shadow-2xl' : 'bg-white border-neutral-200 shadow-sm'}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400">
                  <Terminal size={20} />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl sm:text-2xl">
                    {language === 'id' ? 'Kisah & Perjalanan Saya' : 'My Story & Journey'}
                  </h2>
                  <p className="text-xs font-mono text-neutral-500">From Curiosity to Scalable Systems</p>
                </div>
              </div>

              <div className={`space-y-4 text-sm sm:text-base leading-relaxed ${darkTheme ? 'text-neutral-300' : 'text-neutral-700'}`}>
                <p>
                  {language === 'id'
                    ? 'Ketertarikan saya pada rekayasa perangkat lunak berakar dari rasa penasaran tentang bagaimana aplikasi dapat menyelesaikan masalah nyata dengan efisiensi maksimal. Saya memulai perjalanan dengan mendalami logika pemrograman dasar hingga akhirnya menguasai ekosistem pengembangan fullstack modern.'
                    : 'My passion for software engineering started with curiosity about how code can automate repetitive workflows and solve real-world problems. Over the years, I expanded from foundational programming concepts to mastering modern end-to-end fullstack development.'}
                </p>
                <p>
                  {language === 'id'
                    ? 'Saat ini, sebagai bagian dari tim rekayasa perangkat lunak di Darkotech, saya terbiasa menangani seluruh siklus hidup perangkat lunak: mulai dari perancangan skema database relasional (PostgreSQL, MySQL), perakitan API backend (Laravel, Spring Boot, Node.js), hingga implementasi antarmuka frontend reaktif dan aplikasi mobile (React 19, TypeScript, Flutter).'
                    : 'Currently, as part of the engineering team at Darkotech, I manage the full software development lifecycle: from architecting normalized relational database schemas (PostgreSQL, MySQL) and designing resilient APIs (Laravel, Spring Boot, Node.js) to crafting reactive web & mobile UIs (React 19, TypeScript, Flutter).'}
                </p>
              </div>
            </div>

            {/* ── 4 Core Pillars Bento Grid ── */}
            <div>
              <h2 className="text-2xl font-bold font-display tracking-tight mb-6">
                {language === 'id' ? 'Pilar & Filosofi Rekayasa' : 'Engineering Pillars & Principles'}
              </h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Pillar 1 */}
                <div className={`p-6 rounded-3xl border ${darkTheme ? 'bg-[#0e0e14]/90 border-neutral-800' : 'bg-white border-neutral-200'}`}>
                  <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 w-fit mb-4">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold font-display text-base mb-2">Performance First</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Optimasi Core Web Vitals, sub-second latency, dan arsitektur data efisien tanpa komputasi berlebih.
                  </p>
                </div>

                {/* Pillar 2 */}
                <div className={`p-6 rounded-3xl border ${darkTheme ? 'bg-[#0e0e14]/90 border-neutral-800' : 'bg-white border-neutral-200'}`}>
                  <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 w-fit mb-4">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold font-display text-base mb-2">Clean Architecture</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Pemisahan lapisan presentasi, logika bisnis, dan lapisan data yang teruji dan mudah dipelihara (*maintainable*).
                  </p>
                </div>

                {/* Pillar 3 */}
                <div className={`p-6 rounded-3xl border ${darkTheme ? 'bg-[#0e0e14]/90 border-neutral-800' : 'bg-white border-neutral-200'}`}>
                  <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 w-fit mb-4">
                    <Database className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold font-display text-base mb-2">Data Integrity</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Desain skema relasional yang konsisten, transaksi atomik, dan connection pooling yang aman.
                  </p>
                </div>

                {/* Pillar 4 */}
                <div className={`p-6 rounded-3xl border ${darkTheme ? 'bg-[#0e0e14]/90 border-neutral-800' : 'bg-white border-neutral-200'}`}>
                  <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit mb-4">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold font-display text-base mb-2">Cross-Platform</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Pengalaman pengguna mulus di desktop, tablet, dan mobile melalui React SPA, PWA, dan Flutter.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Connect & Discussion Card ── */}
            <div className={`p-8 sm:p-10 rounded-3xl border text-center relative overflow-hidden shadow-2xl
              ${darkTheme ? 'bg-gradient-to-b from-[#12121c] to-[#0a0a0f] border-indigo-500/20' : 'bg-gradient-to-b from-indigo-50/50 to-white border-indigo-100'}`}>
              <div className="inline-flex p-3 rounded-2xl bg-indigo-600 text-white mb-4 shadow-lg shadow-indigo-600/30">
                <HeartHandshake size={24} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-tight mb-2">
                {language === 'id' ? 'Mari Terhubung & Berkolaborasi' : "Let's Connect & Collaborate"}
              </h3>
              <p className={`text-xs sm:text-sm max-w-xl mx-auto mb-6 leading-relaxed ${darkTheme ? 'text-neutral-400' : 'text-neutral-600'}`}>
                {language === 'id'
                  ? 'Saya selalu terbuka untuk mendiskusikan peluang kerja, arsitektur sistem, atau kolaborasi proyek open-source.'
                  : "I'm always open to discussing new opportunities, system architecture challenges, or open-source projects."}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="mailto:awand795@gmail.com"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/25"
                >
                  <Mail size={14} />
                  <span>awand795@gmail.com</span>
                </a>
                <a
                  href="https://linkedin.com/in/awanda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-5 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all
                    ${darkTheme ? 'border-neutral-700 bg-neutral-900 text-neutral-200 hover:text-white hover:border-neutral-600' : 'border-neutral-300 bg-white text-neutral-700 hover:text-black shadow-sm'}`}
                >
                  <Linkedin size={14} />
                  <span>LinkedIn Profile</span>
                </a>
                <a
                  href="https://github.com/awand795"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-5 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all
                    ${darkTheme ? 'border-neutral-700 bg-neutral-900 text-neutral-200 hover:text-white hover:border-neutral-600' : 'border-neutral-300 bg-white text-neutral-700 hover:text-black shadow-sm'}`}
                >
                  <Github size={14} />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Global Footer */}
        <Footer />
      </div>
    </>
  );
}
