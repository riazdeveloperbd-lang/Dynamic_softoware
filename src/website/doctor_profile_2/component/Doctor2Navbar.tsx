import React, { useState } from 'react';
import { HeartPulse, Menu, X, PhoneCall, Calendar } from 'lucide-react';
import {
  EditableText,
  EditableButton,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface Doctor2NavbarProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

export const Doctor2Navbar: React.FC<Doctor2NavbarProps> = ({
  title = 'Dr. Arjun Mehta',
  subtitle = 'Cardiologist',
  variant = 'varient_1',
  primaryColor = '#118C74',
  isDark = false,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { id: 'about', label: 'About', href: '#about' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'reviews', label: 'Reviews', href: '#reviews' },
    { id: 'blog', label: 'Blog', href: '#location' },
  ];

  /* VARIANT 2: Floating Glassmorphic Capsule Header */
  if (variant === 'varient_2' || variant === 'varient_5') {
    return (
      <header className="sticky top-0 z-30 py-3 px-4 sm:px-6">
        <div
          className={`max-w-5xl mx-auto px-4 sm:px-6 py-3 rounded-full border shadow-lg backdrop-blur-md flex items-center justify-between gap-3 ${
            isDark
              ? 'bg-[#0F172A]/90 border-white/15 text-white'
              : 'bg-white/95 border-emerald-100 text-slate-900'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-xs"
              style={{ backgroundColor: primaryColor }}
            >
              <HeartPulse size={18} />
            </div>
            <div className="min-w-0 leading-tight">
              <EditableText
                id="doc2_nav_v2_title"
                as="div"
                defaultText={title}
                defaultLinkUrl="#home"
                className="text-xs sm:text-sm font-extrabold truncate"
              />
              <EditableText
                id="doc2_nav_v2_sub"
                as="div"
                defaultText={subtitle}
                className="text-[10px] font-bold truncate"
                style={{ color: primaryColor }}
              />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-xs font-bold">
            {navLinks.map((lnk) => (
              <EditableText
                key={lnk.id}
                id={`doc2_nav_v2_${lnk.id}`}
                defaultText={lnk.label}
                defaultLinkUrl={lnk.href}
                className="hover:opacity-75 transition cursor-pointer"
              />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <EditableButton
              id="doc2_nav_v2_cta"
              defaultText="Contact Me"
              defaultLinkUrl="#location"
              iconLeft={<Calendar size={13} />}
              className="px-4 py-2 rounded-full text-xs font-extrabold text-white shadow-xs hover:opacity-95 transition cursor-pointer inline-flex items-center gap-1.5"
              style={{ backgroundColor: primaryColor }}
            />
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-full border border-slate-200 dark:border-white/15 cursor-pointer"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden mt-2 p-4 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-2 text-xs font-bold">
            {navLinks.map((lnk) => (
              <div key={lnk.id} className="py-1.5" onClick={() => setMobileOpen(false)}>
                <EditableText
                  id={`doc2_nav_mob_${lnk.id}`}
                  defaultText={lnk.label}
                  defaultLinkUrl={lnk.href}
                />
              </div>
            ))}
          </div>
        )}
      </header>
    );
  }

  /* VARIANT 3: Dark Executive Cardiology Top Bar + Split Nav */
  if (variant === 'varient_3' || variant === 'varient_6') {
    return (
      <header className="sticky top-0 z-30 bg-[#0B1528] text-white border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
              style={{ backgroundColor: primaryColor }}
            >
              <HeartPulse size={20} />
            </div>
            <div className="min-w-0">
              <EditableText
                id="doc2_nav_v3_title"
                as="div"
                defaultText={title}
                defaultLinkUrl="#home"
                className="text-sm font-extrabold text-white truncate"
              />
              <EditableText
                id="doc2_nav_v3_sub"
                as="div"
                defaultText={subtitle}
                className="text-[11px] text-emerald-400 font-semibold truncate"
              />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-200">
            {navLinks.map((lnk) => (
              <EditableText
                key={lnk.id}
                id={`doc2_nav_v3_${lnk.id}`}
                defaultText={lnk.label}
                defaultLinkUrl={lnk.href}
                className="hover:text-emerald-400 transition cursor-pointer"
              />
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <EditableButton
              id="doc2_nav_v3_phone"
              defaultText="+1 (212) 555-7890"
              defaultLinkUrl="tel:12125557890"
              iconLeft={<PhoneCall size={12} className="text-emerald-400" />}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/15 text-xs font-bold text-white cursor-pointer"
            />
            <EditableButton
              id="doc2_nav_v3_cta"
              defaultText="Contact Me"
              defaultLinkUrl="#location"
              className="px-4 py-2 rounded-full text-xs font-extrabold text-white cursor-pointer inline-flex items-center"
              style={{ backgroundColor: primaryColor }}
            />
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg border border-white/15 cursor-pointer"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2 border-t border-white/10 pt-3 text-xs font-bold">
            {navLinks.map((lnk) => (
              <div key={lnk.id} className="py-1" onClick={() => setMobileOpen(false)}>
                <EditableText
                  id={`doc2_nav_v3_m_${lnk.id}`}
                  defaultText={lnk.label}
                  defaultLinkUrl={lnk.href}
                />
              </div>
            ))}
          </div>
        )}
      </header>
    );
  }

  /* VARIANT 1 (Exact Dribbble Screenshot Design): Clean White Cardiology Header + Outlined Pill "Contact Me" */
  return (
    <header
      id="home"
      className={`sticky top-0 z-30 border-b transition-colors ${
        isDark
          ? 'bg-[#0B1320]/95 border-white/10 text-white'
          : 'bg-white/95 border-slate-100 text-slate-900'
      } backdrop-blur-md`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left Brand: Heart Stethoscope Icon + Dr. Arjun Mehta / Cardiologist */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: isDark ? 'rgba(17, 140, 116, 0.2)' : '#E7F6F3',
              color: primaryColor,
            }}
          >
            <HeartPulse size={22} />
          </div>
          <div className="min-w-0 leading-tight">
            <EditableText
              id="doc2_nav_title"
              as="div"
              defaultText={title}
              defaultLinkUrl="#home"
              className="text-sm sm:text-base font-extrabold tracking-tight truncate"
            />
            <EditableText
              id="doc2_nav_subtitle"
              as="div"
              defaultText={subtitle}
              className="text-[11px] font-semibold truncate"
              style={{ color: primaryColor }}
            />
          </div>
        </div>

        {/* Center Navigation Links: About · Services · Reviews · Blog */}
        <nav className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
          {navLinks.map((lnk) => (
            <EditableText
              key={lnk.id}
              id={`doc2_nav_link_${lnk.id}`}
              defaultText={lnk.label}
              defaultLinkUrl={lnk.href}
              className="hover:text-[#118C74] transition cursor-pointer"
            />
          ))}
        </nav>

        {/* Right Outlined Pill Button: "Contact Me" */}
        <div className="flex items-center gap-2.5">
          <EditableButton
            id="doc2_nav_contact_btn"
            defaultText="Contact Me"
            defaultLinkUrl="#location"
            className="px-5 py-2 rounded-full text-xs font-bold border-2 transition hover:opacity-90 cursor-pointer inline-flex items-center justify-center"
            style={{
              borderColor: primaryColor,
              color: isDark ? '#FFFFFF' : primaryColor,
            }}
          />
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-white/15 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className={`md:hidden px-6 py-4 border-t space-y-2.5 text-sm font-semibold ${
            isDark
              ? 'bg-[#0B1320] border-white/10 text-white'
              : 'bg-white border-slate-100 text-slate-800'
          }`}
        >
          {navLinks.map((lnk) => (
            <div key={lnk.id} onClick={() => setMobileOpen(false)} className="py-1">
              <EditableText
                id={`doc2_nav_mob_v1_${lnk.id}`}
                defaultText={lnk.label}
                defaultLinkUrl={lnk.href}
              />
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Doctor2Navbar;
