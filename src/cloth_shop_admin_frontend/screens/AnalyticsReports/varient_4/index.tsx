import React from 'react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const AnalyticsReportsVarient4: React.FC<AdminScreenVariantProps> = ({
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
          ANALYTICS &amp; REPORTS • V4: EXECUTIVE DECK
        </span>
        <h2 className="text-lg font-extrabold">Monthly Forecast Summary</h2>
      </div>
      <div className={`p-4 rounded-2xl border space-y-2 ${cardSurface}`}>
        <div className="text-xs font-bold text-slate-400">30-DAY RUN RATE</div>
        <div className="text-2xl font-black" style={{ color: primaryColor }}>
          $412,890.00
        </div>
        <div className="text-xs font-extrabold text-emerald-600">+19.8% ahead of Q4 target</div>
      </div>
    </div>
  );
};

export default AnalyticsReportsVarient4;
