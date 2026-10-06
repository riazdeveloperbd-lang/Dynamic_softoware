import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Layers,
  LayoutGrid,
  Palette,
  AppWindow,
  Download,
  Sun,
  Moon,
  ChevronRight,
  Plus,
  QrCode,
  Sparkles,
  ShoppingBag,
  Zap,
  ArrowRight,
  Shield,
  ShieldCheck,
  KeyRound,
  Coins,
  Receipt,
  Users,
  Calculator,
  Sliders,
  Check,
  RotateCcw,
  Maximize2,
  ExternalLink,
  Package,
  TrendingUp,
  CreditCard,
  Building2,
  Utensils,
  Dumbbell,
  Clock,
  Lock,
  Unlock,
  FolderTree,
  Undo2,
  Redo2,
  History,
} from 'lucide-react';
import { AppTab } from './components/BottomNav';
import { OrderManageMobileApp, SubViewType } from './components/OrderManageMobileApp';
import { downloadOrderManageExpoZip } from './utils/exportOrderManageZip';
import { useAppTheme, AppThemeProvider } from './context/ThemeContext';
import { LedgerProvider, useLedger } from './context/LedgerContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { OrderManageScreenHierarchyTree, OrderManageVariant } from './component/OrderManageScreenHierarchyTree';
import StudioDashboardShell from '../components/StudioDashboardShell';
import QRCode from 'qrcode';

interface OrderManageAppProps {
  onSwitchProject?: (projectId: string) => void;
}

const COLOR_PRESETS = [
  { id: 'emerald', name: 'Emerald Fintech', primary: '#10b981', primaryLight: '#34d399', glow: '#064e3b' },
  { id: 'sapphire', name: 'Sapphire Royal', primary: '#2563eb', primaryLight: '#60a5fa', glow: '#1e3a8a' },
  { id: 'violet', name: 'Violet Luxe', primary: '#8b5cf6', primaryLight: '#a78bfa', glow: '#4c1d95' },
  { id: 'amber', name: 'Amber Gold', primary: '#f59e0b', primaryLight: '#fbbf24', glow: '#78350f' },
  { id: 'crimson', name: 'Ruby Luxury', primary: '#f43f5e', primaryLight: '#fb7185', glow: '#881337' },
  { id: 'cyan', name: 'Cyber Cyan', primary: '#06b6d4', primaryLight: '#22d3ee', glow: '#164e63' },
];

export const SCREENS_CATALOG = [
  {
    id: 'dashboard',
    name: 'Home Executive Dashboard',
    category: 'Main Tabs',
    description: 'Remittance Net Position, KPI cards, pending emergency queue, fast action shortcuts.',
    tab: 'dashboard' as AppTab,
    subView: null as SubViewType,
    badge: 'Core Tab',
  },
  {
    id: 'orders',
    name: 'Orders & Deliveries Hub',
    category: 'Main Tabs',
    description: 'Filter orders by status (Pending, Delivered, Emergency, Agent, Personal), live search.',
    tab: 'orders' as AppTab,
    subView: null as SubViewType,
    badge: 'Core Tab',
  },
  {
    id: 'finance',
    name: 'Finance & Riyal Treasury',
    category: 'Main Tabs',
    description: 'Treasury balance, SAR Riyal ledger, payment disbursements, profit & loss analysis.',
    tab: 'finance' as AppTab,
    subView: null as SubViewType,
    badge: 'Core Tab',
  },
  {
    id: 'customers',
    name: 'Clients & Customer Directory',
    category: 'Main Tabs',
    description: 'Customer contact cards, transaction history, outstanding receivables, call & WhatsApp.',
    tab: 'customers' as AppTab,
    subView: null as SubViewType,
    badge: 'Core Tab',
  },
  {
    id: 'more',
    name: 'More & Management Hub',
    category: 'Main Tabs',
    description: 'Security PIN, reports exporter (PDF/JSON), reset data, exchange rate controls.',
    tab: 'more' as AppTab,
    subView: null as SubViewType,
    badge: 'Core Tab',
  },
  {
    id: 'calculator',
    name: 'SAR / BDT Remittance Calculator',
    category: 'Financial Tools',
    description: 'Real-time currency exchange conversion with spread margin and BDT net payout.',
    tab: 'dashboard' as AppTab,
    subView: 'calculator' as SubViewType,
    badge: 'Tool View',
  },
  {
    id: 'queue',
    name: 'Emergency Priority Queue',
    category: 'Order Management',
    description: 'Urgent priority dispatch board sorted by urgency and creation timestamp.',
    tab: 'orders' as AppTab,
    subView: 'queue' as SubViewType,
    badge: 'Special View',
  },
  {
    id: 'riyal',
    name: 'SAR Riyal Settlement Ledger',
    category: 'Financial Tools',
    description: 'Customer-specific SAR Riyal expected vs received ledger entries and settlements.',
    tab: 'finance' as AppTab,
    subView: 'riyal' as SubViewType,
    badge: 'Ledger View',
  },
  {
    id: 'payments',
    name: 'Disbursements & Payment Outflows',
    category: 'Financial Tools',
    description: 'Recorded disbursement vouchers with method tag, proof screenshot, and timestamp.',
    tab: 'finance' as AppTab,
    subView: 'payments' as SubViewType,
    badge: 'Voucher View',
  },
  {
    id: 'profitLoss',
    name: 'Profit & Loss Analytical Breakdown',
    category: 'Financial Tools',
    description: 'Revenue, delivered remittance, payments paid out, and net operational margin.',
    tab: 'finance' as AppTab,
    subView: 'profitLoss' as SubViewType,
    badge: 'Analytics',
  },
  {
    id: 'activity',
    name: 'Live Audit Log & Activity Stream',
    category: 'System & Security',
    description: 'Real-time audit log recording every order creation, delivery fulfillment, and payment.',
    tab: 'more' as AppTab,
    subView: 'activity' as SubViewType,
    badge: 'Audit View',
  },
  {
    id: 'pinLock',
    name: '4-Digit Executive PIN Security Screen',
    category: 'System & Security',
    description: 'Hardware-grade PIN lock screen protecting client and treasury transaction data.',
    tab: 'dashboard' as AppTab,
    subView: null as SubViewType,
    badge: 'Security',
  },
];

