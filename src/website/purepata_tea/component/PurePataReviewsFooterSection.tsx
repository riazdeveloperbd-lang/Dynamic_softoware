import React, { useState } from 'react';
import {
  Leaf,
  ChevronDown,
  PhoneCall,
  MapPin,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface PurePataReviewsFooterSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

const CONNOISSEUR_REVIEWS = [
  {
    id: 'rev_tea_1',
    name: 'Barrister Samira Mahmud (সামিরা মাহমুদ)',
    role: 'Corporate Counsel & Tea Connoisseur · Gulshan-2, Dhaka',
    blendPurchased: 'Executive Morning-to-Night 3-Tin Refill Box',
    quote:
      '“আগে বিদেশি ব্র্যান্ডের গ্রিন টি-ব্যাগ খেতাম, কিন্তু এক চুমুক দিলেই তিতা লাগত। PurePata-এর পঞ্চগড় অর্গানিক হোল-লিফ গ্রিন টি ৮০°C পানিতে ২ মিনিট ভিজিয়ে খাওয়ার পর বুঝেছি আসল সতেজ পাতার চা কাকে বলে! মিষ্টি ঘ্রাণ আর একদমই তিতা নয়। আমার অফিসের ডেস্কে এখন সবসময় এদের ইকো-টিন থাকে।”',
    verifiedBadge: 'Monthly Refill Member · 6 Months',
  },
  {
    id: 'rev_tea_2',
    name: 'Dr. Arman Hossain (ডা. আরমান হোসেন)',
    role: 'Clinical Nutritionist & Fitness Coach · Nasirabad, Chattogram',
    blendPurchased: 'Sacred Tulsi-Ginger & Blue Butterfly Pea Tea',
    quote:
      '“আমার ক্লায়েন্টদের ওয়েট লস এবং স্ট্রেস কমানোর জন্য আমি সবসময় অক্ষত পাতার (Whole-Leaf) ভেষজ চা সাজেস্ট করি। PurePata-এর অপরাজিতা ফুলের চা রাতে ঘুমানোর আগে পান করলে অসাধারণ প্রশান্তি পাওয়া যায় এবং এদের তুলসী-আদা ব্লেন্ডে কোনো কৃত্রিম ফ্লেভার নেই—সরাসরি প্রাকৃতিক ভেষজের নির্যাস।”',
    verifiedBadge: 'Verified Wellness Partner · Chattogram',
  },
  {
    id: 'rev_tea_3',
    name: 'Tariqul Alam Chowdhury (তারিকুল আলম চৌধুরী)',
    role: 'Managing Director, FinTech Venture · Banani & Sylhet',
    blendPurchased: 'Master Connoisseur All-5 Blends Collection (Corporate Gift)',
    quote:
      '“সিলেটের মানুষ হিসেবে খাঁটি অর্থোডক্স ব্ল্যাক টি-এর স্বাদ আমি চিনি। শ্রীমঙ্গলের বাগান থেকে মাত্র ৭২ ঘণ্টার মধ্যে প্যাক করা এদের FTGFOP1 ব্ল্যাক টি এবং শাহী মাসালা চা সত্যিই বিশ্বমানের। গত মাসে আমাদের বোর্ড মেম্বারদের জন্য ৩০টি গিফট বক্স অর্ডার করেছিলাম—সবাই মুগ্ধ!”',
    verifiedBadge: 'Corporate Gifting Client · Verified COD',
  },
];

const TEA_WELLNESS_FAQS = [
  {
    q: '১. সাধারণ সুপারমার্কেটের টি-ব্যাগের চেয়ে PurePata হোল-লিফ (Whole-Leaf) চায়ের পার্থক্য কী?',
    a: 'সাধারণ টি-ব্যাগে থাকে চায়ের সবচেয়ে নিচের গ্রেডের গুঁড়া বা ডাস্ট (CTC Dust), যা বাগান থেকে তোলার ৬–১০ মাস পর প্যাকেটজাত হয় এবং ব্লিচ করা কাগজের ব্যাগে মাইক্রোপ্লাস্টিক থাকে। অন্যদিকে PurePata শুধুমাত্র গাছের উপরের কচি দুটি পাতা ও একটি কুঁড়ি (Whole Leaf) বাগান থেকে তোলার ৭২ ঘণ্টার মধ্যে এয়ারটাইট টিনে প্যাক করে—যাতে ৯৪% অ্যান্টিঅক্সিডেন্ট ও প্রাকৃতিক ঘ্রাণ অক্ষুণ্ণ থাকে।',
  },
  {
    q: '২. এক টিন চা দিয়ে মোট কত কাপ চা তৈরি করা যায় এবং পাতা কি দ্বিতীয়বার ব্যবহার করা যায়?',
    a: 'আমাদের ১০০ গ্রামের একটি ইকো-টিন থেকে প্রথম ব্রিউতে প্রায় ৫০ কাপ চা তৈরি হয়। যেহেতু এগুলো সম্পূর্ণ অক্ষত পাতা (Whole Leaf), তাই একই পাতা দ্বিতীয়বার (এবং গ্রিন টি তৃতীয়বার) গরম পানিতে ভিজিয়ে অনায়াসে ১০০+ কাপ চা উপভোগ করতে পারবেন।',
  },
  {
    q: '৩. মাসিক টি-রিফিল সাবস্ক্রিপশন (Monthly Refill Box) কীভাবে কাজ করে? অগ্রিম টাকা দিতে হয় কি?',
    a: 'কোনো অগ্রিম টাকা বা কার্ড পেমেন্ট লাগবে না! আপনি প্রথমবার ১৫% ছাড়ে ইকো-টিন বক্সটি ক্যাশ অন ডেলিভারিতে পাবেন। এরপর আপনার নির্বাচিত ৩০ বা ৪৫ দিন পর পর আমরা ডেলিভারির আগে আপনাকে এসএমএস/হোয়াটসঅ্যাপে জানাবো এবং রিফিল প্যাক পৌঁছে গেলে ডেলিভারি ম্যানের কাছে ক্যাশ পেমেন্ট করবেন। যেকোনো সময় ১ মেসেজেই পজ বা বাতিল করতে পারবেন।',
  },
  {
    q: '৪. অপরাজিতা চা (Blue Tea) এবং তুলসী-আদা চা কি ডায়াবেটিস বা প্রেশারের রোগীরা পান করতে পারবেন?',
    a: 'হ্যাঁ, আমাদের সবগুলো ব্লেন্ড ১০০% চিনিমুক্ত, প্রিজারভেটিভমুক্ত এবং প্রাকৃতিক ভেষজ উপাদানে তৈরি। বিশেষ করে নীল অপরাজিতা ফুলের চা শতভাগ ক্যাফেইন-মুক্ত হওয়ায় ডায়াবেটিস ও উচ্চ রক্তচাপের রোগীদের জন্য অত্যন্ত উপকারী।',
  },
];

export const PurePataReviewsFooterSection: React.FC<
  PurePataReviewsFooterSectionProps
> = ({
  title,
  subtitle,
  primaryColor = '#1E4620',
  isDark = false,
}) => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number>(0);

  return (
    <div
      id="purepata-reviews-footer-section"
      className={`w-full transition-colors ${
        isDark ? 'bg-[#0C1712] text-stone-100' : 'bg-[#FAF7F2] text-[#1C2822]'
      }`}
    >
      {/* ================================================================= */}
      {/* PART A: METRO TEA CONNOISSEUR REVIEWS & WELLNESS FAQ              */}
      {/* ================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20 space-y-16">
        <div className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <div
              className="text-xs font-bold tracking-wider uppercase"
              style={{ color: isDark ? '#A7F3D0' : primaryColor }}
            >
              06. TEA CONNOISSEUR &amp; WELLNESS COMMUNITY NOTES
            </div>
            <h2
              className="text-2xl sm:text-3xl font-black tracking-tight"
              style={{
                fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
              }}
            >
              <EditableText
                id="purepata_reviews_h2"
                defaultText={
                  title ||
                  'ঢাকা, চট্টগ্রাম ও সিলেটের সচেতন চা-প্রেমী, পুষ্টিবিদ ও কর্পোরেট এক্সিকিউটিভদের মতামত'
                }
              />
            </h2>
            <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
              <EditableText
                id="purepata_reviews_subtitle"
                defaultText={
                  subtitle ||
                  'যাঁরা প্রতিদিনের টি-ব্যাগ ছেড়ে আমাদের গার্ডেন-ডিরেক্ট হোল-লিফ ও ভেষজ চায়ের সতেজতায় ফিরেছেন।'
                }
              />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONNOISSEUR_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className={`rounded-2xl border p-6 flex flex-col justify-between space-y-5 ${
                  isDark
                    ? 'bg-[#11221A] border-emerald-900/80'
                    : 'bg-white border-[#E4DFD5]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-700 dark:text-amber-300">
                    <span>★★★★★ ৫.০ রেটিং</span>
                    <span
                      style={{ color: isDark ? '#A7F3D0' : primaryColor }}
                    >
                      ✓ {rev.verifiedBadge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                    {rev.quote}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E4DFD5] dark:border-emerald-900 space-y-1 text-xs">
                  <div
                    className="font-black text-sm"
                    style={{
                      fontFamily:
                        "'Fraunces', 'Playfair Display', Georgia, serif",
                    }}
                  >
                    {rev.name}
                  </div>
                  <div className="opacity-75 font-medium">{rev.role}</div>
                  <div
                    className="text-[11px] font-mono font-bold"
                    style={{ color: isDark ? '#FCD34D' : primaryColor }}
                  >
                    পছন্দের ব্লেন্ড: {rev.blendPurchased}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wellness & Brewing FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div
              className="text-xs font-bold tracking-wider uppercase"
              style={{ color: isDark ? '#A7F3D0' : primaryColor }}
            >
              FREQUENTLY ASKED QUESTIONS (সাধারণ জিজ্ঞাসা)
            </div>
            <h3
              className="text-xl sm:text-2xl font-black"
              style={{
                fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
              }}
            >
              হোল-লিফ চা, ব্রিউইং ও রিফিল সাবস্ক্রিপশন বিষয়ক প্রশ্নোত্তর
            </h3>
          </div>

          <div className="space-y-3">
            {TEA_WELLNESS_FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={faq.q}
                  className={`rounded-xl border transition-all ${
                    isDark
                      ? 'bg-[#11221A] border-emerald-900'
                      : 'bg-white border-[#E4DFD5]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
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
                    <div className="px-5 pb-4 pt-1 text-xs leading-relaxed opacity-85 border-t border-[#E4DFD5] dark:border-emerald-900">
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
      {/* PART B: QUIET BOTANICAL ESTATE FOOTER                             */}
      {/* ================================================================= */}
      <footer className="bg-[#0B1911] text-stone-300 border-t border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-emerald-900/60">
            <div className="md:col-span-2 space-y-3">
              <div
                className="text-lg font-black tracking-tight text-white"
                style={{
                  fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
                }}
              >
                PurePata Botanicals (পিওরপাতা বোটানিক্যালস)
              </div>
              <p className="text-xs text-stone-400 max-w-md leading-relaxed">
                শ্রীমঙ্গল ও পঞ্চগড়ের বাগান থেকে সরাসরি সংগৃহীত ১০০% কেমিক্যাল-মুক্ত হোল-লিফ অর্গানিক চা এবং ভেষজ ওয়েলনেস ব্লেন্ড। প্লাস্টিকমুক্ত ফুড-গ্রেড ইকো টিনে বাংলাদেশের ঐতিহ্যবাহী চা সংস্কৃতির সাথে আধুনিক সুস্থতার মেলবন্ধন।
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300 pt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-amber-400" />
                  <span>বাগান হাব: শ্রীমঙ্গল, মৌলভীবাজার · কর্পোরেট স্টুডিও: বনানী, ঢাকা</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <PhoneCall size={14} className="text-emerald-400" />
                  <span className="font-mono">+880 1711-884920</span>
                </span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="font-extrabold text-white uppercase tracking-wider">
                সিগনেচার কালেকশন
              </div>
              <ul className="space-y-2 text-stone-400">
                <li>Sreemangal Orthodox Black Tea</li>
                <li>Panchagarh Organic Green Tea</li>
                <li>Blue Butterfly Pea Flower Tea</li>
                <li>Sacred Tulsi-Ginger Wellness Blend</li>
                <li>Immunity-Boosting Royal Masala Chai</li>
              </ul>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="font-extrabold text-white uppercase tracking-wider">
                এস্টেট ও মেম্বারশিপ
              </div>
              <ul className="space-y-2 text-stone-400">
                <li>Garden-to-Cup 72hr Traceability</li>
                <li>Monthly Tea Refill Club (-15%)</li>
                <li>Corporate &amp; Festive Tea Gifting</li>
                <li>BCSIR &amp; Organic Lab Certifications</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
            <span>
              © {new Date().getFullYear()} PurePata Botanicals (পিওরপাতা বোটানিক্যালস). সর্বস্বত্ব সংরক্ষিত।
            </span>
            <span>Sreemangal · Panchagarh · Dhaka · Chattogram · Sylhet</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
