import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  Check,
  AlertTriangle,
  Users,
  Layers,
  UserX,
  TrendingDown,
  Sparkles,
} from 'lucide-react';
import {
  EditableText,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface AuditPulseEstimatorBreakdownProps {
  title: string;
  subtitle: string;
  variant: DoctorVariantId;
  primaryColor: string;
  isDark?: boolean;
}

interface TechStackOption {
  id: string;
  name: string;
  category: string;
  avgGhostRate: string;
}

const TECH_STACK_OPTIONS: TechStackOption[] = [
  {
    id: 'gworkspace',
    name: 'Google Workspace',
    category: 'Identity & Productivity',
    avgGhostRate: '18% ghost seats',
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Team Messaging',
    avgGhostRate: '24% inactive 90d+',
  },
  {
    id: 'jira',
    name: 'Jira / Atlassian',
    category: 'Engineering & Product',
    avgGhostRate: '29% orphaned licences',
  },
  {
    id: 'zoom',
    name: 'Zoom',
    category: 'Video Conferencing',
    avgGhostRate: '31% duplicate hosts',
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'Enterprise CRM',
    avgGhostRate: '22% underutilized tiers',
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'Knowledge Base',
    avgGhostRate: '27% inactive editors',
  },
];

type BreakdownTabId = 'unassigned' | 'duplicates' | 'inactive';

interface BreakdownRow {
  appName: string;
  vendorTier: string;
  totalSeats: number;
  inactiveSeats: number;
  annualWaste: number;
  recommendation: string;
}

const BREAKDOWN_TAB_DATA: Record<
  BreakdownTabId,
  {
    label: string;
    subtitle: string;
    totalTabWaste: string;
    rows: BreakdownRow[];
  }
> = {
  unassigned: {
    label: 'Unassigned Licenses',
    subtitle:
      'Paid seat quotas sitting in admin billing pools with zero active user assignment over 90+ days.',
    totalTabWaste: '$42,840/yr',
    rows: [
      {
        appName: 'Zoom Pro',
        vendorTier: 'Enterprise Host Bundle',
        totalSeats: 150,
        inactiveSeats: 38,
        annualWaste: 9120,
        recommendation: 'Reclaim 38 unassigned host seats to Basic tier',
      },
      {
        appName: 'Salesforce Sales Cloud',
        vendorTier: 'Enterprise Edition ($165/mo)',
        totalSeats: 85,
        inactiveSeats: 11,
        annualWaste: 21780,
        recommendation: 'Revoke 11 unallocated CRM seats before Q4 renewal',
      },
      {
        appName: 'Jira Software + Confluence',
        vendorTier: 'Cloud Premium Annual',
        totalSeats: 210,
        inactiveSeats: 29,
        annualWaste: 6960,
        recommendation: 'Right-size license pool to 181 active engineers',
      },
      {
        appName: 'Google Workspace',
        vendorTier: 'Business Plus ($18/mo)',
        totalSeats: 250,
        inactiveSeats: 23,
        annualWaste: 4980,
        recommendation: 'Convert 23 suspended accounts to free Archive Vault',
      },
    ],
  },
  duplicates: {
    label: 'Duplicate Apps',
    subtitle:
      'Employees provisioned with two or more competing SaaS tools performing identical workflows.',
    totalTabWaste: '$38,520/yr',
    rows: [
      {
        appName: 'Zoom Pro + Google Meet Enterprise',
        vendorTier: 'Dual Video Conferencing',
        totalSeats: 180,
        inactiveSeats: 64,
        annualWaste: 15360,
        recommendation: 'Consolidate 64 internal-only users to Google Meet',
      },
      {
        appName: 'Notion Plus + Confluence Cloud',
        vendorTier: 'Overlapping Wiki Seats',
        totalSeats: 140,
        inactiveSeats: 45,
        annualWaste: 10800,
        recommendation: 'Downgrade 45 read-only Notion editors to Free Guest',
      },
      {
        appName: 'Asana Business + Monday.com',
        vendorTier: 'Duplicate PM Subscriptions',
        totalSeats: 95,
        inactiveSeats: 34,
        annualWaste: 12360,
        recommendation: 'Sunset legacy department Monday.com workspace',
      },
    ],
  },
  inactive: {
    label: 'Inactive Employees',
    subtitle:
      'Departed staff, contractors, or role-shifted employees still consuming full-price paid seats.',
    totalTabWaste: '$51,480/yr',
    rows: [
      {
        appName: 'Slack Business+',
        vendorTier: 'SSO Provisioned Workspace',
        totalSeats: 240,
        inactiveSeats: 42,
        annualWaste: 7560,
        recommendation: 'Deprovision 42 dormant contractor & alumni accounts',
      },
      {
        appName: 'Figma Organization',
        vendorTier: 'Full Design & Dev Mode ($75/mo)',
        totalSeats: 60,
        inactiveSeats: 19,
        annualWaste: 17100,
        recommendation: 'Switch 19 PM/Exec accounts to free Viewer Restricted',
      },
      {
        appName: 'LinkedIn Sales Navigator',
        vendorTier: 'Advanced Plus ($160/mo)',
        totalSeats: 45,
        inactiveSeats: 14,
        annualWaste: 26820,
        recommendation: 'Reassign or cancel 14 zero-login SDR licenses',
      },
    ],
  },
};

export const AuditPulseEstimatorBreakdownSection: React.FC<
  AuditPulseEstimatorBreakdownProps
> = ({
  title,
  subtitle,
  primaryColor = '#10B981',
}) => {
  const [employees, setEmployees] = useState<number>(250);
  const [selectedTools, setSelectedTools] = useState<string[]>([
    'gworkspace',
    'slack',
    'jira',
    'zoom',
    'salesforce',
  ]);
  const [activeTab, setActiveTab] = useState<BreakdownTabId>('unassigned');
  const [flaggedRowApps, setFlaggedRowApps] = useState<string[]>([]);

  const toggleTool = (id: string) => {
    setSelectedTools((prev) => {
      if (prev.includes(id)) {
        return prev.length > 1 ? prev.filter((item) => item !== id) : prev;
      }
      return [...prev, id];
    });
  };

  // Exact Blueprint Formula:
  // Estimated Annual Spend = Employees * $1,440
  // Estimated Annual Waste = Estimated Annual Spend * 0.24
  const calculation = useMemo(() => {
    const estimatedAnnualSpend = employees * 1440;
    const estimatedAnnualWaste = Math.round(estimatedAnnualSpend * 0.24);
    const auditPulseFee = Math.round(estimatedAnnualWaste * 0.15);
    const netClientSavings = estimatedAnnualWaste - auditPulseFee;
    const monthlyWaste = Math.round(estimatedAnnualWaste / 12);

    return {
      estimatedAnnualSpend,
      estimatedAnnualWaste,
      auditPulseFee,
      netClientSavings,
      monthlyWaste,
    };
  }, [employees]);

  const handleLockSavingsAndScroll = () => {
    window.dispatchEvent(
      new CustomEvent('auditpulse:select-estimate', {
        detail: {
          employees,
          selectedTools: selectedTools.map(
            (id) => TECH_STACK_OPTIONS.find((t) => t.id === id)?.name || id
          ),
          estimatedAnnualSpend: calculation.estimatedAnnualSpend,
          estimatedAnnualWaste: calculation.estimatedAnnualWaste,
          netClientSavings: calculation.netClientSavings,
        },
      })
    );
    const el = document.getElementById('auditpulse-booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentTabInfo = BREAKDOWN_TAB_DATA[activeTab];

  return (
    <div className="bg-[#0A0E17] text-[#F9FAFB]">
      {/* =====================================================================
          SECTION C: INTERACTIVE SAAS WASTE ESTIMATOR WIDGET
         ===================================================================== */}
      <section
        id="auditpulse-estimator"
        className="py-16 sm:py-20 px-4 sm:px-6 border-b border-[#1F2937]"
      >
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header */}
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono font-semibold text-[#10B981] uppercase tracking-wider">
              Interactive Financial Waste Calculator
            </div>
            <EditableText
              id="auditpulse_estimator_title"
              defaultText={
                title || 'How Much SaaS Spend Are You Wasting Each Year?'
              }
              as="h2"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F9FAFB]"
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                textWrap: 'balance',
              }}
            />
            <EditableText
              id="auditpulse_estimator_subtitle"
              defaultText={
                subtitle ||
                'Benchmark your headcount and core software stack using our mid-market telemetry formula ($1,440/employee annual spend baseline at 24% average license waste).'
              }
              as="p"
              className="text-sm sm:text-base text-[#9CA3AF]"
            />
          </div>

          {/* 12-Col Interactive Calculator Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Employee Count Slider + Primary Tech Stack Checkboxes */}
            <div className="lg:col-span-7 rounded-2xl bg-[#111827] border border-[#1F2937] p-6 sm:p-8 space-y-8">
              {/* Control 1: Interactive Employee Count Slider (20 to 1,000+) */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label
                    htmlFor="auditpulse-employee-slider"
                    className="text-xs font-mono uppercase tracking-wider text-[#9CA3AF] flex items-center gap-2"
                  >
                    <Users size={14} className="text-[#06B6D4]" />
                    <span>1. Organization Headcount (20 – 1,000+ Employees)</span>
                  </label>
                  <div className="px-3.5 py-1.5 rounded-xl bg-[#0A0E17] border border-[#1F2937] font-mono text-lg font-bold text-[#10B981] tabular-nums">
                    {employees.toLocaleString()}{' '}
                    <span className="text-xs font-normal text-[#9CA3AF]">
                      Employees
                    </span>
                  </div>
                </div>

                <input
                  id="auditpulse-employee-slider"
                  type="range"
                  min={20}
                  max={1000}
                  step={10}
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="w-full h-2.5 rounded-lg appearance-none cursor-pointer bg-[#1F2937] accent-[#10B981]"
                />

                {/* Quick Headcount Preset Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  {[50, 150, 250, 500, 750, 1000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setEmployees(preset)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition cursor-pointer ${
                        employees === preset
                          ? 'bg-[#2563EB] text-[#F9FAFB]'
                          : 'bg-[#0A0E17] text-[#9CA3AF] border border-[#1F2937] hover:text-[#F9FAFB]'
                      }`}
                    >
                      {preset === 1000 ? '1,000+ Seats' : `${preset} Seats`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Control 2: Primary Tech Stack Toggle Checkboxes */}
              <div className="space-y-3 pt-4 border-t border-[#1F2937]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#9CA3AF]">
                    2. Primary Tech Stack Toggle Checkboxes
                  </span>
                  <span className="text-xs font-mono text-[#06B6D4]">
                    {selectedTools.length} of {TECH_STACK_OPTIONS.length} active
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TECH_STACK_OPTIONS.map((tool) => {
                    const isChecked = selectedTools.includes(tool.id);
                    return (
                      <button
                        key={tool.id}
                        type="button"
                        onClick={() => toggleTool(tool.id)}
                        className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex items-start justify-between gap-3 ${
                          isChecked
                            ? 'bg-[#0A0E17] border-[#10B981] shadow-sm'
                            : 'bg-[#0A0E17]/50 border-[#1F2937] opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="text-xs sm:text-sm font-semibold text-[#F9FAFB]">
                            {tool.name}
                          </div>
                          <div className="text-[11px] text-[#9CA3AF]">
                            {tool.category}
                          </div>
                          <div className="text-[11px] font-mono text-[#F59E0B] pt-0.5">
                            Avg: {tool.avgGhostRate}
                          </div>
                        </div>

                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                            isChecked
                              ? 'bg-[#10B981] text-[#0A0E17]'
                              : 'border border-[#1F2937] bg-[#111827]'
                          }`}
                        >
                          {isChecked && <Check size={13} strokeWidth={3} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Dynamic Output Display Card */}
            <div className="lg:col-span-5 rounded-2xl bg-[#111827] border-2 border-[#10B981]/60 p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#1F2937] pb-4">
                <div>
                  <div className="text-xs font-mono text-[#06B6D4] uppercase">
                    Live Telemetry Projection
                  </div>
                  <div className="text-sm font-semibold text-[#F9FAFB]">
                    {employees.toLocaleString()} Employees • {selectedTools.length} Core Stacks
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-[#10B981]/15 text-[#10B981] font-mono text-xs font-bold">
                  24% Waste Benchmark
                </span>
              </div>

              {/* 1. Estimated Annual SaaS Spend */}
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-[#9CA3AF]">
                    Estimated Annual SaaS Spend
                  </div>
                  <div className="text-[11px] font-mono text-[#9CA3AF]/70">
                    ({employees} employees × $1,440/yr)
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-mono font-bold text-[#F9FAFB] tabular-nums">
                  ${calculation.estimatedAnnualSpend.toLocaleString()}
                </div>
              </div>

              {/* 2. Projected Wasted Budget (Highlighted in Emerald Green) */}
              <div className="p-4 rounded-xl bg-[#0A0E17] border border-[#10B981]/40 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#10B981] flex items-center gap-1.5">
                    <Sparkles size={13} />
                    Projected Wasted Budget (24%)
                  </span>
                  <span className="font-mono text-[#F59E0B]">
                    ${calculation.monthlyWaste.toLocaleString()}/mo
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-mono font-extrabold text-[#10B981] tabular-nums">
                  ${calculation.estimatedAnnualWaste.toLocaleString()}
                  <span className="text-sm font-normal text-[#9CA3AF]"> / year</span>
                </div>
              </div>

              {/* 3. Potential Fee-Free Net Savings (85% Kept by Client) */}
              <div className="space-y-2.5 pt-2 border-t border-[#1F2937] text-xs">
                <div className="flex items-center justify-between text-[#9CA3AF]">
                  <span>Upfront Audit &amp; Onboarding Fee</span>
                  <span className="font-mono font-bold text-[#F9FAFB]">$0</span>
                </div>
                <div className="flex items-center justify-between text-[#9CA3AF]">
                  <span>AuditPulse 15% Performance Fee (Only on Verified Savings)</span>
                  <span className="font-mono text-[#9CA3AF] tabular-nums">
                    -${calculation.auditPulseFee.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#1F2937] text-sm font-bold text-[#F9FAFB]">
                  <span>Net Reclaimed Cash (You Keep 85%)</span>
                  <span className="font-mono text-lg text-[#10B981] tabular-nums">
                    ${calculation.netClientSavings.toLocaleString()}/yr
                  </span>
                </div>
              </div>

              {/* Dynamic Conversion CTA Button */}
              <button
                type="button"
                onClick={handleLockSavingsAndScroll}
                style={{ backgroundColor: primaryColor || '#10B981' }}
                className="w-full py-4 px-5 rounded-xl bg-[#10B981] text-[#0A0E17] font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:opacity-95 transition cursor-pointer"
              >
                <span>
                  Reclaim ${calculation.estimatedAnnualWaste.toLocaleString()} Now
                </span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION F: INACTIVE APP & SEAT VISUAL BREAKDOWN (COMPARISON TABS)
         ===================================================================== */}
      <section
        id="auditpulse-breakdown"
        className="py-16 sm:py-20 px-4 sm:px-6 border-b border-[#1F2937]"
      >
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="text-xs font-mono font-semibold text-[#06B6D4] uppercase tracking-wider">
                Granular Seat-Level Telemetry
              </div>
              <h2
                className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F9FAFB]"
                style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
              >
                Inactive App &amp; Seat Visual Breakdown
              </h2>
              <p className="text-sm text-[#9CA3AF] max-w-2xl">
                Inspect real anonymized mid-market audit tables showing how unassigned quotas, duplicate apps, and departed staff silently drain EBITDA.
              </p>
            </div>

            {/* 3-Tab Switcher: Unassigned Licenses | Duplicate Apps | Inactive Employees */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#111827] border border-[#1F2937]">
              {(
                [
                  { id: 'unassigned', label: 'Unassigned Licenses', icon: Layers },
                  { id: 'duplicates', label: 'Duplicate Apps', icon: TrendingDown },
                  { id: 'inactive', label: 'Inactive Employees', icon: UserX },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold inline-flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#2563EB] text-[#F9FAFB] shadow-xs'
                        : 'text-[#9CA3AF] hover:text-[#F9FAFB]'
                    }`}
                  >
                    <Icon size={14} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Table Card */}
          <div className="rounded-2xl bg-[#111827] border border-[#1F2937] overflow-hidden shadow-xl">
            <div className="px-6 py-4 bg-[#0A0E17]/60 border-b border-[#1F2937] flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-sm font-bold text-[#F9FAFB]">
                  {currentTabInfo.label}
                </div>
                <div className="text-xs text-[#9CA3AF]">{currentTabInfo.subtitle}</div>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-mono text-[#9CA3AF]">
                  CATEGORY ANNUAL WASTE
                </div>
                <div className="text-lg font-mono font-bold text-[#10B981] tabular-nums">
                  {currentTabInfo.totalTabWaste}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#1F2937] text-[11px] font-mono uppercase text-[#9CA3AF] bg-[#0A0E17]/40">
                    <th className="py-3.5 px-6">App Name</th>
                    <th className="py-3.5 px-4">Total Seats</th>
                    <th className="py-3.5 px-4">Inactive (90 Days)</th>
                    <th className="py-3.5 px-4">Annual Waste ($)</th>
                    <th className="py-3.5 px-6 text-right">Audit Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1F2937] text-xs sm:text-sm">
                  {currentTabInfo.rows.map((row) => {
                    const isFlagged = flaggedRowApps.includes(row.appName);
                    return (
                      <tr
                        key={row.appName}
                        className="hover:bg-[#0A0E17]/50 transition"
                      >
                        <td className="py-4 px-6">
                          <div className="font-bold text-[#F9FAFB]">{row.appName}</div>
                          <div className="text-xs text-[#9CA3AF]">
                            {row.vendorTier}
                          </div>
                        </td>
                        <td className="py-4 px-4 font-mono tabular-nums text-[#F9FAFB]">
                          {row.totalSeats} Seats
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center gap-1.5 font-mono font-semibold text-[#F59E0B] tabular-nums">
                            <AlertTriangle size={13} />
                            {row.inactiveSeats} Inactive
                          </span>
                        </td>
                        <td className="py-4 px-4 font-mono font-bold text-[#10B981] tabular-nums">
                          ${row.annualWaste.toLocaleString()}/yr Waste
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              setFlaggedRowApps((prev) =>
                                prev.includes(row.appName)
                                  ? prev.filter((a) => a !== row.appName)
                                  : [...prev, row.appName]
                              )
                            }
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition cursor-pointer ${
                              isFlagged
                                ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40'
                                : 'bg-[#0A0E17] text-[#F9FAFB] border border-[#1F2937] hover:border-[#06B6D4]'
                            }`}
                          >
                            {isFlagged
                              ? '✓ Queued for Downgrade'
                              : 'Queue Downgrade'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
