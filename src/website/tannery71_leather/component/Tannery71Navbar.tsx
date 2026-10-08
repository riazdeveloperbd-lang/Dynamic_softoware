import React, { useState } from 'react';
import {
  Briefcase,
  ShoppingBag,
  Menu,
  X,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Flame,
  Gift,
  Building2,
  ArrowUpRight,
  Award,
  Wallet,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface Tannery71NavbarProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

export const Tannery71Navbar: React.FC<Tannery71NavbarProps> = ({
  title,
  subtitle,
  variant,
  isDark = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'home' | 'collection' | 'burn_test' | 'unboxing' | 'corporate' | 'checkout'
  >('home');
  const [activeCategoryQuick, setActiveCategoryQuick] = useState<
    'all' | 'wallets' | 'belts' | 'bags' | 'footwear'
  >('all');

  const scrollToSection = (
    id: string,
    tab?: 'home' | 'collection' | 'burn_test' | 'unboxing' | 'corporate' | 'checkout'
  ) => {
    if (tab) setActiveTab(tab);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navItems: {
    id: 'home' | 'collection' | 'burn_test' | 'unboxing' | 'corporate' | 'checkout';
    targetId: string;
    label: string;
    badge?: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'home',
      targetId: 'tannery71-hero-authenticity',
      label: 'হোম ও ঐতিহ্য',
      icon: <Award size={13} />,
    },
    {
      id: 'collection',
      targetId: 'tannery71-collection-swatches',
      label: 'শপ কালেকশন',
      icon: <Wallet size={13} />,
    },
    {
      id: 'burn_test',
      targetId: 'tannery71-authenticity-lab',
      label: 'বার্ন-টেস্ট প্রুফ',
      badge: '100% HIDE',
      icon: <Flame size={13} />,
    },
    {
      id: 'unboxing',
      targetId: 'tannery71-unboxing-engraving',
      label: 'গিফট বক্স ও নাম খোদাই',
      icon: <Gift size={13} />,
    },
    {
      id: 'corporate',
      targetId: 'tannery71-corporate-footer',
      label: 'কর্পোরেট বাল্ক অর্ডার',
      icon: <Building2 size={13} />,
    },
  ];

  return (
    <header
      className="w-full sticky top-0 z-30 transition-colors border-b backdrop-blur-md"
      style={{
        backgroundColor: isDark ? 'rgba(14, 11, 9, 0.96)' : 'rgba(253, 251, 247, 0.97)',
        borderColor: isDark ? '#29201B' : '#E7DFD3',
        color: isDark ? '#FAF6F0' : '#1C130E',
      }}
    >
      {/* Row 1: Executive Heritage & Fire-Test Guarantee Top Bar */}
      <div
        className="w-full py-1.5 px-4 text-[11px] font-medium border-b"
        style={{
          backgroundColor: '#160F0B',
          borderColor: '#2E2119',
          color: '#F5EFE6',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#B45309] text-amber-50 text-[10px] font-extrabold uppercase tracking-wider shrink-0">
              <Flame size={11} />
              FIRE-TEST CERTIFIED
            </span>
            <span className="font-semibold text-amber-100/90 truncate">
              <EditableText
                id="tannery71_nav_top_sub"
                defaultText={
                  subtitle ||
                  '১০০% এক্সপোর্ট-গ্রেড ফুল-গ্রেইন খাঁটি চামড়ার গ্যারান্টি — কৃত্রিম বা রেক্সিন প্রমাণ করতে পারলে দ্বিগুণ মূল্য ফেরত!'
                }
              />
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0 text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-bold">
              <Sparkles size={12} />
              কাস্টম নাম খোদাই (+৳২০০) · ম্যাট ব্ল্যাক রিজিড গিফট বক্স ফ্রি
            </span>
            <span className="text-stone-600">|</span>
            <span className="text-stone-300 font-semibold">
              ৫ বছরের লেদার রিপ্লেসমেন্ট ওয়ারেন্টি
            </span>
          </div>
        </div>
      </div>

      {/* Row 2: Clean Single-Line Main Header (Zero Wrapping) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[70px] flex items-center justify-between gap-3">
        {/* Left: Brand Identity */}
        <div
          onClick={() => scrollToSection('tannery71-hero-authenticity', 'home')}
          className="flex items-center gap-3 cursor-pointer shrink-0 group"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-amber-50 shadow-md transition-transform group-hover:scale-105 border border-amber-500/30"
            style={{
              background: 'linear-gradient(135deg, #78350F 0%, #451A03 100%)',
            }}
          >
            <Briefcase size={20} className="stroke-[2.2]" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span
                className="text-base sm:text-lg font-black tracking-tight whitespace-nowrap leading-none"
                style={{ color: isDark ? '#FAF6F0' : '#1C130E' }}
              >
                <EditableText
                  id="tannery71_nav_brand"
                  defaultText={title || 'Tannery 71 (ট্যানারি ৭১)'}
                />
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-900/15 text-[#92400E] dark:text-amber-300 border border-amber-700/30 whitespace-nowrap">
                EST. HERITAGE HIDE
              </span>
            </div>
            <span
              className="text-[11px] font-medium whitespace-nowrap mt-1 hidden sm:block"
              style={{ color: isDark ? '#A89F91' : '#574C43' }}
            >
              <EditableText
                id="tannery71_nav_tagline"
                defaultText="Genuine Full-Grain Leather Goods & Executive Accessories · শতভাগ খাঁটি চামড়ার আভিজাত্য"
              />
            </span>
          </div>
        </div>

        {/* Center: Clean Segmented Pill Navigation (Single Line, Zero Wrapping) */}
        <nav
          className={`hidden xl:flex items-center gap-1 p-1 rounded-xl border ${
            variant === 'varient_2'
              ? 'border-amber-700/40 bg-amber-900/10'
              : isDark
              ? 'bg-[#18120E] border-[#2E231C]'
              : 'bg-[#F4EFE6] border-[#E4DCCF]'
          }`}
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.targetId, item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-[#2C1F17] text-amber-50 shadow-xs'
                      : 'bg-white text-[#1C130E] shadow-xs'
                    : isDark
                    ? 'text-stone-400 hover:text-amber-100 hover:bg-stone-800/50'
                    : 'text-stone-600 hover:text-[#1C130E] hover:bg-white/70'
                }`}
              >
                <span
                  className={
                    isActive
                      ? 'text-[#B45309]'
                      : item.id === 'burn_test'
                      ? 'text-[#D97706]'
                      : 'opacity-75'
                  }
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-amber-500/15 text-[#B45309] dark:text-amber-300 border border-amber-500/25">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Single-Line Executive Action CTAs */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => scrollToSection('tannery71-authenticity-lab', 'burn_test')}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold border whitespace-nowrap transition cursor-pointer"
            style={{
              backgroundColor: isDark ? 'rgba(180, 83, 9, 0.14)' : '#FEF3C7',
              borderColor: isDark ? 'rgba(217, 119, 6, 0.35)' : '#FDE68A',
              color: isDark ? '#FBBF24' : '#92400E',
            }}
          >
            <Flame size={13} />
            <span>খাঁটি চামড়ার পরীক্ষা</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('tannery71-unboxing-engraving', 'checkout')}
            className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-amber-50 shadow-sm hover:opacity-95 transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #92400E 0%, #451A03 100%)',
            }}
          >
            <ShoppingBag size={14} />
            <span>কালেকশন অর্ডার করুন</span>
            <ArrowUpRight size={14} className="opacity-90" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl border cursor-pointer"
            style={{
              borderColor: isDark ? '#29201B' : '#E7DFD3',
              backgroundColor: isDark ? '#18120E' : '#F4EFE6',
            }}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Row 3: Required Shop Collection Category Strip (Wallets | Belts | Bags | Footwear) */}
      <div
        className="hidden md:block border-t py-2 px-4"
        style={{
          backgroundColor: isDark ? '#140F0C' : '#F6F1E9',
          borderColor: isDark ? '#29201B' : '#E7DFD3',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span
              className="text-[11px] font-extrabold uppercase tracking-wider mr-1 flex items-center gap-1.5 shrink-0"
              style={{ color: isDark ? '#D97706' : '#78350F' }}
            >
              <Sparkles size={12} className="text-[#B45309]" />
              Shop Collection:
            </span>

            {[
              {
                id: 'all' as const,
                label: 'সব লেদার কালেকশন (All Goods)',
              },
              {
                id: 'wallets' as const,
                label: '১. Wallets & Cardholders (লং ও বাই-ফোল্ড ওয়ালেট)',
              },
              {
                id: 'belts' as const,
                label: '২. Executive Belts (ফুল-গ্রেইন ফরমাল বেল্ট)',
              },
              {
                id: 'bags' as const,
                label: '৩. Bags & Laptop Sleeves (অফিস মেসেঞ্জার ব্যাগ)',
              },
              {
                id: 'footwear' as const,
                label: '৪. Formal Footwear (হ্যান্ডক্রাফটেড লোফার)',
              },
            ].map((cat) => {
              const active = activeCategoryQuick === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategoryQuick(cat.id);
                    scrollToSection('tannery71-collection-swatches', 'collection');
                  }}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 border transition cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#78350F] text-amber-50 border-[#78350F] shadow-xs'
                      : isDark
                      ? 'bg-[#1F1712] text-stone-300 border-[#33261E] hover:border-amber-600/50'
                      : 'bg-white text-stone-700 border-[#DFD5C5] hover:border-[#78350F] hover:text-[#78350F]'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 shrink-0 text-[11px] font-bold">
            <span className="inline-flex items-center gap-1 text-[#92400E] dark:text-amber-400">
              <ShieldCheck size={13} className="text-[#B45309]" />
              100% Export-Grade Cowhide · 5-Year Warranty
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="xl:hidden border-t px-4 py-4 space-y-2 text-xs font-bold shadow-xl"
          style={{
            backgroundColor: isDark ? '#120D0A' : '#FDFBF7',
            borderColor: isDark ? '#29201B' : '#E7DFD3',
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.targetId, item.id)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-amber-900/10 transition text-left"
            >
              <span className="flex items-center gap-2">
                <span className="text-[#B45309]">{item.icon}</span>
                <span>{item.label}</span>
              </span>
              {item.badge && (
                <span className="px-2 py-0.5 rounded bg-amber-500/15 text-[#B45309] text-[10px] font-black">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
