import React, { useState, useEffect } from 'react';
import {
  PhoneCall,
  UserCheck,
  FileSignature,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Mail,
} from 'lucide-react';
import {
  EditableText,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';
import { DoctorVariantId } from '../../doctor_profile/component/DoctorNavbar';

export interface FractionalCoreAdvisoryMatchFormSectionProps {
  title: string;
  subtitle: string;
  variant: DoctorVariantId;
  primaryColor: string;
  isDark?: boolean;
}

const FREE_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'icloud.com',
];

const AVAILABLE_CALENDAR_SLOTS = [
  { id: 'slot_1', day: 'Tomorrow', time: '10:00 AM EST', partner: 'Managing Partner (Tech/CTO)' },
  { id: 'slot_2', day: 'Tomorrow', time: '2:30 PM EST', partner: 'Finance Partner (Series A/CFO)' },
  { id: 'slot_3', day: 'Thursday', time: '11:30 AM EST', partner: 'GTM Partner (PLG/CMO & CPO)' },
  { id: 'slot_4', day: 'Thursday', time: '4:00 PM EST', partner: 'Managing Partner (Tech/CTO)' },
  { id: 'slot_5', day: 'Friday', time: '1:00 PM EST', partner: 'Venture Talent Desk Lead' },
  { id: 'slot_6', day: 'Friday', time: '3:30 PM EST', partner: 'Finance Partner (Series A/CFO)' },
];

export const FractionalCoreAdvisoryMatchFormSection: React.FC<
  FractionalCoreAdvisoryMatchFormSectionProps
