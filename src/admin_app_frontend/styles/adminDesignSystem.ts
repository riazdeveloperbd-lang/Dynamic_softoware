import React, { createContext, useContext } from 'react';
import {
  APP_FONT_PRESETS,
  AppColorPresetId,
  AppFontPreset,
  AppFontPresetId,
} from '../../cloth_shop_frontend/styles/theme';

export type AdminBottomNavVariantId =
  | 'varient_1'
  | 'varient_2'
  | 'varient_3'
  | 'varient_4'
  | 'varient_5'
  | 'varient_6'
  | 'varient_7'
  | 'varient_8'
  | 'varient_9'
  | 'varient_10';

export interface AdminBottomNavVariantOption {
  id: AdminBottomNavVariantId;
  name: string;
  tagline: string;
}

export const ADMIN_BOTTOM_NAV_VARIANTS: AdminBottomNavVariantOption[] = [
  {
    id: 'varient_1',
    name: 'V1 • Classic Console Bar',
    tagline: 'Default Clean Icon + Label Executive Bar',
  },
  {
    id: 'varient_2',
    name: 'V2 • Floating Capsule Dock',
    tagline: 'Elevated Rounded Island with Active Pill',
  },
  {
    id: 'varient_3',
    name: 'V3 • Expanding Smart Pill',
    tagline: 'Horizontal Expanding Pill for Active Tab',
  },
  {
    id: 'varient_4',
    name: 'V4 • Center Orders FAB Notch',
    tagline: 'Curved Dock with Elevated Center Orders Action',
  },
  {
    id: 'varient_5',
    name: 'V5 • Top Neon Indicator',
    tagline: 'Minimalist Luxe Bar with Top Accent Line & Glow',
  },
  {
    id: 'varient_6',
    name: 'V6 • Solid Brand Luxe Dock',
    tagline: 'Rich Brand-Colored Floating Dock with Crisp Active Pill',
  },
  {
    id: 'varient_7',
    name: 'V7 • Segmented Bento Grid',
    tagline: '4-Tile Soft Tinted Bento Dock with Active Frame',
  },
  {
    id: 'varient_8',
    name: 'V8 • Brutalist Sharp Frame',
    tagline: 'Hard-Edge Offset Shadow Bar with Bold Active Block',
  },
  {
    id: 'varient_9',
    name: 'V9 • Minimal Dot & Halo',
    tagline: 'Floating Soft Halo Dock with Active Dot Indicator',
  },
  {
    id: 'varient_10',
    name: 'V10 • Dual-Tone Split Deck',
    tagline: 'Brand Header Accent Rail with Elevated Active Tab',
  },
];

export interface AdminColorPalette {
  id: AppColorPresetId;
  name: string;
  tagline: string;
  swatch: string;
  primary: string;
  primaryHover: string;
  primaryText: string;
  primarySoft: string;
  primaryBorder: string;
  background: string;
  cardBackground: string;
  surface: string;
  surfaceElevated: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
}

export interface AdminColorPresetConfig {
  id: AppColorPresetId;
  name: string;
  tagline: string;
  swatch: string;
  light: Omit<AdminColorPalette, 'id' | 'name' | 'tagline' | 'swatch'>;
  dark: Omit<AdminColorPalette, 'id' | 'name' | 'tagline' | 'swatch'>;
}

