import React, { createContext, useContext } from 'react';
import {
  APP_FONT_PRESETS,
  AppColorPresetId,
  AppFontPreset,
  AppFontPresetId,
  BottomNavVariantId,
} from '../../cloth_shop_frontend/styles/theme';

export type BookStoreBottomNavVariantId = BottomNavVariantId;

export type BookStoreVariantId =
  | 'varient_1'
  | 'varient_2'
  | 'varient_3'
  | 'varient_4'
  | 'varient_5'
  | 'varient_6';

export const ALL_BOOK_STORE_VARIANT_IDS: BookStoreVariantId[] = [
  'varient_1',
  'varient_2',
  'varient_3',
  'varient_4',
  'varient_5',
  'varient_6',
];

export function getBookStoreVariantCardStyle(
  variant: BookStoreVariantId,
  palette: BookStoreColorPalette
): React.CSSProperties {
  if (variant === 'varient_2') {
    return {
      backgroundColor: palette.primarySoft,
      borderColor: palette.primaryBorder,
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 20,
    };
  }
  if (variant === 'varient_3') {
    return {
      backgroundColor: palette.cardBackground,
      borderColor: palette.textPrimary,
      borderWidth: 2,
      borderStyle: 'solid',
      borderRadius: 12,
      boxShadow: `4px 4px 0px ${palette.primary}`,
    };
  }
  if (variant === 'varient_4') {
    return {
      backgroundColor: palette.cardBackground,
      borderColor: palette.border,
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 22,
      boxShadow: '0 10px 25px -10px rgba(0,0,0,0.12)',
    };
  }
  if (variant === 'varient_5') {
    return {
      backgroundColor: palette.surface,
      borderColor: palette.border,
      borderWidth: 1,
      borderStyle: 'solid',
      borderLeftWidth: 4,
      borderLeftColor: palette.primary,
      borderRadius: 14,
    };
  }
  if (variant === 'varient_6') {
    return {
      backgroundColor: palette.cardBackground,
      borderColor: palette.primaryBorder,
      borderWidth: 1.5,
      borderStyle: 'dashed',
      borderRadius: 16,
    };
  }
  return {
    backgroundColor: palette.cardBackground,
    borderColor: palette.border,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 16,
  };
}

export interface BookStoreBottomNavVariantConfig {
  id: BookStoreBottomNavVariantId;
  name: string;
  tagline: string;
}

export const BOOK_STORE_BOTTOM_NAV_VARIANTS: BookStoreBottomNavVariantConfig[] = [
  {
    id: 'varient_1',
    name: 'V1: Bazar Classic Bar',
    tagline: 'Clean 4-tab bar with Home, Category, Cart badge & Profile',
  },
  {
    id: 'varient_2',
    name: 'V2: Floating Plum Capsule',
    tagline: 'Detached rounded pill dock with active primary capsule',
  },
  {
    id: 'varient_3',
    name: 'V3: Top Indicator Line',
    tagline: 'Editorial top indicator bar with crisp iconography',
  },
  {
    id: 'varient_4',
    name: 'V4: Soft Tinted Pill Bar',
    tagline: 'Lavender tinted active pill with inline label',
  },
  {
    id: 'varient_5',
    name: 'V5: Minimal Dot Dock',
    tagline: 'Ultra-clean literary dock with glowing active dot',
  },
  {
    id: 'varient_6',
    name: 'V6: Elevated Center Cart',
    tagline: 'Floating center Cart action button with badge',
  },
  {
    id: 'varient_7',
    name: 'V7: Brutalist Book Ledger',
    tagline: '2px hard-edge frame with offset shadow & bold tabs',
  },
  {
    id: 'varient_8',
    name: 'V8: Glassmorphic Blur Dock',
    tagline: 'Translucent frosted blur dock with subtle border',
  },
  {
    id: 'varient_9',
    name: 'V9: Split Compact Dock',
    tagline: 'Segmented twin-island literary navigation bar',
  },
  {
    id: 'varient_10',
    name: 'V10: Solid Royal Banner',
    tagline: 'Full-bleed primary brand surface with high-contrast tabs',
  },
];

