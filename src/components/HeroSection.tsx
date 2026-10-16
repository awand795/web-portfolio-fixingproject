import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Download } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import picture from '../image/imgprofile.webp';
import { TextReveal } from './Effects';

interface HeroSectionProps {
  darkTheme: boolean;
}

const CORE_STACK = [
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', name: 'React' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg', name: 'Laravel' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', name: 'Flutter' },
  { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', name: 'PostgreSQL' },
];

const HeroSection = ({ darkTheme }: HeroSectionProps) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="home" className="pt-14 pb-16 lg:pt-20 lg:pb-24">
      <div ref={containerRef} className="w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-14 items-center">

        {/* Text content side */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="order-2 lg:order-1 text-center lg:text-left"
        >
          {/* Availability pill — editorial, calm */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-5">
            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-mono tracking-widest uppercase
              ${darkTheme
                ? 'bg-neutral-900/70 border-neutral-800 text-neutral-300'
                : 'bg-white border-neutral-200 text-neutral-600 shadow-sm'}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {t('hero.greeting')}
            </span>
          </motion.div>

          {/* Name — solid editorial, period accent */}
          <div className="mb-3">
            <TextReveal>
              <h1
                className={`font-display font-black leading-[0.95] tracking-tighter ${darkTheme ? 'text-neutral-50' : 'text-neutral-950'}`}
                style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)' }}
              >
                Awanda<span className="text-indigo-500">.</span>
              </h1>
            </TextReveal>
          </div>

          {/* Role */}
          <motion.div variants={itemVariants} className="mb-5">
            <p className={`flex items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm font-mono tracking-widest uppercase
              ${darkTheme ? 'text-neutral-400' : 'text-neutral-500'}`}
            >
              <span className={`hidden sm:inline-block h-px w-8 ${darkTheme ? 'bg-neutral-700' : 'bg-neutral-300'}`} aria-hidden="true" />
              {t('hero.title')}
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className={`text-base sm:text-lg leading-relaxed mb-8 max-w-[540px] mx-auto lg:mx-0
              ${darkTheme ? 'text-neutral-400' : 'text-neutral-600'}`}
          >
            {t('hero.description')}
          </motion.p>

          {/* CTAs — editorial: solid + ghost */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-10 justify-center lg:justify-start items-center">
            <motion.a
              href="/files/CV Fullstack Developer - Awanda.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300
                ${darkTheme
                  ? 'bg-neutral-50 text-neutral-950 hover:bg-white'
                  : 'bg-neutral-950 text-white hover:bg-neutral-800'}`}
            >
              <Download size={15} />
              {t('hero.downloadCv')}
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`inline-flex items-center gap-1.5 px-6 py-3 rounded-full font-semibold text-sm border transition-all duration-300
                ${darkTheme
                  ? 'border-neutral-800 text-neutral-300 hover:border-neutral-600 hover:text-white'
                  : 'border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:text-neutral-950'}`}
            >
              {t('hero.getInTouch')}
              <ArrowUpRight size={15} />
            </motion.a>
          </motion.div>

          {/* Credible stats */}
          <motion.div
            variants={itemVariants}
            className={`grid grid-cols-3 gap-4 py-6 border-t max-w-[540px] mx-auto lg:mx-0
              ${darkTheme ? 'border-neutral-900' : 'border-neutral-200'}`}
          >
            {[
              { num: t('hero.stat1num'), label: t('hero.stat1label') },
              { num: t('hero.stat2num'), label: t('hero.stat2label') },
              { num: t('hero.stat3num'), label: t('hero.stat3label') },
            ].map((stat) => (
              <div key={stat.label} className="text-left">
                <p className={`font-display font-bold text-base sm:text-lg leading-tight mb-1
                  ${darkTheme ? 'text-neutral-100' : 'text-neutral-900'}`}>
                  {stat.num}
                </p>
                <p className={`text-[11px] font-mono tracking-wider uppercase ${darkTheme ? 'text-neutral-500' : 'text-neutral-500'}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Proof strip */}
          <motion.div variants={itemVariants} className="mt-6 flex items-center justify-center lg:justify-start gap-4">
            <span className={`text-[10px] font-mono tracking-[0.2em] uppercase ${darkTheme ? 'text-neutral-600' : 'text-neutral-400'}`}>
              {t('hero.proofLabel')}
            </span>
            <div className="flex items-center gap-3">
              {CORE_STACK.map((s) => (
                <img
                  key={s.name}
                  src={s.img}
                  alt={s.name}
                  title={s.name}
                  loading="lazy"
                  className="w-5 h-5 object-contain opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Profile — editorial treatment, reuse existing photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center lg:justify-end order-1 lg:order-2"
        >
          <figure className="relative w-[280px] sm:w-[340px] lg:w-[380px]">
            {/* subtle glow */}
            <div
              className={`absolute -inset-6 rounded-[2rem] blur-3xl pointer-events-none ${darkTheme ? 'bg-indigo-500/[0.07]' : 'bg-indigo-500/[0.08]'}`}
              aria-hidden="true"
            />
            <div className={`relative overflow-hidden rounded-3xl border ${darkTheme
              ? 'border-neutral-800 bg-neutral-900 shadow-[0_24px_60px_rgba(0,0,0,0.5)]'
              : 'border-neutral-200 bg-white shadow-[0_24px_50px_rgba(0,0,0,0.10)]'}`}
            >
              <img
                src={picture}
                alt="Awanda — Software Engineer"
                fetchPriority="high"
                width={380}
                height={460}
                className="w-full h-[340px] sm:h-[400px] lg:h-[440px] object-cover object-top contrast-[1.03] saturate-[0.92]"
              />
              {/* duotone wash + bottom caption legibility */}
              <div className={`absolute inset-0 pointer-events-none ${darkTheme ? 'bg-gradient-to-t from-black/55 via-transparent to-indigo-950/10' : 'bg-gradient-to-t from-neutral-950/45 via-transparent to-transparent'}`} aria-hidden="true" />
              <figcaption className="absolute bottom-0 inset-x-0 flex items-center justify-between px-4 py-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/90">
                  {t('hero.photoCaption')}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-white bg-white/15 border border-white/20 backdrop-blur-md px-2 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {t('hero.photoStatus')}
                </span>
              </figcaption>
            </div>
          </figure>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
