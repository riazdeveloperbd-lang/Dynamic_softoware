import React, { useState, useEffect } from 'react';
import {
  Leaf,
  Thermometer,
  Clock,
  Scale,
  CheckCircle2,
  ShoppingBag,
  ArrowRight,
  Play,
  RotateCcw,
  Sparkles,
  Droplets,
  Eye,
  X,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface PurePataCatalogSteepingSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

interface TeaBlendItem {
  id: string;
  indexNum: string;
  category: 'Single-Estate Leaf' | 'Botanical Wellness' | 'Spiced Chai';
  name: string;
  bnTitle: string;
  origin: string;
  tinWeight: string;
  cupsCount: string;
  priceBdt: number;
  originalBdt: number;
  caffeineLevel: string;
  tastingNotes: string;
  wellnessBenefits: string[];
  steepTempC: number;
  steepTimeSec: number;
  steepTimeLabel: string;
  dosagePerCup: string;
  reSteepCount: string;
  pairingSuggestion: string;
  image: string;
}

const PUREPATA_TEA_CATALOG: TeaBlendItem[] = [
  {
    id: 'sreemangal_orthodox_black',
    indexNum: '01.',
    category: 'Single-Estate Leaf',
    name: 'Garden-Direct Sreemangal Orthodox Black Tea (FTGFOP1)',
    bnTitle: 'শ্রীমঙ্গলের গার্ডেন-ডিরেক্ট অর্থোডক্স ব্ল্যাক টি (টু-লিফ অ্যান্ড আ বাড)',
    origin: 'Balishira Valley, Sreemangal',
    tinWeight: '100g Airtight Eco-Tin',
    cupsCount: '50 Cups (Re-steepable 2x)',
    priceBdt: 580,
    originalBdt: 750,
    caffeineLevel: 'Medium-High (L-Theanine Balanced)',
    tastingNotes: 'Malty wild honey, roasted almond & crisp brisk amber finish',
    wellnessBenefits: [
      'সকালের ক্লান্তি দূর করে দীর্ঘস্থায়ী মানসিক মনোযোগ ও এনার্জি দেয়',
      'থিয়াফ্লাভিন ও পলিফেনল সমৃদ্ধ যা হৃদযন্ত্র ও রক্ত সঞ্চালন সুস্থ রাখে',
      'দুধ ছাড়া লিকার চা হিসেবে পান করলে জিরো ক্যালোরিতে মেটাবলিজম বাড়ায়',
    ],
    steepTempC: 92,
    steepTimeSec: 180,
    steepTimeLabel: '৩–৪ মিনিট (180s)',
    dosagePerCup: '১ চা চামচ (2.5g Whole Leaf) প্রতি ১৮০ মিলি পানিতে',
    reSteepCount: 'একই পাতা ২ বার ব্রিউ করা যায় (2 Infusions)',
    pairingSuggestion: 'সকালের নাস্তার পর হালকা লেবু বা ১ ফোঁটা খাঁটি মধুর সাথে দারুণ মানায়।',
    image:
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'panchagarh_organic_green',
    indexNum: '02.',
    category: 'Single-Estate Leaf',
    name: 'Himalayan Mist Organic Whole-Leaf Green Tea',
    bnTitle: 'পঞ্চগড়ের অর্গানিক হোল-লিফ গ্রিন টি (হিমালয়ান ফার্স্ট ফ্লাশ)',
    origin: 'Tetulia Organic Estate, Panchagarh',
    tinWeight: '100g Airtight Eco-Tin',
    cupsCount: '55 Cups (Re-steepable 3x)',
    priceBdt: 650,
    originalBdt: 850,
    caffeineLevel: 'Gentle Low Caffeine',
    tastingNotes: 'Sweet steamed edamame, fresh mountain grass, zero bitterness',
    wellnessBenefits: [
      'উচ্চমাত্রার EGCG অ্যান্টিঅক্সিডেন্ট যা ফ্যাট বার্নিং ও ওজন নিয়ন্ত্রণে সহায়ক',
      'সাধারণ গ্রিন টি-ব্যাগের মতো তিতা স্বাদ নেই—মুখের ভেতর মিষ্টি সতেজতা রাখে',
      'শরীরের টক্সিন দূর করে ত্বক উজ্জ্বল ও সতেজ রাখতে সাহায্য করে',
    ],
    steepTempC: 80,
    steepTimeSec: 120,
    steepTimeLabel: '২–২.৫ মিনিট (120s)',
    dosagePerCup: '১ চা চামচ (2.0g Whole Leaf) — ফুটন্ত পানি ২ মিনিট ঠান্ডা করে নিন',
    reSteepCount: 'একই পাতা ৩ বার ব্রিউ করা যায় (3 Infusions)',
    pairingSuggestion: 'দুপুরের খাবারের ৩০ মিনিট পর অথবা জিম/ওয়ার্কআউটের আগে পান করুন।',
    image:
      'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'blue_butterfly_pea',
    indexNum: '03.',
    category: 'Botanical Wellness',
    name: 'Sun-Dried Blue Butterfly Pea Flower Tea (অপরাজিতা চা)',
    bnTitle: 'রোদে শুকানো খাঁটি নীল অপরাজিতা ফুলের ভেষজ চা (ক্যাফেইন-মুক্ত)',
    origin: 'Organic Botanical Farm, Gazipur & Panchagarh',
    tinWeight: '50g Whole Flowers Tin',
    cupsCount: '65+ Cups',
    priceBdt: 520,
    originalBdt: 690,
    caffeineLevel: '100% Caffeine-Free (রাতের ঘুমের জন্য আদর্শ)',
    tastingNotes: 'Earthy floral notes; turns royal cobalt blue to violet with lemon drops',
    wellnessBenefits: [
      'অ্যান্থোসায়ানিন সমৃদ্ধ যা চোখের জ্যোতি, চুল ও ত্বকের কোলাজেন বৃদ্ধি করে',
      '১০০% ক্যাফেইন-মুক্ত হওয়ায় রাতে ঘুমানোর আগে পান করলে স্ট্রেস ও অনিদ্রা দূর হয়',
      'লেবুর রস মেশালে প্রাকৃতিক নিয়মে নীল থেকে বেগুনি রঙে রূপান্তরিত হয় (আইসড টি-এর জন্য সেরা)',
    ],
    steepTempC: 95,
    steepTimeSec: 240,
    steepTimeLabel: '৪ মিনিট (240s)',
    dosagePerCup: '৫–৬টি আস্ত শুকনো অপরাজিতা ফুল প্রতি ১৮০ মিলি গরম পানিতে',
    reSteepCount: '২ বার ব্রিউ করা যায় (গরম বা বরফ ঠান্ডা আইসড টি)',
    pairingSuggestion: 'কয়েক ফোঁটা লেবুর রস ও পুদিনা পাতা যোগ করে দারুণ ডিটক্স ড্রিংক তৈরি করুন।',
    image:
      'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'tulsi_ginger_wellness',
    indexNum: '04.',
    category: 'Botanical Wellness',
    name: 'Sacred Tulsi & Crushed Ginger Root Wellness Blend',
    bnTitle: 'তুলসী-আদা ওয়েলনেস ভেষজ চা (সর্দি-কাশি, গলা ব্যথা ও হজম স্পেশাল)',
    origin: 'Sreemangal Green Leaf + Natore Medicinal Herbs',
    tinWeight: '100g Airtight Eco-Tin',
    cupsCount: '50 Cups',
    priceBdt: 620,
    originalBdt: 800,
    caffeineLevel: 'Low Caffeine',
    tastingNotes: 'Warm zesty ginger root, aromatic Krishna Tulsi & soothing lemongrass',
    wellnessBenefits: [
      'আবহাওয়া পরিবর্তনের সর্দি-কাশি, খুসখুসে গলা ব্যথা ও সাইনাসের আরাম দেয়',
      'অফিসের দীর্ঘ কাজের চাপে মাথাব্যথা ও গ্যাস্ট্রিক/বদহজম দ্রুত দূর করে',
      'কৃষ্ণ তুলসী ও দেশি শুকনো আদার প্রাকৃতিক অ্যান্টি-ইনফ্ল্যামেটরি গুণাগুণ সমৃদ্ধ',
    ],
    steepTempC: 95,
    steepTimeSec: 210,
    steepTimeLabel: '৩.৫ মিনিট (210s)',
    dosagePerCup: '১ চা চামচ (2.5g) — ঢাকনা দিয়ে ঢেকে ব্রিউ করলে ভেষজ তেল অক্ষুণ্ণ থাকে',
    reSteepCount: '২ বার ব্রিউ করা যায়',
    pairingSuggestion: 'বৃষ্টির বিকেলে বা গলা খুসখুস করলে ১ চামচ সুন্দরবনের খাঁটি মধুর সাথে পান করুন।',
    image:
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 'immunity_masala_chai',
    indexNum: '05.',
    category: 'Spiced Chai',
    name: 'Immunity-Boosting Royal 6-Spice Masala Chai Mix',
    bnTitle: 'ইমিউনিটি-বুস্টিং শাহী মাসালা চা (আস্ত এলাচ, দারুচিনি, লবঙ্গ ও গোলমরিচ)',
    origin: 'Sreemangal Assamica Leaf + Whole Crushed Spices',
    tinWeight: '120g Airtight Eco-Tin',
    cupsCount: '45–50 Cups',
    priceBdt: 680,
    originalBdt: 890,
    caffeineLevel: 'Bold Energizing',
    tastingNotes: 'Rich aromatic green cardamom, Ceylon cinnamon bark, ginger & clove warmth',
    wellnessBenefits: [
      'কোনো কৃত্রিম মাসালা পাউডার নয়—আস্ত ভাঙা এলাচ, দারুচিনি, লবঙ্গ ও আদার আসল ঘ্রাণ',
      'রোগ প্রতিরোধ ক্ষমতা (Immunity) বাড়ায় এবং শরীরকে ভেতর থেকে চনমনে করে',
      'ঘন দুধ চা (Milk Chai) অথবা লাল মশলা চা—উভয়ভাবেই রাজকীয় স্বাদ দেয়',
    ],
    steepTempC: 98,
    steepTimeSec: 240,
    steepTimeLabel: '৪–৫ মিনিট (240s)',
    dosagePerCup: '১.৫ চা চামচ (3.0g) পানি ও দুধের সাথে ফুটিয়ে অথবা লিকার হিসেবে',
    reSteepCount: '১ বার ঘন ব্রিউ (Strong Infusion)',
    pairingSuggestion: 'সকাল বা সন্ধ্যার আড্ডায় ঘন দুধ বা লিকার মাসালা চা হিসেবে পরিবেশন করুন।',
    image:
      'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=800&q=85',
  },
];

export const PurePataCatalogSteepingSection: React.FC<
  PurePataCatalogSteepingSectionProps
> = ({
  title,
  subtitle,
  primaryColor = '#1E4620',
  isDark = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSteepBlendIdx, setSelectedSteepBlendIdx] = useState<number>(1); // Default to Organic Green Tea
  const [timerRemainingSec, setTimerRemainingSec] = useState<number>(
    PUREPATA_TEA_CATALOG[1].steepTimeSec
  );
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [cartNotice, setCartNotice] = useState<string | null>(null);
  const [activeModalProduct, setActiveModalProduct] = useState<TeaBlendItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModalProduct) {
        setActiveModalProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalProduct]);

  const filteredCatalog =
    selectedCategory === 'All'
      ? PUREPATA_TEA_CATALOG
      : PUREPATA_TEA_CATALOG.filter((item) => item.category === selectedCategory);

  const currentSteepBlend =
    PUREPATA_TEA_CATALOG[selectedSteepBlendIdx] || PUREPATA_TEA_CATALOG[0];

  // Reset timer when user switches blend in Steeping Guide
  const handleSelectSteepBlend = (idx: number) => {
    setSelectedSteepBlendIdx(idx);
    setIsTimerRunning(false);
    setTimerRemainingSec(PUREPATA_TEA_CATALOG[idx].steepTimeSec);
  };

  useEffect(() => {
    if (!isTimerRunning) return;
    if (timerRemainingSec <= 0) {
      setIsTimerRunning(false);
      return;
    }
    const interval = setInterval(() => {
      setTimerRemainingSec((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, timerRemainingSec]);

  const formatMinutesSeconds = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleOrderBlend = (blend: TeaBlendItem) => {
    setCartNotice(
      `"${blend.name}" (৳${blend.priceBdt}) নির্বাচিত হয়েছে — নিচের ফর্মে অর্ডার বা সাবস্ক্রিপশন সম্পন্ন করুন`
    );
    setTimeout(() => setCartNotice(null), 3000);
    const el = document.getElementById('purepata-subscription-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      id="purepata-catalog-section"
      className={`w-full transition-colors ${
        isDark ? 'bg-[#0C1712] text-stone-100' : 'bg-[#FAF7F2] text-[#1C2822]'
      }`}
    >
      {/* Floating Cart Toast */}
      {cartNotice && (
        <div
          className="fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl text-xs font-extrabold text-white shadow-2xl flex items-center gap-2"
          style={{ backgroundColor: primaryColor }}
        >
          <CheckCircle2 size={15} />
          <span>{cartNotice}</span>
        </div>
      )}

      {/* ================================================================= */}
      {/* PART A: 5 SIGNATURE ORGANIC TEA & WELLNESS BLENDS                 */}
      {/* ================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20 space-y-10">
        {/* Header & Category Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div
              className="text-xs font-bold tracking-wider uppercase"
              style={{ color: isDark ? '#A7F3D0' : primaryColor }}
            >
              02. ARTISANAL ECO-TIN COLLECTION (৫টি সিগনেচার ব্লেন্ড)
            </div>
            <h2
              className="text-2xl sm:text-3xl font-black tracking-tight"
              style={{
                fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
              }}
            >
              <EditableText
                id="purepata_catalog_h2"
                defaultText={
                  title ||
                  'আমাদের ৫টি সিগনেচার অর্গানিক চা ও ভেষজ ওয়েলনেস ব্লেন্ড — ফুড-গ্রেড ইকো টিনে সংরক্ষিত'
                }
              />
            </h2>
            <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
              <EditableText
                id="purepata_catalog_subtitle"
                defaultText={
                  subtitle ||
                  'প্রতিটি টিনে থাকছে ডাবল এয়ারটাইট লিড যা বাংলাদেশের আর্দ্র আবহাওয়াতেও চায়ের প্রাকৃতিক ঘ্রাণ, রঙ ও ভেষজ গুণাগুণ ৬ মাস পর্যন্ত অটুট রাখে।'
                }
              />
            </p>
          </div>

          {/* Functional Segmented Filter */}
          <div
            className={`flex flex-wrap items-center gap-1.5 p-1 rounded-xl border self-start ${
              isDark
                ? 'bg-[#11221A] border-emerald-900'
                : 'bg-[#F2ECE1] border-[#DED6C6]'
            }`}
          >
            {[
              'All',
              'Single-Estate Leaf',
              'Botanical Wellness',
              'Spiced Chai',
            ].map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-extrabold transition cursor-pointer whitespace-nowrap ${
                    active ? 'text-white shadow-xs' : 'opacity-75 hover:opacity-100'
                  }`}
                  style={active ? { backgroundColor: primaryColor } : undefined}
                >
                  {cat === 'All' ? 'সবগুলো ব্লেন্ড (All 5)' : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5-Blend Product Grid — Click ANY card to open Big Product Details Modal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredCatalog.map((blend) => (
            <div
              key={blend.id}
              role="button"
              tabIndex={0}
              onClick={() => setActiveModalProduct(blend)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveModalProduct(blend);
                }
              }}
              className={`group rounded-2xl border overflow-hidden flex flex-col justify-between transition-all hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer text-left ${
                isDark
                  ? 'bg-[#11221A] border-emerald-900/80'
                  : 'bg-white border-[#E4DFD5]'
              }`}
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full bg-stone-900 overflow-hidden border-b border-black/5 dark:border-white/10">
                  <img
                    src={blend.image}
                    alt={blend.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black bg-black/80 text-amber-200 border border-white/15">
                      <Eye size={11} /> বিস্তারিত দেখুন
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end justify-between p-3.5 text-white pointer-events-none">
                    <span className="text-[11px] font-mono font-bold text-amber-300">
                      {blend.tinWeight} · {blend.cupsCount}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-300">
                      {blend.origin}
                    </span>
                  </div>
                </div>

                {/* Card Copy */}
                <div className="p-5 space-y-3.5">
                  {/* Unboxed Metadata */}
                  <div className="flex items-center gap-2 text-xs opacity-70 font-semibold">
                    <span
                      className="font-mono font-bold"
                      style={{ color: isDark ? '#A7F3D0' : primaryColor }}
                    >
                      {blend.indexNum}
                    </span>
                    <span>·</span>
                    <span>{blend.category}</span>
                    <span>·</span>
                    <span>{blend.caffeineLevel}</span>
                  </div>

                  <h3
                    className="text-base sm:text-lg font-black leading-snug"
                    style={{
                      fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
                    }}
                  >
                    {blend.name}
                  </h3>
                  <p className="text-xs font-bold text-amber-800 dark:text-amber-300">
                    {blend.bnTitle}
                  </p>

                  <p className="text-xs italic opacity-80">
                    <strong>Tasting Notes:</strong> {blend.tastingNotes}
                  </p>

                  {/* 3 Wellness Benefits */}
                  <ul className="space-y-1.5 pt-1 text-xs">
                    {blend.wellnessBenefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2">
                        <CheckCircle2
                          size={14}
                          style={{ color: primaryColor }}
                          className="shrink-0 mt-0.5"
                        />
                        <span className="opacity-90 leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price & Action Footer */}
              <div className="p-5 pt-3.5 border-t border-[#E4DFD5] dark:border-emerald-900 flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-xl font-black font-mono tabular-nums"
                      style={{ color: isDark ? '#FCD34D' : primaryColor }}
                    >
                      ৳{blend.priceBdt}
                    </span>
                    <span className="text-xs line-through opacity-50 font-mono tabular-nums">
                      ৳{blend.originalBdt}
                    </span>
                  </div>
                  <div className="text-[11px] opacity-75">
                    সাবস্ক্রিপশন নিলে মাত্র ৳{Math.round(blend.priceBdt * 0.85)}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalProduct(blend);
                    }}
                    className="px-3 py-2.5 rounded-xl text-xs font-extrabold border border-emerald-800/30 flex items-center gap-1 cursor-pointer"
                  >
                    <Eye size={13} />
                    <span>Specs</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOrderBlend(blend);
                    }}
                    className="px-3.5 py-2.5 rounded-xl text-xs font-extrabold text-white shadow-xs hover:opacity-95 transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <ShoppingBag size={14} />
                    <span>অর্ডার করুন</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* PART B: INTERACTIVE STEEPING & BREWING GUIDE WIDGET               */}
      {/* ================================================================= */}
      <section
        id="purepata-steeping-section"
        className={`border-t py-16 lg:py-20 ${
          isDark
            ? 'bg-[#09120E] border-emerald-950 text-stone-100'
            : 'bg-[#173319] text-stone-100 border-[#173319]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs font-bold tracking-wider uppercase text-amber-300">
                03. INTERACTIVE STEEPING &amp; BREWING RITUAL GUIDE
              </div>
              <h2
                className="text-2xl sm:text-3xl font-black tracking-tight text-white"
                style={{
                  fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
                }}
              >
                <EditableText
                  id="purepata_steeping_h2"
                  defaultText="পারফেক্ট এক কাপ চায়ের গোপন রহস্য — সঠিক পানির তাপমাত্রা, পরিমাণ ও সময়ের ইন্টারঅ্যাক্টিভ গাইড"
                />
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                অর্গানিক গ্রিন টি বা ভেষজ চা অতিরিক্ত ফুটন্ত পানিতে দিলে পাতা পুড়ে তিতা হয়ে যায়। নিচের তালিকা থেকে আপনার পছন্দের চা সিলেক্ট করুন এবং লাইভ টাইমার চালু করে নিখুঁতভাবে চা তৈরি করুন:
              </p>
            </div>

            {/* Blend Selector Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-black/30 border border-white/10 self-start">
              {PUREPATA_TEA_CATALOG.map((blend, idx) => {
                const active = selectedSteepBlendIdx === idx;
                return (
                  <button
                    key={blend.id}
                    type="button"
                    onClick={() => handleSelectSteepBlend(idx)}
                    className={`px-3 py-2 rounded-lg text-xs font-extrabold transition cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-amber-400 text-stone-950 shadow-xs'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    {blend.indexNum} {blend.name.split(' ')[0]}{' '}
                    {blend.name.split(' ')[1]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4-Step Visual Steeping Widget + Live Countdown Timer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 Cols: 4 Steeping Parameters */}
            <div className="lg:col-span-7 rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-mono text-amber-300 font-bold">
                    SOMMELIER BREWING PARAMETERS
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    {currentSteepBlend.name}
                  </h3>
                  <p className="text-xs text-stone-300 mt-0.5">
                    {currentSteepBlend.bnTitle}
                  </p>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 self-start">
                  {currentSteepBlend.reSteepCount}
                </span>
              </div>

              {/* 4 Step Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Step 1: Leaf Dosage */}
                <div className="p-4 rounded-xl bg-black/25 border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-amber-300 font-bold">
                    <span>STEP 01 · পাতার পরিমাণ (Dosage)</span>
                    <Scale size={15} />
                  </div>
                  <div className="text-base font-black text-white">
                    {currentSteepBlend.dosagePerCup}
                  </div>
                  <p className="text-[11px] text-stone-300">
                    কাঁচ বা সিরামিকের কাপে পাতা দিয়ে তার ওপর গরম পানি ঢালুন।
                  </p>
                </div>

                {/* Step 2: Water Temperature */}
                <div className="p-4 rounded-xl bg-black/25 border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-amber-300 font-bold">
                    <span>STEP 02 · পানির তাপমাত্রা (Water Temp)</span>
                    <Thermometer size={15} />
                  </div>
                  <div className="text-2xl font-black font-mono tabular-nums text-white">
                    {currentSteepBlend.steepTempC}°C{' '}
                    <span className="text-xs font-normal text-stone-300">
                      ({Math.round((currentSteepBlend.steepTempC * 9) / 5 + 32)}°F)
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-300">
                    {currentSteepBlend.steepTempC <= 85
                      ? 'টিপস: পানি ফুটে ওঠার পর চুলা বন্ধ করে ২ মিনিট অপেক্ষা করলে তাপমাত্রা ৮০°C এ নেমে আসে।'
                      : 'টিপস: সদ্য ফুটন্ত গরম পানি ব্যবহার করুন যাতে ভেষজ ও মশলার নির্যাস পুরোপুরি বের হয়।'}
                  </p>
                </div>

                {/* Step 3: Steep Duration */}
                <div className="p-4 rounded-xl bg-black/25 border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-amber-300 font-bold">
                    <span>STEP 03 · ভিজিয়ে রাখার সময় (Steep Time)</span>
                    <Clock size={15} />
                  </div>
                  <div className="text-xl font-black font-mono tabular-nums text-white">
                    {currentSteepBlend.steepTimeLabel}
                  </div>
                  <p className="text-[11px] text-stone-300">
                    কাপটি একটি পিরিচ দিয়ে ঢেকে রাখুন যাতে চায়ের অ্যারোমা বাষ্প হয়ে উড়ে না যায়।
                  </p>
                </div>

                {/* Step 4: Sommelier Pairing */}
                <div className="p-4 rounded-xl bg-black/25 border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-amber-300 font-bold">
                    <span>STEP 04 · পরিবেশন ও পেয়ারিং</span>
                    <Sparkles size={15} />
                  </div>
                  <div className="text-xs font-semibold text-white leading-relaxed">
                    {currentSteepBlend.pairingSuggestion}
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Interactive Live Steep Countdown Timer */}
            <div className="lg:col-span-5 rounded-2xl bg-black/35 border border-white/15 p-6 sm:p-8 text-center space-y-6">
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                  LIVE INTERACTIVE STEEPING TIMER
                </div>
                <h4 className="text-base font-extrabold text-white">
                  আপনার কাপে পানি ঢেলে নিচের টাইমারটি চালু করুন
                </h4>
              </div>

              {/* Large Tabular Countdown Display */}
              <div className="py-6 px-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <div className="text-5xl sm:text-6xl font-black font-mono tabular-nums tracking-tight text-amber-300">
                  {formatMinutesSeconds(timerRemainingSec)}
                </div>
                <div className="text-xs text-stone-300 font-medium">
                  {timerRemainingSec === 0
                    ? '✓ আপনার চা তৈরি! এবার পাতা ছেঁকে উপভোগ করুন।'
                    : isTimerRunning
                    ? 'চা পাতা ভিজে নির্যাস বের হচ্ছে (Steeping in progress...)'
                    : `নির্ধারিত সময়: ${currentSteepBlend.steepTimeLabel} (${currentSteepBlend.steepTempC}°C)`}
                </div>
              </div>

              {/* Timer Controls */}
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (timerRemainingSec === 0) {
                      setTimerRemainingSec(currentSteepBlend.steepTimeSec);
                    }
                    setIsTimerRunning(!isTimerRunning);
                  }}
                  className="px-6 py-3 rounded-xl text-xs font-extrabold bg-amber-400 text-stone-950 hover:bg-amber-300 transition flex items-center gap-2 cursor-pointer"
                >
                  <Play size={14} />
                  <span>
                    {isTimerRunning
                      ? 'পজ করুন (Pause)'
                      : timerRemainingSec === 0
                      ? 'আবার চালু করুন'
                      : 'ব্রিউইং টাইমার শুরু করুন'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerRemainingSec(currentSteepBlend.steepTimeSec);
                  }}
                  className="px-4 py-3 rounded-xl text-xs font-bold bg-white/10 text-white hover:bg-white/20 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw size={14} />
                  <span>রিসেট</span>
                </button>
              </div>

              <div className="pt-2 border-t border-white/10 text-[11px] text-stone-300">
                PurePata হোল-লিফ চা ছাঁকনি থেকে তুলে রাখার পর একই পাতা দিয়ে ওই দিন আরও ১–২ কাপ চা তৈরি করতে পারবেন।
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BIG PRODUCT FULL DETAILS MODAL FOR PUREPATA TEA */}
      {activeModalProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={() => setActiveModalProduct(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-4xl rounded-3xl border overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col ${
              isDark
                ? 'bg-[#11221A] border-emerald-800 text-stone-100'
                : 'bg-[#FAF7F2] border-[#DED6C6] text-[#1C2822]'
            }`}
          >
            <div className="px-6 py-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="px-3 py-1 rounded-full text-[10px] font-black text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  {activeModalProduct.category}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300">
                  {activeModalProduct.tinWeight} · {activeModalProduct.cupsCount}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalProduct(null)}
                className="p-2 rounded-xl border border-stone-400/30 hover:border-rose-500 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-4">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-stone-900">
                  <img
                    src={activeModalProduct.image}
                    alt={activeModalProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 rounded-2xl border border-black/10 dark:border-white/10 space-y-2 text-xs">
                  <div className="font-black text-amber-800 dark:text-amber-300">
                    গার্ডেন সোর্সিং ও ব্রিউইং স্পেক:
                  </div>
                  <div>• <strong>Origin:</strong> {activeModalProduct.origin}</div>
                  <div>• <strong>Caffeine:</strong> {activeModalProduct.caffeineLevel}</div>
                  <div>• <strong>Water Temp:</strong> {activeModalProduct.steepTempC}°C ({activeModalProduct.steepTimeLabel})</div>
                  <div>• <strong>Dosage:</strong> {activeModalProduct.dosagePerCup}</div>
                  <div>• <strong>Re-Steep:</strong> {activeModalProduct.reSteepCount}</div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div>
                  <h2
                    className="text-xl sm:text-2xl font-black leading-snug"
                    style={{ fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif" }}
                  >
                    {activeModalProduct.name}
                  </h2>
                  <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mt-1">
                    {activeModalProduct.bnTitle}
                  </p>
                  <p className="text-xs italic opacity-85 mt-2">
                    <strong>Tasting Profile:</strong> {activeModalProduct.tastingNotes}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/60 dark:bg-black/25 border border-black/10 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs line-through opacity-50 block">
                      রেগুলার মূল্য: ৳{activeModalProduct.originalBdt}
                    </span>
                    <span
                      className="text-2xl sm:text-3xl font-black font-mono"
                      style={{ color: isDark ? '#FCD34D' : primaryColor }}
                    >
                      ৳{activeModalProduct.priceBdt}
                    </span>
                  </div>
                  <span className="text-xs font-bold">
                    সাবস্ক্রিপশনে ১৫% ছাড়: <strong>৳{Math.round(activeModalProduct.priceBdt * 0.85)}</strong>
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-black">স্বাস্থ্য ও ওয়েলনেস উপকারিতা:</div>
                  <ul className="space-y-2">
                    {activeModalProduct.wellnessBenefits.map((b) => (
                      <li key={b} className="text-xs flex items-start gap-2 leading-relaxed">
                        <CheckCircle2
                          size={15}
                          style={{ color: primaryColor }}
                          className="shrink-0 mt-0.5"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                  <strong>Sommelier Pairing:</strong> {activeModalProduct.pairingSuggestion}
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModalProduct(null);
                      handleOrderBlend(activeModalProduct);
                    }}
                    className="flex-1 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold text-white flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <ShoppingBag size={16} />
                    <span>এই ইকো-টিনটি অর্ডার করুন — ৳{activeModalProduct.priceBdt}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModalProduct(null)}
                    className="px-4 py-3.5 rounded-xl text-xs font-extrabold border border-stone-400/40 cursor-pointer"
                  >
                    বন্ধ করুন
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
