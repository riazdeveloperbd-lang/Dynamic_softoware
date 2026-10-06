import React from 'react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const POSCashierVarient3: React.FC<AdminScreenVariantProps> = ({
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
          POS CASHIER • V3: QUICK KEYPAD
        </span>
        <h2 className="text-lg font-extrabold">Express Terminal Keypad</h2>
      </div>
      <div className={`p-4 rounded-2xl border text-right ${cardSurface}`}>
        <div className="text-[10px] font-bold text-slate-400">CUSTOM SALE AMOUNT</div>
        <div className="text-2xl font-black mt-1" style={{ color: primaryColor }}>
          $320.00
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '00'].map((k) => (
          <button
            key={k}
            className={`py-3 rounded-xl border text-sm font-extrabold ${cardSurface}`}
          >
            {k}
          </button>
        ))}
      </div>
      <button
        style={{ backgroundColor: primaryColor }}
        className="w-full py-2.5 rounded-xl text-center text-xs font-extrabold text-white"
      >
        Charge Terminal ($320.00)
      </button>
    </div>
  );
};

export default POSCashierVarient3;
