import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  ShoppingBag,
  Truck,
  RefreshCw,
  ShieldCheck,
  Menu,
  X,
  ArrowRight,
} from 'lucide-react';
import {
  EditableText,
  EditableButton,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface PanjabiStoreNavbarProps {
  title: string;
  subtitle: string;
  variant: DoctorVariantId;
  primaryColor: string;
  isDark?: boolean;
}

export const PanjabiStoreNavbar: React.FC<PanjabiStoreNavbarProps> = ({
  title,
  subtitle,
  variant,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickDialToast, setQuickDialToast] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const triggerNotice = (msg: string) => {
    setQuickDialToast(msg);
    setTimeout(() => setQuickDialToast(null), 2600);
  };

  return (
    <header
      className="sticky top-0 z-30 w-full border-b transition-all"
      style={{
        backgroundColor: variant === 'varient_3' ? '#111827' : '#FAF8F5',
        borderColor: variant === 'varient_3' ? '#1F2937' : '#E5E7EB',
        color: variant === 'varient_3' ? '#FFFDF9' : '#1F2937',
        fontFamily: "'Plus Jakarta Sans', 'Hind Siliguri', sans-serif",
      }}
    >
      {/* Top Dual-Language Announcement Ticker Bar */}
      <div
        className="w-full px-4 py-2 text-[11px] sm:text-xs font-bold border-b"
        style={{
          backgroundColor: variant === 'varient_2' ? '#E05242' : '#0F5132',
          borderColor: 'rgba(255,255,255,0.14)',
          color: '#FFFDF9',
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-2 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5">
              <Truck size={13} className="text-[#FDE68A] shrink-0" />
              <span>সারা বাংলাদেশে ক্যাশ অন ডেলিভারি</span>
            </span>
            <span className="opacity-50">|</span>
            <span>ঢাকার ভিতরে ৳৭০, ঢাকার বাইরে ৳১৩০</span>
            <span className="hidden md:inline opacity-50">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-[#FDE68A]">
              <RefreshCw size={12} />
              <span>৩ দিনে সাইজ না মিললে রিটার্ন গ্যারান্টি (Free 3-Day Exchange)</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono bg-black/20 px-2.5 py-0.5 rounded">
            <ShieldCheck size={12} className="text-[#FDE68A]" />
            <span>Steadfast &amp; Pathao Express COD Verified</span>
          </div>
        </div>
      </div>

      {/* Main Header Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
        {/* Brand Logo: AURA Apparel (আউরা) */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex flex-col items-center justify-center border shadow-xs"
            style={{
              backgroundColor: '#0F5132',
              borderColor: '#E05242',
              color: '#FFFDF9',
            }}
          >
            <span
              className="text-sm font-black tracking-widest leading-none"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              AURA
            </span>
            <span className="text-[9px] font-bold text-[#FDE68A] mt-0.5 leading-none">
              আউরা
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <EditableText
                id="aura_nav_brand_title"
                defaultText={title || 'AURA Apparel (আউরা)'}
                as="span"
                className="text-lg sm:text-xl font-bold tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              />
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#0F5132]/10 text-[#0F5132] border border-[#0F5132]/25">
                D2C DHAKA
              </span>
            </div>
            <p className="text-[11px] opacity-70 hidden sm:block">
              {subtitle || 'Premium Cotton Kabli Panjabi & Drop-Shoulder Micro-Collection'}
            </p>
          </div>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold">
          <button
            type="button"
            onClick={() => scrollToSection('aura-hero-showcase')}
            className="hover:text-[#0F5132] transition cursor-pointer"
          >
            কালেকশন (Collection)
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('aura-size-guide')}
            className="hover:text-[#0F5132] transition cursor-pointer"
          >
            📏 সাইজ গাইড (Size Guide)
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('aura-fabric-quality')}
            className="hover:text-[#0F5132] transition cursor-pointer"
          >
            ফেব্রিক ও গ্যারান্টি (Fabric QA)
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('aura-customer-reviews')}
            className="hover:text-[#0F5132] transition cursor-pointer"
          >
            কাস্টমার রিভিউ (Reviews)
          </button>
        </nav>

        {/* Right Quick-Dial, WhatsApp Direct Chat & Floating Order CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick-Dial Phone Button */}
          <button
            type="button"
            onClick={() =>
              triggerNotice('হটলাইন নম্বর: +880 1711-948200 (সকাল ১০টা - রাত ১১টা)')
            }
            title="Call Hotline: +880 1711-948200"
            className="p-2.5 rounded-xl border transition hover:opacity-90 flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            style={{
              backgroundColor: variant === 'varient_3' ? '#1F2937' : '#FFFDF9',
              borderColor: '#E5E7EB',
              color: variant === 'varient_3' ? '#FFFDF9' : '#1F2937',
            }}
          >
            <Phone size={15} className="text-[#0F5132]" />
            <span className="hidden xl:inline font-mono">+880 1711-948200</span>
          </button>

          {/* WhatsApp Direct Chat Link */}
          <button
            type="button"
            onClick={() =>
              triggerNotice('WhatsApp Live Support খোলা হয়েছে — সাইজ বা অর্ডার নিয়ে মেসেজ দিন!')
            }
            className="px-3 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition hover:opacity-90 cursor-pointer"
            style={{
              backgroundColor: 'rgba(15, 81, 50, 0.1)',
              borderColor: 'rgba(15, 81, 50, 0.3)',
              color: variant === 'varient_3' ? '#6EE7B7' : '#0F5132',
            }}
          >
            <MessageCircle size={15} />
            <span className="hidden sm:inline">WhatsApp চ্যাট</span>
          </button>

          {/* Primary Floating "অর্ডার করুন (Order Now)" CTA Button */}
          <EditableButton
            id="aura_nav_order_cta"
            defaultText="অর্ডার করুন (Order Now)"
            backgroundColor="#E05242"
            textColor="#FFFDF9"
            leftIcon={<ShoppingBag size={14} />}
            rightIcon={<ArrowRight size={13} />}
            onClick={() => scrollToSection('aura-cod-checkout')}
            className="px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-extrabold shadow-md transition hover:opacity-95 cursor-pointer"
          />

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-[#E5E7EB]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Inline Toast Feedback */}
      {quickDialToast && (
        <div className="bg-[#111827] text-[#FFFDF9] text-xs font-bold px-4 py-2 text-center border-t border-[#1F2937]">
          {quickDialToast}
        </div>
      )}

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden px-4 py-4 border-t space-y-3"
          style={{
            backgroundColor: '#FFFDF9',
            borderColor: '#E5E7EB',
            color: '#1F2937',
          }}
        >
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => scrollToSection('aura-hero-showcase')}
              className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5E7EB] text-left"
            >
              কালেকশন (Product)
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('aura-size-guide')}
              className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5E7EB] text-left"
            >
              📏 সাইজ গাইড (Size Guide)
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('aura-fabric-quality')}
              className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5E7EB] text-left"
            >
              ফেব্রিক গ্যারান্টি (GSM)
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('aura-customer-reviews')}
              className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5E7EB] text-left"
            >
              কাস্টমার রিভিউ (Reviews)
            </button>
          </div>
          <button
            type="button"
            onClick={() => scrollToSection('aura-cod-checkout')}
            className="w-full py-3 rounded-xl text-xs font-extrabold text-white flex items-center justify-center gap-2"
            style={{ backgroundColor: '#0F5132' }}
          >
            <ShoppingBag size={14} />
            <span>ক্যাশ অন ডেলিভারিতে অর্ডার করুন</span>
          </button>
        </div>
      )}
    </header>
  );
};
