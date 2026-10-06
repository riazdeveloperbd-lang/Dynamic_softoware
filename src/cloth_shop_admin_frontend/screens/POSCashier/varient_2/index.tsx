import React from 'react';
import { ScanBarcode } from 'lucide-react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const POSCashierVarient2: React.FC<AdminScreenVariantProps> = ({
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
          POS CASHIER • V2: CAMERA SCANNER
        </span>
        <h2 className="text-lg font-extrabold">Live Optical Barcode Reader</h2>
      </div>
      <div className="h-44 rounded-2xl bg-[#0F172A] text-white flex flex-col items-center justify-center gap-2 border border-slate-800">
        <ScanBarcode size={36} style={{ color: primaryColor }} />
        <span className="text-xs font-extrabold">Camera Ready • Align Hangtag</span>
        <span className="text-[10px] text-slate-400 font-mono">SKU-2209 Detected ($45.00)</span>
      </div>
      <div className={`p-3.5 rounded-2xl border flex items-center justify-between ${cardSurface}`}>
        <span className="text-xs font-extrabold">Instant Tap-to-Pay Ready</span>
        <button
          style={{ backgroundColor: primaryColor }}
          className="px-4 py-2 rounded-xl text-xs font-extrabold text-white"
        >
          Charge $45.00
        </button>
      </div>
    </div>
  );
};

export default POSCashierVarient2;
