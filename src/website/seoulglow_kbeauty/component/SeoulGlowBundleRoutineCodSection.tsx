import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ShoppingBag,
  Gift,
  Truck,
  QrCode,
  Droplets,
  Sun,
  Check,
  Eye,
  X,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface SeoulGlowBundleRoutineCodSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

interface GlassSkinComboKit {
  id: string;
  titleEn: string;
  titleBn: string;
  targetSkin: string;
  step1Product: string;
  step2Product: string;
  step3Product: string;
  freeGift: string;
  regularPrice: number;
  comboPrice: number;
  freeDelivery: boolean;
  image: string;
  amPmGuide: { time: string; instructionsBn: string }[];
}

const GLASS_SKIN_COMBO_KITS: GlassSkinComboKit[] = [
  {
    id: 'combo_glass_starter',
    titleEn: '3-Step Korean Glass Skin Starter Kit (গ্লাস-স্কিন কমপ্লিট কম্বো)',
    titleBn: 'ক্লিনজার + ৯৬% স্নেইল মিউসিন এসেন্স + বিউটি অফ জোসন সানস্ক্রিন',
    targetSkin: 'All Skin Types · Dullness, Dehydration & Barrier Repair',
    step1Product: 'Round Lab 1025 Dokdo Low-pH Cleanser (150ml)',
    step2Product: 'COSRX Advanced Snail 96 Mucin Power Essence (100ml)',
    step3Product: 'Beauty of Joseon Relief Sun : Rice + Probiotics SPF50+ (50ml)',
    freeGift: 'FREE Mediheal Korean Hydrating Sheet Mask (Worth ৳250)',
    regularPrice: 4800,
    comboPrice: 3990,
    freeDelivery: true,
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=85',
    amPmGuide: [
      {
        time: 'Morning Routine (সকাল ৮টা)',
        instructionsBn:
          '১. Dokdo Cleanser দিয়ে মুখ ধুয়ে নিন → ২. ভেজা ত্বকে ২ পাম্প COSRX Snail Mucin ড্যাব করুন → ৩. দুই আঙুল পরিমাণ Beauty of Joseon Sunscreen লাগান।',
      },
      {
        time: 'Night Repair Routine (রাত ১০টা)',
        instructionsBn:
          '১. ক্লিনজার দিয়ে সারাদিনের ধুলোবালি পরিষ্কার করুন → ২. ৩ পাম্প Snail Mucin লাগিয়ে ঘুমিয়ে পড়ুন; সকালে উঠে কাঁচের মতো কোমল ত্বক অনুভব করবেন।',
      },
    ],
  },
  {
    id: 'combo_acne_heartleaf',
    titleEn: '3-Step Acne & Open Pore Calming Kit (ব্রণ ও র‍্যাশ ক্লিয়ার কম্বো)',
    titleBn: 'হার্টলিফ ৭৭% টোনার + সেন্টেলা অ্যাম্পুল + ওয়েটলেস সানস্ক্রিন',
    targetSkin: 'Oily, Acne-Prone, Redness & Sensitive Skin',
    step1Product: 'Anua Heartleaf 77% Soothing Toner (250ml)',
    step2Product: 'SKIN1004 Madagascar Centella Ampoule (100ml)',
    step3Product: 'Beauty of Joseon Relief Sun SPF50+ PA++++ (50ml)',
    freeGift: 'FREE COSRX Acne Pimple Master Patch (24 Patches)',
    regularPrice: 5130,
    comboPrice: 4190,
    freeDelivery: true,
    image:
      'https://images.unsplash.com/photo-1608248597359-0e6d526a6c58?auto=format&fit=crop&w=900&q=85',
    amPmGuide: [
      {
        time: 'Morning Oil-Control Routine',
        instructionsBn:
          '১. মুখ ধোয়ার পর Anua 77% Toner লাগান → ২. ২ ফোঁটা Centella Ampoule ড্যাব করুন → ৩. BOJ Relief Sun লাগিয়ে রোদে বের হন।',
      },
      {
        time: 'Night Blemish Soothing Routine',
        instructionsBn:
          '১. ব্রণের ওপর কটন প্যাডে Anua Toner ভিজিয়ে ৫ মিনিট রাখুন → ২. Centella Ampoule লাগিয়ে ব্রণের ওপর ফ্রি COSRX Pimple Patch লাগিয়ে নিন।',
      },
    ],
  },
  {
    id: 'combo_melasma_glow',
    titleEn: '3-Step Dark Spot & Melasma Correcting Kit (মেছতা ও কালো দাগ রিমুভ কম্বো)',
    titleBn: 'লো-পিএইচ ক্লিনজার + ৫% নায়াসিনামাইড সিরাম + রাইস সানস্ক্রিন',
    targetSkin: 'Hyperpigmentation, Acne Scars, Melasma & Uneven Tone',
    step1Product: 'Round Lab 1025 Dokdo Cleanser (150ml)',
    step2Product: 'AXIS-Y Dark Spot Correcting Glow Serum (50ml — 5% Niacinamide)',
    step3Product: 'Beauty of Joseon Relief Sun : Rice + Probiotics SPF50+ (50ml)',
    freeGift: 'FREE Beauty of Joseon Centella Asiatica Calming Mask',
    regularPrice: 4750,
    comboPrice: 3890,
    freeDelivery: true,
    image:
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=900&q=85',
    amPmGuide: [
      {
        time: 'Morning Brightening & UV Block',
        instructionsBn:
          '১. ক্লিনজার দিয়ে মুখ পরিষ্কার করুন → ২. কালো দাগ ও মেছতার স্থানে AXIS-Y 5% Niacinamide সিরাম লাগান → ৩. দাগ ফিরে আসা রোধে অবশ্যই BOJ SPF50+ সানস্ক্রিন লাগান।',
      },
      {
        time: 'Night Pigmentation Fade Routine',
        instructionsBn:
          '১. মুখ ধুয়ে পুরো মুখে ও দাগের স্থানে ২ লেয়ারে AXIS-Y Glow Serum ম্যাসাজ করুন। ৩-৪ সপ্তাহে দৃশ্যমান পরিবর্তন পাবেন।',
      },
    ],
  },
];

