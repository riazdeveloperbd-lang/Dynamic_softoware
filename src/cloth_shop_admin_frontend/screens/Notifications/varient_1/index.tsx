import React, { useState } from 'react';
import {
  ArrowLeft,
  Bell,
  CheckCheck,
  SlidersHorizontal,
  ShoppingBag,
  AlertTriangle,
  Star,
  Truck,
  CheckCircle2,
  Zap,
  PackagePlus,
  Clock,
  ShieldAlert,
  ChevronRight,
} from 'lucide-react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

interface NotificationItem {
  id: string;
  category: 'Orders' | 'Stock' | 'VIP' | 'System';
  title: string;
  subtitle: string;
  time: string;
  unread: boolean;
  priority?: 'URGENT' | 'VIP GOLD' | 'WMS SYNC';
  actionLabel?: string;
  targetScreen?: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    category: 'Orders',
    title: 'VIP Priority Air Order #ORD-9842',
    subtitle: 'Sarah Sterling placed a $195.40 order (2 units) • Eco-packaging requested.',
    time: '2m ago',
    unread: true,
    priority: 'VIP GOLD',
    actionLabel: 'Inspect Order',
    targetScreen: 'OrderDetails',
  },
  {
    id: 'notif-2',
    category: 'Stock',
    title: 'Zero Stock Deficit: Cashmere Ribbed Beanie',
    subtitle: 'SKU-8841 reached 0 units in Bin A-02. 4 open backorders waiting.',
    time: '9m ago',
    unread: true,
    priority: 'URGENT',
    actionLabel: 'Trigger +50 PO',
    targetScreen: 'InventoryCatalog',
  },
  {
    id: 'notif-3',
    category: 'Orders',
    title: 'Same-Day SLA Dispatch Warning',
    subtitle: '3 Express Next-Day orders in Zone 01 must print labels before 16:30 EST.',
    time: '18m ago',
    unread: true,
    priority: 'URGENT',
    actionLabel: 'Batch Print (3)',
    targetScreen: 'OrderManagement',
  },
  {
    id: 'notif-4',
    category: 'VIP',
    title: 'Private Styling Appointment Check-In',
    subtitle: 'Sophia Loren arrived at Flagship SoHo Lounge • Assigned to Elena R.',
    time: '42m ago',
    unread: false,
    priority: 'VIP GOLD',
    actionLabel: 'Client Profile',
    targetScreen: 'CustomerDirectory',
  },
  {
    id: 'notif-5',
    category: 'System',
    title: 'Austin Hub #04 WMS Ledger Synced',
    subtitle: '1,284 SKUs verified with 99.98% API uptime • Zebra ZT411 online.',
    time: '1h ago',
    unread: false,
    priority: 'WMS SYNC',
    actionLabel: 'Hub Settings',
    targetScreen: 'StoreSettings',
  },
];

