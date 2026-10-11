import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Flame,
  Star,
  Plus,
  Heart,
  ChevronRight,
  Sparkles,
  Check,
  X,
  ArrowUpDown,
  Camera,
  Mic,
  QrCode,
  Play,
  Zap,
  Award,
} from 'lucide-react';
import {
  CustomEcommerceScreenId,
  CustomEcommerceVariantId,
  CUSTOM_ECOMMERCE_PRODUCTS,
} from '../data/customEcommerceRegistry';

interface DiscoveryScreensProps {
  screenId: CustomEcommerceScreenId;
  variant: CustomEcommerceVariantId;
  primaryColor: string;
  isDark: boolean;
  onNavigate: (target: CustomEcommerceScreenId) => void;
  onAddToCart: (productId: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  componentOrder?: string[];
  hiddenComponentIds?: string[];
}

export const CustomEcommerceDiscoveryScreens: React.FC<DiscoveryScreensProps> = ({
  screenId,
  variant,
  primaryColor,
  isDark,
  onNavigate,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  componentOrder = [
    'hero_banner',
    'category_list',
    'flash_deals',
    'product_grid',
    'brand_spotlight',
    'reviews_ugc',
  ],
  hiddenComponentIds = [],
}) => {
  const [searchQuery, setSearchQuery] = useState('Wireless ANC');
  const [recentSearches, setRecentSearches] = useState([
    'Sony WH-1000XM5',
    'Running Sneakers',
    'Vitamin C Serum',
    'Leather Watch',
  ]);
  const [maxPrice, setMaxPrice] = useState(320);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(['Sony Official', 'Nordic Time']);
  const [sortBy, setSortBy] = useState<'popular' | 'price_asc' | 'price_desc' | 'rating'>('popular');
  const [activeParentCategory, setActiveParentCategory] = useState('Electronics & Audio');
  const [selectedColorSwatch, setSelectedColorSwatch] = useState('#18181B');
  const [inStockOnly, setInStockOnly] = useState(true);
  const [deckIndex, setDeckIndex] = useState(0);

  // ============================================================================
  // 5. HOME DASHBOARD — 6 COMPLETELY DIFFERENT ARCHITECTURES + DYNAMIC DRAG-AND-DROP COMPONENT REORDERING
  // ============================================================================
  if (screenId === 'HomeDashboard') {
    const visibleOrder = componentOrder.filter((id) => !hiddenComponentIds.includes(id));

    // V1: KEEP ORIGINAL + DYNAMICALLY REORDERABLE SECTIONS
    if (variant === 'varient_1') {
      const sectionsMap: Record<string, React.ReactNode> = {
        hero_banner: (
          <div
            key="hero_banner"
            className="p-4 rounded-2xl relative overflow-hidden text-white"
            style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, #1E1B4B 100%)` }}
          >
            <div className="relative z-10 max-w-[210px] space-y-1.5">
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-extrabold uppercase">
                ⚡ Mega Flash Festival
              </span>
              <h2 className="text-lg font-black leading-tight">
                Up to 45% OFF Flagship Tech &amp; Apparel
              </h2>
              <button
                type="button"
                onClick={() => onNavigate('ProductListingPage')}
                className="mt-1 px-3 py-1.5 rounded-lg bg-white text-neutral-900 text-[11px] font-extrabold inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Shop Deals</span>
                <ChevronRight size={12} />
              </button>
            </div>
            <img
              src={CUSTOM_ECOMMERCE_PRODUCTS[0].image}
              alt="Promo"
              className="w-24 h-24 object-cover rounded-xl absolute right-3 bottom-3 border-2 border-white/25"
            />
          </div>
        ),
        category_list: (
          <div key="category_list" className="grid grid-cols-4 gap-2">
            {[
              { name: 'Audio', emoji: '🎧' },
              { name: 'Watches', emoji: '⌚' },
              { name: 'Sneakers', emoji: '👟' },
              { name: 'Skincare', emoji: '✨' },
            ].map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => onNavigate('CategoryNavigation')}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-2.5 flex flex-col items-center gap-1 cursor-pointer"
              >
                <span className="text-lg">{cat.emoji}</span>
                <span className="text-[10px] font-extrabold">{cat.name}</span>
              </button>
            ))}
          </div>
        ),
        flash_deals: (
          <div
            key="flash_deals"
            onClick={() => onNavigate('ProductListingPage')}
            className="p-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Flame size={15} className="text-amber-500" />
              <div>
                <div className="text-[11px] font-black">Flash Sale Live Now</div>
                <div className="text-[9px] opacity-70">Ends in 02h : 41m : 19s</div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-amber-500 text-black text-[9px] font-black">
              VIEW ALL
            </span>
          </div>
        ),
        product_grid: (
          <div key="product_grid" className="grid grid-cols-2 gap-2.5">
            {CUSTOM_ECOMMERCE_PRODUCTS.slice(0, 4).map((prod) => (
              <div
                key={prod.id}
                onClick={() => onNavigate('ProductDetailPage')}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-2.5 space-y-2 cursor-pointer"
              >
                <img src={prod.image} alt={prod.title} className="w-full h-24 object-cover rounded-xl" />
                <div className="text-xs font-extrabold truncate">{prod.title}</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black" style={{ color: primaryColor }}>
                    ${prod.price}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(prod.id);
                    }}
                    className="w-6 h-6 rounded-lg text-white flex items-center justify-center"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ),
        brand_spotlight: (
          <div
            key="brand_spotlight"
            className="p-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-between text-[10px] font-bold"
          >
            <span className="flex items-center gap-1.5">
              <Award size={13} style={{ color: primaryColor }} />
              <span>100% Official Brand Mall · Free Express Return</span>
            </span>
            <ChevronRight size={12} />
          </div>
        ),
        reviews_ugc: (
          <div
            key="reviews_ugc"
            onClick={() => onNavigate('ClothingReviewPhotoGallery')}
            className="p-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Star size={13} className="text-amber-400 fill-amber-400" />
              <span className="text-[10px] font-extrabold">4.9/5 Verified Buyer Lookbook (2.4k Photos)</span>
            </div>
            <ChevronRight size={12} />
          </div>
        ),
      };

      return (
        <div className="p-4 space-y-3.5 select-none">
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-60">
                Deliver to Gulshan 2, Dhaka
              </span>
              <h1 className="text-base font-black tracking-tight">NovaCart Discovery</h1>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onNavigate('GlobalSearchResults')}
                className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 cursor-pointer"
              >
                <Search size={15} />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('AdvancedFilterSheet')}
                className="p-2 rounded-xl text-white cursor-pointer"
                style={{ backgroundColor: primaryColor }}
              >
                <SlidersHorizontal size={15} />
              </button>
            </div>
          </div>

