import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  MapPin,
  Sparkles,
  FileCheck2,
  ShoppingBag,
  ArrowRight,
  Microscope,
  Truck,
  RefreshCw,
  Scale,
} from 'lucide-react';
import {
  EditableText,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface OrganicFruitsCatalogTrustSectionProps {
  title: string;
  subtitle: string;
  variant: DoctorVariantId;
  primaryColor: string;
  isDark?: boolean;
}

interface OrganicCatalogItem {
  id: string;
  category: 'mangoes' | 'litchis' | 'molasses' | 'sweets';
  categoryLabel: string;
  banglaTitle: string;
  englishTitle: string;
  origin: string;
  pricePerKg: number;
  defaultBoxKg: number;
  tasteNotes: string;
  labSafetyTag: string;
  image: string;
}

const ORGANIC_PRODUCTS: OrganicCatalogItem[] = [
  {
    id: 'mango_himsagar',
    category: 'mangoes',
    categoryLabel: 'Chapainawabganj Mango',
    banglaTitle: 'চাঁপাইনবাবগঞ্জের জিআই ক্ষীরশাপাত / হিমসাগর আম',
    englishTitle: 'GI-Tagged Shibganj Himsagar Mango (Grade-A Export)',
    origin: 'শিবগঞ্জ ও কানসাট, চাঁপাইনবাবগঞ্জ',
    pricePerKg: 145,
    defaultBoxKg: 12,
    tasteNotes: '১০০% আঁশহীন, পাতলা খোসা, ক্রিমি পাল্প ও প্রাকৃতিক মধু-মিষ্টি সুঘ্রাণ',
    labSafetyTag: '0.00 ppm Formalin • Zero Carbide',
    image:
      'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'mango_amrapali',
    category: 'mangoes',
    categoryLabel: 'Rajshahi Mango',
    banglaTitle: 'রাজশাহী ও নওগাঁর রুপালি / আম্রপালি আম',
    englishTitle: 'Naogaon Sapahar Sweet Amrapali Mango',
    origin: 'সাপাহার, নওগাঁ ও বাঘা, রাজশাহী',
    pricePerKg: 135,
    defaultBoxKg: 12,
    tasteNotes: 'গাঢ় কমলা-লাল শাঁস, সর্বোচ্চ মিষ্টতা (২৪° Brix) এবং দীর্ঘস্থায়ী সতেজতা',
    labSafetyTag: 'Tree-Ripened • Bagging Method',
    image:
      'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'mango_langra',
    category: 'mangoes',
    categoryLabel: 'Rajshahi Heritage Mango',
    banglaTitle: 'রাজশাহীর ঐতিহ্যবাহী ল্যাংড়া আম (Royal Langra)',
    englishTitle: 'Rajshahi Charghat Aromatic Langra Mango',
    origin: 'চারঘাট ও বাঘা, রাজশাহী',
    pricePerKg: 140,
    defaultBoxKg: 12,
    tasteNotes: 'অনন্য রাজকীয় সুবাস, রসালো শাঁস ও পাতলা আঁটি',
    labSafetyTag: 'Zero Ethephon Spray • Natural Harvest',
    image:
      'https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'dinajpur_litchi',
    category: 'litchis',
    categoryLabel: 'Dinajpur Litchi',
    banglaTitle: 'দিনাজপুরের বিরল অঞ্চলের বেদানা ও চায়না-৩ লিচু',
    englishTitle: 'Dinajpur Biral Bedana & China-3 Premium Litchi',
    origin: 'মাধববাটি ও বিরল, দিনাজপুর',
    pricePerKg: 480,
    defaultBoxKg: 5,
    tasteNotes: 'কাগজের মতো পাতলা খোসা, ছোট বিচি ও টসটসে রসালো সাদা শাঁস',
    labSafetyTag: 'No Artificial Red Dye • Morning Dew Picked',
    image:
      'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'date_molasses',
    category: 'molasses',
    categoryLabel: 'Pure Date Molasses (খেজুরের গুড়)',
    banglaTitle: 'যশোরের খাঁটি নলেন পাটালি ও দানাদার ঝোলা খেজুরের গুড়',
    englishTitle: 'Jashore Chaugachha 100% Pure Date Palm Jaggery',
    origin: 'চৌগাছা ও খেজুরতলা, যশোর',
    pricePerKg: 520,
    defaultBoxKg: 3,
    tasteNotes: '১০০% কাঁচা খেজুরের রস কাঠের চুলায় জ্বাল দেওয়া — এক দানা চিনি বা হাইড্রোজ নেই',
    labSafetyTag: '0% Cane Sugar • 0% Alum/Hydrose',
    image:
      'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'cow_milk_sweets',
    category: 'sweets',
    categoryLabel: 'Pure Cow Milk Sweets (খাঁটি ছানার মিষ্টি)',
    banglaTitle: 'পাবনা ও নাটোরের খাঁটি গাভীর দুধের ছানার সন্দেশ ও কাঁচাগোল্লা',
    englishTitle: 'Natore & Pabna Pure Grass-Fed Cow Milk Artisanal Sweets',
    origin: 'নাটোর ও ভাঙ্গুড়া, পাবনা',
    pricePerKg: 680,
    defaultBoxKg: 2,
    tasteNotes: 'খাঁটি গাভীর দুধের ছানা ও নলেন গুড়ের সন্দেশ — ময়দা বা ভেজাল তেল সম্পূর্ণমুক্ত',
    labSafetyTag: '100% Pure Chhana • Vacuum Insulated Box',
    image:
      'https://images.unsplash.com/photo-1605197584547-c93c12817271?auto=format&fit=crop&w=900&q=85',
  },
];

export const OrganicFruitsCatalogTrustSection: React.FC<
  OrganicFruitsCatalogTrustSectionProps
> = ({ title, subtitle, variant }) => {
  const [activeCategory, setActiveCategory] = useState<
    'all' | 'mangoes' | 'litchis' | 'molasses' | 'sweets'
  >('all');
  const [selectedLabBatch, setSelectedLabBatch] = useState<'mango_report' | 'gur_report'>(
    'mango_report'
  );

  const filteredProducts =
    activeCategory === 'all'
      ? ORGANIC_PRODUCTS
      : ORGANIC_PRODUCTS.filter((p) => p.category === activeCategory);

  const handleSelectForCod = (item: OrganicCatalogItem) => {
    window.dispatchEvent(
      new CustomEvent('organic:select-product', {
        detail: {
          productName: item.banglaTitle,
          kgQty: item.defaultBoxKg,
          unitPrice: item.pricePerKg,
        },
      })
    );
    const el = document.getElementById('organic-cod-order-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isDarkVariant = variant === 'varient_3';

  return (
    <section
      id="organic-product-lineup"
      className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-t"
      style={{
        backgroundColor: isDarkVariant ? '#132A1E' : '#F6F2E9',
        borderColor: isDarkVariant ? '#1E3F2E' : '#E6DFD3',
        color: isDarkVariant ? '#FAF6EE' : '#1F2937',
        fontFamily: "'Plus Jakarta Sans', 'Hind Siliguri', sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* =============================================================== */}
        {/* 1. PRODUCT LINEUP SHOWCASE (MANGOES, LITCHIS, MOLASSES, SWEETS) */}
        {/* =============================================================== */}
        <div className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#14532D] dark:text-emerald-300">
                <Sparkles size={14} className="text-[#D97706]" />
                <span>Direct Orchard &amp; Heritage Artisanal Lineup</span>
              </div>
              <h2
                className="text-2xl sm:text-4xl font-black tracking-tight"
                style={{ fontFamily: "'Playfair Display', 'Hind Siliguri', serif" }}
              >
                <EditableText
                  id="organic_catalog_section_title"
                  defaultText={
                    title ||
                    'আমাদের বাগান ও ঐতিহ্যবাহী পণ্যের তালিকা (Seasonal Organic Lineup)'
                  }
                  as="span"
                />
              </h2>
              <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                <EditableText
                  id="organic_catalog_section_subtitle"
                  defaultText={
                    subtitle ||
                    'চাঁপাইনবাবগঞ্জের হিমসাগর, ল্যাংড়া ও আম্রপালি আম, দিনাজপুরের লিচু, যশোরের খাঁটি খেজুরের গুড় এবং নাটোর-পাবনার ছানার মিষ্টি।'
                  }
                  as="span"
                />
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'সব পণ্য (All 6)' },
                { id: 'mangoes', label: 'রাজশাহীর আম (Mangoes)' },
                { id: 'litchis', label: 'দিনাজপুরের লিচু (Litchis)' },
                { id: 'molasses', label: 'খেজুরের গুড় (Date Molasses)' },
                { id: 'sweets', label: 'খাঁটি ছানার মিষ্টি (Cow Milk Sweets)' },
              ].map((tab) => {
                const active = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                      active
                        ? 'bg-[#14532D] text-white border-[#14532D] shadow-xs'
                        : 'bg-white text-neutral-800 border-[#E6DFD3] hover:border-[#D97706]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all"
                style={{
                  backgroundColor: isDarkVariant ? '#183627' : '#FFFFFF',
                  borderColor: isDarkVariant ? '#27523C' : '#E6DFD3',
                }}
              >
                <div>
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.englishTitle}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-extrabold bg-[#14532D] text-white shadow-xs">
                      {item.categoryLabel}
                    </div>
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-mono font-extrabold bg-black/75 text-[#FDE047] backdrop-blur-xs">
                      {item.labSafetyTag}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#D97706]">
                      <MapPin size={13} />
                      <span>বাগান/উৎস: {item.origin}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold leading-snug">
                      {item.banglaTitle}
                    </h3>

                    <p className="text-xs opacity-75 leading-relaxed">{item.tasteNotes}</p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] uppercase font-bold opacity-60">
                      বাগান রেট (Direct Rate)
                    </div>
                    <div className="text-lg font-black text-[#14532D] dark:text-emerald-300">
                      ৳{item.pricePerKg}
                      <span className="text-xs font-bold opacity-75">/কেজি</span>
                    </div>
                    <div className="text-[10px] opacity-70 font-semibold">
                      স্ট্যান্ডার্ড বক্স: {item.defaultBoxKg} কেজি (৳
                      {(item.pricePerKg * item.defaultBoxKg).toLocaleString()})
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectForCod(item)}
                    className="px-4 py-2.5 rounded-xl bg-[#D97706] text-white text-xs font-extrabold hover:opacity-95 transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <ShoppingBag size={13} />
                    <span>অর্ডার করুন ({item.defaultBoxKg}kg)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =============================================================== */}
        {/* 2. MANDATORY SECTION: TRUST & GUARANTEE (FORMALIN-FREE LAB QA)  */}
        {/* =============================================================== */}
        <div
          id="organic-lab-guarantee"
          className="rounded-3xl border-2 p-6 sm:p-10 shadow-xl space-y-8"
          style={{
            backgroundColor: isDarkVariant ? '#0F2419' : '#FFFFFF',
            borderColor: '#14532D',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 Cols: 4-Pillar Chemical-Free & Money-Back Guarantee */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14532D]/10 text-[#14532D] dark:bg-emerald-900 dark:text-emerald-200 text-xs font-extrabold">
                <Microscope size={14} />
                <span>Trust &amp; Guarantee Section • ১০০% কেমিক্যাল-মুক্ত গ্যারান্টি</span>
              </div>

              <h3
                className="text-2xl sm:text-3xl font-black tracking-tight leading-snug"
                style={{ fontFamily: "'Playfair Display', 'Hind Siliguri', serif" }}
              >
                কেন ঢাকার ৮,৪০০+ সচেতন মা-বাবা ও কর্পোরেট পরিবার আমাদের ওপর চোখ বন্ধ করে ভরসা করেন?
              </h3>

              <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                বাজারের সাধারণ ফলে কার্বাইড, ইথেফন ও ফরমালিন ব্যবহারের ফলে শিশুদের লিভার ও কিডনি ঝুঁকিতে পড়ে। আমরা বাগান চুক্তি থেকে শুরু করে আপনার দরজায় পৌঁছানো পর্যন্ত ৪ স্তরের নিরাপত্তা নিশ্চিত করি:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-2xl border border-[#E6DFD3] bg-[#FCF9F2] dark:bg-black/25 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[#14532D] dark:text-emerald-300">
                    <ShieldCheck size={16} className="text-[#D97706]" />
                    <span>১. ল্যাব টেস্টেড ও ফ্রি টেস্ট কিট</span>
                  </div>
                  <p className="text-xs opacity-80 leading-relaxed">
                    প্রতিটি ব্যাচ BCSIR অনুমোদিত কিটে পরীক্ষা করা হয়। চাইলে ডেলিভারিম্যানের সামনেই আপনি নিজে পরীক্ষা করে নিতে পারবেন।
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-[#E6DFD3] bg-[#FCF9F2] dark:bg-black/25 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[#14532D] dark:text-emerald-300">
                    <Scale size={16} className="text-[#D97706]" />
                    <span>২. নেট ওজন গ্যারান্টি (ক্যারেট বাদে)</span>
                  </div>
                  <p className="text-xs opacity-80 leading-relaxed">
                    ১২ কেজি আমের অর্ডারে আমরা ১২.৫ কেজি ফল দেই (ক্যারেটের ওজন সম্পূর্ণ আলাদা), যাতে পথে শুকিয়ে গেলেও আপনি পুরো ওজন পান।
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-[#E6DFD3] bg-[#FCF9F2] dark:bg-black/25 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[#14532D] dark:text-emerald-300">
                    <RefreshCw size={16} className="text-[#D97706]" />
                    <span>৩. ১০০% ড্যামেজ রিপ্লেসমেন্ট গ্যারান্টি</span>
                  </div>
                  <p className="text-xs opacity-80 leading-relaxed">
                    ডেলিভারির সময় কোনো আম বা মিষ্টি নষ্ট থাকলে সাথে সাথে ছবি তুলে পাঠালে বিনা প্রশ্নে রিপ্লেসমেন্ট অথবা মূল্য ফেরত।
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-[#E6DFD3] bg-[#FCF9F2] dark:bg-black/25 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[#14532D] dark:text-emerald-300">
                    <Truck size={16} className="text-[#D97706]" />
                    <span>৪. ফ্রুট-গ্রেড ভেন্টিলেটেড প্যাকেজিং</span>
                  </div>
                  <p className="text-xs opacity-80 leading-relaxed">
                    সাধারণ কার্টনে আম গরম হয়ে পচে যায়; আমরা বাতাস চলাচলকারী ফুড-গ্রেড প্লাস্টিক ক্যারেট ও শক-প্রুফ পেপার কুশন ব্যবহার করি।
                  </p>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Interactive Lab Certificate & Open-Box Challenge Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-[#14532D] text-[#FEFCE8] p-5 sm:p-6 border-2 border-[#D97706] space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#FDE047]">
                    <FileCheck2 size={16} />
                    <span>LIVE BATCH QA CERTIFICATE</span>
                  </span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setSelectedLabBatch('mango_report')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                        selectedLabBatch === 'mango_report'
                          ? 'bg-[#D97706] text-white'
                          : 'bg-white/10 text-white/80'
                      }`}
                    >
                      আম ও লিচু রিপোর্ট
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedLabBatch('gur_report')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                        selectedLabBatch === 'gur_report'
                          ? 'bg-[#D97706] text-white'
                          : 'bg-white/10 text-white/80'
                      }`}
                    >
                      গুড় ও মিষ্টি রিপোর্ট
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/30 border border-white/15 space-y-2.5 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="opacity-70">Certificate ID:</span>
                    <span className="font-bold text-[#FDE047]">
                      {selectedLabBatch === 'mango_report'
                        ? 'BCSIR-RAJ-2026-0842'
                        : 'BSTI-JAS-2026-1190'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Formalin / HCHO:</span>
                    <span className="font-bold text-emerald-300">0.00 mg/kg (NOT DETECTED)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Calcium Carbide:</span>
                    <span className="font-bold text-emerald-300">NEGATIVE (0.00%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">
                      {selectedLabBatch === 'mango_report'
                        ? 'Natural Brix Level:'
                        : 'Sucrose/Hydrose Adulteration:'}
                    </span>
                    <span className="font-bold text-emerald-300">
                      {selectedLabBatch === 'mango_report'
                        ? '22.4° Brix (Tree Ripened)'
                        : '0.0% Added Cane Sugar'}
                    </span>
                  </div>
                </div>

                {/* 100,000 BDT Purity Challenge Banner */}
                <div className="p-3.5 rounded-2xl bg-[#D97706]/25 border border-[#FDE047]/40 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#FDE047]">
                    <Award size={15} />
                    <span>৳১,০০,০০০ টাকার বিশুদ্ধতা চ্যালেঞ্জ (Purity Guarantee)</span>
                  </div>
                  <p className="text-[11px] text-emerald-50/90 leading-relaxed">
                    আমাদের যেকোনো ফল বা খেজুরের গুড়ে ল্যাব টেস্টে ১% কেমিক্যাল, ফরমালিন বা চিনির ভেজাল প্রমাণ করতে পারলে সম্পূর্ণ অর্ডার ফ্রি এবং নগদ ১ লক্ষ টাকা পুরস্কার।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