const SINGLE_OR_COMBO_OPTIONS = [
  {
    id: 'combo_glass_starter',
    label:
      '🔥 3-Step Glass Skin Starter Kit (Dokdo Cleanser + COSRX Snail 96 + BOJ Sun) + FREE Sheet Mask & Free Delivery',
    price: 3990,
    isCombo: true,
  },
  {
    id: 'combo_acne_heartleaf',
    label:
      '🌿 3-Step Acne & Pore Calming Kit (Anua 77% Toner + Skin1004 Centella + BOJ Sun) + FREE Pimple Patch & Free Delivery',
    price: 4190,
    isCombo: true,
  },
  {
    id: 'combo_melasma_glow',
    label:
      '✨ 3-Step Dark Spot & Melasma Kit (Dokdo Cleanser + AXIS-Y Glow Serum + BOJ Sun) + FREE Mask & Free Delivery',
    price: 3890,
    isCombo: true,
  },
  {
    id: 'single_cosrx_snail',
    label: 'Single: COSRX Advanced Snail 96 Mucin Power Essence (100ml)',
    price: 1650,
    isCombo: false,
  },
  {
    id: 'single_boj_sun',
    label: 'Single: Beauty of Joseon Relief Sun SPF50+ PA++++ (50ml)',
    price: 1550,
    isCombo: false,
  },
  {
    id: 'single_anua_toner',
    label: 'Single: Anua Heartleaf 77% Soothing Toner (250ml)',
    price: 1890,
    isCombo: false,
  },
  {
    id: 'single_axisy_serum',
    label: 'Single: AXIS-Y Dark Spot Correcting Glow Serum (50ml)',
    price: 1590,
    isCombo: false,
  },
];

