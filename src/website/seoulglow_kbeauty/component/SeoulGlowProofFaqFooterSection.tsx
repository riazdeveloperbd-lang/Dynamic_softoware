import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  Send,
  Star,
  QrCode,
  Eye,
  X,
  PhoneCall,
  MapPin,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface SeoulGlowProofFaqFooterSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

interface BeforeAfterCaseItem {
  id: string;
  customerName: string;
  location: string;
  ageSkin: string;
  concernTitle: string;
  durationBadge: string;
  productsUsed: string;
  beforeNoteBn: string;
  afterNoteBn: string;
  quoteBn: string;
  image: string;
  verifiedBatch: string;
}

const BEFORE_AFTER_CASES: BeforeAfterCaseItem[] = [
  {
    id: 'case_1',
    customerName: 'Tasfia Rahman (তাসফিয়া রহমান)',
    location: 'Dhanmondi, Dhaka',
    ageSkin: '24 yrs · Oily & Acne-Prone Skin',
    concernTitle: 'Active Hormonal Acne & Redness → Calm Glass-Skin',
    durationBadge: '4 Weeks Progression',
    productsUsed: 'Anua Heartleaf 77% Toner + SKIN1004 Centella Ampoule + BOJ Relief Sun',
    beforeNoteBn:
      'Week 1: গালের দুই পাশে ছোট ছোট র‍্যাশ, ব্রণ এবং অতিরিক্ত তেলতেলে ভাব ছিল।',
    afterNoteBn:
      'Week 4: নতুন ব্রণ ওঠা সম্পূর্ণ বন্ধ হয়েছে এবং লালচে দাগ ৮০% হালকা হয়ে ত্বক মসৃণ হয়েছে।',
    quoteBn:
      '“আগে ফেসবুকের এক পেজ থেকে সস্তায় টোনার কিনে মুখ ভরে র‍্যাশ উঠেছিল। SeoulGlow থেকে বক্সের HiddenTag স্ক্যান করে আসল Anua 77% Toner ও Centella ব্যবহারের ৪ সপ্তাহে আমার স্কিন একদম চেঞ্জ হয়ে গেছে!”',
    image:
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    verifiedBatch: 'ANUA-77-90312',
  },
  {
    id: 'case_2',
    customerName: 'Farzana Mimi (ফারজানা মিম)',
    location: 'Khulshi, Chattogram',
    ageSkin: '28 yrs · Dry & Dehydrated Skin',
    concernTitle: 'Flaky Dull Barrier → Plump 96% Snail Mucin Glow',
    durationBadge: '21 Days Result',
    productsUsed: 'COSRX Advanced Snail 96 Mucin Essence + Round Lab Dokdo Cleanser',
    beforeNoteBn:
      'Week 1: এসি রুমে কাজের কারণে ত্বক খসখসে, প্রাণহীন এবং চোখের নিচে ফাইন লাইনস দেখা যাচ্ছিল।',
    afterNoteBn:
      'Week 3: ত্বকের গভীরে হাইড্রেশন ফিরে এসেছে এবং মেকআপ ছাড়াই ন্যাচারাল গ্লাস-স্কিন গ্লো দেখা যাচ্ছে।',
    quoteBn:
      '“ডেলিভারি ম্যানের সামনেই COSRX-এর বারকোড স্ক্যান করে রিসিভ করেছি। মাত্র ৩ সপ্তাহে ত্বক এতটা সফট আর গ্লোয়িং হয়েছে যা কোনো পার্লার ফেসিয়ালেও পাইনি।”',
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    verifiedBatch: 'COSRX-KR-88294',
  },
  {
    id: 'case_3',
    customerName: 'Samia Islam (সামিয়া ইসলাম)',
    location: 'Zindabazar, Sylhet',
    ageSkin: '31 yrs · Combination & Melasma',
    concernTitle: 'Post-Acne Dark Spots & Sun Tan → Even Radiant Tone',
    durationBadge: '4 Weeks Progression',
    productsUsed: 'AXIS-Y Dark Spot Glow Serum (5% Niacinamide) + BOJ Relief Sun SPF50+',
    beforeNoteBn:
      'Week 1: ব্রণের পুরনো কালো দাগ এবং কপালে ও গালে রোদে পোড়া মেছতার ছোপ ছিল।',
    afterNoteBn:
      'Week 4: ৫% নায়াসিনামাইড এবং নিয়মিত রাইস সানস্ক্রিন ব্যবহারে কালো দাগ হালকা হয়ে স্কিন টোন সমান হয়েছে।',
    quoteBn:
      '“বিউটি অফ জোসন সানস্ক্রিনটা জাস্ট ম্যাজিক! একটুও হোয়াইট কাস্ট দেয় না বা ঘামায় না। আর AXIS-Y সিরামে আমার ২ বছরের পুরনো ব্রণের দাগ চলে গেছে।”',
    image:
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80',
    verifiedBatch: 'BOJ-SEOUL-44109',
  },
];

