import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Globe, Play } from 'lucide-react';
import { Github } from '../icons/SocialIcons';
import { useLanguage } from '../context/LanguageContext';

interface Media {
  type: 'image' | 'video';
  src: string;
  poster?: string;
}

interface Project {
  id: number;
  title: string;
  githubUrl: string;
  demoUrl?: string;
  tags: string[];
  accent: string;
  media: Media | null;
  featured?: boolean;
}

interface MyProjectProps {
  darkTheme: boolean;
}

const projects: Project[] = [
  {
    id: 2,
    title: 'Point of Sale',
    githubUrl: 'https://github.com/awand795/point-of-sale',
    demoUrl: 'https://pos-bikinsite.vercel.app',
    tags: ['React', 'Laravel', 'Full-Stack'],
    accent: '#6366f1',
    featured: true,
    media: { type: 'video', src: '/pos-preview.mp4', poster: '/pos-poster.png' },
  },
  {
    id: 1,
    title: 'Web Absensi Online',
    githubUrl: 'https://github.com/awand795/web-absensi',
    demoUrl: 'https://bikin-absensi.vercel.app',
    tags: ['PHP', 'MySQL'],
    accent: '#3b82f6',
    media: { type: 'video', src: '/absensi-preview.mp4', poster: '/absensi-wide.png' },
  },
  {
    id: 5,
    title: 'MySQL MCP Server',
    githubUrl: 'https://github.com/awand795/mcp-server-mysql',
    tags: ['Node.js', 'AI / MCP'],
    accent: '#f59e0b',
    media: null,
  },
  {
    id: 3,
    title: 'Web E-Voting',
    githubUrl: 'https://github.com/awand795/web-evoting',
    tags: ['PHP', 'MySQL'],
    accent: '#10b981',
    media: null,
  },
  {
    id: 6,
    title: 'Bot WA',
    githubUrl: 'https://github.com/awand795/bot-wa',
    tags: ['Node.js', 'WhatsApp'],
    accent: '#6366f1',
    media: null,
  },
  {
    id: 4,
    title: 'Web Notes App',
    githubUrl: 'https://github.com/awand795/MevnStack-NotesApp',
    tags: ['Vue.js', 'Express'],
    accent: '#8b5cf6',
    media: null,
  },
];

const BrowserChrome = ({ darkTheme }: { darkTheme: boolean }) => (
  <div className={`flex items-center gap-1.5 px-4 py-3 border-b ${darkTheme ? 'border-neutral-800/80' : 'border-neutral-200'}`} aria-hidden="true">
    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
    <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
    <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
  </div>
);

