import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import {
  getAdminThemeScopeStyle,
  useAdminDesignSystem,
} from '../../../styles/adminDesignSystem';

export interface CategoryProductsVarient1Props {
  variant?:
    | 'varient_1'
    | 'varient_2'
    | 'varient_3'
    | 'varient_4'
    | 'varient_5'
    | 'varient_6'
    | 'varient_7'
    | 'varient_8';
  onBack?: () => void;
  onAddProduct?: () => void;
  onOpenSkuBreakdown?: () => void;
  onTriggerToast?: (msg: string) => void;
}

type MerchFilter = 'all' | 'low' | 'out';

export const CategoryProductsVarient1: React.FC<
  CategoryProductsVarient1Props
> = ({ variant = 'varient_1', onBack, onAddProduct, onOpenSkuBreakdown, onTriggerToast }) => {
  const { palette, activeFont, isDark, colorPresetId } = useAdminDesignSystem();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<MerchFilter>('all');

  const products = [
    {
      id: 'prod_slogan',
      title: 'Regular Fit Slogan',
      price: '$1,190',
      stockBadge: '120',
      filterGroup: 'all' as const,
      image:
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'prod_polo',
      title: 'Regular Fit Polo',
      price: '$1,100',
      discount: '-52%',
      stockBadge: '84',
      filterGroup: 'all' as const,
      image:
        'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'prod_fleece',
      title: 'Regular Fit Black',
      price: '$1,690',
      discount: 'Low',
      stockBadge: '4 left',
      filterGroup: 'low' as const,
      image:
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'prod_vneck',
      title: 'Regular Fit V-Neck',
      price: '$1,290',
      discount: '0 stock',
      stockBadge: 'Out',
      filterGroup: 'out' as const,
      image:
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const visibleProducts = products.filter((p) => {
    const matchesSearch = p.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTab =
      activeFilter === 'all' ? true : p.filterGroup === activeFilter;
    return matchesSearch && matchesTab;
  });

  return (
    <div
      className="admin-theme-scope flex flex-col min-h-full bg-white text-[#1A1A1A] pb-6 relative"
      style={getAdminThemeScopeStyle(palette, activeFont)}
      data-admin-dark={isDark ? 'true' : 'false'}
      data-admin-preset={colorPresetId}
    >
      {/* 1. CLOTH SHOP APP HEADER */}
      <div className="px-5 pt-3 pb-3 bg-white flex items-center justify-between sticky top-0 z-30">
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 -ml-1.5 flex items-center justify-center text-[#1A1A1A] cursor-pointer"
        >
          <ArrowLeft size={22} strokeWidth={2} />
        </button>
        <h1 className="text-[19px] font-bold text-[#1A1A1A]">
          Category Products
        </h1>
        <button
          type="button"
          onClick={onAddProduct}
          className="w-9 h-9 -mr-1.5 flex items-center justify-center text-[#1A1A1A] cursor-pointer"
        >
          <Bell size={22} strokeWidth={2} />
        </button>
      </div>

      <div className="px-5 space-y-4">
        {/* 2. CLOTH SHOP DISCOVER SEARCH BAR + FILTER BUTTON */}
        <div className="flex items-center gap-2.5">
          <div className="flex-1 h-[48px] rounded-[10px] border border-[#E6E6E6] bg-white px-3.5 flex items-center gap-2.5">
            <Search size={18} className="text-[#999999] flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search category products..."
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
            onClick={onAddProduct}
            className="w-[48px] h-[48px] rounded-[10px] bg-[#1A1A1A] text-white flex items-center justify-center flex-shrink-0 cursor-pointer hover:opacity-95 transition"
            title="Edit Category"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>

        {/* 3. CLOTH SHOP RECTANGULAR FILTER PILLS */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'all' as MerchFilter, label: 'All (14)' },
            { id: 'low' as MerchFilter, label: 'Low Stock (3)' },
            { id: 'out' as MerchFilter, label: 'Out of Stock (1)' },
          ].map((tab) => {
            const active = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`h-[36px] px-4 rounded-[10px] text-[13px] transition cursor-pointer flex-shrink-0 ${
                  active
                    ? 'bg-[#1A1A1A] text-white font-semibold'
                    : 'bg-white border border-[#E6E6E6] text-[#1A1A1A] font-medium hover:bg-[#F7F7F7]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 4. CATEGORY PRODUCT CARDS (V1: 2-Col Discover Grid | V2: Horizontal MyCart Cards | V3: Compact Merchandising Ledger) */}
        {variant === 'varient_2' ? (
          <div className="space-y-3.5 pt-1">
            {visibleProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => onOpenSkuBreakdown?.()}
                className="p-[14px] rounded-[12px] border border-[#E6E6E6] bg-white flex gap-[14px] cursor-pointer hover:border-[#1A1A1A] transition"
              >
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-[82px] h-[82px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-[15px] font-bold text-[#1A1A1A] truncate">
                        {prod.title}
                      </div>
                      <div className="text-[13px] text-[#808080] mt-0.5">
                        Stock: {prod.stockBadge}
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-[6px] bg-[#F7F7F7] text-[#1A1A1A] text-[11px] font-semibold">
                      {prod.stockBadge}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[16px] font-bold text-[#1A1A1A]">
                        {prod.price}
                      </span>
                      {prod.discount && (
                        <span className="text-[12px] font-bold text-[#ED1010]">
                          {prod.discount}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenSkuBreakdown?.();
                      }}
                      className="h-[30px] px-3 rounded-[8px] bg-[#1A1A1A] text-white text-[12px] font-semibold cursor-pointer"
                    >
                      SKU Matrix
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : variant === 'varient_3' ? (
          <div className="rounded-[12px] border border-[#E6E6E6] bg-white divide-y divide-[#E6E6E6] overflow-hidden">
            {visibleProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => onOpenSkuBreakdown?.()}
                className="p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#F7F7F7] transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-[48px] h-[48px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                      {prod.title}
                    </div>
                    <div className="text-[12px] text-[#808080] mt-0.5">
                      {prod.price} • Stock: {prod.stockBadge}
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-[6px] bg-[#F7F7F7] text-[#1A1A1A] text-[11px] font-bold flex-shrink-0">
                  {prod.stockBadge}
                </span>
              </div>
            ))}
          </div>
        ) : variant === 'varient_4' ? (
          /* V4: Executive Dark Header Category Product Cards */
          <div className="space-y-3 pt-1">
            {visibleProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => onOpenSkuBreakdown?.()}
                className="rounded-[12px] border border-[#E6E6E6] bg-white overflow-hidden cursor-pointer hover:border-[#1A1A1A] transition"
              >
                <div className="px-3.5 py-2 bg-[#1A1A1A] text-white flex items-center justify-between text-[11px] font-semibold">
                  <span>ITEM #{prod.id.toUpperCase()}</span>
                  <span>STOCK: {prod.stockBadge}</span>
                </div>
                <div className="p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-[54px] h-[54px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                        {prod.title}
                      </div>
                      <div className="text-[12px] text-[#808080] mt-0.5">
                        {prod.price}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenSkuBreakdown?.();
                    }}
                    className="h-[30px] px-3 rounded-[8px] bg-[#1A1A1A] text-white text-[11px] font-semibold cursor-pointer"
                  >
                    Matrix
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : variant === 'varient_5' ? (
          /* V5: Split Accent Rail Category Product Cards */
          <div className="space-y-3 pt-1">
            {visibleProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => onOpenSkuBreakdown?.()}
                className="pl-3.5 pr-3.5 py-3.5 rounded-[12px] border border-[#E6E6E6] border-l-[4px] border-l-[#1A1A1A] bg-white flex items-center justify-between gap-3 cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-[52px] h-[52px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                      {prod.title}
                    </div>
                    <div className="text-[12px] text-[#808080] mt-0.5">
                      Stock: {prod.stockBadge}
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-[15px] font-bold text-[#1A1A1A]">
                    {prod.price}
                  </div>
                  <div className="text-[11px] font-semibold text-[#808080] underline mt-0.5">
                    Inspect
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : variant === 'varient_6' ? (
          /* V6: Soft Filled Surface Category Product Grid */
          <div className="grid grid-cols-2 gap-3 pt-1">
            {visibleProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => onOpenSkuBreakdown?.()}
                className="p-2.5 rounded-[12px] bg-[#F7F7F7] border border-[#E6E6E6] cursor-pointer hover:border-[#1A1A1A] transition"
              >
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-full h-[126px] rounded-[8px] bg-white object-cover mb-2"
                />
                <div className="text-[13px] font-bold text-[#1A1A1A] truncate">
                  {prod.title}
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[12px] font-bold text-[#1A1A1A]">
                    {prod.price}
                  </span>
                  <span className="text-[10px] font-semibold text-[#808080]">
                    {prod.stockBadge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : variant === 'varient_7' ? (
          /* V7: Brutalist Sharp Frame Category Product Grid */
          <div className="grid grid-cols-2 gap-3 pt-1">
            {visibleProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => onOpenSkuBreakdown?.()}
                className="p-2.5 rounded-[4px] border-2 border-[#1A1A1A] bg-white shadow-[2px_2px_0px_#1A1A1A] cursor-pointer"
              >
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-full h-[120px] rounded-[2px] border border-[#1A1A1A] object-cover mb-2"
                />
                <div className="text-[13px] font-extrabold text-[#1A1A1A] truncate">
                  {prod.title}
                </div>
                <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-[#1A1A1A]">
                  <span className="text-[12px] font-extrabold text-[#1A1A1A]">
                    {prod.price}
                  </span>
                  <span className="px-1.5 py-0.5 bg-[#1A1A1A] text-white text-[10px] font-bold">
                    {prod.stockBadge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : variant === 'varient_8' ? (
          /* V8: Stacked Banner Category Product Cards */
          <div className="space-y-3 pt-1">
            {visibleProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => onOpenSkuBreakdown?.()}
                className="rounded-[12px] border border-[#E6E6E6] bg-white overflow-hidden cursor-pointer hover:border-[#1A1A1A] transition"
              >
                <div className="p-3.5 flex items-center gap-3.5">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-[54px] h-[54px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                      {prod.title}
                    </div>
                    <div className="text-[12px] text-[#808080] mt-0.5">
                      {prod.price}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-[6px] bg-[#F7F7F7] text-[#1A1A1A] text-[11px] font-bold">
                    {prod.stockBadge}
                  </span>
                </div>
                <div className="px-3.5 py-2 bg-[#F7F7F7] border-t border-[#E6E6E6] flex items-center justify-between">
                  <span className="text-[11px] text-[#808080]">
                    Category Merchandising
                  </span>
                  <span className="text-[11px] font-bold text-[#1A1A1A] underline">
                    Open SKU Matrix →
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3.5 pt-1">
            {visibleProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => onOpenSkuBreakdown?.()}
                className="cursor-pointer group"
              >
                <div className="relative w-full h-[174px] rounded-[10px] bg-[#F2F2F2] overflow-hidden mb-2">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-2.5 right-2.5 px-2 h-[28px] rounded-[8px] bg-white shadow-xs flex items-center justify-center text-[11px] font-bold text-[#1A1A1A]">
                    {prod.stockBadge}
                  </span>
                </div>

                <div className="text-[15px] font-bold text-[#1A1A1A] truncate">
                  {prod.title}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[13px] font-medium text-[#808080]">
                    {prod.price}
                  </span>
                  {prod.discount && (
                    <span className="text-[12px] font-bold text-[#ED1010]">
                      {prod.discount}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 5. CATEGORY MERCHANDISING SUMMARY LEDGER */}
        <div className="pt-2 space-y-2.5">
          <div className="flex items-center justify-between text-[15px]">
            <span className="text-[#808080]">Category SKUs</span>
            <span className="font-semibold text-[#1A1A1A]">56 Variants</span>
          </div>
          <div className="flex items-center justify-between text-[15px]">
            <span className="text-[#808080]">In-Stock Rate</span>
            <span className="font-semibold text-[#1A1A1A]">94.2%</span>
          </div>
          <div className="h-[1px] bg-[#E6E6E6] my-1" />
          <div className="flex items-center justify-between">
            <span className="text-[16px] font-medium text-[#1A1A1A]">
              Category Asset Value
            </span>
            <span className="text-[17px] font-bold text-[#1A1A1A]">
              $ 42,600
            </span>
          </div>
        </div>

        {/* 6. CLOTH SHOP PRIMARY CTA BUTTON */}
        <button
          type="button"
          onClick={() => {
            if (onOpenSkuBreakdown) {
              onOpenSkuBreakdown();
            } else {
              onTriggerToast?.('Opening SKU Breakdown');
            }
          }}
          className="w-full h-[54px] rounded-[10px] bg-[#1A1A1A] text-white text-[16px] font-semibold flex items-center justify-center gap-2.5 cursor-pointer hover:opacity-95 transition"
        >
          <span>Inspect SKU Matrix</span>
          <ArrowRight size={19} />
        </button>
      </div>
    </div>
  );
};

export default CategoryProductsVarient1;