export interface BookStoreColorPalette {
  id: AppColorPresetId;
  name: string;
  swatch: string;
  primary: string;
  primaryText: string;
  primarySoft: string;
  primaryBorder: string;
  secondary: string;
  background: string;
  cardBackground: string;
  surface: string;
  inputBackground: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  success: string;
  warning: string;
  danger: string;
}

export interface BookStoreColorPresetConfig {
  id: AppColorPresetId;
  name: string;
  swatch: string;
  light: Omit<BookStoreColorPalette, 'id' | 'name' | 'swatch'>;
  dark: Omit<BookStoreColorPalette, 'id' | 'name' | 'swatch'>;
}

export const BOOK_STORE_COLOR_PRESETS: BookStoreColorPresetConfig[] = [
  {
    id: 'royal_violet',
    name: 'Bazar Royal Plum',
    swatch: '#54408C',
    light: {
      primary: '#54408C',
      primaryText: '#FFFFFF',
      primarySoft: '#FAF9FD',
      primaryBorder: '#D5C9F2',
      secondary: '#F59E0B',
      background: '#FFFFFF',
      cardBackground: '#FFFFFF',
      surface: '#FAFAFA',
      inputBackground: '#FAFAFA',
      textPrimary: '#121212',
      textSecondary: '#7A7A7A',
      textMuted: '#A6A6A6',
      border: '#E8E8E8',
      success: '#10B981',
      warning: '#F59E0B',
      danger: '#EF4444',
    },
    dark: {
      primary: '#8B72CE',
      primaryText: '#FFFFFF',
      primarySoft: 'rgba(139, 114, 206, 0.16)',
      primaryBorder: 'rgba(139, 114, 206, 0.38)',
      secondary: '#FBBF24',
      background: '#0F0D15',
      cardBackground: '#181522',
      surface: '#211D2E',
      inputBackground: '#1E1A2B',
      textPrimary: '#F8FAFC',
      textSecondary: '#A19BB5',
      textMuted: '#6E6882',
      border: '#2B263B',
      success: '#34D399',
      warning: '#FBBF24',
      danger: '#F87171',
    },
  },
  {
    id: 'indigo_atelier',
    name: 'Oxford Indigo Press',
    swatch: '#4338CA',
    light: {
      primary: '#4338CA',
      primaryText: '#FFFFFF',
      primarySoft: '#EEF2FF',
      primaryBorder: '#C7D2FE',
      secondary: '#F59E0B',
      background: '#FFFFFF',
      cardBackground: '#FFFFFF',
      surface: '#F8FAFC',
      inputBackground: '#F8FAFC',
      textPrimary: '#0F172A',
      textSecondary: '#64748B',
      textMuted: '#94A3B8',
      border: '#E2E8F0',
      success: '#10B981',
      warning: '#F59E0B',
      danger: '#EF4444',
    },
    dark: {
      primary: '#6366F1',
      primaryText: '#FFFFFF',
      primarySoft: 'rgba(99, 102, 241, 0.16)',
      primaryBorder: 'rgba(99, 102, 241, 0.38)',
      secondary: '#FBBF24',
      background: '#0B0F19',
      cardBackground: '#131B2E',
      surface: '#1E293B',
      inputBackground: '#1A2436',
      textPrimary: '#F8FAFC',
      textSecondary: '#94A3B8',
      textMuted: '#64748B',
      border: '#26334D',
      success: '#34D399',
      warning: '#FBBF24',
      danger: '#F87171',
    },
  },
  {
    id: 'emerald_luxe',
    name: 'Botanical Library Green',
    swatch: '#047857',
    light: {
      primary: '#047857',
      primaryText: '#FFFFFF',
      primarySoft: '#ECFDF5',
      primaryBorder: '#A7F3D0',
      secondary: '#F59E0B',
      background: '#FFFFFF',
      cardBackground: '#FFFFFF',
      surface: '#F8FAFC',
      inputBackground: '#F9FAFB',
      textPrimary: '#111827',
      textSecondary: '#6B7280',
      textMuted: '#9CA3AF',
      border: '#E5E7EB',
      success: '#10B981',
      warning: '#F59E0B',
      danger: '#EF4444',
    },
    dark: {
      primary: '#10B981',
      primaryText: '#052E16',
      primarySoft: 'rgba(16, 185, 129, 0.16)',
      primaryBorder: 'rgba(16, 185, 129, 0.36)',
      secondary: '#FBBF24',
      background: '#09110E',
      cardBackground: '#111E19',
      surface: '#192B24',
      inputBackground: '#162620',
      textPrimary: '#F8FAFC',
      textSecondary: '#94A3B8',
      textMuted: '#64748B',
      border: '#213930',
      success: '#34D399',
      warning: '#FBBF24',
      danger: '#F87171',
    },
  },
  {
    id: 'crimson_velvet',
    name: 'Hardcover Crimson',
    swatch: '#BE123C',
    light: {
      primary: '#BE123C',
      primaryText: '#FFFFFF',
      primarySoft: '#FFF1F2',
      primaryBorder: '#FECDD3',
      secondary: '#F59E0B',
      background: '#FFFFFF',
      cardBackground: '#FFFFFF',
      surface: '#FAFAFA',
      inputBackground: '#FAFAFA',
      textPrimary: '#171717',
      textSecondary: '#737373',
      textMuted: '#A3A3A3',
      border: '#E5E5E5',
      success: '#10B981',
      warning: '#F59E0B',
      danger: '#EF4444',
    },
    dark: {
      primary: '#FB7185',
      primaryText: '#4C0519',
      primarySoft: 'rgba(251, 113, 133, 0.16)',
      primaryBorder: 'rgba(251, 113, 133, 0.38)',
      secondary: '#FBBF24',
      background: '#130B0E',
      cardBackground: '#1F1317',
      surface: '#2B1B21',
      inputBackground: '#26171C',
      textPrimary: '#FFF1F2',
      textSecondary: '#FDA4AF',
      textMuted: '#9F7880',
      border: '#382229',
      success: '#34D399',
      warning: '#FBBF24',
      danger: '#F87171',
    },
  },
  {
    id: 'sunset_amber',
    name: 'Parchment Amber Gold',
    swatch: '#B45309',
    light: {
      primary: '#B45309',
      primaryText: '#FFFFFF',
      primarySoft: '#FFFBEB',
      primaryBorder: '#FDE68A',
      secondary: '#54408C',
      background: '#FFFFFF',
      cardBackground: '#FFFFFF',
      surface: '#FAFAF9',
      inputBackground: '#FAFAF9',
      textPrimary: '#1C1917',
      textSecondary: '#78716C',
      textMuted: '#A8A29E',
      border: '#E7E5E4',
      success: '#10B981',
      warning: '#F59E0B',
      danger: '#EF4444',
    },
    dark: {
      primary: '#F59E0B',
      primaryText: '#451A03',
      primarySoft: 'rgba(245, 158, 11, 0.16)',
      primaryBorder: 'rgba(245, 158, 11, 0.36)',
      secondary: '#A78BFA',
      background: '#120E0A',
      cardBackground: '#1C1610',
      surface: '#292018',
      inputBackground: '#241C15',
      textPrimary: '#FAFAF9',
      textSecondary: '#D6D3D1',
      textMuted: '#78716C',
      border: '#362B20',
      success: '#34D399',
      warning: '#FBBF24',
      danger: '#F87171',
    },
  },
  {
    id: 'ocean_teal',
    name: 'Aegean Bookshop Teal',
    swatch: '#0F766E',
    light: {
      primary: '#0F766E',
      primaryText: '#FFFFFF',
      primarySoft: '#F0FDFA',
      primaryBorder: '#99F6E4',
      secondary: '#F59E0B',
      background: '#FFFFFF',
      cardBackground: '#FFFFFF',
      surface: '#F8FAFC',
      inputBackground: '#F8FAFC',
      textPrimary: '#0F172A',
      textSecondary: '#64748B',
      textMuted: '#94A3B8',
      border: '#E2E8F0',
      success: '#10B981',
      warning: '#F59E0B',
      danger: '#EF4444',
    },
    dark: {
      primary: '#2DD4BF',
      primaryText: '#042F2E',
      primarySoft: 'rgba(45, 212, 191, 0.16)',
      primaryBorder: 'rgba(45, 212, 191, 0.36)',
      secondary: '#FBBF24',
      background: '#081214',
      cardBackground: '#102024',
      surface: '#172E33',
      inputBackground: '#14282C',
      textPrimary: '#F0FDFA',
      textSecondary: '#99F6E4',
      textMuted: '#5EEAD4',
      border: '#1F3D44',
      success: '#34D399',
      warning: '#FBBF24',
      danger: '#F87171',
    },
  },
  {
    id: 'obsidian_noir',
    name: 'Editorial Ink Monochrome',
    swatch: '#18181B',
    light: {
      primary: '#18181B',
      primaryText: '#FFFFFF',
      primarySoft: '#F4F4F5',
      primaryBorder: '#D4D4D8',
      secondary: '#F59E0B',
      background: '#FFFFFF',
      cardBackground: '#FFFFFF',
      surface: '#FAFAFA',
      inputBackground: '#F4F4F5',
      textPrimary: '#09090B',
      textSecondary: '#71717A',
      textMuted: '#A1A1AA',
      border: '#E4E4E7',
      success: '#10B981',
      warning: '#F59E0B',
      danger: '#EF4444',
    },
    dark: {
      primary: '#FAFAFA',
      primaryText: '#09090B',
      primarySoft: 'rgba(250, 250, 250, 0.14)',
      primaryBorder: 'rgba(250, 250, 250, 0.32)',
      secondary: '#FBBF24',
      background: '#09090B',
      cardBackground: '#121215',
      surface: '#1C1C21',
      inputBackground: '#18181C',
      textPrimary: '#FAFAFA',
      textSecondary: '#A1A1AA',
      textMuted: '#71717A',
      border: '#27272A',
      success: '#34D399',
      warning: '#FBBF24',
      danger: '#F87171',
    },
  },
];

