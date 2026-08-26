import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, MapPin, Briefcase, Code2, Sparkles, 
  Terminal, Award, Cpu, GraduationCap, HeartHandshake
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AboutSectionProps {
  darkTheme: boolean;
}

export default function AboutSection({ darkTheme }: AboutSectionProps) {
  const { t, language } = useLanguage();

  return (
    <section id="about" className="py-16 relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase mb-4 border bg-indigo-500/10 border-indigo-500/30 text-indigo-400">
          <User size={13} />
          <span>{language === 'id' ? 'TENTANG SAYA' : 'ABOUT ME'}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight mb-4">
          {language === 'id' ? (
            <>Mengenal Lebih Dekat <span className="text-gradient">Awanda</span></>
          ) : (
            <>Engineering with <span className="text-gradient">Passion & Precision</span></>
          )}
        </h2>

        <p className={`text-sm sm:text-base leading-relaxed ${darkTheme ? 'text-neutral-400' : 'text-neutral-600'}`}>
          {language === 'id' 
            ? 'Seorang Software Engineer yang berfokus pada pembangunan solusi digital berskala tinggi, arsitektur data efisien, dan pengalaman antarmuka modern.'
            : 'A Software Engineer dedicated to building high-performance digital solutions, efficient data architectures, and intuitive modern interfaces.'}
        </p>
      </div>

      {/* Bento Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">
        {/* Main Narrative Card */}
        <div className={`md:col-span-8 p-8 sm:p-10 rounded-3xl border flex flex-col justify-between relative overflow-hidden
          ${darkTheme ? 'bg-[#0e0e14]/90 border-neutral-800/90 shadow-2xl' : 'bg-white border-neutral-200 shadow-sm'}`}>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400">
                <Terminal size={20} />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg sm:text-xl">
                  {language === 'id' ? 'Latar Belakang & Filosofi Rekayasa' : 'Background & Engineering Philosophy'}
                </h3>
                <p className="text-xs font-mono text-neutral-500">Fullstack & Mobile Engineer</p>
              </div>
            </div>

            <div className={`space-y-4 text-sm leading-relaxed ${darkTheme ? 'text-neutral-300' : 'text-neutral-700'}`}>
              <p>
                {language === 'id' 
                  ? 'Saya adalah Awanda, seorang Software Engineer yang berbasis di Medan, Sumatera Utara, Indonesia. Saya memiliki ketertarikan mendalam dalam membangun ekosistem perangkat lunak end-to-end — mulai dari desain skema database relasional yang terstruktur, integrasi API performa tinggi, hingga pembuatan antarmuka web dan mobile yang responsif.'
                  : 'I am Awanda, a Software Engineer based in Medan, North Sumatra, Indonesia. I specialize in building end-to-end software ecosystems — from structured relational database schemas and high-performance serverless APIs to reactive, pixel-perfect web and mobile interfaces.'}
              </p>
              <p>
                {language === 'id'
                  ? 'Bagi saya, kode yang baik adalah kode yang tidak hanya berfungsi dengan benar, tetapi juga teruji, mudah dipelihara, dan memiliki efisiensi komputasi yang tinggi. Saya terus mengeksplorasi teknologi modern seperti React 19, TypeScript, PostgreSQL, Spring Boot, dan Flutter untuk menciptakan solusi nyata yang berdampak.'
                  : 'For me, great code is not just functional, but clean, maintainable, and highly optimized. I continuously leverage modern technologies like React 19, TypeScript, PostgreSQL, Spring Boot, and Flutter to solve real-world problems with elegance.'}
              </p>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-neutral-800/50 flex flex-wrap items-center gap-6 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{language === 'id' ? 'Tersedia untuk Kolaborasi' : 'Available for Work'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Code2 size={14} className="text-indigo-400" />
              <span>React • PostgreSQL • Flutter • Spring Boot</span>
            </div>
          </div>
        </div>

        {/* Quick Facts Bento Column */}
        <div className="md:col-span-4 flex flex-col gap-6">
          {/* Location Card */}
          <div className={`p-6 rounded-3xl border flex items-center gap-4
            ${darkTheme ? 'bg-[#0e0e14]/90 border-neutral-800/90' : 'bg-white border-neutral-200 shadow-sm'}`}>
            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
              <MapPin size={22} />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">Domisili / Lokasi</div>
              <div className="font-bold text-sm sm:text-base font-display">Medan, Sumatera Utara</div>
              <div className="text-xs text-neutral-400">Indonesia</div>
            </div>
          </div>

          {/* Role & Org Card */}
          <div className={`p-6 rounded-3xl border flex items-center gap-4
            ${darkTheme ? 'bg-[#0e0e14]/90 border-neutral-800/90' : 'bg-white border-neutral-200 shadow-sm'}`}>
            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
              <Briefcase size={22} />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">Perusahaan / Afiliasi</div>
              <div className="font-bold text-sm sm:text-base font-display">Darkotech</div>
              <div className="text-xs text-neutral-400">Software Engineering Team</div>
            </div>
          </div>

          {/* Focus Card */}
          <div className={`p-6 rounded-3xl border flex items-center gap-4
            ${darkTheme ? 'bg-[#0e0e14]/90 border-neutral-800/90' : 'bg-white border-neutral-200 shadow-sm'}`}>
            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
              <Cpu size={22} />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">Fokus Utama</div>
              <div className="font-bold text-sm sm:text-base font-display">Fullstack & Cloud</div>
              <div className="text-xs text-neutral-400">Scalable Web & Mobile Apps</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