const CardMedia = React.memo(({ project, darkTheme, large }: { project: Project; darkTheme: boolean; large?: boolean }) => {
  const height = large ? 'h-56 sm:h-64' : 'h-44';

  if (project.media?.type === 'video') {
    return (
      <div className={`relative ${height} overflow-hidden bg-black`}>
        <video
          src={project.media.src}
          poster={project.media.poster}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-neutral-950/70 border border-white/10 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <Play size={10} className="text-white" />
        </div>
      </div>
    );
  }

  // Editorial poster for projects without media — equal visual weight
  return (
    <div className={`relative ${height} overflow-hidden flex flex-col ${darkTheme ? 'bg-neutral-900/40' : 'bg-neutral-100'}`}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(120% 100% at 100% 0%, ${project.accent}26 0%, transparent 55%)` }}
        aria-hidden="true"
      />
      <BrowserChrome darkTheme={darkTheme} />
      <div className="relative flex-1 flex flex-col justify-end p-5">
        <p className={`font-display font-black tracking-tight leading-none ${large ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}
          style={{ color: darkTheme ? '#fff' : '#111' }}>
          {project.title}
        </p>
        <p className={`mt-2 text-xs font-mono tracking-widest uppercase ${darkTheme ? 'text-neutral-500' : 'text-neutral-500'}`}>
          {project.tags.join('  •  ')}
        </p>
        <span
          className="absolute right-3 bottom-0 font-display font-black select-none leading-none text-[72px] opacity-10"
          style={{ color: project.accent }}
          aria-hidden="true"
        >
          {String(project.id).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
});

const ProjectCard = ({ project, darkTheme, large }: { project: Project; darkTheme: boolean; large?: boolean }) => {
  const { t } = useLanguage();

  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t('projects.viewProject')} ${project.title}`}
      className={`group relative flex flex-col h-full rounded-3xl border overflow-hidden transition-all duration-300 hover:-translate-y-1
        ${darkTheme
          ? 'bg-[#0e0f12] border-neutral-800/80 hover:border-neutral-700 hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)]'
          : 'bg-white border-neutral-200 hover:border-neutral-300 hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)]'
        } ${large ? 'lg:col-span-2 lg:grid lg:grid-cols-2' : ''}`}
    >
      <CardMedia project={project} darkTheme={darkTheme} large={large} />

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-mono font-bold tracking-widest" style={{ color: project.accent }}>
            {String(project.id).padStart(2, '0')} //
          </span>
          {project.demoUrl ? (
            <span
              role="link"
              tabIndex={0}
              onClick={(e) => { e.stopPropagation(); window.open(project.demoUrl, '_blank', 'noopener'); }}
              onKeyDown={(e) => { if (e.key === 'Enter') window.open(project.demoUrl, '_blank', 'noopener'); }}
              className="inline-flex items-center gap-1 text-xs font-semibold hover:underline"
              style={{ color: project.accent }}
            >
              <Globe size={12} />
              {t('projects.liveDemo')}
            </span>
          ) : (
            <span className={`text-[10px] font-mono tracking-widest uppercase ${darkTheme ? 'text-neutral-600' : 'text-neutral-400'}`}>
              GitHub Repo
            </span>
          )}
        </div>

        <h3 className={`font-display font-bold tracking-tight mb-2 ${large ? 'text-2xl' : 'text-lg'} ${darkTheme ? 'text-neutral-50' : 'text-neutral-950'}`}>
          {project.title}
        </h3>

        <p className={`text-sm font-medium mb-2 ${darkTheme ? 'text-neutral-300' : 'text-neutral-700'}`}>
          {t(`projects.outcome.${project.id}`)}
        </p>
        <p className={`text-sm leading-relaxed mb-5 line-clamp-2 ${darkTheme ? 'text-neutral-500' : 'text-neutral-500'}`}>
          {t(`projects.desc.${project.id}`)}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`text-[10px] font-mono tracking-wider uppercase px-2 py-1 rounded-md border
                ${darkTheme ? 'border-neutral-800 text-neutral-400 bg-white/[0.02]' : 'border-neutral-200 text-neutral-600 bg-neutral-50'}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className={`flex items-center justify-between text-xs font-semibold border-t pt-4 mt-auto
          ${darkTheme ? 'border-neutral-800/80' : 'border-neutral-100'}`}>
          <span className={`flex items-center gap-1.5 font-mono tracking-wider uppercase ${darkTheme ? 'text-neutral-400' : 'text-neutral-600'}`}>
            <Github size={13} />
            {t('projects.viewProject').toUpperCase()}
          </span>
          <ArrowUpRight size={16} className="text-neutral-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
      </div>
    </a>
  );
};

const MyProject = ({ darkTheme }: MyProjectProps) => {
  const { t } = useLanguage();

  return (
    <div id="project" className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
      >
        <div>
          <p className={`text-[11px] font-mono font-bold tracking-[0.25em] uppercase mb-3 ${darkTheme ? 'text-neutral-500' : 'text-neutral-500'}`}>
            <span className="text-indigo-500">//</span> {t('projects.kicker')}
          </p>
          <h2 className={`font-display font-black text-4xl sm:text-5xl tracking-tight mb-3 ${darkTheme ? 'text-neutral-50' : 'text-neutral-950'}`}>
            {t('projects.title')}
          </h2>
          <p className={`text-base max-w-xl ${darkTheme ? 'text-neutral-400' : 'text-neutral-600'}`}>
            {t('projects.subtitle')}
          </p>
        </div>
        <a
          href="https://github.com/awand795"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold shrink-0 hover:gap-2.5 transition-all ${darkTheme ? 'text-neutral-300 hover:text-white' : 'text-neutral-700 hover:text-neutral-950'}`}
        >
          {t('projects.exploreMore')}
          <ArrowRight size={15} />
        </a>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={project.featured ? 'md:col-span-2 lg:col-span-2' : ''}
          >
            <ProjectCard project={project} darkTheme={darkTheme} large={project.featured} />
          </motion.div>
        ))}
      </div>

      <p className={`mt-6 text-xs font-mono tracking-wide ${darkTheme ? 'text-neutral-600' : 'text-neutral-500'}`}>
        {t('projects.moreText')}
      </p>
    </div>
  );
};

export default MyProject;
