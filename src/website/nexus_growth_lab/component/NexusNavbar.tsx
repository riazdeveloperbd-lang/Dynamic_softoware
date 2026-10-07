import React, { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import {
  EditableText,
  EditableButton,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface NexusNavbarProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

export const NexusNavbar: React.FC<NexusNavbarProps> = ({
  title = 'Nexus Growth Lab',
  variant = 'varient_1',
  primaryColor = '#2563EB',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Solutions', href: '#nexus-solutions' },
    { label: 'Case Studies', href: '#nexus-case-studies' },
    { label: 'ROI Calculator', href: '#nexus-roi-calculator' },
    { label: 'Pricing', href: '#nexus-solutions' },
    { label: 'Insights', href: '#nexus-testimonials' },
  ];

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    if (typeof document !== 'undefined') {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#0B0F17]/90 backdrop-blur-md border-b border-[#1F2937] text-[#F9FAFB]">
      <div
        className={`max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6 ${
          variant === 'varient_2'
            ? 'my-1.5 rounded-2xl border border-[#1F2937] bg-[#111827]/80'
            : ''
        }`}
      >
        {/* Zone 1: Brand Wordmark with Stylized Gradient Vector Node */}
        <a
          href="#nexus-hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#nexus-hero');
          }}
          className="text-lg sm:text-xl font-semibold tracking-tight whitespace-nowrap shrink-0 flex items-center gap-2.5 text-[#F9FAFB]"
          style={{ fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif" }}
        >
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="6" cy="18" r="2.5" fill="#F9FAFB" />
              <circle cx="12" cy="10" r="2.5" fill="#F9FAFB" />
              <circle cx="19" cy="5" r="2.5" fill="#10B981" />
              <path
                d="M7.5 16L10.5 12M14 8.5L17 6.5"
                stroke="#F9FAFB"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <EditableText id="nexus_nav_brand" defaultText={title} />
        </a>

        {/* Zone 2: 5 Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#9CA3AF]">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className="whitespace-nowrap shrink-0 hover:text-[#F9FAFB] transition-colors hover:underline underline-offset-8"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary CTA Button ("Book Growth Audit") */}
        <div className="flex items-center gap-3 shrink-0">
          <EditableButton
            id="nexus_nav_audit_cta"
            defaultText="Book Growth Audit"
            defaultLinkUrl="#nexus-audit-booking"
            iconRight={<ArrowRight size={14} />}
            onClick={() => scrollToSection('#nexus-audit-booking')}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#F9FAFB] whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 transition-opacity hover:opacity-95 cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          />

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="lg:hidden p-2 rounded-xl border border-[#1F2937] text-[#F9FAFB] cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-6 pb-5 pt-2 border-t border-[#1F2937] bg-[#0B0F17] space-y-2">
          {navLinks.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => scrollToSection(item.href)}
              className="block w-full text-left py-2 text-sm font-medium text-[#9CA3AF] hover:text-[#F9FAFB] cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
