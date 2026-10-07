import React, { useState } from 'react';
import { Calendar, Menu, X, Compass } from 'lucide-react';
import {
  EditableText,
  EditableButton,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface TeacherNavbarProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

export const TeacherNavbar: React.FC<TeacherNavbarProps> = ({
  title = 'Prof. Julian Vance',
  variant = 'varient_1',
  primaryColor = '#2563EB',
  isDark = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#teacher-about' },
    { label: 'Intro Video', href: '#teacher-video' },
    { label: 'Credentials', href: '#teacher-credentials' },
    { label: 'Services & Pricing', href: '#teacher-pricing' },
    { label: 'Reviews & FAQ', href: '#teacher-reviews' },
  ];

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    if (typeof document !== 'undefined') {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-30 transition-colors border-b ${
        isDark
          ? 'bg-[#0B0F19]/90 border-white/10 text-slate-100'
          : 'bg-[#F8FAFC]/90 border-slate-200/80 text-slate-900'
      } backdrop-blur-md`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6 ${
          variant === 'varient_2'
            ? 'rounded-2xl my-2 border border-slate-200/70 dark:border-white/10 shadow-[0_10px_30px_-15px_rgba(37,99,235,0.25)]'
            : ''
        }`}
      >
        {/* Zone 1: Brand Title (Single clean wordmark element) */}
        <a
          href="#teacher-hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#teacher-hero');
          }}
          className="text-lg sm:text-xl font-semibold tracking-tight whitespace-nowrap shrink-0 flex items-center gap-2.5"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-[0_4px_0_rgba(15,23,42,0.3)]"
            style={{ backgroundColor: primaryColor }}
          >
            <Compass size={16} />
          </span>
          <EditableText id="teacher_nav_brand" defaultText={title} />
        </a>

        {/* Zone 2: 5 Single-line Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className={`whitespace-nowrap shrink-0 transition-colors hover:underline underline-offset-8 ${
                isDark
                  ? 'text-slate-300 hover:text-white'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <EditableButton
            id="teacher_nav_cta"
            defaultText="Book a Free Trial"
            defaultLinkUrl="#teacher-booking"
            iconLeft={<Calendar size={15} />}
            onClick={() => scrollToSection('#teacher-booking')}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white whitespace-nowrap shrink-0 inline-flex items-center gap-2 transition-transform active:translate-y-0.5 cursor-pointer"
            style={{
              backgroundColor: primaryColor,
              boxShadow: `0 4px 0 0 ${isDark ? '#1E3A8A' : '#1D4ED8'}, 0 10px 20px -5px rgba(37,99,235,0.35)`,
            }}
          />

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-white/10 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden px-6 pb-5 pt-2 border-t space-y-2 ${
            isDark
              ? 'bg-[#0B0F19] border-white/10 text-slate-100'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {navLinks.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => scrollToSection(item.href)}
              className="block w-full text-left py-2 text-sm font-medium hover:opacity-80 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
