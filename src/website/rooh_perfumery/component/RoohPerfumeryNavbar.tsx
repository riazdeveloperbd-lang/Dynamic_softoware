import React, { useState } from 'react';
import {
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  Menu,
  X,
  CheckCircle2,
  PackageSearch,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface RoohPerfumeryNavbarProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

export const RoohPerfumeryNavbar: React.FC<RoohPerfumeryNavbarProps> = ({
  title,
  variant,
  primaryColor = '#C6934B',
  isDark = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2600);
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
          ? 'bg-[#0D0A09] text-[#F5EFE6] border-b border-[#2C211B]'
          : 'bg-[#F9F6F0] text-[#17120E] border-b border-[#E6DEC8]'
      }`}
    >
      {/* Floating Toast */}
      {toastMsg && (
        <div
          className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl text-xs font-extrabold text-stone-950 shadow-2xl flex items-center gap-2"
          style={{ backgroundColor: primaryColor }}
        >
          <CheckCircle2 size={15} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Universal Halal / 100% Alcohol-Free Trust Bar */}
      {!isCompact && (
        <div className="bg-[#120D0A] text-[#F5EFE6] text-[11px] py-2 px-4 sm:px-6 border-b border-[#2C211B]">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-semibold">
              <ShieldCheck
                size={13}
                style={{ color: primaryColor }}
                className="shrink-0"
              />
              <span>
                <EditableText
                  id="rooh_top_halal_seal"
                  defaultText="১০০% অ্যালকোহল-মুক্ত ও হালাল সার্টিফাইড (IFANCA & BSTI) · নামাজ ও জুম্মার জন্য শতভাগ পবিত্র · ১২–২৪ ঘণ্টা লং-লাস্টিং গ্যারান্টি"
                />
              </span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-stone-300">
              <span style={{ color: primaryColor }} className="font-bold">
                যেকোনো ৫টি ৩মিলি টেস্টার ভায়াল মাত্র ৳৪৯৯
              </span>
              <span>·</span>
              <span>সারা বাংলাদেশে ক্যাশ অন ডেলিভারি (COD)</span>
            </div>
          </div>
        </div>
      )}

      {/* Strictly 3-Zone Top Navigation Bar */}
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
            scrollToSection('rooh-hero-section', 'home');
          }}
          className="text-lg sm:text-xl font-black tracking-tight whitespace-nowrap shrink-0"
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            color: isDark ? '#F5EFE6' : '#17120E',
          }}
        >
          <EditableText
            id="rooh_brand_wordmark"
            defaultText={title || 'ROOH PERFUMERY · রুহ সুগন্ধি'}
          />
        </a>

        {/* Zone 2: 5 Required Site Structure Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold opacity-85">
          {[
            {
              key: 'home',
              label: 'Home & Scent Pyramid',
              target: 'rooh-pyramid-section',
            },
            {
              key: 'shop_all',
              label: 'Shop All (Attar · Clones · Bakhoor)',
              target: 'rooh-catalog-section',
            },
            {
              key: 'discovery',
              label: '৳499 Discovery Bundle (5 Vials)',
              target: 'rooh-discovery-builder-section',
            },
            {
              key: 'our_essence',
              label: 'About Us (Our Essence)',
              target: 'rooh-essence-track-section',
            },
            {
              key: 'track_order',
              label: 'Track Order & Returns',
              target: 'rooh-essence-track-section',
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
              scrollToSection('rooh-essence-track-section', 'track_order')
            }
            className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold border transition cursor-pointer whitespace-nowrap ${
              isDark
                ? 'bg-[#17120E] border-[#2C211B] text-[#F5EFE6] hover:bg-[#231B15]'
                : 'bg-[#F1ECE1] border-[#E0D6C3] text-[#17120E] hover:bg-[#E6DEC8]'
            }`}
          >
            <PackageSearch size={13} style={{ color: primaryColor }} />
            <span>অর্ডার ট্র্যাক</span>
          </button>

          <button
            type="button"
            onClick={() =>
              scrollToSection('rooh-discovery-builder-section', 'discovery')
            }
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-extrabold text-stone-950 shadow-xs hover:opacity-95 transition cursor-pointer whitespace-nowrap"
            style={{ backgroundColor: primaryColor }}
          >
            <Sparkles size={13} />
            <span>৫টি টেস্টার ৳৪৯৯</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg border cursor-pointer ${
              isDark
                ? 'bg-[#17120E] border-[#2C211B] text-[#F5EFE6]'
                : 'bg-[#F1ECE1] border-[#E0D6C3] text-[#17120E]'
            }`}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-t px-4 py-4 space-y-2 ${
            isDark
              ? 'bg-[#120D0A] border-[#2C211B] text-[#F5EFE6]'
              : 'bg-[#F9F6F0] border-[#E6DEC8] text-[#17120E]'
          }`}
        >
          {[
            {
              key: 'home',
              label: 'Home & Visual Fragrance Pyramid (নোটস ও লংজিভিটি মিটার)',
              target: 'rooh-pyramid-section',
            },
            {
              key: 'shop_all',
              label: 'Shop All: Pure Attars, Designer Clones, Bakhoor & Sprays',
              target: 'rooh-catalog-section',
            },
            {
              key: 'discovery',
              label: 'Interactive ৳499 Discovery Bundle Builder (৫টি ভায়াল বাছাই)',
              target: 'rooh-discovery-builder-section',
            },
            {
              key: 'our_essence',
              label: 'About Us: Cambodian Oud & Taif Rose Sourcing',
              target: 'rooh-essence-track-section',
            },
            {
              key: 'track_order',
              label: 'Track Order & 7-Day Scent Exchange Policy',
              target: 'rooh-essence-track-section',
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
            <span>Attar Concierge: 01819-550911</span>
            <button
              type="button"
              onClick={() =>
                triggerToast('Connecting to Rooh Perfumery Scent Concierge...')
              }
              className="font-bold underline cursor-pointer"
              style={{ color: primaryColor }}
            >
              Scent Recommendation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
