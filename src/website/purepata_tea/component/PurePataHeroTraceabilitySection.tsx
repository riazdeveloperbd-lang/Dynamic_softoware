import React, { useState } from 'react';
import {
  Leaf,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Clock,
  Sparkles,
  Award,
  ShoppingBag,
  FileCheck2,
  Compass,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface PurePataHeroTraceabilitySectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

interface EstateOriginData {
  id: string;
  tabLabel: string;
  estateTitle: string;
  bnTitle: string;
  elevation: string;
  soilType: string;
  harvestWindow: string;
  transitTime: string;
  middlemanEliminated: string;
  signatureBlends: string[];
  batchCode: string;
  antioxidantNote: string;
  description: string;
}

const ESTATE_TRACEABILITY_DATA: EstateOriginData[] = [
  {
    id: 'sreemangal_valley',
    tabLabel: '01. Sreemangal Valley Estates (শ্রীমঙ্গল)',
    estateTitle: 'Finlay & Balishira Foothills Micro-Lot — Moulvibazar, Sylhet',
    bnTitle: 'শ্রীমঙ্গলের পাহাড়ি ছায়াঘেরা বাগান থেকে সরাসরি সংগৃহীত টু-লিফ অ্যান্ড আ বাড (Two Leaves & A Bud)',
    elevation: '180m – 320m Above Sea Level',
    soilType: 'Mineral-Rich Acidic Red Loam',
    harvestWindow: 'Dawn Plucking (5:30 AM – 8:00 AM)',
    transitTime: '৭২ ঘণ্টায় বাগান থেকে এয়ারটাইট টিনে প্যাকিং',
    middlemanEliminated: 'Zero Auction Broker · Direct Estate Contract',
    signatureBlends: [
      'Garden-Direct Sreemangal Orthodox Black Tea (FTGFOP1)',
      'Tulsi-Ginger Morning Immunity Blend',
      'Royal Cardamom & Cinnamon Masala Chai Mix',
    ],
    batchCode: 'BATCH #SRM-2026-10A (Lab Tested)',
    antioxidantNote: 'Retains 94% Natural Polyphenols & Theaflavins (vs. 40% in 8-month-old supermarket dust tea)',
    description:
      'সাধারণ সুপারমার্কেটের প্যাকেটজাত চা নিলাম ও ৩-৪ জন মধ্যস্বত্বভোগীর হাত ঘুরে আপনার কাপে পৌঁছাতে ৬–১০ মাস সময় নেয়—ততদিনে চায়ের প্রাকৃতিক অ্যান্টিঅক্সিডেন্ট ও ঘ্রাণ নষ্ট হয়ে যায়। PurePata শ্রীমঙ্গলের বাগান থেকে পাতা তোলার ৭২ ঘণ্টার মধ্যে অক্সিজেন-শিল্ডেড টিনে প্যাক করে সরাসরি আপনার বাসায় পৌঁছে দেয়।',
  },
  {
    id: 'panchagarh_organic',
    tabLabel: '02. Panchagarh Organic Gardens (পঞ্চগড়)',
    estateTitle: 'Himalayan Foothill Certified Organic Gardens — Tetulia, Panchagarh',
    bnTitle: 'হিমালয়ের পাদদেশে পঞ্চগড়ের ১০০% পেস্টিসাইড-মুক্ত অর্গানিক গ্রিন টি ও বোটানিক্যাল গার্ডেন',
    elevation: '120m Himalayan Alluvial Plains',
    soilType: 'Virgin Organic Sandy Loam (Zero Synthetic Fertilizer)',
    harvestWindow: 'First & Second Flush Hand-Sheared',
    transitTime: '৪৮ ঘণ্টায় স্টিম-ফিক্সিং ও ভ্যাকুয়াম সিলিং',
    middlemanEliminated: '100% Direct Farmer & Estate Co-Op',
    signatureBlends: [
      'Himalayan Mist Organic Whole-Leaf Green Tea',
      'Sun-Dried Blue Butterfly Pea Flower (অপরাজিতা চা)',
    ],
    batchCode: 'BATCH #PNC-2026-09B (USDA/BCSIR Verified)',
    antioxidantNote: 'High EGCG Catechin Count (118mg/cup) for Metabolism & Calm Focus',
    description:
      'পঞ্চগড়ের তেঁতুলিয়ার হিমালয় বিধৌত আবহাওয়া এবং রাসায়নিক সারমুক্ত মাটিতে উৎপাদিত আমাদের অর্গানিক গ্রিন টি ও অপরাজিতা ফুল। কোনো কৃত্রিম রঙ বা ফ্লেভার ছাড়াই সম্পূর্ণ অক্ষত পাতা (Whole Leaf) রোদে ও মৃদু তাপে শুকিয়ে প্রস্তুত করা হয়।',
  },
];

export const PurePataHeroTraceabilitySection: React.FC<
  PurePataHeroTraceabilitySectionProps
> = ({
  title,
  subtitle,
  variant,
  primaryColor = '#1E4620',
  isDark = false,
}) => {
  const [selectedEstateIdx, setSelectedEstateIdx] = useState<number>(0);
  const currentEstate =
    ESTATE_TRACEABILITY_DATA[selectedEstateIdx] || ESTATE_TRACEABILITY_DATA[0];

  const isCenteredHero = variant === 'varient_2';

  return (
    <div
      id="purepata-hero-section"
      className={`w-full transition-colors ${
        isDark ? 'bg-[#0C1712] text-stone-100' : 'bg-[#FAF7F2] text-[#1C2822]'
      }`}
    >
      {/* ================================================================= */}
      {/* 1. HERO SECTION: GARDEN-TO-CUP FRESHNESS & MINDFUL WELLNESS       */}
      {/* ================================================================= */}
      <section className="relative overflow-hidden border-b border-[#E4DFD5] dark:border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
          <div
            className={`grid grid-cols-1 ${
              isCenteredHero
                ? 'max-w-4xl mx-auto text-center gap-10'
                : 'lg:grid-cols-12 gap-10 lg:gap-12 items-center'
            }`}
          >
            {/* Left / Main Copy Column */}
            <div
              className={
                isCenteredHero ? 'space-y-6' : 'lg:col-span-7 space-y-6'
              }
            >
              {/* Clean Unboxed Metadata Line (Zero-Pill Discipline) */}
              <div
                className={`flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide ${
                  isCenteredHero ? 'justify-center' : ''
                }`}
                style={{ color: isDark ? '#A7F3D0' : primaryColor }}
              >
                <span>GARDEN-TO-CUP WHOLE LEAF TEA</span>
                <span aria-hidden="true" className="opacity-40">·</span>
                <span>শ্রীমঙ্গল ও পঞ্চগড় এস্টেট</span>
                <span aria-hidden="true" className="opacity-40">·</span>
                <span className="text-amber-700 dark:text-amber-400">
                  ১০০% কেমিক্যাল-মুক্ত ও ভেষজ ব্লেন্ড
                </span>
              </div>

              {/* H1 Headline */}
              <h1
                className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight leading-[1.15]"
                style={{
                  fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
                  textWrap: 'balance',
                }}
              >
                <EditableText
                  id="purepata_hero_h1"
                  defaultText={
                    title ||
                    'শ্রীমঙ্গলের কুয়াশাভেজা বাগান থেকে সরাসরি আপনার পেয়ালায় — এক চুমুকেই বিশুদ্ধ প্রকৃতির সতেজতা ও সুস্থতা'
                  }
                />
              </h1>

              {/* Subheadline */}
              <p
                className={`text-sm sm:text-base leading-relaxed max-w-2xl ${
                  isDark ? 'text-stone-300' : 'text-[#4A554E]'
                }`}
              >
                <EditableText
                  id="purepata_hero_subtitle"
                  defaultText={
                    subtitle ||
                    'টি-ব্যাগের কৃত্রিম ডাস্ট চা আর ব্লিচড পেপারের দিন শেষ। আমাদের নিজস্ব তত্ত্বাবধানে শ্রীমঙ্গল ও পঞ্চগড়ের বাগান থেকে সদ্য তোলা দুটি পাতা একটি কুঁড়ি (Whole-Leaf Orthodox Tea) এবং খাঁটি ভেষজ উপাদান—কোনো মধ্যস্বত্বভোগী ছাড়াই ৭২ ঘণ্টার মধ্যে ইকো-ফ্রেন্ডলি এয়ারটাইট টিনে পৌঁছে যাচ্ছে আপনার টেবিলে।'
                  }
                />
              </p>

              {/* 4 Key Wellness & Quality Bullets */}
              <ul
                className={`grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm pt-1 ${
                  isCenteredHero ? 'text-left max-w-2xl mx-auto' : ''
                }`}
              >
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="shrink-0 mt-0.5"
                    style={{ color: primaryColor }}
                  />
                  <span>
                    <strong>১০০% হোল-লিফ (Whole Leaf):</strong> কোনো ডাস্ট বা ফ্যানিংস নয়—অক্ষত পাতায় মেলে ৩ গুণ বেশি অ্যান্টিঅক্সিডেন্ট।
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="shrink-0 mt-0.5"
                    style={{ color: primaryColor }}
                  />
                  <span>
                    <strong>শূন্য মধ্যস্বত্বভোগী (Zero Middleman):</strong> বাগান থেকে তোলার ৭২ ঘণ্টায় ভ্যাকুয়াম ও টিনজাত করা সতেজ চা।
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="shrink-0 mt-0.5"
                    style={{ color: primaryColor }}
                  />
                  <span>
                    <strong>খাঁটি ভেষজ ওয়েলনেস (Pure Botanicals):</strong> আসল তুলসী, আদা, অপরাজিতা ফুল ও এলাচের প্রাকৃতিক মিশ্রণ।
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="shrink-0 mt-0.5"
                    style={{ color: primaryColor }}
                  />
                  <span>
                    <strong>ইকো-ফ্রেন্ডলি ডাবল-লিড টিন:</strong> প্লাস্টিক ও মাইক্রোপ্লাস্টিক টি-ব্যাগ মুক্ত শতভাগ নিরাপদ ফুড-গ্রেড টিন।
                  </span>
                </li>
              </ul>

              {/* Distinct CTA Buttons */}
              <div
                className={`flex flex-wrap items-center gap-3.5 pt-3 ${
                  isCenteredHero ? 'justify-center' : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('purepata-subscription-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold text-white shadow-md hover:opacity-95 transition flex items-center gap-2 cursor-pointer whitespace-nowrap"
                  style={{ backgroundColor: primaryColor }}
                >
                  <ShoppingBag size={16} />
                  <span>সতেজ চায়ের কালেকশন ও রিফিল বক্স দেখুন (১৫% ছাড়)</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('purepata-steeping-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold border transition flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                    isDark
                      ? 'bg-emerald-950/60 border-emerald-800 text-stone-100 hover:bg-emerald-900/70'
                      : 'bg-[#F2ECE1] border-[#DED6C6] text-[#1C2822] hover:bg-[#E8E0D2]'
                  }`}
                >
                  <Clock size={15} style={{ color: primaryColor }} />
                  <span>ইন্টারঅ্যাক্টিভ ব্রিউইং গাইড দেখুন</span>
                </button>
              </div>

              {/* Claim-to-Proof Adjacency Metrics */}
              <div className="pt-4 border-t border-[#E4DFD5] dark:border-emerald-900/70 grid grid-cols-3 gap-4 max-w-lg">
                <div>
                  <div
                    className="text-lg sm:text-xl font-black font-mono tabular-nums"
                    style={{ color: isDark ? '#A7F3D0' : primaryColor }}
                  >
                    ৭২ ঘণ্টা
                  </div>
                  <div className="text-[11px] opacity-75">
                    বাগান থেকে টিনজাত করার সর্বোচ্চ সময়
                  </div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black font-mono tabular-nums text-amber-700 dark:text-amber-400">
                    ০% ডাস্ট
                  </div>
                  <div className="text-[11px] opacity-75">
                    ১০০% অক্ষত হোল-লিফ ও ভেষজ পাতা
                  </div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-black font-mono tabular-nums">
                    ১৮,৫০০+
                  </div>
                  <div className="text-[11px] opacity-75">
                    ঢাকা, চট্টগ্রাম ও সিলেটের নিয়মিত গ্রাহক
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Botanical Apothecary Showcase Card */}
            {!isCenteredHero && (
              <div className="lg:col-span-5">
                <div
                  className={`rounded-2xl border p-5 space-y-4 shadow-sm ${
                    isDark
                      ? 'bg-[#11221A] border-emerald-900/80'
                      : 'bg-[#F2ECE1] border-[#DED6C6]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs border-b border-black/10 dark:border-white/10 pb-3">
                    <span className="font-bold">
                      PurePata Botanicals · Eco-Tin Reserve Collection
                    </span>
                    <span className="font-mono tabular-nums font-bold text-amber-700 dark:text-amber-400">
                      Harvest: Oct 2026
                    </span>
                  </div>

                  {/* Hero Image with Measured Scrim */}
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-stone-900 border border-black/10">
                    <img
                      src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=85"
                      alt="Artisanal Loose Leaf Organic Green Tea and Herbal Botanicals in Ceramic Teacup"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4 text-white">
                      <div className="text-[11px] font-semibold text-amber-300">
                        SINGLE-ESTATE SREEMANGAL &amp; PANCHAGARH HARVEST
                      </div>
                      <div className="text-sm sm:text-base font-extrabold">
                        দুটি পাতা একটি কুঁড়ির সতেজ ঘ্রাণ ও ভেষজ প্রশান্তি
                      </div>
                    </div>
                  </div>

                  {/* 5 Signature Blends Quick Index */}
                  <div className="space-y-2 text-xs">
                    {[
                      {
                        name: '01. Sreemangal Orthodox Black Tea (FTGFOP1)',
                        meta: '100g Eco-Tin · 50 Cups · ৳580',
                      },
                      {
                        name: '02. Himalayan Mist Organic Green Tea',
                        meta: '100g Eco-Tin · Rich EGCG · ৳650',
                      },
                      {
                        name: '03. Blue Butterfly Pea Flower (অপরাজিতা চা)',
                        meta: '50g Whole Flowers · Caffeine-Free · ৳520',
                      },
                      {
                        name: '04. Tulsi-Ginger Morning Wellness Blend',
                        meta: '100g Eco-Tin · Throat & Digestion · ৳620',
                      },
                      {
                        name: '05. Immunity-Boosting Royal Masala Chai',
                        meta: '120g Eco-Tin · 6 Whole Spices · ৳680',
                      },
                    ].map((item) => (
                      <div
                        key={item.name}
                        className={`flex items-center justify-between py-2 px-3 rounded-lg border ${
                          isDark
                            ? 'bg-[#0C1712]/90 border-emerald-950'
                            : 'bg-[#FAF7F2] border-[#E4DFD5]'
                        }`}
                      >
                        <span className="font-semibold truncate pr-2">
                          {item.name}
                        </span>
                        <span
                          className="font-mono tabular-nums text-[11px] font-bold shrink-0"
                          style={{ color: isDark ? '#FCD34D' : primaryColor }}
                        >
                          {item.meta}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. GARDEN-TO-CUP TRACEABILITY BADGE & ESTATE ORIGIN PASSPORT      */}
      {/* ================================================================= */}
      <section
        id="purepata-traceability-section"
        className={`py-14 lg:py-20 ${
          isDark ? 'bg-[#0F1E17]' : 'bg-[#F2ECE1]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          {/* Header & Estate Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div
                className="text-xs font-bold tracking-wider uppercase"
                style={{ color: isDark ? '#A7F3D0' : primaryColor }}
              >
                01. GARDEN-TO-CUP TRACEABILITY PASSPORT
              </div>
              <h2
                className="text-2xl sm:text-3xl font-black tracking-tight"
                style={{
                  fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
                }}
              >
                <EditableText
                  id="purepata_traceability_h2"
                  defaultText="মধ্যস্বত্বভোগী ও নিলামের ৬ মাসের বিলম্ব নয় — বাগান থেকে ৭২ ঘণ্টায় সরাসরি আপনার পেয়ালায়"
                />
              </h2>
              <p className="text-xs sm:text-sm opacity-85 leading-relaxed">
                প্রতিটি PurePata টিনের নিচে থাকছে হারভেস্ট ব্যাচ কোড। নিচের বাটন থেকে আমাদের দুটি সিঙ্গেল-অরিজিন এস্টেট অঞ্চল নির্বাচন করে দেখুন আপনার চা কোথায় এবং কীভাবে তৈরি হয়:
              </p>
            </div>

            {/* Interactive Estate Selector Buttons */}
            <div
              className={`flex flex-wrap items-center gap-1.5 p-1 rounded-xl border self-start ${
                isDark
                  ? 'bg-[#0C1712] border-emerald-900'
                  : 'bg-[#FAF7F2] border-[#DED6C6]'
              }`}
            >
              {ESTATE_TRACEABILITY_DATA.map((est, idx) => {
                const active = selectedEstateIdx === idx;
                return (
                  <button
                    key={est.id}
                    type="button"
                    onClick={() => setSelectedEstateIdx(idx)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-extrabold transition cursor-pointer whitespace-nowrap ${
                      active ? 'text-white shadow-xs' : 'opacity-75 hover:opacity-100'
                    }`}
                    style={
                      active ? { backgroundColor: primaryColor } : undefined
                    }
                  >
                    {est.tabLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4-Step Direct Supply Chain Comparison + Estate Passport Card */}
          <div
            className={`rounded-2xl border p-6 lg:p-8 space-y-8 ${
              isDark
                ? 'bg-[#0C1712] border-emerald-900/80'
                : 'bg-[#FAF7F2] border-[#DED6C6]'
            }`}
          >
            {/* Top Passport Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-black/10 dark:border-white/10">
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">
                  VERIFIED ESTATE PASSPORT · {currentEstate.batchCode}
                </div>
                <h3 className="text-lg sm:text-xl font-black">
                  {currentEstate.estateTitle}
                </h3>
                <p className="text-xs sm:text-sm font-semibold opacity-85">
                  {currentEstate.bnTitle}
                </p>
              </div>

              <div
                className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 self-start ${
                  isDark
                    ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                }`}
              >
                <ShieldCheck size={16} className="shrink-0" />
                <span>{currentEstate.middlemanEliminated}</span>
              </div>
            </div>

            {/* 4 Traceability Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: '01. Estate Elevation & Terroir',
                  val: currentEstate.elevation,
                  sub: currentEstate.soilType,
                },
                {
                  label: '02. Plucking Standard',
                  val: currentEstate.harvestWindow,
                  sub: 'Strictly Top 2 Leaves & 1 Unopened Bud',
                },
                {
                  label: '03. Garden-to-Tin Speed',
                  val: currentEstate.transitTime,
                  sub: 'No Chittagong Warehouse Storage Delay',
                },
                {
                  label: '04. Wellness Potency',
                  val: '94% Active Polyphenols',
                  sub: 'Zero Pesticides · Zero Artificial Aroma',
                },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className={`p-4 rounded-xl border space-y-1.5 ${
                    isDark
                      ? 'bg-[#11221A] border-emerald-900/60'
                      : 'bg-[#F2ECE1]/70 border-[#DED6C6]'
                  }`}
                >
                  <div className="text-[11px] font-bold opacity-65">
                    {badge.label}
                  </div>
                  <div
                    className="text-sm font-black"
                    style={{ color: isDark ? '#FCD34D' : primaryColor }}
                  >
                    {badge.val}
                  </div>
                  <div className="text-xs opacity-80 leading-snug">
                    {badge.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Narrative & Blends from this Estate */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
              <div className="lg:col-span-7 space-y-2">
                <div className="text-xs font-extrabold uppercase tracking-wider opacity-70">
                  কেন বাগান থেকে সরাসরি সংগৃহীত চা আপনার স্বাস্থ্যের জন্য আলাদা?
                </div>
                <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                  {currentEstate.description}
                </p>
                <div className="text-xs font-semibold text-amber-800 dark:text-amber-300 pt-1">
                  ✦ ল্যাব রিপোর্ট নোট: {currentEstate.antioxidantNote}
                </div>
              </div>

              <div
                className={`lg:col-span-5 p-4 rounded-xl border space-y-2.5 ${
                  isDark
                    ? 'bg-[#11221A] border-emerald-900'
                    : 'bg-white border-[#E4DFD5]'
                }`}
              >
                <div className="text-xs font-extrabold">
                  এই বাগান থেকে সংগৃহীত আমাদের সিগনেচার ব্লেন্ডসমূহ:
                </div>
                <ul className="space-y-1.5 text-xs">
                  {currentEstate.signatureBlends.map((blend) => (
                    <li key={blend} className="flex items-center gap-2 font-medium">
                      <CheckCircle2
                        size={14}
                        style={{ color: primaryColor }}
                        className="shrink-0"
                      />
                      <span>{blend}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
