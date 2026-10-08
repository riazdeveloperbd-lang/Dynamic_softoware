import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Layers,
  Terminal,
  SlidersHorizontal,
  X,
  Check,
  Copy,
  MoveHorizontal,
  ExternalLink,
  Code2,
  Eye,
  Compass,
  FileCode2,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';

export interface CraftVectorHeroCaseStudiesSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

type CaseStudyCategory =
  | 'All Work'
  | 'B2B SaaS & AI'
  | 'Fintech & Web3'
  | 'Mobile Apps'
  | 'Design Systems';

interface CaseStudyProject {
  id: string;
  index: string;
  title: string;
  client: string;
  category: Exclude<CaseStudyCategory, 'All Work'>;
  timeline: string;
  role: string;
  headlineMetric: string;
  secondaryMetric: string;
  summary: string;
  figmaEmbedUrl: string;
  liveProdUrl: string;
  heroImage: string;
  beforeImage: string;
  afterImage: string;
  problemStatement: string;
  researchInsights: string[];
  iaArchitecture: string[];
  designSystemTokens: { name: string; value: string; usage: string }[];
  beforeAfterMetrics: { label: string; before: string; after: string; delta: string }[];
  reactSnippet: string;
}

const CASE_STUDIES: CaseStudyProject[] = [
  {
    id: 'veloce-treasury',
    index: '01.',
    title: 'VelocePay Multi-Currency Treasury & Automated KYB Onboarding',
    client: 'VelocePay (YC W22 · Series B Fintech, San Francisco)',
    category: 'Fintech & Web3',
    timeline: '14 Weeks · Q1–Q2 2026',
    role: 'Staff Product Designer & Design Systems Lead',
    headlineMetric: '+42% Activation Conversion',
    secondaryMetric: '-64% KYB Compliance Drop-Off',
    summary:
      'Re-architected a 19-step institutional onboarding flow and multi-currency FX liquidity workbench into a single keyboard-first progressive command interface.',
    figmaEmbedUrl: 'https://figma.com/@craftvector/veloce-treasury-v4',
    liveProdUrl: 'https://app.velocepay.io/treasury-sandbox',
    heroImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85',
    beforeImage:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85',
    problemStatement:
      'Mid-market CFOs were abandoning VelocePay during beneficial-ownership document verification due to fragmented modal wizards, opaque FX spread previews, and zero real-time validation feedback.',
    researchInsights: [
      'Shadowed 18 CFOs and controllers across US/EU entities; 72% switched tabs to Excel to calculate FX wire fees.',
      'Fullstory session replays revealed an average 11.4-minute stall on Step 4 (Beneficial Owner UBO Tree upload).',
      'Engineers spent 35% of sprint velocity patching one-off table overrides due to missing Figma-to-React data grid tokens.',
    ],
    iaArchitecture: [
      'Collapsed 19 linear screens into a 3-stage split-pane workspace with live KYB entity graph auto-complete via Stripe Identity + Middesk API.',
      'Introduced a persistent Cmd+K Liquidity Command Bar for instant FX spot rate simulation and multi-sig approval routing.',
      'Built a virtualized tabular-numeral ledger supporting 50,000+ rows at 60fps with keyboard arrow navigation.',
    ],
    designSystemTokens: [
      {
        name: '--surface-canvas-obsidian',
        value: '#09090B',
        usage: 'Primary institutional trading & ledger canvas',
      },
      {
        name: '--accent-interactive-indigo',
        value: '#6366F1',
        usage: 'Primary wire execution & focus ring token',
      },
      {
        name: '--font-tabular-mono',
        value: 'JetBrains Mono (tabular-nums)',
        usage: 'FX basis points, SWIFT routing & settlement timestamps',
      },
    ],
    beforeAfterMetrics: [
      {
        label: 'Merchant KYB Verification Completion',
        before: '48.2%',
        after: '90.4%',
        delta: '+42.2%',
      },
      {
        label: 'Median Time-to-First-Wire Settlement',
        before: '4.2 Days',
        after: '19 Mins',
        delta: '-98%',
      },
      {
        label: 'Support Tickets per 1k Onboarded Entities',
        before: '142 tickets',
        after: '51 tickets',
        delta: '-64%',
      },
    ],
    reactSnippet: `// Tokenized FX Liquidity Row with Tabular Numerals
export const LiquidityLedgerRow = ({ pair, rate, spreadBps }: FXRowProps) => (
  <div className="grid grid-cols-12 items-center px-4 py-2.5 border-b border-zinc-800/80 hover:bg-zinc-900/60 transition-colors">
    <span className="col-span-4 font-medium text-zinc-100">{pair}</span>
    <span className="col-span-4 font-mono tabular-nums text-emerald-400">{rate.toFixed(4)}</span>
    <span className="col-span-4 font-mono tabular-nums text-right text-zinc-400">{spreadBps} bps</span>
  </div>
);`,
  },
  {
    id: 'cortexops-agent-studio',
    index: '02.',
    title: 'CortexOps Agentic LLM Trace Debugger & Evaluation Studio',
    client: 'CortexOps AI (Series A Developer Infrastructure, London)',
    category: 'B2B SaaS & AI',
    timeline: '12 Weeks · Q4 2025',
    role: 'Principal Product Designer (0→1 Product & Design Engineer)',
    headlineMetric: '3.2x Daily Active Engineers',
    secondaryMetric: '-51% Prompt Regression Debugging Time',
    summary:
      'Designed an observability flamegraph, side-by-side prompt diffing canvas, and human-in-the-loop annotation queue for enterprise AI engineering teams.',
    figmaEmbedUrl: 'https://figma.com/@craftvector/cortexops-trace-ui',
    liveProdUrl: 'https://cloud.cortexops.dev/playground',
    heroImage:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=85',
    beforeImage:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=85',
    problemStatement:
      'ML engineers were inspecting nested 40-step agent tool calls inside raw unformatted JSON blobs, making latency bottlenecks and hallucination root-causes nearly impossible to isolate.',
    researchInsights: [
      'Conducted contextual inquiry with 24 AI engineers at Series A–C startups; 85% used Chrome DevTools Network tab instead of existing dashboards.',
      'Latency spikes in multi-agent DAGs were hidden behind deeply nested accordion trees requiring 14+ clicks per trace.',
      'Dark mode optical glare on pure #000000 backgrounds caused eye fatigue during 4-hour evaluation sessions.',
    ],
    iaArchitecture: [
      'Engineered a synchronized Waterfall Flamegraph + Token Stream Inspector with sub-millisecond scrubbers.',
      'Created a side-by-side Semantic Diff view highlighting token probability shifts and JSON schema violations.',
      'Shipped full keyboard navigation (J/K trace stepping, Cmd+Shift+E export to dataset) with zero mouse dependency.',
    ],
    designSystemTokens: [
      {
        name: '--trace-node-toolcall',
        value: '#6366F1',
        usage: 'Deterministic function call span highlight',
      },
      {
        name: '--trace-node-latency-warn',
        value: '#F59E0B',
        usage: 'TTFT (Time-to-First-Token) > 850ms threshold',
      },
      {
        name: '--radius-nested-panel',
        value: '8px (outer 12px - 4px pad)',
        usage: 'Strict nested radius math across split panes',
      },
    ],
    beforeAfterMetrics: [
      {
        label: 'Mean Time to Isolate Hallucinated Tool Call',
        before: '18.5 Mins',
        after: '4.1 Mins',
        delta: '-77.8%',
      },
      {
        label: 'Weekly Active Engineering Teams Retained (D30)',
        before: '29%',
        after: '78%',
        delta: '+49%',
      },
      {
        label: 'Clicks Required to Promote Trace to Eval Suite',
        before: '11 Clicks',
        after: '1 Shortcut (E)',
        delta: '-91%',
      },
    ],
    reactSnippet: `// Keyboard-First Trace Span Bar with Latency Budget Indicator
export const TraceSpanBar = ({ label, durationMs, maxMs }: SpanProps) => {
  const widthPct = Math.min(100, Math.round((durationMs / maxMs) * 100));
  return (
    <div className="flex items-center gap-3 py-1.5 text-xs font-mono">
      <span className="w-36 truncate text-zinc-300">{label}</span>
      <div className="flex-1 h-2 bg-zinc-800 rounded overflow-hidden">
        <div className="h-full bg-indigo-500" style={{ width: \`\${widthPct}%\` }} />
      </div>
      <span className="w-16 text-right tabular-nums text-zinc-400">{durationMs}ms</span>
    </div>
  );
};`,
  },
  {
    id: 'prism-design-system',
    index: '03.',
    title: 'Prism UI: Multi-Brand Figma Variables & React Radix Component Kit',
    client: 'Prism Enterprise Cloud (4 Product Lines · 110+ Engineers)',
    category: 'Design Systems',
    timeline: '16 Weeks · Ongoing Governance',
    role: 'Design Systems Architect (Figma + Storybook + Tailwind v4)',
    headlineMetric: '96.4% Token Adoption',
    secondaryMetric: '2.4x Faster Feature PR Velocity',
    summary:
      'Unified 4 acquired SaaS products under a single W3C Design Token JSON pipeline, syncing Figma Variable collections directly to GitHub pull requests.',
    figmaEmbedUrl: 'https://figma.com/@craftvector/prism-design-tokens',
    liveProdUrl: 'https://prism-ds.craftvector.design/storybook',
    heroImage:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1400&q=85',
    beforeImage:
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=85',
    problemStatement:
      'Four post-merger engineering squads maintained 7 conflicting button implementations, 44 hardcoded hex grays, and zero WCAG AA focus-ring consistency.',
    researchInsights: [
      'Audited 1,420 production CSS files; discovered 318 redundant color declarations and inconsistent modal z-index stacking.',
      'Designers spent 6+ hours weekly manually redlining spacing and dark-mode overrides in Jira tickets.',
      'Accessibility audit flagged 62 keyboard trap violations across date pickers and comboboxes.',
    ],
    iaArchitecture: [
      'Architected a 3-tier token taxonomy (Primitive → Semantic → Component) with automated Style Dictionary CI builds.',
      'Built 42 accessible headless primitives on Radix UI + Tailwind CSS with strict WCAG AA contrast enforcement.',
      'Created a custom Figma Plugin that validates contrast ratios and token binding before handoff sign-off.',
    ],
    designSystemTokens: [
      {
        name: '--border-subtle-hairline',
        value: 'rgba(255, 255, 255, 0.08)',
        usage: '1px structural card boundary in Obsidian Dark Mode',
      },
      {
        name: '--motion-spring-snappy',
        value: 'cubic-bezier(0.16, 1, 0.3, 1)',
        usage: 'Sub-200ms micro-interaction settling curve',
      },
      {
        name: '--focus-ring-offset',
        value: '2px solid #6366F1',
        usage: 'Universal keyboard focus-visible accessibility ring',
      },
    ],
    beforeAfterMetrics: [
      {
        label: 'Hardcoded Hex Values in Production Repo',
        before: '318 Hexes',
        after: '0 (100% Tokenized)',
        delta: '-100%',
      },
      {
        label: 'UI Cycle Time from Figma Spec to Merged PR',
        before: '6.5 Days',
        after: '2.7 Days',
        delta: '2.4x Faster',
      },
      {
        label: 'Automated Lighthouse Accessibility Score',
        before: '74 / 100',
        after: '100 / 100',
        delta: '+26 pts',
      },
    ],
    reactSnippet: `// Zero-Runtime Tokenized Button Primitive with Tactile Active State
export const SystemButton = ({ intent = 'primary', children, ...props }: ButtonProps) => (
  <button
    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold
               transition-all duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-indigo-500"
    {...props}
  >
    {children}
  </button>
);`,
  },
  {
    id: 'pulse-mobile-triage',
    index: '04.',
    title: 'PulseCare iOS & Mobile Web Offline-First Field Clinician App',
    client: 'PulseHealth Cloud (Telehealth & Diagnostics, Singapore & Dhaka)',
    category: 'Mobile Apps',
    timeline: '10 Weeks · Q3 2025',
    role: 'Lead Mobile UI/UX Designer',
    headlineMetric: '4.9★ App Store (18k+ Reviews)',
    secondaryMetric: '-47% Patient Intake Time',
    summary:
      'Crafted a one-handed thumb-zone diagnostic intake app with local IndexedDB sync and voice-to-structured-FHIR chart capture for high-volume clinics.',
    figmaEmbedUrl: 'https://figma.com/@craftvector/pulsecare-mobile-ios',
    liveProdUrl: 'https://pulsecare.health/mobile-demo',
    heroImage:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1400&q=85',
    beforeImage:
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=85',
    problemStatement:
      'Visiting nurses and chamber physicians struggled with tiny 28px tap targets, lost form state during cellular drops, and 8-scroll-long SOAP note forms.',
    researchInsights: [
      'Field testing in 12 clinics showed clinicians held tablets/phones in one hand while examining patients with the other.',
      '44px+ minimum touch targets and bottom-sheet action trays reduced accidental mis-taps by 81%.',
      'High-contrast daylight mode was essential for home-visit practitioners working in bright ambient environments.',
    ],
    iaArchitecture: [
      'Moved all primary diagnostic triggers into a bottom 48px thumb-arc dock with haptic confirmation.',
      'Designed an optimistic offline sync queue indicator that persists vitals locally and auto-merges on reconnect.',
      'Replaced 24 dropdown menus with smart clinical shorthand token chips and instant ICD-11 search.',
    ],
    designSystemTokens: [
      {
        name: '--touch-target-minimum',
        value: '48px × 48px',
        usage: 'One-handed clinical glove & thumb ergonomics',
      },
      {
        name: '--surface-daylight-crisp',
        value: '#FFFFFF / #F4F4F5',
        usage: 'High-luminance outdoor legibility pairing',
      },
      {
        name: '--status-offline-sync',
        value: '#10B981',
        usage: 'Zero-data-loss local persistence confirmation',
      },
    ],
    beforeAfterMetrics: [
      {
        label: 'Median Patient Triage Charting Duration',
        before: '4m 12s',
        after: '2m 14s',
        delta: '-47%',
      },
      {
        label: 'Form Data Loss Incidents on 3G Networks',
        before: '8.4% of visits',
        after: '0.0% (Offline Sync)',
        delta: '-100%',
      },
      {
        label: 'Clinician Net Promoter Score (NPS)',
        before: '+24 NPS',
        after: '+71 NPS',
        delta: '+47 pts',
      },
    ],
    reactSnippet: `// One-Handed Thumb-Arc Vital Sign Stepper (>= 48px Touch Target)
export const VitalSignStepper = ({ label, value, unit, onIncrement, onDecrement }: VitalProps) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800">
    <span className="text-xs text-zinc-400">{label}</span>
    <div className="flex items-center gap-2">
      <button onClick={onDecrement} className="w-12 h-12 rounded-lg bg-zinc-800 text-lg font-mono">-</button>
      <span className="w-20 text-center font-mono tabular-nums text-base font-bold">{value} {unit}</span>
      <button onClick={onIncrement} className="w-12 h-12 rounded-lg bg-indigo-600 text-white text-lg font-mono">+</button>
    </div>
  </div>
);`,
  },
];

