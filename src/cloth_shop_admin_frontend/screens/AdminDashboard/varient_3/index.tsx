import React, { useState } from 'react';
import {
  Bell,
  Plus,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
  RotateCcw,
  QrCode,
  Tag,
  MessageSquare,
  Receipt,
} from 'lucide-react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const AdminDashboardVarient3: React.FC<AdminScreenVariantProps> = ({
  primaryColor = '#4338CA',
  isDark = false,
  onNavigate,
}) => {
  const [activeToast, setActiveToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setActiveToast(msg);
    setTimeout(() => setActiveToast(null), 2400);
  };

  const handleRestock = (_sku: string, qty: number, label: string) => {
    triggerToast(`${label}: +${qty} units added to PO`);
  };

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
            <div className="flex items-center gap-1.5 text-[9px] font-extrabold tracking-wider uppercase text-slate-500">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span>FLAGSHIP US • LIVE</span>
            </div>
            <h1 className="text-[16px] font-extrabold tracking-tight truncate text-[#0F172A]">
              Good afternoon, Marcus
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-shrink-0">
          <button
            onClick={() => onNavigate ? onNavigate('Notifications') : triggerToast('2 Flagship store notifications')}
            className="p-2 rounded-full relative hover:bg-slate-100 text-slate-700 transition"
          >
            <Bell size={18} strokeWidth={2.2} />
            <span className="w-2.5 h-2.5 rounded-full bg-[#4338CA] border-2 border-white absolute top-1.5 right-1.5" />
          </button>
          <button
            onClick={() => onNavigate && onNavigate('StoreSettings')}
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-slate-200 flex-shrink-0"
          >
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
              alt="Marcus Avatar"
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
        {/* TODAY'S REVENUE Hero Card */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#EEF2FF] text-[#4338CA] flex items-center justify-center">
                <TrendingUp size={15} strokeWidth={2.4} />
              </div>
              <span className="text-[11px] font-extrabold tracking-wider uppercase text-slate-600">
                TODAY&apos;S REVENUE
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#047857] text-[11px] font-extrabold">
              ↗ +18.4%
            </span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-[30px] font-black tracking-tight text-[#0F172A] leading-none">
                $14,820<span className="text-[18px] font-bold text-slate-500">.50</span>
              </div>
              <div className="text-[11px] font-medium text-slate-500 mt-1.5">
                $2,305 ahead of 2pm target forecast
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-bold">
                Hourly Peak 1:00 PM
              </span>
              <div className="text-[14px] font-extrabold text-[#3730A3] mt-1">$3,140/hr</div>
            </div>
          </div>

          {/* Smooth Revenue Curve */}
          <div className="h-16 w-full pt-1">
            <svg viewBox="0 0 300 60" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="marcusGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4338CA" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#4338CA" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 2 45 Q 45 38, 85 40 T 155 24 Q 195 20, 230 22 T 298 12 L 298 58 L 2 58 Z"
                fill="url(#marcusGrad)"
              />
              <path
                d="M 2 45 Q 45 38, 85 40 T 155 24 Q 195 20, 230 22 T 298 12"
                fill="none"
                stroke="#3730A3"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <circle cx="260" cy="15" r="3.5" fill="#3730A3" stroke="#FFFFFF" strokeWidth="1.5" />
            </svg>
          </div>

          {/* 4-Column Hourly Strip */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-4 text-center">
            <div>
              <div className="text-[9px] font-semibold text-slate-400">08:00</div>
              <div className="text-[12px] font-extrabold text-[#0F172A] mt-0.5">$1.2k</div>
            </div>
            <div>
              <div className="text-[9px] font-semibold text-slate-400">11:00</div>
              <div className="text-[12px] font-extrabold text-[#0F172A] mt-0.5">$4.8k</div>
            </div>
            <div>
              <div className="text-[9px] font-extrabold text-[#3730A3]">13:00 (Peak)</div>
              <div className="text-[12px] font-extrabold text-[#3730A3] mt-0.5">$5.7k</div>
            </div>
            <div>
              <div className="text-[9px] font-semibold text-slate-400">14:00 (Now)</div>
              <div className="text-[12px] font-extrabold text-[#0F172A] mt-0.5">$3.1k</div>
            </div>
          </div>
        </div>

        {/* 2-Column Cards: ORDERS PENDING & CRITICAL STOCK */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase text-slate-500">
                ORDERS PENDING
              </span>
              <span className="w-2 h-2 rounded-full bg-[#4338CA]" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-[24px] font-black text-[#0F172A] leading-none">142</div>
                <div className="text-[10px] font-bold text-slate-500 mt-1">18 pack urgent</div>
              </div>

              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="3.5"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#4338CA"
                    strokeWidth="3.5"
                    strokeDasharray="88 100"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-[9px] font-extrabold text-[#0F172A]">88%</span>
              </div>
            </div>

            <div className="py-1.5 px-2 rounded-lg bg-[#ECFDF5] text-[#065F46] text-[10px] font-extrabold text-center">
              88% Completed Today
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase text-slate-500">
                CRITICAL STOCK
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#FEE2E2] text-[#B91C1C] text-[9px] font-extrabold">
                4 SKUs
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-[24px] font-black text-[#B91C1C] leading-none">4</div>
                <div className="text-[10px] font-medium text-slate-500 leading-tight mt-1">
                  Below safe
                  <br />
                  threshold
                </div>
              </div>

              <div className="flex items-center -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&auto=format&fit=crop&q=80"
                  alt="SKU 1"
                  className="w-7 h-7 rounded-full object-cover border-2 border-white"
                />
                <img
                  src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=80&auto=format&fit=crop&q=80"
                  alt="SKU 2"
                  className="w-7 h-7 rounded-full object-cover border-2 border-white"
                />
                <div className="w-7 h-7 rounded-full bg-[#B91C1C] text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-white">
                  !
                </div>
              </div>
            </div>

            <button
              onClick={() => handleRestock('BATCH-4', 100, 'Batch Reorder Dispatched')}
              className="py-1.5 px-2 rounded-lg bg-[#FEE2E2] hover:bg-rose-200 text-[#991B1B] text-[10px] font-extrabold flex items-center justify-center gap-1 transition"
            >
              <RotateCcw size={11} strokeWidth={2.5} />
              <span>Batch Reorder</span>
            </button>
          </div>
        </div>

        {/* LIVE STOREFRONT PULSE */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#065F46]" />
              <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#0F172A]">
                LIVE STOREFRONT PULSE
              </span>
            </div>
            <span className="text-[10px] font-medium text-slate-500">Real-time sync</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#F8FAFC] grid grid-cols-3 divide-x divide-slate-200/70 text-center">
            <div>
              <div className="text-[15px] font-black text-[#0F172A]">84</div>
              <div className="text-[9px] font-medium text-slate-500 mt-0.5">Active Shoppers</div>
            </div>
            <div>
              <div className="text-[15px] font-black text-[#3730A3]">12</div>
              <div className="text-[9px] font-medium text-slate-500 mt-0.5">Active Carts</div>
            </div>
            <div>
              <div className="text-[15px] font-black text-[#065F46]">3.82%</div>
              <div className="text-[9px] font-medium text-slate-500 mt-0.5">Conversion Vel.</div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 text-[10px]">
            <span className="text-slate-500 font-medium flex-shrink-0">Traffic velocity</span>
            <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden flex gap-0.5">
              <div className="w-[52%] bg-[#3730A3] h-full rounded-l-full" />
              <div className="w-[26%] bg-[#065F46] h-full" />
              <div className="w-[22%] bg-slate-400 h-full rounded-r-full" />
            </div>
            <span className="text-[#3730A3] font-extrabold flex-shrink-0">+14% surge</span>
          </div>
        </div>

        {/* QUICK SWITCHBOARD */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold tracking-wider uppercase text-slate-500">
              QUICK SWITCHBOARD
            </span>
            <span className="text-[10px] font-bold text-slate-500">Haptic controls</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => onNavigate && onNavigate('ProductEditor')}
              className="p-2.5 rounded-xl bg-[#F8FAFC] hover:bg-indigo-50 flex flex-col items-center gap-1.5 transition"
            >
              <div className="w-9 h-9 rounded-full bg-[#4338CA] text-white flex items-center justify-center shadow-xs">
                <Plus size={17} strokeWidth={2.5} />
              </div>
              <span className="text-[10px] font-bold text-[#0F172A]">Add SKU</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('POSCashier')}
              className="p-2.5 rounded-xl bg-[#F8FAFC] hover:bg-indigo-50 flex flex-col items-center gap-1.5 transition"
            >
              <div className="w-9 h-9 rounded-full bg-slate-200/70 text-[#0F172A] flex items-center justify-center">
                <QrCode size={16} strokeWidth={2.2} />
              </div>
              <span className="text-[10px] font-bold text-[#0F172A]">Scan</span>
            </button>

            <button
              onClick={() => triggerToast('Promo code generator active')}
              className="p-2.5 rounded-xl bg-[#F8FAFC] hover:bg-indigo-50 flex flex-col items-center gap-1.5 transition"
            >
              <div className="w-9 h-9 rounded-full bg-slate-200/70 text-[#4338CA] flex items-center justify-center">
                <Tag size={16} strokeWidth={2.2} />
              </div>
              <span className="text-[10px] font-bold text-[#0F172A]">Promo</span>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('StaffManagement')}
              className="p-2.5 rounded-xl bg-[#F8FAFC] hover:bg-indigo-50 flex flex-col items-center gap-1.5 relative transition"
            >
              <span className="w-2 h-2 rounded-full bg-[#4338CA] absolute top-2 right-2" />
              <div className="w-9 h-9 rounded-full bg-slate-200/70 text-slate-700 flex items-center justify-center">
                <MessageSquare size={15} strokeWidth={2.2} />
              </div>
              <span className="text-[10px] font-bold text-[#0F172A]">Staff Chat</span>
            </button>
          </div>
        </div>

        {/* RECENT TRIAGE FEED */}
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Receipt size={14} className="text-[#4338CA]" strokeWidth={2.3} />
              <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#0F172A]">
                RECENT TRIAGE FEED
              </span>
            </div>
            <button
              onClick={() => onNavigate && onNavigate('OrderManagement')}
              className="flex items-center gap-0.5 text-[#4338CA] text-[10px] font-extrabold"
            >
              <span>Full Log</span>
              <ChevronRight size={12} />
            </button>
          </div>

          <div className="space-y-2">
            {[
              {
                initials: 'SL',
                avatarBg: 'bg-[#EEF2FF] text-[#4338CA]',
                customer: 'Sophia Loren',
                id: '#9842',
                items: '2 items • Polo & Chino',
                amount: '$184.00',
                status: 'Process',
                statusBg: 'bg-[#E0E7FF] text-[#3730A3]',
              },
              {
                initials: 'MV',
                avatarBg: 'bg-[#E2E8F0] text-slate-700',
                customer: 'Marcus Vance',
                id: '#9841',
                items: '1 item • Leather Jacket',
                amount: '$320.00',
                status: 'Shipped',
                statusBg: 'bg-[#DBEAFE] text-[#1D4ED8]',
              },
              {
                initials: 'ER',
                avatarBg: 'bg-[#6EE7B7] text-[#065F46]',
                customer: 'Elena Rostova',
                id: '#9840',
                items: '3 items • Summer Dresses',
                amount: '$245.50',
                status: 'Delivered',
                statusBg: 'bg-[#6EE7B7] text-[#065F46]',
              },
              {
                initials: 'DC',
                avatarBg: 'bg-[#EEF2FF] text-[#4338CA]',
                customer: 'David Chen',
                id: '#9839',
                items: '1 item • Graphic Tee',
                amount: '$45.00',
                status: 'New',
                statusBg: 'bg-[#EDE9FE] text-[#5B21B6]',
              },
            ].map((row) => (
              <div
                key={row.id}
                onClick={() => onNavigate && onNavigate('OrderManagement')}
                className="p-2.5 rounded-xl bg-[#F8FAFC] flex items-center justify-between gap-2 cursor-pointer hover:bg-indigo-50/40 transition"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-extrabold flex-shrink-0 ${row.avatarBg}`}
                  >
                    {row.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] truncate">
                      <span className="font-extrabold text-[#0F172A]">{row.customer}</span>{' '}
                      <span className="text-slate-400">• {row.id}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">{row.items}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[12px] font-extrabold text-[#0F172A]">{row.amount}</span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold ${row.statusBg}`}
                  >
                    {row.status}
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

export default AdminDashboardVarient3;
