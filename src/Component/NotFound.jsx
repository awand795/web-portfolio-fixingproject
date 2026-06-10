import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
    const { darkTheme } = useTheme();

    return (
        <div
            className={`min-h-screen flex items-center justify-center flex-col text-center p-8 transition-colors duration-300 ${
                darkTheme ? 'bg-[#020617] text-slate-100' : 'bg-slate-50 text-slate-900'
            }`}
        >
            <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-display font-extrabold leading-[1.1] mb-2"
                style={{
                    fontSize: 'clamp(6rem, 15vw, 12rem)',
                    background: 'var(--gradient-primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}
            >
                404
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className={`text-xl sm:text-2xl mb-8 ${darkTheme ? 'text-slate-400' : 'text-slate-600'}`}
            >
                Page not found
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
            >
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm shadow-[0_4px_20px_rgba(124,58,237,0.4)] hover:shadow-[0_6px_28px_rgba(124,58,237,0.6)] transition-all duration-300"
                    style={{ background: 'var(--gradient-primary)' }}
                >
                    <ArrowLeft size={18} />
                    Back to Home
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
