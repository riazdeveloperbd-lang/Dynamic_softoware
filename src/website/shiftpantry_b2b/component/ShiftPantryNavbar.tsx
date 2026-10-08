import React, { useState } from 'react';
import {
  Coffee,
  Calculator,
  Package,
  Leaf,
  Users,
  ShoppingBag,
  Menu,
  X,
  CheckCircle2,
  Sparkles,
  CalendarClock,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface ShiftPantryNavbarProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

export const ShiftPantryNavbar: React.FC<ShiftPantryNavbarProps> = ({
  title,
  variant,
  primaryColor,
  isDark,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavKey, setActiveNavKey] = useState<string>('calculator');

  const forestGreen = primaryColor || '#1B4332';
  const warmAmber = '#D97706';
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
      key: 'how',
      id: 'shiftpantry-how-it-works',
      label: 'How It Works',
      sub: '3-Step Office Autopilot',
      icon: Sparkles,
    },
    {
      key: 'calculator',
      id: 'shiftpantry-calculator',
      label: 'Volume Calculator',
      sub: 'Headcount & Hybrid Days',
      icon: Calculator,
    },
    {
      key: 'boxes',
      id: 'shiftpantry-boxes',
      label: 'Curated Boxes',
      sub: 'Snacks & Espresso Crates',
      icon: Package,
    },
    {
      key: 'dietary',
      id: 'shiftpantry-dietary',
      label: 'Dietary & Allergens',
      sub: 'Nut-Free · Vegan · GF · Keto',
      icon: Leaf,
    },
    {
      key: 'reviews',
      id: 'shiftpantry-testimonials',
      label: 'HR & Ops Reviews',
      sub: '400+ Hybrid Teams',
      icon: Users,
    },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors backdrop-blur-xl ${
        isDark
          ? 'bg-[#121916]/95 text-stone-100 border-b border-emerald-900/50'
          : 'bg-[#FDFBF7]/95 text-[#1F2937] border-b border-[#E5E0D8]'
      }`}
    >
      {/* Top Hospitality & B2B Perk Announcement Strip */}
      <div
        className="w-full px-4 py-2 text-[11px] sm:text-xs font-semibold text-white"
        style={{ backgroundColor: forestGreen }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider text-white shrink-0"
              style={{ backgroundColor: warmAmber }}
            >
              <CheckCircle2 size={11} />
              100% TAX-DEDUCTIBLE PERK
            </span>
            <EditableText
              id="shiftpantry_top_announcement"
              defaultText="Fueling 400+ Hybrid Offices · Corporate Net-30 Invoicing & Stripe Billing · Pause or Scale Anytime for Holiday Closures"
              className="text-stone-100 truncate"
            />
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[11px] text-emerald-100 shrink-0">
            <span className="inline-flex items-center gap-1 font-semibold">
              <CalendarClock size={12} className="text-amber-300" />
              <span>Starts at $1.85 / employee / in-office day</span>
            </span>
            <span aria-hidden="true" className="text-emerald-700">·</span>
            <button
              type="button"
              onClick={() => scrollToSection('shiftpantry-calculator', 'calculator')}
              className="text-amber-300 hover:text-white underline underline-offset-2 font-bold cursor-pointer"
            >
              Calculate Your Office Plan →
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-[74px] flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div
          className={`flex items-center gap-3 shrink-0 ${
            isCentered ? 'mx-auto lg:mx-0' : ''
          }`}
        >
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-white shadow-sm shrink-0 ${
              isBrutalist
                ? 'rounded-none border-2 border-[#1F2937] shadow-[3px_3px_0px_#D97706]'
                : 'rounded-2xl'
            }`}
            style={{ backgroundColor: forestGreen }}
          >
            <Coffee size={20} strokeWidth={2.3} />
          </div>

          <div className="leading-none">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <EditableText
                id="shiftpantry_nav_brand_title"
                defaultText={title || 'ShiftPantry'}
                className="text-base sm:text-lg font-black tracking-tight"
              />
              <span
                className="hidden sm:inline-block text-[10px] font-extrabold uppercase tracking-wider"
                style={{ color: warmAmber }}
              >
                HYBRID OFFICE AUTOPILOT
              </span>
            </div>
            <EditableText
              id="shiftpantry_nav_brand_subtitle"
              defaultText="Curated Healthy Snacks · Artisan Whole-Bean Coffee · Automated Restock"
              className="block text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400 mt-1 whitespace-nowrap"
            />
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav
          aria-label="ShiftPantry Primary Navigation"
          className="hidden xl:flex items-center gap-6"
        >
          {navItems.map((item) => {
            const isActive = activeNavKey === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => scrollToSection(item.id, item.key)}
                className={`group relative py-1 text-left transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-[#1B4332] dark:text-amber-400 font-extrabold'
                    : isDark
                    ? 'text-stone-300 hover:text-white'
                    : 'text-[#1F2937] hover:text-[#1B4332]'
                }`}
              >
                <span className="text-xs font-bold block">{item.label}</span>
                <span className="text-[10px] text-stone-500 dark:text-stone-400 block">
                  {item.sub}
                </span>
                <span
                  className={`absolute bottom-0 inset-x-0 h-0.5 rounded-full transition-transform origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                  style={{ backgroundColor: warmAmber }}
                />
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => scrollToSection('shiftpantry-calculator', 'calculator')}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
              isDark
                ? 'border-stone-700 bg-stone-900 text-stone-100 hover:border-amber-500'
                : 'border-[#D6CFC2] bg-white text-[#1F2937] hover:border-[#1B4332]'
            }`}
          >
            <Calculator size={14} style={{ color: warmAmber }} />
            <span>Calculate Office Plan</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('shiftpantry-checkout', 'boxes')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:opacity-95 cursor-pointer ${
              isBrutalist
                ? 'rounded-none border-2 border-[#1F2937] shadow-[3px_3px_0px_#D97706]'
                : 'rounded-xl'
            }`}
            style={{ backgroundColor: forestGreen }}
          >
            <ShoppingBag size={14} />
            <span>Subscribe Now</span>
            <span
              className="px-1.5 py-0.5 rounded-full text-[10px] text-white font-black"
              style={{ backgroundColor: warmAmber }}
            >
              3
            </span>
          </button>

          {/* Mobile Hamburger */}
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

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div
          className={`xl:hidden px-4 pt-3 pb-5 border-t space-y-3 ${
            isDark
              ? 'bg-[#121916] border-stone-800 text-stone-100'
              : 'bg-[#FDFBF7] border-stone-200 text-[#1F2937]'
          }`}
        >
          <div className="grid grid-cols-1 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => scrollToSection(item.id, item.key)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-bold hover:bg-stone-200/60 dark:hover:bg-stone-800 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Icon size={14} style={{ color: warmAmber }} />
                    <span>{item.label}</span>
                  </span>
                  <span className="text-[11px] text-stone-500">{item.sub}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-stone-200 dark:border-stone-800 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => scrollToSection('shiftpantry-calculator', 'calculator')}
              className="py-2.5 px-3 rounded-xl text-xs font-extrabold border border-[#1B4332] bg-white text-[#1B4332] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Calculator size={14} />
              <span>Office Calculator</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('shiftpantry-checkout', 'boxes')}
              className="py-2.5 px-3 rounded-xl text-xs font-extrabold text-white flex items-center justify-center gap-1.5 cursor-pointer"
              style={{ backgroundColor: forestGreen }}
            >
              <ShoppingBag size={14} />
              <span>Subscribe Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
