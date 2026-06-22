import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import NavBar from './Component/NavBar';
import PWAInstallPrompt from './Component/PWAInstallPrompt';
import HeroSection from './components/HeroSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import BackToTop from './components/BackToTop';
import MyProject from './Component/MyProject';
import { useLanguage } from './context/LanguageContext';
import { useTheme } from './context/ThemeContext';
import { siteUrl } from './constants';

interface BackgroundCanvasProps {
  darkTheme: boolean;
}

const BackgroundCanvas = ({ darkTheme }: BackgroundCanvasProps) => {
  if (!darkTheme) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <div className="absolute top-[-200px] right-[-100px] w-[600px] h-[600px]
        rounded-full bg-violet-600/[0.04] blur-[160px]" />
      <div className="absolute bottom-[-100px] left-[-200px] w-[500px] h-[500px]
        rounded-full bg-cyan-500/[0.03] blur-[140px]" />
    </div>
  );
};

const Divider = ({ darkTheme }: { darkTheme: boolean }) => (
  <div className={`w-2/3 max-w-xl mx-auto h-px mb-4 ${darkTheme ? 'bg-gradient-to-r from-transparent via-white/10 to-transparent' : 'bg-gradient-to-r from-transparent via-slate-200 to-transparent'}`} />
);

const App = () => {
  const { t } = useLanguage();
  const { darkTheme, setDarkTheme } = useTheme();
  const [showBackToTop, setShowBackToTop] = React.useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const bg = darkTheme ? 'bg-[#050a14] text-slate-100' : 'bg-white text-slate-900';

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowBackToTop(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>Awanda — Software Developer</title>
        <meta property="og:title" content="Awanda — Software Developer" />
        <meta property="og:description" content="I code stuff. Web apps, Android apps — fullstack. I enjoy building things from the ground up, from the database to the UI. Simple as that." />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={`${siteUrl}/awanda-profile.jpg`} />
        <meta property="og:image:secure_url" content={`${siteUrl}/awanda-profile.jpg`} />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="400" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Awanda Portfolio" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Awanda — Software Developer" />
        <meta name="twitter:description" content="I code stuff. Web apps, Android apps — fullstack. I enjoy building things from the ground up, from the database to the UI. Simple as that." />
        <meta name="twitter:image" content={`${siteUrl}/awanda-profile.jpg`} />
        <link rel="canonical" href={siteUrl} />
      </Helmet>
      <div className={`${bg} min-h-screen transition-colors duration-300 relative overflow-x-hidden`}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <BackgroundCanvas darkTheme={darkTheme} />

      <header className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NavBar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <main id="main-content">

          <div ref={sentinelRef} />
          <HeroSection darkTheme={darkTheme} />

          <Divider darkTheme={darkTheme} />

          <section className="py-20">
            <MyProject darkTheme={darkTheme} />
          </section>

          <Divider darkTheme={darkTheme} />

          <SkillsSection darkTheme={darkTheme} />

          <Divider darkTheme={darkTheme} />

          <ContactSection darkTheme={darkTheme} />

        </main>
      </div>

      <BackToTop show={showBackToTop} label={t('footer.backToTop')} />

      <PWAInstallPrompt darkTheme={darkTheme} />
    </div>
    </>
  );
};

export default App;
