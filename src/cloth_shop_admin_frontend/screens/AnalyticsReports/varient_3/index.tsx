import React from 'react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const AnalyticsReportsVarient3: React.FC<AdminScreenVariantProps> = ({
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
          ANALYTICS &amp; REPORTS • V3: P&amp;L LEDGER
        </span>
        <h2 className="text-lg font-extrabold">Category Margin Breakdown</h2>
      </div>
      <div className={`p-4 rounded-2xl border space-y-2.5 ${cardSurface}`}>
        <div className="flex justify-between text-xs">
          <span>Gross Sales</span>
          <span className="font-extrabold">$14,820.50</span>
        </div>
        <div className="flex justify-between text-xs">
          <span>COGS &amp; Logistics</span>
          <span className="font-bold text-rose-500">-$4,876.50</span>
        </div>
        <div className="pt-2 border-t border-slate-200/40 flex justify-between text-sm font-black">
          <span>Net Margin (67.1%)</span>
          <span className="text-emerald-600">$9,944.00</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReportsVarient3;
