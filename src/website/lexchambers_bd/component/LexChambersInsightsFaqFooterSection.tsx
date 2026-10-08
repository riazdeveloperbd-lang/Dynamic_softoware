import React, { useState } from 'react';
import {
  BookOpen,
  FileText,
  Download,
  CheckCircle2,
  MapPin,
  Clock,
  PhoneCall,
  Mail,
  Scale,
  ShieldCheck,
  Lock,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  Building2,
  X,
  FileCheck2,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';

export interface LexChambersInsightsFaqFooterSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

interface LegalInsightBrief {
  id: string;
  tag: '#CompanyLaw' | '#TaxPolicy' | '#HighCourtWrits' | '#PropertyDisputes' | '#Arbitration';
  categoryLabel: string;
  dateLabel: string;
  readTime: string;
  title: string;
  bnTitle: string;
  excerpt: string;
  keyTakeaways: string[];
  checklistFileName: string;
}

const LEGAL_INSIGHTS: LegalInsightBrief[] = [
  {
    id: 'brief_finance_act',
    tag: '#TaxPolicy',
    categoryLabel: 'NBR Fiscal Update · Finance Act 2026',
    dateLabel: 'Updated October 2026',
    readTime: '6 Min Read + PDF',
    title: 'Key Changes in Bangladesh Corporate Tax & Withholding TDS Rules (FY 2025–2026)',
    bnTitle: 'কর্পোরেট আয়কর ও উৎসে কর (TDS) কর্তনের নতুন বিধান ও কমপ্লায়েন্স গাইডলাইন',
    excerpt:
      'Detailed breakdown of revised corporate tax slabs for Private Limited companies, mandatory proof of return submission (PSR), and Section 163 minimum tax implications.',
    keyTakeaways: [
      'Conditional 2.5% corporate tax rebate compliance requirements (cash transaction thresholds)',
      'Updated Withholding Tax (TDS) rates on vendor payments, software royalties, and advisory fees',
      'Step-by-step protocol for defending Section 212 audit notices before the DCT',
    ],
    checklistFileName: 'LexChambers_FY2026_Corporate_Tax_TDS_Checklist.pdf',
  },
  {
    id: 'brief_rjsc_fdi',
    tag: '#CompanyLaw',
    categoryLabel: 'RJSC & BIDA Corporate Guide',
    dateLabel: 'Updated September 2026',
    readTime: '8 Min Read + Checklist',
    title: 'Complete Guide to Company Registration (RJSC) & Foreign Share Transfer in Bangladesh',
    bnTitle: 'আরজেএসসি (RJSC) কোম্পানি নিবন্ধন, ফর্ম ১১৭ ও বৈদেশিক শেয়ার হস্তান্তর প্রক্রিয়া',
    excerpt:
      'From Name Clearance and Memorandum of Association (MoA) drafting to Section 18B Bangladesh Bank reporting and outward dividend repatriation.',
    keyTakeaways: [
      'Document checklist for 100% Foreign-Owned Subsidiary vs. BIDA Branch/Liaison Office',
      'Mandatory Form-117 share transfer valuation rules for non-resident shareholders',
      'Annual Schedule-X, Form-XII, and AGM statutory filing calendar to avoid High Court condonation',
    ],
    checklistFileName: 'LexChambers_RJSC_FDI_Incorporation_SOP_2026.pdf',
  },
  {
    id: 'brief_land_vetting',
    tag: '#PropertyDisputes',
    categoryLabel: 'Real Estate & Conveyancing',
    dateLabel: 'Updated August 2026',
    readTime: '7 Min Read + 18-Point Checklist',
    title: '30-Year Land & Apartment Title Vetting Checklist Before Signing a Deed in Dhaka',
    bnTitle: 'ঢাকায় জমি বা ফ্ল্যাট ক্রয়ের পূর্বে ৩০ বছরের চেইন-অফ-টাইটেল ও খতিয়ান যাচাই গাইড',
    excerpt:
      'How to verify CS, SA, RS, and BS/City Jorip Khatians, Non-Encumbrance Certificates (NEC), RAJUK occupancy approvals, and developer Tripartite Joint Venture powers.',
    keyTakeaways: [
      'Verifying unbroken 30-year chain of ownership (Baya Deeds) and AC Land Mutation Khatian',
      'Detecting hidden bank mortgages, Waqf/vested property claims, and court injunctions',
      'Mandatory clauses in Developer Joint Venture Agreements & Irrevocable General Power of Attorney',
    ],
    checklistFileName: 'LexChambers_30Year_Property_Title_Vetting_Checklist.pdf',
  },
  {
    id: 'brief_writ_102',
    tag: '#HighCourtWrits',
    categoryLabel: 'Constitutional & Administrative Law',
    dateLabel: 'Updated October 2026',
    readTime: '5 Min Read + Precedent Note',
    title: 'When & How to Invoke Article 102 Writ Jurisdiction Against Arbitrary Regulatory Action',
    bnTitle: 'সংবিধানের ১০২ অনুচ্ছেদে হাইকোর্টে রিট পিটিশন ও স্থগিতাদেশের আইনি শর্তাবলী',
    excerpt:
      'Understanding exhaustion of statutory remedies, ultra vires show-cause notices, malafide administrative orders, and interim Stay Orders in the High Court Division.',
    keyTakeaways: [
      'Exceptions to the doctrine of exhaustion of alternative statutory appellate forums',
      'Urgent documentation required for moving a Stay Application within 48 hours',
      'Compliance with Rule Nisi directions and Contempt of Court enforcement',
    ],
    checklistFileName: 'LexChambers_HighCourt_Writ_Filing_Dossier_Guide.pdf',
  },
  {
    id: 'brief_arb_biac',
    tag: '#Arbitration',
    categoryLabel: 'Commercial Dispute Resolution',
    dateLabel: 'Updated July 2026',
    readTime: '6 Min Read + Clause Template',
    title: 'Drafting Enforceable Arbitration Clauses & Section 7A Interim Relief in Bangladesh',
    bnTitle: 'বাণিজ্যিক চুক্তিতে সালিশি ধারা (Arbitration Clause) ও ধারা ৭ক অন্তর্বর্তীকালীন প্রতিকার',
    excerpt:
      'Preventing multi-year civil court delays by structuring BIAC, SIAC, or ICC arbitration clauses and securing bank guarantee injunctions under the Arbitration Act 2001.',
    keyTakeaways: [
      'Model governing law and seat-of-arbitration clauses for domestic & cross-border contracts',
      'Invoking Section 7A before the High Court / District Judge for asset preservation',
      'grounds for challenging or enforcing arbitral awards under Sections 42–45',
    ],
    checklistFileName: 'LexChambers_Commercial_Arbitration_Clause_Handbook.pdf',
  },
];

const LEGAL_FAQS = [
  {
    q: 'Are documents and facts shared during an initial consultation protected by Attorney-Client Privilege?',
    a: 'Yes. Under Section 126 of the Evidence Act 1872 (Bangladesh), all oral communications, digital uploads, and case summaries shared with an enrolled Advocate for the purpose of seeking legal advice are strictly privileged and cannot be disclosed without your express written consent—even if you decide not to retain the Chambers.',
  },
  {
    q: 'Is the ৳3,000 consultation fee credited if we engage LexChambers for the full case or retainer?',
    a: 'Yes. 100% of your initial consultation deposit is credited toward your formal litigation brief fee, property title vetting fee, or corporate retainer if you instruct our Chambers within 30 days of the consultation.',
  },
  {
    q: 'How quickly can LexChambers file an urgent High Court Writ Petition or Stay Application?',
    a: 'For urgent regulatory freezes, customs detentions, bank guarantee invocations, or arbitrary tax demands, our High Court Litigation Desk can review Certified Impugned Orders, draft the Writ Petition, and move an urgent mention slip before the appropriate Division Bench within 24 to 48 hours.',
  },
  {
    q: 'Can Non-Resident Bangladeshis (NRBs) and foreign investors complete consultations and power-of-attorney execution remotely?',
    a: 'Absolutely. Our International Desk conducts encrypted Zoom/Google Meet consultations across UK, USA, Canada, Singapore, UAE, and EU time zones, and guides NRB clients through Bangladesh High Commission / Embassy attestation and Foreign Ministry countersignature of Power of Attorney documents.',
  },
];

export const LexChambersInsightsFaqFooterSection: React.FC<
  LexChambersInsightsFaqFooterSectionProps
> = ({ title, subtitle, variant, primaryColor, isDark }) => {
  const [activeTag, setActiveTag] = useState<string>('All');
  const [selectedBrief, setSelectedBrief] = useState<LegalInsightBrief | null>(null);
  const [leadEmail, setLeadEmail] = useState<string>('');
  const [leadPhone, setLeadPhone] = useState<string>('');
  const [downloadedFile, setDownloadedFile] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);

  const brassAccent = primaryColor || '#D97706';
  const navyPrimary = '#0F172A';

  const filteredInsights =
    activeTag === 'All'
      ? LEGAL_INSIGHTS
      : LEGAL_INSIGHTS.filter((b) => b.tag === activeTag);

  const handleDownloadChecklist = (e: React.FormEvent, fileName: string) => {
    e.preventDefault();
    setDownloadedFile(fileName);
  };

  return (
    <div className="w-full">
      {/* =================================================================== */}
      {/* 1. LEGAL INSIGHTS, TAX UPDATES & STATUTORY CHECKLISTS HUB           */}
      {/* =================================================================== */}
      <section
        id="lex-insights-hub"
        className={`py-16 lg:py-24 px-4 sm:px-6 border-b ${
          isDark
            ? 'bg-[#0B1120] text-white border-slate-800'
            : 'bg-white text-[#1E2937] border-slate-200/80'
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header & Interactive Topic Hashtag Pills */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                <BookOpen size={14} />
                <span>Chambers Knowledge Center · Statutory Briefs & Checklists</span>
              </div>
              <h2
                className="text-2xl sm:text-4xl font-bold tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                <EditableText elementId="lex_insights_title" defaultText={title} />
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <EditableText
                  elementId="lex_insights_subtitle"
                  defaultText={subtitle}
                />
              </p>
            </div>

            {/* Interactive Topic Tag Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                'All',
                '#CompanyLaw',
                '#TaxPolicy',
                '#HighCourtWrits',
                '#PropertyDisputes',
                '#Arbitration',
              ].map((tag) => {
                const active = activeTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveTag(tag)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer border ${
                      active
                        ? 'text-white border-amber-500 shadow-sm'
                        : isDark
                        ? 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-500/40'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-amber-500/50'
                    }`}
                    style={active ? { backgroundColor: navyPrimary } : undefined}
                  >
                    {tag === 'All' ? 'All Briefs (5)' : tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Insights & Downloadable Checklists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInsights.map((brief) => (
              <div
                key={brief.id}
                className={`rounded-2xl p-6 border flex flex-col justify-between space-y-5 transition hover:-translate-y-0.5 hover:shadow-xl ${
                  isDark
                    ? 'bg-slate-900/90 border-slate-800'
                    : 'bg-[#F8FAFC] border-slate-200/90'
                }`}
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-400">
                      {brief.tag}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {brief.readTime}
                    </span>
                  </div>

                  <div>
                    <div className="text-[11px] font-bold text-slate-500 mb-1">
                      {brief.categoryLabel} · {brief.dateLabel}
                    </div>
                    <h3
                      className="text-lg font-bold leading-snug"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {brief.title}
                    </h3>
                    <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1">
                      {brief.bnTitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {brief.excerpt}
                  </p>

                  <ul className="space-y-1.5 pt-1">
                    {brief.keyTakeaways.slice(0, 2).map((pt) => (
                      <li
                        key={pt}
                        className="text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-2"
                      >
                        <CheckCircle2
                          size={13}
                          style={{ color: brassAccent }}
                          className="flex-shrink-0 mt-0.5"
                        />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedBrief(brief);
                      setDownloadedFile(null);
                    }}
                    className="text-xs font-extrabold flex items-center gap-1.5 hover:underline cursor-pointer"
                    style={{ color: brassAccent }}
                  >
                    <Download size={14} />
                    <span>Download PDF Checklist</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedBrief(brief);
                      setDownloadedFile(null);
                    }}
                    className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-slate-900 text-white hover:opacity-90 cursor-pointer"
                  >
                    Read Brief
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* =============================================================== */}
          {/* STATUTORY & CLIENT INTAKE FAQ ACCORDION                         */}
          {/* =============================================================== */}
          <div className="pt-10 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                <HelpCircle size={14} />
                <span>Client Confidentiality & Protocol FAQs</span>
              </div>
              <h3
                className="text-2xl sm:text-3xl font-bold leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Frequently Asked Questions on Legal Privilege & Retainers
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Clear institutional answers regarding Bangladesh Evidence Act privilege,
                High Court urgent filing windows, and NRI Power of Attorney procedures.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {LEGAL_FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.q}
                    className={`rounded-2xl border p-4 sm:p-5 transition ${
                      isDark
                        ? 'bg-slate-900/80 border-slate-800'
                        : 'bg-[#F8FAFC] border-slate-200/90'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                      className="w-full flex items-center justify-between gap-4 text-left text-xs sm:text-sm font-extrabold cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={16}
                        className={`flex-shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-amber-500' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-800">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 2. CHAMBERS LOCATIONS, BAR DISCLOSURES & EXECUTIVE FOOTER           */}
      {/* =================================================================== */}
      <footer
        id="lex-chambers-footer"
        className="bg-[#090E1A] text-white pt-16 pb-12 px-4 sm:px-6 border-t border-slate-800"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          {/* 3-Chamber Location Cards (Supreme Court, Gulshan-2, Chattogram) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-slate-950">
                  Supreme Court Chamber
                </span>
                <Scale size={16} style={{ color: brassAccent }} />
              </div>
              <h4
                className="text-lg font-bold"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                High Court & Appellate Division Desk
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Room #408 (3rd Floor), Supreme Court Bar Association Main Building,
                Ramna, Dhaka-1000.
              </p>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Sun – Thu: 9:00 AM – 4:30 PM</span>
                <span className="text-emerald-400 font-bold">Cause List Desk</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-amber-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Corporate & Tax Headquarters
                </span>
                <Building2 size={16} style={{ color: brassAccent }} />
              </div>
              <h4
                className="text-lg font-bold"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Gulshan-2 Executive Chambers
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Suite 9B, Tower-71, Plot 45, Gulshan Avenue, Circle-2, Dhaka-1212
                (Opposite Pink City).
              </p>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Sat – Thu: 5:00 PM – 9:30 PM</span>
                <span className="text-amber-400 font-bold">Valet Parking</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-slate-800 text-slate-300">
                  Commercial & Admiralty Wing
                </span>
                <MapPin size={16} style={{ color: brassAccent }} />
              </div>
              <h4
                className="text-lg font-bold"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Agrabad & Motijheel Commercial Desk
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Level 7, Chamber House, Agrabad C/A, Chattogram & Motijheel Commercial
                Hub, Dhaka.
              </p>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Customs, Port & Banking Desk</span>
                <span className="text-emerald-400 font-bold">By Appointment</span>
              </div>
            </div>
          </div>

          {/* Institutional Footer Links & Statutory Disclaimer */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-8 border-y border-slate-800/90">
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border border-amber-500/40"
                  style={{ backgroundColor: '#0F172A' }}
                >
                  <Scale size={20} style={{ color: brassAccent }} />
                </div>
                <div>
                  <div
                    className="text-lg font-bold"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    LexChambers &amp; Associates BD
                  </div>
                  <div className="text-[11px] text-amber-400 font-semibold">
                    Barristers, Supreme Court Advocates &amp; Corporate Tax Advisors
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-md">
                Enrolled with the Bangladesh Bar Council, Supreme Court Bar Association
                (SCBA), and Dhaka Taxes Bar Association. Dedicated to uncompromising
                constitutional advocacy and corporate governance.
              </p>
            </div>

            <div className="md:col-span-3 space-y-2 text-xs">
              <div className="font-extrabold uppercase tracking-wider text-amber-400">
                Core Statutory Desks
              </div>
              <ul className="space-y-1.5 text-slate-300">
                <li>Article 102 High Court Writ Petitions</li>
                <li>RJSC Corporate &amp; M&amp;A Structuring</li>
                <li>NBR Income Tax &amp; VAT Appellate Tribunal</li>
                <li>30-Year Land &amp; Property Title Vetting</li>
                <li>BIAC &amp; SIAC Commercial Arbitration</li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-2.5 text-xs">
              <div className="font-extrabold uppercase tracking-wider text-amber-400">
                Chambers Registry &amp; Direct Dispatch
              </div>
              <p className="text-slate-300 flex items-center gap-2">
                <PhoneCall size={14} style={{ color: brassAccent }} />
                <span>+880 1711-889900 (Senior Clerk &amp; Urgent Motions)</span>
              </p>
              <p className="text-slate-300 flex items-center gap-2">
                <Mail size={14} style={{ color: brassAccent }} />
                <span>chambers@lexchambers.com.bd</span>
              </p>
              <p className="text-slate-400 text-[11px] leading-relaxed pt-1">
                <strong>Bangladesh Bar Council Ethical Notice:</strong> This digital
                portal is maintained strictly for informational purposes and client intake
                scheduling in accordance with the Bangladesh Legal Practitioners and Bar
                Council Canons of Professional Conduct and Etiquette.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <span>
              © {new Date().getFullYear()} LexChambers &amp; Associates BD. All Rights
              Reserved.
            </span>
            <span>
              Protected under Section 126, Evidence Act 1872 · Dhaka · Chattogram ·
              London Desk
            </span>
          </div>
        </div>
      </footer>

      {/* =================================================================== */}
      {/* LEGAL BRIEF & DOWNLOADABLE PDF CHECKLIST MODAL                      */}
      {/* =================================================================== */}
      {selectedBrief && (
        <div
          onClick={() => setSelectedBrief(null)}
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden text-slate-900 dark:text-white"
          >
            <div
              className="p-6 text-white flex items-start justify-between gap-4"
              style={{ backgroundColor: navyPrimary }}
            >
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-slate-950">
                  {selectedBrief.tag} · {selectedBrief.categoryLabel}
                </span>
                <h3
                  className="text-lg sm:text-xl font-bold leading-snug"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {selectedBrief.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBrief(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedBrief.excerpt}
              </p>

              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Key Statutory Checkpoints Included in PDF:
                </h4>
                <ul className="space-y-2">
                  {selectedBrief.keyTakeaways.map((item) => (
                    <li
                      key={item}
                      className="text-xs flex items-start gap-2 text-slate-700 dark:text-slate-200"
                    >
                      <CheckCircle2
                        size={15}
                        className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {downloadedFile ? (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-700 dark:text-emerald-300">
                    <FileCheck2 size={16} />
                    <span>Checklist Unlocked: {downloadedFile}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    A copy has also been dispatched to{' '}
                    <strong>{leadEmail || 'your email'}</strong>. Need partner review on
                    this statute?
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) =>
                    handleDownloadChecklist(e, selectedBrief.checklistFileName)
                  }
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3"
                >
                  <div className="text-xs font-extrabold">
                    Instant Download: {selectedBrief.checklistFileName}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="email"
                      required
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      placeholder="Corporate Email *"
                      className="px-3 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                    <input
                      type="tel"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      placeholder="Mobile (+8801...)"
                      className="px-3 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl text-xs font-extrabold text-white flex items-center justify-center gap-2 cursor-pointer"
                    style={{ backgroundColor: brassAccent }}
                  >
                    <Download size={14} />
                    <span>Download Complimentary Statutory Checklist (PDF)</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
