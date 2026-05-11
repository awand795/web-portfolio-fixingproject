import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const projects = [
    {
        id: 1,
        title: "Web Absensi Online",
        description: "Web-based online attendance system for real-time attendance tracking with employee data management and attendance reporting features",
        githubUrl: "https://github.com/awand795/web-absensi",
        tags: ["PHP", "MySQL", "Bootstrap"],
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
        id: 2,
        title: "Point of Sale",
        description: "Full-stack Point of Sale application with React frontend and Laravel backend, featuring product management, transaction processing, and sales reporting for retail businesses",
        githubUrl: "https://github.com/awand795/point-of-sale",
        tags: ["React", "Laravel", "Full-Stack"],
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
        id: 3,
        title: "Web E-Voting",
        description: "Web-based electronic voting system for secure and transparent online elections with voter authentication, real-time vote counting, and election result management",
        githubUrl: "https://github.com/awand795/web-evoting",
        tags: ["PHP", "MySQL", "Bootstrap"],
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
        id: 4,
        title: "Web Notes App",
        description: "Full-stack notes application built with Vue.js frontend and Express.js backend, featuring real-time updates and MongoDB storage",
        githubUrl: "https://github.com/awand795/MevnStack-NotesApp",
        tags: ["Vue.js", "Express.js", "MongoDB"],
        gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
    {
        id: 5,
        title: "MySQL MCP Server",
        description: "An MCP-based server bridging AI with MySQL databases for secure schema inspection, query execution, and real-time data analysis using natural language.",
        githubUrl: "https://github.com/awand795/mcp-server-mysql",
        tags: ["Node.js", "MySQL", "Electron"],
        gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    },
    {
        id: 6,
        title: "Bot WA",
        description: "A web/Node.js-based WhatsApp bot supporting automated message management, API integration, and interactive features for real-time communication efficiency and group management.",
        githubUrl: "https://github.com/awand795/bot-wa",
        tags: ["Node.js", "WA", "Chromium"],
        gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)"
    }
];

const ProjectCard = ({ project, index, darkTheme }) => {
    const { t } = useLanguage();
    return (
        <div 
            className="col-lg-4 col-md-6 mb-4"
            data-aos="fade-up"
            data-aos-delay={index * 100}
        >
            <div 
                className="glass-card h-100 p-4"
                style={{ 
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Gradient Top Border */}
                <div
                    className="card-gradient-border"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: project.gradient,
                    }}
                />

                <div className="d-flex flex-column h-100">
                    {/* Project Number */}
                    <div 
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
                    </div>

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
                        {t(`projects.desc.${project.id}`)}
                    </p>

                    {/* Tags */}
                    <div className="mb-4">
                        {project.tags.map((tag, tagIndex) => (
                            <span
                                key={tagIndex}
                                className="badge me-2 mb-2 badge-tag"
                                style={{
                                    background: 'rgba(102, 126, 234, 0.15)',
                                    color: '#667eea',
                                    border: '1px solid rgba(102, 126, 234, 0.3)',
                                    padding: '6px 12px',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    borderRadius: '6px'
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* GitHub Link */}
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="d-flex align-items-center justify-content-between text-decoration-none project-link"
                        aria-label={`${t('projects.viewProject')} ${project.title}`}
                        style={{ 
                            color: '#667eea',
                            fontWeight: '600',
                            fontSize: '0.9rem'
                        }}
                    >
                        <span>
                            <i className="bi bi-github me-2"></i>
                            {t('projects.viewProject')}
                        </span>
                        <i className="bi bi-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

const MyProject = ({ darkTheme }) => {
    const { t } = useLanguage();
    return (
        <div>
            <div id="project" className="row text-center pt-5 justify-content-center mb-5" data-aos="fade-up">
                <div className="col-12">
                    <div className="section-header mx-auto">
                        <h2 className="section-title">{t('projects.title')}</h2>
                        <div className="section-underline"></div>
                    </div>
                    <p className="mt-4" style={{ 
                        color: 'var(--text-secondary)', 
                        fontSize: '1.125rem',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        {t('projects.subtitle')}
                    </p>
                </div>
            </div>

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

            <div className="row pt-5 justify-content-center text-center" data-aos="fade-up">
                <div className="col-lg-6">
                    <a 
                        href='https://github.com/awand795' 
                        className="btn btn-gradient btn-modern"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="bi bi-github me-2"></i>
                        {t('projects.exploreMore')}
                    </a>
                    
                    <p className="mt-4" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        {t('projects.moreText')}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MyProject;

