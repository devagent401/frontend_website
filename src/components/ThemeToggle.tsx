"use client";

import { useTheme } from '@/contexts/ThemeContext';
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Don't render anything until the component is mounted on the client
    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-md border border-border bg-secondary-deep animate-pulse" />
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className="relative flex items-center justify-center  rounded-md bg-secondary-deep transition-colors focus:outline-none  text-primary-foreground cursor-pointer"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? (
                // Moon icon for dark mode
                <Moon className="p-1" />
            ) : (
                // Sun icon for light mode
                <Sun className="p-1" />
            )}
        </button>
    );
}
