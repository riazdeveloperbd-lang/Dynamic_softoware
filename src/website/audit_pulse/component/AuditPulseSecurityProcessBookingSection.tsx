import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  DatabaseZap,
  FileCheck2,
  Download,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  KeyRound,
  Cpu,
  BadgeDollarSign,
} from 'lucide-react';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface AuditPulseSecurityProcessBookingProps {
  title?: string;
  subtitle?: string;
  variant?: DoctorVariantId;
  primaryColor?: string;
  isDark?: boolean;
}

const SECURITY_PILLARS = [
  {
    id: 'soc2',
    title: 'SOC-2 Type II Certified',
    badge: 'AICPA Audited',
    description:
      'Independent security audit verification with continuous automated control monitoring across our entire cloud enclave.',
    icon: ShieldCheck,
    accent: '#10B981',
  },
  {
    id: 'oauth',
    title: 'Read-Only OAuth Access',
    badge: 'Zero Write Scopes',
    description:
      'We never store passwords or request edit/delete permissions. Scoped strictly to read license metadata and last-login timestamps.',
    icon: Lock,
    accent: '#06B6D4',
  },
  {
    id: 'retention',
    title: 'Zero-Data Retention Promise',
    badge: 'In-Memory Enclave',
    description:
      'Employee activity metadata is analyzed in-memory to generate your downgrade report and immediately purged upon completion.',
    icon: DatabaseZap,
    accent: '#2563EB',
  },
  {
    id: 'gdpr',
    title: 'GDPR & CCPA Compliant',
    badge: 'TLS 1.3 + AES-256',
    description:
      'End-to-end encrypted telemetry transport with pre-signed Data Processing Agreements (DPA) ready for enterprise legal review.',
    icon: FileCheck2,
    accent: '#10B981',
  },
];

const AUDIT_STEPS = [
  {
    step: 'STEP 01',
    duration: '10 Minutes',
    title: 'Connect Read-Only OAuth',
    description:
      'Securely link your identity providers (Okta, Google Workspace, Azure AD) and core SaaS applications via official read-only APIs.',
    icon: KeyRound,
  },
  {
    step: 'STEP 02',
    duration: '24 Hours',
    title: 'Automated Waste Detection',
    description:
      'Our engine correlates login logs, SSO tokens, and billing seats to locate unassigned, redundant, or abandoned accounts.',
    icon: Cpu,
  },
  {
    step: 'STEP 03',
    duration: 'Keep 85% of Savings',
    title: 'Review Report & Pay Only on Results',
    description:
      'Receive an itemized report of exact accounts to downgrade or delete. You keep 85% of the savings; we charge a flat 15% performance fee only on confirmed savings.',
    icon: BadgeDollarSign,
  },
];

const AVAILABLE_DATES = [
  { id: 'thu_10', day: 'Thu', date: 'Oct 15', slots: ['10:00 AM EST', '01:30 PM EST', '04:00 PM EST'] },
  { id: 'fri_11', day: 'Fri', date: 'Oct 16', slots: ['09:30 AM EST', '11:30 AM EST', '03:00 PM EST'] },
  { id: 'mon_14', day: 'Mon', date: 'Oct 19', slots: ['10:30 AM EST', '02:00 PM EST', '04:30 PM EST'] },
];

export const AuditPulseSecurityProcessBookingSection: React.FC<
  AuditPulseSecurityProcessBookingProps
