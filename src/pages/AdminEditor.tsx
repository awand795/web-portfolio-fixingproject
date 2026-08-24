import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  ArrowLeft, Save, Eye, Edit3, Image, 
  Tag, Link2, Sparkles, CheckCircle2, AlertCircle,
  Heading2, Heading3, Bold, Italic, Code, Quote, List,
  Table, Columns, EyeOff, FileText, Check, ExternalLink
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

      setSuccess('Artikel berhasil disimpan ke database!');
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1200);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const insertMarkdown = (before: string, after: string = '', defaultText: string = 'teks') => {
    const textarea = document.getElementById('content-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const previousText = textarea.value;
    const selected = previousText.substring(start, end);

    const replacement = before + (selected || defaultText) + after;
    setContent(previousText.substring(0, start) + replacement + previousText.substring(end));
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + replacement.length - after.length);
    }, 50);
  };

  const wordCount = useMemo(() => {
    return content.trim() ? content.trim().split(/\s+/).length : 0;
  }, [content]);

  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

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
        <title>{isEditing ? 'Edit Artikel' : 'Tulis Artikel Baru'} — Awanda Studio</title>
      </Helmet>

      <div className={`${bg} min-h-screen transition-colors duration-500 pb-24 relative overflow-hidden`}>
        {/* ── Studio Topbar ── */}
        <header className="border-b backdrop-blur-xl sticky top-0 z-40 bg-neutral-900/60 dark:bg-black/60 border-neutral-200/40 dark:border-neutral-800/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                to="/admin/dashboard"
                className={`p-2 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5
                  ${darkTheme ? 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-700' : 'border-neutral-200 bg-white text-neutral-600 hover:text-black shadow-sm'}`}
              >
                <ArrowLeft size={14} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>

              <span className="text-xs font-mono text-neutral-500 hidden md:inline">
                {isEditing ? `ID: #${id}` : '📝 Artikel Baru'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Layout Tab Switcher */}
              <div className="flex p-1 rounded-xl border border-neutral-800 bg-[#0e0e12] text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveTab('write')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'write' ? 'bg-indigo-600 text-white font-bold' : 'text-neutral-400 hover:text-white'}`}
                >
                  Editor
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'preview' ? 'bg-indigo-600 text-white font-bold' : 'text-neutral-400 hover:text-white'}`}
                >
                  Preview
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('split')}
                  className={`hidden lg:block px-3 py-1.5 rounded-lg transition-all ${activeTab === 'split' ? 'bg-indigo-600 text-white font-bold' : 'text-neutral-400 hover:text-white'}`}
                >
                  Split
                </button>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-primary hover:opacity-90 text-white text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50"
              >
                <Save size={15} />
                {loading ? 'Menyimpan...' : 'Simpan Artikel'}
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs flex items-center gap-3">
              <AlertCircle size={17} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs flex items-center gap-3">
              <CheckCircle2 size={17} className="shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ── Metadata Settings Card ── */}
            <div className={`p-6 sm:p-8 rounded-3xl border ${darkTheme ? 'bg-[#0e0e12]/90 border-neutral-800/80 shadow-2xl' : 'bg-white border-neutral-200 shadow-sm'}`}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-5">
                {/* Title */}
                <div className="md:col-span-8">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 font-semibold">
                    Judul Artikel *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Contoh: Mengoptimalkan Database PostgreSQL untuk Skala Produksi"
                    className={`w-full px-4 py-3 rounded-2xl text-base font-bold font-display border outline-none transition-all
                      ${darkTheme ? 'bg-neutral-900 border-neutral-800 text-white focus:border-indigo-500' : 'bg-neutral-50 border-neutral-200 text-black focus:border-indigo-600'}`}
                  />
                </div>

                {/* Slug */}
                <div className="md:col-span-4">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 font-semibold">
                    Slug / URL
                  </label>
                  <div className="relative">
                    <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" size={15} />
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="mengoptimalkan-database-postgresql"
                      className={`w-full pl-10 pr-4 py-3 rounded-2xl text-xs font-mono border outline-none transition-all
                        ${darkTheme ? 'bg-neutral-900 border-neutral-800 text-white focus:border-indigo-500' : 'bg-neutral-50 border-neutral-200 text-black focus:border-indigo-600'}`}
                    />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-5">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 font-semibold">
                  Ringkasan / Meta Description
                </label>
                <textarea
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Deskripsi ringkas 1-2 kalimat untuk Google Search dan kartu pratinjau..."
                  className={`w-full px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed border outline-none resize-none transition-all
                    ${darkTheme ? 'bg-neutral-900 border-neutral-800 text-white focus:border-indigo-500' : 'bg-neutral-50 border-neutral-200 text-black focus:border-indigo-600'}`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Cover Image URL */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 font-semibold">
                    Cover Image URL (Unsplash / Cloudinary / Web)
                  </label>
                  <div className="relative">
                    <Image className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" size={15} />
                    <input
                      type="url"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className={`w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs font-mono border outline-none transition-all
                        ${darkTheme ? 'bg-neutral-900 border-neutral-800 text-white focus:border-indigo-500' : 'bg-neutral-50 border-neutral-200 text-black focus:border-indigo-600'}`}
                    />
                  </div>
                  {coverImage && (
                    <div className="mt-3 rounded-xl overflow-hidden aspect-[16/9] max-h-32 bg-neutral-900 border border-neutral-800">
                      <img src={coverImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 font-semibold">
                    Tags / Kategori (Pisahkan dengan koma)
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" size={15} />
                    <input
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      placeholder="React, TypeScript, Backend, Cloud"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs font-mono border outline-none transition-all
                        ${darkTheme ? 'bg-neutral-900 border-neutral-800 text-white focus:border-indigo-500' : 'bg-neutral-50 border-neutral-200 text-black focus:border-indigo-600'}`}
                    />
                  </div>

                  {/* Publish Switch */}
                  <div className="mt-6 pt-4 border-t border-neutral-800/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="published-check"
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-neutral-700 bg-neutral-900 cursor-pointer"
                      />
                      <label htmlFor="published-check" className="text-xs font-medium cursor-pointer">
                        {published ? '🚀 Langsung Publikasikan' : '💾 Simpan Sebagai Draft'}
                      </label>
                    </div>

                    <div className="text-[11px] font-mono text-neutral-500">
                      {wordCount} kata • ~{readingTime} menit baca
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Markdown Formatting Toolbar ── */}
            <div className={`p-2 rounded-2xl border flex flex-wrap items-center gap-1 text-xs font-mono sticky top-16 z-20 backdrop-blur-xl
              ${darkTheme ? 'bg-[#0e0e12]/95 border-neutral-800/80 shadow-xl' : 'bg-white/95 border-neutral-200 shadow-md'}`}>
              <button
                type="button"
                onClick={() => insertMarkdown('## ', '', 'Judul Heading 2')}
                title="Heading 2"
                className="px-2.5 py-1.5 rounded-lg hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors flex items-center gap-1 font-bold"
              >
                <Heading2 size={14} /> H2
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('### ', '', 'Judul Heading 3')}
                title="Heading 3"
                className="px-2.5 py-1.5 rounded-lg hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors flex items-center gap-1 font-bold"
              >
                <Heading3 size={14} /> H3
              </button>

              <div className="h-4 w-px bg-neutral-800 mx-1" />

              <button
                type="button"
                onClick={() => insertMarkdown('**', '**', 'teks tebal')}
                title="Bold"
                className="p-1.5 rounded-lg hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors"
              >
                <Bold size={14} />
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('*', '*', 'teks miring')}
                title="Italic"
                className="p-1.5 rounded-lg hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors"
              >
                <Italic size={14} />
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('`', '`', 'kode_inline')}
                title="Inline Code"
                className="p-1.5 rounded-lg hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors"
              >
                <Code size={14} />
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('```typescript\n// Tulis kode di sini\n', '\n```')}
                title="Code Block"
                className="px-2.5 py-1.5 rounded-lg hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors flex items-center gap-1"
              >
                <Code size={14} /> Block
              </button>

              <div className="h-4 w-px bg-neutral-800 mx-1" />

              <button
                type="button"
                onClick={() => insertMarkdown('> ', '', 'Kutipan penting...')}
                title="Quote"
                className="p-1.5 rounded-lg hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors"
              >
                <Quote size={14} />
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('- ', '', 'Item daftar')}
                title="List"
                className="p-1.5 rounded-lg hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors"
              >
                <List size={14} />
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('[Judul Link](https://', ')')}
                title="Link"
                className="p-1.5 rounded-lg hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors"
              >
                <Link2 size={14} />
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('![Deskripsi Gambar](https://', ')')}
                title="Gambar"
                className="p-1.5 rounded-lg hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors"
              >
                <Image size={14} />
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('\n| Kolom 1 | Kolom 2 |\n| :--- | :--- |\n| Data A | Data B |\n')}
                title="Tabel"
                className="p-1.5 rounded-lg hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors"
              >
                <Table size={14} />
              </button>
            </div>

            {/* ── Editor & Preview Panels ── */}
            <div className={`grid gap-6 ${activeTab === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
              {/* Markdown Write Panel */}
              {(activeTab === 'write' || activeTab === 'split') && (
                <div className={`rounded-3xl border p-5 flex flex-col min-h-[550px]
                  ${darkTheme ? 'bg-[#0e0e12]/90 border-neutral-800/80 shadow-2xl' : 'bg-white border-neutral-200 shadow-sm'}`}>
                  <div className="text-xs font-mono text-neutral-500 mb-3 uppercase flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Edit3 size={13} className="text-indigo-400" />
                      Markdown Studio
                    </span>
                    <span>{content.length} karakter</span>
                  </div>
                  <textarea
                    id="content-textarea"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Mulai tulis artikel dalam format Markdown..."
                    rows={22}
                    className={`w-full flex-1 p-5 rounded-2xl text-sm font-mono leading-relaxed outline-none resize-y border transition-all
                      ${darkTheme ? 'bg-neutral-900/70 border-neutral-800 text-neutral-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20' : 'bg-neutral-50 border-neutral-200 text-black focus:border-indigo-600'}`}
                  />
                </div>
              )}

              {/* Live Preview Panel */}
              {(activeTab === 'preview' || activeTab === 'split') && (
                <div className={`rounded-3xl border p-8 min-h-[550px] overflow-y-auto max-h-[850px]
                  ${darkTheme ? 'bg-[#0e0e12]/90 border-neutral-800/80 shadow-2xl' : 'bg-white border-neutral-200 shadow-sm'}`}>
                  <div className="text-xs font-mono text-indigo-400 mb-6 uppercase flex items-center gap-1.5 font-bold">
                    <Eye size={13} />
                    <span>Live Pratinjau Pembaca</span>
                  </div>
                  <div className={`prose max-w-none prose-neutral ${darkTheme ? 'prose-invert' : ''}`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {content || '*Pratinjau artikel akan muncul di sini secara real-time saat Anda mulai menulis...*'}
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
