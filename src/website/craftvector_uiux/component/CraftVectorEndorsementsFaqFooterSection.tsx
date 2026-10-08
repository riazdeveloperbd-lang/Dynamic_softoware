import React, { useState } from 'react';
import {
  Quote,
  ChevronRight,
  Copy,
  Check,
  ArrowUpRight,
  Layers,
  Terminal,
  FileCode2,
  Sun,
  Moon,
  Download,
  CheckCircle2,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';

export interface CraftVectorEndorsementsFaqFooterSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export const CraftVectorEndorsementsFaqFooterSection: React.FC<
  CraftVectorEndorsementsFaqFooterSectionProps
> = ({ title, subtitle, variant, primaryColor, isDark = true, onToggleTheme }) => {
  const accentHex = primaryColor || (isDark ? '#6366F1' : '#4F46E5');

  const [openFaqIdx, setOpenFaqIdx] = useState<number>(0);
  const [copiedFooterEmail, setCopiedFooterEmail] = useState<boolean>(false);
  const [auditEmail, setAuditEmail] = useState<string>('');
  const [auditRequested, setAuditRequested] = useState<boolean>(false);

  const endorsements = [
    {
      quote:
        '“Rafiq is the rarest breed of Staff Product Designer: he thinks in systems, obsesses over activation metrics, and ships clean React + Tailwind PRs that our engineers merge without a single layout revision. Our KYB onboarding conversion jumped +42% within 6 weeks of launch.”',
      author: 'Marcus Vance',
      role: 'Co-Founder & CTO · VelocePay (YC W22, San Francisco)',
      metric: '+42% KYB Conversion · 48 Tokenized Components',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
    },
    {
      quote:
        '“Most designers hand over static Figma frames that break as soon as real LLM streaming data hits the DOM. Rafiq architected our entire multi-agent trace flamegraph, keyboard shortcuts, and W3C token pipeline—directly helping us close our $18M Series A.”',
      author: 'Dr. Elena Rostova',
      role: 'VP of Engineering · CortexOps AI (London)',
      metric: '3.2x Daily Active Engineers · $18M Series A',
      avatar:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=240&q=80',
    },
    {
      quote:
        '“Unifying 4 acquired enterprise products into one accessible design system seemed like an 18-month slog. Rafiq delivered the Prism Figma Variable architecture and Radix/Storybook kit in 14 weeks, cutting our UI cycle time by 2.4x.”',
      author: 'Devon K. Sterling',
      role: 'Head of Product · Prism Enterprise Cloud (New York)',
      metric: '96.4% Token Adoption · 100/100 Lighthouse A11y',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
    },
  ];

  const toolingGroups = [
    {
      category: '01 · DESIGN & SYSTEMS',
      tools: 'Figma Variables · Auto-Layout 5.0 · Tokens Studio (W3C) · FigJam · ProtoPie',
    },
    {
      category: '02 · FRONT-END & HANDOFF',
      tools: 'React 19 · TypeScript · Tailwind CSS v4 · Radix Primitives · Storybook 8 · Framer Motion',
    },
    {
      category: '03 · PRODUCT ANALYTICS & QA',
      tools: 'PostHog · Fullstory · Maze Usability · Linear · GitHub Pull Requests · Chromatic',
    },
  ];

  const faqs = [
    {
      q: 'How do you handle timezone overlap with US (EST/PST) and European (GMT/CET) engineering teams?',
      a: 'I maintain dedicated synchronous overlap blocks from 08:00 AM to 03:30 PM EST (13:00–20:30 UTC) every weekday for live standups, design critiques, and pairing sessions. Outside live blocks, every Figma milestone and PR ships with a crisp 3-minute Loom architectural walkthrough.',
    },
    {
      q: 'Do you only deliver Figma files, or can you also ship production React / Tailwind / Storybook code?',
      a: 'Both. Depending on your team’s velocity needs, I either deliver developer-ready Figma files with strict W3C Design Token JSON and Dev Mode specs, or I open pull requests directly in your repository with accessible React + TypeScript + Tailwind CSS components.',
    },
    {
      q: 'What does the first 72 hours of an MVP Sprint or Monthly Product Retainer look like?',
      a: 'Day 1 starts with an async onboarding inside your Slack, Linear, and PostHog/Fullstory workspace. Within 48–72 hours, you receive a comprehensive UX Friction & Token Audit along with the first interactive wireframes or high-craft UI explorations.',
    },
    {
      q: 'Are you available for full-time remote Staff / Founding Designer roles as well as retainers?',
      a: 'Yes. I am currently open to high-impact remote Staff/Principal IC or Founding Designer roles at global B2B SaaS, AI, and Fintech companies, alongside 1 dedicated monthly retainer slot.',
    },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('rafiq.arman@craftvector.design');
    setCopiedFooterEmail(true);
    setTimeout(() => setCopiedFooterEmail(false), 2000);
  };

  const handleRequestChecklist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditEmail.trim()) return;
    setAuditRequested(true);
    setAuditEmail('');
  };

  return (
    <div
      id="craftvector-endorsements"
      className={`transition-colors duration-200 ${
        isDark ? 'bg-[#09090B] text-[#FAFAFA]' : 'bg-white text-[#09090B]'
      }`}
    >
      {/* ===================================================================== */}
      {/* 6. FOUNDER & ENGINEERING LEADER ENDORSEMENTS + TOOLING MATRIX         */}
      {/* ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-12">
        <div className="space-y-2 max-w-2xl">
          <div className="text-xs font-mono" style={{ color: accentHex }}>
            05. VERIFIED ENDORSEMENTS &amp; TECHNICAL STACK
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
            <EditableText
              itemKey="craftvector_endorsements_title"
              defaultValue={title}
            />
          </h2>
          <p className={`text-sm ${isDark ? 'text-[#A1A1AA]' : 'text-zinc-600'}`}>
            <EditableText
              itemKey="craftvector_endorsements_subtitle"
              defaultValue={subtitle}
            />
          </p>
        </div>

        {/* 3-Column Founder & VP Engineering Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {endorsements.map((item) => (
            <div
              key={item.author}
              className={`rounded-2xl border p-6 flex flex-col justify-between space-y-6 transition-colors ${
                isDark ? 'bg-[#18181B] border-zinc-800' : 'bg-[#F4F4F5] border-zinc-200'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <Quote size={18} style={{ color: accentHex }} />
                  <span className="text-emerald-500 font-semibold">{item.metric}</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed opacity-90">{item.quote}</p>
              </div>

              <div className="pt-4 border-t border-zinc-500/20 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-10 h-10 rounded-full object-cover border border-zinc-500/30"
                />
                <div>
                  <div className="text-xs font-bold">{item.author}</div>
                  <div
                    className={`text-[11px] font-mono ${
                      isDark ? 'text-[#A1A1AA]' : 'text-zinc-600'
                    }`}
                  >
                    {item.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clean Unboxed Technical & Design Stack Matrix */}
        <div
          className={`rounded-2xl border p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 ${
            isDark ? 'bg-[#18181B] border-zinc-800' : 'bg-[#F4F4F5] border-zinc-200'
          }`}
        >
          {toolingGroups.map((group) => (
            <div key={group.category} className="space-y-2">
              <div className="text-xs font-mono font-bold" style={{ color: accentHex }}>
                {group.category}
              </div>
              <p
                className={`text-xs font-mono leading-relaxed ${
                  isDark ? 'text-zinc-300' : 'text-zinc-700'
                }`}
              >
                {group.tools}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ Accordion + Free UX & Design System Audit Lead Magnet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-mono mb-2" style={{ color: accentHex }}>
              FREQUENTLY ASKED QUESTIONS BY FOUNDERS &amp; HIRING MANAGERS
            </div>
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={faq.q}
                  className={`rounded-xl border p-4 transition-colors ${
                    isDark ? 'bg-[#18181B] border-zinc-800' : 'bg-[#F4F4F5] border-zinc-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                    className="w-full flex items-center justify-between gap-4 text-left text-xs sm:text-sm font-bold cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight
                      size={16}
                      className={`shrink-0 transition-transform duration-150 ${
                        isOpen ? 'rotate-90' : ''
                      }`}
                      style={{ color: accentHex }}
                    />
                  </button>
                  {isOpen && (
                    <p
                      className={`text-xs leading-relaxed mt-3 pt-3 border-t border-zinc-500/20 ${
                        isDark ? 'text-[#A1A1AA]' : 'text-zinc-600'
                      }`}
                    >
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right 5 Columns: Lead Magnet — 2026 B2B SaaS Design System & WCAG Checklist */}
          <div
            className={`lg:col-span-5 rounded-2xl border p-6 sm:p-7 space-y-5 ${
              isDark ? 'bg-[#18181B] border-zinc-800' : 'bg-[#F4F4F5] border-zinc-200'
            }`}
          >
            <div className="text-xs font-mono" style={{ color: accentHex }}>
              FREE FIGMA + REACT RESOURCE KIT
            </div>
            <h3 className="text-xl font-bold leading-snug">
              Download the 84-Point B2B SaaS UX &amp; W3C Design Token Audit Checklist
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-[#A1A1AA]' : 'text-zinc-600'}`}>
              Used by 30+ YC and Series A engineering teams to audit dark-mode optical contrast,
              nested border-radius math, and keyboard command accessibility.
            </p>

            {auditRequested ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 flex items-center gap-2 font-mono">
                <CheckCircle2 size={16} />
                <span>Sent Figma Community &amp; Notion Checklist link to your inbox!</span>
              </div>
            ) : (
              <form onSubmit={handleRequestChecklist} className="space-y-2.5">
                <input
                  type="email"
                  required
                  value={auditEmail}
                  onChange={(e) => setAuditEmail(e.target.value)}
                  placeholder="Enter your work email (e.g., cto@startup.com)"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none ${
                    isDark
                      ? 'bg-[#09090B] border-zinc-800 text-white'
                      : 'bg-white border-zinc-300 text-zinc-900'
                  }`}
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2 cursor-pointer"
                  style={{ backgroundColor: accentHex }}
                >
                  <Download size={14} />
                  <span>Get Instant Figma &amp; Token Kit</span>
                </button>
              </form>
            )}

            <div className="text-[11px] font-mono opacity-65">
              Includes: Style Dictionary Config · Radix Focus Tokens · Tabular Numeral Spec
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 7. MINIMALIST HIGH-CRAFT FOOTER                                       */}
      {/* ===================================================================== */}
      <footer
        className={`border-t py-12 ${
          isDark ? 'border-zinc-800/80 bg-[#070709]' : 'border-zinc-200 bg-[#FAFAFA]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-zinc-500/20">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: accentHex }}
                >
                  <Layers size={15} />
                </div>
                <span className="text-base font-bold tracking-tight">
                  CRAFTVECTOR // RAFIQ ARMAN
                </span>
              </div>
              <p className={`text-xs font-mono ${isDark ? 'text-[#A1A1AA]' : 'text-zinc-600'}`}>
                Staff UI/UX &amp; Digital Product Designer · B2B SaaS, Fintech &amp; Design Systems
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCopyEmail}
                className={`px-3.5 py-2 rounded-lg text-xs font-mono border flex items-center gap-2 cursor-pointer ${
                  isDark
                    ? 'bg-[#18181B] border-zinc-800 text-zinc-200 hover:border-zinc-700'
                    : 'bg-white border-zinc-200 text-zinc-800 hover:border-zinc-300'
                }`}
              >
                {copiedFooterEmail ? (
                  <>
                    <Check size={13} className="text-emerald-500" />
                    <span className="text-emerald-500">Copied: rafiq.arman@craftvector.design</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>rafiq.arman@craftvector.design</span>
                  </>
                )}
              </button>

              {onToggleTheme && (
                <button
                  type="button"
                  onClick={onToggleTheme}
                  className={`px-3.5 py-2 rounded-lg text-xs font-mono border flex items-center gap-2 cursor-pointer ${
                    isDark
                      ? 'bg-[#18181B] border-zinc-800 text-zinc-200'
                      : 'bg-white border-zinc-200 text-zinc-800'
                  }`}
                >
                  {isDark ? <Sun size={13} className="text-amber-400" /> : <Moon size={13} />}
                  <span>{isDark ? 'Switch to Crisp Light' : 'Switch to Obsidian Dark'}</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono opacity-65">
            <div>
              © {new Date().getFullYear()} CraftVector Studio (Rafiq Arman). Built with React 19,
              TypeScript &amp; W3C Design Tokens.
            </div>
            <div className="flex items-center gap-4">
              <span>Figma (@craftvector)</span>
              <span>·</span>
              <span>GitHub</span>
              <span>·</span>
              <span>Read.cv</span>
              <span>·</span>
              <span>LinkedIn</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
