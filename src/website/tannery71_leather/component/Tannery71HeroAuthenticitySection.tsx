import React, { useState } from 'react';
import {
  ShieldCheck,
  Flame,
  Droplets,
  Search,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Award,
  Layers,
  XCircle,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface Tannery71HeroAuthenticitySectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

interface AuthenticityTestTab {
  id: 'burn_test' | 'macro_grain' | 'water_patina';
  badge: string;
  titleBn: string;
  titleEn: string;
  genuineResult: string;
  syntheticFakeResult: string;
  scientificNote: string;
  testVisualUrl: string;
  metricTag: string;
}

const AUTHENTICITY_TESTS: Record<'burn_test' | 'macro_grain' | 'water_patina', AuthenticityTestTab> =
  {
    burn_test: {
      id: 'burn_test',
      badge: 'Test 01 · The 10-Second Fire Test',
      titleBn: '১০ সেকেন্ডের বার্ন-টেস্ট (আগুনে পোড়ালেও গলে যাবে না)',
      titleEn: '800°C Direct Flame Resistance Verification',
      genuineResult:
        'আমাদের ফুল-গ্রেইন কাউহাইড চামড়ায় লাইটারের আগুন ১০ সেকেন্ড ধরলেও চামড়া গলে যায় না বা ফোসকা পড়ে না; কেবল প্রাকৃতিক চুলের মতো হালকা গন্ধ পাওয়া যায় এবং মুছে ফেললেই আগের মতো হয়ে যায়।',
      syntheticFakeResult:
        'বাজারের সাধারণ রেক্সিন, PU বা আর্টিফিশিয়াল লেদার ৩ সেকেন্ড আগুনের সংস্পর্শে আসলেই পলিথিনের মতো কুঁচকে গলে যায় এবং কালো রাসায়নিক ধোঁয়া ছড়ায়।',
      scientificNote:
        'প্রাকৃতিক কোলাজেন ফাইবার স্ট্রাকচার থাকায় আসল চামড়া উচ্চ তাপমাত্রা সহ্য করতে পারে। ডেলিভারি ম্যানের সামনেই আপনি লাইটার দিয়ে বার্ন-টেস্ট করে নিতে পারবেন!',
      testVisualUrl:
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
      metricTag: '৮০০°C তাপ সহনশীল · জিরো প্লাস্টিক কোটিং',
    },
    macro_grain: {
      id: 'macro_grain',
      badge: 'Test 02 · 10x Macro Pore & Grain Zoom',
      titleBn: '১০x ম্যাক্রো গ্রেইন ও ন্যাচারাল পোরস জুম (Macro Texture Proof)',
      titleEn: 'Unaltered Full-Grain Epidermis & Natural Follicle Pores',
      genuineResult:
        'খুব কাছে থেকে (Macro Zoom) দেখলে আমাদের প্রতিটি ওয়ালেট ও ব্যাগে অসংখ্য ক্ষুদ্র প্রাকৃতিক লোমকূপ (Pores) ও অসামঞ্জস্যপূর্ণ প্রাকৃতিক শিরা দেখা যাবে—ঠিক মানুষের হাতের রেখার মতো কোনো দুটি পণ্য হুবহু এক নয়।',
      syntheticFakeResult:
        'মেশিনে ছাপ দেওয়া সিন্থেটিক বা বন্ডেড লেদারে একই জ্যামিতিক প্যাটার্ন বারবার রিপিট হয় এবং ভাঁজ করলে উপরে প্লাস্টিকের স্তর ফেটে সাদা কাপড় বের হয়ে আসে।',
      scientificNote:
        'আমরা চামড়ার উপরের সবচেয়ে মজবুত স্তর (Top Full-Grain Layer) স্যান্ডিং বা বাফিং ছাড়াই ভেজিটেবল ট্যানিং করি, তাই ১০ বছরেও চামড়ার উপরের অংশ খোসার মতো ওঠে না।',
      testVisualUrl:
        'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80',
      metricTag: '1.8mm – 2.2mm পুরু ফুল-গ্রেইন কাউহাইড',
    },
    water_patina: {
      id: 'water_patina',
      badge: 'Test 03 · Water Drop & Rich Patina Aging',
      titleBn: 'ওয়াটার-ড্রপ ও সময়ের সাথে রাজকীয় প্যাটিনা (Aging Patina)',
      titleEn: 'Organic Moisture Absorption & Natural Oil Burnishing',
      genuineResult:
        'চামড়ার ওপর এক ফোঁটা পানি ফেললে কয়েক সেকেন্ডের মধ্যে প্রাকৃতিক পোরস তা শুষে নেয় এবং শুকানোর পর কোনো দাগ থাকে না। ব্যবহারের সাথে সাথে হাতের প্রাকৃতিক তেলে চামড়া আরও চকচকে ও গাঢ় (Rich Patina) হয়ে ওঠে।',
      syntheticFakeResult:
        'প্লাস্টিক কোটেড নকল চামড়ায় পানি পড়লে তা পলিথিনের মতো উপরে ভেসে থাকে এবং ৬-৮ মাস ব্যবহারের পর ঘামের কারণে ফুলেফেঁপে ছিঁড়ে যায়।',
      scientificNote:
        'হাজারীবাগ ও সাভারের ঐতিহ্যবাহী এক্সপোর্ট ট্যানারি থেকে বাছাইকৃত সেরা ৫% গ্রেড-এ চামড়া এবং প্রাকৃতিক বিসওয়াক্স (Beeswax) ফিনিশিং।',
      testVisualUrl:
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
      metricTag: 'যত পুরোনো হয়, ততই আভিজাত্য বাড়ে',
    },
  };

export const Tannery71HeroAuthenticitySection: React.FC<
  Tannery71HeroAuthenticitySectionProps
> = ({ title, subtitle, isDark = false }) => {
  const [activeTestId, setActiveTestId] = useState<'burn_test' | 'macro_grain' | 'water_patina'>(
    'burn_test'
  );
  const [macroZoomActive, setMacroZoomActive] = useState<boolean>(false);

  const activeTest = AUTHENTICITY_TESTS[activeTestId];

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="tannery71-hero-authenticity"
      className="relative overflow-hidden py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: isDark ? '#0E0B09' : '#FDFBF7',
        color: isDark ? '#FAF6F0' : '#1C130E',
      }}
    >
      {/* Subtle Warm Cognac & Espresso Ambient Glow */}
      <div className="pointer-events-none absolute -top-28 -left-24 w-96 h-96 rounded-full bg-amber-700/10 blur-3xl" />
      <div className="pointer-events-none absolute top-36 -right-24 w-96 h-96 rounded-full bg-amber-900/10 blur-3xl" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* ================================================================= */}
        {/* PART 1: EXECUTIVE HERO SECTION                                    */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (7 cols): Authoritative Executive Copywriting */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold border bg-amber-900/10 text-[#92400E] dark:text-amber-300 border-amber-700/25">
              <ShieldCheck size={15} className="text-[#B45309]" />
              <EditableText
                id="tannery71_hero_eyebrow"
                defaultText="১০০% এক্সপোর্ট-কোয়ালিটি ফুল-গ্রেইন কাউহাইড লেদার · ৫ বছরের ওয়ারেন্টি গ্যারান্টি"
              />
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight leading-[1.16]"
              style={{ color: isDark ? '#FAF6F0' : '#1C130E' }}
            >
              <EditableText
                id="tannery71_hero_h1"
                defaultText={
                  title ||
                  'এক ফালি খাঁটি চামড়ার আভিজাত্য — যা সময়ের সাথে ক্ষয়ে যায় না, বরং আপনার ব্যক্তিত্বের সাক্ষী হয়ে থাকে!'
                }
              />
            </h1>

            <p
              className="text-sm sm:text-base leading-relaxed max-w-2xl font-medium"
              style={{ color: isDark ? '#D6CBBF' : '#4A3B31' }}
            >
              <EditableText
                id="tannery71_hero_subtitle"
                defaultText={
                  subtitle ||
                  'বাজারের সস্তা সিন্থেটিক বা রেক্সিনের ওয়ালেট ও বেল্ট ৬ মাসেই খোসার মতো উঠে গিয়ে বিব্রতকর পরিস্থিতির সৃষ্টি করে। Tannery 71 বাংলাদেশের সেরা এক্সপোর্ট ট্যানারি থেকে বাছাইকৃত ১০০% Full-Grain Vegetable-Tanned চামড়া দিয়ে তৈরি করছে প্রিমিয়াম ওয়ালেট, এক্সিকিউটিভ বেল্ট, অফিস মেসেঞ্জার ব্যাগ ও হ্যান্ডক্রাফটেড লোফার—যা যুগের পর যুগ আপনার আভিজাত্য অক্ষুণ্ণ রাখবে।'
                }
              />
            </p>

            {/* 4 Executive Craftsmanship Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                {
                  badge: '১০০% বার্ন-টেস্ট গ্যারান্টি',
                  text: 'ডেলিভারি ম্যানের সামনে আগুনে পরীক্ষা করে নিন — নকল প্রমাণ হলে দ্বিগুণ টাকা ফেরত',
                },
                {
                  badge: 'ফুল-গ্রেইন কাউহাইড (No Peeling)',
                  text: 'চামড়ার সবচেয়ে মজবুত উপরের স্তর — ১০ বছরেও ফাটবে না বা খোসা উঠবে না',
                },
                {
                  badge: 'কাস্টম নাম খোদাই (+৳২০০)',
                  text: 'ওয়ালেট বা ব্যাগে আপনার নাম বা ইনিশিয়াল গরম ব্রাস ডাই দিয়ে খোদাই করার সুবিধা',
                },
                {
                  badge: 'লাক্সারি রিজিড গিফট বক্স ফ্রি',
                  text: 'ম্যাট ব্ল্যাক রিজিড বক্স, ভেলভেট ডাস্ট ব্যাগ ও ওয়ারেন্টি কার্ডসহ রাজকীয় আনবক্সিং',
                },
              ].map((item) => (
                <div
                  key={item.badge}
                  className="p-3.5 rounded-2xl border flex items-start gap-2.5"
                  style={{
                    backgroundColor: isDark ? '#18120E' : '#FFFFFF',
                    borderColor: isDark ? '#2E231C' : '#E5DDD0',
                  }}
                >
                  <CheckCircle2
                    size={16}
                    className="text-[#B45309] shrink-0 mt-0.5"
                  />
                  <div>
                    <div
                      className="text-xs font-extrabold"
                      style={{ color: isDark ? '#FAF6F0' : '#1C130E' }}
                    >
                      {item.badge}
                    </div>
                    <div
                      className="text-[11px] leading-snug mt-0.5"
                      style={{ color: isDark ? '#A89F91' : '#5C4E43' }}
                    >
                      {item.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => scrollToId('tannery71-collection-swatches')}
                className="px-6 py-4 rounded-2xl text-xs sm:text-sm font-black text-amber-50 shadow-lg flex items-center gap-2.5 transition hover:opacity-95 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #92400E 0%, #451A03 100%)',
                }}
              >
                <ShoppingBag size={17} />
                <EditableText
                  id="tannery71_hero_cta_primary"
                  defaultText="এক্সিকিউটিভ লেদার কালেকশন দেখুন — ক্যাশ অন ডেলিভারি"
                />
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => scrollToId('tannery71-authenticity-lab')}
                className="px-5 py-4 rounded-2xl text-xs sm:text-sm font-extrabold border flex items-center gap-2 transition cursor-pointer"
                style={{
                  backgroundColor: isDark ? '#1F1712' : '#FEF3C7',
                  borderColor: isDark ? '#B45309' : '#F59E0B',
                  color: isDark ? '#FBBF24' : '#92400E',
                }}
              >
                <Flame size={17} />
                <EditableText
                  id="tannery71_hero_cta_secondary"
                  defaultText="বার্ন-টেস্ট ও ম্যাক্রো গ্রেইন প্রুফ দেখুন"
                />
              </button>
            </div>
          </div>

          {/* Right Column (5 cols): Interactive Macro Grain Zoom & Craft Showcase */}
          <div className="lg:col-span-5">
            <div
              className="rounded-3xl border-2 p-5 sm:p-6 space-y-4 shadow-xl relative overflow-hidden"
              style={{
                backgroundColor: isDark ? '#18120E' : '#FFFFFF',
                borderColor: '#92400E',
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/15 text-[#B45309] dark:text-amber-300">
                  <Sparkles size={12} />
                  Export-Grade Full-Grain Hide
                </span>
                <button
                  type="button"
                  onClick={() => setMacroZoomActive(!macroZoomActive)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-extrabold bg-[#78350F] text-amber-50 cursor-pointer"
                >
                  <Search size={12} />
                  <span>{macroZoomActive ? 'Normal View (1x)' : 'Inspect Macro Grain (2.5x)'}</span>
                </button>
              </div>

              {/* Interactive Macro Zoom Image Container */}
              <div
                onClick={() => setMacroZoomActive(!macroZoomActive)}
                className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 cursor-zoom-in group"
              >
                <img
                  src="https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=85"
                  alt="Tannery 71 Handcrafted Full-Grain Leather Bifold Wallet"
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    macroZoomActive ? 'scale-150' : 'group-hover:scale-105'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-4 flex flex-col justify-end">
                  <div className="flex items-center justify-between text-amber-50">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#B45309]">
                        Signature Craft · 6-Stitch/Inch Waxed Thread
                      </span>
                      <h3 className="text-sm sm:text-base font-black mt-1">
                        দ্য নবাব বাই-ফোল্ড ও এক্সিকিউটিভ লং ওয়ালেট (Saddle Tan)
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Authenticity Spec Strip */}
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { label: 'চামড়ার গ্রেড', val: '100% Full-Grain' },
                  { label: 'সেলাই ও ফিনিশ', val: 'Waxed Nylon Cord' },
                  { label: 'রিপ্লেসমেন্ট গ্যারান্টি', val: '৫ বছর ওয়ারেন্টি' },
                ].map((spec) => (
                  <div
                    key={spec.label}
                    className="p-2.5 rounded-xl border"
                    style={{
                      backgroundColor: isDark ? '#120D0A' : '#FAF6F0',
                      borderColor: isDark ? '#2E231C' : '#E7DFD3',
                    }}
                  >
                    <div className="text-[10px] font-bold opacity-70">{spec.label}</div>
                    <div className="text-xs font-black text-[#B45309] dark:text-amber-400 mt-0.5">
                      {spec.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* PART 2: LEATHER AUTHENTICITY GUARANTEE & BURN-TEST LAB            */}
        {/* ================================================================= */}
        <div
          id="tannery71-authenticity-lab"
          className="rounded-3xl border-2 p-6 sm:p-8 lg:p-10 space-y-8 shadow-sm"
          style={{
            backgroundColor: isDark ? '#15100C' : '#F8F3EB',
            borderColor: isDark ? '#78350F' : '#D6C7B2',
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-[#B45309]/15 text-[#92400E] dark:text-amber-300">
                <Flame size={15} />
                <span>The Ironclad Authenticity Lab (১০০% খাঁটি চামড়ার চ্যালেঞ্জ)</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-black tracking-tight"
                style={{ color: isDark ? '#FAF6F0' : '#1C130E' }}
              >
                “১০০% আসল চামড়া, নচেৎ দ্বিগুণ মূল্য ফেরত” — আমাদের ৩টি অকাট্য প্রমাণ দেখুন
              </h2>
              <p
                className="text-xs sm:text-sm leading-relaxed"
                style={{ color: isDark ? '#A89F91' : '#574C43' }}
              >
                বাংলাদেশে অনেকেই “জেনুইন লেদার” বলে বন্ডেড লেদার বা PU রেক্সিন বিক্রি করে। নিচের ৩টি টেস্ট ট্যাবে ক্লিক করে দেখুন কেন Tannery 71-এর চামড়া শতভাগ খাঁটি:
              </p>
            </div>

            {/* 3 Test Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'burn_test' as const, label: '১. বার্ন-টেস্ট (Fire Test)', icon: <Flame size={14} /> },
                { id: 'macro_grain' as const, label: '২. ম্যাক্রো গ্রেইন জুম', icon: <Layers size={14} /> },
                { id: 'water_patina' as const, label: '৩. ওয়াটার ও প্যাটিনা টেস্ট', icon: <Droplets size={14} /> },
              ].map((t) => {
                const active = activeTestId === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTestId(t.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 border transition cursor-pointer ${
                      active
                        ? 'bg-[#78350F] text-amber-50 border-[#78350F] shadow-sm'
                        : isDark
                        ? 'bg-[#1F1712] text-stone-300 border-[#33261E]'
                        : 'bg-white text-stone-800 border-[#DFD5C5]'
                    }`}
                  >
                    {t.icon}
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Test Breakdown Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-amber-800/30 h-64">
                <img
                  src={activeTest.testVisualUrl}
                  alt={activeTest.titleBn}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-4 flex flex-col justify-end text-amber-50">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#B45309] w-fit">
                    {activeTest.badge}
                  </span>
                  <div className="text-sm font-black mt-1">{activeTest.metricTag}</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div>
                <h3
                  className="text-lg sm:text-xl font-black"
                  style={{ color: isDark ? '#FAF6F0' : '#1C130E' }}
                >
                  {activeTest.titleBn}
                </h3>
                <p className="text-xs font-bold opacity-65">{activeTest.titleEn}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Genuine Leather Box */}
                <div
                  className="p-4 rounded-2xl border space-y-2"
                  style={{
                    backgroundColor: isDark ? '#121E18' : '#ECFDF5',
                    borderColor: isDark ? '#065F46' : '#A7F3D0',
                  }}
                >
                  <div className="flex items-center gap-1.5 text-xs font-black text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 size={15} />
                    <span>Tannery 71 ফুল-গ্রেইন চামড়া:</span>
                  </div>
                  <p className="text-xs leading-relaxed opacity-90">
                    {activeTest.genuineResult}
                  </p>
                </div>

                {/* Fake PU Leather Box */}
                <div
                  className="p-4 rounded-2xl border space-y-2"
                  style={{
                    backgroundColor: isDark ? '#241214' : '#FEF2F2',
                    borderColor: isDark ? '#7F1D1D' : '#FECACA',
                  }}
                >
                  <div className="flex items-center gap-1.5 text-xs font-black text-red-700 dark:text-red-400">
                    <XCircle size={15} />
                    <span>সাধারণ সিন্থেটিক / PU রেক্সিন:</span>
                  </div>
                  <p className="text-xs leading-relaxed opacity-90">
                    {activeTest.syntheticFakeResult}
                  </p>
                </div>
              </div>

              <div
                className="p-3.5 rounded-2xl border flex items-center justify-between gap-4"
                style={{
                  backgroundColor: isDark ? '#1F1712' : '#FFFFFF',
                  borderColor: isDark ? '#33261E' : '#E5DDD0',
                }}
              >
                <div className="flex items-center gap-2.5 text-xs font-bold">
                  <Award size={18} className="text-[#B45309] shrink-0" />
                  <span>{activeTest.scientificNote}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
