import React, { useState, useEffect } from 'react';
import {
  Lock,
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  Video,
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  Phone,
  Building2,
  Scale,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  QrCode,
  Trash2,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile/component/DoctorCanvaEditorContext';

export interface LexChambersIntakeSchedulerSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

interface UploadedDossierFile {
  name: string;
  sizeLabel: string;
  typeLabel: string;
}

const LEGAL_CATEGORIES = [
  'Corporate & Commercial Law (M&A, JV, RJSC)',
  'Tax, VAT & Customs Advisory (NBR / Tribunal)',
  'Supreme Court & High Court Writ Litigation',
  'Banking, Artha Rin & Commercial Arbitration',
  'Real Estate & 30-Year Land Title Vetting',
  'Foreign Direct Investment (BIDA) & Employment',
];

const CHAMBER_MODES = [
  {
    id: 'gulshan_chamber',
    title: 'In-Person — Gulshan-2 Corporate Suite',
    timing: '5:00 PM – 9:00 PM (Sat–Thu)',
    location: 'Suite 9B, Tower-71, Gulshan Avenue, Dhaka-1212',
    feeBdt: 3000,
    feeLabel: '৳3,000 (45-Min Partner Session)',
  },
  {
    id: 'scba_chamber',
    title: 'In-Person — Supreme Court Bar Bldg',
    timing: '9:30 AM – 4:00 PM (Sun–Thu Court Days)',
    location: 'Room #408, Main SCBA Building, Ramna, Dhaka-1000',
    feeBdt: 3000,
    feeLabel: '৳3,000 (Litigation & Writ Desk)',
  },
  {
    id: 'virtual_zoom',
    title: 'Encrypted Video — Zoom / Google Meet',
    timing: 'Flexible Global Slots (BD / UK / SG / UAE)',
    location: 'End-to-End Encrypted Video Link Dispatched via Email/WhatsApp',
    feeBdt: 2500,
    feeLabel: '৳2,500 / $35 USD (NRI & Foreign Investors)',
  },
];

const TIME_SLOTS = [
  '10:30 AM (High Court Chamber)',
  '02:30 PM (High Court Chamber)',
  '05:30 PM (Gulshan-2 / Virtual)',
  '06:45 PM (Gulshan-2 / Virtual)',
  '08:00 PM (Gulshan-2 / Virtual)',
  '09:15 PM (International Zoom Desk)',
];

const RETAINER_PLANS = [
  {
    id: 'retainer_startup',
    name: 'Growth & Startup Corporate Retainer',
    bnSubtitle: 'স্টার্টআপ ও এসএমই প্রতিষ্ঠানের মাসিক আইনি সুরক্ষা',
    monthlyBdt: '৳25,000',
    period: '/ month (Annual Mandate)',
    idealFor: 'Tech Startups, E-Commerce & Growing Private Ltd Companies',
    features: [
      'Up to 10 Hours of Senior Associate / Partner Advisory per Month',
      'Commercial Contract, NDA, Vendor & Employment Agreement Vetting',
      'Annual RJSC Statutory Returns (Schedule X, Form XII) & Board Minutes',
      'Monthly Withholding Tax & VAT Return Compliance Review',
    ],
    featured: false,
  },
  {
    id: 'retainer_enterprise',
    name: 'Enterprise & Group General Counsel',
    bnSubtitle: 'শিল্প গ্রুপ ও বহুজাতিক প্রতিষ্ঠানের পূর্ণাঙ্গ লিগ্যাল ডিপার্টমেন্ট',
    monthlyBdt: '৳65,000',
    period: '/ month (Priority SLA)',
    idealFor: 'Manufacturing Groups, RMG Exporters, Banks & Foreign Subsidiaries',
    features: [
      '25+ Hours Dedicated Partner & Senior Barrister Counsel Monthly',
      'NBR Income Tax Audit Defense, VAT Tribunal & Customs Representation',
      'Priority Legal Notices, Artha Rin / Section 138 Corporate Recovery',
      'BIDA Expatriate Work Permits, Bangladesh Bank FEID & Labor Compliance',
      '24-Hour Urgent High Court Writ & Injunction Readiness',
    ],
    featured: true,
  },
  {
    id: 'retainer_litigation',
    name: 'Litigation, Writ & Transaction Mandate',
    bnSubtitle: 'নির্দিষ্ট মামলা, রিট পিটিশন বা জমি ভেটিং প্যাকেজ',
    monthlyBdt: 'Custom Brief',
    period: 'Milestone / Fixed Fee',
    idealFor: 'High Court Writ Petitions, Land Vetting & M&A Closings',
    features: [
      'Fixed-Fee 30-Year Land & Property Title Vetting (from ৳15,000)',
      'Stage-Wise High Court Writ Petition & Stay Order Fee Structure',
      'BIAC / SIAC Commercial Arbitration Representation',
      '100% Consultation Fee Credited Toward Full Engagement Retainer',
    ],
    featured: false,
  },
];

export const LexChambersIntakeSchedulerSection: React.FC<
  LexChambersIntakeSchedulerSectionProps
> = ({ title, subtitle, variant, primaryColor, isDark }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>(LEGAL_CATEGORIES[0]);
  const [urgency, setUrgency] = useState<
    'Standard Advisory' | 'High Priority' | 'Urgent Court Filing / Injunction'
  >('High Priority');
  const [opposingPartyName, setOpposingPartyName] = useState<string>('');
  const [conflictChecked, setConflictChecked] = useState<boolean>(false);

  // Step 2: Facts & Encrypted Document Upload
  const [caseSummary, setCaseSummary] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedDossierFile[]>([
    {
      name: 'NBR_Demand_Notice_Section_212.pdf',
      sizeLabel: '1.4 MB',
      typeLabel: 'PDF Document',
    },
  ]);

  // Step 3: Chamber Slot, Client Details & Payment
  const [selectedChamberId, setSelectedChamberId] =
    useState<string>('gulshan_chamber');
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-12');
  const [selectedSlot, setSelectedSlot] = useState<string>(TIME_SLOTS[2]);
  const [clientName, setClientName] = useState<string>('');
  const [clientCompany, setClientCompany] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('017');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<
    'bKash' | 'Nagad' | 'Corporate Card' | 'Chamber Desk'
  >('bKash');
  const [trxId, setTrxId] = useState<string>('');
  const [privilegeAccepted, setPrivilegeAccepted] = useState<boolean>(true);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [docketNumber, setDocketNumber] = useState<string>('LEX-2026-8492');

  const brassAccent = primaryColor || '#D97706';
  const navyPrimary = '#0F172A';

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      if (customEvent.detail) {
        setSelectedCategory(customEvent.detail);
        setStep(1);
        setBookingConfirmed(false);
      }
    };
    window.addEventListener('lexchambers:select-practice', handler);
    return () => window.removeEventListener('lexchambers:select-practice', handler);
  }, []);

  const activeChamber =
    CHAMBER_MODES.find((c) => c.id === selectedChamberId) || CHAMBER_MODES[0];

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const nextFiles: UploadedDossierFile[] = Array.from(files).map((f) => ({
      name: f.name,
      sizeLabel: `${Math.max(0.2, f.size / (1024 * 1024)).toFixed(1)} MB`,
      typeLabel: f.type.includes('pdf') ? 'PDF Pleading' : 'Case Exhibit',
    }));
    setUploadedFiles((prev) => [...prev, ...nextFiles]);
  };

  const addPresetSampleDocument = (docName: string) => {
    if (uploadedFiles.some((f) => f.name === docName)) return;
    setUploadedFiles((prev) => [
      ...prev,
      { name: docName, sizeLabel: '2.1 MB', typeLabel: 'Encrypted Exhibit' },
    ]);
  };

  const isBdPhoneValid = /^01[3-9]\d{8}$/.test(clientPhone.replace(/\s+/g, ''));

  const handleConfirmConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setDocketNumber(`LEX-2026-${randomCode}`);
    setBookingConfirmed(true);
  };

  return (
    <section
      id="lex-consultation-intake"
      className={`py-16 lg:py-24 px-4 sm:px-6 border-b ${
        isDark
          ? 'bg-[#090E1A] text-white border-slate-800'
          : 'bg-[#F8FAFC] text-[#1E2937] border-slate-200/90'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-extrabold uppercase tracking-wider">
              <Lock size={13} />
              <span>Evidence Act Sec. 126 Privileged Intake & Conflict Check</span>
            </div>
            <h2
              className="text-2xl sm:text-4xl font-bold tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              <EditableText elementId="lex_intake_title" defaultText={title} />
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <EditableText elementId="lex_intake_subtitle" defaultText={subtitle} />
            </p>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#0F172A] text-white border border-slate-800 shadow-md">
            <ShieldCheck size={24} className="text-emerald-400 flex-shrink-0" />
            <div className="text-xs">
              <div className="font-extrabold text-white">
                100% Consultation Fee Credited
              </div>
              <div className="text-slate-400 text-[11px]">
                Adjusted against your formal litigation or corporate retainer
              </div>
            </div>
          </div>
        </div>

        {/* =============================================================== */}
        {/* MAIN INTERACTIVE INTAKE WORKSPACE (LEFT WIZARD + RIGHT SUMMARY) */}
        {/* =============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: 3-Step Confidential Case Intake & Slot Scheduler */}
          <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            {/* Step Progress Header */}
            <div
              className="p-5 sm:p-6 text-white border-b border-slate-800"
              style={{ backgroundColor: navyPrimary }}
            >
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                  Confidential Matter Intake Wizard
                </span>
                <span className="text-[11px] text-slate-300 flex items-center gap-1">
                  <Lock size={12} className="text-emerald-400" />
                  256-Bit Encrypted Chamber Portal
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { num: 1, label: '1. Matter & Urgency' },
                  { num: 2, label: '2. Brief & Exhibits' },
                  { num: 3, label: '3. Chamber Slot & Fee' },
                ].map((s) => {
                  const active = step === s.num;
                  const completed = step > s.num || bookingConfirmed;
                  return (
                    <button
                      key={s.num}
                      type="button"
                      onClick={() => {
                        if (!bookingConfirmed) setStep(s.num as 1 | 2 | 3);
                      }}
                      className={`py-2.5 px-3 rounded-xl text-left text-xs font-extrabold transition border cursor-pointer ${
                        active
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                          : completed
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-slate-800/80 text-slate-400 border-slate-700'
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Wizard Body */}
            {bookingConfirmed ? (
              <div className="p-6 sm:p-8 space-y-6">
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-4">
                  <CheckCircle2
                    size={28}
                    className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5"
                  />
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                      PRIVILEGED DOCKET REGISTERED · {docketNumber}
                    </span>
                    <h3
                      className="text-xl font-bold text-slate-900 dark:text-white"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      Confidential Consultation Confirmed with Senior Counsel
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      An encrypted calendar invitation, conflict-check clearance certificate,
                      and chamber gate pass have been dispatched to{' '}
                      <strong>{clientPhone}</strong> and{' '}
                      <strong>{clientEmail || 'your registered email'}</strong>.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] font-bold uppercase text-slate-400">
                      Legal Practice Desk
                    </div>
                    <div className="font-extrabold mt-0.5">{selectedCategory}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] font-bold uppercase text-slate-400">
                      Urgency Classification
                    </div>
                    <div className="font-extrabold text-amber-600 dark:text-amber-400 mt-0.5">
                      {urgency}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] font-bold uppercase text-slate-400">
                      Confirmed Chamber & Date
                    </div>
                    <div className="font-extrabold mt-0.5">
                      {selectedDate} · {selectedSlot}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] font-bold uppercase text-slate-400">
                      Consultation Fee & Payment
                    </div>
                    <div className="font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      {activeChamber.feeLabel} ({paymentMethod})
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <a
                    href={`https://wa.me/8801711000000?text=${encodeURIComponent(
                      `Assalamu Alaikum LexChambers, my Privileged Docket is ${docketNumber} (${selectedCategory}) scheduled for ${selectedDate} at ${selectedSlot}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl text-xs font-extrabold bg-emerald-600 text-white hover:bg-emerald-500 transition"
                  >
                    Message Clerk on WhatsApp ({docketNumber})
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setBookingConfirmed(false);
                      setStep(1);
                    }}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 cursor-pointer"
                  >
                    Submit Another Matter
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleConfirmConsultation} className="p-6 sm:p-8 space-y-6">
                {/* STEP 1: LEGAL CATEGORY, URGENCY & CONFLICT CHECK */}
                {step === 1 && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Select Primary Legal Category / Practice Desk
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {LEGAL_CATEGORIES.map((cat) => {
                          const isSelected = selectedCategory === cat;
                          return (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setSelectedCategory(cat)}
                              className={`p-3 rounded-xl text-left text-xs font-bold border transition flex items-start justify-between gap-2 cursor-pointer ${
                                isSelected
                                  ? 'bg-[#0F172A] text-white border-amber-500 shadow-sm'
                                  : 'bg-slate-50 dark:bg-slate-800/70 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-amber-500/40'
                              }`}
                            >
                              <span>{cat}</span>
                              {isSelected && (
                                <CheckCircle2
                                  size={15}
                                  className="text-amber-400 flex-shrink-0 mt-0.5"
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Matter Urgency Level */}
                    <div className="space-y-2">
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Matter Urgency & Statutory Deadline Classification
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {(
                          [
                            {
                              level: 'Standard Advisory',
                              desc: 'Contract / Land Vetting (5–7 Days)',
                            },
                            {
                              level: 'High Priority',
                              desc: 'NBR Notice / Board Dispute (48 Hrs)',
                            },
                            {
                              level: 'Urgent Court Filing / Injunction',
                              desc: 'Stay Order / Writ Motion (24 Hrs)',
                            },
                          ] as const
                        ).map((u) => {
                          const active = urgency === u.level;
                          return (
                            <button
                              key={u.level}
                              type="button"
                              onClick={() => setUrgency(u.level)}
                              className={`p-3 rounded-xl text-left border transition cursor-pointer ${
                                active
                                  ? 'bg-amber-500/15 border-amber-500 text-slate-900 dark:text-white'
                                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                              }`}
                            >
                              <div className="text-xs font-extrabold flex items-center gap-1.5">
                                {u.level.includes('Urgent') && (
                                  <AlertTriangle size={13} className="text-amber-500" />
                                )}
                                <span>{u.level}</span>
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                {u.desc}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Preliminary Conflict-of-Interest Check */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                          Preliminary Conflict-of-Interest Check (Opposing Party / Authority)
                        </label>
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                          Encrypted Registry Check
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={opposingPartyName}
                          onChange={(e) => {
                            setOpposingPartyName(e.target.value);
                            setConflictChecked(false);
                          }}
                          placeholder="e.g., Commissioner of Taxes Zone-08 / Counterparty Ltd."
                          className="flex-1 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setConflictChecked(true)}
                          className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-white cursor-pointer"
                          style={{ backgroundColor: navyPrimary }}
                        >
                          Verify Conflict Status
                        </button>
                      </div>
                      {conflictChecked && (
                        <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 size={13} />
                          <span>
                            No adverse conflict detected for &ldquo;
                            {opposingPartyName || 'Regulatory Authority'}&rdquo; — Eligible
                            for Senior Counsel intake.
                          </span>
                        </p>
                      )}
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-6 py-3 rounded-xl text-xs font-extrabold text-white flex items-center gap-2 cursor-pointer"
                        style={{ backgroundColor: brassAccent }}
                      >
                        <span>Continue to Case Facts & Exhibits</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: CASE FACTS & ENCRYPTED DOCUMENT UPLOAD */}
                {step === 2 && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Brief Summary of Facts, Impugned Notice, or Transaction Objective
                      </label>
                      <textarea
                        rows={4}
                        value={caseSummary}
                        onChange={(e) => setCaseSummary(e.target.value)}
                        placeholder="Summarize key dates, statutory notices received (e.g., NBR Section 212 notice, RJSC board deadlock, property Mouza/Khatian details), or relief sought..."
                        className="w-full p-3.5 rounded-xl text-xs font-medium bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:outline-none"
                      />
                    </div>

                    {/* Encrypted Document Upload Dropzone */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Upload Preliminary Documents (PDF, DOCX, JPG — Max 15MB)
                        </label>
                        <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                          Auto-Watermarked & Privileged
                        </span>
                      </div>

                      <label className="block p-5 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-amber-500 transition text-center cursor-pointer bg-slate-50/70 dark:bg-slate-800/40">
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={handleSimulatedFileUpload}
                          className="hidden"
                        />
                        <Upload
                          size={22}
                          className="mx-auto mb-2"
                          style={{ color: brassAccent }}
                        />
                        <div className="text-xs font-extrabold">
                          Click to Upload Legal Notices, FIRs, Contracts, or Khatian Deeds
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Protected under Bangladesh Evidence Act 1872, Section 126
                        </div>
                      </label>

                      {/* Quick Sample Exhibit Pills for Demo Testing */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[10px] font-bold text-slate-400">
                          Quick Attach Sample Exhibit:
                        </span>
                        {[
                          'Draft_SHA_JointVenture_2026.docx',
                          'CS_RS_BS_Khatian_Chain_Deed.pdf',
                          'HighCourt_Impugned_Order_Copy.pdf',
                        ].map((sample) => (
                          <button
                            key={sample}
                            type="button"
                            onClick={() => addPresetSampleDocument(sample)}
                            className="px-2 py-1 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-amber-500/15 text-slate-700 dark:text-slate-300 cursor-pointer"
                          >
                            + {sample}
                          </button>
                        ))}
                      </div>

                      {/* Attached Files List */}
                      {uploadedFiles.length > 0 && (
                        <div className="space-y-2 pt-2">
                          {uploadedFiles.map((file, i) => (
                            <div
                              key={`${file.name}-${i}`}
                              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <FileText
                                  size={15}
                                  style={{ color: brassAccent }}
                                  className="flex-shrink-0"
                                />
                                <span className="font-bold truncate">{file.name}</span>
                                <span className="text-[10px] text-slate-500">
                                  ({file.sizeLabel} · {file.typeLabel})
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  setUploadedFiles((prev) =>
                                    prev.filter((_, idx) => idx !== i)
                                  )
                                }
                                className="p-1 text-slate-400 hover:text-rose-500 cursor-pointer"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 cursor-pointer"
                      >
                        <ArrowLeft size={14} />
                        <span>Back</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-6 py-3 rounded-xl text-xs font-extrabold text-white flex items-center gap-2 cursor-pointer"
                        style={{ backgroundColor: brassAccent }}
                      >
                        <span>Select Chamber Slot & Retainer Deposit</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: CHAMBER SLOT, CLIENT DETAILS & MFS / CARD RETAINER */}
                {step === 3 && (
                  <div className="space-y-5">
                    {/* Consultation Mode Selector */}
                    <div className="space-y-2">
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Select Chamber Venue or Virtual Desk
                      </label>
                      <div className="grid grid-cols-1 gap-2.5">
                        {CHAMBER_MODES.map((ch) => {
                          const active = selectedChamberId === ch.id;
                          return (
                            <button
                              key={ch.id}
                              type="button"
                              onClick={() => setSelectedChamberId(ch.id)}
                              className={`p-3.5 rounded-xl text-left border transition flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer ${
                                active
                                  ? 'bg-[#0F172A] text-white border-amber-500 shadow-md'
                                  : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700'
                              }`}
                            >
                              <div>
                                <div className="text-xs font-extrabold flex items-center gap-2">
                                  {ch.id === 'virtual_zoom' ? (
                                    <Video size={14} className="text-amber-400" />
                                  ) : (
                                    <MapPin size={14} className="text-amber-400" />
                                  )}
                                  <span>{ch.title}</span>
                                </div>
                                <div
                                  className={`text-[11px] mt-0.5 ${
                                    active ? 'text-slate-300' : 'text-slate-500'
                                  }`}
                                >
                                  {ch.location} · {ch.timing}
                                </div>
                              </div>
                              <span
                                className={`px-2.5 py-1 rounded text-[11px] font-extrabold self-start sm:self-center ${
                                  active
                                    ? 'bg-amber-500 text-slate-950'
                                    : 'bg-amber-500/15 text-amber-700 dark:text-amber-300'
                                }`}
                              >
                                {ch.feeLabel}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Date & Time Slot Picker */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase text-slate-500 mb-1">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase text-slate-500 mb-1">
                          Available Counsel Slot
                        </label>
                        <select
                          value={selectedSlot}
                          onChange={(e) => setSelectedSlot(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                        >
                          {TIME_SLOTS.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Client Identity & BD Mobile Validation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase text-slate-500 mb-1">
                          Client Full Name / Signatory *
                        </label>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="e.g., Salman F. Rahman / Managing Director"
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase text-slate-500 mb-1">
                          Company / Organization (Optional)
                        </label>
                        <input
                          type="text"
                          value={clientCompany}
                          onChange={(e) => setClientCompany(e.target.value)}
                          placeholder="e.g., Orion Logistics BD Ltd."
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase text-slate-500 mb-1">
                          Bangladesh Mobile (+8801XXXXXXXXX) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder="01711000000"
                          className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-50 dark:bg-slate-800 border ${
                            clientPhone.length > 3 && !isBdPhoneValid
                              ? 'border-amber-500'
                              : 'border-slate-200 dark:border-slate-700'
                          }`}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase text-slate-500 mb-1">
                          Official Email for Written Opinion
                        </label>
                        <input
                          type="email"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="counsel@company.com.bd"
                          className="w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                    </div>

                    {/* Retainer Deposit Method */}
                    <div className="space-y-2.5">
                      <label className="block text-[11px] font-extrabold uppercase text-slate-500">
                        Consultation Retainer Payment ({activeChamber.feeLabel})
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {(['bKash', 'Nagad', 'Corporate Card', 'Chamber Desk'] as const).map(
                          (pm) => {
                            const active = paymentMethod === pm;
                            return (
                              <button
                                key={pm}
                                type="button"
                                onClick={() => setPaymentMethod(pm)}
                                className={`py-2.5 px-3 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                                  active
                                    ? 'bg-amber-500 text-slate-950 border-amber-500'
                                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                                }`}
                              >
                                {pm}
                              </button>
                            );
                          }
                        )}
                      </div>

                      {(paymentMethod === 'bKash' || paymentMethod === 'Nagad') && (
                        <div className="p-3.5 rounded-xl bg-slate-900 text-white border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="space-y-0.5 text-xs">
                            <div className="font-extrabold text-amber-400">
                              {paymentMethod} Merchant Account: 01711-889900 (Make Payment)
                            </div>
                            <div className="text-[11px] text-slate-300">
                              Amount: <strong>৳{activeChamber.feeBdt.toLocaleString()}</strong>{' '}
                              · Reference: <strong>LEX-INTAKE</strong>
                            </div>
                          </div>
                          <input
                            type="text"
                            value={trxId}
                            onChange={(e) => setTrxId(e.target.value.toUpperCase())}
                            placeholder="Enter TrxID (e.g. BKA92L81)"
                            className="px-3 py-2 rounded-lg text-xs font-mono font-bold bg-slate-800 border border-slate-700 text-white"
                          />
                        </div>
                      )}
                    </div>

                    {/* Privilege & NDA Checkbox */}
                    <label className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privilegeAccepted}
                        onChange={(e) => setPrivilegeAccepted(e.target.checked)}
                        className="mt-0.5 accent-amber-600"
                      />
                      <span>
                        I confirm that all uploaded documents and facts are shared under
                        strict <strong>Attorney-Client Privilege (Section 126, Evidence Act)</strong>{' '}
                        and authorize LexChambers to conduct a preliminary conflict review.
                      </span>
                    </label>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 cursor-pointer"
                      >
                        <ArrowLeft size={14} />
                        <span>Back</span>
                      </button>

                      <button
                        type="submit"
                        disabled={!privilegeAccepted}
                        className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold text-white shadow-lg hover:opacity-95 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                        style={{ backgroundColor: brassAccent }}
                      >
                        <Lock size={15} />
                        <span>Confirm Privileged Consultation ({activeChamber.feeLabel})</span>
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Right 5 Columns: Live Privileged Dossier Summary & Chamber Schedule */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-[#0F172A] text-white border border-slate-800 p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Scale size={18} style={{ color: brassAccent }} />
                  <h3
                    className="text-lg font-bold"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Live Intake Dossier Summary
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Privileged
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Practice Desk:</span>
                  <span className="font-bold text-right text-amber-300 max-w-[220px]">
                    {selectedCategory}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Urgency Tier:</span>
                  <span className="font-bold text-white">{urgency}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Attached Exhibits:</span>
                  <span className="font-bold text-emerald-400">
                    {uploadedFiles.length} Encrypted File(s)
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Selected Chamber:</span>
                  <span className="font-bold text-right max-w-[220px]">
                    {activeChamber.title}
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Consultation Fee:</span>
                  <span className="text-base font-black text-amber-400">
                    {activeChamber.feeLabel}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <div className="font-extrabold text-white flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-amber-400" />
                  <span>What Your Consultation Includes:</span>
                </div>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li>• 45-Minute 1-on-1 review with Senior Barrister / Tax Partner</li>
                  <li>• Preliminary examination of uploaded notices, deeds, or contracts</li>
                  <li>• Written Roadmap of statutory remedies & limitation deadlines</li>
                  <li>• 100% fee adjustment if retained for litigation or corporate work</li>
                </ul>
              </div>
            </div>

            {/* Direct Emergency Bail / Injunction Hotline Card */}
            <div className="rounded-2xl p-5 bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Urgent Stay Order / Detention / Bank Freeze?
                </div>
                <div className="text-sm font-bold">
                  Direct Senior Clerk Urgent Motion Desk
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  Available for emergency High Court Division mention slips.
                </div>
              </div>
              <a
                href="tel:+8801711889900"
                className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-white flex items-center gap-1.5 flex-shrink-0"
                style={{ backgroundColor: navyPrimary }}
              >
                <Phone size={14} style={{ color: brassAccent }} />
                <span>Call Desk</span>
              </a>
            </div>
          </div>
        </div>

        {/* =============================================================== */}
        {/* PART B: CORPORATE RETAINER & FIXED-FEE TRANSPARENCY MATRIX      */}
        {/* =============================================================== */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              <Building2 size={14} />
              <span>Corporate Legal Department & Retainer Packages</span>
            </div>
            <h3
              className="text-2xl sm:text-3xl font-bold"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              <EditableText
                elementId="lex_retainer_heading"
                defaultText="Predictable Corporate Retainers & Fixed-Fee Mandates"
              />
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Retain LexChambers as your external General Counsel & Tax Advisory Desk with
              transparent monthly SLAs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {RETAINER_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl p-6 border flex flex-col justify-between space-y-6 ${
                  plan.featured
                    ? 'bg-[#0F172A] text-white border-amber-500 shadow-2xl ring-2 ring-amber-500/40'
                    : isDark
                    ? 'bg-slate-900 border-slate-800 text-white'
                    : 'bg-white border-slate-200/90 text-slate-900 shadow-xs'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${
                        plan.featured
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-amber-500/15 text-amber-700 dark:text-amber-400'
                      }`}
                    >
                      {plan.featured ? 'Most Retained by Corporates' : 'Institutional Mandate'}
                    </span>
                  </div>

                  <div>
                    <h4
                      className="text-xl font-bold"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {plan.name}
                    </h4>
                    <p
                      className={`text-xs font-medium mt-0.5 ${
                        plan.featured ? 'text-amber-300' : 'text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {plan.bnSubtitle}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1.5 pt-1">
                    <span className="text-3xl font-black">{plan.monthlyBdt}</span>
                    <span
                      className={`text-xs ${
                        plan.featured ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {plan.period}
                    </span>
                  </div>

                  <p
                    className={`text-[11px] font-semibold pb-3 border-b ${
                      plan.featured
                        ? 'text-slate-300 border-slate-800'
                        : 'text-slate-500 border-slate-100 dark:border-slate-800'
                    }`}
                  >
                    Ideal for: {plan.idealFor}
                  </p>

                  <ul className="space-y-2.5 text-xs">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <CheckCircle2
                          size={15}
                          className="text-emerald-500 flex-shrink-0 mt-0.5"
                        />
                        <span className={plan.featured ? 'text-slate-200' : ''}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory(plan.name);
                    setStep(1);
                    window.scrollTo({
                      top:
                        (document.getElementById('lex-consultation-intake')?.offsetTop ||
                          600) - 40,
                      behavior: 'smooth',
                    });
                  }}
                  className={`w-full py-3 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                    plan.featured
                      ? 'bg-amber-400 text-slate-950 hover:bg-amber-300'
                      : 'bg-[#0F172A] text-white hover:opacity-95'
                  }`}
                >
                  Request Retainer Proposal
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
