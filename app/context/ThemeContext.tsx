import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  border: string;
  accent: string;
  accentMuted: string;
  success: string;
  danger: string;
}

interface ThemeContextType {
  darkMode: boolean;
  colors: ThemeColors;
  toggleDarkMode: () => void;
}

const PALETTES: Record<'light' | 'dark', ThemeColors> = {
  light: {
    background: '#f5f5f5',
    surface: '#ffffff',
    surfaceAlt: '#f0f0f0',
    text: '#141414',
    textMuted: '#565656',
    border: '#d9d9d9',
    accent: '#e50914',
    accentMuted: '#ff7582',
    success: '#1db954',
    danger: '#ff4d4f',
  },
  dark: {
    background: '#0b0b0f',
    surface: '#16161d',
    surfaceAlt: '#1f1f2a',
    text: '#f8f9fa',
    textMuted: '#9ea2b3',
    border: '#272736',
    accent: '#e50914',
    accentMuted: '#ff5c6b',
    success: '#26d07c',
    danger: '#ff6b6b',
  },
};

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

  const palette = darkMode ? PALETTES.dark : PALETTES.light;

  return (
    <ThemeContext.Provider value={{ darkMode, colors: palette, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  return context;
};
