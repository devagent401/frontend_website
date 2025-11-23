"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light'); // Default to light mode
    const [mounted, setMounted] = useState(false);

    // Handle theme initialization and persistence
    useEffect(() => {
        setMounted(true);

        // Check if theme is stored in localStorage
        const storedTheme = localStorage.getItem('theme') as Theme;

        if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
            setTheme(storedTheme);
        } else {
            // Default to light mode (as requested)
            setTheme('light');
            localStorage.setItem('theme', 'light');
        }
    }, []);

    // Apply theme changes to document
    useEffect(() => {
        const root = document.documentElement;

        // Remove existing theme classes
        root.classList.remove('light', 'dark');

        // Add current theme class
        root.classList.add(theme);

        // Store theme preference if mounted
        if (mounted) {
            localStorage.setItem('theme', theme);
        }
    }, [theme, mounted]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
