import React, { useState, useRef } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  TrendingUp,
  TrendingDown,
  SlidersHorizontal,
  ArrowLeftRight,
  Server,
  Eye,
  X,
  ArrowRight,
  DollarSign,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface InboxShieldPainSliderSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

interface ComparisonPillarItem {
  id: string;
  dimension: string;
  diyTitle: string;
  diyDesc: string;
  diyMetric: string;
  shieldTitle: string;
  shieldDesc: string;
  shieldMetric: string;
  architectureDeepDive: string;
}

const PAIN_VS_SOLUTION_PILLARS: ComparisonPillarItem[] = [
  {
    id: 'pillar_dns',
    dimension: '01. DNS Authentication & Cryptographic Alignment',
    diyTitle: 'Unaligned SPF & Default p=none DMARC',
    diyDesc:
      'Copy-pasted registrar records with >10 DNS lookups (PermError), 1024-bit shared keys, and zero DMARC enforcement.',
    diyMetric: '65% Flagged by Gmail / Defender',
    shieldTitle: '100% Strict SPF, 2048-Bit DKIM & DMARC p=reject',
    shieldDesc:
      'Flattened SPF macros (<3 lookups), custom 2048-bit RSA selectors, and strict p=reject enforcement with 24/7 RUA telemetry.',
    shieldMetric: '99.8% Cryptographic Pass Rate',
    architectureDeepDive:
      'InboxShield provisions automated DNS flattening so your SPF record never exceeds RFC 7208 lookup limits, paired with dual-selector 2048-bit DKIM rotation every 90 days.',
  },
  {
    id: 'pillar_isolation',
    dimension: '02. Domain Architecture & Root Workspace Safety',
    diyTitle: 'Sending Cold Outreach from Primary Corporate Domain',
    diyDesc:
      'SDRs blast cold sequences from @company.com—one spam complaint wave burns executive, legal, and billing emails.',
    diyMetric: 'High Risk of Root Domain Blacklisting',
    shieldTitle: 'Air-Gapped Secondary Lookalike Domain Cluster',
    shieldDesc:
      '5 to 30 isolated secondary domains (e.g., trycompany.com, getcompany.io) with 301 root redirects and independent Workspace tenants.',
    shieldMetric: '0% Risk to Primary Corporate Domain',
    architectureDeepDive:
      'We build a dedicated sending perimeter using aged/warmed lookalike domains capped at 35 cold emails per inbox/day, completely insulating your primary domain.',
  },
  {
    id: 'pillar_tracking',
    dimension: '03. Open/Click Tracking & Warmup Pool Quality',
    diyTitle: 'Shared ESP Tracking Links & Cold Sends on Day 1',
    diyDesc:
      'Default ESP tracking links share a single domain with thousands of spammers, triggering immediate link-reputation blocks.',
    diyMetric: '12%–14.2% Average Open Rate',
    shieldTitle: 'Custom SSL Tracking CNAMEs & 14-Day AI Warmup',
    shieldDesc:
      'Dedicated SSL-backed custom tracking subdomains paired with peer-to-peer B2B inbox warmup simulating human replies and stars.',
    shieldMetric: '58%–61.8% Verified Open Rate',
    architectureDeepDive:
      'Every secondary domain gets its own SSL-encrypted CNAME tracking endpoint and a 14-day programmatic warmup ramp before a single prospect email is dispatched.',
  },
  {
    id: 'pillar_monitoring',
    dimension: '04. Blacklist Defense & Sales Team Productivity',
    diyTitle: 'Reactive Firefighting & Wasted Sales Rep Hours',
    diyDesc:
      'Reps discover domains are burned weeks after reply rates tank to 0.8%, losing $40k+ in quarterly pipeline.',
    diyMetric: '10+ Hrs/Wk Wasted on Tech Ops',
    shieldTitle: 'Proactive 24/7 RBL Delisting & Auto-Rotation',
    shieldDesc:
      'Continuous polling across 50+ blacklists (Spamhaus, Barracuda, SORBS) with automated standby domain swap if reputation dips.',
    shieldMetric: 'Zero SDR Downtime · 8.4% Reply Rate',
    architectureDeepDive:
      'Our telemetry daemon runs inbox placement seed tests across Google Workspace, Office 365, Mimecast, and Proofpoint every 6 hours, auto-rotating inboxes before deliverability drops.',
  },
];

