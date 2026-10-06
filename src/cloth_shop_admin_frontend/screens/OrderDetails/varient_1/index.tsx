import React, { useState } from 'react';
import {
  ArrowLeft,
  Clock,
  MoreVertical,
  Shirt,
  CheckCircle2,
  Truck,
  Star,
  Mail,
  Phone,
  Barcode,
  Receipt,
  Lock,
  Tag,
  CreditCard,
  ClipboardList,
  Leaf,
  QrCode,
  Printer,
} from 'lucide-react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const OrderDetailsVarient1: React.FC<AdminScreenVariantProps> = ({
  primaryColor = '#3730A3',
  isDark = false,
  onNavigate,
}) => {
  const [activeStage, setActiveStage] = useState<number>(4);
  const [stationNoteInput, setStationNoteInput] = useState('');
  const [stationNotes, setStationNotes] = useState<Array<{ text: string; time: string }>>([
    { text: 'Verified size tag 32/30 for Chino (Bin D-03)', time: '10:14 AM' },
  ]);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const handleSaveNote = () => {
    if (!stationNoteInput.trim()) return;
    setStationNotes((prev) => [
      { text: stationNoteInput.trim(), time: 'Just now' },
      ...prev,
    ]);
    setStationNoteInput('');
    showToast('Station note saved');
  };

  const bgMain = isDark ? 'bg-[#090D16] text-white' : 'bg-[#F8FAFC] text-[#0F172A]';
  const cardBg = isDark ? 'bg-[#121826] border-slate-800 text-white' : 'bg-white border-slate-200/70 text-[#0F172A]';
  const subBoxBg = isDark ? 'bg-[#1A2234] border-slate-800' : 'bg-[#EEF2FF]/60 border-indigo-100/60';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-500';
  const headerBg = isDark ? 'bg-[#0B0F19]/95 border-slate-800 text-white' : 'bg-white/95 border-slate-100 text-[#0F172A]';

  const STAGES = ['Placed', 'Paid', 'Packed', 'Process', 'Dispatch', 'Deliver'];

  return (
    <div className={`flex-1 flex flex-col min-h-full select-none ${bgMain}`}>
      {/* Sticky Top Header */}
      <div className={`px-4 py-3 flex items-center justify-between border-b sticky top-0 z-30 backdrop-blur-md ${headerBg}`}>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate && onNavigate('OrderManagement')}
            className="p-1.5 -ml-1 rounded-xl hover:bg-slate-500/10 transition"
          >
            <ArrowLeft size={19} strokeWidth={2.3} />
          </button>
          <div className="w-9 h-9 rounded-xl bg-[#0F172A] flex items-center justify-center flex-shrink-0 shadow-xs border border-slate-800">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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
          <h1 className="text-[17px] font-extrabold tracking-tight">Order Details</h1>
        </div>
        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
          alt="Admin"
          className="w-9 h-9 rounded-full object-cover border-2 border-slate-200"
        />
      </div>

      {/* Synced With WMS Strip */}
      <div
        className={`px-4 py-2 flex items-center justify-between text-[11px] border-b ${
          isDark ? 'bg-[#111827] border-slate-800' : 'bg-[#EEF2FF]/75 border-indigo-100/80'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <span className="font-extrabold tracking-wide text-emerald-700 dark:text-emerald-400 uppercase text-[10px]">
            SYNCED WITH WMS
          </span>
          <span className={mutedText}>• Austin Hub #04</span>
        </div>
        <div className={`flex items-center gap-1 font-bold text-[10px] ${mutedText}`}>
          <Clock size={12} />
          <span>Updated 2m ago</span>
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

      {/* Main Content */}
      <div className="p-3.5 space-y-3.5 flex-1">
        {/* 1. Stage 4 of 6 Card */}
        <div className={`p-3.5 rounded-2xl border shadow-xs space-y-3.5 ${cardBg}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  isDark ? 'bg-slate-800 text-white' : 'bg-[#EEF2FF] text-[#0F172A]'
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="4" rx="1" />
                  <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" />
                  <path d="M10 12h4" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider ${
                      isDark ? 'bg-slate-800 text-slate-300' : 'bg-[#EEF2FF] text-[#1E293B]'
                    }`}
                  >
                    STAGE {activeStage} OF 6
                  </span>
                  <span className={`text-[11px] font-extrabold ${mutedText}`}>#ORD-9842</span>
                </div>
                <div className="text-[17px] font-extrabold tracking-tight mt-0.5">
                  {activeStage === 4
                    ? 'Processing Items'
                    : activeStage === 5
                    ? 'Dispatched to Hub'
                    : activeStage === 6
                    ? 'Delivered to Buyer'
                    : 'Order Fulfilling'}
                </div>
              </div>
            </div>
            <button
              onClick={() => showToast('Order stage options opened')}
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-slate-800 text-slate-300' : 'bg-[#EEF2FF] text-slate-700'
              }`}
            >
              <MoreVertical size={16} />
            </button>
          </div>

          {/* 6-Step Progress Bar */}
          <div className="grid grid-cols-6 gap-1.5">
            {STAGES.map((stage, idx) => {
              const stepNum = idx + 1;
              const isCompleted = stepNum <= activeStage;
              return (
                <button
                  key={stage}
                  onClick={() => setActiveStage(stepNum)}
                  className="text-left focus:outline-none"
                >
                  <div
                    className={`h-1.5 rounded-full transition-all ${
                      isCompleted ? '' : isDark ? 'bg-slate-800' : 'bg-slate-200'
                    }`}
                    style={isCompleted ? { backgroundColor: primaryColor } : undefined}
                  />
                  <div
                    className={`text-[10px] font-extrabold mt-1.5 text-center ${
                      isCompleted ? '' : mutedText
                    }`}
                    style={isCompleted ? { color: primaryColor } : undefined}
                  >
                    {stage}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Garment Manifest Card */}
        <div className={`p-3.5 rounded-2xl border shadow-xs space-y-3.5 ${cardBg}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shirt size={17} style={{ color: primaryColor }} />
              <span className="text-[15px] font-extrabold">Garment Manifest</span>
            </div>
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                isDark ? 'bg-slate-800 text-slate-300' : 'bg-[#EEF2FF] text-slate-700'
              }`}
            >
              2 Units Checked
            </span>
          </div>

          {/* Item 1: Tailored Pique Polo */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <div className="relative flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=150&auto=format&fit=crop&q=80"
                  alt="Tailored Pique Polo"
                  className="w-15 h-15 rounded-xl object-cover bg-slate-200"
                />
                <span
                  className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md text-[9px] font-black text-white shadow-xs"
                  style={{ backgroundColor: primaryColor }}
                >
                  1x
                </span>
              </div>
              <div className="min-w-0 space-y-1">
                <div className="text-[13px] font-extrabold truncate">Tailored Pique Polo</div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-extrabold ${
                      isDark ? 'bg-slate-800 text-slate-300' : 'bg-[#EEF2FF] text-slate-700'
                    }`}
                  >
                    POLO-NVY-M
                  </span>
                  <span className={`text-[11px] font-medium ${mutedText}`}>Navy Blue • Med</span>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-extrabold">
                  <CheckCircle2 size={11} /> In Stock (Bin B-14)
                </span>
              </div>
            </div>
            <span className="text-[14px] font-extrabold flex-shrink-0">$74.00</span>
          </div>

          <div className={`border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`} />

          {/* Item 2: Stretch Slim Chino */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <div className="relative flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=150&auto=format&fit=crop&q=80"
                  alt="Stretch Slim Chino"
                  className="w-15 h-15 rounded-xl object-cover bg-slate-200"
                />
                <span
                  className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md text-[9px] font-black text-white shadow-xs"
                  style={{ backgroundColor: primaryColor }}
                >
                  1x
                </span>
              </div>
              <div className="min-w-0 space-y-1">
                <div className="text-[13px] font-extrabold truncate">Stretch Slim Chino</div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-extrabold ${
                      isDark ? 'bg-slate-800 text-slate-300' : 'bg-[#EEF2FF] text-slate-700'
                    }`}
                  >
                    CHN-BGE-32
                  </span>
                  <span className={`text-[11px] font-medium ${mutedText}`}>Sand Beige • 32/30</span>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-extrabold">
                  <CheckCircle2 size={11} /> In Stock (Bin D-03)
                </span>
              </div>
            </div>
            <span className="text-[14px] font-extrabold flex-shrink-0">$110.00</span>
          </div>
        </div>

        {/* 3. Recipient & Logistics Card */}
        <div className={`p-3.5 rounded-2xl border shadow-xs space-y-3 ${cardBg}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck size={17} style={{ color: primaryColor }} />
              <span className="text-[15px] font-extrabold">Recipient &amp; Logistics</span>
            </div>
            <span
              className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider ${
                isDark ? 'bg-slate-800 text-slate-300' : 'bg-[#EEF2FF] text-[#1E293B]'
              }`}
            >
              GOLD TIER VIP
            </span>
          </div>

          {/* Buyer Profile Subbox */}
          <div className={`p-3 rounded-xl border space-y-1.5 ${subBoxBg}`}>
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-extrabold">Sarah Sterling</span>
              <span className="flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400">
                <Star size={11} /> 42 Past Orders
              </span>
            </div>
            <div className={`flex items-center gap-2 text-[11px] ${mutedText}`}>
              <Mail size={12} />
              <span>sarah.s@domain.com</span>
            </div>
            <div className={`flex items-center gap-2 text-[11px] ${mutedText}`}>
              <Phone size={12} />
              <span>+1 (555) 019-2831</span>
            </div>
          </div>

          {/* Shipping Destination Subbox */}
          <div className={`p-3 rounded-xl border space-y-2 ${subBoxBg}`}>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-extrabold uppercase tracking-wider ${mutedText}`}>
                SHIPPING DESTINATION
              </span>
              <span className="text-[11px] font-extrabold" style={{ color: primaryColor }}>
                Priority Air
              </span>
            </div>
            <div className="text-[12px] font-medium leading-snug">
              <div>742 Vista Boulevard, Suite 4B</div>
              <div>Austin, TX 78701</div>
            </div>
            <div
              className={`px-2.5 py-2 rounded-lg flex items-center justify-between ${
                isDark ? 'bg-slate-900/90' : 'bg-[#E0E7FF]/70'
              }`}
            >
              <div className="flex items-center gap-2">
                <Barcode size={15} className={mutedText} />
                <span className="text-xs font-extrabold tracking-tight">TRK-992144-US</span>
              </div>
              <button
                onClick={() => showToast('Tracking number TRK-992144-US copied')}
                className="text-[11px] font-extrabold"
                style={{ color: primaryColor }}
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* 4. Financial Ledger Card */}
        <div className={`p-3.5 rounded-2xl border shadow-xs space-y-2.5 ${cardBg}`}>
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <Receipt size={17} style={{ color: primaryColor }} />
              <span className="text-[15px] font-extrabold">Financial Ledger</span>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-extrabold">
              <Lock size={10} /> Settled
            </span>
          </div>

          <div className="space-y-2 text-[12px]">
            <div className="flex items-center justify-between">
              <span className={mutedText}>Garments Subtotal (2 items)</span>
              <span className="font-extrabold">$184.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={mutedText}>Express Courier Service</span>
              <span className="font-extrabold">$12.00</span>
            </div>
            <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Tag size={12} /> VIP Code (AUSTIN-GOLD)
              </span>
              <span className="font-extrabold">-$15.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={mutedText}>Estimated State Tax</span>
              <span className="font-extrabold">$14.40</span>
            </div>
          </div>

          <div className={`border-t pt-2.5 flex items-center justify-between ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            <span className="text-[15px] font-extrabold">Total Paid</span>
            <span className="text-[22px] font-black tracking-tight" style={{ color: primaryColor }}>
              $195.40
            </span>
          </div>

          <div
            className={`px-3 py-1.5 rounded-lg flex items-center justify-between text-[10px] ${
              isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-[#EEF2FF]/80 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold">
              <CreditCard size={12} />
              <span>Apple Pay Authorized</span>
            </div>
            <span className="font-mono font-bold">TXN-99812</span>
          </div>
        </div>

        {/* 5. Fulfillment Instructions Card */}
        <div className={`p-3.5 rounded-2xl border shadow-xs space-y-3 ${cardBg}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClipboardList size={17} style={{ color: primaryColor }} />
              <span className="text-[15px] font-extrabold">Fulfillment Instructions</span>
            </div>
            <span
              className="px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider bg-indigo-500/15"
              style={{ color: primaryColor }}
            >
              PINNED
            </span>
          </div>

          <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${subBoxBg}`}>
            <Leaf size={16} className="mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
            <div>
              <div
                className="text-[10px] font-extrabold uppercase tracking-wider"
                style={{ color: primaryColor }}
              >
                CUSTOMER PACKAGING REQUEST
              </div>
              <p className="text-[12px] font-medium mt-0.5 leading-snug">
                &quot;Customer requested eco-friendly packaging and gift ribbon.&quot;
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className={`text-[10px] font-extrabold uppercase tracking-wider ${mutedText}`}>
              APPEND STATION NOTE
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={stationNoteInput}
                onChange={(e) => setStationNoteInput(e.target.value)}
                placeholder="e.g. Inspected seams, added lavender sprig..."
                className={`flex-1 px-3 py-2 rounded-xl text-xs font-medium outline-none border ${
                  isDark
                    ? 'bg-slate-800/90 border-slate-700 text-white'
                    : 'bg-[#EEF2FF]/70 border-indigo-100 text-slate-800'
                }`}
              />
              <button
                onClick={handleSaveNote}
                className="px-3.5 py-2 rounded-xl bg-[#475569] hover:bg-[#334155] text-white text-xs font-extrabold transition"
              >
                Save
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            {stationNotes.map((note, i) => (
              <div
                key={i}
                className={`px-3 py-2 rounded-xl flex items-center justify-between text-[11px] ${
                  isDark ? 'bg-slate-800/60 text-slate-300' : 'bg-[#EEF2FF]/60 text-slate-700'
                }`}
              >
                <span className="truncate pr-2">{note.text}</span>
                <span className="text-[10px] font-extrabold flex-shrink-0">{note.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div
        className={`p-3.5 border-t flex items-center gap-2.5 sticky bottom-0 z-20 ${
          isDark ? 'bg-[#0B0F19]/95 border-slate-800' : 'bg-white/95 border-slate-200/80'
        }`}
      >
        <button
          onClick={() => onNavigate && onNavigate('POSCashier')}
          className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isDark ? 'bg-slate-800 text-white' : 'bg-[#E0E7FF] text-[#1E1B4B]'
          }`}
        >
          <QrCode size={19} />
        </button>
        <button
          onClick={() => {
            setActiveStage(5);
            showToast('Shipping label printed & order dispatched!');
          }}
          style={{ backgroundColor: primaryColor }}
          className="flex-1 py-3 rounded-xl text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition"
        >
          <Printer size={15} />
          <span>Print Label &amp; Dispatch</span>
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsVarient1;
