import React, { createContext, useContext } from 'react';
import {
  APP_FONT_PRESETS,
  AppColorPresetId,
  AppFontPreset,
  AppFontPresetId,
} from '../../cloth_shop_frontend/styles/theme';

export type VpnBottomNavVariantId =
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

export interface VpnBottomNavVariantOption {
  id: VpnBottomNavVariantId;
  name: string;
  tagline: string;
}

export const VPN_BOTTOM_NAV_VARIANTS: VpnBottomNavVariantOption[] = [
  {
    id: 'varient_1',
    name: 'V1 • CyberShield Tactical Bar',
    tagline: 'Default 5-Tab Shield • Servers • Speed • Tools • Account',
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
    name: 'V4 • Center Speed FAB Notch',
    tagline: 'Curved Dock with Elevated Center Speed Probe Action',
  },
  {
    id: 'varient_5',
    name: 'V5 • Top Neon Indicator',
    tagline: 'Minimalist Cyber Bar with Top Accent Line & Glow',
  },
  {
    id: 'varient_6',
    name: 'V6 • Solid Brand Luxe Dock',
    tagline: 'Rich Brand-Colored Floating Dock with Crisp Active Pill',
  },
  {
    id: 'varient_7',
    name: 'V7 • Segmented Bento Grid',
    tagline: '5-Tile Soft Tinted Bento Dock with Active Frame',
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

export interface VpnColorPalette {
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

export interface VpnColorPresetConfig {
  id: AppColorPresetId;
  name: string;
  tagline: string;
  swatch: string;
  light: Omit<VpnColorPalette, 'id' | 'name' | 'tagline' | 'swatch'>;
  dark: Omit<VpnColorPalette, 'id' | 'name' | 'tagline' | 'swatch'>;
}

export const VPN_COLOR_PRESETS: VpnColorPresetConfig[] = [
  {
    id: 'ocean_teal',
    name: 'Cyber Cyan',
    tagline: 'Default CyberShield Neon Cyan & Obsidian',
    swatch: '#00E5FF',
    light: {
      primary: '#00B8D4',
      primaryHover: '#0097A7',
      primaryText: '#FFFFFF',
      primarySoft: '#E0F7FA',
      primaryBorder: '#80DEEA',
      background: '#F4FAFC',
      cardBackground: '#FFFFFF',
      surface: '#EAF6F9',
      surfaceElevated: '#FFFFFF',
      border: '#CFE8EE',
      textPrimary: '#0B1721',
      textSecondary: '#3E5C76',
      textMuted: '#648296',
    },
    dark: {
      primary: '#00E5FF',
      primaryHover: '#26E9FF',
      primaryText: '#071118',
      primarySoft: 'rgba(0, 229, 255, 0.14)',
      primaryBorder: 'rgba(0, 229, 255, 0.35)',
      background: '#0B0F17',
      cardBackground: '#131924',
      surface: '#18202E',
      surfaceElevated: '#1D2738',
      border: '#232D3F',
      textPrimary: '#F8FAFC',
      textSecondary: '#94A3B8',
      textMuted: '#64748B',
    },
  },
  {
    id: 'emerald_luxe',
    name: 'Stealth Emerald',
    tagline: 'Encrypted Matrix Green & Deep Slate',
    swatch: '#10B981',
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
      primary: '#10B981',
      primaryHover: '#34D399',
      primaryText: '#05150F',
      primarySoft: 'rgba(16, 185, 129, 0.15)',
      primaryBorder: 'rgba(16, 185, 129, 0.35)',
      background: '#08110E',
      cardBackground: '#101D18',
      surface: '#152720',
      surfaceElevated: '#1B3129',
      border: '#213B31',
      textPrimary: '#ECFDF5',
      textSecondary: '#94A3B8',
      textMuted: '#64748B',
    },
  },
  {
    id: 'royal_indigo',
    name: 'Quantum Indigo',
    tagline: 'Zero-Trust Sapphire & Deep Armor',
    swatch: '#6366F1',
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
      primarySoft: 'rgba(99, 102, 241, 0.16)',
      primaryBorder: 'rgba(99, 102, 241, 0.36)',
      background: '#0A0D18',
      cardBackground: '#131728',
      surface: '#1A1F35',
      surfaceElevated: '#212742',
      border: '#272F4E',
      textPrimary: '#F5F7FF',
      textSecondary: '#94A3B8',
      textMuted: '#64748B',
    },
  },
  {
    id: 'violet_velvet',
    name: 'Phantom Violet',
    tagline: 'Darknet Amethyst & Neon Ultraviolet',
    swatch: '#8B5CF6',
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
      primary: '#A855F7',
      primaryHover: '#C084FC',
      primaryText: '#FFFFFF',
      primarySoft: 'rgba(168, 85, 247, 0.16)',
      primaryBorder: 'rgba(168, 85, 247, 0.36)',
      background: '#0D0917',
      cardBackground: '#161126',
      surface: '#1F1735',
      surfaceElevated: '#271E42',
      border: '#312552',
      textPrimary: '#F5F3FF',
      textSecondary: '#A1A1AA',
      textMuted: '#71717A',
    },
  },
  {
    id: 'rose_couture',
    name: 'Red Team Crimson',
    tagline: 'Tactical Laser Crimson & Carbon',
    swatch: '#F43F5E',
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
      primarySoft: 'rgba(244, 63, 94, 0.16)',
      primaryBorder: 'rgba(244, 63, 94, 0.36)',
      background: '#11090D',
      cardBackground: '#1C1016',
      surface: '#26151E',
      surfaceElevated: '#301B26',
      border: '#3B2230',
      textPrimary: '#FFF1F2',
      textSecondary: '#A1A1AA',
      textMuted: '#71717A',
    },
  },
  {
    id: 'amber_gold',
    name: 'Solar Firewall',
    tagline: 'High-Voltage Amber & Titanium',
    swatch: '#F59E0B',
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
      primary: '#F59E0B',
      primaryHover: '#FBBF24',
      primaryText: '#0F0A02',
      primarySoft: 'rgba(245, 158, 11, 0.16)',
      primaryBorder: 'rgba(245, 158, 11, 0.36)',
      background: '#110E08',
      cardBackground: '#1C170E',
      surface: '#261F13',
      surfaceElevated: '#302718',
      border: '#3B301E',
      textPrimary: '#FFFBEB',
      textSecondary: '#A1A1AA',
      textMuted: '#71717A',
    },
  },
  {
    id: 'obsidian',
    name: 'Obsidian Monochrome',
    tagline: 'Pure Stealth Carbon & Titanium',
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
      textSecondary: '#666666',
      textMuted: '#999999',
    },
    dark: {
      primary: '#38BDF8',
      primaryHover: '#7DD3FC',
      primaryText: '#08121A',
      primarySoft: 'rgba(56, 189, 248, 0.15)',
      primaryBorder: 'rgba(56, 189, 248, 0.35)',
      background: '#0B0F17',
      cardBackground: '#131924',
      surface: '#18202E',
      surfaceElevated: '#1D2738',
      border: '#232D3F',
      textPrimary: '#F8FAFC',
      textSecondary: '#94A3B8',
      textMuted: '#64748B',
    },
  },
];

