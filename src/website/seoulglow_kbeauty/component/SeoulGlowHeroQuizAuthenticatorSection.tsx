import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  QrCode,
  ArrowRight,
  Droplets,
  Sun,
  HeartPulse,
  Flame,
  Search,
  Award,
  ShoppingBag,
  Eye,
  X,
  Check,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface SeoulGlowHeroQuizAuthenticatorSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

interface HeroFlagshipBottle {
  id: string;
  brand: string;
  name: string;
  bnTag: string;
  volume: string;
  priceBdt: string;
  oldPriceBdt: string;
  keyActives: string;
  phLevel: string;
  batchSample: string;
  originPort: string;
  image: string;
  clinicalNote: string;
}

const HERO_FLAGSHIP_BOTTLES: HeroFlagshipBottle[] = [
  {
    id: 'cosrx_snail_96',
    brand: 'COSRX · SEOUL',
    name: 'Advanced Snail 96 Mucin Power Essence',
    bnTag: 'ড্যামেজড স্কিন রিপেয়ার ও ইন্সট্যান্ট গ্লাস-স্কিন হাইড্রেশন',
    volume: '100ml · Airless Pump Bottle',
    priceBdt: '৳ 1,650',
    oldPriceBdt: '৳ 2,100',
    keyActives: '96.3% Snail Secretion Filtrate · 1,000ppm Sodium Hyaluronate · Panthenol',
    phLevel: 'pH 6.5 ± 0.5 (Skin-Neutral)',
    batchSample: 'COSRX-KR-88294',
    originPort: 'Incheon Air Cargo Lot #KR-2609',
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=85',
    clinicalNote:
      '১০০% ক্রুয়েলটি-ফ্রি স্নেইল মিউসিন যা ব্রণের গর্ত, শুষ্কতা ও লালচে ভাব ৭ দিনে দৃশ্যমানভাবে কমিয়ে আনে।',
  },
  {
    id: 'boj_relief_sun',
    brand: 'BEAUTY OF JOSEON',
    name: 'Relief Sun : Rice + Probiotics SPF50+ PA++++',
    bnTag: 'হোয়াইট কাস্ট ছাড়া হালকা ময়েশ্চারাইজিং কোরিয়ান সানস্ক্রিন',
    volume: '50ml · Certified UV Lab Tested',
    priceBdt: '৳ 1,550',
    oldPriceBdt: '৳ 1,950',
    keyActives: '30% Oryza Sativa (Rice) Extract · Grain Ferment Probiotics · Niacinamide',
    phLevel: 'pH 6.8 (Zero Eye-Sting)',
    batchSample: 'BOJ-SEOUL-44109',
    originPort: 'Seoul Kolmar Lab Batch #BJ-904',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85',
    clinicalNote:
      'বাংলাদেশের আর্দ্র আবহাওয়ায় একদমই তেলতেলে হয় না এবং মেকআপের নিচে প্রাইমারের মতো গ্লাস-স্কিন ফিনিশ দেয়।',
  },
  {
    id: 'anua_heartleaf_77',
    brand: 'ANUA · KOREA',
    name: 'Heartleaf 77% Soothing Toner',
    bnTag: 'সেনসিটিভ ত্বক, র‍্যাশ ও ওপেন পোরস শান্ত করার নাম্বার ১ টোনার',
    volume: '250ml · Non-Comedogenic Tested',
    priceBdt: '৳ 1,890',
    oldPriceBdt: '৳ 2,350',
    keyActives: '77% Houttuynia Cordata Extract · Centella Asiatica · Burdock Root',
    phLevel: 'pH 5.5–6.0 (Sub-Acidic Barrier Safe)',
    batchSample: 'ANUA-77-90312',
    originPort: 'Busan Official Distributor #AN-772',
    image:
      'https://images.unsplash.com/photo-1608248597359-0e6d526a6c58?auto=format&fit=crop&w=900&q=85',
    clinicalNote:
      'অতিরিক্ত তেল (Sebum) নিয়ন্ত্রণ করে এবং রোদে পোড়া বা ব্রণ-প্রবণ ত্বকের জ্বালাপোড়া তাৎক্ষণিক কমায়।',
  },
];

