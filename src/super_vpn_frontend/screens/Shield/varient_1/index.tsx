import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  Lock,
  Unlock,
  Globe,
  ArrowDown,
  ArrowUp,
  Zap,
  RefreshCw,
  ChevronRight,
  Fingerprint,
  CheckCircle2,
  Eye,
  EyeOff,
  Smartphone,
  MapPin,
} from 'lucide-react';
import {
  formatVpnUptime,
  getVpnThemeScopeStyle,
  useVpnDesignSystem,
} from '../../../styles/vpnDesignSystem';

export type VpnScreenVariantId =
  | 'varient_1'
  | 'varient_2'
  | 'varient_3'
  | 'varient_4'
  | 'varient_5';

export interface ShieldVarient1Props {
  variant?: VpnScreenVariantId;
  onOpenServers?: () => void;
  onOpenSpeed?: () => void;
  onOpenTools?: () => void;
  onOpenAccount?: () => void;
  onTriggerToast?: (msg: string) => void;
}

export const ShieldVarient1: React.FC<ShieldVarient1Props> = ({
  variant = 'varient_1',
  onOpenServers,
  onOpenSpeed,
  onOpenTools,
  onTriggerToast,
}) => {
  const {
    palette,
    activeFont,
    isDark,
    colorPresetId,
    isConnected,
    setIsConnected,
    sessionSeconds,
    selectedServer,
    killSwitch,
    setKillSwitch,
    cyberShieldAdblock,
    setCyberShieldAdblock,
    autoArmorWifi,
    setAutoArmorWifi,
  } = useVpnDesignSystem();

  const [showPhysicalIp, setShowPhysicalIp] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const connectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (connectTimerRef.current) {
        clearTimeout(connectTimerRef.current);
      }
    };
  }, []);

  const handleToggleConnection = () => {
    if (isConnecting) return;

    if (isConnected) {
      setIsConnected(false);
      onTriggerToast?.('VPN Tunnel Disconnected');
      return;
    }

    setIsConnecting(true);
    onTriggerToast?.(
      `Handshaking WireGuard keys with ${selectedServer.city} ${selectedServer.nodeNumber}...`
    );

    connectTimerRef.current = setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      onTriggerToast?.(
        `Encrypted tunnel established via ${selectedServer.city} ${selectedServer.nodeNumber}`
      );
    }, 1600);
  };

  const downSpeed = isConnected ? '78.4' : isConnecting ? '24.8' : '0.0';
  const upSpeed = isConnected ? '42.1' : isConnecting ? '11.6' : '0.0';
  const pingVal = isConnected
    ? String(selectedServer.pingMs)
    : isConnecting
    ? '...'
    : '--';
  const loadVal = isConnected
    ? `${selectedServer.loadPercent}%`
    : isConnecting
    ? 'SYNC'
    : '0%';

  return (
    <div
      className="vpn-theme-scope px-4 pt-2 pb-6 space-y-4 select-none"
      style={getVpnThemeScopeStyle(palette, activeFont)}
      data-vpn-dark={isDark ? 'true' : 'false'}
      data-vpn-preset={colorPresetId}
    >
      {/* 1. TOP PROTOCOL & ENCRYPTION PILLS (Exact Image 1 Header Sub-Bar) */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => {
            if (onOpenTools) {
              onOpenTools();
            } else {
              onTriggerToast?.('Protocol: WireGuard ChaCha20-Poly1305 Active');
            }
          }}
          className="flex-1 h-[42px] px-3.5 rounded-2xl border flex items-center gap-2 cursor-pointer transition"
          style={{
            backgroundColor: palette.cardBackground,
            borderColor: palette.border,
          }}
        >
          <Globe
            size={15}
            style={{ color: palette.primary }}
            className="flex-shrink-0"
          />
          <span
            className="text-[11px] font-extrabold tracking-wider uppercase"
            style={{ color: palette.textPrimary }}
          >
            WIREGUARD
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-500 flex-shrink-0" />
          <span
            className="text-[10px] font-semibold truncate"
            style={{ color: palette.textSecondary }}
          >
            ChaCha20-Poly1305
          </span>
        </button>

        <div
          className="h-[42px] px-3.5 rounded-2xl border flex items-center gap-2 flex-shrink-0"
          style={{
            backgroundColor: palette.cardBackground,
            borderColor: palette.border,
          }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <div className="leading-tight">
            <div className="text-[10px] font-extrabold text-emerald-400 tracking-wide">
              256-BIT
            </div>
            <div className="text-[9px] font-bold text-emerald-400/90 tracking-wider">
              MILITARY
            </div>
          </div>
        </div>
      </div>

      {/* 2. CENTRAL SHIELD CONNECT HERO (5 Distinct Variants) */}
      {variant === 'varient_2' ? (
        /* V2: Split Horizontal Tactical Command Deck */
        <div
          className="rounded-3xl border p-4 space-y-3.5"
          style={{
            backgroundColor: palette.cardBackground,
            borderColor:
              isConnected || isConnecting ? palette.primary : palette.border,
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isConnecting
                      ? 'bg-amber-400 animate-ping'
                      : isConnected
                      ? 'bg-emerald-400 animate-pulse'
                      : 'bg-rose-500'
                  }`}
                />
                <span
                  className="text-[10px] font-extrabold uppercase tracking-wider"
                  style={{ color: palette.primary }}
                >
                  {isConnecting
                    ? 'HANDSHAKING KEYS...'
                    : isConnected
                    ? 'QUANTUM TUNNEL LOCKED'
                    : 'TUNNEL STANDBY'}
                </span>
              </div>
              <h2
                className="text-[18px] font-extrabold leading-tight"
                style={{ color: palette.textPrimary }}
              >
                {isConnecting
                  ? 'Establishing Tunnel...'
                  : isConnected
                  ? 'Protected & Encrypted'
                  : 'Unprotected Device'}
              </h2>
              <div
                className="text-[12px] font-mono font-bold"
                style={{ color: palette.textSecondary }}
              >
                Uptime:{' '}
                <span style={{ color: palette.primary }}>
                  {isConnected ? formatVpnUptime(sessionSeconds) : '00:00:00'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleToggleConnection}
              className={`w-20 h-20 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 cursor-pointer transition active:scale-95 flex-shrink-0 shadow-lg ${
                isConnecting ? 'animate-pulse' : ''
              }`}
              style={{
                backgroundColor:
                  isConnected || isConnecting
                    ? palette.primary
                    : palette.surface,
                borderColor:
                  isConnected || isConnecting
                    ? palette.primary
                    : palette.border,
                color:
                  isConnected || isConnecting
                    ? palette.primaryText
                    : palette.textPrimary,
              }}
            >
              <Shield
                size={28}
                strokeWidth={2.2}
                className={isConnecting ? 'animate-bounce' : undefined}
              />
              <span className="text-[9px] font-extrabold uppercase tracking-wider">
                {isConnecting ? 'SYNCING' : isConnected ? 'ACTIVE' : 'CONNECT'}
              </span>
            </button>
          </div>
        </div>
      ) : variant === 'varient_3' ? (
        /* V3: Brutalist Hard-Edge Cyber Frame */
        <div
          onClick={handleToggleConnection}
          className={`rounded-xl border-2 p-5 flex items-center justify-between gap-4 cursor-pointer transition ${
            isConnecting ? 'animate-pulse' : ''
          }`}
          style={{
            backgroundColor: palette.cardBackground,
            borderColor: palette.primary,
            boxShadow: `4px 4px 0px ${palette.primary}`,
          }}
        >
          <div className="space-y-1.5">
            <span
              className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-widest inline-block"
              style={{
                backgroundColor: palette.primary,
                color: palette.primaryText,
              }}
            >
              {isConnecting
                ? 'STATUS // CONNECTING...'
                : isConnected
                ? 'STATUS // ARMED'
                : 'STATUS // OFFLINE'}
            </span>
            <h2
              className="text-[19px] font-black tracking-tight"
              style={{ color: palette.textPrimary }}
            >
              {isConnecting
                ? 'NEGOTIATING TUNNEL...'
                : isConnected
                ? 'SHIELD ENCRYPTED'
                : 'TAP TO ARM SHIELD'}
            </h2>
            <p
              className="text-[12px] font-mono font-bold"
              style={{ color: palette.textSecondary }}
            >
              SESSION: {isConnected ? formatVpnUptime(sessionSeconds) : '00:00:00'}
            </p>
          </div>
          <div
            className="w-16 h-16 rounded-xl border-2 flex items-center justify-center flex-shrink-0"
            style={{
              borderColor: palette.primary,
              backgroundColor: palette.primarySoft,
              color: palette.primary,
            }}
          >
            {isConnecting ? (
              <RefreshCw size={26} className="animate-spin" />
            ) : isConnected ? (
              <Lock size={28} />
            ) : (
              <Unlock size={28} />
            )}
          </div>
        </div>
      ) : variant === 'varient_4' ? (
        /* V4: Solid Brand Luxe Hero Card */
        <div
          onClick={handleToggleConnection}
          className={`rounded-3xl p-5 flex flex-col items-center text-center cursor-pointer shadow-lg transition active:scale-98 ${
            isConnecting ? 'animate-pulse' : ''
          }`}
          style={{
            backgroundColor:
              isConnected || isConnecting
                ? palette.primary
                : palette.cardBackground,
            color:
              isConnected || isConnecting
                ? palette.primaryText
                : palette.textPrimary,
            border: `1px solid ${palette.border}`,
          }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-3 shadow-md"
            style={{
              backgroundColor:
                isConnected || isConnecting
                  ? 'rgba(0,0,0,0.22)'
                  : palette.surface,
            }}
          >
            <Shield size={36} strokeWidth={2.2} />
          </div>
          <h2 className="text-[20px] font-extrabold tracking-tight">
            {isConnecting
              ? 'Connecting Tunnel...'
              : isConnected
              ? 'Protected & Encrypted'
              : 'Tap to Connect Shield'}
          </h2>
          <p className="text-[12px] font-mono font-bold opacity-90 mt-1">
            Session Uptime: {isConnected ? formatVpnUptime(sessionSeconds) : '00:00:00'}
          </p>
        </div>
      ) : variant === 'varient_5' ? (
        /* V5: Dual-Column Bento Connect + Quick Node Card */
        <div className="grid grid-cols-2 gap-3">
          <div
            onClick={handleToggleConnection}
            className={`rounded-2xl border p-4 flex flex-col items-center justify-center text-center cursor-pointer transition ${
              isConnecting ? 'animate-pulse' : ''
            }`}
            style={{
              backgroundColor: palette.cardBackground,
              borderColor:
                isConnected || isConnecting ? palette.primary : palette.border,
            }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2"
              style={{
                backgroundColor: palette.primarySoft,
                color: palette.primary,
              }}
            >
              <Shield size={28} />
            </div>
            <div
              className="text-[13px] font-extrabold"
              style={{ color: palette.textPrimary }}
            >
              {isConnecting
                ? 'Connecting...'
                : isConnected
                ? 'Tunnel Active'
                : 'Disconnected'}
            </div>
            <div
              className="text-[11px] font-mono font-bold mt-0.5"
              style={{ color: palette.primary }}
            >
              {isConnected ? formatVpnUptime(sessionSeconds) : '00:00:00'}
            </div>
          </div>

          <div
            onClick={() => onOpenServers?.()}
            className="rounded-2xl border p-4 flex flex-col justify-between cursor-pointer"
            style={{
              backgroundColor: palette.cardBackground,
              borderColor: palette.border,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{selectedServer.flag}</span>
              <span className="text-[10px] font-extrabold text-emerald-400">
                {selectedServer.pingMs} ms
              </span>
            </div>
            <div>
              <div
                className="text-[13px] font-extrabold truncate"
                style={{ color: palette.textPrimary }}
              >
                {selectedServer.city} {selectedServer.nodeNumber}
              </div>
              <div
                className="text-[10px] truncate"
                style={{ color: palette.textSecondary }}
              >
                {selectedServer.virtualIp}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* V1 (Default): Central Shield Connect Orb Card with Smooth Pulse Animation when Connecting */
        <div
          className="rounded-3xl border py-6 px-4 flex flex-col items-center justify-center relative overflow-hidden"
          style={{
            backgroundColor: palette.cardBackground,
            borderColor: isConnecting ? palette.primaryBorder : palette.border,
            backgroundImage:
              isConnected || isConnecting
                ? `radial-gradient(circle at 50% 42%, ${palette.primarySoft} 0%, transparent 68%)`
                : undefined,
          }}
        >
          {/* Outer Dashed Radar Ring */}
          <div
            onClick={handleToggleConnection}
            className="w-[186px] h-[186px] rounded-full border border-dashed flex items-center justify-center cursor-pointer transition-transform active:scale-95 relative"
            style={{
              borderColor:
                isConnected || isConnecting
                  ? palette.primaryBorder
                  : palette.border,
            }}
          >
            {/* Expanding Smooth Pulse Ripples while in 'connecting' state */}
            {isConnecting && (
              <>
                <span
                  className="absolute inset-0 rounded-full animate-ping pointer-events-none"
                  style={{
                    backgroundColor: palette.primarySoft,
                    border: `1.5px solid ${palette.primary}`,
                    opacity: 0.45,
                    animationDuration: '1.4s',
                  }}
                />
                <span
                  className="absolute inset-3 rounded-full animate-pulse pointer-events-none"
                  style={{
                    backgroundColor: palette.primarySoft,
                    border: `1px solid ${palette.primaryBorder}`,
                    opacity: 0.75,
                  }}
                />
              </>
            )}

            {/* Middle Glow Ring */}
            <div
              className={`w-[156px] h-[156px] rounded-full border flex items-center justify-center transition-all duration-500 ${
                isConnecting ? 'animate-pulse scale-105' : ''
              }`}
              style={{
                borderColor:
                  isConnected || isConnecting
                    ? palette.primaryBorder
                    : palette.border,
                backgroundColor:
                  isConnected || isConnecting
                    ? palette.primarySoft
                    : 'rgba(148,163,184,0.06)',
              }}
            >
              {/* Inner Core Shield Button */}
              <div
                className={`w-[126px] h-[126px] rounded-full border-2 flex flex-col items-center justify-center gap-1.5 shadow-xl transition-all duration-500 ${
                  isConnecting ? 'animate-pulse scale-[1.03]' : ''
                }`}
                style={{
                  backgroundColor: isDark ? '#111823' : palette.cardBackground,
                  borderColor:
                    isConnected || isConnecting
                      ? palette.primary
                      : palette.border,
                  boxShadow: isConnecting
                    ? `0 0 42px ${palette.primary}, 0 0 18px ${palette.primarySoft}`
                    : isConnected
                    ? `0 0 32px ${palette.primarySoft}`
                    : undefined,
                }}
              >
                <div
                  className={`relative flex items-center justify-center transition-transform duration-500 ${
                    isConnecting ? 'scale-110' : ''
                  }`}
                >
                  <Shield
                    size={44}
                    strokeWidth={1.8}
                    style={{
                      color:
                        isConnected || isConnecting
                          ? palette.primary
                          : palette.textMuted,
                    }}
                  />
                  {isConnecting ? (
                    <RefreshCw
                      size={15}
                      strokeWidth={2.5}
                      className="absolute animate-spin"
                      style={{ color: palette.primary }}
                    />
                  ) : isConnected ? (
                    <Lock
                      size={16}
                      strokeWidth={2.5}
                      className="absolute"
                      style={{ color: palette.primary }}
                    />
                  ) : (
                    <Unlock
                      size={16}
                      strokeWidth={2.5}
                      className="absolute"
                      style={{ color: palette.textMuted }}
                    />
                  )}
                </div>
                <span
                  className="text-[10px] font-extrabold tracking-widest uppercase"
                  style={{
                    color:
                      isConnected || isConnecting
                        ? palette.primary
                        : palette.textMuted,
                  }}
                >
                  {isConnecting
                    ? 'CONNECTING...'
                    : isConnected
                    ? 'CONNECTED'
                    : 'TAP CONNECT'}
                </span>
              </div>
            </div>
          </div>

          {/* Status Headline & Live Uptime Timer */}
          <div className="mt-4 flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isConnecting
                  ? 'bg-amber-400 animate-ping'
                  : isConnected
                  ? 'bg-emerald-400 animate-pulse'
                  : 'bg-rose-500'
              }`}
            />
            <h2
              className="text-[19px] font-extrabold tracking-tight"
              style={{ color: palette.textPrimary }}
            >
              {isConnecting
                ? 'Establishing Encrypted Tunnel...'
                : isConnected
                ? 'Protected & Encrypted'
                : 'Unprotected Connection'}
            </h2>
          </div>
          <p
            className="text-[12px] font-medium mt-1"
            style={{ color: palette.textSecondary }}
          >
            {isConnecting ? (
              <span
                className="font-mono font-extrabold animate-pulse"
                style={{ color: palette.primary }}
              >
                Handshaking WireGuard ChaCha20 keys...
              </span>
            ) : (
              <>
                Session Uptime:{' '}
                <span
                  className="font-mono font-extrabold"
                  style={{
                    color: isConnected ? palette.primary : palette.textMuted,
                  }}
                >
                  {isConnected ? formatVpnUptime(sessionSeconds) : '00:00:00'}
                </span>
              </>
            )}
          </p>
        </div>
      )}

      {/* 3. 4-COLUMN TELEMETRY STRIP (DOWN | UP | PING | LOAD - Exact Image 1) */}
      <div
        onClick={() => onOpenSpeed?.()}
        className="rounded-2xl border p-2.5 grid grid-cols-4 gap-2 cursor-pointer"
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: palette.border,
        }}
      >
        {/* DOWN */}
        <div
          className="rounded-xl p-2.5 flex flex-col items-center justify-center text-center"
          style={{ backgroundColor: palette.surface }}
        >
          <div className="flex items-center gap-1 text-[10px] font-extrabold text-emerald-400">
            <ArrowDown size={11} strokeWidth={2.5} />
            <span>DOWN</span>
          </div>
          <div
            className="text-[17px] font-extrabold mt-1 leading-none"
            style={{ color: palette.textPrimary }}
          >
            {downSpeed}
          </div>
          <div
            className="text-[10px] font-semibold mt-1"
            style={{ color: palette.textSecondary }}
          >
            Mbps
          </div>
        </div>

        {/* UP */}
        <div
          className="rounded-xl p-2.5 flex flex-col items-center justify-center text-center"
          style={{ backgroundColor: palette.surface }}
        >
          <div
            className="flex items-center gap-1 text-[10px] font-extrabold"
            style={{ color: palette.primary }}
          >
            <ArrowUp size={11} strokeWidth={2.5} />
            <span>UP</span>
          </div>
          <div
            className="text-[17px] font-extrabold mt-1 leading-none"
            style={{ color: palette.textPrimary }}
          >
            {upSpeed}
          </div>
          <div
            className="text-[10px] font-semibold mt-1"
            style={{ color: palette.textSecondary }}
          >
            Mbps
          </div>
        </div>

        {/* PING */}
        <div
          className="rounded-xl p-2.5 flex flex-col items-center justify-center text-center"
          style={{ backgroundColor: palette.surface }}
        >
          <div className="flex items-center gap-1 text-[10px] font-extrabold text-emerald-400">
            <Zap size={11} strokeWidth={2.5} />
            <span>PING</span>
          </div>
          <div className="text-[17px] font-extrabold mt-1 leading-none text-emerald-400">
            {pingVal}
          </div>
          <div
            className="text-[10px] font-semibold mt-1"
            style={{ color: palette.textSecondary }}
          >
            ms
          </div>
        </div>

        {/* LOAD */}
        <div
          className="rounded-xl p-2.5 flex flex-col items-center justify-center text-center"
          style={{ backgroundColor: palette.surface }}
        >
          <div className="flex items-center gap-1 text-[10px] font-extrabold text-amber-400">
            <RefreshCw size={10} strokeWidth={2.5} />
            <span>LOAD</span>
          </div>
          <div
            className="text-[17px] font-extrabold mt-1 leading-none"
            style={{ color: palette.textPrimary }}
          >
            {loadVal}
          </div>
          <div className="text-[10px] font-bold mt-1 text-emerald-400">
            Optimal
          </div>
        </div>
      </div>

      {/* 4. CONNECTED SERVER NODE CARD (Exact Image 1) */}
      <div
        className="rounded-2xl border p-4 space-y-3"
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: palette.border,
        }}
      >
        <div className="flex items-center justify-between">
          <span
            className="text-[10px] font-extrabold tracking-wider uppercase"
            style={{ color: palette.textSecondary }}
          >
            CONNECTED SERVER NODE
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-extrabold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {selectedServer.bandwidth}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border"
              style={{
                backgroundColor: palette.surface,
                borderColor: palette.border,
              }}
            >
              {selectedServer.flag}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span
                  className="text-[16px] font-extrabold truncate"
                  style={{ color: palette.textPrimary }}
                >
                  {selectedServer.country}
                </span>
                <span
                  className="text-[13px] font-bold"
                  style={{ color: palette.textSecondary }}
                >
                  {selectedServer.nodeNumber}
                </span>
              </div>
              <div
                className="text-[12px] truncate mt-0.5"
                style={{ color: palette.textSecondary }}
              >
                {selectedServer.datacenter}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenServers?.()}
            className="h-9 px-3.5 rounded-xl border flex items-center gap-1 text-[12px] font-extrabold flex-shrink-0 cursor-pointer transition"
            style={{
              backgroundColor: palette.surface,
              borderColor: palette.border,
              color: palette.primary,
            }}
          >
            <span>Change</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Server Load Progress Bar */}
        <div
          className="h-2 w-full rounded-full overflow-hidden"
          style={{ backgroundColor: palette.surface }}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${selectedServer.loadPercent}%`,
              backgroundColor: palette.primary,
            }}
          />
        </div>
      </div>

      {/* 5. IP CLOAKING MATRIX (Exact Image 1) */}
      <div
        className="rounded-2xl border p-4 space-y-3"
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: palette.border,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Fingerprint size={17} style={{ color: palette.primary }} />
            <span
              className="text-[15px] font-extrabold"
              style={{ color: palette.textPrimary }}
            >
              IP Cloaking Matrix
            </span>
          </div>
          <span className="text-[10px] font-extrabold tracking-wider uppercase text-emerald-400">
            DNS LEAK PROOF
          </span>
        </div>

        {/* Virtual IP Box */}
        <div
          className="rounded-xl p-3 border flex items-center justify-between gap-2"
          style={{
            backgroundColor: palette.surface,
            borderColor: palette.border,
          }}
        >
          <div>
            <div
              className="text-[10px] font-extrabold uppercase tracking-wider"
              style={{ color: palette.textSecondary }}
            >
              VIRTUAL IP (VISIBLE TO WEB)
            </div>
            <div
              className="text-[15px] font-mono font-extrabold mt-0.5"
              style={{ color: palette.textPrimary }}
            >
              {isConnected ? selectedServer.virtualIp : 'Unassigned (Offline)'}
            </div>
            <div
              className="text-[11px] mt-0.5"
              style={{ color: palette.textSecondary }}
            >
              {selectedServer.city}, {selectedServer.country} ({selectedServer.asn})
            </div>
          </div>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: palette.primarySoft,
              color: palette.primary,
            }}
          >
            <CheckCircle2 size={16} />
          </div>
        </div>

        {/* Original Physical IP Box */}
        <div
          className="rounded-xl p-3 border flex items-center justify-between gap-2"
          style={{
            backgroundColor: palette.surface,
            borderColor: palette.border,
          }}
        >
          <div>
            <div
              className="text-[10px] font-extrabold uppercase tracking-wider"
              style={{ color: palette.textSecondary }}
            >
              ORIGINAL PHYSICAL IP
            </div>
            <div
              className="text-[13px] font-mono font-bold mt-1 tracking-widest"
              style={{ color: palette.textSecondary }}
            >
              {showPhysicalIp ? '73.162.88.214 (ISP)' : '• • • • • • • • • • • • • •'}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 mt-1">
              <Lock size={11} />
              <span>Masked &amp; Invisible</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowPhysicalIp((prev) => !prev)}
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer"
            style={{
              backgroundColor: palette.cardBackground,
              color: palette.textSecondary,
            }}
            title="Toggle Physical IP Visibility"
          >
            {showPhysicalIp ? <Eye size={15} /> : <EyeOff size={15} />}
          </button>
        </div>
      </div>

      {/* 6. TACTICAL DEFENSE MODULES (3-Column Interactive Grid - Exact Image 1) */}
      <div className="space-y-2.5">
        <div
          className="text-[11px] font-extrabold uppercase tracking-wider px-0.5"
          style={{ color: palette.textSecondary }}
        >
          TACTICAL DEFENSE MODULES
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {/* Kill Switch */}
          <button
            type="button"
            onClick={() => {
              setKillSwitch((v) => !v);
              onTriggerToast?.(
                `Kill Switch ${!killSwitch ? 'Armed' : 'Standby'}`
              );
            }}
            className="rounded-2xl border p-3 text-left flex flex-col justify-between h-[96px] cursor-pointer transition"
            style={{
              backgroundColor: palette.cardBackground,
              borderColor: killSwitch ? palette.primaryBorder : palette.border,
            }}
          >
            <div className="flex items-center justify-between w-full">
              <Shield
                size={16}
                style={{
                  color: killSwitch ? '#10B981' : palette.textMuted,
                }}
              />
              <span
                className={`w-2 h-2 rounded-full ${
                  killSwitch ? 'bg-emerald-400' : 'bg-slate-600'
                }`}
              />
            </div>
            <div>
              <div
                className="text-[12px] font-extrabold leading-tight"
                style={{ color: palette.textPrimary }}
              >
                Kill Switch
              </div>
              <div
                className="text-[10px] font-bold mt-0.5"
                style={{
                  color: killSwitch ? '#10B981' : palette.textSecondary,
                }}
              >
                {killSwitch ? 'Armed' : 'Off'}
              </div>
            </div>
          </button>

          {/* CyberShield */}
          <button
            type="button"
            onClick={() => {
              setCyberShieldAdblock((v) => !v);
              onTriggerToast?.(
                `CyberShield Ad/Tracker Blocker ${
                  !cyberShieldAdblock ? 'Enabled' : 'Paused'
                }`
              );
            }}
            className="rounded-2xl border p-3 text-left flex flex-col justify-between h-[96px] cursor-pointer transition"
            style={{
              backgroundColor: palette.cardBackground,
              borderColor: cyberShieldAdblock
                ? palette.primaryBorder
                : palette.border,
            }}
          >
            <div className="flex items-center justify-between w-full">
              <Smartphone
                size={16}
                style={{
                  color: cyberShieldAdblock ? palette.primary : palette.textMuted,
                }}
              />
              <span
                className={`w-2 h-2 rounded-full ${
                  cyberShieldAdblock ? 'bg-emerald-400' : 'bg-slate-600'
                }`}
              />
            </div>
            <div>
              <div
                className="text-[12px] font-extrabold leading-tight"
                style={{ color: palette.textPrimary }}
              >
                CyberShield
              </div>
              <div
                className="text-[10px] font-bold mt-0.5"
                style={{ color: palette.textSecondary }}
              >
                {cyberShieldAdblock ? '142 Blocked' : 'Paused'}
              </div>
            </div>
          </button>

          {/* Auto-Armor */}
          <button
            type="button"
            onClick={() => {
              setAutoArmorWifi((v) => !v);
              onTriggerToast?.(
                `Auto-Armor Wi-Fi Defense ${
                  !autoArmorWifi ? 'Active' : 'Disabled'
                }`
              );
            }}
            className="rounded-2xl border p-3 text-left flex flex-col justify-between h-[96px] cursor-pointer transition"
            style={{
              backgroundColor: palette.cardBackground,
              borderColor: autoArmorWifi ? palette.primaryBorder : palette.border,
            }}
          >
            <div className="flex items-center justify-between w-full">
              <RefreshCw
                size={16}
                style={{
                  color: autoArmorWifi ? palette.primary : palette.textMuted,
                }}
              />
              <span
                className={`w-2 h-2 rounded-full ${
                  autoArmorWifi ? 'bg-emerald-400' : 'bg-slate-600'
                }`}
              />
            </div>
            <div>
              <div
                className="text-[12px] font-extrabold leading-tight"
                style={{ color: palette.textPrimary }}
              >
                Auto-Armor
              </div>
              <div className="text-[10px] font-bold mt-0.5 text-emerald-400 truncate">
                {autoArmorWifi ? 'Untrusted Wi-Fi' : 'Manual'}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* 7. GEOLOCATION NODE RADAR MAP CARD (Exact Image 1 Bottom Map) */}
      <div
        onClick={() => onOpenServers?.()}
        className="rounded-2xl border overflow-hidden relative h-[128px] cursor-pointer group"
        style={{
          borderColor: palette.border,
          backgroundColor: palette.cardBackground,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
          alt="Node Map"
          className="w-full h-full object-cover opacity-55 group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/40 to-transparent" />
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between gap-2">
          <div className="flex items-center gap-2">
            <MapPin
              size={18}
              style={{ color: palette.primary }}
              className="flex-shrink-0"
            />
            <div>
              <div className="text-[13px] font-extrabold text-white leading-tight">
                {selectedServer.city} Edge Node {selectedServer.nodeNumber}
              </div>
              <div className="text-[10px] text-slate-300">
                {selectedServer.datacenter}
              </div>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-lg bg-black/70 border border-white/15 text-[10px] font-mono font-bold text-white">
            {selectedServer.coordinates}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShieldVarient1;
