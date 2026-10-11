import React, { useState } from 'react';
import {
  Utensils,
  ShoppingBag,
  MapPin,
  Store,
  Truck,
  Activity,
  SlidersHorizontal,
  Camera,
  CheckSquare,
  Navigation,
  Clock,
  Sparkles,
  Check,
  ArrowRight,
  Download,
  Layers,
  Sun,
  Moon,
  Bell,
  ShieldCheck,
  Flame,
  Leaf,
} from 'lucide-react';
import JSZip from 'jszip';
import { StudioDashboardShell, StudioTab } from '../components/StudioDashboardShell';
import {
  FoodGroceryEcosystemProvider,
  useFoodGroceryEcosystem,
  EcosystemActorRole,
} from './context/FoodGroceryEcosystemContext';
import { CustomerAppScreens, CustomerScreenId } from './components/CustomerAppScreens';
import { VendorKdsScreens, VendorScreenId } from './components/VendorKdsScreens';
import { DriverHudScreens, DriverScreenId } from './components/DriverHudScreens';

export type FoodDeliveryScreenId =
  | CustomerScreenId
  | VendorScreenId
  | DriverScreenId;

export interface FoodDeliveryScreenMeta {
  id: FoodDeliveryScreenId;
  actor: EcosystemActorRole;
  actorBadge: string;
  name: string;
  description: string;
  promptRef?: string;
}

export const FOOD_GROCERY_SCREENS_CATALOG: FoodDeliveryScreenMeta[] = [
  // A. Customer App (6 Screens)
  {
    id: 'cust_splash_location',
    actor: 'customer',
    actorBadge: 'A1 · Customer App',
    name: 'Splash & Precise Location Pin Setup',
    description:
      'Kalman-locked entrance pin adjustment, apartment unit/gate code input, and contactless drop-off presets.',
  },
  {
    id: 'cust_home_hub',
    actor: 'customer',
    actorBadge: 'A2 · Customer App',
    name: 'Home / Food & Grocery Discovery Hub',
    description:
      'Instant toggle between Hot Restaurants & Fresh Grocery modes, Express vs Scheduled slots, and 1-tap Order Again.',
  },
  {
    id: 'cust_store_catalog',
    actor: 'customer',
    actorBadge: 'A3 · Customer App',
    name: 'Vendor / Store Catalog & Live Stock',
    description:
      'Category filter tabs, real-time 86’d out-of-stock sync from Merchant KDS, prep time & delivery fee badges.',
  },
  {
    id: 'cust_item_modal',
    actor: 'customer',
    actorBadge: 'A4 · Customer App',
    name: 'Item Detail & Grocery Substitution Sheet',
    description:
      'Multi-tier restaurant modifiers + mandatory grocery out-of-stock substitution rules (Match Brand / Organic / Contact / Refund).',
    promptRef: 'UI Prompt 2',
  },
  {
    id: 'cust_cart_checkout',
    actor: 'customer',
    actorBadge: 'A5 · Customer App',
    name: 'Smart Cart, Tip Selector & Apple Pay',
    description:
      'Itemized modifier & substitution review, courier tip selector (15%, 18%, 20%, 25%), and 1-tap Apple Pay checkout.',
  },
  {
    id: 'cust_live_tracking',
    actor: 'customer',
    actorBadge: 'A6 · Customer App',
    name: 'Live GPS Order Tracking & Masked Chat',
    description:
      'Stylized dark-mode map with smooth 60Hz Kalman scooter pin, 4-stage progress stepper, dynamic ETA, and masked call/chat.',
    promptRef: 'UI Prompt 1',
  },

  // B. Vendor App / Merchant Terminal (3 Screens)
  {
    id: 'vendor_kds_board',
    actor: 'vendor',
    actorBadge: 'B1 · Vendor KDS',
    name: 'Kitchen Display System (KDS) Dispatch Grid',
    description:
      'High-contrast dark KDS board with New, Preparing, and Ready columns, color-coded countdown timers, and 2-min geofence alert.',
    promptRef: 'UI Prompt 3',
  },
  {
    id: 'vendor_order_detail',
    actor: 'vendor',
    actorBadge: 'B2 · Vendor KDS',
    name: 'Order Detail & Proactive Prep Adjuster',
    description:
      'Complete ticket breakdown with special dietary tags (NO ONIONS), allocated courier ETA, and proactive +5m/+10m delay buffer.',
  },
  {
    id: 'vendor_stock_86',
    actor: 'vendor',
    actorBadge: 'B3 · Vendor KDS',
    name: 'Real-Time Inventory Toggle (86-ing) & Pricing',
    description:
      'Instant 1-tap In-Stock / 86 Sold-Out switches and live price adjustments that propagate immediately to the Customer App.',
  },

  // C. Driver App / Courier HUD (3 Screens) + D. Lifecycle Bus
  {
    id: 'driver_offer_accept',
    actor: 'driver',
    actorBadge: 'C1 · Courier HUD',
    name: 'Delivery Request & Slide-to-Accept Offer',
    description:
      'High-contrast outdoor HUD displaying total payout ($14.85), $/hr rate, distance, pickup store, and drop-off neighborhood.',
  },
  {
    id: 'driver_store_pickup',
    actor: 'driver',
    actorBadge: 'C2 · Courier HUD',
    name: 'Store Pickup & Interactive Bag Checklist',
    description:
      'Geofenced store arrival screen with 48px+ touch target item verification checkboxes before starting navigation.',
  },
  {
    id: 'driver_dropoff_pod',
    actor: 'driver',
    actorBadge: 'C3 · Courier HUD',
    name: 'Turn-by-Turn HUD & Proof-of-Delivery Camera',
    description:
      'Turn-by-turn street header, highlighted contactless drop-off callout box, doorstep photo scanner, and Slide to Complete.',
    promptRef: 'UI Prompt 4',
  },
  {
    id: 'system_lifecycle_flow',
    actor: 'system_flow',
    actorBadge: 'D1 · Ecosystem Bus',
    name: 'Real-Time Delivery Lifecycle & WebSocket Stream',
    description:
      'Live interactive event bus showing how WebSocket payloads, geofence triggers, and push notifications flow across all 3 apps.',
  },
];

