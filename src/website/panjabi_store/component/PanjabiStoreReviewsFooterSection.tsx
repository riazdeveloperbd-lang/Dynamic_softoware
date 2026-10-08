import React from 'react';
import {
  PackageCheck,
  RefreshCw,
  Truck,
  PhoneCall,
  Star,
  CheckCircle2,
  MessageCircle,
  ShoppingBag,
  ShieldCheck,
} from 'lucide-react';
import {
  EditableText,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface PanjabiStoreReviewsFooterSectionProps {
  title: string;
  subtitle: string;
  variant: DoctorVariantId;
  primaryColor: string;
  isDark?: boolean;
}

const TRUST_PILLARS = [
  {
    icon: PackageCheck,
    titleBn: '📦 ডেলিভারি ম্যানের সামনে প্রোডাক্ট দেখে রিসিভ করার সুবিধা',
    titleEn: 'Inspect Product Before Paying',
    desc: 'প্যাকেট খুলে কাপড়ের মান, সেলাই এবং সাইজ দেখে সন্তুষ্ট হলে ডেলিভারি ম্যানকে টাকা পরিশোধ করুন।',
  },
  {
    icon: RefreshCw,
    titleBn: '🔄 ৩ দিনের মধ্যে সহজ সাইজ পরিবর্তন',
    titleEn: '3-Day Easy Size Exchange',
    desc: 'সাইজ ছোট বা বড় হলে ডেলিভারি পাওয়ার ৩ দিনের মধ্যে ঝামেলামুক্ত এক্সচেঞ্জ সুবিধা।',
  },
  {
    icon: Truck,
    titleBn: '🚚 ২৪-৪৮ ঘণ্টার মধ্যে দ্রুত ডেলিভারি',
    titleEn: 'Fast 24–48h Delivery Inside Dhaka',
    desc: 'ঢাকার ভেতরে ২৪-৪৮ ঘণ্টায় এবং ঢাকার বাইরে ২-৩ কার্যদিবসে Steadfast / Pathao হোম ডেলিভারি।',
  },
  {
    icon: PhoneCall,
    titleBn: '📞 যেকোনো প্রয়োজনে কল করুন: +880 1711-948200',
    titleEn: 'Dedicated Customer Support Hotline',
    desc: 'সাইজ বা অর্ডার সংক্রান্ত যেকোনো প্রশ্নে সরাসরি কল অথবা WhatsApp মেসেজ করুন।',
  },
];

const CUSTOMER_FB_REVIEWS = [
  {
    id: 'rev_1',
    name: 'Mahmudul Hasan Raffi',
    location: 'Uttara, Dhaka',
    purchasedItem: 'Deep Black Royal Kabli · Size L (40)',
    rating: 5,
    date: '২ দিন আগে (Verified Facebook Review)',
    comment:
      '“কাপড়ের কোয়ালিটি আলহামদুলিল্লাহ অসাধারণ! অনলাইনে কাবলি অর্ডার করে এত সুন্দর মার্সেরাইজড কটন এবং মেটাল বাটন ফিনিশিং পাবো ভাবিনি। ডেলিভারি ম্যানের সামনেই চেক করে নিয়েছি।”',
    photo:
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'rev_2',
    name: 'Sabbir Hossain',
    location: 'Agrabad, Chattogram',
    purchasedItem: 'Forest Green Royal Kabli · Size XL (42)',
    rating: 5,
    date: '৪ দিন আগে (Verified COD Buyer)',
    comment:
      '“ফরেস্ট গ্রিন কালারটা বাস্তবে ছবি থেকেও বেশি প্রিমিয়াম। আমার উচ্চতা ৫ ফুট ৯ ইঞ্চি এবং ওজন ৭৯ কেজি — সাইজ গাইড দেখে XL নিয়েছি, একদম পারফেক্ট এক্সিকিউটিভ ফিট হয়েছে।”',
    photo:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'rev_3',
    name: 'Tanvirul Islam',
    location: 'Sylhet Sadar',
    purchasedItem: 'Ivory White Kabli + 220 GSM Tee · Size L (40)',
    rating: 5,
    date: '১ সপ্তাহ আগে (Verified Facebook Review)',
    comment:
      '“দুইবার ওয়াশ করার পরও কালার বা ফিটিং একটুও নষ্ট হয়নি। এই দামে শোরুমের ৩,৫০০ টাকার পাঞ্জাবির সমান কোয়ালিটি।”',
    photo:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
  },
];

export const PanjabiStoreReviewsFooterSection: React.FC<
  PanjabiStoreReviewsFooterSectionProps
> = ({ title, subtitle, variant }) => {
  const scrollToCod = () => {
    const el = document.getElementById('aura-cod-checkout');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer
      id="aura-customer-reviews"
      className="pt-14 sm:pt-20 pb-12 scroll-mt-20"
      style={{
        backgroundColor: variant === 'varient_3' ? '#111827' : '#FAF8F5',
        color: variant === 'varient_3' ? '#FFFDF9' : '#1F2937',
        fontFamily: "'Plus Jakarta Sans', 'Hind Siliguri', sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 4-Pillar Trust Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TRUST_PILLARS.map((pillar) => {
            const IconComp = pillar.icon;
            return (
              <div
                key={pillar.titleEn}
                className="rounded-3xl border p-6 space-y-3 shadow-xs"
                style={{
                  backgroundColor: '#111827',
                  borderColor: '#1F2937',
                  color: '#FFFDF9',
                }}
              >
                <div className="w-11 h-11 rounded-2xl bg-[#0F5132] text-[#6EE7B7] flex items-center justify-center">
                  <IconComp size={20} />
                </div>
                <h3 className="text-sm sm:text-base font-extrabold leading-snug text-white">
                  {pillar.titleBn}
                </h3>
                <div className="text-[11px] font-mono text-[#FDE68A] font-bold">
                  {pillar.titleEn}
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Unfiltered Facebook Customer Reviews Gallery */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#0F5132] text-white text-xs font-extrabold">
                <Star size={13} className="fill-[#FDE68A] text-[#FDE68A]" />
                <span>৪.৯/৫.০ রেটিং • ৪,২০০+ ভেরিফাইড কাস্টমার রিভিউ</span>
              </div>

              <EditableText
                id="aura_reviews_title"
                defaultText={
                  title || 'আমাদের সম্মানিত কাস্টমারদের বাস্তব ছবি ও মতামত'
                }
                as="h2"
                className="text-2xl sm:text-4xl font-bold tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              />

              <EditableText
                id="aura_reviews_subtitle"
                defaultText={
                  subtitle ||
                  'ফেসবুক পেজ ও ক্যাশ অন ডেলিভারিতে প্রোডাক্ট হাতে পাওয়ার পর কাস্টমারদের আনফিল্টার্ড রিভিউ।'
                }
                as="p"
                className="text-sm sm:text-base opacity-75"
              />
            </div>

            <button
              type="button"
              onClick={scrollToCod}
              className="px-5 py-3 rounded-xl text-xs font-extrabold text-white flex items-center gap-2 self-start cursor-pointer"
              style={{ backgroundColor: '#E05242' }}
            >
              <ShoppingBag size={14} />
              <span>এখনই অর্ডার করুন (৳১,৯৯০)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CUSTOMER_FB_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="rounded-3xl border overflow-hidden flex flex-col justify-between shadow-md"
                style={{
                  backgroundColor: '#FFFDF9',
                  borderColor: '#E5E7EB',
                  color: '#1F2937',
                }}
              >
                <div>
                  <div className="aspect-[4/3] w-full bg-neutral-900 relative">
                    <img
                      src={rev.photo}
                      alt={rev.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/75 text-white text-[10px] font-bold">
                      {rev.purchasedItem}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5 text-[#F59E0B]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={13} className="fill-[#F59E0B]" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-[#0F5132] flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        {rev.date}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed font-medium text-[#111827]">
                      {rev.comment}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3.5 bg-[#FAF8F5] border-t border-[#E5E7EB] flex items-center justify-between text-xs">
                  <div>
                    <div className="font-extrabold text-[#111827]">{rev.name}</div>
                    <div className="text-[11px] text-neutral-500">{rev.location}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#0F5132]/10 text-[#0F5132] text-[10px] font-extrabold">
                    Verified Buyer
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Brand Footer & Steadfast/Pathao Logistics Strip */}
        <div
          className="rounded-3xl p-6 sm:p-8 border flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
          style={{
            backgroundColor: '#111827',
            borderColor: '#1F2937',
            color: '#FFFDF9',
          }}
        >
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2.5">
              <span
                className="px-3 py-1 rounded-lg text-sm font-black tracking-widest bg-[#0F5132] text-white"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                AURA (আউরা)
              </span>
              <span className="text-xs font-bold text-[#6EE7B7]">
                Premium D2C Menswear • Dhaka, Bangladesh
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              শতভাগ কম্বড মার্সেরাইজড কটন কাবলি পাঞ্জাবি এবং ২২০ জিএসএম ড্রপ-শোল্ডার টি-শার্ট। সারা বাংলাদেশে ক্যাশ অন ডেলিভারি।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2.5 rounded-xl bg-[#1F2937] border border-neutral-700 text-xs font-bold flex items-center gap-2">
              <PhoneCall size={14} className="text-[#6EE7B7]" />
              <span>হটলাইন: +880 1711-948200</span>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-[#0F5132] text-white text-xs font-extrabold flex items-center gap-2">
              <ShieldCheck size={14} />
              <span>Steadfast &amp; Pathao COD Partner</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
