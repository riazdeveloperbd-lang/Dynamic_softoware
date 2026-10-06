import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const ProductEditorVarient2: React.FC<AdminScreenVariantProps> = ({
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
            PRODUCT EDITOR • V2: SPLIT STUDIO
          </span>
          <h2 className="text-lg font-extrabold">Media &amp; Size Matrix</h2>
        </div>
        <button
          onClick={() => onNavigate && onNavigate('InventoryCatalog')}
          className="text-xs font-bold"
          style={{ color: primaryColor }}
        >
          Back
        </button>
      </div>
      <div className={`p-4 rounded-2xl border shadow-xs space-y-3 ${cardSurface}`}>
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=120&auto=format&fit=crop&q=80"
            alt="Preview"
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div className="flex-1">
            <label className={`text-[10px] font-extrabold uppercase ${mutedText}`}>
              Apparel Name
            </label>
            <TextInput style={styles.input} defaultValue="Silk Relaxed Shirt" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
          {['S (12)', 'M (24)', 'L (18)', 'XL (8)'].map((sz) => (
            <div
              key={sz}
              className="py-2 rounded-xl border"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              {sz}
            </div>
          ))}
        </div>
        <button
          onClick={() => onNavigate && onNavigate('InventoryCatalog')}
          style={{ backgroundColor: primaryColor }}
          className="w-full py-2.5 rounded-xl text-center text-xs font-extrabold text-white shadow-xs"
        >
          Save Split Matrix
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

export default ProductEditorVarient2;
