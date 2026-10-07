import React, { useState } from 'react';
import { Home, Phone, Calendar, ShieldCheck, Clock, Sparkles, Menu, X } from 'lucide-react';
import { EditableText, EditableButton } from './DoctorCanvaEditorContext';

export type DoctorVariantId =
  | 'varient_1'
  | 'varient_2'
  | 'varient_3'
  | 'varient_4'
  | 'varient_5'
  | 'varient_6';

export interface DoctorNavbarProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  accentTeal?: string;
  isDark?: boolean;
  onNavigateSection?: (sectionAnchor: 'home' | 'about' | 'services' | 'contact') => void;
}

export const DoctorNavbar: React.FC<DoctorNavbarProps> = ({
  title = 'DR. SARAH MITCHELL',
  subtitle = 'Board Certified Internal Medicine Physician',
  variant = 'varient_1',
  primaryColor = '#1D2B6B',
  accentTeal = '#48B89F',
  isDark = false,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: {
    id: 'home' | 'about' | 'services' | 'contact';
    label: string;
    href: string;
  }[] = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  const renderMobileMenuDrawer = () =>
    mobileMenuOpen ? (
      <div
        className={`md:hidden px-4 pt-3 pb-4 border-t space-y-2.5 ${
          isDark
            ? 'bg-[#0F1523] border-white/10 text-white'
            : 'bg-white border-slate-200/80 text-[#1D2B6B]'
        }`}
      >
        <div className="flex flex-col space-y-2 text-sm font-bold">
          {navItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5"
            >
              <EditableText
                id={`doc_nav_link_${item.id}`}
                defaultText={item.label}
                defaultLinkUrl={item.href}
              />
            </div>
          ))}
        </div>
        <div className="pt-2 border-t border-slate-200/60 dark:border-white/10">
          <EditableButton
            id="doc_nav_mobile_cta"
            defaultText="Book Appointment"
            defaultLinkUrl="#contact"
            onClickFallback={() => {
              setMobileMenuOpen(false);
              onNavigateSection?.('contact');
            }}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-extrabold text-white flex items-center justify-center gap-2 cursor-pointer"
            style={{ backgroundColor: primaryColor }}
          />
        </div>
      </div>
    ) : null;

  /* ========================================================================
   * VARIANT 2: Centered Brand Split Editorial Navigation (Responsive)
   * ======================================================================== */
  if (variant === 'varient_2') {
    return (
      <header
        id="home"
        className={`sticky top-0 z-30 border-b transition-colors ${
          isDark
            ? 'bg-[#0D1322]/95 border-white/10 text-white'
            : 'bg-[#FAFBFD]/95 border-slate-200/80 text-[#1D2B6B]'
        } backdrop-blur-md`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
          <nav className="hidden md:flex items-center gap-6 text-xs font-extrabold uppercase tracking-widest">
            {navItems.slice(0, 2).map((item) => (
              <EditableText
                key={item.id}
                id={`doc_nav_v2_${item.id}`}
                defaultText={item.label}
                defaultLinkUrl={item.href}
                className="hover:text-[#48B89F] transition cursor-pointer"
              />
            ))}
          </nav>

          <div className="text-left md:text-center min-w-0">
            <EditableText
              id="doc_nav_v2_title"
              as="div"
              defaultText={title}
              defaultLinkUrl="#home"
              className="text-sm sm:text-lg md:text-xl font-black tracking-[0.14em] uppercase truncate"
              style={{ color: isDark ? '#FFFFFF' : primaryColor }}
            />
            <EditableText
              id="doc_nav_v2_subtitle"
              as="div"
              defaultText={subtitle}
              className="text-[10px] uppercase tracking-widest text-[#48B89F] font-bold mt-0.5 truncate"
            />
          </div>

          <div className="hidden md:flex items-center gap-5 text-xs font-extrabold uppercase tracking-widest">
            {navItems.slice(2).map((item) => (
              <EditableText
                key={item.id}
                id={`doc_nav_v2_${item.id}`}
                defaultText={item.label}
                defaultLinkUrl={item.href}
                className="hover:text-[#48B89F] transition cursor-pointer"
              />
            ))}
            <EditableButton
              id="doc_nav_v2_cta"
              defaultText="Book Now"
              defaultLinkUrl="#contact"
              onClickFallback={() => onNavigateSection?.('contact')}
              className="px-4 py-2 rounded-xl text-[11px] font-extrabold text-white shadow-xs cursor-pointer inline-flex items-center gap-1.5"
              style={{ backgroundColor: accentTeal }}
            />
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-white/15 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {renderMobileMenuDrawer()}
      </header>
    );
  }

  /* ========================================================================
   * VARIANT 3: Brutalist Clinical Ledger Header (Responsive)
   * ======================================================================== */
  if (variant === 'varient_3') {
    return (
      <header
        id="home"
        className={`sticky top-0 z-30 border-b-2 border-slate-900 dark:border-white ${
          isDark ? 'bg-[#0F1523] text-white' : 'bg-[#F4F8F7] text-slate-950'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="px-2 py-1 border-2 border-slate-900 dark:border-white font-mono text-[10px] sm:text-xs font-black uppercase flex-shrink-0"
              style={{ backgroundColor: accentTeal, color: '#FFFFFF' }}
            >
              MD-12345
            </div>
            <EditableText
              id="doc_nav_v3_title"
              defaultText={title}
              defaultLinkUrl="#home"
              className="text-xs sm:text-base font-black tracking-tight uppercase truncate"
            />
          </div>

          <div className="hidden md:flex items-center divide-x-2 divide-slate-900 dark:divide-white border-2 border-slate-900 dark:border-white bg-white dark:bg-slate-900">
            {navItems.map((item) => (
              <div key={item.id} className="px-4 py-1.5 text-xs font-extrabold uppercase">
                <EditableText
                  id={`doc_nav_v3_${item.id}`}
                  defaultText={item.label}
                  defaultLinkUrl={item.href}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <EditableButton
              id="doc_nav_v3_cta"
              defaultText="SCHEDULE →"
              defaultLinkUrl="#contact"
              onClickFallback={() => onNavigateSection?.('contact')}
              className="px-3 sm:px-4 py-2 border-2 border-slate-900 dark:border-white text-[10px] sm:text-xs font-black text-white uppercase cursor-pointer inline-flex items-center gap-1"
              style={{
                backgroundColor: primaryColor,
                boxShadow: `3px 3px 0px ${accentTeal}`,
              }}
            />
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden p-2 border-2 border-slate-900 dark:border-white cursor-pointer"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
        {renderMobileMenuDrawer()}
      </header>
    );
  }

  /* ========================================================================
   * VARIANT 4: Floating Glassmorphic Capsule Header (Responsive)
   * ======================================================================== */
  if (variant === 'varient_4') {
    return (
      <header id="home" className="sticky top-0 z-30 py-2.5 px-3 sm:px-6">
        <div
          className={`max-w-5xl mx-auto px-4 sm:px-6 py-2.5 rounded-2xl sm:rounded-full border shadow-lg backdrop-blur-md flex items-center justify-between gap-2 ${
            isDark
              ? 'bg-[#121829]/90 border-white/15 text-white'
              : 'bg-white/95 border-slate-200/90 text-[#1D2B6B]'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0"
              style={{ backgroundColor: accentTeal }}
            >
              <Home size={15} />
            </span>
            <EditableText
              id="doc_nav_brand_v4"
              defaultText={title}
              defaultLinkUrl="#home"
              className="text-xs sm:text-sm font-extrabold tracking-wider uppercase truncate"
            />
          </div>
          <nav className="hidden md:flex items-center gap-7 text-xs font-bold">
            {navItems.map((item) => (
              <EditableText
                key={item.id}
                id={`doc_nav_link_v4_${item.id}`}
                defaultText={item.label}
                defaultLinkUrl={item.href}
                className="hover:text-[#48B89F] transition cursor-pointer"
              />
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <EditableButton
              id="doc_nav_cta_v4"
              defaultText="Book Visit"
              defaultLinkUrl="#contact"
              onClickFallback={() => onNavigateSection?.('contact')}
              iconLeft={<Calendar size={13} />}
              className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold text-white shadow-xs hover:opacity-95 transition cursor-pointer inline-flex items-center gap-1.5"
              style={{ backgroundColor: primaryColor }}
            />
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden p-1.5 rounded-full border border-slate-200 dark:border-white/15 cursor-pointer"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
        {renderMobileMenuDrawer()}
      </header>
    );
  }

  /* ========================================================================
   * VARIANT 5: Dark Executive Concierge Medical Bar (Responsive)
   * ======================================================================== */
  if (variant === 'varient_5') {
    return (
      <header
        id="home"
        className="sticky top-0 z-30 bg-[#0B1120] text-white border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-md flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${accentTeal})`,
              }}
            >
              <Sparkles size={17} />
            </div>
            <div className="min-w-0">
              <EditableText
                id="doc_nav_v5_title"
                as="div"
                defaultText={title}
                defaultLinkUrl="#home"
                className="text-xs sm:text-sm font-extrabold tracking-wider uppercase text-white truncate"
              />
              <EditableText
                id="doc_nav_v5_sub"
                as="div"
                defaultText="Private Internal Medicine Concierge"
                className="text-[10px] text-teal-400 font-semibold truncate"
              />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            {navItems.map((item) => (
              <EditableText
                key={item.id}
                id={`doc_nav_v5_${item.id}`}
                defaultText={item.label}
                defaultLinkUrl={item.href}
                className="hover:text-teal-400 transition cursor-pointer"
              />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <EditableButton
              id="doc_nav_v5_phone"
              defaultText="(555) 123-4567"
              defaultLinkUrl="tel:5551234567"
              iconLeft={<Phone size={12} className="text-teal-400" />}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 text-xs font-bold text-white/90 hover:bg-white/5 cursor-pointer"
            />
            <EditableButton
              id="doc_nav_v5_cta"
              defaultText="Patient Portal"
              defaultLinkUrl="#contact"
              className="px-3.5 py-2 rounded-lg text-xs font-extrabold text-slate-950 bg-[#48B89F] hover:opacity-95 cursor-pointer inline-flex items-center gap-1.5"
            />
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg border border-white/15 text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
        {renderMobileMenuDrawer()}
      </header>
    );
  }

  /* ========================================================================
   * VARIANT 6: Dual-Tier Top Clinic Announcement Strip + Main Navbar
   * ======================================================================== */
  if (variant === 'varient_6') {
    return (
      <header id="home" className="sticky top-0 z-30 shadow-xs">
        <div
          className="px-4 sm:px-6 py-1.5 text-[10px] sm:text-[11px] text-white"
          style={{ backgroundColor: primaryColor }}
        >
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 font-semibold">
                <ShieldCheck size={13} className="text-[#48B89F] flex-shrink-0" />
                <EditableText
                  id="doc_nav_v6_badge"
                  defaultText="Accepting New Patients & Insurances"
                />
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-white/80">
                <Clock size={12} />
                <EditableText
                  id="doc_nav_v6_hours"
                  defaultText="Mon–Fri: 8:00 AM – 6:00 PM"
                />
              </span>
            </div>
            <div className="flex items-center gap-4 font-bold">
              <EditableText
                id="doc_nav_v6_emg"
                defaultText="24/7 Line: (555) 987-6543"
                defaultLinkUrl="tel:5559876543"
                className="text-[#48B89F]"
              />
            </div>
          </div>
        </div>

        <div
          className={`px-4 sm:px-6 h-15 border-b flex items-center justify-between ${
            isDark
              ? 'bg-[#12192B] border-white/10 text-white'
              : 'bg-white border-slate-200/80 text-[#1D2B6B]'
          }`}
        >
          <div className="max-w-6xl w-full mx-auto flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Home size={17} className="text-[#48B89F] flex-shrink-0" />
              <EditableText
                id="doc_nav_v6_title"
                defaultText={title}
                defaultLinkUrl="#home"
                className="text-xs sm:text-base font-extrabold uppercase tracking-wider truncate"
              />
            </div>

            <nav className="hidden md:flex items-center gap-7 text-xs font-bold">
              {navItems.map((item) => (
                <EditableText
                  key={item.id}
                  id={`doc_nav_v6_${item.id}`}
                  defaultText={item.label}
                  defaultLinkUrl={item.href}
                  className="hover:text-[#48B89F] transition cursor-pointer"
                />
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <EditableButton
                id="doc_nav_v6_cta"
                defaultText="Request Visit"
                defaultLinkUrl="#contact"
                onClickFallback={() => onNavigateSection?.('contact')}
                className="px-3.5 py-2 rounded-xl text-xs font-extrabold text-white shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                style={{ backgroundColor: accentTeal }}
              />
              <button
                type="button"
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-white/15 cursor-pointer"
              >
                {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </div>
        {renderMobileMenuDrawer()}
      </header>
    );
  }

  /* ========================================================================
   * VARIANT 1 (Default Dribbble Video Navbar): Clean Sticky Clinical Bar
   * ======================================================================== */
  return (
    <header
      id="home"
      className={`sticky top-0 z-30 backdrop-blur-md border-b transition-colors ${
        isDark
          ? 'bg-[#0F1523]/90 border-white/10 text-white'
          : 'bg-white/90 border-slate-200/70 text-[#1D2B6B]'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-left group min-w-0">
          <span
            onClick={() => onNavigateSection?.('home')}
            className="w-8 h-8 rounded-lg bg-[#E6F4F1] dark:bg-teal-950/60 flex items-center justify-center text-[#1D2B6B] dark:text-[#48B89F] group-hover:scale-105 transition cursor-pointer flex-shrink-0"
          >
            <Home size={16} />
          </span>
          <EditableText
            id="doc_nav_brand_title"
            defaultText={title}
            defaultLinkUrl="#home"
            className="text-xs sm:text-sm md:text-base font-extrabold tracking-wider uppercase truncate"
            style={{ color: isDark ? '#FFFFFF' : primaryColor }}
          />
        </div>

        <nav className="hidden md:flex items-center gap-6 md:gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <EditableText
              key={item.id}
              id={`doc_nav_link_${item.id}`}
              defaultText={item.label}
              defaultLinkUrl={item.href}
              className={`hover:text-[#48B89F] transition cursor-pointer ${
                isDark ? 'text-slate-200' : 'text-slate-600'
              }`}
            />
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-white/15 cursor-pointer"
          aria-label="Toggle Mobile Navigation"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {renderMobileMenuDrawer()}
    </header>
  );
};

export default DoctorNavbar;
