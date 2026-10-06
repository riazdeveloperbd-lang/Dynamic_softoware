import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import {
  LayoutDashboard,
  ShoppingBag,
  SlidersHorizontal,
  Shirt,
  LayoutGrid,
  FolderTree,
  Search,
  X,
  Eye,
  Check,
  CheckCircle2,
  ImagePlus,
  Trash2,
  Smartphone,
  Download,
  FolderGit2,
} from 'lucide-react';
import StudioDashboardShell, { StudioTab } from '../components/StudioDashboardShell';

// Screen Variants Imports (Matching Cloth Shop folder structure: screens/<ScreenName>/varient_1..4/index.tsx)
import AdminDashboardVarient1 from './screens/AdminDashboard/varient_1';
import AdminDashboardVarient2 from './screens/AdminDashboard/varient_2';
import AdminDashboardVarient3 from './screens/AdminDashboard/varient_3';
import AdminDashboardVarient4 from './screens/AdminDashboard/varient_4';

import OrderManagementVarient1 from './screens/OrderManagement/varient_1';
import OrderManagementVarient2 from './screens/OrderManagement/varient_2';
import OrderManagementVarient3 from './screens/OrderManagement/varient_3';
import OrderManagementVarient4 from './screens/OrderManagement/varient_4';

import OrderDetailsVarient1 from './screens/OrderDetails/varient_1';
import OrderDetailsVarient2 from './screens/OrderDetails/varient_2';
import OrderDetailsVarient3 from './screens/OrderDetails/varient_3';
import OrderDetailsVarient4 from './screens/OrderDetails/varient_4';

import InventoryCatalogVarient1 from './screens/InventoryCatalog/varient_1';
import InventoryCatalogVarient2 from './screens/InventoryCatalog/varient_2';
import InventoryCatalogVarient3 from './screens/InventoryCatalog/varient_3';
import InventoryCatalogVarient4 from './screens/InventoryCatalog/varient_4';

import ProductEditorVarient1 from './screens/ProductEditor/varient_1';
import ProductEditorVarient2 from './screens/ProductEditor/varient_2';
import ProductEditorVarient3 from './screens/ProductEditor/varient_3';
import ProductEditorVarient4 from './screens/ProductEditor/varient_4';

import POSCashierVarient1 from './screens/POSCashier/varient_1';
import POSCashierVarient2 from './screens/POSCashier/varient_2';
import POSCashierVarient3 from './screens/POSCashier/varient_3';
import POSCashierVarient4 from './screens/POSCashier/varient_4';

import CustomerDirectoryVarient1 from './screens/CustomerDirectory/varient_1';
import CustomerDirectoryVarient2 from './screens/CustomerDirectory/varient_2';
import CustomerDirectoryVarient3 from './screens/CustomerDirectory/varient_3';
import CustomerDirectoryVarient4 from './screens/CustomerDirectory/varient_4';

import StaffManagementVarient1 from './screens/StaffManagement/varient_1';
import StaffManagementVarient2 from './screens/StaffManagement/varient_2';
import StaffManagementVarient3 from './screens/StaffManagement/varient_3';
import StaffManagementVarient4 from './screens/StaffManagement/varient_4';

import AnalyticsReportsVarient1 from './screens/AnalyticsReports/varient_1';
import AnalyticsReportsVarient2 from './screens/AnalyticsReports/varient_2';
import AnalyticsReportsVarient3 from './screens/AnalyticsReports/varient_3';
import AnalyticsReportsVarient4 from './screens/AnalyticsReports/varient_4';

import StoreSettingsVarient1 from './screens/StoreSettings/varient_1';
import StoreSettingsVarient2 from './screens/StoreSettings/varient_2';
import StoreSettingsVarient3 from './screens/StoreSettings/varient_3';
import StoreSettingsVarient4 from './screens/StoreSettings/varient_4';

import ActivityAuditVarient1 from './screens/ActivityAudit/varient_1';
import ActivityAuditVarient2 from './screens/ActivityAudit/varient_2';
import ActivityAuditVarient3 from './screens/ActivityAudit/varient_3';
import ActivityAuditVarient4 from './screens/ActivityAudit/varient_4';

import NotificationsVarient1 from './screens/Notifications/varient_1';
import NotificationsVarient2 from './screens/Notifications/varient_2';
import NotificationsVarient3 from './screens/Notifications/varient_3';
import NotificationsVarient4 from './screens/Notifications/varient_4';

export interface ClothShopAdminAppProps {
  onSwitchProject?: (projectId: string) => void;
}

