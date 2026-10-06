import React from 'react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const POSCashierVarient4: React.FC<AdminScreenVariantProps> = ({
  primaryColor = '#4338CA',
}) => {
  return (
    <div className="space-y-3 p-4 min-h-full bg-[#090D16] text-white">
      <div>
        <span
          className="text-[10px] font-extrabold uppercase tracking-wider"
          style={{ color: primaryColor }}
        >
          POS CASHIER • V4: DARK POS
        </span>
        <h2 className="text-lg font-extrabold">Flagship Night Register</h2>
      </div>
      <div className="p-4 rounded-2xl border border-slate-800 bg-[#121826] space-y-3">
        <div className="flex justify-between text-xs">
          <span>Tailored Wool Blazer (Espresso, L)</span>
          <span className="font-extrabold">$320.00</span>
        </div>
        <div className="flex justify-between text-xs">
          <span>Cashmere Ribbed Beanie (Charcoal)</span>
          <span className="font-extrabold">$65.00</span>
        </div>
        <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-black">
          <span>VIP Total:</span>
          <span style={{ color: primaryColor }}>$385.00</span>
        </div>
        <button
          style={{ backgroundColor: primaryColor }}
          className="w-full py-2.5 rounded-xl text-center text-xs font-extrabold text-white"
        >
          Settle Apple Pay ($385.00)
        </button>
      </div>
    </div>
  );
};

export default POSCashierVarient4;
