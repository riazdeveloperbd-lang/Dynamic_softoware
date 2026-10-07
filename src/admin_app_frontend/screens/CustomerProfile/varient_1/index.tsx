import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Check,
  Gift,
  Mail,
  Phone,
} from 'lucide-react';
import {
  getAdminThemeScopeStyle,
  useAdminDesignSystem,
} from '../../../styles/adminDesignSystem';

export interface CustomerProfileVarient1Props {
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
  onViewOrderDetail?: (orderId?: string) => void;
  onViewAllCustomers?: () => void;
  onTriggerToast?: (msg: string) => void;
}

export const CustomerProfileVarient1: React.FC<CustomerProfileVarient1Props> = ({
  variant = 'varient_1',
  onBack,
  onViewOrderDetail,
  onTriggerToast,
}) => {
  const { palette, activeFont, isDark, colorPresetId } = useAdminDesignSystem();
  const [vipOfferSent, setVipOfferSent] = useState(false);

  const recentOrders = [
    {
      id: '#8942',
      title: 'Regular Fit Slogan',
      subtitle: 'Size M • 2 items',
      status: 'Packing',
      price: '$ 1,190',
      image:
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=240&q=80',
    },
    {
      id: '#8812',
      title: 'Regular Fit Polo',
      subtitle: 'Size M • 3 items',
      status: 'Delivered',
      price: '$ 2,450',
      image:
        'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=240&q=80',
    },
    {
      id: '#8704',
      title: 'Regular Fit Black',
      subtitle: 'Size L • 1 item',
      status: 'Delivered',
      price: '$ 1,290',
      image:
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=240&q=80',
    },
  ];

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
          Customer Profile
        </h1>
        <button
          type="button"
          onClick={() => onTriggerToast?.('Shared Marcus Chen VIP Profile')}
          className="w-9 h-9 -mr-1.5 flex items-center justify-center text-[#1A1A1A] cursor-pointer"
        >
          <Bell size={22} strokeWidth={2} />
        </button>
      </div>

      <div className="px-5 space-y-4">
        {/* 2. VIP IDENTITY CARD (V1: Horizontal Card | V2: Centered Portrait Card | V3: Dark VIP Dossier Card) */}
        {variant === 'varient_2' ? (
          <div className="p-4 rounded-[12px] border border-[#E6E6E6] bg-white flex flex-col items-center text-center space-y-2.5">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80"
              alt="Marcus Chen"
              className="w-20 h-20 rounded-full bg-[#F2F2F2] object-cover"
            />
            <div>
              <div className="text-[17px] font-bold text-[#1A1A1A]">
                Marcus Chen
              </div>
              <div className="text-[13px] text-[#808080]">
                marcus.chen@studio.io • $ 8,420 LTV
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => onTriggerToast?.('Calling +1 (212) 849-0192')}
                className="h-[34px] px-4 rounded-[8px] border border-[#E6E6E6] bg-white text-[12px] font-semibold text-[#1A1A1A] flex items-center gap-1.5 cursor-pointer"
              >
                <Phone size={13} />
                <span>Call</span>
              </button>
              <button
                type="button"
                onClick={() => onTriggerToast?.('Opened email composer')}
                className="h-[34px] px-4 rounded-[8px] bg-[#1A1A1A] text-white text-[12px] font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Mail size={13} />
                <span>Email</span>
              </button>
            </div>
          </div>
        ) : variant === 'varient_3' ? (
          <div className="p-4 rounded-[12px] bg-[#1A1A1A] text-white space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80"
                  alt="Marcus Chen"
                  className="w-12 h-12 rounded-[8px] object-cover"
                />
                <div>
                  <div className="text-[16px] font-bold">Marcus Chen</div>
                  <div className="text-[12px] opacity-75">
                    VIP Whale • Top 1% Spend
                  </div>
                </div>
              </div>
              <span className="text-[18px] font-bold">$ 8,420</span>
            </div>
          </div>
        ) : variant === 'varient_4' ? (
          /* V4: Bento Split VIP Identity Card */
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-7 p-3.5 rounded-[12px] border border-[#E6E6E6] bg-white flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80"
                alt="Marcus Chen"
                className="w-12 h-12 rounded-[8px] object-cover"
              />
              <div className="min-w-0">
                <div className="text-[15px] font-bold text-[#1A1A1A] truncate">
                  Marcus Chen
                </div>
                <div className="text-[11px] text-[#808080] truncate">
                  VIP Whale • 14 Orders
                </div>
              </div>
            </div>
            <div className="col-span-5 p-3.5 rounded-[12px] bg-[#1A1A1A] text-white flex flex-col justify-center">
              <span className="text-[10px] opacity-75">Lifetime LTV</span>
              <span className="text-[17px] font-bold">$ 8,420</span>
            </div>
          </div>
        ) : variant === 'varient_5' ? (
          /* V5: Soft Surface VIP Banner */
          <div className="p-4 rounded-[12px] bg-[#F7F7F7] border border-[#E6E6E6] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80"
                alt="Marcus Chen"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <span className="px-2 py-0.5 rounded-[4px] bg-white text-[10px] font-bold text-[#1A1A1A]">
                  VIP Tier 1
                </span>
                <div className="text-[16px] font-bold text-[#1A1A1A] mt-0.5">
                  Marcus Chen
                </div>
                <div className="text-[12px] text-[#808080]">$ 8,420 LTV</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onTriggerToast?.('Opened email composer')}
              className="h-[34px] px-3.5 rounded-[8px] bg-[#1A1A1A] text-white text-[12px] font-semibold cursor-pointer"
            >
              Contact
            </button>
          </div>
        ) : variant === 'varient_6' ? (
          /* V6: Lookbook Cover Dossier Card */
          <div className="rounded-[12px] border border-[#E6E6E6] bg-white overflow-hidden">
            <div className="h-14 bg-[#1A1A1A] px-4 flex items-center justify-between text-white">
              <span className="text-[12px] font-bold">VIP CONCIERGE DOSSIER</span>
              <span className="text-[13px] font-bold">$ 8,420 LTV</span>
            </div>
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80"
                  alt="Marcus Chen"
                  className="w-12 h-12 rounded-[8px] object-cover"
                />
                <div>
                  <div className="text-[15px] font-bold text-[#1A1A1A]">
                    Marcus Chen
                  </div>
                  <div className="text-[12px] text-[#808080]">
                    marcus.chen@studio.io
                  </div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-[6px] bg-[#E7F7E7] text-[#0C9409] text-[11px] font-bold">
                Active
              </span>
            </div>
          </div>
        ) : variant === 'varient_7' ? (
          /* V7: Outlined Double-Border VIP Card */
          <div className="p-4 rounded-[12px] border-2 border-[#1A1A1A] bg-white flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase text-[#808080]">
                VIP Whale • Top 1%
              </div>
              <div className="text-[18px] font-bold text-[#1A1A1A] mt-0.5">
                Marcus Chen
              </div>
              <div className="text-[12px] text-[#808080]">
                marcus.chen@studio.io
              </div>
            </div>
            <div className="text-right">
              <div className="text-[18px] font-bold text-[#1A1A1A]">$ 8,420</div>
              <div className="text-[11px] text-[#0C9409] font-semibold">
                14 Completed
              </div>
            </div>
          </div>
        ) : variant === 'varient_8' ? (
          /* V8: Studio Capsule Numbered VIP Header */
          <div className="p-3.5 rounded-[12px] border border-[#E6E6E6] bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-[8px] bg-[#1A1A1A] text-white text-[13px] font-bold flex items-center justify-center">
                #01
              </span>
              <div>
                <div className="text-[15px] font-bold text-[#1A1A1A]">
                  Marcus Chen
                </div>
                <div className="text-[12px] text-[#808080]">
                  VIP Whale • $ 8,420 LTV
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onTriggerToast?.('Calling +1 (212) 849-0192')}
              className="h-[32px] px-3 rounded-[8px] bg-[#1A1A1A] text-white text-[12px] font-semibold cursor-pointer"
            >
              Call VIP
            </button>
          </div>
        ) : (
        <div className="p-[14px] rounded-[12px] border border-[#E6E6E6] bg-white flex gap-[14px]">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80"
            alt="Marcus Chen"
            className="w-[82px] h-[82px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
          />
          <div className="flex-1 flex flex-col justify-between min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-[16px] font-bold text-[#1A1A1A]">
                  Marcus Chen
                </div>
                <div className="text-[13px] text-[#808080] mt-0.5">
                  marcus.chen@studio.io
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-[6px] bg-[#F7F7F7] text-[11px] font-semibold text-[#1A1A1A]">
                VIP Whale
              </span>
            </div>

            <div className="flex items-center justify-between mt-3">
              <span className="text-[16px] font-bold text-[#1A1A1A]">
                $ 8,420 LTV
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onTriggerToast?.('Calling +1 (212) 849-0192')}
                  className="h-[30px] px-2.5 rounded-[8px] border border-[#E6E6E6] bg-white text-[12px] font-semibold text-[#1A1A1A] flex items-center gap-1 cursor-pointer hover:bg-[#F7F7F7]"
                >
                  <Phone size={12} />
                  <span>Call</span>
                </button>
                <button
                  type="button"
                  onClick={() => onTriggerToast?.('Opened email composer')}
                  className="h-[30px] px-2.5 rounded-[8px] bg-[#1A1A1A] text-white text-[12px] font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Mail size={12} />
                  <span>Email</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* 3. GARMENT SIZE & STYLE DNA PILLS (Cloth Shop Size Pill Pattern) */}
        <div className="space-y-2">
          <div className="text-[15px] font-bold text-[#1A1A1A]">
            Preferred Fit &amp; Sizes
          </div>
          <div className="flex items-center gap-2">
            {['Tops: M', 'Bottoms: 32W', 'Shoes: 42 EU', 'Fit: Regular'].map(
              (pill, idx) => (
                <span
                  key={pill}
                  className={`h-[36px] px-3.5 rounded-[10px] text-[12px] flex items-center justify-center ${
                    idx === 0
                      ? 'bg-[#1A1A1A] text-white font-semibold'
                      : 'bg-white border border-[#E6E6E6] text-[#1A1A1A] font-medium'
                  }`}
                >
                  {pill}
                </span>
              )
            )}
          </div>
        </div>

        {/* 4. RECENT ORDERS LIST (1:1 Cloth Shop MyCart / MyOrders Cards) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-bold text-[#1A1A1A]">
              Order History (14)
            </h3>
            <span className="text-[12px] text-[#808080]">98.4% Keep Rate</span>
          </div>

          {recentOrders.map((ord) => (
            <div
              key={ord.id}
              onClick={() => onViewOrderDetail?.(ord.id)}
              className="p-[14px] rounded-[12px] border border-[#E6E6E6] bg-white flex gap-[14px] cursor-pointer hover:border-[#1A1A1A] transition"
            >
              <img
                src={ord.image}
                alt={ord.title}
                className="w-[76px] h-[76px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
              />
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-[15px] font-bold text-[#1A1A1A]">
                      {ord.title} ({ord.id})
                    </div>
                    <div className="text-[13px] text-[#808080] mt-0.5">
                      {ord.subtitle}
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-[6px] text-[11px] font-semibold ${
                      ord.status === 'Delivered'
                        ? 'bg-[#E7F7E7] text-[#0C9409]'
                        : 'bg-[#F7F7F7] text-[#1A1A1A]'
                    }`}
                  >
                    {ord.status}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-2.5">
                  <span className="text-[16px] font-bold text-[#1A1A1A]">
                    {ord.price}
                  </span>
                  <span className="h-[28px] px-3 rounded-[8px] bg-[#1A1A1A] text-white text-[12px] font-semibold flex items-center">
                    Track Order
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 5. CUSTOMER EQUITY SUMMARY LEDGER (Exact Cloth Shop MyCart Summary Pattern) */}
        <div className="pt-2 space-y-2.5">
          <div className="flex items-center justify-between text-[15px]">
            <span className="text-[#808080]">Average Order Value</span>
            <span className="font-semibold text-[#1A1A1A]">$ 601.40</span>
          </div>
          <div className="flex items-center justify-between text-[15px]">
            <span className="text-[#808080]">Return Rate</span>
            <span className="font-semibold text-[#1A1A1A]">1.6%</span>
          </div>
          <div className="flex items-center justify-between text-[15px]">
            <span className="text-[#808080]">VIP Concierge Tier</span>
            <span className="font-semibold text-[#1A1A1A]">Top 1%</span>
          </div>
          <div className="h-[1px] bg-[#E6E6E6] my-1" />
          <div className="flex items-center justify-between">
            <span className="text-[16px] font-medium text-[#1A1A1A]">
              Lifetime Spend
            </span>
            <span className="text-[17px] font-bold text-[#1A1A1A]">
              $ 8,420
            </span>
          </div>
        </div>

        {/* 6. CLOTH SHOP PRIMARY CTA BUTTON */}
        <button
          type="button"
          onClick={() => {
            setVipOfferSent(true);
            onTriggerToast?.('Dispatched 20% Private Lookbook Gift to Marcus Chen');
          }}
          className="w-full h-[54px] rounded-[10px] bg-[#1A1A1A] text-white text-[16px] font-semibold flex items-center justify-center gap-2.5 cursor-pointer hover:opacity-95 transition"
        >
          <span>
            {vipOfferSent ? 'VIP Private Offer Sent' : 'Send VIP Gift & Offer'}
          </span>
          {vipOfferSent ? <Check size={19} /> : <ArrowRight size={19} />}
        </button>
      </div>
    </div>
  );
};

export default CustomerProfileVarient1;
