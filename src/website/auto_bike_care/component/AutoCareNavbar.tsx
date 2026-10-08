import React, { useState } from 'react';
import {
  Wrench,
  ShieldCheck,
  Truck,
  PhoneCall,
  Search,
  ShoppingBag,
  Menu,
  X,
  CheckCircle2,
  Zap,
  Sparkles,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface AutoCareNavbarProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

export const AutoCareNavbar: React.FC<AutoCareNavbarProps> = ({
  title,
  variant,
  primaryColor = '#E11D48',
  isDark = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('fitment');
  const [quickToast, setQuickToast] = useState<string | null>(null);

  const triggerNotice = (msg: string) => {
    setQuickToast(msg);
    setTimeout(() => setQuickToast(null), 2400);
  };

  const scrollToSection = (id: string, key: string) => {
    setActiveNav(key);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isEditorial = variant === 'varient_2';
  const isCompact = variant === 'varient_3';

  return (
    <div
      className={`w-full transition-colors ${
        isDark
          ? 'bg-[#090D16] text-slate-100 border-b border-slate-800'
          : 'bg-[#0F172A] text-white border-b border-slate-800'
      }`}
    >
      {/* Toast Notification */}
      {quickToast && (
        <div
          className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl text-xs font-extrabold text-white shadow-xl flex items-center gap-2"
          style={{ backgroundColor: primaryColor }}
        >
          <CheckCircle2 size={15} />
          <span>{quickToast}</span>
        </div>
      )}

      {/* Slim Dismissible Top COD & Fitment Bar */}
      {!isCompact && (
        <div className="bg-[#060911] text-slate-300 border-b border-slate-800/80 text-[11px] py-2 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-medium">
              <Zap size={13} className="text-amber-400 shrink-0" />
              <span>
                <EditableText
                  id="auto_top_bar_announcement"
                  defaultText="সারা বাংলাদেশে ক্যাশ অন ডেলিভারি (COD) · ঢাকায় ২৪ ঘণ্টায় এক্সপ্রেস ডেলিভারি · ১০০% জেনুইন ইমপোর্টেড গিয়ার"
                />
              </span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-slate-400">
              <span>হেল্পলাইন: +880 1711-948200 (10AM – 10PM)</span>
              <span>·</span>
              <span className="text-emerald-400 font-semibold">
                ৭ দিনের ফিটমেন্ট এক্সচেঞ্জ গ্যারান্টি
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Strictly 3-Zone Top Bar Contract */}
      <header
        className={`max-w-7xl mx-auto px-4 sm:px-6 ${
          isEditorial ? 'py-5' : 'py-3.5'
        } flex items-center justify-between gap-6`}
      >
        {/* Zone 1: Single Text Element Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('auto-hero-section', 'home');
          }}
          className="text-lg sm:text-xl font-black tracking-tight text-white whitespace-nowrap shrink-0"
        >
          <EditableText
            id="auto_nav_brand_title"
            defaultText={title || 'TorqueGear BD'}
          />
        </a>

        {/* Zone 2: 5 Single-Line Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-300">
          {[
            {
              key: 'fitment',
              label: 'Vehicle Fitment Checker',
              target: 'auto-compatibility-section',
            },
            {
              key: 'catalog',
              label: '5-Star Gear Lineup',
              target: 'auto-catalog-section',
            },
            {
              key: 'comparison',
              label: 'Before & After Lab',
              target: 'auto-comparison-section',
            },
            {
              key: 'bundles',
              label: 'Combo Bundles & COD',
              target: 'auto-bundles-cod-section',
            },
            {
              key: 'reviews',
              label: 'Rider & Driver Proof',
              target: 'auto-reviews-footer-section',
            },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => scrollToSection(item.target, item.key)}
              className={`whitespace-nowrap shrink-0 py-1 transition-colors cursor-pointer border-b-2 ${
                activeNav === item.key
                  ? 'text-white border-rose-500 font-bold'
                  : 'border-transparent hover:text-white hover:border-slate-600'
              }`}
              style={
                activeNav === item.key ? { borderColor: primaryColor } : undefined
              }
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 2 Primary Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() =>
              scrollToSection('auto-compatibility-section', 'fitment')
            }
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 transition cursor-pointer whitespace-nowrap"
          >
            <Wrench size={13} className="text-amber-400" />
            <span>মডেল চেক করুন</span>
          </button>

          <button
            type="button"
            onClick={() =>
              scrollToSection('auto-bundles-cod-section', 'bundles')
            }
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-extrabold text-white shadow-sm hover:opacity-95 transition cursor-pointer whitespace-nowrap"
            style={{ backgroundColor: primaryColor }}
          >
            <ShoppingBag size={13} />
            <span>অর্ডার করুন (COD)</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B1120] border-t border-slate-800 px-4 py-4 space-y-2">
          {[
            {
              key: 'fitment',
              label: 'Vehicle Fitment Checker (গাড়ি ও বাইক মডেল চেক)',
              target: 'auto-compatibility-section',
            },
            {
              key: 'catalog',
              label: '5-Star Gear Lineup (সিরামিক স্প্রে, ইন্টারকম ও ওয়াশার)',
              target: 'auto-catalog-section',
            },
            {
              key: 'comparison',
              label: 'Before & After Detailing Results (রেজাল্ট কম্পারিজন)',
              target: 'auto-comparison-section',
            },
            {
              key: 'bundles',
              label: 'Biker & Car Combo Kits + Express COD',
              target: 'auto-bundles-cod-section',
            },
            {
              key: 'reviews',
              label: 'Verified Rider & Driver Reviews',
              target: 'auto-reviews-footer-section',
            },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => scrollToSection(item.target, item.key)}
              className="w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold text-slate-200 hover:bg-slate-800 transition flex items-center justify-between"
            >
              <span>{item.label}</span>
              <span className="text-[10px] text-slate-400">→</span>
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Helpline: 01711-948200</span>
            <button
              type="button"
              onClick={() =>
                triggerNotice('Connecting to TorqueGear BD Fitment Specialist...')
              }
              className="text-amber-400 font-bold underline cursor-pointer"
            >
              Call Fitment Expert
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
