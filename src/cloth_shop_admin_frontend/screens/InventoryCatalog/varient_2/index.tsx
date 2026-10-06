import React from 'react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const InventoryCatalogVarient2: React.FC<AdminScreenVariantProps> = ({
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
            VOGUEOPS INVENTORY • V2: DEFICIT TRIAGE
          </span>
          <h2 className="text-lg font-extrabold">Stock Deficit Queue</h2>
        </div>
        <button
          onClick={() => onNavigate && onNavigate('ProductEditor')}
          style={{ backgroundColor: primaryColor }}
          className="px-3 py-1.5 rounded-xl text-[11px] font-extrabold text-white shadow-xs"
        >
          + Auto-PO
        </button>
      </div>
      <div className="space-y-2.5">
        {[
          {
            name: 'Cashmere Ribbed Beanie',
            sku: 'SKU-8841 • Zone A-02',
            stock: 0,
            reorderQty: '+50 PO',
            img: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=120&auto=format&fit=crop&q=80',
          },
          {
            name: 'Silk Relaxed Shirt',
            sku: 'SKU-3104 • Zone B-11',
            stock: 2,
            reorderQty: '+25 PO',
            img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=120&auto=format&fit=crop&q=80',
          },
          {
            name: 'Slogan Graphic Tee',
            sku: 'SKU-2209 • Zone A-08',
            stock: 3,
            reorderQty: '+25 PO',
            img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=120&auto=format&fit=crop&q=80',
          },
        ].map((p, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-2xl border shadow-xs flex items-center justify-between gap-2.5 ${cardSurface}`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={p.img}
                alt={p.name}
                className="w-11 h-11 rounded-xl object-cover bg-slate-100 flex-shrink-0"
              />
              <div className="min-w-0">
                <div className="text-xs font-extrabold truncate">{p.name}</div>
                <div className={`text-[10px] font-medium truncate ${mutedText}`}>{p.sku}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[10px] px-2 py-0.5 rounded-full font-extrabold bg-rose-500/15 text-rose-600">
                {p.stock} left
              </span>
              <button
                style={{ backgroundColor: primaryColor }}
                className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold text-white"
              >
                {p.reorderQty}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryCatalogVarient2;
