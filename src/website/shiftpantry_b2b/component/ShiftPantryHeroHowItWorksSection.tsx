import React, { useState } from 'react';
import {
  Coffee,
  Sparkles,
  Calculator,
  Package,
  CalendarClock,
  CheckCircle2,
  ArrowRight,
  Star,
  Users,
  Leaf,
  Truck,
  Eye,
  X,
  Building2,
  ShieldCheck,
} from 'lucide-react';
import {
  EditableText,
  WebsiteSectionVariantId,
} from '../../doctor_profile';

export interface ShiftPantryHeroHowItWorksSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  variant: WebsiteSectionVariantId;
  primaryColor: string;
  isDark: boolean;
}

interface StepBlueprint {
  id: string;
  stepNum: string;
  title: string;
  badge: string;
  shortDesc: string;
  metricTag: string;
  image: string;
  fullArchitectureTitle: string;
  fullArchitectureSummary: string;
  workflowChecklist: string[];
  dietaryTagsIncluded: string[];
  opsTimeSaved: string;
  slaGuarantee: string;
}

const HOW_IT_WORKS_STEPS: StepBlueprint[] = [
  {
    id: 'step-1',
    stepNum: 'STEP 01',
    title: 'Pick Your Team Size & Vibe',
    badge: 'Headcount + Dietary Matrix',
    shortDesc:
      'Select your in-office employee headcount, hybrid anchor days (Tue–Thu), and automatic dietary allocation ratios (Vegan, Keto, Nut-Free, Gluten-Free).',
    metricTag: '90-Second Setup · Zero Surveys Needed',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=85',
    fullArchitectureTitle: 'Algorithmic Headcount & Dietary Consumption Modeling',
    fullArchitectureSummary:
      'Instead of guessing how many protein bars or oat milk cartons your hybrid team consumes on Tuesday vs. Friday, ShiftPantry maps your headcount and in-office schedule against consumption benchmarks from 400+ modern offices.',
    workflowChecklist: [
      'Automatic allergen partitioning: Dedicated Nut-Free & Celiac-Safe sealed caddies inside every crate',
      'Hybrid peak-day weighting: 75% volume calibrated for Tue/Wed/Thu anchor days',
      'Balanced macro curve: 45% high-protein brain fuel, 35% clean organic produce/Jerky/Nuts, 20% afternoon artisan treats',
      'Optional Slack / Teams micro-poll link so employees can upvote new seasonal brands',
    ],
    dietaryTagsIncluded: ['100% Nut-Free Safe', 'Plant-Based / Vegan', 'Keto & Low-Glycemic', 'Certified Gluten-Free'],
    opsTimeSaved: 'Saves 4.5 hrs/month of spreadsheet inventory tracking',
    slaGuarantee: '100% Swap Guarantee — Any unloved item is replaced free on the next cycle',
  },
  {
    id: 'step-2',
    stepNum: 'STEP 02',
    title: 'Set Your Delivery Cadence',
    badge: 'Weekly · Bi-Weekly · Monthly',
    shortDesc:
      'Sync deliveries directly with your hybrid schedule. Choose exact arrival windows (e.g., 1st & 3rd Monday at 8:00 AM) and front-desk or loading-dock drop-off.',
    metricTag: '1-Click Holiday Pause & Headcount Scaling',
    image:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=85',
    fullArchitectureTitle: 'Autonomous Cadence Engine & Building Access Routing',
    fullArchitectureSummary:
      'Every office building has unique COI (Certificate of Insurance), freight elevator, and reception desk rules. We store your exact building protocol and sync with your corporate holiday calendar.',
    workflowChecklist: [
      'Precision morning arrival window (7:30 AM – 9:30 AM) before Monday standups begin',
      'Color-coded shelf-ready display trays — unbox and restock your breakroom in under 3 minutes',
      'Automatic US/Global bank holiday skipping so perishable cold-brew and fruit never sit over long weekends',
      'Consolidated Net-30 ACH/Wire corporate invoicing or automated monthly Stripe receipting for Finance',
    ],
    dietaryTagsIncluded: ['Shelf-Ready Display Caddies', 'COI Building Pre-Cleared', 'Zero-Waste Recyclable Crates'],
    opsTimeSaved: 'Saves 6.0 hrs/month of Costco/Instacart runs & expense reports',
    slaGuarantee: 'On-Time Morning Window SLA or 15% Credit Automatically Applied',
  },
  {
    id: 'step-3',
    stepNum: 'STEP 03',
    title: 'Unbox & Energize',
    badge: 'Artisan Coffee + Superfood Fuel',
    shortDesc:
      'Shelf-ready display trays and freshly roasted specialty coffee beans arrive at your office door. Zero grocery runs, zero messy receipts, 100% energized team.',
    metricTag: '+34% Tue–Thu Hybrid Office Attendance Boost',
    image:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=85',
    fullArchitectureTitle: 'Hospitality-Grade Breakroom Experience & AI Rotation',
    fullArchitectureSummary:
      'Prevent "snack fatigue" forever. Every shipment automatically rotates 25% of its SKUs with emerging B-Corp, organic, and small-batch roaster brands while locking in your office’s top staples.',
    workflowChecklist: [
      'Small-batch specialty coffee roasted within 72 hours of dispatch (Whole Bean, Espresso, or Cold Brew)',
      'QR code on every display tray lets employees rate snacks in 2 seconds without logging in',
      'Dedicated Account Concierge for board meetings, town halls, and quarterly offsite catering add-ons',
      'Real-time Utilization Report for HR & People Ops showing cost-per-employee-day',
    ],
    dietaryTagsIncluded: ['Direct-Trade Roasters', '25% Monthly New Discovery Rotation', 'QR Employee Feedback'],
    opsTimeSaved: '11.5+ total hours saved monthly for Office Ops & HR Leaders',
    slaGuarantee: '4.94 / 5.0 Average Employee Satisfaction Score across 400+ Offices',
  },
];

