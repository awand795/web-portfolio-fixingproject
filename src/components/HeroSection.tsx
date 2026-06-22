import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import picture from '../image/imgprofile.webp';
import { Magnetic, TextReveal } from './Effects';

interface HeroSectionProps {
  darkTheme: boolean;
}

const HeroSection = ({ darkTheme }: HeroSectionProps) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // Stagger variants for entry animations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Premium easeOutExpo
      },
    },
  };

  return (
    <section id="home" className="min-h-[75vh] lg:min-h-[600px] lg:max-h-[800px] flex items-center pt-8 pb-16">
      <div ref={containerRef} className="w-full grid lg:grid-cols-[1fr_450px] gap-12 lg:gap-16 items-center">
        
        {/* Text content side */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="order-2 lg:order-1 text-center lg:text-left"
        >
          {/* Greeting pill */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono tracking-wider uppercase
              ${darkTheme 
                ? 'bg-neutral-900/60 border-neutral-800 text-indigo-400' 
                : 'bg-white border-neutral-200 text-indigo-600 shadow-sm'}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {t('hero.greeting')}
            </span>
          </motion.div>

          {/* Hero title with Mask Reveal */}
          <div className="mb-4">
            <TextReveal>
              <h1
                className="font-display font-black leading-[0.95] tracking-tighter text-gradient pb-2"
                style={{
                  fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                }}
              >
                Awanda
              </h1>
            </TextReveal>
          </div>

          {/* Subtitle / Role */}
          <motion.div variants={itemVariants} className="mb-6">
            <h2 className={`text-xs sm:text-sm font-mono tracking-widest uppercase
              ${darkTheme ? 'text-indigo-400/90' : 'text-indigo-600'}`}
            >
              // {t('hero.title')}
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className={`text-base sm:text-lg leading-relaxed mb-10 max-w-[500px] mx-auto lg:mx-0
              ${darkTheme ? 'text-neutral-400' : 'text-neutral-600'}`}
          >
            {t('hero.description')}
          </motion.p>

          {/* CTA Buttons with Magnetic Pull */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-14 justify-center lg:justify-start items-center">
            <Magnetic>
              <motion.a
                href="/files/CV Fullstack Developer - Awanda.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-semibold
                  text-white text-sm transition-all duration-300
                  shadow-[0_4px_20px_rgba(79,70,229,0.25)] hover:shadow-[0_6px_28px_rgba(79,70,229,0.45)] 
                  bg-gradient-primary"
              >
                <Download size={15} />
                {t('hero.downloadCv')}
              </motion.a>
            </Magnetic>

            <Magnetic>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-semibold text-sm
                  border transition-all duration-300
                  ${darkTheme
                    ? 'border-neutral-800 bg-neutral-900/30 text-neutral-300 hover:bg-neutral-800 hover:text-white'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 shadow-sm'
                  }
                `}
              >
                <Mail size={15} />
                {t('hero.getInTouch')}
              </motion.a>
            </Magnetic>
          </motion.div>

          {/* Key Facts / Stats */}
          <motion.div 
            variants={itemVariants}
            className={`flex items-center justify-center lg:justify-start gap-12 pt-8 border-t
              ${darkTheme ? 'border-neutral-900' : 'border-neutral-200'}`}
          >
            {[
              { num: 'Web + Mobile', label: 'Fullstack Focus' },
              { num: 'Clean Code', label: 'Architecture' },
              { num: 'Coffee', label: 'Work Fuel' },
            ].map((stat) => (
              <div key={stat.label} className="text-left">
                <p className={`font-display font-extrabold text-xl leading-none mb-1.5
                  ${darkTheme ? 'text-neutral-100' : 'text-neutral-800'}`}>
                  {stat.num}
                </p>
                <p className={`text-xs font-mono tracking-wider uppercase ${darkTheme ? 'text-neutral-500' : 'text-neutral-500'}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Profile Image side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center order-1 lg:order-2"
        >
          <div className="relative group">
            {/* Geometric shadow card */}
            <div className={`
              absolute inset-0 rounded-[2.5rem] border translate-x-4 translate-y-4 transition-transform duration-500 
              group-hover:translate-x-2 group-hover:translate-y-2
              ${darkTheme 
                ? 'border-indigo-500/20 bg-indigo-500/[0.02]' 
                : 'border-neutral-300 bg-neutral-200/50'}`} 
              aria-hidden="true" 
            />

            {/* Asymmetrical profile frame */}
            <div className={`
              relative overflow-hidden rounded-[2.5rem] border transition-all duration-500 
              group-hover:-translate-y-1 
              ${darkTheme 
                ? 'border-neutral-800 bg-neutral-900/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:shadow-[0_25px_60px_rgba(79,70,229,0.15)]' 
                : 'border-neutral-200 bg-white shadow-[0_15px_35px_rgba(0,0,0,0.05)] group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.15)]'}`}
            >
              <img
                src={picture}
                alt="Awanda — Software Developer"
                fetchPriority="high"
                width={380}
                height={380}
                className="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[380px] lg:h-[380px] object-cover scale-[1.01] transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
