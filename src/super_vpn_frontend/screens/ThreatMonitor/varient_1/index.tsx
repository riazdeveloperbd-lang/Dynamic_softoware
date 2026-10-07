import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  Bug,
  EyeOff,
  Ban,
  RefreshCw,
  CheckCircle2,
  Globe,
} from 'lucide-react';
import {
  getVpnThemeScopeStyle,
  useVpnDesignSystem,
} from '../../../styles/vpnDesignSystem';

export interface ThreatMonitorVarient1Props {
  variant?: 'varient_1' | 'varient_2' | 'varient_3' | 'varient_4' | 'varient_5';
  onBack?: () => void;
  onTriggerToast?: (msg: string) => void;
}

export const ThreatMonitorVarient1: React.FC<ThreatMonitorVarient1Props> = ({
  variant = 'varient_1',
  onBack,
  onTriggerToast,
}) => {
  const {
    palette,
    activeFont,
    isDark,
    colorPresetId,
    cyberShieldAdblock,
    setCyberShieldAdblock,
  } = useVpnDesignSystem();

  const [interceptLog, setInterceptLog] = useState([
    {
      id: '1',
      domain: 'telemetry.adsystem-tracker.net',
      type: 'Cross-Site Tracker',
      action: 'Blocked',
      time: '2s ago',
    },
    {
      id: '2',
      domain: 'pixel.DoubleClick-metrics.io',
      type: 'Behavioral Fingerprinting',
      action: 'Blocked',
      time: '14s ago',
    },
    {
      id: '3',
      domain: 'cdn-malware-dropper.xyz',
      type: 'Phishing & Malware Host',
      action: 'Quarantined',
      time: '1m ago',
    },
    {
      id: '4',
      domain: 'analytics.sdk-mobile-spy.com',
      type: 'SDK Telemetry Beacon',
      action: 'Blocked',
      time: '3m ago',
    },
  ]);

  const flushDnsCache = () => {
    setInterceptLog((prev) => [
      {
        id: String(Date.now()),
        domain: 'dns-probe.zeroleak-verify.ch',
        type: 'DoH Encrypted Verification',
        action: 'Verified Safe',
        time: 'Just now',
      },
      ...prev.slice(0, 3),
    ]);
    onTriggerToast?.('Flushed DNS Resolver Cache & Verified 0 Leaks');
  };

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
              CyberShield Threat Radar
            </h2>
            <p
              className="text-[11px]"
              style={{ color: palette.textSecondary }}
            >
              Real-Time DNS Sinkhole &amp; Leak Audit
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setCyberShieldAdblock((v) => !v)}
          className="px-3 py-1 rounded-full text-[10px] font-extrabold cursor-pointer"
          style={{
            backgroundColor: cyberShieldAdblock
              ? palette.primarySoft
              : palette.surface,
            color: cyberShieldAdblock ? palette.primary : palette.textSecondary,
          }}
        >
          {cyberShieldAdblock ? 'SHIELD ON' : 'PAUSED'}
        </button>
      </div>

      {/* 3-Column Summary Strip */}
      <div className="grid grid-cols-3 gap-2.5">
        <div
          className="rounded-2xl border p-3 text-center"
          style={{
            backgroundColor: palette.cardBackground,
            borderColor: palette.border,
          }}
        >
          <EyeOff
            size={16}
            className="mx-auto mb-1"
            style={{ color: palette.primary }}
          />
          <div
            className="text-[18px] font-extrabold"
            style={{ color: palette.textPrimary }}
          >
            418
          </div>
          <div
            className="text-[10px] font-semibold"
            style={{ color: palette.textSecondary }}
          >
            Trackers
          </div>
        </div>

        <div
          className="rounded-2xl border p-3 text-center"
          style={{
            backgroundColor: palette.cardBackground,
            borderColor: palette.border,
          }}
        >
          <Bug size={16} className="mx-auto mb-1 text-rose-400" />
          <div className="text-[18px] font-extrabold text-rose-400">7</div>
          <div
            className="text-[10px] font-semibold"
            style={{ color: palette.textSecondary }}
          >
            Malware
          </div>
        </div>

        <div
          className="rounded-2xl border p-3 text-center"
          style={{
            backgroundColor: palette.cardBackground,
            borderColor: palette.border,
          }}
        >
          <Ban size={16} className="mx-auto mb-1 text-emerald-400" />
          <div
            className="text-[18px] font-extrabold"
            style={{ color: palette.textPrimary }}
          >
            1,290
          </div>
          <div
            className="text-[10px] font-semibold"
            style={{ color: palette.textSecondary }}
          >
            Ads Blocked
          </div>
        </div>
      </div>

      {/* Live Intercept Stream */}
      <div
        className="rounded-2xl border p-4 space-y-3"
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: palette.border,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span
              className="text-[14px] font-extrabold"
              style={{ color: palette.textPrimary }}
            >
              Live DNS Sinkhole Stream
            </span>
          </div>
          <button
            type="button"
            onClick={flushDnsCache}
            className="flex items-center gap-1 text-[11px] font-extrabold cursor-pointer"
            style={{ color: palette.primary }}
          >
            <RefreshCw size={12} />
            <span>Verify DNS</span>
          </button>
        </div>

        <div
          className={
            variant === 'varient_2' ? 'grid grid-cols-2 gap-2' : 'space-y-2'
          }
        >
          {interceptLog.map((item) => (
            <div
              key={item.id}
              className={`p-3 flex ${
                variant === 'varient_2'
                  ? 'flex-col items-start gap-2 rounded-xl border'
                  : variant === 'varient_3'
                  ? 'items-center justify-between gap-2 rounded-lg border-2'
                  : variant === 'varient_4'
                  ? 'items-center justify-between gap-2 rounded-xl border border-l-4'
                  : 'items-center justify-between gap-2 rounded-xl border'
              }`}
              style={{
                backgroundColor:
                  variant === 'varient_5'
                    ? palette.cardBackground
                    : palette.surface,
                borderColor:
                  variant === 'varient_3' ? palette.primary : palette.border,
                borderLeftColor:
                  variant === 'varient_4' ? palette.primary : undefined,
                boxShadow:
                  variant === 'varient_3'
                    ? `2px 2px 0px ${palette.primary}`
                    : undefined,
              }}
            >
              <div className="min-w-0">
                <div
                  className="text-[12px] font-mono font-bold truncate"
                  style={{ color: palette.textPrimary }}
                >
                  {item.domain}
                </div>
                <div
                  className="text-[10px] mt-0.5"
                  style={{ color: palette.textSecondary }}
                >
                  {item.type} • {item.time}
                </div>
              </div>
              <span
                className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold flex-shrink-0 ${
                  item.action === 'Quarantined'
                    ? 'bg-rose-500/15 text-rose-400'
                    : 'bg-emerald-500/15 text-emerald-400'
                }`}
              >
                {item.action}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* DNS & WebRTC Leak Certification */}
      <div
        className="rounded-2xl border p-4 space-y-2.5"
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: palette.border,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe size={15} style={{ color: palette.primary }} />
            <span
              className="text-[13px] font-extrabold"
              style={{ color: palette.textPrimary }}
            >
              Cryptographic Leak Protection
            </span>
          </div>
          <CheckCircle2 size={15} className="text-emerald-400" />
        </div>
        <div className="text-[11px] space-y-1.5" style={{ color: palette.textSecondary }}>
          <div className="flex justify-between">
            <span>IPv4 / IPv6 Tunnel Encapsulation</span>
            <strong className="text-emerald-400">Protected</strong>
          </div>
          <div className="flex justify-between">
            <span>WebRTC Browser STUN Masking</span>
            <strong className="text-emerald-400">Protected</strong>
          </div>
          <div className="flex justify-between">
            <span>DNS-over-HTTPS (DoH) Resolver</span>
            <strong style={{ color: palette.primary }}>10.64.0.1 (In-Tunnel)</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatMonitorVarient1;
