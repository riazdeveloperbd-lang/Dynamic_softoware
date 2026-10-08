import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  ChevronDown,
  PhoneCall,
  MapPin,
  Droplets,
  Award,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface RoohReviewsFooterSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

const CUSTOMER_REVIEWS = [
  {
    name: 'ব্যারিস্টার আরিফুর রহমান',
    role: 'সুপ্রিম কোর্ট আইনজীবী · গুলশান-২, ঢাকা',
    scentBought: 'কম্বোডিয়ান শাহী উদ আল-মালিকি (১২ মিলি তোলা)',
    rating: '5.0 ★',
    quote:
      '“জুম্মার নামাজে পাঞ্জাবিতে মাত্র দুই ফোঁটা শাহী উদ আল-মালিকি লাগিয়ে গিয়েছিলাম। নামাজ শেষে মসজিদের ইমাম সাহেবসহ তিনজন মুসল্লি এসে জিজ্ঞেস করলেন ভাই আতরটা কোথা থেকে নিয়েছেন! দুই দিন পর পাঞ্জাবি ওয়াশ করার পরও কলার থেকে রাজকীয় আগরউডের ঘ্রাণ যাচ্ছিল না।”',
    verifiedTag: 'স্থায়িত্ব: ৪৮+ ঘণ্টা প্রমাণিত',
  },
  {
    name: 'ইঞ্জিনিয়ার সাদমান সাকিব',
    role: 'সিনিয়র সফটওয়্যার আর্কিটেক্ট · উত্তরা, ঢাকা',
    scentBought: '৫টি আতরের ডিসকভারি বক্স + ব্লু ডি আরাবিয়া',
    rating: '5.0 ★',
    quote:
      '“আগে ফরাসি অ্যালকোহল স্প্রে পারফিউম ব্যবহার করতাম, কিন্তু নামাজের সময় মনের ভেতর খুঁতখুঁত থাকত এবং রোদে গেলেই ১ ঘণ্টায় গন্ধ উবে যেত। রুহ পারফিউমারির ৯৯০ টাকার ডিসকভারি বক্স নিয়ে টেস্ট করার পর ব্লু ডি আরাবিয়া আর হোয়াইট তাহারা মাস্ক আমার ডেইলি অফিস সিগনেচার হয়ে গেছে।”',
    verifiedTag: '১০০% হালাল ও অফিস ফ্রেন্ডলি',
  },
  {
    name: 'ডা. তাসনিম জেরিন ও তাঁর পরিবার',
    role: 'কনসালটেন্ট চিকিৎসক · খুলশী, চট্টগ্রাম',
    scentBought: 'ঈদ রয়্যাল গিফট বক্স (বাখুর আল-মদিনা + তাইফ রোজ)',
    rating: '5.0 ★',
    quote:
      '“আব্বুর জন্য গত রমজানে বাখুর আল-হারামাইন ও সৌদি তাইফ গোলাপের গিফট বক্সটি অর্ডার করেছিলাম। বৃহস্পতিবার মাগরিবের পর ইলেকট্রিক বার্নারে এক টুকরো বাখুর দিলে পুরো বাসা মদিনা শরীফের রওজার মতো পবিত্র সুবাসে ভরে ওঠে। কোনো কৃত্রিম ঝাঁঝ বা মাথা ব্যথা নেই।”',
    verifiedTag: 'সেরা পারিবারিক ও ঈদ উপহার',
  },
];

