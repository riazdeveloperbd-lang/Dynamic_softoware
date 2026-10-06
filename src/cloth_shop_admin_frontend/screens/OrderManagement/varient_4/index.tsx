import React, { useState } from 'react';
import {
  RefreshCw,
  Bell,
  ChevronDown,
  Search,
  QrCode,
  FileText,
  Zap,
  CheckCircle2,
  Gift,
  ShieldCheck,
  Gem,
  Phone,
  MessageSquare,
  Edit2,
  Star,
  Plane,
} from 'lucide-react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const OrderManagementVarient4: React.FC<AdminScreenVariantProps> = ({
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

  return (
    <div className={`flex-1 pb-6 select-none ${bgMain}`}>
      {/* Header */}
      <div className={`px-4 py-3 flex items-center justify-between border-b sticky top-0 z-30 backdrop-blur-md ${headerBg}`}>
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center flex-shrink-0" style={{ color: primaryColor }}>
            <Gem size={19} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1 text-[10px] font-extrabold tracking-wider uppercase" style={{ color: primaryColor }}>
              <span>ATELIER CONCIERGE</span>
              <ChevronDown size={11} strokeWidth={2.5} />
            </div>
            <h1 className="text-[16px] font-extrabold tracking-tight truncate">Orders &amp; VIP Dispatch</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={() => showToast('VIP Concierge queue synced')} className="p-2 rounded-full hover:bg-slate-500/10">
            <RefreshCw size={17} />
          </button>
          <button className="p-2 rounded-full relative hover:bg-slate-500/10">
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
        <div className="mx-4 mt-2 px-3 py-2 rounded-xl text-white text-[11px] font-bold flex items-center justify-between shadow-lg" style={{ backgroundColor: primaryColor }}>
          <span>{toast}</span>
          <CheckCircle2 size={14} />
        </div>
      )}

      <div className="p-3.5 space-y-3.5">
        {/* Search VIP */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-2xl border ${cardBg}`}>
          <Search size={16} className={mutedText} />
          <input
            type="text"
            placeholder="Search VIP, Order ID, concierge note..."
            className="flex-1 bg-transparent text-xs font-medium outline-none"
          />
          <button className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center" style={{ color: primaryColor }}>
            <QrCode size={16} />
          </button>
        </div>

        {/* Tier Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="px-3 py-1.5 rounded-full text-white text-xs font-extrabold flex items-center gap-1.5 flex-shrink-0" style={{ backgroundColor: primaryColor }}>
            All Tiers <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">8</span>
          </span>
          <span className={`px-3 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5 flex-shrink-0 ${cardBg}`}>
            <Star size={12} className="text-amber-500" /> VIP Gold &amp; Platinum ($300+)
          </span>
        </div>

        {/* High-Priority Queue Banner */}
        <div className={`p-3 rounded-2xl border flex items-center justify-between ${cardBg}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: primaryColor }}>
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="text-xs font-extrabold">
                High-Priority Queue: <span style={{ color: primaryColor }}>$2,840.00</span>{' '}
                <span className={`text-[10px] font-normal ${mutedText}`}>(8 VIP Orders)</span>
              </div>
              <div className={`text-[10px] ${mutedText}`}>Average Fulfillment Speed: 12 min</div>
            </div>
          </div>
          <button
            onClick={() => showToast('Batch concierge slips printed')}
            className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-[10px] font-extrabold"
            style={{ color: primaryColor }}
          >
            Batch Slip
          </button>
        </div>

        {/* VIP Card 1: #ORD-9842 Sophia Loren */}
        <div className={`p-3.5 rounded-2xl border-2 border-amber-300/80 space-y-3 ${cardBg}`}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-black">#ORD-9842</span>
                <span className="px-2 py-0.5 rounded-lg bg-[#FEF3C7] text-[#92400E] text-[9px] font-extrabold">
                  VIP Gold
                </span>
                <span className={`text-[10px] ${mutedText}`}>4 mins ago</span>
              </div>
              <div className="text-xs font-extrabold mt-1">
                Sophia Loren <span className={`font-normal ${mutedText}`}>• $5,420 LTV • 42 Orders</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => showToast('Calling VIP Sophia Loren...')} className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center" style={{ color: primaryColor }}>
                <Phone size={13} />
              </button>
              <button onClick={() => showToast('Concierge chat opened')} className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center" style={{ color: primaryColor }}>
                <MessageSquare size={13} />
              </button>
              <button className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center" style={{ color: primaryColor }}>
                <Edit2 size={13} />
              </button>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-indigo-500/5 border border-indigo-500/20 space-y-1">
            <div className="text-[10px] font-extrabold uppercase flex items-center gap-1.5" style={{ color: primaryColor }}>
              <Gift size={12} /> CLIENT PACKAGING PREFERENCE
            </div>
            <p className="text-[11px] italic font-medium">
              &ldquo;Special Note: Eco-packaging + lavender tissue wrap requested&rdquo;
            </p>
          </div>

          <div className={`p-2.5 rounded-xl border space-y-2 ${subBoxBg}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src="https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=100&auto=format&fit=crop&q=80" alt="Polo" className="w-9 h-9 rounded-lg object-cover" />
                <div>
                  <div className="text-xs font-bold">Tailored Pique Polo</div>
                  <div className={`text-[10px] ${mutedText}`}>Navy • M • Made in Italy</div>
                </div>
              </div>
              <span className="text-xs font-extrabold">×1</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-200/40">
              <div className="flex items-center gap-2.5">
                <img src="https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=100&auto=format&fit=crop&q=80" alt="Chino" className="w-9 h-9 rounded-lg object-cover" />
                <div>
                  <div className="text-xs font-bold">Stretch Slim Chino</div>
                  <div className={`text-[10px] ${mutedText}`}>Beige • 32/30 • Custom Hem</div>
                </div>
              </div>
              <span className="text-xs font-extrabold">×1</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span className={mutedText}>Apple Pay Concierge</span>
              <span className="px-1.5 py-0.5 rounded bg-[#6EE7B7] text-[#065F46] text-[9px] font-extrabold">PAID</span>
            </div>
            <div>
              <span className={mutedText}>Total: </span>
              <span className="text-[16px] font-black">$195.40</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => showToast('Concierge slip printed')}
              className={`py-2 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1.5 ${
                isDark ? 'bg-slate-800 text-slate-200' : 'bg-[#EEF2FF] text-slate-800'
              }`}
            >
              <FileText size={13} /> Concierge Slip
            </button>
            <button
              onClick={() => showToast('VIP Priority Dispatch initiated!')}
              style={{ backgroundColor: primaryColor }}
              className="py-2 rounded-xl text-[11px] font-extrabold text-white flex items-center justify-center gap-1.5"
            >
              <Zap size={13} /> Priority Dispatch
            </button>
          </div>
        </div>

        {/* VIP Card 2: #ORD-9841 Marcus Vance */}
        <div className={`p-3.5 rounded-2xl border space-y-3 ${cardBg}`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-black">#ORD-9841</span>
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 text-[9px] font-extrabold">VIP Silver</span>
              </div>
              <div className="text-xs font-extrabold mt-0.5">
                Marcus Vance <span className={`font-normal ${mutedText}`}>• $3,180 LTV</span>
              </div>
            </div>
            <span className="text-[16px] font-black">$320.00</span>
          </div>

          <div className={`px-3 py-1.5 rounded-xl flex items-center justify-between text-[11px] ${subBoxBg}`}>
            <span className="font-bold flex items-center gap-1.5">
              <Plane size={13} style={{ color: primaryColor }} /> FedEx Priority Overnight
            </span>
            <span className={`font-mono text-[10px] ${mutedText}`}>#TRK-992144</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => showToast('Certificate of authenticity verified')}
              className={`py-2 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1.5 ${
                isDark ? 'bg-slate-800 text-slate-200' : 'bg-[#EEF2FF] text-slate-800'
              }`}
            >
              <CheckCircle2 size={13} /> Track &amp; Authenticate
            </button>
            <button
              onClick={() => showToast('Direct VIP message sent to Marcus Vance')}
              className="py-2 rounded-xl bg-indigo-500/15 text-[11px] font-extrabold flex items-center justify-center gap-1.5"
              style={{ color: primaryColor }}
            >
              <MessageSquare size={13} /> Message Client
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagementVarient4;
