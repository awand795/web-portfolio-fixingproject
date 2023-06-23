import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import './App.css'
import '@popperjs/core';
import picture from './image/awanda.jpg'
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

    const [darkTheme, setDarkTheme] = useState(false);

    return (
        <div className={darkTheme? 'bg-dark text-white' : 'bg-light text-dark' }>

            <div className="container-fluid">

                <FadeInWhenVisible>
                    <div className="row justify-content-center pb-5">
                        <div className="col-sm-10">
                            
                        <NavBar darkTheme={darkTheme} setDarkTheme={setDarkTheme}/>

                        </div>
                    </div>
                </FadeInWhenVisible>

                <FadeInWhenVisible>
                    <div className="row justify-content-center pt-1 mt-1 text-center">
                        <div className="col-10 pt-2 pb-2">
                            <img
                                src={picture}
                                className="rounded-circle mx-auto d-block profilePic"
                                alt="profile pic"
                                width="200"
                                height="200"
                            ></img>
                            <p className="h1 pt-2 font-weight-bold">Hello I'm Awanda</p>
                            <p className="text pb-5">a Fullstack Javascript Developer</p>
                        </div>
                    </div>
                </FadeInWhenVisible>

                <FadeInWhenVisible>
                    <div id="aboutme" className="row text-center pt-5 mt-3 justify-content-center">
                        <div className="col-10 text-center">
                            <p className="text h2">About Me</p>
                            <svg fill="red" height="4px" width="80px">
                                <rect height="100%" width="100%"></rect>
                            </svg>
                        </div>
                    </div>

                    <div className="row pt-3 pb-3">
                        <div className="col-sm-6 mx-auto ml-auto">
                            <p className="text-start lh-lg">I'm a Fullstack Javascript Enthusiast focusing on MERN Stack Web Development, I exprienced for building website using React for Frontend and Express for Backend. I'm also a student in STMIK Kaputama</p>
                        </div>
                        <div className="col-sm-2 mx-auto ml-auto text-center">
                            <motion.a
                                whileHover={{
                                    y: 10,

                                }}
                                className="btn btn-success rounded-pill p-3"
                                href='/files/CV Fullstack Developer - Awanda.pdf'
                                target="_blank"
                                download
                            >Download My CV</motion.a>
                        </div>
                    </div>
                </FadeInWhenVisible>

                <MyProject />

                <FadeInWhenVisible>
                    <div id="skill" className="row text-center pt-5 justify-content-center">
                        <div className="col-10 text-center">
                            <p className="text h2">Skill</p>
                            <svg fill="red" height="4px" width="80px">
                                <rect height="100%" width="100%"></rect>
                            </svg>
                        </div>
                    </div>

                    <div className="row justify-content-center pt-3 text-center">
                        <div className="col-sm-10">
                            <p className="lh-lg">I've skill in web development using
                                <motion.span className={darkTheme? "text-white btn rounded-pill shadow" : "text-dark btn rounded-pill shadow"}
                                    whileHover={{ y: -10 }}
                                >
                                    <img src={js} alt="js" height="20px" width="20px"></img>Javascript
                                </motion.span>
                                , i can using Framework such as
                                <motion.span className={darkTheme? "text-white btn rounded-pill shadow" : "text-dark btn rounded-pill shadow"}
                                    whileHover={{ y: -10 }}
                                ><img src={reactLogo} alt="react" height="30px" width="30px"></img>React
                                </motion.span>
                                and
                                <motion.span className={darkTheme? "text-white btn rounded-pill shadow" : "text-dark btn rounded-pill shadow"}
                                    whileHover={{ y: -10 }}
                                ><img src={expressJs} alt="expressjs" height="30px" width="30px"></img>Express JS
                                </motion.span>
                                for building a web development, and I'm confident for building web development using these tools :
                            </p>
                        </div>
                    </div>

                    <div className="row justify-content-center text-center pt-3">
                        <div className="col-sm-10 mx-auto my-auto">
                            <a href="http://reactjs.com">
                                <motion.img src={reactLogo} alt="react logo" className="imgLogo m-4" whileHover={{ scale: 1.3 }}></motion.img>
                            </a>
                            <a href="http://javascript.com">
                                <motion.img src={js} alt="react logo" className="imgLogo m-4" whileHover={{ scale: 1.3 }}></motion.img>
                            </a>
                            <a href="http://getbootstrap.com">
                                <motion.img src={bootstrapLogo} alt="react logo" className="imgLogo m-4" whileHover={{ scale: 1.3 }}></motion.img>
                            </a>
                        </div>
                        <div className="col-sm-10 mx-auto my-auto">
                            <a href="http://mongodb.com">
                                <motion.img src={mongoDbLogo} alt="react logo" className="imgLogo m-4" whileHover={{ scale: 1.3 }}></motion.img>
                            </a>
                            <a href="http://nodejs.com">
                                <motion.img src={nodeJSLogo} alt="react logo" className="imgLogo m-4" whileHover={{ scale: 1.3 }}></motion.img>
                            </a>
                            <a href="http://docker.com">
                                <motion.img src={dockerLogo} alt="react logo" className="imgLogo m-4" whileHover={{ scale: 1.3 }}></motion.img>
                            </a>
                        </div>
                    </div>
                </FadeInWhenVisible>

                <FadeInWhenVisible>
                    <div id="contact" className="row text-center pt-5 justify-content-center">
                        <div className="col-10 text-center">
                            <p className="text h2">Contact</p>
                            <svg fill="red" height="4px" width="80px">
                                <rect height="100%" width="100%"></rect>
                            </svg>
                        </div>
                    </div>

                    <div className="row justify-content-center pt-3">
                        <div className="col-sm-6 mt-5 mb-5 mx-auto ml-auto">
                            <p className="h3 font-weight-bold">Get in touch</p>
                            <a href="mailto:awand795@gmail.com" className={darkTheme? "email-white" : "email"}><p className="h2 font-weight-bold text-decoration-underline">awand795@gmail.com</p></a>
                        </div>
                        <div className="col-sm-4 mt-auto mb-5">
                            <a href="https://github.com/awand795">
                                <motion.span className="bi bi-github icon"></motion.span>
                            </a>
                            <a href="https://facebook.com/awandd6">
                                <span className="bi bi-facebook icon"></span>
                            </a>
                            <a href="https://instagram.com/adnawaa">
                                <span className="bi bi-instagram icon"></span>
                            </a>
                        </div>
                    </div>
                </FadeInWhenVisible>

            </div>
        </div>
    );
}

export default App;