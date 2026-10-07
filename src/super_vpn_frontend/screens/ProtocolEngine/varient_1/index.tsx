import React, { useState } from 'react';
import {
  ArrowLeft,
  Shield,
  Key,
  RefreshCw,
  SlidersHorizontal,
  CheckCircle2,
  Cpu,
  Lock,
  Terminal,
} from 'lucide-react';
import {
  getVpnThemeScopeStyle,
  useVpnDesignSystem,
} from '../../../styles/vpnDesignSystem';

export interface ProtocolEngineVarient1Props {
  variant?: 'varient_1' | 'varient_2' | 'varient_3' | 'varient_4' | 'varient_5';
  onBack?: () => void;
  onTriggerToast?: (msg: string) => void;
}

export const ProtocolEngineVarient1: React.FC<ProtocolEngineVarient1Props> = ({
  variant = 'varient_1',
  onBack,
  onTriggerToast,
}) => {
  const { palette, activeFont, isDark, colorPresetId, selectedServer } =
    useVpnDesignSystem();

  const [selectedProtocol, setSelectedProtocol] = useState<string>('wireguard');
  const [selectedPort, setSelectedPort] = useState<string>('51820 (UDP)');
  const [mtuSize, setMtuSize] = useState<number>(1420);
  const [quantumResistant, setQuantumResistant] = useState<boolean>(true);
  const [publicKeyHash, setPublicKeyHash] = useState<string>(
    'wg9xK4mP8vQ2rL7nB5tZ1wY6cF3jH0sD='
  );

  const protocols = [
    {
      id: 'wireguard',
      name: 'WireGuard® v3 Kernel',
      badge: 'Recommended • Fastest',
      cipher: 'ChaCha20-Poly1305 • Curve25519',
      desc: 'Ultra-low latency modern cryptographic tunnel with instant roaming handshake.',
    },
    {
      id: 'openvpn_udp',
      name: 'OpenVPN® UDP Turbo',
      badge: 'High Compatibility',
      cipher: 'AES-256-GCM • SHA512 • RSA-4096',
      desc: 'Battle-tested TLS tunnel optimized for high-throughput media & gaming.',
    },
    {
      id: 'openvpn_tcp',
      name: 'OpenVPN® TCP Stealth (443)',
      badge: 'Firewall Bypass',
      cipher: 'AES-256-GCM • TLS-Crypt v2',
      desc: 'Disguises VPN packets as standard HTTPS Port 443 web traffic on restricted networks.',
    },
    {
      id: 'ikev2',
      name: 'IKEv2 / IPsec Mobility',
      badge: 'Cellular Fast-Switch',
      cipher: 'AES-256-GCM • MOBIKE Protocol',
      desc: 'Seamless switching between 5G cellular and Wi-Fi networks without dropping packets.',
    },
  ];

  const rotateKeys = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
    let next = 'wg';
    for (let i = 0; i < 30; i++) {
      next += chars[Math.floor(Math.random() * chars.length)];
    }
    setPublicKeyHash(next + '=');
    onTriggerToast?.('Rotated Ephemeral Curve25519 Keypair');
  };

  return (
    <div
      className="vpn-theme-scope px-4 pt-3 pb-6 space-y-4 select-none"
      style={getVpnThemeScopeStyle(palette, activeFont)}
      data-vpn-dark={isDark ? 'true' : 'false'}
      data-vpn-preset={colorPresetId}
    >
      {/* Top Sub-Header with Back Button */}
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
              Protocol &amp; Cipher Engine
            </h2>
            <p
              className="text-[11px]"
              style={{ color: palette.textSecondary }}
            >
              Active Endpoint: {selectedServer.city} {selectedServer.nodeNumber}
            </p>
          </div>
        </div>
        <span
          className="px-2.5 py-1 rounded-full text-[10px] font-extrabold"
          style={{
            backgroundColor: palette.primarySoft,
            color: palette.primary,
          }}
        >
          256-BIT
        </span>
      </div>

      {/* Protocol Cards List (5 Distinct Variants) */}
      <div
        className={
          variant === 'varient_2' ? 'grid grid-cols-2 gap-2.5' : 'space-y-2.5'
        }
      >
        {protocols.map((proto) => {
          const isSelected = selectedProtocol === proto.id;
          return (
            <div
              key={proto.id}
              onClick={() => {
                setSelectedProtocol(proto.id);
                onTriggerToast?.(`Switched Tunnel Engine to ${proto.name}`);
              }}
              className={`p-3.5 space-y-2 cursor-pointer transition ${
                variant === 'varient_3'
                  ? 'rounded-xl border-2'
                  : variant === 'varient_4'
                  ? 'rounded-2xl border border-l-4'
                  : 'rounded-2xl border'
              }`}
              style={{
                backgroundColor:
                  variant === 'varient_5' && isSelected
                    ? palette.primarySoft
                    : palette.cardBackground,
                borderColor: isSelected ? palette.primary : palette.border,
                borderLeftColor:
                  variant === 'varient_4' ? palette.primary : undefined,
                boxShadow:
                  variant === 'varient_3'
                    ? `3px 3px 0px ${
                        isSelected ? palette.primary : palette.border
                      }`
                    : undefined,
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Cpu
                    size={16}
                    style={{
                      color: isSelected ? palette.primary : palette.textSecondary,
                    }}
                  />
                  <span
                    className="text-[14px] font-extrabold"
                    style={{ color: palette.textPrimary }}
                  >
                    {proto.name}
                  </span>
                </div>
                {isSelected ? (
                  <CheckCircle2 size={16} style={{ color: palette.primary }} />
                ) : (
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                    style={{
                      backgroundColor: palette.surface,
                      color: palette.textSecondary,
                    }}
                  >
                    {proto.badge}
                  </span>
                )}
              </div>
              <div
                className="text-[11px] font-mono font-bold"
                style={{ color: palette.primary }}
              >
                {proto.cipher}
              </div>
              <p
                className="text-[11px] leading-relaxed"
                style={{ color: palette.textSecondary }}
              >
                {proto.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Port & MTU Packet Tuning */}
      <div
        className="rounded-2xl border p-4 space-y-3"
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: palette.border,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={15} style={{ color: palette.primary }} />
            <span
              className="text-[13px] font-extrabold"
              style={{ color: palette.textPrimary }}
            >
              Socket Port &amp; MTU Size
            </span>
          </div>
          <span className="text-[11px] font-mono font-bold text-emerald-400">
            MTU {mtuSize}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {['51820 (UDP)', '443 (TLS)', '1194 (Auto)'].map((port) => {
            const active = selectedPort === port;
            return (
              <button
                key={port}
                type="button"
                onClick={() => {
                  setSelectedPort(port);
                  onTriggerToast?.(`Bound tunnel socket to Port ${port}`);
                }}
                className="h-9 rounded-xl border text-[11px] font-extrabold cursor-pointer transition"
                style={{
                  backgroundColor: active ? palette.primarySoft : palette.surface,
                  borderColor: active ? palette.primary : palette.border,
                  color: active ? palette.primary : palette.textSecondary,
                }}
              >
                {port}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between pt-1">
          <span
            className="text-[11px] font-bold"
            style={{ color: palette.textSecondary }}
          >
            Packet MTU Frame Size
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMtuSize((m) => Math.max(1280, m - 20))}
              className="w-7 h-7 rounded-lg border font-extrabold text-xs cursor-pointer"
              style={{
                backgroundColor: palette.surface,
                borderColor: palette.border,
                color: palette.textPrimary,
              }}
            >
              -
            </button>
            <span
              className="text-[12px] font-mono font-extrabold"
              style={{ color: palette.textPrimary }}
            >
              {mtuSize} B
            </span>
            <button
              type="button"
              onClick={() => setMtuSize((m) => Math.min(1500, m + 20))}
              className="w-7 h-7 rounded-lg border font-extrabold text-xs cursor-pointer"
              style={{
                backgroundColor: palette.surface,
                borderColor: palette.border,
                color: palette.textPrimary,
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Ephemeral Keypair & Post-Quantum Armor */}
      <div
        className="rounded-2xl border p-4 space-y-3"
        style={{
          backgroundColor: palette.cardBackground,
          borderColor: palette.border,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key size={15} style={{ color: palette.primary }} />
            <span
              className="text-[13px] font-extrabold"
              style={{ color: palette.textPrimary }}
            >
              Ephemeral Client Public Key
            </span>
          </div>
          <button
            type="button"
            onClick={rotateKeys}
            className="flex items-center gap-1 text-[11px] font-extrabold cursor-pointer"
            style={{ color: palette.primary }}
          >
            <RefreshCw size={12} />
            <span>Rotate Key</span>
          </button>
        </div>

        <div
          className="p-2.5 rounded-xl border font-mono text-[11px] truncate flex items-center gap-2"
          style={{
            backgroundColor: palette.surface,
            borderColor: palette.border,
            color: palette.textPrimary,
          }}
        >
          <Terminal size={13} style={{ color: palette.primary }} />
          <span className="truncate">{publicKeyHash}</span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <Lock size={14} className="text-emerald-400" />
            <span
              className="text-[12px] font-bold"
              style={{ color: palette.textPrimary }}
            >
              Post-Quantum Kyber-1024 Handshake
            </span>
          </div>
          <button
            type="button"
            onClick={() => setQuantumResistant((v) => !v)}
            className="w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer"
            style={{
              backgroundColor: quantumResistant
                ? palette.primary
                : palette.surface,
            }}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                quantumResistant ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProtocolEngineVarient1;
