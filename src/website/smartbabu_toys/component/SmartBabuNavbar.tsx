import React, { useState } from 'react';
import {
  Baby,
  ShoppingBag,
  Menu,
  X,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Volume2,
  Gift,
  HeartHandshake,
  ArrowUpRight,
  BookOpen,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface SmartBabuNavbarProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

export const SmartBabuNavbar: React.FC<SmartBabuNavbarProps> = ({
  title,
  subtitle,
  variant,
  isDark = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'home' | 'shop_age' | 'audio_demo' | 'safety_cert' | 'gift_checkout' | 'parent_community'
  >('home');
  const [selectedAgeQuick, setSelectedAgeQuick] = useState<'all' | '0-12m' | '1-3y' | '3-6y'>('1-3y');

  const scrollToSection = (
    id: string,
    tab?: 'home' | 'shop_age' | 'audio_demo' | 'safety_cert' | 'gift_checkout' | 'parent_community'
  ) => {
    if (tab) setActiveTab(tab);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navItems: {
    id: 'home' | 'shop_age' | 'audio_demo' | 'safety_cert' | 'gift_checkout' | 'parent_community';
    targetId: string;
    label: string;
    badge?: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'home',
      targetId: 'smartbabu-hero-age',
      label: 'হোম ও বয়স ফিল্টার',
      icon: <Baby size={13} />,
    },
    {
      id: 'shop_age',
      targetId: 'smartbabu-catalog-safety',
      label: 'লার্নিং খেলনা ও কেয়ার',
      icon: <BookOpen size={13} />,
    },
    {
      id: 'audio_demo',
      targetId: 'smartbabu-audio-preview',
      label: 'অডিও বুক প্রিভিউ',
      badge: 'LISTEN NOW',
      icon: <Volume2 size={13} />,
    },
    {
      id: 'safety_cert',
      targetId: 'smartbabu-safety-badges',
      label: '১০০% BPA-Free সেফটি',
      icon: <ShieldCheck size={13} />,
    },
    {
      id: 'gift_checkout',
      targetId: 'smartbabu-gift-checkout',
      label: 'আকিকা ও গিফট বক্স',
      icon: <Gift size={13} />,
    },
    {
      id: 'parent_community',
      targetId: 'smartbabu-parent-reviews',
      label: 'মায়েদের রিভিউ',
      icon: <HeartHandshake size={13} />,
    },
  ];

  return (
    <header
      className="w-full sticky top-0 z-30 transition-colors border-b backdrop-blur-md"
      style={{
        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.96)' : 'rgba(255, 253, 249, 0.97)',
        borderColor: isDark ? '#1E293B' : '#E2E8F0',
        color: isDark ? '#F8FAFC' : '#0F172A',
      }}
    >
      {/* Row 1: Nurturing Top Trust Strip */}
      <div
        className="w-full py-1.5 px-4 text-[11px] font-medium border-b"
        style={{
          backgroundColor: isDark ? '#091516' : '#0D5C63',
          borderColor: isDark ? '#134E4A' : '#0F766E',
          color: '#F0FDFA',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F97316] text-white text-[10px] font-extrabold uppercase tracking-wider shrink-0">
              <ShieldCheck size={11} />
              100% BABY SAFE
            </span>
            <span className="font-semibold text-teal-50 truncate">
              <EditableText
                id="smartbabu_nav_top_sub"
                defaultText={
                  subtitle ||
                  'মোবাইল স্ক্রিন ছাড়াই সোনামণির মেধা বিকাশ — ১০০% BPA-Free, ফুড-গ্রেড ও নন-টক্সিক লার্নিং খেলনা · সারা বাংলাদেশে ক্যাশ অন ডেলিভারি'
                }
              />
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0 text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-amber-300 font-bold">
              <Sparkles size={12} />
              Pediatrician &amp; Montessori Approved
            </span>
            <span className="text-teal-500">|</span>
            <span className="text-teal-100 font-semibold">
              আকিকা ও জন্মদিনের প্রিমিয়াম গিফট র‍্যাপিং সুবিধা
            </span>
          </div>
        </div>
      </div>

      {/* Row 2: Clean Single-Line Main Header (Zero Wrapping) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[70px] flex items-center justify-between gap-3">
        {/* Left: Brand Identity */}
        <div
          onClick={() => scrollToSection('smartbabu-hero-age', 'home')}
          className="flex items-center gap-3 cursor-pointer shrink-0 group"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
            }}
          >
            <Baby size={21} className="stroke-[2.3]" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span
                className="text-base sm:text-lg font-black tracking-tight whitespace-nowrap leading-none"
                style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}
              >
                <EditableText
                  id="smartbabu_nav_brand"
                  defaultText={title || 'SmartBabu (স্মার্টবাবু)'}
                />
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-teal-500/12 text-teal-700 dark:text-teal-300 border border-teal-500/25 whitespace-nowrap">
                MONTESSORI &amp; SAFE
              </span>
            </div>
            <span
              className="text-[11px] font-medium whitespace-nowrap mt-1 hidden sm:block"
              style={{ color: isDark ? '#94A3B8' : '#64748B' }}
            >
              <EditableText
                id="smartbabu_nav_tagline"
                defaultText="Educational Toys & Baby Care Essentials · স্ক্রিন-ফ্রি শৈশব ও নিরাপদ যত্ন"
              />
            </span>
          </div>
        </div>

        {/* Center: Clean Segmented Pill Navigation (Single Line, Zero Wrapping) */}
        <nav
          className={`hidden xl:flex items-center gap-1 p-1 rounded-xl border ${
            variant === 'varient_2'
              ? 'border-teal-500/40 bg-teal-500/5'
              : isDark
              ? 'bg-[#111827] border-slate-800'
              : 'bg-amber-50/70 border-amber-200/70'
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
                      ? 'bg-[#1E293B] text-white shadow-xs'
                      : 'bg-white text-slate-900 shadow-xs'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
                }`}
              >
                <span
                  className={
                    isActive
                      ? 'text-[#0D9488]'
                      : item.id === 'audio_demo'
                      ? 'text-[#F97316]'
                      : 'opacity-75'
                  }
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-[#F97316]/15 text-[#EA580C] dark:text-[#FB923C] border border-[#F97316]/25">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Single-Line Action CTAs */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => scrollToSection('smartbabu-audio-preview', 'audio_demo')}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold border whitespace-nowrap transition cursor-pointer"
            style={{
              backgroundColor: isDark ? 'rgba(249, 115, 22, 0.12)' : '#FFF7ED',
              borderColor: isDark ? 'rgba(249, 115, 22, 0.35)' : '#FED7AA',
              color: isDark ? '#FB923C' : '#C2410C',
            }}
          >
            <Volume2 size={13} />
            <span>টকিং বুক শুনুন</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('smartbabu-gift-checkout', 'gift_checkout')}
            className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-white shadow-sm hover:opacity-95 transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
            }}
          >
            <ShoppingBag size={14} />
            <span>বাবুর জন্য অর্ডার করুন</span>
            <ArrowUpRight size={14} className="opacity-90" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl border cursor-pointer"
            style={{
              borderColor: isDark ? '#1E293B' : '#E2E8F0',
              backgroundColor: isDark ? '#111827' : '#F8FAFC',
            }}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Row 3: Sticky Age-Based Quick-Tap Filter Bar (0-12M | 1-3Y | 3-6Y) */}
      <div
        className="hidden md:block border-t py-2 px-4"
        style={{
          backgroundColor: isDark ? '#0B131E' : '#F0FDFA',
          borderColor: isDark ? '#1E293B' : '#CCFBF1',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span
              className="text-[11px] font-extrabold uppercase tracking-wider mr-1 flex items-center gap-1.5 shrink-0"
              style={{ color: isDark ? '#5EEAD4' : '#0F766E' }}
            >
              <Sparkles size={12} className="text-[#F97316]" />
              সোনামণির বয়স অনুযায়ী ফিল্টার (Shop by Age):
            </span>

            {[
              {
                id: '0-12m' as const,
                label: '০–১২ মাস (Infants · Anti-Colic ও Sensory)',
              },
              {
                id: '1-3y' as const,
                label: '১–৩ বছর (Toddlers · টকিং বুক ও মন্টেসরি পাজল)',
              },
              {
                id: '3-6y' as const,
                label: '৩–৬ বছর (Preschoolers · প্রি-স্কুল লার্নিং কিট)',
              },
              {
                id: 'all' as const,
                label: 'সব বয়সের প্রোডাক্ট (All Ages)',
              },
            ].map((age) => {
              const active = selectedAgeQuick === age.id;
              return (
                <button
                  key={age.id}
                  type="button"
                  onClick={() => {
                    setSelectedAgeQuick(age.id);
                    scrollToSection('smartbabu-catalog-safety', 'shop_age');
                  }}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 border transition cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#0D9488] text-white border-[#0D9488] shadow-xs'
                      : isDark
                      ? 'bg-[#162032] text-slate-300 border-slate-800 hover:border-teal-500/50'
                      : 'bg-white text-slate-700 border-teal-200 hover:border-[#0D9488] hover:text-[#0F766E]'
                  }`}
                >
                  <span>{age.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 shrink-0 text-[11px] font-bold">
            <span className="inline-flex items-center gap-1 text-teal-700 dark:text-teal-300">
              <CheckCircle2 size={13} className="text-[#0D9488]" />
              100% BPA-Free &amp; Non-Toxic Paint
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="xl:hidden border-t px-4 py-4 space-y-2 text-xs font-bold shadow-xl"
          style={{
            backgroundColor: isDark ? '#0F172A' : '#FFFDF9',
            borderColor: isDark ? '#1E293B' : '#E2E8F0',
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.targetId, item.id)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-teal-500/10 transition text-left"
            >
              <span className="flex items-center gap-2">
                <span className="text-[#0D9488]">{item.icon}</span>
                <span>{item.label}</span>
              </span>
              {item.badge && (
                <span className="px-2 py-0.5 rounded bg-[#F97316]/15 text-[#EA580C] text-[10px] font-black">
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
