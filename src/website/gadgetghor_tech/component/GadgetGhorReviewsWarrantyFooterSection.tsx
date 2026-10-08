import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Cpu,
  PhoneCall,
  MapPin,
  Sparkles,
  RefreshCw,
  Truck,
  Award,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface GadgetGhorReviewsWarrantyFooterSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

const CUSTOMER_REVIEWS = [
  {
    id: 'gg_rev_1',
    name: 'তানভীর হাসান (Tanvir Hasan)',
    role: 'CSE Student & PUBG Mobile Player · মিরপুর ১০, ঢাকা',
    product: 'SonicPulse Pro ANC + 38ms Gaming TWS',
    rating: '5.0 ★',
    quote:
      '“আগে নিউমার্কেট থেকে ২ বার মাস্টার-কপি ইয়ারবাড কিনে ঠকেছি। গ্যাজেটঘর থেকে SonicPulse Pro অর্ডার করার ৪ ঘণ্টার মধ্যে বাসায় পেয়েছি। ডেলিভারি ভাইয়ার সামনেই সিরিয়াল কোড ভেরিফাই করেছি। পাবজিতে ৩৮ মিলিসেকেন্ড লেটেন্সি সত্যিই কাজ করে!”',
  },
  {
    id: 'gg_rev_2',
    name: 'ফারহানা নওশীন (Farhana Nawsheen)',
    role: 'Product Designer · বনানী, ঢাকা',
    product: 'ApexFit Ultra 2.04" Super AMOLED Watch',
    rating: '5.0 ★',
    quote:
      '“এই বাজেটে সত্যিকারের 60Hz Super AMOLED ডিসপ্লে পাওয়া যাবে ভাবিনি! রোদে বের হলেও ডিসপ্লে একদম পরিষ্কার দেখা যায় এবং রিকশায় বসেও হাতের ঘড়ি দিয়ে স্পষ্ট কথা বলা যায়। ১ বছরের অফিশিয়াল ওয়ারেন্টি কার্ড সাথে পেয়েছি।”',
  },
  {
    id: 'gg_rev_3',
    name: 'মাহমুদুল করিম (Mahmudul Karim)',
    role: 'Full-Stack Software Engineer · আগ্রাবাদ, চট্টগ্রাম',
    product: 'BizliVolt 65W GaN Charger + K75 Mechanical Keyboard',
    rating: '5.0 ★',
    quote:
      '“আমার MacBook Air এবং Samsung S23 দুটিই এখন একটি মাত্র BizliVolt 65W চার্জার দিয়ে চার্জ করি—মোটেও গরম হয় না। আর K75 কিবোর্ডটির গ্যাসকেট থকি সাউন্ড কোডিং করার আনন্দই বদলে দিয়েছে। চট্টগ্রাম সিটিতে ২৪ ঘণ্টায় স্টেডফাস্ট কুরিয়ারে পেয়েছি।”',
  },
];

