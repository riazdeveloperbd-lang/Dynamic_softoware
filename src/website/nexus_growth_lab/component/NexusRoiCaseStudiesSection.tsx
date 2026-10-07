import React, { useState } from 'react';
import { ArrowRight, Sliders, TrendingUp, BarChart3 } from 'lucide-react';
import {
  EditableText,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface NexusRoiCaseStudiesSectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

type CaseStudySector =
  | 'SaaS (ACV $50k+)'
  | 'Fintech & Security'
  | 'Enterprise AI'
  | 'B2B Marketplaces';

interface CaseStudyData {
  id: string;
  sector: CaseStudySector;
  clientName: string;
  clientDescriptor: string;
  summary: string;
  metrics: {
    leadLift: string;
    cpaReduction: string;
    newPipeline: string;
  };
  baselineSeries: number[]; // 6 months ($k pipeline)
  nexusSeries: number[]; // 6 months ($k pipeline)
  strategyBullets: string[];
}

const CASE_STUDIES_DATA: CaseStudyData[] = [
  {
    id: 'cs_cloudscale',
    sector: 'SaaS (ACV $50k+)',
    clientName: 'CloudScale AI — Series B SaaS',
    clientDescriptor: 'Cloud Infrastructure Automation · $68k Average ACV',
    summary:
      'Replaced fragmented broad-match search campaigns with intent-verified LinkedIn ABM and programmatic technical comparison pages.',
    metrics: {
      leadLift: '+280% Qualified Leads',
      cpaReduction: '-45% Cost Per Acquisition',
      newPipeline: '$8.4M New Pipeline',
    },
    baselineSeries: [220, 240, 235, 260, 250, 275],
    nexusSeries: [240, 480, 790, 1180, 1590, 2120],
    strategyBullets: [
      '01. Hyper-targeted ABM LinkedIn Ads synced with 6sense & Bombora buyer intent surges',
      '02. Intent-Based Outbound Engine pairing SDR sequences with interactive ROI micro-sites',
      '03. Multi-touch Salesforce revenue attribution eliminating $42k/mo in wasted zero-SQL ad spend',
    ],
  },
  {
    id: 'cs_vanguard',
    sector: 'Fintech & Security',
    clientName: 'Vanguard Zero-Trust — Series C Cybersecurity',
    clientDescriptor: 'Enterprise Identity & SOC Automation · $115k Average ACV',
    summary:
      'Engineered an executive CISO demand engine combining dark-funnel intent capture, technical threat-report gating, and direct gifting.',
    metrics: {
      leadLift: '+315% Enterprise Demos',
      cpaReduction: '-39% Pipeline CAC',
      newPipeline: '$14.2M New Pipeline',
    },
    baselineSeries: [310, 330, 325, 340, 360, 370],
    nexusSeries: [350, 690, 1140, 1780, 2420, 3150],
    strategyBullets: [
      '01. Account-level IP targeting across 1,400 Fortune 2000 security & compliance buying committees',
      '02. High-intent Google Search & G2 category capture with custom CISO threat-modeling calculators',
      '03. Automated RevOps lead routing cutting SDR speed-to-lead from 4 hours to 90 seconds',
    ],
  },
  {
    id: 'cs_aether',
    sector: 'Enterprise AI',
    clientName: 'Aether LLM Ops — Enterprise AI Platform',
    clientDescriptor: 'Private Model Deployment & Governance · $92k Average ACV',
    summary:
      'Scaled technical VP of Engineering pipeline from seed-stage referrals to a repeatable multi-channel inbound + outbound growth machine.',
    metrics: {
      leadLift: '+340% SQL Velocity',
      cpaReduction: '-42% Paid CAC',
      newPipeline: '$11.6M New Pipeline',
    },
    baselineSeries: [180, 195, 210, 205, 225, 240],
    nexusSeries: [210, 520, 910, 1390, 1940, 2580],
    strategyBullets: [
      '01. Technical benchmark whitepapers promoted to VP Engineering & Principal Architect cohorts',
      '02. Full-funnel HubSpot + Snowflake attribution tracking token usage to enterprise expansion',
      '03. Conversion-engineered product tour sandboxes lifting landing page CVR from 1.8% to 6.4%',
    ],
  },
  {
    id: 'cs_kinetic',
    sector: 'B2B Marketplaces',
    clientName: 'Kinetic Freight Exchange — Industrial B2B Marketplace',
    clientDescriptor: 'Cross-Border Supply Chain & Logistics · $54k Average ACV',
    summary:
      'Unified supply-side and enterprise shipper acquisition under a single algorithmic bidding and RevOps forecasting architecture.',
    metrics: {
      leadLift: '+245% Qualified Shippers',
      cpaReduction: '-36% Blended CAC',
      newPipeline: '$6.9M New Pipeline',
    },
    baselineSeries: [150, 165, 170, 180, 175, 190],
    nexusSeries: [170, 380, 640, 980, 1320, 1680],
    strategyBullets: [
      '01. Programmatic lane-specific landing pages dynamically matching enterprise freight RFPs',
      '02. Closed-loop offline conversion imports feeding Google Ads value-based bidding on signed ACV',
      '03. Automated pipeline hygiene & deal-stage velocity alerts for 28 account executives',
    ],
  },
];

export const NexusRoiCaseStudiesSection: React.FC<
  NexusRoiCaseStudiesSectionProps
> = ({
  title = 'Calculate Your Revenue Growth Potential',
  subtitle = 'Model your projected monthly sales pipeline, new Annual Recurring Revenue (ARR), and ROAS multiplier using verified B2B benchmark formulas.',
  primaryColor = '#2563EB',
}) => {
  // Interactive B2B ROI Calculator State
  const [monthlyAdSpend, setMonthlyAdSpend] = useState<number>(35000);
  const [acv, setAcv] = useState<number>(60000);
  const [closeRate, setCloseRate] = useState<number>(22);

  // Case Studies State
  const [activeSector, setActiveSector] =
    useState<CaseStudySector>('SaaS (ACV $50k+)');
  const [chartViewMode, setChartViewMode] = useState<
    'comparison' | 'nexus_only' | 'baseline_only'
  >('comparison');

  // Formula Calculation:
  // ROAS Multiplier scales realistically with ACV and Sales Closing Rate
  const roasMultiplier = Number(
    (
      3.4 +
      (closeRate / 50) * 1.4 +
      Math.min(acv / 250000, 1) * 0.7
    ).toFixed(1)
  );
  const projectedMonthlyPipeline = Math.round(monthlyAdSpend * roasMultiplier);
  const estimatedNewArr = Math.round(
    projectedMonthlyPipeline * (closeRate / 100) * 12 * 0.32
  );

  const formatCurrencyCompact = (val: number) => {
    if (val >= 1000000) {
      return `$${(val / 1000000).toFixed(2)}M`;
    }
    return `$${val.toLocaleString('en-US')}`;
  };

  const activeCaseStudy =
    CASE_STUDIES_DATA.find((c) => c.sector === activeSector) ||
    CASE_STUDIES_DATA[0];

  const scrollToAudit = () => {
    if (typeof document !== 'undefined') {
      const el = document.querySelector('#nexus-audit-booking');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Convert 6-month series to SVG coordinates (width 520, height 180)
  const maxVal = Math.max(...activeCaseStudy.nexusSeries, 2500);
  const toSvgPoints = (series: number[]) =>
    series
      .map((val, idx) => {
        const x = idx * (520 / 5);
        const y = 175 - (val / maxVal) * 145;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

  const baselinePoints = toSvgPoints(activeCaseStudy.baselineSeries);
  const nexusPoints = toSvgPoints(activeCaseStudy.nexusSeries);

  return (
    <div className="bg-[#0B0F17] text-[#F9FAFB]">
      {/* ================================================================= */}
      {/* SECTION C: INTERACTIVE B2B ROI CALCULATOR                         */}
      {/* ================================================================= */}
      <section
        id="nexus-roi-calculator"
        className="py-20 px-6 border-b border-[#1F2937]"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-[#9CA3AF]">
              <Sliders size={14} style={{ color: primaryColor }} />
              <span style={{ color: primaryColor }} className="font-semibold">
                Interactive Pipeline &amp; ROAS Simulator
              </span>
              <span aria-hidden="true">·</span>
              <span>Target Pipeline = Ad Spend × ROAS Multiplier</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-semibold tracking-tight"
              style={{
                fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif",
                textWrap: 'balance',
              }}
            >
              <EditableText id="nexus_roi_heading" defaultText={title} />
            </h2>

            <EditableText
              id="nexus_roi_subtitle"
              as="p"
              defaultText={subtitle}
              className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed block"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 7 Columns: 3 Interactive Sliders */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#111827] border border-[#1F2937] flex flex-col justify-between space-y-8">
              {/* Slider 1: Current Monthly Ad Spend ($5,000 to $150,000+) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="slider-ad-spend"
                    className="text-sm font-semibold text-[#F9FAFB]"
                  >
                    01. Current Monthly Ad Spend ($)
                  </label>
                  <span className="text-lg font-mono font-semibold text-[#2563EB] tabular-nums">
                    ${monthlyAdSpend.toLocaleString('en-US')}/mo
                  </span>
                </div>
                <input
                  id="slider-ad-spend"
                  type="range"
                  min={5000}
                  max={150000}
                  step={2500}
                  value={monthlyAdSpend}
                  onChange={(e) => setMonthlyAdSpend(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#0B0F17] accent-[#2563EB]"
                />
                <div className="flex justify-between text-xs font-mono text-[#9CA3AF] tabular-nums">
                  <span>$5,000</span>
                  <span>$50,000</span>
                  <span>$100,000</span>
                  <span>$150,000+</span>
                </div>
              </div>

              {/* Slider 2: Average Contract Value / ACV ($5,000 to $250,000) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="slider-acv"
                    className="text-sm font-semibold text-[#F9FAFB]"
                  >
                    02. Average Contract Value / ACV ($)
                  </label>
                  <span className="text-lg font-mono font-semibold text-[#7C3AED] tabular-nums">
                    ${acv.toLocaleString('en-US')} ACV
                  </span>
                </div>
                <input
                  id="slider-acv"
                  type="range"
                  min={5000}
                  max={250000}
                  step={5000}
                  value={acv}
                  onChange={(e) => setAcv(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#0B0F17] accent-[#7C3AED]"
                />
                <div className="flex justify-between text-xs font-mono text-[#9CA3AF] tabular-nums">
                  <span>$5,000</span>
                  <span>$80,000</span>
                  <span>$165,000</span>
                  <span>$250,000</span>
                </div>
              </div>

              {/* Slider 3: Sales Closing Rate (5% to 50%) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="slider-close-rate"
                    className="text-sm font-semibold text-[#F9FAFB]"
                  >
                    03. Sales Closing Rate (SQL to Closed-Won %)
                  </label>
                  <span className="text-lg font-mono font-semibold text-[#10B981] tabular-nums">
                    {closeRate}% Close Rate
                  </span>
                </div>
                <input
                  id="slider-close-rate"
                  type="range"
                  min={5}
                  max={50}
                  step={1}
                  value={closeRate}
                  onChange={(e) => setCloseRate(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#0B0F17] accent-[#10B981]"
                />
                <div className="flex justify-between text-xs font-mono text-[#9CA3AF] tabular-nums">
                  <span>5%</span>
                  <span>20%</span>
                  <span>35%</span>
                  <span>50%</span>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Dynamic Output Display Card & Conversion Hook */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#111827] border border-[#2563EB]/50 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-[#1F2937] pb-4">
                  <span className="text-xs font-mono uppercase text-[#9CA3AF]">
                    Projected Growth Readout
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#10B981] tabular-nums">
                    {roasMultiplier}x Projected ROAS Multiplier
                  </span>
                </div>

                {/* Output 1: Projected Monthly Pipeline ($) */}
                <div className="space-y-1">
                  <div className="text-xs text-[#9CA3AF]">
                    Projected Monthly Qualified Pipeline ($)
                  </div>
                  <div className="text-4xl sm:text-5xl font-mono font-semibold text-[#10B981] tabular-nums tracking-tight">
                    ${projectedMonthlyPipeline.toLocaleString('en-US')}
                    <span className="text-base font-normal text-[#9CA3AF]">
                      /mo
                    </span>
                  </div>
                </div>

                {/* Output 2 & 3 Grid: Estimated New ARR & ROAS Multiplier */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#0B0F17] border border-[#1F2937]">
                    <div className="text-xs text-[#9CA3AF]">
                      Est. New Annual ARR
                    </div>
                    <div className="text-xl sm:text-2xl font-mono font-semibold text-[#10B981] tabular-nums mt-1">
                      {formatCurrencyCompact(estimatedNewArr)}
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0B0F17] border border-[#1F2937]">
                    <div className="text-xs text-[#9CA3AF]">
                      ROAS Multiplier
                    </div>
                    <div className="text-xl sm:text-2xl font-mono font-semibold text-[#F9FAFB] tabular-nums mt-1">
                      {roasMultiplier}x
                    </div>
                  </div>
                </div>

                <div className="text-xs text-[#9CA3AF] leading-relaxed">
                  Formula: <span className="font-mono text-[#F9FAFB]">${monthlyAdSpend.toLocaleString('en-US')}</span> monthly spend ×{' '}
                  <span className="font-mono text-[#10B981]">{roasMultiplier}x</span> verified B2B multiplier at{' '}
                  <span className="font-mono text-[#F9FAFB]">${acv.toLocaleString('en-US')}</span> ACV.
                </div>
              </div>

              {/* Dynamic Conversion Hook CTA */}
              <button
                type="button"
                onClick={scrollToAudit}
                className="w-full py-4 px-5 rounded-xl text-xs sm:text-sm font-semibold text-[#F9FAFB] inline-flex items-center justify-center gap-2 transition-opacity hover:opacity-95 cursor-pointer shadow-lg"
                style={{ backgroundColor: primaryColor }}
              >
                <span>
                  Claim Your Custom {formatCurrencyCompact(projectedMonthlyPipeline)}/mo Growth Plan
                </span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION D: CASE STUDIES WITH INTERACTIVE PERFORMANCE CHARTS       */}
      {/* ================================================================= */}
      <section
        id="nexus-case-studies"
        className="py-20 px-6 border-b border-[#1F2937]"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header + Sector Filter Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-medium text-[#9CA3AF]">
                <BarChart3 size={14} className="text-[#10B981]" />
                <span className="text-[#10B981] font-semibold">
                  Verified Enterprise Case Studies
                </span>
                <span aria-hidden="true">·</span>
                <span>Audited CRM Pipeline Data</span>
              </div>

              <h2
                className="text-3xl sm:text-4xl font-semibold tracking-tight"
                style={{
                  fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif",
                  textWrap: 'balance',
                }}
              >
                <EditableText
                  id="nexus_cases_heading"
                  defaultText="Proven Pipeline Expansion Across B2B Verticals"
                />
              </h2>
            </div>

            {/* 4 Interactive Sector Filter Tabs */}
            <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#111827] border border-[#1F2937] self-start">
              {(
                [
                  'SaaS (ACV $50k+)',
                  'Fintech & Security',
                  'Enterprise AI',
                  'B2B Marketplaces',
                ] as CaseStudySector[]
              ).map((sector) => {
                const active = activeSector === sector;
                return (
                  <button
                    key={sector}
                    type="button"
                    onClick={() => setActiveSector(sector)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition cursor-pointer ${
                      active
                        ? 'text-[#F9FAFB] shadow-xs'
                        : 'text-[#9CA3AF] hover:text-[#F9FAFB]'
                    }`}
                    style={
                      active ? { backgroundColor: primaryColor } : undefined
                    }
                  >
                    {sector}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Case Study Card with Key Metrics Grid, Interactive Line Chart & Strategy Breakdown */}
          <div className="rounded-3xl p-6 sm:p-10 bg-[#111827] border border-[#1F2937] space-y-8">
            {/* Case Study Header + 3 Prominent Stat Callouts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-[#1F2937]">
              <div className="lg:col-span-5 space-y-2">
                <div className="text-xs font-mono text-[#9CA3AF]">
                  {activeCaseStudy.clientDescriptor}
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-semibold text-[#F9FAFB]"
                  style={{
                    fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  {activeCaseStudy.clientName}
                </h3>
                <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                  {activeCaseStudy.summary}
                </p>
              </div>

              {/* 3 Prominent Stat Callouts */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-[#0B0F17] border border-[#1F2937]">
                  <div className="text-xs text-[#9CA3AF]">Lead Volume Lift</div>
                  <div className="text-xl sm:text-2xl font-mono font-semibold text-[#10B981] tabular-nums mt-1">
                    {activeCaseStudy.metrics.leadLift}
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-[#0B0F17] border border-[#1F2937]">
                  <div className="text-xs text-[#9CA3AF]">Efficiency Gain</div>
                  <div className="text-xl sm:text-2xl font-mono font-semibold text-[#10B981] tabular-nums mt-1">
                    {activeCaseStudy.metrics.cpaReduction}
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-[#0B0F17] border border-[#1F2937]">
                  <div className="text-xs text-[#9CA3AF]">6-Month Attribution</div>
                  <div className="text-xl sm:text-2xl font-mono font-semibold text-[#F9FAFB] tabular-nums mt-1">
                    {activeCaseStudy.metrics.newPipeline}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Chart Component + Strategy Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 7 Columns: Toggleable Line Chart (Baseline vs. With Nexus over 6 Months) */}
              <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0B0F17] border border-[#1F2937] space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-mono text-[#9CA3AF]">
                      6-Month Cumulative Pipeline Trajectory ($k)
                    </div>
                    <div className="text-sm font-semibold text-[#F9FAFB] mt-0.5">
                      Baseline Performance vs. Scale Performance (With Nexus)
                    </div>
                  </div>

                  {/* Interactive Chart Curve Toggle */}
                  <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#111827] border border-[#1F2937]">
                    {(
                      [
                        { id: 'comparison', label: 'Compare Both' },
                        { id: 'nexus_only', label: 'With Nexus' },
                        { id: 'baseline_only', label: 'Before Nexus' },
                      ] as const
                    ).map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setChartViewMode(mode.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                          chartViewMode === mode.id
                            ? 'bg-[#2563EB] text-[#F9FAFB]'
                            : 'text-[#9CA3AF] hover:text-[#F9FAFB]'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Glowing Vector Chart */}
                <svg
                  viewBox="0 0 520 190"
                  className="w-full h-48 overflow-visible"
                >
                  {[30, 75, 120, 165].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="520"
                      y2={y}
                      stroke="#1F2937"
                      strokeDasharray="3 3"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Baseline Performance Line (Before Nexus) */}
                  {(chartViewMode === 'comparison' ||
                    chartViewMode === 'baseline_only') && (
                    <polyline
                      fill="none"
                      stroke="#9CA3AF"
                      strokeWidth="2.5"
                      strokeDasharray="5 5"
                      points={baselinePoints}
                    />
                  )}

                  {/* Scale Performance Line (With Nexus — Emerald Mint #10B981) */}
                  {(chartViewMode === 'comparison' ||
                    chartViewMode === 'nexus_only') && (
                    <>
                      <polyline
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={nexusPoints}
                      />
                      {activeCaseStudy.nexusSeries.map((val, idx) => {
                        const x = idx * (520 / 5);
                        const y = 175 - (val / maxVal) * 145;
                        return (
                          <g key={idx}>
                            <circle
                              cx={x}
                              cy={y}
                              r="4.5"
                              fill="#10B981"
                              stroke="#0B0F17"
                              strokeWidth="2"
                            />
                            <text
                              x={x}
                              y={y - 10}
                              textAnchor="middle"
                              fill="#10B981"
                              fontSize="10"
                              fontFamily="monospace"
                            >
                              ${val}k
                            </text>
                          </g>
                        );
                      })}
                    </>
                  )}
                </svg>

                <div className="flex items-center justify-between text-xs font-mono text-[#9CA3AF] pt-1">
                  <span>M1</span>
                  <span>M2</span>
                  <span>M3</span>
                  <span>M4</span>
                  <span>M5</span>
                  <span>M6</span>
                </div>
              </div>

              {/* Right 5 Columns: Strategy Breakdown */}
              <div className="lg:col-span-5 space-y-4">
                <div className="text-xs font-mono uppercase text-[#10B981] flex items-center gap-1.5">
                  <TrendingUp size={14} />
                  <span>Execution Architecture &amp; Strategy Breakdown</span>
                </div>

                <div className="space-y-3">
                  {activeCaseStudy.strategyBullets.map((item) => (
                    <div
                      key={item}
                      className="p-4 rounded-2xl bg-[#0B0F17] border border-[#1F2937] text-xs sm:text-sm text-[#F9FAFB]/90 leading-relaxed"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
