import React, { useState } from 'react';
import {
  Leaf,
  Phone,
  ShieldCheck,
  Truck,
  ShoppingBag,
  Menu,
  X,
  ArrowRight,
  Award,
} from 'lucide-react';
import {
  EditableText,
  EditableButton,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface OrganicFruitsNavbarProps {
  title: string;
  subtitle: string;
  variant: DoctorVariantId;
  primaryColor: string;
  isDark?: boolean;
}

export const OrganicFruitsNavbar: React.FC<OrganicFruitsNavbarProps> = ({
  title,
  subtitle,
  variant,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [noticeToast, setNoticeToast] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const triggerBannerToast = (msg: string) => {
    setNoticeToast(msg);
    setTimeout(() => setNoticeToast(null), 2600);
  };

  return (
    <header
      className="sticky top-0 z-30 w-full border-b transition-all"
      style={{
        backgroundColor: variant === 'varient_3' ? '#132A1E' : '#FCF9F2',
        borderColor: variant === 'varient_3' ? '#1E3F2E' : '#E6DFD3',
        color: variant === 'varient_3' ? '#FAF6EE' : '#1F2937',
        fontFamily: "'Plus Jakarta Sans', 'Hind Siliguri', sans-serif",
      }}
    >
      {/* Top Bilingual Orchard & Formalin-Free Guarantee Ticker */}
      <div
        className="w-full px-4 py-2 text-[11px] sm:text-xs font-bold border-b"
        style={{
          backgroundColor: variant === 'varient_2' ? '#D97706' : '#14532D',
          borderColor: 'rgba(255,255,255,0.15)',
          color: '#FEFCE8',
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-2 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-[#FDE047] shrink-0" />
              <span>১০০% ফরমালিন ও কার্বাইড মুক্ত গ্যারান্টি (BCSIR Lab Tested)</span>
            </span>
            <span className="opacity-50">|</span>
            <span>গাছপাকা আম ও খাঁটি খেজুরের গুড় সরাসরি বাগান থেকে ঢাকায়</span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono bg-black/25 px-2.5 py-0.5 rounded text-[#FDE047]">
            <Truck size={12} />
            <span>Next Harvest Dispatch: Sunday 6:00 AM (Rajshahi &amp; Natore)</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-3">
        {/* Brand Emblem */}
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center border shadow-xs shrink-0"
            style={{
              background: 'linear-gradient(135deg, #14532D 0%, #166534 100%)',
              borderColor: '#D97706',
              color: '#FDE047',
            }}
          >
            <Leaf size={20} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <EditableText
                id="organic_nav_brand_title"
                defaultText={
                  title || 'Seasonal Organic Fruits & Pure Sweets'
                }
                as="span"
                className="text-base sm:text-lg font-extrabold tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              />
              <span className="hidden xl:inline-block px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#14532D]/10 text-[#14532D] border border-[#14532D]/25">
                বাগান থেকে সরাসরি
              </span>
            </div>
            <p className="text-[11px] opacity-75 hidden sm:block">
              {subtitle || 'আম, খেজুরের গুড় ও কেমিক্যাল-মুক্ত ফল • Direct Orchard to Dhaka'}
            </p>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-bold">
          <button
            type="button"
            onClick={() => scrollToSection('organic-harvest-counter')}
            className="hover:text-[#D97706] transition cursor-pointer"
          >
            হার্ভেস্ট ব্যাচ (Harvest Batch)
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('organic-product-lineup')}
            className="hover:text-[#D97706] transition cursor-pointer"
          >
            আম, লিচু ও গুড় (Catalog)
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('organic-lab-guarantee')}
            className="hover:text-[#D97706] transition cursor-pointer"
          >
            ল্যাব টেস্ট ও গ্যারান্টি (Lab QA)
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('organic-bulk-calculator')}
            className="hover:text-[#D97706] transition cursor-pointer flex items-center gap-1"
          >
            <Award size={13} className="text-[#D97706]" />
            <span>কর্পোরেট গিফট বক্স (২০ কেজি+)</span>
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              triggerBannerToast(
                'অর্গানিক অর্চার্ড হটলাইন: +880 1713-882400 (কর্পোরেট ও ফ্যামিলি অর্ডার)'
              )
            }
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-bold cursor-pointer"
            style={{
              backgroundColor: variant === 'varient_3' ? '#1E3F2E' : '#FFFFFF',
              borderColor: '#E6DFD3',
              color: variant === 'varient_3' ? '#FAF6EE' : '#14532D',
            }}
          >
            <Phone size={14} className="text-[#D97706]" />
            <span className="hidden xl:inline font-mono">+880 1713-882400</span>
          </button>

          <EditableButton
            id="organic_nav_preorder_cta"
            defaultText="প্রি-অর্ডার বুক করুন (Pre-Order Batch)"
            backgroundColor="#D97706"
            textColor="#FFFFFF"
            leftIcon={<ShoppingBag size={14} />}
            rightIcon={<ArrowRight size={13} />}
            onClick={() => scrollToSection('organic-cod-order-form')}
            className="px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-extrabold shadow-md transition hover:opacity-95 cursor-pointer"
          />

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-[#E6DFD3]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {noticeToast && (
        <div className="bg-[#14532D] text-[#FEFCE8] text-xs font-bold px-4 py-2 text-center">
          {noticeToast}
        </div>
      )}

      {mobileMenuOpen && (
        <div
          className="lg:hidden px-4 py-4 border-t space-y-3"
          style={{
            backgroundColor: '#FCF9F2',
            borderColor: '#E6DFD3',
            color: '#1F2937',
          }}
        >
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => scrollToSection('organic-harvest-counter')}
              className="p-2.5 rounded-xl bg-white border border-[#E6DFD3] text-left"
            >
              হার্ভেস্ট কাউন্টার
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('organic-product-lineup')}
              className="p-2.5 rounded-xl bg-white border border-[#E6DFD3] text-left"
            >
              আম, লিচু ও গুড়
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('organic-lab-guarantee')}
              className="p-2.5 rounded-xl bg-white border border-[#E6DFD3] text-left"
            >
              ফরমালিন টেস্ট গ্যারান্টি
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('organic-bulk-calculator')}
              className="p-2.5 rounded-xl bg-white border border-[#E6DFD3] text-left"
            >
              কর্পোরেট বক্স (২০ কেজি+)
            </button>
          </div>
          <button
            type="button"
            onClick={() => scrollToSection('organic-cod-order-form')}
            className="w-full py-3 rounded-xl text-xs font-extrabold text-white flex items-center justify-center gap-2"
            style={{ backgroundColor: '#14532D' }}
          >
            <ShoppingBag size={14} />
            <span>কেমিক্যাল-মুক্ত ব্যাচে অর্ডার করুন</span>
          </button>
        </div>
      )}
    </header>
  );
};
