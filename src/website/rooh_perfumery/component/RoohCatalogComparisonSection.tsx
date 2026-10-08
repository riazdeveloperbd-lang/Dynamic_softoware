import React, { useState, useEffect } from 'react';
import {
  Droplets,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Flame,
  Clock,
  ShoppingBag,
  Sun,
  Moon,
  Eye,
  X,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface RoohCatalogComparisonSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

type ShopCategoryTab =
  | 'all'
  | 'pure_attars'
  | 'designer_inspirations'
  | 'bakhoor_burners'
  | 'pocket_sprays';

interface PerfumeProductItem {
  id: string;
  category: ShopCategoryTab;
  categoryLabel: string;
  nameBn: string;
  nameEn: string;
  badge: string;
  origin: string;
  longevity: string;
  projection: string;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
  price6ml: string;
  price12ml: string;
  image: string;
  bestFor: string;
}

const ROOH_PRODUCTS_CATALOG: PerfumeProductItem[] = [
  {
    id: 'oud_al_maliki',
    category: 'pure_attars',
    categoryLabel: 'Pure Attars (খাঁটি ঐতিহ্যবাহী আতর)',
    nameBn: 'কম্বোডিয়ান ও সিলেটি শাহী উদ আল-মালিকি (Aged Oud Al-Maliki)',
    nameEn: '5-Year Aged Cambodian & Moulvibazar Agarwood Extrait',
    badge: '#1 জুম্মা ও ঈদ বেস্টসেলার',
    origin: 'মৌলভীবাজার (সিলেট) ও কম্বোডিয়া',
    longevity: '৪৮+ ঘণ্টা (সুতি পাঞ্জাবিতে)',
    projection: 'Heavy Royal Trail (১০ ফুট রুম প্রজেকশন)',
    topNotes: 'ইরানি জাফরান, ধূপ ও রোজউড',
    heartNotes: '৫ বছরের পুরনো আগরউড রেজিন ও হালকা লেদার',
    baseNotes: 'গোল্ডেন অ্যাম্বারগ্রিস, স্যান্ডালউড ও ডার্ক মাস্ক',
    price6ml: '৳১,২৫০ (৬ মিলি তোলা)',
    price12ml: '৳২,১৯০ (১২ মিলি শাহী তোলা)',
    image:
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=85',
    bestFor: 'জুম্মার নামাজ, বিয়ের দাওয়াত ও রাজকীয় পাঞ্জাবি',
  },
  {
    id: 'kashmiri_saffron_rose',
    category: 'pure_attars',
    categoryLabel: 'Pure Attars (খাঁটি ঐতিহ্যবাহী আতর)',
    nameBn: 'সৌদি তাইফ রোজ ও কাশ্মীরি জাফরান (Taif Rose & Saffron)',
    nameEn: '100% Pure Damask Rose Otto & Pampore Saffron Oil',
    badge: 'মদিনা ও হারামাইন ভাইব',
    origin: 'তাইফ (সৌদি আরব) ও কাশ্মীর',
    longevity: '৩৬+ ঘণ্টা (কাপড়ে) · ১৬ ঘণ্টা (ত্বকে)',
    projection: 'Warm Spiritual Aura',
    topNotes: 'শিশিরভেজা তাইফ গোলাপের পাপড়ি ও লাল জাফরান',
    heartNotes: 'হানি অ্যাম্বার, জেরানিয়াম ও এলাচ',
    baseNotes: 'মিশরীয় হোয়াইট তাহারা মাস্ক ও মহীশূর চন্দন',
    price6ml: '৳৯৫০ (৬ মিলি তোলা)',
    price12ml: '৳১,৭৫০ (১২ মিলি তোলা)',
    image:
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=85',
    bestFor: 'পাঁচ ওয়াক্ত নামাজ, তাহাজ্জুদ ও বয়স্ক মুরুব্বিদের উপহার',
  },
  {
    id: 'egyptian_white_tahara',
    category: 'pure_attars',
    categoryLabel: 'Pure Attars (খাঁটি ঐতিহ্যবাহী আতর)',
    nameBn: 'মিশরীয় কস্তুরী আল-তাহারা (Royal White Musk Al-Tahara)',
    nameEn: 'Creamy Concentrated Egyptian White Musk Oil',
    badge: 'সুন্নাহ ফেভারিট · স্নিগ্ধ সুবাস',
    origin: 'কায়রো, মিশর',
    longevity: '৪০+ ঘণ্টা (কাপড়ে)',
    projection: 'Clean Powdery Elegance',
    topNotes: 'হোয়াইট লিলি, কটন ব্লসম ও ভ্যানিলা বিন',
    heartNotes: 'পাউডারি হোয়াইট রোজ ও চন্দন কাঠ',
    baseNotes: 'খাঁটি ক্রিমি তাহারা মাস্ক ও হোয়াইট অ্যাম্বার',
    price6ml: '৳৭৫০ (৬ মিলি তোলা)',
    price12ml: '৳১,৩৫০ (১২ মিলি তোলা)',
    image:
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=85',
    bestFor: 'ইহরাম, প্রতিদিনের নামাজ ও যারা মিষ্টি-স্নিগ্ধ ঘ্রাণ পছন্দ করেন',
  },
  {
    id: 'bleu_sauvage_clone',
    category: 'designer_inspirations',
    categoryLabel: 'Designer Inspirations (ফরাসি ক্লোন অয়েল)',
    nameBn: 'ব্লু ডি আরাবিয়া ও ক্রিড আভেন্তুস ক্লোন (French Extrait Oil)',
    nameEn: 'Non-Alcoholic French Designer Inspired Perfume Oil',
    badge: 'কর্পোরেট ও অফিস বেস্টসেলার',
    origin: 'গ্রাস (Grasse), ফ্রান্স ফর্মুলেশন',
    longevity: '৩৬+ ঘণ্টা (শার্টে) · ১৪ ঘণ্টা (ত্বকে)',
    projection: 'Fresh Executive Projection',
    topNotes: 'বার্গামট, স্মোকি পাইনাপেল, মিন্ট ও জাম্বুরা',
    heartNotes: 'বার্চ উড, পিঙ্ক পেপার, আদা ও জেসমিন',
    baseNotes: 'অ্যামব্রোক্সান, ওকমস, সিডারউড ও হোয়াইট মাস্ক',
    price6ml: '৳৭৯০ (৬ মিলি রোল-অন)',
    price12ml: '৳১,৪৫০ (১২ মিলি রোল-অন)',
    image:
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=85',
    bestFor: 'অফিস, ভার্সিটি, মিটিং ও গরমের দিনে ফ্রেশ থাকার জন্য',
  },
  {
    id: 'bakhoor_al_madinah_set',
    category: 'bakhoor_burners',
    categoryLabel: 'Bakhoor & Burners (অ্যারাবিয়ান বাখুর ও বার্নার)',
    nameBn: 'বাখুর আল-হারামাইন ও গোল্ড ইলেকট্রিক মাবখারা বার্নার কম্বো',
    nameEn: 'Oud-Infused Bakhoor Chips (50g) + Metal Electric Incense Burner',
    badge: 'ঘর ও জায়নামাজ সুবাসিত করার সেট',
    origin: 'দুবাই ও সিলেট আগরউড চিপস',
    longevity: 'ঘরে ১২+ ঘণ্টা সুবাস অটুট থাকে',
    projection: 'Full Home & Majlis Filling',
    topNotes: 'ওমানি লোবান (Frankincense), জাফরান ও গোলাপ জল',
    heartNotes: 'আতর-ভেজানো সিলেটি আগর কাঠের টুকরো ও চন্দন',
    baseNotes: 'গোল্ডেন অ্যাম্বার, বেনজয়িন ও ভ্যানিলা রেজিন',
    price6ml: '৳১,৪৫০ (৫০ গ্রাম বাখুর + বার্নার)',
    price12ml: '৳২,১৯০ (১০০ গ্রাম বাখুর + প্রিমিয়াম বার্নার)',
    image:
      'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=85',
    bestFor: 'বৃহস্পতিবার সন্ধ্যা, জুম্মার দিন, নতুন বাসা ও মেহমানদারি',
  },
  {
    id: 'halal_pocket_spray_trio',
    category: 'pocket_sprays',
    categoryLabel: 'Pocket Sprays (নন-অ্যালকোহলিক পকেট স্প্রে)',
    nameBn: 'হালাল ওয়াটার-বেজড পকেট পারফিউম স্প্রে ট্রিও (৩টি ২০ মিলি প্যাক)',
    nameEn: '0% Alcohol Micro-Emulsion Travel Atomizer Set (3 x 20ml)',
    badge: 'পকেটে বহনযোগ্য · নামাজ সেফ স্প্রে',
    origin: 'ফরাসি ও আরবীয় অয়েল ইমালশন',
    longevity: '২৪+ ঘণ্টা (কাপড়ে দাগ পড়ে না)',
    projection: 'Instant Mist Refreshment',
    topNotes: '১. আমির আল উদ · ২. ব্লু ডি আরাবিয়া · ৩. হোয়াইট মাস্ক',
    heartNotes: 'জলীয় মাইক্রো-ইমালশন প্রযুক্তি (০% ইথানল বা স্পিরিট)',
    baseNotes: 'সাদা পাঞ্জাবি বা শার্টে কোনো তেলের দাগ ফেলে না',
    price6ml: '৳৮৯০ (৩টি ২০ মিলি পকেট স্প্রে)',
    price12ml: '৳১,৫৯০ (৬টি ২০ মিলি ফ্যামিলি প্যাক)',
    image:
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=85',
    bestFor: 'মসজিদে যাওয়ার আগে বা অফিসে যাওয়ার পথে দ্রুত স্প্রে করার জন্য',
  },
];

export const RoohCatalogComparisonSection: React.FC<RoohCatalogComparisonSectionProps> = ({
  title,
  subtitle,
  variant,
  isDark = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<ShopCategoryTab>('all');
  const [activeModalProduct, setActiveModalProduct] = useState<PerfumeProductItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModalProduct) {
        setActiveModalProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalProduct]);

  const goldHeadingColor = isDark ? '#D4AF37' : '#8F620A';
  const primaryTextColor = isDark ? '#F9F6F0' : '#18130E';
  const subTextColor = isDark ? '#D2C5B4' : '#4A3B2C';

  const filteredProducts =
    activeCategory === 'all'
      ? ROOH_PRODUCTS_CATALOG
      : ROOH_PRODUCTS_CATALOG.filter((p) => p.category === activeCategory);

  const scrollToDiscoveryCod = () => {
    setActiveModalProduct(null);
    const el = document.getElementById('rooh-discovery-cod');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="rooh-shop-all-catalog"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t"
      style={{
        backgroundColor: isDark ? '#0F0C09' : '#F7F2E7',
        borderColor: isDark ? '#2A2218' : '#E2D6C3',
        color: primaryTextColor,
      }}
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* PART 1: SHOP ALL SUB-CATEGORIES & OLFACTORY NOTE PYRAMID CARDS */}
        <div className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div
                className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest"
                style={{ color: goldHeadingColor }}
              >
                <Droplets size={14} />
                <span>Shop All Collections · খাঁটি আতর, ফরাসি ক্লোন, বাখুর ও পকেট স্প্রে</span>
              </div>
              <h2
                className="text-2xl sm:text-4xl font-black tracking-tight"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: primaryTextColor,
                }}
              >
                <EditableText
                  id="rooh_catalog_h2"
                  defaultText={
                    title ||
                    'আমাদের ৪টি সিগনেচার কালেকশন — Pure Attars, Designer Clones, Bakhoor ও Pocket Sprays'
                  }
                />
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed font-medium" style={{ color: subTextColor }}>
                <EditableText
                  id="rooh_catalog_sub"
                  defaultText={
                    subtitle ||
                    'প্রতিটি সুগন্ধির Top, Heart এবং Base নোটের বিস্তারিত পিরামিড দেখে বেছে নিন আপনার ব্যক্তিত্বের সেরা ঘ্রাণ।'
                  }
                />
              </p>
            </div>

            {/* Required Sub-Categories Filter Bar */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'সব কালেকশন (All 6)' },
                { id: 'pure_attars', label: 'Pure Attars (খাঁটি আতর)' },
                { id: 'designer_inspirations', label: 'Designer Inspirations' },
                { id: 'bakhoor_burners', label: 'Bakhoor & Burners' },
                { id: 'pocket_sprays', label: 'Pocket Sprays' },
              ].map((tab) => {
                const active = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCategory(tab.id as ShopCategoryTab)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                      active
                        ? 'text-[#0B0907] shadow-md'
                        : 'opacity-85 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor: active
                        ? '#D4AF37'
                        : isDark
                        ? '#17120D'
                        : '#FFFFFF',
                      borderColor: active
                        ? '#B38600'
                        : isDark
                        ? '#2E241A'
                        : '#D6C4A9',
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Grid with 3-Tier Fragrance Note Pyramids — Click ANY card for Full Details Modal */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 ${
              variant === 'varient_3' ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
            } gap-6`}
          >
            {filteredProducts.map((item) => (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => setActiveModalProduct(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveModalProduct(item);
                  }
                }}
                className="group rounded-2xl border overflow-hidden flex flex-col justify-between transition hover:border-[#D4AF37] hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer text-left"
                style={{
                  backgroundColor: isDark ? '#15110C' : '#FFFFFF',
                  borderColor: isDark ? '#2C2319' : '#DECDB4',
                }}
              >
                <div>
                  {/* Image & Longevity Badge */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.nameEn}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0907] via-transparent to-black/30" />
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-black bg-[#D4AF37] text-[#0B0907]">
                        {item.badge}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-black/80 text-[#F5E6C8] border border-[#D4AF37]/30">
                        <Eye size={11} /> বিস্তারিত দেখুন
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white">
                      <span className="font-bold text-[#D4AF37]">{item.categoryLabel}</span>
                      <span className="inline-flex items-center gap-1 font-mono font-bold bg-black/75 px-2 py-0.5 rounded">
                        <Clock size={11} className="text-[#10B981]" />
                        {item.longevity}
                      </span>
                    </div>
                  </div>

                  {/* Title & Fragrance Note Pyramid */}
                  <div className="p-5 space-y-4">
                    <div>
                      <h3
                        className="text-base sm:text-lg font-black leading-snug group-hover:text-[#D4AF37] transition"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          color: primaryTextColor,
                        }}
                      >
                        {item.nameBn}
                      </h3>
                      <p className="text-[11px] font-medium mt-0.5" style={{ color: subTextColor }}>
                        {item.nameEn}
                      </p>
                    </div>

                    {/* Visual Fragrance Note Pyramid Breakdown */}
                    <div
                      className="p-3 rounded-xl border space-y-2 text-[11px]"
                      style={{
                        backgroundColor: isDark ? '#1B1610' : '#FAF6EE',
                        borderColor: isDark ? '#2E241A' : '#E6DCCB',
                      }}
                    >
                      <div
                        className="text-[10px] font-extrabold uppercase tracking-wider flex items-center justify-between"
                        style={{ color: goldHeadingColor }}
                      >
                        <span>ঘ্রাণের পিরামিড (Olfactory Pyramid)</span>
                        <span>0% Alcohol</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Sun size={12} className="shrink-0 mt-0.5" style={{ color: goldHeadingColor }} />
                        <div>
                          <strong style={{ color: goldHeadingColor }}>Top:</strong>{' '}
                          <span className="font-medium">{item.topNotes}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Flame size={12} className="shrink-0 mt-0.5" style={{ color: goldHeadingColor }} />
                        <div>
                          <strong style={{ color: goldHeadingColor }}>Heart:</strong>{' '}
                          <span className="font-medium">{item.heartNotes}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Moon size={12} className="shrink-0 mt-0.5" style={{ color: goldHeadingColor }} />
                        <div>
                          <strong style={{ color: goldHeadingColor }}>Base:</strong>{' '}
                          <span className="font-bold">{item.baseNotes}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] font-medium" style={{ color: subTextColor }}>
                      <strong style={{ color: goldHeadingColor }}>যাদের জন্য সেরা:</strong>{' '}
                      {item.bestFor}
                    </div>
                  </div>
                </div>

                {/* Pricing & Order Action */}
                <div
                  className="p-5 pt-3 border-t flex items-center justify-between gap-2"
                  style={{ borderColor: isDark ? '#261E15' : '#E6DCCB' }}
                >
                  <div>
                    <div
                      className="text-sm font-black"
                      style={{ color: goldHeadingColor }}
                    >
                      {item.price6ml}
                    </div>
                    <div className="text-[10px] font-semibold" style={{ color: subTextColor }}>
                      {item.price12ml}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalProduct(item);
                      }}
                      className="px-3 py-2.5 rounded-xl text-xs font-extrabold border border-[#D4AF37]/40 flex items-center gap-1 cursor-pointer"
                      style={{ color: goldHeadingColor }}
                    >
                      <Eye size={13} />
                      <span>Details</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToDiscoveryCod();
                      }}
                      className="px-3.5 py-2.5 rounded-xl text-xs font-black text-[#0B0907] flex items-center gap-1.5 cursor-pointer transition hover:opacity-95"
                      style={{
                        background: 'linear-gradient(135deg, #D4AF37 0%, #F5E6C8 50%, #C59B27 100%)',
                      }}
                    >
                      <ShoppingBag size={13} />
                      <span>অর্ডার করুন</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PART 2: MANDATORY COMPARISON — PURE CONCENTRATED ATTAR VS ALCOHOL SPRAY PERFUMES */}
        <div
          id="rooh-our-essence-comparison"
          className="rounded-3xl p-6 sm:p-10 border space-y-8"
          style={{
            backgroundColor: isDark ? '#14100C' : '#FFFFFF',
            borderColor: isDark ? '#3A2E21' : '#D6C4A9',
          }}
        >
          <div className="max-w-3xl space-y-2">
            <div
              className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest"
              style={{ color: goldHeadingColor }}
            >
              <ShieldCheck size={15} />
              <span>Our Essence &amp; Halal Guarantee · কেন অ্যালকোহল স্প্রে ছেড়ে খাঁটি আতরে ফিরবেন?</span>
            </div>
            <h3
              className="text-2xl sm:text-3xl font-black"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: primaryTextColor,
              }}
            >
              বাজারের ৮০% অ্যালকোহলযুক্ত পারফিউম স্প্রে বনাম রুহ পারফিউমারির ১০০% খাঁটি কনসেনট্রেটেড আতর
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed font-medium" style={{ color: subTextColor }}>
              সাধারণ বডি স্প্রে বা পারফিউমে ৮০–৯০% পর্যন্ত থাকে কৃত্রিম ইথানল ও গ্যাস—যা ১ ঘণ্টার মধ্যেই উড়ে যায় এবং নামাজের পবিত্রতা নিয়ে সংশয় তৈরি করে। দেখুন কেন সচেতন মুসলিম ও পারফিউম প্রেমীরা রুহ সুগন্ধি বেছে নিচ্ছেন:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr
                  className="border-b"
                  style={{ borderColor: isDark ? '#2E241A' : '#E2D6C3' }}
                >
                  <th className="py-3.5 px-4 font-extrabold">তুলনার বিষয় (Feature)</th>
                  <th
                    className="py-3.5 px-4 font-black text-[#0B0907] rounded-t-xl"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #F3E5AB 100%)',
                    }}
                  >
                    ✓ Rooh Perfumery (১০০% খাঁটি আতর ও অয়েল)
                  </th>
                  <th className="py-3.5 px-4 font-extrabold text-rose-600 dark:text-rose-400">
                    ✕ বাজারের সাধারণ অ্যালকোহল পারফিউম ও সস্তা আতর
                  </th>
                </tr>
              </thead>
              <tbody
                className="divide-y"
                style={{ borderColor: isDark ? '#2A2218' : '#E6DCCB' }}
              >
                {[
                  {
                    criteria: '১. নামাজ ও হালাল শুদ্ধতা (Prayer Purity)',
                    rooh: '১০০% অ্যালকোহল ও ইথানল মুক্ত—পাঁচ ওয়াক্ত নামাজ, জুম্মা ও ইহরামে নিঃসন্দেহে পবিত্র।',
                    market: '৭০%–৯০% ডিনেচারড অ্যালকোহল (Spirit) থাকে, যা নিয়ে অনেকের মনেই নামাজের সংশয় থাকে।',
                  },
                  {
                    criteria: '২. ঘ্রাণের স্থায়িত্ব (Longevity in BD Weather)',
                    rooh: '১০০% পিওর পারফিউম অয়েল হওয়ায় ত্বকে ১৪–১৮ ঘণ্টা এবং সুতি পাঞ্জাবিতে ৪৮+ ঘণ্টা স্থায়ী হয়।',
                    market: 'বাংলাদেশের ঘাম ও রোদে অ্যালকোহল ৩০–৬০ মিনিটেই উবে গিয়ে গন্ধ মিলিয়ে যায়।',
                  },
                  {
                    criteria: '৩. ত্বক ও মাথা ব্যথার ঝুঁকি (Skin & Headache Safety)',
                    rooh: 'ন্যাচারাল আগরউড, তাইফ গোলাপ ও ফুড-গ্রেড ক্যারিয়ার অয়েল—ত্বকে জ্বালাপোড়া বা মাথা ব্যথা করে না।',
                    market: 'সস্তা পেট্রোকেমিক্যাল সলভেন্ট ও কৃত্রিম গ্যাসের কারণে হাঁচি, অ্যালার্জি ও মাইগ্রেনের ব্যথা হয়।',
                  },
                  {
                    criteria: '৪. প্রতিবার ব্যবহারের খরচ (Value per Drop)',
                    rooh: 'মাত্র ১–২ ফোঁটা কানের পেছনে ও কবজিতে লাগালেই যথেষ্ট; ৬ মিলির একটি বোতল অনায়াসে ৩–৪ মাস চলে।',
                    market: 'প্রতিবার ১০–১২ বার স্প্রে করতে হয়, ফলে হাজার টাকার বোতল ১ মাসেই শেষ হয়ে যায়।',
                  },
                ].map((row, idx) => (
                  <tr key={idx}>
                    <td className="py-3.5 px-4 font-extrabold">{row.criteria}</td>
                    <td
                      className="py-3.5 px-4 font-bold"
                      style={{
                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                      }}
                    >
                      <div className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-[#059669] shrink-0 mt-0.5" />
                        <span>{row.rooh}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4" style={{ color: subTextColor }}>
                      <div className="flex items-start gap-2">
                        <XCircle size={15} className="text-rose-500 shrink-0 mt-0.5" />
                        <span>{row.market}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* BIG PRODUCT FULL DETAILS MODAL FOR ROOH PERFUMERY */}
      {activeModalProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={() => setActiveModalProduct(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-3xl border overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col"
            style={{
              backgroundColor: isDark ? '#15110C' : '#FFFDF9',
              borderColor: isDark ? '#3A2E21' : '#D6C4A9',
              color: primaryTextColor,
            }}
          >
            <div
              className="px-6 py-4 border-b flex items-center justify-between gap-4"
              style={{ borderColor: isDark ? '#2C2319' : '#E6DCCB' }}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-black bg-[#D4AF37] text-[#0B0907]">
                  {activeModalProduct.badge}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  100% Alcohol-Free · Prayer Safe Halal Oil
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
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-stone-950 border border-[#D4AF37]/30">
                  <img
                    src={activeModalProduct.image}
                    alt={activeModalProduct.nameEn}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="p-4 rounded-2xl border space-y-2 text-xs"
                  style={{
                    backgroundColor: isDark ? '#1B1610' : '#FAF6EE',
                    borderColor: isDark ? '#2E241A' : '#E6DCCB',
                  }}
                >
                  <div className="font-black" style={{ color: goldHeadingColor }}>
                    সোর্সিং ও পারফরম্যান্স প্রোফাইল:
                  </div>
                  <div>• <strong>Origin:</strong> {activeModalProduct.origin}</div>
                  <div>• <strong>Longevity:</strong> {activeModalProduct.longevity}</div>
                  <div>• <strong>Sillage / Projection:</strong> {activeModalProduct.projection}</div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider" style={{ color: goldHeadingColor }}>
                    {activeModalProduct.categoryLabel}
                  </span>
                  <h2
                    className="text-xl sm:text-2xl font-black leading-snug mt-0.5"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {activeModalProduct.nameBn}
                  </h2>
                  <p className="text-xs font-medium mt-0.5" style={{ color: subTextColor }}>
                    {activeModalProduct.nameEn}
                  </p>
                </div>

                <div
                  className="p-4 rounded-2xl border grid grid-cols-2 gap-4"
                  style={{
                    backgroundColor: isDark ? '#1B1610' : '#FAF6EE',
                    borderColor: isDark ? '#2E241A' : '#E6DCCB',
                  }}
                >
                  <div>
                    <span className="text-[11px] opacity-75 block">৬ মিলি রোল-অন / তোলা:</span>
                    <span className="text-lg font-black" style={{ color: goldHeadingColor }}>
                      {activeModalProduct.price6ml}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] opacity-75 block">১২ মিলি শাহী তোলা / ফ্যামিলি:</span>
                    <span className="text-lg font-black" style={{ color: goldHeadingColor }}>
                      {activeModalProduct.price12ml}
                    </span>
                  </div>
                </div>

                {/* Full Olfactory Pyramid */}
                <div
                  className="p-4 rounded-2xl border space-y-3 text-xs"
                  style={{
                    backgroundColor: isDark ? '#1B1610' : '#FAF6EE',
                    borderColor: isDark ? '#2E241A' : '#E6DCCB',
                  }}
                >
                  <div className="font-black uppercase tracking-wider" style={{ color: goldHeadingColor }}>
                    ৩-স্তরের ঘ্রাণের পিরামিড (3-Tier Olfactory Note Pyramid):
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Sun size={15} className="shrink-0 mt-0.5" style={{ color: goldHeadingColor }} />
                    <div>
                      <strong>Top Notes (প্রথম ১৫ মিনিট):</strong> {activeModalProduct.topNotes}
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Flame size={15} className="shrink-0 mt-0.5" style={{ color: goldHeadingColor }} />
                    <div>
                      <strong>Heart Notes (মাঝের ৪–৮ ঘণ্টা):</strong> {activeModalProduct.heartNotes}
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Moon size={15} className="shrink-0 mt-0.5" style={{ color: goldHeadingColor }} />
                    <div>
                      <strong>Base Notes (১২–৪৮ ঘণ্টা স্থায়ী):</strong> {activeModalProduct.baseNotes}
                    </div>
                  </div>
                </div>

                <div className="text-xs font-semibold">
                  <strong style={{ color: goldHeadingColor }}>যাদের জন্য আদর্শ:</strong>{' '}
                  {activeModalProduct.bestFor}
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={scrollToDiscoveryCod}
                    className="flex-1 py-3.5 rounded-xl text-xs sm:text-sm font-black text-[#0B0907] flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #F5E6C8 50%, #C59B27 100%)',
                    }}
                  >
                    <ShoppingBag size={16} />
                    <span>এই আতরটি অর্ডার করুন (ক্যাশ অন ডেলিভারি)</span>
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
    </section>
  );
};
