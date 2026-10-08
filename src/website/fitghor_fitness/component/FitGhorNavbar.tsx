import React, { useState } from 'react';
import {
  Dumbbell,
  ShoppingBag,
  Menu,
  X,
  CheckCircle2,
  Zap,
  FileText,
  Trophy,
  Truck,
  Sparkles,
  Scale,
  HeartPulse,
  ArrowUpRight,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface FitGhorNavbarProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

export const FitGhorNavbar: React.FC<FitGhorNavbarProps> = ({
  title,
  subtitle,
  variant,
  isDark = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'home' | 'shop_all' | 'workout_pdf' | 'success_stories' | 'checkout'
  >('home');
  const [activeCategory, setActiveCategory] = useState<'all' | 'strength' | 'yoga' | 'trackers'>('all');

  const scrollToSection = (
    id: string,
    tab?: 'home' | 'shop_all' | 'workout_pdf' | 'success_stories' | 'checkout'
  ) => {
    if (tab) setActiveTab(tab);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navItems: {
    id: 'home' | 'shop_all' | 'workout_pdf' | 'success_stories' | 'checkout';
    targetId: string;
    label: string;
    badge?: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'home',
      targetId: 'fitghor-hero-specs',
      label: 'হোম ও স্পেকস',
      icon: <Zap size={13} />,
    },
    {
      id: 'shop_all',
      targetId: 'fitghor-shop-all-gear',
      label: 'সব জিম গিয়ার',
      icon: <Dumbbell size={13} />,
    },
    {
      id: 'workout_pdf',
      targetId: 'fitghor-free-workout-pdf',
      label: 'ফ্রি ওয়ার্কআউট গাইড',
      badge: 'FREE PDF',
      icon: <FileText size={13} />,
    },
    {
      id: 'success_stories',
      targetId: 'fitghor-success-stories',
      label: 'সাকসেস স্টোরি',
      icon: <Trophy size={13} />,
    },
    {
      id: 'checkout',
      targetId: 'fitghor-bd-checkout',
      label: 'ক্যাশ অন ডেলিভারি',
      icon: <Truck size={13} />,
    },
  ];

  return (
    <header
      className="w-full sticky top-0 z-30 transition-colors border-b backdrop-blur-md"
      style={{
        backgroundColor: isDark ? 'rgba(11, 15, 23, 0.96)' : 'rgba(255, 255, 255, 0.97)',
        borderColor: isDark ? '#1E293B' : '#E2E8F0',
        color: isDark ? '#F8FAFC' : '#0F172A',
      }}
    >
      {/* Row 1: Compact Top Promo & 4G Speed Bar */}
      <div
        className="w-full py-1.5 px-4 text-[11px] font-medium border-b"
        style={{
          backgroundColor: '#0B0F17',
          borderColor: '#1E293B',
          color: '#E2E8F0',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FF4500] text-white text-[10px] font-extrabold uppercase tracking-wider shrink-0">
              <Zap size={11} />
              HOT OFFER
            </span>
            <span className="font-semibold text-slate-200 truncate">
              <EditableText
                id="fitghor_nav_top_sub"
                defaultText={
                  subtitle ||
                  'ঢাকার জ্যাম ও মাসিক জিম ফি বাদ দিন — প্রতিটি অর্ডারের সাথে ফ্রি ৩০ দিনের হোম ওয়ার্কআউট গাইড PDF!'
                }
              />
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0 text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              4G Fast Load (.WebP)
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300 font-semibold">
              Steadfast · Pathao · RedX COD
            </span>
          </div>
        </div>
      </div>

      {/* Row 2: Clean Single-Line Main Header (No Wrapping) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[70px] flex items-center justify-between gap-3">
        {/* Left: Crisp Brand Identity */}
        <div
          onClick={() => scrollToSection('fitghor-hero-specs', 'home')}
          className="flex items-center gap-3 cursor-pointer shrink-0 group"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #FF4500 0%, #EA580C 100%)',
            }}
          >
            <Dumbbell size={20} className="stroke-[2.5]" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span
                className="text-base sm:text-lg font-black tracking-tight whitespace-nowrap leading-none"
                style={{ color: isDark ? '#F8FAFC' : '#0F172A' }}
              >
                <EditableText
                  id="fitghor_nav_brand"
                  defaultText={title || 'FitGhor (ফিটঘর)'}
                />
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-[#FF4500]/12 text-[#EA580C] dark:text-[#FB923C] border border-[#FF4500]/25 whitespace-nowrap">
                HOME GYM BD
              </span>
            </div>
            <span
              className="text-[11px] font-medium whitespace-nowrap mt-1 hidden sm:block"
              style={{ color: isDark ? '#94A3B8' : '#64748B' }}
            >
              <EditableText
                id="fitghor_nav_tagline"
                defaultText="Smart At-Home Fitness & Wellness Gear · শূন্য জ্যাম, ১০০% ফিটনেস"
              />
            </span>
          </div>
        </div>

        {/* Center: Clean Segmented Pill Navigation (Single Line, Zero Wrapping) */}
        <nav
          className={`hidden xl:flex items-center gap-1 p-1 rounded-xl border ${
            variant === 'varient_2'
              ? 'border-[#FF4500]/40 bg-[#FF4500]/5'
              : isDark
              ? 'bg-[#111827] border-slate-800'
              : 'bg-slate-100/90 border-slate-200/80'
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
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <span
                  className={
                    isActive
                      ? 'text-[#FF4500]'
                      : item.id === 'workout_pdf'
                      ? 'text-emerald-500'
                      : 'opacity-70'
                  }
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Sleek Single-Line CTA Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => scrollToSection('fitghor-free-workout-pdf', 'workout_pdf')}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold border whitespace-nowrap transition cursor-pointer"
            style={{
              backgroundColor: isDark ? 'rgba(16, 185, 129, 0.1)' : '#ECFDF5',
              borderColor: isDark ? 'rgba(16, 185, 129, 0.3)' : '#A7F3D0',
              color: isDark ? '#34D399' : '#047857',
            }}
          >
            <FileText size={13} />
            <span>ফ্রি ৩০ দিনের PDF</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('fitghor-bd-checkout', 'checkout')}
            className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-white shadow-sm hover:opacity-95 transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #FF4500 0%, #EA580C 100%)',
            }}
          >
            <ShoppingBag size={14} />
            <span>হোম জিম অর্ডার করুন</span>
            <ArrowUpRight size={14} className=" opacity-90" />
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

      {/* Row 3: Clean Category Filter Pill Strip (Replaces Cluttered Text Sub-Bar) */}
      <div
        className="hidden md:block border-t py-2 px-4"
        style={{
          backgroundColor: isDark ? '#0F1420' : '#F8FAFC',
          borderColor: isDark ? '#1E293B' : '#E2E8F0',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span
              className="text-[11px] font-extrabold uppercase tracking-wider mr-1 flex items-center gap-1 shrink-0"
              style={{ color: isDark ? '#94A3B8' : '#64748B' }}
            >
              <Sparkles size={12} className="text-[#FF4500]" />
              ক্যাটাগরি:
            </span>

            {[
              {
                id: 'strength' as const,
                label: 'Strength · ডাম্বেল ও রেজিস্ট্যান্স ব্যান্ড',
                icon: <Dumbbell size={12} />,
              },
              {
                id: 'yoga' as const,
                label: 'Wellness & Yoga · ৮ মিমি নন-স্লিপ ইয়োগা ম্যাট',
                icon: <HeartPulse size={12} />,
              },
              {
                id: 'trackers' as const,
                label: 'Smart Trackers · ব্লুটুথ বডি ফ্যাট স্কেল',
                icon: <Scale size={12} />,
              },
            ].map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    scrollToSection('fitghor-shop-all-gear', 'shop_all');
                  }}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 border transition cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#FF4500] text-white border-[#FF4500]'
                      : isDark
                      ? 'bg-[#161F30] text-slate-300 border-slate-800 hover:border-[#FF4500]/50'
                      : 'bg-white text-slate-700 border-slate-200/90 hover:border-[#FF4500]/50 hover:text-[#EA580C]'
                  }`}
                >
                  <span className={active ? 'text-white' : 'text-[#FF4500]'}>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 shrink-0 text-[11px] font-bold">
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={13} />
              ১ বছরের রিপ্লেসমেন্ট ওয়ারেন্টি
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span style={{ color: isDark ? '#CBD5E1' : '#475569' }}>
              ঢাকায় ২৪ ঘণ্টায় এক্সপ্রেস ডেলিভারি
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="xl:hidden border-t px-4 py-4 space-y-2 text-xs font-bold shadow-xl"
          style={{
            backgroundColor: isDark ? '#0B0F17' : '#FFFFFF',
            borderColor: isDark ? '#1E293B' : '#E2E8F0',
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.targetId, item.id)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition text-left"
            >
              <span className="flex items-center gap-2">
                <span className="text-[#FF4500]">{item.icon}</span>
                <span>{item.label}</span>
              </span>
              {item.badge && (
                <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-500 text-[10px] font-black">
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-emerald-600 dark:text-emerald-400 px-2">
            <span className="flex items-center gap-1.5 font-bold">
              <CheckCircle2 size={13} /> ১০০% ক্যাশ অন ডেলিভারি ও ১ বছর ওয়ারেন্টি
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