export const BOOK_STORE_FONT_PRESETS: AppFontPreset[] = APP_FONT_PRESETS;

export function resolveBookStoreColorPalette(
  presetId: AppColorPresetId,
  isDark: boolean
): BookStoreColorPalette {
  const found =
    BOOK_STORE_COLOR_PRESETS.find((p) => p.id === presetId) ||
    BOOK_STORE_COLOR_PRESETS[0];
  const modeTokens = isDark ? found.dark : found.light;
  return {
    id: found.id,
    name: found.name,
    swatch: found.swatch,
    ...modeTokens,
  };
}

export function getBookStoreThemeScopeStyle(
  palette: BookStoreColorPalette,
  font: AppFontPreset
): React.CSSProperties {
  return {
    fontFamily: font.cssStack,
    backgroundColor: palette.background,
    color: palette.textPrimary,
    ['--bookstore-font' as any]: font.cssStack,
    ['--bookstore-primary' as any]: palette.primary,
    ['--bookstore-primary-text' as any]: palette.primaryText,
    ['--bookstore-primary-soft' as any]: palette.primarySoft,
    ['--bookstore-primary-border' as any]: palette.primaryBorder,
    ['--bookstore-bg' as any]: palette.background,
    ['--bookstore-card' as any]: palette.cardBackground,
    ['--bookstore-surface' as any]: palette.surface,
    ['--bookstore-text' as any]: palette.textPrimary,
    ['--bookstore-text-sec' as any]: palette.textSecondary,
    ['--bookstore-border' as any]: palette.border,
  };
}

