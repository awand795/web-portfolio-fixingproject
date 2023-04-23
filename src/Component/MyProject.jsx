import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import FadeInWhenVisible from './animate/FadeInWhenVisible';

const MyProject = () => {

    return (
        <div>
            <FadeInWhenVisible>
                <div id="project" className="row text-center pt-5 justify-content-center">
                    <div className="col-10 text-center">
                        <p className="text h2">My Projects</p>
                        <svg fill="red" height="4px" width="80px">
                            <rect height="100%" width="100%"></rect>
                        </svg>
                    </div>
                </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible>
            <div className="row pt-3 justify-content-center">
                    <motion.div className="col-sm-3 d-flex mt-3"
                        whileHover={{ scale: 1.1 }}
                    >
                        <div className="card shadow flex-fill">
                            <div className="card-body">
                                <h5 className="text-dark card-title">MevnStack-NotesApp</h5>
                                <p className="card-subtitle mb-5 text-muted mt-3 text-start">Simple Notes App build on Vue JS and backend using express</p>
                            </div>
                            <div className="card-body mt-auto d-flex justify-content-between">
                                <span className="bi-github"></span> 
                                <a href="https://github.com/awand795/MevnStack-NotesApp">Details</a>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div className="col-sm-3 d-flex mt-3"
                        whileHover={{ scale: 1.1 }}
                    >
                        <div className="card shadow flex-fill">
                            <div className="card-body">
                                <h5 className="text-dark card-title">Laravel 8 Rest API With Passport</h5>
                                <p className="card-subtitle mb-5 text-muted mt-3 text-start">Laravel 8 Restfull API With Passport for authentication</p>
                            </div>
                            <div className="d-flex justify-content-between card-body mt-auto">
                                <span className="bi-github"></span> 
                                <a href="https://github.com/awand795/Laravel-8-Rest-API-with-Passport">Details</a>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div className="col-sm-3 d-flex mt-3"
                        whileHover={{ scale: 1.1 }}
                    >
                        <div className="card shadow flex-fill">
                            <div className="card-body">
                                <h5 className="text-dark card-title">Vue JS Web App for Statistic Covid-19</h5>
                                <p className="card-subtitle mb-5 text-muted mt-3 text-start">Simple web app for see statistic covid-19</p>
                            </div>
                            <div className="d-flex justify-content-between card-body mt-auto">
                                <span className="bi-github"></span> 
                                <a href="https://github.com/awand795/VueExpress-Covid19web">Details</a>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="row pb-5 justify-content-center">
                    <motion.div className="col-sm-3 d-flex mt-3"
                        whileHover={{ scale: 1.1 }}
                    >
                        <div className="card shadow flex-fill">
                            <div className="card-body">
                                <h5 className="text-dark card-title">RestfulAPI-NodeJS</h5>
                                <p className="card-subtitle mb-5 text-muted mt-3 text-start">Simple RestfulAPI using Express JS</p>
                            </div>
                            <div className="card-body mt-auto d-flex justify-content-between">
                                <span className="bi-github"></span> 
                                <a href="https://github.com/awand795/RestfulAPI-NodeJS">Details</a>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div className="col-sm-3 d-flex mt-3"
                        whileHover={{ scale: 1.1 }}
                    >
                        <div className="card shadow flex-fill">
                            <div className="card-body">
                                <h5 className="text-dark card-title">nodejs-loginsystem</h5>
                                <p className="card-subtitle mb-5 text-muted mt-3 text-start">Simple Login With JWT auth using Express JS and MongoDB.</p>
                            </div>
                            <div className="d-flex justify-content-between card-body mt-auto">
                                <span className="bi-github"></span> 
                                <a href="https://github.com/awand795/nodejs-loginsystem">Details</a>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div className="col-sm-3 d-flex mt-3"
                        whileHover={{ scale: 1.1 }}
                    >
                        <div className="card shadow flex-fill">
                            <div className="card-body">
                                <h5 className="text-dark card-title">Frontend MERN Crud</h5>
                                <p className="card-subtitle mb-5 text-muted mt-3 text-start">Simple CRUD Website using React</p>
                            </div>
                            <div className="d-flex justify-content-between card-body mt-auto">
                                <span className="bi-github"></span> 
                                <a href="https://github.com/awand795/Frontend-MERN-Crud">Details</a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible>
                <div className="row pt-3 justify-content-center text-center pb-5 mb-3">
                    <div className="col-sm-10 mx-auto my-auto">
                        <motion.a href='https://github.com/awand795' className="btn btn-primary rounded-pill p-3"
                            whileHover={{ y: 10 }}
                        >
                            See More
                            </motion.a>
                    </div>
                </div>
            </FadeInWhenVisible>
        </div>
    )
}

export default MyProject;