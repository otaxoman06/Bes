import React, { createContext, useContext, useState, useEffect } from 'react';

// Theme types
export type ThemeType = 'ironman' | 'cyberpunk' | 'hologram' | 'matrix';

// Theme context type
interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: 'ironman',
  setTheme: () => {},
});

// Theme provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get theme from localStorage or use default
  const [theme, setTheme] = useState<ThemeType>('ironman');

  // Initialize theme from localStorage when component mounts (client-side only)
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem('ma-theme');
      if (storedTheme && ['ironman', 'cyberpunk', 'hologram', 'matrix'].includes(storedTheme)) {
        setTheme(storedTheme as ThemeType);
      }
    } catch (e) {
      console.error('Error loading theme preference', e);
    }
  }, []);

  // Update localStorage and apply classes when theme changes
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('ma-theme', theme);
        
        // Apply theme classes to body
        document.body.classList.remove('theme-ironman', 'theme-cyberpunk', 'theme-hologram', 'theme-matrix');
        document.body.classList.add(`theme-${theme}`);
      }
    } catch (e) {
      console.error('Error saving theme preference', e);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using theme
export const useTheme = () => useContext(ThemeContext);