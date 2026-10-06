import React, { useState } from 'react';
import {
  RefreshCw,
  Bell,
  ChevronDown,
  Store,
  ArrowUpDown,
  CheckCircle2,
  TrendingUp,
  Wand2,
  ArrowLeftRight,
  ArrowRight,
  ChevronRight,
  Tag,
  Users,
  ExternalLink,
  Star,
  Gavel,
  Truck,
  Box,
  Banknote,
  SlidersHorizontal,
  ClipboardCheck,
  Shield,
  Fingerprint,
  IdCard,
  FileText,
  LogOut,
  Network,
} from 'lucide-react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const StoreSettingsVarient1: React.FC<AdminScreenVariantProps> = ({
  primaryColor = '#3730A3',
  isDark = false,
  onNavigate,
}) => {
  const [storeLive, setStoreLive] = useState(true);
  const [newOrderTone, setNewOrderTone] = useState(true);
  const [voidOrderAlert, setVoidOrderAlert] = useState(true);
  const [lowStockNotice, setLowStockNotice] = useState(true);
  const [biometricPasskey, setBiometricPasskey] = useState(true);
  const [stockThreshold, setStockThreshold] = useState(5);
  const [promoCodes, setPromoCodes] = useState(['FLASH20 (-20%)', 'VIPFREE ($0 Ship)']);
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
      {/* Sticky Top Header */}
      <div
        className={`px-4 py-3 flex items-center justify-between border-b sticky top-0 z-30 backdrop-blur-md ${headerBg}`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#0F172A] flex items-center justify-center flex-shrink-0 shadow-xs border border-slate-800">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 5L12 19L20 5H15.5L12 11.5L8.5 5H4Z"
                stroke={primaryColor}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="8" r="1.5" fill="#38BDF8" />
            </svg>
          </div>
          <div className="min-w-0">
            <div
              className="flex items-center gap-1 text-[10px] font-extrabold tracking-wider uppercase"
              style={{ color: primaryColor }}
            >
              <span>STOREFRONT</span>
              <ChevronDown size={11} strokeWidth={2.5} />
            </div>
            <h1 className="text-[16px] font-extrabold tracking-tight truncate">
              VogueOps Global ...
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => showToast('Storefront configuration synced')}
            className="p-2 rounded-full hover:bg-slate-500/10"
          >
            <RefreshCw size={17} />
          </button>
          <button
            onClick={() => onNavigate ? onNavigate('Notifications') : showToast('Notifications opened')}
            className="p-2 rounded-full relative hover:bg-slate-500/10"
          >
            <Bell size={18} />
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 border-2 border-white absolute top-1.5 right-1.5" />
          </button>
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
            alt="Admin"
            className="w-9 h-9 rounded-full object-cover border-2 border-slate-200"
          />
        </div>
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

      <div className="p-3.5 space-y-4">
        {/* 1. Storefront Identity Card */}
        <div className={`p-3.5 rounded-2xl border shadow-xs space-y-3 ${cardBg}`}>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isDark ? 'bg-slate-800' : 'bg-[#EEF2FF]'
                }`}
                style={{ color: primaryColor }}
              >
                <Store size={19} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[15px] font-extrabold truncate">
                    VogueOps Flagship (US)
                  </span>
                  <ArrowUpDown size={13} className={mutedText} />
                </div>
                <div className={`text-[10px] font-extrabold tracking-wider uppercase ${mutedText}`}>
                  STORE ID: US-NY-0192
                </div>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-extrabold flex items-center gap-1 flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>{storeLive ? 'Live' : 'Paused'}</span>
            </span>
          </div>

          <div
            className={`px-3 py-2.5 rounded-xl flex items-center justify-between ${
              isDark ? 'bg-slate-800/80' : 'bg-[#EEF2FF]/80'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
              <span className="text-[11px] font-extrabold">
                {storeLive
                  ? 'Storefront Live & Accepting Orders'
                  : 'Maintenance Mode Enabled'}
              </span>
            </div>
            <button
              onClick={() => {
                setStoreLive(!storeLive);
                showToast(storeLive ? 'Storefront paused' : 'Storefront set to Live');
              }}
              className="text-[11px] font-extrabold"
              style={{ color: primaryColor }}
            >
              Change
            </button>
          </div>
        </div>

        {/* 2. Three KPI Cards Row */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className={`p-3 rounded-2xl border shadow-xs ${cardBg}`}>
            <div className={`text-[9px] font-extrabold uppercase tracking-wider ${mutedText}`}>
              ACTIVE CODES
            </div>
            <div className="text-[15px] font-black mt-0.5">{promoCodes.length + 2} Live</div>
            <div className="text-[10px] font-extrabold text-emerald-600 flex items-center gap-0.5 mt-0.5">
              <TrendingUp size={10} />
              <span>+18.4%</span>
            </div>
          </div>

          <div className={`p-3 rounded-2xl border shadow-xs ${cardBg}`}>
            <div className={`text-[9px] font-extrabold uppercase tracking-wider ${mutedText}`}>
              API UPTIME
            </div>
            <div className="text-[15px] font-black mt-0.5">99.98%</div>
            <div className="text-[10px] font-extrabold text-emerald-600 mt-0.5">Operational</div>
          </div>

          <div
            onClick={() => onNavigate && onNavigate('StaffManagement')}
            className={`p-3 rounded-2xl border shadow-xs cursor-pointer ${cardBg}`}
          >
            <div className={`text-[9px] font-extrabold uppercase tracking-wider ${mutedText}`}>
              ADMIN STAFF
            </div>
            <div className="text-[15px] font-black mt-0.5">5 Active</div>
            <div className={`text-[10px] font-extrabold mt-0.5 ${mutedText}`}>2 online</div>
          </div>
        </div>

        {/* 3. MARKETING & CONTENT MANAGEMENT */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-0.5">
            <div className="flex items-center gap-2">
              <Wand2 size={15} style={{ color: primaryColor }} />
              <span className="text-[11px] font-extrabold uppercase tracking-wider">
                MARKETING &amp; CONTENT MANAGEMENT
              </span>
            </div>
            <span className={`text-[10px] font-bold ${mutedText}`}>3 active drops</span>
          </div>

          <div className={`p-3.5 rounded-2xl border shadow-xs space-y-3.5 ${cardBg}`}>
            {/* Homepage Hero Banners & Drops */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black">Homepage Hero Banners &amp; Drops</span>
              </div>
              <button
                onClick={() => showToast('Hero banner slot order updated')}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold flex items-center gap-1 ${
                  isDark ? 'bg-slate-800 text-slate-200' : 'bg-[#EEF2FF] text-[#1E1B4B]'
                }`}
                style={{ color: primaryColor }}
              >
                <ArrowLeftRight size={11} />
                <span>Reorder</span>
              </button>
            </div>

            {/* 3 Banner Slots */}
            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  title: 'Winter Minimal',
                  slot: 'Slot #1',
                  img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=240&auto=format&fit=crop&q=80',
                },
                {
                  title: 'Cyber Tailored',
                  slot: 'Slot #2',
                  img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=240&auto=format&fit=crop&q=80',
                },
                {
                  title: 'Craft Footwear',
                  slot: 'Slot #3',
                  img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=240&auto=format&fit=crop&q=80',
                },
              ].map((banner) => (
                <div
                  key={banner.slot}
                  onClick={() => showToast(`Editing ${banner.title} (${banner.slot})`)}
                  className="relative h-20 rounded-xl overflow-hidden cursor-pointer group bg-slate-900"
                >
                  <img
                    src={banner.img}
                    alt={banner.title}
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent p-2 flex flex-col justify-end">
                    <div className="text-[10px] font-extrabold text-white leading-tight">
                      {banner.title}
                    </div>
                    <div className="text-[9px] font-semibold text-slate-300">{banner.slot}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <span className={`text-[11px] font-medium ${mutedText}`}>
                3 active carousel slides • Flash Drop scheduled
              </span>
              <button
                onClick={() => showToast('Flash Sale scheduler opened')}
                className="text-[11px] font-extrabold flex items-center gap-1 flex-shrink-0"
                style={{ color: primaryColor }}
              >
                <span>Schedule Sale</span>
                <ArrowRight size={12} />
              </button>
            </div>

            <div className={`border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`} />

            {/* Categories & Navigation Taxonomy */}
            <div
              onClick={() => onNavigate && onNavigate('InventoryCatalog')}
              className="flex items-center justify-between gap-2 cursor-pointer"
            >
              <div className="flex items-start gap-2.5">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isDark ? 'bg-slate-800 text-slate-300' : 'bg-[#EEF2FF] text-slate-700'
                  }`}
                >
                  <Network size={15} />
                </div>
                <div className="space-y-1.5">
                  <div className="text-xs font-extrabold">Categories &amp; Navigation Taxonomy</div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {['1. Men', '2. Women', '3. Shoes', '4. Accessories'].map((cat) => (
                      <span
                        key={cat}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                          isDark ? 'bg-slate-800 text-slate-300' : 'bg-[#EEF2FF] text-slate-700'
                        }`}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <ChevronRight size={15} className={mutedText} />
            </div>

            <div className={`border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`} />

            {/* Promotions & Promo Codes */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-start gap-2.5 min-w-0">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isDark ? 'bg-slate-800 text-slate-300' : 'bg-[#EEF2FF] text-slate-700'
                  }`}
                >
                  <Tag size={15} />
                </div>
                <div className="space-y-1.5 min-w-0">
                  <div className="text-xs font-extrabold">Promotions &amp; Promo Codes</div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {promoCodes.map((code) => (
                      <span
                        key={code}
                        className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-extrabold ${
                          isDark ? 'bg-slate-800 text-slate-300' : 'bg-[#EEF2FF] text-slate-800'
                        }`}
                      >
                        {code}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setPromoCodes([...promoCodes, 'AUSTIN15 (-15%)']);
                  showToast('Promo code AUSTIN15 added');
                }}
                style={{ backgroundColor: primaryColor }}
                className="px-2.5 py-1.5 rounded-full text-white text-[10px] font-extrabold flex-shrink-0 shadow-xs"
              >
                + Add
              </button>
            </div>
          </div>
        </div>

        {/* 4. CUSTOMER DIRECTORY & CRM */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-0.5">
            <div className="flex items-center gap-2">
              <Users size={15} style={{ color: primaryColor }} />
              <span className="text-[11px] font-extrabold uppercase tracking-wider">
                CUSTOMER DIRECTORY &amp; CRM
              </span>
            </div>
            <button
              onClick={() => onNavigate && onNavigate('CustomerDirectory')}
              className="text-[11px] font-extrabold flex items-center gap-1"
              style={{ color: primaryColor }}
            >
              <span>Full CRM</span>
              <ExternalLink size={11} />
            </button>
          </div>

          <div className={`p-3.5 rounded-2xl border shadow-xs space-y-3 ${cardBg}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-[18px] font-black">3,492</span>
                <span className={`text-[11px] font-medium ${mutedText}`}>
                  Total Registered Accounts
                </span>
              </div>
              <div className="flex items-center -space-x-1.5">
                <span
                  className="w-6 h-6 rounded-full text-white text-[9px] font-extrabold flex items-center justify-center border-2 border-white dark:border-slate-900"
                  style={{ backgroundColor: primaryColor }}
                >
                  VG
                </span>
                <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-[9px] font-extrabold flex items-center justify-center border-2 border-white dark:border-slate-900">
                  EL
                </span>
                <span className="w-6 h-6 rounded-full bg-slate-700 text-white text-[9px] font-extrabold flex items-center justify-center border-2 border-white dark:border-slate-900">
                  +99
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div
                onClick={() => onNavigate && onNavigate('CustomerDirectory')}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer ${subBoxBg}`}
              >
                <div>
                  <div className={`text-[10px] font-bold ${mutedText}`}>VIP Tier 1 (Gold)</div>
                  <div className="text-xs font-extrabold mt-0.5">124 Customers</div>
                </div>
                <Star size={16} className="text-emerald-700 dark:text-emerald-400" />
              </div>

              <div
                onClick={() => showToast('Reviewing 8 flagged accounts')}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer ${subBoxBg}`}
              >
                <div>
                  <div className={`text-[10px] font-bold ${mutedText}`}>Suspended Accounts</div>
                  <div className="text-xs font-extrabold text-rose-600 mt-0.5">8 Flagged</div>
                </div>
                <Gavel size={16} className="text-rose-600" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <div className={`flex items-center gap-1.5 text-[11px] ${mutedText}`}>
                <RefreshCw size={12} />
                <span>Klaviyo &amp; Zendesk Synced 4m ago</span>
              </div>
              <button
                onClick={() => onNavigate && onNavigate('CustomerDirectory')}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold ${
                  isDark ? 'bg-slate-800 text-slate-200' : 'bg-[#EEF2FF] text-slate-800'
                }`}
              >
                Manage Segments
              </button>
            </div>
          </div>
        </div>

        {/* 5. OPERATIONS & FULFILLMENT RULES */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 px-0.5">
            <Truck size={15} style={{ color: primaryColor }} />
            <span className="text-[11px] font-extrabold uppercase tracking-wider">
              OPERATIONS &amp; FULFILLMENT RULES
            </span>
          </div>

          <div className={`p-3.5 rounded-2xl border shadow-xs space-y-3 ${cardBg}`}>
            {/* Shipping Rates & Couriers */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-start gap-2.5 min-w-0">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isDark ? 'bg-slate-800 text-slate-300' : 'bg-[#EEF2FF] text-slate-700'
                  }`}
                >
                  <Box size={15} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-extrabold">Shipping Rates &amp; Couriers</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  </div>
                  <div className={`text-[11px] leading-snug mt-0.5 ${mutedText}`}>
                    FedEx Express, DHL Global, UPS API Connected
                  </div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 text-[10px] font-extrabold text-center leading-tight flex-shrink-0">
                All
                <br />
                Active
              </span>
            </div>

            <div className={`border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`} />

            {/* Tax Rates & Gateways */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-start gap-2.5 min-w-0">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isDark ? 'bg-slate-800 text-slate-300' : 'bg-[#EEF2FF] text-slate-700'
                  }`}
                >
                  <Banknote size={15} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-extrabold">Tax Rates &amp; Gateways</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  </div>
                  <div className={`text-[11px] truncate mt-0.5 ${mutedText}`}>
                    Stripe (v2.8), Apple Pay, Klarna Live
                  </div>
                </div>
              </div>
              <button
                onClick={() => showToast('Payment gateway settings opened')}
                className="p-1.5 rounded-lg hover:bg-slate-500/10"
              >
                <SlidersHorizontal size={15} />
              </button>
            </div>

            <div className={`border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`} />

            {/* Stock Threshold Alerts */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-start gap-2.5 min-w-0">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isDark ? 'bg-slate-800 text-slate-300' : 'bg-[#EEF2FF] text-slate-700'
                  }`}
                >
                  <ClipboardCheck size={15} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-extrabold">Stock Threshold Alerts</div>
                  <div className={`text-[11px] truncate mt-0.5 ${mutedText}`}>
                    Trigger push dispatch when item SKU
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  const next = stockThreshold === 5 ? 10 : 5;
                  setStockThreshold(next);
                  showToast(`Low stock alert threshold set to ≤ ${next} units`);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-extrabold flex-shrink-0 ${
                  isDark ? 'bg-slate-800 text-white' : 'bg-[#EEF2FF] text-slate-800'
                }`}
              >
                ≤ {stockThreshold} <span className="text-[10px] font-medium">units</span>
              </button>
            </div>
          </div>
        </div>

        {/* 6. ADMIN SECURITY & ACCOUNT */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 px-0.5">
            <Shield size={15} style={{ color: primaryColor }} />
            <span className="text-[11px] font-extrabold uppercase tracking-wider">
              ADMIN SECURITY &amp; ACCOUNT
            </span>
          </div>

          <div className={`p-3.5 rounded-2xl border shadow-xs space-y-3.5 ${cardBg}`}>
            {/* Push Audio & Notification Chimes */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell size={15} className={mutedText} />
                <span className="text-xs font-extrabold">Push Audio &amp; Notification Chimes</span>
              </div>
              <button
                onClick={() => showToast('Audio chime selector opened')}
                className="text-[10px] font-extrabold"
                style={{ color: primaryColor }}
              >
                Custom Tones
              </button>
            </div>

            <div className="space-y-2.5 pl-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium">New Order Placed (Haptic &amp; Tone)</span>
                {renderToggle(newOrderTone, () => setNewOrderTone(!newOrderTone))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium">Order Voided / Canceled Alerts</span>
                {renderToggle(voidOrderAlert, () => setVoidOrderAlert(!voidOrderAlert))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium">Low Stock / Zero Inventory Notice</span>
                {renderToggle(lowStockNotice, () => setLowStockNotice(!lowStockNotice))}
              </div>
            </div>

            <div className={`border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`} />

            {/* Biometric FaceID / Passkey */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-start gap-2.5 min-w-0">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isDark ? 'bg-slate-800 text-slate-300' : 'bg-[#EEF2FF] text-slate-700'
                  }`}
                >
                  <Fingerprint size={15} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-extrabold">Biometric FaceID / Passkey</div>
                  <div className={`text-[11px] leading-snug mt-0.5 ${mutedText}`}>
                    Require authentication on inventory overrides
                  </div>
                </div>
              </div>
              {renderToggle(biometricPasskey, () => setBiometricPasskey(!biometricPasskey))}
            </div>

            <div className={`border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`} />

            {/* Staff Permissions & Roles */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-start gap-2.5 min-w-0">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isDark ? 'bg-slate-800 text-slate-300' : 'bg-[#EEF2FF] text-slate-700'
                  }`}
                >
                  <IdCard size={15} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-extrabold">Staff Permissions &amp; Roles</div>
                  <div className={`text-[11px] mt-0.5 ${mutedText}`}>
                    3 Store Admins, 2 Fulfillment Staff
                  </div>
                </div>
              </div>
              <button
                onClick={() => onNavigate && onNavigate('StaffManagement')}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold flex items-center gap-1 flex-shrink-0 ${
                  isDark ? 'bg-slate-800 text-slate-200' : 'bg-[#EEF2FF] text-slate-800'
                }`}
              >
                <span>Review</span>
                <ChevronRight size={12} />
              </button>
            </div>

            <div className={`border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`} />

            {/* Store Policies & Terms */}
            <div
              onClick={() => showToast('Opening Store Policies & Terms')}
              className="flex items-center justify-between gap-2 cursor-pointer"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isDark ? 'bg-slate-800 text-slate-300' : 'bg-[#EEF2FF] text-slate-700'
                  }`}
                >
                  <FileText size={15} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-extrabold">Store Policies &amp; Terms</div>
                  <div className={`text-[11px] leading-snug mt-0.5 ${mutedText}`}>
                    Returns window (14d), Terms of Service, Shipping FAQ
                  </div>
                </div>
              </div>
              <ExternalLink size={15} className={mutedText} />
            </div>
          </div>
        </div>

        {/* 7. Sign Out Button & Version Footer */}
        <div className="pt-1 space-y-2.5">
          <button
            onClick={() => showToast('Signed out of VogueOps Admin session')}
            className={`w-full py-3 rounded-2xl text-xs font-extrabold flex items-center justify-center gap-2 transition ${
              isDark
                ? 'bg-rose-950/60 border border-rose-800/60 text-rose-300'
                : 'bg-[#FDE8E8] text-[#B91C1C]'
            }`}
          >
            <LogOut size={15} />
            <span>Sign Out from Admin Panel</span>
          </button>

          <div className={`text-center text-[10px] font-bold ${mutedText}`}>
            VogueOps Enterprise v4.8.2 • Node NYC-East-4
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreSettingsVarient1;