const WARRANTY_FAQS = [
  {
    q: '১. ৭ দিনের ইনস্ট্যান্ট রিপ্লেসমেন্ট ও ৬/১২ মাসের অফিশিয়াল ওয়ারেন্টি কীভাবে ক্লেইম করব?',
    a: 'ডেলিভারির পর প্রথম ৭ দিনের মধ্যে চার্জিং, ব্লুটুথ কানেক্টিভিটি, ডিসপ্লে বা মাইক্রোফোনে যেকোনো ম্যানুফ্যাকচারিং সমস্যা পেলে আমাদের হোয়াটসঅ্যাপ সাপোর্টে বা ওয়ারেন্টি পোর্টালে বক্সের সিরিয়াল নাম্বার দিন। আমরা কোনো মেরামত ছাড়াই সরাসরি নতুন সিলড বক্স পাঠিয়ে দেব! আর ৬/১২ মাসের ওয়ারেন্টি চলাকালীন যেকোনো সার্ভিস সম্পূর্ণ ফ্রিতে পাবেন।',
  },
  {
    q: '২. প্রোডাক্ট কি ১০০% অরিজিনাল গ্লোবাল ভ্যারিয়েন্ট নাকি মাস্টার-কপি/ক্লোন?',
    a: 'গ্যাজেটঘর বিডিতে কোনো প্রকার দুবাই মাস্টার-কপি, AAA ক্লোন বা রিফার্বিশড গ্যাজেট বিক্রি করা হয় না। প্রতিটি বক্সে আমাদের অফিশিয়াল সিলভার হলোগ্রাম সিরিয়াল কোড থাকে যা আমাদের ওয়েবসাইটের Serial Verification টুলে সার্চ করলেই ইমপোর্ট ব্যাচ ও ওয়ারেন্টি স্ট্যাটাস দেখতে পাবেন।',
  },
  {
    q: '৩. আমি কি ডেলিভারি ম্যানের সামনে বক্স খুলে ফোনে কানেক্ট করে চেক করতে পারব?',
    a: 'অবশ্যই! আমরা ১০০% ওপেন-বক্স ক্যাশ অন ডেলিভারি (Open-Box COD) সাপোর্ট করি। অগ্রিম ১ টাকাও দিতে হবে না—ডেলিভারি রাইডারের সামনে বক্স খুলে ফোনের ব্লুটুথে কানেক্ট করে বা চার্জার লাগিয়ে দেখে সন্তুষ্ট হলে পেমেন্ট করবেন।',
  },
  {
    q: '৪. ঢাকা এবং ঢাকার বাইরে ডেলিভারি পেতে কত সময় লাগে?',
    a: 'ঢাকা সিটির ভেতরে দুপুর ২টার আগে অর্ডার করলে Same-Day এক্সপ্রেস ডেলিভারি (৪–৮ ঘণ্টা) এবং ঢাকার বাইরে সারা বাংলাদেশে Steadfast বা Pathao কুরিয়ারের মাধ্যমে ২৪ থেকে ৪৮ ঘণ্টার মধ্যে হোম ডেলিভারি সম্পন্ন হয়।',
  },
];

export const GadgetGhorReviewsWarrantyFooterSection: React.FC<
  GadgetGhorReviewsWarrantyFooterSectionProps