const COLOR_PRESETS = [
  { id: 'emerald', name: 'FreshCrate Emerald', swatch: '#10B981' },
  { id: 'crimson', name: 'Smash & Sear Crimson', swatch: '#E11D48' },
  { id: 'orange', name: 'Express Flame Orange', swatch: '#F97316' },
  { id: 'indigo', name: 'Dispatch Electric Indigo', swatch: '#6366F1' },
  { id: 'amber', name: 'KDS High-Contrast Amber', swatch: '#D97706' },
];

interface FoodGroceryDeliveryAppProps {
  onSwitchProject?: (projectId: string) => void;
}

const InnerFoodGroceryStudio: React.FC<FoodGroceryDeliveryAppProps> = ({
  onSwitchProject,
}) => {
  const {
    activeActor,
    setActiveActor,
    kdsOrders,
    catalog,
    socketEvents,
    courierGpsProgress,
    activeOrderLifecycle,
  } = useFoodGroceryEcosystem();

  const [activeStudioTab, setActiveStudioTab] = useState<StudioTab>('screens');
  const [activeScreenId, setActiveScreenId] =
    useState<FoodDeliveryScreenId>('cust_live_tracking');
  const [actorFilter, setActorFilter] = useState<'all' | EcosystemActorRole>('all');
  const [selectedColorId, setSelectedColorId] = useState<string>('emerald');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [activeVariant, setActiveVariant] = useState<'v1' | 'v2' | 'v3'>('v1');
  const [isZipping, setIsZipping] = useState<boolean>(false);

  const activeColor =
    COLOR_PRESETS.find((c) => c.id === selectedColorId) || COLOR_PRESETS[0];
  const currentScreenMeta =
    FOOD_GROCERY_SCREENS_CATALOG.find((s) => s.id === activeScreenId) ||
    FOOD_GROCERY_SCREENS_CATALOG[0];

  const filteredScreens =
    actorFilter === 'all'
      ? FOOD_GROCERY_SCREENS_CATALOG
      : FOOD_GROCERY_SCREENS_CATALOG.filter((s) => s.actor === actorFilter);

  const handleSelectScreen = (scr: FoodDeliveryScreenMeta) => {
    setActiveScreenId(scr.id);
    setActiveActor(scr.actor);
  };

  const handleExportZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      zip.file(
        'README.md',
        `# FreshPulse 3-App Food & Grocery Delivery Ecosystem\n\nIncludes:\n1. Customer App (6 Screens: Splash/Pin, Discovery Hub, Store Catalog, Substitution Modal, Cart/Tip Checkout, 60Hz Live Tracking)\n2. Vendor App / Merchant KDS Terminal (3 Screens: 3-Column KDS Board, Ticket Inspector, Real-Time 86-ing Inventory)\n3. Driver App / Courier HUD (3 Screens: Offer Slide-to-Accept, Pickup Bag Checklist, Turn-by-Turn & Photo Proof of Delivery)\n4. Real-Time WebSocket Lifecycle Event Stream\n`
      );
      zip.file(
        'ecosystem-screens.json',
        JSON.stringify(FOOD_GROCERY_SCREENS_CATALOG, null, 2)
      );
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'freshpulse-food-grocery-ecosystem-expo.zip';
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsZipping(false);
    }
  };

  // Top Header Quick Actor Switcher Pills
  const extraTopActions = (
    <div className="hidden xl:flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-900 p-1 rounded-xl border border-neutral-200 dark:border-neutral-800">
      {[
        {
          role: 'customer' as EcosystemActorRole,
          label: 'Customer App (6)',
          defaultScr: 'cust_live_tracking' as FoodDeliveryScreenId,
        },
        {
          role: 'vendor' as EcosystemActorRole,
          label: 'Vendor KDS (3)',
          defaultScr: 'vendor_kds_board' as FoodDeliveryScreenId,
        },
        {
          role: 'driver' as EcosystemActorRole,
          label: 'Courier HUD (3)',
          defaultScr: 'driver_dropoff_pod' as FoodDeliveryScreenId,
        },
        {
          role: 'system_flow' as EcosystemActorRole,
          label: 'Lifecycle Bus',
          defaultScr: 'system_lifecycle_flow' as FoodDeliveryScreenId,
        },
      ].map((btn) => {
        const isCurrent = currentScreenMeta.actor === btn.role;
        return (
          <button
            key={btn.role}
            type="button"
            onClick={() => {
              setActiveActor(btn.role);
              setActiveScreenId(btn.defaultScr);
            }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
              isCurrent
                ? 'text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
            style={isCurrent ? { backgroundColor: activeColor.swatch } : undefined}
          >
            {btn.label}
          </button>
        );
      })}
    </div>
  );

  // Middle Studio Workspace Content
  const middleContent = (
    <div className="space-y-6">
      {activeStudioTab === 'screens' && (
        <div className="space-y-6">
          {/* Interactive Ecosystem Telemetry & Architecture Banner */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#14161d] border border-neutral-200 dark:border-neutral-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div
                  className="text-[11px] font-mono font-bold uppercase tracking-wider"
                  style={{ color: activeColor.swatch }}
                >
                  INTERCONNECTED 3-ACTOR FOOD &amp; GROCERY DELIVERY PLATFORM
                </div>
                <h2 className="text-lg font-extrabold text-neutral-900 dark:text-white mt-0.5">
                  Customer App ↔ Vendor KDS Terminal ↔ Courier HUD Ecosystem
                </h2>
              </div>

              {/* Filter by Application Actor */}
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: 'All 13 Screens' },
                  { id: 'customer', label: 'Customer App (6)' },
                  { id: 'vendor', label: 'Vendor KDS (3)' },
                  { id: 'driver', label: 'Courier HUD (3)' },
                  { id: 'system_flow', label: 'WebSocket Flow (1)' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setActorFilter(f.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      actorFilter === f.id
                        ? 'text-white shadow-xs'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                    }`}
                    style={
                      actorFilter === f.id ? { backgroundColor: activeColor.swatch } : undefined
                    }
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Synchronized State Summary Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 text-xs font-mono">
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#101218] border border-neutral-200/70 dark:border-neutral-800">
                <div className="text-[10px] text-neutral-500">ACTIVE LIFECYCLE STAGE</div>
                <div className="font-bold text-emerald-500 mt-0.5 uppercase">
                  {activeOrderLifecycle.replace(/_/g, ' ')}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#101218] border border-neutral-200/70 dark:border-neutral-800">
                <div className="text-[10px] text-neutral-500">KALMAN GPS ROUTE</div>
                <div className="font-bold text-neutral-900 dark:text-white mt-0.5">
                  {Math.round(courierGpsProgress)}% Interpolated
                </div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#101218] border border-neutral-200/70 dark:border-neutral-800">
                <div className="text-[10px] text-neutral-500">IN-STOCK / 86’D ITEMS</div>
                <div className="font-bold text-neutral-900 dark:text-white mt-0.5">
                  {catalog.filter((i) => i.inStock).length} Active ·{' '}
                  {catalog.filter((i) => !i.inStock).length} 86’d
                </div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#101218] border border-neutral-200/70 dark:border-neutral-800">
                <div className="text-[10px] text-neutral-500">WEBSOCKET EVENTS</div>
                <div className="font-bold text-indigo-400 mt-0.5">
                  {socketEvents.length} Dispatched
                </div>
              </div>
            </div>
          </div>

          {/* 13-Screen Interactive Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredScreens.map((scr) => {
              const isCurrent = scr.id === activeScreenId;
              return (
                <div
                  key={scr.id}
                  onClick={() => handleSelectScreen(scr)}
                  className={`p-4 rounded-2xl border flex flex-col justify-between transition-all cursor-pointer ${
                    isCurrent
                      ? 'border-2 bg-white dark:bg-[#181a22] shadow-lg'
                      : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#14161d] hover:border-neutral-400 dark:hover:border-neutral-700'
                  }`}
                  style={isCurrent ? { borderColor: activeColor.swatch } : undefined}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                      <span
                        className="font-bold"
                        style={{ color: isCurrent ? activeColor.swatch : undefined }}
                      >
                        {scr.actorBadge}
                      </span>
                      {scr.promptRef && (
                        <span className="text-emerald-500 font-semibold">
                          ★ {scr.promptRef}
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                      {scr.name}
                    </h3>

                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      {scr.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-neutral-400">
                      ≥48px Touch Hitboxes
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectScreen(scr);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      style={{
                        backgroundColor: isCurrent
                          ? activeColor.swatch
                          : isDark
                          ? '#262933'
                          : '#F1F5F9',
                        color: isCurrent ? '#FFFFFF' : isDark ? '#E2E8F0' : '#1E293B',
                      }}
                    >
                      <span>{isCurrent ? 'Active in Simulator' : 'Launch Screen'}</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Real-Time Delivery Lifecycle & System Data Flow Diagram */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#14161d] border border-neutral-200 dark:border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div
                  className="text-[11px] font-mono font-bold uppercase"
                  style={{ color: activeColor.swatch }}
                >
                  REAL-TIME DELIVERY LIFECYCLE &amp; SYSTEM DATA FLOW
                </div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                  Live WebSocket Payloads &amp; Push Notification Transitions Across Actors
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveScreenId('system_lifecycle_flow')}
                className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-white cursor-pointer"
                style={{ backgroundColor: activeColor.swatch }}
              >
                Inspect in Simulator →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {socketEvents.slice(0, 3).map((ev) => (
                <div
                  key={ev.id}
                  className="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#101218] border border-neutral-200 dark:border-neutral-800 space-y-1.5 font-mono"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span style={{ color: activeColor.swatch }} className="font-bold">
                      {ev.actor}
                    </span>
                    <span className="opacity-60">{ev.timestamp}</span>
                  </div>
                  <div className="font-bold text-neutral-900 dark:text-white">
                    {ev.eventType}
                  </div>
                  <p className="text-[11px] font-sans text-neutral-500 dark:text-neutral-400">
                    {ev.payloadSummary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeStudioTab === 'theme' && (
        <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-white dark:bg-[#14161d] border border-neutral-200 dark:border-neutral-800 space-y-4">
          <h3 className="text-base font-bold">Ecosystem Brand Color Presets</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {COLOR_PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedColorId(p.id)}
                className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-center gap-2.5 text-xs font-bold cursor-pointer"
              >
                <span
                  className="w-5 h-5 rounded-full"
                  style={{ backgroundColor: p.swatch }}
                />
                <span>{p.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeStudioTab === 'branding' && (
        <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-white dark:bg-[#14161d] border border-neutral-200 dark:border-neutral-800 space-y-3">
          <h3 className="text-base font-bold">
            Outdoor &amp; High-Stress Ergonomics Specification
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            All Driver HUD and Vendor KDS controls enforce ≥48×48px touch hitboxes for gloved
            kitchen hands and handlebar phone mounts, paired with 60Hz Kalman GPS pin smoothing
            and mandatory grocery substitution rules.
          </p>
        </div>
      )}

      {activeStudioTab === 'export' && (
        <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-white dark:bg-[#14161d] border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold">Export 3-App Food &amp; Grocery Suite (.ZIP)</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Includes Customer App, Vendor KDS Terminal, and Courier HUD screens.
            </p>
          </div>
          <button
            type="button"
            onClick={handleExportZip}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white cursor-pointer"
            style={{ backgroundColor: activeColor.swatch }}
          >
            Download Project .ZIP
          </button>
        </div>
      )}
    </div>
  );

  // Right Mobile Simulator Content (with Bottom Actor Navigation Dock)
  const mobileContent = (
    <div className="flex-1 w-full h-full flex flex-col overflow-hidden bg-[#09090B]">
      {/* Active Screen Viewport */}
      <div className="flex-1 overflow-hidden">
        {currentScreenMeta.actor === 'customer' && (
          <CustomerAppScreens
            screenId={activeScreenId as CustomerScreenId}
            onNavigate={(next) => setActiveScreenId(next)}
            primaryColor={activeColor.swatch}
            isDark={isDark}
            variant={activeVariant}
          />
        )}
        {currentScreenMeta.actor === 'vendor' && (
          <VendorKdsScreens
            screenId={activeScreenId as VendorScreenId}
            onNavigate={(next) => setActiveScreenId(next)}
            primaryColor={activeColor.swatch}
          />
        )}
        {(currentScreenMeta.actor === 'driver' ||
          currentScreenMeta.actor === 'system_flow') && (
          <DriverHudScreens
            screenId={activeScreenId as DriverScreenId}
            onNavigate={(next) => setActiveScreenId(next)}
            primaryColor={activeColor.swatch}
          />
        )}
      </div>

      {/* Ergonomic Bottom Tab Bar inside Simulator for Rapid Screen Switching */}
      <div className="h-14 bg-[#0D111A] border-t border-slate-800 grid grid-cols-4 items-center px-1 shrink-0">
        {[
          {
            id: 'cust_home_hub' as FoodDeliveryScreenId,
            label: 'Customer',
            icon: ShoppingBag,
            matchActor: 'customer',
          },
          {
            id: 'cust_live_tracking' as FoodDeliveryScreenId,
            label: 'Live Map',
            icon: Navigation,
            matchScreen: 'cust_live_tracking',
          },
          {
            id: 'vendor_kds_board' as FoodDeliveryScreenId,
            label: 'Vendor KDS',
            icon: Store,
            matchActor: 'vendor',
          },
          {
            id: 'driver_dropoff_pod' as FoodDeliveryScreenId,
            label: 'Courier HUD',
            icon: Truck,
            matchActor: 'driver',
          },
        ].map((tab) => {
          const IconComp = tab.icon;
          const isTabActive =
            activeScreenId === tab.id ||
            (tab.matchActor &&
              currentScreenMeta.actor === tab.matchActor &&
              activeScreenId !== 'cust_live_tracking');
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                const targetMeta = FOOD_GROCERY_SCREENS_CATALOG.find((s) => s.id === tab.id);
                if (targetMeta) handleSelectScreen(targetMeta);
              }}
              className="min-h-[44px] flex flex-col items-center justify-center cursor-pointer"
              style={{ color: isTabActive ? activeColor.swatch : '#94A3B8' }}
            >
              <IconComp size={17} />
              <span className="text-[10px] font-bold mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <StudioDashboardShell
      activeProjectId="food_grocery_delivery"
      projectName="FreshPulse Delivery Suite"
      activeScreenLabel={currentScreenMeta.name}
      activeVariantLabel={currentScreenMeta.actorBadge}
      activeStudioTab={activeStudioTab}
      onSelectStudioTab={setActiveStudioTab}
      onSwitchProject={onSwitchProject}
      isDark={isDark}
      onToggleTheme={() => setIsDark(!isDark)}
      primaryColor={activeColor.swatch}
      primaryTextColor="#FFFFFF"
      onExportZip={handleExportZip}
      isZipping={isZipping}
      extraTopActions={extraTopActions}
      variantOptions={[
        { id: 'v1', label: 'V1 (Default)' },
        { id: 'v2', label: 'V2 (High-Contrast)' },
        { id: 'v3', label: 'V3 (Compact)' },
      ]}
      currentVariantId={activeVariant}
      onChangeVariant={(v) => setActiveVariant(v as 'v1' | 'v2' | 'v3')}
      colorSwatches={COLOR_PRESETS}
      activeColorId={selectedColorId}
      onSelectColorSwatch={setSelectedColorId}
      activeFontName="Plus Jakarta Sans / JetBrains Mono"
      middleContent={middleContent}
      mobileContent={mobileContent}
    />
  );
};

export const FoodGroceryDeliveryApp: React.FC<FoodGroceryDeliveryAppProps> = (props) => (
  <FoodGroceryEcosystemProvider>
    <InnerFoodGroceryStudio {...props} />
  </FoodGroceryEcosystemProvider>
);

export default FoodGroceryDeliveryApp;
