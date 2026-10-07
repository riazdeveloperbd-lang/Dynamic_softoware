import React, { useState } from 'react';
import {
  ArrowRight,
  FolderTree,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import {
  getAdminThemeScopeStyle,
  useAdminDesignSystem,
} from '../../../styles/adminDesignSystem';

export interface InventoryVarient1Props {
  variant?:
    | 'varient_1'
    | 'varient_2'
    | 'varient_3'
    | 'varient_4'
    | 'varient_5'
    | 'varient_6'
    | 'varient_7'
    | 'varient_8';
  onOpenSkuBreakdown?: (skuId?: string) => void;
  onOpenStoreTaxonomy?: () => void;
  onOpenCreateCategory?: () => void;
  onTriggerToast?: (msg: string) => void;
}

type CategoryTab = 'All' | 'Tshirts' | 'Jeans' | 'Shoes';

interface SkuCatalogItem {
  id: string;
  title: string;
  category: CategoryTab;
  price: string;
  discountBadge?: string;
  stockCount: number;
  stockLabel: string;
  imageUrl: string;
}

const INITIAL_SKUS: SkuCatalogItem[] = [
  {
    id: 'sku_slogan',
    title: 'Regular Fit Slogan',
    category: 'Tshirts',
    price: '$1,190',
    stockCount: 142,
    stockLabel: '142 in stock',
    imageUrl:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'sku_polo',
    title: 'Regular Fit Polo',
    category: 'Tshirts',
    price: '$1,100',
    discountBadge: '-52%',
    stockCount: 8,
    stockLabel: '8 left',
    imageUrl:
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'sku_black',
    title: 'Regular Fit Black',
    category: 'Tshirts',
    price: '$1,690',
    stockCount: 41,
    stockLabel: '41 in stock',
    imageUrl:
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'sku_vneck',
    title: 'Regular Fit V-Neck',
    category: 'Tshirts',
    price: '$1,290',
    discountBadge: '0 stock',
    stockCount: 0,
    stockLabel: 'Out of stock',
    imageUrl:
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=400&q=80',
  },
];

export const InventoryVarient1: React.FC<InventoryVarient1Props> = ({
  variant = 'varient_1',
  onOpenSkuBreakdown,
  onOpenStoreTaxonomy,
  onOpenCreateCategory,
  onTriggerToast,
}) => {
  const { palette, activeFont, isDark, colorPresetId } = useAdminDesignSystem();
  const [selectedCategory, setSelectedCategory] = useState<CategoryTab>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const visibleSkus = INITIAL_SKUS.filter((item) => {
    const matchesCat =
      selectedCategory === 'All' ? true : item.category === selectedCategory;
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div
      className="admin-theme-scope px-5 pt-2 pb-6 space-y-4 bg-white text-[#1A1A1A] relative"
      style={getAdminThemeScopeStyle(palette, activeFont)}
      data-admin-dark={isDark ? 'true' : 'false'}
      data-admin-preset={colorPresetId}
    >
      {/* 1. CLOTH SHOP DISCOVER SEARCH BAR + SQUARE FILTER BUTTON (Exact Image 1 Pattern) */}
      <div className="flex items-center gap-2.5">
        <div className="flex-1 h-[48px] rounded-[10px] border border-[#E6E6E6] bg-white px-3.5 flex items-center gap-2.5">
          <Search size={18} className="text-[#999999] flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for clothes, SKUs..."
            className="w-full text-[14px] text-[#1A1A1A] placeholder-[#999999] bg-transparent focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-[#999999] cursor-pointer"
            >
              <X size={15} />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            if (onOpenStoreTaxonomy) {
              onOpenStoreTaxonomy();
            } else {
              onTriggerToast?.('Opened Store Taxonomy & Filters');
            }
          }}
          className="w-[48px] h-[48px] rounded-[10px] bg-[#1A1A1A] text-white flex items-center justify-center flex-shrink-0 cursor-pointer hover:opacity-95 transition"
          title="Store Taxonomy & Categories"
        >
          <SlidersHorizontal size={18} />
        </button>
      </div>

      {/* 2. CLOTH SHOP CATEGORY PILLS (Exact Image 1: All | Tshirts | Jeans | Shoes) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {(['All', 'Tshirts', 'Jeans', 'Shoes'] as CategoryTab[]).map((cat) => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`h-[36px] px-4 rounded-[10px] text-[13px] transition cursor-pointer flex-shrink-0 ${
                active
                  ? 'bg-[#1A1A1A] text-white font-semibold'
                  : 'bg-white border border-[#E6E6E6] text-[#1A1A1A] font-medium hover:bg-[#F7F7F7]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* 3. SKU CATALOG CARDS (V1: 2-Col Discover Grid | V2: Horizontal MyCart Stock Cards | V3: Compact Bin Ledger) */}
      {variant === 'varient_2' ? (
        <div className="space-y-3.5 pt-1">
          {visibleSkus.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenSkuBreakdown?.(item.id)}
              className="p-[14px] rounded-[12px] border border-[#E6E6E6] bg-white flex gap-[14px] cursor-pointer hover:border-[#1A1A1A] transition"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-[82px] h-[82px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
              />
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[15px] font-bold text-[#1A1A1A] truncate">
                      {item.title}
                    </div>
                    <div className="text-[13px] text-[#808080] mt-0.5 truncate">
                      {item.category} • {item.stockLabel}
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-[6px] text-[11px] font-semibold flex-shrink-0 ${
                      item.stockCount === 0
                        ? 'bg-[#FEECEB] text-[#ED1010]'
                        : item.stockCount < 15
                        ? 'bg-[#FFF5E6] text-[#D97706]'
                        : 'bg-[#E7F7E7] text-[#0C9409]'
                    }`}
                  >
                    {item.stockCount > 0 ? `${item.stockCount} units` : 'Out'}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[16px] font-bold text-[#1A1A1A]">
                      {item.price}
                    </span>
                    {item.discountBadge && (
                      <span className="text-[12px] font-bold text-[#ED1010]">
                        {item.discountBadge}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenSkuBreakdown?.(item.id);
                    }}
                    className="h-[30px] px-3 rounded-[8px] bg-[#1A1A1A] text-white text-[12px] font-semibold cursor-pointer"
                  >
                    Inspect SKU
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : variant === 'varient_3' ? (
        <div className="rounded-[12px] border border-[#E6E6E6] bg-white divide-y divide-[#E6E6E6] overflow-hidden">
          {visibleSkus.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenSkuBreakdown?.(item.id)}
              className="p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#F7F7F7] transition"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-[52px] h-[52px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                    {item.title}
                  </div>
                  <div className="text-[12px] text-[#808080] mt-0.5">
                    {item.price} • {item.stockLabel}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenSkuBreakdown?.(item.id);
                }}
                className="h-[30px] px-3 rounded-[8px] bg-[#1A1A1A] text-white text-[11px] font-semibold flex-shrink-0 cursor-pointer"
              >
                {item.stockCount > 0 ? `${item.stockCount} pcs` : 'Restock'}
              </button>
            </div>
          ))}
        </div>
      ) : variant === 'varient_4' ? (
        /* V4: Executive Dark Header SKU Cards */
        <div className="space-y-3 pt-1">
          {visibleSkus.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenSkuBreakdown?.(item.id)}
              className="rounded-[12px] border border-[#E6E6E6] bg-white overflow-hidden cursor-pointer hover:border-[#1A1A1A] transition"
            >
              <div className="px-3.5 py-2 bg-[#1A1A1A] text-white flex items-center justify-between text-[11px] font-semibold">
                <span>SKU #{item.id.toUpperCase()}</span>
                <span className="text-white/80">{item.stockLabel}</span>
              </div>
              <div className="p-3.5 flex items-center gap-3.5">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-[64px] h-[64px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                    {item.title}
                  </div>
                  <div className="text-[12px] text-[#808080] mt-0.5">
                    {item.category} • {item.price}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenSkuBreakdown?.(item.id);
                  }}
                  className="h-[30px] px-3 rounded-[8px] bg-[#1A1A1A] text-white text-[11px] font-semibold flex-shrink-0 cursor-pointer"
                >
                  Breakdown
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : variant === 'varient_5' ? (
        /* V5: Split Accent Rail SKU Cards */
        <div className="space-y-3 pt-1">
          {visibleSkus.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenSkuBreakdown?.(item.id)}
              className={`pl-3.5 pr-3.5 py-3 rounded-[12px] border border-[#E6E6E6] border-l-[4px] ${
                item.stockCount === 0
                  ? 'border-l-[#ED1010]'
                  : item.stockCount < 15
                  ? 'border-l-[#D97706]'
                  : 'border-l-[#1A1A1A]'
              } bg-white flex items-center justify-between gap-3 cursor-pointer`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-[56px] h-[56px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                    {item.title}
                  </div>
                  <div className="text-[12px] text-[#808080] mt-0.5">
                    {item.stockLabel}
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-[15px] font-bold text-[#1A1A1A]">
                  {item.price}
                </div>
                <div className="text-[11px] font-semibold text-[#808080] underline mt-0.5">
                  SKU Matrix
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : variant === 'varient_6' ? (
        /* V6: Soft Filled Surface SKU Cards */
        <div className="grid grid-cols-2 gap-3 pt-1">
          {visibleSkus.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenSkuBreakdown?.(item.id)}
              className="p-2.5 rounded-[12px] bg-[#F7F7F7] border border-[#E6E6E6] cursor-pointer hover:border-[#1A1A1A] transition"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-[126px] rounded-[8px] bg-white object-cover mb-2"
              />
              <div className="text-[13px] font-bold text-[#1A1A1A] truncate">
                {item.title}
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[12px] font-bold text-[#1A1A1A]">
                  {item.price}
                </span>
                <span className="text-[10px] font-semibold text-[#808080]">
                  {item.stockCount} pcs
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : variant === 'varient_7' ? (
        /* V7: Brutalist Sharp Frame SKU Cards */
        <div className="grid grid-cols-2 gap-3 pt-1">
          {visibleSkus.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenSkuBreakdown?.(item.id)}
              className="p-2.5 rounded-[4px] border-2 border-[#1A1A1A] bg-white shadow-[2px_2px_0px_#1A1A1A] cursor-pointer"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-[120px] rounded-[2px] bg-[#F2F2F2] object-cover mb-2 border border-[#1A1A1A]"
              />
              <div className="text-[13px] font-bold text-[#1A1A1A] truncate">
                {item.title}
              </div>
              <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-[#1A1A1A]">
                <span className="text-[12px] font-extrabold text-[#1A1A1A]">
                  {item.price}
                </span>
                <span className="px-1.5 py-0.5 bg-[#1A1A1A] text-white text-[10px] font-bold">
                  {item.stockCount}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : variant === 'varient_8' ? (
        /* V8: Stacked Banner Thumbnail SKU Cards */
        <div className="space-y-3 pt-1">
          {visibleSkus.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenSkuBreakdown?.(item.id)}
              className="rounded-[12px] border border-[#E6E6E6] bg-white overflow-hidden cursor-pointer hover:border-[#1A1A1A] transition"
            >
              <div className="relative h-[108px] w-full bg-[#F2F2F2]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-[6px] bg-white text-[#1A1A1A] text-[11px] font-bold shadow-xs">
                  {item.stockLabel}
                </span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <div className="text-[14px] font-bold text-[#1A1A1A]">
                    {item.title}
                  </div>
                  <div className="text-[12px] text-[#808080]">
                    {item.category} • {item.price}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenSkuBreakdown?.(item.id);
                  }}
                  className="h-[30px] px-3 rounded-[8px] bg-[#1A1A1A] text-white text-[11px] font-semibold cursor-pointer"
                >
                  Inspect
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3.5 pt-1">
          {visibleSkus.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenSkuBreakdown?.(item.id)}
              className="cursor-pointer group"
            >
              <div className="relative w-full h-[174px] rounded-[10px] bg-[#F2F2F2] overflow-hidden mb-2">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                {/* Top-Right Square Badge (Exact Cloth Shop 34x34 8px radius white badge) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenSkuBreakdown?.(item.id);
                  }}
                  className="absolute top-2.5 right-2.5 px-2 h-[28px] rounded-[8px] bg-white shadow-xs flex items-center justify-center text-[11px] font-bold text-[#1A1A1A] cursor-pointer"
                >
                  {item.stockCount > 0 ? `${item.stockCount}` : 'Out'}
                </button>
              </div>

              <div className="text-[15px] font-bold text-[#1A1A1A] truncate">
                {item.title}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[13px] font-medium text-[#808080]">
                  {item.price}
                </span>
                {item.discountBadge && (
                  <span className="text-[12px] font-bold text-[#ED1010]">
                    {item.discountBadge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. WAREHOUSE VALUATION SUMMARY LEDGER (Exact Cloth Shop MyCart Summary Pattern) */}
      <div className="pt-2 space-y-2.5">
        <div className="flex items-center justify-between text-[14px]">
          <span className="text-[#808080]">Active Catalog SKUs</span>
          <span className="font-semibold text-[#1A1A1A]">48 Products</span>
        </div>
        <div className="flex items-center justify-between text-[14px]">
          <span className="text-[#808080]">Sell-Through Velocity</span>
          <span className="font-semibold text-[#1A1A1A]">84.2%</span>
        </div>
        <div className="flex items-center justify-between text-[14px]">
          <span className="text-[#808080]">Low Stock Alerts</span>
          <span className="font-semibold text-[#ED1010]">3 SKUs</span>
        </div>
        <div className="h-[1px] bg-[#E6E6E6] my-1" />
        <div className="flex items-center justify-between">
          <span className="text-[16px] font-medium text-[#1A1A1A]">
            Total Retail Valuation
          </span>
          <span className="text-[17px] font-bold text-[#1A1A1A]">
            $ 142,850
          </span>
        </div>
      </div>

      {/* 5. CLOTH SHOP PRIMARY & OUTLINE ACTION BUTTONS */}
      <div className="space-y-2.5">
        <button
          type="button"
          onClick={() => {
            if (onOpenStoreTaxonomy) {
              onOpenStoreTaxonomy();
            } else {
              onTriggerToast?.('Opening Store Taxonomy');
            }
          }}
          className="w-full h-[52px] rounded-[10px] bg-[#1A1A1A] text-white text-[15px] font-semibold flex items-center justify-center gap-2.5 cursor-pointer hover:opacity-95 transition"
        >
          <span>Manage Store Taxonomy</span>
          <ArrowRight size={18} />
        </button>

        <button
          type="button"
          onClick={() => {
            if (onOpenCreateCategory) {
              onOpenCreateCategory();
            } else {
              onTriggerToast?.('Opening Create Category');
            }
          }}
          className="w-full h-[48px] rounded-[10px] border border-[#E6E6E6] bg-white text-[#1A1A1A] text-[14px] font-semibold flex items-center justify-center gap-2 cursor-pointer hover:bg-[#F7F7F7] transition"
        >
          <Plus size={16} />
          <span>Create New Category</span>
        </button>
      </div>
    </div>
  );
};

export default InventoryVarient1;
