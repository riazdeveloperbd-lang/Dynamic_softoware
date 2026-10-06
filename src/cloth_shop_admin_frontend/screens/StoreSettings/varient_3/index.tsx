import React, { useState } from 'react';
import {
  RefreshCw,
  ChevronDown,
  Webhook,
  CreditCard,
  CheckCircle2,
  KeyRound,
  Copy,
  Sparkles,
  ExternalLink,
  Activity,
} from 'lucide-react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const StoreSettingsVarient3: React.FC<AdminScreenVariantProps> = ({
  primaryColor = '#3730A3',
  isDark = false,
}) => {
  const [stripeLive, setStripeLive] = useState(true);
  const [klaviyoSync, setKlaviyoSync] = useState(true);
  const [shopifyBridge, setShopifyBridge] = useState(true);
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
            <Webhook size={18} color={primaryColor} />
          </div>
          <div className="min-w-0">
            <div
              className="flex items-center gap-1 text-[10px] font-extrabold tracking-wider uppercase"
              style={{ color: primaryColor }}
            >
              <span>V3 • API &amp; INTEGRATIONS</span>
              <ChevronDown size={11} strokeWidth={2.5} />
            </div>
            <h1 className="text-[16px] font-extrabold tracking-tight truncate">
              Gateways &amp; Webhooks
            </h1>
          </div>
        </div>
        <button
          onClick={() => showToast('All API endpoints pinged: 99.98% OK')}
          className="p-2 rounded-full hover:bg-slate-500/10"
        >
          <RefreshCw size={17} />
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
        {/* Payment Gateways */}
        <div className={`p-3.5 rounded-2xl border shadow-xs space-y-3 ${cardBg}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard size={16} style={{ color: primaryColor }} />
              <span className="text-sm font-extrabold">Payment Gateways</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 text-[10px] font-extrabold">
              PCI-DSS Level 1
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-extrabold">Stripe Enterprise + Apple Pay</div>
              <div className={`text-[10px] ${mutedText}`}>Instant settlement • 0.4s latency</div>
            </div>
            {renderToggle(stripeLive, () => setStripeLive(!stripeLive))}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-extrabold">Klaviyo VIP &amp; Zendesk CRM</div>
              <div className={`text-[10px] ${mutedText}`}>Real-time buyer tier sync</div>
            </div>
            {renderToggle(klaviyoSync, () => setKlaviyoSync(!klaviyoSync))}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-extrabold">Global ERP &amp; WMS Inventory Bridge</div>
              <div className={`text-[10px] ${mutedText}`}>2-way stock ledger webhook</div>
            </div>
            {renderToggle(shopifyBridge, () => setShopifyBridge(!shopifyBridge))}
          </div>
        </div>

        {/* API Key Vault */}
        <div className={`p-3.5 rounded-2xl border shadow-xs space-y-3 ${cardBg}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <KeyRound size={16} style={{ color: primaryColor }} />
              <span className="text-sm font-extrabold">Production API Credentials</span>
            </div>
            <span className={`text-[10px] font-mono ${mutedText}`}>v4.8.2</span>
          </div>

          <div className={`p-3 rounded-xl border flex items-center justify-between ${subBoxBg}`}>
            <div>
              <div className={`text-[9px] font-extrabold uppercase ${mutedText}`}>
                PUBLIC STOREFRONT KEY
              </div>
              <div className="text-xs font-mono font-bold mt-0.5">pk_live_vogueops_99481a...</div>
            </div>
            <button
              onClick={() => showToast('Public API key copied')}
              className="p-2 rounded-lg hover:bg-slate-500/10"
              style={{ color: primaryColor }}
            >
              <Copy size={14} />
            </button>
          </div>

          <div className={`p-3 rounded-xl border flex items-center justify-between ${subBoxBg}`}>
            <div>
              <div className={`text-[9px] font-extrabold uppercase ${mutedText}`}>
                WMS DISPATCH WEBHOOK
              </div>
              <div className="text-xs font-mono font-bold mt-0.5">
                https://api.vogueops.io/v4/wms/hook
              </div>
            </div>
            <button
              onClick={() => showToast('Webhook URL copied')}
              className="p-2 rounded-lg hover:bg-slate-500/10"
              style={{ color: primaryColor }}
            >
              <Copy size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreSettingsVarient3;
