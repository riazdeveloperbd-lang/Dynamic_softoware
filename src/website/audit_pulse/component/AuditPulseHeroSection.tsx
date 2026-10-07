import React, { useState } from 'react';
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Calculator,
  Calendar,
  Activity,
  Layers,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import {
  EditableText,
  EditableButton,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface AuditPulseHeroSectionProps {
  title: string;
  subtitle: string;
  variant: DoctorVariantId;
  primaryColor: string;
  isDark?: boolean;
}

interface StackScanScenario {
  id: string;
  label: string;
  employees: string;
  totalMonthlySpend: number;
  wastedMonthlySpend: number;
  wastePercent: number;
  annualReclaim: number;
  alerts: {
    app: string;
    detail: string;
    monthlyWaste: string;
    severity: 'amber' | 'cyan';
  }[];
}

const SCAN_SCENARIOS: Record<string, StackScanScenario> = {
  midmarket: {
    id: 'midmarket',
    label: '250-Seat Series B Stack',
    employees: '250 Employees',
    totalMonthlySpend: 54600,
    wastedMonthlySpend: 14200,
    wastePercent: 26,
    annualReclaim: 170400,
    alerts: [
      {
        app: 'Slack Enterprise Grid',
        detail: '14 Slack accounts inactive for 90+ days',
        monthlyWaste: '$3,920/mo',
        severity: 'amber',
      },
      {
        app: 'Salesforce Sales Cloud',
        detail: '19 unassigned Enterprise CRM seats',
        monthlyWaste: '$5,700/mo',
        severity: 'amber',
      },
      {
        app: 'Zoom Pro + Google Meet',
        detail: '46 duplicate video conferencing licenses',
        monthlyWaste: '$2,480/mo',
        severity: 'cyan',
      },
      {
        app: 'Jira + Asana Overlap',
        detail: '22 departed engineering & PM seats',
        monthlyWaste: '$2,100/mo',
        severity: 'amber',
      },
    ],
  },
  growth: {
    id: 'growth',
    label: '500-Seat Growth Corp',
    employees: '500 Employees',
    totalMonthlySpend: 108000,
    wastedMonthlySpend: 28900,
    wastePercent: 27,
    annualReclaim: 346800,
    alerts: [
      {
        app: 'Microsoft 365 E5',
        detail: '34 E5 licenses with zero Teams/PowerBI activity',
        monthlyWaste: '$8,160/mo',
        severity: 'amber',
      },
      {
        app: 'Slack + Teams Redundancy',
        detail: '62 overlapping department seats',
        monthlyWaste: '$7,440/mo',
        severity: 'cyan',
      },
      {
        app: 'Figma Organization',
        detail: '29 full-editor seats used strictly for view-only',
        monthlyWaste: '$6,850/mo',
        severity: 'amber',
      },
      {
        app: 'Notion + Confluence',
        detail: '48 abandoned workspace seats (90+ days)',
        monthlyWaste: '$6,450/mo',
        severity: 'amber',
      },
    ],
  },
  enterprise: {
    id: 'enterprise',
    label: '1,000-Seat Enterprise',
    employees: '1,000 Employees',
    totalMonthlySpend: 215000,
    wastedMonthlySpend: 56400,
    wastePercent: 26,
    annualReclaim: 676800,
    alerts: [
      {
        app: 'Salesforce Unlimited',
        detail: '54 ghost CRM seats from Q3 restructuring',
        monthlyWaste: '$18,900/mo',
        severity: 'amber',
      },
      {
        app: 'Google Workspace + M365',
        detail: '88 dual-provisioned SSO identities',
        monthlyWaste: '$14,080/mo',
        severity: 'cyan',
      },
      {
        app: 'Datadog & AWS Seat Add-ons',
        detail: '31 orphaned developer seats',
        monthlyWaste: '$13,220/mo',
        severity: 'amber',
      },
      {
        app: 'Zoom Webinar + Loom Business',
        detail: '74 zero-login video licenses (120+ days)',
        monthlyWaste: '$10,200/mo',
        severity: 'amber',
      },
    ],
  },
};

export const AuditPulseHeroSection: React.FC<AuditPulseHeroSectionProps> = ({
  title,
  subtitle,
  variant = 'varient_1',
  primaryColor = '#10B981',
}) => {
  const [scenarioKey, setScenarioKey] = useState<string>('midmarket');
  const [reclaimedIds, setReclaimedIds] = useState<string[]>([]);
  const [activeVariantOverride, setActiveVariantOverride] = useState<DoctorVariantId | null>(
    null
  );

  const effectiveVariant: DoctorVariantId = activeVariantOverride || variant;
  const currentScenario = SCAN_SCENARIOS[scenarioKey] || SCAN_SCENARIOS.midmarket;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleReclaimItem = (appTitle: string) => {
    setReclaimedIds((prev) =>
      prev.includes(appTitle)
        ? prev.filter((item) => item !== appTitle)
        : [...prev, appTitle]
    );
  };

  // Reusable Primary & Secondary CTA Buttons
  const renderHeroCtas = (centered = false) => (
    <div
      className={`flex flex-wrap items-center gap-3.5 pt-2 ${
        centered ? 'justify-center' : ''
      }`}
    >
      <EditableButton
        id="auditpulse_hero_cta_primary"
        defaultText="Calculate Your Waste"
        defaultLinkUrl="#auditpulse-estimator"
        iconLeft={<Calculator size={16} />}
        iconRight={<ArrowRight size={15} />}
        onClickFallback={() => scrollToSection('auditpulse-estimator')}
        style={{
          backgroundColor: primaryColor || '#10B981',
          color: '#0A0E17',
        }}
        className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-[#10B981] text-[#0A0E17] inline-flex items-center gap-2 shadow-lg hover:opacity-95 transition whitespace-nowrap cursor-pointer"
      />

      <button
        type="button"
        onClick={() => scrollToSection('auditpulse-booking')}
        className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#111827] hover:bg-[#1F2937] text-[#F9FAFB] border border-[#1F2937] inline-flex items-center gap-2 transition whitespace-nowrap cursor-pointer"
      >
        <Calendar size={15} className="text-[#06B6D4]" />
        <span>Book 15-Min Demo</span>
      </button>
    </div>
  );

  // Reusable Live Interactive Mock SaaS Telemetry Dashboard
  const renderLiveAuditMockDashboard = () => (
    <div className="rounded-2xl bg-[#111827] border border-[#1F2937] p-5 sm:p-6 shadow-2xl space-y-5 text-left">
      {/* Top Telemetry Bar + Scenario Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1F2937]">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-xs font-mono font-semibold text-[#F9FAFB] uppercase tracking-wider">
            Live OAuth License Telemetry
          </span>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-lg bg-[#0A0E17] border border-[#1F2937]">
          {Object.values(SCAN_SCENARIOS).map((sc) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => {
                setScenarioKey(sc.id);
                setReclaimedIds([]);
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold transition cursor-pointer whitespace-nowrap ${
                scenarioKey === sc.id
                  ? 'bg-[#2563EB] text-[#F9FAFB]'
                  : 'text-[#9CA3AF] hover:text-[#F9FAFB]'
              }`}
            >
              {sc.employees}
            </button>
          ))}
        </div>
      </div>

      {/* Total Monthly Spend vs. Wasted Spend Gauge */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-[#0A0E17] rounded-xl p-4 border border-[#1F2937]">
        <div className="sm:col-span-7 space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-[#9CA3AF]">Total Monthly SaaS Spend</span>
            <span className="text-sm font-mono font-semibold text-[#F9FAFB] tabular-nums">
              ${currentScenario.totalMonthlySpend.toLocaleString()}/mo
            </span>
          </div>

          {/* Segmented Spend vs. Waste Bar */}
          <div className="w-full h-3 rounded-full bg-[#1F2937] overflow-hidden flex">
            <div
              className="h-full bg-[#2563EB] transition-all duration-500"
              style={{ width: `${100 - currentScenario.wastePercent}%` }}
              title="Active Utilized Licenses"
            />
            <div
              className="h-full bg-[#F59E0B] transition-all duration-500"
              style={{ width: `${currentScenario.wastePercent}%` }}
              title="Flagged Ghost & Duplicate Waste"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-[#9CA3AF]">
              ■ Active Stack ({100 - currentScenario.wastePercent}%)
            </span>
            <span className="text-[#F59E0B] font-semibold">
              ■ Flagged Waste ({currentScenario.wastePercent}%)
            </span>
          </div>
        </div>

        {/* Highlighted Monthly Waste Readout Box */}
        <div className="sm:col-span-5 rounded-xl bg-[#111827] border border-[#F59E0B]/40 p-3.5 text-right space-y-1">
          <div className="flex items-center justify-end gap-1.5 text-[11px] font-mono text-[#F59E0B]">
            <AlertTriangle size={12} />
            <span>WASTE FLAGGED</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-[#10B981]">
            ${currentScenario.wastedMonthlySpend.toLocaleString()}
            <span className="text-xs font-normal text-[#9CA3AF]">/mo</span>
          </div>
          <div className="text-[11px] font-mono text-[#9CA3AF]">
            ${currentScenario.annualReclaim.toLocaleString()}/yr Reclaimable
          </div>
        </div>
      </div>

      {/* Inactive User Notification Rows (Interactive One-Click Reclaim Demo) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
          <span>Flagged Ghost Licenses &amp; Duplicate Subscriptions</span>
          <span className="font-mono text-[11px] text-[#06B6D4]">
            Click row to simulate auto-reclaim
          </span>
        </div>

        <div className="space-y-2">
          {currentScenario.alerts.map((alert) => {
            const isReclaimed = reclaimedIds.includes(alert.app);
            return (
              <div
                key={alert.app}
                onClick={() => toggleReclaimItem(alert.app)}
                className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                  isReclaimed
                    ? 'bg-[#10B981]/10 border-[#10B981]/50'
                    : 'bg-[#0A0E17] border-[#1F2937] hover:border-[#2563EB]/60'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
                      isReclaimed
                        ? 'bg-[#10B981]'
                        : alert.severity === 'amber'
                        ? 'bg-[#F59E0B]'
                        : 'bg-[#06B6D4]'
                    }`}
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-[#F9FAFB] flex items-center gap-2">
                      <span className="truncate">{alert.app}</span>
                      {isReclaimed && (
                        <span className="text-[10px] font-mono text-[#10B981] inline-flex items-center gap-1">
                          <CheckCircle2 size={11} /> Reclaimed
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#9CA3AF] truncate">{alert.detail}</div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div
                    className={`text-xs font-mono font-bold tabular-nums ${
                      isReclaimed ? 'text-[#10B981] line-through' : 'text-[#F59E0B]'
                    }`}
                  >
                    {alert.monthlyWaste}
                  </div>
                  <div className="text-[10px] font-mono text-[#9CA3AF]">
                    {isReclaimed ? 'Saved' : 'Unused'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Telemetry Status */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#9CA3AF]">
        <span className="inline-flex items-center gap-1.5">
          <RefreshCw size={11} className="text-[#06B6D4]" />
          Synced: Google Workspace, M365, Okta, Slack, Zoom
        </span>
        <span className="text-[#10B981] font-semibold">
          Audit Time: 18 hrs 42 mins
        </span>
      </div>
    </div>
  );

  return (
    <section
      id="auditpulse-hero"
      className="relative overflow-hidden bg-[#0A0E17] text-[#F9FAFB] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 border-b border-[#1F2937]"
    >
      {/* Subtle Ambient Telemetry Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(31, 41, 55, 0.55) 1px, transparent 1px), linear-gradient(to bottom, rgba(31, 41, 55, 0.55) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-7xl mx-auto space-y-12">
        {/* 3-Variant Hero Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1F2937]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#9CA3AF]">
            <Layers size={14} className="text-[#10B981]" />
            <span>HERO TELEMETRY LAYOUT</span>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#111827] border border-[#1F2937]">
            {(
              [
                { id: 'varient_1', label: 'Variant 1 · Split Telemetry Console' },
                { id: 'varient_2', label: 'Variant 2 · Executive Command Center' },
                { id: 'varient_3', label: 'Variant 3 · CFO Bento Audit Matrix' },
              ] as { id: DoctorVariantId; label: string }[]
            ).map((v) => {
              const active = effectiveVariant === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setActiveVariantOverride(v.id)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-semibold transition cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#10B981] text-[#0A0E17]'
                      : 'text-[#9CA3AF] hover:text-[#F9FAFB]'
                  }`}
                >
                  {v.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ===================================================================
            VARIANT 1: SPLIT TELEMETRY CONSOLE (Default Blueprint Hero)
           =================================================================== */}
        {effectiveVariant === 'varient_1' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: High-Trust Proposition & CTAs */}
            <div className="lg:col-span-6 space-y-6">
              {/* Risk-Free Performance Callout */}
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#10B981] tracking-wide">
                <Activity size={14} className="text-[#10B981]" />
                <span>100% RISK-FREE: WE ONLY GET PAID IF WE SAVE YOU MONEY</span>
              </div>

              <EditableText
                id="auditpulse_hero_headline"
                defaultText={
                  title || 'Stop Paying for Ghost SaaS Licenses & Unused Seats.'
                }
                as="h1"
                className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight leading-[1.08] text-[#F9FAFB]"
                style={{
                  fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                  textWrap: 'balance',
                }}
              />

              <EditableText
                id="auditpulse_hero_subheadline"
                defaultText={
                  subtitle ||
                  'AuditPulse scans your Google Workspace, Microsoft 365, Slack, and Zoom stacks to uncover inactive seats and duplicate subscriptions in under 24 hours.'
                }
                as="p"
                className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed max-w-xl"
              />

              {renderHeroCtas(false)}

              {/* Proof Bar Ticker */}
              <div className="pt-6 border-t border-[#1F2937] space-y-3">
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-[#F9FAFB]">
                  <span className="text-[#10B981] font-bold">
                    $18.4M+ Recovered for Mid-Market Finance Teams
                  </span>
                  <span className="text-[#1F2937]">•</span>
                  <span>0% Upfront Cost</span>
                  <span className="text-[#1F2937]">•</span>
                  <span className="text-[#06B6D4] font-semibold">
                    Average 26% SaaS Spend Reduction
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Mock Dashboard */}
            <div className="lg:col-span-6">{renderLiveAuditMockDashboard()}</div>
          </div>
        )}

        {/* ===================================================================
            VARIANT 2: EXECUTIVE COMMAND CENTER (Centered High-Impact Layout)
           =================================================================== */}
        {effectiveVariant === 'varient_2' && (
          <div className="space-y-10">
            <div className="max-w-3xl mx-auto text-center space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#10B981]">
                <ShieldCheck size={14} />
                <span>100% RISK-FREE: WE ONLY GET PAID IF WE SAVE YOU MONEY</span>
              </div>

              <EditableText
                id="auditpulse_hero_headline"
                defaultText={
                  title || 'Stop Paying for Ghost SaaS Licenses & Unused Seats.'
                }
                as="h1"
                className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.06] text-[#F9FAFB]"
                style={{
                  fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                  textWrap: 'balance',
                }}
              />

              <EditableText
                id="auditpulse_hero_subheadline"
                defaultText={
                  subtitle ||
                  'AuditPulse scans your Google Workspace, Microsoft 365, Slack, and Zoom stacks to uncover inactive seats and duplicate subscriptions in under 24 hours.'
                }
                as="p"
                className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed max-w-2xl mx-auto"
              />

              {renderHeroCtas(true)}
            </div>

            <div className="max-w-5xl mx-auto">{renderLiveAuditMockDashboard()}</div>
          </div>
        )}

        {/* ===================================================================
            VARIANT 3: CFO BENTO AUDIT MATRIX
           =================================================================== */}
        {effectiveVariant === 'varient_3' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7 rounded-2xl bg-[#111827] border border-[#1F2937] p-7 sm:p-10 flex flex-col justify-between space-y-8">
              <div className="space-y-5">
                <div className="text-xs font-mono font-semibold text-[#10B981]">
                  100% RISK-FREE PERFORMANCE MODEL • 24-HOUR STACK AUDIT
                </div>

                <EditableText
                  id="auditpulse_hero_headline"
                  defaultText={
                    title || 'Stop Paying for Ghost SaaS Licenses & Unused Seats.'
                  }
                  as="h1"
                  className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.08] text-[#F9FAFB]"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                    textWrap: 'balance',
                  }}
                />

                <EditableText
                  id="auditpulse_hero_subheadline"
                  defaultText={
                    subtitle ||
                    'AuditPulse scans your Google Workspace, Microsoft 365, Slack, and Zoom stacks to uncover inactive seats and duplicate subscriptions in under 24 hours.'
                  }
                  as="p"
                  className="text-base text-[#9CA3AF] leading-relaxed"
                />

                {renderHeroCtas(false)}
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#1F2937]">
                <div>
                  <div className="text-2xl font-mono font-bold text-[#10B981] tabular-nums">
                    $18.4M+
                  </div>
                  <div className="text-xs text-[#9CA3AF] mt-0.5">
                    Recovered for Finance Teams
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-mono font-bold text-[#F9FAFB] tabular-nums">
                    $0
                  </div>
                  <div className="text-xs text-[#9CA3AF] mt-0.5">
                    Upfront Retainer Cost
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-mono font-bold text-[#06B6D4] tabular-nums">
                    26.4%
                  </div>
                  <div className="text-xs text-[#9CA3AF] mt-0.5">
                    Avg. SaaS Spend Reduction
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">{renderLiveAuditMockDashboard()}</div>
          </div>
        )}
      </div>
    </section>
  );
};
