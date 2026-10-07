import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutGrid,
  FolderTree,
  Search,
  X,
  Eye,
  Check,
  CheckCircle2,
  Smartphone,
  Download,
  FolderGit2,
  ImagePlus,
  Trash2,
  Sun,
  Moon,
  Palette,
  Type,
  Layers,
  Shield,
  Settings,
  SlidersHorizontal,
} from 'lucide-react';
import StudioDashboardShell, { StudioTab } from '../components/StudioDashboardShell';
import VisualNavigationLinkBuilder, {
  LinkableScreenItem,
  buildDefaultNavigationConnections,
} from '../components/VisualNavigationLinkBuilder';
import { ScreenNavigationConnection } from '../utils/customProjectsStore';
import {
  AppColorPresetId,
  AppFontPresetId,
} from '../cloth_shop_frontend/styles/theme';
import {
  INITIAL_VPN_SERVERS,
  VPN_BOTTOM_NAV_VARIANTS,
  VPN_COLOR_PRESETS,
  VPN_FONT_PRESETS,
  VpnBottomNavVariantId,
  VpnDesignSystemContext,
  VpnServerNode,
  getVpnThemeScopeStyle,
  resolveVpnColorPalette,
} from './styles/vpnDesignSystem';
import VpnBottomNavBar, { VpnRootTabId } from './components/VpnBottomNavBar';

import ShieldVarient1 from './screens/Shield/varient_1';
import ServersVarient1 from './screens/Servers/varient_1';
import SpeedVarient1 from './screens/Speed/varient_1';
import ToolsVarient1 from './screens/Tools/varient_1';
import AccountVarient1 from './screens/Account/varient_1';
import ProtocolEngineVarient1 from './screens/ProtocolEngine/varient_1';
import SplitTunnelingVarient1 from './screens/SplitTunneling/varient_1';
import ThreatMonitorVarient1 from './screens/ThreatMonitor/varient_1';

export interface SuperVpnAppProps {
  onSwitchProject?: (projectId: string) => void;
}

export type SuperVpnScreenId =
  | 'Shield'
  | 'Servers'
  | 'Speed'
  | 'Tools'
  | 'Account'
  | 'ProtocolEngine'
  | 'SplitTunneling'
  | 'ThreatMonitor';

export type SuperVpnVariantId =
  | 'varient_1'
  | 'varient_2'
  | 'varient_3'
  | 'varient_4'
  | 'varient_5';

export const ALL_VPN_VARIANT_IDS: SuperVpnVariantId[] = [
  'varient_1',
  'varient_2',
  'varient_3',
  'varient_4',
  'varient_5',
];

interface SuperVpnScreenConfig {
  id: SuperVpnScreenId;
  label: string;
  headerTitle: string;
  headerSubtitle: string;
  hasCustomSubHeader?: boolean;
  parentTab: VpnRootTabId;
  category: string;
  filePath: string;
  description: string;
  variants: {
    varient_1: string;
    varient_2: string;
    varient_3: string;
    varient_4: string;
    varient_5: string;
  };
}

export const VPN_FLOW_GROUPS = [
  'All',
  'Tunnel & Shield',
  'Global Server Network',
  'Speed & Telemetry',
  'Cyber Defense & Tools',
  'Account & Fleet',
] as const;

