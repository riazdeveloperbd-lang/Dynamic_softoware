import React, { useState } from 'react';
import {
  RefreshCw,
  Bell,
  ChevronDown,
  Search,
  QrCode,
  Plus,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Edit3,
  PackagePlus,
  Barcode,
  Warehouse,
  Layers,
  Tag,
} from 'lucide-react';

export interface AdminScreenVariantProps {
  primaryColor?: string;
  isDark?: boolean;
  onNavigate?: (screen: any) => void;
}

interface CatalogProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: string;
  compareAt?: string;
  stock: number;
  bin: string;
  sizes: Array<{ size: string; qty: number }>;
  img: string;
}

const INITIAL_PRODUCTS: CatalogProduct[] = [
  {
    id: 'prod-1',
    name: 'Tailored Pique Polo',
    sku: 'POLO-NVY-M',
    category: 'Polos & Tops',
    price: '$74.00',
    compareAt: '$90.00',
    stock: 42,
    bin: 'Bin B-14',
    sizes: [
      { size: 'S', qty: 10 },
      { size: 'M', qty: 18 },
      { size: 'L', qty: 14 },
    ],
    img: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'prod-2',
    name: 'Stretch Slim Chino',
    sku: 'CHN-BGE-32',
    category: 'Trousers',
    price: '$110.00',
    stock: 28,
    bin: 'Bin D-03',
    sizes: [
      { size: '30/30', qty: 6 },
      { size: '32/30', qty: 14 },
      { size: '34/32', qty: 8 },
    ],
    img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'prod-3',
    name: 'Cashmere Ribbed Beanie',
    sku: 'SKU-8841',
    category: 'Accessories',
    price: '$65.00',
    stock: 0,
    bin: 'Bin A-02',
    sizes: [{ size: 'OS', qty: 0 }],
    img: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'prod-4',
    name: 'Silk Relaxed Resort Shirt',
    sku: 'SKU-3104',
    category: 'Shirts',
    price: '$185.00',
    stock: 3,
    bin: 'Bin C-09',
    sizes: [
      { size: 'S', qty: 1 },
      { size: 'M', qty: 2 },
      { size: 'L', qty: 0 },
    ],
    img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=150&auto=format&fit=crop&q=80',
  },
];

