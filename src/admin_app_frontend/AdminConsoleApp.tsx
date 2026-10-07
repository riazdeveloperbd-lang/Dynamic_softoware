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
  Bell,
  ImagePlus,
  Trash2,
  Sun,
  Moon,
  Palette,
  Type,
  Layers,
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
  ADMIN_BOTTOM_NAV_VARIANTS,
  ADMIN_COLOR_PRESETS,
  ADMIN_FONT_PRESETS,
  AdminBottomNavVariantId,
  AdminDesignSystemContext,
  getAdminThemeScopeStyle,
  resolveAdminColorPalette,
} from './styles/adminDesignSystem';
import AdminBottomNavBar from './components/AdminBottomNavBar';

import OverviewVarient1 from './screens/Overview/varient_1';
import OrdersVarient1 from './screens/Orders/varient_1';
import OrderDetailVarient1 from './screens/OrderDetail/varient_1';
import CustomersVarient1 from './screens/Customers/varient_1';
import AllCustomerDirectoryVarient1 from './screens/AllCustomerDirectory/varient_1';
import CustomerProfileVarient1 from './screens/CustomerProfile/varient_1';
import InventoryVarient1 from './screens/Inventory/varient_1';
import ProductSkuBreakdownVarient1 from './screens/ProductSkuBreakdown/varient_1';
import StoreTaxonomyVarient1 from './screens/StoreTaxonomy/varient_1';
import CategoryProductsVarient1 from './screens/CategoryProducts/varient_1';
import CreateCategoryVarient1 from './screens/CreateCategory/varient_1';

export interface AdminConsoleAppProps {
  onSwitchProject?: (projectId: string) => void;
}

export type AdminConsoleScreenId =
  | 'Overview'
  | 'Orders'
  | 'OrderDetail'
  | 'Customers'
  | 'AllCustomerDirectory'
  | 'CustomerProfile'
  | 'Inventory'
  | 'ProductSkuBreakdown'
  | 'StoreTaxonomy'
  | 'CategoryProducts'
  | 'CreateCategory';

export type AdminVariantId =
  | 'varient_1'
  | 'varient_2'
  | 'varient_3'
  | 'varient_4'
  | 'varient_5'
  | 'varient_6'
  | 'varient_7'
  | 'varient_8';

export const ALL_ADMIN_VARIANT_IDS: AdminVariantId[] = [
  'varient_1',
  'varient_2',
  'varient_3',
  'varient_4',
  'varient_5',
  'varient_6',
  'varient_7',
  'varient_8',
];

interface AdminConsoleScreenConfig {
  id: AdminConsoleScreenId;
  label: string;
  consoleTitle: string;
  hasCustomSubHeader?: boolean;
  parentTab: 'Overview' | 'Orders' | 'Customers' | 'Inventory';
  category: string;
  filePath: string;
  description: string;
  variants: {
    varient_1: string;
    varient_2: string;
    varient_3: string;
    varient_4: string;
    varient_5: string;
    varient_6: string;
    varient_7: string;
    varient_8: string;
  };
}

export const ADMIN_FLOW_GROUPS = [
  'All',
  'Overview & Telemetry',
  'Fulfillment & Orders',
  'Customers & Cohorts',
  'Inventory & Taxonomy',
] as const;

