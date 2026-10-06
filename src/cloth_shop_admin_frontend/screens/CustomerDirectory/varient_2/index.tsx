import React from 'react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const CustomerDirectoryVarient2: React.FC<AdminScreenVariantProps> = ({
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
          CUSTOMER DIRECTORY • V2: VIP TIERS
        </span>
        <h2 className="text-lg font-extrabold">Platinum &amp; Gold Concierge</h2>
      </div>
      <div className="space-y-2.5">
        {[
          { name: 'Sophia Loren', tier: 'VIP Platinum', ltv: '$5,420', frequency: 'Every 12 days' },
          { name: 'Elena Rostova', tier: 'VIP Platinum', ltv: '$5,100', frequency: 'Every 14 days' },
          { name: 'Marcus Vance', tier: 'VIP Gold', ltv: '$3,180', frequency: 'Every 21 days' },
        ].map((c, i) => (
          <div
            key={i}
            className={`p-3.5 rounded-2xl border flex items-center justify-between ${cardSurface}`}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold">{c.name}</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-600 text-[9px] font-extrabold">
                  {c.tier}
                </span>
              </div>
              <div className={`text-[10px] mt-0.5 ${mutedText}`}>Order cycle: {c.frequency}</div>
            </div>
            <div className="text-xs font-black" style={{ color: primaryColor }}>
              {c.ltv}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDirectoryVarient2;
