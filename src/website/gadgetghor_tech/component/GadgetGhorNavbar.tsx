import React, { useState, useEffect } from 'react';
import {
  Cpu,
  ShoppingBag,
  Menu,
  X,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Zap,
  Headphones,
  Watch,
  BatteryCharging,
  Gamepad2,
  ArrowUpRight,
  Clock,
  QrCode,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface GadgetGhorNavbarProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

export const GadgetGhorNavbar: React.FC<GadgetGhorNavbarProps> = ({
  title,
  variant,
  primaryColor,
  isDark,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavKey, setActiveNavKey] = useState<string>('gadgets');
  const [activeCatChip, setActiveCatChip] = useState<string>('all');

  // Live Express Delivery Countdown Ticker (2 hrs 15 mins)
  const [secondsLeft, setSecondsLeft] = useState(2 * 3600 + 15 * 60 + 42);
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 60 ? prev - 1 : 2 * 3600 + 15 * 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hrs = Math.floor(secondsLeft / 3600);
  const mins = Math.floor((secondsLeft % 3600) / 60);
  const secs = secondsLeft % 60;

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
      key: 'gadgets',
      id: 'gadgetghor-catalog',
      label: 'Shop Gadgets',
      bn: 'অল গ্যাজেট',
      icon: Headphones,
    },
    {
      key: 'specs',
      id: 'gadgetghor-spec-matrix',
      label: 'Spec Matrix',
      bn: 'স্পেক তুলনা',
      icon: Cpu,
    },
    {
      key: 'serial',
      id: 'gadgetghor-serial-verify',
      label: 'Serial Check',
      bn: 'অরিজিনাল যাচাই',
      icon: QrCode,
      badge: '100% AUTHENTIC',
    },
    {
      key: 'combos',
      id: 'gadgetghor-checkout',
      label: 'Flash Combos',
      bn: 'কম্বো ডিল',
      icon: Zap,
      badge: 'SAVE ৳900',
    },
    {
      key: 'warranty',
      id: 'gadgetghor-reviews-warranty',
      label: 'Warranty Portal',
      bn: '৭ দিনের রিপ্লেসমেন্ট',
      icon: ShieldCheck,
    },
  ];

  const categoryQuickChips = [
    {
      id: 'all',
      label: 'All Smart Gear · সব গ্যাজেট',
      badge: '100% Original Stock',
      icon: Sparkles,
    },
    {
      id: 'tws',
      label: 'Audio & TWS · গেমিং ইয়ারবাডস (38ms)',
      badge: 'ENC Calling',
      icon: Headphones,
    },
    {
      id: 'watch',
      label: 'Smartwatches · AMOLED ওয়াচ',
      badge: 'BT Calling + IP68',
      icon: Watch,
    },
    {
      id: 'power',
      label: 'GaN Chargers & Power · ফাস্ট চার্জার',
      badge: '65W–100W GaN',
      icon: BatteryCharging,
    },
    {
      id: 'gaming',
      label: 'Mechanical Keyboards · গেমিং গিয়ার',
      badge: 'Hot-Swappable RGB',
      icon: Gamepad2,
    },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors ${
        isDark
          ? 'bg-[#070B14]/95 text-white border-b border-cyan-500/20'
          : 'bg-white/95 text-slate-900 border-b border-slate-200'
      } backdrop-blur-xl`}
    >
      {/* Top Express Delivery Countdown Ticker + Official Warranty Strip */}
      <div
        className="w-full px-4 py-1.5 text-[11px] font-bold tracking-wide text-white"
        style={{
          background: 'linear-gradient(90deg, #060B19 0%, #0F172A 50%, #060B19 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-950 shadow-xs"
              style={{ backgroundColor: '#00F5D4' }}
            >
              <ShieldCheck size={11} />
              7-DAY INSTANT REPLACEMENT
            </span>
            <EditableText
              id="gadgetghor_nav_top_announcement"
              defaultText="১০০% অরিজিনাল গ্লোবাল ভ্যারিয়েন্ট · ৭ দিনের ইনস্ট্যান্ট রিপ্লেসমেন্ট ও ৬/১২ মাসের অফিশিয়াল ওয়ারেন্টি গ্যারান্টি"
              className="text-slate-100 truncate max-w-[270px] sm:max-w-none"
            />
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] text-slate-300">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-extrabold">
              <Clock size={12} className="text-cyan-400 animate-pulse" />
              <span>
                Order within{' '}
                <strong className="font-mono text-white">
                  {String(hrs).padStart(2, '0')}h : {String(mins).padStart(2, '0')}m :{' '}
                  {String(secs).padStart(2, '0')}s
                </strong>{' '}
                for Same-Day Dhaka Delivery (Outside Dhaka 24–48 Hrs)
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Single-Line Tech Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-[70px] flex items-center justify-between gap-3">
        {/* Brand Identity */}
        <div
          className={`flex items-center gap-3 shrink-0 ${
            isCentered ? 'mx-auto lg:mx-0' : ''
          }`}
        >
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-white shadow-md shrink-0 ${
              isBrutalist
                ? 'rounded-none border-2 border-cyan-400 shadow-[3px_3px_0px_#00F5D4]'
                : 'rounded-xl'
            }`}
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, #0891B2)`,
            }}
          >
            <Cpu size={21} strokeWidth={2.3} />
          </div>

          <div className="leading-none">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <EditableText
                id="gadgetghor_nav_brand_title"
                defaultText={title || 'GadgetGhor BD (গ্যাজেটঘর)'}
                className="text-base sm:text-lg font-black tracking-tight"
              />
              <span
                className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest text-white"
                style={{ backgroundColor: primaryColor }}
              >
                OFFICIAL TECH STORE
              </span>
            </div>
            <EditableText
              id="gadgetghor_nav_brand_Sub"
              defaultText="TWS Audio · AMOLED Watch · 100W GaN · Gaming Gear"
              className="block text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1 whitespace-nowrap"
            />
          </div>
        </div>

        {/* Center Segmented Pill Nav */}
        <nav
          aria-label="GadgetGhor Primary Navigation"
          className={`hidden xl:flex items-center p-1 rounded-2xl border ${
            isDark
              ? 'bg-slate-900/90 border-slate-800'
              : 'bg-slate-100/90 border-slate-200/80'
          }`}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNavKey === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => scrollToSection(item.id, item.key)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon
                  size={13}
                  style={{ color: isActive ? primaryColor : undefined }}
                  className={isActive ? '' : 'opacity-70'}
                />
                <span>{item.label}</span>
                <span className="text-[10px] opacity-65 font-semibold hidden 2xl:inline">
                  · {item.bn}
                </span>
                {item.badge && (
                  <span
                    className="ml-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-black tracking-wider text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Serial Verify + Flash COD CTA */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => scrollToSection('gadgetghor-serial-verify', 'serial')}
            className={`px-3 py-2 rounded-xl text-xs font-extrabold border flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap ${
              isDark
                ? 'border-cyan-500/30 bg-cyan-950/30 hover:bg-cyan-900/40 text-cyan-300'
                : 'border-cyan-600/30 bg-cyan-50/80 hover:bg-cyan-100/80 text-cyan-950'
            }`}
          >
            <QrCode size={14} style={{ color: primaryColor }} />
            <EditableText
              id="gadgetghor_nav_serial_btn"
              defaultText="Verify Serial / IMEI"
            />
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('gadgetghor-checkout', 'combos')}
            className={`px-4 py-2 text-xs font-black text-white flex items-center gap-1.5 transition shadow-md hover:opacity-95 cursor-pointer whitespace-nowrap ${
              isBrutalist
                ? 'rounded-none border-2 border-slate-950 shadow-[3px_3px_0px_#0F172A]'
                : 'rounded-xl'
            }`}
            style={{ backgroundColor: primaryColor }}
          >
            <ShoppingBag size={14} />
            <EditableText
              id="gadgetghor_nav_cod_cta"
              defaultText="অর্ডার করুন (COD)"
            />
            <ArrowUpRight size={13} />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex xl:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => scrollToSection('gadgetghor-checkout', 'combos')}
            className="sm:hidden px-3 py-1.5 rounded-lg text-[11px] font-black text-white whitespace-nowrap"
            style={{ backgroundColor: primaryColor }}
          >
            অর্ডার করুন
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle GadgetGhor Menu"
            className={`p-2 rounded-xl border cursor-pointer ${
              isDark
                ? 'border-slate-800 bg-slate-900 text-slate-200'
                : 'border-slate-200 bg-slate-50 text-slate-800'
            }`}
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {/* Sub-header Category Filter Strip */}
      <div
        className={`hidden md:block border-t ${
          isDark
            ? 'border-slate-800/80 bg-[#0B1120]/90'
            : 'border-slate-100 bg-slate-50/90'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 whitespace-nowrap mr-1">
              Shop By Category:
            </span>
            {categoryQuickChips.map((chip) => {
              const ChipIcon = chip.icon;
              const isSelected = activeCatChip === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => {
                    setActiveCatChip(chip.id);
                    scrollToSection('gadgetghor-catalog', 'gadgets');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition whitespace-nowrap cursor-pointer border ${
                    isSelected
                      ? 'text-white border-transparent shadow-xs'
                      : isDark
                      ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      : 'bg-white border-slate-200/90 text-slate-700 hover:border-slate-300'
                  }`}
                  style={isSelected ? { backgroundColor: primaryColor } : undefined}
                >
                  <ChipIcon
                    size={12}
                    style={{ color: isSelected ? '#FFFFFF' : primaryColor }}
                  />
                  <span>{chip.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[9px] font-extrabold ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {chip.badge}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap shrink-0">
            <CheckCircle2 size={13} className="text-emerald-500" />
            <EditableText
              id="gadgetghor_nav_sub_guarantee"
              defaultText="Steadfast / Pathao Express COD · ডেলিভারি ম্যানের সামনে আনবক্সিং সুবিধা"
            />
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div
          className={`xl:hidden px-4 pt-3 pb-5 border-t space-y-3 ${
            isDark
              ? 'bg-slate-950 border-slate-800 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-300">
              <Clock size={14} /> Same-Day Dhaka Dispatch Cutoff:
            </span>
            <span className="font-mono font-black">
              {String(hrs).padStart(2, '0')}h:{String(mins).padStart(2, '0')}m:
              {String(secs).padStart(2, '0')}s
            </span>
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => scrollToSection(item.id, item.key)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs font-bold border ${
                    isDark
                      ? 'border-slate-800 bg-slate-900/70 hover:bg-slate-900'
                      : 'border-slate-200/80 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon size={15} style={{ color: primaryColor }} />
                    <span>{item.label}</span>
                    <span className="text-[11px] opacity-65">· {item.bn}</span>
                  </span>
                  {item.badge && (
                    <span
                      className="px-2 py-0.5 rounded-full text-[9px] font-black text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