const SKINCARE_FAQS = [
  {
    q: '১. প্রোডাক্ট কি আসলেই কোরিয়ার অরিজিনাল? কপি হলে কী করব?',
    a: 'আমরা ১০০% দক্ষিণ কোরিয়ার অফিশিয়াল ডিস্ট্রিবিউটর এবং সিউল ইনচন এয়ার-ফ্রেইটের মাধ্যমে সরাসরি আমদানি করি। প্রতিটি প্রোডাক্টের বক্সে স্ক্যানযোগ্য অফিশিয়াল বারকোড, HiddenTag হলোগ্রাম এবং লেজার-খোদাই করা ব্যাচ কোড থাকে। আপনি ডেলিভারি ম্যানের সামনেই স্ক্যান করে চেক করতে পারবেন। কেউ যদি আমাদের প্রোডাক্ট নকল বা কপি প্রমাণ করতে পারেন, আমরা লিখিতভাবে ১০ গুণ টাকা ফেরত (10X Money-Back Guarantee) দেওয়ার অঙ্গীকার করি।',
  },
  {
    q: '২. আমার ত্বক খুব সেনসিটিভ এবং তৈলাক্ত, কোন প্রোডাক্টটি আমার জন্য ভালো হবে?',
    a: 'তৈলাক্ত ও সেনসিটিভ ত্বকের জন্য আমাদের বেস্ট-সেলিং রুটিন হলো: Round Lab Dokdo Low-pH Cleanser দিয়ে মুখ ধোয়া, এরপর Anua Heartleaf 77% Soothing Toner অথবা SKIN1004 Madagascar Centella Ampoule ব্যবহার করা এবং দিনে Beauty of Joseon Relief Sun SPF50+ লাগানো। এগুলো সম্পূর্ণ অ্যালকোহল ও সুগন্ধি-মুক্ত এবং পোরস ব্লক না করে ব্রণ ও অতিরিক্ত তেল নিয়ন্ত্রণ করে।',
  },
  {
    q: '৩. ব্যবহারের কত দিনের মধ্যে ফলাফল পাব?',
    a: 'কোরিয়ান স্কিনকেয়ারে ক্ষতিকর মার্কারি বা ব্লিচিং কেমিক্যাল থাকে না, এটি ত্বকের কোষ ভেতর থেকে সুস্থ করে। হাইড্রেশন ও লালচে ভাব কমার ফলাফল প্রথম ৭ দিনেই অনুভব করবেন। তবে ব্রণের গর্ত, কালো দাগ ও মেছতা হালকা হয়ে স্থায়ী গ্লাস-স্কিন ফলাফল পেতে ৩ থেকে ৪ সপ্তাহ (২৮ দিনের স্কিন সেল টার্নওভার সাইকেল) নিয়মিত সকাল ও রাতে ব্যবহার করা প্রয়োজন।',
  },
  {
    q: '৪. ডেলিভারি চার্জ কত এবং প্রোডাক্ট হাতে পেয়ে চেক করার সুযোগ আছে কি?',
    a: 'অগ্রিম ১ টাকাও দিতে হবে না! ঢাকা মেট্রোর ভেতরে ২৪ ঘণ্টায় এক্সপ্রেস ক্যাশ অন ডেলিভারি চার্জ মাত্র ৳৬০ এবং ঢাকার বাইরে সারা বাংলাদেশে ৪৮ ঘণ্টায় ৳১২০। তবে যেকোনো ৩-স্টেপ গ্লাস-স্কিন কম্বো অর্ডার করলে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি! ডেলিভারি ম্যানের সামনে পার্সেল খুলে বোতলের বারকোড ও সিল চেক করে মূল্য পরিশোধ করার শতভাগ সুযোগ রয়েছে।',
  },
];

