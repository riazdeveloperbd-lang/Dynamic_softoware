import React, { useState } from 'react';
import {
  Coffee,
  Star,
  CheckCircle2,
  ShieldCheck,
  Clock,
  TrendingUp,
  FileText,
  CalendarClock,
  RefreshCw,
  ChevronDown,
  Eye,
  X,
  Building2,
  Users,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface ShiftPantryTestimonialsFooterSectionProps {
  title: string;
  subtitle: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

interface OfficeCaseStudy {
  id: string;
  personName: string;
  personRole: string;
  companyName: string;
  officeLocation: string;
  headcountBadge: string;
  avatar: string;
  officePhoto: string;
  quoteHeadline: string;
  quoteBody: string;
  hoursSavedPerMonth: string;
  attendanceLift: string;
  monthlySpend: string;
  beforePainSummary: string;
  afterAutopilotResults: string[];
  favoriteCrate: string;
}

const HR_OPS_CASE_STUDIES: OfficeCaseStudy[] = [
  {
    id: 'case-linearscale',
    personName: 'Maya Lin',
    personRole: 'VP of People & Workplace Experience',
    companyName: 'LinearScale AI',
    officeLocation: 'San Francisco, CA · 85 Hybrid Staff',
    headcountBadge: '85 Staff · Tue–Thu Hybrid',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    officePhoto:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
    quoteHeadline:
      '“We reclaimed 12 hours a month of Costco & Instacart chaos—and Tuesday attendance jumped 38%.”',
    quoteBody:
      'Before ShiftPantry, our Office Coordinator spent every Monday morning reconciling four different grocery receipts and guessing how many gluten-free or vegan bars to buy. Now shelf-ready caddies and freshly roasted espresso arrive at 8:00 AM sharp with a single Net-30 invoice for Finance.',
    hoursSavedPerMonth: '12.5 hrs / mo saved',
    attendanceLift: '+38% Tue–Thu Attendance',
    monthlySpend: '$1,180 / month (Net-30 Invoice)',
    beforePainSummary:
      '4 separate Instacart deliveries per month, $340/mo in wasted perishable snacks on empty Fridays, and constant complaints about nut cross-contamination.',
    afterAutopilotResults: [
      'Zero manual ordering: Bi-weekly Monday 8:00 AM freight-elevator drop-off directly into the 4th-floor kitchen',
      'Dedicated sealed Nut-Free & Celiac caddy eliminated employee allergy anxiety',
      'Direct-trade whole bean espresso cut external Starbucks expensing by $920/month',
      'Finance receives 1 consolidated Net-30 PDF invoice coded to IRS Employee Meals/Perks',
    ],
    favoriteCrate: '2x Brain Fuel 150-Count Boxes + 1x Afternoon Espresso Crate',
  },
  {
    id: 'case-keller',
    personName: 'Marcus Vance',
    personRole: 'Director of Facilities & Operations',
    companyName: 'Keller & Sterling LLP',
    officeLocation: 'New York, NY · 140 Hybrid Staff',
    headcountBadge: '140 Staff · 4-Day Hybrid',
    avatar:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    officePhoto:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80',
    quoteHeadline:
      '“Our partners and associates rave about the cold brew and keto protein options during late deal closings.”',
    quoteBody:
      'In a Manhattan law office, building COI compliance and loading-dock windows are strict. ShiftPantry pre-registered their COI with our property manager and stocks all three of our pantry floors in under 15 minutes every Monday morning.',
    hoursSavedPerMonth: '15.0 hrs / mo saved',
    attendanceLift: '4.96 / 5 Partner Rating',
    monthlySpend: '$2,190 / month (Net-30 ACH)',
    beforePainSummary:
      'Legacy office coffee vendor locked us into stale dark-roast packets and sugary vending machine snacks that nobody under 40 wanted to touch.',
    afterAutopilotResults: [
      'COI pre-cleared with Midtown Manhattan freight dock for 7:45 AM Monday arrival',
      'Swapped sugary sodas for Olipop prebiotics, LMNT electrolytes, and Rise Nitro Cold Brew',
      '1-click Thanksgiving and December holiday pause saved $1,100 in unused deliveries',
      'QR code tray rating automatically rotated out 3 low-performing items without a single email',
    ],
    favoriteCrate:
      '3x Brain Fuel Boxes + 2x Espresso Crates + 1x Wellness & Hydration Suite',
  },
  {
    id: 'case-vanguard',
    personName: 'Elena Rostova',
    personRole: 'Head of People Ops',
    companyName: 'Vanguard Design Studio',
    officeLocation: 'Austin, TX · 45 Hybrid Staff',
    headcountBadge: '45 Staff · Tue/Wed/Thu',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    officePhoto:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80',
    quoteHeadline:
      '“Costs less than $2.15 per designer per in-office day—and feels like a boutique hotel lobby.”',
    quoteBody:
      'As a 45-person creative studio, we don’t have a dedicated facilities manager. ShiftPantry’s volume calculator nailed our exact 3-day hybrid consumption so we never run out of Oatly or Hu Kitchen chocolate by Wednesday afternoon.',
    hoursSavedPerMonth: '9.5 hrs / mo saved',
    attendanceLift: '+41% Studio Lounge Usage',
    monthlySpend: '$638 / month (Ramp Corporate Card)',
    beforePainSummary:
      'Founders were personally hauling oat milk and protein bars from Whole Foods in their SUVs twice a month.',
    afterAutopilotResults: [
      'Calibrated specifically for 45 staff attending Tuesday, Wednesday, and Thursday',
      '40% plant-based / vegan allocation matches our studio’s exact dietary profile',
      'Auto-itemized Stripe receipt syncs directly into Ramp with zero manual receipt uploads',
      '25% monthly discovery rotation keeps designers excited every unboxing Monday',
    ],
    favoriteCrate: '1x Brain Fuel 150-Count Box + 1x Afternoon Pick-Me-Up Crate',
  },
];

const B2B_FAQS = [
  {
    q: 'How does billing work? Can we pay via Corporate Net-30 Invoice or ACH?',
    a: 'Yes. During checkout you can choose instant Corporate Card billing (Amex, Brex, Ramp, Visa/MC via Stripe with automatic tax-deductible receipt itemization) OR 1-click Net-30 Corporate Invoicing payable via ACH, Wire, or Check.',
  },
  {
    q: 'What if our office closes for holidays or our hybrid attendance changes?',
    a: 'You have 1-click control to pause, skip a week, or scale your crate count up or down up to 48 hours before any scheduled Monday dispatch. There are zero long-term lock-in contracts or cancellation penalties.',
  },
  {
    q: 'How do you prevent nut cross-contamination and handle strict office allergies?',
    a: 'Every ShiftPantry shipment includes color-coded, shelf-ready display caddies. Nut-Free and Certified Gluten-Free snacks are packed in separate sealed inner trays with bold allergen badges so employees never have to guess.',
  },
  {
    q: 'What happens if our team doesn’t like a specific snack or coffee roast?',
    a: 'Every display tray includes a small QR code. Employees or Ops managers can tap to Downvote or Request a Swap in 2 seconds. Under our 100% Swap Guarantee, we replace any unloved SKU free of charge on your next delivery.',
  },
];

export const ShiftPantryTestimonialsFooterSection: React.FC<
  ShiftPantryTestimonialsFooterSectionProps
> = ({ title, subtitle, variant, primaryColor, isDark }) => {
  const [selectedCaseModal, setSelectedCaseModal] =
    useState<OfficeCaseStudy | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const forestGreen = primaryColor || '#1B4332';
  const warmAmber = '#D97706';
  const isBrutalist = variant === 'varient_3';

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="shiftpantry-testimonials"
      className={`pt-16 sm:pt-24 border-t transition-colors ${
        isDark
          ? 'bg-[#161F1B] text-stone-100 border-stone-800'
          : 'bg-[#F6F2E9] text-[#1F2937] border-[#E5E0D8]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* ================= 5. WHY OFFICE MANAGERS LOVE US (TESTIMONIALS) ================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-white"
            style={{ backgroundColor: forestGreen }}
          >
            <Users size={13} className="text-amber-300" />
            WHY HR & OFFICE OPS MANAGERS LOVE US
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            <EditableText
              id="shiftpantry_reviews_title"
              defaultText={
                title ||
                '10+ Hours Saved Monthly. Happier Hybrid Teams on Tue–Thu.'
              }
            />
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300">
            <EditableText
              id="shiftpantry_reviews_subtitle"
              defaultText={
                subtitle ||
                'Click any office story below to inspect their exact monthly spend, hybrid attendance lift, and before/after breakroom transformation.'
              }
            />
          </p>
        </div>

        {/* 3 Case Study Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {HR_OPS_CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              onClick={() => setSelectedCaseModal(study)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedCaseModal(study);
                }
              }}
              className={`group cursor-pointer overflow-hidden border transition-all duration-200 flex flex-col justify-between ${
                isBrutalist
                  ? 'rounded-none border-2 border-[#1F2937] shadow-[5px_5px_0px_#1B4332]'
                  : 'rounded-3xl border-[#DFD8CC] dark:border-stone-800 hover:shadow-xl hover:-translate-y-1'
              } ${isDark ? 'bg-stone-900' : 'bg-white'}`}
            >
              <div>
                {/* Top Metric Strip */}
                <div
                  className="px-5 py-3 text-white flex items-center justify-between text-xs font-extrabold"
                  style={{ backgroundColor: forestGreen }}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={13} className="text-amber-300" />
                    {study.hoursSavedPerMonth}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-black uppercase"
                    style={{ backgroundColor: warmAmber }}
                  >
                    {study.attendanceLift}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#D97706" stroke="#D97706" />
                    ))}
                    <span className="ml-2 text-[11px] font-bold text-stone-500">
                      {study.headcountBadge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black leading-snug text-[#1F2937] dark:text-white group-hover:text-[#1B4332] dark:group-hover:text-amber-400 transition-colors">
                    {study.quoteHeadline}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    {study.quoteBody}
                  </p>
                </div>
              </div>

              {/* Author Footer */}
              <div className="p-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={study.avatar}
                    alt={study.personName}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#1B4332]"
                  />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-black truncate">
                      {study.personName}
                    </p>
                    <p className="text-[11px] text-stone-500 truncate">
                      {study.personRole} · {study.companyName}
                    </p>
                  </div>
                </div>

                <span
                  className="inline-flex items-center gap-1 text-xs font-extrabold shrink-0"
                  style={{ color: forestGreen }}
                >
                  <Eye size={14} style={{ color: warmAmber }} />
                  <span>Case Study</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ================= 6. FLEXIBLE B2B SUBSCRIPTION TERMS BANNER ================= */}
        <div
          className={`mt-16 p-6 sm:p-10 rounded-3xl text-white shadow-xl ${
            isBrutalist ? 'rounded-none border-2 border-[#1F2937]' : ''
          }`}
          style={{ backgroundColor: forestGreen }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <span
                className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white"
                style={{ backgroundColor: warmAmber }}
              >
                ZERO FRICTION B2B PROCUREMENT
              </span>
              <h3 className="text-2xl sm:text-3xl font-black leading-tight">
                Built for Modern Finance, People Ops & Workplace Teams.
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                No annual lock-in contracts, no minimum crate penalties, and full tax-deductible invoice compliance out of the box.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => scrollToSection('shiftpantry-calculator')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-black text-stone-950 bg-amber-400 hover:bg-amber-300 transition cursor-pointer"
                >
                  <span>Build Your Office Plan Now</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-2">
                <FileText size={22} className="text-amber-300" />
                <h4 className="text-sm font-black">
                  Consolidated Corporate Invoicing
                </h4>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  Pay via Net-30 ACH/Wire PO or Corporate Card with 1 monthly IRS-compliant receipt.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-2">
                <CalendarClock size={22} className="text-amber-300" />
                <h4 className="text-sm font-black">
                  Pause Anytime for Holidays
                </h4>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  Skip Thanksgiving, December shutdowns, or company offsites in 1 click with zero fees.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-2">
                <RefreshCw size={22} className="text-amber-300" />
                <h4 className="text-sm font-black">
                  1-Click Order Modifications
                </h4>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  Swap unloved items for free or adjust headcount volume 48 hours before any delivery.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= B2B FAQ ACCORDION ================= */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-black">
              Frequently Asked Questions from HR & Procurement
            </h3>
          </div>
          <div className="space-y-3">
            {B2B_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.q}
                  className={`rounded-2xl border overflow-hidden transition ${
                    isDark
                      ? 'bg-stone-900 border-stone-800'
                      : 'bg-white border-[#E5E0D8]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-black text-xs sm:text-sm cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-amber-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-800 pt-3">
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
        className={`mt-20 border-t py-12 text-xs ${
          isDark
            ? 'bg-[#0E1411] border-stone-800 text-stone-400'
            : 'bg-[#EDE7DA] border-[#DCD4C4] text-stone-600'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: forestGreen }}
            >
              <Coffee size={18} />
            </div>
            <div>
              <p className="font-black text-sm text-[#1F2937] dark:text-white">
                ShiftPantry · Hybrid Office Pantry on Autopilot
              </p>
              <p className="text-[11px]">
                Curated Healthy Snacks, Direct-Trade Coffee & Zero Manual Runs · Net-30 & Stripe B2B
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-bold">
            <button
              type="button"
              onClick={() => scrollToSection('shiftpantry-calculator')}
              className="hover:underline cursor-pointer"
            >
              Volume Calculator
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('shiftpantry-boxes')}
              className="hover:underline cursor-pointer"
            >
              Curated Boxes
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('shiftpantry-dietary')}
              className="hover:underline cursor-pointer"
            >
              Allergen Protocol
            </button>
            <span className="text-stone-400">
              © {new Date().getFullYear()} ShiftPantry Inc.
            </span>
          </div>
        </div>
      </footer>

      {/* ================= CASE STUDY FULL MODAL ================= */}
      {selectedCaseModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedCaseModal(null)}
        >
          <div
            className={`max-w-2xl w-full rounded-3xl overflow-hidden border shadow-2xl ${
              isDark
                ? 'bg-stone-900 border-stone-700 text-stone-100'
                : 'bg-[#FDFBF7] border-[#D6CFC2] text-[#1F2937]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="p-6 text-white flex items-start justify-between gap-4"
              style={{ backgroundColor: forestGreen }}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase"
                    style={{ backgroundColor: warmAmber }}
                  >
                    VERIFIED B2B OFFICE CASE STUDY
                  </span>
                  <span className="text-xs font-bold text-emerald-200">
                    {selectedCaseModal.officeLocation}
                  </span>
                </div>
                <h3 className="text-xl font-black">
                  {selectedCaseModal.companyName}
                </h3>
                <p className="text-xs text-emerald-100 mt-0.5">
                  {selectedCaseModal.personName} · {selectedCaseModal.personRole}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCaseModal(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[78vh] overflow-y-auto">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-white dark:bg-stone-800 border border-[#E5E0D8] dark:border-stone-700">
                  <p className="text-[10px] font-bold uppercase text-stone-400">
                    Ops Time Saved
                  </p>
                  <p className="text-sm font-black mt-0.5" style={{ color: forestGreen }}>
                    {selectedCaseModal.hoursSavedPerMonth}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-stone-800 border border-[#E5E0D8] dark:border-stone-700">
                  <p className="text-[10px] font-bold uppercase text-stone-400">
                    Hybrid Impact
                  </p>
                  <p className="text-sm font-black mt-0.5" style={{ color: warmAmber }}>
                    {selectedCaseModal.attendanceLift}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-stone-800 border border-[#E5E0D8] dark:border-stone-700">
                  <p className="text-[10px] font-bold uppercase text-stone-400">
                    Monthly Spend
                  </p>
                  <p className="text-xs font-black mt-0.5">
                    {selectedCaseModal.monthlySpend}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs space-y-1">
                <p className="font-black uppercase text-red-700 dark:text-red-300">
                  Before ShiftPantry (Manual Grocery Runs):
                </p>
                <p className="text-stone-700 dark:text-stone-300">
                  {selectedCaseModal.beforePainSummary}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-stone-800 border border-[#E5E0D8] dark:border-stone-700 space-y-2">
                <p className="text-xs font-black uppercase tracking-wider text-[#1B4332] dark:text-amber-400">
                  After Switching to ShiftPantry Autopilot:
                </p>
                <ul className="space-y-2">
                  {selectedCaseModal.afterAutopilotResults.map((res) => (
                    <li key={res} className="flex items-start gap-2 text-xs">
                      <CheckCircle2
                        size={15}
                        className="shrink-0 mt-0.5"
                        style={{ color: forestGreen }}
                      />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <div className="text-xs">
                  <span className="text-stone-400 block">Active Subscription Mix:</span>
                  <strong className="font-black">
                    {selectedCaseModal.favoriteCrate}
                  </strong>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCaseModal(null);
                    scrollToSection('shiftpantry-calculator');
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-black text-white cursor-pointer"
                  style={{ backgroundColor: forestGreen }}
                >
                  Calculate Similar Plan →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
