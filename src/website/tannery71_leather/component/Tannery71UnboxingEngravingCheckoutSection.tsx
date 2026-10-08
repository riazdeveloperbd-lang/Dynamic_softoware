import React, { useState, useMemo } from 'react';
import {
  Gift,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Stamp,
  PackageCheck,
  Award,
  MapPin,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface Tannery71UnboxingEngravingCheckoutSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

interface ExecutiveOrderPack {
  id: string;
  titleBn: string;
  subtitleEn: string;
  priceBdt: number;
  regularPriceBdt: number;
  savingsBadge: string;
  items: string[];
}

const EXECUTIVE_PACKS: ExecutiveOrderPack[] = [
  {
    id: 'pack_wallet_belt_combo',
    titleBn: '১. দ্য নবাব এক্সিকিউটিভ কম্বো (ফুল-গ্রেইন ওয়ালেট + সলিড ব্রাস বেল্ট)',
    subtitleEn: 'Most Popular Corporate & Anniversary Gift Set',
    priceBdt: 2490,
    regularPriceBdt: 3990,
    savingsBadge: '৳১,৫০০ সাশ্রয় + ফ্রি ডেলিভারি',
    items: [
      'দ্য নবাব RFID ফুল-গ্রেইন বাই-ফোল্ড বা লং ওয়ালেট (আপনার পছন্দের রঙ)',
      '৪.০ মিমি সিঙ্গেল-লেয়ার ফুল-গ্রেইন এক্সিকিউটিভ ফরমাল বেল্ট',
      'ফ্রি: ম্যাট ব্ল্যাক রিজিড গিফট বক্স, ভেলভেট ডাস্ট ব্যাগ ও ৫ বছরের ওয়ারেন্টি কার্ড',
    ],
  },
  {
    id: 'pack_single_wallet',
    titleBn: '২. সিঙ্গেল ফুল-গ্রেইন নবাব ওয়ালেট (রিজিড গিফট বক্সসহ)',
    subtitleEn: 'Signature Full-Grain Bi-Fold / Long Executive Wallet',
    priceBdt: 1490,
    regularPriceBdt: 2100,
    savingsBadge: '৳৬১০ সাশ্রয়',
    items: [
      '১০০% ফুল-গ্রেইন ভেজিটেবল-ট্যানড কাউহাইড ওয়ালেট',
      'ফ্রি: ম্যাট ব্ল্যাক রিজিড গিফট বক্স, ডাস্ট ব্যাগ ও বার্ন-টেস্ট স্যাম্পল সোয়াচ',
    ],
  },
  {
    id: 'pack_messenger_director',
    titleBn: '৩. ডিরেক্টর’স স্যুট প্যাক (১৫.৬" অফিস মেসেঞ্জার ব্যাগ + ওয়ালেট)',
    subtitleEn: 'Boardroom Heritage Messenger Bag + Matching Executive Wallet',
    priceBdt: 5790,
    regularPriceBdt: 8600,
    savingsBadge: '৳২,৮১০ সাশ্রয় + ভিআইপি ডেলিভারি',
    items: [
      'হেরিটেজ ১৫.৬" অয়েল পুল-আপ ফুল-গ্রেইন অফিস মেসেঞ্জার ব্রিফকেস',
      'ম্যাচিং ফুল-গ্রেইন নবাব ওয়ালেট + লেদার কন্ডিশনিং ওয়াক্স বাম ফ্রি',
    ],
  },
];

const UNBOXING_SLIDES = [
  {
    step: '01',
    titleBn: 'ম্যাট ব্ল্যাক ম্যাগনেটিক রিজিড গিফট বক্স',
    desc: 'গোল্ড ফয়েল এমবসড লোগোসহ ভারী ম্যাট ব্ল্যাক বক্স—জন্মদিন, বিবাহবার্ষিকী বা কর্পোরেট উপহারের জন্য আলাদা র‍্যাপিংয়ের প্রয়োজন হয় না।',
  },
  {
    step: '02',
    titleBn: 'হেরিটেজ ভেলভেট ডাস্ট ব্যাগ ও সিল্ক টিস্যু র‍্যাপ',
    desc: 'দীর্ঘদিন সংরক্ষণের জন্য প্রতিটি ওয়ালেট, বেল্ট ও ব্যাগ থাকে ব্রেদেবল কটন-ভেলভেট ডাস্ট পাউচে।',
  },
  {
    step: '03',
    titleBn: '৫ বছরের ওয়ারেন্টি সনদ ও ফ্রি বার্ন-টেস্ট চামড়ার টুকরো',
    desc: 'বক্সের ভেতরে একটি আলাদা ছোট চামড়ার স্যাম্পল (Test Swatch) দেওয়া থাকে, যাতে মূল পণ্য স্পর্শ না করেই আপনি আগুন দিয়ে পরীক্ষা করতে পারেন!',
  },
];

export const Tannery71UnboxingEngravingCheckoutSection: React.FC<
  Tannery71UnboxingEngravingCheckoutSectionProps
> = ({ title, subtitle, isDark = false }) => {
  const [selectedPackId, setSelectedPackId] = useState<string>('pack_wallet_belt_combo');
  const [selectedColor, setSelectedColor] = useState<'Saddle Tan' | 'Dark Brown' | 'Jet Black'>(
    'Saddle Tan'
  );

  // Required Feature: Custom Engraving Input Field (+৳200)
  const [enableEngraving, setEnableEngraving] = useState<boolean>(true);
  const [engravingText, setEngravingText] = useState<string>('T. RAHMAN');
  const [engravingStyle, setEngravingStyle] = useState<'Blind Deboss' | '24K Gold Foil'>(
    'Blind Deboss'
  );

  const [buyerName, setBuyerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [deliveryZone, setDeliveryZone] = useState<'inside_dhaka' | 'outside_dhaka'>('inside_dhaka');
  const [address, setAddress] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);

  const activePack = useMemo(
    () => EXECUTIVE_PACKS.find((p) => p.id === selectedPackId) || EXECUTIVE_PACKS[0],
    [selectedPackId]
  );

  const engravingFee = enableEngraving ? 200 : 0;
  const shippingFee =
    activePack.priceBdt >= 2400 ? 0 : deliveryZone === 'inside_dhaka' ? 70 : 120;
  const totalPayable = activePack.priceBdt + engravingFee + shippingFee;

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedPhone = phone.replace(/[\s-]/g, '');
    const bdPhoneRegex = /^01[3-9]\d{8}$/;

    if (!buyerName.trim()) {
      setFormError('অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন।');
      return;
    }
    if (!bdPhoneRegex.test(cleanedPhone)) {
      setFormError('সঠিক ১১ ডিজিটের বাংলাদেশি মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)।');
      return;
    }
    if (!address.trim()) {
      setFormError('ডেলিভারির জন্য আপনার অফিস বা বাসার পূর্ণ ঠিকানা লিখুন।');
      return;
    }

    setFormError(null);
    setOrderConfirmed(true);
  };

  return (
    <section
      id="tannery71-unboxing-engraving"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t"
      style={{
        backgroundColor: isDark ? '#0E0B09' : '#FAF6F0',
        borderColor: isDark ? '#29201B' : '#E7DFD3',
        color: isDark ? '#FAF6F0' : '#1C130E',
      }}
    >
      <div className="max-w-7xl mx-auto space-y-14">
        {/* ================================================================= */}
        {/* PART 1: GIFT-READY UNBOXING PREVIEW SECTION                       */}
        {/* ================================================================= */}
        <div
          className="rounded-3xl border-2 p-6 sm:p-8 lg:p-10 space-y-8"
          style={{
            backgroundColor: '#160F0B',
            borderColor: '#78350F',
            color: '#FAF6F0',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                <Gift size={14} />
                <span>Luxury Gift-Ready Unboxing Experience (রাজকীয় গিফট বক্স প্রিভিউ)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-amber-50">
                বক্স খুললেই খাঁটি চামড়ার ঘ্রাণ ও আভিজাত্য — প্রিয়জন বা কর্পোরেট গিফটিংয়ের সেরা পছন্দ
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                স্বামী, বাবা, ভাই কিংবা অফিসের কলিগের জন্মদিন ও বিবাহবার্ষিকীতে এমন একটি উপহার দিন যা তাঁরা প্রতিদিন গর্বের সাথে ব্যবহার করবেন। প্রতিটি অর্ডারের সাথেই একদম ফ্রি পাচ্ছেন আমাদের সিগনেচার লাক্সারি গিফট প্যাকেজিং:
              </p>

              <div className="space-y-3 pt-2">
                {UNBOXING_SLIDES.map((slide) => (
                  <div
                    key={slide.step}
                    className="p-4 rounded-2xl bg-[#221711] border border-amber-900/40 flex items-start gap-3.5"
                  >
                    <span className="w-8 h-8 rounded-xl bg-[#B45309] text-white text-xs font-black flex items-center justify-center shrink-0">
                      {slide.step}
                    </span>
                    <div>
                      <h3 className="text-sm font-black text-amber-100">{slide.titleBn}</h3>
                      <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">{slide.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-700/40 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=80"
                  alt="Tannery 71 Matte Black Rigid Gift Box Unboxing"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent p-6 flex flex-col justify-end">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#B45309] text-white text-[10px] font-black uppercase">
                      Included Free With Every Order
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white/15 text-amber-200 text-[10px] font-bold backdrop-blur-xs">
                      Matte Rigid Box + Dust Bag + Fire-Test Swatch
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-white">
                    ম্যাট ব্ল্যাক রিজিড বক্স + ভেলভেট পাউচ + গোল্ড এমবসড ওয়ারেন্টি কার্ড
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* PART 2: CUSTOM ENGRAVING STUDIO (+৳200) & 1-CLICK COD CHECKOUT    */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols): Bundle Selection + Custom Engraving Live Preview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#B45309]">
                Custom Name Debossing &amp; Bundle Selection
              </span>
              <h3
                className="text-xl sm:text-2xl font-black"
                style={{ color: isDark ? '#FAF6F0' : '#1C130E' }}
              >
                <EditableText
                  id="tannery71_checkout_h2"
                  defaultText={
                    title ||
                    'আপনার পছন্দের প্যাক সিলেক্ট করুন ও চামড়ায় নিজের নাম খোদাই (Engraving) করুন'
                  }
                />
              </h3>
            </div>

            {/* Pack Selector */}
            <div className="space-y-3">
              {EXECUTIVE_PACKS.map((pack) => {
                const active = selectedPackId === pack.id;
                return (
                  <div
                    key={pack.id}
                    onClick={() => setSelectedPackId(pack.id)}
                    className={`p-5 rounded-3xl border-2 transition-all cursor-pointer ${
                      active
                        ? 'border-[#92400E] bg-amber-900/10 shadow-sm'
                        : isDark
                        ? 'border-[#2E231C] bg-[#18120E]'
                        : 'border-[#E5DDD0] bg-white'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#78350F] text-amber-50">
                          {pack.savingsBadge}
                        </span>
                        <h4 className="text-sm sm:text-base font-black mt-1.5">{pack.titleBn}</h4>
                        <p className="text-[11px] opacity-65">{pack.subtitleEn}</p>
                      </div>
                      <div className="sm:text-right shrink-0">
                        <div className="text-xl font-black text-[#B45309] dark:text-amber-400">
                          ৳{pack.priceBdt.toLocaleString('bn-BD')}
                        </div>
                        <div className="text-xs line-through opacity-50">
                          ৳{pack.regularPriceBdt.toLocaleString('bn-BD')}
                        </div>
                      </div>
                    </div>
                    <ul className="mt-3 pt-3 border-t border-stone-200/60 dark:border-stone-800 space-y-1">
                      {pack.items.map((it) => (
                        <li key={it} className="text-xs flex items-center gap-2 opacity-90">
                          <CheckCircle2 size={13} className="text-[#B45309] shrink-0" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Required Feature: Custom Engraving Input Field (+৳200) */}
            <div
              className="rounded-3xl border-2 p-5 sm:p-6 space-y-4"
              style={{
                backgroundColor: isDark ? '#18120E' : '#FFFFFF',
                borderColor: enableEngraving ? '#B45309' : isDark ? '#2E231C' : '#E5DDD0',
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enableEngraving}
                    onChange={(e) => setEnableEngraving(e.target.checked)}
                    className="mt-1 w-5 h-5 accent-[#92400E] rounded cursor-pointer"
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm sm:text-base font-black flex items-center gap-1.5">
                        <Stamp size={16} className="text-[#B45309]" />
                        কাস্টম নাম বা ইনিশিয়াল খোদাই করুন (Custom Name Engraving +৳২০০)
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#B45309] text-white">
                        BESPOKE MONOGRAM
                      </span>
                    </div>
                    <p className="text-xs opacity-75 mt-1">
                      উত্তপ্ত পিতলের ডাই (Hot Brass Die) দিয়ে চামড়ার ওপর স্থায়ীভাবে আপনার বা প্রিয়জনের নাম খোদাই করে দেওয়া হবে।
                    </p>
                  </div>
                </label>
              </div>

              {enableEngraving && (
                <div className="space-y-4 pt-3 border-t border-stone-200 dark:border-stone-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-extrabold mb-1">
                        খোদাই করার নাম বা ইনিশিয়াল (সর্বোচ্চ ১২ অক্ষর):
                      </label>
                      <input
                        type="text"
                        maxLength={14}
                        value={engravingText}
                        onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                        placeholder="যেমন: T. RAHMAN / ARAFAT"
                        className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-black tracking-widest uppercase focus:outline-none"
                        style={{
                          backgroundColor: isDark ? '#120D0A' : '#FAF6F0',
                          borderColor: '#B45309',
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-extrabold mb-1">
                        ডিবসিং ফিনিশ স্টাইল (Engraving Finish):
                      </label>
                      <select
                        value={engravingStyle}
                        onChange={(e) =>
                          setEngravingStyle(e.target.value as 'Blind Deboss' | '24K Gold Foil')
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none"
                        style={{
                          backgroundColor: isDark ? '#120D0A' : '#FAF6F0',
                          borderColor: isDark ? '#33261E' : '#D6C7B2',
                        }}
                      >
                        <option value="Blind Deboss">Classic Blind Deboss (খোদাই করা প্রাকৃতিক ছাপ)</option>
                        <option value="24K Gold Foil">24K Gold Foil Stamp (সোনালী রাজকীয় ছাপ)</option>
                      </select>
                    </div>
                  </div>

                  {/* Live Leather Patch Monogram Preview */}
                  <div
                    className="p-4 rounded-2xl border flex items-center justify-between"
                    style={{
                      background:
                        selectedColor === 'Jet Black'
                          ? 'linear-gradient(135deg, #27272A 0%, #18181B 100%)'
                          : selectedColor === 'Dark Brown'
                          ? 'linear-gradient(135deg, #5C2E14 0%, #3B1B0A 100%)'
                          : 'linear-gradient(135deg, #B45309 0%, #78350F 100%)',
                      borderColor: '#F59E0B',
                    }}
                  >
                    <div className="text-amber-100/90 text-xs">
                      <span className="text-[10px] uppercase tracking-wider block opacity-75">
                        Live Leather Deboss Preview ({selectedColor})
                      </span>
                      <span className="font-bold">ওয়ালেটের নিচের ডান কোণায় খোদাই হবে:</span>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-lg border border-dashed border-amber-200/40 font-serif text-sm sm:text-base font-black tracking-[0.22em] ${
                        engravingStyle === '24K Gold Foil'
                          ? 'text-amber-300 drop-shadow-xs'
                          : 'text-black/75 bg-black/15 shadow-inner'
                      }`}
                    >
                      {engravingText || 'YOUR NAME'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (5 cols): 1-Click Open-Box COD Checkout Form */}
          <div className="lg:col-span-5">
            <div
              className="rounded-3xl border-2 p-6 space-y-5 shadow-xl"
              style={{
                backgroundColor: isDark ? '#18120E' : '#FFFFFF',
                borderColor: '#92400E',
              }}
            >
              <div className="flex items-center justify-between border-b pb-4 border-stone-200 dark:border-stone-800">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#B45309]">
                    Open-Box Cash On Delivery
                  </span>
                  <h3 className="text-lg font-black">এক্সিকিউটিভ অর্ডার কনফার্মেশন</h3>
                </div>
                <PackageCheck size={24} className="text-[#B45309]" />
              </div>

              {orderConfirmed ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3 text-center">
                  <CheckCircle2 size={38} className="text-emerald-500 mx-auto" />
                  <h4 className="text-base font-black text-emerald-700 dark:text-emerald-300">
                    ধন্যবাদ {buyerName}! আপনার অর্ডারটি সফলভাবে গৃহীত হয়েছে।
                  </h4>
                  <p className="text-xs leading-relaxed opacity-85">
                    আমাদের ক্রাফটসম্যান টিম আপনার <strong>{selectedColor}</strong> লেদার প্যাকটি প্রস্তুত করছে। ১৫ মিনিটের মধ্যে <strong>{phone}</strong> নম্বরে কল করে কনফার্ম করা হবে।
                  </p>
                  {enableEngraving && (
                    <div className="p-3 rounded-xl bg-amber-500/15 text-xs font-black text-[#92400E] dark:text-amber-300">
                      ✒️ কাস্টম নাম খোদাই: “{engravingText}” ({engravingStyle})
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setOrderConfirmed(false)}
                    className="px-4 py-2 rounded-xl bg-[#78350F] text-white text-xs font-extrabold cursor-pointer"
                  >
                    নতুন অর্ডার করুন
                  </button>
                </div>
              ) : (
                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  {/* Color Selection inside Checkout */}
                  <div>
                    <label className="block text-xs font-extrabold mb-1.5">
                      চামড়ার রঙ নির্বাচন করুন (Select Leather Shade):
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Saddle Tan', 'Dark Brown', 'Jet Black'] as const).map((shade) => (
                        <button
                          key={shade}
                          type="button"
                          onClick={() => setSelectedColor(shade)}
                          className={`py-2 px-2.5 rounded-xl border text-xs font-extrabold cursor-pointer transition ${
                            selectedColor === shade
                              ? 'border-[#92400E] bg-amber-900/15 text-[#92400E] dark:text-amber-300'
                              : 'border-stone-200 dark:border-stone-800 opacity-75'
                          }`}
                        >
                          {shade}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold mb-1">
                      আপনার পূর্ণ নাম *
                    </label>
                    <input
                      type="text"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="যেমন: তানভীর রহমান"
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none"
                      style={{
                        backgroundColor: isDark ? '#120D0A' : '#FAF6F0',
                        borderColor: isDark ? '#33261E' : '#D6C7B2',
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold mb-1">
                      ১১ ডিজিটের মোবাইল নম্বর *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none"
                      style={{
                        backgroundColor: isDark ? '#120D0A' : '#FAF6F0',
                        borderColor: isDark ? '#33261E' : '#D6C7B2',
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setDeliveryZone('inside_dhaka')}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-extrabold cursor-pointer ${
                        deliveryZone === 'inside_dhaka'
                          ? 'border-[#92400E] bg-amber-900/15 text-[#92400E] dark:text-amber-300'
                          : 'border-stone-200 dark:border-stone-800 opacity-75'
                      }`}
                    >
                      ঢাকা সিটি (২৪ ঘণ্টা)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryZone('outside_dhaka')}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-extrabold cursor-pointer ${
                        deliveryZone === 'outside_dhaka'
                          ? 'border-[#92400E] bg-amber-900/15 text-[#92400E] dark:text-amber-300'
                          : 'border-stone-200 dark:border-stone-800 opacity-75'
                      }`}
                    >
                      ঢাকার বাইরে (৪৮ ঘণ্টা)
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold mb-1 flex items-center gap-1">
                      <MapPin size={12} className="text-[#B45309]" />
                      <span>অফিস বা বাসার পূর্ণ ঠিকানা *</span>
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="বাসা/অফিস নম্বর, রোড, থানা ও জেলা..."
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none"
                      style={{
                        backgroundColor: isDark ? '#120D0A' : '#FAF6F0',
                        borderColor: isDark ? '#33261E' : '#D6C7B2',
                      }}
                    />
                  </div>

                  {/* Summary Breakdown */}
                  <div
                    className="p-4 rounded-2xl border space-y-2 text-xs"
                    style={{
                      backgroundColor: isDark ? '#120D0A' : '#FAF6F0',
                      borderColor: isDark ? '#2E231C' : '#E5DDD0',
                    }}
                  >
                    <div className="flex justify-between font-bold">
                      <span className="truncate pr-2">
                        {activePack.titleBn} ({selectedColor})
                      </span>
                      <span>৳{activePack.priceBdt.toLocaleString('bn-BD')}</span>
                    </div>
                    {enableEngraving && (
                      <div className="flex justify-between text-[#B45309] font-bold">
                        <span>✒️ কাস্টম নাম খোদাই ({engravingText || 'NAME'})</span>
                        <span>+৳২০০</span>
                      </div>
                    )}
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>🎁 ম্যাট ব্ল্যাক রিজিড গিফট বক্স ও ওয়ারেন্টি কার্ড</span>
                      <span>ফ্রি (FREE)</span>
                    </div>
                    <div className="flex justify-between opacity-80">
                      <span>ডেলিভারি চার্জ</span>
                      <span>
                        {shippingFee === 0 ? (
                          <strong className="text-emerald-600">ফ্রি (FREE)</strong>
                        ) : (
                          `৳${shippingFee}`
                        )}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-stone-300 dark:border-stone-800 flex justify-between text-sm font-black">
                      <span>সর্বমোট প্রদেয় (বক্স খুলে চেক করার পর):</span>
                      <span className="text-[#92400E] dark:text-amber-400">
                        ৳{totalPayable.toLocaleString('bn-BD')}
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
                    className="w-full py-4 rounded-2xl text-xs sm:text-sm font-black text-amber-50 shadow-lg flex items-center justify-center gap-2 transition hover:opacity-95 cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #92400E 0%, #451A03 100%)',
                    }}
                  >
                    <ShoppingBag size={17} />
                    <span>অর্ডার কনফার্ম করুন — ওপেন-বক্স ক্যাশ অন ডেলিভারি</span>
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
