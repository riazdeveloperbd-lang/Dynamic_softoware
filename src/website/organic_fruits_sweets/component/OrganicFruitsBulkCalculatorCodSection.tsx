import React, { useState, useEffect, useMemo } from 'react';
import {
  Calculator,
  Award,
  Truck,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  Phone,
  MapPin,
  User,
  Building2,
  Gift,
  Sparkles,
  FileCheck2,
  Code2,
} from 'lucide-react';
import {
  EditableText,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface OrganicFruitsBulkCalculatorCodSectionProps {
  title: string;
  subtitle: string;
  variant: DoctorVariantId;
  primaryColor: string;
  isDark?: boolean;
}

interface BulkPackagePreset {
  id: string;
  titleBangla: string;
  titleEnglish: string;
  unitPricePerKg: number;
  minKg: number;
  maxKg: number;
  stepKg: number;
}

const BULK_PRODUCTS: BulkPackagePreset[] = [
  {
    id: 'himsagar_bulk',
    titleBangla: 'চাঁপাইনবাবগঞ্জের হিমসাগর আম (GI Tagged Himsagar)',
    titleEnglish: 'Chapainawabganj Himsagar Mango',
    unitPricePerKg: 145,
    minKg: 10,
    maxKg: 200,
    stepKg: 5,
  },
  {
    id: 'amrapali_langra_bulk',
    titleBangla: 'রাজশাহীর ল্যাংড়া ও আম্রপালি কম্বো ক্যারেট (Mango Combo)',
    titleEnglish: 'Rajshahi Langra & Amrapali Combo',
    unitPricePerKg: 138,
    minKg: 10,
    maxKg: 200,
    stepKg: 5,
  },
  {
    id: 'dinajpur_litchi_bulk',
    titleBangla: 'দিনাজপুরের বেদানা লিচু গিফট প্যাক (Bedana Litchi)',
    titleEnglish: 'Dinajpur Bedana Litchi Box',
    unitPricePerKg: 480,
    minKg: 5,
    maxKg: 100,
    stepKg: 5,
  },
  {
    id: 'patali_sweets_bulk',
    titleBangla: 'যশোরের খেজুরের গুড় ও পাবনার ছানার মিষ্টি (Gur & Sweets)',
    titleEnglish: 'Jashore Date Molasses & Cow Milk Sweets',
    unitPricePerKg: 560,
    minKg: 3,
    maxKg: 80,
    stepKg: 1,
  },
];

export const OrganicFruitsBulkCalculatorCodSection: React.FC<
  OrganicFruitsBulkCalculatorCodSectionProps
> = ({ title, subtitle, variant }) => {
  // Bulk Calculator State
  const [selectedPreset, setSelectedPreset] = useState<BulkPackagePreset>(
    BULK_PRODUCTS[0]
  );
  const [weightKg, setWeightKg] = useState<number>(25);
  const [orderPurpose, setOrderPurpose] = useState<'family' | 'corporate'>('family');
  const [includeGreetingCard, setIncludeGreetingCard] = useState<boolean>(true);

  // Express COD Form State
  const [customerName, setCustomerName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [bdPhone, setBdPhone] = useState<string>('');
  const [deliveryZone, setDeliveryZone] = useState<'dhaka_city' | 'dhaka_suburb' | 'outside_dhaka'>(
    'dhaka_city'
  );
  const [fullAddress, setFullAddress] = useState<string>('');
  const [preferredBatch, setPreferredBatch] = useState<string>(
    'রবিবার ভোরের হার্ভেস্ট ব্যাচ (Sunday Dispatch)'
  );
  const [orderSubmitted, setOrderSubmitted] = useState<boolean>(false);
  const [showCourierJson, setShowCourierJson] = useState<boolean>(false);

  // Listen for custom product selections from Hero or Catalog cards
  useEffect(() => {
    const handleProductSelect = (e: Event) => {
      const customEvent = e as CustomEvent<{
        productName: string;
        kgQty: number;
        unitPrice: number;
      }>;
      if (customEvent.detail) {
        const matched = BULK_PRODUCTS.find((p) =>
          customEvent.detail.productName.includes(p.titleBangla.slice(0, 8))
        );
        if (matched) {
          setSelectedPreset(matched);
        }
        setWeightKg(customEvent.detail.kgQty || 20);
      }
    };
    window.addEventListener('organic:select-product', handleProductSelect);
    return () =>
      window.removeEventListener('organic:select-product', handleProductSelect);
  }, []);

  // Calculate Tiered Discount & Free Dhaka Delivery Logic
  const pricingSummary = useMemo(() => {
    const baseAmount = weightKg * selectedPreset.unitPricePerKg;
    // Tiered discount: 20kg-39kg = 7% off, 40kg-79kg = 12% off, 80kg+ = 16% off
    let discountPercent = 0;
    if (weightKg >= 80) {
      discountPercent = 16;
    } else if (weightKg >= 40) {
      discountPercent = 12;
    } else if (weightKg >= 20) {
      discountPercent = 8;
    }

    const discountTaka = Math.round((baseAmount * discountPercent) / 100);
    const isFreeDeliveryUnlocked = weightKg >= 20;

    const standardDeliveryFee =
      deliveryZone === 'dhaka_city'
        ? 90
        : deliveryZone === 'dhaka_suburb'
        ? 140
        : 180;

    const finalDeliveryFee = isFreeDeliveryUnlocked ? 0 : standardDeliveryFee;
    const netPayable = baseAmount - discountTaka + finalDeliveryFee;

    return {
      baseAmount,
      discountPercent,
      discountTaka,
      isFreeDeliveryUnlocked,
      standardDeliveryFee,
      finalDeliveryFee,
      netPayable,
      cratesCount: Math.max(1, Math.ceil(weightKg / 12)),
    };
  }, [weightKg, selectedPreset, deliveryZone]);

  // Validate 11-Digit BD Phone Number
  const cleanedPhone = bdPhone.replace(/[\s-]/g, '');
  const isPhoneValid = /^01[3-9]\d{8}$/.test(cleanedPhone);

  const handleConfirmCodOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !isPhoneValid || !fullAddress.trim()) return;
    setOrderSubmitted(true);
  };

  const courierPayload = {
    merchant_code: 'ORCHARD-PURE-BD-2026',
    courier_partner: deliveryZone === 'dhaka_city' ? 'Pathao Cold-Van Express' : 'Steadfast Priority Crate',
    harvest_batch: preferredBatch,
    recipient: {
      name: customerName || 'Tariqul Islam',
      organization: orderPurpose === 'corporate' ? companyName || 'Corporate Gifting Desk' : 'Family Residence',
      phone: cleanedPhone || '01711000000',
      zone: deliveryZone,
      address: fullAddress || 'House 14, Road 7, Gulshan-2, Dhaka',
    },
    order_items: {
      item_title: selectedPreset.titleBangla,
      net_weight_kg: weightKg,
      ventilated_crates: pricingSummary.cratesCount,
      complimentary_buffer_weight_kg: +(weightKg * 0.04).toFixed(1),
      corporate_branding_card: orderPurpose === 'corporate' && includeGreetingCard,
    },
    financials_bdt: {
      gross_orchard_value: pricingSummary.baseAmount,
      bulk_savings_bdt: pricingSummary.discountTaka,
      delivery_charge_bdt: pricingSummary.finalDeliveryFee,
      cod_collectable_bdt: pricingSummary.netPayable,
      payment_mode: 'Open-Box Cash on Delivery (bKash/Nagad/Cash at Doorstep)',
    },
  };

  const isDarkVariant = variant === 'varient_3';

  return (
    <section
      id="organic-bulk-calculator"
      className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t"
      style={{
        backgroundColor: isDarkVariant ? '#0F2419' : '#FCF9F2',
        borderColor: isDarkVariant ? '#1E3F2E' : '#E6DFD3',
        color: isDarkVariant ? '#FAF6EE' : '#1F2937',
        fontFamily: "'Plus Jakarta Sans', 'Hind Siliguri', sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D97706]/15 text-[#9A3412] dark:text-[#FDE047] text-xs font-extrabold">
            <Calculator size={14} />
            <span>
              Interactive Bulk &amp; Corporate Gifting Calculator (২০ কেজি+ অর্ডারে ফ্রি ডেলিভারি ও বিশেষ ছাড়)
            </span>
          </div>

          <h2
            className="text-2xl sm:text-4xl font-black tracking-tight"
            style={{ fontFamily: "'Playfair Display', 'Hind Siliguri', serif" }}
          >
            <EditableText
              id="organic_bulk_calc_headline"
              defaultText={
                title ||
                'ফ্যামিলি ও কর্পোরেট বাল্ক অর্ডার ক্যালকুলেটর এবং ১-ক্লিক ক্যাশ অন ডেলিভারি'
              }
              as="span"
            />
          </h2>

          <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
            <EditableText
              id="organic_bulk_calc_subheadline"
              defaultText={
                subtitle ||
                '২০ কেজি বা তার বেশি অর্ডার করলেই পাচ্ছেন ৮%–১৬% পর্যন্ত বাগান ছাড় এবং ঢাকা শহরে সম্পূর্ণ ফ্রি হোম ডেলিভারি। কর্পোরেট ক্লায়েন্ট ও অফিসের জন্য কাস্টম লোগো গিফট বক্স সুবিধা।'
              }
              as="span"
            />
          </p>
        </div>

        {/* =============================================================== */}
        {/* SPLIT GRID: LEFT = 20KG+ BULK CALCULATOR | RIGHT = COD FORM     */}
        {/* =============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 6 COLS: INTERACTIVE BULK & CORPORATE GIFTING CALCULATOR */}
          <div
            className="lg:col-span-6 rounded-3xl border-2 p-5 sm:p-7 shadow-xl space-y-6"
            style={{
              backgroundColor: isDarkVariant ? '#153123' : '#FFFFFF',
              borderColor: '#14532D',
            }}
          >
            {/* Family vs Corporate Mode Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-[#F4EFE6] dark:bg-black/30">
              <button
                type="button"
                onClick={() => setOrderPurpose('family')}
                className={`py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition cursor-pointer ${
                  orderPurpose === 'family'
                    ? 'bg-[#14532D] text-white shadow-xs'
                    : 'text-neutral-700 hover:bg-black/5'
                }`}
              >
                <ShoppingBag size={14} />
                <span>যৌথ পরিবার / ফ্যামিলি প্যাক</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setOrderPurpose('corporate');
                  if (weightKg < 40) setWeightKg(40);
                }}
                className={`py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition cursor-pointer ${
                  orderPurpose === 'corporate'
                    ? 'bg-[#D97706] text-white shadow-xs'
                    : 'text-neutral-700 hover:bg-black/5'
                }`}
              >
                <Building2 size={14} />
                <span>কর্পোরেট গিফটিং (VIP Box)</span>
              </button>
            </div>

            {/* Step 1: Select Orchard Product */}
            <div className="space-y-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider opacity-75">
                ১. বাগান ও পণ্য নির্বাচন করুন (Select Seasonal Item)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {BULK_PRODUCTS.map((prod) => {
                  const active = prod.id === selectedPreset.id;
                  return (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => setSelectedPreset(prod)}
                      className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                        active
                          ? 'border-[#14532D] bg-[#14532D]/10 dark:bg-emerald-900/50'
                          : 'border-[#E6DFD3] bg-[#FCF9F2] dark:bg-black/20 hover:border-[#D97706]'
                      }`}
                    >
                      <div className="text-xs font-extrabold leading-snug">
                        {prod.titleBangla}
                      </div>
                      <div className="text-[11px] font-bold text-[#D97706] mt-1">
                        ৳{prod.unitPricePerKg}/কেজি
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Interactive Weight Slider (kg) */}
            <div className="space-y-3 p-4 rounded-2xl bg-[#FCF9F2] dark:bg-black/25 border border-[#E6DFD3]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold">
                  ২. মোট ওজন নির্বাচন করুন (Total Weight in KG):
                </span>
                <span className="px-3 py-1 rounded-xl bg-[#14532D] text-[#FDE047] font-mono text-base font-black">
                  {weightKg} কেজি ({pricingSummary.cratesCount}টি ক্যারেট)
                </span>
              </div>

              <input
                type="range"
                min={selectedPreset.minKg}
                max={selectedPreset.maxKg}
                step={selectedPreset.stepKg}
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-[#14532D] cursor-pointer h-2 rounded-lg"
              />

              {/* Quick Weight Preset Pills */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                {[12, 20, 40, 80, 120].map((kgVal) => (
                  <button
                    key={kgVal}
                    type="button"
                    onClick={() => setWeightKg(kgVal)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                      weightKg === kgVal
                        ? 'bg-[#D97706] text-white border-[#D97706]'
                        : 'bg-white text-neutral-800 border-[#E6DFD3]'
                    }`}
                  >
                    {kgVal} কেজি {kgVal >= 20 ? '★' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* 20kg+ Bulk Tier Progress & Reward Banner */}
            <div
              className="p-4 rounded-2xl border space-y-2"
              style={{
                backgroundColor: pricingSummary.isFreeDeliveryUnlocked
                  ? 'rgba(20, 83, 45, 0.08)'
                  : 'rgba(217, 119, 6, 0.1)',
                borderColor: pricingSummary.isFreeDeliveryUnlocked ? '#14532D' : '#D97706',
              }}
            >
              {pricingSummary.isFreeDeliveryUnlocked ? (
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-[#16A34A] shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <div className="font-extrabold text-[#14532D] dark:text-emerald-300">
                      অভিনন্দন! ২০ কেজি+ বাল্ক ডিসকাউন্ট ({pricingSummary.discountPercent}% ছাড়) এবং ফ্রি ডেলিভারি আনলক হয়েছে!
                    </div>
                    <div className="opacity-80">
                      আপনার মোট সাশ্রয় হচ্ছে{' '}
                      <strong className="text-[#D97706]">
                        ৳
                        {(
                          pricingSummary.discountTaka + pricingSummary.standardDeliveryFee
                        ).toLocaleString()}
                      </strong>{' '}
                      (ডেলিভারি চার্জ ৳০ + বাগান ছাড় ৳{pricingSummary.discountTaka.toLocaleString()})
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2.5">
                  <Sparkles size={18} className="text-[#D97706] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    আর মাত্র <strong>{20 - weightKg} কেজি</strong> যোগ করলেই পাবেন{' '}
                    <strong>৮% বাল্ক ছাড় + সম্পূর্ণ ফ্রি হোম ডেলিভারি!</strong>
                  </div>
                </div>
              )}
            </div>

            {/* Corporate Gifting Perks Option */}
            {orderPurpose === 'corporate' && (
              <div className="p-4 rounded-2xl bg-[#14532D] text-white space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[#FDE047]">
                    <Gift size={15} />
                    <span>কর্পোরেট গিফট বক্স সুবিধা (Complimentary VIP Perks)</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeGreetingCard}
                    onChange={(e) => setIncludeGreetingCard(e.target.checked)}
                    className="accent-[#FDE047] w-4 h-4 cursor-pointer"
                  />
                </div>
                <p className="text-[11px] text-emerald-100 leading-relaxed">
                  প্রতিটি বক্সে আপনার কোম্পানির লোগো সম্বলিত শুভেচ্ছা কার্ড, ভ্যাট চালান (Mushak 6.3) এবং একাধিক ঠিকানায় ডোর-টু-ডোর ডেলিভারি সুবিধা।
                </p>
              </div>
            )}

            {/* Live Breakdown Receipt */}
            <div className="p-4 rounded-2xl bg-[#F6F2E9] dark:bg-black/30 border border-[#E6DFD3] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="opacity-75">
                  বাগান মূল্য ({weightKg} কেজি × ৳{selectedPreset.unitPricePerKg}):
                </span>
                <span className="font-mono font-bold">
                  ৳{pricingSummary.baseAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-[#16A34A] font-bold">
                <span>বাল্ক ও ফ্যামিলি ছাড় ({pricingSummary.discountPercent}%):</span>
                <span className="font-mono">
                  - ৳{pricingSummary.discountTaka.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-75">ফ্রি অতিরিক্ত ওজন (৪% বাগান বোনাস):</span>
                <span className="font-mono font-bold text-[#14532D] dark:text-emerald-300">
                  +{(weightKg * 0.04).toFixed(1)} কেজি ফ্রি
                </span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-75">ডেলিভারি চার্জ (ভেন্টিলেটেড ক্যারেট):</span>
                <span className="font-mono font-bold">
                  {pricingSummary.isFreeDeliveryUnlocked ? (
                    <span className="text-[#16A34A]">ফ্রি (৳০)</span>
                  ) : (
                    `৳${pricingSummary.finalDeliveryFee}`
                  )}
                </span>
              </div>
              <div className="pt-2.5 border-t border-black/10 flex items-center justify-between text-base font-black">
                <span>সর্বমোট প্রদেয় (Cash on Delivery):</span>
                <span className="text-xl text-[#14532D] dark:text-[#FDE047] font-mono">
                  ৳{pricingSummary.netPayable.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT 6 COLS: 1-CLICK EXPRESS CASH ON DELIVERY (COD) FORM */}
          <div
            id="organic-cod-order-form"
            className="lg:col-span-6 rounded-3xl border-2 p-5 sm:p-7 shadow-xl space-y-5"
            style={{
              backgroundColor: isDarkVariant ? '#153123' : '#FFFFFF',
              borderColor: '#D97706',
            }}
          >
            <div className="flex items-center justify-between gap-2 border-b pb-4 border-[#E6DFD3]">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#D97706]">
                  অগ্রিম ১ টাকাও দিতে হবে না • 100% Risk-Free COD
                </span>
                <h3
                  className="text-xl sm:text-2xl font-black mt-0.5"
                  style={{ fontFamily: "'Playfair Display', 'Hind Siliguri', serif" }}
                >
                  হার্ভেস্ট ব্যাচে আপনার ক্যারেট বুক করুন
                </h3>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-[#14532D] text-[#FDE047] text-xs font-extrabold font-mono">
                {weightKg} KG • ৳{pricingSummary.netPayable.toLocaleString()}
              </div>
            </div>

            {orderSubmitted ? (
              <div className="p-6 rounded-2xl bg-[#14532D] text-white space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#FDE047] text-[#14532D] flex items-center justify-center shrink-0">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-[#FDE047] uppercase">
                      অর্ডার কনফার্ম হয়েছে • Batch Quota Locked
                    </div>
                    <h4 className="text-lg font-black">
                      ধন্যবাদ, {customerName}! আপনার হার্ভেস্ট ক্যারেট বুক হয়েছে।
                    </h4>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/25 border border-white/15 text-xs space-y-1.5 font-mono">
                  <div>পণ্য: {selectedPreset.titleBangla}</div>
                  <div>
                    নেট ওজন: {weightKg} কেজি (+{(weightKg * 0.04).toFixed(1)} কেজি বোনাস)
                  </div>
                  <div>ব্যাচ: {preferredBatch}</div>
                  <div className="text-[#FDE047] font-bold">
                    ডেলিভারির সময় প্রদেয়: ৳{pricingSummary.netPayable.toLocaleString()} (Open-Box COD)
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowCourierJson(!showCourierJson)}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Code2 size={14} />
                    <span>
                      {showCourierJson ? 'Hide Courier API JSON' : 'View Cold-Chain Courier JSON'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-[#D97706] text-white text-xs font-extrabold cursor-pointer"
                  >
                    নতুন অর্ডার করুন
                  </button>
                </div>

                {showCourierJson && (
                  <pre className="p-3 rounded-xl bg-black/60 text-emerald-300 text-[11px] font-mono overflow-x-auto">
                    {JSON.stringify(courierPayload, null, 2)}
                  </pre>
                )}
              </div>
            ) : (
              <form onSubmit={handleConfirmCodOrder} className="space-y-4">
                {/* Customer Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold">
                      আপনার নাম (Full Name) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50"
                      />
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="যেমন: তারিকুল ইসলাম"
                        className="w-full pl-9 pr-3.5 py-3 rounded-xl border border-[#E6DFD3] bg-[#FCF9F2] dark:bg-black/20 text-xs font-semibold focus:outline-none focus:border-[#14532D]"
                      />
                    </div>
                  </div>

                  {/* BD 11-Digit Phone */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold">
                      মোবাইল নাম্বার (১১ ডিজিট) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50"
                      />
                      <input
                        type="tel"
                        required
                        value={bdPhone}
                        onChange={(e) => setBdPhone(e.target.value)}
                        placeholder="017XXXXXXXX"
                        className="w-full pl-9 pr-3.5 py-3 rounded-xl border border-[#E6DFD3] bg-[#FCF9F2] dark:bg-black/20 text-xs font-mono font-bold focus:outline-none focus:border-[#14532D]"
                      />
                    </div>
                    {bdPhone.length > 0 && !isPhoneValid && (
                      <div className="flex items-center gap-1 text-[11px] text-amber-600 font-bold">
                        <AlertCircle size={12} />
                        <span>সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন (013-019 দিয়ে শুরু)</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Optional Company Name for Corporate Mode */}
                {orderPurpose === 'corporate' && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold">
                      প্রতিষ্ঠানের নাম (Company / Organization Name)
                    </label>
                    <div className="relative">
                      <Building2
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50"
                      />
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="যেমন: ব্র্যাক ব্যাংক / গ্রামীণফোন কর্পোরেট ডেস্ক"
                        className="w-full pl-9 pr-3.5 py-3 rounded-xl border border-[#E6DFD3] bg-[#FCF9F2] dark:bg-black/20 text-xs font-semibold focus:outline-none focus:border-[#14532D]"
                      />
                    </div>
                  </div>
                )}

                {/* Delivery Zone & Batch Picker */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold">
                      ডেলিভারি এরিয়া (Delivery Area)
                    </label>
                    <select
                      value={deliveryZone}
                      onChange={(e) =>
                        setDeliveryZone(e.target.value as typeof deliveryZone)
                      }
                      className="w-full px-3.5 py-3 rounded-xl border border-[#E6DFD3] bg-[#FCF9F2] dark:bg-black/20 text-xs font-bold focus:outline-none"
                    >
                      <option value="dhaka_city">
                        ঢাকা সিটি (গুলশান, বনানী, ধানমন্ডি, উত্তরা, মিরপুর)
                      </option>
                      <option value="dhaka_suburb">
                        ঢাকা সাব-আর্ব (সাভার, গাজীপুর, নারায়ণগঞ্জ, কেরানীগঞ্জ)
                      </option>
                      <option value="outside_dhaka">
                        ঢাকার বাইরে (চট্টগ্রাম, সিলেট ও জেলা সদর কুরিয়ার)
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold">
                      পছন্দের হার্ভেস্ট ব্যাচ (Dispatch Batch)
                    </label>
                    <select
                      value={preferredBatch}
                      onChange={(e) => setPreferredBatch(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl border border-[#E6DFD3] bg-[#FCF9F2] dark:bg-black/20 text-xs font-bold focus:outline-none"
                    >
                      <option value="রবিবার ভোরের হার্ভেস্ট ব্যাচ (Sunday Dispatch)">
                        রবিবার ভোরের ব্যাচ (সোমবার ঢাকায় ডেলিভারি)
                      </option>
                      <option value="বুধবার ভোরের হার্ভেস্ট ব্যাচ (Wednesday Dispatch)">
                        বুধবার ভোরের ব্যাচ (বৃহস্পতিবার ঢাকায় ডেলিভারি)
                      </option>
                    </select>
                  </div>
                </div>

                {/* Detailed Address */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-extrabold">
                    সম্পূর্ণ ঠিকানা (বাসা নং, রোড, এলাকা) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin
                      size={15}
                      className="absolute left-3.5 top-3.5 opacity-50"
                    />
                    <textarea
                      required
                      rows={2}
                      value={fullAddress}
                      onChange={(e) => setFullAddress(e.target.value)}
                      placeholder="বাসা/ফ্ল্যাট নং, রোড নং, ব্লক/সেক্টর, থানা, ঢাকা..."
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#E6DFD3] bg-[#FCF9F2] dark:bg-black/20 text-xs font-semibold focus:outline-none focus:border-[#14532D]"
                    />
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#14532D] hover:bg-[#166534] text-white text-sm font-extrabold shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Truck size={18} className="text-[#FDE047]" />
                  <span>
                    অর্ডার কনফার্ম করুন — ৳{pricingSummary.netPayable.toLocaleString()} (ক্যাশ অন ডেলিভারি)
                  </span>
                </button>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] opacity-75 pt-1">
                  <span className="flex items-center gap-1 font-semibold">
                    <FileCheck2 size={13} className="text-[#14532D]" />
                    <span>ফল খেয়ে ও ফরমালিন কিটে চেক করে মূল্য পরিশোধ করুন</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowCourierJson(!showCourierJson)}
                    className="underline font-bold cursor-pointer"
                  >
                    {showCourierJson ? 'Hide API Payload' : 'Preview Courier JSON'}
                  </button>
                </div>

                {showCourierJson && (
                  <pre className="p-3 rounded-xl bg-neutral-900 text-emerald-300 text-[10px] font-mono overflow-x-auto">
                    {JSON.stringify(courierPayload, null, 2)}
                  </pre>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
