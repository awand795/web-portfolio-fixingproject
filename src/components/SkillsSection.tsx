import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface SkillsSectionProps {
  darkTheme: boolean;
}

interface Tech {
  img: string;
  name: string;
  url: string;
}

interface TechLogoProps {
  img: string;
  name: string;
  url: string;
  darkTheme: boolean;
}

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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const TechLogo = memo(({ img, name, url, darkTheme }: TechLogoProps) => (
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
));

const SkillsSection = ({ darkTheme }: SkillsSectionProps) => {
  const { t } = useLanguage();

  return (
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
  );
};

export default SkillsSection;