export interface BookItem {
  id: string;
  title: string;
  authorId: string;
  authorName: string;
  vendorId: string;
  vendorName: string;
  vendorLogoText: string;
  vendorColor: string;
  price: number;
  rating: number;
  reviewsCount: number;
  category: 'Novels' | 'Self Love' | 'Science' | 'Romantic' | 'Poems';
  coverImage: string;
  description: string;
  isTopOfWeek?: boolean;
  discountPercent?: number;
}

export interface VendorItem {
  id: string;
  name: string;
  shortTag: string;
  category: 'Books' | 'Poems' | 'Special for you' | 'Stationery';
  rating: number;
  accentColor: string;
  badgeStyle: 'serif' | 'script' | 'bold' | 'mono';
}

export interface AuthorItem {
  id: string;
  name: string;
  role: 'Writer' | 'Novelist' | 'Poets' | 'Playwrights' | 'Journalist';
  shortBio: string;
  about: string;
  rating: number;
  avatar: string;
}

export interface CartItemEntry {
  book: BookItem;
  quantity: number;
}

export interface BookOrderHistoryItem {
  id: string;
  orderNumber: string;
  title: string;
  coverImage: string;
  status: 'On the way' | 'Delivered' | 'Cancelled';
  itemsCount: number;
  totalPrice: number;
  monthGroup: 'Current' | 'October 2021';
}

