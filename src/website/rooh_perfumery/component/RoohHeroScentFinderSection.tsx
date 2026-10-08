import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Flame,
  Sun,
  Moon,
  Compass,
  ShoppingBag,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface RoohHeroScentFinderSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

interface ScentQuizOption {
  id: string;
  labelBn: string;
  labelEn: string;
  desc: string;
}

const OCCASION_OPTIONS: ScentQuizOption[] = [
  {
    id: 'jummah_namaz',
    labelBn: 'জুম্মা ও পাঁচ ওয়াক্ত নামাজ',
    labelEn: 'Jummah & Daily Sunnah Prayer',
    desc: 'স্নিগ্ধ, পবিত্র ও প্রশান্তিদায়ক রাজকীয় সুবাস যা মুসল্লিদের মুগ্ধ করবে',
  },
  {
    id: 'office_corporate',
    labelBn: 'অফিস ও কর্পোরেট মিটিং',
    labelEn: 'Executive Office & Daily Wear',
    desc: 'ফ্রেশ সাইট্রাস ও ফরাসি অ্যাম্বার-উডি নোট যা সারাদিন ফুরফুরে রাখে',
  },
  {
    id: 'wedding_eid',
    labelBn: 'বিয়ে, দাওয়াত ও ঈদের রাত',
    labelEn: 'Royal Wedding & Eid Majlis',
    desc: 'গভীর আগরউড, জাফরান ও গোলাপের আভিজাত্যপূর্ণ লং-লাস্টিং প্রজেকশন',
  },
  {
    id: 'home_bakhoor',
    labelBn: 'ঘর ও জায়নামাজ সুবাসিত করা',
    labelEn: 'Home Sanctuary & Bakhoor Ritual',
    desc: 'মদিনার রওজা ও কাবা শরীফের অনুপ্রেরণায় তৈরি ধোঁয়াবিহীন বাখুর ও স্প্রে',
  },
];

const NOTE_FAMILY_OPTIONS: ScentQuizOption[] = [
  {
    id: 'woody_oud',
    labelBn: 'গভীর আগরউড ও অ্যাম্বার (Woody & Smoky Oud)',
    labelEn: 'Aged Cambodian & Sylheti Agarwood',
    desc: 'আভিজাত্যপূর্ণ, গম্ভীর ও রাজকীয় ওরিয়েন্টাল নোট',
  },
  {
    id: 'fresh_citrus',
    labelBn: 'ফ্রেশ বার্গামট ও অ্যাকুয়া (Fresh Citrus & Marine)',
    labelEn: 'Crisp French Bergamot & Ambroxan',
    desc: 'গরমের দিনে ঘামের দুর্গন্ধ দূর করে সতেজ অনুভূতি দেয়',
  },
  {
    id: 'sweet_floral',
    labelBn: 'তাইফ গোলাপ, কস্তুরী ও জাফরান (Floral & White Musk)',
    labelEn: 'Damask Taif Rose, Saffron & Tahara Musk',
    desc: 'মিষ্টি, কোমল ও মন মাতানো জান্নাতি সুবাস',
  },
];

const INTENSITY_OPTIONS: ScentQuizOption[] = [
  {
    id: 'subtle_intimate',
    labelBn: 'স্নিগ্ধ ও কোমল (ইবাদত ও ঘুমের জন্য)',
    labelEn: 'Soft Skin-Close Aura (12–18 Hours)',
    desc: 'পাশে থাকা মানুষটি মৃদু ও পবিত্র সুবাস অনুভব করবে',
  },
  {
    id: 'moderate_executive',
    labelBn: 'মাঝারি ও মার্জিত (অফিস ও প্রতিদিনের জন্য)',
    labelEn: 'Balanced Executive Sillage (24+ Hours)',
    desc: 'পুরো রুমে বিরক্ত না করে একটি প্রিমিয়াম উপস্থিতি জানান দেয়',
  },
  {
    id: 'beast_projection',
    labelBn: 'স্ট্রং রাজকীয় প্রজেকশন (জুম্মা ও বিয়ের দাওয়াত)',
    labelEn: 'Beast-Mode Extrait Trail (48+ Hours on Cotton)',
    desc: 'পাঞ্জাবি বা কাপড়ে একবার লাগালে ধোয়ার পরও সুবাস অটুট থাকে',
  },
];

