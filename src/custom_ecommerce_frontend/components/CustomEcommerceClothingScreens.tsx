import React, { useState } from 'react';
import {
  Sparkles,
  ShoppingBag,
  Check,
  BellRing,
  Camera,
  SlidersHorizontal,
  Heart,
  Star,
  ArrowRight,
  ChevronRight,
  Layers,
  Award,
} from 'lucide-react';
import {
  CustomEcommerceScreenId,
  CustomEcommerceVariantId,
  CUSTOM_ECOMMERCE_PRODUCTS,
} from '../data/customEcommerceRegistry';

interface ClothingScreensProps {
  screenId: CustomEcommerceScreenId;
  variant: CustomEcommerceVariantId;
  primaryColor: string;
  isDark: boolean;
  onNavigate: (target: CustomEcommerceScreenId) => void;
  onAddToCart: (productId: string) => void;
}

export const CustomEcommerceClothingScreens: React.FC<ClothingScreensProps> = ({
  screenId,
  variant,
  primaryColor,
  isDark,
  onNavigate,
  onAddToCart,
}) => {
  const [unit, setUnit] = useState<'CM' | 'IN'>('CM');
  const [heightCm, setHeightCm] = useState(176);
  const [weightKg, setWeightKg] = useState(72);
  const [selectedColor, setSelectedColor] = useState<'Obsidian' | 'Sage' | 'Terracotta'>('Obsidian');
  const [selectedSize, setSelectedSize] = useState<'XS' | 'S' | 'M' | 'L' | 'XL'>('M');
  const [reviewerSizeFilter, setReviewerSizeFilter] = useState<'ALL' | 'S' | 'M' | 'L'>('ALL');
  const [restockNotified, setRestockNotified] = useState(false);

  // ============================================================================
  // 19. SIZE GUIDE & FIT MODAL — 6 DISTINCT APPAREL SIZING INTERFACES
  // ============================================================================
  if (screenId === 'ClothingSizeGuideModal') {
    const rows = [
      { size: 'S', chest: unit === 'CM' ? '92–96' : '36–38', waist: unit === 'CM' ? '76–80' : '30–31', len: unit === 'CM' ? '69' : '27.1' },
      { size: 'M', chest: unit === 'CM' ? '97–102' : '38–40', waist: unit === 'CM' ? '81–86' : '32–34', len: unit === 'CM' ? '71' : '28.0' },
      { size: 'L', chest: unit === 'CM' ? '103–108' : '41–43', waist: unit === 'CM' ? '87–92' : '34–36', len: unit === 'CM' ? '73' : '28.7' },
      { size: 'XL', chest: unit === 'CM' ? '109–114' : '43–45', waist: unit === 'CM' ? '93–99' : '36–39', len: unit === 'CM' ? '75' : '29.5' },
    ];

    // V1: INTERACTIVE CM/INCH SIZE TABLE + HOW TO MEASURE INSTRUCTIONS
    if (variant === 'varient_1') {
      return (
        <div className="p-4 space-y-4 select-none">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase opacity-60">APPAREL FIT GUIDE · V1</span>
              <h1 className="text-base font-black">Dynamic Size Chart</h1>
            </div>
            <div className="flex bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl text-[10px] font-extrabold">
              {(['CM', 'IN'] as const).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUnit(u)}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer ${
                    unit === u ? 'text-white shadow-xs' : 'opacity-65'
                  }`}
                  style={unit === u ? { backgroundColor: primaryColor } : undefined}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-neutral-100 dark:bg-neutral-800 p-2.5 font-black text-[11px]">
              <span>Size</span>
              <span>Chest ({unit})</span>
              <span>Waist ({unit})</span>
              <span>Length</span>
            </div>
            {rows.map((r) => (
              <div
                key={r.size}
                onClick={() => setSelectedSize(r.size as any)}
                className={`grid grid-cols-4 p-2.5 border-t border-neutral-200 dark:border-neutral-800 cursor-pointer ${
                  selectedSize === r.size ? 'font-black bg-indigo-500/10' : ''
                }`}
              >
                <span style={selectedSize === r.size ? { color: primaryColor } : undefined}>
                  {r.size} {selectedSize === r.size && '✓'}
                </span>
                <span>{r.chest}</span>
                <span>{r.waist}</span>
                <span>{r.len}</span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-900 space-y-1.5 text-[11px]">
            <div className="font-extrabold">📏 How to Measure Properly:</div>
            <div className="opacity-75">• Chest: Measure around the fullest part under arms.</div>
            <div className="opacity-75">• Waist: Measure around natural waistline relaxed.</div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('ClothingVariantSelectorPdp')}
            className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            Select Size {selectedSize} &amp; Return to Product →
          </button>
        </div>
      );
    }

    // V2: BENTO BODY HEIGHT/WEIGHT AI FIT PREDICTOR
    if (variant === 'varient_2') {
      const predicted = weightKg > 80 ? 'L' : weightKg > 66 ? 'M' : 'S';
      return (
        <div className="p-4 space-y-3.5 select-none">
          <h1 className="text-base font-black">Bento Smart Fit Calculator</h1>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-3xl border border-neutral-200 dark:border-neutral-800 space-y-1">
              <div className="text-[10px] opacity-60 font-bold">YOUR HEIGHT</div>
              <div className="text-lg font-black" style={{ color: primaryColor }}>
                {heightCm} cm
              </div>
              <input
                type="range"
                min={155}
                max={195}
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full"
                style={{ accentColor: primaryColor }}
              />
            </div>
            <div className="p-3 rounded-3xl border border-neutral-200 dark:border-neutral-800 space-y-1">
              <div className="text-[10px] opacity-60 font-bold">YOUR WEIGHT</div>
              <div className="text-lg font-black" style={{ color: primaryColor }}>
                {weightKg} kg
              </div>
              <input
                type="range"
                min={48}
                max={105}
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full"
                style={{ accentColor: primaryColor }}
              />
            </div>
          </div>

          <div
            className="p-4 rounded-3xl text-white flex items-center justify-between"
            style={{ backgroundColor: primaryColor }}
          >
            <div>
              <div className="text-[10px] uppercase opacity-80">96% Match Confidence</div>
              <div className="text-base font-black">Recommended Size: {predicted}</div>
              <div className="text-[10px] opacity-85">Zero-return guarantee applied</div>
            </div>
            <span className="text-2xl font-black bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center">
              {predicted}
            </span>
          </div>
        </div>
      );
    }

    // V3: BRUTALIST TAILORING SPEC BLUEPRINT
    if (variant === 'varient_3') {
      return (
        <div className="p-4 space-y-3 font-mono select-none">
          <div className="border-2 border-current p-2 bg-amber-300 text-black font-black text-xs">
            GARMENT_BLUEPRINT // SPEC_TOLERANCE ±0.5CM
          </div>
          <div className="border-2 border-current p-3 bg-white dark:bg-neutral-900 space-y-2 text-xs">
            <div>CUT_PROFILE: RELAXED_BOXY_SHOULDER</div>
            <div>FABRIC_SHRINKAGE: PRE-SHRUNK 0%</div>
            <div>MODEL_REF: 183CM // WEARING_SIZE_L</div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('ClothingVariantSelectorPdp')}
            className="w-full py-3 border-2 border-black bg-black text-[#FDE047] font-black text-xs uppercase cursor-pointer"
          >
            [ LOCK_MEASUREMENT ]
          </button>
        </div>
      );
    }

    // V4: DRAPE & SILHOUETTE OVERLAY (SLIM VS REGULAR VS OVERSIZED)
    if (variant === 'varient_4') {
      return (
        <div className="p-4 space-y-3.5 select-none">
          <h1 className="text-base font-black">Compare Drape &amp; Silhouette</h1>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { size: 'S', fit: 'Tailored Slim', desc: 'Snug chest & sleeves' },
              { size: 'M', fit: 'True Regular', desc: 'intended studio drape' },
              { size: 'L', fit: 'Street Oversized', desc: 'Dropped shoulder look' },
            ].map((card) => (
              <div
                key={card.size}
                onClick={() => setSelectedSize(card.size as any)}
                className={`p-3 rounded-2xl border cursor-pointer space-y-1 ${
                  selectedSize === card.size ? 'border-2 bg-indigo-500/10' : 'border-neutral-200 dark:border-neutral-800'
                }`}
                style={selectedSize === card.size ? { borderColor: primaryColor } : undefined}
              >
                <div className="text-base font-black">{card.size}</div>
                <div className="text-[11px] font-extrabold">{card.fit}</div>
                <div className="text-[9px] opacity-65">{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // V5: BRAND-TO-BRAND SIZE EQUIVALENCE CONVERTER
    if (variant === 'varient_5') {
      return (
        <div className="p-4 space-y-3.5 select-none">
          <div className="border-l-4 pl-3" style={{ borderColor: primaryColor }}>
            <div className="text-[10px] font-mono uppercase opacity-60">CROSS-BRAND MATCHER</div>
            <h2 className="text-base font-black">Match With Brands You Own</h2>
          </div>
          {[
            ['If you wear M in Nike', 'Pick Size M (Exact Match)'],
            ['If you wear L in Zara', 'Pick Size M (Relaxed Cut)'],
            ['If you wear M in Uniqlo', 'Pick Size S (Asian Fit)'],
          ].map(([brand, rec]) => (
            <div
              key={brand}
              className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs"
            >
              <span className="font-bold">{brand}</span>
              <span className="font-black text-emerald-500">{rec}</span>
            </div>
          ))}
        </div>
      );
    }

    // V6: COMPACT FREE SIZE-EXCHANGE GUARANTEE SHEET
    return (
      <div className="p-4 space-y-3.5 select-none">
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
          <div className="text-xs font-black text-emerald-500">✓ Free Instant Doorstep Size Swap</div>
          <div className="text-[11px] opacity-75">
            If your size doesn&apos;t fit, our courier brings the next size to your door within 24 hours free.
          </div>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('ClothingVariantSelectorPdp')}
          className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
          style={{ backgroundColor: primaryColor }}
        >
          Confirm Size {selectedSize} Risk-Free →
        </button>
      </div>
    );
  }

  // ============================================================================
  // 20. LOOKBOOK / "SHOP THE LOOK" — 6 DISTINCT EDITORIAL OUTFIT FEEDS
  // ============================================================================
  if (screenId === 'ClothingLookbookShopTheLook') {
    // V1: FULL-SCREEN MODEL FEED + INTERACTIVE HOTSPOT TAGS TO BUY INDIVIDUAL ITEMS
    if (variant === 'varient_1') {
      return (
        <div className="p-4 space-y-3.5 select-none">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-base font-black">Lookbook · Shop the Look (V1)</h1>
              <p className="text-[11px] opacity-65">Tap tags on the model to buy individual pieces</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800">
              LOOK #04
            </span>
          </div>

          <div className="relative h-72 rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
            <img
              src={CUSTOM_ECOMMERCE_PRODUCTS[5].image}
              alt="Model Outfit"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

            {/* Interactive Outfit Item Hotspot Tags */}
            <button
              type="button"
              onClick={() => onAddToCart('prod_6')}
              className="absolute top-12 left-5 px-2.5 py-1.5 rounded-xl bg-white/95 text-slate-900 text-[10px] font-black shadow-xl flex items-center gap-1.5 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Italian Pebbled Tote · $189 (+Bag)</span>
            </button>

            <button
              type="button"
              onClick={() => onAddToCart('prod_2')}
              className="absolute top-36 right-4 px-2.5 py-1.5 rounded-xl bg-white/95 text-slate-900 text-[10px] font-black shadow-xl flex items-center gap-1.5 cursor-pointer"
            >
              <span>Chrono Leather Watch · $165 (+Bag)</span>
            </button>

            <button
              type="button"
              onClick={() => onAddToCart('prod_3')}
              className="absolute bottom-14 left-6 px-2.5 py-1.5 rounded-xl bg-white/95 text-slate-900 text-[10px] font-black shadow-xl flex items-center gap-1.5 cursor-pointer"
            >
              <span>AeroKnit Sneakers · $129 (+Bag)</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              onAddToCart('prod_6');
              onAddToCart('prod_2');
              onAddToCart('prod_3');
              onNavigate('ShoppingCart');
            }}
            className="w-full py-3 rounded-xl text-xs font-extrabold text-white shadow-md cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            Buy Complete 3-Piece Outfit ($440 · Save $43) →
          </button>
        </div>
      );
    }

    // V2: BENTO SPLIT OUTFIT COLLAGE + INDIVIDUAL PIECE CARDS
    if (variant === 'varient_2') {
      return (
        <div className="p-4 space-y-3 select-none">
          <h1 className="text-base font-black">Bento Outfit Deconstruction</h1>
          <div className="grid grid-cols-12 gap-2.5">
            <img
              src={CUSTOM_ECOMMERCE_PRODUCTS[5].image}
              alt=""
              className="col-span-6 h-48 w-full object-cover rounded-3xl"
            />
            <div className="col-span-6 space-y-2">
              {CUSTOM_ECOMMERCE_PRODUCTS.slice(1, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onAddToCart(item.id)}
                  className="p-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="text-[11px] font-extrabold truncate">{item.title}</div>
                    <div className="text-xs font-black" style={{ color: primaryColor }}>
                      ${item.price}
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded bg-black text-white text-[10px] font-bold">+</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // V3: BRUTALIST STREETWEAR ZINE EDITORIAL
    if (variant === 'varient_3') {
      return (
        <div className="p-4 space-y-3 font-mono select-none">
          <div className="border-2 border-current p-2 bg-amber-300 text-black font-black text-xs">
            LOOKBOOK_ZINE // AUTUMN_DROP_03
          </div>
          <div className="border-2 border-current p-3 bg-white dark:bg-neutral-900 shadow-[4px_4px_0px_currentColor] space-y-2">
            <img src={CUSTOM_ECOMMERCE_PRODUCTS[2].image} alt="" className="w-full h-36 object-cover border-2 border-current" />
            <div className="text-xs font-black">ENSEMBLE_TOTAL: $483.00 [3 PIECES]</div>
          </div>
        </div>
      );
    }

    // V4: VERTICAL REELS RUNWAY WITH BOTTOM ITEM DRAWER
    if (variant === 'varient_4') {
      return (
        <div className="h-full relative overflow-hidden flex flex-col justify-end p-4 text-white select-none">
          <img src={CUSTOM_ECOMMERCE_PRODUCTS[5].image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="relative z-10 p-3.5 rounded-3xl bg-black/70 backdrop-blur-md border border-white/20 space-y-2">
            <div className="text-xs font-black">Worn in this Runway Clip (2 Items)</div>
            <button
              type="button"
              onClick={() => onNavigate('ShoppingCart')}
              className="w-full py-2.5 rounded-xl bg-white text-black text-xs font-black cursor-pointer"
            >
              Add Entire Runway Look to Bag
            </button>
          </div>
        </div>
      );
    }

    // V5: STYLIST MIX-AND-MATCH CAPSULE COMBINATOR
    if (variant === 'varient_5') {
      return (
        <div className="p-4 space-y-3 select-none">
          <h1 className="text-base font-black">Mix &amp; Match Capsule Builder</h1>
          <div className="grid grid-cols-2 gap-2.5">
            {CUSTOM_ECOMMERCE_PRODUCTS.slice(1, 5).map((p) => (
              <div key={p.id} className="p-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-1">
                <img src={p.image} alt="" className="w-full h-20 object-cover rounded-xl" />
                <div className="text-[11px] font-bold truncate">{p.title}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // V6: DAY-TO-NIGHT OUTFIT MOOD SWITCHER
    return (
      <div className="p-4 space-y-3 select-none">
        <h1 className="text-base font-black">Day Office vs Evening Gala Look</h1>
        <div className="p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-2">
          <div className="text-xs font-bold">Curated 4-Piece Transitional Set</div>
          <button
            type="button"
            onClick={() => onNavigate('ShoppingCart')}
            className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            Shop Transitional Set →
          </button>
        </div>
      </div>
    );
  }

  // ============================================================================
  // 21. APPAREL VARIANT SELECTOR (COLOR SWATCHES + AUTO-DISABLE OOS SIZES)
  // ============================================================================
  if (screenId === 'ClothingVariantSelectorPdp') {
    const outOfStockMap: Record<string, string[]> = {
      Obsidian: ['XS', 'XL'],
      Sage: ['S'],
      Terracotta: ['L', 'XL'],
    };
    const disabledSizes = outOfStockMap[selectedColor] || [];

    // V1: VISUAL COLOR SWATCHES + PILL SIZES (AUTO-DISABLING OUT-OF-STOCK COMBINATIONS)
    if (variant === 'varient_1') {
      return (
        <div className="p-4 space-y-4 select-none">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-base font-black">Variant Selector (V1)</h1>
              <p className="text-[11px] opacity-65">Auto-disables out-of-stock Color × Size combos</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('ClothingSizeGuideModal')}
              className="text-xs font-bold underline cursor-pointer"
              style={{ color: primaryColor }}
            >
              📏 Size Guide
            </button>
          </div>

          <div className="flex gap-3 p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800">
            <img
              src={CUSTOM_ECOMMERCE_PRODUCTS[5].image}
              alt=""
              className="w-20 h-24 rounded-xl object-cover"
            />
            <div className="space-y-1">
              <div className="text-xs font-black">Merino Wool Tailored Overshirt</div>
              <div className="text-lg font-black" style={{ color: primaryColor }}>
                $189.00
              </div>
              <div className="text-[11px] font-bold text-emerald-500">
                Selected: {selectedColor} · Size {selectedSize}
              </div>
            </div>
          </div>

          {/* Visual Color Swatches */}
          <div className="space-y-2">
            <div className="text-xs font-extrabold">1. Choose Fabric Colorway: {selectedColor}</div>
            <div className="flex gap-3">
              {[
                { name: 'Obsidian', hex: '#18181B' },
                { name: 'Sage', hex: '#059669' },
                { name: 'Terracotta', hex: '#E11D48' },
              ].map((sw) => (
                <button
                  key={sw.name}
                  type="button"
                  onClick={() => {
                    setSelectedColor(sw.name as any);
                    if (outOfStockMap[sw.name]?.includes(selectedSize)) {
                      setSelectedSize('M');
                    }
                  }}
                  className={`px-3 py-2 rounded-xl border flex items-center gap-2 text-xs font-bold cursor-pointer ${
                    selectedColor === sw.name ? 'ring-2' : 'opacity-75'
                  }`}
                  style={selectedColor === sw.name ? { borderColor: primaryColor } : undefined}
                >
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: sw.hex }} />
                  <span>{sw.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Pill Buttons with Automatic OOS Disable */}
          <div className="space-y-2">
            <div className="text-xs font-extrabold">2. Select Size (Crossed-out = Out of Stock)</div>
            <div className="grid grid-cols-5 gap-2">
              {(['XS', 'S', 'M', 'L', 'XL'] as const).map((sz) => {
                const isOos = disabledSizes.includes(sz);
                const active = selectedSize === sz && !isOos;
                return (
                  <button
                    key={sz}
                    type="button"
                    disabled={isOos}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2.5 rounded-xl border text-xs font-black transition ${
                      isOos
                        ? 'opacity-35 line-through cursor-not-allowed bg-neutral-100 dark:bg-neutral-900'
                        : active
                        ? 'text-white border-transparent cursor-pointer shadow-sm'
                        : 'cursor-pointer hover:border-current'
                    }`}
                    style={active ? { backgroundColor: primaryColor } : undefined}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onAddToCart('prod_6');
              onNavigate('ShoppingCart');
            }}
            className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            Add {selectedColor} ({selectedSize}) to Bag →
          </button>
        </div>
      );
    }

    // V2–V6 DISTINCT VARIANT SELECTORS
    return (
      <div className="p-4 space-y-3.5 select-none">
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-black">
            {variant === 'varient_2'
              ? 'Bento Fabric Macro Zoom & Stock Matrix'
              : variant === 'varient_3'
              ? 'Brutalist Color × Size SKU Grid'
              : variant === 'varient_4'
              ? 'Atelier Custom Monogram & Sleeve Length'
              : variant === 'varient_5'
              ? 'Build Your 3-Pack Color Bundle (Save 20%)'
              : 'Out-of-Stock Restock Push Alert Sheet'}
          </h1>
        </div>

        <div className="p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-2.5">
          <div className="text-xs font-bold">
            Active Combination: <span style={{ color: primaryColor }}>{selectedColor} / {selectedSize}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>Notify me when sold-out sizes restock</span>
            <button
              type="button"
              onClick={() => setRestockNotified((n) => !n)}
              className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white text-[10px] font-black cursor-pointer"
            >
              {restockNotified ? 'Alert Active ✓' : 'Notify Me'}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('ShoppingCart')}
          className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
          style={{ backgroundColor: primaryColor }}
        >
          Confirm Variant Selection →
        </button>
      </div>
    );
  }

  // ============================================================================
  // 22. REVIEW PHOTO GALLERY (WORN ON-BODY USER PHOTOS) — 6 DISTINCT GALLERIES
  // ============================================================================
  const customerPhotos = [
    { user: '@nadia.k', size: 'S', height: '165cm', fit: 'True to Size', img: CUSTOM_ECOMMERCE_PRODUCTS[5].image },
    { user: '@rafi.style', size: 'M', height: '178cm', fit: 'Slightly Relaxed', img: CUSTOM_ECOMMERCE_PRODUCTS[2].image },
    { user: '@zara.dhk', size: 'L', height: '182cm', fit: 'Oversized Fit', img: CUSTOM_ECOMMERCE_PRODUCTS[1].image },
    { user: '@tanvir.m', size: 'M', height: '175cm', fit: 'True to Size', img: CUSTOM_ECOMMERCE_PRODUCTS[0].image },
  ];
  const filteredPhotos = customerPhotos.filter(
    (p) => reviewerSizeFilter === 'ALL' || p.size === reviewerSizeFilter
  );

  return (
    <div className="p-4 space-y-3.5 select-none">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-black">Worn By Customers Gallery ({variant.replace('varient_', 'V')})</h1>
          <p className="text-[11px] opacity-65">Real buyer photos filtered by height &amp; size worn</p>
        </div>
        <span className="p-2 rounded-xl text-white" style={{ backgroundColor: primaryColor }}>
          <Camera size={14} />
        </span>
      </div>

      {/* Filter by Reviewer Worn Size */}
      <div className="flex items-center gap-1.5">
        {(['ALL', 'S', 'M', 'L'] as const).map((sz) => (
          <button
            key={sz}
            type="button"
            onClick={() => setReviewerSizeFilter(sz)}
            className={`px-3 py-1 rounded-full text-[11px] font-extrabold border cursor-pointer ${
              reviewerSizeFilter === sz ? 'text-white border-transparent' : 'border-neutral-200 dark:border-neutral-800'
            }`}
            style={reviewerSizeFilter === sz ? { backgroundColor: primaryColor } : undefined}
          >
            {sz === 'ALL' ? 'All Sizes (148)' : `Worn Size ${sz}`}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {filteredPhotos.map((item) => (
          <div
            key={item.user}
            onClick={() => onNavigate('ClothingVariantSelectorPdp')}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-900 cursor-pointer"
          >
            <div className="relative h-32">
              <img src={item.img} alt={item.user} className="w-full h-full object-cover" />
              <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/75 text-white text-[9px] font-bold">
                Size {item.size} · {item.height}
              </span>
            </div>
            <div className="p-2 flex items-center justify-between text-[10px]">
              <span className="font-extrabold">{item.user}</span>
              <span className="text-emerald-500 font-bold">{item.fit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
