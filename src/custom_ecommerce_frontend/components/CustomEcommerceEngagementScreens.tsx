import React, { useState } from 'react';
import {
  Heart,
  Star,
  Plus,
  Check,
  ChevronLeft,
  ChevronDown,
  Camera,
  SlidersHorizontal,
  Grid,
  List,
  ShoppingCart,
  Trash2,
  Share2,
  BellRing,
  Sparkles,
  Layers,
} from 'lucide-react';
import {
  CustomEcommerceScreenId,
  CustomEcommerceVariantId,
  CUSTOM_ECOMMERCE_PRODUCTS,
} from '../data/customEcommerceRegistry';

interface EngagementScreensProps {
  screenId: CustomEcommerceScreenId;
  variant: CustomEcommerceVariantId;
  primaryColor: string;
  isDark: boolean;
  onNavigate: (target: CustomEcommerceScreenId) => void;
  onAddToCart: (productId: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
}

export const CustomEcommerceEngagementScreens: React.FC<EngagementScreensProps> = ({
  screenId,
  variant,
  primaryColor,
  isDark,
  onNavigate,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);
  const [descExpanded, setDescExpanded] = useState(true);
  const [addedFeedbackId, setAddedFeedbackId] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [wholesaleTier, setWholesaleTier] = useState<'1+' | '5+' | '10+'>('5+');
  const [priceAlertEnabled, setPriceAlertEnabled] = useState(true);

  const triggerQuickAdd = (id: string) => {
    onAddToCart(id);
    setAddedFeedbackId(id);
    setTimeout(() => setAddedFeedbackId(null), 900);
  };

  // ============================================================================
  // 9. PRODUCT LISTING PAGE (PLP) — 6 DISTINCT CATALOG ARCHITECTURES
  // ============================================================================
  if (screenId === 'ProductListingPage') {
    // V1: KEEP ORIGINAL 2-COLUMN INFINITE GRID
    if (variant === 'varient_1') {
      return (
        <div className="p-4 space-y-3.5 select-none">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-base font-black">All Catalog (PLP · V1)</h1>
              <p className="text-[11px] opacity-65">Infinite scroll · Quick Add to Cart</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('AdvancedFilterSheet')}
              className="px-2.5 py-2 rounded-xl text-white text-[11px] font-extrabold flex items-center gap-1 cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <SlidersHorizontal size={12} />
              <span>Filter</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {CUSTOM_ECOMMERCE_PRODUCTS.map((prod) => {
              const isLiked = wishlistIds.includes(prod.id);
              const justAdded = addedFeedbackId === prod.id;
              return (
                <div
                  key={prod.id}
                  onClick={() => onNavigate('ProductDetailPage')}
                  className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-2.5 space-y-2 cursor-pointer"
                >
                  <div className="relative h-28">
                    <img src={prod.image} alt={prod.title} className="w-full h-full object-cover rounded-xl" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(prod.id);
                      }}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center"
                    >
                      <Heart size={11} className={isLiked ? 'fill-rose-500 text-rose-500' : ''} />
                    </button>
                  </div>
                  <div className="text-xs font-extrabold line-clamp-1">{prod.title}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black" style={{ color: primaryColor }}>
                      ${prod.price}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerQuickAdd(prod.id);
                      }}
                      className="px-2 py-1 rounded-lg text-[10px] font-extrabold text-white"
                      style={{ backgroundColor: justAdded ? '#10B981' : primaryColor }}
                    >
                      {justAdded ? 'Added' : '+ Add'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // V2: DETAILED HORIZONTAL SPEC ROWS + COMPARE CHECKBOXES
    if (variant === 'varient_2') {
      return (
        <div className="p-4 space-y-2.5 select-none">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-black">Detailed Spec Comparison List</h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-500">
              Compare Mode
            </span>
          </div>
          {CUSTOM_ECOMMERCE_PRODUCTS.slice(0, 4).map((prod) => (
            <div
              key={prod.id}
              onClick={() => onNavigate('ProductDetailPage')}
              className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex gap-3 cursor-pointer"
            >
              <img src={prod.image} alt="" className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-500">{prod.stockStatus}</span>
                  <span className="text-[10px] font-bold text-amber-500">★ {prod.rating}</span>
                </div>
                <div className="text-xs font-extrabold truncate">{prod.title}</div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm font-black" style={{ color: primaryColor }}>
                    ${prod.price}.00
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerQuickAdd(prod.id);
                    }}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    + Quick Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // V3: BRUTALIST WHOLESALE ORDER MATRIX TABLE
    if (variant === 'varient_3') {
      return (
        <div className="p-4 space-y-3 font-mono select-none">
          <div className="border-2 border-current p-2 bg-amber-300 text-black font-black text-xs flex justify-between">
            <span>CATALOG_LEDGER // V3</span>
            <span>6 SKUS</span>
          </div>
          <div className="border-2 border-current divide-y-2 divide-current bg-white dark:bg-neutral-900">
            {CUSTOM_ECOMMERCE_PRODUCTS.slice(0, 5).map((p, idx) => (
              <div
                key={p.id}
                onClick={() => onNavigate('ProductDetailPage')}
                className="p-2.5 flex items-center justify-between gap-2 cursor-pointer"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold">
                    #0{idx + 1} · {p.brand.toUpperCase()}
                  </div>
                  <div className="text-xs font-black truncate">{p.title}</div>
                </div>
                <div className="text-xs font-black">${p.price}</div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerQuickAdd(p.id);
                  }}
                  className="px-2 py-1 border-2 border-black bg-[#FDE047] text-black text-[10px] font-black"
                >
                  +ADD
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // V4: BENTO ASYMMETRIC FEATURED HERO + 2-COL FEED
    if (variant === 'varient_4') {
      const hero = CUSTOM_ECOMMERCE_PRODUCTS[0];
      return (
        <div className="p-4 space-y-3 select-none">
          <div
            onClick={() => onNavigate('ProductDetailPage')}
            className="p-3.5 rounded-3xl border-2 space-y-2 cursor-pointer"
            style={{ borderColor: primaryColor }}
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-500 text-white">
                #1 Editor&apos;s Pick
              </span>
              <span className="text-sm font-black" style={{ color: primaryColor }}>
                ${hero.price}
              </span>
            </div>
            <img src={hero.image} alt="" className="w-full h-32 object-cover rounded-2xl" />
            <div className="text-xs font-black">{hero.title}</div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {CUSTOM_ECOMMERCE_PRODUCTS.slice(1, 3).map((p) => (
              <div
                key={p.id}
                onClick={() => onNavigate('ProductDetailPage')}
                className="p-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-1.5 cursor-pointer"
              >
                <img src={p.image} alt="" className="w-full h-20 object-cover rounded-xl" />
                <div className="text-[11px] font-extrabold truncate">{p.title}</div>
                <div className="text-xs font-black">${p.price}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // V5: EDITORIAL FULL-BLEED PORTRAIT LOOKBOOK CARDS WITH SIZE PILLS
    if (variant === 'varient_5') {
      return (
        <div className="p-4 space-y-4 select-none">
          {CUSTOM_ECOMMERCE_PRODUCTS.slice(2, 4).map((p) => (
            <div
              key={p.id}
              onClick={() => onNavigate('ProductDetailPage')}
              className="rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 cursor-pointer"
            >
              <img src={p.image} alt="" className="w-full h-44 object-cover" />
              <div className="p-3.5 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black">{p.title}</span>
                  <span className="text-sm font-black" style={{ color: primaryColor }}>
                    ${p.price}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {['S', 'M', 'L', 'XL'].map((sz) => (
                      <span
                        key={sz}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSize(sz);
                        }}
                        className={`w-6 h-6 rounded-md text-[10px] font-bold flex items-center justify-center border ${
                          selectedSize === sz ? 'bg-black text-white dark:bg-white dark:text-black' : ''
                        }`}
                      >
                        {sz}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerQuickAdd(p.id);
                    }}
                    className="px-3 py-1 rounded-lg text-[10px] font-extrabold text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    + Quick Add ({selectedSize})
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // V6: B2B WHOLESALE TIERED VOLUME STEPPER LIST
    return (
      <div className="p-4 space-y-3 select-none">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black">Bulk Volume Tier Pricing</span>
          <div className="flex gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg text-[10px] font-bold">
            {(['1+', '5+', '10+'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setWholesaleTier(t)}
                className={`px-2 py-0.5 rounded ${wholesaleTier === t ? 'bg-white dark:bg-neutral-900 font-black' : ''}`}
              >
                {t} Units
              </button>
            ))}
          </div>
        </div>
        {CUSTOM_ECOMMERCE_PRODUCTS.slice(0, 4).map((p) => {
          const unitDiscount = wholesaleTier === '10+' ? 0.8 : wholesaleTier === '5+' ? 0.9 : 1;
          const netPrice = Math.round(p.price * unitDiscount);
          return (
            <div
              key={p.id}
              onClick={() => onNavigate('ProductDetailPage')}
              className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img src={p.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                <div className="min-w-0">
                  <div className="text-xs font-extrabold truncate">{p.title}</div>
                  <div className="text-[10px] text-emerald-500 font-bold">
                    ${netPrice}/unit ({wholesaleTier} tier)
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  triggerQuickAdd(p.id);
                }}
                className="px-2.5 py-1.5 rounded-lg text-[10px] font-extrabold text-white"
                style={{ backgroundColor: primaryColor }}
              >
                + Batch
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  // ============================================================================
  // 10. PRODUCT DETAIL PAGE (PDP) — 6 DISTINCT PRODUCT SHOWCASES
  // ============================================================================
  if (screenId === 'ProductDetailPage') {
    const prod = CUSTOM_ECOMMERCE_PRODUCTS[selectedGalleryIdx % CUSTOM_ECOMMERCE_PRODUCTS.length];

    // V1: KEEP ORIGINAL CAROUSEL + EXPANDABLE SPECS + PHOTO REVIEWS + STICKY CTA
    if (variant === 'varient_1') {
      return (
        <div className="h-full flex flex-col justify-between select-none">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => onNavigate('ProductListingPage')}
                className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 cursor-pointer"
              >
                <ChevronLeft size={15} />
              </button>
              <span className="text-xs font-extrabold">Product Details (V1)</span>
              <button
                type="button"
                onClick={() => onToggleWishlist(prod.id)}
                className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 cursor-pointer"
              >
                <Heart size={15} className={wishlistIds.includes(prod.id) ? 'fill-rose-500 text-rose-500' : ''} />
              </button>
            </div>

            <div className="space-y-2">
              <div className="relative h-48 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
                <img src={prod.image} alt={prod.title} className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {CUSTOM_ECOMMERCE_PRODUCTS.slice(0, 4).map((thumb, idx) => (
                  <button
                    key={thumb.id}
                    type="button"
                    onClick={() => setSelectedGalleryIdx(idx)}
                    className={`h-12 rounded-xl overflow-hidden border-2 cursor-pointer ${
                      selectedGalleryIdx === idx ? '' : 'opacity-50 border-transparent'
                    }`}
                    style={selectedGalleryIdx === idx ? { borderColor: primaryColor } : undefined}
                  >
                    <img src={thumb.image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h1 className="text-base font-black leading-snug">{prod.title}</h1>
              <div className="text-xl font-black mt-1" style={{ color: primaryColor }}>
                ${prod.price}.00
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-3 space-y-1.5">
              <button
                type="button"
                onClick={() => setDescExpanded((e) => !e)}
                className="w-full flex items-center justify-between text-xs font-extrabold cursor-pointer"
              >
                <span>Product Description &amp; Specs</span>
                <ChevronDown size={14} />
              </button>
              {descExpanded && (
                <p className="text-[11px] opacity-75">
                  Dual-sensor noise cancellation, 30-hour battery endurance, and official 1-year warranty.
                </p>
              )}
            </div>
          </div>

          <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => triggerQuickAdd(prod.id)}
              className="py-3 rounded-xl border-2 text-xs font-extrabold cursor-pointer"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={() => {
                onAddToCart(prod.id);
                onNavigate('ShoppingCart');
              }}
              className="py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              Buy Now →
            </button>
          </div>
        </div>
      );
    }

    // V2: BENTO SPEC GRID + CUSTOMER PHOTO REVIEW MOSAIC
    if (variant === 'varient_2') {
      return (
        <div className="p-4 space-y-3 select-none">
          <div className="grid grid-cols-12 gap-2">
            <img
              src={prod.image}
              alt=""
              className="col-span-7 h-36 w-full object-cover rounded-2xl"
            />
            <div className="col-span-5 flex flex-col justify-between p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-900">
              <span className="text-[10px] font-bold text-emerald-500">✓ Official Store</span>
              <div className="text-lg font-black" style={{ color: primaryColor }}>
                ${prod.price}
              </div>
              <div className="text-[10px] font-bold text-amber-500">★ 4.9 (1.4k)</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              ['Battery', '30 Hours'],
              ['Bluetooth', 'v5.3 LDAC'],
              ['Warranty', '12 Months'],
            ].map(([k, v]) => (
              <div key={k} className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <div className="text-[9px] uppercase opacity-60">{k}</div>
                <div className="text-[11px] font-black">{v}</div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-2">
            <div className="text-xs font-extrabold flex justify-between">
              <span>Buyer Photo Uploads (84)</span>
              <Camera size={13} style={{ color: primaryColor }} />
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {CUSTOM_ECOMMERCE_PRODUCTS.slice(0, 4).map((img) => (
                <img key={img.id} src={img.image} alt="" className="h-12 w-full object-cover rounded-lg" />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onAddToCart(prod.id);
              onNavigate('ShoppingCart');
            }}
            className="w-full py-3 rounded-2xl text-xs font-extrabold text-white cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            Add Bento Item to Bag (${prod.price}) →
          </button>
        </div>
      );
    }

    // V3: BRUTALIST TECHNICAL DOSSIER + AUTHENTICITY PASSPORT
    if (variant === 'varient_3') {
      return (
        <div className="p-4 space-y-3 font-mono select-none">
          <div className="border-2 border-current p-2 bg-black text-white text-[10px] font-black flex justify-between">
            <span>DOSSIER // {prod.id.toUpperCase()}</span>
            <span>CERTIFIED</span>
          </div>
          <img src={prod.image} alt="" className="w-full h-36 object-cover border-2 border-current" />
          <div className="border-2 border-current p-3 bg-white dark:bg-neutral-900 shadow-[4px_4px_0px_currentColor] space-y-1.5 text-xs">
            <div className="font-black uppercase">{prod.title}</div>
            <div className="text-[10px] opacity-75">ORIGIN: TOKYO_LAB // SERIAL: #SN-99412</div>
            <div className="text-base font-black pt-1">PRICE: ${prod.price}.00</div>
          </div>
          <button
            type="button"
            onClick={() => {
              onAddToCart(prod.id);
              onNavigate('ShoppingCart');
            }}
            className="w-full py-3 border-2 border-black bg-amber-300 text-black font-black text-xs uppercase shadow-[3px_3px_0px_#000] cursor-pointer"
          >
            [ ACQUIRE_UNIT_NOW ]
          </button>
        </div>
      );
    }

    // V4: FULL-BLEED IMMERSIVE GLASS SHEET OVERLAY
    if (variant === 'varient_4') {
      return (
        <div className="h-full w-full relative overflow-hidden flex flex-col justify-between p-4 text-white select-none">
          <img src={prod.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          <div className="relative z-10 flex justify-between">
            <button
              type="button"
              onClick={() => onNavigate('ProductListingPage')}
              className="p-2 rounded-full bg-black/50 backdrop-blur"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur text-[10px] font-bold">
              360° Studio View
            </span>
          </div>

          <div className="relative z-10 p-4 rounded-3xl border border-white/20 bg-black/65 backdrop-blur-xl space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-amber-300">{prod.brand}</div>
                <h2 className="text-base font-black">{prod.title}</h2>
              </div>
              <span className="text-lg font-black text-amber-300">${prod.price}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                onAddToCart(prod.id);
                onNavigate('ShoppingCart');
              }}
              className="w-full py-3 rounded-xl bg-white text-slate-950 text-xs font-black uppercase cursor-pointer"
            >
              Reserve Piece in Bag
            </button>
          </div>
        </div>
      );
    }

    // V5: ATELIER SPLIT SWATCH & FIT PREDICTOR
    if (variant === 'varient_5') {
      return (
        <div className="p-4 space-y-3.5 select-none">
          <div className="flex gap-3">
            <img src={prod.image} alt="" className="w-28 h-36 rounded-2xl object-cover" />
            <div className="flex-1 flex flex-col justify-between">
              <span className="text-[10px] font-mono uppercase opacity-60">{prod.brand}</span>
              <h2 className="text-xs font-black">{prod.title}</h2>
              <div className="text-base font-black" style={{ color: primaryColor }}>
                ${prod.price}.00
              </div>
              <div className="text-[10px] font-bold text-emerald-500">✓ True to Size (96%)</div>
            </div>
          </div>

          <div className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-2">
            <div className="text-[11px] font-extrabold">Select Edition / Size</div>
            <div className="grid grid-cols-4 gap-1.5">
              {['Std', 'Pro', 'Max', 'Gift'].map((ed) => (
                <button
                  key={ed}
                  type="button"
                  onClick={() => setSelectedSize(ed)}
                  className={`py-1.5 rounded-lg text-xs font-bold border ${
                    selectedSize === ed ? 'text-white border-transparent' : ''
                  }`}
                  style={selectedSize === ed ? { backgroundColor: primaryColor } : undefined}
                >
                  {ed}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onAddToCart(prod.id);
              onNavigate('ShoppingCart');
            }}
            className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            Add {selectedSize} Edition to Cart →
          </button>
        </div>
      );
    }

    // V6: FREQUENTLY BOUGHT TOGETHER BUNDLE BUILDER + LIVE VIEWERS COUNTER
    return (
      <div className="p-4 space-y-3.5 select-none">
        <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500 text-[11px] font-extrabold text-center">
          🔥 28 shoppers are viewing this item right now
        </div>

        <div className="flex items-center gap-3 p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          <img src={prod.image} alt="" className="w-16 h-16 rounded-xl object-cover" />
          <div>
            <div className="text-xs font-black">{prod.title}</div>
            <div className="text-sm font-black" style={{ color: primaryColor }}>
              ${prod.price}.00
            </div>
          </div>
        </div>

        <div className="p-3 rounded-2xl border-2 border-dashed space-y-2" style={{ borderColor: primaryColor }}>
          <div className="text-xs font-black">🎁 Frequently Bought Together (Save $35)</div>
          <div className="flex items-center justify-between text-xs">
            <span>+ Chrono Leather Watch Combo</span>
            <span className="font-black text-emerald-500">+$130 (was $165)</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            onAddToCart(prod.id);
            onAddToCart('prod_2');
            onNavigate('ShoppingCart');
          }}
          className="w-full py-3 rounded-xl text-xs font-extrabold text-white shadow-md cursor-pointer"
          style={{ backgroundColor: primaryColor }}
        >
          Buy Combo Bundle ($428) →
        </button>
      </div>
    );
  }

  // ============================================================================
  // 11. WISHLIST / SAVED ITEMS — 6 DISTINCT WISHLIST LAYOUTS
  // ============================================================================
  const savedProducts = CUSTOM_ECOMMERCE_PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  const displayList = savedProducts.length > 0 ? savedProducts : CUSTOM_ECOMMERCE_PRODUCTS.slice(0, 4);

  // V1: KEEP ORIGINAL 2-COL SAVED GRID
  if (variant === 'varient_1') {
    return (
      <div className="p-4 space-y-4 select-none">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-base font-black">Wishlist &amp; Saved ({displayList.length})</h1>
            <p className="text-[11px] opacity-65">Favorited items saved for future purchase</p>
          </div>
          <button
            type="button"
            onClick={() => {
              displayList.forEach((p) => onAddToCart(p.id));
              onNavigate('ShoppingCart');
            }}
            className="px-3 py-1.5 rounded-xl text-[11px] font-extrabold text-white cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            Move All to Cart
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {displayList.map((prod) => (
            <div
              key={prod.id}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-2.5 space-y-2"
            >
              <div className="relative h-28">
                <img src={prod.image} alt={prod.title} className="w-full h-full object-cover rounded-xl" />
                <button
                  type="button"
                  onClick={() => onToggleWishlist(prod.id)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/90 text-rose-500 flex items-center justify-center shadow"
                >
                  <Trash2 size={11} />
                </button>
              </div>
              <div className="text-xs font-extrabold truncate">{prod.title}</div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black" style={{ color: primaryColor }}>
                  ${prod.price}
                </span>
                <button
                  type="button"
                  onClick={() => triggerQuickAdd(prod.id)}
                  className="px-2 py-1 rounded-lg text-[10px] font-extrabold text-white cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                >
                  + Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // V2: BENTO MOODBOARD COLLECTIONS (WORKDESK / TRAVEL / SKINCARE BOARDS)
  if (variant === 'varient_2') {
    return (
      <div className="p-4 space-y-3.5 select-none">
        <div className="flex items-center justify-between">
          <h1 className="text-base font-black">Curated Moodboards</h1>
          <span className="text-xs font-bold" style={{ color: primaryColor }}>
            + New Board
          </span>
        </div>
        {[
          { name: '🎧 Studio Desk Setup', count: '4 Saved Items', imgs: [CUSTOM_ECOMMERCE_PRODUCTS[0].image, CUSTOM_ECOMMERCE_PRODUCTS[4].image] },
          { name: '✈️ Weekend Carry & Style', count: '3 Saved Items', imgs: [CUSTOM_ECOMMERCE_PRODUCTS[1].image, CUSTOM_ECOMMERCE_PRODUCTS[5].image] },
        ].map((board) => (
          <div
            key={board.name}
            onClick={() => onNavigate('ProductDetailPage')}
            className="p-3 rounded-3xl border border-neutral-200 dark:border-neutral-800 space-y-2 cursor-pointer"
          >
            <div className="grid grid-cols-2 gap-2 h-24">
              {board.imgs.map((src, i) => (
                <img key={i} src={src} alt="" className="w-full h-full object-cover rounded-2xl" />
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-black">{board.name}</div>
                <div className="text-[10px] opacity-60">{board.count}</div>
              </div>
              <Share2 size={14} className="opacity-60" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // V3: BRUTALIST SAVED ARCHIVE LEDGER + TOTAL ESTIMATE
  if (variant === 'varient_3') {
    return (
      <div className="p-4 space-y-3 font-mono select-none">
        <div className="border-2 border-current p-2 bg-amber-300 text-black font-black text-xs">
          SAVED_ARCHIVE // {displayList.length} ITEMS
        </div>
        {displayList.map((p) => (
          <div
            key={p.id}
            className="border-2 border-current p-2.5 flex items-center justify-between bg-white dark:bg-neutral-900 shadow-[3px_3px_0px_currentColor]"
          >
            <div className="min-w-0 pr-2">
              <div className="text-xs font-black truncate">{p.title}</div>
              <div className="text-[10px]">${p.price}.00 // IN_STOCK</div>
            </div>
            <button
              type="button"
              onClick={() => triggerQuickAdd(p.id)}
              className="px-2.5 py-1 border-2 border-black bg-emerald-400 text-black text-[10px] font-black"
            >
              MOVE_BAG
            </button>
          </div>
        ))}
      </div>
    );
  }

  // V4: PRICE-DROP TRACKER & TARGET ALERT WATCHLIST
  if (variant === 'varient_4') {
    return (
      <div className="p-4 space-y-3.5 select-none">
        <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BellRing size={16} style={{ color: primaryColor }} />
            <span className="text-xs font-extrabold">Instant Price-Drop Push Alerts</span>
          </div>
          <button
            type="button"
            onClick={() => setPriceAlertEnabled((a) => !a)}
            className="px-2 py-0.5 rounded bg-emerald-500 text-white text-[10px] font-black"
          >
            {priceAlertEnabled ? 'ON' : 'OFF'}
          </button>
        </div>

        {displayList.slice(0, 3).map((p) => (
          <div
            key={p.id}
            className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-center gap-3"
          >
            <img src={p.image} alt="" className="w-14 h-14 rounded-xl object-cover" />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-extrabold truncate">{p.title}</div>
              <div className="text-[10px] text-emerald-500 font-bold">
                ↓ Dropped ${p.originalPrice - p.price} since saved!
              </div>
              <div className="text-xs font-black mt-0.5">${p.price}.00</div>
            </div>
            <button
              type="button"
              onClick={() => triggerQuickAdd(p.id)}
              className="px-2.5 py-1.5 rounded-xl text-[10px] font-extrabold text-white"
              style={{ backgroundColor: primaryColor }}
            >
              Buy Dip
            </button>
          </div>
        ))}
      </div>
    );
  }

  // V5: ATELIER GIFT REGISTRY & PUBLIC SHAREABLE WISHLIST
  if (variant === 'varient_5') {
    return (
      <div className="p-4 space-y-3.5 select-none">
        <div className="border-l-4 pl-3" style={{ borderColor: primaryColor }}>
          <div className="text-[10px] font-mono uppercase opacity-60">SHARED GIFT REGISTRY</div>
          <h2 className="text-base font-black">Alex&apos;s Birthday &amp; Studio List</h2>
        </div>

        <div className="space-y-2">
          {displayList.slice(0, 3).map((p) => (
            <div
              key={p.id}
              className="p-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img src={p.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate">{p.title}</div>
                  <div className="text-[10px] opacity-60">Priority: High · ${p.price}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => triggerQuickAdd(p.id)}
                className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold text-white"
                style={{ backgroundColor: primaryColor }}
              >
                Gift This
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // V6: SIDE-BY-SIDE SAVED ITEM SPEC COMPARISON MATRIX
  return (
    <div className="p-4 space-y-3 select-none">
      <h1 className="text-sm font-black">Compare Top 2 Saved Items</h1>
      <div className="grid grid-cols-2 gap-2.5">
        {displayList.slice(0, 2).map((p) => (
          <div
            key={p.id}
            className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-2 text-center"
          >
            <img src={p.image} alt="" className="w-full h-24 object-cover rounded-xl" />
            <div className="text-xs font-extrabold truncate">{p.title}</div>
            <div className="text-sm font-black" style={{ color: primaryColor }}>
              ${p.price}
            </div>
            <div className="text-[10px] text-amber-500 font-bold">★ {p.rating} Rating</div>
            <div className="text-[10px] text-emerald-500 font-bold">{p.stockStatus}</div>
            <button
              type="button"
              onClick={() => triggerQuickAdd(p.id)}
              className="w-full py-2 rounded-xl text-[10px] font-extrabold text-white cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              Choose Winner
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
