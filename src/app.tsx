import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import picture from './image/imgprofile.webp';
import MyProject from './Component/MyProject';
import NavBar from './Component/NavBar';
import PWAInstallPrompt from './Component/PWAInstallPrompt';
import { useLanguage } from './context/LanguageContext';
import { useTheme } from './context/ThemeContext';
import {
  Download, Mail, Phone, MapPin, ArrowUp
} from 'lucide-react';
import { Github, Linkedin, Facebook, Instagram } from './icons/SocialIcons';

interface Tech {
  img: string;
  name: string;
  url: string;
}

interface Social {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

interface TechLogoProps {
  img: string;
  name: string;
  url: string;
  darkTheme: boolean;
}

interface BackgroundCanvasProps {
  darkTheme: boolean;
}

interface SocialButtonProps {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  darkTheme: boolean;
}

const TechLogo = ({ img, name, url, darkTheme }: TechLogoProps) => (
  <motion.a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`${name} official website`}
    whileHover={{ y: -10, scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    className="group flex flex-col items-center gap-2"
  >
    <span className={`
      flex items-center justify-center w-20 h-20 rounded-2xl
      transition-all duration-300 p-4 backdrop-blur-sm
      group-hover:border-violet-500/40 group-hover:shadow-[0_0_24px_rgba(124,58,237,0.3)]
      ${darkTheme
        ? 'bg-white/5 border border-white/10 group-hover:bg-violet-500/15'
        : 'bg-slate-100 border border-slate-200 group-hover:bg-violet-50'
      }
    `}>
      <img src={img} alt={`${name} logo`} className="w-full h-full object-contain" loading="lazy" />
    </span>
    <span className={`text-xs font-medium group-hover:text-violet-400 transition-colors ${darkTheme ? 'text-slate-400' : 'text-slate-500'}`}>{name}</span>
  </motion.a>
);

const BackgroundCanvas = ({ darkTheme }: BackgroundCanvasProps) => {
  if (!darkTheme) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px]
        rounded-full bg-violet-600/[0.04] blur-[160px]" />
      <div className="absolute bottom-[-100px] left-[-200px] w-[500px] h-[500px]
        rounded-full bg-cyan-500/[0.03] blur-[140px]" />
    </div>
  );
};

