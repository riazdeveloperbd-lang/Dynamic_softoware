import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  PlayCircle,
  BookOpen,
  Trophy,
  CreditCard,
  Menu,
  X,
  Flame,
  Sparkles,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface EduTectNavbarProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

export const EduTectNavbar: React.FC<EduTectNavbarProps> = ({
  title,
  variant,
  primaryColor,
  isDark,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavKey, setActiveNavKey] = useState<string>('curriculum');

  const royalIndigo = '#1E1B4B';
  const electricBlue = primaryColor || '#2563EB';
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

  const handleOpenDemoModal = () => {
    window.dispatchEvent(new CustomEvent('edutect:open-demo-video'));
    const currEl = document.getElementById('edutect-curriculum');
    if (currEl) {
      currEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    {
      key: 'credentials',
      id: 'edutect-credentials',
      label: 'Mentor Credentials',
      sub: 'IELTS 8.5 · Ex-Cadet · IBA/BUET',
      icon: Award,
    },
    {
      key: 'curriculum',
      id: 'edutect-curriculum',
      label: 'Course Curriculum',
      sub: '4 Modules · Free Video Previews',
      icon: BookOpen,
    },
    {
      key: 'proof',
      id: 'edutect-proof',
      label: 'Student Scorecards',
      sub: 'Band 8.0+ · BCS Cadres · 4.9★',
      icon: Trophy,
    },
    {
      key: 'enrollment',
      id: 'edutect-enrollment',
      label: 'Batch Pricing & MFS',
      sub: 'Live Batch ৳3,000 · bKash/Nagad',
      icon: CreditCard,
    },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors backdrop-blur-xl ${
        isDark
          ? 'bg-[#0F0E26]/95 text-slate-100 border-b border-indigo-900/60'
          : 'bg-white/95 text-[#1E1B4B] border-b border-slate-200'
      }`}
    >
      {/* Top Batch Urgency & Trust Ticker */}
      <div
        className="w-full px-4 py-2 text-[11px] sm:text-xs font-semibold text-white"
        style={{ backgroundColor: royalIndigo }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider text-slate-950 shrink-0"
              style={{ backgroundColor: '#F59E0B' }}
            >
              <Flame size={11} />
              BATCH 18 ADMISSION LIVE
            </span>
            <EditableText
              id="edutect_top_ticker"
              defaultText="Next Batch Starts: Friday, 18 Oct | Only 12 Seats Remaining! • ইউজ করুন প্রোমো কোড EARLYBIRD এবং পান ৳৫০০ ইনস্ট্যান্ট ডিসকাউন্ট"
              className="text-indigo-100 truncate font-bold"
            />
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[11px] text-indigo-200 shrink-0">
            <span className="inline-flex items-center gap-1 font-bold text-amber-300">
              <CheckCircle2 size={12} />
              <span>25,000+ Students Mentored</span>
            </span>
            <span aria-hidden="true" className="text-indigo-700">·</span>
            <button
              type="button"
              onClick={() => scrollToSection('edutect-enrollment', 'enrollment')}
              className="text-white hover:text-amber-300 underline underline-offset-2 font-extrabold cursor-pointer"
            >
              Claim EarlyBird Seat (৳3,000) →
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-[74px] flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div
          className={`flex items-center gap-3 shrink-0 ${
            isCentered ? 'mx-auto lg:mx-0' : ''
          }`}
        >
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-white shadow-sm shrink-0 ${
              isBrutalist
                ? 'rounded-none border-2 border-[#1E1B4B] shadow-[3px_3px_0px_#D97706]'
                : 'rounded-2xl'
            }`}
            style={{ backgroundColor: electricBlue }}
          >
            <GraduationCap size={21} strokeWidth={2.3} />
          </div>

          <div className="leading-none">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <EditableText
                id="edutect_nav_brand_title"
                defaultText={title || 'EduTect BD'}
                className="text-base sm:text-lg font-black tracking-tight"
              />
              <span
                className="hidden sm:inline-block px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider text-white"
                style={{ backgroundColor: warmAmber }}
              >
                IELTS • BCS • SKILL COACHING
              </span>
            </div>
            <EditableText
              id="edutect_nav_brand_subtitle"
              defaultText="Bangladesh's Top-Rated Exam & Skill Mentorship Portal • লাইভ ব্যাচ ও রেকর্ডেড মাস্টারক্লাস"
              className="block text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-1 whitespace-nowrap"
            />
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav
          aria-label="EduTect Primary Navigation"
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
                    ? 'text-[#2563EB] dark:text-amber-400 font-extrabold'
                    : isDark
                    ? 'text-slate-300 hover:text-white'
                    : 'text-[#1E1B4B] hover:text-[#2563EB]'
                }`}
              >
                <span className="text-xs font-bold block">{item.label}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                  {item.sub}
                </span>
                <span
                  className={`absolute bottom-0 inset-x-0 h-0.5 rounded-full transition-transform origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                  style={{ backgroundColor: electricBlue }}
                />
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleOpenDemoModal}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
              isDark
                ? 'border-indigo-800 bg-indigo-950/60 text-indigo-100 hover:border-amber-400'
                : 'border-slate-200 bg-slate-50 text-[#1E1B4B] hover:border-[#2563EB]'
            }`}
          >
            <PlayCircle size={15} style={{ color: electricBlue }} />
            <span>Watch Free Demo</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('edutect-enrollment', 'enrollment')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:opacity-95 cursor-pointer ${
              isBrutalist
                ? 'rounded-none border-2 border-[#1E1B4B] shadow-[3px_3px_0px_#D97706]'
                : 'rounded-xl'
            }`}
            style={{ backgroundColor: electricBlue }}
          >
            <Sparkles size={14} className="text-amber-300" />
            <span>Enroll in Batch 18</span>
            <span
              className="px-1.5 py-0.5 rounded-full text-[10px] text-white font-black"
              style={{ backgroundColor: royalIndigo }}
            >
              ৳3,000
            </span>
          </button>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle Menu"
            className={`xl:hidden p-2 rounded-xl border cursor-pointer ${
              isDark
                ? 'border-indigo-800 bg-indigo-950 text-slate-200'
                : 'border-slate-200 bg-white text-slate-800'
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
              ? 'bg-[#0F0E26] border-indigo-900 text-slate-100'
              : 'bg-white border-slate-200 text-[#1E1B4B]'
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
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-bold hover:bg-slate-100 dark:hover:bg-indigo-950 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Icon size={14} style={{ color: electricBlue }} />
                    <span>{item.label}</span>
                  </span>
                  <span className="text-[11px] text-slate-500">{item.sub}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-indigo-900 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleOpenDemoModal}
              className="py-2.5 px-3 rounded-xl text-xs font-extrabold border border-[#2563EB] bg-white text-[#2563EB] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <PlayCircle size={14} />
              <span>Free Demo Class</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('edutect-enrollment', 'enrollment')}
              className="py-2.5 px-3 rounded-xl text-xs font-extrabold text-white flex items-center justify-center gap-1.5 cursor-pointer"
              style={{ backgroundColor: electricBlue }}
            >
              <Lock size={13} />
              <span>Enroll (৳3,000)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
