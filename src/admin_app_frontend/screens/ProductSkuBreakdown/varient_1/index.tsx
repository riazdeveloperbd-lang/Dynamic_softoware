import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Check,
  Minus,
  Plus,
} from 'lucide-react';
import {
  getAdminThemeScopeStyle,
  useAdminDesignSystem,
} from '../../../styles/adminDesignSystem';

export interface ProductSkuBreakdownVarient1Props {
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
  onEditProduct?: () => void;
  onTriggerToast?: (msg: string) => void;
}

export const ProductSkuBreakdownVarient1: React.FC<
  ProductSkuBreakdownVarient1Props
> = ({ variant = 'varient_1', onBack, onEditProduct, onTriggerToast }) => {
  const { palette, activeFont, isDark, colorPresetId } = useAdminDesignSystem();
  const [smallStock, setSmallStock] = useState(45);
  const [mediumStock, setMediumStock] = useState(62);
  const [largeStock, setLargeStock] = useState(35);
  const [savedSync, setSavedSync] = useState(false);

  const totalAggregatedStock = smallStock + mediumStock + largeStock;
  const retailValuation = totalAggregatedStock * 1190;

  // Regional proportional units
  const nyUnits = Math.round(totalAggregatedStock * 0.59);
  const laUnits = Math.round(totalAggregatedStock * 0.3);
  const atlUnits = Math.max(0, totalAggregatedStock - nyUnits - laUnits);

  const sizeRows = [
    {
      id: 'S',
      title: 'Small (SLG-01-S)',
      subtitle: 'Reorder Pt: 20 • NYC/LA',
      price: '$ 1,190',
      badge: 'Healthy',
      qty: smallStock,
      onDec: () => setSmallStock((v) => Math.max(0, v - 1)),
      onInc: () => setSmallStock((v) => v + 1),
      image:
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=240&q=80',
    },
    {
      id: 'M',
      title: 'Medium (SLG-01-M)',
      subtitle: 'Reorder Pt: 25 • Best Seller',
      price: '$ 1,190',
      badge: 'High Turn',
      qty: mediumStock,
      onDec: () => setMediumStock((v) => Math.max(0, v - 1)),
      onInc: () => setMediumStock((v) => v + 1),
      image:
        'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=240&q=80',
    },
    {
      id: 'L',
      title: 'Large (SLG-01-L)',
      subtitle: 'Reorder Pt: 15 • ATL Hub',
      price: '$ 1,190',
      badge: 'In Stock',
      qty: largeStock,
      onDec: () => setLargeStock((v) => Math.max(0, v - 1)),
      onInc: () => setLargeStock((v) => v + 1),
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
          SKU Breakdown
        </h1>
        <button
          type="button"
          onClick={() => {
            if (onEditProduct) {
              onEditProduct();
            } else {
              onTriggerToast?.('Opened Store Taxonomy & Product Editor');
            }
          }}
          className="w-9 h-9 -mr-1.5 flex items-center justify-center text-[#1A1A1A] cursor-pointer"
          title="Notifications & Audit"
        >
          <Bell size={22} strokeWidth={2} />
        </button>
      </div>

      <div className="px-5 space-y-4">
        {/* 2. PRODUCT MASTER CARD (1:1 Cloth Shop MyCart Horizontal Card Pattern) */}
        <div className="p-[14px] rounded-[12px] border border-[#E6E6E6] bg-white flex gap-[14px]">
          <img
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=240&q=80"
            alt="Regular Fit Slogan"
            className="w-[82px] h-[82px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
          />
          <div className="flex-1 flex flex-col justify-between min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[15px] font-bold text-[#1A1A1A] truncate">
                  Regular Fit Slogan
                </div>
                <div className="text-[13px] text-[#808080] mt-0.5 truncate">
                  SKU #SLG-01 • 280GSM
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-[6px] bg-[#E7F7E7] text-[#0C9409] text-[11px] font-semibold flex-shrink-0">
                Active Run
              </span>
            </div>

            <div className="flex items-center justify-between mt-3">
              <span className="text-[16px] font-bold text-[#1A1A1A]">
                $ 1,190
              </span>
              <button
                type="button"
                onClick={onEditProduct}
                className="h-[30px] px-3 rounded-[8px] bg-[#1A1A1A] text-white text-[12px] font-semibold flex items-center gap-1 cursor-pointer hover:opacity-95"
              >
                <span>Edit Taxonomy</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. REGIONAL HUB PILLS (Exact Cloth Shop 10px Radius Pills) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { label: `All Hubs (${totalAggregatedStock})`, active: true },
            { label: `NYC (${nyUnits})`, active: false },
            { label: `LA (${laUnits})`, active: false },
            { label: `ATL (${atlUnits})`, active: false },
          ].map((hub) => (
            <button
              key={hub.label}
              type="button"
              onClick={() => onTriggerToast?.(`Filtered allocation: ${hub.label}`)}
              className={`h-[36px] px-4 rounded-[10px] text-[13px] transition cursor-pointer flex-shrink-0 ${
                hub.active
                  ? 'bg-[#1A1A1A] text-white font-semibold'
                  : 'bg-white border border-[#E6E6E6] text-[#1A1A1A] font-medium hover:bg-[#F7F7F7]'
              }`}
            >
              {hub.label}
            </button>
          ))}
        </div>

        {/* 4. SIZE MATRIX CARDS WITH STEPPERS (V1: Horizontal MyCart Cards | V2: 3-Column Size Allocation Cards | V3: Compact Bin Ledger) */}
        {variant === 'varient_2' ? (
          <div className="grid grid-cols-3 gap-2.5">
            {sizeRows.map((row) => (
              <div
                key={row.id}
                className="p-3 rounded-[12px] border border-[#E6E6E6] bg-white flex flex-col items-center text-center"
              >
                <span className="w-9 h-9 rounded-[8px] bg-[#1A1A1A] text-white text-[14px] font-bold flex items-center justify-center mb-2">
                  {row.id}
                </span>
                <div className="text-[12px] font-bold text-[#1A1A1A] truncate w-full">
                  {row.badge}
                </div>
                <div className="text-[11px] text-[#808080] mt-0.5">
                  {row.price}
                </div>
                <div className="flex items-center gap-1.5 mt-3">
                  <button
                    type="button"
                    onClick={row.onDec}
                    className="w-[24px] h-[24px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center text-[#1A1A1A] cursor-pointer"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-[13px] font-bold text-[#1A1A1A] min-w-[22px]">
                    {row.qty}
                  </span>
                  <button
                    type="button"
                    onClick={row.onInc}
                    className="w-[24px] h-[24px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center text-[#1A1A1A] cursor-pointer"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : variant === 'varient_3' ? (
          <div className="rounded-[12px] border border-[#E6E6E6] bg-white divide-y divide-[#E6E6E6] overflow-hidden">
            {sizeRows.map((row) => (
              <div
                key={row.id}
                className="p-3.5 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-9 h-9 rounded-[8px] bg-[#F2F2F2] text-[#1A1A1A] text-[13px] font-bold flex items-center justify-center flex-shrink-0">
                    {row.id}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                      {row.title}
                    </div>
                    <div className="text-[12px] text-[#808080] mt-0.5">
                      {row.subtitle}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={row.onDec}
                    className="w-[24px] h-[24px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center text-[#1A1A1A] cursor-pointer"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="text-[14px] font-semibold text-[#1A1A1A] min-w-[24px] text-center">
                    {row.qty}
                  </span>
                  <button
                    type="button"
                    onClick={row.onInc}
                    className="w-[24px] h-[24px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center text-[#1A1A1A] cursor-pointer"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : variant === 'varient_4' ? (
          /* V4: Executive Dark Header Size Matrix Cards */
          <div className="space-y-3">
            {sizeRows.map((row) => (
              <div
                key={row.id}
                className="rounded-[12px] border border-[#E6E6E6] bg-white overflow-hidden"
              >
                <div className="px-3.5 py-2 bg-[#1A1A1A] text-white flex items-center justify-between text-[11px] font-semibold">
                  <span>SIZE {row.id} MATRIX</span>
                  <span className="text-white/80">{row.badge}</span>
                </div>
                <div className="p-3.5 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[14px] font-bold text-[#1A1A1A]">
                      {row.title}
                    </div>
                    <div className="text-[12px] text-[#808080] mt-0.5">
                      {row.subtitle}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={row.onDec}
                      className="w-[26px] h-[26px] rounded-[6px] border border-[#E6E6E6] flex items-center justify-center text-[#1A1A1A] cursor-pointer"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="text-[14px] font-bold text-[#1A1A1A] min-w-[24px] text-center">
                      {row.qty}
                    </span>
                    <button
                      type="button"
                      onClick={row.onInc}
                      className="w-[26px] h-[26px] rounded-[6px] border border-[#E6E6E6] flex items-center justify-center text-[#1A1A1A] cursor-pointer"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : variant === 'varient_5' ? (
          /* V5: Split Accent Rail Size Cards */
          <div className="space-y-3">
            {sizeRows.map((row) => (
              <div
                key={row.id}
                className="pl-3.5 pr-3.5 py-3.5 rounded-[12px] border border-[#E6E6E6] border-l-[4px] border-l-[#1A1A1A] bg-white flex items-center justify-between gap-3"
              >
                <div>
                  <div className="text-[14px] font-bold text-[#1A1A1A]">
                    {row.title}
                  </div>
                  <div className="text-[12px] text-[#808080] mt-0.5">
                    {row.subtitle} • {row.price}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={row.onDec}
                    className="w-[24px] h-[24px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center text-[#1A1A1A] cursor-pointer"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-[14px] font-bold text-[#1A1A1A] min-w-[22px] text-center">
                    {row.qty}
                  </span>
                  <button
                    type="button"
                    onClick={row.onInc}
                    className="w-[24px] h-[24px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center text-[#1A1A1A] cursor-pointer"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : variant === 'varient_6' ? (
          /* V6: Soft Filled Surface Size Matrix Cards */
          <div className="space-y-3">
            {sizeRows.map((row) => (
              <div
                key={row.id}
                className="p-3.5 rounded-[12px] bg-[#F7F7F7] border border-[#E6E6E6] flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={row.image}
                    alt={row.title}
                    className="w-[54px] h-[54px] rounded-[8px] bg-white object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                      {row.title}
                    </div>
                    <div className="text-[12px] text-[#808080] mt-0.5">
                      {row.subtitle}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-[8px] border border-[#E6E6E6]">
                  <button
                    type="button"
                    onClick={row.onDec}
                    className="w-[22px] h-[22px] flex items-center justify-center text-[#1A1A1A] cursor-pointer"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-[13px] font-bold text-[#1A1A1A] min-w-[20px] text-center">
                    {row.qty}
                  </span>
                  <button
                    type="button"
                    onClick={row.onInc}
                    className="w-[22px] h-[22px] flex items-center justify-center text-[#1A1A1A] cursor-pointer"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : variant === 'varient_7' ? (
          /* V7: Brutalist Sharp Frame Size Matrix Cards */
          <div className="space-y-3">
            {sizeRows.map((row) => (
              <div
                key={row.id}
                className="p-3.5 rounded-[4px] border-2 border-[#1A1A1A] bg-white shadow-[2px_2px_0px_#1A1A1A] flex items-center justify-between gap-3"
              >
                <div>
                  <div className="text-[14px] font-extrabold text-[#1A1A1A]">
                    {row.title}
                  </div>
                  <div className="text-[12px] text-[#808080] mt-0.5">
                    {row.subtitle}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={row.onDec}
                    className="w-[26px] h-[26px] border-2 border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] font-bold cursor-pointer"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-[14px] font-extrabold text-[#1A1A1A] min-w-[24px] text-center">
                    {row.qty}
                  </span>
                  <button
                    type="button"
                    onClick={row.onInc}
                    className="w-[26px] h-[26px] bg-[#1A1A1A] text-white flex items-center justify-center font-bold cursor-pointer"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : variant === 'varient_8' ? (
          /* V8: Stacked Footer Action Size Cards */
          <div className="space-y-3">
            {sizeRows.map((row) => (
              <div
                key={row.id}
                className="rounded-[12px] border border-[#E6E6E6] bg-white overflow-hidden"
              >
                <div className="p-3.5 flex items-center gap-3">
                  <img
                    src={row.image}
                    alt={row.title}
                    className="w-[52px] h-[52px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                      {row.title}
                    </div>
                    <div className="text-[12px] text-[#808080] mt-0.5">
                      {row.subtitle}
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-[6px] bg-[#F7F7F7] text-[#1A1A1A] text-[11px] font-bold">
                    {row.badge}
                  </span>
                </div>
                <div className="px-3.5 py-2.5 bg-[#F7F7F7] border-t border-[#E6E6E6] flex items-center justify-between">
                  <span className="text-[13px] font-bold text-[#1A1A1A]">
                    Allocated: {row.qty} units
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={row.onDec}
                      className="w-[24px] h-[24px] rounded-[4px] bg-white border border-[#E6E6E6] flex items-center justify-center text-[#1A1A1A] cursor-pointer"
                    >
                      <Minus size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={row.onInc}
                      className="w-[24px] h-[24px] rounded-[4px] bg-[#1A1A1A] text-white flex items-center justify-center cursor-pointer"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3.5">
            {sizeRows.map((row) => (
              <div
                key={row.id}
                className="p-[14px] rounded-[12px] border border-[#E6E6E6] bg-white flex gap-[14px]"
              >
                <img
                  src={row.image}
                  alt={row.title}
                  className="w-[82px] h-[82px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-[15px] font-bold text-[#1A1A1A] truncate">
                        {row.title}
                      </div>
                      <div className="text-[13px] text-[#808080] mt-0.5 truncate">
                        {row.subtitle}
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-[6px] bg-[#F7F7F7] text-[#1A1A1A] text-[11px] font-semibold flex-shrink-0">
                      Size {row.id}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[16px] font-bold text-[#1A1A1A]">
                      {row.price}
                    </span>

                    {/* Exact Cloth Shop MyCart 24x24 4px-radius Stepper */}
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={row.onDec}
                        className="w-[24px] h-[24px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center text-[#1A1A1A] cursor-pointer hover:bg-[#F7F7F7]"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="text-[14px] font-semibold text-[#1A1A1A]">
                        {row.qty}
                      </span>
                      <button
                        type="button"
                        onClick={row.onInc}
                        className="w-[24px] h-[24px] rounded-[4px] border border-[#E6E6E6] flex items-center justify-center text-[#1A1A1A] cursor-pointer hover:bg-[#F7F7F7]"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 5. INVENTORY VALUATION SUMMARY (1:1 Cloth Shop MyCart Summary Pattern) */}
        <div className="pt-2 space-y-3">
          <div className="flex items-center justify-between text-[15px]">
            <span className="text-[#808080]">Aggregated Units</span>
            <span className="font-semibold text-[#1A1A1A]">
              {totalAggregatedStock} units
            </span>
          </div>
          <div className="flex items-center justify-between text-[15px]">
            <span className="text-[#808080]">7-Day Velocity</span>
            <span className="font-semibold text-[#1A1A1A]">48 units (+14%)</span>
          </div>
          <div className="flex items-center justify-between text-[15px]">
            <span className="text-[#808080]">Supplier Lead Time</span>
            <span className="font-semibold text-[#1A1A1A]">12 Days (Porto)</span>
          </div>

          <div className="h-[1px] bg-[#E6E6E6] my-1" />

          <div className="flex items-center justify-between">
            <span className="text-[16px] font-medium text-[#1A1A1A]">
              Total Retail Value
            </span>
            <span className="text-[17px] font-bold text-[#1A1A1A]">
              $ {retailValuation.toLocaleString()}
            </span>
          </div>
        </div>

        {/* 6. CLOTH SHOP PRIMARY CTA BUTTON (Exact 54px height, 10px radius, ArrowRight) */}
        <button
          type="button"
          onClick={() => {
            setSavedSync(true);
            onTriggerToast?.(
              `Synced ${totalAggregatedStock} units for SKU #SLG-01 across 3 hubs`
            );
          }}
          className="w-full h-[54px] rounded-[10px] bg-[#1A1A1A] text-white text-[16px] font-semibold flex items-center justify-center gap-2.5 cursor-pointer hover:opacity-95 transition mt-2"
        >
          <span>
            {savedSync
              ? `Synced ${totalAggregatedStock} Units`
              : 'Save Stock Adjustments'}
          </span>
          {savedSync ? <Check size={19} /> : <ArrowRight size={19} />}
        </button>
      </div>
    </div>
  );
};

export default ProductSkuBreakdownVarient1;
