import React, { useState, useMemo, useEffect } from 'react';
import {
  Ruler,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Scissors,
  Droplets,
  Layers,
  ArrowRight,
} from 'lucide-react';
import {
  EditableText,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface PanjabiStoreSizeGuideFabricSectionProps {
  title: string;
  subtitle: string;
  variant: DoctorVariantId;
  primaryColor: string;
  isDark?: boolean;
}

const SIZE_MEASUREMENT_TABLE = [
  {
    size: 'M (38)',
    code: 'M',
    chest: '40"',
    length: '40"',
    sleeve: '24"',
    weightRange: '52 – 64 kg',
    heightRange: '5\'3" – 5\'7"',
  },
  {
    size: 'L (40)',
    code: 'L',
    chest: '42"',
    length: '42"',
    sleeve: '24.5"',
    weightRange: '65 – 75 kg',
    heightRange: '5\'6" – 5\'9"',
  },
  {
    size: 'XL (42)',
    code: 'XL',
    chest: '44"',
    length: '44"',
    sleeve: '25"',
    weightRange: '76 – 86 kg',
    heightRange: '5\'8" – 6\'0"',
  },
  {
    size: 'XXL (44)',
    code: 'XXL',
    chest: '46"',
    length: '45"',
    sleeve: '25.5"',
    weightRange: '87 – 102 kg',
    heightRange: '5\'9" – 6\'2"',
  },
];

const FABRIC_ACCORDION_ITEMS = [
  {
    id: 'fabric_gsm',
    icon: Layers,
    badge: '100% COMBED COMPACT COTTON',
    titleBn: '১. ফেব্রিক কোয়ালিটি ও GSM (Fabric Quality & Breathability)',
    titleEn: '100% Combed Mercerized Cotton (Kabli) & 220 GSM Compact Cotton (Drop-Shoulder)',
    details:
      'আমাদের কাবলি পাঞ্জাবিতে ব্যবহার করা হয়েছে শতভাগ প্রিমিয়াম মার্সেরাইজড কটন ফেব্রিক এবং ড্রপ-শোল্ডার টি-শার্টে ২২০ জিএসএম (220 GSM) কম্বড কমপ্যাক্ট কটন। সারাদিন পরলেও ঘাম বসে না এবং অত্যন্ত আরামদায়ক থাকে।',
    specs: [
      'Mercerized Silk-Touch Finish for Festive Elegance',
      '220 GSM Heavyweight Breathable Knit for Oversized Tees',
      'Zero Pilling / ববলিন ওঠার কোনো সম্ভাবনা নেই',
    ],
  },
  {
    id: 'color_shrinkage',
    icon: Droplets,
    badge: 'PRE-SHRUNK & COLOR-FAST',
    titleBn: '২. কালার ও শ্রিংকেজ গ্যারান্টি (Color & Shrinkage Guarantee)',
    titleEn: 'Pre-Shrunk Fabric with 100% Color-Fast Guarantee After Wash',
    details:
      'প্রত্যেকটি কাপড় প্রি-শ্রাঙ্ক (Pre-shrunk) প্রসেস করা, তাই ধোয়ার পরে ছোট বা লুজ হওয়ার ভয় নেই। মেশিন বা হাতের ওয়াশে ১০০% কালার-ফাস্ট গ্যারান্টি — রঙ উঠলে সরাসরি নতুন প্রোডাক্ট রিপ্লেসমেন্ট।',
    specs: [
      'Reactive Dye Technology — 100% Color-Fast Guarantee',
      '0% Shrinkage After Machine or Hand Wash',
      'Soft-Enzyme Bio-Wash for Skin Comfort',
    ],
  },
  {
    id: 'stitching_hardware',
    icon: Scissors,
    badge: 'CUSTOM METAL HARDWARE',
    titleBn: '৩. প্রিমিয়াম স্টিচিং ও মেটাল স্ন্যাপ বাটন (Stitching & Hardware)',
    titleEn: 'Double-Needle Heavy-Duty Thread Stitching & Engraved Metal Snap Buttons',
    details:
      'এক্সপোর্ট কোয়ালিটি ডাবল-নিডল হেভি-ডিউটি থ্রেড স্টিচিং এবং কাস্টম এনগ্রেভড অ্যান্টিক মেটাল স্ন্যাপ বাটন ব্যবহার করা হয়েছে, যা পাঞ্জাবিকে দেয় রাজকীয় এবং এক্সিকিউটিভ লুক।',
    specs: [
      'Custom Engraved Rust-Proof Metal Snap Buttons',
      'Double-Needle Reinforced Collar, Placket & Cuffs',
      'Deep Side Pockets Optimized for Smartphone & Wallet',
    ],
  },
];

export const PanjabiStoreSizeGuideFabricSection: React.FC<
  PanjabiStoreSizeGuideFabricSectionProps
> = ({ title, subtitle, variant }) => {
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(7);
  const [weightKg, setWeightKg] = useState<number>(70);
  const [fitPreference, setFitPreference] = useState<'regular' | 'relaxed'>('regular');
  const [openAccordionId, setOpenAccordionId] = useState<string>('fabric_gsm');
  const [highlightedBanner, setHighlightedBanner] = useState<boolean>(false);

  useEffect(() => {
    const onOpenSizeGuide = () => {
      setHighlightedBanner(true);
      setTimeout(() => setHighlightedBanner(false), 2600);
    };
    window.addEventListener('aura:open-size-guide', onOpenSizeGuide);
    return () => window.removeEventListener('aura:open-size-guide', onOpenSizeGuide);
  }, []);

  // Calculate Recommended Size from Height & Weight
  const recommendedSizeObj = useMemo(() => {
    let baseIdx = 1; // Default L
    if (weightKg < 63) {
      baseIdx = 0; // M
    } else if (weightKg <= 75) {
      baseIdx = 1; // L
    } else if (weightKg <= 86) {
      baseIdx = 2; // XL
    } else {
      baseIdx = 3; // XXL
    }

    // Adjust if tall (5'10"+) or relaxed preference
    const totalInches = heightFeet * 12 + heightInches;
    if (totalInches >= 71 && baseIdx < 2) {
      baseIdx = 2;
    }
    if (fitPreference === 'relaxed' && baseIdx < 3 && weightKg >= 62) {
      baseIdx = Math.min(3, baseIdx + 1);
    }

    return SIZE_MEASUREMENT_TABLE[baseIdx];
  }, [heightFeet, heightInches, weightKg, fitPreference]);

  const applyRecommendedSizeToOrder = (sizeCode: string, sizeLabel: string) => {
    window.dispatchEvent(
      new CustomEvent('aura:select-size-only', {
        detail: {
          size: sizeCode,
          sizeLabel,
        },
      })
    );
    const el = document.getElementById('aura-cod-checkout');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      className="py-14 sm:py-20 border-b"
      style={{
        backgroundColor: variant === 'varient_3' ? '#111827' : '#FAF8F5',
        borderColor: variant === 'varient_3' ? '#1F2937' : '#E5E7EB',
        color: variant === 'varient_3' ? '#FFFDF9' : '#1F2937',
        fontFamily: "'Plus Jakarta Sans', 'Hind Siliguri', sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* ===================================================================== */}
        {/* PART C: INTERACTIVE SIZE GUIDE WIDGET & "FIND MY SIZE" CALCULATOR     */}
        {/* ===================================================================== */}
        <div id="aura-size-guide" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0F5132] text-[#FFFDF9] text-xs font-extrabold">
                <Ruler size={13} />
                <span>📏 ইন্টারঅ্যাক্টিভ সাইজ গাইড (Interactive Size Guide)</span>
              </div>
              <EditableText
                id="aura_size_guide_title"
                defaultText={
                  title || 'সঠিক মাপ নির্বাচন করুন — পারফেক্ট এক্সিকিউটিভ ফিট'
                }
                as="h2"
                className="text-2xl sm:text-4xl font-bold tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              />
              <EditableText
                id="aura_size_guide_subtitle"
                defaultText={
                  subtitle ||
                  'ইঞ্চিতে সম্পূর্ণ সাইজ চার্ট দেখুন অথবা আপনার উচ্চতা ও ওজন দিয়ে ১০ সেকেন্ডে সঠিক সাইজ বের করুন।'
                }
                as="p"
                className="text-sm sm:text-base opacity-75"
              />
            </div>

            <div className="px-4 py-2.5 rounded-xl bg-[#0F5132]/10 border border-[#0F5132]/30 text-xs font-extrabold text-[#0F5132]">
              ✓ ৩ দিনের মধ্যে ফ্রি সাইজ এক্সচেঞ্জ সুবিধা
            </div>
          </div>

          <div
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch transition-all ${
              highlightedBanner ? 'ring-4 ring-[#E05242] rounded-3xl p-2' : ''
            }`}
          >
            {/* Left (7 cols): Measurement Table in Inches */}
            <div
              className="lg:col-span-7 rounded-3xl border p-5 sm:p-7 flex flex-col justify-between space-y-6"
              style={{
                backgroundColor: '#FFFDF9',
                borderColor: '#E5E7EB',
                color: '#1F2937',
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-[#111827]">
                      AURA Official Size Chart (ইঞ্চিতে মাপ)
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Asian / Bangladeshi Tailored Executive Fit (Margin ±0.5&quot;)
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#111827] text-white font-mono text-xs font-bold">
                    INCHES (&quot;)
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b-2 border-[#111827] text-[#111827] font-extrabold">
                        <th className="py-3 px-3">সাইজ (Size)</th>
                        <th className="py-3 px-3">বুক (Chest)</th>
                        <th className="py-3 px-3">লম্বা (Length)</th>
                        <th className="py-3 px-3">হাতা (Sleeve)</th>
                        <th className="py-3 px-3">ওজন (Ideal Weight)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB]">
                      {SIZE_MEASUREMENT_TABLE.map((row) => {
                        const isRecommended = row.code === recommendedSizeObj.code;
                        return (
                          <tr
                            key={row.size}
                            className={`transition ${
                              isRecommended
                                ? 'bg-[#0F5132]/10 font-extrabold text-[#0F5132]'
                                : 'hover:bg-neutral-50'
                            }`}
                          >
                            <td className="py-3.5 px-3 font-extrabold flex items-center gap-2">
                              <span>{row.size}</span>
                              {isRecommended && (
                                <span className="px-2 py-0.5 rounded text-[10px] bg-[#0F5132] text-white">
                                  Recommended
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-3 font-mono font-bold">
                              Chest {row.chest}
                            </td>
                            <td className="py-3.5 px-3 font-mono font-bold">
                              Length {row.length}
                            </td>
                            <td className="py-3.5 px-3 font-mono font-bold">
                              Sleeve {row.sleeve}
                            </td>
                            <td className="py-3.5 px-3 text-xs">{row.weightRange}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5E7EB] flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="font-bold text-[#1F2937]">
                  💡 টিপস: আপনার বর্তমান প্রিয় পাঞ্জাবির বগলের নিচ থেকে বুক (Chest) মেপে মিলিয়ে নিন।
                </span>
                <span className="font-mono font-extrabold text-[#0F5132]">
                  M: 40&quot; | L: 42&quot; | XL: 44&quot; | XXL: 46&quot;
                </span>
              </div>
            </div>

            {/* Right (5 cols): Interactive "Find My Size" Helper Calculator */}
            <div
              className="lg:col-span-5 rounded-3xl border p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl"
              style={{
                backgroundColor: '#111827',
                borderColor: '#1F2937',
                color: '#FFFDF9',
              }}
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#E05242] text-white text-xs font-extrabold">
                    <Sparkles size={13} />
                    <span>Find My Size ক্যালকুলেটর</span>
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    AI Fit Helper
                  </span>
                </div>

                <h3
                  className="text-xl font-bold text-[#FFFDF9]"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  আপনার উচ্চতা ও ওজন দিন — আমরা সঠিক সাইজ বলে দিচ্ছি
                </h3>

                {/* Height Input (Feet + Inches) */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-neutral-300">
                      উচ্চতা (ফুট / Feet)
                    </label>
                    <select
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#1F2937] border border-neutral-700 text-xs font-bold text-white focus:outline-none focus:border-[#E05242]"
                    >
                      <option value={5}>5 Feet (৫ ফুট)</option>
                      <option value={6}>6 Feet (৬ ফুট)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-neutral-300">
                      ইঞ্চি (Inches)
                    </label>
                    <select
                      value={heightInches}
                      onChange={(e) => setHeightInches(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#1F2937] border border-neutral-700 text-xs font-bold text-white focus:outline-none focus:border-[#E05242]"
                    >
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((inc) => (
                        <option key={inc} value={inc}>
                          {inc} Inches ({inc}&quot;)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Weight Slider Input */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-neutral-300">আপনার ওজন (Weight in KG):</span>
                    <span className="px-2.5 py-0.5 rounded bg-[#0F5132] text-white font-mono text-sm font-extrabold">
                      {weightKg} KG
                    </span>
                  </div>
                  <input
                    type="range"
                    min={48}
                    max={105}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full accent-[#E05242] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                    <span>48 kg</span>
                    <span>65 kg</span>
                    <span>80 kg</span>
                    <span>105 kg</span>
                  </div>
                </div>

                {/* Fit Preference Toggle */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFitPreference('regular')}
                    className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      fitPreference === 'regular'
                        ? 'bg-[#0F5132] text-white border-[#0F5132]'
                        : 'bg-[#1F2937] text-neutral-300 border-neutral-700'
                    }`}
                  >
                    Smart Tailored Fit
                  </button>
                  <button
                    type="button"
                    onClick={() => setFitPreference('relaxed')}
                    className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      fitPreference === 'relaxed'
                        ? 'bg-[#0F5132] text-white border-[#0F5132]'
                        : 'bg-[#1F2937] text-neutral-300 border-neutral-700'
                    }`}
                  >
                    Loose / Relaxed Fit
                  </button>
                </div>
              </div>

              {/* Recommended Size Output Box */}
              <div className="p-4 rounded-2xl bg-[#1F2937] border border-[#0F5132] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-neutral-300 font-bold">
                      আপনার জন্য সেরা সাইজ (Recommended Size):
                    </div>
                    <div className="text-2xl font-extrabold text-[#6EE7B7] mt-0.5">
                      Size {recommendedSizeObj.size}
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs text-neutral-300">
                    <div>Chest: {recommendedSizeObj.chest}</div>
                    <div>Length: {recommendedSizeObj.length}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    applyRecommendedSizeToOrder(
                      recommendedSizeObj.code,
                      recommendedSizeObj.size
                    )
                  }
                  className="w-full py-3 rounded-xl text-xs font-extrabold text-white flex items-center justify-center gap-2 transition hover:opacity-95 cursor-pointer"
                  style={{ backgroundColor: '#E05242' }}
                >
                  <span>{recommendedSizeObj.size} সাইজে অর্ডার ফর্ম পূরণ করুন</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* PART D: FABRIC, GSM & QUALITY ASSURANCE ACCORDION GRID SECTION        */}
        {/* ===================================================================== */}
        <div id="aura-fabric-quality" className="scroll-mt-24 space-y-8">
          <div className="max-w-3xl space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#E05242]/15 text-[#E05242] text-xs font-extrabold">
              <ShieldCheck size={14} />
              <span>FABRIC, GSM &amp; QUALITY ASSURANCE</span>
            </div>
            <h2
              className="text-2xl sm:text-4xl font-bold tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              কেন AURA-র কাবলি পাঞ্জাবি ও ড্রপ-শোল্ডার আলাদা?
            </h2>
            <p className="text-sm sm:text-base opacity-75">
              ১০০% কম্বড কমপ্যাক্ট কটন, প্রি-শ্রাঙ্ক কালার গ্যারান্টি এবং এক্সপোর্ট গ্রেড মেটাল স্ন্যাপ বাটন।
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {FABRIC_ACCORDION_ITEMS.map((item) => {
              const IconComp = item.icon;
              const isOpen = openAccordionId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setOpenAccordionId(item.id)}
                  className="rounded-3xl border p-6 flex flex-col justify-between space-y-5 transition cursor-pointer"
                  style={{
                    backgroundColor: isOpen ? '#111827' : '#FFFDF9',
                    borderColor: isOpen ? '#0F5132' : '#E5E7EB',
                    color: isOpen ? '#FFFDF9' : '#1F2937',
                  }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span
                        className="px-2.5 py-1 rounded-md text-[10px] font-mono font-extrabold"
                        style={{
                          backgroundColor: isOpen ? '#0F5132' : 'rgba(15, 81, 50, 0.1)',
                          color: isOpen ? '#FFFDF9' : '#0F5132',
                        }}
                      >
                        {item.badge}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${isOpen ? 'rotate-180 text-[#E05242]' : ''}`}
                      />
                    </div>

                    <div className="w-11 h-11 rounded-2xl bg-[#0F5132]/15 border border-[#0F5132]/30 flex items-center justify-center text-[#0F5132]">
                      <IconComp
                        size={20}
                        className={isOpen ? 'text-[#6EE7B7]' : 'text-[#0F5132]'}
                      />
                    </div>

                    <h3 className="text-lg font-extrabold leading-snug">
                      {item.titleBn}
                    </h3>
                    <div className="text-xs font-bold opacity-75">{item.titleEn}</div>

                    <p className="text-xs sm:text-sm leading-relaxed opacity-85">
                      {item.details}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-4 border-t border-current/10 text-xs">
                    {item.specs.map((sp) => (
                      <li key={sp} className="flex items-center gap-2 font-semibold">
                        <CheckCircle2
                          size={14}
                          className={isOpen ? 'text-[#6EE7B7] shrink-0' : 'text-[#0F5132] shrink-0'}
                        />
                        <span>{sp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
