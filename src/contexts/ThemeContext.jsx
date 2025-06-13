import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isEnergySaveMode, setIsEnergySaveMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('survivor-dark-mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('survivor-dark-mode');
    const savedEnergySave = localStorage.getItem('survivor-energy-save');
    
    if (savedDarkMode !== null) {
      setIsDarkMode(JSON.parse(savedDarkMode));
    } else {
      setIsDarkMode(true); // Default to dark mode
    }

    if (savedEnergySave !== null) {
      setIsEnergySaveMode(JSON.parse(savedEnergySave));
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const toggleEnergySaveMode = () => {
    const newMode = !isEnergySaveMode;
    setIsEnergySaveMode(newMode);
    localStorage.setItem('survivor-energy-save', JSON.stringify(newMode));
  };

  const value = {
    isDarkMode,
    isEnergySaveMode,
    toggleDarkMode,
    toggleEnergySaveMode,
  };
  
  useEffect(() => {
    document.body.className = ''; // Clear existing classes
    if (isDarkMode) {
      document.body.classList.add('dark');
    }
    if (isEnergySaveMode) {
      document.body.classList.add('energy-save');
    }
  }, [isDarkMode, isEnergySaveMode]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};