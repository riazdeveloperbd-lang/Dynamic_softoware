import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeColors } from '@/constants/theme';

type ThemeMode = 'light' | 'dark' | 'system';
type ActiveTheme = 'light' | 'dark';

export interface ColorPresetConfig {
  id: string;
  name: string;
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primaryGlow: string;
}

export const COLOR_PRESET_PALETTES: Record<string, ColorPresetConfig> = {
  emerald: {
    id: 'emerald',
    name: 'Emerald Fintech',
    primary: '#10B981',
    primaryLight: '#34D399',
    primaryDark: '#059669',
    primaryGlow: 'rgba(16, 185, 129, 0.18)',
  },
  sapphire: {
    id: 'sapphire',
    name: 'Sapphire Royal',
    primary: '#2563EB',
    primaryLight: '#60A5FA',
    primaryDark: '#1D4ED8',
    primaryGlow: 'rgba(37, 99, 235, 0.18)',
  },
  violet: {
    id: 'violet',
    name: 'Violet Luxe',
    primary: '#8B5CF6',
    primaryLight: '#A78BFA',
    primaryDark: '#7C3AED',
    primaryGlow: 'rgba(139, 92, 246, 0.18)',
  },
  amber: {
    id: 'amber',
    name: 'Amber Gold',
    primary: '#F59E0B',
    primaryLight: '#FBBF24',
    primaryDark: '#D97706',
    primaryGlow: 'rgba(245, 158, 11, 0.18)',
  },
  crimson: {
    id: 'crimson',
    name: 'Ruby Luxury',
    primary: '#F43F5E',
    primaryLight: '#FB7185',
    primaryDark: '#E11D48',
    primaryGlow: 'rgba(244, 63, 94, 0.18)',
  },
  cyan: {
    id: 'cyan',
    name: 'Cyber Cyan',
    primary: '#06B6D4',
    primaryLight: '#22D3EE',
    primaryDark: '#0891B2',
    primaryGlow: 'rgba(6, 182, 212, 0.18)',
  },
};

interface ThemeContextType {
  mode: ThemeMode;
  theme: ActiveTheme;
  isDark: boolean;
  selectedColorPreset: string;
  colors: typeof ThemeColors.dark;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
  setColorPreset: (presetId: string) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const THEME_STORAGE_KEY = 'trc_theme_mode_v1';
const COLOR_PRESET_STORAGE_KEY = 'trc_color_preset_v1';

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('dark'); // default executive dark
  const [colorPreset, setColorPresetState] = useState<string>('emerald');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadTheme() {
      try {
        const savedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedMode === 'light' || savedMode === 'dark' || savedMode === 'system') {
          setModeState(savedMode);
        }
        const savedColor = await AsyncStorage.getItem(COLOR_PRESET_STORAGE_KEY);
        if (savedColor && COLOR_PRESET_PALETTES[savedColor]) {
          setColorPresetState(savedColor);
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

  const setColorPreset = async (presetId: string) => {
    if (COLOR_PRESET_PALETTES[presetId]) {
      setColorPresetState(presetId);
      await AsyncStorage.setItem(COLOR_PRESET_STORAGE_KEY, presetId);
    }
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setMode(next);
  };

  const theme: ActiveTheme =
    mode === 'system' ? (systemScheme === 'light' ? 'light' : 'dark') : mode;

  const isDark = theme === 'dark';
  const activePalette = COLOR_PRESET_PALETTES[colorPreset] || COLOR_PRESET_PALETTES.emerald;

  const baseColors = ThemeColors[theme];
  const colors = {
    ...baseColors,
    primary: activePalette.primary,
    primaryLight: activePalette.primaryLight,
    primaryDark: activePalette.primaryDark,
    primaryGlow: activePalette.primaryGlow,
    borderPrimary: `${activePalette.primary}60`,
    borderGold: `${activePalette.primary}40`,
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        theme,
        isDark,
        selectedColorPreset: colorPreset,
        colors,
        toggleTheme,
        setMode,
        setColorPreset,
      }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    const defaultPalette = COLOR_PRESET_PALETTES.emerald;
    // Fallback if accessed outside provider
    return {
      mode: 'dark' as ThemeMode,
      theme: 'dark' as ActiveTheme,
      isDark: true,
      selectedColorPreset: 'emerald',
      colors: {
        ...ThemeColors.dark,
        primary: defaultPalette.primary,
        primaryLight: defaultPalette.primaryLight,
        primaryDark: defaultPalette.primaryDark,
        primaryGlow: defaultPalette.primaryGlow,
        borderPrimary: `${defaultPalette.primary}60`,
        borderGold: `${defaultPalette.primary}40`,
      },
      toggleTheme: () => {},
      setMode: () => {},
      setColorPreset: () => {},
    };
  }
  return context;
}
