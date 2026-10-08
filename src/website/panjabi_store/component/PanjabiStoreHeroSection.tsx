import React, { useState } from 'react';
import {
  ShoppingBag,
  Ruler,
  Flame,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import {
  EditableText,
  EditableButton,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface PanjabiStoreHeroSectionProps {
  title: string;
  subtitle: string;
  variant: DoctorVariantId;
  primaryColor: string;
  isDark?: boolean;
}

export interface AuraColorSwatch {
  id: string;
  nameEn: string;
  nameBn: string;
  hex: string;
  stockLeft: number;
  images: {
    url: string;
    caption: string;
  }[];
}

export const AURA_COLOR_SWATCHES: AuraColorSwatch[] = [
  {
    id: 'deep_black',
    nameEn: 'Deep Black',
    nameBn: 'ডিপ ব্ল্যাক (Executive Black)',
    hex: '#111827',
    stockLeft: 14,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=85',
        caption: 'Studio Look · Executive Kabli Collar & Metal Snap Placket',
      },
      {
        url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85',
        caption: 'Full Silhouette · Tailored Cuff & Side Pocket Detail',
      },
      {
        url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=85',
        caption: 'Macro Texture · 100% Combed Mercerized Compact Cotton',
      },
    ],
  },
  {
    id: 'forest_green',
    nameEn: 'Forest Green',
    nameBn: 'ফরেস্ট গ্রিন (Royal Emerald)',
    hex: '#0F5132',
    stockLeft: 9,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=85',
        caption: 'Festive Editorial · Royal Emerald Cotton Finish',
      },
      {
        url: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=85',
        caption: 'Double-Needle Contrast Stitching & Engraved Snaps',
      },
      {
        url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=85',
        caption: 'Breathable Pre-Shrunk Summer & Festive Weave',
      },
    ],
  },
  {
    id: 'ivory_white',
    nameEn: 'Ivory White',
    nameBn: 'আইভরি হোয়াইট (Soft Ivory)',
    hex: '#F3EFE6',
    stockLeft: 11,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85',
        caption: 'Daylight Look · Crisp Ivory White Executive Kabli',
      },
      {
        url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85',
        caption: 'Structured Shoulder & Relaxed Contemporary Fit',
      },
      {
        url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=85',
        caption: 'Zero-Transparency Mercerized Cotton Weave',
      },
    ],
  },
  {
    id: 'midnight_blue',
    nameEn: 'Midnight Blue',
    nameBn: 'মিডনাইট ব্লু (Royal Navy)',
    hex: '#1E293B',
    stockLeft: 7,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85',
        caption: 'Evening Look · Midnight Blue Executive Kabli Panjabi',
      },
      {
        url: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=85',
        caption: 'Custom Gunmetal Snap Buttons & Reinforced Collar',
      },
      {
        url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=85',
        caption: '100% Color-Fast Guarantee After Machine or Hand Wash',
      },
    ],
  },
];

export const AURA_SIZE_OPTIONS = [
  { id: 'M', label: 'M (38)', chest: '40"', length: '40"', sleeve: '24"' },
  { id: 'L', label: 'L (40)', chest: '42"', length: '42"', sleeve: '24.5"' },
  { id: 'XL', label: 'XL (42)', chest: '44"', length: '44"', sleeve: '25"' },
  { id: 'XXL', label: 'XXL (44)', chest: '46"', length: '45"', sleeve: '25.5"' },
];

