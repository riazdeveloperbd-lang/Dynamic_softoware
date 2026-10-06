import React, { useState } from 'react';
import {
  Shield,
  ChevronDown,
  Fingerprint,
  Lock,
  CheckCircle2,
  Users,
  Smartphone,
  LogOut,
  AlertTriangle,
} from 'lucide-react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const StoreSettingsVarient4: React.FC<AdminScreenVariantProps> = ({
  primaryColor = '#3730A3',
  isDark = false,
  onNavigate,
}) => {
  const [mfaEnforced, setMfaEnforced] = useState(true);
  const [passkeyRefunds, setPasskeyRefunds] = useState(true);
  const [ipAllowlist, setIpAllowlist] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const bgMain = isDark ? 'bg-[#090D16] text-white' : 'bg-[#F8FAFC] text-[#0F172A]';
  const cardBg = isDark
    ? 'bg-[#121826] border-slate-800 text-white'
    : 'bg-white border-slate-200/70 text-[#0F172A]';
  const subBoxBg = isDark
    ? 'bg-[#1A2234] border-slate-800'
    : 'bg-[#EEF2FF]/65 border-indigo-100/70';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-500';
  const headerBg = isDark
    ? 'bg-[#0B0F19]/95 border-slate-800 text-white'
    : 'bg-white/95 border-slate-100 text-[#0F172A]';

  const renderToggle = (checked: boolean, onChange: () => void) => (
    <button
      onClick={onChange}
      className={`w-11 h-6 rounded-full p-0.5 transition-colors flex items-center flex-shrink-0 ${
        checked ? '' : isDark ? 'bg-slate-700' : 'bg-slate-300'
      }`}
      style={checked ? { backgroundColor: primaryColor } : undefined}
    >
      <div
        className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );

  return (
    <div className={`flex-1 pb-6 select-none ${bgMain}`}>
      {/* Header */}
      <div
        className={`px-4 py-3 flex items-center justify-between border-b sticky top-0 z-30 backdrop-blur-md ${headerBg}`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#0F172A] flex items-center justify-center flex-shrink-0 shadow-xs border border-slate-800">
            <Shield size={18} color={primaryColor} />
          </div>
          <div className="min-w-0">
            <div
              className="flex items-center gap-1 text-[10px] font-extrabold tracking-wider uppercase"
              style={{ color: primaryColor }}
            >
              <span>V4 • SECURITY &amp; RBAC VAULT</span>
              <ChevronDown size={11} strokeWidth={2.5} />
            </div>
            <h1 className="text-[16px] font-extrabold tracking-tight truncate">
              Zero-Trust &amp; Access
            </h1>
          </div>
        </div>
        <button
          onClick={() => onNavigate && onNavigate('ActivityAudit')}
          className="px-2.5 py-1.5 rounded-xl text-[10px] font-extrabold text-white"
          style={{ backgroundColor: primaryColor }}
        >
          Audit Log
        </button>
      </div>

      {toast && (
        <div
          className="mx-3.5 mt-2.5 px-3 py-2 rounded-xl text-white text-[11px] font-bold flex items-center justify-between shadow-lg"
          style={{ backgroundColor: primaryColor }}
        >
          <span>{toast}</span>
          <CheckCircle2 size={14} />
        </div>
      )}

      <div className="p-3.5 space-y-3.5">
        {/* Biometric & Passkey Controls */}
        <div className={`p-3.5 rounded-2xl border shadow-xs space-y-3 ${cardBg}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Fingerprint size={16} style={{ color: primaryColor }} />
              <span className="text-sm font-extrabold">Biometric &amp; Hardware Passkeys</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 text-[10px] font-extrabold">
              Enforced
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-extrabold">Hardware MFA for All Store Admins</div>
              <div className={`text-[10px] ${mutedText}`}>YubiKey / FaceID required every 12h</div>
            </div>
            {renderToggle(mfaEnforced, () => setMfaEnforced(!mfaEnforced))}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-extrabold">Biometric Override on Refunds &gt;$250</div>
              <div className={`text-[10px] ${mutedText}`}>Prevent unauthorized POS voids</div>
            </div>
            {renderToggle(passkeyRefunds, () => setPasskeyRefunds(!passkeyRefunds))}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-extrabold">Warehouse IP Geofencing</div>
              <div className={`text-[10px] ${mutedText}`}>Restrict WMS access to Austin &amp; NYC</div>
            </div>
            {renderToggle(ipAllowlist, () => setIpAllowlist(!ipAllowlist))}
          </div>
        </div>

        {/* Active Admin Sessions */}
        <div className={`p-3.5 rounded-2xl border shadow-xs space-y-2.5 ${cardBg}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone size={16} style={{ color: primaryColor }} />
              <span className="text-sm font-extrabold">Active Admin Sessions (2)</span>
            </div>
            <button
              onClick={() => showToast('All remote sessions revoked')}
              className="text-[10px] font-extrabold text-rose-600"
            >
              Revoke All
            </button>
          </div>

          <div className={`p-2.5 rounded-xl border flex items-center justify-between ${subBoxBg}`}>
            <div>
              <div className="text-xs font-extrabold">iPhone 16 Pro • NYC Flagship</div>
              <div className={`text-[10px] ${mutedText}`}>Current Device • FaceID Verified</div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600 text-[9px] font-extrabold">
              Online
            </span>
          </div>

          <div className={`p-2.5 rounded-xl border flex items-center justify-between ${subBoxBg}`}>
            <div>
              <div className="text-xs font-extrabold">iPad Pro POS #02 • Austin Hub</div>
              <div className={`text-[10px] ${mutedText}`}>Active 4m ago • Node NYC-East-4</div>
            </div>
            <button
              onClick={() => showToast('iPad Pro POS #02 session terminated')}
              className="text-[10px] font-extrabold text-rose-600"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreSettingsVarient4;
