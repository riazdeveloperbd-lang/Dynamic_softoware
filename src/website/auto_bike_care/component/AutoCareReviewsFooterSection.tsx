import React, { useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  PhoneCall,
  MapPin,
  ShieldCheck,
  Wrench,
  Truck,
  ArrowUpRight,
  Car,
  Bike,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface AutoCareReviewsFooterSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

interface VerifiedDriverReview {
  id: string;
  name: string;
  role: string;
  vehicle: string;
  location: string;
  productPurchased: string;
  beforeAfterQuote: string;
  verifiedDate: string;
}

const VERIFIED_REVIEWS: VerifiedDriverReview[] = [
  {
    id: 'rev_1',
    name: 'Md. Rakibul Hasan (রাকিবুল হাসান)',
    role: 'Full-Time Pathao & Uber Moto Rider (10+ Hours/Day)',
    vehicle: 'Yamaha FZ-S FI V3 Deluxe',
    location: 'Mirpur-10, Dhaka',
    productPurchased: 'Complete Biker Touring & Traffic Kit (৳3,790)',
    beforeAfterQuote:
      '“দিনে ১০-১১ ঘণ্টা বাইক চালালে আগে কোমর ব্যথায় রাতে ঘুমানো যেত না আর বৃষ্টির মধ্যে কাস্টমারের কল রিসিভ করতে গিয়ে ফোন ভিজে যেত। TorqueGear-এর ৩ডি জেল সিট কুশন আর T-Com ওয়াটারপ্রুফ ইন্টারকম লাগানোর পর টানা রাইডেও কোনো ব্যথা নেই এবং বৃষ্টির মধ্যে হেলমেট না খুলেই কথা বলতে পারি।”',
    verifiedDate: 'Verified COD Purchase · 4 Days Ago',
  },
  {
    id: 'rev_2',
    name: 'Engr. Farhan Ahmed (ফারহান আহমেদ)',
    role: 'Private Car Owner & Corporate Executive',
    vehicle: 'Toyota Premio F-EX 2019 (Pearl White)',
    location: 'Banani, Dhaka',
    productPurchased: 'Ultimate Home Car Detailing & Wash Bundle (৳4,190)',
    beforeAfterQuote:
      '“প্রতি শুক্রবার ওয়াশ শপে গিয়ে ২ ঘণ্টা লাইনে দাঁড়িয়ে থাকা আর মাসে ২,০০০ টাকা খরচ করা একদম বন্ধ হয়ে গেছে। ৪৮ ভোল্ট প্রেশার ওয়াশার দিয়ে অ্যাপার্টমেন্টের গ্যারেজে ১ বালতি পানিতেই ফোম ওয়াশ করি। আর গ্রাফিন সিরামিক স্প্রে দেওয়ার পর আমার পার্ল হোয়াইট প্রিমিও গাড়িটি শোরুমের মতো চকচক করে!”',
    verifiedDate: 'Verified COD Purchase · 1 Week Ago',
  },
  {
    id: 'rev_3',
    name: 'Tanvirul Islam (তানভীরুল ইসলাম)',
    role: 'Cross-Country Motorcycle Tourer (BD Bikers Club)',
    vehicle: 'Suzuki Gixxer SF Fi ABS',
    location: 'Chattogram / Sajek Highway',
    productPurchased: '120W CANBUS Tri-Color LED Headlight + Ceramic Spray',
    beforeAfterQuote:
      '“সাজেক ও সিলেট হাইওয়েতে রাতের বেলা স্টক হেডলাইট দিয়ে কিছুই দেখা যেত না। ১২০ ওয়াট ক্যানবাস এলইডি বাল্বটি কোনো তার কাটা ছাড়াই নিজে ১০ মিনিটে লাগিয়েছি। কুয়াশা ও বৃষ্টির মধ্যে এর ৩০০০কে হলুদ আলো জীবন বাঁচানোর মতো কাজ করে। আলোর ফোকাস একদম নিখুঁত!”',
    verifiedDate: 'Verified COD Purchase · 2 Weeks Ago',
  },
];

const AUTO_CARE_FAQS = [
  {
    q: '১. গ্রাফিন ৯এইচ সিরামিক স্প্রে কি ম্যাট (Matte) এবং গ্লসি উভয় কালারের বাইক বা গাড়িতে ব্যবহার করা যাবে?',
    a: 'হ্যাঁ, ১০০%! আমাদের Graphene 9H Quick Ceramic Spray সকল প্রকার গ্লসি পেইন্ট, ম্যাট ফিনিশ, ক্রোম, অ্যালয় হুইল এবং উইন্ডশিল্ড গ্লাসে ব্যবহার করা সম্পূর্ণ নিরাপদ। এটি রঙের কোনো ক্ষতি করে না বরং সূর্যের UV রশ্মি ও অ্যাসিড রেইন থেকে ৪৫ দিন পর্যন্ত সুরক্ষা দেয়।',
  },
  {
    q: '২. ১২০ ওয়াট এলইডি হেডলাইট লাগালে কি বাইক বা গাড়ির ব্যাটারি ডাউন হবে বা ওয়ারিং কাটতে হবে?',
    a: 'একদমই না। এটি ১০০% প্লাগ-অ্যান্ড-প্লে (Plug & Play) এবং বিল্ট-ইন ক্যানবাস (CANBUS) ড্রাইভার যুক্ত। আপনার পুরাতন বাল্বটি খুলে সকেটে লাগিয়ে দিলেই হবে—কোনো তার কাটা বা মডিফিকেশনের প্রয়োজন নেই এবং ব্যাটারির ওপর কোনো বাড়তি চাপ পড়ে না।',
  },
  {
    q: '৩. ৪৮ ভোল্ট প্রেশার ওয়াশারটি চালাতে কি পানির ট্যাপ বা কারেন্টের লাইন লাগবে?',
    a: 'না! এটি সম্পূর্ণ কর্ডলেস (রিচার্জেবল লিথিয়াম ব্যাটারি চালিত) এবং সেলফ-প্রাইমিং (Self-Priming)। সাথে দেওয়া ৫ মিটার হোস পাইপটি যেকোনো পানির বালতিতে ডুবিয়ে রাখলেই মোটর নিজে থেকেই প্রবল বেগে পানি টেনে নেবে।',
  },
  {
    q: '৪. ডেলিভারি ম্যানের সামনে পার্সেল খুলে চেক করে টাকা দেওয়ার সুযোগ আছে কি?',
    a: 'অবশ্যই! আমরা সারা বাংলাদেশে ওপেন-বক্স ক্যাশ অন ডেলিভারি (Open-Box COD) দিচ্ছি। ডেলিভারি ম্যানের সামনে বক্স খুলে প্রোডাক্ট ও সকেট সাইজ মিলিয়ে দেখে তারপর পেমেন্ট করবেন। কোনো সমস্যা থাকলে সাথে সাথে রিটার্ন করতে পারবেন।',
  },
];

export const AutoCareReviewsFooterSection: React.FC<
  AutoCareReviewsFooterSectionProps
> = ({
  title,
  subtitle,
  primaryColor = '#E11D48',
  isDark = false,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);

  return (
    <div
      id="auto-reviews-footer-section"
      className={`w-full transition-colors ${
        isDark ? 'bg-[#090D16] text-slate-100' : 'bg-white text-slate-900'
      }`}
    >
      {/* ================================================================= */}
      {/* PART A: VERIFIED RIDER & CAR OWNER REVIEWS + FAQ                  */}
      {/* ================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20 space-y-16">
        {/* Testimonials Grid */}
        <div className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-bold tracking-wider uppercase text-rose-600 dark:text-rose-400">
              06. VERIFIED BANGLADESHI RIDER &amp; CAR OWNER PROOF
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              <EditableText
                id="auto_reviews_h2"
                defaultText={
                  title ||
                  '৪২,০০০+ বাইকার, প্রাইভেট কার ওনার এবং রাইড-শেয়ার ড্রাইভারদের বাস্তব অভিজ্ঞতা'
                }
              />
            </h2>
            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              <EditableText
                id="auto_reviews_subtitle"
                defaultText={
                  subtitle ||
                  'ঢাকা, চট্টগ্রাম ও সিলেটের প্রতিদিনের চালকদের যাচাইকৃত রিভিউ এবং বিফোর-আফটার ফিডব্যাক।'
                }
              />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VERIFIED_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className={`rounded-2xl border p-6 flex flex-col justify-between space-y-5 ${
                  isDark
                    ? 'bg-[#111827] border-slate-800'
                    : 'bg-[#F8FAFC] border-slate-200'
                }`}
              >
                <div className="space-y-3">
                  {/* Clean Unboxed Metadata */}
                  <div className="flex items-center justify-between text-xs font-bold text-amber-500">
                    <span>★★★★★ ৫.০ রেটিং</span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      ✓ {rev.verifiedDate}
                    </span>
                  </div>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isDark ? 'text-slate-200' : 'text-slate-700'
                    }`}
                  >
                    {rev.beforeAfterQuote}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-1 text-xs">
                  <div className="font-black text-sm">{rev.name}</div>
                  <div className="opacity-75 font-medium">{rev.role}</div>
                  <div className="text-[11px] font-mono font-bold" style={{ color: primaryColor }}>
                    বাহন: {rev.vehicle} · {rev.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical & Fitment FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="text-xs font-bold tracking-wider uppercase text-rose-600 dark:text-rose-400">
              FREQUENTLY ASKED QUESTIONS (সাধারণ জিজ্ঞাসা)
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              অর্ডার করার আগে আপনার মনে থাকা প্রশ্নের উত্তর
            </h3>
          </div>

          <div className="space-y-3">
            {AUTO_CARE_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.q}
                  className={`rounded-xl border transition-all ${
                    isDark
                      ? 'bg-[#111827] border-slate-800'
                      : 'bg-[#F8FAFC] border-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left text-xs sm:text-sm font-extrabold cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={16}
                      className={`shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs leading-relaxed opacity-85 border-t border-slate-200/70 dark:border-slate-800">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* PART B: QUIET AUTOMOTIVE SHOWROOM & DISPATCH HUB FOOTER           */}
      {/* ================================================================= */}
      <footer className="bg-[#060911] text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800/90">
            {/* Brand Column */}
            <div className="md:col-span-2 space-y-3">
              <div className="text-lg font-black tracking-tight text-white">
                TorqueGear BD — কার ও বাইক কেয়ার স্টুডিও
              </div>
              <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                বাংলাদেশের কার ওনার, বাইকার এবং রাইড-শেয়ার ড্রাইভারদের জন্য ১০০% জেনুইন ডিআইওয়াই (DIY) ডিটেইলিং গিয়ার এবং স্মার্ট অ্যাক্সেসরিজ। সরাসরি ইমপোর্টার ওয়ারেন্টি ও ওপেন-বক্স ক্যাশ অন ডেলিভারি।
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-rose-500" />
                  <span>উত্তরা সেক্টর ৪ ও তেজগাঁও অটো হাব, ঢাকা</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <PhoneCall size={14} className="text-emerald-400" />
                  <span className="font-mono">+880 1711-948200</span>
                </span>
              </div>
            </div>

            {/* Product Lineup Links */}
            <div className="space-y-2.5 text-xs">
              <div className="font-extrabold text-white uppercase tracking-wider">
                প্রোডাক্ট লাইনআপ
              </div>
              <ul className="space-y-2 text-slate-400">
                <li>Graphene 9H Ceramic Coating Spray</li>
                <li>T-Com IP67 Waterproof Intercom</li>
                <li>48V Cordless High-Pressure Washer</li>
                <li>120W CANBUS Tri-Color LED Headlight</li>
                <li>3D Air-Mesh &amp; Gel Seat Cushion</li>
              </ul>
            </div>

            {/* Customer Assurance */}
            <div className="space-y-2.5 text-xs">
              <div className="font-extrabold text-white uppercase tracking-wider">
                কাস্টমার পলিসি ও গ্যারান্টি
              </div>
              <ul className="space-y-2 text-slate-400">
                <li>ওপেন-বক্স ক্যাশ অন ডেলিভারি (COD)</li>
                <li>৭ দিনের ফ্রি সকেট ও সাইজ এক্সচেঞ্জ</li>
                <li>৬–১২ মাসের অফিসিয়াল ওয়ারেন্টি</li>
                <li>পাঠাও ও স্টেডফাস্ট এক্সপ্রেস কুরিয়ার</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <span>
              © {new Date().getFullYear()} TorqueGear BD (কার ও বাইক কেয়ার). সর্বস্বত্ব সংরক্ষিত।
            </span>
            <span>Dhaka · Chattogram · Sylhet · Rajshahi · Khulna Nationwide COD</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
