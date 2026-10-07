import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  Eye,
  Package,
  Printer,
  ScanBarcode,
  Search,
  Truck,
  X,
} from 'lucide-react';
import {
  getAdminThemeScopeStyle,
  useAdminDesignSystem,
} from '../../../styles/adminDesignSystem';

export interface OrdersVarient1Props {
  variant?:
    | 'varient_1'
    | 'varient_2'
    | 'varient_3'
    | 'varient_4'
    | 'varient_5'
    | 'varient_6'
    | 'varient_7'
    | 'varient_8';
  onOpenOrderDetail?: (orderId?: string) => void;
  onTriggerToast?: (msg: string) => void;
}

type OrderFilterTab = 'all' | 'pending' | 'packing' | 'shipped';

interface OrderQueueItem {
  id: string;
  orderNumber: string;
  statusBadge: string;
  filterGroup: 'pending' | 'packing' | 'shipped';
  customerName: string;
  shippingAddress: string;
  carrier: string;
  timeAgo: string;
  totalAmount: string;
  productTitle: string;
  productSpec: string;
  sku: string;
  qty: number;
  imageUrl: string;
  primaryActionLabel: string;
}

const INITIAL_ORDERS: OrderQueueItem[] = [
  {
    id: 'ord_8942',
    orderNumber: '#8942',
    statusBadge: 'Pending',
    filterGroup: 'pending',
    customerName: 'Marcus Chen',
    shippingAddress: '482 Mercer St, SoHo, NY',
    carrier: 'DHL Express Air',
    timeAgo: '12m ago',
    totalAmount: '$ 1,190',
    productTitle: 'Regular Fit Slogan',
    productSpec: 'Size M • Marcus Chen',
    sku: 'SKU-8021',
    qty: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&q=80',
    primaryActionLabel: 'Pack Order',
  },
  {
    id: 'ord_8941',
    orderNumber: '#8941',
    statusBadge: 'Packing',
    filterGroup: 'packing',
    customerName: 'Sarah Jenkins',
    shippingAddress: '910 Melrose Ave, LA, CA',
    carrier: 'FedEx Priority',
    timeAgo: '32m ago',
    totalAmount: '$ 1,100',
    productTitle: 'Regular Fit Polo',
    productSpec: 'Size L • Sarah Jenkins',
    sku: 'SKU-4912',
    qty: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=300&q=80',
    primaryActionLabel: 'Print Waybill',
  },
  {
    id: 'ord_8940',
    orderNumber: '#8940',
    statusBadge: 'Shipped',
    filterGroup: 'shipped',
    customerName: 'Liam Gallagher',
    shippingAddress: '742 Evergreen Ter, Chicago, IL',
    carrier: 'DHL Express Sweep',
    timeAgo: '1h ago',
    totalAmount: '$ 1,290',
    productTitle: 'Regular Fit Black',
    productSpec: 'Size L • Liam Gallagher',
    sku: 'SKU-3108',
    qty: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=300&q=80',
    primaryActionLabel: 'Track Order',
  },
];