export interface BookCouponItem {
  id: string;
  discountText: string;
  code: string;
  bgColor: string;
  textColor: string;
}

export const INITIAL_BOOKS: BookItem[] = [
  {
    id: 'kite_runner',
    title: 'The Kite Runner',
    authorId: 'khaled_hosseini',
    authorName: 'Khaled Hosseini',
    vendorId: 'gooday',
    vendorName: 'GooDay',
    vendorLogoText: 'GooDay',
    vendorColor: '#EA580C',
    price: 14.99,
    rating: 4.0,
    reviewsCount: 328,
    category: 'Novels',
    coverImage:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra dignissim ac ac ac. Nibh et sed ac, eget malesuada.',
    isTopOfWeek: true,
    discountPercent: 25,
  },
  {
    id: 'subtle_art',
    title: 'The Subtle Art of Not Giving',
    authorId: 'john_freeman',
    authorName: 'Mark Manson',
    vendorId: 'warehouse',
    vendorName: 'Warehouse Stationery',
    vendorLogoText: 'WS warehouse',
    vendorColor: '#0F172A',
    price: 20.99,
    rating: 4.5,
    reviewsCount: 512,
    category: 'Self Love',
    coverImage:
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80',
    description:
      'A counterintuitive approach to living a good life. Discover what truly matters and let go of everyday noise.',
    isTopOfWeek: true,
  },
  {
    id: 'art_of_war',
    title: 'The Art of War',
    authorId: 'richard_per',
    authorName: 'Sun Tzu',
    vendorId: 'crane',
    vendorName: 'Crane & Co',
    vendorLogoText: 'CRANE & CO.',
    vendorColor: '#334155',
    price: 14.99,
    rating: 4.8,
    reviewsCount: 419,
    category: 'Science',
    coverImage:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    description:
      'Timeless treatise on strategy, leadership, tactical preparation, and philosophical clarity.',
    isTopOfWeek: true,
  },
  {
    id: 'davinci_code',
    title: 'The Da vinci Code',
    authorId: 'tess_gunty',
    authorName: 'Dan Brown',
    vendorId: 'jstor',
    vendorName: 'Jstor',
    vendorLogoText: 'JSTOR',
    vendorColor: '#991B1B',
    price: 19.99,
    rating: 4.3,
    reviewsCount: 640,
    category: 'Novels',
    coverImage:
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80',
    description:
      'An exhilarating puzzle through art history, secret societies, and cryptic symbols hidden inside the Louvre.',
  },
  {
    id: 'carrie_fisher',
    title: 'Carrie Fisher',
    authorId: 'tess_gunty',
    authorName: 'Carrie Fisher',
    vendorId: 'kuromi',
    vendorName: 'Kuromi',
    vendorLogoText: 'Kuromi',
    vendorColor: '#9333EA',
    price: 27.12,
    rating: 4.6,
    reviewsCount: 289,
    category: 'Romantic',
    coverImage:
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80',
    description:
      'Sharp, witty, and deeply candid reflections from Hollywood’s most unforgettable storyteller and icon.',
  },
  {
    id: 'good_sister',
    title: 'The Good Sister',
    authorId: 'tess_gunty',
    authorName: 'Drusilla Campbell',
    vendorId: 'wattpad',
    vendorName: 'Wattpad',
    vendorLogoText: 'wattpad books',
    vendorColor: '#EA580C',
    price: 27.12,
    rating: 4.2,
    reviewsCount: 194,
    category: 'Novels',
    coverImage:
      'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=600&q=80',
    description:
      'A moving portrait of sisterhood, family secrets, and the resilient bonds that hold two lives together.',
  },
  {
    id: 'the_waiting',
    title: 'The Waiting',
    authorId: 'tess_gunty',
    authorName: 'Cathy Marie Hake',
    vendorId: 'haymarket',
    vendorName: 'Haymarket',
    vendorLogoText: 'Haymarket',
    vendorColor: '#0369A1',
    price: 27.12,
    rating: 4.0,
    reviewsCount: 158,
    category: 'Romantic',
    coverImage:
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80',
    description:
      'County Secrets historical romance exploring hope, redemption, and new beginnings in a quiet frontier town.',
  },
  {
    id: 'bright_young',
    title: 'Bright Young Women',
    authorId: 'ann_napolitano',
    authorName: 'Jessica Knoll',
    vendorId: 'peloton',
    vendorName: 'Peloton',
    vendorLogoText: 'PELOTON',
    vendorColor: '#E11D48',
    price: 13.52,
    rating: 4.7,
    reviewsCount: 220,
    category: 'Self Love',
    coverImage:
      'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=600&q=80',
    description:
      'Gripping literary mystery following two women from different coasts who unite to uncover the truth.',
  },
];