export const SeoulGlowBundleRoutineCodSection: React.FC<
  SeoulGlowBundleRoutineCodSectionProps
> = ({ title, subtitle, variant, primaryColor, isDark }) => {
  const [selectedComboId, setSelectedComboId] = useState<string>('combo_glass_starter');
  const [modalComboKit, setModalComboKit] = useState<GlassSkinComboKit | null>(null);

  // COD Form State
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerDistrict, setCustomerDistrict] = useState<string>('Dhaka Metro (২৪ ঘণ্টায় এক্সপ্রেস ডেলিভারি)');
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [selectedCheckoutItemId, setSelectedCheckoutItemId] = useState<string>('combo_glass_starter');
  const [deliveryZone, setDeliveryZone] = useState<'dhaka' | 'outside'>('dhaka');
  const [orderSubmitted, setOrderSubmitted] = useState<boolean>(false);
  const [orderIdCode, setOrderIdCode] = useState<string>('');

  const coralColor = primaryColor || '#E07A5F';
  const isBrutalist = variant === 'varient_3';

  const activeCheckoutOption =
    SINGLE_OR_COMBO_OPTIONS.find((o) => o.id === selectedCheckoutItemId) ||
    SINGLE_OR_COMBO_OPTIONS[0];

  const shippingFee = activeCheckoutOption.isCombo
    ? 0
    : deliveryZone === 'dhaka'
    ? 60
    : 120;

  const grandTotalBdt = activeCheckoutOption.price + shippingFee;

  const handleSelectComboForCheckout = (comboId: string) => {
    setSelectedComboId(comboId);
    setSelectedCheckoutItemId(comboId);
    const el = document.getElementById('seoulglow-cod-checkout');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConfirmCodOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      return;
    }
    const randomOrderCode = `SG-KR-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderIdCode(randomOrderCode);
    setOrderSubmitted(true);
  };

  return (
    <section
      id="seoulglow-glass-bundle"
      className={`py-16 sm:py-20 transition-colors ${
        isDark
          ? 'bg-[#0E1015] text-stone-100'
          : 'bg-gradient-to-b from-[#FFF5F5] to-[#FAFAFA] text-[#222222]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* ===================================================================== */}
        {/* PART 1: THE "3-STEP KOREAN GLASS SKIN" BUNDLE & ROUTINE GUIDE         */}
        {/* ===================================================================== */}
        <div className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#06B6D4]">
              <Gift size={15} />
              <span>Value-Driven Complete Routine · গ্লাস-স্কিন কমপ্লিট কম্বো</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              <EditableText
                id="seoulglow_bundle_section_title"
                defaultText={
                  title ||
                  'দ্য ৩-স্টেপ কোরিয়ান গ্লাস-স্কিন স্টার্টার কিট — আলাদা কিনলে ৳ ৪,৮০০ | কম্বো অফার মূল্য: ৳ ৩,৯৯০ + ফ্রি ডেলিভারি!'
                }
              />
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] dark:text-stone-300 leading-relaxed">
              <EditableText
                id="seoulglow_bundle_section_subtitle"
                defaultText={
                  subtitle ||
                  'শুধু ১টি সিরাম ব্যবহার করলেই গ্লাস-স্কিন পাওয়া যায় না। চর্মরোগ বিশেষজ্ঞদের মতে ত্বকের পূর্ণাঙ্গ পরিবর্তনের জন্য প্রয়োজন সঠিক ক্লিনজিং, ট্রিটমেন্ট এবং ইউভি প্রোটেকশন। কম্বো অর্ডারে সাশ্রয় করুন ৳৮১০ এবং পান ফ্রি কোরিয়ান শিট মাস্ক!'
                }
              />
            </p>
          </div>

          {/* Visual 3-Step Korean Glass-Skin Routine Architecture Strip */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border grid grid-cols-1 md:grid-cols-3 gap-6 ${
              isDark
                ? 'bg-[#151821] border-stone-800'
                : 'bg-white border-[#F3F4F6] shadow-xs'
            }`}
          >
            {[
              {
                stepNum: 'Step 01 · Cleanse',
                titleBn: 'ত্বকের ধুলোবালি ও অতিরিক্ত তেল পরিষ্কার',
                productFocus: 'pH-Balanced Low-pH Korean Cleanser (pH 5.5)',
                descBn:
                  'ত্বকের প্রাকৃতিক আর্দ্রতা ও ব্যারিয়ার নষ্ট না করে পোরসের ভেতরের জমে থাকা ঘাম, মেকআপ ও ধুলোবালি পরিষ্কার করে।',
                icon: Droplets,
              },
              {
                stepNum: 'Step 02 · Treat & Hydrate',
                titleBn: 'পোরস, ব্রণ ও কালো দাগ দূর করা',
                productFocus: '96% Snail Mucin / 5% Niacinamide / 77% Heartleaf',
                descBn:
                  'আপনার ত্বকের মূল সমস্যা অনুযায়ী ড্যামেজড কোষ রিপেয়ার করে, মেছতা ও দাগ হালকা করে এবং ৭২ ঘণ্টা হাইড্রেশন ধরে রাখে।',
                icon: Sparkles,
              },
              {
                stepNum: 'Step 03 · UV Protect',
                titleBn: 'রোদ, মেছতা ও কালচে ভাব থেকে সুরক্ষা',
                productFocus: 'No-White-Cast Probiotics Sunscreen SPF50+ PA++++',
                descBn:
                  'হোয়াইট কাস্ট বা তেলতেলে ভাব ছাড়াই কড়া রোদ থেকে ত্বককে রক্ষা করে এবং সিরামের কার্যকারিতা দ্বিগুণ বাড়িয়ে দেয়।',
                icon: Sun,
              },
            ].map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.stepNum}
                  className="space-y-2.5 relative pb-4 md:pb-0 border-b md:border-b-0 md:border-r last:border-0 border-stone-100 dark:border-stone-800 md:pr-6 last:pr-0"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-black uppercase tracking-wider"
                      style={{ color: coralColor }}
                    >
                      {st.stepNum}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-[#D8E2DC]/60 text-[#222222] flex items-center justify-center">
                      <Icon size={16} />
                    </div>
                  </div>
                  <h3 className="text-base font-extrabold">{st.titleBn}</h3>
                  <div className="text-[11px] font-bold text-[#06B6D4]">
                    {st.productFocus}
                  </div>
                  <p className="text-xs text-[#6B7280] dark:text-stone-400 leading-relaxed">
                    {st.descBn}
                  </p>
                </div>
              );
            })}
          </div>

          {/* 3 Curated Combo Kit Cards — Click ANY Card for Full Routine Modal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {GLASS_SKIN_COMBO_KITS.map((kit) => {
              const isSelected = selectedComboId === kit.id;
              const savings = kit.regularPrice - kit.comboPrice;
              return (
                <div
                  key={kit.id}
                  onClick={() => setModalComboKit(kit)}
                  className={`group rounded-3xl overflow-hidden border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-2 border-[#E07A5F] shadow-xl'
                      : isDark
                      ? 'bg-[#151821] border-stone-800 hover:border-stone-700'
                      : 'bg-white border-[#F3F4F6] hover:border-rose-200 shadow-sm'
                  } ${isBrutalist ? 'rounded-none border-2 border-[#222222]' : ''}`}
                >
                  <div>
                    <div className="relative h-48 overflow-hidden bg-stone-100">
                      <img
                        src={kit.image}
                        alt={kit.titleEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                      <span
                        className="absolute top-3 left-3 px-3 py-1 rounded-xl text-white text-[11px] font-extrabold shadow-xs"
                        style={{ backgroundColor: coralColor }}
                      >
                        Save ৳ {savings} + FREE Delivery
                      </span>
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/65 text-white text-[10px] font-bold flex items-center gap-1 backdrop-blur-xs">
                        <Eye size={11} className="text-cyan-300" />
                        <span>AM/PM Guide</span>
                      </span>
                      <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                        <div className="text-[11px] font-bold text-cyan-300">
                          {kit.targetSkin}
                        </div>
                        <h3 className="text-base font-black leading-snug mt-0.5">
                          {kit.titleEn}
                        </h3>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <p className="text-xs font-bold text-[#E07A5F]">
                        {kit.titleBn}
                      </p>

                      <ul className="space-y-2 text-xs text-[#222222] dark:text-stone-200">
                        <li className="flex items-start gap-2">
                          <Check size={14} className="text-[#06B6D4] shrink-0 mt-0.5" />
                          <span>
                            <strong>Step 1:</strong> {kit.step1Product}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={14} className="text-[#06B6D4] shrink-0 mt-0.5" />
                          <span>
                            <strong>Step 2:</strong> {kit.step2Product}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={14} className="text-[#06B6D4] shrink-0 mt-0.5" />
                          <span>
                            <strong>Step 3:</strong> {kit.step3Product}
                          </span>
                        </li>
                      </ul>

                      <div className="p-2.5 rounded-xl bg-[#D8E2DC]/45 dark:bg-stone-800 text-[11px] font-extrabold text-[#222222] dark:text-emerald-300 flex items-center gap-1.5">
                        <Gift size={14} className="text-[#E07A5F] shrink-0" />
                        <span>{kit.freeGift}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 py-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[10px] text-[#6B7280]">
                        আলাদা কিনলে <s>৳ {kit.regularPrice.toLocaleString()}</s>
                      </div>
                      <div
                        className="text-xl font-black"
                        style={{ color: coralColor }}
                      >
                        ৳ {kit.comboPrice.toLocaleString()}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectComboForCheckout(kit.id);
                      }}
                      className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-white shadow-xs transition hover:opacity-95 cursor-pointer"
                      style={{ backgroundColor: coralColor }}
                    >
                      Select Combo (COD)
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* PART 2: FRICTIONLESS BANGLADESH CASH-ON-DELIVERY (COD) CHECKOUT FORM  */}
        {/* ===================================================================== */}
        <div
          id="seoulglow-cod-checkout"
          className={`rounded-3xl p-6 sm:p-10 border shadow-lg ${
            isDark
              ? 'bg-[#151821] border-stone-800'
              : 'bg-white border-[#E5E7EB]'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left 5 Cols: Trust Seals & Open-Box Barcode Guarantee */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#06B6D4]">
                <ShieldCheck size={16} />
                <span>Zero Advance Payment · ১০০% ক্যাশ অন ডেলিভারি</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
                <EditableText
                  id="seoulglow_cod_form_headline"
                  defaultText="আপনার গ্লাস-স্কিন জার্নি শুরু করুন আজই — অর্ডার করতে নিচের ফর্মটি পূরণ করুন"
                />
              </h3>

              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-stone-300 leading-relaxed">
                <EditableText
                  id="seoulglow_cod_form_subtext"
                  defaultText="অগ্রিম ১ টাকাও দিতে হবে না। ডেলিভারি ম্যানের সামনে প্রোডাক্টের বারকোড ও ব্যাচ কোড স্ক্যান করে অরিজিনাল নিশ্চিত হয়ে মূল্য পরিশোধ করুন।"
                />
              </p>

              {/* 3 High-Trust Verification Guarantees */}
              <div className="space-y-3 pt-1">
                {[
                  {
                    icon: QrCode,
                    title: 'Open-Box Barcode & HiddenTag Scan',
                    desc: 'পার্সেল রিসিভ করার সময় ডেলিভারি ম্যানের সামনেই HiddenTag বা বারকোড স্ক্যান করে কোরিয়ান অরিজিন যাচাই করতে পারবেন।',
                  },
                  {
                    icon: ShieldCheck,
                    title: '10X Money-Back Authenticity Invoice',
                    desc: 'প্রতিটি বক্সে আমাদের স্বাক্ষরিত গ্যারান্টি কার্ড থাকে—নকল প্রমাণ করতে পারলে ১০ গুণ টাকা ফেরত।',
                  },
                  {
                    icon: Truck,
                    title: 'Steadfast & Pathao Express Cold-Pack',
                    desc: 'তাপমাত্রা থেকে সিরামের গুণমান রক্ষায় থার্মাল বাবল-র‍্যাপে ঢাকায় ২৪ ঘণ্টায় এবং ঢাকার বাইরে ৪৮ ঘণ্টায় ডেলিভারি।',
                  },
                ].map((g) => {
                  const Icon = g.icon;
                  return (
                    <div
                      key={g.title}
                      className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                        isDark
                          ? 'bg-stone-900/90 border-stone-800'
                          : 'bg-[#FFF5F5]/70 border-rose-100'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-[#06B6D4]/15 text-[#06B6D4] flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-extrabold">{g.title}</div>
                        <p className="text-[11px] text-[#6B7280] dark:text-stone-400 mt-0.5 leading-relaxed">
                          {g.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 7 Cols: 1-Click BD Cash-on-Delivery Checkout Form */}
            <div className="lg:col-span-7">
              {!orderSubmitted ? (
                <form
                  onSubmit={handleConfirmCodOrder}
                  className={`p-6 sm:p-7 rounded-3xl border space-y-5 ${
                    isDark
                      ? 'bg-[#0E1015] border-stone-800'
                      : 'bg-[#FAFAFA] border-stone-200/90'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
                    <span className="text-sm font-black">
                      Express Cash on Delivery Order Form
                    </span>
                    <span className="text-xs font-extrabold text-[#06B6D4]">
                      No Advance Required ✓
                    </span>
                  </div>

                  {/* Field 4 (Top for clarity): Product or Combo Selection */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold">
                      ১. স্কিনকেয়ার প্রোডাক্ট বা কম্বো সিলেকশন (Product / 3-Step Combo Selector) *
                    </label>
                    <select
                      value={selectedCheckoutItemId}
                      onChange={(e) => setSelectedCheckoutItemId(e.target.value)}
                      className={`w-full px-3.5 py-3 rounded-xl border text-xs font-bold focus:outline-none cursor-pointer ${
                        isDark
                          ? 'bg-stone-900 border-stone-700 text-white'
                          : 'bg-white border-stone-300 text-[#222222]'
                      }`}
                    >
                      {SINGLE_OR_COMBO_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label} — ৳ {opt.price.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Fields 1 & 2: Name & 11-Digit BD Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-extrabold">
                        ২. আপনার নাম (Full Name) *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="যেমন: Nusrat Jahan / নুসরাত জাহান"
                        className={`w-full px-3.5 py-3 rounded-xl border text-xs font-semibold focus:outline-none ${
                          isDark
                            ? 'bg-stone-900 border-stone-700 text-white'
                            : 'bg-white border-stone-300 text-[#222222]'
                        }`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-extrabold">
                        ৩. মোবাইল নাম্বার (11-Digit BD Phone Number) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="017XXXXXXXX / 018XXXXXXXX"
                        className={`w-full px-3.5 py-3 rounded-xl border text-xs font-semibold focus:outline-none ${
                          isDark
                            ? 'bg-stone-900 border-stone-700 text-white'
                            : 'bg-white border-stone-300 text-[#222222]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Delivery Zone & District */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-extrabold">
                        জেলা ও ডেলিভারি এরিয়া (District / Thana)
                      </label>
                      <select
                        value={customerDistrict}
                        onChange={(e) => {
                          setCustomerDistrict(e.target.value);
                          if (e.target.value.includes('Dhaka')) {
                            setDeliveryZone('dhaka');
                          } else {
                            setDeliveryZone('outside');
                          }
                        }}
                        className={`w-full px-3.5 py-3 rounded-xl border text-xs font-semibold focus:outline-none cursor-pointer ${
                          isDark
                            ? 'bg-stone-900 border-stone-700 text-white'
                            : 'bg-white border-stone-300 text-[#222222]'
                        }`}
                      >
                        <option>Dhaka Metro (২৪ ঘণ্টায় এক্সপ্রেস ডেলিভারি)</option>
                        <option>Chattogram City (৪৮ ঘণ্টায় ডেলিভারি)</option>
                        <option>Sylhet Sadar (৪৮ ঘণ্টায় ডেলিভারি)</option>
                        <option>Rajshahi / Khulna / Barishal / Rangpur</option>
                        <option>Other Upazila / District (সারা বাংলাদেশ)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-extrabold">
                        ডেলিভারি চার্জ (Courier Zone)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setDeliveryZone('dhaka')}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-bold cursor-pointer ${
                            deliveryZone === 'dhaka'
                              ? 'border-[#E07A5F] bg-[#FFF5F5] text-[#222222] dark:bg-stone-800 dark:text-white'
                              : 'border-stone-200 dark:border-stone-700'
                          }`}
                        >
                          Inside Dhaka ({activeCheckoutOption.isCombo ? 'FREE' : '৳60'})
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeliveryZone('outside')}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-bold cursor-pointer ${
                            deliveryZone === 'outside'
                              ? 'border-[#E07A5F] bg-[#FFF5F5] text-[#222222] dark:bg-stone-800 dark:text-white'
                              : 'border-stone-200 dark:border-stone-700'
                          }`}
                        >
                          Outside Dhaka ({activeCheckoutOption.isCombo ? 'FREE' : '৳120'})
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Field 3: Full Address */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-extrabold">
                      ৪. সম্পূর্ণ ঠিকানা (House, Road, Area, District) *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="বাসা নং, রোড নং, এলাকা (যেমন: বাসা ১২, রোড ৫, ধানমন্ডি, ঢাকা)"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none ${
                        isDark
                          ? 'bg-stone-900 border-stone-700 text-white'
                          : 'bg-white border-stone-300 text-[#222222]'
                      }`}
                    />
                  </div>

                  {/* Order Summary Box */}
                  <div
                    className={`p-4 rounded-2xl border space-y-2 text-xs ${
                      isDark
                        ? 'bg-stone-900/90 border-stone-800'
                        : 'bg-white border-stone-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B7280]">Selected K-Beauty Item:</span>
                      <span className="font-bold text-right max-w-xs truncate">
                        {activeCheckoutOption.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B7280]">Delivery Charge:</span>
                      <span className="font-extrabold text-emerald-600">
                        {shippingFee === 0
                          ? 'FREE (কম্বো অফারে ফ্রি ডেলিভারি + ফ্রি শিট মাস্ক)'
                          : `৳ ${shippingFee}`}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-sm font-black">
                      <span>সর্বমোট প্রদেয় (Cash on Delivery):</span>
                      <span className="text-xl" style={{ color: coralColor }}>
                        ৳ {grandTotalBdt.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl text-sm sm:text-base font-black text-white shadow-lg flex items-center justify-center gap-2 transition hover:opacity-95 cursor-pointer"
                    style={{ backgroundColor: coralColor }}
                  >
                    <ShoppingBag size={18} />
                    <span>
                      অর্ডার কনফার্ম করুন — Cash on Delivery (৳ {grandTotalBdt.toLocaleString()})
                    </span>
                  </button>
                </form>
              ) : (
                <div
                  className={`p-7 rounded-3xl border-2 border-emerald-500 space-y-4 ${
                    isDark ? 'bg-emerald-950/20' : 'bg-emerald-50/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-extrabold">
                      ✓ Order Confirmed · Cash on Delivery
                    </span>
                    <span className="font-mono text-xs font-black text-emerald-700 dark:text-emerald-300">
                      Invoice #{orderIdCode}
                    </span>
                  </div>
                  <h4 className="text-xl font-black">
                    অভিনন্দন {customerName}! আপনার SeoulGlow K-Beauty অর্ডারটি সফলভাবে গৃহীত হয়েছে।
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6B7280] dark:text-stone-300 leading-relaxed">
                    আমাদের স্কিনকেয়ার প্রতিনিধি আগামী ১৫ মিনিটের মধ্যে আপনার <strong>{customerPhone}</strong> নাম্বারে কল করে অর্ডার ও ঠিকানা কনফার্ম করবেন। ডেলিভারি ম্যানের সামনে প্রোডাক্টের বারকোড স্ক্যান করে <strong>৳ {grandTotalBdt.toLocaleString()}</strong> পরিশোধ করবেন।
                  </p>
                  <button
                    type="button"
                    onClick={() => setOrderSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-extrabold cursor-pointer"
                  >
                    নতুন আরেকটি অর্ডার করুন
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MODAL: 3-STEP COMBO ROUTINE FULL DETAILS MODAL                        */}
      {/* ===================================================================== */}
      {modalComboKit && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
          onClick={() => setModalComboKit(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-2xl rounded-3xl overflow-hidden border shadow-2xl ${
              isDark
                ? 'bg-[#16181E] border-stone-800 text-white'
                : 'bg-white border-stone-200 text-[#222222]'
            }`}
          >
            <div className="relative h-52">
              <img
                src={modalComboKit.image}
                alt={modalComboKit.titleEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <button
                type="button"
                onClick={() => setModalComboKit(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black cursor-pointer"
              >
                <X size={16} />
              </button>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs font-extrabold text-cyan-300">
                  {modalComboKit.targetSkin}
                </span>
                <h3 className="text-xl font-black mt-0.5">
                  {modalComboKit.titleEn}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="font-extrabold text-[#06B6D4] uppercase">
                  Included Full-Size Authentic Products:
                </div>
                <div>• <strong>Step 1:</strong> {modalComboKit.step1Product}</div>
                <div>• <strong>Step 2:</strong> {modalComboKit.step2Product}</div>
                <div>• <strong>Step 3:</strong> {modalComboKit.step3Product}</div>
                <div className="text-emerald-600 font-bold">
                  + {modalComboKit.freeGift}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-extrabold uppercase text-[#6B7280]">
                  Dermatologist AM / PM Application Guide:
                </div>
                {modalComboKit.amPmGuide.map((g, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border text-xs ${
                      isDark
                        ? 'bg-stone-900 border-stone-800'
                        : 'bg-[#FFF5F5] border-rose-100'
                    }`}
                  >
                    <div className="font-black text-[#E07A5F]">{g.time}</div>
                    <p className="mt-1 text-[#6B7280] dark:text-stone-300 leading-relaxed">
                      {g.instructionsBn}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <div>
                  <span
                    className="text-2xl font-black"
                    style={{ color: coralColor }}
                  >
                    ৳ {modalComboKit.comboPrice.toLocaleString()}
                  </span>
                  <span className="text-xs line-through text-[#6B7280] ml-2">
                    ৳ {modalComboKit.regularPrice.toLocaleString()}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const id = modalComboKit.id;
                    setModalComboKit(null);
                    handleSelectComboForCheckout(id);
                  }}
                  className="px-6 py-3 rounded-xl text-xs font-extrabold text-white shadow-md cursor-pointer"
                  style={{ backgroundColor: coralColor }}
                >
                  Order This 3-Step Combo (COD) →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
