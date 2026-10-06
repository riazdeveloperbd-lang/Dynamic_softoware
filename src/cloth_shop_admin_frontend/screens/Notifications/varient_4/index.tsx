import React from 'react';
import { ArrowLeft, Terminal, ShieldCheck, Wifi, Activity } from 'lucide-react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const NotificationsVarient4: React.FC<AdminScreenVariantProps> = ({
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

  const LOGS = [
    { ts: '10:18:42', code: 'WMS-200', msg: 'Order #ORD-9842 stage advanced to 4/6 (Processing)' },
    { ts: '10:15:09', code: 'SKU-000', msg: 'SKU-8841 stock threshold breached (0 units in Bin A-02)' },
    { ts: '10:12:30', code: 'PAY-201', msg: 'Apple Pay TXN-99812 settled ($195.40)' },
    { ts: '10:04:11', code: 'API-OK', msg: 'Klaviyo & Zendesk CRM segments synced (3,492 accounts)' },
  ];

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
              V4 • SYSTEM TELEMETRY
            </span>
            <h1 className="text-[16px] font-extrabold tracking-tight">Webhook &amp; Node Feed</h1>
          </div>
        </div>
        <Terminal size={18} style={{ color: primaryColor }} />
      </div>

      <div className="p-3.5 space-y-2.5">
        {LOGS.map((log, i) => (
          <div key={i} className={`p-3 rounded-xl border font-mono text-xs space-y-1 ${cardBg}`}>
            <div className="flex items-center justify-between">
              <span className="font-extrabold" style={{ color: primaryColor }}>
                [{log.code}]
              </span>
              <span className={`text-[10px] ${mutedText}`}>{log.ts}</span>
            </div>
            <div className="text-[11px] font-sans font-semibold">{log.msg}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsVarient4;
