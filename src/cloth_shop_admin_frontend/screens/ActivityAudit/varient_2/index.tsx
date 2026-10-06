import React from 'react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const ActivityAuditVarient2: React.FC<AdminScreenVariantProps> = ({
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
          ACTIVITY AUDIT LOG • V2: SECURITY LOG
        </span>
        <h2 className="text-lg font-extrabold">Auth &amp; Permission Events</h2>
      </div>
      <div className={`p-3.5 rounded-2xl border space-y-2 ${cardSurface}`}>
        <div className="text-xs font-extrabold">Marcus Vance authenticated via Biometrics</div>
        <div className="text-[10px] text-emerald-600 font-bold">IP Verified • Flagship US Terminal #01</div>
      </div>
    </div>
  );
};

export default ActivityAuditVarient2;
