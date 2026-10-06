import React, { useState } from 'react';
import {
  RefreshCw,
  Bell,
  ChevronDown,
  Search,
  QrCode,
  Printer,
  Truck,
  Eye,
  FileText,
  Zap,
  ExternalLink,
  Target,
  CheckCircle2,
  Lock,
  X,
  Gauge,
  Smartphone,
  CreditCard,
  ChevronRight,
  Award,
} from 'lucide-react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const OrderManagementVarient1: React.FC<AdminScreenVariantProps> = ({
  primaryColor = '#3730A3',
  isDark = false,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilterV1, setActiveFilterV1] = useState<'All' | 'New' | 'Processing' | 'Shipped'>('All');
  const [selectedOrders, setSelectedOrders] = useState<string[]>(['#ORD-9842', '#ORD-9841', '#ORD-9840', '#ORD-9839']);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const toggleOrderSelect = (id: string) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedOrders.length === 4) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(['#ORD-9842', '#ORD-9841', '#ORD-9840', '#ORD-9839']);
    }
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
            <h1 className="text-[16px] font-extrabold tracking-tight truncate">VogueOps Global ...</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={() => showToast('Orders refreshed')} className="p-2 rounded-full hover:bg-slate-500/10">
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
        <div className="mx-4 mt-2 px-3 py-2 rounded-xl text-white text-[11px] font-bold flex items-center justify-between shadow-lg" style={{ backgroundColor: primaryColor }}>
          <span>{toast}</span>
          <CheckCircle2 size={14} />
        </div>
      )}

      <div className="p-3.5 space-y-3.5">
        {/* Search Bar */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-2xl border ${cardBg}`}>
          <Search size={16} className={mutedText} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID, customer, SKU..."
            className="flex-1 bg-transparent text-xs font-medium outline-none"
          />
          <button
            onClick={() => onNavigate && onNavigate('POSCashier')}
            className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center"
            style={{ color: primaryColor }}
          >
            <QrCode size={16} />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'All', count: 142 },
            { id: 'New', count: 18 },
            { id: 'Processing', count: 24 },
            { id: 'Shipped', count: 46 },
          ].map((tab) => {
            const active = activeFilterV1 === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilterV1(tab.id as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 flex-shrink-0 transition ${
                  active ? 'text-white shadow-xs' : isDark ? 'bg-slate-800 text-slate-300' : 'bg-[#EEF2FF]/70 text-slate-700'
                }`}
                style={active ? { backgroundColor: primaryColor } : undefined}
              >
                <span>{tab.id}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    active ? 'bg-white/20 text-white' : 'bg-indigo-500/15'
                  }`}
                  style={!active ? { color: primaryColor } : undefined}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Select All & Batch Actions Row */}
        <div className="flex items-center justify-between pt-1">
          <label onClick={toggleSelectAll} className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
            <input
              type="checkbox"
              checked={selectedOrders.length === 4}
              onChange={() => {}}
              className="w-4 h-4 rounded accent-indigo-600"
            />
            <span className={mutedText}>Select All ({selectedOrders.length})</span>
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast(`Printing ${selectedOrders.length} shipping labels...`)}
              className="px-2.5 py-1.5 rounded-xl bg-indigo-500/10 text-[11px] font-extrabold flex items-center gap-1.5"
              style={{ color: primaryColor }}
            >
              <Printer size={13} />
              <span>Print Labels ({selectedOrders.length})</span>
            </button>
            <button
              onClick={() => showToast('Batch shipment manifest created')}
              className={`px-2.5 py-1.5 rounded-xl text-[11px] font-extrabold flex items-center gap-1.5 ${
                isDark ? 'bg-slate-800 text-white' : 'bg-[#EEF2FF] text-slate-800'
              }`}
            >
              <Truck size={13} />
              <span>Ship</span>
            </button>
          </div>
        </div>

        {/* CARD 1: #ORD-9842 Sophia Loren */}
        <div className={`p-3.5 rounded-2xl border shadow-xs space-y-3 ${cardBg}`}>
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                checked={selectedOrders.includes('#ORD-9842')}
                onChange={() => toggleOrderSelect('#ORD-9842')}
                className="w-4 h-4 mt-1 rounded accent-indigo-600"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-black">#ORD-9842</span>
                  <span className={`text-[10px] font-semibold ${mutedText}`}>4 mins ago</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-extrabold">Sophia Loren</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#FEF3C7] text-[#92400E] text-[9px] font-extrabold flex items-center gap-1">
                    <Award size={10} /> VIP Gold
                  </span>
                  <span className={`text-[10px] ${mutedText}`}>• 14 orders</span>
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#FEF3C7]/70 text-[#B45309] text-[9px] font-extrabold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" /> PROCESSING
            </span>
          </div>

          <div className={`p-2.5 rounded-xl border space-y-2 ${subBoxBg}`}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src="https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=100&auto=format&fit=crop&q=80"
                  alt="Polo"
                  className="w-10 h-10 rounded-lg object-cover bg-slate-200 flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">Regular Fit Polo</div>
                  <div className={`text-[10px] truncate ${mutedText}`}>Navy • M • SKU-POLO-NV-M</div>
                </div>
              </div>
              <span className="text-xs font-extrabold">×1</span>
            </div>
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200/40">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src="https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=100&auto=format&fit=crop&q=80"
                  alt="Chino"
                  className="w-10 h-10 rounded-lg object-cover bg-slate-200 flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">Stretch Chino</div>
                  <div className={`text-[10px] truncate ${mutedText}`}>Beige • 32 • SKU-CHN-BG-32</div>
                </div>
              </div>
              <span className="text-xs font-extrabold">×1</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <Smartphone size={14} className={mutedText} />
              <span className={mutedText}>Apple Pay</span>
              <span className="px-1.5 py-0.5 rounded bg-[#6EE7B7] text-[#065F46] text-[9px] font-extrabold">PAID</span>
            </div>
            <div>
              <span className={`text-xs ${mutedText}`}>Total: </span>
              <span className="text-[16px] font-black">$184.00</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onNavigate ? onNavigate('OrderDetails') : showToast('Viewing #ORD-9842 details')}
              className={`py-2 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1 ${
                isDark ? 'bg-slate-800 text-slate-200' : 'bg-[#EEF2FF] text-slate-800'
              }`}
            >
              <Eye size={13} /> Details
            </button>
            <button
              onClick={() => showToast('Packing slip generated')}
              className={`py-2 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1 ${
                isDark ? 'bg-slate-800 text-slate-200' : 'bg-[#EEF2FF] text-slate-800'
              }`}
            >
              <FileText size={13} /> Slip
            </button>
            <button
              onClick={() => showToast('Order #ORD-9842 Quick Shipped!')}
              style={{ backgroundColor: primaryColor }}
              className="py-2 rounded-xl text-[11px] font-extrabold text-white flex items-center justify-center gap-1 shadow-xs"
            >
              <Zap size={13} /> Quick Ship
            </button>
          </div>
        </div>

        {/* CARD 2: #ORD-9841 Marcus Vance */}
        <div className={`p-3.5 rounded-2xl border shadow-xs space-y-3 ${cardBg}`}>
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                checked={selectedOrders.includes('#ORD-9841')}
                onChange={() => toggleOrderSelect('#ORD-9841')}
                className="w-4 h-4 mt-1 rounded accent-indigo-600"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-black">#ORD-9841</span>
                  <span className={`text-[10px] font-semibold ${mutedText}`}>18 mins ago</span>
                </div>
                <div className="text-xs font-extrabold mt-0.5">
                  Marcus Vance <span className={`font-normal ${mutedText}`}>• Standard Delivery</span>
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-600 text-[9px] font-extrabold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" /> SHIPPED
            </span>
          </div>

          <div className={`px-3 py-1.5 rounded-xl flex items-center justify-between text-[11px] ${subBoxBg}`}>
            <div className="flex items-center gap-2 font-bold">
              <Truck size={13} style={{ color: primaryColor }} />
              <span>FedEx Express</span>
            </div>
            <span className={`font-mono text-[10px] ${mutedText}`}>#TRK-992144</span>
          </div>

          <div className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 ${subBoxBg}`}>
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&auto=format&fit=crop&q=80"
                alt="Leather Jacket"
                className="w-10 h-10 rounded-lg object-cover bg-slate-200 flex-shrink-0"
              />
              <div className="min-w-0">
                <div className="text-xs font-bold truncate">Italian Nappa Leather Biker Jacket</div>
                <div className={`text-[10px] truncate ${mutedText}`}>Black • Size 40 • Premium Cut</div>
              </div>
            </div>
            <span className="text-xs font-extrabold">×1</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <CreditCard size={14} className={mutedText} />
              <span className={mutedText}>Credit Card (••4902)</span>
              <span className="px-1.5 py-0.5 rounded bg-[#6EE7B7] text-[#065F46] text-[9px] font-extrabold">PAID</span>
            </div>
            <div>
              <span className={`text-xs ${mutedText}`}>Total: </span>
              <span className="text-[16px] font-black">$320.00</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onNavigate ? onNavigate('OrderDetails') : showToast('Opening Order #ORD-9841')}
              className={`py-2 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1.5 ${
                isDark ? 'bg-slate-800 text-slate-200' : 'bg-[#EEF2FF] text-slate-800'
              }`}
            >
              <ExternalLink size={13} /> Order Details
            </button>
            <button
              onClick={() => showToast('Live GPS courier tracker opened')}
              className="py-2 rounded-xl bg-indigo-500/10 text-[11px] font-extrabold flex items-center justify-center gap-1.5"
              style={{ color: primaryColor }}
            >
              <Target size={13} /> Track Shipment
            </button>
          </div>
        </div>

        {/* CARD 3: #ORD-9840 Elena Rostova */}
        <div className={`p-3.5 rounded-2xl border shadow-xs space-y-3 ${cardBg}`}>
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                checked={selectedOrders.includes('#ORD-9840')}
                onChange={() => toggleOrderSelect('#ORD-9840')}
                className="w-4 h-4 mt-1 rounded accent-indigo-600"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-black">#ORD-9840</span>
                  <span className={`text-[10px] font-semibold ${mutedText}`}>42 mins ago</span>
                </div>
                <div className="text-xs font-extrabold mt-0.5">
                  Elena Rostova <span className={`font-normal ${mutedText}`}>• DHL Express</span>
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 text-[9px] font-extrabold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> DELIVERED
            </span>
          </div>

          <div className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 ${subBoxBg}`}>
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100&auto=format&fit=crop&q=80"
                alt="Items"
                className="w-12 h-10 rounded-lg object-cover bg-slate-200 flex-shrink-0"
              />
              <div className="min-w-0">
                <div className="text-xs font-bold">3 items ordered</div>
                <div className={`text-[10px] truncate ${mutedText}`}>Linen Resort Shirt, Ribbed T...</div>
              </div>
            </div>
            <ChevronRight size={15} className={mutedText} />
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <CheckCircle2 size={14} />
              <span>Signed by Recipient</span>
            </div>
            <div>
              <span className={`text-xs ${mutedText}`}>Total: </span>
              <span className="text-[16px] font-black">$245.50</span>
            </div>
          </div>
        </div>

        {/* CARD 4: #ORD-9839 David Chen */}
        <div className={`p-3.5 rounded-2xl border shadow-xs space-y-3 ${cardBg}`}>
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                checked={selectedOrders.includes('#ORD-9839')}
                onChange={() => toggleOrderSelect('#ORD-9839')}
                className="w-4 h-4 mt-1 rounded accent-indigo-600"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-black">#ORD-9839</span>
                  <span className={`text-[10px] font-semibold ${mutedText}`}>1 hr ago</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs font-extrabold">David Chen</span>
                  <span className="px-2 py-0.5 rounded bg-indigo-500/15 text-[9px] font-extrabold" style={{ color: primaryColor }}>
                    Express Next-Day
                  </span>
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-indigo-500/15 text-[9px] font-extrabold flex items-center gap-1" style={{ color: primaryColor }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} /> NEW
            </span>
          </div>

          <div className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 ${subBoxBg}`}>
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&auto=format&fit=crop&q=80"
                alt="Graphic Tee"
                className="w-10 h-10 rounded-lg object-cover bg-slate-200 flex-shrink-0"
              />
              <div className="min-w-0">
                <div className="text-xs font-bold truncate">Heavyweight Graphic Tee</div>
                <div className={`text-[10px] truncate ${mutedText}`}>Vintage Wash • Size L • SKU-TEE-VN-L</div>
              </div>
            </div>
            <span className="text-xs font-extrabold">×1</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className={`flex items-center gap-1.5 ${mutedText}`}>
              <Lock size={13} />
              <span>Payment Authorized</span>
            </div>
            <div>
              <span className={`text-xs ${mutedText}`}>Total: </span>
              <span className="text-[16px] font-black">$45.00</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => showToast('Order #ORD-9839 declined')}
              className={`py-2 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1 ${
                isDark ? 'bg-slate-800 text-slate-300' : 'bg-[#EEF2FF] text-slate-700'
              }`}
            >
              <X size={13} /> Decline
            </button>
            <button
              onClick={() => showToast('Order #ORD-9839 accepted!')}
              style={{ backgroundColor: primaryColor }}
              className="py-2 rounded-xl text-[11px] font-extrabold text-white flex items-center justify-center gap-1 shadow-xs"
            >
              <CheckCircle2 size={13} /> Accept Order
            </button>
          </div>
        </div>

        {/* Bottom SLA Banner */}
        <div className={`p-3.5 rounded-2xl flex items-center justify-between ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-[#EEF2FF]/90'}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/15 flex items-center justify-center" style={{ color: primaryColor }}>
              <Gauge size={16} />
            </div>
            <div>
              <div className="text-xs font-extrabold">Today&apos;s Fulfillment Rate</div>
              <div className={`text-[10px] ${mutedText}`}>94.2% on-time dispatch SLA</div>
            </div>
          </div>
          <span className="text-[16px] font-black" style={{ color: primaryColor }}>38 / 42</span>
        </div>
      </div>
    </div>
  );
};

export default OrderManagementVarient1;
