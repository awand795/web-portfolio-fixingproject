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
        return savedTheme === 'true';
    });

    // Save dark theme preference to localStorage
    useEffect(() => {
        localStorage.setItem('darkTheme', darkTheme);
    }, [darkTheme]);

    return (
        <div className={darkTheme ? 'bg-dark text-white' : 'bg-light text-dark'}>

            <div className="container-fluid">

                <FadeInWhenVisible>
                    <div className="row justify-content-center pb-5">
                        <div className="col-sm-10">

                            <NavBar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />

                        </div>
                    </div>
                </FadeInWhenVisible>

                <FadeInWhenVisible>
                    <div className="row justify-content-center pt-5 mt-1 text-center pb-5">
                        <div className="col-sm-6">
                            <img
                                src={picture}
                                className="rounded-5 mx-auto d-block gambarprofile"
                                alt="Awanda profile picture - Fullstack JavaScript Developer"
                            />
                        </div>
                        <div className='col-sm-6 pt-5 mx-auto d-block'>
                            <p className="h1 fw-bold fs-1">Hello I'm Awanda</p>
                            <p className="text fs-5 text-justify mx-4 mt-4">I'm a Fullstack JavaScript Enthusiast focusing on MERN Stack Web Development. I have experience building websites using React for Frontend and Express for Backend. I'm also a Computer Science teacher at SMA Negeri 1 Kuala and SMA Negeri 1 Salapian.</p>
                            <motion.a
                                whileHover={{
                                    y: 10,
                                    scale: 1.05
                                }}
                                className="btn btn-success rounded-pill p-3 me-3"
                                href='/files/CV Fullstack Developer - Awanda.pdf'
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                            >
                                <i className="bi bi-download me-2"></i>
                                Download My CV
                            </motion.a>
                            <motion.a
                                whileHover={{
                                    y: 10,
                                    scale: 1.05
                                }}
                                className="btn btn-outline-primary rounded-pill p-3"
                                href='#contact'
                            >
                                <i className="bi bi-envelope me-2"></i>
                                Contact Me
                            </motion.a>
                        </div>
                    </div>
                </FadeInWhenVisible>

                <div className='pt-5'>
                    <MyProject />
                </div>

                <FadeInWhenVisible>
                    <div id="skill" className="row text-center pt-5 justify-content-center">
                        <div className="col-10 text-center">
                            <p className="text h2">Skills</p>
                            <svg fill="red" height="4px" width="80px" role="presentation">
                                <rect height="100%" width="100%"></rect>
                            </svg>
                        </div>
                    </div>

                    <div className="row justify-content-center pt-3 text-center">
                        <div className="col-sm-10">
                            <p className="lh-lg">I have skills in web development using
                                <motion.span className={darkTheme ? "text-white btn rounded-pill shadow" : "text-dark btn rounded-pill shadow"}
                                    whileHover={{ y: -10 }}
                                >
                                    <img src={js} alt="JavaScript logo" height="20px" width="20px" />JavaScript
                                </motion.span>
                                . I can use frameworks such as
                                <motion.span className={darkTheme ? "text-white btn rounded-pill shadow" : "text-dark btn rounded-pill shadow"}
                                    whileHover={{ y: -10 }}
                                ><img src={reactLogo} alt="React logo" height="30px" width="30px" />React
                                </motion.span>
                                and
                                <motion.span className={darkTheme ? "text-white btn rounded-pill shadow" : "text-dark btn rounded-pill shadow"}
                                    whileHover={{ y: -10 }}
                                ><img src={expressJs} alt="Express.js logo" height="30px" width="30px" />Express.js
                                </motion.span>
                                for building web applications, and I'm confident in building web projects using these tools:
                            </p>
                        </div>
                    </div>

                    <div className="row justify-content-center text-center pt-3">
                        <div className="col-sm-10 mx-auto my-auto">
                            <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer" aria-label="React official website">
                                <motion.img src={reactLogo} alt="React logo" className="imgLogo m-4" whileHover={{ scale: 1.3 }} />
                            </a>
                            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer" aria-label="JavaScript documentation">
                                <motion.img src={js} alt="JavaScript logo" className="imgLogo m-4" whileHover={{ scale: 1.3 }} />
                            </a>
                            <a href="https://getbootstrap.com" target="_blank" rel="noopener noreferrer" aria-label="Bootstrap official website">
                                <motion.img src={bootstrapLogo} alt="Bootstrap logo" className="imgLogo m-4" whileHover={{ scale: 1.3 }} />
                            </a>
                        </div>
                        <div className="col-sm-10 mx-auto my-auto">
                            <a href="https://www.mongodb.com" target="_blank" rel="noopener noreferrer" aria-label="MongoDB official website">
                                <motion.img src={mongoDbLogo} alt="MongoDB logo" className="imgLogo m-4" whileHover={{ scale: 1.3 }} />
                            </a>
                            <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" aria-label="Node.js official website">
                                <motion.img src={nodeJSLogo} alt="Node.js logo" className="imgLogo m-4" whileHover={{ scale: 1.3 }} />
                            </a>
                            <a href="https://www.docker.com" target="_blank" rel="noopener noreferrer" aria-label="Docker official website">
                                <motion.img src={dockerLogo} alt="Docker logo" className="imgLogo m-4" whileHover={{ scale: 1.3 }} />
                            </a>
                        </div>
                    </div>
                </FadeInWhenVisible>

                <FadeInWhenVisible>
                    <div id="contact" className="row text-center pt-5 justify-content-center">
                        <div className="col-10 text-center">
                            <p className="text h2">Contact</p>
                            <svg fill="red" height="4px" width="80px" role="presentation">
                                <rect height="100%" width="100%"></rect>
                            </svg>
                        </div>
                    </div>

                    <div className="row justify-content-center pt-3">
                        <div className="col-sm-6 mt-5 mb-5 mx-auto ml-auto">
                            <p className="h3 font-weight-bold">Get in touch</p>
                            <a href="mailto:awand795@gmail.com" className={darkTheme ? "email-white" : "email"}>
                                <p className="h2 font-weight-bold text-decoration-underline">awand795@gmail.com</p>
                            </a>
                            <p className="mt-3">
                                <i className="bi bi-phone me-2"></i>
                                <a href="tel:+6282362851796" className={darkTheme ? "text-white" : "text-dark"}>
                                    +62 823-6285-1796
                                </a>
                            </p>
                            <p>
                                <i className="bi bi-geo-alt me-2"></i>
                                Langkat, Sumatera Utara, Indonesia
                            </p>
                        </div>
                        <div className="col-sm-4 mt-auto mb-5">
                            <a href="https://github.com/awand795" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
                                <motion.span className="bi bi-github icon" whileHover={{ scale: 1.2 }}></motion.span>
                            </a>
                            <a href="https://facebook.com/awandd6" target="_blank" rel="noopener noreferrer" aria-label="Facebook profile">
                                <motion.span className="bi bi-facebook icon" whileHover={{ scale: 1.2 }}></motion.span>
                            </a>
                            <a href="https://instagram.com/adnawaa" target="_blank" rel="noopener noreferrer" aria-label="Instagram profile">
                                <motion.span className="bi bi-instagram icon" whileHover={{ scale: 1.2 }}></motion.span>
                            </a>
                        </div>
                    </div>
                </FadeInWhenVisible>

            </div>
        </div>
    );
}

export default App;
