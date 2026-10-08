import React, { useState } from 'react';
import {
  Scale,
  Gavel,
  ShieldCheck,
  Award,
  CheckCircle2,
  Building2,
  FileSpreadsheet,
  ArrowRight,
  Lock,
  Landmark,
  FileSearch,
  Layers,
  Briefcase,
  ChevronRight,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';

export interface LexChambersPrecedentsProcessSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

interface CasePrecedentItem {
  id: string;
  matterCode: string;
  domain: 'High Court Writ' | 'NBR Tax Tribunal' | 'Cross-Border M&A' | 'Commercial Arbitration';
  headline: string;
  bnSummary: string;
  forum: string;
  disputeValue: string;
  challenge: string;
  legalStrategy: string;
  outcome: string;
  year: string;
}

const CASE_PRECEDENTS: CasePrecedentItem[] = [
  {
    id: 'case_vat_writ',
    matterCode: 'MATTER REF #HC-WP-2025-114',
    domain: 'High Court Writ',
    headline: 'Secured High Court Stay Order & Rule Nisi on ৳42 Crore Arbitrary VAT Demand',
    bnSummary: '৳৪২ কোটি টাকার তর্কিত ভ্যাট দাবির বিরুদ্ধে হাইকোর্ট বিভাগে রুল নিসি ও স্থগিতাদেশ অর্জন',
    forum: 'High Court Division, Supreme Court of Bangladesh (Writ Jurisdiction)',
    disputeValue: '৳42.00 Crore (BDT 420M)',
    challenge:
      'A leading pharmaceutical and FMCG manufacturer faced an ex-parte show-cause-cum-demand notice freezing input tax rebates under the VAT & Supplementary Duty Act 2012 without mandatory personal hearing.',
    legalStrategy:
      'Moved an urgent Writ Petition under Article 102 of the Constitution demonstrating violation of natural justice and ultra vires assessment beyond statutory limitation periods.',
    outcome:
      'Division Bench issued Rule Nisi and granted an interim stay on coercive recovery, preserving full working capital liquidity pending final tribunal adjudication.',
    year: '2025',
  },
  {
    id: 'case_fdi_jv',
    matterCode: 'MATTER REF #CORP-JV-2025-089',
    domain: 'Cross-Border M&A',
    headline: 'Structured $12M Cross-Border Joint Venture & BIDA Repatriation for Singapore Conglomerate',
    bnSummary: 'সিঙ্গাপুর-বাংলাদেশ জয়েন্ট ভেঞ্চারে $১২ মিলিয়ন ডলারের এফডিআই স্ট্রাকচারিং ও বিডা অনুমোদন',
    forum: 'RJSC · Bangladesh Bank (FEID) · BIDA Economic Zone Desk',
    disputeValue: 'USD $12.0M (≈ ৳144 Crore)',
    challenge:
      'A Singapore-headquartered logistics and cold-chain investor required 70% equity acquisition in a Dhaka entity alongside guaranteed dividend and royalty repatriation channels.',
    legalStrategy:
      'Drafted bespoke Shareholders Agreement (SHA) with SIAC Singapore arbitration seat, executed 30-year factory land title vetting, and completed Section 18B Bangladesh Bank filings.',
    outcome:
      'Transaction closed 11 days ahead of schedule with full BIDA expatriate work permits and Authorized Dealer (AD) bank repatriation clearance.',
    year: '2025',
  },
  {
    id: 'case_tax_tribunal',
    matterCode: 'MATTER REF #TAX-TAT-2024-302',
    domain: 'NBR Tax Tribunal',
    headline: '68% Tax Assessment Reduction Before Taxes Appellate Tribunal for Textile Exporter',
    bnSummary: 'ট্যাক্সেস আপিলাত ট্রাইব্যুনালে গার্মেন্টস রপ্তানিকারক প্রতিষ্ঠানের কর দাবি ৬৮% হ্রাস',
    forum: 'Taxes Appellate Tribunal, Dhaka Bench & LTU (Large Taxpayers Unit)',
    disputeValue: '৳18.50 Crore Assessed Demand',
    challenge:
      'DCT disallowed legitimate industrial depreciation, export cash-incentive exemptions, and WPPF statutory deductions across three consecutive assessment years.',
    legalStrategy:
      'Compiled forensic chartered accounting reconciliations with binding High Court tax reference precedents under the Income Tax Act 2023.',
    outcome:
      'Appellate Tribunal set aside arbitrary disallowances, reducing net tax liability by 68% and waiving penal interest charges.',
    year: '2024',
  },
  {
    id: 'case_arb_power',
    matterCode: 'MATTER REF #ADR-BIAC-2024-051',
    domain: 'Commercial Arbitration',
    headline: '৳64 Crore Arbitral Award & Bank Guarantee Protection in EPC Infrastructure Dispute',
    bnSummary: 'ইপিসি অবকাঠামো বিরোধে ৳৬৪ কোটির সালিশি রায় ও ব্যাংক গ্যারান্টি সুরক্ষা',
    forum: 'BIAC Arbitration Tribunal & Commercial Appellate Bench',
    disputeValue: '৳64.00 Crore Performance Bond',
    challenge:
      'An engineering EPC contractor faced wrongful encashment of an unconditional performance bank guarantee following supply-chain force majeure delays.',
    legalStrategy:
      'Obtained Section 7A interim injunction under the Arbitration Act 2001 restraining bank guarantee invocation on grounds of special equity, followed by full evidentiary hearings.',
    outcome:
      'Tribunal awarded ৳64 Crore in milestone receivables plus 9% p.a. statutory interest in favor of our corporate client.',
    year: '2024',
  },
];

const WORKFLOW_STEPS = [
  {
    step: 'Step 01',
    title: 'Confidential Case Review & Conflict Check',
    bnTitle: 'গোপনীয় নথি পর্যালোচনা ও কনফ্লিক্ট যাচাই',
    duration: 'Within 24 Hours',
    description:
      'Encrypted review of pleadings, NBR notices, deeds, or draft contracts under strict Evidence Act Section 126 privilege, followed by an institutional conflict-of-interest clearance.',
  },
  {
    step: 'Step 02',
    title: 'Written Legal Strategy & Risk Opinion',
    bnTitle: 'লিখিত আইনি মতামত ও ঝুঁকি মূল্যায়ন',
    duration: 'Days 2–4',
    description:
      'Senior Counsel prepares a formal Legal Opinion citing statutory provisions, Supreme Court precedents, probability of interim relief, and transparent fee/retainer milestones.',
  },
  {
    step: 'Step 03',
    title: 'Pleading Drafting, Filing & Representation',
    bnTitle: 'পিটিশন ড্রাফটিং, ফাইলিং ও আদালতে শুনানি',
    duration: 'Active Mandate',
    description:
      'Precision drafting of Writ Petitions, Company Applications, Tax Appeals, or M&A agreements, paired with courtroom advocacy before High Court Division Benches or Tribunals.',
  },
  {
    step: 'Step 04',
    title: 'Certified Order Execution & Post-Matter Compliance',
    bnTitle: 'রায় বাস্তবায়ন ও পরবর্তী রেগুলেটরি কমপ্লায়েন্স',
    duration: 'Ongoing Protection',
    description:
      'Obtaining certified court orders, serving regulatory authorities (NBR, RJSC, Bangladesh Bank, AC Land), and establishing ongoing corporate secretarial protection.',
  },
];

export const LexChambersPrecedentsProcessSection: React.FC<
  LexChambersPrecedentsProcessSectionProps
> = ({ title, subtitle, variant, primaryColor, isDark }) => {
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [activeCaseId, setActiveCaseId] = useState<string>(CASE_PRECEDENTS[0].id);

  const brassAccent = primaryColor || '#D97706';
  const navyPrimary = '#0F172A';

  const filteredCases =
    selectedDomain === 'All'
      ? CASE_PRECEDENTS
      : CASE_PRECEDENTS.filter((c) => c.domain === selectedDomain);

  const activeCase =
    CASE_PRECEDENTS.find((c) => c.id === activeCaseId) || CASE_PRECEDENTS[0];

  return (
    <section
      id="lex-case-precedents"
      className={`py-16 lg:py-24 px-4 sm:px-6 border-b ${
        isDark
          ? 'bg-[#0F172A] text-white border-slate-800'
          : 'bg-white text-[#1E2937] border-slate-200/80'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* =============================================================== */}
        {/* PART A: NOTABLE MATTERS & ANONYMIZED CASE PRECEDENTS            */}
        {/* =============================================================== */}
        <div className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                <Gavel size={14} />
                <span>Anonymized Track Record · Client Confidentiality Preserved</span>
              </div>
              <h2
                className="text-2xl sm:text-4xl font-bold tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                <EditableText elementId="lex_precedents_title" defaultText={title} />
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <EditableText
                  elementId="lex_precedents_subtitle"
                  defaultText={subtitle}
                />
              </p>
            </div>

            {/* Domain Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 self-start">
              {[
                'All',
                'High Court Writ',
                'Cross-Border M&A',
                'NBR Tax Tribunal',
                'Commercial Arbitration',
              ].map((dom) => {
                const isSelected = selectedDomain === dom;
                return (
                  <button
                    key={dom}
                    type="button"
                    onClick={() => {
                      setSelectedDomain(dom);
                      const firstMatch =
                        dom === 'All'
                          ? CASE_PRECEDENTS[0]
                          : CASE_PRECEDENTS.find((c) => c.domain === dom);
                      if (firstMatch) setActiveCaseId(firstMatch.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                      isSelected
                        ? 'text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    style={isSelected ? { backgroundColor: brassAccent } : undefined}
                  >
                    {dom}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Split-View Case Precedents Explorer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left List: Matter Cards */}
            <div className="lg:col-span-5 space-y-3">
              {filteredCases.map((matter) => {
                const isCurrent = activeCase.id === matter.id;
                return (
                  <button
                    key={matter.id}
                    type="button"
                    onClick={() => setActiveCaseId(matter.id)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-[#0F172A] text-white border-amber-500 shadow-lg'
                        : isDark
                        ? 'bg-slate-900/70 text-slate-200 border-slate-800 hover:border-slate-700'
                        : 'bg-slate-50 text-slate-900 border-slate-200/90 hover:bg-slate-100/80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${
                          isCurrent
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-amber-500/15 text-amber-700 dark:text-amber-400'
                        }`}
                      >
                        {matter.domain}
                      </span>
                      <span
                        className={`text-[11px] font-mono font-bold ${
                          isCurrent ? 'text-amber-300' : 'text-slate-400'
                        }`}
                      >
                        {matter.disputeValue}
                      </span>
                    </div>

                    <h3
                      className="text-sm sm:text-base font-bold leading-snug"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {matter.headline}
                    </h3>

                    <p
                      className={`text-[11px] mt-1.5 font-medium ${
                        isCurrent
                          ? 'text-slate-300'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {matter.bnSummary}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right Dossier View: Detailed Anonymized Brief */}
            <div className="lg:col-span-7 rounded-2xl bg-[#0F172A] text-white border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Lock size={14} className="text-amber-400" />
                  <span className="text-xs font-mono font-bold tracking-wider text-amber-400">
                    {activeCase.matterCode} · REDACTED CLIENT DOSSIER
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-extrabold">
                  Matter Value: {activeCase.disputeValue}
                </span>
              </div>

              <div className="space-y-2">
                <h3
                  className="text-xl sm:text-2xl font-bold text-white leading-snug"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {activeCase.headline}
                </h3>
                <p className="text-xs text-amber-300 font-semibold">
                  Adjudicating Forum: {activeCase.forum}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    1. Statutory & Commercial Challenge
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {activeCase.challenge}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                    2. Chambers Legal Strategy & Pleadings
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {activeCase.legalStrategy}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/35 border border-emerald-500/30 space-y-1">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 size={13} />
                    <span>3. Judgment / Transaction Outcome ({activeCase.year})</span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-medium">
                    {activeCase.outcome}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800">
                <span className="text-[11px] text-slate-400">
                  Facing a comparable regulatory, tax, or commercial dispute?
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('lex-consultation-intake');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-300 transition flex items-center gap-2 cursor-pointer"
                >
                  <span>Request Similar Strategy Assessment</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =============================================================== */}
        {/* PART B: 4-STEP ENGAGEMENT WORKFLOW TIMELINE                     */}
        {/* =============================================================== */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              <Layers size={14} />
              <span>How Our Chambers Operate</span>
            </div>
            <h3
              className="text-2xl sm:text-3xl font-bold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              <EditableText
                elementId="lex_workflow_heading"
                defaultText="Four-Stage Institutional Legal Representation Protocol"
              />
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Every brief is managed with partner-level accountability, written fee
              transparency, and strict statutory timelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {WORKFLOW_STEPS.map((item, idx) => (
              <div
                key={item.step}
                className={`rounded-2xl p-5 border relative flex flex-col justify-between space-y-4 ${
                  isDark
                    ? 'bg-slate-900/80 border-slate-800'
                    : 'bg-[#F8FAFC] border-slate-200/90'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className="px-2.5 py-1 rounded-md text-[11px] font-extrabold text-white"
                      style={{ backgroundColor: navyPrimary }}
                    >
                      {item.step}
                    </span>
                    <span
                      className="text-[11px] font-bold"
                      style={{ color: brassAccent }}
                    >
                      {item.duration}
                    </span>
                  </div>

                  <div>
                    <h4
                      className="text-base font-bold leading-snug"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 mt-0.5">
                      {item.bnTitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span>Privilege Protected</span>
                  <ShieldCheck size={14} className="text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
