import React, { useState } from 'react';
import {
  Trophy,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Dumbbell,
  PhoneCall,
  MapPin,
  Sparkles,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface FitGhorSuccessFooterSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

interface TransformationStory {
  id: string;
  customerName: string;
  professionAndCity: string;
  timeframe: string;
  beforeMetric: string;
  afterMetric: string;
  gearUsed: string;
  rating: string;
  storyQuote: string;
  progressPhotoWebp: string;
}

const TRANSFORMATION_STORIES: TransformationStory[] = [
  {
    id: 'tanvir_uttara',
    customerName: 'তানভীর মাহমুদ (৩২)',
    professionAndCity: 'ব্যাংকার · উত্তরা সেক্টর ৭, ঢাকা',
    timeframe: '৮ সপ্তাহের ট্রান্সফরমেশন',
    beforeMetric: 'আগে: ৮৮ কেজি (কোমর ৩৮ ইঞ্চি)',
    afterMetric: 'এখন: ৭৯ কেজি (কোমর ৩৪ ইঞ্চি)',
    gearUsed: '150 LBS Resistance Band Set + Waist Trimmer Belt',
    rating: '5.0 ★ Verified Transformation',
    storyQuote:
      '“মতিঝিল থেকে অফিস করে উত্তরায় ফিরতে প্রতিদিন রাত ৮টা বাজত—জ্যাম ঠেলে জিমে যাওয়া অসম্ভব ছিল। FitGhor থেকে ১৫০ পাউন্ড রেজিস্ট্যান্স ব্যান্ড ও ওয়েস্ট ট্রিমার বেল্ট নেওয়ার পর ওদের ফ্রি PDF রুটিন দেখে প্রতিদিন ফজরের পর ৩০ মিনিট ঘরেই ওয়ার্কআউট করেছি। ২ মাসে ৯ কেজি ওজন ও ৪ ইঞ্চি পেটের মেদ কমেছে!”',
    progressPhotoWebp:
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80&fm=webp',
  },
  {
    id: 'nusrat_dhanmondi',
    customerName: 'নুসরাত জাহান ইভা (২৮)',
    professionAndCity: 'ইউএক্স ডিজাইনার ও নতুন মা · ধানমন্ডি, ঢাকা',
    timeframe: '১০ সপ্তাহের পোস্ট-পার্টাম ফিটনেস',
    beforeMetric: 'আগে: তীব্র কোমর ব্যথা ও ৭৪ কেজি',
    afterMetric: 'এখন: ৬৫ কেজি ও সম্পূর্ণ ব্যথামুক্ত',
    gearUsed: '8mm Acupressure Yoga Mat + Smart Bluetooth Scale',
    rating: '5.0 ★ Verified Transformation',
    storyQuote:
      '“বাসার বাইরে গিয়ে জিমে ভর্তি হওয়ার সময় বা সুযোগ কোনোটাই ছিল না। ৮ মিমি আকুপ্রেশার ইয়োগা ম্যাটটিতে প্ল্যাঙ্ক ও স্ট্রেচিং করতে হাঁটুতে একটুও ব্যথা লাগে না, আর ব্লুটুথ স্কেলটায় প্রতি সপ্তাহে বডি ফ্যাট পার্সেন্টেজ কমতে দেখে মোটিভেশন দ্বিগুণ বেড়ে যায়।”',
    progressPhotoWebp:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80&fm=webp',
  },
  {
    id: 'fahim_chattogram',
    customerName: 'ইঞ্জিনিয়ার ফাহিম ফয়সাল (২৬)',
    professionAndCity: 'সফটওয়্যার ইঞ্জিনিয়ার · আগ্রাবাদ, চট্টগ্রাম',
    timeframe: '১২ সপ্তাহের মাসল বিল্ডিং',
    beforeMetric: 'আগে: চিকন গড়ন (৫৮ কেজি)',
    afterMetric: 'এখন: ৬৬ কেজি (লিন মাসল গেইন)',
    gearUsed: '24KG Adjustable Dumbbell + 150 LBS Resistance Bands',
    rating: '5.0 ★ Verified Transformation',
    storyQuote:
      '“মাত্র ১ জোড়া ২৪ কেজি অ্যাডজাস্টেবল ডাম্বেল আমার ঘরের কোণায় মাত্র ২ ফিট জায়গা নিয়েছে, অথচ ১৫ জোড়া ডাম্বেলের কাজ করছে! ডায়াল ঘুরালেই ৩ সেকেন্ডে ওজন চেঞ্জ হয়ে যায়। ফ্লোরে কোনো দাগ পড়ে না এবং কোয়ালিটি কমার্শিয়াল জিমের মতোই সলিড।”',
    progressPhotoWebp:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80&fm=webp',
  },
];

const FITGHOR_FAQS = [
  {
    q: '১. ১৫০ পাউন্ড রেজিস্ট্যান্স ব্যান্ড কি জোরে টানলে ছিঁড়ে যাওয়ার ঝুঁকি আছে?',
    a: 'না! আমাদের রেজিস্ট্যান্স ব্যান্ডগুলো সস্তা TPE বা সিঙ্গেল-লেয়ার রাবার নয়; এটি ১০০% ডাবল-ডিপড মালয়েশিয়ান প্রাকৃতিক ল্যাটেক্স দিয়ে তৈরি যা ৫০,০০০+ স্ট্রেচ সাইকেল পরীক্ষিত। সাথে ১ বছরের ফ্রি রিপ্লেসমেন্ট ওয়ারেন্টি রয়েছে।',
  },
  {
    q: '২. ফ্রি “At-Home Workout Plan PDF” গাইডটি কীভাবে পাব?',
    a: 'আপনি চেকআউট ফর্মে অর্ডার কনফার্ম করার সাথে সাথেই আমাদের অটোমেটেড Digital Bonus Trigger আপনার দেওয়া WhatsApp নাম্বার এবং ইমেইলে ৩০ দিনের সচিত্র ওয়ার্কআউট রুটিন ও দেশি ডায়েট চার্ট PDF-এর ডাউনলোড লিংক পাঠিয়ে দেবে।',
  },
  {
    q: '৩. ২৪ কেজি অ্যাডজাস্টেবল ডাম্বেল বাসার টাইলসে রাখলে কি টাইলস ফেটে যাবে বা দাগ পড়বে?',
    a: 'একেবারেই না। প্রতিটি কাস্ট আয়রন প্লেটের ওপর হেভি-ডিউটি থার্মোপ্লাস্টিক রাবার কোটিং এবং নিচে ফ্লোর-প্রটেক্টিভ ডকিং ট্রে রয়েছে, যা আপনার বাসার দামি টাইলস বা মার্বেল ফ্লোর সম্পূর্ণ নিরাপদ রাখে।',
  },
  {
    q: '৪. ডেলিভারি ম্যানের সামনে প্যাকেট খুলে চেক করে টাকা দেওয়ার সুযোগ আছে কি?',
    a: 'হ্যাঁ, শতভাগ! Steadfast, Pathao কিংবা RedX কুরিয়ারের ডেলিভারি ম্যানের সামনে আপনি বক্স খুলে পণ্যের ওজন, কোয়ালিটি এবং মেটাল ক্লিপ চেক করে তারপর ক্যাশ অন ডেলিভারিতে পেমেন্ট করতে পারবেন।',
  },
];

export const FitGhorSuccessFooterSection: React.FC<FitGhorSuccessFooterSectionProps> = ({
  title,
  subtitle,
  isDark = false,
}) => {
  const [activeSlideIdx, setActiveSlideIdx] = useState<number>(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number>(0);

  const primaryTextColor = isDark ? '#F8FAFC' : '#0F172A';
  const subTextColor = isDark ? '#CBD5E1' : '#334155';

  const currentStory = TRANSFORMATION_STORIES[activeSlideIdx] || TRANSFORMATION_STORIES[0];

  const prevSlide = () => {
    setActiveSlideIdx((prev) =>
      prev === 0 ? TRANSFORMATION_STORIES.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setActiveSlideIdx((prev) =>
      prev === TRANSFORMATION_STORIES.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <footer
      id="fitghor-success-stories"
      className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t"
      style={{
        backgroundColor: isDark ? '#080C14' : '#F1F5F9',
        borderColor: isDark ? '#1E293B' : '#CBD5E1',
        color: primaryTextColor,
      }}
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* =============================================================== */}
        {/* PART 1: MANDATORY TRANSFORMATION REVIEW SLIDER + GRID           */}
        {/* =============================================================== */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#F97316]">
                <Trophy size={15} />
                <span>Customer Transformation Stories · জ্যাম এড়িয়ে ঘরে বসেই ফিট হওয়ার বাস্তব গল্প</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                <EditableText
                  id="fitghor_reviews_h2"
                  defaultText={
                    title ||
                    '২৪,৮০০+ বাংলাদেশী প্রফেশনাল ও হোম জিম মেম্বারদের রিয়েল ট্রান্সফরমেশন রিভিউ'
                  }
                />
              </h2>
              <p className="text-xs sm:text-sm font-medium" style={{ color: subTextColor }}>
                <EditableText
                  id="fitghor_reviews_sub"
                  defaultText={
                    subtitle ||
                    'যাঁরা ব্যস্ত রুটিন ও ট্রাফিক জ্যামের অজুহাত ছেড়ে নিজের ঘরেই প্রতিদিন ৩০ মিনিট সময় দিয়ে নিজেদের ফিটনেস বদলে ফেলেছেন।'
                  }
                />
              </p>
            </div>

            {/* Interactive Slider Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                className="p-2.5 rounded-xl border cursor-pointer hover:border-[#F97316] transition"
                style={{
                  backgroundColor: isDark ? '#111827' : '#FFFFFF',
                  borderColor: isDark ? '#1E293B' : '#CBD5E1',
                }}
                aria-label="Previous Transformation"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-xs font-mono font-bold px-2">
                {activeSlideIdx + 1} / {TRANSFORMATION_STORIES.length}
              </span>
              <button
                type="button"
                onClick={nextSlide}
                className="p-2.5 rounded-xl border cursor-pointer hover:border-[#F97316] transition"
                style={{
                  backgroundColor: isDark ? '#111827' : '#FFFFFF',
                  borderColor: isDark ? '#1E293B' : '#CBD5E1',
                }}
                aria-label="Next Transformation"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Featured Transformation Spotlight Slider Card */}
          <div
            className="rounded-3xl p-6 sm:p-8 border-2 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl"
            style={{
              backgroundColor: isDark ? '#111827' : '#FFFFFF',
              borderColor: '#F97316',
            }}
          >
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-[#F97316]/30">
                <img
                  src={currentStory.progressPhotoWebp}
                  alt={currentStory.customerName}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#F97316] text-white text-[11px] font-black">
                  {currentStory.timeframe}
                </div>
                <div className="absolute bottom-3 left-3 right-3 grid grid-cols-2 gap-2 text-[11px] font-bold">
                  <div className="px-2.5 py-1.5 rounded-lg bg-black/80 text-rose-300 border border-rose-500/30">
                    {currentStory.beforeMetric}
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-emerald-950/90 text-emerald-300 border border-emerald-500/40">
                    {currentStory.afterMetric}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-black text-[#F97316]">
                  {currentStory.rating}
                </span>
                <span className="px-3 py-1 rounded-lg bg-emerald-500/15 text-[#059669] dark:text-[#10B981] text-xs font-extrabold">
                  ব্যবহৃত গিয়ার: {currentStory.gearUsed}
                </span>
              </div>

              <p className="text-sm sm:text-base leading-relaxed font-semibold italic">
                {currentStory.storyQuote}
              </p>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-black">{currentStory.customerName}</div>
                  <div className="text-xs font-medium" style={{ color: subTextColor }}>
                    {currentStory.professionAndCity}
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {TRANSFORMATION_STORIES.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveSlideIdx(idx)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        activeSlideIdx === idx
                          ? 'w-7 bg-[#F97316]'
                          : 'w-2.5 bg-slate-300 dark:bg-slate-700'
                      }`}
                      aria-label={`Select transformation ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* All 3 Stories Quick View Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TRANSFORMATION_STORIES.map((rev, idx) => (
              <div
                key={rev.id}
                onClick={() => setActiveSlideIdx(idx)}
                className={`rounded-2xl p-5 border transition cursor-pointer ${
                  activeSlideIdx === idx ? 'ring-2 ring-[#F97316]' : 'opacity-85 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: isDark ? '#111827' : '#FFFFFF',
                  borderColor: isDark ? '#1E293B' : '#CBD5E1',
                }}
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-black text-[#F97316]">{rev.timeframe}</span>
                  <span className="font-bold text-[#059669] dark:text-[#10B981]">
                    {rev.afterMetric}
                  </span>
                </div>
                <div className="text-sm font-black">{rev.customerName}</div>
                <div className="text-[11px] mb-2" style={{ color: subTextColor }}>
                  {rev.professionAndCity}
                </div>
                <p className="text-xs line-clamp-3 font-medium" style={{ color: subTextColor }}>
                  {rev.storyQuote}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* =============================================================== */}
        {/* PART 2: FREQUENTLY ASKED QUESTIONS                              */}
        {/* =============================================================== */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black">
              হোম জিম ইকুইপমেন্ট ও ডেলিভারি সম্পর্কে সচরাচর জিজ্ঞাসিত প্রশ্ন (FAQ)
            </h3>
            <p className="text-xs font-medium" style={{ color: subTextColor }}>
              অর্ডার করার আগে আমাদের গিয়ারের মান ও ওয়ারেন্টি সম্পর্কে জেনে নিন
            </p>
          </div>

          <div className="space-y-3">
            {FITGHOR_FAQS.map((faq, i) => {
              const isOpen = openFaqIdx === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl border p-4 transition"
                  style={{
                    backgroundColor: isDark ? '#111827' : '#FFFFFF',
                    borderColor: isOpen
                      ? '#F97316'
                      : isDark
                      ? '#1E293B'
                      : '#CBD5E1',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-extrabold cursor-pointer gap-4"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={16}
                      className={`text-[#F97316] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p
                      className="text-xs leading-relaxed font-medium mt-3 pt-3 border-t"
                      style={{
                        borderColor: isDark ? '#1E293B' : '#E2E8F0',
                        color: subTextColor,
                      }}
                    >
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* =============================================================== */}
        {/* PART 3: BOTTOM BRAND FOOTER & SITE MAP                          */}
        {/* =============================================================== */}
        <div
          className="pt-10 border-t grid grid-cols-1 md:grid-cols-4 gap-8 text-xs"
          style={{ borderColor: isDark ? '#1E293B' : '#CBD5E1' }}
        >
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#F97316] text-white font-black">
                <Dumbbell size={16} />
              </div>
              <span className="text-lg font-black">
                FitGhor (ফিটঘর) — হোম জিম ও ওয়েলনেস
              </span>
            </div>
            <p className="max-w-md leading-relaxed font-medium" style={{ color: subTextColor }}>
              ঢাকার যানজট ও ব্যয়বহুল জিম মেম্বারশিপের বদলে নিজের ঘরেই গড়ে তুলুন টেকসই, কমপ্যাক্ট ও সাশ্রয়ী হোম জিম। প্রতিটি অর্ডারের সাথে থাকছে ফ্রি ৩০ দিনের ওয়ার্কআউট গাইড PDF।
            </p>
            <div className="flex flex-wrap items-center gap-4 text-[11px] font-extrabold text-[#F97316]">
              <span className="inline-flex items-center gap-1">
                <MapPin size={13} /> এক্সপেরিয়েন্স স্টুডিও: বনানী রোড ২৭, ঢাকা-১২১৩
              </span>
              <span className="inline-flex items-center gap-1">
                <PhoneCall size={13} /> ফিটনেস হেল্পলাইন: +880 1713-884920
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-extrabold uppercase tracking-wider text-[#F97316]">
              সাইট স্ট্রাকচার (Required Pages)
            </div>
            <ul className="space-y-1.5 font-medium" style={{ color: subTextColor }}>
              <li>Home / Weight &amp; Material Specs Grid</li>
              <li>Shop All Gear: Strength, Wellness &amp; Trackers</li>
              <li>Free Workout Plans (Lead Magnet PDF Page)</li>
              <li>Success Stories (Before/After Slider)</li>
              <li>Optimized Checkout (District &amp; Thana Split)</li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-extrabold uppercase tracking-wider text-[#F97316]">
              কুরিয়ার ও টেকনিক্যাল গ্যারান্টি
            </div>
            <ul className="space-y-1.5 font-medium" style={{ color: subTextColor }}>
              <li>✓ Steadfast · Pathao · RedX COD ইন্টিগ্রেটেড</li>
              <li>✓ Ultra-Fast 4G (.WebP &lt; 2MB Page Payload)</li>
              <li>✓ ১ বছরের ওয়ারেন্টি ও ওপেন-বক্স ডেলিভারি</li>
              <li>✓ অটোমেটেড WhatsApp/Email PDF আনলক</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
