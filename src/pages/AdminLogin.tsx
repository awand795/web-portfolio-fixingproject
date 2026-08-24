import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Lock, User, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { darkTheme } = useTheme();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
        <title>Admin Login — Awanda CMS</title>
      </Helmet>

      <div className={`${bg} min-h-screen flex flex-col justify-between p-4 sm:p-6`}>
        <div>
          <Link
            to="/"
            className={`inline-flex items-center gap-2 text-xs font-medium transition-colors
              ${darkTheme ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-black'}`}
          >
            <ArrowLeft size={14} />
            Kembali ke Portofolio
          </Link>
        </div>

        <div className="w-full max-w-md mx-auto my-auto py-8">
          <div className={`p-8 rounded-3xl border shadow-2xl backdrop-blur-xl
            ${darkTheme ? 'bg-[#0e0e12]/90 border-neutral-800' : 'bg-white border-neutral-200 shadow-neutral-200/50'}`}>
            
            <div className="text-center mb-8">
              <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 mb-4 border border-indigo-500/20">
                <ShieldCheck size={28} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight font-display mb-1">
                Admin CMS
              </h1>
              <p className="text-xs text-neutral-500">
                Masuk untuk mengelola postingan dan konten blog.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan username"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border outline-none transition-all
                      ${darkTheme 
                        ? 'bg-neutral-900/60 border-neutral-800 text-white focus:border-indigo-500' 
                        : 'bg-neutral-50 border-neutral-200 text-black focus:border-indigo-600'}`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border outline-none transition-all
                      ${darkTheme 
                        ? 'bg-neutral-900/60 border-neutral-800 text-white focus:border-indigo-500' 
                        : 'bg-neutral-50 border-neutral-200 text-black focus:border-indigo-600'}`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold tracking-wide transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50"
              >
                {loading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}
              </button>
            </form>
          </div>
        </div>

        <div className="text-center text-xs text-neutral-500 font-mono">
          Awanda Content Management System &copy; 2026
        </div>
      </div>
    </>
  );
}
