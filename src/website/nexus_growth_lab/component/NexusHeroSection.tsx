import React, { useState } from 'react';
import { ArrowRight, Calculator, TrendingUp, CheckCircle2 } from 'lucide-react';
import {
  EditableText,
  EditableButton,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface NexusHeroSectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

const TIMEFRAMES = [
  {
    id: '90d',
    label: 'Last 90 Days',
    pipelineM: '$18.4M',
    roas: '4.6x',
    sqlCount: '412 SQLs',
    cacDelta: '-34% CAC',
    curvePoints: '0,120 70,104 140,88 210,72 280,46 350,24 420,12',
  },
  {
    id: '6m',
    label: '6-Month Cohort',
    pipelineM: '$36.8M',
    roas: '4.9x',
    sqlCount: '890 SQLs',
    cacDelta: '-38% CAC',
    curvePoints: '0,125 70,110 140,92 210,64 280,40 350,20 420,8',
  },
  {
    id: '12m',
    label: 'Annual Enterprise',
    pipelineM: '$142.6M',
    roas: '5.2x',
    sqlCount: '3,140 SQLs',
    cacDelta: '-41% CAC',
    curvePoints: '0,130 70,112 140,86 210,58 280,32 350,15 420,6',
  },
];

const LIVE_CONVERSION_EVENTS = [
  {
    account: 'CloudScale AI (Series B)',
    channel: 'ABM LinkedIn + Intent',
    acv: '$84,000 ACV',
    stage: 'Demo Completed · SQL Verified',
  },
  {
    account: 'Vanguard Zero-Trust Security',
    channel: 'High-Intent Search Capture',
    acv: '$140,000 ACV',
    stage: 'Technical Evaluation Locked',
  },
  {
    account: 'Aether Data Mesh Corp',
    channel: 'Executive Direct Outbound',
    acv: '$62,500 ACV',
    stage: 'Discovery Call Scheduled',
  },
];

export const NexusHeroSection: React.FC<NexusHeroSectionProps> = ({
  title = 'Predictable B2B Pipeline Growth. Powered by Data Science.',
  subtitle = 'We engineer full-funnel demand generation engines that turn ad spend into qualified sales pipeline for B2B tech companies.',
  variant = 'varient_1',
  primaryColor = '#2563EB',
}) => {
  const [activeTimeframeId, setActiveTimeframeId] = useState<string>('90d');
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({
    rx: 4,
    ry: -6,
  });

  const activeTimeframe =
    TIMEFRAMES.find((t) => t.id === activeTimeframeId) || TIMEFRAMES[0];

  const scrollToSection = (href: string) => {
    if (typeof document !== 'undefined') {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: Number((-y * 10).toFixed(2)),
      ry: Number((x * 12).toFixed(2)),
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 4, ry: -6 });
  };

  return (
    <section
      id="nexus-hero"
      className="relative overflow-hidden bg-[#0B0F17] text-[#F9FAFB] py-16 sm:py-24 px-6 border-b border-[#1F2937]"
    >
      {/* Subtle Ambient Radial Glow */}
      <div
        className="pointer-events-none absolute -top-28 right-1/4 w-[520px] h-[520px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, #2563EB 0%, #7C3AED 55%, transparent 75%)',
        }}
      />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div
          className={`grid grid-cols-1 ${
            variant === 'varient_2'
              ? 'lg:grid-cols-12 gap-10 items-center'
              : 'lg:grid-cols-12 gap-12 items-center'
          }`}
        >
          {/* Left 6 Columns: Availability Indicator, Headline, Sub-headline & Dual CTAs */}
          <div
            className={`${
              variant === 'varient_3' ? 'lg:col-span-6 lg:order-2' : 'lg:col-span-6'
            } space-y-6`}
          >
            {/* Unboxed Live System Status Indicator (Accepting Q4 Enterprise Clients) */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-medium text-[#9CA3AF]">
              <span className="inline-flex items-center gap-2 text-[#10B981] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <EditableText
                  id="nexus_status_indicator"
                  defaultText="Accepting Q4 Enterprise Clients"
                />
              </span>
              <span aria-hidden="true">·</span>
              <EditableText
                id="nexus_status_sub"
                defaultText="B2B SaaS, AI & Enterprise Tech"
              />
            </div>

            {/* Bold Geometric Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-[54px] font-semibold tracking-tight leading-[1.08] text-[#F9FAFB] max-w-xl"
              style={{
                fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif",
                textWrap: 'balance',
              }}
            >
              <EditableText id="nexus_hero_headline" defaultText={title} />
            </h1>

            {/* Sub-headline */}
            <EditableText
              id="nexus_hero_subheadline"
              as="p"
              defaultText={subtitle}
              className="text-base sm:text-lg text-[#9CA3AF] leading-relaxed max-w-xl block"
            />

            {/* Primary CTA ("Get Your Free Growth Audit") & Secondary CTA ("Calculate Estimated ROI") */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <EditableButton
                id="nexus_hero_primary_cta"
                defaultText="Get Your Free Growth Audit"
                defaultLinkUrl="#nexus-audit-booking"
                iconRight={<ArrowRight size={16} />}
                onClick={() => scrollToSection('#nexus-audit-booking')}
                className="px-6 py-3.5 rounded-xl text-sm font-semibold text-[#F9FAFB] whitespace-nowrap shrink-0 inline-flex items-center gap-2 transition-transform hover:-translate-y-0.5 cursor-pointer shadow-lg"
                style={{ backgroundColor: primaryColor }}
              />

              <button
                type="button"
                onClick={() => scrollToSection('#nexus-roi-calculator')}
                className="px-6 py-3.5 rounded-xl text-sm font-semibold text-[#F9FAFB] bg-[#111827] hover:bg-[#1F2937] border border-[#1F2937] whitespace-nowrap shrink-0 inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Calculator size={15} className="text-[#10B981]" />
                <EditableText
                  id="nexus_hero_secondary_cta"
                  defaultText="Calculate Estimated ROI"
                />
              </button>
            </div>

            {/* Key Metric Banner (Unboxed Clean Typography with Bullet Separators) */}
            <div className="pt-6 border-t border-[#1F2937] flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm">
              <span className="font-mono font-semibold text-[#10B981] tabular-nums">
                $140M+ Pipeline Generated
              </span>
              <span aria-hidden="true" className="text-[#9CA3AF]/50">
                •
              </span>
              <span className="font-mono font-semibold text-[#F9FAFB] tabular-nums">
                4.2x Avg. ROAS
              </span>
              <span aria-hidden="true" className="text-[#9CA3AF]/50">
                •
              </span>
              <span className="font-mono font-semibold text-[#10B981] tabular-nums">
                32% Lower CAC
              </span>
            </div>
          </div>

          {/* Right 6 Columns: Interactive 3D-Styled Glassmorphism Pipeline Velocity Dashboard */}
          <div
            className={`${
              variant === 'varient_3' ? 'lg:col-span-6 lg:order-1' : 'lg:col-span-6'
            }`}
            style={{ perspective: '1200px' }}
          >
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transition: 'transform 160ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="rounded-3xl p-6 sm:p-7 bg-[#111827]/90 backdrop-blur-xl border border-[#1F2937] shadow-2xl space-y-6"
            >
              {/* Dashboard Header + Cohort Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1F2937]">
                <div>
                  <div className="text-xs font-mono text-[#9CA3AF]">
                    Attribution &amp; Pipeline Velocity Engine
                  </div>
                  <div className="text-lg font-semibold text-[#F9FAFB] mt-0.5 flex items-center gap-2">
                    <span>Verified Enterprise Cohort</span>
                    <TrendingUp size={16} className="text-[#10B981]" />
                  </div>
                </div>

                {/* Interactive Cohort Filter Buttons */}
                <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#0B0F17] border border-[#1F2937]">
                  {TIMEFRAMES.map((tf) => {
                    const active = tf.id === activeTimeframeId;
                    return (
                      <button
                        key={tf.id}
                        type="button"
                        onClick={() => setActiveTimeframeId(tf.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                          active
                            ? 'bg-[#2563EB] text-[#F9FAFB]'
                            : 'text-[#9CA3AF] hover:text-[#F9FAFB]'
                        }`}
                      >
                        {tf.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3 Primary Telemetry Readouts (Tabular Numerals) */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#0B0F17] border border-[#1F2937]">
                  <div className="text-xs text-[#9CA3AF]">Pipeline Velocity</div>
                  <div className="text-xl sm:text-2xl font-mono font-semibold text-[#10B981] tabular-nums mt-1">
                    {activeTimeframe.pipelineM}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-[#0B0F17] border border-[#1F2937]">
                  <div className="text-xs text-[#9CA3AF]">Verified ROAS</div>
                  <div className="text-xl sm:text-2xl font-mono font-semibold text-[#F9FAFB] tabular-nums mt-1">
                    {activeTimeframe.roas}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-[#0B0F17] border border-[#1F2937]">
                  <div className="text-xs text-[#9CA3AF]">Qualified SQLs</div>
                  <div className="text-xl sm:text-2xl font-mono font-semibold text-[#10B981] tabular-nums mt-1">
                    {activeTimeframe.sqlCount}
                  </div>
                </div>
              </div>

              {/* Animated Vector Campaign Performance Graph */}
              <div className="p-4 rounded-2xl bg-[#0B0F17] border border-[#1F2937] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#9CA3AF] font-medium">
                    Cumulative Pipeline Growth vs. Ad Spend Baseline
                  </span>
                  <span className="font-mono font-semibold text-[#10B981] tabular-nums">
                    {activeTimeframe.cacDelta}
                  </span>
                </div>

                <svg
                  viewBox="0 0 420 140"
                  className="w-full h-36 overflow-visible"
                >
                  <defs>
                    <linearGradient
                      id="nexusEmeraldArea"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.32" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid Lines */}
                  {[25, 60, 95, 130].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="420"
                      y2={y}
                      stroke="#1F2937"
                      strokeDasharray="3 3"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Baseline Unoptimized Curve */}
                  <polyline
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    points="0,122 70,118 140,115 210,110 280,108 350,104 420,100"
                    opacity="0.7"
                  />

                  {/* Glowing Emerald ROI Scale Area & Curve */}
                  <polygon
                    fill="url(#nexusEmeraldArea)"
                    points={`0,135 ${activeTimeframe.curvePoints} 420,135`}
                  />
                  <polyline
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={activeTimeframe.curvePoints}
                  />
                </svg>

                <div className="flex items-center justify-between text-[11px] font-mono text-[#9CA3AF]">
                  <span>Month 1</span>
                  <span>Month 2</span>
                  <span>Month 3</span>
                  <span>Month 4</span>
                  <span>Month 5</span>
                  <span>Month 6</span>
                </div>
              </div>

              {/* Real-Time Qualified Conversion Feed */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-[#9CA3AF] flex items-center justify-between">
                  <span>Recent CRM Pipeline Conversions</span>
                  <span className="text-[#10B981]">Salesforce + HubSpot Sync</span>
                </div>
                <div className="divide-y divide-[#1F2937] rounded-2xl border border-[#1F2937] bg-[#0B0F17] px-4">
                  {LIVE_CONVERSION_EVENTS.map((ev) => (
                    <div
                      key={ev.account}
                      className="py-2.5 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="min-w-0">
                        <div className="font-semibold text-[#F9FAFB] truncate">
                          {ev.account}
                        </div>
                        <div className="text-[#9CA3AF] text-[11px] truncate">
                          {ev.channel} · {ev.stage}
                        </div>
                      </div>
                      <span className="font-mono font-semibold text-[#10B981] tabular-nums shrink-0 inline-flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        <span>{ev.acv}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Proof Bar */}
        <div className="pt-10 border-t border-[#1F2937] flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-xs font-mono text-[#9CA3AF]">
            Trusted by Revenue Teams at Category-Defining B2B Tech Leaders
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-semibold tracking-wider text-[#9CA3AF]">
            <span>CLOUDSCALE AI</span>
            <span aria-hidden="true" className="text-[#1F2937]">
              ·
            </span>
            <span>VANGUARD SEC</span>
            <span aria-hidden="true" className="text-[#1F2937]">
              ·
            </span>
            <span>AETHER DATA</span>
            <span aria-hidden="true" className="text-[#1F2937]">
              ·
            </span>
            <span>KINETIC FINTECH</span>
            <span aria-hidden="true" className="text-[#1F2937]">
              ·
            </span>
            <span>SYNAPSE CLOUD</span>
          </div>
        </div>
      </div>
    </section>
  );
};
