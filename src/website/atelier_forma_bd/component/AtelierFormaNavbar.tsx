import React, { useState } from 'react';
import {
  Compass,
  Layers,
  SlidersHorizontal,
  ArrowUpRight,
  MapPin,
  PhoneCall,
  Calendar,
  Menu,
  X,
  CheckCircle2,
  Eye,
  Sparkles,
  Building2,
  Ruler,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';

export interface AtelierFormaNavbarProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

export const AtelierFormaNavbar: React.FC<AtelierFormaNavbarProps> = ({
  title,
  subtitle,
  variant,
  primaryColor,
  isDark,
}) => {
  const [lang, setLang] = useState<'EN' | 'BN'>('EN');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBriefModal, setShowBriefModal] = useState(false);
  const [briefSubmitted, setBriefSubmitted] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('+880 17');
  const [projectLocation, setProjectLocation] = useState('Gulshan-2 / Banani');
  const [spaceArea, setSpaceArea] = useState('2,800 sq. ft.');

  const isEditorialDark = variant === 'varient_2' || isDark;
  const isSplitMonolith = variant === 'varient_3';

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-300 ${
        isEditorialDark
          ? 'bg-[#121212]/95 text-[#F9F9F9] border-b border-white/10'
          : 'bg-[#F9F9F9]/95 text-[#121212] border-b border-[#121212]/10'
      } backdrop-blur-md`}
    >
      {/* Top Studio Telemetry Ribbon */}
      <div
        className={`w-full px-4 sm:px-8 py-2 text-[11px] border-b ${
          isEditorialDark
            ? 'bg-[#0A0A0A] border-white/10 text-[#E8DCC4]/85'
            : 'bg-[#121212] border-black/10 text-[#E8DCC4]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            <span className="flex items-center gap-1.5 font-medium tracking-wider uppercase">
              <Compass size={12} style={{ color: primaryColor }} />
              <span>
                {lang === 'EN'
                  ? 'IAB Registered Architectural & Spatial Practice · Reg #A-0942'
                  : 'আইএবি নিবন্ধিত স্থাপত্য ও ইন্টেরিয়র স্টুডিও · রেজি #A-0942'}
              </span>
            </span>
            <span className="hidden md:inline opacity-40">·</span>
            <span className="hidden md:flex items-center gap-1.5 opacity-85">
              <MapPin size={11} style={{ color: primaryColor }} />
              <span>
                {lang === 'EN'
                  ? 'Studios: Gulshan-2 (Dhaka) · Dhanmondi Rd 27 · Khulshi (Chattogram)'
                  : 'স্টুডিও: গুলশান-২ (ঢাকা) · ধানমন্ডি ২৭ · খুলশী (চট্টগ্রাম)'}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('atelier-estimator')}
              className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold hover:underline cursor-pointer"
              style={{ color: '#E8DCC4' }}
            >
              <Ruler size={11} style={{ color: primaryColor }} />
              <span>
                {lang === 'EN'
                  ? '2026 Sq.Ft. Turnkey Rate Index: ৳1,850 – ৳4,800/sft'
                  : '২০২৬ স্কয়ার ফিট রেট ইনডেক্স: ৳১,৮৫০ – ৳৪,৮০০/sft'}
              </span>
            </button>

            {/* EN / BN Language Switcher */}
            <div className="flex items-center bg-white/10 rounded p-0.5 border border-white/15">
              <button
                type="button"
                onClick={() => setLang('EN')}
                className={`px-2 py-0.5 text-[10px] font-bold rounded transition cursor-pointer ${
                  lang === 'EN'
                    ? 'bg-[#E8DCC4] text-[#121212]'
                    : 'text-[#E8DCC4]/75 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('BN')}
                className={`px-2 py-0.5 text-[10px] font-bold rounded transition cursor-pointer ${
                  lang === 'BN'
                    ? 'bg-[#E8DCC4] text-[#121212]'
                    : 'text-[#E8DCC4]/75 hover:text-white'
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Architectural Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between gap-6">
        {/* Brand Identity */}
        <div className="flex items-center gap-3.5 min-w-0">
          <div
            className="w-10 h-10 flex items-center justify-center text-white font-serif text-lg tracking-widest flex-shrink-0 border border-white/15"
            style={{ backgroundColor: '#121212' }}
          >
            <span style={{ color: primaryColor }}>A</span>F
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <EditableText
                as="span"
                value={title}
                className="text-base sm:text-lg font-serif font-bold tracking-tight truncate"
              />
              <span className="hidden xl:inline text-[10px] uppercase tracking-[0.2em] opacity-55">
                {lang === 'EN' ? 'DHAKA · SINGAPORE' : 'ঢাকা · সিঙ্গাপুর'}
              </span>
            </div>
            <EditableText
              as="p"
              value={subtitle}
              className="text-[11px] opacity-65 truncate max-w-md"
            />
          </div>
        </div>

        {/* Clean Unboxed Typography Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium tracking-wider uppercase">
          <button
            type="button"
            onClick={() => scrollToSection('atelier-masonry-gallery')}
            className="hover:opacity-100 opacity-75 transition border-b border-transparent hover:border-current py-1 cursor-pointer"
          >
            {lang === 'EN' ? '01. Portfolio' : '০১. পোর্টফোলিও'}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('atelier-transformation-slider')}
            className="hover:opacity-100 opacity-75 transition border-b border-transparent hover:border-current py-1 cursor-pointer"
          >
            {lang === 'EN' ? '02. Before / After' : '০২. বিফোর / আফটার'}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('atelier-services-matrix')}
            className="hover:opacity-100 opacity-75 transition border-b border-transparent hover:border-current py-1 cursor-pointer"
          >
            {lang === 'EN' ? '03. Disciplines' : '০৩. সার্ভিস সমূহ'}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('atelier-estimator')}
            className="hover:opacity-100 opacity-75 transition border-b border-transparent hover:border-current py-1 cursor-pointer"
          >
            {lang === 'EN' ? '04. Cost Estimator' : '০৪. প্রজেক্ট ক্যালকুলেটর'}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('atelier-material-board')}
            className="hover:opacity-100 opacity-75 transition border-b border-transparent hover:border-current py-1 cursor-pointer"
          >
            {lang === 'EN' ? '05. Materiality' : '০৫. ম্যাটেরিয়াল বোর্ড'}
          </button>
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollToSection('atelier-estimator')}
            className={`px-4 py-2.5 text-xs font-semibold tracking-wider uppercase border transition cursor-pointer ${
              isEditorialDark
                ? 'border-white/25 text-[#E8DCC4] hover:bg-white/5'
                : 'border-[#121212]/25 text-[#121212] hover:bg-[#121212]/5'
            } ${isSplitMonolith ? 'rounded-none' : 'rounded-lg'}`}
          >
            {lang === 'EN' ? 'Calculate Project Cost' : 'খরচ হিসাব করুন'}
          </button>

          <button
            type="button"
            onClick={() => {
              setBriefSubmitted(false);
              setShowBriefModal(true);
            }}
            className={`px-4 py-2.5 text-xs font-bold tracking-wider uppercase text-white flex items-center gap-1.5 transition hover:opacity-95 cursor-pointer ${
              isSplitMonolith ? 'rounded-none' : 'rounded-lg'
            }`}
            style={{ backgroundColor: primaryColor }}
          >
            <span>{lang === 'EN' ? 'Book Site Visit' : 'সাইট ভিজিট বুক করুন'}</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg border border-current/15 cursor-pointer"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden px-6 py-5 border-t space-y-4 ${
            isEditorialDark
              ? 'bg-[#121212] border-white/10 text-[#F9F9F9]'
              : 'bg-[#F9F9F9] border-black/10 text-[#121212]'
          }`}
        >
          <div className="flex flex-col space-y-2.5 text-xs font-semibold uppercase tracking-wider">
            <button
              type="button"
              onClick={() => scrollToSection('atelier-masonry-gallery')}
              className="text-left py-1.5 border-b border-current/10"
            >
              01. Curated Works & Case Studies
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('atelier-transformation-slider')}
              className="text-left py-1.5 border-b border-current/10"
            >
              02. Interactive Before / After Slider
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('atelier-services-matrix')}
              className="text-left py-1.5 border-b border-current/10"
            >
              03. Architectural & Turnkey Services
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('atelier-estimator')}
              className="text-left py-1.5 border-b border-current/10"
            >
              04. Project Cost & Scope Estimator
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('atelier-material-board')}
              className="text-left py-1.5"
            >
              05. Tactile Materiality & Studio Footer
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => scrollToSection('atelier-estimator')}
              className="py-2.5 px-3 text-xs font-bold uppercase tracking-wider border border-current/25 rounded-lg text-center"
            >
              Cost Estimator
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setBriefSubmitted(false);
                setShowBriefModal(true);
              }}
              className="py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-white rounded-lg text-center"
              style={{ backgroundColor: primaryColor }}
            >
              Book Site Visit
            </button>
          </div>
        </div>
      )}

      {/* Express Site Visit & Floor Plan Brief Modal */}
      {showBriefModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowBriefModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl bg-[#121212] text-[#F9F9F9] border border-[#E8DCC4]/25 p-6 sm:p-8 shadow-2xl space-y-6"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: primaryColor }}
                >
                  PRINCIPAL ARCHITECT CONSULTATION
                </p>
                <h3 className="text-xl font-serif font-bold mt-1">
                  Schedule Private Site Assessment or Studio Review
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowBriefModal(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {briefSubmitted ? (
              <div className="p-5 rounded-xl bg-white/5 border border-[#E8DCC4]/30 space-y-3">
                <div className="flex items-center gap-2.5 text-[#E8DCC4]">
                  <CheckCircle2 size={20} style={{ color: primaryColor }} />
                  <span className="text-sm font-bold">
                    Architectural Brief Logged · Ref #AF-{Math.floor(1000 + Math.random() * 9000)}
                  </span>
                </div>
                <p className="text-xs text-white/75 leading-relaxed">
                  Thank you, <strong>{clientName || 'Valued Client'}</strong>. Our Senior Project
                  Architect for <strong>{projectLocation}</strong> will contact you on{' '}
                  <strong>{clientPhone}</strong> within 4 working hours to confirm your laser-measurement
                  site visit or CAD floor plan review.
                </p>
                <button
                  type="button"
                  onClick={() => setShowBriefModal(false)}
                  className="w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#121212] bg-[#E8DCC4] cursor-pointer"
                >
                  Return to Portfolio
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setBriefSubmitted(true);
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-white/65 mb-1">
                      Client / Developer Name
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g., Tariqul Islam"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8DCC4]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-white/65 mb-1">
                      WhatsApp / Mobile (+880)
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8DCC4]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-white/65 mb-1">
                      Site Zone / Neighborhood
                    </label>
                    <select
                      value={projectLocation}
                      onChange={(e) => setProjectLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#1A1A1A] border border-white/15 text-xs text-white focus:outline-none"
                    >
                      <option>Gulshan-1 / Gulshan-2</option>
                      <option>Banani / Baridhara Diplomatic Zone</option>
                      <option>Bashundhara R/A (Blocks A–N)</option>
                      <option>Dhanmondi / Lalmatia</option>
                      <option>Uttara Sector 1–14</option>
                      <option>Purbachal New Town (RAJUK Plot)</option>
                      <option>Khulshi / Nasirabad (Chattogram)</option>
                      <option>International 3D Visualization Only</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-white/65 mb-1">
                      Approximate Area (Sq. Ft. / Katha)
                    </label>
                    <input
                      type="text"
                      value={spaceArea}
                      onChange={(e) => setSpaceArea(e.target.value)}
                      placeholder="e.g., 3,200 sq. ft. or 5 Katha"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-[#E8DCC4]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-[#E8DCC4]/75">
                    Includes Preliminary Zoning & Acoustics Check
                  </span>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white cursor-pointer"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Confirm Consultation Slot
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
