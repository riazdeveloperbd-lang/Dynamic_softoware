import React, { useState } from 'react';
import {
  Activity,
  ArrowDown,
  ArrowUp,
  Play,
  SlidersHorizontal,
  Shield,
  EyeOff,
  Bug,
  Ban,
  Database,
  RefreshCw,
  Server,
  ArrowUpDown,
  Download,
  Wifi,
  Gauge,
} from 'lucide-react';
import {
  getVpnThemeScopeStyle,
  useVpnDesignSystem,
} from '../../../styles/vpnDesignSystem';

export interface SpeedVarient1Props {
  variant?: 'varient_1' | 'varient_2' | 'varient_3' | 'varient_4' | 'varient_5';
  onOpenServers?: () => void;
  onOpenThreatMonitor?: () => void;
  onTriggerToast?: (msg: string) => void;
}

export const SpeedVarient1: React.FC<SpeedVarient1Props> = ({
  variant = 'varient_1',
  onOpenServers,
  onOpenThreatMonitor,
  onTriggerToast,
}) => {
  const {
    palette,
    activeFont,
    isDark,
    colorPresetId,
    selectedServer,
    isConnected,
  } = useVpnDesignSystem();

  const [isTesting, setIsTesting] = useState(false);
  const [dlMbps, setDlMbps] = useState(84.6);
  const [ulMbps, setUlMbps] = useState(43.1);
  const [pingMs, setPingMs] = useState(19);

  const runLiveSpeedTest = () => {
    if (isTesting) return;
    setIsTesting(true);
    onTriggerToast?.(
      `Probing ${selectedServer.city} ${selectedServer.nodeNumber} 10 Gbps link...`
    );
    setTimeout(() => {
      const nextDl = Number((82 + Math.random() * 24).toFixed(1));
      const nextUl = Number((41 + Math.random() * 14).toFixed(1));
      const nextPing = Math.max(11, selectedServer.pingMs - 1);
      setDlMbps(nextDl);
      setUlMbps(nextUl);
      setPingMs(nextPing);
      setIsTesting(false);
      onTriggerToast?.(
        `Speed Test Complete: ${nextDl} Mbps Down / ${nextUl} Mbps Up`
      );
    }, 900);
  };

  return (
    <div
      className="vpn-theme-scope px-4 pt-2 pb-6 space-y-4 select-none"
      style={getVpnThemeScopeStyle(palette, activeFont)}
      data-vpn-dark={isDark ? 'true' : 'false'}
      data-vpn-preset={colorPresetId}
    >
      {/* 1. TUNNEL ACTIVE TOP STRIP (Exact Image 5) */}
      <div className="flex items-center justify-between gap-2 text-[11px]">
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'
            }`}
          />
          <span
            className="font-extrabold uppercase tracking-wider"
            style={{ color: palette.textPrimary }}
          >
            {isConnected ? 'TUNNEL ACTIVE' : 'TUNNEL STANDBY'}
          </span>
        </div>

        <span
          className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold"
          style={{
            backgroundColor: palette.primarySoft,
            color: palette.primary,
          }}
        >
          WireGuard-v2
        </span>

        <div className="flex items-center gap-1 text-emerald-400 font-bold text-[10px]">
          <Shield size={12} />
          <span>Encrypted 256-bit</span>
        </div>
      </div>

      {/* 2. TRAFFIC TELEMETRY WAVE CHART CARD (Exact Image 5 + V2-V5 Variants) */}
      {variant === 'varient_2' ? (
        /* V2: 3-Column Digital Speedometer Readout */
        <div
          className="rounded-2xl border p-4 grid grid-cols-3 gap-2.5 text-center"
          style={{
            backgroundColor: palette.cardBackground,
            borderColor: palette.primary,
          }}
        >
          <div
            className="rounded-xl p-3"
            style={{ backgroundColor: palette.surface }}
          >
            <div className="text-[10px] font-extrabold uppercase" style={{ color: palette.primary }}>
              DOWNLOAD
            </div>
            <div className="text-[20px] font-black mt-1" style={{ color: palette.textPrimary }}>
              {dlMbps}
            </div>
            <div className="text-[10px]" style={{ color: palette.textSecondary }}>
              Mbps
            </div>
          </div>
          <div
            className="rounded-xl p-3"
            style={{ backgroundColor: palette.surface }}
          >
            <div className="text-[10px] font-extrabold uppercase text-emerald-400">
              UPLOAD
            </div>
            <div className="text-[20px] font-black mt-1" style={{ color: palette.textPrimary }}>
              {ulMbps}
            </div>
            <div className="text-[10px]" style={{ color: palette.textSecondary }}>
              Mbps
            </div>
          </div>
          <div
            className="rounded-xl p-3"
            style={{ backgroundColor: palette.surface }}
          >
            <div className="text-[10px] font-extrabold uppercase text-amber-400">
              LATENCY
            </div>
            <div className="text-[20px] font-black mt-1 text-emerald-400">
              {pingMs}
            </div>
            <div className="text-[10px]" style={{ color: palette.textSecondary }}>
              ms Ping
            </div>
          </div>
        </div>
      ) : variant === 'varient_3' ? (
        /* V3: Brutalist Hard-Shadow Benchmark Card */
        <div
          className="rounded-xl border-2 p-4 space-y-3"
          style={{
            backgroundColor: palette.cardBackground,
            borderColor: palette.primary,
            boxShadow: `4px 4px 0px ${palette.primary}`,
          }}
        >
          <div className="flex items-center justify-between">
            <span
              className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase"
              style={{
                backgroundColor: palette.primary,
                color: palette.primaryText,
              }}
            >
              BENCHMARK // LIVE
            </span>
            <span className="text-[11px] font-mono font-bold text-emerald-400">
              {pingMs} MS JITTER-FREE
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <div className="text-[10px] font-bold uppercase" style={{ color: palette.textSecondary }}>
                DOWNLINK SPEED
              </div>
              <div className="text-[24px] font-black font-mono" style={{ color: palette.textPrimary }}>
                {dlMbps} <span className="text-xs">Mbps</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase" style={{ color: palette.textSecondary }}>
                UPLINK SPEED
              </div>
              <div className="text-[24px] font-black font-mono text-emerald-400">
                {ulMbps} <span className="text-xs">Mbps</span>
              </div>
            </div>
          </div>
        </div>
      ) : variant === 'varient_4' ? (
        /* V4: Solid Brand Luxe Throughput Banner */
        <div
          className="rounded-3xl p-5 space-y-3 shadow-lg"
          style={{
            backgroundColor: palette.primary,
            color: palette.primaryText,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider opacity-90">
              10 GBPS FIBER TUNNEL THROUGHPUT
            </span>
            <Activity size={18} />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-1">
            <div className="p-3 rounded-2xl bg-black/20">
              <div className="text-[10px] font-bold uppercase opacity-80">Download</div>
              <div className="text-[22px] font-black mt-0.5">{dlMbps} Mbps</div>
            </div>
            <div className="p-3 rounded-2xl bg-black/20">
              <div className="text-[10px] font-bold uppercase opacity-80">Upload</div>
              <div className="text-[22px] font-black mt-0.5">{ulMbps} Mbps</div>
            </div>
          </div>
        </div>
      ) : variant === 'varient_5' ? (
        /* V5: Accent Left-Rail Split Telemetry Ledger */
        <div
          className="rounded-2xl border border-l-4 p-4 space-y-3"
          style={{
            backgroundColor: palette.cardBackground,
            borderColor: palette.border,
            borderLeftColor: palette.primary,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="text-[14px] font-extrabold" style={{ color: palette.textPrimary }}>
              Real-Time Packet Telemetry
            </div>
            <span className="text-[11px] font-mono font-bold" style={{ color: palette.primary }}>
              {selectedServer.city} {selectedServer.nodeNumber}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-xl" style={{ backgroundColor: palette.surface }}>
              <div className="text-[15px] font-extrabold" style={{ color: palette.textPrimary }}>
                {dlMbps}M
              </div>
              <div className="text-[10px]" style={{ color: palette.textSecondary }}>Downlink</div>
            </div>
            <div className="p-2.5 rounded-xl" style={{ backgroundColor: palette.surface }}>
              <div className="text-[15px] font-extrabold text-emerald-400">
                {ulMbps}M
              </div>
              <div className="text-[10px]" style={{ color: palette.textSecondary }}>Uplink</div>
            </div>
            <div className="p-2.5 rounded-xl" style={{ backgroundColor: palette.surface }}>
              <div className="text-[15px] font-extrabold text-amber-400">
                {pingMs}ms
              </div>
              <div className="text-[10px]" style={{ color: palette.textSecondary }}>Latency</div>
            </div>
          </div>
        </div>
      ) : null}

      <div
        className="rounded-2xl border p-4 space-y-3"
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: palette.border,
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Activity size={16} style={{ color: palette.primary }} />
              <h3
                className="text-[16px] font-extrabold"
                style={{ color: palette.textPrimary }}
              >
                Traffic Telemetry
              </h3>
            </div>
            <p
              className="text-[11px] mt-0.5"
              style={{ color: palette.textSecondary }}
            >
              Live streaming window: 60m
            </p>
          </div>

          <div
            className="px-2.5 py-1 rounded-full border flex items-center gap-2.5 text-[10px] font-extrabold"
            style={{
              backgroundColor: palette.surface,
              borderColor: palette.border,
            }}
          >
            <span className="flex items-center gap-1" style={{ color: palette.primary }}>
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: palette.primary }}
              />
              DL
            </span>
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              UL
            </span>
          </div>
        </div>

        {/* Dual Smooth SVG Wave Curve */}
        <div className="relative h-[116px] w-full pt-2">
          <svg
            viewBox="0 0 320 100"
            className="w-full h-full overflow-visible"
          >
            <defs>
              <linearGradient id="dlGrad" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={palette.primary}
                  stopOpacity="0.32"
                />
                <stop
                  offset="100%"
                  stopColor={palette.primary}
                  stopOpacity="0.0"
                />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            <line
              x1="0"
              y1="25"
              x2="320"
              y2="25"
              stroke={palette.border}
              strokeDasharray="3 3"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="55"
              x2="320"
              y2="55"
              stroke={palette.border}
              strokeDasharray="3 3"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="85"
              x2="320"
              y2="85"
              stroke={palette.border}
              strokeDasharray="3 3"
              strokeWidth="1"
            />

            {/* Area Fill under DL Curve */}
            <path
              d="M 0 68 C 40 68, 65 25, 105 32 C 145 39, 170 72, 205 42 C 240 12, 260 8, 285 45 C 300 68, 310 24, 320 20 L 320 95 L 0 95 Z"
              fill="url(#dlGrad)"
            />

            {/* UL Green Curve */}
            <path
              d="M 0 80 C 45 75, 75 55, 115 62 C 155 69, 185 28, 215 35 C 245 42, 260 85, 285 52 C 300 30, 310 18, 320 28"
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
            />

            {/* DL Primary Neon Curve */}
            <path
              d="M 0 68 C 40 68, 65 25, 105 32 C 145 39, 170 72, 205 42 C 240 12, 260 8, 285 45 C 300 68, 310 24, 320 20"
              fill="none"
              stroke={palette.primary}
              strokeWidth="2.8"
            />

            {/* Active Pulse Point */}
            <circle
              cx="320"
              cy="20"
              r="4.5"
              fill={palette.primary}
              stroke="#0B0F17"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Time Axis */}
        <div
          className="flex items-center justify-between text-[10px] font-semibold pt-1"
          style={{ color: palette.textSecondary }}
        >
          <span>60m ago</span>
          <span>45m</span>
          <span>30m</span>
          <span>15m</span>
          <span className="font-extrabold" style={{ color: palette.primary }}>
            Now
          </span>
        </div>

        {/* Bottom Peak Summary Strip */}
        <div
          className="rounded-xl p-3 grid grid-cols-2 gap-3"
          style={{ backgroundColor: palette.surface }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: palette.primarySoft,
                color: palette.primary,
              }}
            >
              <ArrowDown size={15} />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span
                  className="text-[17px] font-extrabold leading-none"
                  style={{ color: palette.textPrimary }}
                >
                  {dlMbps}
                </span>
                <span
                  className="text-[10px] font-extrabold"
                  style={{ color: palette.primary }}
                >
                  Mbps
                </span>
              </div>
              <div
                className="text-[10px] mt-0.5"
                style={{ color: palette.textSecondary }}
              >
                Peak: 120.2 Mbps
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <ArrowUp size={15} />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span
                  className="text-[17px] font-extrabold leading-none"
                  style={{ color: palette.textPrimary }}
                >
                  {ulMbps}
                </span>
                <span className="text-[10px] font-extrabold text-emerald-400">
                  Mbps
                </span>
              </div>
              <div
                className="text-[10px] mt-0.5"
                style={{ color: palette.textSecondary }}
              >
                Peak: 55.8 Mbps
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. TOTAL DATA TODAY & CONNECTION QUALITY (2-Column Cards - Exact Image 5) */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total Data Today */}
        <div
          className="rounded-2xl border p-3.5 space-y-2.5"
          style={{
            backgroundColor: palette.cardBackground,
            borderColor: palette.border,
          }}
        >
          <div className="flex items-center justify-between">
            <span
              className="text-[10px] font-extrabold uppercase tracking-wider"
              style={{ color: palette.textSecondary }}
            >
              TOTAL DATA TODAY
            </span>
            <RefreshCw size={13} className="text-amber-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span
              className="text-[24px] font-extrabold leading-none"
              style={{ color: palette.textPrimary }}
            >
              4.82
            </span>
            <span className="text-[12px] font-extrabold text-amber-400">
              GB
            </span>
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex items-center justify-between">
              <span style={{ color: palette.textSecondary }}>
                Down: <strong style={{ color: palette.textPrimary }}>3.90 GB</strong>
              </span>
              <span className="font-bold" style={{ color: palette.primary }}>
                81%
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-black/30 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: '81%', backgroundColor: palette.primary }}
              />
            </div>
            <div className="flex items-center justify-between pt-0.5">
              <span style={{ color: palette.textSecondary }}>
                Up: <strong style={{ color: palette.textPrimary }}>0.92 GB</strong>
              </span>
              <span className="font-bold text-emerald-400">19%</span>
            </div>
          </div>
        </div>

        {/* Connection Quality */}
        <div
          className="rounded-2xl border p-3.5 flex flex-col justify-between"
          style={{
            backgroundColor: palette.cardBackground,
            borderColor: palette.border,
          }}
        >
          <div className="flex items-center justify-between">
            <span
              className="text-[10px] font-extrabold uppercase tracking-wider leading-tight"
              style={{ color: palette.textSecondary }}
            >
              CONNECTION QUALITY
            </span>
            <Wifi size={14} className="text-emerald-400 flex-shrink-0" />
          </div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-[24px] font-extrabold leading-none text-emerald-400">
              {pingMs}
            </span>
            <span className="text-[11px] font-bold text-emerald-400">ms</span>
            <span
              className="text-[11px] font-bold ml-1"
              style={{ color: palette.textPrimary }}
            >
              Optimal
            </span>
          </div>
          <div
            className="rounded-xl p-2 space-y-1 text-[11px]"
            style={{ backgroundColor: palette.surface }}
          >
            <div className="flex items-center justify-between">
              <span style={{ color: palette.textSecondary }}>Jitter</span>
              <span
                className="font-bold"
                style={{ color: palette.textPrimary }}
              >
                1.2 ms
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span style={{ color: palette.textSecondary }}>Packet Loss</span>
              <span className="font-bold text-emerald-400">0.0%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. TARGET SERVER PROBE + RUN LIVE SPEED TEST CTA (Exact Image 5) */}
      <div
        className="rounded-2xl border p-4 space-y-3"
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: palette.border,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gauge size={16} style={{ color: palette.primary }} />
            <span
              className="text-[14px] font-extrabold"
              style={{ color: palette.textPrimary }}
            >
              Target Server Probe
            </span>
          </div>
          <span
            className="px-2 py-0.5 rounded-md text-[10px] font-bold"
            style={{
              backgroundColor: palette.surface,
              color: palette.textSecondary,
            }}
          >
            Auto-Assigned
          </span>
        </div>

        <div
          className="rounded-xl p-3 flex items-center justify-between gap-2"
          style={{ backgroundColor: palette.surface }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: palette.primarySoft,
                color: palette.primary,
              }}
            >
              <GlobeIcon />
            </div>
            <div className="min-w-0">
              <div
                className="text-[14px] font-extrabold truncate"
                style={{ color: palette.textPrimary }}
              >
                {selectedServer.city} #02
              </div>
              <div
                className="text-[11px] truncate"
                style={{ color: palette.textSecondary }}
              >
                Swisscom AG • 10 Gbps Node
              </div>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-[11px] font-extrabold text-emerald-400">
              Ultra Fast
            </div>
            <div
              className="text-[10px] font-mono"
              style={{ color: palette.textSecondary }}
            >
              IP: 178.62.*.*
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={runLiveSpeedTest}
            className="flex-1 h-[44px] rounded-xl font-extrabold text-[13px] flex items-center justify-center gap-2 cursor-pointer shadow-md transition active:scale-95"
            style={{
              backgroundColor: palette.primary,
              color: palette.primaryText,
            }}
          >
            <Play size={14} fill="currentColor" />
            <span>
              {isTesting ? 'Running Benchmark...' : 'Run Live Speed Test'}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onOpenServers?.()}
            className="w-[44px] h-[44px] rounded-xl border flex items-center justify-center flex-shrink-0 cursor-pointer"
            style={{
              backgroundColor: palette.surface,
              borderColor: palette.border,
              color: palette.textPrimary,
            }}
            title="Switch Probe Server"
          >
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* 5. CYBER THREAT INTERCEPTOR (2x2 Bento Grid - Exact Image 5) */}
      <div
        onClick={() => onOpenThreatMonitor?.()}
        className="rounded-2xl border p-4 space-y-3 cursor-pointer transition"
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: palette.border,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-emerald-400" />
            <span
              className="text-[14px] font-extrabold"
              style={{ color: palette.textPrimary }}
            >
              Cyber Threat Interceptor
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-extrabold">
            Active Guard
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div
            className="rounded-xl p-3 space-y-1"
            style={{ backgroundColor: palette.surface }}
          >
            <div className="flex items-center gap-1.5 text-[11px] font-bold">
              <EyeOff size={13} style={{ color: palette.primary }} />
              <span style={{ color: palette.textSecondary }}>
                Trackers Blocked
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span
                className="text-[18px] font-extrabold"
                style={{ color: palette.textPrimary }}
              >
                418
              </span>
              <span className="text-[10px] font-bold text-emerald-400">
                +24/h
              </span>
            </div>
          </div>

          <div
            className="rounded-xl p-3 space-y-1"
            style={{ backgroundColor: palette.surface }}
          >
            <div className="flex items-center gap-1.5 text-[11px] font-bold">
              <Bug size={13} className="text-rose-400" />
              <span style={{ color: palette.textSecondary }}>
                Malware Filtered
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[18px] font-extrabold text-rose-400">7</span>
              <span
                className="text-[10px] font-bold"
                style={{ color: palette.textSecondary }}
              >
                quarantined
              </span>
            </div>
          </div>

          <div
            className="rounded-xl p-3 space-y-1"
            style={{ backgroundColor: palette.surface }}
          >
            <div className="flex items-center gap-1.5 text-[11px] font-bold">
              <Ban size={13} className="text-emerald-400" />
              <span style={{ color: palette.textSecondary }}>
                Ads Suppressed
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span
                className="text-[18px] font-extrabold"
                style={{ color: palette.textPrimary }}
              >
                1,290
              </span>
              <span
                className="text-[10px] font-bold"
                style={{ color: palette.textSecondary }}
              >
                items
              </span>
            </div>
          </div>

          <div
            className="rounded-xl p-3 space-y-1"
            style={{ backgroundColor: palette.surface }}
          >
            <div className="flex items-center gap-1.5 text-[11px] font-bold">
              <Database size={13} className="text-amber-400" />
              <span style={{ color: palette.textSecondary }}>
                Bandwidth Saved
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span
                className="text-[18px] font-extrabold"
                style={{ color: palette.textPrimary }}
              >
                142
              </span>
              <span className="text-[10px] font-extrabold text-amber-400">
                MB
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. SESSION STABILITY LEDGER + EXPORT LOG CTA (Exact Image 5) */}
      <div
        className="rounded-2xl border p-4 space-y-3"
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: palette.border,
        }}
      >
        <div className="flex items-center justify-between">
          <span
            className="text-[14px] font-extrabold"
            style={{ color: palette.textPrimary }}
          >
            Session Stability
          </span>
          <span className="text-[11px] font-extrabold text-emerald-400">
            ● 99.98% Uptime
          </span>
        </div>

        <div className="space-y-2.5 text-[12px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RefreshCw size={13} className="text-emerald-400" />
              <span style={{ color: palette.textSecondary }}>
                Handshake Key Renewal
              </span>
            </div>
            <span
              className="font-bold text-[11px]"
              style={{ color: palette.textPrimary }}
            >
              4m ago • OK
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server size={13} style={{ color: palette.primary }} />
              <span style={{ color: palette.textSecondary }}>
                Encrypted DoH Resolvers
              </span>
            </div>
            <span
              className="font-extrabold text-[11px]"
              style={{ color: palette.primary }}
            >
              Zero Leak
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowUpDown size={13} style={{ color: palette.textSecondary }} />
              <span style={{ color: palette.textSecondary }}>
                MTU Auto-Negotiation
              </span>
            </div>
            <span
              className="font-bold text-[11px]"
              style={{ color: palette.textPrimary }}
            >
              1420 bytes
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            onTriggerToast?.(
              'Exported Cryptographic Diagnostics Log (wireguard-diag.log)'
            )
          }
          className="w-full h-10 rounded-xl border flex items-center justify-center gap-2 text-[12px] font-bold cursor-pointer transition"
          style={{
            backgroundColor: palette.surface,
            borderColor: palette.border,
            color: palette.textPrimary,
          }}
        >
          <Download size={14} />
          <span>Export Cryptographic Diagnostics Log</span>
        </button>
      </div>
    </div>
  );
};

const GlobeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

export default SpeedVarient1;
