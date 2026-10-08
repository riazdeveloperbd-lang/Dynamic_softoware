import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  CheckCircle2,
  AlertCircle,
  Phone,
  User,
  MapPin,
  Car,
  Bike,
  Wrench,
  Sparkles,
  ArrowRight,
  Code2,
  PackageCheck,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface AutoCareBundlesCodSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

interface ComboBundleOption {
  id: string;
  badge: string;
  name: string;
  bnTitle: string;
  targetUser: string;
  itemsIncluded: string[];
  freeGift: string;
  bundlePriceBdt: number;
  regularPriceBdt: number;
  savingsBdt: number;
  freeDelivery: boolean;
  featured?: boolean;
}

const COMBO_BUNDLES: ComboBundleOption[] = [
  {
    id: 'bundle_biker_pro',
    badge: '01. BIKER & RIDE-SHARE COMBO',
    name: 'Complete Biker Touring & Traffic Kit',
    bnTitle: 'কমপ্লিট বাইকার ও রাইড-শেয়ার প্রো প্যাক (৩টি গিয়ার + ফ্রি গিফট)',
    targetUser: 'Yamaha R15, FZ-S, Gixxer, Pulsar ও Pathao/Uber রাইডারদের জন্য',
    itemsIncluded: [
      'T-Com Pro IP67 Waterproof Helmet Bluetooth Intercom (৳2,650)',
      'Graphene 9H Quick Ceramic Coating Spray 500ml (৳950)',
      '3D Air-Mesh & Medical Gel Ergonomic Seat Cushion (৳890)',
    ],
    freeGift: 'FREE: २টি 400 GSM প্রিমিয়াম মাইক্রোফাইবার টাওয়েল + হেলমেট ভাইজর অ্যান্টি-ফগ স্প্রে (৳৪৫০ মূল্যের)',
    bundlePriceBdt: 3790,
    regularPriceBdt: 4490,
    savingsBdt: 700,
    freeDelivery: true,
    featured: true,
  },
  {
    id: 'bundle_car_wash_studio',
    badge: '02. HOME CAR WASH & SHINE STUDIO',
    name: 'Ultimate Home Car Detailing & Wash Bundle',
    bnTitle: 'হোম কার ওয়াশ ও শোরুম সিরামিক শাইন স্টুডিও প্যাক',
    targetUser: 'Toyota Allion, Premio, Axio, Civic, X-Trail ও SUV ওনারদের জন্য',
    itemsIncluded: [
      '48V Dual-Battery Cordless High-Pressure Washer + Foam Cannon (৳3,490)',
      'Graphene 9H Nano Quick Ceramic Coating Spray 500ml (৳950)',
      'Concentrated pH-Neutral Snow Foam Car Shampoo 1 Liter (৳550)',
    ],
    freeGift: 'FREE: ডাবল-সাইডেড চেনিল ওয়াশ মিট + ২টি এডজলেস বাফিং টাওয়েল (৳৫৫০ মূল্যের)',
    bundlePriceBdt: 4190,
    regularPriceBdt: 4990,
    savingsBdt: 800,
    freeDelivery: true,
    featured: false,
  },
  {
    id: 'bundle_night_highway',
    badge: '03. NIGHT HIGHWAY & COMFORT PACK',
    name: 'Night Highway Vision & Orthopedic Comfort Pack',
    bnTitle: 'নাইট হাইওয়ে ভিশন ও লং-ড্রাইভ কমফোর্ট কম্বো',
    targetUser: 'রাতের হাইওয়ে ড্রাইভার, ট্যুরার ও দীর্ঘক্ষণ জ্যামে থাকা চালকদের জন্য',
    itemsIncluded: [
      '120W CANBUS Tri-Color LED Headlight Upgrade H4/H11/9005 (৳1,650)',
      '3D Air-Mesh & Gel Ergonomic Seat Cushion (৳890)',
      'Graphene 9H Quick Ceramic Coating Spray 500ml (৳950)',
    ],
    freeGift: 'FREE: উইন্ডশিল্ড ও হেডলাইট গ্লাস অয়েল-ফিল্ম রিমুভার ওয়াইপস (৳৩৫০ মূল্যের)',
    bundlePriceBdt: 2890,
    regularPriceBdt: 3490,
    savingsBdt: 600,
    freeDelivery: false,
    featured: false,
  },
];

