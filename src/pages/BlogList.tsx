import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Search, Calendar, Eye, Tag, BookOpen, 
  Clock, Sparkles, ArrowUpRight, X, ChevronRight, Filter, Bookmark
} from 'lucide-react';
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

  const bg = darkTheme ? 'bg-[#08080a] text-neutral-100' : 'bg-[#FAF9F6] text-neutral-900';

  useEffect(() => {
    fetchPosts();
  }, [selectedTag]);

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

  // Filter posts client-side for instant search feedback
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    const q = searchQuery.toLowerCase();
    return posts.filter(
      p => p.title.toLowerCase().includes(q) || 
           (p.summary && p.summary.toLowerCase().includes(q)) ||
           (p.tags && p.tags.some(tag => tag.toLowerCase().includes(q)))
    );
  }, [posts, searchQuery]);

  // Unique tags
  const allTags = useMemo(() => {
    return Array.from(new Set(posts.flatMap(p => p.tags || [])));
  }, [posts]);

  // Featured post (latest post)
  const featuredPost = filteredPosts.length > 0 && !searchQuery && !selectedTag ? filteredPosts[0] : null;
  const standardPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts;

  return (
    <>
      <Helmet>
        <title>Blog & Tech Articles — Awanda | Software Engineer</title>
        <meta name="description" content="Kumpulan artikel, catatan teknis, tutorial, dan studi kasus arsitektur sistem oleh Awanda, Software Engineer." />
        <meta property="og:title" content="Blog & Tech Articles — Awanda" />
        <meta property="og:description" content="Kumpulan artikel, catatan teknis, tutorial, dan studi kasus arsitektur sistem oleh Awanda." />
        <meta property="og:url" content={`${siteUrl}/blog`} />
        <link rel="canonical" href={`${siteUrl}/blog`} />
      </Helmet>

      <div className={`${bg} min-h-screen transition-colors duration-500 selection:bg-indigo-500 selection:text-white relative overflow-hidden pb-24`}>
        {/* Ambient structural glow */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className={`absolute inset-0 ${darkTheme ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`} />
          {darkTheme && (
            <>
              <div className="absolute top-[-10%] right-[10%] w-[45vw] aspect-square rounded-full bg-indigo-600/[0.04] blur-[140px]" />
              <div className="absolute top-[40%] left-[-10%] w-[40vw] aspect-square rounded-full bg-blue-600/[0.03] blur-[140px]" />
            </>
          )}
        </div>

        {/* ── Top Navigation Bar ── */}
        <header className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.06]">
          <Link
            to="/"
            className={`group inline-flex items-center gap-2 text-xs sm:text-sm font-medium transition-colors
              ${darkTheme ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-black'}`}
          >
            <span className={`p-1.5 rounded-lg border transition-transform duration-300 group-hover:-translate-x-1
              ${darkTheme ? 'border-neutral-800 bg-neutral-900/80' : 'border-neutral-200 bg-white'}`}>
              <ArrowLeft size={14} />
            </span>
            <span>{t('social.backToHome') || 'Kembali ke Portofolio'}</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/dashboard"
              className={`text-xs font-mono px-3.5 py-1.5 rounded-xl border transition-all duration-300 flex items-center gap-1.5
                ${darkTheme 
                  ? 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white hover:border-indigo-500/50 hover:bg-neutral-900' 
                  : 'border-neutral-200 bg-white text-neutral-600 hover:text-black hover:border-indigo-400 shadow-sm'}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Admin Studio</span>
            </Link>
          </div>
        </header>

        {/* ── Header Hero Section ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase mb-5 border bg-indigo-500/10 border-indigo-500/20 text-indigo-400">
              <Sparkles size={13} className="animate-spin-slow" />
              <span>Developer Journal & Insights</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display mb-5 leading-[1.1]">
              Refleksi Kode,{' '}
              <span className="text-gradient">Arsitektur</span> & Sistem.
            </h1>

            <p className={`text-base sm:text-lg leading-relaxed ${darkTheme ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Dokumentasi perjalanan teknis, eksplorasi teknologi modern, dan studi kasus pengembangan perangkat lunak berskala produksi.
            </p>
          </div>

          {/* ── Search & Filter Controls ── */}
          <div className="mt-10 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={17} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari judul, tag, atau isi topik..."
                className={`w-full pl-11 pr-10 py-3 rounded-2xl text-sm border outline-none transition-all duration-300
                  ${darkTheme 
                    ? 'bg-[#0e0e12]/80 border-neutral-800 text-white placeholder:text-neutral-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20' 
                    : 'bg-white border-neutral-200 text-black placeholder:text-neutral-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 shadow-sm'}`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-white"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Tag Pills */}
            {allTags.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-300
                    ${selectedTag === null
                      ? 'bg-gradient-primary text-white shadow-lg shadow-indigo-600/25 font-semibold'
                      : darkTheme 
                        ? 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700' 
                        : 'bg-white text-neutral-600 hover:text-black border border-neutral-200 shadow-sm'}`}
                >
                  Semua Topik ({posts.length})
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-300
                      ${selectedTag === tag
                        ? 'bg-gradient-primary text-white shadow-lg shadow-indigo-600/25 font-semibold'
                        : darkTheme 
                          ? 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700' 
                          : 'bg-white text-neutral-600 hover:text-black border border-neutral-200 shadow-sm'}`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Main Content Area ── */}
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {loading ? (
            <div className="space-y-8">
              <div className={`h-96 rounded-3xl animate-pulse ${darkTheme ? 'bg-neutral-900/60' : 'bg-neutral-200'}`} />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div key={n} className={`h-80 rounded-3xl animate-pulse ${darkTheme ? 'bg-neutral-900/60' : 'bg-neutral-200'}`} />
                ))}
              </div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className={`text-center py-24 rounded-3xl border ${darkTheme ? 'bg-[#0e0e12]/40 border-neutral-800/60' : 'bg-white border-neutral-200'}`}>
              <BookOpen className="mx-auto text-neutral-400 mb-4 animate-bounce" size={44} />
              <h3 className="text-xl font-bold font-display mb-2">Tidak ada artikel yang cocok</h3>
              <p className="text-sm text-neutral-500 max-w-md mx-auto">
                Coba gunakan kata kunci lain atau pilih filter topik di atas untuk menjelajahi tulisan lainnya.
              </p>
              {(searchQuery || selectedTag) && (
                <button
                  onClick={() => { setSearchQuery(''); setSelectedTag(null); }}
                  className="mt-6 px-4 py-2 rounded-xl text-xs font-mono bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                >
                  Reset Filter
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-12">
              {/* ── Highlighted Featured Post ── */}
              {featuredPost && (
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`group relative rounded-3xl border overflow-hidden transition-all duration-500 hover:shadow-2xl
                    ${darkTheme 
                      ? 'bg-gradient-to-b from-[#111118] to-[#0a0a0f] border-neutral-800/80 hover:border-indigo-500/40 hover:shadow-indigo-500/5' 
                      : 'bg-white border-neutral-200 hover:border-indigo-400 hover:shadow-indigo-500/10'}`}
                >
                  <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center p-6 sm:p-8 lg:p-10">
                    {/* Cover image side */}
                    {featuredPost.cover_image && (
                      <Link 
                        to={`/blog/${featuredPost.slug}`}
                        className="lg:col-span-7 block relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-900 shadow-inner group/img"
                      >
                        <img
                          src={featuredPost.cover_image}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 text-black text-xs font-semibold backdrop-blur-md">
                            Baca Artikel <ArrowUpRight size={14} />
                          </span>
                        </div>
                      </Link>
                    )}

                    {/* Text info side */}
                    <div className={featuredPost.cover_image ? 'lg:col-span-5 flex flex-col justify-between h-full' : 'lg:col-span-12'}>
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                            ⭐ FEATURED
                          </span>
                          {featuredPost.tags && featuredPost.tags[0] && (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono text-neutral-400 border border-neutral-800">
                              #{featuredPost.tags[0]}
                            </span>
                          )}
                        </div>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display tracking-tight mb-4 group-hover:text-indigo-400 transition-colors leading-snug">
                          <Link to={`/blog/${featuredPost.slug}`}>
                            {featuredPost.title}
                          </Link>
                        </h2>

                        <p className={`text-sm sm:text-base line-clamp-3 mb-6 leading-relaxed ${darkTheme ? 'text-neutral-400' : 'text-neutral-600'}`}>
                          {featuredPost.summary}
                        </p>
                      </div>

                      {/* Footer author & stats */}
                      <div className="pt-6 border-t border-neutral-800/40 flex items-center justify-between text-xs font-mono text-neutral-400">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={avatarImg}
                            alt="Awanda"
                            className="w-7 h-7 rounded-full object-cover border border-indigo-500/40"
                          />
                          <span className="font-sans font-medium text-neutral-200">Awanda</span>
                        </div>

                        <div className="flex items-center gap-4 text-[11px]">
                          <div className="flex items-center gap-1">
                            <Calendar size={13} />
                            <span>
                              {new Date(featuredPost.created_at).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye size={13} />
                            <span>{featuredPost.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              )}

              {/* ── Standard Posts Grid ── */}
              {standardPosts.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {standardPosts.map((post, index) => {
                    const dateStr = new Date(post.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    });

                    return (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        className={`group flex flex-col rounded-3xl border overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl
                          ${darkTheme 
                            ? 'bg-[#0d0d12]/90 border-neutral-800/80 hover:border-indigo-500/50 hover:shadow-indigo-500/5' 
                            : 'bg-white border-neutral-200 hover:border-indigo-400 hover:shadow-indigo-500/10'}`}
                      >
                        {/* Cover Image */}
                        {post.cover_image && (
                          <Link to={`/blog/${post.slug}`} className="block relative aspect-[16/9] overflow-hidden bg-neutral-900">
                            <img
                              src={post.cover_image}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                              <span className="text-xs font-mono font-medium text-white flex items-center gap-1">
                                Baca Artikel <ChevronRight size={13} />
                              </span>
                            </div>
                          </Link>
                        )}

                        <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                          <div>
                            {/* Tags */}
                            {post.tags && post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mb-3.5">
                                {post.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Title */}
                            <h3 className="text-xl font-bold font-display tracking-tight mb-2.5 group-hover:text-indigo-400 transition-colors leading-snug">
                              <Link to={`/blog/${post.slug}`} className="line-clamp-2">
                                {post.title}
                              </Link>
                            </h3>

                            {/* Summary */}
                            <p className={`text-xs sm:text-sm line-clamp-3 mb-6 leading-relaxed ${darkTheme ? 'text-neutral-400' : 'text-neutral-600'}`}>
                              {post.summary}
                            </p>
                          </div>

                          {/* Card Footer */}
                          <div className={`pt-4 border-t flex items-center justify-between text-[11px] font-mono
                            ${darkTheme ? 'border-neutral-800 text-neutral-500' : 'border-neutral-100 text-neutral-400'}`}>
                            <div className="flex items-center gap-1.5">
                              <Calendar size={12} />
                              <span>{dateStr}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-neutral-400">
                              <Eye size={12} />
                              <span>{post.views} views</span>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