export type AdminScreenName =
  | 'AdminDashboard'
  | 'Notifications'
  | 'OrderManagement'
  | 'OrderDetails'
  | 'InventoryCatalog'
  | 'ProductEditor'
  | 'POSCashier'
  | 'CustomerDirectory'
  | 'StaffManagement'
  | 'AnalyticsReports'
  | 'StoreSettings'
  | 'ActivityAudit';

export type AdminVariant = 'v1' | 'v2' | 'v3' | 'v4';

interface ScreenConfig {
  id: AdminScreenName;
  label: string;
  category: string;
  description: string;
  badge: string;
  variantNames: [string, string, string, string];
}

const ADMIN_SCREENS: ScreenConfig[] = [
  {
    id: 'AdminDashboard',
    label: 'Dashboard / Home',
    category: 'Overview & Analytics',
    description: 'VogueOps Executive Pulse & Fast-Dispatch Batch Command Center',
    badge: '4 Variants',
    variantNames: [
      'V1: Executive Pulse',
      'V2: Commercial Performance',
      'V3: Flagship US Live',
      'V4: VogueOps Command',
    ],
  },
  {
    id: 'Notifications',
    label: 'Notifications & Alerts',
    category: 'Overview & Analytics',
    description: 'Real-time order chimes, zero-stock deficits, VIP check-ins, and SLA alerts',
    badge: '4 Variants',
    variantNames: [
      'V1: Operations Inbox',
      'V2: SLA & Stock Triage',
      'V3: VIP Client Feed',
      'V4: System Telemetry',
    ],
  },
  {
    id: 'OrderManagement',
    label: 'Orders & Fulfillment',
    category: 'Sales & POS',
    description: 'Priority triage orders, SLA packing queue, and carrier dispatch',
    badge: '4 Variants',
    variantNames: [
      'V1: VogueOps Triage',
      'V2: Fulfillment Kanban',
      'V3: Warehouse Dispatch',
      'V4: Atelier Concierge',
    ],
  },
  {
    id: 'OrderDetails',
    label: 'Order Details',
    category: 'Sales & POS',
    description: '6-stage WMS fulfillment tracker, garment manifest, financial ledger & dispatch',
    badge: '4 Variants',
    variantNames: [
      'V1: WMS Manifest & Ledger',
      'V2: Packing Station Slip',
      'V3: Courier Logistics',
      'V4: VIP Concierge Order',
    ],
  },
  {
    id: 'InventoryCatalog',
    label: 'Products & Inventory',
    category: 'Catalog & Stock',
    description: 'Stock deficit alerts, SKU catalog, size matrix, and express restock POs',
    badge: '4 Variants',
    variantNames: ['V1: SKU Grid', 'V2: Deficit Triage', 'V3: Warehouse Matrix', 'V4: Compact List'],
  },
  {
    id: 'ProductEditor',
    label: 'Add / Edit Product',
    category: 'Catalog & Stock',
    description: 'Add/Edit apparel details, sizing matrix, pricing, and media',
    badge: '4 Variants',
    variantNames: ['V1: Standard Form', 'V2: Split Studio', 'V3: Quick SKU', 'V4: Bulk Editor'],
  },
  {
    id: 'POSCashier',
    label: 'POS Cashier & Scanner',
    category: 'Sales & POS',
    description: 'In-store barcode scanner, instant item lookup, and express checkout',
    badge: '4 Variants',
    variantNames: ['V1: Register Cart', 'V2: Camera Scanner', 'V3: Quick Keypad', 'V4: Dark POS'],
  },
  {
    id: 'CustomerDirectory',
    label: 'Customer Directory',
    category: 'CRM & Staff',
    description: 'VIP buyer profiles, purchase history, and lifetime value metrics',
    badge: '4 Variants',
    variantNames: ['V1: Buyer Cards', 'V2: VIP Tiers', 'V3: Spend Analytics', 'V4: Compact CRM'],
  },
  {
    id: 'StaffManagement',
    label: 'Staff & Roles',
    category: 'CRM & Staff',
    description: 'Warehouse zone operators, cashiers, and RBAC permissions',
    badge: '4 Variants',
    variantNames: ['V1: Team Roster', 'V2: Shift Zones', 'V3: Access Matrix', 'V4: Audit View'],
  },
  {
    id: 'AnalyticsReports',
    label: 'Analytics & Reports',
    category: 'Overview & Analytics',
    description: 'Gross revenue forecast, SLA pace metrics, and category P&L',
    badge: '4 Variants',
    variantNames: ['V1: Revenue Pulse', 'V2: SLA Telemetry', 'V3: P&L Ledger', 'V4: Executive Deck'],
  },
  {
    id: 'StoreSettings',
    label: 'Store Settings',
    category: 'Settings & Logs',
    description: 'Storefront zones, SLA thresholds, tax rates, and printer setup',
    badge: '4 Variants',
    variantNames: ['V1: General Config', 'V2: Warehouse Zones', 'V3: Integrations', 'V4: Security'],
  },
  {
    id: 'ActivityAudit',
    label: 'Activity Audit Log',
    category: 'Settings & Logs',
    description: 'Live operations triage events, PO triggers, and dispatch logs',
    badge: '4 Variants',
    variantNames: ['V1: Event Stream', 'V2: Security Log', 'V3: Stock History', 'V4: Terminal Log'],
  },
];

