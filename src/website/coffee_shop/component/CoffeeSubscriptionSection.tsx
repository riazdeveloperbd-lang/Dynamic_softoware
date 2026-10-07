import React, { useState } from 'react';
import { Check, ShoppingBag, Sparkles, Repeat } from 'lucide-react';
import {
  EditableText,
  EditableImage,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';
import velvetBeanBags from '../../../assets/images/velvet_bean_bags_1791387870421.jpg';
import { useCoffeeShop } from './CoffeeShopContext';

export interface CoffeeSubscriptionSectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

const BLEND_OPTIONS = [
  {
    id: 'velvet_sig',
    name: 'Velvet Signature Blend',
    origin: 'Brazil & Guatemala Micro-Lot',
    notes: 'Milk Chocolate · Toasted Hazelnut · Brown Sugar',
    roastLevel: 3,
    basePrice: 22.0,
  },
  {
    id: 'ethiopia_yirg',
    name: 'Single-Origin Ethiopian Yirgacheffe',
    origin: 'Worka Chelbesa · Washed Process',
    notes: 'White Peach · Jasmine · Bergamot',
    roastLevel: 2,
    basePrice: 24.0,
  },
  {
    id: 'colombia_dark',
    name: 'Colombia Dark Roast',
    origin: 'Huila High-Elevation Lot',
    notes: 'Dark Cocoa · Smoked Caramel · Black Cherry',
    roastLevel: 5,
    basePrice: 21.0,
  },
  {
    id: 'sugarcane_decaf',
    name: 'Sugarcane Decaf',
    origin: 'Cauca Valley · Ethyl Acetate Natural',
    notes: 'Honey Graham · Sweet Almond · Mild Citrus',
    roastLevel: 3,
    basePrice: 22.5,
  },
];

const GRIND_OPTIONS = [
  { id: 'Whole Bean', desc: 'Maximum aroma & freshness for home grinders' },
  { id: 'Espresso', desc: 'Fine precision grind for espresso machines' },
  { id: 'Drip Filter', desc: 'Medium grind for Chemex, V60 & auto-drip' },
  { id: 'French Press', desc: 'Coarse even grind for immersion & cold brew' },
];

const FREQUENCY_OPTIONS = [
  { id: 'Every Week', badge: 'Save 15% + Priority Roast' },
  { id: 'Every 2 Weeks', badge: 'Most Popular · Save 15%' },
  { id: 'Monthly', badge: 'Save 15% · Flexible Pause' },
];

export const CoffeeSubscriptionSection: React.FC<
  CoffeeSubscriptionSectionProps
> = ({
  title = 'Freshly Roasted Coffee, Delivered on Your Schedule.',
  subtitle = 'Customize your small-batch roast, grind precision, and delivery cadence. Pause, skip, or swap origins anytime with one click.',
  variant = 'varient_1',
  primaryColor = '#C86D51',
  isDark = false,
}) => {
  const { addToCart } = useCoffeeShop();

  const [selectedBlendId, setSelectedBlendId] = useState<string>('velvet_sig');
  const [selectedGrind, setSelectedGrind] = useState<string>('Whole Bean');
  const [selectedFrequency, setSelectedFrequency] =
    useState<string>('Every 2 Weeks');

  const activeBlend =
    BLEND_OPTIONS.find((b) => b.id === selectedBlendId) || BLEND_OPTIONS[0];
  const discountedPrice = Number((activeBlend.basePrice * 0.85).toFixed(2));

  const featuredBeans = BLEND_OPTIONS.slice(0, 3);

  return (
    <section
      id="coffee-subscriptions"
      className={`py-20 px-6 border-t transition-colors ${
        isDark
          ? 'bg-[#221614] border-[#3D2314] text-[#FAF8F5]'
          : 'bg-[#F7F3E9] border-[#3D2314]/10 text-[#1B1212]'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* =============================================================== */}
        {/* PART 1: INTERACTIVE 3-STEP COFFEE SUBSCRIPTION CUSTOMIZER       */}
        {/* =============================================================== */}
        <div className="space-y-10">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium opacity-75">
              <Repeat size={14} style={{ color: primaryColor }} />
              <span style={{ color: primaryColor }} className="font-semibold">
                Coffee Bean Subscription Portal
              </span>
              <span aria-hidden="true">·</span>
              <span>Save 15% on Every Shipment</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-semibold tracking-tight"
              style={{
                fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
                textWrap: 'balance',
              }}
            >
              <EditableText id="coffee_sub_heading" defaultText={title} />
            </h2>

            <EditableText
              id="coffee_sub_subtitle"
              as="p"
              defaultText={subtitle}
              className="text-sm sm:text-base opacity-80 leading-relaxed block"
            />
          </div>

          <div
            className={`rounded-3xl p-6 sm:p-8 border grid grid-cols-1 lg:grid-cols-12 gap-8 items-start ${
              isDark
                ? 'bg-[#1B1212] border-[#3D2314]'
                : 'bg-[#FAF8F5] border-[#3D2314]/12'
            }`}
          >
            {/* Left 8 Columns: 3-Step Interactive Configurator */}
            <div className="lg:col-span-8 space-y-8">
              {/* STEP 1: Select Blend / Origin */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span
                    className="font-mono font-semibold uppercase"
                    style={{ color: primaryColor }}
                  >
                    01. Select Blend or Single-Origin
                  </span>
                  <span className="opacity-65">12 oz (340g) Valve Bag</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BLEND_OPTIONS.map((blend) => {
                    const active = selectedBlendId === blend.id;
                    return (
                      <button
                        key={blend.id}
                        type="button"
                        onClick={() => setSelectedBlendId(blend.id)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          active
                            ? isDark
                              ? 'bg-[#2C1B18] border-[#C86D51]'
                              : 'bg-white border-[#C86D51] shadow-xs'
                            : isDark
                            ? 'bg-[#261816]/60 border-[#3D2314] hover:border-[#C86D51]/50'
                            : 'bg-[#F7F3E9]/70 border-[#3D2314]/10 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold">
                            {blend.name}
                          </span>
                          <span
                            className="text-xs font-mono font-semibold tabular-nums"
                            style={{ color: primaryColor }}
                          >
                            ${(blend.basePrice * 0.85).toFixed(2)}
                          </span>
                        </div>
                        <div className="text-xs opacity-65 mt-0.5">
                          {blend.origin}
                        </div>
                        <div className="text-[11px] font-medium opacity-85 mt-2">
                          {blend.notes}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: Select Grind */}
              <div className="space-y-3">
                <div className="text-xs font-mono font-semibold uppercase" style={{ color: primaryColor }}>
                  02. Select Grind Setting
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {GRIND_OPTIONS.map((g) => {
                    const active = selectedGrind === g.id;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setSelectedGrind(g.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          active
                            ? isDark
                              ? 'bg-[#2C1B18] border-[#C86D51]'
                              : 'bg-white border-[#C86D51] shadow-xs'
                            : isDark
                            ? 'bg-[#261816]/60 border-[#3D2314]'
                            : 'bg-[#F7F3E9]/70 border-[#3D2314]/10 hover:bg-white'
                        }`}
                      >
                        <div className="text-xs sm:text-sm font-semibold">
                          {g.id}
                        </div>
                        <div className="text-[11px] opacity-65 mt-1 leading-snug">
                          {g.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 3: Select Frequency (Highlight "Save 15%") */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span
                    className="font-mono font-semibold uppercase"
                    style={{ color: primaryColor }}
                  >
                    03. Select Delivery Frequency
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: primaryColor }}
                  >
                    Save 15% on All Cadences
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {FREQUENCY_OPTIONS.map((freq) => {
                    const active = selectedFrequency === freq.id;
                    return (
                      <button
                        key={freq.id}
                        type="button"
                        onClick={() => setSelectedFrequency(freq.id)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          active
                            ? isDark
                              ? 'bg-[#2C1B18] border-[#C86D51]'
                              : 'bg-white border-[#C86D51] shadow-xs'
                            : isDark
                            ? 'bg-[#261816]/60 border-[#3D2314]'
                            : 'bg-[#F7F3E9]/70 border-[#3D2314]/10 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">
                            {freq.id}
                          </span>
                          {active && (
                            <Check size={15} style={{ color: primaryColor }} />
                          )}
                        </div>
                        <div
                          className="text-xs font-medium mt-1"
                          style={{ color: primaryColor }}
                        >
                          {freq.badge}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right 4 Columns: Live Custom Subscription Summary Card */}
            <div className="lg:col-span-4">
              <div
                className={`rounded-2xl p-6 border space-y-5 ${
                  isDark
                    ? 'bg-[#261816] border-[#3D2314]'
                    : 'bg-[#F7F3E9] border-[#3D2314]/15'
                }`}
              >
                <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#1B1212]">
                  <EditableImage
                    id="coffee_sub_preview_img"
                    defaultSrc={velvetBeanBags}
                    alt="Velvet Bean Roasters Subscription Coffee Bags"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase opacity-70">
                    Your Custom Roastery Box
                  </div>
                  <h3
                    className="text-xl font-semibold"
                    style={{
                      fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
                    }}
                  >
                    {activeBlend.name}
                  </h3>
                  <div className="text-xs opacity-80">
                    {selectedGrind} · Delivered {selectedFrequency}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#3D2314]/15 dark:border-[#3D2314] flex items-baseline justify-between">
                  <div>
                    <div className="text-xs opacity-70">Subscriber Rate (Save 15%)</div>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-2xl font-mono font-semibold tabular-nums">
                        ${discountedPrice.toFixed(2)}
                      </span>
                      <span className="text-xs font-mono line-through opacity-50 tabular-nums">
                        ${activeBlend.basePrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-medium opacity-75">per shipment</span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    addToCart({
                      id: `sub_${activeBlend.id}`,
                      name: `${activeBlend.name} Subscription`,
                      subtitle: `${selectedGrind} · ${selectedFrequency} (Save 15%)`,
                      price: discountedPrice,
                      isSubscription: true,
                    })
                  }
                  className="w-full py-3.5 px-5 rounded-xl text-sm font-semibold text-[#FAF8F5] inline-flex items-center justify-center gap-2 transition-opacity hover:opacity-95 cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                >
                  <ShoppingBag size={16} />
                  <span>Subscribe &amp; Save 15%</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =============================================================== */}
        {/* PART 2: FEATURED PRODUCTS GRID (3 ROASTERY CARDS + ROAST METER) */}
        {/* =============================================================== */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-medium opacity-70">
                Small-Batch Micro-Lots
              </div>
              <h3
                className="text-2xl sm:text-3xl font-semibold mt-1"
                style={{
                  fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
                }}
              >
                <EditableText
                  id="coffee_featured_beans_title"
                  defaultText="Featured Roastery Releases"
                />
              </h3>
            </div>
            <span className="text-xs opacity-75">
              Roasted to order in our cast-iron drum roaster · Ships within 24 hours
            </span>
          </div>

          <div
            className={`grid grid-cols-1 ${
              variant === 'varient_2' ? 'md:grid-cols-3 gap-8' : 'md:grid-cols-3 gap-7'
            }`}
          >
            {featuredBeans.map((bean) => (
              <div
                key={bean.id}
                className={`rounded-3xl p-6 border flex flex-col justify-between space-y-5 transition-transform hover:-translate-y-0.5 ${
                  isDark
                    ? 'bg-[#1B1212] border-[#3D2314]'
                    : 'bg-[#FAF8F5] border-[#3D2314]/12'
                }`}
              >
                <div className="space-y-4">
                  <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#261816]">
                    <EditableImage
                      id={`coffee_bean_card_${bean.id}`}
                      defaultSrc={velvetBeanBags}
                      alt={bean.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Origin & Price */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs uppercase tracking-wider opacity-65">
                        {bean.origin}
                      </div>
                      <h4
                        className="text-lg font-semibold mt-0.5"
                        style={{
                          fontFamily:
                            "'Fraunces', 'Playfair Display', Georgia, serif",
                        }}
                      >
                        {bean.name}
                      </h4>
                    </div>
                    <span
                      className="text-base font-mono font-semibold tabular-nums shrink-0"
                      style={{ color: primaryColor }}
                    >
                      ${bean.basePrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Unboxed Flavor Profile Notes */}
                  <div className="text-xs leading-relaxed opacity-85">
                    <span className="opacity-60 mr-1.5">Tasting Notes:</span>
                    <span className="font-semibold">{bean.notes}</span>
                  </div>

                  {/* Roast Level Meter (1–5 Scale) */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="opacity-70">Roast Profile</span>
                      <span className="font-mono tabular-nums font-semibold">
                        Level {bean.roastLevel} / 5
                      </span>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <div
                          key={lvl}
                          className="h-2 rounded-full"
                          style={{
                            backgroundColor:
                              lvl <= bean.roastLevel
                                ? primaryColor
                                : isDark
                                ? '#3D2314'
                                : '#E5DEC9',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#3D2314]/10 dark:border-[#3D2314] grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      addToCart({
                        id: bean.id,
                        name: bean.name,
                        subtitle: 'Whole Bean · Single 12 oz Bag',
                        price: bean.basePrice,
                        isSubscription: false,
                      })
                    }
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold whitespace-nowrap cursor-pointer ${
                      isDark
                        ? 'border-[#3D2314] hover:bg-[#3D2314]'
                        : 'border-[#3D2314]/20 hover:bg-[#F7F3E9]'
                    }`}
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      addToCart({
                        id: `sub_${bean.id}`,
                        name: `${bean.name} (Sub)`,
                        subtitle: 'Whole Bean · Every 2 Weeks (Save 15%)',
                        price: Number((bean.basePrice * 0.85).toFixed(2)),
                        isSubscription: true,
                      })
                    }
                    className="py-2.5 px-3 rounded-xl text-xs font-semibold text-[#FAF8F5] whitespace-nowrap cursor-pointer"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Subscribe (-15%)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