const ROOH_FAQS = [
  {
    q: '১. আপনাদের আতর ও পকেট স্প্রে দিয়ে কি পাঁচ ওয়াক্ত নামাজ ও ওমরাহর ইহরাম পড়া যাবে?',
    a: 'জি, শতভাগ! আমাদের প্রতিটি আতর, ডিজাইনার ইনস্পিরেশন অয়েল এবং ওয়াটার-বেজড পকেট স্প্রেতে ০% অ্যালকোহল (No Ethanol / No Rectified Spirit) এবং কোনো প্রাণীজ উপাদান নেই। তাই পাঁচ ওয়াক্ত নামাজ, জুম্মা ও হজ্জ-ওমরাহতে নিঃসন্দেহে ব্যবহার করতে পারবেন।',
  },
  {
    q: '২. অনলাইনে ঘ্রাণ না শুঁকে অর্ডার করলে যদি আমার পছন্দ না হয়?',
    a: 'এই সমস্যার সমাধানের জন্যই আমরা রেখেছি ৳৯৯০ টাকার “৫টি আতরের ডিসকভারি বক্স (Discovery Sample Kit)”। এছাড়া ডেলিভারি ম্যানের সামনে আমাদের দেওয়া টেস্টার ব্লটার স্ট্রিপে ঘ্রাণ শুঁকে দেখে তারপর টাকা পরিশোধ করার ১০০% ওপেন-বক্স গ্যারান্টি পাচ্ছেন।',
  },
  {
    q: '৩. সাদা পাঞ্জাবি বা প্রিমিয়াম শার্টে আতর লাগালে কি তেলের দাগ পড়বে?',
    a: 'আমাদের আতরগুলো আল্ট্রা-পিওর ডিস্টিলড হওয়ায় কাপড়ে স্থায়ী দাগ ফেলে না। তবে সেরা প্রজেকশন ও দাগমুক্ত ব্যবহারের নিয়ম হলো—প্রথমে হাতের তালু বা কবজিতে ১ ফোঁটা আতর নিয়ে দুই হাত আলতো করে ঘষে এরপর পাঞ্জাবির বুক, কলার ও কাঁধে বুলিয়ে নেওয়া।',
  },
  {
    q: '৪. বাংলাদেশের গরম ও ঘামের আবহাওয়ায় ঘ্রাণ কতক্ষণ স্থায়ী থাকে?',
    a: 'আমাদের পিওর এক্সট্রেইট অয়েলে কোনো পানি বা অ্যালকোহল মেশানো থাকে না। ফলে ত্বকের পালস পয়েন্টে (কানের পেছনে ও কবজিতে) ১২–১৮ ঘণ্টা এবং সুতি বা কাবলি পাঞ্জাবিতে ৩৬ থেকে ৪৮+ ঘণ্টা পর্যন্ত সুবাস অটুট থাকে।',
  },
];

