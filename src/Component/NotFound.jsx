import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const NotFound = () => {
    const { darkTheme } = useTheme();

    return (
        <div
            className={darkTheme ? 'bg-dark text-white' : 'bg-light text-dark'}
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                textAlign: 'center',
                padding: '2rem',
            }}
        >
            <h1
                style={{
                    fontSize: 'clamp(6rem, 15vw, 12rem)',
                    fontWeight: 800,
                    background: 'var(--primary-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1.1,
                    marginBottom: '0.5rem',
                }}
            >
                404
            </h1>
            <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Page not found
            </p>
            <Link
                to="/"
                className="btn btn-modern btn-gradient"
                style={{ textDecoration: 'none', color: '#fff' }}
            >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
