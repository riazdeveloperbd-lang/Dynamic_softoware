import React from 'react';
import {
  LayoutGrid,
  ReceiptText,
  Users,
  Archive,
} from 'lucide-react';
import {
  AdminBottomNavVariantId,
  useAdminDesignSystem,
} from '../styles/adminDesignSystem';

export type AdminRootTabId = 'Overview' | 'Orders' | 'Customers' | 'Inventory';

export interface AdminBottomNavBarProps {
  activeTab: AdminRootTabId;
  onSelectTab: (tab: AdminRootTabId) => void;
  variantOverride?: AdminBottomNavVariantId;
  ordersBadgeCount?: number;
  lowStockBadgeCount?: number;
}

export const AdminBottomNavBar: React.FC<AdminBottomNavBarProps> = ({
  activeTab,
  onSelectTab,
  variantOverride,
  ordersBadgeCount = 14,
  lowStockBadgeCount = 3,
}) => {
  const { palette, isDark, bottomNavVariant, activeFont } =
    useAdminDesignSystem();
  const variant = variantOverride || bottomNavVariant || 'varient_1';

  const tabs: {
    id: AdminRootTabId;
    label: string;
    icon: React.FC<{ size?: number; strokeWidth?: number; className?: string }>;
    badge?: number;
  }[] = [
    { id: 'Overview', label: 'Overview', icon: LayoutGrid },
    {
      id: 'Orders',
      label: 'Orders',
      icon: ReceiptText,
      badge: ordersBadgeCount,
    },
    { id: 'Customers', label: 'Customers', icon: Users },
    {
      id: 'Inventory',
      label: 'Inventory',
      icon: Archive,
      badge: lowStockBadgeCount,
    },
  ];

  // =========================================================================
  // VARIANT 2: Floating Capsule Island Dock
  // =========================================================================
  if (variant === 'varient_2') {
    return (
      <div
        className="px-3 pb-2.5 pt-1.5 flex-shrink-0 z-30 transition-colors"
        style={{
          backgroundColor: palette.background,
          fontFamily: activeFont.cssStack,
        }}
      >
        <div
          className="h-14 rounded-2xl border px-2 flex items-center justify-between shadow-lg transition-all"
          style={{
            backgroundColor: isDark ? palette.surfaceElevated : palette.cardBackground,
            borderColor: palette.primaryBorder,
          }}
        >
          {tabs.map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className="flex-1 h-10 rounded-xl flex flex-col items-center justify-center gap-0.5 relative transition-all cursor-pointer"
                style={{
                  backgroundColor: isActive ? palette.primary : 'transparent',
                  color: isActive ? palette.primaryText : palette.textMuted,
                }}
              >
                <div className="relative flex items-center justify-center">
                  <IconComp size={17} strokeWidth={isActive ? 2.4 : 1.9} />
                  {tab.badge && !isActive && (
                    <span
                      className="absolute -top-1 -right-2.5 px-1 min-w-[14px] h-[14px] rounded-full text-[8px] font-extrabold flex items-center justify-center"
                      style={{
                        backgroundColor: palette.primary,
                        color: palette.primaryText,
                      }}
                    >
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className="text-[9px] font-extrabold leading-none tracking-tight">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VARIANT 3: Expanding Smart Pill Bar (Active tab expands horizontally)
  // =========================================================================
  if (variant === 'varient_3') {
    return (
      <div
        className="h-16 border-t px-3 flex items-center justify-between gap-1.5 flex-shrink-0 z-30 transition-colors"
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: palette.border,
          fontFamily: activeFont.cssStack,
        }}
      >
        {tabs.map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`h-10 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isActive ? 'px-4 flex-[1.5] shadow-xs' : 'px-2.5 flex-1'
              }`}
              style={{
                backgroundColor: isActive ? palette.primary : 'transparent',
                color: isActive ? palette.primaryText : palette.textSecondary,
              }}
            >
              <div className="relative flex items-center justify-center">
                <IconComp size={18} strokeWidth={isActive ? 2.4 : 1.9} />
                {tab.badge && !isActive && (
                  <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-red-500" />
                )}
              </div>
              {isActive && (
                <span className="text-[11px] font-extrabold tracking-tight truncate">
                  {tab.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // =========================================================================
  // VARIANT 4: Center Orders FAB Notch Dock
  // =========================================================================
  if (variant === 'varient_4') {
    return (
      <div
        className="h-16 border-t px-2 flex items-center justify-around flex-shrink-0 z-30 relative transition-colors"
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: palette.border,
          fontFamily: activeFont.cssStack,
        }}
      >
        {/* Tab 1: Overview */}
        <button
          type="button"
          onClick={() => onSelectTab('Overview')}
          className="flex flex-col items-center justify-center gap-1 py-1 px-2.5 cursor-pointer"
          style={{
            color:
              activeTab === 'Overview' ? palette.primary : palette.textMuted,
          }}
        >
          <LayoutGrid
            size={19}
            strokeWidth={activeTab === 'Overview' ? 2.5 : 1.9}
          />
          <span className="text-[10px] font-bold">Overview</span>
        </button>

        {/* Center Elevated FAB: Orders */}
        <div className="flex flex-col items-center justify-center -mt-5">
          <button
            type="button"
            onClick={() => onSelectTab('Orders')}
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 transition-transform active:scale-95 relative cursor-pointer"
            style={{
              backgroundColor: palette.primary,
              color: palette.primaryText,
              borderColor: palette.background,
            }}
          >
            <ReceiptText size={20} strokeWidth={2.4} />
            {ordersBadgeCount > 0 && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-red-600 text-white text-[9px] font-extrabold shadow-xs">
                {ordersBadgeCount}
              </span>
            )}
          </button>
          <span
            className="text-[10px] font-extrabold mt-0.5"
            style={{
              color:
                activeTab === 'Orders' ? palette.primary : palette.textSecondary,
            }}
          >
            Orders
          </span>
        </div>

        {/* Tab 3: Customers */}
        <button
          type="button"
          onClick={() => onSelectTab('Customers')}
          className="flex flex-col items-center justify-center gap-1 py-1 px-2.5 cursor-pointer"
          style={{
            color:
              activeTab === 'Customers' ? palette.primary : palette.textMuted,
          }}
        >
          <Users
            size={19}
            strokeWidth={activeTab === 'Customers' ? 2.5 : 1.9}
          />
          <span className="text-[10px] font-bold">Customers</span>
        </button>

        {/* Tab 4: Inventory */}
        <button
          type="button"
          onClick={() => onSelectTab('Inventory')}
          className="flex flex-col items-center justify-center gap-1 py-1 px-2.5 cursor-pointer relative"
          style={{
            color:
              activeTab === 'Inventory' ? palette.primary : palette.textMuted,
          }}
        >
          <div className="relative">
            <Archive
              size={19}
              strokeWidth={activeTab === 'Inventory' ? 2.5 : 1.9}
            />
            {lowStockBadgeCount > 0 && (
              <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-amber-500" />
            )}
          </div>
          <span className="text-[10px] font-bold">Inventory</span>
        </button>
      </div>
    );
  }

  // =========================================================================
  // VARIANT 5: Top Neon Indicator & Soft Glow Bar
  // =========================================================================
  if (variant === 'varient_5') {
    return (
      <div
        className="h-16 border-t px-2 flex items-stretch justify-around flex-shrink-0 z-30 transition-colors"
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: palette.border,
          fontFamily: activeFont.cssStack,
        }}
      >
        {tabs.map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className="flex-1 flex flex-col items-center justify-between pb-2 pt-0 relative cursor-pointer"
              style={{
                color: isActive ? palette.primary : palette.textMuted,
              }}
            >
              {/* Top Indicator Bar */}
              <div
                className="w-8 h-1 rounded-b-full transition-all"
                style={{
                  backgroundColor: isActive ? palette.primary : 'transparent',
                }}
              />
              <div
                className="w-9 h-7 rounded-lg flex items-center justify-center relative"
                style={{
                  backgroundColor: isActive ? palette.primarySoft : 'transparent',
                }}
              >
                <IconComp size={18} strokeWidth={isActive ? 2.4 : 1.9} />
                {tab.badge && (
                  <span
                    className="absolute -top-1 -right-1.5 px-1 min-w-[14px] h-[14px] rounded-full text-[8px] font-extrabold flex items-center justify-center"
                    style={{
                      backgroundColor: palette.primary,
                      color: palette.primaryText,
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] leading-none ${
                  isActive ? 'font-extrabold' : 'font-medium'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  // =========================================================================
  // VARIANT 6: Solid Brand Luxe Dock (Dynamically colored by selected Brand Palette!)
  // =========================================================================
  if (variant === 'varient_6') {
    return (
      <div
        className="px-3 pb-2.5 pt-1.5 flex-shrink-0 z-30 transition-colors"
        style={{
          backgroundColor: palette.background,
          fontFamily: activeFont.cssStack,
        }}
      >
        <div
          className="h-14 rounded-2xl px-2.5 flex items-center justify-between shadow-xl border transition-colors"
          style={{
            backgroundColor: palette.primary,
            borderColor: palette.primaryHover,
          }}
        >
          {tabs.map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className="flex items-center gap-1.5 py-2 px-3 rounded-xl transition-all cursor-pointer"
                style={{
                  backgroundColor: isActive
                    ? '#FFFFFF'
                    : 'rgba(255, 255, 255, 0.12)',
                  color: isActive ? palette.primary : '#FFFFFF',
                }}
              >
                <IconComp size={16} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-extrabold tracking-tight">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VARIANT 7: Segmented Bento Grid Dock (4 Soft-Tinted Bento Tiles)
  // =========================================================================
  if (variant === 'varient_7') {
    return (
      <div
        className="h-16 border-t px-2.5 py-2 grid grid-cols-4 gap-1.5 flex-shrink-0 z-30 transition-colors"
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: palette.border,
          fontFamily: activeFont.cssStack,
        }}
      >
        {tabs.map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className="rounded-xl border flex flex-col items-center justify-center gap-0.5 relative transition-all cursor-pointer"
              style={{
                backgroundColor: isActive ? palette.primarySoft : palette.surface,
                borderColor: isActive ? palette.primary : palette.border,
                color: isActive ? palette.primary : palette.textSecondary,
              }}
            >
              <div className="relative flex items-center justify-center">
                <IconComp size={16} strokeWidth={isActive ? 2.5 : 1.9} />
                {tab.badge && (
                  <span
                    className="absolute -top-1 -right-2.5 px-1 min-w-[13px] h-[13px] rounded-full text-[8px] font-extrabold flex items-center justify-center"
                    style={{
                      backgroundColor: palette.primary,
                      color: palette.primaryText,
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-extrabold leading-none">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  // =========================================================================
  // VARIANT 8: Brutalist Sharp Frame Bar (2px Brand Border + Offset Shadow)
  // =========================================================================
  if (variant === 'varient_8') {
    return (
      <div
        className="px-3 pb-2.5 pt-1.5 flex-shrink-0 z-30 transition-colors"
        style={{
          backgroundColor: palette.background,
          fontFamily: activeFont.cssStack,
        }}
      >
        <div
          className="h-14 rounded-[4px] border-2 px-1.5 flex items-center justify-between gap-1.5 transition-all"
          style={{
            backgroundColor: palette.cardBackground,
            borderColor: palette.primary,
            boxShadow: `3px 3px 0px ${palette.primary}`,
          }}
        >
          {tabs.map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className="flex-1 h-10 rounded-[2px] flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer"
                style={{
                  backgroundColor: isActive ? palette.primary : 'transparent',
                  color: isActive ? palette.primaryText : palette.textPrimary,
                }}
              >
                <IconComp size={16} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[9px] font-extrabold uppercase tracking-wider leading-none">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VARIANT 9: Minimal Dot & Halo Dock (Soft Tinted Dock + Active Brand Circle)
  // =========================================================================
  if (variant === 'varient_9') {
    return (
      <div
        className="px-4 pb-2.5 pt-1.5 flex-shrink-0 z-30 transition-colors"
        style={{
          backgroundColor: palette.background,
          fontFamily: activeFont.cssStack,
        }}
      >
        <div
          className="h-14 rounded-full border px-3 flex items-center justify-around shadow-md transition-all"
          style={{
            backgroundColor: palette.primarySoft,
            borderColor: palette.primaryBorder,
          }}
        >
          {tabs.map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className="flex flex-col items-center justify-center gap-1 relative cursor-pointer"
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: isActive ? palette.primary : 'transparent',
                    color: isActive ? palette.primaryText : palette.textSecondary,
                  }}
                >
                  <IconComp size={17} strokeWidth={isActive ? 2.4 : 1.9} />
                </div>
                {isActive && (
                  <span
                    className="w-1.5 h-1.5 rounded-full -mt-0.5"
                    style={{ backgroundColor: palette.primary }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VARIANT 10: Dual-Tone Split Deck (Brand Top Accent Rail + Elevated Tab Card)
  // =========================================================================
  if (variant === 'varient_10') {
    return (
      <div
        className="flex-shrink-0 z-30 transition-colors"
        style={{
          backgroundColor: palette.cardBackground,
          fontFamily: activeFont.cssStack,
        }}
      >
        {/* Top Brand Accent Strip */}
        <div
          className="h-[3px] w-full"
          style={{ backgroundColor: palette.primary }}
        />
        <div className="h-15 px-2.5 py-1.5 flex items-center justify-between gap-2">
          {tabs.map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className="flex-1 h-11 rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                style={{
                  backgroundColor: isActive
                    ? palette.primary
                    : palette.primarySoft,
                  borderColor: isActive
                    ? palette.primary
                    : palette.primaryBorder,
                  color: isActive ? palette.primaryText : palette.textSecondary,
                }}
              >
                <IconComp size={16} strokeWidth={isActive ? 2.4 : 1.9} />
                <span className="text-[10px] font-extrabold tracking-tight truncate">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VARIANT 1 (DEFAULT): Classic Console Bar
  // =========================================================================
  return (
    <div
      className="h-16 border-t flex items-center justify-around px-2 flex-shrink-0 z-30 transition-colors"
      style={{
        backgroundColor: palette.cardBackground,
        borderColor: palette.border,
        fontFamily: activeFont.cssStack,
      }}
    >
      {tabs.map((tab) => {
        const IconComp = tab.icon;
        const active = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className="flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-xl transition-all relative cursor-pointer"
            style={{
              color: active ? palette.primary : palette.textMuted,
            }}
          >
            <div className="relative flex items-center justify-center">
              <IconComp size={20} strokeWidth={active ? 2.4 : 1.9} />
              {tab.badge && (
                <span
                  className="absolute -top-1.5 -right-3 px-1.5 py-0.2 min-w-[16px] h-[15px] rounded-full text-[9px] font-extrabold flex items-center justify-center shadow-2xs"
                  style={{
                    backgroundColor:
                      tab.id === 'Orders' ? palette.primary : '#F59E0B',
                    color: tab.id === 'Orders' ? palette.primaryText : '#FFFFFF',
                  }}
                >
                  {tab.badge}
                </span>
              )}
            </div>
            <span
              className={`text-[10px] tracking-tight leading-none ${
                active ? 'font-extrabold' : 'font-semibold'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default AdminBottomNavBar;