export const INITIAL_VENDORS: VendorItem[] = [
  {
    id: 'wattpad',
    name: 'Wattpad',
    shortTag: 'wattpad books',
    category: 'Books',
    rating: 3,
    accentColor: '#EA580C',
    badgeStyle: 'bold',
  },
  {
    id: 'kuromi',
    name: 'Kuromi',
    shortTag: 'KUROMI by Sanrio',
    category: 'Special for you',
    rating: 5,
    accentColor: '#9333EA',
    badgeStyle: 'script',
  },
  {
    id: 'crane',
    name: 'Crane & Co',
    shortTag: 'CRANE & CO.',
    category: 'Stationery',
    rating: 4,
    accentColor: '#334155',
    badgeStyle: 'serif',
  },
  {
    id: 'gooday',
    name: 'GooDay',
    shortTag: 'GooDay',
    category: 'Books',
    rating: 4,
    accentColor: '#EA580C',
    badgeStyle: 'bold',
  },
  {
    id: 'warehouse',
    name: 'Warehouse',
    shortTag: 'WS warehouse',
    category: 'Stationery',
    rating: 3,
    accentColor: '#0F172A',
    badgeStyle: 'mono',
  },
  {
    id: 'peppa_pig',
    name: 'Peppa Pig',
    shortTag: 'Peppa Pig',
    category: 'Special for you',
    rating: 4,
    accentColor: '#2563EB',
    badgeStyle: 'script',
  },
  {
    id: 'jstor',
    name: 'Jstor',
    shortTag: 'JSTOR',
    category: 'Poems',
    rating: 4,
    accentColor: '#991B1B',
    badgeStyle: 'serif',
  },
  {
    id: 'peloton',
    name: 'Peloton',
    shortTag: 'PELOTON',
    category: 'Books',
    rating: 4,
    accentColor: '#E11D48',
    badgeStyle: 'bold',
  },
  {
    id: 'haymarket',
    name: 'Haymarket',
    shortTag: 'H',
    category: 'Poems',
    rating: 4,
    accentColor: '#0369A1',
    badgeStyle: 'bold',
  },
];

export const INITIAL_AUTHORS: AuthorItem[] = [
  {
    id: 'john_freeman',
    name: 'John Freeman',
    role: 'Writer',
    shortBio: 'American writer he was the editor of the',
    about:
      'John Freeman is an acclaimed American writer, literary critic, and former editor of Granta magazine.',
    rating: 4.5,
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'tess_gunty',
    name: 'Tess Gunty',
    role: 'Novelist',
    shortBio: 'Gunty was born and raised in south bend,indiana',
    about:
      'Gunty was born and raised in South Bend, Indiana. She graduated from the University of Notre Dame with a Bachelor of Arts in English and from New York University.',
    rating: 4.0,
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'richard_per',
    name: 'Richard Per',
    role: 'Writer',
    shortBio: 'Contemporary essayist and historical biographer',
    about:
      'Richard Per writes extensively on classical philosophy, literary history, and modern cultural movements.',
    rating: 4.2,
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'adam_dalva',
    name: 'Adam Dalva',
    role: 'Poets',
    shortBio: 'He is the senior fiction editor of guernica ma',
    about:
      'Adam Dalva serves as a senior fiction editor and teaches creative writing and literary arts.',
    rating: 4.4,
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'abraham_verghese',
    name: 'Abraham verghese',
    role: 'Playwrights',
    shortBio: 'He is the professor and Linda R . Meier and',
    about:
      'Abraham Verghese is a physician, author, and Professor for the Theory and Practice of Medicine at Stanford.',
    rating: 4.9,
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'ann_napolitano',
    name: 'Ann Napolitano',
    role: 'Novelist',
    shortBio: 'She is the author of the novels A Good Hard',
    about:
      'Ann Napolitano is the bestselling author of Hello Beautiful and Dear Edward.',
    rating: 4.7,
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'hernan_diaz',
    name: 'Hernan Diaz',
    role: 'Journalist',
    shortBio: 'Pulitzer Prize winning author of Trust and In the Distance',
    about:
      'Hernan Diaz is an Argentine-American novelist and associate director of the Hispanic Institute at Columbia University.',
    rating: 4.8,
    avatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
  },
];

