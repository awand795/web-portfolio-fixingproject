import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Plus, Edit3, Trash2, Eye, EyeOff, LogOut, 
  ExternalLink, FileText, CheckCircle2, Search, ArrowLeft, RefreshCw 
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
  const [actionLoading, setActionLoading] = useState<number | null>(null);

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

  const handleDelete = async (id: number) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus artikel ini secara permanen?')) return;

    const token = localStorage.getItem('awanda_admin_token');
    if (!token) return;

    try {
      setActionLoading(id);
      const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        setPosts(posts.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete post:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.slug.toLowerCase().includes(search.toLowerCase())
  );

  const totalViews = posts.reduce((acc, p) => acc + (p.views || 0), 0);
  const totalPublished = posts.filter(p => p.published).length;

  return (
    <>
      <Helmet>
        <title>Dashboard Admin — Awanda CMS</title>
      </Helmet>

      <div className={`${bg} min-h-screen transition-colors duration-500 pb-20`}>
        {/* Top Navbar */}
        <header className="border-b backdrop-blur-md sticky top-0 z-20 bg-neutral-900/40 dark:bg-black/40 border-neutral-200/40 dark:border-neutral-800/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/blog"
                className={`p-2 rounded-lg border text-xs font-mono transition-colors flex items-center gap-1.5
                  ${darkTheme ? 'border-neutral-800 text-neutral-400 hover:text-white' : 'border-neutral-200 text-neutral-600 hover:text-black'}`}
              >
                <ArrowLeft size={14} />
                Lihat Web Blog
              </Link>
              <h1 className="text-lg font-bold font-display hidden sm:block">
                CMS Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/admin/editor"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-indigo-600/20"
              >
                <Plus size={16} />
                Tulis Artikel Baru
              </Link>

              <button
                onClick={handleLogout}
                title="Keluar"
                className={`p-2 rounded-xl border text-neutral-400 hover:text-red-400 hover:border-red-500/40 transition-colors
                  ${darkTheme ? 'border-neutral-800 bg-neutral-900/60' : 'border-neutral-200 bg-white'}`}
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className={`p-6 rounded-2xl border ${darkTheme ? 'bg-[#0e0e12] border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
              <div className="text-xs font-mono text-neutral-500 mb-1">TOTAL POSTINGAN</div>
              <div className="text-2xl sm:text-3xl font-extrabold font-display">{posts.length}</div>
            </div>
            <div className={`p-6 rounded-2xl border ${darkTheme ? 'bg-[#0e0e12] border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
              <div className="text-xs font-mono text-neutral-500 mb-1">PUBLISHED</div>
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-emerald-500">{totalPublished}</div>
            </div>
            <div className={`p-6 rounded-2xl border ${darkTheme ? 'bg-[#0e0e12] border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
              <div className="text-xs font-mono text-neutral-500 mb-1">TOTAL PEMBACA</div>
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-indigo-400">{totalViews}</div>
            </div>
          </div>

          {/* Search bar & Refresh */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari berdasarkan judul..."
                className={`w-full pl-10 pr-4 py-2 rounded-xl text-sm border outline-none transition-all
                  ${darkTheme ? 'bg-neutral-900 border-neutral-800 text-white focus:border-indigo-500' : 'bg-white border-neutral-200 text-black focus:border-indigo-600 shadow-sm'}`}
              />
            </div>

            <button
              onClick={checkAuthAndFetchPosts}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-mono transition-colors
                ${darkTheme ? 'border-neutral-800 text-neutral-400 hover:text-white' : 'border-neutral-200 text-neutral-600 hover:text-black'}`}
            >
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
              Segarkan
            </button>
          </div>

          {/* Posts Table */}
          <div className={`rounded-2xl border overflow-hidden
            ${darkTheme ? 'bg-[#0e0e12] border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
            {loading ? (
              <div className="py-20 text-center text-sm text-neutral-500">Memuat artikel...</div>
            ) : filteredPosts.length === 0 ? (
              <div className="py-16 text-center">
                <FileText className="mx-auto text-neutral-500 mb-2" size={32} />
                <div className="text-sm font-semibold">Tidak ada artikel ditemukan</div>
                <div className="text-xs text-neutral-500 mt-1">Mulai tulis artikel pertama Anda sekarang.</div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className={`text-xs font-mono uppercase border-b
                    ${darkTheme ? 'bg-neutral-900/50 border-neutral-800 text-neutral-400' : 'bg-neutral-50 border-neutral-200 text-neutral-600'}`}>
                    <tr>
                      <th className="py-3.5 px-4 sm:px-6">Judul Artikel</th>
                      <th className="py-3.5 px-4 hidden md:table-cell">Status</th>
                      <th className="py-3.5 px-4 hidden sm:table-cell">Views</th>
                      <th className="py-3.5 px-4 hidden lg:table-cell">Tanggal</th>
                      <th className="py-3.5 px-4 sm:px-6 text-right">Aksi</th>
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
                        <tr key={post.id} className={`transition-colors ${darkTheme ? 'hover:bg-neutral-900/40' : 'hover:bg-neutral-50'}`}>
                          <td className="py-4 px-4 sm:px-6">
                            <div className="font-semibold text-sm line-clamp-1 mb-1">{post.title}</div>
                            <div className="text-xs text-neutral-500 font-mono line-clamp-1">/{post.slug}</div>
                          </td>

                          <td className="py-4 px-4 hidden md:table-cell">
                            <button
                              onClick={() => handleTogglePublish(post)}
                              disabled={actionLoading === post.id}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium transition-colors
                                ${post.published 
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}
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

                          <td className="py-4 px-4 hidden sm:table-cell font-mono text-xs text-neutral-400">
                            {post.views}
                          </td>

                          <td className="py-4 px-4 hidden lg:table-cell font-mono text-xs text-neutral-400">
                            {dateFormatted}
                          </td>

                          <td className="py-4 px-4 sm:px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {post.published && (
                                <Link
                                  to={`/blog/${post.slug}`}
                                  target="_blank"
                                  title="Lihat Halaman Live"
                                  className={`p-2 rounded-lg border transition-colors
                                    ${darkTheme ? 'border-neutral-800 text-neutral-400 hover:text-white' : 'border-neutral-200 text-neutral-600 hover:text-black'}`}
                                >
                                  <ExternalLink size={14} />
                                </Link>
                              )}

                              <Link
                                to={`/admin/editor/${post.id}`}
                                title="Edit Artikel"
                                className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/20 transition-colors"
                              >
                                <Edit3 size={14} />
                              </Link>

                              <button
                                onClick={() => handleDelete(post.id)}
                                disabled={actionLoading === post.id}
                                title="Hapus Artikel"
                                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors"
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
      </div>
    </>
  );
}