> = ({ title, subtitle }) => {
  const [workEmail, setWorkEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [fundingStage, setFundingStage] = useState('Seed');
  const [selectedRoles, setSelectedRoles] = useState<string[]>(['CTO']);
  const [ninetyDayGoal, setNinetyDayGoal] = useState(
    'Prepare technical architecture & SOC-2 readiness ahead of our Q1 Series A raise.'
  );
  const [selectedSlotId, setSelectedSlotId] = useState('slot_1');
  const [lockedCandidateBanner, setLockedCandidateBanner] = useState<{
    candidateId: string;
    role: string;
    retainer: string;
    allocation: string;
    summary: string;
  } | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submittedMatch, setSubmittedMatch] = useState(false);

  useEffect(() => {
    const handleExecutiveSelected = (e: Event) => {
      const customEvent = e as CustomEvent<{
        candidateId: string;
        role: string;
        retainer: string;
        allocation: string;
        summary: string;
      }>;
      if (customEvent.detail) {
        setLockedCandidateBanner(customEvent.detail);
        const roleKey = customEvent.detail.role.toUpperCase();
        if (['CTO', 'CFO', 'CMO', 'CPO'].includes(roleKey)) {
          setSelectedRoles((prev) =>
            prev.includes(roleKey) ? prev : [roleKey, ...prev]
          );
        }
        setSubmittedMatch(false);
      }
    };

    window.addEventListener('fractional:select-executive', handleExecutiveSelected);
    return () =>
      window.removeEventListener('fractional:select-executive', handleExecutiveSelected);
  }, []);

  const toggleRoleCheckbox = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role)
        ? prev.length > 1
          ? prev.filter((r) => r !== role)
          : prev
        : [...prev, role]
    );
  };

  const handleMatchFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);

    const trimmedEmail = workEmail.trim().toLowerCase();
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setEmailError('Please enter a valid corporate founder or VC email address.');
      return;
    }
    const domain = trimmedEmail.split('@')[1] || '';
    if (FREE_EMAIL_DOMAINS.includes(domain)) {
      setEmailError(
        `Please use your company domain email (e.g. founder@startup.io) rather than @${domain}.`
      );
      return;
    }

    setSubmittedMatch(true);
  };

  const activeSlot =
    AVAILABLE_CALENDAR_SLOTS.find((s) => s.id === selectedSlotId) ||
    AVAILABLE_CALENDAR_SLOTS[0];

  return (
    <section
      className="py-16 lg:py-24 border-b"
      style={{
        backgroundColor: '#0A0F1D',
        borderColor: '#334155',
        color: '#F8FAFC',
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* PART E: 3-STEP CURATED ADVISORY MATCH MODEL */}
        <div id="fractional-advisory-model" className="scroll-mt-24 space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F59E0B]/15 border border-[#F59E0B]/35 text-[#F59E0B] text-xs font-mono uppercase tracking-wider font-bold">
              <Sparkles size={13} />
              <span>CURATED EXECUTIVE PLACEMENT PROTOCOL</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]"
              style={{ fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif" }}
            >
              From Bottleneck to Boardroom Execution in Under 72 Hours
            </h2>
            <p className="text-sm sm:text-base text-[#9CA3AF]">
              No bloated recruiting retainers, 6-month executive searches, or equity negotiations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: 'STEP 01',
                sla: '15 Minutes',
                icon: PhoneCall,
                title: '10-Minute Intake Call',
                desc: 'Share your current runway, technical/financial bottlenecks, and required weekly allocation with a former operating partner.',
                highlight: 'Zero Upfront Retainer Fee',
              },
              {
                step: 'STEP 02',
                sla: '24–48 Hours',
                icon: UserCheck,
                title: 'Receive 2–3 Handpicked Profiles',
                desc: 'We match your exact domain stack with non-competing executives who have solved your specific bottleneck before at Series A–C scale.',
                highlight: 'Conflict-Checked & Backchannel Verified',
              },
              {
                step: 'STEP 03',
                sla: 'Immediate Start',
                icon: FileSignature,
                title: 'Direct Intro & Flexible Contract',
                desc: 'Interview candidates directly. Start on a month-to-month flexible retainer with no long-term lock-in or buyout penalties.',
                highlight: '0% Cap Table Equity Dilution',
              },
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.step}
                  className="rounded-2xl border p-6 sm:p-7 flex flex-col justify-between space-y-6"
                  style={{
                    backgroundColor: '#1E293B',
                    borderColor: '#334155',
                  }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded bg-[#0A0F1D] border border-[#334155] font-mono text-xs font-bold text-[#F59E0B]">
                        {item.step}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#10B981]">
                        SLA: {item.sla}
                      </span>
                    </div>

                    <div className="w-11 h-11 rounded-xl bg-[#6366F1]/15 border border-[#6366F1]/40 flex items-center justify-center text-[#818CF8]">
                      <IconComponent size={20} />
                    </div>

                    <h3
                      className="text-xl font-bold text-[#F8FAFC]"
                      style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                    >
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#334155] flex items-center gap-2 text-xs font-bold text-[#10B981]">
                    <CheckCircle2 size={14} />
                    <span>{item.highlight}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PART F: HIGH-CONVERTING 15-MINUTE INTRO MATCH FORM + CALENDAR PICKER */}
        <div id="fractional-match-form" className="scroll-mt-24">
          <div
            className="rounded-3xl border p-6 sm:p-10 lg:p-12 shadow-2xl"
            style={{
              backgroundColor: '#1E293B',
              borderColor: '#334155',
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#10B981]/15 border border-[#10B981]/35 text-[#10B981] text-xs font-mono uppercase tracking-wider font-bold">
                  <Calendar size={13} />
                  <span>DIRECT PARTNER INTAKE &amp; CALENDLY SYNC</span>
                </div>

                <EditableText
                  id="fractional_match_form_title"
                  defaultText={
                    title || 'Get Matched with a Vetted Executive in 48 Hours'
                  }
                  as="h2"
                  className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC]"
                  style={{ fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif" }}
                />

                <EditableText
                  id="fractional_match_form_subtitle"
                  defaultText={
                    subtitle ||
                    'Lock in a 15-minute intake call. We will prepare 2–3 non-competing executive dossiers tailored to your 90-day roadmap before we meet.'
                  }
                  as="p"
                  className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed"
                />

                {lockedCandidateBanner ? (
                  <div
                    className="p-4 rounded-2xl border space-y-2"
                    style={{
                      backgroundColor: 'rgba(245, 158, 11, 0.12)',
                      borderColor: '#F59E0B',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#F59E0B] font-bold">
                        ★ ATTACHED TO YOUR INTAKE REQUEST
                      </span>
                      <button
                        type="button"
                        onClick={() => setLockedCandidateBanner(null)}
                        className="text-[11px] text-[#9CA3AF] hover:text-[#F8FAFC] underline cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="text-sm font-bold text-[#F8FAFC]">
                      {lockedCandidateBanner.candidateId} ({lockedCandidateBanner.retainer} ·{' '}
                      {lockedCandidateBanner.allocation})
                    </div>
                    <p className="text-xs text-[#9CA3AF]">
                      {lockedCandidateBanner.summary}
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-[#0A0F1D] border border-[#334155] space-y-2">
                    <div className="text-xs font-bold text-[#F8FAFC] flex items-center gap-2">
                      <ShieldCheck size={15} className="text-[#10B981]" />
                      <span>Strict NDA &amp; Non-Compete Protection</span>
                    </div>
                    <p className="text-xs text-[#9CA3AF] leading-relaxed">
                      Click any candidate card in the directory above to pre-attach their dossier ID (#CTO-8042, #CFO-4190, etc.) to your booking.
                    </p>
                  </div>
                )}

                <div className="space-y-3 pt-2 text-xs text-[#9CA3AF]">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} className="text-[#10B981] shrink-0" />
                    <span>Direct Slack &amp; Zoom intro within 48 hours of call</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} className="text-[#10B981] shrink-0" />
                    <span>14-Day Executive Fit Replacement Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} className="text-[#10B981] shrink-0" />
                    <span>Preferred portfolio rates for YC, Techstars &amp; partner VCs</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                {submittedMatch ? (
                  <div
                    className="p-8 rounded-2xl border space-y-5 text-center"
                    style={{
                      backgroundColor: '#0A0F1D',
                      borderColor: '#10B981',
                    }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#10B981]/20 border border-[#10B981] flex items-center justify-center text-[#10B981] mx-auto">
                      <CheckCircle2 size={28} />
                    </div>
                    <div className="space-y-2">
                      <span className="px-3 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] font-mono text-xs font-bold">
                        CALENDAR INVITE &amp; DOSSIER BRIEF DISPATCHED
                      </span>
                      <h3
                        className="text-2xl font-bold text-[#F8FAFC]"
                        style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                      >
                        15-Minute Executive Match Confirmed for {companyName || 'Your Startup'}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-lg mx-auto">
                        We have sent a calendar invitation to{' '}
                        <strong className="text-[#F8FAFC]">{workEmail}</strong> for{' '}
                        <strong className="text-[#10B981]">
                          {activeSlot.day} at {activeSlot.time}
                        </strong>{' '}
                        ({activeSlot.partner}).
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#1E293B] border border-[#334155] text-left text-xs space-y-1.5 max-w-md mx-auto">
                      <div className="flex justify-between">
                        <span className="text-[#9CA3AF]">Target C-Suite Roles:</span>
                        <span className="font-mono font-bold text-[#F59E0B]">
                          {selectedRoles.join(', ')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#9CA3AF]">Funding Stage:</span>
                        <span className="font-mono font-bold text-[#F8FAFC]">
                          {fundingStage}
                        </span>
                      </div>
                      {lockedCandidateBanner && (
                        <div className="flex justify-between">
                          <span className="text-[#9CA3AF]">Requested Candidate:</span>
                          <span className="font-mono font-bold text-[#10B981]">
                            {lockedCandidateBanner.candidateId}
                          </span>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setSubmittedMatch(false)}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#1E293B] border border-[#334155] text-[#F8FAFC] hover:bg-[#334155] cursor-pointer"
                    >
                      Modify Intake Details or Time Slot
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleMatchFormSubmit}
                    className="p-6 sm:p-8 rounded-2xl bg-[#0A0F1D] border border-[#334155] space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#F8FAFC]">
                          Work Email <span className="text-[#F59E0B]">*</span>
                        </label>
                        <div className="relative">
                          <Mail
                            size={14}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                          />
                          <input
                            type="email"
                            required
                            value={workEmail}
                            onChange={(e) => {
                              setWorkEmail(e.target.value);
                              if (emailError) setEmailError(null);
                            }}
                            placeholder="founder@yourstartup.ai"
                            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#1E293B] border border-[#334155] text-xs text-[#F8FAFC] placeholder:text-[#9CA3AF]/60 focus:outline-none focus:border-[#F59E0B]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#F8FAFC]">
                          Company Name <span className="text-[#F59E0B]">*</span>
                        </label>
                        <div className="relative">
                          <Building2
                            size={14}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                          />
                          <input
                            type="text"
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="e.g., Vektor Labs Inc."
                            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#1E293B] border border-[#334155] text-xs text-[#F8FAFC] placeholder:text-[#9CA3AF]/60 focus:outline-none focus:border-[#F59E0B]"
                          />
                        </div>
                      </div>
                    </div>

                    {emailError && (
                      <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                        <AlertCircle size={14} className="shrink-0" />
                        <span>{emailError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#F8FAFC]">
                          Current Funding Stage
                        </label>
                        <select
                          value={fundingStage}
                          onChange={(e) => setFundingStage(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#1E293B] border border-[#334155] text-xs text-[#F8FAFC] focus:outline-none focus:border-[#F59E0B]"
                        >
                          <option value="Bootstrapped">Bootstrapped ($500k+ ARR)</option>
                          <option value="Pre-Seed">Pre-Seed</option>
                          <option value="Seed">Seed ($1.5M – $6M Raised)</option>
                          <option value="Series A+">Series A+ ($8M – $40M Raised)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#F8FAFC]">
                          Which C-Suite role do you need right now?
                        </label>
                        <div className="grid grid-cols-4 gap-1.5">
                          {['CTO', 'CFO', 'CMO', 'CPO'].map((role) => {
                            const checked = selectedRoles.includes(role);
                            return (
                              <button
                                key={role}
                                type="button"
                                onClick={() => toggleRoleCheckbox(role)}
                                className={`py-2 rounded-lg text-xs font-mono font-bold border transition cursor-pointer ${
                                  checked
                                    ? 'bg-[#F59E0B] text-[#0A0F1D] border-[#F59E0B]'
                                    : 'bg-[#1E293B] text-[#9CA3AF] border-[#334155]'
                                }`}
                              >
                                {checked ? `✓ ${role}` : role}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-[#F8FAFC]">
                        What is your primary 90-day goal?
                      </label>
                      <textarea
                        rows={2}
                        value={ninetyDayGoal}
                        onChange={(e) => setNinetyDayGoal(e.target.value)}
                        placeholder="Prepare for Series A pitch deck / Re-architect cloud infrastructure..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#1E293B] border border-[#334155] text-xs text-[#F8FAFC] placeholder:text-[#9CA3AF]/60 focus:outline-none focus:border-[#F59E0B]"
                      />
                    </div>

                    <div className="space-y-2.5 pt-2 border-t border-[#334155]">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-[#F8FAFC] flex items-center gap-1.5">
                          <Clock size={13} className="text-[#10B981]" />
                          <span>Select 15-Minute Partner Match Slot (Cal.com Sync)</span>
                        </label>
                        <span className="text-[10px] font-mono text-[#10B981]">
                          ● Live Availability
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {AVAILABLE_CALENDAR_SLOTS.map((slot) => {
                          const active = selectedSlotId === slot.id;
                          return (
                            <button
                              key={slot.id}
                              type="button"
                              onClick={() => setSelectedSlotId(slot.id)}
                              className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                                active
                                  ? 'bg-[#6366F1]/20 border-[#6366F1] text-[#F8FAFC]'
                                  : 'bg-[#1E293B] border-[#334155] text-[#9CA3AF] hover:text-[#F8FAFC]'
                              }`}
                            >
                              <div className="text-xs font-bold text-[#F8FAFC]">
                                {slot.day} · {slot.time}
                              </div>
                              <div className="text-[10px] text-[#9CA3AF] truncate mt-0.5">
                                {slot.partner}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl text-xs sm:text-sm font-extrabold text-[#0A0F1D] flex items-center justify-center gap-2 shadow-xl transition hover:opacity-95 cursor-pointer"
                      style={{
                        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                      }}
                    >
                      <span>Confirm 15-Min Match Call &amp; Receive 3 Executive Dossiers</span>
                      <ArrowRight size={15} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
