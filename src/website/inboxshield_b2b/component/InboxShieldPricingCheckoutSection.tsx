import React, { useState } from 'react';
import {
  ShieldCheck,
  Check,
  CreditCard,
  Lock,
  Server,
  Sparkles,
  ArrowRight,
  Eye,
  X,
  CheckCircle2,
  Globe,
  Terminal,
  RefreshCw,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface InboxShieldPricingCheckoutSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

export interface PricingTierPackage {
  id: string;
  name: string;
  altTitle: string;
  billingType: 'one_time' | 'monthly';
  priceDisplay: string;
  billingSubtext: string;
  bestFor: string;
  featured: boolean;
  badgeText?: string;
  deliverables: string[];
  slaGuarantee: string;
  turnaroundTime: string;
  architectureBreakdown: string[];
}

const INBOXSHIELD_PRICING_TIERS: PricingTierPackage[] = [
  {
    id: 'tier_kickstart',
    name: 'Infrastructure Kickstart',
    altTitle: 'Infrastructure Setup · Done-For-You',
    billingType: 'one_time',
    priceDisplay: '$499',
    billingSubtext: 'One-Time Setup Fee · Zero Recurring Lock-In',
    bestFor: 'Best for: New outbound sales teams setting up initial cold outreach domains.',
    featured: false,
    badgeText: 'ONE-TIME INFRASTRUCTURE',
    deliverables: [
      '5 Secondary Lookalike Domains configured & air-gapped',
      'Full SPF Flattening, 2048-Bit DKIM & DMARC (p=reject) Setup',
      'Custom SSL Tracking Domains (CNAMEs) per sending domain',
      '14-Day Email Service Provider (ESP) Warm-up Protocol Setup',
      '15 Google Workspace / Microsoft 365 Inbox Provisioning',
      '301 Root Domain Redirects to your primary website',
    ],
    slaGuarantee: '100% DNS Authentication Pass Guarantee in 24 Hours',
    turnaroundTime: '24-Hour Turnaround from Registrar Delegation',
    architectureBreakdown: [
      'Automated Cloudflare / Namecheap DNS zone provisioning via zero-password delegate access.',
      'Dual-selector 2048-bit RSA DKIM keys verified across Gmail, Outlook, and Yahoo postmaster tools.',
      'Direct API connection into Instantly, Smartlead, Lemlist, Apollo, or Outreach.',
    ],
  },
  {
    id: 'tier_monitor',
    name: 'Inbox Shield & Monitor',
    altTitle: 'Inbox Monitor & Repair · Continuous Defense',
    billingType: 'monthly',
    priceDisplay: '$199',
    billingSubtext: 'per month · Cancel or pause anytime',
    bestFor: 'Best for: Active B2B sales teams sending 10k–100k+ cold emails/month.',
    featured: true,
    badgeText: 'MOST POPULAR',
    deliverables: [
      'Up to 15 Outbound & Primary Domains Monitored 24/7',
      'Everything in Setup + 24/7 DMARC Aggregate XML Monitoring',
      'Continuous Automated Blacklist Removal (Spamhaus, Barracuda, SORBS)',
      'Proactive Spam Trap Detection & Auto-Warmup Management',
      'Bi-Weekly Seed-List Inbox Placement Testing (Gmail & O365)',
      'Monthly Executive Deliverability & Domain Health Audit',
    ],
    slaGuarantee: '98%+ Primary Inbox Placement SLA or Free Domain Replacement',
    turnaroundTime: 'Instant Live Telemetry + <12hr Delisting Response',
    architectureBreakdown: [
      'Continuous 15-minute RBL polling across 50+ global spam databases with automated delisting tickets.',
      'Dynamic AI warmup throttle adjustment based on real-time Google Postmaster & Microsoft SNDS reputation.',
      'Automated Slack / Email alerts if any SDR inbox drops below 92% primary placement.',
    ],
  },
  {
    id: 'tier_agency',
    name: 'Agency Scale & Rotate',
    altTitle: 'Scale & Rotate · Enterprise Outbound Engine',
    billingType: 'monthly',
    priceDisplay: '$799',
    billingSubtext: 'per month · Or custom enterprise volume',
    bestFor: 'Best for: Lead gen agencies and enterprise outbound teams sending 250k–1M+ emails/mo.',
    featured: false,
    badgeText: 'AGENCY & ENTERPRISE',
    deliverables: [
      'Up to 30+ / Unlimited Monitored Outbound Domains',
      'Automated Domain Burn-and-Rotate Standby Cluster',
      'Dedicated IP Pool Management & Multi-Tenant Workspace Ops',
      'Priority Spam Repair & 4-Hour Emergency Delisting SLA',
      'White-Label Client Deliverability Reports for Agencies',
      'Dedicated Slack Connect Deliverability Engineer',
    ],
    slaGuarantee: '99.1% Infrastructure Uptime & Hot-Swap Domain Pool Guarantee',
    turnaroundTime: 'Same-Day Onboarding + Dedicated Slack Channel',
    architectureBreakdown: [
      'Pre-warmed reserve pool of 10+ standby domains ready to hot-swap via API if any campaign triggers a filter.',
      'Custom webhook integration with Smartlead / Instantly master campaigns to pause unhealthy inboxes automatically.',
      'Full BIMI (Brand Indicators for Message Identification) & VMC logo setup assistance.',
    ],
  },
];

export const InboxShieldPricingCheckoutSection: React.FC<
  InboxShieldPricingCheckoutSectionProps
> = ({ title, subtitle, primaryColor }) => {
  const [billingFilter, setBillingFilter] = useState<'all' | 'one_time' | 'monthly'>('all');
  const [detailModalTier, setDetailModalTier] = useState<PricingTierPackage | null>(null);
  const [checkoutModalTier, setCheckoutModalTier] = useState<PricingTierPackage | null>(null);
  const [paymentGateway, setPaymentGateway] = useState<'stripe' | 'paddle'>('stripe');
  const [checkoutStep, setCheckoutStep] = useState<'payment' | 'onboarding' | 'complete'>('payment');

  // Checkout & Post-Purchase Onboarding Form State
  const [buyerCompany, setBuyerCompany] = useState<string>('');
  const [buyerEmail, setBuyerEmail] = useState<string>('');
  const [dnsRegistrar, setDnsRegistrar] = useState<string>('Cloudflare (Automated OAuth Delegate)');
  const [domainListInput, setDomainListInput] = useState<string>(
    'trysalesflow.io, getsalesflow.com, usesalesflow.co'
  );
  const [sendingPlatform, setSendingPlatform] = useState<string>('Smartlead.ai');

  const emeraldColor = primaryColor || '#10B981';

  const visibleTiers = INBOXSHIELD_PRICING_TIERS.filter((t) =>
    billingFilter === 'all' ? true : t.billingType === billingFilter
  );

  const openCheckoutFlow = (tier: PricingTierPackage) => {
    setDetailModalTier(null);
    setCheckoutModalTier(tier);
    setCheckoutStep('payment');
  };

  return (
    <section
      id="inboxshield-pricing"
      className="py-16 sm:py-24 bg-[#0F172A] text-[#F8FAFC] border-b border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header + Billing Toggle Switch */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              <Sparkles size={14} />
              <span>PRODUCTIZED INFRASTRUCTURE &amp; DELIVERABILITY TIERS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              <EditableText
                id="inboxshield_pricing_headline"
                defaultText={
                  title ||
                  'Transparent, Productized Pricing. Built for B2B Outbound Scale.'
                }
              />
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              <EditableText
                id="inboxshield_pricing_subtitle"
                defaultText={
                  subtitle ||
                  'Choose a one-time infrastructure buildout or continuous 24/7 deliverability protection. Click any package card to inspect full technical deliverables or start instant onboarding.'
                }
              />
            </p>
          </div>

          {/* 1. TOGGLE SWITCH: All Tiers vs One-Time Setup vs Monthly Continuous Protection */}
          <div className="p-1.5 rounded-2xl bg-slate-900 border border-slate-800 inline-flex items-center gap-1 self-start lg:self-auto">
            {[
              { id: 'all', label: 'All Packages (3)' },
              { id: 'one_time', label: 'One-Time Setup ($499)' },
              { id: 'monthly', label: 'Monthly Protection' },
            ].map((tab) => {
              const active = billingFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    setBillingFilter(tab.id as 'all' | 'one_time' | 'monthly')
                  }
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                    active
                      ? 'text-slate-950 shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  style={active ? { backgroundColor: emeraldColor } : undefined}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Tier Productized Pricing Grid — Click ANY Card for Full Deliverables Modal */}
        <div
          className={`grid grid-cols-1 ${
            visibleTiers.length === 1
              ? 'max-w-xl mx-auto'
              : visibleTiers.length === 2
              ? 'md:grid-cols-2 max-w-4xl mx-auto'
              : 'lg:grid-cols-3'
          } gap-7 items-stretch`}
        >
          {visibleTiers.map((tier) => (
            <div
              key={tier.id}
              onClick={() => setDetailModalTier(tier)}
              className={`group relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all cursor-pointer ${
                tier.featured
                  ? 'bg-[#0B1120] border-2 border-[#10B981] shadow-[0_0_45px_rgba(16,185,129,0.20)]'
                  : 'bg-[#0B1120]/90 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Top Featured Glow Pill */}
              {tier.featured && (
                <div
                  className="absolute -top-3.5 left-6 px-3.5 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-widest text-slate-950 shadow-md"
                  style={{ backgroundColor: emeraldColor }}
                >
                  ★ MOST POPULAR · CONTINUOUS PROTECTION
                </div>
              )}

              <div className="space-y-6">
                {/* Header & Quick Inspect Hint */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400 font-bold">
                      {tier.badgeText}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-emerald-400">
                      <Eye size={12} />
                      <span>Full Spec</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-[#F8FAFC]">
                    {tier.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400">
                    {tier.altTitle}
                  </p>
                </div>

                {/* Price Block */}
                <div className="pb-5 border-b border-slate-800">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black tracking-tight text-[#F8FAFC]">
                      {tier.priceDisplay}
                    </span>
                    <span className="text-xs font-mono text-[#64748B]">
                      {tier.billingType === 'one_time' ? 'one-time' : '/month'}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-emerald-400 mt-1.5">
                    {tier.billingSubtext}
                  </p>
                </div>

                {/* Best For Box */}
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800/90 text-xs text-slate-300 leading-relaxed">
                  {tier.bestFor}
                </div>

                {/* Bulleted Deliverables */}
                <div className="space-y-3">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    Included Deliverables:
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-200">
                    {tier.deliverables.map((deliv) => (
                      <li key={deliv} className="flex items-start gap-2.5">
                        <Check
                          size={15}
                          className="text-emerald-400 shrink-0 mt-0.5"
                        />
                        <span className="leading-relaxed">{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom SLA & CTA Button */}
              <div className="pt-6 mt-6 border-t border-slate-800 space-y-3">
                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                  <span className="truncate">{tier.slaGuarantee}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDetailModalTier(tier);
                    }}
                    className="p-3 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white hover:border-emerald-500/50 transition cursor-pointer"
                    title="Inspect Full Deliverables & SLA"
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openCheckoutFlow(tier);
                    }}
                    className={`flex-1 py-3.5 px-5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition cursor-pointer ${
                      tier.featured
                        ? 'text-slate-950 shadow-lg hover:opacity-95'
                        : 'bg-slate-800 text-white hover:bg-emerald-500 hover:text-slate-950'
                    }`}
                    style={
                      tier.featured ? { backgroundColor: emeraldColor } : undefined
                    }
                  >
                    <span>Get Started</span>
                    <ArrowRight size={15} />
                  </button>
                </div>

                <div className="text-[10px] font-mono text-center text-[#64748B]">
                  Instant Stripe / Paddle Checkout + Automated DNS Onboarding
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MODAL 1: FULL DELIVERABLES & ARCHITECTURE SPECIFICATION MODAL         */}
      {/* ===================================================================== */}
      {detailModalTier && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
          onClick={() => setDetailModalTier(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-3xl bg-[#0F172A] border border-slate-700 text-[#F8FAFC] p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-emerald-400">
                  PACKAGE SPECIFICATION · {detailModalTier.badgeText}
                </span>
                <h3 className="text-2xl font-black mt-1">
                  {detailModalTier.name} ({detailModalTier.priceDisplay})
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {detailModalTier.bestFor}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDetailModalTier(null)}
                className="p-2 rounded-xl border border-slate-700 hover:bg-slate-800 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="font-mono text-xs font-bold text-emerald-400">
                  Included Engineering Deliverables:
                </div>
                <ul className="space-y-2">
                  {detailModalTier.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <CheckCircle2
                        size={15}
                        className="text-emerald-400 shrink-0 mt-0.5"
                      />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div className="font-mono text-xs font-bold text-slate-300">
                  Under-the-Hood Architecture &amp; Deployment Protocol:
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {detailModalTier.architectureBreakdown.map((arch) => (
                    <li key={arch} className="flex items-start gap-2">
                      <Terminal
                        size={14}
                        className="text-emerald-400 shrink-0 mt-0.5"
                      />
                      <span>{arch}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300">
                  <strong>SLA Guarantee:</strong> {detailModalTier.slaGuarantee}
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                  <strong>Deployment Speed:</strong>{' '}
                  {detailModalTier.turnaroundTime}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
              <div>
                <span className="text-2xl font-black text-white">
                  {detailModalTier.priceDisplay}
                </span>
                <span className="text-xs font-mono text-slate-400 ml-2">
                  {detailModalTier.billingSubtext}
                </span>
              </div>

              <button
                type="button"
                onClick={() => openCheckoutFlow(detailModalTier)}
                className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold text-slate-950 flex items-center gap-2 shadow-lg cursor-pointer"
                style={{ backgroundColor: emeraldColor }}
              >
                <CreditCard size={16} />
                <span>Proceed to Checkout &amp; Onboarding →</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 2: STRIPE / PADDLE CHECKOUT & POST-PURCHASE ONBOARDING FLOW     */}
      {/* ===================================================================== */}
      {checkoutModalTier && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto"
          onClick={() => setCheckoutModalTier(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-3xl bg-[#0B1120] border border-slate-700 text-[#F8FAFC] p-6 sm:p-8 shadow-2xl space-y-6 my-auto"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
                  <Lock size={13} />
                  <span>256-BIT ENCRYPTED B2B CHECKOUT &amp; ONBOARDING</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black mt-1">
                  {checkoutModalTier.name} — {checkoutModalTier.priceDisplay}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCheckoutModalTier(null)}
                className="p-2 rounded-xl border border-slate-700 hover:bg-slate-800 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Step Progress Indicator */}
            <div className="grid grid-cols-3 gap-2 text-xs font-mono">
              {[
                { key: 'payment', label: '01. Stripe / Paddle Pay' },
                { key: 'onboarding', label: '02. DNS & ESP Onboarding' },
                { key: 'complete', label: '03. Live Deployment' },
              ].map((st) => (
                <div
                  key={st.key}
                  className={`py-2 px-3 rounded-xl border text-center font-bold ${
                    checkoutStep === st.key
                      ? 'border-emerald-500 bg-emerald-950/30 text-emerald-300'
                      : 'border-slate-800 bg-slate-900/60 text-slate-500'
                  }`}
                >
                  {st.label}
                </div>
              ))}
            </div>

            {/* STEP 1: STRIPE / PADDLE PAYMENT */}
            {checkoutStep === 'payment' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setCheckoutStep('onboarding');
                }}
                className="space-y-4 text-xs"
              >
                {/* Payment Processor Selector */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentGateway('stripe')}
                    className={`p-3 rounded-xl border font-extrabold flex items-center justify-center gap-2 cursor-pointer ${
                      paymentGateway === 'stripe'
                        ? 'border-emerald-500 bg-emerald-950/30 text-white'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    <CreditCard size={15} className="text-emerald-400" />
                    <span>Stripe Checkout</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentGateway('paddle')}
                    className={`p-3 rounded-xl border font-extrabold flex items-center justify-center gap-2 cursor-pointer ${
                      paymentGateway === 'paddle'
                        ? 'border-emerald-500 bg-emerald-950/30 text-white'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    <Globe size={15} className="text-emerald-400" />
                    <span>Paddle B2B (VAT/Tax Invoice)</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">
                      Company / Agency Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerCompany}
                      onChange={(e) => setBuyerCompany(e.target.value)}
                      placeholder="Acme Outbound Inc."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">
                      Work Email (For Invoice &amp; RUA Reports) *
                    </label>
                    <input
                      type="email"
                      required
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="founder@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between font-mono text-slate-400">
                    <span>
                      {paymentGateway === 'stripe'
                        ? 'Stripe Express Corporate Card'
                        : 'Paddle Global B2B Checkout'}
                    </span>
                    <span>PCI-DSS Level 1</span>
                  </div>
                  <input
                    type="text"
                    defaultValue="4242 •••• •••• 4242   |   10/29   |   CVC 884"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 font-mono text-emerald-300"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-sm font-black text-slate-950 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  style={{ backgroundColor: emeraldColor }}
                >
                  <Lock size={15} />
                  <span>
                    Authorize {checkoutModalTier.priceDisplay} via{' '}
                    {paymentGateway === 'stripe' ? 'Stripe' : 'Paddle'} &amp; Start DNS Onboarding →
                  </span>
                </button>
              </form>
            )}

            {/* STEP 2: POST-PURCHASE TECHNICAL ONBOARDING FORM */}
            {checkoutStep === 'onboarding' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setCheckoutStep('complete');
                }}
                className="space-y-4 text-xs"
              >
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 font-mono">
                  ✓ Payment Authorized. Complete your 60-second infrastructure intake below so our engineers can deploy your domains within 24 hours.
                </div>

                {/* 1. Registrar Logins / Automated Delegate Access */}
                <div className="space-y-1.5">
                  <label className="block font-extrabold text-slate-200">
                    1. Registrar / DNS Provider (Automated Zero-Password Delegate Access)
                  </label>
                  <select
                    value={dnsRegistrar}
                    onChange={(e) => setDnsRegistrar(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-semibold focus:outline-none cursor-pointer"
                  >
                    <option>Cloudflare (Automated OAuth Delegate)</option>
                    <option>Namecheap (Delegate Access Invite to ops@inboxshield.io)</option>
                    <option>GoDaddy (Delegate Access Link)</option>
                    <option>AWS Route53 / Google Cloud DNS</option>
                    <option>Purchase New Lookalike Domains For Us</option>
                  </select>
                </div>

                {/* 2. Domain List or Purchasing Preferences */}
                <div className="space-y-1.5">
                  <label className="block font-extrabold text-slate-200">
                    2. Target Domains or Lookalike Domain Preferences
                  </label>
                  <textarea
                    rows={2}
                    value={domainListInput}
                    onChange={(e) => setDomainListInput(e.target.value)}
                    placeholder="Enter existing domains or preferred lookalike prefixes (e.g. trycompany.com, getcompany.io)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none"
                  />
                </div>

                {/* 3. Sending Platform Used */}
                <div className="space-y-1.5">
                  <label className="block font-extrabold text-slate-200">
                    3. Cold Email Sending Platform (ESP) Used
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {['Instantly.ai', 'Smartlead.ai', 'Lemlist', 'Outreach', 'Apollo.io'].map(
                      (esp) => (
                        <button
                          key={esp}
                          type="button"
                          onClick={() => setSendingPlatform(esp)}
                          className={`py-2 px-2.5 rounded-xl border text-xs font-mono font-bold cursor-pointer ${
                            sendingPlatform === esp
                              ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300'
                              : 'border-slate-800 bg-slate-900 text-slate-400'
                          }`}
                        >
                          {esp}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-sm font-black text-slate-950 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  style={{ backgroundColor: emeraldColor }}
                >
                  <Server size={16} />
                  <span>Submit Onboarding &amp; Provision DNS Cluster →</span>
                </button>
              </form>
            )}

            {/* STEP 3: DEPLOYMENT CONFIRMATION */}
            {checkoutStep === 'complete' && (
              <div className="p-6 rounded-2xl bg-emerald-950/25 border border-emerald-500/50 space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-mono font-black">
                    ✓ INFRASTRUCTURE TICKET #IS-9042 CREATED
                  </span>
                  <span className="font-mono text-emerald-400">SLA: &lt; 24 Hours</span>
                </div>
                <h4 className="text-lg font-black text-white">
                  Welcome aboard, {buyerCompany || 'Outbound Team'}!
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  Our deliverability engineers have received your delegation preferences for <strong>{dnsRegistrar}</strong> and <strong>{sendingPlatform}</strong>. Your SPF flattening, 2048-bit DKIM keys, strict <code className="text-emerald-300">p=reject</code> DMARC records, and custom tracking CNAMEs for <code className="text-emerald-300">{domainListInput}</code> are now queuing for deployment.
                </p>
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCheckoutModalTier(null)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-extrabold cursor-pointer"
                  >
                    Return to InboxShield Studio
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
