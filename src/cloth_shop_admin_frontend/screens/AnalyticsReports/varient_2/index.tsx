import React from 'react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const AnalyticsReportsVarient2: React.FC<AdminScreenVariantProps> = ({
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
          ANALYTICS &amp; REPORTS • V2: SLA TELEMETRY
        </span>
        <h2 className="text-lg font-extrabold">Fulfillment SLA Speed</h2>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <div className={`p-3.5 rounded-2xl border ${cardSurface}`}>
          <div className="text-[10px] font-bold text-slate-400">ON-TIME RATE</div>
          <div className="text-xl font-black text-emerald-600 mt-1">98.4%</div>
        </div>
        <div className={`p-3.5 rounded-2xl border ${cardSurface}`}>
          <div className="text-[10px] font-bold text-slate-400">AVG PICK TIME</div>
          <div className="text-xl font-black mt-1" style={{ color: primaryColor }}>
            14m 20s
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReportsVarient2;
