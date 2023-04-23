import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { scroller } from 'react-scroll';
import darkIcon from '../image/icon/dark.png';
import lightIcon from '../image/icon/light2.png';

const NavBar = ({darkTheme, setDarkTheme}) => {

    return (
        <nav className="navbar sticky-top navbar-light navbar-expand-lg">
            <div className="container-fluid">
                <Link className={darkTheme? "text-white navbar-brand" : "text-dark navbar-brand"} to={"/"}><strong>Awanda</strong></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item ps-5">
                            <Link className={darkTheme? "text-white nav-link active" : "text-dark  nav-link active"} aria-current="page" to={"/"}>Home</Link>
                        </li>
                        <li className="nav-item ps-5">
                            <Link className={darkTheme? "text-white nav-link" : "text-dark  nav-link"} to={"/"}
                                onClick={() => scroller.scrollTo('aboutme', {
                                    smooth: true,
                                    offset: -70,
                                    duration: 500,
                                })}
                            >About</Link>
                        </li>
                        <li className="nav-item ps-5">
                            <Link className={darkTheme? "text-white nav-link" : "text-dark  nav-link"} to={"/"}
                                onClick={() => scroller.scrollTo('project', {
                                    smooth: true,
                                    offset: -70,
                                    duration: 500,
                                })}
                            >Portfolio</Link>
                        </li>
                        <li className="nav-item ps-5">
                            <Link className={darkTheme? "text-white nav-link" : "text-dark  nav-link"} to={"/"}
                                onClick={() => scroller.scrollTo('skill', {
                                    smooth: true,
                                    offset: -70,
                                    duration: 500,
                                })}
                            >Skill</Link>
                        </li>
                        <li className="nav-item ps-5">
                            <Link className={darkTheme? "text-white nav-link" : "text-dark  nav-link"} to={"/"}
                                onClick={() => scroller.scrollTo('contact', {
                                    smooth: true,
                                    offset: -70,
                                    duration: 500,
                                })}
                            >Contact</Link>
                        </li>
                        <li className="nav-item ps-5">
                            {darkTheme ? <img src={lightIcon} className='darkmodeIcon' onClick={() => setDarkTheme(prevTheme => !prevTheme)}/>:
                                <img src={darkIcon} className='darkmodeIcon' onClick={() => setDarkTheme(prevTheme => !prevTheme)}/>
                            }
                            
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;