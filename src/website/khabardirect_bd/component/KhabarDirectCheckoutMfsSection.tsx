import React, { useState, useEffect } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  CreditCard,
  QrCode,
  CheckCircle2,
  ShieldCheck,
  Truck,
  ChefHat,
  PackageCheck,
  MessageSquare,
  Sparkles,
  CalendarClock,
  Banknote,
  ArrowRight,
  X,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface KhabarDirectCheckoutMfsSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

type PaymentMethodId = 'cod' | 'bkash' | 'nagad' | 'rocket';
type DeliveryTimingMode = 'instant' | 'scheduled';

interface CheckoutLineItem {
  name: string;
  qty: number;
  unitPrice: number;
  selectedVariant: string;
}

const SCHEDULE_TIME_SLOTS = [
  'Today · 1:30 PM – 2:00 PM (Lunch Slot)',
  'Today · 5:30 PM – 6:00 PM (Evening Tea Slot)',
  'Today · 8:00 PM – 8:30 PM (Prime Dinner Slot)',
  'Today · 9:30 PM – 10:00 PM (Late Dinner Slot)',
];

const TRACKING_STAGES = [
  {
    step: 0,
    label: 'Order Placed',
    bnLabel: 'অর্ডার কনফার্মড',
    time: 'Just now',
    detail: 'Order #KD-49281 received directly at Cloud Kitchen POS terminal.',
    icon: CheckCircle2,
  },
  {
    step: 1,
    label: 'Kitchen Preparing',
    bnLabel: 'কিচেনে তৈরি হচ্ছে',
    time: '+6 mins',
    detail: 'Chef is chargrilling your patty & packing in a 72°C foil thermal box.',
    icon: ChefHat,
  },
  {
    step: 2,
    label: 'Out for Delivery',
    bnLabel: 'রাইডার পথে আছেন',
    time: '+22 mins',
    detail: 'Rider Mahmudul Hasan (+880 1719-442109) dispatched with Thermal Bag #14.',
    icon: Truck,
  },
  {
    step: 3,
    label: 'Delivered Hot',
    bnLabel: 'ডেলিভারি সম্পন্ন',
    time: '+36 mins',
    detail: 'Handed over at your doorstep with tamper-proof hygiene seal intact.',
    icon: PackageCheck,
  },
];

export const KhabarDirectCheckoutMfsSection: React.FC<
  KhabarDirectCheckoutMfsSectionProps
