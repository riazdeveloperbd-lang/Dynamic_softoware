import React from 'react';
import {
  Shield,
  Server,
  Gauge,
  ShieldCheck,
  UserCircle,
} from 'lucide-react';
import {
  VpnBottomNavVariantId,
  useVpnDesignSystem,
} from '../styles/vpnDesignSystem';

export type VpnRootTabId = 'Shield' | 'Servers' | 'Speed' | 'Tools' | 'Account';

export interface VpnBottomNavBarProps {
  activeTab: VpnRootTabId;
  onSelectTab: (tab: VpnRootTabId) => void;
  variantOverride?: VpnBottomNavVariantId;
}

export const VpnBottomNavBar: React.FC<VpnBottomNavBarProps> = ({
  activeTab,
  onSelectTab,
  variantOverride,
}) => {
  const { palette, bottomNavVariant, activeFont } = useVpnDesignSystem();
  const variant = variantOverride || bottomNavVariant || 'varient_1';

  const tabs: {
    id: VpnRootTabId;
    label: string;
    icon: React.FC<{ size?: number; strokeWidth?: number; className?: string }>;
  }[] = [
    { id: 'Shield', label: 'Shield', icon: Shield },
    { id: 'Servers', label: 'Servers', icon: Server },
    { id: 'Speed', label: 'Speed', icon: Gauge },
    { id: 'Tools', label: 'Tools', icon: ShieldCheck },
    { id: 'Account', label: 'Account', icon: UserCircle },
  ];

  // V2: Floating Capsule Island Dock
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
          className="h-14 rounded-2xl border px-1.5 flex items-center justify-between shadow-lg transition-all"
          style={{
            backgroundColor: palette.cardBackground,
            borderColor: palette.border,
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
                className="flex-1 h-10 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer"
                style={{
                  backgroundColor: isActive ? palette.primary : 'transparent',
                  color: isActive ? palette.primaryText : palette.textSecondary,
                }}
              >
                <IconComp size={16} strokeWidth={isActive ? 2.4 : 1.9} />
                <span className="text-[9px] font-extrabold leading-none">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // V3: Expanding Smart Pill Bar
  if (variant === 'varient_3') {
    return (
      <div
        className="h-16 border-t px-2.5 flex items-center justify-between gap-1 flex-shrink-0 z-30 transition-colors"
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
              className={`h-10 rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isActive ? 'px-3.5 flex-[1.6] shadow-xs' : 'px-2 flex-1'
              }`}
              style={{
                backgroundColor: isActive ? palette.primary : 'transparent',
                color: isActive ? palette.primaryText : palette.textSecondary,
              }}
            >
              <IconComp size={17} strokeWidth={isActive ? 2.4 : 1.9} />
              {isActive && (
                <span className="text-[10px] font-extrabold tracking-tight truncate">
                  {tab.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // V4: Center Speed FAB Notch Dock
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
        {tabs.map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          if (tab.id === 'Speed') {
            return (
              <div
                key={tab.id}
                className="flex flex-col items-center justify-center -mt-5"
              >
                <button
                  type="button"
                  onClick={() => onSelectTab('Speed')}
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 transition-transform active:scale-95 cursor-pointer"
                  style={{
                    backgroundColor: palette.primary,
                    color: palette.primaryText,
                    borderColor: palette.background,
                  }}
                >
                  <Gauge size={20} strokeWidth={2.4} />
                </button>
                <span
                  className="text-[9px] font-extrabold mt-0.5"
                  style={{
                    color: isActive ? palette.primary : palette.textSecondary,
                  }}
                >
                  Speed
                </span>
              </div>
            );
          }
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className="flex flex-col items-center justify-center gap-1 py-1 px-2 cursor-pointer"
              style={{
                color: isActive ? palette.primary : palette.textSecondary,
              }}
            >
              <IconComp size={18} strokeWidth={isActive ? 2.4 : 1.9} />
              <span className="text-[9px] font-bold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // V5: Top Neon Indicator Bar
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
              className="flex-1 flex flex-col items-center justify-between pb-2 pt-0 cursor-pointer"
              style={{
                color: isActive ? palette.primary : palette.textSecondary,
              }}
            >
              <div
                className="w-7 h-1 rounded-b-full transition-all"
                style={{
                  backgroundColor: isActive ? palette.primary : 'transparent',
                }}
              />
              <div
                className="w-8 h-7 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: isActive ? palette.primarySoft : 'transparent',
                }}
              >
                <IconComp size={17} strokeWidth={isActive ? 2.4 : 1.9} />
              </div>
              <span
                className={`text-[9px] leading-none ${
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

  // V6: Solid Brand Luxe Dock
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
          className="h-14 rounded-2xl px-2 flex items-center justify-between shadow-xl border transition-colors"
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
                className="flex items-center gap-1 py-1.5 px-2.5 rounded-xl transition-all cursor-pointer"
                style={{
                  backgroundColor: isActive
                    ? '#0B0F17'
                    : 'rgba(0, 0, 0, 0.14)',
                  color: isActive ? palette.primary : palette.primaryText,
                }}
              >
                <IconComp size={15} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[9px] font-extrabold tracking-tight">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // V7: Segmented Bento Grid
  if (variant === 'varient_7') {
    return (
      <div
        className="h-16 border-t px-2 py-2 grid grid-cols-5 gap-1 flex-shrink-0 z-30 transition-colors"
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
              className="rounded-xl border flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer"
              style={{
                backgroundColor: isActive ? palette.primarySoft : palette.surface,
                borderColor: isActive ? palette.primary : palette.border,
                color: isActive ? palette.primary : palette.textSecondary,
              }}
            >
              <IconComp size={15} strokeWidth={isActive ? 2.4 : 1.9} />
              <span className="text-[8px] font-extrabold leading-none">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  // V8: Brutalist Sharp Frame
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
          className="h-14 rounded-[4px] border-2 px-1 flex items-center justify-between gap-1 transition-all"
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
                <IconComp size={15} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[8px] font-extrabold uppercase tracking-wider leading-none">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // V9: Minimal Dot & Halo
  if (variant === 'varient_9') {
    return (
      <div
        className="px-3.5 pb-2.5 pt-1.5 flex-shrink-0 z-30 transition-colors"
        style={{
          backgroundColor: palette.background,
          fontFamily: activeFont.cssStack,
        }}
      >
        <div
          className="h-14 rounded-full border px-2 flex items-center justify-around shadow-md transition-all"
          style={{
            backgroundColor: palette.cardBackground,
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
                className="flex flex-col items-center justify-center gap-0.5 cursor-pointer"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: isActive ? palette.primary : 'transparent',
                    color: isActive ? palette.primaryText : palette.textSecondary,
                  }}
                >
                  <IconComp size={16} strokeWidth={isActive ? 2.4 : 1.9} />
                </div>
                {isActive && (
                  <span
                    className="w-1.5 h-1.5 rounded-full"
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

  // V10: Dual-Tone Split Deck
  if (variant === 'varient_10') {
    return (
      <div
        className="flex-shrink-0 z-30 transition-colors"
        style={{
          backgroundColor: palette.cardBackground,
          fontFamily: activeFont.cssStack,
        }}
      >
        <div
          className="h-[3px] w-full"
          style={{ backgroundColor: palette.primary }}
        />
        <div className="h-15 px-2 py-1.5 flex items-center justify-between gap-1.5">
          {tabs.map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className="flex-1 h-11 rounded-xl border flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer"
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
                <IconComp size={15} strokeWidth={isActive ? 2.4 : 1.9} />
                <span className="text-[9px] font-extrabold leading-none">
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
  // VARIANT 1 (DEFAULT): Exact CyberShield 5-Tab Bar from Uploaded Screenshots
  // =========================================================================
  return (
    <div
      className="h-16 border-t flex items-center justify-around px-2 flex-shrink-0 z-30 transition-colors"
      style={{
        backgroundColor: palette.background,
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
            className="flex flex-col items-center justify-center gap-1 py-1.5 px-2.5 rounded-xl transition-all cursor-pointer"
            style={{
              color: active ? palette.primary : palette.textSecondary,
            }}
          >
            <IconComp size={20} strokeWidth={active ? 2.4 : 1.9} />
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

export default VpnBottomNavBar;