const SCREEN_VARIANT_COMPONENTS: Record<
  AdminScreenName,
  Record<AdminVariant, React.FC<{ primaryColor?: string; isDark?: boolean; onNavigate?: (s: any) => void }>>
> = {
  AdminDashboard: {
    v1: AdminDashboardVarient1,
    v2: AdminDashboardVarient2,
    v3: AdminDashboardVarient3,
    v4: AdminDashboardVarient4,
  },
  Notifications: {
    v1: NotificationsVarient1,
    v2: NotificationsVarient2,
    v3: NotificationsVarient3,
    v4: NotificationsVarient4,
  },
  OrderManagement: {
    v1: OrderManagementVarient1,
    v2: OrderManagementVarient2,
    v3: OrderManagementVarient3,
    v4: OrderManagementVarient4,
  },
  OrderDetails: {
    v1: OrderDetailsVarient1,
    v2: OrderDetailsVarient2,
    v3: OrderDetailsVarient3,
    v4: OrderDetailsVarient4,
  },
  InventoryCatalog: {
    v1: InventoryCatalogVarient1,
    v2: InventoryCatalogVarient2,
    v3: InventoryCatalogVarient3,
    v4: InventoryCatalogVarient4,
  },
  ProductEditor: {
    v1: ProductEditorVarient1,
    v2: ProductEditorVarient2,
    v3: ProductEditorVarient3,
    v4: ProductEditorVarient4,
  },
  POSCashier: {
    v1: POSCashierVarient1,
    v2: POSCashierVarient2,
    v3: POSCashierVarient3,
    v4: POSCashierVarient4,
  },
  CustomerDirectory: {
    v1: CustomerDirectoryVarient1,
    v2: CustomerDirectoryVarient2,
    v3: CustomerDirectoryVarient3,
    v4: CustomerDirectoryVarient4,
  },
  StaffManagement: {
    v1: StaffManagementVarient1,
    v2: StaffManagementVarient2,
    v3: StaffManagementVarient3,
    v4: StaffManagementVarient4,
  },
  AnalyticsReports: {
    v1: AnalyticsReportsVarient1,
    v2: AnalyticsReportsVarient2,
    v3: AnalyticsReportsVarient3,
    v4: AnalyticsReportsVarient4,
  },
  StoreSettings: {
    v1: StoreSettingsVarient1,
    v2: StoreSettingsVarient2,
    v3: StoreSettingsVarient3,
    v4: StoreSettingsVarient4,
  },
  ActivityAudit: {
    v1: ActivityAuditVarient1,
    v2: ActivityAuditVarient2,
    v3: ActivityAuditVarient3,
    v4: ActivityAuditVarient4,
  },
};

const COLOR_PRESETS = [
  { id: 'indigo', name: 'VogueOps Royal Indigo', primary: '#4338CA', swatch: '#4338CA' },
  { id: 'obsidian', name: 'Atelier Obsidian', primary: '#18181B', swatch: '#18181B' },
  { id: 'emerald', name: 'Emerald Couture', primary: '#059669', swatch: '#059669' },
  { id: 'sapphire', name: 'Royal Sapphire', primary: '#2563EB', swatch: '#2563EB' },
  { id: 'crimson', name: 'Crimson Luxe', primary: '#E11D48', swatch: '#E11D48' },
  { id: 'amber', name: 'Amber Gold', primary: '#D97706', swatch: '#D97706' },
  { id: 'violet', name: 'Imperial Violet', primary: '#7C3AED', swatch: '#7C3AED' },
];

