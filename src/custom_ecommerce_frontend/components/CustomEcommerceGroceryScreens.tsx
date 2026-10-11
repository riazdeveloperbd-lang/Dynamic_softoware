import React, { useState } from 'react';
import {
  Plus,
  Minus,
  ShoppingCart,
  Clock,
  Calendar,
  RefreshCw,
  CheckCircle2,
  Phone,
  AlertTriangle,
  Truck,
  Sparkles,
  Check,
  ArrowRight,
} from 'lucide-react';
import {
  CustomEcommerceScreenId,
  CustomEcommerceVariantId,
} from '../data/customEcommerceRegistry';

interface GroceryScreensProps {
  screenId: CustomEcommerceScreenId;
  variant: CustomEcommerceVariantId;
  primaryColor: string;
  isDark: boolean;
  onNavigate: (target: CustomEcommerceScreenId) => void;
}

const GROCERY_ITEMS = [
  {
    id: 'g_1',
    name: 'Organic Hass Avocados (Pack of 4)',
    weight: '600g Pack',
    price: 6,
    aisle: 'Fresh Produce',
    freq: 'Bought every 5 days',
    img: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'g_2',
    name: 'Farm Fresh Free-Range Brown Eggs',
    weight: '12 pcs Tray',
    price: 4,
    aisle: 'Dairy & Eggs',
    freq: 'Bought weekly',
    img: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'g_3',
    name: 'Artisan Sourdough Country Loaf',
    weight: '450g Baked',
    price: 5,
    aisle: 'Artisan Bakery',
    freq: 'Bought every 3 days',
    img: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'g_4',
    name: 'Cold-Pressed Valencia Orange Juice',
    weight: '1 Liter Bottle',
    price: 7,
    aisle: 'Chilled Drinks',
    freq: 'Bought weekly',
    img: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80',
  },
];