export const INITIAL_COUPONS: BookCouponItem[] = [
  {
    id: 'c1',
    discountText: '50%\nOFF',
    code: 'BAZAR50',
    bgColor: '#54408C',
    textColor: '#54408C',
  },
  {
    id: 'c2',
    discountText: '23%\nOFF',
    code: 'READ23',
    bgColor: '#F59E0B',
    textColor: '#D97706',
  },
  {
    id: 'c3',
    discountText: '50%\nOFF',
    code: 'CHAPTER50',
    bgColor: '#3B82F6',
    textColor: '#2563EB',
  },
  {
    id: 'c4',
    discountText: '23%\nOFF',
    code: 'NOVEL23',
    bgColor: '#F97316',
    textColor: '#EA580C',
  },
  {
    id: 'c5',
    discountText: '50%\nOFF',
    code: 'VIPBOOK50',
    bgColor: '#121212',
    textColor: '#121212',
  },
  {
    id: 'c6',
    discountText: '23%\nOFF',
    code: 'SPRING23',
    bgColor: '#22C55E',
    textColor: '#16A34A',
  },
];

export const INITIAL_ORDER_HISTORY: BookOrderHistoryItem[] = [
  {
    id: 'ord_curr_1',
    orderNumber: '#2930541',
    title: 'Carrie Fisher',
    coverImage:
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=300&q=80',
    status: 'On the way',
    itemsCount: 1,
    totalPrice: 19.99,
    monthGroup: 'Current',
  },
  {
    id: 'ord_oct_1',
    orderNumber: '#2930498',
    title: 'The Da vinci Code',
    coverImage:
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=300&q=80',
    status: 'Delivered',
    itemsCount: 1,
    totalPrice: 39.99,
    monthGroup: 'October 2021',
  },
  {
    id: 'ord_oct_2',
    orderNumber: '#2930412',
    title: 'Carrie Fisher',
    coverImage:
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=300&q=80',
    status: 'Delivered',
    itemsCount: 5,
    totalPrice: 87.1,
    monthGroup: 'October 2021',
  },
  {
    id: 'ord_oct_3',
    orderNumber: '#2930380',
    title: 'The Waiting',
    coverImage:
      'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=300&q=80',
    status: 'Cancelled',
    itemsCount: 2,
    totalPrice: 27.12,
    monthGroup: 'October 2021',
  },
];

