import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Truck,
  ArrowRight,
  PackageCheck,
  Code2,
  FileText,
  Sparkles,
  MapPin,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface FitGhorBdCheckoutSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

interface HomeGymBundleOption {
  id: string;
  nameBn: string;
  nameEn: string;
  badge: string;
  itemsIncluded: string[];
  regularPrice: number;
  offerPrice: number;
  digitalBonus: string;
}

const HOME_GYM_BUNDLES: HomeGymBundleOption[] = [
  {
    id: 'starter_fat_burn_combo',
    nameBn: 'প্যাক ১: স্টার্টার হোম জিম ও ফ্যাট বার্ন কম্বো (150 LBS Resistance Band Set + Waist Trimmer Belt)',
    nameEn: '11-Piece 150 LBS Resistance Bands + Thermo-Sweat Neoprene Waist Trimmer',
    badge: 'সবচেয়ে জনপ্রিয় · দ্রুত মেদ ঝরানো ও ফুল-বডি টোনিং',
    itemsIncluded: [
      '১. ১১ পিস ১৫০ পাউন্ড ন্যাচারাল ল্যাটেক্স রেজিস্ট্যান্স ব্যান্ড সেট (হ্যান্ডেল, ডোর অ্যাঙ্কর ও অ্যাঙ্কেল স্ট্র্যাপসহ)',
      '২. থার্মো-কোর নিওপ্রিন ওয়েস্ট ট্রিমার ও লাম্বার সাপোর্ট বেল্ট (২৮"–৪৮" ফ্রি সাইজ)',
      '৩. ফ্রি ক্যারি ব্যাগ + ৩০ দিনের At-Home Workout Plan PDF (Instant Unlock)',
    ],
    regularPrice: 3450,
    offerPrice: 1990,
    digitalBonus: 'FREE: 30-Day Fat-Loss Home Workout PDF + Deshi Calorie Guide',
  },
  {
    id: 'wellness_posture_pack',
    nameBn: 'প্যাক ২: ওয়েলনেস, ইয়োগা ও স্মার্ট ট্র্যাকার কম্বো (8mm Acupressure Yoga Mat + Bluetooth Body Fat Scale)',
    nameEn: '8mm Eco-TPE Acupressure Yoga Mat + 13-Metric Smart Bluetooth Body Fat Scale',
    badge: 'নারী, প্রফেশনাল ও ফ্যামিলি ওয়েলনেস বেস্টসেলার',
    itemsIncluded: [
      '১. ৮ মিমি জয়েন্ট-কুশনিং অ্যান্টি-স্লিপ আকুপ্রেশার ও ইয়োগা ম্যাট (ক্যারি স্ট্র্যাপসহ)',
      '২. স্মার্ট ব্লুটুথ বডি ফ্যাট, মাসল ও বিএমআই অ্যানালাইজার স্কেল (iOS/Android App Sync)',
      '৩. ফ্রি ১৫ মিনিটের মর্নিং ইয়োগা ও কোমর ব্যথা মুক্তির PDF রুটিন',
    ],
    regularPrice: 4250,
    offerPrice: 2690,
    digitalBonus: 'FREE: Morning Mobility & Posture Correction PDF + App Tracker Guide',
  },
  {
    id: 'ultimate_pro_home_gym',
    nameBn: 'প্যাক ৩: আলটিমেট প্রো হোম জিম ফুল সেটআপ (24KG Adjustable Dumbbell + 150 LBS Bands + Mat + Scale + Belt)',
    nameEn: 'Complete 5-in-1 Apartment Gym Studio (Dumbbell + Bands + Mat + Waist Belt + Smart Scale)',
    badge: 'ভিআইপি ফুল সেটআপ · ফ্রি হোম ডেলিভারি',
    itemsIncluded: [
      '১. কুইক-ডায়াল ২৪ কেজি অ্যাডজাস্টেবল ডাম্বেল (১৫ ইন ১ কাস্ট আয়রন)',
      '২. ১১ পিস ১৫০ পাউন্ড প্রো রেজিস্ট্যান্স ব্যান্ড সেট',
      '৩. ৮ মিমি আকুপ্রেশার ইয়োগা ম্যাট + থার্মো ওয়েস্ট ট্রিমার বেল্ট',
      '৪. স্মার্ট ব্লুটুথ বডি ফ্যাট স্কেল + ১ বছরের রিপ্লেসমেন্ট ওয়ারেন্টি',
    ],
    regularPrice: 14500,
    offerPrice: 10990,
    digitalBonus: 'FREE: Complete 90-Day Hypertrophy & Transformation Masterclass PDF + Free Delivery',
  },
];

