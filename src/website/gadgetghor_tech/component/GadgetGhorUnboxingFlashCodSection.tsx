import React, { useState, useMemo } from 'react';
import {
  Play,
  Video,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Clock,
  ShoppingBag,
  Sparkles,
  AlertCircle,
  Zap,
  MapPin,
  Youtube,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface GadgetGhorUnboxingFlashCodSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

interface ReviewerClip {
  id: string;
  channelName: string;
  subscribers: string;
  videoTitle: string;
  duration: string;
  views: string;
  productTested: string;
  thumbnail: string;
  verdictBullets: string[];
}

const BD_TECH_REVIEWER_CLIPS: ReviewerClip[] = [
  {
    id: 'rev_vid_1',
    channelName: 'TechTalks Dhaka (টেকটকস ঢাকা)',
    subscribers: '420K Subscribers',
    videoTitle:
      '৳১,৮৯০ টাকায় সত্যিই 38ms গেমিং ও ANC? SonicPulse Pro TWS Hands-On Latency & Mic Test in Dhaka Traffic!',
    duration: '08:42',
    views: '148K Views',
    productTested: 'SonicPulse Pro ANC TWS',
    thumbnail:
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=85',
    verdictBullets: [
      'মিরপুর রোডের বাসের শব্দের মাঝেও 4-Mic ENC কলিং টেস্টে ৯/১০ স্কোর',
      'পাবজি ও ফ্রি-ফায়ারে গুলি করার সাথে সাথে জিরো-ল্যাগ ফুটস্টেপ সাউন্ড',
      'এক চার্জে টানা ৭ ঘণ্টা ৫০ মিনিট ব্যাটারি ব্যাকআপ প্রমাণিত',
    ],
  },
  {
    id: 'rev_vid_2',
    channelName: 'Gadget Insider BD (গ্যাজেট ইনসাইডার বিডি)',
    subscribers: '615K Subscribers',
    videoTitle:
      'কড়া রোদে ১০০০ নিটস Super AMOLED ডিসপ্লে ও IP68 ওয়াটার টেস্ট — ApexFit Ultra 2.04" Smartwatch Review!',
    duration: '11:15',
    views: '210K Views',
    productTested: 'ApexFit Ultra AMOLED Watch',
    thumbnail:
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=900&q=85',
    verdictBullets: [
      'পানির গ্লাসে ৩০ মিনিট ডুবিয়ে রাখার পরও টাচ ও ব্লুটুথ স্পিকার ১০০% সচল',
      '৬০ হার্টজ রিফ্রেশ রেটের কারণে অ্যাপল ওয়াচের মতোই মাখনের মতো স্মুথ স্ক্রলিং',
      'বক্সের ভেতরেই মেটাল চেইন ও সিলিকন স্ট্র্যাপ—অফিস ও জিম দুই জায়গাতেই মানানসই',
    ],
  },
  {
    id: 'rev_vid_3',
    channelName: 'PC & Gear Lab Bangladesh',
    subscribers: '290K Subscribers',
    videoTitle:
      'এক চার্জারেই MacBook Air + Samsung S24 Ultra 65W চার্জ! BizliVolt GaN III Thermal & Watt-Meter Test',
    duration: '07:19',
    views: '94K Views',
    productTested: 'BizliVolt 65W GaN Charger + K75 Keyboard',
    thumbnail:
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=85',
    verdictBullets: [
      'ইউএসবি ওয়াট-মিটারে পুরো ৬৪.৮ ওয়াট রিয়েল আউটপুট এবং ৪২ ডিগ্রির নিচে তাপমাত্রা',
      'K75 মেকানিক্যাল কিবোর্ডের প্রি-লুবড সুইচ ও গ্যাসকেট ফোম সাউন্ড এক কথায় অসাধারণ',
      'গ্যাজেটঘরের ৭ দিনের ইনস্ট্যান্ট রিপ্লেসমেন্ট পলিসি ক্রেতাদের জন্য সবচেয়ে বড় প্লাস পয়েন্ট',
    ],
  },
];

const FLASH_COMBO_BUNDLES = [
  {
    id: 'bundle_pro_combo',
    title: '🔥 Combo 01: Gamer & Commuter Duo (SonicPulse TWS + ApexFit AMOLED Watch)',
    subtitle: 'সবচেয়ে জনপ্রিয় কম্বো — লো-লেটেন্সি ইয়ারবাডস + সুপার অ্যামোলেড কলিং ওয়াচ',
    price: 4390,
    regularPrice: 5380,
    saveBadge: 'SAVE ৳990 + FREE Silicone Case',
    warranty: '7-Day Instant Replacement + 12-Month Official Warranty',
  },
  {
    id: 'bundle_power_pack',
    title: '⚡ Combo 02: Non-Stop Power Pack (BizliVolt 65W GaN + 20,000mAh Power Bank)',
    subtitle: 'লোডশেডিং ও ট্রাভেল সেভার — ৬৫ ওয়াট ফাস্ট চার্জার + ২০,০০০mAh পিডি পাওয়ার ব্যাংক',
    price: 3290,
    regularPrice: 3850,
    saveBadge: 'SAVE ৳560 + FREE 100W Braided Cable',
    warranty: '7-Day Instant Replacement + 12-Month Official Warranty',
  },
  {
    id: 'bundle_single_tws',
    title: '🎧 Single Pack: SonicPulse Pro ANC + 38ms Gaming TWS Earbuds',
    subtitle: '৪৫ ঘণ্টা ব্যাকআপ, ৪-মাইক ENC কলিং ও ৩৮ মিলিসেকেন্ড গেমিং মোড',
    price: 1890,
    regularPrice: 2490,
    saveBadge: 'SAVE ৳600 · Best Under 2K',
    warranty: '7-Day Instant Replacement + 6-Month Official Warranty',
  },
  {
    id: 'bundle_single_keyboard',
    title: '⌨️ Desk Setup: KhelnaMech K75 Wireless Tri-Mode Mechanical Keyboard',
    subtitle: 'হট-সোয়াপেবল প্রি-লুবড সুইচ, গ্যাসকেট মাউন্ট ও আরজিবি নব',
    price: 3490,
    regularPrice: 4400,
    saveBadge: 'SAVE ৳910 + Free Switch Puller & Extra Keycaps',
    warranty: '7-Day Instant Replacement + 12-Month Official Warranty',
  },
];

export const GadgetGhorUnboxingFlashCodSection: React.FC<
  GadgetGhorUnboxingFlashCodSectionProps
> = ({ title, subtitle, primaryColor, isDark }) => {
  const [activeVideoId, setActiveVideoId] = useState<string>(BD_TECH_REVIEWER_CLIPS[0].id);
  const [isPlayingDemo, setIsPlayingDemo] = useState<boolean>(false);

  // Checkout Form State
  const [selectedBundleId, setSelectedBundleId] = useState<string>(FLASH_COMBO_BUNDLES[0].id);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [deliveryZone, setDeliveryZone] = useState<'dhaka_sameday' | 'suburb' | 'outside_bd'>(
    'dhaka_sameday'
  );
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [addSurgeProtector, setAddSurgeProtector] = useState<boolean>(false);
  const [orderSubmitted, setOrderSubmitted] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const activeClip =
    BD_TECH_REVIEWER_CLIPS.find((c) => c.id === activeVideoId) || BD_TECH_REVIEWER_CLIPS[0];

  const selectedBundle = useMemo(
    () =>
      FLASH_COMBO_BUNDLES.find((b) => b.id === selectedBundleId) || FLASH_COMBO_BUNDLES[0],
    [selectedBundleId]
  );

  const deliveryFee =
    deliveryZone === 'dhaka_sameday' ? 60 : deliveryZone === 'suburb' ? 90 : 120;
  const surgeProtectorFee = addSurgeProtector ? 190 : 0;
  const grandTotal = selectedBundle.price + deliveryFee + surgeProtectorFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = customerPhone.replace(/[\s-]/g, '');
    const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(cleanPhone)) {
      setPhoneError('অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন (যেমন: 017XXXXXXXX)');
      return;
    }
    setPhoneError(null);
    setOrderSubmitted(true);
  };

  return (
    <section
      className={`py-16 sm:py-20 ${
        isDark ? 'bg-[#070B14] text-white' : 'bg-white text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20">
        {/* PART 1: LOCAL BANGLADESHI TECH REVIEWER UNBOXING VIDEO EMBEDS */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 text-rose-500 text-xs font-black uppercase tracking-wider">
                <Youtube size={14} />
                <EditableText
                  id="gadgetghor_video_eyebrow"
                  defaultText="LOCAL BD TECH REVIEWER UNBOXING & HANDS-ON TEST"
                />
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                <EditableText
                  id="gadgetghor_video_h2"
                  defaultText="বাংলাদেশের জনপ্রিয় টেক ইউটিউবারদের আনবক্সিং ও রিয়েল-লাইফ টেস্ট দেখুন!"
                />
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                <EditableText
                  id="gadgetghor_video_sub"
                  defaultText="শুধু আমাদের কথায় নয়—দেশের শীর্ষ টেক রিভিউয়ারদের মাইক টেস্ট, পাবজি লেটেন্সি টেস্ট ও ওয়াট-মিটার রিভিউ দেখে নিজেই সিদ্ধান্ত নিন।"
                />
              </p>
            </div>

            <div className="text-xs font-extrabold text-slate-500 dark:text-slate-400">
              ✅ ১০০% আন-এডিটেড রিয়েল প্রোডাক্ট রিভিউ
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Video Player Container (7 Cols) */}
            <div className="lg:col-span-7">
              <div
                className={`rounded-3xl border overflow-hidden ${
                  isDark
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-slate-950 text-white border-slate-800 shadow-xl'
                }`}
              >
                <div className="relative aspect-video w-full bg-black overflow-hidden">
                  <img
                    src={activeClip.thumbnail}
                    alt={activeClip.videoTitle}
                    className={`w-full h-full object-cover transition duration-500 ${
                      isPlayingDemo ? 'scale-105 opacity-40' : 'opacity-80'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Top Channel Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/85 border border-white/15 text-xs font-bold text-white">
                    <Video size={14} className="text-rose-500" />
                    <span>{activeClip.channelName}</span>
                    <span className="text-[10px] text-slate-400">
                      • {activeClip.subscribers}
                    </span>
                  </div>

                  {/* Center Play Button / Active Review Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    {!isPlayingDemo ? (
                      <button
                        type="button"
                        onClick={() => setIsPlayingDemo(true)}
                        className="group flex flex-col items-center gap-3 cursor-pointer"
                      >
                        <div
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white shadow-2xl transition transform group-hover:scale-110"
                          style={{ backgroundColor: primaryColor }}
                        >
                          <Play size={30} fill="currentColor" className="ml-1" />
                        </div>
                        <span className="px-3.5 py-1 rounded-full bg-slate-950/90 text-xs font-extrabold text-cyan-300 border border-cyan-400/30">
                          ▶ Watch Full Hands-On Review ({activeClip.duration})
                        </span>
                      </button>
                    ) : (
                      <div className="max-w-md p-5 rounded-2xl bg-slate-950/95 border border-cyan-500/40 space-y-3 text-left">
                        <div className="flex items-center justify-between text-xs font-black text-cyan-400">
                          <span>▶ NOW PLAYING HANDS-ON HIGHLIGHT</span>
                          <button
                            type="button"
                            onClick={() => setIsPlayingDemo(false)}
                            className="text-slate-400 hover:text-white underline cursor-pointer"
                          >
                            Close Preview
                          </button>
                        </div>
                        <p className="text-xs font-bold text-white">
                          {activeClip.videoTitle}
                        </p>
                        <div className="space-y-1.5 pt-1">
                          {activeClip.verdictBullets.map((b, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 text-[11px] text-emerald-300"
                            >
                              <CheckCircle2 size={13} className="shrink-0 mt-0.5" />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/80 text-[11px] font-mono font-bold text-white">
                    {activeClip.duration} · {activeClip.views}
                  </div>
                </div>

                {/* Video Summary Points Under Player */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-cyan-400">
                      Tested Gear: {activeClip.productTested}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Verified Bangladesh Unit (Batch 2026)
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    {activeClip.videoTitle}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                    {activeClip.verdictBullets.map((point, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 flex items-start gap-2"
                      >
                        <CheckCircle2
                          size={14}
                          className="shrink-0 mt-0.5 text-emerald-400"
                        />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Reviewer Video Playlist Selector */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-black uppercase tracking-wider text-slate-400">
                Select Reviewer Video Clip (3 Hands-On Tests):
              </div>
              {BD_TECH_REVIEWER_CLIPS.map((clip) => {
                const isSelected = clip.id === activeVideoId;
                return (
                  <button
                    key={clip.id}
                    type="button"
                    onClick={() => {
                      setActiveVideoId(clip.id);
                      setIsPlayingDemo(false);
                    }}
                    className={`w-full p-3.5 rounded-2xl border text-left transition flex items-start gap-3.5 cursor-pointer ${
                      isSelected
                        ? isDark
                          ? 'bg-slate-900 border-cyan-400 shadow-md'
                          : 'bg-slate-900 text-white border-cyan-500 shadow-md'
                        : isDark
                        ? 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="relative w-28 aspect-video rounded-xl overflow-hidden bg-slate-950 shrink-0">
                      <img
                        src={clip.thumbnail}
                        alt={clip.channelName}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play size={16} className="text-white" fill="currentColor" />
                      </div>
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="text-[10px] font-black uppercase tracking-wider text-cyan-500">
                        {clip.channelName}
                      </div>
                      <div className="text-xs font-extrabold line-clamp-2 leading-snug">
                        {clip.videoTitle}
                      </div>
                      <div className="text-[10px] opacity-70 font-semibold">
                        {clip.views} · {clip.duration}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* PART 2: EXPRESS COURIER & 1-CLICK CASH ON DELIVERY CHECKOUT */}
        <div
          id="gadgetghor-checkout"
          className={`rounded-3xl border-2 p-6 sm:p-10 ${
            isDark
              ? 'bg-slate-900/95 border-cyan-500/30'
              : 'bg-slate-50 border-slate-200 shadow-xl'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 6 Cols: Bundle Selector + Express Courier Callout */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Zap size={13} />
                  <EditableText
                    id="gadgetghor_checkout_badge"
                    defaultText="TECH DEALS & EXPRESS CASH ON DELIVERY"
                  />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  <EditableText
                    id="gadgetghor_checkout_h2"
                    defaultText={
                      title ||
                      'ফ্ল্যাশ কম্বো ডিল ও ১-ক্লিক ক্যাশ অন ডেলিভারি — অগ্রিম ১ টাকাও দিতে হবে না!'
                    }
                  />
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  <EditableText
                    id="gadgetghor_checkout_sub"
                    defaultText={
                      subtitle ||
                      'আপনার পছন্দের গ্যাজেট বা কম্বো প্যাকটি সিলেক্ট করুন। ডেলিভারি ম্যানের সামনে বক্স খুলে, সিরিয়াল কোড মিলিয়ে এবং ফোনে কানেক্ট করে তারপর মূল্য পরিশোধ করুন।'
                    }
                  />
                </p>
              </div>

              {/* Bundle Selection Cards */}
              <div className="space-y-3">
                <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  ১. আপনার গ্যাজেট বা ফ্ল্যাশ কম্বো সিলেক্ট করুন:
                </label>
                {FLASH_COMBO_BUNDLES.map((b) => {
                  const active = selectedBundleId === b.id;
                  return (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBundleId(b.id)}
                      className={`p-4 rounded-2xl border-2 transition cursor-pointer ${
                        active
                          ? 'border-cyan-500 bg-cyan-500/10'
                          : isDark
                          ? 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs sm:text-sm font-black">
                              {b.title}
                            </span>
                            <span
                              className="px-2 py-0.5 rounded-full text-[10px] font-black text-white"
                              style={{ backgroundColor: primaryColor }}
                            >
                              {b.saveBadge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {b.subtitle}
                          </p>
                          <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 pt-0.5">
                            <ShieldCheck size={12} />
                            <span>{b.warranty}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs line-through text-slate-400 block">
                            ৳{b.regularPrice.toLocaleString()}
                          </span>
                          <span
                            className="text-lg font-black"
                            style={{ color: primaryColor }}
                          >
                            ৳{b.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Express Courier & COD Callout Box */}
              <div
                className={`p-4 rounded-2xl border space-y-2.5 ${
                  isDark
                    ? 'bg-slate-950 border-slate-800'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-black text-cyan-600 dark:text-cyan-400">
                  <Truck size={16} />
                  <span>সুপারফাস্ট নেশনওয়াইড কুরিয়ার (Steadfast / Pathao / Paperfly)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 font-bold">
                    ⚡ <strong>ঢাকা সিটি (Same-Day):</strong> আজ অর্ডার করলে আজই বা ২৪ ঘণ্টায় ডেলিভারি (৳৬০)
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 font-bold">
                    🚚 <strong>সারা বাংলাদেশ (২৪–৪৮ ঘণ্টা):</strong> ৬৪ জেলা ও ৪৯৫ থানায় হোম ডেলিভারি (৳১২০)
                  </div>
                </div>
              </div>
            </div>

            {/* Right 6 Cols: 1-Click COD Order Form */}
            <div className="lg:col-span-6">
              <div
                className={`p-6 sm:p-7 rounded-3xl border ${
                  isDark
                    ? 'bg-slate-950 border-slate-800'
                    : 'bg-white border-slate-200 shadow-md'
                }`}
              >
                {orderSubmitted ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                      <CheckCircle2 size={34} />
                    </div>
                    <h3 className="text-xl font-black">
                      অভিনন্দন {customerName || 'স্যার'}! আপনার অর্ডারটি কনফার্ম হয়েছে
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                      আমাদের গ্যাজেট স্পেশালিস্ট আগামী ১৫ মিনিটের মধ্যে আপনার{' '}
                      <strong>{customerPhone}</strong> নাম্বারে কল করে ডিসপ্যাচ ও ডিজিটাল ওয়ারেন্টি কার্ড অ্যাক্টিভেট করে দেবেন।
                    </p>
                    <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 text-xs space-y-1 text-left max-w-md mx-auto">
                      <div className="flex justify-between font-bold">
                        <span>সিলেক্টেড প্যাকেজ:</span>
                        <span>{selectedBundle.title.split(':')[0]}</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>ডেলিভারি মেথড:</span>
                        <span>Open-Box Cash on Delivery</span>
                      </div>
                      <div className="flex justify-between font-black text-sm pt-1 border-t border-slate-300 dark:border-slate-800">
                        <span>ডেলিভারি ম্যানকে পরিশোধযোগ্য:</span>
                        <span style={{ color: primaryColor }}>
                          ৳{grandTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOrderSubmitted(false)}
                      className="px-5 py-2.5 rounded-xl text-xs font-black text-white cursor-pointer"
                      style={{ backgroundColor: primaryColor }}
                    >
                      নতুন আরেকটি অর্ডার করুন
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handlePlaceOrder} className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                      <div>
                        <h3 className="text-base sm:text-lg font-black">
                          ক্যাশ অন ডেলিভারি অর্ডার ফর্ম
                        </h3>
                        <p className="text-xs text-slate-500">
                          প্রোডাক্ট হাতে পেয়ে চেক করে পেমেন্ট করুন
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                        ৳0 Advance Required
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold mb-1.5">
                        আপনার নাম (Full Name) *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="যেমন: রাফসান আহমেদ"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none ${
                          isDark
                            ? 'bg-slate-900 border-slate-700 text-white'
                            : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold mb-1.5">
                        ১১ ডিজিটের মোবাইল নাম্বার (ওয়ারেন্টি রেজিস্ট্রেশনের জন্য) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="017XXXXXXXX"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono font-bold focus:outline-none ${
                          isDark
                            ? 'bg-slate-900 border-slate-700 text-white'
                            : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                      {phoneError && (
                        <p className="text-[11px] text-rose-500 font-bold mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {phoneError}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold mb-1.5">
                        ডেলিভারি এরিয়া সিলেক্ট করুন *
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          {
                            id: 'dhaka_sameday',
                            label: 'ঢাকা সিটি (Same-Day)',
                            fee: '৳৬০',
                          },
                          {
                            id: 'suburb',
                            label: 'ঢাকা সাব-আর্ব (২৪ ঘণ্টা)',
                            fee: '৳৯০',
                          },
                          {
                            id: 'outside_bd',
                            label: ' ঢাকার বাইরে (২৪-৪৮ ঘণ্টা)',
                            fee: '৳১২০',
                          },
                        ].map((z) => (
                          <button
                            key={z.id}
                            type="button"
                            onClick={() =>
                              setDeliveryZone(
                                z.id as 'dhaka_sameday' | 'suburb' | 'outside_bd'
                              )
                            }
                            className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                              deliveryZone === z.id
                                ? 'border-cyan-500 bg-cyan-500/10 font-black'
                                : isDark
                                ? 'border-slate-800 bg-slate-900 text-slate-300'
                                : 'border-slate-200 bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div className="text-[11px] font-extrabold">{z.label}</div>
                            <div
                              className="text-xs font-black mt-0.5"
                              style={{ color: primaryColor }}
                            >
                              {z.fee}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold mb-1.5">
                        সম্পূর্ণ ঠিকানা (বাসা নং, রোড, এলাকা ও জেলা) *
                      </label>
                      <div className="relative">
                        <MapPin
                          size={14}
                          className="absolute left-3 top-3 text-slate-400"
                        />
                        <textarea
                          rows={2}
                          required
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          placeholder="যেমন: বাসা ১২, রোড ৫, ধানমন্ডি, ঢাকা"
                          className={`w-full pl-8 pr-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none ${
                            isDark
                              ? 'bg-slate-900 border-slate-700 text-white'
                              : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Optional Order Bump: Hard Carrying Pouch + Surge Adapter */}
                    <label
                      className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer ${
                        addSurgeProtector
                          ? 'border-cyan-500 bg-cyan-500/10'
                          : isDark
                          ? 'border-slate-800 bg-slate-900'
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={addSurgeProtector}
                        onChange={(e) => setAddSurgeProtector(e.target.checked)}
                        className="mt-1"
                      />
                      <span className="text-xs">
                        <strong className="font-extrabold block">
                          [+৳১৯০] শকপ্রুফ গ্যাজেট ট্রাভেল পাউচ ও ৩-পিন সার্জ অ্যাডাপ্টার যুক্ত করুন
                        </strong>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          ইয়ারবাডস, ক্যাবল ও চার্জার নিরাপদে বহন করার জন্য ওয়াটারপ্রুফ EVA হার্ড কেস।
                        </span>
                      </span>
                    </label>

                    {/* Order Summary Breakdown */}
                    <div
                      className={`p-4 rounded-2xl space-y-1.5 text-xs ${
                        isDark ? 'bg-slate-900' : 'bg-slate-100'
                      }`}
                    >
                      <div className="flex justify-between">
                        <span>সিলেক্টেড গ্যাজেট মূল্য:</span>
                        <span className="font-bold">
                          ৳{selectedBundle.price.toLocaleString()}
                        </span>
                      </div>
                      {addSurgeProtector && (
                        <div className="flex justify-between text-cyan-600 dark:text-cyan-400">
                          <span>শকপ্রুফ EVA ট্রাভেল কেস + অ্যাডাপ্টার:</span>
                          <span className="font-bold">+৳১৯০</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>এক্সপ্রেস কুরিয়ার চার্জ:</span>
                        <span className="font-bold">৳{deliveryFee}</span>
                      </div>
                      <div className="flex justify-between text-sm font-black pt-2 border-t border-slate-300 dark:border-slate-800">
                        <span>সর্বমোট (ক্যাশ অন ডেলিভারি):</span>
                        <span style={{ color: primaryColor }}>
                          ৳{grandTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-2xl text-xs sm:text-sm font-black text-white flex items-center justify-center gap-2 shadow-lg hover:opacity-95 transition cursor-pointer"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}, #0891B2)`,
                      }}
                    >
                      <ShoppingBag size={17} />
                      <span>
                        অর্ডার কনফার্ম করুন — ৳{grandTotal.toLocaleString()} (ক্যাশ অন ডেলিভারি)
                      </span>
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-semibold text-center">
                      <Clock size={12} className="text-emerald-500" />
                      <span>
                        ৭ দিনের ইনস্ট্যান্ট রিপ্লেসমেন্ট + ডেলিভারি ম্যানের সামনে আনবক্সিং সুবিধা
                      </span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
