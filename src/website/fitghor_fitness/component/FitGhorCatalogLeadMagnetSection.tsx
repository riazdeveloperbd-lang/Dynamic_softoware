import React, { useState, useEffect } from 'react';
import {
  Dumbbell,
  FileText,
  CheckCircle2,
  ShoppingBag,
  ArrowRight,
  Download,
  Flame,
  Scale,
  HeartPulse,
  Sparkles,
  Eye,
  X,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface FitGhorCatalogLeadMagnetSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

type GearCategoryTab = 'all' | 'strength' | 'wellness_yoga' | 'trackers_scales';

interface FitnessGearProduct {
  id: string;
  category: GearCategoryTab;
  categoryBadge: string;
  nameBn: string;
  nameEn: string;
  tagline: string;
  loadSpec: string;
  materialBadge: string;
  regularPrice: string;
  offerPrice: string;
  webpImage: string;
  keyBenefits: string[];
}

const FITGHOR_PRODUCT_LINEUP: FitnessGearProduct[] = [
  {
    id: 'pro_resistance_bands_150',
    category: 'strength',
    categoryBadge: 'Strength · বেস্টসেলার হোম জিম প্যাক',
    nameBn: '11-Piece Pro Resistance Band Set (১৫০ পাউন্ড ফুল-বডি হোম জিম)',
    nameEn: '5 Stackable Latex Tubes (10–50 LBS) + Handles, Ankle Straps & Door Anchor',
    tagline: 'মাত্র ১টি ব্যাগে পুরো জিমের ৩০+ এক্সারসাইজ',
    loadSpec: 'Max Load: 150 LBS (68 KG)',
    materialBadge: '100% Malaysian Natural Latex',
    regularPrice: '৳২,২০০',
    offerPrice: '৳১,৪৯০',
    webpImage:
      'https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=800&q=80&fm=webp',
    keyBenefits: [
                  '৫টি কালার-কোডেড টিউব (10, 20, 30, 40, 50 LBS) একসাথে যুক্ত করে ১৫০ পাউন্ড পর্যন্ত ভারোত্তোলন',
      'ঘরের দরজায় ডোর অ্যাঙ্কর লাগিয়ে চেস্ট প্রেস, ল্যাট পুলডাউন, বাইসেপ কার্ল ও লেগ ওয়ার্কআউট',
      'অ্যান্টি-স্ন্যাপ ডাবল লেয়ার রাবার ও স্টিল ক্যারাবিনার ক্লিপ—ছিঁড়ে যাওয়ার ভয় নেই',
    ],
  },
  {
    id: 'adjustable_dumbbell_24kg',
    category: 'strength',
    categoryBadge: 'Strength · হেভি মাসল বিল্ডিং',
    nameBn: 'Quick-Dial Adjustable Dumbbell (২.৫ কেজি থেকে ২৪ কেজি — ১৫ ইন ১)',
    nameEn: '15-Weight Setting Dial-Lock Cast Iron Home Dumbbell',
    tagline: '৩ সেকেন্ডে ডায়াল ঘুরিয়ে ওজন পরিবর্তন করুন',
    loadSpec: 'Max Load: 24 KG (52.5 LBS)',
    materialBadge: 'Cast Iron + Floor-Safe Coating',
    regularPrice: '৳৯,৫০০',
    offerPrice: '৳৭,৪৯০',
    webpImage:
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80&fm=webp',
    keyBenefits: [
      '১টি ডাম্বেলের ভেতরেই ১৫টি আলাদা ওজনের সেটিংস (2.5kg থেকে 24kg পর্যন্ত)',
      'রাবার মোড়ানো প্লেট হওয়ায় বাসার টাইলস বা মার্বেল ফ্লোরে কোনো দাগ বা শব্দ হয় না',
      'ডুয়াল সেফটি লকিং মেকানিজম—ওয়ার্কআউটের সময় প্লেট খুলে পড়ার শূন্য ঝুঁকি',
    ],
  },
  {
    id: 'thermo_waist_trimmer_belt',
    category: 'wellness_yoga',
    categoryBadge: 'Wellness & Yoga · পেটের মেদ ও কোমর সাপোর্ট',
    nameBn: 'Thermo-Sweat Neoprene Waist Trimmer & Lumbar Support Belt',
    nameEn: 'Core Heat-Compression Belly Fat Burner & Posture Belt',
    tagline: 'ওয়ার্কআউটে ৩ গুণ বেশি ঘাম ও লাম্বার ব্যাক পেইন রিলিফ',
    loadSpec: 'Waist Size: 28" – 48" Adjustable',
    materialSpec: '4mm Latex-Free Neoprene',
    materialBadge: '4mm Thermal Neoprene + 4 Bones',
    regularPrice: '৳১,২৫০',
    offerPrice: '৳৭৯০',
    webpImage:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80&fm=webp',
    keyBenefits: [
      'কোর অ্যাবডোমিনাল হিট বৃদ্ধি করে পেটের একগুঁয়ে চর্বি ও ওয়াটার ওয়েট দ্রুত কমাতে সাহায্য করে',
      '৪টি ফ্লেক্সিবল অ্যাক্রিলিক বোন থাকায় দীর্ঘক্ষণ অফিসে বসে কাজ বা ডেডলিফটের সময় মেরুদণ্ড সোজা রাখে',
      'অ্যান্টি-স্লিপ ইনার গ্রিড লাইনিং—দৌড়ানো বা এক্সারসাইজের সময় ভাঁজ হয়ে উঠে যায় না',
    ],
  },
  {
    id: 'acupressure_tpe_yoga_mat',
    category: 'wellness_yoga',
    categoryBadge: 'Wellness & Yoga · জয়েন্ট কুশনিং ও স্ট্রেস রিলিফ',
    nameBn: '8mm Eco-TPE Anti-Slip Acupressure & HIIT Yoga Mat',
    nameEn: 'High-Density Joint Protection Yoga Mat with Acupressure Trigger Zone',
    tagline: 'হাঁটু ও কনুইয়ের শতভাগ সুরক্ষা + বডি অ্যালাইনমেন্ট লাইন',
    loadSpec: 'Impact Load: 180 KG Cushion',
    materialBadge: '8mm Closed-Cell Eco TPE',
    regularPrice: '৳১,৮৫০',
    offerPrice: '৳১,২৯০',
    webpImage:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80&fm=webp',
    keyBenefits: [
      'সাধারণ ৪ মিমি ম্যাটের চেয়ে দ্বিগুণ পুরু (8mm)—শক্ত মেঝেতে প্ল্যাঙ্ক বা ইয়োগা করতে হাঁটু ব্যথা হয় না',
      'লেজার-এনগ্রেভড বডি অ্যালাইনমেন্ট মার্কিং দেখে নিখুঁত পশ্চারে ঘরে বসেই ব্যায়াম করা যায়',
      'ওয়াটারপ্রুফ ক্লোজড-সেল সারফেস—ঘাম শুষে নেয় না এবং ভেজা কাপড় দিয়ে মুছলেই নতুনের মতো পরিষ্কার',
    ],
  },
  {
    id: 'smart_bluetooth_body_fat_scale',
    category: 'trackers_scales',
    categoryBadge: 'Trackers & Scales · ১৩টি বডি মেট্রিক ট্র্যাকার',
    nameBn: 'Smart Bluetooth BIA Electronic Body Fat & Muscle Scale',
    nameEn: '13-in-1 Digital Body Composition Analyzer with Mobile App Sync',
    tagline: 'ওজন, বডি ফ্যাট %, মাসল মাস, BMI ও BMR ট্র্যাক করুন মোবাইলে',
    loadSpec: 'Max Capacity: 180 KG (±50g)',
    materialBadge: '6mm Tempered Glass + 4 BIA Sensors',
    regularPrice: '৳২,৪০০',
    offerPrice: '৳১,৬৫০',
    webpImage:
      'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=800&q=80&fm=webp',
    keyBenefits: [
      'বায়ো-ইলেকট্রিক্যাল ইমপেডেন্স (BIA) প্রযুক্তিতে শরীরের ১৩টি ফিটনেস ইনডেক্স সরাসরি স্মার্টফোনে দেখায়',
      'পরিবারের আনলিমিটেড সদস্যের আলাদা প্রোফাইল ও সাপ্তাহিক ওজন কমার গ্রাফ সংরক্ষণ করে',
      '৬ মিমি টেম্পারড অ্যান্টি-শ্যাটার গ্লাস এবং এলইডি নাইট-ভিশন ডিসপ্লে',
    ],
  },
];

export const FitGhorCatalogLeadMagnetSection: React.FC<
  FitGhorCatalogLeadMagnetSectionProps
> = ({ title, subtitle, variant, isDark = false }) => {
  const [activeCategory, setActiveCategory] = useState<GearCategoryTab>('all');
  const [leadContact, setLeadContact] = useState<string>('');
  const [fitnessGoal, setFitnessGoal] = useState<'fat_loss' | 'muscle_tone' | 'back_pain'>(
    'fat_loss'
  );
  const [leadUnlocked, setLeadUnlocked] = useState<boolean>(false);
  const [activeModalProduct, setActiveModalProduct] = useState<FitnessGearProduct | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModalProduct) {
        setActiveModalProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalProduct]);

  const primaryTextColor = isDark ? '#F8FAFC' : '#0F172A';
  const subTextColor = isDark ? '#CBD5E1' : '#334155';

  const filteredGear =
    activeCategory === 'all'
      ? FITGHOR_PRODUCT_LINEUP
      : FITGHOR_PRODUCT_LINEUP.filter((item) => item.category === activeCategory);

  const scrollToCheckout = () => {
    setActiveModalProduct(null);
    const el = document.getElementById('fitghor-bd-checkout');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadContact.trim()) return;
    setLeadUnlocked(true);
  };

  return (
    <section
      id="fitghor-shop-all-gear"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t"
      style={{
        backgroundColor: isDark ? '#0F172A' : '#F1F5F9',
        borderColor: isDark ? '#1E293B' : '#E2E8F0',
        color: primaryTextColor,
      }}
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* =============================================================== */}
        {/* PART 1: SHOP ALL GEAR — 5 REQUIRED HOME FITNESS PRODUCTS        */}
        {/* =============================================================== */}
        <div className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#F97316]">
                <Dumbbell size={15} />
                <span>Shop All Gear · Strength, Wellness &amp; Yoga, Trackers &amp; Scales</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                <EditableText
                  id="fitghor_catalog_h2"
                  defaultText={
                    title ||
                    'আমাদের ৫টি সিগনেচার হোম জিম ও ওয়েলনেস গিয়ার — যা আপনার বেডরুমকে রূপান্তর করবে প্রাইভেট ফিটনেস স্টুডিওতে'
                  }
                />
              </h2>
              <p className="text-xs sm:text-sm font-medium" style={{ color: subTextColor }}>
                <EditableText
                  id="fitghor_catalog_sub"
                  defaultText={
                    subtitle ||
                    'প্রতিটি গিয়ার কমপ্যাক্ট, ফ্লোর-সেফ এবং বাংলাদেশের অ্যাপার্টমেন্টের জন্য বিশেষভাবে ডিজাইন করা। সাথে থাকছে ফ্রি ৩০ দিনের ওয়ার্কআউট রুটিন।'
                  }
                />
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Gear (সব ৫টি গিয়ার)' },
                { id: 'strength', label: 'Strength (Dumbbells & Bands)' },
                { id: 'wellness_yoga', label: 'Wellness & Yoga (Mats & Belts)' },
                { id: 'trackers_scales', label: 'Trackers & Scales (Smart Scale)' },
              ].map((tab) => {
                const active = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCategory(tab.id as GearCategoryTab)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                      active ? 'text-white shadow-md' : 'opacity-85 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor: active
                        ? '#F97316'
                        : isDark
                        ? '#1E293B'
                        : '#FFFFFF',
                      borderColor: active
                        ? '#EA580C'
                        : isDark
                        ? '#334155'
                        : '#CBD5E1',
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Cards Grid — Click ANY card to open Big Product Details Modal */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 ${
              variant === 'varient_3' ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
            } gap-6`}
          >
            {filteredGear.map((product) => (
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
                className="group rounded-2xl border overflow-hidden flex flex-col justify-between transition hover:border-[#F97316] hover:-translate-y-1.5 hover:shadow-2xl shadow-sm cursor-pointer text-left"
                style={{
                  backgroundColor: isDark ? '#111827' : '#FFFFFF',
                  borderColor: isDark ? '#1E293B' : '#CBD5E1',
                }}
              >
                <div>
                  {/* WebP Product Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={product.webpImage}
                      alt={product.nameEn}
                      loading="lazy"
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-black bg-[#F97316] text-white">
                        {product.categoryBadge}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black bg-black/80 text-white group-hover:bg-[#F97316] transition">
                        <Eye size={11} /> বিস্তারিত দেখুন
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white">
                      <span className="font-extrabold text-amber-400">
                        {product.materialBadge}
                      </span>
                      <span className="font-mono font-bold bg-black/75 px-2 py-0.5 rounded">
                        {product.loadSpec}
                      </span>
                    </div>
                  </div>

                  {/* Product Copy & Spec Bullets */}
                  <div className="p-5 space-y-3.5">
                    <div>
                      <h3 className="text-base sm:text-lg font-black leading-snug group-hover:text-[#F97316] transition">
                        {product.nameBn}
                      </h3>
                      <p className="text-[11px] font-semibold mt-0.5 text-[#F97316]">
                        {product.tagline}
                      </p>
                    </div>

                    <ul className="space-y-2 text-xs">
                      {product.keyBenefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2
                            size={14}
                            className="text-[#10B981] shrink-0 mt-0.5"
                          />
                          <span className="font-medium leading-snug" style={{ color: subTextColor }}>
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Price & Direct Order CTA */}
                <div
                  className="p-5 pt-3 border-t flex items-center justify-between gap-2"
                  style={{ borderColor: isDark ? '#1E293B' : '#E2E8F0' }}
                >
                  <div>
                    <span className="text-[11px] line-through opacity-60 block">
                      রেগুলার: {product.regularPrice}
                    </span>
                    <span className="text-lg font-black text-[#F97316]">
                      {product.offerPrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalProduct(product);
                      }}
                      className="px-3 py-2.5 rounded-xl text-xs font-extrabold border border-[#F97316]/40 text-[#F97316] flex items-center gap-1 cursor-pointer"
                    >
                      <Eye size={13} />
                      <span>Specs</span>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToCheckout();
                      }}
                      className="px-3.5 py-2.5 rounded-xl text-xs font-black text-white flex items-center gap-1.5 cursor-pointer transition hover:opacity-95"
                      style={{
                        background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
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

        {/* =============================================================== */}
        {/* PART 2: MANDATORY FREE EXERCISE GUIDE LEAD MAGNET PAGE SECTION  */}
        {/* =============================================================== */}
        <div
          id="fitghor-free-workout-pdf"
          className="rounded-3xl p-6 sm:p-10 border-2 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          style={{
            backgroundColor: isDark ? '#111827' : '#FFFFFF',
            borderColor: '#10B981',
          }}
        >
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/15 text-[#059669] dark:text-[#10B981] text-xs font-extrabold uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Free Workout Plans (Lead Magnet &amp; Order Bonus) · মূল্য ৳৯৯০ — আজ সম্পূর্ণ ফ্রি!</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black leading-tight">
              <EditableText
                id="fitghor_lead_magnet_h3"
                defaultText="বিনামূল্যে ডাউনলোড করুন: “৩০ দিনের ট্রাফিক-ফ্রি হোম ওয়ার্কআউট ও দেশি ডায়েট চার্ট PDF”"
              />
            </h3>

            <p className="text-xs sm:text-sm leading-relaxed font-medium" style={{ color: subTextColor }}>
              ইকুইপমেন্ট কেনার পর কীভাবে শুরু করবেন বুঝতে পারছেন না? আমাদের সার্টিফায়েড বাংলাদেশী ফিটনেস কোচদের তৈরি এই ৪২ পৃষ্ঠার সচিত্র গাইডে রয়েছে ভাত-মাছ-ডিম খেয়েই মেদ কমানোর ক্যালোরি চার্ট এবং প্রতিদিন ২০ মিনিটের হোম জিম রুটিন:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              {[
                'সপ্তাহ ১–৪: রেজিস্ট্যান্স ব্যান্ড ও ডাম্বেল দিয়ে ফুল-বডি ফ্যাট বার্নিং রুটিন',
                'ডেস্ক-জব প্রফেশনালদের ঘাড় ও কোমরের ব্যথা দূর করার ১০ মিনিটের ইয়োগা ফ্লো',
                'বাংলাদেশী ঘরোয়া খাবার (ভাত, রুটি, ডাল, ডিম, মুরগি) দিয়ে ১২০০–১৮০০ ক্যালোরি মিল প্ল্যান',
                'প্রতিটি এক্সারসাইজের সঠিক ফর্ম ও ভিডিও টিউটোরিয়াল QR কোড লিংক',
              ].map((point, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border flex items-start gap-2"
                  style={{
                    backgroundColor: isDark ? '#0B0F17' : '#F8FAFC',
                    borderColor: isDark ? '#1E293B' : '#E2E8F0',
                  }}
                >
                  <CheckCircle2 size={15} className="text-[#10B981] shrink-0 mt-0.5" />
                  <span className="font-semibold">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right 5 Columns: Lead Capture & Instant Digital Bonus Trigger */}
          <div className="lg:col-span-5">
            <div
              className="rounded-2xl p-6 border space-y-4"
              style={{
                backgroundColor: isDark ? '#0B0F17' : '#F8FAFC',
                borderColor: isDark ? '#1E293B' : '#CBD5E1',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#10B981]">
                  Instant WhatsApp &amp; Email Unlock
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-500">
                  PDF · 2.4 MB
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-black">
                আপনার ফ্রি ওয়ার্কআউট গাইডটি কোথায় পাঠাতে চান?
              </h4>

              {leadUnlocked ? (
                <div className="p-4 rounded-xl bg-emerald-950/90 border border-emerald-500/40 text-white space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-black text-sm">
                    <CheckCircle2 size={18} />
                    <span>অভিনন্দন! আপনার ফ্রি PDF গাইড আনলক হয়েছে</span>
                  </div>
                  <p className="text-xs opacity-90 leading-relaxed">
                    আমরা <strong>{leadContact}</strong> ঠিকানায় ৩০ দিনের হোম ওয়ার্কআউট রুটিন ও দেশি ডায়েট চার্টের ডাউনলোড লিংক পাঠিয়ে দিয়েছি। নিচে যেকোনো হোম জিম অর্ডার করলেই ফুল প্রো ভিডিও কোর্সটিও ফ্রি পাবেন!
                  </p>
                  <button
                    type="button"
                    onClick={scrollToCheckout}
                    className="w-full py-2.5 rounded-xl bg-[#F97316] text-white text-xs font-black cursor-pointer"
                  >
                    এখন হোম জিম গিয়ার অর্ডার করুন →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-3.5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold block">
                      আপনার প্রধান ফিটনেস লক্ষ্য কোনটি? (Select Goal)
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-[11px] font-bold">
                      {[
                        { id: 'fat_loss', label: 'পেটের মেদ কমানো' },
                        { id: 'muscle_tone', label: 'মাসল ও স্ট্রেংথ' },
                        { id: 'back_pain', label: 'কোমর ব্যথা মুক্তি' },
                      ].map((g) => (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() =>
                            setFitnessGoal(g.id as 'fat_loss' | 'muscle_tone' | 'back_pain')
                          }
                          className={`py-2 px-2 rounded-lg border cursor-pointer ${
                            fitnessGoal === g.id
                              ? 'border-[#10B981] bg-emerald-500/15 text-[#059669] dark:text-[#10B981]'
                              : 'opacity-75'
                          }`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold block">
                      আপনার WhatsApp নাম্বার অথবা ইমেইল দিন *
                    </label>
                    <input
                      type="text"
                      required
                      value={leadContact}
                      onChange={(e) => setLeadContact(e.target.value)}
                      placeholder="017XXXXXXXX বা name@email.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-[#10B981]"
                      style={{
                        backgroundColor: isDark ? '#111827' : '#FFFFFF',
                        borderColor: isDark ? '#334155' : '#CBD5E1',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-black text-slate-950 bg-[#10B981] hover:bg-emerald-400 transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Download size={16} />
                    <span>ফ্রি ৩০ দিনের ওয়ার্কআউট PDF আনলক করুন</span>
                  </button>

                  <p className="text-[11px] opacity-75 text-center">
                    ✓ যেকোনো গিয়ার অর্ডার করলেও চেকআউটে এই গাইডটি স্বয়ংক্রিয়ভাবে আনলক হবে
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BIG PRODUCT FULL DETAILS MODAL FOR FITGHOR */}
      {activeModalProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
          onClick={() => setActiveModalProduct(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-3xl border overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col"
            style={{
              backgroundColor: isDark ? '#111827' : '#FFFFFF',
              borderColor: isDark ? '#1E293B' : '#CBD5E1',
              color: primaryTextColor,
            }}
          >
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-black bg-[#F97316] text-white">
                  {activeModalProduct.categoryBadge}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-500/15 text-emerald-500">
                  {activeModalProduct.loadSpec}
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
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900">
                  <img
                    src={activeModalProduct.webpImage}
                    alt={activeModalProduct.nameEn}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                  <div className="font-black text-[#F97316]">মেটেরিয়াল ও লোড ক্যাপাসিটি:</div>
                  <div className="font-bold">• Material: {activeModalProduct.materialBadge}</div>
                  <div className="font-bold">• Tested Load: {activeModalProduct.loadSpec}</div>
                  <div className="text-emerald-500 font-bold">• ফ্রি ৩০ দিনের হোম ওয়ার্কআউট ও ডায়েট চার্ট PDF যুক্ত</div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black leading-snug">
                    {activeModalProduct.nameBn}
                  </h2>
                  <p className="text-xs font-semibold opacity-75 mt-1">
                    {activeModalProduct.nameEn}
                  </p>
                  <p className="text-xs font-extrabold text-[#F97316] mt-1">
                    {activeModalProduct.tagline}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs line-through opacity-50 block">
                      রেগুলার মূল্য: {activeModalProduct.regularPrice}
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-[#F97316]">
                      {activeModalProduct.offerPrice}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/15 text-emerald-500">
                    ✓ সারা বাংলাদেশে ক্যাশ অন ডেলিভারি
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-black">কেন এই হোম জিম গিয়ারটি সেরা:</div>
                  <ul className="space-y-2">
                    {activeModalProduct.keyBenefits.map((b, i) => (
                      <li key={i} className="text-xs flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 size={15} className="text-[#10B981] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={scrollToCheckout}
                    className="flex-1 py-3.5 rounded-xl text-xs sm:text-sm font-black text-white bg-[#F97316] hover:bg-[#EA580C] flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <ShoppingBag size={16} />
                    <span>অর্ডার করুন ({activeModalProduct.offerPrice}) + ফ্রি PDF গাইড</span>
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