export const VPN_FONT_PRESETS: AppFontPreset[] = APP_FONT_PRESETS;

export function resolveVpnColorPalette(
  presetId: AppColorPresetId,
  isDark: boolean
): VpnColorPalette {
  const found =
    VPN_COLOR_PRESETS.find((p) => p.id === presetId) || VPN_COLOR_PRESETS[0];
  const modeTokens = isDark ? found.dark : found.light;
  return {
    id: found.id,
    name: found.name,
    tagline: found.tagline,
    swatch: found.swatch,
    ...modeTokens,
  };
}

export interface VpnServerNode {
  id: string;
  country: string;
  city: string;
  nodeNumber: string;
  datacenter: string;
  flag: string;
  pingMs: number;
  loadPercent: number;
  bandwidth: string;
  protocol: string;
  virtualIp: string;
  asn: string;
  coordinates: string;
  badge: string;
  category: 'recommended' | 'streaming' | 'p2p';
  isFavorite?: boolean;
  subNodes?: Array<{
    id: string;
    title: string;
    subtitle: string;
    pingMs: number;
  }>;
}

export const INITIAL_VPN_SERVERS: VpnServerNode[] = [
  {
    id: 'ch_zurich_04',
    country: 'Switzerland',
    city: 'Zurich',
    nodeNumber: '#04',
    datacenter: 'Zurich Datacenter • Equinix ZH4',
    flag: '🇨🇭',
    pingMs: 18,
    loadPercent: 34,
    bandwidth: '10 Gbps P2P',
    protocol: 'WireGuard • RAM-Only',
    virtualIp: '185.220.101.5',
    asn: 'AS13030',
    coordinates: '47.3769° N, 8.5417° E',
    badge: '2 Cities',
    category: 'recommended',
    isFavorite: true,
    subNodes: [
      {
        id: 'ch_zurich_04',
        title: 'Zurich #04 (Ultra-Low)',
        subtitle: 'WireGuard • RAM-Only',
        pingMs: 17,
      },
      {
        id: 'ch_geneva_02',
        title: 'Geneva #02 (Secure Core)',
        subtitle: 'Multi-hop Ready',
        pingMs: 21,
      },
    ],
  },
  {
    id: 'de_frankfurt_12',
    country: 'Germany',
    city: 'Frankfurt',
    nodeNumber: '#12',
    datacenter: 'Frankfurt Core • DE-CIX',
    flag: '🇩🇪',
    pingMs: 12,
    loadPercent: 22,
    bandwidth: '10 Gbps WireGuard',
    protocol: 'SEC-AES-256',
    virtualIp: '194.36.110.42',
    asn: 'AS24940',
    coordinates: '50.1109° N, 8.6821° E',
    badge: 'Fastest Route',
    category: 'recommended',
    isFavorite: false,
    subNodes: [
      {
        id: 'de_frankfurt_12',
        title: 'Frankfurt #12 (DE-CIX)',
        subtitle: '10 Gbps WireGuard',
        pingMs: 12,
      },
    ],
  },
  {
    id: 'gb_london_02',
    country: 'United Kingdom',
    city: 'London',
    nodeNumber: '#02',
    datacenter: 'London Docklands • Telehouse',
    flag: '🇬🇧',
    pingMs: 24,
    loadPercent: 48,
    bandwidth: '10 Gbps Streaming',
    protocol: 'WireGuard • BBC Ready',
    virtualIp: '212.102.63.18',
    asn: 'AS9009',
    coordinates: '51.5072° N, 0.1276° W',
    badge: 'BBC Ready',
    category: 'streaming',
    isFavorite: false,
    subNodes: [
      {
        id: 'gb_london_02',
        title: 'London #02 (Docklands)',
        subtitle: 'Streaming Ultra HD',
        pingMs: 24,
      },
    ],
  },
  {
    id: 'us_newyork_08',
    country: 'United States',
    city: 'New York',
    nodeNumber: '#08',
    datacenter: 'New York Metro • 60 Hudson',
    flag: '🇺🇸',
    pingMs: 68,
    loadPercent: 58,
    bandwidth: '10 Gbps Multi-Hub',
    protocol: 'WireGuard • 32 Hubs',
    virtualIp: '104.244.72.115',
    asn: 'AS396982',
    coordinates: '40.7128° N, 74.0060° W',
    badge: '32 Hubs',
    category: 'streaming',
    isFavorite: false,
    subNodes: [
      {
        id: 'us_newyork_08',
        title: 'New York #08 (Manhattan)',
        subtitle: 'Low-Jitter Streaming',
        pingMs: 68,
      },
    ],
  },
  {
    id: 'sg_singapore_01',
    country: 'Singapore',
    city: 'Singapore',
    nodeNumber: '#01',
    datacenter: 'Singapore Jurong • Equinix SG1',
    flag: '🇸🇬',
    pingMs: 110,
    loadPercent: 32,
    bandwidth: '10 Gbps Direct',
    protocol: 'WireGuard • Direct Peering',
    virtualIp: '103.253.41.98',
    asn: 'AS132203',
    coordinates: '1.3521° N, 103.8198° E',
    badge: 'Direct Peering',
    category: 'p2p',
    isFavorite: false,
    subNodes: [
      {
        id: 'sg_singapore_01',
        title: 'Singapore #01 (APAC Core)',
        subtitle: 'Direct Fiber Peering',
        pingMs: 110,
      },
    ],
  },
  {
    id: 'jp_tokyo_05',
    country: 'Japan',
    city: 'Tokyo',
    nodeNumber: '#05',
    datacenter: 'Tokyo Shinagawa • TY2',
    flag: '🇯🇵',
    pingMs: 145,
    loadPercent: 41,
    bandwidth: '10 Gbps Streaming',
    protocol: 'WireGuard • Netflix JP Opt',
    virtualIp: '45.32.28.190',
    asn: 'AS20473',
    coordinates: '35.6762° N, 139.6503° E',
    badge: 'Netflix JP Opt',
    category: 'streaming',
    isFavorite: false,
    subNodes: [
      {
        id: 'jp_tokyo_05',
        title: 'Tokyo #05 (Shinagawa)',
        subtitle: 'Netflix JP Optimized',
        pingMs: 145,
      },
    ],
  },
];

