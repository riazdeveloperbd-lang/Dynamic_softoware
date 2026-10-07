import React, { useState } from 'react';
import {
  ArrowRight,
  Gift,
  Mail,
  MessageSquare,
  Search,
  SlidersHorizontal,
  Users,
  X,
} from 'lucide-react';
import {
  getAdminThemeScopeStyle,
  useAdminDesignSystem,
} from '../../../styles/adminDesignSystem';

export interface CustomersVarient1Props {
  variant?:
    | 'varient_1'
    | 'varient_2'
    | 'varient_3'
    | 'varient_4'
    | 'varient_5'
    | 'varient_6'
    | 'varient_7'
    | 'varient_8';
  onOpenCustomerProfile?: (customerId?: string) => void;
  onOpenAllCustomerDirectory?: () => void;
  onTriggerToast?: (msg: string) => void;
}

type CohortFilter = 'all' | 'vip' | 'retention';

interface CustomerProfileItem {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  cohortGroup: 'vip' | 'retention';
  ltv: string;
  orders: string;
  avatar: string;
  actionLabel: string;
}

const PROFILES: CustomerProfileItem[] = [
  {
    id: 'cust_marcus',
    name: 'Marcus Chen',
    subtitle: '14 Orders • Size M',
    badge: 'VIP Whale',
    cohortGroup: 'vip',
    ltv: '$ 8,420',
    orders: '14 orders',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
    actionLabel: 'VIP Gift',
  },
  {
    id: 'cust_sarah',
    name: 'Sarah Jenkins',
    subtitle: '9 Orders • Size S',
    badge: 'Loyal Regular',
    cohortGroup: 'retention',
    ltv: '$ 5,870',
    orders: '9 orders',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80',
    actionLabel: 'Profile',
  },
  {
    id: 'cust_liam',
    name: 'Liam Gallagher',
    subtitle: '5 Orders • Size L',
    badge: 'High Value',
    cohortGroup: 'vip',
    ltv: '$ 2,950',
    orders: '5 orders',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
    actionLabel: 'SMS Promo',
  },
  {
    id: 'cust_arthur',
    name: 'Arthur Pendelton',
    subtitle: '3 Orders • 92d Inactive',
    badge: 'At Risk',
    cohortGroup: 'retention',
    ltv: '$ 1,800',
    orders: '3 orders',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=240&q=80',
    actionLabel: 'Win-Back',
  },
];

