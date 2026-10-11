import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Search,
  ShoppingBag,
  Clock,
  Star,
  Plus,
  Minus,
  Check,
  ChevronRight,
  Phone,
  MessageSquare,
  ShieldCheck,
  Flame,
  Leaf,
  Navigation,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  X,
  Send,
  Camera,
  CreditCard,
  SlidersHorizontal,
  Utensils,
  Store,
  Truck,
  Bell,
  RefreshCw,
} from 'lucide-react';
import {
  useFoodGroceryEcosystem,
  CatalogItem,
  SubstitutionRule,
  OrderLifecycleStage,
} from '../context/FoodGroceryEcosystemContext';

export type CustomerScreenId =
  | 'cust_splash_location'
  | 'cust_home_hub'
  | 'cust_store_catalog'
  | 'cust_item_modal'
  | 'cust_cart_checkout'
  | 'cust_live_tracking';

interface CustomerAppScreensProps {
  screenId: CustomerScreenId;
  onNavigate: (next: CustomerScreenId) => void;
  primaryColor: string;
  isDark: boolean;
  variant: 'v1' | 'v2' | 'v3';
}

export const CustomerAppScreens: React.FC<CustomerAppScreensProps> = ({
  screenId,
  onNavigate,
  primaryColor,
  isDark,
}) => {
  const {
    deliveryMode,
    setDeliveryMode,
    customerAddress,
    setCustomerAddress,
    customerUnit,
    setCustomerUnit,
    dropoffInstruction,
    setDropoffInstruction,
    deliveryScheduleMode,
    setDeliveryScheduleMode,
    scheduledSlot,
    setScheduledSlot,
    catalog,
    cart,
    addToCart,
    removeFromCart,
    tipPercentage,
    setTipPercentage,
    activeOrderLifecycle,
    setActiveOrderLifecycle,
    vendorBusyMode,
    extraPrepBufferMins,
    courierGpsProgress,
    setCourierGpsProgress,
    maskedChatMessages,
    sendMaskedMessage,
    emitLifecycleEvent,
  } = useFoodGroceryEcosystem();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<CatalogItem>(() => catalog[0]);
  const [modalQty, setModalQty] = useState(1);
  const [selectedModifiers, setSelectedModifiers] = useState<string[]>([
    'Crispy Lace Smash (Medium-Well)',
  ]);
  const [specialNote, setSpecialNote] = useState('');
  const [subPreference, setSubPreference] = useState<SubstitutionRule>('match_brand');
  const [paymentMethod, setPaymentMethod] = useState<'apple_pay' | 'card'>('apple_pay');
  const [chatDrawerOpen, setChatDrawerOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [pinOffset, setPinOffset] = useState({ x: 0, y: 0 });
  const [kalmanAutoGlide, setKalmanAutoGlide] = useState(true);

  // Smooth Kalman Filter GPS Pin Interpolation Simulation
  useEffect(() => {
    if (screenId !== 'cust_live_tracking' || !kalmanAutoGlide) return;
    const interval = setInterval(() => {
      setCourierGpsProgress((prev) => {
        if (prev >= 96) return 24;
        return Number((prev + 1.5).toFixed(1));
      });
    }, 900);
    return () => clearInterval(interval);
  }, [screenId, kalmanAutoGlide, setCourierGpsProgress]);

  const filteredCatalog = catalog.filter((item) => {
    const matchesMode = item.mode === deliveryMode;
    const matchesSearch =
      !searchQuery.trim() ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesMode && matchesSearch && matchesCat;
  });

  const categoriesForMode = [
    'All',
    ...Array.from(new Set(catalog.filter((i) => i.mode === deliveryMode).map((i) => i.category))),
  ];

  const cartSubtotal = cart.reduce((acc, c) => acc + c.unitTotal * c.quantity, 0);
  const deliveryFee = deliveryScheduleMode === 'express' ? 2.99 : 0.99;
  const tipAmount = Number(((cartSubtotal * tipPercentage) / 100).toFixed(2));
  const orderGrandTotal = Number((cartSubtotal + deliveryFee + tipAmount).toFixed(2));

  const dynamicEtaMins =
    Math.max(3, Math.round(((100 - courierGpsProgress) / 100) * 18)) +
    (vendorBusyMode ? extraPrepBufferMins : 0);

  const surfaceBg = isDark ? 'bg-[#09090B] text-zinc-100' : 'bg-[#F8FAFC] text-slate-900';
  const cardBg = isDark
    ? 'bg-[#141418] border-zinc-800/90 text-zinc-100'
    : 'bg-white border-slate-200/90 text-slate-900';

  // =========================================================================
  // SCREEN A1: SPLASH & LOCATION SETUP (Precise Pin + Unit + Drop-off Note)
  // =========================================================================
  if (screenId === 'cust_splash_location') {
    return (
      <div className={`h-full flex flex-col justify-between p-4 overflow-y-auto ${surfaceBg}`}>
        <div className="space-y-4">
          {/* Brand Splash Header */}
          <div
            className="p-4 rounded-2xl text-white relative overflow-hidden"
            style={{ backgroundColor: primaryColor }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider opacity-90">
                FreshPulse · Hyperlocal 60Hz GPS
              </span>
              <span className="text-[11px] font-mono font-bold">v4.8</span>
            </div>
            <h2 className="text-xl font-bold mt-1 leading-tight">
              Hot Kitchens &amp; Organic Groceries in 18 Mins.
            </h2>
            <p className="text-xs opacity-90 mt-1">
              Fine-tune your building entrance pin for zero-friction courier drop-off.
            </p>
          </div>

          {/* Interactive Pin Adjustment Map Canvas */}
          <div className="rounded-2xl border border-zinc-700/60 bg-[#0F172A] p-3.5 text-white space-y-2.5 relative overflow-hidden">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-emerald-400 flex items-center gap-1.5">
                <Navigation size={12} /> GPS Accuracy: ±1.8m (Kalman Locked)
              </span>
              <button
                type="button"
                onClick={() =>
                  setPinOffset({
                    x: pinOffset.x === 0 ? 12 : 0,
                    y: pinOffset.y === 0 ? -8 : 0,
                  })
                }
                className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-[10px] cursor-pointer"
              >
                Nudge Entrance Pin
              </button>
            </div>

            {/* Stylized Street Grid & Draggable Pin */}
            <div className="h-32 rounded-xl bg-[#1E293B] relative overflow-hidden flex items-center justify-center border border-slate-700">
              <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 200 100">
                <path d="M0 30 H200 M0 70 H200 M60 0 V100 M140 0 V100" stroke="#94A3B8" strokeWidth="2" />
                <rect x="65" y="34" width="70" height="32" rx="4" fill="#334155" />
              </svg>
              <div
                className="relative z-10 flex flex-col items-center transition-transform duration-200"
                style={{ transform: `translate(${pinOffset.x}px, ${pinOffset.y}px)` }}
              >
                <div
                  className="px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-lg text-white mb-1"
                  style={{ backgroundColor: primaryColor }}
                >
                  North Gate Drop-off Pin
                </div>
                <MapPin size={26} className="text-emerald-400 drop-shadow" />
              </div>
            </div>
          </div>

          {/* Address, Unit & Drop-off Form */}
          <div className={`p-3.5 rounded-2xl border space-y-3 ${cardBg}`}>
            <div>
              <label className="text-[11px] font-mono opacity-65 block mb-1">
                DELIVERY STREET ADDRESS
              </label>
              <input
                type="text"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-zinc-500/30 bg-transparent text-xs font-semibold focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono opacity-65 block mb-1">
                BUILDING / APARTMENT UNIT &amp; GATE CODE
              </label>
              <input
                type="text"
                value={customerUnit}
                onChange={(e) => setCustomerUnit(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-zinc-500/30 bg-transparent text-xs font-semibold focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono opacity-65 block mb-1">
                COURIER DROP-OFF INSTRUCTIONS
              </label>
              <div className="grid grid-cols-2 gap-1.5 mb-2">
                {[
                  'Leave at front door, ring bell',
                  'Meet at building lobby desk',
                  'Leave at gate (Photo required)',
                  'Call masked number on arrival',
                ].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setDropoffInstruction(preset)}
                    className={`p-2 rounded-lg border text-left text-[10px] font-medium min-h-[40px] cursor-pointer ${
                      dropoffInstruction === preset
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500 font-bold'
                        : 'border-zinc-500/25 opacity-75'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('cust_home_hub')}
          className="w-full min-h-[48px] rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer mt-3"
          style={{ backgroundColor: primaryColor }}
        >
          <span>Confirm Location &amp; Explore Catalog</span>
          <ChevronRight size={16} />
        </button>
      </div>
    );
  }

  // =========================================================================
  // SCREEN A2: HOME / DISCOVERY HUB (Food vs Grocery Toggle + Schedule + Promos)
  // =========================================================================
  if (screenId === 'cust_home_hub') {
    return (
      <div className={`h-full flex flex-col justify-between p-4 overflow-y-auto space-y-4 ${surfaceBg}`}>
        <div className="space-y-3.5">
          {/* Location & Schedule Bar */}
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => onNavigate('cust_splash_location')}
              className="flex items-center gap-1.5 text-left min-h-[44px] cursor-pointer"
            >
              <MapPin size={16} style={{ color: primaryColor }} />
              <div>
                <div className="text-[10px] font-mono opacity-60">DELIVERING TO</div>
                <div className="text-xs font-bold truncate max-w-[180px]">{customerAddress}</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                const next = deliveryScheduleMode === 'express' ? 'scheduled' : 'express';
                setDeliveryScheduleMode(next);
                setScheduledSlot(
                  next === 'express' ? 'Today · Express (18–24m)' : 'Tomorrow · 6:00–6:30 PM'
                );
              }}
              className={`px-2.5 py-2 rounded-xl border text-[10px] font-mono font-semibold min-h-[44px] flex items-center gap-1.5 cursor-pointer ${cardBg}`}
            >
              <Clock size={13} style={{ color: primaryColor }} />
              <span>{deliveryScheduleMode === 'express' ? 'Express 18m' : 'Scheduled Slot'}</span>
            </button>
          </div>

          {/* Food vs Grocery Mode Segmented Switcher */}
          <div className={`grid grid-cols-2 p-1 rounded-xl border ${cardBg}`}>
            <button
              type="button"
              onClick={() => {
                setDeliveryMode('food');
                setSelectedCategory('All');
              }}
              className={`min-h-[44px] rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                deliveryMode === 'food' ? 'text-white shadow-sm' : 'opacity-70'
              }`}
              style={deliveryMode === 'food' ? { backgroundColor: primaryColor } : undefined}
            >
              <Flame size={14} />
              <span>Hot Restaurants</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setDeliveryMode('grocery');
                setSelectedCategory('All');
              }}
              className={`min-h-[44px] rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                deliveryMode === 'grocery' ? 'text-white shadow-sm' : 'opacity-70'
              }`}
              style={deliveryMode === 'grocery' ? { backgroundColor: '#10B981' } : undefined}
            >
              <Leaf size={14} />
              <span>Fresh Grocery</span>
            </button>
          </div>

          {/* Vendor Busy / Proactive Delay Banner if toggled in Merchant Terminal */}
          {vendorBusyMode && (
            <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-400 text-xs flex items-center gap-2">
              <AlertTriangle size={15} className="shrink-0" />
              <span>
                Peak Kitchen Demand: Prep times extended by +{extraPrepBufferMins}m for hot quality.
              </span>
            </div>
          )}

          {/* Promo Hero Card */}
          <div
            className="p-4 rounded-2xl text-white space-y-2"
            style={{
              background:
                deliveryMode === 'food'
                  ? `linear-gradient(135deg, ${primaryColor}, #EA580C)`
                  : 'linear-gradient(135deg, #059669, #0D9488)',
            }}
          >
            <div className="text-[10px] font-mono uppercase tracking-wider opacity-90">
              {deliveryMode === 'food'
                ? 'SMASH & SEAR CRAFT KITCHEN · 0.8 MI'
                : 'GREENCRATE ORGANIC MARKET · COLD CHAIN'}
            </div>
            <div className="text-base font-bold leading-snug">
              {deliveryMode === 'food'
                ? '$0 Delivery Fee on Wagyu Burgers & Wood-Fired Bowls'
                : '100% Smart Substitution Guarantee on Organic Produce'}
            </div>
            <button
              type="button"
              onClick={() => onNavigate('cust_store_catalog')}
              className="px-3.5 py-2 rounded-lg bg-white text-slate-900 text-xs font-bold cursor-pointer"
            >
              Open Store Catalog →
            </button>
          </div>

          {/* "Order Again" 1-Tap Shortcuts */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold">Order Again &amp; Top Picks</span>
              <button
                type="button"
                onClick={() => onNavigate('cust_store_catalog')}
                className="font-mono text-[11px] underline cursor-pointer"
                style={{ color: primaryColor }}
              >
                See All ({filteredCatalog.length})
              </button>
            </div>

            <div className="space-y-2.5">
              {filteredCatalog.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    onNavigate('cust_item_modal');
                  }}
                  className={`p-3 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer ${cardBg}`}
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-[10px] font-mono opacity-75">
                      <span>{item.category}</span>
                      <span>·</span>
                      <span>{item.prepTimeMins}m prep</span>
                      {!item.inStock && (
                        <span className="text-rose-500 font-bold">· 86’d SOLD OUT</span>
                      )}
                    </div>
                    <div className="text-xs font-bold truncate">{item.name}</div>
                    <div className="text-xs font-mono font-bold" style={{ color: primaryColor }}>
                      ${item.price.toFixed(2)}{' '}
                      <span className="text-[10px] font-normal opacity-65">/ {item.unitLabel}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={!item.inStock}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItem(item);
                      onNavigate('cust_item_modal');
                    }}
                    className={`min-h-[44px] px-3 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer ${
                      item.inStock
                        ? 'text-white'
                        : 'bg-zinc-700/40 text-zinc-400 cursor-not-allowed'
                    }`}
                    style={item.inStock ? { backgroundColor: primaryColor } : undefined}
                  >
                    {item.inStock ? (
                      <>
                        <Plus size={14} />
                        <span>Add</span>
                      </>
                    ) : (
                      <span>86’d</span>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Cart Summary Bar */}
        <button
          type="button"
          onClick={() => onNavigate('cust_cart_checkout')}
          className="w-full min-h-[48px] px-4 rounded-xl text-white font-bold text-xs flex items-center justify-between shadow-lg cursor-pointer"
          style={{ backgroundColor: primaryColor }}
        >
          <span>View Basket ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
          <span className="font-mono">${cartSubtotal.toFixed(2)} →</span>
        </button>
      </div>
    );
  }

  // =========================================================================
  // SCREEN A3: VENDOR / STORE CATALOG (Category Tabs + Live 86 Stock Status)
  // =========================================================================
  if (screenId === 'cust_store_catalog') {
    return (
      <div className={`h-full flex flex-col justify-between p-4 overflow-y-auto space-y-3.5 ${surfaceBg}`}>
        <div className="space-y-3">
          {/* Store Header Info */}
          <div className={`p-3.5 rounded-2xl border space-y-1.5 ${cardBg}`}>
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span style={{ color: primaryColor }}>
                {deliveryMode === 'food'
                  ? 'SMASH & SEAR CRAFT KITCHEN'
                  : 'GREENCRATE ORGANIC GROCERY'}
              </span>
              <span>★ 4.9 (1,420+) · $0.99 Fee</span>
            </div>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-3 opacity-50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${deliveryMode} catalog...`}
                className="w-full pl-8 pr-3 py-2 rounded-xl border border-zinc-500/25 bg-transparent text-xs focus:outline-none"
              />
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-1">
              {categoriesForMode.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'text-white'
                      : 'border border-zinc-500/25 opacity-75'
                  }`}
                  style={selectedCategory === cat ? { backgroundColor: primaryColor } : undefined}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="space-y-2.5">
            {filteredCatalog.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  onNavigate('cust_item_modal');
                }}
                className={`p-3.5 rounded-2xl border space-y-2 cursor-pointer transition ${cardBg} ${
                  !item.inStock ? 'opacity-65' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-[10px] font-mono opacity-70">
                      {item.category} · {item.caloriesOrWeight}
                    </div>
                    <h4 className="text-xs font-bold mt-0.5">{item.name}</h4>
                  </div>
                  <span className="text-xs font-mono font-bold" style={{ color: primaryColor }}>
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-[11px] opacity-75 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-mono opacity-70">
                    {item.inStock ? `Ready in ~${item.prepTimeMins} mins` : '86’d by Kitchen KDS'}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItem(item);
                      onNavigate('cust_item_modal');
                    }}
                    className="min-h-[40px] px-3 rounded-xl text-[11px] font-bold text-white cursor-pointer"
                    style={{ backgroundColor: item.inStock ? primaryColor : '#52525B' }}
                  >
                    {item.inStock ? '+ Customize / Add' : 'Set Sub Rule'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('cust_cart_checkout')}
          className="w-full min-h-[48px] px-4 rounded-xl text-white font-bold text-xs flex items-center justify-between shadow-lg cursor-pointer"
          style={{ backgroundColor: primaryColor }}
        >
          <span>Proceed to Checkout ({cart.length} items)</span>
          <span className="font-mono">${cartSubtotal.toFixed(2)} →</span>
        </button>
      </div>
    );
  }

  // =========================================================================
  // SCREEN A4: ITEM DETAIL & GROCERY SUBSTITUTION BOTTOM-SHEET MODAL (Prompt 2)
  // =========================================================================
  if (screenId === 'cust_item_modal') {
    const item = selectedItem || catalog[0];
    return (
      <div className={`h-full flex flex-col justify-between p-4 overflow-y-auto space-y-4 ${surfaceBg}`}>
        <div className="space-y-3.5">
          {/* Item Header Card */}
          <div className={`p-4 rounded-2xl border space-y-2 bg-gradient-to-br ${item.accentGradient} ${cardBg}`}>
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span>{item.vendorName}</span>
              <span>{item.caloriesOrWeight}</span>
            </div>
            <h3 className="text-base font-bold">{item.name}</h3>
            <p className="text-xs opacity-80 leading-relaxed">{item.description}</p>
            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-bold font-mono" style={{ color: primaryColor }}>
                ${item.price.toFixed(2)}
              </span>
              {/* Numeric Quantity Stepper (>=44px touch targets) */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setModalQty(Math.max(1, modalQty - 1))}
                  className="w-11 h-11 rounded-xl border border-zinc-500/30 flex items-center justify-center font-bold cursor-pointer"
                >
                  <Minus size={15} />
                </button>
                <span className="w-8 text-center font-mono font-bold text-sm">{modalQty}</span>
                <button
                  type="button"
                  onClick={() => setModalQty(modalQty + 1)}
                  className="w-11 h-11 rounded-xl text-white flex items-center justify-center font-bold cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Multi-Tier Restaurant Modifiers */}
          {item.modifiers && item.modifiers.length > 0 && (
            <div className={`p-3.5 rounded-2xl border space-y-2.5 ${cardBg}`}>
              <div className="text-xs font-bold">Kitchen Modifiers &amp; Temperature</div>
              {item.modifiers.flatMap((g) => g.options).map((opt) => {
                const active = selectedModifiers.includes(opt.label);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() =>
                      setSelectedModifiers((prev) =>
                        prev.includes(opt.label)
                          ? prev.filter((x) => x !== opt.label)
                          : [...prev, opt.label]
                      )
                    }
                    className={`w-full min-h-[44px] px-3 py-2 rounded-xl border text-left text-xs flex items-center justify-between cursor-pointer ${
                      active
                        ? 'border-emerald-500 bg-emerald-500/10 font-bold'
                        : 'border-zinc-500/20 opacity-80'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span className="font-mono text-[11px]">
                      {opt.priceDelta > 0 ? `+$${opt.priceDelta.toFixed(2)}` : 'Included'}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Mandatory Grocery Out-of-Stock Substitution Preference (Prompt 2 Spec) */}
          <div className={`p-3.5 rounded-2xl border space-y-2.5 ${cardBg}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold">If Out of Stock (Substitution Rule)</span>
              <span className="text-[10px] font-mono text-emerald-500">Required</span>
            </div>
            <div className="space-y-1.5">
              {(
                [
                  {
                    id: 'match_brand',
                    label: 'Match Brand / Closest Equivalent Size',
                  },
                  {
                    id: 'organic_upgrade',
                    label: 'Replace with USDA Organic Brand',
                  },
                  {
                    id: 'contact_me',
                    label: 'Contact Me via Masked In-App Chat First',
                  },
                  {
                    id: 'refund',
                    label: 'Do Not Substitute — Instant Auto-Refund',
                  },
                ] as { id: SubstitutionRule; label: string }[]
              ).map((rule) => (
                <button
                  key={rule.id}
                  type="button"
                  onClick={() => setSubPreference(rule.id)}
                  className={`w-full min-h-[44px] px-3 py-2 rounded-xl border text-left text-xs flex items-center justify-between cursor-pointer ${
                    subPreference === rule.id
                      ? 'border-emerald-500 bg-emerald-500/10 font-bold text-emerald-400'
                      : 'border-zinc-500/20 opacity-80'
                  }`}
                >
                  <span>{rule.label}</span>
                  {subPreference === rule.id && <Check size={14} />}
                </button>
              ))}
            </div>
          </div>

          {/* Special Instructions Input */}
          <div className={`p-3.5 rounded-2xl border space-y-1.5 ${cardBg}`}>
            <label className="text-[11px] font-mono opacity-70 block">
              SPECIAL KITCHEN / PICKER NOTE
            </label>
            <input
              type="text"
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              placeholder="e.g., No onions, pick firmest avocados..."
              className="w-full px-3 py-2 rounded-xl border border-zinc-500/25 bg-transparent text-xs focus:outline-none"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            addToCart(item, modalQty, selectedModifiers, specialNote, subPreference);
            onNavigate('cust_cart_checkout');
          }}
          className="w-full min-h-[48px] rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          style={{ backgroundColor: primaryColor }}
        >
          <span>
            Add {modalQty}x to Order · ${(item.price * modalQty).toFixed(2)}
          </span>
        </button>
      </div>
    );
  }

  // =========================================================================
  // SCREEN A5: CART & CHECKOUT (Tip Selector 15/18/20% + Apple Pay)
  // =========================================================================
  if (screenId === 'cust_cart_checkout') {
    return (
      <div className={`h-full flex flex-col justify-between p-4 overflow-y-auto space-y-4 ${surfaceBg}`}>
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold">Checkout &amp; Courier Tip</h3>
            <span className="text-[11px] font-mono opacity-70">{scheduledSlot}</span>
          </div>

          {/* Itemized Review */}
          <div className={`p-3.5 rounded-2xl border space-y-2.5 ${cardBg}`}>
            {cart.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start justify-between gap-2 pb-2.5 border-b last:border-b-0 border-zinc-500/15"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-bold">
                    {entry.quantity}x {entry.item.name}
                  </div>
                  <div className="text-[10px] font-mono opacity-70">
                    Sub Rule: {entry.substitutionRule.replace('_', ' ')}
                  </div>
                  {entry.selectedModifiers.length > 0 && (
                    <div className="text-[10px] text-emerald-500 font-mono">
                      {entry.selectedModifiers.join(' · ')}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold">
                    ${(entry.unitTotal * entry.quantity).toFixed(2)}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(entry.id)}
                    className="text-[10px] text-rose-400 underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Courier Tip Selector (15%, 18%, 20%, 25%) */}
          <div className={`p-3.5 rounded-2xl border space-y-2 ${cardBg}`}>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold">100% of Tip Goes to Courier</span>
              <span className="font-mono font-bold" style={{ color: primaryColor }}>
                ${tipAmount.toFixed(2)} ({tipPercentage}%)
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[15, 18, 20, 25].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setTipPercentage(pct)}
                  className={`min-h-[44px] rounded-xl text-xs font-mono font-bold border cursor-pointer ${
                    tipPercentage === pct
                      ? 'text-white border-transparent'
                      : 'border-zinc-500/25 opacity-75'
                  }`}
                  style={tipPercentage === pct ? { backgroundColor: primaryColor } : undefined}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className={`p-3.5 rounded-2xl border space-y-2 ${cardBg}`}>
            <div className="text-xs font-bold">Payment Method</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                className={`min-h-[44px] px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                  paymentMethod === 'apple_pay'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                    : 'border-zinc-500/25 opacity-75'
                }`}
              >
                <span> Apple Pay</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`min-h-[44px] px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                    : 'border-zinc-500/25 opacity-75'
                }`}
              >
                <CreditCard size={13} />
                <span>Visa •••• 4242</span>
              </button>
            </div>

            <div className="pt-2 border-t border-zinc-500/15 space-y-1 text-xs font-mono">
              <div className="flex justify-between opacity-75">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between opacity-75">
                <span>Delivery Fee ({deliveryScheduleMode})</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-sm pt-1">
                <span>Total</span>
                <span style={{ color: primaryColor }}>${orderGrandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setActiveOrderLifecycle('driver_picked_up');
            emitLifecycleEvent(
              'CUSTOMER_APP',
              'CHECKOUT_AUTHORIZED',
              `Order #4092 confirmed ($${orderGrandTotal}) · Dispatched to KDS & Courier HUD`,
              'Order Confirmed! Live GPS tracking activated.'
            );
            onNavigate('cust_live_tracking');
          }}
          className="w-full min-h-[48px] rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          style={{ backgroundColor: primaryColor }}
        >
          <span>Place Order · ${orderGrandTotal.toFixed(2)}</span>
          <ChevronRight size={16} />
        </button>
      </div>
    );
  }

  // =========================================================================
  // SCREEN A6: LIVE ORDER TRACKING SCREEN (Prompt 1 Spec: Dark Map + Scooter + Card)
  // =========================================================================
  const lifecycleStages: { id: OrderLifecycleStage; label: string }[] = [
    { id: 'order_confirmed', label: 'Confirmed' },
    { id: 'kitchen_preparing', label: 'Preparing' },
    { id: 'driver_picked_up', label: 'Out for Delivery' },
    { id: 'delivered', label: 'Delivered' },
  ];

  return (
    <div className="h-full flex flex-col bg-[#090D16] text-white overflow-hidden relative">
      {/* Top 2/3: Stylized Dark-Mode Map with Route Line & Smooth Kalman Scooter Pin */}
      <div className="relative flex-1 bg-[#0F172A] overflow-hidden p-4 flex flex-col justify-between">
        {/* Map Road Grid & Route SVG */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 360 320" preserveAspectRatio="none">
          {/* City Blocks */}
          <g stroke="#1E293B" strokeWidth="14" fill="none">
            <path d="M0 60 H360 M0 160 H360 M0 250 H360" />
            <path d="M70 0 V320 M190 0 V320 M290 0 V320" />
          </g>
          {/* Dashed Background Route Line */}
          <path
            d="M 55 245 Q 150 240 190 155 T 305 65"
            stroke="#334155"
            strokeWidth="5"
            fill="none"
            strokeDasharray="6 6"
          />
          {/* Active Glowing Route Line */}
          <path
            d="M 55 245 Q 150 240 190 155 T 305 65"
            stroke={primaryColor}
            strokeWidth="4"
            fill="none"
          />
        </svg>

        {/* Top Telemetry Pill */}
        <div className="relative z-10 flex items-center justify-between gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3 py-2 rounded-xl text-[11px] font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            60Hz Kalman GPS Stream
          </span>
          <button
            type="button"
            onClick={() => setKalmanAutoGlide(!kalmanAutoGlide)}
            className="px-2 py-0.5 rounded bg-white/10 text-[10px] cursor-pointer"
          >
            {kalmanAutoGlide ? 'Smoothing: ON' : 'Paused'}
          </button>
        </div>

        {/* Restaurant Origin Pin (Bottom Left) */}
        <div className="relative z-10 flex items-center justify-between my-auto px-2">
          <div className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700 text-[10px] font-mono">
            🏪 Smash &amp; Sear
          </div>

          {/* Animated Scooter Pin Moving Along Route */}
          <div
            className="px-3 py-1.5 rounded-full shadow-xl border-2 border-white flex items-center gap-1.5 text-xs font-bold transition-all duration-700"
            style={{
              backgroundColor: primaryColor,
              transform: `translateY(${(50 - courierGpsProgress) * 0.4}px)`,
            }}
          >
            <span>🛵 Mateo</span>
            <span className="font-mono text-[10px]">{Math.round(courierGpsProgress)}%</span>
          </div>

          {/* Customer Home Pin (Top Right) */}
          <div className="px-2.5 py-1 rounded-lg bg-emerald-600/90 text-white text-[10px] font-mono">
            🏠 Apt 4B
          </div>
        </div>

        {/* Stage Switcher Bar for Testing Lifecycle */}
        <div className="relative z-10 flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          {lifecycleStages.map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => setActiveOrderLifecycle(st.id)}
              className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                activeOrderLifecycle === st.id
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              style={
                activeOrderLifecycle === st.id ? { backgroundColor: primaryColor } : undefined
              }
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom 1/3: Sleek White Floating Card ("Arriving in 12 mins" + 4-Stage Bar + Courier + Call/Message) */}
      <div className="bg-white text-slate-900 rounded-t-3xl p-4 shadow-2xl space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-extrabold tracking-tight">
              {activeOrderLifecycle === 'delivered'
                ? 'Delivered at Front Door!'
                : `Arriving in ${dynamicEtaMins} mins`}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              Order #4092 · {dropoffInstruction}
            </div>
          </div>
          <div
            className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold text-white"
            style={{ backgroundColor: primaryColor }}
          >
            {activeOrderLifecycle === 'delivered' ? '100%' : 'On Time'}
          </div>
        </div>

        {/* 4-Stage Progress Bar with "Out for Delivery" Highlighted */}
        <div className="grid grid-cols-4 gap-1.5">
          {lifecycleStages.map((st, idx) => {
            const currentIdx = lifecycleStages.findIndex((x) => x.id === activeOrderLifecycle);
            const completed = idx <= currentIdx;
            return (
              <div key={st.id} className="space-y-1">
                <div
                  className="h-1.5 rounded-full transition-colors"
                  style={{
                    backgroundColor: completed ? primaryColor : '#E2E8F0',
                  }}
                />
                <div
                  className={`text-[10px] font-bold truncate ${
                    completed ? 'text-slate-900' : 'text-slate-400'
                  }`}
                >
                  {st.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Courier Profile Row + Masked Call & Message Buttons */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              MS
            </div>
            <div>
              <div className="text-xs font-bold flex items-center gap-1.5">
                <span>Mateo Silva</span>
                <span className="text-amber-500 font-mono">★ 4.9</span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                Honda PCX Scooter · Masked Proxy
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                emitLifecycleEvent(
                  'CUSTOMER_APP',
                  'MASKED_VOICE_CALL_INITIATED',
                  'Dialing Courier Mateo via anonymized proxy +1 (555) 019-2831',
                  'Connected masked voice call with Courier Mateo.'
                )
              }
              className="min-h-[44px] px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Phone size={14} />
              <span>Call</span>
            </button>
            <button
              type="button"
              onClick={() => setChatDrawerOpen(true)}
              className="min-h-[44px] px-3.5 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <MessageSquare size={14} />
              <span>Message</span>
            </button>
          </div>
        </div>
      </div>

      {/* Masked In-App Chat Drawer */}
      {chatDrawerOpen && (
        <div className="absolute inset-0 z-30 bg-black/75 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white text-slate-900 rounded-t-3xl p-4 space-y-3 max-h-[80%] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div>
                <div className="text-xs font-bold">Masked Relay Chat · Order #4092</div>
                <div className="text-[10px] font-mono text-emerald-600">
                  Phone numbers anonymized via Twilio Proxy
                </div>
              </div>
              <button
                type="button"
                onClick={() => setChatDrawerOpen(false)}
                className="p-1.5 rounded-lg bg-slate-100 cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 py-1">
              {maskedChatMessages.map((m) => (
                <div
                  key={m.id}
                  className={`p-2.5 rounded-xl text-xs ${
                    m.sender === 'Customer'
                      ? 'bg-emerald-600 text-white ml-6'
                      : 'bg-slate-100 text-slate-900 mr-6'
                  }`}
                >
                  <div className="text-[10px] font-mono opacity-75">
                    {m.sender} · {m.time}
                  </div>
                  <div className="mt-0.5">{m.text}</div>
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!chatInput.trim()) return;
                sendMaskedMessage('Customer', chatInput);
                setChatInput('');
              }}
              className="flex items-center gap-2 pt-2 border-t border-slate-100"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Message courier or kitchen..."
                className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none"
              />
              <button
                type="submit"
                className="min-h-[40px] px-3.5 rounded-xl text-white text-xs font-bold cursor-pointer"
                style={{ backgroundColor: primaryColor }}
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
