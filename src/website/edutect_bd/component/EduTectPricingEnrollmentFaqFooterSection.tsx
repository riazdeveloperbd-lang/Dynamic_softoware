import React, { useState } from 'react';
import {
  CreditCard,
  Lock,
  CheckCircle2,
  Sparkles,
  Smartphone,
  ChevronDown,
  GraduationCap,
  ShieldCheck,
  Eye,
  X,
  FileText,
  Video,
  Users,
  Award,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface EduTectPricingEnrollmentFaqFooterSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

interface EnrollmentTierPlan {
  id: 'live_batch' | 'recorded_self_paced';
  name: string;
  banglaName: string;
  badge: string;
  regularPriceBdt: number;
  earlyBirdDiscountBdt: number;
  payablePriceBdt: number;
  scheduleSummary: string;
  shortDesc: string;
  features: string[];
  syllabusDeliverables: string[];
  mockTestsIncluded: string;
  supportChannel: string;
}

const ENROLLMENT_PLANS: EnrollmentTierPlan[] = [
  {
    id: 'live_batch',
    name: 'Live Batch Plan (Interactive Zoom + 1-on-1 Mock Tests)',
    banglaName: 'লাইভ ব্যাচ ১৮ • জুম ক্লাস ও ১-অন-১ মক টেস্ট',
    badge: 'MOST POPULAR • 84% STUDENTS CHOOSE THIS',
    regularPriceBdt: 3500,
    earlyBirdDiscountBdt: 500,
    payablePriceBdt: 3000,
    scheduleSummary: 'Batch 18: Fri & Sat (8:00 PM – 10:00 PM) • 8 Weeks',
    shortDesc:
      'Interactive live Zoom classes with Sadman Sakib, private Telegram/WhatsApp mentor support group, printed/PDF lecture sheets, and 10 full computer-delivered mock tests.',
    features: [
      '24 Interactive Live Zoom Classes + Instant HD Dashboard Recordings',
      'Private Telegram & WhatsApp Mentor Group (24/7 Doubt Solving)',
      '10 Full-Length British Council / IDP Standard Mock Tests + Band Breakdown',
      'Unlimited Writing Task 1 & Task 2 Red-Pen Evaluation + 4 Speaking Mocks',
      '400-Page Exam-Tested PDF Lecture Sheets & Cambridge Vocabulary Bank',
    ],
    syllabusDeliverables: [
      'Live Weekly Reading Speed-Drills & Listening Distractor Labs',
      '1-on-1 Zoom Speaking Cue-Card Room with Certified Assessors',
      'Dedicated Friday Repeat & Problem-Solving Clinic',
    ],
    mockTestsIncluded: '10 Full Mock Tests + 4 Live Speaking Interviews',
    supportChannel: 'Private Telegram VIP Group + Direct WhatsApp Mentor Line',
  },
  {
    id: 'recorded_self_paced',
    name: 'Recorded Self-Paced Plan (Lifetime Course Library)',
    banglaName: 'রেকর্ডেড সেলফ-পেসড প্যাক • আজীবন এক্সেস',
    badge: 'FLEXIBLE FOR BUSY PROFESSIONALS',
    regularPriceBdt: 2500,
    earlyBirdDiscountBdt: 500,
    payablePriceBdt: 2000,
    scheduleSummary: 'Instant 100% Unlock • Study Anytime on Mobile/PC',
    shortDesc:
      'Full HD pre-recorded course library access, downloadable PDF practice sets, self-graded quizzes, and lifetime syllabus updates.',
    features: [
      '65+ HD Recorded Video Lessons Across All 4 Modules (Instant Unlock)',
      'All 400-Page Printable PDF Lecture Sheets & Essay Templates',
      '5 Self-Paced Computer Mock Tests with Automated Answer Explanations',
      'Access to Community Facebook Study Group & Monthly Live Q&A',
      'Lifetime Access to All Future 2026–2027 Syllabus Updates',
    ],
    syllabusDeliverables: [
      'Mobile & Desktop App Streaming with Offline PDF Downloads',
      'Chapter-Wise Self-Assessment Quizzes after Every Module',
    ],
    mockTestsIncluded: '5 Automated Full-Length Practice Tests',
    supportChannel: 'Private Facebook Community Group + Monthly Q&A',
  },
];

const EDUTECT_FAQS = [
  {
    q: 'How do I access recordings if I miss a live class? (লাইভ ক্লাস মিস করলে রেকর্ডিং কীভাবে পাবো?)',
    a: 'Every live Zoom class is automatically recorded in 1080p HD and uploaded to your personal student dashboard and private Telegram group within 2 hours of class completion. You have lifetime access to re-watch any session as many times as you need.',
  },
  {
    q: 'Are mock tests and 1-on-1 Writing/Speaking evaluations included in the ৳3,000 fee?',
    a: 'Yes! The Live Batch Plan (৳3,000 after EARLYBIRD discount) includes 10 full-length mock tests, 4 live 1-on-1 Speaking mock interviews on Zoom, and personal red-pen feedback on your Writing Task 1 and Task 2 scripts with zero hidden charges.',
  },
  {
    q: 'How do I make payment via bKash, Nagad, or Rocket? How fast is enrollment?',
    a: 'You can pay via Option A (Instant Automated Gateway with bKash, Nagad, Rocket, Upay, or Visa/Mastercard) for immediate 10-second dashboard unlock—or Option B (Manual Send Money / Cash Out by submitting your 11-digit MFS number and TrxID). In both cases, you receive your SMS confirmation and private Telegram/Facebook group link within 2 minutes.',
  },
  {
    q: 'Can beginners with weak English grammar or first-time BCS candidates join this batch?',
    a: 'Absolutely. Week 1 includes 3 foundational bridge classes covering complex sentence structures, high-scoring vocabulary collocations, and time-management fundamentals before moving into advanced exam strategies.',
  },
];

export const EduTectPricingEnrollmentFaqFooterSection: React.FC<
  EduTectPricingEnrollmentFaqFooterSectionProps
> = ({ title, subtitle, variant, primaryColor, isDark }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<
    'live_batch' | 'recorded_self_paced'
  >('live_batch');
  const [inspectPlanModal, setInspectPlanModal] =
    useState<EnrollmentTierPlan | null>(null);

  // 2-Step Checkout Component State
  const [studentFullName, setStudentFullName] = useState<string>(
    'Tanvir Ahmed Rakin'
  );
  const [studentWhatsapp, setStudentWhatsapp] = useState<string>('01712948310');
  const [studentEmail, setStudentEmail] = useState<string>(
    'rakin.du.bd@gmail.com'
  );
  const [preferredSchedule, setPreferredSchedule] = useState<string>(
    'Batch 18: Fri & Sat (8:00 PM)'
  );

  // Step 2 Payment Method Selection: Option A (Automated Gateway) vs Option B (Manual MFS TrxID)
  const [paymentMode, setPaymentMode] = useState<
    'automated_gateway' | 'manual_trxid'
  >('automated_gateway');
  const [selectedMfsBrand, setSelectedMfsBrand] = useState<
    'bKash' | 'Nagad' | 'Rocket' | 'Card'
  >('bKash');
  const [manualSenderNumber, setManualSenderNumber] =
    useState<string>('01712948310');
  const [manualTrxId, setManualTrxId] = useState<string>('BK94M82L0Q');
  const [enrollmentCompleted, setEnrollmentCompleted] =
    useState<boolean>(false);

  // FAQ State
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const royalIndigo = '#1E1B4B';
  const electricBlue = primaryColor || '#2563EB';
  const warmAmber = '#D97706';
  const isBrutalist = variant === 'varient_3';

  const activePlan =
    ENROLLMENT_PLANS.find((p) => p.id === selectedPlanId) ||
    ENROLLMENT_PLANS[0];

  const cleanPhone = studentWhatsapp.replace(/\D/g, '');
  const isValidBdWhatsapp = /^01[3-9]\d{8}$/.test(cleanPhone);

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setEnrollmentCompleted(true);
  };

  return (
    <section
      id="edutect-enrollment"
      className={`pt-16 sm:pt-24 scroll-mt-20 border-t transition-colors ${
        isDark
          ? 'bg-[#131130] text-slate-100 border-indigo-900/60'
          : 'bg-[#F8FAFC] text-[#1E1B4B] border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ================= 5. FLEXIBLE BATCH PRICING & ENROLLMENT TIERS ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-white"
            style={{ backgroundColor: electricBlue }}
          >
            <CreditCard size={13} />
            FLEXIBLE BATCH PRICING & INSTANT BD MFS ENROLLMENT
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            <EditableText
              id="edutect_pricing_title"
              defaultText={
                title ||
                'Choose Your Learning Track & Complete 2-Minute bKash/Nagad Enrollment'
              }
            />
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            <EditableText
              id="edutect_pricing_subtitle"
              defaultText={
                subtitle ||
                'Click any tier card to inspect full batch deliverables, or complete the 2-step checkout below for instant SMS access to our private Telegram group and student portal.'
              }
            />
          </p>
        </div>

        {/* 2 Tier Cards: Live Batch Plan vs Recorded Self-Paced Plan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mb-14">
          {ENROLLMENT_PLANS.map((plan) => {
            const isSelected = selectedPlanId === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => {
                  setSelectedPlanId(plan.id);
                  setInspectPlanModal(plan);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setInspectPlanModal(plan);
                  }
                }}
                className={`group cursor-pointer overflow-hidden border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'border-2 shadow-xl'
                    : isDark
                    ? 'bg-slate-900 border-indigo-900/70'
                    : 'bg-white border-slate-200 hover:shadow-lg'
                } ${
                  isBrutalist
                    ? 'rounded-none border-2 border-[#1E1B4B] shadow-[5px_5px_0px_#2563EB]'
                    : 'rounded-3xl'
                } ${isDark ? 'bg-slate-900' : 'bg-white'}`}
                style={
                  isSelected ? { borderColor: electricBlue } : undefined
                }
              >
                <div>
                  {/* Top Plan Banner */}
                  <div
                    className="px-6 py-3.5 text-white flex items-center justify-between gap-2"
                    style={{
                      backgroundColor:
                        plan.id === 'live_batch' ? royalIndigo : '#334155',
                    }}
                  >
                    <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                      {plan.badge}
                    </span>
                    <span className="text-xs font-extrabold text-indigo-200">
                      {plan.scheduleSummary}
                    </span>
                  </div>

                  {/* Plan Body */}
                  <div className="p-6 sm:p-7 space-y-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-[#1E1B4B] dark:text-white">
                          {plan.name}
                        </h3>
                        <p className="text-xs font-bold text-blue-600 dark:text-amber-300 mt-0.5">
                          {plan.banglaName}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs line-through text-slate-400 font-bold block">
                          Regular: ৳{plan.regularPriceBdt.toLocaleString()}
                        </span>
                        <span
                          className="text-2xl sm:text-3xl font-black"
                          style={{ color: electricBlue }}
                        >
                          ৳{plan.payablePriceBdt.toLocaleString()}
                        </span>
                        <span className="block text-[10px] font-black uppercase text-emerald-600">
                          Promo EARLYBIRD (-৳{plan.earlyBirdDiscountBdt})
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {plan.shortDesc}
                    </p>

                    <ul className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                      {plan.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-2.5 text-xs sm:text-sm"
                        >
                          <CheckCircle2
                            size={16}
                            className="shrink-0 mt-0.5"
                            style={{ color: electricBlue }}
                          />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Bottom Action Bar */}
                <div
                  className="px-6 py-4 bg-slate-50 dark:bg-slate-950/90 border-t border-slate-200/80 dark:border-indigo-900/50 flex items-center justify-between gap-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedPlanId(plan.id)}
                    className="flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black text-white shadow-sm cursor-pointer"
                    style={{
                      backgroundColor: isSelected ? electricBlue : royalIndigo,
                    }}
                  >
                    {isSelected
                      ? `✓ Selected for Checkout (৳${plan.payablePriceBdt.toLocaleString()})`
                      : `Select ${plan.name.split('(')[0].trim()} (৳${plan.payablePriceBdt.toLocaleString()})`}
                  </button>

                  <button
                    type="button"
                    onClick={() => setInspectPlanModal(plan)}
                    className="py-3 px-3.5 rounded-xl text-xs font-extrabold border border-slate-300 dark:border-slate-700 hover:border-[#2563EB] flex items-center gap-1 cursor-pointer"
                  >
                    <Eye size={14} style={{ color: electricBlue }} />
                    <span>Full Specs</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= 4. INTERACTIVE 2-STEP ENROLLMENT FORM & BD PAYMENT GATEWAY PREVIEW ================= */}
        <div
          className={`overflow-hidden border shadow-2xl ${
            isBrutalist
              ? 'rounded-none border-2 border-[#1E1B4B] shadow-[6px_6px_0px_#D97706]'
              : 'rounded-3xl border-slate-200 dark:border-indigo-800'
          } ${isDark ? 'bg-slate-900' : 'bg-white'}`}
        >
          <div
            className="p-5 sm:p-6 text-white flex flex-wrap items-center justify-between gap-3"
            style={{ backgroundColor: royalIndigo }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white"
                style={{ backgroundColor: electricBlue }}
              >
                <Smartphone size={20} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block">
                  2-STEP MOBILE-FIRST BD ENROLLMENT GATEWAY
                </span>
                <h3 className="text-base sm:text-xl font-black">
                  Instant Enrollment & MFS (bKash / Nagad / Rocket) Checkout
                </h3>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              🔒 256-Bit SSLCommerz / AmarPay Secured
            </span>
          </div>

          <form
            onSubmit={handleCompletePayment}
            className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* LEFT 7 COLS: STEP 1 (STUDENT INFO) & STEP 2 (PAYMENT METHOD SELECTION) */}
            <div className="lg:col-span-7 space-y-7">
              {/* STEP 1: STUDENT INFORMATION INTAKE */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-blue-600 dark:text-amber-400">
                    Step 1: Student Information Intake
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">
                    For Instant SMS & Telegram Link Dispatch
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name (English) */}
                  <div>
                    <label className="text-xs font-extrabold text-slate-600 dark:text-slate-300 block mb-1.5">
                      Full Name (English — For Certificate) *
                    </label>
                    <input
                      type="text"
                      required
                      value={studentFullName}
                      onChange={(e) => setStudentFullName(e.target.value)}
                      placeholder="e.g., Tanvir Ahmed Rakin"
                      className="w-full px-3.5 py-3 rounded-xl text-xs sm:text-sm font-bold border border-slate-300 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-950"
                    />
                  </div>

                  {/* Active WhatsApp / Mobile Number (+880 validation) */}
                  <div>
                    <label className="flex items-center justify-between text-xs font-extrabold text-slate-600 dark:text-slate-300 mb-1.5">
                      <span>Active WhatsApp / Mobile (+880) *</span>
                      <span
                        className={`text-[10px] font-black ${
                          isValidBdWhatsapp
                            ? 'text-emerald-600'
                            : 'text-amber-600'
                        }`}
                      >
                        {isValidBdWhatsapp ? '✓ Valid BD Number' : '11 Digits'}
                      </span>
                    </label>
                    <div className="flex items-center rounded-xl border border-slate-300 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-950 overflow-hidden">
                      <span className="px-2.5 py-3 text-xs font-black bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-r border-slate-300 dark:border-slate-700">
                        +88
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={11}
                        value={studentWhatsapp}
                        onChange={(e) => setStudentWhatsapp(e.target.value)}
                        placeholder="01712000000"
                        className="w-full px-3 py-3 text-xs sm:text-sm font-mono font-bold bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email Address */}
                  <div>
                    <label className="text-xs font-extrabold text-slate-600 dark:text-slate-300 block mb-1.5">
                      Email Address (For Portal & Google Drive Sheets) *
                    </label>
                    <input
                      type="email"
                      required
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      placeholder="student@gmail.com"
                      className="w-full px-3.5 py-3 rounded-xl text-xs sm:text-sm font-bold border border-slate-300 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-950"
                    />
                  </div>

                  {/* Select Preferred Batch / Schedule Dropdown */}
                  <div>
                    <label className="text-xs font-extrabold text-slate-600 dark:text-slate-300 block mb-1.5">
                      Select Preferred Batch / Schedule *
                    </label>
                    <select
                      value={preferredSchedule}
                      onChange={(e) => setPreferredSchedule(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl text-xs sm:text-sm font-extrabold border border-slate-300 dark:border-slate-700 bg-[#F8FAFC] dark:bg-slate-950"
                    >
                      <option value="Batch 18: Fri & Sat (8:00 PM)">
                        Batch 18: Fri & Sat (8:00 PM) — 12 Seats Left
                      </option>
                      <option value="Batch 18 (Section B): Sun & Tue (8:30 PM)">
                        Batch 18 (Section B): Sun & Tue (8:30 PM)
                      </option>
                      <option value="Batch 18 (Executive): Fri Morning (10:00 AM)">
                        Batch 18 (Executive): Fri Morning (10:00 AM)
                      </option>
                      <option value="Self-Paced Recorded Library (Instant Unlock)">
                        Self-Paced Recorded Library (Instant Unlock)
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* STEP 2: PAYMENT METHOD SELECTION */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-blue-600 dark:text-amber-400">
                    Step 2: Payment Method Selection
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">
                    Choose Automated Gateway or Manual MFS TrxID
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Payment Option A: Automated Payment Gateway */}
                  <button
                    type="button"
                    onClick={() => setPaymentMode('automated_gateway')}
                    className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                      paymentMode === 'automated_gateway'
                        ? 'border-2 bg-blue-50/50 dark:bg-indigo-950/50'
                        : isDark
                        ? 'bg-slate-950 border-slate-800'
                        : 'bg-[#F8FAFC] border-slate-200'
                    }`}
                    style={
                      paymentMode === 'automated_gateway'
                        ? { borderColor: electricBlue }
                        : undefined
                    }
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-black uppercase text-white"
                        style={{ backgroundColor: electricBlue }}
                      >
                        OPTION A • INSTANT AUTO-UNLOCK
                      </span>
                      <CreditCard size={16} style={{ color: electricBlue }} />
                    </div>
                    <p className="text-xs sm:text-sm font-black">
                      Automated Payment Gateway (SSLCommerz / AmarPay)
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      One-tap OTP payment via bKash, Nagad, Upay, Rocket or Visa/Mastercard
                    </p>
                  </button>

                  {/* Payment Option B: Manual MFS Transaction (Send Money / Cash Out with TrxID) */}
                  <button
                    type="button"
                    onClick={() => setPaymentMode('manual_trxid')}
                    className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                      paymentMode === 'manual_trxid'
                        ? 'border-2 bg-blue-50/50 dark:bg-indigo-950/50'
                        : isDark
                        ? 'bg-slate-950 border-slate-800'
                        : 'bg-[#F8FAFC] border-slate-200'
                    }`}
                    style={
                      paymentMode === 'manual_trxid'
                        ? { borderColor: electricBlue }
                        : undefined
                    }
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500 text-slate-950">
                        OPTION B • SEND MONEY / TRXID
                      </span>
                      <Smartphone size={16} style={{ color: warmAmber }} />
                    </div>
                    <p className="text-xs sm:text-sm font-black">
                      Manual MFS Transaction (Send Money / Cash Out)
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Send to our merchant number & enter your MFS Number + TrxID below
                    </p>
                  </button>
                </div>

                {/* Visual Icons for bKash (Pink), Nagad (Orange), Rocket (Purple), Visa/MC */}
                <div className="p-4 rounded-2xl bg-[#F8FAFC] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                  <p className="text-xs font-extrabold text-slate-500">
                    Select Mobile Financial Service (MFS) or Card Brand:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      {
                        id: 'bKash' as const,
                        label: 'bKash (বিকাশ)',
                        sub: 'Instant Merchant Pay',
                        color: '#E2136E',
                      },
                      {
                        id: 'Nagad' as const,
                        label: 'Nagad (নগদ)',
                        sub: 'Zero Charge Gateway',
                        color: '#F37021',
                      },
                      {
                        id: 'Rocket' as const,
                        label: 'Rocket (রকেট)',
                        sub: 'DBBL Mobile Banking',
                        color: '#8C3494',
                      },
                      {
                        id: 'Card' as const,
                        label: 'Visa / Mastercard',
                        sub: 'Local & Intl Cards',
                        color: '#1E1B4B',
                      },
                    ].map((brand) => {
                      const active = selectedMfsBrand === brand.id;
                      return (
                        <button
                          key={brand.id}
                          type="button"
                          onClick={() => setSelectedMfsBrand(brand.id)}
                          className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                            active
                              ? 'text-white border-transparent shadow-sm'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700'
                          }`}
                          style={
                            active ? { backgroundColor: brand.color } : undefined
                          }
                        >
                          <span className="text-xs font-black block">
                            {brand.label}
                          </span>
                          <span
                            className={`text-[10px] font-semibold block mt-0.5 ${
                              active ? 'text-white/85' : 'text-slate-400'
                            }`}
                          >
                            {brand.sub}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Manual MFS Number & TrxID Inputs when Option B is selected */}
                  {paymentMode === 'manual_trxid' && (
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
                      <p className="text-xs font-bold text-amber-700 dark:text-amber-300">
                        Send Money / Cash Out ৳{activePlan.payablePriceBdt.toLocaleString()} to EduTect Merchant{' '}
                        <strong className="font-mono underline">
                          01700-889900 ({selectedMfsBrand})
                        </strong>{' '}
                        and enter your details:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-extrabold text-slate-500 block mb-1">
                            Sender {selectedMfsBrand} Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={manualSenderNumber}
                            onChange={(e) =>
                              setManualSenderNumber(e.target.value)
                            }
                            placeholder="017XXXXXXXX"
                            className="w-full px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-extrabold text-slate-500 block mb-1">
                            Transaction ID (TrxID) *
                          </label>
                          <input
                            type="text"
                            required
                            value={manualTrxId}
                            onChange={(e) =>
                              setManualTrxId(e.target.value.toUpperCase())
                            }
                            placeholder="e.g., BK94M82L0Q"
                            className="w-full px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 uppercase"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT 5 COLS: 3. MFS INTERACTIVE PREVIEW & SUMMARY BOX */}
            <div className="lg:col-span-5">
              <div
                className="p-6 sm:p-7 rounded-3xl text-white space-y-5 shadow-xl"
                style={{ backgroundColor: royalIndigo }}
              >
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
                      ORDER SUMMARY & MFS RECEIPT
                    </span>
                    <h4 className="text-base sm:text-lg font-black mt-0.5">
                      {activePlan.name.split('(')[0].trim()}
                    </h4>
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-lg text-xs font-black text-white"
                    style={{
                      backgroundColor:
                        selectedMfsBrand === 'bKash'
                          ? '#E2136E'
                          : selectedMfsBrand === 'Nagad'
                          ? '#F37021'
                          : selectedMfsBrand === 'Rocket'
                          ? '#8C3494'
                          : electricBlue,
                    }}
                  >
                    {selectedMfsBrand}
                  </span>
                </div>

                {/* Exact Required Order Summary Box */}
                <div className="p-5 rounded-2xl bg-slate-950/90 border border-indigo-500/40 font-mono text-xs sm:text-sm leading-relaxed space-y-1.5">
                  <div className="text-slate-500 text-[11px] select-none">
                    --------------------------------------------
                  </div>
                  <div className="flex justify-between text-slate-200">
                    <span>Course Fee:</span>
                    <strong className="text-white">
                      ৳{activePlan.regularPriceBdt.toLocaleString()}
                    </strong>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>Promo Discount (EARLYBIRD):</span>
                    <strong>-৳{activePlan.earlyBirdDiscountBdt}</strong>
                  </div>
                  <div className="flex justify-between text-base font-black text-amber-300 pt-1">
                    <span>Total Payable:</span>
                    <span>৳{activePlan.payablePriceBdt.toLocaleString()}</span>
                  </div>
                  <div className="text-slate-500 text-[11px] select-none">
                    --------------------------------------------
                  </div>
                </div>

                {/* Student Summary Readout */}
                <div className="space-y-1.5 text-xs text-indigo-200">
                  <div className="flex justify-between">
                    <span>Student Name:</span>
                    <strong className="text-white">{studentFullName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>WhatsApp SMS Target:</span>
                    <strong className="text-amber-300">
                      +88{studentWhatsapp}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Selected Schedule:</span>
                    <strong className="text-white">{preferredSchedule}</strong>
                  </div>
                </div>

                {/* Required Micro-Copy */}
                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 text-xs text-indigo-100 leading-relaxed">
                  <p className="font-semibold">
                    &ldquo;Instant enrollment! You will receive access to the private Facebook/Telegram group &amp; dashboard via SMS within 2 minutes.&rdquo;
                  </p>
                </div>

                {/* Primary Action CTA with Lock Icon */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl text-sm sm:text-base font-black text-white shadow-lg flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5 cursor-pointer"
                  style={{ backgroundColor: electricBlue }}
                >
                  <Lock size={17} className="text-amber-300" />
                  <span>
                    Complete Payment (৳{activePlan.payablePriceBdt.toLocaleString()})
                  </span>
                </button>

                {enrollmentCompleted && (
                  <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 text-xs space-y-1.5 text-emerald-200">
                    <p className="font-black text-white text-sm flex items-center gap-1.5">
                      <CheckCircle2 size={16} className="text-emerald-400" />
                      Enrollment Confirmed! Student ID: #EDT-2026-884
                    </p>
                    <p>
                      SMS with private Telegram link &amp; Dashboard login sent to{' '}
                      <strong className="text-white">+88{studentWhatsapp}</strong>{' '}
                      and <strong className="text-white">{studentEmail}</strong>.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* ================= 6. FREQUENTLY ASKED QUESTIONS (FAQ) ================= */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center space-y-2 mb-8">
            <span
              className="inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider text-white"
              style={{ backgroundColor: royalIndigo }}
            >
              STUDENT SUPPORT & FAQ
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              Frequently Asked Questions (সচরাচর জিজ্ঞাসিত প্রশ্নাবলী)
            </h3>
          </div>

          <div className="space-y-3">
            {EDUTECT_FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={faq.q}
                  className={`rounded-2xl border overflow-hidden transition ${
                    isDark
                      ? 'bg-slate-900 border-indigo-900/70'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-black text-xs sm:text-sm cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer
        className="mt-20 py-12 text-white border-t border-indigo-900"
        style={{ backgroundColor: royalIndigo }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: electricBlue }}
            >
              <GraduationCap size={19} />
            </div>
            <div>
              <p className="font-black text-sm text-white">
                EduTect BD • IELTS, BCS & Skill Mentorship Platform
              </p>
              <p className="text-[11px] text-indigo-300">
                25,000+ Alumni • Instant bKash, Nagad & SSLCommerz Enrollment • Dhaka, Bangladesh
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-indigo-200 font-bold">
            <span>Helpline: 09610-998877 (10 AM – 10 PM)</span>
            <span>•</span>
            <span>© {new Date().getFullYear()} EduTect Bangladesh</span>
          </div>
        </div>
      </footer>

      {/* ================= PLAN FULL DETAILS MODAL ================= */}
      {inspectPlanModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setInspectPlanModal(null)}
        >
          <div
            className={`max-w-xl w-full rounded-3xl overflow-hidden border shadow-2xl ${
              isDark
                ? 'bg-slate-900 border-indigo-800 text-slate-100'
                : 'bg-white border-slate-200 text-[#1E1B4B]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="p-6 text-white flex items-start justify-between gap-4"
              style={{ backgroundColor: royalIndigo }}
            >
              <div>
                <span className="px-2.5 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                  {inspectPlanModal.badge}
                </span>
                <h3 className="text-xl font-black mt-1">
                  {inspectPlanModal.name}
                </h3>
                <p className="text-xs text-indigo-200">
                  {inspectPlanModal.banglaName}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setInspectPlanModal(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">
                    Mock Exams Included
                  </span>
                  <strong className="font-black text-blue-600 dark:text-amber-300">
                    {inspectPlanModal.mockTestsIncluded}
                  </strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">
                    Mentor Support Channel
                  </span>
                  <strong className="font-black">
                    {inspectPlanModal.supportChannel}
                  </strong>
                </div>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm">
                {inspectPlanModal.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2
                      size={15}
                      className="shrink-0 mt-0.5"
                      style={{ color: electricBlue }}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-lg font-black" style={{ color: electricBlue }}>
                  Payable: ৳{inspectPlanModal.payablePriceBdt.toLocaleString()}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlanId(inspectPlanModal.id);
                    setInspectPlanModal(null);
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs font-black text-white cursor-pointer"
                  style={{ backgroundColor: electricBlue }}
                >
                  Select This Plan for Checkout →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
