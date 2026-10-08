import React, { useState } from 'react';
import {
  CheckCircle2,
  Sparkles,
  Wrench,
  ShieldCheck,
  SlidersHorizontal,
  ArrowRight,
  ShoppingBag,
  Droplets,
  Headphones,
  Zap,
  Sun,
  Layers,
  Eye,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface AutoCareCatalogComparisonSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

interface AutoGearProduct {
  id: string;
  indexNum: string;
  category: 'Car & Bike Detailing' | 'Biker & Ride-Share' | 'Lighting & Wash';
  name: string;
  bnTitle: string;
  priceBdt: number;
  originalBdt: number;
  unitSpec: string;
  diyTime: string;
  warranty: string;
  problemSolved: string;
  keyBenefits: string[];
  image: string;
}

const AUTO_GEAR_CATALOG: AutoGearProduct[] = [
  {
    id: 'prod_ceramic_spray',
    indexNum: '01.',
    category: 'Car & Bike Detailing',
    name: 'Graphene 9H Nano Quick Ceramic Coating Spray (500ml Kit)',
    bnTitle: 'গ্রাফিন ৯এইচ কুইক সিরামিক কোটিং স্প্রে (৫০০ মিলি + মাইক্রোফাইবার টাওয়েল)',
    priceBdt: 950,
    originalBdt: 1450,
    unitSpec: '500ml Spray + 400 GSM Edged Towel',
    diyTime: '১০ মিনিটে নিজেই কোটিং করুন',
    warranty: '৪৫ দিনের হাইড্রোফোবিক শাইন গ্যারান্টি',
    problemSolved:
      'রোদে গাড়ি বা বাইকের রঙ ফ্যাকাসে হয়ে যাওয়া, বর্ষার কাদার দাগ এবং সার্ভিস সেন্টারে ৪,০০০ টাকার পলিশ খরচ বাঁচায়।',
    keyBenefits: [
      'Lotus Leaf Hydrophobic Effect — বৃষ্টির পানি ও কাদা পেইন্টে আটকে থাকে না',
      'UV400 Sun Protection — কড়া রোদেও ট্যাংক ও বনেটের রঙ জ্বলে যাওয়া রোধ করে',
      '১ বোতলে বাইক ১৫–১৮ বার এবং প্রাইভেট কার ৫–৬ বার ফুল কোটিং করা যায়',
    ],
    image:
      'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'prod_helmet_intercom',
    indexNum: '02.',
    category: 'Biker & Ride-Share',
    name: 'T-Com Pro IP67 Waterproof Helmet Bluetooth 5.3 Intercom',
    bnTitle: 'ওয়াটারপ্রুফ হেলমেট ব্লুটুথ ইন্টারকম (৪০ ঘণ্টা ব্যাটারি ব্যাকআপ)',
    priceBdt: 2650,
    originalBdt: 3500,
    unitSpec: 'Bluetooth 5.3 · IP67 Rainproof · 800m Range',
    diyTime: '৫ মিনিটে যেকোনো হেলমেটে ক্লিপ-ইন',
    warranty: '৬ মাসের অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি',
    problemSolved:
      'বাইক চালানোর সময় পকেট থেকে ফোন বের করার ঝুঁকি, বৃষ্টির মধ্যে নেভিগেশন না শোনা এবং পিলিয়নের সাথে কথা বলার সমস্যা দূর করে।',
    keyTitle: '',
    keyBenefits: [
      'IP67 Monsoon Waterproof — প্রচণ্ড ঝড়-বৃষ্টিতেও ১০০% নিরাপদ ও সচল',
      'DSP CVC 8.0 Wind Noise Cancellation — ৮০ কিমি/ঘণ্টা স্পিডেও ক্রিস্টাল ক্লিয়ার কল',
      'একবার চার্জে ৪০ ঘণ্টা টকটাইম — পাঠাও/উবার রাইডার ও হাইওয়ে ট্যুরারদের প্রথম পছন্দ',
    ],
    image:
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=85',
  } as any,
  {
    id: 'prod_pressure_washer',
    indexNum: '03.',
    category: 'Lighting & Wash',
    name: '48V Dual-Battery High-Pressure Car & Bike Washer Gun Kit',
    bnTitle: '৪৮ ভোল্ট কর্ডলেস হাই-প্রেশার কার ও বাইক ওয়াশার (ফোম ক্যানন ও ৫ মিটার পাইপসহ)',
    priceBdt: 3490,
    originalBdt: 4800,
    unitSpec: '350 PSI · Pure Copper Motor · 6-in-1 Nozzle',
    diyTime: 'বালতির পানি দিয়েই ১৫ মিনিটে ফুল ওয়াশ',
    warranty: '১ বছরের মোটর সার্ভিস ওয়ারেন্টি',
    problemSolved:
      'বাসার নিচে পানির ট্যাপ বা ইলেকট্রিক সকেট না থাকা এবং প্রতি সপ্তাহে ওয়াশ শপে ২০০-৫০০ টাকা ও ২ ঘণ্টা সময় নষ্ট হওয়া বন্ধ করে।',
    keyBenefits: [
      'Self-Priming Suction — যেকোনো বালতি বা পাত্র থেকে নিজেই পানি টেনে নেয়',
      'Snow Foam Cannon Included — শোরুমের মতো ঘন ফোম ওয়াশ এখন নিজের গ্যারেজে',
      '6-in-1 Adjustable Nozzle — চাকার কাদা পরিষ্কার থেকে শুরু করে গাছে পানি দেওয়া পর্যন্ত',
    ],
    image:
      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'prod_led_headlight',
    indexNum: '04.',
    category: 'Lighting & Wash',
    name: '120W CANBUS Tri-Color CSP LED Headlight Upgrade (H4 / H11 / 9005)',
    bnTitle: '১২০ ওয়াট ক্যানবাস এলইডি হেডলাইট আপগ্রেড (হাইওয়ে ও কুয়াশা স্পেশাল)',
    priceBdt: 1650,
    originalBdt: 2400,
    unitSpec: '18,000 Lumens · 6000K White / 3000K Gold',
    diyTime: '১০ মিনিটে প্লাগ-অ্যান্ড-প্লে ইনস্টলেশন',
    warranty: '১ বছরের ইনস্ট্যান্ট রিপ্লেসমেন্ট গ্যারান্টি',
    problemSolved:
      'স্টক হ্যালোজেন বাল্বের নিভু নিভু আলোয় রাতের হাইওয়েতে গর্ত না দেখা এবং বর্ষা বা শীতের কুয়াশায় অন্ধকারে ড্রাইভিংয়ের ঝুঁকি দূর করে।',
    keyBenefits: [
      '300% Brighter Focused Cutoff Beam — সামনের চালকের চোখে ধাঁধা না লাগিয়ে রাস্তা আলোকিত করে',
      'Dual Color Mode — পরিষ্কার রাতে সাদা (6000K) এবং বৃষ্টি/কুয়াশায় হলুদ (3000K) আলো',
      'Aviation Aluminum + 12,000 RPM Turbo Fan — কোনো তার কাটা বা ব্যাটারি ড্রেইন ছাড়াই চলে',
    ],
    image:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'prod_seat_cushion',
    indexNum: '05.',
    category: 'Biker & Ride-Share',
    name: '3D Air-Mesh & Medical Gel Ergonomic Seat Cushion (Bike & Car)',
    bnTitle: '৩ডি এয়ার-মেশ ও জেল সিট কুশন (কোমর ব্যথা ও সিট গরম হওয়া রোধক)',
    priceBdt: 890,
    originalBdt: 1300,
    unitSpec: 'Honeycomb Breathable Mesh + Shock-Absorb Gel',
    diyTime: '২ মিনিটে অ্যান্টি-স্লিপ বেল্ট ফিটমেন্ট',
    warranty: '২ বছর ডিফর্মেশন-ফ্রি গ্যারান্টি',
    problemSolved:
      'ঢাকার জ্যামে ঘণ্টার পর ঘণ্টা বসে কোমর ও মেরুদণ্ডে প্রচণ্ড ব্যথা, রোদে পার্ক করা সিট আগুনের মতো গরম হওয়া এবং ঘাম জমে অস্বস্তি দূর করে।',
    keyBenefits: [
      '3D Air-Channel Ventilation — সিট ও শরীরের মাঝে বাতাস চলাচল করে, সিট ৮°C ঠান্ডা রাখে',
      'Orthopedic Shock Absorption — ভাঙা রাস্তা ও স্পিডব্রেকারের ঝাঁকুনি ৬০% পর্যন্ত শোষণ করে',
      'Instant Rain Drain — বৃষ্টির পানি সিটে জমে থাকে না, ঝাড়া দিলেই ৫ সেকেন্ডে শুকিয়ে যায়',
    ],
    image:
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=85',
  },
];

interface ComparisonLabScenario {
  id: string;
  tabLabel: string;
  title: string;
  bnSubtitle: string;
  beforeLabel: string;
  beforeMetrics: string[];
  afterLabel: string;
  afterMetrics: string[];
  beforeImage: string;
  afterImage: string;
  quantifiedGain: string;
}

const COMPARISON_SCENARIOS: ComparisonLabScenario[] = [
  {
    id: 'ceramic_gloss',
    tabLabel: '01. Ceramic Spray (রঙ ও শাইন)',
    title: 'Oxidized Dull Paint vs. Graphene 9H Mirror Gloss Coating',
    bnSubtitle:
      'সাধারণ শ্যাম্পু ওয়াশের পর রোদে জ্বলে যাওয়া রঙ বনাম ১০ মিনিটের গ্রাফিন সিরামিক স্প্রে কোটিংয়ের পার্থক্য:',
    beforeLabel: 'BEFORE: Unprotected Paint (সাধারণ ওয়াশ)',
    beforeMetrics: [
      'বৃষ্টির পানি ও কাদা গায়ে লেগে দাগ বসে যায়',
      'রোদের UV রশ্মিতে ৬ মাসে কালার ফ্যাকাসে হয়ে যায়',
      'ধুলাবালি সহজেই আটকে যায় ও মাইক্রো-স্ক্র্যাচ পড়ে',
    ],
    afterLabel: 'AFTER: 1 Coat Graphene 9H Spray (১০ মিনিট পর)',
    afterMetrics: [
      '১০০% হাইড্রোফোবিক — পানি পড়ামাত্র মুক্তার মতো গড়িয়ে পড়ে',
      'গভীর ডিপ ওয়েট-লুক মিরর শাইন (Showroom Finish)',
      '৪৫ দিন পর্যন্ত ধুলা, কাদা ও অ্যাসিড রেইন থেকে সুরক্ষা',
    ],
    beforeImage:
      'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=900&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=900&q=85',
    quantifiedGain: '+320% Gloss Depth & 45-Day Water Repellency',
  },
  {
    id: 'led_beam',
    tabLabel: '02. LED Headlight (রাতের ভিজিবিলিটি)',
    title: 'Stock 35W Yellow Halogen vs. 120W CANBUS Focused LED Beam',
    bnSubtitle:
      'অন্ধকার হাইওয়ে ও বর্ষার রাতে স্টক হ্যালোজেন বাল্ব বনাম আমাদের ১২০ ওয়াট ক্যানবাস এলইডি প্রজেকশন:',
    beforeLabel: 'BEFORE: Stock Factory Halogen (৩০ মিটার রেঞ্জ)',
    beforeMetrics: [
      'হলুদ মৃদু আলোয় সামনের গর্ত বা স্পিডব্রেকার দেখা যায় না',
      'বৃষ্টি ও কুয়াশায় আলো রাস্তায় শোষিত হয়ে অন্ধকার লাগে',
      'অতিরিক্ত গরম হয়ে হেডলাইট রিফ্লেক্টর কালো করে ফেলে',
    ],
    afterLabel: 'AFTER: 120W CANBUS Tri-Color LED (১৫০ মিটার রেঞ্জ)',
    afterMetrics: [
      '৩০০% বেশি উজ্জ্বল ও শার্প অ্যান্টি-গ্লেয়ার কাট-অফ লাইন',
      '১ সুইচে সাদা (6000K) ও কুয়াশায় গোল্ডেন হলুদ (3000K) মোড',
      'টার্বো ফ্যান কুলিং — ব্যাটারির ওপর কোনো বাড়তি চাপ ফেলে না',
    ],
    beforeImage:
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=900&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85',
    quantifiedGain: '300% Longer Highway Sight Distance (150m Clear Cutoff)',
  },
  {
    id: 'washer_pressure',
    tabLabel: '03. Pressure Washer (কাদা পরিষ্কার)',
    title: 'Manual Bucket Mug Wash vs. 350 PSI Cordless Snow Foam Jet',
    bnSubtitle:
      'মগ ও কাপড় দিয়ে ঘষে রঙ নষ্ট করা বনাম ৪৮ ভোল্ট কর্ডলেস হাই-প্রেশার ফোম ওয়াশ:',
    beforeLabel: 'BEFORE: Mug & Rag Scrubbing (৪৫ মিনিট কষ্ট)',
    beforeMetrics: [
      'শুকনো কাদা কাপড় দিয়ে ঘষার ফলে পেইন্টে সুইরল স্ক্র্যাচ পড়ে',
      'চাকার রিম ও মাডগার্ডের ভেতরের কাদা কখনোই পরিষ্কার হয় না',
      '৩-৪ বালতি পানি ও প্রচুর শারীরিক পরিশ্রম লাগে',
    ],
    afterLabel: 'AFTER: 48V Cordless Foam Jet (১০ মিনিটে ওয়াশ)',
    afterMetrics: [
      'ঘন স্নো-ফোম কাদা নরম করে বিনা ঘষায় উঠিয়ে আনে',
      '৩৫০ PSI প্রেশার জেট ইঞ্জিন বে ও আন্ডারবডি নিখুঁত পরিষ্কার করে',
      'মাত্র ১ বালতি পানিতেই সম্পূর্ণ বাইক বা কার ওয়াশ সম্পন্ন',
    ],
    beforeImage:
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=900&q=85',
    quantifiedGain: 'Saves ৳800/Month Wash Bills & 75% Water Usage',
  },
];

export const AutoCareCatalogComparisonSection: React.FC<
  AutoCareCatalogComparisonSectionProps
> = ({
  title,
  subtitle,
  primaryColor = '#E11D48',
  isDark = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeComparisonIdx, setActiveComparisonIdx] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(52);
  const [quickCartNotice, setQuickCartNotice] = useState<string | null>(null);

  const filteredProducts =
    activeCategory === 'All'
      ? AUTO_GEAR_CATALOG
      : AUTO_GEAR_CATALOG.filter((p) => p.category === activeCategory);

  const activeScenario =
    COMPARISON_SCENARIOS[activeComparisonIdx] || COMPARISON_SCENARIOS[0];

  const handleSelectGear = (prod: AutoGearProduct) => {
    setQuickCartNotice(
      `"${prod.name}" (৳${prod.priceBdt.toLocaleString()}) সিলেক্ট করা হয়েছে — নিচের ফর্মে অর্ডার কনফার্ম করুন`
    );
    setTimeout(() => setQuickCartNotice(null), 3000);
    const el = document.getElementById('auto-bundles-cod-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      id="auto-catalog-section"
      className={`w-full transition-colors ${
        isDark ? 'bg-[#090D16] text-slate-100' : 'bg-white text-slate-900'
      }`}
    >
      {/* Floating Cart Toast */}
      {quickCartNotice && (
        <div
          className="fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl text-xs font-extrabold text-white shadow-2xl flex items-center gap-2"
          style={{ backgroundColor: primaryColor }}
        >
          <CheckCircle2 size={15} />
          <span>{quickCartNotice}</span>
        </div>
      )}

      {/* ================================================================= */}
      {/* PART A: 5-PRODUCT SIGNATURE LINEUP & DIY BENEFITS                 */}
      {/* ================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20 space-y-10">
        {/* Header & Interactive Category Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-bold tracking-wider uppercase text-rose-600 dark:text-rose-400">
              02. CORE 5-PRODUCT DIY DETAILING &amp; UPGRADE LINEUP
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              <EditableText
                id="auto_catalog_h2"
                defaultText={
                  title ||
                  'আমাদের ৫টি বেস্ট-সেলিং কার ও বাইক কেয়ার গিয়ার — নিজেই করুন শোরুম গ্রেড মেইনটেন্যান্স'
                }
              />
            </h2>
            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              <EditableText
                id="auto_catalog_subtitle"
                defaultText={
                  subtitle ||
                  'প্রতিটি প্রোডাক্ট বাংলাদেশের আবহাওয়া, ধুলাবালি ও রাস্তার কন্ডিশন মাথায় রেখে বাছাইকৃত। মেকানিক ছাড়াই বাসায় বসে ১০ মিনিটে ব্যবহারযোগ্য।'
                }
              />
            </p>
          </div>

          {/* Functional Segmented Filter Bar */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 self-start">
            {[
              'All',
              'Car & Bike Detailing',
              'Biker & Ride-Share',
              'Lighting & Wash',
            ].map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-extrabold transition cursor-pointer whitespace-nowrap ${
                    active
                      ? 'text-white shadow-xs'
                      : isDark
                      ? 'text-slate-400 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  style={active ? { backgroundColor: primaryColor } : undefined}
                >
                  {cat === 'All' ? 'সবগুলো গিয়ার (All 5)' : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-transform hover:-translate-y-0.5 ${
                isDark
                  ? 'bg-[#111827] border-slate-800'
                  : 'bg-[#F8FAFC] border-slate-200/90'
              }`}
            >
              <div>
                {/* Product Image Slot with Neutral Backdrop */}
                <div className="relative aspect-[4/3] w-full bg-slate-900 overflow-hidden border-b border-slate-200 dark:border-slate-800">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end justify-between p-3.5">
                    <span className="text-[11px] font-mono font-bold text-amber-400">
                      {prod.diyTime}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-400">
                      {prod.warranty}
                    </span>
                  </div>
                </div>

                {/* Card Copy Content */}
                <div className="p-5 space-y-3.5">
                  {/* Clean Unboxed Metadata Line */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    <span className="font-mono font-bold" style={{ color: primaryColor }}>
                      {prod.indexNum}
                    </span>
                    <span>·</span>
                    <span>{prod.category}</span>
                    <span>·</span>
                    <span>{prod.unitSpec}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold leading-snug">
                    {prod.name}
                  </h3>
                  <p className="text-xs font-bold text-rose-600 dark:text-amber-400">
                    {prod.bnTitle}
                  </p>

                  {/* Problem Solved Callout */}
                  <p
                    className={`text-xs leading-relaxed ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {prod.problemSolved}
                  </p>

                  {/* 3 Concrete Benefits */}
                  <ul className="space-y-1.5 pt-1 text-xs">
                    {prod.keyBenefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2">
                        <CheckCircle2
                          size={14}
                          className="text-emerald-500 shrink-0 mt-0.5"
                        />
                        <span className="opacity-90">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price & Contiguous Action Footer */}
              <div className="p-5 pt-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-xl font-black font-mono tabular-nums"
                      style={{ color: primaryColor }}
                    >
                      ৳{prod.priceBdt.toLocaleString()}
                    </span>
                    <span className="text-xs line-through opacity-50 font-mono tabular-nums">
                      ৳{prod.originalBdt.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    ক্যাশ অন ডেলিভারি এভেইলেবল
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectGear(prod)}
                  className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-white shadow-sm hover:opacity-95 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  style={{ backgroundColor: primaryColor }}
                >
                  <ShoppingBag size={14} />
                  <span>অর্ডার করুন</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* PART B: BEFORE & AFTER DETAILING & LIGHTING INTERACTIVE LAB       */}
      {/* ================================================================= */}
      <section
        id="auto-comparison-section"
        className={`border-t py-16 lg:py-20 ${
          isDark
            ? 'bg-[#0D1322] border-slate-800'
            : 'bg-[#0F172A] text-white border-slate-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          {/* Header & Scenario Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs font-bold tracking-wider uppercase text-amber-400">
                03. BEFORE &amp; AFTER VISUAL PROOF LAB
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                <EditableText
                  id="auto_comparison_h2"
                  defaultText="চোখের সামনে পার্থক্য দেখুন — সাধারণ মেইনটেন্যান্স বনাম TorqueGear DIY আপগ্রেড"
                />
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                স্লাইডারটি ডানে-বামে টেনে দেখুন কিভাবে গ্রাফিন সিরামিক স্প্রে, ১২০ ওয়াট এলইডি হেডলাইট এবং হাই-প্রেশার ফোম ওয়াশার আপনার গাড়ি ও বাইকের লুক এবং সেফটি বদলে দেয়।
              </p>
            </div>

            {/* Scenario Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start">
              {COMPARISON_SCENARIOS.map((scen, idx) => {
                const active = activeComparisonIdx === idx;
                return (
                  <button
                    key={scen.id}
                    type="button"
                    onClick={() => setActiveComparisonIdx(idx)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-extrabold transition cursor-pointer whitespace-nowrap ${
                      active
                        ? 'text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    style={active ? { backgroundColor: primaryColor } : undefined}
                  >
                    {scen.tabLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Split Comparison Viewer + Side-by-Side Proof Table */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Interactive Before/After Slider Canvas */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 select-none">
                {/* AFTER Image (Full Base Layer) */}
                <img
                  src={activeScenario.afterImage}
                  alt={activeScenario.afterLabel}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {/* BEFORE Image (Clipped Left Layer) */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={activeScenario.beforeImage}
                    alt={activeScenario.beforeLabel}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-75 contrast-90 saturate-50"
                    style={{ width: '100vw', maxWidth: '760px' }}
                  />
                </div>

                {/* Vertical Divider Handle */}
                <div
                  className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.9)] pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div
                    className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full text-white flex items-center justify-center shadow-xl border-2 border-white text-xs font-black"
                    style={{ backgroundColor: primaryColor }}
                  >
                    ↔
                  </div>
                </div>

                {/* Top Labels */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-black/75 text-slate-200 text-[11px] font-bold">
                  {activeScenario.beforeLabel}
                </div>
                <div
                  className="absolute top-3 right-3 px-3 py-1 rounded-md text-white text-[11px] font-extrabold"
                  style={{ backgroundColor: primaryColor }}
                >
                  {activeScenario.afterLabel}
                </div>

                {/* Bottom Quantified Gain Bar */}
                <div className="absolute bottom-3 inset-x-3 px-4 py-2.5 rounded-xl bg-black/80 backdrop-blur-xs border border-white/10 flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-400">
                    {activeScenario.quantifiedGain}
                  </span>
                  <span className="font-mono tabular-nums text-slate-300">
                    Split: {sliderPosition}% / {100 - sliderPosition}%
                  </span>
                </div>
              </div>

              {/* Range Slider Control */}
              <div className="flex items-center gap-4 px-2">
                <span className="text-xs font-bold text-slate-400 whitespace-nowrap">
                  আগের অবস্থা (Before)
                </span>
                <input
                  type="range"
                  min={10}
                  max={90}
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  aria-label="Before and After Comparison Slider"
                  className="w-full accent-rose-600 cursor-pointer"
                />
                <span className="text-xs font-bold text-emerald-400 whitespace-nowrap">
                  ব্যবহারের পর (After)
                </span>
              </div>
            </div>

            {/* Right: Before vs After Breakdown Card */}
            <div className="lg:col-span-5 rounded-2xl bg-slate-900/90 border border-slate-800 p-6 space-y-5">
              <div className="space-y-1.5">
                <h3 className="text-lg font-extrabold text-white leading-snug">
                  {activeScenario.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeScenario.bnSubtitle}
                </p>
              </div>

              {/* Before Box */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="text-xs font-extrabold text-rose-400">
                  ✕ {activeScenario.beforeLabel}
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeScenario.beforeMetrics.map((m) => (
                    <li key={m} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* After Box */}
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/70 space-y-2">
                <div className="text-xs font-extrabold text-emerald-400">
                  ✓ {activeScenario.afterLabel}
                </div>
                <ul className="space-y-1.5 text-xs text-emerald-100">
                  {activeScenario.afterMetrics.map((m) => (
                    <li key={m} className="flex items-start gap-2">
                      <CheckCircle2
                        size={14}
                        className="text-emerald-400 shrink-0 mt-0.5"
                      />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('auto-bundles-cod-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3.5 rounded-xl text-xs font-extrabold text-white shadow-lg hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer"
                style={{ backgroundColor: primaryColor }}
              >
                <span>এই গিয়ারটি অর্ডার করতে ক্লিক করুন</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
