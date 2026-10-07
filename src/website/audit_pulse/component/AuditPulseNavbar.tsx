import React, { useState } from 'react';
import { ShieldCheck, Lock, ArrowRight, Menu, X } from 'lucide-react';
import {
  EditableText,
  EditableButton,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface AuditPulseNavbarProps {
  title: string;
  subtitle: string;
  variant: DoctorVariantId;
  primaryColor: string;
  isDark?: boolean;
}

export const AuditPulseNavbar: React.FC<AuditPulseNavbarProps> = ({
  title,
  variant = 'varient_1',
  primaryColor = '#10B981',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('How It Works');

  const navLinks = [
    { label: 'How It Works', href: '#auditpulse-process' },
    { label: 'Estimator', href: '#auditpulse-estimator' },
    { label: 'Integrations', href: '#auditpulse-breakdown' },
    { label: 'Security', href: '#auditpulse-security' },
    { label: 'Pricing', href: '#auditpulse-pricing' },
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

  return (
    <header className="sticky top-0 z-30 w-full bg-[#0A0E17]/95 backdrop-blur-md border-b border-[#1F2937] text-[#F9FAFB]">
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 ${
          variant === 'varient_2'
            ? 'my-1.5 rounded-2xl border border-[#1F2937] bg-[#111827]/90'
            : ''
        }`}
      >
        {/* Zone 1: Brand Logo (Pulse/Waveform merging into Shield) + Micro SOC-2 & GDPR Trust Badges */}
        <div className="flex items-center gap-4 shrink-0">
          <a
            href="#auditpulse-hero"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo('#auditpulse-hero', 'How It Works');
            }}
            className="flex items-center gap-2.5 shrink-0 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-[#111827] border border-[#1F2937] flex items-center justify-center relative shadow-inner">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                {/* Shield Contour */}
                <path
                  d="M12 2.5L4.5 5.8V11.4C4.5 16.3 7.7 20.7 12 22C16.3 20.7 19.5 16.3 19.5 11.4V5.8L12 2.5Z"
                  stroke="#2563EB"
                  strokeWidth="1.7"
                  fill="#0A0E17"
                />
                {/* Pulse Waveform Merging Inside Shield */}
                <path
                  d="M6.5 12.2H9.2L10.7 8.5L13.1 15.5L14.8 11.2H17.5"
                  stroke="#10B981"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <EditableText
              id="auditpulse_nav_brand"
              defaultText={title || 'AuditPulse'}
              as="span"
              className="text-lg sm:text-xl font-bold tracking-tight text-[#F9FAFB] whitespace-nowrap"
              style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
            />
          </a>

          {/* Inline Micro SOC-2 & GDPR Trust Indicators */}
          <div className="hidden xl:flex items-center gap-2 pl-3 border-l border-[#1F2937] text-[11px] font-mono text-[#9CA3AF]">
            <span className="inline-flex items-center gap-1 text-[#10B981] font-semibold">
              <ShieldCheck size={12} className="text-[#10B981]" />
              SOC-2 Type II
            </span>
            <span className="text-[#1F2937]">•</span>
            <span className="inline-flex items-center gap-1 text-[#06B6D4] font-semibold">
              <Lock size={11} className="text-[#06B6D4]" />
              GDPR Ready
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((item) => {
            const isActive = activeNav === item.label;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleScrollTo(item.href, item.label)}
                className={`text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer relative py-1 ${
                  isActive
                    ? 'text-[#F9FAFB] font-semibold'
                    : 'text-[#9CA3AF] hover:text-[#F9FAFB]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 inset-x-0 h-0.5 rounded-full"
                    style={{ backgroundColor: primaryColor || '#10B981' }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary High-Contrast Emerald CTA Button */}
        <div className="flex items-center gap-3 shrink-0">
          <EditableButton
            id="auditpulse_nav_cta"
            defaultText="Book 1-Click Audit"
            defaultLinkUrl="#auditpulse-booking"
            iconRight={<ArrowRight size={14} />}
            onClickFallback={() => handleScrollTo('#auditpulse-booking', 'How It Works')}
            style={{
              backgroundColor: primaryColor || '#10B981',
              color: '#0A0E17',
            }}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#10B981] text-[#0A0E17] inline-flex items-center gap-1.5 shadow-md hover:opacity-95 transition whitespace-nowrap shrink-0 cursor-pointer"
          />

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="lg:hidden p-2 rounded-xl border border-[#1F2937] text-[#F9FAFB] cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-6 pb-5 pt-2 border-t border-[#1F2937] bg-[#0A0E17] space-y-2">
          <div className="flex items-center gap-3 pb-2 text-xs font-mono text-[#9CA3AF]">
            <span className="text-[#10B981] font-semibold">✓ SOC-2 Type II</span>
            <span>•</span>
            <span className="text-[#06B6D4] font-semibold">✓ GDPR Read-Only OAuth</span>
          </div>
          {navLinks.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleScrollTo(item.href, item.label)}
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
