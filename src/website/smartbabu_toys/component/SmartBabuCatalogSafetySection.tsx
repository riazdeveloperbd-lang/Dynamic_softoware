import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  ShoppingBag,
  Sparkles,
  Award,
  Baby,
  BookOpen,
  HeartPulse,
  Shirt,
  Volume2,
  Eye,
  X,
  Package,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface SmartBabuCatalogSafetySectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

interface BabyProductItem {
  id: string;
  nameBn: string;
  nameEn: string;
  ageGroup: '0-12m' | '1-3y' | '3-6y';
  ageBadge: string;
  category: 'Educational Toys' | 'Feeding Essentials' | 'Baby Wearing & Gear' | 'Organic Clothing';
  priceBdt: number;
  oldPriceBdt: number;
  safetyBadges: string[];
  materialSpec: string;
  benefitPoints: string[];
  image: string;
  hasAudioPreview?: boolean;
}

const SMARTBABU_PRODUCTS: BabyProductItem[] = [
  {
    id: 'sb_talking_book',
    nameBn: '৩-ইন-১ বাংলা, ইংরেজি ও আরবি রিকার্জেবল টকিং অডিও বুক (২৮ পৃষ্ঠা)',
    nameEn: 'Interactive Bangla/English/Arabic Talking Audio Book + Magic Pen',
    ageGroup: '1-3y',
    ageBadge: '১–৩ বছর ও ৩–৬ বছর',
    category: 'Educational Toys',
    priceBdt: 1390,
    oldPriceBdt: 1850,
    safetyBadges: ['100% BPA Free', 'Waterproof Tear-Proof Pages', 'Rounded Safe Corners'],
    materialSpec: 'Non-Toxic Soy Ink + Waterproof Laminated PP Pages + USB Type-C Rechargeable Battery',
    benefitPoints: [
      'আঙুল দিয়ে স্পর্শ করলেই শুদ্ধ বাংলা স্বরবর্ণ, ব্যঞ্জনবর্ণ, ইংরেজি ও আরবি হরফ উচ্চারণ করে',
      'মোবাইল কার্টুন ছাড়াই বাবুর কথা বলা (Speech Therapy) ও শব্দভাণ্ডার দ্রুত বৃদ্ধি করে',
      'রিয়েল অ্যানিমেল সাউন্ড, ছড়া, নামতা, ১০টি মাসনুন দোয়া এবং কুইজ গেম মোড যুক্ত',
    ],
    image:
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
    hasAudioPreview: true,
  },
  {
    id: 'sb_montessori_puzzle',
    nameBn: 'মন্টেসরি ৬-ইন-১ ন্যাচারাল কাঠের পাজল ও ম্যাগনেটিক ফিশিং বোর্ড',
    nameEn: 'Montessori 6-in-1 Natural Beechwood Puzzle & Shape Sorter Set',
    ageGroup: '1-3y',
    ageBadge: '১–৩ বছর ও ৩–৬ বছর',
    category: 'Educational Toys',
    priceBdt: 1250,
    oldPriceBdt: 1690,
    safetyBadges: ['Child-Safe Non-Toxic Paint', 'Splinter-Free Polished Wood', 'Choke-Safe Size'],
    materialSpec: '100% Natural New Zealand Pine & Beechwood + Food-Grade Water-Based Paint',
    benefitPoints: [
      'কোনো ধারালো কোণা নেই (360° Smooth Chamfered Edges) — বাবুর কোমল হাতে আঘাত লাগে না',
      'ফুড-গ্রেড ওয়াটার-বেসড রঙ ব্যবহৃত, তাই বাবু মুখে দিলেও কোনো ক্ষতিকর কেমিক্যালের ভয় নেই',
      'হ্যান্ড-আই কোঅর্ডিনেশন, রঙ চেনা, সংখ্যা গণনা ও ধৈর্য শক্তি বাড়াতে সাহায্য করে',
    ],
    image:
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sb_anticolic_bottle',
    nameBn: 'পেডিয়াট্রিক অ্যান্টি-কলিক PPSU ফিডিং বোতল কমম্বো (২৪০ মিলি + ১৬০ মিলি)',
    nameEn: 'Medical-Grade PPSU Anti-Colic Wide-Neck Feeding Bottle Twin Pack',
    ageGroup: '0-12m',
    ageBadge: '০–১২ মাস (Infants)',
    category: 'Feeding Essentials',
    priceBdt: 1190,
    oldPriceBdt: 1550,
    safetyBadges: ['100% BPA & BPS Free', 'FDA Food-Grade Silicone', '180°C Heat Resistant'],
    materialSpec: 'German BASF Medical-Grade PPSU + Liquid Silicone Breast-Feel Nipple',
    benefitPoints: [
      'ডাবল অ্যান্টি-কলিক ভেন্ট ভালভ দুধের সাথে বাতাস পেটে ঢুকতে দেয় না, ফলে গ্যাস ও কান্না কমে',
      'মায়ের বুকের আদলে তৈরি নরম লিকুইড সিলিকন নিপল — বাবু সহজেই ফিডিং গ্রহণ করে',
      'ফুটন্ত পানিতে বা স্টিম স্টেরিলাইজারে ১৮০°C তাপমাত্রায় জীবাণুমুক্ত করলেও গলে না বা গন্ধ হয় না',
    ],
    image:
      'https://images.unsplash.com/photo-1584839404042-8bc21d240e91?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sb_baby_carrier',
    nameBn: '৪-ইন-১ এরগোনমিক হিপ-হেলদি বেবি ক্যারিয়ার (ব্রিদেবল কটন মেশ)',
    nameEn: '4-in-1 Ergonomic M-Position Breathable Baby Carrier with Hip Seat',
    ageGroup: '0-12m',
    ageBadge: '০–২৪ মাস (3.5 – 20 kg)',
    category: 'Baby Wearing & Gear',
    priceBdt: 1850,
    oldPriceBdt: 2450,
    safetyBadges: ['Pediatrician Recommended', 'IHDI Hip-Healthy M-Shape', '20kg Load Tested'],
    materialSpec: '3D Air-Mesh Combed Cotton + High-Density EPP Cushion Hip Seat + Safety Buckles',
    benefitPoints: [
      'আন্তর্জাতিক Hip Dysplasia স্ট্যান্ডার্ড অনুযায়ী বাবুর পা সবসময় নিরাপদ "M" পজিশনে থাকে',
      'চওড়া প্যাডেড শোল্ডার ও ওয়েস্ট বেল্ট মা-বাবার কোমর ও কাঁধের ব্যথা ৭০% পর্যন্ত কমিয়ে দেয়',
      'বাংলাদেশের গরমের আবহাওয়ার উপযোগী ৩ডি এয়ার-মেশ ফেব্রিক — বাবু ঘামে না',
    ],
    image:
      'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sb_organic_clothes',
    nameBn: '১০০% অর্গানিক মসলিন কটন নিউবর্ন ও টডলার ৫-পিস গিফট সেট',
    nameEn: '5-Piece 100% GOTS Organic Mulmul Cotton Romper, Bib & Swaddle Set',
    ageGroup: '0-12m',
    ageBadge: '০–১২ মাস ও ১–৩ বছর',
    category: 'Organic Clothing',
    priceBdt: 1290,
    oldPriceBdt: 1750,
    safetyBadges: ['GOTS Organic Cotton', 'Azo-Free Natural Dye', 'Hypoallergenic Soft'],
    materialSpec: '100% Double-Gauze Organic Mulmul Cotton + Nickel-Free Snap Buttons',
    benefitPoints: [
      'ফরমালডিহাইড ও কৃত্রিম ব্লিচ মুক্ত ১০০% খাঁটি মসলিন সুতি — নবজাতকের র‍্যাশ বা অ্যালার্জি হয় না',
      'ধোয়ার পর আরও নরম হয় এবং গরমে বাবুর শরীর ঠান্ডা ও আরামদায়ক রাখে',
      'নিকেল-ফ্রি স্ন্যাপ বাটন থাকায় ডায়াপার পরিবর্তন করা অত্যন্ত সহজ',
    ],
    image:
      'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sb_preschool_stem_kit',
    nameBn: 'প্রি-স্কুল জিনিয়াস কম্বো (ম্যাজিক রাইটিং ৪-বুক সেট + উডেন ম্যাথ বোর্ড)',
    nameEn: 'Preschool Genius STEM Bundle (100-Piece Math Board + 4 Magic Books)',
    ageGroup: '3-6y',
    ageBadge: '৩–৬ বছর (Preschoolers)',
    category: 'Educational Toys',
    priceBdt: 1590,
    oldPriceBdt: 2150,
    safetyBadges: ['100% BPA Free', 'Plant-Based Magic Ink', 'Montessori Certified'],
    materialSpec: 'Natural Basswood Board + 3D Grooved Cardstock + Silicone Pen Grip Trainer',
    benefitPoints: [
      'খাঁজকাটা ম্যাজিক বইয়ে লেখার ১৫ মিনিট পর কালি নিজে থেকেই মিলিয়ে যায় — বারবার অনুশীলন করা যায়',
      'সিলিকন পেন গ্রিপার বাবুর আঙুলে সঠিক পেন্সিল ধরার অভ্যাস গড়ে তোলে',
      'যোগ-বিয়োগ, ঘড়ির সময় দেখা এবং ইংরেজি-বাংলা-গণিত হাতের লেখা শেখার পূর্ণাঙ্গ প্রি-স্কুল প্যাক',
    ],
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80',
  },
];

