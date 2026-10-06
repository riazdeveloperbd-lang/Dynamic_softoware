import React from 'react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const POSCashierVarient1: React.FC<AdminScreenVariantProps> = ({
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
          POS CASHIER • V1: REGISTER CART
        </span>
        <h2 className="text-lg font-extrabold">Barcode Scanner &amp; POS</h2>
      </div>
      <div className={`p-4 rounded-2xl border shadow-xs space-y-3 ${cardSurface}`}>
        <div className={`text-xs font-extrabold uppercase ${mutedText}`}>
          Active Register Cart (2 items)
        </div>
        <div className="space-y-2 text-xs font-semibold">
          <div className="flex justify-between">
            <span>Slogan Graphic Tee (Navy, L) x 1</span>
            <span className="font-bold">$45.00</span>
          </div>
          <div className="flex justify-between">
            <span>Silk Relaxed Shirt (Off-White, M) x 1</span>
            <span className="font-bold">$185.00</span>
          </div>
        </div>
        <div
          className="pt-2 border-t border-slate-200/30 flex justify-between font-black text-sm"
          style={{ color: primaryColor }}
        >
          <span>Total Due:</span>
          <span>$230.00</span>
        </div>
        <button
          style={{ backgroundColor: primaryColor }}
          className="w-full py-2.5 rounded-xl text-center text-xs font-extrabold text-white"
        >
          Complete POS Checkout ($230.00)
        </button>
      </div>
    </div>
  );
};

export default POSCashierVarient1;