// Strictly split District -> Thana/Upazila map for Steadfast / Pathao / RedX Courier API
const BD_DISTRICT_THANA_MAP: Record<string, string[]> = {
  'Dhaka (ঢাকা)': [
    'Dhanmondi (ধানমন্ডি)',
    'Gulshan / Banani (গুলশান / বনানী)',
    'Uttara (উত্তরা)',
    'Mirpur (মিরপুর)',
    'Mohammadpur (মোহাম্মদপুর)',
    'Bashundhara R/A (বসুন্ধরা আবাসিক)',
    'Badda / Rampura (বাড্ডা / রামপুরা)',
    'Motijheel / Paltan (মতিঝিল / পল্টন)',
    'Savar / Ashulia (সাভার / আশুলিয়া)',
  ],
  'Chattogram (চট্টগ্রাম)': [
    'Panchlaish / Khulshi (পাঁচলাইশ / খুলশী)',
    'Agrabad / Double Mooring (আগ্রাবাদ)',
    'Halishahar (হালিশহর)',
    'Kotwali / Chawkbazar (কোতোয়ালী / চকবাজার)',
    'Hathazari (হাটহাজারী)',
  ],
  'Sylhet (সিলেট)': [
    'Sylhet Sadar / Zindabazar (সিলেট সদর / জিন্দাবাজার)',
    'Amberkhana / Shahjalal Upashahar (আম্বরখানা / উপশহর)',
    'South Surma (দক্ষিণ সুরমা)',
    'Beanibazar / Golapganj (বিয়ানীবাজার / গোলাপগঞ্জ)',
  ],
  'Rajshahi (রাজশাহী)': [
    'Boalia / Shaheb Bazar (বোয়ালিয়া / সাহেব বাজার)',
    'Rajpara (রাজপাড়া)',
    'Motihar (মতিহার)',
    'Paba / Godagari (পবা / গোদাগাড়ী)',
  ],
  'Khulna (খুলনা)': [
    'Khulna Sadar (খুলনা সদর)',
    'Sonadanga (সোনাডাঙ্গা)',
    'Khalishpur (খালিশপুর)',
    'Daulatpur (দৌলতপুর)',
  ],
  'Gazipur & Narayanganj (গাজীপুর ও নারায়ণগঞ্জ)': [
    'Tongi / Gazipur Sadar (টঙ্গী / গাজীপুর সদর)',
    'Joydebpur / Chowrasta (জয়দেবপুর / চৌরাস্তা)',
    'Narayanganj Sadar / Chashara (নারায়ণগঞ্জ সদর / চাষাড়া)',
    'Siddhirganj / Fatullah (সিদ্ধিরগঞ্জ / ফতুল্লা)',
  ],
  'Cumilla & Other Districts (কুমিল্লা ও অন্যান্য জেলা)': [
    'Cumilla Sadar / Kandirpar (কুমিল্লা সদর / কান্দিরপাড়)',
    'Bogura Sadar (বগুড়া সদর)',
    'Mymensingh Sadar (ময়মনসিংহ সদর)',
    'Barishal Sadar (বরিশাল সদর)',
    'Rangpur Sadar (রংপুর সদর)',
  ],
};

