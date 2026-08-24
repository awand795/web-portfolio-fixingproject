import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Calendar, Eye, Tag, BookOpen, 
  Clock, Sparkles, ArrowUpRight, X, ChevronRight, 
  Flame, ArrowRight, MessageSquare, Send, Mail, Check,
  Layers, Compass, Rss
} from 'lucide-react';
import NavBar from '../Component/NavBar';
import Footer from '../Component/Footer';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { siteUrl } from '../constants';
import avatarImg from '../image/imgprofile.webp';

interface Post {
  id: number;
  title: string;
  slug: string;
  summary: string;
  cover_image: string;
  tags: string[];
  views: number;
  created_at: string;
}

export default function BlogList() {
  const { darkTheme } = useTheme();
  const { t } = useLanguage();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const bg = darkTheme ? 'bg-[#08080a] text-neutral-100' : 'bg-[#FAF9F6] text-neutral-900';

  useEffect(() => {
    fetchPosts();
  }, [selectedTag]);

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedTag) params.append('tag', selectedTag);

      const res = await fetch(`/api/posts?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      }
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter & Sort
  const filteredAndSortedPosts = useMemo(() => {
    let result = [...posts];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p => p.title.toLowerCase().includes(q) || 
             (p.summary && p.summary.toLowerCase().includes(q)) ||
             (p.tags && p.tags.some(tag => tag.toLowerCase().includes(q)))
      );
    }

    if (sortBy === 'popular') {
      result.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else {
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return result;
  }, [posts, searchQuery, sortBy]);

  // Unique tags
  const allTags = useMemo(() => {
    return Array.from(new Set(posts.flatMap(p => p.tags || [])));
  }, [posts]);

  const featuredPost = filteredAndSortedPosts.length > 0 && !searchQuery && !selectedTag && sortBy === 'latest' 
    ? filteredAndSortedPosts[0] 
    : null;
  const listPosts = featuredPost ? filteredAndSortedPosts.slice(1) : filteredAndSortedPosts;

  return (
    <>
      <Helmet>
        <title>Awanda Journal — Software Engineering & Insights</title>
        <meta name="description" content="Kumpulan artikel, catatan arsitektur sistem, fullstack web development, database cloud, dan tutorial mendalam oleh Awanda." />
        <meta property="og:title" content="Awanda Journal — Software Engineering & Insights" />
        <meta property="og:description" content="Kumpulan artikel, catatan arsitektur sistem, fullstack web development, database cloud, dan tutorial mendalam oleh Awanda." />
        <meta property="og:url" content={`${siteUrl}/blog`} />
        <link rel="canonical" href={`${siteUrl}/blog`} />
      </Helmet>

      <div className={`${bg} min-h-screen transition-colors duration-500 selection:bg-indigo-500 selection:text-white relative overflow-hidden flex flex-col justify-between`}>
        {/* Ambient Glow Atmosphere */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className={`absolute inset-0 ${darkTheme ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`} />
          {darkTheme && (
            <>
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[70vw] h-[40vw] rounded-full bg-gradient-to-b from-indigo-600/10 via-purple-600/5 to-transparent blur-[160px]" />
              <div className="absolute top-[45%] -left-40 w-[45vw] h-[45vw] rounded-full bg-gradient-to-tr from-blue-600/10 via-cyan-600/5 to-transparent blur-[160px]" />
            </>
          )}
        </div>

        {/* Global Navigation */}
        <NavBar />

        {/* ── Top Hero Editorial Section ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-8 w-full">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase mb-5 border bg-indigo-500/10 border-indigo-500/25 text-indigo-400 backdrop-blur-xl"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Engineering Publications</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-display mb-5 leading-[1.12]"
            >
              Thoughts on <span className="text-gradient">building & scaling</span> software.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className={`text-sm sm:text-base leading-relaxed ${darkTheme ? 'text-neutral-400' : 'text-neutral-600'}`}
            >
              Catatan praktis arsitektur perangkat lunak, optimalisasi basis data relasional, dan studi kasus pengembangan web modern oleh Awanda.
            </motion.p>
          </div>

          {/* ── Search & Filter Command Center ── */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`p-3 sm:p-4 rounded-3xl border backdrop-blur-2xl mb-12 max-w-4xl mx-auto shadow-2xl transition-all
              ${darkTheme ? 'bg-[#0f0f14]/85 border-neutral-800/90 shadow-indigo-500/5' : 'bg-white/90 border-neutral-200 shadow-neutral-200/60'}`}
          >
            <div className="flex flex-col md:flex-row items-center gap-3">
              {/* Search Box */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={17} />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari artikel, topik, atau kata kunci..."
                  className={`w-full pl-11 pr-14 py-3 rounded-2xl text-sm border outline-none transition-all
                    ${darkTheme 
                      ? 'bg-neutral-900/80 border-neutral-800 text-white placeholder:text-neutral-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20' 
                      : 'bg-neutral-50 border-neutral-200 text-black placeholder:text-neutral-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10'}`}
                />
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-white"
                  >
                    <X size={15} />
                  </button>
                ) : (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded border border-neutral-700/60 text-neutral-500 hidden sm:inline">
                    /
                  </span>
                )}
              </div>

              {/* Sort Switcher */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button
                  onClick={() => setSortBy('latest')}
                  className={`flex-1 md:flex-initial px-4 py-2.5 rounded-2xl text-xs font-mono flex items-center justify-center gap-1.5 transition-all duration-300
                    ${sortBy === 'latest' 
                      ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/30' 
                      : darkTheme ? 'text-neutral-400 hover:text-white bg-neutral-900/60' : 'text-neutral-600 bg-neutral-100 hover:text-black'}`}
                >
                  <Sparkles size={13} />
                  <span>Terbaru</span>
                </button>

                <button
                  onClick={() => setSortBy('popular')}
                  className={`flex-1 md:flex-initial px-4 py-2.5 rounded-2xl text-xs font-mono flex items-center justify-center gap-1.5 transition-all duration-300
                    ${sortBy === 'popular' 
                      ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/30' 
                      : darkTheme ? 'text-neutral-400 hover:text-white bg-neutral-900/60' : 'text-neutral-600 bg-neutral-100 hover:text-black'}`}
                >
                  <Flame size={13} />
                  <span>Populer</span>
                </button>
              </div>
            </div>

            {/* Tag Pills Carousel */}
            {allTags.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto pt-3 border-t border-neutral-800/40 mt-3 pb-1 scrollbar-none">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 shrink-0 ml-1">
                  Filter:
                </span>
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono whitespace-nowrap transition-all
                    ${selectedTag === null
                      ? 'bg-neutral-200 text-black dark:bg-white dark:text-black font-bold'
                      : darkTheme ? 'text-neutral-400 hover:text-white bg-neutral-900/60 border border-neutral-800' : 'text-neutral-600 bg-neutral-100 border border-neutral-200'}`}
                >
                  Semua ({posts.length})
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`px-3 py-1 rounded-xl text-xs font-mono whitespace-nowrap transition-all
                      ${selectedTag === tag
                        ? 'bg-indigo-600 text-white font-bold'
                        : darkTheme ? 'text-neutral-400 hover:text-white bg-neutral-900/60 border border-neutral-800' : 'text-neutral-600 bg-neutral-100 border border-neutral-200'}`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* ── Main Content Grid ── */}
          <main className="w-full">
            {loading ? (
              <div className="space-y-8 max-w-6xl mx-auto">
                <div className={`h-[420px] rounded-3xl animate-pulse ${darkTheme ? 'bg-neutral-900/80' : 'bg-neutral-200'}`} />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className={`h-80 rounded-3xl animate-pulse ${darkTheme ? 'bg-neutral-900/80' : 'bg-neutral-200'}`} />
                  ))}
                </div>
              </div>
            ) : filteredAndSortedPosts.length === 0 ? (
              <div className={`text-center py-24 rounded-3xl border max-w-3xl mx-auto
                ${darkTheme ? 'bg-[#0f0f14]/60 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                <BookOpen className="mx-auto text-indigo-400 mb-4" size={48} />
                <h3 className="text-2xl font-bold font-display mb-2">Belum ada artikel yang cocok</h3>
                <p className="text-sm text-neutral-400 max-w-md mx-auto mb-6">
                  Tidak menemukan tulisan dengan kata kunci "{searchQuery}". Coba gunakan istilah lain atau reset filter.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedTag(null); }}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-mono font-semibold transition-all shadow-lg shadow-indigo-600/20"
                >
                  Tampilkan Semua Artikel
                </button>
              </div>
            ) : (
              <div className="max-w-6xl mx-auto space-y-12">
                {/* ── Highlighted Magazine Bento Hero ── */}
                {featuredPost && (
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link
                      to={`/blog/${featuredPost.slug}`}
                      className={`group block relative rounded-3xl border overflow-hidden transition-all duration-500 hover:shadow-2xl
                        ${darkTheme 
                          ? 'bg-[#0e0e14] border-neutral-800/90 hover:border-indigo-500/40 hover:shadow-indigo-500/10' 
                          : 'bg-white border-neutral-200 hover:border-indigo-400 hover:shadow-indigo-500/10'}`}
                    >
                      <div className="grid lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 lg:p-10">
                        {/* Cover Image */}
                        <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-900 shadow-xl">
                          <img
                            src={featuredPost.cover_image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80'}
                            alt={featuredPost.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <div className="absolute top-4 left-4">
                            <span className="px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-lg shadow-indigo-600/40">
                              ⭐ Highlighted Article
                            </span>
                          </div>
                        </div>

                        {/* Article Info */}
                        <div className="lg:col-span-5 flex flex-col justify-between h-full">
                          <div>
                            {featuredPost.tags && featuredPost.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {featuredPost.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-xs font-mono px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight mb-4 group-hover:text-indigo-400 transition-colors leading-snug">
                              {featuredPost.title}
                            </h2>

                            <p className={`text-sm sm:text-base line-clamp-3 mb-6 leading-relaxed ${darkTheme ? 'text-neutral-400' : 'text-neutral-600'}`}>
                              {featuredPost.summary}
                            </p>
                          </div>

                          <div className="pt-6 border-t border-neutral-800/60 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img
                                src={avatarImg}
                                alt="Awanda"
                                className="w-9 h-9 rounded-full object-cover border-2 border-indigo-500/40"
                              />
                              <div className="text-xs">
                                <div className="font-bold text-neutral-200">Awanda</div>
                                <div className="text-[10px] font-mono text-neutral-500">
                                  {new Date(featuredPost.created_at).toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                  })}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 text-xs font-mono text-indigo-400 font-bold group-hover:translate-x-1 transition-transform">
                              <span>Baca Artikel</span>
                              <ArrowRight size={15} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )}

                {/* ── Standard 3-Column Grid ── */}
                {listPosts.length > 0 && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {listPosts.map((post, idx) => {
                      const dateFormatted = new Date(post.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      });

                      return (
                        <motion.article
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.05 }}
                        >
                          <Link
                            to={`/blog/${post.slug}`}
                            className={`group flex flex-col h-full rounded-3xl border overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl
                              ${darkTheme 
                                ? 'bg-[#0e0e14]/90 border-neutral-800/80 hover:border-indigo-500/40 hover:shadow-indigo-500/10' 
                                : 'bg-white border-neutral-200 hover:border-indigo-400 hover:shadow-indigo-500/10'}`}
                          >
                            {/* Card Image */}
                            <div className="relative aspect-[16/9] overflow-hidden bg-neutral-900">
                              <img
                                src={post.cover_image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80'}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <span className="text-xs font-mono font-medium text-white flex items-center gap-1">
                                  Buka Tulisan <ArrowUpRight size={13} />
                                </span>
                              </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                              <div>
                                {post.tags && post.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1.5 mb-3.5">
                                    {post.tags.slice(0, 2).map((tag) => (
                                      <span
                                        key={tag}
                                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                                      >
                                        #{tag}
                                      </span>
                                    ))}
                                  </div>
                                )}

                                <h3 className="text-lg sm:text-xl font-bold font-display tracking-tight mb-2.5 group-hover:text-indigo-400 transition-colors leading-snug line-clamp-2">
                                  {post.title}
                                </h3>

                                <p className={`text-xs sm:text-sm line-clamp-3 mb-6 leading-relaxed ${darkTheme ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                  {post.summary}
                                </p>
                              </div>

                              <div className={`pt-4 border-t flex items-center justify-between text-[11px] font-mono
                                ${darkTheme ? 'border-neutral-800 text-neutral-500' : 'border-neutral-100 text-neutral-400'}`}>
                                <div className="flex items-center gap-1.5">
                                  <Calendar size={12} />
                                  <span>{dateFormatted}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-neutral-400">
                                  <Eye size={12} />
                                  <span>{post.views} views</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.article>
                      );
                    })}
                  </div>
                )}

                {/* ── Connect & Discussion Banner ── */}
                <div className={`p-8 sm:p-10 rounded-3xl border text-center max-w-4xl mx-auto relative overflow-hidden shadow-2xl
                  ${darkTheme ? 'bg-gradient-to-b from-[#12121c] to-[#0a0a0f] border-indigo-500/20' : 'bg-gradient-to-b from-indigo-50/50 to-white border-indigo-100'}`}>
                  <div className="inline-flex p-3 rounded-2xl bg-indigo-600 text-white mb-4 shadow-lg shadow-indigo-600/30">
                    <MessageSquare size={22} />
                  </div>
                  <h3 className="text-2xl font-bold font-display tracking-tight mb-2">
                    Ingin Berdiskusi atau Berkolaborasi?
                  </h3>
                  <p className={`text-xs sm:text-sm max-w-xl mx-auto mb-6 leading-relaxed ${darkTheme ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Saya selalu terbuka untuk mendiskusikan arsitektur sistem, lowongan kerja fullstack/mobile, atau eksplorasi teknologi baru.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href="mailto:awand795@gmail.com"
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/25"
                    >
                      <Mail size={14} />
                      <span>Kirim Email</span>
                    </a>
                    <a
                      href="https://linkedin.com/in/awanda"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-5 py-2.5 rounded-xl border text-xs font-semibold transition-all
                        ${darkTheme ? 'border-neutral-700 bg-neutral-900 text-neutral-200 hover:text-white hover:border-neutral-600' : 'border-neutral-300 bg-white text-neutral-700 hover:text-black shadow-sm'}`}
                    >
                      Hubungkan di LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* Global Footer */}
        <Footer />
      </div>
    </>
  );
}
