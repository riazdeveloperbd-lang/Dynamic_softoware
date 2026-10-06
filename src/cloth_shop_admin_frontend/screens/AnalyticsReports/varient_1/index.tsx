import React from 'react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const AnalyticsReportsVarient1: React.FC<AdminScreenVariantProps> = ({
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
          ANALYTICS &amp; REPORTS • V1: REVENUE PULSE
        </span>
        <h2 className="text-lg font-extrabold">Executive Revenue Telemetry</h2>
      </div>
      <div className={`p-4 rounded-2xl border space-y-3 ${cardSurface}`}>
        <div className={`text-xs font-extrabold ${mutedText}`}>Weekly Dispatch &amp; Revenue</div>
        <div className="h-32 flex items-end gap-2 pt-2">
          {[45, 62, 78, 54, 88, 92, 98].map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t-lg relative flex flex-col justify-end overflow-hidden h-full ${
                isDark ? 'bg-slate-800' : 'bg-slate-100'
              }`}
            >
              <div
                style={{ height: `${h}%`, backgroundColor: primaryColor }}
                className="w-full rounded-t-lg"
              />
            </div>
          ))}
        </div>
        <div className={`flex justify-between text-[10px] font-bold ${mutedText}`}>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsReportsVarient1;