> = ({ title, subtitle, primaryColor }) => {
  // Customer Form State
  const [mobileNumber, setMobileNumber] = useState<string>('01712-849302');
  const [isOtpSent, setIsOtpSent] = useState<boolean>(true);
  const [otpVerified, setOtpVerified] = useState<boolean>(true);
  const [customerName, setCustomerName] = useState<string>('Tariqul Islam');
  const [selectedArea, setSelectedArea] = useState<string>('Banani (Road 1–27)');
  const [roadHouseAddress, setRoadHouseAddress] = useState<string>(
    'House 42, Road 11, Block F, Banani'
  );
  const [floorFlatNumber, setFloorFlatNumber] = useState<string>('Floor 5, Apt 5B');
  const [riderLandmark, setRiderLandmark] = useState<string>(
    'Opposite Banani central mosque gate, ring bell at guard desk'
  );

  // Timing & Payment State
  const [timingMode, setTimingMode] = useState<DeliveryTimingMode>('instant');
  const [scheduledSlot, setScheduledSlot] = useState<string>(SCHEDULE_TIME_SLOTS[2]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>('cod');
  const [codChangeNote, setCodChangeNote] = useState<string>('I will pay with ৳1,000 note');

  // MFS Modal & Order Tracking State
  const [isMfsModalOpen, setIsMfsModalOpen] = useState<boolean>(false);
  const [mfsWalletNumber, setMfsWalletNumber] = useState<string>('01712849302');
  const [mfsTrxId, setMfsTrxId] = useState<string>('BKS948271KD');
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [activeTrackingStage, setActiveTrackingStage] = useState<number>(1);
  const [whatsappAlertSent, setWhatsappAlertSent] = useState<boolean>(false);

  // Synced Cart Summary State
  const [subtotal, setSubtotal] = useState<number>(910);
  const [deliveryFee, setDeliveryFee] = useState<number>(60);
  const [freeDeliveryMin, setFreeDeliveryMin] = useState<number>(1500);
  const [lineItems, setLineItems] = useState<CheckoutLineItem[]>([
    {
      name: 'Smokey BBQ Beef Brisket Burger',
      qty: 1,
      unitPrice: 550,
      selectedVariant: 'Double Patty (320g) + Extra Cheddar',
    },
    {
      name: 'San Sebastian Burnt Basque Cheesecake',
      qty: 1,
      unitPrice: 360,
      selectedVariant: 'Warm Belgian Dark Chocolate Ganache',
    },
  ]);

  const crimsonPrimary = primaryColor || '#E11D48';
  const deepCharcoal = '#18181B';
  const emeraldAccent = '#10B981';

  useEffect(() => {
    const handleCartChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) {
        if (typeof detail.subtotal === 'number') {
          setSubtotal(detail.subtotal);
        }
        if (Array.isArray(detail.items) && detail.items.length > 0) {
          setLineItems(
            detail.items.map((it: any) => ({
              name: it.name,
              qty: it.qty,
              unitPrice: it.unitPrice,
              selectedVariant: it.selectedVariant,
            }))
          );
        }
      }
    };

    const handleZoneChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) {
        setSelectedArea(detail.name || 'Banani');
        setDeliveryFee(typeof detail.fee === 'number' ? detail.fee : 60);
        setFreeDeliveryMin(detail.freeDeliveryMin || 1500);
      }
    };

    window.addEventListener('khabardirect-cart-updated', handleCartChange);
    window.addEventListener('khabardirect-zone-updated', handleZoneChange);
    return () => {
      window.removeEventListener('khabardirect-cart-updated', handleCartChange);
      window.removeEventListener('khabardirect-zone-updated', handleZoneChange);
    };
  }, []);

  const effectiveDeliveryFee = subtotal >= freeDeliveryMin ? 0 : deliveryFee;
  const vatAmount = Math.round(subtotal * 0.05);
  const totalPayable = subtotal + effectiveDeliveryFee;

  const handleSendOtp = () => {
    setIsOtpSent(true);
    setOtpVerified(true);
  };

  const handlePlaceOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod !== 'cod' && !orderConfirmed) {
      setIsMfsModalOpen(true);
      return;
    }
    setOrderConfirmed(true);
    setActiveTrackingStage(1);
    setWhatsappAlertSent(true);
  };

  const handleConfirmMfsGateway = () => {
    setIsMfsModalOpen(false);
    setOrderConfirmed(true);
    setActiveTrackingStage(1);
    setWhatsappAlertSent(true);
  };

  return (
    <section
      id="khabardirect-direct-checkout"
      className="w-full py-12 sm:py-16 px-4 sm:px-6 bg-[#FAFAFA] border-b border-zinc-200"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-1.5">
          <div className="text-xs font-semibold text-rose-600">
            1-Page Frictionless Checkout · ওয়ান-পেজ ডিরেক্ট চেকআউট ও লাইভ ট্র্যাকিং
          </div>
          <EditableText
            as="h2"
            defaultValue={
              title || 'Direct Order Checkout, MFS Gateway & Live Rider Tracking'
            }
            className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900"
          />
          <EditableText
            as="p"
            defaultValue={
              subtitle ||
              'Complete your order in under 30 seconds with +880 OTP auto-fill, exact-change Cash on Delivery, or instant bKash/Nagad merchant QR.'
            }
            className="text-sm text-zinc-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 7 COLUMNS: 1-PAGE CUSTOMER INFO, TIMING & PAYMENT OPTIONS */}
          <form
            onSubmit={handlePlaceOrderSubmit}
            className="lg:col-span-7 rounded-2xl bg-white border border-zinc-200 p-5 sm:p-7 space-y-6 shadow-xs"
          >
            {/* 1. MOBILE NUMBER FIRST (+880 VALIDATION & QUICK OTP AUTO-FILL) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-900">
                  01. Customer Mobile &amp; Instant OTP Verification
                </h3>
                {otpVerified && (
                  <span className="text-xs font-semibold text-emerald-700 inline-flex items-center gap-1">
                    <CheckCircle2 size={13} />
                    <span>+880 Number Verified</span>
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-8 flex items-center rounded-xl border border-zinc-300 bg-zinc-50 focus-within:bg-white focus-within:border-zinc-900 overflow-hidden">
                  <span className="px-3 py-2.5 bg-zinc-200/70 text-xs font-mono font-semibold text-zinc-800 border-r border-zinc-300">
                    +880
                  </span>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                      setOtpVerified(false);
                    }}
                    placeholder="017XX-XXXXXX"
                    className="w-full px-3 py-2.5 text-xs sm:text-sm font-mono font-semibold text-zinc-900 bg-transparent focus:outline-none"
                    required
                  />
                </div>
                <div className="sm:col-span-4">
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="w-full h-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition cursor-pointer"
                  >
                    {otpVerified ? 'OTP Auto-Filled ✓' : 'Quick OTP Verify'}
                  </button>
                </div>
              </div>
              {isOtpSent && (
                <p className="text-[11px] text-zinc-500">
                  SMS &amp; WhatsApp live kitchen tracking link will be sent automatically to{' '}
                  <strong className="text-zinc-800">+880 {mobileNumber}</strong>.
                </p>
              )}
            </div>

            {/* 2. DELIVERY ADDRESS (BUILDING/ROAD/HOUSE + FLOOR/FLAT NUMBER) */}
            <div className="pt-4 border-t border-zinc-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-900">
                  02. Doorstep Delivery Details
                </h3>
                <span className="text-xs text-zinc-500">
                  Zone: <strong className="text-zinc-900">{selectedArea.split(' (')[0]}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:bg-white focus:border-zinc-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Floor / Flat / Apartment No.
                  </label>
                  <input
                    type="text"
                    value={floorFlatNumber}
                    onChange={(e) => setFloorFlatNumber(e.target.value)}
                    placeholder="e.g., Floor 5, Flat 5B"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:bg-white focus:border-zinc-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Building, House &amp; Road Details
                </label>
                <input
                  type="text"
                  value={roadHouseAddress}
                  onChange={(e) => setRoadHouseAddress(e.target.value)}
                  placeholder="House #, Road #, Block/Sector, Area"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:bg-white focus:border-zinc-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">
                  Rider Landmark / Gate Note (Optional)
                </label>
                <input
                  type="text"
                  value={riderLandmark}
                  onChange={(e) => setRiderLandmark(e.target.value)}
                  placeholder="e.g., Near Banani Mosque Gate, call upon arrival"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-700 focus:outline-none focus:bg-white focus:border-zinc-900"
                />
              </div>
            </div>

            {/* 3. DELIVERY TIMING: INSTANT vs SCHEDULE FOR LATER TODAY */}
            <div className="pt-4 border-t border-zinc-200/80 space-y-3">
              <h3 className="text-sm font-bold text-zinc-900">
                03. Delivery Timing Preference
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTimingMode('instant')}
                  className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex items-start justify-between ${
                    timingMode === 'instant'
                      ? 'bg-rose-50/70 border-rose-300 text-zinc-900'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100/70'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <Clock size={14} style={{ color: crimsonPrimary }} />
                      <span>Instant Thermal Dispatch</span>
                    </div>
                    <p className="text-[11px] text-zinc-500">
                      Prepared immediately · Arrives in 30–40 mins
                    </p>
                  </div>
                  {timingMode === 'instant' && (
                    <CheckCircle2 size={15} style={{ color: crimsonPrimary }} />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setTimingMode('scheduled')}
                  className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex items-start justify-between ${
                    timingMode === 'scheduled'
                      ? 'bg-rose-50/70 border-rose-300 text-zinc-900'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100/70'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <CalendarClock size={14} style={{ color: crimsonPrimary }} />
                      <span>Schedule Order for Later Today</span>
                    </div>
                    <p className="text-[11px] text-zinc-500">
                      Pre-book lunch, evening snack, or dinner slot
                    </p>
                  </div>
                  {timingMode === 'scheduled' && (
                    <CheckCircle2 size={15} style={{ color: crimsonPrimary }} />
                  )}
                </button>
              </div>

              {timingMode === 'scheduled' && (
                <div className="pt-1">
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Select Today&apos;s Delivery Window
                  </label>
                  <select
                    value={scheduledSlot}
                    onChange={(e) => setScheduledSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-xs sm:text-sm font-medium text-zinc-900 focus:outline-none"
                  >
                    {SCHEDULE_TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* 4. PAYMENT OPTIONS (COD WITH EXACT CHANGE NOTE OR DIRECT MFS GATEWAY) */}
            <div className="pt-4 border-t border-zinc-200/80 space-y-3">
              <h3 className="text-sm font-bold text-zinc-900">
                04. Payment Method (COD or Instant MFS Gateway)
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  {
                    id: 'cod' as PaymentMethodId,
                    label: 'Cash on Delivery',
                    sub: 'Pay at Doorstep',
                    accent: '#18181B',
                  },
                  {
                    id: 'bkash' as PaymentMethodId,
                    label: 'bKash Direct',
                    sub: 'Instant QR / PIN',
                    accent: '#E2136E',
                  },
                  {
                    id: 'nagad' as PaymentMethodId,
                    label: 'Nagad Pay',
                    sub: 'Zero Charge',
                    accent: '#F37021',
                  },
                  {
                    id: 'rocket' as PaymentMethodId,
                    label: 'Rocket MFS',
                    sub: 'DBBL Nexus',
                    accent: '#8C3494',
                  },
                ].map((pm) => {
                  const active = paymentMethod === pm.id;
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id)}
                      className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                        active
                          ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs'
                          : 'bg-zinc-50 text-zinc-800 border-zinc-200 hover:bg-zinc-100'
                      }`}
                    >
                      <div className="text-xs font-bold">{pm.label}</div>
                      <div
                        className={`text-[11px] mt-0.5 ${
                          active ? 'text-zinc-300' : 'text-zinc-500'
                        }`}
                      >
                        {pm.sub}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Exact Change Selector when COD is active */}
              {paymentMethod === 'cod' ? (
                <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                  <div className="text-xs font-semibold text-zinc-800 flex items-center gap-1.5">
                    <Banknote size={14} className="text-emerald-600" />
                    <span>Need Rider to Bring Change? (ভাঙতি টাকার নোট নির্বাচন করুন)</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'I have exact cash ready',
                      'I will pay with ৳500 note',
                      'I will pay with ৳1,000 note',
                      'I will pay with ৳2,000 (2x ৳1,000 notes)',
                    ].map((noteOpt) => {
                      const active = codChangeNote === noteOpt;
                      return (
                        <label
                          key={noteOpt}
                          onClick={() => setCodChangeNote(noteOpt)}
                          className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition flex items-center gap-1.5 ${
                            active
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                              : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                          }`}
                        >
                          <input
                            type="radio"
                            name="cod-change-note"
                            checked={active}
                            onChange={() => setCodChangeNote(noteOpt)}
                            className="accent-emerald-600"
                          />
                          <span>{noteOpt}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-zinc-900 uppercase">
                      {paymentMethod} Automated Merchant Gateway Ready
                    </div>
                    <p className="text-[11px] text-zinc-600">
                      Clicking confirm opens the dynamic QR code &amp; instant TrxID verification modal.
                    </p>
                  </div>
                  <QrCode size={22} style={{ color: crimsonPrimary }} className="shrink-0" />
                </div>
              )}
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl text-white text-sm font-bold flex items-center justify-between shadow-lg hover:opacity-95 transition cursor-pointer tabular-nums"
              style={{ backgroundColor: crimsonPrimary }}
            >
              <span>
                {orderConfirmed
                  ? 'Order Confirmed! Update / Place Another Order'
                  : paymentMethod === 'cod'
                  ? 'Confirm Direct COD Order'
                  : `Pay ৳${totalPayable.toLocaleString()} via ${paymentMethod.toUpperCase()} & Confirm`}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span>৳{totalPayable.toLocaleString()}</span>
                <ArrowRight size={16} />
              </span>
            </button>
          </form>

          {/* RIGHT 5 COLUMNS: LIVE ORDER TRACKING PREVIEW & ITEMIZED RECEIPT */}
          <div id="khabardirect-live-tracker" className="lg:col-span-5 space-y-6">
            {/* Live Order Tracking Card */}
            <div
              className="rounded-2xl p-5 sm:p-6 text-white space-y-5 shadow-xl border border-zinc-800"
              style={{ backgroundColor: deepCharcoal }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold text-emerald-400">
                    {orderConfirmed
                      ? 'Live Order Confirmed · #KD-49281'
                      : 'Live Kitchen & Rider Tracker Preview'}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                    { TRACKING_STAGES[activeTrackingStage]?.label } —{' '}
                    { TRACKING_STAGES[activeTrackingStage]?.bnLabel }
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {timingMode === 'instant'
                      ? 'Estimated Doorstep Arrival: 30–40 mins'
                      : `Scheduled Window: ${scheduledSlot}`}
                  </p>
                </div>

                <span className="text-xs font-mono tabular-nums text-emerald-400 font-semibold">
                  72°C Thermal Box
                </span>
              </div>

              {/* Interactive 4-Stage Visual Progress Bar */}
              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-2">
                  {TRACKING_STAGES.map((st, idx) => {
                    const isCompleted = idx <= activeTrackingStage;
                    const isCurrent = idx === activeTrackingStage;
                    return (
                      <button
                        key={st.label}
                        type="button"
                        onClick={() => setActiveTrackingStage(idx)}
                        className="text-left space-y-1.5 cursor-pointer group"
                      >
                        <div
                          className={`h-2 w-full rounded-full transition-all ${
                            isCompleted ? 'bg-emerald-500' : 'bg-zinc-800 group-hover:bg-zinc-700'
                          }`}
                        />
                        <div
                          className={`text-[11px] font-semibold leading-tight ${
                            isCurrent
                              ? 'text-white'
                              : isCompleted
                              ? 'text-emerald-400'
                              : 'text-zinc-500'
                          }`}
                        >
                          {idx + 1}. {st.label}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Current Stage Detail Box */}
                <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">
                      {TRACKING_STAGES[activeTrackingStage].label}
                    </span>
                    <span className="text-zinc-400 font-mono text-[11px]">
                      {TRACKING_STAGES[activeTrackingStage].time}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {TRACKING_STAGES[activeTrackingStage].detail}
                  </p>
                </div>
              </div>

              {/* Direct WhatsApp Tracking Link Action */}
              <div className="pt-2 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs text-zinc-400">
                  Sent to: <strong className="text-white">+880 {mobileNumber}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => setWhatsappAlertSent(true)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer"
                >
                  <MessageSquare size={13} />
                  <span>
                    {whatsappAlertSent
                      ? 'WhatsApp Tracking Active ✓'
                      : 'Send WhatsApp Live Map Link'}
                  </span>
                </button>
              </div>
            </div>

            {/* Order Summary Breakdown with Tax & Delivery Fee Line Items */}
            <div className="rounded-2xl bg-white border border-zinc-200 p-5 sm:p-6 space-y-4 tabular-nums">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <h4 className="text-sm font-bold text-zinc-900">
                  Direct Order Summary Breakdown
                </h4>
                <span className="text-xs font-medium text-emerald-700">
                  0% Commission Rate
                </span>
              </div>

              <div className="space-y-2.5">
                {lineItems.map((item, idx) => (
                  <div
                    key={`${item.name}-${idx}`}
                    className="flex items-start justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-semibold text-zinc-900">
                        {item.qty}x {item.name}
                      </div>
                      <div className="text-[11px] text-zinc-500">
                        {item.selectedVariant}
                      </div>
                    </div>
                    <span className="font-semibold text-zinc-900 shrink-0">
                      ৳{(item.unitPrice * item.qty).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-zinc-200 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-zinc-900">
                    ৳{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Govt. VAT (5% Included in Menu Price)</span>
                  <span className="text-zinc-500">৳{vatAmount} (Included)</span>
                </div>
                <div className="flex items-center justify-between text-zinc-600">
                  <span>Rider Delivery Fee ({selectedArea.split(' (')[0]})</span>
                  <span className="font-semibold text-zinc-900">
                    {effectiveDeliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE (৳0)</span>
                    ) : (
                      `৳${effectiveDeliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between text-emerald-700 font-medium">
                  <span>Aggregator App Service &amp; Packaging Markup</span>
                  <span>৳0</span>
                </div>

                <div className="pt-2.5 border-t border-zinc-200 flex items-center justify-between text-sm font-bold text-zinc-900">
                  <span>Total Net Payable ({paymentMethod.toUpperCase()})</span>
                  <span className="text-base">৳{totalPayable.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* AUTOMATED MFS QR / MERCHANT CHECKOUT MODAL (bKash / Nagad / Rocket)       */}
      {/* ========================================================================= */}
      {isMfsModalOpen && (
        <div
          onClick={() => setIsMfsModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-md w-full border border-zinc-200 shadow-2xl overflow-hidden"
          >
            <div
              className="p-5 text-white flex items-center justify-between"
              style={{
                backgroundColor:
                  paymentMethod === 'bkash'
                    ? '#E2136E'
                    : paymentMethod === 'nagad'
                    ? '#F37021'
                    : '#8C3494',
              }}
            >
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider opacity-90">
                  Instant BD MFS Merchant Gateway
                </div>
                <h3 className="text-base font-bold mt-0.5">
                  {paymentMethod.toUpperCase()} Direct Payment — ৳{totalPayable.toLocaleString()}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMfsModalOpen(false)}
                className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Dynamic Merchant QR Code Simulation */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl bg-zinc-900 text-white flex flex-col items-center justify-center shrink-0">
                  <QrCode size={42} />
                  <span className="text-[9px] font-mono mt-1">SCAN QR</span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-zinc-900">
                    Merchant: KhabarDirect BD Kitchens
                  </div>
                  <div className="text-zinc-600 font-mono">
                    Merchant Account: 01711-984320
                  </div>
                  <div className="text-emerald-700 font-semibold">
                    Zero Cashout Fee · Instant Kitchen POS Sync
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Your {paymentMethod.toUpperCase()} Account Number
                  </label>
                  <input
                    type="tel"
                    value={mfsWalletNumber}
                    onChange={(e) => setMfsWalletNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-xs font-mono font-semibold text-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">
                    Transaction ID (Auto-detected via Webhook or Enter Manually)
                  </label>
                  <input
                    type="text"
                    value={mfsTrxId}
                    onChange={(e) => setMfsTrxId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-xs font-mono font-semibold text-zinc-900"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleConfirmMfsGateway}
                className="w-full py-3.5 px-5 rounded-xl text-white text-xs sm:text-sm font-bold shadow-md hover:opacity-95 transition cursor-pointer"
                style={{
                  backgroundColor:
                    paymentMethod === 'bkash'
                      ? '#E2136E'
                      : paymentMethod === 'nagad'
                      ? '#F37021'
                      : '#8C3494',
                }}
              >
                Verify Payment &amp; Dispatch Kitchen Order (৳{totalPayable.toLocaleString()})
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
