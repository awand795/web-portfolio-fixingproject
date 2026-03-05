import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkTheme, setDarkTheme] = useState(() => {
        const savedTheme = localStorage.getItem('darkTheme');
        return savedTheme !== 'false';
    });

    useEffect(() => {
        localStorage.setItem('darkTheme', darkTheme);
    }, [darkTheme]);

    return (
        <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
