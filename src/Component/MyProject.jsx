import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play, Image as ImageIcon } from 'lucide-react';
import { Github } from '../icons/SocialIcons';
import { useLanguage } from '../context/LanguageContext';

/*
  ─────────────────────────────────────────────────────
  DATA PROJECTS
  Tambahkan field `media` untuk setiap project:

  media: {
    type: 'image',           // 'image' | 'video' | null
    src: '/previews/absensi.png',  // path dari folder /public/previews/
    poster: '/previews/pos.jpg',   // (opsional, untuk video: thumbnail sebelum play)
  }

  Untuk menambahkan file media:
  1. Buat folder: /public/previews/
  2. Masukkan file gambar/video ke sana (jpg, png, webp, mp4)
  3. Referensikan dengan path: '/previews/nama-file.ext'

  Jika `media: null` atau field tidak ada, card akan tampil dengan
  placeholder gradien + nomor proyek.
  ─────────────────────────────────────────────────────
*/
const projects = [
  {
    id: 1,
    title: 'Web Absensi Online',
    githubUrl: 'https://github.com/awand795/web-absensi',
    tags: ['PHP', 'MySQL', 'Bootstrap'],
    accent: '#7c3aed',
    accentLight: 'rgba(124,58,237,0.15)',
    media: null,
  },
  {
    id: 2,
    title: 'Point of Sale',
    githubUrl: 'https://github.com/awand795/point-of-sale',
    tags: ['React', 'Laravel', 'Full-Stack'],
    accent: '#f43f5e',
    accentLight: 'rgba(244,63,94,0.15)',
    media: null,
  },
  {
    id: 3,
    title: 'Web E-Voting',
    githubUrl: 'https://github.com/awand795/web-evoting',
    tags: ['PHP', 'MySQL', 'Bootstrap'],
    accent: '#06b6d4',
    accentLight: 'rgba(6,182,212,0.15)',
    media: null,
  },
  {
    id: 4,
    title: 'Web Notes App',
    githubUrl: 'https://github.com/awand795/MevnStack-NotesApp',
    tags: ['Vue.js', 'Express.js', 'MongoDB'],
    accent: '#10b981',
    accentLight: 'rgba(16,185,129,0.15)',
    media: null,
  },
  {
    id: 5,
    title: 'MySQL MCP Server',
    githubUrl: 'https://github.com/awand795/mcp-server-mysql',
    tags: ['Node.js', 'MySQL', 'MCP'],
    accent: '#f59e0b',
    accentLight: 'rgba(245,158,11,0.15)',
    media: null,
  },
  {
    id: 6,
    title: 'Bot WA',
    githubUrl: 'https://github.com/awand795/bot-wa',
    tags: ['Node.js', 'WhatsApp', 'Chromium'],
    accent: '#8b5cf6',
    accentLight: 'rgba(139,92,246,0.15)',
    media: null,
  },
];