          {visibleOrder.map((compId) => sectionsMap[compId])}
        </div>
      );
    }

    // V2: BENTO MODULAR WIDGET HOME (WALLET PILL + LIVE COURIER TRACKER + ASYMMETRIC BENTO DEALS)
    if (variant === 'varient_2') {
      return (
        <div className="p-4 space-y-3 select-none">
          {/* Top Wallet & Loyalty Pill Bar */}
          <div className="grid grid-cols-2 gap-2">
            <div
              onClick={() => onNavigate('UserProfileWallet')}
              className="p-2.5 rounded-2xl text-white flex items-center justify-between cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <div>
                <div className="text-[9px] uppercase opacity-80">NovaPay Balance</div>
                <div className="text-sm font-black">$145.50</div>
              </div>
              <Sparkles size={16} />
            </div>
            <div
              onClick={() => onNavigate('OrderHistoryTracking')}
              className="p-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-between cursor-pointer"
            >
              <div>
                <div className="text-[9px] uppercase font-bold text-emerald-500">Order #94820</div>
                <div className="text-xs font-black">Arriving 18m</div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            </div>
          </div>

          {/* Bento Asymmetric Product Mosaic */}
          <div className="grid grid-cols-12 gap-2.5">
            <div
              onClick={() => onNavigate('ProductDetailPage')}
              className="col-span-7 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3 flex flex-col justify-between cursor-pointer"
            >
              <span className="px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-500 text-[9px] font-black w-fit">
                HERO DROP -25%
              </span>
              <img
                src={CUSTOM_ECOMMERCE_PRODUCTS[0].image}
                alt=""
                className="w-full h-28 object-cover rounded-2xl my-2"
              />
              <div className="text-xs font-extrabold truncate">{CUSTOM_ECOMMERCE_PRODUCTS[0].title}</div>
              <div className="text-sm font-black" style={{ color: primaryColor }}>
                $298.00
              </div>
            </div>

            <div className="col-span-5 flex flex-col gap-2.5">
              {CUSTOM_ECOMMERCE_PRODUCTS.slice(1, 3).map((p) => (
                <div
                  key={p.id}
                  onClick={() => onNavigate('ProductDetailPage')}
                  className="flex-1 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-2.5 flex flex-col justify-between cursor-pointer"
                >
                  <img src={p.image} alt="" className="w-full h-14 object-cover rounded-xl" />
                  <div className="text-[10px] font-extrabold truncate mt-1">{p.title}</div>
                  <div className="text-xs font-black" style={{ color: primaryColor }}>
                    ${p.price}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('GlobalSearchResults')}
            className="w-full py-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-center gap-2 text-xs font-bold cursor-pointer"
          >
            <Search size={13} />
            <span>Search 50,000+ Bento Items...</span>
          </button>
        </div>
      );
    }

    // V3: BRUTALIST STREETWEAR HYPE DROP FEED WITH LIVE STOCK TICKER
    if (variant === 'varient_3') {
      return (
        <div className="p-3.5 space-y-3 font-mono select-none">
          <div className="border-2 border-current bg-amber-300 text-black p-2 text-[10px] font-black flex items-center justify-between">
            <span>🔥 LIVE DROP // ARCHIVE_2026</span>
            <span>SELLING FAST</span>
          </div>

          {CUSTOM_ECOMMERCE_PRODUCTS.slice(0, 3).map((prod, idx) => (
            <div
              key={prod.id}
              onClick={() => onNavigate('ProductDetailPage')}
              className="border-2 border-current bg-white dark:bg-neutral-900 p-3 shadow-[4px_4px_0px_currentColor] space-y-2 cursor-pointer"
            >
              <div className="flex items-center justify-between text-[10px] font-black">
                <span className="bg-black text-white px-1.5 py-0.5">LOT #0{idx + 1}</span>
                <span className="text-rose-600">{prod.stockStatus.toUpperCase()}</span>
              </div>
              <img
                src={prod.image}
                alt={prod.title}
                className="w-full h-32 object-cover border-2 border-current"
              />
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1 pr-2">
                  <div className="text-xs font-black uppercase truncate">{prod.title}</div>
                  <div className="text-sm font-black">${prod.price}.00</div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(prod.id);
                  }}
                  className="px-3 py-2 border-2 border-black bg-[#FDE047] text-black text-[10px] font-black uppercase shadow-[2px_2px_0px_#000]"
                >
                  + COP NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // V4: LUXURY EDITORIAL LOOKBOOK MAGAZINE WITH SHOP-THE-LOOK HOTSPOTS
    if (variant === 'varient_4') {
      return (
        <div className="p-4 space-y-4 select-none">
          <div className="text-center border-b border-neutral-200 dark:border-neutral-800 pb-2.5">
            <div className="text-[9px] font-mono uppercase tracking-[0.3em] opacity-60">
              ISSUE NO. 14 · CURATED RUNWAY
            </div>
            <h1 className="text-xl font-serif font-light tracking-wide">The Autumn Edit</h1>
          </div>

          {/* Interactive Shop-the-Look Portrait */}
          <div className="relative h-64 rounded-2xl overflow-hidden">
            <img
              src={CUSTOM_ECOMMERCE_PRODUCTS[5].image}
              alt="Lookbook"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Interactive Hotspot Pins */}
            <button
              type="button"
              onClick={() => onNavigate('ProductDetailPage')}
              className="absolute top-1/3 left-1/3 px-2.5 py-1 rounded-full bg-white/95 text-slate-900 text-[10px] font-black shadow-xl flex items-center gap-1 cursor-pointer animate-pulse"
            >
              <span>● Italian Tote · $189</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('ProductDetailPage')}
              className="absolute bottom-14 right-6 px-2.5 py-1 rounded-full bg-white/95 text-slate-900 text-[10px] font-black shadow-xl flex items-center gap-1 cursor-pointer"
            >
              <span>● Chrono Watch · $165</span>
            </button>

            <div className="absolute bottom-3 left-3 text-white">
              <div className="text-xs font-bold">Tap any pin to inspect piece</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {CUSTOM_ECOMMERCE_PRODUCTS.slice(1, 3).map((p) => (
              <div
                key={p.id}
                onClick={() => onNavigate('ProductDetailPage')}
                className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-center gap-2.5 cursor-pointer"
              >
                <img src={p.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                <div className="min-w-0">
                  <div className="text-[11px] font-bold truncate">{p.brand}</div>
                  <div className="text-xs font-black">${p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // V5: SUPER-APP HIGH-DENSITY MART (8 MINI SERVICE ICONS + HOURLY LIGHTNING SLOTS)
    if (variant === 'varient_5') {
      return (
        <div className="p-3.5 space-y-3 select-none">
          {/* Search + Scan QR Top Bar */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('GlobalSearchResults')}
              className="flex-1 px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-left text-xs opacity-75 flex items-center gap-2 cursor-pointer"
            >
              <Search size={13} />
              <span>Search SuperMart...</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('CategoryNavigation')}
              className="p-2 rounded-xl text-white cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <QrCode size={15} />
            </button>
          </div>

          {/* 8 Mini Service Icons Grid */}
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { l: '15m Mart', e: '⚡' },
              { l: 'Tech Mall', e: '🎧' },
              { l: 'Beauty', e: '💄' },
              { l: 'Fashion', e: '👕' },
              { l: 'Vouchers', e: '🎟️' },
              { l: 'Wholesale', e: '📦' },
              { l: 'Pay Bills', e: '💳' },
              { l: 'Rewards', e: '🏆' },
            ].map((ico) => (
              <button
                key={ico.l}
                type="button"
                onClick={() => onNavigate('CategoryNavigation')}
                className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col items-center gap-1 cursor-pointer"
              >
                <span className="text-base">{ico.e}</span>
                <span className="text-[9px] font-extrabold truncate w-full">{ico.l}</span>
              </button>
            ))}
          </div>

          {/* Hourly Lightning Deal Strip */}
          <div className="p-3 rounded-2xl border-2 border-amber-500/40 bg-amber-500/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-black">
              <span className="text-amber-600 dark:text-amber-400">⚡ 12:00 PM Lightning Slot</span>
              <span className="font-mono text-[10px]">88% Claimed</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {CUSTOM_ECOMMERCE_PRODUCTS.slice(0, 3).map((p) => (
                <div
                  key={p.id}
                  onClick={() => onNavigate('ProductDetailPage')}
                  className="bg-white dark:bg-neutral-900 p-1.5 rounded-xl text-center cursor-pointer"
                >
                  <img src={p.image} alt="" className="w-full h-14 object-cover rounded-lg" />
                  <div className="text-[11px] font-black mt-1" style={{ color: primaryColor }}>
                    ${p.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // V6: LIVE SHOPPABLE VIDEO STORIES + SWIPEABLE CURATED CARD DECK
    const currentCard = CUSTOM_ECOMMERCE_PRODUCTS[deckIndex % CUSTOM_ECOMMERCE_PRODUCTS.length];
    return (
      <div className="p-4 space-y-3.5 select-none">
        {/* Top Live Video Creator Stories */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {CUSTOM_ECOMMERCE_PRODUCTS.slice(0, 4).map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setDeckIndex(i)}
              className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer"
            >
              <div
                className="w-14 h-14 rounded-full p-0.5 border-2 relative"
                style={{ borderColor: primaryColor }}
              >
                <img src={p.image} alt="" className="w-full h-full rounded-full object-cover" />
                <span className="absolute -bottom-1 inset-x-2 bg-rose-600 text-white text-[8px] font-black rounded px-1">
                  LIVE
                </span>
              </div>
              <span className="text-[9px] font-bold truncate w-14">{p.brand.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Interactive Swipe Card Deck */}
        <div className="rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-3.5 space-y-3 shadow-lg">
          <div className="relative h-48 rounded-2xl overflow-hidden">
            <img src={currentCard.image} alt="" className="w-full h-full object-cover" />
            <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/70 text-white text-[10px] font-bold">
              Card {deckIndex + 1} of {CUSTOM_ECOMMERCE_PRODUCTS.length}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <div className="text-xs font-black truncate">{currentCard.title}</div>
              <div className="text-sm font-black" style={{ color: primaryColor }}>
                ${currentCard.price}.00
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setDeckIndex((d) => d + 1)}
              className="py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-bold cursor-pointer"
            >
              ✕ Pass
            </button>
            <button
              type="button"
              onClick={() => onToggleWishlist(currentCard.id)}
              className="py-2.5 rounded-xl bg-rose-500/15 text-rose-500 text-xs font-extrabold cursor-pointer"
            >
              ♥ Save
            </button>
            <button
              type="button"
              onClick={() => {
                onAddToCart(currentCard.id);
                onNavigate('ShoppingCart');
              }}
              className="py-2.5 rounded-xl text-white text-xs font-extrabold cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              + Bag
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // 6. GLOBAL SEARCH & RESULTS — 6 DISTINCT SEARCH EXPERIENCES
  // ============================================================================
  if (screenId === 'GlobalSearchResults') {
    const filtered = CUSTOM_ECOMMERCE_PRODUCTS.filter(
      (p) =>
        !searchQuery.trim() ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const list = filtered.length > 0 ? filtered : CUSTOM_ECOMMERCE_PRODUCTS;

    // V1: KEEP ORIGINAL
    if (variant === 'varient_1') {
      return (
        <div className="p-4 space-y-4 select-none">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-3 opacity-50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-8 py-2 rounded-xl border-2 text-xs font-bold bg-transparent"
                style={{ borderColor: primaryColor }}
              />
            </div>
            <button
              type="button"
              onClick={() => onNavigate('AdvancedFilterSheet')}
              className="p-2.5 rounded-xl text-white cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <SlidersHorizontal size={15} />
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {recentSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setSearchQuery(term.split(' ')[0])}
                className="px-2.5 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 text-[11px] font-semibold cursor-pointer"
              >
                🕒 {term}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {list.slice(0, 4).map((p) => (
              <div
                key={p.id}
                onClick={() => onNavigate('ProductDetailPage')}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-2.5 space-y-1.5 cursor-pointer"
              >
                <img src={p.image} alt={p.title} className="w-full h-24 object-cover rounded-lg" />
                <div className="text-xs font-extrabold truncate">{p.title}</div>
                <span className="text-xs font-black" style={{ color: primaryColor }}>
                  ${p.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // V2: VISUAL AI CAMERA LENS + VOICE WAVEFORM SEARCH
    if (variant === 'varient_2') {
      return (
        <div className="p-4 space-y-3.5 select-none">
          <div className="grid grid-cols-2 gap-2.5">
            <div
              className="p-3.5 rounded-3xl text-white space-y-2 cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <Camera size={22} />
              <div className="text-xs font-black">Snap &amp; Find Lens</div>
              <div className="text-[10px] opacity-80">Upload photo to match product</div>
            </div>
            <div className="p-3.5 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-2">
              <Mic size={22} className="text-rose-500 animate-pulse" />
              <div className="text-xs font-black">Voice Search</div>
              <div className="text-[10px] opacity-65">&ldquo;Show Sony ANC under $300&rdquo;</div>
            </div>
          </div>

          <div className="text-xs font-extrabold">Visual Similar Matches</div>
          <div className="space-y-2">
            {list.slice(0, 3).map((p) => (
              <div
                key={p.id}
                onClick={() => onNavigate('ProductDetailPage')}
                className="p-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-center gap-3 cursor-pointer"
              >
                <img src={p.image} alt="" className="w-14 h-14 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-bold text-emerald-500">98% Visual Match</span>
                  <div className="text-xs font-extrabold truncate">{p.title}</div>
                  <div className="text-xs font-black" style={{ color: primaryColor }}>
                    ${p.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // V3: BRUTALIST SKU COMMAND PALETTE + LIVE INVENTORY TABLE
    if (variant === 'varient_3') {
      return (
        <div className="p-4 space-y-3 font-mono select-none">
          <div className="border-2 border-current p-2 bg-black text-white flex items-center gap-2 text-xs">
            <span>&gt;_ QUERY:</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent flex-1 focus:outline-none text-amber-300 font-bold"
            />
          </div>

          <div className="border-2 border-current divide-y-2 divide-current bg-white dark:bg-neutral-900">
            {list.map((p, i) => (
              <div
                key={p.id}
                onClick={() => onNavigate('ProductDetailPage')}
                className="p-2.5 flex items-center justify-between text-xs cursor-pointer hover:bg-amber-300/20"
              >
                <div className="min-w-0 pr-2">
                  <div className="text-[10px] opacity-60">SKU_00{i + 1} // {p.brand}</div>
                  <div className="font-black truncate">{p.title}</div>
                </div>
                <span className="px-2 py-1 bg-black text-white font-black">${p.price}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // V4: SPLIT AUTOCOMPLETE TREE + TRENDING RANKING LEADERBOARD
    if (variant === 'varient_4') {
      return (
        <div className="p-4 space-y-3.5 select-none">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Luxury Archive..."
            className="w-full px-3.5 py-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-xs font-bold bg-transparent"
          />
          <div className="text-xs font-extrabold">🔥 Top Trending Searches Today</div>
          <div className="space-y-2">
            {CUSTOM_ECOMMERCE_PRODUCTS.slice(0, 4).map((p, idx) => (
              <div
                key={p.id}
                onClick={() => onNavigate('ProductDetailPage')}
                className="p-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-center gap-3 cursor-pointer"
              >
                <span
                  className="w-6 h-6 rounded-lg text-white text-xs font-black flex items-center justify-center"
                  style={{ backgroundColor: idx === 0 ? '#E11D48' : primaryColor }}
                >
                  #{idx + 1}
                </span>
                <img src={p.image} alt="" className="w-11 h-11 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-extrabold truncate">{p.title}</div>
                  <div className="text-[10px] opacity-60">{p.reviewsCount} searches today</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // V5: ATELIER CURATED BRAND SPOTLIGHT + COLLECTION TAGS
    if (variant === 'varient_5') {
      return (
        <div className="p-4 space-y-4 select-none">
          <div className="border-l-4 pl-3" style={{ borderColor: primaryColor }}>
            <div className="text-[10px] font-mono uppercase opacity-60">INDEX SEARCH</div>
            <h2 className="text-base font-black">Browse Official Brand Houses</h2>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {CUSTOM_ECOMMERCE_PRODUCTS.slice(0, 4).map((p) => (
              <div
                key={p.id}
                onClick={() => onNavigate('ProductDetailPage')}
                className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-2 cursor-pointer"
              >
                <div className="text-[10px] font-mono uppercase font-bold" style={{ color: primaryColor }}>
                  {p.brand}
                </div>
                <img src={p.image} alt="" className="w-full h-20 object-cover rounded-xl" />
                <div className="text-xs font-bold truncate">{p.title}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // V6: INSTANT BARCODE SCANNER + PRICE-DROP WATCH FILTER
    return (
      <div className="p-4 space-y-3.5 select-none">
        <div className="p-3 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <QrCode size={22} className="text-emerald-400" />
            <div>
              <div className="text-xs font-black">In-Store Barcode Price Checker</div>
              <div className="text-[10px] text-white/70">Scan any box for instant online discount</div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {list.slice(0, 4).map((p) => (
            <div
              key={p.id}
              onClick={() => onNavigate('ProductDetailPage')}
              className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img src={p.image} alt="" className="w-11 h-11 rounded-lg object-cover" />
                <div className="min-w-0">
                  <div className="text-xs font-extrabold truncate">{p.title}</div>
                  <span className="text-[10px] text-emerald-500 font-bold">
                    Save ${p.originalPrice - p.price} vs retail
                  </span>
                </div>
              </div>
              <span className="text-xs font-black" style={{ color: primaryColor }}>
                ${p.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ============================================================================
  // 7. ADVANCED FILTER & SORT BOTTOM SHEET — 6 DISTINCT FILTER ARCHITECTURES
  // ============================================================================
  if (screenId === 'AdvancedFilterSheet') {
    const brands = ['Sony Official', 'Nordic Time', 'Velocity Athletics', 'Lumière Lab'];

    // V1: KEEP ORIGINAL
    if (variant === 'varient_1') {
      return (
        <div className="p-4 space-y-4 select-none">
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
            <h1 className="text-base font-black">Filter &amp; Sort Refine (V1)</h1>
            <button
              type="button"
              onClick={() => setMaxPrice(400)}
              className="text-xs font-bold cursor-pointer"
              style={{ color: primaryColor }}
            >
              Reset All
            </button>
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span>Price Range Slider</span>
              <span style={{ color: primaryColor }}>$15 — ${maxPrice}</span>
            </div>
            <input
              type="range"
              min={40}
              max={400}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full cursor-pointer"
              style={{ accentColor: primaryColor }}
            />
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-3.5 space-y-2">
            <div className="text-xs font-extrabold">Official Brands</div>
            {brands.map((brand) => {
              const checked = selectedBrands.includes(brand);
              return (
                <label
                  key={brand}
                  onClick={() =>
                    setSelectedBrands((prev) =>
                      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
                    )
                  }
                  className="flex items-center justify-between p-2 rounded-xl border border-neutral-200/70 dark:border-neutral-800 cursor-pointer"
                >
                  <span className="text-xs font-semibold">{brand}</span>
                  {checked && <Check size={13} style={{ color: primaryColor }} />}
                </label>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('ProductListingPage')}
            className="w-full py-3 rounded-xl text-xs font-extrabold text-white shadow-md cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            Apply Filters (Show 24 Products)
          </button>
        </div>
      );
    }

    // V2: BENTO COLOR SWATCH + SIZE MATRIX + RATING TILES
    if (variant === 'varient_2') {
      return (
        <div className="p-4 space-y-3.5 select-none">
          <div className="text-sm font-black">Bento Visual Attribute Matrix</div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-2">
              <div className="text-[11px] font-extrabold">Color Finish</div>
              <div className="flex gap-2">
                {['#18181B', '#E11D48', '#2563EB', '#D97706'].map((hex) => (
                  <button
                    key={hex}
                    type="button"
                    onClick={() => setSelectedColorSwatch(hex)}
                    className={`w-6 h-6 rounded-full ${
                      selectedColorSwatch === hex ? 'ring-2 ring-offset-2' : ''
                    }`}
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </div>
            </div>
            <div className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-1">
              <div className="text-[11px] font-extrabold">Express Stock</div>
              <button
                type="button"
                onClick={() => setInStockOnly((v) => !v)}
                className="text-xs font-black text-emerald-500"
              >
                {inStockOnly ? '✓ 60-Min Ready' : 'All Inventory'}
              </button>
            </div>
          </div>

          <div className="p-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-2">
            <div className="text-[11px] font-extrabold">Minimum Customer Rating</div>
            <div className="grid grid-cols-3 gap-2">
              {['4.9 ★ & Up', '4.5 ★ & Up', '4.0 ★ & Up'].map((r) => (
                <div
                  key={r}
                  className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[11px] font-black text-center"
                >
                  {r}
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('ProductListingPage')}
            className="w-full py-3 rounded-2xl text-xs font-extrabold text-white cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            Update Bento Grid →
          </button>
        </div>
      );
    }

    // V3: BRUTALIST BOOLEAN SPEC SWITCHBOARD
    if (variant === 'varient_3') {
      return (
        <div className="p-4 space-y-3 font-mono select-none">
          <div className="border-2 border-current p-2 bg-amber-300 text-black font-black text-xs">
            SPEC_FILTER_MATRIX // V3
          </div>
          {[
            ['OFFICIAL_WARRANTY_ONLY', 'TRUE'],
            ['FREE_COURTESY_DELIVERY', 'TRUE'],
            ['MAX_UNIT_PRICE_USD', `$${maxPrice}`],
            ['SORT_ORDER', sortBy.toUpperCase()],
          ].map(([k, v]) => (
            <div
              key={k}
              className="border-2 border-current p-3 flex items-center justify-between text-xs font-bold"
            >
              <span>{k}</span>
              <span className="px-2 py-0.5 bg-black text-white font-black">{v}</span>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onNavigate('ProductListingPage')}
            className="w-full py-3 border-2 border-current bg-emerald-400 text-black font-black text-xs uppercase cursor-pointer"
          >
            [ EXECUTE QUERY ]
          </button>
        </div>
      );
    }

    // V4: SPLIT VERTICAL TAB DRAWER (LEFT ATTRIBUTE TABS + RIGHT OPTIONS)
    if (variant === 'varient_4') {
      return (
        <div className="h-full flex flex-col justify-between p-4 select-none">
          <div className="text-sm font-black pb-2 border-b border-neutral-200 dark:border-neutral-800">
            Split Attribute Drawer
          </div>
          <div className="flex-1 flex gap-3 my-3">
            <div className="w-28 space-y-1.5 border-r border-neutral-200 dark:border-neutral-800 pr-2">
              {['Brand House', 'Price Tier', 'Warranty', 'Condition', 'Seller Rating'].map(
                (tab, idx) => (
                  <div
                    key={tab}
                    className={`p-2 rounded-xl text-[11px] font-bold ${
                      idx === 0 ? 'text-white' : 'opacity-65'
                    }`}
                    style={idx === 0 ? { backgroundColor: primaryColor } : undefined}
                  >
                    {tab}
                  </div>
                )
              )}
            </div>
            <div className="flex-1 space-y-2">
              {brands.map((b) => (
                <div
                  key={b}
                  className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-bold flex justify-between"
                >
                  <span>{b}</span>
                  <Check size={13} style={{ color: primaryColor }} />
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('ProductListingPage')}
            className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            Show Filtered Results →
          </button>
        </div>
      );
    }

    // V5: HISTOGRAM PRICE DISTRIBUTION CHART + QUICK PILLS
    if (variant === 'varient_5') {
      return (
        <div className="p-4 space-y-4 select-none">
          <div className="text-sm font-black">Price Histogram &amp; Smart Presets</div>
          <div className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-2">
            <div className="flex items-end gap-1.5 h-20 pt-2">
              {[25, 45, 80, 100, 65, 90, 40, 20].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md"
                  style={{
                    height: `${h}%`,
                    backgroundColor: i < 6 ? primaryColor : '#CBD5E1',
                  }}
                />
              ))}
            </div>
            <input
              type="range"
              min={50}
              max={400}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: primaryColor }}
            />
            <div className="text-xs font-extrabold text-center">Under ${maxPrice}</div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('ProductListingPage')}
            className="w-full py-3 rounded-xl text-xs font-extrabold text-white cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            Apply Histogram Range
          </button>
        </div>
      );
    }

    // V6: 1-TAP SMART PERSONA FILTER PRESETS
    return (
      <div className="p-4 space-y-3 select-none">
        <div className="text-sm font-black">1-Tap Smart FilterBundles</div>
        {[
          { title: '⚡ Under $150 + Express 60m', desc: 'Best for urgent gifts & daily essentials' },
          { title: '🏆 Top Rated 4.9★ Official Flagships', desc: 'Verified brand store inventory only' },
          { title: '🔥 Biggest Flash Discounts (25%+ OFF)', desc: 'Sorted by highest percentage savings' },
        ].map((preset) => (
          <div
            key={preset.title}
            onClick={() => onNavigate('ProductListingPage')}
            className="p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-current cursor-pointer space-y-1"
          >
            <div className="text-xs font-extrabold" style={{ color: primaryColor }}>
              {preset.title}
            </div>
            <div className="text-[11px] opacity-65">{preset.desc}</div>
          </div>
        ))}
      </div>
    );
  }

  // ============================================================================
  // 8. CATEGORY NAVIGATION — 6 DISTINCT TAXONOMY EXPLORERS
  // ============================================================================
  const departments: Record<string, { name: string; count: string; img: string }[]> = {
    'Electronics & Audio': [
      { name: 'ANC Headphones', count: '128 items', img: CUSTOM_ECOMMERCE_PRODUCTS[0].image },
      { name: 'Smart Watches', count: '94 items', img: CUSTOM_ECOMMERCE_PRODUCTS[1].image },
    ],
    'Fashion & Footwear': [
      { name: 'Running Sneakers', count: '215 items', img: CUSTOM_ECOMMERCE_PRODUCTS[2].image },
      { name: 'Italian Bags', count: '86 items', img: CUSTOM_ECOMMERCE_PRODUCTS[5].image },
    ],
  };

  // V1: KEEP ORIGINAL SPLIT SIDEBAR
  if (variant === 'varient_1') {
    const subList = departments[activeParentCategory] || departments['Electronics & Audio'];
    return (
      <div className="h-full flex flex-col p-4 space-y-3 select-none">
        <h1 className="text-base font-black">Category Directory (V1)</h1>
        <div className="flex-1 flex gap-2.5">
          <div className="w-28 flex flex-col gap-1.5 border-r border-neutral-200 dark:border-neutral-800 pr-2">
            {Object.keys(departments).map((dept) => {
              const active = activeParentCategory === dept;
              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setActiveParentCategory(dept)}
                  className={`p-2.5 rounded-xl text-left text-[11px] font-extrabold cursor-pointer ${
                    active ? 'text-white' : 'bg-neutral-100 dark:bg-neutral-900 opacity-75'
                  }`}
                  style={active ? { backgroundColor: primaryColor } : undefined}
                >
                  {dept}
                </button>
              );
            })}
          </div>
          <div className="flex-1 space-y-2">
            {subList.map((sub) => (
              <div
                key={sub.name}
                onClick={() => onNavigate('ProductListingPage')}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-2.5 flex items-center gap-3 cursor-pointer"
              >
                <img src={sub.img} alt={sub.name} className="w-14 h-14 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-extrabold">{sub.name}</div>
                  <div className="text-[10px] opacity-60">{sub.count}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // V2: BENTO VISUAL PHOTO CARDS WITH ITEM COUNTS
  if (variant === 'varient_2') {
    return (
      <div className="p-4 space-y-3 select-none">
        <h1 className="text-base font-black">Bento Department Mosaic</h1>
        <div className="grid grid-cols-2 gap-2.5">
          {CUSTOM_ECOMMERCE_PRODUCTS.slice(0, 4).map((p) => (
            <div
              key={p.id}
              onClick={() => onNavigate('ProductListingPage')}
              className="relative h-32 rounded-3xl overflow-hidden cursor-pointer group"
            >
              <img src={p.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-3 flex flex-col justify-end text-white">
                <div className="text-xs font-black">{p.category}</div>
                <div className="text-[10px] opacity-75">{p.brand}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // V3: BRUTALIST NUMBERED ACCORDION INDEX
  if (variant === 'varient_3') {
    return (
      <div className="p-4 space-y-2.5 font-mono select-none">
        <div className="border-2 border-current p-2 bg-amber-300 text-black font-black text-xs">
          TAXONOMY_INDEX // 01-06
        </div>
        {CUSTOM_ECOMMERCE_PRODUCTS.map((p, idx) => (
          <div
            key={p.id}
            onClick={() => onNavigate('ProductListingPage')}
            className="border-2 border-current p-3 flex items-center justify-between cursor-pointer bg-white dark:bg-neutral-900 shadow-[3px_3px_0px_currentColor]"
          >
            <span className="text-xs font-black">
              0{idx + 1}. {p.category.toUpperCase()}
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-black text-white">
              [{p.reviewsCount}]
            </span>
          </div>
        ))}
      </div>
    );
  }

  // V4: FULL-BLEED EDITORIAL HORIZONTAL BANNERS
  if (variant === 'varient_4') {
    return (
      <div className="p-4 space-y-3 select-none">
        <h1 className="text-base font-serif font-bold">Curated Salons</h1>
        {CUSTOM_ECOMMERCE_PRODUCTS.slice(0, 3).map((p) => (
          <div
            key={p.id}
            onClick={() => onNavigate('ProductListingPage')}
            className="relative h-28 rounded-2xl overflow-hidden cursor-pointer"
          >
            <img src={p.image} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/55 p-4 flex items-center justify-between text-white">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-amber-300">{p.brand}</div>
                <div className="text-base font-black">{p.category}</div>
              </div>
              <ChevronRight size={18} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // V5: A-Z OFFICIAL BRAND FLAGSHIP DIRECTORY + BUBBLES
  if (variant === 'varient_5') {
    return (
      <div className="p-4 space-y-3.5 select-none">
        <h1 className="text-base font-black">Official Brand Flagships (A–Z)</h1>
        <div className="grid grid-cols-3 gap-2.5">
          {CUSTOM_ECOMMERCE_PRODUCTS.map((p) => (
            <div
              key={p.id}
              onClick={() => onNavigate('ProductListingPage')}
              className="p-2.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col items-center text-center gap-1.5 cursor-pointer"
            >
              <img src={p.image} alt="" className="w-12 h-12 rounded-full object-cover" />
              <div className="text-[10px] font-extrabold truncate w-full">{p.brand}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // V6: SHOP BY BUDGET TIER ($25 / $100 / $250+)
  return (
    <div className="p-4 space-y-3 select-none">
      <h1 className="text-base font-black">Shop by Price &amp; Occasion</h1>
      <div className="grid grid-cols-2 gap-2.5">
        {[
          { tier: 'Under $50', tag: 'Daily Steals', color: '#10B981' },
          { tier: 'Under $150', tag: 'Most Popular', color: primaryColor },
          { tier: 'Luxury $250+', tag: 'Flagship Tier', color: '#D97706' },
          { tier: '2-for-1 Bundles', tag: 'Combo Saver', color: '#E11D48' },
        ].map((b) => (
          <div
            key={b.tier}
            onClick={() => onNavigate('ProductListingPage')}
            className="p-4 rounded-2xl text-white space-y-1 cursor-pointer shadow-sm"
            style={{ backgroundColor: b.color }}
          >
            <div className="text-[10px] uppercase font-bold opacity-85">{b.tag}</div>
            <div className="text-base font-black">{b.tier}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
