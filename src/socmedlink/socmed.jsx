import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Mail, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import NavBar from '../Component/NavBar';
import picture from '../image/imgprofile.webp';
import { Github, Linkedin, Facebook, Instagram } from '../icons/SocialIcons';

const socialLinks = [
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

const SocialRow = ({ link, index, darkTheme }) => (
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
    {/* Icon */}
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

    {/* Text */}
    <div className="flex-1 min-w-0">
      <p className={`text-sm font-semibold leading-tight ${darkTheme ? 'text-slate-200' : 'text-slate-800'}`}>
        {link.name}
      </p>
      <p className={`text-xs truncate ${darkTheme ? 'text-slate-500' : 'text-slate-500'}`}>
        {link.handle}
      </p>
    </div>

    {/* Arrow */}
    <ArrowUpRight
      size={14}
      className={`flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5
        ${darkTheme ? 'text-slate-600' : 'text-slate-400'}`}
    />
  </motion.a>
);

const Socmed = () => {
  const { darkTheme, setDarkTheme } = useTheme();
  const currentYear = new Date().getFullYear();

  React.useEffect(() => {
    document.title = 'Awanda — Social Links';
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkTheme ? 'bg-[#050a14] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
        <NavBar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      </header>

      <main className="flex flex-col items-center px-4 pb-16 pt-4">
        {/* Card container — lebar max 400px, terasa seperti mobile card di desktop */}
        <div className={`
          w-full max-w-[400px] rounded-2xl overflow-hidden border
          ${darkTheme
            ? 'bg-[#0d1420] border-white/[0.07]'
            : 'bg-white border-slate-200 shadow-xl shadow-slate-200/40'
          }
        `}>

          {/* ── BANNER ── */}
          <div className="relative h-[100px]">
            {/* Gradient banner */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #4c1d95 0%, #3730a3 50%, #0e7490 100%)',
              }}
            />
            {/* Noise texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Avatar — posisi absolute di bawah banner, overlap ke body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-10"
            >
              <div className="relative">
                {/* Ring gradient di sekeliling avatar */}
                <div className={`
                  absolute inset-[-2px] rounded-full
                  bg-gradient-to-br from-violet-500/70 via-indigo-500/50 to-cyan-400/60
                `} />
                <img
                  src={picture}
                  alt="Awanda"
                  width={80}
                  height={80}
                  className={`
                    relative z-10 w-20 h-20 rounded-full object-cover
                    ${darkTheme ? 'border-[3px] border-[#0d1420]' : 'border-[3px] border-white'}
                  `}
                />
              </div>
            </motion.div>
          </div>

          {/* ── PROFILE BODY ── */}
          <div className="px-6 pb-6 pt-14">

            {/* Name & role */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center mb-4"
            >
              <h1 className="font-display font-extrabold text-xl mb-1">Awanda</h1>
              <p className={`text-xs font-semibold ${darkTheme ? 'text-violet-400' : 'text-violet-600'}`}>
                Fullstack JavaScript Developer
              </p>
            </motion.div>

            {/* Quick links — website & email */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28, duration: 0.45 }}
              className="flex justify-center gap-4 mb-5"
            >
              <a
                href="https://awanda.eu.org"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 text-xs transition-colors
                  ${darkTheme ? 'text-slate-500 hover:text-violet-400' : 'text-slate-600 hover:text-violet-700'}`}
              >
                <Globe size={12} />
                awanda.eu.org
              </a>
              <a
                href="mailto:awand795@gmail.com"
                className={`flex items-center gap-1.5 text-xs transition-colors
                  ${darkTheme ? 'text-slate-500 hover:text-violet-400' : 'text-slate-600 hover:text-violet-700'}`}
              >
                <Mail size={12} />
                awand795@gmail.com
              </a>
            </motion.div>

            {/* Divider */}
            <div className={`h-px mb-5 ${darkTheme ? 'bg-white/[0.06]' : 'bg-slate-100'}`} />

            {/* Social link rows */}
            <div className="flex flex-col gap-2">
              {socialLinks.map((link, i) => (
                <SocialRow key={link.name} link={link} index={i} darkTheme={darkTheme} />
              ))}
            </div>

            {/* Footer */}
            <div className={`mt-6 pt-5 border-t text-center
              ${darkTheme ? 'border-white/[0.05]' : 'border-slate-100'}`}>
              <p className={`text-xs ${darkTheme ? 'text-slate-600' : 'text-slate-500'}`}>
                © {currentYear} Awanda
              </p>
              <p className={`text-xs mt-0.5 ${darkTheme ? 'text-slate-700' : 'text-slate-400'}`}>
                Made with ♥ in Medan
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Socmed;
