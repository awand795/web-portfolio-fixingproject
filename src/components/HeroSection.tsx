import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import picture from '../image/imgprofile.webp';

interface HeroSectionProps {
  darkTheme: boolean;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const HeroSection = ({ darkTheme }: HeroSectionProps) => {
  const { t } = useLanguage();
  const [typedText, setTypedText] = useState('');
  const fullText = t('hero.title');
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const heroRef = useRef<HTMLElement>(null);

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

  return (
    <section id="home" ref={heroRef} className="min-h-[88vh] flex items-center pt-4 pb-16">
      <div className="w-full grid lg:grid-cols-[1fr_420px] gap-16 items-center">

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 lg:order-1 text-center lg:text-left"
        >
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

          <div className="mb-6 h-9 flex items-center justify-center lg:justify-start">
            <h2
              className={`text-lg sm:text-xl font-semibold border-r-2 pr-1 leading-none
                ${darkTheme ? 'text-slate-300 border-violet-500' : 'text-slate-600 border-violet-600'}`}
              style={{ animation: 'blink 0.75s step-end infinite' }}
            >
              {typedText}
            </h2>
          </div>

          <p className={`
            text-base sm:text-lg leading-relaxed mb-10 max-w-[520px] mx-auto lg:mx-0
            ${darkTheme ? 'text-slate-400' : 'text-slate-600'}
          `}>
            {t('hero.description')}
          </p>

          <div className="flex flex-wrap gap-3 mb-14 justify-center lg:justify-start">
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
                hover:shadow-[0_4px_24px_rgba(124,58,237,0.55)] bg-gradient-primary"
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

          <div className={`
            flex items-center justify-center lg:justify-start gap-8 pt-8 border-t
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
              alt="Awanda — Software Developer"
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
  );
};

export default HeroSection;
