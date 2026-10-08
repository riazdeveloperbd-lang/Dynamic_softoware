import React, { useState, useMemo } from 'react';
import {
  Gift,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Truck,
  Sparkles,
  Heart,
  MapPin,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface SmartBabuGiftBundlesCodSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

interface GiftBundleOption {
  id: string;
  titleBn: string;
  occasionTag: string;
  ageRange: string;
  itemsIncluded: string[];
  priceBdt: number;
  regularPriceBdt: number;
  savingsLabel: string;
}

const GIFT_BUNDLES: GiftBundleOption[] = [
  {
    id: 'bundle_toddler_genius',
    titleBn: '১. টডলার স্ক্রিন-ফ্রি জিনিয়াস কম্বো (১–৫ বছর বেস্ট সেলার)',
    occasionTag: 'জন্মদিন ও প্রতিদিনের লার্নিং প্যাক',
    ageRange: '১ – ৫ বছর',
    itemsIncluded: [
      '৩-ইন-১ বাংলা, ইংরেজি ও আরবি রিকার্জেবল টকিং অডিও বুক (২৮ পৃষ্ঠা)',
      'মন্টেসরি ৬-ইন-১ ন্যাচারাল কাঠের শেপ সর্টার ও ম্যাগনেটিক ফিশিং পাজল',
      'ফ্রি: ৪-বুক রি-ইউজেবল ম্যাজিক হ্যান্ডরাইটিং সেট + সিলিকন পেন গ্রিপার',
    ],
    priceBdt: 2390,
    regularPriceBdt: 3190,
    savingsLabel: '৳৮০০ সাশ্রয় + ফ্রি ডেলিভারি',
  },
  {
    id: 'bundle_newborn_akika',
    titleBn: '২. নবজাতক ও আকিকা রয়েল কেয়ার গিফট বক্স (০–১২ মাস)',
    occasionTag: 'আকিকা (Akika) ও বেবি শাওয়ার স্পেশাল',
    ageRange: '০ – ১২ মাস',
    itemsIncluded: [
      'জার্মান মেডিকেল-গ্রেড PPSU অ্যান্টি-কলিক ফিডিং বোতল টুইন প্যাক',
      '৫-পিস ১০০% অর্গানিক মসলিন কটন রমপার ও সোয়াডল সেট',
      'ফুড-গ্রেড সিলিকন টিদার ও র‍্যাটল সেট (100% BPA Free)',
    ],
    priceBdt: 2190,
    regularPriceBdt: 2950,
    savingsLabel: '৳৭৬০ সাশ্রয় + আকিকা গিফট কার্ড',
  },
  {
    id: 'bundle_single_talking_book',
    titleBn: '৩. সিঙ্গেল ৩-ইন-১ বাংলা/ইংরেজি/আরবি টকিং অডিও বুক',
    occasionTag: 'ট্রায়াল স্টার্টার প্যাক',
    ageRange: '১.৫ – ৬ বছর',
    itemsIncluded: [
      '২৮ পৃষ্ঠার ওয়াটারপ্রুফ রিকার্জেবল অডিও বুক + ম্যাজিক সাউন্ড পেন',
      'USB চার্জিং ক্যাবল ও ১ বছরের ফ্রি রিপ্লেসমেন্ট ওয়ারেন্টি কার্ড',
    ],
    priceBdt: 1390,
    regularPriceBdt: 1850,
    savingsLabel: '৳৪৬০ সাশ্রয়',
  },
];

const DHAKA_THANAS = [
  'ধানমন্ডি (Dhanmondi)',
  'গুলশান / বনানী (Gulshan / Banani)',
  'উত্তরা (Uttara)',
  'মিরপুর (Mirpur)',
  'মোহাম্মদপুর (Mohammadpur)',
  'বসুন্ধরা আবাসিক (Bashundhara R/A)',
  'বাড্ডা / রামপুরা (Badda / Rampura)',
  'মতিঝিল / খিলগাঁও (Motijheel / Khilgaon)',
];

const OUTSIDE_DISTRICTS = [
  'চট্টগ্রাম (Chattogram)',
  'সিলেট (Sylhet)',
  'রাজশাহী (Rajshahi)',
  'খুলনা (Khulna)',
  'গাজীপুর (Gazipur)',
  'নারায়ণগঞ্জ (Narayanganj)',
  'কুমিল্লা (Cumilla)',
  'বগুড়া (Bogura)',
];

export const SmartBabuGiftBundlesCodSection: React.FC<SmartBabuGiftBundlesCodSectionProps> = ({
  title,
  subtitle,
  isDark = false,
}) => {
  const [selectedBundleId, setSelectedBundleId] = useState<string>('bundle_toddler_genius');
  const [enableGiftWrap, setEnableGiftWrap] = useState<boolean>(true);
  const [giftOccasion, setGiftOccasion] = useState<string>('জন্মদিনের উপহার (Birthday Gift)');
  const [babyNameOnCard, setBabyNameOnCard] = useState<string>('');
  const [customWishNote, setCustomWishNote] = useState<string>(
    'দোয়া ও ভালোবাসা রইলো সোনামণির জন্য! অনেক বড় হও।'
  );

  const [parentName, setParentName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [deliveryZone, setDeliveryZone] = useState<'inside_dhaka' | 'outside_dhaka'>('inside_dhaka');
  const [selectedArea, setSelectedArea] = useState<string>(DHAKA_THANAS[0]);
  const [streetAddress, setStreetAddress] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [orderSubmitted, setOrderSubmitted] = useState<boolean>(false);

  const activeBundle = useMemo(
    () => GIFT_BUNDLES.find((b) => b.id === selectedBundleId) || GIFT_BUNDLES[0],
    [selectedBundleId]
  );

  const giftWrapFee = enableGiftWrap ? 90 : 0;
  const deliveryFee =
    activeBundle.priceBdt >= 2000 ? 0 : deliveryZone === 'inside_dhaka' ? 70 : 120;
  const grandTotal = activeBundle.priceBdt + giftWrapFee + deliveryFee;

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedPhone = phone.replace(/[\s-]/g, '');
    const bdPhoneRegex = /^01[3-9]\d{8}$/;

    if (!parentName.trim()) {
      setFormError('অনুগ্রহ করে অভিভাবক বা প্রেরকের নাম লিখুন।');
      return;
    }
    if (!bdPhoneRegex.test(cleanedPhone)) {
      setFormError('সঠিক ১১ ডিজিটের বাংলাদেশি মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)।');
      return;
    }
    if (!streetAddress.trim()) {
      setFormError('বাসা/ফ্ল্যাট নম্বর ও রাস্তার বিস্তারিত ঠিকানা লিখুন।');
      return;
    }

    setFormError(null);
    setOrderSubmitted(true);
  };

  return (
    <section
      id="smartbabu-gift-checkout"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t"
      style={{
        backgroundColor: isDark ? '#0B111E' : '#FFFDF9',
        borderColor: isDark ? '#1E293B' : '#E2E8F0',
        color: isDark ? '#F8FAFC' : '#0F172A',
      }}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Heading */}
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-[#F97316]/15 text-[#EA580C]">
            <Gift size={14} />
            <span>Curated Gift Bundles &amp; Gift-Wrap Checkout (আকিকা, জন্মদিন ও বেবি শাওয়ার)</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-black tracking-tight"
            style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}
          >
            <EditableText
              id="smartbabu_checkout_h2"
              defaultText={
                title ||
                'সোনামণির জন্মদিন বা আকিকার সেরা উপহার — প্রিমিয়াম গিফট র‍্যাপিং ও ১-ক্লিক ক্যাশ অন ডেলিভারি!'
              }
            />
          </h2>
          <p
            className="text-xs sm:text-sm leading-relaxed"
            style={{ color: isDark ? '#94A3B8' : '#475569' }}
          >
            <EditableText
              id="smartbabu_checkout_sub"
              defaultText={
                subtitle ||
                'অগ্রিম ১ টাকাও দিতে হবে না। ডেলিভারি ম্যানের সামনে বক্স খুলে প্রোডাক্টের কোয়ালিটি ও অডিও বুকের সাউন্ড চেক করে মূল্য পরিশোধ করুন।'
              }
            />
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols): Bundle Selector + Interactive Gift Wrap Toggle */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-base font-black flex items-center gap-2">
              <Sparkles size={16} className="text-[#0D9488]" />
              <span>ধাপ ১: আপনার পছন্দের প্যাক বা গিফট বান্ডেল সিলেক্ট করুন</span>
            </h3>

            <div className="space-y-3.5">
              {GIFT_BUNDLES.map((bundle) => {
                const isSelected = selectedBundleId === bundle.id;
                return (
                  <div
                    key={bundle.id}
                    onClick={() => setSelectedBundleId(bundle.id)}
                    className={`p-5 rounded-3xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#0D9488] bg-teal-500/8 shadow-md'
                        : isDark
                        ? 'border-slate-800 bg-[#131C2E] hover:border-slate-700'
                        : 'border-slate-200 bg-white hover:border-teal-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0D9488] text-white">
                            {bundle.occasionTag}
                          </span>
                          <span className="text-[11px] font-bold text-[#EA580C]">
                            বয়স: {bundle.ageRange}
                          </span>
                        </div>
                        <h4
                          className="text-sm sm:text-base font-black"
                          style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}
                        >
                          {bundle.titleBn}
                        </h4>
                      </div>

                      <div className="sm:text-right shrink-0">
                        <div className="text-xl font-black text-[#0D9488] dark:text-teal-400">
                          ৳{bundle.priceBdt.toLocaleString('bn-BD')}
                        </div>
                        <div className="text-[11px] line-through opacity-55">
                          ৳{bundle.regularPriceBdt.toLocaleString('bn-BD')}
                        </div>
                        <span className="inline-block text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
                          {bundle.savingsLabel}
                        </span>
                      </div>
                    </div>

                    <ul className="mt-3 pt-3 border-t border-slate-200/70 dark:border-slate-800 space-y-1.5">
                      {bundle.itemsIncluded.map((item) => (
                        <li
                          key={item}
                          className="text-xs flex items-start gap-2"
                          style={{ color: isDark ? '#CBD5E1' : '#334155' }}
                        >
                          <CheckCircle2 size={14} className="text-[#0D9488] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Required Feature: "Gift Wrap" Toggle at Checkout */}
            <div
              className="rounded-3xl border-2 p-5 sm:p-6 space-y-4"
              style={{
                backgroundColor: isDark ? '#161F33' : '#FFF7ED',
                borderColor: enableGiftWrap ? '#F97316' : isDark ? '#1E293B' : '#FED7AA',
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableGiftWrap}
                    onChange={(e) => setEnableGiftWrap(e.target.checked)}
                    className="mt-1 w-5 h-5 accent-[#F97316] rounded cursor-pointer"
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="text-sm sm:text-base font-black"
                        style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}
                      >
                        🎁 প্রিমিয়াম গিফট র‍্যাপিং ও বাবুর নামে উইশ কার্ড যুক্ত করুন (+৳৯০)
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#F97316] text-white">
                        POPULAR FOR GIFTS
                      </span>
                    </div>
                    <p
                      className="text-xs mt-1"
                      style={{ color: isDark ? '#CBD5E1' : '#475569' }}
                    >
                      আকিকা, জন্মদিন বা খালা-ফুপি-মামার পক্ষ থেকে উপহার পাঠানোর জন্য স্যাটিন রিবন র‍্যাপিং ও হ্যান্ডরাইটেন গ্রিটিং কার্ড।
                    </p>
                  </div>
                </label>
              </div>

              {enableGiftWrap && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-orange-200/60 dark:border-slate-700">
                  <div>
                    <label className="block text-[11px] font-extrabold mb-1">
                      উপলক্ষ নির্বাচন করুন (Occasion):
                    </label>
                    <select
                      value={giftOccasion}
                      onChange={(e) => setGiftOccasion(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border text-xs font-bold focus:outline-none"
                      style={{
                        backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
                        borderColor: isDark ? '#334155' : '#FED7AA',
                      }}
                    >
                      <option>জন্মদিনের উপহার (Birthday Gift)</option>
                      <option>আকিকা মোবারক (Akika Ceremony)</option>
                      <option>নবজাতক বরণ / বেবি শাওয়ার (Newborn Welcome)</option>
                      <option>হাতেখড়ি ও প্রি-স্কুল উপহার</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold mb-1">
                      কার্ডে সোনামণির নাম (Optional):
                    </label>
                    <input
                      type="text"
                      value={babyNameOnCard}
                      onChange={(e) => setBabyNameOnCard(e.target.value)}
                      placeholder="যেমন: আদরের আয়ান / ছোট্ট আরিবা"
                      className="w-full px-3 py-2 rounded-xl border text-xs font-semibold focus:outline-none"
                      style={{
                        backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
                        borderColor: isDark ? '#334155' : '#FED7AA',
                      }}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-extrabold mb-1">
                      গিফট কার্ডের শুভেচ্ছা বার্তা (Personalized Note):
                    </label>
                    <input
                      type="text"
                      value={customWishNote}
                      onChange={(e) => setCustomWishNote(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border text-xs font-semibold focus:outline-none"
                      style={{
                        backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
                        borderColor: isDark ? '#334155' : '#FED7AA',
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (5 cols): 1-Click BD COD Checkout Form */}
          <div className="lg:col-span-5">
            <div
              className="rounded-3xl border-2 p-6 space-y-5 shadow-xl"
              style={{
                backgroundColor: isDark ? '#131C2E' : '#FFFFFF',
                borderColor: '#0D9488',
              }}
            >
              <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0D9488]">
                    ১০০% নিরাপদ ক্যাশ অন ডেলিভারি
                  </span>
                  <h3
                    className="text-lg font-black"
                    style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}
                  >
                    অর্ডার কনফার্মেশন ফর্ম
                  </h3>
                </div>
                <ShieldCheck size={24} className="text-[#0D9488]" />
              </div>

              {orderSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3 text-center">
                  <CheckCircle2 size={38} className="text-emerald-500 mx-auto" />
                  <h4 className="text-base font-black text-emerald-700 dark:text-emerald-300">
                    অভিনন্দন {parentName}! সোনামণির অর্ডারটি কনফার্ম হয়েছে!
                  </h4>
                  <p className="text-xs leading-relaxed opacity-85">
                    আমাদের কাস্টমার কেয়ার প্রতিনিধি ১৫ মিনিটের মধ্যে আপনার <strong>{phone}</strong> নম্বরে কল করে অর্ডার ও গিফট নোট ভেরিফাই করবেন।
                  </p>
                  {enableGiftWrap && (
                    <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900 text-[11px] font-bold text-[#EA580C]">
                      🎁 গিফট র‍্যাপ যুক্ত হয়েছে ({giftOccasion}): “{customWishNote}”
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setOrderSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-[#0D9488] text-white text-xs font-extrabold cursor-pointer"
                  >
                    নতুন অর্ডার করুন
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConfirmOrder} className="space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold mb-1">
                      মা / বাবা বা প্রেরকের নাম *
                    </label>
                    <input
                      type="text"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="আপনার পূর্ণ নাম লিখুন"
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none"
                      style={{
                        backgroundColor: isDark ? '#0F172A' : '#F8FAFC',
                        borderColor: isDark ? '#334155' : '#CBD5E1',
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold mb-1">
                      ১১ ডিজিটের মোবাইল নম্বর (BD Phone) *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none"
                      style={{
                        backgroundColor: isDark ? '#0F172A' : '#F8FAFC',
                        borderColor: isDark ? '#334155' : '#CBD5E1',
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setDeliveryZone('inside_dhaka');
                        setSelectedArea(DHAKA_THANAS[0]);
                      }}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-extrabold cursor-pointer ${
                        deliveryZone === 'inside_dhaka'
                          ? 'border-[#0D9488] bg-teal-500/15 text-[#0D9488] dark:text-teal-300'
                          : 'border-slate-200 dark:border-slate-800 opacity-75'
                      }`}
                    >
                      ঢাকা সিটি (২৪ ঘণ্টা)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDeliveryZone('outside_dhaka');
                        setSelectedArea(OUTSIDE_DISTRICTS[0]);
                      }}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-extrabold cursor-pointer ${
                        deliveryZone === 'outside_dhaka'
                          ? 'border-[#0D9488] bg-teal-500/15 text-[#0D9488] dark:text-teal-300'
                          : 'border-slate-200 dark:border-slate-800 opacity-75'
                      }`}
                    >
                      ঢাকার বাইরে (৪৮ ঘণ্টা)
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold mb-1 flex items-center gap-1">
                      <MapPin size={12} className="text-[#0D9488]" />
                      <span>
                        {deliveryZone === 'inside_dhaka' ? 'থানা / এলাকা সিলেক্ট করুন' : 'জেলা সিলেক্ট করুন'}
                      </span>
                    </label>
                    <select
                      value={selectedArea}
                      onChange={(e) => setSelectedArea(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none"
                      style={{
                        backgroundColor: isDark ? '#0F172A' : '#F8FAFC',
                        borderColor: isDark ? '#334155' : '#CBD5E1',
                      }}
                    >
                      {(deliveryZone === 'inside_dhaka' ? DHAKA_THANAS : OUTSIDE_DISTRICTS).map(
                        (area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold mb-1">
                      বাসা/ফ্ল্যাট ও রোড নম্বর (বিস্তারিত ঠিকানা) *
                    </label>
                    <input
                      type="text"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="যেমন: বাসা ১২, রোড ৫, ব্লক সি..."
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none"
                      style={{
                        backgroundColor: isDark ? '#0F172A' : '#F8FAFC',
                        borderColor: isDark ? '#334155' : '#CBD5E1',
                      }}
                    />
                  </div>

                  {/* Order Summary Box */}
                  <div
                    className="p-4 rounded-2xl border space-y-2 text-xs"
                    style={{
                      backgroundColor: isDark ? '#0F172A' : '#F0FDFA',
                      borderColor: isDark ? '#1E293B' : '#CCFBF1',
                    }}
                  >
                    <div className="flex justify-between font-bold">
                      <span className="truncate pr-2">{activeBundle.titleBn}</span>
                      <span>৳{activeBundle.priceBdt.toLocaleString('bn-BD')}</span>
                    </div>
                    {enableGiftWrap && (
                      <div className="flex justify-between text-[#EA580C] font-bold">
                        <span>🎁 প্রিমিয়াম গিফট র‍্যাপিং ও উইশ কার্ড</span>
                        <span>+৳৯০</span>
                      </div>
                    )}
                    <div className="flex justify-between opacity-80">
                      <span>হোম ডেলিভারি চার্জ</span>
                      <span>
                        {deliveryFee === 0 ? (
                          <strong className="text-emerald-600">ফ্রি (FREE)</strong>
                        ) : (
                          `৳${deliveryFee}`
                        )}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-teal-500/20 flex justify-between text-sm font-black">
                      <span>সর্বমোট প্রদেয় (পণ্য হাতে পেয়ে):</span>
                      <span className="text-[#0D9488] dark:text-teal-400">
                        ৳{grandTotal.toLocaleString('bn-BD')}
                      </span>
                    </div>
                  </div>

                  {formError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-bold flex items-center gap-2">
                      <AlertCircle size={15} />
                      <span>{formError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl text-xs sm:text-sm font-black text-white shadow-lg flex items-center justify-center gap-2 transition hover:opacity-95 cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                    }}
                  >
                    <ShoppingBag size={17} />
                    <span>অর্ডার কনফার্ম করুন — ক্যাশ অন ডেলিভারি</span>
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[11px] font-bold opacity-75 pt-1">
                    <span className="flex items-center gap-1">
                      <Truck size={13} className="text-[#0D9488]" /> ৭ দিনের সহজ এক্সচেঞ্জ
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart size={13} className="text-[#F97316]" /> ১০০% নন-টক্সিক গ্যারান্টি
                    </span>
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
