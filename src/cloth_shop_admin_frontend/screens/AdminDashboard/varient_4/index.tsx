import React, { useState } from 'react';
import {
  RefreshCw,
  Bell,
  ChevronDown,
  Zap,
  ScanBarcode,
  AlertTriangle,
  AlertCircle,
  ChevronRight,
  Printer,
  PackageCheck,
  ShoppingCart,
  ArrowLeftRight,
  CheckCircle2,
  Truck,
  Play,
  MoreHorizontal,
  FileText,
  XCircle,
  CheckCheck,
  RotateCcw,
  Package,
} from 'lucide-react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const AdminDashboardVarient4: React.FC<AdminScreenVariantProps> = ({
  primaryColor = '#4338CA',
  isDark = false,
  onNavigate,
}) => {
  const [reorderedSkus, setReorderedSkus] = useState<Record<string, number>>({});
  const [orderActions, setOrderActions] = useState<Record<string, string>>({});
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

  const handleOrderAction = (orderId: string, newState: string) => {
    setOrderActions((prev) => ({ ...prev, [orderId]: newState }));
    triggerToast(`${orderId} updated to ${newState}`);
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
              onClick={() => triggerToast('Zone selector opened')}
              className="flex items-center gap-1 text-[10px] font-extrabold tracking-wider uppercase text-[#4338CA]"
            >
              <span>HQ HUB • ZONE 01</span>
              <ChevronDown size={11} strokeWidth={2.5} />
            </button>
            <h1 className="text-[16px] font-extrabold tracking-tight truncate text-[#0F172A]">
              VogueOps Command
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
            onClick={() => onNavigate ? onNavigate('Notifications') : triggerToast('3 unread dispatch alerts')}
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
        <div className="mx-4 mt-2 px-3 py-2 rounded-xl bg-[#4338CA] text-white text-[11px] font-bold flex items-center justify-between shadow-lg">
          <span>{activeToast}</span>
          <CheckCircle2 size={14} className="text-white" />
        </div>
      )}

      <div className="p-3.5 space-y-4">
        {/* Dark Navy Fast-Dispatch Ops Live Banner */}
        <div className="p-3 rounded-2xl bg-[#111827] text-white space-y-2.5 shadow-sm border border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <span className="text-[10px] font-extrabold tracking-wider uppercase text-slate-200">
                FAST-DISPATCH OPS LIVE
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#064E3B] text-[#34D399] text-[10px] font-extrabold">
              SLA Pace: 18m avg
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => onNavigate && onNavigate('OrderManagement')}
              className="px-2.5 py-1 rounded-full bg-[#FECACA] text-[#7F1D1D] text-[10px] font-extrabold flex items-center gap-1.5 flex-shrink-0"
            >
              <Truck size={11} strokeWidth={2.5} />
              <span>12 Pending Dispatch</span>
            </button>
            <button
              onClick={() => onNavigate && onNavigate('InventoryCatalog')}
              className="px-2.5 py-1 rounded-full bg-[#FDE68A] text-[#78350F] text-[10px] font-extrabold flex items-center gap-1.5 flex-shrink-0"
            >
              <Package size={11} strokeWidth={2.5} />
              <span>4 Low Stock</span>
            </button>
            <button
              onClick={() => triggerToast('2 Return authorizations ready for inspection')}
              className="px-2.5 py-1 rounded-full bg-[#CBD5E1] text-[#1E293B] text-[10px] font-extrabold flex items-center gap-1.5 flex-shrink-0"
            >
              <RotateCcw size={11} strokeWidth={2.5} />
              <span>2 Returns</span>
            </button>
          </div>
        </div>

        {/* BATCH COMMAND CENTER (2x2 Bento Grid) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#0F172A]">
              BATCH COMMAND CENTER
            </span>
            <button
              onClick={() => triggerToast('Running express batch automation...')}
              className="flex items-center gap-1 text-[#4338CA] text-[10px] font-extrabold"
            >
              <Zap size={11} className="fill-[#4338CA]" />
              <span>Express Run</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => onNavigate && onNavigate('POSCashier')}
              className="p-3.5 rounded-2xl bg-[#4338CA] hover:bg-[#3730A3] text-white text-left space-y-3 shadow-sm transition"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
                  <ScanBarcode size={17} strokeWidth={2.2} />
                </div>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[9px] font-extrabold">
                  Camera Ready
                </span>
              </div>
              <div>
                <div className="text-[15px] font-extrabold leading-tight">Scan Barcode</div>
                <div className="text-[10px] text-indigo-200 truncate mt-0.5">
                  Instant Item / Order Loo...
                </div>
              </div>
            </button>

            <button
              onClick={() => triggerToast('Sending 12 picklists to warehouse printer...')}
              className="p-3.5 rounded-2xl border bg-white border-slate-200/80 hover:border-indigo-300 text-left space-y-3 shadow-xs transition"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#4338CA] flex items-center justify-center">
                  <Printer size={16} strokeWidth={2.2} />
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#FEE2E2] text-[#B91C1C] text-[9px] font-extrabold">
                  12 Queue
                </span>
              </div>
              <div>
                <div className="text-[15px] font-extrabold leading-tight text-[#0F172A]">
                  Print Picklists
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">
                  Batch 4 Warehouses
                </div>
              </div>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('OrderManagement')}
              className="p-3.5 rounded-2xl border bg-white border-slate-200/80 hover:border-emerald-300 text-left space-y-3 shadow-xs transition"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center">
                  <PackageCheck size={16} strokeWidth={2.2} />
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#6EE7B7] text-[#065F46] text-[9px] font-extrabold">
                  Ready
                </span>
              </div>
              <div>
                <div className="text-[15px] font-extrabold leading-tight text-[#0F172A]">
                  Bulk Dispatch
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">
                  Manifest 18 Parcels
                </div>
              </div>
            </button>

            <button
              onClick={() => onNavigate && onNavigate('InventoryCatalog')}
              className="p-3.5 rounded-2xl border bg-white border-slate-200/80 hover:border-amber-300 text-left space-y-3 shadow-xs transition"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center">
                  <ShoppingCart size={16} strokeWidth={2.2} />
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#FDE68A] text-[#92400E] text-[9px] font-extrabold">
                  4 Urgent
                </span>
              </div>
              <div>
                <div className="text-[15px] font-extrabold leading-tight text-[#0F172A]">
                  Express Restock
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">
                  Auto-PO Generation
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* 3-Column KPI Strip */}
        <div className="p-3.5 rounded-2xl border bg-white border-slate-200/80 divide-x divide-slate-100 grid grid-cols-3 shadow-xs">
          <div className="pr-2">
            <div className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">
              NET REVENUE
            </div>
            <div className="text-[17px] font-black mt-0.5 text-[#0F172A]">$14,820</div>
            <div className="text-[10px] font-extrabold text-[#059669] mt-0.5">↗ +18.4%</div>
          </div>

          <div className="px-2.5">
            <div className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">
              FULFILL SLA
            </div>
            <div className="text-[17px] font-black mt-0.5 text-[#0F172A]">98.4%</div>
            <div className="text-[10px] font-extrabold text-[#4338CA] mt-0.5 flex items-center gap-0.5">
              <CheckCircle2 size={10} />
              <span>Target &gt;97%</span>
            </div>
          </div>

          <div className="pl-2.5">
            <div className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">
              ACTIVE BUYERS
            </div>
            <div className="text-[17px] font-black mt-0.5 text-[#0F172A]">3,280</div>
            <div className="text-[10px] font-extrabold text-[#059669] mt-0.5">↑ 5.2% mo</div>
          </div>
        </div>

        {/* FULFILLMENT PIPELINE */}
        <div className="p-3.5 rounded-2xl border bg-white border-slate-200/80 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#EEF2FF] text-[#4338CA] flex items-center justify-center">
                <ArrowLeftRight size={13} strokeWidth={2.4} />
              </div>
              <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#0F172A]">
                FULFILLMENT PIPELINE
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[9px] font-bold">
              Live Queue: 142 total
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Unfulfilled', count: 28, dot: 'bg-[#4338CA]', bar: 'bg-[#4338CA] w-[75%]', border: 'border-slate-200/80' },
              { label: 'Picking', count: 46, dot: 'bg-[#F59E0B]', bar: 'bg-[#F59E0B] w-[68%]', border: 'border-slate-200/80' },
              { label: 'Packing', count: 19, dot: 'bg-slate-600', bar: 'bg-slate-600 w-[45%]', border: 'border-slate-200/80' },
              { label: 'Shipped', count: 49, dot: 'bg-[#059669]', bar: 'bg-[#059669] w-[85%]', border: 'border-[#6EE7B7] bg-[#ECFDF5]/30' },
            ].map((stage) => (
              <div
                key={stage.label}
                onClick={() => onNavigate && onNavigate('OrderManagement')}
                className={`p-2 rounded-xl border cursor-pointer ${stage.border} space-y-1.5`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-semibold text-slate-500">{stage.label}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${stage.dot}`} />
                </div>
                <div className="text-[17px] font-black leading-none text-[#0F172A]">
                  {stage.count}
                </div>
                <div className="w-full h-1 rounded-full bg-slate-200 overflow-hidden">
                  <div className={`h-full rounded-full ${stage.bar}`} />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-1 flex items-center justify-between text-[10px]">
            <span className="font-bold text-slate-500">On-track SLA threshold: 45 min</span>
            <button
              onClick={() => onNavigate && onNavigate('OrderManagement')}
              className="font-extrabold text-[#4338CA] flex items-center gap-0.5"
            >
              <span>Manage Queue →</span>
            </button>
          </div>
        </div>

        {/* CRITICAL STOCK DEFICITS */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <AlertTriangle size={14} className="text-[#B91C1C]" strokeWidth={2.4} />
              <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#0F172A]">
                CRITICAL STOCK DEFICITS
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#FEE2E2] text-[#B91C1C] text-[10px] font-extrabold">
              4 Deficits
            </span>
          </div>

          <div className="p-3 rounded-2xl border bg-white border-rose-200 space-y-2.5 shadow-xs">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=120&auto=format&fit=crop&q=80"
                alt="Cashmere Ribbed Beanie"
                className="w-12 h-12 rounded-xl object-cover bg-slate-100 flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-extrabold text-[#0F172A]">
                  Cashmere Ribbed Beanie
                </div>
                <div className="text-[10px] font-semibold text-slate-500">
                  OS • Charcoal Grey • SKU-8841
                </div>
                <div className="flex items-center gap-1 text-[#B91C1C] text-[10px] font-extrabold mt-0.5">
                  <XCircle size={11} />
                  <span>
                    {reorderedSkus['SKU-8841']
                      ? `${reorderedSkus['SKU-8841']} Units Restocked`
                      : '0 Units In Stock (Backorder Risk)'}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-[#F8FAFC] flex items-center justify-between gap-1.5">
              <span className="text-[9px] font-bold text-slate-500 leading-tight">
                Immediate Restock
                <br />
                Order:
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleRestock('SKU-8841', 10, 'Cashmere Beanie')}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-[#4338CA] text-[10px] font-extrabold hover:bg-indigo-50 transition"
                >
                  +10
                </button>
                <button
                  onClick={() => handleRestock('SKU-8841', 50, 'Cashmere Beanie')}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-[#4338CA] text-[10px] font-extrabold hover:bg-indigo-50 transition"
                >
                  +50
                </button>
                <button
                  onClick={() => handleRestock('SKU-8841', 100, 'Emergency PO Sent')}
                  className="px-3 py-1 rounded-lg bg-[#B91C1C] hover:bg-rose-800 text-white text-[9px] font-extrabold leading-tight text-center transition"
                >
                  Supplier
                  <br />
                  Emergency
                </button>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl border bg-white border-slate-200/80 space-y-2.5 shadow-xs">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=120&auto=format&fit=crop&q=80"
                alt="Slogan Graphic Tee"
                className="w-12 h-12 rounded-xl object-cover bg-slate-100 flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-extrabold text-[#0F172A]">Slogan Graphic Tee</div>
                <div className="text-[10px] font-semibold text-slate-500">
                  Size L • Navy Blue • SKU-2209
                </div>
                <div className="flex items-center gap-1 text-[#B91C1C] text-[10px] font-extrabold mt-0.5">
                  <AlertCircle size={11} />
                  <span>
                    {reorderedSkus['SKU-2209']
                      ? `${3 + reorderedSkus['SKU-2209']} units available`
                      : 'Only 3 units remaining'}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-[#F8FAFC] flex items-center justify-between gap-1.5">
              <span className="text-[9px] font-bold text-slate-500 leading-tight">
                Immediate Restock
                <br />
                Order:
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleRestock('SKU-2209', 10, 'Slogan Graphic Tee')}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-[#4338CA] text-[10px] font-extrabold hover:bg-indigo-50 transition"
                >
                  +10
                </button>
                <button
                  onClick={() => handleRestock('SKU-2209', 50, 'Slogan Graphic Tee')}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-[#4338CA] text-[10px] font-extrabold hover:bg-indigo-50 transition"
                >
                  +50
                </button>
                <button
                  onClick={() => handleRestock('SKU-2209', 50, 'Quick Reorder')}
                  className="px-3.5 py-1 rounded-lg bg-[#4338CA] hover:bg-[#3730A3] text-white text-[9px] font-extrabold leading-tight text-center transition"
                >
                  Quick
                  <br />
                  Reorder
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* PRIORITY TRIAGE ORDERS */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold tracking-wider uppercase leading-tight text-[#0F172A]">
                PRIORITY TRIAGE
                <br />
                ORDERS
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#EEF2FF] text-[#4338CA] text-[9px] font-extrabold leading-tight">
                Immediate
                <br />
                Dispatch
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

          <div className="space-y-2.5">
            <div className="p-3 rounded-2xl border bg-white border-slate-200/80 space-y-2.5 shadow-xs">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#4338CA] flex items-center justify-center text-xs font-extrabold flex-shrink-0">
                    SL
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-[12px]">
                      <span className="font-extrabold text-[#0F172A]">#ORD-9842</span>
                      <span className="text-slate-400">•</span>
                      <span className="font-medium text-slate-500">Sophia Loren</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      2 items • 4m ago • Priority Express
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] font-extrabold text-[#0F172A]">$184.00</div>
                  <span className="inline-block px-2 py-0.5 rounded-lg bg-[#FEF3C7] text-[#92400E] text-[9px] font-extrabold mt-0.5">
                    {orderActions['#ORD-9842'] || 'Ready to Pack'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOrderAction('#ORD-9842', 'Packed & Label Printed')}
                  className="flex-1 py-2 rounded-xl bg-[#4338CA] hover:bg-[#3730A3] text-white text-[11px] font-extrabold flex items-center justify-center gap-1.5 transition"
                >
                  <CheckCheck size={14} />
                  <span>Pack &amp; Print Slip</span>
                </button>
                <button
                  onClick={() => onNavigate && onNavigate('OrderManagement')}
                  className="w-9 h-9 rounded-xl bg-[#EEF2FF] text-slate-600 flex items-center justify-center hover:bg-indigo-100 transition"
                >
                  <MoreHorizontal size={15} />
                </button>
              </div>
            </div>

            <div className="p-3 rounded-2xl border bg-white border-slate-200/80 space-y-2.5 shadow-xs">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#E2E8F0] text-slate-700 flex items-center justify-center text-xs font-extrabold flex-shrink-0">
                    MV
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-[12px]">
                      <span className="font-extrabold text-[#0F172A]">#ORD-9841</span>
                      <span className="text-slate-400">•</span>
                      <span className="font-medium text-slate-500">Marcus Vance</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      1 item (Leather Jacket) • 18m ago
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] font-extrabold text-[#0F172A]">$320.00</div>
                  <span className="inline-block px-2 py-0.5 rounded-lg bg-[#DBEAFE] text-[#1E40AF] text-[9px] font-extrabold mt-0.5">
                    {orderActions['#ORD-9841'] || 'Awaiting Carrier'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOrderAction('#ORD-9841', 'DHL Express Assigned')}
                  className="flex-1 py-2 rounded-xl bg-[#E2E8F0] hover:bg-slate-300 text-[#0F172A] text-[11px] font-extrabold flex items-center justify-center gap-1.5 transition"
                >
                  <Truck size={14} />
                  <span>Assign Carrier</span>
                </button>
                <button
                  onClick={() => triggerToast('Invoice #ORD-9841 preview opened')}
                  className="w-9 h-9 rounded-xl bg-[#E2E8F0] text-slate-700 flex items-center justify-center hover:bg-slate-300 transition"
                >
                  <FileText size={14} />
                </button>
              </div>
            </div>

            <div className="p-3 rounded-2xl border bg-white border-slate-200/80 space-y-2.5 shadow-xs">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#6EE7B7] text-[#065F46] flex items-center justify-center text-xs font-extrabold flex-shrink-0">
                    DC
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-[12px]">
                      <span className="font-extrabold text-[#0F172A]">#ORD-9839</span>
                      <span className="text-slate-400">•</span>
                      <span className="font-medium text-slate-500">David Chen</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      1 item (Graphic Tee) • Just placed
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[13px] font-extrabold text-[#0F172A]">$45.00</div>
                  <span className="inline-block px-2 py-0.5 rounded-lg bg-[#EDE9FE] text-[#5B21B6] text-[9px] font-extrabold mt-0.5">
                    {orderActions['#ORD-9839'] || 'New Unfulfilled'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOrderAction('#ORD-9839', 'Picking in Progress')}
                  className="flex-1 py-2 rounded-xl bg-[#4338CA] hover:bg-[#3730A3] text-white text-[11px] font-extrabold flex items-center justify-center gap-1.5 transition"
                >
                  <Play size={13} />
                  <span>Start Picking</span>
                </button>
                <button
                  onClick={() => onNavigate && onNavigate('OrderManagement')}
                  className="w-9 h-9 rounded-xl bg-[#EEF2FF] text-slate-600 flex items-center justify-center hover:bg-indigo-100 transition"
                >
                  <MoreHorizontal size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardVarient4;