const HYBRID_CLIENT_LOGOS = [
  { name: 'LinearScale AI', type: 'Series B Tech Studio · 85 Staff' },
  { name: 'Vanguard Design Co.', type: 'Product Agency · 45 Staff' },
  { name: 'Keller & Sterling LLP', type: 'Corporate Law · 140 Staff' },
  { name: 'Northstar BioLabs', type: 'Biotech R&D · 110 Staff' },
  { name: 'Arcadia Ventures', type: 'Venture Capital · 35 Staff' },
];

export const ShiftPantryHeroHowItWorksSection: React.FC<
  ShiftPantryHeroHowItWorksSectionProps
> = ({ title, subtitle, ctaText, variant, primaryColor, isDark }) => {
  const [selectedStepModal, setSelectedStepModal] = useState<StepBlueprint | null>(
    null
  );
  const [activePreviewTab, setActivePreviewTab] = useState<'pantry' | 'coffee' | 'cadence'>('pantry');

  const forestGreen = primaryColor || '#1B4332';
  const warmAmber = '#D97706';
  const isCentered = variant === 'varient_2';
  const isBrutalist = variant === 'varient_3';

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className={`relative overflow-hidden py-14 sm:py-20 transition-colors ${
        isDark
          ? 'bg-[#121916] text-stone-100'
          : 'bg-[#FDFBF7] text-[#1F2937]'
      }`}
    >
      {/* Subtle warm radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-1/4 w-[520px] h-[520px] rounded-full opacity-15 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${warmAmber} 0%, ${forestGreen} 65%, transparent 100%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* ================= 1. HERO SECTION ================= */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center ${
            isCentered ? 'text-center lg:text-left' : ''
          }`}
        >
          {/* Left Column: High-Converting Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold border bg-white/90 dark:bg-stone-900/90 border-[#D6CFC2] dark:border-stone-700 shadow-xs">
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black text-white uppercase tracking-wider"
                style={{ backgroundColor: forestGreen }}
              >
                <Sparkles size={11} />
                B2B HYBRID OFFICE HOSPITALITY
              </span>
              <EditableText
                id="shiftpantry_hero_eyebrow"
                defaultText="Curated Brain Fuel, Direct-Trade Espresso & Zero Manual Grocery Runs"
                className="text-[#1F2937] dark:text-stone-200 font-bold"
              />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.08] text-[#1F2937] dark:text-white">
              <EditableText
                id="shiftpantry_hero_headline"
                defaultText={title || 'The Hybrid Office Pantry, on Autopilot.'}
              />
            </h1>

            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-stone-600 dark:text-stone-300 max-w-2xl">
              <EditableText
                id="shiftpantry_hero_subheadline"
                defaultText={
                  subtitle ||
                  'Curated healthy snack boxes, artisanal coffee, and pantry essentials delivered directly to your office. Zero manual runs, 100% automated.'
                }
              />
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={() => scrollToId('shiftpantry-calculator')}
                className={`inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm sm:text-base font-extrabold text-white shadow-md transition transform hover:-translate-y-0.5 cursor-pointer ${
                  isBrutalist
                    ? 'rounded-none border-2 border-[#1F2937] shadow-[4px_4px_0px_#D97706]'
                    : 'rounded-2xl'
                }`}
                style={{ backgroundColor: forestGreen }}
              >
                <Calculator size={18} className="text-amber-300" />
                <EditableText
                  id="shiftpantry_hero_primary_cta"
                  defaultText={ctaText || 'Calculate Your Office Plan'}
                />
                <ArrowRight size={17} />
              </button>

              <button
                type="button"
                onClick={() => scrollToId('shiftpantry-boxes')}
                className={`inline-flex items-center justify-center gap-2 px-6 py-4 text-sm sm:text-base font-extrabold border-2 transition cursor-pointer ${
                  isBrutalist
                    ? 'rounded-none border-[#1F2937] bg-white text-[#1F2937] shadow-[4px_4px_0px_#1B4332]'
                    : isDark
                    ? 'rounded-2xl border-stone-700 bg-stone-900 text-stone-100 hover:border-amber-500'
                    : 'rounded-2xl border-[#1B4332]/25 bg-white text-[#1B4332] hover:border-[#1B4332]'
                }`}
              >
                <Package size={18} style={{ color: warmAmber }} />
                <EditableText
                  id="shiftpantry_hero_secondary_cta"
                  defaultText="Explore Curated Boxes"
                />
              </button>
            </div>

            {/* Key B2B Value Guarantee Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div
                className={`p-3 rounded-xl border flex items-center gap-2.5 ${
                  isDark
                    ? 'bg-stone-900/70 border-stone-800'
                    : 'bg-white border-[#E5E0D8]'
                }`}
              >
                <CheckCircle2 size={18} className="shrink-0" style={{ color: forestGreen }} />
                <div className="text-xs">
                  <p className="font-extrabold">Tue–Thu Calibrated</p>
                  <p className="text-[11px] text-stone-500">Pay only for in-office days</p>
                </div>
              </div>

              <div
                className={`p-3 rounded-xl border flex items-center gap-2.5 ${
                  isDark
                    ? 'bg-stone-900/70 border-stone-800'
                    : 'bg-white border-[#E5E0D8]'
                }`}
              >
                <Leaf size={18} className="shrink-0" style={{ color: warmAmber }} />
                <div className="text-xs">
                  <p className="font-extrabold">Allergen Partitioned</p>
                  <p className="text-[11px] text-stone-500">Nut-Free, Vegan, GF & Keto</p>
                </div>
              </div>

              <div
                className={`p-3 rounded-xl border flex items-center gap-2.5 ${
                  isDark
                    ? 'bg-stone-900/70 border-stone-800'
                    : 'bg-white border-[#E5E0D8]'
                }`}
              >
                <ShieldCheck size={18} className="shrink-0" style={{ color: forestGreen }} />
                <div className="text-xs">
                  <p className="font-extrabold">Pause or Cancel 1-Click</p>
                  <p className="text-[11px] text-stone-500">Net-30 Invoice or Stripe</p>
                </div>
              </div>
            </div>

            {/* Micro-Social Proof Rating */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-300">
              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={15} fill="#D97706" stroke="#D97706" />
                ))}
              </div>
              <EditableText
                id="shiftpantry_hero_micro_proof"
                defaultText="Fueling 400+ hybrid offices. 4.9/5 satisfaction rating from HR & Office Ops."
                className="font-bold text-[#1F2937] dark:text-stone-100"
              />
            </div>
          </div>

          {/* Right Column: Interactive Office Pantry Command Showcase */}
          <div className="lg:col-span-5">
            <div
              className={`overflow-hidden border shadow-xl transition ${
                isBrutalist
                  ? 'rounded-none border-2 border-[#1F2937] shadow-[6px_6px_0px_#1B4332]'
                  : 'rounded-3xl border-[#DFD8CC] dark:border-stone-800'
              } ${isDark ? 'bg-stone-900' : 'bg-white'}`}
            >
              {/* Top Interactive Switcher Bar */}
              <div
                className="p-3.5 text-white flex items-center justify-between gap-2"
                style={{ backgroundColor: forestGreen }}
              >
                <div className="flex items-center gap-2">
                  <Coffee size={16} className="text-amber-300" />
                  <span className="text-xs font-extrabold tracking-wide uppercase">
                    Live Breakroom Telemetry
                  </span>
                </div>
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase text-white"
                  style={{ backgroundColor: warmAmber }}
                >
                  Autopilot Active
                </span>
              </div>

              {/* Tab Switcher */}
              <div className="grid grid-cols-3 border-b border-stone-200 dark:border-stone-800 bg-[#F8F5EE] dark:bg-stone-950/60 p-1.5 gap-1">
                {[
                  { id: 'pantry', label: 'Snack Crate' },
                  { id: 'coffee', label: 'Roaster Beans' },
                  { id: 'cadence', label: 'Hybrid Schedule' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActivePreviewTab(tab.id as 'pantry' | 'coffee' | 'cadence')}
                    className={`py-2 px-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                      activePreviewTab === tab.id
                        ? 'bg-white dark:bg-stone-800 text-[#1B4332] dark:text-amber-400 shadow-xs'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Hero Visual Banner */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-stone-100">
                <img
                  src={
                    activePreviewTab === 'pantry'
                      ? 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=85'
                      : activePreviewTab === 'coffee'
                      ? 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85'
                      : 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=85'
                  }
                  alt="ShiftPantry Office Subscription Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-500 text-stone-950 mb-1">
                        {activePreviewTab === 'pantry'
                          ? 'Shelf-Ready Display Caddies'
                          : activePreviewTab === 'coffee'
                          ? 'Roasted 48 Hours Prior'
                          : 'Synced With Tue–Thu Attendance'}
                      </span>
                      <h3 className="text-base sm:text-lg font-black">
                        {activePreviewTab === 'pantry'
                          ? '150-Count Brain Fuel & Clean Protein Crate'
                          : activePreviewTab === 'coffee'
                          ? 'Single-Origin Espresso + Oat Milk Barista Pack'
                          : '1st & 3rd Monday · 8:00 AM Front Desk Drop'}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Telemetry Metrics Inside Hero Card */}
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-3 gap-2.5 text-center">
                  <div className="p-2.5 rounded-xl bg-[#FDFBF7] dark:bg-stone-800/80 border border-[#E5E0D8] dark:border-stone-700">
                    <p className="text-[10px] font-bold uppercase text-stone-500">
                      Cost / Staff / Day
                    </p>
                    <p
                      className="text-base sm:text-lg font-black mt-0.5"
                      style={{ color: forestGreen }}
                    >
                      $2.15
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FDFBF7] dark:bg-stone-800/80 border border-[#E5E0D8] dark:border-stone-700">
                    <p className="text-[10px] font-bold uppercase text-stone-500">
                      Ops Time Saved
                    </p>
                    <p
                      className="text-base sm:text-lg font-black mt-0.5"
                      style={{ color: warmAmber }}
                    >
                      11.5 hrs/mo
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FDFBF7] dark:bg-stone-800/80 border border-[#E5E0D8] dark:border-stone-700">
                    <p className="text-[10px] font-bold uppercase text-stone-500">
                      Allergen Safe
                    </p>
                    <p className="text-base sm:text-lg font-black mt-0.5 text-emerald-700 dark:text-emerald-400">
                      100%
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300">
                    <CalendarClock size={15} style={{ color: warmAmber }} />
                    <span>Next Automated Dispatch:</span>
                    <strong className="text-[#1F2937] dark:text-white">
                      Mon, 8:00 AM
                    </strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollToId('shiftpantry-calculator')}
                    className="text-xs font-extrabold underline underline-offset-2 cursor-pointer"
                    style={{ color: forestGreen }}
                  >
                    Customize Yours →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= OFFICE LOGO BAR ================= */}
        <div
          className={`mt-12 sm:mt-14 p-5 sm:p-6 rounded-2xl border ${
            isDark
              ? 'bg-stone-900/60 border-stone-800'
              : 'bg-white/90 border-[#E5E0D8]'
          }`}
        >
          <p className="text-center text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-stone-500 mb-4">
            TRUSTED BY PEOPLE OPS, WORKPLACE MANAGERS & EXEC ADMINS AT 400+ HYBRID OFFICES
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {HYBRID_CLIENT_LOGOS.map((client) => (
              <div
                key={client.name}
                className={`p-3 rounded-xl border text-center transition ${
                  isDark
                    ? 'bg-stone-900 border-stone-800'
                    : 'bg-[#FDFBF7] border-[#E8E2D5]'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 font-black text-xs sm:text-sm text-[#1F2937] dark:text-stone-100">
                  <Building2 size={14} style={{ color: forestGreen }} />
                  <span>{client.name}</span>
                </div>
                <p className="text-[10px] text-stone-500 font-semibold mt-0.5">
                  {client.type}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 2. HOW IT WORKS (3-STEP VISUAL CARDS) ================= */}
        <div id="shiftpantry-how-it-works" className="mt-16 sm:mt-24 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-12">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-white"
              style={{ backgroundColor: forestGreen }}
            >
              <Truck size={13} className="text-amber-300" />
              3-STEP AUTOPILOT WORKFLOW
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              <EditableText
                id="shiftpantry_how_title"
                defaultText="How ShiftPantry Puts Your Breakroom on Autopilot"
              />
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300">
              <EditableText
                id="shiftpantry_how_subtitle"
                defaultText="Click any step below to inspect our consumption modeling, building access protocol, and zero-fatigue SKU rotation system."
              />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <div
                key={step.id}
                onClick={() => setSelectedStepModal(step)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedStepModal(step);
                  }
                }}
                className={`group cursor-pointer overflow-hidden border transition-all duration-200 flex flex-col justify-between ${
                  isBrutalist
                    ? 'rounded-none border-2 border-[#1F2937] shadow-[5px_5px_0px_#1B4332]'
                    : 'rounded-3xl border-[#E2DDD2] dark:border-stone-800 hover:shadow-xl hover:-translate-y-1'
                } ${isDark ? 'bg-stone-900' : 'bg-white'}`}
              >
                <div>
                  {/* Card Image Header */}
                  <div className="relative h-48 overflow-hidden bg-stone-100">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span
                        className="px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider text-white shadow"
                        style={{ backgroundColor: forestGreen }}
                      >
                        {step.stepNum}
                      </span>
                      <span
                        className="px-2.5 py-1 rounded-lg text-[11px] font-extrabold text-white shadow"
                        style={{ backgroundColor: warmAmber }}
                      >
                        {step.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                      <span className="text-[11px] font-bold bg-black/55 backdrop-blur-xs px-2.5 py-1 rounded-md">
                        {step.metricTag}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-black text-[#1F2937] dark:text-white group-hover:text-[#1B4332] dark:group-hover:text-amber-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                      {step.shortDesc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {step.dietaryTagsIncluded.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#F5F2EB] dark:bg-stone-800 text-[#1B4332] dark:text-stone-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="px-6 pb-5 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-500">
                    {step.opsTimeSaved}
                  </span>
                  <span
                    className="inline-flex items-center gap-1 text-xs font-extrabold group-hover:translate-x-0.5 transition-transform"
                    style={{ color: forestGreen }}
                  >
                    <Eye size={14} style={{ color: warmAmber }} />
                    <span>Inspect Step</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= STEP FULL DETAILS MODAL ================= */}
      {selectedStepModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedStepModal(null)}
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
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="px-2.5 py-0.5 rounded text-[11px] font-black uppercase"
                    style={{ backgroundColor: warmAmber }}
                  >
                    {selectedStepModal.stepNum}
                  </span>
                  <span className="text-xs font-bold text-emerald-200">
                    {selectedStepModal.badge}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black">
                  {selectedStepModal.title}
                </h3>
                <p className="text-xs text-emerald-100 mt-1">
                  {selectedStepModal.fullArchitectureTitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStepModal(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[78vh] overflow-y-auto">
              <div className="relative h-48 rounded-2xl overflow-hidden">
                <img
                  src={selectedStepModal.image}
                  alt={selectedStepModal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-xs text-white px-3.5 py-2 rounded-xl flex items-center justify-between text-xs font-bold">
                  <span>{selectedStepModal.opsTimeSaved}</span>
                  <span className="text-amber-300">{selectedStepModal.metricTag}</span>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                {selectedStepModal.fullArchitectureSummary}
              </p>

              <div className="p-4 rounded-2xl bg-white dark:bg-stone-800 border border-[#E5E0D8] dark:border-stone-700 space-y-2.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#1B4332] dark:text-amber-400">
                  Operational Blueprint & Included Standards
                </h4>
                <ul className="space-y-2">
                  {selectedStepModal.workflowChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <CheckCircle2
                        size={16}
                        className="shrink-0 mt-0.5"
                        style={{ color: forestGreen }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl border border-amber-500/40 bg-amber-500/10 flex items-center justify-between gap-4">
                <div className="text-xs">
                  <span className="font-black uppercase tracking-wider block" style={{ color: warmAmber }}>
                    ShiftPantry Service Level Guarantee
                  </span>
                  <span className="font-semibold text-stone-700 dark:text-stone-200">
                    {selectedStepModal.slaGuarantee}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedStepModal(null);
                    scrollToId('shiftpantry-calculator');
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-white shrink-0 cursor-pointer"
                  style={{ backgroundColor: forestGreen }}
                >
                  Open Calculator →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
