import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Globe, Play, Image as ImageIcon } from 'lucide-react';
import { Github } from '../icons/SocialIcons';
import { useLanguage } from '../context/LanguageContext';
import { TiltCard, Magnetic } from '../components/Effects';

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
  accentLight: string;
  media: Media | null;
}

interface CardMediaProps {
  project: Project;
  darkTheme: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  darkTheme: boolean;
}

interface MyProjectProps {
  darkTheme: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Web Absensi Online',
    githubUrl: 'https://github.com/awand795/web-absensi',
    demoUrl: 'https://bikin-absensi.vercel.app',
    tags: ['PHP', 'MySQL', 'Bootstrap'],
    accent: '#3b82f6',
    accentLight: 'rgba(59, 130, 246, 0.1)',
    media: {
      type: 'video',
      src: '/absensi-preview.mp4',
      poster: '/absensi-wide.png',
    },
  },
  {
    id: 2,
    title: 'Point of Sale',
    githubUrl: 'https://github.com/awand795/point-of-sale',
    demoUrl: 'https://pos-bikinsite.vercel.app',
    tags: ['React', 'Laravel', 'Full-Stack'],
    accent: '#f43f5e',
    accentLight: 'rgba(244, 63, 94, 0.1)',
    media: {
      type: 'video',
      src: '/pos-preview.mp4',
      poster: '/pos-poster.png',
    },
  },
  {
    id: 3,
    title: 'Web E-Voting',
    githubUrl: 'https://github.com/awand795/web-evoting',
    tags: ['PHP', 'MySQL', 'Bootstrap'],
    accent: '#10b981',
    accentLight: 'rgba(16, 185, 129, 0.1)',
    media: null,
  },
  {
    id: 4,
    title: 'Web Notes App',
    githubUrl: 'https://github.com/awand795/MevnStack-NotesApp',
    tags: ['Vue.js', 'Express.js', 'MongoDB'],
    accent: '#8b5cf6',
    accentLight: 'rgba(139, 92, 246, 0.1)',
    media: null,
  },
  {
    id: 5,
    title: 'MySQL MCP Server',
    githubUrl: 'https://github.com/awand795/mcp-server-mysql',
    tags: ['Node.js', 'MySQL', 'MCP'],
    accent: '#f59e0b',
    accentLight: 'rgba(245, 158, 11, 0.1)',
    media: null,
  },
  {
    id: 6,
    title: 'Bot WA',
    githubUrl: 'https://github.com/awand795/bot-wa',
    tags: ['Node.js', 'WhatsApp', 'Chromium'],
    accent: '#6366f1',
    accentLight: 'rgba(99, 102, 241, 0.1)',
    media: null,
  },
];

const CardMedia = React.memo(({ project, darkTheme }: CardMediaProps) => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const num = String(project.id).padStart(2, '0');
  const setVideoPlayingMemo = React.useCallback((v: boolean) => setVideoPlaying(v), []);

  if (project.media?.type === 'video') {
    return (
      <div className="relative h-44 overflow-hidden bg-black group-hover:scale-[1.01] transition-transform duration-500">
        <video
          src={project.media.src}
          poster={project.media.poster}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          className="w-full h-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
          onPlay={() => setVideoPlayingMemo(true)}
          onPause={() => setVideoPlayingMemo(false)}
        />
        {!videoPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300">
            <div className="w-10 h-10 rounded-full bg-white/15 border border-white/25 flex items-center justify-center backdrop-blur-md">
              <Play size={14} className="text-white ml-0.5" />
            </div>
          </div>
        )}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 px-2 py-0.5 rounded-full
          bg-neutral-900/80 border border-white/[0.08] backdrop-blur-md">
          <span className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-[9px] font-mono font-semibold tracking-wider text-neutral-300 uppercase">Live Preview</span>
        </div>
      </div>
    );
  }

  if (project.media?.type === 'image') {
    return (
      <div className="relative h-44 overflow-hidden group-hover:scale-[1.01] transition-transform duration-500">
        <img
          src={project.media.src}
          alt={`${project.title} preview`}
          className="w-full h-full object-cover transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 px-2 py-0.5 rounded-full
          bg-neutral-900/80 border border-white/[0.08] backdrop-blur-md">
          <span className="text-[9px] font-mono font-semibold tracking-wider text-neutral-300 uppercase">Shot</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative h-44 flex flex-col justify-between p-5 overflow-hidden transition-all duration-300
        ${darkTheme ? 'bg-[#0f1013]' : 'bg-neutral-100/70'}`}
    >
      {/* Blueprint technical grid background */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(${project.accent} 1.5px, transparent 1.5px)`,
          backgroundSize: '16px 16px'
        }} 
        aria-hidden="true"
      />
      <div className="flex justify-between items-start z-10">
        <span className={`text-[9px] font-mono tracking-widest uppercase py-0.5 px-2 rounded border
          ${darkTheme ? 'border-neutral-800 bg-neutral-950/80 text-neutral-400' : 'border-neutral-200 bg-white text-neutral-500'}`}>
          [ module_no_{num} ]
        </span>
      </div>
      <div className="relative z-10 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: project.accent }} />
        <span className={`text-[10px] font-mono tracking-wider uppercase ${darkTheme ? 'text-neutral-500' : 'text-neutral-500'}`}>
          System Core Integration
        </span>
      </div>
      <span
        className="absolute right-2 -bottom-5 font-display font-black select-none leading-none text-[85px] opacity-[0.05] transition-transform duration-500 group-hover:scale-105"
        style={{ color: project.accent }}
        aria-hidden="true"
      >
        {num}
      </span>
    </div>
  );
});

