import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Calculator,
  Users,
  ShieldCheck,
  Briefcase,
  TrendingUp,
  Award,
  Sparkles,
  Clock,
} from 'lucide-react';
import {
  EditableText,
  EditableButton,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface FractionalCoreHeroSectionProps {
  title: string;
  subtitle: string;
  variant: DoctorVariantId;
  primaryColor: string;
  isDark?: boolean;
}

interface ExecutiveIdCardPreview {
  id: string;
  code: string;
  roleLabel: string;
  title: string;
  location: string;
  yearsExp: string;
  exitBadge: string;
  availability: string;
  retainer: string;
  allocation: string;
  pedigree: string;
  skills: string[];
  impactMetric: string;
}

const HERO_EXECUTIVE_CARDS: Record<string, ExecutiveIdCardPreview> = {
  cto: {
    id: 'cto',
    code: '#CTO-8042',
    roleLabel: 'Fractional CTO',
    title: 'Former VP of Engineering · Series C FinTech',
    location: 'San Francisco, CA',
    yearsExp: '16+ Yrs Experience',
    exitBadge: 'Exited to Stripe for $120M',
    availability: 'Available Immediately · 10 hrs/wk',
    retainer: '$4,500/mo',
    allocation: '10 hrs/wk (0% Equity)',
    pedigree:
      'Scaled engineering org from 8 to 65 engineers across Series A & B; architected SOC-2 multi-region payment ledger processing $4.2B/yr.',
    skills: ['AI/ML Infrastructure', 'B2B SaaS', 'FinTech', 'SOC-2 & Cloud Scale'],
    impactMetric: 'Reduced AWS infra burn by 41% in first 60 days',
  },
  cfo: {
    id: 'cfo',
    code: '#CFO-4190',
    roleLabel: 'Fractional CFO',
    title: 'Former Head of Strategic Finance · NYSE SaaS',
    location: 'New York, NY',
    yearsExp: '18+ Yrs Experience',
    exitBadge: 'Led $85M Series B & $420M IPO',
    availability: 'Available Next Week · 10 hrs/wk',
    retainer: '$4,200/mo',
    allocation: '10 hrs/wk (0% Equity)',
    pedigree:
      'Closed 14 institutional Seed-to-Series B rounds with Sequoia, Index, and Founders Fund; built board-ready ARR cohort & runway models.',
    skills: ['Series A Fundraising', 'SaaS Unit Economics', 'Board Reporting', 'M&A Due Diligence'],
    impactMetric: 'Extended average startup cash runway by +9.4 months',
  },
  cmo: {
    id: 'cmo',
    code: '#CMO-6315',
    roleLabel: 'Fractional CMO',
    title: 'Former VP Growth & GTM · Unicorn DevTools',
    location: 'Austin, TX',
    yearsExp: '14+ Yrs Experience',
    exitBadge: 'Exited to Datadog for $240M',
    availability: 'Available Now · 10 hrs/wk',
    retainer: '$4,000/mo',
    allocation: '10 hrs/wk (0% Equity)',
    pedigree:
      'Built PLG + Enterprise ABM engine from $1.5M to $38M ARR; decreased CAC payback period from 19 months to 7.5 months.',
    skills: ['PLG & Enterprise GTM', 'DevTools', 'Pipeline Engineering', 'Category Positioning'],
    impactMetric: '3.6x qualified enterprise pipeline in 90 days',
  },
  cpo: {
    id: 'cpo',
    code: '#CPO-9208',
    roleLabel: 'Fractional CPO',
    title: 'Former Group Product Director · AI Enterprise',
    location: 'Seattle, WA',
    yearsExp: '15+ Yrs Experience',
    exitBadge: 'Acquired by Snowflake ($190M)',
    availability: 'Available Immediately · 10 hrs/wk',
    retainer: '$4,400/mo',
    allocation: '10 hrs/wk (0% Equity)',
    pedigree:
      'Launched 3 category-leading B2B AI copilot products; elevated Net Dollar Retention (NDR) from 104% to 138% ahead of Series B.',
    skills: ['GenAI Product Strategy', 'Enterprise UX', 'NDR Expansion', 'Roadmap Governance'],
    impactMetric: '+34% Net Dollar Retention lift across 6 startups',
  },
};

export const FractionalCoreHeroSection: React.FC<FractionalCoreHeroSectionProps> = ({
  title,
  subtitle,
  variant,
}) => {
  const [selectedRoleKey, setSelectedRoleKey] = useState<string>('cto');
  const activeCard = HERO_EXECUTIVE_CARDS[selectedRoleKey] || HERO_EXECUTIVE_CARDS.cto;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const requestIntroForHeroCard = (code: string, roleLabel: string) => {
    window.dispatchEvent(
      new CustomEvent('fractional:select-executive', {
        detail: {
          candidateId: code,
          role: roleLabel.replace('Fractional ', ''),
          retainer: activeCard.retainer,
          allocation: activeCard.allocation,
          summary: activeCard.title,
        },
      })
    );
    scrollToSection('fractional-match-form');
  };

  return (
    <section
      className="relative overflow-hidden border-b"
      style={{
        backgroundColor: '#0A0F1D',
        borderColor: '#334155',
        color: '#F8FAFC',
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      }}
    >
      {/* Subtle Ambient Gold & Electric Indigo Radial Glows */}
      <div
        className="pointer-events-none absolute -top-36 left-1/4 w-[540px] h-[540px] rounded-full blur-3xl opacity-15"
        style={{
          background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute top-20 right-10 w-[460px] h-[460px] rounded-full blur-3xl opacity-15"
        style={{
          background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24 relative z-10">
        {/* VARIANT 2: Centered Executive Command Showcase */}
        {variant === 'varient_2' ? (
          <div className="space-y-12">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg border text-xs font-bold"
                style={{
                  backgroundColor: 'rgba(245, 158, 11, 0.12)',
                  borderColor: 'rgba(245, 158, 11, 0.4)',
                  color: '#F59E0B',
                }}
              >
                <Sparkles size={13} />
                <span>
                  For Founders &amp; VCs: Zero Equity Dilution • Placed in &lt; 72 Hours
                </span>
              </div>

              <EditableText
                id="fractional_hero_title_v2"
                defaultText={
                  title || 'Silicon Valley Executive Guidance. 1/4 the Full-Time Cost.'
                }
                as="h1"
                className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.08] text-[#F8FAFC]"
                style={{ fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif" }}
              />

              <EditableText
                id="fractional_hero_subtitle_v2"
                defaultText={
                  subtitle ||
                  'Access veteran CTOs, CFOs, and CMOs who have scaled companies from Series A to IPO. Get institutional strategic direction without sacrificing $250k+ salary or cap table equity.'
                }
                as="p"
                className="text-base sm:text-lg text-[#9CA3AF] max-w-3xl mx-auto leading-relaxed"
              />

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <EditableButton
                  id="fractional_hero_primary_cta_v2"
                  defaultText="Calculate Your Savings"
                  backgroundColor="#D97706"
                  textColor="#F8FAFC"
                  leftIcon={<Calculator size={16} />}
                  rightIcon={<ArrowRight size={15} />}
                  onClick={() => scrollToSection('fractional-calculator')}
                  className="px-6 py-4 rounded-xl text-sm font-extrabold shadow-xl transition hover:opacity-95 cursor-pointer"
                />
                <EditableButton
                  id="fractional_hero_secondary_cta_v2"
                  defaultText="Browse Executive Profiles"
                  backgroundColor="#1E293B"
                  textColor="#F8FAFC"
                  leftIcon={<Users size={16} />}
                  onClick={() => scrollToSection('fractional-directory')}
                  className="px-6 py-4 rounded-xl text-sm font-bold border border-[#334155] transition hover:bg-[#334155]/60 cursor-pointer"
                />
              </div>
            </div>

            {/* Wide Interactive Executive ID Card Deck */}
            <div
              className="rounded-2xl border p-6 sm:p-8 shadow-2xl"
              style={{
                backgroundColor: '#1E293B',
                borderColor: '#334155',
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#334155]">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                  <span className="text-xs font-mono uppercase tracking-wider text-[#F8FAFC] font-bold">
                    LIVE EXECUTIVE ID VERIFICATION DOSSIER
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {Object.values(HERO_EXECUTIVE_CARDS).map((item) => {
                    const active = item.id === selectedRoleKey;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedRoleKey(item.id)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                          active
                            ? 'bg-[#F59E0B] text-[#0A0F1D]'
                            : 'bg-[#0A0F1D] text-[#9CA3AF] hover:text-[#F8FAFC] border border-[#334155]'
                        }`}
                      >
                        {item.roleLabel} ({item.code})
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded bg-[#6366F1]/20 border border-[#6366F1]/40 text-[#818CF8] font-mono text-xs font-bold">
                      {activeCard.code}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#F59E0B]/15 border border-[#F59E0B]/40 text-[#F59E0B] text-xs font-bold">
                      ★ {activeCard.exitBadge}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#10B981]/15 border border-[#10B981]/35 text-[#10B981] text-xs font-bold">
                      ● {activeCard.availability}
                    </span>
                  </div>
                  <h3
                    className="text-2xl font-bold text-[#F8FAFC]"
                    style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                  >
                    {activeCard.title}
                  </h3>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">
                    {activeCard.pedigree}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeCard.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md bg-[#0A0F1D] border border-[#334155] text-xs text-[#F8FAFC] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 rounded-xl bg-[#0A0F1D] border border-[#334155] p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-[#1E293B]/60 border border-[#334155]">
                      <div className="text-[11px] text-[#9CA3AF]">Monthly Retainer</div>
                      <div className="text-xl font-mono font-bold text-[#10B981] mt-0.5">
                        {activeCard.retainer}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-[#1E293B]/60 border border-[#334155]">
                      <div className="text-[11px] text-[#9CA3AF]">Cap Table Equity</div>
                      <div className="text-xl font-mono font-bold text-[#F59E0B] mt-0.5">
                        0.0% Dilution
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-[#10B981] font-semibold flex items-center gap-2">
                    <TrendingUp size={14} />
                    <span>{activeCard.impactMetric}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      requestIntroForHeroCard(activeCard.code, activeCard.roleLabel)
                    }
                    className="w-full py-3 rounded-xl text-xs font-extrabold text-[#0A0F1D] flex items-center justify-center gap-2 transition hover:opacity-95 cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                    }}
                  >
                    <span>Request Intro to {activeCard.code}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : variant === 'varient_3' ? (
          /* VARIANT 3: Venture Capital Portfolio Bento Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div
              className="lg:col-span-7 rounded-2xl border p-7 sm:p-10 flex flex-col justify-between space-y-6"
              style={{
                backgroundColor: '#1E293B',
                borderColor: '#334155',
              }}
            >
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#F59E0B]/15 border border-[#F59E0B]/40 text-[#F59E0B] text-xs font-bold">
                  <Award size={14} />
                  <span>
                    For Founders &amp; VCs: Zero Equity Dilution • Placed in &lt; 72 Hours
                  </span>
                </div>

                <EditableText
                  id="fractional_hero_title_v3"
                  defaultText={
                    title || 'Silicon Valley Executive Guidance. 1/4 the Full-Time Cost.'
                  }
                  as="h1"
                  className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1] text-[#F8FAFC]"
                  style={{ fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif" }}
                />

                <EditableText
                  id="fractional_hero_subtitle_v3"
                  defaultText={
                    subtitle ||
                    'Access veteran CTOs, CFOs, and CMOs who have scaled companies from Series A to IPO. Get institutional strategic direction without sacrificing $250k+ salary or cap table equity.'
                  }
                  as="p"
                  className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed"
                />
              </div>

              <div className="space-y-5 pt-2">
                <div className="flex flex-wrap items-center gap-3.5">
                  <EditableButton
                    id="fractional_hero_primary_cta_v3"
                    defaultText="Calculate Your Savings"
                    backgroundColor="#D97706"
                    textColor="#F8FAFC"
                    leftIcon={<Calculator size={16} />}
                    rightIcon={<ArrowRight size={15} />}
                    onClick={() => scrollToSection('fractional-calculator')}
                    className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold shadow-lg transition hover:opacity-95 cursor-pointer"
                  />
                  <EditableButton
                    id="fractional_hero_secondary_cta_v3"
                    defaultText="Browse Executive Profiles"
                    backgroundColor="#0A0F1D"
                    textColor="#F8FAFC"
                    leftIcon={<Users size={16} />}
                    onClick={() => scrollToSection('fractional-directory')}
                    className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold border border-[#334155] transition hover:bg-[#0A0F1D]/80 cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#334155]">
                  <div>
                    <div className="text-lg sm:text-xl font-mono font-bold text-[#10B981]">
                      $14.2M
                    </div>
                    <div className="text-[11px] text-[#9CA3AF]">Founder Equity Saved</div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-mono font-bold text-[#F59E0B]">
                      &lt; 72 Hrs
                    </div>
                    <div className="text-[11px] text-[#9CA3AF]">Vetted Match SLA</div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-mono font-bold text-[#F8FAFC]">
                      12 Mos
                    </div>
                    <div className="text-[11px] text-[#9CA3AF]">Avg Founder Retention</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column Interactive ID Card */}
            <div
              className="lg:col-span-5 rounded-2xl border p-6 flex flex-col justify-between space-y-5"
              style={{
                backgroundColor: '#1E293B',
                borderColor: '#334155',
              }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#9CA3AF]">
                    EXECUTIVE ID CARD PREVIEW
                  </span>
                  <div className="flex gap-1">
                    {Object.keys(HERO_EXECUTIVE_CARDS).map((k) => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setSelectedRoleKey(k)}
                        className={`px-2 py-1 rounded text-[10px] font-mono font-bold uppercase cursor-pointer ${
                          selectedRoleKey === k
                            ? 'bg-[#F59E0B] text-[#0A0F1D]'
                            : 'bg-[#0A0F1D] text-[#9CA3AF]'
                        }`}
                      >
                        {k}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0A0F1D] border border-[#334155] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#6366F1]">
                      {activeCard.code} · {activeCard.roleLabel}
                    </span>
                    <span className="text-[11px] font-bold text-[#10B981]">
                      ● Verified Active
                    </span>
                  </div>
                  <div
                    className="text-base font-bold text-[#F8FAFC]"
                    style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                  >
                    {activeCard.title}
                  </div>
                  <div className="inline-block px-2.5 py-1 rounded bg-[#F59E0B]/15 border border-[#F59E0B]/35 text-[#F59E0B] text-[11px] font-bold">
                    ★ {activeCard.exitBadge}
                  </div>
                  <p className="text-xs text-[#9CA3AF] leading-relaxed">
                    {activeCard.pedigree}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  requestIntroForHeroCard(activeCard.code, activeCard.roleLabel)
                }
                className="w-full py-3 rounded-xl text-xs font-extrabold text-[#0A0F1D] flex items-center justify-center gap-2 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                }}
              >
                <span>Request Intro to {activeCard.code}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ) : (
          /* DEFAULT VARIANT 1: Split Layout with Interactive Executive ID Card */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: High-Signal Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge Callout */}
              <div
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg border text-xs font-bold"
                style={{
                  backgroundColor: 'rgba(245, 158, 11, 0.12)',
                  borderColor: 'rgba(245, 158, 11, 0.4)',
                  color: '#F59E0B',
                }}
              >
                <ShieldCheck size={14} className="text-[#F59E0B]" />
                <span>
                  For Founders &amp; VCs: Zero Equity Dilution • Placed in &lt; 72 Hours
                </span>
              </div>

              {/* Headline */}
              <EditableText
                id="fractional_hero_title"
                defaultText={
                  title || 'Silicon Valley Executive Guidance. 1/4 the Full-Time Cost.'
                }
                as="h1"
                className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight leading-[1.08] text-[#F8FAFC]"
                style={{ fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif" }}
              />

              {/* Sub-headline */}
              <EditableText
                id="fractional_hero_subtitle"
                defaultText={
                  subtitle ||
                  'Access veteran CTOs, CFOs, and CMOs who have scaled companies from Series A to IPO. Get institutional strategic direction without sacrificing $250k+ salary or cap table equity.'
                }
                as="p"
                className="text-sm sm:text-base lg:text-lg text-[#9CA3AF] leading-relaxed max-w-2xl"
              />

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <EditableButton
                  id="fractional_hero_primary_cta"
                  defaultText="Calculate Your Savings"
                  backgroundColor="#D97706"
                  textColor="#F8FAFC"
                  leftIcon={<Calculator size={16} />}
                  rightIcon={<ArrowRight size={15} />}
                  onClick={() => scrollToSection('fractional-calculator')}
                  className="px-6 py-4 rounded-xl text-xs sm:text-sm font-extrabold shadow-xl transition hover:opacity-95 cursor-pointer"
                />

                <EditableButton
                  id="fractional_hero_secondary_cta"
                  defaultText="Browse Executive Profiles"
                  backgroundColor="#1E293B"
                  textColor="#F8FAFC"
                  leftIcon={<Users size={16} />}
                  onClick={() => scrollToSection('fractional-directory')}
                  className="px-6 py-4 rounded-xl text-xs sm:text-sm font-bold border border-[#334155] transition hover:bg-[#334155]/60 cursor-pointer"
                />
              </div>

              {/* Quick Institutional Guarantees */}
              <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#9CA3AF]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#10B981] shrink-0" />
                  <span>0% Cap Table Equity Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#10B981] shrink-0" />
                  <span>Month-to-Month Flexible Retainer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#10B981] shrink-0" />
                  <span>Direct Slack &amp; Boardroom Integration</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Executive ID Card Preview */}
            <div className="lg:col-span-5">
              <div
                className="rounded-2xl border p-5 sm:p-6 shadow-2xl space-y-5 relative"
                style={{
                  backgroundColor: '#1E293B',
                  borderColor: '#334155',
                  boxShadow: '0 24px 60px -15px rgba(0, 0, 0, 0.7)',
                }}
              >
                {/* Role Switcher Tabs inside Hero Card */}
                <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-[#334155]">
                  <div className="flex items-center gap-2">
                    <Briefcase size={14} className="text-[#F59E0B]" />
                    <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#F8FAFC]">
                      VERIFIED EXECUTIVE ID
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-[#0A0F1D] p-1 rounded-lg border border-[#334155]">
                    {Object.values(HERO_EXECUTIVE_CARDS).map((card) => {
                      const isActive = card.id === selectedRoleKey;
                      return (
                        <button
                          key={card.id}
                          type="button"
                          onClick={() => setSelectedRoleKey(card.id)}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold transition cursor-pointer ${
                            isActive
                              ? 'bg-[#F59E0B] text-[#0A0F1D]'
                              : 'text-[#9CA3AF] hover:text-[#F8FAFC]'
                          }`}
                        >
                          {card.id.toUpperCase()}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Candidate Header & Live Availability */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#6366F1]/20 border border-[#6366F1]/40 font-mono text-xs font-bold text-[#818CF8]">
                        Executive {activeCard.code}
                      </span>
                      <span className="text-xs font-semibold text-[#9CA3AF]">
                        {activeCard.location} · {activeCard.yearsExp}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#10B981]/15 border border-[#10B981]/35 text-[11px] font-bold text-[#10B981]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                      {activeCard.availability}
                    </span>
                  </div>

                  <h3
                    className="text-lg sm:text-xl font-bold text-[#F8FAFC]"
                    style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                  >
                    {activeCard.title}
                  </h3>

                  {/* Past Exit Tag Callout */}
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold"
                    style={{
                      backgroundColor: 'rgba(245, 158, 11, 0.14)',
                      borderColor: 'rgba(245, 158, 11, 0.45)',
                      color: '#F59E0B',
                    }}
                  >
                    <Award size={14} />
                    <span>Verified Exit: {activeCard.exitBadge}</span>
                  </div>

                  <p className="text-xs text-[#9CA3AF] leading-relaxed">
                    {activeCard.pedigree}
                  </p>
                </div>

                {/* Verified Industry Expertise Tags */}
                <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#9CA3AF]">
                    VERIFIED DOMAIN &amp; TECHNICAL STACK
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCard.skills.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#0A0F1D] border border-[#334155] text-[#F8FAFC]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Retainer & Allocation Readout */}
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#0A0F1D] border border-[#334155]">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-[#9CA3AF]">
                      FLAT RETAINER RATE
                    </div>
                    <div className="text-lg font-mono font-bold text-[#10B981] mt-0.5">
                      {activeCard.retainer}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-[#9CA3AF]">
                      WEEKLY ALLOCATION
                    </div>
                    <div className="text-sm font-mono font-bold text-[#F8FAFC] mt-1">
                      {activeCard.allocation}
                    </div>
                  </div>
                </div>

                {/* Direct Intro CTA */}
                <button
                  type="button"
                  onClick={() =>
                    requestIntroForHeroCard(activeCard.code, activeCard.roleLabel)
                  }
                  className="w-full py-3.5 rounded-xl text-xs font-extrabold text-[#0A0F1D] flex items-center justify-center gap-2 shadow-lg transition hover:opacity-95 cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  }}
                >
                  <span>Request Intro to {activeCard.code}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Proof Bar Ticker */}
        <div
          className="mt-12 lg:mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderColor: '#334155' }}
        >
          <div className="flex items-center gap-2 text-[#9CA3AF] font-mono uppercase tracking-wider">
            <Clock size={14} className="text-[#F59E0B]" />
            <span>INSTITUTIONAL TRACK RECORD:</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 font-semibold text-[#F8FAFC]">
            <div className="flex items-center gap-2">
              <span className="text-[#10B981] font-mono font-extrabold text-sm">
                $14.2M
              </span>
              <span className="text-[#9CA3AF]">Saved in Founder Equity</span>
            </div>
            <span className="text-[#334155] hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <span className="text-[#F59E0B] font-mono font-extrabold text-sm">
                100+
              </span>
              <span className="text-[#9CA3AF]">Startup Placements</span>
            </div>
            <span className="text-[#334155] hidden sm:inline">•</span>
            <div className="flex items-center gap-2">
              <span className="text-[#818CF8] font-mono font-extrabold text-sm">
                12-Month
              </span>
              <span className="text-[#9CA3AF]">Average Founder Retention</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