export const RoohReviewsFooterSection: React.FC<RoohReviewsFooterSectionProps> = ({
  title,
  subtitle,
  isDark = false,
}) => {
  const [openFaq, setOpenFaq] = useState<number>(0);

  const goldHeadingColor = isDark ? '#D4AF37' : '#8F620A';
  const primaryTextColor = isDark ? '#F9F6F0' : '#18130E';
  const subTextColor = isDark ? '#D2C5B4' : '#4A3B2C';

  return (
    <footer
      id="rooh-our-essence-reviews"
      className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t"
      style={{
        backgroundColor: isDark ? '#080605' : '#F3EDE2',
        borderColor: isDark ? '#2A2218' : '#DECDB4',
        color: primaryTextColor,
      }}
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* PART 1: OUR ESSENCE — INGREDIENT SOURCING STORY (CAMBODIA, SYLHET, TAIF) */}
        <div
          className="rounded-3xl p-6 sm:p-10 border grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          style={{
            backgroundColor: isDark ? '#130F0B' : '#FFFFFF',
            borderColor: isDark ? '#3A2E21' : '#D6C4A9',
          }}
        >
          <div className="lg:col-span-7 space-y-4">
            <div
              className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest"
              style={{ color: goldHeadingColor }}
            >
              <Award size={15} />
              <span>About Us (Our Essence) · আমাদের বিশুদ্ধ উপাদানের উৎস ও কারিগরি ঐতিহ্য</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl font-black leading-snug"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: primaryTextColor,
              }}
            >
              কম্বোডিয়ার প্রাচীন আগর বন, মৌলভীবাজারের ঐতিহ্যবাহী ডিস্টিলারি ও সৌদি তাইফের গোলাপ বাগান থেকে সরাসরি সংগৃহীত
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed font-medium" style={{ color: subTextColor }}>
              রুহ পারফিউমারি (Rooh Perfumery) কোনো সাধারণ রিব্র্যান্ডেড কেমিক্যাল অয়েল শপ নয়। আমাদের প্রতিটি বোতল তৈরি হয় প্রাকৃতিক আগরউড (Agarwood Resin), সৌদি আরবের তাইফ শহরের পাহাড়ি গোলাপ, কাশ্মীরের জাফরান এবং ফ্রান্সের Grasse অঞ্চলের IFRA-সার্টিফাইড পারফিউম অয়েল থেকে—যা ডার্ক অ্যাম্বার গ্লাসে মাসের পর মাস মেচুরেশন (Aging) করা হয়।
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {[
                {
                  region: 'মৌলভীবাজার ও কম্বোডিয়া',
                  ingredient: '১০০% খাঁটি আগরউড ও বাখুর চিপস',
                },
                {
                  region: 'তাইফ (সৌদি আরব) ও কাশ্মীর',
                  ingredient: 'ডামাস্ক রোজ অটো ও পাম্পোর জাফরান',
                },
                {
                  region: 'গ্রাস (ফ্রান্স) ও কায়রো',
                  ingredient: '০% অ্যালকোহল এক্সট্রেইট ও তাহারা মাস্ক',
                },
              ].map((src, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl border"
                  style={{
                    backgroundColor: isDark ? '#1A140E' : '#FAF6EE',
                    borderColor: isDark ? '#2E241A' : '#E5D8C3',
                  }}
                >
                  <div
                    className="text-xs font-black"
                    style={{ color: goldHeadingColor }}
                  >
                    {src.region}
                  </div>
                  <div className="text-[11px] font-medium mt-0.5" style={{ color: subTextColor }}>
                    {src.ingredient}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              className="rounded-2xl p-5 border-2 space-y-3"
              style={{
                backgroundColor: isDark ? '#1A140E' : '#FAF6EE',
                borderColor: '#D4AF37',
              }}
            >
              <div
                className="text-xs font-extrabold uppercase tracking-wider"
                style={{ color: goldHeadingColor }}
              >
                ১০০% হালাল ও পিউরিটি সনদ (Purity Pledge)
              </div>
              <ul className="space-y-2.5 text-xs font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-[#059669] shrink-0 mt-0.5" />
                  <span>কোনো প্রকার ইথানল, মেথানল বা ডিনেচারড স্পিরিট ব্যবহার করা হয় না।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-[#059669] shrink-0 mt-0.5" />
                  <span>সস্তা ডিইপি (DEP Plasticizer) বা ক্ষতিকর প্যারাফিন তেল মুক্ত।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-[#059669] shrink-0 mt-0.5" />
                  <span>পাঁচ ওয়াক্ত নামাজ, মসজিদে ইতিকাফ ও হজ্জ-ওমরাহর জন্য শতভাগ উপযোগী।</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* PART 2: SOCIAL PROOF & LONGEVITY TESTIMONIALS */}
        <div className="space-y-8">
          <div className="max-w-3xl space-y-2">
            <div
              className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest"
              style={{ color: goldHeadingColor }}
            >
              <Sparkles size={14} />
              <span>Verified Customer Reviews · দীর্ঘস্থায়ী সুবাস ও প্রশংসার বাস্তব গল্প</span>
            </div>
            <h3
              className="text-2xl sm:text-4xl font-black tracking-tight"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: primaryTextColor,
              }}
            >
              <EditableText
                id="rooh_reviews_h2"
                defaultText={
                  title ||
                  '৩৮,৫০০+ সুন্নাহ প্রেমী, কর্পোরেট প্রফেশনাল ও পারফিউম কালেক্টরদের বাস্তব অভিজ্ঞতা'
                }
              />
            </h3>
            <p className="text-xs sm:text-sm font-medium" style={{ color: subTextColor }}>
              <EditableText
                id="rooh_reviews_sub"
                defaultText={
                  subtitle ||
                  'যাঁরা সাধারণ অ্যালকোহল স্প্রে ছেড়ে রুহ পারফিউমারির ১০০% হালাল ও লং-লাস্টিং আতরে ফিরেছেন।'
                }
              />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CUSTOMER_REVIEWS.map((rev, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-6 border flex flex-col justify-between space-y-4 shadow-sm"
                style={{
                  backgroundColor: isDark ? '#14100C' : '#FFFFFF',
                  borderColor: isDark ? '#2E241A' : '#DECDB4',
                }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-black"
                      style={{ color: goldHeadingColor }}
                    >
                      {rev.rating}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/15 text-[#059669] border border-emerald-500/30">
                      {rev.verifiedTag}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed font-medium italic">
                    {rev.quote}
                  </p>
                </div>

                <div
                  className="pt-3 border-t"
                  style={{ borderColor: isDark ? '#2A2218' : '#E5D8C3' }}
                >
                  <div
                    className="text-xs font-black"
                    style={{ color: primaryTextColor }}
                  >
                    {rev.name}
                  </div>
                  <div className="text-[11px] font-medium" style={{ color: subTextColor }}>
                    {rev.role}
                  </div>
                  <div
                    className="text-[11px] font-extrabold mt-1"
                    style={{ color: goldHeadingColor }}
                  >
                    ক্রয়কৃত সুবাস: {rev.scentBought}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PART 3: FREQUENTLY ASKED QUESTIONS */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3
              className="text-2xl sm:text-3xl font-black"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: primaryTextColor,
              }}
            >
              আতর ও হালাল পারফিউম সম্পর্কে সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)
            </h3>
            <p className="text-xs font-medium" style={{ color: subTextColor }}>
              অর্ডার করার আগে আপনার মনের যেকোনো প্রশ্নের স্পষ্ট উত্তর জেনে নিন
            </p>
          </div>

          <div className="space-y-3">
            {ROOH_FAQS.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl border p-4 transition"
                  style={{
                    backgroundColor: isDark ? '#14100C' : '#FFFFFF',
                    borderColor: isOpen
                      ? '#D4AF37'
                      : isDark
                      ? '#2C2319'
                      : '#DECDB4',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-extrabold cursor-pointer gap-4"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      size={16}
                      style={{ color: goldHeadingColor }}
                      className={`shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p
                      className="text-xs leading-relaxed font-medium mt-3 pt-3 border-t"
                      style={{
                        borderColor: isDark ? '#2A2218' : '#E5D8C3',
                        color: subTextColor,
                      }}
                    >
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* PART 4: BOTTOM BRAND FOOTER */}
        <div
          className="pt-10 border-t grid grid-cols-1 md:grid-cols-4 gap-8 text-xs"
          style={{ borderColor: isDark ? '#2A2218' : '#DECDB4' }}
        >
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#0B0907] font-black"
                style={{ backgroundColor: '#D4AF37' }}
              >
                <Droplets size={16} />
              </div>
              <span
                className="text-lg font-black"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Rooh Perfumery (রুহ সুগন্ধি)
              </span>
            </div>
            <p className="max-w-md leading-relaxed font-medium" style={{ color: subTextColor }}>
              বাংলাদেশের প্রিমিয়াম ১০০% অ্যালকোহল-মুক্ত হালাল আতর, কম্বোডিয়ান ও সিলেটি আগরউড, ফরাসি ডিজাইনার ইনস্পিরেশন এবং অ্যারাবিয়ান বাখুর হাউজ।
            </p>
            <div
              className="flex flex-wrap items-center gap-4 text-[11px] font-extrabold"
              style={{ color: goldHeadingColor }}
            >
              <span className="inline-flex items-center gap-1">
                <MapPin size={13} /> ফ্ল্যাগশিপ অ্যাটেলিয়ার: বনানী রোড ১১, ঢাকা ও বড়লেখা, মৌলভীবাজার
              </span>
              <span className="inline-flex items-center gap-1">
                <PhoneCall size={13} /> হটলাইন: +880 1711-908422
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div
              className="font-extrabold uppercase tracking-wider"
              style={{ color: goldHeadingColor }}
            >
              সাইট ম্যাপ (Site Structure)
            </div>
            <ul className="space-y-1.5 font-medium" style={{ color: subTextColor }}>
              <li>Home / Scent Profile Quiz</li>
              <li>Shop All: Pure Attars &amp; Designer Clones</li>
              <li>Shop All: Bakhoor &amp; Pocket Sprays</li>
              <li>Discovery Bundles (5-Vial Tester Kit)</li>
              <li>About Us (Our Essence &amp; Halal Pledge)</li>
            </ul>
          </div>

          <div className="space-y-2">
            <div
              className="font-extrabold uppercase tracking-wider"
              style={{ color: goldHeadingColor }}
            >
              ডেলিভারি ও পেমেন্ট গ্যারান্টি
            </div>
            <ul className="space-y-1.5 font-medium" style={{ color: subTextColor }}>
              <li>✓ সারা বাংলাদেশে ক্যাশ অন ডেলিভারি</li>
              <li>✓ ডেলিভারি ম্যানের সামনে স্মেল টেস্ট সুবিধা</li>
              <li>✓ ঢাকায় ২৪ ঘণ্টা ও ঢাকার বাইরে ৪৮ ঘণ্টা</li>
              <li>✓ বিকাশ / নগদ / ক্যাশ অন ডেলিভারি</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