export const InboxShieldPainSliderSection: React.FC<
  InboxShieldPainSliderSectionProps
> = ({ title, subtitle, primaryColor }) => {
  // Slider position: 0 = Full "Before InboxShield" view, 100 = Full "After InboxShield" Optimization
  const [sliderPercent, setSliderPercent] = useState<number>(62);
  const [monthlySendVolume, setMonthlySendVolume] = useState<number>(50000);
  const [activePillarModal, setActivePillarModal] =
    useState<ComparisonPillarItem | null>(null);
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const emeraldColor = primaryColor || '#10B981';

  const updateSliderFromClientX = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const rawPct = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(4, Math.min(96, Math.round(rawPct)));
    setSliderPercent(clamped);
  };

  // Dynamic ROI & Pipeline Calculations based on Slider Position (0% to 100%)
  const optimizationRatio = sliderPercent / 100;
  const interpolatedOpenRate = (14.2 + (61.8 - 14.2) * optimizationRatio).toFixed(1);
  const interpolatedReplyRate = (1.1 + (8.4 - 1.1) * optimizationRatio).toFixed(1);
  const interpolatedSpamRate = (58.4 - (58.4 - 0.8) * optimizationRatio).toFixed(1);

  const baselineMeetingsPerMonth = Math.round((monthlySendVolume * 0.011) * 0.15);
  const currentMeetingsPerMonth = Math.round(
    (monthlySendVolume * (parseFloat(interpolatedReplyRate) / 100)) * 0.18
  );
  const recoveredPipelineUsd =
    Math.max(0, currentMeetingsPerMonth - baselineMeetingsPerMonth) * 3200;
  const lostPipelineUsd =
    Math.round((1 - optimizationRatio) * (monthlySendVolume / 1000) * 1450);

  return (
    <section
      id="inboxshield-pain-solution"
      className="py-16 sm:py-24 bg-[#0B1120] text-[#F8FAFC] border-b border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20">
        {/* ===================================================================== */}
        {/* PART 1: PAIN VS. SOLUTION SIDE-BY-SIDE COMPARISON GRID                */}
        {/* ===================================================================== */}
        <div className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              ARCHITECTURAL COMPARISON · DIY OUTBOUND VS. INBOXSHIELD STUDIO
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              <EditableText
                id="inboxshield_pain_vs_solution_title"
                defaultText={
                  title ||
                  'Why 65% of B2B Cold Emails Land in Spam — And How We Engineer 98% Primary Inbox Placement'
                }
              />
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              <EditableText
                id="inboxshield_pain_vs_solution_subtitle"
                defaultText={
                  subtitle ||
                  'Stop letting sales reps guess DNS records. Compare an unoptimized DIY outbound setup against the productized InboxShield infrastructure method. Click any row for full technical specifications.'
                }
              />
            </p>
          </div>

          {/* Column Headers */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-6 px-6 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-mono font-extrabold uppercase tracking-wider">
            <div className="lg:col-span-6 text-rose-400 flex items-center gap-2">
              <XCircle size={15} />
              <span>Doing It Yourself / Unoptimized Setup</span>
            </div>
            <div className="lg:col-span-6 text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={15} />
              <span>The InboxShield Method (Managed Infrastructure)</span>
            </div>
          </div>

          {/* 4 Side-by-Side Comparison Rows — Clickable for Full Architecture Modal */}
          <div className="space-y-4">
            {PAIN_VS_SOLUTION_PILLARS.map((item) => (
              <div
                key={item.id}
                onClick={() => setActivePillarModal(item)}
                className="group rounded-3xl bg-[#0F172A] border border-slate-800 hover:border-emerald-500/50 transition-all overflow-hidden cursor-pointer"
              >
                <div className="px-5 sm:px-6 py-2.5 bg-slate-900/70 border-b border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-slate-300">{item.dimension}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-emerald-400">
                    <Eye size={12} />
                    <span>View Architecture Spec</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
                  {/* Left: Doing It Yourself / Unoptimized */}
                  <div className="lg:col-span-6 p-5 sm:p-6 bg-rose-950/10 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold uppercase text-rose-400 flex items-center gap-1.5">
                        <XCircle size={14} className="shrink-0" />
                        <span>Unoptimized DIY Setup</span>
                      </span>
                      <span className="text-[11px] font-mono font-bold text-rose-400">
                        {item.diyMetric}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-[#F8FAFC]">
                      {item.diyTitle}
                    </h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      {item.diyDesc}
                    </p>
                  </div>

                  {/* Right: The InboxShield Method */}
                  <div className="lg:col-span-6 p-5 sm:p-6 bg-emerald-950/10 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold uppercase text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="shrink-0" />
                        <span>The InboxShield Method</span>
                      </span>
                      <span className="text-[11px] font-mono font-bold text-emerald-400">
                        {item.shieldMetric}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-[#F8FAFC]">
                      {item.shieldTitle}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.shieldDesc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* PART 2: INTERACTIVE BEFORE / AFTER DELIVERABILITY SLIDER WIDGET       */}
        {/* ===================================================================== */}
        <div id="inboxshield-slider" className="space-y-8 pt-4">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                <SlidersHorizontal size={14} />
                <span>INTERACTIVE BEFORE / AFTER DELIVERABILITY TELEMETRY</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Drag the Slider: Compare Default Outbound vs. InboxShield Infrastructure
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8]">
                Drag the vertical handle across the analytics dashboard to inspect real B2B cold outreach telemetry before and after deploying InboxShield.
              </p>
            </div>

            {/* Quick Slider Position Presets */}
            <div className="flex items-center gap-2 self-start lg:self-auto">
              {[
                { label: 'Before (14.2% Open)', val: 15 },
                { label: '50/50 Split Comparison', val: 50 },
                { label: 'After InboxShield (61.8% Open)', val: 88 },
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setSliderPercent(preset.val)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition cursor-pointer ${
                    Math.abs(sliderPercent - preset.val) < 10
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Split-Screen Dashboard Canvas */}
          <div
            ref={sliderContainerRef}
            onMouseMove={(e) => {
              if (isDragging) updateSliderFromClientX(e.clientX);
            }}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchMove={(e) => {
              if (e.touches[0]) updateSliderFromClientX(e.touches[0].clientX);
            }}
            className="relative rounded-3xl border border-slate-800 bg-[#0F172A] shadow-2xl overflow-hidden select-none"
          >
            {/* Top Corner Labels Bar */}
            <div className="px-4 sm:px-6 py-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-2 text-xs font-mono font-bold z-20 relative">
              <span className="text-rose-400 flex items-center gap-1.5">
                <ShieldAlert size={14} />
                <span>Before InboxShield (Default Setup)</span>
              </span>
              <span className="text-slate-400 hidden sm:inline">
                Drag Handle ({sliderPercent}% Optimized)
              </span>
              <span className="text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck size={14} />
                <span>After InboxShield (Optimized Infrastructure)</span>
              </span>
            </div>

            {/* Dual Dashboard Comparison Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 relative">
              {/* LEFT VIEW: BEFORE INBOXSHIELD (UNOPTIMIZED SETUP) */}
              <div
                className="p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-800 transition-opacity"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(127, 29, 29, 0.16) 0%, rgba(15, 23, 42, 0.95) 100%)',
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400 block">
                      UNOPTIMIZED COLD EMAIL SETUP
                    </span>
                    <h4 className="text-lg font-black text-white mt-0.5">
                      Before InboxShield
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold">
                    Domain Reputation Damaged
                  </span>
                </div>

                {/* 3 Key Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-rose-500/30 space-y-1">
                    <div className="text-[11px] font-mono text-slate-400">
                      Open Rate
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-rose-400 flex items-center gap-1">
                      <span>14.2%</span>
                      <TrendingDown size={18} />
                    </div>
                    <div className="text-[10px] font-mono text-rose-300/80">
                      12%–14.2% Avg
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <div className="text-[11px] font-mono text-slate-400">
                      Reply Rate
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-200">
                      1.1%
                    </div>
                    <div className="text-[10px] font-mono text-rose-400">
                      High Bounce (7.8%)
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-rose-500/30 space-y-1">
                    <div className="text-[11px] font-mono text-slate-400">
                      Spam Placement
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-rose-500">
                      58.4%
                    </div>
                    <div className="text-[10px] font-mono text-rose-300/80">
                      Up to 65% in Spam
                    </div>
                  </div>
                </div>

                {/* Red Alert Bar Chart */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-rose-400 font-bold">
                      Spam &amp; Quarantine Placement Breakdown
                    </span>
                    <span className="text-slate-500">Google &amp; O365 Seeds</span>
                  </div>
                  <div className="space-y-2 text-xs font-mono">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-rose-300">Spam Folder / Quarantine</span>
                        <span className="text-rose-400 font-bold">58.4% – 65.0%</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-rose-500 rounded-full w-[62%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-amber-300">Promotions / Other Tab</span>
                        <span className="text-amber-400 font-bold">24.6%</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full w-[25%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-400">Primary Prospect Inbox</span>
                        <span className="text-slate-300 font-bold">Only 17.0%</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-slate-500 rounded-full w-[17%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT VIEW: AFTER INBOXSHIELD (OPTIMIZED INFRASTRUCTURE) */}
              <div
                className="p-6 sm:p-8 space-y-6 transition-opacity"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(6, 78, 59, 0.22) 0%, rgba(15, 23, 42, 0.95) 100%)',
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 block">
                      INBOXSHIELD MANAGED INFRASTRUCTURE
                    </span>
                    <h4 className="text-lg font-black text-white mt-0.5">
                      After InboxShield
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold">
                    Primary Inbox Guaranteed
                  </span>
                </div>

                {/* 3 Key Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/40 space-y-1">
                    <div className="text-[11px] font-mono text-slate-400">
                      Open Rate
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-400 flex items-center gap-1">
                      <span>61.8%</span>
                      <TrendingUp size={18} />
                    </div>
                    <div className="text-[10px] font-mono text-emerald-300/90">
                      58%–61.8% Verified
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-1">
                    <div className="text-[11px] font-mono text-slate-400">
                      Reply Rate
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-white">
                      8.4%
                    </div>
                    <div className="text-[10px] font-mono text-emerald-400">
                      &lt; 0.6% Bounce Rate
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/40 space-y-1">
                    <div className="text-[11px] font-mono text-slate-400">
                      Spam Placement
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                      0.8%
                    </div>
                    <div className="text-[10px] font-mono text-emerald-300/90">
                      98.2% Primary Inbox
                    </div>
                  </div>
                </div>

                {/* Green Optimal Bar Chart */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400 font-bold">
                      Primary Inbox Placement Telemetry
                    </span>
                    <span className="text-emerald-300">SPF + DKIM + DMARC p=reject</span>
                  </div>
                  <div className="space-y-2 text-xs font-mono">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-emerald-300">Primary Prospect Inbox</span>
                        <span className="text-emerald-400 font-bold">98.2%</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full w-[98%]"
                          style={{ backgroundColor: emeraldColor }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-400">Promotions Tab</span>
                        <span className="text-slate-300 font-bold">1.0%</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-teal-500 rounded-full w-[3%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-400">Spam Folder Rate</span>
                        <span className="text-emerald-400 font-bold">0.8% (Near-Zero)</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full w-[1.5%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Central Vertical Draggable Handle Overlay on Desktop */}
              <div
                onMouseDown={() => setIsDragging(true)}
                onTouchStart={() => setIsDragging(true)}
                style={{ left: `${sliderPercent}%` }}
                className="hidden lg:flex absolute top-0 bottom-0 -translate-x-1/2 z-30 items-center justify-center cursor-ew-resize group"
              >
                <div className="w-0.5 h-full bg-emerald-400 shadow-[0_0_15px_#10B981]" />
                <div
                  className="absolute w-10 h-10 rounded-full text-slate-950 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.7)] border-2 border-white group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: emeraldColor }}
                >
                  <ArrowLeftRight size={17} strokeWidth={2.5} />
                </div>
              </div>
            </div>

            {/* Interactive Range Slider Scrubber Bar (Works on All Devices) */}
            <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-4">
              <span className="text-xs font-mono text-rose-400 shrink-0">
                0% (Default Spam Risk)
              </span>
              <input
                type="range"
                min={0}
                max={100}
                value={sliderPercent}
                onChange={(e) => setSliderPercent(Number(e.target.value))}
                aria-label="Deliverability Optimization Slider"
                className="w-full accent-emerald-500 cursor-pointer h-2 rounded-lg bg-slate-800"
              />
              <span className="text-xs font-mono text-emerald-400 shrink-0">
                100% (InboxShield Optimized)
              </span>
            </div>
          </div>

          {/* ================================================================= */}
          {/* 3. DYNAMIC METRIC TICKER BELOW SLIDER (REVENUE LOST VS RECOVERED) */}
          {/* ================================================================= */}
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-emerald-400">
                  LIVE PIPELINE IMPACT TICKER · AT {sliderPercent}% INFRASTRUCTURE OPTIMIZATION
                </span>
                <h4 className="text-base sm:text-lg font-extrabold text-white mt-0.5">
                  Estimated Revenue Lost to Spam vs. Pipeline Recovered
                </h4>
              </div>

              {/* Monthly Cold Email Volume Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">
                  Team Monthly Volume:
                </span>
                {[25000, 50000, 100000, 250000].map((vol) => (
                  <button
                    key={vol}
                    type="button"
                    onClick={() => setMonthlySendVolume(vol)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border cursor-pointer ${
                      monthlySendVolume === vol
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {vol / 1000}k/mo
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-1">
                <div className="text-[11px] font-mono text-slate-400">
                  Simulated Open / Reply Rate
                </div>
                <div className="text-xl sm:text-2xl font-black text-emerald-400">
                  {interpolatedOpenRate}% / {interpolatedReplyRate}%
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  Spam Rate: {interpolatedSpamRate}%
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-1">
                <div className="text-[11px] font-mono text-slate-400">
                  Qualified Meetings Booked / Mo
                </div>
                <div className="text-xl sm:text-2xl font-black text-white">
                  {currentMeetingsPerMonth} SQLs/mo
                </div>
                <div className="text-[10px] font-mono text-emerald-400">
                  vs. {baselineMeetingsPerMonth} SQLs on DIY setup
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/25 border border-rose-500/30 space-y-1">
                <div className="text-[11px] font-mono text-rose-300">
                  Est. Monthly Pipeline Lost to Spam
                </div>
                <div className="text-xl sm:text-2xl font-black text-rose-400">
                  -${lostPipelineUsd.toLocaleString()}/mo
                </div>
                <div className="text-[10px] font-mono text-rose-300/80">
                  Unopened prospect opportunities
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-1">
                <div className="text-[11px] font-mono text-emerald-300 flex items-center gap-1">
                  <DollarSign size={12} />
                  <span>Est. Pipeline Recovered / Mo</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-emerald-400">
                  +${recoveredPipelineUsd.toLocaleString()}/mo
                </div>
                <div className="text-[10px] font-mono text-emerald-300/90">
                  From primary inbox recovery
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MODAL: PAIN VS SOLUTION TECHNICAL ARCHITECTURE DEEP-DIVE MODAL        */}
      {/* ===================================================================== */}
      {activePillarModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
          onClick={() => setActivePillarModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-3xl bg-[#0F172A] border border-slate-700 text-[#F8FAFC] p-6 sm:p-8 shadow-2xl space-y-5"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-emerald-400">
                  {activePillarModal.dimension}
                </span>
                <h3 className="text-xl font-black mt-1">
                  {activePillarModal.shieldTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActivePillarModal(null)}
                className="p-2 rounded-xl border border-slate-700 hover:bg-slate-800 cursor-pointer"
              >
                <X size={17} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-rose-950/25 border border-rose-500/40 space-y-1.5">
                <div className="font-mono font-bold text-rose-400">
                  DIY Failure Mode ({activePillarModal.diyMetric})
                </div>
                <div className="font-bold text-white">{activePillarModal.diyTitle}</div>
                <p className="text-slate-300 leading-relaxed">
                  {activePillarModal.diyDesc}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/25 border border-emerald-500/40 space-y-1.5">
                <div className="font-mono font-bold text-emerald-400">
                  InboxShield SLA ({activePillarModal.shieldMetric})
                </div>
                <div className="font-bold text-white">
                  {activePillarModal.shieldTitle}
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {activePillarModal.shieldDesc}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
              <div className="font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                <Server size={14} />
                <span>How Our Engineers Deploy This Layer:</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {activePillarModal.architectureDeepDive}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setActivePillarModal(null);
                  const el = document.getElementById('inboxshield-pricing');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-slate-950 flex items-center gap-1.5 cursor-pointer"
                style={{ backgroundColor: emeraldColor }}
              >
                <span>Deploy This Infrastructure</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
