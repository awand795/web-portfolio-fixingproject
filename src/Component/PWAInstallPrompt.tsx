import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Download, X } from 'lucide-react';

interface PWAInstallPromptProps {
  darkTheme: boolean;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallPrompt = ({ darkTheme }: PWAInstallPromptProps) => {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);

            const dismissed = localStorage.getItem('pwa-install-dismissed');
            const dismissedAt = dismissed ? parseInt(dismissed) : 0;
            const now = Date.now();

            if (now - dismissedAt < 7 * 24 * 60 * 60 * 1000) {
                return;
            }

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

    return (
        <AnimatePresence>
            {showPrompt && (
                <motion.div
                    initial={{ opacity: 0, y: 100, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 100, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="fixed bottom-6 left-6 right-6 max-w-sm z-50 mx-auto sm:mx-0"
                >
                    <div className={`
                        p-5 rounded-2xl border shadow-2xl backdrop-blur-xl
                        ${darkTheme
                            ? 'bg-[#0f172a]/95 border-violet-500/30 shadow-violet-500/10'
                            : 'bg-white/95 border-violet-200 shadow-lg'
                        }
                    `}>
                        <div className="flex items-start gap-4 mb-4">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                style={{ background: 'var(--gradient-primary)' }}
                            >
                                <Smartphone size={22} className="text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h5 className={`font-bold text-base mb-1 ${darkTheme ? 'text-white' : 'text-slate-900'}`}>
                                    Install App
                                </h5>
                                <p className={`text-sm leading-relaxed ${darkTheme ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Install this app on your device for quick access and better experience
                                </p>
                            </div>
                            <button
                                onClick={handleDismiss}
                                aria-label="Dismiss install prompt"
                                className={`
                                    p-1.5 rounded-lg transition-colors flex-shrink-0
                                    ${darkTheme ? 'text-slate-500 hover:bg-white/10' : 'text-slate-400 hover:bg-slate-100'}
                                `}
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <div className="flex gap-3">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleInstall}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white text-sm transition-all duration-300 shadow-[0_4px_16px_rgba(124,58,237,0.35)] hover:shadow-[0_6px_24px_rgba(124,58,237,0.5)]"
                                style={{ background: 'var(--gradient-primary)' }}
                            >
                                <Download size={16} />
                                Install
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleDismiss}
                                className={`
                                    flex-1 px-4 py-2.5 rounded-xl font-semibold text-sm border-2 transition-all duration-300
                                    ${darkTheme
                                        ? 'border-violet-500/40 text-violet-400 hover:bg-violet-500/10'
                                        : 'border-violet-500/30 text-violet-700 hover:bg-violet-50'
                                    }
                                `}
                            >
                                Later
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PWAInstallPrompt;
