import React from 'react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const ActivityAuditVarient1: React.FC<AdminScreenVariantProps> = ({
  primaryColor = '#4338CA',
  isDark = false,
}) => {
  const screenBg = isDark ? 'bg-[#090D16] text-white' : 'bg-[#F8FAFC] text-[#0F172A]';
  const cardSurface = isDark
    ? 'bg-[#121826] border-slate-800 text-white'
    : 'bg-white border-slate-200/80 text-[#0F172A]';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className={`space-y-3 p-4 min-h-full ${screenBg}`}>
      <div>
        <span
          className="text-[10px] font-extrabold uppercase tracking-wider"
          style={{ color: primaryColor }}
        >
          ACTIVITY AUDIT LOG • V1: EVENT STREAM
        </span>
        <h2 className="text-lg font-extrabold">Operations Audit Stream</h2>
      </div>
      <div className="space-y-2">
        {[
          { action: 'Order #ORD-9842 flagged for Priority Express', user: 'VogueOps Triage', time: '4m ago' },
          { action: 'Emergency PO triggered for SKU-8841 (Beanie)', user: 'Auto-Restock', time: '12m ago' },
          { action: 'Batch Picklist printed for 4 Warehouses', user: 'Marcus Vance', time: '28m ago' },
        ].map((log, i) => (
          <div key={i} className={`p-3 rounded-2xl border space-y-1 ${cardSurface}`}>
            <div className="text-xs font-extrabold">{log.action}</div>
            <div className={`flex justify-between text-[10px] font-semibold ${mutedText}`}>
              <span>{log.user}</span>
              <span>{log.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityAuditVarient1;
