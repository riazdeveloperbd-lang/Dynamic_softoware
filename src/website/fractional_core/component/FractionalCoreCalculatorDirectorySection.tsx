import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  Filter,
  MapPin,
  Briefcase,
  Sparkles,
  TrendingDown,
  ShieldCheck,
  Award,
  Clock,
} from 'lucide-react';
import {
  EditableText,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface FractionalCoreCalculatorDirectorySectionProps {
  title: string;
  subtitle: string;
  variant: DoctorVariantId;
  primaryColor: string;
  isDark?: boolean;
}

type ExecutiveRoleId = 'CTO' | 'CFO' | 'CMO' | 'CPO';
type WeeklyCommitmentHrs = 5 | 10 | 20;

interface RoleBenchmarkConfig {
  role: ExecutiveRoleId;
  label: string;
  fullTimeBase: number;
  equityGrantRange: string;
  estimatedEquityDollarValue: number;
  retainerByHours: Record<WeeklyCommitmentHrs, number>;
  typicalDeliverables: Record<WeeklyCommitmentHrs, string>;
}

const ROLE_BENCHMARKS: Record<ExecutiveRoleId, RoleBenchmarkConfig> = {
  CTO: {
    role: 'CTO',
    label: 'Fractional CTO',
    fullTimeBase: 280000,
    equityGrantRange: '1.5% – 3.0%',
    estimatedEquityDollarValue: 180000,
    retainerByHours: {
      5: 2500,
      10: 4500,
      20: 8200,
    },
    typicalDeliverables: {
      5: 'Architecture review, AI/cloud vendor selection, engineering hiring rubric & bi-weekly sprint governance.',
      10: 'Hands-on system architecture, SOC-2 technical compliance, leading 8–25 engineers & investor tech due diligence.',
      20: 'Interim VP/CTO execution, daily standups, v2 platform re-architecture & scaling engineering squad velocity.',
    },
  },
  CFO: {
    role: 'CFO',
    label: 'Fractional CFO',
    fullTimeBase: 265000,
    equityGrantRange: '1.0% – 2.5%',
    estimatedEquityDollarValue: 150000,
    retainerByHours: {
      5: 2400,
      10: 4500,
      20: 7800,
    },
    typicalDeliverables: {
      5: 'Monthly board reporting, cash burn & runway modeling, SaaS cohort metrics & covenant tracking.',
      10: 'Series A/B financial data room, unit economics optimization, investor pitch modeling & debt/venture facilities.',
      20: 'Full strategic finance execution, M&A modeling, ERP/FP&A stack implementation & institutional roadshow lead.',
    },
  },
  CMO: {
    role: 'CMO',
    label: 'Fractional CMO',
    fullTimeBase: 250000,
    equityGrantRange: '1.0% – 2.0%',
    estimatedEquityDollarValue: 135000,
    retainerByHours: {
      5: 2200,
      10: 4000,
      20: 7400,
    },
    typicalDeliverables: {
      5: 'Category positioning, ICP messaging matrix, paid acquisition audit & demand gen attribution architecture.',
      10: 'Full-funnel PLG + Enterprise ABM engine, managing growth team/agencies & pipeline velocity scaling.',
      20: 'Interim GTM leadership, sales-marketing RevOps alignment, flagship product launch & enterprise pipeline ownership.',
    },
  },
  CPO: {
    role: 'CPO',
    label: 'Fractional CPO',
    fullTimeBase: 270000,
    equityGrantRange: '1.25% – 2.5%',
    estimatedEquityDollarValue: 160000,
    retainerByHours: {
      5: 2400,
      10: 4400,
      20: 8000,
    },
    typicalDeliverables: {
      5: 'Quarterly product roadmap governance, customer discovery framework & PM team coaching.',
      10: 'PLG activation & NDR expansion loops, AI feature monetization, enterprise UX architecture & PRD rigor.',
      20: 'Interim Head of Product execution, cross-functional squad leadership & Series A/B product thesis validation.',
    },
  },
};

export interface ExecutiveCandidateProfile {
  id: string;
  candidateCode: string;
  role: ExecutiveRoleId;
  location: string;
  yearsExp: string;
  stageExpertise: ('Pre-Seed' | 'Seed' | 'Series A' | 'Series B')[];
  domains: ('AI/ML' | 'B2B SaaS' | 'Fintech' | 'DevTools')[];
  trackRecord: string;
  pastExitTag: string;
  retainerRate: string;
  weeklyAllocation: string;
  availability: string;
}

const EXECUTIVE_DIRECTORY_PROFILES: ExecutiveCandidateProfile[] = [
  {
    id: 'exec_1',
    candidateCode: 'Executive #CTO-8042',
    role: 'CTO',
    location: 'San Francisco, CA',
    yearsExp: '16+ Yrs',
    stageExpertise: ['Seed', 'Series A', 'Series B'],
    domains: ['Fintech', 'B2B SaaS', 'AI/ML'],
    trackRecord:
      'Former VP of Eng at Series B Fintech; Led 45-person engineering team through $40M Series B raise and SOC-2 Type II certification.',
    pastExitTag: 'Exited to Stripe ($120M)',
    retainerRate: '$4,500/mo',
    weeklyAllocation: '10 hrs/wk',
    availability: 'Available Immediately',
  },
  {
    id: 'exec_2',
    candidateCode: 'Executive #CFO-4190',
    role: 'CFO',
    location: 'New York, NY',
    yearsExp: '18+ Yrs',
    stageExpertise: ['Seed', 'Series A', 'Series B'],
    domains: ['B2B SaaS', 'Fintech'],
    trackRecord:
      'Former VP Finance at high-growth vertical SaaS; Closed $28M Series A & $65M Series B with Index Ventures; extended founder runway by 11 months.',
    pastExitTag: 'Led $420M SaaS IPO',
    retainerRate: '$4,200/mo',
    weeklyAllocation: '10 hrs/wk',
    availability: 'Available for Q4 Intake',
  },
  {
    id: 'exec_3',
    candidateCode: 'Executive #CMO-6315',
    role: 'CMO',
    location: 'Austin, TX',
    yearsExp: '14+ Yrs',
    stageExpertise: ['Pre-Seed', 'Seed', 'Series A'],
    domains: ['DevTools', 'B2B SaaS', 'AI/ML'],
    trackRecord:
      'Former Head of Growth & GTM at developer infrastructure unicorn; scaled self-serve PLG & enterprise pipeline from $1.2M to $34M ARR.',
    pastExitTag: 'Acquired by Datadog ($240M)',
    retainerRate: '$4,000/mo',
    weeklyAllocation: '10 hrs/wk',
    availability: 'Available Immediately',
  },
  {
    id: 'exec_4',
    candidateCode: 'Executive #CPO-9208',
    role: 'CPO',
    location: 'Seattle, WA',
    yearsExp: '15+ Yrs',
    stageExpertise: ['Pre-Seed', 'Seed', 'Series A'],
    domains: ['AI/ML', 'B2B SaaS', 'DevTools'],
    trackRecord:
      'Former Group Product Director at AI data platform; shipped generative AI workflow engine that lifted Net Dollar Retention from 106% to 139%.',
    pastExitTag: 'Exited to Snowflake ($190M)',
    retainerRate: '$4,400/mo',
    weeklyAllocation: '10 hrs/wk',
    availability: '1 Slot Left for Q4',
  },
  {
    id: 'exec_5',
    candidateCode: 'Executive #CTO-7719',
    role: 'CTO',
    location: 'Boston, MA',
    yearsExp: '17+ Yrs',
    stageExpertise: ['Pre-Seed', 'Seed', 'Series A'],
    domains: ['AI/ML', 'DevTools'],
    trackRecord:
      '2x Principal Architect & YC Alumni CTO; built low-latency LLM inference clusters & developer SDKs adopted by 90,000+ enterprise engineers.',
    pastExitTag: '2x Venture Exits ($95M+)',
    retainerRate: '$4,000/mo',
    weeklyAllocation: '8 hrs/wk',
    availability: 'Available Immediately',
  },
  {
    id: 'exec_6',
    candidateCode: 'Executive #CFO-5084',
    role: 'CFO',
    location: 'Chicago, IL',
    yearsExp: '15+ Yrs',
    stageExpertise: ['Pre-Seed', 'Seed', 'Series A'],
    domains: ['AI/ML', 'B2B SaaS', 'DevTools'],
    trackRecord:
      'Former SaaS Investment Director & Operational CFO; restructured cloud COGS & enterprise pricing tiers to unlock +22% gross margin expansion.',
    pastExitTag: 'Backed by Sequoia & a16z',
    retainerRate: '$3,800/mo',
    weeklyAllocation: '8 hrs/wk',
    availability: 'Available Next Week',
  },
];

export const FractionalCoreCalculatorDirectorySection: React.FC<
  FractionalCoreCalculatorDirectorySectionProps
> = ({ title, subtitle }) => {
  // Calculator State
  const [selectedRole, setSelectedRole] = useState<ExecutiveRoleId>('CTO');
  const [weeklyHours, setWeeklyHours] = useState<WeeklyCommitmentHrs>(10);
  const [includeEquityValuation, setIncludeEquityValuation] = useState<boolean>(false);

  // Directory Filter State
  const [roleFilter, setRoleFilter] = useState<'All' | ExecutiveRoleId>('All');
  const [stageFilter, setStageFilter] = useState<
    'All' | 'Pre-Seed' | 'Seed' | 'Series A' | 'Series B'
  >('All');
  const [domainFilter, setDomainFilter] = useState<
    'All' | 'AI/ML' | 'B2B SaaS' | 'Fintech' | 'DevTools'
  >('All');

  // Calculator Formula Execution:
  // Full-Time Cost = Base Salary + (Base * 0.20) + Equity Value (optional toggle or shown alongside)
  // Fractional Cost = Monthly Retainer * 12
  // Net Annual Savings = Full-Time Cost - Fractional Cost
  const calcMetrics = useMemo(() => {
    const cfg = ROLE_BENCHMARKS[selectedRole];
    const baseSalary = cfg.fullTimeBase;
    const benefitsAndTaxes = Math.round(baseSalary * 0.2);
    const cashFullTimeCost = baseSalary + benefitsAndTaxes;
    const equityVal = includeEquityValuation ? cfg.estimatedEquityDollarValue : 0;
    const totalFullTimeCost = cashFullTimeCost + equityVal;

    const monthlyRetainer = cfg.retainerByHours[weeklyHours];
    const annualFractionalCost = monthlyRetainer * 12;
    const netAnnualCashSavings = cashFullTimeCost - annualFractionalCost;
    const netTotalSavings = totalFullTimeCost - annualFractionalCost;

    return {
      cfg,
      baseSalary,
      benefitsAndTaxes,
      cashFullTimeCost,
      equityVal,
      totalFullTimeCost,
      monthlyRetainer,
      annualFractionalCost,
      netAnnualCashSavings,
      netTotalSavings,
    };
  }, [selectedRole, weeklyHours, includeEquityValuation]);

  // Filtered Executive Directory
  const filteredProfiles = useMemo(() => {
    return EXECUTIVE_DIRECTORY_PROFILES.filter((prof) => {
      const matchesRole = roleFilter === 'All' || prof.role === roleFilter;
      const matchesStage =
        stageFilter === 'All' || prof.stageExpertise.includes(stageFilter);
      const matchesDomain =
        domainFilter === 'All' || prof.domains.includes(domainFilter);
      return matchesRole && matchesStage && matchesDomain;
    });
  }, [roleFilter, stageFilter, domainFilter]);

  const handleClaimMatchReport = () => {
    window.dispatchEvent(
      new CustomEvent('fractional:select-executive', {
        detail: {
          candidateId: `Custom ${calcMetrics.cfg.label} Match (${weeklyHours} hrs/wk)`,
          role: selectedRole,
          retainer: `$${calcMetrics.monthlyRetainer.toLocaleString()}/mo`,
          allocation: `${weeklyHours} hrs/wk`,
          summary: `Estimated Savings: $${calcMetrics.netAnnualCashSavings.toLocaleString()}/yr + 100% Equity Preserved`,
        },
      })
    );
    const el = document.getElementById('fractional-match-form');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleRequestCandidateIntro = (prof: ExecutiveCandidateProfile) => {
    window.dispatchEvent(
      new CustomEvent('fractional:select-executive', {
        detail: {
          candidateId: prof.candidateCode,
          role: prof.role,
          retainer: prof.retainerRate,
          allocation: prof.weeklyAllocation,
          summary: prof.trackRecord,
        },
      })
    );
    const el = document.getElementById('fractional-match-form');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      className="py-16 lg:py-24 border-b"
      style={{
        backgroundColor: '#0A0F1D',
        borderColor: '#334155',
        color: '#F8FAFC',
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* ===================================================================== */}
        {/* PART C: INTERACTIVE FULL-TIME VS. FRACTIONAL COST SAVINGS CALCULATOR */}
        {/* ===================================================================== */}
        <div id="fractional-calculator" className="scroll-mt-24 space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F59E0B]/15 border border-[#F59E0B]/35 text-[#F59E0B] text-xs font-mono uppercase tracking-wider font-bold">
              <Calculator size={13} />
              <span>CAP TABLE &amp; RUNWAY PRESERVATION MODEL</span>
            </div>

            <EditableText
              id="fractional_calc_title"
              defaultText={title || 'Stop Diluting Cap Tables for Early-Stage Hires'}
              as="h2"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]"
              style={{ fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif" }}
            />

            <EditableText
              id="fractional_calc_subtitle"
              defaultText={
                subtitle ||
                'Compare the true Year-1 cash and equity burden of a full-time C-suite hire against a pre-vetted FractionalCore leader.'
              }
              as="p"
              className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Controls Card */}
            <div
              className="lg:col-span-5 rounded-2xl border p-6 sm:p-7 flex flex-col justify-between space-y-6"
              style={{
                backgroundColor: '#1E293B',
                borderColor: '#334155',
              }}
            >
              <div className="space-y-6">
                {/* 1. Select Executive Role */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#9CA3AF] font-bold">
                    1. SELECT EXECUTIVE ROLE
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {(['CTO', 'CFO', 'CMO', 'CPO'] as ExecutiveRoleId[]).map((role) => {
                      const active = selectedRole === role;
                      return (
                        <button
                          key={role}
                          type="button"
                          onClick={() => setSelectedRole(role)}
                          className={`px-4 py-3 rounded-xl text-xs font-bold border text-left transition flex items-center justify-between cursor-pointer ${
                            active
                              ? 'bg-[#F59E0B] text-[#0A0F1D] border-[#F59E0B] shadow-md'
                              : 'bg-[#0A0F1D] text-[#F8FAFC] border-[#334155] hover:border-[#F59E0B]/50'
                          }`}
                        >
                          <span>Fractional {role}</span>
                          {active && <CheckCircle2 size={14} />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Select Target Weekly Commitment */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#9CA3AF] font-bold">
                    2. SELECT TARGET WEEKLY COMMITMENT
                  </label>
                  <div className="space-y-2">
                    {[
                      {
                        hrs: 5 as WeeklyCommitmentHrs,
                        tag: '5 Hours/wk (Advisory)',
                        desc: 'Board prep, architecture/financial audit & hiring calibration',
                      },
                      {
                        hrs: 10 as WeeklyCommitmentHrs,
                        tag: '10 Hours/wk (Strategic Lead)',
                        desc: 'Most Popular · Direct team leadership & investor readiness',
                      },
                      {
                        hrs: 20 as WeeklyCommitmentHrs,
                        tag: '20 Hours/wk (Interim Execution)',
                        desc: 'Deep operational ownership & high-velocity sprint execution',
                      },
                    ].map((tier) => {
                      const active = weeklyHours === tier.hrs;
                      return (
                        <button
                          key={tier.hrs}
                          type="button"
                          onClick={() => setWeeklyHours(tier.hrs)}
                          className={`w-full p-3.5 rounded-xl border text-left transition cursor-pointer ${
                            active
                              ? 'bg-[#6366F1]/20 border-[#6366F1] text-[#F8FAFC]'
                              : 'bg-[#0A0F1D] border-[#334155] text-[#9CA3AF] hover:text-[#F8FAFC]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-extrabold text-[#F8FAFC]">
                              {tier.tag}
                            </span>
                            <span className="font-mono text-xs font-bold text-[#10B981]">
                              ${ROLE_BENCHMARKS[selectedRole].retainerByHours[tier.hrs].toLocaleString()}/mo
                            </span>
                          </div>
                          <p className="text-[11px] text-[#9CA3AF] mt-1">{tier.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Optional Toggle: Include Series-A Equity Dollar Value in Total Math */}
                <div className="p-3.5 rounded-xl bg-[#0A0F1D] border border-[#334155] flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-[#F8FAFC]">
                      Include Equity Dilution Value ($
                      {calcMetrics.cfg.estimatedEquityDollarValue.toLocaleString()})
                    </div>
                    <div className="text-[11px] text-[#9CA3AF]">
                      Models {calcMetrics.cfg.equityGrantRange} C-suite grant at a $10M post-money valuation
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIncludeEquityValuation(!includeEquityValuation)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                      includeEquityValuation
                        ? 'bg-[#10B981] text-[#0A0F1D]'
                        : 'bg-[#1E293B] text-[#9CA3AF] border border-[#334155]'
                    }`}
                  >
                    {includeEquityValuation ? 'INCLUDED' : '+ ADD EQUITY $'}
                  </button>
                </div>
              </div>

              {/* Role Deliverables Summary */}
              <div className="p-4 rounded-xl bg-[#0A0F1D]/80 border border-[#334155] space-y-1.5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#F59E0B] font-bold">
                  INCLUDED IN {weeklyHours} HRS/WK {selectedRole} MANDATE:
                </div>
                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                  {calcMetrics.cfg.typicalDeliverables[weeklyHours]}
                </p>
              </div>
            </div>

            {/* Right Dynamic Output Comparison Table */}
            <div
              className="lg:col-span-7 rounded-2xl border p-6 sm:p-8 flex flex-col justify-between space-y-6"
              style={{
                backgroundColor: '#1E293B',
                borderColor: '#334155',
              }}
            >
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#334155]">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#9CA3AF]">
                      ANNUAL COMPENSATION &amp; EQUITY COMPARISON
                    </span>
                    <h3
                      className="text-xl font-bold text-[#F8FAFC] mt-0.5"
                      style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                    >
                      Full-Time {selectedRole} vs. FractionalCore {selectedRole} ({weeklyHours} hrs/wk)
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-md bg-[#10B981]/15 border border-[#10B981]/40 font-mono text-xs font-bold text-[#10B981]">
                    84% Cash Burn Reduction
                  </span>
                </div>

                {/* Comparison Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full-Time Executive Column */}
                  <div className="p-5 rounded-xl bg-[#0A0F1D] border border-[#334155] space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#9CA3AF]">
                        Full-Time {selectedRole} Hire
                      </span>
                      <TrendingDown size={15} className="text-rose-400" />
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-center justify-between py-1.5 border-b border-[#1E293B]">
                        <span className="text-[#9CA3AF]">Base Salary</span>
                        <span className="font-mono font-bold text-[#F8FAFC]">
                          ${calcMetrics.baseSalary.toLocaleString()}/yr
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-[#1E293B]">
                        <span className="text-[#9CA3AF]">Benefits, Payroll &amp; Taxes (20%)</span>
                        <span className="font-mono font-bold text-[#F8FAFC]">
                          +${calcMetrics.benefitsAndTaxes.toLocaleString()}/yr
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-[#1E293B]">
                        <span className="text-[#9CA3AF]">Executive Search Fee</span>
                        <span className="font-mono font-bold text-rose-400">
                          4–6 Months Delay
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1.5">
                        <span className="text-[#9CA3AF]">Cap Table Equity Grant</span>
                        <span className="font-mono font-bold text-[#F59E0B]">
                          {calcMetrics.cfg.equityGrantRange} Equity
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#334155]">
                      <div className="text-[11px] text-[#9CA3AF]">Total Year 1 Cost</div>
                      <div className="text-2xl font-mono font-extrabold text-[#F8FAFC] mt-0.5">
                        ${calcMetrics.totalFullTimeCost.toLocaleString()}{' '}
                        <span className="text-xs font-bold text-[#F59E0B]">
                          + {calcMetrics.cfg.equityGrantRange} Equity
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* FractionalCore Executive Column */}
                  <div
                    className="p-5 rounded-xl border space-y-4 relative"
                    style={{
                      backgroundColor: 'rgba(16, 185, 129, 0.06)',
                      borderColor: 'rgba(16, 185, 129, 0.45)',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#10B981]">
                        FractionalCore {selectedRole}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#10B981] text-[#0A0F1D] font-mono text-[10px] font-extrabold">
                        RECOMMENDED
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-center justify-between py-1.5 border-b border-[#334155]/60">
                        <span className="text-[#9CA3AF]">Flat Monthly Retainer</span>
                        <span className="font-mono font-bold text-[#10B981]">
                          ${calcMetrics.monthlyRetainer.toLocaleString()}/mo
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-[#334155]/60">
                        <span className="text-[#9CA3AF]">Benefits, Taxes &amp; Severance</span>
                        <span className="font-mono font-bold text-[#10B981]">$0</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 border-b border-[#334155]/60">
                        <span className="text-[#9CA3AF]">Onboarding Speed</span>
                        <span className="font-mono font-bold text-[#F8FAFC]">
                          &lt; 72 Hours
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1.5">
                        <span className="text-[#9CA3AF]">Cap Table Equity Dilution</span>
                        <span className="font-mono font-bold text-[#10B981]">
                          0.0% Equity
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#10B981]/30">
                      <div className="text-[11px] text-[#9CA3AF]">Total Year 1 Cost</div>
                      <div className="text-2xl font-mono font-extrabold text-[#10B981] mt-0.5">
                        ${calcMetrics.annualFractionalCost.toLocaleString()}{' '}
                        <span className="text-xs font-bold text-[#F8FAFC]">
                          &amp; 0% Equity
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Net Savings Callout Banner */}
                <div
                  className="p-5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(16, 185, 129, 0.16) 0%, rgba(245, 158, 11, 0.12) 100%)',
                    borderColor: '#10B981',
                  }}
                >
                  <div className="space-y-1">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#10B981] font-bold">
                      NET ANNUAL FOUNDER SAVINGS
                    </div>
                    <div className="text-2xl sm:text-3xl font-mono font-extrabold text-[#F8FAFC]">
                      Save ${calcMetrics.netTotalSavings.toLocaleString()}/yr{' '}
                      <span className="text-[#F59E0B]">+ 100% of Your Equity</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleClaimMatchReport}
                    className="px-5 py-3.5 rounded-xl text-xs font-extrabold text-[#0A0F1D] flex items-center gap-2 shadow-lg shrink-0 transition hover:opacity-95 cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                    }}
                  >
                    <span>Claim Your Free Match Report</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#9CA3AF] font-mono pt-2 border-t border-[#334155]">
                <span>
                  FORMULA: Full-Time (${calcMetrics.baseSalary.toLocaleString()} + 20% Burden) − Fractional (${calcMetrics.monthlyRetainer.toLocaleString()}/mo × 12)
                </span>
                <span className="text-[#10B981]">● Pause or Scale Hours Anytime</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* PART D: FILTERABLE EXECUTIVE PROFILE DIRECTORY                        */}
        {/* ===================================================================== */}
        <div id="fractional-directory" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#6366F1]/15 border border-[#6366F1]/40 text-[#818CF8] text-xs font-mono uppercase tracking-wider font-bold">
                <Filter size={13} />
                <span>NON-CONFIDENTIAL CANDIDATE ROSTER</span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]"
                style={{ fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif" }}
              >
                Filter Pre-Vetted C-Suite Leaders by Stage &amp; Stack
              </h2>
              <p className="text-sm sm:text-base text-[#9CA3AF]">
                Every leader passes a 4-stage institutional vetting process including cap-table reference checks with past Board Directors and VCs.
              </p>
            </div>

            <div className="text-xs font-mono text-[#10B981] bg-[#1E293B] border border-[#334155] px-4 py-2.5 rounded-xl">
              Showing <strong>{filteredProfiles.length}</strong> of{' '}
              {EXECUTIVE_DIRECTORY_PROFILES.length} Featured Dossiers (18 Total Active)
            </div>
          </div>

          {/* Real-Time Client-Side Filter Bar */}
          <div
            className="p-5 rounded-2xl border grid grid-cols-1 md:grid-cols-3 gap-4"
            style={{
              backgroundColor: '#1E293B',
              borderColor: '#334155',
            }}
          >
            {/* Role Filter */}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#9CA3AF]">
                EXECUTIVE ROLE
              </label>
              <div className="flex flex-wrap gap-1.5">
                {(['All', 'CTO', 'CFO', 'CMO', 'CPO'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRoleFilter(r)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      roleFilter === r
                        ? 'bg-[#F59E0B] text-[#0A0F1D]'
                        : 'bg-[#0A0F1D] text-[#9CA3AF] hover:text-[#F8FAFC] border border-[#334155]'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Stage Expertise Filter */}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#9CA3AF]">
                STAGE EXPERTISE
              </label>
              <div className="flex flex-wrap gap-1.5">
                {(['All', 'Pre-Seed', 'Seed', 'Series A', 'Series B'] as const).map(
                  (stage) => (
                    <button
                      key={stage}
                      type="button"
                      onClick={() => setStageFilter(stage)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        stageFilter === stage
                          ? 'bg-[#6366F1] text-[#F8FAFC]'
                          : 'bg-[#0A0F1D] text-[#9CA3AF] hover:text-[#F8FAFC] border border-[#334155]'
                      }`}
                    >
                      {stage}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Technical Stack / Domain Filter */}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#9CA3AF]">
                TECHNICAL STACK / DOMAIN
              </label>
              <div className="flex flex-wrap gap-1.5">
                {(['All', 'AI/ML', 'B2B SaaS', 'Fintech', 'DevTools'] as const).map(
                  (dom) => (
                    <button
                      key={dom}
                      type="button"
                      onClick={() => setDomainFilter(dom)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        domainFilter === dom
                          ? 'bg-[#10B981] text-[#0A0F1D]'
                          : 'bg-[#0A0F1D] text-[#9CA3AF] hover:text-[#F8FAFC] border border-[#334155]'
                      }`}
                    >
                      {dom}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Candidate Profile Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((prof) => (
              <div
                key={prof.id}
                className="rounded-2xl border p-6 flex flex-col justify-between space-y-5 transition hover:-translate-y-0.5"
                style={{
                  backgroundColor: '#1E293B',
                  borderColor: '#334155',
                }}
              >
                <div className="space-y-4">
                  {/* Card Header: Anonymized Candidate ID, Location, Years of Experience */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="inline-block px-2.5 py-1 rounded bg-[#6366F1]/20 border border-[#6366F1]/40 font-mono text-xs font-bold text-[#818CF8]">
                        {prof.candidateCode}
                      </span>
                      <div className="flex items-center gap-3 text-xs text-[#9CA3AF] mt-2">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} className="text-[#F59E0B]" />
                          {prof.location}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-semibold text-[#F8FAFC]">
                          <Briefcase size={12} className="text-[#10B981]" />
                          {prof.yearsExp}
                        </span>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-md bg-[#F59E0B]/15 border border-[#F59E0B]/40 text-[#F59E0B] text-[11px] font-bold">
                      ★ {prof.pastExitTag}
                    </span>
                  </div>

                  {/* Track Record Highlights */}
                  <p className="text-xs sm:text-sm text-[#F8FAFC] leading-relaxed font-medium">
                    “{prof.trackRecord}”
                  </p>

                  {/* Stage & Domain Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {prof.stageExpertise.map((st) => (
                      <span
                        key={st}
                        className="px-2 py-0.5 rounded bg-[#0A0F1D] border border-[#334155] text-[10px] font-mono text-[#9CA3AF]"
                      >
                        {st}
                      </span>
                    ))}
                    {prof.domains.map((dm) => (
                      <span
                        key={dm}
                        className="px-2 py-0.5 rounded bg-[#6366F1]/15 border border-[#6366F1]/30 text-[10px] font-semibold text-[#818CF8]"
                      >
                        {dm}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-3 border-t border-[#334155]">
                  {/* Key Metrics Grid: Retainer Rate, Weekly Allocation, Availability */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#0A0F1D] border border-[#334155] text-center">
                    <div>
                      <div className="text-[10px] text-[#9CA3AF] font-mono">RETAINER</div>
                      <div className="text-xs font-mono font-bold text-[#10B981] mt-0.5">
                        {prof.retainerRate}
                      </div>
                    </div>
                    <div className="border-x border-[#334155]">
                      <div className="text-[10px] text-[#9CA3AF] font-mono">ALLOCATION</div>
                      <div className="text-xs font-mono font-bold text-[#F8FAFC] mt-0.5">
                        {prof.weeklyAllocation}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#9CA3AF] font-mono">STATUS</div>
                      <div className="text-[11px] font-bold text-[#10B981] mt-0.5 truncate px-1">
                        ● Active
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    type="button"
                    onClick={() => handleRequestCandidateIntro(prof)}
                    className="w-full py-3 rounded-xl text-xs font-extrabold text-[#0A0F1D] flex items-center justify-center gap-2 transition hover:opacity-95 cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                    }}
                  >
                    <span>
                      Request Intro to {prof.candidateCode.replace('Executive ', '')}
                    </span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