export interface BookStoreDesignSystemContextValue {
  isDark: boolean;
  toggleTheme: () => void;
  colorPresetId: AppColorPresetId;
  setColorPresetId: (id: AppColorPresetId) => void;
  palette: BookStoreColorPalette;
  fontPresetId: AppFontPresetId;
  setFontPresetId: (id: AppFontPresetId) => void;
  activeFont: AppFontPreset;
  bottomNavVariant: BookStoreBottomNavVariantId;
  setBottomNavVariant: (id: BookStoreBottomNavVariantId) => void;
  isBottomNavSwipeable: boolean;
  setIsBottomNavSwipeable: (swipeable: boolean) => void;
  books: BookItem[];
  vendors: VendorItem[];
  authors: AuthorItem[];
  selectedBook: BookItem;
  setSelectedBook: (book: BookItem) => void;
  selectedAuthor: AuthorItem;
  setSelectedAuthor: (author: AuthorItem) => void;
  favoriteBookIds: string[];
  toggleFavoriteBook: (bookId: string) => void;
  cartItems: CartItemEntry[];
  addToCart: (book: BookItem, qty?: number) => void;
  updateCartQty: (bookId: string, delta: number) => void;
  clearCart: () => void;
  restoreDemoCart: () => void;
  userProfile: {
    name: string;
    email: string;
    phone: string;
    password: string;
    avatar: string;
  };
  setUserProfile: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      phone: string;
      password: string;
      avatar: string;
    }>
  >;
  deliveryAddress: {
    streetTitle: string;
    fullAddress: string;
    tag: 'Home' | 'Offices';
    governorate: string;
    city: string;
    block: string;
    building: string;
    floor: string;
    flat: string;
    avenue: string;
  };
  setDeliveryAddress: React.Dispatch<
    React.SetStateAction<{
      streetTitle: string;
      fullAddress: string;
      tag: 'Home' | 'Offices';
      governorate: string;
      city: string;
      block: string;
      building: string;
      floor: string;
      flat: string;
      avenue: string;
    }>
  >;
  selectedPaymentMethod: 'KNET' | 'Credit Card';
  setSelectedPaymentMethod: (m: 'KNET' | 'Credit Card') => void;
  selectedDeliveryDate: string;
  setSelectedDeliveryDate: (d: string) => void;
  selectedDeliveryTime: string;
  setSelectedDeliveryTime: (t: string) => void;
  orders: BookOrderHistoryItem[];
  coupons: BookCouponItem[];
  recentSearches: string[];
  addRecentSearch: (q: string) => void;
}

export const BookStoreDesignSystemContext =
  createContext<BookStoreDesignSystemContextValue | null>(null);

export function useBookStoreDesignSystem(): BookStoreDesignSystemContextValue {
  const ctx = useContext(BookStoreDesignSystemContext);
  if (!ctx) {
    const fallbackPalette = resolveBookStoreColorPalette('royal_violet', false);
    return {
      isDark: false,
      toggleTheme: () => {},
      colorPresetId: 'royal_violet',
      setColorPresetId: () => {},
      palette: fallbackPalette,
      fontPresetId: 'jakarta',
      setFontPresetId: () => {},
      activeFont: BOOK_STORE_FONT_PRESETS[0],
      bottomNavVariant: 'varient_1',
      setBottomNavVariant: () => {},
      isBottomNavSwipeable: true,
      setIsBottomNavSwipeable: () => {},
      books: INITIAL_BOOKS,
      vendors: INITIAL_VENDORS,
      authors: INITIAL_AUTHORS,
      selectedBook: INITIAL_BOOKS[0],
      setSelectedBook: () => {},
      selectedAuthor: INITIAL_AUTHORS[1],
      setSelectedAuthor: () => {},
      favoriteBookIds: ['carrie_fisher', 'the_waiting', 'bright_young', 'kite_runner'],
      toggleFavoriteBook: () => {},
      cartItems: [
        { book: INITIAL_BOOKS[4], quantity: 1 },
        { book: INITIAL_BOOKS[3], quantity: 2 },
        { book: INITIAL_BOOKS[5], quantity: 1 },
      ],
      addToCart: () => {},
      updateCartQty: () => {},
      clearCart: () => {},
      restoreDemoCart: () => {},
      userProfile: {
        name: 'John Doe',
        email: 'Johndoe@email.com',
        phone: '(+1) 234 567 890',
        password: 'password123',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      },
      setUserProfile: () => {},
      deliveryAddress: {
        streetTitle: 'Utama Street No.20',
        fullAddress: 'Dumbo Street No.20, Dumbo, New York 10001, United States',
        tag: 'Home',
        governorate: 'New York',
        city: 'Brooklyn',
        block: 'Block 4',
        building: 'Utama Tower 20',
        floor: '3rd Floor',
        flat: 'Flat 3B',
        avenue: 'Dumbo Avenue',
      },
      setDeliveryAddress: () => {},
      selectedPaymentMethod: 'KNET',
      setSelectedPaymentMethod: () => {},
      selectedDeliveryDate: 'Today 12 Jan',
      setSelectedDeliveryDate: () => {},
      selectedDeliveryTime: 'Between 10PM : 11PM',
      setSelectedDeliveryTime: () => {},
      orders: INITIAL_ORDER_HISTORY,
      coupons: INITIAL_COUPONS,
      recentSearches: ['The Good Sister', 'Carries Fisher'],
      addRecentSearch: () => {},
    };
  }
  return ctx;
}
