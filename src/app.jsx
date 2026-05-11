import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import picture from './image/imgprofile.webp'
import reactLogo from './image/reactLogo.webp';
import js from './image/js.webp'
import mongoDbLogo from './image/mongoDbLogo.webp'
import dockerLogo from './image/dockerLogo.webp'
import nodeJSLogo from './image/nodeJsLogo.webp'
import bootstrapLogo from './image/bootstrap.webp'
import expressJs from './image/expressjs.webp'
import MyProject from './Component/MyProject';
import NavBar from './Component/NavBar';
import PWAInstallPrompt from './Component/PWAInstallPrompt';
import { useLanguage } from './context/LanguageContext';
import { useTheme } from './context/ThemeContext';
import { scroller } from 'react-scroll';

const App = () => {

    const { t } = useLanguage();
    const { darkTheme, setDarkTheme } = useTheme();
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        document.title = "Awanda - IT Web Developer at Darkotech";
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out'
        });

        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const socialIcons = [
        { icon: 'bi-github', url: 'https://github.com/awand795', label: 'GitHub' },
        { icon: 'bi-linkedin', url: 'https://linkedin.com/in/awanda', label: 'LinkedIn' },
        { icon: 'bi-facebook', url: 'https://facebook.com/awandd6', label: 'Facebook' },
        { icon: 'bi-instagram', url: 'https://instagram.com/adnawaa', label: 'Instagram' },
    ];

    return (
        <div className={darkTheme ? 'bg-dark text-white' : 'bg-light text-dark'}>

            <a className="skip-link" href="#main-content">Skip to main content</a>

            <div className="container-fluid">

                {/* Navigation */}
                <header>
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <NavBar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
                        </div>
                    </div>
                </header>

                <main id="main-content">
                    {/* Hero Section */}
                    <div className="row justify-content-center align-items-center pt-4 pb-5" style={{ minHeight: '80vh' }}>
                        <div className="col-lg-5 text-center mb-5 mb-lg-0" data-aos="fade-right">
                            <div className="profile-wrapper">
                                <img
                                    src={picture}
                                    className="gambarprofile"
                                    alt="Awanda - Fullstack JavaScript Developer"
                                    fetchpriority="high"
                                    width="400"
                                    height="400"
                                />
                            </div>
                        </div>

                        <div className='col-lg-6' data-aos="fade-left">
                            <div>
                                <p
                                    className="text-gradient mb-2"
                                    style={{ fontSize: '1.25rem', fontWeight: '600', letterSpacing: '0.1em' }}
                                >
                                    {t('hero.greeting')}
                                </p>

                                <h1 className="display-1 mb-4">
                                    Awanda
                                </h1>

                                <h2
                                    className="h3 mb-4 typing-wrapper"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    <span className="typing-text">{t('hero.title')}</span>
                                </h2>

                                <p className="text-justify mb-5">
                                    {t('hero.description')}
                                </p>

                                <div className="d-flex flex-wrap gap-3">
                                    <a
                                        className="btn btn-gradient btn-modern"
                                        href='/files/CV Fullstack Developer - Awanda.pdf'
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download
                                    >
                                        <i className="bi bi-download me-2"></i>
                                        {t('hero.downloadCv')}
                                    </a>

                                    <a
                                        className="btn btn-outline-modern btn-modern"
                                        href='#contact'
                                    >
                                        <i className="bi bi-envelope me-2"></i>
                                        {t('hero.getInTouch')}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Projects Section */}
                    <div className='py-5'>
                        <MyProject darkTheme={darkTheme} />
                    </div>

                    <div className="section-divider"></div>

                    {/* Skills Section */}
                    <div id="skill" className="row text-center pt-5 justify-content-center" data-aos="fade-up">
                        <div className="col-12">
                            <div className="section-header mx-auto">
                                <h2 className="section-title">{t('skills.title')}</h2>
                                <div className="section-underline"></div>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center pt-3 text-center mb-5" data-aos="fade-up">
                        <div className="col-lg-8">
                            <p className="text-justify text-center" style={{ fontSize: '1.125rem', lineHeight: '1.8' }}>
                                {t('skills.description.before')}
                                <span className="skill-tag mx-2">
                                    <img src={js} alt="JavaScript" height="24" width="24" loading="lazy" />
                                    JavaScript
                                </span>
                                {t('skills.description.mid')}
                                <span className="skill-tag mx-2">
                                    <img src={reactLogo} alt="React" height="24" width="24" loading="lazy" />
                                    React
                                </span>
                                {t('skills.description.and')}
                                <span className="skill-tag mx-2">
                                    <img src={expressJs} alt="Express.js" height="24" width="24" loading="lazy" />
                                    Express.js
                                </span>
                                {t('skills.description.after')}
                            </p>
                        </div>
                    </div>

                    <div className="row justify-content-center text-center pt-4 pb-5">
                        <div className="col-lg-10">
                            <div
                                className="d-flex flex-wrap justify-content-center align-items-center gap-4"
                                data-aos="zoom-in"
                            >
                                {[
                                    { img: reactLogo, url: 'https://reactjs.org', name: 'React' },
                                    { img: js, url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', name: 'JavaScript' },
                                    { img: bootstrapLogo, url: 'https://getbootstrap.com', name: 'Bootstrap' },
                                    { img: mongoDbLogo, url: 'https://www.mongodb.com', name: 'MongoDB' },
                                    { img: nodeJSLogo, url: 'https://nodejs.org', name: 'Node.js' },
                                    { img: dockerLogo, url: 'https://www.docker.com', name: 'Docker' },
                                ].map((tech, index) => (
                                    <a
                                        key={index}
                                        href={tech.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${tech.name} official website`}
                                    >
                                        <img
                                            src={tech.img}
                                            alt={`${tech.name} logo`}
                                            className="imgLogo"
                                            loading="lazy"
                                            width="80"
                                            height="80"
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="section-divider"></div>

                    {/* Contact Section */}
                    <div id="contact" className="row text-center pt-5 justify-content-center" data-aos="fade-up">
                        <div className="col-12">
                            <div className="section-header mx-auto">
                                <h2 className="section-title">{t('contact.title')}</h2>
                                <div className="section-underline"></div>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center pt-4 pb-5" data-aos="fade-up">
                        <div className="col-lg-8 text-center">
                            <div>
                                <p className="h4 mb-4" style={{ color: 'var(--text-secondary)' }}>
                                    {t('contact.cta')}
                                </p>

                                <a
                                    href="mailto:awand795@gmail.com"
                                    className="email-modern d-inline-block mb-4"
                                >
                                    awand795@gmail.com
                                </a>

                                <div className="mt-4 mb-3">
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
                                        <i className="bi bi-phone me-2"></i>
                                        <a
                                            href="tel:+6282362851796"
                                            className={darkTheme ? 'text-white text-decoration-none' : 'text-dark text-decoration-none'}
                                            style={{ transition: 'color 0.3s' }}
                                        >
                                            +62 823-6285-1796
                                        </a>
                                    </p>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
                                        <i className="bi bi-geo-alt me-2"></i>
                                        {t('contact.location')}
                                    </p>
                                </div>

                                <div className="mt-5">
                                    {socialIcons.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.label}
                                            className="social-icon"
                                        >
                                            <i className={`bi ${social.icon}`}></i>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="row justify-content-center pt-0 pb-4">
                    <div className="col-lg-10">
                        {/* Back to top */}
                        <div className="text-center mb-3">
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); scrollToTop(); }}
                                className="footer-link"
                                style={{ textDecoration: 'none', fontWeight: '500', fontSize: '0.875rem' }}
                            >
                                <i className="bi bi-arrow-up me-1"></i>
                                {t('footer.backToTop')}
                            </a>
                        </div>

                        <div className="text-center">
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                © {new Date().getFullYear()} Awanda. {t('footer.builtWith')}
                            </p>
                        </div>
                    </div>
                </footer>

            </div>

            {/* Back to Top Button */}
            {showBackToTop && (
                <button
                    className="back-to-top-btn"
                    onClick={scrollToTop}
                    aria-label={t('footer.backToTop')}
                >
                    <i className="bi bi-arrow-up"></i>
                </button>
            )}

            {/* PWA Install Prompt */}
            <PWAInstallPrompt darkTheme={darkTheme} />
        </div>
    );
}

export default App;

