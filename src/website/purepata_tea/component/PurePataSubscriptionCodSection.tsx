import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  RefreshCw,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Truck,
  Sparkles,
  ArrowRight,
  PackageCheck,
  Code2,
  Gift,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface PurePataSubscriptionCodSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

interface TeaSelectionOption {
  id: string;
  badge: string;
  title: string;
  bnSubtitle: string;
  contents: string[];
  freeGift: string;
  oneTimePriceBdt: number;
  cupsPerMonth: string;
  featured?: boolean;
}

const REFILL_BOX_OPTIONS: TeaSelectionOption[] = [
  {
    id: 'box_executive_trio',
    badge: '01. SIGNATURE WELLNESS TRIO BOX',
    title: 'Executive Morning-to-Night 3-Tin Tea Box',
    bnSubtitle: 'সকাল, বিকেল ও রাতের কমপ্লিট ওয়েলনেস প্যাক (৩টি ইকো-টিন)',
    contents: [
      '1x Himalayan Mist Organic Green Tea (100g Tin)',
      '1x Tulsi-Ginger Morning Wellness Blend (100g Tin)',
      '1x Blue Butterfly Pea Flower Night Relax Tea (50g Tin)',
    ],
    freeGift: 'FREE: স্টেইনলেস স্টিল মেশ টি-ইনফিউজার বল + কাঠের চামচ (৳৩৮০ মূল্যের)',
    oneTimePriceBdt: 1650,
    cupsPerMonth: '১৬৫+ কাপ সতেজ চা',
    featured: true,
  },
  {
    id: 'box_connoisseur_all5',
    badge: '02. COMPLETE 5-ESTATE TASTING CHEST',
    title: 'Master Connoisseur All-5 Blends Collection',
    bnSubtitle: 'পরিবার বা কর্পোরেট গিফটিংয়ের জন্য আমাদের সবগুলো (৫টি) সিগনেচার ব্লেন্ড',
    contents: [
      '1x Sreemangal Orthodox Black Tea FTGFOP1 (100g)',
      '1x Panchagarh Organic Whole-Leaf Green Tea (100g)',
      '1x Sun-Dried Blue Butterfly Pea Flower Tea (50g)',
      '1x Sacred Tulsi & Ginger Root Wellness Blend (100g)',
      '1x Immunity-Boosting Royal 6-Spice Masala Chai (120g)',
    ],
    freeGift: 'FREE: ডাবল-ওয়াল বোরোসিলিকেট গ্লাস টি-মাগ + স্টিল ইনফিউজার (৳৭৫০ মূল্যের)',
    oneTimePriceBdt: 2790,
    cupsPerMonth: '২৬০+ কাপ প্রিমিয়াম চা',
    featured: false,
  },
  {
    id: 'box_fitness_duo',
    badge: '03. METABOLISM & IMMUNITY DUO',
    title: 'Daily Detox Green & Tulsi-Ginger Duo Pack',
    bnSubtitle: 'ফিটনেস, ওজন নিয়ন্ত্রণ ও প্রতিদিনের ইমিউনিটির জন্য ২টি বেস্ট-সেলার টিন',
    contents: [
      '1x Himalayan Mist Organic Whole-Leaf Green Tea (100g Tin)',
      '1x Sacred Tulsi & Crushed Ginger Wellness Blend (100g Tin)',
    ],
    freeGift: 'FREE: পিতলের ফুড-গ্রেড টি-স্ট্রেইনার ছাঁকনি (৳২৫০ মূল্যের)',
    oneTimePriceBdt: 1180,
    cupsPerMonth: '১০৫+ কাপ ডিটক্স চা',
    featured: false,
  },
];

export const PurePataSubscriptionCodSection: React.FC<
  PurePataSubscriptionCodSectionProps
