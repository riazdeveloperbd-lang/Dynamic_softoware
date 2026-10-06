import React, { useState } from 'react';
import {
  Printer,
  Truck,
  Zap,
  CheckCircle2,
  Warehouse,
  ScanLine,
  ShieldCheck,
} from 'lucide-react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const OrderManagementVarient3: React.FC<AdminScreenVariantProps> = ({
  primaryColor = '#3730A3',
  isDark = false,
  onNavigate,
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

  return (
    <div className={`flex-1 pb-6 select-none ${bgMain}`}>
      {/* Header */}
      <div className={`px-4 py-3 flex items-center justify-between border-b sticky top-0 z-30 backdrop-blur-md ${headerBg}`}>
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-xs" style={{ backgroundColor: primaryColor }}>
            <Warehouse size={19} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[9px] font-extrabold tracking-wider uppercase">
              <span style={{ color: primaryColor }}>LOGISTICS TERMINAL</span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-600">● LIVE</span>
            </div>
            <h1 className="text-[15px] font-extrabold tracking-tight truncate">Warehouse Dispatch • Zo...</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={() => onNavigate && onNavigate('POSCashier')} className="p-2 rounded-xl border border-slate-200/80" style={{ color: primaryColor }}>
            <ScanLine size={16} />
          </button>
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
            alt="Admin"
            className="w-9 h-9 rounded-full object-cover border border-slate-200"
          />
        </div>
      </div>

      {toast && (
        <div className="mx-4 mt-2 px-3 py-2 rounded-xl text-white text-[11px] font-bold flex items-center justify-between shadow-lg" style={{ backgroundColor: primaryColor }}>
          <span>{toast}</span>
          <CheckCircle2 size={14} />
        </div>
      )}

      <div className="p-3.5 space-y-3">
        {/* Selected Banner */}
        <div className="p-3.5 rounded-2xl text-white flex items-center justify-between shadow-sm" style={{ backgroundColor: primaryColor }}>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 size={18} />
            <div>
              <div className="text-xs font-extrabold">4 Selected</div>
              <div className="text-[11px] text-white/80 font-mono">Total $744.50 • 7 Items</div>
            </div>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-white/15 text-[10px] font-mono font-extrabold">
            BAY E-4 READY
          </div>
        </div>

        {/* 3 Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => showToast('Printing 4 thermal labels...')}
            style={{ backgroundColor: primaryColor }}
            className="py-2.5 px-2 rounded-xl text-white text-[10px] font-extrabold flex items-center justify-center gap-1"
          >
            <Printer size={13} /> Print Labels (4)
          </button>
          <button
            onClick={() => showToast('Bulk scan-out mode activated')}
            className={`py-2.5 px-2 rounded-xl border text-[10px] font-extrabold flex items-center justify-center gap-1 ${cardBg}`}
          >
            <ScanLine size={13} style={{ color: primaryColor }} /> Bulk Scan-Out
          </button>
          <button
            onClick={() => showToast('Assigned to Bay E-4')}
            className={`py-2.5 px-2 rounded-xl border text-[10px] font-extrabold flex items-center justify-center gap-1 ${cardBg}`}
          >
            <Truck size={13} /> Assign to Bay
          </button>
        </div>

        {/* Zone Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="px-3 py-1 rounded-lg bg-[#0F172A] text-white text-[11px] font-extrabold flex-shrink-0">
            All 142
          </span>
          <span className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1.5 flex-shrink-0 ${cardBg}`}>
            <span className="w-2 h-2 rounded-full bg-sky-500" /> Zone A: Apparel 64
          </span>
          <span className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1.5 flex-shrink-0 ${cardBg}`}>
            <span className="w-2 h-2 rounded-full bg-indigo-500" /> Zone B: Outerwear 38
          </span>
        </div>

        {/* Warehouse Order Card 1: #ORD-9842 */}
        <div className={`p-3.5 rounded-2xl border space-y-2.5 ${cardBg}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-indigo-600" />
              <span className="text-sm font-black">#ORD-9842</span>
              <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-[10px] font-extrabold" style={{ color: primaryColor }}>SL</span>
              <span className={`text-xs ${mutedText}`}>Sophia Lor... • 2 items</span>
            </div>
            <span className="px-2 py-0.5 rounded border border-amber-400/60 bg-amber-500/10 text-amber-600 text-[9px] font-extrabold">
              ● PROCESSING
            </span>
          </div>

          <div className={`p-2 rounded-xl flex items-center justify-between text-[10px] font-mono ${subBoxBg}`}>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded bg-[#FEF3C7] text-[#92400E] font-extrabold">BIN B-14</span>
              <span className="px-2 py-0.5 rounded bg-[#FEF3C7] text-[#92400E] font-extrabold">BIN D-03</span>
              <span className={mutedText}>Trolley #T-08</span>
            </div>
            <span className="font-bold" style={{ color: primaryColor }}>USPS 2-Day</span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className={`p-2 rounded-lg border flex items-center justify-between ${subBoxBg}`}>
              <div>
                <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 font-mono text-[10px] font-bold mr-2" style={{ color: primaryColor }}>1x</span>
                <span className="font-bold">Regular Fit Polo</span> <span className={`text-[10px] ${mutedText}`}>Navy / M</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-800 font-mono text-[10px] font-bold">B-14</span>
                <CheckCircle2 size={14} className="text-emerald-600" />
              </div>
            </div>
            <div className={`p-2 rounded-lg border flex items-center justify-between ${subBoxBg}`}>
              <div>
                <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 font-mono text-[10px] font-bold mr-2" style={{ color: primaryColor }}>1x</span>
                <span className="font-bold">Stretch Chino Pants</span> <span className={`text-[10px] ${mutedText}`}>Beige / 32</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-800 font-mono text-[10px] font-bold">D-03</span>
                <span className="w-3.5 h-3.5 rounded-full border border-slate-400" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#6EE7B7] text-[#065F46] font-mono text-[10px] font-extrabold">PAID $184.00</span>
              <span className={`text-[10px] font-mono ${mutedText}`}>SLA: 1h 22m left</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => showToast('Bins B-14 & D-03 verified')}
                className={`px-2.5 py-1.5 rounded-lg text-[10px] font-extrabold ${isDark ? 'bg-slate-800 text-white' : 'bg-[#EEF2FF] text-slate-800'}`}
              >
                Verify
              </button>
              <button
                onClick={() => showToast('#ORD-9842 Dispatched to Bay E-4')}
                style={{ backgroundColor: primaryColor }}
                className="px-3 py-1.5 rounded-lg text-white text-[10px] font-extrabold flex items-center gap-1"
              >
                <Zap size={11} /> Dispatch
              </button>
            </div>
          </div>
        </div>

        {/* Warehouse Order Card 2: #ORD-9841 */}
        <div className={`p-3.5 rounded-2xl border space-y-2.5 ${cardBg}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-indigo-600" />
              <span className="text-sm font-black">#ORD-9841</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 text-[10px] font-extrabold">MV</span>
              <span className={`text-xs ${mutedText}`}>Marcus Vance • 1 item</span>
            </div>
            <span className="px-2 py-0.5 rounded border border-sky-400/50 bg-sky-500/10 text-sky-600 text-[9px] font-extrabold">
              ● SHIPPED
            </span>
          </div>

          <div className={`p-2 rounded-xl flex items-center justify-between text-[10px] font-mono ${subBoxBg}`}>
            <span className="px-2 py-0.5 rounded bg-indigo-500/15 font-extrabold" style={{ color: primaryColor }}>
              BIN K-09 (High-Value)
            </span>
            <span className="font-bold text-sky-700">FedEx #TRK-992144</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="px-2 py-0.5 rounded bg-[#6EE7B7] text-[#065F46] font-mono text-[10px] font-extrabold">PAID $320.00</span>
            <div className="flex items-center gap-1.5">
              <button className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold ${isDark ? 'bg-slate-800 text-white' : 'bg-[#EEF2FF] text-slate-800'}`}>
                Slip
              </button>
              <button className="px-2.5 py-1 rounded-lg bg-indigo-500/15 text-[10px] font-extrabold" style={{ color: primaryColor }}>
                Track
              </button>
            </div>
          </div>
        </div>

        {/* Bottom SLA Bar */}
        <div className={`p-3 rounded-2xl border flex items-center justify-between ${cardBg}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center">
              <ShieldCheck size={16} />
            </div>
            <div>
              <div className="text-xs font-extrabold">
                Today&apos;s Fulfillment SLA: 98.4%{' '}
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 text-[9px]">ON TARGET</span>
              </div>
              <div className={`text-[10px] ${mutedText}`}>128/142 dispatched on-time</div>
            </div>
          </div>
          <span className="text-sm font-black font-mono" style={{ color: primaryColor }}>128 / 142</span>
        </div>
      </div>
    </div>
  );
};

export default OrderManagementVarient3;
