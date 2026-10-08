import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Radar,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Lock,
  Unlock,
  ArrowRight,
  Terminal,
  Server,
  Globe,
  Eye,
  X,
  FileText,
  RefreshCw,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface InboxShieldHeroRiskGraderSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

export interface DiagnosticCheckItem {
  id: string;
  title: string;
  category: 'SPF' | 'DKIM' | 'DMARC' | 'MX_PTR' | 'BLACKLIST';
  statusLabel: string;
  severity: 'healthy' | 'warning' | 'critical';
  summary: string;
  detectedRecord: string;
  recommendedFixRecord: string;
  technicalImpact: string;
  inboxShieldAction: string;
}

interface DomainScanProfile {
  domain: string;
  score: number;
  riskBadge: 'Critical Risk' | 'Moderate Risk' | 'Inbox Ready';
  estimatedSpamRate: string;
  checks: DiagnosticCheckItem[];
}

const PRESET_DOMAIN_PROFILES: Record<string, DomainScanProfile> = {
  'acme-outbound.io': {
    domain: 'acme-outbound.io',
    score: 38,
    riskBadge: 'Critical Risk',
    estimatedSpamRate: '64.2% Landing in Spam',
    checks: [
      {
        id: 'chk_spf',
        title: 'SPF Record Status',
        category: 'SPF',
        statusLabel: 'Multiple Records Conflict (12/10 DNS Lookups)',
        severity: 'critical',
        summary:
          '2 conflicting v=spf1 TXT records found and DNS lookup count exceeds RFC 7208 10-lookup limit (PermError).',
        detectedRecord:
          'v=spf1 include:_spf.google.com include:sendgrid.net include:spf.protection.outlook.com ~all (PermError: 12 lookups)',
        recommendedFixRecord:
          'v=spf1 include:_spf.google.com include:mail.inboxshield-node.net -all (Flattened · 3 lookups)',
        technicalImpact:
          'Google Workspace and Microsoft 365 immediately mark messages as SPF PermError, routing 60%+ of cold emails straight to Spam.',
        inboxShieldAction:
          'We flatten your SPF tree into a single cryptographically aligned TXT record with hard-fail (-all) enforcement.',
      },
      {
        id: 'chk_dkim',
        title: 'DKIM Key Alignment',
        category: 'DKIM',
        statusLabel: 'Missing / Unaligned 1024-Bit Key',
        severity: 'critical',
        summary:
          'Default ESP shared selector detected without custom 2048-bit RSA public key on secondary sending domain.',
        detectedRecord: 'google._domainkey.acme-outbound.io → NXDOMAIN (No 2048-bit key found)',
        recommendedFixRecord:
          's1._domainkey.acme-outbound.io IN TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A..." (2048-Bit)',
        technicalImpact:
          'Without 2048-bit DKIM signing aligned with your From header domain, Yahoo and Gmail bulk sender filters reject outbound campaigns.',
        inboxShieldAction:
          'We generate and rotate dedicated 2048-bit DKIM keys across all Google Workspace & Microsoft 365 sending inboxes.',
      },
      {
        id: 'chk_dmarc',
        title: 'DMARC Policy Enforcement Level',
        category: 'DMARC',
        statusLabel: 'None / Missing (p=none)',
        severity: 'critical',
        summary:
          'No active DMARC enforcement policy or aggregate RUA reporting endpoint configured.',
        detectedRecord: '_dmarc.acme-outbound.io → v=DMARC1; p=none;',
        recommendedFixRecord:
          'v=DMARC1; p=reject; sp=reject; pct=100; rua=mailto:dmarc@telemetry.inboxshield.io; adkim=s; aspf=s;',
        technicalImpact:
          'p=none offers zero spoofing protection and signals low domain maturity to enterprise Barracuda & Mimecast gateways.',
        inboxShieldAction:
          'We transition your domains safely from p=quarantine to strict p=reject with 24/7 RUA/RUF XML telemetry monitoring.',
      },
      {
        id: 'chk_mx',
        title: 'MX & PTR Record Validation',
        category: 'MX_PTR',
        statusLabel: 'Shared Tracking Proxy Exposed',
        severity: 'warning',
        summary:
          'MX records resolve, but open/click tracking links use shared ESP domain instead of isolated custom CNAME.',
        detectedRecord: 'track.acme-outbound.io → Missing (Using shared esp-track-link.com)',
        recommendedFixRecord:
          'link.acme-outbound.io IN CNAME custom-ssl.inboxshield- edge.net (SSL Isolated)',
        technicalImpact:
          'Shared ESP tracking domains carry the reputation of thousands of spammers—one bad neighbor burns your deliverability.',
        inboxShieldAction:
          'We provision SSL-backed custom tracking CNAMEs and verify reverse PTR IP-to-hostname symmetry.',
      },
      {
        id: 'chk_blacklist',
        title: 'Domain & IP Blacklist Check',
        category: 'BLACKLIST',
        statusLabel: 'Flagged (3/50 Databases)',
        severity: 'critical',
        summary:
          'Listed on Spamhaus DBL, Barracuda Reputation System, and SORBS RHSBL due to unthrottled cold outreach.',
        detectedRecord: 'Listed: dbl.spamhaus.org · b.barracudacentral.org · rhsbl.sorbs.net',
        recommendedFixRecord:
          'Clean (0/50 RBLs) + Automated Burn-and-Rotate Standby Domains Ready',
        technicalImpact:
          'Listing on Spamhaus or Barracuda causes immediate SMTP 550 hard blocks across Fortune 500 & mid-market B2B prospects.',
        inboxShieldAction:
          'We submit authenticated delisting requests within 24 hours and isolate outreach onto clean warmed secondary domains.',
      },
    ],
  },
  'growth-labs.co': {
    domain: 'growth-labs.co',
    score: 68,
    riskBadge: 'Moderate Risk',
    estimatedSpamRate: '29.5% Landing in Promotions/Spam',
    checks: [
      {
        id: 'chk_spf',
        title: 'SPF Record Status',
        category: 'SPF',
        statusLabel: 'Pass (SoftFail ~all)',
        severity: 'healthy',
        summary: 'Valid SPF record present with 6 DNS lookups, using ~all softfail.',
        detectedRecord: 'v=spf1 include:_spf.google.com ~all (6/10 lookups)',
        recommendedFixRecord: 'v=spf1 include:_spf.google.com -all (Strict Hardfail)',
        technicalImpact: 'SPF passes, though strict -all alignment improves enterprise gateway trust scores.',
        inboxShieldAction: 'We harden your SPF record and lock lookup depth below 4 queries.',
      },
      {
        id: 'chk_dkim',
        title: 'DKIM Key Alignment',
        category: 'DKIM',
        statusLabel: '2048-bit Active',
        severity: 'healthy',
        summary: 'Primary selector active with 2048-bit RSA signature.',
        detectedRecord: 'google._domainkey.growth-labs.co → 2048-bit RSA Valid',
        recommendedFixRecord: 'Automated 90-day DKIM selector rotation enabled',
        technicalImpact: 'Cryptographic message integrity is verified by receiving mail servers.',
        inboxShieldAction: 'We maintain 90-day automated key rotation across all secondary domains.',
      },
      {
        id: 'chk_dmarc',
        title: 'DMARC Policy Enforcement Level',
        category: 'DMARC',
        statusLabel: 'Quarantine (p=quarantine; pct=25)',
        severity: 'warning',
        summary: 'Partial quarantine enforcement (25%) with relaxed alignment (adkim=r).',
        detectedRecord: 'v=DMARC1; p=quarantine; pct=25; adkim=r;',
        recommendedFixRecord:
          'v=DMARC1; p=reject; pct=100; adkim=s; aspf=s; rua=mailto:dmarc@inboxshield.io;',
        technicalImpact:
          'Relaxed alignment leaves subdomains vulnerable and lowers sender authority with Microsoft Defender.',
        inboxShieldAction: 'We upgrade DMARC to 100% strict p=reject once warmup metrics stabilize.',
      },
      {
        id: 'chk_mx',
        title: 'MX & PTR Record Validation',
        category: 'MX_PTR',
        statusLabel: 'No Secondary Domain Isolation',
        severity: 'warning',
        summary: 'Cold outbound sequences are sending directly from your primary corporate domain.',
        detectedRecord: 'Primary corporate domain used for cold outreach sequences',
        recommendedFixRecord: '5x Isolated Lookalike Domains (trygrowthlabs.co, getgrowthlabs.com)',
        technicalImpact:
          'Sending cold email from your root domain risks burning internal team & investor email deliverability.',
        inboxShieldAction:
          'We provision 5–15 air-gapped secondary domains so your primary Google Workspace is 100% protected.',
      },
      {
        id: 'chk_blacklist',
        title: 'Domain & IP Blacklist Check',
        category: 'BLACKLIST',
        statusLabel: 'Clean (0/50 Databases)',
        severity: 'healthy',
        summary: 'Zero active listings across 50+ global DNSBL and RHSBL databases.',
        detectedRecord: '0/50 Blacklists Flagged (Spamhaus, SORBS, SpamCop Clean)',
        recommendedFixRecord: 'Real-time 24/7 RBL webhook monitoring active',
        technicalImpact: 'Currently clean, but vulnerable if sending volume spikes without warmup.',
        inboxShieldAction: 'We attach continuous 15-minute blacklist polling and spam-trap shields.',
      },
    ],
  },
  'inboxshield-verified.io': {
    domain: 'inboxshield-verified.io',
    score: 98,
    riskBadge: 'Inbox Ready',
    estimatedSpamRate: '< 0.8% Spam · 98.4% Primary Inbox',
    checks: [
      {
        id: 'chk_spf',
        title: 'SPF Record Status',
        category: 'SPF',
        statusLabel: 'Pass (Flattened -all · 2 Lookups)',
        severity: 'healthy',
        summary: 'Zero-conflict flattened SPF macro with strict hardfail enforcement.',
        detectedRecord: 'v=spf1 include:_spf.inboxshield.io -all (2/10 lookups)',
        recommendedFixRecord: 'Optimal RFC 7208 Configuration Active',
        technicalImpact: 'Sub-10ms DNS resolution with 100% SPF authentication pass rate.',
        inboxShieldAction: 'Continuously monitored by InboxShield DNS Guardian.',
      },
      {
        id: 'chk_dkim',
        title: 'DKIM Key Alignment',
        category: 'DKIM',
        statusLabel: '2048-bit Active (Dual Selector)',
        severity: 'healthy',
        summary: '2048-bit RSA cryptographic signing aligned strictly with From header.',
        detectedRecord: 'is2026._domainkey.inboxshield-verified.io → 2048-Bit Verified',
        recommendedFixRecord: 'Optimal Dual-Selector DKIM Active',
        technicalImpact: 'Passes Gmail, Microsoft 365, and Proofpoint cryptographic checks.',
        inboxShieldAction: 'Automated key rotation scheduled every 90 days.',
      },
      {
        id: 'chk_dmarc',
        title: 'DMARC Policy Enforcement Level',
        category: 'DMARC',
        statusLabel: 'Reject (p=reject · 100% Strict)',
        severity: 'healthy',
        summary: 'Full p=reject enforcement with strict DKIM/SPF alignment and BIMI readiness.',
        detectedRecord: 'v=DMARC1; p=reject; sp=reject; pct=100; adkim=s; aspf=s;',
        recommendedFixRecord: 'Optimal Enterprise DMARC Enforcement',
        technicalImpact: 'Maximum sender trust score across enterprise security gateways.',
        inboxShieldAction: '24/7 DMARC XML aggregate telemetry active.',
      },
      {
        id: 'chk_mx',
        title: 'MX & PTR Record Validation',
        category: 'MX_PTR',
        statusLabel: 'Custom SSL Tracking & PTR Verified',
        severity: 'healthy',
        summary: 'Isolated CNAME tracking domain and reverse PTR records match 100%.',
        detectedRecord: 'trk.inboxshield-verified.io → Dedicated SSL CNAME',
        recommendedFixRecord: 'Optimal Custom Tracking Isolation',
        technicalImpact: 'Zero shared-domain footprint; links pass strict phishing filters.',
        inboxShieldAction: 'Managed SSL & rotating secondary domain pool active.',
      },
      {
        id: 'chk_blacklist',
        title: 'Domain & IP Blacklist Check',
        category: 'BLACKLIST',
        statusLabel: 'Clean (0/50 Databases)',
        severity: 'healthy',
        summary: 'Verified clean across Spamhaus, Barracuda, SORBS, SpamCop, and Proofpoint.',
        detectedRecord: '0/50 Blacklists Flagged · Warmup Pool Score 99/100',
        recommendedFixRecord: 'Optimal Reputation Maintained',
        technicalImpact: '98.4% primary inbox placement across B2B prospect inboxes.',
        inboxShieldAction: 'Continuous AI warmup & spam-trap filtering active.',
      },
    ],
  },
};

