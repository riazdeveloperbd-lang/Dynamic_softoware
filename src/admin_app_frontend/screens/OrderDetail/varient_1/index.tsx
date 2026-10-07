import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Check,
  CheckCircle2,
  MapPin,
  Minus,
  Plus,
  Printer,
  Truck,
  User,
} from 'lucide-react';
import {
  getAdminThemeScopeStyle,
  useAdminDesignSystem,
} from '../../../styles/adminDesignSystem';

export interface OrderDetailVarient1Props {
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
  onOpenCustomerProfile?: () => void;
  onTriggerToast?: (msg: string) => void;
}

export const OrderDetailVarient1: React.FC<OrderDetailVarient1Props> = ({
  variant = 'varient_1',
  onBack,
  onOpenCustomerProfile,
  onTriggerToast,
}) => {
  const { palette, activeFont, isDark, colorPresetId } = useAdminDesignSystem();
  const [qty1, setQty1] = useState(2);
  const [qty2, setQty2] = useState(1);
  const [item1Verified, setItem1Verified] = useState(true);
  const [item2Verified, setItem2Verified] = useState(false);
  const [orderMarkedPacked, setOrderMarkedPacked] = useState(false);

  const subTotal = qty1 * 1190 + qty2 * 1100;
  const shippingFee = 80;
  const total = subTotal + shippingFee;

  return (
    <div
      className="admin-theme-scope flex flex-col min-h-full bg-white text-[#1A1A1A] pb-6 relative"
      style={getAdminThemeScopeStyle(palette, activeFont)}
      data-admin-dark={isDark ? 'true' : 'false'}
      data-admin-preset={colorPresetId}
    >
      {/* 1. CLOTH SHOP APP HEADER (Exact MyCart Header Pattern: Left Back, Centered Title, Right Bell) */}
      <div className="px-5 pt-3 pb-3 bg-white flex items-center justify-between sticky top-0 z-30">
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 -ml-1.5 flex items-center justify-center text-[#1A1A1A] cursor-pointer"
        >
          <ArrowLeft size={22} strokeWidth={2} />
        </button>
        <h1 className="text-[19px] font-bold text-[#1A1A1A]">
          Order #8942
        </h1>
        <button
          type="button"
          onClick={() => onTriggerToast?.('Printed thermal waybill #DHL-9842-US')}
          className="w-9 h-9 -mr-1.5 flex items-center justify-center text-[#1A1A1A] cursor-pointer"
          title="Print Waybill"
        >
          <Bell size={22} strokeWidth={2} />
        </button>
      </div>

      <div className="px-5 space-y-4">
        {/* 2. PICKING LIST ITEMS (V1: MyCart Horizontal Cards | V2: 2-Column Picking Grid | V3: Thermal Manifest Table) */}
        {variant === 'varient_2' ? (
          <div className="grid grid-cols-2 gap-3.5">
            <div className="p-2.5 rounded-[12px] border border-[#E6E6E6] bg-white space-y-2">
              <div className="relative h-[135px] rounded-[8px] bg-[#F2F2F2] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=240&q=80"
                  alt="Regular Fit Slogan"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-[6px] bg-white text-[10px] font-bold text-[#1A1A1A]">
                  Bin A-14
                </span>
              </div>
              <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                Regular Fit Slogan
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-[#1A1A1A]">$ 1,190</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setQty1((q) => Math.max(1, q - 1))}
                    className="w-[22px] h-[22px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center cursor-pointer"
                  >
                    <Minus size={11} />
                  </button>
                  <span className="text-[12px] font-bold">{qty1}</span>
                  <button
                    type="button"
                    onClick={() => setQty1((q) => q + 1)}
                    className="w-[22px] h-[22px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center cursor-pointer"
                  >
                    <Plus size={11} />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-[12px] border border-[#E6E6E6] bg-white space-y-2">
              <div className="relative h-[135px] rounded-[8px] bg-[#F2F2F2] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=240&q=80"
                  alt="Regular Fit Polo"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-[6px] bg-white text-[10px] font-bold text-[#1A1A1A]">
                  Bin B-04
                </span>
              </div>
              <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                Regular Fit Polo
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-[#1A1A1A]">$ 1,100</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setQty2((q) => Math.max(1, q - 1))}
                    className="w-[22px] h-[22px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center cursor-pointer"
                  >
                    <Minus size={11} />
                  </button>
                  <span className="text-[12px] font-bold">{qty2}</span>
                  <button
                    type="button"
                    onClick={() => setQty2((q) => q + 1)}
                    className="w-[22px] h-[22px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center cursor-pointer"
                  >
                    <Plus size={11} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : variant === 'varient_3' ? (
          <div className="rounded-[12px] border border-[#E6E6E6] bg-white divide-y divide-[#E6E6E6]">
            <div className="p-3.5 flex items-center justify-between bg-[#F7F7F7]">
              <span className="text-[12px] font-bold text-[#1A1A1A]">
                WAYBILL #DHL-9842-US
              </span>
              <span className="text-[12px] font-semibold text-[#0C9409]">
                2 Line Items
              </span>
            </div>
            <div className="p-3.5 flex items-center justify-between gap-3">
              <div>
                <div className="text-[14px] font-bold text-[#1A1A1A]">
                  Regular Fit Slogan (Size M)
                </div>
                <div className="text-[12px] text-[#808080]">Bin A-14 • $ 1,190</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQty1((q) => Math.max(1, q - 1))}
                  className="w-[24px] h-[24px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center cursor-pointer"
                >
                  <Minus size={12} />
                </button>
                <span className="text-[13px] font-bold">{qty1}</span>
                <button
                  type="button"
                  onClick={() => setQty1((q) => q + 1)}
                  className="w-[24px] h-[24px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center cursor-pointer"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>
            <div className="p-3.5 flex items-center justify-between gap-3">
              <div>
                <div className="text-[14px] font-bold text-[#1A1A1A]">
                  Regular Fit Polo (Size L)
                </div>
                <div className="text-[12px] text-[#808080]">Bin B-04 • $ 1,100</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQty2((q) => Math.max(1, q - 1))}
                  className="w-[24px] h-[24px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center cursor-pointer"
                >
                  <Minus size={12} />
                </button>
                <span className="text-[13px] font-bold">{qty2}</span>
                <button
                  type="button"
                  onClick={() => setQty2((q) => q + 1)}
                  className="w-[24px] h-[24px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center cursor-pointer"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>
          </div>
        ) : variant === 'varient_4' ? (
          /* V4: Executive Dark Header Picking Cards */
          <div className="space-y-3">
            {[
              {
                name: 'Regular Fit Slogan',
                bin: 'Bin A-14 • Size M',
                price: '$ 1,190',
                qty: qty1,
                onDec: () => setQty1((q) => Math.max(1, q - 1)),
                onInc: () => setQty1((q) => q + 1),
                verified: item1Verified,
                onToggle: () => setItem1Verified(!item1Verified),
              },
              {
                name: 'Regular Fit Polo',
                bin: 'Bin B-04 • Size L',
                price: '$ 1,100',
                qty: qty2,
                onDec: () => setQty2((q) => Math.max(1, q - 1)),
                onInc: () => setQty2((q) => q + 1),
                verified: item2Verified,
                onToggle: () => setItem2Verified(!item2Verified),
              },
            ].map((it) => (
              <div
                key={it.name}
                className="rounded-[12px] border border-[#E6E6E6] bg-white overflow-hidden"
              >
                <div className="px-3.5 py-2 bg-[#1A1A1A] text-white flex items-center justify-between text-[12px]">
                  <span className="font-bold">{it.bin}</span>
                  <button
                    type="button"
                    onClick={it.onToggle}
                    className="underline cursor-pointer"
                  >
                    {it.verified ? 'Verified ✓' : 'Scan Barcode'}
                  </button>
                </div>
                <div className="p-3.5 flex items-center justify-between">
                  <div>
                    <div className="text-[14px] font-bold text-[#1A1A1A]">
                      {it.name}
                    </div>
                    <div className="text-[13px] font-semibold text-[#808080] mt-0.5">
                      {it.price}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={it.onDec}
                      className="w-[24px] h-[24px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center cursor-pointer"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-[13px] font-bold">{it.qty}</span>
                    <button
                      type="button"
                      onClick={it.onInc}
                      className="w-[24px] h-[24px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center cursor-pointer"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : variant === 'varient_5' ? (
          /* V5: Bento Split Picking Cards */
          <div className="space-y-2.5">
            {[
              {
                name: 'Regular Fit Slogan',
                bin: 'Bin A-14',
                price: '$ 1,190',
                qty: qty1,
                onDec: () => setQty1((q) => Math.max(1, q - 1)),
                onInc: () => setQty1((q) => q + 1),
              },
              {
                name: 'Regular Fit Polo',
                bin: 'Bin B-04',
                price: '$ 1,100',
                qty: qty2,
                onDec: () => setQty2((q) => Math.max(1, q - 1)),
                onInc: () => setQty2((q) => q + 1),
              },
            ].map((it) => (
              <div
                key={it.name}
                className="p-3.5 rounded-[12px] bg-[#F7F7F7] border border-[#E6E6E6] flex items-center justify-between"
              >
                <div>
                  <span className="px-2 py-0.5 rounded-[4px] bg-[#1A1A1A] text-white text-[10px] font-bold">
                    {it.bin}
                  </span>
                  <div className="text-[14px] font-bold text-[#1A1A1A] mt-1">
                    {it.name}
                  </div>
                  <div className="text-[12px] text-[#808080]">{it.price}</div>
                </div>
                <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-[8px] border border-[#E6E6E6]">
                  <button type="button" onClick={it.onDec} className="cursor-pointer">
                    <Minus size={12} />
                  </button>
                  <span className="text-[13px] font-bold px-1">{it.qty}</span>
                  <button type="button" onClick={it.onInc} className="cursor-pointer">
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : variant === 'varient_6' ? (
          /* V6: Lookbook Banner Picking Cards */
          <div className="space-y-3">
            {[
              {
                name: 'Regular Fit Slogan',
                bin: 'Bin A-14 • Size M',
                price: '$ 1,190',
                qty: qty1,
                img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80',
                onDec: () => setQty1((q) => Math.max(1, q - 1)),
                onInc: () => setQty1((q) => q + 1),
              },
              {
                name: 'Regular Fit Polo',
                bin: 'Bin B-04 • Size L',
                price: '$ 1,100',
                qty: qty2,
                img: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=400&q=80',
                onDec: () => setQty2((q) => Math.max(1, q - 1)),
                onInc: () => setQty2((q) => q + 1),
              },
            ].map((it) => (
              <div
                key={it.name}
                className="rounded-[12px] border border-[#E6E6E6] bg-white overflow-hidden"
              >
                <div className="relative h-[96px] bg-[#F2F2F2]">
                  <img src={it.img} alt={it.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-[6px] bg-white text-[11px] font-bold text-[#1A1A1A]">
                    {it.bin}
                  </span>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <div className="text-[14px] font-bold text-[#1A1A1A]">{it.name}</div>
                    <div className="text-[12px] text-[#808080]">{it.price}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={it.onDec}
                      className="w-[24px] h-[24px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center cursor-pointer"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-[13px] font-bold">{it.qty}</span>
                    <button
                      type="button"
                      onClick={it.onInc}
                      className="w-[24px] h-[24px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center cursor-pointer"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : variant === 'varient_7' ? (
          /* V7: Outlined Double-Border Picking Cards */
          <div className="space-y-3">
            {[
              {
                name: 'Regular Fit Slogan',
                bin: 'Bin A-14 • Size M',
                price: '$ 1,190',
                qty: qty1,
                onDec: () => setQty1((q) => Math.max(1, q - 1)),
                onInc: () => setQty1((q) => q + 1),
              },
              {
                name: 'Regular Fit Polo',
                bin: 'Bin B-04 • Size L',
                price: '$ 1,100',
                qty: qty2,
                onDec: () => setQty2((q) => Math.max(1, q - 1)),
                onInc: () => setQty2((q) => q + 1),
              },
            ].map((it) => (
              <div
                key={it.name}
                className="p-3.5 rounded-[12px] border-2 border-[#1A1A1A] bg-white flex items-center justify-between"
              >
                <div>
                  <div className="text-[14px] font-bold text-[#1A1A1A]">{it.name}</div>
                  <div className="text-[12px] text-[#808080] mt-0.5">
                    {it.bin} • {it.price}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={it.onDec}
                    className="w-[24px] h-[24px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center cursor-pointer"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-[13px] font-bold">{it.qty}</span>
                  <button
                    type="button"
                    onClick={it.onInc}
                    className="w-[24px] h-[24px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center cursor-pointer"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : variant === 'varient_8' ? (
          /* V8: Studio Capsule Numbered Picking Stack */
          <div className="space-y-2.5">
            {[
              {
                idx: '01',
                name: 'Regular Fit Slogan',
                bin: 'Bin A-14 • $ 1,190',
                qty: qty1,
                onDec: () => setQty1((q) => Math.max(1, q - 1)),
                onInc: () => setQty1((q) => q + 1),
              },
              {
                idx: '02',
                name: 'Regular Fit Polo',
                bin: 'Bin B-04 • $ 1,100',
                qty: qty2,
                onDec: () => setQty2((q) => Math.max(1, q - 1)),
                onInc: () => setQty2((q) => q + 1),
              },
            ].map((it) => (
              <div
                key={it.idx}
                className="p-3 rounded-[10px] border border-[#E6E6E6] bg-white flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-[6px] bg-[#1A1A1A] text-white text-[11px] font-bold flex items-center justify-center">
                    {it.idx}
                  </span>
                  <div>
                    <div className="text-[14px] font-bold text-[#1A1A1A]">{it.name}</div>
                    <div className="text-[11px] text-[#808080]">{it.bin}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={it.onDec}
                    className="w-[24px] h-[24px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center cursor-pointer"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-[13px] font-bold">{it.qty}</span>
                  <button
                    type="button"
                    onClick={it.onInc}
                    className="w-[24px] h-[24px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center cursor-pointer"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
        <div className="space-y-3.5">
          {/* Item 1 */}
          <div className="p-[14px] rounded-[12px] border border-[#E6E6E6] bg-white flex gap-[14px]">
            <img
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=240&q=80"
              alt="Regular Fit Slogan"
              className="w-[82px] h-[82px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
            />
            <div className="flex-1 flex flex-col justify-between min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-[15px] font-bold text-[#1A1A1A]">
                    Regular Fit Slogan
                  </div>
                  <div className="text-[13px] text-[#808080] mt-0.5">
                    Size M • Bin A-14
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setItem1Verified(!item1Verified);
                    onTriggerToast?.('Toggled barcode verification for SKU-8021');
                  }}
                  className={`px-2 py-0.5 rounded-[6px] text-[11px] font-semibold cursor-pointer ${
                    item1Verified
                      ? 'bg-[#E7F7E7] text-[#0C9409]'
                      : 'bg-[#F7F7F7] text-[#808080]'
                  }`}
                >
                  {item1Verified ? 'Verified' : 'Verify'}
                </button>
              </div>

              <div className="flex items-center justify-between mt-2">
                <span className="text-[16px] font-bold text-[#1A1A1A]">
                  $ 1,190
                </span>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setQty1((q) => Math.max(1, q - 1))}
                    className="w-[24px] h-[24px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center text-[#1A1A1A] cursor-pointer"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="text-[14px] font-semibold text-[#1A1A1A]">
                    {qty1}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty1((q) => q + 1)}
                    className="w-[24px] h-[24px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center text-[#1A1A1A] cursor-pointer"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="p-[14px] rounded-[12px] border border-[#E6E6E6] bg-white flex gap-[14px]">
            <img
              src="https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=240&q=80"
              alt="Regular Fit Polo"
              className="w-[82px] h-[82px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
            />
            <div className="flex-1 flex flex-col justify-between min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-[15px] font-bold text-[#1A1A1A]">
                    Regular Fit Polo
                  </div>
                  <div className="text-[13px] text-[#808080] mt-0.5">
                    Size L • Bin B-04
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setItem2Verified(!item2Verified);
                    onTriggerToast?.('Verified SKU-4912 barcode');
                  }}
                  className={`px-2 py-0.5 rounded-[6px] text-[11px] font-semibold cursor-pointer ${
                    item2Verified
                      ? 'bg-[#E7F7E7] text-[#0C9409]'
                      : 'bg-[#F7F7F7] text-[#1A1A1A]'
                  }`}
                >
                  {item2Verified ? 'Verified' : 'Scan SKU'}
                </button>
              </div>

              <div className="flex items-center justify-between mt-2">
                <span className="text-[16px] font-bold text-[#1A1A1A]">
                  $ 1,100
                </span>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setQty2((q) => Math.max(1, q - 1))}
                    className="w-[24px] h-[24px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center text-[#1A1A1A] cursor-pointer"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="text-[14px] font-semibold text-[#1A1A1A]">
                    {qty2}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty2((q) => q + 1)}
                    className="w-[24px] h-[24px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center text-[#1A1A1A] cursor-pointer"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* 3. CUSTOMER & SHIPPING ADDRESS CARD (Clean 12px Bordered Card) */}
        <div
          onClick={onOpenCustomerProfile}
          className="p-[14px] rounded-[12px] border border-[#E6E6E6] bg-white space-y-2.5 cursor-pointer hover:border-[#1A1A1A] transition"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80"
                alt="Marcus Chen"
                className="w-10 h-10 rounded-[8px] bg-[#F2F2F2] object-cover"
              />
              <div>
                <div className="text-[14px] font-bold text-[#1A1A1A]">
                  Marcus Chen (VIP Whale)
                </div>
                <div className="text-[12px] text-[#808080]">
                  14 Orders • $ 8,420 LTV
                </div>
              </div>
            </div>
            <span className="text-[12px] font-semibold text-[#1A1A1A]">
              Profile →
            </span>
          </div>

          <div className="pt-2 border-t border-[#E6E6E6] flex items-center justify-between text-[12px] text-[#808080]">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-[#1A1A1A]" />
              <span>742 Evergreen Ter, Austin, TX</span>
            </span>
            <span className="font-mono font-semibold text-[#1A1A1A]">
              #DHL-9842-US
            </span>
          </div>
        </div>

        {/* 4. PRICE SUMMARY SECTION (1:1 Cloth Shop MyCart Summary Pattern) */}
        <div className="pt-2 space-y-3">
          <div className="flex items-center justify-between text-[15px]">
            <span className="text-[#808080]">Sub-total</span>
            <span className="font-semibold text-[#1A1A1A]">
              $ {subTotal.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-[15px]">
            <span className="text-[#808080]">VAT (%)</span>
            <span className="font-semibold text-[#1A1A1A]">$ 0.00</span>
          </div>
          <div className="flex items-center justify-between text-[15px]">
            <span className="text-[#808080]">Shipping fee (DHL Express)</span>
            <span className="font-semibold text-[#1A1A1A]">
              $ {shippingFee}
            </span>
          </div>

          <div className="h-[1px] bg-[#E6E6E6] my-1" />

          <div className="flex items-center justify-between">
            <span className="text-[16px] font-medium text-[#1A1A1A]">Total</span>
            <span className="text-[17px] font-bold text-[#1A1A1A]">
              $ {total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* 5. CLOTH SHOP PRIMARY CTA BUTTON (Exact MyCart "Go To Checkout ->" Pattern) */}
        <button
          type="button"
          onClick={() => {
            setItem1Verified(true);
            setItem2Verified(true);
            setOrderMarkedPacked(true);
            onTriggerToast?.('Order #8942 marked as Packed & Waybill dispatched');
          }}
          className="w-full h-[54px] rounded-[10px] bg-[#1A1A1A] text-white text-[16px] font-semibold flex items-center justify-center gap-2.5 cursor-pointer hover:opacity-95 transition mt-2"
        >
          <span>
            {orderMarkedPacked
              ? 'Order #8942 Packed & Dispatched'
              : 'Mark Packed & Print Waybill'}
          </span>
          {orderMarkedPacked ? <Check size={19} /> : <ArrowRight size={19} />}
        </button>
      </div>
    </div>
  );
};

export default OrderDetailVarient1;
