import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import id from '../translations/id';
import en from '../translations/en';

const translations = { id, en };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('language') || 'id';
    });

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    const toggleLanguage = useCallback(() => {
        setLanguage(prev => {
            const next = prev === 'id' ? 'en' : 'id';
            localStorage.setItem('language', next);
            return next;
        });
    }, []);

    const t = useCallback((key) => {
        return translations[language]?.[key] || key;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
