import React, { useState } from 'react';
import {
  Layers,
  Terminal,
  Sparkles,
  Sun,
  Moon,
  ArrowUpRight,
  Copy,
  Check,
  FileText,
  Calendar,
  Menu,
  X,
  Command,
  Code2,
  Figma,
  Globe,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';

export interface CraftVectorNavbarProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export const CraftVectorNavbar: React.FC<CraftVectorNavbarProps> = ({
  title,
  subtitle,
  variant,
  primaryColor,
  isDark = true,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeTimezone, setActiveTimezone] = useState<'UTC' | 'EST' | 'PST' | 'BST'>('EST');

  const accentHex = primaryColor || (isDark ? '#6366F1' : '#4F46E5');

  const timezoneMap: Record<'UTC' | 'EST' | 'PST' | 'BST', string> = {
    UTC: '08:00 – 19:00 UTC (Full EU/UK Overlap)',
    EST: '08:30 – 15:30 EST (6h NY/SF Overlap)',
    PST: '06:30 – 12:30 PST (Morning Sync Window)',
    BST: '14:00 – 01:00 BST (Dhaka Studio HQ)',
  };

  const scrollToAnchor = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('rafiq.arman@craftvector.design');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <header
      className={`sticky top-0 z-30 transition-colors duration-200 border-b ${
        isDark
          ? 'bg-[#09090B]/90 border-zinc-800/80 text-[#FAFAFA]'
          : 'bg-white/90 border-zinc-200 text-[#09090B]'
      } backdrop-blur-md`}
    >
      {/* Top Remote Async & Timezone Utility Bar */}
      <div
        className={`border-b transition-colors duration-200 ${
          isDark
            ? 'bg-[#121215] border-zinc-800/70 text-[#A1A1AA]'
            : 'bg-[#F4F4F5] border-zinc-200/80 text-zinc-600'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 font-medium text-emerald-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <EditableText
                itemKey="craftvector_nav_status"
                defaultValue="AVAILABLE FOR Q4 REMOTE PRODUCT DESIGN ROLES & YC SPRINT RETAINERS"
              />
            </span>
            <span className="hidden md:inline opacity-40">·</span>
            <span className="hidden md:inline">
              <EditableText
                itemKey="craftvector_nav_sub"
                defaultValue={subtitle}
              />
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Timezone Selector */}
            <div className="hidden sm:flex items-center gap-1.5">
              <Globe size={12} style={{ color: accentHex }} />
              <span className="opacity-70">Overlap:</span>
              <div
                className={`inline-flex rounded-md p-0.5 border ${
                  isDark ? 'bg-[#09090B] border-zinc-800' : 'bg-white border-zinc-200'
                }`}
              >
                {(['EST', 'PST', 'UTC', 'BST'] as const).map((tz) => (
                  <button
                    key={tz}
                    type="button"
                    onClick={() => setActiveTimezone(tz)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                      activeTimezone === tz
                        ? 'text-white font-semibold'
                        : isDark
                        ? 'text-zinc-400 hover:text-white'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                    style={
                      activeTimezone === tz ? { backgroundColor: accentHex } : undefined
                    }
                  >
                    {tz}
                  </button>
                ))}
              </div>
              <span className="hidden lg:inline text-[10px] opacity-80">
                {timezoneMap[activeTimezone]}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                isDark
                  ? 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/70 text-zinc-300'
                  : 'border-zinc-200 hover:border-zinc-300 bg-white text-zinc-700'
              }`}
              title="Copy direct email"
            >
              {copiedEmail ? (
                <>
                  <Check size={11} className="text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">Copied email</span>
                </>
              ) : (
                <>
                  <Copy size={11} />
                  <span>rafiq.arman@craftvector.design</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-sm relative overflow-hidden"
            style={{ backgroundColor: accentHex }}
          >
            <Layers size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight">
                <EditableText itemKey="craftvector_brand_title" defaultValue={title} />
              </span>
              <span className="text-[11px] font-mono opacity-60 hidden sm:inline">
                / Staff Product Designer &amp; Design Engineer
              </span>
            </div>
            {variant === 'varient_2' && (
              <p className="text-[11px] opacity-60 font-mono">
                Ex-Series B Fintech Lead · Figma Tokens + React/TypeScript
              </p>
            )}
          </div>
        </div>

        {/* Desktop Links (Clean Typography, Zero-Pill Discipline) */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium">
          <button
            type="button"
            onClick={() => scrollToAnchor('craftvector-case-studies')}
            className="opacity-75 hover:opacity-100 transition-opacity cursor-pointer py-1 border-b-2 border-transparent hover:border-current"
          >
            Case Studies (04)
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('craftvector-playground')}
            className="opacity-75 hover:opacity-100 transition-opacity cursor-pointer py-1 border-b-2 border-transparent hover:border-current"
          >
            Component Playground
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('craftvector-workflow')}
            className="opacity-75 hover:opacity-100 transition-opacity cursor-pointer py-1 border-b-2 border-transparent hover:border-current"
          >
            4-Step Process
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('craftvector-engagement')}
            className="opacity-75 hover:opacity-100 transition-opacity cursor-pointer py-1 border-b-2 border-transparent hover:border-current"
          >
            Retainers &amp; Scope
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('craftvector-endorsements')}
            className="opacity-75 hover:opacity-100 transition-opacity cursor-pointer py-1 border-b-2 border-transparent hover:border-current"
          >
            Endorsements
          </button>
        </nav>

        {/* Action Cluster + Dark/Light Mode Switcher */}
        <div className="flex items-center gap-2.5">
          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle Dark or Light Mode"
              className={`p-2 rounded-lg border transition-colors duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-mono ${
                isDark
                  ? 'bg-[#18181B] border-zinc-800 text-zinc-200 hover:border-zinc-700'
                  : 'bg-[#F4F4F5] border-zinc-200 text-zinc-800 hover:border-zinc-300'
              }`}
              title={isDark ? 'Switch to Crisp Light Mode (#FFFFFF)' : 'Switch to Obsidian Dark Mode (#09090B)'}
            >
              {isDark ? (
                <>
                  <Sun size={14} className="text-amber-400" />
                  <span className="hidden sm:inline text-[11px]">Light</span>
                </>
              ) : (
                <>
                  <Moon size={14} style={{ color: accentHex }} />
                  <span className="hidden sm:inline text-[11px]">Obsidian</span>
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={() => setResumeModalOpen(true)}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              isDark
                ? 'bg-[#18181B] border-zinc-800 text-zinc-200 hover:border-zinc-700'
                : 'bg-[#F4F4F5] border-zinc-200 text-zinc-800 hover:border-zinc-300'
            }`}
          >
            <FileText size={13} style={{ color: accentHex }} />
            <span>CV / Read.cv</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToAnchor('craftvector-intake-drawer')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white shadow-sm transition-transform active:scale-95 cursor-pointer"
            style={{ backgroundColor: accentHex }}
          >
            <Calendar size={13} />
            <span>
              <EditableText
                itemKey="craftvector_nav_cta"
                defaultValue="Book Discovery Call"
              />
            </span>
            <ArrowUpRight size={13} />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg border ${
              isDark ? 'border-zinc-800 text-zinc-300' : 'border-zinc-200 text-zinc-700'
            }`}
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-t px-4 py-4 space-y-3 ${
            isDark ? 'bg-[#09090B] border-zinc-800' : 'bg-white border-zinc-200'
          }`}
        >
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            <button
              type="button"
              onClick={() => scrollToAnchor('craftvector-case-studies')}
              className={`p-2.5 rounded-lg text-left border ${
                isDark ? 'bg-[#18181B] border-zinc-800' : 'bg-[#F4F4F5] border-zinc-200'
              }`}
            >
              01. Case Studies
            </button>
            <button
              type="button"
              onClick={() => scrollToAnchor('craftvector-playground')}
              className={`p-2.5 rounded-lg text-left border ${
                isDark ? 'bg-[#18181B] border-zinc-800' : 'bg-[#F4F4F5] border-zinc-200'
              }`}
            >
              02. UI Playground
            </button>
            <button
              type="button"
              onClick={() => scrollToAnchor('craftvector-workflow')}
              className={`p-2.5 rounded-lg text-left border ${
                isDark ? 'bg-[#18181B] border-zinc-800' : 'bg-[#F4F4F5] border-zinc-200'
              }`}
            >
              03. 4-Step Process
            </button>
            <button
              type="button"
              onClick={() => scrollToAnchor('craftvector-engagement')}
              className={`p-2.5 rounded-lg text-left border ${
                isDark ? 'bg-[#18181B] border-zinc-800' : 'bg-[#F4F4F5] border-zinc-200'
              }`}
            >
              04. Scope &amp; Retainers
            </button>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-zinc-800/40">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setResumeModalOpen(true);
              }}
              className="text-xs font-mono underline"
            >
              Inspect Interactive CV &amp; Stack →
            </button>
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className="text-xs font-mono px-2.5 py-1 rounded border border-zinc-700"
              >
                Switch to {isDark ? 'Light' : 'Dark'} Mode
              </button>
            )}
          </div>
        </div>
      )}

      {/* Interactive Resume / Read.cv Modal */}
      {resumeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`w-full max-w-2xl rounded-2xl border p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto ${
              isDark
                ? 'bg-[#18181B] border-zinc-800 text-[#FAFAFA]'
                : 'bg-white border-zinc-200 text-[#09090B]'
            }`}
          >
            <div className="flex items-start justify-between gap-4 border-b pb-4 border-zinc-500/20">
              <div>
                <div className="text-xs font-mono opacity-60">
                  CURRICULUM VITAE · STAFF PRODUCT DESIGNER &amp; DESIGN ENGINEER
                </div>
                <h3 className="text-xl font-bold mt-1">
                  Rafiq Arman — Product Systems &amp; AI/SaaS Interfaces
                </h3>
                <p className="text-xs opacity-70 mt-0.5 font-mono">
                  8+ Years Experience · Remote (US/EU/APAC) · Figma + React + TypeScript
                </p>
              </div>
              <button
                type="button"
                onClick={() => setResumeModalOpen(false)}
                className="p-1.5 rounded-lg border border-zinc-500/30 hover:opacity-80 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {[
                {
                  role: 'Staff Product Designer (Design Systems & Core Workflows)',
                  org: 'VelocePay (YC W22 · Series B Fintech, San Francisco — Remote)',
                  period: '2023 — Present',
                  impact:
                    'Architected multi-brand Figma + React token system across 48 components; redesigned merchant treasury onboarding (+38% activation, -64% support tickets).',
                },
                {
                  role: 'Principal UI/UX & Frontend Systems Designer',
                  org: 'CortexOps AI (Seed-to-Series A B2B Agentic Platform, London — Remote)',
                  period: '2021 — 2023',
                  impact:
                    'Designed low-latency prompt evaluation studio, trace debugger, and command palette; helped company raise $18M Series A led by Index Ventures.',
                },
                {
                  role: 'Senior Product Designer',
                  org: 'PulseHealth Cloud (Enterprise EHR & Telehealth, Singapore)',
                  period: '2018 — 2021',
                  impact:
                    'Led WCAG AAA accessibility overhaul and clinician scheduling workbench used by 14,000+ daily active practitioners.',
                },
              ].map((job) => (
                <div
                  key={job.org}
                  className={`p-4 rounded-xl border space-y-1.5 ${
                    isDark ? 'bg-[#09090B] border-zinc-800' : 'bg-[#F4F4F5] border-zinc-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-sm">{job.role}</span>
                    <span className="font-mono text-[11px] opacity-65">{job.period}</span>
                  </div>
                  <div className="font-mono text-[11px]" style={{ color: accentHex }}>
                    {job.org}
                  </div>
                  <p className="opacity-80 leading-relaxed">{job.impact}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-500/20">
              <div className="text-[11px] font-mono opacity-70">
                Verified references available upon request from YC &amp; Series B Founders.
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3.5 py-2 rounded-lg text-xs font-mono border border-zinc-500/30 cursor-pointer"
                >
                  {copiedEmail ? 'Copied Direct Email ✓' : 'Copy Email'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setResumeModalOpen(false);
                    scrollToAnchor('craftvector-intake-drawer');
                  }}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-white cursor-pointer"
                  style={{ backgroundColor: accentHex }}
                >
                  Schedule Intro Call →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
