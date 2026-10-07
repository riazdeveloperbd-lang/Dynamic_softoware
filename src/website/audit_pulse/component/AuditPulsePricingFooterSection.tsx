import React, { useState } from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Lock,
  Sparkles,
} from 'lucide-react';
import {
  EditableText,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface AuditPulsePricingFooterProps {
  title: string;
  subtitle: string;
  variant: DoctorVariantId;
  primaryColor: string;
  isDark?: boolean;
}

const PRICING_FAQS = [
  {
    q: 'How do you verify whether a savings recommendation was actually realized?',
    a: 'We only invoice on savings that your finance or IT team explicitly approves and executes—verified directly against your subsequent monthly vendor billing statement or contract renewal reduction.',
  },
  {
    q: 'What happens if AuditPulse finds zero wasted licenses in our stack?',
    a: 'You pay $0. Our Clean Bill of Health Guarantee means if we do not uncover actionable SaaS savings, the entire 24-hour audit and executive benchmark report is 100% free.',
  },
  {
    q: 'Can our IT team choose which inactive seats to keep vs. downgrade?',
    a: 'Yes. AuditPulse never auto-deletes accounts without approval. You receive an itemized ledger where department heads can whitelist specific accounts before any license reclamation occurs.',
  },
];

export const AuditPulsePricingFooterSection: React.FC<
  AuditPulsePricingFooterProps
> = ({
  title,
  subtitle,
  primaryColor = '#10B981',
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);

  const scrollToBooking = () => {
    const el = document.getElementById('auditpulse-booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#0A0E17] text-[#F9FAFB]">
      {/* =====================================================================
          SECTION G: PERFORMANCE PRICING MODEL
         ===================================================================== */}
      <section
        id="auditpulse-pricing"
        className="py-16 sm:py-20 px-4 sm:px-6 border-b border-[#1F2937]"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-2">
            <div className="text-xs font-mono font-semibold text-[#10B981] uppercase tracking-wider">
              100% Aligned Performance Pricing
            </div>
            <EditableText
              id="auditpulse_pricing_title"
              defaultText={
                title || 'Transparent Performance Pricing. Zero Retainers.'
              }
              as="h2"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F9FAFB]"
              style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
            />
            <EditableText
              id="auditpulse_pricing_subtitle"
              defaultText={
                subtitle ||
                'Unlike traditional SaaS management platforms that charge $30,000+ upfront subscriptions regardless of ROI, AuditPulse only wins when your software budget shrinks.'
              }
              as="p"
              className="text-sm sm:text-base text-[#9CA3AF]"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 7 Cols: Transparent Performance Pricing Card */}
            <div className="lg:col-span-7 rounded-2xl bg-[#111827] border-2 border-[#10B981]/70 p-6 sm:p-8 flex flex-col justify-between space-y-8 shadow-2xl">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#1F2937]">
                  <div>
                    <span className="text-xs font-mono text-[#10B981] uppercase font-bold">
                      Enterprise Performance Plan
                    </span>
                    <h3 className="text-2xl font-bold text-[#F9FAFB] mt-0.5">
                      Pay-On-Results License Reclamation
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-[#10B981]/15 text-[#10B981] font-mono text-xs font-bold">
                    Keep 85% of Savings
                  </span>
                </div>

                {/* 3 Core Pricing Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[#0A0E17] border border-[#1F2937]">
                    <div className="text-xs text-[#9CA3AF]">Upfront Fee</div>
                    <div className="text-3xl font-mono font-extrabold text-[#F9FAFB] mt-1 tabular-nums">
                      $0
                    </div>
                    <div className="text-[11px] font-mono text-[#10B981] mt-1">
                      Free 24hr OAuth Scan
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0A0E17] border border-[#1F2937]">
                    <div className="text-xs text-[#9CA3AF]">Monthly Subscription</div>
                    <div className="text-3xl font-mono font-extrabold text-[#F9FAFB] mt-1 tabular-nums">
                      $0
                    </div>
                    <div className="text-[11px] font-mono text-[#06B6D4] mt-1">
                      No Annual Lock-In
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0A0E17] border border-[#10B981]/50">
                    <div className="text-xs text-[#9CA3AF]">Performance Success Fee</div>
                    <div className="text-3xl font-mono font-extrabold text-[#10B981] mt-1 tabular-nums">
                      15%
                    </div>
                    <div className="text-[11px] font-mono text-[#9CA3AF] mt-1">
                      Of verified 12-mo savings
                    </div>
                  </div>
                </div>

                {/* Guarantee Callout */}
                <div className="p-4 rounded-xl bg-[#0A0E17] border border-[#2563EB]/50 flex items-start gap-3">
                  <ShieldCheck size={20} className="text-[#10B981] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-[#F9FAFB] leading-relaxed">
                    <span className="font-bold text-[#10B981]">
                      Clean Bill of Health Guarantee:
                    </span>{' '}
                    If we find zero waste, you pay <span className="font-mono font-bold">$0</span> and get a free executive clean bill of health report for your board and auditors.
                  </div>
                </div>

                {/* Included Deliverables */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#9CA3AF]">
                  {[
                    'Unlimited SaaS & SSO Integrations',
                    'Line-Item Inactive Seat Ledger',
                    'Duplicate App Consolidation Map',
                    'Renewal Contract Benchmark Brief',
                    'Dedicated FinTech Audit Specialist',
                    'SOC-2 & GDPR Ephemeral Data Purge',
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[#10B981] shrink-0" />
                      <span className="text-[#F9FAFB]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={scrollToBooking}
                style={{ backgroundColor: primaryColor || '#10B981' }}
                className="w-full py-4 px-6 rounded-xl bg-[#10B981] text-[#0A0E17] font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:opacity-95 transition cursor-pointer"
              >
                <span>Start Your Risk-Free 24-Hour SaaS Audit</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Right 5 Cols: CFO Objection Handling & FAQ Accordion */}
            <div className="lg:col-span-5 rounded-2xl bg-[#111827] border border-[#1F2937] p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#06B6D4] uppercase">
                  <HelpCircle size={14} />
                  <span>CFO &amp; Procurement FAQ</span>
                </div>
                <h3 className="text-xl font-bold text-[#F9FAFB]">
                  How Performance Billing Works
                </h3>

                <div className="space-y-3 pt-2">
                  {PRICING_FAQS.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={faq.q}
                        className="rounded-xl bg-[#0A0E17] border border-[#1F2937] overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                          className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-[#F9FAFB] flex items-center justify-between gap-3 cursor-pointer"
                        >
                          <span>{faq.q}</span>
                          <span className="font-mono text-[#10B981]">
                            {isOpen ? '−' : '+'}
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 text-xs text-[#9CA3AF] leading-relaxed border-t border-[#1F2937]/60 pt-3">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0A0E17] border border-[#1F2937] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#9CA3AF]">
                  <Sparkles size={14} className="text-[#10B981]" />
                  <span>Average Mid-Market Net ROI</span>
                </div>
                <span className="font-mono font-bold text-[#10B981]">
                  $58,400 Saved in 30 Days
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          FOOTER & MULTI-PAGE ENTERPRISE SITE MAP
         ===================================================================== */}
      <footer className="py-12 px-4 sm:px-6 bg-[#0A0E17] text-[#9CA3AF] text-xs">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#1F2937]">
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-2.5 text-[#F9FAFB] font-bold text-base">
                <ShieldCheck size={18} className="text-[#10B981]" />
                <span>AuditPulse</span>
              </div>
              <p className="text-xs text-[#9CA3AF] max-w-sm leading-relaxed">
                Performance-based B2B SaaS license and tool waste optimization platform. Uncovering ghost seats and duplicate subscriptions in under 24 hours.
              </p>
              <div className="flex items-center gap-3 font-mono text-[11px] text-[#10B981]">
                <span className="inline-flex items-center gap-1">
                  <Lock size={11} /> SOC-2 Type II
                </span>
                <span>•</span>
                <span>GDPR &amp; CCPA Compliant</span>
                <span>•</span>
                <span>Read-Only OAuth</span>
              </div>
            </div>

            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="font-mono font-semibold text-[#F9FAFB] uppercase text-[11px]">
                  Platform Architecture
                </div>
                <ul className="space-y-1.5">
                  <li>
                    <a href="#auditpulse-hero" className="hover:text-[#F9FAFB]">
                      Home / Main Telemetry
                    </a>
                  </li>
                  <li>
                    <a href="#auditpulse-estimator" className="hover:text-[#F9FAFB]">
                      SaaS Waste Estimator
                    </a>
                  </li>
                  <li>
                    <a href="#auditpulse-breakdown" className="hover:text-[#F9FAFB]">
                      Integrations Directory
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <div className="font-mono font-semibold text-[#F9FAFB] uppercase text-[11px]">
                  Trust &amp; Governance
                </div>
                <ul className="space-y-1.5">
                  <li>
                    <a href="#auditpulse-security" className="hover:text-[#F9FAFB]">
                      Security &amp; Trust Center
                    </a>
                  </li>
                  <li>
                    <a href="#auditpulse-pricing" className="hover:text-[#F9FAFB]">
                      How Pricing Works
                    </a>
                  </li>
                  <li>
                    <a href="#auditpulse-breakdown" className="hover:text-[#F9FAFB]">
                      CFO Case Studies &amp; ROI
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <div className="font-mono font-semibold text-[#F9FAFB] uppercase text-[11px]">
                  Supported OAuth Stacks
                </div>
                <ul className="space-y-1.5 font-mono text-[11px]">
                  <li>Google Workspace &amp; Okta</li>
                  <li>Microsoft 365 &amp; Entra ID</li>
                  <li>Slack, Zoom, Jira &amp; Salesforce</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-[#9CA3AF]">
            <span>
              © {new Date().getFullYear()} AuditPulse Technologies Inc. All rights reserved.
            </span>
            <span className="text-[#10B981]">
              100% Performance Guarantee: $0 Upfront • 15% Success Fee Only on Confirmed Savings
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
