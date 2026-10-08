import React, { useState } from 'react';
import {
  Dumbbell,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  Layers,
  Award,
  ShoppingBag,
  FileText,
  Gauge,
  Scale,
  Activity,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface FitGhorHeroSpecsSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

interface SpecGridItem {
  id: string;
  gearNameBn: string;
  gearNameEn: string;
  maxLoadLimit: string;
  materialSpec: string;
  thicknessGauge: string;
  durabilityRating: string;
  safetyCert: string;
  highlightNote: string;
}

const WEIGHT_MATERIAL_SPECS_GRID: SpecGridItem[] = [
  {
    id: 'resistance_band_150',
    gearNameBn: '11-Piece Pro Resistance Band Set (১৫০ পাউন্ড সেট)',
    gearNameEn: '5 Stackable Tubes (10–50 LBS) + Steel Carabiners',
    maxLoadLimit: '150 LBS (৬৮ কেজি পর্যন্ত সম্মিলিত টান সহনশীল)',
    materialSpec: '১০০% ডাবল-ডিপড মালয়েশিয়ান প্রাকৃতিক ল্যাটেক্স (Snap-Resistant)',
    thicknessGauge: '4.5mm – 8.2mm Multi-Layer Tube Wall + Nylon Door Anchor',
    durabilityRating: '৫০,০০০+ স্ট্রেচ সাইকেল পরীক্ষিত (Anti-Snap Guarantee)',
    safetyCert: 'Solid CNC Zinc-Alloy Clip & Sweat-Proof Foam Handles',
    highlightNote: 'হঠাৎ ছিঁড়ে যাওয়ার ভয় নেই—ডোর অ্যাঙ্কর দিয়ে ঘরের দরজায় লাগিয়েই চেস্ট, ব্যাক ও বাইসেপস ওয়ার্কআউট করা যায়।',
  },
  {
    id: 'adjustable_dumbbell_24kg',
    gearNameBn: 'Quick-Lock Adjustable Dumbbell (২.৫ থেকে ২৪ কেজি)',
    gearNameEn: '15-in-1 Dial-Adjust Cast Iron Home Dumbbell',
    maxLoadLimit: '24 KG / 52.5 LBS (১৫টি আলাদা ডাম্বেলের সমান)',
    materialSpec: 'সলিড কাস্ট আয়রন প্লেট + থার্মোপ্লাস্টিক রাবার কোটিং (Floor-Safe)',
    thicknessGauge: '32mm Knurled Anti-Slip Steel Grip Handle + Dual Safety Lock',
    durabilityRating: '১০+ বছরের লাইফটাইম স্ট্রাকচারাল স্থায়িত্ব',
    safetyCert: 'Dual-Pin Interlocking Cradle (ওয়ান-হ্যান্ড ৩ সেকেন্ড ওয়েট চেঞ্জ)',
    highlightNote: 'ঘরের মেঝে বা টাইলসে দাগ ফেলে না এবং মাত্র ২ ফিট জায়গায় পুরো জিমের ১৫ জোড়া ডাম্বেলের কাজ করে।',
  },
  {
    id: 'acupressure_yoga_mat',
    gearNameBn: 'TPE Anti-Slip Acupressure & HIIT Yoga Mat',
    gearNameEn: 'High-Density Joint Cushioning Dual-Texture Mat',
    maxLoadLimit: '180 KG Impact Absorption (হাঁটু ও কোমরের জয়েন্ট প্রটেকশন)',
    materialSpec: 'Eco-Friendly Closed-Cell TPE + Lotus Acupressure Nodes',
    thicknessGauge: '8mm Extra-Thick High-Rebound Cushion (183cm x 61cm)',
    durabilityRating: 'টিয়ার-রেজিস্ট্যান্ট অ্যান্টি-স্লিপ ওয়েভ গ্রিপ (ঘামে পিছলে যায় না)',
    safetyCert: '100% PVC, Latex & Toxic Odor Free (নামাজ ও ইয়োগা ফ্রেন্ডলি)',
    highlightNote: 'প্ল্যাঙ্ক, পুশ-আপ, স্কোয়াট ও আকুপ্রেশার থেরাপির সময় হাঁটু বা কনুইতে কোনো ব্যথা হতে দেয় না।',
  },
  {
    id: 'neoprene_waist_trimmer',
    gearNameBn: 'Thermo-Core Sweat Waist Trimmer & Back Support Belt',
    gearNameEn: 'Contoured Neoprene Core Compression & Lumbar Belt',
    maxLoadLimit: 'কোমর ২৮ ইঞ্চি থেকে ৪৮ ইঞ্চি পর্যন্ত অ্যাডজাস্টেবল ডাবল ভেলক্রো',
    materialSpec: '100% Latex-Free Thermal Neoprene + 4 Flexible Acrylic Bones',
    thicknessGauge: '4.0mm Heat-Locking Core + Anti-Roll Grid Inner Lining',
    durabilityRating: '১০,০০০+ ভেলক্রো লক সাইকেল (ওয়ার্কআউটের সময় ভাঁজ হয় না)',
    safetyCert: 'Ergonomic Lumbar Spine Stabilizer (ডেস্ক জব কোমর ব্যথা রোধক)',
    highlightNote: 'পেটের অতিরিক্ত মেদ ঝরাতে কোর টেম্পারেচার বাড়ায় এবং ভারী লিফটিং বা দীর্ঘক্ষণ চেয়ারে বসার সময় মেরুদণ্ড সোজা রাখে।',
  },
  {
    id: 'smart_body_fat_scale',
    gearNameBn: 'Smart Bluetooth BIA Electronic Body Fat Scale',
    gearNameEn: '13-Metric Bio-Electrical Impedance Glass Analyzer',
    maxLoadLimit: '180 KG / 400 LBS (নির্ভুলতা: ±50 গ্রাম)',
    materialSpec: '6mm Tempered Anti-Shatter Glass + 4 High-Precision ITO Electrodes',
    thicknessGauge: 'Ultra-Slim 22mm Profile + Auto-Calibration G-Sensor',
    durabilityRating: '১০,০০০+ ওয়েট মেজারমেন্ট + iOS ও Android App Sync',
    safetyCert: 'Tracks Weight, Body Fat %, BMI, Muscle Mass, Visceral Fat & BMR',
    highlightNote: 'শুধু ওজন নয়—আপনার শরীরের চর্বি কমছে নাকি মাসল বাড়ছে তা প্রতি সপ্তাহে মোবাইলের অ্যাপে গ্রাফসহ দেখুন।',
  },
];

export const FitGhorHeroSpecsSection: React.FC<FitGhorHeroSpecsSectionProps> = ({
  title,
  subtitle,
  variant,
  isDark = false,
}) => {
  const [selectedSpecIdx, setSelectedSpecIdx] = useState<number>(0);

  const primaryTextColor = isDark ? '#F8FAFC' : '#0F172A';
  const subTextColor = isDark ? '#CBD5E1' : '#334155';
  const accentColor = '#F97316';

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="fitghor-hero-specs"
      className="relative overflow-hidden py-12 md:py-20 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: isDark ? '#0B0F17' : '#F8FAFC',
        color: primaryTextColor,
      }}
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* =============================================================== */}
        {/* PART 1: ENERGETIC HERO SECTION WITH 4G .WEBP PAYLOAD BADGE      */}
        {/* =============================================================== */}
        <div
          className={`grid grid-cols-1 ${
            variant === 'varient_2'
              ? 'max-w-4xl mx-auto text-center gap-10'
              : 'lg:grid-cols-12 gap-10 lg:gap-12 items-center'
          }`}
        >
          {/* Left 7 Columns: High-Impact Copywriting */}
          <div className={variant === 'varient_2' ? 'space-y-6' : 'lg:col-span-7 space-y-6'}>
            <div
              className={`inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-extrabold border ${
                variant === 'varient_2' ? 'mx-auto' : ''
              }`}
              style={{
                backgroundColor: isDark ? 'rgba(249, 115, 22, 0.14)' : '#FFF7ED',
                borderColor: '#F97316',
                color: isDark ? '#FB923C' : '#C2410C',
              }}
            >
              <Zap size={14} />
              <EditableText
                id="fitghor_hero_kicker"
                defaultText="ঢাকার ২ ঘণ্টার জ্যাম ও ২৪,০০০ টাকার জিম মেম্বারশিপকে বিদায় বলুন!"
              />
            </div>

            <h1
              className="text-3xl sm:text-5xl lg:text-[46px] font-black tracking-tight leading-[1.15]"
              style={{ color: primaryTextColor }}
            >
              <EditableText
                id="fitghor_hero_h1"
                defaultText={
                  title ||
                  'অফিস শেষে জ্যাম ঠেলে জিমে যাওয়ার দিন শেষ — নিজের বেডরুমেই গড়ে তুলুন কমপ্যাক্ট হোম জিম!'
                }
              />
            </h1>

            <p
              className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-medium"
              style={{ color: subTextColor }}
            >
              <EditableText
                id="fitghor_hero_sub"
                defaultText={
                  subtitle ||
                  'ব্যস্ত প্রফেশনাল ও ফিটনেস প্রেমীদের জন্য FitGhor নিয়ে এসেছে ১৫০ পাউন্ড রেজিস্ট্যান্স ব্যান্ড, অ্যাডজাস্টেবল ডাম্বেল, ওয়েস্ট ট্রিমার, আকুপ্রেশার ইয়োগা ম্যাট এবং স্মার্ট বডি ফ্যাট স্কেল। মাত্র ৩০ মিনিটে ঘরে বসেই মেদ ঝরান ও মাসল বিল্ড করুন—সাথে পান ফ্রি ৩০ দিনের ওয়ার্কআউট গাইড PDF!'
                }
              />
            </p>

            {/* 4 Key Value Proposition Bullets */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-left ${
                variant === 'varient_2' ? 'max-w-2xl mx-auto' : ''
              }`}
            >
              {[
                {
                  title: 'মাত্র ২x২ ফিট জায়গায় সম্পূর্ণ জিম',
                  desc: 'ভাড়া বাসা বা ছোট বেডরুমে খাটের নিচে বা আলমারির কোণায় সহজেই রাখা যায়',
                },
                {
                  title: '১০০% অ্যান্টি-স্ন্যাপ ল্যাটেক্স ও কাস্ট আয়রন',
                  desc: '১৫০ পাউন্ড টান সহনশীল ব্যান্ড এবং ফ্লোর-সেফ রাবার কোটেড ডাম্বেল',
                },
                {
                  title: 'ফ্রি ৩০ দিনের At-Home Workout PDF',
                  desc: 'অর্ডার কনফার্ম করলেই ইমেইল ও WhatsApp-এ ফ্রি এক্সপার্ট রুটিন আনলক',
                },
                {
                  title: 'Steadfast / Pathao / RedX ক্যাশ অন ডেলিভারি',
                  desc: 'পণ্য হাতে পেয়ে ওজন ও কোয়ালিটি চেক করে টাকা পরিশোধের সুবিধা',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border flex items-start gap-2.5"
                  style={{
                    backgroundColor: isDark ? '#111827' : '#FFFFFF',
                    borderColor: isDark ? '#1E293B' : '#E2E8F0',
                  }}
                >
                  <CheckCircle2
                    size={16}
                    className="shrink-0 mt-0.5"
                    style={{ color: accentColor }}
                  />
                  <div>
                    <div className="text-xs font-extrabold">{item.title}</div>
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
                onClick={() => scrollToSection('fitghor-bd-checkout')}
                className="px-6 py-4 rounded-xl text-xs sm:text-sm font-black text-white shadow-xl flex items-center gap-2.5 transition transform hover:-translate-y-0.5 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                }}
              >
                <ShoppingBag size={17} />
                <EditableText
                  id="fitghor_hero_cta_primary"
                  defaultText="হোম জিম কম্বো অর্ডার করুন — ৳১,৬৯০ থেকে শুরু"
                />
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('fitghor-free-workout-pdf')}
                className="px-5 py-4 rounded-xl text-xs sm:text-sm font-extrabold border flex items-center gap-2 transition hover:border-[#F97316] cursor-pointer"
                style={{
                  backgroundColor: isDark ? '#111827' : '#FFFFFF',
                  borderColor: isDark ? '#334155' : '#CBD5E1',
                  color: primaryTextColor,
                }}
              >
                <FileText size={16} className="text-[#10B981]" />
                <EditableText
                  id="fitghor_hero_cta_secondary"
                  defaultText="ফ্রি ৩০ দিনের ওয়ার্কআউট প্ল্যান PDF নিন"
                />
              </button>
            </div>

            {/* Trust Stats */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-bold">
              <div>
                <strong className="text-base font-black text-[#F97316]">২৪,৮০০+</strong> হোম জিম সেটআপ ডেলিভারি
              </div>
              <span>·</span>
              <div>
                <strong className="text-base font-black text-[#F97316]">৪.৯৫ ★</strong> ভেরিফায়েড ফিটনেস রিভিউ
              </div>
              <span>·</span>
              <div>
                <strong className="text-base font-black text-[#10B981]">১ বছর</strong> অফিসিয়াল ওয়ারেন্টি
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Ultra-Fast .WebP Hero Showcase Card (< 2MB 4G Spec) */}
          {variant !== 'varient_2' && (
            <div className="lg:col-span-5">
              <div
                className="rounded-2xl p-5 border relative overflow-hidden space-y-4 shadow-2xl"
                style={{
                  backgroundColor: isDark ? '#111827' : '#FFFFFF',
                  borderColor: isDark ? '#1E293B' : '#CBD5E1',
                }}
              >
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] border border-[#F97316]/30">
                  <picture>
                    <source
                      srcSet="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80&fm=webp"
                      type="image/webp"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80&fm=webp"
                      alt="FitGhor Compact At-Home Gym Equipment Set in WebP format"
                      loading="eager"
                      className="w-full h-full object-cover"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-black/25 to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-md text-[10px] font-black bg-[#F97316] text-white uppercase tracking-wider">
                      All-In-One Home Gym Kit
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-emerald-500 text-slate-950">
                      .WebP · 142 KB (4G Ready)
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[11px] uppercase tracking-widest text-amber-400 font-bold">
                      Zero Traffic · Zero Monthly Gym Fee
                    </p>
                    <h3 className="text-lg font-black">
                      150 LBS Resistance Bands + Adjustable Dumbbells + Smart Scale
                    </h3>
                  </div>
                </div>

                {/* Quick Gym vs FitGhor ROI Comparison */}
                <div
                  className="p-3.5 rounded-xl border space-y-2 text-xs"
                  style={{
                    backgroundColor: isDark ? '#0B0F17' : '#F8FAFC',
                    borderColor: isDark ? '#1E293B' : '#E2E8F0',
                  }}
                >
                  <div className="flex items-center justify-between font-extrabold">
                    <span className="text-[#F97316]">১ বছরের জিম খরচ বনাম FitGhor হোম জিম</span>
                    <span className="text-[#10B981]">সাশ্রয় ৳২২,০০০+/বছর</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                    <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
                      <div className="font-bold text-rose-500">সাধারণ কমার্শিয়াল জিম</div>
                      <div className="mt-0.5 opacity-85">
                        ৳২,৫০০/মাস ফি + রিকশা/সিএনজি ভাড়া ও জ্যামে প্রতিদিন ২ ঘণ্টা নষ্ট
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <div className="font-bold text-emerald-600 dark:text-emerald-400">
                        FitGhor হোম জিম সেটআপ
                      </div>
                      <div className="mt-0.5 opacity-85">
                        একবার কিনলে পরিবারের সবাই মিলে বছরের পর বছর ঘরেই ওয়ার্কআউট
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* =============================================================== */}
        {/* PART 2: MANDATORY WEIGHT CAPACITY & MATERIAL SPECS GRID         */}
        {/* =============================================================== */}
        <div
          id="fitghor-specs-grid"
          className="rounded-3xl p-6 sm:p-8 lg:p-10 border shadow-xl space-y-8"
          style={{
            backgroundColor: isDark ? '#111827' : '#FFFFFF',
            borderColor: isDark ? '#1E293B' : '#CBD5E1',
          }}
        >
          <div
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b pb-6"
            style={{ borderColor: isDark ? '#1E293B' : '#E2E8F0' }}
          >
            <div className="space-y-1.5 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#F97316]">
                <ShieldCheck size={15} />
                <span>Weight Capacity &amp; Material Specifications Grid · শতভাগ সেফটি ও ডিউরেবিলিটি</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">
                <EditableText
                  id="fitghor_specs_h2"
                  defaultText="সস্তা প্লাস্টিক বা ছিঁড়ে যাওয়া রাবার নয় — দেখুন আমাদের প্রতিটি ইকুইপমেন্টের ওজন সহনশীলতা ও ম্যাটেরিয়াল গ্রেড"
                />
              </h2>
              <p className="text-xs sm:text-sm font-medium" style={{ color: subTextColor }}>
                অনলাইনে ফিটনেস গিয়ার কেনার আগে সবচেয়ে বড় ভয় থাকে ব্যান্ড ছিঁড়ে যাওয়া বা ডাম্বেলের লক খুলে যাওয়া। আমাদের প্রতিটি গিয়ার ইন্ডাস্ট্রিয়াল লোড-টেস্টেড:
              </p>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-extrabold text-[#059669] dark:text-[#10B981] self-start">
              ✓ ১ বছরের ওয়ারেন্টি ও ল্যাব-টেস্টেড লোড লিমিট
            </div>
          </div>

          {/* 4 Icon Summary Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Gauge,
                label: 'সর্বোচ্চ লোড ক্যাপাসিটি',
                val: '150 LBS – 180 KG',
                sub: 'হেভি-ডিউটি স্টিল ও ন্যাচারাল ল্যাটেক্স',
              },
              {
                icon: Layers,
                label: 'ল্যাটেক্স ও ম্যাট থিকনেস',
                val: '8.2mm Tube / 8mm Mat',
                sub: 'ডাবল-লেয়ার অ্যান্টি-স্ন্যাপ প্রযুক্তি',
              },
              {
                icon: Activity,
                label: 'স্ট্রেচ ও লক সাইকেল টেস্ট',
                val: '50,000+ Cycles',
                sub: 'প্রতিদিন ব্যবহারেও ছিঁড়বে না বা ঢিলা হবে না',
              },
              {
                icon: Scale,
                label: 'ফ্লোর ও স্কিন সেফটি',
                val: '100% Floor-Safe TPE',
                sub: 'টাইলসে দাগ পড়ে না ও ঘামে পিছলে যায় না',
              },
            ].map((pillar, i) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={i}
                  className="p-4 rounded-2xl border flex items-start gap-3"
                  style={{
                    backgroundColor: isDark ? '#0B0F17' : '#F8FAFC',
                    borderColor: isDark ? '#1E293B' : '#E2E8F0',
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F97316]/15 text-[#F97316] flex items-center justify-center shrink-0">
                    <IconComp size={20} />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold" style={{ color: subTextColor }}>
                      {pillar.label}
                    </div>
                    <div className="text-base font-black text-[#F97316]">{pillar.val}</div>
                    <div className="text-[11px] font-medium mt-0.5" style={{ color: subTextColor }}>
                      {pillar.sub}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Spec Breakdown Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr
                  className="border-b"
                  style={{
                    backgroundColor: isDark ? '#0B0F17' : '#F1F5F9',
                    borderColor: isDark ? '#1E293B' : '#CBD5E1',
                  }}
                >
                  <th className="py-3.5 px-4 font-black">ইকুইপমেন্ট (Equipment)</th>
                  <th className="py-3.5 px-4 font-black text-[#F97316]">
                    সর্বোচ্চ লোড লিমিট (Max Load)
                  </th>
                  <th className="py-3.5 px-4 font-black">ম্যাটেরিয়াল ও মেটাল/ল্যাটেক্স গ্রেড</th>
                  <th className="py-3.5 px-4 font-black">থিকনেস ও ডাইমেনশন</th>
                  <th className="py-3.5 px-4 font-black text-[#059669] dark:text-[#10B981]">
                    ডিউরেবিলিটি রেটিং
                  </th>
                </tr>
              </thead>
              <tbody
                className="divide-y"
                style={{ borderColor: isDark ? '#1E293B' : '#E2E8F0' }}
              >
                {WEIGHT_MATERIAL_SPECS_GRID.map((row, idx) => {
                  const isSelected = selectedSpecIdx === idx;
                  return (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedSpecIdx(idx)}
                      className="cursor-pointer transition"
                      style={{
                        backgroundColor: isSelected
                          ? isDark
                            ? 'rgba(249, 115, 22, 0.1)'
                            : '#FFF7ED'
                          : 'transparent',
                      }}
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-black text-xs sm:text-sm">{row.gearNameBn}</div>
                        <div className="text-[11px] opacity-75">{row.gearNameEn}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-extrabold text-[#F97316]">
                        {row.maxLoadLimit}
                      </td>
                      <td className="py-3.5 px-4 font-semibold">{row.materialSpec}</td>
                      <td className="py-3.5 px-4 font-mono">{row.thicknessGauge}</td>
                      <td className="py-3.5 px-4 font-bold text-[#059669] dark:text-[#10B981]">
                        ✓ {row.durabilityRating}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Highlighted Safety Note Bar */}
          <div
            className="p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            style={{
              backgroundColor: isDark ? '#0B0F17' : '#FFF7ED',
              borderColor: '#F97316',
            }}
          >
            <div className="space-y-0.5">
              <div className="text-xs font-black text-[#F97316] uppercase tracking-wider">
                ইঞ্জিনিয়ারিং সেফটি নোট: {WEIGHT_MATERIAL_SPECS_GRID[selectedSpecIdx].gearNameBn}
              </div>
              <p className="text-xs font-semibold">
                {WEIGHT_MATERIAL_SPECS_GRID[selectedSpecIdx].highlightNote}
              </p>
            </div>
            <button
              type="button"
              onClick={() => scrollToSection('fitghor-bd-checkout')}
              className="px-4 py-2.5 rounded-xl bg-[#F97316] text-white text-xs font-black shrink-0 cursor-pointer hover:opacity-95"
            >
              এই গিয়ারটি অর্ডার করুন →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
