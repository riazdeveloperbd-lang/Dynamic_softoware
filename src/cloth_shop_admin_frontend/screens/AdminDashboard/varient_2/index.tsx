import React, { useState } from 'react';
import {
  Bell,
  ChevronDown,
  Banknote,
  ChevronRight,
  ShoppingCart,
  CheckCircle2,
  TrendingUp,
  Award,
  Target,
  Star,
  PieChart,
  BarChart2,
  Gem,
} from 'lucide-react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const AdminDashboardVarient2: React.FC<AdminScreenVariantProps> = ({
  primaryColor = '#4338CA',
  isDark = false,
  onNavigate,
}) => {
  const [revenuePeriodV2, setRevenuePeriodV2] = useState<'Hourly' | 'Today' | '7D' | '30D'>('Today');
  const [activeToast, setActiveToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setActiveToast(msg);
    setTimeout(() => setActiveToast(null), 2400);
  };

  const handleRefresh = () => {
    triggerToast('Synced live telemetry with VogueOps HQ');
  };

  const revenueDataV2 = {
    Hourly: { amount: '$2,410.00', badge: '+24.2%', runRate: '+$410.00 ahead of hourly run-rate' },
    Today: { amount: '$14,820.50', badge: '+18.4%', runRate: '+$2,305.20 ahead of daily run-rate' },
    '7D': { amount: '$98,450.00', badge: '+21.0%', runRate: '+$14,200.00 ahead of weekly run-rate' },
    '30D': { amount: '$412,890.00', badge: '+19.8%', runRate: '+$54,900.00 ahead of monthly run-rate' },
  }[revenuePeriodV2];

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
              VogueOps Global...
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleRefresh}
            className="px-2.5 py-1 rounded-full border border-slate-200 bg-slate-50 flex items-center gap-1.5 text-[10px] font-bold text-slate-700"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
            <span>Syncing</span>
          </button>
          <button
            onClick={() => onNavigate ? onNavigate('Notifications') : triggerToast('3 unread analytics alerts')}
            className="p-1.5 rounded-full relative hover:bg-slate-100 text-slate-700 transition"
          >
            <Bell size={18} strokeWidth={2.2} />
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 border-2 border-white absolute top-1 right-1" />
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

      <div className="p-3.5 space-y-3.5">
        {/* Section Title: Commercial Performance */}
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1 text-[10px] font-extrabold tracking-wider uppercase">
              <span className="text-[#4338CA]">EXECUTIVE ANALYTICS</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 font-semibold normal-case">Live UTC</span>
            </div>
            <h2 className="text-[20px] font-extrabold tracking-tight text-[#0F172A] mt-0.5 leading-tight">
              Commercial Performance
            </h2>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-[#ECFDF5] border border-[#6EE7B7] flex items-center gap-1 text-[#047857] text-[11px] font-extrabold">
            <TrendingUp size={12} strokeWidth={2.5} />
            <span>+18.4%</span>
          </div>
        </div>

        {/* GROSS REVENUE Large Chart Card */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
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
              {(['Hourly', 'Today', '7D', '30D'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setRevenuePeriodV2(tab)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-extrabold transition ${
                    revenuePeriodV2 === tab
                      ? 'bg-white text-[#4338CA] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-[28px] font-black tracking-tight text-[#0F172A] leading-none">
              {revenueDataV2.amount}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[#ECFDF5] text-[#047857] text-[10px] font-extrabold">
              ▲ {revenueDataV2.badge}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] gap-2">
            <span className="text-slate-500 font-medium leading-snug">
              {revenueDataV2.runRate}
            </span>
            <div className="flex items-center gap-1 text-[#3730A3] font-extrabold text-right flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4338CA]" />
              <span>
                Peak: 2:00 PM
                <br />
                ($2.4k/hr)
              </span>
            </div>
          </div>

          {/* Area Curve Box with Peak Tooltip */}
          <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-100 space-y-2">
            <div className="relative h-24 w-full">
              <div className="absolute top-1 left-[50%] -translate-x-1/2 px-2 py-0.5 rounded-md bg-[#3730A3] text-white text-[9px] font-extrabold shadow-sm z-10">
                Peak $2,410
              </div>

              <svg viewBox="0 0 300 90" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="commGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4338CA" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#4338CA" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 5 68 Q 55 60, 95 50 T 165 55 Q 185 52, 200 22 Q 215 5, 232 16 L 245 38 L 295 20 L 295 85 L 5 85 Z"
                  fill="url(#commGrad)"
                />
                <path
                  d="M 5 68 Q 55 60, 95 50 T 165 55 Q 185 52, 200 22 Q 215 5, 232 16 L 245 38 L 295 20"
                  fill="none"
                  stroke="#3730A3"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="200" cy="22" r="4" fill="#FFFFFF" stroke="#3730A3" strokeWidth="2.5" />
                <circle cx="295" cy="20" r="3.5" fill="#3730A3" />
              </svg>
            </div>

            <div className="flex items-center justify-between text-[9px] font-semibold text-slate-400 px-1">
              <span>08:00</span>
              <span>11:00</span>
              <span>14:00 (Peak)</span>
              <span>17:00</span>
              <span>Now (20:00)</span>
            </div>
          </div>
        </div>

        {/* 2x2 KPI Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase text-slate-500">
                NET MARGIN
              </span>
              <div className="w-6 h-6 rounded-lg bg-[#ECFDF5] text-[#059669] flex items-center justify-center">
                <Award size={13} strokeWidth={2.3} />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[19px] font-black text-[#0F172A]">$9,944</span>
                <span className="text-[10px] font-extrabold text-[#059669]">67.1%</span>
              </div>
              <div className="text-[10px] font-medium text-slate-500 mt-0.5">
                COGS: $4,876.50
              </div>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="w-[67%] h-full rounded-full bg-[#059669]" />
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase text-slate-500">
                AVG ORDER VALUE
              </span>
              <div className="w-6 h-6 rounded-lg bg-[#EEF2FF] text-[#4338CA] flex items-center justify-center">
                <ShoppingCart size={13} strokeWidth={2.3} />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[19px] font-black text-[#0F172A]">$104.37</span>
                <span className="text-[10px] font-extrabold text-[#059669]">+$6.80</span>
              </div>
              <div className="text-[10px] font-medium text-slate-500 mt-0.5">
                2.4 items/cart avg
              </div>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="w-[74%] h-full rounded-full bg-[#4338CA]" />
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase text-slate-500">
                STORE CONV. RATE
              </span>
              <div className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                <Target size={13} strokeWidth={2.3} />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[19px] font-black text-[#0F172A]">3.82%</span>
                <span className="text-[10px] font-extrabold text-[#059669]">+0.4%</span>
              </div>
              <div className="text-[10px] font-medium text-slate-500 mt-0.5">
                3,717 Sessions
              </div>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="w-[58%] h-full rounded-full bg-[#4338CA]" />
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase text-slate-500">
                VIP SHARE
              </span>
              <div className="w-6 h-6 rounded-lg bg-[#EEF2FF] text-[#4338CA] flex items-center justify-center">
                <Star size={13} strokeWidth={2.3} />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[19px] font-black text-[#0F172A]">42.6%</span>
                <span className="text-[10px] font-extrabold text-[#4338CA]">Repeat</span>
              </div>
              <div className="text-[10px] font-medium text-slate-500 mt-0.5">
                CAC: $22.40 (-11%)
              </div>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="w-[52%] h-full rounded-full bg-[#34D399]" />
            </div>
          </div>
        </div>

        {/* CATEGORY REVENUE SHARE */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <PieChart size={14} className="text-[#4338CA]" strokeWidth={2.4} />
              <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#0F172A]">
                CATEGORY REVENUE SHARE
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-500">FW24 Cycle</span>
          </div>

          <div className="w-full h-2.5 rounded-full overflow-hidden flex gap-0.5">
            <div className="w-[45%] bg-[#3730A3] h-full rounded-l-full" />
            <div className="w-[38%] bg-[#065F46] h-full" />
            <div className="w-[17%] bg-[#CBD5E1] h-full rounded-r-full" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-100">
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-600">
                <span className="w-2 h-2 rounded-full bg-[#3730A3]" />
                <span className="truncate">Men&apos;s FW24</span>
              </div>
              <div className="text-[14px] font-black text-[#0F172A] mt-1">45%</div>
              <div className="text-[10px] font-medium text-slate-500">$6,669</div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-100">
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-600">
                <span className="w-2 h-2 rounded-full bg-[#065F46]" />
                <span className="truncate">Women Knit</span>
              </div>
              <div className="text-[14px] font-black text-[#0F172A] mt-1">38%</div>
              <div className="text-[10px] font-medium text-slate-500">$5,631</div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-100">
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-600">
                <span className="w-2 h-2 rounded-full bg-[#CBD5E1]" />
                <span className="truncate">Accessories</span>
              </div>
              <div className="text-[14px] font-black text-[#0F172A] mt-1">17%</div>
              <div className="text-[10px] font-medium text-slate-500">$2,520</div>
            </div>
          </div>
        </div>

        {/* TOP REVENUE DRIVERS */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <BarChart2 size={15} className="text-[#059669]" strokeWidth={2.4} />
              <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#0F172A]">
                TOP REVENUE DRIVERS
              </span>
            </div>
            <button
              onClick={() => onNavigate && onNavigate('InventoryCatalog')}
              className="flex items-center gap-0.5 text-[#4338CA] text-[10px] font-extrabold"
            >
              <span>Full Catalog</span>
              <ChevronRight size={12} />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {[
              {
                rank: 1,
                rankStyle: 'bg-[#3730A3] text-white',
                name: 'Denim Oversized Jacket',
                sub: '38 units sold today',
                amount: '$4,180.00',
                tag: '+24% velocity',
                tagColor: 'text-[#059669]',
                img: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=120&auto=format&fit=crop&q=80',
              },
              {
                rank: 2,
                rankStyle: 'bg-[#DBEAFE] text-[#1E40AF]',
                name: 'Silk Relaxed Shirt',
                sub: '27 units sold today',
                amount: '$3,240.00',
                tag: '+12% velocity',
                tagColor: 'text-[#059669]',
                img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=120&auto=format&fit=crop&q=80',
              },
              {
                rank: 3,
                rankStyle: 'bg-[#DBEAFE] text-[#1E40AF]',
                name: 'Cashmere Ribbed Beanie',
                sub: '42 units sold today',
                amount: '$2,310.00',
                tag: 'Low Stock',
                tagColor: 'text-[#B91C1C]',
                img: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=120&auto=format&fit=crop&q=80',
              },
            ].map((item) => (
              <div
                key={item.rank}
                onClick={() => onNavigate && onNavigate('InventoryCatalog')}
                className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-2.5 cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative flex-shrink-0">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-11 h-11 rounded-xl object-cover bg-slate-100"
                    />
                    <span
                      className={`w-4 h-4 rounded-full text-[9px] font-extrabold flex items-center justify-center absolute -top-1 -left-1 shadow-xs ${item.rankStyle}`}
                    >
                      {item.rank}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[12px] font-extrabold text-[#0F172A] truncate">
                      {item.name}
                    </div>
                    <div className="text-[10px] font-medium text-slate-500">{item.sub}</div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-[13px] font-extrabold text-[#0F172A]">{item.amount}</div>
                  <div className={`text-[9px] font-extrabold ${item.tagColor}`}>{item.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VIP CUSTOMER ORDERS */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Gem size={14} className="text-[#4338CA]" strokeWidth={2.4} />
              <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#0F172A]">
                VIP CUSTOMER ORDERS
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#EEF2FF] text-[#4338CA] text-[9px] font-extrabold">
              LTV Tier 1
            </span>
          </div>

          <div className="space-y-2">
            {[
              {
                initials: 'SL',
                name: 'Sophia Loren',
                tier: 'VIP Platinum',
                tierStyle: 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]',
                ltv: '$5,420',
                time: '3m ago',
                amount: '$380.00',
              },
              {
                initials: 'MV',
                name: 'Marcus Vance',
                tier: 'VIP Gold',
                tierStyle: 'bg-[#EEF2FF] text-[#4338CA] border-indigo-200',
                ltv: '$3,180',
                time: '18m ago',
                amount: '$490.00',
              },
              {
                initials: 'ER',
                name: 'Elena Rostova',
                tier: 'VIP Gold',
                tierStyle: 'bg-[#EEF2FF] text-[#4338CA] border-indigo-200',
                ltv: '$2,950',
                time: '42m ago',
                amount: '$245.50',
              },
            ].map((vip) => (
              <div
                key={vip.name}
                onClick={() => onNavigate && onNavigate('CustomerDirectory')}
                className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between gap-2 cursor-pointer hover:border-indigo-300 transition"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#4338CA] flex items-center justify-center text-xs font-extrabold flex-shrink-0">
                    {vip.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[12px] font-extrabold text-[#0F172A] truncate">
                        {vip.name}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded border text-[8px] font-extrabold flex-shrink-0 ${vip.tierStyle}`}
                      >
                        {vip.tier}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      LTV: <strong className="text-[#0F172A]">{vip.ltv}</strong> • {vip.time}
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="text-[13px] font-extrabold text-[#0F172A]">{vip.amount}</div>
                  <span className="inline-block px-2 py-0.5 rounded-full bg-[#6EE7B7] text-[#065F46] text-[9px] font-extrabold mt-0.5">
                    Paid
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardVarient2;
