import React from 'react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const StaffManagementVarient4: React.FC<AdminScreenVariantProps> = ({
  primaryColor = '#4338CA',
  isDark = false,
}) => {
  const screenBg = isDark ? 'bg-[#090D16] text-white' : 'bg-[#F8FAFC] text-[#0F172A]';
  const cardSurface = isDark
    ? 'bg-[#121826] border-slate-800 text-white'
    : 'bg-white border-slate-200/80 text-[#0F172A]';

  return (
    <div className={`space-y-3 p-4 min-h-full ${screenBg}`}>
      <div>
        <span
          className="text-[10px] font-extrabold uppercase tracking-wider"
          style={{ color: primaryColor }}
        >
          STAFF &amp; ROLES • V4: AUDIT VIEW
        </span>
        <h2 className="text-lg font-extrabold">Operator Throughput</h2>
      </div>
      <div className="space-y-2">
        {[
          { name: 'Chloe Bennett', metric: '48 parcels packed today', sla: '99.2% SLA' },
          { name: 'Julian Drake', metric: '12 POs verified today', sla: '98.5% SLA' },
        ].map((op, i) => (
          <div key={i} className={`p-3.5 rounded-2xl border flex justify-between items-center ${cardSurface}`}>
            <div>
              <div className="text-xs font-extrabold">{op.name}</div>
              <div className="text-[10px] text-slate-400">{op.metric}</div>
            </div>
            <span className="text-xs font-black text-emerald-600">{op.sla}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffManagementVarient4;
