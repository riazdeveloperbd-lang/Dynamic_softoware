import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  PhoneCall,
  Heart,
  Truck,
  User,
  Menu,
  X,
  Flame,
  Sparkles,
  CheckCircle2,
  Leaf,
} from 'lucide-react';
import {
  EditableText,
  EditableButton,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';
import {
  useStoreEcommerce,
  STORE_CATEGORIES,
  StoreCategorySlug,
  StorePageId,
} from './StoreEcommerceContext';

export interface StoreNavbarProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

export const StoreNavbar: React.FC<StoreNavbarProps> = ({
  title = 'Bazar',
  subtitle = '100% Pure & Organic Food Store',
  variant = 'varient_1',
  primaryColor = '#F37021',
  isDark = false,
}) => {
  const {
    activePage,
    setActivePage,
    selectedCategory,
    openCategoryPage,
    searchQuery,
    setSearchQuery,
    cartCount,
    cartSubtotal,
    wishlistIds,
    setIsCartDrawerOpen,
    storeToast,
  } = useStoreEcommerce();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pageTabs: { id: StorePageId; label: string; badge?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'category', label: 'All Products (সকল প্রোডাক্ট)' },
    { id: 'offer_zone', label: 'OFFER ZONE', badge: 'HOT' },
    { id: 'best_seller', label: 'Best Seller' },
    { id: 'track_order', label: 'Track Order' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActivePage('category');
  };

  return (
    <header
      className={`sticky top-0 z-30 border-b transition-colors ${
        isDark
          ? 'bg-[#0F141C] border-white/10 text-white'
          : 'bg-white border-slate-200/90 text-slate-900'
      }`}
    >
      {/* Floating Toast Alert for Add-to-Cart / Wishlist / Order Actions */}
      {storeToast && (
        <div
          className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl shadow-2xl text-xs font-extrabold text-white flex items-center gap-2"
          style={{ backgroundColor: primaryColor }}
        >
          <CheckCircle2 size={15} />
          <span>{storeToast}</span>
        </div>
      )}

      {/* 1. TOP ANNOUNCEMENT STRIP (GhorerBazar Signature Orange/Dark Strip) */}
      <div
        className="px-4 sm:px-6 py-2 text-[11px] sm:text-xs font-bold text-white transition-colors"
        style={{
          backgroundColor: variant === 'varient_2' ? '#14532D' : primaryColor,
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Sparkles size={13} className="flex-shrink-0" />
            <EditableText
              id="store_top_promo_text"
              defaultText="আমাদের যে কোন পণ্য অর্ডার করতে কল বা WhatsApp করুন: +8801321208940"
              className="truncate"
            />
          </div>
          <div className="hidden md:flex items-center gap-5">
            <a
              href="tel:+8809642922922"
              className="inline-flex items-center gap-1.5 hover:underline"
            >
              <PhoneCall size={12} />
              <EditableText
                id="store_top_hotline"
                defaultText=" হটলাইন: 09642-922922"
              />
            </a>
            <span>|</span>
            <button
              type="button"
              onClick={() => setActivePage('track_order')}
              className="inline-flex items-center gap-1 hover:underline cursor-pointer"
            >
              <Truck size={13} />
              <span>Track Order</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR: LOGO + LIVE SEARCH BAR + HOTLINE + WISHLIST + CART DRAWER TRIGGER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand Logo */}
        <div
          onClick={() => setActivePage('home')}
          className="flex items-center gap-2.5 cursor-pointer flex-shrink-0"
        >
          <div
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center text-white shadow-sm flex-shrink-0"
            style={{ backgroundColor: primaryColor }}
          >
            <Leaf size={22} />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1">
              <EditableText
                id="bazar_brand_title"
                defaultText={title}
                className="text-lg sm:text-2xl font-black tracking-tight"
                style={{ color: isDark ? '#FFFFFF' : primaryColor }}
              />
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[9px] font-extrabold uppercase">
                100% Pure
              </span>
            </div>
            <EditableText
              id="store_brand_sub"
              as="div"
              defaultText={subtitle}
              className="text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400"
            />
          </div>
        </div>

        {/* Center Live Product Search Input (Desktop & Tablet) */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 max-w-xl items-center relative"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (activePage !== 'category') {
                setActivePage('category');
              }
            }}
            placeholder="Search Sundarban Honey, Gawa Ghee, Mustard Oil, Ajwa Dates..."
            className={`w-full pl-4 pr-12 py-2.5 rounded-full border-2 text-xs sm:text-sm font-medium focus:outline-none transition ${
              isDark
                ? 'bg-[#171F2C] border-white/15 text-white placeholder:text-slate-400'
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
            }`}
            style={{ borderColor: searchQuery ? primaryColor : undefined }}
          />
          <button
            type="submit"
            className="absolute right-1.5 w-9 h-9 rounded-full text-white flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: primaryColor }}
            aria-label="Search Products"
          >
            <Search size={16} />
          </button>
        </form>

        {/* Right Action Icons: Order Track, Wishlist, Cart Drawer Trigger & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={() => setActivePage('track_order')}
            className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold hover:border-orange-400 transition cursor-pointer"
          >
            <User size={15} style={{ color: primaryColor }} />
            <span>Track Order</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePage('best_seller')}
            className="relative p-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-orange-400 transition cursor-pointer"
            title="Saved Wishlist Items"
          >
            <Heart size={18} style={{ color: primaryColor }} />
            {wishlistIds.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold flex items-center justify-center">
                {wishlistIds.length}
              </span>
            )}
          </button>

          {/* Shopping Cart Button (Opens Slide-Over Cart Drawer) */}
          <button
            type="button"
            onClick={() => setIsCartDrawerOpen(true)}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-white font-extrabold text-xs shadow-sm hover:opacity-95 transition cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          >
            <div className="relative">
              <ShoppingBag size={17} />
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-slate-950 text-white text-[10px] font-black flex items-center justify-center">
                {cartCount}
              </span>
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <div className="text-[10px] opacity-85">My Bag</div>
              <div className="text-xs font-black">৳{cartSubtotal.toLocaleString()}</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-white/15 cursor-pointer"
            aria-label="Toggle Store Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (activePage !== 'category') setActivePage('category');
            }}
            placeholder="Search Honey, Ghee, Mustard Oil, Dates..."
            className={`w-full pl-3.5 pr-10 py-2 rounded-full border text-xs font-medium focus:outline-none ${
              isDark
                ? 'bg-[#171F2C] border-white/15 text-white'
                : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
          />
          <button
            type="submit"
            className="absolute right-1.5 w-7 h-7 rounded-full text-white flex items-center justify-center"
            style={{ backgroundColor: primaryColor }}
          >
            <Search size={13} />
          </button>
        </form>
      </div>

      {/* 3. MULTI-PAGE NAVIGATION BAR + GHORER BAZAR CATEGORY RIBBON */}
      <div
        className={`border-t transition-colors ${
          isDark ? 'bg-[#141B26] border-white/10' : 'bg-[#FFF9F5] border-orange-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          {/* Multi-Page Switcher Pills */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {pageTabs.map((tab) => {
              const isActive = activePage === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    if (tab.id === 'category') {
                      openCategoryPage('all');
                    } else if (tab.id === 'offer_zone') {
                      openCategoryPage('offer_zone');
                    } else if (tab.id === 'best_seller') {
                      openCategoryPage('best_seller');
                    } else {
                      setActivePage(tab.id);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-white shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-orange-100/60 dark:hover:bg-white/5'
                  }`}
                  style={isActive ? { backgroundColor: primaryColor } : undefined}
                >
                  {tab.id === 'offer_zone' && <Flame size={13} />}
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="px-1.5 py-0.2 rounded bg-rose-600 text-white text-[9px] font-black">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden px-4 py-4 border-t space-y-3 ${
            isDark ? 'bg-[#0F141C] border-white/10' : 'bg-white border-slate-200'
          }`}
        >
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            Store Pages
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {pageTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (tab.id === 'category') openCategoryPage('all');
                  else if (tab.id === 'offer_zone') openCategoryPage('offer_zone');
                  else if (tab.id === 'best_seller') openCategoryPage('best_seller');
                  else setActivePage(tab.id);
                }}
                className={`px-3 py-2 rounded-xl text-left text-xs font-bold border ${
                  activePage === tab.id
                    ? 'text-white border-transparent'
                    : 'border-slate-200 dark:border-white/10'
                }`}
                style={activePage === tab.id ? { backgroundColor: primaryColor } : undefined}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 pt-2">
            Product Categories
          </div>
          <div className="flex flex-wrap gap-1.5">
            {STORE_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCategoryPage(cat.slug);
                }}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-white/5"
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default StoreNavbar;