> = ({ title, subtitle, primaryColor, isDark }) => {
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [claimSerial, setClaimSerial] = useState<string>('');
  const [claimPhone, setClaimPhone] = useState<string>('');
  const [claimIssue, setClaimIssue] = useState<string>('Left/Right Earbud Pairing or Charging Issue');
  const [claimSubmitted, setClaimSubmitted] = useState<boolean>(false);

  const handleQuickWarrantyClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimSerial.trim() || !claimPhone.trim()) return;
    setClaimSubmitted(true);
  };

  return (
    <footer
      id="gadgetghor-reviews-warranty"
      className={`pt-16 pb-12 border-t ${
        isDark
          ? 'bg-[#050811] text-white border-slate-800'
          : 'bg-slate-950 text-white border-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* PART 1: VERIFIED GAMER & TECH ENTHUSIAST REVIEWS */}
        <div className="space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-black uppercase tracking-wider">
              <Sparkles size={13} />
              <EditableText
                id="gadgetghor_reviews_eyebrow"
                defaultText="65,000+ VERIFIED BANGLADESHI GAMERS & TECH LOVERS"
              />
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              <EditableText
                id="gadgetghor_reviews_h2"
                defaultText={
                  title ||
                  '৬৫,০০০+ গেমার, প্রফেশনাল ও স্মার্টফোন ইউজারের বাস্তব অভিজ্ঞতা ও রিভিউ'
                }
              />
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              <EditableText
                id="gadgetghor_reviews_sub"
                defaultText={
                  subtitle ||
                  'যাঁরা সস্তা রেপ্লিকা ছেড়ে গ্যাজেটঘরের ১০০% অরিজিনাল গ্যাজেট ও ৭ দিনের ইনস্ট্যান্ট রিপ্লেসমেন্ট ওয়ারেন্টিতে আস্থা রেখেছেন।'
                }
              />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CUSTOMER_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-black">
                      {rev.rating} · Verified Buyer
                    </span>
                    <span className="text-[11px] font-bold text-cyan-400">
                      {rev.product}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {rev.quote}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <div className="text-xs font-black text-white">{rev.name}</div>
                  <div className="text-[11px] text-slate-400">{rev.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PART 2: SELF-SERVICE WARRANTY CLAIM PORTAL + FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 5 Cols: Instant Online Warranty Claim & Order Tracking Portal */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900 border border-cyan-500/30 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-black uppercase tracking-wider">
              <RefreshCw size={15} />
              <span>Warranty & Instant Replacement Portal</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              অনলাইন ওয়ারেন্টি ক্লেইম ও ৭ দিনের রিপ্লেসমেন্ট ফর্ম
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              দোকানে দৌড়াদৌড়ি করার দরকার নেই! প্রোডাক্টে কোনো সমস্যা হলে নিচের ফর্মে সিরিয়াল নাম্বার দিন—আমাদের কুরিয়ার রাইডার আপনার বাসা থেকে প্রোডাক্ট পিক করে নতুন বক্স পৌঁছে দেবে।
            </p>

            {claimSubmitted ? (
              <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-xs space-y-2">
                <div className="flex items-center gap-1.5 font-black text-emerald-300">
                  <CheckCircle2 size={16} />
                  <span>Warranty Ticket #GG-W2026 Created!</span>
                </div>
                <p className="text-slate-300">
                  আপনার সিরিয়াল <strong>{claimSerial}</strong> এবং নাম্বার{' '}
                  <strong>{claimPhone}</strong> রেজিস্টার হয়েছে। আগামী ২ ঘণ্টার মধ্যে আমাদের ওয়ারেন্টি টিম পিকআপ শিডিউল কনফার্ম করবে।
                </p>
                <button
                  type="button"
                  onClick={() => setClaimSubmitted(false)}
                  className="text-cyan-300 font-bold underline cursor-pointer"
                >
                  Submit Another Claim
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuickWarrantyClaim} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    বক্সের সিরিয়াল কোড বা ইনভয়েস নাম্বার *
                  </label>
                  <input
                    type="text"
                    required
                    value={claimSerial}
                    onChange={(e) => setClaimSerial(e.target.value)}
                    placeholder="e.g. GG-2026-8841"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    অর্ডার করা মোবাইল নাম্বার *
                  </label>
                  <input
                    type="tel"
                    required
                    value={claimPhone}
                    onChange={(e) => setClaimPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    সমস্যার ধরন সিলেক্ট করুন
                  </label>
                  <select
                    value={claimIssue}
                    onChange={(e) => setClaimIssue(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-white"
                  >
                    <option>Left/Right Earbud Pairing or Charging Issue</option>
                    <option>Smartwatch Display / Sensor / Bluetooth Issue</option>
                    <option>GaN Charger / Power Bank Fast-Charge Issue</option>
                    <option>Keyboard Switch / Wireless Dongle Issue</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-xs font-black text-white cursor-pointer transition hover:opacity-95"
                  style={{ backgroundColor: primaryColor }}
                >
                  রিকোয়েস্ট সাবমিট করুন (Free Home Pickup)
                </button>
              </form>
            )}
          </div>

          {/* Right 7 Cols: FAQ Accordion */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-lg sm:text-xl font-black text-white mb-2">
              সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (Warranty, Authenticity & Delivery FAQ)
            </h3>
            {WARRANTY_FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.q}
                  className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-extrabold text-white cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      size={16}
                      className={`shrink-0 text-cyan-400 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Brand Footer Info */}
        <div className="pt-8 border-t border-slate-800/90 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black"
              style={{ backgroundColor: primaryColor }}
            >
              <Cpu size={18} />
            </div>
            <div>
              <div className="font-black text-white">
                GadgetGhor BD (গ্যাজেটঘর) — Smart Tech & Mobile Accessories
              </div>
              <div className="text-[11px]">
                Showroom & Service Hub: Level 4, Bashundhara City & Jamuna Future Park, Dhaka
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-[11px] font-bold">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck size={14} /> 7-Day Instant Replacement
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Truck size={14} /> Steadfast / Pathao Express COD
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <PhoneCall size={14} /> Helpline: 09678-GADGET (10AM–10PM)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
