import React from 'react';
import { motion } from 'framer-motion';
import FadeInWhenVisible from './animate/FadeInWhenVisible';

const projects = [
    {
        id: 1,
        title: "MevnStack-NotesApp",
        description: "Simple Notes App built on Vue.js with Express backend for RESTful API integration",
        githubUrl: "https://github.com/awand795/MevnStack-NotesApp",
        tags: ["Vue.js", "Express.js", "MongoDB"]
    },
    {
        id: 2,
        title: "Laravel 8 REST API With Passport",
        description: "Laravel 8 RESTful API with Passport authentication for secure user management",
        githubUrl: "https://github.com/awand795/Laravel-8-Rest-API-with-Passport",
        tags: ["Laravel", "Passport", "REST API"]
    },
    {
        id: 3,
        title: "Vue.js Web App for COVID-19 Statistics",
        description: "Simple web app for viewing real-time COVID-19 statistics with data visualization",
        githubUrl: "https://github.com/awand795/VueExpress-Covid19web",
        tags: ["Vue.js", "Express.js", "API"]
    },
    {
        id: 4,
        title: "RESTful API - Node.js",
        description: "Simple RESTful API using Express.js with CRUD operations and authentication",
        githubUrl: "https://github.com/awand795/RestfulAPI-NodeJS",
        tags: ["Node.js", "Express.js", "REST"]
    },
    {
        id: 5,
        title: "Node.js Login System",
        description: "Simple login system with JWT authentication using Express.js and MongoDB",
        githubUrl: "https://github.com/awand795/nodejs-loginsystem",
        tags: ["Node.js", "JWT", "MongoDB"]
    },
    {
        id: 6,
        title: "Frontend MERN CRUD",
        description: "Simple CRUD website using React with state management and modern UI",
        githubUrl: "https://github.com/awand795/Frontend-MERN-Crud",
        tags: ["React", "CRUD", "Frontend"]
    }
];

const ProjectCard = ({ project }) => {
    return (
        <motion.div 
            className="col-sm-3 d-flex mt-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <div className="card shadow flex-fill">
                <div className="card-body">
                    <h5 className="text-dark card-title">{project.title}</h5>
                    <p className="card-subtitle mb-3 text-muted mt-3 text-start">{project.description}</p>
                    {project.tags && (
                        <div className="mt-2 mb-3">
                            {project.tags.map((tag, index) => (
                                <span key={index} className="badge bg-secondary me-1 mb-1">{tag}</span>
                            ))}
                        </div>
                    )}
                </div>
                <div className="card-body mt-auto d-flex justify-content-between align-items-center">
                    <span className="bi-github"></span> 
                    <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-primary"
                    >
                        View Details
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

const MyProject = () => {

    return (
        <div>
            <FadeInWhenVisible>
                <div id="project" className="row text-center pt-5 justify-content-center">
                    <div className="col-10 text-center">
                        <p className="text h2">My Projects</p>
                        <svg fill="red" height="4px" width="80px" role="presentation">
                            <rect height="100%" width="100%"></rect>
                        </svg>
                    </div>
                </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible>
                <div className="row pt-3 justify-content-center">
                    {projects.slice(0, 3).map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                <div className="row pb-5 justify-content-center">
                    {projects.slice(3, 6).map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible>
                <div className="row pt-3 justify-content-center text-center pb-5 mb-3">
                    <div className="col-sm-10 mx-auto my-auto">
                        <motion.a 
                            href='https://github.com/awand795' 
                            className="btn btn-primary rounded-pill p-3"
                            whileHover={{ y: 10, scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            See More Projects on GitHub
                        </motion.a>
                    </div>
                </div>
            </FadeInWhenVisible>
        </div>
    )
}

export default MyProject;
