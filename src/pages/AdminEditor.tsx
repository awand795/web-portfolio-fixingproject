import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  ArrowLeft, Save, Eye, Edit3, Image, 
  Tag, Link2, Sparkles, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function AdminEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { darkTheme } = useTheme();

  const isEditing = Boolean(id);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [published, setPublished] = useState(true);

  const [activeTab, setActiveTab] = useState<'write' | 'preview' | 'split'>('split');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditing);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const bg = darkTheme ? 'bg-[#08080a] text-neutral-100' : 'bg-[#FAF9F6] text-neutral-900';

  useEffect(() => {
    const token = localStorage.getItem('awanda_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    if (isEditing) {
      fetchPostDetail(id!);
    }
  }, [id]);

  const fetchPostDetail = async (postId: string) => {
    try {
      setFetchLoading(true);
      const token = localStorage.getItem('awanda_admin_token');
      const res = await fetch('/api/admin/posts', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        const found = (data.posts || []).find((p: any) => p.id === parseInt(postId, 10));
        if (found) {
          setTitle(found.title);
          setSlug(found.slug);
          setSummary(found.summary || '');
          setContent(found.content || '');
          setCoverImage(found.cover_image || '');
          setTagsInput((found.tags || []).join(', '));
          setPublished(found.published);
        } else {
          setError('Artikel tidak ditemukan');
        }
      }
    } catch (err) {
      setError('Gagal memuat artikel');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isEditing || !slug) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generatedSlug);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const token = localStorage.getItem('awanda_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      summary,
      content,
      cover_image: coverImage,
      tags,
      published
    };

    try {
      const url = isEditing ? `/api/posts/${id}` : '/api/posts';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal menyimpan artikel');
      }

      setSuccess('Artikel berhasil disimpan!');
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.getElementById('content-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const previousText = textarea.value;
    const selected = previousText.substring(start, end);

    const replacement = before + (selected || 'teks') + after;
    setContent(previousText.substring(0, start) + replacement + previousText.substring(end));
  };

  if (fetchLoading) {
    return (
      <div className={`${bg} min-h-screen flex items-center justify-center`}>
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isEditing ? 'Edit Artikel' : 'Tulis Artikel Baru'} — Awanda CMS</title>
      </Helmet>

      <div className={`${bg} min-h-screen transition-colors duration-500 pb-20`}>
        {/* Editor Topbar */}
        <header className="border-b backdrop-blur-md sticky top-0 z-30 bg-neutral-900/40 dark:bg-black/40 border-neutral-200/40 dark:border-neutral-800/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                to="/admin/dashboard"
                className={`p-2 rounded-xl border text-xs font-mono transition-colors flex items-center gap-1.5
                  ${darkTheme ? 'border-neutral-800 text-neutral-400 hover:text-white' : 'border-neutral-200 text-neutral-600 hover:text-black'}`}
              >
                <ArrowLeft size={14} />
                <span className="hidden sm:inline">Kembali ke Dashboard</span>
              </Link>

              <span className="text-xs font-mono text-neutral-500 hidden md:inline">
                {isEditing ? `Edit: #${id}` : 'Draft Baru'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Tab Selector (Mobile / Desktop) */}
              <div className="flex p-1 rounded-xl border border-neutral-800 bg-neutral-900/50 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveTab('write')}
                  className={`px-3 py-1 rounded-lg transition-colors ${activeTab === 'write' ? 'bg-indigo-600 text-white' : 'text-neutral-400'}`}
                >
                  Editor
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 rounded-lg transition-colors ${activeTab === 'preview' ? 'bg-indigo-600 text-white' : 'text-neutral-400'}`}
                >
                  Preview
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('split')}
                  className={`hidden lg:block px-3 py-1 rounded-lg transition-colors ${activeTab === 'split' ? 'bg-indigo-600 text-white' : 'text-neutral-400'}`}
                >
                  Split
                </button>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50"
              >
                <Save size={15} />
                {loading ? 'Menyimpan...' : 'Simpan & Rilis'}
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Metadata Card */}
            <div className={`p-6 rounded-3xl border ${darkTheme ? 'bg-[#0e0e12] border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Judul Artikel *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Contoh: Mengoptimalkan Database PostgreSQL untuk Serverless"
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border outline-none font-medium
                      ${darkTheme ? 'bg-neutral-900 border-neutral-800 text-white focus:border-indigo-500' : 'bg-neutral-50 border-neutral-200 text-black focus:border-indigo-600'}`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Custom Slug / URL
                  </label>
                  <div className="relative">
                    <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" size={15} />
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="mengoptimalkan-database-postgresql"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-mono border outline-none
                        ${darkTheme ? 'bg-neutral-900 border-neutral-800 text-white focus:border-indigo-500' : 'bg-neutral-50 border-neutral-200 text-black focus:border-indigo-600'}`}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                  Ringkasan / Meta Description
                </label>
                <input
                  type="text"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Ringkasan singkat 1-2 kalimat untuk SEO & preview artikel..."
                  className={`w-full px-4 py-2.5 rounded-xl text-sm border outline-none
                    ${darkTheme ? 'bg-neutral-900 border-neutral-800 text-white focus:border-indigo-500' : 'bg-neutral-50 border-neutral-200 text-black focus:border-indigo-600'}`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Cover Image URL (Unsplash / Cloudinary / Web)
                  </label>
                  <div className="relative">
                    <Image className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" size={15} />
                    <input
                      type="url"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-mono border outline-none
                        ${darkTheme ? 'bg-neutral-900 border-neutral-800 text-white focus:border-indigo-500' : 'bg-neutral-50 border-neutral-200 text-black focus:border-indigo-600'}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Tags (Pisahkan dengan koma)
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" size={15} />
                    <input
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      placeholder="React, PostgreSQL, Tutorial, Architecture"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-mono border outline-none
                        ${darkTheme ? 'bg-neutral-900 border-neutral-800 text-white focus:border-indigo-500' : 'bg-neutral-50 border-neutral-200 text-black focus:border-indigo-600'}`}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-neutral-800/40 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-neutral-700 bg-neutral-900"
                  />
                  <span className="text-xs font-medium">Publikasikan artikel ini ke web blog publik</span>
                </label>
              </div>
            </div>

            {/* Markdown Toolbar */}
            <div className={`p-2 rounded-2xl border flex flex-wrap items-center gap-1.5 text-xs font-mono
              ${darkTheme ? 'bg-[#0e0e12] border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
              <button
                type="button"
                onClick={() => insertMarkdown('## ')}
                className="px-2.5 py-1.5 rounded-lg hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors"
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('### ')}
                className="px-2.5 py-1.5 rounded-lg hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors"
              >
                H3
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('**', '**')}
                className="px-2.5 py-1.5 rounded-lg font-bold hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors"
              >
                B
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('*', '*')}
                className="px-2.5 py-1.5 rounded-lg italic hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors"
              >
                I
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('```typescript\n', '\n```')}
                className="px-2.5 py-1.5 rounded-lg hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors"
              >
                Code Block
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('[Judul Link](', ')')}
                className="px-2.5 py-1.5 rounded-lg hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors"
              >
                Link
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('![Deskripsi Gambar](', ')')}
                className="px-2.5 py-1.5 rounded-lg hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors"
              >
                Image
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('> ')}
                className="px-2.5 py-1.5 rounded-lg hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors"
              >
                Quote
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('- ')}
                className="px-2.5 py-1.5 rounded-lg hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors"
              >
                List
              </button>
            </div>

            {/* Split Editor / Preview */}
            <div className={`grid gap-6 ${activeTab === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
              {/* Write Panel */}
              {(activeTab === 'write' || activeTab === 'split') && (
                <div className={`rounded-3xl border p-4 flex flex-col min-h-[500px]
                  ${darkTheme ? 'bg-[#0e0e12] border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                  <div className="text-xs font-mono text-neutral-500 mb-2 uppercase flex items-center gap-1.5">
                    <Edit3 size={13} />
                    <span>Markdown Content</span>
                  </div>
                  <textarea
                    id="content-textarea"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tulis konten artikel dalam format Markdown di sini..."
                    rows={20}
                    className={`w-full flex-1 p-4 rounded-2xl text-sm font-mono leading-relaxed outline-none resize-y border
                      ${darkTheme ? 'bg-neutral-900/60 border-neutral-800 text-white focus:border-indigo-500' : 'bg-neutral-50 border-neutral-200 text-black focus:border-indigo-600'}`}
                  />
                </div>
              )}

              {/* Live Preview Panel */}
              {(activeTab === 'preview' || activeTab === 'split') && (
                <div className={`rounded-3xl border p-6 min-h-[500px] overflow-y-auto max-h-[800px]
                  ${darkTheme ? 'bg-[#0e0e12] border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                  <div className="text-xs font-mono text-indigo-400 mb-4 uppercase flex items-center gap-1.5">
                    <Eye size={13} />
                    <span>Live Preview</span>
                  </div>
                  <div className={`prose max-w-none prose-sm sm:prose-base prose-neutral ${darkTheme ? 'prose-invert' : ''}`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {content || '*Preview artikel akan muncul di sini saat Anda mulai mengetik...*'}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
