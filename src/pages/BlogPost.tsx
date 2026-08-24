import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  ArrowLeft, Calendar, Eye, Clock, Share2, 
  Check, Copy, MessageCircle 
} from 'lucide-react';
import { Twitter, Linkedin } from '../icons/SocialIcons';
import { useTheme } from '../context/ThemeContext';
import { siteUrl } from '../constants';

interface Post {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  cover_image: string;
  tags: string[];
  views: number;
  created_at: string;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { darkTheme } = useTheme();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const bg = darkTheme ? 'bg-[#08080a] text-neutral-100' : 'bg-[#FAF9F6] text-neutral-900';

  useEffect(() => {
    if (!slug) return;
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('awanda_admin_token');
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/posts/${slug}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setPost(data.post);
      } else {
        setPost(null);
      }
    } catch (err) {
      console.error('Failed to fetch post:', err);
    } finally {
      setLoading(false);
    }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `${siteUrl}/blog/${slug}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Estimate reading time
  const readingTime = post 
    ? Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200))
    : 1;

  if (loading) {
    return (
      <div className={`${bg} min-h-screen flex items-center justify-center`}>
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className={`${bg} min-h-screen flex flex-col items-center justify-center px-4 text-center`}>
        <h1 className="text-2xl font-bold mb-2">Artikel Tidak Ditemukan</h1>
        <p className="text-neutral-500 mb-6 text-sm">Artikel yang Anda cari mungkin telah dihapus atau belum dipublikasikan.</p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          <ArrowLeft size={16} />
          Kembali ke Blog
        </Link>
      </div>
    );
  }

  const dateFormatted = new Date(post.created_at).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <>
      <Helmet>
        <title>{post.title} — Awanda Blog</title>
        <meta name="description" content={post.summary} />
        <meta property="og:title" content={`${post.title} — Awanda`} />
        <meta property="og:description" content={post.summary} />
        {post.cover_image && <meta property="og:image" content={post.cover_image} />}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${siteUrl}/blog/${post.slug}`} />
        <link rel="canonical" href={`${siteUrl}/blog/${post.slug}`} />
      </Helmet>

      <div className={`${bg} min-h-screen transition-colors duration-500 selection:bg-indigo-500 selection:text-white pb-24`}>
        {/* Navigation header */}
        <div className="sticky top-0 z-30 backdrop-blur-md border-b bg-neutral-900/40 dark:bg-black/40 border-neutral-200/40 dark:border-neutral-800/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link
              to="/blog"
              className={`inline-flex items-center gap-2 text-xs sm:text-sm font-medium transition-colors
                ${darkTheme ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-black'}`}
            >
              <ArrowLeft size={16} />
              Semua Artikel
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={copyToClipboard}
                title="Salin tautan artikel"
                className={`p-2 rounded-lg border text-xs font-mono transition-colors flex items-center gap-1.5
                  ${darkTheme ? 'border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700' : 'border-neutral-200 text-neutral-600 hover:text-black'}`}
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                <span className="hidden sm:inline">{copied ? 'Tersalin' : 'Salin Link'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-8">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta bar */}
          <div className={`flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono pb-6 border-b
            ${darkTheme ? 'border-neutral-800 text-neutral-400' : 'border-neutral-200 text-neutral-500'}`}>
            <div className="flex items-center gap-1.5">
              <Calendar size={13} />
              <span>{dateFormatted}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={13} />
              <span>{readingTime} menit membaca</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye size={13} />
              <span>{post.views} pembaca</span>
            </div>
          </div>

          {/* Cover Image */}
          {post.cover_image && (
            <div className="mt-8 rounded-2xl overflow-hidden aspect-[16/9] bg-neutral-900 border border-neutral-800/80 shadow-2xl">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </header>

        {/* Article Content / Markdown Renderer */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6">
          <article className={`prose max-w-none prose-neutral ${darkTheme ? 'prose-invert' : ''}
            prose-headings:font-display prose-headings:tracking-tight prose-headings:font-bold
            prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-neutral-800/40
            prose-h3:text-xl prose-h3:mt-8
            prose-p:leading-relaxed prose-p:text-base prose-p:my-4
            prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:bg-indigo-500/10 prose-code:text-indigo-400 prose-code:font-mono prose-code:text-sm
            prose-pre:bg-[#0d0d12] prose-pre:border prose-pre:border-neutral-800 prose-pre:rounded-xl prose-pre:p-4 prose-pre:shadow-xl
            prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-500/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
            prose-img:rounded-2xl prose-img:border prose-img:border-neutral-800/80 prose-img:shadow-lg
            prose-ul:my-4 prose-ol:my-4
          `}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </article>

          {/* Share Section */}
          <div className={`mt-16 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4
            ${darkTheme ? 'border-neutral-800' : 'border-neutral-200'}`}>
            <div>
              <h4 className="text-sm font-semibold mb-1">Bagikan artikel ini</h4>
              <p className="text-xs text-neutral-500">Bantu sebarkan wawasan ini ke rekan developer lainnya.</p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-xl border transition-colors ${darkTheme ? 'border-neutral-800 hover:border-indigo-500 hover:text-indigo-400' : 'border-neutral-200 hover:border-indigo-600 hover:text-indigo-600'}`}
              >
                <Twitter size={16} />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-xl border transition-colors ${darkTheme ? 'border-neutral-800 hover:border-indigo-500 hover:text-indigo-400' : 'border-neutral-200 hover:border-indigo-600 hover:text-indigo-600'}`}
              >
                <Linkedin size={16} />
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title} - ${shareUrl}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-xl border transition-colors ${darkTheme ? 'border-neutral-800 hover:border-indigo-500 hover:text-indigo-400' : 'border-neutral-200 hover:border-indigo-600 hover:text-indigo-600'}`}
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