export const SeoulGlowProofFaqFooterSection: React.FC<
  SeoulGlowProofFaqFooterSectionProps
> = ({ title, subtitle, variant, primaryColor, isDark }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);
  const [activeCaseModal, setActiveCaseModal] = useState<BeforeAfterCaseItem | null>(null);
  const [isWaChatOpen, setIsWaChatOpen] = useState<boolean>(false);
  const [waSkinQuestion, setWaSkinQuestion] = useState<string>(
    'আমার ত্বক তৈলাক্ত ও ব্রণ-প্রবণ, কোন ৩-স্টেপ রুটিনটি ভালো হবে?'
  );
  const [waReplySent, setWaReplySent] = useState<boolean>(false);

  const coralColor = primaryColor || '#E07A5F';

  return (
    <footer
      className={`pt-16 pb-12 transition-colors relative ${
        isDark ? 'bg-[#0B0D12] text-stone-100' : 'bg-white text-[#222222]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* ===================================================================== */}
        {/* PART 1: BEFORE / AFTER 4-WEEK CUSTOMER PROGRESSION GALLERY            */}
        {/* ===================================================================== */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#06B6D4]">
                <Sparkles size={15} />
                <span>4-Week Real Customer Progression · ৪ সপ্তাহের বাস্তব ফলাফল</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                <EditableText
                  id="seoulglow_reviews_headline"
                  defaultText={
                    title ||
                    '৪৮,০০০+ বাংলাদেশি কে-বিউটি লাভারদের ৪ সপ্তাহের গ্লাস-স্কিন ট্রান্সফরমেশন ও ভেরিফাইড রিভিউ'
                  }
                />
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-stone-400">
                <EditableText
                  id="seoulglow_reviews_subtitle"
                  defaultText={
                    subtitle ||
                    'যেকোনো কার্ডে ক্লিক করে গ্রাহকের ব্যবহৃত প্রোডাক্ট রুটিন এবং সপ্তাহভিত্তিক পরিবর্তন বিস্তারিত দেখুন।'
                  }
                />
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-extrabold text-amber-500">
              <Star size={16} fill="currentColor" />
              <span>4.98 / 5.0 Average Rating (12,400+ Verified BD Buyers)</span>
            </div>
          </div>

          {/* 3 Progression Cards — Clickable for Full Case Study Modal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BEFORE_AFTER_CASES.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveCaseModal(item)}
                className={`group rounded-3xl overflow-hidden border transition-all cursor-pointer flex flex-col justify-between ${
                  isDark
                    ? 'bg-[#141720] border-stone-800 hover:border-cyan-500/50'
                    : 'bg-[#FAFAFA] border-[#F3F4F6] hover:border-rose-200 shadow-xs'
                }`}
              >
                <div>
                  <div className="relative h-52 overflow-hidden bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.concernTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-white/95 text-[#222222] text-[11px] font-extrabold shadow-xs">
                      {item.durationBadge}
                    </span>
                    <span
                      className="absolute top-3 right-3 px-2.5 py-1 rounded-xl text-white text-[10px] font-extrabold flex items-center gap-1"
                      style={{ backgroundColor: '#06B6D4' }}
                    >
                      <Eye size={11} />
                      <span>Case Study</span>
                    </span>
                    <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                      <div className="text-[11px] font-bold text-rose-200">
                        {item.ageSkin}
                      </div>
                      <h3 className="text-sm font-black leading-snug">
                        {item.concernTitle}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    {/* Before vs After Mini Timeline */}
                    <div className="space-y-1.5 text-xs">
                      <div className="p-2.5 rounded-xl bg-rose-50/80 dark:bg-stone-900 border border-rose-100 dark:border-stone-800 text-[#6B7280] dark:text-stone-300">
                        <strong className="text-rose-700 dark:text-rose-400">
                          Before:
                        </strong>{' '}
                        {item.beforeNoteBn}
                      </div>
                      <div className="p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/50 text-[#222222] dark:text-emerald-100">
                        <strong className="text-emerald-700 dark:text-emerald-400">
                          After:
                        </strong>{' '}
                        {item.afterNoteBn}
                      </div>
                    </div>

                    <p className="text-xs italic text-[#6B7280] dark:text-stone-300 leading-relaxed">
                      {item.quoteBn}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3.5 border-t border-stone-200/70 dark:border-stone-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-extrabold">{item.customerName}</div>
                    <div className="text-[10px] text-[#6B7280]">
                      {item.location} · Verified Lot #{item.verifiedBatch}
                    </div>
                  </div>
                  <span
                    className="font-extrabold text-[11px]"
                    style={{ color: coralColor }}
                  >
                    Read Routine →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* PART 2: SKINCARE FAQ ACCORDION + WHATSAPP SPECIALIST CONCIERGE        */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Cols: Frequently Asked Questions */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#06B6D4]">
                Skincare &amp; Authenticity FAQ · সচরাচর জিজ্ঞাসিত প্রশ্ন
              </span>
              <h3 className="text-xl sm:text-2xl font-black">
                অর্ডার করার আগে আপনার মনে থাকা প্রশ্নের উত্তর
              </h3>
            </div>

            <div className="space-y-3">
              {SKINCARE_FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.q}
                    className={`rounded-2xl border transition-all ${
                      isDark
                        ? 'bg-[#141720] border-stone-800'
                        : 'bg-[#FAFAFA] border-stone-200/80'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left text-xs sm:text-sm font-extrabold cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={17}
                        className={`shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-[#E07A5F]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#6B7280] dark:text-stone-300 leading-relaxed border-t border-stone-200/60 dark:border-stone-800">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 5 Cols: WhatsApp Skincare Specialist Consultation Card */}
          <div
            className={`lg:col-span-5 rounded-3xl p-6 sm:p-7 border space-y-5 ${
              isDark
                ? 'bg-emerald-950/25 border-emerald-700/40'
                : 'bg-gradient-to-br from-[#D8E2DC]/60 via-[#FFF5F5] to-white border-[#D8E2DC]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-sm shrink-0">
                <MessageCircle size={22} />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Free Live K-Beauty Specialist Desk
                </span>
                <h4 className="text-base sm:text-lg font-black leading-snug">
                  কোন প্রোডাক্টটি আপনার ত্বকের জন্য সঠিক বুঝতে পারছেন না?
                </h4>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#6B7280] dark:text-stone-300 leading-relaxed">
              আমাদের সার্টিফাইড স্কিনকেয়ার এক্সপার্টের সাথে সরাসরি হোয়াটসঅ্যাপে কথা বলুন। আপনার ত্বকের ছবি বা সমস্যার কথা জানালে আমরা ৩ মিনিটে সঠিক রুটিন সাজিয়ে দেবো।
            </p>

            {/* Quick Question Selector */}
            <div className="space-y-2">
              <label className="block text-[11px] font-extrabold uppercase text-[#6B7280]">
                Select or Type Your Skin Question:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'ব্রণ ও গর্তের জন্য কোনটি ভালো?',
                  'মেছতা ও কালো দাগের রুটিন চাই',
                  'COSRX Snail 96 কি তৈলাক্ত ত্বকে স্যুট করবে?',
                ].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setWaSkinQuestion(preset);
                      setWaReplySent(false);
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:border-emerald-500 cursor-pointer"
                  >
                    {preset}
                  </button>
                ))}
              </div>
              <textarea
                rows={2}
                value={waSkinQuestion}
                onChange={(e) => setWaSkinQuestion(e.target.value)}
                className={`w-full p-3 rounded-xl border text-xs font-semibold focus:outline-none ${
                  isDark
                    ? 'bg-stone-900 border-stone-700 text-white'
                    : 'bg-white border-stone-300 text-[#222222]'
                }`}
              />
            </div>

            <button
              type="button"
              onClick={() => setWaReplySent(true)}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
            >
              <Send size={15} />
              <span>স্কিনকেয়ার এক্সপার্টের সাথে কথা বলুন (WhatsApp Chat)</span>
            </button>

            {waReplySent && (
              <div className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-emerald-300 dark:border-emerald-700 text-xs space-y-1">
                <div className="font-extrabold text-emerald-700 dark:text-emerald-400">
                  ✓ SeoulGlow K-Beauty Concierge Online:
                </div>
                <p className="text-[#6B7280] dark:text-stone-300 leading-relaxed">
                  আপনার প্রশ্ন <strong>“{waSkinQuestion}”</strong> আমাদের স্কিনকেয়ার ডার্মাটোলজি ডেস্কে পাঠানো হয়েছে। এক্সপার্ট রুটিন পরামর্শ: প্রতিদিন সকালে <strong>Dokdo Cleanser + BOJ Relief Sun SPF50+</strong> এবং রাতে <strong>Anua 77% Toner / COSRX Snail Mucin</strong> ব্যবহার করুন।
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* PART 3: MULTI-COLUMN BRAND SITEMAP & AUTHENTICITY FOOTER              */}
        {/* ===================================================================== */}
        <div className="pt-10 border-t border-stone-200 dark:border-stone-800 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black"
                style={{ backgroundColor: coralColor }}
              >
                <Sparkles size={18} />
              </div>
              <div>
                <span className="text-base font-black tracking-tight">
                  SeoulGlow BD (সিউল গ্লো)
                </span>
                <span className="block text-[10px] text-[#06B6D4] font-bold">
                  100% Authentic Korean Skincare Hub in Bangladesh 🇰🇷
                </span>
              </div>
            </div>
            <p className="text-[#6B7280] dark:text-stone-400 max-w-md leading-relaxed">
              আমরা সরাসরি দক্ষিণ কোরিয়ার সিউল থেকে COSRX, Beauty of Joseon, Anua, SKIN1004, AXIS-Y এবং Round Lab-এর ১০০% অরিজিনাল প্রোডাক্ট আমদানি করি। নকল প্রমাণ করতে পারলে ১০ গুণ টাকা ফেরতের লিখিত গ্যারান্টি।
            </p>
            <div className="flex flex-wrap items-center gap-4 text-[11px] font-bold text-[#6B7280]">
              <span className="flex items-center gap-1">
                <MapPin size={13} className="text-[#E07A5F]" />
                Banani Road 11, Dhaka-1213
              </span>
              <span className="flex items-center gap-1">
                <PhoneCall size={13} className="text-[#06B6D4]" />
                Hotline: +880 1711-SEOULGLOW
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-extrabold uppercase tracking-wider text-[#222222] dark:text-white">
              Official Korean Brands
            </div>
            <ul className="space-y-1.5 text-[#6B7280] dark:text-stone-400">
              <li>COSRX Official Seoul Line</li>
              <li>Beauty of Joseon Hanbang Care</li>
              <li>Anua Heartleaf &amp; Peach Line</li>
              <li>SKIN1004 Madagascar Centella</li>
              <li>AXIS-Y Climate-Inspired Skincare</li>
              <li>Round Lab 1025 Dokdo &amp; Birch</li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-extrabold uppercase tracking-wider text-[#222222] dark:text-white">
              Authenticity &amp; Buyer Protection
            </div>
            <ul className="space-y-1.5 text-[#6B7280] dark:text-stone-400">
              <li>10X Money-Back Authenticity Guarantee</li>
              <li>HiddenTag &amp; Korean Batch Code Verifier</li>
              <li>Open-Box Barcode Scan on Delivery</li>
              <li>24-Hour Dhaka Express Cold-Pack Courier</li>
              <li>Free 1-on-1 Skincare Routine Consultation</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-100 dark:border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#6B7280]">
          <span>
            © {new Date().getFullYear()} SeoulGlow BD (সিউল গ্লো). All rights reserved · 100% Imported from South Korea.
          </span>
          <span>KFDA &amp; BSTI Compliant · Cash on Delivery Nationwide</span>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* PERSISTENT FLOATING WHATSAPP SKINCARE SPECIALIST WIDGET               */}
      {/* ===================================================================== */}
      <div className="fixed bottom-5 right-5 z-40">
        {isWaChatOpen ? (
          <div
            className={`w-80 sm:w-96 rounded-3xl p-4 border shadow-2xl space-y-3 ${
              isDark
                ? 'bg-[#151922] border-emerald-600/50 text-white'
                : 'bg-white border-emerald-200 text-[#222222]'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <MessageCircle size={16} />
                </div>
                <div>
                  <div className="text-xs font-black">
                    SeoulGlow Skincare Specialist
                  </div>
                  <div className="text-[10px] text-emerald-600 font-bold">
                    ● Online · Replies in 2 mins
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsWaChatOpen(false)}
                className="p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            <p className="text-xs text-[#6B7280] dark:text-stone-300 leading-relaxed">
              কোন প্রোডাক্টটি আপনার ত্বকের জন্য সঠিক বুঝতে পারছেন না? আমাদের স্কিনকেয়ার এক্সপার্টের সাথে কথা বলুন!
            </p>

            <a
              href="#seoulglow-cod-checkout"
              onClick={(e) => {
                e.preventDefault();
                setIsWaChatOpen(false);
                const el = document.getElementById('seoulglow-cod-checkout');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="block w-full py-2.5 px-4 rounded-xl bg-emerald-600 text-white text-center text-xs font-extrabold shadow-xs hover:bg-emerald-700"
            >
              Start Skincare Chat / Order Now →
            </a>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsWaChatOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-xl cursor-pointer transition-transform hover:scale-105"
          >
            <MessageCircle size={18} />
            <span className="hidden sm:inline">
              স্কিনকেয়ার এক্সপার্টের সাথে কথা বলুন
            </span>
          </button>
        )}
      </div>

      {/* ===================================================================== */}
      {/* MODAL: BEFORE/AFTER PROGRESSION CASE STUDY MODAL                      */}
      {/* ===================================================================== */}
      {activeCaseModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
          onClick={() => setActiveCaseModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-xl rounded-3xl overflow-hidden border shadow-2xl ${
              isDark
                ? 'bg-[#151821] border-stone-800 text-white'
                : 'bg-white border-stone-200 text-[#222222]'
            }`}
          >
            <div className="relative h-56">
              <img
                src={activeCaseModal.image}
                alt={activeCaseModal.concernTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <button
                type="button"
                onClick={() => setActiveCaseModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black cursor-pointer"
              >
                <X size={16} />
              </button>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs font-extrabold text-cyan-300">
                  {activeCaseModal.durationBadge} · Verified Batch #{activeCaseModal.verifiedBatch}
                </span>
                <h3 className="text-xl font-black mt-0.5">
                  {activeCaseModal.concernTitle}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4 text-xs sm:text-sm">
              <div className="flex items-center justify-between text-xs text-[#6B7280]">
                <strong className="text-[#222222] dark:text-white">
                  {activeCaseModal.customerName} ({activeCaseModal.location})
                </strong>
                <span>{activeCaseModal.ageSkin}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FFF5F5] dark:bg-stone-900 border border-rose-100 dark:border-stone-800 space-y-1.5 text-xs">
                <div className="font-extrabold text-[#E07A5F]">
                  Exact Korean Products Used:
                </div>
                <div className="font-bold">{activeCaseModal.productsUsed}</div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <strong className="text-rose-600">Before (Week 1):</strong>{' '}
                  {activeCaseModal.beforeNoteBn}
                </div>
                <div>
                  <strong className="text-emerald-600">After (Week 4):</strong>{' '}
                  {activeCaseModal.afterNoteBn}
                </div>
              </div>

              <p className="italic text-xs text-[#6B7280] dark:text-stone-300">
                {activeCaseModal.quoteBn}
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setActiveCaseModal(null);
                    const el = document.getElementById('seoulglow-cod-checkout');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-white cursor-pointer"
                  style={{ backgroundColor: coralColor }}
                >
                  Order This Exact Routine (COD) →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
