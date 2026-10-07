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

export interface StoreTaxonomyVarient1Props {
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
  onAddCategory?: () => void;
  onOpenCategoryProducts?: (categoryName?: string) => void;
  onTriggerToast?: (msg: string) => void;
}

type TaxonomyFilter = 'all' | 'active' | 'draft';

export const StoreTaxonomyVarient1: React.FC<StoreTaxonomyVarient1Props> = ({
  variant = 'varient_1',
  onBack,
  onAddCategory,
  onOpenCategoryProducts,
  onTriggerToast,
}) => {
  const { palette, activeFont, isDark, colorPresetId } = useAdminDesignSystem();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<TaxonomyFilter>('all');
  const [enabledIds, setEnabledIds] = useState<Record<string, boolean>>({
    tshirts: true,
    jeans: true,
    outerwear: true,
    footwear: true,
  });

  const categories = [
    {
      id: 'tshirts',
      name: 'T-Shirts & Polos',
      subtitle: '24 Products • 86 SKUs',
      revenue30d: '$ 28,450',
      badge: 'Tier 1',
      image:
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=240&q=80',
    },
    {
      id: 'jeans',
      name: 'Jeans & Denim',
      subtitle: '18 Products • 54 SKUs',
      revenue30d: '$ 21,890',
      badge: 'Low Stock',
      image:
        'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=240&q=80',
    },
    {
      id: 'outerwear',
      name: 'Outerwear & Jackets',
      subtitle: '14 Products • 38 SKUs',
      revenue30d: '$ 19,300',
      badge: 'Tier 1',
      image:
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=240&q=80',
    },
    {
      id: 'footwear',
      name: 'Footwear',
      subtitle: '9 Products • 28 SKUs',
      revenue30d: '$ 14,750',
      badge: 'Tier 1',
      image:
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=240&q=80',
    },
  ];

  const visibleCategories = categories.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const isEnabled = enabledIds[c.id];
    const matchesTab =
      activeFilter === 'all'
        ? true
        : activeFilter === 'active'
        ? isEnabled
        : !isEnabled;
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
          Store Taxonomy
        </h1>
        <button
          type="button"
          onClick={onAddCategory}
          className="w-9 h-9 -mr-1.5 flex items-center justify-center text-[#1A1A1A] cursor-pointer"
          title="Add Category"
        >
          <Bell size={22} strokeWidth={2} />
        </button>
      </div>

      <div className="px-5 space-y-4">
        {/* 2. CLOTH SHOP SEARCH BAR + ADD BUTTON */}
        <div className="flex items-center gap-2.5">
          <div className="flex-1 h-[48px] rounded-[10px] border border-[#E6E6E6] bg-white px-3.5 flex items-center gap-2.5">
            <Search size={18} className="text-[#999999] flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search category or collection..."
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
            onClick={onAddCategory}
            className="w-[48px] h-[48px] rounded-[10px] bg-[#1A1A1A] text-white flex items-center justify-center flex-shrink-0 cursor-pointer hover:opacity-95 transition"
            title="Create Category"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* 3. CLOTH SHOP RECTANGULAR FILTER PILLS (10px Radius) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'all' as TaxonomyFilter, label: 'All (14)' },
            { id: 'active' as TaxonomyFilter, label: 'Active (12)' },
            { id: 'draft' as TaxonomyFilter, label: 'Hidden & Draft (2)' },
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

        {/* 4. CATEGORY CARDS (V1: Horizontal Cart Card | V2: 2-Column Discover Grid | V3: Compact Taxonomy Tree) */}
        {variant === 'varient_2' ? (
          <div className="grid grid-cols-2 gap-3.5">
            {visibleCategories.map((cat) => {
              const isOn = enabledIds[cat.id];
              return (
                <div
                  key={cat.id}
                  onClick={() => onOpenCategoryProducts?.(cat.name)}
                  className="p-2.5 rounded-[12px] border border-[#E6E6E6] bg-white cursor-pointer hover:border-[#1A1A1A] transition"
                >
                  <div className="relative w-full h-[126px] rounded-[10px] bg-[#F2F2F2] overflow-hidden mb-2">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEnabledIds((prev) => ({
                          ...prev,
                          [cat.id]: !prev[cat.id],
                        }));
                        onTriggerToast?.(
                          `${cat.name} ${!isOn ? 'published' : 'hidden'}`
                        );
                      }}
                      className={`absolute top-2 right-2 px-2 py-0.5 rounded-[6px] text-[10px] font-bold cursor-pointer ${
                        isOn
                          ? 'bg-white text-[#0C9409]'
                          : 'bg-white text-[#808080]'
                      }`}
                    >
                      {isOn ? 'Active' : 'Draft'}
                    </button>
                  </div>
                  <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                    {cat.name}
                  </div>
                  <div className="text-[11px] text-[#808080] mt-0.5 truncate">
                    {cat.subtitle}
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E6E6E6]">
                    <span className="text-[13px] font-bold text-[#1A1A1A]">
                      {cat.revenue30d}
                    </span>
                    <span className="text-[11px] font-semibold text-[#1A1A1A] underline">
                      Products
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : variant === 'varient_3' ? (
          <div className="rounded-[12px] border border-[#E6E6E6] bg-white divide-y divide-[#E6E6E6] overflow-hidden">
            {visibleCategories.map((cat) => {
              const isOn = enabledIds[cat.id];
              return (
                <div
                  key={cat.id}
                  onClick={() => onOpenCategoryProducts?.(cat.name)}
                  className="p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#F7F7F7] transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-[48px] h-[48px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                        {cat.name}
                      </div>
                      <div className="text-[12px] text-[#808080] mt-0.5">
                        {cat.subtitle} • {cat.revenue30d}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEnabledIds((prev) => ({
                        ...prev,
                        [cat.id]: !prev[cat.id],
                      }));
                      onTriggerToast?.(
                        `${cat.name} ${!isOn ? 'published' : 'hidden'}`
                      );
                    }}
                    className={`px-2.5 py-1 rounded-[6px] text-[11px] font-semibold cursor-pointer flex-shrink-0 ${
                      isOn
                        ? 'bg-[#E7F7E7] text-[#0C9409]'
                        : 'bg-[#F7F7F7] text-[#808080]'
                    }`}
                  >
                    {isOn ? 'Active' : 'Draft'}
                  </button>
                </div>
              );
            })}
          </div>
        ) : variant === 'varient_4' ? (
          /* V4: Executive Dark Header Taxonomy Cards */
          <div className="space-y-3">
            {visibleCategories.map((cat) => {
              const isOn = enabledIds[cat.id];
              return (
                <div
                  key={cat.id}
                  onClick={() => onOpenCategoryProducts?.(cat.name)}
                  className="rounded-[12px] border border-[#E6E6E6] bg-white overflow-hidden cursor-pointer hover:border-[#1A1A1A] transition"
                >
                  <div className="px-3.5 py-2 bg-[#1A1A1A] text-white flex items-center justify-between text-[11px] font-semibold">
                    <span>{cat.badge.toUpperCase()} COLLECTION</span>
                    <span>{isOn ? 'LIVE' : 'DRAFT'}</span>
                  </div>
                  <div className="p-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-[56px] h-[56px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                          {cat.name}
                        </div>
                        <div className="text-[12px] text-[#808080] mt-0.5">
                          {cat.subtitle} • {cat.revenue30d}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenCategoryProducts?.(cat.name);
                      }}
                      className="h-[30px] px-3 rounded-[8px] bg-[#1A1A1A] text-white text-[11px] font-semibold flex-shrink-0 cursor-pointer"
                    >
                      Products
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : variant === 'varient_5' ? (
          /* V5: Split Accent Rail Taxonomy Cards */
          <div className="space-y-3">
            {visibleCategories.map((cat) => {
              const isOn = enabledIds[cat.id];
              return (
                <div
                  key={cat.id}
                  onClick={() => onOpenCategoryProducts?.(cat.name)}
                  className={`pl-3.5 pr-3.5 py-3.5 rounded-[12px] border border-[#E6E6E6] border-l-[4px] ${
                    isOn ? 'border-l-[#0C9409]' : 'border-l-[#808080]'
                  } bg-white flex items-center justify-between gap-3 cursor-pointer`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-[54px] h-[54px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                        {cat.name}
                      </div>
                      <div className="text-[12px] text-[#808080] mt-0.5">
                        {cat.subtitle}
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-[14px] font-bold text-[#1A1A1A]">
                      {cat.revenue30d}
                    </div>
                    <div className="text-[11px] font-semibold text-[#808080] underline mt-0.5">
                      Open Ledger
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : variant === 'varient_6' ? (
          /* V6: Soft Filled Surface Taxonomy Cards */
          <div className="space-y-3">
            {visibleCategories.map((cat) => {
              const isOn = enabledIds[cat.id];
              return (
                <div
                  key={cat.id}
                  onClick={() => onOpenCategoryProducts?.(cat.name)}
                  className="p-3.5 rounded-[12px] bg-[#F7F7F7] border border-[#E6E6E6] flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-[58px] h-[58px] rounded-[10px] bg-white object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                        {cat.name}
                      </div>
                      <div className="text-[12px] text-[#808080] mt-0.5">
                        {cat.subtitle}
                      </div>
                      <div className="text-[13px] font-bold text-[#1A1A1A] mt-1">
                        {cat.revenue30d}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEnabledIds((prev) => ({
                        ...prev,
                        [cat.id]: !prev[cat.id],
                      }));
                    }}
                    className={`px-2.5 py-1 rounded-[8px] text-[11px] font-bold cursor-pointer ${
                      isOn
                        ? 'bg-white text-[#0C9409] border border-[#E6E6E6]'
                        : 'bg-white text-[#808080] border border-[#E6E6E6]'
                    }`}
                  >
                    {isOn ? 'Active' : 'Draft'}
                  </button>
                </div>
              );
            })}
          </div>
        ) : variant === 'varient_7' ? (
          /* V7: Brutalist Sharp Frame Taxonomy Cards */
          <div className="space-y-3">
            {visibleCategories.map((cat) => {
              const isOn = enabledIds[cat.id];
              return (
                <div
                  key={cat.id}
                  onClick={() => onOpenCategoryProducts?.(cat.name)}
                  className="p-3.5 rounded-[4px] border-2 border-[#1A1A1A] bg-white shadow-[2px_2px_0px_#1A1A1A] flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-[54px] h-[54px] rounded-[2px] border border-[#1A1A1A] object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-[14px] font-extrabold text-[#1A1A1A] truncate">
                        {cat.name}
                      </div>
                      <div className="text-[12px] text-[#808080] mt-0.5">
                        {cat.subtitle} • {cat.revenue30d}
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-[#1A1A1A] text-white text-[11px] font-bold flex-shrink-0">
                    {isOn ? 'ACTIVE' : 'DRAFT'}
                  </span>
                </div>
              );
            })}
          </div>
        ) : variant === 'varient_8' ? (
          /* V8: Stacked Banner Action Taxonomy Cards */
          <div className="space-y-3">
            {visibleCategories.map((cat) => {
              const isOn = enabledIds[cat.id];
              return (
                <div
                  key={cat.id}
                  onClick={() => onOpenCategoryProducts?.(cat.name)}
                  className="rounded-[12px] border border-[#E6E6E6] bg-white overflow-hidden cursor-pointer hover:border-[#1A1A1A] transition"
                >
                  <div className="p-3.5 flex items-center gap-3.5">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-[56px] h-[56px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[15px] font-bold text-[#1A1A1A] truncate">
                        {cat.name}
                      </div>
                      <div className="text-[12px] text-[#808080] mt-0.5">
                        {cat.subtitle}
                      </div>
                    </div>
                    <span className="text-[15px] font-bold text-[#1A1A1A]">
                      {cat.revenue30d}
                    </span>
                  </div>
                  <div className="px-3.5 py-2.5 bg-[#F7F7F7] border-t border-[#E6E6E6] flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#808080]">
                      Status: {isOn ? 'Published on Store' : 'Hidden Draft'}
                    </span>
                    <span className="text-[12px] font-bold text-[#1A1A1A] underline">
                      View Products →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3.5">
            {visibleCategories.map((cat) => {
              const isOn = enabledIds[cat.id];
              return (
                <div
                  key={cat.id}
                  onClick={() => onOpenCategoryProducts?.(cat.name)}
                  className="p-[14px] rounded-[12px] border border-[#E6E6E6] bg-white flex gap-[14px] cursor-pointer hover:border-[#1A1A1A] transition"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-[82px] h-[82px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-[15px] font-bold text-[#1A1A1A] truncate">
                          {cat.name}
                        </div>
                        <div className="text-[13px] text-[#808080] mt-0.5 truncate">
                          {cat.subtitle}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEnabledIds((prev) => ({
                            ...prev,
                            [cat.id]: !prev[cat.id],
                          }));
                          onTriggerToast?.(
                            `${cat.name} ${!isOn ? 'published' : 'hidden'}`
                          );
                        }}
                        className={`px-2.5 py-1 rounded-[6px] text-[11px] font-semibold cursor-pointer flex-shrink-0 ${
                          isOn
                            ? 'bg-[#E7F7E7] text-[#0C9409]'
                            : 'bg-[#F7F7F7] text-[#808080]'
                        }`}
                      >
                        {isOn ? 'Active' : 'Draft'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[16px] font-bold text-[#1A1A1A]">
                        {cat.revenue30d}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenCategoryProducts?.(cat.name);
                        }}
                        className="h-[30px] px-3 rounded-[8px] bg-[#1A1A1A] text-white text-[12px] font-semibold flex items-center gap-1 cursor-pointer hover:opacity-95"
                      >
                        <span>Products</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 5. TAXONOMY SUMMARY LEDGER (Exact Cloth Shop MyCart Summary Pattern) */}
        <div className="pt-2 space-y-2.5">
          <div className="flex items-center justify-between text-[15px]">
            <span className="text-[#808080]">Total Categories</span>
            <span className="font-semibold text-[#1A1A1A]">14 Collections</span>
          </div>
          <div className="flex items-center justify-between text-[15px]">
            <span className="text-[#808080]">Mapped Catalog SKUs</span>
            <span className="font-semibold text-[#1A1A1A]">218 SKUs (94%)</span>
          </div>
          <div className="h-[1px] bg-[#E6E6E6] my-1" />
          <div className="flex items-center justify-between">
            <span className="text-[16px] font-medium text-[#1A1A1A]">
              30-Day Category GMV
            </span>
            <span className="text-[17px] font-bold text-[#1A1A1A]">
              $ 84,390
            </span>
          </div>
        </div>

        {/* 6. CLOTH SHOP PRIMARY CTA BUTTON */}
        <button
          type="button"
          onClick={onAddCategory}
          className="w-full h-[54px] rounded-[10px] bg-[#1A1A1A] text-white text-[16px] font-semibold flex items-center justify-center gap-2.5 cursor-pointer hover:opacity-95 transition"
        >
          <span>Create New Category</span>
          <ArrowRight size={19} />
        </button>
      </div>
    </div>
  );
};

export default StoreTaxonomyVarient1;
