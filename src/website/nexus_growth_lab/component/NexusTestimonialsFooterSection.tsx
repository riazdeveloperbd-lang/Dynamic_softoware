import React, { useState } from 'react';
import {
  Play,
  Pause,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Music,
  Share2,
  Video,
} from 'lucide-react';
import {
  EditableText,
  EditableImage,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';
import nexusCmoVideo1 from '../../../assets/images/nexus_cmo_video_1_1791389586073.jpg';
import nexusCeoVideo2 from '../../../assets/images/nexus_ceo_video_2_1791389603763.jpg';

export interface NexusTestimonialsFooterSectionProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

const VIDEO_CASE_SNIPPETS = [
  {
    id: 'vid_elena',
    execName: 'Elena Vance',
    role: 'Chief Marketing Officer · CloudScale AI (Series B)',
    headline: '“How Nexus scaled our Enterprise SQL pipeline by $8.4M in 180 days while cutting paid search CAC by 45%.”',
    duration: '01:24',
    metricCallout: '+280% Qualified SQLs · 4.8x ROAS',
    thumbnail: nexusCmoVideo1,
    transcriptSnippet:
      '“Before Nexus Growth Lab, we were burning $65k a month on broad LinkedIn and Google campaigns that generated ebook downloads instead of enterprise pipeline. Within 6 weeks, their RevOps and ABM engineers rebuilt our entire attribution and intent engine.”',
  },
  {
    id: 'vid_marcus',
    execName: 'Marcus Sterling',
    role: 'Co-Founder & CRO · Vanguard Zero-Trust Security',
    headline: '“From unpredictable outbound to $14.2M in verified Fortune 2000 cybersecurity pipeline.”',
    duration: '01:48',
    metricCallout: '$14.2M New Pipeline · -39% CAC',
    thumbnail: nexusCeoVideo2,
    transcriptSnippet:
      '“Nexus aligned our 6sense intent signals directly with our 24 enterprise SDRs. Our average deal size jumped from $78k to $115k because we were engaging entire CISO buying committees simultaneously.”',
  },
];

const VERIFIED_EXEC_QUOTES = [
  {
    quote:
      '“Nexus engineered a multi-touch Snowflake + HubSpot attribution model that uncovered $480k in hidden dark-social pipeline in our first quarter. Best technical growth partner we have ever retained.”',
    name: 'Dr. Aris Thorne',
    role: 'CEO · Aether LLM Ops',
    companyBadge: 'AETHER AI',
    metric: '+340% SQL Velocity in 6 Months',
  },
  {
    quote:
      '“Our board asked how we doubled enterprise demo volume without adding headcount. The answer was Nexus Growth Lab’s programmatic ABM and interactive ROI calculator funnels.”',
    name: 'Hannah Lindqvist',
    role: 'VP of Marketing · Kinetic Freight Exchange',
    companyBadge: 'KINETIC B2B',
    metric: '4.6x Verified Paid ROAS',
  },
  {
    quote:
      '“Unlike traditional ad agencies that report on vanity impressions, Nexus only measures pipeline velocity, SQL-to-Close conversion rate, and net new ARR.”',
    name: 'Devon K. Patel',
    role: 'Chief Revenue Officer · Synapse Cloud',
    companyBadge: 'SYNAPSE',
    metric: '-36% Customer Acquisition Cost',
  },
];

export const NexusTestimonialsFooterSection: React.FC<
  NexusTestimonialsFooterSectionProps
> = ({
  title = 'Executive Proof from High-Growth B2B Revenue Leaders',
  subtitle = 'Watch playable case study interviews and verified LinkedIn executive endorsements from Series A to Public SaaS leaders.',
  primaryColor = '#2563EB',
}) => {
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSubscribed, setNewsletterSubscribed] =
    useState<boolean>(false);
  const [podcastPlaying, setPodcastPlaying] = useState<boolean>(false);
  const [footerNotice, setFooterNotice] = useState<string | null>(null);

  const scrollToSection = (href: string) => {
    if (typeof document !== 'undefined') {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleSubscribeNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.includes('@') || !newsletterEmail.includes('.')) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <div className="bg-[#0B0F17] text-[#F9FAFB]">
      {/* ================================================================= */}
      {/* SECTION G: SOCIAL PROOF, VIDEO TESTIMONIALS & VERIFIED QUOTES     */}
      {/* ================================================================= */}
      <section
        id="nexus-testimonials"
        className="py-20 px-6 border-b border-[#1F2937]"
      >
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-medium text-[#9CA3AF]">
              <Video size={14} className="text-[#10B981]" />
              <span className="text-[#10B981] font-semibold">
                CMO &amp; CRO Video Case Studies
              </span>
              <span aria-hidden="true">·</span>
              <span>Verified LinkedIn Executive Endorsements</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-semibold tracking-tight"
              style={{
                fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif",
                textWrap: 'balance',
              }}
            >
              <EditableText
                id="nexus_testimonials_heading"
                defaultText={title}
              />
            </h2>

            <EditableText
              id="nexus_testimonials_sub"
              as="p"
              defaultText={subtitle}
              className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed block"
            />
          </div>

          {/* 2 Embedded High-Definition Video Testimonials with Playable Case Study Snippets */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {VIDEO_CASE_SNIPPETS.map((vid) => {
              const isPlaying = playingVideoId === vid.id;
              return (
                <div
                  key={vid.id}
                  className="rounded-3xl p-6 bg-[#111827] border border-[#1F2937] space-y-5"
                >
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#0B0F17] border border-[#1F2937]">
                    <EditableImage
                      id={`nexus_video_thumb_${vid.id}`}
                      defaultSrc={vid.thumbnail}
                      alt={vid.execName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17]/90 via-[#0B0F17]/35 to-transparent" />

                    <button
                      type="button"
                      onClick={() =>
                        setPlayingVideoId(isPlaying ? null : vid.id)
                      }
                      className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                      aria-label={`Play case study interview with ${vid.execName}`}
                    >
                      <span
                        className="w-16 h-16 rounded-full flex items-center justify-center text-[#F9FAFB] shadow-2xl transition-transform group-hover:scale-105"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                      </span>
                    </button>

                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2 pointer-events-none">
                      <div>
                        <div className="text-sm font-semibold text-[#F9FAFB]">
                          {vid.execName}
                        </div>
                        <div className="text-xs text-[#9CA3AF]">{vid.role}</div>
                      </div>
                      <span className="font-mono text-xs text-[#10B981] font-semibold tabular-nums">
                        {vid.metricCallout} · {vid.duration}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base font-medium text-[#F9FAFB] leading-snug">
                    {vid.headline}
                  </p>

                  {isPlaying && (
                    <div className="p-4 rounded-2xl bg-[#0B0F17] border border-[#2563EB]/40 text-xs text-[#9CA3AF] leading-relaxed space-y-1.5">
                      <div className="font-mono text-[#10B981] font-semibold">
                        ● Playing Executive Case Study Snippet ({vid.duration})
                      </div>
                      <p>{vid.transcriptSnippet}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 3 Verified Executive Quote Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VERIFIED_EXEC_QUOTES.map((q) => (
              <div
                key={q.name}
                className="p-6 rounded-3xl bg-[#111827] border border-[#1F2937] flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#10B981] font-semibold">
                      {q.metric}
                    </span>
                    <span className="text-[#9CA3AF]">
                      Verified LinkedIn Exec
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F9FAFB]/90 leading-relaxed">
                    {q.quote}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1F2937] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-[#F9FAFB] shrink-0"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {q.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#F9FAFB]">
                        {q.name}
                      </div>
                      <div className="text-[11px] text-[#9CA3AF]">{q.role}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-[#9CA3AF]">
                    {q.companyBadge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION H: FOOTER ("THE REVENUE ENGINE" NEWSLETTER + SOC-2)       */}
      {/* ================================================================= */}
      <footer className="bg-[#0B0F17] text-[#F9FAFB] pt-16 pb-14 px-6">
        <div className="max-w-7xl mx-auto space-y-14">
          {/* Newsletter Capture Banner: "The Revenue Engine" */}
          <div className="rounded-3xl p-8 sm:p-10 bg-[#111827] border border-[#1F2937] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-2">
              <div className="text-xs font-mono font-semibold uppercase text-[#10B981]">
                The Revenue Engine · Weekly Executive Dispatch
              </div>
              <h3
                className="text-2xl sm:text-3xl font-semibold tracking-tight"
                style={{
                  fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif",
                  textWrap: 'balance',
                }}
              >
                <EditableText
                  id="nexus_newsletter_heading"
                  defaultText="Weekly B2B Growth Tear-Downs Delivered to 15,000+ Marketing Executives"
                />
              </h3>
              <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed max-w-xl">
                Every Tuesday, receive real ad spend benchmarks, ABM playbooks, and SQL attribution scripts used across our $140M+ portfolio.
              </p>
            </div>

            <div className="lg:col-span-5">
              {newsletterSubscribed ? (
                <div className="p-4 rounded-2xl bg-[#0B0F17] border border-[#10B981]/40 flex items-center gap-3 text-xs sm:text-sm">
                  <CheckCircle2 size={20} className="text-[#10B981] shrink-0" />
                  <div>
                    <div className="font-semibold text-[#F9FAFB]">
                      Subscribed to The Revenue Engine
                    </div>
                    <div className="text-xs text-[#9CA3AF] mt-0.5">
                      Your first B2B SaaS benchmark teardown is on its way to your inbox.
                    </div>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribeNewsletter}
                  className="flex flex-col sm:flex-row gap-2.5"
                >
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your work email..."
                    className="flex-1 px-4 py-3.5 rounded-xl bg-[#0B0F17] border border-[#1F2937] text-xs sm:text-sm text-[#F9FAFB] placeholder:text-[#9CA3AF]/50 focus:outline-none focus:border-[#2563EB]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-[#F9FAFB] whitespace-nowrap shrink-0 inline-flex items-center justify-center gap-2 cursor-pointer transition-opacity hover:opacity-95"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <span>Join 15,000+ Execs</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Footer Columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#1F2937]">
            {/* Brand & SOC-2 Compliance */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background:
                      'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="6" cy="18" r="2.5" fill="#F9FAFB" />
                    <circle cx="12" cy="10" r="2.5" fill="#F9FAFB" />
                    <circle cx="19" cy="5" r="2.5" fill="#10B981" />
                    <path
                      d="M7.5 16L10.5 12M14 8.5L17 6.5"
                      stroke="#F9FAFB"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span
                  className="text-xl font-semibold tracking-tight"
                  style={{
                    fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  Nexus Growth Lab
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-sm leading-relaxed">
                B2B digital marketing and revenue engineering agency scaling mid-market and enterprise SaaS, AI, and cybersecurity leaders.
              </p>

              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#10B981]">
                <ShieldCheck size={15} />
                <span>SOC-2 Type II Certified · GDPR &amp; CCPA Compliant</span>
              </div>
            </div>

            {/* Footer Navigation */}
            <div className="md:col-span-3 space-y-3 text-xs sm:text-sm">
              <div className="font-mono text-xs uppercase tracking-wider text-[#9CA3AF]">
                Navigation &amp; Governance
              </div>
              <ul className="space-y-2.5 text-[#9CA3AF]">
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('#nexus-solutions')}
                    className="hover:text-[#F9FAFB] transition-colors cursor-pointer"
                  >
                    Solutions &amp; Retainers
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('#nexus-case-studies')}
                    className="hover:text-[#F9FAFB] transition-colors cursor-pointer"
                  >
                    Case Studies
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('#nexus-roi-calculator')}
                    className="hover:text-[#F9FAFB] transition-colors cursor-pointer"
                  >
                    ROI Calculator
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      setFooterNotice(
                        'Nexus Growth Lab maintains strict SOC-2 Type II data governance for all client CRM, Snowflake, and ad account integrations.'
                      )
                    }
                    className="hover:text-[#F9FAFB] transition-colors cursor-pointer"
                  >
                    Legal &amp; Security
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      setFooterNotice(
                        'Privacy Policy: Zero third-party data resale. All first-party attribution data remains in your isolated cloud warehouse.'
                      )
                    }
                    className="hover:text-[#F9FAFB] transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>

            {/* Podcast ("B2B Growth Secrets") & Socials */}
            <div className="md:col-span-4 space-y-4">
              <div className="font-mono text-xs uppercase tracking-wider text-[#9CA3AF]">
                Podcast &amp; Executive Channels
              </div>

              <div className="p-4 rounded-2xl bg-[#111827] border border-[#1F2937] space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-[#F9FAFB] shrink-0"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Music size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-mono text-[#10B981]">
                        Spotify Original Podcast
                      </div>
                      <div className="text-sm font-semibold truncate">
                        B2B Growth Secrets (Ep. 142)
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPodcastPlaying((p) => !p)}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[#F9FAFB] shrink-0 cursor-pointer"
                    style={{ backgroundColor: primaryColor }}
                    aria-label="Play B2B Growth Secrets Podcast"
                  >
                    {podcastPlaying ? <Pause size={14} /> : <Play size={14} />}
                  </button>
                </div>

                <div className="text-xs text-[#9CA3AF]">
                  {podcastPlaying
                    ? '♪ Playing Ep. 142: Engineering $50M+ ABM Pipelines without SDR Burnout'
                    : 'Weekly deep-dives with Series B–D CMOs, CROs, and RevOps architects.'}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {['LinkedIn', 'X / Twitter', 'YouTube', 'Spotify'].map(
                  (platform) => (
                    <button
                      key={platform}
                      type="button"
                      onClick={() =>
                        setFooterNotice(
                          `Connected to Nexus Growth Lab on ${platform} (@nexusgrowthlab).`
                        )
                      }
                      className="px-3.5 py-2 rounded-xl bg-[#111827] border border-[#1F2937] hover:border-[#2563EB] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Share2 size={12} style={{ color: primaryColor }} />
                      <span>{platform}</span>
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {footerNotice && (
            <div className="p-3.5 rounded-xl bg-[#111827] border border-[#2563EB]/40 flex items-center justify-between gap-4 text-xs">
              <span>{footerNotice}</span>
              <button
                type="button"
                onClick={() => setFooterNotice(null)}
                className="font-semibold underline cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Copyright Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9CA3AF]">
            <span>
              © {new Date().getFullYear()} Nexus Growth Lab Inc. All rights reserved.
            </span>
            <span>
              San Francisco · New York · London · SOC-2 Type II Verified
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
