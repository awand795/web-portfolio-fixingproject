import React from "react";
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import NavBar from '../Component/NavBar';
import picture from '../image/imgprofile.webp';
import { motion } from 'framer-motion';
import { Globe, Mail } from 'lucide-react';
import { Github, Linkedin, Facebook, Instagram } from '../icons/SocialIcons';

const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com/awandd6', icon: Facebook, gradient: 'linear-gradient(to right, #3b5998, #5a7abf)' },
    { name: 'Instagram', url: 'https://instagram.com/adnawaa', icon: Instagram, gradient: 'linear-gradient(to right, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/awanda', icon: Linkedin, gradient: 'linear-gradient(to right, #0e76a8, #2bb0ee)' },
    { name: 'GitHub', url: 'https://github.com/awand795', icon: Github, gradient: 'linear-gradient(to right, #171515, #1b1818)' },
    { name: 'WhatsApp', url: 'https://wa.me/6282362851796', icon: Globe, gradient: 'linear-gradient(to right, #4FCE5D, #60d26d)' }
];

const SocialButton = ({ link, index }) => (
    <motion.a
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1, duration: 0.4 }}
        whileHover={{ scale: 1.03, x: 4 }}
        whileTap={{ scale: 0.97 }}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${link.name} profile`}
        className="flex items-center gap-4 px-6 py-4 rounded-xl text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300"
        style={{ background: link.gradient }}
    >
        <link.icon size={22} />
        {link.name}
    </motion.a>
);

const Socmed = () => {
    const { t } = useLanguage();
    const { darkTheme, setDarkTheme } = useTheme();
    const currentYear = new Date().getFullYear();

    React.useEffect(() => {
        document.title = "Awanda - Social Links & Contact";
    }, []);

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkTheme ? 'bg-[#020617] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header>
                    <NavBar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
                </header>

                <main className="pb-16">
                    {/* Animated Banner */}
                    <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden mb-20">
                        <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(-45deg, #7c3aed, #6366f1, #06b6d4, #7c3aed)',
                  backgroundSize: '400% 400%',
                  animation: 'gradientShift 8s ease infinite',
                }}
              />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="absolute left-1/2 -translate-x-1/2 top-0"
                        >
                            <img
                                src={picture}
                                className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl border-4 border-white/80 shadow-xl object-cover -mb-16"
                                style={{ marginTop: '120px' }}
                                alt="Awanda profile picture"
                                width={150}
                                height={150}
                            />
                        </motion.div>
                    </div>

                    {/* Profile Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-center mb-10"
                    >
                        <h1 className="font-display font-extrabold text-3xl mb-2">Awanda</h1>
                        <p className={`text-sm font-semibold mb-3 ${darkTheme ? 'text-violet-400' : 'text-violet-600'}`}>
                            {t('social.title')}
                        </p>
                        <div className="flex flex-col items-center gap-1 text-sm">
                            <a
                                href="https://awanda.eu.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-1.5 transition-colors ${darkTheme ? 'text-violet-400 hover:text-violet-300' : 'text-violet-700 hover:text-violet-900'}`}
                            >
                                <Globe size={14} />
                                awanda.eu.org
                            </a>
                            <a
                                href="mailto:awand795@gmail.com"
                                className={`inline-flex items-center gap-1.5 transition-colors ${darkTheme ? 'text-violet-400 hover:text-violet-300' : 'text-violet-700 hover:text-violet-900'}`}
                            >
                                <Mail size={14} />
                                awand795@gmail.com
                            </a>
                        </div>
                    </motion.div>

                    {/* Social Buttons */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="max-w-md mx-auto flex flex-col gap-3 px-4"
                    >
                        {socialLinks.map((link, index) => (
                            <SocialButton key={index} link={link} index={index} />
                        ))}
                    </motion.div>

                    {/* Footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="text-center mt-12 text-sm"
                    >
                        <p className={`${darkTheme ? 'text-slate-500' : 'text-slate-400'}`}>
                            {t('social.copyright')} &copy; {currentYear}
                        </p>
                        <p className={`${darkTheme ? 'text-slate-500' : 'text-slate-400'} mt-1`}>
                            {t('social.madeWith')}
                        </p>
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default Socmed;
