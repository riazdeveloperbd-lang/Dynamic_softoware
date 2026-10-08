import React, { useState } from 'react';
import {
  Sparkles,
  ShoppingBag,
  Menu,
  X,
  CheckCircle2,
  Droplets,
  Flame,
  Gift,
  BookOpen,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface RoohNavbarProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

export const RoohNavbar: React.FC<RoohNavbarProps> = ({
  title,
  subtitle,
  variant,
  isDark = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePageTab, setActivePageTab] = useState<
    'home' | 'shop_all' | 'discovery' | 'our_essence'
  >('home');

  const scrollToSection = (
    id: string,
    tab?: 'home' | 'shop_all' | 'discovery' | 'our_essence'
  ) => {
    if (tab) setActivePageTab(tab);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className="w-full border-b transition-colors sticky top-0 z-30"
      style={{
        backgroundColor: isDark ? '#0B0907' : '#FBF8F3',
        borderColor: isDark ? '#2A2218' : '#E2D6C3',
        color: isDark ? '#F9F6F0' : '#18130E',
      }}
    >
      {/* Top Halal & Purity Guarantee Bar */}
      <div
        className="w-full py-2 px-4 text-[11px] sm:text-xs font-semibold border-b"
        style={{
          backgroundColor: '#16110C',
          borderColor: '#2A2218',
          color: '#F5E6C8',
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[#D4AF37] font-bold">
              <CheckCircle2 size={13} />
              <EditableText
                id="rooh_nav_top_badge"
                defaultText="১০০% অ্যালকোহল-মুক্ত ও হালাল (100% Alcohol-Free & Prayer Safe)"
              />
            </span>
            <span className="hidden md:inline opacity-40">|</span>
            <span className="hidden md:inline text-[#E8DFD1]">
              <EditableText
                id="rooh_nav_top_sub"
                defaultText={
                  subtitle ||
                  'সিলেটের আগরউড, সৌদি তাইফ গোলাপ ও ফরাসি ক্লোন অয়েল · সারা বাংলাদেশে ক্যাশ অন ডেলিভারি'
                }
              />
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden sm:inline-flex items-center gap-1 text-[#D4AF37]">
              <Flame size={12} />
              <span>সিলেট ও কম্বোডিয়ান আগরউড · তাইফ গোলাপ</span>
            </span>
            <span className="font-mono font-bold text-[#F5E6C8]">
              ৪৮+ ঘণ্টা লং-লাস্টিং প্রজেকশন
            </span>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Luxury Perfumery Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Emblem & Identity */}
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-[#0B0907] shadow-md border shrink-0"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #AA7C11 100%)',
              borderColor: '#F3E5AB',
            }}
          >
            <Droplets size={21} className="stroke-[2.3]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className="text-lg sm:text-xl font-black tracking-tight"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: isDark ? '#F9F6F0' : '#18130E',
                }}
              >
                <EditableText
                  id="rooh_nav_brand"
                  defaultText={title || 'Rooh Perfumery (রুহ সুগন্ধি)'}
                />
              </span>
              <span
                className="hidden sm:inline-block text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded border"
                style={{
                  backgroundColor: isDark ? 'rgba(212, 175, 55, 0.14)' : '#F5EAD4',
                  color: isDark ? '#D4AF37' : '#85580A',
                  borderColor: 'rgba(212, 175, 55, 0.45)',
                }}
              >
                Extrait D&apos;Attar
              </span>
            </div>
            <p
              className="text-[11px] font-semibold"
              style={{ color: isDark ? '#C8B9A6' : '#574635' }}
            >
              <EditableText
                id="rooh_nav_tagline"
                defaultText="Artisanal Halal Attar · Aged Oud & Bakhoor House"
              />
            </p>
          </div>
        </div>

        {/* Zone 2: Site Structure Navigation (Home, Shop All, Discovery Bundles, Our Essence) */}
        <nav
          className={`hidden lg:flex items-center gap-6 text-xs font-bold ${
            variant === 'varient_2'
              ? 'px-5 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-black/5'
              : ''
          }`}
        >
          <button
            type="button"
            onClick={() => scrollToSection('rooh-hero-scent-finder', 'home')}
            className={`transition cursor-pointer flex items-center gap-1.5 ${
              activePageTab === 'home'
                ? 'text-[#B38600] dark:text-[#D4AF37] font-extrabold'
                : 'opacity-80 hover:opacity-100'
            }`}
          >
            <Sparkles size={13} className="text-[#C59B27]" />
            <span>Home &amp; Scent Quiz</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('rooh-shop-all-catalog', 'shop_all')}
            className={`transition cursor-pointer flex items-center gap-1.5 ${
              activePageTab === 'shop_all'
                ? 'text-[#B38600] dark:text-[#D4AF37] font-extrabold'
                : 'opacity-80 hover:opacity-100'
            }`}
          >
            <Droplets size={13} className="text-[#C59B27]" />
            <span>Shop All (আতর ও বাখুর)</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('rooh-discovery-cod', 'discovery')}
            className={`transition cursor-pointer flex items-center gap-1.5 ${
              activePageTab === 'discovery'
                ? 'text-[#B38600] dark:text-[#D4AF37] font-extrabold'
                : 'opacity-80 hover:opacity-100'
            }`}
          >
            <Gift size={13} className="text-[#C59B27]" />
            <span>Discovery Bundles (৫টি টেস্টার প্যাক)</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('rooh-our-essence-reviews', 'our_essence')}
            className={`transition cursor-pointer flex items-center gap-1.5 ${
              activePageTab === 'our_essence'
                ? 'text-[#B38600] dark:text-[#D4AF37] font-extrabold'
                : 'opacity-80 hover:opacity-100'
            }`}
          >
            <BookOpen size={13} className="text-[#C59B27]" />
            <span>Our Essence (আসল ও নকলের পার্থক্য)</span>
          </button>
        </nav>

        {/* Zone 3: Primary Discovery Kit CTA */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => scrollToSection('rooh-discovery-cod', 'discovery')}
            className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-[#0B0907] shadow-md flex items-center gap-2 transition hover:opacity-95 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #F3E5AB 50%, #C59B27 100%)',
            }}
          >
            <ShoppingBag size={14} />
            <span>ডিসকভারি বক্স অর্ডার করুন</span>
            <span className="hidden sm:inline px-1.5 py-0.5 rounded bg-black/15 text-[#0B0907] text-[10px] font-black">
              ৳৯৯০
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border cursor-pointer"
            style={{
              borderColor: isDark ? '#2A2218' : '#D6C7B2',
            }}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Sub-navigation bar showing Required Site Structure Categories */}
      <div
        className="hidden md:block border-t py-2 px-4 text-[11px]"
        style={{
          backgroundColor: isDark ? '#120E0A' : '#F3EDE2',
          borderColor: isDark ? '#241C14' : '#E2D6C3',
          color: isDark ? '#E8DFD1' : '#2C2218',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5 font-bold">
            <span
              className="font-extrabold uppercase tracking-wider"
              style={{ color: isDark ? '#D4AF37' : '#8A5D0B' }}
            >
              Shop Sub-Categories:
            </span>
            <button
              type="button"
              onClick={() => scrollToSection('rooh-shop-all-catalog', 'shop_all')}
              className="hover:underline transition cursor-pointer"
            >
              ১. Pure Attars (খাঁটি আতর ও আগরউড)
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => scrollToSection('rooh-shop-all-catalog', 'shop_all')}
              className="hover:underline transition cursor-pointer"
            >
              ২. Designer Inspirations (ফরাসি ক্লোন অয়েল)
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => scrollToSection('rooh-shop-all-catalog', 'shop_all')}
              className="hover:underline transition cursor-pointer"
            >
              ৩. Bakhoor &amp; Burners (অ্যারাবিয়ান বাখুর ও বার্নার)
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => scrollToSection('rooh-shop-all-catalog', 'shop_all')}
              className="hover:underline transition cursor-pointer"
            >
              ৪. Pocket Sprays (নন-অ্যালকোহলিক পকেট স্প্রে)
            </button>
          </div>
          <span
            className="text-[11px] font-extrabold"
            style={{ color: isDark ? '#10B981' : '#047857' }}
          >
            ✓ জুম্মা ও ঈদ স্পেশাল: সারা বাংলাদেশে ক্যাশ অন ডেলিভারি
          </span>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden border-t px-4 py-4 space-y-2.5 text-xs font-bold"
          style={{
            backgroundColor: isDark ? '#0B0907' : '#FBF8F3',
            borderColor: isDark ? '#2A2218' : '#E6DCCB',
          }}
        >
          <button
            type="button"
            onClick={() => scrollToSection('rooh-hero-scent-finder', 'home')}
            className="block w-full text-left py-2 hover:text-[#D4AF37]"
          >
            Home &amp; Scent Profile Quiz (ইন্টারেক্টিভ কুইজ)
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('rooh-shop-all-catalog', 'shop_all')}
            className="block w-full text-left py-2 hover:text-[#D4AF37]"
          >
            Shop All: Pure Attars, Designer Clones, Bakhoor &amp; Pocket Sprays
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('rooh-discovery-cod', 'discovery')}
            className="block w-full text-left py-2 hover:text-[#D4AF37]"
          >
            Discovery Bundles (৫টি মিনি টেস্টার ভায়াল প্যাক)
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('rooh-our-essence-reviews', 'our_essence')}
            className="block w-full text-left py-2 hover:text-[#D4AF37]"
          >
            Our Essence (কম্বোডিয়ান উদ, তাইফ গোলাপ ও ১০০% হালাল গ্যারান্টি)
          </button>
        </div>
      )}
    </header>
  );
};