export const ADMIN_COLOR_PRESETS: AdminColorPresetConfig[] = [
  {
    id: 'obsidian',
    name: 'Obsidian Noir',
    tagline: 'Default Monochrome Atelier',
    swatch: '#1A1A1A',
    light: {
      primary: '#1A1A1A',
      primaryHover: '#262626',
      primaryText: '#FFFFFF',
      primarySoft: '#F2F2F2',
      primaryBorder: '#E6E6E6',
      background: '#FFFFFF',
      cardBackground: '#FFFFFF',
      surface: '#F7F7F7',
      surfaceElevated: '#FFFFFF',
      border: '#E6E6E6',
      textPrimary: '#1A1A1A',
      textSecondary: '#808080',
      textMuted: '#999999',
    },
    dark: {
      primary: '#27272A',
      primaryHover: '#3F3F46',
      primaryText: '#FFFFFF',
      primarySoft: '#242424',
      primaryBorder: '#2E2E32',
      background: '#121212',
      cardBackground: '#1A1A1A',
      surface: '#1E1E1E',
      surfaceElevated: '#222222',
      border: '#2E2E32',
      textPrimary: '#F5F5F7',
      textSecondary: '#A1A1AA',
      textMuted: '#71717A',
    },
  },
  {
    id: 'royal_indigo',
    name: 'Royal Indigo',
    tagline: 'Electric Sapphire & Crisp Slate',
    swatch: '#4F46E5',
    light: {
      primary: '#4F46E5',
      primaryHover: '#4338CA',
      primaryText: '#FFFFFF',
      primarySoft: '#EEF2FF',
      primaryBorder: '#C7D2FE',
      background: '#F8FAFF',
      cardBackground: '#FFFFFF',
      surface: '#EEF2FF',
      surfaceElevated: '#FFFFFF',
      border: '#E0E7FF',
      textPrimary: '#1E1B4B',
      textSecondary: '#4338CA',
      textMuted: '#6366F1',
    },
    dark: {
      primary: '#6366F1',
      primaryHover: '#818CF8',
      primaryText: '#FFFFFF',
      primarySoft: '#1E1B4B',
      primaryBorder: '#3730A3',
      background: '#0B0A14',
      cardBackground: '#131124',
      surface: '#1C1936',
      surfaceElevated: '#221F40',
      border: '#2E295E',
      textPrimary: '#F5F7FF',
      textSecondary: '#A5B4FC',
      textMuted: '#818CF8',
    },
  },
  {
    id: 'emerald_luxe',
    name: 'Emerald Luxe',
    tagline: 'Botanical Couture & Sage',
    swatch: '#059669',
    light: {
      primary: '#059669',
      primaryHover: '#047857',
      primaryText: '#FFFFFF',
      primarySoft: '#ECFDF5',
      primaryBorder: '#A7F3D0',
      background: '#F7FCFA',
      cardBackground: '#FFFFFF',
      surface: '#ECFDF5',
      surfaceElevated: '#FFFFFF',
      border: '#D1FAE5',
      textPrimary: '#064E3B',
      textSecondary: '#047857',
      textMuted: '#10B981',
    },
    dark: {
      primary: '#059669',
      primaryHover: '#10B981',
      primaryText: '#FFFFFF',
      primarySoft: '#064E3B',
      primaryBorder: '#065F46',
      background: '#06100D',
      cardBackground: '#0C1D17',
      surface: '#122B22',
      surfaceElevated: '#16352B',
      border: '#1B4336',
      textPrimary: '#ECFDF5',
      textSecondary: '#6EE7B7',
      textMuted: '#34D399',
    },
  },
  {
    id: 'rose_couture',
    name: 'Rose Couture',
    tagline: 'Parisian Crimson & Blush Silk',
    swatch: '#E11D48',
    light: {
      primary: '#E11D48',
      primaryHover: '#BE123C',
      primaryText: '#FFFFFF',
      primarySoft: '#FFF1F2',
      primaryBorder: '#FECDD3',
      background: '#FFF9FA',
      cardBackground: '#FFFFFF',
      surface: '#FFF1F2',
      surfaceElevated: '#FFFFFF',
      border: '#FFE4E6',
      textPrimary: '#4C0519',
      textSecondary: '#BE123C',
      textMuted: '#F43F5E',
    },
    dark: {
      primary: '#F43F5E',
      primaryHover: '#FB7185',
      primaryText: '#FFFFFF',
      primarySoft: '#4C0519',
      primaryBorder: '#881337',
      background: '#12070A',
      cardBackground: '#1F0C12',
      surface: '#2C121A',
      surfaceElevated: '#371620',
      border: '#4C1D2B',
      textPrimary: '#FFF1F2',
      textSecondary: '#FDA4AF',
      textMuted: '#FB7185',
    },
  },
  {
    id: 'amber_gold',
    name: 'Amber Gold',
    tagline: 'Warm Champagne & Terracotta',
    swatch: '#D97706',
    light: {
      primary: '#D97706',
      primaryHover: '#B45309',
      primaryText: '#FFFFFF',
      primarySoft: '#FEF3C7',
      primaryBorder: '#FDE68A',
      background: '#FFFDF7',
      cardBackground: '#FFFFFF',
      surface: '#FEF3C7',
      surfaceElevated: '#FFFFFF',
      border: '#FDE68A',
      textPrimary: '#451A03',
      textSecondary: '#B45309',
      textMuted: '#D97706',
    },
    dark: {
      primary: '#D97706',
      primaryHover: '#F59E0B',
      primaryText: '#FFFFFF',
      primarySoft: '#451A03',
      primaryBorder: '#78350F',
      background: '#120D05',
      cardBackground: '#1E1509',
      surface: '#2B1F0D',
      surfaceElevated: '#362711',
      border: '#4A3517',
      textPrimary: '#FFFBEB',
      textSecondary: '#FCD34D',
      textMuted: '#F59E0B',
    },
  },
  {
    id: 'ocean_teal',
    name: 'Ocean Teal',
    tagline: 'Mediterranean Cyan & Deep Harbor',
    swatch: '#0D9488',
    light: {
      primary: '#0D9488',
      primaryHover: '#0F766E',
      primaryText: '#FFFFFF',
      primarySoft: '#F0FDFA',
      primaryBorder: '#99F6E4',
      background: '#F7FEFC',
      cardBackground: '#FFFFFF',
      surface: '#F0FDFA',
      surfaceElevated: '#FFFFFF',
      border: '#CCFBF1',
      textPrimary: '#134E4A',
      textSecondary: '#0F766E',
      textMuted: '#14B8A6',
    },
    dark: {
      primary: '#0D9488',
      primaryHover: '#14B8A6',
      primaryText: '#FFFFFF',
      primarySoft: '#134E4A',
      primaryBorder: '#115E59',
      background: '#051110',
      cardBackground: '#0B1E1C',
      surface: '#112D2A',
      surfaceElevated: '#163834',
      border: '#1E4B46',
      textPrimary: '#F0FDFA',
      textSecondary: '#5EEAD4',
      textMuted: '#2DD4BF',
    },
  },
  {
    id: 'violet_velvet',
    name: 'Violet Velvet',
    tagline: 'Runway Amethyst & Lavender',
    swatch: '#7C3AED',
    light: {
      primary: '#7C3AED',
      primaryHover: '#6D28D9',
      primaryText: '#FFFFFF',
      primarySoft: '#F5F3FF',
      primaryBorder: '#DDD6FE',
      background: '#FAF8FF',
      cardBackground: '#FFFFFF',
      surface: '#F5F3FF',
      surfaceElevated: '#FFFFFF',
      border: '#EDE9FE',
      textPrimary: '#2E1065',
      textSecondary: '#6D28D9',
      textMuted: '#8B5CF6',
    },
    dark: {
      primary: '#8B5CF6',
      primaryHover: '#A78BFA',
      primaryText: '#FFFFFF',
      primarySoft: '#2E1065',
      primaryBorder: '#4C1D95',
      background: '#0D0816',
      cardBackground: '#160E26',
      surface: '#211538',
      surfaceElevated: '#2A1B47',
      border: '#3B2563',
      textPrimary: '#F5F3FF',
      textSecondary: '#C4B5FD',
      textMuted: '#A78BFA',
    },
  },
];