/* ── Media area di atas card ── */
const CardMedia = ({ project, darkTheme }) => {
  const videoRef = useRef(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const num = String(project.id).padStart(2, '0');

  // ── Video ──
  if (project.media?.type === 'video') {
    return (
      <div className="relative h-40 overflow-hidden bg-black group">
        <video
          ref={videoRef}
          src={project.media.src}
          poster={project.media.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          onMouseEnter={() => { videoRef.current?.play(); setVideoPlaying(true); }}
          onMouseLeave={() => { videoRef.current?.pause(); setVideoPlaying(false); }}
        />
        {/* Play hint saat belum hover */}
        {!videoPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:opacity-0 transition-opacity duration-300">
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
              <Play size={14} className="text-white ml-0.5" />
            </div>
          </div>
        )}
        {/* Label */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-md
          bg-black/50 border border-white/10 backdrop-blur-sm">
          <Play size={9} className="text-slate-300" />
          <span className="text-[10px] font-semibold text-slate-300">Preview</span>
        </div>
      </div>
    );
  }

  // ── Image ──
  if (project.media?.type === 'image') {
    return (
      <div className="relative h-40 overflow-hidden group">
        <img
          src={project.media.src}
          alt={`${project.title} preview`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        {/* Gradient overlay bawah untuk readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {/* Label */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-md
          bg-black/50 border border-white/10 backdrop-blur-sm">
          <ImageIcon size={9} className="text-slate-300" />
          <span className="text-[10px] font-semibold text-slate-300">Preview</span>
        </div>
      </div>
    );
  }

  // ── Placeholder (belum ada media) ──
  return (
    <div
      className={`relative h-40 flex items-end p-4 overflow-hidden
        ${darkTheme ? 'bg-[#0a0f1c]' : 'bg-slate-50'}`}
    >
      {/* Angka besar sebagai latar belakang */}
      <span
        className="absolute right-4 top-1/2 -translate-y-1/2 font-display font-extrabold
          select-none leading-none text-[80px] opacity-[0.06]"
        style={{ color: project.accent }}
        aria-hidden="true"
      >
        {num}
      </span>
      {/* Glow lingkaran kecil di sudut */}
      <div
        className="absolute top-[-20px] left-[-20px] w-28 h-28 rounded-full blur-2xl opacity-[0.15]"
        style={{ background: project.accent }}
        aria-hidden="true"
      />
      {/* Label placeholder */}
      <div className={`
        relative z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md border
        ${darkTheme
          ? 'bg-white/[0.04] border-white/[0.07] text-slate-600'
          : 'bg-slate-100 border-slate-200 text-slate-400'
        }
      `}>
        <ImageIcon size={10} />
        <span className="text-[10px] font-semibold">No preview yet</span>
      </div>
    </div>
  );
};

/* ── Project Card ── */
const ProjectCard = ({ project, index, darkTheme }) => {
  const { t } = useLanguage();
  const num = String(project.id).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t('projects.viewProject')} ${project.title}`}
        className={`
          group relative flex flex-col h-full rounded-2xl border overflow-hidden
          transition-all duration-300
          ${darkTheme
            ? 'bg-[#0d1420] border-white/[0.07] hover:border-white/[0.14]'
            : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-lg'
          }
        `}
      >
        {/* Top accent bar — muncul saat hover */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
        />

        {/* ── MEDIA AREA ── */}
        <CardMedia project={project} darkTheme={darkTheme} />

        {/* ── CARD BODY ── */}
        <div className="flex flex-col flex-1 p-5">

          {/* Nomor project kecil */}
          <div
            className="text-xs font-bold font-display tracking-widest mb-3 opacity-40"
            style={{ color: project.accent }}
          >
            {num}
          </div>

          {/* Title */}
          <h3 className={`font-display font-bold text-[15px] mb-2.5 leading-tight
            ${darkTheme ? 'text-slate-100' : 'text-slate-900'}`}>
            {project.title}
          </h3>

          {/* Description */}
          <p className={`text-xs leading-relaxed flex-grow mb-4
            ${darkTheme ? 'text-slate-500' : 'text-slate-500'}`}>
            {t(`projects.desc.${project.id}`)}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold px-2 py-0.5 rounded-md border"
                style={{
                  background: darkTheme ? project.accentLight : `${project.accent}10`,
                  borderColor: `${project.accent}30`,
                  color: project.accent,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className={`flex items-center justify-between text-xs font-semibold
            border-t pt-3.5 mt-auto
            ${darkTheme ? 'border-white/[0.06]' : 'border-slate-100'}`}>
            <span className="flex items-center gap-1.5" style={{ color: project.accent }}>
              <Github size={13} />
              {t('projects.viewProject')}
            </span>
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              style={{ color: project.accent }}
            />
          </div>
        </div>
      </a>
    </motion.div>
  );
};

/* ── Section wrapper ── */
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
        <p className={`text-xs font-bold tracking-[0.2em] uppercase mb-3
          ${darkTheme ? 'text-violet-400' : 'text-violet-600'}`}>
          Work
        </p>
        <h2
          className="font-display font-extrabold text-4xl sm:text-5xl mb-4"
          style={{
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Featured Projects
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

      {/* CTA GitHub */}
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
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm
            shadow-[0_2px_16px_rgba(124,58,237,0.35)] hover:shadow-[0_4px_24px_rgba(124,58,237,0.55)]
            transition-all duration-300"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <Github size={16} />
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