export const OrdersVarient1: React.FC<OrdersVarient1Props> = ({
  variant = 'varient_1',
  onOpenOrderDetail,
  onTriggerToast,
}) => {
  const { palette, activeFont, isDark, colorPresetId } = useAdminDesignSystem();
  const [activeFilter, setActiveFilter] = useState<OrderFilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [fulfilledIds, setFulfilledIds] = useState<string[]>([]);

  const visibleOrders = INITIAL_ORDERS.filter((o) => {
    const matchesTab = activeFilter === 'all' ? true : o.filterGroup === activeFilter;
    const matchesSearch =
      o.productTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleOrderAction = (order: OrderQueueItem) => {
    if (!fulfilledIds.includes(order.id)) {
      setFulfilledIds((prev) => [...prev, order.id]);
    }
    onTriggerToast?.(`${order.primaryActionLabel} completed for ${order.orderNumber}`);
  };

  return (
    <div
      className="admin-theme-scope px-5 pt-2 pb-6 space-y-4 bg-white text-[#1A1A1A] relative"
      style={getAdminThemeScopeStyle(palette, activeFont)}
      data-admin-dark={isDark ? 'true' : 'false'}
      data-admin-preset={colorPresetId}
    >
      {/* 1. CLOTH SHOP SEARCH BAR + BARCODE SCANNER BUTTON (Discover Pattern) */}
      <div className="flex items-center gap-2.5">
        <div className="flex-1 h-[48px] rounded-[10px] border border-[#E6E6E6] bg-white px-3.5 flex items-center gap-2.5">
          <Search size={18} className="text-[#999999] flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order #8942, customer, SKU..."
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
          onClick={() => onTriggerToast?.('Barcode scanner ready for #8942')}
          className="w-[48px] h-[48px] rounded-[10px] bg-[#1A1A1A] text-white flex items-center justify-center flex-shrink-0 cursor-pointer hover:opacity-95 transition"
          title="Scan Waybill Barcode"
        >
          <ScanBarcode size={19} />
        </button>
      </div>

      {/* 2. CLOTH SHOP RECTANGULAR FILTER PILLS (10px Radius) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'all' as OrderFilterTab, label: 'All (142)' },
          { id: 'pending' as OrderFilterTab, label: 'Pending (14)' },
          { id: 'packing' as OrderFilterTab, label: 'Packing (8)' },
          { id: 'shipped' as OrderFilterTab, label: 'Shipped' },
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

      {/* 3. NEXT COURIER SWEEP CARD (Clean Cloth Shop Bordered Card) */}
      <div className="p-[14px] rounded-[12px] border border-[#E6E6E6] bg-white flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-[46px] h-[46px] rounded-[8px] bg-[#F2F2F2] flex items-center justify-center text-[#1A1A1A]">
            <Truck size={20} />
          </div>
          <div>
            <div className="text-[14px] font-bold text-[#1A1A1A]">
              DHL Express Sweep
            </div>
            <div className="text-[12px] text-[#808080]">
              {18 + fulfilledIds.length} packages staged at Bay #4
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[15px] font-bold text-[#0C9409]">37:45</div>
          <div className="text-[11px] text-[#808080]">Next Pickup</div>
        </div>
      </div>

      {/* 4. ORDER QUEUE CARDS (V1: Horizontal Cart Card | V2: 2-Column Discover Grid | V3: Manifest Ticket Card) */}
      {variant === 'varient_2' ? (
        <div className="grid grid-cols-2 gap-3.5">
          {visibleOrders.map((order) => {
            const isDone = fulfilledIds.includes(order.id);
            return (
              <div
                key={order.id}
                onClick={() => onOpenOrderDetail?.(order.id)}
                className="p-2.5 rounded-[12px] border border-[#E6E6E6] bg-white flex flex-col justify-between space-y-2.5 cursor-pointer hover:border-[#1A1A1A] transition"
              >
                <div>
                  <div className="relative w-full h-[145px] rounded-[8px] bg-[#F2F2F2] overflow-hidden mb-2">
                    <img
                      src={order.imageUrl}
                      alt={order.productTitle}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-[6px] bg-white text-[10px] font-bold text-[#1A1A1A]">
                      {order.orderNumber}
                    </span>
                    <span
                      className={`absolute top-2 right-2 px-2 py-0.5 rounded-[6px] text-[10px] font-bold ${
                        isDone || order.statusBadge === 'Shipped'
                          ? 'bg-[#E7F7E7] text-[#0C9409]'
                          : 'bg-white text-[#1A1A1A]'
                      }`}
                    >
                      {isDone ? 'Packed' : order.statusBadge}
                    </span>
                  </div>
                  <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                    {order.productTitle}
                  </div>
                  <div className="text-[12px] text-[#808080] truncate">
                    {order.customerName}
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[14px] font-bold text-[#1A1A1A]">
                    {order.totalAmount}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOrderAction(order);
                    }}
                    className="h-[28px] px-2.5 rounded-[6px] bg-[#1A1A1A] text-white text-[11px] font-semibold cursor-pointer"
                  >
                    {isDone ? 'Done' : order.primaryActionLabel}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : variant === 'varient_3' ? (
        <div className="space-y-3">
          {visibleOrders.map((order) => {
            const isDone = fulfilledIds.includes(order.id);
            return (
              <div
                key={order.id}
                onClick={() => onOpenOrderDetail?.(order.id)}
                className="p-[14px] rounded-[12px] border border-[#E6E6E6] bg-white space-y-3 cursor-pointer hover:border-[#1A1A1A] transition"
              >
                <div className="flex items-center justify-between border-b border-[#E6E6E6] pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-[6px] bg-[#1A1A1A] text-white text-[11px] font-bold">
                      {order.orderNumber}
                    </span>
                    <span className="text-[14px] font-bold text-[#1A1A1A]">
                      {order.customerName}
                    </span>
                  </div>
                  <span className="text-[15px] font-bold text-[#1A1A1A]">
                    {order.totalAmount}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={order.imageUrl}
                      alt={order.productTitle}
                      className="w-12 h-12 rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                        {order.productTitle}
                      </div>
                      <div className="text-[12px] text-[#808080] truncate">
                        {order.productSpec}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOrderAction(order);
                    }}
                    className="h-[32px] px-3 rounded-[8px] bg-[#1A1A1A] text-white text-[12px] font-semibold flex items-center gap-1 flex-shrink-0 cursor-pointer"
                  >
                    {isDone ? <Check size={13} /> : null}
                    <span>{isDone ? 'Packed' : order.primaryActionLabel}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : variant === 'varient_4' ? (
        /* V4: Executive Dark Header Strip Order Cards */
        <div className="space-y-3">
          {visibleOrders.map((order) => {
            const isDone = fulfilledIds.includes(order.id);
            return (
              <div
                key={order.id}
                onClick={() => onOpenOrderDetail?.(order.id)}
                className="rounded-[12px] border border-[#E6E6E6] bg-white overflow-hidden cursor-pointer hover:border-[#1A1A1A] transition"
              >
                <div className="px-3.5 py-2 bg-[#1A1A1A] text-white flex items-center justify-between text-[12px]">
                  <span className="font-bold">{order.orderNumber} • {order.carrier}</span>
                  <span className="opacity-80">{order.timeAgo}</span>
                </div>
                <div className="p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={order.imageUrl}
                      alt={order.productTitle}
                      className="w-14 h-14 rounded-[8px] object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                        {order.productTitle}
                      </div>
                      <div className="text-[12px] text-[#808080] truncate">
                        {order.customerName} • {order.totalAmount}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOrderAction(order);
                    }}
                    className="h-[32px] px-3 rounded-[8px] bg-[#1A1A1A] text-white text-[11px] font-semibold cursor-pointer flex-shrink-0"
                  >
                    {isDone ? 'Packed' : order.primaryActionLabel}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : variant === 'varient_5' ? (
        /* V5: High-Density Warehouse Queue Table */
        <div className="rounded-[12px] border border-[#E6E6E6] bg-white divide-y divide-[#E6E6E6] overflow-hidden">
          {visibleOrders.map((order) => {
            const isDone = fulfilledIds.includes(order.id);
            return (
              <div
                key={order.id}
                onClick={() => onOpenOrderDetail?.(order.id)}
                className="p-3 flex items-center justify-between gap-2.5 cursor-pointer hover:bg-[#F7F7F7] transition"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="px-2 py-1 rounded-[6px] bg-[#F2F2F2] text-[11px] font-bold text-[#1A1A1A]">
                    {order.orderNumber}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-[#1A1A1A] truncate">
                      {order.customerName} — {order.productTitle}
                    </div>
                    <div className="text-[11px] text-[#808080] truncate">
                      {order.shippingAddress}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOrderAction(order);
                  }}
                  className="h-[28px] px-2.5 rounded-[6px] bg-[#1A1A1A] text-white text-[11px] font-semibold flex-shrink-0 cursor-pointer"
                >
                  {isDone ? 'Done' : order.totalAmount}
                </button>
              </div>
            );
          })}
        </div>
      ) : variant === 'varient_6' ? (
        /* V6: Split Courier Action Cards */
        <div className="space-y-3">
          {visibleOrders.map((order) => {
            const isDone = fulfilledIds.includes(order.id);
            return (
              <div
                key={order.id}
                onClick={() => onOpenOrderDetail?.(order.id)}
                className="p-3.5 rounded-[12px] bg-[#F7F7F7] border border-[#E6E6E6] space-y-2.5 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-bold text-[#1A1A1A]">
                    {order.orderNumber} • {order.customerName}
                  </span>
                  <span className="px-2 py-0.5 rounded-[6px] bg-white text-[11px] font-bold text-[#1A1A1A]">
                    {order.totalAmount}
                  </span>
                </div>
                <div className="text-[12px] text-[#808080]">
                  {order.productTitle} ({order.sku}) • {order.shippingAddress}
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenOrderDetail?.(order.id);
                    }}
                    className="h-[32px] rounded-[8px] bg-white border border-[#E6E6E6] text-[12px] font-semibold text-[#1A1A1A] cursor-pointer"
                  >
                    Inspect Manifest
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOrderAction(order);
                    }}
                    className="h-[32px] rounded-[8px] bg-[#1A1A1A] text-white text-[12px] font-semibold cursor-pointer"
                  >
                    {isDone ? 'Completed' : order.primaryActionLabel}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : variant === 'varient_7' ? (
        /* V7: Lookbook Banner Order Cards */
        <div className="space-y-3.5">
          {visibleOrders.map((order) => {
            const isDone = fulfilledIds.includes(order.id);
            return (
              <div
                key={order.id}
                onClick={() => onOpenOrderDetail?.(order.id)}
                className="rounded-[12px] border border-[#E6E6E6] bg-white overflow-hidden cursor-pointer"
              >
                <div className="relative h-[110px] w-full bg-[#F2F2F2]">
                  <img
                    src={order.imageUrl}
                    alt={order.productTitle}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-[6px] bg-white text-[11px] font-bold text-[#1A1A1A]">
                    {order.orderNumber} • {order.customerName}
                  </span>
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-[6px] bg-[#1A1A1A] text-white text-[11px] font-bold">
                    {order.totalAmount}
                  </span>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <div className="text-[14px] font-bold text-[#1A1A1A]">
                      {order.productTitle}
                    </div>
                    <div className="text-[12px] text-[#808080]">{order.carrier}</div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOrderAction(order);
                    }}
                    className="h-[32px] px-3 rounded-[8px] bg-[#1A1A1A] text-white text-[12px] font-semibold cursor-pointer"
                  >
                    {isDone ? 'Packed' : order.primaryActionLabel}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : variant === 'varient_8' ? (
        /* V8: Studio Capsule Numbered Order Cards */
        <div className="space-y-2.5">
          {visibleOrders.map((order, idx) => {
            const isDone = fulfilledIds.includes(order.id);
            return (
              <div
                key={order.id}
                onClick={() => onOpenOrderDetail?.(order.id)}
                className="p-3 rounded-[12px] border-2 border-[#1A1A1A] bg-white flex items-center justify-between gap-3 cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-8 h-8 rounded-[8px] bg-[#1A1A1A] text-white text-[12px] font-bold flex items-center justify-center flex-shrink-0">
                    0{idx + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[14px] font-bold text-[#1A1A1A] truncate">
                      {order.orderNumber} • {order.productTitle}
                    </div>
                    <div className="text-[12px] text-[#808080] truncate">
                      {order.customerName} • {order.totalAmount}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOrderAction(order);
                  }}
                  className="h-[30px] px-3 rounded-[8px] bg-[#1A1A1A] text-white text-[11px] font-semibold flex-shrink-0 cursor-pointer"
                >
                  {isDone ? 'Done' : 'Dispatch'}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3.5">
          {visibleOrders.map((order) => {
            const isDone = fulfilledIds.includes(order.id);
            return (
              <div
                key={order.id}
                onClick={() => onOpenOrderDetail?.(order.id)}
                className="p-[14px] rounded-[12px] border border-[#E6E6E6] bg-white flex gap-[14px] cursor-pointer hover:border-[#1A1A1A] transition"
              >
                <img
                  src={order.imageUrl}
                  alt={order.productTitle}
                  className="w-[82px] h-[82px] rounded-[8px] bg-[#F2F2F2] object-cover flex-shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-[15px] font-bold text-[#1A1A1A] truncate">
                        {order.productTitle} ({order.orderNumber})
                      </div>
                      <div className="text-[13px] text-[#808080] mt-0.5 truncate">
                        {order.productSpec}
                      </div>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-[6px] text-[11px] font-semibold flex-shrink-0 ${
                        isDone || order.statusBadge === 'Shipped'
                          ? 'bg-[#E7F7E7] text-[#0C9409]'
                          : 'bg-[#F7F7F7] text-[#1A1A1A]'
                      }`}
                    >
                      {isDone ? 'Packed' : order.statusBadge}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[16px] font-bold text-[#1A1A1A]">
                      {order.totalAmount}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenOrderDetail?.(order.id);
                        }}
                        className="h-[30px] px-2.5 rounded-[8px] border border-[#E6E6E6] bg-white text-[12px] font-semibold text-[#1A1A1A] flex items-center gap-1 cursor-pointer hover:bg-[#F7F7F7]"
                      >
                        <Eye size={13} />
                        <span>Inspect</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOrderAction(order);
                        }}
                        className="h-[30px] px-3 rounded-[8px] bg-[#1A1A1A] text-white text-[12px] font-semibold flex items-center gap-1 cursor-pointer hover:opacity-95"
                      >
                        {isDone ? <Check size={13} /> : null}
                        <span>{isDone ? 'Done' : order.primaryActionLabel}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. CLOTH SHOP SUMMARY LEDGER ROWS (Exact MyCart Summary Pattern) */}
      <div className="pt-2 space-y-2.5">
        <div className="flex items-center justify-between text-[14px]">
          <span className="text-[#808080]">SLA On-Time Rate</span>
          <span className="font-semibold text-[#1A1A1A]">97.8%</span>
        </div>
        <div className="flex items-center justify-between text-[14px]">
          <span className="text-[#808080]">Average Pack Time</span>
          <span className="font-semibold text-[#1A1A1A]">18 mins</span>
        </div>
        <div className="flex items-center justify-between text-[14px]">
          <span className="text-[#808080]">Return Rate</span>
          <span className="font-semibold text-[#1A1A1A]">1.2%</span>
        </div>
        <div className="h-[1px] bg-[#E6E6E6] my-1" />
        <div className="flex items-center justify-between">
          <span className="text-[16px] font-medium text-[#1A1A1A]">
            Queue Total (3 Orders)
          </span>
          <span className="text-[17px] font-bold text-[#1A1A1A]">$ 3,580</span>
        </div>
      </div>

      {/* 6. CLOTH SHOP PRIMARY CTA BUTTON (Exact 52px height, 10px radius, ArrowRight) */}
      <button
        type="button"
        onClick={() => {
          setFulfilledIds(INITIAL_ORDERS.map((o) => o.id));
          onTriggerToast?.('Batch fulfilled all 14 pending orders & printed waybills');
        }}
        className="w-full h-[52px] rounded-[10px] bg-[#1A1A1A] text-white text-[15px] font-semibold flex items-center justify-center gap-2.5 cursor-pointer hover:opacity-95 transition"
      >
        <span>Batch Fulfill All (14)</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default OrdersVarient1;
