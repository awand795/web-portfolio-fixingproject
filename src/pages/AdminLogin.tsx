import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Lock, User, ArrowLeft, ShieldCheck, AlertCircle, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { darkTheme } = useTheme();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const bg = darkTheme ? 'bg-[#08080a] text-neutral-100' : 'bg-[#FAF9F6] text-neutral-900';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login gagal, periksa username dan password Anda');
      }

      localStorage.setItem('awanda_admin_token', data.token);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Studio Login — Awanda CMS</title>
      </Helmet>

      <div className={`${bg} min-h-screen flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden`}>
        {/* Ambient Glow */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className={`absolute inset-0 ${darkTheme ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`} />
          {darkTheme && (
            <div className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[50vw] aspect-square rounded-full bg-indigo-600/[0.06] blur-[150px]" />
          )}
        </div>

        {/* Back Link */}
        <div className="relative z-10">
          <Link
            to="/"
            className={`inline-flex items-center gap-2 text-xs font-mono transition-colors
              ${darkTheme ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-black'}`}
          >
            <ArrowLeft size={14} />
            Kembali ke Portofolio
          </Link>
        </div>

        {/* Login Modal Box */}
        <div className="relative z-10 w-full max-w-md mx-auto my-auto py-8">
          <div className={`p-8 sm:p-10 rounded-3xl border shadow-2xl backdrop-blur-2xl transition-all
            ${darkTheme ? 'bg-[#0e0e12]/90 border-neutral-800/90 shadow-indigo-500/5' : 'bg-white border-neutral-200 shadow-xl'}`}>
            
            <div className="text-center mb-8">
              <div className="inline-flex p-3.5 rounded-2xl bg-gradient-primary text-white mb-4 shadow-lg shadow-indigo-600/30">
                <ShieldCheck size={28} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display mb-1.5">
                Awanda Studio CMS
              </h1>
              <p className="text-xs text-neutral-400 font-mono">
                Autentikasi panel admin pengelolaan artikel.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs flex items-center gap-3">
                <AlertCircle size={17} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 font-semibold">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan username admin"
                    className={`w-full pl-11 pr-4 py-3 rounded-2xl text-sm border outline-none transition-all
                      ${darkTheme 
                        ? 'bg-neutral-900/80 border-neutral-800 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20' 
                        : 'bg-neutral-50 border-neutral-200 text-black focus:border-indigo-600'}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 font-semibold">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className={`w-full pl-11 pr-11 py-3 rounded-2xl text-sm border outline-none transition-all
                      ${darkTheme 
                        ? 'bg-neutral-900/80 border-neutral-800 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20' 
                        : 'bg-neutral-50 border-neutral-200 text-black focus:border-indigo-600'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-3.5 rounded-2xl bg-gradient-primary hover:opacity-95 text-white text-sm font-semibold tracking-wide transition-all shadow-lg shadow-indigo-600/30 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Memverifikasi Akses...</span>
                ) : (
                  <>
                    <span>Masuk ke Dashboard</span>
                    <Sparkles size={15} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-center text-xs text-neutral-500 font-mono">
          Awanda CMS Studio &bull; Protected by Aiven Cloud & Netlify Serverless &copy; 2026
        </div>
      </div>
    </>
  );
}
