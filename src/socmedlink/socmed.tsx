import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Globe, Mail, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import NavBar from '../Component/NavBar';
import picture from '../image/imgprofile.webp';
import { Github, Linkedin, Facebook, Instagram } from '../icons/SocialIcons';
import { siteUrl } from '../constants';

interface SocialLink {
  name: string;
  handle: string;
  url: string;
  icon: React.ComponentType<{ size?: number; className?: string; color?: string; style?: React.CSSProperties }>;
  iconBg: string;
  iconBorder: string;
}

interface SocialRowProps {
  link: SocialLink;
  index: number;
  darkTheme: boolean;
}

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    handle: '@awand795',
    url: 'https://github.com/awand795',
    icon: Github,
    iconBg: 'linear-gradient(135deg, #1a1a2e, #2d2d44)',
    iconBorder: 'rgba(255,255,255,0.1)',
  },
  {
    name: 'LinkedIn',
    handle: 'awanda',
    url: 'https://linkedin.com/in/awanda',
    icon: Linkedin,
    iconBg: 'linear-gradient(135deg, #0e76a8, #2bb0ee)',
    iconBorder: 'transparent',
  },
  {
    name: 'Instagram',
    handle: '@adnawaa',
    url: 'https://instagram.com/adnawaa',
    icon: Instagram,
    iconBg: 'linear-gradient(135deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)',
    iconBorder: 'transparent',
  },
  {
    name: 'Facebook',
    handle: 'awandd6',
    url: 'https://facebook.com/awandd6',
    icon: Facebook,
    iconBg: 'linear-gradient(135deg, #3b5998, #5a7abf)',
    iconBorder: 'transparent',
  },
  {
    name: 'WhatsApp',
    handle: '+62 823-6285-1796',
    url: 'https://wa.me/6282362851796',
    icon: Globe,
    iconBg: 'linear-gradient(135deg, #4fce5d, #25d366)',
    iconBorder: 'transparent',
  },
];

const SocialRow = React.memo(({ link, index, darkTheme }: SocialRowProps) => (
  <motion.a
    href={link.url}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.35 + index * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ x: 3 }}
    whileTap={{ scale: 0.98 }}
    className={`
      group flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-200
      ${darkTheme
        ? 'bg-white/[0.03] border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.12]'
        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
      }
    `}
  >
    <span
      className="flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0"
      style={{
        background: link.iconBg,
        border: `1px solid ${link.iconBorder}`,
      }}
    >
      <link.icon
        size={16}
        color="white"
        style={{ strokeWidth: 1.8 }}
      />
    </span>

    <div className="flex-1 min-w-0">
      <p className={`text-sm font-semibold leading-tight ${darkTheme ? 'text-slate-200' : 'text-slate-800'}`}>
        {link.name}
      </p>
      <p className={`text-xs truncate ${darkTheme ? 'text-slate-500' : 'text-slate-500'}`}>
        {link.handle}
      </p>
    </div>

    <ArrowUpRight
      size={14}
      className={`flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5
        ${darkTheme ? 'text-slate-600' : 'text-slate-400'}`}
    />
  </motion.a>
));

