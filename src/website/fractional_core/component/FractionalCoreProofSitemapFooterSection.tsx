import React, { useState } from 'react';
import {
  Play,
  Quote,
  Award,
  CheckCircle2,
  ArrowRight,
  Compass,
  ShieldCheck,
  Briefcase,
  Building,
  BookOpen,
  Users,
} from 'lucide-react';
import {
  EditableText,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface FractionalCoreProofSitemapFooterSectionProps {
  title: string;
  subtitle: string;
  variant: DoctorVariantId;
  primaryColor: string;
  isDark?: boolean;
}

const VC_ENDORSEMENTS = [
  {
    id: 'vc_1',
    quote:
      '“We mandate FractionalCore for 70% of our Seed and Series A portfolio companies before they hire a full-time CFO or CTO. It saves 2.0%+ in founder dilution and prevents expensive early-stage mis-hires.”',
    partner: 'Marcus Vance',
    title: 'General Partner · Apex Frontier Ventures ($650M AUM)',
    metric: '19 Portfolio Placements',
  },
  {
    id: 'vc_2',
    quote:
      '“Two of our AI infrastructure startups brought in a FractionalCore CTO (#CTO-8042) for 10 hrs/wk. Both passed Enterprise SOC-2 audits and closed oversubscribed Series A rounds in under 5 months.”',
    partner: 'Elena Rostova',
    title: 'Managing Director · Signal Peak Capital',
    metric: '+9.5 Mos Avg Runway Added',
  },
  {
    id: 'vc_3',
    quote:
      '“Early-stage founders don’t need a $300k/yr full-time CFO sitting in meetings 40 hours a week. They need 8 hours of battle-tested Series B financial modeling—and FractionalCore delivers that in 48 hours.”',
    partner: 'David Chen',
    title: 'Partner · Foundry Seed & Early Stage Fund',
    metric: '$4.8M Saved Across Fund III',
  },
];

const FOUNDER_VIDEO_TESTIMONIALS = [
  {
    id: 'vid_1',
    founder: 'Liam O’Connor · CEO @ Synthetix Cloud (Series A)',
    duration: '0:34',
    headline: 'How Fractional CFO #CFO-4190 Extended Our Runway by 9.5 Months & Closed Our $18M Series A',
    takeaway: 'Saved $248,000 in Year-1 salary burn + retained 1.75% founder equity.',
    roleTag: 'Fractional CFO · 10 hrs/wk',
  },
  {
    id: 'vid_2',
    founder: 'Priya Nair · Co-Founder @ Kinetix AI (Seed)',
    duration: '0:29',
    headline: 'Re-Architecting Our Multi-Tenant LLM Pipeline in 60 Days Without a Full-Time VP of Eng',
    takeaway: 'Cut AWS GPU inference costs by 41% and unlocked 3 Fortune 500 enterprise pilots.',
    roleTag: 'Fractional CTO · 10 hrs/wk',
  },
  {
    id: 'vid_3',
    founder: 'Noah Lindqvist · Founder @ VaultPay FinTech (Series A)',
    duration: '0:32',
    headline: 'Scaling Self-Serve PLG + Enterprise ABM from $1.4M to $6.8M ARR in Two Quarters',
    takeaway: 'Placed in 44 hours after a 5-month stalled executive search.',
    roleTag: 'Fractional CMO · 10 hrs/wk',
  },
];

const MULTI_PAGE_PORTAL_BLUEPRINT = [
  {
    id: 'home',
    pageName: 'Home / Main Portal',
    icon: Compass,
    objective: 'Immediate conversion & platform positioning',
    features: ['Full-Time vs. Fractional Calculator', 'Filterable Executive Directory', '15-Minute Match Request Form'],
    ctaLabel: 'Scroll to Top Portal',
    targetSection: 'fractional-calculator',
  },
  {
    id: 'directory',
    pageName: 'Executive Directory',
    icon: Users,
    objective: 'Full searchable catalog of non-confidential candidate cards',
    features: ['Advanced Role/Stage/Stack Filters', 'Transparent Flat Retainer Rates', 'Verified Exit & Pedigree Summaries'],
    ctaLabel: 'Explore Live Roster',
    targetSection: 'fractional-directory',
  },
  {
    id: 'executives',
    pageName: 'For Executives (Apply)',
    icon: Briefcase,
    objective: 'Inbound recruiter funnel to recruit top 1% C-suite talent',
    features: ['4-Stage Vetting Criteria Breakdown', 'Zero-BD Client Matching Desk', 'Multi-Startup Advisory Portfolio Perks'],
    ctaLabel: 'Preview Executive Vetting',
    targetSection: 'fractional-match-form',
  },
  {
    id: 'vc_partners',
    pageName: 'For VC & Accelerators',
    icon: Building,
    objective: 'B2B referral partnerships with Seed & Series-A venture funds',
    features: ['Portfolio-Wide Preferred Retainer Pricing', 'Dedicated Managing Talent Partner', 'Quarterly Cap-Table Health Audits'],
    ctaLabel: 'Request VC Partner Desk',
    targetSection: 'fractional-match-form',
  },
  {
    id: 'guide',
    pageName: 'Fractional vs Full-Time Guide',
    icon: BookOpen,
    objective: 'SEO content hub educating early-stage founders on cap-table math',
    features: ['2026 C-Suite Salary & Equity Benchmarks', 'Series-A Hiring Frameworks', 'Downloadable Board Retainer Templates'],
    ctaLabel: 'Run Equity Math',
    targetSection: 'fractional-calculator',
  },
];

export const FractionalCoreProofSitemapFooterSection: React.FC<
  FractionalCoreProofSitemapFooterSectionProps
> = ({ title, subtitle }) => {
  const [activeVideoId, setActiveVideoId] = useState<string>('vid_1');
  const [activeBlueprintTab, setActiveBlueprintTab] = useState<string>('executives');

  const currentVideo =
    FOUNDER_VIDEO_TESTIMONIALS.find((v) => v.id === activeVideoId) ||
    FOUNDER_VIDEO_TESTIMONIALS[0];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer
      className="pt-16 lg:pt-24 pb-14"
      style={{
        backgroundColor: '#0A0F1D',
        color: '#F8FAFC',
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* PART G: FOUNDER & VC SOCIAL PROOF */}
        <div className="space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F59E0B]/15 border border-[#F59E0B]/35 text-[#F59E0B] text-xs font-mono uppercase tracking-wider font-bold">
              <Award size={13} />
              <span>VENTURE CAPITAL &amp; FOUNDER ENDORSEMENTS</span>
            </div>

            <EditableText
              id="fractional_proof_title"
              defaultText={
                title || 'Trusted by General Partners & Series-A Founders'
              }
              as="h2"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]"
              style={{ fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif" }}
            />

            <EditableText
              id="fractional_proof_subtitle"
              defaultText={
                subtitle ||
                'See why Seed and Series-A funds recommend FractionalCore to extend portfolio runway by 8+ months without cap-table dilution.'
              }
              as="p"
              className="text-sm sm:text-base text-[#9CA3AF]"
            />
          </div>

          {/* VC Endorsements Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VC_ENDORSEMENTS.map((vc) => (
              <div
                key={vc.id}
                className="rounded-2xl border p-6 flex flex-col justify-between space-y-5"
                style={{
                  backgroundColor: '#1E293B',
                  borderColor: '#334155',
                }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Quote size={18} className="text-[#F59E0B]" />
                    <span className="px-2.5 py-0.5 rounded bg-[#10B981]/15 border border-[#10B981]/35 font-mono text-[11px] font-bold text-[#10B981]">
                      {vc.metric}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F8FAFC] leading-relaxed italic">
                    {vc.quote}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#334155]">
                  <div className="text-xs font-extrabold text-[#F8FAFC]">{vc.partner}</div>
                  <div className="text-[11px] text-[#9CA3AF] mt-0.5">{vc.title}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 30-Second Founder Video Testimonials Showcase */}
          <div
            className="rounded-2xl border p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            style={{
              backgroundColor: '#1E293B',
              borderColor: '#334155',
            }}
          >
            <div className="lg:col-span-7 space-y-4">
              <div
                className="rounded-xl border p-6 sm:p-8 relative overflow-hidden space-y-4"
                style={{
                  background:
                    'linear-gradient(135deg, #0A0F1D 0%, #1E293B 100%)',
                  borderColor: '#334155',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-[#F59E0B]/20 border border-[#F59E0B]/40 text-[#F59E0B] font-mono text-xs font-bold">
                    ▶ FOUNDER CLIP ({currentVideo.duration})
                  </span>
                  <span className="font-mono text-xs text-[#10B981] font-bold">
                    {currentVideo.roleTag}
                  </span>
                </div>

                <h3
                  className="text-xl sm:text-2xl font-bold text-[#F8FAFC] leading-snug"
                  style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                >
                  “{currentVideo.headline}”
                </h3>

                <p className="text-xs sm:text-sm text-[#10B981] font-semibold flex items-center gap-2">
                  <CheckCircle2 size={15} />
                  <span>{currentVideo.takeaway}</span>
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-[#9CA3AF]">
                  <span className="font-bold text-[#F8FAFC]">{currentVideo.founder}</span>
                  <span className="font-mono text-[11px]">Verified Cap-Table Audit ✓</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-2.5">
              <div className="text-xs font-mono uppercase tracking-wider text-[#9CA3AF] font-bold pb-1">
                SELECT 30-SECOND FOUNDER CASE CLIP:
              </div>
              {FOUNDER_VIDEO_TESTIMONIALS.map((vid) => {
                const active = vid.id === activeVideoId;
                return (
                  <button
                    key={vid.id}
                    type="button"
                    onClick={() => setActiveVideoId(vid.id)}
                    className={`w-full p-3.5 rounded-xl border text-left transition flex items-start gap-3 cursor-pointer ${
                      active
                        ? 'bg-[#0A0F1D] border-[#F59E0B] text-[#F8FAFC]'
                        : 'bg-[#0A0F1D]/60 border-[#334155] text-[#9CA3AF] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        active
                          ? 'bg-[#F59E0B] text-[#0A0F1D]'
                          : 'bg-[#1E293B] text-[#9CA3AF]'
                      }`}
                    >
                      <Play size={14} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-[#F8FAFC] truncate">
                        {vid.founder}
                      </div>
                      <div className="text-[11px] text-[#9CA3AF] line-clamp-1 mt-0.5">
                        {vid.headline}
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-[#F59E0B] shrink-0">
                      {vid.duration}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECTION 3: MULTI-PAGE PLATFORM ARCHITECTURE & SITE MAP HUB */}
        <div
          id="fractional-architecture-hub"
          className="scroll-mt-24 rounded-2xl border p-6 sm:p-8 space-y-6"
          style={{
            backgroundColor: '#1E293B',
            borderColor: '#334155',
          }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#334155]">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#818CF8] font-bold">
                PLATFORM BLUEPRINT &amp; MULTI-PORTAL NAVIGATION
              </span>
              <h3
                className="text-2xl font-bold text-[#F8FAFC] mt-1"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                FractionalCore Multi-Page Marketplace Architecture
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {MULTI_PAGE_PORTAL_BLUEPRINT.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveBlueprintTab(p.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    activeBlueprintTab === p.id
                      ? 'bg-[#F59E0B] text-[#0A0F1D]'
                      : 'bg-[#0A0F1D] text-[#9CA3AF] hover:text-[#F8FAFC] border border-[#334155]'
                  }`}
                >
                  {p.pageName}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {MULTI_PAGE_PORTAL_BLUEPRINT.map((portal) => {
              const IconComp = portal.icon;
              const isSelected = portal.id === activeBlueprintTab;
              return (
                <div
                  key={portal.id}
                  onClick={() => setActiveBlueprintTab(portal.id)}
                  className={`p-4 rounded-xl border flex flex-col justify-between space-y-4 transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#0A0F1D] border-[#F59E0B] ring-1 ring-[#F59E0B]'
                      : 'bg-[#0A0F1D]/70 border-[#334155] hover:border-[#6366F1]'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <IconComp size={16} className="text-[#F59E0B]" />
                      <span className="font-mono text-[10px] text-[#10B981]">LIVE MODULE</span>
                    </div>
                    <div className="text-xs font-extrabold text-[#F8FAFC]">
                      {portal.pageName}
                    </div>
                    <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
                      {portal.objective}
                    </p>
                    <ul className="space-y-1 pt-1">
                      {portal.features.map((f) => (
                        <li
                          key={f}
                          className="text-[10px] text-[#F8FAFC]/85 flex items-center gap-1.5"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#6366F1]" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollToSection(portal.targetSection);
                    }}
                    className="w-full py-2 rounded-lg bg-[#1E293B] border border-[#334155] text-[11px] font-bold text-[#F59E0B] hover:bg-[#334155] flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>{portal.ctaLabel}</span>
                    <ArrowRight size={11} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM FOOTER BAR */}
        <div className="pt-8 border-t border-[#334155] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9CA3AF]">
          <div className="flex items-center gap-3">
            <ShieldCheck size={16} className="text-[#F59E0B]" />
            <span className="font-bold text-[#F8FAFC]">FractionalCore Inc.</span>
            <span>·</span>
            <span>San Francisco • New York • London</span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <span>Zero Equity Dilution Guarantee</span>
            <span>·</span>
            <span>SOC-2 Type II NDA Vault</span>
            <span>·</span>
            <span className="text-[#10B981] font-mono">● 18 Leaders Available Q4</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
