import React, { useState } from 'react';
import {
  Scale,
  ShieldCheck,
  Award,
  Building2,
  FileText,
  Landmark,
  Briefcase,
  Globe2,
  Home,
  ArrowRight,
  CheckCircle2,
  Calendar,
  BookOpen,
  X,
  Lock,
  Sparkles,
  Gavel,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';

export interface LexChambersHeroPracticeSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

interface PracticeDomainItem {
  id: string;
  title: string;
  bnTitle: string;
  categoryTag: string;
  iconName: 'corporate' | 'tax' | 'supreme' | 'banking' | 'property' | 'fdi';
  summary: string;
  keyStatutes: string[];
  deliverables: string[];
  typicalTimeline: string;
  leadCounsel: string;
  retainerRange: string;
}

const PRACTICE_DOMAINS: PracticeDomainItem[] = [
  {
    id: 'corp_ma',
    title: 'Corporate & Commercial Law',
    bnTitle: 'কর্পোরেট ও বাণিজ্যিক আইন (RJSC ও M&A)',
    categoryTag: 'Corporate & M&A',
    iconName: 'corporate',
    summary:
      'End-to-end corporate structuring, M&A due diligence, Joint Venture shareholders agreements, RJSC statutory filings, and intellectual property protection.',
    keyStatutes: [
      'Companies Act 1994 (Amended)',
      'Contract Act 1872',
      'Bangladesh Competition Act 2012',
      'Trademarks Act 2009',
    ],
    deliverables: [
      'Comprehensive Red-Flag Legal Due Diligence Report',
      'Share Purchase & Shareholders Agreement (SPA / SHA) Drafting',
      'RJSC Form XII, XV, Schedule X & Board Resolution Filings',
      'Annual Corporate Secretarial & Governance Retainer',
    ],
    typicalTimeline: '7–21 Working Days (Standard RJSC / Transaction Cycle)',
    leadCounsel: 'Barrister K. M. Tariqul Islam (LL.M., LSE London)',
    retainerRange: '৳25,000 – ৳85,000 / month or Fixed Mandate',
  },
  {
    id: 'tax_vat',
    title: 'Tax, VAT & Customs Advisory',
    bnTitle: 'আয়কর, ভ্যাট ও কাস্টমস ট্রাইব্যুনাল পরামর্শ',
    categoryTag: 'NBR & Fiscal Law',
    iconName: 'tax',
    summary:
      'Strategic corporate & high-net-worth tax planning, NBR audit defense, Taxes Appellate Tribunal representation, VAT Act compliance, and customs valuation disputes.',
    keyStatutes: [
      'Income Tax Act 2023 & Finance Act 2026',
      'Value Added Tax and Supplementary Duty Act 2012',
      'Customs Act 2023',
      'Double Taxation Avoidance Agreements (DTAA)',
    ],
    deliverables: [
      'Corporate & Expatriate Income Tax Computation & Return Filing',
      'Representation before Deputy Commissioner of Taxes (DCT) & Appellate Tribunal',
      'VAT Mushak-9.1 Audit Defense & Input Tax Credit Optimization',
      'High Court Income Tax & VAT Reference Applications',
    ],
    typicalTimeline: '5–14 Days for Assessment Review · Statutory Appeal Windows',
    leadCounsel: 'Advocate Farhana Sultana, ITP (Supreme Court & Tax Bar)',
    retainerRange: '৳20,000 – ৳65,000 / month or Assessment-Based',
  },
  {
    id: 'writ_litigation',
    title: 'Supreme Court & High Court Litigation',
    bnTitle: 'সুপ্রিম কোর্ট রিট ও সাংবিধানিক মামলা',
    categoryTag: 'Constitutional & Appellate',
    iconName: 'supreme',
    summary:
      'High-stakes constitutional Writ Petitions under Article 102, Admiralty & Company Bench petitions, Civil Revisions, and Appellate Division representation.',
    keyStatutes: [
      'Constitution of Bangladesh (Article 102 Writ Jurisdiction)',
      'Code of Civil Procedure 1908',
      'Specific Relief Act 1877',
      'Companies Act 1994 (Section 233 Minority Protection & Winding Up)',
    ],
    deliverables: [
      'Drafting & Moving Urgent Writ Petitions challenging arbitrary regulatory action',
      'Stay Orders, Injunctions & Rule Nisi Hearings before Division Benches',
      'Company Matter Petitions (Board Deadlock, Share Rectification)',
      'Civil & Commercial Appeals before the Appellate Division',
    ],
    typicalTimeline: 'Urgent Motion within 48–72 Hours · Full Hearing per Cause List',
    leadCounsel: 'Barrister K. M. Tariqul Islam, Senior Advocate Panel',
    retainerRange: 'Per Appearance / Brief Fee Schedule',
  },
  {
    id: 'banking_arb',
    title: 'Banking, Finance & Commercial Arbitration',
    bnTitle: 'ব্যাংকিং, অর্থঋণ ও আন্তর্জাতিক সালিশি',
    categoryTag: 'Banking & ADR',
    iconName: 'banking',
    summary:
      'Syndicated loan documentation, Artha Rin Adalat litigation, Bangladesh Bank regulatory compliance, and domestic/international arbitration (BIAC, SIAC, ICC).',
    keyStatutes: [
      'Artha Rin Adalat Ain 2003',
      'Arbitration Act 2001 (Bangladesh)',
      'Bank Companies Act 1991',
      'Negotiable Instruments Act 1881 (Section 138 Corporate Defense)',
    ],
    deliverables: [
      'Syndicated Term Loan, Mortgage & Pari-Passu Charge Documentation',
      'Statement of Claim / Defense in Arbitral Tribunals (BIAC / SIAC Rules)',
      'Enforcement of Foreign Arbitral Awards before Dhaka District Court',
      'Regulatory Representation before Bangladesh Bank FEID',
    ],
    typicalTimeline: '3–6 Months (Fast-Track Commercial Arbitration)',
    leadCounsel: 'Barrister Zeeshan Mahmood, MCIArb (UK)',
    retainerRange: 'Ad Valorem / Milestone Retainer Structure',
  },
  {
    id: 'real_estate',
    title: 'Real Estate, Land & Property Conveyancing',
    bnTitle: 'জমি, ফ্ল্যাট ভেটিং ও রাজউক/দলিল নিবন্ধন',
    categoryTag: 'Property & Title Vetting',
    iconName: 'property',
    summary:
      '30-year chain-of-title verification (CS, SA, RS, BS Khatian), Joint Venture developer agreements, Sub-Kabala deed drafting, and RAJUK/AC Land mutation.',
    keyStatutes: [
      'Transfer of Property Act 1882',
      'Registration Act 1908',
      'State Acquisition and Tenancy Act 1950',
      'Real Estate Development and Management Act 2010',
    ],
    deliverables: [
      'Certified 30-Year Non-Encumbrance & Title Vetting Legal Opinion',
      'Tripartite Developer Joint Venture & Power of Attorney Drafting',
      'Sale Deed (Saf Kabala), Heba, and Mortgage Deed Registration',
      'Land Tribunal, Partition Suits & Pre-emption Litigation',
    ],
    typicalTimeline: '5–10 Working Days for Complete Title Vetting Opinion',
    leadCounsel: 'Advocate M. A. Rouf (22+ Years Land & Civil Practice)',
    retainerRange: 'Fixed Vetting Fee from ৳15,000 / Property File',
  },
  {
    id: 'fdi_bida',
    title: 'Foreign Direct Investment (FDI) & Employment',
    bnTitle: 'বৈদেশিক বিনিয়োগ (BIDA) ও শ্রম আইন কমপ্লায়েন্স',
    categoryTag: 'Cross-Border & Labor',
    iconName: 'fdi',
    summary:
      'Turnkey market entry for foreign subsidiaries, branch/liaison offices, BIDA work permits, outward profit repatriation, and Bangladesh Labor Act compliance.',
    keyStatutes: [
      'Foreign Exchange Regulation Act (FERA) 1947',
      'Bangladesh Investment Development Authority (BIDA) Act 2016',
      'Bangladesh Labour Act 2006 (Amended 2018)',
      'BEPZA & BEZA Economic Zone Regulations',
    ],
    deliverables: [
      '100% Foreign-Owned Subsidiary or Branch/Liaison Office Incorporation',
      'BIDA E-Visa Recommendation, Expatriate Work Permit & Security Clearance',
      'Section 18B Bangladesh Bank Reporting & Royalty/Dividend Repatriation',
      'Employee Handbooks, Gratuity/Provident Fund Trust Deeds & Labor Court Defense',
    ],
    typicalTimeline: '14–30 Working Days (BIDA + RJSC + Authorized Dealer Bank)',
    leadCounsel: 'Barrister K. M. Tariqul Islam & Cross-Border Desk',
    retainerRange: 'Turnkey Incorporation & Monthly Retainer Packages',
  },
];

export const LexChambersHeroPracticeSection: React.FC<
  LexChambersHeroPracticeSectionProps
> = ({ title, subtitle, variant, primaryColor, isDark }) => {
  const [selectedPractice, setSelectedPractice] = useState<PracticeDomainItem | null>(
    null
  );
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const brassAccent = primaryColor || '#D97706';
  const navyPrimary = '#0F172A';

  const scrollToIntake = (practiceTitle?: string) => {
    setSelectedPractice(null);
    const el = document.getElementById('lex-consultation-intake');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    if (practiceTitle) {
      window.dispatchEvent(
        new CustomEvent('lexchambers:select-practice', { detail: practiceTitle })
      );
    }
  };

  const renderDomainIcon = (iconName: PracticeDomainItem['iconName']) => {
    switch (iconName) {
      case 'corporate':
        return <Building2 size={22} style={{ color: brassAccent }} />;
      case 'tax':
        return <FileText size={22} style={{ color: brassAccent }} />;
      case 'supreme':
        return <Scale size={22} style={{ color: brassAccent }} />;
      case 'banking':
        return <Landmark size={22} style={{ color: brassAccent }} />;
      case 'property':
        return <Home size={22} style={{ color: brassAccent }} />;
      case 'fdi':
        return <Globe2 size={22} style={{ color: brassAccent }} />;
    }
  };

  const filteredPractices =
    activeFilter === 'All'
      ? PRACTICE_DOMAINS
      : PRACTICE_DOMAINS.filter((item) => item.categoryTag === activeFilter);

  return (
    <div className="w-full">
      {/* =================================================================== */}
      {/* 1. EXECUTIVE HERO SECTION (NAVY #0F172A + GOLD/BRASS #D97706)       */}
      {/* =================================================================== */}
      <section
        className="relative overflow-hidden text-white py-16 lg:py-24 px-4 sm:px-6 border-b border-slate-800"
        style={{
          background:
            'radial-gradient(circle at 85% 15%, rgba(217, 119, 6, 0.16) 0%, rgba(15, 23, 42, 0.98) 52%, #090E1A 100%)',
        }}
      >
        {/* Subtle Architectural Grid Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className={`grid grid-cols-1 ${
              variant === 'varient_2'
                ? 'max-w-4xl mx-auto text-center gap-10'
                : 'lg:grid-cols-12 gap-10 lg:gap-12 items-center'
            }`}
          >
            {/* Left Column: Authoritative Legal Copy & Trust Indicators */}
            <div
              className={
                variant === 'varient_2' ? 'space-y-6' : 'lg:col-span-7 space-y-6'
              }
            >
              {/* Institutional Top Pill */}
              <div
                className={`inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide ${
                  variant === 'varient_2' ? 'mx-auto' : ''
                }`}
              >
                <Gavel size={14} />
                <EditableText
                  elementId="lex_hero_top_pill"
                  defaultText="Supreme Court of Bangladesh (Appellate & High Court Divisions) · Corporate & Tax Chambers"
                />
              </div>

              {/* Serif Headline */}
              <h1
                className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight leading-[1.08] text-white"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                <EditableText elementId="lex_hero_headline" defaultText={title} />
              </h1>

              {/* Subheadline */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                <EditableText elementId="lex_hero_subheadline" defaultText={subtitle} />
              </p>

              {/* Bilingual Assurance Line */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 flex items-center gap-3 max-w-2xl">
                <Lock size={18} className="text-amber-400 flex-shrink-0" />
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white font-bold">
                    গোপনীয় ও প্রাতিষ্ঠানিক আইনি সুরক্ষা:
                  </strong>{' '}
                  উচ্চ আদালতের রিট, কর্পোরেট চুক্তি, আয়কর/ভ্যাট ট্রাইব্যুনাল এবং বৈদেশিক বিনিয়োগে
                  ১৫+ বছরের অভিজ্ঞ ব্যারিস্টার ও অ্যাডভোকেট প্যানেল।
                </p>
              </div>

              {/* Primary CTAs */}
              <div
                className={`flex flex-wrap items-center gap-3.5 pt-2 ${
                  variant === 'varient_2' ? 'justify-center' : ''
                }`}
              >
                <button
                  type="button"
                  onClick={() => scrollToIntake()}
                  className="px-6 py-4 rounded-xl text-xs sm:text-sm font-extrabold text-white shadow-lg hover:opacity-95 transition flex items-center gap-2.5 cursor-pointer"
                  style={{ backgroundColor: brassAccent }}
                >
                  <Calendar size={16} />
                  <span>
                    <EditableText
                      elementId="lex_hero_primary_cta"
                      defaultText="Schedule Private Consultation"
                    />
                  </span>
                  <ArrowRight size={15} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('lex-practice-areas');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-4 rounded-xl text-xs sm:text-sm font-bold text-slate-100 bg-slate-800/90 hover:bg-slate-800 border border-slate-700 transition flex items-center gap-2 cursor-pointer"
                >
                  <Briefcase size={15} style={{ color: brassAccent }} />
                  <span>
                    <EditableText
                      elementId="lex_hero_secondary_cta"
                      defaultText="Explore Practice Areas"
                    />
                  </span>
                </button>
              </div>

              {/* Trust Indicators Bar */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="flex items-center gap-2.5 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <Award size={18} style={{ color: brassAccent }} className="flex-shrink-0" />
                  <div>
                    <div className="text-xs font-extrabold text-white">
                      Bangladesh Bar Council
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Enrolled Roll #SC-2011-0842
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <Scale size={18} style={{ color: brassAccent }} className="flex-shrink-0" />
                  <div>
                    <div className="text-xs font-extrabold text-white">
                      Supreme Court Bar Assoc.
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Room #408, Main SCBA Bldg
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <ShieldCheck
                    size={18}
                    className="text-emerald-400 flex-shrink-0"
                  />
                  <div>
                    <div className="text-xs font-extrabold text-white">
                      1,200+ Matters Advised
                    </div>
                    <div className="text-[11px] text-slate-400">
                      ৳4,800+ Cr Corporate & Tax Value
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Principal Advocate / Managing Partner Spotlight Card */}
            {variant !== 'varient_2' && (
              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-slate-900/95 border border-amber-500/30 shadow-2xl overflow-hidden">
                  {/* Top Portrait & Credentials Banner */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-800">
                    <img
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85"
                      alt="Barrister K. M. Tariqul Islam — Head of Chambers"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/45 to-transparent" />

                    {/* Top Right Verified Bar Seal */}
                    <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-400/40 text-amber-300 text-[11px] font-bold flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-emerald-400" />
                      <span>Senior Counsel · 16+ Yrs Standing</span>
                    </div>

                    {/* Bottom Name Overlay */}
                    <div className="absolute bottom-3.5 left-4 right-4">
                      <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-slate-950 mb-1.5">
                        Head of Chambers & Principal Advocate
                      </span>
                      <h2
                        className="text-xl sm:text-2xl font-bold text-white leading-tight"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        <EditableText
                          elementId="lex_advocate_name"
                          defaultText="Barrister K. M. Tariqul Islam"
                        />
                      </h2>
                      <p className="text-xs text-amber-300/95 font-semibold mt-0.5">
                        <EditableText
                          elementId="lex_advocate_creds"
                          defaultText="Advocate, Supreme Court of Bangladesh | LL.M. (LSE, London) | Barrister-at-Law (Lincoln's Inn)"
                        />
                      </p>
                    </div>
                  </div>

                  {/* Card Body: Academic, Admissions & Direct Booking */}
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-2.5 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                          Court Standing
                        </div>
                        <div className="font-bold text-white mt-0.5">
                          Appellate & High Court Div.
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                          Specializations
                        </div>
                        <div className="font-bold text-white mt-0.5">
                          M&A, Tax Writs & Arbitration
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300">
                      <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                        <span className="text-slate-400">High Court Chamber:</span>
                        <span className="font-semibold text-white">
                          Room 408, SCBA Bldg (9 AM – 4 PM)
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                        <span className="text-slate-400">Corporate Evening Chamber:</span>
                        <span className="font-semibold text-white">
                          Gulshan-2 Avenue (5 PM – 9 PM)
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span className="text-slate-400">International Desk:</span>
                        <span className="font-semibold text-emerald-400">
                          London · Singapore · Dubai Zoom Desk
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => scrollToIntake('Direct Senior Counsel Consultation')}
                      className="w-full py-3 rounded-xl text-xs font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-300 transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <Lock size={14} />
                      <span>Book Confidential Case Review (৳3,000)</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 2. PRACTICE AREAS GRID (6 CORE LEGAL DOMAINS + STATUTORY MODAL)     */}
      {/* =================================================================== */}
      <section
        id="lex-practice-areas"
        className={`py-16 lg:py-20 px-4 sm:px-6 ${
          isDark ? 'bg-[#0B1120] text-white' : 'bg-[#F8FAFC] text-[#1E2937]'
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Section Header & Category Filter */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                <Scale size={14} />
                <span>Statutory Practice Areas & Chambers Mandates</span>
              </div>
              <h2
                className="text-2xl sm:text-4xl font-bold tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                <EditableText
                  elementId="lex_practice_heading"
                  defaultText="Comprehensive Legal Counsel Across Six Core Jurisdictions"
                />
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Click any practice domain to inspect applicable Bangladesh statutes, key
                legal deliverables, lead counsel credentials, and typical filing timelines.
              </p>
            </div>

            {/* Domain Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-slate-200/80 dark:bg-slate-800/90 self-start">
              {[
                'All',
                'Corporate & M&A',
                'NBR & Fiscal Law',
                'Constitutional & Appellate',
                'Banking & ADR',
                'Property & Title Vetting',
                'Cross-Border & Labor',
              ].map((cat) => {
                const active = activeFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                      active
                        ? 'text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    style={active ? { backgroundColor: navyPrimary } : undefined}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6-Card Practice Area Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPractices.map((domain) => (
              <div
                key={domain.id}
                className={`rounded-2xl p-6 border transition-all flex flex-col justify-between space-y-5 hover:-translate-y-0.5 hover:shadow-xl ${
                  isDark
                    ? 'bg-slate-900/90 border-slate-800 hover:border-amber-500/40'
                    : 'bg-white border-slate-200/90 hover:border-amber-500/50 shadow-xs'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center border border-amber-500/25"
                      style={{ backgroundColor: '#0F172A' }}
                    >
                      {renderDomainIcon(domain.iconName)}
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                      {domain.categoryTag}
                    </span>
                  </div>

                  <div>
                    <h3
                      className="text-lg sm:text-xl font-bold leading-snug"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {domain.title}
                    </h3>
                    <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-0.5">
                      {domain.bnTitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {domain.summary}
                  </p>

                  {/* Key Statutes Preview */}
                  <div className="pt-2 space-y-1.5">
                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      Governing Statutes & Forums:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {domain.keyStatutes.slice(0, 2).map((st) => (
                        <span
                          key={st}
                          className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          {st}
                        </span>
                      ))}
                      {domain.keyStatutes.length > 2 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300">
                          +{domain.keyStatutes.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Bottom Actions */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPractice(domain)}
                    className="text-xs font-extrabold flex items-center gap-1.5 hover:underline cursor-pointer"
                    style={{ color: brassAccent }}
                  >
                    <BookOpen size={14} />
                    <span>View Statutory Scope</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToIntake(domain.title)}
                    className="px-3.5 py-2 rounded-lg text-xs font-bold text-white transition hover:opacity-95 flex items-center gap-1 cursor-pointer"
                    style={{ backgroundColor: navyPrimary }}
                  >
                    <span>Consult Desk</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* PRACTICE AREA STATUTORY SCOPE & DELIVERABLES MODAL                  */}
      {/* =================================================================== */}
      {selectedPractice && (
        <div
          onClick={() => setSelectedPractice(null)}
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden text-slate-900 dark:text-white"
          >
            {/* Modal Header */}
            <div
              className="p-6 text-white flex items-start justify-between gap-4"
              style={{ backgroundColor: navyPrimary }}
            >
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-slate-950">
                  {selectedPractice.categoryTag}
                </span>
                <h3
                  className="text-xl sm:text-2xl font-bold"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {selectedPractice.title}
                </h3>
                <p className="text-xs text-amber-300 font-medium">
                  {selectedPractice.bnTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPractice(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedPractice.summary}
              </p>

              {/* Governing Laws */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Applicable Statutes & Regulatory Frameworks
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedPractice.keyStatutes.map((law) => (
                    <div
                      key={law}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 text-xs font-bold flex items-center gap-2"
                    >
                      <Scale size={14} style={{ color: brassAccent }} />
                      <span>{law}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Key Chamber Deliverables & Representation
                </h4>
                <ul className="space-y-2">
                  {selectedPractice.deliverables.map((deliv) => (
                    <li
                      key={deliv}
                      className="text-xs flex items-start gap-2.5 text-slate-700 dark:text-slate-200"
                    >
                      <CheckCircle2
                        size={15}
                        className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5"
                      />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Timeline & Retainer Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                    Lead Practice Partner
                  </div>
                  <div className="text-xs font-bold mt-1">
                    {selectedPractice.leadCounsel}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                    Indicative Fee / Retainer Structure
                  </div>
                  <div className="text-xs font-bold mt-1">
                    {selectedPractice.retainerRange}
                  </div>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedPractice(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 cursor-pointer"
                >
                  Close Window
                </button>
                <button
                  type="button"
                  onClick={() => scrollToIntake(selectedPractice.title)}
                  className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-white flex items-center gap-2 cursor-pointer"
                  style={{ backgroundColor: brassAccent }}
                >
                  <Calendar size={14} />
                  <span>Proceed to Confidential Intake for {selectedPractice.categoryTag}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
