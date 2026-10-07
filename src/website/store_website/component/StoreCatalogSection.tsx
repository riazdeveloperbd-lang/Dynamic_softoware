import React from 'react';
import {
  ShoppingBag,
  Heart,
  Star,
  Eye,
  Flame,
  Filter,
  CheckCircle2,
  ArrowLeft,
  SlidersHorizontal,
} from 'lucide-react';
import {
  EditableText,
  EditableImage,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';
import {
  useStoreEcommerce,
  STORE_PRODUCTS,
  STORE_CATEGORIES,
  StoreProductItem,
} from './StoreEcommerceContext';

export interface StoreCatalogSectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

export const StoreCatalogSection: React.FC<StoreCatalogSectionProps> = ({
  title = 'সকল প্রোডাক্ট (All Organic Products)',
  subtitle = '100% pure, chemical-free honey, gawa ghee, cold-pressed mustard oil, imported dates & superfoods.',
  variant = 'varient_1',
  primaryColor = '#F37021',
  isDark = false,
}) => {
  const {
    activePage,
    setActivePage,
    selectedCategory,
    setSelectedCategory,
    openProductDetail,
    searchQuery,
    setSearchQuery,
    priceCeiling,
    setPriceCeiling,
    sortBy,
    setSortBy,
    addToCart,
    buyNowDirect,
    wishlistIds,
    toggleWishlist,
    setQuickViewProduct,
    products,
    categories,
  } = useStoreEcommerce();

  // Only render on pages that display product listings
  if (
    activePage !== 'home' &&
    activePage !== 'category' &&
    activePage !== 'offer_zone' &&
    activePage !== 'best_seller'
  ) {
    return null;
  }

  const effectiveCategory =
    activePage === 'offer_zone'
      ? 'offer_zone'
      : activePage === 'best_seller'
      ? 'best_seller'
      : selectedCategory;

  const filteredProducts = products.filter((prod) => {
    if (effectiveCategory === 'offer_zone' && !prod.isOfferZone) return false;
    if (effectiveCategory === 'best_seller' && !prod.isBestSeller) return false;
    if (
      effectiveCategory !== 'all' &&
      effectiveCategory !== 'offer_zone' &&
      effectiveCategory !== 'best_seller' &&
      prod.category !== effectiveCategory
    ) {
      return false;
    }
    if (prod.price > priceCeiling) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        prod.name.toLowerCase().includes(q) ||
        prod.categoryLabel.toLowerCase().includes(q) ||
        (prod.banglaSub && prod.banglaSub.toLowerCase().includes(q))
      );
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const renderProductCard = (prod: StoreProductItem) => {
    const isWished = wishlistIds.includes(prod.id);
    return (
      <div
        key={prod.id}
        className={`group rounded-2xl border overflow-hidden flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-xl ${
          isDark
            ? 'bg-[#171F2C] border-white/10'
            : variant === 'varient_2'
            ? 'bg-[#FFFBF7] border-orange-200/80'
            : 'bg-white border-slate-200/80 shadow-xs'
        }`}
      >
        <div>
          {/* Product Image Box */}
          <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
            <div
              onClick={() => openProductDetail(prod)}
              className="w-full h-full cursor-pointer"
            >
              <EditableImage
                id={`store_prod_img_${prod.id}`}
                defaultSrc={prod.image}
                alt={prod.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {prod.badge && (
              <span
                className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg text-[10px] font-black text-white shadow-sm"
                style={{ backgroundColor: primaryColor }}
              >
                {prod.badge}
              </span>
            )}

            <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => toggleWishlist(prod.id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition cursor-pointer ${
                  isWished
                    ? 'bg-rose-500 text-white'
                    : 'bg-white/90 text-slate-700 hover:bg-white'
                }`}
                title="Add to Wishlist"
              >
                <Heart size={14} fill={isWished ? 'currentColor' : 'none'} />
              </button>
              <button
                type="button"
                onClick={() => setQuickViewProduct(prod)}
                className="w-8 h-8 rounded-full bg-white/90 text-slate-700 hover:bg-white flex items-center justify-center shadow-md transition cursor-pointer"
                title="Quick View"
              >
                <Eye size={14} />
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {prod.categoryLabel}
              </span>
              <span className="inline-flex items-center gap-0.5 font-extrabold text-amber-500">
                <Star size={11} fill="currentColor" />
                {prod.rating} ({prod.reviewsCount})
              </span>
            </div>

            <div
              onClick={() => openProductDetail(prod)}
              className="cursor-pointer hover:text-[#F37021] transition"
            >
              <EditableText
                id={`store_prod_name_${prod.id}`}
                as="h3"
                defaultText={prod.name}
                className="text-xs sm:text-sm font-extrabold leading-snug line-clamp-2 block"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-baseline gap-1.5">
                <span className="text-base sm:text-lg font-black" style={{ color: primaryColor }}>
                  ৳{prod.price.toLocaleString()}
                </span>
                {prod.regularPrice && (
                  <span className="text-xs line-through text-slate-400">
                    ৳{prod.regularPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-[10px] font-bold">
                {prod.weight}
              </span>
            </div>
          </div>
        </div>

        {/* GhorerBazar Signature Dual Action Buttons: Quick Add + Order Now */}
        <div className="p-3 pt-0 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => addToCart(prod, prod.weight, 1, true)}
            className="py-2 px-2.5 rounded-xl border-2 text-[11px] font-extrabold flex items-center justify-center gap-1 transition hover:opacity-90 cursor-pointer"
            style={{
              borderColor: primaryColor,
              color: isDark ? '#FFFFFF' : primaryColor,
            }}
          >
            <ShoppingBag size={12} />
            <span>Quick Add</span>
          </button>
          <button
            type="button"
            onClick={() => buyNowDirect(prod, prod.weight, 1)}
            className="py-2 px-2.5 rounded-xl text-[11px] font-extrabold text-white shadow-xs transition hover:opacity-95 cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            অর্ডার করুন
          </button>
        </div>
      </div>
    );
  };

  return (
    <section
      className={`py-10 px-4 sm:px-6 transition-colors ${
        isDark ? 'bg-[#0F141C] text-white' : 'bg-white text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header Banner when on dedicated Offer Zone, Best Seller, or Category Page */}
        {activePage !== 'home' && (
          <div
            className={`p-6 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              isDark
                ? 'bg-[#171F2C] border-white/10'
                : 'bg-[#FFF6EE] border-orange-200/80'
            }`}
          >
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setActivePage('home')}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold mb-1 hover:underline cursor-pointer"
                style={{ color: primaryColor }}
              >
                <ArrowLeft size={13} />
                <span>Back to Store Home</span>
              </button>
              <h1 className="text-xl sm:text-3xl font-black tracking-tight flex items-center gap-2">
                {activePage === 'offer_zone' && <Flame size={24} style={{ color: primaryColor }} />}
                <span>
                  {activePage === 'offer_zone'
                    ? 'OFFER ZONE — ধামাকা ডিসকাউন্ট ও কম্বো অফার'
                    : activePage === 'best_seller'
                    ? 'Best Selling Products (বেস্ট সেলার পণ্য)'
                    : STORE_CATEGORIES.find((c) => c.slug === selectedCategory)?.label ||
                      'সকল প্রোডাক্ট (All Products)'}
                </span>
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Showing {filteredProducts.length} lab-tested pure &amp; organic products
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className={`px-3.5 py-2 rounded-xl border text-xs font-bold focus:outline-none cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-white/15 text-white'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <option value="featured">Sort: Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </div>
        )}

        {/* Filter Bar + Category Pills */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-white/10">
          <div>
            <EditableText
              id="store_catalog_heading"
              as="h2"
              defaultText={title}
              className="text-xl sm:text-2xl font-black tracking-tight block"
            />
            <EditableText
              id="store_catalog_sub"
              as="p"
              defaultText={subtitle}
              className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-extrabold transition cursor-pointer ${
                effectiveCategory === 'all'
                  ? 'text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300'
              }`}
              style={effectiveCategory === 'all' ? { backgroundColor: primaryColor } : undefined}
            >
              All ({products.length})
            </button>
            {categories.slice(0, 7).map((cat) => {
              const active = effectiveCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                    active
                      ? 'text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-orange-100/50'
                  }`}
                  style={active ? { backgroundColor: primaryColor } : undefined}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Range Slider on Category Page */}
        {activePage === 'category' && (
          <div
            className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 text-xs ${
              isDark ? 'bg-[#171F2C] border-white/10' : 'bg-slate-50 border-slate-200/80'
            }`}
          >
            <div className="flex items-center gap-2 font-bold">
              <SlidersHorizontal size={14} style={{ color: primaryColor }} />
              <span>Filter by Max Price:</span>
              <strong style={{ color: primaryColor }}>৳{priceCeiling}</strong>
            </div>
            <input
              type="range"
              min={500}
              max={2500}
              step={50}
              value={priceCeiling}
              onChange={(e) => setPriceCeiling(Number(e.target.value))}
              className="w-48 accent-[#F37021] cursor-pointer"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-rose-500 font-bold hover:underline cursor-pointer"
              >
                Clear Search &ldquo;{searchQuery}&rdquo;
              </button>
            )}
          </div>
        )}

        {/* Product Cards Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${
            variant === 'varient_2' ? 'lg:grid-cols-4' : 'lg:grid-cols-5'
          } gap-4 sm:gap-5`}
        >
          {filteredProducts.map((prod) => renderProductCard(prod))}
        </div>

        {/* Home Page Additional Section: Best Selling Combos & Customer Reviews Strip */}
        {activePage === 'home' && (
          <div className="pt-8 space-y-6">
            <div className="flex items-center justify-between">
              <EditableText
                id="store_bestseller_strip_heading"
                as="h3"
                defaultText="বেস্ট সেলিং কম্বো ও স্পেশাল অফার (Best Sellers)"
                className="text-lg sm:text-xl font-black tracking-tight block"
              />
              <button
                type="button"
                onClick={() => setActivePage('best_seller')}
                className="text-xs font-extrabold hover:underline cursor-pointer"
                style={{ color: primaryColor }}
              >
                See All Best Sellers →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  id: 'rev1',
                  name: 'Mahmudul Hasan · Uttara, Dhaka',
                  comment:
                    '“সুন্দরবনের খলিশা মধু এবং পাবনার গাওয়া ঘি দুটোই আলহামদুলিল্লাহ ১০০% খাঁটি পেয়েছি। ঘ্রাণ এবং স্বাদ অতুলনীয়।”',
                  product: 'Sundarban Honey & Gawa Ghee',
                },
                {
                  id: 'rev2',
                  name: 'Nusrat Jahan · Chattogram',
                  comment:
                    '“মদিনার আজওয়া খেজুর এবং হানি নাটস জার অর্ডার করেছিলাম। প্যাকেজিং খুব প্রিমিয়াম ছিল এবং ডেলিভারি পরের দিনই পেয়েছি।”',
                  product: 'Saudi Ajwa Dates VIP',
                },
                {
                  id: 'rev3',
                  name: 'Rafiqul Islam · Sylhet',
                  comment:
                    '“ঘানি ভাঙা সরিষার তেলের ঝাঁঝ একদম ছোটবেলার গ্রামের তেলের মতো। পরিবারের সবাই খুব পছন্দ করেছে।”',
                  product: 'Wood-Pressed Mustard Oil 5L',
                },
              ].map((r) => (
                <div
                  key={r.id}
                  className={`p-5 rounded-2xl border space-y-2.5 ${
                    isDark
                      ? 'bg-[#171F2C] border-white/10'
                      : 'bg-[#FFFDF9] border-orange-200/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} size={12} fill="currentColor" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                      <CheckCircle2 size={11} /> Verified Buyer
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed opacity-85">{r.comment}</p>
                  <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-[11px]">
                    <span className="font-extrabold">{r.name}</span>
                    <span className="font-semibold" style={{ color: primaryColor }}>
                      {r.product}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default StoreCatalogSection;
