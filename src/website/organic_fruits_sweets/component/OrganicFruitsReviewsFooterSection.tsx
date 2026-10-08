import React, { useState } from 'react';
import {
  Leaf,
  Star,
  CheckCircle2,
  ChevronDown,
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  MapPin,
  Award,
  Truck,
} from 'lucide-react';
import {
  EditableText,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface OrganicFruitsReviewsFooterSectionProps {
  title: string;
  subtitle: string;
  variant: DoctorVariantId;
  primaryColor: string;
  isDark?: boolean;
}

const DHAKA_FAMILY_REVIEWS = [
  {
    id: 'rev_1',
    name: 'ডা. ফারহানা ইয়াসমিন (Dr. Farhana Yasmin)',
    role: 'শিশু বিশেষজ্ঞ ও মা • ধানমন্ডি ৯/এ, ঢাকা',
    batchTag: 'হিমসাগর আম (২৪ কেজি) ও খেজুরের গুড় (৫ কেজি)',
    quote:
      '“বাচ্চাদের জন্য বাজারের আম কিনতে ভয় পেতাম। এদের হিমসাগর আমের ক্যারেটের সাথে দেয়া ফরমালিন স্ট্রিপ দিয়ে বাসায় টেস্ট করে দেখেছি ০.০০ পিপিএম! একদম ছোটবেলার রাজশাহীর গাছপাকা আমের ঘ্রাণ পেয়েছি।”',
    rating: '5.0 ★',
  },
  {
    id: 'rev_2',
    name: 'ইঞ্জিনিয়ার মাহবুবুল আলম (Engr. Mahbubul Alam)',
    role: 'হেড অব প্রকিউরমেন্ট (কর্পোরেট গিফটিং) • গুলশান-২, ঢাকা',
    batchTag: 'কর্পোরেট গিফট অর্ডার: ১২০ কেজি হিমসাগর ও বেদানা লিচু',
    quote:
      '“আমাদের কোম্পানির ৩৫ জন ভিআইপি ক্লায়েন্টের বাসায় কাস্টম ব্র্যান্ডেড ক্যারেটে আম ও দিনাজপুরের বেদানা লিচু পাঠিয়েছি। প্রতিটি বক্স সঠিক ওজনে ও নির্ধারিত সময়ে পৌঁছেছে এবং ১৬% কর্পোরেট ছাড় পেয়েছি।”',
    rating: '5.0 ★',
  },
  {
    id: 'rev_3',
    name: 'নুসরাত জাহান চৌধুরী (Nusrat Jahan Chowdhury)',
    role: 'গৃহিণী ও ফুড ব্লগার • উত্তরা সেক্টর-৭, ঢাকা',
    batchTag: 'যশোরের নলেন পাটালি গুড় ও পাবনার ছানার সন্দেশ',
    quote:
      '“যশোরের চৌগাছার পাটালি গুড় আর নাটোরের কাঁচাগোল্লা দুটোই অসাধারণ! একটুও চিনি বা হাইড্রোজের গন্ধ নেই। ডেলিভারিম্যানের সামনেই বক্স খুলে খেয়ে দেখে ক্যাশ অন ডেলিভারিতে পেমেন্ট করেছি।”',
    rating: '4.98 ★',
  },
];

const ORCHARD_FAQS = [
  {
    q: '১. আপনাদের আম ও লিচুতে যে ফরমালিন বা কার্বাইড নেই, তার প্রমাণ কী?',
    a: 'আমরা নিজস্ব চুক্তিবদ্ধ বাগান থেকে সরকারি পাড়ার ক্যালেন্ডার (Mango Harvesting Calendar) মেনে শুধুমাত্র পরিপক্ক ফল সংগ্রহ করি। প্রতিটি ব্যাচ BCSIR ল্যাবে টেস্ট করা হয় এবং কাস্টমার চাইলে ডেলিভারির সময় বক্স খুলে খেয়ে ও টেস্ট কিট দিয়ে পরীক্ষা করে মূল্য পরিশোধ করতে পারেন।',
  },
  {
    q: '২. ২০ কেজি বা তার বেশি অর্ডার করলে কী কী সুবিধা পাবো?',
    a: '২০ কেজি+ অর্ডারে স্বয়ংক্রিয়ভাবে ৮% থেকে ১৬% পর্যন্ত বাগান মূল্য ছাড়, ঢাকা সিটিতে সম্পূর্ণ ফ্রি হোম ডেলিভারি এবং প্রতি ক্যারেটে ৪% অতিরিক্ত বোনাস ওজন দেওয়া হয়।',
  },
  {
    q: '৩. ডেলিভারির সময় কিছু আম বা মিষ্টি নষ্ট থাকলে কী করণীয়?',
    a: 'ব্রিদেবল প্লাস্টিক ক্যারেটে পাঠানোর ফলে ফল নষ্ট হওয়ার সম্ভাবনা খুবই কম। তবুও পরিবহনজনিত কারণে ১টি আমও ক্ষতিগ্রস্ত হলে ডেলিভারির সময় ছবি তুলে আমাদের হোয়াটসঅ্যাপে পাঠালে সাথে সাথে সমপরিমাণ মূল্য ফেরত বা পরবর্তী ব্যাচে ফ্রি রিপ্লেসমেন্ট দেওয়া হয়।',
  },
  {
    q: '৪. অর্ডার করার জন্য কি অগ্রিম টাকা (Advance Payment) দিতে হবে?',
    a: 'না, ঢাকা সিটি ও সাব-আর্ব এরিয়ায় ১ টাকাও অগ্রিম দিতে হয় না। পণ্য হাতে পেয়ে, ওজন ও মান দেখে ডেলিভারিম্যানকে নগদ টাকা অথবা বিকাশ/নগদে পেমেন্ট করতে পারবেন।',
  },
];

export const OrganicFruitsReviewsFooterSection: React.FC<
  OrganicFruitsReviewsFooterSectionProps
> = ({ title, subtitle, variant }) => {
  const [openFaq, setOpenFaq] = useState<number>(0);

  const isDarkVariant = variant === 'varient_3';

  return (
    <footer
      className="pt-14 pb-10 px-4 sm:px-6 lg:px-8 border-t"
      style={{
        backgroundColor: isDarkVariant ? '#0B1B13' : '#132A1E',
        borderColor: '#1E3F2E',
        color: '#FAF6EE',
        fontFamily: "'Plus Jakarta Sans', 'Hind Siliguri', sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto space-y-14">
        {/* =============================================================== */}
        {/* 1. DHAKA FAMILIES & CORPORATE CLIENTS VERIFIED REVIEWS          */}
        {/* =============================================================== */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D97706]/20 border border-[#D97706]/40 text-[#FDE047] text-xs font-extrabold">
              <Star size={13} className="fill-[#FDE047]" />
              <span>৮,৪০০+ ঢাকার পরিবার ও ১২০+ কর্পোরেট প্রতিষ্ঠানের আস্থা</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl font-black tracking-tight"
              style={{ fontFamily: "'Playfair Display', 'Hind Siliguri', serif" }}
            >
              <EditableText
                id="organic_reviews_heading"
                defaultText={
                  title ||
                  'আমাদের সম্মানিত গ্রাহকদের বাস্তব অভিজ্ঞতা ও রিভিউ'
                }
                as="span"
              />
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80">
              <EditableText
                id="organic_reviews_subheading"
                defaultText={
                  subtitle ||
                  'ধানমন্ডি, গুলশান, বনানী ও উত্তরার সচেতন পরিবার এবং কর্পোরেট ক্লায়েন্টদের যাচাইকৃত মতামত।'
                }
                as="span"
              />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DHAKA_FAMILY_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="rounded-3xl p-6 border border-emerald-700/50 bg-[#183627] flex flex-col justify-between space-y-4 shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-[#D97706]/25 text-[#FDE047] font-extrabold">
                      {rev.batchTag}
                    </span>
                    <span className="font-mono font-black text-[#FDE047]">
                      {rev.rating}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-emerald-50/95">
                    {rev.quote}
                  </p>
                </div>

                <div className="pt-3 border-t border-emerald-700/40 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-extrabold text-white">{rev.name}</div>
                    <div className="text-[11px] text-emerald-200/75">{rev.role}</div>
                  </div>
                  <CheckCircle2 size={16} className="text-[#FDE047] shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =============================================================== */}
        {/* 2. FREQUENTLY ASKED QUESTIONS (ORCHARD & SAFETY FAQ)            */}
        {/* =============================================================== */}
        <div className="max-w-4xl mx-auto space-y-4">
          <h3
            className="text-xl sm:text-2xl font-black text-center"
            style={{ fontFamily: "'Playfair Display', 'Hind Siliguri', serif" }}
          >
            সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (Orchard &amp; Formalin-Free FAQ)
          </h3>

          <div className="space-y-2.5">
            {ORCHARD_FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.q}
                  className="rounded-2xl border border-emerald-700/50 bg-[#183627] p-4"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full flex items-center justify-between gap-4 text-left text-xs sm:text-sm font-extrabold text-white cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      size={16}
                      className={`shrink-0 text-[#FDE047] transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-2.5 pt-2.5 border-t border-emerald-700/40 text-xs text-emerald-100/85 leading-relaxed">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* =============================================================== */}
        {/* 3. ORCHARD DISPATCH HUB & FOOTER LINKS                          */}
        {/* =============================================================== */}
        <div className="pt-8 border-t border-emerald-800/70 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#D97706] text-white flex items-center justify-center">
                <Leaf size={18} />
              </div>
              <div>
                <div
                  className="text-base font-extrabold text-white"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Seasonal Organic Fruits &amp; Pure Sweets
                </div>
                <div className="text-[11px] text-[#FDE047]">
                  আম, খেজুরের গুড় ও কেমিক্যাল-মুক্ত ফল • Direct from Orchard
                </div>
              </div>
            </div>
            <p className="text-emerald-100/75 max-w-md leading-relaxed">
              চাঁপাইনবাবগঞ্জ, রাজশাহী, দিনাজপুর, যশোর ও নাটোরের নিজস্ব চুক্তিবদ্ধ বাগান ও কারিগরদের থেকে ১০০% ফরমালিন ও ভেজালমুক্ত মৌসুমি ফল ও মিষ্টি সরাসরি আপনার পরিবারের কাছে।
            </p>
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#FDE047] font-bold">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck size={13} /> BCSIR Lab Tested
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Award size={13} /> GI-Tagged Orchards
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Truck size={13} /> 24-Hr Dhaka Cold-Van
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-extrabold uppercase tracking-wider text-[#FDE047]">
              বাগান কালেকশন হাব (Orchard Hubs)
            </div>
            <ul className="space-y-1.5 text-emerald-100/80">
              <li className="flex items-center gap-1.5">
                <MapPin size={12} className="text-[#D97706]" />
                <span>কানসাট ও শিবগঞ্জ, চাঁপাইনবাবগঞ্জ</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin size={12} className="text-[#D97706]" />
                <span>বিরল ও মাধববাটি, দিনাজপুর</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin size={12} className="text-[#D97706]" />
                <span>চৌগাছা খেজুর বাগান, যশোর</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin size={12} className="text-[#D97706]" />
                <span>ঢাকা ডিস্ট্রিবিউশন: তেজগাঁও ও উত্তরা</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-extrabold uppercase tracking-wider text-[#FDE047]">
              হটলাইন ও কর্পোরেট অর্ডার
            </div>
            <div className="space-y-2 text-emerald-100/85">
              <div className="flex items-center gap-1.5 font-mono font-bold text-white">
                <PhoneCall size={13} className="text-[#FDE047]" />
                <span>+880 1713-882400</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle size={13} className="text-emerald-400" />
                <span>WhatsApp Live Video Orchard Tour</span>
              </div>
              <div className="p-2.5 rounded-xl bg-black/25 border border-emerald-700/50 text-[11px]">
                সকাল ৮:০০টা – রাত ১১:০০টা (সপ্তাহে ৭ দিন)
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-emerald-200/65">
          <span>
            © {new Date().getFullYear()} Seasonal Organic Fruits &amp; Pure Sweets (আম, খেজুরের গুড় ও কেমিক্যাল-মুক্ত ফল). All rights reserved.
          </span>
          <span>100% Formalin-Free Guarantee • Trade License #DNCC-2026-88412</span>
        </div>
      </div>
    </footer>
  );
};
