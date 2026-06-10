import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Github } from '../icons/SocialIcons';
import { useLanguage } from '../context/LanguageContext';

const projects = [
  {
    id: 1,
    title: 'Web Absensi Online',
    githubUrl: 'https://github.com/awand795/web-absensi',
    tags: ['PHP', 'MySQL', 'Bootstrap'],
    accent: '#7c3aed',
    accentLight: 'rgba(124,58,237,0.15)',
  },
  {
    id: 2,
    title: 'Point of Sale',
    githubUrl: 'https://github.com/awand795/point-of-sale',
    tags: ['React', 'Laravel', 'Full-Stack'],
    accent: '#f43f5e',
    accentLight: 'rgba(244,63,94,0.15)',
  },
  {
    id: 3,
    title: 'Web E-Voting',
    githubUrl: 'https://github.com/awand795/web-evoting',
    tags: ['PHP', 'MySQL', 'Bootstrap'],
    accent: '#06b6d4',
    accentLight: 'rgba(6,182,212,0.15)',
  },
  {
    id: 4,
    title: 'Web Notes App',
    githubUrl: 'https://github.com/awand795/MevnStack-NotesApp',
    tags: ['Vue.js', 'Express.js', 'MongoDB'],
    accent: '#10b981',
    accentLight: 'rgba(16,185,129,0.15)',
  },
  {
    id: 5,
    title: 'MySQL MCP Server',
    githubUrl: 'https://github.com/awand795/mcp-server-mysql',
    tags: ['Node.js', 'MySQL', 'MCP'],
    accent: '#f59e0b',
    accentLight: 'rgba(245,158,11,0.15)',
  },
  {
    id: 6,
    title: 'Bot WA',
    githubUrl: 'https://github.com/awand795/bot-wa',
    tags: ['Node.js', 'WhatsApp', 'Chromium'],
    accent: '#8b5cf6',
    accentLight: 'rgba(139,92,246,0.15)',
  },
];

const ProjectCard = ({ project, index, darkTheme }) => {
  const { t } = useLanguage();
  const num = String(project.id).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
    >
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t('projects.viewProject')} ${project.title}`}
        className={`
          group relative flex flex-col h-full p-6 rounded-2xl border overflow-hidden
          transition-all duration-300
          ${darkTheme
            ? 'bg-white/[0.025] border-white/[0.07] hover:border-white/[0.15] hover:bg-white/[0.05]'
            : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-lg'
          }
        `}
      >
        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
        />

        {/* Card number */}
        <div
          className="text-4xl font-extrabold font-display leading-none mb-4 select-none"
          style={{ color: project.accent, opacity: 0.6 }}
        >
          {num}
        </div>

        {/* Title */}
        <h3 className={`font-display font-bold text-lg mb-3 ${darkTheme ? 'text-slate-100' : 'text-slate-900'} transition-colors`}>
          {project.title}
        </h3>

        {/* Description */}
        <p className={`text-sm leading-relaxed flex-grow mb-4 ${darkTheme ? 'text-slate-400' : 'text-slate-600'}`}>
          {t(`projects.desc.${project.id}`)}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold px-2.5 py-1 rounded-md border transition-all duration-200"
              style={{
                background: darkTheme ? project.accentLight : `${project.accent}12`,
                borderColor: `${project.accent}35`,
                color: darkTheme ? project.accent : project.accent,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer link */}
        <div className={`flex items-center justify-between text-sm font-semibold border-t pt-4 transition-colors ${darkTheme ? 'border-white/[0.06]' : 'border-slate-100'}`}>
          <span className="flex items-center gap-2" style={{ color: project.accent }}>
            <Github size={16} />
            {t('projects.viewProject')}
          </span>
          <ArrowUpRight
            size={16}
            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200"
            style={{ color: project.accent }}
          />
        </div>
      </a>
    </motion.div>
  );
};

const MyProject = ({ darkTheme }) => {
  const { t } = useLanguage();

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
        id="project"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="w-1 h-6 rounded-full bg-gradient-to-b from-violet-500 to-cyan-400" />
          <span className={`text-xs font-bold tracking-[0.2em] uppercase ${darkTheme ? 'text-violet-400' : 'text-violet-600'}`}>
            {t('projects.title')}
          </span>
        </div>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl mb-4"
          style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          {t('projects.title')}
        </h2>
        <p className={`text-base sm:text-lg max-w-xl ${darkTheme ? 'text-slate-400' : 'text-slate-600'}`}>
          {t('projects.subtitle')}
        </p>
      </motion.div>

      {/* Grid 3 kolom */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            darkTheme={darkTheme}
          />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
      >
        <motion.a
          href="https://github.com/awand795"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm shadow-[0_4px_20px_rgba(124,58,237,0.35)] hover:shadow-[0_6px_28px_rgba(124,58,237,0.55)] transition-all duration-300"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <Github size={18} />
          {t('projects.exploreMore')}
        </motion.a>
        <p className={`text-sm ${darkTheme ? 'text-slate-500' : 'text-slate-400'}`}>
          {t('projects.moreText')}
        </p>
      </motion.div>
    </div>
  );
};

export default MyProject;
