import React from 'react';
import { ArrowLeft, Star, Gift, MessageSquare, PhoneCall, Sparkles } from 'lucide-react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const NotificationsVarient3: React.FC<AdminScreenVariantProps> = ({
  primaryColor = '#3730A3',
  isDark = false,
  onNavigate,
}) => {
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
              V3 • ATELIER CONCIERGE
            </span>
            <h1 className="text-[16px] font-extrabold tracking-tight">VIP Client Feed</h1>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-600 text-[10px] font-extrabold flex items-center gap-1">
          <Star size={11} /> Gold Tier
        </span>
      </div>

      <div className="p-3.5 space-y-3">
        {[
          {
            client: 'Sarah Sterling',
            tier: '42 Past Orders • $18.4K LTV',
            note: 'Requested eco-friendly packaging + lavender gift ribbon on #ORD-9842.',
            action: 'Open Order #ORD-9842',
            target: 'OrderDetails',
          },
          {
            client: 'Sophia Loren',
            tier: '14 Past Orders • VIP Gold',
            note: 'Requested custom hem alteration (30" inseam) on Stretch Slim Chino.',
            action: 'Assign Tailor Note',
            target: 'CustomerDirectory',
          },
        ].map((vip, idx) => (
          <div key={idx} className={`p-3.5 rounded-2xl border shadow-xs space-y-2.5 ${cardBg}`}>
            <div className="flex items-center justify-between">
              <div className="text-sm font-extrabold">{vip.client}</div>
              <span className="text-[10px] font-extrabold text-emerald-600">{vip.tier}</span>
            </div>
            <p className={`text-xs ${mutedText}`}>{vip.note}</p>
            <button
              onClick={() => onNavigate && onNavigate(vip.target)}
              style={{ backgroundColor: primaryColor }}
              className="w-full py-2 rounded-xl text-white text-xs font-extrabold"
            >
              {vip.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsVarient3;
