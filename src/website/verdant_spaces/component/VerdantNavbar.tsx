import React, { useState } from 'react';
import { Phone, ArrowRight, Menu, X } from 'lucide-react';
import {
  EditableText,
  EditableButton,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface VerdantNavbarProps {
  title: string;
  subtitle: string;
  variant: DoctorVariantId;
  primaryColor: string;
  isDark?: boolean;
}

export const VerdantNavbar: React.FC<VerdantNavbarProps> = ({
  title,
  variant,
  primaryColor,
  isDark = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Services');
  const [callNotice, setCallNotice] = useState(false);

  const navLinks = [
    { label: 'Services', href: '#verdant-packages' },
    { label: 'Estimator', href: '#verdant-estimator' },
    { label: 'Packages', href: '#verdant-packages' },
    { label: 'Portfolio', href: '#verdant-portfolio' },
    { label: 'Coverage Map', href: '#verdant-coverage' },
    { label: 'Our Ethos', href: '#verdant-ethos' },
  ];

  const handleScrollTo = (href: string, label: string) => {
    setActiveNav(label);
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const bgSurface = isDark ? 'bg-[#17221D]/90' : 'bg-[#FAF9F6]/90';
  const textPrimary = isDark ? 'text-[#F4F1EA]' : 'text-[#1F2421]';
  const borderCol = isDark ? 'border-[#2C4A3E]' : 'border-[#D8E2DC]';

  return (
    <header
      className={`sticky top-0 z-30 w-full transition-colors ${
        isDark ? 'bg-[#111916]' : 'bg-[#FAF9F6]'
      } pt-3 pb-2 px-4 sm:px-6`}
    >
      <div
        className={`max-w-7xl mx-auto rounded-2xl border ${borderCol} ${bgSurface} backdrop-blur-md shadow-xs px-5 py-3.5 flex items-center justify-between gap-4`}
      >
        {/* Zone 1: Brand Title with Minimal Geometric Leaf on Architectural Grid */}
        <a
          href="#verdant-hero"
          onClick={(e) => {
            e.preventDefault();
            handleScrollTo('#verdant-hero', 'Services');
          }}
          className="flex items-center gap-3 shrink-0 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden border border-[#D8E2DC] bg-[#2C4A3E] text-[#F4F1EA] shadow-xs">
            <svg className="w-6 h-6" viewBox="0 0 28 28" fill="none">
              <path
                d="M4 9H24M4 19H24M9 4V24M19 4V24"
                stroke="#4A6B5D"
                strokeWidth="0.9"
                strokeDasharray="1.5 1.5"
              />
              <path
                d="M7 21C7 12.5 13.5 7 21 7C21 14.5 15.5 21 7 21Z"
                fill="#D37B58"
                fillOpacity="0.88"
                stroke="#F4F1EA"
                strokeWidth="1.4"
              />
              <path
                d="M7 21L17.5 10.5"
                stroke="#F4F1EA"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <EditableText
            id="verdant_nav_brand"
            defaultText={title || 'Verdant Spaces'}
            as="span"
            className={`text-lg sm:text-xl font-bold tracking-tight whitespace-nowrap ${textPrimary}`}
            style={{ fontFamily: "'Instrument Serif', 'Cinzel', Georgia, serif" }}
          />
        </a>

        {/* Zone 2: Navigation Links */}
        <nav
          className={`hidden lg:flex items-center gap-6 ${
            variant === 'varient_2'
              ? 'px-5 py-1.5 rounded-xl bg-[#EFECE6]/80 border border-[#D8E2DC]'
              : ''
          }`}
        >
          {navLinks.map((item) => {
            const isActive = activeNav === item.label;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleScrollTo(item.href, item.label)}
                className={`text-xs font-semibold tracking-wide transition-colors whitespace-nowrap shrink-0 cursor-pointer relative py-1 ${
                  isActive
                    ? isDark
                      ? 'text-[#F4F1EA]'
                      : 'text-[#2C4A3E]'
                    : isDark
                    ? 'text-[#D8E2DC]/75 hover:text-[#F4F1EA]'
                    : 'text-[#4A6B5D] hover:text-[#1F2421]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 inset-x-0 h-0.5 rounded-full"
                    style={{ backgroundColor: '#D37B58' }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Phone Quick-Call Action + Primary CTA Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              setCallNotice(true);
              setTimeout(() => setCallNotice(false), 2600);
            }}
            className={`hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border ${borderCol} ${
              isDark
                ? 'bg-[#1F2E27] text-[#F4F1EA] hover:bg-[#2C4A3E]'
                : 'bg-[#F4F1EA] text-[#2C4A3E] hover:bg-[#EFECE6]'
            } text-xs font-semibold whitespace-nowrap transition cursor-pointer`}
            title="Direct Studio Line"
          >
            <Phone size={13} className="text-[#D37B58]" />
            <span className="font-mono tabular-nums">
              {callNotice ? 'Dialing (212) 555-0148...' : '(212) 555-0148'}
            </span>
          </button>

          <EditableButton
            id="verdant_nav_cta"
            defaultText="Request Consultation"
            defaultLinkUrl="#verdant-booking"
            iconRight={<ArrowRight size={14} className="text-[#D37B58]" />}
            onClickFallback={() => handleScrollTo('#verdant-booking', 'Services')}
            style={{
              backgroundColor: primaryColor || '#2C4A3E',
              color: '#F4F1EA',
            }}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#2C4A3E] text-[#F4F1EA] inline-flex items-center gap-2 shadow-sm hover:opacity-95 transition whitespace-nowrap shrink-0 cursor-pointer"
          />

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl border ${borderCol} ${textPrimary} cursor-pointer`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden mt-2 max-w-7xl mx-auto rounded-2xl border ${borderCol} ${
            isDark ? 'bg-[#17221D]' : 'bg-[#FAF9F6]'
          } p-4 space-y-2 shadow-lg`}
        >
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleScrollTo(item.href, item.label)}
                className={`text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                  activeNav === item.label
                    ? 'bg-[#2C4A3E] text-[#F4F1EA]'
                    : isDark
                    ? 'text-[#D8E2DC] hover:bg-[#1F2E27]'
                    : 'text-[#1F2421] hover:bg-[#EFECE6]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-[#D8E2DC]/40 flex items-center justify-between text-xs text-[#4A6B5D]">
            <span>Direct Architectural Desk</span>
            <span className="font-mono font-semibold text-[#D37B58]">(212) 555-0148</span>
          </div>
        </div>
      )}
    </header>
  );
};
