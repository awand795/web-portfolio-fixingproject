import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

interface SkillsSectionProps {
  darkTheme: boolean;
}

interface Tech {
  img: string;
  name: string;
  url: string;
  desc: string;
}

interface SkillCategory {
  title: string;
  label: string;
  techs: Tech[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Client Interfaces',
    label: 'FRONTEND & MOBILE',
    techs: [
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', name: 'React', url: 'https://react.dev', desc: 'Single-page web applications & component-driven designs' },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', name: 'Flutter', url: 'https://flutter.dev', desc: 'Cross-platform native mobile applications (iOS / Android)' },
    ]
  },
  {
    title: 'Server Engineering',
    label: 'BACKEND APIS & SYSTEMS',
    techs: [
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg', name: 'Laravel', url: 'https://laravel.com', desc: 'MVC web architecture, robust queues, and API services' },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', name: 'Express.js', url: 'https://expressjs.com', desc: 'Fast, unopinionated Node.js REST API backends' },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', name: 'Spring Boot', url: 'https://spring.io', desc: 'Enterprise Java backend services and microservices' },
    ]
  },
  {
    title: 'Data & Environment',
    label: 'STORAGE & DEV OPS',
    techs: [
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', name: 'MySQL', url: 'https://www.mysql.com', desc: 'Relational database schema modeling & optimization' },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', name: 'PostgreSQL', url: 'https://www.postgresql.org', desc: 'Advanced relational database features & JSON query sets' },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', name: 'Docker', url: 'https://www.docker.com', desc: 'Containerized deployment setups and local environments' },
      { img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', name: 'Git', url: 'https://git-scm.com', desc: 'Collaborative code versioning and branch architecture' },
    ]
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const TechRow = memo(({ img, name, url, desc, darkTheme }: Tech & { darkTheme: boolean }) => (
  <motion.a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`${name} official website`}
    whileHover={{ x: 6 }}
    className={`
      flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 group
      ${darkTheme
        ? 'bg-[#0f1013]/30 border-neutral-900 hover:border-neutral-800/80 hover:bg-[#121316]/50'
        : 'bg-white border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 shadow-sm'
      }
    `}
  >
    <div className={`
      flex items-center justify-center w-12 h-12 rounded-xl p-2.5 transition-transform duration-500 group-hover:scale-105
      ${darkTheme ? 'bg-neutral-900/60 border border-neutral-800' : 'bg-neutral-100 border border-neutral-200'}
    `}>
      <img src={img} alt={`${name} logo`} className="w-full h-full object-contain filter dark:brightness-95" loading="lazy" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5">
        <h4 className={`text-sm font-bold tracking-tight transition-colors group-hover:text-indigo-400
          ${darkTheme ? 'text-neutral-200' : 'text-neutral-800'}`}>
          {name}
        </h4>
        <ArrowUpRight size={12} className="text-neutral-500 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <p className={`text-xs truncate ${darkTheme ? 'text-neutral-500' : 'text-neutral-500'}`}>
        {desc}
      </p>
    </div>
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
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div variants={fadeUp} className="mb-14">
          <p className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-3 ${darkTheme ? 'text-indigo-400' : 'text-indigo-600'}`}>
            // CAPABILITIES & TECH STACK
          </p>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-gradient mb-4">
            {t('skills.title') || 'Expertise Matrix'}
          </h2>
          <p className={`text-base sm:text-lg max-w-xl ${darkTheme ? 'text-neutral-400' : 'text-neutral-600'}`}>
            {t('skills.description.before')}{' '}
            <span className={`font-semibold ${darkTheme ? 'text-indigo-400' : 'text-indigo-700'}`}>Web & Mobile</span>
            {' '}{t('skills.description.mid')}{' '}
            <span className={`font-semibold ${darkTheme ? 'text-blue-400' : 'text-blue-700'}`}>React</span>
            {' '}{t('skills.description.and')}{' '}
            <span className={`font-semibold ${darkTheme ? 'text-emerald-400' : 'text-emerald-700'}`}>Flutter</span>
            {' '}{t('skills.description.after')}
          </p>
        </motion.div>

        {/* Structured Dashboard Layout */}
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <motion.div 
              key={category.title}
              variants={fadeUp}
              className={`p-6 rounded-[2rem] border flex flex-col gap-6
                ${darkTheme 
                  ? 'bg-[#0f1013]/20 border-neutral-900' 
                  : 'bg-neutral-50/50 border-neutral-200'}`}
            >
              <div>
                <span className={`text-[9px] font-mono tracking-widest uppercase block mb-1
                  ${darkTheme ? 'text-neutral-600' : 'text-neutral-400'}`}>
                  {category.label}
                </span>
                <h3 className={`font-display font-bold text-lg tracking-tight
                  ${darkTheme ? 'text-neutral-200' : 'text-neutral-850'}`}>
                  {category.title}
                </h3>
              </div>
              
              <div className="flex flex-col gap-3">
                {category.techs.map((tech) => (
                  <TechRow key={tech.name} {...tech} darkTheme={darkTheme} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