export const CraftVectorHeroCaseStudiesSection: React.FC<
  CraftVectorHeroCaseStudiesSectionProps
> = ({ title, subtitle, variant, primaryColor, isDark = true }) => {
  const [activeCategory, setActiveCategory] = useState<CaseStudyCategory>('All Work');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudyProject | null>(null);
  const [modalSliderPos, setModalSliderPos] = useState<number>(52);
  const [activeTokenPreview, setActiveTokenPreview] = useState<'indigo' | 'emerald' | 'amber'>(
    'indigo'
  );
  const [copiedCode, setCopiedCode] = useState(false);

  const accentHex = primaryColor || (isDark ? '#6366F1' : '#4F46E5');

  const filteredStudies = useMemo(() => {
    if (activeCategory === 'All Work') return CASE_STUDIES;
    return CASE_STUDIES.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCopySnippet = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1800);
  };

  const tokenPreviewColors = {
    indigo: '#6366F1',
    emerald: '#10B981',
    amber: '#F59E0B',
  };

  return (
    <div
      className={`transition-colors duration-200 ${
        isDark ? 'bg-[#09090B] text-[#FAFAFA]' : 'bg-white text-[#09090B]'
      }`}
    >
      {/* ===================================================================== */}
      {/* 1. HERO SECTION & INTERACTIVE DESIGN SYSTEM SHOWCASE CARD             */}
      {/* ===================================================================== */}
      <section className="relative overflow-hidden border-b border-zinc-500/15">
        {/* Subtle Architectural Grid Backdrop */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: High-Craft Positioning & Quantitative Proof */}
            <div className="lg:col-span-7 space-y-6">
              {/* Status Line (Unboxed clean metadata with live pulsing indicator) */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="inline-flex items-center gap-2 font-semibold text-emerald-500">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <EditableText
                    itemKey="craftvector_hero_status"
                    defaultValue="Available for Q4 Remote Product Design Roles & Projects"
                  />
                </span>
                <span aria-hidden="true" className="opacity-40">
                  ·
                </span>
                <span className={isDark ? 'text-[#A1A1AA]' : 'text-zinc-600'}>
                  San Francisco / London / Dhaka Overlap
                </span>
              </div>

              {/* Headline */}
              <h1
                className="text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-tight leading-[1.08]"
                style={{ textWrap: 'balance' } as React.CSSProperties}
              >
                <EditableText itemKey="craftvector_hero_title" defaultValue={title} />
              </h1>

              {/* Subheadline */}
              <p
                className={`text-base sm:text-lg leading-relaxed max-w-2xl ${
                  isDark ? 'text-[#A1A1AA]' : 'text-zinc-600'
                }`}
              >
                <EditableText itemKey="craftvector_hero_subtitle" defaultValue={subtitle} />
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => scrollToSection('craftvector-case-studies')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white shadow-lg transition-all duration-150 hover:opacity-95 active:scale-[0.98] cursor-pointer"
                  style={{ backgroundColor: accentHex }}
                >
                  <span>
                    <EditableText
                      itemKey="craftvector_hero_cta_primary"
                      defaultValue="Explore Case Studies"
                    />
                  </span>
                  <ArrowRight size={15} />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('craftvector-intake-drawer')}
                  className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-semibold border transition-colors duration-150 cursor-pointer ${
                    isDark
                      ? 'bg-[#18181B] border-zinc-800 text-[#FAFAFA] hover:border-zinc-700'
                      : 'bg-[#F4F4F5] border-zinc-200 text-[#09090B] hover:border-zinc-300'
                  }`}
                >
                  <span>
                    <EditableText
                      itemKey="craftvector_hero_cta_secondary"
                      defaultValue="Book Discovery Call"
                    />
                  </span>
                  <ArrowUpRight size={15} style={{ color: accentHex }} />
                </button>
              </div>

              {/* Quantitative Impact Proof Bar */}
              <div
                className={`pt-6 border-t grid grid-cols-2 sm:grid-cols-4 gap-6 ${
                  isDark ? 'border-zinc-800/80' : 'border-zinc-200'
                }`}
              >
                {[
                  {
                    metric: '40+ Shipped',
                    context: 'B2B SaaS & AI Products (2018–2026)',
                  },
                  {
                    metric: '$42M+ Raised',
                    context: 'By YC & Seed-to-Series B Clients',
                  },
                  {
                    metric: '+38% Avg Lift',
                    context: 'Activation & Core Funnel Conversion',
                  },
                  {
                    metric: '100% Tokenized',
                    context: 'Figma Variables → React / Storybook',
                  },
                ].map((stat) => (
                  <div key={stat.metric} className="space-y-1">
                    <div
                      className="text-lg sm:text-xl font-bold font-mono tabular-nums"
                      style={{ color: accentHex }}
                    >
                      {stat.metric}
                    </div>
                    <div
                      className={`text-[11px] leading-snug ${
                        isDark ? 'text-[#A1A1AA]' : 'text-zinc-600'
                      }`}
                    >
                      {stat.context}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Hero Showcase Card (Live Figma Token + React Inspector) */}
            <div className="lg:col-span-5">
              <div
                className={`rounded-2xl border p-5 sm:p-6 transition-all duration-200 space-y-5 ${
                  isDark
                    ? 'bg-[#18181B] border-zinc-800 shadow-2xl shadow-indigo-950/20'
                    : 'bg-[#F4F4F5] border-zinc-200 shadow-xl'
                }`}
              >
                {/* Card Top Header */}
                <div className="flex items-center justify-between gap-2 border-b pb-3.5 border-zinc-500/20">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-[11px] font-mono opacity-75">
                      prism-tokens.config.json — Live Inspector
                    </span>
                  </div>
                  <span className="text-[11px] font-mono" style={{ color: accentHex }}>
                    v4.2 W3C
                  </span>
                </div>

                {/* Interactive Token Accent Switcher inside Hero Card */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold">
                      Interactive Semantic Token Binding
                    </span>
                    <span className="font-mono text-[11px] opacity-70">
                      Click to test live propagation
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { id: 'indigo', label: 'Indigo #6366F1', hex: '#6366F1' },
                        { id: 'emerald', label: 'Emerald #10B981', hex: '#10B981' },
                        { id: 'amber', label: 'Amber #F59E0B', hex: '#F59E0B' },
                      ] as const
                    ).map((tok) => (
                      <button
                        key={tok.id}
                        type="button"
                        onClick={() => setActiveTokenPreview(tok.id)}
                        className={`px-3 py-2 rounded-lg text-[11px] font-mono border text-left transition-all cursor-pointer flex items-center gap-2 ${
                          activeTokenPreview === tok.id
                            ? isDark
                              ? 'bg-[#09090B] border-zinc-600 text-white'
                              : 'bg-white border-zinc-400 text-zinc-900 shadow-xs'
                            : isDark
                            ? 'bg-[#09090B]/50 border-zinc-800 text-zinc-400'
                            : 'bg-white/60 border-zinc-200 text-zinc-600'
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: tok.hex }}
                        />
                        <span className="truncate">{tok.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Component Preview Surface */}
                <div
                  className={`rounded-xl p-4 border space-y-4 ${
                    isDark ? 'bg-[#09090B] border-zinc-800' : 'bg-white border-zinc-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono opacity-60">
                        COMPONENT: &lt;TreasurySettlementCard /&gt;
                      </div>
                      <div className="text-sm font-bold mt-0.5">
                        Instant USD → EUR Liquidity Route
                      </div>
                    </div>
                    <span
                      className="text-xs font-mono font-semibold"
                      style={{ color: tokenPreviewColors[activeTokenPreview] }}
                    >
                      0.04% FX Spread
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-1 text-xs font-mono tabular-nums">
                    <div
                      className={`p-2.5 rounded-lg border ${
                        isDark ? 'bg-[#18181B] border-zinc-800' : 'bg-[#F4F4F5] border-zinc-200'
                      }`}
                    >
                      <div className="text-[10px] opacity-60">SETTLEMENT</div>
                      <div className="font-bold mt-0.5">$128,450.00</div>
                    </div>
                    <div
                      className={`p-2.5 rounded-lg border ${
                        isDark ? 'bg-[#18181B] border-zinc-800' : 'bg-[#F4F4F5] border-zinc-200'
                      }`}
                    >
                      <div className="text-[10px] opacity-60">LATENCY</div>
                      <div className="font-bold mt-0.5">140 ms</div>
                    </div>
                    <div
                      className={`p-2.5 rounded-lg border ${
                        isDark ? 'bg-[#18181B] border-zinc-800' : 'bg-[#F4F4F5] border-zinc-200'
                      }`}
                    >
                      <div className="text-[10px] opacity-60">WCAG CONTRAST</div>
                      <div className="font-bold mt-0.5 text-emerald-500">AAA 9.4:1</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] font-mono opacity-65">
                      Auto-Layout 8px Grid · Radix Primitive
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedCaseStudy(CASE_STUDIES[0])}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white transition-transform active:scale-95 cursor-pointer"
                      style={{ backgroundColor: tokenPreviewColors[activeTokenPreview] }}
                    >
                      Inspect Full Case Study →
                    </button>
                  </div>
                </div>

                {/* Tooling & Stack Strip */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono opacity-75 pt-1">
                  <span>Figma Variables</span>
                  <span>·</span>
                  <span>React 19 + TypeScript</span>
                  <span>·</span>
                  <span>Tailwind v4</span>
                  <span>·</span>
                  <span>Framer Motion</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. SELECTED CASE STUDIES (DEEP-DIVE ARCHITECTURE & MODAL INSPECTOR)   */}
      {/* ===================================================================== */}
      <section
        id="craftvector-case-studies"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-10"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-mono" style={{ color: accentHex }}>
              01. SELECTED PRODUCT ARCHITECTURE &amp; SHIPPED OUTCOMES
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              <EditableText
                itemKey="craftvector_cases_heading"
                defaultValue="Deep-Dive Case Studies with Measurable Business Impact."
              />
            </h2>
            <p className={`text-sm ${isDark ? 'text-[#A1A1AA]' : 'text-zinc-600'}`}>
              Every project includes full problem framing, user research synthesis, information
              architecture, tokenized Figma + React specs, and verified before/after KPIs.
            </p>
          </div>

          {/* Interactive Category Filter Bar (Functional Segmented Buttons) */}
          <div
            className={`inline-flex flex-wrap items-center gap-1 p-1 rounded-xl border ${
              isDark ? 'bg-[#18181B] border-zinc-800' : 'bg-[#F4F4F5] border-zinc-200'
            }`}
          >
            {(
              [
                'All Work',
                'B2B SaaS & AI',
                'Fintech & Web3',
                'Mobile Apps',
                'Design Systems',
              ] as CaseStudyCategory[]
            ).map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    active
                      ? 'text-white shadow-xs'
                      : isDark
                      ? 'text-zinc-400 hover:text-white'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                  style={active ? { backgroundColor: accentHex } : undefined}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento-Style Case Study Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredStudies.map((study) => (
            <article
              key={study.id}
              className={`group rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-200 ${
                isDark
                  ? 'bg-[#18181B] border-zinc-800 hover:border-indigo-500/60'
                  : 'bg-[#F4F4F5] border-zinc-200 hover:border-indigo-500/60'
              }`}
            >
              <div>
                {/* High-Resolution Mockup Preview Frame */}
                <div className="relative h-60 sm:h-64 overflow-hidden bg-zinc-900">
                  <img
                    src={study.heroImage}
                    alt={study.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                  {/* Top Metadata Bar on Image */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-zinc-200">
                    <span>
                      {study.index} {study.category}
                    </span>
                    <span>{study.timeline}</span>
                  </div>

                  {/* Bottom Quantitative Impact Callout on Image */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs font-mono text-emerald-400 font-semibold">
                      {study.headlineMetric} · {study.secondaryMetric}
                    </div>
                    <span className="text-[11px] font-mono text-zinc-300">
                      {study.client}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <div className="text-xs font-mono opacity-65">
                    Role: {study.role}
                  </div>

                  <h3 className="text-xl font-bold leading-snug">{study.title}</h3>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isDark ? 'text-[#A1A1AA]' : 'text-zinc-600'
                    }`}
                  >
                    {study.summary}
                  </p>

                  {/* Mini Before/After Metric Table */}
                  <div
                    className={`rounded-xl p-3.5 border grid grid-cols-3 gap-3 text-xs font-mono tabular-nums ${
                      isDark ? 'bg-[#09090B] border-zinc-800/90' : 'bg-white border-zinc-200'
                    }`}
                  >
                    {study.beforeAfterMetrics.map((m) => (
                      <div key={m.label} className="space-y-0.5">
                        <div className="text-[10px] opacity-60 truncate">{m.label}</div>
                        <div className="font-bold text-emerald-500">{m.delta}</div>
                        <div className="text-[10px] opacity-70">
                          {m.before} → {m.after}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div
                className={`px-6 py-4 border-t flex flex-wrap items-center justify-between gap-3 ${
                  isDark ? 'border-zinc-800/80 bg-[#121215]' : 'border-zinc-200 bg-white/60'
                }`}
              >
                <div className="flex items-center gap-3 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCaseStudy(study);
                      setModalSliderPos(50);
                    }}
                    className="underline opacity-75 hover:opacity-100 cursor-pointer"
                  >
                    Figma Tokens ({study.designSystemTokens.length})
                  </button>
                  <span className="opacity-40">·</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCaseStudy(study);
                      setModalSliderPos(50);
                    }}
                    className="underline opacity-75 hover:opacity-100 cursor-pointer"
                  >
                    React Spec
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCaseStudy(study);
                    setModalSliderPos(50);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-transform active:scale-95 cursor-pointer"
                  style={{ backgroundColor: accentHex }}
                >
                  <span>Read Full Case Study</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* FULL-SCREEN CASE STUDY READER MODAL (5-PART NARRATIVE + SPLIT SLIDER) */}
      {/* ===================================================================== */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div
            className={`w-full max-w-5xl rounded-2xl border shadow-2xl max-h-[92vh] flex flex-col overflow-hidden ${
              isDark
                ? 'bg-[#09090B] border-zinc-800 text-[#FAFAFA]'
                : 'bg-white border-zinc-200 text-[#09090B]'
            }`}
          >
            {/* Sticky Modal Header */}
            <div
              className={`px-6 py-4 border-b flex items-center justify-between gap-4 ${
                isDark ? 'bg-[#18181B] border-zinc-800' : 'bg-[#F4F4F5] border-zinc-200'
              }`}
            >
              <div>
                <div className="text-xs font-mono" style={{ color: accentHex }}>
                  {selectedCaseStudy.index} {selectedCaseStudy.category} ·{' '}
                  {selectedCaseStudy.timeline}
                </div>
                <h3 className="text-base sm:text-lg font-bold truncate">
                  {selectedCaseStudy.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCaseStudy(null)}
                className="p-2 rounded-lg border border-zinc-500/30 hover:opacity-80 cursor-pointer"
                aria-label="Close Case Study Modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Scrollable Narrative Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
              {/* Executive KPI Banner */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedCaseStudy.beforeAfterMetrics.map((m) => (
                  <div
                    key={m.label}
                    className={`p-4 rounded-xl border space-y-1 font-mono tabular-nums ${
                      isDark ? 'bg-[#18181B] border-zinc-800' : 'bg-[#F4F4F5] border-zinc-200'
                    }`}
                  >
                    <div className="text-xs opacity-70">{m.label}</div>
                    <div className="text-2xl font-bold text-emerald-500">{m.delta}</div>
                    <div className="text-xs opacity-80">
                      Before: {m.before} → Shipped: {m.after}
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive Before / After UI Redesign Slider */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs font-mono uppercase tracking-wider opacity-75">
                    INTERACTIVE UI COMPARISON: LEGACY INTERFACE (LEFT) VS. SHIPPED REDESIGN (RIGHT)
                  </div>
                  <div className="text-xs font-mono" style={{ color: accentHex }}>
                    Drag Slider: {modalSliderPos}%
                  </div>
                </div>

                <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden border border-zinc-700 select-none">
                  <img
                    src={selectedCaseStudy.afterImage}
                    alt="Shipped Redesign"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-y-0 left-0 overflow-hidden"
                    style={{ width: `${modalSliderPos}%` }}
                  >
                    <img
                      src={selectedCaseStudy.beforeImage}
                      alt="Legacy UI"
                      className="w-full h-full object-cover filter grayscale contrast-75"
                    />
                  </div>
                  {/* Divider Handle */}
                  <div
                    className="absolute inset-y-0 w-0.5 bg-white shadow-lg"
                    style={{ left: `${modalSliderPos}%` }}
                  >
                    <div
                      className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white shadow-xl"
                      style={{ backgroundColor: accentHex }}
                    >
                      <MoveHorizontal size={16} />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/75 text-white text-[11px] font-mono">
                    BEFORE: Legacy Fragmented Flow
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-emerald-600/90 text-white text-[11px] font-mono">
                    AFTER: Tokenized Command UI ({selectedCaseStudy.headlineMetric})
                  </div>
                </div>

                <input
                  type="range"
                  min={5}
                  max={95}
                  value={modalSliderPos}
                  onChange={(e) => setModalSliderPos(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                  aria-label="Compare Legacy UI vs Shipped Redesign"
                />
              </div>

              {/* 5-Stage Structured Case Study Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className={`p-5 rounded-xl border space-y-3 ${
                    isDark ? 'bg-[#18181B] border-zinc-800' : 'bg-[#F4F4F5] border-zinc-200'
                  }`}
                >
                  <div className="text-xs font-mono" style={{ color: accentHex }}>
                    STAGE 01 · PROBLEM &amp; FRICTION AUDIT
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                    {selectedCaseStudy.problemStatement}
                  </p>
                  <div className="pt-2 border-t border-zinc-500/20 space-y-1.5">
                    <div className="text-xs font-semibold">
                      Key Discovery &amp; Session Replay Findings:
                    </div>
                    <ul className="space-y-1.5 text-xs opacity-80 list-disc pl-4">
                      {selectedCaseStudy.researchInsights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div
                  className={`p-5 rounded-xl border space-y-3 ${
                    isDark ? 'bg-[#18181B] border-zinc-800' : 'bg-[#F4F4F5] border-zinc-200'
                  }`}
                >
                  <div className="text-xs font-mono" style={{ color: accentHex }}>
                    STAGE 02 · INFORMATION ARCHITECTURE &amp; FLOWS
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm leading-relaxed opacity-90">
                    {selectedCaseStudy.iaArchitecture.map((step, idx) => (
                      <li key={step} className="flex items-start gap-2">
                        <span className="font-mono font-bold" style={{ color: accentHex }}>
                          0{idx + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Design System Tokens + Shipped React Component Code */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div
                  className={`lg:col-span-5 p-5 rounded-xl border space-y-3 ${
                    isDark ? 'bg-[#18181B] border-zinc-800' : 'bg-[#F4F4F5] border-zinc-200'
                  }`}
                >
                  <div className="text-xs font-mono" style={{ color: accentHex }}>
                    STAGE 03 · FIGMA DESIGN TOKens
                  </div>
                  <div className="space-y-2.5">
                    {selectedCaseStudy.designSystemTokens.map((t) => (
                      <div
                        key={t.name}
                        className={`p-3 rounded-lg border text-xs font-mono ${
                          isDark ? 'bg-[#09090B] border-zinc-800' : 'bg-white border-zinc-200'
                        }`}
                      >
                        <div className="font-bold text-indigo-400">{t.name}</div>
                        <div className="opacity-90 mt-0.5">Value: {t.value}</div>
                        <div className="text-[11px] opacity-65 mt-0.5 font-sans">{t.usage}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`lg:col-span-7 p-5 rounded-xl border space-y-3 ${
                    isDark ? 'bg-[#18181B] border-zinc-800' : 'bg-[#F4F4F5] border-zinc-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono" style={{ color: accentHex }}>
                      STAGE 04 · PRODUCTION REACT + TAILWIND IMPLEMENTATION
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopySnippet(selectedCaseStudy.reactSnippet)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono border border-zinc-500/30 cursor-pointer"
                    >
                      {copiedCode ? (
                        <>
                          <Check size={12} className="text-emerald-500" />
                          <span className="text-emerald-500">Copied JSX</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy Component</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-[#09090B] text-zinc-200 border border-zinc-800 text-[11px] font-mono overflow-x-auto leading-relaxed">
                    <code>{selectedCaseStudy.reactSnippet}</code>
                  </pre>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono opacity-75">
                    <span>Figma File: {selectedCaseStudy.figmaEmbedUrl}</span>
                    <span>Live Prod: {selectedCaseStudy.liveProdUrl}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
