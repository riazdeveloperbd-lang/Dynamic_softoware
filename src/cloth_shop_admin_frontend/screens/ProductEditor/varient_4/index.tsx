import React from 'react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const ProductEditorVarient4: React.FC<AdminScreenVariantProps> = ({
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
            PRODUCT EDITOR • V4: BULK EDITOR
          </span>
          <h2 className="text-lg font-extrabold">Batch Price &amp; Stock Sync</h2>
        </div>
        <button
          onClick={() => onNavigate && onNavigate('InventoryCatalog')}
          className="text-xs font-bold"
          style={{ color: primaryColor }}
        >
          Done
        </button>
      </div>
      <div className={`p-4 rounded-2xl border shadow-xs space-y-3 ${cardSurface}`}>
        {[
          { sku: 'SKU-8841', name: 'Cashmere Beanie', price: '$65.00', qty: '+50' },
          { sku: 'SKU-2209', name: 'Slogan Graphic Tee', price: '$45.00', qty: '+25' },
          { sku: 'SKU-3104', name: 'Silk Relaxed Shirt', price: '$185.00', qty: '+30' },
        ].map((item) => (
          <div key={item.sku} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-200/40">
            <div>
              <div className="font-extrabold">{item.name}</div>
              <div className={`text-[10px] ${mutedText}`}>{item.sku}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{item.price}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600 font-extrabold">
                {item.qty}
              </span>
            </div>
          </div>
        ))}
        <button
          onClick={() => onNavigate && onNavigate('InventoryCatalog')}
          style={{ backgroundColor: primaryColor }}
          className="w-full py-2.5 rounded-xl text-center text-xs font-extrabold text-white shadow-xs"
        >
          Commit Bulk Changes (3 SKUs)
        </button>
      </div>
    </div>
  );
};

export default ProductEditorVarient4;
