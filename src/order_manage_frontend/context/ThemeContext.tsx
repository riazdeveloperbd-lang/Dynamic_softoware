import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeColors } from '@/constants/theme';

type ThemeMode = 'light' | 'dark' | 'system';
type ActiveTheme = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  theme: ActiveTheme;
  isDark: boolean;
  colors: typeof ThemeColors.dark;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const THEME_STORAGE_KEY = 'trc_theme_mode_v1';

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('dark'); // default executive dark
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadTheme() {
      try {
        const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (saved === 'light' || saved === 'dark' || saved === 'system') {
          setModeState(saved);
        }
      } catch (e) {
      } finally {
        setIsReady(true);
      }
    }
    loadTheme();
  }, []);

  const setMode = async (newMode: ThemeMode) => {
    setModeState(newMode);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, newMode);
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setMode(next);
  };

  const theme: ActiveTheme =
    mode === 'system' ? (systemScheme === 'light' ? 'light' : 'dark') : mode;

  const isDark = theme === 'dark';
  const colors = ThemeColors[theme];

  return (
    <ThemeContext.Provider
      value={{
        mode,
        theme,
        isDark,
        colors,
        toggleTheme,
        setMode,
      }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    // Fallback if accessed outside provider
    return {
      mode: 'dark' as ThemeMode,
      theme: 'dark' as ActiveTheme,
      isDark: true,
      colors: ThemeColors.dark,
      toggleTheme: () => {},
      setMode: () => {},
    };
  }
  return context;
}