const FONT_PRESETS = [
  { id: 'jakarta', name: 'Plus Jakarta Sans', category: 'Modern Geometric Sans', fontFamily: 'sans-serif' },
  { id: 'inter', name: 'Inter', category: 'Clean UI Sans', fontFamily: 'sans-serif' },
  { id: 'playfair', name: 'Playfair Display', category: 'Editorial Luxury Serif', fontFamily: 'serif' },
  { id: 'dm', name: 'DM Sans', category: 'Minimalist Sans', fontFamily: 'sans-serif' },
  { id: 'space', name: 'Space Grotesk', category: 'Tech & Logistics Sans', fontFamily: 'monospace' },
  { id: 'outfit', name: 'Outfit', category: 'Contemporary Retail', fontFamily: 'sans-serif' },
];

const BOTTOM_NAV_STYLES = [
  { id: 'v1', name: 'V1 • VogueOps Executive Bar', tagline: 'Clean 4-Tab Bar with Live Order Badge' },
  { id: 'v2', name: 'V2 • Floating Capsule Dock', tagline: 'Elevated Island Dock with Active Pill' },
  { id: 'v3', name: 'V3 • Top Neon Indicator', tagline: 'Minimalist Bar with Top Active Line' },
  { id: 'v4', name: 'V4 • Compact Label Strip', tagline: 'High-Density Warehouse Operator Bar' },
];

