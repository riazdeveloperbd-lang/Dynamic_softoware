import React, { useState, useEffect } from 'react';
import {
  Leaf,
  ShieldCheck,
  Clock,
  Truck,
  Sparkles,
  CheckCircle2,
  Award,
  Flame,
  ArrowRight,
  MapPin,
  FileCheck2,
  ShoppingBag,
} from 'lucide-react';
import {
  EditableText,
  EditableButton,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface OrganicFruitsHeroHarvestSectionProps {
  title: string;
  subtitle: string;
  variant: DoctorVariantId;
  primaryColor: string;
  isDark?: boolean;
}

interface OrchardHighlight {
  id: string;
  banglaName: string;
  englishName: string;
  region: string;
  harvestWindow: string;
  brixSweetness: string;
  pricePerKg: number;
  minBoxKg: number;
  badge: string;
  image: string;
}

const ORCHARD_HIGHLIGHTS: OrchardHighlight[] = [
  {
    id: 'himsagar',
    banglaName: 'ক্ষীরশাপাত / হিমসাগর (Himsagar Royale)',
    englishName: 'Chapainawabganj GI-Tagged Himsagar',
    region: 'শিবগঞ্জ, চাঁপাইনবাবগঞ্জ (Shibganj Orchard #14)',
    harvestWindow: '২৫ মে – ২০ জুন (Peak Tree-Ripened Batch)',
    brixSweetness: '22.4° Brix (Zero Fiber • 100% Pulp)',
    pricePerKg: 145,
    minBoxKg: 12,
    badge: 'GI Tagged • Best Seller',
    image:
      'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'litchi',
    banglaName: 'দিনাজপুরের বেদানা লিচু (Dinajpur Bedana Litchi)',
    englishName: 'Biral Hand-Picked Bedana Litchi',
    region: 'বিরল, দিনাজপুর (Biral Heritage Orchard)',
    harvestWindow: '১৫ মে – ১০ জুন (24-Hr Cold Chain Dispatch)',
    brixSweetness: '20.8° Brix (Tiny Seed • Juicy Aril)',
    pricePerKg: 480,
    minBoxKg: 5,
    badge: 'Limited 14-Day Harvest',
    image:
      'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'patali_gur',
    banglaName: 'নলেন পাটালি ও ঝোলা খেজুরের গুড় (Pure Date Molasses)',
    englishName: 'Jashore Authentic Wood-Fired Date Jaggery',
    region: 'চৌগাছা, যশোর (Chaugachha Gachhi Collective)',
    harvestWindow: 'শীতকালীন সংরক্ষিত ও ফ্রেশ ব্যাচ (Zero Sugar Adulteration)',
    brixSweetness: '100% Pure Sap (No Dalda / No Hydrose)',
    pricePerKg: 520,
    minBoxKg: 2,
    badge: '0% Added Sugar • Lab Certified',
    image:
      'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=1000&q=85',
  },
];

export const OrganicFruitsHeroHarvestSection: React.FC<
  OrganicFruitsHeroHarvestSectionProps
> = ({ title, subtitle, variant }) => {
  const [activeHighlight, setActiveHighlight] = useState<OrchardHighlight>(
    ORCHARD_HIGHLIGHTS[0]
  );
  const [selectedBatchDay, setSelectedBatchDay] = useState<
    'sunday_batch' | 'wednesday_batch'
  >('sunday_batch');

  // Live countdown timer to Sunday 6:00 AM harvest cut-off
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 11,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { days: 2, hours: 11, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToAndPrefillOrder = (itemName: string, defaultKg: number, pricePerKg: number) => {
    window.dispatchEvent(
      new CustomEvent('organic:select-product', {
        detail: {
          productName: itemName,
          kgQty: defaultKg,
          unitPrice: pricePerKg,
        },
      })
    );
    const el = document.getElementById('organic-cod-order-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isDarkVariant = variant === 'varient_3';

  return (
    <section
      className="relative overflow-hidden py-10 sm:py-16 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: isDarkVariant ? '#0F2419' : '#FCF9F2',
        color: isDarkVariant ? '#FAF6EE' : '#1F2937',
        fontFamily: "'Plus Jakarta Sans', 'Hind Siliguri', sans-serif",
      }}
    >
      {/* Subtle Decorative Radial Glow */}
      <div
        className="pointer-events-none absolute -top-28 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, #D97706 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto space-y-10">
        {/* =============================================================== */}
        {/* 1. HERO SPLIT LAYOUT: FORMALIN-FREE PROMISE + LIVE ORCHARD CARD */}
        {/* =============================================================== */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center ${
            variant === 'varient_2' ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Left Column: High-Converting Bilingual Copy & USP */}
          <div className="lg:col-span-7 space-y-5">
            {/* Top Trust Pill */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold border bg-[#14532D]/10 text-[#14532D] border-[#14532D]/25 dark:bg-emerald-950/80 dark:text-emerald-200">
              <ShieldCheck size={14} className="text-[#D97706]" />
              <span>১০০% ফরমালিন, কার্বাইড ও ইথেফন মুক্ত (BCSIR Test Verified)</span>
              <span className="px-2 py-0.5 rounded-full bg-[#D97706] text-white text-[10px]">
                Batch #2026-08
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight leading-[1.15]"
              style={{ fontFamily: "'Playfair Display', 'Hind Siliguri', Georgia, serif" }}
            >
              <EditableText
                id="organic_hero_main_headline"
                defaultText={
                  title ||
                  'গাছপাকা রাজশাহীর আম ও খাঁটি খেজুরের গুড় — সরাসরি বাগান থেকে আপনার পরিবারের টেবিলে'
                }
                as="span"
              />
            </h1>

            {/* English + Bangla Subtitle */}
            <p className="text-sm sm:text-base leading-relaxed opacity-85 max-w-2xl">
              <EditableText
                id="organic_hero_main_subheadline"
                defaultText={
                  subtitle ||
                  'আপনার সন্তানের মুখে বিষমুক্ত ফল তুলে দিন। আমাদের নিজস্ব তত্ত্বাবধানে চাঁপাইনবাবগঞ্জের বাগান থেকে প্রতিদিন ভোরে পাড়া গাছপাকা হিমসাগর, দিনাজপুরের লিচু এবং যশোরের খাঁটি খেজুরের গুড় — কোনো মধ্যস্বত্বভোগী বা কেমিক্যাল ছাড়াই ২৪ ঘণ্টায় ঢাকায় হোম ডেলিভারি।'
                }
                as="span"
              />
            </p>

            {/* 3 Core USPs for Dhaka Families & Corporate Buyers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div
                className="p-3.5 rounded-2xl border flex items-start gap-2.5"
                style={{
                  backgroundColor: isDarkVariant ? '#153123' : '#FFFFFF',
                  borderColor: isDarkVariant ? '#234B37' : '#E6DFD3',
                }}
              >
                <CheckCircle2 size={18} className="text-[#16A34A] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-extrabold">ফরমালিন মুক্ত গ্যারান্টি</div>
                  <div className="text-[11px] opacity-75">
                    প্রতিটি ক্যারেটে ফ্রি ফরমালিন টেস্ট স্ট্রিপ সংযুক্ত
                  </div>
                </div>
              </div>

              <div
                className="p-3.5 rounded-2xl border flex items-start gap-2.5"
                style={{
                  backgroundColor: isDarkVariant ? '#153123' : '#FFFFFF',
                  borderColor: isDarkVariant ? '#234B37' : '#E6DFD3',
                }}
              >
                <Truck size={18} className="text-[#D97706] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-extrabold">২৪ ঘণ্টায় বাগান থেকে ঢাকায়</div>
                  <div className="text-[11px] opacity-75">
                    সকালে গাছ থেকে পেড়ে পরদিন আপনার বাসায় ডেলিভারি
                  </div>
                </div>
              </div>

              <div
                className="p-3.5 rounded-2xl border flex items-start gap-2.5"
                style={{
                  backgroundColor: isDarkVariant ? '#153123' : '#FFFFFF',
                  borderColor: isDarkVariant ? '#234B37' : '#E6DFD3',
                }}
              >
                <Award size={18} className="text-[#14532D] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-extrabold">খাঁটি ছানার মিষ্টি ও গুড়</div>
                  <div className="text-[11px] opacity-75">
                    চিনি ও ডালডা মুক্ত ১০০% গাভীর দুধের ঐতিহ্যবাহী মিষ্টি
                  </div>
                </div>
              </div>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <EditableButton
                id="organic_hero_primary_cta"
                defaultText="রবিবারের ব্যাচে প্রি-অর্ডার করুন (Book Harvest Batch)"
                backgroundColor="#14532D"
                textColor="#FFFFFF"
                leftIcon={<ShoppingBag size={16} />}
                rightIcon={<ArrowRight size={15} />}
                onClick={() =>
                  scrollToAndPrefillOrder(
                    activeHighlight.banglaName,
                    activeHighlight.minBoxKg,
                    activeHighlight.pricePerKg
                  )
                }
                className="px-6 py-4 rounded-2xl text-xs sm:text-sm font-extrabold shadow-lg transition hover:opacity-95 cursor-pointer"
              />

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('organic-bulk-calculator');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-4 rounded-2xl text-xs sm:text-sm font-extrabold border transition hover:border-[#D97706] cursor-pointer flex items-center gap-2"
                style={{
                  backgroundColor: isDarkVariant ? '#153123' : '#FFFFFF',
                  borderColor: '#D97706',
                  color: isDarkVariant ? '#FDE047' : '#9A3412',
                }}
              >
                <Sparkles size={15} className="text-[#D97706]" />
                <span>কর্পোরেট ও ফ্যামিলি বাল্ক ডিসকাউন্ট (২০ কেজি+)</span>
              </button>
            </div>

            {/* Quick Social Proof Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs opacity-80">
              <div className="flex items-center gap-1.5 font-bold">
                <span className="text-[#D97706]">★★★★★</span>
                <span>৪.৯৬/৫ রেটিং (৮,৪০০+ ঢাকার পরিবার)</span>
              </div>
              <span>•</span>
              <div className="font-semibold">
                ডেলিভারির সময় বক্স খুলে খেয়ে দেখে পেমেন্ট করার সুবিধা (Open-Box COD)
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Orchard Harvest Showcase Card */}
          <div className="lg:col-span-5">
            <div
              className="rounded-3xl border p-4 sm:p-5 shadow-xl space-y-4"
              style={{
                backgroundColor: isDarkVariant ? '#153123' : '#FFFFFF',
                borderColor: isDarkVariant ? '#234B37' : '#E6DFD3',
              }}
            >
              {/* Orchard Switcher Tabs */}
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-[#F4EFE6] dark:bg-black/30">
                {ORCHARD_HIGHLIGHTS.map((item) => {
                  const active = item.id === activeHighlight.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveHighlight(item)}
                      className={`py-2 px-2 rounded-xl text-[11px] font-extrabold transition cursor-pointer truncate ${
                        active
                          ? 'bg-[#14532D] text-white shadow-xs'
                          : 'text-neutral-700 hover:bg-black/5'
                      }`}
                    >
                      {item.id === 'himsagar'
                        ? 'হিমসাগর আম'
                        : item.id === 'litchi'
                        ? 'বেদানা লিচু'
                        : 'খেজুরের গুড়'}
                    </button>
                  );
                })}
              </div>

              {/* Active Orchard Visual */}
              <div className="relative rounded-2xl overflow-hidden h-60 sm:h-64 border border-black/10">
                <img
                  src={activeHighlight.image}
                  alt={activeHighlight.englishName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#14532D] text-[#FEFCE8] border border-white/20">
                    {activeHighlight.badge}
                  </span>
                </div>

                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-xl bg-black/75 backdrop-blur-xs text-white text-[11px] font-mono font-bold">
                  {activeHighlight.brixSweetness}
                </div>

                <div className="absolute bottom-3 inset-x-3 text-white space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#FDE047] font-bold">
                    <MapPin size={12} />
                    <span>{activeHighlight.region}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold leading-snug">
                    {activeHighlight.banglaName}
                  </h3>
                </div>
              </div>

              {/* Orchard Spec Metadata & Instant Lock-In */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#FCF9F2] dark:bg-black/25 border border-[#E6DFD3]">
                    <div className="text-[10px] uppercase font-bold opacity-60">
                      হার্ভেস্ট ক্যালেন্ডার (Harvest)
                    </div>
                    <div className="font-extrabold text-[#14532D] dark:text-emerald-300 mt-0.5">
                      {activeHighlight.harvestWindow}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FCF9F2] dark:bg-black/25 border border-[#E6DFD3]">
                    <div className="text-[10px] uppercase font-bold opacity-60">
                      বাগান মূল্য (Orchard Rate)
                    </div>
                    <div className="font-extrabold text-[#D97706] text-sm mt-0.5">
                      ৳{activeHighlight.pricePerKg}/কেজি{' '}
                      <span className="text-[11px] opacity-75">
                        (Min {activeHighlight.minBoxKg}kg)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#14532D] dark:text-emerald-300">
                    <FileCheck2 size={14} />
                    <span>BCSIR Lab Certificate #BD-9941 Included</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      scrollToAndPrefillOrder(
                        activeHighlight.banglaName,
                        activeHighlight.minBoxKg,
                        activeHighlight.pricePerKg
                      )
                    }
                    className="px-4 py-2.5 rounded-xl bg-[#D97706] text-white text-xs font-extrabold hover:opacity-95 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <span>বুক করুন ({activeHighlight.minBoxKg} কেজি ক্যারেট)</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =============================================================== */}
        {/* 2. MANDATORY SECTION: HARVESTING BATCH PRE-ORDER COUNTER        */}
        {/* =============================================================== */}
        <div
          id="organic-harvest-counter"
          className="rounded-3xl border-2 p-5 sm:p-7 shadow-lg relative overflow-hidden"
          style={{
            backgroundColor: '#14532D',
            borderColor: '#D97706',
            color: '#FEFCE8',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Copy & Urgency Explanation */}
            <div className="lg:col-span-7 space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D97706] text-white text-[11px] font-extrabold uppercase tracking-wider">
                <Flame size={13} />
                <span>Next Orchard Harvest Batch Dispatches on Sunday • ভোর ৬টায় পাড়া হবে</span>
              </div>

              <h2
                className="text-xl sm:text-2xl font-black tracking-tight"
                style={{ fontFamily: "'Playfair Display', 'Hind Siliguri', serif" }}
              >
                পরবর্তী বাগান হার্ভেস্ট ব্যাচ: রবিবার সকাল ৬:০০টা (চাঁপাইনবাবগঞ্জ ও দিনাজপুর)
              </h2>

              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                আমরা কখনোই কোল্ড-স্টোরেজে ফল মজুদ রাখি না। শুধুমাত্র প্রি-অর্ডারকৃত পরিমাণের ফলই রবিবার ভোরে গাছ থেকে পেড়ে ব্রিদেবল বাঁশের ও প্লাস্টিক ক্যারেটে প্যাক করে সরাসরি ঢাকায় পাঠানো হয়।
              </p>

              {/* Batch Selector Pills */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedBatchDay('sunday_batch')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                    selectedBatchDay === 'sunday_batch'
                      ? 'bg-[#FDE047] text-[#14532D] border-[#FDE047]'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/15'
                  }`}
                >
                  রবিবার ব্যাচ #০৮ (মাত্র ৩৮ ক্যারেট বাকি)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedBatchDay('wednesday_batch')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                    selectedBatchDay === 'wednesday_batch'
                      ? 'bg-[#FDE047] text-[#14532D] border-[#FDE047]'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/15'
                  }`}
                >
                  বুধবার ব্যাচ #০৯ (প্রি-বুকিং চলছে • ১৪০ ক্যারেট)
                </button>
              </div>
            </div>

            {/* Right Live Countdown Clock & Crate Quota Meter */}
            <div className="lg:col-span-5 space-y-4 bg-black/25 p-4 sm:p-5 rounded-2xl border border-white/15">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 text-[#FDE047]">
                  <Clock size={14} />
                  <span>প্রি-অর্ডার কাট-অফ সময় বাকি:</span>
                </span>
                <span className="font-mono text-[11px] bg-emerald-900/90 px-2 py-0.5 rounded border border-emerald-500/30">
                  81% Crates Reserved
                </span>
              </div>

              {/* 4-Unit Countdown Grid */}
              <div className="grid grid-cols-4 gap-2 text-center">
                {[
                  { label: 'দিন (Days)', value: String(timeLeft.days).padStart(2, '0') },
                  { label: 'ঘণ্টা (Hrs)', value: String(timeLeft.hours).padStart(2, '0') },
                  { label: 'মিনিট (Min)', value: String(timeLeft.minutes).padStart(2, '0') },
                  { label: 'সেকেন্ড (Sec)', value: String(timeLeft.seconds).padStart(2, '0') },
                ].map((unit) => (
                  <div
                    key={unit.label}
                    className="p-2.5 rounded-xl bg-[#0F2419] border border-emerald-500/30"
                  >
                    <div className="text-xl sm:text-2xl font-black font-mono text-[#FDE047]">
                      {unit.value}
                    </div>
                    <div className="text-[10px] font-bold text-emerald-100/80 mt-0.5">
                      {unit.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Crate Allocation Progress Bar */}
              <div className="space-y-1.5">
                <div className="w-full h-2.5 rounded-full bg-black/40 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: selectedBatchDay === 'sunday_batch' ? '81%' : '34%',
                      background: 'linear-gradient(90deg, #F59E0B 0%, #FDE047 100%)',
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-emerald-100/90 font-semibold">
                  <span>
                    {selectedBatchDay === 'sunday_batch'
                      ? '১৬২/২০০ ক্যারেট বুকড (রবিবার ভোরের ট্রাক)'
                      : '৬৮/২০০ ক্যারেট বুকড (বুধবার ভোরের ট্রাক)'}
                  </span>
                  <span className="text-[#FDE047] font-bold">অগ্রিম ১ টাকাও লাগবে না</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
