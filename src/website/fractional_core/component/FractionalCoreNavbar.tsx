import React, { useState } from 'react';
import { ArrowRight, Menu, X, Sparkles, ShieldCheck } from 'lucide-react';
import {
  EditableText,
  EditableButton,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface FractionalCoreNavbarProps {
  title: string;
  subtitle: string;
  variant: DoctorVariantId;
  primaryColor: string;
  isDark?: boolean;
}

export const FractionalCoreNavbar: React.FC<FractionalCoreNavbarProps> = ({
  title,
  subtitle,
  variant,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className="sticky top-0 z-30 w-full backdrop-blur-md border-b transition-all"
      style={{
        backgroundColor:
          variant === 'varient_2'
            ? 'rgba(15, 23, 42, 0.94)'
            : 'rgba(10, 15, 29, 0.92)',
        borderColor: '#334155',
        color: '#F8FAFC',
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      }}
    >
      {/* Top Venture Network Strip on Variant 3 */}
      {variant === 'varient_3' && (
        <div
          className="px-6 py-1.5 border-b text-[11px] font-medium flex flex-wrap items-center justify-between gap-3"
          style={{
            backgroundColor: '#070B15',
            borderColor: '#1E293B',
            color: '#9CA3AF',
          }}
        >
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="font-mono text-[#F8FAFC] font-bold">
              VENTURE TALENT DESK:
            </span>
            <span>
              Backed by 40+ Seed &amp; Series-A VC Funds · Zero Equity Dilution
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono uppercase tracking-wider text-[#F59E0B]">
            <span>AVG PLACEMENT: 44 HOURS</span>
            <span>·</span>
            <span>TOP 1.2% VETTED C-SUITE</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Identity + Live Status Badge */}
        <div className="flex items-center gap-3.5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-md relative overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, rgba(245, 158, 11, 0.18) 0%, rgba(99, 102, 241, 0.16) 100%)',
              borderColor: 'rgba(245, 158, 11, 0.45)',
            }}
          >
            {/* Minimalist geometric chevron/core SVG icon */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
                stroke="#F59E0B"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M8.5 10.5L12 7.5L15.5 10.5"
                stroke="#F8FAFC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="14" r="2.2" fill="#6366F1" />
            </svg>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2.5">
              <EditableText
                id="fractional_nav_brand"
                defaultText={title || 'FractionalCore'}
                as="span"
                className="text-lg sm:text-xl font-bold tracking-tight text-[#F8FAFC]"
                style={{ fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif" }}
              />

              {/* Live Status Badge */}
              <div
                className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-semibold"
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  borderColor: 'rgba(16, 185, 129, 0.35)',
                  color: '#10B981',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>18 Vetted Leaders Available for Q4</span>
              </div>
            </div>
            <span className="text-[10px] text-[#9CA3AF] hidden sm:block">
              {subtitle || 'Seed & Series-A Fractional Executive Network'}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-[#9CA3AF]">
          <button
            type="button"
            onClick={() => scrollToSection('fractional-directory')}
            className="hover:text-[#F8FAFC] transition cursor-pointer"
          >
            Executive Roster
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('fractional-calculator')}
            className="hover:text-[#F8FAFC] transition cursor-pointer"
          >
            Savings Calculator
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('fractional-advisory-model')}
            className="hover:text-[#F8FAFC] transition cursor-pointer"
          >
            How It Works
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('fractional-advisory-model')}
            className="hover:text-[#F8FAFC] transition cursor-pointer"
          >
            Advisory Models
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('fractional-architecture-hub')}
            className="hover:text-[#F59E0B] transition cursor-pointer flex items-center gap-1"
          >
            <span>For Executives</span>
            <Sparkles size={11} className="text-[#F59E0B]" />
          </button>
        </nav>

        {/* Primary CTA Button (High-contrast Gold gradient CTA) */}
        <div className="hidden sm:flex items-center gap-3">
          <EditableButton
            id="fractional_nav_cta"
            defaultText="Request Executive Match"
            backgroundColor="#D97706"
            textColor="#F8FAFC"
            rightIcon={<ArrowRight size={14} />}
            onClick={() => scrollToSection('fractional-match-form')}
            className="px-4 py-2.5 rounded-xl text-xs font-extrabold tracking-tight shadow-lg transition hover:opacity-95 cursor-pointer"
          />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg border border-[#334155] text-[#F8FAFC] hover:bg-[#1E293B]"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden px-6 py-5 border-t space-y-4"
          style={{
            backgroundColor: '#0A0F1D',
            borderColor: '#334155',
          }}
        >
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border text-[11px] font-semibold bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981]">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span>18 Vetted Leaders Available for Q4</span>
          </div>

          <div className="flex flex-col gap-3 text-xs font-semibold text-[#F8FAFC]">
            <button
              type="button"
              onClick={() => scrollToSection('fractional-directory')}
              className="text-left py-1.5 hover:text-[#F59E0B]"
            >
              Executive Roster
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('fractional-calculator')}
              className="text-left py-1.5 hover:text-[#F59E0B]"
            >
              Savings Calculator
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('fractional-advisory-model')}
              className="text-left py-1.5 hover:text-[#F59E0B]"
            >
              How It Works &amp; Advisory Models
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('fractional-architecture-hub')}
              className="text-left py-1.5 text-[#F59E0B]"
            >
              For Executives &amp; VC Partners
            </button>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection('fractional-match-form')}
            className="w-full py-3 rounded-xl text-xs font-extrabold text-[#0A0F1D] flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            }}
          >
            <ShieldCheck size={14} />
            <span>Request Executive Match</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </header>
  );
};
