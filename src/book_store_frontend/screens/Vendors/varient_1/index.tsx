import React, { useState } from 'react';
import { ArrowLeft, Search, Star } from 'lucide-react';
import {
  BookStoreVariantId,
  getBookStoreThemeScopeStyle,
  getBookStoreVariantCardStyle,
  useBookStoreDesignSystem,
} from '../../../styles/bookStoreDesignSystem';

export interface VendorsVarient1Props {
  variant?: BookStoreVariantId;
  onBack?: () => void;
  onOpenSearch?: () => void;
  onTriggerToast?: (msg: string) => void;
}

const VENDOR_TABS = [
  'All',
  'Books',
  'Poems',
  'Special for you',
  'Stationery',
] as const;

export const VendorsVarient1: React.FC<VendorsVarient1Props> = ({
  variant = 'varient_1',
  onBack,
  onOpenSearch,
  onTriggerToast,
}) => {
  const { palette, activeFont, isDark, colorPresetId, vendors } =
    useBookStoreDesignSystem();
  const [selectedTab, setSelectedTab] = useState<string>('All');
  const cardStyle = getBookStoreVariantCardStyle(variant, palette);

  const filteredVendors =
    selectedTab === 'All'
      ? vendors
      : vendors.filter((v) => v.category === selectedTab);

  return (
    <div
      className="bookstore-theme-scope min-h-[640px] px-5 pt-3 pb-6 space-y-5 select-none"
      style={getBookStoreThemeScopeStyle(palette, activeFont)}
      data-bookstore-dark={isDark ? 'true' : 'false'}
      data-bookstore-preset={colorPresetId}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
          style={{ color: palette.textPrimary }}
        >
          <ArrowLeft size={20} />
        </button>
        <h1
          className="text-[18px] font-extrabold"
          style={{ color: palette.textPrimary }}
        >
          Vendords
        </h1>
        <button
          type="button"
          onClick={onOpenSearch}
          className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
          style={{ color: palette.textPrimary }}
        >
          <Search size={20} />
        </button>
      </div>

      {/* Subheader */}
      <div>
        <p
          className="text-[13px] font-medium"
          style={{ color: palette.textSecondary }}
        >
          Our Vendors
        </p>
        <h2
          className="text-[22px] font-extrabold mt-0.5"
          style={{ color: palette.primary }}
        >
          Vendords
        </h2>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-5 overflow-x-auto no-scrollbar border-b pb-2" style={{ borderColor: palette.border }}>
        {VENDOR_TABS.map((tab) => {
          const active = selectedTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedTab(tab)}
              className="text-[14px] whitespace-nowrap pb-1 relative cursor-pointer transition"
              style={{
                color: active ? palette.textPrimary : palette.textSecondary,
                fontWeight: active ? 800 : 500,
              }}
            >
              {tab}
              {active && (
                <span
                  className="absolute bottom-[-9px] left-0 right-0 h-[2.5px] rounded-full"
                  style={{ backgroundColor: palette.primary }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Vendors Grid / List (Variant-aware) */}
      <div
        className={
          variant === 'varient_2' || variant === 'varient_5'
            ? 'grid grid-cols-2 gap-3.5 pt-1'
            : variant === 'varient_4'
            ? 'space-y-2.5 pt-1'
            : 'grid grid-cols-3 gap-3.5 pt-1'
        }
      >
        {filteredVendors.map((vendor) => (
          <div
            key={vendor.id}
            onClick={() =>
              onTriggerToast?.(`Browsing books from ${vendor.name}`)
            }
            className={`cursor-pointer group ${
              variant === 'varient_4'
                ? 'p-3 flex items-center justify-between gap-3'
                : variant === 'varient_1'
                ? 'space-y-1.5'
                : 'p-2.5 space-y-1.5'
            }`}
            style={variant === 'varient_1' ? undefined : cardStyle}
          >
            <div
              className={`${
                variant === 'varient_4' ? 'w-14 h-14' : 'h-[86px]'
              } rounded-xl flex items-center justify-center p-2.5 text-center transition group-hover:scale-[1.02] flex-shrink-0`}
              style={{ backgroundColor: palette.surface }}
            >
              <span
                className="text-[12px] font-black leading-tight"
                style={{ color: vendor.accentColor }}
              >
                {vendor.shortTag}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="text-[13px] font-bold truncate"
                style={{ color: palette.textPrimary }}
              >
                {vendor.name}
              </div>
              <div className="flex items-center gap-0.5 mt-0.5">
                {[1, 2, 3, 4, 5].map((starIdx) => (
                  <Star
                    key={starIdx}
                    size={12}
                    fill={starIdx <= vendor.rating ? '#FACC15' : '#1E293B'}
                    color={starIdx <= vendor.rating ? '#FACC15' : '#1E293B'}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorsVarient1;
