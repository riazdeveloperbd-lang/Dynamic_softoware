import React, { useState, useMemo } from 'react';
import {
  Gift,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Truck,
  ArrowRight,
  PackageCheck,
  Code2,
  Droplets,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface RoohDiscoveryKitCodSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

interface DiscoveryBundleOption {
  id: string;
  titleBn: string;
  titleEn: string;
  badge: string;
  vialsIncluded: string[];
  regularPrice: number;
  offerPrice: number;
  freeGift: string;
}

const DISCOVERY_BUNDLES: DiscoveryBundleOption[] = [
  {
    id: 'sunnah_oud_discovery_5',
    titleBn: 'প্যাক ১: শাহী সুন্নাহ ও উদ ডিসকভারি বক্স (৫টি ৩ মিলি টেস্টার ভায়াল — মোট ১৫ মিলি)',
    titleEn: 'Royal Sunnah & Oud 5-Vial Discovery Coffret (5 x 3ml Roll-On Vials)',
    badge: 'সবচেয়ে জনপ্রিয় · ব্লাইন্ড-বাই রিস্ক ফ্রি',
    vialsIncluded: [
      '১. কম্বোডিয়ান শাহী উদ আল-মালিকি (৩ মিলি)',
      '২. সৌদি তাইফ রোজ ও জাফরান (৩ মিলি)',
      '৩. মিশরীয় হোয়াইট তাহারা মাস্ক (৩ মিলি)',
      '৪. ব্লু ডি আরাবিয়া ফরাসি ক্লোন (৩ মিলি)',
      '৫. আমির আল উদ গোল্ড রিজার্ভ (৩ মিলি)',
    ],
    regularPrice: 1450,
    offerPrice: 990,
    freeGift: 'ফ্রি: পরবর্তী ফুল-সাইজ বোতলে ৳৩০০ ডিসকাউন্ট ভাউচার + তাসবিহ ও মখমলের পাউচ',
  },
  {
    id: 'executive_daily_combo_5',
    titleBn: 'প্যাক ২: কর্পোরেট ও ফ্রেশ ডিসাইনার ক্লোন বক্স (৫টি ৩ মিলি টেস্টার + ১টি পকেট স্প্রে)',
    titleEn: 'Corporate & French Inspired 5-Vial Kit + Free 20ml Halal Pocket Spray',
    badge: 'অফিস ও প্রতিদিনের ব্যবহারের সেরা প্যাক',
    vialsIncluded: [
      '১. ব্লু ডি আরাবিয়া (Bleu De Chanel Inspired)',
      '২. সিলভার ক্রিড রয়েল (Creed Aventus Inspired)',
      '৩. ব্যাকারাট রুজ আরাবিয়া (Saffron & Amberwood)',
      '৪. অ্যাকুয়া ডি জিও মেরিন ফ্রেশ (Aqua Marine)',
      '৫. কস্তুরী আল-তাহারা (White Musk)',
    ],
    regularPrice: 1750,
    offerPrice: 1250,
    freeGift: 'ফ্রি: ২০ মিলি নন-অ্যালকোহলিক পকেট স্প্রে + ফ্রি হোম ডেলিভারি',
  },
  {
    id: 'eid_majlis_bakhoor_gift',
    titleBn: 'প্যাক ৩: জুম্মা ও ঈদ রয়্যাল গিফট বক্স (২টি ৬ মিলি শাহী আতর + বাখুর ও গোল্ড বার্নার সেট)',
    titleEn: 'Royal Eid & Jummah Gift Hamper (2x 6ml Crystal Attars + Bakhoor & Electric Burner)',
    badge: 'বাবা, শ্বশুর বা প্রিয়জনকে সেরা সুন্নতি উপহার',
    vialsIncluded: [
      '১. শাহী উদ আল-মালিকি (৬ মিলি ক্রিস্টাল ডিপস্টিক বোতল)',
      '২. সৌদি তাইফ রোজ ও জাফরান (৬ মিলি ক্রিস্টাল বোতল)',
      '৩. বাখুর আল-মদিনা আগরউড চিপস (৫০ গ্রাম কৌটা)',
      '৪. গোল্ড প্লেটেড ইলেকট্রিক মাবখারা বার্নার ও চিমটি',
    ],
    regularPrice: 3100,
    offerPrice: 2290,
    freeGift: 'ফ্রি: প্রিমিয়াম গোল্ড-ফয়েল হার্ডকভার গিফট বক্স + কাস্টমাইজড শুভেচ্ছা কার্ড + ফ্রি ডেলিভারি',
  },
];

const CUSTOM_SCENT_CHOICES = [
  'কম্বোডিয়ান শাহী উদ (Oud Al-Maliki)',
  'সৌদি তাইফ রোজ ও জাফরান (Taif Rose)',
  'মিশরীয় হোয়াইট তাহারা মাস্ক (White Musk)',
  'ব্লু ডি আরাবিয়া (Bleu De Arabia)',
  'সিলভার ক্রিড রয়েল (Creed Inspired)',
  'ব্যাকারাট রুজ জাফরান (Baccarat Inspired)',
  'জান্নাতুল ফেরদৌস অরিজিনাল (Jannatul Ferdous)',
  'মহীশূর স্যান্ডালউড (Mysore Sandalwood)',
];

export const RoohDiscoveryKitCodSection: React.FC<RoohDiscoveryKitCodSectionProps> = ({
  title,
  subtitle,
  isDark = false,
}) => {
  const [selectedBundleId, setSelectedBundleId] = useState<string>('sunnah_oud_discovery_5');
  const [customFivePicks, setCustomFivePicks] = useState<string[]>(
    CUSTOM_SCENT_CHOICES.slice(0, 5)
  );
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [deliveryZone, setDeliveryZone] = useState<'dhaka' | 'outside_dhaka'>('dhaka');
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [orderSubmitted, setOrderSubmitted] = useState<boolean>(false);
  const [showCourierJson, setShowCourierJson] = useState<boolean>(false);

  const goldHeadingColor = isDark ? '#D4AF37' : '#8F620A';
  const primaryTextColor = isDark ? '#F9F6F0' : '#18130E';
  const subTextColor = isDark ? '#D2C5B4' : '#4A3B2C';

  const activeBundle = useMemo(
    () => DISCOVERY_BUNDLES.find((b) => b.id === selectedBundleId) || DISCOVERY_BUNDLES[0],
    [selectedBundleId]
  );

  const toggleCustomScent = (scent: string) => {
    if (customFivePicks.includes(scent)) {
      if (customFivePicks.length > 1) {
        setCustomFivePicks(customFivePicks.filter((s) => s !== scent));
      }
    } else if (customFivePicks.length < 5) {
      setCustomFivePicks([...customFivePicks, scent]);
    }
  };

  // Bangladesh 11-digit mobile validation
  const cleanPhone = customerPhone.replace(/\D/g, '');
  const isValidBdPhone = /^01[3-9]\d{8}$/.test(cleanPhone);

  const deliveryFee =
    activeBundle.offerPrice >= 1200 ? 0 : deliveryZone === 'dhaka' ? 60 : 110;
  const grandTotal = activeBundle.offerPrice + deliveryFee;

  const courierPayload = {
    merchant: 'ROOH_PERFUMERY_BD',
    order_type: 'HALAL_ATTAR_DISCOVERY_COD',
    bundle_id: activeBundle.id,
    bundle_name: activeBundle.titleEn,
    custom_tester_vials: customFivePicks,
    customer: {
      name: customerName || 'সম্মানিত গ্রাহক',
      phone: cleanPhone || '017XXXXXXXX',
      zone: deliveryZone === 'dhaka' ? 'Dhaka Metro (24h)' : 'Outside Dhaka (48h Steadfast)',
      address: customerAddress || 'বাসা/মসজিদ সংলগ্ন রোড ও থানা',
    },
    pricing_bdt: {
      regular_price: activeBundle.regularPrice,
      discounted_bundle_price: activeBundle.offerPrice,
      delivery_charge: deliveryFee,
      payable_cod_amount: grandTotal,
    },
    smell_test_guarantee: 'Allowed to smell tester strip in front of rider before paying',
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidBdPhone || !customerName.trim() || !customerAddress.trim()) return;
    setOrderSubmitted(true);
  };

  return (
    <section
      id="rooh-discovery-cod"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t"
      style={{
        backgroundColor: isDark ? '#0B0907' : '#FBF8F3',
        borderColor: isDark ? '#2A2218' : '#E2D6C3',
        color: primaryTextColor,
      }}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-extrabold border"
            style={{
              backgroundColor: isDark ? 'rgba(212, 175, 55, 0.14)' : '#F5EAD4',
              borderColor: isDark ? 'rgba(212, 175, 55, 0.4)' : '#D4AF37',
              color: goldHeadingColor,
            }}
          >
            <Gift size={14} />
            <span>Discovery Sample Kit &amp; Eid Gift Combos · ব্লাইন্ড-বাই রিস্ক ছাড়া ঘ্রাণ পরখ করুন</span>
          </div>
          <h2
            className="text-2xl sm:text-4xl font-black tracking-tight"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: primaryTextColor,
            }}
          >
            <EditableText
              id="rooh_discovery_h2"
              defaultText={
                title ||
                'অনলাইনে ঘ্রাণ না শুঁকে অর্ডার করতে দ্বিধা হচ্ছে? অর্ডার করুন ৫টি আতরের ডিসকভারি বক্স — মাত্র ৳৯৯০!'
              }
            />
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed font-medium" style={{ color: subTextColor }}>
            <EditableText
              id="rooh_discovery_sub"
              defaultText={
                subtitle ||
                'ব্লাইন্ড-বাই রিস্ক ছাড়াই আমাদের সবচেয়ে জনপ্রিয় ৫টি আতর (মোট ১৫ মিলি) বাসায় বসে পরখ করুন এবং পরবর্তী ফুল-সাইজ অর্ডারে পান ৩০০ টাকা ডিসকাউন্ট ভাউচার।'
              }
            />
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Discovery Bundles + Custom 5-Vial Mix & Match Picker */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              {DISCOVERY_BUNDLES.map((bundle) => {
                const isSelected = selectedBundleId === bundle.id;
                const savings = bundle.regularPrice - bundle.offerPrice;
                return (
                  <div
                    key={bundle.id}
                    onClick={() => {
                      setSelectedBundleId(bundle.id);
                      setOrderSubmitted(false);
                    }}
                    className={`rounded-2xl p-5 border-2 transition cursor-pointer ${
                      isSelected ? 'shadow-xl' : 'opacity-85 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor: isSelected
                        ? isDark
                          ? '#18130D'
                          : '#FFFFFF'
                        : isDark
                        ? '#120E0A'
                        : '#F4ECE0',
                      borderColor: isSelected
                        ? '#D4AF37'
                        : isDark
                        ? '#2C2319'
                        : '#DECDB4',
                    }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#D4AF37] text-[#0B0907]">
                        {bundle.badge}
                      </span>
                      <span className="text-xs font-extrabold text-[#059669]">
                        সাশ্রয় ৳{savings} + {bundle.offerPrice >= 1200 ? 'ফ্রি ডেলিভারি' : 'ভাউচার গিফট'}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="text-base sm:text-lg font-black">{bundle.titleBn}</h3>
                        <p className="text-[11px] font-medium" style={{ color: subTextColor }}>
                          {bundle.titleEn}
                        </p>
                      </div>
                      <div className="text-left sm:text-right shrink-0">
                        <div className="text-xs line-through opacity-60">
                          রেগুলার: ৳{bundle.regularPrice}
                        </div>
                        <div
                          className="text-2xl font-black"
                          style={{ color: goldHeadingColor }}
                        >
                          ৳{bundle.offerPrice}
                        </div>
                      </div>
                    </div>

                    <div
                      className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-4 pt-3 border-t text-xs"
                      style={{ borderColor: isDark ? '#2C2319' : '#E5D8C3' }}
                    >
                      {bundle.vialsIncluded.map((vial, i) => (
                        <div key={i} className="flex items-center gap-1.5 font-medium">
                          <CheckCircle2
                            size={13}
                            className="shrink-0"
                            style={{ color: goldHeadingColor }}
                          />
                          <span>{vial}</span>
                        </div>
                      ))}
                    </div>

                    <div
                      className="mt-3 px-3 py-2 rounded-xl border text-[11px] font-extrabold"
                      style={{
                        backgroundColor: isDark ? 'rgba(212, 175, 55, 0.14)' : '#FDF7E7',
                        borderColor: isDark ? 'rgba(212, 175, 55, 0.3)' : '#D4AF37',
                        color: isDark ? '#F5E6C8' : '#6E4B07',
                      }}
                    >
                      🎁 {bundle.freeGift}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Mix & Match 5 Tester Vials Customizer */}
            <div
              className="rounded-2xl p-5 border space-y-3"
              style={{
                backgroundColor: isDark ? '#14100C' : '#F4ECE0',
                borderColor: isDark ? '#3A2E21' : '#D6C4A9',
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span
                    className="text-[11px] font-extrabold uppercase tracking-wider block"
                    style={{ color: goldHeadingColor }}
                  >
                    Mix &amp; Match Your 5 Tester Vials · নিজের পছন্দমতো ৫টি সুবাস বেছে নিন
                  </span>
                  <h4 className="text-sm font-black">
                    আপনার ডিসকভারি বক্সে কোন ৫টি আতর টেস্ট করতে চান? ({customFivePicks.length}/5 নির্বাচিত)
                  </h4>
                </div>
                <span
                  className="px-2.5 py-1 rounded-lg text-xs font-mono font-extrabold"
                  style={{
                    backgroundColor: isDark ? 'rgba(212, 175, 55, 0.2)' : '#EFE2C6',
                    color: goldHeadingColor,
                  }}
                >
                  {customFivePicks.length} / 5 Selected
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {CUSTOM_SCENT_CHOICES.map((scent) => {
                  const picked = customFivePicks.includes(scent);
                  return (
                    <button
                      key={scent}
                      type="button"
                      onClick={() => toggleCustomScent(scent)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 ${
                        picked ? 'text-[#0B0907]' : 'opacity-85 hover:opacity-100'
                      }`}
                      style={{
                        backgroundColor: picked ? '#D4AF37' : isDark ? '#1C1610' : '#FFFFFF',
                        borderColor: picked
                          ? '#B38600'
                          : isDark
                          ? '#2E241A'
                          : '#D6C4A9',
                      }}
                    >
                      <Droplets size={12} />
                      <span>{scent}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 5 Columns: 1-Click Cash on Delivery Checkout Form */}
          <div className="lg:col-span-5">
            <div
              className="rounded-2xl p-6 border-2 shadow-2xl space-y-5 sticky top-24"
              style={{
                backgroundColor: isDark ? '#15110C' : '#FFFFFF',
                borderColor: '#D4AF37',
              }}
            >
              <div
                className="border-b pb-4 space-y-1"
                style={{ borderColor: isDark ? '#2C2319' : '#E5D8C3' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#059669] flex items-center gap-1">
                    <ShieldCheck size={14} />
                    <span>১০০% ক্যাশ অন ডেলিভারি · ১ টাকাও অগ্রিম লাগবে না</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowCourierJson(!showCourierJson)}
                    className="text-[11px] font-mono font-bold underline cursor-pointer flex items-center gap-1"
                    style={{ color: goldHeadingColor }}
                  >
                    <Code2 size={12} />
                    <span>{showCourierJson ? 'ফর্ম দেখুন' : 'API Payload'}</span>
                  </button>
                </div>
                <h3
                  className="text-xl font-black"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  মাত্র ৩০ সেকেন্ডে আপনার অর্ডার কনফার্ম করুন
                </h3>
                <p className="text-xs font-medium" style={{ color: subTextColor }}>
                  পার্চেজের পর আমাদের পারফিউম কনসালটেন্ট ফোনে কল করে আপনার পছন্দের ৫টি ভায়াল কনফার্ম করবেন।
                </p>
              </div>

              {showCourierJson ? (
                <div className="space-y-2">
                  <div className="text-xs font-mono font-bold" style={{ color: goldHeadingColor }}>
                    // Live Steadfast / Pathao Courier Dispatch Payload
                  </div>
                  <pre className="p-3.5 rounded-xl bg-black/90 text-emerald-400 text-[11px] font-mono overflow-x-auto border border-[#2C2319]">
                    {JSON.stringify(courierPayload, null, 2)}
                  </pre>
                </div>
              ) : orderSubmitted ? (
                <div className="p-5 rounded-2xl bg-emerald-950/90 border border-emerald-500/40 space-y-3 text-center text-white">
                  <PackageCheck size={36} className="text-[#10B981] mx-auto" />
                  <h4 className="text-lg font-black text-emerald-300">
                    আলহামদুলিল্লাহ! আপনার অর্ডারটি সফলভাবে গৃহীত হয়েছে
                  </h4>
                  <p className="text-xs opacity-90 leading-relaxed">
                    ধন্যবাদ <strong>{customerName}</strong>! আপনার{' '}
                    <strong>{activeBundle.titleBn}</strong> প্যাকটি আমাদের অ্যাটেলিয়ার থেকে এয়ারটাইট ভেলভেট বক্সে প্যাক করা হচ্ছে। আগামী ১৫ মিনিটের মধ্যে আমাদের প্রতিনিধি{' '}
                    <strong>{cleanPhone}</strong> নাম্বারে কল করে ডেলিভারি কনফার্ম করবেন।
                  </p>
                  <div className="p-3 rounded-xl bg-black/40 text-xs font-mono text-[#D4AF37]">
                    ডেলিভারি ম্যানের কাছে পরিশোধযোগ্য: ৳{grandTotal} (Cash on Delivery)
                  </div>
                  <button
                    type="button"
                    onClick={() => setOrderSubmitted(false)}
                    className="text-xs font-bold text-[#D4AF37] underline cursor-pointer"
                  >
                    অন্য আরেকটি প্যাক অর্ডার করুন
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConfirmOrder} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold block">
                      আপনার পূর্ণ নাম (Full Name) *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="যেমন: তানভীর আহমেদ / মাওলানা আব্দুল্লাহ"
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-[#D4AF37]"
                      style={{
                        backgroundColor: isDark ? '#0E0B08' : '#F9F6F0',
                        borderColor: isDark ? '#2E241A' : '#D6C4A9',
                      }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold block">
                      ১১ ডিজিটের সচল মোবাইল নাম্বার (Mobile Number) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono font-bold focus:outline-none focus:border-[#D4AF37]"
                      style={{
                        backgroundColor: isDark ? '#0E0B08' : '#F9F6F0',
                        borderColor:
                          customerPhone.length > 0
                            ? isValidBdPhone
                              ? '#10B981'
                              : '#F43F5E'
                            : isDark
                            ? '#2E241A'
                            : '#D6C4A9',
                      }}
                    />
                    {customerPhone.length > 0 && !isValidBdPhone && (
                      <p className="text-[11px] text-rose-500 flex items-center gap-1 font-semibold">
                        <AlertCircle size={12} />
                        <span>সঠিক ১১ ডিজিটের বাংলাদেশী নাম্বার দিন (যেমন: 01712345678)</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold block">
                      ডেলিভারি এরিয়া নির্বাচন করুন (Delivery Area)
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setDeliveryZone('dhaka')}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-extrabold cursor-pointer ${
                          deliveryZone === 'dhaka' ? 'ring-2 ring-[#D4AF37]' : 'opacity-75'
                        }`}
                        style={{
                          backgroundColor: isDark ? '#0E0B08' : '#F9F6F0',
                          borderColor:
                            deliveryZone === 'dhaka'
                              ? '#D4AF37'
                              : isDark
                              ? '#2E241A'
                              : '#D6C4A9',
                          color: deliveryZone === 'dhaka' ? goldHeadingColor : primaryTextColor,
                        }}
                      >
                        ঢাকা সিটি (২৪ ঘণ্টা)
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliveryZone('outside_dhaka')}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-extrabold cursor-pointer ${
                          deliveryZone === 'outside_dhaka'
                            ? 'ring-2 ring-[#D4AF37]'
                            : 'opacity-75'
                        }`}
                        style={{
                          backgroundColor: isDark ? '#0E0B08' : '#F9F6F0',
                          borderColor:
                            deliveryZone === 'outside_dhaka'
                              ? '#D4AF37'
                              : isDark
                              ? '#2E241A'
                              : '#D6C4A9',
                          color:
                            deliveryZone === 'outside_dhaka'
                              ? goldHeadingColor
                              : primaryTextColor,
                        }}
                      >
                        ঢাকার বাইরে (৪৮ ঘণ্টা)
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold block">
                      সম্পূর্ণ ঠিকানা (বাসা/রোড/মসজিদ/থানা ও জেলা) *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="যেমন: বাসা ১৪, রোড ৭, ধানমন্ডি (বাইতুল আমান মসজিদের পাশে), ঢাকা"
                      className="w-full px-3.5 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:border-[#D4AF37]"
                      style={{
                        backgroundColor: isDark ? '#0E0B08' : '#F9F6F0',
                        borderColor: isDark ? '#2E241A' : '#D6C4A9',
                      }}
                    />
                  </div>

                  {/* Live Order Breakdown */}
                  <div
                    className="p-3.5 rounded-xl border space-y-1.5 text-xs"
                    style={{
                      backgroundColor: isDark ? '#0E0B08' : '#F4ECE0',
                      borderColor: isDark ? '#2E241A' : '#D6C4A9',
                    }}
                  >
                    <div className="flex justify-between">
                      <span className="font-semibold" style={{ color: subTextColor }}>
                        নির্বাচিত প্যাক:
                      </span>
                      <span className="font-extrabold" style={{ color: goldHeadingColor }}>
                        ৳{activeBundle.offerPrice}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold" style={{ color: subTextColor }}>
                        হোম ডেলিভারি চার্জ:
                      </span>
                      <span className="font-extrabold text-[#059669]">
                        {deliveryFee === 0 ? 'ফ্রি ডেলিভারি (৳০)' : `৳${deliveryFee}`}
                      </span>
                    </div>
                    <div
                      className="border-t pt-1.5 flex justify-between text-sm font-black"
                      style={{ borderColor: isDark ? '#2C2319' : '#DECDB4' }}
                    >
                      <span>ডেলিভারি ম্যানকে পরিশোধযোগ্য মোট:</span>
                      <span style={{ color: goldHeadingColor }}>৳{grandTotal}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-xs sm:text-sm font-black text-[#0B0907] shadow-xl flex items-center justify-center gap-2 cursor-pointer transition hover:opacity-95"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #F5E6C8 50%, #C59B27 100%)',
                    }}
                  >
                    <ShoppingBag size={16} />
                    <span>অর্ডার কনফার্ম করুন — ক্যাশ অন ডেলিভারি (৳{grandTotal})</span>
                    <ArrowRight size={15} />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] font-medium text-center">
                    <Truck size={13} className="shrink-0" style={{ color: goldHeadingColor }} />
                    <span>প্যাকেট খুলে টেস্টার স্ট্রিপে ঘ্রাণ চেক করে রাইডারকে পেমেন্ট করুন</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