export const NotificationsVarient1: React.FC<AdminScreenVariantProps> = ({
  primaryColor = '#3730A3',
  isDark = false,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Orders' | 'Stock' | 'VIP'>('All');
  const [items, setItems] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const unreadCount = items.filter((i) => i.unread).length;

  const markAllRead = () => {
    setItems((prev) => prev.map((i) => ({ ...i, unread: false })));
    showToast('All notifications marked as read');
  };

  const markSingleRead = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, unread: false } : i)));
  };

  const filteredItems = items.filter((item) => {
    if (activeTab === 'All') return true;
    return item.category === activeTab;
  });

  const bgMain = isDark ? 'bg-[#090D16] text-white' : 'bg-[#F8FAFC] text-[#0F172A]';
  const cardBg = isDark
    ? 'bg-[#121826] border-slate-800 text-white'
    : 'bg-white border-slate-200/70 text-[#0F172A]';
  const subBoxBg = isDark
    ? 'bg-[#1A2234] border-slate-800'
    : 'bg-[#EEF2FF]/65 border-indigo-100/70';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-500';
  const headerBg = isDark
    ? 'bg-[#0B0F19]/95 border-slate-800 text-white'
    : 'bg-white/95 border-slate-100 text-[#0F172A]';

  const getCategoryIcon = (cat: NotificationItem['category']) => {
    switch (cat) {
      case 'Orders':
        return <ShoppingBag size={16} style={{ color: primaryColor }} />;
      case 'Stock':
        return <AlertTriangle size={16} className="text-rose-600" />;
      case 'VIP':
        return <Star size={16} className="text-amber-600" />;
      default:
        return <Truck size={16} className="text-emerald-600" />;
    }
  };

  return (
    <div className={`flex-1 flex flex-col min-h-full pb-6 select-none ${bgMain}`}>
      {/* Sticky Top Header */}
      <div
        className={`px-4 py-3 flex items-center justify-between border-b sticky top-0 z-30 backdrop-blur-md ${headerBg}`}
      >
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate && onNavigate('AdminDashboard')}
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
          <div>
            <h1 className="text-[16px] font-extrabold tracking-tight leading-tight">
              Notifications
            </h1>
            <div className={`text-[10px] font-bold ${mutedText}`}>
              {unreadCount} Unread Triage Alerts
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={markAllRead}
            className={`px-2.5 py-1.5 rounded-xl text-[10px] font-extrabold flex items-center gap-1 ${
              isDark ? 'bg-slate-800 text-slate-200' : 'bg-[#EEF2FF] text-slate-800'
            }`}
            style={{ color: primaryColor }}
          >
            <CheckCheck size={13} />
            <span>Mark Read</span>
          </button>
          <button
            onClick={() => onNavigate && onNavigate('StoreSettings')}
            className="p-2 rounded-xl hover:bg-slate-500/10"
          >
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Live Operations Status Strip */}
      <div
        className={`px-4 py-2 flex items-center justify-between text-[11px] border-b ${
          isDark ? 'bg-[#111827] border-slate-800' : 'bg-[#EEF2FF]/75 border-indigo-100/80'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <span className="font-extrabold tracking-wide text-emerald-700 dark:text-emerald-400 uppercase text-[10px]">
            PUSH CHIMES ACTIVE
          </span>
          <span className={mutedText}>• Austin Hub #04</span>
        </div>
        <div className={`flex items-center gap-1 font-bold text-[10px] ${mutedText}`}>
          <Clock size={12} />
          <span>Real-time Stream</span>
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

      <div className="p-3.5 space-y-3.5 flex-1">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'All', count: items.length },
            { id: 'Orders', count: items.filter((i) => i.category === 'Orders').length },
            { id: 'Stock', count: items.filter((i) => i.category === 'Stock').length },
            { id: 'VIP', count: items.filter((i) => i.category === 'VIP').length },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 flex-shrink-0 transition ${
                  active
                    ? 'text-white shadow-xs'
                    : isDark
                    ? 'bg-slate-800 text-slate-300'
                    : 'bg-[#EEF2FF]/80 text-slate-700'
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

        {/* Notification Cards */}
        <div className="space-y-2.5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => markSingleRead(item.id)}
              className={`p-3.5 rounded-2xl border shadow-xs space-y-2.5 transition cursor-pointer ${cardBg} ${
                item.unread ? 'border-l-4' : ''
              }`}
              style={item.unread ? { borderLeftColor: primaryColor } : undefined}
            >
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex items-start gap-2.5 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${subBoxBg}`}
                  >
                    {getCategoryIcon(item.category)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {item.priority && (
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider ${
                            item.priority === 'URGENT'
                              ? 'bg-rose-500/15 text-rose-600'
                              : item.priority === 'VIP GOLD'
                              ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300'
                              : 'bg-emerald-500/15 text-emerald-600'
                          }`}
                        >
                          {item.priority}
                        </span>
                      )}
                      <span className={`text-[10px] font-bold ${mutedText}`}>{item.time}</span>
                    </div>
                    <div className="text-[13px] font-extrabold mt-1 leading-snug">{item.title}</div>
                  </div>
                </div>

                {item.unread && (
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1"
                    style={{ backgroundColor: primaryColor }}
                  />
                )}
              </div>

              <p className={`text-[11px] leading-relaxed ${mutedText}`}>{item.subtitle}</p>

              {item.actionLabel && (
                <div className="flex items-center justify-between pt-1">
                  <span className={`text-[10px] font-extrabold uppercase ${mutedText}`}>
                    {item.category} Alert
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markSingleRead(item.id);
                      if (item.targetScreen && onNavigate) {
                        onNavigate(item.targetScreen);
                      } else {
                        showToast(`${item.actionLabel} executed`);
                      }
                    }}
                    style={{ backgroundColor: primaryColor }}
                    className="px-3 py-1.5 rounded-xl text-white text-[11px] font-extrabold flex items-center gap-1 shadow-xs hover:opacity-95 transition"
                  >
                    <span>{item.actionLabel}</span>
                    <ChevronRight size={12} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsVarient1;
