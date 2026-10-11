import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Package,
  SlidersHorizontal,
  Navigation,
  Phone,
  MessageSquare,
  Check,
  RefreshCw,
  DollarSign,
} from 'lucide-react';
import { useFoodGroceryEcosystem } from '../context/FoodGroceryEcosystemContext';

export type VendorScreenId =
  | 'vendor_kds_board'
  | 'vendor_order_detail'
  | 'vendor_stock_86';

interface VendorKdsScreensProps {
  screenId: VendorScreenId;
  onNavigate: (next: VendorScreenId) => void;
  primaryColor: string;
}

export const VendorKdsScreens: React.FC<VendorKdsScreensProps> = ({
  screenId,
  onNavigate,
  primaryColor,
}) => {
  const {
    kdsOrders,
    advanceKdsOrderStage,
    catalog,
    toggleItemStock86,
    updateItemPrice,
    vendorBusyMode,
    setVendorBusyMode,
    extraPrepBufferMins,
    setExtraPrepBufferMins,
    emitLifecycleEvent,
  } = useFoodGroceryEcosystem();

  const [selectedOrderId, setSelectedOrderId] = useState<string>(kdsOrders[0]?.id || 'ord_4092');
  const [stageFilter, setStageFilter] = useState<'all' | 'new' | 'preparing' | 'ready'>('all');

  const activeOrder = kdsOrders.find((o) => o.id === selectedOrderId) || kdsOrders[0];

  const counts = {
    new: kdsOrders.filter((o) => o.stage === 'new').length,
    preparing: kdsOrders.filter((o) => o.stage === 'preparing').length,
    ready: kdsOrders.filter((o) => o.stage === 'ready').length,
  };

  // =========================================================================
  // SCREEN B1: ORDER DISPATCH DASHBOARD (KDS) — Prompt 3 Spec
  // =========================================================================
  if (screenId === 'vendor_kds_board') {
    const visibleOrders =
      stageFilter === 'all' ? kdsOrders : kdsOrders.filter((o) => o.stage === stageFilter);

    return (
      <div className="h-full flex flex-col justify-between p-4 bg-[#090D16] text-zinc-100 overflow-y-auto space-y-3.5">
        <div className="space-y-3">
          {/* Top KDS Status & Geofence Alert Bar */}
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2">
            <div>
              <div className="text-[10px] font-mono text-emerald-400">
                MERCHANT TERMINAL · KDS LIVE STREAM
              </div>
              <div className="text-xs font-bold">Smash &amp; Sear + GreenCrate Hub</div>
            </div>

            <button
              type="button"
              onClick={() => {
                const nextBusy = !vendorBusyMode;
                setVendorBusyMode(nextBusy);
                setExtraPrepBufferMins(nextBusy ? 10 : 0);
                emitLifecycleEvent(
                  'VENDOR_KDS',
                  nextBusy ? 'BUSY_MODE_ENABLED (+10M_ETA)' : 'BUSY_MODE_CLEARED',
                  nextBusy
                    ? 'Kitchen Busy Mode triggered: Customer ETAs auto-extended +10m'
                    : 'Normal kitchen prep times restored',
                  nextBusy
                    ? 'Heads up: Kitchen is experiencing high demand (+10m prep buffer).'
                    : 'Kitchen prep times back to normal speed.'
                );
              }}
              className={`min-h-[44px] px-3 rounded-xl text-[11px] font-mono font-bold border cursor-pointer ${
                vendorBusyMode
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              {vendorBusyMode ? `BUSY (+${extraPrepBufferMins}m)` : 'Normal Prep'}
            </button>
          </div>

          {/* Geofence Trigger Alert (Driver 2 mins away) */}
          <div className="p-3 rounded-xl bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Navigation size={14} className="text-indigo-400 shrink-0" />
              <span>
                <strong>Geofence Alert:</strong> Courier Mateo is <strong>2 mins away</strong> for{' '}
                <strong>#4092</strong>. Bag hot items now!
              </span>
            </div>
          </div>

          {/* 3-Stage Column Filter Tabs: New (1) · Preparing (1) · Ready for Pickup (1) */}
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { id: 'all', label: `All (${kdsOrders.length})` },
              { id: 'new', label: `New (${counts.new})` },
              { id: 'preparing', label: `Prep (${counts.preparing})` },
              { id: 'ready', label: `Ready (${counts.ready})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStageFilter(tab.id as any)}
                className={`min-h-[44px] rounded-xl text-[11px] font-mono font-bold border transition cursor-pointer ${
                  stageFilter === tab.id
                    ? 'text-white border-transparent'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
                style={stageFilter === tab.id ? { backgroundColor: primaryColor } : undefined}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* KDS Ticket Cards */}
          <div className="space-y-3">
            {visibleOrders.map((ord) => {
              const isPreparing = ord.stage === 'preparing';
              const isReady = ord.stage === 'ready';
              return (
                <div
                  key={ord.id}
                  onClick={() => {
                    setSelectedOrderId(ord.id);
                    onNavigate('vendor_order_detail');
                  }}
                  className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 cursor-pointer hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold font-mono text-white">
                        {ord.orderNumber}
                      </span>
                      <span className="text-xs text-slate-400">· {ord.customerName}</span>
                    </div>

                    {/* Color-Coded Countdown Timer (Orange for 8 mins remaining, Green for Ready) */}
                    <span
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold ${
                        isReady
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : isPreparing
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-rose-500/20 text-rose-400'
                      }`}
                    >
                      {isReady ? 'READY AT COUNTER' : `${ord.remainingMins} mins left`}
                    </span>
                  </div>

                  {/* Checklist of Ordered Items with Customized Modifier Tags */}
                  <div className="space-y-1.5 border-t border-b border-slate-800 py-2.5">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="text-xs font-bold flex items-center justify-between">
                          <span>
                            {it.qty}x {it.name}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                          {it.tags.map((tag) => (
                            <span
                              key={tag}
                              className={
                                tag.includes('NO ONIONS') || tag.includes('SUB RULE')
                                  ? 'text-amber-400 font-bold'
                                  : 'text-slate-400'
                              }
                            >
                              [{tag}]
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Large High-Contrast Action Button (>=48px Touch Target) */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-slate-400">
                      Courier: {ord.courierName} ({ord.courierEtaToStoreMins}m away)
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        advanceKdsOrderStage(ord.id);
                      }}
                      className="min-h-[48px] px-4 rounded-xl text-xs font-extrabold text-white shadow-md cursor-pointer"
                      style={{
                        backgroundColor: isReady
                          ? '#059669'
                          : isPreparing
                          ? '#10B981'
                          : primaryColor,
                      }}
                    >
                      {ord.stage === 'new'
                        ? 'Accept & Start Prep'
                        : ord.stage === 'preparing'
                        ? 'Mark as Ready ✓'
                        : 'Handed to Courier'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('vendor_stock_86')}
          className="w-full min-h-[48px] rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
        >
          <SlidersHorizontal size={14} />
          <span>Open Real-Time Inventory 86-ing &amp; Prep Controls</span>
        </button>
      </div>
    );
  }

  // =========================================================================
  // SCREEN B2: VENDOR ORDER DETAIL VIEW (Ticket Breakdown + Courier Info)
  // =========================================================================
  if (screenId === 'vendor_order_detail') {
    return (
      <div className="h-full flex flex-col justify-between p-4 bg-[#090D16] text-zinc-100 overflow-y-auto space-y-4">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono text-emerald-400">
                KDS TICKET INSPECTOR · {activeOrder.stage.toUpperCase()}
              </div>
              <h3 className="text-lg font-extrabold font-mono">
                Order {activeOrder.orderNumber} · {activeOrder.customerName}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('vendor_kds_board')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-mono cursor-pointer"
            >
              ← KDS Grid
            </button>
          </div>

          {/* Allocated Courier Geofence Card */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold">Assigned Courier: {activeOrder.courierName}</span>
              <span className="font-mono text-emerald-400">
                ETA {activeOrder.courierEtaToStoreMins} mins
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              {activeOrder.courierVehicle} · Rating ★ {activeOrder.courierRating}
            </div>
          </div>

          {/* Itemized Prep & Substitution Breakdown */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="text-xs font-bold">Kitchen &amp; Picker Line Items</div>
            {activeOrder.items.map((it, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1"
              >
                <div className="text-xs font-bold">
                  {it.qty}x {it.name}
                </div>
                <div className="text-[11px] font-mono text-amber-400">
                  Modifiers / Rules: {it.tags.join(' · ')}
                </div>
              </div>
            ))}
          </div>

          {/* Prep-Time Buffer Adjuster */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold">Proactive Prep Delay Adjuster</span>
              <span className="font-mono text-amber-400">+{extraPrepBufferMins} mins</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[0, 5, 10, 15].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => {
                    setExtraPrepBufferMins(mins);
                    setVendorBusyMode(mins > 0);
                    emitLifecycleEvent(
                      'VENDOR_KDS',
                      'PREP_TIME_ADJUSTED',
                      `Order ${activeOrder.orderNumber} prep buffer set to +${mins}m`,
                      `Kitchen updated your ETA (+${mins} mins) to ensure fresh preparation.`
                    );
                  }}
                  className={`min-h-[44px] rounded-xl text-xs font-mono font-bold border cursor-pointer ${
                    extraPrepBufferMins === mins
                      ? 'bg-amber-500 text-slate-950 border-transparent'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  +{mins}m
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            advanceKdsOrderStage(activeOrder.id);
            onNavigate('vendor_kds_board');
          }}
          className="w-full min-h-[48px] rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg cursor-pointer"
        >
          Mark Order {activeOrder.orderNumber} Ready for Pickup ✓
        </button>
      </div>
    );
  }

  // =========================================================================
  // SCREEN B3: MENU & REAL-TIME STOCK MANAGEMENT (Instant 86-ing Toggle)
  // =========================================================================
  return (
    <div className="h-full flex flex-col justify-between p-4 bg-[#090D16] text-zinc-100 overflow-y-auto space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-emerald-400">
              REAL-TIME INVENTORY &amp; 86-ING TERMINAL
            </div>
            <h3 className="text-sm font-bold">Instant Stock &amp; Price Sync</h3>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('vendor_kds_board')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-mono cursor-pointer"
          >
            ← Back to KDS
          </button>
        </div>

        <p className="text-[11px] text-slate-400">
          Toggling any item to <strong>Sold Out (86’d)</strong> immediately disables ordering in the
          Customer App and triggers substitution rules.
        </p>

        <div className="space-y-2.5">
          {catalog.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3"
            >
              <div className="min-w-0 flex-1 space-y-1">
                <div className="text-[10px] font-mono text-slate-400">
                  {item.mode.toUpperCase()} · {item.category}
                </div>
                <div className="text-xs font-bold truncate">{item.name}</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    ${item.price.toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateItemPrice(item.id, item.price + 0.5)}
                    className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono cursor-pointer"
                  >
                    +$0.50
                  </button>
                </div>
              </div>

              {/* Large 48px Touch Target Stock Toggle */}
              <button
                type="button"
                onClick={() => toggleItemStock86(item.id)}
                className={`min-h-[48px] px-3.5 rounded-xl text-xs font-mono font-extrabold cursor-pointer transition ${
                  item.inStock
                    ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400'
                    : 'bg-rose-500/20 border border-rose-500/50 text-rose-400'
                }`}
              >
                {item.inStock ? 'IN STOCK' : '86 SOLD OUT'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onNavigate('vendor_kds_board')}
        className="w-full min-h-[48px] rounded-xl text-white font-bold text-xs cursor-pointer"
        style={{ backgroundColor: primaryColor }}
      >
        Done — Return to Active KDS Tickets
      </button>
    </div>
  );
};
