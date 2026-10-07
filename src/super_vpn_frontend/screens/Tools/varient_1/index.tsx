import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Split,
  Globe,
  EyeOff,
  Wifi,
  Lock,
  RefreshCw,
  CheckCircle2,
  Server,
} from 'lucide-react';
import {
  getVpnThemeScopeStyle,
  useVpnDesignSystem,
} from '../../../styles/vpnDesignSystem';

export interface ToolsVarient1Props {
  variant?: 'varient_1' | 'varient_2' | 'varient_3' | 'varient_4' | 'varient_5';
  onOpenServers?: () => void;
  onTriggerToast?: (msg: string) => void;
}

type VpnProtocolType = 'WireGuard v3' | 'OpenVPN TCP' | 'IKEv2 Stealth';

export const ToolsVarient1: React.FC<ToolsVarient1Props> = ({
  variant = 'varient_1',
  onOpenServers,
  onTriggerToast,
}) => {
  const {
    palette,
    activeFont,
    isDark,
    colorPresetId,
    killSwitch,
    setKillSwitch,
    cyberShieldAdblock,
    setCyberShieldAdblock,
    autoArmorWifi,
    setAutoArmorWifi,
  } = useVpnDesignSystem();

  const [selectedProtocol, setSelectedProtocol] =
    useState<VpnProtocolType>('WireGuard v3');
  const [multiHopEnabled, setMultiHopEnabled] = useState(true);
  const [stealthObfuscation, setStealthObfuscation] = useState(true);
  const [splitApps, setSplitApps] = useState<Record<string, boolean>>({
    banking: true,
    streaming: false,
    gaming: true,
  });

  const runDnsLeakTest = () => {
    onTriggerToast?.(
      'DNS & WebRTC Leak Audit Passed: 0 Leaks Detected (AS13030)'
    );
  };

  return (
    <div
      className="vpn-theme-scope px-4 pt-2 pb-6 space-y-4 select-none"
      style={getVpnThemeScopeStyle(palette, activeFont)}
      data-vpn-dark={isDark ? 'true' : 'false'}
      data-vpn-preset={colorPresetId}
    >
      {/* 1. SECURITY POSTURE BANNER (5 Distinct Variants) */}
      {variant === 'varient_2' ? (
        /* V2: 2-Column Defense Readiness Cards */
        <div className="grid grid-cols-2 gap-2.5">
          <div
            className="rounded-2xl border p-3.5 space-y-1.5"
            style={{
              backgroundColor: palette.cardBackground,
              borderColor: palette.primary,
            }}
          >
            <ShieldCheck size={20} style={{ color: palette.primary }} />
            <div className="text-[13px] font-extrabold" style={{ color: palette.textPrimary }}>
              6 Shields Armed
            </div>
            <div className="text-[10px] text-emerald-400 font-bold">
              Zero DNS Leak Verified
            </div>
          </div>
          <div
            onClick={runDnsLeakTest}
            className="rounded-2xl border p-3.5 flex flex-col justify-between cursor-pointer"
            style={{
              backgroundColor: palette.primarySoft,
              borderColor: palette.primaryBorder,
            }}
          >
            <span className="text-[10px] font-extrabold uppercase" style={{ color: palette.primary }}>
              LIVE DIAGNOSTIC
            </span>
            <div className="text-[13px] font-extrabold" style={{ color: palette.textPrimary }}>
              Run Leak Audit →
            </div>
          </div>
        </div>
      ) : variant === 'varient_3' ? (
        /* V3: Brutalist Defense Command Frame */
        <div
          className="rounded-xl border-2 p-4 flex items-center justify-between gap-3"
          style={{
            backgroundColor: palette.cardBackground,
            borderColor: palette.primary,
            boxShadow: `4px 4px 0px ${palette.primary}`,
          }}
        >
          <div>
            <span
              className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase"
              style={{
                backgroundColor: palette.primary,
                color: palette.primaryText,
              }}
            >
              DEFENSE // FORTIFIED
            </span>
            <div className="text-[15px] font-black mt-1" style={{ color: palette.textPrimary }}>
              ALL 6 TACTICAL SHIELDS ARMED
            </div>
          </div>
          <button
            type="button"
            onClick={runDnsLeakTest}
            className="px-3 py-2 rounded border-2 text-[11px] font-extrabold uppercase cursor-pointer"
            style={{
              borderColor: palette.primary,
              color: palette.primary,
            }}
          >
            AUDIT
          </button>
        </div>
      ) : variant === 'varient_4' ? (
        /* V4: Solid Brand Luxe Defense Hero */
        <div
          className="rounded-2xl p-4 flex items-center justify-between gap-3 shadow-md"
          style={{
            backgroundColor: palette.primary,
            color: palette.primaryText,
          }}
        >
          <div className="flex items-center gap-3">
            <ShieldCheck size={26} />
            <div>
              <div className="text-[10px] font-extrabold uppercase opacity-85">
                FORTIFIED DEFENSE SUITE
              </div>
              <div className="text-[15px] font-extrabold">
                All 6 Security Shields Armed
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={runDnsLeakTest}
            className="h-8 px-3 rounded-xl bg-black/25 text-white text-[11px] font-extrabold cursor-pointer"
          >
            Audit
          </button>
        </div>
      ) : variant === 'varient_5' ? (
        /* V5: Accent Left-Rail Security Ledger */
        <div
          className="rounded-2xl border border-l-4 p-4 flex items-center justify-between gap-3"
          style={{
            backgroundColor: palette.cardBackground,
            borderColor: palette.border,
            borderLeftColor: palette.primary,
          }}
        >
          <div>
            <div className="text-[10px] font-extrabold uppercase text-emerald-400">
              ZERO-TRUST ARMOR ACTIVE
            </div>
            <div className="text-[14px] font-extrabold mt-0.5" style={{ color: palette.textPrimary }}>
              ChaCha20-Poly1305 • 0 Leaks
            </div>
          </div>
          <button
            type="button"
            onClick={runDnsLeakTest}
            className="h-8 px-3 rounded-xl text-[11px] font-extrabold cursor-pointer"
            style={{
              backgroundColor: palette.primarySoft,
              color: palette.primary,
            }}
          >
            Verify
          </button>
        </div>
      ) : (
        <div
          className="rounded-2xl border p-4 flex items-center justify-between gap-3"
          style={{
            backgroundColor: palette.cardBackground,
            borderColor: palette.primaryBorder,
            backgroundImage: `linear-gradient(135deg, ${palette.primarySoft} 0%, transparent 75%)`,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: palette.primarySoft,
                color: palette.primary,
              }}
            >
              <ShieldCheck size={24} />
            </div>
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                FORTIFIED DEFENSE SUITE
              </div>
              <div
                className="text-[15px] font-extrabold mt-0.5"
                style={{ color: palette.textPrimary }}
              >
                All 6 Security Shields Armed
              </div>
              <div
                className="text-[11px]"
                style={{ color: palette.textSecondary }}
              >
                ChaCha20-Poly1305 • Zero DNS Leak
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={runDnsLeakTest}
            className="h-8 px-3 rounded-xl text-[11px] font-extrabold cursor-pointer flex-shrink-0"
            style={{
              backgroundColor: palette.primary,
              color: palette.primaryText,
            }}
          >
            Audit
          </button>
        </div>
      )}

      {/* 2. CRYPTOGRAPHIC PROTOCOL SELECTOR */}
      <div
        className="rounded-2xl border p-4 space-y-3"
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: palette.border,
        }}
      >
        <div className="flex items-center justify-between">
          <span
            className="text-[12px] font-extrabold uppercase tracking-wider"
            style={{ color: palette.textSecondary }}
          >
            TUNNEL PROTOCOL ENGINE
          </span>
          <span
            className="text-[11px] font-bold"
            style={{ color: palette.primary }}
          >
            {selectedProtocol}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {(
            ['WireGuard v3', 'OpenVPN TCP', 'IKEv2 Stealth'] as VpnProtocolType[]
          ).map((proto) => {
            const active = selectedProtocol === proto;
            return (
              <button
                key={proto}
                type="button"
                onClick={() => {
                  setSelectedProtocol(proto);
                  onTriggerToast?.(`Switched cryptographic engine to ${proto}`);
                }}
                className="p-2.5 rounded-xl border text-center cursor-pointer transition"
                style={{
                  backgroundColor: active
                    ? palette.primarySoft
                    : palette.surface,
                  borderColor: active ? palette.primary : palette.border,
                  color: active ? palette.primary : palette.textSecondary,
                }}
              >
                <div className="text-[11px] font-extrabold truncate">
                  {proto}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. CORE TACTICAL TOGGLES */}
      <div
        className="rounded-2xl border divide-y overflow-hidden"
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: palette.border,
        }}
      >
        {/* System-Wide Kill Switch */}
        <div
          className="p-3.5 flex items-center justify-between gap-3"
          style={{ borderColor: palette.border }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: palette.surface,
                color: '#10B981',
              }}
            >
              <ShieldAlert size={18} />
            </div>
            <div className="min-w-0">
              <div
                className="text-[13px] font-extrabold"
                style={{ color: palette.textPrimary }}
              >
                System Kill Switch
              </div>
              <div
                className="text-[11px] truncate"
                style={{ color: palette.textSecondary }}
              >
                Block all traffic if VPN tunnel drops
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setKillSwitch((v) => !v)}
            className="w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer flex-shrink-0"
            style={{
              backgroundColor: killSwitch ? palette.primary : palette.surface,
            }}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                killSwitch ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Multi-Hop Double VPN */}
        <div
          className="p-3.5 flex items-center justify-between gap-3"
          style={{ borderColor: palette.border }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: palette.surface,
                color: palette.primary,
              }}
            >
              <Server size={18} />
            </div>
            <div className="min-w-0">
              <div
                className="text-[13px] font-extrabold"
                style={{ color: palette.textPrimary }}
              >
                Multi-Hop Double VPN
              </div>
              <div
                className="text-[11px] truncate"
                style={{ color: palette.textSecondary }}
              >
                Route via Zurich #04 → Frankfurt #12
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMultiHopEnabled((v) => !v)}
            className="w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer flex-shrink-0"
            style={{
              backgroundColor: multiHopEnabled
                ? palette.primary
                : palette.surface,
            }}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                multiHopEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* CyberShield NetShield Ad/Malware Blocker */}
        <div
          className="p-3.5 flex items-center justify-between gap-3"
          style={{ borderColor: palette.border }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: palette.surface,
                color: palette.primary,
              }}
            >
              <EyeOff size={18} />
            </div>
            <div className="min-w-0">
              <div
                className="text-[13px] font-extrabold"
                style={{ color: palette.textPrimary }}
              >
                CyberShield DNS Blocker
              </div>
              <div
                className="text-[11px] truncate"
                style={{ color: palette.textSecondary }}
              >
                1,708 trackers &amp; malware domains blocked
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setCyberShieldAdblock((v) => !v)}
            className="w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer flex-shrink-0"
            style={{
              backgroundColor: cyberShieldAdblock
                ? palette.primary
                : palette.surface,
            }}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                cyberShieldAdblock ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Stealth DPI Obfuscation */}
        <div
          className="p-3.5 flex items-center justify-between gap-3"
          style={{ borderColor: palette.border }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: palette.surface,
                color: '#F59E0B',
              }}
            >
              <Lock size={18} />
            </div>
            <div className="min-w-0">
              <div
                className="text-[13px] font-extrabold"
                style={{ color: palette.textPrimary }}
              >
                Stealth DPI Obfuscation
              </div>
              <div
                className="text-[11px] truncate"
                style={{ color: palette.textSecondary }}
              >
                Mask VPN packets as standard HTTPS/TLS
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setStealthObfuscation((v) => !v)}
            className="w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer flex-shrink-0"
            style={{
              backgroundColor: stealthObfuscation
                ? palette.primary
                : palette.surface,
            }}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                stealthObfuscation ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Auto-Armor Wi-Fi */}
        <div
          className="p-3.5 flex items-center justify-between gap-3"
          style={{ borderColor: palette.border }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: palette.surface,
                color: '#10B981',
              }}
            >
              <Wifi size={18} />
            </div>
            <div className="min-w-0">
              <div
                className="text-[13px] font-extrabold"
                style={{ color: palette.textPrimary }}
              >
                Auto-Armor Public Wi-Fi
              </div>
              <div
                className="text-[11px] truncate"
                style={{ color: palette.textSecondary }}
              >
                Auto-connect on untrusted SSIDs
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setAutoArmorWifi((v) => !v)}
            className="w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer flex-shrink-0"
            style={{
              backgroundColor: autoArmorWifi
                ? palette.primary
                : palette.surface,
            }}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                autoArmorWifi ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* 4. SPLIT TUNNELING APP ROUTING */}
      <div
        className="rounded-2xl border p-4 space-y-3"
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: palette.border,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Split size={16} style={{ color: palette.primary }} />
            <span
              className="text-[14px] font-extrabold"
              style={{ color: palette.textPrimary }}
            >
              Split Tunneling Routing
            </span>
          </div>
          <span className="text-[10px] font-bold text-emerald-400">
            Per-App Rules
          </span>
        </div>

        <div className="space-y-2">
          {[
            {
              id: 'banking',
              title: 'Mobile Banking & FinTech',
              desc: 'Bypass VPN for local IP verification',
            },
            {
              id: 'streaming',
              title: 'Ultra HD Streaming Apps',
              desc: 'Route via fastest regional media hub',
            },
            {
              id: 'gaming',
              title: 'Low-Ping Competitive Gaming',
              desc: 'Direct UDP low-jitter acceleration',
            },
          ].map((rule) => {
            const active = splitApps[rule.id];
            return (
              <div
                key={rule.id}
                onClick={() =>
                  setSplitApps((prev) => ({
                    ...prev,
                    [rule.id]: !prev[rule.id],
                  }))
                }
                className="p-2.5 rounded-xl border flex items-center justify-between gap-2 cursor-pointer"
                style={{
                  backgroundColor: palette.surface,
                  borderColor: active ? palette.primaryBorder : palette.border,
                }}
              >
                <div>
                  <div
                    className="text-[12px] font-extrabold"
                    style={{ color: palette.textPrimary }}
                  >
                    {rule.title}
                  </div>
                  <div
                    className="text-[10px]"
                    style={{ color: palette.textSecondary }}
                  >
                    {rule.desc}
                  </div>
                </div>
                <span
                  className="px-2 py-0.5 rounded-md text-[10px] font-extrabold"
                  style={{
                    backgroundColor: active
                      ? palette.primarySoft
                      : palette.cardBackground,
                    color: active ? palette.primary : palette.textSecondary,
                  }}
                >
                  {active ? 'Routed' : 'Standard'}
                </span>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onOpenServers?.()}
          className="w-full h-10 rounded-xl font-extrabold text-[12px] flex items-center justify-center gap-2 cursor-pointer"
          style={{
            backgroundColor: palette.primary,
            color: palette.primaryText,
          }}
        >
          <Globe size={14} />
          <span>Configure Multi-Hop Entry &amp; Exit Nodes</span>
        </button>
      </div>
    </div>
  );
};

export default ToolsVarient1;
