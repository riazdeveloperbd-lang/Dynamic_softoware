import React, { useState } from 'react';
import {
  ShieldCheck,
  ChevronDown,
  Terminal,
  CheckCircle2,
  Radar,
  ArrowUpRight,
  Lock,
  Server,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface InboxShieldFaqFooterSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

const TECHNICAL_FAQS = [
  {
    q: '01. Will this affect my primary Google Workspace or Microsoft 365 corporate domain?',
    a: 'Zero risk to your root domain. Under the InboxShield Method, we never send cold outbound campaigns from your primary corporate domain (e.g., company.com). Instead, we provision and authenticate air-gapped secondary lookalike domains (e.g., trycompany.com, getcompany.io) with 301 root redirects back to your main website. Your executive, billing, and customer emails on your primary domain remain 100% insulated.',
  },
  {
    q: '02. How long does domain warmup take before we can scale cold outreach?',
    a: 'For freshly registered lookalike domains, our automated peer-to-peer B2B warmup protocol takes 14 days to build high sender authority across Google Workspace and Microsoft 365 postmaster filters. During this 14-day ramp, our system gradually scales from 5 to 35 human-simulated emails per day (including automatic opens, thread replies, and "mark as important" signals). Need to send immediately? Our Agency Scale tier includes pre-warmed aged domains ready for Day-1 deployment.',
  },
  {
    q: '03. Can you fix an already blacklisted or burned domain?',
    a: 'Yes. If your domain or sending IP is flagged on Spamhaus DBL, Barracuda, SORBS, or SpamCop, we first audit and patch the underlying DNS misconfiguration (such as broken SPF macros or missing DMARC alignment), pause offending sequences, and submit authenticated delisting requests directly to RBL postmasters within 24 hours. While delisting propagates, we migrate your active campaigns onto clean standby domains so your SDRs experience zero downtime.',
  },
  {
    q: '04. How do you configure SPF, DKIM, and DMARC without needing our root registrar passwords?',
    a: 'We use zero-password delegated access links supported by Cloudflare, Namecheap, GoDaddy, and AWS Route53. During post-purchase onboarding, you grant scoped DNS zone permissions to ops@inboxshield.io—allowing our engineers to configure flattened SPF records, 2048-bit RSA DKIM selectors, strict DMARC p=reject policies, and custom SSL tracking CNAMEs without ever seeing your billing or root credentials.',
  },
  {
    q: '05. Which sending platforms (Instantly, Smartlead, Lemlist, Apollo) do you integrate with?',
    a: 'We natively support and configure all major B2B outbound platforms—including Smartlead.ai, Instantly.ai, Lemlist, Apollo.io, Outreach, Salesloft, and Woodpecker. We connect your new Google Workspace and Microsoft 365 mailboxes via OAuth, configure custom SSL tracking subdomains inside your ESP, and set optimal daily sending limits and warmup schedules.',
  },
];

export const InboxShieldFaqFooterSection: React.FC<
  InboxShieldFaqFooterSectionProps
> = ({ title, subtitle, primaryColor }) => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number>(0);

  const emeraldColor = primaryColor || '#10B981';

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="inboxshield-faq"
      className="bg-[#090E1A] text-[#F8FAFC] pt-16 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* ===================================================================== */}
        {/* PART 1: TECHNICAL FAQS ACCORDION                                      */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left 5 Cols: FAQ Heading & Instant Audit Card */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              <Terminal size={14} />
              <span>TECHNICAL DELIVERABILITY FAQ</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              <EditableText
                id="inboxshield_faq_headline"
                defaultText={
                  title ||
                  'Technical Questions from RevOps, Founders & Outbound Agencies'
                }
              />
            </h2>

            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              <EditableText
                id="inboxshield_faq_subtitle"
                defaultText={
                  subtitle ||
                  'Everything you need to know about secondary domain isolation, 14-day warmup timelines, blacklist delisting, and zero-password DNS delegation.'
                }
              />
            </p>

            {/* Quick CTA Box */}
            <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-bold">
                  NEED A CUSTOM INFRASTRUCTURE AUDIT?
                </span>
                <Lock size={13} className="text-slate-400" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sending 250k+ cold emails per month across multiple client workspaces? Run a free diagnostic or book a 15-minute architecture review with a lead deliverability engineer.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => scrollToSection('inboxshield-risk-grader')}
                  className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-slate-950 flex items-center gap-1.5 cursor-pointer"
                  style={{ backgroundColor: emeraldColor }}
                >
                  <Radar size={14} />
                  <span>Run Domain Risk Grader</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('inboxshield-pricing')}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-700 bg-slate-900 text-slate-200 hover:border-emerald-500/50 cursor-pointer"
                >
                  Compare 3 Tiers →
                </button>
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Expandable Technical FAQ Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {TECHNICAL_FAQS.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={item.q}
                  className={`rounded-2xl border transition-all ${
                    isOpen
                      ? 'bg-[#0F172A] border-emerald-500/50'
                      : 'bg-[#0F172A]/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                    className="w-full p-5 flex items-center justify-between gap-4 text-left text-xs sm:text-sm font-extrabold text-[#F8FAFC] cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      size={17}
                      className={`shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-emerald-400' : 'text-slate-400'
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-t border-slate-800/80">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* PART 2: MULTI-COLUMN SAAS FOOTER                                      */}
        {/* ===================================================================== */}
        <div className="pt-12 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-950 font-black"
                style={{ backgroundColor: emeraldColor }}
              >
                <ShieldCheck size={19} strokeWidth={2.4} />
              </div>
              <div>
                <span className="text-base font-black tracking-tight text-white">
                  InboxShield
                </span>
                <span className="block text-[10px] font-mono text-emerald-400">
                  B2B EMAIL INFRASTRUCTURE &amp; DELIVERABILITY STUDIO
                </span>
              </div>
            </div>
            <p className="text-[#64748B] max-w-md leading-relaxed">
              Done-for-you cold email infrastructure, cryptographic DNS alignment (SPF, 2048-bit DKIM, strict DMARC p=reject), isolated lookalike domains, and 24/7 blacklist remediation for B2B outbound teams.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 size={13} />
                <span>RFC 7208 / 6376 / 7489 Compliant</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Server size={13} />
                <span>Google Workspace &amp; Microsoft 365 Partner</span>
              </span>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="font-mono font-bold uppercase tracking-wider text-slate-300">
              Infrastructure Stack
            </div>
            <ul className="space-y-1.5 text-[#64748B]">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('inboxshield-risk-grader')}
                  className="hover:text-emerald-400 cursor-pointer"
                >
                  Domain Deliverability Risk Grader
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('inboxshield-pain-solution')}
                  className="hover:text-emerald-400 cursor-pointer"
                >
                  SPF Flattening &amp; 2048-Bit DKIM
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('inboxshield-slider')}
                  className="hover:text-emerald-400 cursor-pointer"
                >
                  Before / After Open-Rate Slider
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('inboxshield-pricing')}
                  className="hover:text-emerald-400 cursor-pointer"
                >
                  Automated Domain Burn-and-Rotate
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <div className="font-mono font-bold uppercase tracking-wider text-slate-300">
              Supported Sending Platforms
            </div>
            <ul className="space-y-1.5 text-[#64748B]">
              <li>Smartlead.ai Master Inbox Clusters</li>
              <li>Instantly.ai Unibox &amp; Warmup</li>
              <li>Lemlist &amp; Woodpecker Outbound</li>
              <li>Apollo.io &amp; Outreach Enterprise</li>
              <li>Custom SMTP &amp; Dedicated IP Pools</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#64748B]">
          <span>
            © {new Date().getFullYear()} InboxShield Deliverability Studio Inc. All rights reserved.
          </span>
          <span className="font-mono flex items-center gap-1">
            <span>inboxshield.io</span>
            <ArrowUpRight size={12} />
          </span>
        </div>
      </div>
    </footer>
  );
};
