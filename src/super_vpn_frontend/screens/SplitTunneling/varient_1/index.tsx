import React, { useState } from 'react';
import {
  ArrowLeft,
  Split,
  Search,
  CheckCircle2,
  Shield,
  Globe,
  Tv,
  Gamepad2,
  Landmark,
  MessageSquare,
  Cloud,
} from 'lucide-react';
import {
  getVpnThemeScopeStyle,
  useVpnDesignSystem,
} from '../../../styles/vpnDesignSystem';

export interface SplitTunnelingVarient1Props {
  variant?: 'varient_1' | 'varient_2' | 'varient_3' | 'varient_4' | 'varient_5';
  onBack?: () => void;
  onTriggerToast?: (msg: string) => void;
}

export const SplitTunnelingVarient1: React.FC<SplitTunnelingVarient1Props> = ({
  variant = 'varient_1',
  onBack,
  onTriggerToast,
}) => {
  const { palette, activeFont, isDark, colorPresetId } = useVpnDesignSystem();

  const [routingMode, setRoutingMode] = useState<'exclude' | 'include'>('exclude');
  const [searchQuery, setSearchQuery] = useState('');
  const [apps, setApps] = useState([
    {
      id: 'chase',
      name: 'Chase & Revolut Banking',
      pkg: 'com.fin.banking',
      category: 'FinTech',
      routedViaVpn: false,
      icon: Landmark,
    },
    {
      id: 'netflix',
      name: 'Netflix & BBC iPlayer 4K',
      pkg: 'com.media.stream',
      category: 'Streaming',
      routedViaVpn: true,
      icon: Tv,
    },
    {
      id: 'valorant',
      name: 'Low-Ping Cloud Gaming',
      pkg: 'com.game.udp',
      category: 'Gaming',
      routedViaVpn: true,
      icon: Gamepad2,
    },
    {
      id: 'signal',
      name: 'Signal Encrypted Messenger',
      pkg: 'org.thoughtcrime.securesms',
      category: 'Messaging',
      routedViaVpn: true,
      icon: MessageSquare,
    },
    {
      id: 'brave',
      name: 'Brave Privacy Browser',
      pkg: 'com.brave.browser',
      category: 'Browser',
      routedViaVpn: true,
      icon: Globe,
    },
    {
      id: 'icloud',
      name: 'iCloud & Local NAS Backup',
      pkg: 'com.apple.icloud',
      category: 'System',
      routedViaVpn: false,
      icon: Cloud,
    },
  ]);

  const toggleAppRoute = (id: string, name: string) => {
    setApps((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, routedViaVpn: !a.routedViaVpn } : a
      )
    );
    onTriggerToast?.(`Updated Split-Tunnel rule for ${name}`);
  };

  const filteredApps = apps.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="vpn-theme-scope px-4 pt-3 pb-6 space-y-4 select-none"
      style={getVpnThemeScopeStyle(palette, activeFont)}
      data-vpn-dark={isDark ? 'true' : 'false'}
      data-vpn-preset={colorPresetId}
    >
      {/* Top Sub-Header */}
      <div className="flex items-center justify-between gap-2 pb-1">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-xl border flex items-center justify-center cursor-pointer transition"
            style={{
              backgroundColor: palette.cardBackground,
              borderColor: palette.border,
              color: palette.textPrimary,
            }}
          >
            <ArrowLeft size={17} />
          </button>
          <div>
            <h2
              className="text-[17px] font-extrabold leading-tight"
              style={{ color: palette.textPrimary }}
            >
              Split Tunneling Matrix
            </h2>
            <p
              className="text-[11px]"
              style={{ color: palette.textSecondary }}
            >
              Per-app encrypted tunnel vs direct ISP routing
            </p>
          </div>
        </div>
        <Split size={18} style={{ color: palette.primary }} />
      </div>

      {/* Mode Switcher */}
      <div
        className="rounded-2xl border p-1.5 grid grid-cols-2 gap-1.5"
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: palette.border,
        }}
      >
        <button
          type="button"
          onClick={() => setRoutingMode('exclude')}
          className="h-9 rounded-xl text-[11px] font-extrabold cursor-pointer transition"
          style={{
            backgroundColor:
              routingMode === 'exclude' ? palette.primary : 'transparent',
            color:
              routingMode === 'exclude'
                ? palette.primaryText
                : palette.textSecondary,
          }}
        >
          Bypass Selected Apps
        </button>
        <button
          type="button"
          onClick={() => setRoutingMode('include')}
          className="h-9 rounded-xl text-[11px] font-extrabold cursor-pointer transition"
          style={{
            backgroundColor:
              routingMode === 'include' ? palette.primary : 'transparent',
            color:
              routingMode === 'include'
                ? palette.primaryText
                : palette.textSecondary,
          }}
        >
          Only Tunnel Selected
        </button>
      </div>

      {/* Search Bar */}
      <div
        className="h-[42px] rounded-2xl border px-3.5 flex items-center gap-2.5"
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: palette.border,
        }}
      >
        <Search size={15} style={{ color: palette.textSecondary }} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search installed applications..."
          className="w-full text-[12px] bg-transparent focus:outline-none"
          style={{ color: palette.textPrimary }}
        />
      </div>

      {/* App Rules List (5 Distinct Variants) */}
      <div
        className={
          variant === 'varient_2' ? 'grid grid-cols-2 gap-2.5' : 'space-y-2.5'
        }
      >
        {filteredApps.map((app) => {
          const IconComp = app.icon;
          return (
            <div
              key={app.id}
              onClick={() => toggleAppRoute(app.id, app.name)}
              className={`p-3.5 flex ${
                variant === 'varient_2'
                  ? 'flex-col items-start gap-2.5 rounded-2xl border'
                  : variant === 'varient_3'
                  ? 'items-center justify-between gap-3 rounded-xl border-2'
                  : variant === 'varient_4'
                  ? 'items-center justify-between gap-3 rounded-2xl border border-l-4'
                  : 'items-center justify-between gap-3 rounded-2xl border'
              } cursor-pointer transition`}
              style={{
                backgroundColor:
                  variant === 'varient_5' && app.routedViaVpn
                    ? palette.primarySoft
                    : palette.cardBackground,
                borderColor: app.routedViaVpn
                  ? palette.primaryBorder
                  : palette.border,
                borderLeftColor:
                  variant === 'varient_4'
                    ? app.routedViaVpn
                      ? palette.primary
                      : palette.border
                    : undefined,
                boxShadow:
                  variant === 'varient_3'
                    ? `3px 3px 0px ${
                        app.routedViaVpn ? palette.primary : palette.border
                      }`
                    : undefined,
              }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: app.routedViaVpn
                      ? palette.primarySoft
                      : palette.surface,
                    color: app.routedViaVpn
                      ? palette.primary
                      : palette.textSecondary,
                  }}
                >
                  <IconComp size={18} />
                </div>
                <div className="min-w-0">
                  <div
                    className="text-[13px] font-extrabold truncate"
                    style={{ color: palette.textPrimary }}
                  >
                    {app.name}
                  </div>
                  <div
                    className="text-[10px] font-mono truncate mt-0.5"
                    style={{ color: palette.textSecondary }}
                  >
                    {app.pkg} • {app.category}
                  </div>
                </div>
              </div>

              <span
                className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold flex items-center gap-1 flex-shrink-0"
                style={{
                  backgroundColor: app.routedViaVpn
                    ? palette.primarySoft
                    : palette.surface,
                  color: app.routedViaVpn
                    ? palette.primary
                    : palette.textSecondary,
                }}
              >
                {app.routedViaVpn ? (
                  <>
                    <Shield size={11} />
                    <span>VPN Tunnel</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={11} />
                    <span>Direct ISP</span>
                  </>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SplitTunnelingVarient1;
