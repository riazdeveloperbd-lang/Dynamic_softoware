import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Check,
  Gift,
  Mail,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import {
  getAdminThemeScopeStyle,
  useAdminDesignSystem,
} from '../../../styles/adminDesignSystem';

export interface AllCustomerDirectoryVarient1Props {
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
  onOpenCustomerProfile?: (customerId?: string) => void;
  onTriggerToast?: (msg: string) => void;
}

type DirectoryFilter = 'all' | 'vip' | 'loyal' | 'risk';

export const AllCustomerDirectoryVarient1: React.FC<
  AllCustomerDirectoryVarient1Props
> = ({ variant = 'varient_1', onBack, onOpenCustomerProfile, onTriggerToast }) => {
  const { palette, activeFont, isDark, colorPresetId } = useAdminDesignSystem();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<DirectoryFilter>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>(['marcus', 'sarah']);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const customers = [
    {
      id: 'marcus',
      name: 'Marcus Chen',
      badge: 'VIP Whale',
      filterGroup: 'vip' as const,
      subtitle: '14 Orders • New York, NY',
      ltv: '$ 8,420',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
    },
    {
      id: 'sarah',
      name: 'Sarah Jenkins',
      badge: 'Loyal Regular',
      filterGroup: 'loyal' as const,
      subtitle: '9 Orders • Austin, TX',
      ltv: '$ 5,870',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80',
    },
    {
      id: 'liam',
      name: 'Liam Gallagher',
      badge: 'High Value',
      filterGroup: 'vip' as const,
      subtitle: '5 Orders • Chicago, IL',
      ltv: '$ 2,950',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
    },
    {
      id: 'elena',
      name: 'Elena Rostova',
      badge: 'Repeat Buyer',
      filterGroup: 'loyal' as const,
      subtitle: '4 Orders • San Francisco, CA',
      ltv: '$ 2,410',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
    },
    {
      id: 'arthur',
      name: 'Arthur Pendelton',
      badge: 'At Risk',
      filterGroup: 'risk' as const,
      subtitle: '3 Orders • Boston, MA',
      ltv: '$ 1,800',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=240&q=80',
    },
  ];

  const visibleCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeFilter === 'all' ? true : c.filterGroup === activeFilter;
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
          All Customers
        </h1>
        <button
          type="button"
          onClick={() => onTriggerToast?.('Exported 1,420 customers CSV')}
          className="w-9 h-9 -mr-1.5 flex items-center justify-center text-[#1A1A1A] cursor-pointer"
        >
          <Bell size={22} strokeWidth={2} />
        </button>
      </div>

      <div className="px-5 space-y-4">
        {/* 2. CLOTH SHOP SEARCH BAR + FILTER BUTTON */}
        <div className="flex items-center gap-2.5">
          <div className="flex-1 h-[48px] rounded-[10px] border border-[#E6E6E6] bg-white px-3.5 flex items-center gap-2.5">
            <Search size={18} className="text-[#999999] flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 1,420 customers..."
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
            onClick={() =>
              setSelectedIds(
                selectedIds.length === customers.length
                  ? []
                  : customers.map((c) => c.id)
              )
            }
            className="w-[48px] h-[48px] rounded-[10px] bg-[#1A1A1A] text-white flex items-center justify-center flex-shrink-0 cursor-pointer hover:opacity-95 transition"
            title="Select All"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>

        {/* 3. CLOTH SHOP RECTANGULAR FILTER PILLS */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'all' as DirectoryFilter, label: 'All (1,420)' },
            { id: 'vip' as DirectoryFilter, label: 'VIP Whales (84)' },
            { id: 'loyal' as DirectoryFilter, label: 'Loyal (312)' },
            { id: 'risk' as DirectoryFilter, label: 'At Risk (48)' },
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

        {/* 4. CUSTOMER CARDS (V1: Horizontal Cart Card | V2: 2-Column Portrait Grid | V3: Compact Selectable Ledger) */}
        {variant === 'varient_2' ? (
          <div className="grid grid-cols-2 gap-3.5">
            {visibleCustomers.map((c) => {
              const isSelected = selectedIds.includes(c.id);
              return (
                <div
                  key={c.id}
                  onClick={() => onOpenCustomerProfile?.(c.id)}
                  className="p-2.5 rounded-[12px] border border-[#E6E6E6] bg-white space-y-2 cursor-pointer hover:border-[#1A1A1A] transition"
                >
                  <div className="relative h-[140px] rounded-[8px] bg-[#F2F2F2] overflow-hidden">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelect(c.id);
                      }}
                      className={`absolute top-2 right-2 w-6 h-6 rounded-[6px] border flex items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white'
                          : 'bg-white border-[#E6E6E6]'
                      }`}
                    >
                      {isSelected && <Check size={12} />}
                    </button>
                  </div>
                  <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                    {c.name}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-bold text-[#1A1A1A]">
                      {c.ltv}
                    </span>
                    <span className="text-[11px] text-[#808080]">{c.badge}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : variant === 'varient_3' ? (
          <div className="rounded-[12px] border border-[#E6E6E6] bg-white divide-y divide-[#E6E6E6]">
            {visibleCustomers.map((c) => {
              const isSelected = selectedIds.includes(c.id);
              return (
                <div
                  key={c.id}
                  onClick={() => onOpenCustomerProfile?.(c.id)}
                  className="p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#F7F7F7] transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelect(c.id);
                      }}
                      className={`w-[22px] h-[22px] rounded-[6px] border flex items-center justify-center flex-shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white'
                          : 'border-[#E6E6E6] bg-white'
                      }`}
                    >
                      {isSelected && <Check size={12} />}
                    </button>
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-10 h-10 rounded-full bg-[#F2F2F2] object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                        {c.name}
                      </div>
                      <div className="text-[12px] text-[#808080] truncate">
                        {c.subtitle}
                      </div>
                    </div>
                  </div>
                  <span className="text-[15px] font-bold text-[#1A1A1A] flex-shrink-0">
                    {c.ltv}
                  </span>
                </div>
              );
            })}
          </div>
        ) : variant === 'varient_4' ? (
          /* V4: Dark Header Selectable Buyer Cards */
          <div className="space-y-3">
            {visibleCustomers.map((c) => {
              const isSelected = selectedIds.includes(c.id);
              return (
                <div
                  key={c.id}
                  onClick={() => onOpenCustomerProfile?.(c.id)}
                  className="rounded-[12px] border border-[#E6E6E6] bg-white overflow-hidden cursor-pointer"
                >
                  <div className="px-3.5 py-2 bg-[#1A1A1A] text-white flex items-center justify-between text-[11px] font-bold">
                    <span>{c.badge}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelect(c.id);
                      }}
                      className="underline cursor-pointer"
                    >
                      {isSelected ? 'Selected ✓' : 'Select'}
                    </button>
                  </div>
                  <div className="p-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-12 h-12 rounded-[8px] object-cover"
                      />
                      <div>
                        <div className="text-[14px] font-bold text-[#1A1A1A]">
                          {c.name}
                        </div>
                        <div className="text-[12px] text-[#808080]">
                          {c.subtitle}
                        </div>
                      </div>
                    </div>
                    <span className="text-[15px] font-bold text-[#1A1A1A]">
                      {c.ltv}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : variant === 'varient_5' ? (
          /* V5: Soft Surface Selectable Cards */
          <div className="space-y-2.5">
            {visibleCustomers.map((c) => {
              const isSelected = selectedIds.includes(c.id);
              return (
                <div
                  key={c.id}
                  onClick={() => onOpenCustomerProfile?.(c.id)}
                  className="p-3.5 rounded-[12px] bg-[#F7F7F7] border border-[#E6E6E6] flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-11 h-11 rounded-[8px] object-cover"
                    />
                    <div>
                      <div className="text-[14px] font-bold text-[#1A1A1A]">
                        {c.name}
                      </div>
                      <div className="text-[12px] text-[#808080]">
                        {c.ltv} • {c.badge}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelect(c.id);
                    }}
                    className={`px-3 py-1 rounded-[8px] text-[11px] font-bold cursor-pointer ${
                      isSelected
                        ? 'bg-[#1A1A1A] text-white'
                        : 'bg-white border border-[#E6E6E6] text-[#1A1A1A]'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Select'}
                  </button>
                </div>
              );
            })}
          </div>
        ) : variant === 'varient_6' ? (
          /* V6: 2-Column Centered Avatar Selectable Cards */
          <div className="grid grid-cols-2 gap-3">
            {visibleCustomers.map((c) => {
              const isSelected = selectedIds.includes(c.id);
              return (
                <div
                  key={c.id}
                  onClick={() => onOpenCustomerProfile?.(c.id)}
                  className="p-3.5 rounded-[12px] border border-[#E6E6E6] bg-white flex flex-col items-center text-center gap-2 cursor-pointer"
                >
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="text-[14px] font-bold text-[#1A1A1A] truncate w-full">
                    {c.name}
                  </div>
                  <div className="text-[13px] font-bold text-[#1A1A1A]">{c.ltv}</div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelect(c.id);
                    }}
                    className={`w-full py-1.5 rounded-[8px] text-[11px] font-bold cursor-pointer ${
                      isSelected
                        ? 'bg-[#1A1A1A] text-white'
                        : 'bg-[#F7F7F7] text-[#1A1A1A]'
                    }`}
                  >
                    {isSelected ? 'Selected ✓' : 'Select'}
                  </button>
                </div>
              );
            })}
          </div>
        ) : variant === 'varient_7' ? (
          /* V7: Outlined Bold Border Buyer Cards */
          <div className="space-y-2.5">
            {visibleCustomers.map((c) => {
              const isSelected = selectedIds.includes(c.id);
              return (
                <div
                  key={c.id}
                  onClick={() => onOpenCustomerProfile?.(c.id)}
                  className="p-3.5 rounded-[12px] border-2 border-[#1A1A1A] bg-white flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <div className="text-[15px] font-bold text-[#1A1A1A]">{c.name}</div>
                    <div className="text-[12px] text-[#808080]">
                      {c.badge} • {c.subtitle}
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-[15px] font-bold text-[#1A1A1A]">{c.ltv}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelect(c.id);
                      }}
                      className={`w-6 h-6 rounded-[6px] border flex items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white'
                          : 'border-[#E6E6E6]'
                      }`}
                    >
                      {isSelected && <Check size={12} />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : variant === 'varient_8' ? (
          /* V8: Studio Capsule Numbered Directory Cards */
          <div className="space-y-2.5">
            {visibleCustomers.map((c, idx) => {
              const isSelected = selectedIds.includes(c.id);
              return (
                <div
                  key={c.id}
                  onClick={() => onOpenCustomerProfile?.(c.id)}
                  className="p-3 rounded-[10px] border border-[#E6E6E6] bg-white flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-7 h-7 rounded-[6px] bg-[#1A1A1A] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                      0{idx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                        {c.name}
                      </div>
                      <div className="text-[11px] text-[#808080] truncate">
                        {c.ltv} • {c.subtitle}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelect(c.id);
                    }}
                    className={`w-6 h-6 rounded-[6px] border flex items-center justify-center cursor-pointer ${
                      isSelected
                        ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white'
                        : 'border-[#E6E6E6]'
                    }`}
                  >
                    {isSelected && <Check size={12} />}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
        <div className="space-y-3.5">
          {visibleCustomers.map((c) => {
            const isSelected = selectedIds.includes(c.id);
            return (
              <div
                key={c.id}
                onClick={() => onOpenCustomerProfile?.(c.id)}
                className="p-[14px] rounded-[12px] border border-[#E6E6E6] bg-white flex gap-[14px] cursor-pointer hover:border-[#1A1A1A] transition"
              >
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-[82px] h-[82px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-[15px] font-bold text-[#1A1A1A] truncate">
                        {c.name}
                      </div>
                      <div className="text-[13px] text-[#808080] mt-0.5 truncate">
                        {c.subtitle}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelect(c.id);
                      }}
                      className={`w-[24px] h-[24px] rounded-[6px] border flex items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white'
                          : 'border-[#E6E6E6] bg-white'
                      }`}
                    >
                      {isSelected && <Check size={13} />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[16px] font-bold text-[#1A1A1A]">
                      {c.ltv}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenCustomerProfile?.(c.id);
                      }}
                      className="h-[30px] px-3 rounded-[8px] bg-[#1A1A1A] text-white text-[12px] font-semibold flex items-center gap-1 cursor-pointer hover:opacity-95"
                    >
                      <span>View Profile</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        )}

        {/* 5. DIRECTORY SUMMARY LEDGER */}
        <div className="pt-2 space-y-2.5">
          <div className="flex items-center justify-between text-[14px]">
            <span className="text-[#808080]">Selected Profiles</span>
            <span className="font-semibold text-[#1A1A1A]">
              {selectedIds.length} Customers
            </span>
          </div>
          <div className="flex items-center justify-between text-[14px]">
            <span className="text-[#808080]">Combined LTV</span>
            <span className="font-semibold text-[#1A1A1A]">$ 14,290</span>
          </div>
          <div className="h-[1px] bg-[#E6E6E6] my-1" />
          <div className="flex items-center justify-between">
            <span className="text-[16px] font-medium text-[#1A1A1A]">
              Directory Total
            </span>
            <span className="text-[17px] font-bold text-[#1A1A1A]">
              1,420 Profiles
            </span>
          </div>
        </div>

        {/* 6. CLOTH SHOP PRIMARY CTA BUTTON */}
        <button
          type="button"
          onClick={() =>
            onTriggerToast?.(
              `Sent VIP Campaign Offer to ${selectedIds.length} selected customers`
            )
          }
          className="w-full h-[54px] rounded-[10px] bg-[#1A1A1A] text-white text-[16px] font-semibold flex items-center justify-center gap-2.5 cursor-pointer hover:opacity-95 transition"
        >
          <span>Send VIP Offer ({selectedIds.length})</span>
          <ArrowRight size={19} />
        </button>
      </div>
    </div>
  );
};

export default AllCustomerDirectoryVarient1;
