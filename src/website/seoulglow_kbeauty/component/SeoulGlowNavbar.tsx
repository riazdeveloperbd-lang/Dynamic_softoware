import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Search,
  ShoppingBag,
  QrCode,
  Menu,
  X,
  CheckCircle2,
  Droplets,
  Sun,
  Heart,
  Package,
  Truck,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface SeoulGlowNavbarProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

export const SeoulGlowNavbar: React.FC<SeoulGlowNavbarProps> = ({
  title,
  variant,
  primaryColor,
  isDark,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavKey, setActiveNavKey] = useState<string>('concerns');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkinFilter, setActiveSkinFilter] = useState<string>('all');
  const [verifyQuickBanner, setVerifyQuickBanner] = useState(false);

  const isCentered = variant === 'varient_2';
  const isBrutalist = variant === 'varient_3';

  const scrollToSection = (id: string, key: string) => {
    setActiveNavKey(key);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    {
      key: 'concerns',
      id: 'seoulglow-skin-concerns',
      label: 'Shop by Concern',
      bn: 'সমস্যা অনুযায়ী',
    },
    {
      key: 'skintype',
      id: 'seoulglow-catalog',
      label: 'Shop by Skin Type',
      bn: 'ত্বকের ধরন',
    },
    {
      key: 'brands',
      id: 'seoulglow-catalog',
      label: 'Top Korean Brands',
      bn: 'কোরিয়ান ব্র্যান্ড',
    },
    {
      key: 'bundles',
      id: 'seoulglow-glass-bundle',
      label: '3-Step Glass Skin Kit',
      bn: 'গ্লাস-স্কিন কম্বো',
    },
    {
      key: 'verify',
      id: 'seoulglow-authenticity',
      label: 'Verify Authenticity',
      bn: 'বারকোড যাচাই',
    },
  ];

  const skinTypeFilters = [
    {
      id: 'all',
      label: 'All Glass-Skin Essentials · সব প্রোডাক্ট',
      meta: 'COSRX · Beauty of Joseon · Anua · Skin1004',
      icon: Sparkles,
    },
    {
      id: 'acne',
      label: 'Acne & Blemish Care · ব্রণ ও র‍্যাশ',
      meta: 'Heartleaf 77% · Centella · BHA',
      icon: Droplets,
    },
    {
      id: 'pigmentation',
      label: 'Dark Spots & Melasma · মেছতা ও কালো দাগ',
      meta: '5% Niacinamide · Rice + Alpha-Arbutin',
      icon: Sun,
    },
    {
      id: 'hydration',
      label: 'Snail Mucin & Barrier · শুষ্ক ত্বক ও গ্লো',
      meta: '96% Snail Mucin · Probiotics SPF50+',
      icon: Heart,
    },
    {
      id: 'combos',
      label: '3-Step Routine Kits · গ্লাস-স্কিন সেট',
      meta: 'Save ৳810 + Free Sheet Mask',
      icon: Package,
    },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors ${
        isDark
          ? 'bg-[#121316]/95 text-stone-100 border-b border-rose-500/20'
          : 'bg-[#FAFAFA]/95 text-[#222222] border-b border-[#F3F4F6]'
      } backdrop-blur-xl`}
    >
      {/* Top Announcement Ticker */}
      <div
        className="w-full px-4 py-2 text-[11px] sm:text-xs font-bold tracking-wide text-white"
        style={{
          background: 'linear-gradient(90deg, #1E293B 0%, #0F172A 50%, #1E293B 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider text-slate-950 shrink-0"
              style={{ backgroundColor: '#06B6D4' }}
            >
              <ShieldCheck size={11} />
              10X MONEY-BACK AUTHENTICITY
            </span>
            <EditableText
              id="seoulglow_top_announcement_ticker"
              defaultText="✨ ১০০% অরিজিনাল কোরিয়ান স্কিনকেয়ার গ্যারান্টি | নকল প্রমাণ করতে পারলে ১০ গুণ টাকা ফেরত! | ঢাকায় ২৪ ঘণ্টায় এক্সপ্রেস ডেলিভারি"
              className="text-stone-100 truncate"
            />
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[11px] text-stone-300 shrink-0">
            <span className="inline-flex items-center gap-1 text-cyan-300 font-semibold">
              <Truck size={12} />
              Direct Seoul Air-Freight Lot #KR-2026-09
            </span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <button
              type="button"
              onClick={() => scrollToSection('seoulglow-authenticity', 'verify')}
              className="text-rose-300 hover:text-white underline underline-offset-2 font-bold cursor-pointer"
            >
              Check HiddenTag / Batch Code →
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-[74px] flex items-center justify-between gap-3">
        {/* Left: Brand Identity */}
        <div
          className={`flex items-center gap-3 shrink-0 ${
            isCentered ? 'mx-auto lg:mx-0' : ''
          }`}
        >
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-white shadow-sm shrink-0 ${
              isBrutalist
                ? 'rounded-none border-2 border-[#222222] shadow-[3px_3px_0px_#06B6D4]'
                : 'rounded-2xl'
            }`}
            style={{
              background: `linear-gradient(135deg, ${primaryColor || '#E07A5F'}, #D96B4E)`,
            }}
          >
            <Sparkles size={20} strokeWidth={2.2} />
          </div>

          <div className="leading-none">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <EditableText
                id="seoulglow_nav_brand_title"
                defaultText={title || 'SeoulGlow BD (সিউল গ্লো)'}
                className="text-base sm:text-lg font-extrabold tracking-tight"
              />
              <span className="hidden sm:inline-block text-[10px] font-bold tracking-wider uppercase text-[#06B6D4]">
                SEOUL · DHAKA 🇰🇷
              </span>
            </div>
            <EditableText
              id="seoulglow_nav_brand_subtitle"
              defaultText="100% Authentic K-Beauty · COSRX · Beauty of Joseon · Anua · Skin1004"
              className="block text-[10px] sm:text-[11px] font-medium text-[#6B7280] dark:text-stone-400 mt-1 whitespace-nowrap"
            />
          </div>
        </div>

        {/* Center: Clean Navigation Links */}
        <nav
          aria-label="SeoulGlow Primary Navigation"
          className="hidden xl:flex items-center gap-6"
        >
          {navItems.map((item) => {
            const isActive = activeNavKey === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => scrollToSection(item.id, item.key)}
                className={`group relative py-1 text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-[#E07A5F]'
                    : isDark
                    ? 'text-stone-300 hover:text-white'
                    : 'text-[#222222] hover:text-[#E07A5F]'
                }`}
              >
                <span>{item.label}</span>
                <span className="block text-[10px] font-medium text-[#6B7280] dark:text-stone-400">
                  {item.bn}
                </span>
                <span
                  className={`absolute bottom-0 inset-x-0 h-0.5 rounded-full transition-transform origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                  style={{ backgroundColor: primaryColor || '#E07A5F' }}
                />
              </button>
            );
          })}
        </nav>

        {/* Right: Search Bar, Verify Product (বারকোড চেক করুন) & Cart */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Compact Search Input */}
          <div
            className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs ${
              isDark
                ? 'bg-stone-900 border-stone-800 text-stone-200'
                : 'bg-white border-[#E5E7EB] text-[#222222]'
            }`}
          >
            <Search size={13} className="text-[#6B7280]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  scrollToSection('seoulglow-catalog', 'skintype');
                }
              }}
              placeholder="Search Snail Mucin, BOJ..."
              className="bg-transparent focus:outline-none w-36 text-xs placeholder:text-[#6B7280]"
            />
          </div>

          {/* Verify Product (বারকোড চেক করুন) Button */}
          <button
            type="button"
            onClick={() => {
              setVerifyQuickBanner((prev) => !prev);
              scrollToSection('seoulglow-authenticity', 'verify');
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold border transition cursor-pointer"
            style={{
              backgroundColor: isDark ? 'rgba(6, 182, 212, 0.12)' : '#ECFEFF',
              borderColor: '#06B6D4',
              color: isDark ? '#22D3EE' : '#0E7490',
            }}
          >
            <QrCode size={14} className="text-[#06B6D4]" />
            <span>Verify Product · বারকোড চেক করুন</span>
          </button>

          {/* Primary COD Order CTA & Cart Badge */}
          <button
            type="button"
            onClick={() => scrollToSection('seoulglow-cod-checkout', 'bundles')}
            className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:opacity-95 cursor-pointer ${
              isBrutalist
                ? 'rounded-none border-2 border-[#222222] shadow-[3px_3px_0px_#222222]'
                : 'rounded-xl'
            }`}
            style={{ backgroundColor: primaryColor || '#E07A5F' }}
          >
            <ShoppingBag size={14} />
            <span>Shop K-Beauty</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 text-white font-black">
              3
            </span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle Menu"
            className={`xl:hidden p-2 rounded-xl border cursor-pointer ${
              isDark
                ? 'border-stone-800 bg-stone-900 text-stone-200'
                : 'border-stone-200 bg-white text-stone-800'
            }`}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Sub-Header Skin Concern & Brand Filter Bar */}
      <div
        className={`w-full border-t ${
          isDark
            ? 'bg-[#17181C]/90 border-stone-800/80'
            : 'bg-[#FFF5F5]/80 border-[#F3F4F6]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 shrink-0">
            {skinTypeFilters.map((chip) => {
              const Icon = chip.icon;
              const isSelected = activeSkinFilter === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => {
                    setActiveSkinFilter(chip.id);
                    scrollToSection(
                      chip.id === 'combos'
                        ? 'seoulglow-glass-bundle'
                        : 'seoulglow-catalog',
                      chip.id
                    );
                  }}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#222222] text-white shadow-xs dark:bg-white dark:text-stone-900'
                      : isDark
                      ? 'text-stone-300 hover:bg-stone-800'
                      : 'text-[#222222] hover:bg-white/90'
                  }`}
                >
                  <Icon
                    size={13}
                    style={{
                      color: isSelected ? '#06B6D4' : primaryColor || '#E07A5F',
                    }}
                  />
                  <span>{chip.label}</span>
                  <span className="hidden md:inline text-[10px] opacity-65 font-normal">
                    · {chip.meta}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[11px] font-semibold text-[#6B7280] shrink-0">
            <CheckCircle2 size={13} className="text-[#06B6D4]" />
            <span>KFDA &amp; BSTI Compliant</span>
          </div>
        </div>
      </div>

      {/* Quick Authenticity Notice Drawer if Verify Product clicked */}
      {verifyQuickBanner && (
        <div className="bg-cyan-950 text-cyan-50 px-4 py-2.5 border-t border-cyan-700/50">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <QrCode size={15} className="text-cyan-400 shrink-0" />
              <span>
                <strong>SeoulGlow Batch &amp; HiddenTag Authenticator:</strong> Scroll down to enter your bottle’s Korean Lot Code (e.g., <code className="px-1.5 py-0.5 rounded bg-cyan-900 text-cyan-200 font-mono">COSRX-KR-88294</code>) to verify Seoul shipment authenticity.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setVerifyQuickBanner(false)}
              className="text-cyan-300 hover:text-white font-bold text-xs cursor-pointer"
            >
              Close ✕
            </button>
          </div>
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          className={`xl:hidden px-4 pt-3 pb-5 border-t space-y-3 ${
            isDark
              ? 'bg-[#121316] border-stone-800 text-stone-100'
              : 'bg-white border-stone-200 text-[#222222]'
          }`}
        >
          <div className="grid grid-cols-1 gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => scrollToSection(item.id, item.key)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-bold hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
              >
                <span>{item.label}</span>
                <span className="text-[11px] text-[#6B7280]">{item.bn}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => scrollToSection('seoulglow-authenticity', 'verify')}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-extrabold border border-[#06B6D4] text-[#0E7490] bg-[#ECFEFF] flex items-center justify-center gap-2 cursor-pointer"
            >
              <QrCode size={14} />
              <span>Verify Product (বারকোড চেক করুন)</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('seoulglow-cod-checkout', 'bundles')}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-extrabold text-white flex items-center justify-center gap-2 cursor-pointer"
              style={{ backgroundColor: primaryColor || '#E07A5F' }}
            >
              <ShoppingBag size={14} />
              <span>Order with Cash on Delivery</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