interface SnapshotHistory {
  tab: AppTab;
  subView: SubViewType;
  variantsMap: Record<string, OrderManageVariant>;
  label: string;
}

function InnerOrderManageDashboard({ onSwitchProject }: OrderManageAppProps) {
  const { colors, isDark, toggleTheme, selectedColorPreset, setColorPreset } = useAppTheme();
  const { totals, settings } = useLedger();

  // Studio State
  const [activeStudioTab, setActiveStudioTab] = useState<'screens' | 'theme' | 'branding' | 'export'>('screens');
  const [screensViewMode, setScreensViewMode] = useState<'grid' | 'hierarchy'>('grid');
  const [bottomNavVariant, setBottomNavVariant] = useState<'varient_1' | 'varient_2' | 'varient_3' | 'varient_4' | 'varient_5'>('varient_1');
  const [targetTab, setTargetTab] = useState<AppTab>('dashboard');
  const [targetSubView, setTargetSubView] = useState<SubViewType>(null);
  const [bypassAuth, setBypassAuth] = useState(true);
  const [showHeader, setShowHeader] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [scale, setScale] = useState<number>(0.95);
  const [addAppModalOpen, setAddAppModalOpen] = useState(false);

  // Variant Map for each screen (Default V1 for all)
  const [variantsMap, setVariantsMap] = useState<Record<string, OrderManageVariant>>({
    dashboard: 'v1',
    orders: 'v1',
    finance: 'v1',
    customers: 'v1',
    more: 'v1',
    calculator: 'v1',
    queue: 'v1',
    riyal: 'v1',
    payments: 'v1',
    profitLoss: 'v1',
    activity: 'v1',
    pinLock: 'v1',
  });

  // Undo / Redo Stack
  const [historyStack, setHistoryStack] = useState<SnapshotHistory[]>([
    {
      tab: 'dashboard',
      subView: null,
      variantsMap: {
        dashboard: 'v1',
        orders: 'v1',
        finance: 'v1',
        customers: 'v1',
        more: 'v1',
        calculator: 'v1',
        queue: 'v1',
        riyal: 'v1',
        payments: 'v1',
        profitLoss: 'v1',
        activity: 'v1',
        pinLock: 'v1',
      },
      label: 'Initial State (Home V1)',
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const pushSnapshot = (
    newTab: AppTab,
    newSubView: SubViewType,
    newVariants: Record<string, OrderManageVariant>,
    label: string
  ) => {
    const sliced = historyStack.slice(0, historyIndex + 1);
    const nextSnapshot: SnapshotHistory = {
      tab: newTab,
      subView: newSubView,
      variantsMap: { ...newVariants },
      label,
    };
    setHistoryStack([...sliced, nextSnapshot]);
    setHistoryIndex(sliced.length);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = historyStack[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setTargetTab(prev.tab);
      setTargetSubView(prev.subView);
      setVariantsMap(prev.variantsMap);
    }
  };

  const handleRedo = () => {
    if (historyIndex < historyStack.length - 1) {
      const next = historyStack[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setTargetTab(next.tab);
      setTargetSubView(next.subView);
      setVariantsMap(next.variantsMap);
    }
  };

  // Keyboard shortcuts (Cmd+Z / Ctrl+Z, Cmd+Shift+Z / Ctrl+Y)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        handleUndo();
      } else if (
        ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'z') ||
        ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'y')
      ) {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, historyStack]);

  const setSingleVariant = (screenId: string, variant: OrderManageVariant) => {
    const updated = { ...variantsMap, [screenId]: variant };
    setVariantsMap(updated);
    pushSnapshot(targetTab, targetSubView, updated, `Set ${screenId} to ${variant.toUpperCase()}`);
  };

  const batchApplyVariant = (variant: OrderManageVariant) => {
    const updated = { ...variantsMap };
    Object.keys(updated).forEach((key) => {
      updated[key] = variant;
    });
    setVariantsMap(updated);
    pushSnapshot(targetTab, targetSubView, updated, `Batch set all screens to ${variant.toUpperCase()}`);
  };

  const activeColor = COLOR_PRESETS.find((p) => p.id === selectedColorPreset) || COLOR_PRESETS[0];

  const activeScreenObj = SCREENS_CATALOG.find(
    (s) => s.tab === targetTab && s.subView === targetSubView
  ) || SCREENS_CATALOG[0];

  const currentActiveVariant = variantsMap[activeScreenObj.id] || 'v1';

  const handleExportZip = async () => {
    setIsZipping(true);
    try {
      await downloadOrderManageExpoZip();
    } catch (e) {
      console.error(e);
    } finally {
      setIsZipping(false);
    }
  };

  const extraTopActions = (
    <div className="flex items-center gap-2">
      <div className="flex items-center p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
        <button
          onClick={handleUndo}
          disabled={historyIndex <= 0}
          className={`p-1.5 rounded-lg text-xs font-bold transition ${
            historyIndex > 0
              ? 'text-neutral-800 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700'
              : 'text-neutral-400 dark:text-neutral-600 cursor-not-allowed'
          }`}
          title="Undo (Ctrl+Z)"
        >
          <Undo2 size={14} />
        </button>
        <span className="text-[10px] font-mono px-1.5 text-neutral-500 dark:text-neutral-400">
          {historyIndex + 1}/{historyStack.length}
        </span>
        <button
          onClick={handleRedo}
          disabled={historyIndex >= historyStack.length - 1}
          className={`p-1.5 rounded-lg text-xs font-bold transition ${
            historyIndex < historyStack.length - 1
              ? 'text-neutral-800 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700'
              : 'text-neutral-400 dark:text-neutral-600 cursor-not-allowed'
          }`}
          title="Redo (Ctrl+Y)"
        >
          <Redo2 size={14} />
        </button>
      </div>

      <button
        onClick={() => setBypassAuth(!bypassAuth)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition ${
          bypassAuth
            ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
            : 'border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400'
        }`}
        title={bypassAuth ? 'PIN Security Bypassed (Live Preview Mode)' : 'PIN Lock Active (Enter PIN 1234)'}
      >
        {bypassAuth ? <Unlock size={14} /> : <Lock size={14} />}
        <span>{bypassAuth ? 'PIN Open' : 'PIN Locked'}</span>
      </button>
    </div>
  );

  const middleContent = (
    <>
          {/* TAB 1: SCREENS & VARIANTS DIRECTORY */}
          {activeStudioTab === 'screens' && (
            <div className="max-w-5xl mx-auto space-y-6">
              {/* View Switcher Bar & Batch Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="flex items-center p-1 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                    <button
                      onClick={() => setScreensViewMode('grid')}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        screensViewMode === 'grid'
                          ? 'shadow-sm text-white'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                      style={
                        screensViewMode === 'grid'
                          ? { backgroundColor: activeColor.primary }
                          : undefined
                      }
                    >
                      <LayoutGrid size={13} />
                      <span>Grid Directory ({SCREENS_CATALOG.length})</span>
                    </button>
                    <button
                      onClick={() => setScreensViewMode('hierarchy')}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        screensViewMode === 'hierarchy'
                          ? 'shadow-sm text-white'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                      style={
                        screensViewMode === 'hierarchy'
                          ? { backgroundColor: activeColor.primary }
                          : undefined
                      }
                    >
                      <FolderTree size={13} />
                      <span>Hierarchy Tree</span>
                    </button>
                  </div>
                </div>

                {/* Batch Variant Action Buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400">Global Batch Variant:</span>
                  {(['v1', 'v2', 'v3'] as OrderManageVariant[]).map((v) => (
                    <button
                      key={v}
                      onClick={() => batchApplyVariant(v)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 transition"
                    >
                      Set All {v.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* View Mode 1: Grid Directory */}
              {screensViewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {SCREENS_CATALOG.map((screen) => {
                    const isCurrent =
                      targetTab === screen.tab && targetSubView === screen.subView;
                    const activeVar = variantsMap[screen.id] || 'v1';

                    return (
                      <div
                        key={screen.id}
                        className={`group rounded-2xl border p-4 transition-all duration-200 flex flex-col justify-between ${
                          isCurrent
                            ? 'border-2 bg-white dark:bg-[#181a22] shadow-lg'
                            : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#14161d] hover:border-neutral-400 dark:hover:border-neutral-700'
                        }`}
                        style={
                          isCurrent
                            ? {
                                borderColor: activeColor.primary,
                                boxShadow: `0 4px 20px -2px ${activeColor.primary}25`,
                              }
                            : undefined
                        }
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                              style={{
                                backgroundColor: isCurrent ? `${activeColor.primary}25` : isDark ? '#262933' : '#f1f5f9',
                                color: isCurrent ? activeColor.primary : isDark ? '#9ca3af' : '#64748b',
                              }}
                            >
                              {screen.category}
                            </span>
                            <span className="text-[10px] font-mono text-neutral-500">
                              {screen.badge}
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-neutral-900 dark:text-white transition">
                            {screen.name}
                          </h3>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 line-clamp-2 leading-relaxed">
                            {screen.description}
                          </p>
                        </div>

                        <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between gap-2">
                          {/* Variant selection pills */}
                          <div className="flex items-center gap-1">
                            {(['v1', 'v2', 'v3'] as OrderManageVariant[]).map((v) => {
                              const isSelected = activeVar === v;
                              return (
                                <button
                                  key={v}
                                  onClick={() => setSingleVariant(screen.id, v)}
                                  className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase transition ${
                                    isSelected
                                      ? 'text-white shadow-sm'
                                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                                  }`}
                                  style={
                                    isSelected
                                      ? { backgroundColor: activeColor.primary }
                                      : undefined
                                  }
                                >
                                  {v.toUpperCase()}
                                </button>
                              );
                            })}
                          </div>

                          {/* Launch button */}
                          <button
                            onClick={() => {
                              setTargetTab(screen.tab);
                              setTargetSubView(screen.subView);
                              if (screen.id === 'pinLock') {
                                setBypassAuth(false);
                              } else {
                                setBypassAuth(true);
                              }
                              pushSnapshot(screen.tab, screen.subView, variantsMap, `Select ${screen.name}`);
                            }}
                            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition"
                            style={{
                              backgroundColor: isCurrent ? activeColor.primary : isDark ? '#262933' : '#f1f5f9',
                              color: isCurrent ? '#ffffff' : isDark ? '#d1d5db' : '#334155',
                            }}
                          >
                            <span>{isCurrent ? 'Viewing' : 'Preview'}</span>
                            <ArrowRight size={13} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* View Mode 2: Screen Hierarchy Tree */}
              {screensViewMode === 'hierarchy' && (
                <OrderManageScreenHierarchyTree
                  currentTab={targetTab}
                  currentSubView={targetSubView}
                  variantsMap={variantsMap}
                  onSelectNode={(tab, subView, nodeId) => {
                    setTargetTab(tab);
                    setTargetSubView(subView);
                    if (nodeId === 'pin_lock_screen') {
                      setBypassAuth(false);
                    } else {
                      setBypassAuth(true);
                    }
                    pushSnapshot(tab, subView, variantsMap, `Hierarchy select ${nodeId}`);
                  }}
                  onSetVariant={(nodeId, v) => setSingleVariant(nodeId, v)}
                  accentColor={activeColor.primary}
                />
              )}
            </div>
          )}

          {/* TAB 2: DESIGN SYSTEM */}
          {activeStudioTab === 'theme' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-[#14161d] border border-neutral-200 dark:border-neutral-800 space-y-4">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Color Presets</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Select a theme color palette to customize brand elements across the Order Management app and studio.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => setColorPreset(preset.id)}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition ${
                        selectedColorPreset === preset.id
                          ? 'border-2 bg-neutral-50 dark:bg-[#181b24]'
                          : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#12141a] hover:border-neutral-400 dark:hover:border-neutral-700'
                      }`}
                      style={
                        selectedColorPreset === preset.id
                          ? { borderColor: preset.primary }
                          : undefined
                      }
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-5 h-5 rounded-full shadow-sm"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                          {preset.name}
                        </span>
                      </div>
                      {selectedColorPreset === preset.id && (
                        <Check size={14} style={{ color: preset.primary }} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Navigation Bar Architecture */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#14161d] border border-neutral-200 dark:border-neutral-800 space-y-4">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Bottom Navigation Bar Architecture</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Select a reusable bottom navigation component variant for the mobile app preview.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'varient_1', name: 'V1 • Executive Classic Bar', tagline: 'Clean Icon + Text Label with Theme Accent' },
                    { id: 'varient_2', name: 'V2 • Floating Capsule Dock', tagline: 'Elevated Island Dock with Active Pill' },
                    { id: 'varient_3', name: 'V3 • Expanding Smart Badge', tagline: 'Horizontal Expanding Label Pill for Active Tab' },
                    { id: 'varient_4', name: 'V4 • Center Quick Order FAB Notch', tagline: 'Curved Dock with Prominent Elevated Center Action' },
                    { id: 'varient_5', name: 'V5 • Top Neon Accent Line', tagline: 'Minimalist Luxe Bar with Top Active Accent Line' },
                  ].map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setBottomNavVariant(v.id as any)}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition ${
                        bottomNavVariant === v.id
                          ? 'border-2 bg-neutral-50 dark:bg-[#181b24]'
                          : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#12141a] hover:border-neutral-400 dark:hover:border-neutral-700'
                      }`}
                      style={
                        bottomNavVariant === v.id
                          ? { borderColor: activeColor.primary }
                          : undefined
                      }
                    >
                      <div>
                        <div className="text-xs font-bold text-neutral-900 dark:text-white">{v.name}</div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">{v.tagline}</div>
                      </div>
                      {bottomNavVariant === v.id && (
                        <Check size={16} style={{ color: activeColor.primary }} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Design System Summary */}
              <div className="p-6 rounded-2xl bg-white dark:bg-[#14161d] border border-neutral-200 dark:border-neutral-800 space-y-4">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Theme & UI Configuration</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#12141a] border border-neutral-200 dark:border-neutral-800 space-y-1">
                    <div className="text-neutral-500 dark:text-neutral-400 font-medium">Active Mode</div>
                    <div className="text-neutral-900 dark:text-white font-bold flex items-center gap-1.5">
                      {isDark ? <Moon size={14} /> : <Sun size={14} />}
                      <span>{isDark ? 'Executive Obsidian Dark' : 'Crisp Pure Light'}</span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#12141a] border border-neutral-200 dark:border-neutral-800 space-y-1">
                    <div className="text-neutral-500 dark:text-neutral-400 font-medium">Default Font</div>
                    <div className="text-neutral-900 dark:text-white font-bold">Inter / SF Pro Display</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#12141a] border border-neutral-200 dark:border-neutral-800 space-y-1">
                    <div className="text-neutral-500 dark:text-neutral-400 font-medium">Border Radius</div>
                    <div className="text-neutral-900 dark:text-white font-bold">16px Rounded Cards</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: APP SETTINGS & BRANDING */}
          {activeStudioTab === 'branding' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-[#14161d] border border-neutral-200 dark:border-neutral-800 space-y-4">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Remittance Exchange Rate</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Current exchange rate used across currency calculations, Riyal ledgers, and payout conversions.
                </p>
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-xl bg-neutral-50 dark:bg-[#12141a] border border-neutral-200 dark:border-neutral-800 flex-1 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400">SAR to BDT Base Rate</div>
                      <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                        1 SAR = {settings.exchangeRate.toFixed(2)} BDT
                      </div>
                    </div>
                    <Calculator size={24} className="text-neutral-400 dark:text-neutral-500" />
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-[#14161d] border border-neutral-200 dark:border-neutral-800 space-y-4">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Security & Master PIN</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Default 4-digit PIN for device authentication is <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 font-mono text-neutral-900 dark:text-white">1234</code>. You can change this in the mobile profile modal.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setTargetTab('dashboard');
                      setTargetSubView(null);
                      setBypassAuth(false);
                      setActiveStudioTab('screens');
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-2"
                    style={{ backgroundColor: activeColor.primary }}
                  >
                    <Lock size={14} />
                    <span>Test PIN Lock Screen (1234)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BUILD APK & EXPO ZIP */}
          {activeStudioTab === 'export' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="p-6 rounded-2xl bg-white dark:bg-[#14161d] border border-neutral-200 dark:border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white">Expo 52 Standalone Export</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      Download the complete clean project ZIP ready to run with <code className="font-mono text-neutral-900 dark:text-white">npx expo start</code> or compile directly into an Android APK / iOS IPA.
                    </p>
                  </div>
                  <button
                    onClick={handleExportZip}
                    disabled={isZipping}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg hover:opacity-95 transition"
                    style={{ backgroundColor: activeColor.primary }}
                  >
                    <Download size={15} />
                    <span>{isZipping ? 'Generating Package...' : 'Download Full Project .ZIP'}</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-neutral-50 dark:bg-[#12141a] border border-neutral-200 dark:border-neutral-800 space-y-2">
                    <div className="font-bold text-neutral-900 dark:text-white">Local Run Instructions</div>
                    <ol className="list-decimal list-inside text-neutral-500 dark:text-neutral-400 space-y-1 font-mono text-[11px]">
                      <li>unzip order-manage-expo.zip</li>
                      <li>cd personal-shop-management-mobile</li>
                      <li>npm install</li>
                      <li>npx expo start</li>
                    </ol>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-50 dark:bg-[#12141a] border border-neutral-200 dark:border-neutral-800 space-y-2">
                    <div className="font-bold text-neutral-900 dark:text-white">EAS Build (APK)</div>
                    <ol className="list-decimal list-inside text-neutral-500 dark:text-neutral-400 space-y-1 font-mono text-[11px]">
                      <li>npm install -g eas-cli</li>
                      <li>eas login</li>
                      <li>eas build -p android --profile preview</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}
    </>
  );

  const mobileContent = (
    <div className="flex-1 w-full h-full flex flex-col overflow-hidden bg-[#060910]">
      <OrderManageMobileApp
        forcedTab={targetTab}
        forcedSubView={targetSubView}
        variantsMap={variantsMap}
        activeVariant={currentActiveVariant}
        bottomNavVariant={bottomNavVariant}
        bypassAuth={bypassAuth}
        showHeader={showHeader}
      />
    </div>
  );

  return (
    <StudioDashboardShell
      activeProjectId="order_manage"
      projectName="Order manage App"
      activeScreenLabel={activeScreenObj.name}
      activeVariantLabel={currentActiveVariant.toUpperCase()}
      activeStudioTab={activeStudioTab}
      onSelectStudioTab={setActiveStudioTab}
      onSwitchProject={onSwitchProject}
      isDark={isDark}
      onToggleTheme={toggleTheme}
      primaryColor={activeColor.primary}
      primaryTextColor="#FFFFFF"
      onExportZip={handleExportZip}
      isZipping={isZipping}
      extraTopActions={extraTopActions}
      variantOptions={[
        { id: 'v1', label: 'V1 (Default)' },
        { id: 'v2', label: 'V2 (Alt 2)' },
        { id: 'v3', label: 'V3 (Alt 3)' },
      ]}
      currentVariantId={currentActiveVariant}
      onChangeVariant={(v) => setSingleVariant(activeScreenObj.id, v as OrderManageVariant)}
      onReloadSimulator={() => setSingleVariant(activeScreenObj.id, currentActiveVariant)}
      extraSimulatorHeaderControls={
        <button
          onClick={() => setShowHeader(!showHeader)}
          className={`px-2 py-1 rounded-md text-[10px] font-bold transition border ${
            showHeader
              ? 'bg-neutral-800 text-white border-neutral-700'
              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700'
          }`}
          title="Toggle App Header"
        >
          Header: {showHeader ? 'ON' : 'OFF'}
        </button>
      }
      colorSwatches={COLOR_PRESETS.map((p) => ({ id: p.id, name: p.name, swatch: p.primary }))}
      activeColorId={selectedColorPreset}
      onSelectColorSwatch={setColorPreset}
      activeFontName="Inter / SF Pro Display"
      middleContent={middleContent}
      mobileContent={mobileContent}
    />
  );
}

export function OrderManageApp(props: OrderManageAppProps) {
  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        <LedgerProvider>
          <InnerOrderManageDashboard {...props} />
        </LedgerProvider>
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}

export default OrderManageApp;
