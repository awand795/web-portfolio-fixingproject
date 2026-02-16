import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import darkIcon from '../image/icon/dark.png';
import lightIcon from '../image/icon/light2.png';

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
                                whileHover={{ scale: 1.1, rotate: 15 }}
                                whileTap={{ scale: 0.9 }}
                                style={{
                                    cursor: 'pointer',
                                    display: 'inline-block'
                                }}
                            >
                                <motion.img
                                    src={darkTheme ? lightIcon : darkIcon}
                                    alt={darkTheme ? "Switch to light mode" : "Switch to dark mode"}
                                    className="darkmodeIcon"
                                    style={{
                                        width: '40px',
                                        height: '40px'
                                    }}
                                    initial={false}
                                    animate={{ 
                                        rotate: darkTheme ? 0 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        </li>
                    </ul>
                </div>
            </div>
        </motion.nav>
    );
}

export default NavBar;
