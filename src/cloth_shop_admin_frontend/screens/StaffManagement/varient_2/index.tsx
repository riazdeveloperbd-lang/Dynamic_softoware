import React from 'react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const StaffManagementVarient2: React.FC<AdminScreenVariantProps> = ({
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
          STAFF &amp; ROLES • V2: SHIFT ZONES
        </span>
        <h2 className="text-lg font-extrabold">Warehouse Zone Operators</h2>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {[
          { zone: 'Zone A: Apparel', lead: 'Chloe Bennett', active: 6 },
          { zone: 'Zone B: Outerwear', lead: 'Julian Drake', active: 4 },
          { zone: 'Bay E-4 Dispatch', lead: 'Devon Brooks', active: 5 },
          { zone: 'VIP Concierge', lead: 'Aria Lin', active: 3 },
        ].map((z, i) => (
          <div key={i} className={`p-3 rounded-2xl border space-y-1.5 ${cardSurface}`}>
            <div className="text-xs font-extrabold">{z.zone}</div>
            <div className="text-[10px] text-slate-400">Lead: {z.lead}</div>
            <div className="text-[11px] font-extrabold" style={{ color: primaryColor }}>
              {z.active} Operators Online
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffManagementVarient2;
