import React, { useState } from 'react';
import {
  HeartHandshake,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Baby,
  PhoneCall,
  MapPin,
  Sparkles,
  MessageCircleHeart,
  PlayCircle,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface SmartBabuParentCommunityFooterSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

const PARENT_COMMUNITY_REVIEWS = [
  {
    parentName: 'ফারজানা করিম (মা ও স্কুল শিক্ষিকা)',
    location: 'ধানমন্ডি, ঢাকা',
    groupBadge: 'Posted in: Bangladeshi Moms & Toddlers Care Group (48k+ Members)',
    babyAge: '২ বছর ৪ মাস বয়সী বাবুর মা',
    productBought: '৩-ইন-১ বাংলা/ইংরেজি/আরবি টকিং বুক + মন্টেসরি কাঠের পাজল',
    quote:
      '“আমার ছেলে রাইয়ান আগে মোবাইল কার্টুন ছাড়া এক লোকমা ভাতও খেত না। প্যারেন্টিং গ্রুপে আপুদের রিভিউ দেখে স্মার্টবাবুর ৩-ইন-১ টকিং বুকটা অর্ডার করি। আলহামদুলিল্লাহ, মাত্র ৩ সপ্তাহে ও নিজে নিজে আঙুল দিয়ে চেপে অ-আ এবং আলিফ-বা-তা উচ্চারণ করতে শিখেছে! বইটার পাতাগুলো সত্যিই ওয়াটারপ্রুফ, বাবু ছিঁড়তে পারে না।”',
    unboxingHighlight: 'ভিডিও আনবক্সিং: স্পষ্ট দেশি বাংলা ও শুদ্ধ মাখরাজে আরবি সাউন্ড কোয়ালিটি',
  },
  {
    parentName: 'ডা. তানজিলা হক (শিশু স্বাস্থ্য কনসালটেন্ট ও মা)',
    location: 'খুলশী, চট্টগ্রাম',
    groupBadge: 'Posted in: Conscious Parenting & Montessori BD Community',
    babyAge: '৭ মাস বয়সী কন্যা সন্তানের মা',
    productBought: 'জার্মান PPSU অ্যান্টি-কলিক ফিডিং বোতল ও অর্গানিক মসলিন সেট',
    quote:
      '“চিকিৎসক হিসেবে আমি সবসময় BPA-Free এবং মেডিকেল-গ্রেড PPSU বোতলের পরামর্শ দিই। স্মার্টবাবুর অ্যান্টি-কলিক বোতলটির ভেন্ট ভালভ এত সুন্দর কাজ করে যে আমার বাবুর রাতের বেলা গ্যাসের কান্না একদমই বন্ধ হয়ে গেছে। আর ওদের অর্গানিক মসলিন রমপারগুলো গরমে বাবুর ত্বকে কোনো র‍্যাশ হতে দেয় না।”',
    unboxingHighlight: 'ল্যাব সার্টিফিকেট ও ১৮০°C বয়েলিং ওয়াটার টেস্টে ১০০% উত্তীর্ণ',
  },
  {
    parentName: 'রাশেদুল ইসলাম ও নুসরাত জাহান',
    location: 'উত্তরা সেক্টর-১১, ঢাকা',
    groupBadge: 'Posted in: Dhaka Young Parents & Baby Gear Review Club',
    babyAge: 'ভাতিজার আকিকা উপহার (Akika Gift)',
    productBought: 'নবজাতক ও আকিকা রয়েল কেয়ার গিফট বক্স (+ গিফট র‍্যাপিং)',
    quote:
      '“ভাতিজার আকিকাতে কমন কাপড় না দিয়ে স্মার্টবাবুর গিফট বান্ডেলটা গিফট র‍্যাপ করে পাঠিয়েছিলাম। স্যাটিন রিবন আর বাবুর নামে লেখা উইশ কার্ডটা দেখে বাসার সবাই মুগ্ধ! ডেলিভারি ম্যানের সামনে চেক করে টাকা দেওয়ার সুবিধা থাকায় অনলাইনে অর্ডার করতে কোনো দুশ্চিন্তা হয়নি।”',
    unboxingHighlight: 'প্রিমিয়াম গিফট র‍্যাপিং ও ২৪ ঘণ্টায় উত্তরায় হোম ডেলিভারি',
  },
];

const SMARTBABU_FAQS = [
  {
    q: '১. টকিং অডিও বুকটিতে কি ব্যাটারি কিনতে হয়, নাকি চার্জ দেওয়া যায়?',
    a: 'আমাদের নতুন ভার্সনের ৩-ইন-১ টকিং বুকটি সম্পূর্ণ USB Type-C রিকার্জেবল! বারবার পেন্সিল ব্যাটারি কেনার ঝামেলা নেই। একবার ১ ঘণ্টা চার্জ দিলে টানা ৭–১০ দিন বাবু অনায়াসে খেলতে ও শিখতে পারবে।',
  },
  {
    q: '২. কাঠের মন্টেসরি পাজলগুলো বাবু মুখে দিলে কি রঙের কোনো ক্ষতি হবে?',
    a: 'একদমই না। আমাদের সব কাঠের খেলনায় ১০০% ফুড-গ্রেড ওয়াটার-বেসড নন-টক্সিক রঙ (Lead & Phthalate Free) ব্যবহার করা হয় এবং কোণাগুলো লেজার-পলিশড। বাবু মুখে দিলেও রঙ উঠবে না বা কোনো ক্ষতি হবে না।',
  },
  {
    q: '৩. ডেলিভারি ম্যানের সামনে কি অডিও বুক চালিয়ে চেক করে নেওয়া যাবে?',
    a: 'অবশ্যই! আমরা ১০০% ওপেন-বক্স ক্যাশ অন ডেলিভারি সাপোর্ট করি। ডেলিভারি ম্যানের সামনে প্যাকেট খুলে বইয়ের সাউন্ড, কাঠের ফিনিশিং ও বোতল চেক করে তারপর মূল্য পরিশোধ করবেন।',
  },
  {
    q: '৪. আকিকা বা জন্মদিনের জন্য সরাসরি আত্মীয়ের বাসায় গিফট র‍্যাপ করে পাঠাতে পারব?',
    a: 'জি! চেকআউট ফর্মে মাত্র ৳৯০-এ "প্রিমিয়াম গিফট র‍্যাপিং ও উইশ কার্ড" অপশনটি টিক দিন এবং বাবুর নাম ও আপনার শুভেচ্ছা বার্তা লিখে দিন। আমরা প্রাইস-ট্যাগ সরিয়ে সুন্দর গিফট বক্সে পৌঁছে দেবো।',
  },
];

export const SmartBabuParentCommunityFooterSection: React.FC<
  SmartBabuParentCommunityFooterSectionProps
> = ({ title, subtitle, isDark = false }) => {
  const [openFaq, setOpenFaq] = useState<number>(0);

  return (
    <footer
      id="smartbabu-parent-reviews"
      className="pt-16 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-t"
      style={{
        backgroundColor: isDark ? '#090F1A' : '#F8FAFC',
        borderColor: isDark ? '#1E293B' : '#E2E8F0',
        color: isDark ? '#F8FAFC' : '#0F172A',
      }}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* ================================================================= */}
        {/* PART 1: PARENTING COMMUNITY SOCIAL PROOF & UNBOXING STORIES       */}
        {/* ================================================================= */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold bg-teal-500/15 text-[#0D9488] dark:text-teal-300">
                <MessageCircleHeart size={14} />
                <span>Parenting Community Social Proof (ফেসবুক প্যারেন্টিং গ্রুপের মায়েদের রিভিউ)</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-black tracking-tight"
                style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}
              >
                <EditableText
                  id="smartbabu_reviews_h2"
                  defaultText={
                    title ||
                    '৪২,০০০+ সচেতন বাংলাদেশি মা-বাবা ও প্যারেন্টিং কমিউনিটির বাস্তব অভিজ্ঞতা'
                  }
                />
              </h2>
              <p
                className="text-xs sm:text-sm"
                style={{ color: isDark ? '#94A3B8' : '#475569' }}
              >
                <EditableText
                  id="smartbabu_reviews_sub"
                  defaultText={
                    subtitle ||
                    'যাঁরা মোবাইল কার্টুনের বদলে সোনামণির হাতে তুলে দিয়েছেন আমাদের নিরাপদ লার্নিং খেলনা ও বেবি কেয়ার প্রোডাক্ট।'
                  }
                />
              </p>
            </div>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border bg-white dark:bg-[#131C2E] border-slate-200 dark:border-slate-800 text-xs font-extrabold">
              <Sparkles size={15} className="text-[#F97316]" />
              <span>৪.৯৪/৫.০ রেটিং · ৪,৮০০+ ভেরিফাইড আনবক্সিং রিভিউ</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PARENT_COMMUNITY_REVIEWS.map((rev) => (
              <div
                key={rev.parentName}
                className="p-6 rounded-3xl border flex flex-col justify-between space-y-4 shadow-xs"
                style={{
                  backgroundColor: isDark ? '#131C2E' : '#FFFFFF',
                  borderColor: isDark ? '#1E293B' : '#E2E8F0',
                }}
              >
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-500/10 text-[#0D9488] dark:text-teal-300 text-[10px] font-black">
                    <HeartHandshake size={12} />
                    <span>{rev.groupBadge}</span>
                  </div>

                  <p
                    className="text-xs sm:text-sm leading-relaxed font-medium"
                    style={{ color: isDark ? '#E2E8F0' : '#1E293B' }}
                  >
                    {rev.quote}
                  </p>

                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] font-bold text-amber-800 dark:text-amber-300 flex items-center gap-2">
                    <PlayCircle size={15} className="text-[#F97316] shrink-0" />
                    <span>{rev.unboxingHighlight}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div
                    className="text-xs font-black"
                    style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}
                  >
                    {rev.parentName}
                  </div>
                  <div className="text-[11px] opacity-70">
                    {rev.babyAge} · {rev.location}
                  </div>
                  <div className="text-[10px] font-extrabold text-[#0D9488] mt-1">
                    ✓ কেনা প্রোডাক্ট: {rev.productBought}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* PART 2: FREQUENTLY ASKED QUESTIONS FOR PARENTS                    */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#EA580C]">
              Parent FAQ &amp; Care Support
            </span>
            <h3
              className="text-xl sm:text-2xl font-black"
              style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}
            >
              মা-বাবাদের সচরাচর জিজ্ঞাসিত প্রশ্ন ও উত্তর
            </h3>
            <p
              className="text-xs leading-relaxed"
              style={{ color: isDark ? '#94A3B8' : '#475569' }}
            >
              আপনার সোনামণির বয়স অনুযায়ী কোন খেলনা বা ফিডিং বোতলটি সবচেয়ে ভালো হবে তা জানতে সরাসরি আমাদের চাইল্ড-ডেভেলপমেন্ট হেল্পলাইনে কথা বলুন।
            </p>
            <div
              className="p-4 rounded-2xl border space-y-2"
              style={{
                backgroundColor: isDark ? '#131C2E' : '#FFFFFF',
                borderColor: isDark ? '#1E293B' : '#E2E8F0',
              }}
            >
              <div className="flex items-center gap-2 text-xs font-black text-[#0D9488]">
                <PhoneCall size={15} />
                <span>হেল্পলাইন ও হোয়াটসঅ্যাপ: +880 1711-XXXXXX (সকাল ৯টা – রাত ১১টা)</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] opacity-75">
                <MapPin size={14} />
                <span>ডিসপ্লে ও ডিসপ্যাচ সেন্টার: বাড়ি ২৪, রোড ৭, ধানমন্ডি, ঢাকা-১২০৫</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {SMARTBABU_FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.q}
                  className="rounded-2xl border overflow-hidden"
                  style={{
                    backgroundColor: isDark ? '#131C2E' : '#FFFFFF',
                    borderColor: isDark ? '#1E293B' : '#E2E8F0',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span
                      className="text-xs sm:text-sm font-black"
                      style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}
                    >
                      {item.q}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#0D9488]' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div
                      className="px-5 pb-4 text-xs leading-relaxed border-t pt-3"
                      style={{
                        borderColor: isDark ? '#1E293B' : '#F1F5F9',
                        color: isDark ? '#CBD5E1' : '#475569',
                      }}
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* PART 3: BOTTOM SITE STRUCTURE FOOTER                              */}
        {/* ================================================================= */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0D9488] text-white flex items-center justify-center">
              <Baby size={17} />
            </div>
            <div>
              <span className="font-black">SmartBabu Essentials (স্মার্টবাবু)</span>
              <span className="block text-[10px] opacity-65">
                100% BPA-Free Educational Toys &amp; Baby Care in Bangladesh
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] font-bold opacity-80">
            <span className="flex items-center gap-1">
              <ShieldCheck size={13} className="text-[#0D9488]" /> EN71 &amp; FDA Certified
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 size={13} className="text-[#F97316]" /> ওপেন-বক্স ক্যাশ অন ডেলিভারি
            </span>
            <span>·</span>
            <span>© {new Date().getFullYear()} smartbabu.com.bd</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
