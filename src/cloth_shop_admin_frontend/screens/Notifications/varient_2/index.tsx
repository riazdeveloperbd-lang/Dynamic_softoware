import React, { useState } from 'react';
import {
  ArrowLeft,
  Zap,
  AlertTriangle,
  Truck,
  CheckCircle2,
  Printer,
  PackagePlus,
  ScanBarcode,
} from 'lucide-react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const NotificationsVarient2: React.FC<AdminScreenVariantProps> = ({
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
  const cardBg = isDark
    ? 'bg-[#121826] border-slate-800 text-white'
    : 'bg-white border-slate-200/70 text-[#0F172A]';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-500';
  const headerBg = isDark
    ? 'bg-[#0B0F19]/95 border-slate-800 text-white'
    : 'bg-white/95 border-slate-100 text-[#0F172A]';

  return (
    <div className={`flex-1 pb-6 select-none ${bgMain}`}>
      <div
        className={`px-4 py-3 flex items-center justify-between border-b sticky top-0 z-30 backdrop-blur-md ${headerBg}`}
      >
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate && onNavigate('AdminDashboard')}
            className="p-1.5 -ml-1 rounded-xl hover:bg-slate-500/10"
          >
            <ArrowLeft size={19} strokeWidth={2.3} />
          </button>
          <div>
            <span
              className="text-[10px] font-extrabold uppercase tracking-wider"
              style={{ color: primaryColor }}
            >
              V2 • SLA &amp; STOCK TRIAGE
            </span>
            <h1 className="text-[16px] font-extrabold tracking-tight">Urgent Action Queue</h1>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-600 text-[10px] font-extrabold">
          3 Critical
        </span>
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

      <div className="p-3.5 space-y-3">
        <div className={`p-3.5 rounded-2xl border-l-4 border-l-rose-600 border shadow-xs space-y-2.5 ${cardBg}`}>
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-600 text-[10px] font-extrabold flex items-center gap-1">
              <AlertTriangle size={11} /> STOCKOUT ALERT
            </span>
            <span className={`text-[10px] font-bold ${mutedText}`}>Bin A-02 • 4m ago</span>
          </div>
          <div className="text-sm font-extrabold">Cashmere Ribbed Beanie (SKU-8841)</div>
          <p className={`text-xs ${mutedText}`}>
            0 units remaining. 4 customer orders held in Stage 3 packing queue.
          </p>
          <button
            onClick={() => showToast('Emergency PO (+50 units) dispatched to mill')}
            style={{ backgroundColor: primaryColor }}
            className="w-full py-2 rounded-xl text-white text-xs font-extrabold flex items-center justify-center gap-1.5"
          >
            <PackagePlus size={14} />
            <span>Approve +50 Express Restock PO</span>
          </button>
        </div>

        <div className={`p-3.5 rounded-2xl border-l-4 border shadow-xs space-y-2.5 ${cardBg}`} style={{ borderLeftColor: primaryColor }}>
          <div className="flex items-center justify-between">
            <span
              className="px-2 py-0.5 rounded bg-indigo-500/15 text-[10px] font-extrabold flex items-center gap-1"
              style={{ color: primaryColor }}
            >
              <Truck size={11} /> CARRIER CUT-OFF IN 22M
            </span>
            <span className={`text-[10px] font-bold ${mutedText}`}>FedEx Priority Air</span>
          </div>
          <div className="text-sm font-extrabold">Batch #402 Ready for Manifest</div>
          <p className={`text-xs ${mutedText}`}>
            6 packed garment parcels waiting at Austin Hub Bay #02.
          </p>
          <button
            onClick={() => onNavigate && onNavigate('OrderDetails')}
            className="w-full py-2 rounded-xl bg-emerald-600 text-white text-xs font-extrabold flex items-center justify-center gap-1.5"
          >
            <Printer size={14} />
            <span>Print 6 Labels &amp; Handover</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsVarient2;