const Socmed = () => {
  const { darkTheme, setDarkTheme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Helmet>
        <title>Awanda — Social Links</title>
        <meta property="og:title" content="Awanda — Social Links" />
        <meta property="og:description" content="Connect with me on GitHub, LinkedIn, Instagram, Facebook, and more." />
        <meta property="og:url" content={`${siteUrl}/socmed`} />
        <meta property="og:image" content={`${siteUrl}/awanda-profile.jpg`} />
        <meta property="og:image:secure_url" content={`${siteUrl}/awanda-profile.jpg`} />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="400" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:type" content="profile" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Awanda Portfolio" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Awanda — Social Links" />
        <meta name="twitter:description" content="Connect with me on GitHub, LinkedIn, Instagram, Facebook, and more." />
        <meta name="twitter:image" content={`${siteUrl}/awanda-profile.jpg`} />
        <link rel="canonical" href={`${siteUrl}/socmed`} />
      </Helmet>
      <div className={`min-h-screen transition-colors duration-500 bg-grid-pattern relative overflow-x-hidden ${darkTheme ? 'bg-[#08080a] text-neutral-100' : 'bg-[#FAF9F6] text-neutral-900'}`}>
      {/* Dynamic Grid Background */}
      <div className={`absolute inset-0 pointer-events-none -z-10 ${darkTheme ? 'bg-grid-pattern-dark opacity-100' : 'bg-grid-pattern-light opacity-100'}`} />

      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
        <NavBar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      </header>

      <main className="flex flex-col items-center px-4 pb-16 pt-8 relative z-10">
        <div className={`
          w-full max-w-[400px] rounded-[2rem] overflow-hidden border shadow-2xl transition-all duration-300
          ${darkTheme
            ? 'bg-[#0f1013]/60 border-neutral-900'
            : 'bg-white border-neutral-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.06)]'
          }
        `}>

          {/* ── BANNER ── */}
          <div className="relative h-[110px]">
            <div
              className="absolute inset-0 bg-gradient-primary"
            />
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-10"
            >
              <div className="relative">
                <div className={`
                  absolute inset-[-2px] rounded-full
                  bg-gradient-to-br from-indigo-500/70 via-blue-500/50 to-emerald-450/60
                `} />
                <img
                  src={picture}
                  alt="Awanda"
                  width={80}
                  height={80}
                  className={`
                    relative z-10 w-20 h-20 rounded-full object-cover
                    ${darkTheme ? 'border-[3px] border-[#0f1013]' : 'border-[3px] border-white'}
                  `}
                />
              </div>
            </motion.div>
          </div>

          {/* ── PROFILE BODY ── */}
          <div className="px-6 pb-6 pt-14">

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center mb-4"
            >
              <h1 className="font-display font-black text-xl mb-1.5 tracking-tight">Awanda</h1>
              <p className={`text-[10px] font-mono tracking-widest uppercase ${darkTheme ? 'text-indigo-400' : 'text-indigo-600'}`}>
                Software Developer
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="flex justify-center gap-4 mb-6"
            >
              <a
                href="https://awanda.eu.org"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 text-xs font-mono tracking-wide transition-colors
                  ${darkTheme ? 'text-neutral-500 hover:text-indigo-400' : 'text-neutral-500 hover:text-indigo-600'}`}
              >
                <Globe size={11} />
                awanda.eu.org
              </a>
              <a
                href="mailto:awand795@gmail.com"
                className={`flex items-center gap-1.5 text-xs font-mono tracking-wide transition-colors
                  ${darkTheme ? 'text-neutral-500 hover:text-indigo-400' : 'text-neutral-500 hover:text-indigo-600'}`}
              >
                <Mail size={11} />
                awand795@gmail.com
              </a>
            </motion.div>

            <div className={`h-px mb-6 ${darkTheme ? 'bg-neutral-900' : 'bg-neutral-100'}`} />

            <div className="flex flex-col gap-2.5">
              {socialLinks.map((link, i) => (
                <SocialRow key={link.name} link={link} index={i} darkTheme={darkTheme} />
              ))}
            </div>

            <div className={`mt-8 pt-6 border-t text-center
              ${darkTheme ? 'border-neutral-900' : 'border-neutral-100'}`}>
              <p className={`text-[10px] font-mono tracking-wider ${darkTheme ? 'text-neutral-600' : 'text-neutral-500'}`}>
                © {currentYear} Awanda
              </p>
              <p className={`text-[9px] font-mono tracking-widest uppercase mt-1 ${darkTheme ? 'text-neutral-700' : 'text-neutral-400'}`}>
                Medan, Indonesia
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default Socmed;
