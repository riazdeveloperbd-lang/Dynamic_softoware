import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Briefcase,
  Award,
  PhoneCall,
  MapPin,
  Sparkles,
  Flame,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface Tannery71CorporateWarrantyFooterSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

const EXECUTIVE_REVIEWS = [
  {
    name: 'ব্যারিস্টার আরিফুর রহমান',
    designation: 'সুপ্রিম কোর্ট আইনজীবী, গুলশান-২, ঢাকা',
    product: 'হেরিটেজ ১৫.৬" অফিস মেসেঞ্জার ব্যাগ + দ্য নবাব ওয়ালেট (Saddle Tan)',
    quote:
      '“বিদেশ থেকে কেনা ২৫ হাজার টাকার ইতালিয়ান লেদার ব্যাগের চেয়ে আমাদের দেশি Tannery 71-এর ফুল-গ্রেইন মেসেঞ্জার ব্যাগটির চামড়ার পুরুত্ব ও সেলাই কোনো অংশেই কম নয়। দেড় বছর প্রতিদিন কোর্টে ব্যবহারের পর চামড়ায় যে গাঢ় ভিন্টেজ প্যাটিনা এসেছে তা এক কথায় অনন্য।”',
  },
  {
    name: 'সাদমান সাকিব ও তাসনিম নূর',
    designation: 'অ্যানিভার্সারি গিফট ক্রেতা, ধানমন্ডি, ঢাকা',
    product: 'দ্য নবাব এক্সিকিউটিভ কম্বো (+ 24K Gold Foil নাম খোদাই)',
    quote:
      '“আমাদের প্রথম বিবাহবার্ষিকীতে হাজব্যান্ডের নামের ইনিশিয়াল গোল্ড ফয়েলে খোদাই করে ওয়ালেট ও বেল্ট কম্বোটি অর্ডার করেছিলাম। ম্যাট ব্ল্যাক রিজিড বক্স আর ভেতরে ফ্রি বার্ন-টেস্ট চামড়ার টুকরো দেখে ও মুগ্ধ হয়ে গেছে!”',
  },
  {
    name: 'ফারহান তানভীর',
    designation: 'হেড অব প্রকিউরমেন্ট, মাল্টিন্যাশনাল ব্যাংক, মতিঝিল',
    product: '১৫০ পিস কর্পোরেট এজিএম গিফট বক্স (Custom Company Logo Debossed)',
    quote:
      '“আমাদের ব্যাংকের বার্ষিক কনফারেন্সে ১৫০ জন ভিআইপি গেস্টের জন্য ব্যাংকের লোগো ডিবস করা ওয়ালেট ও কার্ডহোল্ডার সেট নিয়েছিলাম। মাত্র ৭ দিনে শতভাগ নিখুঁত ফিনিশিং ও রিজিড গিফট বক্সে তারা ডেলিভারি দিয়েছে।”',
  },
];

const LEATHER_FAQS = [
  {
    q: '১. ডেলিভারি ম্যানের সামনে কি সত্যিই আগুন দিয়ে (Burn Test) চামড়া পরীক্ষা করা যাবে?',
    a: 'শতভাগ! প্রতিটি রিজিড গিফট বক্সের ভেতরে আমরা ওই একই চামড়ার একটি অতিরিক্ত স্যাম্পল টুকরো (Fire-Test Swatch) দিয়ে দিই। আপনি ডেলিভারি ম্যানের সামনে সেই টুকরোটি বা মূল ওয়ালেটটি লাইটার দিয়ে পরীক্ষা করে শতভাগ নিশ্চিত হয়ে মূল্য পরিশোধ করবেন।',
  },
  {
    q: '২. ফুল-গ্রেইন (Full-Grain) এবং সাধারণ জেনুইন বা বন্ডেড লেদারের পার্থক্য কী?',
    a: 'ফুল-গ্রেইন হলো গরুর চামড়ার একদম উপরের সবচেয়ে মজবুত ও প্রাকৃতিক স্তর, যা কখনোই খোসার মতো ওঠে না এবং যত পুরোনো হয় তত সুন্দর হয়। অন্যদিকে নিচের স্তরের চামড়ার গুঁড়ো আঠা দিয়ে জুড়ে তৈরি বন্ডেড লেদার ১ বছরেই ফেটে যায়। আমরা শুধুমাত্র ১০০% ফুল-গ্রেইন চামড়া ব্যবহার করি।',
  },
  {
    q: '৩. কাস্টম নাম খোদাই (+৳২০০) করলে কি ক্যাশ অন ডেলিভারি পাওয়া যাবে?',
    a: 'জি! কাস্টম নাম খোদাই করার পরেও আমরা আমাদের গ্রাহকদের ওপর আস্থা রেখে ১০০% ক্যাশ অন ডেলিভারিতে পণ্য পাঠাই। কেবল আমাদের কাস্টমার কেয়ার কল করে নামের বানানটি চূড়ান্ত করে নেবে।',
  },
  {
    q: '৪. ৫ বছরের লেদার রিপ্লেসমেন্ট ওয়ারেন্টি কীভাবে কাজ করে?',
    a: '৫ বছরের মধ্যে আমাদের যেকোনো ওয়ালেট, বেল্ট বা ব্যাগের চামড়ার উপরের স্তর যদি খোসার মতো উঠে যায় (Peeling/Cracking) কিংবা জিপার/সেলাই খুলে যায়, তবে ওয়ারেন্টি কার্ড দেখিয়ে সম্পূর্ণ বিনামূল্যে নতুন পণ্য বা সার্ভিসিং পাবেন।',
  },
];

