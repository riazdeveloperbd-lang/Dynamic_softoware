import React, { useState } from 'react';
import {
  Scale,
  ShieldCheck,
  Lock,
  PhoneCall,
  MapPin,
  Clock,
  FileText,
  Calendar,
  Menu,
  X,
  Award,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';

export interface LexChambersNavbarProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

export const LexChambersNavbar: React.FC<LexChambersNavbarProps> = ({
  title,
  subtitle,
  variant,
  primaryColor,
  isDark,
}) => {
  const [language, setLanguage] = useState<'EN' | 'BN'>('EN');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const brassAccent = primaryColor || '#D97706';
  const navyBg = '#0F172A';

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full relative z-30">
      {/* Top Institutional Bar Council & Privilege Notice Strip */}
      <div
        className="w-full py-2 px-4 sm:px-6 text-white text-[11px] font-medium border-b border-white/10"
        style={{ backgroundColor: '#090E1A' }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-bold tracking-wide">
              <Award size={13} />
              <EditableText
                elementId="lex_nav_bar_badge"
                defaultText={
                  language === 'EN'
                    ? 'Bangladesh Bar Council & Supreme Court Bar Association'
                    : 'বাংলাদেশ বার কাউন্সিল ও সুপ্রিম কোর্ট বার অ্যাসোসিয়েশন'
                }
              />
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-300">
              <Lock size={12} className="text-emerald-400" />
              <EditableText
                elementId="lex_nav_privilege_note"
                defaultText={
                  language === 'EN'
                    ? 'Strict Attorney-Client Privilege (Evidence Act, Sec. 126)'
                    : 'কঠোর আইনজীবী-মক্কেল গোপনীয়তা (সাক্ষ্য আইন, ধারা ১২৬)'
                }
              />
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <span className="hidden lg:inline-flex items-center gap-1.5 text-slate-300">
              <MapPin size={12} style={{ color: brassAccent }} />
              <span>Supreme Court Bar Bldg (Room 408) · Gulshan-2 Corporate Suite</span>
            </span>

            {/* Bilingual Toggle */}
            <div className="inline-flex items-center rounded-md bg-slate-800/90 p-0.5 border border-slate-700">
              <button
                type="button"
                onClick={() => setLanguage('EN')}
                className={`px-2 py-0.5 rounded text-[10px] font-extrabold transition cursor-pointer ${
                  language === 'EN'
                    ? 'bg-amber-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('BN')}
                className={`px-2 py-0.5 rounded text-[10px] font-extrabold transition cursor-pointer ${
                  language === 'BN'
                    ? 'bg-amber-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Executive Navigation Header */}
      <header
        className={`w-full border-b transition-colors ${
          isDark || variant === 'varient_2'
            ? 'bg-[#0F172A] text-white border-slate-800'
            : 'bg-white/95 backdrop-blur-md text-slate-900 border-slate-200/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          {/* Firm Identity & Crest */}
          <div className="flex items-center gap-3.5">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md border border-amber-400/30 flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${navyBg} 0%, #1E293B 100%)`,
              }}
            >
              <Scale size={22} style={{ color: brassAccent }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="text-lg sm:text-xl font-black tracking-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  <EditableText elementId="lex_nav_title" defaultText={title} />
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25">
                  <ShieldCheck size={11} />
                  Verified Chambers
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[260px] sm:max-w-md">
                <EditableText elementId="lex_nav_subtitle" defaultText={subtitle} />
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-xs font-bold tracking-wide">
            <button
              type="button"
              onClick={() => scrollToSection('lex-practice-areas')}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition cursor-pointer"
            >
              {language === 'EN' ? 'Practice Areas' : 'আইনি সেবাসমূহ'}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('lex-case-precedents')}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition cursor-pointer"
            >
              {language === 'EN' ? 'Notable Matters & Precedents' : 'উল্লেখযোগ্য মামলা'}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('lex-consultation-intake')}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition cursor-pointer flex items-center gap-1"
            >
              <Lock size={12} style={{ color: brassAccent }} />
              <span>{language === 'EN' ? 'Confidential Intake' : 'গোপনীয় পরামর্শ'}</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('lex-insights-hub')}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition cursor-pointer"
            >
              {language === 'EN' ? 'Legal & Tax Insights' : 'আইন ও কর বিশ্লেষণ'}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('lex-chambers-footer')}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition cursor-pointer"
            >
              {language === 'EN' ? 'Chambers & Retainers' : 'চেম্বার ও রিটেইনার'}
            </button>
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => scrollToSection('lex-insights-hub')}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${
                isDark || variant === 'varient_2'
                  ? 'border-slate-700 text-slate-200 hover:bg-slate-800'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <FileText size={14} style={{ color: brassAccent }} />
              <span>{language === 'EN' ? '2026 Tax & RJSC Checklists' : 'কর ও আরজেএসসি গাইড'}</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('lex-consultation-intake')}
              className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-white shadow-md hover:opacity-95 transition flex items-center gap-2 cursor-pointer"
              style={{ backgroundColor: brassAccent }}
            >
              <Calendar size={14} />
              <span>
                <EditableText
                  elementId="lex_nav_cta_btn"
                  defaultText={
                    language === 'EN' ? 'Schedule Private Consultation' : 'পরামর্শের সময় নিন'
                  }
                />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 px-4 py-4 space-y-3 bg-slate-900 text-white">
            <div className="grid grid-cols-1 gap-2 text-xs font-bold">
              <button
                type="button"
                onClick={() => scrollToSection('lex-practice-areas')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-800"
              >
                1. Practice Areas & Statutory Mandates
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('lex-case-precedents')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-800"
              >
                2. Notable Case Precedents & Process
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('lex-consultation-intake')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-800"
              >
                3. Confidential Matter Evaluation & Booking
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('lex-insights-hub')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-800"
              >
                4. Legal Insights, Tax Briefs & Checklists
              </button>
            </div>
            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => scrollToSection('lex-consultation-intake')}
                className="w-full py-2.5 rounded-xl text-xs font-extrabold text-white flex items-center justify-center gap-2"
                style={{ backgroundColor: brassAccent }}
              >
                <Calendar size={14} />
                <span>Schedule Private Consultation</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