export const PanjabiStoreHeroSection: React.FC<PanjabiStoreHeroSectionProps> = ({
  title,
  subtitle,
  variant,
}) => {
  const [selectedProductCategory, setSelectedProductCategory] = useState<'kabli' | 'tshirt'>('kabli');
  const [selectedColorId, setSelectedColorId] = useState<string>('deep_black');
  const [selectedSizeId, setSelectedSizeId] = useState<string>('L');
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  const activeColor =
    AURA_COLOR_SWATCHES.find((c) => c.id === selectedColorId) || AURA_COLOR_SWATCHES[0];
  const activeSize =
    AURA_SIZE_OPTIONS.find((s) => s.id === selectedSizeId) || AURA_SIZE_OPTIONS[1];

  const currentPriceBdt = selectedProductCategory === 'kabli' ? 1990 : 990;
  const originalPriceBdt = selectedProductCategory === 'kabli' ? 2500 : 1350;

  const syncSelectionToCodFormAndScroll = () => {
    window.dispatchEvent(
      new CustomEvent('aura:select-variant', {
        detail: {
          category: selectedProductCategory,
          productTitle:
            selectedProductCategory === 'kabli'
              ? 'AURA Royal Kabli Collection 2026 — Executive Cotton Edition'
              : 'AURA Heavyweight 220 GSM Oversized Drop-Shoulder Tee',
          colorName: `${activeColor.nameEn} (${activeColor.nameBn})`,
          size: activeSize.id,
          sizeLabel: activeSize.label,
          unitPrice: currentPriceBdt,
        },
      })
    );
    const el = document.getElementById('aura-cod-checkout');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openSizeGuideModal = () => {
    window.dispatchEvent(new CustomEvent('aura:open-size-guide'));
    const el = document.getElementById('aura-size-guide');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="aura-hero-showcase"
      className="py-10 sm:py-16 border-b"
      style={{
        backgroundColor: variant === 'varient_3' ? '#111827' : '#FAF8F5',
        borderColor: variant === 'varient_3' ? '#1F2937' : '#E5E7EB',
        color: variant === 'varient_3' ? '#FFFDF9' : '#1F2937',
        fontFamily: "'Plus Jakarta Sans', 'Hind Siliguri', sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Micro-Collection Switcher Pill Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-md text-xs font-extrabold bg-[#0F5132] text-[#FFFDF9]">
              EID &amp; EXECUTIVE EDITION 2026
            </span>
            <span className="text-xs font-bold opacity-75">
              আউরা প্রিমিয়াম মাইক্রো-কালেকশন
            </span>
          </div>

          <div className="inline-flex p-1 rounded-xl bg-black/5 dark:bg-white/10 border border-black/10">
            <button
              type="button"
              onClick={() => setSelectedProductCategory('kabli')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                selectedProductCategory === 'kabli'
                  ? 'bg-[#0F5132] text-white shadow-xs'
                  : 'opacity-75 hover:opacity-100'
              }`}
            >
              Royal Kabli Panjabi (৳১,৯৯০)
            </button>
            <button
              type="button"
              onClick={() => setSelectedProductCategory('tshirt')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                selectedProductCategory === 'tshirt'
                  ? 'bg-[#0F5132] text-white shadow-xs'
                  : 'opacity-75 hover:opacity-100'
              }`}
            >
              220 GSM Drop-Shoulder Tee (৳৯৯০)
            </button>
          </div>
        </div>

        {/* Mobile-First Split Product Showcase & Quick Buy Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN (6 cols): Large Vertical Image Carousel + Fabric Texture Thumbnails */}
          <div className="lg:col-span-6 space-y-4">
            <div
              className="relative rounded-3xl overflow-hidden border shadow-xl aspect-[4/5] bg-[#111827]"
              style={{ borderColor: '#E5E7EB' }}
            >
              <img
                src={activeColor.images[activeImageIdx]?.url || activeColor.images[0].url}
                alt={activeColor.nameEn}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Top-left Save 20% & Color Badge */}
              <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                <span
                  className="px-3 py-1.5 rounded-xl text-xs font-extrabold text-white shadow-md"
                  style={{ backgroundColor: '#E05242' }}
                >
                  ২০% ডিসকাউন্ট (Save 20%)
                </span>
                <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#111827]/85 text-[#FFFDF9] backdrop-blur-xs border border-white/15">
                  {activeColor.nameBn}
                </span>
              </div>

              {/* Carousel Prev/Next Controls */}
              <button
                type="button"
                onClick={() =>
                  setActiveImageIdx((prev) =>
                    prev === 0 ? activeColor.images.length - 1 : prev - 1
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition cursor-pointer"
                aria-label="Previous Photo"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveImageIdx((prev) =>
                    prev === activeColor.images.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition cursor-pointer"
                aria-label="Next Photo"
              >
                <ChevronRight size={18} />
              </button>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/85 via-black/50 to-transparent text-white">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold">
                    {activeColor.images[activeImageIdx]?.caption}
                  </span>
                  <span className="font-mono text-[11px] bg-white/20 px-2 py-0.5 rounded">
                    {activeImageIdx + 1} / {activeColor.images.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Thumbnail Strip (Studio Shots + Close-up Fabric Texture) */}
            <div className="grid grid-cols-3 gap-3">
              {activeColor.images.map((img, idx) => {
                const isSelected = idx === activeImageIdx;
                return (
                  <button
                    key={img.caption}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={`rounded-2xl overflow-hidden border-2 text-left transition cursor-pointer ${
                      isSelected
                        ? 'border-[#0F5132] ring-2 ring-[#0F5132]/30'
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="aspect-[4/3] w-full bg-neutral-900">
                      <img
                        src={img.url}
                        alt={img.caption}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2 bg-[#111827] text-[#FFFDF9] text-[10px] font-bold truncate">
                      {idx === 0
                        ? '১. স্টুডিও লুক (Studio)'
                        : idx === 1
                        ? '২. ফুল ফিট (Full Fit)'
                        : '৩. ফেব্রিক জুম (Macro GSM)'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN (6 cols): Product Details, Bilingual Badges, Pricing, Swatches & Quick Buy */}
          <div className="lg:col-span-6 space-y-6">
            {/* Bilingual Badge Bar */}
            <div className="flex flex-wrap items-center gap-2">
              {['১০০% কটন (100% Cotton)', 'কালার গ্যারান্টি (Color Fast)', 'প্রিমিয়াম স্টিচিং (Premium Stitch)'].map(
                (badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-extrabold border"
                    style={{
                      backgroundColor: 'rgba(15, 81, 50, 0.1)',
                      borderColor: 'rgba(15, 81, 50, 0.3)',
                      color: variant === 'varient_3' ? '#6EE7B7' : '#0F5132',
                    }}
                  >
                    <CheckCircle2 size={13} />
                    <span>{badge}</span>
                  </span>
                )
              )}
            </div>

            {/* Product Title */}
            <div className="space-y-2">
              <EditableText
                id="aura_hero_product_title"
                defaultText={
                  selectedProductCategory === 'kabli'
                    ? title ||
                      'AURA Royal Kabli Collection 2026 — Executive Cotton Edition'
                    : 'AURA Oversized Drop-Shoulder Tee — 220 GSM Compact Cotton'
                }
                as="h1"
                className="text-2xl sm:text-4xl font-bold tracking-tight leading-[1.15]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              />

              <EditableText
                id="aura_hero_product_subtitle"
                defaultText={
                  subtitle ||
                  'প্রিমিয়াম মার্সেরাইজড কটন ফেব্রিক, কাস্টম মেটাল স্ন্যাপ বাটন এবং আরামদায়ক এক্সিকিউটিভ ফিট — গরমে ও উৎসবে শতভাগ স্বাচ্ছন্দ্য।'
                }
                as="p"
                className="text-sm sm:text-base opacity-80 leading-relaxed"
              />
            </div>

            {/* Price Callout & Limited Stock Urgency Box */}
            <div
              className="p-5 rounded-2xl border space-y-3"
              style={{
                backgroundColor: '#111827',
                borderColor: '#1F2937',
                color: '#FFFDF9',
              }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#FFFDF9]">
                    ৳{currentPriceBdt.toLocaleString()}
                  </span>
                  <span className="text-base line-through text-neutral-400 font-semibold">
                    ৳{originalPriceBdt.toLocaleString()}
                  </span>
                  <span
                    className="px-2.5 py-1 rounded-md text-xs font-extrabold text-white"
                    style={{ backgroundColor: '#E05242' }}
                  >
                    Save 20% (৳{originalPriceBdt - currentPriceBdt} ছাড়)
                  </span>
                </div>

                <span className="text-xs font-mono text-[#6EE7B7] font-bold">
                  ● In Stock (Ready to Ship)
                </span>
              </div>

              {/* Delivery & Urgency Tag */}
              <div
                className="p-3 rounded-xl border flex items-center justify-between gap-2 text-xs font-bold"
                style={{
                  backgroundColor: 'rgba(224, 82, 66, 0.14)',
                  borderColor: 'rgba(224, 82, 66, 0.45)',
                  color: '#FCA5A5',
                }}
              >
                <div className="flex items-center gap-2">
                  <Flame size={15} className="text-[#E05242] shrink-0" />
                  <span>
                    ক্যাশ অন ডেলিভারিতে স্টক সীমিত (মাত্র {activeColor.stockLeft} টি বাকি)
                  </span>
                </div>
                <span className="font-mono text-[11px] text-white bg-[#E05242] px-2 py-0.5 rounded">
                  ১ টাকাও অগ্রিম লাগবে না
                </span>
              </div>
            </div>

            {/* Variant 1: Color Swatches (Deep Black, Forest Green, Ivory White, Midnight Blue) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span>
                  ১. পছন্দের কালার সিলেক্ট করুন (Color):{' '}
                  <strong className="text-[#0F5132]">{activeColor.nameBn}</strong>
                </span>
                <span className="text-[11px] opacity-70">৪টি এক্সক্লুসিভ কালার</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {AURA_COLOR_SWATCHES.map((swatch) => {
                  const active = swatch.id === selectedColorId;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() => {
                        setSelectedColorId(swatch.id);
                        setActiveImageIdx(0);
                      }}
                      className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2.5 cursor-pointer ${
                        active
                          ? 'border-[#0F5132] ring-2 ring-[#0F5132]/25 bg-[#FFFDF9] text-[#1F2937]'
                          : 'border-[#E5E7EB] bg-[#FFFDF9]/80 text-[#1F2937] hover:border-[#0F5132]/50'
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full border border-black/20 shrink-0 shadow-inner"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-extrabold truncate">
                          {swatch.nameEn}
                        </div>
                        <div className="text-[10px] opacity-70 truncate">
                          {swatch.stockLeft} left
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Variant 2: Size Pills (M (38) | L (40) | XL (42) | XXL (44)) + Interactive Size Guide Link */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span>
                  ২. আপনার সাইজ সিলেক্ট করুন (Size):{' '}
                  <strong className="text-[#E05242]">{activeSize.label}</strong>
                </span>
                <button
                  type="button"
                  onClick={openSizeGuideModal}
                  className="inline-flex items-center gap-1 text-xs font-extrabold text-[#0F5132] underline hover:text-[#E05242] cursor-pointer"
                >
                  <Ruler size={13} />
                  <span>📏 সাইজ গাইড দেখুন (Size Guide)</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {AURA_SIZE_OPTIONS.map((sz) => {
                  const active = sz.id === selectedSizeId;
                  return (
                    <button
                      key={sz.id}
                      type="button"
                      onClick={() => setSelectedSizeId(sz.id)}
                      className={`py-3 px-2 rounded-xl border text-center transition cursor-pointer ${
                        active
                          ? 'bg-[#0F5132] text-[#FFFDF9] border-[#0F5132] shadow-md'
                          : 'bg-[#FFFDF9] text-[#1F2937] border-[#E5E7EB] hover:border-[#0F5132]'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-extrabold">{sz.label}</div>
                      <div
                        className={`text-[10px] mt-0.5 ${
                          active ? 'text-[#FDE68A]' : 'opacity-65'
                        }`}
                      >
                        Chest {sz.chest}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Order Now CTA & Direct Checkout Sync */}
            <div className="pt-2 space-y-3">
              <EditableButton
                id="aura_hero_confirm_cod_btn"
                defaultText="ক্যাশ অন ডেলিভারিতে অর্ডার করুন — ৳১,৯৯০"
                backgroundColor="#E05242"
                textColor="#FFFDF9"
                leftIcon={<ShoppingBag size={17} />}
                onClick={syncSelectionToCodFormAndScroll}
                className="w-full py-4 px-6 rounded-2xl text-sm sm:text-base font-extrabold shadow-xl transition hover:opacity-95 flex items-center justify-center gap-2 cursor-pointer"
              />

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-bold pt-1">
                <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 flex items-center gap-2">
                  <Truck size={14} className="text-[#0F5132] shrink-0" />
                  <span>ঢাকায় ২৪-৪৮ ঘণ্টায় ডেলিভারি</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 flex items-center gap-2">
                  <ShieldCheck size={14} className="text-[#0F5132] shrink-0" />
                  <span>প্রোডাক্ট দেখে টাকা পরিশোধ</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 flex items-center gap-2 col-span-2 sm:col-span-1">
                  <Layers size={14} className="text-[#0F5132] shrink-0" />
                  <span>৩ দিনে ফ্রি সাইজ এক্সচেঞ্জ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
