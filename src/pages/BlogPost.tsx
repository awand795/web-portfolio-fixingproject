import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  ArrowLeft, Calendar, Eye, Clock, Share2, 
  Check, Copy, MessageCircle, ChevronRight, Bookmark, Sparkles, User,
  CornerDownRight, CheckCircle2, ArrowRight
} from 'lucide-react';
import { Twitter, Linkedin } from '../icons/SocialIcons';
import NavBar from '../Component/NavBar';
import Footer from '../Component/Footer';
import { useTheme } from '../context/ThemeContext';
import { siteUrl } from '../constants';
import avatarImg from '../image/imgprofile.webp';

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

// Custom code block with Copy button & macOS tab design
function CodeBlock({ node, inline, className, children, ...props }: any) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const codeContent = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!inline && match) {
    return (
      <div className="relative group/code my-8 rounded-2xl overflow-hidden border border-neutral-800 bg-[#0a0a10] shadow-2xl">
        {/* Code Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900/90 border-b border-neutral-800/80 text-[11px] font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 uppercase tracking-widest text-indigo-400 font-bold">{match[1]}</span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check size={12} className="text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Code Body */}
        <div className="p-5 sm:p-6 overflow-x-auto text-[13px] sm:text-sm leading-relaxed font-mono">
          <code className={className} {...props}>
            {children}
          </code>
        </div>
      </div>
    );
  }

  return (
    <code className="px-1.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 font-mono text-[13px] border border-indigo-500/20" {...props}>
      {children}
    </code>
  );
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { darkTheme } = useTheme();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const bg = darkTheme ? 'bg-[#08080a] text-neutral-100' : 'bg-[#FAF9F6] text-neutral-900';

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <div className={`${bg} min-h-screen flex flex-col justify-between`}>
        <NavBar />
        <div className="flex flex-col items-center justify-center px-4 py-36 text-center">
          <h1 className="text-2xl font-bold font-display mb-2">Artikel Tidak Ditemukan</h1>
          <p className="text-neutral-500 mb-6 text-sm">Artikel yang Anda cari mungkin telah dihapus atau belum dipublikasikan.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
          >
            <ArrowLeft size={16} />
            Kembali ke Katalog Blog
          </Link>
        </div>
        <Footer />
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
        <title>{post.title} — Awanda Tech Journal</title>
        <meta name="description" content={post.summary} />
        <meta property="og:title" content={`${post.title} — Awanda`} />
        <meta property="og:description" content={post.summary} />
        {post.cover_image && <meta property="og:image" content={post.cover_image} />}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${siteUrl}/blog/${post.slug}`} />
        <link rel="canonical" href={`${siteUrl}/blog/${post.slug}`} />
      </Helmet>

      <div className={`${bg} min-h-screen transition-colors duration-500 selection:bg-indigo-500 selection:text-white relative overflow-hidden flex flex-col justify-between`}>
        {/* Scroll Progress Bar at the Very Top */}
        <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-neutral-800/40">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-100"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Ambient Top Glow */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className={`absolute inset-0 ${darkTheme ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`} />
          {darkTheme && (
            <div className="absolute top-0 right-[20%] w-[45vw] aspect-square rounded-full bg-indigo-600/[0.05] blur-[160px]" />
          )}
        </div>

        {/* Global Navigation */}
        <NavBar />

        {/* ── Article Content Area ── */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-20 w-full">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} className="text-neutral-600" />
            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            <ChevronRight size={12} className="text-neutral-600" />
            <span className="truncate max-w-[220px] text-neutral-300 font-medium">{post.title}</span>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight leading-[1.18] mb-6">
            {post.title}
          </h1>

          {/* Author & Publication Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-y border-neutral-800/60 text-xs font-mono text-neutral-400 mb-8">
            <div className="flex items-center gap-3">
              <img
                src={avatarImg}
                alt="Awanda"
                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500/40 shadow-md"
              />
              <div>
                <div className="font-sans font-bold text-neutral-200 text-sm flex items-center gap-1.5">
                  <span>Awanda</span>
                  <CheckCircle2 size={13} className="text-indigo-400" />
                </div>
                <div className="text-[11px] text-neutral-500">Software Engineer</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px] sm:text-xs">
              <div className="flex items-center gap-1.5">
                <Calendar size={13} className="text-neutral-500" />
                <span>{dateFormatted}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={13} className="text-neutral-500" />
                <span>{readingTime} min read</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye size={13} className="text-neutral-500" />
                <span>{post.views} views</span>
              </div>
            </div>
          </div>

          {/* Featured Cover Image */}
          {post.cover_image && (
            <div className="mb-12 rounded-3xl overflow-hidden aspect-[16/9] bg-neutral-900 border border-neutral-800 shadow-2xl">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Markdown Body */}
          <article className={`prose max-w-none prose-base sm:prose-lg prose-neutral ${darkTheme ? 'prose-invert' : ''}
            prose-headings:font-display prose-headings:tracking-tight prose-headings:font-bold
            prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-neutral-800/60
            prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8
            prose-p:leading-[1.9] prose-p:text-neutral-300 dark:prose-p:text-neutral-300 prose-p:my-5
            prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-500/[0.04] prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-neutral-300
            prose-img:rounded-3xl prose-img:border prose-img:border-neutral-800/80 prose-img:shadow-xl
            prose-ul:my-5 prose-li:my-1.5
            prose-a:text-indigo-400 prose-a:underline hover:prose-a:text-indigo-300
          `}>
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                code: CodeBlock
              }}
            >
              {post.content}
            </ReactMarkdown>
          </article>

          {/* ── Author Bio Box & Sharing ── */}
          <div className={`mt-16 p-8 sm:p-10 rounded-3xl border ${darkTheme ? 'bg-[#0e0e14] border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img
                src={avatarImg}
                alt="Awanda"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/40 shrink-0 shadow-lg"
              />
              <div className="flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-400 mb-1 font-bold">
                  <span>TENTANG PENULIS</span>
                </div>
                <h3 className="text-xl font-bold font-display mb-1.5">Awanda</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-5">
                  Fullstack Software Engineer yang berfokus pada arsitektur web modern, sistem basis data cloud, dan pengembangan aplikasi mobile. Menulis catatan teknis seputar arsitektur dan best practices.
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <a
                    href="https://github.com/awand795"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono px-3.5 py-1.5 rounded-xl border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/awanda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono px-3.5 py-1.5 rounded-xl border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                  <Link
                    to="/"
                    className="text-xs font-mono px-3.5 py-1.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-600/30 transition-colors"
                  >
                    Portofolio
                  </Link>
                </div>
              </div>
            </div>

            {/* Social Share Bar */}
            <div className="mt-8 pt-6 border-t border-neutral-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono text-neutral-400 flex items-center gap-2">
                <Share2 size={14} className="text-indigo-400" />
                <span>Bagikan tulisan ini:</span>
              </span>

              <div className="flex items-center gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-neutral-800 hover:border-indigo-500 hover:text-indigo-400 text-neutral-400 transition-colors"
                  title="Share to Twitter / X"
                >
                  <Twitter size={15} />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-neutral-800 hover:border-indigo-500 hover:text-indigo-400 text-neutral-400 transition-colors"
                  title="Share to LinkedIn"
                >
                  <Linkedin size={15} />
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title} - ${shareUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-neutral-800 hover:border-indigo-500 hover:text-indigo-400 text-neutral-400 transition-colors"
                  title="Share to WhatsApp"
                >
                  <MessageCircle size={15} />
                </a>
                <button
                  onClick={copyToClipboard}
                  className="p-2.5 rounded-xl border border-neutral-800 hover:border-indigo-500 hover:text-indigo-400 text-neutral-400 transition-colors"
                  title="Copy link"
                >
                  {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Global Footer */}
        <Footer />
      </div>
    </>
  );
}
