import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { darkTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <footer className={`py-10 border-t relative z-10 ${darkTheme ? 'border-neutral-900 bg-[#08080a]' : 'border-neutral-200 bg-[#FAF9F6]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`flex items-center gap-2 text-xs font-mono tracking-wider uppercase transition-colors 
            ${darkTheme ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'}`}
        >
          <ArrowUp size={14} />
          {t('footer.backToTop') || 'Kembali ke Atas'}
        </button>
        <p className={`text-xs font-mono tracking-wide ${darkTheme ? 'text-neutral-500' : 'text-neutral-500'}`}>
          © {new Date().getFullYear()} Awanda. {t('footer.builtWith') || 'Built with React & lots of ☕'}
        </p>
      </div>
    </footer>
  );
}