export const Tannery71CorporateWarrantyFooterSection: React.FC<
  Tannery71CorporateWarrantyFooterSectionProps
> = ({ title, subtitle, isDark = false }) => {
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [corpCompany, setCorpCompany] = useState<string>('');
  const [corpQty, setCorpQty] = useState<string>('50 - 100 Boxes');
  const [corpPhone, setCorpPhone] = useState<string>('');
  const [corpSent, setCorpSent] = useState<boolean>(false);

  return (
    <footer
      id="tannery71-corporate-footer"
      className="pt-16 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-t"
      style={{
        backgroundColor: isDark ? '#0B0806' : '#F4EFE6',
        borderColor: isDark ? '#29201B' : '#E4DCCF',
        color: isDark ? '#FAF6F0' : '#1C130E',
      }}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* ================================================================= */}
        {/* PART 1: CORPORATE GIFTING & BULK B2B ORDERS SECTION               */}
        {/* ================================================================= */}
        <div
          className="rounded-3xl border-2 p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          style={{
            backgroundColor: isDark ? '#16100C' : '#FFFFFF',
            borderColor: isDark ? '#78350F' : '#D6C7B2',
          }}
        >
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-900/15 text-[#92400E] dark:text-amber-300">
              <Building2 size={14} />
              <span>Corporate Gifting &amp; Bulk B2B Orders (কর্পোরেট গিফটিং ও কাস্টম লোগো ডিবসিং)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              আপনার প্রতিষ্ঠানের লোগো খোদাই করা ফুল-গ্রেইন লেদার গিফট বক্স — ব্যাংক, এমএনসি ও বার্ষিক কনফারেন্সের জন্য
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed opacity-80">
              ৩০ পিস বা তার বেশি অর্ডারে আপনার কোম্পানির নিজস্ব ব্রাস ডাই তৈরি করে ওয়ালেট, কার্ডহোল্ডার, ডেস্ক অর্গানাইজার ও ফোল্ডারে ফ্রি লোগো ডিবসিং এবং কাস্টম ব্র্যান্ডেড রিজিড গিফট বক্স সুবিধা।
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {[
                '৩০+ পিসে ফ্রি কাস্টম ব্রাস লোগো ডাই',
                '৩৫% পর্যন্ত কর্পোরেট বাল্ক ডিসকাউন্ট',
                'ভ্যাট চালান ও অফিশিয়াল স্যাম্পল কিট ডেলিভারি',
              ].map((b) => (
                <div
                  key={b}
                  className="p-3 rounded-xl border text-xs font-extrabold flex items-center gap-2"
                  style={{
                    backgroundColor: isDark ? '#120D0A' : '#FAF6F0',
                    borderColor: isDark ? '#2E231C' : '#E5DDD0',
                  }}
                >
                  <CheckCircle2 size={14} className="text-[#B45309] shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              className="p-5 sm:p-6 rounded-2xl border space-y-3.5"
              style={{
                backgroundColor: isDark ? '#120D0A' : '#FAF6F0',
                borderColor: isDark ? '#2E231C' : '#E5DDD0',
              }}
            >
              <h3 className="text-sm font-black">কর্পোরেট স্যাম্পল ও কোটেশন রিকোয়েস্ট</h3>
              {corpSent ? (
                <div className="p-4 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                  ✓ ধন্যবাদ! আমাদের কর্পোরেট বি২বি ম্যানেজার আপনার প্রতিষ্ঠানের জন্য স্যাম্পল বক্স ও কোটেশন নিয়ে যোগাযোগ করবেন।
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={corpCompany}
                    onChange={(e) => setCorpCompany(e.target.value)}
                    placeholder="প্রতিষ্ঠান বা ব্যাংকের নাম"
                    className="w-full px-3 py-2 rounded-xl border text-xs font-semibold"
                    style={{
                      backgroundColor: isDark ? '#18120E' : '#FFFFFF',
                      borderColor: isDark ? '#33261E' : '#D6C7B2',
                    }}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={corpQty}
                      onChange={(e) => setCorpQty(e.target.value)}
                      className="px-3 py-2 rounded-xl border text-xs font-bold"
                      style={{
                        backgroundColor: isDark ? '#18120E' : '#FFFFFF',
                        borderColor: isDark ? '#33261E' : '#D6C7B2',
                      }}
                    >
                      <option>30 - 50 Boxes</option>
                      <option>50 - 100 Boxes</option>
                      <option>100 - 500+ Boxes</option>
                    </select>
                    <input
                      type="tel"
                      value={corpPhone}
                      onChange={(e) => setCorpPhone(e.target.value)}
                      placeholder="মোবাইল নম্বর"
                      className="px-3 py-2 rounded-xl border text-xs font-semibold"
                      style={{
                        backgroundColor: isDark ? '#18120E' : '#FFFFFF',
                        borderColor: isDark ? '#33261E' : '#D6C7B2',
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setCorpSent(true)}
                    className="w-full py-3 rounded-xl bg-[#78350F] text-amber-50 text-xs font-black cursor-pointer"
                  >
                    কর্পোরেট ব্রোশিওর ও স্যাম্পল চান →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* PART 2: EXECUTIVE CUSTOMER REVIEWS                                */}
        {/* ================================================================= */}
        <div className="space-y-8">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#B45309]">
              Executive Patina &amp; Craft Reviews
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              <EditableText
                id="tannery71_reviews_h2"
                defaultText={
                  title ||
                  '৩৫,০০০+ কর্পোরেট এক্সিকিউটিভ, ব্যাংকার ও গিফট ক্রেতাদের আস্থার রিভিউ'
                }
              />
            </h3>
            <p className="text-xs sm:text-sm opacity-75">
              <EditableText
                id="tannery71_reviews_sub"
                defaultText={
                  subtitle ||
                  'যাঁরা সস্তা সিন্থেটিক ছেড়ে আমাদের ফুল-গ্রেইন খাঁটি চামড়ার আভিজাত্য বেছে নিয়েছেন।'
                }
              />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXECUTIVE_REVIEWS.map((rev) => (
              <div
                key={rev.name}
                className="p-6 rounded-3xl border flex flex-col justify-between space-y-4"
                style={{
                  backgroundColor: isDark ? '#16100C' : '#FFFFFF',
                  borderColor: isDark ? '#2E231C' : '#E5DDD0',
                }}
              >
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/15 text-[#92400E] dark:text-amber-300 text-[10px] font-black">
                    <Sparkles size={12} /> Verified Full-Grain Buyer
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed font-medium">{rev.quote}</p>
                </div>
                <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
                  <div className="text-xs font-black">{rev.name}</div>
                  <div className="text-[11px] opacity-70">{rev.designation}</div>
                  <div className="text-[10px] font-extrabold text-[#B45309] mt-1">
                    ✓ {rev.product}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* PART 3: 5-YEAR WARRANTY & AUTHENTICITY FAQ                        */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#B45309]">
              5-Year Warranty &amp; Returns Pledge
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              খাঁটি চামড়া ও ওয়ারেন্টি সংক্রান্ত প্রশ্নোত্তর
            </h3>
            <p className="text-xs leading-relaxed opacity-80">
              হাজারীবাগ ও সাভারের ঐতিহ্যবাহী ট্যানারি শিল্পীদের হাতে তৈরি প্রতিটি পণ্যের সাথে পাচ্ছেন ৫ বছরের লিখিত রিপ্লেসমেন্ট ওয়ারেন্টি কার্ড।
            </p>
            <div
              className="p-4 rounded-2xl border space-y-2 text-xs"
              style={{
                backgroundColor: isDark ? '#16100C' : '#FFFFFF',
                borderColor: isDark ? '#2E231C' : '#E5DDD0',
              }}
            >
              <div className="flex items-center gap-2 font-black text-[#B45309]">
                <PhoneCall size={14} />
                <span>কনসিয়ার্জ ও কর্পোরেট হটলাইন: +880 1711-XXXXXX</span>
              </div>
              <div className="flex items-center gap-2 opacity-75">
                <MapPin size={14} />
                <span>ফ্ল্যাগশিপ ক্রাফট স্টুডিও: রোড ১১, বনানী, ঢাকা-১২১৩</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {LEATHER_FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.q}
                  className="rounded-2xl border overflow-hidden"
                  style={{
                    backgroundColor: isDark ? '#16100C' : '#FFFFFF',
                    borderColor: isDark ? '#2E231C' : '#E5DDD0',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-black">{item.q}</span>
                    <ChevronDown
                      size={16}
                      className={`shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#B45309]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs leading-relaxed border-t pt-3 border-stone-200 dark:border-stone-800 opacity-85">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Heritage Copyright Bar */}
        <div className="pt-8 border-t border-stone-300 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#78350F] text-amber-50 flex items-center justify-center">
              <Briefcase size={16} />
            </div>
            <div>
              <span className="font-black">Tannery 71 (ট্যানারি ৭১ — খাঁটি লেদারক্রাফট)</span>
              <span className="block text-[10px] opacity-65">
                100% Export-Grade Full-Grain Leather Goods &amp; Executive Accessories
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] font-bold opacity-80">
            <span className="flex items-center gap-1">
              <Flame size={13} className="text-[#B45309]" /> 10-Second Burn-Test Guaranteed
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Award size={13} className="text-[#B45309]" /> 5-Year Leather Warranty
            </span>
            <span>·</span>
            <span>© {new Date().getFullYear()} tannery71.com.bd</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