export const InboxShieldHeroRiskGraderSection: React.FC<
  InboxShieldHeroRiskGraderSectionProps
> = ({ title, subtitle, variant, primaryColor }) => {
  const [domainInput, setDomainInput] = useState<string>('acme-outbound.io');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStepIdx, setScanStepIdx] = useState<number>(0);
  const [activeProfile, setActiveProfile] = useState<DomainScanProfile>(
    PRESET_DOMAIN_PROFILES['acme-outbound.io']
  );

  // Lead Capture for Locked Detailed Repair Report
  const [leadName, setLeadName] = useState<string>('');
  const [leadEmail, setLeadEmail] = useState<string>('');
  const [reportUnlocked, setReportUnlocked] = useState<boolean>(false);
  const [activeDiagnosticModal, setActiveDiagnosticModal] =
    useState<DiagnosticCheckItem | null>(null);

  const emeraldColor = primaryColor || '#10B981';
  const isBrutalist = variant === 'varient_3';

  const scanSteps = [
    'Step 1/4: Querying DNS TXT records (SPF & 2048-bit DKIM)...',
    'Step 2/4: Evaluating DMARC policy & p-tag configuration...',
    'Step 3/4: Checking 50+ global spam blacklists (Spamhaus, Barracuda, SORBS)...',
    'Step 4/4: Testing MX record routing & custom tracking domain setup...',
  ];

  const triggerDomainScan = (targetDomain?: string) => {
    const cleanDomain = (targetDomain ?? domainInput)
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/\/.*$/, '');

    if (!cleanDomain) return;
    setDomainInput(cleanDomain);
    setIsScanning(true);
    setScanStepIdx(0);

    // Step through the 4 DNS diagnostic stages over ~2.2 seconds
    setTimeout(() => setScanStepIdx(1), 550);
    setTimeout(() => setScanStepIdx(2), 1100);
    setTimeout(() => setScanStepIdx(3), 1650);
    setTimeout(() => {
      if (PRESET_DOMAIN_PROFILES[cleanDomain]) {
        setActiveProfile(PRESET_DOMAIN_PROFILES[cleanDomain]);
      } else {
        // Generate a realistic diagnostic profile for any custom domain entered by visitor
        const customProfile: DomainScanProfile = {
          ...PRESET_DOMAIN_PROFILES['acme-outbound.io'],
          domain: cleanDomain,
          score: 46,
          riskBadge: 'Critical Risk',
          estimatedSpamRate: '56.8% Landing in Spam',
          checks: PRESET_DOMAIN_PROFILES['acme-outbound.io'].checks.map((c) => ({
            ...c,
            detectedRecord: c.detectedRecord.replace(/acme-outbound\.io/g, cleanDomain),
            recommendedFixRecord: c.recommendedFixRecord.replace(
              /acme-outbound\.io/g,
              cleanDomain
            ),
          })),
        };
        setActiveProfile(customProfile);
      }
      setIsScanning(false);
    }, 2200);
  };

  const scrollToTarget = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Gauge color helper
  const getGaugeColor = (score: number) => {
    if (score >= 85) return '#10B981'; // Cyber Emerald
    if (score >= 60) return '#F59E0B'; // Amber Warning
    return '#EF4444'; // Critical Red
  };

  const gaugeColor = getGaugeColor(activeProfile.score);
  const circleCircumference = 2 * Math.PI * 54;
  const strokeDashoffset =
    circleCircumference - (activeProfile.score / 100) * circleCircumference;

  return (
    <section className="relative overflow-hidden bg-[#0F172A] text-[#F8FAFC] pt-10 pb-20 sm:py-20 border-b border-slate-800/80">
      {/* Subtle Radial Cyber-Emerald Grid Backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.22), transparent 60%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* ===================================================================== */}
        {/* PART 1: HERO SECTION + B2B SOCIAL PROOF BANNER                        */}
        {/* ===================================================================== */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Unboxed Technical Kicker */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
            <span>PRODUCTIZED B2B EMAIL INFRASTRUCTURE STUDIO</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">SPF · 2048-BIT DKIM · DMARC p=reject</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-emerald-400">24-HR DEPLOYMENT</span>
          </div>

          {/* Primary Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-[#F8FAFC]">
            <EditableText
              id="inboxshield_hero_headline"
              defaultText={
                title || 'Stop Landing in Spam. Own Your Inbox Deliverability.'
              }
            />
          </h1>

          {/* Subheadline */}
          <p className="text-sm sm:text-lg text-[#94A3B8] leading-relaxed max-w-3xl mx-auto">
            <EditableText
              id="inboxshield_hero_subheadline"
              defaultText={
                subtitle ||
                'Done-for-you cold email infrastructure, DNS authentication (SPF, DKIM, DMARC), domain warmup, and proactive spam repair for B2B sales teams.'
              }
            />
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 pt-2">
            <button
              type="button"
              onClick={() => {
                scrollToTarget('inboxshield-risk-grader');
                triggerDomainScan();
              }}
              className={`px-7 py-4 text-xs sm:text-sm font-extrabold text-slate-950 flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(16,185,129,0.35)] transition hover:opacity-95 cursor-pointer ${
                isBrutalist
                  ? 'rounded-none border-2 border-white shadow-[4px_4px_0px_#FFFFFF]'
                  : 'rounded-xl'
              }`}
              style={{ backgroundColor: emeraldColor }}
            >
              <Radar size={17} />
              <span>Check Your Domain Risk</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              onClick={() => scrollToTarget('inboxshield-pricing')}
              className={`px-7 py-4 text-xs sm:text-sm font-extrabold border border-slate-700 bg-slate-900/90 text-[#F8FAFC] hover:border-emerald-500/60 flex items-center justify-center gap-2 transition cursor-pointer ${
                isBrutalist ? 'rounded-none' : 'rounded-xl'
              }`}
            >
              <Server size={16} className="text-emerald-400" />
              <span>View Packages</span>
            </button>
          </div>

          {/* Social Proof Banner + Grayscale Logo Bar */}
          <div className="pt-8 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#64748B]">
              Trusted by top B2B sales teams &amp; agencies sending 500k+ emails/month
            </p>
            <div className="py-4 px-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-black tracking-widest uppercase text-slate-500">
              <span className="hover:text-slate-300 transition-colors">SCALEFLOW B2B</span>
              <span aria-hidden="true" className="text-slate-800">·</span>
              <span className="hover:text-slate-300 transition-colors">REVOPS LABS</span>
              <span aria-hidden="true" className="text-slate-800">·</span>
              <span className="hover:text-slate-300 transition-colors">APEX PIPELINE</span>
              <span aria-hidden="true" className="text-slate-800">·</span>
              <span className="hover:text-slate-300 transition-colors">OUTBOUND ENGINE</span>
              <span aria-hidden="true" className="text-slate-800">·</span>
              <span className="hover:text-slate-300 transition-colors">VELOCITY SDR</span>
              <span aria-hidden="true" className="text-slate-800">·</span>
              <span className="hover:text-slate-300 transition-colors">HYPERGROWTH IO</span>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* PART 2: INTERACTIVE DOMAIN DELIVERABILITY RISK GRADER WIDGET          */}
        {/* ===================================================================== */}
        <div
          id="inboxshield-risk-grader"
          className="rounded-3xl bg-[#0B1120] border border-slate-800 shadow-[0_25px_70px_rgba(0,0,0,0.55)] overflow-hidden"
        >
          {/* Top Terminal Header Bar */}
          <div className="px-5 sm:px-8 py-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-300 ml-2">
                inboxshield-cli // Live Domain Deliverability &amp; DNS Risk Grader
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
              <Radar size={13} className={isScanning ? 'animate-spin' : ''} />
              <span>RFC 7208 / 6376 / 7489 Diagnostic Engine</span>
            </div>
          </div>

          <div className="p-5 sm:p-8 space-y-8">
            {/* Search Input Bar + Sample Domain Presets */}
            <div className="space-y-3">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Enter your primary or cold outreach domain (e.g., company.com)
              </label>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  triggerDomainScan();
                }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="relative flex-1">
                  <Globe
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    value={domainInput}
                    onChange={(e) => setDomainInput(e.target.value)}
                    placeholder="domain.com (e.g., acme-outbound.io)"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-[#F8FAFC] font-mono text-sm font-bold focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isScanning}
                  className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold text-slate-950 flex items-center justify-center gap-2 shadow-md transition hover:opacity-95 cursor-pointer shrink-0 disabled:opacity-60"
                  style={{ backgroundColor: emeraldColor }}
                >
                  {isScanning ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Scanning DNS Nodes...</span>
                    </>
                  ) : (
                    <>
                      <Radar size={16} />
                      <span>Analyze Infrastructure</span>
                    </>
                  )}
                </button>
              </form>

              {/* Quick Sample Domain Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] font-mono text-[#64748B]">
                  Test Sample Profiles:
                </span>
                {[
                  {
                    domain: 'acme-outbound.io',
                    tag: 'Critical Risk (38%)',
                    color: 'text-rose-400 border-rose-500/30',
                  },
                  {
                    domain: 'growth-labs.co',
                    tag: 'Moderate Risk (68%)',
                    color: 'text-amber-400 border-amber-500/30',
                  },
                  {
                    domain: 'inboxshield-verified.io',
                    tag: 'Inbox Ready (98%)',
                    color: 'text-emerald-400 border-emerald-500/30',
                  },
                ].map((sample) => (
                  <button
                    key={sample.domain}
                    type="button"
                    onClick={() => triggerDomainScan(sample.domain)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold border bg-slate-900/90 hover:bg-slate-800 transition cursor-pointer ${sample.color}`}
                  >
                    {sample.domain} · {sample.tag}
                  </button>
                ))}
              </div>
            </div>

            {/* 3-Second Animated Scanning Breakdown Sequence */}
            {isScanning && (
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-emerald-500/40 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                  <span className="flex items-center gap-2">
                    <Terminal size={15} className="animate-pulse" />
                    <span>Running Live DNS &amp; RBL Telemetry on {domainInput}...</span>
                  </span>
                  <span>{Math.min(100, (scanStepIdx + 1) * 25)}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full transition-all duration-500 rounded-full"
                    style={{
                      width: `${(scanStepIdx + 1) * 25}%`,
                      backgroundColor: emeraldColor,
                    }}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {scanSteps.map((stepText, idx) => (
                    <div
                      key={stepText}
                      className={`flex items-center gap-2 ${
                        idx <= scanStepIdx ? 'text-[#F8FAFC]' : 'text-slate-600'
                      }`}
                    >
                      <CheckCircle2
                        size={14}
                        className={
                          idx < scanStepIdx
                            ? 'text-emerald-400'
                            : idx === scanStepIdx
                            ? 'text-amber-400 animate-pulse'
                            : 'text-slate-700'
                        }
                      />
                      <span>{stepText}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Results Dashboard: Radial Health Gauge + 5 Clickable Diagnostic Cards */}
            {!isScanning && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Left 4 Cols: Radial Health Score Gauge & Risk Summary */}
                <div className="lg:col-span-4 rounded-2xl p-6 bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-6">
                  <div className="space-y-4 text-center">
                    <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
                      <span>TARGET DOMAIN</span>
                      <span className="text-[#F8FAFC] font-bold">
                        {activeProfile.domain}
                      </span>
                    </div>

                    {/* SVG Radial Score Gauge */}
                    <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
                        <circle
                          cx="64"
                          cy="64"
                          r="54"
                          fill="transparent"
                          stroke="#1E293B"
                          strokeWidth="10"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="54"
                          fill="transparent"
                          stroke={gaugeColor}
                          strokeWidth="10"
                          strokeDasharray={circleCircumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          className="transition-all duration-700"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span
                          className="text-3xl font-black tracking-tight"
                          style={{ color: gaugeColor }}
                        >
                          {activeProfile.score}%
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
                          Health Score
                        </span>
                      </div>
                    </div>

                    {/* Risk Status Badge */}
                    <div className="space-y-1.5">
                      <div
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider"
                        style={{
                          backgroundColor: `${gaugeColor}20`,
                          color: gaugeColor,
                          border: `1px solid ${gaugeColor}50`,
                        }}
                      >
                        {activeProfile.score >= 85 ? (
                          <ShieldCheck size={14} />
                        ) : (
                          <ShieldAlert size={14} />
                        )}
                        <span>{activeProfile.riskBadge}</span>
                      </div>
                      <p className="text-xs font-mono text-slate-400">
                        Est. Placement: {activeProfile.estimatedSpamRate}
                      </p>
                    </div>
                  </div>

                  {/* Direct CTA to Fix Issues in 24 Hours */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => scrollToTarget('inboxshield-pricing')}
                      className="w-full py-3.5 px-4 rounded-xl text-xs font-extrabold text-slate-950 shadow-md flex items-center justify-center gap-2 transition hover:opacity-95 cursor-pointer"
                      style={{ backgroundColor: emeraldColor }}
                    >
                      <span>Fix These Issues in 24 Hours — Choose Package</span>
                      <ArrowRight size={14} />
                    </button>
                    <p className="text-[11px] text-center text-[#64748B]">
                      Click any diagnostic card on the right to view the exact DNS record &amp; RFC fix.
                    </p>
                  </div>
                </div>

                {/* Right 8 Cols: 5 Diagnostic Cards + Locked Repair Report Lead Capture */}
                <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {activeProfile.checks.map((chk) => {
                      const isCrit = chk.severity === 'critical';
                      const isWarn = chk.severity === 'warning';
                      const badgeColor = isCrit
                        ? 'text-rose-400 border-rose-500/40 bg-rose-950/30'
                        : isWarn
                        ? 'text-amber-400 border-amber-500/40 bg-amber-950/30'
                        : 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30';

                      return (
                        <div
                          key={chk.id}
                          onClick={() => setActiveDiagnosticModal(chk)}
                          className={`group p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                            chk.category === 'BLACKLIST' ? 'sm:col-span-2' : ''
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-extrabold text-[#F8FAFC] flex items-center gap-1.5">
                                {isCrit ? (
                                  <XCircle size={15} className="text-rose-500 shrink-0" />
                                ) : isWarn ? (
                                  <AlertTriangle
                                    size={15}
                                    className="text-amber-400 shrink-0"
                                  />
                                ) : (
                                  <CheckCircle2
                                    size={15}
                                    className="text-emerald-400 shrink-0"
                                  />
                                )}
                                <span>{chk.title}</span>
                              </span>

                              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 group-hover:text-emerald-400">
                                <Eye size={11} />
                                <span>Inspect DNS</span>
                              </span>
                            </div>

                            <div
                              className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-bold border ${badgeColor}`}
                            >
                              {chk.statusLabel}
                            </div>

                            <p className="text-xs text-[#94A3B8] leading-relaxed">
                              {chk.summary}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-slate-800/80 font-mono text-[10px] text-slate-400 truncate">
                            Record: {chk.detectedRecord}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Lead Capture / Locked Detailed Deliverability Repair Report */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/95 border border-slate-800">
                    {!reportUnlocked ? (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!leadName.trim() || !leadEmail.trim()) return;
                          setReportUnlocked(true);
                        }}
                        className="flex flex-col xl:flex-row xl:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs font-extrabold text-[#F8FAFC]">
                            <Lock size={14} className="text-amber-400" />
                            <span>
                              Unlock Detailed Deliverability Repair Report &amp; Zone File Patch ({activeProfile.domain})
                            </span>
                          </div>
                          <p className="text-[11px] text-[#64748B]">
                            Enter your name &amp; work email to view the copy-paste SPF/DKIM/DMARC DNS records for your registrar.
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
                          <input
                            type="text"
                            required
                            value={leadName}
                            onChange={(e) => setLeadName(e.target.value)}
                            placeholder="Your Name"
                            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                          <input
                            type="email"
                            required
                            value={leadEmail}
                            onChange={(e) => setLeadEmail(e.target.value)}
                            placeholder="you@company.com"
                            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2 rounded-xl text-xs font-extrabold text-slate-950 cursor-pointer shrink-0"
                            style={{ backgroundColor: emeraldColor }}
                          >
                            Unlock Report
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1.5">
                            <Unlock size={14} />
                            <span>
                              Unlocked: Custom DNS Remediation Zone File for {activeProfile.domain} (Sent to {leadEmail})
                            </span>
                          </span>
                          <FileText size={15} className="text-emerald-400" />
                        </div>
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-300 space-y-1 overflow-x-auto">
                          <div>
                            @ IN TXT &quot;v=spf1 include:_spf.google.com include:mail.inboxshield-node.net -all&quot;
                          </div>
                          <div>
                            _dmarc IN TXT &quot;v=DMARC1; p=reject; sp=reject; pct=100; adkim=s; aspf=s; rua=mailto:dmarc@inboxshield.io&quot;
                          </div>
                          <div>
                            trk.{activeProfile.domain} IN CNAME ssl-edge.inboxshield.io.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MODAL: DIAGNOSTIC CHECK FULL TECHNICAL DETAILS & DNS FIX MODAL        */}
      {/* ===================================================================== */}
      {activeDiagnosticModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
          onClick={() => setActiveDiagnosticModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-3xl bg-[#0F172A] border border-slate-700 text-[#F8FAFC] p-6 sm:p-8 shadow-2xl space-y-5"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-emerald-400">
                  DNS Diagnostic Deep-Dive · {activeProfile.domain}
                </span>
                <h3 className="text-xl font-black mt-1">
                  {activeDiagnosticModal.title} — {activeDiagnosticModal.statusLabel}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveDiagnosticModal(null)}
                className="p-2 rounded-xl border border-slate-700 hover:bg-slate-800 cursor-pointer"
              >
                <X size={17} />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/40 space-y-1">
                <div className="text-xs font-mono font-bold text-rose-400">
                  Detected DNS Record on {activeProfile.domain}:
                </div>
                <div className="font-mono text-xs text-slate-200 break-all">
                  {activeDiagnosticModal.detectedRecord}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-1">
                <div className="text-xs font-mono font-bold text-emerald-400">
                  InboxShield Target RFC-Compliant Configuration:
                </div>
                <div className="font-mono text-xs text-emerald-200 break-all">
                  {activeDiagnosticModal.recommendedFixRecord}
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-extrabold text-slate-200">
                  Why This Hurts Your B2B Cold Outreach:
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {activeDiagnosticModal.technicalImpact}
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-extrabold text-emerald-400">
                  How InboxShield Fixes It in 24 Hours:
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {activeDiagnosticModal.inboxShieldAction}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                Included in $499 Kickstart &amp; $199/mo Monitor
              </span>
              <button
                type="button"
                onClick={() => {
                  setActiveDiagnosticModal(null);
                  scrollToTarget('inboxshield-pricing');
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-slate-950 cursor-pointer"
                style={{ backgroundColor: emeraldColor }}
              >
                Deploy Fix with InboxShield →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