> = ({ primaryColor = '#10B981' }) => {
  const [whitepaperDownloaded, setWhitepaperDownloaded] = useState(false);
  const [selectedDateId, setSelectedDateId] = useState('thu_10');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM EST');
  const [workEmail, setWorkEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [primaryIdp, setPrimaryIdp] = useState('Google Workspace / Okta');
  const [lockedEstimate, setLockedEstimate] = useState<{
    employees: number;
    estimatedAnnualWaste: number;
    netClientSavings: number;
  } | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent;
      if (custom.detail) {
        setLockedEstimate(custom.detail);
      }
    };
    window.addEventListener('auditpulse:select-estimate', handler);
    return () => window.removeEventListener('auditpulse:select-estimate', handler);
  }, []);

  const handleDownloadSecurityWhitepaper = () => {
    const content = [
      'AUDITPULSE ENTERPRISE SECURITY & PRIVACY ARCHITECTURE WHITEPAPER',
      '=================================================================',
      '1. SOC-2 Type II Certification: Continuous third-party audited controls.',
      '2. Read-Only OAuth Scopes: Strictly metadata & login timestamp inspection.',
      '3. Zero-Data Retention: Ephemeral in-memory processing purged post-report.',
      '4. Encryption: TLS 1.3 in transit and AES-256 at rest.',
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AuditPulse-Security-Whitepaper-SOC2.txt';
    a.click();
    URL.revokeObjectURL(url);
    setWhitepaperDownloaded(true);
  };

  const activeDateObj =
    AVAILABLE_DATES.find((d) => d.id === selectedDateId) || AVAILABLE_DATES[0];

  const handleBookAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workEmail.trim()) return;
    setBookingConfirmed(true);
  };

  return (
    <div className="bg-[#0A0E17] text-[#F9FAFB]">
      {/* =====================================================================
          SECTION D: SECURITY & COMPLIANCE BADGE BAR
         ===================================================================== */}
      <section
        id="auditpulse-security"
        className="py-16 sm:py-20 px-4 sm:px-6 border-b border-[#1F2937]"
      >
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs font-mono font-semibold text-[#2563EB] uppercase tracking-wider">
                Zero-Trust Telemetry Architecture
              </div>
              <h2
                className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F9FAFB]"
                style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
              >
                Enterprise-Grade Security. Zero Risk to Your Data.
              </h2>
              <p className="text-sm sm:text-base text-[#9CA3AF]">
                Built for CISO and General Counsel sign-off in under 15 minutes. No agents to install, no write permissions, and zero persistent PII storage.
              </p>
            </div>

            {/* Embedded Security Whitepaper PDF Download Trigger Button */}
            <button
              type="button"
              onClick={handleDownloadSecurityWhitepaper}
              className="px-5 py-3 rounded-xl bg-[#111827] hover:bg-[#1F2937] border border-[#2563EB]/60 text-xs sm:text-sm font-mono font-semibold text-[#F9FAFB] inline-flex items-center gap-2.5 shrink-0 cursor-pointer transition"
            >
              <Download size={15} className="text-[#06B6D4]" />
              <span>
                {whitepaperDownloaded
                  ? '✓ Security Whitepaper Downloaded'
                  : 'Download Security Whitepaper (PDF/Spec)'}
              </span>
            </button>
          </div>

          {/* 4 Key Security Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SECURITY_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="rounded-2xl bg-[#111827] border border-[#1F2937] p-6 flex flex-col justify-between space-y-5 hover:border-[#2563EB]/60 transition"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center border border-[#1F2937] bg-[#0A0E17]"
                        style={{ color: pillar.accent }}
                      >
                        <Icon size={20} />
                      </div>
                      <span className="text-[11px] font-mono text-[#9CA3AF] px-2.5 py-1 rounded-md bg-[#0A0E17] border border-[#1F2937]">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#F9FAFB]">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#9CA3AF] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#1F2937] flex items-center gap-1.5 text-[11px] font-mono text-[#10B981]">
                    <CheckCircle2 size={12} />
                    <span>Verified Active Control</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION E: 3-STEP AUDIT PROCESS & 1-CLICK CALENDAR PICKER
         ===================================================================== */}
      <section
        id="auditpulse-process"
        className="py-16 sm:py-20 px-4 sm:px-6 border-b border-[#1F2937]"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-2">
            <div className="text-xs font-mono font-semibold text-[#10B981] uppercase tracking-wider">
              Frictionless 24-Hour Turnaround
            </div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F9FAFB]"
              style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif" }}
            >
              3-Step Audit Process &amp; 1-Click Walkthrough Booking
            </h2>
            <p className="text-sm sm:text-base text-[#9CA3AF]">
              Zero engineering lift required. Connect your read-only OAuth scopes in 10 minutes and receive a line-item license reclamation ledger within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 6 Cols: 3-Step Audit Process */}
            <div className="lg:col-span-6 space-y-4">
              {AUDIT_STEPS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="rounded-2xl bg-[#111827] border border-[#1F2937] p-6 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#06B6D4]">
                        {item.step}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-[#0A0E17] border border-[#1F2937] text-xs font-mono font-semibold text-[#10B981]">
                        {item.duration}
                      </span>
                    </div>
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#0A0E17] border border-[#1F2937] flex items-center justify-center text-[#10B981] shrink-0 mt-0.5">
                        <Icon size={18} />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-[#F9FAFB]">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right 6 Cols: 1-Click Calendar Slot Picker */}
            <div
              id="auditpulse-booking"
              className="lg:col-span-6 rounded-2xl bg-[#111827] border border-[#1F2937] p-6 sm:p-8 space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[#1F2937] pb-4">
                <div>
                  <div className="text-xs font-mono text-[#10B981] uppercase">
                    1-Click Audit Walkthrough
                  </div>
                  <h3 className="text-xl font-bold text-[#F9FAFB]">
                    Schedule Your 15-Minute SaaS Spend Review
                  </h3>
                </div>
                <Calendar size={20} className="text-[#06B6D4]" />
              </div>

              {lockedEstimate && (
                <div className="p-3.5 rounded-xl bg-[#10B981]/10 border border-[#10B981]/40 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-[#10B981]">
                      Estimator Attached:
                    </span>{' '}
                    <span className="text-[#F9FAFB] font-mono">
                      {lockedEstimate.employees} Seats
                    </span>
                  </div>
                  <div className="font-mono font-bold text-[#10B981]">
                    Target Reclaim: ${lockedEstimate.estimatedAnnualWaste.toLocaleString()}/yr
                  </div>
                </div>
              )}

              {bookingConfirmed ? (
                <div className="p-6 rounded-xl bg-[#0A0E17] border border-[#10B981] space-y-4 text-center">
                  <CheckCircle2 size={36} className="text-[#10B981] mx-auto" />
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-[#F9FAFB]">
                      Audit Walkthrough Confirmed
                    </h4>
                    <p className="text-xs text-[#9CA3AF]">
                      Calendar invitation sent to{' '}
                      <span className="text-[#F9FAFB] font-mono">{workEmail}</span> for{' '}
                      <span className="text-[#10B981] font-mono font-semibold">
                        {activeDateObj.day}, {activeDateObj.date} at {selectedSlot}
                      </span>
                      .
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBookingConfirmed(false)}
                    className="px-4 py-2 rounded-lg bg-[#111827] border border-[#1F2937] text-xs font-mono text-[#9CA3AF] hover:text-[#F9FAFB] cursor-pointer"
                  >
                    Modify Slot Selection
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookAuditSubmit} className="space-y-4">
                  {/* Day Picker */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[#9CA3AF] uppercase">
                      1. Select Walkthrough Date
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {AVAILABLE_DATES.map((d) => (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => {
                            setSelectedDateId(d.id);
                            setSelectedSlot(d.slots[0]);
                          }}
                          className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                            selectedDateId === d.id
                              ? 'bg-[#2563EB] border-[#2563EB] text-[#F9FAFB]'
                              : 'bg-[#0A0E17] border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB]'
                          }`}
                        >
                          <div className="text-[11px] font-mono">{d.day}</div>
                          <div className="text-sm font-bold">{d.date}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slot Picker */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[#9CA3AF] uppercase">
                      2. Select 15-Min Slot
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {activeDateObj.slots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-2.5 rounded-xl border text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                            selectedSlot === slot
                              ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]'
                              : 'bg-[#0A0E17] border-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB]'
                          }`}
                        >
                          <Clock size={12} />
                          <span>{slot}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-mono text-[#9CA3AF] mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        placeholder="cfo@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0E17] border border-[#1F2937] text-xs text-[#F9FAFB] focus:outline-none focus:border-[#10B981]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#9CA3AF] mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Acme Corp"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0E17] border border-[#1F2937] text-xs text-[#F9FAFB] focus:outline-none focus:border-[#10B981]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#9CA3AF] mb-1">
                      Primary Identity Provider (SSO)
                    </label>
                    <select
                      value={primaryIdp}
                      onChange={(e) => setPrimaryIdp(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0E17] border border-[#1F2937] text-xs text-[#F9FAFB] focus:outline-none focus:border-[#10B981]"
                    >
                      <option>Google Workspace / Okta</option>
                      <option>Microsoft Entra ID (Azure AD)</option>
                      <option>JumpCloud / OneLogin</option>
                      <option>Direct SaaS Admin Billing</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    style={{ backgroundColor: primaryColor || '#10B981' }}
                    className="w-full py-3.5 px-5 rounded-xl bg-[#10B981] text-[#0A0E17] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:opacity-95 transition cursor-pointer"
                  >
                    <span>
                      Confirm 1-Click Audit Slot ({activeDateObj.date} • {selectedSlot})
                    </span>
                    <ArrowRight size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
