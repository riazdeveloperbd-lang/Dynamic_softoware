import React from 'react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const StaffManagementVarient1: React.FC<AdminScreenVariantProps> = ({
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
          STAFF &amp; ROLES • V1: TEAM ROSTER
        </span>
        <h2 className="text-lg font-extrabold">HQ Hub • Zone 01 Staff</h2>
      </div>
      <div className="space-y-2">
        {[
          { name: 'Marcus Vance', role: 'Ops Director', access: 'Full Command', status: 'Active' },
          { name: 'Chloe Bennett', role: 'Lead Dispatch', access: 'SLA & Picklists', status: 'Active' },
          { name: 'Julian Drake', role: 'Stock Controller', access: 'PO & Deficits', status: 'On Shift' },
        ].map((s, i) => (
          <div
            key={i}
            className={`p-3.5 rounded-2xl border flex items-center justify-between ${cardSurface}`}
          >
            <div>
              <div className="text-xs font-extrabold">{s.name}</div>
              <div className={`text-[10px] ${mutedText}`}>
                {s.role} · {s.access}
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-extrabold bg-emerald-500/15 text-emerald-600">
              {s.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffManagementVarient1;
