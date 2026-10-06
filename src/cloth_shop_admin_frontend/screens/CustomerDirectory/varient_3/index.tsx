import React from 'react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const CustomerDirectoryVarient3: React.FC<AdminScreenVariantProps> = ({
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
          CUSTOMER DIRECTORY • V3: SPEND ANALYTICS
        </span>
        <h2 className="text-lg font-extrabold">LTV &amp; Retention Cohorts</h2>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <div className={`p-3.5 rounded-2xl border ${cardSurface}`}>
          <div className={`text-[10px] font-bold uppercase ${mutedText}`}>Repeat Rate</div>
          <div className="text-xl font-black mt-1" style={{ color: primaryColor }}>
            42.6%
          </div>
        </div>
        <div className={`p-3.5 rounded-2xl border ${cardSurface}`}>
          <div className={`text-[10px] font-bold uppercase ${mutedText}`}>Avg VIP LTV</div>
          <div className="text-xl font-black mt-1 text-emerald-600">$3,840</div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDirectoryVarient3;
