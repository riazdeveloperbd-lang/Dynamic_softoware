import React, { useState } from 'react';
import {
  ArrowLeft,
  Clock,
  Camera,
  ImagePlus,
  Shirt,
  DollarSign,
  Layers,
  Warehouse,
  Barcode,
  CheckCircle2,
  Trash2,
  Save,
  Sparkles,
} from 'lucide-react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

export const ProductEditorVarient1: React.FC<AdminScreenVariantProps> = ({
  primaryColor = '#3730A3',
  isDark = false,
  onNavigate,
}) => {
  const [title, setTitle] = useState('Tailored Pique Polo');
  const [sku, setSku] = useState('POLO-NVY-M');
  const [category, setCategory] = useState('Polos & Tops');
  const [fabric, setFabric] = useState('100% Organic Pima Cotton (220 GSM)');
  const [retailPrice, setRetailPrice] = useState('74.00');
  const [comparePrice, setComparePrice] = useState('90.00');
  const [unitCost, setUnitCost] = useState('24.50');
  const [binLocation, setBinLocation] = useState('Bin B-14');
  const [barcode, setBarcode] = useState('840192837412');
  const [selectedColor, setSelectedColor] = useState('Navy Blue');
  const [sizeStock, setSizeStock] = useState<Record<string, number>>({
    XS: 6,
    S: 10,
    M: 18,
    L: 14,
    XL: 8,
  });
  const [ecoPackaging, setEcoPackaging] = useState(true);
  const [vipExclusive, setVipExclusive] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const bgMain = isDark ? 'bg-[#090D16] text-white' : 'bg-[#F8FAFC] text-[#0F172A]';
  const cardBg = isDark ? 'bg-[#121826] border-slate-800 text-white' : 'bg-white border-slate-200/70 text-[#0F172A]';
  const subBoxBg = isDark ? 'bg-[#1A2234] border-slate-800' : 'bg-[#EEF2FF]/65 border-indigo-100/70';
  const inputBg = isDark
    ? 'bg-slate-800/90 border-slate-700 text-white'
    : 'bg-[#EEF2FF]/60 border-indigo-100/90 text-[#0F172A]';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-500';
  const headerBg = isDark ? 'bg-[#0B0F19]/95 border-slate-800 text-white' : 'bg-white/95 border-slate-100 text-[#0F172A]';

  const totalUnits = Object.values(sizeStock).reduce((a, b) => a + b, 0);
  const marginPct =
    parseFloat(retailPrice) > 0
      ? Math.round(((parseFloat(retailPrice) - parseFloat(unitCost)) / parseFloat(retailPrice)) * 100)
      : 0;

  return (
    <div className={`flex-1 flex flex-col min-h-full select-none ${bgMain}`}>
      {/* Sticky Top Header */}
      <div className={`px-4 py-3 flex items-center justify-between border-b sticky top-0 z-30 backdrop-blur-md ${headerBg}`}>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate && onNavigate('InventoryCatalog')}
            className="p-1.5 -ml-1 rounded-xl hover:bg-slate-500/10 transition"
          >
            <ArrowLeft size={19} strokeWidth={2.3} />
          </button>
          <div className="w-9 h-9 rounded-xl bg-[#0F172A] flex items-center justify-center flex-shrink-0 shadow-xs border border-slate-800">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 5L12 19L20 5H15.5L12 11.5L8.5 5H4Z"
                stroke={primaryColor}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="8" r="1.5" fill="#38BDF8" />
            </svg>
          </div>
          <h1 className="text-[17px] font-extrabold tracking-tight">Add / Edit Product</h1>
        </div>
        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
          alt="Admin"
          className="w-9 h-9 rounded-full object-cover border-2 border-slate-200"
        />
      </div>

      {/* Synced With WMS Strip */}
      <div
        className={`px-4 py-2 flex items-center justify-between text-[11px] border-b ${
          isDark ? 'bg-[#111827] border-slate-800' : 'bg-[#EEF2FF]/75 border-indigo-100/80'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <span className="font-extrabold tracking-wide text-emerald-700 dark:text-emerald-400 uppercase text-[10px]">
            CATALOG STUDIO
          </span>
          <span className={mutedText}>• {sku}</span>
        </div>
        <div className={`flex items-center gap-1 font-bold text-[10px] ${mutedText}`}>
          <Clock size={12} />
          <span>Auto-saved</span>
        </div>
      </div>

      {toast && (
        <div
          className="mx-3.5 mt-2.5 px-3 py-2 rounded-xl text-white text-[11px] font-bold flex items-center justify-between shadow-lg"
          style={{ backgroundColor: primaryColor }}
        >
          <span>{toast}</span>
          <CheckCircle2 size={14} />
        </div>
      )}

      {/* Main Form Body */}
      <div className="p-3.5 space-y-3.5 flex-1">
        {/* 1. Garment Media Gallery Card */}
        <div className={`p-3.5 rounded-2xl border shadow-xs space-y-3 ${cardBg}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera size={17} style={{ color: primaryColor }} />
              <span className="text-[15px] font-extrabold">Garment Media</span>
            </div>
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                isDark ? 'bg-slate-800 text-slate-300' : 'bg-[#EEF2FF] text-slate-700'
              }`}
            >
              3 High-Res Shots
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <div className="relative rounded-xl overflow-hidden aspect-square bg-slate-200 border-2" style={{ borderColor: primaryColor }}>
              <img
                src="https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=180&auto=format&fit=crop&q=80"
                alt="Primary"
                className="w-full h-full object-cover"
              />
              <span
                className="absolute bottom-1 left-1 px-1.5 py-0.2 rounded text-[8px] font-black text-white uppercase"
                style={{ backgroundColor: primaryColor }}
              >
                Main
              </span>
            </div>
            <div className="rounded-xl overflow-hidden aspect-square bg-slate-200">
              <img
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=180&auto=format&fit=crop&q=80"
                alt="Detail"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden aspect-square bg-slate-200">
              <img
                src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=180&auto=format&fit=crop&q=80"
                alt="Back"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => showToast('Media uploader opened')}
              className={`rounded-xl aspect-square border-2 border-dashed flex flex-col items-center justify-center gap-1 ${
                isDark ? 'border-slate-700 bg-slate-800/50' : 'border-indigo-200 bg-[#EEF2FF]/50'
              }`}
              style={{ color: primaryColor }}
            >
              <ImagePlus size={18} />
              <span className="text-[9px] font-extrabold">+ Upload</span>
            </button>
          </div>
        </div>

        {/* 2. Garment Identity & Specifications */}
        <div className={`p-3.5 rounded-2xl border shadow-xs space-y-3 ${cardBg}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shirt size={17} style={{ color: primaryColor }} />
              <span className="text-[15px] font-extrabold">Garment Identity</span>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-extrabold">
              <CheckCircle2 size={11} /> Active SKU
            </span>
          </div>

          <div className="space-y-2.5">
            <div>
              <label className={`text-[10px] font-extrabold uppercase tracking-wider ${mutedText}`}>
                PRODUCT TITLE
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full mt-1 px-3 py-2 rounded-xl text-xs font-bold outline-none border ${inputBg}`}
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className={`text-[10px] font-extrabold uppercase tracking-wider ${mutedText}`}>
                  SKU CODE
                </label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className={`w-full mt-1 px-3 py-2 rounded-xl text-xs font-mono font-bold outline-none border ${inputBg}`}
                />
              </div>
              <div>
                <label className={`text-[10px] font-extrabold uppercase tracking-wider ${mutedText}`}>
                  CATEGORY
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`w-full mt-1 px-3 py-2 rounded-xl text-xs font-bold outline-none border ${inputBg}`}
                />
              </div>
            </div>

            <div>
              <label className={`text-[10px] font-extrabold uppercase tracking-wider ${mutedText}`}>
                FABRIC &amp; MILL COMPOSITION
              </label>
              <input
                type="text"
                value={fabric}
                onChange={(e) => setFabric(e.target.value)}
                className={`w-full mt-1 px-3 py-2 rounded-xl text-xs font-medium outline-none border ${inputBg}`}
              />
            </div>
          </div>
        </div>

        {/* 3. Financial Pricing & Margin Ledger */}
        <div className={`p-3.5 rounded-2xl border shadow-xs space-y-3 ${cardBg}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign size={17} style={{ color: primaryColor }} />
              <span className="text-[15px] font-extrabold">Pricing &amp; Margin</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-extrabold">
              {marginPct}% Gross Margin
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className={`text-[9px] font-extrabold uppercase tracking-wider ${mutedText}`}>
                RETAIL ($)
              </label>
              <input
                type="text"
                value={retailPrice}
                onChange={(e) => setRetailPrice(e.target.value)}
                className={`w-full mt-1 px-2.5 py-2 rounded-xl text-xs font-extrabold outline-none border ${inputBg}`}
              />
            </div>
            <div>
              <label className={`text-[9px] font-extrabold uppercase tracking-wider ${mutedText}`}>
                COMPARE AT ($)
              </label>
              <input
                type="text"
                value={comparePrice}
                onChange={(e) => setComparePrice(e.target.value)}
                className={`w-full mt-1 px-2.5 py-2 rounded-xl text-xs font-bold outline-none border ${inputBg}`}
              />
            </div>
            <div>
              <label className={`text-[9px] font-extrabold uppercase tracking-wider ${mutedText}`}>
                UNIT COST ($)
              </label>
              <input
                type="text"
                value={unitCost}
                onChange={(e) => setUnitCost(e.target.value)}
                className={`w-full mt-1 px-2.5 py-2 rounded-xl text-xs font-bold outline-none border ${inputBg}`}
              />
            </div>
          </div>
        </div>

        {/* 4. Size Matrix & Colorway Stock */}
        <div className={`p-3.5 rounded-2xl border shadow-xs space-y-3 ${cardBg}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers size={17} style={{ color: primaryColor }} />
              <span className="text-[15px] font-extrabold">Size &amp; Color Matrix</span>
            </div>
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                isDark ? 'bg-slate-800 text-slate-300' : 'bg-[#EEF2FF] text-slate-700'
              }`}
            >
              {totalUnits} Total Units
            </span>
          </div>

          {/* Colorway Selector */}
          <div className="flex items-center gap-2">
            {[
              { name: 'Navy Blue', hex: '#1E293B' },
              { name: 'Sand Beige', hex: '#D6C7B2' },
              { name: 'Emerald', hex: '#065F46' },
            ].map((c) => {
              const active = selectedColor === c.name;
              return (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-extrabold flex items-center gap-1.5 transition ${
                    active ? 'border-2 shadow-2xs' : 'border-transparent opacity-75'
                  } ${subBoxBg}`}
                  style={active ? { borderColor: primaryColor } : undefined}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-black/10"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Size Quantities */}
          <div className="grid grid-cols-5 gap-2">
            {Object.entries(sizeStock).map(([size, qty]) => (
              <div
                key={size}
                className={`p-2 rounded-xl border text-center space-y-1 ${subBoxBg}`}
              >
                <div className="text-[10px] font-black" style={{ color: primaryColor }}>
                  {size}
                </div>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) =>
                    setSizeStock({
                      ...sizeStock,
                      [size]: Math.max(0, parseInt(e.target.value || '0', 10)),
                    })
                  }
                  className="w-full text-center bg-transparent text-xs font-extrabold outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 5. Warehouse Logistics & Packaging */}
        <div className={`p-3.5 rounded-2xl border shadow-xs space-y-3 ${cardBg}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Warehouse size={17} style={{ color: primaryColor }} />
              <span className="text-[15px] font-extrabold">WMS Bin &amp; Fulfillment</span>
            </div>
            <span
              className="px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider bg-indigo-500/15"
              style={{ color: primaryColor }}
            >
              AUSTIN HUB #04
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className={`text-[10px] font-extrabold uppercase tracking-wider ${mutedText}`}>
                STORAGE BIN ID
              </label>
              <input
                type="text"
                value={binLocation}
                onChange={(e) => setBinLocation(e.target.value)}
                className={`w-full mt-1 px-3 py-2 rounded-xl text-xs font-extrabold outline-none border ${inputBg}`}
              />
            </div>
            <div>
              <label className={`text-[10px] font-extrabold uppercase tracking-wider ${mutedText}`}>
                EAN / UPC BARCODE
              </label>
              <input
                type="text"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                className={`w-full mt-1 px-3 py-2 rounded-xl text-xs font-mono font-bold outline-none border ${inputBg}`}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
              <input
                type="checkbox"
                checked={ecoPackaging}
                onChange={(e) => setEcoPackaging(e.target.checked)}
                className="w-4 h-4 rounded accent-indigo-600"
              />
              <span>Eco-Friendly Garment Bag</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
              <input
                type="checkbox"
                checked={vipExclusive}
                onChange={(e) => setVipExclusive(e.target.checked)}
                className="w-4 h-4 rounded accent-indigo-600"
              />
              <span>Gold VIP Early Access</span>
            </label>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div
        className={`p-3.5 border-t flex items-center gap-2.5 sticky bottom-0 z-20 ${
          isDark ? 'bg-[#0B0F19]/95 border-slate-800' : 'bg-white/95 border-slate-200/80'
        }`}
      >
        <button
          onClick={() => {
            showToast('Draft discarded');
            if (onNavigate) onNavigate('InventoryCatalog');
          }}
          className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isDark ? 'bg-slate-800 text-rose-400' : 'bg-rose-50 text-rose-600'
          }`}
        >
          <Trash2 size={18} />
        </button>
        <button
          onClick={() => {
            showToast('Product published & synced with WMS!');
            setTimeout(() => {
              if (onNavigate) onNavigate('InventoryCatalog');
            }, 900);
          }}
          style={{ backgroundColor: primaryColor }}
          className="flex-1 py-3 rounded-xl text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition"
        >
          <Save size={15} />
          <span>Save &amp; Publish SKU</span>
        </button>
      </div>
    </div>
  );
};

export default ProductEditorVarient1;
