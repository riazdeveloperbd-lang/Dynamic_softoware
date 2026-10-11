import React, { useState } from 'react';
import {
  Plus,
  Minus,
  Tag,
  MapPin,
  Navigation,
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ShieldCheck,
  Gift,
  Truck,
  Store,
  Sparkles,
  Share2,
} from 'lucide-react';
import {
  CustomEcommerceScreenId,
  CustomEcommerceVariantId,
  CUSTOM_ECOMMERCE_PRODUCTS,
} from '../data/customEcommerceRegistry';

interface CartCheckoutScreensProps {
  screenId: CustomEcommerceScreenId;
  variant: CustomEcommerceVariantId;
  primaryColor: string;
  isDark: boolean;
  onNavigate: (target: CustomEcommerceScreenId) => void;
  cartQuantities: Record<string, number>;
  onUpdateCartQty: (productId: string, delta: number) => void;
}

export const CustomEcommerceCartCheckoutScreens: React.FC<CartCheckoutScreensProps> = ({
  screenId,
  variant,
  primaryColor,
  isDark,
  onNavigate,
  cartQuantities,
  onUpdateCartQty,
}) => {
  const [promoCode, setPromoCode] = useState('NOVA20');
  const [promoApplied, setPromoApplied] = useState(true);
  const [selectedAddressTag, setSelectedAddressTag] = useState<'Home' | 'Office'>('Home');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'mfs' | 'card'>('mfs');
  const [selectedMfs, setSelectedMfs] = useState<'bKash' | 'Nagad' | 'Rocket'>('bKash');
  const [giftWrapAdded, setGiftWrapAdded] = useState(false);
  const [installmentMonths, setInstallmentMonths] = useState<3 | 6 | 12>(3);

  const cartItems = CUSTOM_ECOMMERCE_PRODUCTS.filter((p) => (cartQuantities[p.id] || 0) > 0);
  const activeCartList = cartItems.length > 0 ? cartItems : CUSTOM_ECOMMERCE_PRODUCTS.slice(0, 2);

  const subtotal = activeCartList.reduce(
    (sum, item) => sum + item.price * (cartQuantities[item.id] || 1),
    0
  );
  const discount = promoApplied ? Math.round(subtotal * 0.15) : 0;
  const shipping = 6;
  const total = subtotal - discount + shipping + (giftWrapAdded ? 5 : 0);

  // ============================================================================
  // 12. SHOPPING CART — 6 DISTINCT BAG ARCHITECTURES
  // ============================================================================
  if (screenId === 'ShoppingCart') {
    // V1: KEEP ORIGINAL
    if (variant === 'varient_1') {
      return (
        <div className="h-full flex flex-col justify-between p-4 select-none space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-base font-black">Shopping Cart ({activeCartList.length})</h1>
            <span className="text-[10px] font-mono opacity-60">V1</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2.5 no-scrollbar">
            {activeCartList.map((item) => {
              const qty = cartQuantities[item.id] || 1;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-2.5 flex items-center gap-3"
                >
                  <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-extrabold truncate">{item.title}</div>
                    <div className="text-xs font-black mt-1" style={{ color: primaryColor }}>
                      ${item.price * qty}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => onUpdateCartQty(item.id, -1)}
                      className="w-6 h-6 rounded-lg bg-white dark:bg-neutral-900 flex items-center justify-center"
                    >
                      <Minus size={11} />
                    </button>
                    <span className="text-xs font-black px-1">{qty}</span>
                    <button
                      type="button"
                      onClick={() => onUpdateCartQty(item.id, 1)}
                      className="w-6 h-6 rounded-lg text-white flex items-center justify-center"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Plus size={11} />
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-3 flex items-center gap-2">
              <Tag size={14} style={{ color: primaryColor }} />
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                className="flex-1 bg-transparent text-xs font-mono font-bold"
              />
              <button
                type="button"
                onClick={() => setPromoApplied((a) => !a)}
                className="px-2.5 py-1 rounded-lg text-[11px] font-extrabold text-white"
                style={{ backgroundColor: promoApplied ? '#10B981' : primaryColor }}
              >
                {promoApplied ? 'Applied -15%' : 'Apply'}
              </button>
            </div>

            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-3.5 space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold">${subtotal}.00</span>
              </div>
              <div className="flex justify-between text-sm font-black pt-1 border-t border-neutral-200 dark:border-neutral-800">
                <span>Total Payable</span>
                <span style={{ color: primaryColor }}>${total}.00</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('AddressBookLocation')}
            className="w-full py-3 rounded-xl text-xs font-extrabold text-white flex items-center justify-center gap-2 cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            <span>Proceed to Delivery Address</span>
            <ArrowRight size={14} />
          </button>
        </div>
      );
    }

    // V2: BENTO FREE-SHIPPING PROGRESS METER + MYSTERY REWARD TIER
    if (variant === 'varient_2') {
      return (
        <div className="p-4 space-y-3.5 select-none">
          <div className="p-3.5 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
            <div className="flex justify-between text-xs font-black text-emerald-600 dark:text-emerald-400">
              <span>🚚 Free Express Shipping Unlocked!</span>
              <span>100%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-emerald-500/20 overflow-hidden">
              <div className="h-full w-full bg-emerald-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {activeCartList.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-3xl border border-neutral-200 dark:border-neutral-800 space-y-2"
              >
                <img src={item.image} alt="" className="w-full h-20 object-cover rounded-2xl" />
                <div className="text-xs font-extrabold truncate">{item.title}</div>
                <div className="text-xs font-black" style={{ color: primaryColor }}>
                  ${item.price}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('AddressBookLocation')}
            className="w-full py-3 rounded-2xl text-xs font-extrabold text-white cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            Checkout Bento Bag (${total}.00) →
          </button>
        </div>
      );
    }

    // V3: BRUTALIST ITEMIZED TAX INVOICE & LEDGER
    if (variant === 'varient_3') {
      return (
        <div className="p-4 space-y-3 font-mono select-none">
          <div className="border-2 border-current p-2 bg-amber-300 text-black font-black text-xs">
            INVOICE_LEDGER // #INV-9482
          </div>
          <div className="border-2 border-current p-3 bg-white dark:bg-neutral-900 shadow-[4px_4px_0px_currentColor] space-y-2 text-xs">
            {activeCartList.map((item, i) => (
              <div key={item.id} className="flex justify-between border-b border-dashed border-current pb-1.5">
                <span>0{i + 1}. {item.title.slice(0, 18)}</span>
                <span className="font-black">${item.price}.00</span>
              </div>
            ))}
            <div className="flex justify-between text-emerald-600 font-bold">
              <span>PROMO [{promoCode}]</span>
              <span>-${discount}.00</span>
            </div>
            <div className="flex justify-between text-sm font-black pt-1">
              <span>NET_PAYABLE</span>
              <span>${total}.00</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('AddressBookLocation')}
            className="w-full py-3 border-2 border-black bg-black text-[#FDE047] font-black text-xs uppercase cursor-pointer"
          >
            [ PROCEED_TO_DISPATCH ]
          </button>
        </div>
      );
    }

    // V4: MULTI-VENDOR GROUPED STORE PACKAGES
    if (variant === 'varient_4') {
      return (
        <div className="p-4 space-y-3 select-none">
          <h1 className="text-sm font-black">Split Shipment by Official Store</h1>
          {activeCartList.map((item, idx) => (
            <div
              key={item.id}
              className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-2"
            >
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span className="flex items-center gap-1">
                  <Store size={12} style={{ color: primaryColor }} /> {item.brand} Flagship
                </span>
                <span className="text-emerald-500">Package #{idx + 1} · 45m ETA</span>
              </div>
              <div className="flex items-center gap-2.5">
                <img src={item.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-extrabold truncate">{item.title}</div>
                  <div className="text-xs font-black">${item.price}.00</div>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onNavigate('AddressBookLocation')}
            className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            Confirm Both Shipments (${total}) →
          </button>
        </div>
      );
    }

    // V5: ATELIER LUXURY GIFT WRAPPING + PERSONALIZED RIBBON NOTE
    if (variant === 'varient_5') {
      return (
        <div className="p-4 space-y-3.5 select-none">
          <div className="border-l-4 pl-3" style={{ borderColor: primaryColor }}>
            <div className="text-[10px] font-mono uppercase opacity-60">CONCIERGE BAG</div>
            <h2 className="text-base font-black">Bespoke Gift Presentation</h2>
          </div>

          <div
            onClick={() => setGiftWrapAdded((g) => !g)}
            className="p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer"
            style={{ borderColor: giftWrapAdded ? primaryColor : '#CBD5E1' }}
          >
            <div className="flex items-center gap-2.5">
              <Gift size={18} style={{ color: primaryColor }} />
              <div>
                <div className="text-xs font-black">Add Satin Box &amp; Wax Seal Card</div>
                <div className="text-[10px] opacity-65">Includes handwritten calligraphy note</div>
              </div>
            </div>
            <span className="text-xs font-black">+$5</span>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('AddressBookLocation')}
            className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            Continue to Recipient Address (${total}) →
          </button>
        </div>
      );
    }

    // V6: COMPACT 3-INSTALLMENT BNPL (BUY NOW PAY LATER) BREAKDOWN BAG
    return (
      <div className="p-4 space-y-3.5 select-none">
        <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
          <div className="text-xs font-black" style={{ color: primaryColor }}>
            ✨ Pay Only ${Math.round(total / 3)}.00 Today (0% Interest)
          </div>
          <div className="text-[10px] opacity-75">
            Split into 3 monthly payments with NovaPay Later.
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          {['Today', 'In 30 Days', 'In 60 Days'].map((step, i) => (
            <div
              key={step}
              className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800"
            >
              <div className="text-[10px] opacity-60">{step}</div>
              <div className="text-xs font-black mt-0.5">${Math.round(total / 3)}</div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onNavigate('AddressBookLocation')}
          className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
          style={{ backgroundColor: primaryColor }}
        >
          Checkout with ${Math.round(total / 3)} First Payment →
        </button>
      </div>
    );
  }

  // ============================================================================
  // 13. ADDRESS BOOK / LOCATION SELECTION — 6 DISTINCT LOCATION INTERFACES
  // ============================================================================
  if (screenId === 'AddressBookLocation') {
    // V1: KEEP ORIGINAL
    if (variant === 'varient_1') {
      return (
        <div className="p-4 space-y-3.5 select-none">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => onNavigate('ShoppingCart')}
              className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 cursor-pointer"
            >
              <ChevronLeft size={15} />
            </button>
            <span className="text-xs font-extrabold">Delivery Location (V1)</span>
            <Navigation size={15} style={{ color: primaryColor }} />
          </div>

          <div className="relative h-40 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-slate-900">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <div
                className="px-2.5 py-1 rounded-full text-[10px] font-extrabold shadow-lg mb-1"
                style={{ backgroundColor: primaryColor }}
              >
                📍 Pin Locked: Road 79, Gulshan 2
              </div>
              <MapPin size={28} className="text-rose-500 animate-bounce" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {(['Home', 'Office'] as const).map((tag) => {
              const active = selectedAddressTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedAddressTag(tag)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-extrabold cursor-pointer ${
                    active ? 'text-white border-transparent' : 'border-neutral-200 dark:border-neutral-800'
                  }`}
                  style={active ? { backgroundColor: primaryColor } : undefined}
                >
                  <div>{tag === 'Home' ? '🏠 Home Address' : '🏢 Office Tower'}</div>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('CheckoutPaymentGateway')}
            className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            Confirm Location &amp; Select Payment →
          </button>
        </div>
      );
    }

    // V2: BENTO SAVED ADDRESS CARDS + BUILDING GATE CODE VAULT
    if (variant === 'varient_2') {
      return (
        <div className="p-4 space-y-3 select-none">
          <h1 className="text-base font-black">Saved Address Book</h1>
          {[
            { tag: '🏠 Primary Residence', addr: 'House 14, Road 79, Gulshan 2', gate: 'Gate PIN #4402' },
            { tag: '🏢 Design Studio HQ', addr: 'Level 12, Banani Road 11', gate: 'Reception Drop' },
          ].map((loc, i) => (
            <div
              key={loc.tag}
              onClick={() => onNavigate('CheckoutPaymentGateway')}
              className="p-3.5 rounded-3xl border-2 space-y-1 cursor-pointer"
              style={{ borderColor: i === 0 ? primaryColor : 'rgba(148,163,184,0.3)' }}
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-black">{loc.tag}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 text-[10px] font-bold">
                  {loc.gate}
                </span>
              </div>
              <div className="text-xs opacity-75">{loc.addr}</div>
            </div>
          ))}
        </div>
      );
    }

    // V3: BRUTALIST DHAKA ZONE & THANA DISPATCH FEE TABLE
    if (variant === 'varient_3') {
      return (
        <div className="p-4 space-y-3 font-mono select-none">
          <div className="border-2 border-current p-2 bg-amber-300 text-black font-black text-xs">
            GEO_DISPATCH_ZONES // DHAKA
          </div>
          {[
            ['GULSHAN_1_2', '35 MIN', '$4 FEE'],
            ['BANANI_DOHS', '40 MIN', '$4 FEE'],
            ['DHANMONDI_27', '50 MIN', '$6 FEE'],
            ['UTTARA_SECTOR_7', '55 MIN', '$6 FEE'],
          ].map(([zone, eta, fee]) => (
            <div
              key={zone}
              onClick={() => onNavigate('CheckoutPaymentGateway')}
              className="border-2 border-current p-2.5 flex items-center justify-between text-xs font-bold cursor-pointer bg-white dark:bg-neutral-900"
            >
              <span>{zone}</span>
              <span className="text-emerald-600">{eta}</span>
              <span className="bg-black text-white px-1.5 py-0.5">{fee}</span>
            </div>
          ))}
        </div>
      );
    }

    // V4: CLICK & COLLECT SMART LOCKER / STORE PICKUP SELECTOR
    if (variant === 'varient_4') {
      return (
        <div className="p-4 space-y-3.5 select-none">
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
            ✨ Save $6 Delivery Fee with 24/7 Smart Locker Pickup
          </div>
          {[
            { hub: 'Gulshan Pink City Smart Locker', dist: '0.4 km away', status: '12 Lockers Free' },
            { hub: 'Banani 11 Flagship Lounge', dist: '1.1 km away', status: 'Instant Handover' },
          ].map((locker) => (
            <div
              key={locker.hub}
              onClick={() => onNavigate('CheckoutPaymentGateway')}
              className="p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-1 cursor-pointer"
            >
              <div className="text-xs font-black">{locker.hub}</div>
              <div className="flex justify-between text-[11px] opacity-70">
                <span>{locker.dist}</span>
                <span className="text-emerald-500 font-bold">{locker.status}</span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // V5: ATELIER SCHEDULED CONCIERGE TIME-SLOT CALENDAR
    if (variant === 'varient_5') {
      return (
        <div className="p-4 space-y-3.5 select-none">
          <div className="border-l-4 pl-3" style={{ borderColor: primaryColor }}>
            <div className="text-[10px] font-mono uppercase opacity-60">WHITE-GLOVE DISPATCH</div>
            <h2 className="text-base font-black">Select Delivery Window</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              'Today · 2PM–4PM',
              'Today · 6PM–8PM',
              'Tomorrow · 10AM',
              'Weekend Morning',
            ].map((slot, i) => (
              <button
                key={slot}
                type="button"
                onClick={() => onNavigate('CheckoutPaymentGateway')}
                className={`p-3 rounded-xl border text-xs font-bold cursor-pointer ${
                  i === 0 ? 'text-white border-transparent' : ''
                }`}
                style={i === 0 ? { backgroundColor: primaryColor } : undefined}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      );
    }

    // V6: SEND AS SURPRISE GIFT TO FRIEND BY PHONE NUMBER (NO ADDRESS NEEDED)
    return (
      <div className="p-4 space-y-3.5 select-none">
        <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1">
          <div className="text-xs font-black text-rose-500">🎁 Send Gift via SMS Link</div>
          <div className="text-[10px] opacity-75">
            Don&apos;t know their apartment number? We&apos;ll text the recipient to drop their own GPS pin!
          </div>
        </div>
        <input
          type="text"
          defaultValue="Recipient: Nadia (+880 1819-330192)"
          className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-bold bg-transparent"
        />
        <button
          type="button"
          onClick={() => onNavigate('CheckoutPaymentGateway')}
          className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
          style={{ backgroundColor: primaryColor }}
        >
          Lock Gift Link &amp; Pay →
        </button>
      </div>
    );
  }

  // ============================================================================
  // 14. CHECKOUT & PAYMENT GATEWAY — 6 DISTINCT PAYMENT TERMINALS
  // ============================================================================
  if (screenId === 'CheckoutPaymentGateway') {
    // V1: KEEP ORIGINAL
    if (variant === 'varient_1') {
      return (
        <div className="p-4 space-y-3.5 select-none">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => onNavigate('AddressBookLocation')}
              className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 cursor-pointer"
            >
              <ChevronLeft size={15} />
            </button>
            <span className="text-xs font-extrabold">Payment Gateway (V1)</span>
            <ShieldCheck size={16} className="text-emerald-500" />
          </div>

          <div className="space-y-2">
            {[
              { id: 'mfs', title: 'Mobile Financial Services (MFS)', sub: 'bKash, Nagad, Rocket', icon: Smartphone },
              { id: 'card', title: 'Credit / Debit Card', sub: 'Visa, Mastercard, AMEX', icon: CreditCard },
              { id: 'cod', title: 'Cash on Delivery (COD)', sub: 'Pay cash at doorstep', icon: Banknote },
            ].map((m) => {
              const Icon = m.icon;
              const active = paymentMethod === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id as any)}
                  className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-3 flex items-center gap-3 cursor-pointer"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: active ? primaryColor : '#64748B' }}
                  >
                    <Icon size={17} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-extrabold">{m.title}</div>
                    <div className="text-[10px] opacity-65">{m.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('OrderSuccess')}
            className="w-full py-3.5 rounded-xl text-xs font-extrabold text-white cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            Complete Order (${total}.00) →
          </button>
        </div>
      );
    }

    // V2: INTERACTIVE 3D HOLOGRAPHIC CARD VAULT + MFS TILES
    if (variant === 'varient_2') {
      return (
        <div className="p-4 space-y-3.5 select-none">
          <div
            className="p-4 rounded-3xl text-white space-y-4 shadow-xl"
            style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, #0F172A 100%)` }}
          >
            <div className="flex justify-between items-center text-xs font-bold">
              <span>NOVAPAY PLATINUM</span>
              <span>VISA</span>
            </div>
            <div className="font-mono text-base tracking-widest">4532 •••• •••• 8891</div>
            <div className="flex justify-between text-[10px] opacity-80">
              <span>ALEX MORGAN</span>
              <span>EXP 09/29</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {(['bKash', 'Nagad', 'Rocket'] as const).map((op) => (
              <button
                key={op}
                type="button"
                onClick={() => setSelectedMfs(op)}
                className="py-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-xs font-black cursor-pointer"
              >
                {op}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('OrderSuccess')}
            className="w-full py-3 rounded-2xl text-xs font-extrabold text-white cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            Authorize ${total}.00 Instantly →
          </button>
        </div>
      );
    }

    // V3: BRUTALIST ENCRYPTED WIRE & COD ESCROW TERMINAL
    if (variant === 'varient_3') {
      return (
        <div className="p-4 space-y-3 font-mono select-none">
          <div className="border-2 border-current p-2 bg-emerald-400 text-black font-black text-xs">
            TLS_1.3_PAYMENT_ESCROW // V3
          </div>
          <div className="border-2 border-current p-3 bg-white dark:bg-neutral-900 space-y-2 text-xs">
            <div>METHOD: {selectedMfs.toUpperCase()}_DIRECT</div>
            <div>ESCROW_PROTECTION: ACTIVE</div>
            <div className="text-base font-black">AMOUNT: ${total}.00</div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('OrderSuccess')}
            className="w-full py-3.5 border-2 border-black bg-amber-300 text-black font-black text-xs uppercase shadow-[4px_4px_0px_#000] cursor-pointer"
          >
            [ SIGN &amp; TRANSMIT FUNDS ]
          </button>
        </div>
      );
    }

    // V4: SPLIT WALLET CREDIT + 0% EMI INSTALLMENT PLANNER
    if (variant === 'varient_4') {
      return (
        <div className="p-4 space-y-3.5 select-none">
          <h1 className="text-sm font-black">0% EMI Installment Plan</h1>
          <div className="grid grid-cols-3 gap-2">
            {([3, 6, 12] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setInstallmentMonths(m)}
                className={`p-3 rounded-2xl border text-center cursor-pointer ${
                  installmentMonths === m ? 'text-white border-transparent' : ''
                }`}
                style={installmentMonths === m ? { backgroundColor: primaryColor } : undefined}
              >
                <div className="text-xs font-black">{m} Mos</div>
                <div className="text-[10px] opacity-80">${Math.round(total / m)}/mo</div>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onNavigate('OrderSuccess')}
            className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            Confirm {installmentMonths}-Month Plan →
          </button>
        </div>
      );
    }

    // V5: ATELIER 1-PAGE UNIFIED SUMMARY + Pay
    if (variant === 'varient_5') {
      return (
        <div className="p-4 space-y-3.5 select-none">
          <div className="border-l-4 pl-3" style={{ borderColor: primaryColor }}>
            <div className="text-[10px] font-mono uppercase opacity-60">FINAL REVIEW</div>
            <h2 className="text-base font-black">One-Sheet Order Summary</h2>
          </div>
          <div className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-1.5 text-xs">
            <div>📍 Deliver to: Apt 6B, Road 79, Gulshan 2</div>
            <div>💳 Method: bKash Verified Wallet</div>
            <div className="font-black text-sm pt-1" style={{ color: primaryColor }}>
              Total: ${total}.00
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('OrderSuccess')}
            className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            Place Order Now →
          </button>
        </div>
      );
    }

    // V6: APPLE PAY / BIOMETRIC DOUBLE-CLICK SHEET
    return (
      <div className="h-full flex flex-col justify-end p-4 bg-black/40 select-none">
        <div className="p-4 rounded-3xl bg-white dark:bg-neutral-900 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2.5">
            <span className="text-sm font-black">NovaPay Express Sheet</span>
            <span className="text-sm font-black" style={{ color: primaryColor }}>
              ${total}.00
            </span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('OrderSuccess')}
            className="w-full py-3.5 rounded-2xl bg-black dark:bg-white text-white dark:text-black text-xs font-black cursor-pointer"
          >
             Pay with FaceID Double-Click
          </button>
        </div>
      </div>
    );
  }

  // ============================================================================
  // 15. ORDER SUCCESS — 6 DISTINCT CONFIRMATION EXPERIENCES
  // ============================================================================
  // V1: KEEP ORIGINAL
  if (variant === 'varient_1') {
    return (
      <div className="h-full flex flex-col justify-between p-5 text-center select-none">
        <div className="text-[10px] font-mono uppercase opacity-60">V1 · VERIFIED RECEIPT</div>
        <div className="my-auto space-y-4">
          <div
            className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-white shadow-xl"
            style={{ backgroundColor: '#10B981' }}
          >
            <CheckCircle2 size={42} />
          </div>
          <h1 className="text-xl font-black">Order Confirmed!</h1>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="opacity-65">Order ID</span>
              <span className="font-mono font-black">#EC-94820</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-65">Estimated Arrival</span>
              <span className="font-extrabold text-emerald-500">Today, 45–60 Mins</span>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('OrderHistoryTracking')}
          className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
          style={{ backgroundColor: primaryColor }}
        >
          Track Order Live →
        </button>
      </div>
    );
  }

  // V2: BENTO DIGITAL RECEIPT + LIVE COURIER RIDER ASSIGNED CARD
  if (variant === 'varient_2') {
    return (
      <div className="p-4 space-y-3.5 select-none">
        <div className="p-4 rounded-3xl bg-emerald-500 text-white flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold">Order #EC-94820</div>
            <div className="text-base font-black">Dispatched to Hub!</div>
          </div>
          <CheckCircle2 size={28} />
        </div>
        <div className="p-3.5 rounded-3xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/15 flex items-center justify-center font-black text-xs">
              KM
            </div>
            <div>
              <div className="text-xs font-black">Rider Kamal Assigned</div>
              <div className="text-[10px] opacity-65">4.9★ · Honda CB Hornet</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('OrderHistoryTracking')}
            className="px-3 py-1.5 rounded-xl text-[10px] font-extrabold text-white"
            style={{ backgroundColor: primaryColor }}
          >
            Live Map
          </button>
        </div>
      </div>
    );
  }

  // V3: BRUTALIST THERMAL BARCODE RECEIPT TICKET
  if (variant === 'varient_3') {
    return (
      <div className="p-4 space-y-3 font-mono select-none">
        <div className="border-4 border-current p-4 bg-white dark:bg-neutral-900 shadow-[6px_6px_0px_currentColor] space-y-3">
          <div className="text-center border-b-2 border-dashed border-current pb-2">
            <div className="text-sm font-black">NOVACART RECEIPT</div>
            <div className="text-[10px]">AUTH_CODE: #EC-94820-OK</div>
          </div>
          <div className="flex justify-between text-xs font-black">
            <span>TOTAL PAID:</span>
            <span>${total}.00</span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('OrderHistoryTracking')}
            className="w-full py-2.5 bg-black text-white text-xs font-black uppercase cursor-pointer"
          >
            [ OPEN_RADAR_TRACKER ]
          </button>
        </div>
      </div>
    );
  }

  // V4: LUXURY WAX-SEAL INVITATION & CERTIFICATE OF AUTHENTICITY
  if (variant === 'varient_4') {
    return (
      <div className="h-full flex flex-col justify-between p-5 bg-[#090D16] text-white text-center select-none">
        <span className="text-[10px] uppercase tracking-[0.3em] text-amber-300">
          CERTIFICATE OF ACQUISITION
        </span>
        <div className="my-auto p-5 rounded-3xl border border-amber-400/30 bg-white/5 space-y-3">
          <Sparkles size={28} className="text-amber-300 mx-auto" />
          <h2 className="text-lg font-serif">Thank You, Alex Morgan</h2>
          <p className="text-xs text-white/70">
            Your piece is being prepared with white-glove packaging.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('OrderHistoryTracking')}
          className="w-full py-3 rounded-xl bg-amber-400 text-slate-950 text-xs font-black uppercase cursor-pointer"
        >
          Track Private Courier
        </button>
      </div>
    );
  }

  // V5: LIVE MINI MAP + STEP 1 OF 4 PROGRESS BAR
  if (variant === 'varient_5') {
    return (
      <div className="p-4 space-y-3.5 select-none">
        <div className="text-sm font-black">Order #EC-94820 is Packing</div>
        <div className="grid grid-cols-4 gap-1.5 h-2">
          <div className="rounded-full" style={{ backgroundColor: primaryColor }} />
          <div className="rounded-full" style={{ backgroundColor: primaryColor }} />
          <div className="rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="rounded-full bg-neutral-200 dark:bg-neutral-800" />
        </div>
        <button
          type="button"
          onClick={() => onNavigate('OrderHistoryTracking')}
          className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
          style={{ backgroundColor: primaryColor }}
        >
          View Full 4-Stage Timeline →
        </button>
      </div>
    );
  }

  // V6: GAMIFIED CASHBACK SCRATCH CARD & REFER-A-FRIEND BONUS
  return (
    <div className="p-4 space-y-4 text-center select-none">
      <div className="p-4 rounded-3xl bg-amber-500/15 border-2 border-dashed border-amber-500 space-y-2">
        <div className="text-xs font-black text-amber-600 dark:text-amber-400">
          🎉 You Earned +$18.50 Store Cashback!
        </div>
        <div className="text-[11px] opacity-75">Added directly to your NovaPay Wallet.</div>
      </div>
      <button
        type="button"
        onClick={() => onNavigate('OrderHistoryTracking')}
        className="w-full py-3 rounded-xl text-xs font-extrabold text-white flex items-center justify-center gap-2 cursor-pointer"
        style={{ backgroundColor: primaryColor }}
      >
        <Share2 size={14} />
        <span>Share &amp; Track Order #EC-94820</span>
      </button>
    </div>
  );
};