export const SUPER_VPN_SCREENS: SuperVpnScreenConfig[] = [
  {
    id: 'Shield',
    label: 'Shield',
    headerTitle: 'CyberShield',
    headerSubtitle: 'QUANTUM VPN v4.2',
    parentTab: 'Shield',
    category: 'Tunnel & Shield',
    filePath: 'src/screens/Shield',
    description:
      'Main 1-tap encrypted tunnel connect screen with WireGuard ChaCha20-Poly1305 status, live session uptime timer, 4-column DOWN/UP/PING/LOAD strip, Connected Server Node card, IP Cloaking Matrix, Tactical Defense Modules, and Geolocation Node Map.',
    variants: {
      varient_1: 'V1: CyberShield Orb Hub',
      varient_2: 'V2: Tactical Command Deck',
      varient_3: 'V3: Brutalist Cyber Frame',
      varient_4: 'V4: Solid Brand Luxe Hero',
      varient_5: 'V5: 2-Col Bento Shield',
    },
  },
  {
    id: 'Servers',
    label: 'Servers',
    headerTitle: 'Global Network',
    headerSubtitle: '88 COUNTRIES • 3,420 RAM NODES',
    parentTab: 'Servers',
    category: 'Global Server Network',
    filePath: 'src/screens/Servers',
    description:
      'Global server directory with search, All Locations (114) / Recommended / Streaming filter pills, Optimal Node Detected hero card (Frankfurt 12ms), and expandable country accordions with city sub-nodes.',
    variants: {
      varient_1: 'V1: Global Nodes Accordion',
      varient_2: 'V2: 2-Col Node Bento Grid',
      varient_3: 'V3: High-Density Ledger',
      varient_4: 'V4: Accent Rail Nodes',
      varient_5: 'V5: Brutalist Node Tiles',
    },
  },
  {
    id: 'Speed',
    label: 'Speed',
    headerTitle: 'CyberShield',
    headerSubtitle: 'NET TELEMETRY v4.8',
    parentTab: 'Speed',
    category: 'Speed & Telemetry',
    filePath: 'src/screens/Speed',
    description:
      'Real-time traffic telemetry with 60m DL/UL dual wave chart, Total Data Today (4.82 GB), Connection Quality (19ms Optimal), Target Server Probe with Live Speed Test runner, Cyber Threat Interceptor, and Session Stability ledger.',
    variants: {
      varient_1: 'V1: Dual Wave Telemetry',
      varient_2: 'V2: 3-Col Digital Gauge',
      varient_3: 'V3: Brutalist Benchmark',
      varient_4: 'V4: Brand Luxe Throughput',
      varient_5: 'V5: Accent Rail Telemetry',
    },
  },
  {
    id: 'Tools',
    label: 'Tools',
    headerTitle: 'Defense Tools',
    headerSubtitle: 'ZERO-TRUST ARMOR SUITE',
    parentTab: 'Tools',
    category: 'Cyber Defense & Tools',
    filePath: 'src/screens/Tools',
    description:
      'Tactical defense control center featuring WireGuard/OpenVPN/IKEv2 protocol selector, System Kill Switch, Multi-Hop Double VPN, CyberShield DNS Blocker, Stealth DPI Obfuscation, and Split Tunneling App Routing.',
    variants: {
      varient_1: 'V1: Tactical Defense Suite',
      varient_2: 'V2: 2-Col Readiness Grid',
      varient_3: 'V3: Brutalist Command',
      varient_4: 'V4: Brand Luxe Armor',
      varient_5: 'V5: Accent Rail Shields',
    },
  },
  {
    id: 'Account',
    label: 'Account',
    headerTitle: 'Preferences',
    headerSubtitle: 'PREFERENCES & SECURITY',
    parentTab: 'Account',
    category: 'Account & Fleet',
    filePath: 'src/screens/Account',
    description:
      'Preferences & Security panel featuring Theme Mode (Cyber Obsidian Dark / Daylight Shield Light), Language selector, Alert Preferences, and Zero-Logs Independent Audit certification.',
    variants: {
      varient_1: 'V1: Preferences Ledger',
      varient_2: 'V2: 2×2 Bento Security',
      varient_3: 'V3: Brutalist Security',
      varient_4: 'V4: Accent Rail Prefs',
      varient_5: 'V5: Soft Capsule Prefs',
    },
  },
  {
    id: 'ProtocolEngine',
    label: 'ProtocolEngine',
    headerTitle: 'Protocol Engine',
    headerSubtitle: 'CRYPTOGRAPHIC TUNNEL KERNEL',
    hasCustomSubHeader: true,
    parentTab: 'Tools',
    category: 'Cyber Defense & Tools',
    filePath: 'src/screens/ProtocolEngine',
    description:
      'WireGuard v3 / OpenVPN UDP / OpenVPN TCP Stealth / IKEv2 cipher configurator with UDP/TLS socket port selector, MTU packet frame tuner, Ephemeral Curve25519 key rotation, and Post-Quantum Kyber-1024 toggle.',
    variants: {
      varient_1: 'V1: Cipher Kernel Cards',
      varient_2: 'V2: 2-Col Protocol Grid',
      varient_3: 'V3: Brutalist Kernel',
      varient_4: 'V4: Accent Rail Ciphers',
      varient_5: 'V5: Tinted Kernel Suite',
    },
  },
  {
    id: 'SplitTunneling',
    label: 'SplitTunneling',
    headerTitle: 'Split Tunneling',
    headerSubtitle: 'PER-APP ROUTING MATRIX',
    hasCustomSubHeader: true,
    parentTab: 'Tools',
    category: 'Cyber Defense & Tools',
    filePath: 'src/screens/SplitTunneling',
    description:
      'Per-application routing matrix allowing granular bypass or forced VPN encapsulation for FinTech Banking, 4K Streaming, Cloud Gaming, Signal Messenger, and Privacy Browsers.',
    variants: {
      varient_1: 'V1: App Routing List',
      varient_2: 'V2: 2-Col App Matrix',
      varient_3: 'V3: Brutalist App Rules',
      varient_4: 'V4: Accent Rail Routing',
      varient_5: 'V5: Soft Tinted Rules',
    },
  },
  {
    id: 'ThreatMonitor',
    label: 'ThreatMonitor',
    headerTitle: 'Threat Radar',
    headerSubtitle: 'DNS SINKHOLE & LEAK AUDIT',
    hasCustomSubHeader: true,
    parentTab: 'Speed',
    category: 'Speed & Telemetry',
    filePath: 'src/screens/ThreatMonitor',
    description:
      'Real-time CyberShield DNS Sinkhole stream showing blocked cross-site trackers, quarantined malware hosts, and DoH / WebRTC / IPv6 leak certification.',
    variants: {
      varient_1: 'V1: Live DNS Sinkhole',
      varient_2: 'V2: 2-Col Threat Grid',
      varient_3: 'V3: Brutalist Threat Log',
      varient_4: 'V4: Accent Rail Radar',
      varient_5: 'V5: Elevated Audit Cards',
    },
  },
];

const INITIAL_SELECTED_VARIANTS: Record<SuperVpnScreenId, SuperVpnVariantId> = {
  Shield: 'varient_1',
  Servers: 'varient_1',
  Speed: 'varient_1',
  Tools: 'varient_1',
  Account: 'varient_1',
  ProtocolEngine: 'varient_1',
  SplitTunneling: 'varient_1',
  ThreatMonitor: 'varient_1',
};

