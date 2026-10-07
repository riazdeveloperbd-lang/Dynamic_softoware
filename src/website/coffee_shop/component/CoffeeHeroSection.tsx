import React from 'react';
import { ArrowRight, Flame, Coffee } from 'lucide-react';
import {
  EditableText,
  EditableButton,
  EditableImage,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';
import velvetCoffeeHero from '../../../assets/images/velvet_coffee_hero_1791387854899.jpg';
import { useCoffeeShop } from './CoffeeShopContext';

export interface CoffeeHeroSectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

export const CoffeeHeroSection: React.FC<CoffeeHeroSectionProps> = ({
  title = 'Crafted with Care. Roasted to Perfection.',
  subtitle = 'Ethically sourced, small-batch micro-lot coffee beans delivered straight from our roastery to your cup.',
  variant = 'varient_1',
  primaryColor = '#C86D51',
  isDark = false,
}) => {
  const { addToCart } = useCoffeeShop();

  const scrollToSection = (href: string) => {
    if (typeof document !== 'undefined') {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section
      id="coffee-hero"
      className={`relative overflow-hidden py-14 sm:py-20 px-6 transition-colors ${
        isDark
          ? 'bg-[#1B1212] text-[#FAF8F5]'
          : 'bg-[#FAF8F5] text-[#1B1212]'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div
          className={`grid grid-cols-1 ${
            variant === 'varient_2'
              ? 'lg:grid-cols-12 gap-10 items-center'
              : 'lg:grid-cols-12 gap-12 items-center'
          }`}
        >
          {/* Left Column: Artisanal Typography, CTAs & Trust Line */}
          <div
            className={`${
              variant === 'varient_3' ? 'lg:col-span-6 lg:order-2' : 'lg:col-span-6'
            } space-y-6`}
          >
            {/* Quiet Unboxed Kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-[#3D2314]/80 dark:text-[#F7F3E9]/75">
              <EditableText
                id="coffee_hero_kicker_1"
                defaultText="Small-Batch Specialty Roastery"
                className="font-semibold"
                style={{ color: primaryColor }}
              />
              <span aria-hidden="true">·</span>
              <EditableText
                id="coffee_hero_kicker_2"
                defaultText="Roasted Every Tuesday & Friday"
              />
              <span aria-hidden="true">·</span>
              <EditableText
                id="coffee_hero_kicker_3"
                defaultText="Portland & Nationwide"
              />
            </div>

            {/* Elegant Serif Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-[56px] font-semibold tracking-tight leading-[1.08] max-w-xl"
              style={{
                fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
                textWrap: 'balance',
              }}
            >
              <EditableText id="coffee_hero_headline" defaultText={title} />
            </h1>

            {/* Sub-headline */}
            <EditableText
              id="coffee_hero_subheadline"
              as="p"
              defaultText={subtitle}
              className={`text-base sm:text-lg leading-relaxed max-w-xl block ${
                isDark ? 'text-[#F7F3E9]/85' : 'text-[#3D2314]/85'
              }`}
            />

            {/* Primary CTA ("Explore Subscriptions") & Secondary CTA ("View Seasonal Menu") */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <EditableButton
                id="coffee_hero_primary_cta"
                defaultText="Explore Subscriptions"
                defaultLinkUrl="#coffee-subscriptions"
                iconRight={<ArrowRight size={15} />}
                onClick={() => scrollToSection('#coffee-subscriptions')}
                className="px-6 py-3.5 rounded-xl text-sm font-semibold text-[#FAF8F5] whitespace-nowrap shrink-0 inline-flex items-center gap-2 transition-transform hover:-translate-y-0.5 cursor-pointer shadow-sm"
                style={{ backgroundColor: primaryColor }}
              />

              <button
                type="button"
                onClick={() => scrollToSection('#coffee-menu')}
                className={`px-6 py-3.5 rounded-xl text-sm font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-[#261816] border-[#3D2314] text-[#FAF8F5] hover:bg-[#3D2314]'
                    : 'bg-[#F7F3E9] border-[#3D2314]/20 text-[#1B1212] hover:bg-[#EFE8D8]'
                }`}
              >
                <EditableText
                  id="coffee_hero_secondary_cta"
                  defaultText="View Seasonal Menu"
                />
              </button>
            </div>

            {/* Trust Ticker (Unboxed Clean Typography with Bullet Separators) */}
            <div className="pt-6 border-t border-[#3D2314]/15 dark:border-[#3D2314] flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm font-medium">
              <span className="inline-flex items-center gap-1.5">
                <Flame size={14} style={{ color: primaryColor }} />
                <EditableText
                  id="coffee_trust_1"
                  defaultText="100% Direct Trade"
                />
              </span>
              <span aria-hidden="true" className="opacity-40">
                •
              </span>
              <EditableText
                id="coffee_trust_2"
                defaultText="Roasted Fresh Weekly"
              />
              <span aria-hidden="true" className="opacity-40">
                •
              </span>
              <EditableText
                id="coffee_trust_3"
                defaultText="Free Shipping on Orders $40+"
              />
            </div>
          </div>

          {/* Right Column: High-Resolution Pour-Over Visual + Quick Tasting Lot Action */}
          <div
            className={`${
              variant === 'varient_3' ? 'lg:col-span-6 lg:order-1' : 'lg:col-span-6'
            }`}
          >
            <div
              className={`rounded-3xl p-4 sm:p-5 border ${
                isDark
                  ? 'bg-[#261816] border-[#3D2314]'
                  : 'bg-[#F7F3E9] border-[#3D2314]/12'
              } space-y-4`}
            >
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#1B1212]">
                <EditableImage
                  id="coffee_hero_visual"
                  defaultSrc={velvetCoffeeHero}
                  alt="Warm pour-over coffee pouring with soft morning light at Velvet Bean Roasters"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1B1212]/90 via-[#1B1212]/40 to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 text-[#FAF8F5] flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-[#F7F3E9]/80">
                      Morning Pour-Over Lot #42 · Washed Process
                    </div>
                    <div
                      className="text-base sm:text-lg font-semibold mt-0.5"
                      style={{
                        fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
                      }}
                    >
                      Ethiopia Yirgacheffe Worka Chelbesa
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs tabular-nums">
                    <div className="text-[#F7F3E9]/75">Elevation 2,150 MASL</div>
                    <div className="font-semibold text-[#FAF8F5]">$22.00 / 12 oz</div>
                  </div>
                </div>
              </div>

              {/* Quick Taster Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-1">
                <div className="flex items-center gap-2.5 text-xs">
                  <Coffee size={16} style={{ color: primaryColor }} />
                  <span>
                    Tasting Notes: <strong>White Peach · Jasmine · Bergamot</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    addToCart({
                      id: 'hero_yirgacheffe',
                      name: 'Single-Origin Ethiopian Yirgacheffe',
                      subtitle: 'Whole Bean · 12 oz Micro-Lot Bag',
                      price: 22.0,
                      isSubscription: false,
                    })
                  }
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#FAF8F5] whitespace-nowrap cursor-pointer transition-opacity hover:opacity-95"
                  style={{ backgroundColor: primaryColor }}
                >
                  + Quick Add Lot ($22.00)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
