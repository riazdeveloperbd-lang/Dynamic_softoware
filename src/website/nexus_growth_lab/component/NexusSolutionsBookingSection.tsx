import React, { useState } from 'react';
import {
  Check,
  ArrowRight,
  Calendar,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import {
  EditableText,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface NexusSolutionsBookingSectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

const SOLUTION_PACKAGES = [
  {
    id: 'pkg_demand_gen',
    name: 'Demand Generation Accelerator (Scale)',
    audience: 'Best for Series A/B Tech Startups ($15k–$50k ACV)',
    retainer: '$8,500',
    cadence: '/month',
    timeline: '14-Day Launch Sprint',
    featured: false,
    description:
      'Engineered for high-velocity SaaS teams looking to scale qualified demo volume across paid search, paid social, and conversion-architected landing pages.',
    features: [
      'Full-funnel Google Search, LinkedIn & Meta paid acquisition',
      'Custom high-converting interactive landing pages & A/B testing',
      'Weekly creative & ad copy iteration sprints',
      'Closed-loop HubSpot / Salesforce SQL conversion tracking',
      'Dedicated Principal Growth Engineer & Slack channel',
    ],
  },
  {
    id: 'pkg_abm_enterprise',
    name: 'Account-Based Marketing (ABM Enterprise)',
    audience: 'Best for Enterprise Accounts ($50k–$250k+ Deal Sizes)',
    retainer: '$14,500',
    cadence: '/month',
    timeline: '21-Day Multi-Channel Rollout',
    featured: true,
    description:
      'Precision buying-committee orchestration combining 6sense/Bombora intent data, hyper-personalized IP ads, outbound sequences, and executive gifting.',
    features: [
      'Named-account intent data targeting (6sense, Bombora, G2)',
      'Hyper-personalized 1:1 & 1:Few IP-targeted LinkedIn & display ads',
      'Coordinated SDR multi-channel outbound & executive gift campaigns',
      'Custom interactive ROI calculators for target enterprise accounts',
      'Bi-weekly executive pipeline velocity & deal-stage reviews',
    ],
  },
  {
    id: 'pkg_revops',
    name: 'Revenue Operations & Analytics Infrastructure',
    audience: 'Best for Scaling Mid-Market & Enterprise RevOps Teams',
    retainer: '$9,800',
    cadence: '/month',
    timeline: '30-Day Architecture Overhaul',
    featured: false,
    description:
      'End-to-end multi-touch attribution, CRM pipeline hygiene, automated SDR speed-to-lead routing, and board-ready BI revenue dashboards.',
    features: [
      'Multi-touch W-shaped & algorithmic revenue attribution setup',
      'Salesforce / HubSpot lifecycle stage & lead-routing automation',
      'Snowflake / BigQuery + Looker real-time board reporting',
      'Automated enrichment (Clay, Clearbit, Apollo) & scoring models',
      'Quarterly cohort retention, LTV:CAC & payback modeling',
    ],
  },
];

const AUDIT_DATES = [
  { id: 'Tue, Oct 13', label: 'Tue, Oct 13' },
  { id: 'Wed, Oct 14', label: 'Wed, Oct 14' },
  { id: 'Thu, Oct 15', label: 'Thu, Oct 15' },
  { id: 'Fri, Oct 16', label: 'Fri, Oct 16' },
];

const AUDIT_TIMES = [
  '10:00 AM EST',
  '11:30 AM EST',
  '02:00 PM EST',
  '04:00 PM EST',
];

const BOTTLENECK_OPTIONS = [
  'Lead Quality',
  'High CAC',
  'Low Conversion Rate',
  'Data/Attribution',
];

const FREE_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'icloud.com',
  'aol.com',
];

export const NexusSolutionsBookingSection: React.FC<
  NexusSolutionsBookingSectionProps
> = ({
  title = 'Service Packages & Revenue Solutions Engine',
  subtitle = 'Structured growth retainers with transparent deliverables, dedicated growth engineers, and verified pipeline SLAs.',
  primaryColor = '#2563EB',
}) => {
  const [selectedPackageName, setSelectedPackageName] = useState<string>(
    'Account-Based Marketing (ABM Enterprise)'
  );

  // Booking Form State
  const [workEmail, setWorkEmail] = useState<string>('');
  const [companyUrl, setCompanyUrl] = useState<string>('');
  const [monthlySpendTier, setMonthlySpendTier] =
    useState<string>('$15k-$50k');
  const [selectedBottlenecks, setSelectedBottlenecks] = useState<string[]>([
    'High CAC',
    'Lead Quality',
  ]);
  const [selectedDate, setSelectedDate] = useState<string>('Wed, Oct 14');
  const [selectedTime, setSelectedTime] = useState<string>('11:30 AM EST');
  const [formError, setFormError] = useState<string | null>(null);
  const [auditConfirmed, setAuditConfirmed] = useState<boolean>(false);

  const toggleBottleneck = (item: string) => {
    setSelectedBottlenecks((prev) =>
      prev.includes(item) ? prev.filter((b) => b !== item) : [...prev, item]
    );
  };

  const handleSelectPackage = (pkgName: string) => {
    setSelectedPackageName(pkgName);
    if (typeof document !== 'undefined') {
      const el = document.querySelector('#nexus-audit-booking');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = workEmail.trim().toLowerCase();
    if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setFormError('Please enter a valid work email address.');
      return;
    }
    const domain = trimmedEmail.split('@')[1] || '';
    if (FREE_EMAIL_DOMAINS.includes(domain)) {
      setFormError(
        'Please use your company work email (e.g., alex@yourcompany.com) rather than a personal email provider.'
      );
      return;
    }
    if (!companyUrl.trim() || !companyUrl.includes('.')) {
      setFormError('Please enter your company website URL (e.g., acmesaas.io).');
      return;
    }
    if (selectedBottlenecks.length === 0) {
      setFormError('Please select at least one primary growth bottleneck.');
      return;
    }
    setFormError(null);
    setAuditConfirmed(true);
  };

  return (
    <div className="bg-[#0B0F17] text-[#F9FAFB]">
      {/* ================================================================= */}
      {/* SECTION E: SERVICE PACKAGES & SOLUTIONS ENGINE (3-COLUMN)         */}
      {/* ================================================================= */}
      <section
        id="nexus-solutions"
        className="py-20 px-6 border-b border-[#1F2937]"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-[#9CA3AF]">
              <Layers size={14} style={{ color: primaryColor }} />
              <span style={{ color: primaryColor }} className="font-semibold">
                Enterprise Growth Architecture
              </span>
              <span aria-hidden="true">·</span>
              <span>90-Day Pipeline Performance Guarantee</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-semibold tracking-tight"
              style={{
                fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif",
                textWrap: 'balance',
              }}
            >
              <EditableText id="nexus_solutions_heading" defaultText={title} />
            </h2>

            <EditableText
              id="nexus_solutions_sub"
              as="p"
              defaultText={subtitle}
              className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed block"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
            {SOLUTION_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-3xl p-7 bg-[#111827] border flex flex-col justify-between space-y-6 transition-transform hover:-translate-y-0.5 ${
                  pkg.featured ? 'border-[#2563EB]' : 'border-[#1F2937]'
                }`}
              >
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[#9CA3AF]">
                        {pkg.timeline}
                      </span>
                      {pkg.featured && (
                        <span className="font-mono font-semibold text-[#10B981]">
                          Most Selected Enterprise Tier
                        </span>
                      )}
                    </div>
                    <h3
                      className="text-xl font-semibold text-[#F9FAFB]"
                      style={{
                        fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      {pkg.name}
                    </h3>
                    <div className="text-xs font-medium text-[#2563EB]">
                      {pkg.audience}
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1 pt-2 border-t border-[#1F2937]">
                    <span className="text-3xl font-mono font-semibold text-[#F9FAFB] tabular-nums">
                      {pkg.retainer}
                    </span>
                    <span className="text-xs text-[#9CA3AF]">{pkg.cadence}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                    {pkg.description}
                  </p>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#F9FAFB]/90 pt-2">
                    {pkg.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <Check
                          size={15}
                          className="text-[#10B981] shrink-0 mt-0.5"
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectPackage(pkg.name)}
                  className={`w-full py-3.5 px-5 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                    pkg.featured
                      ? 'text-[#F9FAFB]'
                      : 'bg-[#0B0F17] hover:bg-[#1F2937] text-[#F9FAFB] border border-[#1F2937]'
                  }`}
                  style={
                    pkg.featured ? { backgroundColor: primaryColor } : undefined
                  }
                >
                  <span>Select Strategy</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION F: HIGH-CONVERTING FREE AUDIT BOOKING FORM (SPLIT LAYOUT) */}
      {/* ================================================================= */}
      <section
        id="nexus-audit-booking"
        className="py-20 px-6 border-b border-[#1F2937]"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side (5 Columns): What You Get During the Call */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium text-[#10B981]">
              <ShieldCheck size={15} />
              <span className="font-semibold">
                Executive Pipeline Diagnostic · Zero Sales Pitch
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight"
              style={{
                fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif",
                textWrap: 'balance',
              }}
            >
              <EditableText
                id="nexus_audit_heading"
                defaultText="Get a 30-Minute Custom Growth Blueprint & Pipeline Audit"
              />
            </h2>

            <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">
              Meet directly with a Principal Growth Engineer—never a junior account rep. We analyze your unit economics and deliver a custom 90-day revenue model you can execute immediately.
            </p>

            {/* 3 Numbered Deliverables */}
            <div className="space-y-4 pt-2">
              {[
                {
                  num: '01.',
                  title: 'Full Audit of Your Current Ad Channels',
                  desc: 'Line-by-line tear-down of your Google Search, LinkedIn ABM, and retargeting spend to identify wasted budget and high-CAC leakage.',
                },
                {
                  num: '02.',
                  title: 'Competitor Ad Spend & Share-of-Voice Analysis',
                  desc: 'Spy-glass breakdown of your top 3 category competitors—including their highest-converting landing pages, keywords, and offer hooks.',
                },
                {
                  num: '03.',
                  title: 'Custom 90-Day Pipeline & Revenue Roadmap',
                  desc: 'Concrete channel allocation, projected SQL velocity, and multi-touch CRM attribution architecture tailored to your ACV.',
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className="p-5 rounded-2xl bg-[#111827] border border-[#1F2937] space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-[#10B981]">
                      {step.num}
                    </span>
                    <h3 className="text-base font-semibold text-[#F9FAFB]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side (7 Columns): Validated Audit Form + Embedded Interactive Calendar */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#111827] border border-[#1F2937]">
              {auditConfirmed ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle2
                    size={40}
                    className="mx-auto text-[#10B981]"
                  />
                  <h3
                    className="text-2xl font-semibold text-[#F9FAFB]"
                    style={{
                      fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    30-Minute Growth Blueprint Locked In
                  </h3>
                  <p className="text-sm text-[#9CA3AF] max-w-md mx-auto leading-relaxed">
                    Calendar invitation dispatched to{' '}
                    <strong className="text-[#F9FAFB]">{workEmail}</strong> for{' '}
                    <strong className="text-[#10B981]">
                      {selectedDate} at {selectedTime}
                    </strong>
                    . Our engineering team has begun auditing{' '}
                    <strong className="text-[#F9FAFB]">{companyUrl}</strong>.
                  </p>
                  <div className="p-4 rounded-2xl bg-[#0B0F17] border border-[#1F2937] max-w-md mx-auto text-xs font-mono text-[#9CA3AF] space-y-1">
                    <div>Selected Focus: {selectedPackageName}</div>
                    <div>Spend Tier: {monthlySpendTier}/mo</div>
                    <div>Bottlenecks: {selectedBottlenecks.join(' · ')}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAuditConfirmed(false)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#F9FAFB] cursor-pointer"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Modify Booking Slot
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAuditSubmit} className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#1F2937]">
                    <div>
                      <div className="text-xs font-mono uppercase text-[#9CA3AF]">
                        Step 1 of 1 · Direct Engineering Calendar
                      </div>
                      <h3 className="text-lg font-semibold text-[#F9FAFB] mt-0.5">
                        Configure Your Growth Audit &amp; Lock Time Slot
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-[#10B981]">
                      {selectedPackageName}
                    </span>
                  </div>

                  {formError && (
                    <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs font-semibold text-rose-300">
                      {formError}
                    </div>
                  )}

                  {/* Row 1: Work Email (Company Domain Validation) & Company Website URL */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#F9FAFB]">
                        Work Email (Company Domain) *
                      </label>
                      <input
                        type="email"
                        required
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        placeholder="alex@cloudscale.ai"
                        className="w-full px-4 py-3 rounded-xl bg-[#0B0F17] border border-[#1F2937] text-xs sm:text-sm text-[#F9FAFB] placeholder:text-[#9CA3AF]/50 focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-[#F9FAFB]">
                        Company Website URL *
                      </label>
                      <input
                        type="text"
                        required
                        value={companyUrl}
                        onChange={(e) => setCompanyUrl(e.target.value)}
                        placeholder="https://cloudscale.ai"
                        className="w-full px-4 py-3 rounded-xl bg-[#0B0F17] border border-[#1F2937] text-xs sm:text-sm text-[#F9FAFB] placeholder:text-[#9CA3AF]/50 focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  {/* Row 2: Current Monthly Marketing Spend Dropdown */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#F9FAFB]">
                      Current Monthly Marketing Spend
                    </label>
                    <select
                      value={monthlySpendTier}
                      onChange={(e) => setMonthlySpendTier(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#0B0F17] border border-[#1F2937] text-xs sm:text-sm text-[#F9FAFB] focus:outline-none focus:border-[#2563EB]"
                    >
                      <option value="$5k-$15k">$5k – $15k / month</option>
                      <option value="$15k-$50k">$15k – $50k / month</option>
                      <option value="$50k+">$50k+ / month (Enterprise Scale)</option>
                    </select>
                  </div>

                  {/* Row 3: Primary Bottleneck Checkboxes */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[#F9FAFB]">
                      Primary Pipeline Bottleneck (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {BOTTLENECK_OPTIONS.map((bottle) => {
                        const checked = selectedBottlenecks.includes(bottle);
                        return (
                          <button
                            key={bottle}
                            type="button"
                            onClick={() => toggleBottleneck(bottle)}
                            className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between gap-1.5 cursor-pointer transition-colors ${
                              checked
                                ? 'bg-[#2563EB]/20 border-[#2563EB] text-[#F9FAFB]'
                                : 'bg-[#0B0F17] border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB]'
                            }`}
                          >
                            <span className="truncate">{bottle}</span>
                            {checked && (
                              <Check size={13} className="text-[#10B981] shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 4: Embedded Interactive Calendar Time Slot Selector */}
                  <div className="p-4 rounded-2xl bg-[#0B0F17] border border-[#1F2937] space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-[#F9FAFB]">
                        <Calendar size={14} style={{ color: primaryColor }} />
                        <span>Select Audit Date &amp; Time Slot</span>
                      </span>
                      <span className="font-mono text-[#10B981]">
                        30-Min Zoom + Live Screen Share
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {AUDIT_DATES.map((d) => (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setSelectedDate(d.id)}
                          className={`py-2 px-3 rounded-lg border text-xs font-mono font-semibold cursor-pointer ${
                            selectedDate === d.id
                              ? 'bg-[#2563EB] border-[#2563EB] text-[#F9FAFB]'
                              : 'bg-[#111827] border-[#1F2937] text-[#9CA3AF]'
                          }`}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {AUDIT_TIMES.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setSelectedTime(t)}
                          className={`py-2 px-2.5 rounded-lg border text-xs font-mono inline-flex items-center justify-center gap-1 cursor-pointer ${
                            selectedTime === t
                              ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981] font-semibold'
                              : 'bg-[#111827] border-[#1F2937] text-[#9CA3AF]'
                          }`}
                        >
                          <Clock size={11} />
                          <span>{t}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl text-sm font-semibold text-[#F9FAFB] inline-flex items-center justify-center gap-2 transition-opacity hover:opacity-95 cursor-pointer shadow-lg"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <span>
                      Lock In 30-Min Growth Audit ({selectedDate} · {selectedTime})
                    </span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
