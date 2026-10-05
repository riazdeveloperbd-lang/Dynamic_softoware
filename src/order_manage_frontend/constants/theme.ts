import { Platform } from 'react-native';

export const ThemeColors = {
  dark: {
    bg: '#0A0E17',              // Deep executive slate
    card: '#111827',            // Clean slate card
    cardElevated: '#1E293B',    // Elevated input / surface
    cardHover: '#243044',
    border: 'rgba(255, 255, 255, 0.08)',
    borderLight: 'rgba(255, 255, 255, 0.14)',
    borderPrimary: 'rgba(37, 99, 235, 0.4)',
    borderGold: 'rgba(37, 99, 235, 0.35)',
    text: '#F8FAFC',            // Pure crisp white text
    textSecondary: '#94A3B8',   // Slate secondary text
    textMuted: '#64748B',       // Slate muted text
    textInverse: '#0B0F19',
    backdrop: '#060910',

    primary: '#2563EB',         // Royal Sapphire Blue
    primaryLight: '#60A5FA',    // Sky Blue accent
    primaryDark: '#1D4ED8',     // Deep Cobalt
    primaryGlow: 'rgba(37, 99, 235, 0.18)',

    emerald: '#10B981',         // Success / Collected / Profit
    emeraldDark: '#059669',
    emeraldGlow: 'rgba(16, 185, 129, 0.14)',

    amber: '#F59E0B',           // Currency (SAR) / Pending
    amberGlow: 'rgba(245, 158, 11, 0.15)',

    crimson: '#EF4444',         // Due / Emergency / Loss
    crimsonDark: '#DC2626',
    crimsonGlow: 'rgba(239, 68, 68, 0.16)',
  },
  light: {
    bg: '#F8FAFC',              // Clean off-white surface
    card: '#FFFFFF',            // Crisp pure white card
    cardElevated: '#F1F5F9',    // Soft slate container / input
    cardHover: '#E2E8F0',
    border: '#E2E8F0',          // Slate 200 border
    borderLight: '#CBD5E1',     // Slate 300 border
    borderPrimary: 'rgba(37, 99, 235, 0.35)',
    borderGold: 'rgba(37, 99, 235, 0.3)',
    text: '#0F172A',            // Slate 900 text for maximum clarity
    textSecondary: '#475569',   // Slate 600 secondary text
    textMuted: '#94A3B8',       // Slate 400 muted text
    textInverse: '#FFFFFF',
    backdrop: '#E2E8F0',

    primary: '#2563EB',         // Royal Sapphire Blue
    primaryLight: '#1D4ED8',    // Deep Sapphire on light
    primaryDark: '#1E40AF',
    primaryGlow: 'rgba(37, 99, 235, 0.10)',

    emerald: '#059669',         // Emerald green with strong contrast
    emeraldDark: '#047857',
    emeraldGlow: 'rgba(5, 150, 105, 0.12)',

    amber: '#D97706',           // Rich amber
    amberGlow: 'rgba(217, 119, 6, 0.12)',

    crimson: '#DC2626',         // High-contrast crimson
    crimsonDark: '#B91C1C',
    crimsonGlow: 'rgba(220, 38, 38, 0.12)',
  },
};

export const Colors = {
  ...ThemeColors.dark,
  light: {
    text: '#0F172A',
    background: '#F8FAFC',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#F1F5F9',
    textSecondary: '#475569',
  },
  dark: {
    text: '#F8FAFC',
    background: '#0A0E17',
    backgroundElement: '#111827',
    backgroundSelected: '#1E293B',
    textSecondary: '#94A3B8',
  },
} as const;

export type ThemeColor = 'text' | 'background' | 'backgroundElement' | 'backgroundSelected' | 'textSecondary';

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    serif: 'serif',
    rounded: 'sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
});

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 18,
  xl: 24,
  xxl: 32,

  // Compatibility numbers
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
} as const;

export const MaxContentWidth = 480;
export const BottomTabInset = Platform.select({ ios: 64, android: 72 }) ?? 68;