export const ADMIN_APP_SCREENS: AdminConsoleScreenConfig[] = [
  {
    id: 'Overview',
    label: 'Overview',
    consoleTitle: 'Analytics & Overview',
    parentTab: 'Overview',
    category: 'Overview & Telemetry',
    filePath: 'src/screens/Overview',
    description:
      'Executive commerce radar with Today/7D/30D/YTD filters, Gross Revenue ($48,290), Net Margin ($18,420), AOV ($142.50), Conversion (3.42%), and Live Checkout Stream.',
    variants: {
      varient_1: 'V1: 2×2 KPI Grid',
      varient_2: 'V2: Split Ledger Strip',
      varient_3: 'V3: Executive Dark Hero',
      varient_4: 'V4: 4-Col Micro Strip',
      varient_5: 'V5: Accent Rail KPI',
      varient_6: 'V6: Soft Surface Bento',
      varient_7: 'V7: Brutalist KPI Frame',
      varient_8: 'V8: Stacked Telemetry',
    },
  },
  {
    id: 'Orders',
    label: 'Orders',
    consoleTitle: 'Orders',
    parentTab: 'Orders',
    category: 'Fulfillment & Orders',
    filePath: 'src/screens/Orders',
    description:
      'Fulfillment queue with search, All/Pending/Packing/Shipped status tabs, 1-tap Batch Fulfill (14), SLA summary ledger, and interactive order cards (#8942, #8941, #8940).',
    variants: {
      varient_1: 'V1: Horizontal Order Cards',
      varient_2: 'V2: 2-Col Order Grid',
      varient_3: 'V3: Thermal Ticket Cards',
      varient_4: 'V4: Dark Header Orders',
      varient_5: 'V5: Accent Rail Queue',
      varient_6: 'V6: Soft Surface Orders',
      varient_7: 'V7: Brutalist Tickets',
      varient_8: 'V8: Split Footer Orders',
    },
  },
  {
    id: 'OrderDetail',
    label: 'OrderDetail',
    consoleTitle: 'Order Detail',
    hasCustomSubHeader: true,
    parentTab: 'Orders',
    category: 'Fulfillment & Orders',
    filePath: 'src/screens/OrderDetail',
    description:
      'Order #8942 fulfillment picking list with Bin A-14 & B-02 quantity steppers, Marcus Chen VIP Tier 1 destination card, payment ledger ($2,061), and Mark Packed & Print Label.',
    variants: {
      varient_1: 'V1: Picking List Cards',
      varient_2: 'V2: 2-Col Picking Grid',
      varient_3: 'V3: Waybill Manifest',
      varient_4: 'V4: Dark Header Picking',
      varient_5: 'V5: Accent Rail Picking',
      varient_6: 'V6: Soft Surface Picking',
      varient_7: 'V7: Brutalist Waybill',
      varient_8: 'V8: Stacked Bin Cards',
    },
  },
  {
    id: 'Customers',
    label: 'Customers',
    consoleTitle: 'Customers',
    parentTab: 'Customers',
    category: 'Customers & Cohorts',
    filePath: 'src/screens/Customers',
    description:
      'Customer cohort intelligence with VIP Whale / Loyal / At-Risk filter pills, CRM search, Win-Back Playbook triggers, and 30-day cohort retention ledger.',
    variants: {
      varient_1: 'V1: VIP Cohort Cards',
      varient_2: 'V2: 2-Col Buyer Grid',
      varient_3: 'V3: Compact CRM Ledger',
      varient_4: 'V4: Dark Header CRM',
      varient_5: 'V5: Accent Rail Buyers',
      varient_6: 'V6: Soft Surface Cohort',
      varient_7: 'V7: Brutalist VIP Cards',
      varient_8: 'V8: Stacked Footer CRM',
    },
  },
  {
    id: 'AllCustomerDirectory',
    label: 'AllCustomerDirectory',
    consoleTitle: 'All Customer...',
    hasCustomSubHeader: true,
    parentTab: 'Customers',
    category: 'Customers & Cohorts',
    filePath: 'src/screens/AllCustomerDirectory',
    description:
      'Full searchable CRM directory (1,420 buyers) with multi-select batch campaign mode, VIP Whale / Loyal / At-Risk cohort tabs, and $908.8K cumulative LTV summary.',
    variants: {
      varient_1: 'V1: Selectable Buyer Cards',
      varient_2: 'V2: 2-Col Directory Grid',
      varient_3: 'V3: High-Density Table',
      varient_4: 'V4: Dark Header Directory',
      varient_5: 'V5: Accent Rail Directory',
      varient_6: 'V6: Soft Surface Directory',
      varient_7: 'V7: Brutalist Directory',
      varient_8: 'V8: Split Footer Directory',
    },
  },
  {
    id: 'CustomerProfile',
    label: 'CustomerProfile',
    consoleTitle: 'Customer Profile',
    hasCustomSubHeader: true,
    parentTab: 'Customers',
    category: 'Customers & Cohorts',
    filePath: 'src/screens/CustomerProfile',
    description:
      'Marcus Chen VIP Tier 1 (Top 1%) profile with $8,420 lifetime spend, copyable contact actions, recent order history (#8942, #8812, #8704), and 20% VIP Offer dispatch.',
    variants: {
      varient_1: 'V1: VIP Identity Card',
      varient_2: 'V2: Portrait VIP Dossier',
      varient_3: 'V3: Dark VIP Spend Hero',
      varient_4: 'V4: Dark Header Dossier',
      varient_5: 'V5: Accent Rail Profile',
      varient_6: 'V6: Soft Surface VIP',
      varient_7: 'V7: Brutalist VIP Frame',
      varient_8: 'V8: Split Banner Profile',
    },
  },
  {
    id: 'Inventory',
    label: 'Inventory',
    consoleTitle: 'Inventory',
    parentTab: 'Inventory',
    category: 'Inventory & Taxonomy',
    filePath: 'src/screens/Inventory',
    description:
      'Catalog stock matrix with search, Store Taxonomy filter button, category pills (All/Tshirts/Jeans/Shoes), SKU stock badges, and $142,850 retail valuation ledger.',
    variants: {
      varient_1: 'V1: 2-Col Discover Grid',
      varient_2: 'V2: Stock Velocity Cards',
      varient_3: 'V3: Warehouse Bin Ledger',
      varient_4: 'V4: Dark Header SKUs',
      varient_5: 'V5: Accent Rail Stock',
      varient_6: 'V6: Soft Surface Catalog',
      varient_7: 'V7: Brutalist SKU Grid',
      varient_8: 'V8: Banner SKU Cards',
    },
  },
  {
    id: 'ProductSkuBreakdown',
    label: 'ProductSkuBreakdown',
    consoleTitle: 'Product Sku Breakdo...',
    hasCustomSubHeader: true,
    parentTab: 'Inventory',
    category: 'Inventory & Taxonomy',
    filePath: 'src/screens/ProductSkuBreakdown',
    description:
      'SKU #SLG-01 drill-down for Regular Fit Slogan ($1,190) with regional hub allocation pills (NYC/LA/ATL), interactive S/M/L stock steppers, and live valuation sync.',
    variants: {
      varient_1: 'V1: Size Matrix Cards',
      varient_2: 'V2: 3-Col Size Allocation',
      varient_3: 'V3: Compact Bin Table',
      varient_4: 'V4: Dark Header Matrix',
      varient_5: 'V5: Accent Rail Sizes',
      varient_6: 'V6: Soft Surface Matrix',
      varient_7: 'V7: Brutalist Size Frame',
      varient_8: 'V8: Stacked Footer Sizes',
    },
  },
  {
    id: 'StoreTaxonomy',
    label: 'StoreTaxonomy',
    consoleTitle: 'Product Editor',
    hasCustomSubHeader: true,
    parentTab: 'Inventory',
    category: 'Inventory & Taxonomy',
    filePath: 'src/screens/StoreTaxonomy',
    description:
      'Storefront category architecture with Active/Draft status toggles, 30-day category GMV ($84,390), quick drill-down to Category Products, and Create Category action.',
    variants: {
      varient_1: 'V1: Category Cards',
      varient_2: 'V2: 2-Col Collection Grid',
      varient_3: 'V3: Taxonomy Tree Rows',
      varient_4: 'V4: Dark Header Taxonomy',
      varient_5: 'V5: Accent Rail Collections',
      varient_6: 'V6: Soft Surface Taxonomy',
      varient_7: 'V7: Brutalist Taxonomy',
      varient_8: 'V8: Stacked Banner Tree',
    },
  },
  {
    id: 'CategoryProducts',
    label: 'CategoryProducts',
    consoleTitle: 'Category Produ...',
    hasCustomSubHeader: true,
    parentTab: 'Inventory',
    category: 'Inventory & Taxonomy',
    filePath: 'src/screens/CategoryProducts',
    description:
      'Category merchandising view with All / Low Stock / Out of Stock filter pills, live stock count badges, $42,600 category asset ledger, and SKU Matrix inspection.',
    variants: {
      varient_1: 'V1: 2-Col Merch Grid',
      varient_2: 'V2: Merch Stock Cards',
      varient_3: 'V3: Category Stock Ledger',
      varient_4: 'V4: Dark Header Merch',
      varient_5: 'V5: Accent Rail Merch',
      varient_6: 'V6: Soft Surface Merch',
      varient_7: 'V7: Brutalist Merch Grid',
      varient_8: 'V8: Stacked Merch Cards',
    },
  },
  {
    id: 'CreateCategory',
    label: 'CreateCategory',
    consoleTitle: 'Create Category',
    hasCustomSubHeader: true,
    parentTab: 'Inventory',
    category: 'Inventory & Taxonomy',
    filePath: 'src/screens/CreateCategory',
    description:
      'Taxonomy builder with Category Name & URL Slug fields, Top Tier / Sub-Category / Collection pills, assigned product cards with rank steppers, and Publish Category CTA.',
    variants: {
      varient_1: 'V1: Classic Builder Form',
      varient_2: 'V2: 2-Col Assigned Grid',
      varient_3: 'V3: Compact Rule Ledger',
      varient_4: 'V4: Dark Header Builder',
      varient_5: 'V5: Accent Rail Rules',
      varient_6: 'V6: Soft Surface Builder',
      varient_7: 'V7: Brutalist Rule Frame',
      varient_8: 'V8: Stacked Rank Builder',
    },
  },
];

