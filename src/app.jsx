import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import './App.css'
import '@popperjs/core';
import picture from './image/imgprofile.jpg'
import reactLogo from './image/reactLogo.png';
import js from './image/js.png'
import mongoDbLogo from './image/mongoDbLogo.png'
import dockerLogo from './image/dockerLogo.png'
import nodeJSLogo from './image/nodeJsLogo.png'
import bootstrapLogo from './image/bootstrap.png'
import expressJs from './image/expressjs.png'
import FadeInWhenVisible from './Component/animate/FadeInWhenVisible';
import { motion } from 'framer-motion'
import MyProject from './Component/MyProject';
import NavBar from './Component/NavBar';

const App = () => {

    // Load dark theme preference from localStorage
    const [darkTheme, setDarkTheme] = useState(() => {
        const savedTheme = localStorage.getItem('darkTheme');
        return savedTheme !== 'false'; // Default to dark theme
    });

    // Save dark theme preference to localStorage
    useEffect(() => {
        localStorage.setItem('darkTheme', darkTheme);
    }, [darkTheme]);

    return (
        <div className={darkTheme ? 'bg-dark text-white' : 'bg-light text-dark'}>

            <div className="container-fluid">

                {/* Navigation */}
                <FadeInWhenVisible>
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <NavBar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
                        </div>
                    </div>
                </FadeInWhenVisible>

                {/* Hero Section */}
                <FadeInWhenVisible>
                    <div className="row justify-content-center align-items-center pt-4 pb-5" style={{ minHeight: '80vh' }}>
                        <div className="col-lg-5 text-center mb-5 mb-lg-0">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="profile-wrapper"
                            >
                                <img
                                    src={picture}
                                    className="gambarprofile"
                                    alt="Awanda - Fullstack JavaScript Developer"
                                />
                            </motion.div>
                        </div>
                        
                        <div className='col-lg-6'>
                            <motion.div
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <motion.p 
                                    className="text-gradient mb-2"
                                    style={{ fontSize: '1.25rem', fontWeight: '600', letterSpacing: '0.1em' }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    HELLO, I'M
                                </motion.p>
                                
                                <motion.h1 
                                    className="display-1 mb-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    Awanda
                                </motion.h1>
                                
                                <motion.h2 
                                    className="h3 mb-4"
                                    style={{ color: 'var(--text-secondary)' }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    Fullstack JavaScript Developer
                                </motion.h2>
                                
                                <motion.p 
                                    className="text-justify mb-5"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    I'm a passionate Fullstack JavaScript Developer specializing in MERN Stack. 
                                    I build modern, scalable web applications with React, Express.js, and MongoDB. 
                                    Currently teaching Computer Science at SMA Negeri 1 Kuala and SMA Negeri 1 Salapian, 
                                    sharing my knowledge with the next generation of developers.
                                </motion.p>
                                
                                <motion.div 
                                    className="d-flex flex-wrap gap-3"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <motion.a
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn btn-gradient btn-modern"
                                        href='/files/CV Fullstack Developer - Awanda.pdf'
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download
                                    >
                                        <i className="bi bi-download me-2"></i>
                                        Download CV
                                    </motion.a>
                                    
                                    <motion.a
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn btn-outline-modern btn-modern"
                                        href='#contact'
                                    >
                                        <i className="bi bi-envelope me-2"></i>
                                        Get in Touch
                                    </motion.a>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </FadeInWhenVisible>

                {/* Projects Section */}
                <div className='py-5'>
                    <MyProject darkTheme={darkTheme} />
                </div>

                {/* Skills Section */}
                <FadeInWhenVisible>
                    <div id="skill" className="row text-center pt-5 justify-content-center">
                        <div className="col-12">
                            <div className="section-header mx-auto">
                                <h2 className="section-title">Skills & Expertise</h2>
                                <div className="section-underline"></div>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center pt-3 text-center mb-5">
                        <div className="col-lg-8">
                            <p className="text-justify text-center" style={{ fontSize: '1.125rem', lineHeight: '1.8' }}>
                                I specialize in modern web development with
                                <motion.span 
                                    className="skill-tag mx-2"
                                    whileHover={{ y: -4 }}
                                >
                                    <img src={js} alt="JavaScript" height="24px" width="24px" />
                                    JavaScript
                                </motion.span>
                                using frameworks like
                                <motion.span 
                                    className="skill-tag mx-2"
                                    whileHover={{ y: -4 }}
                                >
                                    <img src={reactLogo} alt="React" height="24px" width="24px" />
                                    React
                                </motion.span>
                                and
                                <motion.span 
                                    className="skill-tag mx-2"
                                    whileHover={{ y: -4 }}
                                >
                                    <img src={expressJs} alt="Express.js" height="24px" width="24px" />
                                    Express.js
                                </motion.span>
                                to build exceptional digital experiences.
                            </p>
                        </div>
                    </div>

                    <div className="row justify-content-center text-center pt-4 pb-5">
                        <div className="col-lg-10">
                            <motion.div 
                                className="d-flex flex-wrap justify-content-center align-items-center gap-4"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ staggerChildren: 0.1 }}
                            >
                                {[
                                    { img: reactLogo, url: 'https://reactjs.org', name: 'React' },
                                    { img: js, url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', name: 'JavaScript' },
                                    { img: bootstrapLogo, url: 'https://getbootstrap.com', name: 'Bootstrap' },
                                    { img: mongoDbLogo, url: 'https://www.mongodb.com', name: 'MongoDB' },
                                    { img: nodeJSLogo, url: 'https://nodejs.org', name: 'Node.js' },
                                    { img: dockerLogo, url: 'https://www.docker.com', name: 'Docker' },
                                ].map((tech, index) => (
                                    <motion.a
                                        key={index}
                                        href={tech.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${tech.name} official website`}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <motion.img 
                                            src={tech.img} 
                                            alt={`${tech.name} logo`} 
                                            className="imgLogo"
                                            whileHover={{ scale: 1.1, y: -8 }}
                                            whileTap={{ scale: 0.95 }}
                                        />
                                    </motion.a>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </FadeInWhenVisible>

                {/* Contact Section */}
                <FadeInWhenVisible>
                    <div id="contact" className="row text-center pt-5 justify-content-center">
                        <div className="col-12">
                            <div className="section-header mx-auto">
                                <h2 className="section-title">Let's Connect</h2>
                                <div className="section-underline"></div>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center pt-4 pb-5">
                        <div className="col-lg-8 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <p className="h4 mb-4" style={{ color: 'var(--text-secondary)' }}>
                                    Got a project in mind? Let's work together!
                                </p>
                                
                                <motion.a 
                                    href="mailto:awand795@gmail.com" 
                                    className="email-modern d-inline-block mb-4"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    awand795@gmail.com
                                </motion.a>
                                
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
                                        Langkat, Sumatera Utara, Indonesia
                                    </p>
                                </div>

                                <div className="mt-5">
                                    {[
                                        { icon: 'bi-github', url: 'https://github.com/awand795', label: 'GitHub' },
                                        { icon: 'bi-linkedin', url: 'https://linkedin.com/in/awanda', label: 'LinkedIn' },
                                        { icon: 'bi-facebook', url: 'https://facebook.com/awandd6', label: 'Facebook' },
                                        { icon: 'bi-instagram', url: 'https://instagram.com/adnawaa', label: 'Instagram' },
                                    ].map((social, index) => (
                                        <motion.a
                                            key={index}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.label}
                                            className="social-icon"
                                            whileHover={{ y: -8, scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <i className={`bi ${social.icon}`}></i>
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="row justify-content-center pt-5 pb-4">
                        <div className="col-12 text-center">
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                © {new Date().getFullYear()} Awanda. Built with React & lots of ☕
                            </p>
                        </div>
                    </div>
                </FadeInWhenVisible>

            </div>
        </div>
    );
}

export default App;
