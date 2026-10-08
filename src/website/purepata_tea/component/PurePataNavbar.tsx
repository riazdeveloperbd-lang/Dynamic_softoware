import React, { useState } from 'react';
import {
  Leaf,
  ShoppingBag,
  Sparkles,
  Menu,
  X,
  CheckCircle2,
  Clock,
  RefreshCw,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface PurePataNavbarProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

export const PurePataNavbar: React.FC<PurePataNavbarProps> = ({
  title,
  variant,
  primaryColor = '#1E4620',
  isDark = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('traceability');
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
          ? 'bg-[#0C1712] text-stone-100 border-b border-emerald-950/80'
          : 'bg-[#FAF7F2] text-[#1C2822] border-b border-[#E4DFD5]'
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

      {/* Slim Dismissible Top Estate Harvest Announcement Bar */}
      {!isCompact && (
        <div
          className="text-stone-100 text-[11px] py-2 px-4 sm:px-6 border-b border-black/10"
          style={{ backgroundColor: primaryColor }}
        >
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-medium">
              <Leaf size={13} className="text-amber-300 shrink-0" />
              <span>
                <EditableText
                  id="purepata_top_bar"
                  defaultText="শ্রীমঙ্গল ও পঞ্চগড়ের বাগান থেকে সরাসরি সংগৃহীত · ১০০% কেমিক্যাল ও কৃত্রিম ফ্লেভার মুক্ত · সারা বাংলাদেশে ক্যাশ অন ডেলিভারি"
                />
              </span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-stone-200">
              <span>Autumn Flush Batch #SR-26 · Plucked 72 Hours Ago</span>
              <span>·</span>
              <span className="text-amber-300 font-semibold">
                মাসিক রিফিল বক্সে ১৫% ছাড় + ফ্রি ডেলিভারি
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Strictly 3-Zone Top Bar Contract */}
      <header
        className={`max-w-7xl mx-auto px-4 sm:px-6 ${
          isEditorial ? 'py-5' : 'py-4'
        } flex items-center justify-between gap-6`}
      >
        {/* Zone 1: Single Text Element Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('purepata-hero-section', 'home');
          }}
          className="text-lg sm:text-xl font-black tracking-tight whitespace-nowrap shrink-0"
          style={{
            fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif",
            color: isDark ? '#F5F5F0' : primaryColor,
          }}
        >
          <EditableText
            id="purepata_brand_wordmark"
            defaultText={title || 'PurePata Botanicals'}
          />
        </a>

        {/* Zone 2: 5 Single-Line Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold opacity-85">
          {[
            {
              key: 'traceability',
              label: 'Garden-to-Cup Traceability',
              target: 'purepata-traceability-section',
            },
            {
              key: 'catalog',
              label: '5 Signature Blends',
              target: 'purepata-catalog-section',
            },
            {
              key: 'steeping',
              label: 'Interactive Brewing Guide',
              target: 'purepata-steeping-section',
            },
            {
              key: 'subscription',
              label: 'Monthly Refill Box (-15%)',
              target: 'purepata-subscription-section',
            },
            {
              key: 'reviews',
              label: 'Connoisseur Notes',
              target: 'purepata-reviews-footer-section',
            },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => scrollToSection(item.target, item.key)}
              className={`whitespace-nowrap shrink-0 py-1 transition-colors cursor-pointer border-b-2 ${
                activeNav === item.key
                  ? 'font-bold opacity-100'
                  : 'border-transparent opacity-75 hover:opacity-100'
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
              scrollToSection('purepata-steeping-section', 'steeping')
            }
            className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold border transition cursor-pointer whitespace-nowrap ${
              isDark
                ? 'bg-emerald-950/60 border-emerald-800 text-stone-200 hover:bg-emerald-900/60'
                : 'bg-[#F2ECE1] border-[#DED6C6] text-[#1C2822] hover:bg-[#E8E0D2]'
            }`}
          >
            <Clock size={13} style={{ color: primaryColor }} />
            <span>ব্রিউইং গাইড</span>
          </button>

          <button
            type="button"
            onClick={() =>
              scrollToSection('purepata-subscription-section', 'subscription')
            }
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-extrabold text-white shadow-xs hover:opacity-95 transition cursor-pointer whitespace-nowrap"
            style={{ backgroundColor: primaryColor }}
          >
            <ShoppingBag size={13} />
            <span>চা অর্ডার করুন</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg border cursor-pointer ${
              isDark
                ? 'bg-emerald-950 border-emerald-800 text-stone-200'
                : 'bg-[#F2ECE1] border-[#DED6C6] text-[#1C2822]'
            }`}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-t px-4 py-4 space-y-2 ${
            isDark
              ? 'bg-[#0E1B15] border-emerald-900 text-stone-100'
              : 'bg-[#FAF7F2] border-[#E4DFD5] text-[#1C2822]'
          }`}
        >
          {[
            {
              key: 'traceability',
              label: 'Garden-to-Cup Traceability (বাগান থেকে সরাসরি)',
              target: 'purepata-traceability-section',
            },
            {
              key: 'catalog',
              label: '5 Signature Tea & Wellness Blends (পণ্য তালিকা)',
              target: 'purepata-catalog-section',
            },
            {
              key: 'steeping',
              label: 'Interactive Steeping & Brewing Guide (চা তৈরির নিয়ম)',
              target: 'purepata-steeping-section',
            },
            {
              key: 'subscription',
              label: 'Monthly Tea Refill Box — Save 15% + COD Checkout',
              target: 'purepata-subscription-section',
            },
            {
              key: 'reviews',
              label: 'Tea Connoisseur & Wellness Reviews',
              target: 'purepata-reviews-footer-section',
            },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => scrollToSection(item.target, item.key)}
              className="w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold hover:opacity-80 transition flex items-center justify-between"
            >
              <span>{item.label}</span>
              <span className="text-[10px] opacity-60">→</span>
            </button>
          ))}
          <div className="pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] opacity-80">
            <span>Tea Sommelier Desk: 01711-884920</span>
            <button
              type="button"
              onClick={() =>
                triggerNotice('Connecting to PurePata Tea Sommelier...')
              }
              className="font-bold underline cursor-pointer"
              style={{ color: primaryColor }}
            >
              Ask a Tea Sommelier
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
