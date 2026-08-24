import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Plus, Edit3, Trash2, Eye, EyeOff, LogOut, 
  ExternalLink, FileText, CheckCircle2, Search, 
  ArrowLeft, RefreshCw, BarChart3, Clock, AlertTriangle, X, Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface Post {
  id: number;
  title: string;
  slug: string;
  summary: string;
  cover_image: string;
  tags: string[];
  published: boolean;
  views: number;
  created_at: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { darkTheme } = useTheme();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'published' | 'draft'>('all');
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [deleteModalId, setDeleteModalId] = useState<number | null>(null);

  const bg = darkTheme ? 'bg-[#08080a] text-neutral-100' : 'bg-[#FAF9F6] text-neutral-900';

  useEffect(() => {
    checkAuthAndFetchPosts();
  }, []);

  const checkAuthAndFetchPosts = async () => {
    const token = localStorage.getItem('awanda_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/admin/posts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        localStorage.removeItem('awanda_admin_token');
        navigate('/admin/login');
        return;
      }

      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error('Failed to load posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('awanda_admin_token');
    navigate('/admin/login');
  };

  const handleTogglePublish = async (post: Post) => {
    const token = localStorage.getItem('awanda_admin_token');
    if (!token) return;

    try {
      setActionLoading(post.id);
      const res = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...post,
          published: !post.published
        })
      });

      if (res.ok) {
        setPosts(posts.map(p => p.id === post.id ? { ...p, published: !p.published } : p));
      }
    } catch (err) {
      console.error('Failed to toggle publish status:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleteModalId) return;
    const token = localStorage.getItem('awanda_admin_token');
    if (!token) return;

    try {
      setActionLoading(deleteModalId);
      const res = await fetch(`/api/posts/${deleteModalId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        setPosts(posts.filter(p => p.id !== deleteModalId));
      }
    } catch (err) {
      console.error('Failed to delete post:', err);
    } finally {
      setActionLoading(null);
      setDeleteModalId(null);
    }
  };

  const filteredPosts = useMemo(() => {
    return posts.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.slug.toLowerCase().includes(search.toLowerCase());
      if (!matchSearch) return false;
      if (filterTab === 'published') return p.published;
      if (filterTab === 'draft') return !p.published;
      return true;
    });
  }, [posts, search, filterTab]);

  const totalViews = posts.reduce((acc, p) => acc + (p.views || 0), 0);
  const totalPublished = posts.filter(p => p.published).length;
  const totalDrafts = posts.filter(p => !p.published).length;

  return (
    <>
      <Helmet>
        <title>CMS Studio Dashboard — Awanda</title>
      </Helmet>

      <div className={`${bg} min-h-screen transition-colors duration-500 pb-24 relative overflow-hidden`}>
        {/* Ambient top light */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className={`absolute inset-0 ${darkTheme ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`} />
          {darkTheme && (
            <div className="absolute top-[-10%] left-[30%] w-[40vw] aspect-square rounded-full bg-indigo-600/[0.04] blur-[140px]" />
          )}
        </div>

        {/* ── Top Header ── */}
        <header className="relative z-20 border-b backdrop-blur-xl sticky top-0 bg-neutral-900/60 dark:bg-black/60 border-neutral-200/40 dark:border-neutral-800/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/blog"
                className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5
                  ${darkTheme ? 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-700' : 'border-neutral-200 bg-white text-neutral-600 hover:text-black shadow-sm'}`}
              >
                <ArrowLeft size={13} />
                Lihat Web Blog
              </Link>

              <div className="h-4 w-px bg-neutral-800 hidden sm:block" />

              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-display font-bold text-sm tracking-tight hidden sm:inline">
                  Awanda CMS Studio
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/admin/editor"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-primary hover:opacity-90 text-white text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-indigo-600/20"
              >
                <Plus size={16} />
                <span>Tulis Artikel Baru</span>
              </Link>

              <button
                onClick={handleLogout}
                title="Keluar dari CMS"
                className={`p-2 rounded-xl border transition-all text-neutral-400 hover:text-red-400 hover:border-red-500/40
                  ${darkTheme ? 'border-neutral-800 bg-neutral-900/60' : 'border-neutral-200 bg-white shadow-sm'}`}
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </header>

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {/* ── Metric Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {/* Total Posts */}
            <div className={`p-6 rounded-3xl border relative overflow-hidden
              ${darkTheme ? 'bg-[#0e0e12]/90 border-neutral-800/80' : 'bg-white border-neutral-200 shadow-sm'}`}>
              <div className="flex items-center justify-between text-neutral-500 mb-3">
                <span className="text-xs font-mono uppercase tracking-wider font-semibold">Total Postingan</span>
                <FileText size={18} className="text-indigo-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-black font-display tracking-tight">{posts.length}</div>
              <div className="text-xs text-neutral-500 mt-2 font-mono">Semua tulisan terdaftar</div>
            </div>

            {/* Published */}
            <div className={`p-6 rounded-3xl border relative overflow-hidden
              ${darkTheme ? 'bg-[#0e0e12]/90 border-neutral-800/80' : 'bg-white border-neutral-200 shadow-sm'}`}>
              <div className="flex items-center justify-between text-neutral-500 mb-3">
                <span className="text-xs font-mono uppercase tracking-wider font-semibold">Dipublikasi</span>
                <CheckCircle2 size={18} className="text-emerald-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-black font-display tracking-tight text-emerald-400">{totalPublished}</div>
              <div className="text-xs text-neutral-500 mt-2 font-mono">Tampil di web publik</div>
            </div>

            {/* Drafts */}
            <div className={`p-6 rounded-3xl border relative overflow-hidden
              ${darkTheme ? 'bg-[#0e0e12]/90 border-neutral-800/80' : 'bg-white border-neutral-200 shadow-sm'}`}>
              <div className="flex items-center justify-between text-neutral-500 mb-3">
                <span className="text-xs font-mono uppercase tracking-wider font-semibold">Draft / Arsip</span>
                <EyeOff size={18} className="text-amber-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-black font-display tracking-tight text-amber-400">{totalDrafts}</div>
              <div className="text-xs text-neutral-500 mt-2 font-mono">Belum dirilis ke publik</div>
            </div>

            {/* Total Readers */}
            <div className={`p-6 rounded-3xl border relative overflow-hidden
              ${darkTheme ? 'bg-[#0e0e12]/90 border-neutral-800/80' : 'bg-white border-neutral-200 shadow-sm'}`}>
              <div className="flex items-center justify-between text-neutral-500 mb-3">
                <span className="text-xs font-mono uppercase tracking-wider font-semibold">Total Pembaca</span>
                <BarChart3 size={18} className="text-purple-400" />
              </div>
              <div className="text-3xl sm:text-4xl font-black font-display tracking-tight text-purple-400">{totalViews}</div>
              <div className="text-xs text-neutral-500 mt-2 font-mono">Total tayangan artikel</div>
            </div>
          </div>

          {/* ── Table Controls Bar ── */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
            {/* Filter Tabs */}
            <div className="flex p-1.5 rounded-2xl border border-neutral-800 bg-[#0e0e12]/80 text-xs font-mono">
              <button
                onClick={() => setFilterTab('all')}
                className={`px-4 py-2 rounded-xl transition-all ${filterTab === 'all' ? 'bg-indigo-600 text-white font-bold' : 'text-neutral-400 hover:text-white'}`}
              >
                Semua ({posts.length})
              </button>
              <button
                onClick={() => setFilterTab('published')}
                className={`px-4 py-2 rounded-xl transition-all ${filterTab === 'published' ? 'bg-indigo-600 text-white font-bold' : 'text-neutral-400 hover:text-white'}`}
              >
                Published ({totalPublished})
              </button>
              <button
                onClick={() => setFilterTab('draft')}
                className={`px-4 py-2 rounded-xl transition-all ${filterTab === 'draft' ? 'bg-indigo-600 text-white font-bold' : 'text-neutral-400 hover:text-white'}`}
              >
                Draft ({totalDrafts})
              </button>
            </div>

            {/* Search & Refresh */}
            <div className="flex items-center gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" size={15} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari artikel..."
                  className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm border outline-none transition-all
                    ${darkTheme ? 'bg-[#0e0e12] border-neutral-800 text-white focus:border-indigo-500' : 'bg-white border-neutral-200 text-black focus:border-indigo-600 shadow-sm'}`}
                />
              </div>

              <button
                onClick={checkAuthAndFetchPosts}
                title="Segarkan data"
                className={`p-2.5 rounded-xl border text-xs transition-colors
                  ${darkTheme ? 'border-neutral-800 bg-[#0e0e12] text-neutral-400 hover:text-white' : 'border-neutral-200 bg-white text-neutral-600 hover:text-black shadow-sm'}`}
              >
                <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>

          {/* ── Posts Table ── */}
          <div className={`rounded-3xl border overflow-hidden
            ${darkTheme ? 'bg-[#0e0e12]/90 border-neutral-800/80 shadow-2xl' : 'bg-white border-neutral-200 shadow-sm'}`}>
            {loading ? (
              <div className="py-24 text-center text-xs font-mono text-neutral-500">
                <RefreshCw size={24} className="animate-spin mx-auto mb-3 text-indigo-400" />
                <span>Memuat data artikel dari database...</span>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="py-20 text-center">
                <FileText className="mx-auto text-neutral-600 mb-3" size={36} />
                <h4 className="text-base font-bold font-display mb-1">Tidak ada postingan di kategori ini</h4>
                <p className="text-xs text-neutral-500 mb-5">Mulai buat artikel baru atau ubah filter pencarian.</p>
                <Link
                  to="/admin/editor"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
                >
                  <Plus size={14} /> Tulis Artikel Baru
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className={`text-[11px] font-mono uppercase tracking-wider border-b
                    ${darkTheme ? 'bg-neutral-900/60 border-neutral-800 text-neutral-400' : 'bg-neutral-50 border-neutral-200 text-neutral-500'}`}>
                    <tr>
                      <th className="py-4 px-6">Informasi Artikel</th>
                      <th className="py-4 px-4 hidden md:table-cell">Status</th>
                      <th className="py-4 px-4 hidden sm:table-cell">Views</th>
                      <th className="py-4 px-4 hidden lg:table-cell">Tanggal Buat</th>
                      <th className="py-4 px-6 text-right">Kelola</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${darkTheme ? 'divide-neutral-800/60' : 'divide-neutral-100'}`}>
                    {filteredPosts.map((post) => {
                      const dateFormatted = new Date(post.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      });

                      return (
                        <tr key={post.id} className={`transition-colors ${darkTheme ? 'hover:bg-neutral-900/40' : 'hover:bg-neutral-50/80'}`}>
                          {/* Title & Slug */}
                          <td className="py-5 px-6">
                            <div className="font-bold text-sm sm:text-base line-clamp-1 mb-1 font-display">
                              {post.title}
                            </div>
                            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                              <span>/{post.slug}</span>
                              {post.tags && post.tags[0] && (
                                <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[10px]">
                                  #{post.tags[0]}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Status Badge */}
                          <td className="py-5 px-4 hidden md:table-cell">
                            <button
                              onClick={() => handleTogglePublish(post)}
                              disabled={actionLoading === post.id}
                              title="Klik untuk ubah status publish"
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all
                                ${post.published 
                                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25' 
                                  : 'bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25'}`}
                            >
                              {post.published ? (
                                <>
                                  <CheckCircle2 size={12} />
                                  Published
                                </>
                              ) : (
                                <>
                                  <EyeOff size={12} />
                                  Draft
                                </>
                              )}
                            </button>
                          </td>

                          {/* Views */}
                          <td className="py-5 px-4 hidden sm:table-cell font-mono text-xs text-neutral-400">
                            <div className="flex items-center gap-1">
                              <Eye size={13} className="text-neutral-500" />
                              <span>{post.views}</span>
                            </div>
                          </td>

                          {/* Date */}
                          <td className="py-5 px-4 hidden lg:table-cell font-mono text-xs text-neutral-400">
                            <div className="flex items-center gap-1">
                              <Clock size={13} className="text-neutral-500" />
                              <span>{dateFormatted}</span>
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="py-5 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {post.published && (
                                <Link
                                  to={`/blog/${post.slug}`}
                                  target="_blank"
                                  title="Lihat halaman artikel live"
                                  className={`p-2 rounded-xl border transition-colors
                                    ${darkTheme ? 'border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700' : 'border-neutral-200 text-neutral-600 hover:text-black'}`}
                                >
                                  <ExternalLink size={14} />
                                </Link>
                              )}

                              <Link
                                to={`/admin/editor/${post.id}`}
                                title="Edit konten artikel"
                                className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/25 transition-all"
                              >
                                <Edit3 size={14} />
                              </Link>

                              <button
                                onClick={() => setDeleteModalId(post.id)}
                                title="Hapus artikel ini"
                                className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/25 transition-all"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>

        {/* ── Custom Delete Confirmation Modal ── */}
        {deleteModalId !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <div className={`w-full max-w-md p-6 sm:p-8 rounded-3xl border shadow-2xl
              ${darkTheme ? 'bg-[#111116] border-neutral-800' : 'bg-white border-neutral-200'}`}>
              <div className="flex items-center gap-3 text-red-400 mb-4">
                <div className="p-2.5 rounded-2xl bg-red-500/10 border border-red-500/20">
                  <AlertTriangle size={22} />
                </div>
                <h3 className="text-lg font-bold font-display">Hapus Artikel?</h3>
              </div>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                Tindakan ini tidak dapat dibatalkan. Postingan beserta seluruh kontennya akan dihapus permanen dari database.
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setDeleteModalId(null)}
                  className="px-4 py-2 rounded-xl border border-neutral-800 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={actionLoading !== null}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-all shadow-lg shadow-red-600/20"
                >
                  {actionLoading !== null ? 'Menghapus...' : 'Ya, Hapus'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
