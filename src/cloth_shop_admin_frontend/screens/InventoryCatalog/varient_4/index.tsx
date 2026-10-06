import React from 'react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const InventoryCatalogVarient4: React.FC<AdminScreenVariantProps> = ({
  primaryColor = '#4338CA',
  isDark = false,
  onNavigate,
}) => {
  const screenBg = isDark ? 'bg-[#090D16] text-white' : 'bg-[#F8FAFC] text-[#0F172A]';
  const cardSurface = isDark
    ? 'bg-[#121826] border-slate-800 text-white'
    : 'bg-white border-slate-200/80 text-[#0F172A]';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className={`space-y-3 p-4 min-h-full ${screenBg}`}>
      <div className="flex items-center justify-between">
        <div>
          <span
            className="text-[10px] font-extrabold uppercase tracking-wider"
            style={{ color: primaryColor }}
          >
            VOGUEOPS INVENTORY • V4: COMPACT LIST
          </span>
          <h2 className="text-lg font-extrabold">Compact SKU Ledger</h2>
        </div>
        <button
          onClick={() => onNavigate && onNavigate('ProductEditor')}
          style={{ backgroundColor: primaryColor }}
          className="px-3 py-1.5 rounded-xl text-[11px] font-extrabold text-white shadow-xs"
        >
          + Quick SKU
        </button>
      </div>
      <div className={`rounded-2xl border divide-y divide-slate-200/40 ${cardSurface}`}>
        {[
          { sku: 'SKU-8841', name: 'Cashmere Ribbed Beanie', price: '$65', stock: 0 },
          { sku: 'SKU-2209', name: 'Slogan Graphic Tee', price: '$45', stock: 3 },
          { sku: 'SKU-3104', name: 'Silk Relaxed Shirt', price: '$185', stock: 2 },
          { sku: 'SKU-1094', name: 'Tailored Wool Blazer', price: '$320', stock: 42 },
          { sku: 'SKU-5510', name: 'Denim Oversized Jacket', price: '$110', stock: 18 },
        ].map((row, idx) => (
          <div key={idx} className="p-3 flex items-center justify-between text-xs">
            <div>
              <span className="font-mono text-[10px] font-bold mr-2" style={{ color: primaryColor }}>
                {row.sku}
              </span>
              <span className="font-extrabold">{row.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className={mutedText}>{row.price}</span>
              <span className="font-extrabold">{row.stock} pcs</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryCatalogVarient4;
