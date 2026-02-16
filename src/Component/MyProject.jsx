import React from 'react';
import { motion } from 'framer-motion';
import FadeInWhenVisible from './animate/FadeInWhenVisible';

const projects = [
    {
        id: 1,
        title: "MevnStack-NotesApp",
        description: "Full-stack notes application built with Vue.js frontend and Express.js backend, featuring real-time updates and MongoDB storage",
        githubUrl: "https://github.com/awand795/MevnStack-NotesApp",
        tags: ["Vue.js", "Express.js", "MongoDB"],
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
        id: 2,
        title: "Laravel REST API",
        description: "Secure RESTful API built with Laravel 8 and Passport authentication for enterprise-grade user management",
        githubUrl: "https://github.com/awand795/Laravel-8-Rest-API-with-Passport",
        tags: ["Laravel", "Passport", "REST API"],
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
        id: 3,
        title: "COVID-19 Tracker",
        description: "Real-time COVID-19 statistics dashboard with interactive data visualization and global tracking capabilities",
        githubUrl: "https://github.com/awand795/VueExpress-Covid19web",
        tags: ["Vue.js", "Express.js", "Charts"],
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
        id: 4,
        title: "Node.js REST API",
        description: "Scalable RESTful API with Express.js featuring CRUD operations, authentication, and comprehensive error handling",
        githubUrl: "https://github.com/awand795/RestfulAPI-NodeJS",
        tags: ["Node.js", "Express.js", "REST"],
        gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
    {
        id: 5,
        title: "JWT Auth System",
        description: "Secure authentication system implementing JWT tokens with Express.js backend and MongoDB user storage",
        githubUrl: "https://github.com/awand795/nodejs-loginsystem",
        tags: ["Node.js", "JWT", "MongoDB"],
        gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    },
    {
        id: 6,
        title: "MERN CRUD App",
        description: "Modern CRUD application showcasing React state management, responsive design, and seamless API integration",
        githubUrl: "https://github.com/awand795/Frontend-MERN-Crud",
        tags: ["React", "CRUD", "REST API"],
        gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)"
    }
];

const ProjectCard = ({ project, index, darkTheme }) => {
    return (
        <motion.div 
            className="col-lg-4 col-md-6 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <motion.div 
                className="glass-card h-100 p-4"
                style={{ 
                    position: 'relative',
                    overflow: 'hidden'
                }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
            >
                {/* Gradient Background on Hover */}
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: project.gradient,
                    }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                />

                <div className="d-flex flex-column h-100">
                    {/* Project Number */}
                    <motion.div 
                        className="mb-3"
                        style={{ 
                            fontSize: '3rem', 
                            fontWeight: '800',
                            background: project.gradient,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            lineHeight: '1'
                        }}
                    >
                        {String(project.id).padStart(2, '0')}
                    </motion.div>

                    {/* Title */}
                    <h3 className="h4 fw-bold mb-3" style={{ color: darkTheme ? '#fff' : '#1e2139' }}>
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-4 flex-grow-1" style={{ 
                        color: 'var(--text-secondary)', 
                        fontSize: '0.95rem',
                        lineHeight: '1.6'
                    }}>
                        {project.description}
                    </p>

                    {/* Tags */}
                    <div className="mb-4">
                        {project.tags.map((tag, tagIndex) => (
                            <motion.span
                                key={tagIndex}
                                className="badge me-2 mb-2"
                                style={{
                                    background: 'rgba(102, 126, 234, 0.15)',
                                    color: '#667eea',
                                    border: '1px solid rgba(102, 126, 234, 0.3)',
                                    padding: '6px 12px',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    borderRadius: '6px'
                                }}
                                whileHover={{ 
                                    background: 'rgba(102, 126, 234, 0.25)',
                                    scale: 1.05 
                                }}
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </div>

                    {/* GitHub Link */}
                    <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="d-flex align-items-center justify-content-between text-decoration-none"
                        style={{ 
                            color: '#667eea',
                            fontWeight: '600',
                            fontSize: '0.9rem'
                        }}
                        whileHover={{ x: 5 }}
                    >
                        <span>
                            <i className="bi bi-github me-2"></i>
                            View Project
                        </span>
                        <i className="bi bi-arrow-right"></i>
                    </motion.a>
                </div>
            </motion.div>
        </motion.div>
    );
};

const MyProject = ({ darkTheme }) => {
    return (
        <div>
            <FadeInWhenVisible>
                <div id="project" className="row text-center pt-5 justify-content-center mb-5">
                    <div className="col-12">
                        <div className="section-header mx-auto">
                            <h2 className="section-title">Featured Projects</h2>
                            <div className="section-underline"></div>
                        </div>
                        <p className="mt-4" style={{ 
                            color: 'var(--text-secondary)', 
                            fontSize: '1.125rem',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            A collection of my recent work showcasing modern web development with cutting-edge technologies
                        </p>
                    </div>
                </div>
            </FadeInWhenVisible>

            <div className="row justify-content-center px-lg-5">
                {projects.map((project, index) => (
                    <ProjectCard 
                        key={project.id} 
                        project={project} 
                        index={index}
                        darkTheme={darkTheme}
                    />
                ))}
            </div>

            <FadeInWhenVisible>
                <div className="row pt-5 justify-content-center text-center">
                    <div className="col-lg-6">
                        <motion.a 
                            href='https://github.com/awand795' 
                            className="btn btn-gradient btn-modern"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="bi bi-github me-2"></i>
                            Explore More on GitHub
                        </motion.a>
                        
                        <p className="mt-4" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            Check out more projects and contributions on my GitHub profile
                        </p>
                    </div>
                </div>
            </FadeInWhenVisible>
        </div>
    )
}

export default MyProject;
