import React from 'react';
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  Sparkles,
  Award,
  PhoneCall,
  ArrowRight,
  Flame,
} from 'lucide-react';
import {
  EditableText,
  EditableButton,
  EditableImage,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';
import {
  useStoreEcommerce,
  STORE_CATEGORIES,
  STORE_PRODUCTS,
} from './StoreEcommerceContext';

export interface StoreHeroSectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

const DEFAULT_HERO_BANNER_IMG =
  'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=1000&q=85';

export const StoreHeroSection: React.FC<StoreHeroSectionProps> = ({
  title = 'প্রকৃতির খাঁটি স্বাদ এখন বাজার-এ — ১০০% অর্গানিক ও নিরাপদ খাবার',
  subtitle = 'Sundarban Wild Khalisha Honey, Pabna Deshi Gawa Ghee, Cold Wood-Pressed Mustard Oil & Premium Saudi Dates delivered fresh to your doorstep.',
  variant = 'varient_1',
  primaryColor = '#F37021',
  isDark = false,
}) => {
  const {
    openCategoryPage,
    openProductDetail,
    buyNowDirect,
    activePage,
    products,
    categories,
  } = useStoreEcommerce();

  if (activePage !== 'home') {
    return null;
  }

  return (
    <section
      className={`py-6 sm:py-10 px-4 sm:px-6 transition-colors ${
        isDark ? 'bg-[#0F141C] text-white' : 'bg-[#FFFDFB] text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div
            className={`lg:col-span-8 rounded-3xl p-6 sm:p-10 relative overflow-hidden flex flex-col justify-between border ${
              variant === 'varient_3'
                ? 'bg-gradient-to-r from-[#1A130E] via-[#2C1D11] to-[#1F291E] text-white border-orange-500/30'
                : isDark
                ? 'bg-gradient-to-r from-[#17202E] to-[#1E2923] border-white/10 text-white'
                : 'bg-gradient-to-r from-[#FFF3E6] via-[#FFF8F0] to-[#ECFDF5] border-orange-200/80 text-slate-900'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
              <div className="md:col-span-7 space-y-4">
                <div
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold text-white shadow-xs"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Sparkles size={13} />
                  <EditableText
                    id="bazar_hero_badge"
                    defaultText="BAZAR SPECIAL FESTIVAL OFFER"
                  />
                </div>

                <EditableText
                  id="bazar_hero_title"
                  as="h1"
                  defaultText={title}
                  className="text-2xl sm:text-4xl font-black tracking-tight leading-[1.2] block"
                />

                <EditableText
                  id="store_hero_subtitle"
                  as="p"
                  defaultText={subtitle}
                  className="text-xs sm:text-sm opacity-80 leading-relaxed block"
                />

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <EditableButton
                    id="store_hero_shop_btn"
                    defaultText="সকল প্রোডাক্ট দেখুন (Shop Now)"
                    onClickFallback={() => openCategoryPage('all')}
                    iconLeft={<ShoppingBag size={15} />}
                    className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold text-white shadow-md hover:opacity-95 transition cursor-pointer inline-flex items-center gap-2"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <EditableButton
                    id="store_hero_offer_btn"
                    defaultText="OFFER ZONE (Up to 25% Off)"
                    onClickFallback={() => openCategoryPage('offer_zone')}
                    iconRight={<ArrowRight size={14} />}
                    className="px-5 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold border-2 transition cursor-pointer inline-flex items-center gap-1.5 bg-white/80 dark:bg-slate-900/80"
                    style={{
                      borderColor: primaryColor,
                      color: primaryColor,
                    }}
                  />
                </div>
              </div>

              <div className="md:col-span-5">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800 aspect-square max-w-[280px] mx-auto">
                  <EditableImage
                    id="store_hero_main_img"
                    defaultSrc={DEFAULT_HERO_BANNER_IMG}
                    alt="Sundarban Honey & Gawa Ghee"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-black/75 backdrop-blur-xs text-white text-center">
                    <EditableText
                      id="store_hero_img_caption"
                      defaultText="১০০% খাঁটি সুন্দরবনের মধু ও পাবনার ঘি"
                      className="text-xs font-extrabold"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-black/10 dark:border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-600 flex-shrink-0" />
                <EditableText
                  id="store_trust_1"
                  defaultText="100% Lab Tested Purity"
                  className="font-bold"
                />
              </div>
              <div className="flex items-center gap-2">
                <Truck size={18} style={{ color: primaryColor }} className="flex-shrink-0" />
                <EditableText
                  id="store_trust_2"
                  defaultText="Cash on Delivery Nationwide"
                  className="font-bold"
                />
              </div>
              <div className="flex items-center gap-2">
                <Award size={18} className="text-amber-500 flex-shrink-0" />
                <EditableText
                  id="store_trust_3"
                  defaultText="Direct Farm Sourcing"
                  className="font-bold"
                />
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall size={18} className="text-emerald-600 flex-shrink-0" />
                <EditableText
                  id="store_trust_4"
                  defaultText="Easy 7-Day Return Policy"
                  className="font-bold"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            {products.slice(0, 2).map((deal) => (
              <div
                key={deal.id}
                className={`p-4 rounded-3xl border flex items-center gap-4 transition hover:shadow-md ${
                  isDark
                    ? 'bg-[#171F2C] border-white/10'
                    : 'bg-white border-orange-200/80 shadow-xs'
                }`}
              >
                <div
                  onClick={() => openProductDetail(deal)}
                  className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100 cursor-pointer relative"
                >
                  <EditableImage
                    id={`store_hero_deal_img_${deal.id}`}
                    defaultSrc={deal.image}
                    alt={deal.name}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-black text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {deal.badge}
                  </span>
                </div>

                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center gap-1 text-[10px] font-extrabold uppercase text-emerald-600">
                    <Flame size={11} />
                    <span>Flash Combo</span>
                  </div>
                  <div
                    onClick={() => openProductDetail(deal)}
                    className="text-xs sm:text-sm font-extrabold line-clamp-2 hover:underline cursor-pointer"
                  >
                    {deal.name}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-black" style={{ color: primaryColor }}>
                      ৳{deal.price.toLocaleString()}
                    </span>
                    {deal.regularPrice && (
                      <span className="text-xs line-through text-slate-400">
                        ৳{deal.regularPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => buyNowDirect(deal)}
                    className="w-full py-1.5 px-3 rounded-lg text-[11px] font-extrabold text-white shadow-2xs hover:opacity-95 transition cursor-pointer"
                    style={{ backgroundColor: primaryColor }}
                  >
                    এখনই কিনুন (Order Now)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <EditableText
              id="store_cat_strip_title"
              as="h2"
              defaultText="Shop by Category (জনপ্রিয় ক্যাটাগরি)"
              className="text-lg sm:text-xl font-black tracking-tight block"
            />
            <button
              type="button"
              onClick={() => openCategoryPage('all')}
              className="text-xs font-extrabold flex items-center gap-1 hover:underline cursor-pointer"
              style={{ color: primaryColor }}
            >
              <span>View All Categories</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3">
            {categories.map((cat) => (
              <div
                key={cat.slug}
                role="button"
                tabIndex={0}
                onClick={() => openCategoryPage(cat.slug)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openCategoryPage(cat.slug);
                  }
                }}
                className={`group p-3 rounded-2xl border text-center flex flex-col items-center justify-between gap-2 transition hover:-translate-y-0.5 hover:shadow-md cursor-pointer ${
                  isDark
                    ? 'bg-[#171F2C] border-white/10 hover:border-orange-400'
                    : 'bg-white border-slate-200/80 hover:border-orange-400'
                }`}
              >
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-orange-200 group-hover:border-orange-500 transition">
                  <EditableImage
                    id={`store_cat_icon_${cat.slug}`}
                    defaultSrc={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-0.5">
                  <div className="text-[11px] font-extrabold leading-tight line-clamp-1">
                    {cat.label}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">{cat.bangla}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreHeroSection;
