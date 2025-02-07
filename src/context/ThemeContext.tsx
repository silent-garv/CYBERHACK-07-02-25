import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: {
    bg: string;
    text: string;
    cardBg: string;
    cardText: string;
    accent1: string;
    accent2: string;
    accent3: string;
    accent4: string;
    hover: string;
    border: string;
  };
}

const defaultTheme = {
  dark: {
    bg: 'bg-gray-900',
    text: 'text-white',
    cardBg: 'bg-gray-800',
    cardText: 'text-gray-100',
    accent1: 'text-emerald-400',
    accent2: 'text-purple-400',
    accent3: 'text-amber-400',
    accent4: 'text-rose-400',
    hover: 'hover:bg-gray-700',
    border: 'border-gray-700'
  },
  light: {
    bg: 'bg-gray-100',
    text: 'text-gray-900',
    cardBg: 'bg-white',
    cardText: 'text-gray-800',
    accent1: 'text-emerald-600',
    accent2: 'text-purple-600',
    accent3: 'text-amber-600',
    accent4: 'text-rose-600',
    hover: 'hover:bg-gray-200',
    border: 'border-gray-200'
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Set dark mode as default

  useEffect(() => {
    // Set dark mode class on document by default
    document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });
  };

  const theme = isDarkMode ? defaultTheme.dark : defaultTheme.light;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
