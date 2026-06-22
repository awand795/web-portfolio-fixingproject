import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Logo } from './Logo';

interface NavBarProps {
  darkTheme?: boolean;
  setDarkTheme?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MenuItem {
  name: string;
  target: string;
  scrollTo: string | null;
  section: string;
}

const NavBar = ({ darkTheme: propDarkTheme, setDarkTheme: propSetDarkTheme }: NavBarProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { language, toggleLanguage, t } = useLanguage();
  const theme = useTheme();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  const darkTheme = propDarkTheme !== undefined ? propDarkTheme : theme.darkTheme;
  const setDarkTheme = propSetDarkTheme || theme.setDarkTheme;
  const isSocmedPage = location.pathname === '/socmed';

  // Circular clip-path transition for theme toggling
  const handleThemeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const doc = document as any;
    if (!doc.startViewTransition) {
      setDarkTheme((prev: boolean) => !prev);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      setDarkTheme((prev: boolean) => !prev);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`
          ]
        },
        {
          duration: 400,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)'
        }
      );
    });
  };

  const menuItems: MenuItem[] = [
    { name: t('nav.home'), target: '/', scrollTo: null, section: 'home' },
    { name: t('nav.projects'), target: '/', scrollTo: 'project', section: 'project' },
    { name: t('nav.skills'), target: '/', scrollTo: 'skill', section: 'skill' },
    { name: t('nav.contact'), target: '/', scrollTo: 'contact', section: 'contact' },
    { name: t('nav.social'), target: '/socmed', scrollTo: null, section: 'social' },
  ];

  useEffect(() => {
    if (isSocmedPage) { setActiveSection('social'); return; }
    const sectionIds = ['home', 'project', 'skill', 'contact'];
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id === 'home' ? 'home' : id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [isSocmedPage]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const menu = menuRef.current;
    if (!menu) return;
    const focusable = menu.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    menu.addEventListener('keydown', trap);
    first.focus();
    return () => menu.removeEventListener('keydown', trap);
  }, [isOpen]);

  const handleNavClick = (scrollTarget: string | null) => {
    if (scrollTarget) {
      const el = document.getElementById(scrollTarget);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  const isActive = (item: MenuItem) => isSocmedPage ? item.section === 'social' : activeSection === item.section;

  // Premium floating capsule style that morphs on scroll
  const navBg = scrolled
    ? darkTheme
      ? 'bg-[#0f1013]/80 border-neutral-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-lg rounded-2xl top-3 py-1 px-5 mt-3'
      : 'bg-white/80 border-neutral-200 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-lg rounded-2xl top-3 py-1 px-5 mt-3'
    : 'bg-transparent border-transparent top-0 py-4 px-0 mt-0';

  return (
    <nav className={`sticky z-50 transition-all duration-300 border ${navBg}`}>
      <div className="flex items-center justify-between h-14 lg:h-16">

        {/* Logo */}
        <Link
          to="/"
          aria-label="Awanda Portfolio Home"
          className="flex items-center gap-2 group"
        >
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
            <Logo className="w-8 h-8" />
          </motion.div>
          <span className="font-display font-black text-lg tracking-tight text-gradient">
            Awanda.
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {menuItems.map((item) => (
            <Link
              key={item.section}
              to={item.target}
              onClick={() => handleNavClick(item.scrollTo)}
              className={`relative px-4 py-2 text-xs font-mono tracking-wider uppercase rounded-lg transition-all duration-200 ${
                isActive(item)
                  ? darkTheme ? 'text-indigo-400 bg-indigo-500/10' : 'text-indigo-600 bg-indigo-50/85 font-bold'
                  : darkTheme ? 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              {item.name}
              {isActive(item) && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-indigo-500"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
            aria-label={language === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
            className={`
              flex items-center justify-center w-9 h-9 rounded-full text-[10px] font-mono tracking-wider
              border transition-all duration-200
              ${darkTheme 
                ? 'bg-neutral-900/80 border-neutral-800 text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-500/30' 
                : 'bg-white border-neutral-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 shadow-sm'}
            `}
          >
            {language === 'id' ? 'EN' : 'ID'}
          </motion.button>

          {/* Theme toggle */}
          <motion.button
            whileHover={{ scale: 1.05, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleThemeToggle}
            aria-label={darkTheme ? t('theme.light') : t('theme.dark')}
            className={`
              flex items-center justify-center w-9 h-9 rounded-full
              border transition-all duration-200
              ${darkTheme 
                ? 'bg-neutral-900/80 border-neutral-800 text-amber-400 hover:bg-amber-400/10 hover:border-amber-400/20' 
                : 'bg-white border-neutral-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 shadow-sm'}
            `}
          >
            {darkTheme ? <Sun size={15} /> : <Moon size={15} />}
          </motion.button>

          {/* Hamburger (mobile) */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
            className={`
              flex lg:hidden items-center justify-center w-9 h-9 rounded-full border transition-all duration-200
              ${darkTheme 
                ? 'bg-neutral-900/80 border-neutral-800 text-neutral-300' 
                : 'bg-white border-neutral-200 text-neutral-700 shadow-sm'}
            `}
          >
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={`lg:hidden overflow-hidden border-t mt-2 ${darkTheme ? 'border-neutral-800/80' : 'border-neutral-200'}`}
          >
            <div className="py-3 flex flex-col gap-1">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.section}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={item.target}
                    onClick={() => handleNavClick(item.scrollTo)}
                    className={`block px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all duration-200 ${
                      isActive(item)
                        ? darkTheme ? 'text-indigo-400 bg-indigo-500/10' : 'text-indigo-700 bg-indigo-50'
                        : darkTheme ? 'text-neutral-400 hover:text-neutral-200 hover:bg-white/5' : 'text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile language toggle */}
              <div className={`px-4 pt-3 border-t mt-2 flex items-center gap-3 ${darkTheme ? 'border-neutral-800/60' : 'border-neutral-100'}`}>
                <button
                  onClick={toggleLanguage}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-wider border transition-all 
                    ${darkTheme 
                      ? 'border-neutral-800 text-indigo-400 bg-neutral-900/50 hover:bg-indigo-500/10' 
                      : 'border-neutral-200 text-indigo-700 bg-white hover:bg-indigo-50'}`}
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

export default React.memo(NavBar);
