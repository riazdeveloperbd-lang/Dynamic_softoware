import React, { useState, useMemo } from 'react';
import {
  Check,
  ArrowUpRight,
  Calendar,
  SlidersHorizontal,
  Sparkles,
  FileCode2,
  Send,
  CheckCircle2,
  Clock,
  Globe,
  ShieldCheck,
  Briefcase,
  Terminal,
  Copy,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';

export interface CraftVectorEngagementScopeIntakeSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

type EngagementModelId = 'mvp-sprint' | 'growth-retainer' | 'fulltime-role';
type ScopeProjectType = 'Web App / B2B SaaS' | 'Mobile App (iOS/Android)' | 'Design System' | 'UX Audit & Conversion';
type ScopeComplexity = 'Seed / MVP (8–12 Screens)' | 'Series A Core (20–35 Screens)' | 'Enterprise Suite (50+ Screens)';
type ScopeDeliverable = 'Figma + Interactive Prototype' | 'Figma + Tokenized React/Tailwind PRs';

export const CraftVectorEngagementScopeIntakeSection: React.FC<
  CraftVectorEngagementScopeIntakeSectionProps
> = ({ title, subtitle, variant, primaryColor, isDark = true }) => {
  const accentHex = primaryColor || (isDark ? '#6366F1' : '#4F46E5');

  // Engagement Tier Selection
  const [selectedModel, setSelectedModel] = useState<EngagementModelId>('growth-retainer');
  const [currencyMode, setCurrencyMode] = useState<'USD' | 'EUR'>('USD');

  // Interactive Scope & Timeline Calculator State
  const [projectType, setProjectType] = useState<ScopeProjectType>('Web App / B2B SaaS');
  const [complexity, setComplexity] = useState<ScopeComplexity>('Series A Core (20–35 Screens)');
  const [deliverableMode, setDeliverableMode] = useState<ScopeDeliverable>(
    'Figma + Tokenized React/Tailwind PRs'
  );
  const [expeditedTrack, setExpeditedTrack] = useState<boolean>(false);

  // Project Intake & Discovery Call Form State
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [selectedTimezoneSlot, setSelectedTimezoneSlot] = useState(
    'Tue / Thu · 09:30 AM EST (14:30 UTC)'
  );
  const [projectBrief, setProjectBrief] = useState('');
  const [intakeSubmitted, setIntakeSubmitted] = useState(false);

  const sym = currencyMode === 'USD' ? '$' : '€';
  const fxMultiplier = currencyMode === 'USD' ? 1 : 0.92;

  const engagementTiers = [
    {
      id: 'mvp-sprint' as EngagementModelId,
      badge: '01 · 0→1 PRODUCT SPRINT',
      name: 'MVP Design Sprint (2–4 Weeks)',
      targetAudience: 'Ideal for Y Combinator / Early-Stage Startups launching V1 or pitching seed/Series A',
      baseUsd: 6800,
      billingUnit: 'fixed sprint',
      turnaround: 'First clickable flows in 48 hours',
      features: [
        'End-to-End Core Product User Flows & Information Architecture',
        'High-Craft UI in Dark & Light Mode (Up to 18 Core Screens)',
        'Interactive Investor-Grade Clickable Figma Prototype',
        'Foundational Figma Variable Token Starter Kit',
        'Async Loom Walkthroughs + Direct Slack Channel',
      ],
    },
    {
      id: 'growth-retainer' as EngagementModelId,
      badge: '02 · MOST POPULAR · EMBEDDED PARTNER',
      name: 'Product Growth & Systems Retainer',
      targetAudience: 'Ongoing embedded product design & design engineering for Series A/B teams',
      baseUsd: 7500,
      billingUnit: '/ month (Pause or cancel anytime)',
      turnaround: '24–48h avg. async request turnaround',
      featured: true,
      features: [
        'Dedicated Senior/Staff Product Designer embedded in Linear & Slack',
        'Full Multi-Brand Figma Variables + Storybook Design System Governance',
        'Production React / TypeScript / Tailwind v4 Component PRs',
        'Continuous PostHog / Fullstory Funnel & Activation Optimization',
        'Weekly Sync in US (EST/PST) or EU (GMT/CET) Overlap Windows',
      ],
    },
    {
      id: 'fulltime-role' as EngagementModelId,
      badge: '03 · FULL-TIME / FRACTIONAL PRINCIPAL',
      name: 'Staff / Founding Designer Role',
      targetAudience: 'Available for remote Staff/Principal IC roles at global product companies',
      baseUsd: 165000,
      billingUnit: 'base + equity (or Fractional Lead)',
      turnaround: 'Available for Q4 onboarding',
      features: [
        '8+ Years shipping complex B2B SaaS, Fintech & AI Developer Tools',
        'Proven track record scaling design systems across 100+ engineers',
        'Hands-on front-end engineering fluency (React, Radix, Tailwind, Git)',
        'Mentorship for junior/mid product designers & hiring loop leadership',
        'Direct executive & founder references from YC W22 & Series B teams',
      ],
    },
  ];

  // Dynamic Calculator Computation
  const scopeEstimation = useMemo(() => {
    let baseWeeks = 3;
    let baseBudgetUsd = 6500;

    if (projectType === 'Web App / B2B SaaS') {
      baseWeeks = 4;
      baseBudgetUsd = 7200;
    } else if (projectType === 'Mobile App (iOS/Android)') {
      baseWeeks = 4;
      baseBudgetUsd = 6800;
    } else if (projectType === 'Design System') {
      baseWeeks = 5;
      baseBudgetUsd = 8500;
    } else {
      baseWeeks = 2;
      baseBudgetUsd = 4200;
    }

    if (complexity === 'Series A Core (20–35 Screens)') {
      baseWeeks += 2;
      baseBudgetUsd += 3800;
    } else if (complexity === 'Enterprise Suite (50+ Screens)') {
      baseWeeks += 4;
      baseBudgetUsd += 8200;
    }

    if (deliverableMode === 'Figma + Tokenized React/Tailwind PRs') {
      baseWeeks += 1;
      baseBudgetUsd += 2600;
    }

    if (expeditedTrack) {
      baseWeeks = Math.max(1.5, Number((baseWeeks * 0.7).toFixed(1)));
      baseBudgetUsd = Math.round(baseBudgetUsd * 1.2);
    }

    const convertedBudget = Math.round(baseBudgetUsd * fxMultiplier);

    return {
      weeks: baseWeeks,
      budget: convertedBudget,
      screensCount:
        complexity === 'Seed / MVP (8–12 Screens)'
          ? '10–14 Views'
          : complexity === 'Series A Core (20–35 Screens)'
          ? '24–35 Views'
          : '50+ Views & Tokens',
    };
  }, [projectType, complexity, deliverableMode, expeditedTrack, fxMultiplier]);

  const handleIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) return;
    setIntakeSubmitted(true);
  };

  return (
    <div
      id="craftvector-engagement"
      className={`transition-colors duration-200 border-b ${
        isDark
          ? 'bg-[#09090B] border-zinc-800/80 text-[#FAFAFA]'
          : 'bg-white border-zinc-200 text-[#09090B]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-16">
        {/* =================================================================== */}
        {/* 5. ENGAGEMENT MODELS & RETAINER TIERS                               */}
        {/* =================================================================== */}
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs font-mono" style={{ color: accentHex }}>
                04. ENGAGEMENT MODELS &amp; PRODUCT PARTNERSHIP TIERS
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                <EditableText
                  itemKey="craftvector_engagement_title"
                  defaultValue={title}
                />
              </h2>
              <p className={`text-sm ${isDark ? 'text-[#A1A1AA]' : 'text-zinc-600'}`}>
                <EditableText
                  itemKey="craftvector_engagement_subtitle"
                  defaultValue={subtitle}
                />
              </p>
            </div>

            {/* Currency Toggle */}
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-mono opacity-70">Currency:</span>
              <div
                className={`inline-flex p-1 rounded-xl border font-mono text-xs ${
                  isDark ? 'bg-[#18181B] border-zinc-800' : 'bg-[#F4F4F5] border-zinc-200'
                }`}
              >
                {(['USD', 'EUR'] as const).map((cur) => (
                  <button
                    key={cur}
                    type="button"
                    onClick={() => setCurrencyMode(cur)}
                    className={`px-3 py-1 rounded-lg cursor-pointer transition-colors ${
                      currencyMode === cur ? 'text-white font-bold' : 'opacity-65'
                    }`}
                    style={currencyMode === cur ? { backgroundColor: accentHex } : undefined}
                  >
                    {cur} ({cur === 'USD' ? '$' : '€'})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3-Column Engagement Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {engagementTiers.map((tier) => {
              const isSelected = selectedModel === tier.id;
              const convertedPrice = Math.round(tier.baseUsd * fxMultiplier).toLocaleString();

              return (
                <div
                  key={tier.id}
                  onClick={() => setSelectedModel(tier.id)}
                  className={`rounded-2xl border p-6 sm:p-7 flex flex-col justify-between space-y-6 transition-all duration-200 cursor-pointer ${
                    isDark ? 'bg-[#18181B]' : 'bg-[#F4F4F5]'
                  } ${
                    isSelected
                      ? 'ring-2 ring-indigo-500 border-indigo-500 shadow-xl'
                      : isDark
                      ? 'border-zinc-800 hover:border-zinc-700'
                      : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2 text-xs font-mono">
                      <span style={{ color: accentHex }}>{tier.badge}</span>
                      {tier.featured && (
                        <span className="text-emerald-500 font-semibold">
                          1 Q4 Slot Open
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold">{tier.name}</h3>
                      <p
                        className={`text-xs mt-1 leading-relaxed ${
                          isDark ? 'text-[#A1A1AA]' : 'text-zinc-600'
                        }`}
                      >
                        {tier.targetAudience}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-zinc-500/20 flex items-baseline gap-1.5 font-mono tabular-nums">
                      <span className="text-3xl font-bold">
                        {sym}
                        {convertedPrice}
                      </span>
                      <span className="text-xs opacity-65">{tier.billingUnit}</span>
                    </div>

                    <div className="text-xs font-mono text-emerald-500">
                      SLA: {tier.turnaround}
                    </div>

                    <ul className="space-y-2.5 pt-2 text-xs">
                      {tier.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <Check
                            size={14}
                            className="shrink-0 mt-0.5"
                            style={{ color: accentHex }}
                          />
                          <span className="opacity-90 leading-relaxed">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedModel(tier.id);
                      const el = document.getElementById('craftvector-intake-drawer');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'text-white shadow-md'
                        : isDark
                        ? 'bg-[#09090B] text-zinc-200 border border-zinc-800 hover:border-zinc-700'
                        : 'bg-white text-zinc-900 border border-zinc-300 hover:border-zinc-400'
                    }`}
                    style={isSelected ? { backgroundColor: accentHex } : undefined}
                  >
                    <span>Select {tier.name}</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* =================================================================== */}
        {/* INTERACTIVE PROJECT SCOPE CALCULATOR + BOOKING INTAKE DRAWER        */}
        {/* =================================================================== */}
        <div
          id="craftvector-intake-drawer"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 border-t border-zinc-500/20"
        >
          {/* Left 6 Columns: Interactive Project Scope & Timeline Estimator */}
          <div
            className={`lg:col-span-6 rounded-2xl border p-6 sm:p-8 space-y-6 ${
              isDark ? 'bg-[#18181B] border-zinc-800' : 'bg-[#F4F4F5] border-zinc-200'
            }`}
          >
            <div className="space-y-1.5">
              <div className="text-xs font-mono" style={{ color: accentHex }}>
                INTERACTIVE PROJECT SCOPE &amp; TIMELINE CALCULATOR
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">
                Configure Your Product Deliverable &amp; Sprint Estimate
              </h3>
              <p className={`text-xs ${isDark ? 'text-[#A1A1AA]' : 'text-zinc-600'}`}>
                Select your product surface, complexity tier, and code handoff depth to calculate an
                instant timeline and budget benchmark.
              </p>
            </div>

            {/* Control 1: Project Surface Type */}
            <div className="space-y-2">
              <label className="block text-xs font-mono opacity-80">
                01. SELECT PRODUCT SURFACE
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    'Web App / B2B SaaS',
                    'Mobile App (iOS/Android)',
                    'Design System',
                    'UX Audit & Conversion',
                  ] as ScopeProjectType[]
                ).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setProjectType(type)}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                      projectType === type
                        ? 'text-white font-semibold border-transparent'
                        : isDark
                        ? 'bg-[#09090B] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                        : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300'
                    }`}
                    style={projectType === type ? { backgroundColor: accentHex } : undefined}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Product Complexity */}
            <div className="space-y-2">
              <label className="block text-xs font-mono opacity-80">
                02. ARCHITECTURE DEPTH &amp; SCREEN VOLUME
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(
                  [
                    'Seed / MVP (8–12 Screens)',
                    'Series A Core (20–35 Screens)',
                    'Enterprise Suite (50+ Screens)',
                  ] as ScopeComplexity[]
                ).map((comp) => (
                  <button
                    key={comp}
                    type="button"
                    onClick={() => setComplexity(comp)}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                      complexity === comp
                        ? 'text-white font-semibold border-transparent'
                        : isDark
                        ? 'bg-[#09090B] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                        : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300'
                    }`}
                    style={complexity === comp ? { backgroundColor: accentHex } : undefined}
                  >
                    {comp}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: Deliverable Format */}
            <div className="space-y-2">
              <label className="block text-xs font-mono opacity-80">
                03. ENGINEERING HANDOFF FORMAT
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(
                  [
                    'Figma + Interactive Prototype',
                    'Figma + Tokenized React/Tailwind PRs',
                  ] as ScopeDeliverable[]
                ).map((deliv) => (
                  <button
                    key={deliv}
                    type="button"
                    onClick={() => setDeliverableMode(deliv)}
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer ${
                      deliverableMode === deliv
                        ? 'text-white font-semibold border-transparent'
                        : isDark
                        ? 'bg-[#09090B] border-zinc-800 text-zinc-300 hover:border-zinc-700'
                        : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300'
                    }`}
                    style={deliverableMode === deliv ? { backgroundColor: accentHex } : undefined}
                  >
                    {deliv}
                  </button>
                ))}
              </div>
            </div>

            {/* Expedited YC Demo Day Toggle */}
            <label
              className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer ${
                isDark ? 'bg-[#09090B] border-zinc-800' : 'bg-white border-zinc-200'
              }`}
            >
              <div>
                <div className="text-xs font-semibold">
                  Expedited Founder / Demo Day Track (-30% Timeline)
                </div>
                <div className="text-[11px] opacity-65 font-mono">
                  Prioritized weekend &amp; daily async sprint drops
                </div>
              </div>
              <input
                type="checkbox"
                checked={expeditedTrack}
                onChange={(e) => setExpeditedTrack(e.target.checked)}
                className="w-4 h-4 accent-indigo-500"
              />
            </label>

            {/* Computed Estimate Output Box */}
            <div
              className={`p-5 rounded-xl border grid grid-cols-3 gap-4 font-mono tabular-nums ${
                isDark ? 'bg-[#09090B] border-zinc-800' : 'bg-white border-zinc-200'
              }`}
            >
              <div>
                <div className="text-[10px] opacity-60">EST. TIMELINE</div>
                <div className="text-xl sm:text-2xl font-bold mt-0.5">
                  {scopeEstimation.weeks} Weeks
                </div>
              </div>
              <div>
                <div className="text-[10px] opacity-60">SCOPE VOLUME</div>
                <div className="text-sm sm:text-base font-bold mt-1">
                  {scopeEstimation.screensCount}
                </div>
              </div>
              <div>
                <div className="text-[10px] opacity-60">EST. INVESTMENT</div>
                <div
                  className="text-xl sm:text-2xl font-bold mt-0.5"
                  style={{ color: accentHex }}
                >
                  {sym}
                  {scopeEstimation.budget.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Right 6 Columns: Frictionless Project Intake & Calendar Booking Form */}
          <div
            className={`lg:col-span-6 rounded-2xl border p-6 sm:p-8 space-y-6 ${
              isDark ? 'bg-[#18181B] border-zinc-800' : 'bg-[#F4F4F5] border-zinc-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="text-xs font-mono" style={{ color: accentHex }}>
                  DIRECT PROJECT INTAKE &amp; DISCOVERY CALL SCHEDULER
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mt-1">
                  Lock In Your Q4 Discovery Slot or Async Audit
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-500 shrink-0">
                Replies &lt; 6 hrs
              </span>
            </div>

            {intakeSubmitted ? (
              <div
                className={`p-6 rounded-xl border space-y-4 ${
                  isDark ? 'bg-[#09090B] border-emerald-500/40' : 'bg-white border-emerald-500/40'
                }`}
              >
                <div className="flex items-center gap-2.5 text-emerald-500 font-bold text-base">
                  <CheckCircle2 size={20} />
                  <span>Discovery Brief &amp; Calendar Hold Confirmed!</span>
                </div>
                <p className="text-xs leading-relaxed opacity-85">
                  Thank you, <span className="font-semibold">{clientName}</span>. Your custom scope
                  profile (<span className="font-mono">{projectType}</span> ·{' '}
                  <span className="font-mono">
                    {sym}
                    {scopeEstimation.budget.toLocaleString()}
                  </span>
                  ) and preferred slot (<span className="font-mono">{selectedTimezoneSlot}</span>)
                  have been dispatched to <span className="font-mono">{clientEmail}</span> with a
                  Google Meet &amp; Figma preparation link.
                </p>
                <button
                  type="button"
                  onClick={() => setIntakeSubmitted(false)}
                  className="px-4 py-2 rounded-lg text-xs font-mono border border-zinc-500/30 cursor-pointer"
                >
                  Modify Brief or Schedule Another Slot
                </button>
              </div>
            ) : (
              <form onSubmit={handleIntakeSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-mono opacity-80">
                      YOUR NAME &amp; ROLE *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Alex Rivera · Co-Founder / VP Product"
                      className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none ${
                        isDark
                          ? 'bg-[#09090B] border-zinc-800 text-white'
                          : 'bg-white border-zinc-300 text-zinc-900'
                      }`}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block font-mono opacity-80">
                      WORK EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="alex@company.ai"
                      className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none ${
                        isDark
                          ? 'bg-[#09090B] border-zinc-800 text-white'
                          : 'bg-white border-zinc-300 text-zinc-900'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-mono opacity-80">
                      PRODUCT URL / FIGMA / GITHUB REPO
                    </label>
                    <input
                      type="text"
                      value={companyUrl}
                      onChange={(e) => setCompanyUrl(e.target.value)}
                      placeholder="https://app.yourproduct.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none font-mono ${
                        isDark
                          ? 'bg-[#09090B] border-zinc-800 text-white'
                          : 'bg-white border-zinc-300 text-zinc-900'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono opacity-80">
                      PREFERRED TIMEZONE OVERLAP SLOT
                    </label>
                    <select
                      value={selectedTimezoneSlot}
                      onChange={(e) => setSelectedTimezoneSlot(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none font-mono ${
                        isDark
                          ? 'bg-[#09090B] border-zinc-800 text-white'
                          : 'bg-white border-zinc-300 text-zinc-900'
                      }`}
                    >
                      <option value="Tue / Thu · 09:30 AM EST (14:30 UTC)">
                        US East / EU · 09:30 AM EST (14:30 UTC)
                      </option>
                      <option value="Mon / Wed · 08:00 AM PST (16:00 UTC)">
                        US West / SF · 08:00 AM PST (16:00 UTC)
                      </option>
                      <option value="Daily · 10:00 AM GMT / London">
                        UK / Europe · 10:00 AM GMT / CET
                      </option>
                      <option value="Async Loom Video Audit (No Call Needed)">
                        Async Loom UX Teardown (No Live Call Needed)
                      </option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono opacity-80">
                    PROJECT GOALS, METRICS &amp; CURRENT BOTTLENECKS
                  </label>
                  <textarea
                    rows={3}
                    value={projectBrief}
                    onChange={(e) => setProjectBrief(e.target.value)}
                    placeholder="Tell me about your product stage, core activation bottlenecks, or design system goals..."
                    className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none ${
                      isDark
                        ? 'bg-[#09090B] border-zinc-800 text-white'
                        : 'bg-white border-zinc-300 text-zinc-900'
                    }`}
                  />
                </div>

                {/* Attached Calculator Summary Line */}
                <div
                  className={`p-3 rounded-xl border text-[11px] font-mono flex flex-wrap items-center justify-between gap-2 ${
                    isDark ? 'bg-[#09090B] border-zinc-800' : 'bg-white border-zinc-200'
                  }`}
                >
                  <span>
                    Attached Spec: {projectType} · {complexity}
                  </span>
                  <span style={{ color: accentHex }} className="font-bold">
                    Est. {sym}
                    {scopeEstimation.budget.toLocaleString()} ({scopeEstimation.weeks} wks)
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.98] cursor-pointer"
                  style={{ backgroundColor: accentHex }}
                >
                  <Send size={14} />
                  <span>Confirm Discovery Call &amp; Send Scope Brief</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