interface SkinConcernCardItem {
  id: string;
  titleEn: string;
  titleBn: string;
  ingredients: string;
  recommendedHero: string;
  priceFrom: string;
  descriptionBn: string;
  image: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const SKIN_CONCERN_CARDS: SkinConcernCardItem[] = [
  {
    id: 'acne_pimple',
    titleEn: 'Acne & Pimple Care',
    titleBn: 'ব্রণ ও র‍্যাশ দূর করতে',
    ingredients: '77% Heartleaf · Centella Asiatica · 2% BHA',
    recommendedHero: 'Anua Heartleaf 77% Toner + Skin1004 Centella Ampoule',
    priceFrom: 'Starts at ৳ 1,590',
    descriptionBn:
      'পোরসের ভেতরের জমে থাকা ডেড সেল ও ব্যাকটেরিয়া পরিষ্কার করে নতুন ব্রণ ওঠা বন্ধ করে এবং লালচে র‍্যাশ শান্ত রাখে।',
    image:
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=700&q=80',
    icon: Flame,
  },
  {
    id: 'dark_spots',
    titleEn: 'Dark Spots & Pigmentation',
    titleBn: 'মেছতা ও কালো দাগ হালকা করতে',
    ingredients: '5% Niacinamide · 68% Rice Bran · 2% Alpha-Arbutin',
    recommendedHero: 'AXIS-Y Dark Spot Glow Serum + BOJ Glow Deep Serum',
    priceFrom: 'Starts at ৳ 1,490',
    descriptionBn:
      'রোদে পোড়া কালচে ভাব, ব্রণের পুরনো জেদি দাগ ও মেছতা (Melasma) হালকা করে ত্বকের রঙ সমান ও উজ্জ্বল করে।',
    image:
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=700&q=80',
    icon: Sun,
  },
  {
    id: 'oily_pores',
    titleEn: 'Oily & Open Pores',
    titleBn: 'তৈলাক্ত ত্বক ও পোরস টাইটেনিং',
    ingredients: 'Salicylic Acid · Green Plum · Red Bean Extract',
    recommendedHero: 'COSRX BHA Blackhead Power Liquid + Anua Pore Control',
    priceFrom: 'Starts at ৳ 1,550',
    descriptionBn:
      'নাকের ব্ল্যাকহেডস ও হোয়াইটহেডস গলিয়ে বের করে আনে এবং বড় হয়ে যাওয়া ওপেন পোরস সংকুচিত করে ম্যাট-গ্লো ফিনিশ দেয়।',
    image:
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=700&q=80',
    icon: Droplets,
  },
  {
    id: 'dry_dull',
    titleEn: 'Dry & Dull Skin',
    titleBn: 'শুষ্ক ত্বক ও গ্লাস-স্কিন গ্লো',
    ingredients: '96% Snail Mucin · 10-Layer Hyaluronic Acid · Birch Sap',
    recommendedHero: 'COSRX Snail 96 Mucin Essence + BOJ Relief Sun SPF50+',
    priceFrom: 'Starts at ৳ 1,650',
    descriptionBn:
      'রুক্ষ ও প্রাণহীন ত্বকের গভীরে ৭২ ঘণ্টা আর্দ্রতা ধরে রাখে এবং ড্যামেজড স্কিন ব্যারিয়ার রিপেয়ার করে কাঁচের মতো উজ্জ্বলতা দেয়।',
    image:
      'https://images.unsplash.com/photo-1512290900672-1f04d6e0a153?auto=format&fit=crop&w=700&q=80',
    icon: HeartPulse,
  },
];

interface VerifiedBatchRecord {
  code: string;
  productName: string;
  brand: string;
  mfgDate: string;
  expDate: string;
  koreanFactory: string;
  importAirwayBill: string;
  kfdaStatus: string;
}

const VERIFIED_KOREAN_BATCH_DB: Record<string, VerifiedBatchRecord> = {
  'COSRX-KR-88294': {
    code: 'COSRX-KR-88294',
    productName: 'COSRX Advanced Snail 96 Mucin Power Essence (100ml)',
    brand: 'COSRX Inc. (Seoul, South Korea)',
    mfgDate: '14 August 2026',
    expDate: '13 August 2029',
    koreanFactory: 'Cosmax Korea Plant #2, Gyeonggi-do, Korea',
    importAirwayBill: 'KE-9642 (Korean Air Cargo · Incheon → Dhaka HSIA)',
    kfdaStatus: '100% Authentic · HiddenTag Hologram Verified',
  },
  'BOJ-SEOUL-44109': {
    code: 'BOJ-SEOUL-44109',
    productName: 'Beauty of Joseon Relief Sun : Rice + Probiotics SPF50+ PA++++ (50ml)',
    brand: 'Goodai Global Inc. (Beauty of Joseon)',
    mfgDate: '02 September 2026',
    expDate: '01 September 2029',
    koreanFactory: 'Kolmar Korea Co., Ltd., Sejong-si, South Korea',
    importAirwayBill: 'OZ-7819 (Asiana Cargo · Seoul → Dhaka)',
    kfdaStatus: '100% Authentic · KFDA UV Protection Certified',
  },
  'ANUA-77-90312': {
    code: 'ANUA-77-90312',
    productName: 'Anua Heartleaf 77% Soothing Toner (250ml)',
    brand: 'The Founders Inc. (Anua Official Korea)',
    mfgDate: '21 July 2026',
    expDate: '20 July 2029',
    koreanFactory: 'Megacos Korea Co., Ltd., Eumseong-gun, Korea',
    importAirwayBill: 'KE-9655 (Korean Air Cargo · Incheon → Dhaka)',
    kfdaStatus: '100% Authentic · Official Lot Seal Intact',
  },
  'SKIN1004-2026-KR': {
    code: 'SKIN1004-2026-KR',
    productName: 'SKIN1004 Madagascar Centella Ampoule (100ml)',
    brand: 'Craver Corporation (Gangnam-gu, Seoul)',
    mfgDate: '05 September 2026',
    expDate: '04 September 2029',
    koreanFactory: 'Korea Tech Lab, Incheon Free Economic Zone',
    importAirwayBill: 'KE-9680 (Korean Air Cargo · Direct Cold-Chain)',
    kfdaStatus: '100% Authentic · Lot Barcode Matched',
  },
};

export const SeoulGlowHeroQuizAuthenticatorSection: React.FC<
  SeoulGlowHeroQuizAuthenticatorSectionProps
> = ({ title, subtitle, variant, primaryColor, isDark }) => {
  const [selectedBottleIdx, setSelectedBottleIdx] = useState<number>(0);
  const [selectedConcernId, setSelectedConcernId] = useState<string>('acne_pimple');
  const [isQuizModalOpen, setIsQuizModalOpen] = useState<boolean>(false);
  const [quizSkinType, setQuizSkinType] = useState<'oily' | 'dry' | 'combo' | 'sensitive'>('oily');
  const [quizConcern, setQuizConcern] = useState<'acne' | 'spots' | 'pores' | 'glow'>('acne');
  const [quizClimate, setQuizClimate] = useState<'humid' | 'ac' | 'sun'>('humid');
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Batch Code Verifier state
  const [batchInput, setBatchInput] = useState<string>('COSRX-KR-88294');
  const [verifiedResult, setVerifiedResult] = useState<VerifiedBatchRecord | null>(
    VERIFIED_KOREAN_BATCH_DB['COSRX-KR-88294']
  );
  const [batchError, setBatchError] = useState<boolean>(false);
  const [selectedConcernModal, setSelectedConcernModal] = useState<SkinConcernCardItem | null>(null);

  const activeBottle = HERO_FLAGSHIP_BOTTLES[selectedBottleIdx] || HERO_FLAGSHIP_BOTTLES[0];
  const isBrutalist = variant === 'varient_3';
  const coralColor = primaryColor || '#E07A5F';

  const handleVerifyBatch = (codeToTest?: string) => {
    const raw = (codeToTest ?? batchInput).trim().toUpperCase();
    setBatchInput(raw);
    if (VERIFIED_KOREAN_BATCH_DB[raw]) {
      setVerifiedResult(VERIFIED_KOREAN_BATCH_DB[raw]);
      setBatchError(false);
    } else {
      setVerifiedResult(null);
      setBatchError(true);
    }
  };

  const scrollToTarget = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Dynamic Quiz Recommendation
  const getQuizRecommendation = () => {
    if (quizConcern === 'acne' || quizSkinType === 'sensitive') {
      return {
        kitTitle: 'Calming Acne & Barrier Repair 3-Step Kit',
        bnTitle: 'ব্রণ, র‍্যাশ ও সেনসিটিভ ত্বকের ৩-স্টেপ কোরিয়ান রুটিন',
        step1: 'COSRX Low pH Good Morning Gel Cleanser (150ml)',
        step2: 'Anua Heartleaf 77% Soothing Toner (250ml) + Skin1004 Centella',
        step3: 'Beauty of Joseon Relief Sun SPF50+ PA++++ (50ml)',
        bundlePrice: '৳ 3,890',
        regularPrice: '৳ 4,750',
        whyWorks:
          'বাংলাদেশের আর্দ্র আবহাওয়ায় পোরস ব্লক না করে অতিরিক্ত সিবাম নিয়ন্ত্রণ করে এবং ব্রণের লালচে ভাব ৪৮ ঘণ্টায় কমিয়ে আনে।',
      };
    }
    if (quizConcern === 'spots') {
      return {
        kitTitle: 'Melasma & Dark Spot Correcting Glass-Skin Kit',
        bnTitle: 'মেছতা, ব্রণের কালো দাগ ও ব্রাইটেনিং ৩-স্টেপ রুটিন',
        step1: 'Round Lab 1025 Dokdo Cleanser (150ml)',
        step2: 'AXIS-Y Dark Spot Correcting Glow Serum (5% Niacinamide)',
        step3: 'Beauty of Joseon Relief Sun : Rice + Probiotics SPF50+',
        bundlePrice: '৳ 3,990',
        regularPrice: '৳ 4,850',
        whyWorks:
          '৫% নায়াসিনামাইড এবং রাইস প্রোবায়োটিকস ত্বকের মেলানিন উৎপাদন কমিয়ে ৩–৪ সপ্তাহে কালো দাগ হালকা করে।',
      };
    }
    return {
      kitTitle: 'Ultimate 96% Snail Mucin Glass-Skin Starter Kit',
      bnTitle: 'গ্লাস-স্কিন গ্লো, পোরস টাইটেনিং ও ডিপ হাইড্রেশন কম্বো',
      step1: 'COSRX Low pH Good Morning Gel Cleanser (150ml)',
      step2: 'COSRX Advanced Snail 96 Mucin Power Essence (100ml)',
      step3: 'Beauty of Joseon Relief Sun : Rice + Probiotics SPF50+ (50ml)',
      bundlePrice: '৳ 3,990',
      regularPrice: '৳ 4,800',
      whyWorks:
        '৯৬% স্নেইল মিউসিন এবং রাইস এক্সট্র্যাক্ট ত্বকের ড্যামেজড ব্যারিয়ার রিপেয়ার করে কোরিয়ান গ্লাস-স্কিন গ্লো ফিরিয়ে আনে।',
    };
  };

  const quizRec = getQuizRecommendation();

  return (
    <section
      className={`relative overflow-hidden transition-colors ${
        isDark
          ? 'bg-[#0E1014] text-stone-100'
          : 'bg-gradient-to-b from-[#FFF5F5] via-[#FAFAFA] to-white text-[#222222]'
      }`}
    >
      {/* Subtle Ambient Glass-Skin Glow Orbs */}
      {!isDark && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-45"
            style={{ backgroundColor: '#D8E2DC' }}
          />
          <div
            className="absolute top-1/3 -left-24 w-80 h-80 rounded-full blur-3xl opacity-35"
            style={{ backgroundColor: '#FFE4E1' }}
          />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-16 sm:py-16 space-y-16">
        {/* ===================================================================== */}
        {/* PART 1: SPLIT-SCREEN HERO (MOBILE IMAGE-TOP, DESKTOP SPLIT)          */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: High-Converting Bilingual Copy & CTAs (Order 2 on Mobile, 1 on Desktop) */}
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            {/* Clean Unboxed Kicker Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold tracking-wider uppercase">
              <span className="text-[#06B6D4] flex items-center gap-1">
                <ShieldCheck size={15} />
                100% Authentic Korean Skincare
              </span>
              <span aria-hidden="true" className="text-stone-400">·</span>
              <span className="text-[#6B7280] dark:text-stone-400">
                Direct Seoul Air-Freight Import 🇰🇷
              </span>
              <span aria-hidden="true" className="text-stone-400">·</span>
              <span style={{ color: coralColor }}>KFDA &amp; BSTI Verified</span>
            </div>

            {/* Primary Bilingual Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black tracking-tight leading-[1.2]">
              <EditableText
                id="seoulglow_hero_main_headline"
                defaultText={
                  title ||
                  'কোরিয়ান গ্লাস-স্কিন এখন আর স্বপ্ন নয় — ১০০% অথেনটিক কে-বিউটি প্রোডাক্টে পান দাগহীন, উজ্জ্বল ও স্বাস্থ্যকর ত্বক!'
                }
              />
            </h1>

            {/* Persuasive Sub-Headline */}
            <p className="text-sm sm:text-base text-[#6B7280] dark:text-stone-300 leading-relaxed max-w-2xl">
              <EditableText
                id="seoulglow_hero_main_subtitle"
                defaultText={
                  subtitle ||
                  'লোকাল মার্কেটের ভেজাল ও রেপ্লিকা কসমেটিকস ব্যবহার করে ত্বকের বারোটা বাজাবেন না। আমরা সরাসরি দক্ষিণ কোরিয়ার অফিশিয়াল ডিস্ট্রিবিউটর থেকে আমদানি করি ১০০% আসল স্কিনকেয়ার (COSRX, Beauty of Joseon, Anua, Skin1004, Axis-Y)।'
                }
              />
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={() => scrollToTarget('seoulglow-catalog')}
                className={`px-6 py-4 text-xs sm:text-sm font-extrabold text-white flex items-center justify-center gap-2.5 shadow-md transition hover:opacity-95 cursor-pointer ${
                  isBrutalist
                    ? 'rounded-none border-2 border-[#222222] shadow-[4px_4px_0px_#222222]'
                    : 'rounded-2xl'
                }`}
                style={{ backgroundColor: coralColor }}
              >
                <ShoppingBag size={17} />
                <span>আপনার ত্বকের ধরন অনুযায়ী শপ করুন (Shop Now)</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => {
                  setQuizCompleted(false);
                  setIsQuizModalOpen(true);
                }}
                className={`px-5 py-4 text-xs sm:text-sm font-extrabold border-2 flex items-center justify-center gap-2 transition cursor-pointer ${
                  isDark
                    ? 'bg-stone-900 border-stone-700 text-stone-100 hover:border-cyan-400'
                    : 'bg-white border-[#222222] text-[#222222] hover:bg-[#D8E2DC]/40'
                } ${isBrutalist ? 'rounded-none' : 'rounded-2xl'}`}
              >
                <Sparkles size={16} className="text-[#06B6D4]" />
                <span>Take the 30-Second Skin Quiz · ফ্রি রুটিন টেস্ট</span>
              </button>
            </div>

            {/* 4-Point Trust Strip */}
            <div
              className={`p-4 rounded-2xl border grid grid-cols-2 sm:grid-cols-4 gap-3 ${
                isDark
                  ? 'bg-stone-900/80 border-stone-800'
                  : 'bg-white/90 border-[#F3F4F6] shadow-xs'
              }`}
            >
              {[
                {
                  title: '100% Imported from Seoul',
                  sub: 'সরাসরি কোরিয়া থেকে আমদানিকৃত',
                },
                {
                  title: 'BSTI & KFDA Approved',
                  sub: 'ডার্মাটোলজিস্ট টেস্টেড ফর্মুলা',
                },
                {
                  title: 'Cash on Delivery Available',
                  sub: 'হাতে পেয়ে বারকোড চেক করে পেমেন্ট',
                },
                {
                  title: 'Batch Code Verified',
                  sub: 'নকল প্রমাণে ১০ গুণ টাকা ফেরত',
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-2">
                  <CheckCircle2
                    size={15}
                    className="text-[#06B6D4] shrink-0 mt-0.5"
                  />
                  <div>
                    <div className="text-[11px] font-extrabold leading-tight">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-[#6B7280] dark:text-stone-400 mt-0.5">
                      {item.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Glass-Skin Stone Tray Product Showcase (Order 1 on Mobile, 2 on Desktop) */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div
              className={`rounded-3xl p-5 sm:p-6 border transition-all ${
                isDark
                  ? 'bg-[#16181E] border-stone-800'
                  : 'bg-white border-[#F3F4F6] shadow-[0_20px_50px_rgba(224,122,95,0.10)]'
              }`}
            >
              {/* Top Authenticity Header inside Hero Card */}
              <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-stone-100 dark:border-stone-800">
                <div className="flex items-center gap-2 text-xs font-extrabold">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#06B6D4]" />
                  <span>{activeBottle.brand}</span>
                  <span aria-hidden="true" className="text-stone-300">·</span>
                  <span className="text-[#06B6D4] font-mono text-[11px]">
                    Lot #{activeBottle.batchSample}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  ✓ 100% Authentic
                </span>
              </div>

              {/* Main Product Visual with Glass-Skin Overlay */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#FFF5F5] dark:bg-stone-900">
                <img
                  src={activeBottle.image}
                  alt={activeBottle.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-white/95 text-[#222222] text-[11px] font-extrabold shadow-xs">
                    Made in Korea 🇰🇷 · {activeBottle.phLevel}
                  </span>
                  <span
                    className="px-2.5 py-1 rounded-lg text-white text-[11px] font-extrabold shadow-xs"
                    style={{ backgroundColor: '#06B6D4' }}
                  >
                    HiddenTag Verified
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-[11px] font-semibold text-rose-200">
                    {activeBottle.bnTag}
                  </p>
                  <h2 className="text-base sm:text-lg font-black leading-snug">
                    {activeBottle.name}
                  </h2>
                </div>
              </div>

              {/* Clinical Actives & Price Row */}
              <div className="mt-4 space-y-3">
                <div className="text-xs text-[#6B7280] dark:text-stone-300 leading-relaxed">
                  <strong className="text-[#222222] dark:text-white">
                    Key Clinical Actives:
                  </strong>{' '}
                  {activeBottle.keyActives}
                </div>

                <p className="text-xs text-[#222222] dark:text-stone-200 bg-[#FFF5F5] dark:bg-stone-900/90 px-3 py-2 rounded-xl border border-rose-100 dark:border-stone-800">
                  ✨ {activeBottle.clinicalNote}
                </p>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-2xl font-black"
                        style={{ color: coralColor }}
                      >
                        {activeBottle.priceBdt}
                      </span>
                      <span className="text-xs line-through text-[#6B7280]">
                        {activeBottle.oldPriceBdt}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#6B7280] dark:text-stone-400">
                      {activeBottle.originPort}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => scrollToTarget('seoulglow-cod-checkout')}
                    className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-white shadow-xs transition hover:opacity-95 cursor-pointer"
                    style={{ backgroundColor: coralColor }}
                  >
                    অর্ডার করুন (Buy Now)
                  </button>
                </div>

                {/* Switcher Tabs for the 3 Hero Viral Bottles */}
                <div className="pt-2 border-t border-stone-100 dark:border-stone-800 grid grid-cols-3 gap-2">
                  {HERO_FLAGSHIP_BOTTLES.map((b, idx) => {
                    const active = idx === selectedBottleIdx;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setSelectedBottleIdx(idx)}
                        className={`p-2 rounded-xl text-left border transition cursor-pointer ${
                          active
                            ? 'border-[#E07A5F] bg-[#FFF5F5] dark:bg-stone-800'
                            : 'border-stone-200 dark:border-stone-800 opacity-75 hover:opacity-100'
                        }`}
                      >
                        <div className="text-[10px] font-extrabold truncate">
                          {b.brand.split(' ')[0]}
                        </div>
                        <div className="text-[10px] text-[#6B7280] truncate">
                          {b.priceBdt}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* PART 2: INTERACTIVE "SHOP BY SKIN CONCERN" GRID (PROBLEM-FIRST)       */}
        {/* ===================================================================== */}
        <div id="seoulglow-skin-concerns" className="space-y-6 pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-[#06B6D4]">
                Problem-First Dermatological Curation · ত্বকের সমস্যা অনুযায়ী সমাধান
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
                <EditableText
                  id="seoulglow_concern_heading"
                  defaultText="আপনার ত্বকের মূল সমস্যা কোনটি? (Shop by Skin Concern)"
                />
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-stone-400 mt-1">
                বাংলাদেশের আবহাওয়া, অতিরিক্ত আর্দ্রতা ও রোদে ত্বকের ৪টি প্রধান সমস্যার জন্য দক্ষিণ কোরিয়ার ক্লিনিক্যালি প্রমাণিত সমাধান। যেকোনো কার্ডে ক্লিক করে বিস্তারিত রুটিন দেখুন।
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setQuizCompleted(false);
                setIsQuizModalOpen(true);
              }}
              className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold bg-[#D8E2DC] text-[#222222] hover:opacity-90 transition cursor-pointer"
            >
              <Sparkles size={14} />
              <span>Confused? Take 30-Sec Skin Quiz →</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SKIN_CONCERN_CARDS.map((card) => {
              const Icon = card.icon;
              const isSelected = selectedConcernId === card.id;
              return (
                <div
                  key={card.id}
                  onClick={() => {
                    setSelectedConcernId(card.id);
                    setSelectedConcernModal(card);
                  }}
                  className={`group rounded-2xl overflow-hidden border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-2 border-[#E07A5F] shadow-md'
                      : isDark
                      ? 'bg-[#16181E] border-stone-800 hover:border-stone-700'
                      : 'bg-white border-[#F3F4F6] hover:border-rose-200 shadow-xs'
                  }`}
                >
                  <div>
                    <div className="relative h-44 overflow-hidden bg-stone-100 dark:bg-stone-900">
                      <img
                        src={card.image}
                        alt={card.titleEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                      <div className="absolute top-3 left-3 w-8 h-8 rounded-xl bg-white/95 text-[#222222] flex items-center justify-center shadow-xs">
                        <Icon size={16} />
                      </div>
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/65 text-white text-[10px] font-bold backdrop-blur-xs flex items-center gap-1">
                        <Eye size={11} />
                        <span>View Routine</span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="text-sm font-black leading-tight">
                          {card.titleEn}
                        </div>
                        <div className="text-xs text-rose-200 font-bold mt-0.5">
                          {card.titleBn}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-2.5">
                      <div className="text-[11px] font-extrabold text-[#06B6D4]">
                        Actives: {card.ingredients}
                      </div>
                      <p className="text-xs text-[#6B7280] dark:text-stone-300 leading-relaxed">
                        {card.descriptionBn}
                      </p>
                      <div className="pt-1 text-[11px] font-bold text-[#222222] dark:text-stone-200">
                        Top Pick: {card.recommendedHero}
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-extrabold">
                    <span style={{ color: coralColor }}>{card.priceFrom}</span>
                    <span className="inline-flex items-center gap-1 text-[#222222] dark:text-white group-hover:translate-x-0.5 transition-transform">
                      <span>Full Routine</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* PART 3: THE "FAKE VS. ORIGINAL" AUTHENTICITY GUARANTEE & BATCH CHECK  */}
        {/* ===================================================================== */}
        <div
          id="seoulglow-authenticity"
          className={`rounded-3xl p-6 sm:p-8 lg:p-10 border ${
            isDark
              ? 'bg-[#14171F] border-cyan-500/30'
              : 'bg-white border-[#E5E7EB] shadow-sm'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Side-by-Side Fake vs Original Visual Guide */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#06B6D4]">
                <ShieldCheck size={16} />
                <span>Counterfeit Protection · নকল কসমেটিকস থেকে সাবধান!</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                <EditableText
                  id="seoulglow_fake_vs_original_title"
                  defaultText="কীভাবে চিনবেন আসল ও নকল COSRX বা Beauty of Joseon? (Fake vs. Original Guide)"
                />
              </h3>

              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-stone-300 leading-relaxed">
                বাংলাদেশে চকবাজার বা নামহীন ফেসবুক পেজে ৩০০–৫০০ টাকায় যেসব কোরিয়ান সিরাম ও সানস্ক্রিন বিক্রি হয়, তার ৯৯% ক্ষতিকর মার্কারি ও সস্তা সুগন্ধি মেশানো রেপ্লিকা। অর্ডার করার আগে আসল ও নকলের ৪টি প্রধান পার্থক্য দেখে নিন:
              </p>

              {/* Comparison Table: Original vs Fake */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {/* 100% Authentic SeoulGlow Card */}
                <div
                  className={`rounded-2xl p-4 border-2 ${
                    isDark
                      ? 'bg-cyan-950/25 border-[#06B6D4]'
                      : 'bg-[#ECFEFF]/60 border-[#06B6D4]'
                  } space-y-3`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-[#0E7490] dark:text-cyan-300 flex items-center gap-1.5">
                      <CheckCircle2 size={15} className="text-[#06B6D4]" />
                      SeoulGlow 100% Original 🇰🇷
                    </span>
                    <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300">
                      KFDA Verified
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs text-[#222222] dark:text-stone-200">
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-[#06B6D4] shrink-0 mt-0.5" />
                      <span>
                        <strong>HiddenTag / Official Hologram:</strong> প্রতিটি বক্সে স্ক্যানযোগ্য কোরিয়ান হিডেনট্যাগ ও অফিশিয়াল বারকোড থাকে।
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-[#06B6D4] shrink-0 mt-0.5" />
                      <span>
                        <strong>True Mucin Stringiness &amp; Zero Fragrance:</strong> COSRX Snail 96 আসল এসেন্সে কোনো কৃত্রিম পারফিউমের গন্ধ থাকে না এবং আঙুলে নিলে প্রাকৃতিক স্ট্রেচি টেক্সচার পাওয়া যায়।
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-[#06B6D4] shrink-0 mt-0.5" />
                      <span>
                        <strong>Laser-Engraved Batch &amp; Expiry:</strong> বোতলের নিচে খাঁজকাটা লেজার ফন্টে কোরিয়ান লট কোড (যেমন: প্রিন্টেড নয়, এমবোসড) থাকে।
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={14} className="text-[#06B6D4] shrink-0 mt-0.5" />
                      <span>
                        <strong>10X Money-Back Written Guarantee:</strong> প্রতিটি পার্সেলে অফিশিয়াল মানি-ব্যাক ওয়ারেন্টি ইনভয়েস সংযুক্ত থাকে।
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Fake / Local Replica Card */}
                <div
                  className={`rounded-2xl p-4 border ${
                    isDark
                      ? 'bg-rose-950/20 border-rose-800/60'
                      : 'bg-rose-50/60 border-rose-200'
                  } space-y-3`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                      <XCircle size={15} className="text-rose-600" />
                      Cheap Replica / Master Copy ⚠️
                    </span>
                    <span className="text-[10px] font-bold text-rose-600">
                      Skin Hazard
                    </span>
                  </div>
                  <ul className="space-y-2 text-xs text-[#6B7280] dark:text-stone-300">
                    <li className="flex items-start gap-2">
                      <X size={14} className="text-rose-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>No QR / Invalid Barcode:</strong> বারকোড স্ক্যান করলে কোনো কোরিয়ান ফ্যাক্টরি লট দেখায় না বা পেজ এরর আসে।
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X size={14} className="text-rose-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Watery Texture &amp; Harsh Perfume:</strong> পানির মতো পাতলা অথবা সস্তা লোশনের মতো কড়া কেমিক্যাল গন্ধ থাকে যা ব্রণ ও র‍্যাশ বাড়ায়।
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X size={14} className="text-rose-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Blurry Ink &amp; Spelling Mistakes:</strong> বোতলের গায়ে অস্পষ্ট কালি যা নখ দিয়ে ঘষলেই উঠে যায়।
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X size={14} className="text-rose-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Unrealistic ৳450–৳750 Pricing:</strong> কোরিয়ায় ফ্যাক্টরি মূল্যের চেয়েও কম দামে বিক্রি করা হয়।
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Interactive Live Korean Batch Code & HiddenTag Verifier */}
            <div
              className={`lg:col-span-5 rounded-2xl p-5 sm:p-6 border ${
                isDark
                  ? 'bg-[#0E1014] border-stone-800'
                  : 'bg-[#FAFAFA] border-[#E5E7EB]'
              } space-y-4`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-[#06B6D4]/15 text-[#06B6D4] flex items-center justify-center">
                    <QrCode size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black">
                      Live Korean Batch &amp; Lot Verifier
                    </h4>
                    <p className="text-[11px] text-[#6B7280]">
                      অর্ডার করার আগে বা হাতে পেয়ে ব্যাচ কোড যাচাই করুন
                    </p>
                  </div>
                </div>
                <Award size={18} className="text-[#06B6D4]" />
              </div>

              {/* Input & Verify Button */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]"
                  />
                  <input
                    type="text"
                    value={batchInput}
                    onChange={(e) => setBatchInput(e.target.value)}
                    placeholder="Enter Batch Code (e.g. COSRX-KR-88294)"
                    className={`w-full pl-8 pr-3 py-2.5 rounded-xl border text-xs font-mono font-bold focus:outline-none ${
                      isDark
                        ? 'bg-stone-900 border-stone-700 text-white'
                        : 'bg-white border-stone-300 text-[#222222]'
                    }`}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleVerifyBatch()}
                  className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-white shrink-0 cursor-pointer transition hover:opacity-95"
                  style={{ backgroundColor: '#06B6D4' }}
                >
                  Verify Code
                </button>
              </div>

              {/* Sample Quick-Tap Codes */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                  Click a Sample Seoul Lot Code to Test:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {Object.keys(VERIFIED_KOREAN_BATCH_DB).map((sampleCode) => (
                    <button
                      key={sampleCode}
                      type="button"
                      onClick={() => handleVerifyBatch(sampleCode)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold border transition cursor-pointer ${
                        batchInput === sampleCode
                          ? 'bg-[#06B6D4] text-white border-[#06B6D4]'
                          : isDark
                          ? 'bg-stone-900 border-stone-800 text-stone-300 hover:border-cyan-500'
                          : 'bg-white border-stone-200 text-[#222222] hover:border-[#06B6D4]'
                      }`}
                    >
                      {sampleCode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Verification Output Card */}
              {verifiedResult && !batchError && (
                <div
                  className={`p-4 rounded-xl border space-y-2 text-xs ${
                    isDark
                      ? 'bg-emerald-950/30 border-emerald-700/50 text-emerald-100'
                      : 'bg-emerald-50/80 border-emerald-200 text-stone-800'
                  }`}
                >
                  <div className="flex items-center justify-between font-extrabold text-emerald-700 dark:text-emerald-300">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 size={15} />
                      {verifiedResult.kfdaStatus}
                    </span>
                    <span className="font-mono text-[11px]">
                      {verifiedResult.code}
                    </span>
                  </div>
                  <div className="font-bold text-[#222222] dark:text-white">
                    {verifiedResult.productName}
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-[#6B7280] dark:text-stone-300">
                    <div>
                      <strong>MFG Date:</strong> {verifiedResult.mfgDate}
                    </div>
                    <div>
                      <strong>EXP Date:</strong> {verifiedResult.expDate}
                    </div>
                    <div className="col-span-2">
                      <strong>Korean Lab:</strong> {verifiedResult.koreanFactory}
                    </div>
                    <div className="col-span-2">
                      <strong>Air Cargo Manifest:</strong>{' '}
                      {verifiedResult.importAirwayBill}
                    </div>
                  </div>
                </div>
              )}

              {batchError && (
                <div className="p-4 rounded-xl border border-rose-300 bg-rose-50 text-rose-900 text-xs space-y-1">
                  <div className="font-extrabold flex items-center gap-1.5 text-rose-700">
                    <XCircle size={15} />
                    <span>Unrecognized Batch Code!</span>
                  </div>
                  <p className="text-[11px]">
                    এই কোডটি আমাদের সিউল এয়ার-ফ্রেইট ডাটাবেসে পাওয়া যায়নি। উপরের যেকোনো একটি অফিশিয়াল স্যাম্পল কোড (যেমন: <strong>COSRX-KR-88294</strong>) ক্লিক করে টেস্ট করুন।
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MODAL 1: 30-SECOND INTERACTIVE K-BEAUTY SKIN ROUTINE QUIZ MODAL       */}
      {/* ===================================================================== */}
      {isQuizModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs"
          onClick={() => setIsQuizModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-2xl rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto ${
              isDark
                ? 'bg-[#16181E] border-stone-800 text-white'
                : 'bg-white border-stone-200 text-[#222222]'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#06B6D4]">
                  30-Second Dermatological Routine Builder
                </span>
                <h3 className="text-xl sm:text-2xl font-black mt-1">
                  আপনার ত্বকের জন্য সঠিক কোরিয়ান গ্লাস-স্কিন রুটিন বের করুন
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsQuizModalOpen(false)}
                className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {!quizCompleted ? (
              <div className="space-y-5">
                {/* Step 1 */}
                <div className="space-y-2">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#6B7280]">
                    1. আপনার ত্বকের ধরন কী? (Select Your Skin Type)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'oily', label: 'Oily (তৈলাক্ত)' },
                      { id: 'dry', label: 'Dry (শুষ্ক)' },
                      { id: 'combo', label: 'Combination (মিশ্র)' },
                      { id: 'sensitive', label: 'Sensitive (সেনসিটিভ)' },
                    ].map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() =>
                          setQuizSkinType(
                            st.id as 'oily' | 'dry' | 'combo' | 'sensitive'
                          )
                        }
                        className={`p-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                          quizSkinType === st.id
                            ? 'border-[#E07A5F] bg-[#FFF5F5] text-[#222222] dark:bg-stone-800 dark:text-white'
                            : 'border-stone-200 dark:border-stone-800'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2 */}
                <div className="space-y-2">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#6B7280]">
                    2. আপনার ত্বকের প্রধান সমস্যা কোনটি? (Primary Skin Goal)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { id: 'acne', label: 'Acne, Pimples & Redness (ব্রণ ও র‍্যাশ)' },
                      { id: 'spots', label: 'Dark Spots & Melasma (মেছতা ও কালো দাগ)' },
                      { id: 'pores', label: 'Oily T-Zone & Open Pores (পোরস ও ব্ল্যাকহেডস)' },
                      { id: 'glow', label: 'Dullness & Dehydration (গ্লাস-স্কিন গ্লো)' },
                    ].map((sc) => (
                      <button
                        key={sc.id}
                        type="button"
                        onClick={() =>
                          setQuizConcern(
                            sc.id as 'acne' | 'spots' | 'pores' | 'glow'
                          )
                        }
                        className={`p-3 rounded-xl border text-left text-xs font-bold transition cursor-pointer ${
                          quizConcern === sc.id
                            ? 'border-[#E07A5F] bg-[#FFF5F5] text-[#222222] dark:bg-stone-800 dark:text-white'
                            : 'border-stone-200 dark:border-stone-800'
                        }`}
                      >
                        {sc.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3 */}
                <div className="space-y-2">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-[#6B7280]">
                    3. আপনার প্রতিদিনের পরিবেশ কেমন? (Daily Environment)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'humid', label: 'Humid & Warm (গরম ও ঘাম)' },
                      { id: 'ac', label: 'AC Room / Office (এসি রুম)' },
                      { id: 'sun', label: 'Outdoor Sun/Dust (রোদ ও ধুলোবালি)' },
                    ].map((cl) => (
                      <button
                        key={cl.id}
                        type="button"
                        onClick={() =>
                          setQuizClimate(cl.id as 'humid' | 'ac' | 'sun')
                        }
                        className={`p-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                          quizClimate === cl.id
                            ? 'border-[#E07A5F] bg-[#FFF5F5] text-[#222222] dark:bg-stone-800 dark:text-white'
                            : 'border-stone-200 dark:border-stone-800'
                        }`}
                      >
                        {cl.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setQuizCompleted(true)}
                  className="w-full py-4 rounded-2xl text-sm font-extrabold text-white shadow-md cursor-pointer transition hover:opacity-95"
                  style={{ backgroundColor: coralColor }}
                >
                  আমার ৩-স্টেপ কোরিয়ান স্কিন রুটিন দেখুন →
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="p-5 rounded-2xl bg-[#FFF5F5] dark:bg-stone-900 border border-rose-200 dark:border-stone-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#06B6D4] uppercase">
                      ✓ Personalized K-Beauty Match
                    </span>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      Save ৳860 + Free Sheet Mask
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-[#222222] dark:text-white">
                    {quizRec.kitTitle}
                  </h4>
                  <p className="text-xs font-bold text-[#E07A5F]">
                    {quizRec.bnTitle}
                  </p>
                  <p className="text-xs text-[#6B7280] dark:text-stone-300 leading-relaxed">
                    {quizRec.whyWorks}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-rose-200/60 dark:border-stone-800 text-xs">
                    <div>
                      <strong>Step 1 (Cleanse):</strong> {quizRec.step1}
                    </div>
                    <div>
                      <strong>Step 2 (Treat &amp; Hydrate):</strong> {quizRec.step2}
                    </div>
                    <div>
                      <strong>Step 3 (UV Protect):</strong> {quizRec.step3}
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <div>
                      <span
                        className="text-2xl font-black"
                        style={{ color: coralColor }}
                      >
                        {quizRec.bundlePrice}
                      </span>
                      <span className="text-xs line-through text-[#6B7280] ml-2">
                        {quizRec.regularPrice}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setQuizCompleted(false)}
                        className="px-3 py-2 rounded-xl border border-stone-300 text-xs font-bold cursor-pointer"
                      >
                        Retake Quiz
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsQuizModalOpen(false);
                          scrollToTarget('seoulglow-cod-checkout');
                        }}
                        className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-white shadow-sm cursor-pointer"
                        style={{ backgroundColor: coralColor }}
                      >
                        Order This Routine (COD)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 2: SKIN CONCERN FULL DETAILS MODAL                              */}
      {/* ===================================================================== */}
      {selectedConcernModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs"
          onClick={() => setSelectedConcernModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-xl rounded-3xl overflow-hidden border shadow-2xl ${
              isDark
                ? 'bg-[#16181E] border-stone-800 text-white'
                : 'bg-white border-stone-200 text-[#222222]'
            }`}
          >
            <div className="relative h-52">
              <img
                src={selectedConcernModal.image}
                alt={selectedConcernModal.titleEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <button
                type="button"
                onClick={() => setSelectedConcernModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black cursor-pointer"
              >
                <X size={16} />
              </button>
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-300">
                  Korean Clinical Protocol
                </span>
                <h3 className="text-xl font-black">
                  {selectedConcernModal.titleEn} · {selectedConcernModal.titleBn}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="text-xs font-extrabold text-[#06B6D4]">
                Key Ingredients: {selectedConcernModal.ingredients}
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-stone-300 leading-relaxed">
                {selectedConcernModal.descriptionBn}
              </p>
              <div className="p-3.5 rounded-2xl bg-[#FFF5F5] dark:bg-stone-900 border border-rose-100 dark:border-stone-800 text-xs space-y-1">
                <div className="font-extrabold text-[#222222] dark:text-white">
                  Recommended Dermatologist Pair:
                </div>
                <div className="text-[#E07A5F] font-bold">
                  {selectedConcernModal.recommendedHero}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-lg font-black" style={{ color: coralColor }}>
                  {selectedConcernModal.priceFrom}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedConcernModal(null);
                    scrollToTarget('seoulglow-catalog');
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-white cursor-pointer"
                  style={{ backgroundColor: coralColor }}
                >
                  Explore Matching Products →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
