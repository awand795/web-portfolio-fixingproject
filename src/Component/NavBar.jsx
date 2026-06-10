import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Logo } from './Logo';

const NavBar = ({ darkTheme: propDarkTheme, setDarkTheme: propSetDarkTheme } = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { language, toggleLanguage, t } = useLanguage();
  const theme = useTheme();
  const location = useLocation();

  const darkTheme = propDarkTheme !== undefined ? propDarkTheme : theme.darkTheme;
  const setDarkTheme = propSetDarkTheme || theme.setDarkTheme;
  const isSocmedPage = location.pathname === '/socmed';

  const menuItems = [
    { name: t('nav.home'), target: '/', scrollTo: null, section: 'home' },
    { name: t('nav.projects'), target: '/', scrollTo: 'project', section: 'project' },
    { name: t('nav.skills'), target: '/', scrollTo: 'skill', section: 'skill' },
    { name: t('nav.contact'), target: '/', scrollTo: 'contact', section: 'contact' },
    { name: t('nav.social'), target: '/socmed', scrollTo: null, section: 'social' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (isSocmedPage) { setActiveSection('social'); return; }
      const sections = ['contact', 'skill', 'project'];
      const y = window.scrollY + 150;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop) { setActiveSection(id); return; }
      }
      setActiveSection('home');
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSocmedPage]);

  const handleNavClick = (scrollTarget) => {
    if (scrollTarget) {
      const el = document.getElementById(scrollTarget);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  const isActive = (item) => isSocmedPage ? item.section === 'social' : activeSection === item.section;

  const navBg = scrolled
    ? darkTheme
      ? 'bg-[#020617]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
      : 'bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-sm'
    : 'bg-transparent border-b border-transparent';

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="flex items-center justify-between h-16 lg:h-20">

        {/* Logo */}
        <Link
          to="/"
          aria-label="Awanda Portfolio Home"
          className="flex items-center gap-2.5 group"
        >
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
            <Logo className="w-9 h-9" />
          </motion.div>
          <span className="font-display font-extrabold text-xl tracking-tight"
            style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Awanda
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {menuItems.map((item) => (
            <Link
              key={item.section}
              to={item.target}
              onClick={() => handleNavClick(item.scrollTo)}
              className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                isActive(item)
                  ? darkTheme ? 'text-violet-400 bg-violet-500/10' : 'text-violet-700 bg-violet-50'
                  : darkTheme ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {item.name}
              {isActive(item) && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-violet-500"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={toggleLanguage}
            aria-label={language === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
            className={`
              hidden sm:flex items-center justify-center w-10 h-10 rounded-full text-xs font-bold
              border transition-all duration-200
              ${darkTheme ? 'bg-white/5 border-white/10 text-violet-400 hover:bg-violet-500/15 hover:border-violet-500/40' : 'bg-black/5 border-black/10 text-violet-700 hover:bg-violet-50 hover:border-violet-300'}
            `}
          >
            {language === 'id' ? 'EN' : 'ID'}
          </motion.button>

          {/* Theme toggle */}
          <motion.button
            whileHover={{ scale: 1.08, rotate: 180 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setDarkTheme(prev => !prev)}
            aria-label={darkTheme ? t('theme.light') : t('theme.dark')}
            className={`
              flex items-center justify-center w-10 h-10 rounded-full
              border transition-all duration-200
              ${darkTheme ? 'bg-white/5 border-white/10 text-amber-400 hover:bg-amber-400/10 hover:border-amber-400/30' : 'bg-black/5 border-black/10 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300'}
            `}
          >
            {darkTheme ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          {/* Hamburger (mobile) */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
            className={`
              flex lg:hidden items-center justify-center w-10 h-10 rounded-full border transition-all duration-200
              ${darkTheme ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-black/5 border-black/10 text-slate-700'}
            `}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`lg:hidden overflow-hidden border-t ${darkTheme ? 'border-white/[0.06]' : 'border-slate-200'}`}
          >
            <div className="py-4 flex flex-col gap-1">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.section}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.target}
                    onClick={() => handleNavClick(item.scrollTo)}
                    className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive(item)
                        ? darkTheme ? 'text-violet-400 bg-violet-500/10' : 'text-violet-700 bg-violet-50'
                        : darkTheme ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile language toggle */}
              <div className="px-4 pt-3 border-t mt-2 flex items-center gap-3 border-white/5">
                <button
                  onClick={toggleLanguage}
                  className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${darkTheme ? 'border-white/10 text-violet-400 hover:bg-violet-500/10' : 'border-slate-200 text-violet-700 hover:bg-violet-50'}`}
                >
                  {language === 'id' ? '🌐 EN' : '🌐 ID'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
