import React, { useState } from 'react';
import {
  RefreshCw,
  Bell,
  ChevronDown,
  Zap,
  Banknote,
  ShoppingBag,
  Users,
  Plus,
  Clock,
  ScanBarcode,
  Percent,
  AlertTriangle,
  AlertCircle,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const AdminDashboardVarient1: React.FC<AdminScreenVariantProps> = ({
  primaryColor = '#4338CA',
  isDark = false,
  onNavigate,
}) => {
  const [revenuePeriodV1, setRevenuePeriodV1] = useState<'Today' | 'Week' | 'Month'>('Today');
  const [reorderedSkus, setReorderedSkus] = useState<Record<string, number>>({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeToast, setActiveToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setActiveToast(msg);
    setTimeout(() => setActiveToast(null), 2400);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    triggerToast('Synced live telemetry with VogueOps HQ');
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handleRestock = (sku: string, qty: number, label: string) => {
    setReorderedSkus((prev) => ({ ...prev, [sku]: (prev[sku] || 0) + qty }));
    triggerToast(`${label}: +${qty} units added to PO`);
  };

  const revenueDataV1 = {
    Today: { amount: '$14,820.50', delta: '+18.4% ($2,305 ahead of forecast)' },
    Week: { amount: '$98,450.00', delta: '+22.1% ($14,200 ahead of forecast)' },
    Month: { amount: '$412,890.00', delta: '+19.8% ($54,900 ahead of forecast)' },
  }[revenuePeriodV1];

  const renderLogoBox = () => (
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
  );

  const themeStyle = (
    <style>{`
      .admin-dash-scope .text-\\[\\#4338CA\\],
      .admin-dash-scope .text-\\[\\#3730A3\\] {
        color: ${primaryColor} !important;
      }
      .admin-dash-scope .bg-\\[\\#4338CA\\],
      .admin-dash-scope .bg-\\[\\#3730A3\\] {
        background-color: ${primaryColor} !important;
      }
      .admin-dash-scope .bg-\\[\\#EEF2FF\\] {
        background-color: ${primaryColor}1A !important;
      }
      .admin-dash-scope svg [stroke="#4338CA"],
      .admin-dash-scope svg [stroke="#3730A3"],
      .admin-dash-scope svg [stroke="#4F46E5"] {
        stroke: ${primaryColor} !important;
      }
      .admin-dash-scope svg [stop-color="#4338CA"],
      .admin-dash-scope svg [stop-color="#4F46E5"] {
        stop-color: ${primaryColor} !important;
      }
      ${
        isDark
          ? `
        .admin-dash-scope {
          background-color: #090D16 !important;
          color: #F8FAFC !important;
        }
        .admin-dash-scope .bg-white,
        .admin-dash-scope .bg-white\\/95 {
          background-color: #121826 !important;
          border-color: #1E293B !important;
          color: #F8FAFC !important;
        }
        .admin-dash-scope .bg-\\[\\#F8FAFC\\],
        .admin-dash-scope .bg-\\[\\#F1F5F9\\] {
          background-color: #1A2234 !important;
          border-color: #1E293B !important;
        }
        .admin-dash-scope .text-\\[\\#0F172A\\] {
          color: #F8FAFC !important;
        }
        .admin-dash-scope .text-slate-600,
        .admin-dash-scope .text-slate-700,
        .admin-dash-scope .text-slate-500 {
          color: #94A3B8 !important;
        }
        .admin-dash-scope .border-slate-100,
        .admin-dash-scope .border-slate-200,
        .admin-dash-scope .border-slate-200\\/80 {
          border-color: #1E293B !important;
        }
      `
          : ''
      }
    `}</style>
  );

  return (
    <div className="admin-dash-scope flex-1 bg-[#F8FAFC] text-[#0F172A] pb-6 select-none relative">
      {themeStyle}
      {/* Top Header */}
      <div className="px-4 pt-3 pb-3 flex items-center justify-between border-b border-slate-100 bg-white/95 sticky top-0 z-30 backdrop-blur-md">
        <div className="flex items-center gap-2.5 min-w-0">
          {renderLogoBox()}
          <div className="min-w-0">
            <button
              onClick={() => triggerToast('Storefront selector opened')}
              className="flex items-center gap-1 text-[10px] font-extrabold tracking-wider uppercase text-[#4338CA]"
            >
              <span>STOREFRONT</span>
              <ChevronDown size={11} strokeWidth={2.5} />
            </button>
            <h1 className="text-[16px] font-extrabold tracking-tight truncate text-[#0F172A]">
              VogueOps Global ...
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-shrink-0">
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-full hover:bg-slate-100 text-slate-700 transition ${
              isRefreshing ? 'animate-spin text-indigo-600' : ''
            }`}
          >
            <RefreshCw size={17} strokeWidth={2.2} />
          </button>
          <button
            onClick={() => onNavigate ? onNavigate('Notifications') : triggerToast('3 unread operations alerts')}
            className="p-2 rounded-full relative hover:bg-slate-100 text-slate-700 transition"
          >
            <Bell size={18} strokeWidth={2.2} />
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 border-2 border-white absolute top-1.5 right-1.5" />
          </button>
          <button
            onClick={() => onNavigate && onNavigate('StoreSettings')}
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-slate-200 flex-shrink-0"
          >
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
              alt="Executive Avatar"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>

      {activeToast && (
        <div className="mx-4 mt-2 px-3 py-2 rounded-xl bg-[#0F172A] text-white text-[11px] font-bold flex items-center justify-between shadow-lg">
          <span>{activeToast}</span>
          <CheckCircle2 size={14} className="text-emerald-400" />
        </div>
      )}

      <div className="p-4 space-y-4">
        {/* Live Operations Triage Header */}
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#059669]" />
              <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#065F46]">
                LIVE OPERATIONS TRIAGE
              </span>
            </div>
            <h2 className="text-[21px] font-extrabold tracking-tight text-[#0F172A] mt-0.5 leading-tight">
              Executive Pulse
            </h2>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0]/60 flex items-center gap-1 text-[#047857] text-[11px] font-extrabold">
            <Zap size={12} className="fill-[#047857]" />
            <span>+18.4% vs yday</span>
          </div>
        </div>

        {/* Gross Revenue Main Card */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#4338CA] flex items-center justify-center">
                <Banknote size={15} strokeWidth={2.4} />
              </div>
              <span className="text-[11px] font-extrabold tracking-wider uppercase text-slate-600">
                GROSS REVENUE
              </span>
            </div>

            <div className="flex items-center bg-[#F1F5F9] p-0.5 rounded-xl">
              {(['Today', 'Week', 'Month'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setRevenuePeriodV1(tab)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold transition ${
                    revenuePeriodV1 === tab
                      ? 'bg-white text-[#0F172A] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-0.5">
            <div>
              <div className="text-[28px] font-black tracking-tight text-[#0F172A] leading-none">
                {revenueDataV1.amount}
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#059669] mt-2">
                <TrendingUp size={13} strokeWidth={2.5} />
                <span>{revenueDataV1.delta}</span>
              </div>
            </div>

            <div className="w-24 h-12 flex-shrink-0">
              <svg viewBox="0 0 100 48" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="revGradV1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M2 34 C 20 33, 35 12, 52 14 C 68 16, 78 30, 88 26 C 94 23, 97 14, 99 8 L 99 44 L 2 44 Z"
                  fill="url(#revGradV1)"
                />
                <path
                  d="M2 34 C 20 33, 35 12, 52 14 C 68 16, 78 30, 88 26 C 94 23, 97 14, 99 8"
                  fill="none"
                  stroke="#4338CA"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* 2-Column KPI Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div
            onClick={() => onNavigate && onNavigate('OrderManagement')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2.5 cursor-pointer hover:border-indigo-300 transition"
          >
            <div className="flex items-center justify-between">
              <div className="w-7 h-7 rounded-lg bg-[#F1F5F9] text-slate-600 flex items-center justify-center">
                <ShoppingBag size={14} strokeWidth={2.2} />
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#FEE2E2] text-[#B91C1C] text-[10px] font-extrabold">
                12 Pack
              </span>
            </div>
            <div>
              <div className="text-[22px] font-black text-[#0F172A] leading-tight">142</div>
              <div className="text-[11px] font-medium text-slate-500">Today&apos;s Orders</div>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#E2E8F0] overflow-hidden">
              <div className="w-[78%] h-full rounded-full bg-[#4338CA]" />
            </div>
          </div>

          <div
            onClick={() => onNavigate && onNavigate('CustomerDirectory')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2.5 cursor-pointer hover:border-emerald-300 transition"
          >
            <div className="flex items-center justify-between">
              <div className="w-7 h-7 rounded-lg bg-[#F1F5F9] text-slate-600 flex items-center justify-center">
                <Users size={14} strokeWidth={2.2} />
              </div>
              <span className="text-[#059669] text-[11px] font-extrabold">↑ 5.2%</span>
            </div>
            <div>
              <div className="text-[22px] font-black text-[#0F172A] leading-tight">3,280</div>
              <div className="text-[11px] font-medium text-slate-500">Monthly Active</div>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#E2E8F0] overflow-hidden">
              <div className="w-[64%] h-full rounded-full bg-[#059669]" />
            </div>
          </div>
        </div>

        {/* COMMAND CENTER ACTIONS */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#0F172A]">
              COMMAND CENTER ACTIONS
            </span>
            <span className="text-[10px] font-bold text-slate-500">Quick Touch</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => onNavigate && onNavigate('ProductEditor')}
              className="p-2.5 rounded-2xl bg-[#4338CA] hover:bg-[#3730A3] text-white flex flex-col items-center justify-center gap-2 shadow-sm transition"
            >
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Plus size={18} strokeWidth={2.5} />
              </div>
              <span className="text-[10px] font-extrabold">New Item</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('OrderManagement')}
              className="p-2.5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 flex flex-col items-center justify-center gap-2 relative transition"
            >
              <span className="absolute top-1.5 right-1.5 px-1.5 py-0.2 rounded-full bg-[#FEE2E2] text-[#B91C1C] text-[9px] font-extrabold">
                12
              </span>
              <div className="w-9 h-9 rounded-full bg-[#EEF2FF] text-[#0F172A] flex items-center justify-center">
                <Clock size={16} strokeWidth={2.2} />
              </div>
              <span className="text-[10px] font-extrabold text-[#0F172A]">Fulfill</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('POSCashier')}
              className="p-2.5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 flex flex-col items-center justify-center gap-2 transition"
            >
              <div className="w-9 h-9 rounded-full bg-[#EEF2FF] text-[#0F172A] flex items-center justify-center">
                <ScanBarcode size={16} strokeWidth={2.2} />
              </div>
              <span className="text-[10px] font-extrabold text-[#0F172A]">Scanner</span>
            </button>

            <button
              onClick={() => triggerToast('Flash Sale campaign drawer opened')}
              className="p-2.5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 flex flex-col items-center justify-center gap-2 transition"
            >
              <div className="w-9 h-9 rounded-full bg-[#EEF2FF] text-[#0F172A] flex items-center justify-center">
                <Percent size={16} strokeWidth={2.2} />
              </div>
              <span className="text-[10px] font-extrabold text-[#0F172A]">Flash Sale</span>
            </button>
          </div>
        </div>

        {/* STOCK DEFICIT ALERT */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <AlertTriangle size={14} className="text-[#B91C1C]" strokeWidth={2.4} />
              <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#0F172A]">
                STOCK DEFICIT ALERT
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#FEE2E2] text-[#B91C1C] text-[10px] font-extrabold">
              4 SKUs Critical
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
            <div className="min-w-[205px] p-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2.5 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=120&auto=format&fit=crop&q=80"
                  alt="Slogan Graphic Tee"
                  className="w-11 h-11 rounded-xl object-cover bg-slate-100 flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-[9px] font-extrabold uppercase text-slate-500">
                    SIZE L • NAVY
                  </div>
                  <div className="text-[12px] font-extrabold text-[#0F172A] truncate">
                    Slogan Graphic Tee
                  </div>
                </div>
              </div>
              <div className="px-2.5 py-1.5 rounded-xl bg-[#F8FAFC] flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#B91C1C] text-[10px] font-extrabold">
                  <AlertCircle size={12} />
                  <span>
                    {reorderedSkus['SKU-2209']
                      ? `${3 + reorderedSkus['SKU-2209']} in stock`
                      : '3 left'}
                  </span>
                </div>
                <button
                  onClick={() => handleRestock('SKU-2209', 25, 'Slogan Graphic Tee')}
                  className="px-2.5 py-1 rounded-lg bg-[#4338CA] hover:bg-[#3730A3] text-white text-[10px] font-extrabold transition"
                >
                  Reorder
                </button>
              </div>
            </div>

            <div className="min-w-[205px] p-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2.5 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=120&auto=format&fit=crop&q=80"
                  alt="Silk Relaxed Shirt"
                  className="w-11 h-11 rounded-xl object-cover bg-slate-100 flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-[9px] font-extrabold uppercase text-slate-500">
                    SIZE M • OFF-WHITE
                  </div>
                  <div className="text-[12px] font-extrabold text-[#0F172A] truncate">
                    Silk Relaxed Shirt
                  </div>
                </div>
              </div>
              <div className="px-2.5 py-1.5 rounded-xl bg-[#F8FAFC] flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#B91C1C] text-[10px] font-extrabold">
                  <AlertCircle size={12} />
                  <span>
                    {reorderedSkus['SKU-3104']
                      ? `${2 + reorderedSkus['SKU-3104']} in stock`
                      : '2 left'}
                  </span>
                </div>
                <button
                  onClick={() => handleRestock('SKU-3104', 25, 'Silk Relaxed Shirt')}
                  className="px-2.5 py-1 rounded-lg bg-[#4338CA] hover:bg-[#3730A3] text-white text-[10px] font-extrabold transition"
                >
                  Reorder
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RECENT ORDERS FEED */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#0F172A]">
                RECENT ORDERS FEED
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-600 text-[9px] font-bold">
                5 triage items
              </span>
            </div>
            <button
              onClick={() => onNavigate && onNavigate('OrderManagement')}
              className="flex items-center gap-0.5 text-[#4338CA] text-[11px] font-extrabold"
            >
              <span>View All</span>
              <ChevronRight size={13} />
            </button>
          </div>

          <div className="space-y-2">
            {[
              {
                initials: 'SL',
                avatarBg: 'bg-[#EEF2FF] text-[#4338CA]',
                id: '#ORD-9842',
                customer: 'Sophia Lor...',
                items: '2 items (Polo + Chino)',
                amount: '$184.00',
                status: 'Processing',
                statusStyle: 'bg-[#E0E7FF] text-[#3730A3]',
                time: '4m ago',
              },
              {
                initials: 'MV',
                avatarBg: 'bg-[#EEF2FF] text-[#4338CA]',
                id: '#ORD-9841',
                customer: 'Marcus Vance',
                items: '1 item (Leather Jacket)',
                amount: '$320.00',
                status: 'Shipped',
                statusStyle: 'bg-[#DBEAFE] text-[#1D4ED8]',
                time: '18m ago',
              },
              {
                initials: 'ER',
                avatarBg: 'bg-[#EEF2FF] text-[#4338CA]',
                id: '#ORD-9840',
                customer: 'Elena Rosto...',
                items: '3 items (Summer Dresses)',
                amount: '$245.50',
                status: 'Delivered',
                statusStyle: 'bg-[#A7F3D0] text-[#065F46]',
                time: '42m ago',
              },
              {
                initials: 'DC',
                avatarBg: 'bg-[#EEF2FF] text-[#4338CA]',
                id: '#ORD-9839',
                customer: 'David Chen',
                items: '1 item (Graphic Tee)',
                amount: '$45.00',
                status: 'New',
                statusStyle: 'bg-[#EDE9FE] text-[#5B21B6]',
                time: '1h ago',
              },
              {
                initials: 'CD',
                avatarBg: 'bg-slate-100 text-slate-600',
                id: '#ORD-9838',
                customer: 'Chloe Dubois',
                items: '2 items (Wool Trousers)',
                amount: '$190.00',
                strikethrough: true,
                status: 'Canceled',
                statusStyle: 'bg-[#FEE2E2] text-[#B91C1C]',
                time: '2h ago',
              },
            ].map((ord) => (
              <div
                key={ord.id}
                onClick={() => onNavigate && onNavigate('OrderManagement')}
                className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between gap-2.5 cursor-pointer hover:border-indigo-200 transition"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-extrabold flex-shrink-0 ${ord.avatarBg}`}
                  >
                    {ord.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 text-[12px]">
                      <span className="font-extrabold text-[#0F172A]">{ord.id}</span>
                      <span className="text-slate-400">•</span>
                      <span className="font-medium text-slate-600 truncate">{ord.customer}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">{ord.items}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className={`text-[13px] font-extrabold ${
                      ord.strikethrough ? 'line-through text-slate-400' : 'text-[#0F172A]'
                    }`}
                  >
                    {ord.amount}
                  </span>
                  <div className="text-right">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-extrabold ${ord.statusStyle}`}
                    >
                      {ord.status}
                    </span>
                    <div className="text-[9px] font-semibold text-slate-400 mt-0.5">
                      {ord.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardVarient1;