export const CustomersVarient1: React.FC<CustomersVarient1Props> = ({
  variant = 'varient_1',
  onOpenCustomerProfile,
  onOpenAllCustomerDirectory,
  onTriggerToast,
}) => {
  const { palette, activeFont, isDark, colorPresetId } = useAdminDesignSystem();
  const [activeCohort, setActiveCohort] = useState<CohortFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const visibleProfiles = PROFILES.filter((p) => {
    const matchesCohort =
      activeCohort === 'all' ? true : p.cohortGroup === activeCohort;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCohort && matchesSearch;
  });

  return (
    <div
      className="admin-theme-scope px-5 pt-2 pb-6 space-y-4 bg-white text-[#1A1A1A] relative"
      style={getAdminThemeScopeStyle(palette, activeFont)}
      data-admin-dark={isDark ? 'true' : 'false'}
      data-admin-preset={colorPresetId}
    >
      {/* 1. CLOTH SHOP SEARCH BAR + FILTER BUTTON (Discover Pattern) */}
      <div className="flex items-center gap-2.5">
        <div className="flex-1 h-[48px] rounded-[10px] border border-[#E6E6E6] bg-white px-3.5 flex items-center gap-2.5">
          <Search size={18} className="text-[#999999] flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customers by name, tier..."
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
          onClick={onOpenAllCustomerDirectory}
          className="w-[48px] h-[48px] rounded-[10px] bg-[#1A1A1A] text-white flex items-center justify-center flex-shrink-0 cursor-pointer hover:opacity-95 transition"
          title="Open Full Customer Directory"
        >
          <SlidersHorizontal size={18} />
        </button>
      </div>

      {/* 2. CLOTH SHOP RECTANGULAR FILTER PILLS (10px Radius) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'all' as CohortFilter, label: 'All (1,420)' },
          { id: 'vip' as CohortFilter, label: 'VIP Spenders (84)' },
          { id: 'retention' as CohortFilter, label: 'Retention (312)' },
        ].map((tab) => {
          const active = activeCohort === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCohort(tab.id)}
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

      {/* 3. CUSTOMER COHORT CARDS (V1: Horizontal Cart Card | V2: 2-Column Discover Portrait Grid | V3: Compact Ledger Rows) */}
      {variant === 'varient_2' ? (
        <div className="grid grid-cols-2 gap-3.5">
          {visibleProfiles.map((cust) => (
            <div
              key={cust.id}
              onClick={() => onOpenCustomerProfile?.(cust.id)}
              className="p-2.5 rounded-[12px] border border-[#E6E6E6] bg-white space-y-2 cursor-pointer hover:border-[#1A1A1A] transition"
            >
              <div className="relative h-[145px] rounded-[8px] bg-[#F2F2F2] overflow-hidden">
                <img
                  src={cust.avatar}
                  alt={cust.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-[6px] bg-white text-[10px] font-bold text-[#1A1A1A]">
                  {cust.badge}
                </span>
              </div>
              <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                {cust.name}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-[#1A1A1A]">
                  {cust.ltv}
                </span>
                <span className="text-[11px] text-[#808080]">{cust.orders}</span>
              </div>
            </div>
          ))}
        </div>
      ) : variant === 'varient_3' ? (
        <div className="rounded-[12px] border border-[#E6E6E6] bg-white divide-y divide-[#E6E6E6]">
          {visibleProfiles.map((cust) => (
            <div
              key={cust.id}
              onClick={() => onOpenCustomerProfile?.(cust.id)}
              className="p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#F7F7F7] transition"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={cust.avatar}
                  alt={cust.name}
                  className="w-12 h-12 rounded-full bg-[#F2F2F2] object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                    {cust.name}
                  </div>
                  <div className="text-[12px] text-[#808080] truncate">
                    {cust.subtitle}
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-[15px] font-bold text-[#1A1A1A]">
                  {cust.ltv}
                </div>
                <span className="text-[11px] font-semibold text-[#808080]">
                  {cust.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : variant === 'varient_4' ? (
        /* V4: Executive Dark Header VIP Cohort Cards */
        <div className="space-y-3">
          {visibleProfiles.map((cust) => (
            <div
              key={cust.id}
              onClick={() => onOpenCustomerProfile?.(cust.id)}
              className="rounded-[12px] border border-[#E6E6E6] bg-white overflow-hidden cursor-pointer hover:border-[#1A1A1A] transition"
            >
              <div className="px-3.5 py-2 bg-[#1A1A1A] text-white flex items-center justify-between text-[11px] font-bold">
                <span>{cust.badge}</span>
                <span>{cust.orders}</span>
              </div>
              <div className="p-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={cust.avatar}
                    alt={cust.name}
                    className="w-12 h-12 rounded-[8px] object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                      {cust.name}
                    </div>
                    <div className="text-[12px] text-[#808080] truncate">
                      {cust.subtitle}
                    </div>
                  </div>
                </div>
                <span className="text-[15px] font-bold text-[#1A1A1A]">
                  {cust.ltv}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : variant === 'varient_5' ? (
        /* V5: Bento Soft Surface Cohort Cards */
        <div className="space-y-2.5">
          {visibleProfiles.map((cust) => (
            <div
              key={cust.id}
              onClick={() => onOpenCustomerProfile?.(cust.id)}
              className="p-3.5 rounded-[12px] bg-[#F7F7F7] border border-[#E6E6E6] flex items-center justify-between gap-3 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <img
                  src={cust.avatar}
                  alt={cust.name}
                  className="w-11 h-11 rounded-[10px] object-cover"
                />
                <div>
                  <div className="text-[14px] font-bold text-[#1A1A1A]">
                    {cust.name}
                  </div>
                  <div className="text-[12px] text-[#808080]">
                    {cust.ltv} • {cust.badge}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCustomerProfile?.(cust.id);
                }}
                className="h-[30px] px-3 rounded-[8px] bg-[#1A1A1A] text-white text-[11px] font-semibold cursor-pointer"
              >
                {cust.actionLabel}
              </button>
            </div>
          ))}
        </div>
      ) : variant === 'varient_6' ? (
        /* V6: Centered Portrait Badge Cards (2-Col) */
        <div className="grid grid-cols-2 gap-3">
          {visibleProfiles.map((cust) => (
            <div
              key={cust.id}
              onClick={() => onOpenCustomerProfile?.(cust.id)}
              className="p-3.5 rounded-[12px] border border-[#E6E6E6] bg-white flex flex-col items-center text-center gap-2 cursor-pointer"
            >
              <img
                src={cust.avatar}
                alt={cust.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                  {cust.name}
                </div>
                <div className="text-[11px] text-[#808080]">{cust.badge}</div>
              </div>
              <div className="w-full pt-2 border-t border-[#E6E6E6] flex items-center justify-between text-[12px]">
                <span className="font-bold text-[#1A1A1A]">{cust.ltv}</span>
                <span className="text-[#808080]">{cust.actionLabel}</span>
              </div>
            </div>
          ))}
        </div>
      ) : variant === 'varient_7' ? (
        /* V7: Outlined Editorial Customer Cards */
        <div className="space-y-2.5">
          {visibleProfiles.map((cust) => (
            <div
              key={cust.id}
              onClick={() => onOpenCustomerProfile?.(cust.id)}
              className="p-3.5 rounded-[12px] border-2 border-[#1A1A1A] bg-white flex items-center justify-between cursor-pointer"
            >
              <div>
                <span className="px-2 py-0.5 rounded-[4px] bg-[#F2F2F2] text-[10px] font-bold text-[#1A1A1A]">
                  {cust.badge}
                </span>
                <div className="text-[15px] font-bold text-[#1A1A1A] mt-1">
                  {cust.name}
                </div>
                <div className="text-[12px] text-[#808080]">{cust.subtitle}</div>
              </div>
              <div className="text-right">
                <div className="text-[16px] font-bold text-[#1A1A1A]">{cust.ltv}</div>
                <span className="text-[11px] font-semibold underline">
                  {cust.actionLabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : variant === 'varient_8' ? (
        /* V8: Studio Capsule Numbered CRM Cards */
        <div className="space-y-2.5">
          {visibleProfiles.map((cust, idx) => (
            <div
              key={cust.id}
              onClick={() => onOpenCustomerProfile?.(cust.id)}
              className="p-3 rounded-[10px] border border-[#E6E6E6] bg-white flex items-center justify-between gap-3 cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-7 h-7 rounded-[6px] bg-[#1A1A1A] text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">
                  0{idx + 1}
                </span>
                <div className="min-w-0">
                  <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                    {cust.name}
                  </div>
                  <div className="text-[11px] text-[#808080] truncate">
                    {cust.badge} • {cust.subtitle}
                  </div>
                </div>
              </div>
              <span className="text-[14px] font-bold text-[#1A1A1A] flex-shrink-0">
                {cust.ltv}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3.5">
          {visibleProfiles.map((cust) => (
            <div
              key={cust.id}
              onClick={() => onOpenCustomerProfile?.(cust.id)}
              className="p-[14px] rounded-[12px] border border-[#E6E6E6] bg-white flex gap-[14px] cursor-pointer hover:border-[#1A1A1A] transition"
            >
              <img
                src={cust.avatar}
                alt={cust.name}
                className="w-[82px] h-[82px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
              />
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[15px] font-bold text-[#1A1A1A] truncate">
                      {cust.name}
                    </div>
                    <div className="text-[13px] text-[#808080] mt-0.5 truncate">
                      {cust.subtitle}
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-[6px] text-[11px] font-semibold flex-shrink-0 ${
                      cust.badge === 'At Risk'
                        ? 'bg-[#FDE8E8] text-[#ED1010]'
                        : 'bg-[#F7F7F7] text-[#1A1A1A]'
                    }`}
                  >
                    {cust.badge}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-[16px] font-bold text-[#1A1A1A]">
                    {cust.ltv}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onTriggerToast?.(`Sent direct message to ${cust.name}`);
                      }}
                      className="h-[30px] px-2.5 rounded-[8px] border border-[#E6E6E6] bg-white text-[12px] font-semibold text-[#1A1A1A] flex items-center gap-1 cursor-pointer hover:bg-[#F7F7F7]"
                    >
                      <Mail size={13} />
                      <span>Email</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenCustomerProfile?.(cust.id);
                      }}
                      className="h-[30px] px-3 rounded-[8px] bg-[#1A1A1A] text-white text-[12px] font-semibold flex items-center gap-1 cursor-pointer hover:opacity-95"
                    >
                      <span>{cust.actionLabel}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. CRM SUMMARY LEDGER ROWS (Exact Cloth Shop MyCart Summary Pattern) */}
      <div className="pt-2 space-y-2.5">
        <div className="flex items-center justify-between text-[14px]">
          <span className="text-[#808080]">Average Customer LTV</span>
          <span className="font-semibold text-[#1A1A1A]">$ 842.00</span>
        </div>
        <div className="flex items-center justify-between text-[14px]">
          <span className="text-[#808080]">Repeat Buyer Rate</span>
          <span className="font-semibold text-[#1A1A1A]">64.8%</span>
        </div>
        <div className="flex items-center justify-between text-[14px]">
          <span className="text-[#808080]">90-Day Retention</span>
          <span className="font-semibold text-[#1A1A1A]">94.2%</span>
        </div>
        <div className="h-[1px] bg-[#E6E6E6] my-1" />
        <div className="flex items-center justify-between">
          <span className="text-[16px] font-medium text-[#1A1A1A]">
            Total Active Customers
          </span>
          <span className="text-[17px] font-bold text-[#1A1A1A]">1,420</span>
        </div>
      </div>

      {/* 5. CLOTH SHOP PRIMARY CTA BUTTON (Exact 52px height, 10px radius, ArrowRight) */}
      <button
        type="button"
        onClick={() => {
          if (onOpenAllCustomerDirectory) {
            onOpenAllCustomerDirectory();
          } else {
            onTriggerToast?.('Opening All 1,420 Customer Directory');
          }
        }}
        className="w-full h-[52px] rounded-[10px] bg-[#1A1A1A] text-white text-[15px] font-semibold flex items-center justify-center gap-2.5 cursor-pointer hover:opacity-95 transition"
      >
        <span>View All 1,420 Customers</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default CustomersVarient1;
