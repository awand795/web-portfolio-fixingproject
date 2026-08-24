import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Calendar, Eye, Tag, BookOpen, Clock, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { siteUrl } from '../constants';

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
  }, [searchQuery, selectedTag]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append('q', searchQuery);
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

  // Collect all unique tags
  const allTags = Array.from(
    new Set(posts.flatMap(p => p.tags || []))
  );

  return (
    <>
      <Helmet>
        <title>Blog & Tech Articles — Awanda</title>
        <meta name="description" content="Kumpulan artikel, tutorial, dan studi kasus seputar Software Engineering, Web Development, dan Arsitektur Sistem oleh Awanda." />
        <meta property="og:title" content="Blog & Tech Articles — Awanda" />
        <meta property="og:description" content="Kumpulan artikel, tutorial, dan studi kasus seputar Software Engineering, Web Development, dan Arsitektur Sistem oleh Awanda." />
        <meta property="og:url" content={`${siteUrl}/blog`} />
        <link rel="canonical" href={`${siteUrl}/blog`} />
      </Helmet>

      <div className={`${bg} min-h-screen transition-colors duration-500 selection:bg-indigo-500 selection:text-white pb-20`}>
        {/* Header navigation */}
        <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between border-b border-neutral-200/40 dark:border-neutral-800/40">
          <Link
            to="/"
            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors
              ${darkTheme ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-black'}`}
          >
            <ArrowLeft size={16} />
            {t('social.backToHome') || 'Kembali ke Portofolio'}
          </Link>

          <Link
            to="/admin/login"
            className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-colors
              ${darkTheme ? 'border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700' : 'border-neutral-200 text-neutral-600 hover:text-black hover:border-neutral-300'}`}
          >
            Admin CMS
          </Link>
        </header>

        {/* Hero Header */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4 border bg-indigo-500/10 border-indigo-500/20 text-indigo-400">
              <Sparkles size={12} />
              <span>Articles & Case Studies</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display mb-4">
              Blog & Insights
            </h1>
            <p className={`text-base sm:text-lg ${darkTheme ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Catatan teknis, arsitektur software, dan pengalaman seputar web, mobile, serta cloud engineering.
            </p>
          </div>

          {/* Search & Filter bar */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari judul atau topik artikel..."
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border outline-none transition-all
                  ${darkTheme 
                    ? 'bg-neutral-900/80 border-neutral-800 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' 
                    : 'bg-white border-neutral-200 text-black focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 shadow-sm'}`}
              />
            </div>

            {/* Tag Pills */}
            {allTags.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors
                    ${selectedTag === null
                      ? 'bg-indigo-600 text-white'
                      : darkTheme ? 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800' : 'bg-neutral-100 text-neutral-600 hover:text-black border border-neutral-200'}`}
                >
                  Semua Topik
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors
                      ${selectedTag === tag
                        ? 'bg-indigo-600 text-white'
                        : darkTheme ? 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800' : 'bg-neutral-100 text-neutral-600 hover:text-black border border-neutral-200'}`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Posts Grid */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className={`h-80 rounded-2xl animate-pulse ${darkTheme ? 'bg-neutral-900' : 'bg-neutral-200'}`}
                />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="mx-auto text-neutral-400 mb-3" size={40} />
              <h3 className="text-lg font-semibold mb-1">Belum ada artikel yang cocok</h3>
              <p className="text-sm text-neutral-500">Coba ubah kata kunci pencarian atau filter topik.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => {
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
                    className={`group flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl
                      ${darkTheme 
                        ? 'bg-[#0e0e12] border-neutral-800/80 hover:border-indigo-500/50 hover:shadow-indigo-500/5' 
                        : 'bg-white border-neutral-200 hover:border-indigo-400 hover:shadow-indigo-500/10'}`}
                  >
                    {/* Cover Image */}
                    {post.cover_image && (
                      <Link to={`/blog/${post.slug}`} className="block relative aspect-[16/9] overflow-hidden bg-neutral-900">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </Link>
                    )}

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Title */}
                        <h2 className="text-lg font-bold tracking-tight mb-2 group-hover:text-indigo-400 transition-colors">
                          <Link to={`/blog/${post.slug}`} className="line-clamp-2">
                            {post.title}
                          </Link>
                        </h2>

                        {/* Summary */}
                        <p className={`text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed ${darkTheme ? 'text-neutral-400' : 'text-neutral-600'}`}>
                          {post.summary}
                        </p>
                      </div>

                      {/* Footer Info */}
                      <div className={`pt-4 border-t flex items-center justify-between text-[11px] font-mono
                        ${darkTheme ? 'border-neutral-800 text-neutral-500' : 'border-neutral-100 text-neutral-400'}`}>
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} />
                          <span>{dateStr}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
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
        </main>
      </div>
    </>
  );
}
