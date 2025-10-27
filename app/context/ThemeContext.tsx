import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// 🔧 Correção: exportando explicitamente
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      const stored = await AsyncStorage.getItem('darkMode');
      if (stored !== null) setDarkMode(stored === 'true');
    };
    loadTheme();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  return context;
};