const SINGLE_ITEMS_OPTIONS = [
  {
    id: 'single_ceramic',
    label: 'Single: Graphene 9H Ceramic Spray 500ml + Towel — ৳950',
    priceBdt: 950,
    freeShipping: false,
  },
  {
    id: 'single_intercom',
    label: 'Single: T-Com Pro IP67 Waterproof Helmet Intercom — ৳2,650',
    priceBdt: 2650,
    freeShipping: false,
  },
  {
    id: 'single_washer',
    label: 'Single: 48V Cordless High-Pressure Car/Bike Washer Kit — ৳3,490',
    priceBdt: 3490,
    freeShipping: false,
  },
  {
    id: 'single_led',
    label: 'Single: 120W CANBUS Tri-Color LED Headlight (H4/H11/9005) — ৳1,650',
    priceBdt: 1650,
    freeShipping: false,
  },
  {
    id: 'single_cushion',
    label: 'Single: 3D Air-Mesh & Gel Ergonomic Seat Cushion — ৳890',
    priceBdt: 890,
    freeShipping: false,
  },
];

export const AutoCareBundlesCodSection: React.FC<AutoCareBundlesCodSectionProps> = ({
  title,
  subtitle,
  primaryColor = '#E11D48',
  isDark = false,
}) => {
  const [selectedOrderOptionId, setSelectedOrderOptionId] =
    useState<string>('bundle_biker_pro');
  const [quantity, setQuantity] = useState<number>(1);
  const [deliveryZone, setDeliveryZone] = useState<'dhaka' | 'suburb' | 'outside'>('dhaka');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [vehicleModelInput, setVehicleModelInput] = useState<string>(
    'Yamaha FZ-S V3 (H4 Socket)'
  );
  const [fullAddress, setFullAddress] = useState<string>('');
  const [orderSubmitted, setOrderSubmitted] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showCourierJson, setShowCourierJson] = useState<boolean>(false);

  // Resolve current selected package or single product
  const activeSelection = useMemo(() => {
    const bundle = COMBO_BUNDLES.find((b) => b.id === selectedOrderOptionId);
    if (bundle) {
      return {
        id: bundle.id,
        title: `${bundle.name} (${bundle.bnTitle})`,
        unitPrice: bundle.bundlePriceBdt,
        freeShippingEligible: bundle.freeDelivery,
        isBundle: true,
        savings: bundle.savingsBdt,
      };
    }
    const single =
      SINGLE_ITEMS_OPTIONS.find((s) => s.id === selectedOrderOptionId) ||
      SINGLE_ITEMS_OPTIONS[0];
    return {
      id: single.id,
      title: single.label,
      unitPrice: single.priceBdt,
      freeShippingEligible: single.freeShipping,
      isBundle: false,
      savings: 0,
    };
  }, [selectedOrderOptionId]);

  const baseShippingFee =
    deliveryZone === 'dhaka' ? 70 : deliveryZone === 'suburb' ? 100 : 130;
  const finalShippingFee = activeSelection.freeShippingEligible ? 0 : baseShippingFee;
  const subtotalBdt = activeSelection.unitPrice * quantity;
  const grandTotalBdt = subtotalBdt + finalShippingFee;

  // 11-Digit BD Phone Regex Validation
  const cleanPhone = customerPhone.replace(/[\s-]/g, '');
  const isValidBdPhone = /^01[3-9]\d{8}$/.test(cleanPhone);

  const handleConfirmCodOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!customerName.trim()) {
      setFormError('অনগ্রহ করে আপনার পূর্ণ নাম লিখুন (Please enter your full name).');
      return;
    }
    if (!isValidBdPhone) {
      setFormError(
        'সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন (যেমন: 017XXXXXXXX বা 018XXXXXXXX).'
      );
      return;
    }
    if (!fullAddress.trim()) {
      setFormError(
        'ডেলিভারির জন্য আপনার বাসা/রোড ও এলাকার সম্পূর্ণ ঠিকানা লিখুন।'
      );
      return;
    }

    setOrderSubmitted(true);
  };

  const courierPayload = useMemo(
    () => ({
      merchant: 'TORQUEGEAR_BD_DHAKA_HUB',
      courier_partner:
        deliveryZone === 'dhaka' ? 'Pathao Express Same-Day' : 'Steadfast Courier BD',
      invoice_id: `TG-${Date.now().toString().slice(-6)}`,
      recipient_name: customerName || 'Md. Tanvir Hasan',
      recipient_phone: cleanPhone || '01711948200',
      vehicle_fitment_note: vehicleModelInput || 'Yamaha FZ-S V3 (H4)',
      delivery_address:
        fullAddress || 'House 14, Road 7, Sector 4, Uttara, Dhaka',
      delivery_zone: deliveryZone.toUpperCase(),
      item_description: activeSelection.title,
      quantity,
      cod_collectable_amount_bdt: grandTotalBdt,
      open_box_inspection_allowed: true,
    }),
    [
      deliveryZone,
      customerName,
      cleanPhone,
      vehicleModelInput,
      fullAddress,
      activeSelection,
      quantity,
      grandTotalBdt,
    ]
  );

  return (
    <div
      id="auto-bundles-cod-section"
      className={`w-full transition-colors ${
        isDark ? 'bg-[#090D16] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20 space-y-16">
        {/* ================================================================= */}
        {/* PART A: VALUE BUNDLES & COMBO KITS                                */}
        {/* ================================================================= */}
        <section className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs font-bold tracking-wider uppercase text-rose-600 dark:text-rose-400">
                04. VALUE BUNDLES &amp; COMBO OFFERS (সবচেয়ে বেশি সাশ্রয়)
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                <EditableText
                  id="auto_bundles_h2"
                  defaultText={
                    title ||
                    'সিঙ্গেল আইটেমের চেয়ে কম্বো প্যাকে অর্ডার করুন — বাঁচান ৮০০ টাকা পর্যন্ত + ফ্রি ডেলিভারি!'
                  }
                />
              </h2>
              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                <EditableText
                  id="auto_bundles_subtitle"
                  defaultText={
                    subtitle ||
                    'আমাদের ৮০% কাস্টমার আলাদা প্রোডাক্ট না কিনে কম্বো বান্ডেল বেছে নেন। প্রতিটি কম্বো প্যাকের সাথে থাকছে এক্সক্লুসিভ ফ্রি মাইক্রোফাইবার কিট এবং ডিসকাউন্ট।'
                  }
                />
              </p>
            </div>

            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              ✓ কম্বো ১ ও ২ অর্ডারে সারা বাংলাদেশে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি!
            </div>
          </div>

          {/* 3 Combo Bundle Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {COMBO_BUNDLES.map((bundle) => {
              const isSelected = selectedOrderOptionId === bundle.id;
              return (
                <div
                  key={bundle.id}
                  onClick={() => setSelectedOrderOptionId(bundle.id)}
                  className={`rounded-2xl border p-6 flex flex-col justify-between space-y-6 transition-all cursor-pointer ${
                    isDark ? 'bg-[#111827]' : 'bg-white'
                  } ${
                    isSelected
                      ? 'ring-2 shadow-lg'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
                  }`}
                  style={
                    isSelected
                      ? { borderColor: primaryColor, boxShadow: `0 10px 30px -10px ${primaryColor}33` }
                      : undefined
                  }
                >
                  <div className="space-y-4">
                    {/* Top Clean Kicker */}
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span style={{ color: primaryColor }}>{bundle.badge}</span>
                      {bundle.freeDelivery && (
                        <span className="text-emerald-600 dark:text-emerald-400">
                          ✓ ফ্রি হোম ডেলিভারি
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-black leading-snug">
                        {bundle.name}
                      </h3>
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">
                        {bundle.bnTitle}
                      </p>
                    </div>

                    <div
                      className={`text-xs px-3 py-2 rounded-lg font-medium ${
                        isDark
                          ? 'bg-slate-900 text-slate-300'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <strong>উপযোগী:</strong> {bundle.targetUser}
                    </div>

                    {/* Items Included List */}
                    <div className="space-y-2">
                      <div className="text-xs font-extrabold uppercase tracking-wider opacity-70">
                        প্যাকেজে যা যা থাকছে:
                      </div>
                      <ul className="space-y-2 text-xs">
                        {bundle.itemsIncluded.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2
                              size={14}
                              className="text-emerald-500 shrink-0 mt-0.5"
                            />
                            <span className="font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Free Gift Callout */}
                    <div
                      className={`p-3 rounded-xl border text-xs ${
                        isDark
                          ? 'bg-amber-950/25 border-amber-800/60 text-amber-300'
                          : 'bg-amber-50 border-amber-200 text-amber-900'
                      }`}
                    >
                      <strong>🎁 বোনাস গিফট:</strong> {bundle.freeGift}
                    </div>
                  </div>

                  {/* Price & Select CTA */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span
                          className="text-2xl font-black font-mono tabular-nums"
                          style={{ color: primaryColor }}
                        >
                          ৳{bundle.bundlePriceBdt.toLocaleString()}
                        </span>
                        <span className="text-xs line-through opacity-50 ml-2 font-mono tabular-nums">
                          ৳{bundle.regularPriceBdt.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                        সাশ্রয় ৳{bundle.savingsBdt}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrderOptionId(bundle.id);
                        const formEl = document.getElementById('auto-cod-checkout-box');
                        if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-3 rounded-xl text-xs font-extrabold transition cursor-pointer flex items-center justify-center gap-2"
                      style={
                        isSelected
                          ? { backgroundColor: primaryColor, color: '#FFFFFF' }
                          : {
                              backgroundColor: isDark ? '#1E293B' : '#0F172A',
                              color: '#FFFFFF',
                            }
                      }
                    >
                      <span>
                        {isSelected
                          ? '✓ কম্বো প্যাকটি সিলেক্ট করা হয়েছে'
                          : 'এই কম্বো প্যাকটি অর্ডার করুন'}
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
        {/* PART B: FRICTIONLESS 1-CLICK CASH ON DELIVERY (COD) CHECKOUT      */}
        {/* ================================================================= */}
        <section
          id="auto-cod-checkout-box"
          className={`rounded-2xl border p-6 sm:p-8 lg:p-10 ${
            isDark
              ? 'bg-[#111827] border-slate-800'
              : 'bg-white border-slate-200 shadow-md'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left Column: 4-Pillar COD Trust & Open-Box Guarantee */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
                  05. ZERO-RISK CASH ON DELIVERY (COD)
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                  অগ্রিম ১ টাকাও দিতে হবে না — প্রোডাক্ট হাতে পেয়ে চেক করে পেমেন্ট করুন!
                </h3>
                <p
                  className={`text-xs sm:text-sm leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  অনলাইনে অটোমোটিভ গিয়ার কেনার সময় ছবির সাথে প্রোডাক্টের মিল না থাকার ভয় আমরা দূর করেছি। আমাদের প্রতিটি পার্সেল ডেলিভারি ম্যানের সামনে খুলে চেক করে নেওয়ার সুযোগ পাবেন।
                </p>
              </div>

              {/* 4 Trust Promises */}
              <div className="space-y-3.5 text-xs">
                {[
                  {
                    title: '১. ডেলিভারি ম্যানের সামনে খুলে দেখার সুবিধা (Open-Box Check)',
                    desc: 'পার্সেল রিসিভ করার সময় প্রোডাক্টের কোয়ালিটি, ওজন এবং হেডলাইট সকেট মিলিয়ে তারপর টাকা পরিশোধ করুন।',
                  },
                  {
                    title: '২. ৭ দিনের ইনস্ট্যান্ট ফিটমেন্ট এক্সচেঞ্জ গ্যারান্টি',
                    desc: 'আপনার গাড়ি বা বাইকের মডেলে যদি কোনো কারণে ফিট না হয়, আমরা ৭ দিনের মধ্যে ফ্রি রিপ্লেসমেন্ট করে দেবো।',
                  },
                  {
                    title: '৩. ৬ মাস থেকে ১ বছরের অফিসিয়াল ওয়ারেন্টি কার্ড',
                    desc: 'হেলমেট ইন্টারকম, ৪৮ ভোল্ট ওয়াশার মোটর এবং এলইডি হেডলাইটের সাথে থাকছে লিখিত ওয়ারেন্টি কার্ড।',
                  },
                  {
                    title: '৪. ২৪–৪৮ ঘণ্টায় সারা বাংলাদেশে এক্সপ্রেস ডেলিভারি',
                    desc: 'ঢাকা সিটিতে ২৪ ঘণ্টায় (৳৭০) এবং ঢাকার বাইরে যেকোনো জেলায় ৪৮–৭২ ঘণ্টায় (৳১৩০) হোম ডেলিভারি।',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className={`p-3.5 rounded-xl border space-y-1 ${
                      isDark
                        ? 'bg-slate-900/80 border-slate-800'
                        : 'bg-slate-50 border-slate-200/80'
                    }`}
                  >
                    <div className="font-extrabold flex items-center gap-2">
                      <ShieldCheck size={15} className="text-emerald-500 shrink-0" />
                      <span>{item.title}</span>
                    </div>
                    <p className="opacity-80 pl-6 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Courier Dispatch JSON Toggle */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowCourierJson(!showCourierJson)}
                  className="text-xs font-mono font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <Code2 size={14} />
                  <span>
                    {showCourierJson
                      ? 'Hide Pathao / Steadfast Courier API Payload'
                      : 'View Live Pathao / Steadfast Courier API Payload'}
                  </span>
                </button>

                {showCourierJson && (
                  <pre className="mt-2 p-3 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800">
                    {JSON.stringify(courierPayload, null, 2)}
                  </pre>
                )}
              </div>
            </div>

            {/* Right Column: Express COD Order Form */}
            <div className="lg:col-span-7">
              {orderSubmitted ? (
                <div
                  className={`rounded-2xl border p-6 sm:p-8 space-y-5 ${
                    isDark
                      ? 'bg-emerald-950/25 border-emerald-800 text-emerald-100'
                      : 'bg-emerald-50/90 border-emerald-200 text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <PackageCheck size={24} />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        ORDER CONFIRMED · INVOICE #{courierPayload.invoice_id}
                      </div>
                      <h4 className="text-lg sm:text-xl font-black">
                        ধন্যবাদ {customerName}! আপনার অর্ডারটি সফলভাবে রিসিভ হয়েছে।
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                    আগামী ১৫ মিনিটের মধ্যে আমাদের ফিটমেন্ট স্পেশালিস্ট আপনার{' '}
                    <strong className="font-mono">{customerPhone}</strong> নাম্বারে কল করে আপনার{' '}
                    <strong>{vehicleModelInput}</strong> মডেলের সকেট ও সাইজ ভেরিফাই করে পার্সেল ডিসপ্যাচ করবেন।
                  </p>

                  <div
                    className={`p-4 rounded-xl border text-xs space-y-2 font-mono ${
                      isDark
                        ? 'bg-slate-950/90 border-slate-800 text-slate-200'
                        : 'bg-white border-emerald-200 text-slate-800'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span>Selected Gear:</span>
                      <span className="font-bold text-right">{activeSelection.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vehicle Model:</span>
                      <span className="font-bold">{vehicleModelInput}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quantity:</span>
                      <span className="font-bold">{quantity}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Charge:</span>
                      <span className="font-bold text-emerald-500">
                        {finalShippingFee === 0 ? 'FREE (৳0)' : `৳${finalShippingFee}`}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-sm font-black">
                      <span>Total Payable on Delivery (COD):</span>
                      <span style={{ color: primaryColor }}>
                        ৳{grandTotalBdt.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOrderSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-slate-900 text-white hover:bg-slate-800 transition cursor-pointer"
                  >
                    নতুন আরেকটি অর্ডার করুন
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConfirmCodOrder} className="space-y-4">
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
                    <h4 className="text-base sm:text-lg font-black">
                      ১-ক্লিক ক্যাশ অন ডেলিভারি অর্ডার ফর্ম
                    </h4>
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      100% COD · No Advance Needed
                    </span>
                  </div>

                  {formError && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-2">
                      <AlertCircle size={15} className="shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* 1. Package / Product Selector */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold">
                      ১. কম্বো প্যাক অথবা সিঙ্গেল গিয়ার নির্বাচন করুন *
                    </label>
                    <select
                      value={selectedOrderOptionId}
                      onChange={(e) => setSelectedOrderOptionId(e.target.value)}
                      className={`w-full px-3.5 py-3 rounded-xl border text-xs font-bold focus:outline-none cursor-pointer ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 text-white'
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    >
                      <optgroup label="🔥 Value Combo Bundles (Save up to ৳800)">
                        {COMBO_BUNDLES.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name} — ৳{b.bundlePriceBdt.toLocaleString()}{' '}
                            {b.freeDelivery ? '(Free Delivery)' : ''}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="🔧 Individual Gear Items">
                        {SINGLE_ITEMS_OPTIONS.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.label}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  {/* 2. Customer Name & 11-Digit BD Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-extrabold">
                        ২. আপনার নাম (Full Name) *
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="যেমন: তানভীর হাসান"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none ${
                          isDark
                            ? 'bg-slate-900 border-slate-700 text-white'
                            : 'bg-slate-50 border-slate-300 text-slate-900'
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
                            ? 'bg-slate-900 border-slate-700 text-white'
                            : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  {/* 3. Vehicle Model Note & Quantity */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="block text-xs font-extrabold">
                        ৪. আপনার গাড়ি বা বাইকের মডেল (সঠিক সকেট ফিটমেন্টের জন্য)
                      </label>
                      <input
                        type="text"
                        value={vehicleModelInput}
                        onChange={(e) => setVehicleModelInput(e.target.value)}
                        placeholder="যেমন: Yamaha R15 V4 / Toyota Premio 2018"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none ${
                          isDark
                            ? 'bg-slate-900 border-slate-700 text-white'
                            : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-extrabold">
                        পরিমাণ (Quantity)
                      </label>
                      <div className="flex items-center border rounded-xl overflow-hidden border-slate-300 dark:border-slate-700">
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 text-xs font-black cursor-pointer"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center text-xs font-mono font-black">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 text-xs font-black cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 4. Delivery Area & Full Address */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold">
                      ৫. ডেলিভারি এরিয়া নির্বাচন করুন *
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        {
                          id: 'dhaka',
                          label: 'ঢাকা সিটি (৳৭০)',
                          sub: '২৪ ঘণ্টায় ডেলিভারি',
                        },
                        {
                          id: 'suburb',
                          label: 'ঢাকা সাব-আর্ব (৳১০০)',
                          sub: 'সাভার, গাজীপুর, নারায়ণগঞ্জ',
                        },
                        {
                          id: 'outside',
                          label: 'ঢাকার বাইরে (৳১৩০)',
                          sub: 'সারা বাংলাদেশ (৪৮ ঘণ্টা)',
                        },
                      ].map((zone) => {
                        const active = deliveryZone === zone.id;
                        return (
                          <button
                            key={zone.id}
                            type="button"
                            onClick={() => setDeliveryZone(zone.id as any)}
                            className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                              active
                                ? 'border-rose-500 bg-rose-500/10'
                                : isDark
                                ? 'border-slate-800 bg-slate-900'
                                : 'border-slate-200 bg-slate-50'
                            }`}
                          >
                            <div className="text-xs font-extrabold">{zone.label}</div>
                            <div className="text-[10px] opacity-70">{zone.sub}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold">
                      ৬. সম্পূর্ণ ডেলিভারি ঠিকানা (বাসা নং, রোড, এলাকা ও থানা) *
                    </label>
                    <input
                      type="text"
                      value={fullAddress}
                      onChange={(e) => setFullAddress(e.target.value)}
                      placeholder="যেমন: বাসা ১৪, রোড ৭, সেক্টর ৪, উত্তরা, ঢাকা"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 text-white'
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  {/* Live Order Summary Receipt */}
                  <div
                    className={`p-4 rounded-xl border space-y-2 text-xs ${
                      isDark
                        ? 'bg-slate-900/90 border-slate-800'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span className="opacity-80">সিলেক্টেড আইটেম ({quantity}x):</span>
                      <span className="font-mono font-bold tabular-nums">
                        ৳{subtotalBdt.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-80">ডেলিভারি চার্জ:</span>
                      <span className="font-mono font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                        {finalShippingFee === 0
                          ? 'FREE (৳0 — কম্বো অফার)'
                          : `৳${finalShippingFee}`}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm font-black">
                      <span>ডেলিভারির সময় মোট প্রদেয় (Cash on Delivery):</span>
                      <span
                        className="text-lg font-mono tabular-nums"
                        style={{ color: primaryColor }}
                      >
                        ৳{grandTotalBdt.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-sm font-black text-white shadow-lg hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <ShoppingBag size={17} />
                    <span>
                      অর্ডার কনফার্ম করুন — ক্যাশ অন ডেলিভারি (৳{grandTotalBdt.toLocaleString()})
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