const ProjectCard = ({ project, darkTheme }: Omit<ProjectCardProps, 'index'>) => {
  const { t } = useLanguage();
  const num = String(project.id).padStart(2, '0');

  return (
    <TiltCard className="h-full">
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t('projects.viewProject')} ${project.title}`}
        className={`
          group relative flex flex-col h-full rounded-[2rem] border overflow-hidden
          transition-all duration-300 hover:shadow-2xl
          ${darkTheme
            ? 'bg-[#0f1013]/60 border-neutral-900 hover:border-neutral-800/80 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]'
            : 'bg-white border-neutral-200/80 hover:border-neutral-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]'
          }
        `}
      >
        {/* Subtle accent border line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
        />

        <CardMedia project={project} darkTheme={darkTheme} />

        <div className="flex flex-col flex-1 p-6">
          <div className="flex justify-between items-center mb-3">
            <span
              className="text-[10px] font-mono font-bold tracking-widest"
              style={{ color: project.accent }}
            >
              {num} //
            </span>
            <span className={`text-[10px] font-mono ${darkTheme ? 'text-neutral-600' : 'text-neutral-400'}`}>
              GITHUB REPO
            </span>
          </div>

          <h3 className={`font-display font-bold text-lg mb-3 tracking-tight group-hover:text-indigo-400 transition-colors
            ${darkTheme ? 'text-neutral-100' : 'text-neutral-800'}`}>
            {project.title}
          </h3>

          <p className={`text-xs leading-relaxed flex-grow mb-6
            ${darkTheme ? 'text-neutral-400/80' : 'text-neutral-600'}`}>
            {t(`projects.desc.${project.id}`)}
          </p>

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold mb-4 transition-transform hover:translate-x-0.5"
              style={{ color: project.accent }}
              onClick={(e) => e.stopPropagation()}
            >
              <Globe size={12} />
              {t('projects.liveDemo')}
              <ArrowUpRight size={10} />
            </a>
          )}

          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded border"
                style={{
                  background: darkTheme ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
                  borderColor: darkTheme ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.07)',
                  color: darkTheme ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className={`flex items-center justify-between text-xs font-semibold
            border-t pt-4 mt-auto
            ${darkTheme ? 'border-neutral-900' : 'border-neutral-100'}`}>
            <span className={`flex items-center gap-1.5 text-xs font-mono tracking-wider group-hover:text-indigo-400 transition-colors
              ${darkTheme ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <Github size={13} className="text-neutral-500" />
              {t('projects.viewProject').toUpperCase()}
            </span>
            <ArrowUpRight
              size={14}
              className="text-neutral-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
            />
          </div>
        </div>
      </a>
    </TiltCard>
  );
};

const MyProject = ({ darkTheme }: MyProjectProps) => {
  const { t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filterOptions = ['All', 'Full-Stack', 'React', 'Node.js', 'PHP'];

  const filteredProjects = selectedFilter === 'All'
    ? projects
    : projects.filter(project => {
        const tagsUpper = project.tags.map(t => t.toLowerCase());
        if (selectedFilter === 'React') {
          return tagsUpper.includes('react') || tagsUpper.includes('vue.js');
        }
        if (selectedFilter === 'Node.js') {
          return tagsUpper.includes('node.js') || tagsUpper.includes('express.js');
        }
        if (selectedFilter === 'PHP') {
          return tagsUpper.includes('php') || tagsUpper.includes('laravel');
        }
        return tagsUpper.includes(selectedFilter.toLowerCase());
      });

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10"
        id="project"
      >
        <p className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-3
          ${darkTheme ? 'text-indigo-400' : 'text-indigo-600'}`}>
          // ARCHIVE & CASE STUDIES
        </p>
        <h2
          className="font-display font-black text-4xl sm:text-5xl mb-4 text-gradient"
        >
          {t('projects.title') || 'Featured Projects'}
        </h2>
        <p className={`text-base sm:text-lg max-w-xl ${darkTheme ? 'text-neutral-400' : 'text-neutral-600'}`}>
          {t('projects.subtitle')}
        </p>
      </motion.div>

      {/* Filter Tabs menu bar */}
      <div className="flex flex-wrap gap-2 mb-10">
        {filterOptions.map((option) => (
          <button
            key={option}
            onClick={() => setSelectedFilter(option)}
            className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all duration-300 border
              ${selectedFilter === option
                ? darkTheme
                  ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
                  : 'bg-indigo-50 border-indigo-200 text-indigo-700 font-bold'
                : darkTheme
                  ? 'bg-transparent border-neutral-900 text-neutral-500 hover:text-neutral-300 hover:border-neutral-800'
                  : 'bg-transparent border-neutral-200 text-neutral-500 hover:text-neutral-800 hover:border-neutral-300'
              }`}
          >
            {option}
          </button>
        ))}
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              key={project.id}
              className="h-full"
            >
              <ProjectCard
                project={project}
                darkTheme={darkTheme}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 rounded-[2rem] border
          ${darkTheme
            ? 'bg-[#0f1013]/30 border-neutral-900'
            : 'bg-white border-neutral-200/80 shadow-sm'}`}
      >
        <Magnetic>
          <motion.a
            href="https://github.com/awand795"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-xs tracking-wider uppercase
              shadow-[0_4px_16px_rgba(79,70,229,0.2)] hover:shadow-[0_6px_24px_rgba(79,70,229,0.4)]
              transition-all duration-300 bg-gradient-primary flex-shrink-0"
          >
            <Github size={14} />
            {t('projects.exploreMore')}
          </motion.a>
        </Magnetic>
        <p className={`text-xs font-mono tracking-wide ${darkTheme ? 'text-neutral-400' : 'text-neutral-600'}`}>
          {t('projects.moreText')}
        </p>
      </motion.div>
    </div>
  );
};

export default MyProject;
