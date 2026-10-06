import React from 'react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const InventoryCatalogVarient3: React.FC<AdminScreenVariantProps> = ({
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
            VOGUEOPS INVENTORY • V3: WAREHOUSE MATRIX
          </span>
          <h2 className="text-lg font-extrabold">Bin &amp; Zone Matrix</h2>
        </div>
        <button
          onClick={() => onNavigate && onNavigate('ProductEditor')}
          style={{ backgroundColor: primaryColor }}
          className="px-3 py-1.5 rounded-xl text-[11px] font-extrabold text-white shadow-xs"
        >
          + Assign Bin
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {[
          { bin: 'BIN A-08', name: 'Slogan Graphic Tee', units: 3, zone: 'Zone 01' },
          { bin: 'BIN B-14', name: 'Regular Fit Polo', units: 28, zone: 'Zone 01' },
          { bin: 'BIN D-03', name: 'Stretch Chino', units: 19, zone: 'Zone 02' },
          { bin: 'BIN K-09', name: 'Nappa Leather Jacket', units: 8, zone: 'Vault' },
        ].map((item, idx) => (
          <div key={idx} className={`p-3 rounded-2xl border space-y-2 ${cardSurface}`}>
            <div className="flex items-center justify-between">
              <span
                className="px-2 py-0.5 rounded text-[10px] font-mono font-extrabold text-white"
                style={{ backgroundColor: primaryColor }}
              >
                {item.bin}
              </span>
              <span className={`text-[10px] font-bold ${mutedText}`}>{item.zone}</span>
            </div>
            <div className="text-xs font-extrabold truncate">{item.name}</div>
            <div className="text-[11px] font-bold text-emerald-600">{item.units} units verified</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryCatalogVarient3;