export const FitGhorBdCheckoutSection: React.FC<FitGhorBdCheckoutSectionProps> = ({
  title,
  subtitle,
  isDark = false,
}) => {
  const [selectedBundleId, setSelectedBundleId] = useState<string>('starter_fat_burn_combo');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerWhatsappOrEmail, setCustomerWhatsappOrEmail] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Dhaka (ঢাকা)');
  const [selectedThana, setSelectedThana] = useState<string>('Dhanmondi (ধানমন্ডি)');
  const [streetAddress, setStreetAddress] = useState<string>('');
  const [preferredCourier, setPreferredCourier] = useState<'Steadfast' | 'Pathao' | 'RedX'>(
    'Steadfast'
  );
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [showApiPayload, setShowApiPayload] = useState<boolean>(false);

  const primaryTextColor = isDark ? '#F8FAFC' : '#0F172A';
  const subTextColor = isDark ? '#CBD5E1' : '#334155';

  const activeBundle = useMemo(
    () => HOME_GYM_BUNDLES.find((b) => b.id === selectedBundleId) || HOME_GYM_BUNDLES[0],
    [selectedBundleId]
  );

  const availableThanas = useMemo(
    () => BD_DISTRICT_THANA_MAP[selectedDistrict] || BD_DISTRICT_THANA_MAP['Dhaka (ঢাকা)'],
    [selectedDistrict]
  );

  const handleDistrictChange = (newDistrict: string) => {
    setSelectedDistrict(newDistrict);
    const firstThana = BD_DISTRICT_THANA_MAP[newDistrict]?.[0] || '';
    setSelectedThana(firstThana);
  };

  // Validate 11-digit BD phone number
  const cleanPhone = customerPhone.replace(/\D/g, '');
  const isValidBdPhone = /^01[3-9]\d{8}$/.test(cleanPhone);

  const isInsideDhaka = selectedDistrict.startsWith('Dhaka');
  const deliveryCharge =
    activeBundle.offerPrice >= 10000 ? 0 : isInsideDhaka ? 60 : 120;
  const totalPayable = activeBundle.offerPrice + deliveryCharge;

  const courierApiPayload = {
    merchant_id: 'FITGHOR_HOME_GYM_BD',
    courier_partner: preferredCourier,
    payment_method: 'CASH_ON_DELIVERY',
    bundle_id: activeBundle.id,
    bundle_title: activeBundle.nameEn,
    recipient: {
      full_name: customerName || 'তানভীর হাসান',
      phone_number: cleanPhone || '017XXXXXXXX',
      district: selectedDistrict,
      thana_upazila: selectedThana,
      street_house_address: streetAddress || 'বাসা ১২, রোড ৫, ব্লক বি',
    },
    digital_bonus_trigger: {
      status: 'AUTO_UNLOCK_ON_CONFIRM',
      pdf_guide: activeBundle.digitalBonus,
      delivery_channel: customerWhatsappOrEmail || cleanPhone || 'WhatsApp & SMS Link',
    },
    cod_breakdown_bdt: {
      bundle_price: activeBundle.offerPrice,
      shipping_fee: deliveryCharge,
      total_collectable_bdt: totalPayable,
    },
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidBdPhone || !customerName.trim() || !streetAddress.trim()) return;
    setOrderConfirmed(true);
  };

  return (
    <section
      id="fitghor-bd-checkout"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t"
      style={{
        backgroundColor: isDark ? '#0B0F17' : '#F8FAFC',
        borderColor: isDark ? '#1E293B' : '#E2E8F0',
        color: primaryTextColor,
      }}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-extrabold bg-[#F97316]/15 text-[#EA580C] dark:text-[#FB923C] border border-[#F97316]/35">
            <Truck size={14} />
            <span>BD-Optimized Single-Page Checkout · Steadfast, Pathao ও RedX কুরিয়ার ইন্টিগ্রেটেড</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            <EditableText
              id="fitghor_checkout_h2"
              defaultText={
                title ||
                'আপনার পছন্দের হোম জিম কম্বো বেছে নিন — অর্ডার কনফার্ম করলেই ফ্রি ওয়ার্কআউট প্ল্যান PDF তাৎক্ষণিক আনলক!'
              }
            />
          </h2>
          <p className="text-xs sm:text-sm font-medium leading-relaxed" style={{ color: subTextColor }}>
            <EditableText
              id="fitghor_checkout_sub"
              defaultText={
                subtitle ||
                'অগ্রিম ১ টাকাও দিতে হবে না। আপনার জেলা (District) এবং থানা/উপজেলা (Thana/Upazila) সিলেক্ট করে অর্ডার সম্পন্ন করুন—পণ্য হাতে পেয়ে ডেলিভারি ম্যানকে টাকা পরিশোধ করুন।'
              }
            />
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Bundle Selector + Instant Digital Bonus Trigger Preview */}
          <div className="lg:col-span-7 space-y-5">
            {HOME_GYM_BUNDLES.map((bundle) => {
              const isSelected = selectedBundleId === bundle.id;
              const savings = bundle.regularPrice - bundle.offerPrice;
              return (
                <div
                  key={bundle.id}
                  onClick={() => {
                    setSelectedBundleId(bundle.id);
                    setOrderConfirmed(false);
                  }}
                  className={`rounded-2xl p-5 border-2 transition cursor-pointer ${
                    isSelected ? 'shadow-xl' : 'opacity-85 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: isSelected
                      ? isDark
                        ? '#111827'
                        : '#FFFFFF'
                      : isDark
                      ? '#0F1522'
                      : '#F1F5F9',
                    borderColor: isSelected
                      ? '#F97316'
                      : isDark
                      ? '#1E293B'
                      : '#CBD5E1',
                  }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#F97316] text-white">
                      {bundle.badge}
                    </span>
                    <span className="text-xs font-extrabold text-[#059669] dark:text-[#10B981]">
                      সাশ্রয় ৳{savings} + ফ্রি ৩০ দিনের PDF রুটিন
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-base sm:text-lg font-black">{bundle.nameBn}</h3>
                      <p className="text-[11px] font-medium" style={{ color: subTextColor }}>
                        {bundle.nameEn}
                      </p>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <div className="text-xs line-through opacity-60">
                        রেগুলার: ৳{bundle.regularPrice}
                      </div>
                      <div className="text-2xl font-black text-[#F97316]">
                        ৳{bundle.offerPrice}
                      </div>
                    </div>
                  </div>

                  <div
                    className="space-y-1.5 mt-4 pt-3 border-t text-xs"
                    style={{ borderColor: isDark ? '#1E293B' : '#E2E8F0' }}
                  >
                    {bundle.itemsIncluded.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 font-medium">
                        <CheckCircle2
                          size={14}
                          className="text-[#F97316] shrink-0 mt-0.5"
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-extrabold text-[#059669] dark:text-[#10B981] flex items-center gap-2">
                    <FileText size={14} className="shrink-0" />
                    <span>ডিজিটাল বোনাস ট্রিগার: {bundle.digitalBonus}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right 5 Columns: BD-Optimized Checkout Form (Strict District + Thana/Upazila Split) */}
          <div className="lg:col-span-5">
            <div
              className="rounded-2xl p-6 border-2 shadow-2xl space-y-5 sticky top-24"
              style={{
                backgroundColor: isDark ? '#111827' : '#FFFFFF',
                borderColor: '#F97316',
              }}
            >
              <div
                className="border-b pb-4 space-y-1"
                style={{ borderColor: isDark ? '#1E293B' : '#E2E8F0' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#059669] dark:text-[#10B981] flex items-center gap-1">
                    <ShieldCheck size={14} />
                    <span>১০০% ক্যাশ অন ডেলিভারি চেকআউট</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowApiPayload(!showApiPayload)}
                    className="text-[11px] font-mono font-bold text-[#F97316] underline cursor-pointer flex items-center gap-1"
                  >
                    <Code2 size={12} />
                    <span>{showApiPayload ? 'ফর্ম দেখুন' : 'Courier JSON'}</span>
                  </button>
                </div>
                <h3 className="text-xl font-black">
                  কুরিয়ার ডেলিভারি ও ফ্রি PDF বোনাস ফর্ম
                </h3>
                <p className="text-xs font-medium" style={{ color: subTextColor }}>
                  Steadfast, Pathao ও RedX কুরিয়ারে দ্রুত ডেলিভারির জন্য নিচের জেলা ও থানা সিলেক্ট করুন:
                </p>
              </div>

              {showApiPayload ? (
                <div className="space-y-2">
                  <div className="text-xs font-mono font-bold text-[#F97316]">
                    // Steadfast / Pathao / RedX Split District &amp; Thana Payload
                  </div>
                  <pre className="p-3.5 rounded-xl bg-slate-950 text-emerald-400 text-[11px] font-mono overflow-x-auto border border-slate-800">
                    {JSON.stringify(courierApiPayload, null, 2)}
                  </pre>
                </div>
              ) : orderConfirmed ? (
                <div className="p-5 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-white space-y-3.5 text-center">
                  <PackageCheck size={38} className="text-[#10B981] mx-auto" />
                  <h4 className="text-lg font-black text-emerald-300">
                    অর্ডার কনফার্মড + আপনার ফ্রি ৩০ দিনের ওয়ার্কআউট PDF আনলক হয়েছে!
                  </h4>
                  <p className="text-xs opacity-90 leading-relaxed">
                    ধন্যবাদ <strong>{customerName}</strong>! আপনার অর্ডারটি{' '}
                    <strong>{preferredCourier} Courier</strong>-এর মাধ্যমে{' '}
                    <strong>
                      {selectedThana}, {selectedDistrict}
                    </strong>{' '}
                    ঠিকানায় পাঠানোর জন্য বুক করা হয়েছে।
                  </p>
                  <div className="p-3 rounded-xl bg-emerald-900/50 border border-emerald-400/30 text-left text-xs space-y-1">
                    <div className="font-extrabold text-amber-300 flex items-center gap-1.5">
                      <Sparkles size={14} />
                      <span>Instant Digital Bonus Triggered:</span>
                    </div>
                    <p className="text-[11px]">
                      ✓ <strong>{activeBundle.digitalBonus}</strong> আপনার{' '}
                      <strong>{customerWhatsappOrEmail || cleanPhone}</strong> নাম্বারে WhatsApp ও SMS লিংকে পাঠানো হয়েছে!
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 text-xs font-mono text-amber-400 font-bold">
                    ডেলিভারি ম্যানের কাছে পরিশোধযোগ্য: ৳{totalPayable} (Cash on Delivery)
                  </div>
                  <button
                    type="button"
                    onClick={() => setOrderConfirmed(false)}
                    className="text-xs font-bold text-amber-400 underline cursor-pointer"
                  >
                    নতুন আরেকটি অর্ডার করুন
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConfirmOrder} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-extrabold block">
                      আপনার পূর্ণ নাম (Full Name) *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="যেমন: রিয়াজ উদ্দিন / ফারহানা রহমান"
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-[#F97316]"
                      style={{
                        backgroundColor: isDark ? '#0B0F17' : '#F8FAFC',
                        borderColor: isDark ? '#334155' : '#CBD5E1',
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-extrabold block">
                        মোবাইল নাম্বার (১১ ডিজিট) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="017XXXXXXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono font-bold focus:outline-none focus:border-[#F97316]"
                        style={{
                          backgroundColor: isDark ? '#0B0F17' : '#F8FAFC',
                          borderColor:
                            customerPhone.length > 0
                              ? isValidBdPhone
                                ? '#10B981'
                                : '#F43F5E'
                              : isDark
                              ? '#334155'
                              : '#CBD5E1',
                        }}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-extrabold block">
                        WhatsApp / Email (ফ্রি PDF পেতে)
                      </label>
                      <input
                        type="text"
                        value={customerWhatsappOrEmail}
                        onChange={(e) => setCustomerWhatsappOrEmail(e.target.value)}
                        placeholder="WhatsApp বা Email"
                        className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-[#10B981]"
                        style={{
                          backgroundColor: isDark ? '#0B0F17' : '#F8FAFC',
                          borderColor: isDark ? '#334155' : '#CBD5E1',
                        }}
                      />
                    </div>
                  </div>

                  {customerPhone.length > 0 && !isValidBdPhone && (
                    <p className="text-[11px] text-rose-500 flex items-center gap-1 font-semibold">
                      <AlertCircle size={12} />
                      <span>সঠিক ১১ ডিজিটের বাংলাদেশী মোবাইল নাম্বার দিন (013–019)</span>
                    </p>
                  )}

                  {/* MANDATORY SPLIT ADDRESS FIELDS: 1. DISTRICT & 2. THANA/UPAZILA */}
                  <div className="p-3.5 rounded-xl border space-y-3 bg-[#F97316]/5 border-[#F97316]/30">
                    <div className="text-[11px] font-black text-[#EA580C] dark:text-[#FB923C] uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin size={13} />
                      <span>কুরিয়ার জোন (Steadfast / Pathao / RedX Split Address)</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-extrabold block">
                          ১. জেলা (District) *
                        </label>
                        <select
                          value={selectedDistrict}
                          onChange={(e) => handleDistrictChange(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border text-xs font-bold focus:outline-none focus:border-[#F97316] cursor-pointer"
                          style={{
                            backgroundColor: isDark ? '#0B0F17' : '#FFFFFF',
                            borderColor: isDark ? '#334155' : '#CBD5E1',
                            color: primaryTextColor,
                          }}
                        >
                          {Object.keys(BD_DISTRICT_THANA_MAP).map((dist) => (
                            <option key={dist} value={dist}>
                              {dist}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-extrabold block">
                          ২. থানা / উপজেলা (Thana/Upazila) *
                        </label>
                        <select
                          value={selectedThana}
                          onChange={(e) => setSelectedThana(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border text-xs font-bold focus:outline-none focus:border-[#F97316] cursor-pointer"
                          style={{
                            backgroundColor: isDark ? '#0B0F17' : '#FFFFFF',
                            borderColor: isDark ? '#334155' : '#CBD5E1',
                            color: primaryTextColor,
                          }}
                        >
                          {availableThanas.map((thana) => (
                            <option key={thana} value={thana}>
                              {thana}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold block">
                        বাসা/ফ্ল্যাট নং, রোড ও এলাকার বিস্তারিত ঠিকানা *
                      </label>
                      <input
                        type="text"
                        required
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder="যেমন: বাসা ১৮, রোড ৯/এ, ফ্ল্যাট ৪বি (মিনা বাজারের পাশে)"
                        className="w-full px-3.5 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:border-[#F97316]"
                        style={{
                          backgroundColor: isDark ? '#0B0F17' : '#FFFFFF',
                          borderColor: isDark ? '#334155' : '#CBD5E1',
                        }}
                      />
                    </div>
                  </div>

                  {/* Preferred Local Courier Selector */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-extrabold block">
                      পছন্দের কুরিয়ার সার্ভিস (Preferred Courier Partner)
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs font-extrabold">
                      {(['Steadfast', 'Pathao', 'RedX'] as const).map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setPreferredCourier(c)}
                          className={`py-2 px-2 rounded-lg border cursor-pointer ${
                            preferredCourier === c
                              ? 'border-[#F97316] bg-[#F97316]/15 text-[#EA580C] dark:text-[#FB923C]'
                              : 'opacity-70'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Order Cost Summary */}
                  <div
                    className="p-3.5 rounded-xl border space-y-1.5 text-xs"
                    style={{
                      backgroundColor: isDark ? '#0B0F17' : '#F8FAFC',
                      borderColor: isDark ? '#1E293B' : '#CBD5E1',
                    }}
                  >
                    <div className="flex justify-between">
                      <span className="font-semibold" style={{ color: subTextColor }}>
                        নির্বাচিত হোম জিম প্যাক:
                      </span>
                      <span className="font-extrabold text-[#F97316]">
                        ৳{activeBundle.offerPrice}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold" style={{ color: subTextColor }}>
                        ডেলিভারি চার্জ ({isInsideDhaka ? 'ঢাকা মেট্রো' : 'ঢাকার বাইরে'}):
                      </span>
                      <span className="font-extrabold text-[#059669] dark:text-[#10B981]">
                        {deliveryCharge === 0 ? 'ফ্রি ডেলিভারি (৳০)' : `৳${deliveryCharge}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px] text-[#059669] dark:text-[#10B981] font-bold">
                      <span>ডিজিটাল বোনাস (৩০ দিনের ওয়ার্কআউট PDF):</span>
                      <span>ফ্রি আনলক (৳০)</span>
                    </div>
                    <div
                      className="border-t pt-1.5 flex justify-between text-sm font-black"
                      style={{ borderColor: isDark ? '#1E293B' : '#CBD5E1' }}
                    >
                      <span>ডেলিভারি ম্যানকে পরিশোধযোগ্য মোট:</span>
                      <span className="text-[#F97316]">৳{totalPayable}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-xs sm:text-sm font-black text-white shadow-xl flex items-center justify-center gap-2 cursor-pointer transition hover:opacity-95"
                    style={{
                      background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                    }}
                  >
                    <ShoppingBag size={16} />
                    <span>অর্ডার কনফার্ম করুন ও ফ্রি PDF আনলক করুন (৳{totalPayable})</span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