const SocialButton = ({ href, label, icon: Icon, darkTheme }: SocialButtonProps) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    whileHover={{ y: -6, scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    className={`
      flex items-center justify-center w-14 h-14 rounded-full
      border transition-all duration-300
      ${darkTheme
        ? 'bg-white/5 border-white/10 text-slate-400 hover:bg-violet-500/20 hover:border-violet-500/50 hover:text-violet-400 hover:shadow-[0_0_20px_rgba(124,58,237,0.25)]'
        : 'bg-black/5 border-black/10 text-slate-500 hover:bg-violet-500/10 hover:border-violet-500/30 hover:text-violet-600'
      }
    `}
  >
    <Icon size={22} />
  </motion.a>
);

const App = () => {
  const { t } = useLanguage();
  const { darkTheme, setDarkTheme } = useTheme();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = t('hero.title');
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setTypedText('');
    let i = 0;
    if (typingRef.current) clearInterval(typingRef.current);
    typingRef.current = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        if (typingRef.current) clearInterval(typingRef.current);
      }
    }, 55);
    return () => {
      if (typingRef.current) clearInterval(typingRef.current);
    };
  }, [fullText]);

  const techs: Tech[] = [
    { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', name: 'React', url: 'https://react.dev' },
    { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', name: 'Express.js', url: 'https://expressjs.com' },
    { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg', name: 'Laravel', url: 'https://laravel.com' },
    { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', name: 'Spring Boot', url: 'https://spring.io' },
    { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', name: 'Flutter', url: 'https://flutter.dev' },
    { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', name: 'MySQL', url: 'https://www.mysql.com' },
    { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', name: 'PostgreSQL', url: 'https://www.postgresql.org' },
    { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', name: 'Docker', url: 'https://www.docker.com' },
    { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', name: 'Git', url: 'https://git-scm.com' },
  ];

  const socials: Social[] = [
    { href: 'https://github.com/awand795', label: 'GitHub', icon: Github },
    { href: 'https://linkedin.com/in/awanda', label: 'LinkedIn', icon: Linkedin },
    { href: 'https://facebook.com/awandd6', label: 'Facebook', icon: Facebook },
    { href: 'https://instagram.com/adnawaa', label: 'Instagram', icon: Instagram },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };
  const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

  const bg = darkTheme ? 'bg-[#050a14] text-slate-100' : 'bg-white text-slate-900';

  const siteUrl = 'https://awanda.eu.org';

  return (
    <>
      <Helmet>
        <title>Awanda — Fullstack JavaScript Developer</title>
        <meta property="og:title" content="Awanda — Fullstack JavaScript Developer" />
        <meta property="og:description" content="Fullstack developer building web and mobile apps. I code stuff." />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={`${siteUrl}/awanda-profile.jpg`} />
        <meta property="og:image:secure_url" content={`${siteUrl}/awanda-profile.jpg`} />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="400" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Awanda Portfolio" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Awanda — Fullstack JavaScript Developer" />
        <meta name="twitter:description" content="Fullstack developer building web and mobile apps." />
        <meta name="twitter:image" content={`${siteUrl}/awanda-profile.jpg`} />
        <link rel="canonical" href={siteUrl} />
      </Helmet>
      <div className={`${bg} min-h-screen transition-colors duration-300 relative overflow-x-hidden`}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <BackgroundCanvas darkTheme={darkTheme} />

      <header className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NavBar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <main id="main-content">

          {/* ── HERO SECTION ── */}
          <section className="min-h-[88vh] flex items-center pt-4 pb-16">
            <div className="w-full grid lg:grid-cols-[1fr_420px] gap-16 items-center">

              {/* Hero Text — kiri */}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="order-2 lg:order-1"
              >
                {/* Nama sebagai headline utama */}
                <h1
                  className="font-display font-extrabold leading-[0.95] tracking-tight mb-5"
                  style={{
                    fontSize: 'clamp(3.5rem, 9vw, 7rem)',
                    background: 'var(--gradient-primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Awanda
                </h1>

                {/* Role dengan typing effect — ukuran lebih kecil dari nama */}
                <div className="mb-6 h-9 flex items-center">
                  <h2
                    className={`text-lg sm:text-xl font-semibold border-r-2 pr-1 leading-none
                      ${darkTheme ? 'text-slate-300 border-violet-500' : 'text-slate-600 border-violet-600'}`}
                    style={{ animation: 'blink 0.75s step-end infinite' }}
                  >
                    {typedText}
                  </h2>
                </div>

                {/* Bio — 2 kalimat, tidak ada kata hiperbola */}
                <p className={`
                  text-base sm:text-lg leading-relaxed mb-10 max-w-[520px]
                  ${darkTheme ? 'text-slate-400' : 'text-slate-600'}
                `}>
                  {t('hero.description')}
                </p>

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-3 mb-14">
                  <motion.a
                    href="/files/CV Fullstack Developer - Awanda.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold
                      text-white text-sm transition-all duration-300
                      shadow-[0_2px_16px_rgba(124,58,237,0.35)]
                      hover:shadow-[0_4px_24px_rgba(124,58,237,0.55)]"
                    style={{ background: 'var(--gradient-primary)' }}
                  >
                    <Download size={16} />
                    {t('hero.downloadCv')}
                  </motion.a>

                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className={`
                      flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                      border-2 transition-all duration-300
                      ${darkTheme
                        ? 'border-white/10 text-slate-300 hover:border-violet-500/50 hover:text-violet-300'
                        : 'border-slate-200 text-slate-700 hover:border-violet-400 hover:text-violet-700'
                      }
                    `}
                  >
                    <Mail size={16} />
                    {t('hero.getInTouch')}
                  </motion.a>
                </div>

                {/* Stats baris — 3 angka kecil yang informatif */}
                <div className={`
                  flex items-center gap-8 pt-8 border-t
                  ${darkTheme ? 'border-white/[0.06]' : 'border-slate-200'}
                `}>
                  {[
                    { num: 'Web + Mobile', label: 'Fullstack' },
                    { num: 'Clean Code', label: 'Architecture' },
                    { num: 'Coffee', label: 'Fuel' },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className={`font-display font-extrabold text-2xl leading-none mb-1
                        ${darkTheme ? 'text-slate-100' : 'text-slate-900'}`}>
                        {stat.num}
                      </p>
                      <p className={`text-xs ${darkTheme ? 'text-slate-500' : 'text-slate-600'}`}>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Foto — kanan */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="flex justify-center order-1 lg:order-2"
              >
                <div className="relative">
                  <div className={`
                    absolute inset-[-3px] rounded-full
                    ${darkTheme
                      ? 'bg-gradient-to-br from-violet-500/60 via-indigo-500/40 to-cyan-400/50'
                      : 'bg-gradient-to-br from-violet-400/50 via-indigo-400/30 to-cyan-300/40'
                    }
                  `} aria-hidden="true" />

                  <div
                    className="absolute inset-0 rounded-full blur-2xl scale-90 -z-10"
                    style={{ background: 'rgba(124,58,237,0.12)' }}
                    aria-hidden="true"
                  />

                  <img
                    src={picture}
                    alt="Awanda — Fullstack JavaScript Developer"
                    fetchPriority="high"
                    width={400}
                    height={400}
                    className={`
                      relative z-10 rounded-full object-cover
                      w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[380px] lg:h-[380px]
                      border-[3px] transition-transform duration-500 hover:scale-[1.02]
                      ${darkTheme ? 'border-[#050a14]' : 'border-slate-50'}
                    `}
                  />


                </div>
              </motion.div>
            </div>
          </section>

          {/* ── DIVIDER ── */}
          <div className={`w-2/3 max-w-xl mx-auto h-px mb-4 ${darkTheme ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent' : 'bg-gradient-to-r from-transparent via-slate-200 to-transparent'}`} />

          {/* ── PROJECTS SECTION ── */}
          <section className="py-20">
            <MyProject darkTheme={darkTheme} />
          </section>

          {/* ── DIVIDER ── */}
          <div className={`w-2/3 max-w-xl mx-auto h-px mb-4 ${darkTheme ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent' : 'bg-gradient-to-r from-transparent via-slate-200 to-transparent'}`} />

          {/* ── SKILLS SECTION ── */}
          <section id="skill" className="py-20">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={fadeUp} className="mb-4">
                <p className={`text-xs font-bold tracking-[0.2em] uppercase mb-3 ${darkTheme ? 'text-violet-400' : 'text-violet-600'}`}>
                  Expertise
                </p>
                <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-gradient mb-4">
                  Tech Stack
                </h2>
                <p className={`text-base sm:text-lg max-w-xl mb-12 ${darkTheme ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t('skills.description.before')}{' '}
                  <span className={`font-semibold ${darkTheme ? 'text-violet-400' : 'text-violet-700'}`}>Web & Mobile</span>
                  {' '}{t('skills.description.mid')}{' '}
                  <span className={`font-semibold ${darkTheme ? 'text-cyan-400' : 'text-cyan-700'}`}>React</span>
                  {' '}{t('skills.description.and')}{' '}
                  <span className={`font-semibold ${darkTheme ? 'text-emerald-400' : 'text-emerald-700'}`}>Flutter</span>
                  {' '}{t('skills.description.after')}
                </p>
              </motion.div>

              <motion.div
                variants={stagger}
                className="flex flex-wrap gap-8 justify-start"
              >
                {techs.map((tech) => (
                  <motion.div key={tech.name} variants={fadeUp}>
                    <TechLogo {...tech} darkTheme={darkTheme} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </section>

          {/* ── DIVIDER ── */}
          <div className={`w-2/3 max-w-xl mx-auto h-px mb-4 ${darkTheme ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent' : 'bg-gradient-to-r from-transparent via-slate-200 to-transparent'}`} />

          {/* ── CONTACT SECTION ── */}
          <section id="contact" className="py-20">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={fadeUp} className="mb-12">
                <p className={`text-xs font-bold tracking-[0.2em] uppercase mb-3 ${darkTheme ? 'text-violet-400' : 'text-violet-600'}`}>
                  Contact
                </p>
                <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-gradient mb-4">
                  {t('contact.title')}
                </h2>
                <p className={`text-lg ${darkTheme ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t('contact.cta')}
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                <motion.a
                  href="mailto:awand795@gmail.com"
                  variants={fadeUp}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 group col-span-full sm:col-span-1 ${darkTheme ? 'bg-white/[0.03] border-white/[0.07] hover:bg-violet-500/10 hover:border-violet-500/30' : 'bg-white border-slate-200 hover:border-violet-300 shadow-sm hover:shadow-md'}`}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--gradient-primary)' }}>
                    <Mail size={20} className="text-white" />
                  </div>
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-widest mb-0.5 ${darkTheme ? 'text-slate-500' : 'text-slate-400'}`}>Email</p>
                    <p className={`font-semibold text-sm ${darkTheme ? 'text-slate-200 group-hover:text-violet-300' : 'text-slate-800 group-hover:text-violet-700'} transition-colors`}>
                      awand795@gmail.com
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  href="tel:+6282362851796"
                  variants={fadeUp}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 group ${darkTheme ? 'bg-white/[0.03] border-white/[0.07] hover:bg-cyan-500/10 hover:border-cyan-500/30' : 'bg-white border-slate-200 hover:border-cyan-300 shadow-sm hover:shadow-md'}`}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--gradient-accent)' }}>
                    <Phone size={20} className="text-white" />
                  </div>
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-widest mb-0.5 ${darkTheme ? 'text-slate-500' : 'text-slate-400'}`}>Phone</p>
                    <p className={`font-semibold text-sm ${darkTheme ? 'text-slate-200' : 'text-slate-800'}`}>
                      +62 823-6285-1796
                    </p>
                  </div>
                </motion.a>

                <motion.div
                  variants={fadeUp}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 ${darkTheme ? 'bg-white/[0.03] border-white/[0.07]' : 'bg-white border-slate-200 shadow-sm'}`}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--gradient-secondary)' }}>
                    <MapPin size={20} className="text-white" />
                  </div>
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-widest mb-0.5 ${darkTheme ? 'text-slate-500' : 'text-slate-400'}`}>Location</p>
                    <p className={`font-semibold text-sm ${darkTheme ? 'text-slate-200' : 'text-slate-800'}`}>
                      {t('contact.location')}
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.div variants={fadeUp} className="flex items-center gap-4 flex-wrap">
                {socials.map((s) => (
                  <SocialButton key={s.label} {...s} darkTheme={darkTheme} />
                ))}
              </motion.div>
            </motion.div>
          </section>
        </main>

        <footer className={`py-8 border-t ${darkTheme ? 'border-white/[0.06]' : 'border-slate-200'}`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${darkTheme ? 'text-violet-400 hover:text-violet-300' : 'text-violet-600 hover:text-violet-800'}`}
            >
              <ArrowUp size={16} />
              {t('footer.backToTop')}
            </button>
            <p className={`text-sm ${darkTheme ? 'text-slate-600' : 'text-slate-400'}`}>
              © {new Date().getFullYear()} Awanda. {t('footer.builtWith')}
            </p>
          </div>
        </footer>
      </div>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={t('footer.backToTop')}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-[0_4px_20px_rgba(124,58,237,0.4)] hover:shadow-[0_6px_28px_rgba(124,58,237,0.6)] transition-all duration-300"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <PWAInstallPrompt darkTheme={darkTheme} />
    </div>
    </>
  );
};

export default App;