const INITIAL_SELECTED_VARIANTS: Record<AdminConsoleScreenId, AdminVariantId> = {
  Overview: 'varient_1',
  Orders: 'varient_1',
  OrderDetail: 'varient_1',
  Customers: 'varient_1',
  AllCustomerDirectory: 'varient_1',
  CustomerProfile: 'varient_1',
  Inventory: 'varient_1',
  ProductSkuBreakdown: 'varient_1',
  StoreTaxonomy: 'varient_1',
  CategoryProducts: 'varient_1',
  CreateCategory: 'varient_1',
};

export const AdminConsoleApp: React.FC<AdminConsoleAppProps> = ({ onSwitchProject }) => {
  const [activeStudioTab, setActiveStudioTab] = useState<StudioTab>('screens');
  const [screensViewMode, setScreensViewMode] = useState<'grid' | 'hierarchy'>('grid');
  const [selectedFlowGroup, setSelectedFlowGroup] = useState<string>('All');
  const [currentScreen, setCurrentScreen] = useState<AdminConsoleScreenId>('Overview');
  const [selectedVariants, setSelectedVariants] = useState<
    Record<AdminConsoleScreenId, AdminVariantId>
  >(INITIAL_SELECTED_VARIANTS);
  const [screenSearchQuery, setScreenSearchQuery] = useState('');
  const [fontSearchQuery, setFontSearchQuery] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [isSkeletonActive, setIsSkeletonActive] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState<AppColorPresetId>('obsidian');
  const [selectedFontId, setSelectedFontId] = useState<AppFontPresetId>('jakarta');
  const [bottomNavVariant, setBottomNavVariant] =
    useState<AdminBottomNavVariantId>('varient_1');
  const [simToast, setSimToast] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState(false);
  const [apkBuildState, setApkBuildState] = useState<'idle' | 'building' | 'ready'>('idle');
  const [apkDownloadUrl, setApkDownloadUrl] = useState<string | null>(null);
  const logoFileInputRef = useRef<HTMLInputElement | null>(null);

  const [appBranding, setAppBranding] = useState({
    appName: 'Admin App',
    packageName: 'com.appforge.adminapp',
    appLogoUri: '',
  });

  const activeColor = resolveAdminColorPalette(selectedColorId, isDark);
  const activeFont =
    ADMIN_FONT_PRESETS.find((f) => f.id === selectedFontId) ||
    ADMIN_FONT_PRESETS[0];
  const activeBottomNavObj =
    ADMIN_BOTTOM_NAV_VARIANTS.find((b) => b.id === bottomNavVariant) ||
    ADMIN_BOTTOM_NAV_VARIANTS[0];

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty(
        '--app-font-family',
        activeFont.cssStack
      );
    }
  }, [activeFont]);

  const activeScreenConfig =
    ADMIN_APP_SCREENS.find((s) => s.id === currentScreen) || ADMIN_APP_SCREENS[0];
  const activeScreenVariant = selectedVariants[currentScreen] || 'varient_1';

  const triggerToast = (msg: string) => {
    setSimToast(msg);
    setTimeout(() => setSimToast(null), 2200);
  };

  const handleVariantChange = (
    screenId: AdminConsoleScreenId,
    variant: AdminVariantId
  ) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [screenId]: variant,
    }));
  };

  const applyVariantToAllScreens = (variant: AdminVariantId) => {
    const updated = {} as Record<AdminConsoleScreenId, AdminVariantId>;
    ADMIN_APP_SCREENS.forEach((scr) => {
      updated[scr.id] = variant;
    });
    setSelectedVariants(updated);
    triggerToast(
      `Batch set all ${ADMIN_APP_SCREENS.length} screens to ${variant.replace(
        'varient_',
        'V'
      )}`
    );
  };

  const linkableScreens: LinkableScreenItem[] = ADMIN_APP_SCREENS.map((scr) => ({
    id: scr.id,
    label: scr.label,
    moduleGroup: scr.category,
    roleBadge: '8 VARIANTS',
    filePath: `${scr.filePath}/${selectedVariants[scr.id]}/index.tsx`,
    activeVariant: selectedVariants[scr.id],
    variants: ALL_ADMIN_VARIANT_IDS.map((vid, idx) => ({
      id: vid,
      label: scr.variants[vid],
      shortLabel: `V${idx + 1}`,
    })),
  }));

  const [navConnections, setNavConnections] = useState<ScreenNavigationConnection[]>(() =>
    buildDefaultNavigationConnections(linkableScreens, false)
  );

  const groupedDirectories = ADMIN_FLOW_GROUPS.filter((g) => g !== 'All')
    .map((groupName) => {
      const items = ADMIN_APP_SCREENS.filter((scr) => {
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
              screens: ADMIN_APP_SCREENS,
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
      a.download = 'admin-app-expo-source.zip.json';
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
          filename: 'admin-app-v1.0.0.apk',
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
        <div className="space-y-5">
          {/* Switcher & Search (Exact Cloth Shop Middle Top Bar) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
              <button
                type="button"
                onClick={() => setScreensViewMode('grid')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  screensViewMode === 'grid'
                    ? 'shadow-sm text-white'
                    : 'text-neutral-600 dark:text-neutral-400'
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
                <span>Grid Directory ({ADMIN_APP_SCREENS.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setScreensViewMode('hierarchy')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  screensViewMode === 'hierarchy'
                    ? 'shadow-sm text-white'
                    : 'text-neutral-600 dark:text-neutral-400'
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
              />
              {screenSearchQuery && (
                <button
                  type="button"
                  onClick={() => setScreenSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-neutral-400"
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
                setCurrentScreen(screenId as AdminConsoleScreenId);
                if (ALL_ADMIN_VARIANT_IDS.includes(variantId as AdminVariantId)) {
                  handleVariantChange(
                    screenId as AdminConsoleScreenId,
                    variantId as AdminVariantId
                  );
                }
              }}
            />
          ) : (
            /* GRID CARDS VIEW (1:1 Cloth Shop Pattern) */
            <div className="space-y-6">
              {/* Category Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {ADMIN_FLOW_GROUPS.map((flow) => {
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
                        ? `All Screens (${ADMIN_APP_SCREENS.length})`
                        : flow}
                    </button>
                  );
                })}
              </div>

              {/* Quick Batch Variant Selectors */}
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
                      ['varient_6', 'All V6'],
                      ['varient_7', 'All V7'],
                      ['varient_8', 'All V8'],
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

              {/* Screen Cards Grid Grouped by Category */}
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
                        const vKeys: AdminVariantId[] = ALL_ADMIN_VARIANT_IDS;

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

                            {/* 3 Variant Selector Buttons in 2-Column Grid (1:1 Cloth Shop Pattern) */}
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
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
                  <Palette size={16} style={{ color: activeColor.primary }} />
                  <span>Brand Color Palette (7 Luxury Themes)</span>
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Click any palette to dynamically restyle buttons, badges, navigation, and surfaces across all {ADMIN_APP_SCREENS.length} Admin App screens.
                </p>
              </div>

              {/* Light / Dark Appearance Mode Switcher */}
              <div className="flex items-center p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 self-start">
                <button
                  type="button"
                  onClick={() => {
                    setIsDark(false);
                    triggerToast('Switched Admin App to Light Mode');
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
                    triggerToast('Switched Admin App to Dark Mode');
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
              {ADMIN_COLOR_PRESETS.map((preset) => {
                const isSelected = selectedColorId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      setSelectedColorId(preset.id);
                      triggerToast(`Applied ${preset.name} palette across all 11 screens`);
                    }}
                    className={`p-3.5 rounded-xl border-2 text-left flex items-center justify-between gap-3 transition cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-50 dark:bg-neutral-800/80 shadow-xs'
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
                        className="w-9 h-9 rounded-xl shadow-xs border border-black/10 flex-shrink-0"
                        style={{ backgroundColor: preset.swatch }}
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-extrabold text-neutral-900 dark:text-white truncate">
                          {preset.name}
                        </div>
                        <div className="text-[10px] text-neutral-500 truncate">
                          {preset.tagline}
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
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
                  <Type size={16} style={{ color: activeColor.primary }} />
                  <span>Curated Typography ({ADMIN_FONT_PRESETS.length} Premium Fonts)</span>
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Select any Google Font family to dynamically restyle typography across all {ADMIN_APP_SCREENS.length} Admin App screens.
                </p>
              </div>
              <span
                className="text-xs font-mono font-bold px-3 py-1 rounded-lg self-start"
                style={{
                  backgroundColor: activeColor.primary,
                  color: activeColor.primaryText,
                }}
              >
                Active: {activeFont.name}
              </span>
            </div>

            {/* Font Search Filter */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-2.5 text-neutral-400" />
              <input
                type="text"
                value={fontSearchQuery}
                onChange={(e) => setFontSearchQuery(e.target.value)}
                placeholder="Search 22 curated fonts by name or style (Serif, Sans, Mono)..."
                className="w-full pl-9 pr-8 py-2 bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs text-neutral-900 dark:text-white focus:outline-none"
                style={{
                  borderColor: fontSearchQuery ? activeColor.primary : undefined,
                }}
              />
              {fontSearchQuery && (
                <button
                  type="button"
                  onClick={() => setFontSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-neutral-400 hover:text-neutral-600 cursor-pointer"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1">
              {ADMIN_FONT_PRESETS.filter(
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
                      triggerToast(`Applied ${fp.name} font across all 11 screens`);
                    }}
                    className={`p-3.5 rounded-xl border-2 text-left flex items-start justify-between gap-2 transition cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-50 dark:bg-neutral-800 shadow-xs'
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
                    <div className="min-w-0">
                      <div
                        className="text-base font-bold text-neutral-900 dark:text-white leading-tight truncate"
                        style={{ fontFamily: fp.cssStack }}
                      >
                        Aa · {fp.name}
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-1 truncate">
                        {fp.category}
                      </div>
                      <div
                        className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 mt-1.5"
                        style={{ fontFamily: fp.cssStack }}
                      >
                        $48,290.00 • #8942
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
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white flex items-center gap-2">
                  <Layers size={16} style={{ color: activeColor.primary }} />
                  <span>Bottom Navigation Bar Designs ({ADMIN_BOTTOM_NAV_VARIANTS.length} Styles)</span>
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Choose any of the {ADMIN_BOTTOM_NAV_VARIANTS.length} bottom tab bar variants for the Admin App simulator. All styles dynamically adapt to your selected Brand Color Palette.
                </p>
              </div>
              <span
                className="text-xs font-mono font-bold px-3 py-1 rounded-lg self-start"
                style={{
                  backgroundColor: activeColor.primary,
                  color: activeColor.primaryText,
                }}
              >
                Active: {activeBottomNavObj.name}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {ADMIN_BOTTOM_NAV_VARIANTS.map((nav) => {
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
                        ? 'bg-neutral-50 dark:bg-neutral-800 shadow-xs'
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
                      <div className="text-xs font-extrabold text-neutral-900 dark:text-white">
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
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-2xs space-y-6">
            <div>
              <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                Admin App Branding &amp; Launcher Configuration
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Customize your Admin App logo, display name, and Android / iOS package bundle ID.
              </p>
            </div>

            {/* Logo Uploader */}
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl border border-neutral-300 dark:border-neutral-700 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-xs"
                style={{
                  backgroundColor: activeColor.primary,
                  color: activeColor.primaryText,
                }}
              >
                {appBranding.appLogoUri ? (
                  <img
                    src={appBranding.appLogoUri}
                    alt="Admin App Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-black">
                    {(appBranding.appName.trim()[0] || 'A').toUpperCase()}
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
                        triggerToast('Updated Admin App launcher logo');
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
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs hover:opacity-95 cursor-pointer"
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
                  placeholder="Or paste logo image URL..."
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-neutral-600 dark:text-neutral-300">
                  App Display Name
                </label>
                <input
                  type="text"
                  value={appBranding.appName}
                  onChange={(e) =>
                    setAppBranding({ ...appBranding, appName: e.target.value })
                  }
                  className="w-full mt-1 px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-bold text-neutral-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-600 dark:text-neutral-300">
                  Android / iOS Package Name
                </label>
                <input
                  type="text"
                  value={appBranding.packageName}
                  onChange={(e) =>
                    setAppBranding({ ...appBranding, packageName: e.target.value })
                  }
                  className="w-full mt-1 px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-xs font-mono text-neutral-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeStudioTab === 'export' && (
        <div className="max-w-2xl space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: activeColor.primary }}
              >
                <Smartphone size={20} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                  Build Installable Android .APK — {appBranding.appName}
                </h3>
                <p className="text-xs text-neutral-500">
                  Compiles all {ADMIN_APP_SCREENS.length} Admin App screens with selected variants, {activeColor.name}, {activeFont.name}, and {activeBottomNavObj.name}.
                </p>
              </div>
            </div>

            {apkBuildState === 'ready' ? (
              <a
                href={apkDownloadUrl || '#'}
                download="admin-app-v1.0.0.apk"
                className="w-full py-3 rounded-xl bg-emerald-600 text-white text-xs font-extrabold flex items-center justify-center gap-2"
              >
                <Download size={15} />
                <span>Download Signed admin-app-v1.0.0.apk</span>
              </a>
            ) : (
              <button
                type="button"
                disabled={apkBuildState === 'building'}
                onClick={handleBuildApk}
                style={{ backgroundColor: activeColor.primary }}
                className="w-full py-3 rounded-xl text-white text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Smartphone size={15} />
                <span>
                  {apkBuildState === 'building'
                    ? 'Building Signed Android APK...'
                    : 'Generate Android .APK'}
                </span>
              </button>
            )}
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: activeColor.primary }}
              >
                <FolderGit2 size={20} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                  Export Full Expo Source Code (.ZIP)
                </h3>
                <p className="text-xs text-neutral-500">
                  Includes all {ADMIN_APP_SCREENS.length} Admin App screens (8 variants each), Design System tokens &amp; navigation links.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleExportZip}
              style={{ backgroundColor: activeColor.primary }}
              className="w-full py-3 rounded-xl text-white text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download size={15} />
              <span>Download Admin App Source .ZIP</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // =========================================================================
  // MOBILE SIMULATOR CONTENT (Wrapped in .admin-theme-scope + Design System)
  // =========================================================================
  const mobileContent = (
    <div
      className="admin-theme-scope flex-1 w-full h-full flex flex-col overflow-hidden relative select-none transition-colors"
      style={getAdminThemeScopeStyle(activeColor, activeFont)}
      data-admin-dark={isDark ? 'true' : 'false'}
      data-admin-preset={selectedColorId}
    >
      {/* Toast Notification inside Simulator */}
      {simToast && (
        <div
          className="absolute top-16 left-3 right-3 z-50 text-white text-[11px] font-bold px-3.5 py-2 rounded-xl shadow-lg flex items-center justify-between"
          style={{ backgroundColor: activeColor.primary }}
        >
          <span>{simToast}</span>
          <CheckCircle2 size={13} className="text-emerald-300 flex-shrink-0" />
        </div>
      )}

      {/* TOP CLOTH SHOP HEADER BAR (Rendered for the 4 root tab screens; drill-down screens render their own back-arrow header) */}
      {!activeScreenConfig.hasCustomSubHeader && (
        <div
          className="px-5 pt-4 pb-2 flex items-center justify-between flex-shrink-0 z-30 transition-colors"
          style={{
            backgroundColor: activeColor.background,
          }}
        >
          <h1
            className="text-[26px] font-bold tracking-tight leading-none truncate"
            style={{ color: activeColor.textPrimary }}
          >
            {activeScreenConfig.consoleTitle}
          </h1>

          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              type="button"
              onClick={() => triggerToast('3 unread priority dispatch notifications')}
              className="relative w-9 h-9 flex items-center justify-center cursor-pointer"
              style={{ color: activeColor.textPrimary }}
              title="Notifications"
            >
              <Bell size={22} strokeWidth={2} />
            </button>
          </div>
        </div>
      )}

      {/* SCROLLABLE SCREEN VIEWPORT */}
      <div className="flex-1 w-full overflow-y-auto no-scrollbar">
        {isSkeletonActive ? (
          <div className="p-4 space-y-4">
            <div className="h-14 rounded-2xl bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-24 rounded-2xl bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
              <div className="h-24 rounded-2xl bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
              <div className="h-24 rounded-2xl bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
              <div className="h-24 rounded-2xl bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
            </div>
            <div className="h-44 rounded-3xl bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
          </div>
        ) : (
          <>
            {currentScreen === 'Overview' && (
              <OverviewVarient1
                variant={activeScreenVariant}
                onNavigateToOrders={() => setCurrentScreen('Orders')}
                onNavigateToCustomers={() => setCurrentScreen('Customers')}
                onNavigateToInventory={() => setCurrentScreen('Inventory')}
                onTriggerToast={triggerToast}
              />
            )}
            {currentScreen === 'Orders' && (
              <OrdersVarient1
                variant={activeScreenVariant}
                onOpenOrderDetail={() => setCurrentScreen('OrderDetail')}
                onTriggerToast={triggerToast}
              />
            )}
            {currentScreen === 'OrderDetail' && (
              <OrderDetailVarient1
                variant={activeScreenVariant}
                onBack={() => setCurrentScreen('Orders')}
                onOpenCustomerProfile={() => setCurrentScreen('CustomerProfile')}
                onTriggerToast={triggerToast}
              />
            )}
            {currentScreen === 'Customers' && (
              <CustomersVarient1
                variant={activeScreenVariant}
                onOpenCustomerProfile={() => setCurrentScreen('CustomerProfile')}
                onOpenAllCustomerDirectory={() =>
                  setCurrentScreen('AllCustomerDirectory')
                }
                onTriggerToast={triggerToast}
              />
            )}
            {currentScreen === 'AllCustomerDirectory' && (
              <AllCustomerDirectoryVarient1
                variant={activeScreenVariant}
                onBack={() => setCurrentScreen('Customers')}
                onOpenCustomerProfile={() => setCurrentScreen('CustomerProfile')}
                onTriggerToast={triggerToast}
              />
            )}
            {currentScreen === 'CustomerProfile' && (
              <CustomerProfileVarient1
                variant={activeScreenVariant}
                onBack={() => setCurrentScreen('Customers')}
                onViewOrderDetail={() => setCurrentScreen('OrderDetail')}
                onViewAllCustomers={() => setCurrentScreen('AllCustomerDirectory')}
                onTriggerToast={triggerToast}
              />
            )}
            {currentScreen === 'Inventory' && (
              <InventoryVarient1
                variant={activeScreenVariant}
                onOpenSkuBreakdown={() => setCurrentScreen('ProductSkuBreakdown')}
                onOpenStoreTaxonomy={() => setCurrentScreen('StoreTaxonomy')}
                onOpenCreateCategory={() => setCurrentScreen('CreateCategory')}
                onTriggerToast={triggerToast}
              />
            )}
            {currentScreen === 'ProductSkuBreakdown' && (
              <ProductSkuBreakdownVarient1
                variant={activeScreenVariant}
                onBack={() => setCurrentScreen('Inventory')}
                onEditProduct={() => setCurrentScreen('StoreTaxonomy')}
                onTriggerToast={triggerToast}
              />
            )}
            {currentScreen === 'StoreTaxonomy' && (
              <StoreTaxonomyVarient1
                variant={activeScreenVariant}
                onBack={() => setCurrentScreen('Inventory')}
                onAddCategory={() => setCurrentScreen('CreateCategory')}
                onOpenCategoryProducts={() => setCurrentScreen('CategoryProducts')}
                onTriggerToast={triggerToast}
              />
            )}
            {currentScreen === 'CategoryProducts' && (
              <CategoryProductsVarient1
                variant={activeScreenVariant}
                onBack={() => setCurrentScreen('StoreTaxonomy')}
                onAddProduct={() => setCurrentScreen('CreateCategory')}
                onOpenSkuBreakdown={() => setCurrentScreen('ProductSkuBreakdown')}
                onTriggerToast={triggerToast}
              />
            )}
            {currentScreen === 'CreateCategory' && (
              <CreateCategoryVarient1
                variant={activeScreenVariant}
                onBack={() => setCurrentScreen('StoreTaxonomy')}
                onCreatedCategory={() => setCurrentScreen('StoreTaxonomy')}
                onTriggerToast={triggerToast}
              />
            )}
          </>
        )}
      </div>

      {/* 6-VARIANT SELECTABLE BOTTOM NAVIGATION BAR (Overview • Orders • Customers • Inventory) */}
      <AdminBottomNavBar
        activeTab={activeScreenConfig.parentTab}
        onSelectTab={(tab) => setCurrentScreen(tab)}
        variantOverride={bottomNavVariant}
      />
    </div>
  );

  return (
    <AdminDesignSystemContext.Provider
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
      }}
    >
      <StudioDashboardShell
        activeProjectId="admin_app"
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
          { id: 'varient_6', label: 'Variant 6' },
          { id: 'varient_7', label: 'Variant 7' },
          { id: 'varient_8', label: 'Variant 8' },
        ]}
        currentVariantId={activeScreenVariant}
        onChangeVariant={(v) =>
          handleVariantChange(currentScreen, v as AdminVariantId)
        }
        onReloadSimulator={() =>
          triggerToast(
            `Reloaded ${activeScreenConfig.label} (${activeScreenVariant.replace(
              'varient_',
              'V'
            )})`
          )
        }
        colorSwatches={ADMIN_COLOR_PRESETS.map((p) => ({
          id: p.id,
          name: p.name,
          swatch: p.swatch,
        }))}
        activeColorId={selectedColorId}
        onSelectColorSwatch={(id) => {
          setSelectedColorId(id as AppColorPresetId);
          const found = ADMIN_COLOR_PRESETS.find((p) => p.id === id);
          if (found) {
            triggerToast(`Applied ${found.name} palette`);
          }
        }}
        activeFontName={activeFont.name}
        middleContent={middleContent}
        mobileContent={mobileContent}
      />
    </AdminDesignSystemContext.Provider>
  );
};

export default AdminConsoleApp;
