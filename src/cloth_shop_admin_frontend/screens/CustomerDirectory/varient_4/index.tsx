import React from 'react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const CustomerDirectoryVarient4: React.FC<AdminScreenVariantProps> = ({
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
          CUSTOMER DIRECTORY • V4: COMPACT CRM
        </span>
        <h2 className="text-lg font-extrabold">Fast Lookup Directory</h2>
      </div>
      <div className={`rounded-2xl border divide-y divide-slate-200/40 ${cardSurface}`}>
        {[
          { name: 'Sophia Loren', phone: '+1 (555) 234-8910', tag: 'Platinum' },
          { name: 'Marcus Vance', phone: '+1 (555) 891-4412', tag: 'Gold' },
          { name: 'Elena Rostova', phone: '+1 (555) 390-1120', tag: 'Platinum' },
          { name: 'David Chen', phone: '+1 (555) 771-9021', tag: 'Member' },
        ].map((c, i) => (
          <div key={i} className="p-3 flex items-center justify-between text-xs">
            <span className="font-extrabold">{c.name}</span>
            <span className="font-mono text-[10px]">{c.phone}</span>
            <span className="font-bold" style={{ color: primaryColor }}>
              {c.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDirectoryVarient4;