export const ADMIN_FONT_PRESETS: AppFontPreset[] = APP_FONT_PRESETS;

export function resolveAdminColorPalette(
  presetId: AppColorPresetId,
  isDark: boolean
): AdminColorPalette {
  const found =
    ADMIN_COLOR_PRESETS.find((p) => p.id === presetId) || ADMIN_COLOR_PRESETS[0];
  const modeTokens = isDark ? found.dark : found.light;
  return {
    id: found.id,
    name: found.name,
    tagline: found.tagline,
    swatch: found.swatch,
    ...modeTokens,
  };
}

export interface AdminDesignSystemContextValue {
  isDark: boolean;
  toggleTheme: () => void;
  colorPresetId: AppColorPresetId;
  setColorPresetId: (id: AppColorPresetId) => void;
  palette: AdminColorPalette;
  fontPresetId: AppFontPresetId;
  setFontPresetId: (id: AppFontPresetId) => void;
  activeFont: AppFontPreset;
  bottomNavVariant: AdminBottomNavVariantId;
  setBottomNavVariant: (id: AdminBottomNavVariantId) => void;
}

const defaultPalette = resolveAdminColorPalette('obsidian', false);

export const AdminDesignSystemContext =
  createContext<AdminDesignSystemContextValue>({
    isDark: false,
    toggleTheme: () => {},
    colorPresetId: 'obsidian',
    setColorPresetId: () => {},
    palette: defaultPalette,
    fontPresetId: 'jakarta',
    setFontPresetId: () => {},
    activeFont: ADMIN_FONT_PRESETS[0],
    bottomNavVariant: 'varient_1',
    setBottomNavVariant: () => {},
  });

export function useAdminDesignSystem(): AdminDesignSystemContextValue {
  return useContext(AdminDesignSystemContext);
}

export function getAdminThemeScopeStyle(
  palette: AdminColorPalette,
  activeFont: AppFontPreset
): React.CSSProperties {
  return {
    fontFamily: activeFont.cssStack,
    backgroundColor: palette.background,
    color: palette.textPrimary,
    ['--admin-font' as string]: activeFont.cssStack,
    ['--admin-primary' as string]: palette.primary,
    ['--admin-primary-hover' as string]: palette.primaryHover,
    ['--admin-primary-text' as string]: palette.primaryText,
    ['--admin-primary-soft' as string]: palette.primarySoft,
    ['--admin-primary-border' as string]: palette.primaryBorder,
    ['--admin-bg' as string]: palette.background,
    ['--admin-card' as string]: palette.cardBackground,
    ['--admin-surface' as string]: palette.surface,
    ['--admin-border' as string]: palette.border,
    ['--admin-text' as string]: palette.textPrimary,
    ['--admin-text-secondary' as string]: palette.textSecondary,
  };
}

