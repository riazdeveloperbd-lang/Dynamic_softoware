import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const ProductEditorVarient3: React.FC<AdminScreenVariantProps> = ({
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
            PRODUCT EDITOR • V3: QUICK SKU
          </span>
          <h2 className="text-lg font-extrabold">Express Barcode SKU</h2>
        </div>
        <button
          onClick={() => onNavigate && onNavigate('InventoryCatalog')}
          className="text-xs font-bold"
          style={{ color: primaryColor }}
        >
          Cancel
        </button>
      </div>
      <div className={`p-4 rounded-2xl border shadow-xs space-y-3 ${cardSurface}`}>
        <div>
          <label className={`text-[10px] font-extrabold uppercase ${mutedText}`}>
            Barcode / SKU Code
          </label>
          <TextInput style={styles.input} defaultValue="SKU-8841-CH-OS" />
        </div>
        <div>
          <label className={`text-[10px] font-extrabold uppercase ${mutedText}`}>
            Warehouse Bin Location
          </label>
          <TextInput style={styles.input} defaultValue="Zone 01 • Bin A-08" />
        </div>
        <button
          onClick={() => onNavigate && onNavigate('InventoryCatalog')}
          style={{ backgroundColor: primaryColor }}
          className="w-full py-2.5 rounded-xl text-center text-xs font-extrabold text-white shadow-xs"
        >
          Register Instant SKU
        </button>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 10,
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
});

export default ProductEditorVarient3;
