import React, { createContext, useContext } from 'react';

export type ThemeMode = 'light' | 'dark';

export type AppColorPresetId =
  | 'obsidian'
  | 'royal_indigo'
  | 'emerald_luxe'
  | 'rose_couture'
  | 'amber_gold'
  | 'ocean_teal'
  | 'violet_velvet';

export type AppFontPresetId =
  | 'jakarta'
  | 'inter'
  | 'manrope'
  | 'dm_sans'
  | 'outfit'
  | 'urbanist'
  | 'sora'
  | 'poppins'
  | 'montserrat'
  | 'josefin'
  | 'space_grotesk'
  | 'syne'
  | 'playfair'
  | 'bodoni'
  | 'cormorant'
  | 'fraunces'
  | 'prata'
  | 'instrument_serif'
  | 'libre_baskerville'
  | 'lora'
  | 'cinzel'
  | 'jetbrains_mono';

export interface AppFontPreset {
  id: AppFontPresetId;
  name: string;
  category: string;
  sample: string;
  fontFamily: string;
  cssStack: string;
}

export const APP_FONT_PRESETS: AppFontPreset[] = [
  {
    id: 'jakarta',
    name: 'Plus Jakarta Sans',
    category: 'Modern Geometric Sans (Default)',
    sample: 'Aa',
    fontFamily: 'Plus Jakarta Sans',
    cssStack: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  {
    id: 'inter',
    name: 'Inter',
    category: 'Swiss Neo-Grotesque UI',
    sample: 'Aa',
    fontFamily: 'Inter',
    cssStack: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  {
    id: 'manrope',
    name: 'Manrope',
    category: 'Contemporary Luxury Sans',
    sample: 'Aa',
    fontFamily: 'Manrope',
    cssStack: "'Manrope', sans-serif",
  },
  {
    id: 'dm_sans',
    name: 'DM Sans',
    category: 'Clean Studio Sans',
    sample: 'Aa',
    fontFamily: 'DM Sans',
    cssStack: "'DM Sans', sans-serif",
  },
  {
    id: 'outfit',
    name: 'Outfit',
    category: 'Minimalist Flagship Sans',
    sample: 'Aa',
    fontFamily: 'Outfit',
    cssStack: "'Outfit', sans-serif",
  },
  {
    id: 'urbanist',
    name: 'Urbanist',
    category: 'Architectural Modernist Sans',
    sample: 'Aa',
    fontFamily: 'Urbanist',
    cssStack: "'Urbanist', sans-serif",
  },
  {
    id: 'sora',
    name: 'Sora',
    category: 'Tokyo Tech-Couture Sans',
    sample: 'Aa',
    fontFamily: 'Sora',
    cssStack: "'Sora', sans-serif",
  },
  {
    id: 'poppins',
    name: 'Poppins',
    category: 'Pure Geometric Sans',
    sample: 'Aa',
    fontFamily: 'Poppins',
    cssStack: "'Poppins', sans-serif",
  },
  {
    id: 'montserrat',
    name: 'Montserrat',
    category: 'Milan Boutique Display Sans',
    sample: 'Aa',
    fontFamily: 'Montserrat',
    cssStack: "'Montserrat', sans-serif",
  },
  {
    id: 'josefin',
    name: 'Josefin Sans',
    category: 'Art Deco Runway Sans',
    sample: 'Aa',
    fontFamily: 'Josefin Sans',
    cssStack: "'Josefin Sans', sans-serif",
  },
  {
    id: 'space_grotesk',
    name: 'Space Grotesk',
    category: 'Streetwear Neo-Grotesque',
    sample: 'Aa',
    fontFamily: 'Space Grotesk',
    cssStack: "'Space Grotesk', sans-serif",
  },
  {
    id: 'syne',
    name: 'Syne',
    category: 'Avant-Garde Art House',
    sample: 'Aa',
    fontFamily: 'Syne',
    cssStack: "'Syne', sans-serif",
  },
  {
    id: 'playfair',
    name: 'Playfair Display',
    category: 'Haute Couture Editorial Serif',
    sample: 'Aa',
    fontFamily: 'Playfair Display',
    cssStack: "'Playfair Display', Georgia, serif",
  },
  {
    id: 'bodoni',
    name: 'Bodoni Moda',
    category: 'Vogue High-Contrast Didone',
    sample: 'Aa',
    fontFamily: 'Bodoni Moda',
    cssStack: "'Bodoni Moda', Georgia, serif",
  },
  {
    id: 'cormorant',
    name: 'Cormorant Garamond',
    category: 'Parisian Atelier Serif',
    sample: 'Aa',
    fontFamily: 'Cormorant Garamond',
    cssStack: "'Cormorant Garamond', Georgia, serif",
  },
  {
    id: 'fraunces',
    name: 'Fraunces',
    category: 'Warm Bespoke Old-Style Serif',
    sample: 'Aa',
    fontFamily: 'Fraunces',
    cssStack: "'Fraunces', Georgia, serif",
  },
  {
    id: 'prata',
    name: 'Prata',
    category: 'Luxury Lookbook Didone',
    sample: 'Aa',
    fontFamily: 'Prata',
    cssStack: "'Prata', Georgia, serif",
  },
  {
    id: 'instrument_serif',
    name: 'Instrument Serif',
    category: 'Editorial Magazine Serif',
    sample: 'Aa',
    fontFamily: 'Instrument Serif',
    cssStack: "'Instrument Serif', Georgia, serif",
  },
  {
    id: 'libre_baskerville',
    name: 'Libre Baskerville',
    category: 'Heritage Tailoring Serif',
    sample: 'Aa',
    fontFamily: 'Libre Baskerville',
    cssStack: "'Libre Baskerville', Georgia, serif",
  },
  {
    id: 'lora',
    name: 'Lora',
    category: 'Contemporary Calligraphic Serif',
    sample: 'Aa',
    fontFamily: 'Lora',
    cssStack: "'Lora', Georgia, serif",
  },
  {
    id: 'cinzel',
    name: 'Cinzel',
    category: 'Royal Crest Classical Roman',
    sample: 'Aa',
    fontFamily: 'Cinzel',
    cssStack: "'Cinzel', Georgia, serif",
  },
  {
    id: 'jetbrains_mono',
    name: 'JetBrains Mono',
    category: 'Archive Technical Monospace',
    sample: 'Aa',
    fontFamily: 'JetBrains Mono',
    cssStack: "'JetBrains Mono', monospace",
  },
];

export interface AppColorPreset {
  id: AppColorPresetId;
  name: string;
  tagline: string;
  swatch: string;
  lightOverrides: Partial<ColorPalette>;
  darkOverrides: Partial<ColorPalette>;
}

export interface ColorPalette {
  background: string;
  surface: string;
  surfaceElevated: string;
  cardBackground: string;
  productTile: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  border: string;
  divider: string;
  thickSeparator: string;
  primary: string;
  primaryText: string;
  danger: string;
  dangerBg: string;
  success: string;
  successBg: string;
  warning: string;
  skeletonBase: string;
  skeletonHighlight: string;
  keyboardBg: string;
  keyboardKey: string;
  keyboardSpecialKey: string;
  overlay: string;
  workspaceBg: string;
}

export const LIGHT_COLORS: ColorPalette = {
  background: '#FFFFFF',
  surface: '#F7F7F7',
  surfaceElevated: '#FFFFFF',
  cardBackground: '#FFFFFF',
  productTile: '#F2F2F2',
  textPrimary: '#1A1A1A',
  textSecondary: '#808080',
  textMuted: '#999999',
  textInverse: '#FFFFFF',
  border: '#E6E6E6',
  divider: '#E6E6E6',
  thickSeparator: '#E6E6E6',
  primary: '#1A1A1A',
  primaryText: '#FFFFFF',
  danger: '#ED1010',
  dangerBg: '#FDE8E8',
  success: '#0C9409',
  successBg: '#E7F7E7',
  warning: '#FFA928',
  skeletonBase: '#ECECEC',
  skeletonHighlight: '#F7F7F7',
  keyboardBg: '#D1D5DB',
  keyboardKey: '#FFFFFF',
  keyboardSpecialKey: '#AEB3BE',
  overlay: 'rgba(0,0,0,0.45)',
  workspaceBg: '#E4E4E7',
};

export const DARK_COLORS: ColorPalette = {
  background: '#121212',
  surface: '#1E1E1E',
  surfaceElevated: '#222222',
  cardBackground: '#1A1A1A',
  productTile: '#242424',
  textPrimary: '#F5F5F7',
  textSecondary: '#A1A1AA',
  textMuted: '#71717A',
  textInverse: '#121212',
  border: '#2E2E32',
  divider: '#27272A',
  thickSeparator: '#1F1F23',
  primary: '#FFFFFF',
  primaryText: '#121212',
  danger: '#FF453A',
  dangerBg: 'rgba(255,69,58,0.16)',
  success: '#32D74B',
  successBg: 'rgba(50,215,75,0.16)',
  warning: '#FFD60A',
  skeletonBase: '#262629',
  skeletonHighlight: '#323236',
  keyboardBg: '#1C1C1E',
  keyboardKey: '#3A3A3C',
  keyboardSpecialKey: '#2C2C2E',
  overlay: 'rgba(0,0,0,0.7)',
  workspaceBg: '#09090B',
};

export const APP_COLOR_PRESETS: AppColorPreset[] = [
  {
    id: 'obsidian',
    name: 'Obsidian Noir',
    tagline: 'Default Monochrome Atelier',
    swatch: '#1A1A1A',
    lightOverrides: {},
    darkOverrides: {},
  },
  {
    id: 'royal_indigo',
    name: 'Royal Indigo',
    tagline: 'Electric Sapphire & Crisp Slate',
    swatch: '#4F46E5',
    lightOverrides: {
      primary: '#4F46E5',
      primaryText: '#FFFFFF',
      background: '#FAFbff',
      surface: '#EEF2FF',
      cardBackground: '#FFFFFF',
      productTile: '#E0E7FF',
      border: '#C7D2FE',
      divider: '#E0E7FF',
      thickSeparator: '#E0E7FF',
      textPrimary: '#1E1B4B',
      textSecondary: '#4338CA',
      workspaceBg: '#E0E7FF',
    },
    darkOverrides: {
      primary: '#6366F1',
      primaryText: '#FFFFFF',
      background: '#0F0E1A',
      surface: '#1A182E',
      surfaceElevated: '#221F3B',
      cardBackground: '#161426',
      productTile: '#231F3D',
      border: '#312E81',
      divider: '#282454',
      workspaceBg: '#090812',
    },
  },
  {
    id: 'emerald_luxe',
    name: 'Emerald Luxe',
    tagline: 'Botanical Couture & Sage',
    swatch: '#059669',
    lightOverrides: {
      primary: '#059669',
      primaryText: '#FFFFFF',
      background: '#F8FDFB',
      surface: '#ECFDF5',
      cardBackground: '#FFFFFF',
      productTile: '#D1FAE5',
      border: '#A7F3D0',
      divider: '#D1FAE5',
      thickSeparator: '#D1FAE5',
      textPrimary: '#064E3B',
      textSecondary: '#047857',
      workspaceBg: '#D1FAE5',
    },
    darkOverrides: {
      primary: '#10B981',
      primaryText: '#042F2E',
      background: '#081410',
      surface: '#11261F',
      surfaceElevated: '#163027',
      cardBackground: '#0D1F19',
      productTile: '#152E25',
      border: '#065F46',
      divider: '#064E3B',
      workspaceBg: '#040B09',
    },
  },
  {
    id: 'rose_couture',
    name: 'Rose Couture',
    tagline: 'Parisian Crimson & Blush Silk',
    swatch: '#E11D48',
    lightOverrides: {
      primary: '#E11D48',
      primaryText: '#FFFFFF',
      background: '#FFFBFD',
      surface: '#FFF1F2',
      cardBackground: '#FFFFFF',
      productTile: '#FFE4E6',
      border: '#FECDD3',
      divider: '#FFE4E6',
      thickSeparator: '#FFE4E6',
      textPrimary: '#4C0519',
      textSecondary: '#BE123C',
      workspaceBg: '#FFE4E6',
    },
    darkOverrides: {
      primary: '#F43F5E',
      primaryText: '#FFFFFF',
      background: '#170A0E',
      surface: '#291219',
      surfaceElevated: '#361721',
      cardBackground: '#210E14',
      productTile: '#30141D',
      border: '#881337',
      divider: '#4C0519',
      workspaceBg: '#0F0508',
    },
  },
  {
    id: 'amber_gold',
    name: 'Amber Gold',
    tagline: 'Warm Champagne & Terracotta',
    swatch: '#D97706',
    lightOverrides: {
      primary: '#D97706',
      primaryText: '#FFFFFF',
      background: '#FFFDF9',
      surface: '#FEF3C7',
      cardBackground: '#FFFFFF',
      productTile: '#FDE68A',
      border: '#FCD34D',
      divider: '#FEF3C7',
      thickSeparator: '#FEF3C7',
      textPrimary: '#451A03',
      textSecondary: '#B45309',
      workspaceBg: '#FEF3C7',
    },
    darkOverrides: {
      primary: '#F59E0B',
      primaryText: '#1A1103',
      background: '#140F07',
      surface: '#261C0D',
      surfaceElevated: '#332511',
      cardBackground: '#1F160A',
      productTile: '#2E210F',
      border: '#78350F',
      divider: '#451A03',
      workspaceBg: '#0D0904',
    },
  },
  {
    id: 'ocean_teal',
    name: 'Ocean Teal',
    tagline: 'Mediterranean Azure & Mist',
    swatch: '#0284C7',
    lightOverrides: {
      primary: '#0284C7',
      primaryText: '#FFFFFF',
      background: '#F9FDFF',
      surface: '#E0F2FE',
      cardBackground: '#FFFFFF',
      productTile: '#BAE6FD',
      border: '#7DD3FC',
      divider: '#E0F2FE',
      thickSeparator: '#E0F2FE',
      textPrimary: '#082F49',
      textSecondary: '#0369A1',
      workspaceBg: '#E0F2FE',
    },
    darkOverrides: {
      primary: '#38BDF8',
      primaryText: '#082F49',
      background: '#07131A',
      surface: '#0F2430',
      surfaceElevated: '#153040',
      cardBackground: '#0C1D26',
      productTile: '#132B38',
      border: '#075985',
      divider: '#0C4A6E',
      workspaceBg: '#040B0F',
    },
  },
  {
    id: 'violet_velvet',
    name: 'Violet Velvet',
    tagline: 'Amethyst Studio & Lavender',
    swatch: '#7C3AED',
    lightOverrides: {
      primary: '#7C3AED',
      primaryText: '#FFFFFF',
      background: '#FCFAFF',
      surface: '#F3E8FF',
      cardBackground: '#FFFFFF',
      productTile: '#E9D5FF',
      border: '#D8B4FE',
      divider: '#F3E8FF',
      thickSeparator: '#F3E8FF',
      textPrimary: '#2E1065',
      textSecondary: '#6D28D9',
      workspaceBg: '#F3E8FF',
    },
    darkOverrides: {
      primary: '#A855F7',
      primaryText: '#FFFFFF',
      background: '#130B1C',
      surface: '#221433',
      surfaceElevated: '#2D1A42',
      cardBackground: '#1A0F26',
      productTile: '#28173B',
      border: '#581C87',
      divider: '#3B0764',
      workspaceBg: '#0B0612',
    },
  },
];

export const SPACING = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const RADIUS = {
  xs: 5,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 20,
  xxl: 24,
  full: 999,
} as const;

export const TYPOGRAPHY = {
  fontFamily: {
    regular: 'Plus Jakarta Sans',
    medium: 'Plus Jakarta Sans',
    semiBold: 'Plus Jakarta Sans',
    bold: 'Plus Jakarta Sans',
  },
  fontSize: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    display: 32,
    hero: 54,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
    extraBold: '800' as const,
  },
  lineHeight: {
    tight: 18,
    normal: 22,
    relaxed: 28,
    display: 38,
    hero: 54,
  },
} as const;

export interface AppTheme {
  mode: ThemeMode;
  isDark: boolean;
  colorPreset: AppColorPresetId;
  presets: AppColorPreset[];
  setColorPreset: (preset: AppColorPresetId) => void;
  fontPreset: AppFontPresetId;
  fontPresets: AppFontPreset[];
  setFontPreset: (font: AppFontPresetId) => void;
  colors: ColorPalette;
  spacing: typeof SPACING;
  radius: typeof RADIUS;
  typography: {
    fontFamily: {
      regular: string;
      medium: string;
      semiBold: string;
      bold: string;
    };
    fontSize: typeof TYPOGRAPHY.fontSize;
    fontWeight: typeof TYPOGRAPHY.fontWeight;
    lineHeight: typeof TYPOGRAPHY.lineHeight;
  };
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
  isLoadingSkeleton: boolean;
  triggerSkeleton: (durationMs?: number) => void;
  toggleSkeletonPreview: () => void;
}

export const getTheme = (
  mode: ThemeMode,
  toggleTheme: () => void,
  setThemeMode: (m: ThemeMode) => void,
  isLoadingSkeleton: boolean,
  triggerSkeleton: (durationMs?: number) => void,
  toggleSkeletonPreview: () => void,
  colorPreset: AppColorPresetId = 'obsidian',
  setColorPreset: (preset: AppColorPresetId) => void = () => {},
  fontPreset: AppFontPresetId = 'jakarta',
  setFontPreset: (font: AppFontPresetId) => void = () => {}
): AppTheme => {
  const presetObj =
    APP_COLOR_PRESETS.find((p) => p.id === colorPreset) || APP_COLOR_PRESETS[0];
  const fontObj =
    APP_FONT_PRESETS.find((f) => f.id === fontPreset) || APP_FONT_PRESETS[0];
  const baseColors = mode === 'dark' ? DARK_COLORS : LIGHT_COLORS;
  const overrides =
    mode === 'dark' ? presetObj.darkOverrides : presetObj.lightOverrides;

  return {
    mode,
    isDark: mode === 'dark',
    colorPreset,
    presets: APP_COLOR_PRESETS,
    setColorPreset,
    fontPreset,
    fontPresets: APP_FONT_PRESETS,
    setFontPreset,
    colors: {
      ...baseColors,
      ...overrides,
    },
    spacing: SPACING,
    radius: RADIUS,
    typography: {
      ...TYPOGRAPHY,
      fontFamily: {
        regular: fontObj.fontFamily,
        medium: fontObj.fontFamily,
        semiBold: fontObj.fontFamily,
        bold: fontObj.fontFamily,
      },
    },
    toggleTheme,
    setThemeMode,
    isLoadingSkeleton,
    triggerSkeleton,
    toggleSkeletonPreview,
  };
};

export const ThemeContext = createContext<AppTheme>({
  mode: 'light',
  isDark: false,
  colorPreset: 'obsidian',
  presets: APP_COLOR_PRESETS,
  setColorPreset: () => {},
  fontPreset: 'jakarta',
  fontPresets: APP_FONT_PRESETS,
  setFontPreset: () => {},
  colors: LIGHT_COLORS,
  spacing: SPACING,
  radius: RADIUS,
  typography: TYPOGRAPHY,
  toggleTheme: () => {},
  setThemeMode: () => {},
  isLoadingSkeleton: false,
  triggerSkeleton: () => {},
  toggleSkeletonPreview: () => {},
});

export const useTheme = (): AppTheme => useContext(ThemeContext);
