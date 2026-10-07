import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Check,
  Minus,
  Plus,
  Trash2,
} from 'lucide-react';
import {
  getAdminThemeScopeStyle,
  useAdminDesignSystem,
} from '../../../styles/adminDesignSystem';

export interface CreateCategoryVarient1Props {
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
  onCreatedCategory?: () => void;
  onTriggerToast?: (msg: string) => void;
}

type TaxonomyLevel = 'Top Tier' | 'Sub-Category' | 'Collection';

export const CreateCategoryVarient1: React.FC<CreateCategoryVarient1Props> = ({
  variant = 'varient_1',
  onBack,
  onCreatedCategory,
  onTriggerToast,
}) => {
  const { palette, activeFont, isDark, colorPresetId } = useAdminDesignSystem();
  const [categoryName, setCategoryName] = useState('Heavyweight Hoodies');
  const [slug, setSlug] = useState('/shop/heavyweight-hoodies');
  const [level, setLevel] = useState<TaxonomyLevel>('Sub-Category');
  const [displayRank, setDisplayRank] = useState(7);
  const [attachedItems, setAttachedItems] = useState([
    {
      id: 'hd_4029',
      title: 'Regular Fit Slogan',
      subtitle: 'Size M • SKU #SLG-01',
      price: '$ 1,190',
      qty: 2,
      image:
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=240&q=80',
    },
    {
      id: 'hd_9811',
      title: 'Regular Fit Polo',
      subtitle: 'Size L • SKU #PLO-04',
      price: '$ 1,100',
      qty: 1,
      image:
        'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=240&q=80',
    },
  ]);

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
          Create Category
        </h1>
        <button
          type="button"
          onClick={() => onTriggerToast?.('Saved category draft')}
          className="w-9 h-9 -mr-1.5 flex items-center justify-center text-[#1A1A1A] cursor-pointer"
        >
          <Bell size={22} strokeWidth={2} />
        </button>
      </div>

      <div className="px-5 space-y-4">
        {/* 2. CLOTH SHOP FORM INPUTS (Exact 52px height, 10px radius, 1px #E6E6E6 border) */}
        <div className="space-y-3.5">
          <div>
            <label className="block text-[15px] font-semibold text-[#1A1A1A] mb-1.5">
              Category Name
            </label>
            <div className="h-[52px] rounded-[10px] border border-[#E6E6E6] bg-white px-4 flex items-center justify-between">
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="w-full text-[15px] text-[#1A1A1A] bg-transparent focus:outline-none"
              />
              <Check size={18} className="text-[#0C9409] flex-shrink-0" />
            </div>
          </div>

          <div>
            <label className="block text-[15px] font-semibold text-[#1A1A1A] mb-1.5">
              Storefront URL Slug
            </label>
            <div className="h-[52px] rounded-[10px] border border-[#E6E6E6] bg-white px-4 flex items-center justify-between">
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="/shop/category-slug"
                className="w-full text-[15px] text-[#1A1A1A] bg-transparent focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 3. TAXONOMY LEVEL PILLS (Exact Cloth Shop 10px Radius Pills) */}
        <div>
          <label className="block text-[15px] font-semibold text-[#1A1A1A] mb-2">
            Hierarchy Level
          </label>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {(['Top Tier', 'Sub-Category', 'Collection'] as TaxonomyLevel[]).map(
              (item) => {
                const active = level === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setLevel(item)}
                    className={`h-[36px] px-4 rounded-[10px] text-[13px] transition cursor-pointer flex-shrink-0 ${
                      active
                        ? 'bg-[#1A1A1A] text-white font-semibold'
                        : 'bg-white border border-[#E6E6E6] text-[#1A1A1A] font-medium hover:bg-[#F7F7F7]'
                    }`}
                  >
                    {item}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* 4. ATTACHED PRODUCTS CARDS (V1: Horizontal MyCart Card | V2: 2-Column Merch Grid | V3: Compact Rule Ledger) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-semibold text-[#1A1A1A]">
              Assigned Products ({attachedItems.length})
            </span>
            <span className="text-[13px] text-[#808080]">Auto-sync active</span>
          </div>

          {variant === 'varient_2' ? (
            <div className="grid grid-cols-2 gap-3.5">
              {attachedItems.map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded-[12px] border border-[#E6E6E6] bg-white flex flex-col justify-between"
                >
                  <div className="relative w-full h-[116px] rounded-[8px] bg-[#F2F2F2] overflow-hidden mb-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setAttachedItems((prev) =>
                          prev.filter((x) => x.id !== item.id)
                        )
                      }
                      className="absolute top-2 right-2 w-7 h-7 rounded-[6px] bg-white text-[#ED1010] flex items-center justify-center shadow-xs cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="text-[13px] font-bold text-[#1A1A1A] truncate">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-[#808080] mt-0.5 truncate">
                    {item.subtitle}
                  </div>
                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#E6E6E6]">
                    <span className="text-[13px] font-bold text-[#1A1A1A]">
                      {item.price}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          setDisplayRank((r) => Math.max(1, r - 1))
                        }
                        className="w-[22px] h-[22px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center text-[#1A1A1A] cursor-pointer"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="text-[12px] font-semibold text-[#1A1A1A]">
                        #{displayRank}
                      </span>
                      <button
                        type="button"
                        onClick={() => setDisplayRank((r) => r + 1)}
                        className="w-[22px] h-[22px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center text-[#1A1A1A] cursor-pointer"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : variant === 'varient_3' ? (
            <div className="rounded-[12px] border border-[#E6E6E6] bg-white divide-y divide-[#E6E6E6] overflow-hidden">
              {attachedItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-[46px] h-[46px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                        {item.title}
                      </div>
                      <div className="text-[12px] text-[#808080] mt-0.5">
                        {item.price} • Rank #{displayRank}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setAttachedItems((prev) =>
                        prev.filter((x) => x.id !== item.id)
                      )
                    }
                    className="text-[#ED1010] cursor-pointer p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : variant === 'varient_4' ? (
            /* V4: Executive Dark Header Attached Product Cards */
            <div className="space-y-3">
              {attachedItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[12px] border border-[#E6E6E6] bg-white overflow-hidden"
                >
                  <div className="px-3.5 py-2 bg-[#1A1A1A] text-white flex items-center justify-between text-[11px] font-semibold">
                    <span>RULE ITEM #{item.id.toUpperCase()}</span>
                    <span>RANK #{displayRank}</span>
                  </div>
                  <div className="p-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-[52px] h-[52px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                          {item.title}
                        </div>
                        <div className="text-[12px] text-[#808080] mt-0.5">
                          {item.subtitle} • {item.price}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setAttachedItems((prev) =>
                          prev.filter((x) => x.id !== item.id)
                        )
                      }
                      className="text-[#ED1010] cursor-pointer p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : variant === 'varient_5' ? (
            /* V5: Split Accent Rail Attached Product Cards */
            <div className="space-y-3">
              {attachedItems.map((item) => (
                <div
                  key={item.id}
                  className="pl-3.5 pr-3.5 py-3.5 rounded-[12px] border border-[#E6E6E6] border-l-[4px] border-l-[#1A1A1A] bg-white flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-[52px] h-[52px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                        {item.title}
                      </div>
                      <div className="text-[12px] text-[#808080] mt-0.5">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-bold text-[#1A1A1A]">
                      {item.price}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setAttachedItems((prev) =>
                          prev.filter((x) => x.id !== item.id)
                        )
                      }
                      className="text-[#ED1010] cursor-pointer p-1"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : variant === 'varient_6' ? (
            /* V6: Soft Filled Surface Attached Product Cards */
            <div className="space-y-3">
              {attachedItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-[12px] bg-[#F7F7F7] border border-[#E6E6E6] flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-[52px] h-[52px] rounded-[8px] bg-white object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                        {item.title}
                      </div>
                      <div className="text-[12px] text-[#808080] mt-0.5">
                        {item.price} • Rank #{displayRank}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setAttachedItems((prev) =>
                        prev.filter((x) => x.id !== item.id)
                      )
                    }
                    className="w-8 h-8 rounded-[8px] bg-white border border-[#E6E6E6] text-[#ED1010] flex items-center justify-center cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          ) : variant === 'varient_7' ? (
            /* V7: Brutalist Sharp Frame Attached Product Cards */
            <div className="space-y-3">
              {attachedItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-[4px] border-2 border-[#1A1A1A] bg-white shadow-[2px_2px_0px_#1A1A1A] flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-[48px] h-[48px] rounded-[2px] border border-[#1A1A1A] object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-[14px] font-extrabold text-[#1A1A1A] truncate">
                        {item.title}
                      </div>
                      <div className="text-[12px] text-[#808080] mt-0.5">
                        {item.price} • RANK #{displayRank}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setAttachedItems((prev) =>
                        prev.filter((x) => x.id !== item.id)
                      )
                    }
                    className="px-2 py-1 bg-[#1A1A1A] text-white text-[11px] font-bold cursor-pointer"
                  >
                    REMOVE
                  </button>
                </div>
              ))}
            </div>
          ) : variant === 'varient_8' ? (
            /* V8: Stacked Footer Action Attached Product Cards */
            <div className="space-y-3">
              {attachedItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[12px] border border-[#E6E6E6] bg-white overflow-hidden"
                >
                  <div className="p-3.5 flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-[52px] h-[52px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                        {item.title}
                      </div>
                      <div className="text-[12px] text-[#808080] mt-0.5">
                        {item.subtitle}
                      </div>
                    </div>
                    <span className="text-[14px] font-bold text-[#1A1A1A]">
                      {item.price}
                    </span>
                  </div>
                  <div className="px-3.5 py-2 bg-[#F7F7F7] border-t border-[#E6E6E6] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setDisplayRank((r) => Math.max(1, r - 1))}
                        className="w-[22px] h-[22px] rounded-[4px] bg-white border border-[#E6E6E6] flex items-center justify-center text-[#1A1A1A] cursor-pointer"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="text-[12px] font-bold text-[#1A1A1A]">
                        Rank #{displayRank}
                      </span>
                      <button
                        type="button"
                        onClick={() => setDisplayRank((r) => r + 1)}
                        className="w-[22px] h-[22px] rounded-[4px] bg-white border border-[#E6E6E6] flex items-center justify-center text-[#1A1A1A] cursor-pointer"
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setAttachedItems((prev) =>
                          prev.filter((x) => x.id !== item.id)
                        )
                      }
                      className="text-[11px] font-bold text-[#ED1010] cursor-pointer"
                    >
                      Detach
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            attachedItems.map((item) => (
              <div
                key={item.id}
                className="p-[14px] rounded-[12px] border border-[#E6E6E6] bg-white flex gap-[14px]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-[82px] h-[82px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[15px] font-bold text-[#1A1A1A]">
                        {item.title}
                      </div>
                      <div className="text-[13px] text-[#808080] mt-0.5">
                        {item.subtitle}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setAttachedItems((prev) =>
                          prev.filter((x) => x.id !== item.id)
                        )
                      }
                      className="text-[#ED1010] cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[16px] font-bold text-[#1A1A1A]">
                      {item.price}
                    </span>

                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() =>
                          setDisplayRank((r) => Math.max(1, r - 1))
                        }
                        className="w-[24px] h-[24px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center text-[#1A1A1A] cursor-pointer"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="text-[14px] font-semibold text-[#1A1A1A]">
                        #{displayRank}
                      </span>
                      <button
                        type="button"
                        onClick={() => setDisplayRank((r) => r + 1)}
                        className="w-[24px] h-[24px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center text-[#1A1A1A] cursor-pointer"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 5. SUMMARY LEDGER (Exact Cloth Shop MyCart Summary Pattern) */}
        <div className="pt-2 space-y-2.5">
          <div className="flex items-center justify-between text-[15px]">
            <span className="text-[#808080]">Hierarchy Tier</span>
            <span className="font-semibold text-[#1A1A1A]">{level}</span>
          </div>
          <div className="flex items-center justify-between text-[15px]">
            <span className="text-[#808080]">Navigation Rank</span>
            <span className="font-semibold text-[#1A1A1A]">
              Position #{displayRank}
            </span>
          </div>
          <div className="h-[1px] bg-[#E6E6E6] my-1" />
          <div className="flex items-center justify-between">
            <span className="text-[16px] font-medium text-[#1A1A1A]">
              Storefront Visibility
            </span>
            <span className="text-[17px] font-bold text-[#0C9409]">
              Live on Publish
            </span>
          </div>
        </div>

        {/* 6. CLOTH SHOP PRIMARY CTA BUTTON */}
        <button
          type="button"
          onClick={() => {
            onTriggerToast?.(`Published "${categoryName}" to Store Taxonomy`);
            onCreatedCategory?.();
          }}
          className="w-full h-[54px] rounded-[10px] bg-[#1A1A1A] text-white text-[16px] font-semibold flex items-center justify-center gap-2.5 cursor-pointer hover:opacity-95 transition"
        >
          <span>Publish Category</span>
          <ArrowRight size={19} />
        </button>
      </div>
    </div>
  );
};

export default CreateCategoryVarient1;
