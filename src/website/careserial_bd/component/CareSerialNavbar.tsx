import React, { useState } from 'react';
import {
  Stethoscope,
  ShieldCheck,
  CalendarClock,
  MapPin,
  PhoneCall,
  Menu,
  X,
  CheckCircle2,
  Building2,
  FileText,
  Sparkles,
  Smartphone,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface CareSerialNavbarProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

export const CareSerialNavbar: React.FC<CareSerialNavbarProps> = ({
  title,
  variant,
  primaryColor,
  isDark,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNavKey, setActiveNavKey] = useState<string>('directory');

  const medicalTeal = primaryColor || '#0D9488';
  const softEmerald = '#10B981';
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

  const navItems = [
    {
      key: 'specialties',
      id: 'careserial-specialties',
      label: 'Specialties & Labs',
      sub: 'Cardiology · Dental · Diagnostics',
      icon: Sparkles,
    },
    {
      key: 'directory',
      id: 'careserial-directory',
      label: 'BMDC Doctors',
      sub: 'Gulshan · Dhanmondi · Uttara · Ctg',
      icon: Stethoscope,
    },
    {
      key: 'scheduler',
      id: 'careserial-scheduler',
      label: 'Live Chamber Slots',
      sub: '14-Day Serial & Shift Picker',
      icon: CalendarClock,
    },
    {
      key: 'intake',
      id: 'careserial-intake',
      label: 'Patient Intake & SMS',
      sub: 'bKash / Nagad & Chamber Pass',
      icon: Smartphone,
    },
    {
      key: 'clinics',
      id: 'careserial-clinics',
      label: 'Clinic Walkthrough',
      sub: 'Sterilization & Patient Reviews',
      icon: Building2,
    },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors backdrop-blur-xl ${
        isDark
          ? 'bg-[#0F172A]/95 text-slate-100 border-b border-slate-800'
          : 'bg-white/95 text-[#0F172A] border-b border-slate-200'
      }`}
    >
      {/* Top Clinical Verification & Emergency Strip */}
      <div
        className="w-full px-4 py-2 text-[11px] sm:text-xs font-semibold text-white"
        style={{ backgroundColor: '#0F172A' }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider text-white shrink-0"
              style={{ backgroundColor: medicalTeal }}
            >
              <ShieldCheck size={11} />
              100% BMDC VERIFIED
            </span>
            <EditableText
              id="careserial_top_announcement"
              defaultText="Real-Time Chamber Serial Booking across Gulshan, Dhanmondi, Uttara, Banani & Chattogram · Instant bKash/Nagad Pre-Booking & Automated SMS Serial Tracking"
              className="text-slate-200 truncate"
            />
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[11px] text-slate-300 shrink-0">
            <span className="inline-flex items-center gap-1 font-bold text-emerald-400">
              <CheckCircle2 size={12} />
              <span>Live Chamber Queue Active</span>
            </span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="inline-flex items-center gap-1 font-semibold">
              <PhoneCall size={12} className="text-teal-400" />
              <span>24/7 Patient Helpline: 10666 / +880 1700-000000</span>
            </span>
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
                ? 'rounded-none border-2 border-[#0F172A] shadow-[3px_3px_0px_#10B981]'
                : 'rounded-2xl'
            }`}
            style={{ backgroundColor: medicalTeal }}
          >
            <Stethoscope size={20} strokeWidth={2.3} />
          </div>

          <div className="leading-none">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <EditableText
                id="careserial_nav_brand_title"
                defaultText={title || 'CareSerial BD'}
                className="text-base sm:text-lg font-black tracking-tight"
              />
              <span
                className="hidden sm:inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider text-white"
                style={{ backgroundColor: softEmerald }}
              >
                ডাক্তার ও ডায়াগনস্টিক পোর্টাল
              </span>
            </div>
            <EditableText
              id="careserial_nav_brand_subtitle"
              defaultText="Specialist Chambers · Dental Clinics · Diagnostic Labs · Dhaka & Chattogram"
              className="block text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-1 whitespace-nowrap"
            />
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav
          aria-label="CareSerial BD Primary Navigation"
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
                    ? 'text-[#0D9488] dark:text-teal-400 font-extrabold'
                    : isDark
                    ? 'text-slate-300 hover:text-white'
                    : 'text-[#0F172A] hover:text-[#0D9488]'
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
                  style={{ backgroundColor: medicalTeal }}
                />
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => scrollToSection('careserial-scheduler', 'scheduler')}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
              isDark
                ? 'border-slate-700 bg-slate-900 text-slate-100 hover:border-teal-500'
                : 'border-slate-200 bg-[#F8FAFC] text-[#0F172A] hover:border-[#0D9488]'
            }`}
          >
            <MapPin size={14} style={{ color: medicalTeal }} />
            <span>Chamber Slot Picker</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('careserial-intake', 'intake')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-extrabold text-white shadow-sm transition hover:opacity-95 cursor-pointer ${
              isBrutalist
                ? 'rounded-none border-2 border-[#0F172A] shadow-[3px_3px_0px_#10B981]'
                : 'rounded-xl'
            }`}
            style={{ backgroundColor: medicalTeal }}
          >
            <FileText size={14} />
            <span>Book Serial Now</span>
            <span
              className="px-1.5 py-0.5 rounded-full text-[10px] text-white font-black"
              style={{ backgroundColor: '#0F172A' }}
            >
              LIVE
            </span>
          </button>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle Menu"
            className={`xl:hidden p-2 rounded-xl border cursor-pointer ${
              isDark
                ? 'border-slate-800 bg-slate-900 text-slate-200'
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
              ? 'bg-[#0F172A] border-slate-800 text-slate-100'
              : 'bg-white border-slate-200 text-[#0F172A]'
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
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Icon size={14} style={{ color: medicalTeal }} />
                    <span>{item.label}</span>
                  </span>
                  <span className="text-[11px] text-slate-500">{item.sub}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => scrollToSection('careserial-scheduler', 'scheduler')}
              className="py-2.5 px-3 rounded-xl text-xs font-extrabold border border-[#0D9488] bg-white text-[#0D9488] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <CalendarClock size={14} />
              <span>Chamber Slots</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('careserial-intake', 'intake')}
              className="py-2.5 px-3 rounded-xl text-xs font-extrabold text-white flex items-center justify-center gap-1.5 cursor-pointer"
              style={{ backgroundColor: medicalTeal }}
            >
              <FileText size={14} />
              <span>Book Serial Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