export const CustomEcommerceGroceryScreens: React.FC<GroceryScreensProps> = ({
  screenId,
  variant,
  primaryColor,
  isDark,
  onNavigate,
}) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    g_1: 2,
    g_2: 1,
    g_3: 1,
    g_4: 0,
  });
  const [selectedDay, setSelectedDay] = useState('Today, Oct 9');
  const [selectedSlot, setSelectedSlot] = useState('4:00 PM – 6:00 PM (Chilled Van)');
  const [subRule, setSubRule] = useState<'best_match' | 'call_me' | 'cancel_item'>('best_match');

  const updateQty = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  const basketTotal = GROCERY_ITEMS.reduce(
    (sum, item) => sum + item.price * (quantities[item.id] || 0),
    0
  );

  // ============================================================================
  // 23. GROCERY QUICK-ADD LISTS (PROMINENT + / - STEPPERS DIRECTLY ON GRID)
  // ============================================================================
  if (screenId === 'GroceryQuickAddListsPlp') {
    return (
      <div className="h-full flex flex-col justify-between p-4 select-none space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase text-emerald-500">
              FMCG EXPRESS AISLE · {variant.replace('varient_', 'V')}
            </span>
            <h1 className="text-base font-black">Quick-Add Grocery Grid</h1>
          </div>
          <span className="px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-500 text-xs font-black">
            ⚡ 15m Delivery
          </span>
        </div>

        {/* 2-Column Grid or List with Prominent Direct + and - Buttons */}
        <div
          className={`flex-1 overflow-y-auto no-scrollbar ${
            variant === 'varient_3' || variant === 'varient_6'
              ? 'space-y-2'
              : 'grid grid-cols-2 gap-2.5'
          }`}
        >
          {GROCERY_ITEMS.map((item) => {
            const qty = quantities[item.id] || 0;
            const isRow = variant === 'varient_3' || variant === 'varient_6';
            return (
              <div
                key={item.id}
                className={`rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-2.5 ${
                  isRow ? 'flex items-center justify-between gap-2.5' : 'space-y-2 flex flex-col justify-between'
                }`}
              >
                <div className={isRow ? 'flex items-center gap-2.5 min-w-0' : 'space-y-1.5'}>
                  <img
                    src={item.img}
                    alt={item.name}
                    className={
                      isRow ? 'w-14 h-14 rounded-xl object-cover flex-shrink-0' : 'w-full h-24 rounded-xl object-cover'
                    }
                  />
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold opacity-60">{item.weight}</div>
                    <div className="text-xs font-extrabold line-clamp-1">{item.name}</div>
                    <div className="text-xs font-black" style={{ color: primaryColor }}>
                      ${item.price}.00
                    </div>
                  </div>
                </div>

                {/* Prominent Direct + and - Steppers on Grid */}
                <div className="flex items-center justify-between bg-neutral-100 dark:bg-neutral-800 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, -1)}
                    className="w-7 h-7 rounded-lg bg-white dark:bg-neutral-900 flex items-center justify-center font-black cursor-pointer shadow-xs"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="text-xs font-black px-2">{qty}</span>
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, 1)}
                    className="w-7 h-7 rounded-lg text-white flex items-center justify-center font-black cursor-pointer shadow-xs"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onNavigate('GroceryDeliverySlotPicker')}
          className="w-full py-3 rounded-xl text-xs font-extrabold text-white flex items-center justify-between px-4 shadow-md cursor-pointer"
          style={{ backgroundColor: primaryColor }}
        >
          <span>Basket Total: ${basketTotal}.00</span>
          <span>Pick Delivery Slot →</span>
        </button>
      </div>
    );
  }

  // ============================================================================
  // 24. DELIVERY SLOT PICKER (CALENDAR & TIME-SLOT SELECTION FOR FRESH DELIVERY)
  // ============================================================================
  if (screenId === 'GroceryDeliverySlotPicker') {
    const days = ['Today, Oct 9', 'Tomorrow, Oct 10', 'Sun, Oct 11'];
    const slots = [
      { time: '⚡ 15–20 Mins Turbo', fee: '$3.00', badge: 'Fastest' },
      { time: '4:00 PM – 6:00 PM (Chilled Van)', fee: 'FREE', badge: 'Eco Green Van' },
      { time: '7:00 PM – 9:00 PM (Evening)', fee: '$1.50', badge: 'Popular' },
      { time: 'Tomorrow 7:00 AM (Sunrise Milk Drop)', fee: 'FREE', badge: 'Fresh Bake' },
    ];

    return (
      <div className="p-4 space-y-4 select-none">
        <div>
          <span className="text-[10px] font-extrabold uppercase text-emerald-500">
            COLD-CHAIN SCHEDULER · {variant.replace('varient_', 'V')}
          </span>
          <h1 className="text-base font-black">Schedule Fresh Delivery Slot</h1>
          <p className="text-[11px] opacity-65">Pick date &amp; temperature-controlled van window</p>
        </div>

        {/* Calendar Day Strip */}
        <div className="grid grid-cols-3 gap-2">
          {days.map((d) => {
            const active = selectedDay === d;
            return (
              <button
                key={d}
                type="button"
                onClick={() => setSelectedDay(d)}
                className={`p-2.5 rounded-xl border text-center text-[11px] font-extrabold cursor-pointer ${
                  active ? 'text-white border-transparent' : 'border-neutral-200 dark:border-neutral-800'
                }`}
                style={active ? { backgroundColor: primaryColor } : undefined}
              >
                {d}
              </button>
            );
          })}
        </div>

        {/* Time Slot Cards */}
        <div className="space-y-2">
          {slots.map((s) => {
            const active = selectedSlot === s.time;
            return (
              <div
                key={s.time}
                onClick={() => setSelectedSlot(s.time)}
                className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer ${
                  active ? 'border-2 bg-indigo-500/10' : 'border-neutral-200 dark:border-neutral-800'
                }`}
                style={active ? { borderColor: primaryColor } : undefined}
              >
                <div>
                  <div className="text-xs font-extrabold">{s.time}</div>
                  <span className="text-[10px] font-bold text-emerald-500">{s.badge}</span>
                </div>
                <span className="text-xs font-black">{s.fee}</span>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => onNavigate('GrocerySubstitutionSheet')}
          className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
          style={{ backgroundColor: primaryColor }}
        >
          Lock Slot ({selectedDay}) →
        </button>
      </div>
    );
  }

  // ============================================================================
  // 25. "BUY AGAIN" / STAPLES REORDER DASHBOARD
  // ============================================================================
  if (screenId === 'GroceryBuyAgainReorder') {
    return (
      <div className="p-4 space-y-4 select-none">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-black">&ldquo;Buy Again&rdquo; Staples ({variant.replace('varient_', 'V')})</h1>
            <p className="text-[11px] opacity-65">1-tap reorder of your weekly household essentials</p>
          </div>
          <RefreshCw size={16} style={{ color: primaryColor }} />
        </div>

        {/* 1-Tap Refill Entire Weekly Basket Banner */}
        <div
          className="p-4 rounded-2xl text-white space-y-2 shadow-md"
          style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, #059669 100%)` }}
        >
          <div className="text-[10px] font-mono uppercase opacity-85">SMART WEEKLY REFILL</div>
          <div className="text-base font-black">Your 4 Weekly Staples ($22.00)</div>
          <button
            type="button"
            onClick={() => onNavigate('ShoppingCart')}
            className="w-full py-2.5 rounded-xl bg-white text-slate-950 text-xs font-black cursor-pointer"
          >
            ⚡ 1-Tap Add All 4 Staples to Cart
          </button>
        </div>

        {/* Staples List */}
        <div className="space-y-2">
          {GROCERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="p-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img src={item.img} alt="" className="w-12 h-12 rounded-xl object-cover" />
                <div className="min-w-0">
                  <div className="text-xs font-extrabold truncate">{item.name}</div>
                  <div className="text-[10px] text-emerald-500 font-bold">{item.freq}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => updateQty(item.id, 1)}
                className="px-3 py-1.5 rounded-xl text-[10px] font-extrabold text-white cursor-pointer"
                style={{ backgroundColor: primaryColor }}
              >
                + Reorder (${item.price})
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ============================================================================
  // 26. SUBSTITUTION PREFERENCES BOTTOM SHEET (IF ITEM IS OUT OF STOCK)
  // ============================================================================
  return (
    <div className="p-4 space-y-4 select-none">
      <div>
        <span className="text-[10px] font-extrabold uppercase text-amber-500">
          OUT-OF-STOCK FALLBACK · {variant.replace('varient_', 'V')}
        </span>
        <h1 className="text-base font-black">Substitution Preferences</h1>
        <p className="text-[11px] opacity-65">
          Choose what our store picker should do if an item is unavailable:
        </p>
      </div>

      {/* 3 Core Substitution Rules */}
      <div className="space-y-2.5">
        {[
          {
            id: 'best_match',
            title: '🔄 Replace with Best Match (Recommended)',
            desc: 'Picker selects closest organic or equivalent weight brand at same price.',
          },
          {
            id: 'call_me',
            title: '📞 Call / Message Me Before Swapping',
            desc: 'Receive a 60-second live photo approval request from the store aisle.',
          },
          {
            id: 'cancel_item',
            title: '✕ Do Not Substitute (Cancel & Instant Refund)',
            desc: 'Remove unavailable item and refund immediately to your wallet.',
          },
        ].map((rule) => {
          const active = subRule === rule.id;
          return (
            <div
              key={rule.id}
              onClick={() => setSubRule(rule.id as any)}
              className={`p-3.5 rounded-2xl border cursor-pointer space-y-1 ${
                active ? 'border-2 bg-indigo-500/10' : 'border-neutral-200 dark:border-neutral-800'
              }`}
              style={active ? { borderColor: primaryColor } : undefined}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black">{rule.title}</span>
                {active && <Check size={14} style={{ color: primaryColor }} />}
              </div>
              <p className="text-[11px] opacity-70">{rule.desc}</p>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onNavigate('CheckoutPaymentGateway')}
        className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
        style={{ backgroundColor: primaryColor }}
      >
        Save Substitution Rule &amp; Checkout →
      </button>
    </div>
  );
};