> = ({
  title,
  subtitle,
  primaryColor = '#1E4620',
  isDark = false,
}) => {
  const [purchaseMode, setPurchaseMode] = useState<'subscription' | 'onetime'>(
    'subscription'
  );
  const [selectedBoxId, setSelectedBoxId] = useState<string>('box_executive_trio');
  const [refillFrequency, setRefillFrequency] = useState<'30_days' | '45_days'>(
    '30_days'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [deliveryArea, setDeliveryArea] = useState<'dhaka' | 'chattogram_sylhet' | 'nationwide'>(
    'dhaka'
  );
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [fullAddress, setFullAddress] = useState<string>('');
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showDispatchJson, setShowDispatchJson] = useState<boolean>(false);

  const activeBox = useMemo(
    () =>
      REFILL_BOX_OPTIONS.find((b) => b.id === selectedBoxId) ||
      REFILL_BOX_OPTIONS[0],
    [selectedBoxId]
  );

  // Calculate 15% Subscription Discount + Free Shipping
  const unitPriceBdt =
    purchaseMode === 'subscription'
      ? Math.round(activeBox.oneTimePriceBdt * 0.85)
      : activeBox.oneTimePriceBdt;

  const baseShippingBdt =
    deliveryArea === 'dhaka'
      ? 60
      : deliveryArea === 'chattogram_sylhet'
      ? 90
      : 120;

  const finalShippingBdt =
    purchaseMode === 'subscription' || activeBox.oneTimePriceBdt >= 2500
      ? 0
      : baseShippingBdt;

  const subtotalBdt = unitPriceBdt * quantity;
  const totalSavingsBdt =
    purchaseMode === 'subscription'
      ? (activeBox.oneTimePriceBdt - unitPriceBdt) * quantity + baseShippingBdt
      : 0;
  const grandTotalBdt = subtotalBdt + finalShippingBdt;

  const cleanPhone = customerPhone.replace(/[\s-]/g, '');
  const isValidBdPhone = /^01[3-9]\d{8}$/.test(cleanPhone);

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!customerName.trim()) {
      setValidationError('অনুগ্রহ করে আপনার নাম লিখুন (Please enter your name).');
      return;
    }
    if (!isValidBdPhone) {
      setValidationError(
        'সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন (যেমন: 017XXXXXXXX বা 018XXXXXXXX).'
      );
      return;
    }
    if (!fullAddress.trim()) {
      setValidationError('ডেলিভারির জন্য আপনার সম্পূর্ণ ঠিকানা লিখুন।');
      return;
    }

    setOrderConfirmed(true);
  };

  const courierPayload = useMemo(
    () => ({
      brand: 'PUREPATA_BOTANICALS_BD',
      order_mode:
        purchaseMode === 'subscription'
          ? `MONTHLY_TEA_REFILL_SUBSCRIPTION_${refillFrequency.toUpperCase()}`
          : 'SINGLE_TIN_DISPATCH',
      harvest_batch: 'SREEMANGAL_PANCHAGARH_OCT_2026',
      recipient_name: customerName || 'Nusrat Jahan',
      recipient_phone: cleanPhone || '01711884920',
      delivery_zone: deliveryArea.toUpperCase(),
      delivery_address:
        fullAddress || 'Apt 6B, House 22, Road 11, Banani, Dhaka',
      selected_pack: activeBox.title,
      quantity,
      discount_applied: purchaseMode === 'subscription' ? '15% + FREE SHIPPING' : '0%',
      cod_payable_bdt: grandTotalBdt,
    }),
    [
      purchaseMode,
      refillFrequency,
      customerName,
      cleanPhone,
      deliveryArea,
      fullAddress,
      activeBox,
      quantity,
      grandTotalBdt,
    ]
  );

  return (
    <div
      id="purepata-subscription-section"
      className={`w-full transition-colors ${
        isDark ? 'bg-[#0C1712] text-stone-100' : 'bg-[#F2ECE1] text-[#1C2822]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20 space-y-16">
        {/* ================================================================= */}
        {/* PART A: MONTHLY TEA REFILL BOX — SAVE 15% + FREE SHIPPING         */}
        {/* ================================================================= */}
        <section className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div
                className="text-xs font-bold tracking-wider uppercase"
                style={{ color: isDark ? '#A7F3D0' : primaryColor }}
              >
                04. MONTHLY TEA REFILL CLUB — SAVE 15% + FREE SHIPPING
              </div>
              <h2
                className="text-2xl sm:text-3xl font-black tracking-tight"
                style={{
                  fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
                }}
              >
                <EditableText
                  id="purepata_sub_h2"
                  defaultText={
                    title ||
                    'মাসিক টি-রিফিল সাবস্ক্রিপশন বক্স — ১৫% ফ্ল্যাট ডিসকাউন্ট এবং সারা বাংলাদেশে ফ্রি হোম ডেলিভারি'
                  }
                />
              </h2>
              <p className="text-xs sm:text-sm opacity-85 leading-relaxed">
                <EditableText
                  id="purepata_sub_subtitle"
                  defaultText={
                    subtitle ||
                    'প্রথমবার অরিজিনাল ডাবল-লিড ইকো টিন পাওয়ার পর প্রতি মাসে বাগানের সবচেয়ে সতেজ হারভেস্ট ব্যাচ কম্পোস্টেবল রিফিল পাউচে আপনার বাসায় পৌঁছে যাবে। কোনো অগ্রিম পেমেন্ট লাগবে না—ডেলিভারির সময় ক্যাশ অন ডেলিভারিতে পেমেন্ট করুন।'
                  }
                />
              </p>
            </div>

            {/* Interactive Purchase Mode Toggle: Subscribe & Save 15% vs One-Time */}
            <div
              className={`p-1.5 rounded-xl border flex items-center gap-1.5 self-start ${
                isDark
                  ? 'bg-[#11221A] border-emerald-900'
                  : 'bg-[#FAF7F2] border-[#DED6C6]'
              }`}
            >
              <button
                type="button"
                onClick={() => setPurchaseMode('subscription')}
                className={`px-4 py-2.5 rounded-lg text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  purchaseMode === 'subscription'
                    ? 'text-white shadow-xs'
                    : 'opacity-75 hover:opacity-100'
                }`}
                style={
                  purchaseMode === 'subscription'
                    ? { backgroundColor: primaryColor }
                    : undefined
                }
              >
                <RefreshCw size={13} />
                <span>Monthly Refill Box (Save 15% + Free Shipping)</span>
              </button>

              <button
                type="button"
                onClick={() => setPurchaseMode('onetime')}
                className={`px-4 py-2.5 rounded-lg text-xs font-extrabold transition cursor-pointer whitespace-nowrap ${
                  purchaseMode === 'onetime'
                    ? 'text-white shadow-xs'
                    : 'opacity-75 hover:opacity-100'
                }`}
                style={
                  purchaseMode === 'onetime'
                    ? { backgroundColor: primaryColor }
                    : undefined
                }
              >
                <span>One-Time Order (একবার অর্ডার)</span>
              </button>
            </div>
          </div>

          {/* 3 Curated Tea Box Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {REFILL_BOX_OPTIONS.map((box) => {
              const isSelected = selectedBoxId === box.id;
              const subPrice = Math.round(box.oneTimePriceBdt * 0.85);
              const displayPrice =
                purchaseMode === 'subscription' ? subPrice : box.oneTimePriceBdt;

              return (
                <div
                  key={box.id}
                  onClick={() => setSelectedBoxId(box.id)}
                  className={`rounded-2xl border p-6 flex flex-col justify-between space-y-6 transition-all cursor-pointer ${
                    isDark ? 'bg-[#11221A]' : 'bg-[#FAF7F2]'
                  } ${
                    isSelected
                      ? 'ring-2 shadow-lg'
                      : 'border-[#DED6C6] dark:border-emerald-900/80 hover:border-emerald-700'
                  }`}
                  style={
                    isSelected
                      ? {
                          borderColor: primaryColor,
                          boxShadow: `0 12px 28px -10px ${primaryColor}33`,
                        }
                      : undefined
                  }
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span
                        style={{ color: isDark ? '#A7F3D0' : primaryColor }}
                      >
                        {box.badge}
                      </span>
                      <span className="font-mono text-amber-800 dark:text-amber-300">
                        {box.cupsPerMonth}
                      </span>
                    </div>

                    <div>
                      <h3
                        className="text-lg font-black leading-snug"
                        style={{
                          fontFamily:
                            "'Fraunces', 'Playfair Display', Georgia, serif",
                        }}
                      >
                        {box.title}
                      </h3>
                      <p className="text-xs font-semibold opacity-80 mt-1">
                        {box.bnSubtitle}
                      </p>
                    </div>

                    {/* Included Tins */}
                    <div className="space-y-2">
                      <div className="text-xs font-extrabold uppercase tracking-wider opacity-70">
                        বক্সে যে ব্লেন্ডগুলো থাকছে:
                      </div>
                      <ul className="space-y-1.5 text-xs">
                        {box.contents.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2
                              size={14}
                              style={{ color: primaryColor }}
                              className="shrink-0 mt-0.5"
                            />
                            <span className="font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Complimentary Steeping Tool Gift */}
                    <div
                      className={`p-3 rounded-xl border text-xs ${
                        isDark
                          ? 'bg-emerald-950/60 border-emerald-800/80 text-amber-200'
                          : 'bg-[#F2ECE1] border-[#DED6C6] text-[#1C2822]'
                      }`}
                    >
                      <strong>🎁 কমপ্লিমেন্টারি গিফট:</strong> {box.freeGift}
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-4 border-t border-[#DED6C6] dark:border-emerald-900 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span
                          className="text-2xl font-black font-mono tabular-nums"
                          style={{ color: isDark ? '#FCD34D' : primaryColor }}
                        >
                          ৳{displayPrice.toLocaleString()}
                        </span>
                        {purchaseMode === 'subscription' && (
                          <span className="text-xs line-through opacity-50 ml-2 font-mono tabular-nums">
                            ৳{box.oneTimePriceBdt.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400">
                        {purchaseMode === 'subscription'
                          ? '১৫% ছাড় + ফ্রি ডেলিভারি'
                          : 'ওয়ান-টাইম প্যাক'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBoxId(box.id);
                        const formEl = document.getElementById(
                          'purepata-cod-checkout-box'
                        );
                        if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-3 rounded-xl text-xs font-extrabold text-white transition cursor-pointer flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: isSelected ? primaryColor : '#2C3A32',
                      }}
                    >
                      <span>
                        {isSelected
                          ? '✓ এই টি-বক্সটি নির্বাচন করা হয়েছে'
                          : 'এই টি-বক্সটি বেছে নিন'}
                      </span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================= */}
        {/* PART B: 1-CLICK CASH ON DELIVERY & REFILL ENROLLMENT FORM         */}
        {/* ================================================================= */}
        <section
          id="purepata-cod-checkout-box"
          className={`rounded-2xl border p-6 sm:p-8 lg:p-10 ${
            isDark
              ? 'bg-[#11221A] border-emerald-900'
              : 'bg-[#FAF7F2] border-[#DED6C6] shadow-sm'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left 5 Cols: Refill Club Perks & Freshness Guarantee */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <div
                  className="text-xs font-bold tracking-wider uppercase"
                  style={{ color: isDark ? '#A7F3D0' : primaryColor }}
                >
                  05. ZERO-RISK COD &amp; FLEXIBLE REFILL PROMISE
                </div>
                <h3
                  className="text-xl sm:text-2xl font-black tracking-tight"
                  style={{
                    fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
                  }}
                >
                  কেন ৪,২০০+ চা-প্রেমী আমাদের মাসিক রিফিল ক্লাবের সদস্য?
                </h3>
                <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                  বাংলাদেশে ক্রেডিট কার্ড ছাড়াই আমরা চালু করেছি সম্পূর্ণ ক্যাশ অন ডেলিভারি (COD) ভিত্তিক মাসিক চা রিফিল সুবিধা।
                </p>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  {
                    title: '১. প্রতি মাসে ১৫% ডিসকাউন্ট ও ফ্রি শিপিং',
                    desc: 'রিফিল মেম্বারদের জন্য ঢাকা, চট্টগ্রাম, সিলেটসহ সারা বাংলাদেশে ডেলিভারি চার্জ আজীবন ফ্রি।',
                  },
                  {
                    title: '২. প্রথম মাসে ইকো-টিন, পরের মাসে জিরো-ওয়েস্ট পাউচ',
                    desc: 'প্রথম অর্ডারে পাবেন প্রিমিয়াম মেটাল টিন। পরের মাস থেকে বায়োডিগ্রেডেবল এয়ারটাইট পাউচে সতেজ চা পাঠিয়ে দেওয়া হবে।',
                  },
                  {
                    title: '৩. ১ মেসেজেই ব্লেন্ড পরিবর্তন বা স্কিপ করার স্বাধীনতা',
                    desc: 'কোনো মাসে চা বেশি থাকলে বা নতুন ফ্লেভার ট্রাই করতে চাইলে হোয়াটসঅ্যাপে ১টি মেসেজ দিয়েই তারিখ পরিবর্তন বা বাতিল করতে পারবেন।',
                  },
                  {
                    title: '৪. ১০০% স্বাদ ও সতেজতা গ্যারান্টি',
                    desc: 'চায়ের ঘ্রাণ বা স্বাদ পছন্দ না হলে আমরা বিনা প্রশ্নে রিফান্ড বা রিপ্লেসমেন্ট দিয়ে থাকি।',
                  },
                ].map((perk) => (
                  <div
                    key={perk.title}
                    className={`p-3.5 rounded-xl border space-y-1 ${
                      isDark
                        ? 'bg-[#0C1712] border-emerald-950'
                        : 'bg-[#F2ECE1]/70 border-[#DED6C6]'
                    }`}
                  >
                    <div className="font-extrabold flex items-center gap-2">
                      <ShieldCheck
                        size={15}
                        style={{ color: primaryColor }}
                        className="shrink-0"
                      />
                      <span>{perk.title}</span>
                    </div>
                    <p className="opacity-80 pl-6 leading-relaxed">{perk.desc}</p>
                  </div>
                ))}
              </div>

              {/* Dispatch JSON Toggle */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowDispatchJson(!showDispatchJson)}
                  className="text-xs font-mono font-bold opacity-70 hover:opacity-100 flex items-center gap-1.5 cursor-pointer"
                >
                  <Code2 size={14} />
                  <span>
                    {showDispatchJson
                      ? 'Hide Estate Dispatch & Subscription Payload'
                      : 'View Estate Dispatch & Subscription Payload'}
                  </span>
                </button>
                {showDispatchJson && (
                  <pre className="mt-2 p-3 rounded-xl bg-stone-950 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-stone-800">
                    {JSON.stringify(courierPayload, null, 2)}
                  </pre>
                )}
              </div>
            </div>

            {/* Right 7 Cols: Express COD Order Form */}
            <div className="lg:col-span-7">
              {orderConfirmed ? (
                <div
                  className={`rounded-2xl border p-6 sm:p-8 space-y-5 ${
                    isDark
                      ? 'bg-emerald-950/40 border-emerald-800 text-stone-100'
                      : 'bg-emerald-50/90 border-emerald-200 text-[#1C2822]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl text-white flex items-center justify-center shrink-0"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <PackageCheck size={24} />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold opacity-80">
                        ESTATE ORDER CONFIRMED · BATCH #SRM-2026-10A
                      </div>
                      <h4 className="text-lg sm:text-xl font-black">
                        ধন্যবাদ {customerName}! আপনার সতেজ চায়ের অর্ডারটি নিশ্চিত হয়েছে।
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                    আমাদের টি-সোমেলিয়ার টিম আপনার{' '}
                    <strong className="font-mono">{customerPhone}</strong> নাম্বারে কনফার্মেশন এসএমএস পাঠিয়েছে। আগামী ২৪–৪৮ ঘণ্টার মধ্যে আপনার ইকো-টিন বক্স ও কমপ্লিমেন্টারি টি-ইনফিউজার গিফট পৌঁছে যাবে।
                  </p>

                  <div
                    className={`p-4 rounded-xl border text-xs space-y-2 font-mono ${
                      isDark
                        ? 'bg-[#0C1712] border-emerald-900'
                        : 'bg-white border-emerald-200'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span>Selected Tea Box:</span>
                      <span className="font-bold text-right">{activeBox.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Order Plan:</span>
                      <span className="font-bold">
                        {purchaseMode === 'subscription'
                          ? `Monthly Refill (${refillFrequency.replace('_', ' ')}) — 15% Off`
                          : 'One-Time Purchase'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping Fee:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {finalShippingBdt === 0 ? 'FREE (৳0)' : `৳${finalShippingBdt}`}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-black/10 dark:border-white/10 flex justify-between text-sm font-black">
                      <span>Total Cash on Delivery (COD):</span>
                      <span style={{ color: isDark ? '#FCD34D' : primaryColor }}>
                        ৳{grandTotalBdt.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOrderConfirmed(false)}
                    className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-white transition cursor-pointer"
                    style={{ backgroundColor: primaryColor }}
                  >
                    নতুন আরেকটি অর্ডার করুন
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConfirmOrder} className="space-y-4">
                  <div className="border-b border-[#DED6C6] dark:border-emerald-900 pb-3 flex items-center justify-between">
                    <h4
                      className="text-base sm:text-lg font-black"
                      style={{
                        fontFamily:
                          "'Fraunces', 'Playfair Display', Georgia, serif",
                      }}
                    >
                      সতেজ চা অর্ডার ও রিফিল বুকিং ফর্ম (COD)
                    </h4>
                    <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      No Advance Required
                    </span>
                  </div>

                  {validationError && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-2">
                      <AlertCircle size={15} className="shrink-0" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  {/* 1. Select Tea Box */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold">
                      ১. আপনার পছন্দের টি-বক্স নির্বাচন করুন *
                    </label>
                    <select
                      value={selectedBoxId}
                      onChange={(e) => setSelectedBoxId(e.target.value)}
                      className={`w-full px-3.5 py-3 rounded-xl border text-xs font-bold focus:outline-none cursor-pointer ${
                        isDark
                          ? 'bg-[#0C1712] border-emerald-800 text-stone-100'
                          : 'bg-white border-[#DED6C6] text-[#1C2822]'
                      }`}
                    >
                      {REFILL_BOX_OPTIONS.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.title} —{' '}
                          {purchaseMode === 'subscription'
                            ? `৳${Math.round(b.oneTimePriceBdt * 0.85)} (Save 15% + Free Shipping)`
                            : `৳${b.oneTimePriceBdt}`}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 2. Refill Cadence (if Subscription active) */}
                  {purchaseMode === 'subscription' && (
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        {
                          id: '30_days',
                          title: 'প্রতি ৩০ দিন পর পর রিফিল',
                          sub: 'দৈনিক ২–৩ কাপ চা পানকারীদের জন্য আদর্শ',
                        },
                        {
                          id: '45_days',
                          title: 'প্রতি ৪৫ দিন পর পর রিফিল',
                          sub: 'হালকা বা বিকেলের চা পানকারীদের জন্য',
                        },
                      ].map((freq) => {
                        const active = refillFrequency === freq.id;
                        return (
                          <button
                            key={freq.id}
                            type="button"
                            onClick={() => setRefillFrequency(freq.id as any)}
                            className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                              active
                                ? 'border-emerald-600 bg-emerald-500/10'
                                : isDark
                                ? 'border-emerald-900 bg-[#0C1712]'
                                : 'border-[#DED6C6] bg-white'
                            }`}
                          >
                            <div className="text-xs font-extrabold">{freq.title}</div>
                            <div className="text-[10px] opacity-75">{freq.sub}</div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* 3. Customer Name & 11-Digit BD Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-extrabold">
                        ২. আপনার পূর্ণ নাম (Full Name) *
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="যেমন: নুসরাত জাহান / আরিফ চৌধুরী"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none ${
                          isDark
                            ? 'bg-[#0C1712] border-emerald-800 text-stone-100'
                            : 'bg-white border-[#DED6C6] text-[#1C2822]'
                        }`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-extrabold">
                        ৩. মোবাইল নাম্বার (১১ ডিজিট) *
                      </label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="017XXXXXXXX"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono font-bold focus:outline-none ${
                          isDark
                            ? 'bg-[#0C1712] border-emerald-800 text-stone-100'
                            : 'bg-white border-[#DED6C6] text-[#1C2822]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* 4. Delivery Area & Quantity */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="block text-xs font-extrabold">
                        ৪. ডেলিভারি জোন নির্বাচন করুন *
                      </label>
                      <select
                        value={deliveryArea}
                        onChange={(e) => setDeliveryArea(e.target.value as any)}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none cursor-pointer ${
                          isDark
                            ? 'bg-[#0C1712] border-emerald-800 text-stone-100'
                            : 'bg-white border-[#DED6C6] text-[#1C2822]'
                        }`}
                      >
                        <option value="dhaka">
                          ঢাকা মেট্রো (২৪ ঘণ্টায় হোম ডেলিভারি)
                        </option>
                        <option value="chattogram_sylhet">
                          চট্টগ্রাম ও সিলেট মেট্রো (৩৬ ঘণ্টায় ডেলিভারি)
                        </option>
                        <option value="nationwide">
                          অন্যান্য জেলা শহর (৪৮ ঘণ্টায় ডেলিভারি)
                        </option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-extrabold">
                        বক্সের সংখ্যা (Qty)
                      </label>
                      <div className="flex items-center border rounded-xl overflow-hidden border-[#DED6C6] dark:border-emerald-800 bg-white dark:bg-[#0C1712]">
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3.5 py-2 text-xs font-black cursor-pointer"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center text-xs font-mono font-black">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-3.5 py-2 text-xs font-black cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 5. Full Delivery Address */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold">
                      ৫. সম্পূর্ণ ডেলিভারি ঠিকানা (বাসা/ফ্ল্যাট নং, রোড ও এলাকা) *
                    </label>
                    <input
                      type="text"
                      value={fullAddress}
                      onChange={(e) => setFullAddress(e.target.value)}
                      placeholder="যেমন: ফ্ল্যাট ৬বি, বাসা ২২, রোড ১১, বনানী, ঢাকা"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none ${
                        isDark
                          ? 'bg-[#0C1712] border-emerald-800 text-stone-100'
                          : 'bg-white border-[#DED6C6] text-[#1C2822]'
                      }`}
                    />
                  </div>

                  {/* Live Receipt Summary */}
                  <div
                    className={`p-4 rounded-xl border space-y-2 text-xs ${
                      isDark
                        ? 'bg-[#0C1712] border-emerald-900'
                        : 'bg-[#F2ECE1]/70 border-[#DED6C6]'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span className="opacity-80">
                        {activeBox.title} ({quantity}x):
                      </span>
                      <span className="font-mono font-bold tabular-nums">
                        ৳{subtotalBdt.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-80">ডেলিভারি চার্জ:</span>
                      <span className="font-mono font-bold tabular-nums text-emerald-700 dark:text-emerald-400">
                        {finalShippingBdt === 0
                          ? 'FREE (৳0 — সাবস্ক্রিপশন সুবিধা)'
                          : `৳${finalShippingBdt}`}
                      </span>
                    </div>
                    {totalSavingsBdt > 0 && (
                      <div className="flex justify-between text-amber-800 dark:text-amber-300 font-bold">
                        <span>আপনার মোট সাশ্রয় (15% Off + Free Shipping):</span>
                        <span className="font-mono tabular-nums">
                          -৳{totalSavingsBdt.toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-sm font-black">
                      <span>ডেলিভারির সময় মোট প্রদেয় (COD):</span>
                      <span
                        className="text-lg font-mono tabular-nums"
                        style={{ color: isDark ? '#FCD34D' : primaryColor }}
                      >
                        ৳{grandTotalBdt.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-sm font-black text-white shadow-md hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <ShoppingBag size={17} />
                    <span>
                      {purchaseMode === 'subscription'
                        ? `১৫% ছাড়ে মাসিক রিফিল বক্স কনফার্ম করুন (৳${grandTotalBdt.toLocaleString()})`
                        : `ওয়ান-টাইম অর্ডার কনফার্ম করুন (৳${grandTotalBdt.toLocaleString()})`}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
