import React, { useState } from 'react';
import {
  RefreshCw,
  Bell,
  ChevronDown,
  Search,
  QrCode,
  Printer,
  Truck,
  FileText,
  CheckCircle2,
  SlidersHorizontal,
  Columns,
  Flame,
  Clock,
  ArrowLeftRight,
  Gift,
} from 'lucide-react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const OrderManagementVarient2: React.FC<AdminScreenVariantProps> = ({
  primaryColor = '#3730A3',
  isDark = false,
}) => {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const bgMain = isDark ? 'bg-[#090D16] text-white' : 'bg-[#F8FAFC] text-[#0F172A]';
  const cardBg = isDark ? 'bg-[#121826] border-slate-800 text-white' : 'bg-white border-slate-200/80 text-[#0F172A]';
  const subBoxBg = isDark ? 'bg-[#1A2234] border-slate-800' : 'bg-[#F8FAFC] border-slate-100';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-500';
  const headerBg = isDark ? 'bg-[#0B0F19]/95 border-slate-800 text-white' : 'bg-white/95 border-slate-100 text-[#0F172A]';

  const renderLogo = () => (
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

  return (
    <div className={`flex-1 pb-6 select-none ${bgMain}`}>
      {/* Header */}
      <div className={`px-4 py-3 flex items-center justify-between border-b sticky top-0 z-30 backdrop-blur-md ${headerBg}`}>
        <div className="flex items-center gap-2.5 min-w-0">
          {renderLogo()}
          <div className="min-w-0">
            <div className="flex items-center gap-1 text-[10px] font-extrabold tracking-wider uppercase" style={{ color: primaryColor }}>
              <span>STOREFRONT</span>
              <ChevronDown size={11} strokeWidth={2.5} />
            </div>
            <h1 className="text-[16px] font-extrabold tracking-tight truncate">Order Fulfillment ...</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={() => showToast('Synced SLA telemetry')} className="p-1.5 rounded-full hover:bg-slate-500/10">
            <RefreshCw size={16} />
          </button>
          <button className="p-1.5 rounded-full hover:bg-slate-500/10">
            <Search size={16} />
          </button>
          <button className="p-1.5 rounded-full relative hover:bg-slate-500/10">
            <Bell size={17} />
            <span className="w-2 h-2 rounded-full bg-rose-600 absolute top-1 right-1" />
          </button>
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
            alt="Admin"
            className="w-8 h-8 rounded-full object-cover border border-slate-200"
          />
        </div>
      </div>

      {toast && (
        <div className="mx-4 mt-2 px-3 py-2 rounded-xl text-white text-[11px] font-bold flex items-center justify-between shadow-lg" style={{ backgroundColor: primaryColor }}>
          <span>{toast}</span>
          <CheckCircle2 size={14} />
        </div>
      )}

      <div className="p-3.5 space-y-3.5">
        {/* Fulfillment Stages Top Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider">
            <span className={mutedText}>FULFILLMENT STAGES</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className={`font-medium normal-case ${mutedText}`}>Real-time SLA</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button className={`px-2 py-1 rounded-lg text-[10px] font-extrabold flex items-center gap-1 ${isDark ? 'bg-slate-800 text-white' : 'bg-[#EEF2FF] text-slate-800'}`}>
              <Columns size={11} /> Kanban
            </button>
            <button className="px-2 py-1 rounded-lg bg-indigo-500/15 text-[10px] font-extrabold flex items-center gap-1" style={{ color: primaryColor }}>
              <SlidersHorizontal size={11} /> Filter
            </button>
          </div>
        </div>

        {/* 3 Stage Cards Strip */}
        <div className="grid grid-cols-3 gap-2">
          <div className={`p-2.5 rounded-2xl border ${cardBg}`}>
            <div className="flex items-center justify-between text-[10px] font-bold">
              <span className="truncate">Incoming / New</span>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
            </div>
            <div className="flex items-baseline justify-between mt-1.5">
              <span className="text-[18px] font-black">18</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 text-[8px] font-extrabold">98% SLA</span>
            </div>
          </div>

          <div className="p-2.5 rounded-2xl text-white shadow-sm" style={{ backgroundColor: primaryColor }}>
            <div className="flex items-center justify-between text-[10px] font-bold">
              <span className="truncate">Picking &amp; Packing</span>
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            </div>
            <div className="flex items-baseline justify-between mt-1.5">
              <span className="text-[18px] font-black">24</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 text-[8px] font-extrabold">4 At Risk</span>
            </div>
          </div>

          <div className={`p-2.5 rounded-2xl border ${cardBg}`}>
            <div className="text-[10px] font-bold truncate">Awaiting Courier</div>
            <div className="text-[18px] font-black mt-1.5">46</div>
          </div>
        </div>

        {/* Stage Subheader & Batch Print */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-extrabold leading-tight">
              Stage: Picking &amp;<br />Packing
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-white text-[10px] font-extrabold" style={{ backgroundColor: primaryColor }}>
              24 Orders
            </span>
          </div>
          <div className="text-right text-[10px]">
            <span className={mutedText}>Avg. Cycle: </span>
            <strong className="font-extrabold">14 mins</strong>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="px-2.5 py-1 rounded-full bg-indigo-500/15 text-[10px] font-extrabold flex-shrink-0" style={{ color: primaryColor }}>
              All Active (24)
            </span>
            <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold flex items-center gap-1 flex-shrink-0 ${cardBg}`}>
              <Flame size={11} className="text-amber-500" /> Rush SLA (4)
            </span>
          </div>
          <button
            onClick={() => showToast('Batch printing 24 pick slips...')}
            style={{ backgroundColor: primaryColor }}
            className="px-3 py-1.5 rounded-xl text-white text-[10px] font-extrabold flex items-center gap-1.5 flex-shrink-0 shadow-xs"
          >
            <Printer size={12} /> Batch Print (24)
          </button>
        </div>

        {/* Card 1: #ORD-9842 Priority Rush */}
        <div className={`p-3.5 rounded-2xl border-2 border-amber-300/80 space-y-3 ${cardBg}`}>
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2.5">
              <input type="checkbox" className="w-4 h-4 mt-1 rounded" />
              <div>
                <div className="text-[15px] font-black">#ORD-9842</div>
                <div className="text-xs font-extrabold mt-0.5">Sophia Loren</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-md bg-[#FEF3C7] text-[#92400E] text-[9px] font-extrabold">
                VIP Gold
              </span>
              <span className="px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-600 text-[9px] font-extrabold flex items-center gap-1">
                <Flame size={10} /> PRIORITY RUSH
              </span>
            </div>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-[#FEF3C7]/60 text-[#92400E] flex items-center justify-between text-[10px] font-extrabold">
            <span className="flex items-center gap-1">
              <Clock size={12} /> SLA: 22m remaining
            </span>
            <span className="text-slate-700 font-semibold">Aisle 3 • Bin A-08</span>
          </div>

          <div className={`p-2.5 rounded-xl border space-y-2 ${subBoxBg}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src="https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=100&auto=format&fit=crop&q=80" alt="Polo" className="w-9 h-9 rounded-lg object-cover" />
                <div>
                  <div className="text-xs font-bold">Regular Fit Polo</div>
                  <div className={`text-[10px] ${mutedText}`}>Navy • Size M • SKU-POLO-NV-M</div>
                </div>
              </div>
              <span className="text-xs font-extrabold">×1</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-200/40">
              <div className="flex items-center gap-2.5">
                <img src="https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=100&auto=format&fit=crop&q=80" alt="Chino" className="w-9 h-9 rounded-lg object-cover" />
                <div>
                  <div className="text-xs font-bold">Stretch Chino</div>
                  <div className={`text-[10px] ${mutedText}`}>Beige • Size 32 • SKU-CHN-BG-32</div>
                </div>
              </div>
              <span className="text-xs font-extrabold">×1</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span className={mutedText}>Express Checkout</span>
              <span className="px-1.5 py-0.5 rounded bg-[#6EE7B7] text-[#065F46] text-[9px] font-extrabold">PAID</span>
            </div>
            <div>
              <span className={mutedText}>Total: </span>
              <span className="text-[16px] font-black">$184.00</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => showToast('Bin reassigned to Zone A-02')}
              className={`py-2 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1.5 ${
                isDark ? 'bg-slate-800 text-slate-200' : 'bg-[#EEF2FF] text-slate-800'
              }`}
            >
              <ArrowLeftRight size={13} /> Reassign Bin
            </button>
            <button
              onClick={() => showToast('#ORD-9842 Marked Picked & Slip Printed!')}
              style={{ backgroundColor: primaryColor }}
              className="py-2 rounded-xl text-[11px] font-extrabold text-white flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 size={13} /> Mark Picked &amp; Slip
            </button>
          </div>
        </div>

        {/* Card 2: #ORD-9841 Ready for Courier */}
        <div className={`p-3.5 rounded-2xl border space-y-3 ${cardBg}`}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-[15px] font-black">#ORD-9841</div>
              <div className="text-xs font-extrabold mt-0.5">Marcus Vance</div>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-sky-500/15 text-sky-600 text-[9px] font-extrabold">
              ● READY FOR COURIER
            </span>
          </div>

          <div className={`p-2.5 rounded-xl border flex items-center justify-between ${subBoxBg}`}>
            <div className="flex items-center gap-2">
              <Truck size={14} style={{ color: primaryColor }} />
              <div>
                <div className="text-xs font-bold">FedEx Express Air</div>
                <div className={`text-[10px] font-mono ${mutedText}`}>#TRK-992144-FDX</div>
              </div>
            </div>
            <span className="px-2 py-1 rounded bg-white border border-slate-200 font-mono text-[10px] text-slate-800 tracking-widest">
              |||| | ||||| | ||
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => showToast('Courier manifest opened')}
              className={`py-2 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1.5 ${
                isDark ? 'bg-slate-800 text-slate-200' : 'bg-[#EEF2FF] text-slate-800'
              }`}
            >
              <FileText size={13} /> Courier Manifest
            </button>
            <button
              onClick={() => showToast('Scanning parcel for courier handover...')}
              style={{ backgroundColor: primaryColor }}
              className="py-2 rounded-xl text-[11px] font-extrabold text-white flex items-center justify-center gap-1.5"
            >
              <QrCode size={13} /> Scan Handover
            </button>
          </div>
        </div>

        {/* Card 3: #ORD-9835 Gift Box + Ribbon Request */}
        <div className={`p-3.5 rounded-2xl border space-y-3 ${cardBg}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-black">#ORD-9835</span>
                <span className="px-2 py-0.5 rounded bg-[#FEF3C7] text-[#92400E] text-[9px] font-extrabold">VIP Gold</span>
              </div>
              <div className="text-xs font-extrabold mt-0.5">Elena Rostova</div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 text-[9px] font-extrabold">
              ● IN PACKING
            </span>
          </div>

          <div className="px-3 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-between text-[10px] font-extrabold text-purple-700">
            <span className="flex items-center gap-1.5">
              <Gift size={13} /> Gift Box + Ribbon Request
            </span>
            <span className="px-2 py-0.5 rounded bg-white/80 text-purple-800">Add Card Note</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => showToast('Gift card printed')}
              className={`py-2 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1.5 ${
                isDark ? 'bg-slate-800 text-slate-200' : 'bg-[#EEF2FF] text-slate-800'
              }`}
            >
              <Gift size={13} /> Print Gift Card
            </button>
            <button
              onClick={() => showToast('Box sealed & marked ready!')}
              style={{ backgroundColor: primaryColor }}
              className="py-2 rounded-xl text-[11px] font-extrabold text-white flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 size={13} /> Finish &amp; Seal Box
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagementVarient2;
