import React, { useState } from 'react';
import {
  Boxes,
  ShoppingBag,
  Coins,
  ShieldCheck,
  ChevronRight,
  Utensils,
  Dumbbell,
  Building2,
  Plus,
  LayoutGrid,
  Palette,
  AppWindow,
  Download,
  Sun,
  Moon,
  Zap,
  Smartphone,
  RotateCcw,
  X,
} from 'lucide-react';

export type StudioTab = 'screens' | 'theme' | 'branding' | 'export';

export interface StudioColorSwatch {
  id: string;
  name: string;
  swatch: string;
}

export interface StudioDashboardShellProps {
  activeProjectId: 'cloth_shop' | 'order_manage' | 'cloth_shop_admin';
  projectName: string;
  activeScreenLabel: string;
  activeVariantLabel: string;
  activeStudioTab: StudioTab;
  onSelectStudioTab: (tab: StudioTab) => void;
  onSwitchProject?: (projectId: string) => void;

  // Theme & Colors
  isDark: boolean;
  onToggleTheme: () => void;
  primaryColor: string;
  primaryTextColor?: string;

  // Optional Top Header Actions
  isSkeletonActive?: boolean;
  onToggleSkeleton?: () => void;
  onExportZip?: () => void;
  isZipping?: boolean;
  extraTopActions?: React.ReactNode;

  // Right Simulator Controls
  variantOptions: { id: string; label: string }[];
  currentVariantId: string;
  onChangeVariant: (variantId: string) => void;
  onReloadSimulator?: () => void;
  extraSimulatorHeaderControls?: React.ReactNode;

  // Bottom Swatches in Right Sidebar
  colorSwatches?: StudioColorSwatch[];
  activeColorId?: string;
  onSelectColorSwatch?: (id: string) => void;
  activeFontName?: string;

  // Content Slots (ONLY THESE CHANGE PER PROJECT)
  middleContent: React.ReactNode;
  mobileContent: React.ReactNode;
}