export const RoohHeroScentFinderSection: React.FC<RoohHeroScentFinderSectionProps> = ({
  title,
  subtitle,
  variant,
  isDark = false,
}) => {
  const [selectedOccasion, setSelectedOccasion] = useState<string>('jummah_namaz');
  const [selectedFamily, setSelectedFamily] = useState<string>('woody_oud');
  const [selectedIntensity, setSelectedIntensity] = useState<string>('beast_projection');

  const goldHeadingColor = isDark ? '#D4AF37' : '#8F620A';
  const primaryTextColor = isDark ? '#F9F6F0' : '#18130E';
  const subTextColor = isDark ? '#D2C5B4' : '#4A3B2C';

  // Dynamic Recommendation Engine based on 3 Quiz Inputs
  const recommendation = useMemo(() => {
    if (selectedOccasion === 'home_bakhoor') {
      return {
        nameBn: 'মদিনা রওজা বাখুর ও গোল্ড বার্নার কম্বো (Bakhoor Al-Madinah)',
        nameEn: 'Royal Bakhoor Al-Haramain Chips + Electric Mabkhara Set',
        category: 'Bakhoor & Burners',
        longevity: 'ঘরে ১২+ ঘণ্টা স্থায়ী সুবাস',
        price: '৳১,৪৫০',
        samplePrice: '৳২৯০ (ট্রায়াল বক্স)',
        topNotes: 'সিনাই ফ্র্যাংকিনসেন্স, জাফরান ও কর্পূর',
        heartNotes: 'তাইফ গোলাপের পাপড়ি ও ডামাস্ক রোজ অয়েল',
        baseNotes: 'সিলেটের আগরউড চিপস, স্যান্ডালউড ও অ্যাম্বার রেজিন',
        whyMatch:
          'বৃহস্পতিবার সন্ধ্যা ও জুম্মার দিনে আপনার বসার ঘর ও নামাজের স্থানে মদিনা শরীফের প্রশান্তিময় পরিবেশ তৈরি করবে।',
        image:
          'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=900&q=85',
      };
    }

    if (selectedFamily === 'fresh_citrus' || selectedOccasion === 'office_corporate') {
      return {
        nameBn: 'ব্লু ডি আরাবিয়া ও ক্রিড সিলভার (ফরাসি ক্লোন অয়েল + পকেট স্প্রে)',
        nameEn: 'Bleu De Arabia & Silver Creed Extrait Oil (0% Alcohol)',
        category: 'Designer Inspirations & Pocket Sprays',
        longevity: 'ত্বকে ১৪ ঘণ্টা · কাপড়ে ৩৬+ ঘণ্টা',
        price: '৳৭৯০ (৬ মিলি রোল-অন + ১০ মিলি পকেট স্প্রে)',
        samplePrice: '৳২২০ (৩ মিলি টেস্টার)',
        topNotes: 'ক্যালাব্রিয়ান বার্গামট, জাম্বুরা, ব্ল্যাককারেন্ট ও মিন্ট',
        heartNotes: 'ফ্রেশ জেসমিন, পিঙ্ক পেপার ও আদা',
        baseNotes: 'অ্যামব্রোক্সান, হোয়াইট মাস্ক, সিডারউড ও ভেটিভার',
        whyMatch:
          'বাংলাদেশের গরম ও আর্দ্র আবহাওয়ায় অফিস বা মিটিংয়ে ঘামের গন্ধ দূর করে ২৪ ঘণ্টা এনার্জেটিক ও কর্পোরেট ভাইব ধরে রাখে।',
        image:
          'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85',
      };
    }

    if (selectedFamily === 'sweet_floral' || selectedIntensity === 'subtle_intimate') {
      return {
        nameBn: 'জান্নাতুল ফেরদৌস ও কস্তুরী রয়্যাল (মিশরীয় তাহারা মাস্ক ও তাইফ রোজ)',
        nameEn: 'Kashmiri Saffron, Taif Rose & Royal White Tahara Musk',
        category: 'Pure Attars (Sunnah Collection)',
        longevity: 'ত্বকে ১৬ ঘণ্টা · সুতি পাঞ্জাবিতে ৪০+ ঘণ্টা',
        price: '৳৮৫০ (৬ মিলি ক্রিস্টাল ডিপস্টিক বোতল)',
        samplePrice: '৳২৪০ (৩ মিলি টেস্টার)',
        topNotes: 'সৌদি তাইফ গোলাপ, কাশ্মীরি জাফরান ও এলাচ',
        heartNotes: 'মিশরীয় হোয়াইট লিলি ও ক্রিমি ভ্যানিলা অর্কিড',
        baseNotes: 'খাঁটি হোয়াইট তাহারা মাস্ক (কস্তুরী) ও মহীশূর চন্দন',
        whyMatch:
          'জুম্মার নামাজ, তাহাজ্জুদ ও দৈনন্দিন সুন্নাহ পালনে স্নিগ্ধ, কোমল ও মাথা ব্যথামুক্ত জান্নাতি সুবাস।',
        image:
          'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=900&q=85',
      };
    }

    return {
      nameBn: 'কম্বোডিয়ান ও সিলেটি শাহী উদ আল-মালিকি (Aged Artisanal Oud)',
      nameEn: 'Royal Cambodian & Sylheti Aged Oud Al-Maliki (100% Pure Oil)',
      category: 'Pure Attars (Flagship Heritage Oud)',
      longevity: 'ত্বকে ১৮ ঘণ্টা · পাঞ্জাবিতে ৪৮+ ঘণ্টা',
      price: '৳১,২৫০ (৬ মিলি রাজকীয় ক্রিস্টাল তোলা)',
      samplePrice: '৳৩২০ (৩ মিলি টেস্টার)',
      topNotes: 'ইরানি জাফরান, স্মোকি ইনসেন্স ও রোজউড',
      heartNotes: '৫ বছর এজড কম্বোডিয়ান ও মৌলভীবাজারের আগরউড রেজিন',
      baseNotes: 'গোল্ডেন অ্যাম্বারগ্রিস, ডার্ক লেদার ও স্যান্ডালউড',
      whyMatch:
        'বিয়ে, ঈদ বা জুম্মার কাতারে দাঁড়ালে আপনার চারপাশের মানুষ অবাক হয়ে জিজ্ঞেস করবে আপনি কোন রাজকীয় আতর ব্যবহার করেছেন।',
      image:
        'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=900&q=85',
    };
  }, [selectedOccasion, selectedFamily, selectedIntensity]);

  const scrollToDiscoveryCod = () => {
    const el = document.getElementById('rooh-discovery-cod');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="rooh-hero-scent-finder"
      className="relative overflow-hidden py-14 md:py-20 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: isDark ? '#0B0907' : '#FBF8F3',
        color: primaryTextColor,
      }}
    >
      {/* Subtle Ambient Gold & Oud Radial Glow */}
      <div
        className="pointer-events-none absolute -top-36 right-1/4 w-[520px] h-[520px] rounded-full blur-3xl opacity-15"
        style={{
          background: 'radial-gradient(circle, #D4AF37 0%, #6B4423 50%, transparent 75%)',
        }}
      />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* PART 1: LUXURY ARABIAN HERO SECTION */}
        <div
          className={`grid grid-cols-1 ${
            variant === 'varient_2'
              ? 'max-w-4xl mx-auto text-center gap-10'
              : 'lg:grid-cols-12 gap-10 lg:gap-12 items-center'
          }`}
        >
          {/* Left Column: High-Converting Bilingual Copywriting */}
          <div className={variant === 'varient_2' ? 'space-y-6' : 'lg:col-span-7 space-y-6'}>
            <div
              className={`inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-extrabold border ${
                variant === 'varient_2' ? 'mx-auto' : ''
              }`}
              style={{
                backgroundColor: isDark ? 'rgba(212, 175, 55, 0.14)' : '#F5EAD4',
                borderColor: isDark ? 'rgba(212, 175, 55, 0.4)' : '#D4AF37',
                color: goldHeadingColor,
              }}
            >
              <Sparkles size={14} />
              <EditableText
                id="rooh_hero_kicker"
                defaultText="১০০% অ্যালকোহল-মুক্ত · নামাজের জন্য সম্পূর্ণ হালাল · ৪৮+ ঘণ্টা দীর্ঘস্থায়ী সুবাস"
              />
            </div>

            <h1
              className="text-3xl sm:text-5xl lg:text-[48px] font-black tracking-tight leading-[1.16]"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: primaryTextColor,
              }}
            >
              <EditableText
                id="rooh_hero_h1"
                defaultText={
                  title ||
                  'এক ফোঁটাতেই ৪৮ ঘণ্টার রাজকীয় আভিজাত্য ও পবিত্র প্রশান্তি — ১০০% অ্যালকোহল-মুক্ত খাঁটি আতর ও উদ'
                }
              />
            </h1>

            <p
              className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-medium"
              style={{ color: subTextColor }}
            >
              <EditableText
                id="rooh_hero_sub"
                defaultText={
                  subtitle ||
                  'অ্যালকোহলযুক্ত স্প্রে পারফিউমের কড়া কেমিক্যাল ও ১ ঘণ্টায় উবে যাওয়া গন্ধের দিন শেষ। সিলেটের আগরউড, সৌদি তাইফের গোলাপ এবং ফরাসি পারফিউম অয়েলের সংমিশ্রণে তৈরি রুহ সুগন্ধি আপনার জুম্মা, পাঁচ ওয়াক্ত নামাজ, অফিস ও ঈদের দাওয়াতে ছড়িয়ে দেবে দীর্ঘস্থায়ী রাজকীয় সুবাস।'
                }
              />
            </p>

            {/* 4 Key Halal & Concentration Guarantees */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-left ${
                variant === 'varient_2' ? 'max-w-2xl mx-auto' : ''
              }`}
            >
              {[
                {
                  title: '০% অ্যালকোহল ও সিনথেটিক স্পিরিট মুক্ত',
                  desc: 'পাঁচ ওয়াক্ত নামাজ, জুম্মা ও ওমরাহর ইহরামে নিঃসন্দেহে ব্যবহারযোগ্য',
                },
                {
                  title: '১০০% আনডিলিউটেড এক্সট্রেইট অয়েল',
                  desc: 'এক ফোঁটাতেই সুতি পাঞ্জাবিতে ৪৮ ঘণ্টা এবং ত্বকে ১৬+ ঘণ্টা স্থায়ী থাকে',
                },
                {
                  title: 'সিলেট, কম্বোডিয়া ও সৌদি তাইফ সোর্সিং',
                  desc: 'মৌলভীবাজারের আগরউড, তাইফের গোলাপ ও ফরাসি মাস্টার পারফিউম অয়েল',
                },
                {
                  title: 'সারা বাংলাদেশে ক্যাশ অন ডেলিভারি',
                  desc: 'ডেলিভারি ম্যানের সামনে স্মেল টেস্ট করে টাকা পরিশোধের সুবিধা',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl border flex items-start gap-2.5"
                  style={{
                    backgroundColor: isDark ? '#14100C' : '#F4ECE0',
                    borderColor: isDark ? '#2A2218' : '#DECDB4',
                  }}
                >
                  <CheckCircle2
                    size={16}
                    className="shrink-0 mt-0.5"
                    style={{ color: goldHeadingColor }}
                  />
                  <div>
                    <div
                      className="text-xs font-extrabold"
                      style={{ color: isDark ? '#F5E6C8' : '#18130E' }}
                    >
                      {item.title}
                    </div>
                    <div
                      className="text-[11px] mt-0.5 leading-snug font-medium"
                      style={{ color: subTextColor }}
                    >
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Primary & Secondary CTAs */}
            <div
              className={`flex flex-wrap items-center gap-3.5 pt-2 ${
                variant === 'varient_2' ? 'justify-center' : ''
              }`}
            >
              <button
                type="button"
                onClick={scrollToDiscoveryCod}
                className="px-6 py-4 rounded-xl text-xs sm:text-sm font-black text-[#0B0907] shadow-xl flex items-center gap-2.5 transition transform hover:-translate-y-0.5 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #F5E6C8 50%, #C59B27 100%)',
                }}
              >
                <ShoppingBag size={17} />
                <EditableText
                  id="rooh_hero_cta_primary"
                  defaultText="৫টি আতরের ডিসকভারি বক্স অর্ডার করুন — ৳৯৯০"
                />
                <ArrowRight size={16} />
              </button>

              <a
                href="#rooh-scent-quiz-card"
                className="px-5 py-4 rounded-xl text-xs sm:text-sm font-extrabold border flex items-center gap-2 transition hover:border-[#D4AF37] cursor-pointer"
                style={{
                  backgroundColor: isDark ? '#15110C' : '#FFFFFF',
                  borderColor: isDark ? '#33291E' : '#C9B89D',
                  color: primaryTextColor,
                }}
              >
                <Compass size={16} style={{ color: goldHeadingColor }} />
                <EditableText
                  id="rooh_hero_cta_secondary"
                  defaultText="৩০ সেকেন্ডে আপনার সেরা আতর খুঁজুন (Scent Quiz)"
                />
              </a>
            </div>

            {/* Trust Metrics */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-semibold">
              <div>
                <strong
                  className="text-base font-black"
                  style={{ color: goldHeadingColor }}
                >
                  ৩৮,৫০০+
                </strong>{' '}
                সুন্নাহ ও পারফিউম প্রেমী গ্রাহক
              </div>
              <span>·</span>
              <div>
                <strong
                  className="text-base font-black"
                  style={{ color: goldHeadingColor }}
                >
                  ৪.৯৭ ★
                </strong>{' '}
                যাচাইকৃত রিভিউ রেটিং
              </div>
              <span>·</span>
              <div>
                <strong className="text-base font-black text-[#059669]">
                  BSTI &amp; IFRA
                </strong>{' '}
                গ্রেড ন্যাচারাল অয়েল
              </div>
            </div>
          </div>

          {/* Right Column: Crystal Attar Flacon & Olfactory Pyramid Showcase */}
          {variant !== 'varient_2' && (
            <div className="lg:col-span-5">
              <div
                className="rounded-2xl p-5 border relative overflow-hidden space-y-4 shadow-2xl"
                style={{
                  backgroundColor: isDark ? '#14100C' : '#F4ECE0',
                  borderColor: isDark ? '#3A2E21' : '#D6C4A9',
                }}
              >
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] border border-[#D4AF37]/30">
                  <img
                    src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=85"
                    alt="Rooh Perfumery Crystal Attar Flacon and Agarwood Chips"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0907] via-black/25 to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-md text-[11px] font-extrabold bg-[#0B0907]/90 text-[#D4AF37] border border-[#D4AF37]/40">
                      Flagship · Oud Al-Maliki (শাহী উদ)
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-black bg-[#10B981] text-[#052E16]">
                      0% Alcohol · Halal
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-bold">
                      Hand-Aged in Dark Glass · 2021 Vintage
                    </p>
                    <h3
                      className="text-lg font-black"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      Cambodian &amp; Sylheti Royal Agarwood Extrait
                    </h3>
                  </div>
                </div>

                {/* Live 3-Tier Fragrance Note Pyramid */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className="font-extrabold uppercase tracking-wider"
                      style={{ color: goldHeadingColor }}
                    >
                      সুবাসের ৩টি স্তর (Fragrance Note Pyramid)
                    </span>
                    <span className="font-mono text-[11px] font-bold">স্থায়িত্ব: ৪৮+ ঘণ্টা</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div
                      className="p-2.5 rounded-lg border flex items-center justify-between"
                      style={{
                        backgroundColor: isDark ? '#1B1510' : '#FFFFFF',
                        borderColor: isDark ? '#2D2419' : '#E2D5C1',
                      }}
                    >
                      <div>
                        <span
                          className="text-[10px] font-extrabold uppercase tracking-wider block"
                          style={{ color: goldHeadingColor }}
                        >
                          ১. Top Notes (প্রথম ১৫ মিনিট)
                        </span>
                        <span className="font-bold">ইরানি জাফরান, তাইফ গোলাপ ও ফ্রেশ বার্গামট</span>
                      </div>
                      <Sun size={15} className="shrink-0" style={{ color: goldHeadingColor }} />
                    </div>

                    <div
                      className="p-2.5 rounded-lg border flex items-center justify-between"
                      style={{
                        backgroundColor: isDark ? '#1B1510' : '#FFFFFF',
                        borderColor: isDark ? '#2D2419' : '#E2D5C1',
                      }}
                    >
                      <div>
                        <span
                          className="text-[10px] font-extrabold uppercase tracking-wider block"
                          style={{ color: goldHeadingColor }}
                        >
                          ২. Heart Notes (১ থেকে ৮ ঘণ্টা)
                        </span>
                        <span className="font-bold">মৌলভীবাজারের আগরউড, অ্যাম্বার রেজিন ও হোয়াইট লিলি</span>
                      </div>
                      <Flame size={15} className="shrink-0" style={{ color: goldHeadingColor }} />
                    </div>

                    <div
                      className="p-2.5 rounded-lg border flex items-center justify-between"
                      style={{
                        backgroundColor: isDark ? '#1B1510' : '#FFFFFF',
                        borderColor: isDark ? '#2D2419' : '#E2D5C1',
                      }}
                    >
                      <div>
                        <span
                          className="text-[10px] font-extrabold uppercase tracking-wider block"
                          style={{ color: goldHeadingColor }}
                        >
                          ৩. Base Notes (৮ থেকে ৪৮+ ঘণ্টা)
                        </span>
                        <span className="font-bold">কম্বোডিয়ান এজড উদ, কস্তুরী (White Musk) ও মহীশূর চন্দন</span>
                      </div>
                      <Moon size={15} className="shrink-0" style={{ color: goldHeadingColor }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PART 2: MANDATORY INTERACTIVE SCENT PROFILE FINDER / QUIZ */}
        <div
          id="rooh-scent-quiz-card"
          className="rounded-3xl p-6 sm:p-8 lg:p-10 border shadow-2xl space-y-8"
          style={{
            backgroundColor: isDark ? '#130F0B' : '#F5EFE4',
            borderColor: isDark ? '#3A2E21' : '#D6C4A9',
          }}
        >
          <div
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6"
            style={{ borderColor: isDark ? '#2D2419' : '#DECDB4' }}
          >
            <div className="space-y-1.5">
              <div
                className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest"
                style={{ color: goldHeadingColor }}
              >
                <Compass size={15} />
                <span>Interactive Scent Profile Finder · ঘ্রাণ নির্বাচন কুইজ</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-black"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: primaryTextColor,
                }}
              >
                <EditableText
                  id="rooh_quiz_title"
                  defaultText="অনলাইনে না শুঁকে কীভাবে বুঝবেন কোন আতরটি আপনার ব্যক্তিত্বের সাথে মানাবে?"
                />
              </h2>
              <p className="text-xs sm:text-sm max-w-2xl font-medium" style={{ color: subTextColor }}>
                নিচের ৩টি সহজ ধাপে আপনার ব্যবহারের উপলক্ষ, পছন্দের ঘ্রাণের ধরন এবং স্থায়িত্ব সিলেক্ট করুন—আমাদের মাস্টার পারফিউমার অ্যালগরিদম আপনার জন্য সেরা আতরটি সাজেস্ট করবে:
              </p>
            </div>
            <div className="px-3.5 py-2 rounded-xl border border-[#D4AF37]/40 bg-[#1B1510] text-xs font-bold text-[#F5E6C8] self-start">
              ✓ ১০০% ব্লাইন্ড-বাই সেফটি গ্যারান্টি
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: 3-Step Interactive Selector */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1: Occasion */}
              <div className="space-y-2.5">
                <label
                  className="text-xs font-extrabold uppercase tracking-wider block"
                  style={{ color: goldHeadingColor }}
                >
                  ধাপ ১: কোন উপলক্ষ বা সময়ের জন্য সুগন্ধি খুঁজছেন? (Select Occasion)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {OCCASION_OPTIONS.map((opt) => {
                    const active = selectedOccasion === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedOccasion(opt.id)}
                        className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                          active ? 'ring-2 ring-[#D4AF37]' : 'opacity-85 hover:opacity-100'
                        }`}
                        style={{
                          backgroundColor: active
                            ? isDark
                              ? 'rgba(212, 175, 55, 0.16)'
                              : '#FDF7E7'
                            : isDark
                            ? '#1A140F'
                            : '#FFFFFF',
                          borderColor: active
                            ? '#D4AF37'
                            : isDark
                            ? '#2E241A'
                            : '#DED0BC',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold">{opt.labelBn}</span>
                          {active && (
                            <CheckCircle2 size={14} style={{ color: goldHeadingColor }} />
                          )}
                        </div>
                        <div
                          className="text-[10px] font-bold mt-0.5"
                          style={{ color: goldHeadingColor }}
                        >
                          {opt.labelEn}
                        </div>
                        <p className="text-[11px] mt-1 leading-snug" style={{ color: subTextColor }}>
                          {opt.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Olfactory Family */}
              <div className="space-y-2.5">
                <label
                  className="text-xs font-extrabold uppercase tracking-wider block"
                  style={{ color: goldHeadingColor }}
                >
                  ধাপ ২: আপনার পছন্দের ঘ্রাণের নোট কোনটি? (Preferred Scent Family)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {NOTE_FAMILY_OPTIONS.map((opt) => {
                    const active = selectedFamily === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedFamily(opt.id)}
                        className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                          active ? 'ring-2 ring-[#D4AF37]' : 'opacity-85 hover:opacity-100'
                        }`}
                        style={{
                          backgroundColor: active
                            ? isDark
                              ? 'rgba(212, 175, 55, 0.16)'
                              : '#FDF7E7'
                            : isDark
                            ? '#1A140F'
                            : '#FFFFFF',
                          borderColor: active
                            ? '#D4AF37'
                            : isDark
                            ? '#2E241A'
                            : '#DED0BC',
                        }}
                      >
                        <div className="text-xs font-extrabold">{opt.labelBn}</div>
                        <p className="text-[11px] mt-1 leading-snug" style={{ color: subTextColor }}>
                          {opt.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Sillage & Projection Intensity */}
              <div className="space-y-2.5">
                <label
                  className="text-xs font-extrabold uppercase tracking-wider block"
                  style={{ color: goldHeadingColor }}
                >
                  ধাপ ৩: সুবাসের তীব্রতা ও ছড়িয়ে পড়ার মাত্রা কেমন চান? (Sillage Intensity)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {INTENSITY_OPTIONS.map((opt) => {
                    const active = selectedIntensity === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedIntensity(opt.id)}
                        className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                          active ? 'ring-2 ring-[#D4AF37]' : 'opacity-85 hover:opacity-100'
                        }`}
                        style={{
                          backgroundColor: active
                            ? isDark
                              ? 'rgba(212, 175, 55, 0.16)'
                              : '#FDF7E7'
                            : isDark
                            ? '#1A140F'
                            : '#FFFFFF',
                          borderColor: active
                            ? '#D4AF37'
                            : isDark
                            ? '#2E241A'
                            : '#DED0BC',
                        }}
                      >
                        <div className="text-xs font-extrabold">{opt.labelBn}</div>
                        <div
                          className="text-[10px] font-mono font-bold mt-0.5"
                          style={{ color: goldHeadingColor }}
                        >
                          {opt.labelEn}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Live Bespoke Scent Match Output Card */}
            <div className="lg:col-span-5">
              <div
                className="rounded-2xl p-5 border-2 space-y-4 relative overflow-hidden shadow-lg"
                style={{
                  backgroundColor: isDark ? '#1A140E' : '#FFFFFF',
                  borderColor: '#D4AF37',
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#D4AF37] text-[#0B0907]">
                    ★ ৯৯% পারফেক্ট ঘ্রাণ ম্যাচ (Perfumer Match)
                  </span>
                  <span className="text-xs font-extrabold text-[#059669]">
                    {recommendation.longevity}
                  </span>
                </div>

                <div className="flex items-center gap-3.5">
                  <img
                    src={recommendation.image}
                    alt={recommendation.nameEn}
                    className="w-20 h-20 rounded-xl object-cover border border-[#D4AF37]/40 shrink-0"
                  />
                  <div>
                    <span
                      className="text-[11px] font-extrabold"
                      style={{ color: goldHeadingColor }}
                    >
                      {recommendation.category}
                    </span>
                    <h3 className="text-base font-black leading-snug">
                      {recommendation.nameBn}
                    </h3>
                    <p className="text-[11px]" style={{ color: subTextColor }}>
                      {recommendation.nameEn}
                    </p>
                  </div>
                </div>

                <p
                  className="text-xs leading-relaxed p-3 rounded-xl border"
                  style={{
                    backgroundColor: isDark ? '#120E0A' : '#FAF5EB',
                    borderColor: isDark ? '#2E241A' : '#E5D8C3',
                  }}
                >
                  <strong style={{ color: goldHeadingColor }}>
                    কেন এটি আপনার জন্য সেরা:
                  </strong>{' '}
                  {recommendation.whyMatch}
                </p>

                {/* Note Breakdown */}
                <div
                  className="space-y-1.5 text-xs border-t border-b py-3"
                  style={{ borderColor: isDark ? '#2E241A' : '#E5D8C3' }}
                >
                  <div className="flex justify-between gap-2">
                    <span className="font-semibold" style={{ color: subTextColor }}>
                      Top Notes (প্রথম ছোঁয়া):
                    </span>
                    <span className="font-bold text-right">{recommendation.topNotes}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="font-semibold" style={{ color: subTextColor }}>
                      Heart Notes (মূল সুবাস):
                    </span>
                    <span className="font-bold text-right">{recommendation.heartNotes}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="font-semibold" style={{ color: subTextColor }}>
                      Base Notes (স্থায়ী ভিত্তি):
                    </span>
                    <span
                      className="font-extrabold text-right"
                      style={{ color: goldHeadingColor }}
                    >
                      {recommendation.baseNotes}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span
                      className="text-[11px] font-semibold block"
                      style={{ color: subTextColor }}
                    >
                      ফুল সাইজ প্যাক মূল্য:
                    </span>
                    <span
                      className="text-lg font-black"
                      style={{ color: goldHeadingColor }}
                    >
                      {recommendation.price}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={scrollToDiscoveryCod}
                    className="px-4 py-3 rounded-xl text-xs font-black text-[#0B0907] flex items-center gap-1.5 cursor-pointer transition hover:opacity-95"
                    style={{
                      background: 'linear-gradient(135deg, #D4AF37 0%, #F5E6C8 50%, #C59B27 100%)',
                    }}
                  >
                    <span>এটি অর্ডার করুন</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