export const InventoryCatalogVarient1: React.FC<AdminScreenVariantProps> = ({
  primaryColor = '#3730A3',
  isDark = false,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'In Stock' | 'Low Stock' | 'Out'>('All');
  const [products, setProducts] = useState<CatalogProduct[]>(INITIAL_PRODUCTS);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const handleQuickRestock = (id: string, name: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: p.stock + 25 } : p))
    );
    showToast(`+25 units restocked for ${name}`);
  };

  const bgMain = isDark ? 'bg-[#090D16] text-white' : 'bg-[#F8FAFC] text-[#0F172A]';
  const cardBg = isDark ? 'bg-[#121826] border-slate-800 text-white' : 'bg-white border-slate-200/70 text-[#0F172A]';
  const subBoxBg = isDark ? 'bg-[#1A2234] border-slate-800' : 'bg-[#EEF2FF]/60 border-indigo-100/60';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-500';
  const headerBg = isDark ? 'bg-[#0B0F19]/95 border-slate-800 text-white' : 'bg-white/95 border-slate-100 text-[#0F172A]';

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.bin.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === 'In Stock') return p.stock > 5;
    if (activeTab === 'Low Stock') return p.stock > 0 && p.stock <= 5;
    if (activeTab === 'Out') return p.stock === 0;
    return true;
  });

  return (
    <div className={`flex-1 flex flex-col min-h-full select-none ${bgMain}`}>
      {/* Sticky Top Header */}
      <div className={`px-4 py-3 flex items-center justify-between border-b sticky top-0 z-30 backdrop-blur-md ${headerBg}`}>
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#0F172A] flex items-center justify-center flex-shrink-0 shadow-xs border border-slate-800">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
          <div className="min-w-0">
            <div
              className="flex items-center gap-1 text-[10px] font-extrabold tracking-wider uppercase"
              style={{ color: primaryColor }}
            >
              <span>CATALOG &amp; WMS</span>
              <ChevronDown size={11} strokeWidth={2.5} />
            </div>
            <h1 className="text-[16px] font-extrabold tracking-tight truncate">Products &amp; Stock</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onNavigate && onNavigate('ProductEditor')}
            style={{ backgroundColor: primaryColor }}
            className="px-3 py-2 rounded-xl text-white text-[11px] font-extrabold flex items-center gap-1 shadow-xs hover:opacity-95 transition"
          >
            <Plus size={14} strokeWidth={2.5} />
            <span>Add SKU</span>
          </button>
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
            alt="Admin"
            className="w-9 h-9 rounded-full object-cover border-2 border-slate-200"
          />
        </div>
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
            LIVE STOCK LEDGER
          </span>
          <span className={mutedText}>• 1,284 Active SKUs</span>
        </div>
        <button
          onClick={() => showToast('WMS inventory synced')}
          className="flex items-center gap-1 font-extrabold text-[10px]"
          style={{ color: primaryColor }}
        >
          <RefreshCw size={11} />
          <span>Sync Bin</span>
        </button>
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

      <div className="p-3.5 space-y-3.5 flex-1">
        {/* KPI Summary Strip */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className={`p-3 rounded-2xl border shadow-xs ${cardBg}`}>
            <span className={`text-[9px] font-extrabold uppercase tracking-wider ${mutedText}`}>
              TOTAL VALUE
            </span>
            <div className="text-[16px] font-black mt-0.5" style={{ color: primaryColor }}>
              $148.2K
            </div>
            <span className="text-[10px] font-bold text-emerald-600">+8.4% MoM</span>
          </div>
          <div className={`p-3 rounded-2xl border shadow-xs ${cardBg}`}>
            <span className={`text-[9px] font-extrabold uppercase tracking-wider ${mutedText}`}>
              LOW STOCK
            </span>
            <div className="text-[16px] font-black text-amber-600 mt-0.5">14 SKUs</div>
            <span className={`text-[10px] font-medium ${mutedText}`}>Below 5 units</span>
          </div>
          <div className={`p-3 rounded-2xl border shadow-xs ${cardBg}`}>
            <span className={`text-[9px] font-extrabold uppercase tracking-wider ${mutedText}`}>
              OUT OF STOCK
            </span>
            <div className="text-[16px] font-black text-rose-600 mt-0.5">3 SKUs</div>
            <span className={`text-[10px] font-medium ${mutedText}`}>PO Pending</span>
          </div>
        </div>

        {/* Search & Barcode Scanner Input */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-2xl border ${cardBg}`}>
          <Search size={16} className={mutedText} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search garment title, SKU, or Bin ID..."
            className="flex-1 bg-transparent text-xs font-medium outline-none"
          />
          <button
            onClick={() => onNavigate && onNavigate('POSCashier')}
            className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center"
            style={{ color: primaryColor }}
          >
            <QrCode size={16} />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'All', count: products.length },
            { id: 'In Stock', count: products.filter((p) => p.stock > 5).length },
            { id: 'Low Stock', count: products.filter((p) => p.stock > 0 && p.stock <= 5).length },
            { id: 'Out', count: products.filter((p) => p.stock === 0).length },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 flex-shrink-0 transition ${
                  active
                    ? 'text-white shadow-xs'
                    : isDark
                    ? 'bg-slate-800 text-slate-300'
                    : 'bg-[#EEF2FF]/80 text-slate-700'
                }`}
                style={active ? { backgroundColor: primaryColor } : undefined}
              >
                <span>{tab.id}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    active ? 'bg-white/20 text-white' : 'bg-indigo-500/15'
                  }`}
                  style={!active ? { color: primaryColor } : undefined}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Product Manifest Cards */}
        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <div key={product.id} className={`p-3.5 rounded-2xl border shadow-xs space-y-3 ${cardBg}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="relative flex-shrink-0">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-15 h-15 rounded-xl object-cover bg-slate-200"
                    />
                    <span
                      className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md text-[9px] font-black text-white shadow-xs"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {product.bin.replace('Bin ', '')}
                    </span>
                  </div>
                  <div className="min-w-0 space-y-1">
                    <div className="text-[14px] font-extrabold truncate">{product.name}</div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-extrabold ${
                          isDark ? 'bg-slate-800 text-slate-300' : 'bg-[#EEF2FF] text-slate-700'
                        }`}
                      >
                        {product.sku}
                      </span>
                      <span className={`text-[11px] font-medium ${mutedText}`}>
                        {product.category}
                      </span>
                    </div>
                    {product.stock === 0 ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-600 text-[10px] font-extrabold">
                        <AlertTriangle size={11} /> Out of Stock ({product.bin})
                      </span>
                    ) : product.stock <= 5 ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-600 text-[10px] font-extrabold">
                        <AlertTriangle size={11} /> Low Stock: {product.stock} left ({product.bin})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-extrabold">
                        <CheckCircle2 size={11} /> {product.stock} In Stock ({product.bin})
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-[15px] font-black">{product.price}</div>
                  {product.compareAt && (
                    <div className={`text-[10px] line-through ${mutedText}`}>
                      {product.compareAt}
                    </div>
                  )}
                </div>
              </div>

              {/* Size Breakdown Pill Row */}
              <div className={`p-2.5 rounded-xl border flex items-center justify-between ${subBoxBg}`}>
                <span className={`text-[10px] font-extrabold uppercase tracking-wider ${mutedText}`}>
                  SIZE MATRIX
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {product.sizes.map((s) => (
                    <span
                      key={s.size}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                        s.qty === 0
                          ? 'bg-rose-500/15 text-rose-600'
                          : isDark
                          ? 'bg-slate-800 text-slate-200'
                          : 'bg-white text-slate-800 shadow-2xs'
                      }`}
                    >
                      {s.size}: {s.qty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onNavigate && onNavigate('ProductEditor')}
                  className={`py-2 rounded-xl text-[11px] font-extrabold flex items-center justify-center gap-1.5 ${
                    isDark ? 'bg-slate-800 text-slate-200' : 'bg-[#EEF2FF] text-slate-800'
                  }`}
                >
                  <Edit3 size={13} />
                  <span>Edit Product</span>
                </button>
                <button
                  onClick={() => handleQuickRestock(product.id, product.name)}
                  style={{ backgroundColor: primaryColor }}
                  className="py-2 rounded-xl text-[11px] font-extrabold text-white flex items-center justify-center gap-1.5 shadow-xs hover:opacity-95 transition"
                >
                  <PackagePlus size={13} />
                  <span>Quick Restock +25</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryCatalogVarient1;
