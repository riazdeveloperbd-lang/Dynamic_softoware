import React from 'react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const CustomerDirectoryVarient1: React.FC<AdminScreenVariantProps> = ({
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
          CUSTOMER DIRECTORY • V1: BUYER CARDS
        </span>
        <h2 className="text-lg font-extrabold">Active Buyers (3,280)</h2>
      </div>
      <div className="space-y-2">
        {[
          { name: 'Sophia Loren', email: 'sophia@vogueops.com', orders: 14, spent: '$3,450' },
          { name: 'Marcus Vance', email: 'marcus@vogueops.com', orders: 8, spent: '$1,820' },
          { name: 'Elena Rostova', email: 'elena@vogueops.com', orders: 22, spent: '$5,100' },
        ].map((c, i) => (
          <div
            key={i}
            className={`p-3.5 rounded-2xl border flex items-center justify-between ${cardSurface}`}
          >
            <div>
              <div className="text-xs font-extrabold">{c.name}</div>
              <div className={`text-[10px] ${mutedText}`}>{c.email}</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-extrabold" style={{ color: primaryColor }}>
                {c.spent}
              </div>
              <div className={`text-[10px] ${mutedText}`}>{c.orders} orders</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDirectoryVarient1;
