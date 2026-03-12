import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PWAInstallPrompt = ({ darkTheme }) => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            
            // Check if user has already dismissed
            const dismissed = localStorage.getItem('pwa-install-dismissed');
            const dismissedAt = dismissed ? parseInt(dismissed) : 0;
            const now = Date.now();
            
            // Don't show if dismissed in the last 7 days
            if (now - dismissedAt < 7 * 24 * 60 * 60 * 1000) {
                return;
            }
            
            // Show prompt after 30 seconds
            setTimeout(() => {
                setShowPrompt(true);
            }, 30000);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            setShowPrompt(false);
            setDeferredPrompt(null);
        }
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    };

    if (!showPrompt) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="pwa-install-prompt"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    left: '24px',
                    right: '24px',
                    maxWidth: '400px',
                    zIndex: 1000,
                }}
            >
                <div
                    className="glass-card p-4"
                    style={{
                        background: darkTheme ? 'rgba(21, 25, 50, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '16px',
                        border: '1px solid rgba(102, 126, 234, 0.3)',
                        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.2)',
                    }}
                >
                    <div className="d-flex align-items-start mb-3">
                        <div
                            className="me-3"
                            style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                            }}
                        >
                            <i className="bi bi-phone text-white" style={{ fontSize: '1.5rem' }}></i>
                        </div>
                        <div className="flex-grow-1">
                            <h5 className="fw-bold mb-1" style={{ color: darkTheme ? '#fff' : '#1e2139' }}>
                                Install App
                            </h5>
                            <p className="mb-0" style={{ 
                                color: darkTheme ? '#a8b2d1' : '#666',
                                fontSize: '0.875rem',
                                lineHeight: '1.5'
                            }}>
                                Install this app on your device for quick access and better experience
                            </p>
                        </div>
                        <button
                            onClick={handleDismiss}
                            className="btn btn-link p-0 ms-2"
                            style={{ 
                                color: darkTheme ? '#8892b0' : '#999',
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            <i className="bi bi-x-lg" style={{ fontSize: '1.25rem' }}></i>
                        </button>
                    </div>
                    <div className="d-flex gap-2">
                        <motion.button
                            className="btn btn-modern btn-gradient flex-grow-1"
                            onClick={handleInstall}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                padding: '10px 20px',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                            }}
                        >
                            <i className="bi bi-download me-2"></i>
                            Install
                        </motion.button>
                        <motion.button
                            className="btn btn-outline-modern flex-grow-1"
                            onClick={handleDismiss}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                padding: '10px 20px',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                            }}
                        >
                            Later
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PWAInstallPrompt;