export function ClothShopAdminApp({ onSwitchProject }: ClothShopAdminAppProps) {
  const [activeStudioTab, setActiveStudioTab] = useState<StudioTab>('screens');
  const [screensViewMode, setScreensViewMode] = useState<'grid' | 'hierarchy'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [screenSearchQuery, setScreenSearchQuery] = useState('');

  // Navigation & Variant states
  const [currentScreen, setCurrentScreen] = useState<AdminScreenName>('AdminDashboard');
  const [variantsMap, setVariantsMap] = useState<Record<AdminScreenName, AdminVariant>>(() => {
    const map = {} as Record<AdminScreenName, AdminVariant>;
    ADMIN_SCREENS.forEach((s) => (map[s.id] = 'v1'));
    return map;
  });

  // Theme, Typography & Branding states
  const [selectedColorPreset, setSelectedColorPreset] = useState('indigo');
  const [selectedFontPreset, setSelectedFontPreset] = useState('jakarta');
  const [bottomNavStyle, setBottomNavStyle] = useState('v1');
  const [isDark, setIsDark] = useState(false);
  const [isSkeletonActive, setIsSkeletonActive] = useState(false);

  // App Branding state
  const [appBranding, setAppBranding] = useState({
    appName: 'VogueOps Admin',
    packageName: 'com.vogueops.clothadmin',
    appLogoUri: '',
  });

  // APK & ZIP Export state
  const [apkBuildState, setApkBuildState] = useState<'idle' | 'building' | 'ready'>('idle');
  const [apkProgressPct, setApkProgressPct] = useState(0);
  const [isZipping, setIsZipping] = useState(false);

  const activeColor = COLOR_PRESETS.find((p) => p.id === selectedColorPreset) || COLOR_PRESETS[0];
  const activeFont = FONT_PRESETS.find((f) => f.id === selectedFontPreset) || FONT_PRESETS[0];
  const currentVariant = variantsMap[currentScreen] || 'v1';

  const setSingleVariant = (screenId: AdminScreenName, variant: AdminVariant) => {
    setVariantsMap((prev) => ({ ...prev, [screenId]: variant }));
    setCurrentScreen(screenId);
  };

  const batchApplyVariant = (variant: AdminVariant) => {
    const updated = {} as Record<AdminScreenName, AdminVariant>;
    ADMIN_SCREENS.forEach((s) => (updated[s.id] = variant));
    setVariantsMap(updated);
  };

  const handleGenerateAndroidApk = () => {
    setApkBuildState('building');
    setApkProgressPct(25);
    setTimeout(() => setApkProgressPct(65), 500);
    setTimeout(() => {
      setApkProgressPct(100);
      setApkBuildState('ready');
    }, 1100);
  };

  const handleExportZip = () => {
    setIsZipping(true);
    setTimeout(() => {
      const blob = new Blob(
        [
          JSON.stringify(
            {
              project: appBranding.appName,
              packageName: appBranding.packageName,
              theme: activeColor.name,
              isDark,
              screens: variantsMap,
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
      a.download = 'cloth-shop-admin-expo.zip.json';
      a.click();
      setIsZipping(false);
    }, 600);
  };

  const screenBg = isDark ? 'bg-[#090D16] text-white' : 'bg-[#F8FAFC] text-[#0F172A]';

  const renderSimulatedScreen = () => {
    if (isSkeletonActive) {
      return (
        <div className={`p-4 space-y-4 flex-1 ${screenBg}`}>
          <div className="h-12 rounded-2xl bg-slate-300/30 animate-pulse" />
          <div className="h-36 rounded-2xl bg-slate-300/30 animate-pulse" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-24 rounded-2xl bg-slate-300/30 animate-pulse" />
            <div className="h-24 rounded-2xl bg-slate-300/30 animate-pulse" />
          </div>
          <div className="h-44 rounded-2xl bg-slate-300/30 animate-pulse" />
        </div>
      );
    }

    const ScreenComponent =
      SCREEN_VARIANT_COMPONENTS[currentScreen]?.[currentVariant] ||
      SCREEN_VARIANT_COMPONENTS.AdminDashboard.v1;

    return (
      <ScreenComponent
        primaryColor={activeColor.primary}
        isDark={isDark}
        onNavigate={(target: AdminScreenName) => setCurrentScreen(target)}
      />
    );
  };

  const badgeCount = currentVariant === 'v4' ? 12 : 8;
  const activeScreenObj = ADMIN_SCREENS.find((s) => s.id === currentScreen) || ADMIN_SCREENS[0];

  const categories = [
    'All',
    'Overview & Analytics',
    'Sales & POS',
    'Catalog & Stock',
    'CRM & Staff',
    'Settings & Logs',
  ];

  const filteredScreens = ADMIN_SCREENS.filter((s) => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesQuery =
      s.label.toLowerCase().includes(screenSearchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(screenSearchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(screenSearchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  // =========================================================================
  // MIDDLE CONTENT (Changes per activeStudioTab: screens, theme, branding, export)
  // =========================================================================
  const middleContent = (
    <>
      {/* 1. SCREENS & VARIANTS TAB */}
      {activeStudioTab === 'screens' && (
        <div className="max-w-5xl mx-auto space-y-6">
          {/* View Switcher Bar: Grid Directory vs Screen Hierarchy */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <button
                onClick={() => setScreensViewMode('grid')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  screensViewMode === 'grid'
                    ? 'shadow-sm text-white'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
                style={screensViewMode === 'grid' ? { backgroundColor: activeColor.primary } : undefined}
              >
                <LayoutGrid size={13} />
                <span>Grid Directory ({ADMIN_SCREENS.length})</span>
              </button>
              <button
                onClick={() => setScreensViewMode('hierarchy')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  screensViewMode === 'hierarchy'
                    ? 'shadow-sm text-white'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
                style={
                  screensViewMode === 'hierarchy' ? { backgroundColor: activeColor.primary } : undefined
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
              />
              {screenSearchQuery && (
                <button
                  onClick={() => setScreenSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-neutral-400 hover:text-neutral-600"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                    active
                      ? 'shadow-sm text-white'
                      : 'bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                  style={active ? { backgroundColor: activeColor.primary } : undefined}
                >
                  {cat === 'All' ? `All Screens (${ADMIN_SCREENS.length})` : cat}
                </button>
              );
            })}
          </div>

          {/* Batch Set All Screens Bar */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={15} className="text-neutral-500" />
              <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                Batch Set All Screens for Export:
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {(['v1', 'v2', 'v3', 'v4'] as AdminVariant[]).map((v) => (
                <button
                  key={v}
                  onClick={() => batchApplyVariant(v)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                    currentVariant === v
                      ? 'text-white shadow-xs'
                      : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                  }`}
                  style={currentVariant === v ? { backgroundColor: activeColor.primary } : undefined}
                >
                  All {v.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Grid or Hierarchy View */}
          {screensViewMode === 'hierarchy' ? (
            <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Cloth Shop Admin Navigation Tree (screens/&lt;Screen&gt;/varient_1..4/index.tsx)
              </h3>
              <div className="space-y-2">
                {filteredScreens.map((screen) => (
                  <div
                    key={screen.id}
                    onClick={() => setCurrentScreen(screen.id)}
                    className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                  >
                    <div>
                      <span className="text-xs font-bold text-neutral-900 dark:text-white">
                        {screen.label}
                      </span>
                      <span className="ml-2 text-[10px] font-mono text-neutral-400">
                        screens/{screen.id}/varient_{variantsMap[screen.id].replace('v', '')}/index.tsx
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {(['v1', 'v2', 'v3', 'v4'] as AdminVariant[]).map((v) => (
                        <button
                          key={v}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSingleVariant(screen.id, v);
                          }}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            variantsMap[screen.id] === v
                              ? 'text-white'
                              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                          }`}
                          style={
                            variantsMap[screen.id] === v
                              ? { backgroundColor: activeColor.primary }
                              : undefined
                          }
                        >
                          {v.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredScreens.map((item) => {
                const isSelected = currentScreen === item.id;
                const activeVar = variantsMap[item.id] || 'v1';

                return (
                  <div
                    key={item.id}
                    onClick={() => setCurrentScreen(item.id)}
                    className={`rounded-2xl p-4 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white dark:bg-neutral-900 border-2 shadow-md'
                        : 'bg-white dark:bg-neutral-900/70 border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                    }`}
                    style={isSelected ? { borderColor: activeColor.primary } : undefined}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                            {item.category}
                          </span>
                          <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                            {item.label}
                            {isSelected && (
                              <span
                                className="inline-block w-2 h-2 rounded-full"
                                style={{ backgroundColor: activeColor.primary }}
                              />
                            )}
                          </h3>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentScreen(item.id);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition ${
                            isSelected
                              ? 'text-white'
                              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200'
                          }`}
                          style={isSelected ? { backgroundColor: activeColor.primary } : undefined}
                        >
                          <Eye size={11} />
                          <span>{isSelected ? 'Live' : 'Preview'}</span>
                        </button>
                      </div>

                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* 4 Variant Selector Pills */}
                    <div className="pt-2.5 border-t border-neutral-100 dark:border-neutral-800/80">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-semibold text-neutral-400 uppercase">
                          screens/{item.id}/varient_{activeVar.replace('v', '')}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-neutral-600 dark:text-neutral-300">
                          {activeVar.toUpperCase()}
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-1">
                        {(['v1', 'v2', 'v3', 'v4'] as AdminVariant[]).map((v, idx) => {
                          const isVarActive = activeVar === v;
                          return (
                            <button
                              key={v}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSingleVariant(item.id, v);
                              }}
                              title={item.variantNames[idx]}
                              className={`py-1 rounded-md text-[10px] font-bold transition ${
                                isVarActive
                                  ? 'shadow-xs text-white'
                                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                              }`}
                              style={
                                isVarActive ? { backgroundColor: activeColor.primary } : undefined
                              }
                            >
                              {v.toUpperCase()}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 2. DESIGN SYSTEM TAB */}
      {activeStudioTab === 'theme' && (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Color Theme Presets */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                Color Theme Presets
              </h3>
              <p className="text-xs text-neutral-500">
                Instantly re-skin all Cloth Shop Admin screens and exported components.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {COLOR_PRESETS.map((preset) => {
                const active = selectedColorPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedColorPreset(preset.id)}
                    className={`p-3 rounded-xl border text-left transition flex items-center gap-3 ${
                      active
                        ? 'border-2 bg-neutral-50/80 dark:bg-neutral-800/70 shadow-xs'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
                    }`}
                    style={active ? { borderColor: activeColor.primary } : undefined}
                  >
                    <span
                      className="w-7 h-7 rounded-full shadow-inner flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: preset.swatch }}
                    >
                      {active && <Check size={14} color="#FFF" />}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                        {preset.name}
                      </div>
                      <div className="text-[10px] font-mono text-neutral-400 uppercase">
                        {preset.swatch}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Font Family Presets */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                Typography &amp; Font Pairing
              </h3>
              <p className="text-xs text-neutral-500">
                Select global typography scale for headers, KPI cards, and order tables.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {FONT_PRESETS.map((font) => {
                const active = selectedFontPreset === font.id;
                return (
                  <button
                    key={font.id}
                    onClick={() => setSelectedFontPreset(font.id)}
                    className={`p-3.5 rounded-xl border text-left transition ${
                      active
                        ? 'border-2 bg-neutral-50/80 dark:bg-neutral-800/70'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
                    }`}
                    style={active ? { borderColor: activeColor.primary } : undefined}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-neutral-900 dark:text-white">
                        {font.name}
                      </span>
                      {active && <CheckCircle2 size={14} style={{ color: activeColor.primary }} />}
                    </div>
                    <div className="text-[10px] text-neutral-500 mb-2">{font.category}</div>
                    <div className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      Aa Bb Cc — $14,820.50
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Navigation Bar Style */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                Bottom Navigation Bar Architecture
              </h3>
              <p className="text-xs text-neutral-500">
                Choose the bottom navigation dock layout for the mobile admin app.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BOTTOM_NAV_STYLES.map((item) => {
                const active = bottomNavStyle === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setBottomNavStyle(item.id)}
                    className={`p-4 rounded-xl border text-left transition flex items-start justify-between gap-3 ${
                      active
                        ? 'border-2 bg-neutral-50/80 dark:bg-neutral-800/70'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
                    }`}
                    style={active ? { borderColor: activeColor.primary } : undefined}
                  >
                    <div>
                      <div className="text-xs font-bold text-neutral-900 dark:text-white">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-0.5">{item.tagline}</div>
                    </div>
                    {active && <CheckCircle2 size={16} style={{ color: activeColor.primary }} />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 3. APP BRANDING TAB */}
      {activeStudioTab === 'branding' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-5">
            <div>
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                White-Label App Branding &amp; Identity
              </h3>
              <p className="text-xs text-neutral-500">
                Customize your Cloth Shop Admin application name, Android package ID, and icon.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  Application Display Name
                </label>
                <input
                  type="text"
                  value={appBranding.appName}
                  onChange={(e) => setAppBranding({ ...appBranding, appName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  Android / iOS Bundle Identifier
                </label>
                <input
                  type="text"
                  value={appBranding.packageName}
                  onChange={(e) =>
                    setAppBranding({ ...appBranding, packageName: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-mono text-neutral-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                App Icon &amp; Storefront Logo
              </label>
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-md overflow-hidden"
                  style={{ backgroundColor: activeColor.primary }}
                >
                  {appBranding.appLogoUri ? (
                    <img
                      src={appBranding.appLogoUri}
                      alt="App Logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    appBranding.appName.slice(0, 2).toUpperCase()
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 text-xs font-bold flex items-center gap-1.5">
                    <ImagePlus size={14} />
                    <span>Upload Logo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () =>
                            setAppBranding({
                              ...appBranding,
                              appLogoUri: reader.result as string,
                            });
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  {appBranding.appLogoUri && (
                    <button
                      onClick={() => setAppBranding({ ...appBranding, appLogoUri: '' })}
                      className="p-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. BUILD APK & ZIP TAB */}
      {activeStudioTab === 'export' && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Android APK Cloud Builder Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm"
                  style={{ backgroundColor: activeColor.primary }}
                >
                  <Smartphone size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                    One-Click Android APK Builder
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Compile {appBranding.appName} ({appBranding.packageName}) with your selected variants.
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600">
                Expo SDK 52 Ready
              </span>
            </div>

            {apkBuildState === 'idle' && (
              <button
                onClick={handleGenerateAndroidApk}
                className="w-full py-3 rounded-xl text-xs font-bold text-white shadow hover:opacity-95 transition flex items-center justify-center gap-2"
                style={{ backgroundColor: activeColor.primary }}
              >
                <Smartphone size={15} />
                <span>Build Installable Android .APK</span>
              </button>
            )}

            {apkBuildState === 'building' && (
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-bold">
                  <span>Compiling Android Release APK...</span>
                  <span>{apkProgressPct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${apkProgressPct}%`,
                      backgroundColor: activeColor.primary,
                    }}
                  />
                </div>
              </div>
            )}

            {apkBuildState === 'ready' && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    {appBranding.appName.toLowerCase().replace(/\s+/g, '-')}-v1.0.0.apk Ready!
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    Signed universal APK • 10 Admin Screens bundled
                  </div>
                </div>
                <button
                  onClick={handleExportZip}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5"
                  style={{ backgroundColor: activeColor.primary }}
                >
                  <Download size={14} />
                  <span>Download APK</span>
                </button>
              </div>
            )}
          </div>

          {/* Full Source Code ZIP Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm"
                style={{ backgroundColor: activeColor.primary }}
              >
                <FolderGit2 size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                  Full Expo Project Source Code (.ZIP)
                </h3>
                <p className="text-xs text-neutral-500">
                  Export clean production React Native Expo repository with your selected screen variants.
                </p>
              </div>
            </div>

            <button
              onClick={handleExportZip}
              disabled={isZipping}
              className="w-full py-3 rounded-xl text-xs font-bold text-white shadow hover:opacity-95 transition flex items-center justify-center gap-2"
              style={{ backgroundColor: activeColor.primary }}
            >
              <Download size={16} />
              <span>
                {isZipping ? 'Creating Project ZIP...' : 'Download Full Expo Project .ZIP'}
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );

  // =========================================================================
  // MOBILE SIMULATOR CONTENT
  // =========================================================================
  const mobileContent = (
    <div className="flex-1 w-full h-full flex flex-col overflow-hidden">
      <div className="flex-1 w-full h-full flex flex-col overflow-y-auto no-scrollbar">
        {renderSimulatedScreen()}
      </div>

      {/* Exact 4-Tab Bottom Navigation Bar */}
      <div
        className={`h-16 border-t flex items-center justify-around px-2 flex-shrink-0 z-40 ${
          isDark ? 'bg-[#0B0F19] border-slate-800' : 'bg-white border-slate-200/80'
        }`}
      >
        <button
          onClick={() => setCurrentScreen('AdminDashboard')}
          className={`flex flex-col items-center gap-1 relative ${
            currentScreen === 'AdminDashboard'
              ? ''
              : isDark
              ? 'text-slate-400 hover:text-white'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          style={currentScreen === 'AdminDashboard' ? { color: activeColor.primary } : undefined}
        >
          <LayoutDashboard size={20} strokeWidth={2.2} />
          <span className="text-[10px] font-extrabold">Dashboard</span>
        </button>

        <button
          onClick={() => setCurrentScreen('OrderManagement')}
          className={`flex flex-col items-center gap-1 relative ${
            currentScreen === 'OrderManagement' || currentScreen === 'OrderDetails'
              ? ''
              : isDark
              ? 'text-slate-400 hover:text-white'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          style={
            currentScreen === 'OrderManagement' || currentScreen === 'OrderDetails'
              ? { color: activeColor.primary }
              : undefined
          }
        >
          <div className="relative">
            <ShoppingBag size={20} strokeWidth={2.2} />
            <span
              className="absolute -top-1.5 -right-2.5 px-1.5 py-0.2 rounded-full text-white text-[9px] font-extrabold shadow-xs"
              style={{ backgroundColor: activeColor.primary }}
            >
              {badgeCount}
            </span>
          </div>
          <span className="text-[10px] font-bold">Orders</span>
        </button>

        <button
          onClick={() => setCurrentScreen('InventoryCatalog')}
          className={`flex flex-col items-center gap-1 relative ${
            currentScreen === 'InventoryCatalog' || currentScreen === 'ProductEditor'
              ? ''
              : isDark
              ? 'text-slate-400 hover:text-white'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          style={
            currentScreen === 'InventoryCatalog' || currentScreen === 'ProductEditor'
              ? { color: activeColor.primary }
              : undefined
          }
        >
          <Shirt size={20} strokeWidth={2.2} />
          <span className="text-[10px] font-bold">Products</span>
        </button>

        <button
          onClick={() => setCurrentScreen('StoreSettings')}
          className={`flex flex-col items-center gap-1 relative ${
            currentScreen === 'StoreSettings'
              ? ''
              : isDark
              ? 'text-slate-400 hover:text-white'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          style={currentScreen === 'StoreSettings' ? { color: activeColor.primary } : undefined}
        >
          <SlidersHorizontal size={20} strokeWidth={2.2} />
          <span className="text-[10px] font-bold">Settings</span>
        </button>
      </div>
    </div>
  );

  return (
    <StudioDashboardShell
      activeProjectId="cloth_shop_admin"
      projectName="Cloth Shop Admin"
      activeScreenLabel={activeScreenObj.label}
      activeVariantLabel={currentVariant.toUpperCase()}
      activeStudioTab={activeStudioTab}
      onSelectStudioTab={setActiveStudioTab}
      onSwitchProject={onSwitchProject}
      isDark={isDark}
      onToggleTheme={() => setIsDark(!isDark)}
      primaryColor={activeColor.primary}
      primaryTextColor="#FFFFFF"
      isSkeletonActive={isSkeletonActive}
      onToggleSkeleton={() => setIsSkeletonActive(!isSkeletonActive)}
      onExportZip={handleExportZip}
      isZipping={isZipping}
      variantOptions={[
        { id: 'v1', label: `V1 (${activeScreenObj.variantNames[0].replace('V1: ', '')})` },
        { id: 'v2', label: `V2 (${activeScreenObj.variantNames[1].replace('V2: ', '')})` },
        { id: 'v3', label: `V3 (${activeScreenObj.variantNames[2].replace('V3: ', '')})` },
        { id: 'v4', label: `V4 (${activeScreenObj.variantNames[3].replace('V4: ', '')})` },
      ]}
      currentVariantId={currentVariant}
      onChangeVariant={(v) => setSingleVariant(currentScreen, v as AdminVariant)}
      onReloadSimulator={() => setSingleVariant(currentScreen, currentVariant)}
      colorSwatches={COLOR_PRESETS.map((p) => ({ id: p.id, name: p.name, swatch: p.swatch }))}
      activeColorId={selectedColorPreset}
      onSelectColorSwatch={setSelectedColorPreset}
      activeFontName={activeFont.name}
      middleContent={middleContent}
      mobileContent={mobileContent}
    />
  );
}

export default ClothShopAdminApp;
