import React, { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import id from '../translations/id';
import en from '../translations/en';

type Translations = Record<string, string>;

const translations: Record<string, Translations> = { id, en } as const;

interface LanguageContextType {
  language: string;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<string>(() => {
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

    const t = useCallback((key: string): string => {
        return translations[language]?.[key] || key;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