export const SmartBabuCatalogSafetySection: React.FC<SmartBabuCatalogSafetySectionProps> = ({
  title,
  subtitle,
  isDark = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAgeFilter, setSelectedAgeFilter] = useState<'all' | '0-12m' | '1-3y' | '3-6y'>('all');
  const [addedToastProduct, setAddedToastProduct] = useState<string | null>(null);
  const [activeModalProduct, setActiveModalProduct] = useState<BabyProductItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModalProduct) {
        setActiveModalProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalProduct]);

  const filteredProducts = SMARTBABU_PRODUCTS.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesAge = selectedAgeFilter === 'all' || p.ageGroup === selectedAgeFilter;
    return matchesCategory && matchesAge;
  });

  const handleSelectForOrder = (productName: string) => {
    setActiveModalProduct(null);
    setAddedToastProduct(productName);
    setTimeout(() => setAddedToastProduct(null), 2800);
    const el = document.getElementById('smartbabu-gift-checkout');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="smartbabu-catalog-safety"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t"
      style={{
        backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
        borderColor: isDark ? '#1E293B' : '#E2E8F0',
        color: isDark ? '#F8FAFC' : '#0F172A',
      }}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* ================================================================= */}
        {/* PART 1: CHILD SAFETY & NON-TOXIC CERTIFICATION CALLOUT            */}
        {/* ================================================================= */}
        <div
          id="smartbabu-safety-badges"
          className="rounded-3xl border-2 p-6 sm:p-8 lg:p-10 space-y-8"
          style={{
            backgroundColor: isDark ? '#0B131E' : '#FFFDF7',
            borderColor: isDark ? '#0D9488' : '#99F6E4',
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-teal-500/15 text-teal-700 dark:text-teal-300">
                <ShieldCheck size={15} />
                <span>Safety &amp; Non-Toxic Guarantee (সোনামণির নিরাপত্তায় জিরো আপস)</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-black tracking-tight"
                style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}
              >
                কেন সাধারণ সস্তা প্লাস্টিকের খেলনা বাবুর জন্য ঝুঁকিপূর্ণ এবং স্মার্টবাবু ১০০% নিরাপদ?
              </h2>
              <p
                className="text-xs sm:text-sm leading-relaxed"
                style={{ color: isDark ? '#94A3B8' : '#475569' }}
              >
                শিশুরা যেকোনো খেলনা হাতে পেলেই মুখে দেয় (Mouthing Stage)। লোকাল মার্কেটের রিসাইকেলড প্লাস্টিক ও সিসাযুক্ত (Lead Paint) খেলনা শিশুর পেটের পীড়া ও হরমোনাল ক্ষতির কারণ হতে পারে। আমাদের প্রতিটি পণ্য আন্তর্জাতিক শিশু-নিরাপত্তা মানদণ্ডে পরীক্ষিত:
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3 px-4 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
              <Award size={28} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs font-black text-emerald-700 dark:text-emerald-300">
                  4-Stage Safety Checked
                </div>
                <div className="text-[11px] opacity-80">
                  EN71 · ASTM F963 · FDA Food-Grade
                </div>
              </div>
            </div>
          </div>

          {/* 4 Vector Trust Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                badge: '100% BPA, BPS & Phthalate Free',
                titleBn: '১০০% বিপিএ ও বিষাক্ত কেমিক্যাল মুক্ত',
                desc: 'আমাদের ফিডিং বোতল ও টিদার জার্মান মেডিকেল-গ্রেড PPSU ও ফুড-গ্রেড সিলিকনে তৈরি। ফুটন্ত পানিতেও কোনো ক্ষতিকর কণা নির্গত হয় না।',
              },
              {
                badge: 'Child-Safe Non-Toxic Water Paint',
                titleBn: 'ফুড-গ্রেড ওয়াটার-বেসড রঙ (মুখে দিলেও নিরাপদ)',
                desc: 'কাঠের মন্টেসরি পাজলগুলোতে সিসামুক্ত (Lead-Free) প্রাকৃতিক ওয়াটার-বেসড ডাই ব্যবহার করা হয়, যা কোনো গন্ধ বা ত্বকের অ্যালার্জি তৈরি করে না।',
              },
              {
                badge: '360° Rounded & Choke-Safe Design',
                titleBn: 'ধারালো কোণাবিহীন ও গলায় আটকে যাওয়া রোধক সাইজ',
                desc: 'প্রতিটি কাঠের ব্লক লেজার-পলিশড ও গোলাকার। আন্তর্জাতিক Choke-Tube টেস্ট অনুযায়ী ৩ বছরের ছোট বাবুর গলায় আটকানোর কোনো ঝুঁকি নেই।',
              },
              {
                badge: 'Pediatrician & Montessori Approved',
                titleBn: 'শিশু বিশেষজ্ঞ ও মন্টেসরি শিক্ষকদের অনুমোদিত',
                desc: 'শিশুর বয়স অনুযায়ী মস্তিষ্কের নিউরন সংযোগ, কথা বলা এবং মেরুদণ্ডের সঠিক গঠনের (M-Position) কথা মাথায় রেখে ডিজাইনকৃত।',
              },
            ].map((cert) => (
              <div
                key={cert.badge}
                className="p-5 rounded-2xl border space-y-2.5"
                style={{
                  backgroundColor: isDark ? '#131C2E' : '#FFFFFF',
                  borderColor: isDark ? '#1E293B' : '#E2E8F0',
                }}
              >
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-500/10 text-[#0D9488] text-[10px] font-black uppercase tracking-wider">
                  <ShieldCheck size={13} />
                  <span>{cert.badge}</span>
                </div>
                <h3
                  className="text-sm font-black"
                  style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}
                >
                  {cert.titleBn}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: isDark ? '#94A3B8' : '#475569' }}
                >
                  {cert.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* PART 2: SHOP BY CATEGORY & AGE PRODUCT CATALOG                    */}
        {/* ================================================================= */}
        <div className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#EA580C]">
                Shop by Category &amp; Age (আমাদের বেস্ট-সেলিং কালেকশন)
              </span>
              <h2
                className="text-2xl sm:text-3xl font-black tracking-tight"
                style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}
              >
                <EditableText
                  id="smartbabu_catalog_h2"
                  defaultText={
                    title ||
                    'সোনামণির মেধা বিকাশ ও নিরাপদ যত্নের ৬টি সিগনেচার প্রোডাক্ট — ১০০% নন-টক্সিক গ্যারান্টি'
                  }
                />
              </h2>
              <p
                className="text-xs sm:text-sm"
                style={{ color: isDark ? '#94A3B8' : '#475569' }}
              >
                <EditableText
                  id="smartbabu_catalog_sub"
                  defaultText={
                    subtitle ||
                    'প্রতিটি কার্ডে রয়েছে সেফটি ব্যাজ (100% BPA Free / Non-Toxic Paint) এবং বয়স অনুযায়ী উপকারিতা।'
                  }
                />
              </p>
            </div>

            {/* Category + Age Filter Bar */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'All', label: 'সব প্রোডাক্ট (All)', icon: <Sparkles size={13} /> },
                { id: 'Educational Toys', label: 'Educational Toys', icon: <BookOpen size={13} /> },
                { id: 'Feeding Essentials', label: 'Feeding Essentials', icon: <Baby size={13} /> },
                { id: 'Baby Wearing & Gear', label: 'Baby Carrier & Gear', icon: <HeartPulse size={13} /> },
                { id: 'Organic Clothing', label: 'Organic Clothing', icon: <Shirt size={13} /> },
              ].map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 border transition cursor-pointer ${
                      active
                        ? 'bg-[#0D9488] text-white border-[#0D9488] shadow-xs'
                        : isDark
                        ? 'bg-[#131C2E] text-slate-300 border-slate-800 hover:border-teal-500/50'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#0D9488]'
                    }`}
                  >
                    {cat.icon}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Age Filter Sub-Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold mr-1 opacity-75">বয়স ফিল্টার:</span>
            {[
              { id: 'all' as const, label: 'সব বয়স (0–6 Years)' },
              { id: '0-12m' as const, label: '০–১২ মাস (Infants)' },
              { id: '1-3y' as const, label: '১–৩ বছর (Toddlers)' },
              { id: '3-6y' as const, label: '৩–৬ বছর (Preschoolers)' },
            ].map((age) => {
              const active = selectedAgeFilter === age.id;
              return (
                <button
                  key={age.id}
                  type="button"
                  onClick={() => setSelectedAgeFilter(age.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold border transition cursor-pointer ${
                    active
                      ? 'bg-[#F97316] text-white border-[#F97316]'
                      : isDark
                      ? 'bg-slate-900 border-slate-800 text-slate-300'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  {age.label}
                </button>
              );
            })}
          </div>

          {addedToastProduct && (
            <div className="p-3.5 rounded-2xl bg-teal-500/15 border border-teal-500/30 text-xs font-extrabold text-teal-800 dark:text-teal-200 flex items-center gap-2">
              <CheckCircle2 size={15} className="text-[#0D9488]" />
              <span>নির্বাচিত হয়েছে: “{addedToastProduct}” — নিচে গিফট র‍্যাপ বা ক্যাশ অন ডেলিভারি কনফার্ম করুন।</span>
            </div>
          )}

          {/* Product Grid — Click ANY card to open Big Product Full Details Modal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                role="button"
                tabIndex={0}
                onClick={() => setActiveModalProduct(product)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveModalProduct(product);
                  }
                }}
                className="group rounded-3xl border overflow-hidden flex flex-col justify-between transition-all hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer text-left"
                style={{
                  backgroundColor: isDark ? '#131C2E' : '#FFFFFF',
                  borderColor: isDark ? '#1E293B' : '#E2E8F0',
                }}
              >
                <div>
                  {/* Product Image & Age Badge */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img
                      src={product.image}
                      alt={product.nameBn}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-[#0D9488] text-white shadow-xs">
                        বয়স: {product.ageBadge}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-slate-900/80 text-white backdrop-blur-xs">
                        {product.category}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black bg-slate-950/80 text-white group-hover:bg-[#0D9488] transition">
                        <Eye size={12} /> বিস্তারিত দেখুন
                      </span>
                    </div>

                    {product.hasAudioPreview && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const el = document.getElementById('smartbabu-audio-preview');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-[#F97316] text-white text-[11px] font-black shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        <Volume2 size={13} />
                        <span>Listen Audio Preview</span>
                      </button>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3.5">
                    {/* Child Safety & Trust Badges directly above title/CTA */}
                    <div className="flex flex-wrap gap-1.5">
                      {product.safetyBadges.map((b) => (
                        <span
                          key={b}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-500/12 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25"
                        >
                          <ShieldCheck size={11} />
                          {b}
                        </span>
                      ))}
                    </div>

                    <div>
                      <h3
                        className="text-base font-black leading-snug group-hover:text-[#0D9488] transition"
                        style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}
                      >
                        {product.nameBn}
                      </h3>
                      <p className="text-[11px] font-semibold opacity-65 mt-0.5">
                        {product.nameEn}
                      </p>
                    </div>

                    <div
                      className="p-2.5 rounded-xl text-[11px] font-medium border"
                      style={{
                        backgroundColor: isDark ? '#0F172A' : '#F8FAFC',
                        borderColor: isDark ? '#1E293B' : '#E2E8F0',
                        color: isDark ? '#CBD5E1' : '#334155',
                      }}
                    >
                      <strong className="text-[#0D9488]">মেটেরিয়াল:</strong> {product.materialSpec}
                    </div>

                    <ul className="space-y-1.5">
                      {product.benefitPoints.map((pt) => (
                        <li
                          key={pt}
                          className="text-xs flex items-start gap-2 leading-snug"
                          style={{ color: isDark ? '#CBD5E1' : '#334155' }}
                        >
                          <CheckCircle2
                            size={14}
                            className="text-[#0D9488] shrink-0 mt-0.5"
                          />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Price & Add to Cart Footer with Safety Guarantee */}
                <div className="p-5 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-[#0D9488] dark:text-teal-400">
                        ৳{product.priceBdt.toLocaleString('bn-BD')}
                      </span>
                      <span className="text-xs line-through opacity-50 ml-2">
                        ৳{product.oldPriceBdt.toLocaleString('bn-BD')}
                      </span>
                    </div>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300">
                      ✓ ক্যাশ অন ডেলিভারি
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalProduct(product);
                      }}
                      className="py-2.5 px-3 rounded-xl text-xs font-extrabold border border-teal-500/40 text-[#0D9488] dark:text-teal-300 flex items-center justify-center gap-1 hover:bg-teal-500/10 cursor-pointer"
                    >
                      <Eye size={13} />
                      <span>বিস্তারিত দেখুন</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectForOrder(product.nameBn);
                      }}
                      className="py-2.5 px-3 rounded-xl text-xs font-black text-white shadow-sm flex items-center justify-center gap-1.5 transition hover:opacity-95 cursor-pointer"
                      style={{
                        background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
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
      </div>

      {/* BIG PRODUCT FULL DETAILS MODAL FOR SMARTBABU */}
      {activeModalProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
          onClick={() => setActiveModalProduct(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-3xl border overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col"
            style={{
              backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
              borderColor: isDark ? '#1E293B' : '#E2E8F0',
              color: isDark ? '#F8FAFC' : '#0F172A',
            }}
          >
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-black bg-[#0D9488] text-white">
                  বয়স: {activeModalProduct.ageBadge}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                  100% BPA-Free &amp; Child-Safe Certified
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalProduct(null)}
                className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-rose-500 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-4">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <img
                    src={activeModalProduct.image}
                    alt={activeModalProduct.nameBn}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 space-y-2">
                  <div className="text-xs font-black text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                    <ShieldCheck size={15} /> ৪-ধাপে পরীক্ষিত চাইল্ড সেফটি সার্টিফিকেশন:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalProduct.safetyBadges.map((b) => (
                      <span
                        key={b}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/15 text-emerald-800 dark:text-emerald-200"
                      >
                        ✓ {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#F97316]">
                    {activeModalProduct.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black leading-snug mt-0.5">
                    {activeModalProduct.nameBn}
                  </h2>
                  <p className="text-xs font-semibold opacity-70 mt-0.5">
                    {activeModalProduct.nameEn}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs line-through opacity-50 block">
                      রেগুলার মূল্য: ৳{activeModalProduct.oldPriceBdt.toLocaleString('bn-BD')}
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-[#0D9488] dark:text-teal-400">
                      ৳{activeModalProduct.priceBdt.toLocaleString('bn-BD')}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/15 text-amber-700 dark:text-amber-300">
                    ✓ ডেলিভারি ম্যানের সামনে দেখে পেমেন্ট
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                  <div className="font-black text-[#0D9488] flex items-center gap-1.5">
                    <Package size={14} /> মেটেরিয়াল ও বিল্ড স্পেসিফিকেশন:
                  </div>
                  <p className="font-semibold opacity-90">{activeModalProduct.materialSpec}</p>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-black">বাবুর মেধা বিকাশ ও উপকারিতা:</div>
                  <ul className="space-y-2">
                    {activeModalProduct.benefitPoints.map((pt) => (
                      <li key={pt} className="text-xs flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 size={15} className="text-[#0D9488] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleSelectForOrder(activeModalProduct.nameBn)}
                    className="flex-1 py-3.5 rounded-xl text-xs sm:text-sm font-black text-white bg-[#0D9488] hover:bg-[#0F766E] flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <ShoppingBag size={16} />
                    <span>এই প্রোডাক্টটি অর্ডার করুন — ৳{activeModalProduct.priceBdt.toLocaleString('bn-BD')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModalProduct(null)}
                    className="px-4 py-3.5 rounded-xl text-xs font-extrabold border border-slate-300 dark:border-slate-700 cursor-pointer"
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
