import React, { useState } from 'react';
import {
  Command,
  Search,
  SlidersHorizontal,
  Sparkles,
  Check,
  Copy,
  Terminal,
  Layers,
  Code2,
  Eye,
  ArrowUpRight,
  Zap,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';

export interface CraftVectorPlaygroundProcessSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
}

export const CraftVectorPlaygroundProcessSection: React.FC<
  CraftVectorPlaygroundProcessSectionProps
> = ({ title, subtitle, variant, primaryColor, isDark = true }) => {
  const accentHex = primaryColor || (isDark ? '#6366F1' : '#4F46E5');

  // Interactive Component 1: Command Palette (Cmd+K) Sandbox State
  const [cmdQuery, setCmdQuery] = useState('');
  const [selectedCmdIndex, setSelectedCmdIndex] = useState(0);
  const [lastExecutedCmd, setLastExecutedCmd] = useState<string>(
    'Triggered: Sync Figma Variables to GitHub PR #412'
  );

  // Interactive Component 2: Token Scale & Radius Live Configurator
  const [tokenRadius, setTokenRadius] = useState<4 | 8 | 12 | 16>(12);
  const [tokenDensity, setTokenDensity] = useState<'compact' | 'default' | 'spacious'>('default');
  const [highContrastFocus, setHighContrastFocus] = useState<boolean>(true);
  const [copiedTokenJson, setCopiedTokenJson] = useState<boolean>(false);

  // Interactive Component 3: Micro-Interaction Spring Physics & Optimistic State Toggle
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [seatCount, setSeatCount] = useState<number>(25);
  const [autoProvisionSso, setAutoProvisionSso] = useState<boolean>(true);
  const [auditLogRetention, setAuditLogRetention] = useState<boolean>(true);

  // Interactive 4-Step Process Active Tab
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const commandActions = [
    {
      id: 'sync-tokens',
      label: 'Sync Figma Variable Collection → GitHub PR #412',
      shortcut: '⌘ S',
      category: 'Design Systems',
    },
    {
      id: 'audit-wcag',
      label: 'Run WCAG 2.2 AA Contrast & Focus-Ring Audit',
      shortcut: '⌘ ⇧ A',
      category: 'Accessibility',
    },
    {
      id: 'export-radix',
      label: 'Generate Headless Radix + Tailwind v4 Primitive',
      shortcut: '⌘ E',
      category: 'Code Handoff',
    },
    {
      id: 'switch-theme',
      label: 'Toggle Obsidian (#09090B) / Crisp Light (#FFFFFF) Preview',
      shortcut: '⌘ D',
      category: 'Theme Engine',
    },
  ];

  const filteredCommands = commandActions.filter(
    (item) =>
      item.label.toLowerCase().includes(cmdQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(cmdQuery.toLowerCase())
  );

  const generatedTokenJson = `{
  "theme": "${isDark ? 'obsidian-dark' : 'crisp-light'}",
  "canvas": "${isDark ? '#09090B' : '#FFFFFF'}",
  "surfaceCard": "${isDark ? '#18181B' : '#F4F4F5'}",
  "accentPrimary": "${accentHex}",
  "radiusOuter": "${tokenRadius}px",
  "radiusInner": "${Math.max(2, tokenRadius - 4)}px",
  "density": "${tokenDensity}",
  "wcagFocusRing": "${highContrastFocus ? '2px solid ' + accentHex : '1px solid zinc-500'}"
}`;

  const handleCopyTokens = () => {
    navigator.clipboard?.writeText(generatedTokenJson);
    setCopiedTokenJson(true);
    setTimeout(() => setCopiedTokenJson(false), 1800);
  };

  const perSeatRate = billingCycle === 'annual' ? 38 : 48;
  const computedMrr =
    seatCount * perSeatRate + (autoProvisionSso ? 150 : 0) + (auditLogRetention ? 90 : 0);

  const workflowSteps = [
    {
      num: '01.',
      phase: 'Discovery & Product Audit',
      duration: 'Days 1–5',
      summary:
        'Deep-dive alignment on business KPIs, Fullstory/PostHog funnel drop-offs, heuristic UX teardown, and technical constraints with founders and engineering leads.',
      deliverables: [
        'Quantitative Funnel & Session Replay Friction Audit',
        'Jobs-to-be-Done (JTBD) & Persona Synthesis Deck',
        'Prioritized Quick-Win vs. Core Architecture Roadmap',
      ],
      tooling: 'Linear · PostHog · FigJam · Loom Async Briefs',
    },
    {
      num: '02.',
      phase: 'Architecture & Wireframing',
      duration: 'Weeks 2–3',
      summary:
        'Rapid low-latency information architecture, multi-state user flows, edge-case mapping (empty, loading, error, permission-denied states), and interactive prototypes.',
      deliverables: [
        'End-to-End Information Architecture & State Machine Flows',
        'Interactive Clickable Wireframes for User Validation',
        'Keyboard Shortcut & Command-Palette Taxonomy',
      ],
      tooling: 'Figma Auto-Layout · Maze Usability Testing · Whimsical',
    },
    {
      num: '03.',
      phase: 'High-Craft UI & Design Systems',
      duration: 'Weeks 4–6',
      summary:
        'Pixel-perfect visual design in both Obsidian Dark and Crisp Light modes, backed by W3C Figma Variables, strict 8px spatial math, and reusable component libraries.',
      deliverables: [
        'Multi-Mode Figma Variable Tokens (Dark/Light/High-Contrast)',
        'WCAG AA/AAA Verified Component Library & Variants',
        'Micro-Interaction & Spring Physics Motion Specs',
      ],
      tooling: 'Figma Variables · Tokens Studio · Framer Motion',
    },
    {
      num: '04.',
      phase: 'Engineering Handoff & QA',
      duration: 'Ongoing / Sprint Sync',
      summary:
        'Zero-friction developer handoff with annotated redlines, production React/TypeScript/Tailwind PR reviews, and pixel-level staging QA before launch.',
      deliverables: [
        'Production-Ready React + Tailwind v4 / Storybook Components',
        'Annotated Dev Mode Specs, CSS Variables & API State Contracts',
        'Live PR Design QA & Post-Launch Conversion Monitoring',
      ],
      tooling: 'React 19 · TypeScript · Tailwind CSS · Storybook · GitHub PRs',
    },
  ];

  return (
    <div
      className={`transition-colors duration-200 border-b ${
        isDark
          ? 'bg-[#09090B] border-zinc-800/80 text-[#FAFAFA]'
          : 'bg-white border-zinc-200 text-[#09090B]'
      }`}
    >
      {/* ===================================================================== */}
      {/* 3. INTERACTIVE COMPONENT PLAYGROUND & DESIGN SYSTEM SANDBOX           */}
      {/* ===================================================================== */}
      <section
        id="craftvector-playground"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-10"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-mono" style={{ color: accentHex }}>
              02. INTERACTIVE COMPONENT PLAYGROUND &amp; DESIGN SYSTEM SANDBOX
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              <EditableText
                itemKey="craftvector_playground_title"
                defaultValue={title}
              />
            </h2>
            <p className={`text-sm ${isDark ? 'text-[#A1A1AA]' : 'text-zinc-600'}`}>
              <EditableText
                itemKey="craftvector_playground_subtitle"
                defaultValue={subtitle}
              />
            </p>
          </div>

          <div className="text-xs font-mono opacity-75">
            All 3 widgets below are live React primitives — test keyboard, tokens &amp; state
          </div>
        </div>

        {/* 3-Column Bento Grid of Live Interactive UI Components */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* WIDGET 1: Live Keyboard-First Command Palette (Cmd+K) */}
          <div
            className={`rounded-2xl border p-6 flex flex-col justify-between space-y-5 transition-colors ${
              isDark ? 'bg-[#18181B] border-zinc-800' : 'bg-[#F4F4F5] border-zinc-200'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span style={{ color: accentHex }}>01 · COMMAND PALETTE (⌘K)</span>
                <span className="opacity-65">Zero-Latency Filter</span>
              </div>

              <div
                className={`rounded-xl border overflow-hidden ${
                  isDark ? 'bg-[#09090B] border-zinc-800' : 'bg-white border-zinc-200'
                }`}
              >
                <div className="px-3.5 py-2.5 border-b border-zinc-500/20 flex items-center gap-2">
                  <Search size={14} className="opacity-50" />
                  <input
                    type="text"
                    value={cmdQuery}
                    onChange={(e) => {
                      setCmdQuery(e.target.value);
                      setSelectedCmdIndex(0);
                    }}
                    placeholder="Type a command (e.g., Figma, WCAG, Radix)..."
                    className="w-full bg-transparent text-xs focus:outline-none font-mono"
                  />
                  {cmdQuery && (
                    <button
                      type="button"
                      onClick={() => setCmdQuery('')}
                      className="text-[10px] font-mono opacity-60 hover:opacity-100 cursor-pointer"
                    >
                      ESC
                    </button>
                  )}
                </div>

                <div className="p-1.5 space-y-1 max-h-48 overflow-y-auto">
                  {filteredCommands.length === 0 ? (
                    <div className="py-6 text-center text-xs font-mono opacity-50">
                      No matching commands found.
                    </div>
                  ) : (
                    filteredCommands.map((cmd, idx) => {
                      const isSelected = idx === selectedCmdIndex;
                      return (
                        <button
                          key={cmd.id}
                          type="button"
                          onClick={() => {
                            setSelectedCmdIndex(idx);
                            setLastExecutedCmd(`Executed: ${cmd.label}`);
                          }}
                          className={`w-full px-3 py-2 rounded-lg text-left text-xs flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                            isSelected
                              ? 'text-white font-medium'
                              : isDark
                              ? 'text-zinc-300 hover:bg-zinc-900'
                              : 'text-zinc-700 hover:bg-zinc-100'
                          }`}
                          style={isSelected ? { backgroundColor: accentHex } : undefined}
                        >
                          <span className="truncate">{cmd.label}</span>
                          <span
                            className={`text-[10px] font-mono shrink-0 ${
                              isSelected ? 'text-white/90' : 'opacity-60'
                            }`}
                          >
                            {cmd.shortcut}
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            <div
              className={`px-3.5 py-2.5 rounded-xl border text-[11px] font-mono flex items-center justify-between ${
                isDark ? 'bg-[#09090B] border-zinc-800' : 'bg-white border-zinc-200'
              }`}
            >
              <span className="truncate text-emerald-500">{lastExecutedCmd}</span>
              <span className="opacity-50 shrink-0 ml-2">12ms</span>
            </div>
          </div>

          {/* WIDGET 2: Live Design Token & Nested Radius Math Inspector */}
          <div
            className={`rounded-2xl border p-6 flex flex-col justify-between space-y-5 transition-colors ${
              isDark ? 'bg-[#18181B] border-zinc-800' : 'bg-[#F4F4F5] border-zinc-200'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span style={{ color: accentHex }}>02 · SPATIAL &amp; TOKEN INSPECTOR</span>
                <span className="opacity-65">r_inner = r_outer - pad</span>
              </div>

              {/* Radius & Density Controls */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Outer Border Radius</span>
                  <div className="inline-flex gap-1 font-mono">
                    {([4, 8, 12, 16] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setTokenRadius(r)}
                        className={`px-2 py-1 rounded border text-[11px] cursor-pointer ${
                          tokenRadius === r
                            ? 'text-white font-bold border-transparent'
                            : isDark
                            ? 'bg-[#09090B] border-zinc-800 text-zinc-400'
                            : 'bg-white border-zinc-200 text-zinc-600'
                        }`}
                        style={tokenRadius === r ? { backgroundColor: accentHex } : undefined}
                      >
                        {r}px
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-medium">Container Density</span>
                  <div className="inline-flex gap-1 font-mono">
                    {(['compact', 'default', 'spacious'] as const).map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setTokenDensity(d)}
                        className={`px-2 py-1 rounded border text-[11px] capitalize cursor-pointer ${
                          tokenDensity === d
                            ? 'text-white font-bold border-transparent'
                            : isDark
                            ? 'bg-[#09090B] border-zinc-800 text-zinc-400'
                            : 'bg-white border-zinc-200 text-zinc-600'
                        }`}
                        style={tokenDensity === d ? { backgroundColor: accentHex } : undefined}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Nested Radius Preview Box */}
                <div
                  className={`border transition-all ${
                    isDark ? 'bg-[#09090B] border-zinc-700' : 'bg-white border-zinc-300'
                  } ${
                    tokenDensity === 'compact'
                      ? 'p-2.5'
                      : tokenDensity === 'spacious'
                      ? 'p-5'
                      : 'p-3.5'
                  }`}
                  style={{ borderRadius: `${tokenRadius}px` }}
                >
                  <div
                    className="p-3 text-white flex items-center justify-between text-xs font-mono transition-all"
                    style={{
                      backgroundColor: accentHex,
                      borderRadius: `${Math.max(2, tokenRadius - 4)}px`,
                    }}
                  >
                    <span>Inner Child Surface</span>
                    <span>r={Math.max(2, tokenRadius - 4)}px</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="opacity-70">W3C Token Output</span>
                <button
                  type="button"
                  onClick={handleCopyTokens}
                  className="inline-flex items-center gap-1 underline cursor-pointer"
                >
                  {copiedTokenJson ? 'Copied JSON ✓' : 'Copy W3C JSON'}
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-[#09090B] text-zinc-300 border border-zinc-800 text-[10px] font-mono overflow-x-auto leading-relaxed">
                <code>{generatedTokenJson}</code>
              </pre>
            </div>
          </div>

          {/* WIDGET 3: Interactive B2B SaaS Seat & Telemetry Pricing Micro-Component */}
          <div
            className={`rounded-2xl border p-6 flex flex-col justify-between space-y-5 transition-colors ${
              isDark ? 'bg-[#18181B] border-zinc-800' : 'bg-[#F4F4F5] border-zinc-200'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span style={{ color: accentHex }}>03 · STATEFUL SAAS PRICING WIDGET</span>
                <span className="opacity-65">Tabular Numerals</span>
              </div>

              <div
                className={`p-4 rounded-xl border space-y-4 ${
                  isDark ? 'bg-[#09090B] border-zinc-800' : 'bg-white border-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs opacity-65">Active Team Seats</div>
                    <div className="text-2xl font-bold font-mono tabular-nums">
                      {seatCount} seats
                    </div>
                  </div>
                  <div className="inline-flex p-0.5 rounded-lg border border-zinc-500/25 text-[11px] font-mono">
                    <button
                      type="button"
                      onClick={() => setBillingCycle('monthly')}
                      className={`px-2.5 py-1 rounded-md cursor-pointer ${
                        billingCycle === 'monthly' ? 'text-white font-semibold' : 'opacity-65'
                      }`}
                      style={
                        billingCycle === 'monthly' ? { backgroundColor: accentHex } : undefined
                      }
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => setBillingCycle('annual')}
                      className={`px-2.5 py-1 rounded-md cursor-pointer ${
                        billingCycle === 'annual' ? 'text-white font-semibold' : 'opacity-65'
                      }`}
                      style={
                        billingCycle === 'annual' ? { backgroundColor: accentHex } : undefined
                      }
                    >
                      Annual (-20%)
                    </button>
                  </div>
                </div>

                <input
                  type="range"
                  min={5}
                  max={150}
                  step={5}
                  value={seatCount}
                  onChange={(e) => setSeatCount(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                  aria-label="Adjust active team seats"
                />

                {/* Enterprise Add-on Toggles */}
                <div className="space-y-2 pt-1 border-t border-zinc-500/20 text-xs">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>SAML 2.0 / Okta SCIM Provisioning (+$150)</span>
                    <input
                      type="checkbox"
                      checked={autoProvisionSso}
                      onChange={(e) => setAutoProvisionSso(e.target.checked)}
                      className="accent-indigo-500 w-4 h-4"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>SOC2 Immutable Audit Stream (+$90)</span>
                    <input
                      type="checkbox"
                      checked={auditLogRetention}
                      onChange={(e) => setAuditLogRetention(e.target.checked)}
                      className="accent-indigo-500 w-4 h-4"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border flex items-center justify-between font-mono tabular-nums ${
                isDark ? 'bg-[#09090B] border-zinc-800' : 'bg-white border-zinc-200'
              }`}
            >
              <div>
                <div className="text-[10px] opacity-60">ESTIMATED WORKSPACE TOTAL</div>
                <div className="text-xl font-bold" style={{ color: accentHex }}>
                  ${computedMrr.toLocaleString()}{' '}
                  <span className="text-xs font-normal opacity-65">/ mo</span>
                </div>
              </div>
              <span className="text-xs text-emerald-500 font-semibold">
                {billingCycle === 'annual' ? 'Saves $' + seatCount * 120 + '/yr' : 'Flex Monthly'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. DESIGN PROCESS & ENGINEERING HANDOFF WORKFLOW                      */}
      {/* ===================================================================== */}
      <section
        id="craftvector-workflow"
        className={`border-t py-16 lg:py-24 ${
          isDark ? 'border-zinc-800/80 bg-[#0D0D10]' : 'border-zinc-200 bg-[#FAFAFA]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs font-mono" style={{ color: accentHex }}>
                03. DESIGN PROCESS &amp; ENGINEERING HANDOFF WORKFLOW
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                <EditableText
                  itemKey="craftvector_workflow_heading"
                  defaultValue="Built for High-Velocity Engineering Teams."
                />
              </h2>
              <p className={`text-sm ${isDark ? 'text-[#A1A1AA]' : 'text-zinc-600'}`}>
                No throwaway Dribbble mockups. Every deliverable is architected for clean state
                management, tokenized CSS variables, and direct GitHub pull-request collaboration.
              </p>
            </div>

            {/* Interactive Step Selector Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {workflowSteps.map((st, idx) => (
                <button
                  key={st.num}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors cursor-pointer ${
                    activeStepIndex === idx
                      ? 'text-white font-semibold border-transparent'
                      : isDark
                      ? 'bg-[#18181B] border-zinc-800 text-zinc-400 hover:text-white'
                      : 'bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900'
                  }`}
                  style={activeStepIndex === idx ? { backgroundColor: accentHex } : undefined}
                >
                  {st.num} {st.phase.split('&')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* 4-Step Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step, idx) => {
              const isHighlighted = activeStepIndex === idx;
              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`rounded-2xl border p-6 flex flex-col justify-between space-y-6 transition-all duration-200 cursor-pointer ${
                    isDark ? 'bg-[#18181B]' : 'bg-white'
                  } ${
                    isHighlighted
                      ? 'ring-2 ring-indigo-500/70 border-indigo-500'
                      : isDark
                      ? 'border-zinc-800 hover:border-zinc-700'
                      : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-base font-bold" style={{ color: accentHex }}>
                        {step.num}
                      </span>
                      <span className="opacity-65">{step.duration}</span>
                    </div>

                    <h3 className="text-lg font-bold leading-snug">{step.phase}</h3>

                    <p
                      className={`text-xs leading-relaxed ${
                        isDark ? 'text-[#A1A1AA]' : 'text-zinc-600'
                      }`}
                    >
                      {step.summary}
                    </p>

                    <div className="pt-3 border-t border-zinc-500/20 space-y-2">
                      <div className="text-[11px] font-mono opacity-70">
                        KEY DELIVERABLES:
                      </div>
                      <ul className="space-y-1.5 text-xs">
                        {step.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2">
                            <Check
                              size={13}
                              className="shrink-0 mt-0.5 text-emerald-500"
                            />
                            <span className="opacity-90">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-500/20 text-[11px] font-mono opacity-70">
                    Stack: {step.tooling}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