export const SuperVpnApp: React.FC<SuperVpnAppProps> = ({ onSwitchProject }) => {
  const [activeStudioTab, setActiveStudioTab] = useState<StudioTab>('screens');
  const [screensViewMode, setScreensViewMode] = useState<'grid' | 'hierarchy'>('grid');
  const [selectedFlowGroup, setSelectedFlowGroup] = useState<string>('All');
  const [currentScreen, setCurrentScreen] = useState<SuperVpnScreenId>('Shield');
  const [selectedVariants, setSelectedVariants] = useState<
    Record<SuperVpnScreenId, SuperVpnVariantId>
  >(INITIAL_SELECTED_VARIANTS);
  const [screenSearchQuery, setScreenSearchQuery] = useState('');
  const [fontSearchQuery, setFontSearchQuery] = useState('');

  // Default to Dark Mode & Cyber Cyan to match the Super VPN design
  const [isDark, setIsDark] = useState(true);
  const [isSkeletonActive, setIsSkeletonActive] = useState(false);
  const [selectedColorId, setSelectedColorId] =
    useState<AppColorPresetId>('ocean_teal');
  const [selectedFontId, setSelectedFontId] =
    useState<AppFontPresetId>('jakarta');
  const [bottomNavVariant, setBottomNavVariant] =
    useState<VpnBottomNavVariantId>('varient_1');
  const [simToast, setSimToast] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState(false);
  const [apkBuildState, setApkBuildState] = useState<
    'idle' | 'building' | 'ready'
  >('idle');
  const [apkDownloadUrl, setApkDownloadUrl] = useState<string | null>(null);
  const logoFileInputRef = useRef<HTMLInputElement | null>(null);

  // Shared live interactive VPN state across all screens
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [sessionSeconds, setSessionSeconds] = useState<number>(9915); // 02:45:15
  const [servers, setServers] = useState<VpnServerNode[]>(INITIAL_VPN_SERVERS);
  const [selectedServer, setSelectedServer] = useState<VpnServerNode>(
    INITIAL_VPN_SERVERS[0]
  );
  const [killSwitch, setKillSwitch] = useState<boolean>(true);
  const [cyberShieldAdblock, setCyberShieldAdblock] = useState<boolean>(true);
  const [autoArmorWifi, setAutoArmorWifi] = useState<boolean>(true);

  const [appBranding, setAppBranding] = useState({
    appName: 'Super VPN',
    packageName: 'com.appforge.supervpn',
    appLogoUri: '',
  });

  // Live session uptime counter when VPN tunnel is connected
  useEffect(() => {
    if (!isConnected) return;
    const timer = setInterval(() => {
      setSessionSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isConnected]);

  const toggleFavoriteServer = (id: string) => {
    setServers((prev) =>
      prev.map((srv) =>
        srv.id === id ? { ...srv, isFavorite: !srv.isFavorite } : srv
      )
    );
  };

  const activeColor = resolveVpnColorPalette(selectedColorId, isDark);
  const activeFont =
    VPN_FONT_PRESETS.find((f) => f.id === selectedFontId) ||
    VPN_FONT_PRESETS[0];
  const activeBottomNavObj =
    VPN_BOTTOM_NAV_VARIANTS.find((b) => b.id === bottomNavVariant) ||
    VPN_BOTTOM_NAV_VARIANTS[0];

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty(
        '--app-font-family',
        activeFont.cssStack
      );
    }
  }, [activeFont]);

  const activeScreenConfig =
    SUPER_VPN_SCREENS.find((s) => s.id === currentScreen) ||
    SUPER_VPN_SCREENS[0];
  const activeScreenVariant = selectedVariants[currentScreen] || 'varient_1';

  const triggerToast = (msg: string) => {
    setSimToast(msg);
    setTimeout(() => setSimToast(null), 2200);
  };

  const handleVariantChange = (
    screenId: SuperVpnScreenId,
    variant: SuperVpnVariantId
  ) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [screenId]: variant,
    }));
  };

  const applyVariantToAllScreens = (variant: SuperVpnVariantId) => {
    const updated = {} as Record<SuperVpnScreenId, SuperVpnVariantId>;
    SUPER_VPN_SCREENS.forEach((scr) => {
      updated[scr.id] = variant;
    });
    setSelectedVariants(updated);
    triggerToast(
      `Batch set all ${SUPER_VPN_SCREENS.length} screens to ${variant.replace(
        'varient_',
        'V'
      )}`
    );
  };

  const linkableScreens: LinkableScreenItem[] = SUPER_VPN_SCREENS.map((scr) => ({
    id: scr.id,
    label: scr.label,
    moduleGroup: scr.category,
    roleBadge: '5 VARIANTS',
    filePath: `${scr.filePath}/${selectedVariants[scr.id]}/index.tsx`,
    activeVariant: selectedVariants[scr.id],
    variants: ALL_VPN_VARIANT_IDS.map((vid, idx) => ({
      id: vid,
      label: scr.variants[vid],
      shortLabel: `V${idx + 1}`,
    })),
  }));

  const [navConnections, setNavConnections] = useState<
    ScreenNavigationConnection[]
  >(() => buildDefaultNavigationConnections(linkableScreens, false));

  const groupedDirectories = VPN_FLOW_GROUPS.filter((g) => g !== 'All')
    .map((groupName) => {
      const items = SUPER_VPN_SCREENS.filter((scr) => {
        const matchesGroup =
          selectedFlowGroup === 'All'
            ? scr.category === groupName
            : scr.category === selectedFlowGroup && scr.category === groupName;
        const matchesSearch =
          scr.label.toLowerCase().includes(screenSearchQuery.toLowerCase()) ||
          scr.category.toLowerCase().includes(screenSearchQuery.toLowerCase()) ||
          Object.values(scr.variants).some((v) =>
            v.toLowerCase().includes(screenSearchQuery.toLowerCase())
          );
        return matchesGroup && matchesSearch;
      });
      return {
        group: groupName,
        items,
      };
    })
    .filter((g) => g.items.length > 0);

  const handleExportZip = () => {
    setIsZipping(true);
    setTimeout(() => {
      const blob = new Blob(
        [
          JSON.stringify(
            {
              project: appBranding.appName,
              packageName: appBranding.packageName,
              selectedVariants,
              screens: SUPER_VPN_SCREENS,
              navigationConnections: navConnections,
            },
            null,
            2
          ),
        ],
        { type: 'application/json' }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'super-vpn-expo-source.zip.json';
      a.click();
      setIsZipping(false);
    }, 400);
  };

  const handleBuildApk = async () => {
    setApkBuildState('building');
    try {
      const res = await fetch('/api/apk/build-signed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: 'super-vpn-v1.0.0.apk',
          appName: appBranding.appName,
          packageName: appBranding.packageName,
          defaultColorPreset: selectedColorId,
          defaultThemeMode: isDark ? 'dark' : 'light',
          selectedVariants,
        }),
      });
      const data = await res.json();
      if (data?.downloadPath) {
        setApkDownloadUrl(data.downloadPath);
      }
      setApkBuildState('ready');
    } catch {
      setApkBuildState('ready');
    }
  };

  // =========================================================================
  // MIDDLE STUDIO WORKSPACE CONTENT (1:1 Cloth Shop Middle Content Design)
  // =========================================================================
  const middleContent = (
    <div className="p-6 space-y-6">
      {activeStudioTab === 'screens' && (
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Switcher & Search (Exact Cloth Shop Middle Top Bar) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <button
                type="button"
                onClick={() => setScreensViewMode('grid')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  screensViewMode === 'grid'
                    ? 'shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
                style={
                  screensViewMode === 'grid'
                    ? {
                        backgroundColor: activeColor.primary,
                        color: activeColor.primaryText,
                      }
                    : undefined
                }
              >
                <LayoutGrid size={13} />
                <span>Grid Directory ({SUPER_VPN_SCREENS.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setScreensViewMode('hierarchy')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  screensViewMode === 'hierarchy'
                    ? 'shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
                style={
                  screensViewMode === 'hierarchy'
                    ? {
                        backgroundColor: activeColor.primary,
                        color: activeColor.primaryText,
                      }
                    : undefined
                }
              >
                <FolderTree size={13} />
                <span>Screen Hierarchy</span>
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search size={14} className="absolute left-3 top-2.5 text-neutral-400" />
              <input
                type="text"
                value={screenSearchQuery}
                onChange={(e) => setScreenSearchQuery(e.target.value)}
                placeholder="Filter screens or flows..."
                className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs text-neutral-900 dark:text-white focus:outline-none"
                style={{
                  borderColor: screenSearchQuery ? activeColor.primary : undefined,
                }}
              />
              {screenSearchQuery && (
                <button
                  type="button"
                  onClick={() => setScreenSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-neutral-400 hover:text-neutral-600"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {screensViewMode === 'hierarchy' ? (
            <VisualNavigationLinkBuilder
              projectName={appBranding.appName}
              screens={linkableScreens}
              currentScreenId={currentScreen}
              primaryColor={activeColor.primary}
              isSingleVariantMode={false}
              connections={navConnections}
              onConnectionsChange={setNavConnections}
              onSelectScreenVariant={(screenId, variantId) => {
                setCurrentScreen(screenId as SuperVpnScreenId);
                if (ALL_VPN_VARIANT_IDS.includes(variantId as SuperVpnVariantId)) {
                  handleVariantChange(
                    screenId as SuperVpnScreenId,
                    variantId as SuperVpnVariantId
                  );
                }
              }}
            />
          ) : (
            /* GRID CARDS VIEW (1:1 Cloth Shop Pattern) */
            <div className="space-y-6">
              {/* Category Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {VPN_FLOW_GROUPS.map((flow) => {
                  const active = selectedFlowGroup === flow;
                  return (
                    <button
                      key={flow}
                      type="button"
                      onClick={() => setSelectedFlowGroup(flow)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                        active
                          ? 'shadow-sm'
                          : 'bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                      style={
                        active
                          ? {
                              backgroundColor: activeColor.primary,
                              color: activeColor.primaryText,
                            }
                          : undefined
                      }
                    >
                      {flow === 'All'
                        ? `All Screens (${SUPER_VPN_SCREENS.length})`
                        : flow}
                    </button>
                  );
                })}
              </div>

              {/* Quick Batch Variant Selectors (1:1 Cloth Shop Pattern) */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={15} className="text-neutral-500" />
                  <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    Batch Set All Screens for Export:
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {(
                    [
                      ['varient_1', 'All V1'],
                      ['varient_2', 'All V2'],
                      ['varient_3', 'All V3'],
                      ['varient_4', 'All V4'],
                      ['varient_5', 'All V5'],
                    ] as const
                  ).map(([vid, label]) => (
                    <button
                      key={vid}
                      type="button"
                      onClick={() => applyVariantToAllScreens(vid)}
                      className="px-2.5 py-1 text-xs font-semibold rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition cursor-pointer"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Screen Cards Grid Grouped by Category (1:1 Cloth Shop Pattern) */}
              <div className="space-y-6">
                {groupedDirectories.map((group) => (
                  <div key={group.group} className="space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                      {group.group} ({group.items.length})
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {group.items.map((scr) => {
                        const isCurrentActive = currentScreen === scr.id;
                        const selectedExportVariant =
                          selectedVariants[scr.id] || 'varient_1';
                        const vKeys: SuperVpnVariantId[] = ALL_VPN_VARIANT_IDS;

                        return (
                          <div
                            key={scr.id}
                            className={`rounded-xl border p-4 bg-white dark:bg-neutral-900 transition-all ${
                              isCurrentActive
                                ? 'shadow-md ring-2 ring-black/5 dark:ring-white/5'
                                : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-sm'
                            }`}
                            style={
                              isCurrentActive
                                ? {
                                    borderColor: activeColor.primary,
                                  }
                                : undefined
                            }
                          >
                            <div className="flex items-start justify-between gap-2 mb-3">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                                    {scr.label}
                                  </h4>
                                  {isCurrentActive && (
                                    <span
                                      className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                                      style={{
                                        backgroundColor: activeColor.primary,
                                        color: activeColor.primaryText,
                                      }}
                                    >
                                      Active on Phone
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] font-mono text-neutral-400">
                                  {scr.filePath}
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={() => setCurrentScreen(scr.id)}
                                className="px-2.5 py-1 rounded-lg text-xs font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center gap-1 transition cursor-pointer"
                              >
                                <Eye size={12} />
                                <span>Preview</span>
                              </button>
                            </div>

                            {/* 5 Variant Selector Buttons in 2-Column Grid (1:1 Cloth Shop Pattern) */}
                            <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                              {vKeys.map((vKey) => {
                                const isVariantSelected =
                                  isCurrentActive && activeScreenVariant === vKey;
                                const isZipSelected =
                                  selectedExportVariant === vKey;

                                return (
                                  <button
                                    key={vKey}
                                    type="button"
                                    onClick={() => {
                                      handleVariantChange(scr.id, vKey);
                                      setCurrentScreen(scr.id);
                                    }}
                                    className={`px-2.5 py-2 rounded-lg text-left text-xs font-semibold flex items-center justify-between gap-1 transition cursor-pointer ${
                                      isVariantSelected
                                        ? 'shadow-sm'
                                        : isZipSelected
                                        ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border'
                                        : 'bg-neutral-50/60 dark:bg-neutral-950/40 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                                    }`}
                                    style={
                                      isVariantSelected
                                        ? {
                                            backgroundColor: activeColor.primary,
                                            color: activeColor.primaryText,
                                          }
                                        : isZipSelected
                                        ? {
                                            borderColor: activeColor.primary,
                                          }
                                        : undefined
                                    }
                                  >
                                    <span className="truncate">
                                      {scr.variants[vKey]}
                                    </span>
                                    {isVariantSelected && (
                                      <Check size={12} className="flex-shrink-0" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeStudioTab === 'theme' && (
        <div className="max-w-4xl mx-auto space-y-8">
          {/* 1. Brand Color Palette (7 Luxury Themes) + Light/Dark Mode */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <Palette size={16} style={{ color: activeColor.primary }} />
                  <span>Brand Color Palette (7 Luxury Themes)</span>
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Click any palette to dynamically restyle buttons, badges, navigation, and accents across all {SUPER_VPN_SCREENS.length} screens.
                </p>
              </div>

              <div className="flex items-center p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 self-start">
                <button
                  type="button"
                  onClick={() => {
                    setIsDark(false);
                    triggerToast('Switched Super VPN to Light Mode');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer ${
                    !isDark
                      ? 'bg-white text-neutral-900 shadow-2xs'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  <Sun size={13} />
                  <span>Light</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsDark(true);
                    triggerToast('Switched Super VPN to Dark Mode');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer ${
                    isDark
                      ? 'bg-neutral-900 text-white shadow-2xs'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  <Moon size={13} />
                  <span>Dark</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {VPN_COLOR_PRESETS.map((preset) => {
                const isSelected = selectedColorId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      setSelectedColorId(preset.id);
                      triggerToast(
                        `Applied ${preset.name} palette across all ${SUPER_VPN_SCREENS.length} screens`
                      );
                    }}
                    className={`p-3.5 rounded-xl border-2 text-left flex items-center justify-between gap-3 transition cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-50 dark:bg-neutral-800/80 shadow-sm'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900'
                    }`}
                    style={
                      isSelected
                        ? {
                            borderColor: activeColor.primary,
                          }
                        : undefined
                    }
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-8 h-8 rounded-lg shadow-sm border border-black/10 flex-shrink-0"
                        style={{ backgroundColor: preset.swatch }}
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                          {preset.name}
                        </div>
                        <div className="text-[10px] font-mono text-neutral-400">
                          {preset.swatch}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle2
                        size={16}
                        style={{ color: activeColor.primary }}
                        className="flex-shrink-0"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Curated Typography (22 Premium Google Fonts) */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <Type size={16} style={{ color: activeColor.primary }} />
                  <span>Curated Typography ({VPN_FONT_PRESETS.length} Premium Fonts)</span>
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Select font family to apply Google Fonts across all screens.
                </p>
              </div>
              <span
                className="text-xs font-mono font-bold px-2.5 py-1 rounded"
                style={{
                  backgroundColor: activeColor.primary,
                  color: activeColor.primaryText,
                }}
              >
                Active: {activeFont.name}
              </span>
            </div>

            <div className="relative">
              <Search size={14} className="absolute left-3 top-2.5 text-neutral-400" />
              <input
                type="text"
                value={fontSearchQuery}
                onChange={(e) => setFontSearchQuery(e.target.value)}
                placeholder="Search 22 curated fonts by name or style (Serif, Sans, Mono)..."
                className="w-full pl-9 pr-3 py-2 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs text-neutral-900 dark:text-white focus:outline-none"
                style={{
                  borderColor: fontSearchQuery ? activeColor.primary : undefined,
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1">
              {VPN_FONT_PRESETS.filter(
                (fp) =>
                  fp.name.toLowerCase().includes(fontSearchQuery.toLowerCase()) ||
                  fp.category.toLowerCase().includes(fontSearchQuery.toLowerCase())
              ).map((fp) => {
                const isSelected = selectedFontId === fp.id;
                return (
                  <button
                    key={fp.id}
                    type="button"
                    onClick={() => {
                      setSelectedFontId(fp.id);
                      triggerToast(
                        `Applied ${fp.name} font across all ${SUPER_VPN_SCREENS.length} VPN screens`
                      );
                    }}
                    className={`p-3 rounded-xl border text-left flex items-start justify-between gap-2 transition cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-50 dark:bg-neutral-800 shadow-sm'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900'
                    }`}
                    style={
                      isSelected
                        ? {
                            borderColor: activeColor.primary,
                          }
                        : undefined
                    }
                  >
                    <div>
                      <div
                        className="text-lg font-bold text-neutral-900 dark:text-white leading-tight"
                        style={{ fontFamily: fp.cssStack }}
                      >
                        Aa · {fp.name}
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-1">
                        {fp.category}
                      </div>
                    </div>
                    {isSelected && (
                      <Check
                        size={16}
                        style={{ color: activeColor.primary }}
                        className="flex-shrink-0 mt-0.5"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Bottom Navigation Bar Designs (10 Styles) */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <Layers size={16} style={{ color: activeColor.primary }} />
                  <span>
                    Bottom Navigation Bar Designs ({VPN_BOTTOM_NAV_VARIANTS.length} Styles)
                  </span>
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Choose any bottom tab bar variant. V1 is classic default.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div
                  role="radiogroup"
                  aria-label="Bottom Navigate Screen Swappable"
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/70"
                >
                  <span className="text-[11px] font-bold text-neutral-600 dark:text-neutral-300">
                    Screen Swappable:
                  </span>
                  <label className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-neutral-100 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="vpnBottomNavSwipeable"
                      defaultChecked
                      className="w-3.5 h-3.5 cursor-pointer"
                      style={{ accentColor: activeColor.primary }}
                    />
                    <span>Swappable</span>
                  </label>
                  <label className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-900 dark:text-neutral-100 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="vpnBottomNavSwipeable"
                      className="w-3.5 h-3.5 cursor-pointer"
                      style={{ accentColor: activeColor.primary }}
                    />
                    <span>Not Swappable</span>
                  </label>
                </div>
                <span className="text-xs font-bold" style={{ color: activeColor.primary }}>
                  Active: {bottomNavVariant}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {VPN_BOTTOM_NAV_VARIANTS.map((nav) => {
                const isSelected = bottomNavVariant === nav.id;
                return (
                  <button
                    key={nav.id}
                    type="button"
                    onClick={() => {
                      setBottomNavVariant(nav.id);
                      triggerToast(`Switched Bottom Navigation to ${nav.name}`);
                    }}
                    className={`p-3.5 rounded-xl border-2 text-left flex items-start justify-between gap-2 transition cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-50 dark:bg-neutral-800 shadow-sm'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900'
                    }`}
                    style={
                      isSelected
                        ? {
                            borderColor: activeColor.primary,
                          }
                        : undefined
                    }
                  >
                    <div>
                      <div className="text-xs font-bold text-neutral-900 dark:text-white">
                        {nav.name}
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-0.5">
                        {nav.tagline}
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle2
                        size={16}
                        style={{ color: activeColor.primary }}
                        className="flex-shrink-0"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeStudioTab === 'branding' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                App Branding &amp; Launcher Config
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Updates your app logo, title, and package bundle ID across Android &amp; iOS.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl border border-neutral-300 dark:border-neutral-700 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm"
                style={{
                  backgroundColor: activeColor.primary,
                  color: activeColor.primaryText,
                }}
              >
                {appBranding.appLogoUri ? (
                  <img
                    src={appBranding.appLogoUri}
                    alt="Super VPN Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-black">
                    {(appBranding.appName.trim()[0] || 'S').toUpperCase()}
                  </span>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <input
                  ref={logoFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        setAppBranding((prev) => ({
                          ...prev,
                          appLogoUri: reader.result as string,
                        }));
                        triggerToast('Updated Super VPN launcher logo');
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => logoFileInputRef.current?.click()}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm hover:opacity-95 cursor-pointer"
                    style={{
                      backgroundColor: activeColor.primary,
                      color: activeColor.primaryText,
                    }}
                  >
                    <ImagePlus size={14} />
                    <span>Upload Logo</span>
                  </button>
                  {appBranding.appLogoUri && (
                    <button
                      type="button"
                      onClick={() =>
                        setAppBranding((prev) => ({ ...prev, appLogoUri: '' }))
                      }
                      className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 text-red-500 cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={
                    appBranding.appLogoUri.startsWith('data:')
                      ? ''
                      : appBranding.appLogoUri
                  }
                  onChange={(e) =>
                    setAppBranding((prev) => ({
                      ...prev,
                      appLogoUri: e.target.value,
                    }))
                  }
                  placeholder="Or enter logo image URL..."
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                App Title
              </label>
              <input
                type="text"
                value={appBranding.appName}
                onChange={(e) =>
                  setAppBranding({ ...appBranding, appName: e.target.value })
                }
                className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                Android Package Name / iOS Bundle ID
              </label>
              <input
                type="text"
                value={appBranding.packageName}
                onChange={(e) =>
                  setAppBranding({
                    ...appBranding,
                    packageName: e.target.value,
                  })
                }
                className="w-full px-3 py-2 text-xs font-mono font-semibold rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      )}

      {activeStudioTab === 'export' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-sm"
                  style={{
                    backgroundColor: activeColor.primary,
                    color: activeColor.primaryText,
                  }}
                >
                  <Smartphone size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                    1-Click Android .APK Builder
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Compiles all {SUPER_VPN_SCREENS.length} Super VPN screens (5 variants each) into a standalone installer APK.
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                {apkBuildState === 'ready'
                  ? 'APK Ready'
                  : apkBuildState === 'building'
                  ? 'Compiling'
                  : 'Ready to Build'}
              </span>
            </div>

            {apkBuildState === 'ready' ? (
              <a
                href={apkDownloadUrl || '#'}
                download="super-vpn-v1.0.0.apk"
                className="w-full py-3 rounded-xl bg-emerald-600 text-white text-xs font-extrabold flex items-center justify-center gap-2"
              >
                <Download size={15} />
                <span>Download Signed super-vpn-v1.0.0.apk</span>
              </a>
            ) : (
              <button
                type="button"
                disabled={apkBuildState === 'building'}
                onClick={handleBuildApk}
                style={{
                  backgroundColor: activeColor.primary,
                  color: activeColor.primaryText,
                }}
                className="w-full py-3 rounded-xl text-xs font-bold shadow hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Smartphone size={16} />
                <span>
                  {apkBuildState === 'building'
                    ? 'Building Signed Super VPN APK...'
                    : 'Generate Standalone Android .APK'}
                </span>
              </button>
            )}
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-sm"
                style={{
                  backgroundColor: activeColor.primary,
                  color: activeColor.primaryText,
                }}
              >
                <FolderGit2 size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                  Full Expo Project Source Code (.ZIP)
                </h3>
                <p className="text-xs text-neutral-500">
                  Includes all {SUPER_VPN_SCREENS.length} Super VPN screens (5 variants each), Design System tokens &amp; navigation links.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleExportZip}
              style={{
                backgroundColor: activeColor.primary,
                color: activeColor.primaryText,
              }}
              className="w-full py-3 rounded-xl text-xs font-bold shadow hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download size={15} />
              <span>Download Super VPN Source .ZIP</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // =========================================================================
  // MOBILE SIMULATOR CONTENT (Exact CyberShield Top Header + Active Screen + Bottom Nav)
  // =========================================================================
  const mobileContent = (
    <div
      className="vpn-theme-scope flex-1 w-full h-full flex flex-col overflow-hidden relative select-none transition-colors"
      style={getVpnThemeScopeStyle(activeColor, activeFont)}
      data-vpn-dark={isDark ? 'true' : 'false'}
      data-vpn-preset={selectedColorId}
    >
      {/* Toast Notification inside Simulator */}
      {simToast && (
        <div
          className="absolute top-16 left-3 right-3 z-50 text-[11px] font-extrabold px-3.5 py-2.5 rounded-xl shadow-lg flex items-center justify-between border"
          style={{
            backgroundColor: activeColor.cardBackground,
            borderColor: activeColor.primary,
            color: activeColor.textPrimary,
          }}
        >
          <span className="truncate pr-2">{simToast}</span>
          <CheckCircle2
            size={14}
            style={{ color: activeColor.primary }}
            className="flex-shrink-0"
          />
        </div>
      )}

      {/* TOP CYBERSHIELD HEADER BAR (Exact Image 1-5 Header for root screens) */}
      {!activeScreenConfig.hasCustomSubHeader && (
        <div
          className="px-4 pt-3 pb-2 flex items-center justify-between flex-shrink-0 z-30 transition-colors"
          style={{
            backgroundColor: activeColor.background,
          }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 shadow-xs"
              style={{
                backgroundColor: activeColor.cardBackground,
                borderColor: activeColor.border,
                color: activeColor.primary,
              }}
            >
              <Shield size={20} strokeWidth={2.2} />
            </div>
            <div className="min-w-0">
              <h1
                className="text-[17px] font-extrabold tracking-tight leading-tight truncate"
                style={{ color: activeColor.textPrimary }}
              >
                {activeScreenConfig.headerTitle}
              </h1>
              <p
                className="text-[10px] font-extrabold uppercase tracking-wider truncate"
                style={{ color: activeColor.primary }}
              >
                {activeScreenConfig.headerSubtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setCurrentScreen(
                currentScreen === 'Tools' ? 'ProtocolEngine' : 'Tools'
              )
            }
            className="w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 cursor-pointer transition"
            style={{
              backgroundColor: activeColor.cardBackground,
              borderColor: activeColor.border,
              color: activeColor.textSecondary,
            }}
            title="Defense Settings & Protocol Engine"
          >
            <Settings size={17} />
          </button>
        </div>
      )}

      {/* SCROLLABLE SCREEN VIEWPORT */}
      <div className="flex-1 w-full overflow-y-auto no-scrollbar">
        {isSkeletonActive ? (
          <div className="p-4 space-y-4">
            <div className="h-12 rounded-2xl bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
            <div className="h-52 rounded-3xl bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
            <div className="grid grid-cols-4 gap-2">
              <div className="h-16 rounded-xl bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
              <div className="h-16 rounded-xl bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
              <div className="h-16 rounded-xl bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
              <div className="h-16 rounded-xl bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
            </div>
            <div className="h-32 rounded-2xl bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
          </div>
        ) : (
          <>
            {currentScreen === 'Shield' && (
              <ShieldVarient1
                variant={activeScreenVariant}
                onOpenServers={() => setCurrentScreen('Servers')}
                onOpenSpeed={() => setCurrentScreen('Speed')}
                onOpenTools={() => setCurrentScreen('ProtocolEngine')}
                onOpenAccount={() => setCurrentScreen('Account')}
                onTriggerToast={triggerToast}
              />
            )}
            {currentScreen === 'Servers' && (
              <ServersVarient1
                variant={activeScreenVariant}
                onConnectServer={() => setCurrentScreen('Shield')}
                onTriggerToast={triggerToast}
              />
            )}
            {currentScreen === 'Speed' && (
              <SpeedVarient1
                variant={activeScreenVariant}
                onOpenServers={() => setCurrentScreen('Servers')}
                onOpenThreatMonitor={() => setCurrentScreen('ThreatMonitor')}
                onTriggerToast={triggerToast}
              />
            )}
            {currentScreen === 'Tools' && (
              <ToolsVarient1
                variant={activeScreenVariant}
                onOpenServers={() => setCurrentScreen('SplitTunneling')}
                onTriggerToast={triggerToast}
              />
            )}
            {currentScreen === 'Account' && (
              <AccountVarient1
                variant={activeScreenVariant}
                onTriggerToast={triggerToast}
              />
            )}
            {currentScreen === 'ProtocolEngine' && (
              <ProtocolEngineVarient1
                variant={activeScreenVariant}
                onBack={() => setCurrentScreen('Shield')}
                onTriggerToast={triggerToast}
              />
            )}
            {currentScreen === 'SplitTunneling' && (
              <SplitTunnelingVarient1
                variant={activeScreenVariant}
                onBack={() => setCurrentScreen('Tools')}
                onTriggerToast={triggerToast}
              />
            )}
            {currentScreen === 'ThreatMonitor' && (
              <ThreatMonitorVarient1
                variant={activeScreenVariant}
                onBack={() => setCurrentScreen('Speed')}
                onTriggerToast={triggerToast}
              />
            )}
          </>
        )}
      </div>

      {/* 10-VARIANT SELECTABLE BOTTOM NAVIGATION BAR (Shield • Servers • Speed • Tools • Account) */}
      <VpnBottomNavBar
        activeTab={activeScreenConfig.parentTab}
        onSelectTab={(tab) => setCurrentScreen(tab)}
        variantOverride={bottomNavVariant}
      />
    </div>
  );

  return (
    <VpnDesignSystemContext.Provider
      value={{
        isDark,
        toggleTheme: () => setIsDark((prev) => !prev),
        colorPresetId: selectedColorId,
        setColorPresetId: setSelectedColorId,
        palette: activeColor,
        fontPresetId: selectedFontId,
        setFontPresetId: setSelectedFontId,
        activeFont,
        bottomNavVariant,
        setBottomNavVariant,
        isConnected,
        setIsConnected,
        sessionSeconds,
        selectedServer,
        setSelectedServer,
        servers,
        toggleFavoriteServer,
        killSwitch,
        setKillSwitch,
        cyberShieldAdblock,
        setCyberShieldAdblock,
        autoArmorWifi,
        setAutoArmorWifi,
      }}
    >
      <StudioDashboardShell
        activeProjectId="super_vpn"
        projectName={appBranding.appName}
        activeScreenLabel={activeScreenConfig.label}
        activeVariantLabel={activeScreenVariant.replace('varient_', 'Variant ')}
        activeStudioTab={activeStudioTab}
        onSelectStudioTab={setActiveStudioTab}
        onSwitchProject={onSwitchProject}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        primaryColor={activeColor.primary}
        primaryTextColor={activeColor.primaryText}
        isSkeletonActive={isSkeletonActive}
        onToggleSkeleton={() => setIsSkeletonActive(!isSkeletonActive)}
        onExportZip={handleExportZip}
        isZipping={isZipping}
        variantOptions={[
          { id: 'varient_1', label: 'Variant 1' },
          { id: 'varient_2', label: 'Variant 2' },
          { id: 'varient_3', label: 'Variant 3' },
          { id: 'varient_4', label: 'Variant 4' },
          { id: 'varient_5', label: 'Variant 5' },
        ]}
        currentVariantId={activeScreenVariant}
        onChangeVariant={(v) =>
          handleVariantChange(currentScreen, v as SuperVpnVariantId)
        }
        onReloadSimulator={() =>
          triggerToast(
            `Reloaded ${activeScreenConfig.label} (${activeScreenVariant.replace(
              'varient_',
              'V'
            )})`
          )
        }
        colorSwatches={VPN_COLOR_PRESETS.map((p) => ({
          id: p.id,
          name: p.name,
          swatch: p.swatch,
        }))}
        activeColorId={selectedColorId}
        onSelectColorSwatch={(id) => {
          setSelectedColorId(id as AppColorPresetId);
          const found = VPN_COLOR_PRESETS.find((p) => p.id === id);
          if (found) {
            triggerToast(`Applied ${found.name} palette`);
          }
        }}
        activeFontName={activeFont.name}
        middleContent={middleContent}
        mobileContent={mobileContent}
      />
    </VpnDesignSystemContext.Provider>
  );
};

export default SuperVpnApp;