export const StudioDashboardShell: React.FC<StudioDashboardShellProps> = ({
  activeProjectId,
  projectName,
  activeScreenLabel,
  activeVariantLabel,
  activeStudioTab,
  onSelectStudioTab,
  onSwitchProject,
  isDark,
  onToggleTheme,
  primaryColor,
  primaryTextColor = '#FFFFFF',
  isSkeletonActive = false,
  onToggleSkeleton,
  onExportZip,
  isZipping = false,
  extraTopActions,
  variantOptions,
  currentVariantId,
  onChangeVariant,
  onReloadSimulator,
  extraSimulatorHeaderControls,
  colorSwatches = [],
  activeColorId,
  onSelectColorSwatch,
  activeFontName = 'Plus Jakarta Sans',
  middleContent,
  mobileContent,
}) => {
  const [addAppModalOpen, setAddAppModalOpen] = useState(false);

  const projectsList = [
    {
      id: 'cloth_shop' as const,
      title: 'Cloth Shop App',
      subtitle: '23 Screens · 138 Variants',
      icon: ShoppingBag,
    },
    {
      id: 'order_manage' as const,
      title: 'Order manage App',
      subtitle: '18 Views & Tabs',
      icon: Coins,
    },
    {
      id: 'cloth_shop_admin' as const,
      title: 'Cloth Shop Admin',
      subtitle: '10 Screens · 40 Variants',
      icon: ShieldCheck,
    },
  ];

  return (
    <div
      className={`${
        isDark ? 'dark bg-[#0d0f14] text-neutral-100' : 'bg-[#F8FAFC] text-neutral-900'
      } flex h-screen w-screen overflow-hidden font-sans antialiased`}
    >
      {/* ========================================================================= */}
      {/* 1. LEFT SIDEBAR: REUSABLE MULTI-PROJECT WORKSPACE                         */}
      {/* ========================================================================= */}
      <div className="w-[250px] h-full flex flex-col flex-shrink-0 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#14161c] z-20">
        {/* Workspace Brand Header */}
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-black shadow-sm flex-shrink-0"
            style={{ backgroundColor: primaryColor, color: primaryTextColor }}
          >
            <Boxes size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-sm font-bold tracking-tight text-neutral-900 dark:text-neutral-100 truncate">
              AppForge Studio
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
              Multi-App Expo Suite
            </p>
          </div>
        </div>

        {/* Project List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3.5">
          <div className="px-2 flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
              Projects &amp; Apps (3)
            </span>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
              Ready
            </span>
          </div>

          {projectsList.map((proj) => {
            const IconComp = proj.icon;
            const isCurrent = activeProjectId === proj.id;

            return (
              <div
                key={proj.id}
                onClick={() => {
                  if ( isCurrent ) {
                    onSelectStudioTab('screens');
                  } else if (onSwitchProject) {
                    onSwitchProject(proj.id);
                  }
                }}
                className={`group relative rounded-xl p-3 transition-all cursor-pointer shadow-xs ${
                  isCurrent
                    ? 'border-2 bg-white dark:bg-[#181a22]'
                    : 'border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#181a20] hover:border-neutral-400 dark:hover:border-neutral-700'
                }`}
                style={isCurrent ? { borderColor: primaryColor } : undefined}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm shadow-xs flex-shrink-0 ${
                      isCurrent
                        ? ''
                        : 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                    }`}
                    style={
                      isCurrent
                        ? { backgroundColor: primaryColor, color: primaryTextColor }
                        : undefined
                    }
                  >
                    <IconComp size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate">
                        {proj.title}
                      </h3>
                      {isCurrent ? (
                        <span className="flex h-2 w-2 relative flex-shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                      ) : (
                        <ChevronRight
                          size={14}
                          className="text-neutral-400 group-hover:translate-x-0.5 transition flex-shrink-0"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
                  <span
                    className={
                      isCurrent
                        ? 'font-semibold text-neutral-700 dark:text-neutral-300'
                        : 'font-medium text-neutral-600 dark:text-neutral-400'
                    }
                  >
                    {proj.subtitle}
                  </span>
                  {isCurrent ? (
                    <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                      Active
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded">
                      Switch
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          <div className="space-y-2 pt-1">
            <div className="px-2 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              Future App Slots (Modular)
            </div>

            {[
              { title: 'Food Delivery App', icon: Utensils, badge: 'Next Up' },
              { title: 'Fitness & Gym Pro', icon: Dumbbell, badge: 'Template' },
              { title: 'Real Estate Hub', icon: Building2, badge: 'Planned' },
            ].map((slot) => {
              const IconComponent = slot.icon;
              return (
                <div
                  key={slot.title}
                  onClick={() => setAddAppModalOpen(true)}
                  className="rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 p-2.5 flex items-center gap-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 flex items-center justify-center flex-shrink-0">
                    <IconComponent size={14} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 truncate">
                        {slot.title}
                      </span>
                      <span className="text-[9px] font-medium text-neutral-400 px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">
                        {slot.badge}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              onClick={() => setAddAppModalOpen(true)}
              className="w-full mt-2 py-2 px-3 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center gap-1.5 transition"
            >
              <Plus size={14} />
              <span>Create New Project</span>
            </button>
          </div>
        </div>

        {/* Workspace Footer Info */}
        <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 text-[11px] text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Dev Server :3000
            </span>
            <span className="font-mono text-[10px]">React 19 / RN</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CENTER SECTION: REUSABLE TOP HEADER + DYNAMIC MIDDLE CONTENT           */}
      {/* ========================================================================= */}
      <div className="flex-1 h-full flex flex-col min-w-0 overflow-hidden bg-neutral-50/70 dark:bg-[#121214]">
        {/* Top Studio Bar with 4 Required Tabs & Global Actions */}
        <div className="h-16 px-6 border-b border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-[#18181B]/90 backdrop-blur flex items-center justify-between gap-4 flex-shrink-0 z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 truncate min-w-0">
            <span>Projects</span>
            <ChevronRight size={14} className="flex-shrink-0" />
            <span className="text-neutral-900 dark:text-neutral-100 font-bold truncate">
              {projectName}
            </span>
            <ChevronRight size={14} className="flex-shrink-0" />
            <span className="font-mono text-neutral-600 dark:text-neutral-300 truncate">
              {activeScreenLabel} ({activeVariantLabel})
            </span>
          </div>

          {/* 4 Required Studio Navigation Tabs */}
          <div className="flex items-center p-1 bg-neutral-100 dark:bg-neutral-800/80 rounded-xl border border-neutral-200 dark:border-neutral-700/60 flex-shrink-0">
            {[
              { id: 'screens' as const, label: 'Screens & Variants', icon: LayoutGrid },
              { id: 'theme' as const, label: 'Design System', icon: Palette },
              { id: 'branding' as const, label: 'App Branding', icon: AppWindow },
              { id: 'export' as const, label: 'Build APK & ZIP', icon: Download },
            ].map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeStudioTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectStudioTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor: primaryColor,
                          color: primaryTextColor,
                        }
                      : undefined
                  }
                >
                  <IconComp size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Action Buttons (Light/Dark Mode, Skeleton, Export .ZIP) */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {extraTopActions}

            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 transition"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {onToggleSkeleton && (
              <button
                onClick={onToggleSkeleton}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition ${
                  isSkeletonActive
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                    : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                }`}
              >
                <Zap size={14} />
                <span>{isSkeletonActive ? 'Skeleton ON' : 'Skeleton'}</span>
              </button>
            )}

            {onExportZip && (
              <button
                onClick={onExportZip}
                disabled={isZipping}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:opacity-95 transition"
                style={{
                  backgroundColor: primaryColor,
                  color: primaryTextColor,
                }}
              >
                <Download size={14} />
                <span>{isZipping ? 'Building ZIP...' : 'Export .ZIP'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Middle Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {middleContent}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. FAR RIGHT SIDEBAR: REUSABLE MOBILE SIMULATOR + SWATCHES                */}
      {/* ========================================================================= */}
      <div className="w-[440px] h-full flex flex-col flex-shrink-0 border-l border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#14161c] z-20">
        {/* Device Top Control Bar */}
        <div className="p-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-2 flex-shrink-0 bg-white dark:bg-neutral-900">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <Smartphone size={14} className="text-neutral-500" />
              <span className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                {activeScreenLabel}
              </span>
            </div>
          </div>

          {extraSimulatorHeaderControls}

          {/* Quick Variant Dropdown */}
          <select
            value={currentVariantId}
            onChange={(e) => onChangeVariant(e.target.value)}
            className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md text-[11px] font-bold text-neutral-800 dark:text-neutral-200 focus:outline-none cursor-pointer"
          >
            {variantOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>

          {onReloadSimulator && (
            <button
              onClick={onReloadSimulator}
              className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
              title="Reload Screen"
            >
              <RotateCcw size={13} />
            </button>
          )}
        </div>

        {/* Mobile Viewport Stage */}
        <div className="flex-1 flex items-center justify-center p-3 overflow-hidden bg-neutral-100/50 dark:bg-[#0d0f14]">
          {/* Realistic iPhone 16 Pro Device Frame */}
          <div className="relative w-[378px] h-[760px] rounded-[50px] p-[6px] bg-[#1a1a1e] shadow-2xl ring-1 ring-white/10 flex flex-col items-center justify-center">
            <div className="w-[366px] h-[748px] rounded-[44px] overflow-hidden bg-white dark:bg-[#090D16] relative flex flex-col">
              {mobileContent}
            </div>
          </div>
        </div>

        {/* Device Bottom Quick Swatches */}
        <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-white dark:bg-neutral-900 flex-shrink-0">
          <div className="flex items-center gap-1.5">
            {colorSwatches.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectColorSwatch && onSelectColorSwatch(p.id)}
                className={`w-5 h-5 rounded-full transition-transform ${
                  activeColorId === p.id
                    ? 'scale-125 ring-2 ring-neutral-900 dark:ring-white'
                    : 'opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: p.swatch }}
                title={p.name}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-neutral-400 truncate max-w-[140px]">
              {activeFontName}
            </span>
          </div>
        </div>
      </div>

      {/* Modal: Create New Project */}
      {addAppModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setAddAppModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Boxes size={20} className="text-neutral-900 dark:text-white" />
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                  Modular Multi-Project Architecture
                </h3>
              </div>
              <button
                onClick={() => setAddAppModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-600"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-neutral-500 leading-relaxed">
              All projects share the unified AppForge Studio Dashboard Shell. Switch between Cloth Shop, Order Manage App, and Cloth Shop Admin at any time from the left sidebar.
            </p>

            <button
              onClick={() => setAddAppModalOpen(false)}
              className="w-full py-2.5 rounded-xl text-white text-xs font-bold shadow hover:opacity-95"
              style={{ backgroundColor: primaryColor, color: primaryTextColor }}
            >
              Got it, continue in {projectName}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudioDashboardShell;