export interface VpnDesignSystemContextValue {
  isDark: boolean;
  toggleTheme: () => void;
  colorPresetId: AppColorPresetId;
  setColorPresetId: (id: AppColorPresetId) => void;
  palette: VpnColorPalette;
  fontPresetId: AppFontPresetId;
  setFontPresetId: (id: AppFontPresetId) => void;
  activeFont: AppFontPreset;
  bottomNavVariant: VpnBottomNavVariantId;
  setBottomNavVariant: (id: VpnBottomNavVariantId) => void;
  // Shared live VPN state across all 5 screens
  isConnected: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  sessionSeconds: number;
  selectedServer: VpnServerNode;
  setSelectedServer: (node: VpnServerNode) => void;
  servers: VpnServerNode[];
  toggleFavoriteServer: (id: string) => void;
  killSwitch: boolean;
  setKillSwitch: React.Dispatch<React.SetStateAction<boolean>>;
  cyberShieldAdblock: boolean;
  setCyberShieldAdblock: React.Dispatch<React.SetStateAction<boolean>>;
  autoArmorWifi: boolean;
  setAutoArmorWifi: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultPalette = resolveVpnColorPalette('ocean_teal', true);

export const VpnDesignSystemContext =
  createContext<VpnDesignSystemContextValue>({
    isDark: true,
    toggleTheme: () => {},
    colorPresetId: 'ocean_teal',
    setColorPresetId: () => {},
    palette: defaultPalette,
    fontPresetId: 'jakarta',
    setFontPresetId: () => {},
    activeFont: VPN_FONT_PRESETS[0],
    bottomNavVariant: 'varient_1',
    setBottomNavVariant: () => {},
    isConnected: true,
    setIsConnected: () => {},
    sessionSeconds: 9915,
    selectedServer: INITIAL_VPN_SERVERS[0],
    setSelectedServer: () => {},
    servers: INITIAL_VPN_SERVERS,
    toggleFavoriteServer: () => {},
    killSwitch: true,
    setKillSwitch: () => {},
    cyberShieldAdblock: true,
    setCyberShieldAdblock: () => {},
    autoArmorWifi: true,
    setAutoArmorWifi: () => {},
  });

export function useVpnDesignSystem(): VpnDesignSystemContextValue {
  return useContext(VpnDesignSystemContext);
}

export function formatVpnUptime(totalSeconds: number): string {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return [hrs, mins, secs].map((n) => String(n).padStart(2, '0')).join(':');
}

export function getVpnThemeScopeStyle(
  palette: VpnColorPalette,
  activeFont: AppFontPreset
): React.CSSProperties {
  return {
    fontFamily: activeFont.cssStack,
    backgroundColor: palette.background,
    color: palette.textPrimary,
    ['--vpn-primary' as string]: palette.primary,
    ['--vpn-primary-hover' as string]: palette.primaryHover,
    ['--vpn-primary-text' as string]: palette.primaryText,
    ['--vpn-primary-soft' as string]: palette.primarySoft,
    ['--vpn-primary-border' as string]: palette.primaryBorder,
    ['--vpn-bg' as string]: palette.background,
    ['--vpn-card' as string]: palette.cardBackground,
    ['--vpn-surface' as string]: palette.surface,
    ['--vpn-border' as string]: palette.border,
    ['--vpn-text' as string]: palette.textPrimary,
    ['--vpn-text-secondary' as string]: palette.textSecondary,
    ['--vpn-text-muted' as string]: palette.textMuted,
    ['--vpn-font' as string]: activeFont.cssStack,
  };
}
