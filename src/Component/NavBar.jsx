import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeIcon = ({ darkTheme }) => (
    <div style={{ width: '38px', height: '38px', position: 'relative' }}>
        <AnimatePresence mode="wait">
            {darkTheme ? (
                <motion.svg
                    key="sun"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="url(#sunGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="38"
                    height="38"
                    initial={{ rotate: -90, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{ position: 'absolute', top: 0, left: 0 }}
                >
                    <defs>
                        <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f6d365" />
                            <stop offset="100%" stopColor="#fda085" />
                        </linearGradient>
                    </defs>
                    <circle cx="12" cy="12" r="5" fill="url(#sunGradient)" stroke="none" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </motion.svg>
            ) : (
                <motion.svg
                    key="moon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    width="38"
                    height="38"
                    initial={{ rotate: 90, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: -90, scale: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{ position: 'absolute', top: 0, left: 0 }}
                >
                    <defs>
                        <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#667eea" />
                            <stop offset="100%" stopColor="#764ba2" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                        fill="url(#moonGradient)"
                        stroke="url(#moonGradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </motion.svg>
            )}
        </AnimatePresence>
    </div>
);

const NavBar = ({darkTheme, setDarkTheme}) => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { name: 'Home', target: '/', scrollTo: null },
        { name: 'Projects', target: '/', scrollTo: 'project' },
        { name: 'Skills', target: '/', scrollTo: 'skill' },
        { name: 'Contact', target: '/', scrollTo: 'contact' },
        { name: 'Social', target: '/socmed', scrollTo: null }
    ];

    const handleNavClick = (scrollTarget) => {
        if (scrollTarget) {
            scroller.scrollTo(scrollTarget, {
                smooth: true,
                offset: -80,
                duration: 500,
            });
        }
        setIsOpen(false);
    };

    return (
        <motion.nav 
            className="navbar navbar-expand-lg py-4"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
                background: 'transparent',
                position: 'relative',
                zIndex: 1000
            }}
        >
            <div className="container-fluid">
                {/* Logo */}
                <Link 
                    className="navbar-brand"
                    to={"/"}
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        letterSpacing: '-0.02em'
                    }}
                >
                    <motion.span
                        whileHover={{ scale: 1.05 }}
                        style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}
                    >
                        Awanda
                    </motion.span>
                </Link>

                {/* Mobile Toggle */}
                <button 
                    className="navbar-toggler border-0" 
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation"
                    style={{
                        color: '#667eea'
                    }}
                >
                    <i className={`bi ${isOpen ? 'bi-x-lg' : 'bi-list'}`} 
                       style={{ 
                           fontSize: '1.5rem',
                           color: '#667eea'
                       }}
                    ></i>
                </button>

                {/* Menu Items */}
                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-lg-center">
                        {menuItems.map((item, index) => (
                            <motion.li 
                                key={index}
                                className="nav-item ps-lg-4"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link 
                                    className="nav-link"
                                    to={item.target}
                                    onClick={() => handleNavClick(item.scrollTo)}
                                    style={{
                                        color: darkTheme ? '#fff' : '#667eea',
                                        fontWeight: '600',
                                        fontSize: '1rem',
                                        position: 'relative',
                                        transition: 'color 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.color = '#764ba2';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = darkTheme ? '#fff' : '#667eea';
                                    }}
                                >
                                    {item.name}
                                </Link>
                            </motion.li>
                        ))}

                        {/* Theme Toggle */}
                        <li className="nav-item ps-lg-4">
                            <motion.div
                                onClick={() => setDarkTheme(prev => !prev)}
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.85 }}
                                style={{
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '50%',
                                    background: darkTheme
                                        ? 'rgba(255, 255, 255, 0.08)'
                                        : 'rgba(102, 126, 234, 0.1)',
                                    border: darkTheme
                                        ? '1px solid rgba(255, 255, 255, 0.12)'
                                        : '1px solid rgba(102, 126, 234, 0.2)',
                                    backdropFilter: 'blur(10px)',
                                    transition: 'background 0.3s ease, border 0.3s ease'
                                }}
                                title={darkTheme ? "Switch to light mode" : "Switch to dark mode"}
                            >
                                <ThemeIcon darkTheme={darkTheme} />
                            </motion.div>
                        </li>
                    </ul>
                </div>
            </div>
        </motion.nav>
    );
}

export default NavBar;
